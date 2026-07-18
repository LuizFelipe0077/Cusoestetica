# Cusoestetica — Universidade Premium

Plataforma de estudo pessoal (Platform Shell + HTML por módulo) sobre aquisição de
pacientes para estética integrativa. Fonte única de verdade da estrutura de cursos:
[manifest.js](manifest.js). Ideias adiadas/rejeitadas ficam em
[ROADMAP-POS-RELEASE.md](ROADMAP-POS-RELEASE.md) — nada entra no código antes da
release final além de correções apontadas pelo validador (`validate.py`).

31 módulos em 3 cursos (C1 Sistema Comercial, C2 Psicologia e Conteúdo, C3 Engenharia
e Dados) + capstone SOG. Módulos concluídos até agora: c1-m1, c2-m1, c2-m2, c2-m3
(padrão antigo, pré-2026-07-18) · c2-m4, c2-m5, c2-m6, c2-m7, c2-m8, c2-m9, c1-m2,
c1-m3, c1-m4, c1-m5, c1-m6, c1-m7 (padrão novo, ver diretriz abaixo). **Curso 2
completo.** Curso 1 em andamento a partir do c1-m2 (c1-m1 é padrão antigo). Falta
só c1-m8 pra fechar o Curso 1.

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

### Meta final da plataforma
Ao concluir todos os módulos, o dono deve conseguir: montar toda a estrutura de Meta
Ads, criar campanhas vencedoras, produzir criativos persuasivos, construir landing
pages de alta conversão, configurar Pixel e CAPI, interpretar métricas, otimizar e
escalar campanhas, criar conteúdo de Instagram que alimenta o funil, e transformar
conhecimento em faturamento.
