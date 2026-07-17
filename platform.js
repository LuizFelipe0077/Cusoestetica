/* =====================================================================
   PLATFORM.JS — Motor único da Universidade Premium
   ---------------------------------------------------------------------
   Constrói TODO o chrome a partir do manifest.js. Nenhum módulo declara
   sidebar, breadcrumb, navegação, progresso, busca ou glossário.

   Um módulo precisa apenas de:
     <script src="manifest.js"></script>
     <script src="glossario.js"></script>
     <script src="platform.js"></script>
     ...conteúdo...
     <script>Platform.init({ id:"c1-m1" });</script>

   DEPENDÊNCIAS: manifest.js e glossario.js (nesta ordem). Zero libs.

   ÍNDICE
     1. Store        — persistência com fallback
     2. Util
     3. Chrome       — topbar, sidebar, scrim
     4. Progresso
     5. Breadcrumb + rodapé de navegação
     6. Busca global
     7. Glossário    — tooltips
     8. Comportamentos de conteúdo
     9. Atalhos de teclado
    10. API pública
   ===================================================================== */

var Platform = (function(){
  "use strict";

  var KEY  = (typeof PLATFORM !== "undefined") ? PLATFORM.storageKey : "up_progress_v1";
  var CUR  = null;   // módulo atual (objeto do manifest)
  var SECS = [];     // seções do módulo atual

  /* ============================================================
     1. STORE — localStorage com fallback elegante
     ------------------------------------------------------------
     Em file:// alguns navegadores (Safari, e Chrome com flags
     restritivas) bloqueiam localStorage porque a origem é "null".
     Nesse caso caímos para memória: o progresso funciona durante a
     sessão e é perdido ao fechar. O usuário é avisado, não enganado.
     ============================================================ */
  var Store = (function(){
    var mem = {}, ok = true, reason = "";
    try {
      var t = "__up_test__";
      window.localStorage.setItem(t, "1");
      window.localStorage.removeItem(t);
    } catch(e){
      ok = false;
      reason = (location.protocol === "file:")
        ? "O navegador bloqueia armazenamento em arquivos abertos direto do disco (protocolo file://)."
        : "O navegador bloqueou o armazenamento local.";
    }
    return {
      ok: ok,
      reason: reason,
      get: function(k){
        try { return ok ? window.localStorage.getItem(k) : (mem[k] || null); }
        catch(e){ return mem[k] || null; }
      },
      set: function(k, v){
        try { if (ok) window.localStorage.setItem(k, v); else mem[k] = v; }
        catch(e){ ok = false; mem[k] = v; }
      },
      del: function(k){
        try { if (ok) window.localStorage.removeItem(k); else delete mem[k]; }
        catch(e){ delete mem[k]; }
      }
    };
  })();

  /* ------------------------------------------------------------
     ENVELOPE DE DADOS v2
     Formato único, versionado e serializável. A exportação (requisito 6)
     é literalmente JSON.stringify(read()) — a arquitetura já está pronta,
     falta só o botão.

     {
       v: 2,
       updated: ISO-8601,
       prefs:     { theme },
       progress:  { "c1-m1": { done[], checks[], finals[], notes{} } },
       favorites: { modules[], terms[] },
       history:   { modules[{id,at}], searches[{q,at}] }
     }
     ------------------------------------------------------------ */
  var SCHEMA = 2;

  function blank(){
    return { v:SCHEMA, updated:null, prefs:{ theme:null },
             progress:{}, favorites:{ modules:[], terms:[] },
             history:{ modules:[], searches:[] } };
  }

  function migrate(d){
    /* v1 era um mapa plano id → {done,checks,finals,notes}. Sem chave "v". */
    if (d && d.v === SCHEMA) return d;
    var out = blank();
    if (d && typeof d === "object" && !d.v){
      Object.keys(d).forEach(function(k){
        if (d[k] && (d[k].done || d[k].checks)) out.progress[k] = d[k];
      });
      console.info("[Platform] progresso migrado do schema v1 → v" + SCHEMA);
    }
    return out;
  }

  function read(){
    var raw;
    try { raw = JSON.parse(Store.get(KEY)); } catch(e){ raw = null; }
    var d = migrate(raw);
    if (!d.progress)  d.progress  = {};
    if (!d.favorites) d.favorites = { modules:[], terms:[] };
    if (!d.history)   d.history   = { modules:[], searches:[] };
    if (!d.prefs)     d.prefs     = { theme:null };
    return d;
  }
  function write(d){ d.v = SCHEMA; d.updated = new Date().toISOString(); Store.set(KEY, JSON.stringify(d)); }

  function slot(d, id){
    if (!d.progress[id]) d.progress[id] = {};
    var n = d.progress[id];
    if (!n.checks) n.checks = [];
    if (!n.done)   n.done   = [];
    if (!n.finals) n.finals = [];
    if (!n.notes)  n.notes  = {};
    return n;
  }
  function commit(id, fn){ var d = read(); fn(slot(d, id)); write(d); }
  function state(id){ var d = read(); return slot(d, id); }

  /* ---------- Favoritos ---------- */
  function isFav(kind, id){ return read().favorites[kind].indexOf(id) > -1; }
  function toggleFav(kind, id){
    var d = read(), l = d.favorites[kind], i = l.indexOf(id);
    if (i === -1) l.push(id); else l.splice(i, 1);
    write(d);
    return i === -1;
  }

  /* ---------- Histórico ---------- */
  function pushHistory(kind, entry){
    var d = read(), l = d.history[kind];
    var key = kind === "modules" ? "id" : "q";
    for (var i = l.length - 1; i >= 0; i--) if (l[i][key] === entry[key]) l.splice(i, 1);
    entry.at = new Date().toISOString();
    l.unshift(entry);
    d.history[kind] = l.slice(0, 40);
    write(d);
  }

  /* ---------- Tema ---------- */
  function getTheme(){ return document.documentElement.getAttribute("data-theme") || "dark"; }
  function setTheme(t){
    var html = document.documentElement;
    html.classList.add("theme-anim");
    html.setAttribute("data-theme", t);
    var d = read(); d.prefs.theme = t; write(d);
    setTimeout(function(){ html.classList.remove("theme-anim"); }, 300);
  }
  /* Se o usuário nunca escolheu, seguir o sistema em tempo real */
  if (window.matchMedia){
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onChange = function(e){
      if (!read().prefs.theme) document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ============================================================
     2. UTIL
     ============================================================ */
  function el(tag, attrs, html){
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs){
      if (k === "class") e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function norm(s){ return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
  var ICON = {
    search:'<path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"/>',
    book:  '<path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
    grid:  '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    left:  '<path d="M19 12H5m7-7l-7 7 7 7"/>',
    right: '<path d="M5 12h14m-7-7l7 7-7 7"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    burger:'<path d="M3 6h18M3 12h18M3 18h18"/>',
    chev:  '<path d="M6 9l6 6 6-6"/>',
    sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:  '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    star:  '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chart: '<path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>' 
  };
  function svg(path, cls){
    return '<svg class="'+(cls||"")+'" viewBox="0 0 24 24" fill="none" stroke-width="1.5" aria-hidden="true">'+path+'</svg>';
  }

  /* ============================================================
     3. CHROME — topbar, sidebar, scrim
     ============================================================ */
  function buildChrome(){
    var isPortal = !CUR;

    document.body.insertBefore(
      el("a", { href:"#conteudo", class:"skip-link" }, "Pular para o conteúdo"),
      document.body.firstChild);

    var rail = el("div", { class:"progress-rail", "aria-hidden":"true" },
      '<div class="progress-fill" id="upScrollFill"></div>');
    document.body.insertBefore(rail, document.body.firstChild.nextSibling);

    /* --- Topbar --- */
    var tb = el("header", { class:"topbar" });
    tb.innerHTML =
      '<button class="tb-burger" id="upBurger" aria-label="Abrir navegação" aria-expanded="false">'+svg(ICON.burger)+'</button>'+
      '<a class="tb-brand" href="index.html"><b>'+esc(PLATFORM.name)+'</b><span>v'+PLATFORM.version+'</span></a>'+
      '<nav class="tb-crumb" id="upCrumb" aria-label="Trilha de navegação"></nav>'+
      '<div class="tb-actions">'+
        (CUR ? '<button class="tb-btn" id="upFavBtn" aria-label="Favoritar este módulo" aria-pressed="false">'+svg(ICON.star)+'</button>' : '')+
        '<button class="tb-btn tb-theme" id="upThemeBtn" aria-label="Alternar tema claro e escuro">'+
          svg(ICON.sun,"ic-sun")+svg(ICON.moon,"ic-moon")+'<kbd>T</kbd></button>'+
        '<button class="tb-btn" id="upSearchBtn" aria-label="Buscar na plataforma">'+svg(ICON.search)+'<span>Buscar</span><kbd>/</kbd></button>'+
        '<a class="tb-btn" href="glossario.html" aria-label="Abrir glossário">'+svg(ICON.book)+'<span>Glossário</span><kbd>G</kbd></a>'+
        '<a class="tb-btn" href="index.html" aria-label="Voltar ao índice">'+svg(ICON.grid)+'<span>Índice</span><kbd>I</kbd></a>'+
      '</div>';
    document.body.insertBefore(tb, document.body.firstChild.nextSibling.nextSibling);

    /* --- Sidebar --- */
    var sb = el("aside", { class:"sidebar", id:"upSidebar" });
    sb.appendChild(el("div", { class:"sb-prog" },
      '<div class="sb-prog-top"><span class="sb-prog-lab">'+(isPortal?"Plataforma":"Este módulo")+'</span>'+
      '<span class="sb-prog-pct" id="upPct">0%</span></div>'+
      '<div class="sb-bar"><div class="sb-bar-fill" id="upPctFill"></div></div>'+
      '<div class="sb-prog-sub" id="upPctSub"></div>'));

    var tree = el("nav", { class:"sb-tree", id:"upTree", "aria-label":"Índice da plataforma" });
    PLATFORM.courses.forEach(function(c){ tree.appendChild(courseBlock(c)); });
    tree.appendChild(capstoneBlock());
    sb.appendChild(tree);

    sb.appendChild(el("nav", { class:"sb-pages", "aria-label":"Páginas pessoais" },
      '<a href="painel.html">'+svg(ICON.chart)+'Painel<kbd>P</kbd></a>'+
      '<a href="favoritos.html">'+svg(ICON.star)+'Favoritos<kbd>F</kbd></a>'+
      '<a href="historico.html">'+svg(ICON.clock)+'Histórico<kbd>H</kbd></a>'));
    sb.appendChild(el("div", { class:"sb-foot" },
      '<span>'+PLATFORM.total()+' módulos · v'+PLATFORM.version+'</span>'+
      '<button id="upReset">Limpar progresso</button>'));
    document.body.appendChild(sb);

    document.body.appendChild(el("div", { class:"scrim", id:"upScrim" }));

    /* --- Aviso de storage --- */
    if (!Store.ok){
      var w = el("div", { class:"storage-warn show", role:"status" },
        "<b>Progresso não será salvo.</b> "+Store.reason+
        " Ele funciona nesta sessão e some ao fechar a aba. Para salvar de verdade, sirva a pasta por HTTP — "+
        "por exemplo: <code>python3 -m http.server</code> dentro da pasta, e abra <code>http://localhost:8000</code>.");
      var m = document.querySelector(".main");
      if (m) m.insertBefore(w, m.firstChild);
    }
  }

  function courseBlock(c){
    var wrap = el("div", { class:"sb-course" });
    var open = !CUR || CUR.courseId === c.id;
    var doneN = c.modules.filter(function(m){ return isDone(m.id); }).length;

    var btn = el("button", { class:"sb-course-btn", "aria-expanded": open ? "true" : "false" },
      '<span class="sb-course-dot" style="background:var(--'+c.id+')"></span>'+
      '<span>'+esc(c.title)+'</span>'+
      '<span class="sb-course-count">'+doneN+'/'+c.modules.length+'</span>'+
      svg(ICON.chev, "sb-course-chev"));
    wrap.appendChild(btn);

    var mods = el("div", { class:"sb-mods" });
    c.modules.forEach(function(m){ mods.appendChild(modLink(m, c)); });
    wrap.appendChild(mods);

    btn.addEventListener("click", function(){
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
      mods.style.maxHeight = isOpen ? "0px" : mods.scrollHeight + "px";
    });
    requestAnimationFrame(function(){ mods.style.maxHeight = open ? mods.scrollHeight + "px" : "0px"; });
    return wrap;
  }

  function capstoneBlock(){
    var cap = PLATFORM.capstone;
    var wrap = el("div", { class:"sb-course" });
    wrap.appendChild(el("button", { class:"sb-course-btn", "aria-expanded":"true", disabled:"" },
      '<span class="sb-course-dot" style="background:var(--sog)"></span><span>Capstone</span>'+
      '<span class="sb-course-count">'+(isDone(cap.id)?1:0)+'/1</span>'));
    var mods = el("div", { class:"sb-mods" });
    mods.appendChild(modLink(cap, { id:"sog", title:"Capstone" }));
    wrap.appendChild(mods);
    requestAnimationFrame(function(){ mods.style.maxHeight = mods.scrollHeight + "px"; });
    return wrap;
  }

  function modLink(m, c){
    var cur  = CUR && CUR.id === m.id;
    var done = isDone(m.id);
    var st   = done ? "done" : m.status;
    var mark = done ? "✓" : (m.status === "partial" ? "◐" : (m.status === "done" ? "○" : "·"));
    var vol  = (m.vol === "high" || m.vol === "med") ? '<span class="sb-vol '+m.vol+'" title="volatilidade '+m.vol+'"></span>' : "";

    var a = el("a", {
      class:"sb-mod " + (cur ? "active " : "") + (m.status === "todo" ? "todo" : ""),
      href: m.status === "todo" ? "#" : m.file,
      title: m.status === "todo" ? "Ainda não construído" : m.title
    },
      '<span class="sb-mod-n">'+(c.id === "sog" ? "★" : m.n)+'</span>'+
      '<span class="sb-mod-t">'+esc(m.title)+vol+'</span>'+
      '<span class="sb-mod-st '+st+'">'+mark+'</span>');

    if (m.status === "todo") a.addEventListener("click", function(e){ e.preventDefault(); });

    /* Índice de seções do módulo atual, injetado abaixo do link ativo */
    if (cur && SECS.length){
      var box = el("div", { class:"sb-secs" });
      SECS.forEach(function(s){
        box.appendChild(el("a", { class:"sb-sec", href:"#"+s.id, "data-sec":s.id }, esc(s.n + " · " + s.title)));
      });
      var frag = document.createDocumentFragment();
      frag.appendChild(a); frag.appendChild(box);
      return frag;
    }
    return a;
  }

  /* ============================================================
     4. PROGRESSO
     ============================================================ */
  function isDone(id){
    var m = PLATFORM.find(id);
    if (!m) return false;
    var st = state(id);
    return m.secs > 0 && st.done.length >= m.secs;
  }
  function paintProgress(){
    var pct, sub;
    if (CUR){
      var st = state(CUR.id), total = CUR.secs || SECS.length || 1;
      pct = Math.round((st.done.length / total) * 100);
      sub = st.done.length + " de " + total + " seções";
    } else {
      var all = PLATFORM.all(), d = all.filter(function(m){ return isDone(m.id); }).length;
      pct = Math.round((d / all.length) * 100);
      sub = d + " de " + all.length + " módulos";
    }
    var f = document.getElementById("upPctFill"), p = document.getElementById("upPct"), s = document.getElementById("upPctSub");
    if (f) f.style.width = pct + "%";
    if (p) p.textContent = pct + "%";
    if (s) s.textContent = sub;
  }

  /* ============================================================
     5. BREADCRUMB + RODAPÉ DE NAVEGAÇÃO
     ============================================================ */
  function buildCrumb(){
    var c = document.getElementById("upCrumb");
    if (!c) return;
    if (!CUR){ c.innerHTML = '<span class="now">Índice da plataforma</span>'; return; }
    c.innerHTML =
      '<a href="index.html">Índice</a><span class="sep">/</span>'+
      '<span>Curso '+CUR.courseN+' · '+esc(CUR.courseTitle)+'</span><span class="sep">/</span>'+
      '<span class="now" id="upCrumbNow">'+esc(CUR.title)+'</span>';
  }
  function updateCrumbSection(label){
    var n = document.getElementById("upCrumbNow");
    if (n && label) n.textContent = CUR.title + " · " + label;
  }

  function buildFooter(){
    if (!CUR) return;
    var host = document.getElementById("upModFoot");
    if (!host) return;

    var p = PLATFORM.prev(CUR.id), n = PLATFORM.next(CUR.id);
    function card(m, dir){
      if (!m) return '<div class="mf-card disabled"><span class="mf-dir">'+
        svg(dir === "prev" ? ICON.left : ICON.right)+(dir === "prev" ? "Anterior" : "Próximo")+
        '</span><span class="mf-t">—</span></div>';
      var cls = "mf-card " + (dir === "next" ? "next" : "") + (m.status === "todo" ? " disabled" : "");
      return '<a class="'+cls+'" href="'+(m.status === "todo" ? "#" : m.file)+'">'+
        '<span class="mf-dir">'+svg(dir === "prev" ? ICON.left : ICON.right)+(dir === "prev" ? "Anterior" : "Próximo")+'</span>'+
        '<span class="mf-t">'+esc(m.title)+'</span>'+
        '<span class="mf-c">Curso '+m.courseN+' · Módulo '+m.n+(m.status === "todo" ? " · em construção" : "")+'</span></a>';
    }
    host.innerHTML =
      '<div class="modfoot-nav">'+card(p,"prev")+card(n,"next")+'</div>'+
      '<div class="modfoot-tools">'+
        '<a class="btn ghost" href="index.html">'+svg(ICON.grid)+'Voltar ao índice</a>'+
        '<a class="btn ghost" href="glossario.html">'+svg(ICON.book)+'Glossário</a>'+
      '</div>'+
      '<p class="modfoot-note" id="upFootNote"></p>';
    paintFootNote();
  }
  function paintFootNote(){
    var e = document.getElementById("upFootNote");
    if (!e || !CUR) return;
    var st = state(CUR.id), total = CUR.secs || SECS.length || 1, left = total - st.done.length;
    if (left <= 0){
      e.textContent = "Módulo concluído. " + (PLATFORM.next(CUR.id) ? "Siga para o próximo." : "Você chegou ao fim da trilha.");
      e.style.color = "var(--ok)";
    } else {
      e.textContent = "Faltam " + left + " de " + total + " seções para concluir este módulo.";
      e.style.color = "";
    }
  }

  /* ============================================================
     6. BUSCA GLOBAL
     ============================================================ */
  var IDX = [], selIdx = 0;

  var TIPO = { modulo:"Módulos", secao:"Seções", subtitulo:"Subtítulos", figura:"Figuras",
               tabela:"Tabelas", checklist:"Checklists", callout:"Destaques", termo:"Glossário" };

  function buildIndex(){
    IDX = [];

    /* 1. Módulos (do manifest) */
    PLATFORM.all().forEach(function(m){
      IDX.push({ t:"modulo", n:(m.courseId === "sog" ? "★" : "C"+m.courseN+".M"+m.n),
        label:m.title, sub:m.desc || "", href:m.status === "todo" ? null : m.file,
        x:m.status === "todo" ? "em construção" : m.min + " min" });
    });

    /* 2. Conteúdo de TODOS os módulos (índice pré-construído — fetch não roda em file://) */
    if (typeof SEARCHINDEX !== "undefined"){
      SEARCHINDEX.items.forEach(function(it){
        var m = PLATFORM.find(it.m);
        if (!m) return;
        var aqui = CUR && CUR.id === it.m;
        IDX.push({ t:it.t, n:it.n || "", label:it.label, sub:it.sub || "",
          href:(aqui ? "" : m.file) + (it.a ? "#" + it.a : ""),
          x:aqui ? "nesta página" : "C" + m.courseN + ".M" + m.n });
      });
    }

    /* 3. Glossário */
    if (typeof GLOSSARIO !== "undefined") for (var k in GLOSSARIO){
      IDX.push({ t:"termo", n:k, label:GLOSSARIO[k].nome, sub:GLOSSARIO[k].simples,
        href:"glossario.html#" + encodeURIComponent(k.toLowerCase()),
        x:GLOSSARIO[k].obsoleto ? "obsoleto" : "termo" });
    }
  }

  /* Destaca o trecho encontrado, preservando os acentos do original */
  function hl(texto, q){
    if (!q) return esc(texto);
    var nt = norm(texto), nq = norm(q), i = nt.indexOf(nq);
    if (i === -1) return esc(texto);
    return esc(texto.slice(0, i)) + "<mark>" + esc(texto.slice(i, i + q.length)) +
           "</mark>" + esc(texto.slice(i + q.length));
  }

  /* Recorta a vizinhança do termo em textos longos */
  function trecho(texto, q, raio){
    raio = raio || 46;
    var nt = norm(texto), nq = norm(q), i = nt.indexOf(nq);
    if (i === -1) return texto.length > raio*2 ? texto.slice(0, raio*2) + "…" : texto;
    var a = Math.max(0, i - raio), b = Math.min(texto.length, i + q.length + raio);
    return (a > 0 ? "…" : "") + texto.slice(a, b) + (b < texto.length ? "…" : "");
  }

  function buildSearch(){
    var ov = el("div", { class:"search-ov", id:"upSearchOv", role:"dialog", "aria-modal":"true", "aria-label":"Buscar" });
    ov.innerHTML =
      '<div class="search-box">'+
        '<input class="search-in" id="upSearchIn" type="search" autocomplete="off" spellcheck="false" '+
          'placeholder="Buscar módulos, seções, figuras, tabelas, checklists e termos…" aria-label="Buscar">'+
        '<div class="search-res" id="upSearchRes"></div>'+
        '<div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>'+
          '<span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> fechar</span>'+
          '<span id="upSearchN" style="margin-left:auto"></span></div>'+
      '</div>';
    document.body.appendChild(ov);

    var input = document.getElementById("upSearchIn");
    var res   = document.getElementById("upSearchRes");
    var cnt   = document.getElementById("upSearchN");

    function render(q){
      var nq = norm(q).trim();
      var hits;
      if (!nq){
        hits = IDX.filter(function(i){ return i.t === "modulo"; }).slice(0, 10);
      } else {
        hits = IDX.map(function(i){
          var s = -1;
          if (norm(i.n).indexOf(nq) === 0)          s = 0;   // sigla exata primeiro
          else if (norm(i.label).indexOf(nq) === 0) s = 1;
          else if (norm(i.label).indexOf(nq) > -1)  s = 2;
          else if (norm(i.n).indexOf(nq) > -1)      s = 3;
          else if (norm(i.sub).indexOf(nq) > -1)    s = 4;
          return s === -1 ? null : { i:i, s:s };
        }).filter(Boolean)
          .sort(function(a,b){ return a.s - b.s; })
          .slice(0, 50)
          .map(function(x){ return x.i; });
      }

      cnt.textContent = nq ? hits.length + (hits.length === 50 ? "+" : "") + " resultados" : "";
      if (!hits.length){ res.innerHTML = '<div class="search-empty">Nada encontrado para “'+esc(q)+'”.</div>'; res._hits = []; return; }

      /* Agrupa mantendo a ordem de relevância dentro de cada grupo */
      var ordem = ["modulo","secao","subtitulo","termo","figura","tabela","checklist","callout"];
      var por = {}; hits.forEach(function(h){ (por[h.t] = por[h.t] || []).push(h); });
      var flat = [], html = "";
      ordem.forEach(function(t){
        if (!por[t]) return;
        html += '<div class="search-group">'+TIPO[t]+'</div>';
        por[t].forEach(function(h){
          var k = flat.length; flat.push(h);
          var sub = h.sub && nq && norm(h.sub).indexOf(nq) > -1
            ? '<span class="si-sub">'+hl(trecho(h.sub, q), q)+'</span>' : '';
          html += '<a class="search-item'+(k === selIdx ? " sel" : "")+'" data-i="'+k+'" href="'+(h.href||"#")+'">'+
            '<span class="si-n">'+hl(h.n, q)+'</span>'+
            '<span class="si-l">'+hl(h.label, q)+sub+'</span>'+
            '<span class="si-x">'+esc(h.x)+'</span></a>';
        });
      });
      res.innerHTML = html;
      res._hits = flat;
      var sel = res.querySelector(".search-item.sel");
      if (sel) sel.scrollIntoView({ block:"nearest" });
    }

    input.addEventListener("input", function(){ selIdx = 0; render(input.value); });
    input.addEventListener("keydown", function(e){
      var hits = res._hits || [];
      if (e.key === "ArrowDown"){ e.preventDefault(); selIdx = Math.min(selIdx+1, hits.length-1); render(input.value); }
      else if (e.key === "ArrowUp"){ e.preventDefault(); selIdx = Math.max(selIdx-1, 0); render(input.value); }
      else if (e.key === "Enter"){
        e.preventDefault();
        var h = hits[selIdx];
        if (h && h.href){
          if (input.value.trim()) pushHistory("searches", { q:input.value.trim() });
          closeSearch();
          if (h.href.charAt(0) === "#"){ location.hash = h.href; }
          else location.href = h.href;
        }
      }
    });
    ov.addEventListener("click", function(e){ if (e.target === ov) closeSearch(); });
    res.addEventListener("click", function(e){
      if (e.target.closest(".search-item") && input.value.trim()) pushHistory("searches", { q:input.value.trim() });
    });
    render("");
  }

  function openSearch(){
    var ov = document.getElementById("upSearchOv");
    ov.classList.add("show");
    var i = document.getElementById("upSearchIn");
    i.value = ""; selIdx = 0; i.focus();
    i.dispatchEvent(new Event("input"));
  }
  function closeSearch(){ document.getElementById("upSearchOv").classList.remove("show"); }

  /* ============================================================
     7. GLOSSÁRIO — tooltips
     ============================================================ */
  function buildGlossary(){
    if (typeof GLOSSARIO === "undefined") return;
    var tip = el("div", { class:"gtip", id:"upTip", role:"tooltip" });
    document.body.appendChild(tip);
    var timer = null;

    function show(a){
      var k = a.getAttribute("data-t"), g = GLOSSARIO[k];
      if (!g) return;
      tip.innerHTML =
        (g.obsoleto ? '<span class="gtip-obs">⚠ obsoleto</span><br>' : "")+
        '<div class="gtip-t">'+esc(k)+'</div>'+
        '<div class="gtip-n">'+esc(g.nome)+'</div>'+
        '<p class="gtip-d">'+esc(g.simples)+'</p>'+
        '<a class="gtip-l" href="glossario.html#'+encodeURIComponent(k.toLowerCase())+'">Definição completa →</a>';
      tip.classList.add("show");
      var r = a.getBoundingClientRect(), tr = tip.getBoundingClientRect();
      var left = Math.min(Math.max(8, r.left + window.scrollX), window.innerWidth - tr.width - 8);
      var top  = r.top + window.scrollY - tr.height - 8;
      if (top < window.scrollY + 8) top = r.bottom + window.scrollY + 8;
      tip.style.left = left + "px"; tip.style.top = top + "px";
    }
    function hide(){ tip.classList.remove("show"); }

    document.addEventListener("mouseover", function(e){
      var a = e.target.closest ? e.target.closest("abbr[data-t]") : null;
      if (!a) return;
      clearTimeout(timer);
      timer = setTimeout(function(){ show(a); }, 120);
    });
    document.addEventListener("mouseout", function(e){
      var a = e.target.closest ? e.target.closest("abbr[data-t]") : null;
      if (!a) return;
      clearTimeout(timer);
      timer = setTimeout(function(){ if (!tip.matches(":hover")) hide(); }, 200);
    });
    document.addEventListener("focusin", function(e){
      if (e.target.matches && e.target.matches("abbr[data-t]")) show(e.target);
    });
    document.addEventListener("focusout", hide);
    tip.addEventListener("mouseleave", hide);

    /* Acessibilidade: torna cada abbr focável e anuncia o termo */
    document.querySelectorAll("abbr[data-t]").forEach(function(a){
      var k = a.getAttribute("data-t"), g = GLOSSARIO[k];
      if (!g) return;
      a.setAttribute("tabindex", "0");
      a.setAttribute("title", g.nome);
    });
  }

  /* ============================================================
     8. COMPORTAMENTOS DE CONTEÚDO
     ============================================================ */

  /* Referências a outros módulos.
     Uso no conteúdo: <a class="modref" data-mod="c3-m2">C3.M2 — Pixel</a>
     Sem href. O shell resolve: vira link se o módulo existir, vira texto
     inerte se ainda não foi construído. Impossível gerar link quebrado. */
  function wireModRefs(){
    document.querySelectorAll(".modref[data-mod]").forEach(function(a){
      var m = PLATFORM.find(a.getAttribute("data-mod"));
      if (!m){
        a.removeAttribute("href");
        a.title = "Referência inválida: " + a.getAttribute("data-mod");
        a.style.color = "var(--err)";
        console.warn("[Platform] modref inválido: " + a.getAttribute("data-mod"));
        return;
      }
      if (m.status === "todo"){
        a.removeAttribute("href");
        a.style.cssText = "color:var(--text-3);border-bottom:1px dotted var(--line);cursor:help";
        a.title = m.title + " — ainda não construído";
        if (!/em construção/.test(a.textContent)) a.insertAdjacentHTML("beforeend",
          ' <span style="font-family:var(--mono);font-size:.6em;opacity:.7">(em construção)</span>');
      } else {
        a.setAttribute("href", m.file);
        a.title = m.title;
      }
    });
  }
  function wireAccordions(){
    document.querySelectorAll("[data-acc]").forEach(function(acc){
      acc.addEventListener("click", function(e){
        var btn = e.target.closest(".acc-btn");
        if (!btn || !acc.contains(btn)) return;
        var panel = btn.nextElementSibling;
        var open  = btn.getAttribute("aria-expanded") === "true";
        acc.querySelectorAll(".acc-btn").forEach(function(b){
          if (b !== btn){ b.setAttribute("aria-expanded","false"); b.nextElementSibling.style.maxHeight = null; }
        });
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
      });
    });
    window.addEventListener("resize", function(){
      document.querySelectorAll('.acc-btn[aria-expanded="true"]').forEach(function(b){
        b.nextElementSibling.style.maxHeight = b.nextElementSibling.scrollHeight + "px";
      });
    });
  }

  function wireChecks(){
    if (!CUR) return;
    [["#upCheckBody","data-ck","checks","#upCheckCount"],
     ["#upDoneBody","data-dk","finals","#upDoneCount"]].forEach(function(cfg){
      var box = document.querySelector(cfg[0]);
      if (!box) return;
      var counter = document.querySelector(cfg[3]);
      var boxes = box.querySelectorAll("input[type=checkbox]");
      var saved = state(CUR.id)[cfg[2]] || [];
      var total = boxes.length;

      function count(){
        var n = box.querySelectorAll("input:checked").length;
        if (counter){ counter.textContent = n + " / " + total;
          counter.style.color = (n === total) ? "var(--ok)" : "var(--text-3)"; }
      }
      boxes.forEach(function(b){
        var id = b.getAttribute(cfg[1]);
        if (saved.indexOf(id) > -1) b.checked = true;
        b.addEventListener("change", function(){
          commit(CUR.id, function(m){
            var l = m[cfg[2]], i = l.indexOf(id);
            if (b.checked && i === -1) l.push(id);
            if (!b.checked && i > -1) l.splice(i,1);
          });
          count();
        });
      });
      count();
    });
  }

  function wireNotes(){
    if (!CUR) return;
    document.querySelectorAll("[data-ex]").forEach(function(ta){
      var id = ta.getAttribute("data-ex");
      var badge = ta.parentElement.querySelector(".ex-saved");
      var n = state(CUR.id).notes || {};
      if (n[id]) ta.value = n[id];
      var t = null;
      ta.addEventListener("input", function(){
        clearTimeout(t);
        t = setTimeout(function(){
          commit(CUR.id, function(m){ m.notes[id] = ta.value; });
          if (badge){ badge.classList.add("show"); setTimeout(function(){ badge.classList.remove("show"); }, 1400); }
        }, 600);
      });
    });
  }

  function wireDone(){
    if (!CUR) return;
    var btns = Array.prototype.slice.call(document.querySelectorAll("[data-done]"));
    function paint(){
      var d = state(CUR.id).done;
      btns.forEach(function(b){
        var on = d.indexOf(b.getAttribute("data-done")) > -1;
        b.classList.toggle("is-done", on);
        var lbl = b.querySelector(".done-lbl");
        if (lbl) lbl.textContent = on ? "Seção concluída" : "Marcar seção como concluída";
      });
      document.querySelectorAll(".sb-sec").forEach(function(a){
        a.style.color = d.indexOf(a.getAttribute("data-sec")) > -1 ? "var(--ok)" : "";
      });
      paintProgress(); paintFootNote();
    }
    btns.forEach(function(b){
      b.addEventListener("click", function(){
        var id = b.getAttribute("data-done");
        commit(CUR.id, function(m){
          var i = m.done.indexOf(id);
          if (i === -1) m.done.push(id); else m.done.splice(i,1);
        });
        paint();
      });
    });
    paint();
  }

  function wireReveal(){
    var r = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)){ r.forEach(function(e){ e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function(en){
      en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold:.06, rootMargin:"0px 0px -40px 0px" });
    r.forEach(function(e){ io.observe(e); });
  }

  function wireScroll(){
    var fill = document.getElementById("upScrollFill");
    var secs = SECS.map(function(s){ return document.getElementById(s.id); });
    var links = Array.prototype.slice.call(document.querySelectorAll(".sb-sec"));
    var tick = false;

    function run(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (fill) fill.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      if (!secs.length) return;
      var y = window.scrollY + 140, i = 0;
      for (var k = 0; k < secs.length; k++) if (secs[k] && secs[k].offsetTop <= y) i = k;
      links.forEach(function(a, j){ a.classList.toggle("active", j === i); });
      if (SECS[i]) updateCrumbSection(SECS[i].n);
    }
    window.addEventListener("scroll", function(){
      if (tick) return; tick = true;
      requestAnimationFrame(function(){ run(); tick = false; });
    }, { passive:true });
    run();
  }

  function wireSidebar(){
    var sb = document.getElementById("upSidebar"), sc = document.getElementById("upScrim"),
        bg = document.getElementById("upBurger");
    function close(){ sb.classList.remove("open"); sc.classList.remove("show"); bg.setAttribute("aria-expanded","false"); }
    bg.addEventListener("click", function(){
      var o = sb.classList.toggle("open");
      sc.classList.toggle("show", o);
      bg.setAttribute("aria-expanded", o ? "true" : "false");
    });
    sc.addEventListener("click", close);
    sb.addEventListener("click", function(e){ if (e.target.closest(".sb-mod, .sb-sec")) close(); });

    document.getElementById("upReset").addEventListener("click", function(){
      var scope = CUR ? "deste módulo" : "de TODA a plataforma";
      if (!confirm("Limpar o progresso " + scope + "? Checklists, exercícios e seções concluídas serão apagados.")) return;
      if (CUR){ var d = load(); delete d[CUR.id]; save(d); } else { Store.del(KEY); }
      location.reload();
    });
    document.getElementById("upSearchBtn").addEventListener("click", openSearch);

    var tb = document.getElementById("upThemeBtn");
    if (tb) tb.addEventListener("click", function(){ setTheme(getTheme() === "dark" ? "light" : "dark"); });

    var fb = document.getElementById("upFavBtn");
    if (fb && CUR){
      var paintFav = function(){
        var on = isFav("modules", CUR.id);
        fb.setAttribute("aria-pressed", on ? "true" : "false");
        fb.style.color = on ? "var(--gold)" : "";
        fb.style.borderColor = on ? "var(--gold-line)" : "";
        fb.title = on ? "Remover dos favoritos" : "Favoritar este módulo";
      };
      fb.addEventListener("click", function(){ toggleFav("modules", CUR.id); paintFav(); });
      paintFav();
    }
  }

  /* ============================================================
     9. ATALHOS DE TECLADO
     ============================================================ */
  function wireKeys(){
    document.addEventListener("keydown", function(e){
      var ov = document.getElementById("upSearchOv");
      var open = ov && ov.classList.contains("show");
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);

      if (e.key === "Escape"){
        if (open){ closeSearch(); return; }
        var sb = document.getElementById("upSidebar");
        if (sb.classList.contains("open")) document.getElementById("upScrim").click();
        return;
      }
      if (open) return;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)){ e.preventDefault(); openSearch(); return; }
      if (typing) return;

      if (e.key === "/"){ e.preventDefault(); openSearch(); }
      else if (e.key === "g" || e.key === "G"){ location.href = "glossario.html"; }
      else if (e.key === "i" || e.key === "I"){ location.href = "index.html"; }
      else if (e.key === "m" || e.key === "M"){ location.href = "mapa.html"; }
      else if (e.key === "t" || e.key === "T"){ setTheme(getTheme() === "dark" ? "light" : "dark"); }
      else if (e.key === "f" || e.key === "F"){ location.href = "favoritos.html"; }
      else if (e.key === "h" || e.key === "H"){ location.href = "historico.html"; }
      else if (e.key === "p" || e.key === "P"){ location.href = "painel.html"; }
      else if (CUR && e.key === "ArrowLeft" && e.altKey){
        var p = PLATFORM.prev(CUR.id); if (p && p.status !== "todo") location.href = p.file;
      }
      else if (CUR && e.key === "ArrowRight" && e.altKey){
        var n = PLATFORM.next(CUR.id); if (n && n.status !== "todo") location.href = n.file;
      }
    });
  }

  /* ============================================================
     10. API PÚBLICA
     ============================================================ */
  function collectSections(){
    var out = [];
    document.querySelectorAll("section.sec[id]").forEach(function(s){
      var tag = s.querySelector(".sec-tag span:first-child");
      var h2  = s.querySelector("h2");
      out.push({ id:s.id, n: tag ? tag.textContent.trim() : "", title: h2 ? h2.textContent.trim() : s.id });
    });
    return out;
  }

  return {
    version: PLATFORM ? PLATFORM.version : "0",
    store: Store,

    /* Chamado por TODO módulo, no fim do body. */
    init: function(opts){
      opts = opts || {};
      CUR  = opts.id ? PLATFORM.find(opts.id) : null;
      SECS = CUR ? collectSections() : [];
      if (opts.id && !CUR) console.warn("[Platform] id não existe no manifest: " + opts.id);

      buildChrome();
      buildCrumb();
      buildFooter();
      buildIndex();
      buildSearch();
      buildGlossary();
      wireSidebar();
      wireModRefs();
      wireAccordions();
      wireChecks();
      wireNotes();
      wireDone();
      wireReveal();
      wireScroll();
      wireKeys();
      paintProgress();
      if (CUR) pushHistory("modules", { id:CUR.id });
      if (typeof opts.onReady === "function") opts.onReady();
    },

    /* Usado pelo index.html e mapa.html */
    isDone: isDone,
    state: state,
    commit: commit,

    /* Tema */
    getTheme: getTheme,
    setTheme: setTheme,

    /* Favoritos e histórico — usados por favoritos.html e historico.html */
    isFav: isFav,
    toggleFav: toggleFav,
    favorites: function(){ return read().favorites; },
    history: function(){ return read().history; },
    pushHistory: pushHistory,

    /* Requisito 6 — exportação. A arquitetura está pronta:
       o envelope inteiro é serializável e versionado. Só falta a UI. */
    exportData: function(){ return JSON.stringify(read(), null, 2); },
    importData: function(json){
      var d = migrate(JSON.parse(json));
      write(d);
      return d;
    },
    schema: SCHEMA
  };
})();
