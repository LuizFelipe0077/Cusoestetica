# ARCHITECTURE

Padrão **Platform Shell**: um motor único (`platform.js`) constrói todo o
chrome (sidebar, topbar, breadcrumb, navegação anterior/próximo, progresso,
busca, tooltips de glossário) a partir de dados declarativos
(`manifest.js`, `glossario.js`, `searchindex.js`). Cada módulo é um arquivo
`.html` autocontido que só declara **conteúdo** — nunca estrutura de
navegação, nunca componente visual novo.

```
manifest.js ──┐
glossario.js ─┼──► platform.js ──► injeta chrome em cada módulo.html
searchindex.js┘         │
                         ▼
                   platform.css (design system, ~70 tokens)
                   theme.js (bootstrap dark/light, roda antes do CSS pintar)
```

## Por que este desenho

- **`file://` sem servidor**: a plataforma roda direto do disco, sem build
  step e sem backend. Isso descarta `fetch()` (bloqueado em `file://` pela
  maioria dos navegadores) — por isso o índice de busca é pré-computado em
  `searchindex.js` e carregado como `<script>`, não buscado em runtime.
- **Fonte única de verdade**: adicionar/editar um curso ou módulo é uma
  edição em `manifest.js`, ponto. Nenhum outro arquivo lista módulos —
  sidebar, índice, breadcrumb, prev/next, progresso e mapa de dependências
  são todos *derivados* dele em runtime.
- **Zero dependência externa**: 0 recursos `http(s)://` em qualquer `href`/
  `src` dos 37 arquivos HTML. Nenhuma CDN, nenhuma fonte externa, nenhuma
  biblioteca de terceiros. Trade-off aceito: mais HTML/CSS/JS escrito à mão,
  em troca de zero superfície de dependência e funcionamento offline total.

## Os 4 arquivos de dados

### `manifest.js`
Objeto `PLATFORM` global (`module.exports` também, para os scripts Node de
validação). Estrutura:

```js
PLATFORM = {
  version, codename, name, subtitle, storageKey, frozenAt,
  courses: [ { id, n, title, question, desc, modules: [ {...} ] } ],
  capstone: { id, title, file, status, vol, min, secs, deps },
  absorptions: [...],  // histórico auditável de módulos que colidiram/fundiram
  removed: [...],       // histórico auditável de módulos descartados
  all(), find(id), prev(id), next(id), course(id), total()  // API derivada
}
```

Campos de cada módulo:

| Campo | Significado |
|---|---|
| `id` | Identificador único (`c1-m3`, `sog`) — usado por `deps`, `.modref[data-mod]`, `onde`/`veja` do glossário |
| `file` | Nome do `.html` no disco |
| `status` | `"done"` \| `"partial"` \| `"todo"` |
| `vol` | `"low"` \| `"med"` \| `"high"` — volatilidade do tema; `"high"` exige pesquisa (`WebSearch`) antes de escrever, não só conhecimento já treinado |
| `min` | Minutos estimados de leitura |
| `secs` | Número de seções `<section class="sec reveal" id="sN">` — deve bater exatamente com o HTML |
| `deps` | IDs de módulos que devem ser lidos antes (grafo, precisa ser acíclico) |

**Regra de ouro**: para adicionar um curso ou módulo, editar *somente* aqui.

### `glossario.js`
Objeto `GLOSSARIO` (chave = sigla/termo, ex. `"ROAS"`). Cada entrada tem 6
campos obrigatórios (`nome`, `simples`, `tecnica`, `importa`, `exemplo`,
`onde`) mais opcionais (`veja`, `obsoleto`). `onde` é a lista de ids de
módulo onde o termo aparece — mantida manualmente a cada módulo novo.
61 termos na versão 1.0.0 (RELEASE FINAL) atual.

Todo uso em prosa de um termo do glossário precisa de pelo menos **uma**
ocorrência envolta em `<abbr data-t="Termo">Termo</abbr>` no arquivo — não
precisa marcar toda ocorrência, só a primeira/alguma. Ocorrências dentro de
`<code>` (parâmetros técnicos como `event_id`) são isentas dessa regra.

### `searchindex.js`
Gerado por `build_index.py` (não editar à mão). Indexa seções, subtítulos,
figuras, tabelas e checklists de cada módulo construído, porque `fetch()` não
funciona em `file://` e a busca precisa de um índice pronto. `validate.py`
reprova se este arquivo estiver dessincronizado do disco (módulos indexados
≠ módulos com `status !== "todo"`).

### `theme.js`
O menor dos quatro. Roda **antes** do CSS pintar (bloqueante, no `<head>`)
especificamente para decidir `data-theme="dark"` ou `"light"` no `<html>`
antes do primeiro paint — evita o flash de tema errado. Lê
`prefers-color-scheme` e a preferência salva em `localStorage`.

## `platform.js`

O motor. Responsabilidades, todas centralizadas aqui (nenhum módulo
reimplementa nada disso):

- Construir topbar, sidebar e footer a partir do `manifest.js`.
- `buildCrumb()` — breadcrumb curso/módulo.
- Navegação anterior/próximo (`#upModFoot`) via `PLATFORM.prev()`/`.next()`.
- Progresso: escuta cliques em `[data-done]`, persiste em `localStorage`
  (chave `up_progress_v1`), com **fallback em memória** se `localStorage`
  estiver bloqueado (comum em alguns navegadores para origens `file://`
  restritivas).
- `Platform.init({ id, onReady })` — chamado no fim do `<body>` de todo
  módulo; `onReady` é o hook para o JS exclusivo do módulo (se houver) rodar
  depois que o chrome já existe no DOM.
- `Platform.exportData()` / `Platform.importData(json)` — round-trip
  completo do estado salvo (progresso, favoritos, histórico, tema).
- Busca (overlay tipo Cmd/K) sobre `searchindex.js`.
- Tooltips de glossário sobre `<abbr data-t="...">`.
- Atalhos de teclado globais: `G` glossário, `I` índice, `M` mapa, `F`
  favoritos, `H` histórico, `P` painel.
- Resolução de `.modref[data-mod="id"]` em link real — módulos nunca
  escrevem `href` fixo para outro módulo, só a referência por id; o shell
  resolve em runtime (assim renomear um arquivo não quebra referências).

## `platform.css` — design system

Tudo é `var(--token)`. Zero cor fixa (`#hex`/`rgba(...)`) fora de dois
blocos: `:root{}` (tema escuro, padrão) e `[data-theme="light"]{}` (tema
claro). ~70 tokens declarados — cada token de cor do bloco escuro precisa de
contraparte no bloco claro (paridade obrigatória, checada por `validate.py`).

Índice do arquivo (comentado no topo do próprio `platform.css`):

1. Tokens · 2. Reset & base · 3. Shell (topbar/sidebar/main) · 4. Navegação ·
5. Busca · 6. Glossário · 7. Componentes de conteúdo · 8. Selos de evidência ·
9. Portal (`index.html`) e Mapa · 10. Responsivo (breakpoints 1100px/900px/
560px + `prefers-reduced-motion`) · 11. Impressão.

Um módulo pode ter **no máximo um** `<style>` próprio, só para o que é
genuinamente exclusivo dele (ex. a planilha lógica interativa do C1.M3) — e
mesmo esse bloco só pode usar `var(--token)`, nunca redeclarar seletor ou
token do shell (`.card{`, `--gold:`, etc.).

## Anatomia de um módulo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta name="viewport" ...>
  <script src="theme.js"></script>          <!-- bloqueante, evita flash de tema -->
  <link rel="stylesheet" href="platform.css">
  <style>/* só se este módulo tiver algo genuinamente exclusivo */</style>
</head>
<body>
  <main id="conteudo">                       <!-- âncora do skip-link -->
    <header class="hero">...</header>
    <section class="sec reveal" id="s1">
      ...
      <div class="done-bar">
        <button class="done-btn" data-done="s1">...</button>
      </div>
    </section>
    <!-- s2, s3, ... até secs do manifest -->
    <div class="modfoot" id="upModFoot"></div> <!-- preenchido pelo platform.js -->
  </main>
  <script src="manifest.js"></script>
  <script src="glossario.js"></script>
  <script src="searchindex.js"></script>
  <script src="platform.js"></script>
  <script>Platform.init({ id: "c1-mN" });</script>
</body>
</html>
```

Regras estruturais fixas (verificadas por `validate.py`, replicadas
manualmente quando Python não está disponível — ver `CLAUDE.md`):
- Número de `<section class="sec reveal" id="sN">` == `secs` do manifest.
- Um `data-done="sN"` por seção, na mesma ordem/sequência.
- `#upModFoot` presente (o shell injeta o nav anterior/próximo ali).
- `.modref[data-mod="id"]` nunca tem `href` — resolvido em runtime.
- IDs legados proibidos: `#checkBody`, `#checkCount`, `#doneBody`,
  `#doneCount` (o padrão atual é `#upCheckBody`/`#upCheckCount`/
  `#upDoneBody`/`#upDoneCount`).
- `.figure svg` sempre com `aria-label` ou `<title>`; `.acc-btn` sempre com
  `aria-expanded`.

## Componentes do design system

Teto fechado desde o **Feature Freeze** (2026-07-18) — nenhum componente
novo até o RELEASE FINAL:

`callout` (variantes gold/warn/danger/science/win) · `selo-box`/`selo`
(evidência/inferência/prática/mito) · `figure` (SVG + legenda) · `acc`
(acordeão) · `check` (checklist com contadores) · `qa` (autoavaliação) · `ex`
(exercício com textarea) · `rew` (revisão) · `summary` · `grid`/`card` ·
tabela · `skip-link` · a **planilha lógica interativa** (padrão introduzido
pelo C1.M3 — calculadora financeira em IIFE isolada, ver comentário no topo
de `c1-m3-oferta.html` para as regras específicas desse padrão).

## Validação

`validate.py` cobre 11 dimensões: links internos, breadcrumbs, navegação,
integridade HTML, CSS, JavaScript, consistência visual, dependências entre
módulos, sistema de progresso, glossário, responsividade — e falha
(`exit 1`) se qualquer uma reprovar. Deve rodar antes de qualquer módulo ser
considerado concluído. `build_index.py` deve rodar depois de qualquer edição
de módulo, para manter `searchindex.js` sincronizado (o próprio `validate.py`
checa esse sincronismo).

## Armazenamento

Todo estado do usuário fica em `localStorage['up_progress_v1']`: progresso
por módulo/seção, favoritos (módulos e termos), histórico de visitas,
preferência de tema. Formato versionado (`v: 2` atualmente) para permitir
migração futura sem quebrar dados salvos. Sem fallback em memória, o
progresso simplesmente não persiste entre recarregamentos — a plataforma
continua funcional, só perde o estado ao fechar a aba.
