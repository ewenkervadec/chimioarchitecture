/* Chimioarchitecture — le cerveau et les voies monoaminergiques, en schéma géométrique.
   Coupe sagittale stylisée (antérieur à gauche) : manteau cortical en double trait, tronc cérébral oblique
   portant les noyaux, cervelet, régions cibles en cartouches. Les voies sont tracées comme des lignes de métro
   (segments droits, angles arrondis) : un système à la fois, ou, pour une région, les seules voies qui y
   arrivent. Aucune voie n’en croise une autre, aucun texte n’en chevauche un autre ; l’anatomie est simplifiée. */
'use strict';
const VW = 1000, VH = 660;
const HOOD = { cx: 470, cy: 500, rx: 410, ry: 425, t: 20 };
/* Régions cibles : cartouche [cx, cy, largeur, hauteur] ou cercle [cx, cy, r] ; étiquette */
const ST = {
  pfc: { b: [175, 230, 178, 44], l: 'cortex préfrontal' },
  cx: { b: [500, 150, 196, 44], l: 'cortex associatif' },
  str: { b: [385, 262, 126, 42], l: 'striatum' },
  thal: { b: [565, 262, 126, 42], l: 'thalamus' },
  nacc: { b: [215, 410, 178, 42], l: 'noyau accumbens' },
  hyp: { b: [420, 410, 160, 42], l: 'hypothalamus' },
  amy: { b: [165, 564, 122, 40], l: 'amygdale' },
  hip: { b: [306, 564, 134, 40], l: 'hippocampe' },
  pit: { b: [452, 564, 122, 38], l: 'hypophyse' },
  sc: { b: [704, 636, 176, 38], l: 'moelle épinière' },
  ap: { b: [893, 636, 150, 38], l: 'area postrema' },
  cer: { c: [868, 488, 76], l: 'cervelet' }
};
/* Noyaux d’origine : pastilles sur le tronc cérébral [cx, cy, largeur], abréviation, nom complet */
const NU = {
  vta: { p: [560, 420, 48], s: 'da', k: 'ATV', t: 'aire tegmentale ventrale' },
  sn: { p: [600, 452, 40], s: 'da', k: 'SN', t: 'substance noire' },
  draph: { p: [632, 486, 64], s: '5ht', k: 'raphé', t: 'noyaux du raphé' },
  lc: { p: [676, 526, 40], s: 'na', k: 'LC', t: 'locus coeruleus' },
  arc: { p: [470, 431, 0], s: 'da', k: '', t: 'noyau arqué (hypothalamus)' }
};
/* Couloirs : de haut en bas NA (318), 5-HT (334), DA nigrostriée (350), DA mésolimbique et mésocorticale (366).
   Règles : un noyau plus à droite emprunte un couloir plus haut ; vers une cible au-dessus des couloirs, le couloir
   le plus bas bifurque le plus à gauche ; vers une cible en dessous, c’est l’inverse. */
const RT = {
  '5ht': {
    pfc: ['draph', [[632, 474], [632, 334], [152, 334], [152, 252]]],
    cx: ['draph', [[632, 474], [632, 334], [466, 334], [466, 172]]],
    str: ['draph', [[632, 474], [632, 334], [397, 334], [397, 283]]],
    thal: ['draph', [[632, 474], [632, 334], [545, 334], [545, 283]]],
    nacc: ['draph', [[632, 474], [632, 334], [190, 334], [190, 389]]],
    hyp: ['draph', [[632, 474], [632, 334], [428, 334], [428, 389]]],
    hip: ['draph', [[632, 474], [632, 334], [330, 334], [330, 544]]],
    amy: ['draph', [[632, 474], [632, 334], [330, 334], [330, 486], [172, 486], [172, 544]]],
    cer: ['draph', [[664, 486], [794, 486]]],
    sc: ['draph', [[624, 498], [662, 617]]],
    ap: ['draph', [[624, 498], [654.7, 594], [893, 594], [893, 617]]]
  },
  na: {
    pfc: ['lc', [[676, 514], [676, 318], [184, 318], [184, 252]]],
    cx: ['lc', [[676, 514], [676, 318], [484, 318], [484, 172]]],
    thal: ['lc', [[676, 514], [676, 318], [585, 318], [585, 283]]],
    hyp: ['lc', [[676, 514], [676, 318], [404, 318], [404, 389]]],
    hip: ['lc', [[676, 514], [676, 318], [312, 318], [312, 544]]],
    amy: ['lc', [[676, 514], [676, 318], [312, 318], [312, 470], [150, 470], [150, 544]]],
    cer: ['lc', [[696, 526], [804, 526]]],
    sc: ['lc', [[676, 538], [712, 617]]]
  },
  da: {
    str: ['sn', [[600, 440], [600, 350], [362, 350], [362, 283]]],
    nacc: ['vta', [[560, 408], [560, 366], [236, 366], [236, 389]]],
    pfc: ['vta', [[560, 408], [560, 366], [120, 366], [120, 252]]],
    pit: ['arc', [[470, 431], [470, 545]]]
  }
};
const ellP = (th, rx, ry) => [HOOD.cx + rx * Math.cos(th), HOOD.cy - ry * Math.sin(th)];
const f1 = v => v.toFixed(1);
/* Polyligne aux angles arrondis */
function roundPath(pts, r = 13) {
  let d = 'M' + pts[0][0] + ' ' + pts[0][1];
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
    const l1 = Math.hypot(x1 - x0, y1 - y0), l2 = Math.hypot(x2 - x1, y2 - y1), rr = Math.min(r, l1 / 2, l2 / 2);
    d += ' L' + f1(x1 - (x1 - x0) / l1 * rr) + ' ' + f1(y1 - (y1 - y0) / l1 * rr) + ' Q' + x1 + ' ' + y1 + ' ' + f1(x1 + (x2 - x1) / l2 * rr) + ' ' + f1(y1 + (y2 - y1) / l2 * rr);
  }
  const e = pts[pts.length - 1];
  return d + ' L' + e[0] + ' ' + e[1];
}
/* Dégradés : du noyau (teinte profonde) vers l’avant du cerveau (teinte claire) ; pastilles en relief */
function voiesDefs(uid) {
  const lg = s => '<linearGradient id="' + uid + '-' + s + '" gradientUnits="userSpaceOnUse" x1="690" y1="560" x2="130" y2="190"><stop offset="0" style="stop-color:var(--c' + s + '-b)"/><stop offset=".5" style="stop-color:var(--c' + s + ')"/><stop offset="1" style="stop-color:var(--c' + s + '-a)"/></linearGradient>';
  const pg = s => '<linearGradient id="' + uid + '-p' + s + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--c' + s + '-a)"/><stop offset="1" style="stop-color:var(--c' + s + '-b)"/></linearGradient>';
  return '<defs>' + ['5ht', 'na', 'da'].map(s => lg(s) + pg(s)).join('') + '</defs>';
}
function anatomySVG() {
  const H = HOOD; let g = '<g class="anat" aria-hidden="true">';
  /* manteau cortical : bande en double trait, extrémités arrondies */
  const a0 = Math.PI, a1 = 0.19, ro = [H.rx, H.ry], ri = [H.rx - H.t, H.ry - H.t];
  const P = (a, r) => ellP(a, r[0], r[1]).map(f1).join(' ');
  const capR = H.t / 2;
  g += '<path class="hood" d="M' + P(a0, ro) + ' A ' + ro[0] + ' ' + ro[1] + ' 0 0 1 ' + P(a1, ro) + ' A ' + capR + ' ' + capR + ' 0 0 1 ' + P(a1, ri) + ' A ' + ri[0] + ' ' + ri[1] + ' 0 0 0 ' + P(a0, ri) + ' A ' + capR + ' ' + capR + ' 0 0 1 ' + P(a0, ro) + ' Z"/>';
  /* sillons des lobes en pointillés, noms au-dehors */
  [2.08, 0.98].forEach(th => { const o = ellP(th, H.rx + 8, H.ry + 8), n = ellP(th, H.rx - H.t - 30, H.ry - H.t - 30); g += '<path class="lobe-div" d="M' + o.map(f1).join(' ') + ' L ' + n.map(f1).join(' ') + '"/>'; });
  [[2.66, 'frontal', 'end'], [1.5, 'pariétal', 'middle'], [0.55, 'occipital', 'start']].forEach(([th, lab, an]) => { const t = ellP(th, H.rx + 22, H.ry + 22); g += '<text class="lobe" x="' + f1(t[0]) + '" y="' + f1(t[1]) + '" text-anchor="' + an + '" ' + F_MONO + '>' + lab.toUpperCase() + '</text>'; });
  /* tronc cérébral oblique, coupé à l’horizontale sous les couloirs et au-dessus de la moelle */
  const s0 = [568, 396], s1 = [686, 620], w = 100, yT = 392, yB = 617;
  const dx = s1[0] - s0[0], dy = s1[1] - s0[1], L = Math.hypot(dx, dy), nx = -dy / L * w / 2, ny = dx / L * w / 2;
  const Q = (p, k) => f1(p[0] + nx * k) + ' ' + f1(p[1] + ny * k);
  const E = (k, Y) => { const t = (Y - (s0[1] + ny * k)) / dy; return f1(s0[0] + nx * k + dx * t) + ' ' + Y; };
  g += '<path class="stem" d="M' + E(1, yT) + ' L ' + E(1, yB) + ' L ' + E(-1, yB) + ' L ' + E(-1, yT) + ' Z"/>';
  [0.25, 0.62].forEach(k => { const c = [s0[0] + dx * k, s0[1] + dy * k]; g += '<path class="stem-div" d="M' + Q(c, 1) + ' L ' + Q(c, -1) + '"/>'; });
  g += '<text class="part" x="604" y="604" text-anchor="end" ' + F_MONO + '>TRONC</text><text class="part" x="604" y="620" text-anchor="end" ' + F_MONO + '>CÉRÉBRAL</text>';
  /* cervelet : double cercle et lamelles en pointillés */
  const [cx, cy, r] = ST.cer.c;
  g += '<circle class="cereb" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/><circle class="cereb-in" cx="' + cx + '" cy="' + cy + '" r="' + (r - 9) + '"/>';
  [-40, 34].forEach(o => { const hw = Math.sqrt((r - 20) ** 2 - o * o); g += '<path class="folia" d="M' + f1(cx - hw) + ' ' + (cy + o) + ' L ' + f1(cx + hw) + ' ' + (cy + o) + '"/>'; });
  /* tige pituitaire */
  g += '<path class="stalk" d="M470 431 L 470 545"/>';
  return g + '</g>';
}
function stationSVG(k) {
  const S = ST[k];
  if (S.c) { const [x, y, r] = S.c; return '<g class="st st-c" data-reg="' + k + '" tabindex="0" role="button" aria-label="' + esc(S.l) + '"><circle class="st-hit" cx="' + x + '" cy="' + y + '" r="' + (r - 9) + '"/><text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" ' + F_SANS + '>' + esc(S.l) + '</text><g class="st-mk" transform="translate(' + (x + 48) + ' ' + (y - 48) + ')"></g><g class="st-dots" transform="translate(' + x + ' ' + (y + 26) + ')"></g></g>'; }
  const [x, y, w, h] = S.b;
  return '<g class="st" data-reg="' + k + '" tabindex="0" role="button" aria-label="' + esc(S.l) + '"><rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="' + (h / 2 - 5) + '"/><text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" ' + F_SANS + '>' + esc(S.l) + '</text><g class="st-mk" transform="translate(' + (x + w / 2 - 3) + ' ' + (y - h / 2 + 3) + ')"></g><g class="st-dots" transform="translate(' + x + ' ' + (y + h / 2 + 11) + ')"></g></g>';
}
function voiesSVG(uid, o = {}) {
  let g = '<svg class="vo-svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="img" aria-label="' + esc(o.label || 'Schéma du cerveau en coupe sagittale, antérieur à gauche : voies sérotoninergiques, noradrénergiques et dopaminergiques') + '">';
  g += voiesDefs(uid) + anatomySVG();
  let ol = '', fl = '', fw = '';
  for (const s in RT) for (const reg in RT[s]) {
    const [nu, pts] = RT[s][reg], d = roundPath(pts);
    const a = ' data-s="' + s + '" data-to="' + reg + '" data-nu="' + nu + '"';
    ol += '<path class="vo-o"' + a + ' d="' + d + '"/>';
    fl += '<path class="vo-f"' + a + ' d="' + d + '" stroke="url(#' + uid + '-' + s + ')"/>';
    fw += '<path class="vo-w"' + a + ' d="' + d + '"/>';
  }
  g += '<g class="vo-paths" aria-hidden="true"><g class="vo-ol">' + ol + '</g><g class="vo-fl">' + fl + '</g><g class="vo-fw">' + fw + '</g></g>';
  g += '<g class="vo-st">' + Object.keys(ST).map(stationSVG).join('') + '</g>';
  g += '<g class="vo-nu">' + Object.entries(NU).map(([k, n]) => { const [x, y, w] = n.p;
    if (!w) return '<g class="nu s-' + n.s + '" data-nuc="' + k + '"><title>' + esc(n.t) + '</title><circle cx="' + x + '" cy="' + y + '" r="7.5" fill="url(#' + uid + '-p' + n.s + ')"/></g>';
    return '<g class="nu s-' + n.s + '" data-nuc="' + k + '"><title>' + esc(n.t) + '</title><rect x="' + (x - w / 2) + '" y="' + (y - 12) + '" width="' + w + '" height="24" rx="12" fill="url(#' + uid + '-p' + n.s + ')"/><text x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle" ' + F_MONO + '>' + esc(n.k) + '</text></g>'; }).join('') + '</g>';
  return g + '</svg>';
}
/* Ce qu’on montre : systèmes allumés (on), région choisie (sel), lecture d’une molécule (fx) */
function voiesState(svg, st) {
  const on = st.on, sel = st.sel || null, fx = st.fx || {};
  const single = on.size === 1;
  $$('.vo-paths path', svg).forEach(p => {
    const s = p.dataset.s, to = p.dataset.to;
    const vis = on.has(s) && (single || to === sel);
    p.classList.toggle('off', !vis); p.classList.toggle('faint', vis && single && !!sel && to !== sel);
  });
  const reach = {}, nuUsed = new Set();
  for (const s in RT) { if (!on.has(s)) continue; for (const reg in RT[s]) { (reach[reg] = reach[reg] || new Set()).add(s); if (single || reg === sel || !sel) { if (!sel || reg === sel || single) nuUsed.add(RT[s][reg][0]); } } }
  const nuSel = new Set(); if (sel) for (const s in RT) if (on.has(s) && RT[s][sel]) nuSel.add(RT[s][sel][0]);
  $$('.nu', svg).forEach(n => { const k = n.dataset.nuc; const show = on.has(NU[k].s) && (single || !sel || nuSel.has(k)); n.classList.toggle('off', !show); n.classList.toggle('faint', show && !!sel && !nuSel.has(k)); });
  $$('.st', svg).forEach(g => {
    const k = g.dataset.reg, R = reach[k] || new Set();
    g.classList.toggle('sel', k === sel); g.classList.toggle('mute', R.size === 0); g.classList.toggle('dimmed', !!sel && k !== sel && R.size > 0);
    g.classList.remove('fx-ok', 'fx-ae', 'fx-mix'); if (fx[k]) g.classList.add('fx-' + fx[k][0]);
    const mk = $('.st-mk', g); if (mk) mk.innerHTML = fx[k] ? '<circle r="12" class="mk-c"/><text y="5" text-anchor="middle" ' + F_SANS + '>' + (fx[k][0] === 'ok' ? '✓' : fx[k][0] === 'ae' ? '!' : '±') + '</text>' : '';
    const dots = $('.st-dots', g); if (dots) { const arr = ['na', '5ht', 'da'].filter(s => R.has(s)); dots.innerHTML = (!single && !sel) ? arr.map((s, i) => '<circle cx="' + ((i - (arr.length - 1) / 2) * 14) + '" cy="0" r="5.5" class="dot s-' + s + '"/>').join('') : ''; }
  });
  svg.classList.toggle('summary', !single && !sel);
}

/* ───────── Régions : rôle, symptômes, ce que les médicaments y changent ───────── */
const VREG = {
  pfc: { t: 'cortex préfrontal', fn: 'Humeur, fonctions exécutives, attention, motivation ; régulation des émotions et de l’impulsivité par sa partie ventromédiane et orbitaire.', sy: 'Troubles de la concentration et de la décision, apathie, culpabilité, idées de dévalorisation, idées suicidaires.', fx: 'Le NET recapte aussi la dopamine dans le cortex préfrontal, qui a peu de DAT : bloquer le NET y augmente la dopamine. Les récepteurs 5-HT2C freinent la libération de DA et de NA : les stimuler (ISRS) peut émousser l’affect, les bloquer (agomélatine, fluoxétine) la libère.' },
  cx: { t: 'cortex associatif', fn: 'Intégration perceptive et cognitive, vigilance.', sy: 'Ralentissement, troubles attentionnels.', fx: 'Innervation diffuse par le raphé et le locus coeruleus : les deux systèmes modulent l’état d’éveil de tout le cortex.' },
  str: { t: 'striatum dorsal', fn: 'Mouvement, routines, habitudes.', sy: 'Ralentissement ou agitation psychomotrice.', fx: 'Voie nigrostriée : le blocage D2 (antipsychotiques) donne des effets extrapyramidaux ; la sérotonine y freine la dopamine (akathisie et tremblement sous ISRS).' },
  thal: { t: 'thalamus', fn: 'Relais sensoriel, vigilance, sommeil.', sy: 'Troubles du sommeil, hypervigilance.', fx: 'Cible des projections sérotoninergiques et noradrénergiques ascendantes.' },
  nacc: { t: 'noyau accumbens (striatum ventral)', fn: 'Récompense, plaisir anticipé, motivation.', sy: 'Anhédonie, perte d’intérêt.', fx: 'Voie dopaminergique mésolimbique. Les antidépresseurs purement sérotoninergiques corrigent mal l’anhédonie ; les stratégies pro-dopaminergiques sont étudiées.' },
  hyp: { t: 'hypothalamus', fn: 'Appétit, poids, veille et sommeil, température, axe corticotrope.', sy: 'Troubles de l’appétit et du sommeil.', fx: 'Bloquer H1 et 5-HT2C (mirtazapine, quétiapine, olanzapine, amitriptyline) augmente l’appétit et le poids ; bloquer H1 fait dormir.' },
  amy: { t: 'amygdale (lobe temporal)', fn: 'Peur, saillance émotionnelle, anxiété.', sy: 'Anxiété, hyperréactivité au stress.', fx: 'L’anxiété et l’agitation des premiers jours d’ISRS viennent en partie de la stimulation de récepteurs 5-HT2C et 5-HT2A ; elles s’estompent avec la désensibilisation.' },
  hip: { t: 'hippocampe (lobe temporal)', fn: 'Mémoire épisodique, freinage de l’axe du stress, neurogenèse.', sy: 'Plaintes mnésiques ; atrophie sous stress chronique.', fx: 'Hypothèse neurotrophique : les antidépresseurs, le lithium et la kétamine augmentent le BDNF et la plasticité synaptique.' },
  pit: { t: 'hypophyse', fn: 'La dopamine tubéro-infundibulaire, issue du noyau arqué de l’hypothalamus, freine la sécrétion de prolactine.', sy: '', fx: 'Bloquer D2 (rispéridone surtout) élève la prolactine : galactorrhée, aménorrhée, troubles sexuels.' },
  sc: { t: 'moelle épinière', fn: 'Contrôle descendant de la douleur ; réflexes sexuels.', sy: 'Douleurs.', fx: 'Les voies descendantes sérotoninergiques et noradrénergiques inhibent la douleur (IRSNa, tricycliques : effet antalgique). La sérotonine y freine l’éjaculation et l’orgasme (troubles sexuels des ISRS).' },
  ap: { t: 'area postrema (zone gâchette)', fn: 'Détection des toxiques, déclenchement des nausées.', sy: '', fx: 'Les récepteurs 5-HT3 y déclenchent nausées et vomissements en début de traitement sérotoninergique ; la mirtazapine et la vortioxétine bloquent 5-HT3.' },
  cer: { t: 'cervelet', fn: 'Coordination, ajustement du mouvement.', sy: '', fx: 'Les projections noradrénergiques y contribueraient au tremblement sous IRSNa ; un syndrome cérébelleux évoque une intoxication au lithium.' }
};
const VSYS_TXT = {
  '5ht': { h: 'Sérotonine · les noyaux du raphé', p: 'Quelques centaines de milliers de neurones, au milieu du tronc cérébral. Les fibres montent vers le cortex, le striatum, l’accumbens, le thalamus, l’hypothalamus, l’amygdale et l’hippocampe ; d’autres gagnent le cervelet, l’area postrema (nausées) et la moelle (douleur, réflexes sexuels).' },
  na: { h: 'Noradrénaline · le locus coeruleus', p: 'Quelques dizaines de milliers de neurones dans le pont (LC). Ils innervent tout le cortex, dont le préfrontal, le thalamus, l’hypothalamus, l’amygdale, l’hippocampe et le cervelet ; des fibres descendent dans la moelle et freinent la douleur.' },
  da: { h: 'Dopamine · quatre voies', p: '**Mésolimbique** : aire tegmentale ventrale (ATV) → noyau accumbens (récompense). **Mésocorticale** : ATV → cortex préfrontal. **Nigrostriée** : substance noire (SN) → striatum (mouvement). **Tubéro-infundibulaire** : noyau arqué → hypophyse (la dopamine freine la prolactine).' }
};
/* Lecture « par médicament » : effets attendus (ok), indésirables (ae) ou mixtes, par région */
const VOIE_DRUG = {
  none: { t: 'Aucune molécule', sys: null, p: '', reg: {} },
  isrs: { t: 'ISRS', sys: ['5ht'], p: 'Le blocage du SERT augmente la sérotonine partout où arrivent les fibres du raphé : les effets voulus et indésirables suivent la carte des projections.', reg: {
    pfc: ['mix', 'Humeur ; parfois émoussement affectif (stimulation 5-HT2C qui freine DA et NA).'], amy: ['mix', 'Anxiolyse à terme ; anxiété ou agitation les premiers jours.'], hyp: ['ae', 'Appétit variable ; rares prises de poids au long cours.'], str: ['ae', 'Akathisie, tremblement, bruxisme (la sérotonine freine la dopamine nigrostriée).'],
    ap: ['ae', 'Nausées des premiers jours (5-HT3).'], sc: ['ae', 'Retard d’éjaculation, anorgasmie, baisse du désir.'], thal: ['ae', 'Insomnie ou somnolence ; rêves vifs.'], hip: ['ok', 'Plasticité et neurogenèse à moyen terme (hypothèse neurotrophique).'] } },
  irsna: { t: 'IRSNa', sys: ['5ht', 'na'], p: 'Sérotonine, et noradrénaline dès que la dose bloque le NET (venlafaxine : au-delà de 150 mg environ). La NA ajoute ses propres cibles.', reg: {
    pfc: ['ok', 'NA et DA augmentent dans le cortex préfrontal (le NET y recapte aussi la dopamine) : énergie, concentration.'], sc: ['mix', 'Effet antalgique par les voies descendantes ; troubles sexuels sérotoninergiques.'], cer: ['ae', 'Tremblement.'], ap: ['ae', 'Nausées (5-HT3), surtout avec la duloxétine et la venlafaxine.'], hyp: ['ae', 'Sueurs, élévation de la pression artérielle et de la fréquence cardiaque (NA périphérique).'] } },
  mirta: { t: 'Mirtazapine', sys: ['na', '5ht'], p: 'Antagoniste α2 : il lève le frein noradrénergique et augmente la libération de NA et de 5-HT. Il bloque aussi 5-HT2A, 5-HT2C, 5-HT3 et surtout H1.', reg: {
    hyp: ['ae', 'Sédation (H1, dès 7,5–15 mg) et prise d’appétit et de poids (H1, 5-HT2C).'], ap: ['ok', 'Pas de nausées : elle bloque 5-HT3.'], sc: ['ok', 'Peu de troubles sexuels : 5-HT2A et 5-HT2C bloqués.'], thal: ['ok', 'Sommeil amélioré.'], pfc: ['ok', 'Désinhibition de la NA et de la DA (blocage 5-HT2C).'] } },
  tca: { t: 'Tricycliques', sys: ['5ht', 'na'], p: 'SERT et NET, mais aussi H1, M1 et α1, et les canaux sodiques cardiaques à forte dose : efficaces, mal tolérés, dangereux en surdosage.', reg: {
    hyp: ['ae', 'Sédation et prise de poids (H1).'], sc: ['mix', 'Antalgiques (voies descendantes) ; troubles sexuels.'], thal: ['ae', 'Somnolence ; confusion du sujet âgé (M1).'], pfc: ['ae', 'Effets anticholinergiques centraux : mémoire, confusion.'] } },
  agom: { t: 'Agomélatine', sys: ['da', 'na'], p: 'Agoniste MT1 et MT2 (horloge du noyau suprachiasmatique) et antagoniste 5-HT2C : la libération de DA et de NA augmente dans le cortex préfrontal, sans sérotonine ajoutée.', reg: {
    pfc: ['ok', 'Désinhibition DA et NA (5-HT2C bloqué).'], hyp: ['ok', 'Resynchronisation du rythme veille-sommeil (MT1, MT2 ; noyau suprachiasmatique).'], sc: ['ok', 'Peu de troubles sexuels.'], ap: ['ok', 'Peu de nausées.'] } },
  lithium: { t: 'Lithium', sys: null, p: 'Pas de récepteur : il agit dans la cellule (IMPase, GSK-3, plasticité). Ses effets indésirables suivent ses organes cibles.', reg: {
    pfc: ['ok', 'Effet anti-suicide démontré.'], hip: ['ok', 'Neuroprotection et BDNF (inhibition de la GSK-3).'], cer: ['ae', 'Tremblement fin ; syndrome cérébelleux si intoxication.'], hyp: ['ae', 'Soif, polyurie (rein) ; prise de poids.'] } },
  apa: { t: 'Antipsychotiques 2G', sys: ['da'], p: 'D2 et 5-HT2A, avec des profils très différents : H1 et 5-HT2C pour la quétiapine et l’olanzapine, agonisme partiel D2 pour l’aripiprazole.', reg: {
    nacc: ['ok', 'Effet antimaniaque (blocage D2 mésolimbique).'], str: ['ae', 'Akathisie (aripiprazole), syndrome extrapyramidal (rispéridone à forte dose).'], pit: ['ae', 'Hyperprolactinémie (rispéridone).'], hyp: ['ae', 'Prise de poids et risque métabolique (olanzapine, quétiapine).'] } }
};
const SYS = { '5ht': { t: 'Sérotonine', k: '5-HT' }, na: { t: 'Noradrénaline', k: 'NA' }, da: { t: 'Dopamine', k: 'DA' } };

VIZ.voies = {
  html(cfg) {
    const deck = cfg.mode === 'deck';
    const ctl = deck && !cfg.controls ? '' : '<div class="vz-ctl"><div class="seg" role="group" aria-label="Systèmes affichés">' + Object.entries(SYS).map(([k, s]) => '<button type="button" class="sys s-' + k + '" data-sys="' + k + '" aria-pressed="true"><i></i>' + s.t + '</button>').join('') + '</div>' + (cfg.drugs !== false ? '<label class="sel"><span>Lire avec</span><select data-drug>' + Object.entries(VOIE_DRUG).map(([k, d]) => '<option value="' + k + '">' + esc(d.t) + '</option>').join('') + '</select></label>' : '') + '</div>';
    return '<div class="voies' + (deck ? ' in-deck' : '') + '">' + ctl + '<div class="voies-grid"><div class="voies-fig">' + voiesSVG('vo' + (cfg.vid || Math.random().toString(36).slice(2, 7))) + '</div><div class="voies-info" aria-live="polite"></div></div></div>';
  },
  mount(el, cfg, mode) {
    const root = $('.voies', el), svg = $('svg', root), info = $('.voies-info', root);
    let on = new Set(cfg.sys || ['5ht', 'na', 'da']), sel = cfg.reg || null, drug = cfg.drug || 'none', hover = null, shown = null;
    const sysChips = arr => '<div class="sys-row">' + arr.map(s => '<span class="sys-tag s-' + s + '"><i></i>' + SYS[s].k + '</span>').join('') + '</div>';
    const reachOf = k => Object.keys(RT).filter(s => RT[s][k]);
    const apply = () => {
      const Dg = VOIE_DRUG[drug] || VOIE_DRUG.none;
      const fxAll = Dg.reg || {}, fx = shown ? Object.fromEntries(Object.entries(fxAll).filter(([r]) => shown.has(r))) : fxAll;
      voiesState(svg, { on, sel, fx });
      $$('.sys', root).forEach(b => b.setAttribute('aria-pressed', on.has(b.dataset.sys)));
      const ds = $('[data-drug]', root); if (ds) ds.value = drug;
      const k = hover || sel, R = VREG[k];
      if (R) info.innerHTML = '<span class="eyebrow">' + (hover && hover !== sel ? 'Au survol' : 'Région') + '</span><h4>' + esc(R.t) + '</h4>' + sysChips(reachOf(k)) + '<p><b>Rôle.</b> ' + md(R.fn) + '</p>' + (R.sy ? '<p><b>Dans la dépression.</b> ' + md(R.sy) + '</p>' : '') + '<p>' + md(R.fx) + '</p>' + (fx[k] ? '<p class="fx-line fx-' + fx[k][0] + '"><b>' + esc(Dg.t) + '.</b> ' + md(fx[k][1]) + '</p>' : '');
      else if (drug !== 'none') info.innerHTML = '<span class="eyebrow">Lecture</span><h4>' + esc(Dg.t) + '</h4><p>' + md(Dg.p) + '</p>' + (Object.keys(fx).length ? '<ul class="fx-list">' + Object.entries(fx).map(([r, v]) => '<li class="fx-' + v[0] + '"><button type="button" class="linklike" data-goreg="' + r + '">' + esc(VREG[r].t) + '</button> · ' + md(v[1]) + '</li>').join('') + '</ul>' : '<p class="note">Les régions concernées s’allument une à une.</p>');
      else if (on.size === 1) { const s = [...on][0], T = VSYS_TXT[s]; info.innerHTML = '<span class="eyebrow">Système</span><h4>' + esc(T.h) + '</h4>' + sysChips([s]) + '<p>' + md(T.p) + '</p><p class="note">Clique sur une région pour suivre la voie qui y mène.</p>'; }
      else info.innerHTML = '<span class="eyebrow">Mode d’emploi</span><h4>Trois systèmes, nés dans le tronc cérébral</h4><p>Quelques centaines de milliers de neurones du raphé (sérotonine) et du mésencéphale (dopamine : ATV, SN), quelques dizaines de milliers dans le locus coeruleus (LC, noradrénaline), sur environ 86 milliards : ils innervent presque tout le cerveau.</p><p class="note">Sous chaque région, une pastille par système qui y arrive. Allume un seul système pour voir ses voies, ou clique sur une région pour ne garder que les voies qui y mènent.</p>';
    };
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-sys]'); if (b) { const k = b.dataset.sys; if (on.has(k) && on.size > 1) on.delete(k); else on.add(k); apply(); return; }
      const r = e.target.closest('[data-reg]'); if (r) { sel = sel === r.dataset.reg ? null : r.dataset.reg; apply(); return; }
      const gr = e.target.closest('[data-goreg]'); if (gr) { sel = gr.dataset.goreg; apply(); }
    });
    root.addEventListener('keydown', e => { const r = e.target.closest('[data-reg]'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sel = sel === r.dataset.reg ? null : r.dataset.reg; apply(); } });
    svg.addEventListener('pointerover', e => { if (mode === 'deck') return; const r = e.target.closest('[data-reg]'); const h = r ? r.dataset.reg : null; if (h !== hover) { hover = h; apply(); } });
    svg.addEventListener('pointerleave', () => { if (hover) { hover = null; apply(); } });
    const ds = $('[data-drug]', root); if (ds) ds.addEventListener('change', () => { drug = ds.value; sel = null; const D2 = VOIE_DRUG[drug]; if (D2 && D2.sys) on = new Set(D2.sys); apply(); });
    apply();
    return {
      step(s) {
        let st = null; const done = cfg.steps.filter(x => x.f <= s); if (done.length) st = done[done.length - 1];
        const base = { sys: cfg.sys || ['5ht', 'na', 'da'], reg: cfg.reg || null, drug: cfg.drug || 'none' }, S = st || base;
        on = new Set(S.sys || base.sys); sel = S.reg !== undefined ? S.reg : base.reg; drug = S.drug || base.drug;
        /* lecture d’une molécule en projection : les effets apparaissent région par région */
        shown = drug !== 'none' ? new Set(done.map(x => x.reg).filter(Boolean)) : null;
        apply();
      },
      start() { root.classList.add('run'); }, stop() { root.classList.remove('run'); }
    };
  }
};
