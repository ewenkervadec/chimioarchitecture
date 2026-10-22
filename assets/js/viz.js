/* Chimioarchitecture — visualisations (1) : formules, emblèmes, code QR. Le cerveau et les voies : viz-voies.js. */
'use strict';
const SVGNS = 'http://www.w3.org/2000/svg';
const F_SANS = 'font-family="Jost, Futura, Avenir Next, Avenir, Helvetica, Arial, sans-serif"';
const F_MONO = 'font-family="DM Mono, ui-monospace, Menlo, monospace"';
/* typo() pour le texte SVG : les indices deviennent des tspan (une balise <sub> n’existe pas en SVG) */
const typoS = s => typo(s).replace(/<sub>(.*?)<\/sub>/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>');

/* ───────── Formules en boules et bâtonnets (coordonnées RDKit, cf. tools/mols.py) ─────────
   Atomes de carbone : petits points ; hétéroatomes : leur symbole ; doubles liaisons : trait intérieur. */
function molSVG(key, o = {}) {
  const M = (D.structures || {})[key]; if (!M) return '';
  const ink = o.ink || 'var(--ink)', faint = o.faint || 'var(--lead)';
  const xs = M.a.map(a => a[1]), ys = M.a.map(a => a[2]);
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const sc = 28, pad = 22, W = (maxx - minx) * sc + pad * 2, H = (maxy - miny) * sc + pad * 2;
  const X = x => (x - minx) * sc + pad, Y = y => (y - miny) * sc + pad;
  const cx = xs.reduce((a, b) => a + b, 0) / xs.length, cy = ys.reduce((a, b) => a + b, 0) / ys.length;
  let g = '';
  M.b.forEach(([i, j, ord]) => {
    const a = M.a[i], b = M.a[j]; let x1 = X(a[1]), y1 = Y(a[2]), x2 = X(b[1]), y2 = Y(b[2]);
    const sh = (s, t) => { const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy); return [dx / L, dy / L, L]; };
    const [ux, uy, L] = sh(); const tA = a[0] === 'C' ? 0 : 8, tB = b[0] === 'C' ? 0 : 8;
    const ax = x1 + ux * tA, ay = y1 + uy * tA, bx = x2 - ux * tB, by = y2 - uy * tB;
    g += '<line x1="' + ax.toFixed(1) + '" y1="' + ay.toFixed(1) + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '"/>';
    if (ord === 2 || ord === 3) {
      /* trait parallèle du côté du centre de la molécule */
      let nx = -uy, ny = ux; const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; if ((X(cx) - mx) * nx + (Y(cy) - my) * ny < 0) { nx = -nx; ny = -ny; }
      const off = 4.6, sh2 = L * 0.16;
      g += '<line x1="' + (ax + nx * off + ux * sh2).toFixed(1) + '" y1="' + (ay + ny * off + uy * sh2).toFixed(1) + '" x2="' + (bx + nx * off - ux * sh2).toFixed(1) + '" y2="' + (by + ny * off - uy * sh2).toFixed(1) + '"/>';
      if (ord === 3) g += '<line x1="' + (ax - nx * off + ux * sh2).toFixed(1) + '" y1="' + (ay - ny * off + uy * sh2).toFixed(1) + '" x2="' + (bx - nx * off - ux * sh2).toFixed(1) + '" y2="' + (by - ny * off - uy * sh2).toFixed(1) + '"/>';
    }
  });
  let at = '';
  M.a.forEach(a => {
    const x = X(a[1]), y = Y(a[2]);
    if (a[0] === 'C') at += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.6" fill="' + ink + '"/>';
    else { const lab = a[0] + (a[4] ? 'H' + (a[4] > 1 ? '<tspan dy="3" font-size="9">' + a[4] + '</tspan>' : '') : '') + (a[3] > 0 ? '<tspan dy="-6" font-size="9">+</tspan>' : a[3] < 0 ? '<tspan dy="-6" font-size="9">−</tspan>' : '');
      at += '<text x="' + x.toFixed(1) + '" y="' + (y + 4.5).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="500" fill="' + ink + '" ' + F_SANS + '>' + lab + '</text>'; }
  });
  const w = Math.min(o.w || 240, W), h = H * w / W;
  return '<svg class="mol" viewBox="0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0) + '" width="' + w.toFixed(0) + '" height="' + h.toFixed(0) + '" role="img" aria-label="Formule développée : ' + esc(o.label || key) + '"><g stroke="' + faint + '" stroke-width="1.5" stroke-linecap="round">' + g + '</g>' + at + '</svg>';
}

/* ───────── Emblèmes au trait et aux points (planche 10) ─────────
   entonnoir : les monoamines convergent vers la plasticité ; boucle : le cycle synaptique ; spirale : la récurrence ;
   arche : le délai d’action ; grille : la matrice des récepteurs ; gélules : la pharmacopée ; sablier : l’histoire. */
function emblemSVG(name, o = {}) {
  const s = o.size || 160, c = o.ink || 'currentColor';
  const dot = (x, y, r = 3) => '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" fill="' + c + '"/>';
  const pth = (d, dotted) => '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + (dotted ? 1.6 : 1.5) + '" stroke-linecap="round"' + (dotted ? ' stroke-dasharray="0.1 5.5"' : '') + '/>';
  let g = '';
  if (name === 'funnel') {
    for (let k = 0; k < 4; k++) { const y = 30 + k * 26, rx = 56 - k * 13, ry = 9 - k * 1.6; g += '<ellipse cx="80" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="' + c + '" stroke-width="1.4"' + (k % 2 ? ' stroke-dasharray="0.1 5"' : '') + ' stroke-linecap="round"/>'; }
    for (let k = -3; k <= 3; k++) { const x0 = 80 + k * 18, x1 = 80 + k * 4; g += pth('M' + x0 + ' 14 C ' + (x0 - k * 2) + ' 60 ' + x1 + ' 96 ' + x1 + ' 134', k % 2 !== 0); g += dot(x0, 14, 2.6) + dot(x1, 134, 2.6); }
  } else if (name === 'loop') {
    const pts = []; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; pts.push([80 + Math.cos(a) * 46, 80 + Math.sin(a) * 46]); }
    pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, k = i % 2 ? 1.35 : 0.62; g += pth('M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' Q ' + (80 + (mx - 80) * k).toFixed(1) + ' ' + (80 + (my - 80) * k).toFixed(1) + ' ' + q[0].toFixed(1) + ' ' + q[1].toFixed(1), i % 3 === 2); g += dot(p[0], p[1]); });
    g += pth('M58 80 C 58 60 102 60 102 80 C 102 100 58 100 58 80', true) + dot(80, 80, 3.4);
  } else if (name === 'spiral') {
    let d = ''; for (let t = 0; t <= 4.2 * Math.PI; t += 0.12) { const r = 8 + t * 4.6, x = 80 + Math.cos(t) * r * 1.25, y = 82 + Math.sin(t) * r * 0.55 - t * 3.2; d += (d ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1); if (Math.abs((t % (Math.PI / 2))) < 0.07) g += dot(x, y, 2.4); }
    g += pth(d, false); g += pth('M80 120 L 80 28', true);
  } else if (name === 'arch') {
    g += pth('M18 138 C 30 40 120 22 142 138', true) + pth('M38 138 C 46 66 116 50 124 138', false);
    g += pth('M18 138 C 50 116 96 84 140 58', false) + '<path d="M140 58 l -11 1 l 6 9 z" fill="' + c + '"/>';
    [[18, 138], [38, 138], [124, 138], [142, 138], [80, 31], [80, 58]].forEach(p => g += dot(p[0], p[1]));
    g += pth('M18 138 H 142', true);
  } else if (name === 'grid') {
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) { const x = 28 + i * 21, y = 28 + j * 21, on = (i * 7 + j * 3) % 5 < 3; g += dot(x, y, on ? 3.3 : 1.8); }
    for (let i = 0; i < 6; i++) g += pth('M' + (28 + i * 21) + ' 28 V 133', i % 2 === 1) + pth('M28 ' + (28 + i * 21) + ' H 133', i % 2 === 0);
    g += pth('M28 133 C 70 120 104 80 133 28', false);
  } else if (name === 'pills') {
    g += '<g fill="none" stroke="' + c + '" stroke-width="1.5"><rect x="22" y="40" width="96" height="30" rx="15"/><rect x="48" y="86" width="90" height="30" rx="15"/></g>';
    [[37, 55, 15], [103, 55, 15], [63, 101, 15], [123, 101, 15], [80, 70, 34]].forEach(([x, y, r]) => g += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + c + '" stroke-width="1.1" stroke-dasharray="3 4"/>');
    g += pth('M70 40 V 70', true) + pth('M93 86 V 116', true);
  } else if (name === 'hourglass') {
    g += pth('M40 24 H 120 M40 136 H 120', false) + pth('M48 24 C 48 64 80 70 80 80 C 80 90 48 96 48 136 M112 24 C 112 64 80 70 80 80 C 80 90 112 96 112 136', false);
    for (let k = 0; k < 7; k++) g += dot(80 + (k % 3 - 1) * 9, 100 + k * 5, 2);
    g += pth('M80 80 V 124', true) + dot(80, 80, 3.2);
  } else if (name === 'scale') {
    g += pth('M80 26 V 134 M40 134 H 120', false) + pth('M34 56 L 126 44', false) + pth('M34 56 L 24 96 M34 56 L 46 96 M126 44 L 114 84 M126 44 L 138 84', true);
    g += '<path d="M20 96 H 50 A 15 7 0 0 1 20 96 Z M110 84 H 142 A 16 7 0 0 1 110 84 Z" fill="none" stroke="' + c + '" stroke-width="1.5"/>' + dot(80, 50, 3.4);
  }
  /* chaque dessin est recentré sur sa boîte englobante (mesurée dans un navigateur) : centre optique au milieu du carré */
  const C0 = EMBLEM_BOX[name]; const tr = C0 ? ' transform="translate(80 80) scale(' + C0[2] + ') translate(' + (-C0[0]) + ' ' + (-C0[1]) + ')"' : '';
  return '<svg class="emblem e-' + name + '" viewBox="0 0 160 160" width="' + s + '" height="' + s + '" aria-hidden="true"><g' + tr + '>' + g + '</g></svg>';
}
const EMBLEM_BOX = { funnel: [80, 74, 1], loop: [81.4, 80, 1], spiral: [89, 66, 0.92], arch: [80, 84.5, 1], grid: [80.5, 80.5, 1], pills: [80, 76, 1], hourglass: [80, 80, 1], scale: [81, 80, 1] };

/* ───────── Code QR aux modules arrondis et fusionnés (planche 4), lisible par les appareils photo ───────── */
function qrSVG(text, o = {}) {
  if (typeof qrcode !== 'function') return '';
  const q = qrcode(0, 'M'); q.addData(text); q.make(); const n = q.getModuleCount();
  const on = (r, c) => r >= 0 && c >= 0 && r < n && c < n && q.isDark(r, c);
  const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  const u = 10, m = 2, W = (n + m * 2) * u; let g = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (!on(r, c) || finder(r, c)) continue;
    const x = (c + m) * u, y = (r + m) * u, R = u / 2;
    const T = on(r - 1, c) && !finder(r - 1, c), B = on(r + 1, c) && !finder(r + 1, c), L = on(r, c - 1) && !finder(r, c - 1), Rt = on(r, c + 1) && !finder(r, c + 1);
    /* chaque module devient une pastille ; les côtés partagés avec un voisin restent droits (fusion) */
    const tl = (T || L) ? 0 : R, tr = (T || Rt) ? 0 : R, br = (B || Rt) ? 0 : R, bl = (B || L) ? 0 : R;
    g += '<path d="M' + (x + tl) + ' ' + y + ' H ' + (x + u - tr) + (tr ? ' A ' + tr + ' ' + tr + ' 0 0 1 ' + (x + u) + ' ' + (y + tr) : '') + ' V ' + (y + u - br) + (br ? ' A ' + br + ' ' + br + ' 0 0 1 ' + (x + u - br) + ' ' + (y + u) : '') + ' H ' + (x + bl) + (bl ? ' A ' + bl + ' ' + bl + ' 0 0 1 ' + x + ' ' + (y + u - bl) : '') + ' V ' + (y + tl) + (tl ? ' A ' + tl + ' ' + tl + ' 0 0 1 ' + (x + tl) + ' ' + y : '') + ' Z"/>';
  }
  const fp = (r, c) => { const x = (c + m) * u, y = (r + m) * u; return '<rect x="' + (x + u / 2) + '" y="' + (y + u / 2) + '" width="' + (6 * u) + '" height="' + (6 * u) + '" rx="' + (u * 1.9) + '" fill="none" stroke="currentColor" stroke-width="' + u + '"/><rect x="' + (x + 2 * u) + '" y="' + (y + 2 * u) + '" width="' + (3 * u) + '" height="' + (3 * u) + '" rx="' + (u * 1.1) + '"/>'; };
  g += fp(0, 0) + fp(0, n - 7) + fp(n - 7, 0);
  return '<svg class="qr" viewBox="0 0 ' + W + ' ' + W + '" width="' + (o.w || 220) + '" height="' + (o.w || 220) + '" role="img" aria-label="Code QR vers ' + esc(text) + '"><rect width="' + W + '" height="' + W + '" rx="' + (u * 2) + '" fill="var(--qr-bg)"/><g fill="currentColor">' + g + '</g></svg>';
}
function siteURL() { const u = location.href.split('#')[0]; return /^https?:/.test(u) ? u : 'https://github.com/'; }
function qrHTML(b) { const url = b.url || (siteURL() + (b.hash || '')); return '<div class="qr-wrap">' + qrSVG(url, { w: b.w || 230 }) + '<div class="qr-txt"><span class="eyebrow">' + esc(b.lab || 'Le site du cours') + '</span><b>' + md(b.t || 'Le cours, les fiches et les cartes de révision') + '</b><span class="mono qr-url">' + esc(url.replace(/^https?:\/\//, '')) + '</span></div></div>'; }
