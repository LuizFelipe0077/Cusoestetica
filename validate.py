#!/usr/bin/env python3
"""
VALIDATE.PY — Validador automático da Universidade Premium
===========================================================
Roda ANTES de cada módulo novo e na Auditoria Final.

Verifica as 11 dimensões exigidas:
  1. Links internos      7. Consistência visual
  2. Breadcrumbs         8. Dependências entre módulos
  3. Navegação           9. Sistema de progresso
  4. Integridade HTML   10. Glossário
  5. CSS                11. Responsividade
  6. JavaScript

Saída: relatório + exit code (0 = passou, 1 = reprovou).
Uso:   python3 validate.py [--json]
"""
import re, sys, os, json, html.parser
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

FAILS, WARNS, PASSES = [], [], []
def ok(d, m):   PASSES.append((d, m))
def warn(d, m): WARNS.append((d, m))
def fail(d, m): FAILS.append((d, m))

# ─────────────────────────────────────────────── carregar manifest e glossário
def js_object(path, var):
    """Extrai um objeto JS via node, sem eval em Python."""
    import subprocess
    r = subprocess.run(["node", "-e",
        f'const o=require("./{path}");process.stdout.write(JSON.stringify(o))'],
        capture_output=True, text=True)
    if r.returncode: 
        fail("JavaScript", f"{path} não carrega no node: {r.stderr.strip()[:120]}")
        return None
    return json.loads(r.stdout)

MAN = js_object("manifest.js", "PLATFORM")
GLO = js_object("glossario.js", "GLOSSARIO")
if not MAN or not GLO:
    print("FATAL: manifest ou glossário inválidos"); sys.exit(1)

def all_modules():
    out = []
    for c in MAN["courses"]:
        for m in c["modules"]:
            m = dict(m); m["courseId"] = c["id"]; m["courseN"] = c["n"]; out.append(m)
    cap = dict(MAN["capstone"]); cap["courseId"] = "sog"; cap["courseN"] = 4; cap["n"] = 1
    out.append(cap)
    return out

MODS = all_modules()
BY_ID = {m["id"]: m for m in MODS}
CORE = ["platform.css", "platform.js", "theme.js", "manifest.js", "glossario.js", "searchindex.js",
        "index.html", "glossario.html", "mapa.html", "painel.html", "favoritos.html", "historico.html"]

# ─────────────────────────────────────────────── 1. arquivos centrais
for f in CORE:
    if os.path.exists(f): ok("Arquivos", f"{f} presente")
    else: fail("Arquivos", f"{f} AUSENTE — a plataforma não sobe sem ele")

# ─────────────────────────────────────────────── 2. manifest ↔ disco
built = [m for m in MODS if m["status"] != "todo"]
for m in built:
    if not os.path.exists(m["file"]):
        fail("Manifest", f'{m["id"]}: status="{m["status"]}" mas {m["file"]} não existe no disco')
    else:
        ok("Manifest", f'{m["id"]} → {m["file"]}')

# órfãos: html no disco que ninguém referencia
known = set(CORE) | {m["file"] for m in MODS}
for f in os.listdir("."):
    if f.endswith(".html") and f not in known:
        warn("Manifest", f"{f} está no disco mas não existe no manifest (módulo órfão)")

# ids únicos
ids = [m["id"] for m in MODS]
if len(ids) != len(set(ids)): fail("Manifest", "IDs de módulo duplicados")
else: ok("Manifest", f"{len(ids)} IDs únicos")

# ─────────────────────────────────────────────── 3. dependências
for m in MODS:
    for d in m.get("deps", []):
        if d not in BY_ID:
            fail("Dependências", f'{m["id"]} depende de "{d}", que não existe')
        elif d == m["id"]:
            fail("Dependências", f'{m["id"]} depende de si mesmo')
# ciclos
def has_cycle():
    WHITE, GREY, BLACK = 0, 1, 2
    color = {i: WHITE for i in BY_ID}
    def dfs(u, path):
        color[u] = GREY
        for v in BY_ID[u].get("deps", []):
            if v not in BY_ID: continue
            if color[v] == GREY: return path + [u, v]
            if color[v] == WHITE:
                r = dfs(v, path + [u])
                if r: return r
        color[u] = BLACK
        return None
    for i in BY_ID:
        if color[i] == WHITE:
            r = dfs(i, [])
            if r: return r
    return None
cyc = has_cycle()
if cyc: fail("Dependências", "ciclo: " + " → ".join(cyc))
else: ok("Dependências", "grafo acíclico")

# ─────────────────────────────────────────────── 4. por módulo construído
class Balance(html.parser.HTMLParser):
    VOID = {"area","base","br","col","embed","hr","img","input","link","meta","param","source",
            "track","wbr","path","circle","rect","marker","use","line","stop","polygon","ellipse","polyline"}
    def __init__(self): super().__init__(convert_charrefs=True); self.stack=[]; self.errs=[]
    def handle_starttag(self,t,a):
        if t not in self.VOID: self.stack.append(t)
    def handle_endtag(self,t):
        if t in self.VOID: return
        if not self.stack: self.errs.append(f"</{t}> sem abertura"); return
        if self.stack[-1]!=t: self.errs.append(f"esperado </{self.stack[-1]}>, veio </{t}>")
        else: self.stack.pop()

pages = [(m["id"], m["file"], m) for m in built] + \
        [(n, n + ".html", None) for n in ["index","glossario","mapa","painel","favoritos","historico"]]

for pid, pfile, m in pages:
    if not os.path.exists(pfile): continue
    raw = open(pfile, encoding="utf-8").read()
    soup = BeautifulSoup(raw, "html.parser")

    # 4a. HTML balanceado
    b = Balance(); b.feed(raw)
    if b.errs or b.stack: fail("HTML", f"{pfile}: {(b.errs[:2] or b.stack[:2])}")
    else: ok("HTML", f"{pfile} balanceado")

    # 4b. shell
    for need, label in [("platform.css","CSS do shell"), ('src="manifest.js"',"manifest"),
                        ('src="glossario.js"',"glossário"), ('src="platform.js"',"motor"),
                        ('src="theme.js"',"bootstrap de tema"), ('src="searchindex.js"',"índice de busca"),
                        ("Platform.init","init"), ('id="conteudo"',"âncora de skip-link")]:
        if need not in raw: fail("Navegação", f"{pfile}: falta {label} ({need})")
    if all(x in raw for x in ["platform.css","Platform.init",'id="conteudo"']):
        ok("Navegação", f"{pfile} ligado ao shell")

    # 4c. chrome duplicado (o módulo não pode redeclarar o que é do shell)
    for bad in ['id="sidebar"','class="crumb"','class="modnav"','id="sbNav"','class="sb-nav"']:
        if bad in raw: fail("Consistência visual", f"{pfile}: chrome antigo remanescente ({bad})")

    # 4d. CSS só do shell + exclusivos declarados
    styles = soup.find_all("style")
    if pid in ("index","glossario"):
        if styles: warn("CSS", f"{pfile}: tem <style> inline")
    elif len(styles) > 1:
        fail("CSS", f"{pfile}: {len(styles)} blocos <style> — máximo 1 (exclusivos do módulo)")
    for s in styles:
        txt = s.get_text()
        for tok in ["--gold:", "--bg:", ".sidebar{", ".topbar{", ".callout{", ".card{"]:
            if tok in txt:
                fail("Consistência visual", f"{pfile}: redeclara token/componente do shell ({tok})")
        # requisito: "Nenhum módulo poderá possuir CSS incompatível com os dois modos"
        sem_c = re.sub(r"/\*.*?\*/", "", txt, flags=re.S)
        fix = re.findall(r"#[0-9A-Fa-f]{3,8}\b", sem_c) + re.findall(r"rgba?\([^)]+\)", sem_c)
        if fix:
            fail("Tema", f"{pfile}: CSS do módulo tem cor fixa {sorted(set(fix))[:4]} — quebra no tema claro")

    # SVG inline com cor fixa também quebra no tema claro
    svg_fix = re.findall(r'(?:fill|stroke)="(#[0-9A-Fa-f]{3,6})"', raw)
    if svg_fix:
        fail("Tema", f"{pfile}: SVG com cor fixa {sorted(set(svg_fix))} — use var(--token)")

    # 4e. sem dependências externas
    ext = re.findall(r'(?:src|href)="(https?://[^"]+)"', raw)
    if ext: fail("Arquivos", f"{pfile}: recurso externo {ext[:2]}")
    else: ok("Arquivos", f"{pfile} sem dependências externas")

    # 4f. links internos
    for a in soup.find_all("a", href=True):
        h = a["href"].split("#")[0]
        if not h or h.startswith(("http","mailto:","tel:")): continue
        if not os.path.exists(h):
            fail("Links", f"{pfile} → {h} (destino inexistente)")
    # âncoras internas
    ids_pg = {t["id"] for t in soup.find_all(id=True)}
    for a in soup.find_all("a", href=re.compile(r"^#.")):
        anc = a["href"][1:]
        if anc not in ids_pg and pid not in ("glossario","index"):
            warn("Links", f"{pfile} → âncora #{anc} não existe")

    # 4f-bis. modrefs
    for a in soup.select(".modref[data-mod]"):
        ref = a["data-mod"]
        if ref not in BY_ID:
            fail("Links", f"{pfile}: modref aponta para módulo inexistente “{ref}”")
        if a.has_attr("href"):
            fail("Links", f"{pfile}: modref com href fixo — deve ser resolvido pelo shell")
    if soup.select(".modref[data-mod]"):
        ok("Links", f'{pfile}: {len(soup.select(".modref"))} referências a módulos, resolvidas em runtime')

    # 4g. módulo: seções ↔ manifest ↔ botões de conclusão
    if m:
        secs = soup.select("section.sec[id]")
        dones = soup.select("[data-done]")
        if len(secs) != m["secs"]:
            fail("Progresso", f'{pfile}: {len(secs)} seções no HTML vs {m["secs"]} no manifest')
        else:
            ok("Progresso", f"{pfile}: {len(secs)} seções batem com o manifest")
        if len(dones) != len(secs):
            fail("Progresso", f"{pfile}: {len(dones)} botões de conclusão para {len(secs)} seções")
        sec_ids = [s["id"] for s in secs]
        done_ids = [d["data-done"] for d in dones]
        if sec_ids != done_ids:
            fail("Progresso", f"{pfile}: data-done não casa com os ids das seções")
        for d in dones:
            if not d.select_one(".done-lbl"):
                fail("Progresso", f'{pfile}: botão {d.get("data-done")} sem .done-lbl (JS depende)')
        # rodapé de navegação
        if not soup.find(id="upModFoot"):
            fail("Navegação", f"{pfile}: falta #upModFoot (rodapé anterior/próximo)")
        # checklists com os ids que o platform.js espera
        for old in ["checkBody","checkCount","doneBody","doneCount"]:
            if soup.find(id=old):
                fail("Progresso", f"{pfile}: id legado #{old} — deve ser #up{old[0].upper()+old[1:]}")

    # 4h. acessibilidade mínima
    if soup.html.get("lang") != "pt-BR": fail("HTML", f"{pfile}: lang != pt-BR")
    if not soup.find("meta", attrs={"name":"viewport"}): fail("Responsividade", f"{pfile}: sem viewport")
    for s in soup.select(".figure svg"):
        if not s.has_attr("aria-label") and not s.find("title"):
            warn("HTML", f"{pfile}: SVG de figura sem aria-label")
    for b in soup.select(".acc-btn"):
        if not b.has_attr("aria-expanded"):
            fail("HTML", f"{pfile}: acc-btn sem aria-expanded")

    # 4i. glossário — sigla usada sem <abbr> na primeira ocorrência
    if m:
        body = BeautifulSoup(raw, "html.parser")
        for t in body(["script","style","code","abbr"]): t.decompose()
        txt = body.get_text(" ")
        marked = {a.get("data-t") for a in soup.find_all("abbr")}
        for k in GLO:
            if re.search(r"(?<![\w/-])" + re.escape(k) + r"(?![\w/-])", txt) and k not in marked:
                warn("Glossário", f"{pfile}: usa “{k}” sem <abbr data-t> na 1ª ocorrência")

# ─────────────────────────────────────────────── 4b. índice de busca
SI = js_object("searchindex.js", "SEARCHINDEX")
if SI:
    idx_mods = set(SI["modules"])
    disk_mods = {m["id"] for m in built}
    if idx_mods != disk_mods:
        fail("Busca", f"searchindex dessincronizado — índice:{sorted(idx_mods)} disco:{sorted(disk_mods)} · rode build_index.py")
    else:
        ok("Busca", f'{len(SI["items"])} itens indexados de {len(idx_mods)} módulos')
    tipos = {}
    for it in SI["items"]:
        tipos[it["t"]] = tipos.get(it["t"], 0) + 1
        if it["m"] not in BY_ID: fail("Busca", f'item aponta para módulo inexistente: {it["m"]}')
    need = {"secao","subtitulo","figura","tabela","checklist"}
    if not need <= set(tipos): fail("Busca", f"índice não cobre: {sorted(need - set(tipos))}")
    else: ok("Busca", " · ".join(f"{k}:{v}" for k, v in sorted(tipos.items())))

# ─────────────────────────────────────────────── 5. glossário: integridade
CAMPOS = ["nome","simples","tecnica","importa","exemplo","onde"]
for k, g in GLO.items():
    falta = [c for c in CAMPOS if not g.get(c)]
    if falta: fail("Glossário", f"{k}: sem campo(s) {falta}")
    for ref in g.get("onde", []):
        if ref not in BY_ID: fail("Glossário", f'{k}: "onde" aponta para módulo inexistente "{ref}"')
    for v in g.get("veja", []):
        if v not in GLO: fail("Glossário", f'{k}: "veja" aponta para termo inexistente "{v}"')
if not [f for f in FAILS if f[0] == "Glossário"]:
    ok("Glossário", f"{len(GLO)} termos, {len(CAMPOS)} campos cada, referências íntegras")

# ─────────────────────────────────────────────── 6. CSS / JS do shell
css = open("platform.css", encoding="utf-8").read()

# --- TEMA: nenhuma cor fixa fora de :root e [data-theme="light"] ---
sem_com = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
blk_dark  = re.search(r":root\{.*?\n\}", sem_com, re.S)
blk_light = re.search(r'\[data-theme="light"\]\{.*?\n\}', sem_com, re.S)
if not blk_light:
    fail("Tema", "platform.css não define o tema claro")
else:
    resto_css = sem_com.replace(blk_dark.group(0), "").replace(blk_light.group(0), "")
    fixas = re.findall(r"#[0-9A-Fa-f]{3,8}\b", resto_css) + re.findall(r"rgba?\([^)]+\)", resto_css)
    if fixas:
        fail("Tema", f"cores fixas fora dos blocos de token: {sorted(set(fixas))[:5]}")
    else:
        ok("Tema", "0 cores fixas em regras — 100% tokenizado")

    # paridade: todo token de cor do dark tem contraparte no light
    def toks(b):
        return set(re.findall(r"(--[\w-]+)\s*:", b))
    NAO_COR = {"--topbar-h", "--sidebar-w", "--maxw", "--radius", "--radius-lg", "--ease"}
    COR = lambda t: any(k in t for k in ["bg","surface","elevated","line","gold","text","heading","white",
        "ok","warn","err","info","hover","scrim","overlay","topbar","shadow","code-well","--c1","--c2","--c3","--sog"])
    td = {t for t in toks(blk_dark.group(0))
          if COR(t) and not t.startswith("--print") and t not in NAO_COR}
    tl = toks(blk_light.group(0))
    falta = td - tl
    if falta: fail("Tema", f"tokens de cor sem contraparte no tema claro: {sorted(falta)}")
    else: ok("Tema", f"{len(td)} tokens de cor com paridade dark/light")

# theme.js roda antes do CSS pintar (evita flash)
if "prefers-color-scheme" not in open("theme.js", encoding="utf-8").read():
    fail("Tema", "theme.js não detecta prefers-color-scheme")
else: ok("Tema", "detecção automática do sistema + persistência")

decl = set(re.findall(r"(--[\w-]+)\s*:", css))
used = set(re.findall(r"var\((--[\w-]+)", css))
orf = used - decl
if orf: fail("CSS", f"variáveis indefinidas em platform.css: {sorted(orf)}")
else: ok("CSS", f"{len(decl)} tokens declarados, 0 órfãos")
if "@media" not in css: fail("Responsividade", "platform.css sem media queries")
else: ok("Responsividade", f'{css.count("@media")} media queries')
if "prefers-reduced-motion" not in css: fail("Responsividade", "não respeita prefers-reduced-motion")
else: ok("Responsividade", "prefers-reduced-motion respeitado")

import subprocess
for f in ["platform.js","manifest.js","glossario.js","theme.js","searchindex.js"]:
    r = subprocess.run(["node","--check",f], capture_output=True, text=True)
    if r.returncode: fail("JavaScript", f"{f}: {r.stderr.strip()[:100]}")
    else: ok("JavaScript", f"{f} sintaxe válida")

# breadcrumb é gerado pelo shell
if "buildCrumb" in open("platform.js", encoding="utf-8").read():
    ok("Breadcrumbs", "gerado centralmente pelo platform.js")
else:
    fail("Breadcrumbs", "platform.js não gera breadcrumb")

# ─────────────────────────────────────────────── relatório
DIMS = ["Arquivos","Manifest","Dependências","HTML","CSS","JavaScript","Links","Navegação",
        "Breadcrumbs","Progresso","Consistência visual","Glossário","Responsividade","Tema","Busca"]
print("\n" + "═"*66)
print("  VALIDAÇÃO DA PLATAFORMA · v" + MAN["version"])
print("═"*66)
for d in DIMS:
    f = len([x for x in FAILS if x[0]==d]); w = len([x for x in WARNS if x[0]==d]); p = len([x for x in PASSES if x[0]==d])
    st = "REPROVADO" if f else ("ATENÇÃO" if w else "OK")
    mark = "❌" if f else ("⚠️ " if w else "✅")
    print(f"  {mark} {d:20s} {st:10s} {p} ok · {w} avisos · {f} falhas")

if FAILS:
    print("\n  FALHAS")
    for d,m in FAILS: print(f"    ❌ [{d}] {m}")
if WARNS:
    print("\n  AVISOS")
    for d,m in WARNS[:14]: print(f"    ⚠️  [{d}] {m}")
    if len(WARNS) > 14: print(f"    … +{len(WARNS)-14} avisos")

nb = len(built)
print("\n" + "─"*66)
print(f"  Módulos no manifest: {len(MODS)}  ·  construídos: {nb}  ·  pendentes: {len(MODS)-nb}")
print(f"  Verificações: {len(PASSES)} ok · {len(WARNS)} avisos · {len(FAILS)} falhas")
print("═"*66)
print(f"  RESULTADO: {'❌ REPROVADO' if FAILS else '✅ APROVADO'}")
print("═"*66)
sys.exit(1 if FAILS else 0)
