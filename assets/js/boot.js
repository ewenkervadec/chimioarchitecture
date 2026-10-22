/* Chimioarchitecture — démarrage : en-tête, pied de page, routeur. */
'use strict';
document.documentElement.lang = 'fr';
if (!/^#\/?presenter/.test(location.hash)) {
  header();
  const S = D.site;
  $('#foot').innerHTML = '<div class="wrap"><div class="f-row"><span>' + esc(S.title1 + ' ' + S.title2) + '</span><span>' + esc(S.version || '') + '</span></div><p>' + md(S.foot || '') + '</p><p>Polices libres auto-hébergées (Mousse, dessinée pour ce cours ; Newsreader, Jost, DM Mono) · aucune donnée ne quitte ton navigateur · <a href="#/methode">la méthode pédagogique</a>.</p></div>';
}
window.addEventListener('hashchange', route);
route();
