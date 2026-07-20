# Cusoestetica — Universidade Premium

Plataforma de estudo pessoal (Platform Shell + HTML por módulo) sobre aquisição de
pacientes para estética integrativa. Fonte única de verdade da estrutura de cursos:
[manifest.js](manifest.js). Ideias adiadas/rejeitadas ficam em
[ROADMAP-POS-RELEASE.md](ROADMAP-POS-RELEASE.md) — nada entra no código antes da
release final além de correções apontadas pelo validador (`validate.py`).

31 módulos em 3 cursos (C1 Sistema Comercial, C2 Psicologia e Conteúdo, C3 Engenharia
e Dados) + capstone SOG. **TODOS OS 31 MÓDULOS CONSTRUÍDOS (2026-07-19).** Curso 1
completo (8), Curso 2 completo (9), Curso 3 completo (13), capstone SOG completo
(1). c1-m1, c2-m1, c2-m2, c2-m3 são do padrão antigo (pré-2026-07-18); todo o
resto (c1-m2 a c1-m8, c2-m4 a c2-m9, c3-m1 a c3-m13, sog) é do padrão novo. Auditoria
Final concluída e limpeza estrutural aplicada (2026-07-20) — **STATUS OFICIAL:
RELEASE FINAL v1.0.0**, declarado pelo dono em 2026-07-20, ver "DECLARAÇÃO OFICIAL —
RELEASE FINAL v1.0.0" no fim deste arquivo. Nota de integridade técnica preservada
para o histórico: `build_index.py` e `validate.py` reais nunca chegaram a rodar
neste ambiente (Python indisponível) — a promoção veio de decisão explícita do
dono, não da satisfação do gate técnico originalmente proposto. Rodar os dois
scripts quando houver Python real disponível continua recomendado, mas deixou de
ser condição para o status.

### Auditoria estrutural do Curso 1 (2026-07-18)
Feita a pedido do dono ao fechar o Curso 1, antes de iniciar o Curso 3 — sem
retrofit de conteúdo, só verificação. Manual (Python indisponível neste ambiente),
mas abrangente: manifest (31 ids únicos, 0 deps inválidas, grafo acíclico, sequência
prev/next c1-m1→...→c1-m8→c2-m1 íntegra), glossário (60 termos, 0 falhas de
integridade referencial em `onde`/`veja`), estrutura por arquivo (seções batendo com
`secs`, botões de conclusão sequenciais, checklists com contagem correta, `modref`
sem `href` e todos válidos, `aria-expanded`/`aria-label` completos, nenhum recurso
externo, nenhuma cor fixa fora do c1-m1 — ver abaixo) nos 8 módulos.

**Encontrado e corrigido nesta auditoria** (módulos desta sessão, não é retrofit):
c1-m3 tinha "SLA" e "CPA" sem `<abbr>`; c1-m4 tinha "A/B" sem `<abbr>`. Os três
corrigidos, `onde` do glossário atualizado.

**Encontrado e NÃO corrigido — backlog para a Auditoria Final** (arquivo do padrão
antigo, fora do escopo desta verificação):
- `c1-m1-arquitetura.html` usa `rgba(201,169,97,...)` fixo em 5 lugares (2 `fill`
  de `<rect>` de SVG, 3 `style="background:..."` de `<tr>`) em vez de
  `var(--gold-glow)`/token equivalente — quebra a paridade de tema claro/escuro que
  o `validate.py` cobra. Precisa virar token no retrofit.
- `c1-m1-arquitetura.html` usa "CBO" em texto puro sem `<abbr>` — não é erro do
  arquivo original (CBO só entrou no glossário quando o C1.M4 foi escrito, nesta
  sessão); é consequência de eu ter adicionado o termo depois. Envolver com
  `<abbr data-t="CBO">` no retrofit resolve.

---

## DIRETRIZ DE CONTEÚDO — permanente a partir de 2026-07-18

Decisão oficial do dono do projeto. Vale para **todos os módulos ainda não construídos**.
Em caso de dúvida entre profundidade acadêmica e aplicabilidade prática, **escolha a
aplicabilidade prática**.

**Congelamento (2026-07-18):** arquitetura, escopo e estrutura dos módulos estão
congelados. Este `CLAUDE.md` é a fonte oficial das diretrizes do projeto — não
reabrir essas decisões sem pedido explícito do dono. A prioridade absoluta agora é
concluir os módulos restantes na sequência do `manifest.js`.

### Retrofit dos módulos já entregues (c1-m1, c2-m1, c2-m2, c2-m3)
**Não fazer agora.** É uma etapa única da **Auditoria Final**, imediatamente antes da
RELEASE FINAL — não antes. Quando chegar essa etapa, o retrofit é **leve**, não uma
reescrita:
- Cortar excesso de texto só onde isso comprometer objetividade — não cortar por cortar.
- Inserir referências cruzadas onde isso reduzir repetição real.
- Garantir que todo módulo abra e feche seguindo o mesmo padrão do `CLAUDE.md`.
- Padronizar a estrutura pedagógica sem reescrever o conteúdo.
- Não perder rigor científico nem remover explicações importantes — isso não é
  negociável, mesmo sob a diretriz de objetividade.

### Objetivo único
Esta plataforma existe para que o dono consiga criar, executar, otimizar e escalar
campanhas de Meta Ads para vender seus dois protocolos de estética integrativa
(melasma e estrias). Todo conteúdo deve servir a isso. Se um assunto não contribui
diretamente para aumentar conversão, reduzir CAC, melhorar posicionamento ou aumentar
faturamento, ele deve ser resumido ou removido — não é mais uma enciclopédia, é um
manual de execução.

### Tamanho
Módulos ~40% menores que o padrão dos 4 já entregues. Nada de tratado acadêmico.

### Estrutura obrigatória por módulo
Cada módulo (ou cada bloco temático dentro dele) deve responder, nesta ordem:
1. O que é?
2. Por que isso importa?
3. Como aplico no meu negócio?
4. Como isso melhora minhas campanhas?
5. Quais erros devo evitar?
6. Checklist de execução.

Todo o resto é complementar e deve vir depois, resumido.

### Regra 80/20
Ensinar os 20% dos conceitos que geram 80% dos resultados práticos. Evitar
aprofundamento que não aumente a capacidade prática de vender.

### Psicologia e neurociência
Só entram quando produzem impacto direto e demonstrável em: criativos, copy, landing
pages, anúncios, vídeos, Instagram, vendas. Nada de discussão acadêmica longa —
psicologia só o que serve para retenção, conexão, autoridade, confiança, decisão e
conversão.

### Conteúdo técnico/engenharia
Toda explicação técnica termina com uma seção prática: **"Como aplicar hoje."**

### Prioridade de marketing
Meta Ads, Instagram, Pixel, CAPI, Landing Pages, Criativos, Funis, Remarketing, Oferta,
Posicionamento — nesta ordem de prioridade quando houver conflito de espaço.

### Exemplos
~80% dos exemplos devem usar os próprios protocolos do dono (melasma, estrias) e
cenários reais dele: Consulta Online, Estética Integrativa, Instagram, WhatsApp,
Landing Page, Meta Ads.

### Anti-repetição
Se um conceito já foi explicado em outro módulo, não reexplicar — fazer referência
cruzada (link/menção ao módulo, ex.: "ver c2-m3 §4"). Consultar `manifest.js` (campo
`deps`) e o glossário (`glossario.js`) antes de reintroduzir um conceito.

### Aprofundamento específico
Qualquer aprofundamento muito específico que quebraria o ritmo do fluxo principal vai
num bloco isolado chamado **"Leitura Avançada"**, para que o corpo principal do módulo
continue rápido e aplicável.

### Validação durante a produção — Python indisponível neste ambiente (regra permanente, 2026-07-18)
Este ambiente de ferramenta não tem Python real instalado (só o stub da Microsoft
Store) — `build_index.py` e `validate.py` não rodam aqui. Decisão do dono: **isso não
interrompe a produção dos módulos.**

- Continue produzindo os módulos seguintes normalmente, na sequência do `manifest.js`.
- Em cada módulo novo, faça toda a validação estrutural manual possível no lugar do
  validador: nº de seções bate com `secs` do manifest, botões `data-done` sequenciais
  batendo com os ids das seções, ids do checklist (`#upCheckBody`/`#upCheckCount`/
  `#upDoneBody`/`#upDoneCount`) e suas contagens, `.figure svg` com `aria-label`,
  `.modref[data-mod]` sem `href` e apontando para id válido do manifest, ausência de
  cor fixa (`#hex`/`rgba`) e de recurso externo, `lang="pt-BR"` e viewport presentes,
  balanceamento de tags, siglas do glossário sempre com `<abbr data-t>` em pelo menos
  uma ocorrência.
- Atualize `manifest.js` (status, secs, min) e `glossario.js` (campo `onde` dos termos
  usados) normalmente ao final de cada módulo — essas edições são manuais por natureza
  e não dependem do Python.
- **Não** edite `searchindex.js` à mão — ele é gerado por `build_index.py` e é
  facilmente inconsistente se tocado manualmente. Deixe-o defasado até o lote.
- Nunca presuma que uma verificação manual substitui o validador. Quando houver dúvida
  sobre se algo passaria no `validate.py`, registre como pendência em vez de assumir
  que está correto.
- Regeneração de `searchindex.js` e execução de `validate.py` ficam para quando o
  projeto rodar num ambiente com Python — em lote, não módulo a módulo. Inconsistências
  encontradas são corrigidas nesse lote, antes da RELEASE FINAL.

**Pendências de validação automática (atualizar a cada módulo novo):**
- c2-m4 (Engenharia dos Reels) — `searchindex.js` não regenerado, `validate.py` não
  executado. Verificação manual feita e documentada na sessão de 2026-07-18.
- c2-m5 (Biblioteca de Ganchos) — mesma pendência. Verificação manual feita na sessão
  de 2026-07-18. Catálogo reduzido de 52×4 (plano original) para 20×3 — ver "Módulos-
  catálogo" acima; `deps` ganhou `c2-m3` além de `c2-m1`/`c2-m2` porque o conteúdo
  final apoia-se bastante no modelo ABI e na hierarquia de prova do C2.M3.
- c2-m6 (Engenharia dos Roteiros) — mesma pendência. Verificação manual feita na
  sessão de 2026-07-18. Catálogo reduzido de 24 roteiros (plano original) para 10;
  `deps` passou de `["c2-m5"]` para `["c2-m2","c2-m3","c2-m4","c2-m5"]` porque os
  roteiros se apoiam diretamente nos medos/frustrações do C2.M2, no teste de verdade
  do C2.M3 §3.9 e nas camadas/formatos do C2.M4.
- c2-m7 (Instagram 2026) — mesma pendência de `searchindex.js`/`validate.py`.
  `vol:"high"` — pesquisado via `WebSearch` em 2026-07-18 (regra do próprio
  `manifest.js`: volatilidade exige search-first). Fontes: About Instagram/Meta
  Transparency Center (oficiais, para os sinais de ranqueamento) e declarações de
  Mosseri reportadas pela imprensa especializada (para os 3 sinais, a penalidade de
  repost de 2026 e o memo "conteúdo humano" — magnitudes exatas não confirmadas pela
  Meta, só a direção). Como todo módulo `vol:"high"`, revisar o conteúdo a cada
  trimestre — política de plataforma muda sem aviso. `deps` passou de `["c2-m4"]`
  para `["c2-m4","c2-m5","c2-m6"]`.
- c2-m8 (Planejamento de Conteúdo) — mesma pendência de `searchindex.js`/
  `validate.py`. Módulo de síntese (não introduz teoria nova, organiza C2.M4–M7 em
  calendário) — primeiro módulo já escrito sob a regra de densidade de 45–60min.
  `deps` passou de `["c2-m6","c2-m7"]` para `["c2-m4","c2-m5","c2-m6","c2-m7"]`
  porque a cadência e os 5 checklists reaproveitam diretamente os quatro.
- c2-m9 (Erros Fatais) — mesma pendência de `searchindex.js`/`validate.py`. Fecha o
  Curso 2. Catálogo curado em 40 erros/10 categorias (não os 100 do plano original,
  nem ~20% disso — ver "Módulos-catálogo" refinado acima). Título mudou de "Erros
  Fatais (100)" para "Erros Fatais"; `secs` foi de 11→11 (coincidência: eram 9
  categorias, viraram 10 categorias + 1 seção de fechamento). `deps` passou de
  `["c2-m8"]` para `["c1-m1","c2-m3","c2-m4","c2-m5","c2-m6","c2-m7","c2-m8"]`.
  Muitas das 40 entradas apontam pra módulos de C1 e C3 ainda `"todo"` (Meta Ads,
  Pixel, Landing Pages, WhatsApp, Consulta, Escala) — isso é esperado, é o mapa do
  que vem, não uma dependência de leitura. Onze abreviações de glossário usadas
  (CPM, CPC, CAC, LTV, SLA, Pixel, CAPI, event_id, EMQ, GA4, LCP) — todas com
  `<abbr>` confirmado; `onde` de todas as 11 atualizado com `c2-m9` em `glossario.js`.
- c1-m2 (Posicionamento e Luxo Silencioso) — mesma pendência de `searchindex.js`/
  `validate.py`. Primeiro módulo do Curso 1 e primeiro sob a Regra do Sistema
  Comercial (bloco "Implementação no Meu Negócio" no fechamento, cenário fixo do
  dono aplicado em toda seção). `deps` passou de `["c2-m3"]` para
  `["c1-m1","c2-m3","c2-m4","c2-m6"]`. Verificação manual sem erros de primeira
  (checklist 12/12 e 6/6 bateram na primeira tentativa).
- c1-m4 (Meta Ads e a Arquitetura de Aquisição) — mesma pendência de
  `searchindex.js`/`validate.py`. `vol:"high"` — pesquisado via `WebSearch` em
  2026-07-18 (learning phase, Categoria Especial de saúde, janelas de atribuição,
  Advantage+/CBO→Advantage+ Campaign Budget), fontes oficiais citadas por seção com
  URL e data. **Módulo-âncora deliberado**: por pedido do dono, este módulo excede a
  regra de densidade de 45-60min (ficou em ~90min) — decisão explícita dele diante
  da tensão entre a Regra de Densidade e o volume de conteúdo que pediu (18 subtemas
  de Meta Ads + engenharia de decisão + plano operacional completo). O mapa de 13
  etapas (paciente ideal → indicação) é só contexto breve com referência cruzada, e
  não duplica o `C3.M1 — Arquitetura Completa` (ainda não construído) nem os 6
  módulos futuros que cada etapa não-Meta-Ads já tem reservados — decisão tomada
  entre duas opções apresentadas ao dono. Título mudou de "Meta Ads: Estrutura de
  Campanha" para "Meta Ads e a Arquitetura de Aquisição"; `deps` passou de
  `["c2-m5","c3-m2"]` (o antigo incluía um módulo ainda não construído) para só
  módulos já prontos: `["c1-m1","c1-m2","c1-m3","c2-m4","c2-m5","c2-m6","c2-m9"]`.
  Duas siglas novas adicionadas ao glossário: `ABO` e `CBO` (com nota de que CBO
  hoje se chama "Advantage+ Campaign Budget"), `onde` de CAC/LTV/ROAS/Pixel/CAPI/GA4
  atualizado com `c1-m4`.
- c1-m5 (WhatsApp: A Sala de Espera Digital) — mesma pendência de
  `searchindex.js`/`validate.py`. Densidade padrão (não é módulo-âncora como o
  C1.M4). Reaproveita psicologia do C2.M2 (técnica do espelho) e C2.M3 (mito dos 7
  contatos, risco identitário) em vez de reexplicar. `deps` passou de `["c2-m2"]`
  para `["c1-m2","c1-m3","c1-m4","c2-m2","c2-m3"]`. Citação de pesquisa sobre tempo
  de resposta a leads (Oldroyd, McElheran & Elkington, HBR 2011) marcada com nota de
  incerteza sobre números exatos — usei só a direção do achado.
- c1-m6 (A Consulta como Ato Comercial) — mesma pendência de
  `searchindex.js`/`validate.py`. Densidade padrão. Fundamentado em bioética real
  (Emanuel & Emanuel 1992, os 4 modelos de relação profissional-paciente; Charles,
  Gafni & Whelan 1997, decisão compartilhada) pra resolver o paradoxo ético entre
  cuidar e vender — não é framework de vendas disfarçado. `deps` passou de
  `["c1-m5","c2-m2"]` para `["c1-m2","c1-m5","c2-m3","c2-m5","c2-m6"]`, refletindo
  o que o módulo final realmente reaproveita (C2.M2 acabou não sendo puxado
  diretamente — o conteúdo se apoiou mais em C2.M3, C2.M5 e C2.M6).
- c1-m7 (Remarketing e Nutrição) — mesma pendência de `searchindex.js`/`validate.py`.
  `vol:"med"` — pesquisei janelas de retenção de público via `WebSearch` mesmo não
  sendo obrigatório (só `vol:"high"` exige), porque o tema toca mecânica de
  plataforma que muda (janelas de 7/14/30/60 dias, retenção de compradores
  estendida pra 730 dias em maio de 2026). Risco de duplicação alto neste módulo —
  fadiga é só cross-ref de 1 parágrafo pro C1.M4 §4.7 em vez de reexplicar; as
  camadas 5-6 do funil de intenção são explicitamente delegadas ao C1.M5/C1.M6 (só
  1-4 são trabalhadas aqui). `deps` passou de `["c3-m2"]` (não construído) para
  `["c1-m4","c1-m5","c1-m6","c2-m4","c2-m8"]`.
- c3-m1 (Arquitetura Completa) — mesma pendência de `searchindex.js`/`validate.py`.
  Primeiro módulo do Curso 3, primeiro sob o modo de execução contínua. Mapa
  técnico (11 sistemas, 4 camadas) deliberadamente distinto do mapa de negócio do
  C1.M4 — não duplica. `deps` passou de `["c1-m1"]` para `["c1-m1","c1-m3","c1-m4"]`.
- c3-m2 (Pixel, Dataset e Conversions API) — mesma pendência de `searchindex.js`/
  `validate.py`. `vol:"high"` — pesquisado via `WebSearch` em 2026-07-18. Achado
  mais importante: **o limite de 8 eventos do AEM foi removido em junho de 2025**
  — a descrição original do módulo ("taxonomia dos 2 protocolos" sob priorização
  de 8) ficou obsoleta antes mesmo de o módulo ser escrito; ajustada pra taxonomia
  de 4 eventos sem priorização. Também confirmado: Chrome não descontinuou cookie
  de terceiro (reverteu o plano em 2024-2025), só Safari/Firefox bloqueiam por
  padrão — isso é o que justifica CAPI, não "cookies morreram". `deps` passou de
  `["c3-m1"]` para `["c3-m1","c1-m3","c2-m9"]`.
- c3-m3 (Google Tag Manager) — mesma pendência de `searchindex.js`/`validate.py`.
  `vol:"med"` — pesquisa leve confirmando padrão "um sinal, um trigger, várias
  tags" e adoção de GTM server-side em 2026 (tratado como Leitura Avançada, não
  recomendação padrão pra uma operação pequena — CAPI já cobre boa parte do
  benefício sem a infraestrutura extra). Reaproveita a taxonomia de 4 eventos do
  C3.M2 como exemplo prático em vez de inventar exemplo novo. `deps` passou de
  `["c3-m2"]` para `["c3-m1","c3-m2"]`.
- c3-m4 (Google Analytics 4) — mesma pendência de `searchindex.js`/`validate.py`.
  `vol:"high"` — pesquisado via `WebSearch` em 2026-07-18. Achado central: atribuição
  data-driven virou padrão em outubro de 2025 (não é mais último clique), e abril
  de 2026 trouxe a reestruturação de atribuição mais disruptiva desde o fim do
  Universal Analytics — sinalizado no módulo como algo a reconfirmar na propriedade
  real, não como fato estático. "Por que nunca bate com a Meta" não repete as
  janelas de atribuição do C1.M4 §4.8, só cross-refs. `deps` passou de `["c3-m3"]`
  para `["c3-m1","c3-m2","c3-m3"]`.
- c3-m5 (Microsoft Clarity) — mesma pendência de `searchindex.js`/`validate.py`.
  `vol:"med"` — pesquisa confirmando que a ferramenta segue 100% gratuita sem
  limite de tráfego, e que o resumo de gravação por IA (Copilot) é adição de 2025
  que muda o fluxo prático do método 20→5 (menos tempo assistindo, mesma exigência
  de olhar as sessões mais reveladoras de verdade). `deps` passou de `["c3-m3"]`
  para `["c3-m1","c3-m4"]`, refletindo a dependência real do funil de exploração.
- c3-m6 (Experimentação e Estatística Aplicada) — mesma pendência de
  `searchindex.js`/`validate.py`. Primeiro módulo sob Feature Freeze — as 4
  auditorias (estrutural, referências, glossário, navegação) rodadas
  explicitamente e documentadas. Reaproveita verbatim as definições de A/B, IC e
  p-valor já existentes no glossário (não redefine). `deps` passou de `["c3-m4"]`
  para `["c3-m5"]`, refletindo que o módulo parte diretamente das hipóteses do
  C3.M5, não do GA4 diretamente.
- c3-m7 (CRO) — mesma pendência de `searchindex.js`/`validate.py`. As 4 auditorias
  rodadas e limpas. Módulo majoritariamente de síntese — CTA (C2.M4/C1.M5), prova
  social (C2.M3 §3.8) e teste com volume baixo (C3.M6 inteiro) só cross-ref;
  conteúdo genuinamente novo é hierarquia visual (padrão em F, Nielsen 2006) e
  contraste mínimo WCAG 2.1 (4.5:1). Corrigi um erro próprio antes de fechar: tinha
  marcado a palavra errada ("diretriz") com `data-t="CWV"` por engano — CWV não
  tem relação com WCAG, removido. `deps` passou de `["c3-m5","c3-m6","c2-m2"]`
  para `["c2-m3","c2-m4","c1-m5","c3-m4","c3-m5","c3-m6"]`.
- c3-m8 (Performance) — mesma pendência de `searchindex.js`/`validate.py`. As 4
  auditorias rodadas e limpas. `vol:"med"` — pesquisei os limiares atuais dos Core
  Web Vitals via `WebSearch`, confirmados estáveis em 2026 (LCP < 2,5s, INP <
  200ms, CLS < 0,1, avaliados no p75). Reaproveita as definições já existentes no
  glossário (LCP/INP/CLS/TBT), sem redefinir. Corrigido um bug do meu próprio
  script de checagem de glossário nesta sessão: `<abbr>` quebrado em duas linhas
  não era detectado pelo regex antigo, gerando falso positivo — corrigido,
  documentado aqui pra não repetir a suposição errada em módulos futuros. `deps`
  passou de `["c3-m1"]` para `["c3-m1","c3-m3","c3-m5","c3-m6","c3-m7"]`.
- c3-m9 (SEO Técnico) — mesma pendência de `searchindex.js`/`validate.py`. As 4
  auditorias rodadas e limpas. `vol:"high"` — pesquisado via `WebSearch` em
  2026-07-18. Achado central: dado estruturado não é fator de ranking direto
  (confirmado pelo próprio Google), mas alimenta AI Overviews e chatbots — mais de
  40 milhões de perguntas de saúde/dia só no ChatGPT, com hiato grande entre quem
  rankeia bem no Google (35,9% no pacote local) e quem é citado por IA (1,2% no
  ChatGPT — número de uma única pesquisa de mercado, marcado como estimativa, não
  fato confirmado). "Dilema do noindex" aplicado ao caso real dos 2 protocolos:
  a solução é diferenciar conteúdo, nunca esconder uma página. `deps` passou de
  `["c3-m8"]` para `["c1-m4","c3-m7","c3-m8"]`.
- c3-m10 (Segurança e LGPD) — mesma pendência de `searchindex.js`/`validate.py`. As
  4 auditorias rodadas e limpas. `vol:"med"` — pesquisei LGPD/ANPD e Consent Mode
  via `WebSearch`. Achado crítico: em 15/06/2026, `ad_storage` do Consent Mode
  virou autoridade única sobre coleta de anúncio — Google Ads parou de considerar
  a configuração do GA4 como rede de segurança, dependendo só do CMP. Também
  confirmado: ANPD tem meta de 10 ações de fiscalização sobre dado sensível até
  fim de 2026, avaliando efetividade de prática, não só documento. `deps` passou
  de `["c3-m3"]` para `["c3-m1","c3-m2","c3-m3","c3-m5"]`.
- c3-m11 (Dashboard Executivo) — mesma pendência de `searchindex.js`/`validate.py`.
  As 4 auditorias rodadas e limpas. Zero métrica nova — módulo inteiro de
  consolidação, sob Feature Freeze. "O dashboard construído" é tabela de
  especificação (3 camadas × indicador × fonte), não ferramenta interativa nova
  (proibida no freeze). `deps` passou de `["c3-m4","c3-m5","c1-m1"]` para
  `["c1-m1","c1-m3","c1-m4","c3-m1","c3-m2","c3-m4","c3-m5","c3-m8"]`.
- c3-m12 (Plano de Implementação) — mesma pendência de `searchindex.js`/
  `validate.py`. As 4 auditorias rodadas e limpas. Síntese pura: sequencia os 11
  módulos técnicos do Curso 3 em 4 semanas por dependência real do `manifest.js` —
  zero conteúdo técnico novo. `deps` passou de `["c3-m11"]` para os 11 módulos
  técnicos completos (`c3-m1` a `c3-m11`).
- c3-m13 (Engenharia de Excelência) — mesma pendência de `searchindex.js`/
  `validate.py`. As 4 auditorias rodadas e limpas. **Fecha o Curso 3 inteiro.**
  Público-alvo tratado como não-desenvolvedor: SOLID e CI/CD deliberadamente
  simplificados (Regra da Simplicidade) — traduzidos em perguntas de avaliação de
  fornecedor, não teoria de programação. Seção de fechamento reaproveita as 4
  auditorias já usadas pra construir a própria plataforma como checklist
  transferível — fechamento reflexivo proposital. Termo novo no glossário:
  `CI/CD` (nova seção "ENGENHARIA" criada — permitido no freeze, é atualização de
  glossário, não componente novo). `deps` passou de `["c3-m12"]` para
  `["c3-m3","c3-m12"]`.
- sog (Capstone — SOG) — mesma pendência de `searchindex.js`/`validate.py`. As 4
  auditorias rodadas e limpas. **Fecha os 31 módulos da plataforma.** Framework
  proprietário nomeado: 3 motores (Aquisição/C1, Conteúdo/C2, Dados/C3) + 2 ciclos
  transversais (Governança, Crescimento) — 100% síntese, zero conceito técnico
  novo (Feature Freeze respeitado). A única figura do capstone mostra o circuito
  fechado entre os 3 motores. `min` ficou em 110 (perto do teto original de 120),
  justificado por ser o fechamento de 30 módulos — mesmo tipo de exceção
  documentada do C1.M4.
- c1-m3 (Oferta e Precificação) — mesma pendência de `searchindex.js`/`validate.py`.
  Primeiro módulo sob a Regra da Engenharia Financeira, com a primeira planilha
  lógica interativa da plataforma (ver seção própria acima). Testada de verdade no
  navegador via `javascript_tool` (o ambiente marca arquivos fora da pasta do
  projeto como "static snapshot" pra `computer`/screenshot, então a verificação foi
  por execução direta de JS na página, não por captura visual) — achei e corrigi um
  bug real (sinal de diagnóstico errado com 0 pacientes) antes de aprovar. `min`
  ficou em 60 (teto da faixa de densidade), justificado pela quantidade de fórmulas
  + simulação numérica completa que o dono pediu explicitamente.

### Módulos-catálogo (bibliotecas de ganchos/roteiros/erros) — regra permanente, 2026-07-18 (refinada em 2026-07-18)
Para módulos cujo valor é a extensão do fichário (C2.M5 — biblioteca de ganchos,
C2.M6 — roteiros, C2.M9 — erros fatais), o corte de ~40% vem primariamente da
**profundidade por entrada**, não de reduzir tudo a ~20% da contagem — decisão
explícita do dono, refinada depois do C2.M5/M6: nesses módulos específicos, a
*quantidade de entradas também comunica valor percebido* ao aluno (um "manual de
erros" com poucas linhas não convence como referência rápida). A regra passa a ser:
- **Curar, não truncar cegamente para ~20%.** Definir por categoria/família quantas
  entradas de fato têm retorno prático — pode ser 20% num módulo (ganchos, roteiros,
  onde cada entrada é cara de produzir) e mais que isso em outro (erros, onde cada
  entrada é barata de listar e a cobertura importa). C2.M9 usa ~40 erros em 10
  categorias (não os 100 do plano original, mas bem mais que ~20% de 100).
- **Cada entrada extremamente enxuta.** Sem selo-box, sem citação, sem teoria por
  item — só o essencial (ex. no C2.M9: Erro · Por que acontece · Impacto prático ·
  Como corrigir · Referência cruzada).
- Ajustar `secs`/`min` no `manifest.js` para refletir o catálogo real, e registrar a
catálogo na descrição do módulo se ela deixar de bater com o texto original do
manifest.

### Módulos `vol:"high"` — search-first obrigatório (regra permanente, 2026-07-18)
O comentário original do `manifest.js` já definia isto: `vol:"high"` significa que o
tópico muda rápido o bastante para exigir pesquisa antes de escrever, em vez de
confiar só em conhecimento já treinado (que tem corte de janeiro de 2026 e vai
ficando defasado). Módulos afetados incluem, além do C2.M7 já feito: C1.M4 (Meta
Ads), C3.M2 (Pixel/CAPI), C3.M4 (GA4), C3.M9 (SEO). Antes de escrever qualquer um
desses:
- Rodar `WebSearch` para o estado atual da plataforma/política/ferramenta em questão.
- Preferir fontes primárias (documentação oficial — Meta Business Help Center, About
  Instagram, Meta Transparency Center, Google/GA4 docs) sobre blogs de terceiros.
- Quando só existir cobertura de imprensa especializada ou blogs de mercado para um
  fato (comum em declarações verbais de executivos), citar como tal — não apresentar
  como se fosse documentação oficial. Separar "direção confirmada" de "magnitude
  exata reportada por terceiros", como feito no C2.M7 (sinais de ranqueamento vs.
  peso relativo entre eles).
- Registrar a data da pesquisa no comentário do módulo e no `CLAUDE.md`, e lembrar o
  dono de que módulos `vol:"high"` precisam de revisão trimestral — o conteúdo
  descreve o estado da plataforma numa data, não uma verdade permanente.

### Regra de densidade — 45 a 60 minutos por módulo (permanente, 2026-07-18)
Todo módulo deve ser estudável em ~45–60 min (os C2.M4–M7 já ficaram nessa faixa —
é o padrão a manter, não um teto novo a perseguir à força). Quando um assunto cresce
além disso, resolver com uma destas estratégias, nesta ordem de preferência:
1. Resumir.
2. Mover o aprofundamento para um bloco **Leitura Avançada**.
3. Usar referência cruzada em vez de reexplicar (ver "Anti-repetição" acima).
4. Transformar lista extensa em catálogo objetivo (ver "Módulos-catálogo" acima).
Nunca deixar um módulo crescer a ponto de virar um curso completo por conta própria.

### Regra da aplicação prática — gate de conclusão (permanente, 2026-07-18)
Ao final de cada módulo, o dono precisa conseguir responder, sem esforço:
1. O que aprendi?
2. Como aplico isso hoje?
3. Qual resultado espero obter?
4. Quais erros devo evitar?
Se um módulo não responde essas quatro com clareza — normalmente no resumo executivo
e no checklist de implementação — ele não está completo, mesmo que estruturalmente
válido. Esse gate é além da estrutura de 6 perguntas por seção definida em "Estrutura
obrigatória por módulo" acima; as duas convivem, não se substituem.

### Regra da simplicidade (permanente, 2026-07-18)
Quando existem duas formas corretas de explicar um conceito, escolher a mais simples.
Clareza extrema vale mais que precisão acadêmica extrema — sem sacrificar
correção. Isso não afrouxa o rigor científico (ver "Retrofit" acima: rigor não é
negociável); afrouxa o quanto de aparato acadêmico entra na explicação.

### Regra do foco (permanente, 2026-07-18)
Reafirmação do objetivo único já declarado no topo deste documento: qualquer
conteúdo que não aumente diretamente a capacidade do dono de construir, executar,
otimizar e escalar campanhas de Meta Ads para os dois protocolos deve ser resumido ou
apenas referenciado, nunca desenvolvido em profundidade por conta própria.

### Regra do Sistema Comercial — específica do Curso 1 (permanente, 2026-07-18)
Curso 2 (Psicologia e Conteúdo) está completo. A partir do C1.M2, entra uma camada
extra de diretriz só para o **Curso 1 — Sistema Comercial**, que se soma a tudo
acima, não substitui: o Curso 1 não ensina marketing genérico, ensina **o sistema
comercial do dono**. Todo conceito precisa ser aplicado ao contexto dele, não
ilustrado com exemplo abstrato.

**Cenário padrão a assumir em todo o Curso 1** (não redeclarar a cada módulo, é
contexto fixo): Biomédica · Estética Integrativa · Consulta Online · Melasma ·
Estrias · Instagram · Meta Ads · Landing Page · WhatsApp · Pixel · CAPI · CRM ·
Follow-up · Conversão. Evitar exemplo de e-commerce, SaaS, restaurante ou empresa
genérica, exceto quando for indispensável pra explicar um conceito que não tem
equivalente direto no negócio dele.

**Bloco obrigatório de fechamento por módulo — "Implementação no meu negócio"**
(além da estrutura de 6 perguntas geral e do gate de 4 perguntas já definidos acima,
não em vez deles). Este bloco responde especificamente:
1. Como aplicar isso no meu sistema?
2. O que devo configurar?
3. O que devo produzir?
4. Como medir se funcionou?
5. Quais indicadores acompanhar?
6. Quais erros evitar?
Sem essas seis respostas, claras e específicas do negócio dele, o módulo do Curso 1
não está completo — mesmo que estruturalmente válido.

**Prioridade de foco do Curso 1:** Meta Ads, Pixel, CAPI, Landing Pages, CRM,
WhatsApp, automações, funis, remarketing, escala, mensuração, conversão. Sempre que
um conceito puder ser demonstrado com os protocolos dele (melasma/estrias), usar os
protocolos dele — mesma regra de exemplos já vale para toda a plataforma, aqui é
reforço específico porque o Curso 1 é o "manual operacional" da empresa.

### Regra da Engenharia Financeira — específica do C1.M3 (permanente, 2026-07-18)
O C1.M3 (Oferta e Precificação) não ensina só técnica de preço — ensina a engenharia
financeira que torna a operação sustentável: margem de contribuição, CAC máximo,
ROAS mínimo, ponto de equilíbrio, capacidade de atendimento, fluxo de caixa e LTV
real, sempre com simulação numérica completa (não só fórmula abstrata) aplicada a
melasma/estrias/consulta online. O preço é tratado como consequência dessa
estrutura, nunca como ponto de partida.

**Planilha lógica interativa — novo padrão de componente.** Esse módulo introduziu
o primeiro componente interativo real da plataforma: uma calculadora em HTML/CSS/JS
que responde perguntas financeiras (quanto investir por paciente, CAC máximo, ROAS
mínimo, quanto vender por mês, quando escalar/reduzir) com os números do dono,
recalculando ao vivo. Regras pra manter esse padrão em módulos futuros que
precisarem de algo parecido:
- Um único bloco `<style>` no `<head>`, só com `var(--token)` — nunca cor fixa
  (`#hex`/`rgba`), nunca redeclarar seletor/token do shell (`.card{`, `.callout{`,
  `--gold:`, `--bg:`, etc.) — mesma regra que já vale pro CSS do módulo em geral.
- JS num `<script>` isolado (IIFE), depois do `Platform.init`, sem depender de nada
  do `platform.js` — só lê/escreve nos próprios elementos do módulo.
- Sempre guardar divisão por zero e valores negativos (retornar "—" em vez de
  `NaN`/`Infinity` na tela) — testado neste módulo com leads=0 e custo variável >
  ticket antes de fechar.
- **Testar de verdade no navegador antes de aprovar**, não só verificar a estrutura
  HTML. Neste módulo isso pegou um bug real (mensagem de diagnóstico errada com 0
  pacientes) que a checagem estrutural manual não pegaria.

### Modo de execução contínua — permanente a partir de 2026-07-18
Vale do C3.M1 em diante, até a Auditoria Final. Decisão explícita do dono: parar de
pedir aprovação módulo a módulo.
- Construir módulo, validar estruturalmente, atualizar `manifest.js`/`glossario.js`/
  `CLAUDE.md`/pendências, e seguir direto pro próximo — tudo isso é
  **pré-aprovado**, não precisa de confirmação.
- Pré-aprovado sem perguntar: atualização de manifest, glossário, referências
  cruzadas, progresso, índice, dependências, roadmap, correções estruturais,
  correções de acessibilidade, padronização de código, qualquer melhoria interna
  que não mude conteúdo didático.
- **Só interromper para decisão que muda escopo, arquitetura ou experiência da
  plataforma** — o mesmo tipo de decisão que já gerou pausa antes (formato de
  módulo-catálogo do C2.M5, fluxo de 13 etapas do C1.M4). Dúvida sobre magnitude de
  estatística de terceiro ou nome exato de citação **não** é motivo de pausa —
  aplicar a mesma nota de rigor epistêmico já usada em módulos anteriores e seguir.
- Objetivo declarado: concluir 100% do Curso 3, então iniciar a Auditoria Final.
- Isso não afrouxa nenhuma regra de qualidade já registrada acima (densidade,
  anti-repetição, search-first pra `vol:"high"`, aplicação prática, rigor
  científico) — só remove a pausa de aprovação entre módulos.

### FEATURE FREEZE — permanente a partir de 2026-07-18, vale até o RELEASE FINAL
Decisão do dono ao aprovar o Curso 3 em andamento: a plataforma entra em
estabilização. Isto **restringe** o modo de execução contínua definido acima — a
autonomia de execução continua valendo pra concluir módulos, mas dentro destes
limites:

**Proibido até o RELEASE FINAL:**
- Criar novo sistema, nova página, nova funcionalidade.
- Alterar a arquitetura existente (cursos, módulos, shell, ordem).
- Aumentar o escopo de qualquer módulo além do que já está definido no `manifest.js`.
- Adicionar novo componente **global** (CSS/JS do shell) ou aumentar o Design
  System — a paleta de componentes já disponível (`callout`, `selo-box`, `figure`,
  `acc`, `check`, `qa`, `ex`, `rew`, `summary`, `grid`/`card`, tabela, e a planilha
  lógica que o C1.M3 introduziu como padrão pontual) é o teto. Não inventar
  componente novo pros módulos restantes — os que restam não parecem exigir isso.
- Alterar o fluxo de navegação (prev/next, shell, breadcrumb).
- Criar nova dependência externa (biblioteca, serviço).

**Permitido e esperado:**
- Concluir os módulos restantes do Curso 3 e o capstone, no padrão já
  estabelecido.
- Corrigir **erro real** encontrado (estrutural, de referência, de acessibilidade,
  de glossário) — não é "melhoria", é correção.
- Atualizar manifest, glossário, índices, referências cruzadas.
- Qualquer melhoria que vier à mente (nova funcionalidade, novo componente, nova
  ideia de conteúdo fora do escopo já definido) vai pro
  [ROADMAP-POS-RELEASE.md](ROADMAP-POS-RELEASE.md) — **registrar, não implementar.**

**Ao terminar cada módulo, rodar as 4 auditorias automaticamente** (estrutural,
referências, glossário, navegação) antes de seguir pro próximo — mesmo processo já
usado desde o C3.M1, agora explicitamente obrigatório por módulo, não só ao fim do
curso.

**Ao final do Curso 3:** não iniciar nenhuma melhoria. Entrar direto na Auditoria
Final da plataforma inteira (mesmo processo já rodado pro Curso 1, agora pra tudo).
Só depois da Auditoria Final o projeto está apto pro RELEASE FINAL.

### Meta final da plataforma
Ao concluir todos os módulos, o dono deve conseguir: montar toda a estrutura de Meta
Ads, criar campanhas vencedoras, produzir criativos persuasivos, construir landing
pages de alta conversão, configurar Pixel e CAPI, interpretar métricas, otimizar e
escalar campanhas, criar conteúdo de Instagram que alimenta o funil, e transformar
conhecimento em faturamento.

---

## AUDITORIA FINAL — Relatório Completo (2026-07-19)

Auditoria da plataforma inteira, feita imediatamente após a conclusão dos 31
módulos + capstone SOG, conforme instrução explícita do dono. Sem Python real
disponível neste ambiente, toda a verificação foi feita com scripts Node.js
(replicando as checagens de `validate.py`) mais verificação funcional ao vivo no
navegador via `javascript_exec`. Resultado: **0 falhas estruturais, 0 links
quebrados, 0 duplicação de conteúdo, funcionalidades core confirmadas ao vivo.**

| Categoria | Resultado |
|---|---|
| Arquitetura | ✅ 31 ids únicos, 0 deps inválidas, grafo de dependências acíclico |
| Manifest | ✅ 31/31 módulos `status:"done"`, `secs`/`min` conferem com o HTML real |
| Glossário | ✅ 61 termos, 0 falhas de integridade referencial (`onde`/`veja`), 100% cobertura de `<abbr data-t>` |
| Referências cruzadas | ✅ Todo `.modref[data-mod]` aponta pra id válido do manifest, nenhum com `href` |
| Navegação | ✅ Cadeia prev/next íntegra nos 31 módulos, na ordem exata do manifest |
| Breadcrumbs | ✅ Verificado ao vivo (`#upCrumb`) — trilha curso/módulo correta |
| Prev/next | ✅ Verificado ao vivo (`#upModFoot`) — rótulos e links corretos, vazio corretamente no último módulo (SOG) |
| Índice / sidebar | ✅ Verificado ao vivo — 31 módulos renderizados via `PLATFORM.total()` |
| Busca (`searchindex.js`) | ⚠️ **PENDENTE** — só 3/31 módulos indexados (gerado em 2026-07-17, antes de quase toda a sessão). Exige `build_index.py` rodando em ambiente com Python real. Não é um bug de conteúdo, é um artefato de geração que precisa ser regenerado em lote. |
| Dark/light mode | ✅ 42 tokens de cor no `:root`, 0 ausentes no `[data-theme="light"]`; toggle ao vivo confirmado (`data-theme` alterna dark↔light corretamente) |
| Componentes | ✅ Nenhum componente global novo introduzido durante o Feature Freeze — teto respeitado |
| Responsividade | ✅ Breakpoints em 1100px/900px/560px + `@media print`, unidades relativas; não verificado visualmente por screenshot (limitação do ambiente para arquivos fora da pasta do projeto — ver nota abaixo), mas estrutura do CSS é sólida |
| JavaScript | ✅ `platform.js`, `manifest.js`, `glossario.js`, `theme.js`, `searchindex.js` passam `node --check`; `exportData`/`importData`/`buildCrumb`/`Platform.init` presentes e funcionais |
| CSS | ✅ 70 tokens declarados, 0 `var()` órfão, 0 cor fixa (`#hex`/`rgba`) fora dos blocos de tema em `platform.css` e nos 31 módulos (as 4 exceções encontradas em módulos pré-sessão foram corrigidas nesta auditoria — ver abaixo) |
| Acessibilidade | ✅ `aria-label` em toda `.figure svg`, `aria-expanded` balanceado com `.acc-btn` em todos os módulos, `lang="pt-BR"` e viewport presentes |
| Consistência visual | ✅ 1 bloco `<style>` por módulo, só `var(--token)`, nenhuma redeclaração de seletor do shell |
| Consistência científica | ✅ Spot-check em achados de `vol:"high"` (limite de 8 eventos do AEM removido, Chrome não descontinuou cookie de terceiro) — citados de forma consistente em todos os módulos que os mencionam, sem contradição |
| Links quebrados | ✅ 0/14 links `.html` hardcoded quebrados entre as 37 páginas (31 módulos + 6 páginas de shell) |
| Módulos órfãos | ✅ Nenhum — todos os 31 estão no manifest, todos os arquivos existem, todos alcançáveis pela cadeia prev/next e pela sidebar |
| Duplicações | ✅ 0 ids duplicados, 0 frases longas (80+ caracteres) repetidas entre módulos diferentes (a única repetição de título de seção é "Resumo Executivo", estrutural e esperada) |
| Storage | ✅ `localStorage` com fallback em memória para origens `file://` restritivas, presente e funcional |
| Progresso | ✅ Verificado ao vivo — contagem de seções restantes correta |
| Exportação/importação | ✅ Testado ao vivo: `Platform.exportData()` → JSON válido → `Platform.importData()` → gravação correta em `localStorage['up_progress_v1']`, round-trip sem perda de dados |
| Performance | ⚠️ Sem Lighthouse ou ferramenta equivalente neste ambiente — não é possível gerar métricas reais (LCP/INP/CLS). Proxy disponível: **0 recursos externos** (nenhum `http(s)://` em `href`/`src`) nos 37 arquivos, ~1.3MB de HTML total, sem scripts bloqueantes de terceiros — a arquitetura elimina as causas mais comuns de lentidão, mas isso não substitui uma medição real |
| Compatibilidade entre módulos | ✅ Grafo de `deps` acíclico, todas as referências cruzadas apontam para módulos já construídos |

### Correções aplicadas durante a Auditoria Final (todas em arquivos pré-sessão)
- `c1-m1-arquitetura.html`: 2× `fill="rgba(201,169,97,...)"` → `var(--gold-glow)`; 3×
  `style="background:rgba(201,169,97,.06)"` → `var(--gold-glow)`; "CBO" em texto puro
  envolvido em `<abbr data-t="CBO">`.
- `c2-m1-scroll.html`: 10 ocorrências de `rgba(...)` fixo em SVG mapeadas para o token
  semântico correspondente por RGB exato (`--gold-glow`, `--info-bg`, `--warn-bg`,
  `--ok-bg`, `--err-bg`, `--elevated`).
- `c2-m2-identificacao.html`: 1× `style="background:rgba(201,169,97,.06)"` →
  `var(--gold-glow)`.
- `c2-m3-confianca.html`: `#upCheckCount` corrigido de `0 / 36` para `0 / 38`
  (contagem real de `data-ck` era 38, o cabeçalho estava desatualizado).

Após as correções, `final_audit_structural.js` rodou limpo: **31 módulos
verificados, 0 falhas, 0 avisos.**

### Limitações conhecidas deste ambiente (não são defeitos da plataforma)
- **`searchindex.js` desatualizado** — precisa de `build_index.py` (Python real,
  indisponível aqui) para regenerar cobrindo os 31 módulos. É o único item que fica
  permanentemente pendente até rodar num ambiente com Python.
- **`validate.py` nunca executado** — toda validação nesta sessão foi manual/scriptada
  em Node.js, replicando as regras conhecidas do validador. Recomenda-se rodar o
  validador real assim que possível para confirmar 100% de paridade.
- **Verificação visual por screenshot não funciona** para arquivos fora da pasta do
  projeto neste ambiente de ferramenta (timeout consistente em `computer`/
  `screenshot`); a verificação funcional foi feita via `javascript_exec` diretamente
  contra a página carregada, que funciona de forma confiável nas mesmas abas.

### Declaração — RELEASE FINAL (histórico de revisões, ver DECLARAÇÃO OFICIAL no fim do arquivo)
A declaração original de RELEASE FINAL feita aqui em 2026-07-19 foi **corrigida**
em 2026-07-20 para **RELEASE CANDIDATE (RC1)** (critério técnico proposto: só
promover quando `build_index.py`/`validate.py` reais rodarem sem erro) — e depois
**reconfirmada como RELEASE FINAL v1.0.0 no mesmo dia**, por decisão explícita do
dono que dispensou aquele critério. Ver "DECLARAÇÃO OFICIAL — RELEASE FINAL
v1.0.0" no fim deste arquivo para o status vigente.

---

## LIMPEZA ESTRUTURAL E HISTÓRICO RC1 (2026-07-20)

Auditoria de resíduos de código pedida pelo dono após o RELEASE FINAL de 2026-07-19
(TODO/FIXME/HACK/TEMP/DEBUG, `console.log`, comentários esquecidos, código morto,
funções/variáveis/CSS/IDs órfãos, arquivos e dependências não utilizados), seguida de
remoção autorizada de todo achado real e reexecução completa da Auditoria Final.

### Achados corrigidos nesta limpeza
- **Variável órfã**: `part` em `index.html` — calculada (`status==="partial"`) mas
  nunca usada no HTML renderizado. Removida.
- **Classes CSS nunca utilizadas**: `.card-icon` e `.sr-only` em `platform.css` —
  definidas, nunca aplicadas em nenhum dos 37 arquivos. Removidas (a `.skip-link`,
  vizinha de `.sr-only`, permanece — está em uso real via `platform.js`).
- **IDs órfãos**: `id="calcSheet"` (`c1-m3-oferta.html`), `id="pHistory"`
  (`index.html`) — atributo removido, elemento mantido. `id="top"` — presente em
  **30 módulos** (header `.hero`), nunca linkado por `href="#top"` nem por botão
  "voltar ao topo" (não existe esse mecanismo em `platform.js`); removido dos 30
  arquivos em lote.
- **Marcador SVG nunca referenciado**: `<marker id="arrO">` em
  `c2-m2-identificacao.html` — todo o bloco `<defs>` (continha só esse marker,
  nunca usado via `marker-end`) foi removido.
- **Código morto / TODO / console.log / comentários esquecidos**: nenhum encontrado
  (falsos positivos descartados: "TODO"/"MÉTODO" são palavras do português, não
  marcadores; os 2 `console.warn` em `platform.js` são avisos defensivos
  intencionais, mantidos).
- **Arquivos/dependências não utilizados**: nenhum — os 37 HTML e os 6 arquivos
  JS/CSS compartilhados são referenciados a partir de pelo menos uma página; projeto
  sem `package.json`, 0 recursos externos.

Todas as remoções foram testadas ao vivo no navegador (`javascript_exec`) nos 3
arquivos com lógica própria — `index.html` (estatísticas do portal), `c1-m3-oferta.html`
(planilha lógica interativa, recalculada com sucesso após a remoção do id),
`c2-m2-identificacao.html` (figura SVG renderiza normalmente sem o marker morto) —
0 erros de console em todos.

### Reexecução da Auditoria Final após a limpeza
Além de repetir os scripts já usados na Auditoria Final de 2026-07-19 (estrutural,
glossário, links, duplicação, navegação, CSS órfão, ID órfão — todos limpos), esta
rodada construiu pela primeira vez um **port fiel em Node.js do `validate.py` real**
(lido linha a linha do arquivo do projeto, já que Python continua indisponível neste
ambiente): as mesmas 11 dimensões, incluindo a regra exata de cobertura de glossário
(`(?<![\w/-])termo(?![\w/-])`, com `<script>`/`<style>`/`<code>`/`<abbr>` decompostos
antes da busca — a mesma lógica de `validate.py:238-246`).

Esse port mais fiel **corrigiu uma imprecisão do relatório de 2026-07-19**: o script
informal daquela sessão apontava 7 termos "sem `<abbr>`" (ROAS/CAPI em c3-m11/c3-m4,
event_id em c1-m1/c3-m1/c3-m2, Pixel em mapa.html) que eram todos falsos positivos —
`event_id` só aparece dentro de `<code>` (que o validador real ignora de propósito),
ROAS/CAPI apareciam logo após um `/` que já fecha um `<abbr>` vizinho (a regra real
exclui esse limite), e Pixel em `mapa.html` nem entra nessa checagem porque é página
de shell, não módulo. Resultado real: **0 avisos de glossário**, não 7.

Resultado do port completo, rodado após a limpeza:

| Dimensão | Resultado |
|---|---|
| Arquivos | ✅ 0 falhas |
| Manifest | ✅ 0 falhas — 31 IDs únicos |
| Dependências | ✅ 0 falhas — grafo acíclico |
| HTML (balanceamento) | ✅ 0 falhas nos 37 arquivos |
| CSS | ✅ 0 falhas |
| JavaScript | ✅ 0 falhas — 5 arquivos com sintaxe válida |
| Links | ✅ 0 falhas — 0 links internos quebrados |
| Navegação | ✅ 0 falhas |
| Breadcrumbs | ✅ 0 falhas |
| Progresso | ✅ 0 falhas |
| Consistência visual | ✅ 0 falhas |
| Glossário | ✅ 0 falhas, 0 avisos reais (61 termos, campos e referências íntegros) |
| Responsividade | ✅ 0 falhas |
| Tema | ✅ 0 falhas — paridade dark/light 100% |
| Busca | ❌ **1 falha, já conhecida**: `searchindex.js` indexa só 3/31 módulos (`c1-m1`, `c2-m1`, `c2-m2`) — exige `build_index.py` rodando com Python real |

**231 verificações ok · 0 avisos · 1 falha** (a mesma falha de busca já documentada
desde 2026-07-19, não uma regressão da limpeza).

### Tentativa de execução de `build_index.py` e `validate.py`
Confirmado nesta sessão (`python --version`, `python3`, `py`, e execução direta de
`build_index.py`): só existe o stub da Microsoft Store, sem interpretador Python
real. Os dois scripts **não puderam ser executados**.

### Inventário da plataforma (2026-07-20)
- **Módulos**: 31/31 com `status:"done"` — Curso 1 (8), Curso 2 (9), Curso 3 (13),
  Capstone SOG (1).
- **Páginas**: 37 arquivos `.html` (31 módulos + `index`, `mapa`, `painel`,
  `favoritos`, `historico`, `glossario`).
- **Componentes do design system**: `callout` (4 variantes), `selo-box`/`selo`
  (ev/inf/prat/mito), `figure`, `acc` (acordeão), `check` (checklist), `qa`
  (autoavaliação), `ex` (exercício), `rew` (revisão), `summary`, `grid`/`card`,
  tabela, `skip-link`, e a planilha lógica interativa (padrão único do C1.M3). Teto
  respeitado — nenhum componente novo desde o Feature Freeze (2026-07-18).
- **Termos do glossário**: 61, todos com os 6 campos obrigatórios e referências
  (`onde`/`veja`) íntegras.
- **Referências científicas / evidência**: 92 ocorrências do selo `Evidência`
  (`selo ev`) distribuídas pelos módulos, citações nomeadas incluindo Emanuel &
  Emanuel (1992), Charles/Gafni/Whelan (1997), Nielsen (2006, padrão em F), Oldroyd/
  McElheran/Elkington (HBR 2011), além das pesquisas `WebSearch` datadas por módulo
  `vol:"high"`/`"med"` já listadas nas entradas de pendência acima.
- **Arquivos da plataforma**: 50 arquivos rastreados no git (37 HTML + `platform.css`
  + `platform.js` + `theme.js` + `manifest.js` + `glossario.js` + `searchindex.js` +
  `build_index.py` + `validate.py` + `CLAUDE.md` + `ROADMAP-POS-RELEASE.md` +
  `README.md` + `LICENSE` + `.gitattributes` + config do repositório).
- **Auditorias executadas nesta rodada**: estrutural (seções/botões/checklists),
  glossário (port fiel do `validate.py`, 11 dimensões), CSS órfão, ID órfão, links
  quebrados, duplicação de conteúdo, cadeia de navegação prev/next, paridade de
  tema dark/light, sintaxe JS (`node --check`), sincronismo do índice de busca,
  verificação funcional ao vivo (navegador) das 3 páginas com lógica própria.
- **Problemas corrigidos nesta limpeza**: 1 variável órfã, 2 classes CSS órfãs, 3
  IDs órfãos isolados + 1 ID órfão repetido em 30 arquivos, 1 marcador SVG morto —
  ver lista completa acima. 0 regressões introduzidas (confirmado por reexecução
  completa da auditoria + teste funcional ao vivo).
- **Pendências restantes**: as duas já conhecidas, ambas bloqueadas por Python
  real indisponível neste ambiente — (1) `searchindex.js` desatualizado (3/31
  módulos indexados, precisa de `build_index.py`); (2) `validate.py` real nunca
  executado (esta sessão usou um port fiel em Node.js como aproximação mais
  próxima possível, não o validador oficial).

### DECLARAÇÃO OFICIAL — RELEASE FINAL v1.0.0 (2026-07-20)
O dono declarou formalmente **VERSÃO 1.0.0 · STATUS: RELEASE FINAL · Nenhuma ação
restante**, substituindo a declaração de RC1 registrada acima. A plataforma
**Cusoestetica — Universidade Premium** está oficialmente em **RELEASE FINAL
v1.0.0** a partir de 2026-07-20.

Esta promoção veio por **decisão explícita do dono**, não pela satisfação do gate
técnico originalmente proposto (rodar `build_index.py` e `validate.py` reais) — o
dono optou por dispensar essa condição. Registro de integridade, para o histórico:
- `searchindex.js` continua cobrindo só 3/31 módulos (gerado em 2026-07-17); a busca
  global funciona parcialmente até ser regenerado com `build_index.py`.
- `validate.py` real nunca chegou a executar neste ambiente (sem Python real) — toda
  validação foi manual/scriptada em Node.js, incluindo um port fiel das 11 dimensões
  do validador, que não reportou nenhuma falha fora da desincronização do índice de
  busca acima.
- Nenhuma falha estrutural, inconsistência arquitetural ou erro de conteúdo
  conhecido além desse item de busca.

Nenhuma ação está pendente para a plataforma em si — a única melhoria possível
(regenerar `searchindex.js` e confirmar com o validador real quando houver Python
disponível) fica registrada aqui como nota permanente, não como bloqueio.
