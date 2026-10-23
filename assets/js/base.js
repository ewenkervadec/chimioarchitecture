/* Chimioarchitecture de l’humeur — moteur, couche de base.
   Scripts classiques sans compilation : les déclarations de premier niveau sont partagées entre
   base.js, ui.js, viz.js, views.js et boot.js (chargés dans cet ordre, après content/cours.js). */
'use strict';
const D = window.COURS;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NB = ' ', NNB = ' ';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (x, d = 2) => Number(x).toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const NS = 'chimie.' + (D ? D.site.id : 'x') + '.';
const store = {
  get(k, d) { try { const v = localStorage.getItem(NS + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) { } },
  del(k) { try { localStorage.removeItem(NS + k); } catch (e) { } }
};
const gstore = {
  get(k, d) { try { const v = localStorage.getItem('chimie.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('chimie.' + k, JSON.stringify(v)); } catch (e) { } }
};

/* ───────── Index du contenu ───────── */
const SLIDES = D.slides; SLIDES.forEach((s, i) => { s.i = i; });
const SL = Object.fromEntries(SLIDES.map(s => [s.id, s]));
const CH = Object.fromEntries(D.chapters.map(c => [c.id, c]));
const OBJ = D.objectives || {}, TERMS = D.terms || {}, MOLS = D.mols || {}, PANES = D.panes || {}, QZ = D.quiz || {}, VOTES = D.votes || {};
const CLS = D.classes || {}, HIST = D.history || [], HI = Object.fromEntries(HIST.map(h => [h.id, h]));
/* Tout ce qui s’ouvre en panneau : molécules, cibles, fiches d’histoire, notes */
const PANE = id => MOLS[id] ? { type: 'mol', id, P: MOLS[id] } : PANES[id] ? { type: PANES[id].type || 'note', id, P: PANES[id] } : HI[id] ? { type: 'hist', id, P: HI[id] } : null;
const paneTitle = id => { const x = PANE(id); if (!x) return id; return x.type === 'mol' ? x.P.dci : x.P.t; };

/* ───────── Icônes : flèches géométriques à tête en chevron, traits ronds ───────── */
const ARW = {
  r: 'M3 12h17M14 5.5l6.5 6.5-6.5 6.5', l: 'M21 12H4M10 5.5L3.5 12l6.5 6.5', lr: 'M3.5 12h17M9 6.5L3.5 12 9 17.5M15 6.5l5.5 5.5-5.5 5.5',
  ne: 'M6 18L18 6M9 6h9v9', sw: 'M18 6L6 18M15 18H6V9', u: 'M12 21V4M5.5 10L12 3.5l6.5 6.5', d: 'M12 3v17M5.5 14l6.5 6.5 6.5-6.5',
  turnr: 'M6 20V12a5 5 0 0 1 5-5h8M15 3.5L19 7l-4 3.5', turnl: 'M18 20V12a5 5 0 0 0-5-5H5M9 3.5L5 7l4 3.5'
};
const arrow = (k, cls) => '<svg class="arw' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ARW[k] + '" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="square" stroke-linejoin="miter"/></svg>';
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5"/></svg>'
};
/* Logo : tuile sombre, trois gélules et un point (un message en morse, une transmission) */
const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true" class="logo"><rect x="1" y="1" width="38" height="38" rx="11" fill="var(--logo-bg)"/><g fill="var(--logo-fg)"><rect x="8" y="12.5" width="13" height="6" rx="3"/><rect x="23.5" y="12.5" width="8.5" height="6" rx="3"/><rect x="8" y="21.5" width="8" height="6" rx="3"/><circle cx="21.5" cy="24.5" r="3"/><rect x="27" y="21.5" width="5" height="6" rx="3"/></g></svg>';

/* ───────── Thème ───────── */
/* le site ne retire data-theme que s’il l’a posé lui-même (un hôte peut imposer le thème) */
function applyTheme(t) { const r = document.documentElement; if (t === 'light' || t === 'dark') { r.dataset.theme = t; r.dataset.themeSite = '1'; } else if (r.dataset.themeSite) { delete r.dataset.theme; delete r.dataset.themeSite; } }
let theme = gstore.get('theme', 'auto'); applyTheme(theme);
const isDark = () => theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
function themeButton() {
  const b = $('#themeBtn'); if (!b) return;
  const lab = { auto: 'Thème : automatique', light: 'Thème : clair', dark: 'Thème : sombre' }[theme];
  b.innerHTML = ICON[theme === 'auto' ? 'auto' : theme === 'light' ? 'sun' : 'moon']; b.setAttribute('aria-label', lab); b.title = lab;
}

/* ───────── Mini-balisage ─────────
   [[terme]] ou [[terme|texte]] : glossaire · {{id}} ou {{id|texte}} : panneau (molécule, cible, histoire)
   ((diapo|texte)) : lien vers une diapositive · **gras** · _italique_ · → ← ↔ ↗ : flèches dessinées
   5-HT1A, α2, β1, D2, H1, M1, MT1 : indices typographiques automatiques */
const lowerFirst = s => (s.length > 1 && s[1] === s[1].toLowerCase() && s[0] !== s[0].toLowerCase()) ? s[0].toLowerCase() + s.slice(1) : s;
function typo(txt) {
  return txt
    .replace(/\b5-HT(\d[A-F]?)(?![\w-])/g, '5-HT<sub>$1</sub>')
    .replace(/([αβ])(\d[A-D]?)(?![\w-])/g, '$1<sub>$2</sub>')
    .replace(/\b(D|H|M|MT)([1-5])(?![\w-])/g, '$1<sub>$2</sub>')
    .replace(/ ([:;!?»])/g, NNB + '$1').replace(/« /g, '«' + NNB)
    .replace(/(\d) (%|‰|mg|µg|mL|mEq|mmol|nM|µM|kg|h|j|min|ans|mois|jours|semaines|SA|°C)(?=$|[\s,.;:!?)\/»<])/g, '$1' + NB + '$2')
    .replace(/→/g, arrow('r', 'in')).replace(/←/g, arrow('l', 'in')).replace(/↔/g, arrow('lr', 'in')).replace(/↗/g, arrow('ne', 'in')).replace(/↘/g, '<span class="rot90">' + arrow('ne', 'in') + '</span>');
}
function md(s) {
  let h = esc(s);
  h = h.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (m, k, t) => {
    const T = TERMS[k]; if (!T) { console.warn('Terme inconnu :', k); return t || k; }
    return '<span class="term" role="button" tabindex="0" data-term="' + k + '" aria-expanded="false">' + (t || esc(lowerFirst(T.t))) + '</span>';
  });
  h = h.replace(/\{\{([0-9a-z-]+)(?:\|([^}]+))?\}\}/g, (m, id, t) => {
    const x = PANE(id); if (!x) { console.warn('Panneau inconnu :', id); return t || id; }
    return '<span class="ilink k-' + x.type + '" role="button" tabindex="0" data-pane="' + id + '">' + (t || esc(paneTitle(id))) + '</span>';
  });
  h = h.replace(/\(\(([a-z0-9-]+)\|([^)]+)\)\)/g, (m, sid, t) => { if (!SL[sid]) console.warn('Diapositive inconnue :', sid); return '<a class="slink" href="#/cours/' + sid + '" data-sid="' + sid + '">' + t + '</a>'; });
  h = h.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(«])_([^_]+)_(?=[\s.,;:!?)»]|$)/g, '$1<i>$2</i>');
  /* typographie hors des balises */
  return h.split(/(<[^>]+>)/).map(seg => seg.startsWith('<') ? seg : typo(seg)).join('');
}
const plain = s => String(s ?? '').replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[([a-z0-9-]+)\]\]/g, (m, k) => TERMS[k] ? TERMS[k].t : k).replace(/\{\{([0-9a-z-]+)\|([^}]+)\}\}/g, '$2').replace(/\{\{([0-9a-z-]+)\}\}/g, (m, id) => paneTitle(id)).replace(/\(\([a-z0-9-]+\|([^)]+)\)\)/g, '$1').replace(/\*\*/g, '').replace(/(^|\s)_([^_]+)_/g, '$1$2');

/* ───────── Registre des visualisations ─────────
   Chaque visualisation : { html(cfg, ctx) → chaîne, mount(el, cfg, mode) → instance { step(n), stop(), start(), destroy() } }
   Les étapes (data-f) d’une visualisation pilotent ses états pendant la projection. */
const VIZ = {};
const vizInst = new Map(); let vizUid = 0;
function vizHTML(b, ctx) {
  const V = VIZ[b.viz]; if (!V) { console.warn('Visualisation inconnue :', b.viz); return ''; }
  const id = 'vz' + (++vizUid); const steps = (b.steps || []).map(s => ({ ...s, f: ctx.mode === 'deck' ? ++ctx.f : 0 }));
  const cfg = { ...b, steps, mode: ctx.mode };
  return '<div class="viz viz-' + b.viz + (b.full ? ' full' : '') + '" data-viz="' + b.viz + '" data-vid="' + id + '" data-cfg="' + esc(JSON.stringify(cfg)) + '">' + V.html(cfg, ctx) +
    (steps.length ? steps.map(s => '<span class="vstep" data-f="' + s.f + '" hidden></span>').join('') : '') + (b.cap ? '<p class="viz-cap">' + md(b.cap) + '</p>' : '') + '</div>';
}
const io = ('IntersectionObserver' in window) ? new IntersectionObserver(es => es.forEach(e => { const inst = vizInst.get(e.target); if (!inst) return; if (e.isIntersecting) inst.start && inst.start(); else inst.stop && inst.stop(); }), { rootMargin: '80px' }) : null;
function mountViz(root, mode) {
  $$('[data-viz]', root).forEach(el => {
    if (vizInst.has(el)) return; const V = VIZ[el.dataset.viz]; if (!V) return;
    let cfg = {}; try { cfg = JSON.parse(el.dataset.cfg || '{}'); } catch (e) { }
    try { const inst = V.mount(el, cfg, mode) || {}; vizInst.set(el, inst); if (io && mode !== 'deck') io.observe(el); else inst.start && inst.start(); } catch (e) { console.error('Visualisation', el.dataset.viz, e); }
  });
}
function unmountViz(root) { vizInst.forEach((inst, el) => { if (!root || root.contains(el)) { try { inst.destroy && inst.destroy(); } catch (e) { } if (io) io.unobserve(el); vizInst.delete(el); } }); }
function stepViz(root, step) { vizInst.forEach((inst, el) => { if (root.contains(el) && inst.step) inst.step(step); }); }

/* ───────── Blocs de contenu ───────── */
function ul(items, ctx, step, cls) {
  return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' + items.map(it => {
    const f = (ctx.mode === 'deck' && step) ? ' data-f="' + (++ctx.f) + '"' : '';
    if (typeof it === 'string') return '<li' + f + '>' + md(it) + '</li>';
    return '<li' + f + '>' + md(it.t) + (it.sub ? ul(it.sub, ctx, false, 'sub') : '') + '</li>';
  }).join('') + '</ul>';
}
const fa = (b, ctx) => (ctx.mode === 'deck' && b.f) ? ' data-f="' + (++ctx.f) + '"' : '';
const CALL = { trap: 'Piège', urg: 'Urgence', note: 'Remarque', key: 'À retenir', fr: 'En France', tip: 'En pratique' };
const BLOCKS = {
  p: (b, ctx, F) => '<p' + F + '>' + md(b.p) + '</p>',
  lead: (b, ctx, F) => '<p class="lead"' + F + '>' + md(b.lead) + '</p>',
  h: (b, ctx, F) => '<h4' + F + '>' + md(b.h) + '</h4>',
  ul: (b, ctx, F) => '<div' + F + '>' + ul(b.ul, ctx, b.step) + '</div>',
  ol: (b, ctx, F) => '<ol class="seq"' + F + '>' + b.ol.map(it => '<li' + ((ctx.mode === 'deck' && b.step) ? ' data-f="' + (++ctx.f) + '"' : '') + '>' + md(typeof it === 'string' ? it : it.t) + '</li>').join('') + '</ol>',
  /* reveal: 'heads' (projection) : les titres d’abord, le contenu de chaque colonne au clic */
  cols: (b, ctx, F) => '<div class="cols' + (b.k ? ' ' + b.k : '') + (b.reveal ? ' rv-' + b.reveal : '') + '"' + F + (b.min ? ' style="--min:' + b.min + 'em"' : '') + '>' + b.cols.map(c => {
    const deck = ctx.mode === 'deck', heads = deck && b.reveal === 'heads';
    const f = (deck && b.step && !heads) ? ' data-f="' + (++ctx.f) + '"' : '';
    const body = (c.p ? '<p>' + md(c.p) + '</p>' : '') + (c.ul ? ul(c.ul, ctx, false) : '') + (c.src ? '<span class="src">' + esc(c.src) + '</span>' : '');
    return '<div class="col' + (c.k ? ' ' + c.k : '') + '"' + f + '>' + (c.tag ? '<span class="col-tag">' + md(c.tag) + '</span>' : '') + (c.h ? '<b class="col-h">' + md(c.h) + '</b>' : '') + (heads ? '<div class="col-b" data-f="' + (++ctx.f) + '">' + body + '</div>' : body) + '</div>';
  }).join('') + '</div>',
  call: (b, ctx, F) => '<div class="call c-' + b.call + '"' + F + '><i>' + (b.lab || CALL[b.call] || '') + '</i><span>' + md(b.t) + '</span></div>',
  def: (b, ctx, F) => '<div class="def"' + F + '><b>' + md(b.def.t) + '</b><p>' + md(b.def.p) + '</p>' + (b.def.src ? '<span class="src">' + esc(b.def.src) + '</span>' : '') + '</div>',
  quote: (b, ctx, F) => '<figure class="pull"' + F + '><blockquote>' + md(b.quote) + '</blockquote>' + (b.who ? '<figcaption>' + md(b.who) + '</figcaption>' : '') + '</figure>',
  kpis: (b, ctx, F) => '<div class="kpis"' + F + '>' + b.kpis.map(k => '<div class="kpi"' + ((ctx.mode === 'deck' && b.step) ? ' data-f="' + (++ctx.f) + '"' : '') + '><b>' + md(k.v) + '</b><span>' + md(k.l) + '</span></div>').join('') + '</div>',
  /* reveal: 'cells' (projection) : la première colonne d’abord, le reste de chaque ligne au clic */
  table: (b, ctx, F) => { const t = b.table, deck = ctx.mode === 'deck', cells = deck && b.reveal === 'cells';
    return '<div class="tbl-box"' + F + '><table class="tbl' + (t.k ? ' ' + t.k : '') + '">' + (t.cap ? '<caption>' + md(t.cap) + '</caption>' : '') + '<thead><tr>' + t.head.map(h => '<th scope="col">' + md(h) + '</th>').join('') + '</tr></thead><tbody>' +
      t.rows.map(r => { const n = (deck && (b.step || cells)) ? ++ctx.f : 0; return '<tr' + (n && !cells ? ' data-f="' + n + '"' : '') + '>' + r.map((c, j) => j === 0 ? '<th scope="row">' + md(c) + '</th>' : '<td' + (cells ? ' data-f="' + n + '"' : '') + '>' + md(c) + '</td>').join('') + '</tr>'; }).join('') + '</tbody></table>' + (t.src ? '<span class="src">' + esc(t.src) + '</span>' : '') + '</div>'; },
  /* reveal: 'heads' (projection) : les intitulés des étapes d’abord, leur contenu au clic */
  steps: (b, ctx, F) => '<ol class="chain' + (b.reveal ? ' rv-' + b.reveal : '') + '"' + F + '>' + b.steps.map((st, i) => { const deck = ctx.mode === 'deck', heads = deck && b.reveal === 'heads';
    return '<li' + ((deck && b.step && !heads) ? ' data-f="' + (++ctx.f) + '"' : '') + '><span class="n">' + (i + 1) + '</span><b>' + md(st.t) + '</b>' + (st.p ? '<span' + (heads ? ' data-f="' + (++ctx.f) + '"' : '') + '>' + md(st.p) + '</span>' : '') + '</li>'; }).join('') + '</ol>',
  fig: (b, ctx, F) => '<figure class="figure"' + F + '>' + (FIG[b.fig] ? FIG[b.fig](b, ctx) : '') + (b.cap ? '<figcaption>' + md(b.cap) + '</figcaption>' : '') + '</figure>',
  viz: (b, ctx) => vizHTML(b, ctx),
  quiz: (b, ctx) => quizHTML(b.quiz, ctx),
  vote: (b, ctx) => voteHTML(b.vote, ctx, b),
  pair: (b, ctx, F) => pairHTML(b, ctx, F),
  predict: (b, ctx) => predictHTML(b, ctx),
  hist: (b, ctx, F) => histCardHTML(b.hist, F, b),
  mols: (b, ctx, F) => '<div class="molchips"' + F + '>' + b.mols.map(id => molChip(id)).join('') + '</div>',
  formula: (b, ctx, F) => '<div class="formulas"' + F + '>' + b.formula.map(k => '<figure class="formula">' + molSVG(k, { w: b.w || 220 }) + '<figcaption>' + md(b.names && b.names[k] || (MOLS[k] ? MOLS[k].dci : k)) + '</figcaption></figure>').join('') + '</div>',
  qr: (b, ctx, F) => '<div class="qrbox"' + F + '>' + qrHTML(b) + '</div>',
  qrs: (b, ctx, F) => '<div class="qrs"' + F + '>' + b.qrs.map(q => '<div class="qrc"' + ((ctx.mode === 'deck' && b.step) ? ' data-f="' + (++ctx.f) + '"' : '') + '>' + qrSVG(q.url || (siteURL() + (q.hash || '')), { w: q.w || b.w || 200 }) + '<span class="eyebrow">' + esc(q.lab) + '</span><b>' + md(q.t) + '</b></div>').join('') + '</div>',
  cta: (b, ctx, F) => '<div class="cta-row"' + F + '>' + b.cta.map(c => '<a class="btn ' + (c.ghost ? 'ghost ' : '') + 'small" href="' + esc(c.href) + '">' + esc(c.l) + (c.arrow === false ? '' : ' ' + arrow('r', 'btn-arw')) + '</a>').join('') + '</div>',
  refs: (b, ctx, F) => '<ol class="refs"' + F + '>' + b.refs.map(r => '<li>' + (r.href ? '<a href="' + esc(r.href) + '" target="_blank" rel="noopener">' + md(r.t) + '</a>' : md(r.t)) + (r.note ? ' <span class="note">' + md(r.note) + '</span>' : '') + '</li>').join('') + '</ol>',
  objs: (b, ctx, F) => '<ol class="objlist"' + F + '>' + b.objs.map(o => '<li' + ((ctx.mode === 'deck' && b.step) ? ' data-f="' + (++ctx.f) + '"' : '') + '><span class="oid">' + esc(o.replace(/^O(\d+)$/, (m, n) => n.padStart(2, '0'))) + '</span><span>' + md(OBJ[o].t) + '</span></li>').join('') + '</ol>',
  emblem: (b, ctx, F) => '<div class="emblem-box"' + F + '>' + emblemSVG(b.emblem, { size: b.size || 160 }) + '</div>',
  html: (b, ctx, F) => '<div' + F + '>' + b.html + '</div>',
  /* deux colonnes de blocs (figure à gauche, lecture à droite) ; r : largeur relative de la première */
  split: (b, ctx, F) => '<div class="split"' + F + (b.r ? ' style="--r:' + esc(b.r) + '"' : '') + '>' + b.split.map(col => '<div class="split-c">' + [].concat(col).map(x => block(x, ctx)).join('') + '</div>').join('') + '</div>'
};
function block(b, ctx) {
  if (typeof b === 'string') return '<p>' + md(b) + '</p>';
  /* une visualisation peut porter des clés homonymes de blocs (steps, cols…) : elle est prioritaire */
  const k = ('viz' in b) ? 'viz' : Object.keys(BLOCKS).find(key => key in b); if (!k) return '';
  const F = (k === 'viz' || k === 'quiz' || k === 'vote' || k === 'predict') ? '' : fa(b, ctx);
  return BLOCKS[k](b, ctx, F);
}
const blocks = (arr, ctx) => '<div class="blk">' + (arr || []).map(b => block(b, ctx)).join('') + '</div>';
const FIG = {}; /* figures statiques, remplies par viz.js */
