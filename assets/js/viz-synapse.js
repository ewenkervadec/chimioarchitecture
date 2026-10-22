/* Chimioarchitecture — la synapse animée, une notion à la fois.
   Deux scènes : A, la synapse vue de près (terminaison, fente, neurone cible) ; B, le neurone entier
   (corps cellulaire dans le raphé, autorécepteurs 5-HT1A, axone, terminaison). Chaque molécule a un destin :
   en vésicule, libérée par exocytose, fixée un instant sur un récepteur, recaptée par le transporteur,
   remise en vésicule ou dégradée par la MAO. Les médicaments (gélules) se logent dans leur cible.
   Le modèle est qualitatif (Blier et de Montigny ; Stahl 2013, fig. 7-13 à 7-17) : il illustre un mécanisme. */
'use strict';
const SY_W = 1000, SY_H = 640;
/* ───────── Les visites guidées : une étape = une scène, un réglage, un foyer, une phrase ───────── */
const SYN_TOURS = {
  isrs: { t: 'ISRS', steps: [
    { sc: 'A', nt: '5ht', rel: 1, focus: 'ves', lab: ['ves'], time: 'J0', h: 'La libération', p: 'À chaque potentiel d’action, des vésicules fusionnent avec la membrane et libèrent la sérotonine dans la fente synaptique.', look: 'les vésicules qui s’ouvrent au bas de la terminaison' },
    { sc: 'A', nt: '5ht', rel: 1, focus: 'post', lab: ['post'], time: 'J0', h: 'La fixation', p: 'La sérotonine se fixe un instant sur les récepteurs du neurone cible, qui s’allument, puis elle s’en détache.', look: 'les récepteurs, en bas' },
    { sc: 'A', nt: '5ht', rel: 1, focus: 'tr', lab: ['tr'], time: 'J0', h: 'La recapture', p: 'Le transporteur (SERT) ramène la sérotonine dans la terminaison : elle est remise en vésicule, ou dégradée par la MAO des mitochondries.', look: 'les deux transporteurs, de chaque côté' },
    { sc: 'A', nt: '5ht', rel: 1, blockTr: 1, focus: 'tr', lab: ['tr', 'drug'], time: 'J1', h: 'L’ISRS bloque le SERT', p: 'Dès les premiers jours, l’ISRS occupe environ 80 % des transporteurs : la sérotonine reste plus longtemps dans la fente.', look: 'les gélules logées dans les transporteurs' },
    { sc: 'B', fire: 0.42, soma: 1, auto: 1, desens: 0, term: 1.05, focus: 'soma', lab: ['auto', 'raster'], time: 'J1–J7', h: 'Le frein des premiers jours', p: 'La sérotonine s’accumule d’abord autour du corps cellulaire, dans le raphé. Elle active les autorécepteurs 5-HT1A, qui ralentissent la décharge : les effets indésirables arrivent, pas encore l’effet antidépresseur.', look: 'les autorécepteurs allumés et la décharge qui s’espace' },
    { sc: 'B', fire: 1.05, soma: 1, auto: 0.35, desens: 1, term: 1.9, focus: 'raster', lab: ['auto', 'raster'], time: 'S2–S4', h: 'Le frein se relâche', p: 'Stimulés en permanence, les 5-HT1A se désensibilisent et sont internalisés : la décharge reprend, et la sérotonine augmente enfin aux terminaisons.', look: 'les autorécepteurs qui s’effacent, la décharge qui revient' },
    { sc: 'A', nt: '5ht', rel: 1.7, blockTr: 1, adapt: 1, focus: 'cleft', lab: ['post', 'drug'], time: 'S4–S6', h: 'L’effet', p: 'Plus de sérotonine dans la fente, et des récepteurs post-synaptiques qui s’adaptent (tolérance aux nausées). L’effet antidépresseur passe probablement par la plasticité des synapses.', look: 'la fente plus riche, les récepteurs moins nombreux' }
  ] },
  irsna: { t: 'IRSNa', steps: [
    { sc: 'A', nt: '5ht', rel: 1, blockTr: 1, focus: 'tr', lab: ['tr', 'drug'], time: 'J1', h: 'Côté sérotonine : comme un ISRS', p: 'La venlafaxine, la duloxétine et le milnacipran bloquent le SERT ; la cascade du délai d’action est la même.', look: 'le SERT bloqué' },
    { sc: 'A', nt: 'na', rel: 1, blockTr: 1, focus: 'tr', lab: ['tr', 'drug'], time: 'J1', h: 'Côté noradrénaline : le NET', p: 'Elles bloquent aussi le transporteur de la noradrénaline, le NET : dès les doses usuelles pour la duloxétine, au-delà de 150 mg/j environ pour la venlafaxine.', look: 'le NET bloqué, la noradrénaline qui s’accumule' },
    { sc: 'A', nt: 'na', rel: 1, blockTr: 1, focus: 'cleft', lab: ['drug'], time: 'S2–S6', h: 'Ce que la noradrénaline ajoute', p: 'Énergie, concentration, effet antalgique par les voies descendantes ; mais aussi sueurs, tachycardie et hausse tensionnelle.', look: 'la fente plus riche en noradrénaline' }
  ] },
  imao: { t: 'IMAO', steps: [
    { sc: 'A', nt: '5ht', rel: 1, focus: 'mito', lab: ['mito'], time: 'J0', h: 'La MAO dégrade', p: 'Dans la terminaison, la monoamine oxydase des mitochondries dégrade une partie de la sérotonine recaptée.', look: 'la mitochondrie, en haut à gauche' },
    { sc: 'A', nt: '5ht', rel: 1, blockMao: 1, fill: 1.5, focus: 'mito', lab: ['mito', 'drug'], time: 'J1', h: 'L’IMAO bloque la MAO', p: 'Plus rien n’est dégradé : les vésicules se remplissent davantage, et chaque potentiel d’action libère plus de sérotonine.', look: 'la MAO bloquée, les vésicules plus pleines' },
    { sc: 'A', nt: 'na', rel: 1.25, blockMao: 1, fill: 1.5, focus: 'ves', lab: ['ves', 'drug'], time: 'repas', h: 'Le piège : la tyramine', p: 'La MAO intestinale ne détruit plus la tyramine des aliments ; elle chasse la noradrénaline des vésicules : poussée hypertensive. D’où le régime des IMAO irréversibles.', look: 'la noradrénaline libérée en excès' }
  ] },
  mirta: { t: 'Mirtazapine', steps: [
    { sc: 'A', nt: 'na', rel: 1, auto: 1, focus: 'auto', lab: ['auto'], time: 'J0', h: 'Le frein α2', p: 'La noradrénaline libérée se fixe aussi sur les autorécepteurs α2 de la terminaison, qui freinent la libération suivante.', look: 'les autorécepteurs α2, de part et d’autre des vésicules' },
    { sc: 'A', nt: 'na', rel: 1, auto: 1, blockAuto: 1, focus: 'auto', lab: ['auto', 'drug'], time: 'J1', h: 'La mirtazapine lève le frein', p: 'En bloquant les α2, elle libère la noradrénaline tout de suite, sans délai ; la sérotonine suit, car les α2 freinent aussi les terminaisons sérotoninergiques.', look: 'les α2 bloqués, les vésicules qui s’ouvrent plus souvent' },
    { sc: 'A', nt: '5ht', rel: 1.5, types: 1, blockPost: [1, 2], focus: 'post', lab: ['post', 'drug'], time: 'J1', h: 'Côté sérotonine : un tri', p: 'Elle bloque aussi 5-HT2A, 5-HT2C et 5-HT3 : la sérotonine libérée agit surtout sur 5-HT1A. D’où peu de nausées et peu de troubles sexuels.', look: 'les récepteurs 5-HT2 et 5-HT3 occupés par la gélule' }
  ] },
  vortio: { t: 'Vortioxétine', steps: [
    { sc: 'A', nt: '5ht', rel: 1, blockTr: 1, focus: 'tr', lab: ['tr', 'drug'], time: 'J1', h: 'Un ISRS…', p: 'La vortioxétine inhibe le SERT, comme un ISRS.', look: 'le SERT bloqué' },
    { sc: 'A', nt: '5ht', rel: 1, blockTr: 1, types: 2, agoPost: [0], blockPost: [2], focus: 'post', lab: ['post', 'drug'], time: 'J1', h: '… et plusieurs récepteurs', p: 'Elle est aussi agoniste 5-HT1A, agoniste partiel 5-HT1B, antagoniste 5-HT3 et 5-HT7. Les nausées restent pourtant fréquentes au début.', look: 'la gélule qui active 5-HT1A et bloque 5-HT3' }
  ] }
};
const SYN_NT = { '5ht': { k: '5-HT', t: 'sérotonine', tr: 'SERT', auto: 'α2', post: 'récepteurs 5-HT', types: [['5-HT1A', '5-HT2', '5-HT3'], ['5-HT1A', '5-HT7', '5-HT3']] }, na: { k: 'NA', t: 'noradrénaline', tr: 'NET', auto: 'α2', post: 'récepteurs α1 et β', types: [['α1', 'β1', 'α1']] } };

/* ───────── Géométrie ───────── */
const MEMB_Y = 306, POST_Y = 362;
const PRE_PATH = 'M418 -4 C 420 58 262 52 202 112 C 150 164 150 252 207 288 C 236 305 282 306 322 306 L 678 306 C 718 306 764 305 793 288 C 850 252 850 164 798 112 C 738 52 580 58 582 -4';
const POST_PATH = 'M252 650 C 252 560 176 470 205 406 C 225 368 270 362 322 362 L 678 362 C 730 362 775 368 795 406 C 824 470 748 560 748 650';
const TRS = [330, 670];                 /* transporteurs */
const AUTOS = [402, 598];               /* autorécepteurs présynaptiques (α2) */
const RECS = [400, 500, 600];           /* récepteurs post-synaptiques */
const VES_HOME = [[388, 252], [458, 266], [532, 262], [606, 250], [428, 198], [502, 208], [576, 196], [500, 146]];
const MITO = { x: 290, y: 168, w: 136, h: 54, a: -14 };
/* Scène B : le neurone entier */
const SOMA = { x: 228, y: 312 };
const AXON_D = 'M330 300 C 420 282 486 196 584 186 C 690 176 760 222 800 288 C 812 310 820 326 826 342';
const AUTO_B = [-128, -76, -26, 34, 92, 148];
const f2 = v => (Math.round(v * 10) / 10).toString();

function closedSpline(pts) {
  const n = pts.length; let d = 'M' + f2(pts[0][0]) + ' ' + f2(pts[0][1]);
  for (let i = 0; i < n; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += ' C ' + f2(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + f2(p1[1] + (p2[1] - p0[1]) / 6) + ' ' + f2(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + f2(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + f2(p2[0]) + ' ' + f2(p2[1]); }
  return d + ' Z';
}
/* Dendrite effilée : contour fermé autour d’une ligne médiane, largeur de w0 à w1 */
function tube(c, w0, w1) {
  const L = [], R = [];
  c.forEach((p, i) => { const q = c[Math.min(i + 1, c.length - 1)], o = c[Math.max(i - 1, 0)]; const dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy) || 1; const w = (w0 + (w1 - w0) * i / (c.length - 1)) / 2; L.push([p[0] - dy / l * w, p[1] + dx / l * w]); R.push([p[0] + dy / l * w, p[1] - dx / l * w]); });
  const tip = c[c.length - 1];
  return closedSpline(L.concat([tip], R.reverse()));
}
function somaOutline() {
  const pts = []; const N = 14;
  for (let i = 0; i < N; i++) { const a = i / N * Math.PI * 2, r = 96 + 9 * Math.sin(a * 3 + 0.6) + 6 * Math.cos(a * 5); pts.push([SOMA.x + Math.cos(a) * r * 1.08, SOMA.y + Math.sin(a) * r * 0.94]); }
  return closedSpline(pts);
}
const DENDS = [
  [[150, 250], [98, 196], [60, 150], [34, 112]], [[140, 330], [82, 352], [40, 384], [8, 404]], [[178, 392], [150, 452], [128, 504], [112, 548]],
  [[260, 404], [282, 462], [300, 514], [306, 560]], [[214, 220], [198, 170], [192, 130], [198, 98]], [[300, 236], [352, 180], [396, 140], [436, 116]]
];
function recGlyph(x, y, dir, cls, extra) {
  /* récepteur : coupe à deux bras ouverte vers la fente (dir = +1 vers le haut, −1 vers le bas) */
  const s = dir;
  const body = 'M' + (x - 15) + ' ' + y + ' L ' + (x - 15) + ' ' + (y + 26 * s) + ' Q ' + (x - 15) + ' ' + (y + 34 * s) + ' ' + (x - 7) + ' ' + (y + 34 * s) + ' L ' + (x + 7) + ' ' + (y + 34 * s) + ' Q ' + (x + 15) + ' ' + (y + 34 * s) + ' ' + (x + 15) + ' ' + (y + 26 * s) + ' L ' + (x + 15) + ' ' + y + ' Z';
  const arms = 'M' + (x - 15) + ' ' + y + ' L ' + (x - 15) + ' ' + (y - 22 * s) + ' Q ' + (x - 15) + ' ' + (y - 27 * s) + ' ' + (x - 10.5) + ' ' + (y - 27 * s) + ' Q ' + (x - 6) + ' ' + (y - 27 * s) + ' ' + (x - 6) + ' ' + (y - 22 * s) + ' L ' + (x - 6) + ' ' + (y - 6 * s) + ' L ' + (x + 6) + ' ' + (y - 6 * s) + ' L ' + (x + 6) + ' ' + (y - 22 * s) + ' Q ' + (x + 6) + ' ' + (y - 27 * s) + ' ' + (x + 10.5) + ' ' + (y - 27 * s) + ' Q ' + (x + 15) + ' ' + (y - 27 * s) + ' ' + (x + 15) + ' ' + (y - 22 * s) + ' L ' + (x + 15) + ' ' + y + ' Z';
  return '<g class="' + cls + '"' + (extra || '') + '><ellipse class="r-glow" cx="' + x + '" cy="' + (y + 14 * s) + '" rx="28" ry="30"/><path class="r-b" d="' + body + '"/><path class="r-b" d="' + arms + '"/><path class="r-hl" d="M' + (x - 11) + ' ' + (y + 6 * s) + ' L ' + (x - 11) + ' ' + (y + 22 * s) + '"/></g>';
}
function trGlyph(x, i) {
  const y = MEMB_Y;
  return '<g class="tr" data-tr="' + i + '"><ellipse class="t-glow" cx="' + x + '" cy="' + (y + 4) + '" rx="36" ry="36"/><rect class="t-b" x="' + (x - 23) + '" y="' + (y - 25) + '" width="16" height="52" rx="8"/><rect class="t-b" x="' + (x + 7) + '" y="' + (y - 25) + '" width="16" height="52" rx="8"/><path class="t-hl" d="M' + (x - 18) + ' ' + (y - 16) + ' L ' + (x - 18) + ' ' + (y + 16) + ' M' + (x + 12) + ' ' + (y - 16) + ' L ' + (x + 12) + ' ' + (y + 16) + '"/></g>';
}
function capsuleSVG() { return '<rect x="-12.5" y="-5.8" width="25" height="11.6" rx="5.8" class="cap-o"/><path d="M0 -5.8 L -6.7 -5.8 A 5.8 5.8 0 0 0 -6.7 5.8 L 0 5.8 Z" class="cap-d"/><path d="M-9.5 -2.6 L -3 -2.6" class="cap-l"/>'; }
function synDefs(u) {
  const sph = s => '<radialGradient id="' + u + 'm' + s + '" cx=".36" cy=".32" r=".72"><stop offset="0" style="stop-color:#fff;stop-opacity:.95"/><stop offset=".22" style="stop-color:var(--c' + s + '-a)"/><stop offset=".62" style="stop-color:var(--c' + s + ')"/><stop offset="1" style="stop-color:var(--c' + s + '-b)"/></radialGradient>';
  let g = '<defs>' + sph('5ht') + sph('na') + sph('da');
  g += '<radialGradient id="' + u + 'cell" cx=".5" cy=".42" r=".72"><stop offset="0" style="stop-color:var(--cell-a)"/><stop offset="1" style="stop-color:var(--cell-b)"/></radialGradient>';
  g += '<radialGradient id="' + u + 'cell2" cx=".5" cy=".3" r=".8"><stop offset="0" style="stop-color:var(--cell-a)"/><stop offset="1" style="stop-color:var(--cell-c)"/></radialGradient>';
  g += '<linearGradient id="' + u + 'cap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--cap-a)"/><stop offset="1" style="stop-color:var(--cap-b)"/></linearGradient>';
  g += '<filter id="' + u + 'blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>';
  g += '<filter id="' + u + 'soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="22"/></filter>';
  /* pointillé du cytoplasme : semis déterministe */
  let dots = ''; let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 70; i++) dots += '<circle cx="' + f2(rnd() * 120) + '" cy="' + f2(rnd() * 120) + '" r="' + f2(0.7 + rnd() * 1.1) + '"/>';
  g += '<pattern id="' + u + 'stip" width="120" height="120" patternUnits="userSpaceOnUse"><g class="stip">' + dots + '</g></pattern>';
  g += '<mask id="' + u + 'mask" maskUnits="userSpaceOnUse" x="0" y="0" width="' + SY_W + '" height="' + SY_H + '"><rect width="' + SY_W + '" height="' + SY_H + '" fill="#fff"/><g class="holes" filter="url(#' + u + 'soft)"></g></mask>';
  return g + '</defs>';
}
function sceneA(u) {
  let g = '<g class="scA"><g transform="translate(500 330) scale(1.3) translate(-500 -330)">';
  /* neurone cible */
  g += '<path class="cell-f" d="' + POST_PATH + ' Z" fill="url(#' + u + 'cell2)"/><path class="cell-f stipf" d="' + POST_PATH + ' Z" fill="url(#' + u + 'stip)"/>';
  g += '<path class="memb" d="' + POST_PATH + '"/><path class="memb-in" d="' + POST_PATH + '"/>';
  /* terminaison */
  g += '<path class="cell-f" d="' + PRE_PATH + ' Z" fill="url(#' + u + 'cell)"/><path class="cell-f stipf" d="' + PRE_PATH + ' Z" fill="url(#' + u + 'stip)"/>';
  g += '<path class="mtub" d="M470 -4 C 466 60 440 110 410 150 M500 -4 C 502 70 498 120 500 168 M530 -4 C 536 60 560 110 590 150"/>';
  g += '<path class="memb" d="' + PRE_PATH + '"/><path class="memb-in" d="' + PRE_PATH + '"/>';
  /* zone active (projections denses) et densité post-synaptique */
  g += '<g class="dense">' + [436, 468, 500, 532, 564].map(x => '<path d="M' + (x - 7) + ' ' + (MEMB_Y - 4) + ' L ' + x + ' ' + (MEMB_Y - 15) + ' L ' + (x + 7) + ' ' + (MEMB_Y - 4) + ' Z"/>').join('') + '</g>';
  g += '<path class="psd" d="M368 ' + (POST_Y + 9) + ' L 632 ' + (POST_Y + 9) + '"/>';
  /* mitochondrie et MAO */
  const M = MITO;
  g += '<g class="mito" transform="translate(' + M.x + ' ' + M.y + ') rotate(' + M.a + ')"><rect x="' + (-M.w / 2) + '" y="' + (-M.h / 2) + '" width="' + M.w + '" height="' + M.h + '" rx="' + (M.h / 2) + '" class="mi-o"/><rect x="' + (-M.w / 2 + 6) + '" y="' + (-M.h / 2 + 6) + '" width="' + (M.w - 12) + '" height="' + (M.h - 12) + '" rx="' + (M.h / 2 - 6) + '" class="mi-i"/><path class="mi-c" d="M' + (-M.w / 2 + 18) + ' 0 q 9 -16 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0"/></g>';
  /* vésicules */
  VES_HOME.forEach((p, i) => { g += '<g class="ves" data-v="' + i + '" transform="translate(' + p[0] + ' ' + p[1] + ')"><circle r="21" class="v-f"/><circle r="21" class="v-m"/><circle r="21" class="v-mi"/></g>'; });
  /* transporteurs, autorécepteurs, récepteurs */
  TRS.forEach((x, i) => { g += trGlyph(x, i); });
  AUTOS.forEach((x, i) => { g += recGlyph(x, MEMB_Y, -1, 'auto', ' data-a="' + i + '"'); });
  RECS.forEach((x, i) => { g += recGlyph(x, POST_Y, 1, 'prec', ' data-r="' + i + '"'); });
  g += '<g class="ripples"></g><g class="molA"></g><g class="capA"></g>';
  /* étiquettes */
  g += '<g class="labs">';
  g += '<text class="lb-h" x="616" y="126" ' + F_MONO + '>TERMINAISON</text><text class="lb-h" x="814" y="338" ' + F_MONO + '>FENTE</text><text class="lb-h" x="300" y="520" ' + F_MONO + '>NEURONE CIBLE</text>';
  g += '<g class="lb lb-ves"><text x="660" y="196" ' + F_SANS + '>vésicules</text><path d="M654 190 L 612 196"/></g>';
  g += '<g class="lb lb-tr">' + TRS.map(x => '<text class="lb-tr-t" x="' + x + '" y="274" text-anchor="middle" ' + F_SANS + '></text>').join('') + '</g>';
  g += '<g class="lb lb-auto">' + AUTOS.map((x, i) => '<text class="lb-auto-t" x="' + (x + (i ? 30 : -30)) + '" y="298" text-anchor="' + (i ? 'start' : 'end') + '" ' + F_SANS + '>α2</text>').join('') + '</g>';
  g += '<g class="lb lb-post"><text class="lb-post-t" x="500" y="448" text-anchor="middle" ' + F_SANS + '></text>' + RECS.map((x, i) => '<text class="lb-type" data-ty="' + i + '" x="' + x + '" y="424" text-anchor="middle" ' + F_SANS + '></text>').join('') + '</g>';
  g += '<g class="lb lb-mito"><text x="' + (MITO.x + 92) + '" y="' + (MITO.y - 28) + '" ' + F_SANS + '>mitochondrie · MAO</text></g>';
  g += '</g>';
  return g + '</g></g>';
}
function sceneB(u) {
  let g = '<g class="scB">';
  /* neurone cible, en bas à droite */
  g += '<path class="cellB" d="' + tube([[660, 470], [760, 440], [880, 430], [1004, 420]], 58, 44) + '" fill="url(#' + u + 'cell2)"/>';
  /* le neurone sérotoninergique : dendrites, corps cellulaire, axone */
  const parts = DENDS.map(c => tube(c, 34, 8)).concat([somaOutline()]);
  g += '<g class="cellB-o">' + parts.map(d => '<path d="' + d + '"/>').join('') + '<path class="axo" d="' + AXON_D + '"/></g>';
  g += '<g class="cellB-f">' + parts.map(d => '<path d="' + d + '" fill="url(#' + u + 'cell)"/>').join('') + '<path class="axf" d="' + AXON_D + '"/></g>';
  g += '<g class="stipB">' + parts.map(d => '<path d="' + d + '" fill="url(#' + u + 'stip)"/>').join('') + '</g>';
  /* varicosités de l’axone */
  g += '<g class="vari"></g>';
  /* noyau */
  g += '<circle class="nuc-o" cx="' + (SOMA.x - 6) + '" cy="' + (SOMA.y + 8) + '" r="42"/><circle class="nuc-i" cx="' + (SOMA.x - 6) + '" cy="' + (SOMA.y + 8) + '" r="35"/><circle class="nucleolus" cx="' + (SOMA.x + 4) + '" cy="' + (SOMA.y + 2) + '" r="9"/>';
  /* terminaison et petite fente */
  g += '<path class="termB" d="M808 334 C 790 352 796 380 826 386 C 858 392 880 372 868 346 C 860 330 830 322 808 334 Z" fill="url(#' + u + 'cell)"/>';
  /* autorécepteurs 5-HT1A sur le corps cellulaire */
  g += '<g class="autoB">' + AUTO_B.map((deg, i) => { const a = deg * Math.PI / 180, r = 100 + 9 * Math.sin(a * 3 + 0.6) + 6 * Math.cos(a * 5); const x = SOMA.x + Math.cos(a) * r * 1.08, y = SOMA.y + Math.sin(a) * r * 0.94; return '<g class="ab" data-b="' + i + '" transform="translate(' + f2(x) + ' ' + f2(y) + ') rotate(' + (deg + 90) + ') scale(.62)">' + recGlyph(0, 0, 1, 'abg') + '</g>'; }).join('') + '</g>';
  g += '<g class="spk"></g><g class="molB"></g>';
  /* oscilloscope de la décharge */
  g += '<g class="scope"><rect x="430" y="488" width="470" height="118" rx="22" class="sc-b"/><text x="456" y="518" class="lb-h" ' + F_MONO + '>DÉCHARGE DU NEURONE</text><line x1="456" x2="874" y1="584" y2="584" class="sc-l"/><g class="ticks"></g></g>';
  /* étiquettes */
  g += '<g class="labs"><text class="lb-h" x="118" y="64" ' + F_MONO + '>RAPHÉ · CORPS CELLULAIRE</text><text class="lb-h" x="610" y="160" ' + F_MONO + '>AXONE</text><text class="lb-h" x="884" y="318" ' + F_MONO + '>TERMINAISON</text><text class="lb-h" x="884" y="334" ' + F_MONO + '>(CORTEX)</text>';
  g += '<g class="lb lb-autoB"><text x="356" y="404" ' + F_SANS + '>autorécepteurs</text><text x="356" y="426" ' + F_SANS + '>5-HT1A</text><path d="M352 392 L 334 378"/></g></g>';
  return g + '</g>';
}

VIZ.synapse = {
  html(cfg) {
    const deck = cfg.mode === 'deck', tours = cfg.tours || (cfg.tour ? [cfg.tour] : Object.keys(SYN_TOURS));
    const u = 'sy' + Math.random().toString(36).slice(2, 7);
    const pick = tours.length > 1 ? '<div class="seg syn-pick" role="group" aria-label="Molécule">' + tours.map((k, i) => '<button type="button" data-tour="' + k + '" aria-pressed="' + (i === 0) + '">' + esc(SYN_TOURS[k].t) + '</button>').join('') + '</div>' : '';
    const svg = '<svg class="syn-svg" viewBox="0 0 ' + SY_W + ' ' + SY_H + '" role="img" aria-label="Synapse sérotoninergique animée">' + synDefs(u) + '<g class="scenes">' + sceneA(u) + sceneB(u) + '</g><rect class="veil" width="' + SY_W + '" height="' + SY_H + '" mask="url(#' + u + 'mask)"/></svg>';
    const leg = '<div class="syn-leg" aria-hidden="true"><span><svg viewBox="-8 -8 16 16"><circle r="6" fill="url(#' + u + 'm5ht)" class="leg-nt"/></svg><b class="leg-nt-t">sérotonine</b></span><span><svg viewBox="-14 -8 28 16"><g class="cap">' + capsuleSVG() + '</g></svg>médicament</span></div>';
    const nav = deck ? '' : '<div class="syn-nav"><button type="button" class="btn ghost small" data-sstep="-1">' + arrow('l', 'btn-arw') + ' Précédente</button><ol class="syn-dots"></ol><button type="button" class="btn small" data-sstep="1">Suivante ' + arrow('r', 'btn-arw') + '</button></div>';
    return '<div class="syn on-a' + (deck ? ' in-deck' : '') + '" data-u="' + u + '">' + pick + '<div class="syn-grid"><div class="syn-fig">' + svg + '</div><div class="syn-cap" aria-live="polite"><div class="syn-k"><span class="mono syn-n"></span><span class="syn-t mono"></span></div><h4 class="syn-h"></h4><p class="syn-p"></p><p class="syn-look"></p>' + leg + nav + '</div></div></div>';
  },
  mount(el, cfg, mode) {
    const root = $('.syn', el), svg = $('.syn-svg', root), u = root.dataset.u;
    const tours = cfg.tours || (cfg.tour ? [cfg.tour] : Object.keys(SYN_TOURS));
    let tour = tours[0], si = 0, S = SYN_TOURS[tour].steps[0];
    const RM = reduceMotion();
    const SV = n => document.createElementNS(SVGNS, n);
    const gMolA = $('.molA', svg), gCapA = $('.capA', svg), gRip = $('.ripples', svg), gMolB = $('.molB', svg), gSpk = $('.spk', svg), gTicks = $('.ticks', svg), holes = $('.holes', svg);
    const axon = $('.axf', svg), AXL = axon.getTotalLength();
    /* varicosités */
    $('.vari', svg).innerHTML = [0.18, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9].map(k => { const p = axon.getPointAtLength(k * AXL); return '<ellipse cx="' + f2(p.x) + '" cy="' + f2(p.y) + '" rx="7.5" ry="6.2" class="var"/>'; }).join('');
    /* ── état de la scène A ── */
    const ves = VES_HOME.map(([x, y], i) => ({ i, hx: x, hy: y, x, y, n: 6, st: 'ready', t: 0, el: $('.ves[data-v="' + i + '"]', svg), mols: [] }));
    const trs = TRS.map((x, i) => ({ x, busy: 0, blocked: false, el: $('.tr[data-tr="' + i + '"]', svg), glow: 0 }));
    const autos = AUTOS.map((x, i) => ({ x, bound: 0, blocked: false, el: $('.auto[data-a="' + i + '"]', svg), glow: 0 }));
    const recs = RECS.map((x, i) => ({ x, bound: 0, blocked: false, ago: false, el: $('.prec[data-r="' + i + '"]', svg), glow: 0, gone: false }));
    let mols = [], caps = [], rips = [];
    const ntCls = () => 'url(#' + u + 'm' + (S.nt || '5ht') + ')';
    const newMol = (x, y, st, extra) => { const c = SV('circle'); c.setAttribute('r', 5.4); c.setAttribute('fill', ntCls()); c.setAttribute('class', 'mol'); gMolA.appendChild(c); const m = Object.assign({ x, y, vx: 0, vy: 0, st, t: 0, el: c }, extra || {}); mols.push(m); return m; };
    const killMol = m => { m.el.remove(); m.dead = true; };
    const newCap = (x, y) => { const g = SV('g'); g.setAttribute('class', 'cap'); g.innerHTML = capsuleSVG(); gCapA.appendChild(g); const c = { x, y, a: Math.random() * 180, va: 0, vx: 0, vy: 0, st: 'free', el: g, tgt: null }; caps.push(c); return c; };
    const fillVes = (v, n) => { v.n = n; };
    const vesMolPos = (v, k, t) => { const a = k * 2.399 + t * 0.0016 * (k % 2 ? 1 : -1), r = 5 + (k % 3) * 4.2; return [v.x + Math.cos(a) * r, v.y + Math.sin(a) * r]; };
    const vesDraw = (v, t) => {
      while (v.mols.length < v.n) { const c = SV('circle'); c.setAttribute('r', 4.6); c.setAttribute('class', 'mol'); v.el.parentNode.insertBefore(c, v.el.nextSibling); v.mols.push(c); }
      while (v.mols.length > v.n) v.mols.pop().remove();
      v.mols.forEach((c, k) => { const [x, y] = vesMolPos(v, k, t); c.setAttribute('cx', f2(x)); c.setAttribute('cy', f2(y)); c.setAttribute('fill', ntCls()); c.style.opacity = v.st === 'fuse' ? Math.max(0, 1 - v.t / 260) : v.st === 'gone' ? 0 : v.st === 'form' ? Math.min(1, v.t / 600) : 1; });
      v.el.setAttribute('transform', 'translate(' + f2(v.x) + ' ' + f2(v.y) + ') scale(' + (v.st === 'fuse' ? f2(1 + v.t / 400) : v.st === 'form' ? f2(Math.min(1, 0.4 + v.t / 700)) : 1) + ')');
      v.el.style.opacity = v.st === 'fuse' ? Math.max(0, 1 - v.t / 300) : v.st === 'gone' ? 0 : v.st === 'form' ? Math.min(1, v.t / 600) : 1;
    };
    /* ── état de la scène B ── */
    let spikes = [], ticks = [], molsB = [], spT = 0, relB = [];
    const autoB = $$('.ab', svg);
    /* ── réglage d’une étape ── */
    let capTarget = 0, fireT = 0, relT = 0, curScene = null;
    const setStep = (i, instant) => {
      const T = SYN_TOURS[tour]; si = clamp(i, 0, T.steps.length - 1); S = T.steps[si];
      const NT = SYN_NT[S.nt || '5ht'];
      root.dataset.nt = S.nt || '5ht';
      root.classList.toggle('on-b', S.sc === 'B'); root.classList.toggle('on-a', S.sc !== 'B');
      /* transporteurs, autorécepteurs, récepteurs : qui est bloqué, qui est présent */
      trs.forEach(tr => { tr.blocked = !!S.blockTr; });
      autos.forEach(a => { a.blocked = !!S.blockAuto; a.el.classList.toggle('hide', !S.auto); });
      recs.forEach((r, k) => { r.blocked = (S.blockPost || []).includes(k); r.ago = (S.agoPost || []).includes(k); r.gone = !!S.adapt && k === 1; r.el.classList.toggle('gone', r.gone); });
      $('.mito', svg).classList.toggle('inhib', !!S.blockMao);
      /* étiquettes utiles à cette étape seulement */
      const lab = new Set(S.lab || []);
      $$('.lb', svg).forEach(l => l.classList.toggle('show', [...l.classList].some(c => lab.has(c.replace('lb-', '').replace('autoB', 'auto')))));
      $$('.lb-tr-t', svg).forEach(t => { t.textContent = NT.tr; });
      $('.lb-post-t', svg).textContent = S.types ? '' : NT.post;
      $$('.lb-type', svg).forEach((t, k) => { t.textContent = S.types ? (NT.types[S.types - 1] || NT.types[0])[k] : ''; });
      $('.scope', svg).classList.toggle('show', lab.has('raster'));
      /* médicament : combien de gélules et où */
      capTarget = (S.blockTr ? trs.length : 0) + (S.blockAuto ? autos.length : 0) + (S.blockPost || []).length + (S.agoPost || []).length + (S.blockMao ? 3 : 0);
      if (capTarget) capTarget += 3;
      /* le foyer : un voile clair autour de ce qu’il faut regarder */
      const F = { ves: [[500, 236, 150, 92]], post: [[500, 372, 175, 62]], tr: TRS.map(x => [x, 300, 62, 62]), auto: AUTOS.map(x => [x, 296, 56, 58]), cleft: [[500, 334, 280, 54]], mito: [[MITO.x, MITO.y, 110, 72]], soma: [[SOMA.x, SOMA.y, 160, 150], [418, 412, 84, 36]], raster: [[SOMA.x, SOMA.y, 140, 130], [418, 412, 84, 36], [665, 547, 250, 74]] }[S.focus] || [];
      holes.innerHTML = F.map(([x, y, rx, ry]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '"/>').join('');
      root.classList.toggle('focus', F.length > 0);
      /* panneau */
      $('.syn-n', root).textContent = 'Étape ' + (si + 1) + ' / ' + T.steps.length;
      $('.syn-t', root).textContent = S.time || '';
      $('.syn-h', root).innerHTML = md(S.h); $('.syn-p', root).innerHTML = md(S.p);
      $('.syn-look', root).innerHTML = S.look ? '<span class="eyebrow">Regardez</span> ' + md(S.look) : '';
      const lt = $('.leg-nt-t', root); if (lt) lt.textContent = NT.t; const ln = $('.leg-nt', root); if (ln) ln.setAttribute('fill', 'url(#' + u + 'm' + (S.nt || '5ht') + ')');
      $$('[data-tour]', root).forEach(b => b.setAttribute('aria-pressed', b.dataset.tour === tour));
      const dots = $('.syn-dots', root); if (dots) dots.innerHTML = T.steps.map((x, k) => '<li><button type="button" data-sgo="' + k + '" aria-label="Étape ' + (k + 1) + '"' + (k === si ? ' aria-current="step"' : '') + '></button></li>').join('');
      const pv = $('[data-sstep="-1"]', root), nx = $('[data-sstep="1"]', root); if (pv) pv.disabled = si === 0; if (nx) nx.disabled = si === T.steps.length - 1;
      /* changement de neurotransmetteur : on repart à neuf */
      if (curScene !== (S.sc || 'A') + (S.nt || '')) { curScene = (S.sc || 'A') + (S.nt || ''); mols.forEach(killMol); mols = []; ves.forEach(v => { v.st = 'ready'; v.t = 0; v.x = v.hx; v.y = v.hy; }); if (S.sc !== 'B' && !RM && !instant) prefillA(); }
      ves.forEach(v => fillVes(v, Math.round(6 * (S.fill || 1))));
      if (S.sc === 'B' && !RM) { ticks.forEach(t => t.el.remove()); ticks = []; const iv = 820 / (S.fire || 1), gap = iv * 0.06; for (let x = 872 - gap * 0.5; x > 460; x -= gap) { const tk = SV('line'); tk.setAttribute('class', 'tick'); tk.setAttribute('y1', 532); tk.setAttribute('y2', 584); tk.setAttribute('x1', f2(x)); tk.setAttribute('x2', f2(x)); gTicks.appendChild(tk); ticks.push({ x, el: tk }); } }
      if (RM || instant) staticFrame();
    };
    /* ── en arrivant sur une scène : la fente déjà à l’équilibre de l’étape, pour que l’image soit juste tout de suite ── */
    const prefillA = () => { const n = Math.round(8 * (S.rel || 1) * (S.blockTr ? 2.2 : 1)); for (let k = 0; k < n; k++) { const m = newMol(rnd(340, 660), rnd(MEMB_Y + 9, POST_Y - 9), 'cleft'); m.vx = rnd(-0.6, 0.6); m.vy = rnd(-0.4, 0.4); } };
    /* ── image fixe (mouvement réduit) ── */
    const staticFrame = () => {
      mols.forEach(killMol); mols = []; caps.forEach(c => c.el.remove()); caps = [];
      if (S.sc !== 'B') {
        const n = Math.round(10 * (S.rel || 1) * (S.blockTr ? 2 : 1));
        for (let k = 0; k < n; k++) { const m = newMol(340 + ((0.5 + k * 0.7548776662) % 1) * 320, MEMB_Y + 9 + ((0.5 + k * 0.569840291) % 1) * (POST_Y - MEMB_Y - 18), 'cleft'); m.el.setAttribute('cx', f2(m.x)); m.el.setAttribute('cy', f2(m.y)); }
        recs.forEach((r, k) => { if (!r.blocked && !r.gone && !r.ago && k !== 2) { const m = newMol(r.x, POST_Y - 16, 'bound'); m.r = r; r.bound = 900; m.el.setAttribute('cx', r.x); m.el.setAttribute('cy', POST_Y - 16); r.el.style.setProperty('--g', '1'); } });
        const spots = [].concat(S.blockTr ? TRS.map(x => [x, MEMB_Y + 3, 90]) : [], S.blockAuto ? AUTOS.map(x => [x, MEMB_Y + 16, 90]) : [], (S.blockPost || []).concat(S.agoPost || []).map(k => [RECS[k], POST_Y - 16, 90]), S.blockMao ? [[MITO.x - 30, MITO.y + 34, 0], [MITO.x + 30, MITO.y + 30, 10]] : []);
        spots.forEach(([x, y, a]) => { const c = newCap(x, y); c.a = a; c.el.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + a + ')'); });
        ves.forEach(v => vesDraw(v, 0));
      } else drawB(0, true);
    };
    /* ── la boucle ── */
    let raf = null, running = false, last = 0;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const fuse = () => {
      const ready = ves.filter(v => v.st === 'ready' && v.n > 0 && v.hy > 230); if (!ready.length) return;
      const v = ready[Math.floor(Math.random() * ready.length)]; v.st = 'dock'; v.t = 0;
    };
    const stepA = (dt, t) => {
      /* libération : potentiels d’action, freinés si un autorécepteur α2 est occupé */
      const brake = S.auto && !S.blockAuto ? autos.filter(a => a.bound > 0).length * 0.38 : 0;
      relT += dt * (S.rel || 1) * (1 - brake);
      if (relT > 1400) { relT = 0; fuse(); if ((S.rel || 1) > 1.35 && Math.random() < 0.5) setTimeout(fuse, 160); }
      ves.forEach(v => {
        v.t += dt;
        if (v.st === 'dock') { const tx = clamp(v.hx, 430, 570), ty = MEMB_Y - 19; v.x += (tx - v.x) * Math.min(1, dt / 160); v.y += (ty - v.y) * Math.min(1, dt / 160); if (Math.hypot(tx - v.x, ty - v.y) < 1.5) { v.st = 'fuse'; v.t = 0; for (let k = 0; k < v.n; k++) { const m = newMol(v.x + rnd(-8, 8), MEMB_Y + 3, 'cleft'); m.vx = rnd(-0.9, 0.9); m.vy = rnd(0.25, 0.9); } } }
        else if (v.st === 'fuse' && v.t > 320) { v.st = 'gone'; v.t = 0; v.x = v.hx; v.y = v.hy; fillVes(v, 0); }
        else if (v.st === 'gone' && v.t > 900) { v.st = 'form'; v.t = 0; fillVes(v, 1); }
        else if (v.st === 'form' && v.t > 700) { v.st = 'ready'; v.t = 0; }
        /* synthèse lente : le tryptophane devient sérotonine, la vésicule se remplit */
        const cap = Math.round(6 * (S.fill || 1));
        if ((v.st === 'ready' || v.st === 'form') && v.n < cap && Math.random() < dt / (S.fill > 1 ? 1100 : 2600)) fillVes(v, v.n + 1);
        vesDraw(v, t);
      });
      /* molécules libres */
      const nCleft = mols.filter(m => m.st === 'cleft').length;
      mols.forEach(m => {
        if (m.dead) return; m.t += dt;
        if (m.st === 'cleft') {
          m.vx += rnd(-0.34, 0.34); m.vy += rnd(-0.3, 0.3); m.vx *= 0.93; m.vy *= 0.93;
          /* un transporteur libre capte ce qui passe à sa portée */
          for (const tr of trs) if (!tr.blocked && tr.busy <= 0) { const dx = tr.x - m.x; if (Math.abs(dx) < 90) { m.vx += Math.sign(dx) * 0.1; m.vy -= 0.04; } }
          m.x += m.vx * dt / 16; m.y += m.vy * dt / 16;
          if (m.y < MEMB_Y + 6) { m.y = MEMB_Y + 6; m.vy = Math.abs(m.vy); } if (m.y > POST_Y - 6) { m.y = POST_Y - 6; m.vy = -Math.abs(m.vy); }
          if (m.x < 300 || m.x > 700) { m.vx += (m.x < 300 ? 0.05 : -0.05); }
          /* diffusion hors de la fente */
          if ((m.x < 236 || m.x > 764) && Math.random() < dt / 1600) { m.st = 'away'; m.t = 0; m.vx = m.x < 500 ? -1.2 : 1.2; }
          if (m.x < 222) m.x = 222; if (m.x > 778) m.x = 778;
          /* fixation sur un récepteur libre */
          for (const r of recs) if (r.bound <= 0 && !r.blocked && !r.gone && !r.ago && Math.abs(m.x - r.x) < 16 && m.y > POST_Y - 28 && Math.random() < 0.6) { r.bound = rnd(600, 1200); m.st = 'bound'; m.t = 0; m.r = r; m.x = r.x; m.y = POST_Y - 16; addRipple(r.x, POST_Y + 34); break; }
          if (m.st !== 'cleft') return;
          for (const a of autos) if (S.auto && a.bound <= 0 && !a.blocked && Math.abs(m.x - a.x) < 16 && m.y < MEMB_Y + 28 && Math.random() < 0.6) { a.bound = rnd(600, 1100); m.st = 'bound'; m.t = 0; m.r = a; m.x = a.x; m.y = MEMB_Y + 16; break; }
          if (m.st !== 'cleft') return;
          /* recapture par un transporteur libre */
          for (const tr of trs) if (!tr.blocked && tr.busy <= 0 && Math.abs(m.x - tr.x) < 22 && m.y < MEMB_Y + 36 && Math.random() < 0.9) { tr.busy = 230; tr.glow = 1; m.st = 'through'; m.t = 0; m.tr = tr; m.x = tr.x; break; }
        } else if (m.st === 'bound') {
          m.r.bound -= dt; if (m.r.bound <= 0) { m.st = 'cleft'; m.vy = m.r === undefined ? 0 : (recs.includes(m.r) ? -0.9 : 0.9); m.vx = rnd(-0.8, 0.8); m.r = null; }
        } else if (m.st === 'through') {
          m.y = MEMB_Y + 26 - Math.min(1, m.t / 300) * 62; if (m.t > 300) { m.st = 'in'; m.t = 0; const deg = !S.blockMao && Math.random() < 0.3; m.dest = deg ? [MITO.x + rnd(-36, 36), MITO.y + rnd(-10, 14)] : (() => { const v = ves[Math.floor(Math.random() * ves.length)]; return [v.hx, v.hy]; })(); m.deg = deg; }
        } else if (m.st === 'in') {
          const [tx, ty] = m.dest; m.x += (tx - m.x) * Math.min(1, dt / 520); m.y += (ty - m.y) * Math.min(1, dt / 520);
          if (Math.hypot(tx - m.x, ty - m.y) < 4) { if (m.deg) { m.st = 'deg'; m.t = 0; } else { const v = ves.find(vv => Math.hypot(vv.hx - tx, vv.hy - ty) < 2); if (v && v.st !== 'fuse' && v.n < Math.round(6 * (S.fill || 1)) + 2) fillVes(v, v.n + 1); killMol(m); } }
        } else if (m.st === 'deg') { m.el.style.opacity = Math.max(0, 1 - m.t / 600); if (m.t > 600) killMol(m); }
        else if (m.st === 'away') { m.x += m.vx * dt / 16; m.y += rnd(-0.5, 0.5); m.el.style.opacity = Math.max(0, 1 - m.t / 700); if (m.t > 700) killMol(m); }
        if (!m.dead) { m.el.setAttribute('cx', f2(m.x)); m.el.setAttribute('cy', f2(m.y)); }
      });
      mols = mols.filter(m => !m.dead);
      if (mols.length > 110) { const extra = mols.filter(m => m.st === 'cleft').slice(0, mols.length - 110); extra.forEach(m => { m.st = 'away'; m.t = 0; m.vx = m.x < 500 ? -1.4 : 1.4; }); }
      /* récepteurs et transporteurs : lueur */
      recs.forEach(r => { if (r.bound > 0 && !mols.some(m => m.r === r)) r.bound = 0; r.glow += ((r.bound > 0 || r.ago) ? 1 : 0) - r.glow > 0 ? dt / 160 : -dt / 500; r.glow = clamp(r.glow, 0, 1); r.el.style.setProperty('--g', r.glow.toFixed(2)); r.el.classList.toggle('blocked', r.blocked); r.el.classList.toggle('ago', r.ago); });
      autos.forEach(a => { if (a.bound > 0 && !mols.some(m => m.r === a)) a.bound = 0; a.glow += (a.bound > 0 ? 1 : 0) - a.glow > 0 ? dt / 160 : -dt / 500; a.glow = clamp(a.glow, 0, 1); a.el.style.setProperty('--g', a.glow.toFixed(2)); a.el.classList.toggle('blocked', a.blocked); });
      trs.forEach(tr => { tr.busy -= dt; tr.glow = Math.max(0, tr.glow - dt / 600); tr.el.style.setProperty('--g', tr.glow.toFixed(2)); tr.el.classList.toggle('blocked', tr.blocked); });
      /* gélules : elles entrent par les bords de la fente, puis se logent dans leur cible */
      const targets = [].concat(S.blockTr ? trs.map(tr => ({ x: tr.x, y: MEMB_Y + 3, a: 90, o: tr })) : [], S.blockAuto ? autos.map(a => ({ x: a.x, y: MEMB_Y + 16, a: 90, o: a })) : [], (S.blockPost || []).concat(S.agoPost || []).map(k => ({ x: recs[k].x, y: POST_Y - 16, a: 90, o: recs[k] })), S.blockMao ? [{ x: MITO.x - 34, y: MITO.y + 34, a: -14, o: 'm1' }, { x: MITO.x + 22, y: MITO.y + 22, a: -14, o: 'm2' }, { x: MITO.x - 6, y: MITO.y - 38, a: -14, o: 'm3' }] : []);
      while (caps.length < capTarget) { const left = Math.random() < 0.5; newCap(left ? 214 : 786, rnd(MEMB_Y + 14, POST_Y - 14)); }
      while (caps.length > capTarget) { const c = caps.pop(); c.el.remove(); }
      caps.forEach(c => { if (c.tgt) { const nt = targets.find(tg => tg.o === c.tgt.o); c.tgt = nt || null; } });
      targets.forEach(tg => { if (!caps.some(c => c.tgt && c.tgt.o === tg.o)) { const free = caps.filter(c => !c.tgt).sort((a, b) => Math.hypot(a.x - tg.x, a.y - tg.y) - Math.hypot(b.x - tg.x, b.y - tg.y))[0]; if (free) free.tgt = tg; } });
      caps.forEach(c => {
        if (c.tgt) { const k = Math.min(1, dt / 420); c.x += (c.tgt.x - c.x) * k; c.y += (c.tgt.y - c.y) * k; c.a += (c.tgt.a - c.a) * k; }
        else { c.vx += rnd(-0.15, 0.15); c.vy += rnd(-0.15, 0.15); c.vx *= 0.95; c.vy *= 0.95; c.x = clamp(c.x + c.vx * dt / 16, 236, 764); c.y = clamp(c.y + c.vy * dt / 16, MEMB_Y + 12, POST_Y - 12); c.a += rnd(-2, 2); }
        c.el.setAttribute('transform', 'translate(' + f2(c.x) + ' ' + f2(c.y) + ') rotate(' + f2(c.a) + ')');
      });
      rips.forEach(r => { r.t += dt; const k = r.t / 900; r.el.setAttribute('r', f2(8 + k * 46)); r.el.style.opacity = Math.max(0, 0.55 * (1 - k)); if (k >= 1) { r.el.remove(); r.dead = true; } }); rips = rips.filter(r => !r.dead);
    };
    const addRipple = (x, y) => { if (rips.length > 8) return; const c = SV('circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('class', 'rip'); gRip.appendChild(c); rips.push({ t: 0, el: c }); };
    /* scène B */
    const drawB = (dt, still) => {
      const fire = S.fire || 1;
      /* corps cellulaire : sérotonine autour, autorécepteurs */
      const nb = Math.round(still ? 16 * (S.soma ? 2 : 1) : (S.soma ? 30 : 12));
      while (molsB.length < nb) { const a = Math.random() * Math.PI * 2, r = rnd(116, 168); const c = SV('circle'); c.setAttribute('r', 4.4); c.setAttribute('fill', 'url(#' + u + 'm5ht)'); c.setAttribute('class', 'mol'); gMolB.appendChild(c); molsB.push({ a, r, x: SOMA.x + Math.cos(a) * r, y: SOMA.y + Math.sin(a) * r * 0.9, el: c, w: rnd(-1, 1) }); }
      while (molsB.length > nb) molsB.pop().el.remove();
      molsB.forEach(m => { if (!still) { m.a += m.w * 0.0004 * dt; m.r = clamp(m.r + rnd(-0.6, 0.6), 112, 172); } m.x = SOMA.x + Math.cos(m.a) * m.r * 1.05; m.y = SOMA.y + Math.sin(m.a) * m.r * 0.92; if (m.y > 600) m.y = 600; m.el.setAttribute('cx', f2(m.x)); m.el.setAttribute('cy', f2(m.y)); });
      autoB.forEach((g, k) => { const internal = S.desens && k % 2 === 1; g.classList.toggle('desens', !!S.desens); g.classList.toggle('internal', internal); g.style.setProperty('--g', ((S.auto || 0) * (internal ? 0.2 : 1)).toFixed(2)); });
      /* potentiels d’action : intervalle inversement proportionnel à la décharge */
      if (!still) {
        spT += dt; const iv = 820 / fire;
        if (spT > iv) { spT = 0; const e = SV('g'); e.setAttribute('class', 'spike'); e.innerHTML = '<circle r="16" class="sp-h"/><circle r="7.5" class="sp-c"/>'; gSpk.appendChild(e); spikes.push({ s: 0, el: e }); const tk = SV('line'); tk.setAttribute('class', 'tick'); tk.setAttribute('y1', 532); tk.setAttribute('y2', 584); gTicks.appendChild(tk); ticks.push({ x: 872, el: tk }); }
        spikes.forEach(sp => { sp.s += dt / 1300; if (sp.s >= 1) { sp.el.remove(); sp.dead = true; releaseB(); return; } const p = axon.getPointAtLength(sp.s * AXL); sp.el.setAttribute('transform', 'translate(' + f2(p.x) + ' ' + f2(p.y) + ')'); });
        spikes = spikes.filter(s => !s.dead);
        ticks.forEach(tk => { tk.x -= dt * 0.06; tk.el.setAttribute('x1', f2(tk.x)); tk.el.setAttribute('x2', f2(tk.x)); if (tk.x < 458) { tk.el.remove(); tk.dead = true; } }); ticks = ticks.filter(t => !t.dead);
        relB.forEach(m => { m.t += dt; m.x += m.vx * dt / 16; m.y += m.vy * dt / 16; m.vx *= 0.97; m.vy *= 0.97; m.el.setAttribute('cx', f2(m.x)); m.el.setAttribute('cy', f2(m.y)); m.el.style.opacity = Math.max(0, 1 - m.t / 1500); if (m.t > 1500) { m.el.remove(); m.dead = true; } }); relB = relB.filter(m => !m.dead);
      } else {
        gSpk.innerHTML = ''; gTicks.innerHTML = '';
        const n = Math.round(9 * fire); for (let k = 0; k < n; k++) { const x = 862 - k * (400 / Math.max(n, 1)); gTicks.insertAdjacentHTML('beforeend', '<line class="tick" x1="' + f2(x) + '" x2="' + f2(x) + '" y1="532" y2="584"/>'); }
      }
    };
    const releaseB = () => { const n = Math.round(3 * (S.term || 1)); for (let k = 0; k < n; k++) { const c = SV('circle'); c.setAttribute('r', 3.6); c.setAttribute('fill', 'url(#' + u + 'm5ht)'); c.setAttribute('class', 'mol'); gMolB.appendChild(c); relB.push({ x: 838 + rnd(-10, 10), y: 388, vx: rnd(-0.7, 0.7), vy: rnd(0.3, 1), t: 0, el: c }); } };
    const frame = ts => {
      if (!running) return; const dt = Math.min(40, ts - (last || ts)); last = ts;
      if (S.sc === 'B') drawB(dt); else stepA(dt, ts);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (running || RM) return; running = true; last = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = null; };
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-tour]'); if (t) { tour = t.dataset.tour; curScene = null; setStep(0); return; }
      const b = e.target.closest('[data-sstep]'); if (b) { setStep(si + (+b.dataset.sstep)); return; }
      const d = e.target.closest('[data-sgo]'); if (d) setStep(+d.dataset.sgo);
    });
    setStep(0, true);
    if (RM) staticFrame();
    root._syn = () => ({ bound: recs.filter(r => r.bound > 0).length, cleft: mols.filter(m => m.st === 'cleft').length, docked: caps.filter(c => c.tgt && Math.hypot(c.x - c.tgt.x, c.y - c.tgt.y) < 3).length });
    return {
      step(s) { let k = 0; cfg.steps.forEach((x, i) => { if (x.f <= s) k = (x.s !== undefined ? x.s : i + 1); }); if (cfg.tour && SYN_TOURS[cfg.tour]) tour = cfg.tour; setStep(k); },
      start, stop, destroy() { stop(); }
    };
  }
};
