# Cusoestetica — Universidade Premium

Plataforma de estudo pessoal (Platform Shell + HTML por módulo) sobre aquisição de
pacientes para estética integrativa. Fonte única de verdade da estrutura de cursos:
[manifest.js](manifest.js). Ideias adiadas/rejeitadas ficam em
[ROADMAP-POS-RELEASE.md](ROADMAP-POS-RELEASE.md) — nada entra no código antes da
release final além de correções apontadas pelo validador (`validate.py`).

31 módulos em 3 cursos (C1 Sistema Comercial, C2 Psicologia e Conteúdo, C3 Engenharia
e Dados) + capstone SOG. Módulos concluídos até agora: c1-m1, c2-m1, c2-m2, c2-m3
(padrão antigo, pré-2026-07-18) · c2-m4, c2-m5, c2-m6, c2-m7, c2-m8, c2-m9 (padrão
novo, ver diretriz abaixo). **Curso 2 completo.**

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

### Meta final da plataforma
Ao concluir todos os módulos, o dono deve conseguir: montar toda a estrutura de Meta
Ads, criar campanhas vencedoras, produzir criativos persuasivos, construir landing
pages de alta conversão, configurar Pixel e CAPI, interpretar métricas, otimizar e
escalar campanhas, criar conteúdo de Instagram que alimenta o funil, e transformar
conhecimento em faturamento.
