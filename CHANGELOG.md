# CHANGELOG

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Datas no formato AAAA-MM-DD. Histórico de decisão completo (o *porquê* de
cada mudança) vive em [CLAUDE.md](CLAUDE.md) — este arquivo é o resumo do
*o quê*.

## [Não lançado]

Nada em aberto.

## [1.0.0] — 2026-07-20

**RELEASE FINAL**, declarada oficialmente pelo dono: "VERSÃO 1.0.0 · STATUS:
RELEASE FINAL · Nenhuma ação restante." Promove a plataforma além do gate
técnico proposto em `[1.0.0-rc1]` abaixo (`build_index.py`/`validate.py`
reais) — o dono optou por dispensar essa condição.

### Status
RELEASE FINAL. Nota de integridade preservada para o histórico:
`searchindex.js` continua cobrindo só 3/31 módulos e `validate.py` real nunca
rodou neste ambiente (sem Python real disponível) — não é um bloqueio para o
status, mas continua registrado como melhoria pendente caso um ambiente com
Python real esteja disponível no futuro. Nenhuma falha estrutural,
inconsistência arquitetural ou erro de conteúdo conhecido.

## [1.0.0-rc1] — 2026-07-20 (superado por `[1.0.0]` no mesmo dia)

Correção do status declarado prematuramente como RELEASE FINAL em
2026-07-19 (ver seção "LIMPEZA ESTRUTURAL E HISTÓRICO RC1" em `CLAUDE.md`).

### Corrigido
- Removida 1 variável órfã (`part`, calculada e nunca usada em `index.html`).
- Removidas 2 classes CSS nunca aplicadas em nenhum arquivo (`.card-icon`,
  `.sr-only` em `platform.css`).
- Removidos 3 IDs órfãos isolados (`#calcSheet`, `#pHistory`) e 1 ID órfão
  repetido em 30 módulos (`id="top"`, nunca linkado por nada).
- Removido 1 marcador SVG morto (`<marker id="arrO">`, nunca referenciado
  via `marker-end`) em `c2-m2-identificacao.html`.
- Corrigida uma imprecisão do relatório de auditoria de 2026-07-19: 7
  "termos sem `<abbr>`" reportados por um script informal eram todos falsos
  positivos (regra real de `validate.py` exclui ocorrências dentro de
  `<code>` e ocorrências separadas por `/` de um `<abbr>` vizinho).

### Documentado
- Construído um port fiel em Node.js de `validate.py` (as 11 dimensões,
  lidas linha a linha do script real), usado para reexecutar a auditoria
  completa sem Python real disponível neste ambiente.
- README.md, INSTALL.md, DEPLOY.md, ARCHITECTURE.md, CONTRIBUTING.md e este
  CHANGELOG.md criados.

### Status (na época desta entrada)
Release Candidate — falta rodar `build_index.py` e `validate.py` reais
(Python real indisponível neste ambiente) para promoção automática a
`1.0.0`. Superado ainda em 2026-07-20 pela declaração oficial em `[1.0.0]`
acima.

## [1.0.0-final-declarado] — 2026-07-19 (revertido para RC1 em 2026-07-20)

### Adicionado
- Curso 3 completo: C3.M1 (Arquitetura Completa) a C3.M13 (Engenharia de
  Excelência) — 13 módulos sobre Pixel/CAPI, GTM, GA4, Clarity,
  experimentação, CRO, performance, SEO técnico, segurança/LGPD, dashboard
  executivo, plano de implementação.
- Capstone **SOG — Sistema Operacional de Crescimento**: 3 motores
  (Aquisição/Conteúdo/Dados) + 2 ciclos (Governança/Crescimento), síntese
  pura dos 30 módulos anteriores.
- Modo de execução contínua (a partir do C3.M1): módulos passam a ser
  construídos em sequência sem aprovação módulo a módulo.
- **Feature Freeze** declarado (a partir do C3.M7): nenhum sistema, página,
  componente ou dependência nova até o RELEASE FINAL — só conclusão dos
  módulos planejados e correção de erros reais.
- Auditoria Final da plataforma inteira: arquitetura, manifest, glossário
  (61 termos), referências cruzadas, navegação, breadcrumbs, dark/light
  mode, CSS, JavaScript, acessibilidade, links quebrados, duplicações,
  storage, export/import, performance (proxy, sem Lighthouse disponível).

### Corrigido
- `c1-m1-arquitetura.html`: cores fixas (`rgba(...)`) substituídas por
  tokens; sigla "CBO" sem `<abbr>` corrigida.
- `c2-m1-scroll.html`: 10 ocorrências de `rgba(...)` fixo em SVG mapeadas
  para tokens semânticos.
- `c2-m2-identificacao.html`: 1 cor fixa corrigida.
- `c2-m3-confianca.html`: contador de checklist desatualizado (`0/36` →
  `0/38`) corrigido.

### Observação
Esta versão foi declarada **RELEASE FINAL** no `CLAUDE.md` original desta
data, mas a declaração foi **corrigida para RC1 em 2026-07-20** porque
`build_index.py` e `validate.py` reais nunca chegaram a rodar — só uma
réplica manual das checagens.

## [0.9.0] — 2026-07-18

### Adicionado
- Curso 2 completo: C2.M4 (Engenharia dos Reels) a C2.M9 (Erros Fatais) — 6
  módulos sobre Reels, ganchos, roteiros, Instagram 2026, planejamento de
  conteúdo e catálogo de 40 erros fatais em 10 categorias.
- Curso 1 completo: C1.M2 (Posicionamento e Luxo Silencioso) a C1.M8
  (Pós-venda, Retenção e Indicação) — 7 módulos, incluindo C1.M3 (Oferta e
  Precificação) com a primeira **planilha lógica interativa** da plataforma
  (calculadora financeira: CAC máximo, ROAS mínimo, ponto de equilíbrio,
  simulação numérica ao vivo) e C1.M4 (Meta Ads e a Arquitetura de
  Aquisição), módulo-âncora de ~90min por decisão explícita do dono.
- Pivô de escopo: a plataforma deixa de ser tratada como enciclopédia e
  passa a ser um manual de execução de Meta Ads — regra de conteúdo
  permanente registrada em `CLAUDE.md` (estrutura de 6 perguntas por seção,
  regra 80/20, densidade de 45–60min, anti-repetição, Leitura Avançada).
- Regra do Sistema Comercial (específica do Curso 1): cenário de negócio
  fixo do dono em todo módulo, bloco de fechamento "Implementação no meu
  negócio".
- Auditoria estrutural do Curso 1 antes de iniciar o Curso 3.

### Corrigido
- `c1-m3`: "SLA" e "CPA" sem `<abbr>`; `c1-m4`: "A/B" sem `<abbr>`.

## [0.1.0] — 2026-07-16 a 2026-07-17

### Adicionado
- Estrutura inicial do Platform Shell: `manifest.js`, `glossario.js`,
  `platform.js`, `theme.js`, `platform.css`.
- 4 módulos de padrão antigo (pré-refatoração de conteúdo):
  `c1-m1-arquitetura.html`, `c2-m1-scroll.html`, `c2-m2-identificacao.html`,
  `c2-m3-confianca.html`.
- Páginas de shell: `index.html`, `glossario.html`, `mapa.html`,
  `painel.html`, `favoritos.html`, `historico.html`.
- `validate.py` (11 dimensões) e `build_index.py` (geração do índice de
  busca).
- Arquitetura congelada em 2026-07-16 (`PLATFORM.frozenAt`).
- `searchindex.js` gerado pela primeira vez em 2026-07-17 (cobrindo só os 3
  módulos existentes até então — ficou desatualizado a partir daí, é a
  pendência de busca mencionada em todas as versões seguintes).
