/* =====================================================================
   MANIFEST.JS — Fonte única de verdade da plataforma
   ---------------------------------------------------------------------
   TUDO é derivado deste arquivo: sidebar, índice, breadcrumb, navegação
   anterior/próximo, progresso, busca, mapa de dependências.

   REGRA DE OURO: para adicionar um curso ou módulo, edite SOMENTE aqui.
   Nenhum outro arquivo contém a lista de módulos.

   status: "done" | "partial" | "todo"
   vol:    "low" | "med" | "high"  (volatilidade → exige search-first)
   deps:   ids de módulos que devem ser lidos antes
   ===================================================================== */

var PLATFORM = {
  version:    "1.0.0",
  codename:   "Fase 0 — Fundação",
  name:       "Universidade Premium",
  subtitle:   "Aquisição de Pacientes · Estética Integrativa",
  storageKey: "up_progress_v1",
  frozenAt:   "2026-07-16",

  /* ---------- CURSOS E MÓDULOS ---------- */
  courses: [
    {
      id: "c1", n: 1,
      title: "Sistema Comercial",
      question: "Por onde entra o dinheiro",
      desc: "A estrutura comercial: arquitetura, posicionamento, oferta, mídia paga e conversão humana.",
      modules: [
        { id:"c1-m1", n:1, title:"Arquitetura do Negócio",
          file:"c1-m1-arquitetura.html", status:"done", vol:"low", min:75, secs:11, deps:[],
          desc:"O modelo mental, a jornada em 11 estágios, o ciclo fechado, o mapa do dinheiro, os 7 gargalos e os 50 erros fatais.",
          was:"Curso 1 · Módulo 1" },
        { id:"c1-m2", n:2, title:"Posicionamento e Luxo Silencioso",
          file:"c1-m2-posicionamento.html", status:"done", vol:"low", min:55, secs:7, deps:["c1-m1","c2-m3","c2-m4","c2-m6"],
          desc:"Neurociência do preço, luxo silencioso, território semântico e diferenciação por mecanismo — aplicados a melasma e estrias.",
          was:"Curso 1 · Módulo 2 — primeiro módulo sob a Regra do Sistema Comercial, ver CLAUDE.md" },
        { id:"c1-m3", n:3, title:"Oferta e Precificação",
          file:"c1-m3-oferta.html", status:"done", vol:"low", min:60, secs:8, deps:["c1-m2"],
          desc:"Engenharia financeira da operação: margem de contribuição, CAC máximo, ROAS mínimo, ponto de equilíbrio, LTV, capacidade e uma planilha lógica interativa.",
          was:"Curso 1 · Módulo 4 — construído sob a Regra da Engenharia Financeira, ver CLAUDE.md" },
        { id:"c1-m4", n:4, title:"Meta Ads e a Arquitetura de Aquisição",
          file:"c1-m4-meta-ads.html", status:"done", vol:"high", min:90, secs:10, deps:["c1-m1","c1-m2","c1-m3","c2-m4","c2-m5","c2-m6","c2-m9"],
          desc:"Mapa de 13 etapas de aquisição + Meta Ads a fundo: Advantage+, estrutura por funil, orçamento, Categoria Especial de saúde, aprendizado, otimização, escala e plano operacional completo.",
          was:"Curso 1 · Módulo 8 — módulo-âncora, exceção deliberada à densidade de 45-60min, ver CLAUDE.md" },
        { id:"c1-m5", n:5, title:"WhatsApp: A Sala de Espera Digital",
          file:"c1-m5-whatsapp.html", status:"done", vol:"low", min:55, secs:7, deps:["c1-m2","c1-m3","c1-m4","c2-m2","c2-m3"],
          desc:"SLA de resposta, script de qualificação, filtro de preço, cadência de follow-up sem reatância e CRM mínimo.",
          was:"Curso 1 · Módulo 10" },
        { id:"c1-m6", n:6, title:"A Consulta como Ato Comercial",
          file:"c1-m6-consulta.html", status:"todo", vol:"low", min:60, secs:7, deps:["c1-m5","c2-m2"],
          desc:"O paradoxo ético, as 7 fases, diagnóstico como valor, o momento do preço e o não-fechamento produtivo.",
          was:"Curso 1 · Módulo 11" },
        { id:"c1-m7", n:7, title:"Remarketing e Nutrição",
          file:"c1-m7-remarketing.html", status:"todo", vol:"med", min:55, secs:6, deps:["c3-m2"],
          desc:"O funil invisível, públicos por profundidade de intenção, fadiga e nutrição.",
          was:"Curso 1 · Módulo 12" },
        { id:"c1-m8", n:8, title:"Pós-venda, Retenção e Indicação",
          file:"c1-m8-posvenda.html", status:"todo", vol:"low", min:55, secs:6, deps:["c1-m6"],
          desc:"Onboarding, pontos de contato, engenharia do momento uau e o sistema de indicação.",
          was:"Curso 1 · Módulo 13" }
      ]
    },
    {
      id: "c2", n: 2,
      title: "Psicologia e Conteúdo",
      question: "Como atenção vira confiança",
      desc: "A camada cognitiva: como o cérebro decide, de quem estamos falando, e como isso vira Reel, gancho e roteiro.",
      modules: [
        { id:"c2-m1", n:1, title:"Como o Cérebro Decide Parar o Scroll",
          file:"c2-m1-scroll.html", status:"done", vol:"low", min:80, secs:12, deps:[],
          desc:"O gargalo atencional, atenção seletiva, carga cognitiva, Sistema 1 e 2, curiosidade, memória e o laboratório de retenção.",
          was:"Curso 2 · Módulo 1" },
        { id:"c2-m2", n:2, title:"Psicologia da Identificação",
          file:"c2-m2-identificacao.html", status:"done", vol:"low", min:85, secs:12, deps:["c2-m1"],
          desc:"Identificação ≠ empatia, o mundo interno, dor identitária, 9 medos, 7 frustrações, 12 objeções e a biblioteca de reescritas.",
          was:"Curso 2 · Módulo 2" },
        { id:"c2-m3", n:3, title:"Neurociência da Confiança",
          file:"c2-m3-confianca.html", status:"done", vol:"low", min:70, secs:11, deps:["c2-m2"],
          desc:"Confiança como aposta, competência × calor, os 5 riscos, prova social ética e resultado sem promessa.",
          was:"Curso 2 · Módulo 3" },
        { id:"c2-m4", n:4, title:"Engenharia dos Reels",
          file:"c2-m4-reels.html", status:"done", vol:"med", min:50, secs:7, deps:["c2-m1","c2-m3"],
          desc:"As 7 camadas, os primeiros 3 segundos, ritmo, pausas, legendas, trilha, CTA e os 8 formatos.",
          was:"Curso 2 · Módulo 4" },
        { id:"c2-m5", n:5, title:"Biblioteca de Ganchos",
          file:"c2-m5-ganchos.html", status:"done", vol:"low", min:55, secs:7, deps:["c2-m1","c2-m2","c2-m3"],
          desc:"20 estruturas × 3 exemplos = 60 aberturas, em 4 famílias, com quando falha e risco de política.",
          was:"Curso 2 · Módulo 5 — escopo do catálogo reduzido em 2026-07-18, ver CLAUDE.md" },
        { id:"c2-m6", n:6, title:"Engenharia dos Roteiros",
          file:"c2-m6-roteiros.html", status:"done", vol:"low", min:55, secs:7, deps:["c2-m2","c2-m3","c2-m4","c2-m5"],
          desc:"Contexto → Conflito → Explicação → Educação → Caminho → Convite. 10 roteiros completos.",
          was:"Curso 2 · Módulo 6 — escopo do catálogo reduzido em 2026-07-18, ver CLAUDE.md" },
        { id:"c2-m7", n:7, title:"Instagram 2026",
          file:"c2-m7-instagram.html", status:"done", vol:"high", min:50, secs:7, deps:["c2-m4","c2-m5","c2-m6"],
          desc:"Sistemas de ranqueamento (fonte: About Instagram/Meta Transparency Center), sinais declarados vs folclore. Calendário fica no C2.M8.",
          was:"Curso 2 · Módulo 7 — pesquisado via WebSearch em 2026-07-18 (vol:high, search-first), ver CLAUDE.md" },
        { id:"c2-m8", n:8, title:"Planejamento de Conteúdo",
          file:"c2-m8-planejamento.html", status:"done", vol:"low", min:50, secs:7, deps:["c2-m4","c2-m5","c2-m6","c2-m7"],
          desc:"3 pilares (Aquisição/Autoridade/Conversão), cadência de 3 Reels/semana, calendário de 90 dias e os 5 checklists de produção.",
          was:"Curso 2 · Módulo 8" },
        { id:"c2-m9", n:9, title:"Erros Fatais",
          file:"c2-m9-erros.html", status:"done", vol:"med", min:55, secs:11, deps:["c1-m1","c2-m3","c2-m4","c2-m5","c2-m6","c2-m7","c2-m8"],
          desc:"40 erros curados em 10 categorias (Estratégia a Escala), manual rápido de consulta — não os 100 do plano original.",
          was:"Curso 2 · Módulo 9 — escopo do catálogo curado em 2026-07-18, ver CLAUDE.md" }
      ]
    },
    {
      id: "c3", n: 3,
      title: "Engenharia e Dados",
      question: "Como o sistema é construído e medido",
      desc: "A stack técnica: coleta, transporte, medição, experimentação, performance, segurança e dashboard.",
      modules: [
        { id:"c3-m1", n:1, title:"Arquitetura Completa",
          file:"c3-m1-arquitetura.html", status:"todo", vol:"low", min:90, secs:12, deps:["c1-m1"],
          desc:"11 sistemas, 4 camadas, o caminho de um clique, os 7 pontos de perda e o contrato de dados.",
          was:"Curso 3 · Módulo 1" },
        { id:"c3-m2", n:2, title:"Pixel, Dataset e Conversions API",
          file:"c3-m2-pixel.html", status:"todo", vol:"high", min:120, secs:15, deps:["c3-m1"],
          desc:"Cookies, a era Dataset, deduplicação, Advanced Matching, CAPI, AEM, learning phase e a taxonomia dos 2 protocolos.",
          was:"Curso 3 · Módulo 2 (era Curso 1 · Módulo 7)" },
        { id:"c3-m3", n:3, title:"Google Tag Manager",
          file:"c3-m3-gtm.html", status:"todo", vol:"med", min:80, secs:12, deps:["c3-m2"],
          desc:"Data Layer, triggers, variables, organização em escala, debug e versionamento.",
          was:"Curso 3 · Módulo 3 (era Curso 1 · Módulo 7.2)" },
        { id:"c3-m4", n:4, title:"Google Analytics 4",
          file:"c3-m4-ga4.html", status:"todo", vol:"high", min:85, secs:12, deps:["c3-m3"],
          desc:"Modelo de eventos, sessão, UTM, funis, explorações, atribuição e por que nunca bate com a Meta.",
          was:"Curso 3 · Módulo 4" },
        { id:"c3-m5", n:5, title:"Microsoft Clarity",
          file:"c3-m5-clarity.html", status:"todo", vol:"med", min:65, secs:10, deps:["c3-m3"],
          desc:"Heatmaps, session replay, dead/rage click, quick back e o método 20 gravações → 5 hipóteses.",
          was:"Curso 3 · Módulo 5" },
        { id:"c3-m6", n:6, title:"Experimentação e Estatística Aplicada",
          file:"c3-m6-experimentacao.html", status:"todo", vol:"low", min:90, secs:11, deps:["c3-m4"],
          desc:"Hipóteses, amostragem, viés, significância, poder, tempo mínimo e correlação vs causalidade.",
          was:"Curso 4 · Módulo 4 — único sobrevivente do Curso 4" },
        { id:"c3-m7", n:7, title:"CRO",
          file:"c3-m7-cro.html", status:"todo", vol:"low", min:95, secs:13, deps:["c3-m5","c3-m6","c2-m2"],
          desc:"Hierarquia visual, contraste, tipografia, CTA, formulários, prova social e testes A/B com volume baixo.",
          was:"Curso 3 · Módulo 7 (era Curso 1 · Módulo 6)" },
        { id:"c3-m8", n:8, title:"Performance",
          file:"c3-m8-performance.html", status:"todo", vol:"med", min:80, secs:12, deps:["c3-m1"],
          desc:"LCP, INP e CLS, campo vs laboratório, imagens, fontes, vídeo, JavaScript e renderização.",
          was:"Curso 3 · Módulo 8 — trocado com SEO" },
        { id:"c3-m9", n:9, title:"SEO Técnico",
          file:"c3-m9-seo.html", status:"todo", vol:"high", min:75, secs:10, deps:["c3-m8"],
          desc:"Crawl, index, rank, schema, Open Graph, canonical, sitemap, SEO local e o dilema do noindex.",
          was:"Curso 3 · Módulo 9 — trocado com Performance" },
        { id:"c3-m10", n:10, title:"Segurança e LGPD",
          file:"c3-m10-seguranca.html", status:"todo", vol:"med", min:80, secs:11, deps:["c3-m3"],
          desc:"HTTPS, headers, CSP, XSS, dado de saúde como categoria sensível, consentimento e Consent Mode.",
          was:"Curso 3 · Módulo 9" },
        { id:"c3-m11", n:11, title:"Dashboard Executivo",
          file:"c3-m11-dashboard.html", status:"todo", vol:"low", min:100, secs:12, deps:["c3-m4","c3-m5","c1-m1"],
          desc:"As 3 camadas, saúde do Pixel, qualidade de tráfego, funil unificado, alertas e o dashboard construído.",
          was:"Curso 3 · Módulo 10 (era Curso 1 · Módulo 14)" },
        { id:"c3-m12", n:12, title:"Plano de Implementação",
          file:"c3-m12-plano.html", status:"todo", vol:"low", min:70, secs:10, deps:["c3-m11"],
          desc:"4 semanas por dependência, validação, deploy, rollback, versionamento e monitoramento.",
          was:"Curso 3 · Módulo 11" },
        { id:"c3-m13", n:13, title:"Engenharia de Excelência",
          file:"c3-m13-excelencia.html", status:"todo", vol:"low", min:80, secs:11, deps:["c3-m12"],
          desc:"Organização, nomenclatura, código limpo, SOLID, Git, CI/CD e checklists de revisão.",
          was:"Curso 3 · Módulo 12" }
      ]
    }
  ],

  /* ---------- CAPSTONE ---------- */
  capstone: {
    id:"sog", title:"SOG — Sistema Operacional de Crescimento",
    file:"sog.html", status:"todo", vol:"low", min:120, secs:10,
    question:"Como tudo opera junto",
    desc:"O framework proprietário que integra os 30 módulos: marketing, psicologia, Meta Ads, landing pages, Pixel, GA4, GTM, Clarity, WhatsApp, CRM, analytics, growth, CRO, experimentação, BI, escalabilidade e governança.",
    deps:["c1-m8","c2-m9","c3-m13"]
  },

  /* ---------- HISTÓRICO DE CONSOLIDAÇÃO (auditável) ---------- */
  absorptions: [
    { from:"Curso 1 · M3 — Psicologia da Paciente High Ticket", to:["c2-m2","c2-m3"], why:"colisão total" },
    { from:"Curso 1 · M5 — Instagram e Máquina de Conteúdo",    to:["c2-m4","c2-m5","c2-m6","c2-m7","c2-m8"], why:"colisão total" },
    { from:"Curso 1 · M9 — Criativos e Copy",                   to:["c2-m5","c2-m6"], why:"colisão total" },
    { from:"Curso 1 · M6 — Landing Page e CRO",                 to:["c3-m7"], why:"colisão total" },
    { from:"Curso 1 · M7 — Rastreamento: Pixel, CAPI e GTM",    to:["c3-m2","c3-m3"], why:"colisão total" },
    { from:"Curso 1 · M14 — Gestão, Métricas e Diagnóstico",    to:["c3-m11"], why:"colisão alta" },
    { from:"Curso 4 · M4 — Experimentação",                     to:["c3-m6"], why:"material genuinamente novo" },
    { from:"Curso 4 · SOG",                                     to:["sog"],   why:"é o capstone, não um módulo" }
  ],

  removed: [
    { what:"Curso 4 · M1 — Engenharia das Métricas",        where:"c1-m1 §1.7 — já entregue" },
    { what:"Curso 4 · M2 — KPIs do Negócio",                where:"c1-m1 §1.7 · c1-m3 · c3-m11" },
    { what:"Curso 4 · M3 — Funil Analítico",                where:"c1-m1 §1.4 e §1.5 — já entregue" },
    { what:"Curso 4 · M5 — Otimização de Campanhas",        where:"c1-m4" },
    { what:"Curso 4 · M6 — Análise da Landing Page",        where:"c3-m5 · c3-m7" },
    { what:"Curso 4 · M7 — Análise do WhatsApp",            where:"c1-m5" },
    { what:"Curso 4 · M8 — Dashboards Executivos",          where:"c3-m11" },
    { what:"Curso 4 · M9 — Otimização Contínua",            where:"c3-m11 · c3-m12" },
    { what:"Curso 4 · M10 — Plano de Escala",               where:"c1-m4" },
    { what:"Curso 4 · M11 — Dashboard Master",              where:"c3-m11 — colidia com o próprio M8" },
    { what:"Curso 4 · M12 — Checklist de Excelência",       where:"c3-m13" }
  ],

  /* ---------- API DERIVADA — não editar, é computada ---------- */
  all: function(){
    var out = [];
    this.courses.forEach(function(c){
      c.modules.forEach(function(m){ m.courseId = c.id; m.courseTitle = c.title; m.courseN = c.n; out.push(m); });
    });
    var cap = this.capstone;
    cap.courseId = "sog"; cap.courseTitle = "Capstone"; cap.courseN = 4; cap.n = 1;
    out.push(cap);
    return out;
  },
  find: function(id){ return this.all().filter(function(m){ return m.id === id; })[0] || null; },
  prev: function(id){ var a = this.all(), i = a.map(function(m){return m.id;}).indexOf(id); return i > 0 ? a[i-1] : null; },
  next: function(id){ var a = this.all(), i = a.map(function(m){return m.id;}).indexOf(id); return (i > -1 && i < a.length-1) ? a[i+1] : null; },
  course: function(id){ return this.courses.filter(function(c){ return c.id === id; })[0] || null; },
  total: function(){ return this.all().length; }
};

if (typeof module !== "undefined" && module.exports) module.exports = PLATFORM;
