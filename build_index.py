#!/usr/bin/env python3
"""
BUILD_INDEX.PY — Gera searchindex.js
=====================================
Por que existe: fetch() não funciona em file://. Busca global entre módulos
exige um índice pré-construído. Este script varre os módulos JÁ CONSTRUÍDOS
e emite searchindex.js, que o platform.js carrega junto com o manifest.

Indexa (requisito 2):
  seções · subtítulos (h3/h4) · figuras · tabelas · checklists · callouts

Roda SEMPRE depois de criar ou editar um módulo. O validate.py reprova se o
índice estiver dessincronizado do disco.

Uso: python3 build_index.py
"""
import re, os, json, subprocess, datetime
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

# ---------------------------------------------------------------- manifest
r = subprocess.run(["node", "-e",
    'const o=require("./manifest.js");process.stdout.write(JSON.stringify(o))'],
    capture_output=True, text=True)
MAN = json.loads(r.stdout)

def all_modules():
    out = []
    for c in MAN["courses"]:
        for m in c["modules"]:
            m = dict(m); m["courseN"] = c["n"]; m["courseTitle"] = c["title"]; out.append(m)
    cap = dict(MAN["capstone"]); cap["courseN"] = 4; cap["courseTitle"] = "Capstone"; cap["n"] = 1
    out.append(cap)
    return out

def nearest_section(node):
    """Âncora do elemento: a seção que o contém."""
    for p in node.parents:
        if p.name == "section" and "sec" in (p.get("class") or []) and p.get("id"):
            return p["id"]
    return None

def clean(s, limit=110):
    s = re.sub(r"\s+", " ", s).strip()
    return s[:limit] + ("…" if len(s) > limit else "")

items = []
stats = {}

for m in all_modules():
    if m["status"] == "todo" or not os.path.exists(m["file"]):
        continue
    soup = BeautifulSoup(open(m["file"], encoding="utf-8").read(), "html.parser")
    for t in soup(["script", "style"]):
        t.decompose()

    n = {"secao": 0, "subtitulo": 0, "figura": 0, "tabela": 0, "checklist": 0, "callout": 0}

    # -- seções
    for s in soup.select("section.sec[id]"):
        tag = s.select_one(".sec-tag span:first-child")
        h2 = s.select_one("h2")
        lede = s.select_one(".sec-lede")
        items.append({"m": m["id"], "t": "secao",
                      "n": tag.get_text(strip=True) if tag else "",
                      "label": h2.get_text(strip=True) if h2 else s["id"],
                      "sub": clean(lede.get_text()) if lede else "",
                      "a": s["id"]})
        n["secao"] += 1

    # -- subtítulos (h3 e h4 do corpo, fora de cards/accordions)
    for h in soup.select("section.sec h3, section.sec h4"):
        if h.find_parent(class_=["card", "acc-body", "vs-col", "summary", "check-head", "ex", "gl-item"]):
            continue
        a = nearest_section(h)
        if not a:
            continue
        items.append({"m": m["id"], "t": "subtitulo", "n": "", "label": h.get_text(strip=True), "sub": "", "a": a})
        n["subtitulo"] += 1

    # -- figuras
    for f in soup.select(".figure"):
        cap = f.select_one(".figure-cap")
        if not cap:
            continue
        b = cap.select_one("b")
        rotulo = b.get_text(strip=True) if b else "Figura"
        svg = f.select_one("svg")
        alt = svg.get("aria-label", "") if svg else ""
        items.append({"m": m["id"], "t": "figura", "n": rotulo,
                      "label": clean(alt or cap.get_text(), 90),
                      "sub": clean(cap.get_text(), 120), "a": nearest_section(f) or ""})
        n["figura"] += 1

    # -- tabelas (rotuladas pelo cabeçalho)
    for t in soup.select("table"):
        ths = [x.get_text(strip=True) for x in t.select("thead th")]
        if not ths:
            continue
        items.append({"m": m["id"], "t": "tabela", "n": f"{len(t.select('tbody tr'))} linhas",
                      "label": " · ".join(ths), "sub": "", "a": nearest_section(t) or ""})
        n["tabela"] += 1

    # -- checklists
    for c in soup.select(".check"):
        h = c.select_one(".check-head h4")
        cnt = len(c.select("input[type=checkbox]"))
        items.append({"m": m["id"], "t": "checklist", "n": f"{cnt} itens",
                      "label": h.get_text(strip=True) if h else "Checklist",
                      "sub": " · ".join(g.get_text(strip=True) for g in c.select(".check-group")),
                      "a": nearest_section(c) or ""})
        n["checklist"] += 1

    # -- callouts nomeados (os boxes com título são pontos de referência reais)
    for c in soup.select(".callout"):
        h = c.select_one(".callout-head span")
        if not h:
            continue
        items.append({"m": m["id"], "t": "callout", "n": "",
                      "label": h.get_text(strip=True),
                      "sub": clean(c.select_one("p").get_text() if c.select_one("p") else "", 120),
                      "a": nearest_section(c) or ""})
        n["callout"] += 1

    stats[m["id"]] = n

# ---------------------------------------------------------------- emitir
out = f'''/* =====================================================================
   SEARCHINDEX.JS — GERADO AUTOMATICAMENTE. NÃO EDITE À MÃO.
   ---------------------------------------------------------------------
   Produzido por build_index.py em {datetime.datetime.now().strftime("%Y-%m-%d %H:%M")}
   Módulos indexados: {len(stats)}   Itens: {len(items)}

   Existe porque fetch() não funciona em file://: busca global entre
   módulos exige índice pré-construído.

   Regenerar SEMPRE após criar ou editar um módulo:
       python3 build_index.py && python3 validate.py
   ===================================================================== */

var SEARCHINDEX = {{
  generated: "{datetime.datetime.now().isoformat(timespec="seconds")}",
  modules: {json.dumps(sorted(stats.keys()))},
  items: {json.dumps(items, ensure_ascii=False, indent=0)}
}};

if (typeof module !== "undefined" && module.exports) module.exports = SEARCHINDEX;
'''
open("searchindex.js", "w", encoding="utf-8").write(out)

print(f"searchindex.js gerado · {len(items)} itens de {len(stats)} módulos\n")
print(f"  {'módulo':14s} {'seções':>7s} {'subtít.':>8s} {'figuras':>8s} {'tabelas':>8s} {'checkl.':>8s} {'callouts':>9s}")
for mid, n in stats.items():
    print(f"  {mid:14s} {n['secao']:7d} {n['subtitulo']:8d} {n['figura']:8d} {n['tabela']:8d} {n['checklist']:8d} {n['callout']:9d}")
