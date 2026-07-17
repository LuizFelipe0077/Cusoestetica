/* =====================================================================
   THEME.JS — Bootstrap de tema. Carrega no <head>, ANTES do CSS pintar.
   ---------------------------------------------------------------------
   Existe separado do platform.js por um motivo só: platform.js roda no
   fim do body, e nesse ponto a página já pintou. Aplicar o tema ali
   causaria um flash branco/preto a cada navegação (FOUC).
   Este arquivo tem 1 responsabilidade e roda em ~0.1ms.

   Ordem de decisão:
     1. preferência salva pelo usuário
     2. preferência do sistema operacional (prefers-color-scheme)
     3. dark (padrão da marca)
   ===================================================================== */
(function(){
  var KEY = "up_progress_v1";
  var theme = null;
  try {
    var d = JSON.parse(localStorage.getItem(KEY) || "{}");
    theme = (d.prefs && d.prefs.theme) || null;
  } catch(e){}
  if (!theme){
    theme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
      ? "light" : "dark";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
