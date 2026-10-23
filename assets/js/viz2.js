/* Chimioarchitecture — visualisations (2) : empreintes réceptorielles, lithiémie, délai d’action,
   boussole des thymorégulateurs, pharmacopée en tuiles. */
'use strict';

/* ───────── Empreintes réceptorielles ─────────
   Ki en nM (plus petit = plus affin). Une plage « a–b » prend la moyenne géométrique ; « ≥ x », « > x », « x+ » valent x.
   pKi = 9 − log10(Ki nM). Une pastille par affinité, à la manière d’un code QR. */
function parseKi(raw) {
  if (raw === undefined || raw === null) return null; const s = String(raw).replace(/\s/g, '').replace(',', '.');
  if (!s || /^(ND|—|-)$/i.test(s)) return null;
  const m = s.match(/^([<>≥≤]?)([\d.]+)(?:[–-]([\d.]+))?(\+?)$/); if (!m) return null;
  const a = +m[2], b = m[3] ? +m[3] : null; const v = b ? Math.sqrt(a * b) : a;
  return { v, lo: !!(m[1] === '>' || m[1] === '≥' || m[4]), raw: String(raw) };
}
const pKi = ki => 9 - Math.log10(ki);
function affWord(p) { return p >= 9 ? 'très forte (≤ 1 nM)' : p >= 8 ? 'forte (1 à 10 nM)' : p >= 7 ? 'moyenne (10 à 100 nM)' : p >= 6 ? 'faible (0,1 à 1 µM)' : 'négligeable (> 1 µM)'; }
VIZ.empreintes = {
  html(cfg) {
    const B = D.binding; const cols = (cfg.cols || B.cols.map(c => c.id)).map(id => B.cols.find(c => c.id === id)).filter(Boolean);
    const rows = cfg.rows || B.rows; const cw = 34, rh = 30, lw = cfg.mode === 'deck' ? 210 : 176, top = 108;
    const W = lw + cols.length * cw + 12, H = top + rows.length * rh + 14;
    let g = '<svg class="emp-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Affinités des molécules pour leurs cibles">';
    /* familles de colonnes */
    let prev = null; cols.forEach((c, j) => { if (c.fam !== prev) { const n = cols.slice(j).findIndex(cc => cc.fam !== c.fam); const span = (n < 0 ? cols.length - j : n) * cw; const full = B.fams[c.fam] || c.fam, lab = full.length * 8.2 > span - 6 ? ((B.famsShort || {})[c.fam] || full) : full; g += '<g class="fam"><line x1="' + (lw + j * cw + 4) + '" x2="' + (lw + j * cw + span - 4) + '" y1="' + (top - 76) + '" y2="' + (top - 76) + '"/><text x="' + (lw + j * cw + 4) + '" y="' + (top - 84) + '" ' + F_MONO + '><title>' + esc(full) + '</title>' + esc(lab) + '</text></g>'; prev = c.fam; } });
    cols.forEach((c, j) => { const x = lw + j * cw + cw / 2; g += '<g class="colh" data-col="' + c.id + '" tabindex="0" role="button" aria-label="' + esc(plain(c.t)) + '"><rect x="' + (x - cw / 2) + '" y="' + (top - 70) + '" width="' + cw + '" height="' + (H - top + 70) + '" class="colbg"/><text transform="translate(' + (x + 4) + ' ' + (top - 10) + ') rotate(-60)" ' + F_SANS + '>' + typoS(esc(c.t)) + '</text></g>'; });
    let pcls = null; rows.forEach((r, i) => { const M = MOLS[r]; const y = top + i * rh + rh / 2; const cl = M ? M.cls : '';
      if (cl !== pcls) { g += '<line class="clsep" x1="6" x2="' + (W - 6) + '" y1="' + (y - rh / 2) + '" y2="' + (y - rh / 2) + '"/>'; pcls = cl; }
      g += '<g class="rowg" data-row="' + r + '"><rect class="rowbg" x="0" y="' + (y - rh / 2) + '" width="' + W + '" height="' + rh + '"/><text x="' + (lw - 12) + '" y="' + (y + 5) + '" text-anchor="end" class="rl" ' + F_SANS + '>' + esc(M ? M.dci : r) + '</text>';
      cols.forEach((c, j) => { const k = parseKi((B.data[r] || {})[c.id]); const x = lw + j * cw + cw / 2;
        if (!k) { g += '<circle cx="' + x + '" cy="' + y + '" r="1.2" class="nd"/>'; return; }
        const p = pKi(k.v), s = clamp((p - 5) / 4.5, 0.06, 1) * (cw - 8);
        g += '<rect class="cell' + (p < 6 ? ' weak' : '') + '" data-c="' + c.id + '" data-r="' + r + '" x="' + (x - s / 2).toFixed(1) + '" y="' + (y - s / 2).toFixed(1) + '" width="' + s.toFixed(1) + '" height="' + s.toFixed(1) + '" rx="' + (s * 0.32).toFixed(1) + '"/>'; });
      g += '</g>'; });
    g += '</svg>';
    const legend = '<div class="emp-leg"><span class="eyebrow">Affinité (Ki)</span>' + [[9.5, '≤ 1 nM'], [8, '10 nM'], [7, '100 nM'], [6, '1 µM'], [5.4, '> 1 µM']].map(([p, l]) => { const s = clamp((p - 5) / 4.5, 0.06, 1) * 22; return '<span class="lg"><svg width="24" height="24" viewBox="0 0 24 24"><rect x="' + (12 - s / 2) + '" y="' + (12 - s / 2) + '" width="' + s + '" height="' + s + '" rx="' + s * 0.32 + '" class="cell' + (p < 6 ? ' weak' : '') + '"/></svg>' + l + '</span>'; }).join('') + '<span class="note">Plus la pastille est grosse, plus l’affinité est forte. Une affinité ne dit pas l’occupation : elle se compare aux concentrations atteintes aux doses usuelles.</span></div>';
    return '<div class="emp' + (cfg.mode === 'deck' ? ' in-deck' : '') + '"><div class="emp-scroll">' + g + '</div><div class="emp-side"><div class="emp-info" aria-live="polite"></div>' + (cfg.mode === 'deck' ? '' : legend) + '</div></div>';
  },
  mount(el, cfg, mode) {
    const root = $('.emp', el), svg = $('svg', root), info = $('.emp-info', root), B = D.binding;
    let col = cfg.col || null, row = cfg.row || null, hov = null;
    const colInfo = id => { const c = B.cols.find(x => x.id === id); return c ? '<span class="eyebrow">Cible · ' + esc(B.fams[c.fam] || '') + '</span><h4>' + typo(esc(c.t)) + '</h4><p>' + md(c.fx || '') + '</p>' + (c.pane ? '<p><span class="ilink k-target" role="button" tabindex="0" data-pane="' + c.pane + '">Fiche de la cible</span></p>' : '') : ''; };
    const apply = () => {
      $$('.colh', svg).forEach(g => g.classList.toggle('on', g.dataset.col === col));
      $$('.rowg', svg).forEach(g => g.classList.toggle('on', g.dataset.row === row));
      $$('.cell', svg).forEach(c => { c.classList.toggle('hl', (!!col && c.dataset.c === col) || (!!row && c.dataset.r === row)); c.classList.toggle('dim', (!!col && c.dataset.c !== col && (!row || c.dataset.r !== row)) || (!col && !!row && c.dataset.r !== row)); });
      if (hov) { const k = parseKi((B.data[hov.r] || {})[hov.c]); const c = B.cols.find(x => x.id === hov.c); const M = MOLS[hov.r];
        info.innerHTML = '<span class="eyebrow">' + esc(M ? M.dci : hov.r) + ' · ' + typo(esc(c.t)) + '</span><p class="emp-big"><b>Ki ' + esc(k.raw).replace('.', ',') + NB + 'nM</b>' + (k.raw.match(/[–-]/) ? ' <span class="note">(moyenne géométrique ≈ ' + fmt(k.v, k.v < 10 ? 2 : 0) + ')</span>' : '') + '</p><p>Affinité ' + affWord(pKi(k.v)) + '.</p><p>' + md(c.fx || '') + '</p>'; return; }
      if (col) info.innerHTML = colInfo(col);
      else if (row) { const M = MOLS[row]; const top = B.cols.map(c => ({ c, k: parseKi((B.data[row] || {})[c.id]) })).filter(x => x.k).sort((a, b) => a.k.v - b.k.v).slice(0, 4);
        info.innerHTML = '<span class="eyebrow">Molécule</span><h4>' + esc(M ? M.dci : row) + '</h4><p>Cibles les plus affines : ' + top.map(x => typo(esc(x.c.t)) + ' <span class="mono">' + esc(x.k.raw) + NB + 'nM</span>').join(' · ') + '.</p>' + (M ? '<p><span class="ilink k-mol" role="button" tabindex="0" data-pane="' + row + '">Fiche de la molécule</span></p>' : ''); }
      else info.innerHTML = '<span class="eyebrow">Lire la matrice</span><p>Une ligne par molécule, une colonne par cible. Survole une pastille pour lire la valeur ; clique sur une colonne pour voir ce qu’entraîne l’action sur cette cible, ou sur un nom pour l’empreinte d’une molécule.</p><p class="note">' + esc(B.src) + '</p>';
    };
    svg.addEventListener('pointermove', e => { const c = e.target.closest('.cell'); const n = c ? { r: c.dataset.r, c: c.dataset.c } : null; if (JSON.stringify(n) !== JSON.stringify(hov)) { hov = n; apply(); } });
    svg.addEventListener('pointerleave', () => { hov = null; apply(); });
    svg.addEventListener('click', e => { const ch = e.target.closest('.colh'); const rg = e.target.closest('.rowg');
      if (e.target.closest('.cell')) { const c = e.target.closest('.cell'); row = c.dataset.r; col = c.dataset.c; hov = null; apply(); return; }
      if (rg && (e.target.classList.contains('rl') || e.target.classList.contains('rowbg'))) { row = row === rg.dataset.row ? null : rg.dataset.row; col = null; apply(); return; }
      if (ch) { col = col === ch.dataset.col ? null : ch.dataset.col; apply(); } });
    svg.addEventListener('keydown', e => { const ch = e.target.closest('.colh'); if (ch && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); col = ch.dataset.col; apply(); } });
    apply();
    return { step(s) { let st = null; cfg.steps.forEach(x => { if (x.f <= s) st = x; }); col = st ? (st.col || null) : (cfg.col || null); row = st ? (st.row || null) : (cfg.row || null); hov = null; apply(); } };
  }
};

/* ───────── Lithiémie : modèle à un compartiment, absorption d’ordre 1 ─────────
   250 mg de carbonate de lithium = 6,8 mEq (Téralithe 250) ; LP 400 = 10,8 mEq (RCP). V ≈ 0,7 L/kg ;
   clairance du lithium ≈ 25 % du DFG (filtré, puis réabsorbé avec le sodium au tube proximal) ; t½ ≈ 24 h chez l’adulte.
   Facteurs d’interaction : ordres de grandeur pédagogiques (les effets réels varient de +10 % à ×4). */
const LI_INT = {
  ains: { t: 'AINS (ibuprofène, kétoprofène…)', f: 0.75, on: 4, note: 'souvent +20 à +40 %, parfois bien plus ; dès la première semaine' },
  thz: { t: 'Diurétique thiazidique', f: 0.68, on: 5, note: '+25 % à ×4, imprévisible ; en 3 à 10 jours' },
  iec: { t: 'IEC ou sartan', f: 0.72, on: 21, note: 'jusqu’à ×4, d’installation lente (plusieurs semaines)' },
  dehy: { t: 'Gastro-entérite, canicule, fièvre', f: 0.55, on: 1.5, note: 'déshydratation et perte de sodium : la réabsorption du lithium augmente' },
  sel: { t: 'Régime sans sel', f: 0.82, on: 5, note: 'moins de sodium, plus de lithium réabsorbé' }
};
function liSim(o) {
  const V = 0.7 * o.kg, ka = o.form === 'lp' ? 0.3 : 1.3, mEq = o.form === 'lp' ? 10.8 : 6.8;
  const doses = []; const perDay = o.tabs; /* nombre de comprimés par jour */
  const sched = o.form === 'lp' ? [[20, perDay]] : perDay <= 2 ? [[8, perDay / 2], [20, perDay / 2]] : [[8, Math.floor(perDay / 3)], [12, Math.floor(perDay / 3)], [20, perDay - 2 * Math.floor(perDay / 3)]];
  for (let d = 0; d < o.days; d++) sched.forEach(([h, n]) => { if (n > 0) doses.push(d * 24 + h); });
  const amt = {}; doses.forEach(t => amt[t] = (amt[t] || 0)); sched.forEach(([h, n]) => { for (let d = 0; d < o.days; d++) amt[d * 24 + h] = n * mEq; });
  const dt = 0.25, N = Math.round(o.days * 24 / dt); let A = 0, C = 0; const out = [];
  const clBase = 0.25 * o.gfr * 0.06; /* L/h */
  for (let i = 0; i <= N; i++) {
    const t = i * dt; if (amt[t]) A += amt[t];
    let f = 1; (o.ints || []).forEach(x => { const I = LI_INT[x.k]; if (!I) return; if (t >= x.from * 24 && t < (x.to || 999) * 24) { const ramp = clamp((t - x.from * 24) / (I.on * 24), 0, 1); f *= 1 - (1 - I.f) * ramp; } });
    const CL = clBase * f, k = CL / V;
    const abs = ka * A * dt; A -= abs; C += abs / V; C -= k * C * dt; if (i % 2 === 0) out.push([t, C, CL]);
  }
  return { pts: out, thalf: Math.LN2 * V / clBase };
}
/* ───────── Introduire le lithium : la titration de Téralithe LP 400 ─────────
   D’après le RCP : 1 à 2 comprimés en une prise au dîner (vers 20 h), lithiémies à J7, J14 et si besoin J21,
   paliers d’un demi-comprimé ; cibles : 0,8–1,2 mEq/L le matin (12 h après la prise), 0,5–0,8 le soir (24 h).
   Patiente fictive de 70 kg, DFG 75 mL/min, même modèle que la simulation : les valeurs sont calculées. */
const LI_TITR = { kg: 70, gfr: 75, days: 28, plan: [[0, 1], [6, 1.5], [13, 2]], smp: [6, 13, 20, 27] };
const LI_TT_G = { W: 960, H: 500, L: 58, R: 22, T: 22, PB: 384 };
const LI_TT_DEC = ['+ ½ comprimé : **1 comprimé ½** le soir', '+ ½ comprimé : **2 comprimés** le soir', 'Dose d’entretien : **2 comprimés**. Lithiémie chaque semaine le premier mois, puis chaque mois le premier trimestre, puis tous les deux mois'];
function liTitrSim(o) {
  const V = 0.7 * o.kg, ka = 0.3, mEq = 10.8, cl = 0.25 * o.gfr * 0.06, dt = 0.25;
  const nOf = d => { let n = 0; o.plan.forEach(([from, k]) => { if (d >= from) n = k; }); return n; };
  let A = 0, C = 0; const pts = [];
  for (let i = 0; i <= o.days * 24 / dt; i++) { const t = i * dt; if (t % 24 === 20) A += nOf(Math.floor(t / 24)) * mEq; const abs = ka * A * dt; A -= abs; C += abs / V; C -= cl / V * C * dt; if (i % 2 === 0) pts.push([t, C]); }
  return { pts, nOf, at: h => pts.reduce((a, b) => Math.abs(b[0] - h) < Math.abs(a[0] - h) ? b : a)[1] };
}
const ttTab = (x, y, half) => half ? '<path class="tab-b" d="M' + x + ' ' + (y - 4.5) + ' L ' + (x - 4.5) + ' ' + (y - 4.5) + ' A 4.5 4.5 0 0 0 ' + (x - 4.5) + ' ' + (y + 4.5) + ' L ' + x + ' ' + (y + 4.5) + ' Z"/>' : '<rect class="tab-b" x="' + (x - 9) + '" y="' + (y - 4.5) + '" width="18" height="9" rx="4.5"/><path class="tab-l" d="M' + x + ' ' + (y - 3) + ' L ' + x + ' ' + (y + 3) + '"/>';
function liTitrHTML(cfg) {
  const O = LI_TITR, r = liTitrSim(O), { W, H, L, R, T, PB } = LI_TT_G, ymax = 1.4, TT = O.days * 24, u = 'tt' + Math.random().toString(36).slice(2, 7);
  const X = t => L + (W - L - R) * t / TT, Y = c => T + (PB - T) * (1 - clamp(c, 0, ymax) / ymax);
  /* l’état fixe est l’état final (vignettes, impression) ; le montage revient au début et anime */
  let g = '<defs><clipPath id="' + u + 'c"><rect class="tt-clip" x="' + L + '" y="0" width="' + (W - L - R + 1) + '" height="' + H + '"/></clipPath></defs>';
  g += '<rect class="b-ev" x="' + L + '" y="' + Y(0.8) + '" width="' + (W - L - R) + '" height="' + (Y(0.5) - Y(0.8)) + '"/>';
  g += '<rect class="b-ok" x="' + L + '" y="' + Y(1.2) + '" width="' + (W - L - R) + '" height="' + (Y(0.8) - Y(1.2)) + '"/>';
  for (let c = 0; c <= ymax + 1e-9; c += 0.2) g += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(c) + '" y2="' + Y(c) + '"/><text x="' + (L - 9) + '" y="' + (Y(c) + 4) + '" text-anchor="end" class="ax" ' + F_MONO + '>' + fmt(c, 1) + '</text>';
  /* les étiquettes des cibles à gauche : la courbe n’y est pas encore montée */
  g += '<text class="bl" x="' + (L + 10) + '" y="' + (Y(1.2) + 18) + '" ' + F_SANS + '>○ cible du matin, 12 h après la prise : 0,8–1,2 mEq/L</text>';
  g += '<text class="bl bl-ev" x="' + (L + 10) + '" y="' + (Y(0.8) + 18) + '" ' + F_SANS + '>● cible du soir, 24 h après la prise : 0,5–0,8</text>';
  g += '<text class="ax" x="' + (L - 9) + '" y="' + (T - 8) + '" text-anchor="end" ' + F_MONO + '>mEq/L</text>';
  [0, 6, 13, 20, 27].forEach(d => { g += '<text x="' + X(d * 24) + '" y="' + (PB + 19) + '" text-anchor="middle" class="ax" ' + F_MONO + '>J' + (d + 1) + '</text>'; });
  for (let d = 0; d <= O.days; d++) g += '<line class="dtick" x1="' + X(d * 24) + '" x2="' + X(d * 24) + '" y1="' + PB + '" y2="' + (PB + 4) + '"/>';
  g += '<path class="li-c" clip-path="url(#' + u + 'c)" d="' + r.pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ') + '"/>';
  g += '<circle class="tt-head" r="5" cx="' + L + '" cy="' + Y(0) + '"/>';
  /* les prises du soir : un comprimé entier, un demi */
  g += '<text class="lane-t" x="' + L + '" y="' + (PB + 46) + '" ' + F_MONO + '>COMPRIMÉS DE TÉRALITHE LP 400, PRIS AU DÎNER</text>';
  for (let d = 0; d < O.days; d++) { const n = r.nOf(d), x = X(d * 24 + 20); let tb = ''; for (let k = 0; k < Math.ceil(n); k++) tb += ttTab(x, PB + 64 + k * 13, n - k === 0.5); g += '<g class="tab on" data-t="' + (d * 24 + 20) + '">' + tb + '</g>'; }
  /* prélèvements : le matin (○) puis, à la fin, le soir (●) */
  O.smp.forEach((d, i) => { const t = d * 24 + 8, c = r.at(t); g += '<g class="smp-g on" data-t="' + t + '"><line class="smp-v" x1="' + X(t) + '" x2="' + X(t) + '" y1="' + (Y(c) + 7) + '" y2="' + PB + '"/><circle class="smp m" cx="' + X(t) + '" cy="' + Y(c) + '" r="7"/><text class="smp-t" x="' + X(t) + '" y="' + (Y(c) - 14) + '" text-anchor="middle" ' + F_MONO + '>' + fmt(c, 2) + '</text></g>'; });
  const te = 27 * 24 + 19.75, ce = r.at(te);
  g += '<g class="smp-g ev on" data-ev="1"><circle class="smp e" cx="' + X(te) + '" cy="' + Y(ce) + '" r="7"/><text class="smp-t" x="' + (X(te) - 10) + '" y="' + (Y(ce) + 26) + '" text-anchor="middle" ' + F_MONO + '>' + fmt(ce, 2) + '</text></g>';
  g += '<text class="tt-now" x="' + (L + 14) + '" y="' + (T + 24) + '" ' + F_MONO + '></text>';
  const verdict = c => c < 0.8 ? 'sous la cible' : c <= 1.2 ? 'dans la cible' : 'au-dessus de la cible';
  const log = '<ol class="tt-log">' + '<li data-ph="0"><span class="tt-d">J1</span><span>On débute : <b>1 comprimé</b> au dîner, vers 20 h.</span></li>' +
    O.smp.map((d, i) => { const c = r.at(d * 24 + 8); return '<li data-smp="' + i + '"><span class="tt-d">J' + (d + 1) + '</span><span><i class="dot m"></i>Lithiémie du matin : <b>' + fmt(c, 2) + NB + 'mEq/L</b>, ' + (i === 3 ? 'stable' : verdict(c)) + '.' + (LI_TT_DEC[i] ? '<span class="tt-dec" data-dec="' + i + '"> → ' + md(LI_TT_DEC[i]) + '.</span>' : '<span class="tt-dec" data-dec="3"> <i class="dot e"></i>Le même soir, juste avant la prise : <b>' + fmt(ce, 2) + '</b>, dans la cible du soir.</span>') + '</span></li>'; }).join('') + '</ol>';
  const leg = '<p class="tt-leg"><span><i class="dot m"></i>le matin vers 8 h, 12 h après la prise du soir</span><span><i class="dot e"></i>le soir vers 20 h, 24 h après, juste avant la prise suivante</span></p>';
  const ctl = cfg.mode === 'deck' ? '' : '<div class="tt-ctl"><button type="button" class="btn small" data-tt="next">Semaine suivante ' + arrow('r', 'btn-arw') + '</button><button type="button" class="btn ghost small" data-tt="reset">Recommencer</button></div>';
  return '<div class="tt show-ev' + (cfg.mode === 'deck' ? ' in-deck' : '') + '"><div class="tt-fig"><svg class="tt-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Titration de Téralithe LP 400 sur quatre semaines : lithiémie et comprimés">' + g + '</svg>' + leg + '</div><div class="tt-side"><p class="tt-who"><span class="eyebrow">Patiente fictive</span>70 kg, DFG 75 mL/min, sans interaction</p>' + log + ctl + '<p class="note">Modèle pédagogique : il illustre la démarche et ne sert pas à doser un patient.</p></div></div>';
}
function liTitrMount(el, cfg, mode) {
  const root = $('.tt', el), svg = $('svg', root), O = LI_TITR, TT = O.days * 24, { W, L, R, T, PB } = LI_TT_G;
  const X = t => L + (W - L - R) * t / TT;
  const r = liTitrSim(O), Y = c => T + (PB - T) * (1 - clamp(c, 0, 1.4) / 1.4);
  const GOAL = [6 * 24 + 8, 13 * 24 + 8, 20 * 24 + 8, 27 * 24 + 8, 27 * 24 + 19.75];
  const RM = reduceMotion();
  let ph = 0, shown = 0, goal = GOAL[0], raf = null, last = 0, started = false;
  const clip = $('.tt-clip', svg), head = $('.tt-head', svg), now = $('.tt-now', svg);
  const draw = () => {
    clip.setAttribute('width', Math.max(0, X(shown) - L + 1).toFixed(1));
    const c = r.at(shown); head.setAttribute('cx', X(shown).toFixed(1)); head.setAttribute('cy', Y(c).toFixed(1)); head.classList.toggle('on', shown > 0 && shown < goal - 0.01);
    /* la dose en cours est celle de la dernière prise (à 20 h) */
    const d = Math.floor(shown / 24), dd = shown % 24 < 20 ? d - 1 : d; now.textContent = shown > 0 ? 'J' + (d + 1) + (dd >= 0 ? ' · ' + (r.nOf(Math.min(dd, O.days - 1)) + '').replace('.5', ' ½') + ' cp/j' : '') : '';
    $$('.tab', svg).forEach(t => t.classList.toggle('on', +t.dataset.t <= shown + 0.01));
    $$('.smp-g[data-t]', svg).forEach(s => s.classList.toggle('on', +s.dataset.t <= shown + 0.01));
    $('.smp-g.ev', svg).classList.toggle('on', ph >= 4 && shown >= GOAL[4] - 0.01);
    root.classList.toggle('show-ev', ph >= 4);
    $$('[data-smp]', root).forEach(li => { const i = +li.dataset.smp; li.hidden = !(GOAL[i] <= shown + 0.01); });
    $$('.tt-dec', root).forEach(x => { const i = +x.dataset.dec; x.hidden = !(ph > i); });
    const nx = $('[data-tt="next"]', root); if (nx) nx.disabled = ph >= 4;
  };
  const frame = ts => { const dt = Math.min(40, ts - (last || ts)); last = ts; shown = Math.min(goal, shown + dt * (168 / 2400)); draw(); if (shown < goal) raf = requestAnimationFrame(frame); else raf = null; };
  const go = (p, instant) => { ph = clamp(p, 0, 4); goal = GOAL[ph]; if (raf) cancelAnimationFrame(raf); raf = null; if (instant || RM || shown > goal) { shown = goal; draw(); return; } draw(); last = 0; raf = requestAnimationFrame(frame); };
  root.addEventListener('click', e => { const b = e.target.closest('[data-tt]'); if (!b) return; if (b.dataset.tt === 'next') go(ph + 1); else { shown = 0; go(0); } });
  draw();
  return {
    start() { if (!started) { started = true; go(ph); } },
    stop() { if (raf) cancelAnimationFrame(raf); raf = null; if (shown < goal) { shown = goal; draw(); } },
    step(s) { let k = 0; cfg.steps.forEach(x => { if (x.f <= s) k++; }); started = true; go(k, Math.abs(k - ph) > 1 || k < ph); },
    destroy() { if (raf) cancelAnimationFrame(raf); }
  };
}

VIZ.lithium = {
  html(cfg) {
    if (cfg.titr) return liTitrHTML(cfg);
    const ints = Object.entries(LI_INT).map(([k, I]) => '<label class="chk"><input type="checkbox" data-int="' + k + '"><span>' + esc(I.t) + '<small>' + esc(I.note) + '</small></span></label>').join('');
    return '<div class="li' + (cfg.mode === 'deck' ? ' in-deck' : '') + '"><div class="li-ctl"><div class="seg" role="group" aria-label="Forme"><button type="button" data-form="li" aria-pressed="true">Téralithe 250 (LI)</button><button type="button" data-form="lp" aria-pressed="false">Téralithe LP 400</button></div>' +
      '<label class="rng"><span>Comprimés par jour</span><input type="range" min="1" max="6" value="3" data-tabs><output class="mono"></output></label>' +
      '<label class="rng"><span>Débit de filtration glomérulaire</span><input type="range" min="30" max="120" step="5" value="75" data-gfr><output class="mono"></output></label>' +
      '<fieldset class="li-ints"><legend class="eyebrow">À partir du 10ᵉ jour</legend>' + ints + '</fieldset></div>' +
      '<div class="li-fig"><div class="li-plot"><svg class="li-svg" viewBox="0 0 760 330" role="img" aria-label="Lithiémie simulée sur 21 jours"></svg><p class="tt-leg li-leg"></p></div><div class="li-read" aria-live="polite"></div></div></div>';
  },
  mount(el, cfg, mode) {
    if (cfg.titr) return liTitrMount(el, cfg, mode);
    const root = $('.li', el); let form = cfg.form || 'li', tabs = cfg.tabs || 3, gfr = cfg.gfr || 75, ints = new Set(cfg.ints || []);
    const draw = () => {
      const r = liSim({ form, tabs, gfr, kg: 70, days: 21, ints: [...ints].map(k => ({ k, from: 10 })) });
      const W = 760, H = 330, L = 44, R = 112, T = 16, Bm = 34, ymax = 2;
      const X = t => L + (W - L - R) * t / (21 * 24), Y = c => T + (H - T - Bm) * (1 - clamp(c, 0, ymax) / ymax);
      let g = '';
      /* les bandes sont nommées dans la marge de droite : aucune étiquette ne croise la courbe */
      const band = (a, b, cls, l1, l2) => { g += '<rect class="' + cls + '" x="' + L + '" y="' + Y(b) + '" width="' + (W - L - R) + '" height="' + (Y(a) - Y(b)) + '"/>'; if (l1) { const ym = (Y(a) + Y(b)) / 2; g += '<text class="bl" x="' + (W - R + 10) + '" y="' + (ym + (l2 ? -3 : 4)) + '" ' + F_SANS + '>' + l1 + '</text>' + (l2 ? '<text class="bl bl2" x="' + (W - R + 10) + '" y="' + (ym + 12) + '" ' + F_MONO + '>' + l2 + '</text>' : ''); } };
      if (form === 'lp') { band(0.5, 0.8, 'b-ok b-e', '● cible du soir', '0,5–0,8'); band(0.8, 1.2, 'b-ok', '○ cible du matin', '0,8–1,2'); } else { band(0.5, 0.8, 'b-ok', '○ cible du matin', '0,5–0,8'); band(0.8, 1.2, 'b-mid', 'à justifier'); }
      band(1.2, 1.5, 'b-warn', 'surveiller'); band(1.5, 2, 'b-tox', 'intoxication');
      for (let c = 0; c <= ymax; c += 0.5) g += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(c) + '" y2="' + Y(c) + '"/><text x="' + (L - 8) + '" y="' + (Y(c) + 4) + '" text-anchor="end" class="ax" ' + F_MONO + '>' + fmt(c, 1) + '</text>';
      for (let d = 0; d <= 21; d += 7) g += '<text x="' + X(d * 24) + '" y="' + (H - 12) + '" text-anchor="middle" class="ax" ' + F_MONO + '>J' + d + '</text>';
      if (ints.size) g += '<line class="evt" x1="' + X(240) + '" x2="' + X(240) + '" y1="' + T + '" y2="' + (H - Bm) + '"/><text x="' + (X(240) + 6) + '" y="' + (T + 12) + '" class="ax" ' + F_SANS + '>J10 : ' + [...ints].map(k => LI_INT[k].t.split(' (')[0].toLowerCase()).join(' + ') + '</text>';
      g += '<path class="li-c" d="' + r.pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1)).join(' ') + '"/>';
      /* prélèvements : le matin vers 8 h (○, 12 h après la prise de 20 h) ; pour la LP, aussi le soir vers 20 h (●, 24 h après, juste avant la prise) */
      const at = h => { const p = r.pts.reduce((a, b) => Math.abs(b[0] - h) < Math.abs(a[0] - h) ? b : a); return p[1]; };
      const marks = []; [5, 7, 14, 17, 20].forEach(d => { marks.push([d * 24 + 8, at(d * 24 + 8), 'm']); if (form === 'lp') marks.push([d * 24 + 20, at(d * 24 + 19.9), 'e']); });
      marks.forEach(([t, c, k]) => g += '<circle class="smp ' + k + '" cx="' + X(t).toFixed(1) + '" cy="' + Y(c).toFixed(1) + '" r="5"><title>' + (k === 'm' ? 'Prélèvement du matin, 12 h après la prise' : 'Prélèvement du soir, 24 h après la prise') + ' · J' + Math.floor(t / 24) + ' · ' + fmt(c, 2) + ' mEq/L</title></circle>');
      $('.li-svg', root).innerHTML = g;
      $('.li-leg', root).innerHTML = '<span><i class="dot m"></i>prélèvement du matin vers 8 h, 12 h après la prise du soir</span>' + (form === 'lp' ? '<span><i class="dot e"></i>prélèvement du soir vers 20 h, 24 h après, juste avant la prise</span>' : '');
      const m7 = at(7 * 24 + 8), e7 = at(7 * 24 + 19.9), m20 = at(20 * 24 + 8), e20 = at(20 * 24 + 19.9);
      const tox = r.pts.some(p => p[1] > 1.2);
      const two = (m, e) => '<i class="dot m"></i>' + fmt(m, 2) + (form === 'lp' ? ' <i class="dot e"></i>' + fmt(e, 2) : '');
      $('.li-read', root).innerHTML = '<div class="li-kpi"><span>Demi-vie estimée</span><b>' + fmt(r.thalf, 0) + NB + 'h</b><span class="note">équilibre en ≈ 5 demi-vies : ' + fmt(5 * r.thalf / 24, 0) + NB + 'jours</span></div>' +
        '<div class="li-kpi"><span>J7' + (form === 'lp' ? ', matin et soir' : ', le matin') + '</span><b>' + two(m7, e7) + '</b><span class="note">mEq/L</span></div>' +
        (ints.size ? '<div class="li-kpi warn"><span>J20' + (form === 'lp' ? ', matin et soir' : ', le matin') + '</span><b>' + two(m20, e20) + '</b><span class="note">soit ' + (m20 >= m7 ? '+' : '') + Math.round((m20 / m7 - 1) * 100) + NB + '% sans changer la dose</span></div>' : '') +
        '<p class="note">' + (tox ? '<b>Au-delà de 1,2 mEq/L</b> : rechercher tremblement grossier, diarrhée, vomissements, ataxie, confusion ; doser, suspendre, hydrater. ' : '') + 'Modèle pédagogique (adulte de 70 kg) : il illustre des mécanismes et ne sert pas à doser un patient.</p>';
      $$('[data-form]', root).forEach(b => b.setAttribute('aria-pressed', b.dataset.form === form));
      const tb = $('[data-tabs]', root); tb.value = tabs; tb.nextElementSibling.textContent = tabs + ' × ' + (form === 'lp' ? '400' : '250') + ' mg = ' + (tabs * (form === 'lp' ? 400 : 250)) + ' mg';
      const gf = $('[data-gfr]', root); gf.value = gfr; gf.nextElementSibling.textContent = gfr + ' mL/min';
      $$('[data-int]', root).forEach(c => { c.checked = ints.has(c.dataset.int); });
    };
    root.addEventListener('click', e => { const b = e.target.closest('[data-form]'); if (b) { form = b.dataset.form; tabs = form === 'lp' ? Math.min(tabs, 4) : tabs; draw(); } });
    root.addEventListener('input', e => { if (e.target.matches('[data-tabs]')) { tabs = +e.target.value; draw(); } if (e.target.matches('[data-gfr]')) { gfr = +e.target.value; draw(); } });
    root.addEventListener('change', e => { if (e.target.matches('[data-int]')) { e.target.checked ? ints.add(e.target.dataset.int) : ints.delete(e.target.dataset.int); draw(); } });
    draw();
    return { step(s) { let st = null; cfg.steps.forEach(x => { if (x.f <= s) st = x; }); const S0 = st || {}; form = S0.form || cfg.form || 'li'; tabs = S0.tabs || cfg.tabs || 3; gfr = S0.gfr || cfg.gfr || 75; ints = new Set(S0.ints || cfg.ints || []); draw(); } };
  }
};

/* ───────── Le délai d’action (arche à la flèche, planche 10) ───────── */
VIZ.delai = {
  html(cfg) {
    const K = [['S1–S2', 'Revoir le patient : tolérance, observance, idées suicidaires, virage.'], ['S2', 'Au moins 20 % d’amélioration ? Sinon, une réponse ultérieure devient peu probable.'], ['S4–S8', 'Évaluer la réponse (HAS) ; entre S6 et S12 chez le sujet âgé.']];
    return '<div class="delai"><svg class="delai-svg" viewBox="0 0 900 380" role="img" aria-label="Évolution sur huit semaines : blocage du transporteur, effets indésirables, amélioration clinique"></svg><ol class="delai-k">' + K.map((x, i) => '<li data-k="' + (i + 4) + '"><b class="mono">' + x[0] + '</b><span>' + md(x[1]) + '</span></li>').join('') + '</ol></div>';
  },
  mount(el, cfg) {
    const svg = $('svg', el); let lvl = 9;
    const draw = () => {
      const W = 900, H = 380, L = 60, R = 30, T = 40, B = 60, X = w => L + (W - L - R) * w / 8, Y = v => T + (H - T - B) * (1 - v);
      let g = '<line class="ax" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(0) + '" y2="' + Y(0) + '"/>';
      for (let w = 0; w <= 8; w++) g += '<line class="tk" x1="' + X(w) + '" x2="' + X(w) + '" y1="' + Y(0) + '" y2="' + (Y(0) + 6) + '"/><text x="' + X(w) + '" y="' + (Y(0) + 24) + '" text-anchor="middle" class="ax" ' + F_MONO + '>S' + w + '</text>';
      const curve = (f, cls) => { let d = ''; for (let w = 0; w <= 8; w += 0.05) d += (d ? ' L ' : 'M ') + X(w).toFixed(1) + ' ' + Y(f(w)).toFixed(1); return '<path class="' + cls + '" d="' + d + '"/>'; };
      const occ = w => w < 0.08 ? w / 0.08 * 0.8 : 0.8, ae = w => (w < 0.6 ? w / 0.6 : Math.exp(-(w - 0.6) / 1.6)) * 0.62, eff = w => 0.85 / (1 + Math.exp(-(w - 3.2) / 0.75)) * (w > 0.2 ? 1 : w / 0.2);
      const parts = [
        [6, () => '<g class="mk m3"><rect x="' + X(4) + '" y="' + T + '" width="' + (X(8) - X(4)) + '" height="' + (Y(0) - T) + '"/><text x="' + X(6) + '" y="' + (T + 22) + '" text-anchor="middle" ' + F_MONO + '>S4–S8</text></g>'],
        [1, () => curve(occ, 'c-occ') + '<text x="' + X(0.25) + '" y="' + (Y(0.8) - 12) + '" class="lb" ' + F_SANS + '>Occupation du SERT ≈ 80 % dès les premiers jours</text>'],
        [2, () => curve(ae, 'c-ae') + '<text x="' + X(1.15) + '" y="' + (Y(ae(1.15)) - 12) + '" class="lb ae" ' + F_SANS + '>Effets indésirables : d’emblée, puis tolérance</text>'],
        [3, () => curve(eff, 'c-eff') + '<text x="' + X(7.9) + '" y="' + (Y(eff(7.9)) + 30) + '" text-anchor="end" class="lb eff" ' + F_SANS + '>Amélioration clinique</text>'],
        [4, () => '<g class="mk"><line x1="' + X(1) + '" x2="' + X(1) + '" y1="' + Y(0) + '" y2="' + T + '"/><line x1="' + X(2) + '" x2="' + X(2) + '" y1="' + Y(0) + '" y2="' + T + '"/><text x="' + X(1.5) + '" y="' + (T - 12) + '" text-anchor="middle" ' + F_MONO + '>S1–S2</text></g>'],
        [5, () => '<g class="mk m2"><circle cx="' + X(2) + '" cy="' + Y(eff(2)) + '" r="8"/><text x="' + (X(2) + 14) + '" y="' + (Y(eff(2)) + 22) + '" ' + F_MONO + '>S2</text></g>']
      ];
      parts.forEach(([n, f]) => { if (lvl >= n) g += f(); });
      svg.innerHTML = g;
      $$('.delai-k li', el).forEach(li => li.classList.toggle('on', lvl >= +li.dataset.k));
    };
    draw();
    return { step(s) { let k = 0; cfg.steps.forEach((x, i) => { if (x.f <= s) k = x.lvl || i + 1; }); lvl = cfg.steps.length ? k : 9; draw(); } };
  }
};

/* ───────── Boussole des thymorégulateurs ─────────
   Axe vertical : manie en haut, dépression en bas. Pour chaque molécule : traiter (épisode aigu) et prévenir,
   par le haut (manie) et par le bas (dépression), d’après CANMAT/ISBD 2018 (1re et 2e lignes) et l’AMM française. */
VIZ.thymo = {
  html(cfg) {
    const A = D.thymo || [];
    return '<div class="thymo"><div class="th-pick" role="group" aria-label="Molécule">' + A.map((a, i) => '<button type="button" data-th="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(a.t) + '</button>').join('') + '</div><div class="th-grid"><svg class="th-svg" viewBox="0 0 520 440" role="img" aria-label="Actions par le haut et par le bas"></svg><div class="th-info" aria-live="polite"></div></div></div>';
  },
  mount(el, cfg) {
    const root = $('.thymo', el), A = D.thymo || []; let i = cfg.i || 0;
    const lv = v => v === 1 ? '1re ligne' : v === 2 ? '2e ligne' : v === 'amm' ? 'AMM' : '';
    const draw = () => {
      const a = A[i]; const W = 520, H = 440, cx = 260;
      let g = '<rect x="150" y="20" width="220" height="400" rx="110" class="th-cap"/><line x1="' + cx + '" x2="' + cx + '" y1="40" y2="400" class="th-ax"/><text x="' + cx + '" y="14" text-anchor="middle" class="th-pole" ' + F_MONO + '>MANIE</text><text x="' + cx + '" y="436" text-anchor="middle" class="th-pole" ' + F_MONO + '>DÉPRESSION</text><text x="' + (cx + 14) + '" y="224" class="th-eu" ' + F_SANS + '>euthymie</text>';
      const arr = (y1, y2, x, v, lab, side) => { if (!v) return '<g class="th-a off"><line x1="' + x + '" x2="' + x + '" y1="' + y1 + '" y2="' + y2 + '"/><text x="' + (x + (side < 0 ? -12 : 12)) + '" y="' + ((y1 + y2) / 2) + '" text-anchor="' + (side < 0 ? 'end' : 'start') + '" ' + F_SANS + '>' + lab + '</text></g>'; const dir = y2 > y1 ? 1 : -1; return '<g class="th-a v' + v + '"><line x1="' + x + '" x2="' + x + '" y1="' + y1 + '" y2="' + y2 + '"/><path d="M' + (x - 8) + ' ' + (y2 - dir * 12) + ' L ' + x + ' ' + y2 + ' L ' + (x + 8) + ' ' + (y2 - dir * 12) + '" fill="none"/><text x="' + (x + (side < 0 ? -12 : 12)) + '" y="' + ((y1 + y2) / 2) + '" text-anchor="' + (side < 0 ? 'end' : 'start') + '" ' + F_SANS + '>' + lab + ' · ' + lv(v) + '</text></g>'; };
      const bar = (y, v, lab) => '<g class="th-b' + (v ? ' v' + v : ' off') + '"><line x1="180" x2="340" y1="' + y + '" y2="' + y + '"/><text x="350" y="' + (y + 5) + '" ' + F_SANS + '>' + lab + (v ? ' · ' + lv(v) : '') + '</text></g>';
      g += arr(40, 170, 200, a.tm, 'traite la manie', -1) + arr(400, 270, 200, a.td, 'traite la dépression', -1) + bar(120, a.pm, 'prévient la manie') + bar(320, a.pd, 'prévient la dépression');
      $('.th-svg', root).innerHTML = g;
      $('.th-info', root).innerHTML = '<span class="eyebrow">' + esc(a.cls || '') + '</span><h4>' + esc(a.t) + '</h4><p>' + md(a.p) + '</p>' + (a.fr ? '<p class="note"><b>AMM en France.</b> ' + md(a.fr) + '</p>' : '') + (a.mol ? '<p><span class="ilink k-mol" role="button" tabindex="0" data-pane="' + a.mol + '">Fiche de la molécule</span></p>' : '');
      $$('[data-th]', root).forEach(b => b.setAttribute('aria-pressed', +b.dataset.th === i));
    };
    root.addEventListener('click', e => { const b = e.target.closest('[data-th]'); if (b) { i = +b.dataset.th; draw(); } });
    draw();
    return { step(s) { let st = null; cfg.steps.forEach(x => { if (x.f <= s) st = x; }); i = st ? st.i : (cfg.i || 0); draw(); } };
  }
};

/* ───────── Pharmacopée en tuiles fusionnées (planche 4) ───────── */
const FILTERS = [
  ['sed', 'Sédatif'], ['nonsed', 'Peu sédatif'], ['poids', 'Prise de poids fréquente'], ['poidsneutre', 'Plutôt neutre sur le poids'], ['sex', 'Troubles sexuels fréquents'], ['sexrare', 'Troubles sexuels rares'],
  ['qt', 'Allongement du QT'], ['surdos', 'Dangereux en surdosage'], ['cyp', 'Interactions CYP majeures'], ['sevrage', 'Arrêt délicat'], ['age', 'Adapté au sujet âgé'], ['grossesse', 'Données nombreuses en grossesse'], ['douleur', 'Effet antalgique'], ['surv', 'Surveillance biologique']
];
VIZ.tiles = {
  html(cfg) {
    const groups = (D.tileGroups || []).filter(g => !cfg.groups || cfg.groups.includes(g.id));
    let h = '<div class="tiles' + (cfg.mode === 'deck' ? ' in-deck' : '') + '">' + (cfg.mode === 'deck' ? '' : '<div class="tl-filters" role="group" aria-label="Filtrer selon le profil">' + FILTERS.map(([k, l]) => '<button type="button" class="chip" data-flt="' + k + '" aria-pressed="false">' + esc(l) + '</button>').join('') + '<button type="button" class="chip ghost" data-flt="" hidden>Effacer</button></div>') + '<div class="tl-map">';
    groups.forEach(gr => {
      h += '<section class="tl-grp" data-grp="' + gr.id + '"><header><span class="eyebrow">' + esc(gr.t) + '</span>' + (gr.nbn ? '<span class="nbn">' + md(gr.nbn) + '</span>' : '') + '</header><div class="tl-blob">' + gr.mols.map(id => { const M = MOLS[id]; if (!M) return ''; return '<button type="button" class="tile" data-pane="' + id + '" data-tags="' + esc((M.tags || []).join(' ')) + '"><b>' + esc(M.dci) + '</b><span class="br">' + esc(M.brand || '') + '</span>' + (M.note ? '<span class="tn">' + esc(M.note) + '</span>' : '') + '</button>'; }).join('') + '</div></section>';
    });
    return h + '</div><p class="tl-count note" aria-live="polite"></p></div>';
  },
  mount(el, cfg) {
    const root = $('.tiles', el); const on = new Set(cfg.tags || []);
    const apply = () => {
      let n = 0, tot = 0; $$('.tile', root).forEach(t => { tot++; const tg = (t.dataset.tags || '').split(' '); const ok = [...on].every(k => tg.includes(k)); t.classList.toggle('dim', on.size > 0 && !ok); t.classList.toggle('hit', on.size > 0 && ok); if (ok) n++; });
      $$('[data-flt]', root).forEach(b => { if (b.dataset.flt) b.setAttribute('aria-pressed', on.has(b.dataset.flt)); else b.hidden = !on.size; });
      const c = $('.tl-count', root); if (c) c.textContent = on.size ? n + ' molécule' + (n > 1 ? 's' : '') + ' sur ' + tot + ' : ' + [...on].map(k => FILTERS.find(f => f[0] === k)[1].toLowerCase()).join(' + ') + '.' : tot + ' molécules. Choisis un ou plusieurs profils pour filtrer ; un clic sur une tuile ouvre sa fiche.';
    };
    root.addEventListener('click', e => { const b = e.target.closest('[data-flt]'); if (!b) return; const k = b.dataset.flt; if (!k) on.clear(); else on.has(k) ? on.delete(k) : on.add(k); apply(); });
    apply();
    return { step(s) { let st = null; cfg.steps.forEach(x => { if (x.f <= s) st = x; }); on.clear(); ((st && st.tags) || cfg.tags || []).forEach(t => on.add(t)); apply(); } };
  }
};

/* ───────── Figure : la relation dose–occupation est hyperbolique (Horowitz et Taylor 2019) ─────────
   Schéma : occupation = 90 % × D / (D + 10 % de la dose habituelle). Paliers égaux contre paliers proportionnels. */
/* ───────── Trois monoamines, des dimensions qui se recouvrent (d’après Stahl 2013, chap. 7) ─────────
   Un diagramme de Venn simplifié : chaque cercle est un système, chaque zone une dimension symptomatique.
   En projection : les cercles, puis les dimensions propres à chaque système, les recouvrements, le centre. */
FIG.dimensions = (b, ctx) => {
  const deck = ctx && ctx.mode === 'deck', F = () => deck ? ' data-f="' + (++ctx.f) + '"' : '';
  const W = 860, H = 720, R = 210, u = 'dm' + Math.random().toString(36).slice(2, 7);
  const C = { '5ht': [310, 250, 'Sérotonine'], na: [550, 250, 'Noradrénaline'], da: [430, 460, 'Dopamine'] };
  const grad = k => '<radialGradient id="' + u + k + '" cx=".5" cy=".45" r=".6"><stop offset="0" style="stop-color:var(--c' + k + '-a)"/><stop offset=".7" style="stop-color:var(--c' + k + ')"/><stop offset="1" style="stop-color:var(--c' + k + '-b)"/></radialGradient>';
  const lines = (x, y, arr, cls) => '<text class="dr' + (cls ? ' ' + cls : '') + '" x="' + x + '" y="' + (y - (arr.length - 1) * 13) + '" text-anchor="middle" ' + F_SANS + '>' + arr.map((t, i) => '<tspan x="' + x + '" dy="' + (i ? 26 : 0) + '">' + t + '</tspan>').join('') + '</text>';
  let g = '<svg class="dim-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Trois cercles qui se recouvrent : sérotonine, noradrénaline et dopamine. Sérotonine seule : obsessions, compulsions, mémoire. Noradrénaline seule : vigilance, concentration, énergie. Dopamine seule : récompense, motivation. Sérotonine et noradrénaline : anxiété, impulsivité, irritabilité. Sérotonine et dopamine : appétit, agressivité, sexualité. Noradrénaline et dopamine : attention. Les trois : humeur et cognition.">';
  g += '<defs>' + grad('5ht') + grad('na') + grad('da') + '</defs>';
  Object.entries(C).forEach(([k, [x, y]]) => { g += '<circle class="dc dc-' + k + '" cx="' + x + '" cy="' + y + '" r="' + R + '" fill="url(#' + u + k + ')"/>'; });
  Object.entries(C).forEach(([k, [x, y]]) => { g += '<circle class="dc-l dc-' + k + '" cx="' + x + '" cy="' + y + '" r="' + R + '"/>'; });
  /* les noms des systèmes, aux coins, avec la pastille de leur couleur */
  const nm = (k, x, y, anchor) => { const w = C[k][2].length * 11.5; const dx = anchor === 'end' ? x - w - 18 : anchor === 'middle' ? x - w / 2 - 18 : x; return '<g class="dn"><circle cx="' + (dx + 8) + '" cy="' + (y - 7) + '" r="9" fill="url(#' + u + k + ')"/><text x="' + (dx + 24) + '" y="' + y + '" ' + F_MONO + '>' + C[k][2].toUpperCase() + '</text></g>'; };
  g += nm('5ht', 34, 46, 'start') + nm('na', 826, 46, 'end') + nm('da', 430, 708, 'middle');
  g += '<g class="dg"' + F() + '>' + lines(215, 198, ['obsessions', 'compulsions', 'mémoire']) + lines(645, 198, ['vigilance', 'concentration', 'énergie']) + lines(430, 573, ['récompense', 'motivation']) + '</g>';
  g += '<g class="dg"' + F() + '>' + lines(430, 172, ['anxiété', 'impulsivité', 'irritabilité']) + lines(312, 391, ['appétit', 'agressivité', 'sexualité']) + lines(550, 391, ['attention']) + '</g>';
  g += '<g class="dg"' + F() + '>' + lines(430, 325, ['humeur', 'cognition'], 'dc-c') + '</g>';
  return g + '</svg>';
};

/* ───────── Arrêter : l’occupation du SERT au fil des paliers ─────────
   Relation hyperbolique dose–occupation (Horowitz et Taylor 2019) : occupation maximale 90 %, demi-effet à 10 % de la dose
   habituelle. À gauche, la décroissance classique (paliers égaux de dose) ; à droite, la décroissance proportionnelle
   (la moitié de la dose précédente à chaque palier). Le temps s’écoule de gauche à droite. */
FIG.hyperbole = (b, ctx) => {
  const deck = ctx && ctx.mode === 'deck', fB = deck ? ' data-f="' + (++ctx.f) + '"' : '';
  const occ = d => 90 * d / (d + 10), W = 1000, H = 372, T = 92, Bt = 296, PW = 404, N = 8;
  const pct = d => d === 0 ? 'arrêt' : (d >= 10 ? fmt(d, d % 1 ? 1 : 0) : d >= 2 ? fmt(Math.round(d), 0) : fmt(d, 1)) + NB + '%';
  const panel = (x0, doses, cls, title, sub, f, note) => {
    const X = i => x0 + PW * i / N, Y = o => T + (Bt - T) * (1 - o / 100);
    let g = '<g class="hp ' + cls + '"' + (f || '') + '><text class="hp-t" x="' + x0 + '" y="28" ' + F_SANS + '>' + title + '</text><text class="hp-s" x="' + x0 + '" y="54" ' + F_SANS + '>' + sub + '</text>';
    for (let o = 0; o <= 100; o += 25) g += '<line class="grid" x1="' + x0 + '" x2="' + (x0 + PW) + '" y1="' + Y(o) + '" y2="' + Y(o) + '"/><text class="ax" x="' + (x0 - 9) + '" y="' + (Y(o) + 4) + '" text-anchor="end" ' + F_MONO + '>' + o + NB + '%</text>';
    for (let i = 0; i <= N; i++) g += '<line class="hp-tk" x1="' + X(i) + '" x2="' + X(i) + '" y1="' + Bt + '" y2="' + (Bt + 5) + '"/>';
    g += '<text class="axl" x="' + (x0 + PW / 2) + '" y="' + (Bt + 30) + '" text-anchor="middle" ' + F_SANS + '>paliers successifs, de 2 à 4 semaines chacun →</text>';
    /* l’escalier de l’occupation */
    let d = ''; doses.forEach((ds, i) => { const y = Y(occ(ds)), x1 = i === doses.length - 1 ? X(N) : X(i + 1); d += (i ? ' L ' : 'M ') + X(i).toFixed(1) + ' ' + y.toFixed(1) + ' L ' + x1.toFixed(1) + ' ' + y.toFixed(1); });
    g += '<path class="hp-c" d="' + d + '"/>';
    doses.forEach((ds, i) => { const y = Y(occ(ds)), x1 = i === doses.length - 1 ? X(N) : X(i + 1), xm = (X(i) + x1) / 2;
      g += '<text class="hp-d" x="' + xm.toFixed(1) + '" y="' + (ds === 0 ? y - 10 : y - 10).toFixed(1) + '" text-anchor="middle" ' + F_MONO + '>' + pct(ds) + '</text>';
      if (i) { const drop = occ(doses[i - 1]) - occ(ds), last = ds === 0;
        if (last && drop > 30) g += '<text class="hp-dr big" x="' + (X(i) - 8).toFixed(1) + '" y="' + ((Y(occ(doses[i - 1])) + y) / 2 + 5).toFixed(1) + '" text-anchor="end" ' + F_SANS + '>−' + Math.round(drop) + ' points d’un coup</text>';
        else if (!last) g += '<text class="hp-dr" x="' + (X(i) + 5).toFixed(1) + '" y="' + (y + 17).toFixed(1) + '" ' + F_SANS + '>−' + Math.round(drop) + '</text>'; } });
    if (note) g += '<text class="hp-dr big ok" x="' + (x0 + PW) + '" y="' + (Y(88) + 5) + '" text-anchor="end" ' + F_SANS + '>' + note + '</text>';
    return g + '</g>';
  };
  let g = '<svg class="hyp-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Occupation du transporteur de la sérotonine au fil des paliers : avec des paliers égaux de dose, elle reste haute puis chute de 64 points à la dernière marche ; avec des paliers proportionnels, elle baisse par marches régulières">';
  g += '<text class="axl" transform="translate(14 ' + ((T + Bt) / 2) + ') rotate(-90)" text-anchor="middle" ' + F_SANS + '>occupation du SERT</text>';
  g += panel(70, [100, 75, 50, 25, 0], 'hp-a', 'Diminution classique : paliers égaux', '−25 % de la dose de départ à chaque palier', '');
  g += panel(574, [100, 50, 25, 12.5, 6.25, 3.125, 1.5625, 0], 'hp-b', 'Diminution hyperbolique : paliers proportionnels', 'chaque palier retire la moitié de la dose précédente', fB, 'des marches de 7 à 15 points');
  return g + '</svg>';
};
