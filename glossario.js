/* =====================================================================
   GLOSSARIO.JS — Fonte única de todos os termos técnicos da plataforma
   ---------------------------------------------------------------------
   Cada termo tem 6 campos obrigatórios:
     nome     → nome completo por extenso
     simples  → definição em linguagem simples
     tecnica  → definição técnica
     importa  → por que isso importa
     exemplo  → exemplo aplicado ao negócio (Melasma / Desinflamação)
     onde     → em que módulos aparece

   Opcionais: obsoleto (bool), veja (ids relacionados)

   USO NO CONTEÚDO:  <abbr data-t="CTR">CTR</abbr>
   O platform.js injeta tooltip e link para glossario.html#ctr

   REGRA DE VALIDAÇÃO: nenhum módulo passa no validador se usar uma
   sigla registrada aqui sem marcá-la com <abbr> na primeira ocorrência.
   ===================================================================== */

var GLOSSARIO = {

  /* ---------------- MÍDIA E MÉTRICAS ---------------- */
  "CTR": {
    nome:"Click Through Rate — Taxa de Cliques",
    simples:"De cada 100 pessoas que veem seu anúncio, quantas clicam.",
    tecnica:"Cliques ÷ impressões × 100. No Meta existem duas versões: CTR (all), que conta qualquer clique incluindo curtidas e expandir texto, e CTR (link click-through rate), que conta só cliques que levam ao destino. Sempre use a segunda.",
    importa:"É o principal sinal de que o criativo está falando com a pessoa certa. CTR baixo com bom público significa criativo ruim; CTR bom com conversão ruim significa promessa desalinhada com a página.",
    exemplo:"Um Reel sobre melasma com CTR de 0,6% indica que o gancho não passou o filtro pré-atentivo. Faixa saudável no seu nicho: 1,2% a 3,0%.",
    onde:["c1-m1","c1-m4","c3-m11"], veja:["CPM","CPC"]
  },
  "CPM": {
    nome:"Cost Per Mille — Custo por Mil Impressões",
    simples:"Quanto você paga para seu anúncio aparecer mil vezes.",
    tecnica:"Investimento ÷ impressões × 1.000. É o preço de compra de atenção no leilão. Sobe com concorrência, com público estreito e com criativo de baixa qualidade estimada.",
    importa:"CPM alto não é necessariamente ruim — pode significar que você está comprando um público valioso. Mas CPM que sobe sem que a conversão melhore é sinal de segmentação apertada demais ou fadiga criativa.",
    exemplo:"Segmentar 'mulheres 30-45 + interesse em dermatologia + renda alta + Goiânia' pode triplicar seu CPM em relação a um público aberto — sem melhorar o resultado, porque seu filtro real é a landing page.",
    onde:["c1-m1","c1-m4","c2-m4","c2-m9","c3-m11"], veja:["CTR","CPC","CPA"]
  },
  "CPC": {
    nome:"Cost Per Click — Custo por Clique",
    simples:"Quanto você paga cada vez que alguém clica no seu anúncio.",
    tecnica:"Investimento ÷ cliques. Derivado de CPM e CTR: CPC = CPM ÷ (CTR × 10).",
    importa:"É uma métrica de diagnóstico, não de decisão. Otimizar por CPC leva você a comprar cliques baratos — que vêm de pessoas que clicam em tudo e não compram nada.",
    exemplo:"No modelo de seleção, um CPC de R$4,00 que gera conversa qualificada vale infinitamente mais que um CPC de R$0,60 que gera curiosos.",
    onde:["c1-m1","c1-m4","c2-m9"], veja:["CPM","CTR","CPA"]
  },
  "CPV": {
    nome:"Cost Per View — Custo por Visualização",
    simples:"Quanto você paga cada vez que alguém assiste seu vídeo.",
    tecnica:"Investimento ÷ visualizações. A definição de 'visualização' varia por plataforma (3s, 10s, 75% do vídeo), o que torna comparações entre canais enganosas.",
    importa:"Útil apenas como sinal secundário de qualidade de retenção. Como métrica de otimização é perigoso: ensina o algoritmo a buscar quem assiste vídeo, não quem vira paciente.",
    exemplo:"Otimizar por CPV no seu funil traria pessoas que consomem conteúdo de saúde por entretenimento — alto engajamento, zero intenção.",
    onde:["c1-m4","c2-m7"], veja:["CPC","CPA"]
  },
  "CPA": {
    nome:"Cost Per Acquisition — Custo por Aquisição",
    simples:"Quanto custou cada conversão que você definiu como objetivo.",
    tecnica:"Investimento ÷ conversões do evento otimizado. Atenção: o CPA que o Meta reporta é o custo do evento configurado, não da venda — se você otimiza por clique, ele mostra custo por clique com outro nome.",
    importa:"Só significa alguma coisa se o evento otimizado estiver perto do dinheiro. CPA de R$8 por 'Lead' é irrelevante se nenhum Lead vira paciente.",
    exemplo:"CPA de R$120 por conversa qualificada com 40% de fechamento = CAC real de R$300 — excelente para um ticket de R$4.000.",
    onde:["c1-m1","c1-m4","c3-m11"], veja:["CAC","CPC","ROAS"]
  },
  "CAC": {
    nome:"Customer Acquisition Cost — Custo de Aquisição de Cliente",
    simples:"Quanto você gastou, no total, para conseguir um paciente que pagou.",
    tecnica:"(Investimento em mídia + custo de vendas) ÷ número de clientes adquiridos no período. A versão simplificada usa só mídia; a completa inclui horas de atendimento e ferramentas.",
    importa:"É a única métrica de custo que importa no seu modelo. Custo por lead e CAC se movem em direções OPOSTAS em negócios high ticket — leads mais caros costumam produzir pacientes mais baratos.",
    exemplo:"R$3.000 de mídia gerando 10 pacientes = CAC de R$300, ou 7,5% de um ticket de R$4.000. Teto saudável recomendado: 12% do ticket.",
    onde:["c1-m1","c1-m3","c2-m4","c2-m9","c3-m11"], veja:["CPA","LTV","ROAS"]
  },
  "LTV": {
    nome:"Lifetime Value — Valor do Cliente ao Longo do Tempo",
    simples:"Quanto um paciente vale no total, somando tudo que ele vai gastar com você.",
    tecnica:"Ticket médio × frequência de recompra × tempo de retenção. Em serviços de saúde, inclui manutenção, novos protocolos e — se você medir — o valor dos pacientes que ele indicar.",
    importa:"Define quanto você pode gastar para adquirir. Um LTV de R$4.000 permite um CAC muito menor do que um LTV de R$9.000 com manutenção e indicação.",
    exemplo:"Paciente do Melasma: R$4.000 (protocolo) + R$1.800 (manutenção ano 1) + 0,4 indicações × R$4.000 = LTV ≈ R$7.400.",
    onde:["c1-m3","c2-m9","c3-m11"], veja:["CAC","Payback","ROI"]
  },
  "ROI": {
    nome:"Return On Investment — Retorno sobre o Investimento",
    simples:"Quanto você lucrou em relação ao que gastou.",
    tecnica:"(Receita − custo total) ÷ custo total × 100. Diferente do ROAS, o ROI desconta TODOS os custos: mídia, entrega, ferramentas, impostos e o seu tempo.",
    importa:"É a métrica do negócio; o ROAS é a métrica da campanha. Uma campanha com ROAS 5 pode ter ROI negativo se a entrega consumir 90% da receita.",
    exemplo:"R$40.000 de receita − R$3.000 de mídia − R$14.000 de custo de entrega e impostos = ROI de 135%.",
    onde:["c1-m3","c3-m11"], veja:["ROAS","LTV","CAC"]
  },
  "ROAS": {
    nome:"Return On Ad Spend — Retorno sobre o Investimento em Anúncios",
    simples:"Para cada real gasto em anúncio, quantos reais voltaram em receita.",
    tecnica:"Receita atribuída ÷ investimento em anúncios. Não desconta custo de entrega, impostos nem overhead.",
    importa:"O ROAS que o Meta reporta é fantasia no seu caso: você não passa valor de compra online, então a plataforma não sabe quanto você faturou. Calcule manualmente.",
    exemplo:"R$40.000 ÷ R$3.000 = ROAS 13,3. Mas o Gerenciador vai mostrar 0 — porque a venda aconteceu na consulta, fora da internet.",
    onde:["c1-m1","c3-m11"], veja:["ROI","CAC","CAPI"]
  },
  "Payback": {
    nome:"Payback Period — Período de Retorno",
    simples:"Quanto tempo leva para o paciente pagar o que custou adquiri-lo.",
    tecnica:"CAC ÷ margem mensal por cliente. Em negócios de pagamento único, o payback é imediato; em recorrência, é o mês em que o cliente 'se paga'.",
    importa:"Define a velocidade com que você pode reinvestir. Payback curto permite escalar sem capital de giro.",
    exemplo:"CAC de R$300 num protocolo pago à vista de R$4.000: payback imediato — você pode reinvestir no mesmo mês.",
    onde:["c1-m3"], veja:["CAC","LTV"]
  },
  "KPI": {
    nome:"Key Performance Indicator — Indicador-Chave de Desempenho",
    simples:"Um número que você acompanha porque ele muda decisões.",
    tecnica:"Métrica selecionada por três critérios: é acionável, tem cadeia causal até a receita, e você a controla. Métricas que falham em qualquer um dos três são informação, não KPI.",
    importa:"A escolha dos KPIs programa o comportamento futuro da operação. Pela Lei de Goodhart, toda métrica que vira meta deixa de ser boa medida.",
    exemplo:"Tempo mediano de primeira resposta no WhatsApp é KPI. Número de seguidores não é.",
    onde:["c1-m1","c3-m11"], veja:["NPS"]
  },
  "NPS": {
    nome:"Net Promoter Score — Índice de Promotores",
    simples:"Uma nota de 0 a 10 que mede se o paciente te indicaria.",
    tecnica:"% promotores (9–10) − % detratores (0–6). Ignora os neutros (7–8).",
    importa:"Mede satisfação, não identidade. No seu negócio, indicação nasce de identidade — o paciente indica quando o resultado virou parte de como ele se vê. Satisfação gera nota 9; identidade gera três amigas no WhatsApp.",
    exemplo:"Uma paciente pode dar 10 no NPS e nunca indicar ninguém, porque não quer contar que tratou melasma.",
    onde:["c1-m8"], veja:["KPI"]
  },
  "SLA": {
    nome:"Service Level Agreement — Acordo de Nível de Serviço",
    simples:"O prazo máximo que você se compromete a cumprir.",
    tecnica:"Compromisso mensurável de tempo de resposta ou entrega, com meta declarada e medição contínua.",
    importa:"O SLA de primeira resposta no WhatsApp é o vazamento mais caro e mais barato de corrigir do funil inteiro. Recupera 30–50% das conversas e custa quase nada.",
    exemplo:"SLA humano de 15 minutos em horário comercial + resposta automática em menos de 60 segundos, 24/7, terminando com uma pergunta.",
    onde:["c1-m1","c1-m5","c2-m9"], veja:["KPI"]
  },

  /* ---------------- RASTREAMENTO E META ---------------- */
  "Sistema 1": {
    nome:"Sistema 1 — Processamento Rápido",
    simples:"A parte automática da mente: rápida, emocional, sempre ligada, impossível de desligar.",
    tecnica:"Modo de operação cognitiva rápido, paralelo, automático e de baixo custo, descrito na arquitetura de processo dual. Gera impressões e intuições que o Sistema 2 costuma aceitar sem verificar. Modelo descritivo, não estrutura anatômica.",
    importa:"É quem decide parar o scroll — em ~0,4 s. Nenhum conteúdo chega ao Sistema 2 sem o Sistema 1 ter aprovado a passagem. Mas ele também aplaude e esquece: agradar só a ele produz métricas ótimas e zero conversa.",
    exemplo:"Um Reel que abre com fisiopatologia é descartado pelo Sistema 1 antes do Sistema 2 saber que existia um Reel.",
    onde:["c2-m1","c2-m4"], veja:["Sistema 2"]
  },
  "Sistema 2": {
    nome:"Sistema 2 — Processamento Deliberado",
    simples:"A parte que raciocina: lenta, custosa, analítica — e preguiçosa por padrão.",
    tecnica:"Modo de operação cognitiva lento, serial, deliberado e custoso em recursos atencionais. Só é convocado quando o Sistema 1 encontra algo que não resolve, ou quando explicitamente chamado.",
    importa:"É quem decide gastar R$4.000 — em 3 a 12 semanas, não em 3 segundos. Autoridade é um julgamento do Sistema 2. Por isso o Reel não vende: ele compra o direito de falar com a instância que decide.",
    exemplo:"Segundos 0–3 do Reel são território do Sistema 1 (rosto, movimento, palavra-marcador). Dos 3s em diante é território do Sistema 2: mecanismo, nuance, limites.",
    onde:["c2-m1","c2-m4"], veja:["Sistema 1"]
  },

  "CFBM": {
    nome:"Conselho Federal de Biomedicina",
    simples:"O conselho que regula a sua profissão — e o único cujas regras de publicidade valem para você.",
    tecnica:"Autarquia federal criada pela Lei 6.684/1979 que regulamenta o exercício da Biomedicina. Edita o Código de Ética da profissão e resoluções vinculantes, com Conselhos Regionais (CRBM) executando a fiscalização.",
    importa:"O Código de Ética do CFBM (art. 37) rege a sua publicidade, e prevê penalidade de multa de até 5 anuidades e/ou suspensão de até 12 meses para publicidade em desacordo. Não é detalhe burocrático — é risco de exercício profissional.",
    exemplo:"Todo consultor que disser “pelo CFM você pode fazer antes e depois” está citando a lei de outra profissão. A sua é esta.",
    onde:["c2-m3","c3-m10"], veja:["CFM","CRBM"]
  },
  "CFM": {
    nome:"Conselho Federal de Medicina",
    simples:"O conselho que regula médicos. Não regula você.",
    tecnica:"Autarquia que normatiza o exercício da medicina. A Resolução CFM nº 2.336/2023, em vigor desde março de 2024, revogou a 1.974/2011 e flexibilizou a publicidade médica — permitindo redes sociais, divulgação de preços e uso de imagens sob condições estritas.",
    importa:"É a norma mais citada em marketing de saúde no Brasil, porque o material sobre marketing médico é abundante. Aplicá-la a uma biomédica é erro de categoria — e é um erro comum.",
    exemplo:"A 2.336/2023 flexibilizou o antes/depois para médicos, com exigências pesadas (texto educativo, complicações, evoluções insatisfatórias, anonimato). Nada disso te autoriza: quem te autoriza ou veda é o CFBM.",
    onde:["c2-m3"], veja:["CFBM"]
  },
  "CRBM": {
    nome:"Conselho Regional de Biomedicina",
    simples:"O braço regional do CFBM — quem fiscaliza e quem você consulta na dúvida.",
    tecnica:"Conselhos regionais que executam registro, fiscalização e processo ético-disciplinar dos biomédicos em sua jurisdição, aplicando as normas editadas pelo CFBM.",
    importa:"É a instância que responde dúvida concreta sobre o que você pode publicar. Quando um módulo desta plataforma disser “confirme com o seu conselho”, é aqui.",
    exemplo:"Antes de publicar qualquer caso clínico, a pergunta vai para o seu CRBM regional — não para um blog de agência nem para este curso.",
    onde:["c2-m3"], veja:["CFBM"]
  },
  "ABI": {
    nome:"Ability–Benevolence–Integrity — Modelo Integrativo de Confiança",
    simples:"As três variáveis independentes que compõem o quanto alguém parece confiável.",
    tecnica:"Modelo de Mayer, Davis e Schoorman (1995) que decompõe a confiabilidade percebida em habilidade (competência no domínio), benevolência (querer o bem do outro sem motivo egoísta) e integridade (aderir consistentemente a princípios aceitáveis). Meta-analisado por Colquitt et al. (2007).",
    importa:"A independência é o achado útil: alta habilidade com baixa benevolência não gera confiança — gera medo competente. Seu diploma move uma das três, e é a que ela menos duvida.",
    exemplo:"“Ela sabe muito — e está me vendendo alguma coisa” é falha de benevolência com habilidade intacta. Nenhum diploma a mais resolve.",
    onde:["c2-m3","c2-m5"], veja:["Sistema 1","Sistema 2"]
  },

  "Pixel": {
    nome:"Meta Pixel (antigo Facebook Pixel)",
    simples:"Um pedaço de código no seu site que avisa a Meta o que as pessoas fizeram ali.",
    tecnica:"Biblioteca JavaScript (fbq) que dispara requisições HTTP para os servidores da Meta a cada evento, carregando cookies de identificação (_fbp, _fbc) e parâmetros do evento.",
    importa:"O Pixel NÃO mede — ele ENSINA. Cada evento é uma frase dita ao algoritmo sobre quem você quer. Otimize por clique e ele traz cliqueiros, com máxima eficiência.",
    exemplo:"Se o seu Pixel dispara Lead em todo clique no botão do WhatsApp, você está ensinando a Meta que curiosos são conversões.",
    onde:["c1-m1","c2-m9","c3-m1","c3-m2"], veja:["Dataset","CAPI","fbclid"]
  },
  "Dataset": {
    nome:"Meta Dataset — Conjunto de Dados",
    simples:"A 'caixa' onde a Meta guarda todos os seus eventos, venham do site ou do servidor.",
    tecnica:"Contêiner no Events Manager que agrega dados de Pixel (browser), Conversions API (servidor), app e offline em uma única fonte. O Dataset ID é o mesmo número do Pixel ID.",
    importa:"É a nomenclatura atual. Guias que ensinam a 'criar um Pixel' descrevem uma tela que mudou — hoje você cria um dataset, e o Pixel vive dentro dele. O Pixel não foi descontinuado, foi reagrupado.",
    exemplo:"Um dataset por protocolo? Não. Um dataset só, alimentado por Pixel + CAPI, com eventos distintos para Melasma e Desinflamação.",
    onde:["c3-m2"], veja:["Pixel","CAPI"]
  },
  "CAPI": {
    nome:"Conversions API — API de Conversões",
    simples:"Um canal que envia os eventos do seu servidor direto para a Meta, sem depender do navegador.",
    tecnica:"API server-side que envia eventos para o mesmo Dataset do Pixel. Requer event_id compartilhado com o Pixel para deduplicação, e parâmetros de correspondência hasheados.",
    importa:"Bloqueadores, ITP do Safari e restrições de cookie derrubam de 15% a 30% dos eventos só com Pixel — e essas perdas vêm desproporcionalmente de iOS, que no seu nicho correlaciona com maior poder aquisitivo.",
    exemplo:"Sem CAPI, você está cegando o algoritmo justamente para o seu melhor público.",
    onde:["c2-m9","c3-m1","c3-m2"], veja:["Pixel","Dataset","event_id","EMQ"]
  },
  "event_id": {
    nome:"Event ID — Identificador de Evento",
    simples:"Um código único que evita que o mesmo evento seja contado duas vezes.",
    tecnica:"String única gerada por evento e enviada tanto pelo Pixel quanto pela CAPI. A Meta usa o par (event_name + event_id) numa janela de 48h para deduplicar.",
    importa:"Sem ele, Pixel + CAPI contam tudo em dobro: infla a contagem, corrompe o CPA aparente e envenena o modelo com sinais falsos de sucesso.",
    exemplo:"Se você já tem camada dual-fire (GTM + fbq) nas suas landing pages, este é o primeiro item a auditar.",
    onde:["c2-m9","c3-m2"], veja:["CAPI","Pixel"]
  },
  "fbclid": {
    nome:"Facebook Click Identifier — Identificador de Clique",
    simples:"Um código que a Meta cola no fim do link quando alguém clica no seu anúncio.",
    tecnica:"Parâmetro de URL adicionado pela Meta no clique. O Pixel o captura e grava no cookie _fbc, permitindo atribuir a conversão ao anúncio de origem.",
    importa:"Se seu site remove parâmetros de URL, faz redirect que os descarta, ou usa cache agressivo, você perde a atribuição do clique pago.",
    exemplo:"Um redirect de 'melasma.com.br' para 'www.melasma.com.br' que descarta a query string quebra a atribuição de todo o tráfego pago.",
    onde:["c3-m2"], veja:["Pixel","UTM"]
  },
  "AEM": {
    nome:"Aggregated Event Measurement — Medição Agregada de Eventos",
    simples:"O limite da Meta: você só pode priorizar 8 tipos de evento por domínio.",
    tecnica:"Protocolo criado em resposta ao ATT do iOS. Limita a 8 eventos priorizados por domínio verificado, com hierarquia definida por você. Conversões de usuários que recusaram rastreamento só reportam o evento de maior prioridade.",
    importa:"Força uma decisão estratégica: quais 8 eventos importam, e em que ordem. A hierarquia errada faz você perder o sinal justamente dos eventos mais valiosos.",
    exemplo:"Prioridade 1 deve ser 'Adesão ao protocolo', não 'PageView' — mesmo que PageView tenha 500× mais volume.",
    onde:["c3-m2"], veja:["Pixel","CAPI"]
  },
  "EMQ": {
    nome:"Event Match Quality — Qualidade de Correspondência do Evento",
    simples:"Uma nota de 0 a 10 que diz o quanto a Meta consegue reconhecer quem fez a ação.",
    tecnica:"Score calculado a partir dos parâmetros de correspondência enviados (e-mail, telefone, nome, cidade — todos hasheados com SHA-256).",
    importa:"Nota 4/10 significa que mais da metade do seu sinal se perde. É reversível, barato de corrigir, e quase ninguém olha.",
    exemplo:"Enviar telefone hasheado junto do evento Contact pode levar seu EMQ de 4 para 8 — dobrando o sinal útil sem gastar um centavo a mais.",
    onde:["c2-m9","c3-m2"], veja:["CAPI","Advanced Matching"]
  },
  "Advanced Matching": {
    nome:"Advanced Matching — Correspondência Avançada",
    simples:"Enviar dados do cliente (criptografados) junto do evento, para a Meta reconhecê-lo.",
    tecnica:"Envio de identificadores hasheados (SHA-256) junto ao evento: em, ph, fn, ln, ct, st, zp, country. Pode ser automático (o Pixel lê formulários) ou manual.",
    importa:"É o principal alavancador de EMQ. Mas em saúde exige cuidado: nunca envie parâmetros que revelem condição médica.",
    exemplo:"Enviar 'em' e 'ph' hasheados: OK. Enviar um parâmetro custom 'condicao=melasma': violação de política e risco de conta.",
    onde:["c3-m2","c3-m10"], veja:["EMQ","CAPI","LGPD"]
  },
  "UTM": {
    nome:"Urchin Tracking Module — Parâmetros de Rastreamento de Campanha",
    simples:"Etiquetas coladas no link que dizem de onde a visita veio.",
    tecnica:"Cinco parâmetros de URL: utm_source, utm_medium, utm_campaign, utm_content, utm_term. Lidos pelo GA4 para classificar aquisição.",
    importa:"É a única forma de o GA4 saber que a visita veio do seu anúncio de Melasma e não do orgânico. Sem padronização, seu relatório de aquisição vira lixo em 3 meses.",
    exemplo:"utm_source=meta&utm_medium=cpc&utm_campaign=melasma_frio&utm_content=hook_verao_03",
    onde:["c3-m3","c3-m4"], veja:["GA4","fbclid"]
  },

  /* ---------------- FERRAMENTAS ---------------- */
  "GA4": {
    nome:"Google Analytics 4",
    simples:"A ferramenta gratuita do Google que registra o que as pessoas fazem no seu site.",
    tecnica:"Plataforma de analytics baseada em modelo de eventos (não em sessões/pageviews como o Universal Analytics). Tudo é evento com parâmetros.",
    importa:"É a única fonte que te dá tempo na página, profundidade de scroll e conversão por dispositivo/origem. E os números NUNCA vão bater com o Meta — modelos de atribuição diferentes.",
    exemplo:"Tempo médio na landing do Melasma abaixo de 90s indica ruptura de coerência entre anúncio e página.",
    onde:["c1-m1","c2-m9","c3-m1","c3-m4"], veja:["GTM","UTM"]
  },
  "GTM": {
    nome:"Google Tag Manager — Gerenciador de Tags",
    simples:"Um painel onde você instala e organiza códigos de rastreamento sem mexer no site.",
    tecnica:"Contêiner JavaScript que carrega tags condicionalmente com base em triggers, alimentado por variáveis e pelo Data Layer.",
    importa:"É um roteador, não uma ferramenta de medição. Permite mudar rastreamento sem deploy — e permite quebrar tudo sem deploy também. Exige versionamento disciplinado.",
    exemplo:"Com GTM você adiciona o evento de retenção de vídeo às duas landing pages sem tocar no HTML.",
    onde:["c3-m1","c3-m3","c3-m10"], veja:["GA4","Data Layer","CSP"]
  },
  "Data Layer": {
    nome:"Data Layer — Camada de Dados",
    simples:"Uma lista onde seu site anota o que aconteceu, para o GTM ler.",
    tecnica:"Array JavaScript (window.dataLayer) que serve de interface de contrato entre o site e o GTM. O site empurra objetos; o GTM escuta e reage.",
    importa:"É o que separa rastreamento frágil (GTM adivinhando por seletores CSS) de rastreamento robusto (o site declarando explicitamente o que houve). Um redesign quebra o primeiro; não quebra o segundo.",
    exemplo:"dataLayer.push({event:'video_75', protocolo:'melasma', video_id:'mecanismo_v2'})",
    onde:["c3-m2","c3-m3"], veja:["GTM"]
  },
  "Clarity": {
    nome:"Microsoft Clarity",
    simples:"Ferramenta gratuita que grava a tela dos visitantes e mostra onde eles clicam.",
    tecnica:"Plataforma de análise comportamental com heatmaps, scroll maps, session replay e detecção automática de dead click, rage click e quick back.",
    importa:"É a única fonte qualitativa gratuita do seu stack. Com volume baixo (~400 visitas/mês), teste A/B não tem poder estatístico — mas 20 gravações te dão 5 hipóteses reais.",
    exemplo:"Rage click no seu botão de WhatsApp = ele parece clicável mas não responde no mobile. Isso não aparece em nenhuma métrica.",
    onde:["c3-m1","c3-m5","c3-m7"], veja:["CRO"]
  },
  "CRM": {
    nome:"Customer Relationship Management — Gestão de Relacionamento",
    simples:"O lugar onde você registra cada paciente e em que ponto da conversa ela está.",
    tecnica:"Sistema de registro de leads, estágio do funil, histórico de interações e resultado. Pode ser uma planilha de 6 colunas.",
    importa:"Quatro das nove métricas do seu painel — tempo de resposta, taxa de agendamento, comparecimento e adesão — não existem em NENHUMA plataforma. Só existem se você registrar.",
    exemplo:"Planilha: data · origem · 1º contato · resposta · agendada · realizada · adesão. Isso vale mais que qualquer dashboard automático.",
    onde:["c1-m5","c3-m1","c3-m11"], veja:["KPI","SLA"]
  },
  "CRO": {
    nome:"Conversion Rate Optimization — Otimização de Taxa de Conversão",
    simples:"O trabalho de fazer mais visitantes virarem pacientes, sem gastar mais em anúncio.",
    tecnica:"Disciplina de melhoria contínua baseada em hipótese → teste → decisão, usando dados quantitativos (GA4) e qualitativos (Clarity).",
    importa:"O CRO padrão foi construído em e-commerce, onde todo cliente extra é lucro. No seu modelo, cada cliente ERRADO custa 90 minutos de consulta. A função-objetivo é diferente, então a prescrição é diferente: sua página filtra, não persuade.",
    exemplo:"Reduzir fricção da landing do Melasma aumentaria contatos e DERRUBARIA fechamentos — porque desligaria o filtro.",
    onde:["c3-m5","c3-m6","c3-m7"], veja:["Clarity","A/B"]
  },
  "SEO": {
    nome:"Search Engine Optimization — Otimização para Buscadores",
    simples:"Fazer o Google encontrar, entender e mostrar suas páginas.",
    tecnica:"Conjunto de práticas nas camadas de rastreamento (crawl), indexação (index) e classificação (rank).",
    importa:"Landing page de tráfego pago tem um dilema: indexar (ganha orgânico, perde controle de mensagem) ou noindex (mantém controle, perde canal gratuito).",
    exemplo:"Sua página de Melasma pode ranquear para 'por que melasma volta' — mas isso exige conteúdo indexável, e não só copy de conversão.",
    onde:["c3-m9"], veja:["Schema","CWV"]
  },
  "Schema": {
    nome:"Schema.org — Dados Estruturados",
    simples:"Um rótulo invisível que explica ao Google o que cada coisa da sua página é.",
    tecnica:"Vocabulário padronizado, normalmente em JSON-LD, que marca entidades: MedicalBusiness, Person, FAQPage, Article, BreadcrumbList.",
    importa:"É o que permite rich snippets e ajuda o buscador a entender que você é uma profissional de saúde, não um e-commerce.",
    exemplo:"Marcar seu FAQ com FAQPage pode exibir as perguntas direto no resultado de busca.",
    onde:["c3-m9"], veja:["SEO","OG"]
  },
  "OG": {
    nome:"Open Graph — Protocolo de Compartilhamento",
    simples:"As tags que definem como seu link aparece quando alguém compartilha no WhatsApp.",
    tecnica:"Meta tags (og:title, og:description, og:image, og:url) lidas por Meta, WhatsApp, LinkedIn e outros ao gerar o preview.",
    importa:"Toda indicação passa por aqui. Se o preview do seu link no WhatsApp estiver quebrado, você perde a conversão mais barata que existe: a indicação.",
    exemplo:"Uma paciente manda seu link pra amiga. Sem og:image, aparece um retângulo cinza — e a amiga não clica.",
    onde:["c3-m9"], veja:["SEO","Schema"]
  },

  /* ---------------- PERFORMANCE ---------------- */
  "CWV": {
    nome:"Core Web Vitals — Métricas Essenciais da Web",
    simples:"As três notas do Google para dizer se seu site é rápido e estável.",
    tecnica:"Trio de métricas de campo medidas em usuários reais do Chrome (via CrUX), no percentil 75 de uma janela móvel de 28 dias: LCP, INP e CLS. É preciso passar nas três.",
    importa:"São dados de CAMPO, não de laboratório. Nota 100 no Lighthouse não significa nada se 25% dos seus visitantes reais estiverem em celulares medianos no 4G.",
    exemplo:"Sua landing de Melasma pode passar no seu desktop e falhar no 4G da paciente — que é onde ela realmente está.",
    onde:["c3-m8","c3-m9"], veja:["LCP","INP","CLS","CrUX","FID"]
  },
  "LCP": {
    nome:"Largest Contentful Paint — Maior Renderização de Conteúdo",
    simples:"Quanto tempo até aparecer a maior coisa da tela (normalmente a imagem principal).",
    tecnica:"Tempo até a renderização do maior elemento de conteúdo visível na viewport. Bom: até 2,5s no p75 de campo.",
    importa:"É o que mais impacta a percepção de velocidade. Acima de 3s no 4G, uma parte relevante do tráfego pago nem chega a ver a página — e essa é a única fricção que não filtra: mata bons e ruins igualmente.",
    exemplo:"Um player de YouTube carregado no load derruba seu LCP. A solução é o padrão facade: carregar uma imagem estática e só instanciar o player no clique.",
    onde:["c2-m9","c3-m8"], veja:["CWV","INP","CLS"]
  },
  "INP": {
    nome:"Interaction to Next Paint — Interação até a Próxima Renderização",
    simples:"Quanto tempo o site demora para responder quando você toca em algo.",
    tecnica:"Mede a latência de TODAS as interações da sessão (cliques, toques, teclas) e reporta a pior no p75. Bom: até 200ms. Substituiu o FID em março de 2024.",
    importa:"É o Core Web Vital mais reprovado da web. JavaScript pesado bloqueando a main thread é a causa dominante — e GTM com muitas tags é uma fonte clássica.",
    exemplo:"Se o botão de WhatsApp demora 400ms para responder ao toque, a paciente toca de novo — e o Clarity registra rage click.",
    onde:["c3-m8"], veja:["CWV","FID","LCP"]
  },
  "CLS": {
    nome:"Cumulative Layout Shift — Mudança Cumulativa de Layout",
    simples:"O quanto a página 'pula' enquanto carrega.",
    tecnica:"Soma das pontuações de deslocamento de layout inesperado durante a vida da página. Bom: abaixo de 0,1.",
    importa:"É a métrica com maior taxa de aprovação porque a correção é mecânica: declare width e height em toda imagem, vídeo, iframe e espaço dinâmico.",
    exemplo:"Um banner de cookies que empurra o conteúdo depois de 1s destrói seu CLS — e faz a paciente clicar no lugar errado.",
    onde:["c3-m8"], veja:["CWV","LCP"]
  },
  "FID": {
    nome:"First Input Delay — Atraso da Primeira Interação",
    obsoleto:true,
    simples:"Métrica antiga que media só o atraso do primeiro clique. Não é mais usada.",
    tecnica:"Media o tempo entre a primeira interação e o início do processamento pelo navegador. Foi substituída pelo INP em 12 de março de 2024; o Chrome removeu o suporte a partir de setembro de 2024.",
    importa:"Está aqui apenas como verbete histórico. Qualquer guia, curso ou ferramenta que ainda liste FID como Core Web Vital está desatualizado — e isso é um bom teste de atualidade de qualquer material técnico que você consumir.",
    exemplo:"Se o seu relatório de performance ainda mostra FID, atualize a ferramenta.",
    onde:["c3-m8"], veja:["INP","CWV"]
  },
  "CrUX": {
    nome:"Chrome User Experience Report — Relatório de Experiência do Chrome",
    simples:"O banco de dados do Google com a velocidade real que os usuários do Chrome tiveram no seu site.",
    tecnica:"Dataset público de dados de campo coletados de usuários reais do Chrome que optaram por compartilhar. É a fonte oficial de avaliação dos Core Web Vitals, no p75 de 28 dias.",
    importa:"É a diferença entre laboratório e realidade. O Google te avalia pelo CrUX, não pelo seu Lighthouse.",
    exemplo:"Se sua landing tem tráfego baixo, pode não ter dados suficientes no CrUX — e aí você depende de dados de laboratório com todas as ressalvas.",
    onde:["c3-m8"], veja:["CWV","LCP","INP","CLS"]
  },
  "TTFB": {
    nome:"Time To First Byte — Tempo até o Primeiro Byte",
    simples:"Quanto tempo o servidor demora para começar a responder.",
    tecnica:"Tempo entre a requisição e a chegada do primeiro byte da resposta. Componente do LCP.",
    importa:"TTFB alto envenena o LCP e nenhuma otimização de imagem resolve. É hospedagem, não front-end.",
    exemplo:"TTFB de 900ms numa hospedagem compartilhada barata inviabiliza um LCP bom, por melhor que seja a página.",
    onde:["c3-m8"], veja:["LCP","CWV"]
  },
  "TBT": {
    nome:"Total Blocking Time — Tempo Total de Bloqueio",
    simples:"Quanto tempo a página fica travada por causa de JavaScript.",
    tecnica:"Soma dos trechos de long tasks (>50ms) entre o FCP e a interatividade. É a métrica de laboratório que melhor aproxima o INP.",
    importa:"Como o INP é de campo, você não consegue testá-lo antes de publicar. O TBT é o proxy que você mede no laboratório.",
    exemplo:"Cada tag adicionada ao GTM soma TBT. Vinte tags e sua página trava no celular da paciente.",
    onde:["c3-m8"], veja:["INP","FCP"]
  },
  "FCP": {
    nome:"First Contentful Paint — Primeira Renderização de Conteúdo",
    simples:"Quando o primeiro texto ou imagem aparece na tela.",
    tecnica:"Tempo até o primeiro conteúdo do DOM ser pintado. Não é Core Web Vital, mas é diagnóstico.",
    importa:"FCP bom com LCP ruim indica que algo grande e específico está atrasando — normalmente a imagem hero ou o vídeo.",
    exemplo:"FCP de 1,1s com LCP de 4,2s na sua landing do Melasma: o texto apareceu rápido, mas a imagem hero ou o player de vídeo está segurando tudo. Você sabe onde procurar.",
    onde:["c3-m8"], veja:["LCP","TBT"]
  },

  /* ---------------- SEGURANÇA E JURÍDICO ---------------- */
  "LGPD": {
    nome:"Lei Geral de Proteção de Dados (Lei 13.709/2018)",
    simples:"A lei brasileira que diz o que você pode e não pode fazer com os dados das pacientes.",
    tecnica:"Marco legal de proteção de dados pessoais. Dado de saúde é categoria de DADO PESSOAL SENSÍVEL (art. 5º, II), com regime de base legal mais restrito (art. 11).",
    importa:"Não é burocracia — é risco existencial para a operação. Além do risco jurídico, a Meta tem políticas próprias: enviar parâmetros que indiquem condição médica pode gerar restrição de conta.",
    exemplo:"Um evento custom com 'condicao=melasma' é simultaneamente violação de política da Meta e tratamento de dado sensível sem base legal adequada.",
    onde:["c3-m2","c3-m10"], veja:["ANPD","CMP","Advanced Matching"]
  },
  "ANPD": {
    nome:"Autoridade Nacional de Proteção de Dados",
    simples:"O órgão do governo que fiscaliza a LGPD.",
    tecnica:"Autarquia federal responsável por editar normas, fiscalizar e aplicar sanções previstas na LGPD.",
    importa:"É a fonte primária de interpretação. Quando o curso citar regra de LGPD, a fonte deve ser a ANPD — não um blog de marketing.",
    exemplo:"Se um módulo deste curso afirmar algo sobre base legal para dado de saúde, a fonte tem que ser a ANPD ou a própria lei — nunca um blog de agência.",
    onde:["c3-m10"], veja:["LGPD"]
  },
  "CMP": {
    nome:"Consent Management Platform — Plataforma de Gestão de Consentimento",
    simples:"O banner de cookies e o sistema que registra o que a pessoa autorizou.",
    tecnica:"Ferramenta que coleta, armazena e propaga o estado de consentimento para as tags, tipicamente integrada ao Consent Mode do Google e ao GTM.",
    importa:"Sem CMP, você trata dado sem base legal. Com CMP mal configurada, você quebra o rastreamento inteiro — e descobre 30 dias depois.",
    exemplo:"Se a CMP bloquear o GTM antes do consentimento e a paciente não aceitar, você perde o evento e não sabe.",
    onde:["c3-m10"], veja:["LGPD","GTM","CSP"]
  },
  "CSP": {
    nome:"Content Security Policy — Política de Segurança de Conteúdo",
    simples:"Uma regra que diz ao navegador quais códigos ele pode executar na sua página.",
    tecnica:"Header HTTP que declara origens permitidas para scripts, estilos, imagens e conexões. Mitiga XSS por defesa em profundidade.",
    importa:"CSP e GTM brigam: o GTM injeta scripts inline, que é exatamente o que a CSP existe para bloquear. Fazer CSP depois do GTM quebra o rastreamento — por isso segurança precisa ser pensada junto, não depois.",
    exemplo:"Uma CSP mal configurada nas suas landing pages derruba o Pixel silenciosamente.",
    onde:["c3-m3","c3-m10"], veja:["XSS","HSTS","GTM"]
  },
  "HSTS": {
    nome:"HTTP Strict Transport Security",
    simples:"Uma regra que obriga o navegador a sempre usar conexão segura no seu site.",
    tecnica:"Header que instrui o navegador a acessar o domínio exclusivamente via HTTPS por um período determinado, prevenindo downgrade e sequestro de cookies.",
    importa:"Barato, e evita uma classe inteira de ataque. Cuidado com o max-age: errar aqui é difícil de reverter.",
    exemplo:"Sem HSTS, uma paciente que digita 'melasma.com.br' sem https pode ser interceptada no primeiro salto — e ela vai digitar o seu domínio nos dados de contato dela.",
    onde:["c3-m10"], veja:["CSP"]
  },
  "XSS": {
    nome:"Cross-Site Scripting",
    simples:"Um ataque em que alguém injeta código malicioso na sua página.",
    tecnica:"Injeção de script no contexto da página, explorando entrada não sanitizada. Pode roubar cookies, sessões e dados de formulário.",
    importa:"Suas landing pages coletam contato de pacientes. Um XSS não é só defacement — é vazamento de dado pessoal, com consequência de LGPD.",
    exemplo:"Um campo de formulário sem sanitização na sua landing permite injetar script que rouba o nome e o telefone de cada paciente que preencher — vazamento de dado pessoal, com consequência de LGPD.",
    onde:["c3-m10"], veja:["CSP","LGPD"]
  },

  /* ---------------- MÉTODO E ESTATÍSTICA ---------------- */
  "A/B": {
    nome:"Teste A/B — Teste Controlado Aleatorizado",
    simples:"Mostrar duas versões para públicos parecidos e ver qual converte mais.",
    tecnica:"Experimento com alocação aleatória entre variantes, medindo diferença numa métrica primária definida antes do teste.",
    importa:"Com ~400 visitas/mês, a diferença entre 2,1% e 2,8% NÃO é significativa — você está lendo ruído e chamando de otimização. O caminho para volume baixo é teste qualitativo e mudanças grandes.",
    exemplo:"Testar cor de botão na sua landing exigiria meses para significância. Testar a estrutura do vídeo não — porque o efeito esperado é grande.",
    onde:["c3-m6","c3-m7"], veja:["IC","p-valor","CRO"]
  },
  "IC": {
    nome:"Intervalo de Confiança",
    simples:"A faixa onde o resultado verdadeiro provavelmente está.",
    tecnica:"Intervalo que, sob amostragens repetidas, conteria o parâmetro real numa proporção declarada das vezes (tipicamente 95%). NÃO é 'a probabilidade de o valor estar aqui'.",
    importa:"É mais informativo que o p-valor porque mostra a MAGNITUDE plausível do efeito. Um IC de [−3%, +18%] diz 'não sei' de forma muito mais honesta que 'p=0,08'.",
    exemplo:"Se o IC da diferença entre duas landing pages cruza o zero, você não tem resultado — tem esperança.",
    onde:["c3-m6"], veja:["p-valor","A/B"]
  },
  "p-valor": {
    nome:"Valor-p (p-value)",
    simples:"A chance de você ver um resultado assim se, na verdade, não houvesse diferença nenhuma.",
    tecnica:"Probabilidade de obter um resultado tão ou mais extremo que o observado, ASSUMINDO a hipótese nula verdadeira. Não é a probabilidade de a hipótese ser verdadeira — esse é o erro de interpretação mais comum da estatística aplicada.",
    importa:"p < 0,05 não significa 'está provado'. Significa 'seria incomum sob a nula'. Com volume baixo e muitos testes, p-valores pequenos aparecem por acaso.",
    exemplo:"Testar 10 variações e achar uma com p=0,04 é o esperado por sorte — não uma descoberta.",
    onde:["c3-m6"], veja:["IC","A/B"]
  },
  "MELASQOL": {
    nome:"Melasma Quality of Life Scale",
    simples:"Um questionário validado que mede o impacto do melasma na vida da paciente.",
    tecnica:"Instrumento específico de qualidade de vida para melasma, validado internacionalmente e com versão validada para o português brasileiro (MelasQoL-BP). Cobre aparência, frustração, constrangimento, humor, interações sociais e liberdade.",
    importa:"É a sua prova de que melasma não é 'só estético' — e provavelmente a coisa mais poderosa que você pode dizer a uma paciente que já foi invalidada por um profissional.",
    exemplo:"'Existe questionário validado que mede o impacto do melasma na vida social e no humor. Ele existe porque o impacto é real e foi documentado.'",
    onde:["c2-m2"], veja:["CSM"]
  },
  "CSM": {
    nome:"Common-Sense Model of Self-Regulation — Modelo do Senso Comum",
    simples:"Um modelo de como as pessoas montam na cabeça a ideia do que é a doença delas.",
    tecnica:"Modelo de Leventhal que descreve a representação da doença em cinco dimensões: identidade, causa, linha do tempo, consequências e cura/controle. É essa representação — não os fatos médicos — que governa o comportamento.",
    importa:"É o esqueleto científico do mapa da paciente. Explica por que 'não tem cura, só controle' (dimensão 5) trava a venda muito antes de preço.",
    exemplo:"A paciente que acredita que melasma é cíclico e incurável não avalia o seu preço — ela nem entra na conta.",
    onde:["c2-m2"], veja:["MELASQOL"]
  },
  "SOG": {
    nome:"Sistema Operacional de Crescimento",
    simples:"O framework final que amarra os três cursos em uma operação só.",
    tecnica:"Capstone da plataforma. Integra marketing, psicologia, Meta Ads, landing pages, Pixel, GA4, GTM, Clarity, WhatsApp, CRM, analytics, growth, CRO, experimentação, BI, escalabilidade e governança de dados em um único modelo operacional.",
    importa:"Só faz sentido depois que as 30 peças existem. Construído antes, seria um diagrama bonito integrando coisas que ainda não foram ensinadas.",
    exemplo:"É a última entrega da plataforma.",
    onde:["sog"], veja:[]
  }
};

if (typeof module !== "undefined" && module.exports) module.exports = GLOSSARIO;
