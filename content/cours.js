/* ─── 00-site ─── */
/* ════════════════════════════════════════════════════════════════════════════
   Chimioarchitecture de l’humeur — tout le contenu du site.
   Ce fichier est assemblé à partir des morceaux du dossier build/ (outils/assembler.js) :
   métadonnées, chapitres, objectifs, diapositives, fiches molécules, glossaire, panneaux,
   archives historiques, questions à la salle, QRM, cas, arbres, cartes de révision, affinités, structures.
   Mini-balisage des textes : [[terme]] glossaire · {{id}} panneau (molécule, cible, archive) ·
   ((diapo|texte)) lien vers une diapositive · **gras** · _italique_ · → flèche dessinée.
   ════════════════════════════════════════════════════════════════════════════ */
window.COURS = {};
var C = window.COURS;
C.mols = {}; C.slides = [];

C.site = {
  id: 'humeur',
  title1: 'Chimioarchitecture',
  title2: 'de l’humeur',
  short: 'Antidépresseurs et thymorégulateurs, de la synapse à l’ordonnance',
  kicker: 'Cours pour les internes de psychiatrie · 2 heures',
  author: 'Dr Ewen Kervadec',
  authorShort: 'E. Kervadec',
  role: 'CCA, Département de psychiatrie et d’addictologie, Hôpital universitaire Paul-Brousse',
  roleShort: 'CCA · Hôpital Paul-Brousse',
  place: 'DES de psychiatrie · Villejuif · 2026',
  year: '2026',
  /* Photographie de couverture : un banc de marbre gravé de sillons remplis de mousse (image fournie par l’auteur). */
  cover: { img: 'assets/img/couverture.jpg', wide: 'assets/img/couverture-16x9.jpg', alt: 'Banc de marbre gravé d’un labyrinthe de sillons remplis de mousse' },
  lede: 'Pourquoi un médicament qui bloque un transporteur en quelques heures soigne une dépression en quelques semaines ; pourquoi la lithiémie se prélève le matin ; comment choisir, ajuster, associer et arrêter. Un cours à projeter et à manipuler, de la synapse à l’ordonnance.',
  duration: 120,
  session: 'Le cours alterne des séquences courtes et des questions à la salle : trois questions d’ouverture, des prédictions avant chaque animation, un cas clinique, et un retour sur les questions du début. Chacun y répond pour soi, ou à voix haute s’il le souhaite : personne n’est interrogé, rien n’est compté, et la réponse vient au clic suivant.',
  asof: 'octobre 2026',
  version: 'Version du 22 octobre 2026',
  pharmaIntro: 'Les antidépresseurs et les thymorégulateurs disponibles en France, rangés par mécanisme selon la nomenclature NbN (ANSM et RCP, état d’octobre 2026). Filtre par profil, puis ouvre une fiche : indications de l’AMM, posologie, effets indésirables, interactions, situations particulières et conseils pratiques.',
  histIntro: 'Presque tous les antidépresseurs et thymorégulateurs ont été trouvés par hasard, en cherchant autre chose : un antituberculeux, un antihistaminique, un solvant, un sel d’urate. Les mécanismes ont été compris après coup, et l’hypothèse monoaminergique s’est construite à partir de ces découvertes.',
  sources: [
    'Stahl SM. _Stahl’s Essential Psychopharmacology_, 4e éd. Cambridge University Press, 2013.',
    'Stahl SM. _Prescriber’s Guide_, 7e éd. Cambridge University Press, 2021.',
    'Shorter E. _A History of Psychiatry: From the Era of the Asylum to the Age of Prozac_. Wiley, 1997.',
    'HAS. Épisode dépressif caractérisé de l’adulte : prise en charge en soins de premier recours. Recommandation, octobre 2017.',
    'Bennabi D et al. Clinical guidelines for the management of treatment-resistant depression: French recommendations from experts, the French Association for Biological Psychiatry and Neuropsychopharmacology and the fondation FondaMental. _BMC Psychiatry_ 2019;19:262.',
    'Yatham LN et al. CANMAT and ISBD 2018 guidelines for the management of patients with bipolar disorder. _Bipolar Disord_ 2018;20:97–170.',
    'Cipriani A et al. Comparative efficacy and acceptability of 21 antidepressant drugs. _Lancet_ 2018;391:1357–66.',
    'ANSM, dossier « Antidépresseurs » et disponibilité des médicaments (2026) ; cadre de prescription compassionnelle de la kétamine (mars 2026) ; RCP des spécialités ; avis de la Commission de la transparence (HAS).',
    'Rabu C. Antidépresseurs. Cours du DU de pharmaco-psychiatrie, GHU Henri Mondor, 2022.'
  ],
  foot: 'Contenu rédigé d’après Stahl (_Essential Psychopharmacology_, 4e éd., 2013 ; _Prescriber’s Guide_, 7e éd., 2021), Shorter (_A History of Psychiatry_, 1997), les recommandations françaises et internationales et les RCP français. Les textes sont reformulés et les figures sont originales. Ressource pédagogique : elle ne remplace ni le RCP ni un avis médical ; vérifier les posologies et les règles de prescription en vigueur avant de prescrire.'
};
C.sisters = [];

C.chapters = [
  { id: 'ouv', n: '00', t: 'Ouverture', mins: 8, emblem: 'hourglass', sub: 'Une histoire, trois questions, un plan.' },
  { id: 'chimio', n: '01', t: 'Chimioarchitecture', mins: 21, emblem: 'funnel', sub: 'Trois monoamines, une poignée de noyaux, presque tout le cerveau.' },
  { id: 'ad', n: '02', t: 'Antidépresseurs', mins: 30, emblem: 'loop', sub: 'Un délai d’action, dix mécanismes, vingt-quatre molécules.' },
  { id: 'thymo', n: '03', t: 'Thymorégulateurs', mins: 25, emblem: 'spiral', sub: 'Traiter et prévenir, par le haut et par le bas.' },
  { id: 'strat', n: '04', t: 'Stratégies', mins: 24, emblem: 'arch', sub: 'Choisir, suivre, changer, associer, arrêter.' },
  { id: 'clot', n: '05', t: 'Clôture', mins: 7, emblem: 'grid', sub: 'Répondre, retenir, revenir.' }
];

C.objectives = {
  O1: { t: 'Décrire la vie d’une monoamine (synthèse, stockage, libération, recapture, dégradation) et y situer les cibles des antidépresseurs.', sid: 'vie-monoamine' },
  O2: { t: 'Situer les voies sérotoninergiques, noradrénergiques et dopaminergiques, et relier leurs projections aux effets voulus et indésirables.', sid: 'voies' },
  O3: { t: 'Expliquer le délai d’action par la désensibilisation des autorécepteurs, et en tirer le calendrier du suivi (S1–S2, S2, S4–S8).', sid: 'synapse-isrs' },
  O4: { t: 'Lire un profil d’affinités pour prévoir sédation, poids, effets anticholinergiques, hypotension et toxicité.', sid: 'affinite' },
  O5: { t: 'Classer les antidépresseurs disponibles en France par mécanisme et connaître la particularité pratique de chacun.', sid: 'pharmacopee-ad' },
  O6: { t: 'Prescrire et surveiller le lithium : bilan, lithiémie, interactions, intoxication.', sid: 'lithium-pratique' },
  O7: { t: 'Connaître la place, les risques et les règles de prescription du valproate, de la carbamazépine, de la lamotrigine et des antipsychotiques de 2e génération.', sid: 'valproate' },
  O8: { t: 'Conduire la stratégie après un échec : optimiser, changer, associer, potentialiser ; reconnaître une dépression résistante.', sid: 'echec' },
  O9: { t: 'Changer d’antidépresseur et l’arrêter sans danger : fenêtres thérapeutiques, syndrome d’arrêt, décroissance.', sid: 'arret' },
  O10: { t: 'Adapter la prescription aux situations particulières et reconnaître un syndrome sérotoninergique.', sid: 'serotoninergique' }
};

C.classes = {
  isrs: { t: 'ISRS' }, irsna: { t: 'IRSNa' }, atc: { t: 'Imipraminiques' }, imao: { t: 'IMAO' }, a2: { t: 'Antagonistes α2' }, autre: { t: 'Autres mécanismes' },
  li: { t: 'Lithium' }, ac: { t: 'Anticonvulsivants' }, apa: { t: 'Antipsychotiques de 2e génération' }
};
C.tileGroups = [
  { id: 'isrs', t: 'Inhibiteurs sélectifs de la recapture de la sérotonine', nbn: 'SERT', mols: ['citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline'] },
  { id: 'irsna', t: 'Inhibiteurs de la recapture de la sérotonine et de la noradrénaline', nbn: 'SERT + NET', mols: ['venlafaxine', 'duloxetine', 'milnacipran'] },
  { id: 'atc', t: 'Imipraminiques', nbn: 'SERT, NET + H1, M1, α1, Na⁺', mols: ['amitriptyline', 'clomipramine', 'imipramine', 'dosulepine', 'doxepine', 'maprotiline', 'trimipramine'] },
  { id: 'imao', t: 'Inhibiteurs de la monoamine oxydase', nbn: 'MAO-A, MAO-B', mols: ['iproniazide', 'moclobemide'] },
  { id: 'a2', t: 'Antagonistes α2', nbn: 'α2, 5-HT2, 5-HT3, H1', mols: ['mirtazapine', 'mianserine'] },
  { id: 'autre', t: 'Autres mécanismes', nbn: 'multimodal · MT1/MT2 · µ · NMDA', mols: ['vortioxetine', 'agomelatine', 'tianeptine', 'esketamine'] },
  { id: 'li', t: 'Lithium', nbn: 'IMPase, GSK-3', mols: ['lithium'] },
  { id: 'ac', t: 'Anticonvulsivants', nbn: 'canaux sodiques voltage-dépendants', mols: ['divalproate', 'valpromide', 'carbamazepine', 'lamotrigine'] },
  { id: 'apa', t: 'Antipsychotiques de 2e génération', nbn: 'D2, 5-HT2A et autres', mols: ['quetiapine', 'aripiprazole', 'olanzapine', 'risperidone', 'asenapine', 'cariprazine', 'lurasidone'] }
];

/* Déroulé de la séance (page d’accueil) : minutes depuis le début */
C.plan = [
  { from: 0, to: 8, t: 'Ouverture', m: 'Une histoire de 1952 et trois questions laissées en suspens.', sid: 'couverture' },
  { from: 8, to: 29, t: 'Chimioarchitecture', m: 'La vie d’une monoamine, les voies, les récepteurs, les affinités.', sid: 'sec-chimio' },
  { from: 29, to: 59, t: 'Antidépresseurs', m: 'Le délai d’action sur la synapse animée, les classes une à une, dix mécanismes, l’échelle de Hamilton.', sid: 'sec-ad' },
  { from: 59, to: 64, t: 'Pause', m: 'Cinq minutes ; la synapse reste en ligne.', sid: 'pause' },
  { from: 64, to: 89, t: 'Thymorégulateurs', m: 'La boussole, le lithium (titration et lithiémie), les anticonvulsivants, les antipsychotiques.', sid: 'sec-thymo' },
  { from: 89, to: 113, t: 'Stratégies', m: 'Choisir selon la dimension et la forme clinique, suivre, changer, associer, arrêter ; les situations particulières.', sid: 'sec-strat' },
  { from: 113, to: 120, t: 'Clôture', m: 'Les trois questions du début, sept messages, des codes QR pour revenir.', sid: 'post-delai' }
];

/* Pages des laboratoires */
C.labs = {
  synapse: { p: 'Une synapse vue de près, puis le neurone entier. Choisis une molécule et avance étape par étape : une notion à la fois, et un halo clair sur ce qu’il faut regarder. Les molécules sortent des vésicules, se fixent un instant sur les récepteurs, rentrent par les transporteurs ; les gélules du médicament se logent dans leur cible. Modèle qualitatif d’après Blier et de Montigny, repris par Stahl (2013, fig. 7-13 à 7-17).', sids: ['delai-predict', 'synapse-isrs', 'antagonistes-a2'] },
  voies: { p: 'Un plan de lignes plutôt qu’une coupe anatomique : les noyaux du tronc cérébral en bas, les régions cibles au-dessus, une couleur par système (vert pour la sérotonine, or pour la noradrénaline, rouge pour la dopamine), et des voies qui ne se croisent jamais. Allume ou éteins chaque système, clique sur une région, puis lis la carte « avec » une molécule : les effets voulus et indésirables suivent les projections.', sids: ['voies', 'voies-isrs'] },
  empreintes: { p: 'Une ligne par molécule, une colonne par cible ; plus la pastille est grosse, plus l’affinité est forte (Ki petit). Survole une pastille pour lire la valeur, clique sur une colonne pour voir ce qu’entraîne l’action sur cette cible.', sids: ['affinite', 'imipraminiques'] },
  lithiemie: { p: 'Deux simulations à un compartiment chez une adulte de 70 kg (DFG 75 mL/min par défaut). D’abord la titration de Téralithe LP 400, semaine par semaine. Puis la marge étroite : choisis la forme, le nombre de comprimés et la fonction rénale, et ajoute à J10 un AINS, un thiazidique, un IEC, une gastro-entérite ou un régime sans sel. Point blanc : prélèvement du matin, 12 h après la prise du soir ; point noir : prélèvement du soir, 24 h après la prise, juste avant la suivante (forme LP).', sids: ['lithium-pratique', 'lithium-titration', 'lithium-simulateur'] },
  delai: { p: 'Ce que la clinique montre des huit premières semaines : l’occupation du transporteur est presque immédiate, les effets indésirables viennent d’abord, l’amélioration ensuite. D’où les rendez-vous de S1–S2, le repère de S2 et l’évaluation de S4–S8.', sids: ['delai-clinique', 'suivre'] },
  thymo: { p: 'Stahl range les thymorégulateurs selon qu’ils traitent ou préviennent « par le haut » (la manie) ou « par le bas » (la dépression). Les flèches suivent les lignes de traitement de CANMAT/ISBD 2018 ; l’AMM française est indiquée à côté.', sids: ['boussole', 'apa2g'] }
};

/* ─── binding ─── */
/* Affinités (Ki, nM ; plus petit = plus affin). Valeurs recopiées des tableaux « Pharmacodynamics » de Wikipédia
   (anglais, octobre 2026), dont la base PDSP pour les tricycliques. Une plage « a–b » est lue par sa moyenne géométrique.
   Ce sont des ordres de grandeur, variables selon les études et les espèces. */
C.binding = {
  src: 'Ki en nM, d’après les tableaux de Wikipédia (base PDSP pour les tricycliques), octobre 2026 ; ordres de grandeur variables selon les études.',
  fams: { tr: 'Transporteurs', s: 'Sérotonine', na: 'Adrénergiques', da: 'Dopamine', o: 'Autres cibles' },
  famsShort: { tr: 'Transp.', s: '5-HT', na: 'NA', da: 'DA', o: 'Autres' },
  cols: [
    { id: 'sert', t: 'SERT', fam: 'tr', pane: 'c-sert', fx: 'Bloquer le SERT : effet antidépresseur et anxiolytique à terme ; au début, nausées et agitation ; à la longue, troubles sexuels, saignements, hyponatrémie.' },
    { id: 'net', t: 'NET', fam: 'tr', pane: 'c-net', fx: 'Bloquer le NET : énergie, concentration, effet antalgique ; tachycardie, sueurs, hausse tensionnelle, rétention urinaire. Dans le cortex préfrontal, le NET recapte aussi la dopamine.' },
    { id: 'dat', t: 'DAT', fam: 'tr', pane: 'c-dat', fx: 'Bloquer le DAT : activation, motivation. Parmi les antidépresseurs disponibles en France, seule la sertraline s’en approche, sans conséquence clinique démontrée.' },
    { id: '5ht1a', t: '5-HT1A', fam: 's', pane: 'c-5ht1a', fx: 'Agonisme 5-HT1A (vortioxétine, aripiprazole, norquétiapine) : anxiolyse ; désensibilisation des autorécepteurs peut-être plus rapide (hypothèse).' },
    { id: '5ht2a', t: '5-HT2A', fam: 's', pane: 'c-5ht2a', fx: 'Antagonisme 5-HT2A : sommeil plus profond, moins de troubles sexuels ; associé au blocage D2, moins d’effets extrapyramidaux.' },
    { id: '5ht2c', t: '5-HT2C', fam: 's', pane: 'c-5ht2c', fx: 'Antagonisme 5-HT2C : lève le frein sur la dopamine et la noradrénaline du cortex préfrontal ; avec H1, augmente l’appétit et le poids.' },
    { id: '5ht3', t: '5-HT3', fam: 's', pane: 'c-5ht3', fx: 'Antagonisme 5-HT3 : moins de nausées (mirtazapine) ; c’est la cible de l’ondansétron.' },
    { id: '5ht7', t: '5-HT7', fam: 's', fx: 'Antagonisme 5-HT7 : rythmes circadiens, cognition (hypothèses, chez l’animal surtout).' },
    { id: 'a1', t: 'α1', fam: 'na', pane: 'c-a1', fx: 'Antagonisme α1 : hypotension orthostatique, vertiges, chutes ; une part de la sédation.' },
    { id: 'a2', t: 'α2', fam: 'na', pane: 'c-a2', fx: 'Antagonisme α2 : lève le frein sur la noradrénaline et sur la sérotonine (mirtazapine, miansérine).' },
    { id: 'd2', t: 'D2', fam: 'da', pane: 'c-d2', fx: 'Antagonisme D2 : effet antimaniaque et antipsychotique ; syndrome extrapyramidal, akathisie, hyperprolactinémie. Agonisme partiel pour l’aripiprazole.' },
    { id: 'h1', t: 'H1', fam: 'o', pane: 'c-h1', fx: 'Antagonisme H1 : sédation, augmentation de l’appétit et prise de poids.' },
    { id: 'm1', t: 'M1', fam: 'o', pane: 'c-m1', fx: 'Antagonisme muscarinique : bouche sèche, constipation, rétention urinaire, vision floue, tachycardie, confusion du sujet âgé.' },
    { id: 'sigma1', t: 'σ1', fam: 'o', pane: 'c-sigma1', fx: 'σ1 : protéine chaperon du réticulum endoplasmique ; rôle clinique incertain (fluvoxamine, sertraline).' },
    { id: 'mt1', t: 'MT1', fam: 'o', pane: 'c-mt', fx: 'Agonisme MT1 et MT2 : resynchronisation des rythmes veille-sommeil (agomélatine).' },
    { id: 'mor', t: 'µ', fam: 'o', pane: 'c-mor', fx: 'Agonisme µ-opioïde : effet antidépresseur, mais tolérance, mésusage et dépendance (tianeptine).' },
    { id: 'nmda', t: 'NMDA', fam: 'o', pane: 'c-nmda', fx: 'Antagonisme NMDA : effet antidépresseur en quelques heures ; dissociation, hausse tensionnelle, mésusage (eskétamine). Valeur de la kétamine racémique ; l’eskétamine est 3 à 4 fois plus affine.' }
  ],
  rows: ['citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline', 'venlafaxine', 'duloxetine', 'milnacipran',
    'amitriptyline', 'clomipramine', 'imipramine', 'doxepine', 'dosulepine', 'trimipramine', 'maprotiline', 'mirtazapine', 'mianserine',
    'vortioxetine', 'agomelatine', 'tianeptine', 'esketamine', 'quetiapine', 'aripiprazole', 'olanzapine', 'risperidone', 'asenapine'],
  data: {
    citalopram: { sert: '1.6', net: '6190', '5ht2c': '617', a1: '1211', m1: '1430', h1: '283', sigma1: '292–404' },
    escitalopram: { sert: '0.8–1.1', net: '7800', dat: '27400', '5ht1a': '>1000', '5ht2a': '>1000', '5ht2c': '2500', a1: '3900', a2: '>1000', d2: '>1000', h1: '2000', m1: '1240', sigma1: '288' },
    fluoxetine: { sert: '1', net: '574', dat: '1092', '5ht1a': '32400', '5ht2a': '147', '5ht2c': '112', a1: '3800', h1: '3250', m1: '702–1030', sigma1: '191–240' },
    fluvoxamine: { sert: '2.5', net: '1427', '5ht2c': '5786', a1: '1288', sigma1: '36' },
    paroxetine: { sert: '0.07–0.2', net: '40–85', dat: '490', '5ht1a': '21200', '5ht2a': '6300', '5ht2c': '9000', a1: '1000–2700', a2: '3900', d2: '7700', h1: '13700–23700', m1: '72', sigma1: '≥1893' },
    sertraline: { sert: '0.15–3.3', net: '420–925', dat: '22–315', '5ht1a': '35000', '5ht2a': '2207', '5ht2c': '2298', a1: '1900', a2: '477–4100', d2: '10700', h1: '24000', m1: '427–2100', sigma1: '32–57' },
    venlafaxine: { sert: '82', net: '2480', dat: '7647' },
    duloxetine: { sert: '0.7–0.8', net: '7.5', dat: '240', '5ht2a': '504', '5ht2c': '916' },
    milnacipran: { sert: '8.44', net: '22' },
    amitriptyline: { sert: '2.8–4.3', net: '19–35', dat: '3250', '5ht1a': '≥450', '5ht2a': '18–23', '5ht2c': '4.0', '5ht7': '93–123', a1: '4.4–24', a2: '114–690', d2: '196–1460', h1: '0.5–1.1', m1: '9.6', sigma1: '300' },
    clomipramine: { sert: '0.14–0.28', net: '38–54', dat: '≥2190', '5ht1a': '≥7000', '5ht2a': '27–36', '5ht2c': '65', '5ht7': '127', a1: '3.2–38', a2: '≥535', d2: '78–190', h1: '13–31', m1: '37', sigma1: '546' },
    imipramine: { sert: '1.3–1.4', net: '20–37', dat: '8500', '5ht1a': '≥5800', '5ht2a': '80–150', '5ht2c': '120', '5ht7': '>1000', a1: '32', a2: '3100', d2: '620–726', h1: '7.6–37', m1: '46', sigma1: '332–520' },
    doxepine: { sert: '68–210', net: '13–58', dat: '≥4600', '5ht1a': '276', '5ht2a': '11–27', '5ht2c': '8.8–200', a1: '24', a2: '28–1270', d2: '360', h1: '0.09–1.23', m1: '23–80' },
    dosulepine: { sert: '8.6–78', net: '46–70', dat: '5310', '5ht1a': '4000', '5ht2a': '152', a1: '419', a2: '2400', h1: '3.6–4.0', m1: '25–26' },
    trimipramine: { sert: '149–2110', net: '≥2450', dat: '≥3780', '5ht1a': '8000', '5ht2a': '32', '5ht2c': '537', a1: '24', a2: '680', d2: '143–210', h1: '0.27–1.5', m1: '58' },
    maprotiline: { sert: '5800', net: '11–12', dat: '1000', '5ht2a': '51', '5ht2c': '122', '5ht7': '50', a1: '90', a2: '9400', d2: '350–665', h1: '0.79–2.0', m1: '570' },
    mirtazapine: { sert: '>10000', net: '>4600', dat: '>10000', '5ht1a': '3330–5010', '5ht2a': '6.3–69', '5ht2c': '8.9–39', '5ht3': '8.1', '5ht7': '265', a1: '1815', a2: '20–158', d2: '>5454', h1: '0.14–1.6', m1: '670' },
    mianserine: { sert: '4000', net: '71', dat: '9400', '5ht1a': '400–2600', '5ht2a': '1.6–55', '5ht2c': '0.63–6.5', '5ht3': '5.8–300', '5ht7': '48–56', a1: '34', a2: '73', d2: '2100–2700', h1: '0.30–1.7', m1: '820' },
    vortioxetine: { sert: '1.6', net: '113', '5ht1a': '15', '5ht2c': '180', '5ht3': '3.7', '5ht7': '19' },
    agomelatine: { '5ht2c': '631', mt1: '0.1' },
    tianeptine: { mor: '383–768' },
    esketamine: { nmda: '250–660' },
    quetiapine: { sert: '>10000', net: '>10000', '5ht1a': '320–432', '5ht2a': '96–101', '5ht2c': '2502', '5ht7': '307', a1: '22', a2: '2230–3630', d2: '245', h1: '2.2–11', m1: '858' },
    aripiprazole: { sert: '900–1260', net: '1340–2840', '5ht1a': '1.7–6.4', '5ht2a': '6.7–39', '5ht2c': '11–197', '5ht7': '6.6–14', a1: '25.7', a2: '74.3', d2: '0.65–0.83', h1: '22.5–27.7', m1: '6780' },
    olanzapine: { '5ht2a': '1.32–24.2', '5ht2c': '6.4–29', '5ht3': '202', '5ht7': '105–365', a1: '109–115', a2: '192–470', d2: '3.00–106', h1: '0.65–4.9', m1: '2.5–73' },
    risperidone: { '5ht1a': '423', '5ht2a': '0.17', '5ht2c': '12.0', '5ht7': '6.60', a1: '5.0', a2: '16.5', d2: '3.57', h1: '20.1', m1: '>10000' },
    asenapine: { '5ht1a': '2.5', '5ht2a': '0.06', '5ht2c': '0.03', '5ht7': '0.13', a1: '1.2', a2: '1.2', d2: '1.3', h1: '1.0', m1: '8128' }
  }
};

/* ─── history ─── */
/* Archives : anecdotes historiques vérifiées (sources dans chaque fiche). y : année affichée ; sid : diapositive où elle apparaît. */
C.history = [
  { id: 'h-cade', y: '1949', place: 'Bundoora, Australie', t: 'Des cobayes, de l’urine et un sel de lithium', mol: 'urate-li', molName: 'urate de lithium',
    body: 'John Cade, 37 ans, ancien prisonnier de Changi, injecte à des cobayes l’urine de patients maniaques. Pour dissoudre l’acide urique, il utilise de l’urate de lithium ; le lithium seul rend les animaux placides. Il s’en administre d’abord, puis le donne à dix patients maniaques : tous s’améliorent. Le huitième, malade depuis vingt ans, jardine au neuvième jour.',
    more: 'L’article de Cade (_Med J Aust_ 1949;2:349–352) deviendra le plus cité de la revue. Mais un de ses premiers patients meurt d’intoxication, et Cade renonce : la question de la toxicité ne sera réglée qu’avec la mesure des taux sanguins.',
    src: 'Shorter 1997, p. 317–318 ; Cade, _Med J Aust_ 1949;2(36):349–352', sid: 'cade' },
  { id: 'h-sel', y: '1949', place: 'États-Unis', t: 'Le sel de régime qui tuait', mol: 'licl', molName: 'chlorure de lithium',
    body: 'L’année même de l’article de Cade, le _JAMA_ rapporte des intoxications mortelles chez des cardiaques à qui l’on avait conseillé du chlorure de lithium comme substitut du sel de table. Le lithium devient, pour vingt ans, un poison aux États-Unis.',
    src: 'Shorter 1997, p. 318 ; Talbot, _Arch Intern Med_ 1950', sid: 'cade' },
  { id: 'h-schou', y: '1952–1954', place: 'Aarhus, Danemark', t: 'Le premier essai contre placebo de la psychiatrie', mol: 'lithium', molName: 'carbonate de lithium',
    body: 'Mogens Schou, dont la famille compte des malades maniaco-dépressifs, conduit l’un des tout premiers essais contrôlés contre placebo en psychiatrie et confirme l’effet antimaniaque du lithium. À Londres, Aubrey Lewis et Michael Shepherd qualifient la prévention par le lithium de « dangerous nonsense ».',
    more: 'Sans brevet possible, le lithium n’intéresse aucun laboratoire. La FDA ne l’autorise qu’en 1970, après la menace d’un psychiatre de l’Oregon de le prescrire quand même.',
    src: 'Shorter 1997, p. 319–320 ; Schou et al., _J Neurol Neurosurg Psychiatry_ 1954;17:250–260', sid: 'cade' },
  { id: 'h-seaview', y: '1952', place: 'Staten Island, New York', t: 'On danse dans les couloirs du sanatorium', mol: 'iproniazide', molName: 'iproniazide',
    body: 'À Sea View Hospital, des tuberculeux reçoivent un nouvel antituberculeux de Hoffmann-La Roche, l’iproniazide. Une photo de presse les montre en train de danser ; la légende dit : « dancing in the halls tho’ there were holes in their lungs ». L’euphorie est d’abord un effet indésirable.',
    more: 'En 1957, Nathan Kline (Rockland State Hospital) en fait un « psychic energizer » chez des patients déprimés. Le Marsilid est retiré du marché américain en 1961 pour hépatotoxicité ; en France, il est resté autorisé, mais il est en rupture de stock depuis 2023.',
    src: 'Mendelson, _Psychology Today_, 2020 ; Kreston, _Discover_, 2016 ; Loomer, Saunders et Kline, 1957 ; ANSM 2026', sid: 'sea-view' },
  { id: 'h-gaddum', y: '1953', place: 'Édimbourg', t: '« Keeping us sane »', mol: 'serotonine', molName: 'sérotonine',
    body: 'Betty Twarog vient d’identifier la sérotonine comme neurotransmetteur, puis de la trouver dans le cerveau des mammifères avec Irvine Page. Le pharmacologue John Gaddum, qui vient de montrer que le LSD s’oppose aux effets de la sérotonine, écrit : « It is possible that the 5-HT in our brains plays an essential part in keeping us sane ».',
    src: 'Shorter 1997, p. 329 et 395', sid: 'reserpine' },
  { id: 'h-reserpine', y: '1955', place: 'NIH, Bethesda', t: 'La réserpine vide les vésicules… et déprime-t-elle ?', mol: 'serotonine', molName: 'sérotonine',
    body: 'Bernard Brodie montre que la réserpine, un antihypertenseur, vide les réserves de sérotonine. Des dépressions sous réserpine sont rapportées : avec les IMAO et les tricycliques, elles fondent l’hypothèse monoaminergique. Mais les observations étaient fragiles : une revue de 2023 de 35 études trouve autant d’effets dépressogènes que d’absences d’effet ou d’effets antidépresseurs.',
    src: 'Shorter 1997, p. 330 et 395 ; Baumeister et al., _J Hist Neurosci_ 2003;12:207–220 ; Strawbridge et al., _J Psychopharmacol_ 2023', sid: 'reserpine' },
  { id: 'h-kuhn', y: '1957', place: 'Münsterlingen, Suisse', t: 'Douze personnes dans la salle', mol: 'imipramine', molName: 'imipramine',
    body: 'Roland Kuhn teste pour Geigy le G 22355, une molécule dont la chaîne latérale est celle de la chlorpromazine. Sans effet net chez les schizophrènes, elle transforme ses patients déprimés : « absolutely incredible, so exciting ». Il présente ses résultats au congrès de Zurich en septembre 1957 devant douze auditeurs. L’imipramine (Tofranil) sort en 1958.',
    more: 'La chlorpromazine et l’imipramine ne diffèrent que de deux atomes : un soufre remplacé par un pont éthylène. L’amitriptyline suit en 1961.',
    src: 'Shorter 1997, p. 320–323', sid: 'kuhn' },
  { id: 'h-testfall', y: '2019', place: 'Université de Zurich', t: 'Le revers de Münsterlingen',
    body: 'Un rapport historique révèle qu’entre 1946 et 1980, Kuhn a testé au moins 67 substances, sur au moins 3 000 patients, presque toujours sans information ni consentement, et reçu de l’industrie l’équivalent d’environ 8 millions de francs suisses actuels.',
    src: 'Université de Zurich, « Testfall Münsterlingen », communiqué du 23 septembre 2019', sid: 'kuhn' },
  { id: 'h-delay', y: '1957–1961', place: 'Paris', t: 'Psycholeptiques, psychoanaleptiques, psychodysleptiques', mol: 'chlorpromazine', molName: 'chlorpromazine',
    body: 'Jean Delay et Pierre Deniker classent les psychotropes selon leur effet sur le tonus psychique ; les antidépresseurs deviennent des « thymoanaleptiques ». La classification est adoptée au congrès mondial de psychiatrie de 1961. Soixante ans plus tard, la nomenclature NbN propose de nommer les molécules par leur mécanisme plutôt que par leur indication.',
    src: 'Classification de Delay et Deniker (1957, 1961) ; Zohar et al., _Eur Neuropsychopharmacol_ 2015', sid: 'pharmacopee-ad' },
  { id: 'h-fromage', y: '1963', place: 'Maudsley, Londres', t: 'Le fromage du pharmacien', mol: 'tyramine', molName: 'tyramine',
    body: 'Un pharmacien signale à Barry Blackwell, jeune interne, que sa femme sous IMAO fait des céphalées et des poussées tensionnelles après avoir mangé du fromage. Blackwell et un collègue prennent un IMAO pendant une semaine et mangent du fromage : il ne se passe rien. Il publie quand même dans le _Lancet_ en 1963 : la tyramine du fromage, non dégradée par la MAO intestinale, libère massivement la noradrénaline.',
    src: 'Carlat 2003, d’après Healy, _The Antidepressant Era_, 1997', sid: 'imao' },
  { id: 'h-carlsson', y: '1968', place: 'Göteborg', t: 'Les tricycliques bloquent la recapture', mol: 'clomipramine', molName: 'clomipramine',
    body: 'Arvid Carlsson montre que les tricycliques bloquent la recapture de la sérotonine dans le cerveau. Il conseille Astra pour créer une molécule plus sélective : la zimélidine, premier ISRS commercialisé en 1981, retirée deux ans plus tard pour des effets indésirables graves.',
    src: 'Shorter 1997, p. 330 et 396', sid: 'isrs' },
  { id: 'h-prozac', y: '1987', place: 'Eli Lilly, Indianapolis', t: 'Lilly 110140', mol: 'fluoxetine', molName: 'fluoxétine',
    body: 'Ray Fuller, David Wong et Bryan Molloy sélectionnent en 1974 le composé Lilly 110140, un inhibiteur spécifique de la recapture de la sérotonine. La FDA autorise la fluoxétine en décembre 1987 ; en 1990, c’est le médicament le plus prescrit par les psychiatres américains, et en 1994 le deuxième médicament le plus vendu au monde.',
    more: 'Shorter souligne que ces molécules ne corrigent probablement pas un « déficit » de sérotonine : elles modifient un système qui fonctionne.',
    src: 'Shorter 1997, p. 396–399', sid: 'isrs' },
  { id: 'h-moclobemide', y: '1972–1992', place: 'Hoffmann-La Roche', t: 'Un IMAO qui se détache', mol: 'moclobemide', molName: 'moclobémide',
    body: 'Le moclobémide, découvert en 1972, inhibe la MAO-A de façon réversible : la tyramine peut encore déplacer la molécule et être dégradée. Première AMM en Suède en 1989, lancement en 1992 : les restrictions alimentaires deviennent modestes.',
    src: 'Roche ; Stahl’s Prescriber’s Guide, 7e éd., 2021', sid: 'imao' },
  { id: 'h-grenoble', y: '1962', place: 'Grenoble', t: 'Le solvant qui protégeait les souris', mol: 'valproate', molName: 'acide valproïque',
    body: 'Pierre Eymard prépare une thèse sur des dérivés de la khelline, insolubles ; H. et Y. Meunier proposent de les dissoudre dans l’acide valproïque. Gilbert Carraz constate que le solvant seul protège les souris des convulsions. Résultats présentés le 19 décembre 1962 ; Dépakine en 1967.',
    more: 'Le valpromide (Dépamide) est préparé pour renforcer les propriétés psychotropes ; Pierre-Albert Lambert le décrit en 1966 et l’utilise dans les troubles de l’humeur à partir de 1977.',
    src: 'Monneret, _L’Actualité chimique_ 2016;413:5 ; Lambert et Borselli, 1966', sid: 'valproate' },
  { id: 'h-ketamine', y: '1962–2019', place: 'Parke-Davis, puis le NIMH', t: 'Un anesthésique devenu antidépresseur', mol: 'esketamine', molName: 'eskétamine',
    body: 'Calvin Stevens synthétise en 1962 la kétamine (CI-581), anesthésique dissociatif autorisé en 1970. En 2000, Berman et ses collègues observent un effet antidépresseur en quelques heures après une seule perfusion ; l’énantiomère S, l’eskétamine, est autorisé en spray nasal en 2019.',
    src: 'Berman et al., _Biol Psychiatry_ 2000 ; FDA 2019 ; HAS, avis du 17 juillet 2024', sid: 'esketamine' },
  { id: 'h-tianeptine', y: '2012', place: 'France', t: 'Un antidépresseur sur ordonnance sécurisée', mol: 'tianeptine', molName: 'tianeptine',
    body: 'Devant les cas d’abus et de dépendance, la tianeptine est soumise en France, depuis le 3 septembre 2012, à une partie de la réglementation des stupéfiants. En 2014, on montre que c’est un agoniste complet du récepteur µ-opioïde : son mécanisme « sérotoninergique » était faux.',
    src: 'Arrêté du 27 juillet 2012 ; Gassaway et al., _Transl Psychiatry_ 2014', sid: 'trois-mecanismes' },
  { id: 'h-hamilton', y: '1960', place: 'Leeds', t: 'Un psychiatre statisticien invente l’étalon des essais',
    body: 'Max Hamilton, né en 1912 à Offenbach et arrivé enfant en Angleterre, est médecin de la Royal Air Force pendant la guerre, puis se forme à la psychiatrie au Maudsley. Le psychologue Cyril Burt, qui a repéré son talent mathématique, l’oriente vers les statistiques médicales. À Leeds, il publie en 1960 « A rating scale for depression » : 17 items cotés par le clinicien, de 0 à 2 ou de 0 à 4, sur 52 points.',
    more: 'Conçue pour des patients déjà diagnostiqués, souvent hospitalisés, à l’époque des tricycliques, l’échelle pèse lourd sur le sommeil, l’anxiété et les plaintes somatiques. Elle reste le critère principal de nombreux essais ; la MADRS (1979), plus courte et centrée sur le cœur de la dépression, a été conçue pour mieux suivre le changement sous traitement. Hamilton publie aussi une échelle d’anxiété (1959) ; professeur à Leeds de 1963 à 1977, il meurt en 1988.',
    src: 'Hamilton, _J Neurol Neurosurg Psychiatry_ 1960;23:56–62 ; Bagby et al., _Am J Psychiatry_ 2004', sid: 'hamilton' },
  { id: 'h-mianserine', y: '1967–1979', place: 'Organon, Pays-Bas', t: 'Le frein α2, compris après coup', mol: 'mianserine', molName: 'miansérine',
    body: 'Brevetée par Organon en 1967, la miansérine (Org GB 94) est d’abord étudiée pour ses propriétés antisérotoninergiques et antihistaminiques. Son profil à l’EEG, proche de celui de l’amitriptyline, en fait un antidépresseur présumé ; les essais des années 1970 le confirment, sans les effets anticholinergiques ni la toxicité en surdosage des tricycliques. Elle est commercialisée en Allemagne en 1975, en France en 1979 (Athymil).',
    more: 'Son mécanisme principal, le blocage des récepteurs α2 qui freinent la libération de noradrénaline, n’est décrit qu’en 1977 (Baumann et Maître) : un nouveau mécanisme antidépresseur, une fois encore compris après la molécule. La mirtazapine, analogue proche, arrive au milieu des années 1990.',
    src: 'Fink et al., _Psychopharmacology_ 1977 ; Baumann et Maître 1977 ; Rabu 2022 (DU de pharmaco-psychiatrie)', sid: 'antagonistes-a2' }
];

/* ─── mols-ad ─── */
/* Fiches molécules — antidépresseurs (France). Sources : voir le champ src de chaque fiche. */
Object.assign(C.mols, {
  citalopram: {
    dci: 'Citalopram', brand: 'Seropram · génériques', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    tags: ['sex', 'poidsneutre', 'qt', 'age', 'grossesse'],
    note: 'QT : 20 mg/j au plus après 65 ans',
    lead: 'ISRS bien toléré et peu sujet aux interactions, mais qui allonge le QT de façon dose-dépendante : **40 mg/j** au plus, **20 mg/j** après 65 ans, jamais avec un autre médicament allongeant le QT.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 1–2 nM ; NET ≈ 6 200 nM) ; léger antagonisme H1 (≈ 280 nM), source possible de sédation. L’énantiomère R, inactif, gênerait l’action du S (escitalopram).',
    ind: ['Épisode dépressif caractérisé', 'Prévention des attaques de panique avec ou sans agoraphobie', 'Pas d’AMM dans le TOC en France'],
    dose: ['20 mg/j en une prise (dose minimale efficace) ; maximum 40 mg/j', 'Trouble panique : 10 mg/j la première semaine, puis 20 mg/j', 'Après 65 ans : 10 mg/j au départ, 20 mg/j au maximum'],
    pk: 'Demi-vie ≈ 33 h ; métabolites déméthylés moins actifs. CYP2C19 (≈ 38 %), 3A4 et 2D6 (≈ 31 % chacun) : peu d’interactions majeures ; faible inhibition du CYP2D6.',
    ae: ['Nausées, sécheresse buccale, sueurs', 'Insomnie ou somnolence, céphalées', 'Troubles sexuels dose-dépendants'],
    serious: ['Allongement du [[qt|QT]], torsades de pointes', '[[hyponatremie|Hyponatrémie]], surtout chez la femme âgée', 'Saignements ; [[syndrome-serotoninergique|syndrome sérotoninergique]] en association'],
    inter: ['Contre-indiqué : IMAO irréversibles ({{iproniazide|iproniazide}}), pimozide, autres médicaments allongeant le QT', 'Déconseillé : IMAO-A réversibles ({{moclobemide|moclobémide}}), linézolide, bleu de méthylène', 'Inhibiteurs du CYP2C19 (oméprazole, fluconazole, fluvoxamine), cimétidine : réduire la dose si besoin'],
    monitor: ['ECG si cardiopathie ; corriger hypokaliémie et hypomagnésémie avant de débuter', 'Natrémie chez le sujet âgé ; idées suicidaires et virage (revoir à S1 et S2)'],
    age: '10 mg/j au départ, 20 mg/j au maximum ; réduire progressivement chez le patient âgé traité au-delà.',
    preg: 'Plus de 2 500 grossesses exposées sans signal malformatif (RCP) : utilisable si nécessaire, après vérification sur le CRAT ; surveillance néonatale (HTAP). Allaitement : passage faible, prudence.',
    renal: 'Rein : pas d’adaptation si insuffisance légère à modérée ; contre-indiqué sous 20 mL/min. Foie : 10 mg/j deux semaines, puis 20 mg/j au plus.',
    cardio: 'Contre-indiqué si QT long congénital ou acquis ; prudence si insuffisance cardiaque, infarctus récent ou bradycardie.',
    stop: 'Décroissance sur au moins 1–2 semaines. IMAO irréversible → citalopram : 14 jours ; citalopram → IMAO : 7 jours.',
    pearls: ['Chercher les médicaments allongeant le QT déjà prescrits (hydroxyzine, dompéridone, méthadone, antipsychotiques) : association contre-indiquée', 'Pas d’AMM dans le TOC en France : préférer un autre ISRS ou la {{clomipramine|clomipramine}}', 'Simple chez le polymédiqué (trois voies métaboliques), sous réserve du QT'],
    src: 'RCP Seropram (ANSM, 2025) ; ANSM 2011 et 2022 (QT) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  escitalopram: {
    dci: 'Escitalopram', brand: 'Seroplex · génériques', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    tags: ['nonsed', 'poidsneutre', 'sex', 'qt', 'age'],
    note: 'AMM anxieuses larges, QT à surveiller',
    lead: 'Énantiomère actif du citalopram, l’ISRS le plus sélectif et parmi les mieux tolérés, avec cinq AMM ; même contrainte sur le QT : **20 mg/j** au plus, **10 mg/j** après 65 ans.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 0,8–1,1 nM) sans affinité notable ailleurs (NET ≈ 7 800 nM, H1 ≈ 2 000 nM) ; se lie aussi à un site allostérique du SERT (pertinence clinique inconnue).',
    ind: ['Épisode dépressif caractérisé', 'Trouble panique avec ou sans agoraphobie', 'Trouble anxiété sociale', 'Trouble anxiété généralisée', 'Trouble obsessionnel compulsif'],
    dose: ['10 mg/j en une prise ; maximum 20 mg/j', 'Trouble panique : 5 mg/j la première semaine, puis 10 mg/j', 'Après 65 ans, insuffisance hépatique ou métaboliseur lent du CYP2C19 : 5 mg/j, puis 10 mg/j au plus'],
    pk: 'Demi-vie ≈ 30 h ; métabolisme surtout par le [[cyp2c19|CYP2C19]] (aussi 3A4 et 2D6) ; pas d’inhibition notable des CYP, d’où très peu d’interactions.',
    ae: ['Nausées, diarrhée, sueurs', 'Insomnie ou somnolence, céphalées, vertiges', 'Troubles sexuels'],
    serious: ['Allongement du [[qt|QT]] dose-dépendant', '[[hyponatremie|Hyponatrémie]], saignements', 'Virage maniaque ; syndrome sérotoninergique en association'],
    inter: ['Contre-indiqué : IMAO non sélectifs irréversibles, IMAO-A réversibles ({{moclobemide|moclobémide}}), linézolide, médicaments allongeant le QT', 'Inhibiteurs du CYP2C19 (oméprazole, fluvoxamine) : prudence, réduire la dose si besoin'],
    monitor: ['ECG si facteurs de risque ; corriger hypokaliémie et hypomagnésémie avant de débuter', 'Natrémie chez le sujet âgé'],
    age: '5 mg/j au départ, 10 mg/j au maximum après 65 ans.',
    preg: 'Données jugées limitées par le RCP : seulement si nécessaire, après vérification sur le CRAT ; HTAP néonatale ≈ 5/1 000 (contre 1–2/1 000). Allaitement déconseillé par le RCP.',
    renal: 'Rein : pas d’adaptation si insuffisance légère à modérée ; prudence sous 30 mL/min. Foie : 5 mg/j deux semaines, puis 10 mg/j.',
    cardio: 'Contre-indiqué si QT long congénital ou acquis ; prudence si insuffisance cardiaque non équilibrée, infarctus récent, bradycardie.',
    stop: 'Décroissance sur au moins 1–2 semaines. IMAO irréversible → escitalopram : 14 jours ; escitalopram → IMAO : 7 jours.',
    pearls: ['Les ISRS occupent ≈ 80 % du SERT dès les doses minimales efficaces (Meyer 2004) : évaluer 10 mg/j sur 4–8 semaines avant d’augmenter', 'Parmi les plus efficaces et les mieux acceptés (Cipriani 2018)', 'Bon socle pour une potentialisation ({{quetiapine|quétiapine}}, {{aripiprazole|aripiprazole}}, {{lithium|lithium}})'],
    src: 'RCP Seroplex (ANSM, 2026) ; ANSM 2011 et 2022 (QT) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Meyer 2004 ; Cipriani 2018 ; Wikipédia pour les Ki'
  },

  fluoxetine: {
    dci: 'Fluoxétine', brand: 'génériques (ex-Prozac)', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    status: 'tension d’approvisionnement (20 mg), sept. 2026',
    tags: ['nonsed', 'poidsneutre', 'sex', 'cyp'],
    note: 'demi-vie longue, inhibiteur du 2D6',
    lead: 'ISRS plutôt activateur, à très longue demi-vie : syndrome d’arrêt rare, mais **5 semaines** d’attente avant un IMAO et inhibition puissante du CYP2D6. AMM dans la dépression de l’enfant dès 8 ans.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 1 nM) ; antagoniste [[r5ht2c|5-HT2C]] (≈ 110 nM), piste pour son effet activateur. La norfluoxétine, métabolite actif, inhibe aussi le SERT (≈ 19 nM).',
    ind: ['Épisode dépressif caractérisé (adulte)', 'Trouble obsessionnel compulsif', 'Boulimie, en complément d’une psychothérapie', 'Enfant ≥ 8 ans, adolescent : épisode dépressif modéré à sévère après échec de 4–6 séances de psychothérapie, en association'],
    dose: ['Dépression, TOC : 20 mg/j le matin ; jusqu’à 60 mg/j', 'Boulimie : 60 mg/j', 'Enfant : 10 puis 20 mg/j ; sujet âgé : en général ≤ 40 mg/j'],
    pk: 'Demi-vie 4–6 jours (norfluoxétine 4–16 jours) : équilibre et élimination en plusieurs semaines. Inhibition puissante du [[cyp2d6|CYP2D6]], à prendre en compte jusqu’à 5 semaines après l’arrêt.',
    ae: ['Nervosité, insomnie, agitation au début', 'Nausées, diarrhée, perte d’appétit', 'Troubles sexuels, sueurs'],
    serious: ['[[virage-maniaque|Virage maniaque]] ; idées suicidaires du sujet jeune', 'Hyponatrémie, saignements', 'Dysfonction sexuelle pouvant persister après l’arrêt (RCP des ISRS et IRSNa, EMA 2019)'],
    inter: ['Contre-indiqué : IMAO non sélectifs irréversibles ({{iproniazide|iproniazide}}) ; métoprolol dans l’insuffisance cardiaque', 'Déconseillé : linézolide, bleu de méthylène, tamoxifène, méquitazine', 'Substrats du 2D6 à marge étroite (tricycliques, flécaïnide, propafénone) : taux augmentés'],
    monitor: ['Activation, akathisie, idées suicidaires les premières semaines, surtout avant 25 ans'],
    age: 'En général ≤ 40 mg/j ; demi-vie et inhibition du 2D6 compliquent la polymédication.',
    preg: 'RCP restrictif (malformations cardiaques ≈ 2/100 contre 1/100 dans quelques études ; HTAP) : vérifier sur le CRAT, ne pas arrêter brutalement. Allaitement : passage dans le lait, envisager l’arrêt de l’allaitement.',
    renal: 'Rein : pas d’adaptation. Foie : moins de 20 mg/j, ou un jour sur deux.',
    cardio: 'Mise en garde sur l’allongement du QT ; métoprolol contre-indiqué dans l’insuffisance cardiaque (bradycardie).',
    stop: 'Arrêt progressif sur 1–2 semaines (RCP), syndrome d’arrêt rare. IMAO irréversible → fluoxétine : 2 semaines ; fluoxétine → IMAO : au moins 5 semaines.',
    pearls: ['Éviter d’emblée si anxiété ou insomnie marquées ; utile si asthénie, hypersomnie, hyperphagie', 'Vérifier le CYP2D6 avant d’associer : tricycliques, bêtabloquants, codéine, tamoxifène, {{risperidone|rispéridone}}', 'Peut servir de relais pour arrêter un ISRS à demi-vie courte (hors AMM)'],
    hist: 'Issue du composé « Lilly 110140 » (Molloy, Wong et Fuller, 1974), autorisée par la FDA en décembre 1987 ; le Prozac est en 1994 le deuxième médicament le plus vendu au monde.',
    src: 'RCP Prozac (ANSM, 2021) ; avis CT HAS 2017 ; Vidal (arrêts de commercialisation) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Shorter 1997 ; Wikipédia pour les Ki ; ANSM 2026'
  },

  fluvoxamine: {
    dci: 'Fluvoxamine', brand: 'Floxyfral · génériques', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    tags: ['sed', 'poidsneutre', 'sex', 'cyp'],
    note: 'interactions majeures (CYP1A2, 2C19)',
    lead: 'ISRS de la dépression et du TOC, plutôt sédatif, dont le problème est pharmacocinétique : inhibiteur puissant des CYP1A2 et 2C19 (clozapine, théophylline, caféine, agomélatine, duloxétine).',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 2,5 nM) ; plus forte affinité [[sigma1|σ1]] des ISRS (≈ 17–36 nM, agoniste), invoquée sans preuve formelle pour ses effets anxiolytiques rapides.',
    ind: ['Épisode dépressif caractérisé', 'Trouble obsessionnel compulsif (adulte ; enfant à partir de 8 ans)'],
    dose: ['Dépression : 50 ou 100 mg le soir ; habituellement 100 mg/j ; maximum 300 mg/j', 'TOC : 50 mg/j puis 100–300 mg/j ; enfant ≥ 8 ans : 25 mg/j, paliers de 25 mg, maximum 200 mg/j'],
    pk: 'Demi-vie 17–22 h à doses répétées. Inhibe fortement les [[cyp1a2|CYP1A2]] et [[cyp2c19|CYP2C19]], plus modestement 2C9 et 3A4 ; le tabac, inducteur du 1A2, abaisse ses taux.',
    ae: ['Nausées, vomissements, dyspepsie au début', 'Somnolence, asthénie', 'Troubles sexuels, sueurs'],
    serious: ['Syndrome sérotoninergique en association', 'Hyponatrémie, saignements', 'Convulsions, virage maniaque (rares)'],
    inter: ['Contre-indiqué : tizanidine, pimozide, IMAO ; {{agomelatine|agomélatine}} et {{duloxetine|duloxétine}} (selon leurs RCP)', 'Clozapine, olanzapine, théophylline, caféine, tricycliques : taux augmentés, réduire ou surveiller', 'Clopidogrel non recommandé ; warfarine, méthadone, benzodiazépines : surveillance'],
    monitor: ['Tolérance et taux des médicaments associés (clozapine, théophylline)', 'Natrémie chez le sujet âgé'],
    age: 'Titrer plus lentement ; vérifier les interactions chez le polymédiqué.',
    preg: '« Ne doit pas être utilisé » sauf si l’état clinique le nécessite (RCP) : préférer un ISRS mieux documenté, vérifier sur le CRAT. Allaitement : à éviter (RCP).',
    renal: 'Rein : débuter bas, surveillance accrue. Foie : idem.',
    cardio: 'Peu d’effet cardiaque propre ; allongement du QT par interaction (pimozide contre-indiqué).',
    stop: 'Décroissance sur au moins 1–2 semaines. IMAO irréversible → fluvoxamine : 2 semaines ; réversible : le lendemain ; fluvoxamine → IMAO : 1 semaine.',
    pearls: ['Avant de prescrire, chercher clozapine, olanzapine, théophylline, tizanidine et une forte consommation de caféine', 'TOC résistant : association à la {{clomipramine|clomipramine}}, dont elle freine la déméthylation (expert, hors AMM)', 'Commencer ou arrêter de fumer modifie ses taux'],
    src: 'RCP Floxyfral (ANSM, 2026) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia pour les Ki'
  },

  paroxetine: {
    dci: 'Paroxétine', brand: 'Deroxat · génériques', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    tags: ['sed', 'sex', 'cyp', 'sevrage'],
    note: 'l’arrêt le plus difficile des ISRS',
    lead: 'ISRS le plus puissant sur le SERT, six AMM, mais le plus anticholinergique, le plus difficile à arrêter et un inhibiteur puissant du CYP2D6 ; pendant la grossesse, seulement si strictement nécessaire.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 0,1 nM) ; antagoniste muscarinique [[m1|M1]] (≈ 72 nM) : bouche sèche, constipation, sédation ; faible inhibition du NET (≈ 40–85 nM).',
    ind: ['Épisode dépressif caractérisé', 'TOC ; trouble panique avec ou sans agoraphobie', 'Trouble anxiété sociale ; trouble anxiété généralisée', 'État de stress post-traumatique'],
    dose: ['Une prise le matin, au petit déjeuner ; paliers de 10 mg', 'Dépression, anxiété sociale, TAG, ESPT : 20 mg/j, maximum 50 mg/j', 'TOC : 20 puis 40 mg/j ; panique : 10 puis 40 mg/j ; maximum 60 mg/j (sujet âgé : 40 mg/j)'],
    pk: 'Demi-vie ≈ 24 h, métabolites inactifs. Inhibe puissamment le [[cyp2d6|CYP2D6]], qui le métabolise : il freine son propre métabolisme (cinétique non linéaire).',
    ae: ['Somnolence, asthénie, sueurs', 'Bouche sèche, constipation, nausées', 'Troubles sexuels fréquents ; prise de poids possible'],
    serious: ['[[syndrome-arret|Syndrome d’arrêt]] fréquent et intense', 'Akathisie, idées suicidaires ; déconseillée avant 18 ans', 'Hyponatrémie, saignements'],
    inter: ['Contre-indiqué : IMAO (y compris réversibles), thioridazine, pimozide', 'Déconseillé : tamoxifène (moins d’endoxifène actif)', 'Substrats du 2D6 : tricycliques, {{risperidone|rispéridone}}, atomoxétine, flécaïnide, bêtabloquants'],
    monitor: ['Akathisie, agitation, idées suicidaires les premières semaines', 'Natrémie chez le sujet âgé'],
    age: 'Maximum 40 mg/j ; effets anticholinergiques et interactions : rarement le meilleur choix.',
    preg: 'Signal de malformations cardiaques (< 2/100 contre ≈ 1/100) : « seulement si strictement nécessaire » (RCP) ; discuter une alternative si projet de grossesse, vérifier sur le CRAT. Allaitement envisageable.',
    renal: 'Rein : dose minimale si clairance < 30 mL/min. Foie : dose minimale en cas d’insuffisance hépatique.',
    cardio: 'Données rassurantes chez le cardiaque (Stahl) ; prudence avec les antiarythmiques et bêtabloquants métabolisés par le 2D6.',
    stop: 'Baisser de 10 mg par semaine au plus, parfois sur des mois ; reprendre la dose précédente si symptômes gênants. IMAO irréversible → paroxétine : 2 semaines (réversible : 24 h) ; paroxétine → IMAO : 1 semaine.',
    pearls: ['Arrêt difficile : baisses proportionnelles, plus petites en fin de décroissance (Horowitz et Taylor 2019), ou relais par la {{fluoxetine|fluoxétine}} (hors AMM)', 'Distinguer syndrome d’arrêt (jours suivant une baisse, vertiges, « décharges ») et rechute (plus tardive)', 'À éviter si projet de grossesse ou tamoxifène'],
    src: 'RCP Deroxat (ANSM, 2025) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Horowitz et Taylor 2019 ; Wikipédia pour les Ki'
  },

  sertraline: {
    dci: 'Sertraline', brand: 'Zoloft · génériques', cls: 'isrs',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT)',
    tags: ['nonsed', 'poidsneutre', 'sex', 'age', 'grossesse'],
    note: 'la référence cardiaque',
    lead: 'L’ISRS le mieux documenté chez le patient cardiaque et l’un des plus étudiés pendant la grossesse ; large éventail d’AMM, peu d’interactions aux doses usuelles.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 0,3 nM) ; affinité plus faible pour le [[dat|DAT]] (22–315 nM) et σ1 (32–57 nM), sans conséquence clinique démontrée.',
    ind: ['Épisode dépressif caractérisé et prévention des récidives', 'Trouble panique ; trouble anxiété sociale ; état de stress post-traumatique', 'TOC (adulte ; enfant et adolescent de 6 à 17 ans)'],
    dose: ['Dépression, TOC : 50 mg/j en une prise', 'Panique, anxiété sociale, ESPT : 25 mg/j la première semaine, puis 50 mg/j', 'Paliers de 50 mg espacés d’au moins une semaine ; maximum 200 mg/j'],
    pk: 'Demi-vie ≈ 26 h (22–36) ; N-desméthylsertraline 62–104 h. CYP3A4, 2C19, 2B6 ; faible inhibition du CYP2D6 aux doses usuelles.',
    ae: ['Nausées ; diarrhée plus fréquente qu’avec les autres ISRS', 'Insomnie ou somnolence, céphalées, tremblement', 'Troubles sexuels dose-dépendants'],
    serious: ['[[hyponatremie|Hyponatrémie]] (sujet âgé, diurétiques)', 'Saignements (AINS, antiagrégants, anticoagulants) ; hémorragie du post-partum', 'Virage maniaque ; syndrome sérotoninergique en association'],
    inter: ['Contre-indiquée avec les IMAO ({{iproniazide|iproniazide}}) et le pimozide', 'Prudence : autres sérotoninergiques (tramadol, triptans, {{lithium|lithium}}), anticoagulants, médicaments allongeant le QT'],
    monitor: ['Natrémie chez le sujet âgé ou sous diurétique le premier mois', 'Idées suicidaires et virage (revoir à S1 et S2)'],
    age: 'Même posologie, ajustement prudent (hyponatrémie).',
    preg: 'Parmi les mieux documentés : les nombreuses données ne montrent pas d’effet malformatif (RCP). Si nécessaire, poursuivre ou introduire après vérification sur le CRAT ; surveillance néonatale ([[htap|HTAP]] rare). Allaitement : passage faible, à discuter.',
    renal: 'Rein : pas d’adaptation. Foie : doses plus faibles ou plus espacées ; pas d’utilisation si insuffisance sévère.',
    cardio: 'Sûreté démontrée après infarctus ou angor instable (essai SADHART) ; prudence si facteurs de risque d’allongement du QT.',
    stop: 'Décroissance sur au moins 1–2 semaines ; syndrome d’arrêt moins marqué qu’avec la paroxétine. IMAO irréversible → sertraline : 14 jours ; sertraline → IMAO : 7 jours.',
    pearls: ['Choix raisonnable chez le coronarien et pendant la grossesse', 'Diarrhée fréquente au début : prévenir le patient', 'Patient anxieux ou déjà intolérant : débuter à 25 mg/j'],
    src: 'RCP Zoloft (ANSM, 2025) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  venlafaxine: {
    dci: 'Venlafaxine', brand: 'Effexor LP · génériques', cls: 'irsna',
    nbn: 'Sérotonine, noradrénaline · inhibiteur de la recapture (SERT, NET)',
    status: 'tension d’approvisionnement (LP 37,5 et 75 mg), sept. 2026',
    tags: ['poidsneutre', 'sex', 'sevrage'],
    note: 'dose-dépendante : PA et arrêt lent',
    lead: 'IRSNa dose-dépendant : surtout sérotoninergique aux faibles doses, aussi noradrénergique vers 225 mg/j ; surveiller la pression artérielle et arrêter très lentement.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 82 nM) bien plus que le [[net|NET]] (≈ 2 480 nM) : l’inhibition du NET n’apparaît que vers 225 mg/j (test pressif à la tyramine).',
    ind: ['Épisode dépressif caractérisé et prévention des récidives', 'Trouble anxiété généralisée ; trouble anxiété sociale', 'Trouble panique avec ou sans agoraphobie'],
    dose: ['Dépression : 75 mg/j en une prise (LP), au repas ; paliers d’au moins 2 semaines ; maximum 375 mg/j', 'TAG, anxiété sociale : 75 mg/j, jusqu’à 225 mg/j', 'Panique : 37,5 mg/j pendant 7 jours, puis 75 mg/j ; maximum 225 mg/j'],
    pk: 'Demi-vie 5 ± 2 h ; O-desméthylvenlafaxine ([[metabolite-actif|métabolite actif]] formé par le CYP2D6) 11 ± 2 h : d’où la forme LP et la sensibilité aux oublis.',
    ae: ['Nausées dose-dépendantes, bouche sèche, constipation', 'Sueurs, céphalées, insomnie ou somnolence', 'Troubles sexuels'],
    serious: ['HTA dose-dépendante', '[[syndrome-arret|Syndrome d’arrêt]] fréquent, parfois sévère', 'Hyponatrémie ; surdosage plus souvent mortel qu’avec les ISRS, moins qu’avec les tricycliques'],
    inter: ['Contre-indiqué : IMAO irréversibles', 'Linézolide : ne pas associer ; {{moclobemide|moclobémide}} : non recommandé', 'Prudence : triptans, tramadol, lithium, millepertuis'],
    monitor: ['Pression artérielle avant, puis périodiquement et après chaque augmentation', 'Natrémie (sujet âgé, diurétiques)'],
    age: 'Pas d’adaptation liée à l’âge seul ; dose minimale efficace, surveillance lors des augmentations.',
    preg: 'Seulement si le bénéfice l’emporte (RCP) ; sevrage néonatal possible, vérifier sur le CRAT. Allaitement : passage dans le lait, risque non exclu.',
    renal: 'Rein : − 50 % si clairance < 30 mL/min ou dialyse. Foie : − 50 % si insuffisance légère à modérée, davantage si sévère.',
    cardio: 'HTA à contrôler avant de débuter ; QT long et arythmies rapportés, surtout en surdosage.',
    stop: 'Jamais d’arrêt brutal : au moins 1–2 semaines, souvent des mois. IMAO irréversible → venlafaxine : 14 jours ; venlafaxine → IMAO : 7 jours.',
    pearls: ['Non-répondeur : monter vers 150–225 mg/j avant de conclure à l’échec', 'Prévenir que des oublis peuvent déclencher vertiges, paresthésies, irritabilité', 'Réponse partielle : ajouter un antagoniste α2 ({{mirtazapine|mirtazapine}}) ou potentialiser par {{lithium|lithium}} ou {{quetiapine|quétiapine}} (Bennabi 2019)'],
    src: 'RCP Effexor LP (ANSM, 2026) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Bennabi 2019 ; Wikipédia (Tatsumi 1997) pour les Ki ; ANSM 2026'
  },

  duloxetine: {
    dci: 'Duloxétine', brand: 'Cymbalta · génériques', cls: 'irsna',
    nbn: 'Sérotonine, noradrénaline · inhibiteur de la recapture (SERT, NET)',
    status: 'tension d’approvisionnement (30 et 60 mg), sept. 2026',
    tags: ['poidsneutre', 'sex', 'sevrage', 'cyp', 'douleur'],
    note: 'dépression, TAG, douleur diabétique',
    lead: 'IRSNa plus équilibré que la venlafaxine, avec une AMM dans la douleur neuropathique diabétique ; contre-indiqué si insuffisance hépatique, insuffisance rénale sévère, HTA non équilibrée, et avec la fluvoxamine.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 0,8 nM) et le [[net|NET]] (≈ 7,5 nM) dès les doses usuelles ; le renforcement des voies descendantes expliquerait l’effet antalgique.',
    ind: ['Trouble dépressif majeur (épisode dépressif caractérisé)', 'Douleur neuropathique diabétique périphérique', 'Trouble anxiété généralisée'],
    dose: ['Dépression : 60 mg/j en une prise ; jusqu’à 120 mg/j évalué, sans bénéfice établi si non-réponse à 60 mg', 'TAG : 30 puis 60 mg/j ; 90–120 mg/j si besoin', 'Douleur neuropathique : 60 mg/j, à réévaluer à 2 mois'],
    pk: 'Demi-vie ≈ 12 h (8–17) ; métabolisée par les [[cyp1a2|CYP1A2]] et [[cyp2d6|CYP2D6]] ; inhibiteur modéré du 2D6.',
    ae: ['Nausées, bouche sèche, constipation, baisse de l’appétit', 'Céphalées, somnolence ou insomnie, vertiges', 'Sueurs, troubles sexuels'],
    serious: ['Atteinte hépatique (transaminases > 10 × LSN rapportées)', 'Hyponatrémie, saignements', 'Symptômes d’arrêt chez ≈ 45 % des patients à l’arrêt brutal (23 % sous placebo)'],
    inter: ['Contre-indiqué : IMAO non sélectifs irréversibles, fluvoxamine, ciprofloxacine, énoxacine', '{{moclobemide|moclobémide}} non recommandé ; linézolide à ne pas associer', 'Inhibiteurs du 2D6 (paroxétine, fluoxétine) : taux augmentés'],
    monitor: ['Pression artérielle le premier mois si HTA ou cardiopathie, puis régulièrement', 'Signes d’atteinte hépatique'],
    age: 'Pas d’adaptation liée à l’âge ; prudence à 120 mg/j ; vérifier la clairance et les troubles mictionnels.',
    preg: 'Pas d’augmentation globale des malformations, mais risque accru (moins de 2 fois) de prématurité et d’hémorragie du post-partum : seulement si justifié, après vérification sur le CRAT. Allaitement déconseillé.',
    renal: 'Rein : pas d’adaptation entre 30 et 80 mL/min ; contre-indiquée sous 30 mL/min. Foie : contre-indiquée si maladie hépatique avec insuffisance.',
    cardio: 'Instauration contre-indiquée si HTA non équilibrée ; pas de mise en garde sur le QT dans le RCP.',
    stop: 'Décroissance sur au moins 1–2 semaines. IMAO irréversible → duloxétine : 14 jours ; duloxétine → IMAO : 5 jours.',
    pearls: ['Dépression avec douleurs : au-delà de 60 mg/j, pas de gain antalgique (Stahl)', 'Gélules gastro-résistantes à avaler entières', 'Éviter si consommation d’alcool importante'],
    src: 'RCP Cymbalta (EMA, 2024) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia pour les Ki ; ANSM 2026'
  },

  milnacipran: {
    dci: 'Milnacipran', brand: 'génériques (ex-Ixel)', cls: 'irsna',
    nbn: 'Sérotonine, noradrénaline · inhibiteur de la recapture (SERT, NET)',
    tags: ['poidsneutre', 'douleur'],
    note: 'sans CYP, mais rein et prostate',
    lead: 'IRSNa sans interaction par les CYP, éliminé par le rein (dose selon la clairance) ; contre-indiqué en cas d’hypertrophie prostatique, d’HTA non contrôlée, de coronaropathie sévère, et avec les digitaliques et les triptans.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 8 nM) et le [[net|NET]] (≈ 22 nM), de façon plus équilibrée que la venlafaxine ; pas d’affinité notable pour H1, α1 ni les récepteurs muscariniques.',
    ind: ['Épisode dépressif caractérisé de l’adulte'],
    dose: ['100 mg/j en deux prises de 50 mg, au cours des repas', 'Au-delà de 100 mg/j : efficacité et sécurité non établies', 'Clairance 30–60 mL/min : 25 mg × 2/j ; 10–30 mL/min : 25 mg/j'],
    pk: 'Demi-vie ≈ 8 h ; glucuronoconjugaison, sans rôle notable des CYP ; élimination rénale, surtout sous forme inchangée (≈ 90 %).',
    ae: ['Nausées, bouche sèche, constipation', 'Sueurs, céphalées, insomnie', 'Dysurie ; tachycardie, hausse tensionnelle'],
    serious: ['Rétention urinaire', 'Poussée hypertensive, aggravation d’une coronaropathie', '[[hyponatremie|Hyponatrémie]] (SIADH), saignements'],
    inter: ['Contre-indiqué : IMAO irréversibles, IMAO-B (sélégiline), digitaliques, triptans (agonistes 5-HT1D)', 'À ne pas associer : adrénaline ou noradrénaline parentérales, clonidine, IMAO-A (moclobémide, linézolide)', 'Précaution : lithium, buprénorphine, anticoagulants, diurétiques'],
    monitor: ['Pression artérielle et fréquence cardiaque au début, après chaque augmentation, puis régulièrement', 'Clairance de la créatinine ; troubles mictionnels'],
    age: 'Dose normale si fonction rénale normale ; calculer la clairance, rechercher une hypertrophie prostatique.',
    preg: 'Données insuffisantes : préférable d’éviter (RCP) ; vérifier sur le CRAT. Allaitement contre-indiqué.',
    renal: 'Rein : 25 mg × 2/j entre 30 et 60 mL/min, 25 mg/j entre 10 et 30 mL/min. Foie : pas d’adaptation prévue ; arrêter si ictère.',
    cardio: 'Contre-indiqué si HTA non contrôlée ou coronaropathie sévère ou instable.',
    stop: 'Décroissance progressive. IMAO irréversible → milnacipran : 2 semaines ; milnacipran → IMAO : 1 semaine.',
    pearls: ['Utile chez le polymédiqué (pas d’interaction par les CYP)', 'Interroger l’homme sur les troubles mictionnels avant et pendant le traitement', 'Fibromyalgie : AMM aux États-Unis, hors AMM en France'],
    src: 'RCP Milnacipran EG (ANSM, 2026) ; Vidal 2020 (arrêt d’Ixel) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia pour les Ki'
  },

  amitriptyline: {
    dci: 'Amitriptyline', brand: 'Laroxyl', cls: 'atc',
    nbn: 'Sérotonine, noradrénaline · multimodal (SERT, NET ; antagoniste H1, M1, α1)',
    tags: ['sed', 'poids', 'qt', 'surdos', 'douleur'],
    note: 'antalgique et sédatif, 1 goutte = 1 mg',
    lead: 'Tricyclique de référence, très efficace mais mal toléré et **dangereux en surdosage** ; 2e intention dans la dépression (HAS 2017), surtout utilisé à faible dose contre la douleur neuropathique et la migraine.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 3–4 nM) et le [[net|NET]] (≈ 20–35 nM) ; antagoniste [[h1|H1]] (≈ 1 nM), muscarinique (≈ 10 nM), α1 et 5-HT2 ; le blocage des [[canaux-na|canaux sodiques]] fait sa cardiotoxicité.',
    ind: ['Épisode dépressif caractérisé', 'Douleurs neuropathiques périphériques de l’adulte', 'Céphalées de tension (prophylaxie) et migraine (traitement de fond), adulte', 'Énurésie nocturne de l’enfant de 6 ans et plus'],
    dose: ['Dépression : 25 mg × 2/j, + 25 mg un jour sur deux, jusqu’à 150 mg/j en deux prises', 'Douleur, migraine : 3–25 mg le soir, + 1–3 mg tous les 3–7 jours ; 25–75 mg/j habituellement', 'Après 65 ans : 10–25 mg/j au départ ; métaboliseur lent du 2D6 ou du 2C19 : dose initiale divisée par deux'],
    pk: 'Demi-vie ≈ 25 h ; déméthylée (CYP2C19, 3A4) en nortriptyline, hydroxylée par le CYP2D6 : inhibiteurs du 2D6 (fluoxétine, paroxétine) et métaboliseurs lents exposent au surdosage.',
    ae: ['Bouche sèche, constipation, vision floue, rétention urinaire', 'Sédation, prise de poids, hypotension orthostatique', 'Tachycardie, sueurs'],
    serious: ['Surdosage potentiellement mortel (conduction, arythmies, convulsions, coma)', 'Allongement du QT ; confusion du sujet âgé', 'Glaucome aigu par fermeture de l’angle, iléus ; virage maniaque'],
    inter: ['Contre-indiqué : IMAO (14 jours après un IMAO irréversible, 1 jour après le moclobémide ; 14 jours avant un IMAO)', 'À éviter : anticholinergiques, thioridazine, fluvoxamine, sympathomimétiques', 'Prudence : médicaments allongeant le QT, méthadone, tramadol'],
    monitor: ['ECG avant de débuter (QT, conduction), surtout après 50 ans', 'Pression artérielle couchée-debout, poids, transit'],
    age: '10–25 mg/j au départ, prudence au-delà de 100 mg/j : confusion, rétention, chutes. Rarement un bon antidépresseur après 65 ans.',
    preg: 'Non recommandée sauf nécessité incontestable (RCP) ; surveiller le nouveau-né (sevrage). Vérifier sur le CRAT. Allaitement : risque non exclu.',
    renal: 'Rein : doses habituelles. Foie : prudence ; contre-indiquée si pathologie hépatique sévère.',
    cardio: 'Contre-indiquée après un infarctus récent, en cas de bloc, de trouble du rythme ou d’insuffisance coronarienne.',
    stop: 'Décroissance sur plusieurs semaines (sevrage à l’arrêt brutal).',
    pearls: ['Solution buvable : 1 goutte = 1 mg, idéale pour titrer les petites doses antalgiques', 'Une prise le soir, qui tire parti de la sédation', 'Comme antidépresseur, ordonnances courtes si risque suicidaire'],
    hist: 'Mise au point par Merck et commercialisée en 1961 (Elavil), trois ans après l’imipramine.',
    src: 'RCP Laroxyl (ANSM, 2025) ; HAS 2017 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Shorter 1997 ; Wikipédia (PDSP) pour les Ki'
  },

  clomipramine: {
    dci: 'Clomipramine', brand: 'Anafranil · génériques', cls: 'atc',
    nbn: 'Sérotonine · inhibiteur de la recapture (SERT ; métabolite : NET)',
    status: 'tension d’approvisionnement (25 mg), sept. 2026',
    tags: ['sed', 'poids', 'sex', 'qt', 'surdos', 'douleur'],
    note: 'le tricyclique du TOC',
    lead: 'Le plus sérotoninergique des tricycliques, seul d’efficacité prouvée dans le TOC, recours dans les dépressions sévères ; risques de la classe (cardiotoxicité, surdosage, convulsions) et risque sérotoninergique.',
    mech: 'Inhibiteur très puissant du [[sert|SERT]] (Ki ≈ 0,14–0,28 nM) ; son métabolite actif, la desméthylclomipramine, inhibe surtout le [[net|NET]]. Antagoniste H1, muscarinique (≈ 37 nM) et α1.',
    ind: ['Épisode dépressif caractérisé', 'TOC (adulte ; enfant à partir de 10 ans)', 'Prévention des attaques de panique avec ou sans agoraphobie', 'Certains états dépressifs de la schizophrénie (avec un neuroleptique)', 'Douleurs neuropathiques de l’adulte'],
    dose: ['Dépression : 75 mg/j au départ, 75–150 mg/j en une prise', 'TOC : 25 mg/j puis paliers, 75–150 mg/j, maximum 250 mg/j ; enfant : ≤ 3 mg/kg/j et ≤ 200 mg/j', 'Panique : 20–150 mg/j ; douleur : 10–150 mg/j par paliers hebdomadaires de 10–25 mg'],
    pk: 'Demi-vie ≈ 21 h ; desméthylclomipramine ≈ 36 h. Déméthylation par les CYP3A4, 2C19 et 1A2 (freinée par la {{fluvoxamine|fluvoxamine}}) ; hydroxylation par le [[cyp2d6|CYP2D6]].',
    ae: ['Bouche sèche, constipation, sueurs, tremblement', 'Sédation, prise de poids, hypotension orthostatique', 'Troubles sexuels fréquents (anorgasmie, éjaculation)'],
    serious: ['Convulsions, risque croissant avec la dose', 'Troubles du rythme et de la conduction, QT long, torsades ; surdosage grave', '[[syndrome-serotoninergique|Syndrome sérotoninergique]] (IMAO, ISRS)'],
    inter: ['Contre-indiqué : IMAO irréversibles, dapoxétine', 'Déconseillé : {{moclobemide|moclobémide}}, linézolide, bleu de méthylène', 'ISRS : taux augmentés, risque convulsif ; diurétiques hypokaliémiants'],
    monitor: ['ECG et bilan cardiovasculaire initial ; corriger hypokaliémie et hypomagnésémie', 'Pression artérielle (orthostatisme), poids'],
    age: 'Moitié de la dose minimale au départ ; confusion, rétention urinaire, hypotension orthostatique.',
    preg: 'Données insuffisantes sur le risque malformatif ; utilisation possible à tout terme selon le RCP, avec surveillance néonatale ; vérifier sur le CRAT. Allaitement à éviter.',
    renal: 'Rein : réduire la dose. Foie : réduire la dose.',
    cardio: 'Contre-indiquée après un infarctus récent ; prudence si trouble de conduction ou bradycardie ; éviter les associations allongeant le QT.',
    stop: 'Décroissance progressive. IMAO irréversible → clomipramine : 2 semaines ; clomipramine → IMAO : au moins 1 semaine.',
    pearls: ['TOC : souvent 150–250 mg/j et 6–12 semaines de délai ; au-delà de 250 mg/j, risque convulsif inacceptable (Stahl)', 'TOC résistant : l’ajout de fluvoxamine augmente la part de clomipramine inchangée (expert, hors AMM)', 'Jamais avec un IMAO (syndrome sérotoninergique mortel)'],
    src: 'RCP Anafranil (ANSM, 2025) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki ; ANSM 2026'
  },

  imipramine: {
    dci: 'Imipramine', brand: 'Tofranil', cls: 'atc',
    nbn: 'Sérotonine, noradrénaline · inhibiteur de la recapture (SERT, NET)',
    status: 'tension d’approvisionnement (10 mg), sept. 2026',
    tags: ['sed', 'poids', 'qt', 'surdos', 'douleur'],
    note: 'le premier tricyclique (1957)',
    lead: 'Premier tricyclique et prototype de la classe : inhibition mixte de la recapture, effets anticholinergiques, α1 et H1, toxicité en surdosage ; 2e intention (HAS 2017), contre-indiquée pendant l’allaitement.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 1,3 nM) et le [[net|NET]] (≈ 20–37 nM) ; la désipramine, [[metabolite-actif|métabolite actif]], est surtout noradrénergique. Antagoniste H1, muscarinique (≈ 46 nM) et α1 (≈ 32 nM).',
    ind: ['Épisode dépressif caractérisé', 'Douleurs neuropathiques de l’adulte'],
    dose: ['Dépression : 75 mg/j au départ, 75–150 mg/j en une prise', 'Douleur neuropathique : 10–25 mg/j puis paliers hebdomadaires ; 25–75 mg/j suffisent en général', 'Sujet âgé : moitié de la dose minimale au départ'],
    pk: 'Demi-vie ≈ 19 h ; N-déméthylation (CYP3A4, 2C19, 1A2) en désipramine, puis hydroxylation par le [[cyp2d6|CYP2D6]].',
    ae: ['Bouche sèche, constipation, vision floue, sueurs', 'Sédation, hypotension orthostatique, tachycardie', 'Prise de poids'],
    serious: ['Surdosage potentiellement mortel', 'QT long, tachycardie ventriculaire ; agranulocytose (rare)', 'Convulsions ; virage maniaque'],
    inter: ['Contre-indiqué : IMAO irréversibles ({{iproniazide|iproniazide}})', 'Déconseillé : {{moclobemide|moclobémide}}, linézolide, bleu de méthylène', 'Précaution : ISRS (taux augmentés), adrénaline, anticoagulants oraux'],
    monitor: ['ECG avant de débuter (après 50 ans, cardiopathie)', 'Pression artérielle couchée-debout ; NFS si fièvre ou angine'],
    age: 'Moitié de la dose minimale au départ ; hypotension orthostatique, sédation, confusion.',
    preg: 'Pas de risque malformatif particulier selon le RCP ; utilisation possible après évaluation, surveillance néonatale ; vérifier sur le CRAT. Allaitement contre-indiqué.',
    renal: 'Rein : diminuer la posologie. Foie : diminuer ; contre-indiquée si insuffisance sévère.',
    cardio: 'Contre-indiquée après un infarctus récent ; prévenir l’anesthésiste.',
    stop: 'Pas d’arrêt brutal. IMAO irréversible → imipramine : 2 semaines ; imipramine → IMAO : au moins 1 semaine.',
    pearls: ['Modèle pour comprendre les effets de classe des tricycliques', 'Douleur neuropathique : 25–75 mg/j suffisent souvent', 'Comprimé à 10 mg utile pour titrer chez le sujet âgé'],
    hist: 'Composé G 22355 de Geigy, donné par Roland Kuhn à des déprimés de Münsterlingen en 1955, présenté à Zurich en septembre 1957 devant douze personnes, nommé Tofranil en 1958 ; il ne diffère de la chlorpromazine que de deux atomes.',
    src: 'RCP Tofranil (ANSM, 2025) ; HAS 2017 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Shorter 1997 ; Wikipédia (PDSP) pour les Ki ; ANSM 2026'
  },

  dosulepine: {
    dci: 'Dosulépine', brand: 'Prothiaden', cls: 'atc',
    nbn: 'Sérotonine, noradrénaline · multimodal (NET, SERT ; antagoniste H1, M1)',
    tags: ['sed', 'poids', 'qt', 'surdos'],
    note: 'proche de l’amitriptyline, sédative',
    lead: 'Tricyclique sédatif, structurellement proche de l’amitriptyline, indiqué dans la dépression caractérisée en 2e intention ; mêmes contre-indications cardiaques et même toxicité en surdosage que les autres imipraminiques.',
    mech: 'Inhibe le [[net|NET]] (Ki ≈ 46–70 nM) et le [[sert|SERT]] (≈ 9–78 nM) ; antagoniste puissant [[h1|H1]] (≈ 4 nM) et muscarinique (≈ 25 nM), peu α1 (≈ 420 nM).',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['75 mg/j au départ, en une prise, pendant ou en dehors des repas', 'Habituellement 75–150 mg/j ; réévaluer à 3 semaines', 'Sujet âgé : moitié de la dose minimale au départ, augmentation progressive'],
    pk: 'Demi-vie ≈ 30 h ; N-déméthylation, S-oxydation, glucuronoconjugaison, cycle entérohépatique ; substrat du [[cyp2d6|CYP2D6]] (Stahl).',
    ae: ['Sédation, sensations vertigineuses, hypotension orthostatique', 'Bouche sèche, constipation, vision floue, rétention urinaire', 'Prise de poids, tachycardie, sueurs'],
    serious: ['Surdosage grave (troubles de conduction, arythmies, convulsions, coma)', 'Glaucome par fermeture de l’angle, rétention urinaire', 'Convulsions, virage maniaque, idées suicidaires'],
    inter: ['Contre-indiqué : IMAO non sélectifs (2 semaines avant, 1 semaine après), sultopride', 'À éviter : IMAO-A ({{moclobemide|moclobémide}}), alcool, clonidine, sympathomimétiques parentéraux', 'Inhibiteurs du CYP2D6 (fluoxétine, paroxétine) : taux augmentés'],
    monitor: ['ECG avant de débuter (QT, conduction), surtout après 50 ans', 'Pression artérielle couchée-debout, poids'],
    age: 'Moitié de la dose minimale au départ, augmentation lente sous surveillance : confusion, chutes, rétention urinaire.',
    preg: 'Préférable d’éviter (RCP) ; données limitées sans risque malformatif particulier ; si indispensable, surveillance néonatale et pas d’arrêt brutal. Vérifier sur le CRAT. Allaitement à éviter.',
    renal: 'Rein : réduire la dose. Foie : réduire la dose.',
    cardio: 'Contre-indiquée après un infarctus récent ; ralentit la conduction et allonge le QT comme les autres tricycliques (Stahl).',
    stop: 'Réduire progressivement (syndrome de sevrage rare). IMAO non sélectifs : 2 semaines avant, 1 semaine après.',
    pearls: ['Gélule à 25 mg pour les débuts progressifs, comprimé à 75 mg pour la prise unique du soir', 'Mêmes précautions que l’amitriptyline : ECG, orthostatisme, glaucome, prostate', 'Ordonnances courtes si risque suicidaire (toxicité en surdosage)'],
    src: 'RCP Prothiaden (ANSM, 2024) ; avis CT HAS 2012 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  doxepine: {
    dci: 'Doxépine', brand: 'Quitaxon', cls: 'atc',
    nbn: 'Sérotonine, noradrénaline · multimodal (NET, SERT ; antagoniste H1, M1, α1)',
    tags: ['sed', 'poids', 'qt', 'surdos'],
    note: 'antihistaminique H1 majeur, sédative',
    lead: 'Tricyclique très sédatif, antagoniste H1 extrêmement puissant, à posologie très étendue (10–300 mg/j) ; contre-indications et toxicité en surdosage de la classe.',
    mech: 'Inhibe le [[net|NET]] (Ki ≈ 13–58 nM) plus que le [[sert|SERT]] (≈ 68–210 nM) ; antagoniste [[h1|H1]] (≈ 0,1–1 nM), muscarinique et α1 : sédation et effets atropiniques dominent le profil.',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['Posologie très variable, 10–300 mg/j, en une prise ; la plus forte part le soir', 'Réévaluer après 3 semaines à dose efficace ; traitement d’environ 6 mois', 'Sujet âgé : débuter bas (comprimés à 10 mg), augmenter progressivement'],
    pk: 'Demi-vie voisine de 10 h (RCP ; 8–24 h selon Stahl) ; premier passage hépatique important, N-déméthylation, hydroxylation, glucuronoconjugaison ; substrat du [[cyp2d6|CYP2D6]] (Stahl). Clairance réduite chez le sujet âgé.',
    ae: ['Sédation marquée, sensations vertigineuses, hypotension orthostatique', 'Bouche sèche, constipation, vision floue, rétention urinaire', 'Prise de poids, tachycardie'],
    serious: ['Surdosage grave (conduction, arythmies, convulsions, coma)', 'Glaucome par fermeture de l’angle, rétention urinaire', 'Convulsions, virage maniaque ; confusion chez le sujet âgé'],
    inter: ['Contre-indiqué : IMAO non sélectifs, sultopride', 'Déconseillé : alcool, clonidine et apparentés, sympathomimétiques parentéraux', 'Précaution : antidépresseurs sérotoninergiques (taux augmentés, convulsions ; prudence avec la fluoxétine), anticonvulsivants'],
    monitor: ['ECG avant de débuter après 50 ans ou si cardiopathie', 'Pression artérielle couchée-debout, vigilance diurne'],
    age: 'Clairance diminuée : doses plus faibles, débuter avec les comprimés à 10 mg ; confusion, chutes et rétention à surveiller.',
    preg: 'Préférable d’éviter quel que soit le terme (RCP) ; si nécessaire, surveillance néonatale et pas d’arrêt brutal. Vérifier sur le CRAT. Allaitement à éviter.',
    renal: 'Rein : diminuer la posologie. Foie : diminuer la posologie.',
    cardio: 'Contre-indiquée après un infarctus récent ; effets de classe sur la conduction et le QT.',
    stop: 'Décroissance progressive (rares symptômes de sevrage) ; pas d’arrêt brutal, notamment pendant la grossesse.',
    pearls: ['Sédation utile chez le déprimé insomniaque, mais vigilance diurne et chutes à surveiller', 'Comprimés sécables à 10 et 50 mg pour ajuster finement', 'Aux États-Unis, la doxépine à 3–6 mg est un hypnotique (blocage H1 sélectif) ; en France, usage hypnotique hors AMM'],
    src: 'RCP Quitaxon (ANSM, 2020) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  maprotiline: {
    dci: 'Maprotiline', brand: 'Ludiomil', cls: 'atc',
    nbn: 'Noradrénaline · inhibiteur de la recapture (NET)',
    status: 'rupture et rappel de tous les lots, sept. 2026',
    tags: ['sed', 'poids', 'qt', 'surdos'],
    note: 'noradrénergique, risque convulsif',
    lead: 'Tétracyclique inhibiteur sélectif du NET, sédatif (H1) ; risque convulsif dose-dépendant, d’où 150 mg/j au plus. Indisponible en France depuis 2025 (rupture et rappel de tous les lots).',
    mech: 'Inhibe sélectivement le [[net|NET]] (Ki ≈ 11 nM ; SERT ≈ 5 800 nM) ; antagoniste [[h1|H1]] puissant (≈ 1–2 nM), α1 et 5-HT2A modérés (≈ 50–90 nM), peu anticholinergique (≈ 570 nM).',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['75 mg/j au départ (1 à 3 prises) ; 75–150 mg/j ; réévaluer à 3 semaines', 'Au-delà de 150 mg/j : déconseillé (convulsions)', 'Prise unique possible, la plus importante le soir ; sujet âgé : moitié de la dose minimale au départ'],
    pk: 'Demi-vie ≈ 45 h ; métabolite actif desméthylmaprotiline ; voie principale [[cyp2d6|CYP2D6]] (accessoirement 1A2) : exposition augmentée d’environ 270 % chez les métaboliseurs lents.',
    ae: ['Sédation, sensations vertigineuses, hypotension orthostatique', 'Bouche sèche, constipation', 'Éruptions cutanées, prurit, prise de poids'],
    serious: ['Convulsions dose-dépendantes', 'Arythmies, torsades de pointes, allongement du QT (rares)', 'Surdosage grave ; virage maniaque'],
    inter: ['Ne pas associer à la quinidine ni à la propafénone (inhibiteurs puissants du CYP2D6)', 'Médicaments abaissant le seuil épileptogène, sevrage brutal en benzodiazépines, ECT : risque convulsif', 'Anticholinergiques, sédatifs, sympathomimétiques : effets additifs'],
    monitor: ['ECG avant de débuter, surtout si cardiopathie, sujet âgé ou hypotension orthostatique', 'Antécédents de convulsions ou facteurs abaissant le seuil (contre-indication)'],
    age: 'Moitié de la dose minimale au départ ; hypotension orthostatique et sédation.',
    preg: 'Données limitées ; en cas d’exposition, surveiller le nouveau-né et vérifier sur le CRAT. Allaitement à éviter.',
    renal: 'Rein : contre-indiquée si insuffisance sévère, sinon diminuer la posologie. Foie : idem.',
    cardio: 'Contre-indiquée après un infarctus récent et en cas de trouble de conduction, dont le QT long congénital.',
    stop: 'Éviter l’arrêt brutal : décroissance progressive.',
    pearls: ['Rappel de lots (impureté N-nitrosée, 2025) : organiser le relais des patients encore traités', 'Contre-indiquée en cas d’épilepsie ou de seuil épileptogène abaissé (lésion cérébrale, alcoolisme)', 'Profil noradrénergique quasi pur : utile pour comprendre le rôle du NET'],
    src: 'RCP Ludiomil (ANSM, 2013 et 2025) ; ANSM, courrier du 29/07/2025 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  trimipramine: {
    dci: 'Trimipramine', brand: 'Surmontil', cls: 'atc',
    nbn: 'Dopamine, sérotonine · antagoniste des récepteurs (D2, 5-HT2A ; H1, α1)',
    tags: ['sed', 'poids', 'qt', 'surdos'],
    note: 'très sédative, faible sur la recapture',
    lead: 'Tricyclique atypique : inhibe peu la recapture des monoamines mais bloque puissamment H1, α1 et 5-HT2A, modérément D2 ; très sédatif, donné le soir. Contre-indiqué en cas d’allergie au blé.',
    mech: 'Faible inhibition du [[sert|SERT]] (Ki ≈ 150–2 100 nM) et du NET (≥ 2 450 nM) ; antagoniste [[h1|H1]] très puissant (≈ 0,3–1,5 nM), α1 (≈ 24 nM), 5-HT2A (≈ 32 nM) et [[d2|D2]] (≈ 140–210 nM), d’où sa classification NbN.',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['75 mg/j au départ ; 75–150 mg/j ; réévaluer à 3 semaines', 'Une prise le soir pour faciliter le sommeil', 'Sujet âgé : moitié de la dose minimale au départ, augmentation progressive'],
    pk: 'Demi-vie ≈ 24 h ; métabolite déméthylé actif ; substrat des CYP2D6, 2C19 et 2C9 (Stahl).',
    ae: ['Sédation marquée, sensations vertigineuses', 'Bouche sèche, constipation, vision floue', 'Hypotension orthostatique, prise de poids'],
    serious: ['Surdosage grave (conduction, arythmies, convulsions)', 'Glaucome par fermeture de l’angle, rétention urinaire', 'Convulsions (surveillance chez l’épileptique), virage maniaque'],
    inter: ['Contre-indiqué : IMAO irréversibles ({{iproniazide|iproniazide}}) : 2 semaines avant, au moins 1 semaine après', 'Autres IMAO et sérotoninergiques : surveiller un syndrome sérotoninergique', 'Alcool, sédatifs, anticholinergiques : effets additifs'],
    monitor: ['ECG avant de débuter après 50 ans ou si cardiopathie', 'Pression artérielle couchée-debout, vigilance diurne'],
    age: 'Moitié de la dose minimale au départ ; sédation, hypotension orthostatique, confusion.',
    preg: 'Données rares : seulement si clairement nécessaire (RCP) ; difficultés d’adaptation néonatale possibles après exposition en fin de grossesse. Vérifier sur le CRAT. Allaitement : risque non exclu, décision partagée.',
    renal: 'Rein : diminuer la posologie. Foie : diminuer la posologie.',
    cardio: 'Contre-indiquée après un infarctus récent ; effets de classe (conduction, QT, orthostatisme).',
    stop: 'Réduire progressivement (céphalées, malaise, nausées, anxiété, troubles du sommeil à l’arrêt brutal).',
    pearls: ['Choisie pour sa sédation chez le déprimé insomniaque ou anxieux : prévenir de la somnolence diurne', 'Contre-indiquée en cas d’allergie au blé (autre que la maladie cœliaque)', 'Rappelle que tous les tricycliques ne sont pas des inhibiteurs de recapture'],
    src: 'RCP Surmontil (ANSM, 2025) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia (PDSP) pour les Ki'
  },

  iproniazide: {
    dci: 'Iproniazide', brand: 'Marsilid', cls: 'imao',
    nbn: 'Sérotonine, noradrénaline, dopamine · inhibiteur enzymatique irréversible (MAO-A, MAO-B)',
    status: 'rupture de stock depuis 2023, retour non daté (sept. 2026)',
    tags: ['nonsed', 'surdos', 'surv'],
    note: 'IMAO irréversible : régime, wash-out',
    lead: 'Seul IMAO irréversible et non sélectif autorisé en France, en dernier recours et par un spécialiste (HAS 2017) : aliments riches en tyramine interdits, nombreuses contre-indications, wash-out de 15 jours.',
    mech: 'Dérivé hydrazinique de l’isoniazide qui inhibe de façon irréversible la [[mao|MAO]]-A et la MAO-B ; l’effet dure jusqu’à la resynthèse de l’enzyme (jusqu’à 14 jours pour les IMAO irréversibles, Stahl).',
    ind: ['Épisode dépressif caractérisé de l’adulte, pas en première intention'],
    dose: ['Instauration progressive jusqu’à 50–100 mg/j (1–2 comprimés), 150 mg/j au besoin', 'Entretien : 50 mg/j, voire 25 mg/j ou un jour sur deux', 'Sans amélioration après 3–4 semaines, inutile de poursuivre'],
    pk: 'Excrétion urinaire, surtout en métabolites acétylés inactifs ; la durée d’action dépend de la resynthèse de la MAO, non de la demi-vie.',
    ae: ['Hypotension orthostatique, vertiges, céphalées', 'Insomnie, excitation', 'Bouche sèche, constipation, rétention urinaire ; polynévrite sensible à la vitamine B6'],
    serious: ['Crise hypertensive ([[effet-fromage|effet fromage]]) : céphalées violentes, palpitations → arrêt immédiat', '[[syndrome-serotoninergique|Syndrome sérotoninergique]]', '[[hepatotoxicite|Hépatite cytolytique]] (rare) ; surdosage grave (convulsions, hyperthermie)'],
    inter: ['Contre-indiqués : ISRS, IRSNa, clomipramine, imipramine, amitriptyline, bupropion, tramadol, péthidine, dextrométhorphane, triptans métabolisés par la MAO, sympathomimétiques indirects, réserpine', 'Aliments interdits : fromages fermentés, chianti, bières, extraits de levure, foies de volaille, gibier faisandé, excès de café'],
    monitor: ['Pression artérielle (orthostatisme, poussées)', 'Bilan hépatique et fonction rénale réguliers'],
    age: 'Non précisé par le RCP ; hypotension orthostatique et polymédication rendent l’usage délicat.',
    preg: 'Déconseillé quel que soit le terme ; allaitement contre-indiqué. Vérifier sur le CRAT.',
    renal: 'Rein : adapter la dose. Foie : contre-indiqué si insuffisance hépatique.',
    cardio: 'Hypotension orthostatique ; crises hypertensives en cas d’écart ; phéochromocytome : contre-indication.',
    stop: 'Après l’arrêt, attendre au moins 15 jours avant tout autre antidépresseur. Vers le Marsilid : 1 semaine après un ISRS ou un IRSNa (5 semaines après la fluoxétine), 3 jours après un tricyclique selon son RCP (1 semaine selon ceux de l’imipramine et de la clomipramine). Arrêt 15 jours avant une anesthésie.',
    pearls: ['Remettre la liste écrite des aliments et médicaments interdits, automédication comprise (décongestionnants, antitussifs)', 'Céphalée brutale ou palpitations : arrêt et consultation en urgence', 'Rupture : relais organisé avec un spécialiste, délais respectés'],
    hist: 'Antituberculeux de Hoffmann-La Roche ; en 1952, des tuberculeux traités « dansent dans les couloirs » de Sea View Hospital (Staten Island). Kline en fait un « psychic energizer » (1957) ; commercialisé en 1958, retiré aux États-Unis en 1961 (hépatotoxicité).',
    src: 'RCP Marsilid (ANSM, 2019) ; HAS 2017 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Mendelson 2020, Kreston 2016 ; ANSM 2026'
  },

  moclobemide: {
    dci: 'Moclobémide', brand: 'Moclamine', cls: 'imao',
    nbn: 'Sérotonine, noradrénaline, dopamine · inhibiteur enzymatique réversible (MAO-A)',
    tags: ['nonsed', 'poidsneutre'],
    note: 'IMAO-A réversible, sans régime strict',
    lead: 'IMAO-A sélectif et réversible : interaction avec la tyramine ([[effet-fromage|effet fromage]]) sans conséquence clinique aux doses usuelles, d’où l’absence de régime strict ; reste contre-indiqué avec de nombreux sérotoninergiques. Prise en fin de repas.',
    mech: '[[imao-reversible|Inhibiteur réversible]] de la MAO-A (inhibition de 8–10 h, nulle à 24 h) : un afflux de tyramine déplace le moclobémide de l’enzyme ; la potentialisation pressive de la tyramine n’est que de 1/7 à 1/10 de celle des IMAO irréversibles.',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['300–450 mg/j au départ, en 2–3 prises en fin de repas, en évitant les prises tardives', 'Entretien : 300–600 mg/j ; réduction possible à 150 mg/j', 'Réévaluer après 3 semaines à dose efficace'],
    pk: 'Demi-vie 2–4 h, mais durée d’action d’au moins 24 h. Substrat du [[cyp2c19|CYP2C19]], qu’il inhibe (ainsi que 2D6 et 1A2) ; la cimétidine augmente ses taux.',
    ae: ['Insomnie, agitation, anxiété', 'Vertiges', 'Galactorrhée ; hausse tensionnelle (rare)'],
    serious: ['Poussée hypertensive (sympathomimétiques, excès de tyramine chez l’hypertendu)', '[[syndrome-serotoninergique|Syndrome sérotoninergique]]', 'Virage maniaque ; contre-indiqué en cas d’état confusionnel aigu'],
    inter: ['Contre-indiqués : sélégiline, péthidine, tramadol, dextrométhorphane, bupropion, sumatriptan, rizatriptan, almotriptan, zolmitriptan', 'Déconseillés : antidépresseurs sérotoninergiques, tricycliques, venlafaxine, milnacipran, autres triptans'],
    monitor: ['Pression artérielle, surtout sous antihypertenseurs'],
    age: 'Pharmacocinétique non modifiée (RCP) ; surveiller la pression artérielle et les interactions.',
    preg: 'Préférable d’éviter pendant la grossesse ; allaitement contre-indiqué. Vérifier sur le CRAT.',
    renal: 'Rein : pas d’adaptation. Foie : réduire la posologie du tiers ou de moitié.',
    cardio: 'Surveiller la pression artérielle ; poussée hypertensive avec les sympathomimétiques.',
    stop: 'Décroissance en général inutile (Stahl). IMAO non sélectif → moclobémide : 15 jours ; moclobémide → IMAO non sélectif : 24 h ; triptan : 24 h après l’arrêt.',
    pearls: ['Pas de régime strict, mais pas d’excès de fromages affinés, chianti, levure de bière ou bière chez l’hypertendu', 'Plus sûr que les IMAO irréversibles (Stahl), mais réservé aux dépressions résistantes et au spécialiste (HAS 2017)', 'Aucun médicament sans avis, même sans ordonnance (antitussifs, décongestionnants)'],
    hist: 'Découvert par Roche en 1972, autorisé d’abord en Suède (1989), lancé dans le monde en 1992.',
    src: 'RCP Moclamine (ANSM, 2024) ; HAS 2017 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Wikipédia pour la pharmacologie'
  },

  mirtazapine: {
    dci: 'Mirtazapine', brand: 'Norset · génériques', cls: 'a2',
    nbn: 'Noradrénaline, sérotonine · antagoniste des récepteurs (α2, 5-HT2, 5-HT3, H1)',
    tags: ['sed', 'poids', 'sexrare', 'age'],
    note: 'sédative et orexigène',
    lead: 'Antagoniste α2 sédatif et orexigène, sans effet sexuel notable ni interaction pharmacocinétique majeure ; utile si insomnie, anxiété ou dénutrition, ou en association en réponse partielle.',
    mech: 'Bloque les récepteurs [[a2|α2]] (Ki ≈ 20–160 nM) : la libération de noradrénaline et de sérotonine augmente. Antagoniste [[h1|H1]] très puissant (≈ 0,14–1,6 nM), 5-HT2A, [[r5ht2c|5-HT2C]] et 5-HT3 ; aucune action sur la recapture.',
    ind: ['Épisode dépressif caractérisé de l’adulte'],
    dose: ['15 ou 30 mg/j au départ, en une prise le soir', '15–45 mg/j ; effet en 1–2 semaines', 'Arrêter si aucune réponse 2–4 semaines après une augmentation'],
    pk: 'Demi-vie 20–40 h ; métabolisée par les CYP2D6, 1A2 et 3A4, sans les inhiber ; carbamazépine et rifampicine diminuent ses taux.',
    ae: ['Somnolence (début de traitement), fatigue', 'Appétit et poids augmentés', 'Bouche sèche, vertiges, rêves anormaux'],
    serious: ['[[agranulocytose|Agranulocytose]] (rare, surtout après 65 ans) : NFS si fièvre, angine, stomatite', 'QT long et torsades rapportés ; hyponatrémie (très rare)', 'Ictère (arrêter), convulsions, virage maniaque'],
    inter: ['Contre-indiquée avec les IMAO (2 semaines avant et après)', 'Prudence : sérotoninergiques (tramadol, triptans, linézolide), benzodiazépines et alcool, médicaments allongeant le QT, warfarine'],
    monitor: ['Poids', 'NFS si fièvre ou angine ; glycémie chez le diabétique'],
    age: 'Même posologie que l’adulte ; intéressante si insomnie ou dénutrition, mais sédation et chutes à surveiller.',
    preg: 'Données limitées, sans hausse des malformations ; surveillance néonatale. Vérifier sur le CRAT. Allaitement : très faible passage, au cas par cas.',
    renal: 'Rein : clairance de la mirtazapine diminuée sous 40 mL/min, en tenir compte. Foie : prudence.',
    cardio: 'Peu d’effets cardiovasculaires ; QT long et torsades rapportés : prudence si facteurs de risque.',
    stop: 'Décroissance progressive. IMAO : 2 semaines dans les deux sens.',
    pearls: ['À 7,5 mg, parfois plus sédative qu’à doses supérieures (Stahl)', 'Réponse partielle à un ISRS ou un IRSNa : ajout de 15–30 mg/j (Bennabi 2019)', 'Sans amélioration ≥ 20 % à 2 semaines, une réponse ultérieure est peu probable (Szegedi 2009)'],
    src: 'RCP Norset (ANSM, 2025) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Bennabi 2019 ; Szegedi 2009 ; OMéDIT Normandie ; Wikipédia pour les Ki'
  },

  mianserine: {
    dci: 'Miansérine', brand: 'génériques (ex-Athymil)', cls: 'a2',
    nbn: 'Noradrénaline · multimodal (antagoniste α2, α1, 5-HT2, H1)',
    tags: ['sed', 'poids', 'sexrare', 'qt'],
    note: 'sédative ; QT et NFS à surveiller',
    lead: 'Antagoniste α2 sédatif, peu anticholinergique, sans effet sexuel notable ; le RCP actuel la contre-indique avec tout médicament allongeant le QT (dont citalopram et escitalopram) et en cas d’affection hépatique sévère.',
    mech: 'Antagoniste [[a2|α2]] (Ki ≈ 73 nM) mais aussi α1 (≈ 34 nM), ce qui limiterait la hausse sérotoninergique ; antagoniste [[h1|H1]] (≈ 0,3–1,7 nM), [[r5ht2c|5-HT2C]] et 5-HT2A ; faible inhibition du NET (≈ 71 nM).',
    ind: ['Épisode dépressif caractérisé'],
    dose: ['30 mg/j au départ, montée possible sur une semaine', '30–90 mg/j, en une ou deux prises', 'Sujet âgé : réduire, la moitié de la dose moyenne peut suffire'],
    pk: 'Demi-vie ≈ 40 h (21–61) ; biodisponibilité ≈ 20 % ; les inducteurs du CYP3A4 (carbamazépine, phénytoïne) diminuent ses taux.',
    ae: ['Somnolence, surtout au début', 'Appétit et poids augmentés', 'Effets anticholinergiques faibles, mieux tolérée que les tricycliques (Stahl)'],
    serious: ['[[agranulocytose|Agranulocytose]] (exceptionnelle, surtout après 65 ans) : hémogramme si fièvre ou angine', 'QT long, tachycardie ventriculaire', 'Convulsions, virage maniaque'],
    inter: ['Contre-indiquée avec les médicaments allongeant le QT (citalopram, escitalopram, hydroxyzine, dompéridone, amiodarone, sotalol, érythromycine…)', 'Déconseillés : alcool, carbamazépine, phénytoïne, autres torsadogènes (méthadone, halopéridol)'],
    monitor: ['ECG si cardiopathie, hypokaliémie ou association à risque', 'Hémogramme devant fièvre ou angine'],
    age: 'Diminuer la dose ; agranulocytose plus fréquente après 65 ans.',
    preg: 'Données insuffisantes : préférable d’éviter. Vérifier sur le CRAT. Allaitement déconseillé.',
    renal: 'Rein : non traité par le RCP. Foie : contre-indiquée si affection hépatique sévère.',
    cardio: 'Contre-indiquée avec un autre médicament allongeant le QT ; prudence si cardiopathie ou hypokaliémie.',
    stop: 'Décroissance prudente ; IMAO : non traité par le RCP, ne pas associer (Stahl).',
    pearls: ['Réponse partielle à un ISRS (sauf citalopram et escitalopram, contre-indiqués) ou un IRSNa : ajout de 30–60 mg/j (Bennabi 2019)', 'Vérifier les médicaments allongeant le QT (hydroxyzine, dompéridone) avant chaque ajout', 'Peu toxique en surdosage par rapport aux tricycliques (Stahl)'],
    src: 'RCP Miansérine Zentiva (ANSM, 2025) ; Vidal (Athymil) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Bennabi 2019 ; Wikipédia pour les Ki'
  },

  agomelatine: {
    dci: 'Agomélatine', brand: 'Valdoxan · génériques', cls: 'autre',
    nbn: 'Mélatonine · multimodal (agoniste MT1, MT2 ; antagoniste 5-HT2C)',
    tags: ['nonsed', 'poidsneutre', 'sexrare', 'cyp', 'surv'],
    note: 'bilan hépatique obligatoire',
    lead: 'Agoniste mélatoninergique et antagoniste 5-HT2C, sans effet sexuel ni décroissance nécessaire à l’arrêt, mais hépatotoxique : **bilan hépatique** avant et pendant le traitement. 3e intention (HAS 2017), pas à partir de 75 ans.',
    mech: 'Agoniste des récepteurs [[mt|MT1 et MT2]] (Ki ≈ 0,1 nM) et antagoniste neutre [[r5ht2c|5-HT2C]] (≈ 630 nM) ; la levée du frein 5-HT2C augmenterait la libération de noradrénaline et de dopamine dans le cortex préfrontal. Aucun effet sur la sérotonine extracellulaire.',
    ind: ['Épisode dépressif caractérisé de l’adulte'],
    dose: ['25 mg/j au coucher', 'Sans amélioration après 2 semaines : 50 mg/j en une prise (2 comprimés), au cas par cas et sous surveillance hépatique', 'Ne pas utiliser à partir de 75 ans'],
    pk: 'Demi-vie 1–2 h ; biodisponibilité < 5 % (premier passage) ; métabolisée à 90 % par le [[cyp1a2|CYP1A2]] (10 % par 2C9/2C19) : les inhibiteurs puissants du 1A2 augmentent fortement son exposition, le tabac la diminue.',
    ae: ['Nausées, sensations vertigineuses', 'Céphalées, somnolence ou insomnie, fatigue', 'Élévation des transaminases ; douleurs abdominales, diarrhée'],
    serious: ['[[hepatotoxicite|Hépatite]], insuffisance hépatique (transaminases > 10 × LSN rapportées) : arrêt immédiat si signes cliniques', 'Virage maniaque, idées suicidaires', 'Sujet âgé dément : ne pas utiliser'],
    inter: ['Contre-indiquée avec les inhibiteurs puissants du CYP1A2 : {{fluvoxamine|fluvoxamine}}, ciprofloxacine', 'Prudence avec les inhibiteurs modérés du 1A2 (propranolol, énoxacine) ; alcool déconseillé'],
    monitor: ['Transaminases avant de débuter (pas d’instauration si > 3 × LSN), puis vers 3, 6, 12 et 24 semaines, et à chaque augmentation de dose', 'Arrêt si > 3 × LSN ; recontrôle sous 48 h en cas d’élévation'],
    age: 'Efficacité établie avant 75 ans ; ne pas utiliser à partir de 75 ans ni chez le patient âgé dément.',
    preg: 'Données limitées (< 300 grossesses) : préférable d’éviter. Vérifier sur le CRAT. Allaitement : passage inconnu, choisir entre allaitement et traitement.',
    renal: 'Rein : prudence (données limitées). Foie : contre-indiquée (cirrhose, maladie évolutive, transaminases > 3 × LSN) ; prudence si surpoids, stéatose, diabète, alcool.',
    cardio: 'Pas d’effet notable sur la pression artérielle ni la fréquence cardiaque (Stahl) ; pas de mise en garde sur le QT dans le RCP.',
    stop: 'Pas de décroissance progressive nécessaire (RCP).',
    pearls: ['Remettre dès la première ordonnance le calendrier des bilans hépatiques', 'Option si troubles sexuels ou prise de poids sous ISRS, ou si les rythmes veille-sommeil sont désorganisés', 'En association à un IRS : option de 2e ligne dans la dépression résistante (Bennabi 2019)'],
    src: 'RCP Valdoxan (EMA, 2025) ; HAS 2017 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Bennabi 2019 ; Wikipédia pour les Ki'
  },

  vortioxetine: {
    dci: 'Vortioxétine', brand: 'Brintellix', cls: 'autre',
    nbn: 'Sérotonine · multimodal (inhibiteur du SERT ; 5-HT1A, 5-HT3, 5-HT7…)',
    tags: ['nonsed', 'poidsneutre', 'sexrare', 'age'],
    note: 'multimodal, nausées fréquentes',
    lead: 'Inhibiteur du SERT doté d’actions sur plusieurs récepteurs sérotoninergiques : peu de prise de poids et, jusqu’à 15 mg/j, pas plus de troubles sexuels que le placebo, mais nausées très fréquentes. Demi-vie longue, une prise par jour.',
    mech: 'Inhibe le [[sert|SERT]] (Ki ≈ 1,6 nM) ; agoniste [[r5ht1a|5-HT1A]] (15 nM), agoniste partiel 5-HT1B, antagoniste [[r5ht3|5-HT3]] (3,7 nM), 5-HT7 (19 nM) et 5-HT1D. La portée clinique de chaque action reste théorique.',
    ind: ['Épisode dépressif caractérisé de l’adulte'],
    dose: ['10 mg/j en une prise, au cours ou en dehors des repas', 'Selon la réponse : 20 mg/j au maximum ou 5 mg/j au minimum', 'À partir de 65 ans : toujours débuter à 5 mg/j, prudence au-delà de 10 mg/j'],
    pk: 'Demi-vie ≈ 66 h, équilibre en ≈ 2 semaines ; métabolisme surtout par le [[cyp2d6|CYP2D6]] : dose plus faible envisageable avec un inhibiteur puissant du 2D6 (bupropion, fluoxétine, paroxétine), ajustement possible avec un inducteur (rifampicine).',
    ae: ['Nausées (très fréquentes), vomissements, constipation, diarrhée', 'Prurit, rêves anormaux, vertiges, hyperhidrose', 'Troubles sexuels plus fréquents à 20 mg/j'],
    serious: ['Hyponatrémie (sujet âgé, cirrhose)', 'Saignements (anticoagulants, antiagrégants, AINS)', 'Syndrome sérotoninergique, convulsions, virage maniaque'],
    inter: ['Contre-indiquée : IMAO non sélectifs (14 jours dans les deux sens), IMAO-A ({{moclobemide|moclobémide}}), linézolide', 'Inhibiteurs puissants du CYP2D6 : dose plus faible ; inducteurs : dose à augmenter si besoin', 'Autres sérotoninergiques (triptans, tramadol) : prudence ; alcool non recommandé'],
    monitor: ['Natrémie chez le sujet âgé', 'Nausées en début de traitement ; idées suicidaires, surtout avant 25 ans'],
    age: 'Débuter à 5 mg/j ; étudiée chez le sujet âgé déprimé, avec un bénéfice cognitif dans un essai (Stahl) ; natrémie.',
    preg: 'Données limitées : seulement si le bénéfice l’emporte ; symptômes néonatals possibles, HTAP non exclue. Vérifier sur le CRAT. Allaitement : passage faible (< 2 %), risque non exclu.',
    renal: 'Rein : pas d’adaptation (prudence si sévère). Foie : pas d’adaptation (prudence si sévère).',
    cardio: 'Pas de mise en garde sur le QT dans le RCP ; données limitées chez le cardiaque.',
    stop: 'Décroissance envisageable, sans schéma précis (demi-vie longue).',
    pearls: ['Prévenir des nausées des premiers jours', 'Option si troubles sexuels ou prise de poids sous ISRS ; rester à 15 mg/j au plus si l’enjeu est sexuel', 'Parmi les plus efficaces et les plus acceptables (Cipriani 2018)'],
    src: 'RCP Brintellix (EMA, 2026) ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Cipriani 2018 ; Wikipédia pour les Ki'
  },

  tianeptine: {
    dci: 'Tianeptine', brand: 'Stablon · génériques', cls: 'autre',
    nbn: 'Glutamate · mode d’action à préciser (agoniste µ-opioïde)',
    tags: ['sevrage'],
    note: 'ordonnance sécurisée, 28 jours',
    lead: 'Agoniste complet du récepteur µ-opioïde, exposé à l’abus : [[ordonnance-securisee|ordonnance sécurisée]] de 28 jours au plus depuis 2012, 3e intention (HAS 2017). Trois prises par jour, au début des repas.',
    mech: 'Agoniste complet du récepteur [[mor|µ-opioïde]] (Ki ≈ 380–770 nM), qui pourrait contribuer à l’effet antidépresseur et explique l’abus ; l’ancien « renforcement de la recapture » est abandonné, une modulation glutamatergique (AMPA) est proposée.',
    ind: ['Épisode dépressif caractérisé (formes modérées à sévères, HAS 2013)'],
    dose: ['12,5 mg × 3/j, au début des trois repas (37,5 mg/j)', '25 mg/j au plus si insuffisance rénale sévère (< 19 mL/min), cirrhose Child C ou patient fragile de moins de 55 kg'],
    pk: 'Demi-vie ≈ 3 h, d’où trois prises ; β-oxydation hépatique, sans CYP ; métabolite actif MC5, dont l’exposition double chez le sujet âgé et l’insuffisant rénal.',
    ae: ['Céphalées, vertiges, insomnie ou somnolence, cauchemars', 'Nausées, constipation, douleurs abdominales, bouche sèche', 'Tachycardie, palpitations'],
    serious: ['Abus et dépendance (≈ 1/1 000 ; 8 % des utilisateurs réguliers dépassent 50 mg/j), surtout avant 50 ans ou si antécédents addictifs', '[[hepatotoxicite|Hépatite]], exceptionnellement sévère ; [[hyponatremie|hyponatrémie]]', 'Surdosage : troubles de la conscience jusqu’au coma'],
    inter: ['IMAO irréversibles : association déconseillée ; 2 semaines après un IMAO, 24 h avant un IMAO', 'Alcool déconseillé ; arrêt 24–48 h avant une anesthésie'],
    monitor: ['Signes d’abus : hausse des doses, demandes anticipées, nomadisme médical', 'Natrémie chez le sujet âgé, le cirrhotique ou sous diurétique'],
    age: 'Pas d’adaptation liée à l’âge seul (RCP 2019), sauf patient fragile de moins de 55 kg ; hyponatrémie plus fréquente.',
    preg: 'Préférable d’éviter quel que soit le terme (< 300 grossesses). Vérifier sur le CRAT. Allaitement déconseillé.',
    renal: 'Rein : 25 mg/j au plus si clairance < 19 mL/min. Foie : 25 mg/j au plus si cirrhose Child C.',
    cardio: 'Tachycardie, palpitations possibles ; peu d’effets cardiovasculaires en surdosage (Stahl).',
    stop: 'Réduire sur 7–14 jours (sevrage : anxiété, myalgies, douleurs abdominales, insomnie).',
    pearls: ['Prescription en toutes lettres, 28 jours au plus, sans chevauchement sauf mention expresse', 'Éviter si antécédents de dépendance (alcool, opioïdes)', 'Contre-indiquée avant 15 ans'],
    hist: 'Soumise à une partie de la réglementation des stupéfiants depuis le 3 septembre 2012 ; en 2014, Gassaway et al. montrent qu’elle est un agoniste complet du récepteur µ-opioïde.',
    src: 'RCP Stablon (ANSM, 2019) ; avis CT HAS 2012 ; HAS, bon usage 2013 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; Gassaway 2014 ; Wikipédia pour les Ki'
  },

  esketamine: {
    dci: 'Eskétamine', brand: 'Spravato', cls: 'autre',
    nbn: 'Glutamate · antagoniste du récepteur NMDA',
    tags: ['sed'],
    note: 'spray nasal, à l’hôpital, stupéfiant',
    lead: 'Énantiomère S de la kétamine, en pulvérisation nasale, associé à un ISRS ou un IRSNa dans la dépression résistante ; effet possible dès 24 h. Administration à l’hôpital, sous surveillance.',
    mech: 'Antagoniste non compétitif du récepteur [[nmda|NMDA]] (site de la phencyclidine), 3–4 fois plus affin que la R-kétamine. Hypothèse : libération de glutamate → récepteurs AMPA → mTORC1, BDNF, synaptogenèse.',
    ind: ['Avec un ISRS ou un IRSNa : épisode dépressif caractérisé résistant (échec de deux antidépresseurs dans l’épisode actuel modéré à sévère), adulte', 'Avec un antidépresseur oral : traitement aigu de courte durée d’un épisode modéré à sévère constituant une urgence psychiatrique', 'Remboursé (HAS 2024) seulement si épisode résistant sévère, moins de 65 ans, après 2 antidépresseurs de classes différentes'],
    dose: ['Induction (S1–S4), moins de 65 ans : 56 mg à J1, puis 56 ou 84 mg deux fois par semaine', 'Entretien : chaque semaine (S5–S8), puis toutes les 1–2 semaines, au rythme le plus bas qui maintient la rémission ; au moins 6 mois', '1 dispositif = 28 mg (56 mg = 2, 84 mg = 3), 5 min entre deux ; urgence : 84 mg deux fois par semaine, 4 semaines'],
    pk: 'Biodisponibilité nasale 30–50 % ; pic 20–40 min ; demi-vie 7–12 h ; CYP2B6 et 3A4 (noréskétamine).',
    ae: ['Dissociation, vertiges, sédation', 'Nausées, vomissements', 'Hausse transitoire de la pression artérielle (pic vers 40 min) ; pollakiurie'],
    serious: ['Sédation, dissociation, dépression respiratoire : surveillance jusqu’à stabilité', 'Abus et mésusage ; psychose, manie', 'Efficacité anti-suicidaire non démontrée'],
    inter: ['Dépresseurs du SNC (benzodiazépines, opioïdes, alcool) : sédation accrue', 'Psychostimulants, IMAO : surveiller la pression artérielle', 'Pas de corticoïde ni de décongestionnant nasal dans l’heure qui précède'],
    monitor: ['Pression artérielle avant, vers 40 min après, puis jusqu’à stabilisation', 'Pas de conduite avant le lendemain ; raccompagnement'],
    age: 'AMM : 28 mg à J1 après 65 ans ; non remboursée à cet âge (HAS 2024).',
    preg: 'Non recommandée pendant la grossesse ni sans contraception. Vérifier sur le CRAT. Allaitement : risque non exclu.',
    renal: 'Rein : aucun ajustement. Foie : non recommandée si insuffisance sévère.',
    cardio: 'Contre-indiquée si une hausse tensionnelle ou intracrânienne serait dangereuse : anévrisme, malformation artérioveineuse, antécédent d’hémorragie intracérébrale, événement cardiovasculaire de moins de 6 semaines.',
    stop: 'Pas de décroissance nécessaire (Stahl).',
    pearls: ['Psychiatre, [[ordonnance-securisee|ordonnance sécurisée]] limitée à 4 semaines, usage hospitalier (HAS 2024)', 'Jeûne de 2 h et pas de boisson dans les 30 min précédentes (nausées)', 'TRANSFORM-2 : − 3,5 points de MADRS contre placebo ; SUSTAIN-1 : rechutes réduites (HR 0,49) ; ESCAPE-TRD : rémission à S8 de 27,1 % contre 17,6 % sous quétiapine LP (ouvert)'],
    hist: 'Kétamine synthétisée en 1962 par Calvin Stevens (Parke-Davis) ; effet antidépresseur rapide décrit par Berman et al. (2000) ; Spravato autorisé par la FDA en mars 2019.',
    src: 'RCP Spravato (EMA, 2024) ; avis CT HAS 2020 et 2024 ; Stahl’s Prescriber’s Guide, 7e éd., 2021 ; TRANSFORM-2, SUSTAIN-1, ESCAPE-TRD ; Wikipédia pour les Ki'
  }
});

/* ─── mols-tr ─── */
/* Fiches molécules — thymorégulateurs et antipsychotiques de 2e génération (France). */
Object.assign(C.mols, {
  lithium: {
    dci: 'Lithium', brand: 'Téralithe 250 · Téralithe LP 400', cls: 'li',
    nbn: 'Lithium · inhibiteur enzymatique (IMPase, GSK-3)',
    status: 'Téralithe LP 400 contingenté (ANSM, sept. 2026)',
    tags: ['surv', 'surdos', 'poids', 'qt', 'sevrage'],
    note: 'marge étroite, anti-suicide',
    lead: 'La référence : traite et prévient dans les deux directions et réduit le suicide, mais sa marge thérapeutique est étroite — tout se joue sur la [[lithiemie]], le rein et les interactions.',
    mech: 'Mal élucidé : inhibition de l’inositol monophosphatase et de la GSK-3, baisse de l’activité de la PKC, effets neurotrophiques. Aucune cible réceptorielle.',
    ind: ['Prévention des rechutes des troubles bipolaires et des états schizo-affectifs intermittents', 'Traitement curatif des états d’excitation maniaque ou hypomaniaque'],
    dose: [
      'Début : 10–20 mEq/j (2 à 3 cp de Téralithe 250) répartis aux repas',
      'LI : lithiémie le matin, 12 h après la dernière prise ; cible 0,5–0,8 mEq/L',
      'LP 400 : 1 à 2 cp en une prise au dîner (vers 20 h), puis paliers d’un demi-comprimé ; lithiémie du matin (12 h après la prise) 0,8–1,2 ou du soir (24 h) 0,5–0,8 mEq/L',
      'Contrôles (LI) : 2 par semaine au début, hebdomadaires le 1er mois, mensuels le 1er trimestre, puis tous les 2 mois ; LP : J7, J14 ± J21'
    ],
    pk: 'Demi-vie ≈ 24 h ; non métabolisé, éliminé à 90 % par le rein ; dialysable. Déshydratation et déplétion sodée élèvent la lithiémie.',
    ae: ['Tremblement, nausées, diarrhée', 'Polyurie-polydipsie ([[diabete-insipide|diabète insipide néphrogénique]])', 'Prise de poids, acné, alopécie', 'Hypothyroïdie ; hypercalcémie (hyperparathyroïdie)'],
    serious: [
      '[[intoxication-lithium|Intoxication]] : nausées, tremblement, soif, troubles de l’équilibre → lithiémie ; puis confusion, syndrome cérébelleux, convulsions, coma, troubles du rythme ; hémodialyse si grave',
      'Insuffisance rénale chronique (néphropathie interstitielle)'
    ],
    inter: [
      '↑ lithiémie : AINS, IEC, sartans, diurétiques (thiazidiques : +25 % à × 4 en 3–10 j), déconseillés',
      '↓ lithiémie : sels de sodium, acétazolamide, théophylline',
      'Neurotoxicité : carbamazépine, neuroleptiques ; ISRS : syndrome sérotoninergique'
    ],
    monitor: [
      'Avant : créatinine et clairance, protéinurie, ionogramme, calcémie, TSH, glycémie, NFS, ECG, β-HCG',
      'Suivi : lithiémie (et après tout changement de dose ou de traitement, ou maladie intercurrente), créatinine, calcémie, TSH, ECG, poids'
    ],
    age: 'Viser plutôt 0,40–0,60 mmol/L (ISBD/IGSLi) ; neurotoxicité possible à taux « thérapeutique » ; début d’un IEC : hospitalisation pour intoxication × 7,6.',
    preg: 'Malformations surtout cardiaques ([[ebstein|maladie d’Ebstein]]), risque ≈ 3 à 4 fois plus élevé : éviter surtout avant 9 SA ; échocardiographie fœtale si exposition au 1er trimestre. Allaitement contre-indiqué. CRAT.',
    renal: 'Rein : envisager l’arrêt si clairance ≤ 40 mL/min ou déclin rapide. Foie : pas d’adaptation.',
    cardio: 'Contre-indiqué : insuffisance cardiaque, syndrome de Brugada (ou antécédent familial). Allongement du QT, bradycardie, dysfonction sinusale.',
    stop: 'Arrêt progressif (≈ 3 mois après un traitement prolongé) : l’arrêt brutal expose à une rechute, surtout maniaque.',
    pearls: [
      'Anti-suicide : OR 0,13 vs placebo ; mortalité toutes causes OR 0,38 (Cipriani 2013)',
      'Entretien : 0,60–0,80 mmol/L (ISBD/IGSLi 2019), à moduler selon réponse et tolérance',
      'Moins efficace dans les états mixtes, les cycles rapides et les comorbidités addictives',
      'Hors AMM : potentialisation d’un antidépresseur (0,5–0,8 mmol/L)'
    ],
    hist: 'Cade (Bundoora, 1949) découvre l’effet calmant du lithium ; Schou (Aarhus, 1952–1954) mène l’un des premiers essais contrôlés de la psychiatrie ; FDA en 1970.',
    src: 'RCP Téralithe 250 (11/2025) et LP 400 ; ANSM (07/2026) ; Nolen 2019 ; Cipriani 2013 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  divalproate: {
    dci: 'Divalproate de sodium', brand: 'Dépakote', cls: 'ac', struct: 'valproate',
    nbn: 'Glutamate · mode d’action à déterminer',
    tags: ['sed', 'poids', 'surv', 'surdos', 'cyp'],
    note: 'antimaniaque, tératogène majeur',
    lead: 'Antimaniaque efficace mais tératogène majeur : contre-indiqué pendant la grossesse et soumis depuis 2025 à une [[attestation-annuelle|attestation annuelle]] d’information partagée, chez la femme comme chez l’homme.',
    mech: 'Incertain : blocage des canaux sodiques voltage-dépendants, hausse du GABA, action sur des cascades de signalisation.',
    ind: ['Adulte : épisodes maniaques en cas de contre-indication ou d’intolérance au lithium ; poursuite possible chez les répondeurs'],
    dose: ['Début : 750 mg/j, augmentation « aussi rapide que possible » ; habituellement 1000–2000 mg/j', 'Taux résiduel minimal habituel : 40–50 mg/L'],
    pk: 'Demi-vie 15–17 h ; équilibre en 3–4 jours ; inhibe la [[glucuronidation]] (lamotrigine) et le CYP2C9.',
    ae: ['Somnolence, tremblement', 'Troubles digestifs', 'Prise de poids, alopécie', 'Thrombopénie'],
    serious: ['Hépatite grave, pancréatite', '[[hyperammoniemie|Hyperammoniémie]] : ammoniémie devant une somnolence ou une confusion inexpliquée', 'Tératogénicité'],
    inter: ['Déconseillés : {{lamotrigine}} (toxidermie ; sinon titration divisée par deux), carbapénèmes (valproate −60 à −100 % en 2 jours)', 'Inducteurs : valproatémie ↓ ; millepertuis contre-indiqué ; lithium : pas d’interaction'],
    monitor: ['Avant : bilan hépatique (TP), NFS-plaquettes, coagulation, test de grossesse ; éliminer déficit du cycle de l’urée, POLG', 'Bilan hépatique pendant 6 mois ; NFS et coagulation à 15 jours et avant chirurgie ; réévaluation annuelle'],
    age: 'Dose initiale réduite ; somnolence, dénutrition et thrombopénie plus fréquentes.',
    preg: '**Contre-indiqué pendant la grossesse dans le trouble bipolaire** : malformations ≈ 11 %, [[tnd|troubles neurodéveloppementaux]] 30–40 %. Femme : programme de prévention (contraception, tests de grossesse, prescription initiale annuelle par un psychiatre). Homme : TND si le père est traité dans les 3 mois avant la conception → contraception jusqu’à 3 mois après l’arrêt. CRAT.',
    renal: 'Rein : réduire la dose. Foie : contre-indiqué en cas d’hépatite.',
    stop: 'Décroissance progressive ; réajuster une lamotrigine associée.',
    pearls: ['CANMAT : 1re ligne dans la manie et en entretien, 2e ligne dans la dépression', 'Initiation par un psychiatre, renouvellement par tout médecin ; attestation cosignée présentée au pharmacien', 'Charge orale de 20–30 mg/kg/j en hospitalisation (Stahl ; au-delà du RCP)'],
    hist: 'Grenoble, 1962 : l’acide valproïque, simple solvant, protégeait seul les souris ; Dépakine en 1967 ; usage bipolaire dès 1977.',
    src: 'RCP Dépakote (10/2025) ; ANSM et Vidal (règles 2025) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd. ; Monneret 2016'
  },

  valpromide: {
    dci: 'Valpromide', brand: 'Dépamide', cls: 'ac',
    nbn: 'Glutamate · mode d’action à déterminer (via l’acide valproïque)',
    tags: ['sed', 'poids', 'surv', 'surdos', 'cyp'],
    note: 'amide du valproate, mêmes règles',
    lead: 'Amide transformé en acide valproïque : mêmes indications, risques et règles de prescription que {{divalproate|Dépakote}} ; jamais associé à un autre valproate.',
    mech: 'Prodrogue : l’acide valproïque formé porte l’activité ; l’amidation visait à renforcer les effets psychotropes.',
    ind: ['Adulte : épisodes maniaques en cas de contre-indication ou d’intolérance au lithium ; poursuite possible chez les répondeurs'],
    dose: ['Début : 900 mg/j (= 750 mg de valproate), augmentation « aussi rapide que possible »', 'Habituellement 1200–2400 mg/j (= 1000–2000 mg de valproate) ; cp de 300 mg'],
    pk: 'Tmax ≈ 4 h ; demi-vie de l’acide valproïque 8–15 h ; inhibe la [[glucuronidation]].',
    ae: ['Somnolence, tremblement', 'Troubles digestifs', 'Prise de poids, alopécie'],
    serious: ['Hépatite grave, pancréatite, hyperammoniémie', 'Thrombopénie, troubles de l’hémostase', 'Tératogénicité'],
    inter: ['Jamais avec un autre dérivé valproïque (Dépakote, Dépakine…)', 'Déconseillés : lamotrigine, carbapénèmes ; millepertuis contre-indiqué'],
    monitor: ['Avant : bilan hépatique, NFS-plaquettes, temps de saignement, coagulation, test de grossesse', 'Bilan hépatique pendant 6 mois ; NFS et coagulation à 15 jours'],
    age: 'Pas de paragraphe dédié dans le RCP ; prudence.',
    preg: 'Règles du valproate : **contre-indiqué pendant la grossesse** (malformations ≈ 11 %, [[tnd|TND]] 30–40 %) ; programme de prévention ; [[attestation-annuelle|attestation annuelle]] chez la femme comme chez l’homme. CRAT.',
    renal: 'Rein : réduire la dose (l’augmenter en cas d’hémodialyse). Foie : contre-indiqué en cas d’hépatite.',
    stop: 'Décroissance progressive.',
    pearls: ['Traquer le doublon avec un autre valproate (ville, hôpital)', 'Statut réglementaire identique à Dépakote depuis 2025', 'CANMAT ne traite que du divalproex'],
    hist: 'Lambert et Borselli décrivent en 1966 l’« action neuro-psychotrope » du Dépamide ; usage dans les troubles bipolaires à partir de 1977.',
    src: 'RCP Dépamide (10/2025) ; ANSM et Vidal (règles 2025) ; Monneret 2016'
  },

  carbamazepine: {
    dci: 'Carbamazépine', brand: 'Tégrétol · Tégrétol LP · génériques', cls: 'ac',
    nbn: 'Glutamate · bloqueur des canaux sodiques et calciques voltage-dépendants',
    tags: ['sed', 'cyp', 'surv', 'surdos', 'douleur'],
    note: 'inducteur enzymatique puissant',
    lead: 'Antimaniaque et préventif de 2e intention, encombrant par ses interactions : [[inducteur-enzymatique|inducteur]] puissant du CYP3A4, il abaisse les taux de nombreux médicaments et les siens.',
    mech: 'Bloqueur use-dépendant des canaux sodiques voltage-dépendants ; réduit la libération de glutamate. Métabolite actif : l’époxyde-10,11.',
    ind: ['Prévention des rechutes bipolaires (résistance relative, contre-indication ou intolérance au lithium)', 'États d’excitation maniaque ou hypomaniaque', 'Aussi : épilepsie, névralgies, douleurs neuropathiques'],
    dose: ['Prévention : 400–800 mg/j ; manie : 600–1200 mg/j ; en 2 à 3 prises (LP : 2)', 'Titration progressive ; auto-induction : dose souvent à augmenter secondairement'],
    pk: 'Demi-vie ≈ 36 h en dose unique, 16–24 h après auto-induction ; CYP3A4 ; induit 3A4, 2C9 et, faiblement, 1A2, 2C19.',
    ae: ['Sédation, vertiges, ataxie, diplopie', 'Nausées, vomissements', 'Leucopénie bénigne (jusqu’à 10 %)', 'Éruption ; hyponatrémie'],
    serious: ['Toxidermie grave (Stevens-Johnson, Lyell) : risque majeur si [[hla-b1502|HLA-B*1502]]', '[[agranulocytose|Agranulocytose]], aplasie (rares)', 'Hyponatrémie par SIADH ; hépatite'],
    inter: ['↓ contraceptifs hormonaux, {{quetiapine|quétiapine}}, {{aripiprazole}} (dose × 2), {{lamotrigine}}, valproate, clozapine, anticoagulants oraux', 'Contre-indiquée : télaprévir, voriconazole ; déconseillée : lithium (neurotoxicité), clozapine, millepertuis, {{sertraline}}, miansérine'],
    monitor: ['Avant : NFS, bilan hépatique, natrémie ; HLA-B*1502 si origine chinoise Han ou thaïlandaise (positif : ne pas instaurer)', 'NFS et bilan hépatique chaque semaine le 1er mois ; NFS si fièvre ou angine ; natrémie à 2 semaines puis chaque mois pendant 3 mois si risque'],
    age: 'Plus sensible aux effets indésirables (hyponatrémie) ; doses plus faibles.',
    preg: 'Malformations 2 à 3 fois plus fréquentes (tube neural) ; risque neurodéveloppemental non exclu ; [[attestation-annuelle|attestation annuelle]] obligatoire chez les femmes susceptibles d’avoir des enfants ; contraception œstroprogestative inefficace. CRAT.',
    renal: 'Rein : dose parfois à réduire. Foie : prudence.',
    cardio: 'Contre-indiquée en cas de bloc auriculoventriculaire.',
    stop: 'Décroissance progressive ; à l’arrêt, la fin de l’induction impose de réévaluer les doses associées.',
    pearls: ['CANMAT : 2e ligne dans la manie et en entretien, 3e ligne dans la dépression', 'Forme LP, au repas : moins de sédation', 'Vérifier l’interaction avant toute nouvelle prescription'],
    src: 'Avis CT HAS Tégrétol (2017) ; ANSM (03/2025) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  lamotrigine: {
    dci: 'Lamotrigine', brand: 'Lamictal · génériques', cls: 'ac',
    nbn: 'Glutamate · bloqueur des canaux sodiques voltage-dépendants',
    tags: ['nonsed', 'poidsneutre', 'grossesse', 'cyp'],
    note: 'par le bas, titration lente',
    lead: 'Le thymorégulateur « par le bas » : prévient les rechutes dépressives sans poids ni sédation, si la titration très lente est respectée (risque de [[toxidermie]] grave).',
    mech: 'Bloqueur use-dépendant des canaux sodiques voltage-dépendants ; réduit la libération de glutamate.',
    ind: ['Adulte : prévention des épisodes dépressifs du trouble bipolaire I à [[polarite-predominante|prédominance dépressive]]', 'Pas d’indication dans les épisodes aigus ; épilepsie'],
    dose: [
      'Seule (mg/j) : 25 S1–2, 50 S3–4, 100 S5, cible 200 à S6',
      'Avec {{divalproate|valproate}} : 25 un jour sur deux S1–2, 25 S3–4, 50 S5, 100 à S6 (maximum 200)',
      'Avec un inducteur, sans valproate : 50 S1–2, 100 S3–4, 200 S5, 300 à S6 (400 à S7)',
      'Interaction inconnue : schéma « valproate » ; œstroprogestatif : entretien souvent doublé'
    ],
    pk: '[[glucuronidation|Glucuronoconjugaison]] : demi-vie ≈ 33 h, ≈ 59 h avec valproate, ≈ 14 h avec inducteur.',
    ae: ['Éruption bénigne (≈ 10 %)', 'Vertiges, diplopie, ataxie', 'Céphalées, nausées, insomnie'],
    serious: ['Toxidermie grave (Stevens-Johnson, Lyell, DRESS) ≈ 1/1000, surtout les 8 premières semaines ; facteurs : dose initiale, titration rapide, valproate', 'Lymphohistiocytose hémophagocytaire, méningite aseptique'],
    inter: ['Valproate : demi-vie × 2 → doses divisées par deux', 'Inducteurs, éthinylestradiol : clairance ↑ ; lithium : pas d’interaction'],
    monitor: ['Pas de bilan biologique ; éruption, fièvre ou atteinte muqueuse → consulter sans délai'],
    age: 'Pas d’adaptation.',
    preg: 'Plus de 8700 expositions au 1er trimestre sans hausse substantielle des malformations : l’anticonvulsivant à préférer. Taux abaissés pendant la grossesse, à réajuster après l’accouchement. CRAT.',
    renal: 'Rein : prudence. Foie : −50 % (Child-Pugh B), −75 % (C).',
    cardio: 'Effet antiarythmique de classe IB : prudence si cardiopathie.',
    stop: 'Arrêt sans décroissance possible en bipolaire ; après une interruption de plus de 5 [[demi-vie|demi-vies]], reprendre la titration.',
    pearls: ['CANMAT : 1re ligne dans la dépression (hors AMM en France) et en entretien ; non recommandée dans la manie', 'Ne pas débuter dans les 2 semaines suivant une infection virale, une éruption ou un vaccin (Stahl)', 'Hors AMM : potentialisation d’un antidépresseur (200–400 mg/j)'],
    src: 'RCP Lamictal (06/2025) ; CANMAT/ISBD 2018 ; Bennabi 2019 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  quetiapine: {
    dci: 'Quétiapine', brand: 'Xeroquel LP · génériques', cls: 'apa',
    nbn: 'Dopamine, sérotonine, noradrénaline · antagoniste des récepteurs (D2, 5-HT2, α1) ; inhibiteur du NET (norquétiapine)',
    status: 'LP 400 en tension (ANSM, juillet 2026)',
    tags: ['sed', 'poids', 'qt', 'sevrage', 'cyp'],
    note: 'seule AMM en dépression bipolaire',
    lead: 'Seul médicament ayant l’AMM dans la [[depression-bipolaire|dépression bipolaire]] en France ; traite et prévient dans les deux directions, au prix de la sédation et du risque métabolique.',
    mech: 'Dose-dépendant : [[h1|H1]] (Ki 2–11 nM) et α1 (22–39 nM) dès les faibles doses ; norquétiapine : NET (58 nM), 5-HT2C, 5-HT1A partiel ; D2 (245 nM) et 5-HT2A aux doses antimaniaques.',
    ind: ['Épisodes maniaques modérés à sévères ; épisodes dépressifs majeurs du trouble bipolaire', 'Prévention des récidives chez les répondeurs (SMR insuffisant, 2016)', 'Schizophrénie ; adjuvant dans le trouble dépressif majeur'],
    dose: ['Dépression bipolaire : au coucher, 50, 100, 200 puis 300 mg (J1–J4) ; 300 mg/j recommandés', 'Manie : 300 mg J1, 600 mg J2, puis 400–800 mg/j', 'Sujet âgé, insuffisance hépatique : 50 mg/j au départ'],
    pk: 'Demi-vie ≈ 7 h (norquétiapine ≈ 12 h), d’où la forme LP ; CYP3A4.',
    ae: ['Somnolence, vertiges', '[[hypotension-orthostatique|Hypotension orthostatique]], tachycardie', 'Prise de poids', 'Bouche sèche, constipation'],
    serious: ['[[syndrome-metabolique|Syndrome métabolique]], hyperglycémie', 'Allongement du QT ; agranulocytose (rare)', 'Démence : surmortalité'],
    inter: ['Contre-indiquée avec les inhibiteurs du CYP3A4 (antiprotéases, azolés, érythromycine, clarithromycine)', 'Carbamazépine, phénytoïne : taux fortement diminués ; pamplemousse déconseillé'],
    monitor: ['Poids, tour de taille, PA, glycémie, lipides : au départ, à 3 mois puis chaque année ; IMC mensuel les 3 premiers mois (Stahl)'],
    age: 'Débuter à 50 mg/j ; hypotension orthostatique, sédation ; surmortalité en cas de démence.',
    preg: 'Données limitées : si le bénéfice l’emporte ; surveiller le nouveau-né exposé au 3e trimestre. CRAT.',
    renal: 'Rein : pas d’adaptation. Foie : débuter à 50 mg/j.',
    cardio: 'QT : prudence si cardiopathie, QT long ou autre médicament allongeant le QT.',
    stop: 'Décroissance progressive (3–4 semaines lors d’un relais) : sevrage et rebond à l’arrêt brutal.',
    pearls: ['CANMAT : 1re ligne dans les quatre directions', 'Manie : viser 400–800 mg/j (souvent sous-dosée) ; dépression : 300 mg/j', 'Usage hypnotique à faible dose : hors AMM, au prix du risque métabolique', 'Tension (ANSM, 07/2026) : n’initier la forme LP que dans la dépression bipolaire'],
    src: 'Avis CT HAS Xeroquel LP (2016) ; ANSM (07/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  aripiprazole: {
    dci: 'Aripiprazole', brand: 'Abilify · génériques', cls: 'apa',
    nbn: 'Dopamine, sérotonine · agoniste partiel D2 et 5-HT1A, antagoniste 5-HT2A',
    tags: ['nonsed', 'poidsneutre', 'cyp'],
    note: 'par le haut, peu métabolique',
    lead: 'Antimaniaque et préventif de la manie, peu sédatif et peu métabolique, mais inefficace dans la dépression bipolaire ; l’[[akathisie]] est son effet cardinal.',
    mech: '[[d2|Agoniste partiel D2]] très affin (Ki ≈ 0,7 nM ; activité intrinsèque ≈ 58 %) : freine l’excès de dopamine, soutient son défaut ; agoniste partiel [[r5ht1a|5-HT1A]], antagoniste 5-HT2A ; H1 modeste, M1 négligeable.',
    ind: ['Bipolaire I (adulte) : épisodes maniaques modérés à sévères ; prévention des récidives maniaques chez les répondeurs', 'Manie de l’adolescent ≥ 13 ans (≤ 12 semaines) ; schizophrénie'],
    dose: ['Manie : 15 mg/j en une prise (maximum 30) ; même dose en prévention', 'Inhibiteur puissant du [[cyp2d6|CYP2D6]] ou du 3A4 : dose ÷ 2 ; carbamazépine : dose × 2'],
    pk: 'Demi-vie ≈ 75 h (≈ 146 h chez le métaboliseur lent du 2D6) ; déhydro-aripiprazole actif ; CYP2D6 et 3A4.',
    ae: ['Akathisie, agitation, insomnie', 'Nausées, céphalées', 'Peu de prise de poids ; prolactine non augmentée'],
    serious: ['Troubles du contrôle des impulsions (jeu, achats, alimentation, sexualité)', 'Syndrome malin, dyskinésies tardives', 'Démence : surmortalité, AVC'],
    inter: ['{{fluoxetine|Fluoxétine}}, {{paroxetine|paroxétine}} (2D6), kétoconazole (3A4) : dose ÷ 2', 'Lithium, valproate : pas d’adaptation'],
    monitor: ['Poids, glycémie, lipides ; akathisie et impulsivité à chaque consultation'],
    age: 'Non évalué après 65 ans : dose initiale plus faible si besoin.',
    preg: 'Pas d’étude contrôlée : si le bénéfice l’emporte ; surveiller le nouveau-né exposé au 3e trimestre. CRAT.',
    renal: 'Rein, foie : pas d’adaptation (prudence si insuffisance hépatique sévère).',
    cardio: 'Hypotension orthostatique à l’initiation.',
    stop: 'Longue demi-vie : rebond peu probable.',
    pearls: ['CANMAT : 1re ligne pour traiter et prévenir la manie ; non recommandé dans la dépression bipolaire', 'Patient non aigu : 2,5–10 mg/j limitent l’akathisie (Stahl)', 'Hors AMM : potentialisation d’un antidépresseur (2,5–10 mg) ; correction d’une hyperprolactinémie induite (1–5 mg)'],
    src: 'RCP européen Abilify (EMA, 01/2026) ; CANMAT/ISBD 2018 ; Bennabi 2019 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  olanzapine: {
    dci: 'Olanzapine', brand: 'Zyprexa · génériques', cls: 'apa',
    nbn: 'Dopamine, sérotonine · antagoniste des récepteurs (D2, 5-HT2A)',
    tags: ['sed', 'poids', 'cyp'],
    note: 'efficace mais très métabolique',
    lead: 'Antimaniaque puissant et préventif dans les deux directions, relégué en 2e ligne par son risque métabolique (appétit, poids, diabète, lipides).',
    mech: 'Antagoniste 5-HT2A (Ki 1–24 nM) et D2 (3–106 nM) ; forte affinité [[h1|H1]] (0,65–4,9 nM), muscarinique et [[r5ht2c|5-HT2C]] : sédation, appétit, poids ; le blocage M3 pancréatique pourrait gêner l’insulinosécrétion.',
    ind: ['Épisodes maniaques modérés à sévères', 'Prévention des récidives chez les répondeurs à l’olanzapine (épisode maniaque)', 'Schizophrénie ; pas d’indication dans la dépression'],
    dose: ['Manie : 15 mg/j en une prise (10 mg/j en association) ; prévention : 10 mg/j ; plage 5–20 mg/j', 'Sujet âgé, insuffisance rénale ou hépatique : envisager 5 mg/j au départ'],
    pk: 'Demi-vie ≈ 34 h (≈ 52 h après 65 ans) ; [[cyp1a2|CYP1A2]], induit par le tabac (30 h chez le fumeur, 39 h sinon).',
    ae: ['Prise de poids, appétit', 'Somnolence', 'Bouche sèche, constipation, œdèmes', 'Élévation des transaminases'],
    serious: ['[[syndrome-metabolique|Syndrome métabolique]], diabète (parfois acidocétose)', 'Neutropénie (surtout avec le valproate)', 'Démence : décès 3,5 % vs 1,5 %, AVC'],
    inter: ['{{fluvoxamine|Fluvoxamine}} : ASC +52 à +108 % → dose initiale réduite', 'Tabac, carbamazépine : clairance ↑ ; lithium : pas d’interaction'],
    monitor: ['Glycémie : au départ, à 12 semaines puis chaque année', 'Poids : au départ, à 4, 8 et 12 semaines puis chaque trimestre', 'Lipides : au départ, à 12 semaines puis tous les 5 ans ; transaminases'],
    age: '5 mg/j au départ ; PA ; déconseillée en cas de démence.',
    preg: 'Si le bénéfice justifie le risque ; surveiller le nouveau-né exposé au 3e trimestre. Allaitement déconseillé. CRAT.',
    renal: 'Rein, foie : envisager 5 mg/j au départ.',
    cardio: 'QT : prudence ; hypotension orthostatique.',
    stop: 'Décroissance progressive (sueurs, insomnie, nausées après un arrêt brutal).',
    pearls: ['CANMAT : niveau 1 dans la manie et en entretien, mais 2e ligne (tolérance métabolique)', 'Dépression bipolaire : associée à la {{fluoxetine|fluoxétine}} (2e ligne ; hors AMM)', 'Arrêt ou reprise du tabac : réévaluer la dose', 'Contre-indiquée en cas de risque de glaucome à angle fermé'],
    src: 'RCP européen Zyprexa (EMA, 02/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  risperidone: {
    dci: 'Rispéridone', brand: 'Risperdal · génériques', cls: 'apa',
    nbn: 'Dopamine, sérotonine, noradrénaline · antagoniste des récepteurs (D2, 5-HT2A, α1, α2)',
    tags: ['poids', 'sex'],
    note: 'antimaniaque, prolactine ↑',
    lead: 'Antimaniaque de 1re ligne, seule ou avec lithium ou valproate, sans AMM en prévention en France ; son effet propre est l’[[hyperprolactinemie|hyperprolactinémie]].',
    mech: 'Antagoniste [[r5ht2a|5-HT2A]] très puissant (Ki 0,17 nM), D2 (3,6 nM), [[a1|α1]] (5 nM) et α2 ; aucune action muscarinique ; le blocage D2 hypophysaire élève la prolactine.',
    ind: ['Épisodes maniaques modérés à sévères associés aux troubles bipolaires', 'Schizophrénie ; agressivité persistante (trouble des conduites de l’enfant, démence d’Alzheimer), ≤ 6 semaines', 'Pas d’AMM en prévention des récidives bipolaires'],
    dose: ['Manie : 2 mg en une prise, paliers de 1 mg/j espacés d’au moins 24 h ; 1–6 mg/j', 'Sujet âgé : 0,5 mg × 2/j ; insuffisance rénale ou hépatique : doses divisées par deux'],
    pk: 'Fraction active (rispéridone + 9-hydroxy-rispéridone, ou palipéridone) : demi-vie ≈ 24 h ; [[cyp2d6|CYP2D6]].',
    ae: ['Hyperprolactinémie : aménorrhée, galactorrhée, troubles sexuels', 'Effets extrapyramidaux dose-dépendants (surtout > 6 mg/j)', 'Prise de poids, sédation', 'Hypotension orthostatique'],
    serious: ['Démence : surmortalité, AVC (surtout si fibrillation atriale)', 'Syndrome de l’iris hypotonique peropératoire (chirurgie de la cataracte)', 'Syndrome malin, neutropénie'],
    inter: ['{{fluoxetine|Fluoxétine}}, {{paroxetine|paroxétine}} : taux ↑ ; carbamazépine : taux ↓', 'Antagonise la lévodopa ; potentialise les antihypertenseurs'],
    monitor: ['Poids, glycémie, lipides, PA ; prolactinémie si symptômes'],
    age: '0,5 mg × 2/j au départ ; AVC chez le patient dément.',
    preg: 'Seulement en cas de nécessité manifeste ; surveiller le nouveau-né exposé au 3e trimestre. CRAT.',
    renal: 'Rein, foie : doses divisées par deux, titration plus lente.',
    cardio: 'Hypotension orthostatique ; allongement du QT très rare.',
    stop: 'Décroissance progressive.',
    pearls: ['CANMAT : 1re ligne dans la manie ; en entretien, seule la forme injectable retard (2e ligne)', 'Au-delà de 6 mg/j : plus d’effets moteurs sans gain', 'Risperdalconsta : AMM limitée à la schizophrénie en France'],
    src: 'Avis CT HAS Risperdal (2014) ; RCP belge Risperdal (02/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  asenapine: {
    dci: 'Asénapine', brand: 'Sycrest', cls: 'apa',
    nbn: 'Dopamine, sérotonine, noradrénaline · antagoniste des récepteurs (D2, 5-HT2, α2)',
    status: 'non commercialisée en France',
    tags: ['sed'],
    note: 'sublinguale, non commercialisée',
    lead: 'Antimaniaque sublingual de 1re ligne selon CANMAT (manie et entretien), titulaire d’une AMM européenne mais absent du marché français.',
    mech: 'Affinités sub-nanomolaires pour [[r5ht2c|5-HT2C]] (Ki 0,03 nM), 5-HT2A (0,06 nM), 5-HT7, 5-HT2B et D3 ; D2 1,3 nM ; α1, α2 et [[h1|H1]] ≈ 1 nM ; affinité muscarinique négligeable.',
    ind: ['Adulte : épisodes maniaques modérés à sévères du trouble bipolaire I (seule indication européenne)', 'Aucune indication dans la dépression'],
    dose: ['Monothérapie : 5 mg × 2/j, jusqu’à 10 mg × 2/j ; association : 5 puis 10 mg × 2/j', 'Sublingual strict : ni croqué ni avalé ; ni boire ni manger pendant 10 minutes'],
    pk: 'Biodisponibilité 35 % en sublingual, < 2 % avalée ; demi-vie ≈ 24 h ; UGT1A4 et [[cyp1a2|CYP1A2]] ; inhibe le CYP2D6.',
    ae: ['Somnolence, vertiges', 'Hypoesthésie buccale, lésions de la muqueuse', 'Akathisie, effets extrapyramidaux'],
    serious: ['Hypersensibilité grave (anaphylaxie, angiœdème)', 'Hyperglycémie, hyperprolactinémie', 'Démence : surmortalité'],
    inter: ['{{fluvoxamine|Fluvoxamine}} : ASC +29 % ; {{paroxetine|paroxétine}} : exposition × 2 (2D6)', 'Potentialise les antihypertenseurs, antagonise la lévodopa'],
    monitor: ['Poids, glycémie, lipides ; risque de chute avant la prescription'],
    age: 'Données limitées : prudence.',
    preg: 'Pas pendant la grossesse sauf nécessité ; surveiller le nouveau-né exposé au 3e trimestre ; allaitement à interrompre. CRAT.',
    renal: 'Rein : pas d’ajustement. Foie : sévère (Child-Pugh C), non recommandée (exposition × 7).',
    cardio: '[[qt|Allongement du QT]] possible ; hypotension orthostatique, syncope.',
    stop: 'Décroissance sur 2–4 semaines si possible (Stahl).',
    pearls: ['CANMAT : 1re ligne dans la manie (seule ou associée) et en entretien ; pas de données dans la dépression', 'Structure apparentée à la {{mirtazapine}}, avec une partie de son profil réceptoriel', 'Action rapide : utilisable « si besoin » contre l’agitation (Stahl, hors AMM)'],
    src: 'RCP européen Sycrest (EMA, 02/2026) ; BDPM (absente, 22/10/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  cariprazine: {
    dci: 'Cariprazine', brand: 'Reagila', cls: 'apa',
    nbn: 'Dopamine, sérotonine, noradrénaline · agoniste partiel des récepteurs (D3, D2, 5-HT1A)',
    status: 'non commercialisée en France ; AMM : schizophrénie',
    tags: ['poidsneutre', 'cyp'],
    note: 'agoniste D3, non commercialisée',
    lead: 'Agoniste partiel D3 et D2 efficace dans la manie et la dépression bipolaire selon CANMAT, mais limité en Europe à la schizophrénie et non commercialisé en France ; exposition prolongée sur des semaines.',
    mech: '[[d2|Agoniste partiel D2]] et surtout D3 (préférentiel aux faibles doses), agoniste partiel 5-HT1A, antagoniste 5-HT2B et 5-HT2A ; l’agonisme D3 pourrait agir sur l’humeur et la cognition (hypothèse).',
    ind: ['Schizophrénie de l’adulte (seule indication européenne)', 'Aucune indication bipolaire en Europe (indications bipolaires aux États-Unis)'],
    dose: ['Schizophrénie : 1,5 mg/j en une prise, paliers de 1,5 mg ; maximum 6 mg/j', 'Essais bipolaires (Stahl, hors AMM) : manie 3–6 mg/j ; dépression 1,5–3 mg/j'],
    pk: '[[demi-vie|Demi-vie]] 1–3 jours, 13–19 jours pour la didesméthyl-cariprazine ; équilibre à 90 % en 3 semaines ; [[cyp3a4|CYP3A4]].',
    ae: ['[[akathisie|Akathisie]], agitation, insomnie', 'Effets extrapyramidaux, nausées', 'Effets parfois retardés de plusieurs semaines (accumulation)'],
    serious: ['Syndrome malin, dyskinésies tardives', 'Hyperglycémie ; hypotension orthostatique ou hypertension', 'Cataracte'],
    inter: ['Contre-indiquée avec les inhibiteurs puissants du 3A4 (kétoconazole : exposition × 2) et les inducteurs puissants ou modérés (carbamazépine, rifampicine, millepertuis)', 'Pamplemousse à éviter'],
    monitor: ['Poids, PA ; glycémie si facteur de risque ; akathisie sur plusieurs semaines'],
    age: 'Données insuffisantes après 65 ans.',
    preg: 'Contraception efficace pendant le traitement et 10 semaines après ; non recommandée pendant la grossesse ; allaitement à interrompre. CRAT.',
    renal: 'Rein : non recommandée si clairance < 30 mL/min. Foie : non recommandée si Child-Pugh 10–15.',
    cardio: 'Hypotension orthostatique ou hypertension : surveiller la PA.',
    stop: 'Exposition prolongée après l’arrêt ; décroissance prudente lors d’un relais.',
    pearls: ['CANMAT : 1re ligne dans la manie, 2e ligne dans la dépression ; pas de données d’entretien en 2018', 'Titration lente : moins d’akathisie', 'Avis HAS 2018 favorable dans la schizophrénie (SMR modéré, ASMR V), sans commercialisation'],
    src: 'RCP européen Reagila (EMA, 01/2026) ; avis CT HAS (2018) ; BDPM (absente, 22/10/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  },

  lurasidone: {
    dci: 'Lurasidone', brand: 'Latuda', cls: 'apa',
    nbn: 'Dopamine, sérotonine · antagoniste des récepteurs (D2, 5-HT2A, 5-HT7)',
    status: 'non commercialisée en France ; AMM : schizophrénie',
    tags: ['poidsneutre', 'cyp'],
    note: 'peu métabolique, non commercialisée',
    lead: 'Antipsychotique peu métabolique, de 1re ligne dans la [[depression-bipolaire|dépression bipolaire]] selon CANMAT, mais limité en Europe à la schizophrénie et non commercialisé en France.',
    mech: 'Antagoniste D2, 5-HT2A et 5-HT7 (puissant), agoniste partiel [[r5ht1a|5-HT1A]], antagoniste α2 ; peu d’action sur D1, H1 et M1 : peu de sédation et de prise de poids attendues.',
    ind: ['Schizophrénie de l’adulte et de l’adolescent ≥ 13 ans (AMM européenne)', 'Aucune indication bipolaire en Europe (dépression bipolaire aux États-Unis)'],
    dose: ['Schizophrénie : 37 mg/j au départ, 37–148 mg/j, au cours d’un repas', 'Insuffisance rénale ou hépatique modérée, inhibiteur modéré du 3A4 : 18,5 mg au départ, maximum 74 mg', 'Dépression bipolaire (Stahl, hors AMM) : 20–60 mg/j (doses américaines, en chlorhydrate)'],
    pk: 'Au repas (≥ 350 kcal) : à jeun, absorption jusqu’à 50 % plus faible ; demi-vie 20–40 h ; [[cyp3a4|CYP3A4]].',
    ae: ['[[akathisie|Akathisie]], somnolence (moindres le soir)', 'Nausées', 'Effets extrapyramidaux ; prolactine peu augmentée'],
    serious: ['Syndrome malin, dyskinésies tardives', 'Hypotension orthostatique, thromboembolie veineuse', 'Démence : surmortalité'],
    inter: ['Contre-indiquée avec les inhibiteurs puissants du 3A4 (kétoconazole : × 9) et les inducteurs puissants (rifampicine : ÷ 6 ; carbamazépine, millepertuis)', 'Diltiazem : × 2,2 ; pamplemousse à éviter ; lithium : effet négligeable'],
    monitor: ['Poids ; glycémie chez le diabétique ; PA orthostatique si risque'],
    age: 'Prudence aux doses élevées après 65 ans.',
    preg: 'Données limitées (< 300 grossesses) : à éviter sauf indication claire ; surveiller le nouveau-né exposé au 3e trimestre. CRAT.',
    renal: 'Rein : modérée à terminale, maximum 74 mg. Foie : modérée, maximum 74 mg ; sévère, maximum 37 mg.',
    cardio: 'Pas de mise en garde sur le QT (Stahl) ; hypotension orthostatique.',
    stop: 'Décroissance progressive lors d’un relais.',
    pearls: ['CANMAT : 1re ligne dans la dépression bipolaire I (seule ou avec lithium ou valproate), pas de données dans la manie, 2e ligne en entretien en association', 'Au repas, de préférence le soir', 'Neutre sur le poids, les lipides et la glycémie dans les essais'],
    src: 'RCP européen Latuda (EMA, 05/2026) ; BDPM (absente, 22/10/2026) ; CANMAT/ISBD 2018 ; Stahl’s Prescriber’s Guide, 7e éd.'
  }
});

/* Boussole : tm/td = traite la manie / la dépression bipolaire I aiguë ; pm/pd = prévient la manie / la dépression.
   1 = 1re ligne CANMAT/ISBD 2018, 2 = 2e ligne, 0 = 3e ligne, non recommandé ou sans données.
   Entretien : ligne de la molécule, abaissée d’un cran pour le pôle le moins bien prouvé ; 0 sans données (ou niveau 4 seul). */
C.thymo = [
  { t: 'Lithium', cls: 'Lithium', tm: 1, td: 1, pm: 1, pd: 1,
    p: 'Traite et prévient dans les deux directions ; meilleur effet préventif sur la manie que sur la dépression ; seul effet anti-suicide démontré.',
    fr: 'Prévention des rechutes des troubles bipolaires ; traitement curatif des états d’excitation maniaque ou hypomaniaque.', mol: 'lithium' },
  { t: 'Quétiapine', cls: 'Antipsychotique 2G', tm: 1, td: 1, pm: 1, pd: 1,
    p: 'Comme le lithium, 1re ligne dans les quatre directions ; la dose oriente l’effet : ≈ 300 mg/j dans la dépression, 400–800 mg/j dans la manie.',
    fr: 'Épisodes maniaques et épisodes dépressifs majeurs du trouble bipolaire ; prévention des récidives chez les répondeurs (SMR jugé insuffisant en 2016).', mol: 'quetiapine' },
  { t: 'Divalproate', cls: 'Anticonvulsivant', tm: 1, td: 2, pm: 2, pd: 1,
    p: 'Antimaniaque de 1re ligne, 2e ligne seulement dans la dépression ; 1re ligne en entretien, mais avec des preuves plus faibles contre la manie (niveau 3) que contre la dépression (niveau 2).',
    fr: 'Épisodes maniaques en cas de contre-indication ou d’intolérance au lithium, poursuite possible chez les répondeurs ; contre-indiqué pendant la grossesse.', mol: 'divalproate' },
  { t: 'Lamotrigine', cls: 'Anticonvulsivant', tm: 0, td: 1, pm: 2, pd: 1,
    p: 'Le thymorégulateur « par le bas » : traite et prévient la dépression bipolaire, sans effet dans la manie aiguë ; la prévention de la manie est moins bien établie (niveau 2 contre 1).',
    fr: 'Prévention des épisodes dépressifs du trouble bipolaire I à prédominance dépressive ; aucune indication en phase aiguë.', mol: 'lamotrigine' },
  { t: 'Carbamazépine', cls: 'Anticonvulsivant', tm: 2, td: 0, pm: 2, pd: 2,
    p: 'Antimaniaque et préventif de 2e ligne, peu d’effet démontré dans la dépression aiguë (3e ligne) ; ses interactions pèsent autant que son efficacité.',
    fr: 'Prévention des rechutes (résistance relative, contre-indication ou intolérance au lithium) ; états d’excitation maniaque ou hypomaniaque.', mol: 'carbamazepine' },
  { t: 'Aripiprazole', cls: 'Antipsychotique 2G', tm: 1, td: 0, pm: 1, pd: 0,
    p: 'Tout « par le haut » : traite la manie et prévient les récidives maniaques, mais non recommandé dans la dépression bipolaire et sans effet préventif démontré sur elle.',
    fr: 'Épisodes maniaques modérés à sévères du trouble bipolaire I ; prévention des récidives maniaques chez les répondeurs.', mol: 'aripiprazole' },
  { t: 'Olanzapine', cls: 'Antipsychotique 2G', tm: 2, td: 2, pm: 2, pd: 2,
    p: 'Preuves solides dans toutes les directions, mais 2e ligne à cause du risque métabolique ; dans la dépression, c’est l’association à la fluoxétine qui est recommandée.',
    fr: 'Épisodes maniaques modérés à sévères ; prévention des récidives chez les patients ayant répondu à l’olanzapine lors d’un épisode maniaque.', mol: 'olanzapine' },
  { t: 'Rispéridone', cls: 'Antipsychotique 2G', tm: 1, td: 0, pm: 2, pd: 0,
    p: 'Antimaniaque de 1re ligne, seule ou associée ; aucune donnée dans la dépression ; en entretien, seule la forme injectable retard est recommandée, contre la manie.',
    fr: 'Épisodes maniaques modérés à sévères ; pas d’AMM en prévention des récidives bipolaires.', mol: 'risperidone' },
  { t: 'Asénapine', cls: 'Antipsychotique 2G', tm: 1, td: 0, pm: 1, pd: 1,
    p: 'Antimaniaque et préventif de 1re ligne dans les deux directions (preuves d’entretien de niveau 2) ; aucune donnée dans la dépression aiguë.',
    fr: 'Non commercialisée en France (AMM européenne : épisodes maniaques modérés à sévères du trouble bipolaire I).', mol: 'asenapine' },
  { t: 'Cariprazine', cls: 'Antipsychotique 2G', tm: 1, td: 2, pm: 0, pd: 0,
    p: 'Traite la manie (1re ligne) et la dépression bipolaire (2e ligne) ; pas de données d’entretien dans CANMAT 2018.',
    fr: 'Pas d’AMM dans le trouble bipolaire (schizophrénie seulement) ; non commercialisée en France.', mol: 'cariprazine' },
  { t: 'Lurasidone', cls: 'Antipsychotique 2G', tm: 0, td: 1, pm: 0, pd: 2,
    p: 'Le profil inverse de l’aripiprazole : 1re ligne dans la dépression bipolaire, aucune donnée dans la manie ; en entretien, 2e ligne associée au lithium ou au valproate, surtout contre la dépression.',
    fr: 'Non commercialisée en France ; AMM européenne limitée à la schizophrénie.', mol: 'lurasidone' }
];

/* ─── terms ─── */
/* Glossaire. */
C.terms = {
  /* ── Cibles moléculaires ── */
  'sert': { t: 'Transporteur de la sérotonine (SERT)', k: 'tr', en: 'serotonin transporter (SLC6A4)', def: 'Protéine de la membrane des neurones sérotoninergiques (famille SLC6, gène SLC6A4) qui recapte la sérotonine de la fente synaptique, en la couplant au gradient de sodium : elle met fin à l’action de la 5-HT et permet son recyclage dans les vésicules.', more: 'Cible commune des ISRS, des IRSNa, de la clomipramine et de la vortioxétine : aux doses minimales efficaces des ISRS, environ 80 % des SERT sont occupés ([[occupation]]). Les plaquettes ne synthétisent pas de sérotonine mais la captent par le SERT, d’où le risque hémorragique des ISRS, majoré par les AINS et les anticoagulants.', trap: 'Bloquer le SERT n’élève pas d’emblée la sérotonine dans les régions de projection : elle augmente d’abord autour des corps cellulaires du raphé, où elle freine la décharge via les autorécepteurs 5-HT1A.', vs: ['net', 'dat'], see: ['r5ht1a', 'syndrome-serotoninergique', 'hyponatremie'], panes: ['c-sert'], src: 'Stahl 2013, chap. 2 (fig. 2-2) et chap. 7 (fig. 7-12 à 7-17) ; Meyer et al. 2004 ; fiche OMéDIT Normandie' },
  'net': { t: 'Transporteur de la noradrénaline (NET)', k: 'tr', en: 'norepinephrine transporter (SLC6A2)', def: 'Transporteur présynaptique des neurones noradrénergiques (famille SLC6, gène SLC6A2) qui recapte la noradrénaline ; il transporte aussi la dopamine, pour laquelle son affinité est même supérieure.', more: 'Le cortex préfrontal contient très peu de DAT : la dopamine y diffuse et n’est éliminée que par le NET ou la COMT. Bloquer le NET y élève donc noradrénaline et dopamine, d’où les « deux mécanismes et demi » que Stahl prête aux IRSNa.', trap: 'La venlafaxine n’inhibe nettement le NET qu’à doses élevées (de l’ordre de 225 mg/j) : à faible dose, elle agit surtout comme un ISRS.', vs: ['sert', 'dat'], see: ['cortex-prefrontal', 'noradrenaline'], panes: ['c-net'], src: 'Stahl 2013, chap. 2 (tableau 2-1) et chap. 7 (fig. 7-30, 7-34) ; Wikipédia (PDSP)' },
  'dat': { t: 'Transporteur de la dopamine (DAT)', k: 'tr', en: 'dopamine transporter (SLC6A3)', def: 'Transporteur présynaptique des neurones dopaminergiques (famille SLC6, gène SLC6A3), dense dans le striatum et le noyau accumbens mais rare dans le cortex préfrontal ; il recapte la dopamine et transporte aussi les amphétamines.', more: 'Une occupation rapide et importante du DAT (50 % ou plus) produit euphorie et renforcement, comme avec la cocaïne ; une occupation lente, modeste et prolongée serait compatible avec un effet antidépresseur (bupropion). Parmi les antidépresseurs disponibles en France, seule la {{sertraline|sertraline}} a une affinité notable pour le DAT, de portée clinique discutée.', trap: 'Les IRSNa n’inhibent pas le DAT : leur effet dopaminergique se limite au cortex préfrontal, via le NET.', vs: ['net'], see: ['noyau-accumbens', 'dopamine'], panes: ['c-dat'], src: 'Stahl 2013, chap. 2 (tableau 2-1) et chap. 7 (fig. 7-19, 7-34 ; p. 640)' },
  'vmat2': { t: 'Transporteur vésiculaire des monoamines (VMAT2)', k: 'tr', en: 'vesicular monoamine transporter 2 (SLC18A2)', def: 'Transporteur de la membrane des vésicules synaptiques (famille SLC18) qui y concentre sérotonine, noradrénaline, dopamine et histamine en échange de protons : un même transporteur pour toutes les monoamines.', more: 'La [[reserpine|réserpine]] le bloque de façon irréversible et vide les neurones de leurs monoamines ; la tétrabénazine, utilisée dans la chorée de Huntington, l’inhibe aussi ; les amphétamines agissent à la fois sur le VMAT2 et sur les transporteurs membranaires.', trap: 'Réserpine et tétrabénazine figurent parmi les associations contre-indiquées avec l’iproniazide (RCP Marsilid).', see: ['monoamine', 'reserpine'], panes: ['c-vmat2'], src: 'Stahl 2013, chap. 2 (fig. 2-2, tableau 2-3 ; p. 99) ; RCP Marsilid' },
  'mao': { t: 'Monoamine oxydase (MAO)', k: 'enz', en: 'monoamine oxidase (MAO-A, MAO-B)', def: 'Enzyme de la membrane externe des mitochondries qui dégrade par désamination oxydative les monoamines intracellulaires ; la MAO-A préfère sérotonine et noradrénaline, la MAO-B la phényléthylamine, et toutes deux dégradent dopamine et tyramine.', more: 'La MAO-A prédomine dans l’intestin, le foie et le placenta, où elle détruit la [[tyramine]] alimentaire ; les neurones sérotoninergiques ne contiendraient que de la MAO-B. Seule l’inhibition de la MAO-A cérébrale est antidépressive ; après un IMAO irréversible, l’activité ne revient qu’avec la resynthèse de l’enzyme, en 2 à 3 semaines.', trap: 'Le linézolide et le bleu de méthylène inhibent aussi la MAO-A : leur association aux antidépresseurs sérotoninergiques est contre-indiquée ou déconseillée selon les RCP.', vs: ['comt'], see: ['effet-fromage', 'imao-reversible'], panes: ['c-mao'], src: 'Stahl 2013, chap. 7 (tableau 7-1, fig. 7-51 à 7-53 ; p. 672) ; RCP Anafranil, Brintellix, Cymbalta' },
  'comt': { t: 'Catéchol-O-méthyltransférase (COMT)', k: 'enz', en: 'catechol-O-methyltransferase', def: 'Enzyme qui inactive les catécholamines (dopamine, noradrénaline) par méthylation de leur noyau catéchol ; elle agit surtout hors de la terminaison présynaptique et ne dégrade pas la sérotonine, qui n’est pas une catécholamine.', more: 'Dans le cortex préfrontal, pauvre en DAT, la COMT est une voie majeure d’élimination de la dopamine ; sa variante génétique Val y réduirait la dopamine disponible. Ses inhibiteurs (entacapone, tolcapone) servent dans la maladie de Parkinson ; l’entacapone est contre-indiquée avec l’iproniazide.', vs: ['mao'], see: ['cortex-prefrontal', 'dopamine'], src: 'Stahl 2013, chap. 4 (fig. 4-6 ; p. 262), chap. 6 (fig. 6-26) et chap. 7 (fig. 7-34, 7-74) ; RCP Marsilid' },
  'tph': { t: 'Tryptophane hydroxylase (TPH)', k: 'enz', en: 'tryptophan hydroxylase (TPH1, TPH2)', def: 'Enzyme limitante de la synthèse de la sérotonine : elle hydroxyle le tryptophane en 5-hydroxytryptophane (5-HTP), avec la tétrahydrobioptérine (BH4) comme cofacteur.', more: 'Deux isoformes : TPH2 dans les neurones du raphé, TPH1 en périphérie (cellules entérochromaffines de l’intestin, glande pinéale). La sérotonine ne franchissant pas la barrière hémato-encéphalique, la synthèse cérébrale dépend de l’apport de [[tryptophane]].', see: ['ddc', 'serotonine'], src: 'Stahl 2013, chap. 5 (fig. 5-13) et chap. 7 (fig. 7-72) ; Walther et al. 2003' },
  'th': { t: 'Tyrosine hydroxylase (TH)', k: 'enz', en: 'tyrosine hydroxylase', def: 'Enzyme limitante de la synthèse des catécholamines : elle transforme la tyrosine en L-DOPA, avec la BH4 comme cofacteur ; elle est présente dans les neurones dopaminergiques et noradrénergiques et dans la médullosurrénale.', more: 'Son activité est réglée par phosphorylation et par rétrocontrôle des catécholamines. La chaîne est ensuite commune : L-DOPA → dopamine ([[ddc|DDC]]), puis dopamine → noradrénaline ([[dbh|DBH]]) dans les seuls neurones noradrénergiques.', see: ['ddc', 'dbh'], src: 'Stahl 2013, chap. 6 (fig. 6-25) et chap. 7 (fig. 7-72)' },
  'ddc': { t: 'Décarboxylase des acides aminés aromatiques (DDC)', k: 'enz', en: 'aromatic L-amino acid decarboxylase (AADC, DOPA decarboxylase)', def: 'Enzyme commune aux deux voies de synthèse : elle décarboxyle la L-DOPA en dopamine et le 5-HTP en sérotonine, avec le phosphate de pyridoxal (vitamine B6) comme cofacteur.', more: 'Elle n’est pas limitante : la vitesse de synthèse est fixée en amont par la TH et la TPH. Ses inhibiteurs périphériques (carbidopa, bensérazide) protègent la L-DOPA donnée dans la maladie de Parkinson.', see: ['th', 'tph'], src: 'Stahl 2013, chap. 5 (fig. 5-13) et chap. 6 (fig. 6-25)' },
  'dbh': { t: 'Dopamine β-hydroxylase (DBH)', k: 'enz', en: 'dopamine beta-hydroxylase', def: 'Dernière enzyme de la synthèse de la noradrénaline, qui hydroxyle la dopamine ; elle est située dans les vésicules, si bien que la dopamine doit d’abord y être transportée par le VMAT2.', more: 'Elle n’existe que dans les neurones noradrénergiques et adrénergiques : pour eux, la dopamine n’est qu’un précurseur. Elle est libérée avec la noradrénaline lors de l’exocytose ; le disulfirame l’inhibe.', see: ['vmat2', 'noradrenaline'], src: 'Stahl 2013, chap. 6 (fig. 6-25)' },
  'r5ht1a': { t: 'Récepteur 5-HT1A', k: 'rec', en: '5-HT1A receptor', def: 'Récepteur couplé aux protéines Gi/o, inhibiteur : sur les corps cellulaires et les dendrites du raphé, c’est le seul autorécepteur somatodendritique de la sérotonine, qui ralentit la décharge ; il est aussi post-synaptique (hippocampe, septum, amygdale, cortex).', more: 'Sous ISRS, la sérotonine s’accumule d’abord dans le raphé et stimule ces autorécepteurs ; leur désensibilisation en quelques semaines lève le frein et correspondrait au délai d’action. Agonistes ou agonistes partiels : buspirone, vortioxétine, aripiprazole, cariprazine, quétiapine (par la norquétiapine).', trap: 'Les 5-HT1A corticaux sont post-synaptiques : les stimuler ne freine pas le neurone sérotoninergique mais favorise indirectement la libération de dopamine (Stahl, fig. 5-15C).', vs: ['r5ht1b'], see: ['autorecepteur', 'desensibilisation'], panes: ['c-5ht1a'], src: 'Stahl 2013, chap. 5 (fig. 5-15, 5-25, 5-26) et chap. 7 (fig. 7-13 à 7-16)' },
  'r5ht1b': { t: 'Récepteurs 5-HT1B et 5-HT1D', k: 'rec', en: '5-HT1B/1D receptors', def: 'Récepteurs couplés aux protéines Gi situés sur les terminaisons axonales sérotoninergiques, où ils jouent le rôle d’autorécepteurs terminaux : la sérotonine présente dans la fente y freine sa propre libération.', more: 'Les bloquer pourrait augmenter la libération de sérotonine en présence d’un inhibiteur du SERT. La vortioxétine agit sur ces récepteurs (agoniste partiel 5-HT1B, antagoniste 5-HT1D selon les données de liaison) ; les triptans sont des agonistes 5-HT1B/D.', vs: ['r5ht1a'], see: ['autorecepteur'], src: 'Stahl 2013, chap. 5 (fig. 5-27) et chap. 7 (fig. 7-89) ; Wikipédia (vortioxétine)' },
  'r5ht2a': { t: 'Récepteur 5-HT2A', k: 'rec', en: '5-HT2A receptor', def: 'Récepteur post-synaptique couplé aux protéines Gq, excitateur, très exprimé sur les neurones pyramidaux du cortex ; il favorise la libération de glutamate et freine indirectement celle de dopamine dans le striatum.', more: 'Sa stimulation par l’excès de sérotonine contribuerait à l’insomnie, à l’agitation et à la dysfonction sexuelle des ISRS ; son blocage (trazodone, mirtazapine, antipsychotiques atypiques) atténue ces effets. Les psychédéliques classiques (LSD, psilocybine) en sont des agonistes.', trap: 'Les atypiques bloquent le 5-HT2A plus puissamment que le D2, sauf l’aripiprazole et la cariprazine, dont l’atypicité tient surtout à l’agonisme partiel D2 et 5-HT1A (Stahl, fig. 5-24).', vs: ['r5ht2c'], see: ['hyperprolactinemie', 'dysfonction-sexuelle'], panes: ['c-5ht2a'], src: 'Stahl 2013, chap. 5 (fig. 5-15 à 5-24), chap. 7 (fig. 7-49) et chap. 14 (fig. 14-19)' },
  'r5ht2c': { t: 'Récepteur 5-HT2C', k: 'rec', en: '5-HT2C receptor', def: 'Récepteur post-synaptique couplé aux protéines Gq ; porté notamment par des interneurones GABA du tronc cérébral et du cortex, il freine la libération de dopamine et de noradrénaline dans le cortex préfrontal.', more: 'Le bloquer désinhibe dopamine et noradrénaline préfrontales : mécanisme proposé pour la fluoxétine, la mirtazapine, l’agomélatine et certains antipsychotiques (quétiapine, olanzapine). Il intervient dans la satiété : son blocage, surtout associé à celui du H1, favorise la prise de poids.', trap: 'L’antagonisme 5-HT2C est « activateur » : énergisant pour certains patients (fluoxétine), il peut aggraver agitation, insomnie ou anxiété chez d’autres.', vs: ['r5ht2a'], see: ['h1', 'syndrome-metabolique'], panes: ['c-5ht2c'], src: 'Stahl 2013, chap. 5 (fig. 5-29, 5-41, 5-52) et chap. 7 (fig. 7-18, 7-43)' },
  'r5ht3': { t: 'Récepteur 5-HT3', k: 'rec', en: '5-HT3 receptor', def: 'Seul récepteur ionotrope de la sérotonine : canal cationique pentamérique présent dans l’area postrema, le tronc cérébral et le tube digestif, où il déclenche nausées, vomissements et accélération du transit.', more: 'Sa stimulation par la sérotonine en excès explique les nausées et la diarrhée du début des ISRS. Dans le cerveau, il active des interneurones GABA : le bloquer (mirtazapine, miansérine, vortioxétine) désinhiberait noradrénaline et acétylcholine.', trap: 'L’ondansétron, antagoniste 5-HT3 antiémétique, figure pourtant parmi les médicaments impliqués dans des syndromes sérotoninergiques (fiche OMéDIT).', see: ['area-postrema', 'recepteur-ionotrope'], panes: ['c-5ht3'], src: 'Stahl 2013, chap. 3 (tableau 3-1), chap. 5 (p. 335–336) et chap. 7 (fig. 7-46) ; fiche OMéDIT Normandie' },
  'r5ht7': { t: 'Récepteur 5-HT7', k: 'rec', en: '5-HT7 receptor', def: 'Récepteur couplé aux protéines Gs, présent dans le noyau suprachiasmatique, le thalamus, l’hippocampe et le cortex ; sur les interneurones GABA du raphé, il forme une boucle de rétrocontrôle qui freine la libération de sérotonine.', more: 'Son blocage désinhiberait la sérotonine, surtout associé à une inhibition du SERT, et interviendrait dans les rythmes circadiens et le sommeil. Antagonistes, à des degrés divers : vortioxétine, lurasidone, asénapine, rispéridone, aripiprazole.', see: ['noyau-suprachiasmatique', 'r5ht1a'], src: 'Stahl 2013, chap. 5 (fig. 5-30, 5-60, 5-61) ; Wikipédia (PDSP) pour les Ki' },
  'a1': { t: 'Récepteur α1-adrénergique', k: 'rec', en: 'alpha-1 adrenergic receptor', def: 'Récepteur post-synaptique de la noradrénaline, couplé aux protéines Gq, excitateur : il contracte les muscles lisses vasculaires et participe à l’éveil ; sur les corps cellulaires du raphé, il accélère la décharge des neurones sérotoninergiques.', more: 'Son blocage, fréquent avec les tricycliques, la miansérine, la quétiapine et la rispéridone, donne [[hypotension-orthostatique]], vertiges et sédation. Sa stimulation par un décongestionnant, chez un patient sous IMAO, expose à une poussée hypertensive.', vs: ['a2', 'beta'], see: ['hypotension-orthostatique'], panes: ['c-a1'], src: 'Stahl 2013, chap. 5 (p. 355, fig. 5-40), chap. 6 (fig. 6-30) et chap. 7 (fig. 7-58, 7-69)' },
  'a2': { t: 'Récepteur α2-adrénergique', k: 'rec', en: 'alpha-2 adrenergic receptor', def: 'Récepteur couplé aux protéines Gi, seul récepteur noradrénergique à servir d’autorécepteur : sur les terminaisons et les corps cellulaires du locus coeruleus, il freine libération et décharge ; sur les terminaisons sérotoninergiques, c’est un hétérorécepteur qui freine la libération de sérotonine.', more: 'Les antagonistes α2 ({{mirtazapine|mirtazapine}}, {{mianserine|miansérine}}) « coupent les deux freins » : ils augmentent la libération de noradrénaline et, via les α1 du raphé et les hétérorécepteurs, celle de sérotonine, sans bloquer de transporteur. Les agonistes (clonidine, guanfacine) sont antihypertenseurs ou utilisés dans le TDAH.', trap: 'Associer un antagoniste α2 à un inhibiteur de recapture n’est pas redondant : les deux mécanismes sont synergiques, d’où cette association en cas de réponse partielle (Bennabi 2019).', vs: ['a1'], see: ['autorecepteur', 'heterorecepteur'], panes: ['c-a2'], src: 'Stahl 2013, chap. 6 (fig. 6-28 à 6-30) et chap. 7 (fig. 7-44, 7-45) ; Bennabi et al. 2019' },
  'beta': { t: 'Récepteurs β-adrénergiques', k: 'rec', en: 'beta adrenergic receptors (β1–β3)', def: 'Récepteurs post-synaptiques de la noradrénaline et de l’adrénaline, couplés aux protéines Gs (hausse de l’AMPc) : β1 surtout cardiaque, β2 bronchique et vasculaire, β3 adipocytaire et vésical ; tous existent aussi dans le cerveau.', more: 'La régulation négative des récepteurs β corticaux après traitement antidépresseur prolongé, décrite chez l’animal dans les années 1970, a nourri l’hypothèse des récepteurs du délai d’action. Les bêtabloquants (propranolol) soulagent le tremblement d’attitude, notamment lithien, et l’akathisie.', see: ['desensibilisation', 'akathisie'], src: 'Stahl 2013, chap. 6 (fig. 6-27) et chap. 7 (fig. 7-9)' },
  'd2': { t: 'Récepteur dopaminergique D2', k: 'rec', en: 'dopamine D2 receptor', def: 'Récepteur couplé aux protéines Gi/o, post-synaptique dans le striatum, le noyau accumbens et l’hypophyse, et autorécepteur sur les neurones dopaminergiques ; c’est la cible commune de tous les antipsychotiques.', more: 'Le bloquer dans la voie mésolimbique est antipsychotique et antimaniaque ; dans la voie nigrostriée, il donne des symptômes extrapyramidaux et une akathisie ; dans la voie tubéro-infundibulaire, une hyperprolactinémie. En TEP, l’effet antipsychotique apparaît vers 65 % d’occupation, l’hyperprolactinémie vers 72 % et les effets extrapyramidaux vers 78 % (Kapur 2000).', trap: 'L’aripiprazole et la cariprazine ne sont pas des antagonistes mais des [[agoniste-partiel|agonistes partiels]] D2 : ils élèvent peu la prolactine mais donnent volontiers une akathisie.', see: ['hyperprolactinemie', 'akathisie'], panes: ['c-d2'], src: 'Stahl 2013, chap. 4 (fig. 4-10, 4-11) et chap. 5 (fig. 5-23, 5-31 à 5-35) ; Kapur et al. 2000 ; RCP Abilify, Reagila' },
  'h1': { t: 'Récepteur histaminique H1', k: 'rec', en: 'histamine H1 receptor', def: 'Récepteur couplé aux protéines Gq qui relaie l’effet éveillant de l’histamine, libérée vers le cortex par les neurones du noyau tubéromamillaire de l’hypothalamus.', more: 'Son blocage donne sédation et, surtout associé au blocage 5-HT2C, prise de poids : mirtazapine, miansérine, doxépine, amitriptyline, quétiapine, olanzapine. L’affinité de la doxépine pour le H1 est telle qu’à 1–6 mg/j elle devient un hypnotique quasi sélectif.', trap: 'La sédation « antihistaminique » des tricycliques et de la diphénhydramine tient aussi à leur effet anticholinergique : un antagoniste H1 sélectif n’a pas ces effets.', see: ['m1', 'syndrome-metabolique'], panes: ['c-h1'], src: 'Stahl 2013, chap. 5 (fig. 5-38, 5-39), chap. 7 (fig. 7-67) et chap. 11 (fig. 11-4, 11-19, 11-20)' },
  'm1': { t: 'Récepteurs muscariniques (M1–M5)', k: 'rec', en: 'muscarinic acetylcholine receptors', def: 'Récepteurs de l’acétylcholine couplés aux protéines G (M1, M3, M5 : Gq ; M2, M4 : Gi) ; le M1, cortical et hippocampique, participe à la mémoire et à l’éveil, tandis que M2 et M3 règlent cœur, glandes, intestin et vessie.', more: 'Leur blocage produit l’[[effet-anticholinergique]] : bouche sèche, constipation, rétention urinaire, mydriase et vision floue, tachycardie, troubles cognitifs et confusion chez le sujet âgé. Molécules concernées : tricycliques (surtout l’amitriptyline), paroxétine parmi les ISRS, olanzapine et quétiapine.', trap: 'Le rebond cholinergique contribue au syndrome d’arrêt marqué de la paroxétine et des tricycliques.', see: ['effet-anticholinergique', 'h1'], panes: ['c-m1'], src: 'Stahl 2013, chap. 2 (tableau 2-4), chap. 5 (fig. 5-11, 5-39) et chap. 7 (fig. 7-20, 7-68)' },
  'sigma1': { t: 'Récepteur σ1 (sigma-1)', k: 'rec', en: 'sigma-1 receptor', def: 'Malgré son nom, ni un RCPG ni un canal : une protéine chaperon de la membrane du réticulum endoplasmique, à l’interface avec la mitochondrie, qui module la signalisation calcique et la survie cellulaire.', more: 'Plusieurs ISRS s’y lient : la fluvoxamine avec la plus forte affinité (Ki ≈ 17–36 nM, agoniste), puis la sertraline ; Stahl y voit une piste pour leurs effets anxiolytiques et dans la dépression psychotique, sans preuve établie. Le dextrométhorphane et, faiblement, la kétamine s’y lient aussi.', see: ['sert'], panes: ['c-sigma1'], src: 'Stahl 2013, chap. 7 (fig. 7-19, 7-21, 7-90, 7-94) ; Hayashi et Su 2007 ; Wikipédia (PDSP) pour les Ki' },
  'mt': { t: 'Récepteurs de la mélatonine MT1 et MT2', k: 'rec', en: 'melatonin MT1/MT2 receptors', def: 'Récepteurs couplés aux protéines Gi, très denses dans le noyau suprachiasmatique, par lesquels la mélatonine sécrétée la nuit synchronise l’horloge circadienne et favorise le sommeil.', more: 'L’{{agomelatine|agomélatine}} en est un agoniste très puissant (Ki ≈ 0,1 nM) et un antagoniste 5-HT2C beaucoup plus faible ; selon Stahl, l’agonisme mélatoninergique seul ne suffit pas à l’effet antidépresseur. Le « MT3 » est en fait une enzyme (quinone réductase 2), étrangère au sommeil.', see: ['melatonine', 'noyau-suprachiasmatique'], panes: ['c-mt'], src: 'Stahl 2013, chap. 7 (fig. 7-41 à 7-43) ; Wikipédia (agomélatine)' },
  'nmda': { t: 'Récepteur NMDA', k: 'rec', en: 'NMDA receptor', def: 'Récepteur ionotrope tétramérique du glutamate, perméable au calcium, qui exige un co-agoniste (glycine ou D-sérine) et une dépolarisation levant le blocage par le magnésium ; il est au cœur de la plasticité synaptique.', more: 'La kétamine et l’{{esketamine|eskétamine}} le bloquent à l’intérieur du canal ouvert (site de la phencyclidine) ; le blocage sur les interneurones GABA provoquerait une bouffée de glutamate qui active les récepteurs AMPA, la voie mTOR et la formation d’épines dendritiques, base supposée de l’effet antidépresseur rapide.', vs: ['ampa'], see: ['glutamate', 'plasticite-synaptique'], panes: ['c-nmda'], src: 'Stahl 2013, chap. 3 (tableaux 3-2, 3-3) et chap. 7 (fig. 7-90 à 7-93)' },
  'ampa': { t: 'Récepteur AMPA', k: 'rec', en: 'AMPA receptor', def: 'Récepteur ionotrope tétramérique du glutamate (sous-unités GluR1–4) qui assure l’essentiel de la transmission excitatrice rapide, surtout par entrée de sodium.', more: 'Dans l’hypothèse glutamatergique, c’est la stimulation des AMPA par la bouffée de glutamate provoquée par la kétamine qui déclencherait la signalisation (BDNF, mTOR) et la synaptogenèse. La tianeptine potentialiserait aussi leur fonction (Prescriber’s Guide).', vs: ['nmda'], see: ['glutamate', 'bdnf'], src: 'Stahl 2013, chap. 3 (tableau 3-3) et chap. 7 (fig. 7-93) ; Prescriber’s Guide 2021 (tianeptine)' },
  'gaba-a': { t: 'Récepteur GABA-A', k: 'rec', en: 'GABA-A receptor', def: 'Récepteur ionotrope pentamérique perméable au chlore, principal médiateur de l’inhibition rapide : l’entrée de chlorure hyperpolarise le neurone.', more: 'Les benzodiazépines et les hypnotiques « Z » en sont des modulateurs allostériques positifs : ils amplifient l’effet du GABA sans agir seuls, d’où leurs effets anxiolytique, sédatif, anticonvulsivant, amnésiant et myorelaxant. Le valproate augmenterait plutôt le GABA disponible.', see: ['gaba', 'recepteur-ionotrope'], src: 'Stahl 2013, chap. 3 (tableaux 3-1, 3-2 ; fig. 3-16) et chap. 8 (fig. 8-6)' },
  'canaux-na': { t: 'Canaux sodiques voltage-dépendants', k: 'can', en: 'voltage-gated sodium channels', def: 'Canaux ouverts par la dépolarisation, qui laissent entrer le sodium et propagent le potentiel d’action ; leur sous-unité α forme le pore, qu’une boucle intracellulaire obture lors de l’inactivation.', more: 'La carbamazépine et la lamotrigine s’y fixent en conformation ouverte, surtout dans les neurones qui déchargent vite, et réduiraient la libération de glutamate ; le valproate agirait plus indirectement. Les tricycliques bloquent aussi les canaux sodiques cardiaques (effet stabilisant de membrane) : en surdosage, troubles de conduction et convulsions.', trap: 'Tous les anticonvulsivants ne sont pas thymorégulateurs : la gabapentine et la prégabaline, ligands α2δ des canaux calciques, ne stabilisent pas l’humeur.', see: ['kindling', 'qt'], panes: ['c-canaux-na'], src: 'Stahl 2013, chap. 3 (fig. 3-18 à 3-21), chap. 7 (fig. 7-70) et chap. 8 (fig. 8-5, 8-9, 8-11 ; p. 792–793)' },
  'mor': { t: 'Récepteur µ-opioïde (MOR)', k: 'rec', en: 'mu-opioid receptor', def: 'Récepteur couplé aux protéines Gi/o des endorphines et des enképhalines, médiateur de l’analgésie, de la récompense, de la dépression respiratoire et de la dépendance aux opioïdes.', more: 'La {{tianeptine|tianeptine}} en est un agoniste complet (Ki ≈ 0,4–0,8 µM ; Gassaway 2014) ; chez l’animal, cette action semble contribuer à son effet antidépresseur. Elle rend compte du potentiel d’abus et de dépendance qui a fait soumettre la tianeptine à une partie de la réglementation des stupéfiants en 2012.', trap: 'L’ancienne présentation de la tianeptine comme « activateur de la recapture de la sérotonine » est abandonnée.', see: ['ordonnance-securisee'], panes: ['c-mor'], src: 'Gassaway et al. 2014 ; Prescriber’s Guide 2021 (tianeptine) ; avis HAS Stablon 2012' },
  'gsk3': { t: 'Glycogène synthase kinase 3 (GSK-3)', k: 'enz', en: 'glycogen synthase kinase 3', def: 'Kinase intracellulaire active en l’absence de signal, freinée par les voies des facteurs de croissance (Akt, Wnt) ; en excès, elle favorise l’apoptose et réduit la plasticité neuronale.', more: 'Le lithium l’inhibe directement (Klein et Melton 1996), le valproate aussi. Cette action pourrait participer aux effets thymorégulateur et neuroprotecteur ; un effet sur la phosphorylation de la protéine tau dans la maladie d’Alzheimer reste une hypothèse controversée.', vs: ['impase'], see: ['plasticite-synaptique'], panes: ['c-gsk3'], src: 'Stahl 2013, chap. 2 (fig. 2-14) et chap. 8 (fig. 8-3, 8-7 ; p. 777) ; Klein et Melton 1996' },
  'impase': { t: 'Inositol monophosphatase (IMPase)', k: 'enz', en: 'inositol monophosphatase', def: 'Enzyme du cycle des phosphoinositides qui recycle l’inositol nécessaire à la resynthèse du PIP2, substrat de la signalisation des récepteurs couplés aux protéines Gq (5-HT2A, α1, M1…).', more: 'Le lithium l’inhibe aux concentrations thérapeutiques : selon l’hypothèse de la déplétion en inositol (Berridge), il atténuerait sélectivement la signalisation des neurones les plus sollicités. C’est l’une des cibles candidates d’un mécanisme qui reste incertain.', vs: ['gsk3'], see: ['rcpg'], src: 'Stahl 2013, chap. 8 (fig. 8-3) ; Prescriber’s Guide 2021 (lithium) ; Berridge et al. 1989' },
  'bdnf': { t: 'BDNF et récepteur TrkB', k: 'mol', en: 'brain-derived neurotrophic factor; TrkB receptor', def: 'Facteur neurotrophique qui, en activant son récepteur à activité tyrosine kinase TrkB, soutient la survie des neurones, la croissance des dendrites, la synaptogenèse et la neurogenèse hippocampique.', more: 'Le stress chronique réprimerait son gène et contribuerait à l’atrophie hippocampique et préfrontale ; les antidépresseurs, l’ECT et la kétamine l’augmentent ([[hypothese-neurotrophique]]). Des données suggèrent que plusieurs antidépresseurs se lient directement à TrkB (Casarotto 2021), hypothèse encore discutée.', see: ['hypothese-neurotrophique', 'neurogenese'], src: 'Stahl 2013, chap. 6 (fig. 6-36 à 6-38) et chap. 7 (fig. 7-10, 7-93) ; Casarotto et al. 2021' },

  /* ── Neuroanatomie ── */
  'raphe': { t: 'Noyaux du raphé', k: 'voie', en: 'raphe nuclei', def: 'Groupes de neurones de la ligne médiane du tronc cérébral qui contiennent les corps cellulaires sérotoninergiques : les noyaux rostraux (raphé dorsal et médian) projettent vers tout le cerveau antérieur, les noyaux caudaux vers le tronc cérébral et la moelle.', more: 'Les projections ascendantes régleraient humeur, anxiété et sommeil ; les descendantes modulent la douleur. C’est là que s’exercent le frein des autorécepteurs 5-HT1A et l’accélérateur noradrénergique α1 venu du locus coeruleus.', see: ['r5ht1a', 'serotonine'], src: 'Stahl 2013, chap. 5 (fig. 5-25) et chap. 6 (fig. 6-30, 6-33)' },
  'locus-coeruleus': { t: 'Locus coeruleus', k: 'voie', en: 'locus coeruleus', def: 'Petit noyau pigmenté du pont, principale source de la noradrénaline cérébrale : ses projections ascendantes atteignent cortex, thalamus, hypothalamus, amygdale, hippocampe et cervelet, ses projections descendantes la moelle.', more: 'Il règle éveil, attention, réponse au stress et cognition ; ses projections descendantes modulent la douleur, l’une des bases de l’efficacité des IRSNa dans les douleurs. Ses neurones sont freinés par leurs autorécepteurs α2 et projettent aussi sur le raphé.', see: ['a2', 'noradrenaline'], src: 'Stahl 2013, chap. 6 (fig. 6-29, 6-30, 6-32) et chap. 7 (p. 634–635)' },
  'atv': { t: 'Aire tegmentale ventrale (ATV)', k: 'voie', en: 'ventral tegmental area (VTA)', def: 'Région du mésencéphale ventral dont les neurones dopaminergiques forment les voies mésolimbique (vers le noyau accumbens) et mésocorticale (vers le cortex préfrontal).', more: 'La voie mésolimbique porte motivation, plaisir et récompense, ainsi que les symptômes positifs de la psychose ; la voie mésocorticale intervient dans la cognition et l’affect. Des interneurones GABA porteurs de 5-HT2C y freinent la dopamine, frein que lèvent les antagonistes 5-HT2C.', vs: ['substance-noire'], see: ['noyau-accumbens', 'dopamine'], src: 'Stahl 2013, chap. 4 (fig. 4-11), chap. 6 (fig. 6-31) et chap. 7 (fig. 7-42)' },
  'substance-noire': { t: 'Substance noire', k: 'voie', en: 'substantia nigra', def: 'Noyau du mésencéphale dont la partie compacte contient les neurones dopaminergiques de la voie nigrostriée, qui projette vers le striatum dorsal et appartient au système extrapyramidal.', more: 'Bloquer les récepteurs D2 de cette voie donne parkinsonisme, dystonies, akathisie et, à long terme, dyskinésies tardives ; la sérotonine y freine la dopamine via des 5-HT2A, frein que lèvent les antipsychotiques atypiques.', vs: ['atv'], see: ['d2', 'akathisie'], src: 'Stahl 2013, chap. 4 (fig. 4-11) et chap. 5 (fig. 5-16 à 5-18)' },
  'cortex-prefrontal': { t: 'Cortex préfrontal', k: 'voie', en: 'prefrontal cortex (PFC)', def: 'Partie antérieure du lobe frontal : le cortex préfrontal dorsolatéral porte fonctions exécutives et attention ; les régions ventromédiale et orbitofrontale, la régulation émotionnelle et le contrôle de l’impulsivité.', more: 'Dans la dépression, l’activité dorsolatérale serait diminuée et la ventromédiale augmentée ; le cortex dorsolatéral est la cible usuelle de la rTMS. Faute de DAT, la dopamine y est éliminée par le NET et la COMT : bloquer le NET ou le 5-HT2C y élève la dopamine.', see: ['net', 'rtms'], src: 'Stahl 2013, chap. 6 (fig. 6-45, 6-49 à 6-51) et chap. 7 (fig. 7-34, 7-75)' },
  'noyau-accumbens': { t: 'Noyau accumbens', k: 'voie', en: 'nucleus accumbens', def: 'Partie ventrale du striatum où se terminent les neurones dopaminergiques de la voie mésolimbique ; nœud du circuit de la récompense et de la motivation.', more: 'Sa dysfonction est associée à l’anhédonie et à la baisse de l’affect positif, que Stahl rattache surtout à la dopamine ; il reçoit aussi des projections sérotoninergiques. C’est un site clé de l’effet renforçant des substances addictives.', see: ['anhedonie', 'atv'], src: 'Stahl 2013, chap. 4 (fig. 4-11) et chap. 6 (fig. 6-31, 6-33, 6-46)' },
  'hippocampe': { t: 'Hippocampe', k: 'voie', en: 'hippocampus', def: 'Structure du lobe temporal médian essentielle à la mémoire épisodique, qui freine l’axe hypothalamo-hypophyso-surrénalien (rétrocontrôle des glucocorticoïdes).', more: 'Le stress chronique et l’excès de glucocorticoïdes s’y accompagnent d’une atrophie, en partie réversible ; son gyrus denté est l’un des rares sites de [[neurogenese|neurogenèse]] adulte, stimulée chez l’animal par les antidépresseurs. Il est riche en récepteurs 5-HT1A post-synaptiques.', see: ['bdnf', 'neurogenese', 'amygdale'], src: 'Stahl 2013, chap. 6 (fig. 6-37 à 6-39)' },
  'amygdale': { t: 'Amygdale', k: 'voie', en: 'amygdala', def: 'Ensemble de noyaux du lobe temporal médian qui évalue la valeur émotionnelle des stimuli, en particulier la menace, et déclenche les réponses de peur.', more: 'Elle est hyperactive au repos dans la dépression et sur-réactive à la tristesse induite. Les porteurs de l’allèle court (s) du gène du SERT réagissent davantage aux visages effrayés, effet génétique réel mais de faible poids dans le risque de dépression.', see: ['cortex-prefrontal', 'serotonine'], src: 'Stahl 2013, chap. 6 (fig. 6-43, 6-49, 6-50)' },
  'area-postrema': { t: 'Area postrema', k: 'voie', en: 'area postrema (chemoreceptor trigger zone)', def: 'Organe circumventriculaire du plancher du quatrième ventricule, dépourvu de barrière hémato-encéphalique : il détecte les substances circulantes et déclenche nausées et vomissements (zone gâchette chémoréceptrice).', more: 'Il porte notamment des récepteurs 5-HT3 et D2 : la sérotonine en excès explique les nausées du début des ISRS, qui s’atténuent souvent avec la désensibilisation des récepteurs.', see: ['r5ht3', 'desensibilisation'], src: 'Stahl 2013, chap. 5 (p. 335–336) et chap. 7 (p. 662)' },
  'noyau-suprachiasmatique': { t: 'Noyau suprachiasmatique', k: 'voie', en: 'suprachiasmatic nucleus (SCN)', def: 'Petit noyau de l’hypothalamus antérieur, au-dessus du chiasma optique : c’est l’horloge circadienne principale, synchronisée par la lumière via le faisceau rétino-hypothalamique.', more: 'Le jour, il freine via la glande pinéale la sécrétion de mélatonine ; la nuit, la mélatonine agit en retour sur ses récepteurs MT1/MT2, qui y coexistent avec des 5-HT2C. C’est la cible proposée de l’agomélatine pour resynchroniser des rythmes souvent retardés dans la dépression.', see: ['mt', 'melatonine', 'r5ht7'], src: 'Stahl 2013, chap. 7 (fig. 7-39 à 7-42) et chap. 11 (fig. 11-4, 11-5)' },

  /* ── Molécules endogènes ── */
  'monoamine': { t: 'Monoamine', k: 'mol', en: 'monoamine', def: 'Neurotransmetteur portant une seule fonction amine reliée à un cycle aromatique par une chaîne de deux carbones : catécholamines (dopamine, noradrénaline, adrénaline), indolamine (sérotonine) et histamine.', more: 'Elles partagent le transporteur vésiculaire VMAT2 et la dégradation par la MAO ; leurs neurones, peu nombreux et groupés dans quelques noyaux du tronc cérébral et de l’hypothalamus, projettent très largement. Presque tous les traitements des troubles de l’humeur agissent sur une ou plusieurs d’entre elles.', see: ['hypothese-monoaminergique', 'vmat2'], src: 'Stahl 2013, chap. 2 (tableaux 2-1, 2-3) et chap. 6 (p. 528)' },
  'serotonine': { t: 'Sérotonine (5-HT)', k: 'mol', en: 'serotonin (5-hydroxytryptamine)', def: 'Indolamine synthétisée à partir du tryptophane (TPH puis DDC) ; dans le cerveau, elle provient des neurones du raphé et agit sur sept familles de récepteurs (5-HT1 à 5-HT7), toutes couplées aux protéines G sauf le 5-HT3.', more: 'L’essentiel de la sérotonine de l’organisme est intestinal (cellules entérochromaffines) et stocké dans les plaquettes ; elle ne franchit pas la barrière hémato-encéphalique. Son action est terminée par le SERT, puis par la MAO.', see: ['tryptophane', 'sert'], src: 'Stahl 2013, chap. 5 (fig. 5-13, 5-14)' },
  'noradrenaline': { t: 'Noradrénaline (NA)', k: 'mol', en: 'norepinephrine (noradrenaline)', def: 'Catécholamine synthétisée à partir de la tyrosine (TH → DDC → DBH), neurotransmetteur du locus coeruleus et des neurones sympathiques post-ganglionnaires ; elle agit sur les récepteurs α1, α2 et β.', more: 'Son action est terminée par le NET, puis par la MAO et la COMT. Selon Stahl, elle participerait à la fois à la baisse de l’affect positif et à la hausse de l’affect négatif, ainsi qu’à l’éveil, à l’attention et à la modulation de la douleur.', see: ['locus-coeruleus', 'net'], src: 'Stahl 2013, chap. 6 (fig. 6-25 à 6-29, 6-32, 6-46)' },
  'dopamine': { t: 'Dopamine (DA)', k: 'mol', en: 'dopamine', def: 'Catécholamine issue de la L-DOPA, neurotransmetteur de cinq voies principales (mésolimbique, mésocorticale, nigrostriée, tubéro-infundibulaire, thalamique) et précurseur de la noradrénaline ; elle agit sur les récepteurs D1 à D5.', more: 'Elle porte motivation, récompense, mouvement et cognition, et freine la sécrétion de prolactine. Selon Stahl, sa dysfonction serait au cœur de la baisse de l’affect positif (anhédonie, perte d’énergie et d’intérêt).', see: ['d2', 'anhedonie'], src: 'Stahl 2013, chap. 4 (fig. 4-11) et chap. 6 (fig. 6-31, 6-46)' },
  'glutamate': { t: 'Glutamate', k: 'mol', en: 'glutamate', def: 'Principal neurotransmetteur excitateur du cerveau, utilisé notamment par les neurones pyramidaux du cortex ; il agit sur des récepteurs ionotropes (AMPA, NMDA, kaïnate) et métabotropes (mGlu).', more: 'Après libération, il est capté par les astrocytes, transformé en glutamine puis restitué au neurone. La kétamine, la lamotrigine et le valproate modulent cette transmission, comme, selon Stahl, certains antipsychotiques par le blocage 5-HT2A.', see: ['nmda', 'ampa'], src: 'Stahl 2013, chap. 2 (p. 98), chap. 3 (tableau 3-3) et chap. 8 (p. 779–795)' },
  'gaba': { t: 'GABA', k: 'mol', en: 'gamma-aminobutyric acid', def: 'Principal neurotransmetteur inhibiteur du cerveau, synthétisé à partir du glutamate par la glutamate décarboxylase ; il agit sur les récepteurs GABA-A (canal chlore) et GABA-B (RCPG).', more: 'Les interneurones GABA relaient de nombreux effets des monoamines : ce sont eux que portent les récepteurs 5-HT2C, 5-HT3 et 5-HT7 qui freinent indirectement dopamine, noradrénaline ou sérotonine. Le valproate augmenterait la transmission GABA.', see: ['gaba-a', 'r5ht2c'], src: 'Stahl 2013, chap. 3 (tableau 3-1), chap. 5 (fig. 5-52, 5-60) et chap. 8 (fig. 8-6)' },
  'tryptophane': { t: 'Tryptophane', k: 'mol', en: 'tryptophan', def: 'Acide aminé essentiel apporté par l’alimentation, précurseur de la sérotonine et de la mélatonine ; il entre dans le cerveau par un transporteur qu’il partage avec d’autres grands acides aminés neutres.', more: 'La déplétion aiguë en tryptophane fait rechuter de façon transitoire des patients en rémission sous antidépresseur sérotoninergique (Delgado 1990), alors qu’elle ne déclenche en général pas de dépression chez le sujet sain : argument pour un rôle de la sérotonine dans l’effet du traitement plus que dans la cause.', see: ['tph', 'hypothese-monoaminergique'], src: 'Stahl 2013, chap. 5 (fig. 5-13) ; Delgado et al. 1990' },
  'tyramine': { t: 'Tyramine', k: 'mol', en: 'tyramine', def: 'Amine trace d’origine alimentaire (fromages affinés, charcuteries et aliments fermentés, bières non pasteurisées, extraits de levure) qui libère la noradrénaline des terminaisons sympathiques ; elle est normalement détruite par la MAO-A intestinale et hépatique.', more: 'Un sujet sain tolère environ 400 mg de tyramine ingérée sans hausse tensionnelle ; sous inhibition irréversible de la MAO-A, une dizaine de milligrammes peut suffire, alors qu’un repas riche en contient rarement plus de 40 mg.', see: ['effet-fromage', 'mao'], src: 'Stahl 2013, chap. 7 (fig. 7-54, 7-55 ; tableau 7-3 ; p. 683) ; RCP Marsilid' },
  'melatonine': { t: 'Mélatonine', k: 'mol', en: 'melatonin', def: 'Hormone synthétisée la nuit par la glande pinéale à partir de la sérotonine ; la lumière, via le noyau suprachiasmatique, en freine la sécrétion.', more: 'Elle agit sur les récepteurs MT1 et MT2 du noyau suprachiasmatique pour synchroniser l’horloge circadienne. Son pic nocturne serait atténué dans la dépression ; la mélatonine elle-même n’a pas d’effet antidépresseur démontré.', see: ['mt', 'noyau-suprachiasmatique'], src: 'Stahl 2013, chap. 7 (fig. 7-40 à 7-42 ; p. 652)' },

  /* ── Pharmacologie et neurobiologie ── */
  'autorecepteur': { t: 'Autorécepteur', k: 'cpt', en: 'autoreceptor', def: 'Récepteur porté par un neurone et sensible à son propre neurotransmetteur, qui exerce un rétrocontrôle négatif : sur le soma et les dendrites, il ralentit la décharge ; sur la terminaison, il freine la libération.', more: 'Exemples : 5-HT1A somatodendritique et 5-HT1B/D terminal pour la sérotonine, α2 pour la noradrénaline, D2 pour la dopamine. Leur stimulation explique que bloquer une recapture n’augmente pas immédiatement la libération ; leur désensibilisation ou leur blocage (antagonistes α2) lève le frein.', vs: ['heterorecepteur'], see: ['desensibilisation', 'decharge'], src: 'Stahl 2013, chap. 1 (fig. 1-8), chap. 5 (fig. 5-25, 5-27) et chap. 6 (fig. 6-28, 6-29)' },
  'heterorecepteur': { t: 'Hétérorécepteur', k: 'cpt', en: 'heteroreceptor', def: 'Récepteur porté par un neurone mais sensible au neurotransmetteur d’un autre système : il permet à un système monoaminergique d’en régler un autre.', more: 'Exemple type : les récepteurs α2 des terminaisons sérotoninergiques, par lesquels la noradrénaline freine la libération de sérotonine ; les antagonistes α2 lèvent ce frein et augmentent la sérotonine sans toucher au SERT.', vs: ['autorecepteur'], see: ['a2'], src: 'Stahl 2013, chap. 6 (fig. 6-30C) et chap. 7 (fig. 7-44B)' },
  'rcpg': { t: 'Récepteur couplé aux protéines G (RCPG)', k: 'cpt', en: 'G-protein-coupled receptor (GPCR)', def: 'Récepteur à sept domaines transmembranaires, dit métabotrope, qui active une protéine G : Gs (hausse de l’AMPc), Gi/o (baisse de l’AMPc, ouverture de canaux potassiques) ou Gq (phospholipase C, IP3, calcium).', more: 'Ses effets sont plus lents mais plus amplifiés que ceux des canaux ionotropes, jusqu’à la régulation de l’expression des gènes. Environ un tiers des psychotropes ciblent un RCPG ; presque tous les récepteurs des monoamines en sont, à l’exception du 5-HT3.', vs: ['recepteur-ionotrope'], see: ['agoniste', 'antagoniste'], src: 'Stahl 2013, chap. 1 (fig. 1-12 à 1-15) et chap. 2 (fig. 2-1, 2-3)' },
  'recepteur-ionotrope': { t: 'Récepteur ionotrope', k: 'cpt', en: 'ionotropic receptor (ligand-gated ion channel)', def: 'Récepteur qui forme lui-même un canal ionique, ouvert par la fixation du ligand : l’effet électrique est immédiat, en quelques millisecondes.', more: 'Pentamères (GABA-A, nicotinique, glycine, 5-HT3) ou tétramères (AMPA, NMDA, kaïnate). Les modulateurs allostériques, comme les benzodiazépines sur le GABA-A, en amplifient ou en réduisent la réponse sans l’activer seuls.', vs: ['rcpg'], see: ['gaba-a', 'nmda'], src: 'Stahl 2013, chap. 3 (fig. 3-1 à 3-3, 3-16 ; tableaux 3-1 à 3-3)' },
  'agoniste': { t: 'Agoniste', k: 'cpt', en: 'agonist', def: 'Ligand qui se fixe sur un récepteur et l’active ; un agoniste complet produit l’effet maximal du système, comme le neurotransmetteur naturel.', more: 'L’agonisme peut être direct (agomélatine sur MT1/MT2, tianeptine sur le récepteur µ) ou indirect, en augmentant le neurotransmetteur endogène : inhibiteurs de recapture, IMAO. L’efficacité intrinsèque, ou degré d’activation, est distincte de l’[[affinite|affinité]].', vs: ['antagoniste', 'agoniste-partiel'], see: ['affinite'], src: 'Stahl 2013, chap. 2 (fig. 2-3, 2-5 ; tableaux 2-4, 2-5)' },
  'antagoniste': { t: 'Antagoniste', k: 'cpt', en: 'antagonist', def: 'Ligand qui occupe le récepteur sans l’activer et empêche l’agoniste d’agir ; un antagoniste « silencieux » n’a aucun effet propre en l’absence d’agoniste.', more: 'La plupart des psychotropes agissant directement sur des RCPG sont des antagonistes, pour des effets recherchés (α2, 5-HT2A, D2) ou indésirables (H1, M1, α1). Un agoniste inverse, lui, réduit même l’activité constitutive du récepteur.', trap: 'Un antagoniste n’est pas l’« inverse » d’un agoniste : il ramène le récepteur à son état de base ; c’est l’agoniste inverse qui produit l’effet opposé.', vs: ['agoniste', 'agoniste-partiel'], src: 'Stahl 2013, chap. 2 (fig. 2-3, 2-6, 2-9, 2-10)' },
  'agoniste-partiel': { t: 'Agoniste partiel', k: 'cpt', en: 'partial agonist', def: 'Ligand qui active le récepteur moins qu’un agoniste complet, même à occupation maximale : il se comporte en agoniste quand le neurotransmetteur manque et en antagoniste quand il abonde, d’où le terme de « stabilisateur ».', more: 'Exemples : aripiprazole et cariprazine sur D2 et 5-HT1A, buspirone et vortioxétine sur 5-HT1A. Une petite différence d’activité intrinsèque change le profil clinique : trop proche de l’antagoniste, effets extrapyramidaux ; trop proche de l’agoniste, activation, voire aggravation psychotique.', vs: ['agoniste', 'antagoniste'], see: ['d2', 'r5ht1a'], src: 'Stahl 2013, chap. 2 (fig. 2-7, 2-8) et chap. 5 (fig. 5-31 à 5-35)' },
  'affinite': { t: 'Affinité (Ki)', k: 'cpt', en: 'affinity; inhibition constant (Ki)', def: 'Force de liaison d’un médicament à sa cible, exprimée par la constante d’inhibition Ki : concentration qui occupe la moitié des sites à l’équilibre ; plus le Ki est petit, plus l’affinité est grande.', more: 'Exemples : paroxétine sur le SERT ≈ 0,1 nM ; mirtazapine sur le H1 ≈ 1 nM, d’où une sédation dès les faibles doses. Les valeurs varient selon les laboratoires, les espèces et les méthodes : ce sont des ordres de grandeur.', trap: 'L’affinité ne dit rien de l’efficacité intrinsèque : un antagoniste peut avoir une affinité très élevée sans jamais activer le récepteur.', see: ['pki', 'occupation'], src: 'Wikipédia (PDSP Ki Database) ; Stahl 2013, chap. 5 (fig. 5-24)' },
  'pki': { t: 'pKi', k: 'cpt', en: 'pKi', def: 'Cologarithme décimal du Ki exprimé en mol/L (pKi = −log Ki) : une échelle où chaque unité correspond à un facteur 10 d’affinité.', more: 'Ki = 1 nM donne pKi = 9 ; 10 nM, 8 ; 1 µM, 6. Elle permet de comparer d’un coup d’œil le profil de liaison d’une molécule sur ses différentes cibles.', see: ['affinite'], src: 'Définition pharmacologique usuelle (IUPHAR)' },
  'occupation': { t: 'Occupation des cibles', k: 'cpt', en: 'target occupancy', def: 'Proportion des sites d’une cible (transporteur, récepteur) liés par le médicament à une concentration donnée, mesurée chez l’homme par tomographie par émission de positons (TEP).', more: 'Aux doses minimales efficaces des ISRS, environ 80 % (76–85 %) des SERT sont occupés (Meyer 2004). La relation dose–occupation est hyperbolique : les premiers milligrammes occupent beaucoup de sites, les augmentations suivantes de moins en moins, argument pour des décroissances proportionnelles à l’arrêt (Horowitz et Taylor 2019).', see: ['affinite', 'syndrome-arret'], src: 'Meyer et al. 2004 ; Horowitz et Taylor 2019 ; Stahl 2013, chap. 7 (p. 640)' },
  'desensibilisation': { t: 'Désensibilisation et régulation négative', k: 'cpt', en: 'desensitization; downregulation', def: 'Adaptation d’un récepteur exposé durablement à son agoniste : la désensibilisation réduit sa réponse (découplage, internalisation), la régulation négative diminue le nombre de récepteurs par baisse de leur synthèse.', more: 'Sous ISRS, la désensibilisation des autorécepteurs 5-HT1A du raphé suivrait le délai d’action ; celle des récepteurs post-synaptiques expliquerait la tolérance aux effets indésirables précoces (nausées, nervosité). Ces changements passent par l’expression des gènes et prennent des jours à des semaines.', see: ['delai-action', 'r5ht1a'], src: 'Stahl 2013, chap. 3 (fig. 3-14, 3-15) et chap. 7 (fig. 7-8, 7-9, 7-15, 7-17)' },
  'decharge': { t: 'Fréquence de décharge', k: 'cpt', en: 'firing rate', def: 'Nombre de potentiels d’action émis par un neurone par unité de temps ; pour un neurone monoaminergique, elle détermine la quantité de neurotransmetteur libérée aux terminaisons.', more: 'Un ISRS commence par ralentir la décharge des neurones du raphé (autorécepteurs 5-HT1A) ; quand ceux-ci se désensibilisent, la décharge se rétablit alors que la recapture reste bloquée, et la libération terminale augmente. Les études électrophysiologiques animales de Blier et de Montigny ont étayé ce schéma.', see: ['autorecepteur', 'delai-action'], src: 'Stahl 2013, chap. 5 (fig. 5-25) et chap. 7 (fig. 7-14 à 7-16)' },
  'demi-vie': { t: 'Demi-vie d’élimination', k: 'pk', en: 'elimination half-life (t½)', def: 'Temps nécessaire pour que la concentration plasmatique d’un médicament diminue de moitié, une fois la distribution achevée ; elle conditionne le rythme des prises, le délai d’équilibre et la durée d’élimination.', more: 'Après environ 5 demi-vies, un médicament est presque entièrement éliminé : c’est la base des fenêtres avant un IMAO. Exemples : venlafaxine ≈ 5 h (O-desméthylvenlafaxine ≈ 11 h), vortioxétine ≈ 66 h, fluoxétine 4–6 j et norfluoxétine jusqu’à 16 j.', trap: 'Demi-vie et durée d’action diffèrent : un IMAO irréversible agit encore 2 à 3 semaines après sa disparition du plasma, le temps que l’enzyme soit resynthétisée.', see: ['etat-equilibre', 'fenetre-therapeutique'], src: 'Stahl 2013, chap. 7 (p. 672, fig. 7-60) ; RCP Brintellix ; RCP belges Efexor-Exel et Prozac' },
  'etat-equilibre': { t: 'État d’équilibre', k: 'pk', en: 'steady state', def: 'Situation où, sous doses répétées, la quantité éliminée entre deux prises égale la quantité administrée : les concentrations oscillent autour d’une moyenne stable, atteinte après environ 4 à 5 demi-vies.', more: 'C’est à l’équilibre qu’un dosage plasmatique s’interprète : une lithiémie se contrôle environ une semaine après un changement de dose. Une molécule à métabolite très lent, comme la cariprazine, n’atteint 90 % de l’équilibre qu’en 3 semaines.', see: ['demi-vie', 'lithiemie'], src: 'Prescriber’s Guide 2021 (lithium) ; RCP Téralithe LP ; RCP Reagila' },
  'index-therapeutique': { t: 'Index thérapeutique', k: 'pk', en: 'therapeutic index', def: 'Rapport entre la dose (ou la concentration) toxique et la dose efficace : plus il est étroit, plus les effets toxiques surviennent près des doses utiles et plus la surveillance doit être étroite.', more: 'Le lithium a un index étroit, d’où la surveillance de la lithiémie ; les tricycliques sont dangereux en cas de surdosage, contrairement aux ISRS, dont l’index est large.', trap: 'Ne pas confondre avec la « fenêtre thérapeutique », qui désigne dans ce cours l’intervalle sans traitement entre deux molécules.', vs: ['fenetre-therapeutique'], see: ['lithiemie', 'intoxication-lithium'], src: 'Prescriber’s Guide 2021 (lithium) ; Stahl 2013, chap. 7 (p. 717) ; HAS 2017' },
  'cyp450': { t: 'Cytochromes P450 (CYP)', k: 'pk', en: 'cytochrome P450 enzymes', def: 'Famille d’enzymes hépatiques et intestinales qui oxydent la plupart des psychotropes ; cinq isoenzymes dominent leur métabolisme : 1A2, 2D6, 2C9, 2C19 et 3A4.', more: 'Elles peuvent être inhibées (hausse des concentrations du substrat) ou induites (baisse) par d’autres médicaments, et sont génétiquement polymorphes : métaboliseurs lents, normaux, rapides ou ultrarapides.', see: ['cyp2d6', 'cyp1a2', 'cyp3a4', 'cyp2c19', 'inhibiteur-enzymatique', 'inducteur-enzymatique'], src: 'Stahl 2013, chap. 2 (fig. 2-15, 2-16)' },
  'cyp2d6': { t: 'CYP2D6', k: 'pk', en: 'CYP2D6', def: 'Isoenzyme très polymorphe (environ 5 à 10 % des Européens sont métaboliseurs lents) qui métabolise tricycliques, venlafaxine, vortioxétine, aripiprazole et rispéridone, et active des promédicaments comme la codéine et le tamoxifène.', more: 'La fluoxétine et la paroxétine en sont de puissants inhibiteurs, la duloxétine un inhibiteur modéré : elles élèvent les concentrations des tricycliques et réduisent l’activation du tamoxifène, association déconseillée.', trap: 'L’inhibition par la fluoxétine persiste environ 5 semaines après l’arrêt, à cause de la norfluoxétine.', see: ['metabolite-actif', 'inhibiteur-enzymatique'], src: 'Stahl 2013, chap. 2 (p. 115, fig. 2-19) ; RCP belges Prozac et Seroxat ; Wikipédia (duloxétine)' },
  'cyp1a2': { t: 'CYP1A2', k: 'pk', en: 'CYP1A2', def: 'Isoenzyme qui métabolise l’agomélatine (≈ 90 %), la duloxétine, l’olanzapine, la clozapine, la caféine et la théophylline.', more: 'La fluvoxamine et la ciprofloxacine l’inhibent fortement : elles sont contre-indiquées avec l’agomélatine et la duloxétine. La fumée de tabac l’induit : arrêter de fumer peut élever nettement les concentrations d’olanzapine ou de clozapine.', trap: 'C’est la fumée, non la nicotine, qui induit le CYP1A2 : les substituts nicotiniques ne maintiennent pas l’induction.', see: ['inducteur-enzymatique'], src: 'Stahl 2013, chap. 2 (fig. 2-17, 2-18) ; RCP Valdoxan, Cymbalta, Zyprexa ; fiche OMéDIT Normandie' },
  'cyp3a4': { t: 'CYP3A4', k: 'pk', en: 'CYP3A4', def: 'Isoenzyme la plus abondante, qui métabolise notamment quétiapine, lurasidone, cariprazine, aripiprazole (avec le 2D6), carbamazépine, eskétamine, de nombreuses benzodiazépines et statines.', more: 'Inhibiteurs puissants : kétoconazole, clarithromycine, ritonavir, jus de pamplemousse ; inducteurs : carbamazépine, phénytoïne, rifampicine, millepertuis. La lurasidone et la cariprazine sont contre-indiquées avec les inhibiteurs puissants et les inducteurs.', see: ['inducteur-enzymatique', 'inhibiteur-enzymatique'], src: 'Stahl 2013, chap. 2 (fig. 2-20, 2-21) ; RCP Latuda, Reagila, Spravato ; avis HAS Xeroquel LP 2016' },
  'cyp2c19': { t: 'CYP2C19', k: 'pk', en: 'CYP2C19', def: 'Isoenzyme polymorphe (activité réduite chez environ 20 % des Asiatiques) qui métabolise surtout l’escitalopram et le citalopram, en partie la sertraline et les tricycliques (déméthylation), ainsi que le clopidogrel et les inhibiteurs de la pompe à protons.', more: 'Chez les métaboliseurs lents, les concentrations d’escitalopram doublent environ, ce qui compte pour le risque d’allongement du QT. La fluvoxamine en est un puissant inhibiteur ; l’oméprazole et la fluoxétine l’inhibent aussi.', see: ['qt'], src: 'Stahl 2013, chap. 2 (p. 115) ; RCP belges Seroplex, Cipramil, Fluvoxamine ; Wikipédia (ISRS)' },
  'inhibiteur-enzymatique': { t: 'Inhibiteur enzymatique', k: 'pk', en: 'enzyme inhibitor', def: 'Médicament qui réduit l’activité d’une enzyme du métabolisme (CYP, UGT) et élève les concentrations de ses substrats ; l’effet est rapide, dès que l’inhibiteur atteint des concentrations suffisantes.', more: 'Exemples : fluvoxamine (1A2, 2C19), fluoxétine et paroxétine (2D6), valproate (glucuronidation de la lamotrigine, dont la demi-vie double environ). L’inhibition peut aussi réduire l’effet d’un promédicament (tamoxifène, clopidogrel).', vs: ['inducteur-enzymatique'], see: ['cyp450', 'glucuronidation'], src: 'Stahl 2013, chap. 2 (fig. 2-17, 2-19) ; RCP Lamictal ; RCP belge Fluvoxamine' },
  'inducteur-enzymatique': { t: 'Inducteur enzymatique', k: 'pk', en: 'enzyme inducer', def: 'Médicament ou substance qui augmente la synthèse d’enzymes du métabolisme et abaisse les concentrations de leurs substrats ; l’effet s’installe et disparaît en une à plusieurs semaines.', more: 'La carbamazépine induit le CYP3A4 et son propre métabolisme (auto-induction : demi-vie ≈ 36 h après une prise unique, 16–24 h en traitement chronique) ; elle réduit fortement les concentrations de quétiapine, d’aripiprazole, de lamotrigine et des contraceptifs estroprogestatifs. Autres inducteurs : phénytoïne, rifampicine, millepertuis, tabac (1A2).', trap: 'À l’arrêt d’un inducteur, les concentrations des médicaments associés remontent en quelques semaines : il faut parfois en réduire la dose.', vs: ['inhibiteur-enzymatique'], see: ['cyp3a4'], src: 'Stahl 2013, chap. 2 (fig. 2-21) ; avis HAS Tégrétol 2017 ; RCP belge Tégrétol ; RCP Abilify, Lamictal' },
  'glucuronidation': { t: 'Glucuronoconjugaison', k: 'pk', en: 'glucuronidation', def: 'Réaction de phase II, catalysée par les UDP-glucuronosyltransférases (UGT), qui fixe l’acide glucuronique sur un médicament pour le rendre hydrosoluble et éliminable par le rein ou la bile.', more: 'C’est la voie principale de la lamotrigine, une part importante du métabolisme du valproate (≈ 40 %) et de l’asénapine, et celle du milnacipran, qui échappe ainsi aux CYP. Les estrogènes l’induisent (clairance de la lamotrigine doublée sous contraception estroprogestative), le valproate l’inhibe.', see: ['inhibiteur-enzymatique', 'cyp450'], src: 'RCP Lamictal, Dépakote, Sycrest ; Wikipédia (milnacipran)' },
  'metabolite-actif': { t: 'Métabolite actif', k: 'pk', en: 'active metabolite', def: 'Produit de la biotransformation d’un médicament qui garde une activité pharmacologique, parfois avec un profil ou une demi-vie différents de ceux de la molécule mère.', more: 'Exemples : norfluoxétine (demi-vie jusqu’à 16 jours), O-desméthylvenlafaxine (plus noradrénergique, formée par le CYP2D6), nortriptyline (amitriptyline), désipramine (imipramine), desméthylclomipramine, norquétiapine (inhibitrice du NET), déhydro-aripiprazole.', see: ['cyp2d6', 'demi-vie'], src: 'Stahl 2013, chap. 5 (p. 381) et chap. 7 (fig. 7-30) ; RCP Laroxyl, Anafranil, Tofranil, Abilify' },
  'nbn': { t: 'Neuroscience-based Nomenclature (NbN)', k: 'cpt', en: 'Neuroscience-based Nomenclature', def: 'Nomenclature des psychotropes proposée en 2015 par l’ECNP, le CINP, l’ACNP, l’AsCNP et l’IUPHAR (Zohar et al.), qui nomme chaque molécule par son domaine pharmacologique et son mode d’action plutôt que par une indication (« antidépresseur », « antipsychotique »).', more: 'Elle distingue 11 domaines et 10 modes d’action. Exemples : sertraline « serotonin reuptake inhibitor » ; mirtazapine « serotonin, norepinephrine receptor antagonist » ; vortioxétine « serotonin multimodal » ; lithium « lithium enzyme interactions ».', trap: 'Pour la NbN, l’aripiprazole n’est pas un « antipsychotique » mais un agoniste partiel des récepteurs dopaminergiques et sérotoninergiques, quelle que soit son indication.', see: ['thymoanaleptique'], src: 'Zohar et al. 2015 ; Prescriber’s Guide 2021 (rubriques « Class »)' },
  'hypothese-monoaminergique': { t: 'Hypothèse monoaminergique', k: 'cpt', en: 'monoamine hypothesis of depression', def: 'Hypothèse classique selon laquelle la dépression résulterait d’un déficit en sérotonine, noradrénaline ou dopamine, et la manie d’un excès ; elle s’appuyait sur les dépressions attribuées à la réserpine et sur l’action des IMAO et des tricycliques.', more: 'Elle a guidé la mise au point de tous les antidépresseurs monoaminergiques, mais aucun déficit constant n’a été démontré et elle n’explique pas le délai d’action ; on lui ajoute aujourd’hui l’adaptation des récepteurs, la signalisation et la plasticité des circuits.', trap: 'L’efficacité d’un médicament qui augmente la sérotonine ne prouve pas que la dépression soit due à un manque de sérotonine.', vs: ['hypothese-neurotrophique'], see: ['reserpine', 'delai-action'], src: 'Stahl 2013, chap. 6 (fig. 6-34, 6-35 ; p. 545–549) ; Shorter 1997, chap. 8 (p. 397)' },
  'hypothese-neurotrophique': { t: 'Hypothèse neurotrophique', k: 'cpt', en: 'neurotrophic hypothesis of depression', def: 'Hypothèse selon laquelle la dépression serait liée à une baisse des facteurs neurotrophiques, surtout le BDNF, sous l’effet du stress, avec perte de synapses et atrophie de l’hippocampe et du cortex préfrontal.', more: 'Les antidépresseurs, l’ECT et la kétamine augmenteraient le BDNF et restaureraient la plasticité ; la lenteur de ces changements de l’expression des gènes cadrerait avec le délai d’action (Duman 1997).', vs: ['hypothese-monoaminergique'], see: ['bdnf', 'plasticite-synaptique'], src: 'Stahl 2013, chap. 6 (fig. 6-36 à 6-39) et chap. 7 (fig. 7-10) ; Duman et al. 1997' },
  'delai-action': { t: 'Délai d’action des antidépresseurs', k: 'cpt', en: 'onset of antidepressant action', def: 'Décalage entre l’effet pharmacologique immédiat d’un antidépresseur (blocage d’un transporteur en quelques heures) et l’amélioration clinique franche, habituellement en plusieurs semaines.', more: 'Il s’expliquerait par des adaptations lentes : désensibilisation des autorécepteurs, expression des gènes, plasticité. Une amélioration partielle apparaît souvent dès les deux premières semaines, et son absence prédit la non-réponse ([[amelioration-precoce]]) ; la HAS fixe l’évaluation de l’efficacité entre 4 et 8 semaines.', trap: 'Les effets indésirables précèdent les bénéfices : prévenir le patient et le revoir dès la 1re ou la 2e semaine.', see: ['desensibilisation', 'amelioration-precoce'], src: 'Stahl 2013, chap. 7 (fig. 7-8, 7-9) ; HAS 2017 ; Szegedi et al. 2009' },
  'plasticite-synaptique': { t: 'Plasticité synaptique', k: 'cpt', en: 'synaptic plasticity', def: 'Capacité des synapses à se renforcer, s’affaiblir, se former ou disparaître selon l’activité : potentialisation et dépression à long terme, remodelage des épines dendritiques.', more: 'Elle dépend des récepteurs NMDA et AMPA et de facteurs comme le BDNF. Le stress chronique la réduit dans l’hippocampe et le cortex préfrontal ; la kétamine augmente rapidement la densité des épines par la voie mTOR, ce qui expliquerait son action en quelques heures.', see: ['nmda', 'bdnf'], src: 'Stahl 2013, chap. 1 (p. 69) et chap. 7 (fig. 7-92, 7-93)' },
  'neurogenese': { t: 'Neurogenèse adulte', k: 'cpt', en: 'adult neurogenesis', def: 'Production de nouveaux neurones à l’âge adulte, établie chez les rongeurs dans le gyrus denté de l’hippocampe, où le stress la réduit et les antidépresseurs la stimulent.', more: 'Chez la souris, certains effets comportementaux des antidépresseurs disparaissent quand on la supprime (Santarelli 2003). Chez l’homme, son ampleur est débattue : deux études post-mortem de 2018 aboutissent à des conclusions opposées.', see: ['hippocampe', 'bdnf'], src: 'Stahl 2013, chap. 6 (p. 552) ; Santarelli et al. 2003 ; Sorrells et al. 2018 ; Boldrini et al. 2018' },
  'kindling': { t: 'Embrasement (kindling)', k: 'cpt', en: 'kindling', def: 'Phénomène décrit chez l’animal : des stimulations électriques répétées, d’abord sans effet, finissent par déclencher des crises, puis des crises spontanées ; par analogie, chaque épisode thymique faciliterait le suivant.', more: 'Cette hypothèse (Post) rend compte de l’accélération possible des épisodes, de plus en plus indépendants des facteurs déclenchants, et a motivé l’essai des anticonvulsivants dans le trouble bipolaire, qui ne se sont pas tous révélés thymorégulateurs.', see: ['canaux-na', 'cycles-rapides'], src: 'Stahl 2013, chap. 8 (p. 778) ; Post 1992' },
  'effet-fromage': { t: 'Effet fromage', k: 'cli', en: 'cheese reaction (tyramine pressor response)', def: 'Poussée hypertensive provoquée par la tyramine alimentaire chez un patient sous IMAO : la tyramine, non détruite par la MAO-A intestinale, libère de la noradrénaline qui n’est plus dégradée.', more: 'Céphalée occipitale, palpitations, raideur de nuque, nausées, sueurs, mydriase ; on parle de crise hypertensive au-delà de 120 mmHg de diastolique. Décrit au début des années 1960 (Blackwell, Lancet 1963) ; sous iproniazide, le RCP impose l’éviction des aliments riches en tyramine et l’arrêt immédiat en cas de céphalées ou de palpitations.', trap: 'Seuls les fromages affinés posent problème, pas tous les fromages ; et sous moclobémide, le RCP français ne prévoit pas de régime strict.', see: ['tyramine', 'imao-reversible'], src: 'Stahl 2013, chap. 7 (tableau 7-2, fig. 7-54, 7-55) ; RCP Marsilid, Moclamine ; Healy 1997' },
  'imao-reversible': { t: 'IMAO-A réversible (RIMA)', k: 'cpt', en: 'reversible inhibitor of MAO-A (RIMA)', def: 'Inhibiteur sélectif et réversible de la MAO-A, dont la tyramine et la noradrénaline en excès peuvent déplacer l’inhibiteur : l’enzyme redevient disponible et le risque d’effet fromage est très réduit.', more: 'Seul représentant en France : le {{moclobemide|moclobémide}}, pris après les repas ; l’inhibition dure quelques heures et l’activité est restaurée en 24 h environ, d’où des relais plus courts qu’avec l’iproniazide, irréversible et non sélectif.', trap: 'Réversible ne veut pas dire sans interaction : l’association aux sérotoninergiques (ISRS, IRSNa, tramadol, triptans) reste contre-indiquée ou déconseillée.', vs: ['mao'], see: ['effet-fromage', 'fenetre-therapeutique'], src: 'Stahl 2013, chap. 7 (fig. 7-57) ; RCP Moclamine ; Wikipédia (moclobémide)' },

  /* ── Clinique ── */
  'edc': { t: 'Épisode dépressif caractérisé (EDC)', k: 'cli', en: 'major depressive episode', def: 'Au moins cinq symptômes sur neuf pendant au moins deux semaines, dont l’humeur dépressive ou la perte d’intérêt ou de plaisir, avec souffrance ou altération du fonctionnement (DSM-5) ; c’est la traduction française officielle de « major depressive episode ».', more: 'L’intensité (léger, modéré, sévère) guide le traitement : la HAS ne recommande pas d’antidépresseur pour un EDC léger. Avant tout traitement, rechercher des antécédents d’hypomanie ou de manie : l’épisode peut appartenir à un trouble bipolaire.', see: ['depression-bipolaire', 'madrs'], src: 'DSM-5 ; HAS 2017 ; Stahl 2013, chap. 6 (fig. 6-44)' },
  'reponse': { t: 'Réponse', k: 'cli', en: 'response', def: 'Diminution d’au moins 50 % du score de sévérité (MADRS, HAM-D) par rapport à l’état initial.', more: 'Un répondeur va mieux mais n’est pas guéri : les symptômes résiduels (insomnie, fatigue, douleurs, troubles de la concentration, perte d’intérêt) augmentent le risque de rechute. L’objectif est la [[remission|rémission]].', vs: ['remission'], src: 'Stahl 2013, chap. 7 (fig. 7-1, 7-5)' },
  'remission': { t: 'Rémission', k: 'cli', en: 'remission', def: 'Disparition de l’essentiel des symptômes, opérationnalisée par un score sous un seuil (par exemple MADRS ≤ 10 ou ≤ 12 selon les études) ; maintenue plus de six mois, on parle de guérison de l’épisode.', more: 'Dans l’essai STAR*D, environ un tiers des patients remettent sous le premier antidépresseur, et deux tiers après quatre étapes de traitement. La rémission complète protège mieux de la rechute que la simple réponse.', vs: ['reponse'], see: ['rechute'], src: 'Stahl 2013, chap. 7 (fig. 7-2, 7-4, 7-6)' },
  'rechute': { t: 'Rechute', k: 'cli', en: 'relapse', def: 'Réapparition des symptômes au cours du même épisode : avant la rémission complète ou dans les premiers mois qui la suivent.', more: 'Le risque est maximal si l’antidépresseur est arrêté trop tôt : la HAS recommande de le poursuivre 6 mois à 1 an après la rémission (au moins 1 an chez le sujet âgé), puis de l’arrêter progressivement.', vs: ['recidive', 'syndrome-arret'], src: 'Stahl 2013, chap. 7 (fig. 7-3) ; HAS 2017' },
  'recidive': { t: 'Récidive', k: 'cli', en: 'recurrence', def: 'Survenue d’un nouvel épisode après la guérison du précédent, c’est-à-dire après une rémission prolongée.', more: 'Le risque augmente avec le nombre d’épisodes antérieurs ; il justifie un traitement de maintien prolongé dans les formes récurrentes et, dans le trouble bipolaire, une prévention par thymorégulateur.', vs: ['rechute'], src: 'Stahl 2013, chap. 7 (fig. 7-3)' },
  'depression-resistante': { t: 'Dépression résistante', k: 'cli', en: 'treatment-resistant depression', def: 'Échec d’au moins deux antidépresseurs successifs, pris à dose efficace et pendant une durée suffisante (4 à 6 semaines à la dose cible), au cours du même épisode (consensus français AFPBN–FondaMental).', more: 'Après un échec : optimiser la dose ; en cas de réponse partielle, associer un antagoniste α2 ; en cas de non-réponse, changer de classe. Potentialisation de 1re intention : lithium (0,5–0,8 mmol/L) ou quétiapine (50–150 mg) ; ECT, puis rTMS ou eskétamine complètent l’arsenal.', trap: 'Éliminer d’abord une pseudo-résistance : observance, dose ou durée insuffisantes, trouble bipolaire méconnu, comorbidité addictive ou somatique (thyroïde).', see: ['potentialisation', 'association'], src: 'Bennabi et al. 2019 ; avis HAS Spravato 2024' },
  'amelioration-precoce': { t: 'Amélioration précoce', k: 'cli', en: 'early improvement', def: 'Baisse d’au moins 20 % du score de dépression après deux semaines de traitement.', more: 'Dans 41 essais (6 562 patients), elle était présente chez au moins 81 % des futurs répondeurs stables et 87 % des futurs remetteurs : son absence a une valeur prédictive négative élevée (82–100 %), mais sa présence ne garantit pas la réponse (valeur prédictive positive 19–60 %).', trap: 'L’absence d’amélioration à 2 semaines invite à réévaluer (dose, observance, diagnostic), pas à conclure seule à l’échec.', see: ['delai-action', 'reponse'], src: 'Szegedi et al. 2009' },
  'potentialisation': { t: 'Potentialisation', k: 'cli', en: 'augmentation', def: 'Ajout à un antidépresseur d’un médicament qui n’est pas lui-même antidépresseur, pour obtenir la réponse ou la rémission.', more: 'En France, 1re intention : lithium (lithiémie 0,5–0,8 mmol/L) ou quétiapine (50–150 mg) ; 2e intention : aripiprazole (2,5–10 mg), hormone thyroïdienne T3 (25–50 µg) ou lamotrigine. La quétiapine LP a l’AMM en traitement adjuvant de l’EDC, mais la HAS a jugé son SMR insuffisant dans cette indication.', vs: ['association'], see: ['depression-resistante'], src: 'Bennabi et al. 2019 ; avis HAS Xeroquel LP 2016' },
  'association': { t: 'Association d’antidépresseurs', k: 'cli', en: 'antidepressant combination', def: 'Prescription simultanée de deux antidépresseurs aux mécanismes complémentaires, typiquement un inhibiteur de recapture et un antagoniste α2.', more: 'En cas de réponse partielle, le consensus français propose d’ajouter la mirtazapine (15–30 mg) ou la miansérine (30–60 mg), l’agomélatine en 2e ligne ; Stahl surnomme « California rocket fuel » l’association IRSNa et mirtazapine.', trap: 'Jamais d’IMAO avec un ISRS, un IRSNa ou la clomipramine : risque de syndrome sérotoninergique grave.', vs: ['potentialisation'], see: ['a2', 'syndrome-serotoninergique'], src: 'Bennabi et al. 2019 ; Stahl 2013, chap. 7 (fig. 7-87 ; p. 698)' },
  'switch-croise': { t: 'Switch croisé', k: 'cli', en: 'cross-taper switch', def: 'Changement d’antidépresseur où l’on diminue progressivement le premier pendant qu’on introduit le second, sans interruption de traitement.', more: 'C’est la modalité recommandée en France pour changer d’antidépresseur, sauf avec un IMAO, où le relais doit être séquentiel avec une [[fenetre-therapeutique|fenêtre thérapeutique]]. Pendant le chevauchement, surveiller les signes sérotoninergiques et les interactions (inhibition du CYP2D6 par la fluoxétine ou la paroxétine, qui élève les tricycliques).', see: ['fenetre-therapeutique', 'syndrome-serotoninergique'], src: 'Bennabi et al. 2019 ; Stahl 2013, chap. 2 (fig. 2-19) et chap. 7 (fig. 7-60, 7-61)' },
  'fenetre-therapeutique': { t: 'Fenêtre thérapeutique', k: 'cli', en: 'washout period', def: 'Intervalle sans traitement imposé entre l’arrêt d’un médicament et l’introduction d’un autre, pour éviter une interaction dangereuse ; indispensable avant et après un IMAO.', more: 'Avant un IMAO, attendre environ 5 demi-vies du sérotoninergique arrêté, soit au moins une semaine pour la plupart et 5 semaines pour la fluoxétine ; après l’iproniazide, au moins 2 semaines avant un ISRS, un IRSNa ou un tricyclique ; après le moclobémide, réversible, un délai de l’ordre de 24 h (RCP).', trap: 'En anglais, « therapeutic window » désigne au contraire la zone de concentrations efficaces et bien tolérées.', vs: ['index-therapeutique', 'switch-croise'], see: ['demi-vie'], src: 'RCP Marsilid, Moclamine, Laroxyl ; Stahl 2013, chap. 7 (fig. 7-60, 7-61)' },
  'syndrome-arret': { t: 'Syndrome d’arrêt des antidépresseurs', k: 'cli', en: 'antidepressant discontinuation syndrome', def: 'Symptômes apparaissant dans les jours qui suivent l’arrêt ou la baisse d’un antidépresseur : vertiges, sensations de décharges électriques, paresthésies, troubles du sommeil et rêves intenses, nausées, syndrome pseudo-grippal, irritabilité, anxiété.', more: 'Plus fréquent avec les molécules de demi-vie courte (paroxétine, venlafaxine) : après arrêt brutal de la duloxétine, environ 45 % des patients en signalent, contre 23 % sous placebo. D’où une décroissance progressive sur plusieurs semaines ou mois, éventuellement par paliers proportionnels.', trap: 'À ne pas confondre avec une rechute : début en quelques jours, symptômes somatiques nouveaux, disparition rapide à la réintroduction.', vs: ['rechute'], see: ['demi-vie', 'occupation'], src: 'RCP Cymbalta ; Stahl 2013, chap. 7 (p. 606, 610, 632) ; HAS 2017 ; Horowitz et Taylor 2019' },
  'syndrome-serotoninergique': { t: 'Syndrome sérotoninergique', k: 'cli', en: 'serotonin syndrome (serotonin toxicity)', def: 'Toxicité par excès de stimulation des récepteurs de la sérotonine, associant signes neuromusculaires (clonus, hyperréflexie, tremblement, hypertonie), végétatifs (sueurs, tachycardie, hyperthermie, mydriase, diarrhée) et psychiques (agitation, confusion).', more: 'Il survient surtout lors d’une association (IMAO et inhibiteur de recapture : forme la plus grave ; tramadol, triptans, lithium, linézolide, millepertuis, dextrométhorphane, fentanyl, méthadone), d’une augmentation de dose ou d’un surdosage. Le diagnostic repose sur les [[hunter|critères de Hunter]] ; traitement : arrêt des sérotoninergiques, benzodiazépines, refroidissement, réanimation dans les formes hyperthermiques.', trap: 'À distinguer du syndrome malin des neuroleptiques : installation plus lente, rigidité « en tuyau de plomb » et bradykinésie, sans clonus ni hyperréflexie.', see: ['hunter', 'fenetre-therapeutique'], src: 'Stahl 2013, chap. 7 (fig. 7-59 ; tableaux 7-6 à 7-8) ; Dunkley et al. 2003 ; fiche OMéDIT Normandie' },
  'hunter': { t: 'Critères de Hunter', k: 'cli', en: 'Hunter serotonin toxicity criteria', def: 'Règles diagnostiques du syndrome sérotoninergique chez un patient exposé à un sérotoninergique : clonus spontané ; ou clonus inductible ou oculaire avec agitation ou sueurs ; ou tremblement avec hyperréflexie ; ou hypertonie avec température > 38 °C et clonus oculaire ou inductible.', more: 'Établis sur plus de 2 000 intoxications par sérotoninergiques, ils ont une sensibilité de 84 % et une spécificité de 97 % (Dunkley 2003), meilleures que celles des critères de Sternbach. Hypertonie et hyperthermie signent les formes menaçantes.', trap: 'Le clonus est le signe pivot : il faut le rechercher activement, aux membres inférieurs et aux yeux.', see: ['syndrome-serotoninergique'], src: 'Dunkley et al. 2003 ; Stahl 2013, chap. 7 (tableau 7-7 ; p. 695)' },
  'virage-maniaque': { t: 'Virage maniaque', k: 'cli', en: 'antidepressant-induced switch', def: 'Passage d’un épisode dépressif à un état hypomaniaque, maniaque ou mixte sous antidépresseur.', more: 'Il révèle le plus souvent un trouble bipolaire méconnu ; le risque paraît plus élevé avec les tricycliques et les IRSNa qu’avec les ISRS. Selon le DSM-5, un épisode maniaque complet qui persiste au-delà de l’effet physiologique du traitement suffit au diagnostic de trouble bipolaire de type I.', trap: 'Agitation, insomnie et irritabilité sous antidépresseur ne relèvent pas toujours de l’akathisie ou de l’anxiété : rechercher des signes d’hypomanie et des antécédents familiaux.', see: ['hypomanie', 'depression-bipolaire'], src: 'Stahl 2013, chap. 6 (p. 522) et chap. 8 (p. 798–799) ; Pacchiarotti et al. 2013 (ISBD) ; DSM-5' },
  'etat-mixte': { t: 'État mixte', k: 'cli', en: 'mixed state (mixed features)', def: 'Coexistence, au cours d’un même épisode, de symptômes dépressifs et maniaques ; le DSM-5 parle de caractéristiques mixtes quand au moins trois symptômes du pôle opposé accompagnent l’épisode dominant.', more: 'Ces états, souvent marqués par agitation, irritabilité, accélération de la pensée et insomnie, comportent un risque suicidaire élevé. Les antidépresseurs y sont à proscrire ; le lithium y serait moins efficace que dans la manie euphorique.', see: ['manie', 'suicidalite'], src: 'DSM-5 ; Vidal (recommandations trouble bipolaire, 2019) ; Yatham et al. 2018 (CANMAT/ISBD) ; Prescriber’s Guide 2021 (lithium)' },
  'cycles-rapides': { t: 'Cycles rapides', k: 'cli', en: 'rapid cycling', def: 'Survenue d’au moins quatre épisodes thymiques (manie, hypomanie ou dépression) en douze mois, séparés par une rémission ou un virage de polarité (spécification du DSM-5).', more: 'Plus fréquents chez la femme, ils sont favorisés par l’hypothyroïdie et les antidépresseurs ; ils répondent moins bien au lithium en monothérapie et nécessitent souvent des associations.', see: ['hypothyroidie', 'virage-maniaque'], src: 'DSM-5 ; Stahl 2013, chap. 8 (p. 798, 806) ; Prescriber’s Guide 2021 (lithium)' },
  'polarite-predominante': { t: 'Polarité prédominante', k: 'cli', en: 'predominant polarity', def: 'Dans un trouble bipolaire, au moins deux tiers des épisodes de la vie appartiennent au même pôle, dépressif ou maniaque (critère de Colom, 2006) ; environ la moitié des patients en ont une.', more: 'Elle oriente le traitement de fond : la lamotrigine a l’AMM pour prévenir les épisodes dépressifs dans le trouble bipolaire I à prédominance dépressive ; les molécules antimaniaques (lithium, antipsychotiques) conviennent mieux à une polarité maniaque. L’indice de polarité (Popovic 2012) quantifie ce profil.', see: ['depression-bipolaire', 'manie'], src: 'Colom et al. 2006 ; Popovic et al. 2012 ; RCP Lamictal' },
  'manie': { t: 'Épisode maniaque', k: 'cli', en: 'manic episode', def: 'Humeur élevée, expansive ou irritable avec augmentation de l’énergie, pendant au moins une semaine (ou toute durée si hospitalisation), avec au moins trois symptômes (quatre si l’humeur est seulement irritable) : grandeur, baisse du besoin de sommeil, logorrhée, fuite des idées, distractibilité, hyperactivité, conduites à risque (DSM-5).', more: 'Altération marquée du fonctionnement, hospitalisation ou caractéristiques psychotiques la distinguent de l’hypomanie. Traitement : arrêter l’antidépresseur ; lithium, valproate ou antipsychotique (aripiprazole, quétiapine, rispéridone, olanzapine, asénapine), seuls ou associés.', vs: ['hypomanie'], see: ['etat-mixte'], src: 'DSM-5 ; Stahl 2013, chap. 6 (fig. 6-47) ; Yatham et al. 2018 ; Vidal 2019' },
  'hypomanie': { t: 'Épisode hypomaniaque', k: 'cli', en: 'hypomanic episode', def: 'Mêmes symptômes que la manie, pendant au moins quatre jours consécutifs, avec un changement net perçu par l’entourage, mais sans altération marquée du fonctionnement, sans hospitalisation ni symptôme psychotique (DSM-5).', more: 'Au moins un épisode hypomaniaque et au moins un EDC, sans épisode maniaque, définissent le trouble bipolaire de type II. Les patients rapportent peu ces épisodes, souvent vécus comme agréables : interroger un proche.', trap: 'Une hypomanie avec symptômes psychotiques est, par définition, une manie.', vs: ['manie'], see: ['depression-bipolaire'], src: 'DSM-5 ; Stahl 2013, chap. 6 (tableau 6-2)' },
  'depression-bipolaire': { t: 'Dépression bipolaire', k: 'cli', en: 'bipolar depression', def: 'Épisode dépressif caractérisé survenant dans un trouble bipolaire ; les symptômes actuels ne permettent pas de le distinguer avec certitude d’une dépression unipolaire.', more: 'Évoquent la bipolarité : début précoce, hypersomnie, hyperphagie, ralentissement, labilité, symptômes psychotiques, antécédents familiaux, échecs ou virages sous antidépresseur. En France, la quétiapine est le seul médicament à avoir l’AMM dans cette indication ; lithium et lamotrigine (prévention) font partie des options.', trap: 'Un antidépresseur en monothérapie est contre-indiqué dans la dépression bipolaire.', vs: ['edc'], see: ['virage-maniaque', 'polarite-predominante'], src: 'Stahl 2013, chap. 6 (fig. 6-21, 6-22 ; tableau 6-2) ; Vidal 2019 ; Yatham et al. 2018' },
  'melancolie': { t: 'Caractéristiques mélancoliques', k: 'cli', en: 'melancholic features', def: 'Forme d’EDC marquée par une perte complète du plaisir ou de la réactivité aux événements agréables, avec au moins trois signes parmi : qualité particulière de l’humeur, aggravation matinale, réveil précoce, ralentissement ou agitation psychomotrice marqués, anorexie ou perte de poids, culpabilité excessive (DSM-5).', more: 'Forme sévère, à haut risque suicidaire, où l’ECT est particulièrement efficace et peut être proposée en première intention quand le pronostic vital est engagé.', see: ['ect', 'anhedonie'], src: 'DSM-5 ; ANAES 1997 (ECT), d’après Vidal' },
  'anhedonie': { t: 'Anhédonie', k: 'cli', en: 'anhedonia', def: 'Diminution ou perte de la capacité à éprouver du plaisir et de l’intérêt ; symptôme cardinal de l’EDC, avec l’humeur dépressive.', more: 'On distingue l’anhédonie d’anticipation (motivation) et l’anhédonie de consommation (plaisir éprouvé). Stahl la rattache à la baisse de l’affect positif et à une dysfonction dopaminergique du circuit de la récompense, plus qu’à la sérotonine.', vs: ['emoussement'], see: ['noyau-accumbens', 'dopamine'], src: 'Stahl 2013, chap. 6 (fig. 6-44, 6-46) ; DSM-5' },
  'emoussement': { t: 'Émoussement affectif sous ISRS', k: 'cli', en: 'SSRI-induced emotional blunting', def: 'Atténuation de l’éventail des émotions, positives comme négatives, rapportée par des patients sous ISRS ou IRSNa : ne plus pouvoir pleurer, indifférence, moindre plaisir.', more: 'Il peut être confondu avec une dépression résiduelle ou une anhédonie et participe aux arrêts de traitement. Conduite à tenir : en parler, réduire la dose ou changer de mécanisme.', vs: ['anhedonie'], see: ['dysfonction-sexuelle'], src: 'Price et al. 2009 ; Stahl 2013, chap. 6 (fig. 6-46)' },
  'akathisie': { t: 'Akathisie', k: 'cli', en: 'akathisia', def: 'Impatience motrice avec sensation interne d’agitation et incapacité à rester assis ou immobile ; effet indésirable surtout des antagonistes et des agonistes partiels D2 (aripiprazole, cariprazine), parfois des ISRS en début de traitement.', more: 'Pénible et mal reconnue, elle s’accompagne d’une agitation et d’un risque suicidaire accrus. Conduite à tenir : réduire la dose ou titrer plus lentement ; un bêtabloquant (propranolol) ou une benzodiazépine peuvent soulager.', trap: 'Ne pas la prendre pour une aggravation de l’anxiété ou de l’agitation psychotique : augmenter la dose l’aggraverait.', see: ['d2', 'suicidalite', 'beta'], src: 'Stahl 2013, chap. 5 (p. 346) ; RCP Reagila, Abilify ; RCP belges Seroxat et Fluvoxamine' },
  'dysfonction-sexuelle': { t: 'Dysfonction sexuelle sous antidépresseur', k: 'cli', en: 'antidepressant-induced sexual dysfunction', def: 'Baisse de la libido, troubles de l’excitation ou de l’érection, retard ou absence d’orgasme et d’éjaculation, très fréquents sous ISRS et IRSNa.', more: 'Mécanisme proposé : stimulation des récepteurs 5-HT2A et 5-HT2C et baisse de la dopamine ; la paroxétine inhibe aussi la NO synthase. Le bupropion, la mirtazapine, l’agomélatine et la vortioxétine en donnent moins. Depuis 2019 (PRAC), les RCP des ISRS et IRSNa mentionnent des dysfonctions sexuelles persistant après l’arrêt.', trap: 'Elle est rarement signalée spontanément : la rechercher avant le traitement et à chaque consultation.', see: ['r5ht2a', 'emoussement'], src: 'Stahl 2013, chap. 7 (fig. 7-20, 7-49 ; p. 641) ; Prescriber’s Guide 2021 (mirtazapine, agomélatine, vortioxétine) ; EMA PRAC 2019' },
  'hyponatremie': { t: 'Hyponatrémie (SIADH)', k: 'cli', en: 'hyponatraemia (SIADH)', def: 'Natrémie < 135 mmol/L, le plus souvent par sécrétion inappropriée d’hormone antidiurétique (SIADH) sous ISRS, IRSNa, mirtazapine, vortioxétine, carbamazépine ou oxcarbazépine.', more: 'Elle survient souvent dans les premières semaines, surtout chez le sujet âgé, sous diurétique ou en cas de cirrhose. Sous oxcarbazépine, une natrémie < 125 mmol/L concerne jusqu’à 2,7 % des patients : natrémie avant le traitement, vers 2 semaines puis chaque mois pendant 3 mois en cas de facteur de risque.', trap: 'Confusion, chutes, nausées ou apathie d’un patient âgé sous ISRS évoquent d’abord une hyponatrémie, pas une aggravation dépressive.', see: ['diabete-insipide'], src: 'Fiche OMéDIT Normandie ; RCP Brintellix, Cymbalta ; RCP belges Trileptal et Sertraline ; avis HAS Tégrétol 2017' },
  'qt': { t: 'Allongement du QTc', k: 'cli', en: 'QTc prolongation; torsades de pointes', def: 'Allongement de l’intervalle QT corrigé pour la fréquence cardiaque, qui expose aux torsades de pointes, tachycardie ventriculaire polymorphe pouvant dégénérer en fibrillation.', more: 'Le citalopram et l’escitalopram l’allongent de façon dose-dépendante : doses maximales 40 et 20 mg/j (20 et 10 mg/j après 65 ans) et contre-indication avec les autres médicaments allongeant le QT (ANSM 2011). Facteurs de risque : hypokaliémie, hypomagnésémie, bradycardie, cardiopathie, QT long congénital, associations (tricycliques, antipsychotiques, méthadone, certains antibiotiques).', trap: 'Corriger kaliémie et magnésémie avant de traiter, et additionner les risques plutôt que de juger chaque médicament isolément.', see: ['cyp2c19'], src: 'ANSM 2011 et 2022 (citalopram, escitalopram) ; RCP Seropram, Seroplex' },
  'effet-anticholinergique': { t: 'Effet anticholinergique', k: 'cli', en: 'anticholinergic (antimuscarinic) effects', def: 'Effets du blocage des récepteurs muscariniques : bouche sèche, constipation, rétention urinaire, mydriase et vision floue, tachycardie, diminution de la sudation, troubles de la mémoire et confusion.', more: 'Très marqués avec les tricycliques (amitriptyline surtout), présents avec la paroxétine, l’olanzapine et la quétiapine. Chez le sujet âgé, la charge anticholinergique cumulée de plusieurs médicaments favorise confusion et chutes.', trap: 'Le risque de glaucome par fermeture de l’angle et les troubles urétroprostatiques avec risque de rétention sont des contre-indications des imipraminiques (RCP).', see: ['m1'], src: 'Stahl 2013, chap. 5 (p. 289) et chap. 7 (fig. 7-68) ; RCP Anafranil, Tofranil, Ludiomil' },
  'hypotension-orthostatique': { t: 'Hypotension orthostatique', k: 'cli', en: 'orthostatic hypotension', def: 'Baisse de la pression artérielle systolique d’au moins 20 mmHg ou diastolique d’au moins 10 mmHg dans les 3 minutes suivant le passage en position debout.', more: 'Sous psychotropes, elle tient surtout au blocage des récepteurs α1 : tricycliques, miansérine, trazodone, quétiapine, rispéridone ; les IMAO la provoquent aussi. Elle expose aux chutes et aux fractures du sujet âgé : titrer lentement, mesurer la pression couché puis debout.', see: ['a1'], src: 'Freeman et al. 2011 (définition consensuelle) ; Stahl 2013, chap. 5 (p. 355) et chap. 7 (fig. 7-69) ; Prescriber’s Guide 2021 (phénelzine)' },
  'htap': { t: 'HTAP persistante du nouveau-né', k: 'cli', en: 'persistent pulmonary hypertension of the newborn (PPHN)', def: 'Défaut d’adaptation de la circulation pulmonaire à la naissance, avec hypoxémie sévère par persistance d’une pression artérielle pulmonaire élevée.', more: 'L’exposition aux ISRS ou aux IRSNa en fin de grossesse (après 20 semaines) est associée à environ 5 cas pour 1 000 grossesses, contre 1 à 2 pour 1 000 dans la population générale : risque relatif accru, risque absolu faible.', trap: 'Ce risque ne justifie pas à lui seul d’arrêter un antidépresseur nécessaire : la dépression non traitée a ses propres risques ; se référer au CRAT.', see: ['crat'], src: 'RCP des ISRS ; MHRA 2014 ; Chambers et al. 2006' },
  'ebstein': { t: 'Maladie d’Ebstein', k: 'cli', en: 'Ebstein anomaly', def: 'Cardiopathie congénitale rare : insertion basse, dans le ventricule droit, des valves septale et postérieure de la tricuspide, avec « atrialisation » d’une partie du ventricule droit.', more: 'Classiquement associée à l’exposition au lithium au premier trimestre, son risque a été surestimé : dans une cohorte de 1,3 million de grossesses, les malformations cardiaques touchaient 2,41 % des enfants exposés au lithium contre 1,15 % des non-exposés (RR ajusté 1,65), avec un effet dose (RR 3,22 au-delà de 900 mg/j) (Patorno 2017). Échocardiographie fœtale en cas d’exposition au premier trimestre.', see: ['crat', 'lithiemie'], src: 'Patorno et al. 2017 ; RCP Téralithe ; Prescriber’s Guide 2021 (lithium)' },
  'tnd': { t: 'Troubles du neurodéveloppement après exposition au valproate', k: 'cli', en: 'neurodevelopmental disorders after prenatal valproate exposure', def: 'Retards de développement, troubles du spectre de l’autisme, déficits intellectuels et attentionnels chez les enfants exposés in utero au valproate : jusqu’à 30 à 40 % d’entre eux, en plus d’un risque de malformations d’environ 10 %.', more: 'Depuis 2017, le valproate est contre-indiqué pendant la grossesse dans le trouble bipolaire ; chez la femme en âge de procréer, il n’est possible que dans le cadre d’un programme de prévention. Une exposition paternelle dans les 3 mois précédant la conception est associée à un risque accru (HR 1,50), d’où les règles de 2025 chez l’homme.', see: ['attestation-annuelle', 'crat'], src: 'ANSM 2018 (MAJ 2021) ; RCP Dépakote et Dépamide (2025) ; Vidal 18/12/2024' },
  'toxidermie': { t: 'Toxidermies graves (Stevens-Johnson, Lyell)', k: 'cli', en: 'Stevens-Johnson syndrome; toxic epidermal necrolysis', def: 'Nécrolyse épidermique d’origine médicamenteuse avec décollement cutané et atteinte muqueuse : syndrome de Stevens-Johnson si le décollement touche moins de 10 % de la surface corporelle, syndrome de Lyell (nécrolyse épidermique toxique) au-delà de 30 %, forme de chevauchement entre les deux.', more: 'Surtout dans les 8 premières semaines de la lamotrigine (environ 1/1 000 dans le trouble bipolaire), favorisée par une dose initiale élevée ou l’association au valproate ; aussi avec la carbamazépine (allèle HLA-B*15:02) et l’oxcarbazépine. Le DRESS est une autre réaction grave.', trap: 'Arrêter immédiatement devant toute éruption avec atteinte muqueuse, fièvre ou décollement, et ne jamais réintroduire la molécule.', see: ['hla-b1502', 'agranulocytose'], src: 'RCP Lamictal ; avis HAS Tégrétol 2017 ; classification de Bastuji-Garin' },
  'hla-b1502': { t: 'Allèle HLA-B*15:02', k: 'cli', en: 'HLA-B*15:02 allele', def: 'Allèle du système HLA fortement associé aux syndromes de Stevens-Johnson et de Lyell induits par la carbamazépine chez les patients d’origine chinoise Han ou thaïlandaise (Chung 2004).', more: 'La HAS recommande, dans la mesure du possible, de le rechercher avant de traiter un patient de ces origines ; s’il est présent, la carbamazépine ne devrait pas être instaurée. L’association concerne aussi l’oxcarbazépine.', trap: 'Un test négatif ne supprime pas le risque : la surveillance cutanée reste nécessaire chez tous.', see: ['toxidermie'], src: 'Chung et al. 2004 ; avis HAS Tégrétol 2017 ; RCP belge Trileptal' },
  'agranulocytose': { t: 'Agranulocytose', k: 'cli', en: 'agranulocytosis', def: 'Chute profonde des polynucléaires neutrophiles (< 0,5 G/L) exposant à des infections sévères ; effet indésirable rare et idiosyncrasique.', more: 'Psychotropes en cause : carbamazépine (avec aplasie médullaire), miansérine et mirtazapine (surtout après 65 ans), quétiapine, clozapine, rarement les tricycliques. Devant fièvre, angine ou stomatite : NFS en urgence et arrêt du médicament suspect.', see: ['hepatotoxicite'], src: 'RCP Athymil, Norset ; avis HAS Tégrétol 2017 et Xeroquel LP 2016 ; Prescriber’s Guide 2021 (carbamazépine)' },
  'hyperammoniemie': { t: 'Hyperammoniémie sous valproate', k: 'cli', en: 'valproate-induced hyperammonaemia', def: 'Élévation de l’ammoniémie liée au valproate, parfois compliquée d’encéphalopathie (somnolence, vomissements, confusion), possible même avec un bilan hépatique normal.', more: 'Le risque augmente avec le topiramate et chez les patients porteurs d’un déficit du cycle de l’urée, contre-indication du valproate. Devant une léthargie, des vomissements ou une modification inexpliquée de l’état mental, doser l’ammoniémie.', see: ['hepatotoxicite'], src: 'RCP Dépakote ; Prescriber’s Guide 2021 (valproate)' },
  'hepatotoxicite': { t: 'Hépatotoxicité médicamenteuse', k: 'cli', en: 'drug-induced liver injury', def: 'Atteinte hépatique d’origine médicamenteuse, de l’élévation isolée des transaminases à l’hépatite grave.', more: 'Agomélatine : transaminases avant le traitement puis vers 3, 6, 12 et 24 semaines, arrêt au-delà de 3 fois la normale ; valproate : hépatites graves rares, surtout chez l’enfant de moins de 2 ans, contre-indication en cas d’hépatopathie ou de mutation POLG ; tianeptine : hépatites rapportées ; duloxétine : contre-indiquée en cas d’insuffisance hépatique. L’iproniazide a été retiré du marché américain en 1961 pour hépatotoxicité.', see: ['hyperammoniemie'], src: 'RCP Valdoxan, Dépakote, Cymbalta ; Prescriber’s Guide 2021 (valproate) ; avis HAS Stablon 2012 ; notes d’histoire' },
  'diabete-insipide': { t: 'Diabète insipide néphrogénique', k: 'cli', en: 'nephrogenic diabetes insipidus', def: 'Incapacité du rein à concentrer les urines malgré l’hormone antidiurétique, responsable de polyurie et de polydipsie ; effet rénal fréquent du lithium.', more: 'Le lithium s’accumule dans les cellules du tube collecteur et y réduit l’expression de l’aquaporine 2. Tout apport hydrique insuffisant (chaleur, vomissements, sujet âgé) expose alors à la déshydratation, à l’hypernatrémie et à l’intoxication lithiée.', see: ['intoxication-lithium', 'lithiemie'], src: 'Prescriber’s Guide 2021 (lithium) ; RCP Téralithe' },
  'hypothyroidie': { t: 'Hypothyroïdie sous lithium', k: 'cli', en: 'lithium-induced hypothyroidism', def: 'Baisse de la production d’hormones thyroïdiennes, avec ou sans goitre, fréquente sous lithium, qui freine la libération des hormones par la thyroïde.', more: 'TSH avant le traitement puis régulièrement ; une hypothyroïdie se corrige par lévothyroxine sans arrêter le lithium. Elle peut favoriser une dépression résistante ou des cycles rapides.', see: ['cycles-rapides', 'lithiemie', 'hyperparathyroidie'], src: 'RCP Téralithe ; Prescriber’s Guide 2021 (lithium) ; Stahl 2013, chap. 8 (p. 777, 806)' },
  'hyperparathyroidie': { t: 'Hyperparathyroïdie sous lithium', k: 'cli', en: 'lithium-associated hyperparathyroidism', def: 'Hypercalcémie avec parathormone normale ou élevée, liée à un déplacement, par le lithium, du seuil auquel les parathyroïdes détectent le calcium.', more: 'D’où la calcémie au bilan initial et dans la surveillance du lithium. Fatigue, troubles de l’humeur ou cognitifs, polyurie ou lithiase urinaire peuvent la révéler.', see: ['lithiemie'], src: 'RCP Téralithe' },
  'syndrome-metabolique': { t: 'Syndrome métabolique', k: 'cli', en: 'metabolic syndrome', def: 'Association d’obésité abdominale, d’hypertriglycéridémie, d’HDL-cholestérol bas, d’hypertension artérielle et d’hyperglycémie à jeun (au moins trois critères), qui augmente le risque de diabète et de maladie cardiovasculaire.', more: 'Risque élevé avec la clozapine et l’olanzapine, intermédiaire avec la rispéridone et la quétiapine, faible avec l’aripiprazole et la lurasidone ; la mirtazapine, le valproate et le lithium font aussi prendre du poids. Surveiller poids, tour de taille, pression artérielle, glycémie et lipides avant puis pendant le traitement.', see: ['h1', 'r5ht2c'], src: 'Stahl 2013, chap. 5 (fig. 5-41 ; p. 362) ; RCP Zyprexa ; Prescriber’s Guide 2021 (lithium, valproate)' },
  'hyperprolactinemie': { t: 'Hyperprolactinémie', k: 'cli', en: 'hyperprolactinaemia', def: 'Élévation de la prolactine par levée du frein dopaminergique de la voie tubéro-infundibulaire, surtout sous antagonistes D2 ; la sérotonine, via le 5-HT2A, stimule au contraire sa sécrétion.', more: 'Elle donne galactorrhée, troubles des règles, gynécomastie, baisse de la libido et, à long terme, perte osseuse. Fréquente avec la rispéridone, rare avec la quétiapine ; l’aripiprazole, agoniste partiel D2, tend à l’abaisser.', see: ['d2', 'r5ht2a'], src: 'Stahl 2013, chap. 5 (fig. 5-19 à 5-22) ; RCP belge Risperdal' },
  'intoxication-lithium': { t: 'Intoxication au lithium', k: 'cli', en: 'lithium toxicity', def: 'Surdosage aigu ou, plus souvent, accumulation progressive du lithium, révélée d’abord par nausées, diarrhée, tremblement grossier, soif et troubles de l’équilibre, puis par un syndrome cérébelleux, une confusion, des convulsions ou un coma, et des troubles du rythme ou de la conduction.', more: 'Causes fréquentes : déshydratation, régime sans sel, insuffisance rénale, AINS, IEC et sartans, diurétiques thiazidiques. Conduite : arrêt du lithium, lithiémie, ionogramme et créatinine, réhydratation ; l’épuration extrarénale est recommandée en cas de troubles de conscience, de convulsions ou d’arythmie grave, ou de lithiémie > 4 mEq/L avec insuffisance rénale (EXTRIP 2015).', trap: 'Les diurétiques n’éliminent pas le lithium : ils aggravent l’intoxication.', see: ['lithiemie', 'index-therapeutique'], src: 'RCP Téralithe ; Decker et al. 2015 (EXTRIP) ; Osser 2022 ; Finley 2016' },
  'lithiemie': { t: 'Lithiémie', k: 'cli', en: 'serum lithium level', def: 'Concentration plasmatique de lithium, mesurée à l’équilibre pour adapter la dose : avec la forme à libération immédiate, cible minimale efficace 0,5–0,8 mEq/L, le matin, 12 h après la dernière prise.', more: 'Avec Téralithe LP en une prise vers 20 h, la lithiémie du soir (≈ 24 h, avant la prise) doit être de 0,5–0,8 mEq/L et celle du matin (≈ 12 h) de 0,8–1,2 mEq/L. Pour l’entretien, l’ISBD recommande 0,60–0,80 mmol/L, plutôt 0,40–0,60 chez le sujet âgé (Nolen 2019) ; contrôles rapprochés au début, puis tous les 2 mois.', trap: 'Une lithiémie sans heure de prélèvement par rapport à la dernière prise n’est pas interprétable.', see: ['intoxication-lithium', 'etat-equilibre'], src: 'RCP Téralithe 250 (2025) et Téralithe LP 400 (2008) ; Nolen et al. 2019' },
  'madrs': { t: 'Échelle MADRS', k: 'cli', en: 'Montgomery–Åsberg Depression Rating Scale', def: 'Échelle d’hétéro-évaluation de la sévérité de la dépression (Montgomery et Åsberg, 1979) : 10 items cotés de 0 à 6, score total de 0 à 60, conçue pour être sensible au changement sous traitement.', more: 'Critère principal de la plupart des essais récents : réponse = baisse d’au moins 50 % ; rémission = score ≤ 10 ou ≤ 12 selon les études. Dans l’essai TRANSFORM-2, l’eskétamine n’a fait gagner que 3,5 points de plus que le placebo.', see: ['reponse', 'remission'], src: 'Montgomery et Åsberg 1979 ; avis HAS Spravato 2024' },
  'ect': { t: 'Électroconvulsivothérapie (ECT)', k: 'cli', en: 'electroconvulsive therapy', def: 'Déclenchement, sous anesthésie générale brève et curarisation, d’une crise convulsive par stimulation électrique transcrânienne, à raison de 2 à 3 séances par semaine.', more: 'Traitement le plus efficace de l’EDC sévère : en première intention si le pronostic vital est engagé (mélancolie avec risque suicidaire, altération de l’état général), en cas de caractéristiques psychotiques ou si les autres traitements sont impossibles ; en seconde intention dans la dépression résistante, la manie, la catatonie après benzodiazépines. Effets indésirables surtout cognitifs (confusion au réveil, amnésie), le plus souvent transitoires ; un relais médicamenteux prévient la rechute.', see: ['depression-resistante', 'melancolie'], src: 'ANAES 1997 (d’après Vidal) ; Bennabi et al. 2019' },
  'rtms': { t: 'Stimulation magnétique transcrânienne répétitive (rTMS)', k: 'cli', en: 'repetitive transcranial magnetic stimulation', def: 'Stimulation non invasive du cortex par un champ magnétique bref et répété, produit par une bobine posée sur le scalp, sans anesthésie ; dans la dépression, la cible usuelle est le cortex préfrontal dorsolatéral.', more: 'Les séances sont quotidiennes, pendant plusieurs semaines, en ambulatoire ; effets indésirables surtout céphalées et inconfort local, crises convulsives exceptionnelles. Le consensus français la situe à partir de la 4e ligne dans la dépression résistante.', vs: ['ect'], see: ['cortex-prefrontal'], src: 'Stahl 2013, chap. 7 (fig. 7-75) ; Bennabi et al. 2019' },
  'suicidalite': { t: 'Suicidalité sous antidépresseur', k: 'cli', en: 'antidepressant-emergent suicidality', def: 'Augmentation des idées et des comportements suicidaires observée en début de traitement antidépresseur chez l’enfant, l’adolescent et l’adulte de moins de 25 ans, sans augmentation démontrée des suicides aboutis.', more: 'Elle justifie une surveillance rapprochée au début du traitement et à chaque changement de dose, l’information des proches et, si besoin, la délivrance de petites quantités. Le rapport bénéfice/risque reste le plus favorable entre 25 et 64 ans ; le lithium, à l’inverse, réduit le risque suicidaire.', trap: 'Une agitation, une akathisie ou un virage hypomaniaque en début de traitement doivent faire réévaluer ce risque.', see: ['akathisie', 'virage-maniaque'], src: 'Stahl 2013, chap. 7 (fig. 7-7) et chap. 8 (p. 776) ; RCP des antidépresseurs ; Cipriani et al. 2013' },

  /* ── Réglementation ── */
  'amm': { t: 'Autorisation de mise sur le marché (AMM)', k: 'reg', en: 'marketing authorisation', def: 'Autorisation délivrée par l’ANSM ou, en procédure centralisée, par la Commission européenne après avis de l’EMA, qui fixe les indications, posologies, contre-indications et précautions, résumées dans le RCP.', more: 'Une prescription hors AMM reste possible en l’absence d’alternative médicamenteuse appropriée : le prescripteur en informe le patient (non-conformité, risques, bénéfices attendus) et porte sur l’ordonnance la mention « Prescription hors autorisation de mise sur le marché ».', trap: 'AMM et remboursement sont distincts : une indication peut être autorisée sans être prise en charge (quétiapine LP en traitement adjuvant de l’EDC).', see: ['smr-asmr'], src: 'Code de la santé publique, art. L.5121-12-1 ; avis HAS Xeroquel LP 2016' },
  'smr-asmr': { t: 'SMR et ASMR', k: 'reg', en: 'medical benefit (SMR) and added medical benefit (ASMR)', def: 'Évaluations de la Commission de la transparence de la HAS : le service médical rendu (SMR : important, modéré, faible ou insuffisant) conditionne le remboursement ; l’amélioration du service médical rendu (ASMR, de I, majeure, à V, absente) compare le médicament aux traitements existants et pèse sur le prix.', more: 'Exemples : l’eskétamine (Spravato) a un SMR modéré et une ASMR V dans l’EDC résistant (2024) ; la quétiapine LP un SMR important dans la dépression bipolaire, mais insuffisant en traitement adjuvant de l’EDC (2016).', see: ['amm'], src: 'Avis HAS Spravato 2024 et Xeroquel LP 2016' },
  'ordonnance-securisee': { t: 'Ordonnance sécurisée', k: 'reg', en: 'secure prescription form (narcotics rules)', def: 'Ordonnance sur papier sécurisé (filigrane, numéro de lot, carré indiquant le nombre de médicaments prescrits) exigée pour les stupéfiants et certains médicaments assimilés, avec doses, posologie et durée écrites en toutes lettres.', more: 'La tianeptine y est soumise depuis le 3 septembre 2012 : 28 jours maximum, chevauchement interdit sauf mention expresse, copie conservée 3 ans par le pharmacien. L’eskétamine, stupéfiant à usage hospitalier, aussi, avec une prescription limitée à 4 semaines.', see: ['mor'], src: 'Arrêté du 27/07/2012 ; avis HAS Stablon 2012 et Spravato 2024' },
  'crat': { t: 'CRAT', k: 'reg', en: 'French reference centre on teratogenic agents', def: 'Centre de référence sur les agents tératogènes, service de l’AP-HP à l’hôpital Armand-Trousseau (Paris), créé en 1975 : il documente, indépendamment des laboratoires, les risques des médicaments pendant la grossesse et l’allaitement.', more: 'Son site lecrat.fr propose des fiches par molécule, et le centre répond aux questions cliniques des professionnels. Réflexe avant toute prescription psychotrope chez une femme enceinte, qui allaite ou qui a un projet de grossesse.', see: ['tnd', 'ebstein', 'htap'], src: 'AP-HP (page du service) ; Le Quotidien du médecin ; Le Quotidien du pharmacien' },
  'attestation-annuelle': { t: 'Attestation annuelle d’information partagée', k: 'reg', en: 'annual shared-information form', def: 'Document cosigné chaque année par le prescripteur et le patient, à présenter au pharmacien, qui atteste l’information sur les risques tératogènes et neurodéveloppementaux du valproate et, chez la femme, de la carbamazépine.', more: 'Valproate : obligatoire chez les filles et les femmes en âge de procréer (prescription initiale annuelle par un spécialiste) et, depuis 2025, chez les garçons et les hommes (prescription initiale par un spécialiste ; risque en cas de conception dans les 3 mois suivant une exposition paternelle). Carbamazépine : obligatoire chez les filles et femmes susceptibles d’avoir des enfants, prescription initiale par tout médecin.', see: ['tnd'], src: 'ANSM (mars 2025) ; Vidal 18/12/2024 ; RCP Dépakote, Dépamide' },

  /* ── Histoire ── */
  'serendipite': { t: 'Sérendipité', k: 'hist', en: 'serendipity', def: 'Découverte fortuite d’un phénomène que l’on ne cherchait pas, par un observateur capable d’en saisir la portée ; le mot a été forgé par Horace Walpole en 1754.', more: 'La psychopharmacologie de l’humeur en est pétrie : l’iproniazide était un antituberculeux, l’imipramine un candidat antipsychotique, le lithium de Cade servait à dissoudre l’acide urique, et l’acide valproïque était un solvant de laboratoire. Les mécanismes n’ont été compris qu’après coup.', see: ['imipraminique', 'reserpine'], src: 'Shorter 1997, chap. 7 ; notes d’histoire (Cade 1949 ; Kuhn 1957 ; Carraz 1963)' },
  'reserpine': { t: 'Réserpine', k: 'hist', en: 'reserpine', def: 'Alcaloïde de Rauwolfia serpentina, antihypertenseur et antipsychotique introduit en psychiatrie par Nathan Kline en 1954 ; elle bloque irréversiblement le VMAT2 et vide les neurones de leurs monoamines.', more: 'En 1955, le laboratoire de Brodie montre qu’elle fait disparaître la sérotonine des tissus, y compris du cerveau : premier lien entre biochimie et comportement. Les dépressions attribuées à la réserpine ont nourri l’hypothèse monoaminergique, mais leur réalité a été discutée a posteriori (Baumeister 2003).', see: ['vmat2', 'hypothese-monoaminergique'], src: 'Shorter 1997 (p. 330, 395 et notes) ; Pletscher, Shore et Brodie 1955 ; Baumeister et al. 2003' },
  'thymoanaleptique': { t: 'Thymoanaleptique', k: 'hist', en: 'thymoanaleptic (antidepressant)', def: 'Terme de la classification de Delay et Deniker (1957, validée en 1961) : parmi les psychoanaleptiques, qui stimulent l’activité psychique, les thymoanaleptiques relèvent l’humeur ; ce sont les antidépresseurs.', more: 'La classification oppose psycholeptiques (neuroleptiques, tranquillisants, hypnotiques), psychoanaleptiques et psychodysleptiques (hallucinogènes). Elle classe selon l’effet clinique, à l’inverse de la [[nbn|NbN]], qui classe selon la cible.', see: ['nbn', 'imipraminique'], src: 'Notes d’histoire (techno-science.net) ; Zohar et al. 2015' },
  'imipraminique': { t: 'Imipraminique', k: 'hist', en: 'imipramine-type (tricyclic) antidepressant', def: 'Terme français désignant les antidépresseurs dérivés de l’imipramine, tricycliques et tétracycliques : amitriptyline, clomipramine, dosulépine, doxépine, imipramine, maprotiline, trimipramine.', more: 'L’imipramine (G 22355), essayée par Roland Kuhn à Münsterlingen chez des schizophrènes, s’est révélée antidépressive en 1955 ; présentée en 1957, elle est nommée imipramine (Tofranil) en 1958. Toutes bloquent le NET (et souvent le SERT), mais aussi H1, M1, α1 et les canaux sodiques, d’où une toxicité qui les place en 2e intention (HAS 2017).', trap: 'La tianeptine a une structure tricyclique mais n’est pas un imipraminique par son mécanisme (agoniste µ-opioïde) : l’ANSM la classe parmi les « autres antidépresseurs ».', see: ['serendipite', 'canaux-na'], src: 'Shorter 1997 (p. 320–323) ; Stahl 2013, chap. 7 (fig. 7-62, tableau 7-12) ; ANSM 2026 ; HAS 2017' },
  'hamd': { t: 'Échelle de Hamilton (HAM-D)', k: 'cli', en: 'Hamilton Depression Rating Scale (HAM-D, HDRS)', def: 'Échelle d’hétéro-évaluation de la sévérité de la dépression (Hamilton, 1960) : 17 items cotés par le clinicien de 0 à 2 ou de 0 à 4, score total de 0 à 52.', more: 'Trois items portent sur le sommeil et six sur l’anxiété et les plaintes somatiques (agitation, anxiété psychique et somatique, symptômes digestifs et généraux, hypocondrie), contre un seul sur l’humeur dépressive : une molécule sédative ou anxiolytique peut faire baisser le score sans agir sur le cœur de la dépression. Elle reste un critère principal fréquent des essais, à côté de la [[madrs|MADRS]].', see: ['madrs', 'reponse'], src: 'Hamilton 1960 ; Bagby et al. 2004' },
  'caracteristiques-psychotiques': { t: 'Caractéristiques psychotiques', k: 'cli', en: 'psychotic features', def: 'EDC accompagné d’idées délirantes ou d’hallucinations, congruentes à l’humeur (culpabilité, ruine, châtiment, maladie, mort) ou non congruentes (DSM-5).', more: 'Forme sévère, à haut risque suicidaire, souvent méconnue quand le patient tait ses idées délirantes. Le traitement associe un antidépresseur et un antipsychotique de 2e génération, ou repose sur l’[[ect|ECT]], souvent la plus rapide ; un antidépresseur seul est insuffisant.', see: ['melancolie', 'ect'], src: 'DSM-5 ; Kruizinga et al., Cochrane 2021' },
  'caracteristiques-atypiques': { t: 'Caractéristiques atypiques', k: 'cli', en: 'atypical features', def: 'EDC où l’humeur reste réactive aux événements positifs, avec au moins deux signes parmi : prise de poids ou hyperphagie, hypersomnie, sensation de membres lourds (« paralysie de plomb »), sensibilité durable au rejet (DSM-5).', more: 'Plus fréquentes chez la femme, à début précoce, et dans le trouble bipolaire, surtout de type II. Les IMAO y font mieux que les imipraminiques ; les ISRS sont efficaces et mieux tolérés.', see: ['melancolie', 'depression-bipolaire'], src: 'DSM-5 ; Pae et al., CNS Drugs 2009' }
};

/* ─── panes ─── */
/* Panneaux des cibles moléculaires. */
C.panes = {
  'c-sert': { type: 'target', k: 'tr', fam: 'Sérotonine', t: 'SERT', sub: 'transporteur de la sérotonine · gène SLC6A4 (famille SLC6)', lead: 'La cible commune de la plupart des antidépresseurs : le bloquer prolonge l’action de la sérotonine libérée, mais l’effet clinique demande des semaines d’adaptation.', where: 'Membrane des neurones sérotoninergiques du raphé, sur les terminaisons axonales comme autour des corps cellulaires et des dendrites ; en périphérie, plaquettes et intestin.', does: 'Recapture de la 5-HT couplée au sodium et au chlore, qui termine son action et permet son restockage par le VMAT2 ; les plaquettes y puisent toute leur sérotonine.', block: 'Effet antidépresseur, anxiolytique et anti-obsessionnel après adaptation ; occupation d’environ 80 % aux doses minimales efficaces des ISRS. Effets précoces : nausées et troubles digestifs (5-HT3), nervosité, insomnie ; puis dysfonction sexuelle, émoussement affectif, hyponatrémie, saignements (plaquettes), syndrome d’arrêt. Affinités (Ki) : paroxétine ≈ 0,1 nM, clomipramine ≈ 0,2, sertraline ≈ 0,3, fluoxétine ≈ 1, escitalopram ≈ 1, duloxétine ≈ 0,8 ; venlafaxine 8 à 80 selon les sources.', mols: ['citalopram', 'escitalopram', 'fluoxetine', 'fluvoxamine', 'paroxetine', 'sertraline', 'venlafaxine', 'duloxetine', 'milnacipran', 'clomipramine', 'imipramine', 'amitriptyline', 'vortioxetine'], links: [['term', 'r5ht1a', '5-HT1A, l’autorécepteur'], ['term', 'occupation', 'Occupation des cibles'], ['term', 'syndrome-serotoninergique', 'Syndrome sérotoninergique'], ['pane', 'c-net', 'NET']], src: 'Stahl 2013, chap. 2 (fig. 2-2), chap. 5 (fig. 5-14) et chap. 7 (fig. 7-12 à 7-17) ; Meyer et al. 2004 ; Wikipédia (PDSP) pour les Ki' },
  'c-net': { type: 'target', k: 'tr', fam: 'Noradrénaline', t: 'NET', sub: 'transporteur de la noradrénaline · gène SLC6A2 (famille SLC6)', lead: 'Recapte la noradrénaline partout, et la dopamine dans le cortex préfrontal : son blocage est la « deuxième action » des IRSNa et des tricycliques.', where: 'Terminaisons des neurones noradrénergiques issus du locus coeruleus, dans tout le cerveau et la moelle ; terminaisons sympathiques périphériques (cœur, vaisseaux, vessie).', does: 'Termine l’action de la noradrénaline ; dans le cortex préfrontal, presque dépourvu de DAT, il élimine aussi la dopamine, pour laquelle il a davantage d’affinité que pour la noradrénaline.', block: 'Élève la noradrénaline dans tout le cerveau et la dopamine dans le cortex préfrontal : énergie, concentration, effet antalgique sur les voies descendantes (duloxétine, milnacipran). Effets indésirables : sueurs, tachycardie, hausse tensionnelle (venlafaxine à forte dose), dysurie, tremblement. Affinités (Ki) : duloxétine ≈ 7,5 nM, maprotiline ≈ 11, amitriptyline 19–35, imipramine 20–37, milnacipran ≈ 22 ; venlafaxine ≈ 2 500 (inhibition nette vers 225 mg/j).', mols: ['duloxetine', 'milnacipran', 'venlafaxine', 'maprotiline', 'amitriptyline', 'imipramine', 'clomipramine', 'dosulepine', 'doxepine', 'quetiapine'], links: [['term', 'cortex-prefrontal', 'Dopamine préfrontale'], ['term', 'locus-coeruleus', 'Locus coeruleus'], ['pane', 'c-sert', 'SERT'], ['pane', 'c-dat', 'DAT']], src: 'Stahl 2013, chap. 6 (fig. 6-26, 6-27, 6-32) et chap. 7 (fig. 7-30 à 7-34 ; p. 636) ; Wikipédia (PDSP) pour les Ki' },
  'c-dat': { type: 'target', k: 'tr', fam: 'Dopamine', t: 'DAT', sub: 'transporteur de la dopamine · gène SLC6A3 (famille SLC6)', lead: 'La cible des psychostimulants plus que des antidépresseurs : son blocage rapide et massif est renforçant, d’où la prudence des développements.', where: 'Terminaisons des neurones dopaminergiques du striatum et du noyau accumbens (voies nigrostriée et mésolimbique) ; très peu dans le cortex préfrontal.', does: 'Recapture de la dopamine, qui termine son action synaptique ; il transporte aussi les amphétamines, qui y entrent comme substrats.', block: 'Une occupation rapide, brève et élevée (50 % ou plus) produit euphorie et renforcement (cocaïne) ; une occupation plus lente et prolongée améliore l’attention (méthylphénidate à libération prolongée) ; une occupation modeste et durable participerait à l’effet du bupropion (en France, AMM limitée au sevrage tabagique). Parmi les antidépresseurs disponibles, seule la sertraline a une affinité notable (Ki 22–315 nM), de portée clinique discutée.', mols: ['sertraline'], links: [['term', 'noyau-accumbens', 'Noyau accumbens'], ['term', 'anhedonie', 'Anhédonie'], ['pane', 'c-net', 'NET']], src: 'Stahl 2013, chap. 2 (tableau 2-1) et chap. 7 (fig. 7-19, 7-35 à 7-37 ; p. 640) ; Wikipédia (PDSP) pour les Ki' },
  'c-vmat2': { type: 'target', k: 'tr', fam: 'Monoamines', t: 'VMAT2', sub: 'transporteur vésiculaire des monoamines 2 · gène SLC18A2 (famille SLC18)', lead: 'Le transporteur qui remplit les vésicules : sans lui, aucune monoamine n’est stockée ni libérée, comme l’a montré la réserpine.', where: 'Membrane des vésicules synaptiques de tous les neurones monoaminergiques (sérotonine, noradrénaline, dopamine) et histaminergiques ; le VMAT1 est surtout périphérique et neuroendocrine.', does: 'Concentre les monoamines dans les vésicules en échange de protons, grâce à une pompe à protons ; les protège de la MAO du cytoplasme et les rend disponibles pour l’exocytose. La dopamine doit y entrer pour être transformée en noradrénaline par la DBH.', block: 'Déplétion des monoamines : la réserpine, inhibiteur irréversible, a été antihypertensive et antipsychotique, avec des dépressions rapportées et un parkinsonisme ; la tétrabénazine sert dans la chorée de Huntington, avec un risque de dépression à surveiller. Réserpine et tétrabénazine sont contre-indiquées avec l’iproniazide. Aucun antidépresseur ni thymorégulateur du cours n’agit sur cette cible.', mols: [], links: [['term', 'reserpine', 'Réserpine'], ['term', 'monoamine', 'Monoamines'], ['term', 'dbh', 'DBH vésiculaire']], src: 'Stahl 2013, chap. 2 (fig. 2-2, tableau 2-3 ; p. 99) ; Shorter 1997 (p. 330) ; RCP Marsilid' },
  'c-mao': { type: 'target', k: 'enz', fam: 'Monoamines', t: 'MAO', sub: 'monoamine oxydases A et B · enzymes mitochondriales à flavine (FAD)', lead: 'L’enzyme qui détruit les monoamines à l’intérieur des cellules : l’inhiber fut le premier mécanisme antidépresseur découvert, par hasard, avec l’iproniazide.', where: 'Membrane externe des mitochondries. MAO-A : cerveau, intestin, foie, placenta, peau ; MAO-B : cerveau (neurones sérotoninergiques, cellules gliales), plaquettes, lymphocytes.', does: 'Désamination oxydative : la MAO-A dégrade surtout sérotonine et noradrénaline, la MAO-B surtout la phényléthylamine ; dopamine et tyramine sont communes aux deux. La MAO-A intestinale et hépatique détruit la tyramine alimentaire.', block: 'Inhiber la MAO-A cérébrale est antidépresseur ; inhiber aussi la MAO-B élève davantage la dopamine. Iproniazide : irréversible et non sélectif, activité revenant en 2 à 3 semaines ; moclobémide : réversible et sélectif de la MAO-A. Risques : effet fromage, syndrome sérotoninergique avec les inhibiteurs de recapture, poussées hypertensives avec les sympathomimétiques, hypotension orthostatique. Les IMAO-B sélectifs (sélégiline, rasagiline) traitent la maladie de Parkinson, sans effet antidépresseur à ces doses.', mols: ['iproniazide', 'moclobemide'], links: [['term', 'effet-fromage', 'Effet fromage'], ['term', 'imao-reversible', 'RIMA'], ['term', 'fenetre-therapeutique', 'Fenêtres avant et après un IMAO'], ['pane', 'c-sert', 'SERT']], src: 'Stahl 2013, chap. 2 (fig. 2-12, 2-13) et chap. 7 (tableau 7-1 ; fig. 7-51 à 7-61) ; RCP Marsilid, Moclamine' },
  'c-5ht1a': { type: 'target', k: 'rec', fam: 'Sérotonine', t: '5-HT1A', sub: 'récepteur sérotoninergique 1A · RCPG couplé à Gi/o', lead: 'Frein du neurone sérotoninergique quand il est somatodendritique, relais de l’effet thérapeutique quand il est post-synaptique : sa désensibilisation rythmerait le délai d’action des ISRS.', where: 'Corps cellulaires et dendrites des neurones du raphé, où c’est le seul autorécepteur somatodendritique de la 5-HT ; post-synaptique dans l’hippocampe, le septum, l’amygdale et le cortex (neurones pyramidaux).', does: 'Ouvre des canaux potassiques et hyperpolarise : dans le raphé, ralentit la décharge et la libération de sérotonine ; dans le cortex, freine les neurones pyramidaux et favorise indirectement la libération de dopamine.', block: 'Les antagonistes n’ont pas d’usage clinique établi en psychiatrie ; le pindolol, bêtabloquant également antagoniste 5-HT1A, a été étudié pour accélérer l’effet des ISRS, avec des résultats inconstants.', stim: 'Les agonistes partiels sont anxiolytiques (buspirone) et potentialisent les inhibiteurs de recapture ; cette action participe au profil de la vortioxétine, de l’aripiprazole, de la cariprazine, de la quétiapine (norquétiapine) et de la lurasidone. Sous ISRS, la stimulation initiale des autorécepteurs freine la décharge, puis leur désensibilisation libère la transmission.', mols: ['vortioxetine', 'aripiprazole', 'cariprazine', 'quetiapine', 'lurasidone', 'asenapine'], links: [['term', 'autorecepteur', 'Autorécepteur'], ['term', 'desensibilisation', 'Désensibilisation'], ['term', 'delai-action', 'Délai d’action'], ['pane', 'c-sert', 'SERT']], src: 'Stahl 2013, chap. 5 (fig. 5-15, 5-25, 5-26) et chap. 7 (fig. 7-13 à 7-16, 7-24 à 7-29) ; Wikipédia (PDSP) pour les Ki' },
  'c-5ht2a': { type: 'target', k: 'rec', fam: 'Sérotonine', t: '5-HT2A', sub: 'récepteur sérotoninergique 2A · RCPG couplé à Gq', lead: 'Récepteur excitateur du cortex, par lequel l’excès de sérotonine produit une partie des effets indésirables des ISRS ; le bloquer améliore le sommeil et rend les antipsychotiques « atypiques ».', where: 'Post-synaptique, très dense sur les neurones pyramidaux du cortex préfrontal ; aussi dans le striatum, la substance noire, sur des interneurones GABA, sur les cellules à prolactine de l’hypophyse et sur les plaquettes.', does: 'Excite les neurones pyramidaux et augmente la libération de glutamate ; freine indirectement la libération de dopamine dans le striatum ; stimule la sécrétion de prolactine.', block: 'Améliore le sommeil (trazodone, mirtazapine) ; associé à un ISRS, atténue insomnie, agitation et dysfonction sexuelle ; désinhibe la dopamine nigrostriée (moins d’effets extrapyramidaux) et limite l’hyperprolactinémie. Antagonistes puissants : asénapine, rispéridone, olanzapine, mirtazapine, miansérine, amitriptyline, doxépine.', stim: 'Les psychédéliques classiques (LSD, psilocybine, DMT, mescaline) en sont des agonistes. Sous ISRS, sa stimulation par l’excès de sérotonine contribuerait à l’insomnie, à l’agitation et à la dysfonction sexuelle.', mols: ['asenapine', 'risperidone', 'olanzapine', 'quetiapine', 'lurasidone', 'aripiprazole', 'mirtazapine', 'mianserine', 'amitriptyline', 'doxepine', 'trimipramine'], links: [['term', 'hyperprolactinemie', 'Prolactine'], ['term', 'dysfonction-sexuelle', 'Dysfonction sexuelle'], ['pane', 'c-5ht2c', '5-HT2C'], ['pane', 'c-d2', 'D2']], src: 'Stahl 2013, chap. 5 (fig. 5-15 à 5-24), chap. 7 (fig. 7-48, 7-49) et chap. 14 (fig. 14-19) ; Wikipédia (PDSP) pour les Ki' },
  'c-5ht2c': { type: 'target', k: 'rec', fam: 'Sérotonine', t: '5-HT2C', sub: 'récepteur sérotoninergique 2C · RCPG couplé à Gq', lead: 'Le frein sérotoninergique de la dopamine et de la noradrénaline préfrontales : le lever est antidépresseur et activateur, mais aussi orexigène.', where: 'Post-synaptique, notamment sur des interneurones GABA du tronc cérébral (aire tegmentale ventrale, locus coeruleus) et du cortex préfrontal ; hypothalamus ; noyau suprachiasmatique ; très dense dans les plexus choroïdes.', does: 'En activant les interneurones GABA, freine la libération de dopamine et de noradrénaline dans le cortex préfrontal ; participe à la satiété et, dans le noyau suprachiasmatique, aux rythmes circadiens.', block: 'Désinhibe dopamine et noradrénaline préfrontales : effet activateur sur l’énergie et la concentration (parfois dès les premières prises de fluoxétine), mais parfois agitation, insomnie, anxiété. Associé au blocage H1, prise de poids et risque métabolique (mirtazapine, olanzapine, quétiapine). Antagonistes : asénapine, miansérine, amitriptyline, mirtazapine, olanzapine, fluoxétine et norfluoxétine, agomélatine (affinité modeste, Ki ≈ 630 nM).', stim: 'Les agonistes réduisent l’appétit (la lorcasérine a été commercialisée comme anorexigène aux États-Unis) et freinent la dopamine mésolimbique.', mols: ['fluoxetine', 'agomelatine', 'mirtazapine', 'mianserine', 'amitriptyline', 'olanzapine', 'quetiapine', 'asenapine'], links: [['term', 'cortex-prefrontal', 'Cortex préfrontal'], ['term', 'syndrome-metabolique', 'Poids et métabolisme'], ['pane', 'c-5ht2a', '5-HT2A'], ['pane', 'c-h1', 'H1']], src: 'Stahl 2013, chap. 5 (fig. 5-29, 5-41, 5-52) et chap. 7 (fig. 7-18, 7-41 à 7-43, 7-66) ; Wikipédia (PDSP) pour les Ki' },
  'c-5ht3': { type: 'target', k: 'rec', fam: 'Sérotonine', t: '5-HT3', sub: 'récepteur sérotoninergique 3 · canal cationique pentamérique (ionotrope)', lead: 'Le seul récepteur ionotrope de la sérotonine : responsable des nausées du début des ISRS, et cible antiémétique majeure.', where: 'Area postrema et noyau du tractus solitaire (tronc cérébral), afférences vagales et plexus nerveux du tube digestif ; dans le cerveau, interneurones GABA et terminaisons de divers neurones.', does: 'Canal perméable aux cations : sa stimulation dépolarise en quelques millisecondes ; elle déclenche nausées, vomissements et accélération du transit et, dans le cortex, active des interneurones GABA qui freinent noradrénaline et acétylcholine.', block: 'Effet antiémétique (sétrons, contre les nausées des chimiothérapies) ; atténue les nausées et la diarrhée liées à la sérotonine ; désinhibe noradrénaline et acétylcholine corticales, mécanisme proposé pour la mirtazapine et la vortioxétine. Affinités (Ki) : vortioxétine ≈ 3,7 nM, mirtazapine ≈ 8 nM.', stim: 'En début d’ISRS, l’excès de sérotonine stimule ces récepteurs : nausées et troubles digestifs, qui s’atténuent souvent avec la tolérance.', mols: ['mirtazapine', 'mianserine', 'vortioxetine'], links: [['term', 'area-postrema', 'Area postrema'], ['term', 'recepteur-ionotrope', 'Récepteur ionotrope'], ['pane', 'c-sert', 'SERT']], src: 'Stahl 2013, chap. 3 (tableaux 3-1, 3-2), chap. 5 (p. 335–336) et chap. 7 (fig. 7-46) ; Wikipédia (PDSP) pour les Ki' },
  'c-a1': { type: 'target', k: 'rec', fam: 'Noradrénaline', t: 'α1', sub: 'récepteurs α1-adrénergiques (α1A, α1B, α1D) · RCPG couplés à Gq', lead: 'Cible « hors cible » de nombreux psychotropes : son blocage explique vertiges, hypotension orthostatique et une part de la sédation.', where: 'Muscle lisse vasculaire, prostate et col vésical ; dans le cerveau, cortex, thalamus et corps cellulaires des neurones sérotoninergiques du raphé.', does: 'Vasoconstriction et maintien de la pression artérielle en position debout ; éveil cortical ; dans le raphé, accélère la décharge des neurones sérotoninergiques (« accélérateur » noradrénergique de la sérotonine).', block: 'Hypotension orthostatique, vertiges, chutes, sédation : tricycliques, miansérine, trazodone, quétiapine, rispéridone, asénapine. Dans le cas de la miansérine, il atténue l’effet sérotoninergique de l’antagonisme α2. Affinités (Ki) : asénapine ≈ 1,2 nM, rispéridone ≈ 5, quétiapine ≈ 22, miansérine ≈ 34, imipramine ≈ 32.', stim: 'Les décongestionnants (phényléphrine) et les sympathomimétiques stimulent ces récepteurs : sous IMAO, risque de poussée hypertensive. La dysurie des IRSNa tient à l’excès de noradrénaline sur les α1 vésicaux.', mols: ['amitriptyline', 'clomipramine', 'imipramine', 'doxepine', 'trimipramine', 'mianserine', 'quetiapine', 'risperidone', 'asenapine', 'aripiprazole'], links: [['term', 'hypotension-orthostatique', 'Hypotension orthostatique'], ['term', 'raphe', 'Raphé'], ['pane', 'c-a2', 'α2']], src: 'Stahl 2013, chap. 5 (p. 355 ; fig. 5-40), chap. 6 (fig. 6-30) et chap. 7 (p. 636 ; fig. 7-58, 7-69) ; Wikipédia (PDSP) pour les Ki' },
  'c-a2': { type: 'target', k: 'rec', fam: 'Noradrénaline', t: 'α2', sub: 'récepteurs α2-adrénergiques (α2A, α2B, α2C) · RCPG couplés à Gi', lead: 'Le double frein : autorécepteur du neurone noradrénergique et hétérorécepteur du neurone sérotoninergique ; le bloquer augmente les deux monoamines sans toucher aux transporteurs.', where: 'Terminaisons et corps cellulaires des neurones du locus coeruleus (autorécepteurs) ; terminaisons sérotoninergiques corticales (hétérorécepteurs) ; post-synaptique dans le cortex préfrontal ; tronc cérébral et vaisseaux (contrôle tensionnel).', does: 'Rétrocontrôle négatif : la noradrénaline qui s’y fixe arrête la décharge et la libération de noradrénaline, et freine la libération de sérotonine.', block: 'Les antagonistes ({{mirtazapine|mirtazapine}}, {{mianserine|miansérine}}) libèrent la noradrénaline, et la sérotonine par deux voies : levée du frein α2 sur les terminaisons et stimulation des α1 du raphé. Synergie avec les inhibiteurs de recapture, d’où leur association en cas de réponse partielle. Affinités α2A (Ki) : mirtazapine 20–158 nM, miansérine ≈ 73 ; action aussi de l’asénapine, de la rispéridone et de la lurasidone.', stim: 'Les agonistes (clonidine, guanfacine) réduisent la décharge du locus coeruleus : antihypertenseurs, sevrage des opioïdes, TDAH.', mols: ['mirtazapine', 'mianserine', 'asenapine', 'risperidone', 'lurasidone'], links: [['term', 'autorecepteur', 'Autorécepteur'], ['term', 'heterorecepteur', 'Hétérorécepteur'], ['term', 'association', 'Associer un antagoniste α2'], ['pane', 'c-a1', 'α1']], src: 'Stahl 2013, chap. 2 (tableau 2-4), chap. 6 (fig. 6-27 à 6-30) et chap. 7 (fig. 7-44, 7-45) ; Bennabi et al. 2019 ; Wikipédia (PDSP) pour les Ki' },
  'c-h1': { type: 'target', k: 'rec', fam: 'Histamine', t: 'H1', sub: 'récepteur histaminique H1 · RCPG couplé à Gq', lead: 'Le récepteur de l’éveil histaminique : son blocage est la principale source de sédation et, avec le 5-HT2C, de prise de poids sous psychotropes.', where: 'Cortex, thalamus et hypothalamus, cibles des neurones histaminergiques du noyau tubéromamillaire ; en périphérie, vaisseaux, bronches, peau.', does: 'Relaie l’effet éveillant de l’histamine, libérée pendant la veille ; participe à la régulation de l’appétit.', block: 'Sédation, somnolence diurne, prise de poids ; effet utile contre l’insomnie (doxépine à 1–6 mg/j, quasi sélective du H1 ; mirtazapine). Affinités (Ki) : doxépine 0,09–1,2 nM, mirtazapine 0,14–1,6, trimipramine 0,3–1,5, miansérine 0,3–1,7, amitriptyline 0,5–1,1, olanzapine 0,7–4,9, asénapine ≈ 1, quétiapine 2–11. La plupart des antihistaminiques sédatifs sont aussi anticholinergiques ; à faible dose, la doxépine ne bloque plus que le H1, et les premiers essais ne retrouvent ni effet résiduel le lendemain ni tolérance.', mols: ['doxepine', 'mirtazapine', 'mianserine', 'trimipramine', 'amitriptyline', 'maprotiline', 'dosulepine', 'quetiapine', 'olanzapine', 'asenapine'], links: [['term', 'syndrome-metabolique', 'Poids et métabolisme'], ['pane', 'c-m1', 'Muscariniques'], ['pane', 'c-5ht2c', '5-HT2C']], src: 'Stahl 2013, chap. 5 (fig. 5-38, 5-39, 5-41), chap. 7 (fig. 7-67) et chap. 11 (fig. 11-4, 11-20) ; Wikipédia (PDSP) pour les Ki' },
  'c-m1': { type: 'target', k: 'rec', fam: 'Acétylcholine', t: 'Muscariniques', sub: 'récepteurs muscariniques M1–M5 · RCPG (M1, M3, M5 : Gq ; M2, M4 : Gi)', lead: 'Les récepteurs de l’acétylcholine que bloquent les tricycliques : d’où des effets atropiniques mal tolérés, surtout chez le sujet âgé.', where: 'M1 : cortex, hippocampe, striatum ; M2 : cœur ; M3 : glandes salivaires, muscle lisse digestif et vésical, iris et muscle ciliaire.', does: 'M1 : mémoire, attention, éveil ; M2 : ralentissement cardiaque ; M3 : sécrétions, motricité digestive, contraction vésicale, accommodation et myosis.', block: 'Bouche sèche, constipation, rétention urinaire, vision floue et mydriase (risque de glaucome par fermeture de l’angle), tachycardie, troubles mnésiques et confusion. Affinités (Ki) : amitriptyline ≈ 10 nM, doxépine 23–80, dosulépine ≈ 25, clomipramine ≈ 37, imipramine ≈ 46, trimipramine ≈ 58, paroxétine ≈ 72 ; olanzapine 2,5–73. Le rebond cholinergique participe au syndrome d’arrêt de la paroxétine.', mols: ['amitriptyline', 'doxepine', 'dosulepine', 'clomipramine', 'imipramine', 'trimipramine', 'paroxetine', 'olanzapine', 'quetiapine'], links: [['term', 'effet-anticholinergique', 'Effet anticholinergique'], ['term', 'syndrome-arret', 'Syndrome d’arrêt'], ['pane', 'c-h1', 'H1']], src: 'Stahl 2013, chap. 2 (tableau 2-4), chap. 5 (fig. 5-11, 5-39) et chap. 7 (fig. 7-20, 7-68) ; Wikipédia (PDSP) pour les Ki' },
  'c-d2': { type: 'target', k: 'rec', fam: 'Dopamine', t: 'D2', sub: 'récepteur dopaminergique D2 · RCPG couplé à Gi/o', lead: 'La cible commune des antipsychotiques, utilisés comme thymorégulateurs ou en potentialisation : antimaniaques par blocage mésolimbique, au prix d’effets moteurs et endocriniens.', where: 'Post-synaptique dans le striatum, le noyau accumbens et les cellules à prolactine de l’hypophyse ; autorécepteur sur les terminaisons et les corps cellulaires des neurones dopaminergiques.', does: 'Freine l’adénylate cyclase : dans le striatum, module la motricité ; dans le noyau accumbens, la saillance et la motivation ; dans l’hypophyse, inhibe la sécrétion de prolactine ; comme autorécepteur, freine la décharge et la libération de dopamine.', block: 'Effet antipsychotique et antimaniaque (voie mésolimbique) ; effets extrapyramidaux, akathisie, dyskinésies tardives (voie nigrostriée) ; hyperprolactinémie (voie tubéro-infundibulaire). En TEP : efficacité vers 65 % d’occupation, hyperprolactinémie vers 72 %, effets extrapyramidaux vers 78 % (Kapur 2000) ; l’antagonisme 5-HT2A élargit cette marge.', stim: 'Les agonistes partiels (aripiprazole ; cariprazine, plus affine pour le D3) stabilisent la transmission : moins d’effets extrapyramidaux et d’hyperprolactinémie, mais akathisie fréquente.', mols: ['aripiprazole', 'cariprazine', 'risperidone', 'olanzapine', 'quetiapine', 'asenapine', 'lurasidone'], links: [['term', 'agoniste-partiel', 'Agoniste partiel'], ['term', 'hyperprolactinemie', 'Hyperprolactinémie'], ['term', 'akathisie', 'Akathisie'], ['pane', 'c-5ht2a', '5-HT2A']], src: 'Stahl 2013, chap. 4 (fig. 4-10, 4-11) et chap. 5 (fig. 5-18 à 5-23, 5-31 à 5-35) ; Kapur et al. 2000 ; RCP Abilify, Reagila' },
  'c-sigma1': { type: 'target', k: 'rec', fam: 'Signalisation intracellulaire', t: 'σ1', sub: 'récepteur sigma-1 · protéine chaperon du réticulum endoplasmique (gène SIGMAR1)', lead: 'Un « récepteur » qui n’en est pas un au sens classique : une protéine chaperon intracellulaire à laquelle se lient plusieurs ISRS, la fluvoxamine en tête.', where: 'Membrane du réticulum endoplasmique, à l’interface avec la mitochondrie ; largement exprimé dans le cerveau et les tissus périphériques.', does: 'Module la signalisation calcique entre réticulum et mitochondrie, la réponse au stress cellulaire et la survie neuronale ; sa physiologie reste mal comprise, d’où l’« énigme sigma » de Stahl.', block: 'La sertraline s’y lierait plutôt en antagoniste (Ki 32–57 nM chez le rat) ; la portée clinique de cette liaison est inconnue.', stim: 'La fluvoxamine en est l’agoniste le plus affin parmi les ISRS (Ki 17–36 nM) ; Stahl y voit une contribution possible à ses effets anxiolytiques et dans la dépression psychotique, non démontrée. Autres ligands : fluoxétine, citalopram et escitalopram (moins affins), dextrométhorphane et, faiblement, kétamine.', mols: ['fluvoxamine', 'sertraline', 'fluoxetine', 'citalopram', 'escitalopram'], links: [['term', 'sigma1', 'σ1 dans le glossaire'], ['pane', 'c-sert', 'SERT']], src: 'Stahl 2013, chap. 7 (fig. 7-19, 7-21, 7-90, 7-94) ; Hayashi et Su 2007 ; Wikipédia (PDSP) pour les Ki' },
  'c-mt': { type: 'target', k: 'rec', fam: 'Mélatonine', t: 'MT1 / MT2', sub: 'récepteurs de la mélatonine · RCPG couplés à Gi', lead: 'Les récepteurs de l’horloge : la mélatonine nocturne y remet à l’heure le noyau suprachiasmatique ; l’agomélatine en est un agoniste très puissant.', where: 'Surtout le noyau suprachiasmatique de l’hypothalamus ; aussi rétine, hippocampe, cortex, vaisseaux.', does: 'Le MT1 favorise l’endormissement en freinant l’activité du noyau suprachiasmatique, le MT2 décale la phase de l’horloge ; ensemble, ils synchronisent veille-sommeil, température et cortisol sur le cycle jour-nuit.', stim: 'Agonistes : mélatonine, rameltéon (hypnotique non commercialisé en France), agomélatine (Ki ≈ 0,1 nM sur MT1 et MT2), qui y ajoute un antagonisme 5-HT2C plus faible (Ki ≈ 630 nM). Selon Stahl, c’est l’association des deux qui resynchroniserait les rythmes et serait antidépressive ; un agoniste mélatoninergique seul ne l’est pas.', mols: ['agomelatine'], links: [['term', 'noyau-suprachiasmatique', 'Noyau suprachiasmatique'], ['term', 'melatonine', 'Mélatonine'], ['pane', 'c-5ht2c', '5-HT2C']], src: 'Stahl 2013, chap. 2 (tableau 2-4), chap. 7 (fig. 7-39 à 7-43) et chap. 11 (fig. 11-4) ; Wikipédia (agomélatine) ; RCP Valdoxan' },
  'c-nmda': { type: 'target', k: 'rec', fam: 'Glutamate', t: 'NMDA', sub: 'récepteur du glutamate de type NMDA · canal cationique tétramérique (GluN1, GluN2A–D)', lead: 'La cible de la kétamine et de l’eskétamine, premiers antidépresseurs d’action rapide : un détecteur de coïncidence qui contrôle la plasticité synaptique.', where: 'Synapses glutamatergiques de tout le cerveau ; dense dans le cortex et l’hippocampe, y compris sur les interneurones GABA.', does: 'Ne s’ouvre qu’en présence de glutamate et d’un co-agoniste (glycine ou D-sérine), après une dépolarisation qui chasse l’ion magnésium du pore ; l’entrée de calcium déclenche la potentialisation à long terme.', block: 'La kétamine (Ki ≈ 0,3–0,7 µM au site de la phencyclidine) et l’eskétamine, environ 3 à 4 fois plus affine, bloquent le canal ouvert : désinhibition des neurones pyramidaux, bouffée de glutamate, activation des récepteurs AMPA, du BDNF et de mTOR, synaptogenèse en quelques heures. Effets indésirables : dissociation, sédation, hausse tensionnelle, potentiel d’abus, d’où l’administration sous surveillance hospitalière. La mémantine, autre antagoniste, est utilisée dans la maladie d’Alzheimer.', mols: ['esketamine'], links: [['term', 'ampa', 'AMPA'], ['term', 'plasticite-synaptique', 'Plasticité synaptique'], ['term', 'bdnf', 'BDNF'], ['pane', 'c-mor', 'µ-opioïde']], src: 'Stahl 2013, chap. 3 (tableaux 3-2, 3-3) et chap. 7 (fig. 7-90 à 7-93) ; avis HAS Spravato 2024 ; Wikipédia (kétamine)' },
  'c-mor': { type: 'target', k: 'rec', fam: 'Opioïdes', t: 'µ-opioïde', sub: 'récepteur µ (MOR) · RCPG couplé à Gi/o · gène OPRM1', lead: 'Le récepteur de la morphine, longtemps absent de la psychopharmacologie de l’humeur, est la principale cible connue de la tianeptine.', where: 'Substance grise périaqueducale, thalamus et moelle (analgésie), aire tegmentale ventrale et noyau accumbens (récompense), tronc cérébral (respiration), tube digestif.', does: 'Relaie l’analgésie, la récompense et la régulation émotionnelle liées aux opioïdes endogènes (endorphines, enképhalines) ; sa stimulation déprime la respiration et ralentit le transit.', stim: 'La tianeptine en est un agoniste complet (Ki ≈ 0,4–0,8 µM ; Gassaway 2014) ; chez l’animal, son effet antidépresseur semble dépendre de ce récepteur. Ce mécanisme rend compte des cas d’abus et de dépendance, surtout avant 50 ans et en cas d’antécédent addictif, et de la soumission de la tianeptine à une partie de la réglementation des stupéfiants depuis 2012. La kétamine s’y lie faiblement (Ki de l’ordre de 10 à 40 µM).', mols: ['tianeptine'], links: [['term', 'ordonnance-securisee', 'Ordonnance sécurisée'], ['term', 'mor', 'MOR dans le glossaire'], ['pane', 'c-nmda', 'NMDA']], src: 'Gassaway et al. 2014 ; Prescriber’s Guide 2021 (tianeptine) ; avis HAS Stablon 2012 ; Stahl 2013, chap. 7 (fig. 7-90) ; Wikipédia (kétamine)' },
  'c-canaux-na': { type: 'target', k: 'can', fam: 'Canaux ioniques', t: 'Canaux sodiques', sub: 'canaux sodiques voltage-dépendants · sous-unité α formant le pore (Nav1.1 à Nav1.9)', lead: 'Cible des anticonvulsivants thymorégulateurs et cause de la cardiotoxicité des tricycliques : le même canal, deux usages opposés.', where: 'Membrane de tous les neurones (segment initial de l’axone, axone, terminaisons) ; myocarde et tissu de conduction cardiaque.', does: 'S’ouvrent en réponse à la dépolarisation et laissent entrer le sodium, ce qui génère et propage le potentiel d’action jusqu’aux terminaisons, où il déclenche la libération du neurotransmetteur ; ils s’inactivent puis se ferment en quelques millisecondes.', block: 'La carbamazépine et la lamotrigine se fixent sur la sous-unité α en conformation ouverte, surtout dans les neurones qui déchargent à haute fréquence : moins de libération de glutamate, effet antiépileptique et thymorégulateur (antimaniaque pour la carbamazépine, prévention des épisodes dépressifs pour la lamotrigine). Le valproate modifierait leur sensibilité de façon indirecte. Les tricycliques les bloquent faiblement aux doses usuelles mais, en surdosage, provoquent troubles de la conduction cardiaque et convulsions.', mols: ['carbamazepine', 'lamotrigine', 'divalproate', 'valpromide', 'amitriptyline', 'imipramine', 'clomipramine', 'dosulepine'], links: [['term', 'kindling', 'Embrasement'], ['term', 'toxidermie', 'Toxidermies'], ['term', 'imipraminique', 'Imipraminiques'], ['pane', 'c-gsk3', 'GSK-3']], src: 'Stahl 2013, chap. 3 (fig. 3-18 à 3-21), chap. 7 (fig. 7-62, 7-70) et chap. 8 (fig. 8-4, 8-5, 8-8 à 8-11) ; RCP Lamictal' },
  'c-gsk3': { type: 'target', k: 'enz', fam: 'Signalisation intracellulaire', t: 'GSK-3', sub: 'glycogène synthase kinase 3 (α et β) · sérine/thréonine kinase', lead: 'Une kinase intracellulaire pro-apoptotique que le lithium inhibe : l’une des pistes les plus étudiées d’un mécanisme d’action toujours incertain.', where: 'Cytoplasme et noyau de presque toutes les cellules, neurones compris ; deux isoformes, GSK-3α et GSK-3β.', does: 'Active en l’absence de signal, elle phosphoryle de nombreuses protéines (glycogène synthase, β-caténine, protéine tau) ; les facteurs de croissance et la voie Wnt l’inhibent. En excès, elle favorise l’apoptose et réduit la plasticité synaptique.', block: 'Le lithium l’inhibe directement (Klein et Melton 1996), le valproate aussi : effet neuroprotecteur et favorable à la plasticité supposé, qui pourrait participer à l’action thymorégulatrice. L’hypothèse d’un ralentissement de la phosphorylation de tau, voire de l’évolution vers la maladie d’Alzheimer, reste à confirmer ; des inhibiteurs sélectifs sont en développement.', mols: ['lithium', 'divalproate', 'valpromide'], links: [['term', 'impase', 'IMPase, l’autre cible du lithium'], ['term', 'bdnf', 'BDNF'], ['term', 'lithiemie', 'Lithiémie']], src: 'Stahl 2013, chap. 2 (fig. 2-14) et chap. 8 (fig. 8-3, 8-7 ; p. 776–777, 783–784) ; Klein et Melton 1996' }
};

/* ─── slides-1 ─── */
/* Diapositives — 00 Ouverture et 01 Chimioarchitecture.
   b : affiché en lecture et en projection ; more : lecture seulement ; notes : notes de l’enseignant ;
   f: true ou step: true : apparition au clic en projection ; mins : minutes prévues ; lvl: 'plus' : approfondissement. */
C.slides.push(

/* ───────── 00 · Ouverture ───────── */
{ id: 'couverture', ch: 'ouv', kind: 'cover', t: 'Chimioarchitecture de l’humeur', short: 'Couverture', mins: 1,
  sub: 'Antidépresseurs et thymorégulateurs : des récepteurs à la prescription',
  notes: 'Se présenter. Annoncer le déroulé : deux heures, des questions posées à la salle en chemin. Chacun y répond pour soi, ou à voix haute s’il le souhaite ; personne n’est interrogé et l’on ne compte rien. Tout est en ligne : diapositives, fiches des molécules, cartes de révision.' },

{ id: 'sea-view', ch: 'ouv', t: 'Staten Island, 1952 : on danse dans les couloirs', short: 'Sea View, 1952', mins: 2,
  b: [
    { hist: 'h-seaview' },
    { pair: { q: 'Un antituberculeux rend euphoriques des patients tuberculeux. En 1952, qu’en auriez-vous conclu, et qu’auriez-vous fait ensuite ?' }, f: true }
  ],
  more: [{ p: 'L’iproniazide est le premier [[mao|inhibiteur de la monoamine oxydase]] utilisé comme antidépresseur. Presque tous les médicaments de ce cours ont été trouvés ainsi, par [[serendipite|sérendipité]] : la théorie est venue après les molécules.' }],
  notes: 'Raconter sans donner la suite. Laisser un silence, puis prendre les réponses de ceux qui veulent bien : un effet indésirable ? un effet de la guérison ? un effet du hasard ? Faire émerger le mot sérendipité. Annoncer le fil du cours : on part des molécules trouvées par hasard pour comprendre les cibles, puis on revient à la prescription.',
  src: 'Mendelson 2020 ; Kreston 2016 ; Shorter 1997' },

{ id: 'pq-delai', ch: 'ouv', kind: 'question', t: 'Question d’ouverture 1 · le délai d’action', short: 'Question d’ouverture 1', mins: 1,
  b: [{ vote: 'pq-delai', kind: 'pre' }],
  notes: 'Lire la question et les quatre options, laisser une dizaine de secondes : chacun choisit pour soi, sans le dire et sans correction. On y reviendra en fin de séance. Le but n’est pas d’avoir juste : une question posée avant le cours améliore la mémorisation de la réponse et du contenu voisin, même quand on s’est trompé (Soderstrom et Bjork 2023).',
  src: 'Stahl 2013, chap. 7, fig. 7-13 à 7-17' },
{ id: 'pq-lithium', ch: 'ouv', kind: 'question', t: 'Question d’ouverture 2 · le lithium et l’ibuprofène', short: 'Question d’ouverture 2', mins: 1,
  b: [{ vote: 'pq-lithium', kind: 'pre' }],
  notes: 'Même consigne : chacun choisit pour soi, pas de correction. Beaucoup penseront « inchangée » ou « baisse ».',
  src: 'RCP Téralithe ; Finley 2016' },
{ id: 'pq-surdosage', ch: 'ouv', kind: 'question', t: 'Question d’ouverture 3 · l’intoxication', short: 'Question d’ouverture 3', mins: 1,
  b: [{ vote: 'pq-surdosage', kind: 'pre' }],
  notes: 'Dernière question d’ouverture. Annoncer : les trois réponses sont dans le cours ; on les reprendra à la fin.',
  src: 'Stahl’s Prescriber’s Guide, 2021' },

{ id: 'objectifs', ch: 'ouv', t: 'Dans deux heures, vous saurez…', short: 'Les objectifs', mins: 1,
  b: [{ objs: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10'], step: true }],
  notes: 'Lire vite, en insistant sur les verbes : décrire, expliquer, lire, prescrire, conduire, changer, adapter. Les cinq premiers objectifs sont des mécanismes ; les cinq derniers, de la prescription.',
  src: '' },

{ id: 'contrat', ch: 'ouv', t: 'Comment on va travailler', short: 'Le contrat', mins: 1,
  b: [
    { cols: [
      { tag: 'Réfléchir', h: 'Des questions en chemin', p: 'Environ toutes les dix minutes, une question à la salle. On y répond pour soi, ou à voix haute si l’on veut ; personne n’est interrogé.' },
      { tag: 'Prédire', h: 'Avant de voir', p: 'Sur la synapse animée et sur la lithiémie : on prédit, on observe, on explique.' },
      { tag: 'Revenir', h: 'Après le cours', p: 'Les diapositives, les fiches des 36 molécules et les cartes de révision espacée restent en ligne.' }
    ], reveal: 'heads' },
    { qr: true, lab: 'Le site du cours', t: 'Diapositives, fiches et cartes de révision', w: 190, f: true }
  ],
  more: [{ p: 'La méthode et ses preuves : apprentissage actif, questions d’ouverture, prédictions, révision espacée.' }, { cta: [{ l: 'La méthode pédagogique', href: '#/methode' }] }],
  notes: 'Dire pourquoi : l’apprentissage actif réduit le taux d’échec d’un tiers environ par rapport au cours magistral (Freeman 2014), même si l’on a l’impression d’apprendre moins (Deslauriers 2019). Rassurer : il suffit de chercher la réponse dans sa tête, c’est l’effort de récupération qui compte. Laisser le QR code affiché quelques secondes.',
  src: 'Freeman et al. 2014 ; Deslauriers et al. 2019' },

/* ───────── 01 · Chimioarchitecture ───────── */
{ id: 'sec-chimio', ch: 'chimio', kind: 'section', t: 'Chimioarchitecture', short: 'Chimioarchitecture', mins: 0.5,
  sub: 'Trois monoamines, une poignée de noyaux, presque tout le cerveau.' },

{ id: 'trois-systemes', ch: 'chimio', t: 'Trois monoamines, nées dans le tronc cérébral', short: 'Trois monoamines', mins: 1.5, obj: ['O2'],
  b: [
    { formula: ['serotonine', 'noradrenaline', 'dopamine'], names: { serotonine: 'sérotonine · 5-HT', noradrenaline: 'noradrénaline · NA', dopamine: 'dopamine · DA' }, w: 210 },
    { cols: [
      { k: 's-5ht', h: 'Sérotonine', p: 'Noyaux du [[raphe|raphé]]. Humeur, anxiété, sommeil, appétit, impulsivité, douleur.' },
      { k: 's-na', h: 'Noradrénaline', p: '[[locus-coeruleus|Locus coeruleus]]. Vigilance, attention, énergie, réponse au stress, douleur.' },
      { k: 's-da', h: 'Dopamine', p: '[[atv|Aire tegmentale ventrale]] et [[substance-noire|substance noire]]. Motivation, plaisir, récompense, mouvement.' }
    ], reveal: 'heads', f: true },
    { p: 'De quelques dizaines de milliers de neurones (locus coeruleus) à quelques centaines de milliers (raphé, mésencéphale dopaminergique), sur environ 86 milliards : une innervation diffuse, qui module presque tout le cerveau.', f: true }
  ],
  more: [{ p: 'Ces trois [[monoamine|monoamines]] sont des petites molécules dérivées d’un acide aminé (le [[tryptophane]] pour la sérotonine, la tyrosine pour les catécholamines). Les autres neurotransmetteurs de ce cours sont le [[glutamate]], excitateur, et le [[gaba|GABA]], inhibiteur, présents partout.' }],
  notes: 'Montrer la ressemblance des trois formules : un cycle et une chaîne terminée par une amine. C’est cette parenté qui explique que les transporteurs et les enzymes reconnaissent plusieurs monoamines (le NET recapte aussi la dopamine, la MAO les dégrade toutes).',
  src: 'Stahl 2013, chap. 6 ; Baker et al., Synapse 1991' },

{ id: 'vie-monoamine', ch: 'chimio', t: 'La vie d’une monoamine, en cinq étapes', short: 'La vie d’une monoamine', mins: 2.5, obj: ['O1'],
  b: [
    { steps: [
      { t: 'Synthèse', p: 'Tryptophane → 5-HT (étape limitante : la [[tph]]) ; tyrosine → DOPA → dopamine → noradrénaline ([[th]], [[ddc]], [[dbh]]).' },
      { t: 'Stockage', p: 'Dans les vésicules, grâce au [[vmat2]]. La réserpine le bloque et vide les réserves.' },
      { t: 'Libération', p: 'À chaque potentiel d’action ; freinée par les [[autorecepteur|autorécepteurs]] 5-HT1A, 5-HT1B/D et α2.' },
      { t: 'Recapture', p: 'Par un transporteur : [[sert]], [[net]], [[dat]]. **C’est la cible des ISRS, des IRSNa et des tricycliques.**' },
      { t: 'Dégradation', p: 'Par la [[mao|monoamine oxydase]] des mitochondries (et la [[comt]] pour les catécholamines). **C’est la cible des IMAO.**' }
    ], reveal: 'heads' },
    { call: 'key', t: 'Chaque étape est une cible ; les récepteurs en sont une sixième : antagonistes α2 (mirtazapine), 5-HT2C (agomélatine), agonistes 5-HT1A (vortioxétine).', f: true }
  ],
  more: [
    { p: 'Le neurotransmetteur libéré a trois destins : se fixer à un récepteur, être recapté par son transporteur, ou diffuser et être dégradé. Bloquer la recapture ou la dégradation augmente sa concentration et sa durée d’action dans la fente.' },
    { mols: ['sertraline', 'venlafaxine', 'amitriptyline', 'iproniazide', 'mirtazapine', 'agomelatine'] }
  ],
  notes: 'Faire nommer à la salle l’étape visée par chaque grande classe : « les ISRS ? la recapture ; les IMAO ? la dégradation ». Insister sur l’autorécepteur : c’est la clé du délai d’action, qu’on verra dans une demi-heure.',
  src: 'Stahl 2013, chap. 6, fig. 6-25, 6-26 et 6-33' },

{ id: 'reserpine', ch: 'chimio', t: '1955 : la réserpine et l’hypothèse monoaminergique', short: 'La réserpine', mins: 1, obj: ['O1'],
  b: [
    { hist: 'h-reserpine' },
    { quote: 'It is possible that the 5-HT in our brains plays an essential part in keeping us sane.', who: 'John Gaddum, 1953', f: true },
    { call: 'trap', t: 'L’[[hypothese-monoaminergique|hypothèse monoaminergique]] est née de molécules trouvées par hasard et d’une observation fragile. Elle explique bien les cibles et les effets indésirables, mal le délai d’action.', f: true }
  ],
  more: [{ hist: 'h-gaddum' }],
  notes: 'Question à la salle : « si la réserpine déprime parce qu’elle vide les monoamines, que devrait faire un médicament qui les augmente ? ». C’est le raisonnement des années 1960. Préciser que la revue de 2023 (35 études) trouve des résultats contradictoires : la base historique de l’hypothèse est mince.',
  src: 'Shorter 1997 ; Baumeister et al. 2003 ; Strawbridge et al. 2023' },

{ id: 'recepteurs', ch: 'chimio', t: 'Deux familles de récepteurs, deux échelles de temps', short: 'Récepteurs', mins: 1.5, obj: ['O1'],
  b: [
    { cols: [
      { tag: 'canal', h: 'Ionotropes', p: 'Le neurotransmetteur ouvre un canal : effet en millisecondes. [[r5ht3|5-HT3]] (nausées), [[nmda|NMDA]] et [[ampa|AMPA]] pour le glutamate, [[gaba-a|GABA-A]].' },
      { tag: 'protéine G', h: 'Métabotropes', p: '[[rcpg|Couplés aux protéines G]] : une cascade intracellulaire, en secondes, jusqu’à l’expression des gènes. 5-HT1A, 5-HT2A, 5-HT2C, α1, α2, β, D2, H1, M1.' }
    ], reveal: 'heads' },
    { cols: [
      { k: 'line', h: 'Autorécepteur', p: 'Sur le neurone qui libère : un **frein**. [[r5ht1a|5-HT1A]] du raphé, [[r5ht1b|5-HT1B/D]] des terminaisons, [[a2|α2]] noradrénergiques.' },
      { k: 'line', h: 'Hétérorécepteur', p: 'Sur un autre neurone : l’α2 des terminaisons sérotoninergiques, le [[r5ht2c|5-HT2C]] qui freine dopamine et noradrénaline.' }
    ], reveal: 'heads', f: true }
  ],
  more: [{ p: 'Un [[agoniste]] active le récepteur, un [[antagoniste]] l’occupe sans l’activer, un [[agoniste-partiel]] l’active à moitié : il augmente l’activité quand le tonus est bas et la diminue quand il est haut (aripiprazole sur D2). La stimulation prolongée d’un récepteur métabotrope conduit à sa [[desensibilisation]].' }],
  notes: 'Le message à retenir : un autorécepteur est un frein. Le bloquer accélère le neurone (α2 et mirtazapine) ; le stimuler le ralentit (5-HT1A en début d’ISRS). Cette idée resservira trois fois.',
  src: 'Stahl 2013, chap. 2 et 3 ; chap. 6, fig. 6-27 à 6-29' },

{ id: 'voies', ch: 'chimio', t: 'Où vont les monoamines', short: 'Les voies', mins: 2.5, obj: ['O2'],
  b: [{ viz: 'voies', controls: true, sys: ['5ht'], steps: [{ sys: ['na'] }, { sys: ['da'] }, { sys: ['5ht', 'na', 'da'] }, { sys: ['5ht', 'na', 'da'], reg: 'pfc' }, { sys: ['5ht', 'na', 'da'], reg: 'nacc' }] }],
  more: [
    { p: 'La sérotonine du raphé dorsal et médian monte vers le cortex préfrontal, le striatum, le thalamus, l’hypothalamus, l’amygdale et l’hippocampe ; le raphé caudal descend vers la moelle (douleur, réflexes sexuels) et l’[[area-postrema|area postrema]] (nausées).' },
    { p: 'La noradrénaline du locus coeruleus innerve tout le cortex, l’hypothalamus, l’amygdale, le cervelet et la moelle. La dopamine suit quatre voies : mésolimbique (vers le [[noyau-accumbens|noyau accumbens]]), mésocorticale (vers le [[cortex-prefrontal|cortex préfrontal]]), nigrostriée (vers le striatum) et tubéro-infundibulaire (vers l’hypophyse).' }
  ],
  notes: 'Le schéma est un plan de lignes, pas une coupe anatomique : chaque système a sa couleur (vert, or, rouge), ses voies ne se croisent pas, et chaque région porte une pastille par système qui l’atteint. On commence par la sérotonine seule, puis la noradrénaline, la dopamine, les trois ensemble. Pour chaque région mise en avant, demander : « quel symptôme de la dépression porte-t-elle ? ». Le cortex préfrontal reçoit les trois systèmes : c’est là que se jouent l’attention, l’énergie et l’émoussement. Le noyau accumbens : l’anhédonie, mal corrigée par les ISRS.',
  src: 'Stahl 2013, chap. 6, fig. 6-31 à 6-33 et 6-44' },

{ id: 'voies-isrs', ch: 'chimio', t: 'Les effets d’un ISRS suivent la carte des projections', short: 'Effets et projections', mins: 2, obj: ['O2'],
  b: [
    { p: 'Prédire : un ISRS augmente la sérotonine partout où arrivent les fibres du raphé. Quels effets indésirables attendre, et où ?' },
    { viz: 'voies', drug: 'isrs', sys: ['5ht'], steps: [{ drug: 'isrs', sys: ['5ht'], reg: 'ap' }, { drug: 'isrs', sys: ['5ht'], reg: 'sc' }, { drug: 'isrs', sys: ['5ht'], reg: 'str' }, { drug: 'isrs', sys: ['5ht'], reg: 'pfc' }, { drug: 'isrs', sys: ['5ht'], reg: 'hip' }] }
  ],
  notes: 'Laisser la salle proposer avant chaque clic : nausées (area postrema, 5-HT3), troubles sexuels (moelle), akathisie et tremblement (la sérotonine freine la dopamine nigrostriée), émoussement (5-HT2C préfrontal), puis l’effet voulu (plasticité hippocampique, hypothèse). Les effets indésirables précoces s’atténuent avec la désensibilisation des récepteurs ; les troubles sexuels persistent souvent.',
  src: 'Stahl 2013, chap. 7, fig. 7-13 à 7-17' },

{ id: 'interactions', ch: 'chimio', t: 'Les monoamines se freinent entre elles', short: 'Interactions entre systèmes', mins: 2, obj: ['O2'],
  b: [
    { cols: [
      { k: 's-5ht', h: 'La sérotonine freine DA et NA', p: 'Par les [[r5ht2c|5-HT2C]]. Stimulés par un ISRS : [[emoussement|émoussement]], apathie. Bloqués (agomélatine, fluoxétine, mirtazapine) : la DA et la NA sont libérées.' },
      { k: 's-na', h: 'Le NET recapte la dopamine', p: 'Le cortex préfrontal a peu de [[dat|DAT]] : bloquer le [[net|NET]] y augmente aussi la dopamine. D’où l’effet sur l’énergie et la concentration.' },
      { k: 's-na', h: 'La NA module la 5-HT', p: 'Elle stimule le raphé par les [[a1|α1]] et freine les terminaisons sérotoninergiques par les [[a2|α2]] : bloquer α2 libère la sérotonine.' }
    ], reveal: 'heads' },
    { call: 'key', t: 'Un médicament dit « sérotoninergique » n’agit jamais sur un seul système : on raisonne en circuits.', f: true }
  ],
  notes: 'Ces trois freins expliquent quatre médicaments : l’agomélatine (5-HT2C), la mirtazapine (α2), les IRSNa (NET préfrontal), et l’émoussement sous ISRS. Les rappeler quand on les rencontrera.',
  src: 'Stahl 2013, chap. 7, fig. 7-18, 7-33, 7-34, 7-44 et 7-45' },

{ id: 'plasticite', ch: 'chimio', t: 'Au-delà des monoamines : glutamate et plasticité', short: 'Glutamate et plasticité', mins: 1.5, obj: ['O1'],
  b: [
    { cols: [
      { k: 's-glu', h: 'Glutamate', p: 'Le principal neurotransmetteur excitateur. Antagoniser le [[nmda|récepteur NMDA]] (eskétamine) provoque une bouffée de glutamate sur les récepteurs [[ampa|AMPA]] et un effet antidépresseur en quelques heures.' },
      { h: 'BDNF et synapses', p: 'Stress chronique et dépression : moins de [[bdnf|BDNF]], moins de synapses dans le cortex préfrontal et l’hippocampe. Antidépresseurs, lithium et kétamine les restaurent chez l’animal.' },
      { k: 's-gaba', h: 'GABA', p: 'Le principal inhibiteur : cible des benzodiazépines, et peut-être d’une part de l’effet du valproate.' }
    ], reveal: 'heads' },
    { p: 'L’[[hypothese-neurotrophique|hypothèse neurotrophique]] relie le délai d’action à la reconstruction des synapses, plutôt qu’à la seule hausse des monoamines.', f: true }
  ],
  more: [{ p: 'La [[neurogenese|neurogenèse]] hippocampique est nécessaire à l’effet comportemental des antidépresseurs chez la souris (Santarelli et al., _Science_ 2003) ; chez l’humain, son rôle reste incertain.' }],
  notes: 'Ne pas trop détailler : l’important est que l’effet antidépresseur passe probablement par la [[plasticite-synaptique|plasticité synaptique]], ce qui rend compte du délai et de l’effet rapide de l’eskétamine.',
  src: 'Stahl 2013, chap. 6, fig. 6-36 à 6-38 ; chap. 7' },

{ id: 'affinite', ch: 'chimio', t: 'Affinité et occupation : lire une empreinte', short: 'Lire une empreinte', mins: 2.5, obj: ['O4'],
  b: [{ viz: 'empreintes', rows: ['paroxetine', 'sertraline', 'amitriptyline', 'mirtazapine', 'quetiapine'], cols: ['sert', 'net', '5ht2a', '5ht2c', 'a1', 'd2', 'h1', 'm1'], steps: [{ col: 'sert' }, { col: 'h1' }, { col: 'm1' }, { row: 'amitriptyline' }, { row: 'mirtazapine' }] }],
  more: [
    { def: { t: 'Affinité (Ki)', p: 'La concentration qui occupe la moitié des récepteurs in vitro ; plus le Ki est petit, plus l’affinité est forte. Le [[pki|pKi]] vaut 9 − log(Ki), avec Ki en nM et un logarithme décimal : 1 nM → 9 ; 100 nM → 7.', src: 'Stahl 2013, chap. 2' } },
    { p: 'L’affinité ne dit pas l’[[occupation]] : elle se compare aux concentrations atteintes aux doses usuelles. Aux doses minimales efficaces, les ISRS occupent environ 80 % du SERT (Meyer et al. 2004). Une cible dont l’affinité est 100 à 1 000 fois plus faible que celle de la cible principale est peu occupée, mais pas toujours négligeable.' },
    { cta: [{ l: 'Toute la matrice des empreintes', href: '#/labos/empreintes' }] }
  ],
  notes: 'Montrer d’abord la colonne SERT (tout le monde sauf mirtazapine et quétiapine), puis H1 (sédation, poids : amitriptyline, mirtazapine, quétiapine), puis M1 (anticholinergiques : amitriptyline, paroxétine dans une moindre mesure). Puis lire deux lignes complètes : l’amitriptyline touche tout, la mirtazapine ne touche pas le SERT.',
  src: 'Wikipédia (PDSP), Ki en nM ; Meyer et al. 2004' },

{ id: 'ct-affinite', ch: 'chimio', kind: 'question', t: 'Question à la salle · affinité et occupation', short: 'Question : la paroxétine', mins: 2, obj: ['O4'],
  b: [{ vote: 'ct-paroxetine' }],
  notes: 'Laisser une minute de réflexion silencieuse. Demander à un ou deux volontaires leur raisonnement, puis révéler la réponse au clic. Si la salle hésite, revenir sur la matrice des empreintes avant d’avancer.',
  src: 'Wikipédia (PDSP) ; Stahl’s Prescriber’s Guide, 2021' },

{ id: 'hypothese', ch: 'chimio', t: 'Ce que l’hypothèse explique, et ce qu’elle n’explique pas', short: 'Limites de l’hypothèse', mins: 1.5, obj: ['O3'],
  b: [
    { cols: [
      { k: 'ok', h: 'Elle explique', ul: ['les cibles des médicaments', 'leurs effets indésirables', 'les interactions : [[syndrome-serotoninergique|syndrome sérotoninergique]], [[effet-fromage|tyramine]]'] },
      { k: 'warn', h: 'Elle n’explique pas', ul: ['le délai, alors que la cible est occupée en quelques heures', 'l’effet en quelques heures de l’eskétamine', 'pourquoi beaucoup de patients ne répondent pas au premier traitement'] }
    ], reveal: 'heads' },
    { p: 'Une revue de synthèse ne trouve pas de preuve d’un déficit de sérotonine dans la dépression (Moncrieff et al. 2023). Cela ne dit rien de l’efficacité des antidépresseurs : ils modifient un système, ils ne corrigent pas un manque.', f: true }
  ],
  notes: 'Les patients posent la question (« on m’a dit que je manquais de sérotonine »). Proposer une formulation honnête : « le médicament agit sur les circuits de l’humeur et favorise leur récupération ; il ne remplace pas une substance qui manquerait ». Transition : le délai d’action est justement la première énigme, qu’on va résoudre sur la synapse.',
  src: 'Moncrieff et al., Mol Psychiatry 2023;28:3243–3256 ; Shorter 1997, p. 397' }
);

/* ─── slides-2 ─── */
/* Diapositives — 02 Antidépresseurs. */
C.slides.push(

{ id: 'sec-ad', ch: 'ad', kind: 'section', t: 'Antidépresseurs', short: 'Antidépresseurs', mins: 0.5,
  sub: 'Un délai d’action, dix mécanismes, vingt-quatre molécules.' },

{ id: 'pharmacopee-ad', ch: 'ad', t: 'Vingt-quatre antidépresseurs en France, rangés par mécanisme', short: 'La pharmacopée', mins: 1, obj: ['O5'],
  b: [{ viz: 'tiles', groups: ['isrs', 'irsna', 'atc', 'imao', 'a2', 'autre'] }],
  more: [
    { p: 'La [[nbn|nomenclature NbN]] (_Neuroscience-based Nomenclature_) nomme un médicament par sa cible et son mode d’action, plutôt que par sa première indication : « inhibiteur de la recapture de la sérotonine » plutôt qu’« antidépresseur », puisque la plupart de ces molécules traitent aussi l’anxiété, le TOC ou la douleur.' },
    { hist: 'h-delay' },
    { cta: [{ l: 'Filtrer la pharmacopée par profil', href: '#/pharmacopee' }] }
  ],
  notes: 'Un clic sur une tuile ouvre la fiche en panneau (aussi en projection). Faire remarquer les tensions d’approvisionnement de 2026 (fluoxétine, venlafaxine, duloxétine, clomipramine, imipramine, maprotiline, iproniazide) : connaître plusieurs options par profil devient une compétence pratique.',
  src: 'ANSM, dossier « Antidépresseurs », 2026 ; Zohar et al. 2015' },

{ id: 'delai-predict', ch: 'ad', t: 'Prédire : que se passe-t-il au premier jour ?', short: 'Prédire le délai', mins: 1.5, obj: ['O3'],
  b: [{ predict: {
    q: 'Un ISRS bloque environ 80 % des transporteurs de la sérotonine dès les premiers jours. **Au premier jour**, la sérotonine libérée aux terminaisons du cortex…',
    opts: ['augmente beaucoup', 'augmente un peu', 'ne change presque pas', 'diminue'],
    obs: 'Elle ne change presque pas : la sérotonine s’accumule d’abord autour des corps cellulaires du raphé, stimule les [[r5ht1a|autorécepteurs 5-HT1A]] et **ralentit la décharge** du neurone.',
    exp: 'Il faut deux à quatre semaines pour que ces autorécepteurs se [[desensibilisation|désensibilisent]] : la décharge reprend et la sérotonine augmente enfin aux terminaisons. Le [[delai-action|délai d’action]] est un délai d’adaptation des neurones, pas un délai pharmacocinétique.' } }],
  notes: 'Laisser chacun choisir sa réponse en silence, puis demander à un ou deux volontaires de la justifier avant de révéler. La plupart pensent A. Puis passer à la synapse animée pour observer. C’est la question d’ouverture 1 sous une autre forme : ne pas encore la corriger explicitement.',
  src: 'Stahl 2013, chap. 7, fig. 7-13 à 7-17 ; Blier et de Montigny' },

{ id: 'synapse-isrs', ch: 'ad', t: 'Observer : la synapse sous ISRS, de J0 à S6', short: 'La synapse sous ISRS', mins: 3, obj: ['O3'],
  b: [{ viz: 'synapse', tour: 'isrs', steps: [{ s: 1 }, { s: 2 }, { s: 3 }, { s: 4 }, { s: 5 }, { s: 6 }] }],
  more: [
    { p: 'Le modèle suit la cascade décrite par Blier et de Montigny : blocage du [[sert|SERT]] → sérotonine accrue au corps cellulaire → freinage par les autorécepteurs 5-HT1A → désensibilisation en deux à quatre semaines → décharge restaurée et libération accrue aux terminaisons → désensibilisation des récepteurs post-synaptiques, qui explique la tolérance aux effets indésirables précoces.' },
    { call: 'note', t: 'Les valeurs sont normalisées et qualitatives : elles illustrent un mécanisme, elles ne prédisent rien chez un patient.' },
    { cta: [{ l: 'Manipuler la synapse', href: '#/labos/synapse' }] }
  ],
  notes: 'Sept étapes, une notion par clic ; le halo clair montre où regarder. 1, la libération : les vésicules fusionnent avec la membrane. 2, la fixation : la sérotonine se pose un instant sur les récepteurs, qui s’allument. 3, la recapture : elle rentre dans la terminaison par le SERT. 4, l’ISRS : les gélules se logent dans les transporteurs, la sérotonine reste dans la fente. 5, on recule pour voir le neurone entier : la sérotonine s’accumule d’abord autour du corps cellulaire, les autorécepteurs 5-HT1A freinent la décharge (l’oscilloscope s’espace). 6, S2–S4 : les autorécepteurs se désensibilisent, la décharge reprend. 7, S4–S6 : la fente s’enrichit, les récepteurs post-synaptiques s’adaptent (tolérance aux nausées). Avant l’étape 5, demander : « que va faire la sérotonine en excès autour du corps cellulaire ? » ; à la fin : « pourquoi faut-il prévenir le patient ? ».',
  src: 'Stahl 2013, chap. 7, fig. 7-13 à 7-17' },

{ id: 'delai-clinique', ch: 'ad', t: 'Ce que le délai change à la consultation', short: 'Le délai en clinique', mins: 1, obj: ['O3'],
  b: [{ viz: 'delai', steps: [{ lvl: 1 }, { lvl: 2 }, { lvl: 3 }, { lvl: 4 }, { lvl: 5 }, { lvl: 6 }] }],
  more: [
    { kpis: [{ v: '≈ 80 %', l: 'occupation du SERT aux doses minimales efficaces des ISRS (Meyer 2004)' }, { v: '≥ 20 %', l: 'baisse de la [[hamd|HAM-D]] à S2 : l’[[amelioration-precoce|amélioration précoce]]' }, { v: '82–100 %', l: 'valeur prédictive négative de son absence (Szegedi 2009)' }] },
    { p: 'La HAS recommande de revoir le patient à une et deux semaines (tolérance, risque suicidaire, observance), puis d’évaluer l’efficacité entre quatre et huit semaines ; chez le sujet âgé, entre six et douze semaines après l’atteinte de la dose minimale efficace.' }
  ],
  notes: 'Les trois repères : S1–S2 on revoit (effets indésirables avant bénéfice, levée d’inhibition et risque suicidaire chez les moins de 25 ans) ; S2 sans aucune amélioration, la réponse ultérieure devient peu probable (valeur prédictive négative élevée, valeur positive faible) ; S4–S8 on évalue la réponse.',
  src: 'HAS 2017 ; Meyer et al. 2004 ; Szegedi et al. 2009' },

{ id: 'isrs', ch: 'ad', t: 'ISRS : une classe, six profils', short: 'Les ISRS', mins: 2, obj: ['O5'],
  b: [{ table: { head: ['Molécule', 'Ce qui la distingue', 'Demi-vie', 'CYP'], rows: [
    ['{{citalopram|Citalopram}}', '[[qt|QT]] dose-dépendant : 40 mg/j au maximum, 20 mg/j après 65 ans', '≈ 33 h', 'faible'],
    ['{{escitalopram|Escitalopram}}', 'Énantiomère actif du citalopram ; QT : 20 mg/j au maximum, 10 mg/j après 65 ans', '≈ 30 h', 'faible'],
    ['{{fluoxetine|Fluoxétine}}', 'Demi-vie très longue : oublis tolérés, arrêt facile, mais IMAO à 5 semaines ; activatrice', '4–6 j (métabolite 4–16 j)', '2D6 +++'],
    ['{{fluvoxamine|Fluvoxamine}}', 'Inhibe le 1A2 : clozapine, théophylline, caféine ; agomélatine contre-indiquée', '17–22 h', '1A2, 2C19 +++'],
    ['{{paroxetine|Paroxétine}}', 'La plus anticholinergique, le [[syndrome-arret|syndrome d’arrêt]] le plus marqué ; signal malformatif', '≈ 24 h', '2D6 +++'],
    ['{{sertraline|Sertraline}}', 'Sûreté démontrée après infarctus ; parmi les mieux documentées en grossesse', '≈ 26 h', 'faible']
  ] }, reveal: 'cells' }],
  more: [{ hist: 'h-carlsson' }],
  notes: 'Les six noms s’affichent seuls ; chaque clic révèle une ligne. Avant de révéler, demander à la salle ce qu’elle sait de la molécule. Puis : « laquelle choisir chez un coronarien ? chez une femme sous tamoxifène ? chez un patient qui oublie ses prises ? ». Sertraline ; pas fluoxétine ni paroxétine (2D6) ; fluoxétine.',
  src: 'RCP (ANSM) ; Stahl’s Prescriber’s Guide, 2021 ; Stahl 2013, fig. 7-18 à 7-23' },

{ id: 'prozac', ch: 'ad', t: 'Indianapolis, 1987 : Lilly 110140', short: 'L’histoire de la fluoxétine', mins: 0.5,
  b: [{ hist: 'h-prozac' }],
  notes: 'Une minute de respiration. Souligner que les ISRS sont les premiers antidépresseurs conçus pour une cible (et non trouvés par hasard), et que leur avantage sur les tricycliques tient surtout à la tolérance et à la sécurité en surdosage, pas à l’efficacité.',
  src: 'Shorter 1997, p. 396–399' },

{ id: 'isrs-ei', ch: 'ad', t: 'Les effets indésirables des ISRS ont une chronologie', short: 'Effets indésirables des ISRS', mins: 1.5, obj: ['O5'],
  b: [
    { cols: [
      { tag: 'premiers jours', h: 'Puis tolérance', ul: ['nausées, diarrhée', 'céphalées', 'anxiété, agitation, insomnie', '[[akathisie|akathisie]], tremblement'] },
      { tag: 'au long cours', h: 'Persistants', ul: ['[[dysfonction-sexuelle|troubles sexuels]]', '[[emoussement|émoussement affectif]]', 'prise de poids modérée', '[[hyponatremie|hyponatrémie]] du sujet âgé, saignements'] },
      { k: 'warn', tag: 'rares', h: 'Graves', ul: ['[[syndrome-serotoninergique|syndrome sérotoninergique]]', '[[virage-maniaque|virage maniaque]]', 'idées suicidaires avant 25 ans', 'hyponatrémie sévère'] }
    ], reveal: 'heads' },
    { call: 'tip', t: 'Prévenir le patient : les effets indésirables arrivent avant le bénéfice, et la plupart s’estompent en une à deux semaines.', f: true }
  ],
  more: [{ p: 'Depuis 2019, les RCP des ISRS et IRSN mentionnent une dysfonction sexuelle pouvant persister après l’arrêt (PRAC, EMA). Les troubles sexuels sont souvent sous-déclarés : les rechercher activement.' }],
  notes: 'La tolérance aux effets précoces correspond à la désensibilisation des récepteurs post-synaptiques, vue sur la synapse. Les troubles sexuels, eux, persistent souvent : c’est une cause fréquente d’arrêt.',
  src: 'Stahl 2013, chap. 7 ; Stahl’s Prescriber’s Guide, 2021 ; EMA PRAC 2019' },

{ id: 'irsna', ch: 'ad', t: 'IRSNa : la noradrénaline dépend de la dose', short: 'Les IRSNa', mins: 1.5, obj: ['O5', 'O4'],
  b: [
    { kpis: [
      { v: '82 / 2 480', l: '{{venlafaxine|Venlafaxine}} : Ki SERT / NET (nM). La NA ne vient qu’aux fortes doses (≥ 150 mg/j environ).' },
      { v: '0,8 / 7,5', l: '{{duloxetine|Duloxétine}} : les deux cibles dès les doses usuelles ; douleur neuropathique diabétique.' },
      { v: '8 / 22', l: '{{milnacipran|Milnacipran}} : profil équilibré, sans CYP, élimination rénale.' }
    ], step: true },
    { cols: [
      { k: 'ok', h: 'Ce que la NA ajoute', p: 'Énergie, concentration ; effet antalgique par les voies descendantes.' },
      { k: 'warn', h: 'Ce qu’elle coûte', p: 'Sueurs, tachycardie, hausse tensionnelle (HTA à contrôler avant de débuter), rétention urinaire ; syndrome d’arrêt marqué avec la venlafaxine.' }
    ], reveal: 'heads', f: true }
  ],
  more: [
    { p: 'Pour la venlafaxine, le blocage du NET n’apparaît qu’aux doses élevées : à 75 mg/j, c’est surtout un inhibiteur de la recapture de la sérotonine. Sa demi-vie courte (5 h ; métabolite 11 h) explique la sensibilité aux oublis.' },
    { p: 'Son métabolite actif, la desvenlafaxine, est formé par le [[cyp2d6|CYP2D6]] : chez un métaboliseur lent ou ultrarapide, le rapport entre les deux change, et un dosage plasmatique de la somme venlafaxine + desvenlafaxine aide à comprendre un échec ou une intolérance. La duloxétine se prend volontiers en deux prises au début pour limiter les nausées ; elle est contre-indiquée en cas d’atteinte hépatique.' }
  ],
  notes: 'Faire le lien avec la diapositive « les monoamines se freinent » : bloquer le NET augmente aussi la dopamine du cortex préfrontal. Question : « un patient sous venlafaxine 75 mg/j est-il sous IRSNa ? » Pas vraiment.',
  src: 'Wikipédia (Tatsumi 1997) ; RCP Effexor LP, Cymbalta ; Stahl 2013, fig. 7-30 à 7-34' },

{ id: 'kuhn', ch: 'ad', t: 'Münsterlingen, 1957 : douze personnes dans la salle', short: 'Kuhn et l’imipramine', mins: 1,
  b: [{ hist: 'h-kuhn' }, { hist: 'h-testfall', f: true }],
  more: [
    { formula: ['chlorpromazine', 'imipramine'], names: { chlorpromazine: 'chlorpromazine', imipramine: 'imipramine' }, w: 230 },
    { p: 'Geigy cherchait un nouvel antipsychotique dérivé de la chlorpromazine. L’imipramine n’en diffère que par son pont central, un pont éthylène (–CH₂–CH₂–) à la place de l’atome de soufre, et par l’absence de chlore : une modification minime, un tout autre médicament. Remettre le chlore donne la clomipramine.' }
  ],
  notes: 'Deux faces de la même histoire : une découverte clinique majeure, et des essais conduits sans consentement. Question ouverte : « qu’est-ce qui a changé depuis ? » (Helsinki 1964, consentement, comités d’éthique).',
  src: 'Shorter 1997, p. 320–323 ; Université de Zurich 2019' },

{ id: 'imipraminiques', ch: 'ad', t: 'Imipraminiques : efficaces, mais ils touchent tout', short: 'Les imipraminiques', mins: 1.5, obj: ['O4', 'O5'],
  b: [{ viz: 'empreintes', rows: ['amitriptyline', 'clomipramine', 'imipramine', 'doxepine', 'dosulepine', 'trimipramine', 'maprotiline', 'sertraline'], cols: ['sert', 'net', '5ht2a', 'a1', 'd2', 'h1', 'm1'], steps: [{ col: 'h1' }, { col: 'm1' }, { col: 'a1' }, { row: 'sertraline' }] }],
  more: [{ p: 'Les « tricycliques » doivent leur nom à leur structure, pas à leur mécanisme ; la maprotiline en a quatre cycles. Leur efficacité est réelle (l’amitriptyline est en tête des comparaisons de Cipriani 2018), mais leur tolérance et leur toxicité les placent en deuxième intention (HAS 2017). La clomipramine reste une référence dans le TOC.' }],
  notes: 'Lire la colonne H1 (sédation, poids), M1 (bouche sèche, constipation, rétention, confusion), α1 (hypotension orthostatique, chutes). Puis la ligne de la sertraline, presque vide en dehors du SERT : c’est toute la différence de tolérance.',
  src: 'Wikipédia (PDSP) ; HAS 2017 ; Cipriani et al. 2018' },

{ id: 'atc-surdosage', ch: 'ad', t: 'Pourquoi les imipraminiques sont dangereux en surdosage', short: 'Surdosage des imipraminiques', mins: 1, obj: ['O4'],
  b: [
    { cols: [
      { tag: 'M1', h: 'Anticholinergique', p: 'Confusion, agitation, mydriase, rétention urinaire, iléus, tachycardie.' },
      { tag: 'α1 · H1', h: 'Hypotension, coma', p: 'Vasoplégie ; sédation jusqu’au coma.' },
      { k: 'warn', tag: 'Na⁺', h: 'Cardiotoxicité', p: 'Blocage des [[canaux-na|canaux sodiques]] cardiaques : QRS élargi, troubles du rythme, convulsions.' }
    ], reveal: 'heads' },
    { call: 'urg', t: 'Intoxication : ECG immédiat ; si le QRS s’élargit, bicarbonate de sodium et réanimation. Chez un patient à risque suicidaire, préférer une autre classe ou délivrer de petites quantités.', f: true }
  ],
  notes: 'C’est la réponse de la question d’ouverture 3, mais ne pas le dire encore. Avant chaque clic, demander : « qu’attendez-vous d’un blocage M1 massif ? α1 et H1 ? des canaux sodiques ? ». Insister sur le lien entre l’empreinte (Na⁺, M1, α1, H1) et le tableau clinique : on peut prédire le tableau d’intoxication à partir des affinités.',
  src: 'Stahl’s Prescriber’s Guide, 2021 ; Stahl 2013, chap. 7' },

{ id: 'imao', ch: 'ad', t: 'IMAO : la tyramine et les fenêtres thérapeutiques', short: 'Les IMAO', mins: 1.5, obj: ['O5', 'O9'],
  b: [
    { hist: 'h-fromage' },
    { cols: [
      { tag: 'irréversible · MAO-A et B', h: '{{iproniazide|Iproniazide}}', p: 'Régime pauvre en tyramine, nombreuses contre-indications ; attendre 15 jours après son arrêt avant tout autre antidépresseur. En rupture de stock.' },
      { tag: 'réversible · MAO-A', h: '{{moclobemide|Moclobémide}}', p: '[[imao-reversible|IMAO réversible]] : effet fromage modeste, prise en fin de repas ; 24 h suffisent après son arrêt.' }
    ], f: true }
  ],
  more: [
    { hist: 'h-moclobemide' },
    { p: 'Aliments riches en tyramine, à éviter sous IMAO irréversible : fromages affinés, charcuteries et viandes fermentées ou faisandées, poissons fumés ou marinés, sauce soja et produits du soja fermenté, choucroute, extraits de levure, bières artisanales ou à la pression, fruits trop mûrs (avocat, banane). Les fromages frais ne posent pas de problème.' },
    { call: 'fr', t: 'L’iproniazide est en rupture depuis novembre 2023, sans date de retour. Restent le moclobémide (AMM) et, après échec des autres antidépresseurs, l’accès compassionnel (ANSM) à d’autres IMAO : phénelzine, tranylcypromine, sélégiline transdermique. Un IMAO irréversible garde une place dans les dépressions résistantes, en particulier atypiques.' }
  ],
  notes: 'La MAO intestinale et hépatique détruit la tyramine alimentaire. Inhibée de façon irréversible, elle la laisse passer : la tyramine entre dans les terminaisons noradrénergiques et chasse la noradrénaline des vésicules, d’où la poussée hypertensive. Retenir surtout les fenêtres : ce sont elles qui évitent le syndrome sérotoninergique au changement.',
  src: 'RCP Marsilid, Moclamine ; ANSM, disponibilité de Marsilid (2026) ; Healy 1997 ; Stahl 2013, chap. 7' },

{ id: 'antagonistes-a2', ch: 'ad', t: 'Antagonistes α2 : lever le frein', short: 'Mirtazapine et miansérine', mins: 2, obj: ['O5', 'O3'],
  b: [{ viz: 'synapse', tour: 'mirta', steps: [{ s: 1 }, { s: 2 }] }],
  more: [
    { hist: 'h-mianserine' },
    { p: 'La {{mirtazapine}} bloque les [[a2|α2]] (frein noradrénergique et frein sur les terminaisons sérotoninergiques), ainsi que les récepteurs 5-HT2A, 5-HT2C et 5-HT3 : la sérotonine libérée agit surtout sur 5-HT1A, d’où peu de nausées et de troubles sexuels. Son affinité très forte pour [[h1|H1]] la rend sédative et orexigène dès 7,5–15 mg.' },
    { p: 'La {{mianserine}} a un profil voisin ; son RCP de 2025 la contre-indique avec les médicaments allongeant le QT, dont le citalopram et l’escitalopram : attention en association.' }
  ],
  notes: 'Trois temps. Le frein : la noradrénaline libérée se fixe aussi sur les autorécepteurs α2 de sa propre terminaison, qui freinent la libération suivante. Demander : « que se passe-t-il si on bloque ce frein ? ». La mirtazapine (les gélules) occupe les α2 : la libération augmente tout de suite, sans délai. Côté sérotonine, elle occupe aussi 5-HT2 et 5-HT3 : la sérotonine libérée agit surtout sur 5-HT1A, d’où la tolérance digestive et sexuelle. Utile chez le patient insomniaque et dénutri, à éviter quand le poids est un problème.',
  src: 'Stahl 2013, chap. 7, fig. 7-44 à 7-47 ; RCP Norset, miansérine' },

{ id: 'trois-mecanismes', ch: 'ad', t: 'Vortioxétine, agomélatine, tianeptine : trois mécanismes à part', short: 'Trois mécanismes à part', mins: 1.5, obj: ['O5'],
  b: [{ cols: [
    { tag: 'multimodal', h: '{{vortioxetine|Vortioxétine}}', p: 'Inhibe le SERT ; agoniste 5-HT1A, agoniste partiel 5-HT1B, antagoniste 5-HT3 et 5-HT7. 10 mg/j (5–20) ; 5 mg/j au départ après 65 ans. Nausées fréquentes au début.' },
    { tag: 'MT1/MT2 + 5-HT2C', h: '{{agomelatine|Agomélatine}}', p: 'Agoniste mélatoninergique, antagoniste 5-HT2C. Peu de troubles sexuels. **Transaminases** avant, puis vers S3, S6, S12, S24 et à chaque augmentation ; pas après 75 ans.' },
    { k: 'warn', tag: 'agoniste µ', h: '{{tianeptine|Tianeptine}}', p: 'Agoniste µ-opioïde : mésusage et dépendance. [[ordonnance-securisee|Ordonnance sécurisée]], 28 jours au plus. Troisième intention (HAS 2017).' }
  ], reveal: 'heads' }],
  more: [
    { hist: 'h-tianeptine' },
    { p: 'La vortioxétine améliore, dans des essais dédiés, la vitesse de traitement de l’information (test DSST), en partie indépendamment de l’humeur (McIntyre et al. 2014) ; l’intérêt clinique de cet effet reste discuté.' }
  ],
  notes: 'L’agomélatine illustre le frein 5-HT2C : en le bloquant, elle libère dopamine et noradrénaline dans le cortex préfrontal, sans ajouter de sérotonine. La tianeptine montre qu’un mécanisme « admis » peut être faux pendant des décennies.',
  src: 'RCP Brintellix, Valdoxan, Stablon ; HAS 2017 ; Gassaway et al. 2014' },

{ id: 'dix-mecanismes', ch: 'ad', t: 'Dix mécanismes, une seule logique : bloquer une sortie ou lever un frein', short: 'Dix mécanismes', mins: 2, obj: ['O5'],
  b: [
    { table: { head: ['Mécanisme', 'Ce qui augmente', 'En France'], rows: [
      ['Inhibition du [[sert|SERT]]', 'sérotonine', 'ISRS, IRSNa, imipraminiques, vortioxétine'],
      ['Inhibition du [[net|NET]]', 'noradrénaline, et dopamine dans le cortex préfrontal', 'IRSNa, imipraminiques (maprotiline surtout)'],
      ['Inhibition du [[dat|DAT]]', 'dopamine', 'bupropion, dont l’AMM française se limite au sevrage tabagique'],
      ['Inhibition de la [[mao|MAO]]', 'les trois monoamines', 'moclobémide ; iproniazide en rupture'],
      ['Antagonisme [[a2|α2]]', 'noradrénaline et sérotonine (frein levé)', '{{mirtazapine}}, {{mianserine|miansérine}}'],
      ['Antagonisme [[r5ht2c|5-HT2C]]', 'noradrénaline et dopamine (frein levé)', '{{agomelatine|agomélatine}}, fluoxétine, mirtazapine'],
      ['Agonisme [[r5ht1a|5-HT1A]]', 'sérotonine ; noradrénaline et dopamine en aval', '{{vortioxetine|vortioxétine}} ; aripiprazole et quétiapine (partiels)'],
      ['Agonisme partiel [[r5ht1b|5-HT1B]]', 'noradrénaline et dopamine', 'vortioxétine'],
      ['Antagonisme [[r5ht3|5-HT3]]', 'noradrénaline (frein levé), et moins de nausées', 'vortioxétine, mirtazapine'],
      ['Antagonisme 5-HT7', 'sérotonine et glutamate (frein levé)', 'vortioxétine']
    ] }, reveal: 'cells' },
    { call: 'key', t: 'Hors monoamines : NMDA (eskétamine, kétamine), MT1/MT2 (agomélatine), µ-opioïde (tianeptine). Après un échec, associer deux mécanismes différents plutôt que deux molécules qui font la même chose.', f: true }
  ],
  more: [{ p: 'Stahl range ainsi tous les antidépresseurs : soit ils empêchent une monoamine de sortir de la synapse (transporteurs) ou d’être détruite (MAO), soit ils lèvent un frein, presque toujours un récepteur qui freine la libération (α2, 5-HT2C, 5-HT3, 5-HT7), soit ils stimulent directement un récepteur (5-HT1A). Ce « chimiogramme » sert à composer une association : un ISRS et un antagoniste α2, par exemple, additionnent deux mécanismes.' }],
  notes: 'Les mécanismes s’affichent seuls : pour chaque ligne, demander à la salle ce que cela augmente et quelles molécules l’utilisent, avant de révéler. Message final : on associe des mécanismes, pas des molécules ; deux ISRS ensemble n’ajoutent rien.',
  src: 'Stahl 2013, chap. 7 ; Rabu 2022 (DU de pharmaco-psychiatrie)' },

{ id: 'esketamine', ch: 'ad', t: 'Eskétamine et kétamine : un effet en quelques heures, sous conditions', short: 'Eskétamine et kétamine', mins: 2, obj: ['O5', 'O8'],
  b: [
    { cols: [
      { k: 's-glu', tag: 'mécanisme', h: 'Antagoniste NMDA', p: 'Bouffée de glutamate → récepteurs AMPA → BDNF et synaptogenèse (hypothèse).' },
      { tag: 'eskétamine · AMM', h: 'Dépression résistante sévère', p: 'Échec de deux antidépresseurs de deux classes dans l’épisode ; moins de 65 ans ; avec un ISRS ou un IRSN. Spray nasal, à l’hôpital.' },
      { tag: 'kétamine IV · accès compassionnel', h: 'Idées suicidaires sévères', p: 'Depuis mars 2026 (ANSM) : 0,5 mg/kg en 40 min, à l’hôpital, par un psychiatre ; seconde dose possible à 24–48 h.' },
      { k: 'warn', tag: 'surveiller', h: 'À chaque séance', p: 'À jeun ; dissociation, sédation, nausées, pression artérielle ; sortie accompagnée, pas de conduite avant le lendemain.' }
    ], reveal: 'heads' },
    { kpis: [{ v: '27 % vs 18 %', l: 'rémission à S8 face à la quétiapine LP (ESCAPE-TRD, en ouvert)' }, { v: 'SMR modéré', l: 'ASMR V : pas de progrès thérapeutique démontré (HAS 2024)' }], f: true }
  ],
  more: [
    { hist: 'h-ketamine' },
    { h: 'Eskétamine (Spravato) en pratique' },
    { ul: [
      'Prescription réservée au psychiatre, administration à l’hôpital. Une séance : 56 ou 84 mg, soit deux ou trois dispositifs de 28 mg (deux pulvérisations, une par narine), à cinq minutes d’intervalle ; deux séances par semaine pendant l’induction (S1–S4), puis espacement.',
      'Ne pas manger dans les 2 heures ni boire dans les 30 minutes qui précèdent (nausées, vomissements).',
      'Pression artérielle avant, puis vers 40 minutes ; surveillance jusqu’à ce que le patient soit stable. Pas de conduite ni de machine avant le lendemain, après une nuit de sommeil.',
      'Contre-indiquée si une hausse de pression artérielle ou intracrânienne serait dangereuse : anévrisme, antécédent d’hémorragie intracérébrale, événement cardiovasculaire de moins de six semaines. Prudence en cas d’antécédent psychotique.'
    ] },
    { h: 'Kétamine IV : le cadre de prescription compassionnelle (ANSM, mars 2026)' },
    { ul: [
      'Indication : idées suicidaires sévères de l’adulte (acte récent, plan, idées quotidiennes envahissantes), évaluées cliniquement par un psychiatre.',
      'À jeun (6 h pour les solides, 2 h pour les liquides) ; report si la pression dépasse 140/90 mmHg ou le pouls 100/min. ECG, saturation et pression en continu pendant la perfusion, puis surveillance d’une heure ; sortie dans les 2 heures, accompagnée.',
      'Stupéfiant : prescription en toutes lettres, mention de l’accès compassionnel sur l’ordonnance. Revoir le patient à 24 et 72 heures ; la prévention du suicide continue (moyens létaux, entourage, VigilanS).',
      'Contre-indications : hypertension, AVC récent, insuffisance cardiaque sévère, trouble de l’usage de la kétamine ; prudence après 65 ans, en cas de trouble psychotique ou de dépression psychotique.'
    ] }
  ],
  notes: 'Deux molécules, deux cadres. L’eskétamine a une AMM étroite : dépression résistante sévère, avec un antidépresseur oral. La kétamine racémique en perfusion dispose depuis mars 2026 d’un cadre de prescription compassionnelle pour les idées suicidaires sévères : c’est un traitement de la crise, pas de la dépression, et la prévention du suicide continue après. Un antidépresseur rapide, mais pas miracle : dans l’essai pivot TRANSFORM-2, l’eskétamine ne faisait gagner que 3,5 points de MADRS de plus que le placebo.',
  src: 'HAS, avis du 17 juillet 2024 ; RCP Spravato ; ANSM, CPC kétamine 2026 ; Reif et al. 2023' },

{ id: 'cipriani', ch: 'ad', t: 'Efficacité et acceptabilité : la méta-analyse en réseau de 2018', short: 'Cipriani 2018', mins: 1, obj: ['O5'],
  b: [
    { kpis: [{ v: '522', l: 'essais randomisés' }, { v: '116 477', l: 'participants' }, { v: 'OR 1,37–2,13', l: 'tous les antidépresseurs font mieux que le placebo' }] },
    { cols: [
      { k: 'ok', h: 'Plus efficaces', p: 'Agomélatine, amitriptyline, escitalopram, mirtazapine, paroxétine, venlafaxine, vortioxétine.' },
      { h: 'Mieux acceptés', p: 'Agomélatine, citalopram, escitalopram, fluoxétine, sertraline, vortioxétine.' }
    ], f: true },
    { call: 'trap', t: 'Les écarts entre molécules sont modestes à côté des écarts entre patients : on choisit d’abord sur le profil d’effets indésirables, les comorbidités et les interactions.', f: true }
  ],
  notes: 'L’acceptabilité est mesurée par les arrêts de traitement, toutes causes confondues. Escitalopram, agomélatine et vortioxétine apparaissent dans les deux listes. Ne pas en faire un classement : les intervalles se recouvrent largement.',
  src: 'Cipriani et al., Lancet 2018;391:1357–66' },

{ id: 'hamilton', ch: 'ad', t: 'Leeds, 1960 : mesurer la dépression', short: 'L’échelle de Hamilton', mins: 1,
  b: [
    { hist: 'h-hamilton' },
    { call: 'trap', t: 'Sur les 17 items de la [[hamd|HAM-D]], trois portent sur le sommeil et six sur l’anxiété et les plaintes somatiques, pour un seul sur l’humeur dépressive : une molécule sédative peut gagner des points sans traiter l’humeur.', f: true }
  ],
  more: [
    { p: 'Les six items d’anxiété et de plaintes somatiques : agitation, anxiété psychique, anxiété somatique, symptômes digestifs, symptômes généraux, hypocondrie. La [[madrs|MADRS]] (1979), en dix items, est centrée sur le cœur de la dépression et a été conçue pour suivre le changement sous traitement.' },
    { p: 'Une circularité à garder en tête : les molécules ont été trouvées par hasard, l’échelle de référence a été construite à l’époque des tricycliques, et l’efficacité des antidépresseurs se mesure avec elle. Une molécule qui agit autrement (sur l’anhédonie, la fatigue, la cognition) peut être sous-estimée par l’outil.' }
  ],
  notes: 'Une minute d’histoire et d’esprit critique. Hamilton était à la fois psychiatre et statisticien ; son échelle est devenue l’étalon des essais. Demander : « quels symptômes une échelle de dépression devrait-elle mesurer ? », puis montrer le poids du sommeil et de l’anxiété dans la HAM-D.',
  src: 'Hamilton, J Neurol Neurosurg Psychiatry 1960 ; Bagby et al., Am J Psychiatry 2004 ; Montgomery et Åsberg 1979' },

{ id: 'cas-choix', ch: 'ad', t: 'Cas : quel antidépresseur pour Mme L. ?', short: 'Cas : Mme L.', mins: 3, obj: ['O5', 'O10'],
  b: [{ pair: { q: 'Mme L., 74 ans, épisode dépressif caractérisé d’intensité modérée. Insomnie, perte de 5 kg en deux mois. Fibrillation atriale sous apixaban ; diurétique thiazidique. Natrémie 134 mmol/L. **Quel antidépresseur, à quelle dose, et que surveillez-vous ?**', lab: 'Cas à discuter avec la salle' } }],
  more: [
    { h: 'Éléments de réponse' },
    { ul: [
      'Une option cohérente : {{mirtazapine}} 7,5 à 15 mg le soir (sommeil, appétit), en surveillant la sédation, les chutes et le poids.',
      'Un ISRS reste possible ({{sertraline}}, {{escitalopram}} ≤ 10 mg/j), mais il cumule deux risques ici : saignements avec l’anticoagulant, [[hyponatremie|hyponatrémie]] avec le thiazidique.',
      'À éviter : les imipraminiques (effets anticholinergiques, hypotension, chutes), le citalopram au-delà de 20 mg/j (QT).',
      'Surveiller : natrémie dans les premières semaines sous ISRS, tolérance à S1–S2, réponse entre S6 et S12 chez le sujet âgé.'
    ] }
  ],
  notes: 'Lire le cas, laisser une à deux minutes de réflexion, puis prendre les propositions de ceux qui veulent et laisser défendre deux options. Le but n’est pas « la » bonne réponse, mais la démarche : profil de symptômes, comorbidités, interactions, risques propres au patient. Faire nommer les risques avant les molécules.',
  src: 'HAS 2017 ; RCP Norset, Zoloft, Seroplex ; OMéDIT Normandie' },

{ id: 'pause', ch: 'ad', kind: 'pause', t: 'Pause · cinq minutes', short: 'Pause', mins: 5,
  b: [{ p: 'Pendant la pause, la synapse est en ligne : choisissez une molécule et avancez étape par étape.' }, { qr: true, lab: 'Laboratoires', t: 'La synapse, les voies, les empreintes, la lithiémie', hash: '#/labos', w: 170 }],
  notes: 'Laisser la vue présentateur ouverte ; reprendre à l’heure. Au retour : « par le haut, par le bas ».' }
);

/* ─── slides-3 ─── */
/* Diapositives — 03 Thymorégulateurs. */
C.slides.push(

{ id: 'sec-thymo', ch: 'thymo', kind: 'section', t: 'Thymorégulateurs', short: 'Thymorégulateurs', mins: 0.5,
  sub: 'Traiter et prévenir, par le haut et par le bas.' },

{ id: 'boussole', ch: 'thymo', t: 'Par le haut, par le bas : la boussole des thymorégulateurs', short: 'La boussole', mins: 2, obj: ['O7'],
  b: [{ viz: 'thymo', steps: [{ i: 0 }, { i: 1 }, { i: 3 }, { i: 2 }, { i: 5 }] }],
  more: [
    { p: 'Stahl distingue les médicaments qui traitent et préviennent « par le haut » (la [[manie]]) de ceux qui le font « par le bas » (la [[depression-bipolaire|dépression bipolaire]]). Peu de molécules couvrent les quatre directions : le lithium et la quétiapine. La [[polarite-predominante|polarité prédominante]] du patient oriente donc le traitement de fond.' },
    { cta: [{ l: 'Explorer la boussole', href: '#/labos/thymo' }] }
  ],
  notes: 'Lire chaque molécule dans le même ordre : traite la manie ? la dépression ? prévient la manie ? la dépression ? Le lithium et la quétiapine font tout ; la lamotrigine travaille « par le bas » (pas d’effet dans la manie) ; l’aripiprazole « par le haut ». Message : un thymorégulateur se choisit selon la polarité du patient.',
  src: 'Stahl 2013, chap. 8, fig. 8-1 et 8-2 ; Yatham et al. 2018 (CANMAT/ISBD)' },

{ id: 'cade', ch: 'thymo', t: 'Bundoora, 1949 : des cobayes, de l’urine et du lithium', short: 'Cade et Schou', mins: 1.5,
  b: [{ hist: 'h-cade' }, { hist: 'h-schou', f: true }],
  more: [{ hist: 'h-sel' }],
  notes: 'Question à la salle : « pourquoi a-t-il fallu vingt et un ans pour que la FDA autorise le lithium ? ». Trois raisons : sa toxicité (les morts de 1949), l’absence de brevet (aucun laboratoire pour financer les essais), et le scepticisme des grandes écoles (Lewis, Shepherd). Le lithium est aussi l’un des premiers médicaments de psychiatrie évalués contre placebo.',
  src: 'Shorter 1997, p. 317–320' },

{ id: 'lithium-mecanismes', ch: 'thymo', t: 'Le lithium n’a pas de récepteur', short: 'Mécanismes du lithium', mins: 1.5, obj: ['O6'],
  b: [
    { cols: [
      { tag: 'signalisation', h: 'IMPase et inositol', p: 'Il inhibe l’[[impase|inositol monophosphatase]] et appauvrit la signalisation par le phosphatidylinositol des récepteurs couplés aux protéines G.' },
      { tag: 'kinase', h: 'GSK-3', p: 'Il inhibe la [[gsk3|GSK-3]], une kinase impliquée dans l’apoptose, la plasticité et les rythmes circadiens.' },
      { tag: 'plasticité', h: 'Neuroprotection', p: 'Il augmente le [[bdnf|BDNF]] et d’autres facteurs neurotrophiques (données surtout animales).' }
    ], reveal: 'heads' },
    { kpis: [{ v: 'OR 0,13', l: 'suicides : lithium contre placebo (48 essais, 6 674 participants)' }, { v: 'OR 0,38', l: 'décès toutes causes' }], f: true }
  ],
  more: [{ p: 'Le lithium est le seul traitement du trouble bipolaire dont l’effet préventif sur le suicide soit démontré par méta-analyse d’essais randomisés (Cipriani et al., _BMJ_ 2013). Des études écologiques associent aussi un lithium plus élevé dans l’eau de boisson à moins de suicides.' }],
  notes: 'Insister : aucune cible réceptorielle, une petite molécule qui suit le sodium dans le rein (d’où tout ce qui va suivre). Ne pas se perdre dans les cascades : l’essentiel est l’effet anti-suicide.',
  src: 'Stahl 2013, chap. 8, fig. 8-3 ; Cipriani et al., BMJ 2013;346:f3646' },

{ id: 'lithium-pratique', ch: 'thymo', t: 'Prescrire le lithium en cinq temps', short: 'Prescrire le lithium', mins: 2.5, obj: ['O6'],
  b: [{ steps: [
    { t: 'Bilan avant', p: 'Créatinine et DFG, protéinurie, ionogramme, calcémie, TSH, glycémie, NFS, ECG ; test de grossesse et contraception.' },
    { t: 'Démarrer', p: '{{lithium|Téralithe 250}} : 2 à 3 comprimés par jour répartis aux repas ; ou Téralithe LP 400 : 1 à 2 comprimés en une prise au dîner, vers 20 h. Puis paliers d’un demi-comprimé selon la lithiémie.' },
    { t: 'Doser', p: 'À l’équilibre, 5 à 7 jours après tout changement. LI : le matin, 12 h après la dernière prise, cible 0,5–0,8 mEq/L. LP : le matin (12 h après la prise) 0,8–1,2, ou le soir (24 h, juste avant la prise) 0,5–0,8.' },
    { t: 'Surveiller', p: 'Lithiémie deux fois par semaine au début, chaque semaine le premier mois, chaque mois le premier trimestre, puis tous les deux mois ; rein, calcémie et TSH régulièrement.' },
    { t: 'Expliquer', p: 'Les signes de surdosage, boire normalement, éviter les AINS, consulter en cas de fièvre, diarrhée ou vomissements.' }
  ], reveal: 'heads' }],
  more: [
    { p: 'L’ISBD propose une cible d’entretien de 0,60–0,80 mmol/L, plutôt 0,40–0,60 chez le sujet âgé ; 0,80–1,00 si la réponse est insuffisante et la tolérance bonne (Nolen et al. 2019). Une [[lithiemie]] n’est interprétable que si l’on connaît l’heure de la dernière prise.' },
    { mols: ['lithium'] }
  ],
  notes: 'Les cinq intitulés d’abord : demander à la salle ce qu’elle mettrait dans chaque temps avant de révéler. L’erreur la plus fréquente : doser la lithiémie trop tôt après la prise, ou sans connaître l’heure. Le RCP envisage l’arrêt si la clairance passe sous 40 mL/min ou décline rapidement.',
  src: 'RCP Téralithe 250 (2025) et LP 400 ; Nolen et al. 2019' },

{ id: 'lithium-titration', ch: 'thymo', t: 'Introduire le lithium : la titration de Téralithe LP 400', short: 'Titrer le lithium', mins: 2.5, obj: ['O6'],
  b: [{ viz: 'lithium', titr: true, steps: [{}, {}, {}, {}] }],
  more: [
    { p: 'Le RCP de Téralithe LP 400 propose de débuter par 1 à 2 comprimés en une prise au dîner, vers 20 h, puis d’ajuster par paliers d’un demi-comprimé selon les lithiémies de J7, de J14 et, si besoin, de J21. Une fois la cible atteinte : une lithiémie chaque semaine le premier mois, chaque mois le premier trimestre, puis tous les deux mois.' },
    { p: 'Chaque palier demande cinq à sept jours pour atteindre son nouvel équilibre (environ cinq demi-vies) : doser plus tôt sous-estime la lithiémie, augmenter avant l’équilibre expose au surdosage. Chez le sujet âgé, doses initiales et paliers plus faibles.' },
    { call: 'fr', t: 'À l’été 2026, Téralithe LP 400 était contingenté et le laboratoire demandait de privilégier Téralithe 250 pour débuter un traitement (remise à disposition annoncée pour fin septembre 2026). Vérifier la disponibilité sur le site de l’ANSM.' },
    { cta: [{ l: 'Rejouer la titration', href: '#/labos/lithiemie' }] }
  ],
  notes: 'Une semaine par clic. À l’ouverture : J1, un comprimé au dîner ; la lithiémie monte et atteint son plateau en cinq à sept jours. À J7, le prélèvement du matin (point blanc, 12 h après la prise) donne 0,40 : demander « que fait-on ? » avant de cliquer. Un demi-comprimé de plus, nouveau plateau, J14 : 0,62 ; encore un demi, J21 : 0,83, dans la cible : on garde deux comprimés. Dernier clic : le même jour, un prélèvement du soir (point noir, 24 h après la prise, juste avant la suivante) donne 0,67. Même dose, autre heure, autre valeur : d’où les deux cibles, et l’heure de la dernière prise à noter sur chaque demande.',
  src: 'RCP Téralithe LP 400 (BDPM, 2026) ; ANSM, septembre 2026' },

{ id: 'lithium-simulateur', ch: 'thymo', t: 'Prédire, puis observer : la lithiémie sur trois semaines', short: 'Simuler la lithiémie', mins: 2.5, obj: ['O6'],
  b: [
    { p: 'Prédire : une patiente stable à 0,7 mEq/L prend de l’ibuprofène à partir du 10ᵉ jour. Que devient sa lithiémie ?' },
    { viz: 'lithium', steps: [{ ints: ['ains'] }, { ints: ['dehy'] }, { gfr: 60 }, { form: 'lp', tabs: 2 }] }
  ],
  more: [
    { p: 'Le lithium est filtré par le glomérule, puis réabsorbé avec le sodium dans le tube proximal. Tout ce qui fait baisser le débit de filtration ou augmente la réabsorption du sodium (déshydratation, régime sans sel, AINS, thiazidiques, IEC et sartans) fait monter la lithiémie ; les thiazidiques peuvent l’augmenter de 25 % à 4 fois, les IEC jusqu’à 4 fois, avec un délai de plusieurs semaines.' },
    { call: 'note', t: 'Modèle pédagogique à un compartiment chez un adulte de 70 kg : il illustre des mécanismes et ne sert pas à doser un patient.' },
    { cta: [{ l: 'Manipuler la lithiémie', href: '#/labos/lithiemie' }] }
  ],
  notes: 'Avant le premier clic, laisser chacun prédire en silence (c’est la question d’ouverture 2). Puis : AINS à J10, la lithiémie monte d’un bon tiers en quelques jours ; gastro-entérite, elle monte plus vite et plus haut ; DFG à 60, la demi-vie s’allonge et l’équilibre est plus haut ; enfin la forme LP : le point blanc est le prélèvement du matin (12 h après la prise), le point noir celui du soir (24 h, juste avant la prise) ; la même patiente a deux valeurs selon l’heure, d’où les deux cibles.',
  src: 'RCP Téralithe ; Finley 2016 ; Osser 2022' },

{ id: 'ct-lithium', ch: 'thymo', kind: 'question', t: 'Question à la salle · le lithium et le sodium', short: 'Question : lithium et sodium', mins: 2, obj: ['O6'],
  b: [{ vote: 'ct-lithium-sodium' }],
  notes: 'Laisser réfléchir, puis prendre une ou deux justifications avant de révéler. Si la salle hésite entre B et A, rappeler que le lithium est un cation qui emprunte les transporteurs du sodium dans le tube proximal.',
  src: 'RCP Téralithe ; Finley 2016' },

{ id: 'lithium-toxicite', ch: 'thymo', t: 'Le lithium : toxicité aiguë, effets au long cours, grossesse', short: 'Toxicité du lithium', mins: 2, obj: ['O6'],
  b: [
    { cols: [
      { k: 'warn', tag: 'intoxication', h: 'Reconnaître, agir', p: 'Nausées, diarrhée, tremblement grossier, soif, troubles de l’équilibre ; puis confusion, syndrome cérébelleux, convulsions, coma, troubles du rythme. Doser, suspendre, réhydrater ; hémodialyse si grave.' },
      { tag: 'au long cours', h: 'Rein, thyroïde, parathyroïdes', p: '[[diabete-insipide|Diabète insipide néphrogénique]], insuffisance rénale chronique ; [[hypothyroidie|hypothyroïdie]] ; [[hyperparathyroidie|hyperparathyroïdie]] et hypercalcémie ; poids, tremblement, acné, psoriasis.' },
      { tag: 'grossesse', h: 'Possible, encadré', p: 'Malformations cardiaques ([[ebstein|maladie d’Ebstein]]), risque 3 à 4 fois plus élevé : éviter surtout avant 9 SA, échocardiographie fœtale si exposition ; lithiémies rapprochées. Allaitement contre-indiqué.' }
    ], reveal: 'heads' }
  ],
  more: [{ p: 'Les signes précoces de surdosage (nausées, tremblement, soif, troubles de l’équilibre) imposent une lithiémie sans attendre. Le RCP contre-indique notamment l’insuffisance cardiaque, la maladie d’Addison et le syndrome de Brugada ; il déconseille les AINS, les diurétiques, les IEC et les sartans.' }],
  notes: 'L’intoxication est souvent iatrogène et progressive (interaction, déshydratation), plus rarement volontaire. Le message pratique : toute diarrhée, vomissements ou fièvre chez un patient sous lithium → lithiémie.',
  src: 'RCP Téralithe 250 (2025) ; Stahl’s Prescriber’s Guide, 2021' },

{ id: 'valproate', ch: 'thymo', t: 'Valproate : efficace dans la manie, interdit pendant la grossesse', short: 'Le valproate', mins: 2, obj: ['O7'],
  b: [
    { hist: 'h-grenoble' },
    { cols: [
      { k: 'warn', h: 'Femme en âge de procréer', p: 'Contre-indiqué pendant la grossesse dans le trouble bipolaire : malformations ≈ 11 %, [[tnd|troubles du neurodéveloppement]] 30–40 %. Programme de prévention et [[attestation-annuelle|attestation annuelle]].' },
      { h: 'Homme, depuis 2025', p: 'Prescription initiale par un psychiatre, un neurologue ou un pédiatre ; attestation annuelle ; contraception jusqu’à 3 mois après l’arrêt.' },
      { h: 'Effets indésirables', p: 'Poids, tremblement, alopécie ; hépatite, pancréatite, [[hyperammoniemie|hyperammoniémie]], thrombopénie.' }
    ], reveal: 'heads', f: true }
  ],
  more: [{ p: 'En France, l’AMM psychiatrique concerne le {{divalproate}} (Dépakote) et le {{valpromide}} (Dépamide), dans la manie en cas de contre-indication ou d’intolérance au lithium. Le valproate de sodium (Dépakine) n’a l’AMM que dans l’épilepsie. Le valproate [[inhibiteur-enzymatique|inhibe]] la glucuronidation : il double les taux de lamotrigine.' }],
  notes: 'Le risque tératogène du valproate est le plus élevé de tous les médicaments de ce cours. Depuis janvier 2025, les règles s’étendent aux hommes, car un risque de troubles neurodéveloppementaux a été rapporté chez les enfants de pères traités dans les trois mois précédant la conception.',
  src: 'ANSM 2018, 2021 et 2025 ; RCP Dépakote, Dépamide ; Monneret 2016' },

{ id: 'carba-lamo', ch: 'thymo', t: 'Carbamazépine et lamotrigine : deux anticonvulsivants, deux pièges', short: 'Carbamazépine et lamotrigine', mins: 1.5, obj: ['O7'],
  b: [{ cols: [
    { tag: 'par le haut · 2e ligne', h: '{{carbamazepine|Carbamazépine}}', ul: ['Prévention des rechutes si le lithium est contre-indiqué ou mal toléré ; manie', '[[inducteur-enzymatique|Inducteur]] puissant, et de son propre métabolisme : contraception œstroprogestative inefficace', '[[toxidermie|Toxidermie]] grave, surtout si [[hla-b1502|HLA-B*1502]] ; [[agranulocytose]] ; hyponatrémie', 'Attestation annuelle chez la femme'] },
    { tag: 'par le bas', h: '{{lamotrigine|Lamotrigine}}', ul: ['Prévention des épisodes dépressifs du trouble bipolaire I à prédominance dépressive', 'Aucun effet dans la manie aiguë', '**Titration lente** pour éviter la toxidermie : 25 mg/j deux semaines, 50 mg/j deux semaines, puis 100 et 200 mg/j', 'Avec le valproate : doses divisées par deux'] }
  ], reveal: 'heads' }],
  notes: 'Le piège de la carbamazépine : les interactions (elle diminue les taux de nombreux médicaments, dont les contraceptifs, les antipsychotiques et elle-même). Le piège de la lamotrigine : la titration ; après une interruption de plus de cinq demi-vies, on recommence la titration.',
  src: 'RCP Tégrétol, Lamictal ; Stahl 2013, fig. 8-8 à 8-11' },

{ id: 'apa2g', ch: 'thymo', t: 'Antipsychotiques de 2e génération : des thymorégulateurs à part entière', short: 'Antipsychotiques', mins: 2, obj: ['O7'],
  b: [{ table: { head: ['Molécule', 'AMM en France dans le trouble bipolaire', 'À surveiller'], rows: [
    ['{{quetiapine|Quétiapine LP}}', 'Manie, **dépression bipolaire**, prévention chez les répondeurs', 'Sédation, poids, métabolique'],
    ['{{aripiprazole|Aripiprazole}}', 'Manie, prévention des récidives maniaques', 'Akathisie, impulsivité'],
    ['{{olanzapine|Olanzapine}}', 'Manie, prévention chez les répondeurs', 'Poids et diabète +++'],
    ['{{risperidone|Rispéridone}}', 'Manie', 'Prolactine, syndrome extrapyramidal'],
    ['Asénapine, cariprazine, lurasidone', 'Non commercialisées en France', 'Recommandées par CANMAT']
  ] }, reveal: 'cells' }],
  more: [{ p: 'La quétiapine est le seul médicament ayant l’AMM dans la dépression bipolaire en France (300 mg/j au coucher, après une titration sur quatre jours). Les antidépresseurs en monothérapie sont contre-indiqués dans le trouble bipolaire, et à proscrire dans les [[etat-mixte|états mixtes]].' }],
  notes: 'Faire le lien avec l’empreinte : la quétiapine est un antihistaminique à faible dose (sédation) et un inhibiteur du NET par son métabolite (effet antidépresseur), un antagoniste D2 seulement aux doses antimaniaques.',
  src: 'RCP et avis CT (HAS) ; Vidal, recommandations trouble bipolaire ; Yatham et al. 2018' },

{ id: 'ct-bipolaire', ch: 'thymo', kind: 'question', t: 'Question à la salle · la dépression bipolaire', short: 'Question : dépression bipolaire', mins: 2.5, obj: ['O7'],
  b: [{ vote: 'ct-bipolaire' }],
  notes: 'Laisser réfléchir, puis prendre une ou deux justifications. Le distracteur le plus souvent choisi est la sertraline : rappeler qu’un antidépresseur seul est contre-indiqué dans le trouble bipolaire (virage, cycles rapides).',
  src: 'RCP Xeroquel LP ; Yatham et al. 2018' }
);

/* ─── slides-4 ─── */
/* Diapositives — 04 Stratégies et 05 Clôture. */
C.slides.push(

{ id: 'sec-strat', ch: 'strat', kind: 'section', t: 'Stratégies', short: 'Stratégies', mins: 0.5,
  sub: 'Choisir, suivre, changer, associer, arrêter.' },

{ id: 'choisir', ch: 'strat', t: 'Choisir le premier antidépresseur : les lignes de la HAS', short: 'Les lignes de la HAS', mins: 1, obj: ['O5'],
  b: [
    { cols: [
      { tag: '1re intention', h: 'ISRS, IRSNa, autres', p: 'Épisode modéré à sévère : un ISRS, un IRSNa ou un « autre » antidépresseur (mirtazapine, miansérine, vortioxétine).' },
      { tag: '2e intention', h: 'Imipraminiques', p: 'Efficaces, mais toxiques pour le cœur et en surdosage.' },
      { tag: '3e intention', h: 'Tianeptine, agomélatine', p: 'Mésusage pour l’une, hépatotoxicité pour l’autre.' },
      { k: 'line', tag: 'dernier recours', h: 'IMAO', p: 'Par un spécialiste.' }
    ], reveal: 'heads', min: 10 },
    { call: 'trap', t: 'Pas d’antidépresseur dans un épisode léger ni dans une symptomatologie dépressive subsyndromique : psychothérapie et suivi d’abord.', f: true }
  ],
  more: [
    { p: 'La HAS autorise une benzodiazépine pendant deux semaines au plus si l’anxiété ou l’insomnie sont au premier plan. Elle recommande d’informer le patient du délai d’action et des effets indésirables prévisibles, et de le revoir à une et deux semaines.' },
    { p: 'Ce qui oriente le choix dans cette ligne : la sévérité et la forme de l’épisode, la réponse et la tolérance antérieures (y compris chez un apparenté du premier degré), les comorbidités somatiques et psychiatriques, les interactions, la préférence du patient, la disponibilité du médicament. La décision croise les données de la recherche, l’expérience du clinicien et la préférence du patient.' }
  ],
  notes: 'La première ligne est large : le choix dans cette ligne se fait sur le profil du patient (diapositive suivante).',
  src: 'HAS 2017, Épisode dépressif caractérisé de l’adulte' },

{ id: 'dimensions', ch: 'strat', t: 'Choisir selon la dimension qui domine', short: 'Les dimensions', mins: 1.5, obj: ['O2', 'O5'],
  b: [{ split: [
    [{ fig: 'dimensions' }],
    [{ ul: [
      'Fatigue, manque d’énergie, difficultés de concentration : **noradrénaline et dopamine**. Un IRSNa, ou une molécule qui lève le frein 5-HT2C (agomélatine) ; la fatigue est un symptôme résiduel fréquent sous ISRS.',
      'Anxiété, irritabilité, impulsivité : **sérotonine et noradrénaline**. ISRS ou IRSNa ; mirtazapine si l’insomnie domine.',
      'Perte du plaisir et de la motivation : **dopamine**. Mal corrigée par les ISRS, qui peuvent émousser : rechercher un [[emoussement|émoussement]] induit avant d’augmenter la dose.'
    ], f: true },
    { call: 'note', t: 'Une carte simplifiée, pas une loi : elle sert surtout à choisir une deuxième ligne ou une association quand une dimension résiste.', f: true }]
  ], r: '1.1fr' }],
  more: [{ p: 'Stahl propose de traiter la dépression dimension par dimension : repérer le symptôme qui domine ou qui persiste, le relier aux circuits et aux monoamines qui le portent, puis choisir le mécanisme qui les cible ((dix-mecanismes|les dix mécanismes)). Les recouvrements expliquent qu’un même symptôme réponde à plusieurs classes, et qu’aucune molécule ne cible une seule dimension.' }],
  notes: 'Montrer d’abord les trois cercles et demander à la salle ce que porte chaque monoamine, puis révéler les dimensions propres, les recouvrements, et le centre : l’humeur et la cognition dépendent des trois. Faire ensuite le lien avec une plainte réelle : « ma patiente va mieux, mais elle n’a toujours envie de rien » → la dopamine, l’émoussement possible sous ISRS.',
  src: 'Stahl 2013, chap. 7 ; Rabu 2022 (DU de pharmaco-psychiatrie)' },

{ id: 'choisir-profil', ch: 'strat', t: 'Puis choisir selon le patient', short: 'Choisir selon le patient', mins: 1.5, obj: ['O5', 'O10'],
  b: [{ table: { head: ['Situation', 'Plutôt', 'Plutôt pas'], rows: [
    ['Insomnie, perte d’appétit', '{{mirtazapine}}, {{mianserine|miansérine}}', '—'],
    ['Surpoids, diabète', 'ISRS, {{vortioxetine|vortioxétine}}', 'mirtazapine, imipraminiques, quétiapine'],
    ['Troubles sexuels redoutés', 'mirtazapine, {{agomelatine|agomélatine}}, vortioxétine', 'paroxétine, ISRS à forte dose'],
    ['Coronaropathie', '{{sertraline}}', 'imipraminiques ; citalopram, escitalopram si QT'],
    ['Risque suicidaire, médicaments à portée', 'ISRS, mirtazapine', 'imipraminiques (surdosage)'],
    ['Douleur neuropathique', '{{duloxetine|duloxétine}}, {{amitriptyline}} à faible dose', '—'],
    ['Polymédication', 'sertraline, {{escitalopram}}', 'fluoxétine, paroxétine, fluvoxamine'],
    ['Sujet âgé', 'sertraline, escitalopram ≤ 10 mg/j, mirtazapine', 'imipraminiques, paroxétine']
  ] }, reveal: 'cells' }],
  more: [{ viz: 'tiles' }],
  notes: 'Les situations s’affichent seules : pour chacune, demander à la salle ce qu’elle choisirait avant de révéler la ligne. Ce tableau n’est pas une recommandation officielle : c’est le raisonnement par profil d’effets indésirables vu sur les empreintes. En lecture, la pharmacopée filtrable sous le tableau permet de croiser plusieurs critères.',
  src: 'RCP ; Stahl’s Prescriber’s Guide, 2021 ; HAS 2017' },

{ id: 'formes-cliniques', ch: 'strat', t: 'Mélancolique, psychotique, atypique : la forme change le traitement', short: 'Les formes cliniques', mins: 1.5, obj: ['O8', 'O10'],
  b: [
    { cols: [
      { tag: 'plaisir aboli, réveil précoce, ralentissement', h: '[[melancolie|Mélancolique]]', p: 'Les imipraminiques (clomipramine) ont fait mieux que le citalopram et la paroxétine chez des patients hospitalisés (essais danois DUAG, 1986 et 1990) ; venlafaxine en alternative ; ECT si l’état est grave. Le niveau de preuve d’une supériorité reste modeste.' },
      { k: 'warn', tag: 'idées délirantes, hallucinations', h: '[[caracteristiques-psychotiques|Psychotique]]', p: 'Associer un antidépresseur et un antipsychotique de 2e génération (olanzapine, quétiapine) : plus efficace que l’un ou l’autre seul (Cochrane 2021, preuves de faible niveau). STOP-PD : 42 % de rémission sous olanzapine + sertraline, contre 24 % sous olanzapine seule. L’ECT est la plus rapide dans les formes sévères.' },
      { tag: 'humeur réactive, hyperphagie, hypersomnie', h: '[[caracteristiques-atypiques|Atypique]]', p: 'Les IMAO font mieux que les imipraminiques ; les ISRS sont efficaces et mieux tolérés. Ces formes sont plus fréquentes dans le trouble bipolaire, surtout de type II : le rechercher.' }
    ], reveal: 'heads' },
    { call: 'key', t: 'Rechercher ces caractéristiques à chaque épisode : elles changent le traitement, et l’ECT n’y est pas un dernier recours.', f: true }
  ],
  more: [{ p: 'Dans STOP-PD, l’antidépresseur était donné à dose pleine (sertraline 150 à 200 mg/j) avec l’olanzapine (15 à 20 mg/j) ; on évite les antipsychotiques de 1re génération. Après la rémission, poursuivre l’olanzapine 36 semaines a ramené les rechutes de 55 % à 20 % (STOP-PD II), au prix d’une prise de poids (2,6 kg de plus en moyenne).' }],
  notes: 'Les trois intitulés d’abord : pour chacun, demander à la salle ce qu’elle proposerait. La forme psychotique est la plus importante à ne pas manquer : un antidépresseur seul y est insuffisant, et l’ECT y est souvent le traitement le plus rapide. Dans la forme atypique, penser à la bipolarité.',
  src: 'DUAG 1986 et 1990 ; Kruizinga et al., Cochrane 2021 ; Meyers et al. 2009 ; Flint et al. 2019 ; Pae et al. 2009' },

{ id: 'suivre', ch: 'strat', t: 'Suivre : les repères des huit premières semaines, et après', short: 'Suivre le traitement', mins: 1, obj: ['O3'],
  b: [{ steps: [
    { t: 'S1 et S2', p: 'Revoir : tolérance, observance, idées suicidaires (surtout avant 25 ans), virage.' },
    { t: 'S2', p: 'Aucune amélioration (moins de 20 %) : une réponse ultérieure devient peu probable ; vérifier la dose et l’observance.' },
    { t: 'S4 à S8', p: 'Évaluer la [[reponse|réponse]] (baisse d’au moins 50 % de la [[madrs|MADRS]]) ; chez le sujet âgé, S6 à S12 après la dose minimale efficace.' },
    { t: 'Rémission', p: 'Poursuivre 6 mois à 1 an après la [[remission|rémission]], au moins 1 an chez le sujet âgé, plus longtemps si les épisodes se répètent.' },
    { t: 'Arrêt', p: 'Progressif, sur plusieurs semaines ou mois, en période de stabilité.' }
  ], reveal: 'heads' }],
  notes: 'Distinguer [[rechute]] (retour des symptômes pendant l’épisode traité) et [[recidive|récidive]] (nouvel épisode après la guérison) : c’est ce qui justifie les six mois de consolidation.',
  src: 'HAS 2017 ; Szegedi et al. 2009' },

{ id: 'echec', ch: 'strat', t: 'Pas de réponse : vérifier, optimiser, puis changer ou associer', short: 'Après un échec', mins: 2, obj: ['O8'],
  b: [{ steps: [
    { t: 'Vérifier', p: 'Le diagnostic (bipolarité ?), l’observance, les comorbidités (addictions, thyroïde), les interactions.' },
    { t: 'Optimiser', p: 'Dose maximale tolérée, 4 à 6 semaines à la dose cible.' },
    { t: 'Réponse partielle', p: '[[association|Associer]] un antagoniste α2 : {{mirtazapine}} 15–30 mg/j ou {{mianserine|miansérine}} 30–60 mg/j ; ou [[potentialisation|potentialiser]].' },
    { t: 'Non-réponse', p: 'Changer de classe, par un [[switch-croise|changement croisé]] (sauf avec un IMAO).' },
    { t: 'Potentialiser', p: '{{lithium|Lithium}} (0,5–0,8 mEq/L) ou {{quetiapine|quétiapine}} (50–150 mg/j) ; puis {{aripiprazole}} (2,5–10 mg/j) ou T3 (25–50 µg/j).' }
  ], reveal: 'heads' }],
  more: [{ p: 'Avant d’associer la miansérine, vérifier les autres traitements : son RCP de 2025 la contre-indique avec les médicaments qui allongent le QT, dont le citalopram et l’escitalopram. La lamotrigine (200–400 mg/j) fait partie des options de potentialisation de 2e intention dans les recommandations françaises.' }],
  notes: 'Ces stratégies viennent des recommandations françaises d’experts (méthode RAND/UCLA). Question à poser : « réponse partielle ou non-réponse ? » change la décision : on garde ce qui marche à moitié, on change ce qui ne marche pas.',
  src: 'Bennabi et al., BMC Psychiatry 2019;19:262' },

{ id: 'switch', ch: 'strat', t: 'Changer d’antidépresseur sans danger', short: 'Changer d’antidépresseur', mins: 1.5, obj: ['O9'],
  b: [
    { table: { head: ['De', 'Vers', 'Comment'], rows: [
      ['ISRS ou IRSNa', 'autre ISRS, IRSNa, mirtazapine', 'Changement croisé sur 1 à 2 semaines, ou relais direct à dose équivalente'],
      ['ISRS (sauf fluoxétine), venlafaxine', 'IMAO irréversible', 'Arrêt, puis 1 semaine'],
      ['Fluoxétine', 'IMAO irréversible', 'Arrêt, puis **5 semaines** (norfluoxétine)'],
      ['IMAO irréversible', 'tout autre antidépresseur', 'Arrêt, puis 2 semaines (15 jours)'],
      ['Moclobémide', 'IMAO non sélectif', 'Arrêt, puis 24 heures']
    ] }, reveal: 'cells' },
    { call: 'key', t: 'On ne croise jamais avec un IMAO : c’est le terrain du [[syndrome-serotoninergique|syndrome sérotoninergique]].', f: true }
  ],
  more: [{ p: 'Le changement croisé consiste à diminuer le premier antidépresseur pendant qu’on augmente le second. Il limite le [[syndrome-arret|syndrome d’arrêt]] et le temps sans traitement, au prix d’effets indésirables cumulés pendant quelques jours. Les délais du tableau sont ceux des RCP français.' }],
  notes: 'La logique des délais : cinq demi-vies du médicament arrêté (fluoxétine : la norfluoxétine), ou le temps de resynthèse de la MAO après un IMAO irréversible (environ deux semaines).',
  src: 'RCP Prozac, Effexor LP, Seroplex, Marsilid, Moclamine ; Bennabi et al. 2019' },

{ id: 'ct-switch', ch: 'strat', kind: 'question', t: 'Question à la salle · le changement vers un IMAO', short: 'Question : vers un IMAO', mins: 2, obj: ['O9'],
  b: [{ vote: 'ct-switch' }],
  notes: 'Laisser réfléchir, puis prendre une ou deux justifications avant de révéler. Le piège : le délai de 15 jours concerne l’autre sens (après l’arrêt d’un IMAO).',
  src: 'RCP Prozac, Marsilid' },

{ id: 'resistance', ch: 'strat', t: 'Dépression résistante : définir avant de traiter', short: 'Dépression résistante', mins: 1.5, obj: ['O8'],
  b: [
    { def: { t: 'Dépression résistante', p: 'Échec d’au moins deux antidépresseurs bien conduits : dose adéquate, 4 à 6 semaines à la dose cible, bonne observance.', src: 'Bennabi et al. 2019' } },
    { cols: [
      { h: 'Potentialiser', p: 'Lithium, quétiapine ; aripiprazole, T3.' },
      { h: 'ECT', p: 'Efficace et rapide ; mélancolie, catatonie, sujet âgé, urgence vitale.' },
      { h: 'rTMS', p: 'À partir de la quatrième ligne.' },
      { k: 's-glu', h: 'Eskétamine', p: 'Épisode sévère, adulte de moins de 65 ans, à l’hôpital.' }
    ], reveal: 'heads', min: 9 },
    { call: 'trap', t: 'Avant de conclure à la résistance : revoir le diagnostic (bipolarité, trouble de la personnalité), l’observance, les addictions, la thyroïde, les interactions.', f: true }
  ],
  more: [
    { p: 'L’[[ect|électroconvulsivothérapie]] n’est pas réservée à la résistance : elle se discute d’emblée en cas d’urgence vitale (refus alimentaire, risque suicidaire majeur), de catatonie ou de mélancolie délirante. La [[rtms|rTMS]] est proposée par les recommandations françaises à partir de la quatrième ligne.' },
    { p: 'Associer, c’est additionner des mécanismes différents ((dix-mecanismes|les dix mécanismes)), en partant de la dimension qui résiste ((dimensions|les dimensions)). Les molécules encore hors recommandations sont présentées juste après ((pistes|les pistes)).' }
  ],
  notes: 'La « pseudo-résistance » est fréquente : dose insuffisante, durée trop courte, non-observance, interaction (inducteur enzymatique, tabac). La vérifier coûte moins cher qu’une potentialisation.',
  src: 'Bennabi et al. 2019 ; HAS, avis eskétamine 2024' },

{ id: 'pistes', ch: 'strat', lvl: 'plus', t: 'Et ensuite ? Des pistes, pas encore des recommandations', short: 'Les pistes', mins: 0.5, obj: ['O8'],
  b: [
    { cols: [
      { tag: 'agoniste D2/D3', h: 'Pramipexole', p: 'Pour l’anhédonie et le ralentissement. Essai PAX-D (2025), en association dans la dépression résistante : 44 % de réponse à 12 semaines, contre 16 % sous placebo ; un patient sur cinq arrête pour nausées, troubles du sommeil ou vertiges. Surveiller l’impulsivité.' },
      { tag: 'agoniste 5-HT2A', h: 'Psilocybine', p: 'Une ou deux séances encadrées : 3,6 à 3,8 points de MADRS de plus que le contrôle à 6 semaines, dans deux essais de phase 3 (2025–2026). Demande d’autorisation en cours aux États-Unis ; prescrite en Australie depuis 2023 ; en France, seulement en recherche.' },
      { tag: 'psychostimulants', h: 'Méthylphénidate, modafinil', p: 'Fatigue, apathie, hypersomnie : un effet à court terme des psychostimulants oraux, dans des essais petits et de faible qualité ; pas d’effet démontré du modafinil sur la dépression (Cochrane 2008).' },
      { tag: 'antagoniste NMDA', h: 'Dextrométhorphane-bupropion', p: 'Autorisé aux États-Unis depuis 2022 : le bupropion inhibe le CYP2D6 et prolonge l’action du dextrométhorphane. Non disponible en France.' }
    ], reveal: 'heads', min: 9 },
    { call: 'note', t: 'Hors AMM en France ou non disponibles : à discuter en équipe spécialisée, ou dans le cadre d’un essai clinique.', f: true }
  ],
  more: [{ p: 'Ces molécules ont souvent été repérées en dehors de la dépression, sur une dimension : le pramipexole dans la maladie de Parkinson (ralentissement, apathie), les psychostimulants dans le TDAH et la narcolepsie (attention, vigilance). Leur effet sur une dimension peut être mal capté par les échelles de dépression classiques ((hamilton|l’échelle de Hamilton)).' }],
  notes: 'Diapositive d’approfondissement, à survoler si le temps manque. Le pramipexole est la piste la mieux étayée en association (PAX-D), au prix d’effets indésirables fréquents. La psilocybine se donne en séances encadrées, avec préparation et intégration : ce n’est pas un traitement à emporter.',
  src: 'Browning et al., Lancet Psychiatry 2025 ; Compass Pathways 2025–2026 ; TGA 2023 ; Candy et al., Cochrane 2008 ; FDA 2022' },

{ id: 'bipolaire-phases', ch: 'strat', t: 'Trouble bipolaire : un traitement par phase', short: 'Bipolaire : par phase', mins: 1, obj: ['O7'],
  b: [{ cols: [
    { tag: 'manie', h: 'Par le haut', ul: ['Arrêter tout antidépresseur', 'Lithium, antipsychotique de 2e génération, valproate (hors femme en âge de procréer)', 'Benzodiazépine pour l’agitation et le sommeil'] },
    { tag: 'dépression', h: 'Par le bas', ul: ['{{quetiapine|Quétiapine}} (seule AMM), lithium ; lamotrigine pour prévenir', 'Antidépresseur seulement associé à un thymorégulateur', 'Jamais en cas d’[[etat-mixte|état mixte]]'] },
    { tag: 'entretien', h: 'Dans la durée', ul: ['Poursuivre ce qui a marché en aigu', 'Le lithium en premier choix', 'Selon la [[polarite-predominante|polarité prédominante]] ; psychoéducation'] }
  ], reveal: 'heads' }],
  more: [{ p: 'Sous antidépresseur, le risque de virage en traitement aigu est d’environ 14 % dans le trouble bipolaire de type I, 7 % dans le type II et 1,5 % dans la dépression unipolaire (méta-analyse de Bond et al. 2008). Les imipraminiques et les IRSNa y exposent davantage que les ISRS et le bupropion ; dans le type I, un antidépresseur ne se prescrit qu’avec un thymorégulateur, et jamais dans un état mixte (ISBD 2013).' }],
  notes: 'La règle d’or : chez un patient bipolaire, un antidépresseur n’est jamais seul. Les [[cycles-rapides|cycles rapides]] et les états mixtes sont aggravés par les antidépresseurs.',
  src: 'Yatham et al. 2018 ; Pacchiarotti et al. 2013 ; Bond et al. 2008' },

{ id: 'populations', ch: 'strat', t: 'Grossesse, sujet âgé, cœur, rein et foie', short: 'Situations particulières', mins: 1, obj: ['O10'],
  b: [{ cols: [
    { tag: 'grossesse', h: 'Ne pas arrêter brutalement', ul: ['Vérifier chaque molécule sur le [[crat|CRAT]]', 'Sertraline parmi les mieux documentés', 'Lithium possible, encadré ; valproate contre-indiqué', 'Surveillance néonatale ([[htap|HTAP]], adaptation)'] },
    { tag: 'sujet âgé', h: 'Commencer bas, monter lentement', ul: ['[[hyponatremie|Hyponatrémie]], chutes', 'Citalopram ≤ 20 mg/j, escitalopram ≤ 10 mg/j', 'Éviter les anticholinergiques', 'Lithium : 0,4–0,6 mmol/L'] },
    { tag: 'cœur', h: 'QT et tension', ul: ['Sertraline après infarctus', '[[qt|QT]] : citalopram, escitalopram, miansérine', 'Imipraminiques contre-indiqués après infarctus récent', 'HTA : venlafaxine, duloxétine, milnacipran'] },
    { tag: 'rein · foie', h: 'Adapter', ul: ['Lithium ; milnacipran (rein)', 'Duloxétine contre-indiquée sous 30 mL/min et en insuffisance hépatique', 'Agomélatine contre-indiquée si atteinte hépatique', 'Tianeptine : 25 mg/j au plus'] }
  ], reveal: 'heads', min: 11 }],
  notes: 'Le réflexe grossesse : ne jamais arrêter brutalement un traitement efficace à l’annonce d’une grossesse ; vérifier sur le CRAT, en parler avec la patiente, organiser la surveillance néonatale. Un projet de grossesse se prépare : c’est là qu’on change de molécule si besoin.',
  src: 'CRAT ; RCP (ANSM) ; Nolen et al. 2019 ; Stahl’s Prescriber’s Guide, 2021' },

{ id: 'interactions-cyp', ch: 'strat', t: 'Interactions : les inhibiteurs et les inducteurs à connaître', short: 'Interactions CYP', mins: 1, obj: ['O10'],
  b: [{ table: { head: ['Molécule', 'Enzyme', 'Conséquence'], rows: [
    ['{{fluoxetine|Fluoxétine}}, {{paroxetine|paroxétine}}', '[[cyp2d6|2D6]] inhibé +++', 'Tamoxifène moins actif ; codéine sans effet ; métoprolol, tricycliques, rispéridone augmentés'],
    ['{{fluvoxamine|Fluvoxamine}}', '[[cyp1a2|1A2]] inhibé +++', 'Clozapine, olanzapine, théophylline, caféine augmentées ; agomélatine et duloxétine contre-indiquées'],
    ['{{carbamazepine|Carbamazépine}}', '3A4 induit', 'Contraception hormonale inefficace ; quétiapine, aripiprazole, lamotrigine, elle-même diminués'],
    ['Tabac (fumée)', '1A2 induit', 'Clozapine, olanzapine, duloxétine diminuées ; à l’arrêt du tabac, les taux remontent'],
    ['{{divalproate|Valproate}}', '[[glucuronidation]] inhibée', 'Lamotrigine × 2 : titration divisée par deux']
  ] }, reveal: 'cells' }],
  notes: 'Le piège du tabac : un patient sous clozapine ou olanzapine qui arrête de fumer à l’hôpital voit ses taux monter en une à deux semaines. Ce n’est pas la nicotine mais les hydrocarbures de la fumée qui induisent le 1A2 : les substituts nicotiniques ne compensent pas.',
  src: 'RCP ; Stahl’s Prescriber’s Guide, 2021' },

{ id: 'ct-cyp', ch: 'strat', kind: 'question', t: 'Question flash · le tamoxifène', short: 'Question : le tamoxifène', mins: 1, obj: ['O10'],
  b: [{ vote: 'ct-tamoxifene', kind: 'quick' }],
  notes: 'Question flash : quelques secondes de réflexion, puis la réponse. Le tamoxifène est une prodrogue activée en endoxifène par le CYP2D6.',
  src: 'RCP Deroxat ; Stahl’s Prescriber’s Guide, 2021' },

{ id: 'serotoninergique', ch: 'strat', t: 'Syndrome sérotoninergique : les critères de Hunter', short: 'Syndrome sérotoninergique', mins: 1.5, obj: ['O10'],
  b: [
    { p: 'Chez un patient exposé à un agent sérotoninergique, l’un de ces tableaux :' },
    { ul: ['clonus spontané', 'clonus inductible **et** agitation ou sueurs', 'clonus oculaire **et** agitation ou sueurs', 'tremblement **et** hyperréflexie', 'hypertonie **et** température > 38 °C **et** clonus oculaire ou inductible'], step: true },
    { call: 'urg', t: 'Arrêter tous les sérotoninergiques, benzodiazépines, refroidissement, réhydratation ; réanimation si hyperthermie ou rigidité. La cyproheptadine est proposée, sans preuve d’efficacité.', f: true }
  ],
  more: [
    { kpis: [{ v: '84 %', l: 'sensibilité des critères de Hunter' }, { v: '97 %', l: 'spécificité (Dunkley et al. 2003)' }] },
    { p: 'Les associations à risque : IMAO, tramadol, linézolide, bleu de méthylène, triptans, millepertuis, dextrométhorphane, fentanyl, méthadone, lithium. Le [[hunter|clonus]] (et l’hyperréflexie, plus marqués aux membres inférieurs) le distingue du syndrome malin des neuroleptiques, plus lent, avec une rigidité « en tuyau de plomb ».' }
  ],
  notes: 'Le signe à chercher : le clonus, en particulier aux chevilles. Le tableau s’installe en général vite après l’ajout ou l’augmentation d’un sérotoninergique.',
  src: 'Dunkley et al., QJM 2003;96:635–642' },

{ id: 'ct-hunter', ch: 'strat', kind: 'question', t: 'Question flash · le signe clé', short: 'Question : le signe clé', mins: 1, obj: ['O10'],
  b: [{ vote: 'ct-hunter', kind: 'quick' }],
  notes: 'Question flash. Réponse attendue : le clonus.',
  src: 'Dunkley et al. 2003' },

{ id: 'arret', ch: 'strat', t: 'Arrêter : diminuer de façon proportionnelle, plus lentement à la fin', short: 'Arrêter un antidépresseur', mins: 2, obj: ['O9'],
  b: [
    { fig: 'hyperbole', cap: 'Occupation du SERT selon la dose : relation hyperbolique (occupation maximale ≈ 90 %, moitié de l’effet à environ 10 % de la dose habituelle), d’après Horowitz et Taylor 2019. Le temps s’écoule de gauche à droite.' },
    { call: 'tip', t: 'Arrêter en période de stabilité, par paliers de 2 à 4 semaines ; revenir au palier précédent si les symptômes sont gênants. Les dernières doses, très faibles, demandent une forme buvable ou un fractionnement.', f: true }
  ],
  more: [
    { cols: [
      { k: 'warn', tag: 'classique', h: 'Paliers égaux de dose', p: 'On retire chaque fois la même quantité, ici un quart de la dose de départ. Comme la courbe dose–occupation est très plate aux doses habituelles, l’occupation du SERT ne bouge presque pas pendant trois paliers (de 82 à 64 %), puis la dernière marche la fait tomber de 64 points d’un coup : c’est là que surviennent les symptômes d’arrêt.' },
      { k: 'ok', tag: 'hyperbolique', h: 'Paliers proportionnels', p: 'On retire chaque fois une fraction de la dose précédente, ici la moitié. Les doses baissent vite au début puis très lentement, mais l’occupation, elle, baisse par marches régulières de 7 à 15 points. La décroissance est plus longue et finit par des doses très faibles.' }
    ] },
    { p: 'Pour les dernières marches, les formes buvables permettent des doses très faibles : escitalopram en gouttes (1 goutte = 1 mg), citalopram en solution dosée à la seringue graduée, fluoxétine en solution (20 mg/5 mL), amitriptyline en gouttes (1 goutte = 1 mg) ; la suspension buvable de paroxétine n’est plus commercialisée depuis 2023. Option classique mais peu évaluée : relayer un antidépresseur à demi-vie courte par la fluoxétine, dont la longue demi-vie amortit l’arrêt.' },
    { p: 'NICE (2022) recommande de réduire la dose par étapes, chaque palier étant une proportion de la dose précédente (par exemple la moitié). La décroissance hyperbolique repose sur des données d’imagerie et de pharmacologie : elle n’a pas encore été comparée à la décroissance classique dans des essais.' }
  ],
  notes: 'Montrer d’abord la diminution classique : quatre paliers égaux de dose, par exemple 20, 15, 10, 5 mg puis l’arrêt. Demander : « que fait l’occupation du SERT ? ». Elle reste presque au même niveau pendant trois paliers, puis la dernière marche la fait tomber de 64 points d’un coup : c’est là que surviennent les symptômes d’arrêt. Clic : la décroissance hyperbolique, où chaque palier retire la moitié de la dose précédente ; l’occupation baisse par marches régulières, au prix de doses finales très faibles et d’une décroissance plus longue. C’est une proposition fondée sur la pharmacologie (Horowitz et Taylor 2019), reprise par NICE en 2022, pas encore validée par des essais comparatifs.',
  src: 'Horowitz et Taylor, Lancet Psychiatry 2019 ; NICE NG222, 2022 ; HAS 2017' },

{ id: 'syndrome-arret', ch: 'strat', t: 'Le syndrome d’arrêt : le reconnaître, le distinguer d’une rechute', short: 'Le syndrome d’arrêt', mins: 1, obj: ['O9'],
  b: [
    { cols: [
      { tag: 'quand', h: 'Dans les jours qui suivent', p: 'Deux à quatre jours après une baisse ou un arrêt ; le plus souvent une à deux semaines, parfois bien plus longtemps.' },
      { tag: 'quoi', h: 'Des symptômes nouveaux', p: 'Vertiges, « décharges électriques », nausées, syndrome pseudo-grippal, insomnie et rêves intenses, irritabilité, anxiété.' },
      { k: 'warn', tag: 'qui', h: 'Les demi-vies courtes', p: '{{paroxetine|Paroxétine}} et {{venlafaxine|venlafaxine}} surtout ; rare avec la {{fluoxetine|fluoxétine}}, dont la demi-vie est longue. Plus fréquent après un traitement prolongé.' }
    ], reveal: 'heads' },
    { call: 'key', t: 'Une rechute vient plus tard, en semaines, avec les symptômes de l’épisode initial ; un [[syndrome-arret|syndrome d’arrêt]] cède en quelques jours si l’on revient au palier précédent.', f: true }
  ],
  notes: 'Demander d’abord : « quels symptômes attendez-vous après l’arrêt d’un ISRS ? ». Les « décharges électriques » (brain zaps) et les vertiges sont très évocateurs. Le piège : prendre un syndrome d’arrêt pour une rechute et reprendre le traitement au long cours, ou l’inverse.',
  src: 'Horowitz et Taylor 2019 ; NICE NG222, 2022 ; RCP Deroxat, Effexor LP, Prozac' },

/* ───────── 05 · Clôture ───────── */
{ id: 'post-delai', ch: 'clot', kind: 'question', t: 'Retour sur la question d’ouverture 1 · le délai d’action', short: 'Retour sur la question 1', mins: 1,
  b: [{ vote: 'pq-delai', kind: 'post' }],
  notes: 'Relire la question : chacun compare en silence avec sa réponse du début. Révéler, puis expliquer en une phrase avec la synapse.',
  src: 'Stahl 2013, fig. 7-13 à 7-17' },
{ id: 'post-lithium', ch: 'clot', kind: 'question', t: 'Retour sur la question d’ouverture 2 · le lithium et l’ibuprofène', short: 'Retour sur la question 2', mins: 1,
  b: [{ vote: 'pq-lithium', kind: 'post' }],
  notes: 'Relire, révéler. Rappeler la règle : AINS, IEC, sartans, thiazidiques, déshydratation font monter la lithiémie.',
  src: 'RCP Téralithe' },
{ id: 'post-surdosage', ch: 'clot', kind: 'question', t: 'Retour sur la question d’ouverture 3 · l’intoxication', short: 'Retour sur la question 3', mins: 1,
  b: [{ vote: 'pq-surdosage', kind: 'post' }],
  notes: 'Relire, révéler, puis faire le lien avec l’empreinte des imipraminiques (Na⁺, M1, α1, H1).',
  src: 'Stahl’s Prescriber’s Guide, 2021' },

{ id: 'a-retenir', ch: 'clot', t: 'Sept messages', short: 'À retenir', mins: 2.5, fs: 30,
  b: [{ ol: [
    'Les antidépresseurs ont été trouvés par hasard ; leurs cibles expliquent leurs effets indésirables mieux que leur efficacité.',
    'Le délai d’action est une adaptation des neurones (autorécepteurs) : on revoit à S1–S2, on évalue à S4–S8.',
    'Une empreinte d’affinités prédit sédation, poids, effets anticholinergiques, hypotension et toxicité.',
    'Le lithium suit le sodium : AINS, IEC, thiazidiques et déshydratation font monter la lithiémie.',
    'Valproate : contre-indiqué pendant la grossesse ; règles étendues aux hommes depuis 2025.',
    'Après un échec : vérifier, optimiser, puis changer ou associer ; on ne croise jamais avec un IMAO.',
    'Chez le patient bipolaire, un antidépresseur n’est jamais seul.'
  ], step: true }],
  notes: 'Un message par clic ; marquer une courte pause après chacun, sans solliciter personne.' },

{ id: 'revenir', ch: 'clot', kind: 'qr', t: 'Après le cours, tout reste en ligne', short: 'Pour revenir', mins: 1.5,
  b: [
    { qrs: [
      { lab: 'Réviser', t: 'Cartes de révision espacée', hash: '#/reviser' },
      { lab: 'S’entraîner', t: 'Cas cliniques, QRM et arbres de décision', hash: '#/entrainement' },
      { lab: 'Laboratoires', t: 'Synapse, voies, empreintes, lithiémie', hash: '#/labos' },
      { lab: 'Pharmacopée', t: 'Les fiches des 36 molécules', hash: '#/pharmacopee' }
    ], w: 210, step: true }
  ],
  more: [{ p: 'Les cartes de révision reprennent les notions du cours avec un planificateur de révision espacée : les tests répétés retiennent mieux que la relecture, y compris chez les internes (Larsen et al. 2009).' }],
  notes: 'Laisser les QR codes affichés le temps que chacun photographie ceux qui l’intéressent. Les cartes de révision reprennent les notions du cours avec un planificateur de révision espacée : les tests répétés retiennent mieux que la relecture (Larsen et al. 2009, chez des internes). Les laboratoires permettent de rejouer la synapse, les voies et la titration du lithium.',
  src: 'Larsen, Butler et Roediger, Med Educ 2009' },

{ id: 'references', ch: 'clot', t: 'Références', short: 'Références', mins: 0,
  b: [{ refs: [
    { t: 'Stahl SM. _Stahl’s Essential Psychopharmacology_, 4e éd. Cambridge University Press, 2013 ; _Prescriber’s Guide_, 7e éd., 2021.' },
    { t: 'Shorter E. _A History of Psychiatry_. Wiley, 1997.' },
    { t: 'HAS. Épisode dépressif caractérisé de l’adulte : prise en charge en soins de premier recours, 2017.' },
    { t: 'Bennabi D et al. Clinical guidelines for the management of treatment-resistant depression. _BMC Psychiatry_ 2019;19:262.' },
    { t: 'Yatham LN et al. CANMAT/ISBD 2018 guidelines for the management of patients with bipolar disorder. _Bipolar Disord_ 2018;20:97–170.' },
    { t: 'Cipriani A et al. _Lancet_ 2018;391:1357–66 ; Cipriani A et al. _BMJ_ 2013;346:f3646.' },
    { t: 'Nolen WA et al. What is the optimal serum level for lithium in the maintenance treatment of bipolar disorder? _Bipolar Disord_ 2019;21:394–409.' },
    { t: 'Meyer JH et al. _Am J Psychiatry_ 2004;161:826–835 ; Szegedi A et al. _J Clin Psychiatry_ 2009;70:344–353.' },
    { t: 'Dunkley EJC et al. The Hunter Serotonin Toxicity Criteria. _QJM_ 2003;96:635–642.' },
    { t: 'Horowitz MA, Taylor D. Tapering of SSRI treatment to mitigate withdrawal symptoms. _Lancet Psychiatry_ 2019;6:538–546.' },
    { t: 'Moncrieff J et al. The serotonin theory of depression. _Mol Psychiatry_ 2023;28:3243–3256.' },
    { t: 'Hamilton M. A rating scale for depression. _J Neurol Neurosurg Psychiatry_ 1960;23:56–62.' },
    { t: 'Kruizinga J et al. Pharmacological treatment for psychotic depression. _Cochrane Database Syst Rev_ 2021 ; Bond DJ et al. _J Clin Psychiatry_ 2008;69:1589–1601.' },
    { t: 'Browning M et al. Pramipexole augmentation in treatment-resistant depression (PAX-D). _Lancet Psychiatry_ 2025 ; ANSM, cadre de prescription compassionnelle de la kétamine, mars 2026.' },
    { t: 'Freeman S et al. Active learning increases student performance. _PNAS_ 2014;111:8410–8415.' }
  ] }],
  src: '' }
);

/* ─── interact ─── */
/* Questions à la salle (sans vote ni décompte : la réponse vient au clic), QRM d’entraînement, cas progressifs, page « Méthode ». */
C.votes = {
  'pq-delai': { at: 'post-delai',
    stem: 'Un ISRS occupe environ 80 % des transporteurs de la sérotonine dès les premiers jours. Pourquoi l’effet antidépresseur met-il deux à quatre semaines à apparaître ?',
    opts: ['Il faut trois semaines pour atteindre l’état d’équilibre plasmatique', 'Les autorécepteurs 5-HT1A freinent d’abord le neurone, puis se désensibilisent', 'Le cerveau doit d’abord synthétiser davantage de sérotonine', 'L’effet existe d’emblée, mais il est masqué par les effets indésirables'],
    ans: 1, why: 'La sérotonine s’accumule d’abord autour des corps cellulaires du raphé et stimule les autorécepteurs 5-HT1A, qui ralentissent la décharge ; leur désensibilisation en quelques semaines lève le frein. L’état d’équilibre est atteint en quelques jours pour la plupart des ISRS (la fluoxétine mise à part).', src: 'Stahl 2013, fig. 7-13 à 7-17' },
  'pq-lithium': { at: 'post-lithium',
    stem: 'Une patiente stable sous lithium (0,7 mEq/L) prend de l’ibuprofène pendant dix jours pour une entorse. Que devient sa lithiémie ?',
    opts: ['Elle ne change pas : le lithium n’est pas métabolisé par le foie', 'Elle baisse', 'Elle augmente', 'Elle ne varie qu’en fonction de l’heure de prise de l’ibuprofène'],
    ans: 2, why: 'Les AINS diminuent la filtration glomérulaire et augmentent la réabsorption du lithium : la lithiémie augmente, de 10 % à 4 fois selon les cas, dès la première semaine. Association déconseillée par le RCP ; si elle est indispensable, contrôler la lithiémie.', src: 'RCP Téralithe ; Finley 2016' },
  'pq-surdosage': { at: 'post-surdosage',
    stem: 'Lequel de ces antidépresseurs est le plus dangereux en cas d’intoxication volontaire ?',
    opts: ['Sertraline', 'Mirtazapine', 'Amitriptyline', 'Vortioxétine'],
    ans: 2, why: 'L’amitriptyline, comme les autres imipraminiques, bloque les canaux sodiques cardiaques (QRS élargi, troubles du rythme, convulsions) et cumule effets anticholinergiques, α1 et H1. Les ISRS, la mirtazapine et la vortioxétine sont rarement mortels seuls.', src: 'Stahl’s Prescriber’s Guide, 2021' },
  'ct-paroxetine': {
    stem: 'La paroxétine a une affinité d’environ 0,1 nM pour le SERT et de 72 nM pour les récepteurs muscariniques M1. Aux doses usuelles, à quoi faut-il s’attendre ?',
    opts: ['À aucun effet anticholinergique : une affinité 700 fois plus faible est négligeable', 'À des effets anticholinergiques modestes, plus marqués qu’avec les autres ISRS', 'À des effets anticholinergiques comparables à ceux de l’amitriptyline', 'À des effets anticholinergiques seulement en cas de surdosage'],
    ans: 1, why: 'Aux concentrations atteintes, une partie des récepteurs M1 est occupée : bouche sèche, constipation et sédation un peu plus fréquentes qu’avec les autres ISRS, sans atteindre l’amitriptyline, plus affine pour M1 (≈ 10 nM) et prescrite à plus forte dose. Une affinité se lit au regard des concentrations.', src: 'Wikipédia (PDSP) ; Stahl’s Prescriber’s Guide, 2021' },
  'ct-lithium-sodium': {
    stem: 'Pourquoi une gastro-entérite avec déshydratation fait-elle monter la lithiémie ?',
    opts: ['Le lithium se concentre simplement parce que le volume d’eau diminue', 'Le tube proximal réabsorbe le lithium avec le sodium : en manque de sodium, il en réabsorbe davantage', 'La déshydratation ralentit le métabolisme hépatique du lithium', 'Les vomissements font sauter des prises, rattrapées ensuite en double'],
    ans: 1, why: 'Le lithium n’est pas métabolisé : il est filtré puis réabsorbé dans le tube proximal par les mêmes voies que le sodium. Déshydratation et déplétion sodée (diarrhée, vomissements, fièvre, canicule, régime sans sel, diurétiques) augmentent cette réabsorption et diminuent la filtration : la clairance du lithium chute.', src: 'RCP Téralithe ; Finley 2016' },
  'ct-bipolaire': {
    stem: 'Épisode dépressif caractérisé chez un patient ayant un trouble bipolaire de type I, sans traitement de fond. Quel traitement a l’AMM dans cette indication en France ?',
    opts: ['La sertraline seule', 'La quétiapine', 'La lamotrigine, en titration rapide sur une semaine', 'L’aripiprazole'],
    ans: 1, why: 'La quétiapine LP (300 mg/j au coucher) est le seul médicament ayant l’AMM dans la dépression bipolaire en France, et un traitement de 1re ligne pour CANMAT/ISBD. Un antidépresseur seul est contre-indiqué (virage, cycles rapides). La lamotrigine prévient les épisodes dépressifs, mais sa titration de six semaines la rend inadaptée à l’épisode aigu ; l’aripiprazole n’est pas efficace dans la dépression bipolaire.', src: 'RCP Xeroquel LP ; Yatham et al. 2018' },
  'ct-switch': {
    stem: 'Un patient sous fluoxétine 40 mg/j doit passer à l’iproniazide, un IMAO irréversible. Que faut-il faire ?',
    opts: ['Relais le lendemain de la dernière prise', 'Changement croisé sur une semaine', 'Arrêter la fluoxétine, puis attendre au moins cinq semaines', 'Arrêter la fluoxétine, puis attendre quinze jours'],
    ans: 2, why: 'La norfluoxétine a une demi-vie de 4 à 16 jours : il faut au moins cinq semaines avant de débuter un IMAO, sous peine de syndrome sérotoninergique. Quinze jours, c’est le délai dans l’autre sens, après l’arrêt d’un IMAO irréversible. On ne croise jamais avec un IMAO.', src: 'RCP Prozac et Marsilid' },
  'ct-tamoxifene': { kind: 'quick',
    stem: 'Une patiente traitée par tamoxifène pour un cancer du sein présente un épisode dépressif. Quel antidépresseur faut-il éviter ?',
    opts: ['Escitalopram', 'Sertraline', 'Paroxétine', 'Mirtazapine'],
    ans: 2, why: 'La paroxétine (comme la fluoxétine) inhibe fortement le CYP2D6, qui transforme le tamoxifène en endoxifène actif : association déconseillée. L’escitalopram, la sertraline aux doses usuelles et la mirtazapine l’inhibent peu ou pas.', src: 'RCP Deroxat ; Stahl’s Prescriber’s Guide, 2021' },
  'ct-hunter': { kind: 'quick',
    stem: 'Un patient sous ISRS vient de recevoir du tramadol. Quel signe oriente le plus vers un syndrome sérotoninergique ?',
    opts: ['Une fièvre à 38,5 °C', 'Un clonus des chevilles', 'Une diarrhée', 'Une mydriase'],
    ans: 1, why: 'Le clonus (spontané, inductible ou oculaire) est le pivot des critères de Hunter (sensibilité 84 %, spécificité 97 %). La fièvre, la diarrhée et la mydriase sont fréquentes, mais peu spécifiques.', src: 'Dunkley et al. 2003' }
};

/* QRM : 5 propositions ; ans = indices des propositions exactes ; why = une explication par proposition */
C.quiz = {
  'q-delai': { tag: 'QRM · délai d’action', src: 'Stahl 2013 ; HAS 2017 ; Szegedi 2009',
    stem: 'Concernant le délai d’action des ISRS, quelles propositions sont exactes ?',
    opts: ['L’occupation du SERT atteint environ 80 % aux doses minimales efficaces', 'La décharge des neurones du raphé augmente dès le premier jour', 'La désensibilisation des autorécepteurs 5-HT1A prend plusieurs semaines', 'L’absence de toute amélioration à deux semaines rend une réponse ultérieure peu probable', 'Chez l’adulte, il faut attendre douze semaines avant de conclure à un échec'],
    ans: [0, 2, 3],
    why: ['Exact (Meyer 2004).', 'Faux : elle diminue d’abord, freinée par les autorécepteurs 5-HT1A.', 'Exact : c’est l’explication classique du délai.', 'Exact : valeur prédictive négative de 82 à 100 % (Szegedi 2009).', 'Faux : la réponse s’évalue entre quatre et huit semaines ; six à douze chez le sujet âgé.'],
    short: 'A, C, D : occupation immédiate, désensibilisation lente, repère de S2.' },
  'q-h1': { tag: 'QRM · empreintes', src: 'Stahl 2013, chap. 7',
    stem: 'Quels effets sont attendus d’un antagonisme H1 puissant ?',
    opts: ['Sédation', 'Augmentation de l’appétit', 'Bouche sèche', 'Hypotension orthostatique', 'Prise de poids'],
    ans: [0, 1, 4],
    why: ['Exact.', 'Exact (avec le blocage 5-HT2C).', 'Faux : c’est un effet antimuscarinique (M1).', 'Faux : c’est un effet α1.', 'Exact.'],
    short: 'A, B, E : sédation, appétit, poids.' },
  'q-citalopram': { tag: 'QRM · ISRS', src: 'RCP Seropram, Seroplex',
    stem: 'À propos du citalopram et de l’escitalopram :',
    opts: ['Ils allongent l’intervalle QT de façon dose-dépendante', 'Le citalopram est limité à 20 mg/j après 65 ans', 'L’escitalopram est limité à 10 mg/j après 65 ans', 'Ce sont de puissants inhibiteurs du CYP2D6', 'Le citalopram a l’AMM dans le TOC en France'],
    ans: [0, 1, 2],
    why: ['Exact.', 'Exact.', 'Exact.', 'Faux : ils inhibent peu les CYP, d’où peu d’interactions.', 'Faux : en France, l’AMM du citalopram couvre l’épisode dépressif et le trouble panique ; l’escitalopram a l’AMM dans le TOC.'],
    short: 'A, B, C.' },
  'q-venlafaxine': { tag: 'QRM · IRSNa', src: 'RCP Effexor LP ; Wikipédia (Tatsumi 1997)',
    stem: 'Concernant la venlafaxine :',
    opts: ['À 75 mg/j, elle agit surtout sur la recapture de la sérotonine', 'Elle peut augmenter la pression artérielle de façon dose-dépendante', 'Sa demi-vie longue protège du syndrome d’arrêt', 'Son métabolite actif est formé par le CYP2D6', 'La dose maximale en France dans la dépression est de 375 mg/j'],
    ans: [0, 1, 3, 4],
    why: ['Exact : Ki 82 nM pour le SERT, 2 480 nM pour le NET.', 'Exact : contrôler l’HTA avant de débuter.', 'Faux : demi-vie courte (5 h ; métabolite 11 h) et syndrome d’arrêt marqué.', 'Exact : l’O-desméthylvenlafaxine.', 'Exact (225 mg/j dans les troubles anxieux).'],
    short: 'A, B, D, E.' },
  'q-agomelatine': { tag: 'QRM · autres mécanismes', src: 'RCP Valdoxan',
    stem: 'Concernant l’agomélatine :',
    opts: ['C’est un agoniste des récepteurs MT1 et MT2', 'C’est un antagoniste des récepteurs 5-HT2C', 'Les transaminases se dosent avant le début, puis vers S3, S6, S12 et S24', 'Son association à la fluvoxamine est recommandée', 'Elle s’utilise sans restriction après 75 ans'],
    ans: [0, 1, 2],
    why: ['Exact.', 'Exact : elle libère dopamine et noradrénaline dans le cortex préfrontal.', 'Exact, et à chaque augmentation de dose.', 'Faux : contre-indiquée (inhibiteur puissant du CYP1A2).', 'Faux : ne pas l’utiliser à partir de 75 ans.'],
    short: 'A, B, C.' },
  'q-lithiemie': { tag: 'QRM · lithium', src: 'RCP Téralithe 250',
    stem: 'À propos de la lithiémie sous Téralithe 250 (libération immédiate) :',
    opts: ['Elle se prélève le matin, 12 h après la dernière prise', 'La cible minimale efficace est de 0,5 à 0,8 mEq/L', 'Après le premier mois, un contrôle annuel suffit', 'Elle augmente sous AINS', 'Elle augmente sous sels de sodium'],
    ans: [0, 1, 3],
    why: ['Exact.', 'Exact.', 'Faux : mensuel le premier trimestre, puis tous les deux mois.', 'Exact.', 'Faux : les apports de sodium la diminuent.'],
    short: 'A, B, D.' },
  'q-intox': { tag: 'QRM · lithium', src: 'RCP Téralithe 250',
    stem: 'Quels signes doivent faire évoquer une intoxication au lithium ?',
    opts: ['Un tremblement grossier', 'Un syndrome cérébelleux', 'Une diarrhée et des vomissements', 'Une confusion', 'Une mydriase avec sécheresse de la bouche'],
    ans: [0, 1, 2, 3],
    why: ['Exact.', 'Exact.', 'Exact : signes précoces, et cause d’aggravation.', 'Exact.', 'Faux : c’est un tableau anticholinergique.'],
    short: 'A, B, C, D.' },
  'q-valproate': { tag: 'QRM · valproate', src: 'ANSM 2018 et 2025 ; RCP Dépakote',
    stem: 'Le valproate dans le trouble bipolaire, en France :',
    opts: ['Il est contre-indiqué pendant la grossesse', 'Chez la femme, la prescription initiale est annuelle et réservée à un spécialiste', 'Depuis 2025, des règles de prescription s’appliquent aussi aux hommes', 'Il induit le métabolisme de la lamotrigine', 'Le valproate de sodium (Dépakine) a l’AMM dans la manie'],
    ans: [0, 1, 2],
    why: ['Exact.', 'Exact, avec un programme de prévention des grossesses.', 'Exact : prescription initiale par un spécialiste et attestation annuelle.', 'Faux : il inhibe sa glucuronidation et double ses taux.', 'Faux : l’AMM psychiatrique concerne le divalproate (Dépakote) et le valpromide (Dépamide).'],
    short: 'A, B, C.' },
  'q-lamotrigine': { tag: 'QRM · lamotrigine', src: 'RCP Lamictal',
    stem: 'Concernant la lamotrigine :',
    opts: ['Elle prévient les épisodes dépressifs du trouble bipolaire I', 'Elle traite efficacement la manie aiguë', 'Sa titration lente limite le risque de toxidermie grave', 'Ses doses sont divisées par deux avec le valproate', 'Après une interruption prolongée, on reprend à la dose antérieure'],
    ans: [0, 2, 3],
    why: ['Exact (prédominance dépressive).', 'Faux.', 'Exact.', 'Exact.', 'Faux : après plus de cinq demi-vies, on recommence la titration.'],
    short: 'A, C, D.' },
  'q-echec': { tag: 'QRM · stratégies', src: 'Bennabi et al. 2019',
    stem: 'Après six semaines d’un ISRS à dose efficace, la réponse est partielle. Quelles options sont recommandées ?',
    opts: ['Vérifier l’observance', 'Ajouter la mirtazapine', 'Potentialiser par le lithium', 'Ajouter un second ISRS', 'Arrêter brutalement et débuter un IMAO le lendemain'],
    ans: [0, 1, 2],
    why: ['Exact, avant tout.', 'Exact : association de 1re intention en réponse partielle.', 'Exact : potentialisation de 1re intention (avec la quétiapine).', 'Faux : deux ISRS n’apportent rien et majorent le risque sérotoninergique.', 'Faux et dangereux : fenêtre thérapeutique obligatoire.'],
    short: 'A, B, C.' },
  'q-switch': { tag: 'QRM · changer', src: 'RCP Prozac, Marsilid',
    stem: 'Concernant le changement d’antidépresseur :',
    opts: ['On ne croise jamais avec un IMAO', 'Après l’arrêt de la fluoxétine, il faut attendre au moins cinq semaines avant un IMAO', 'Après l’arrêt d’un IMAO irréversible, il faut attendre 15 jours avant un autre antidépresseur', 'Le syndrome d’arrêt est particulièrement marqué avec la fluoxétine', 'Le changement croisé consiste à associer deux antidépresseurs à pleine dose pendant un mois'],
    ans: [0, 1, 2],
    why: ['Exact.', 'Exact.', 'Exact.', 'Faux : il est rare, grâce à la demi-vie longue.', 'Faux : on diminue l’un pendant qu’on augmente l’autre, en une à deux semaines.'],
    short: 'A, B, C.' },
  'q-hunter': { tag: 'QRM · syndrome sérotoninergique', src: 'Dunkley et al. 2003',
    stem: 'Parmi les critères de Hunter, chez un patient exposé à un sérotoninergique :',
    opts: ['Clonus spontané', 'Clonus inductible avec agitation ou sueurs', 'Tremblement avec hyperréflexie', 'Rigidité en tuyau de plomb d’installation lente', 'Bradycardie isolée'],
    ans: [0, 1, 2],
    why: ['Exact.', 'Exact.', 'Exact.', 'Faux : évoque plutôt un syndrome malin des neuroleptiques.', 'Faux.'],
    short: 'A, B, C.' },
  'q-grossesse': { tag: 'QRM · grossesse', src: 'CRAT ; RCP',
    stem: 'Grossesse et psychotropes :',
    opts: ['Il est recommandé d’arrêter brutalement un antidépresseur à l’annonce de la grossesse', 'Le CRAT est une ressource de référence', 'Le valproate est contre-indiqué pendant la grossesse dans le trouble bipolaire', 'Le lithium expose à des malformations cardiaques', 'Une exposition aux ISRS en fin de grossesse justifie une surveillance néonatale'],
    ans: [1, 2, 3, 4],
    why: ['Faux : risque de rechute et de syndrome d’arrêt ; on évalue avec la patiente.', 'Exact.', 'Exact.', 'Exact (maladie d’Ebstein notamment).', 'Exact (adaptation néonatale, HTAP rare).'],
    short: 'B, C, D, E.' },
  'q-chimio': { tag: 'QRM · chimioarchitecture', src: 'Stahl 2013, chap. 6 et 7',
    stem: 'Concernant la chimioarchitecture des monoamines :',
    opts: ['Le NET recapte aussi la dopamine dans le cortex préfrontal', 'Le récepteur 5-HT3 est un récepteur ionotrope', 'Les autorécepteurs α2 freinent la libération de noradrénaline', 'La MAO est une enzyme de la membrane plasmique', 'Le récepteur 5-HT2C stimule la libération de dopamine dans le cortex'],
    ans: [0, 1, 2],
    why: ['Exact : le cortex préfrontal a peu de DAT.', 'Exact.', 'Exact.', 'Faux : elle est mitochondriale.', 'Faux : il la freine.'],
    short: 'A, B, C.' },
  /* QRM des cas progressifs */
  'c1-q1': { tag: 'Cas · étape 1', src: 'HAS 2017',
    stem: 'Pour ce premier épisode d’intensité modérée à sévère :',
    opts: ['Un ISRS est un choix de première intention', 'Une benzodiazépine pendant deux semaines au plus peut se discuter si l’insomnie est au premier plan', 'L’agomélatine est un choix de première intention selon la HAS', 'Il faut la revoir à une et deux semaines', 'Il faut l’informer que les effets indésirables précèdent souvent le bénéfice'],
    ans: [0, 1, 3, 4],
    why: ['Exact.', 'Exact.', 'Faux : troisième intention (hépatotoxicité).', 'Exact.', 'Exact.'],
    short: 'A, B, D, E.' },
  'c1-q2': { tag: 'Cas · étape 2', src: 'HAS 2017 ; Bennabi 2019',
    stem: 'À six semaines, la MADRS est passée de 30 à 20 :',
    opts: ['Il s’agit d’une réponse partielle', 'Augmenter la sertraline est une option', 'La réponse se définit par une baisse d’au moins 50 %', 'On peut conclure à une dépression résistante', 'Il faut arrêter la sertraline sans attendre'],
    ans: [0, 1, 2],
    why: ['Exact : baisse de 33 %.', 'Exact : optimiser la dose.', 'Exact.', 'Faux : un seul antidépresseur, et une réponse partielle.', 'Faux.'],
    short: 'A, B, C.' },
  'c1-q3': { tag: 'Cas · étape 3', src: 'HAS 2017 ; CRAT',
    stem: 'Rémission à douze semaines ; elle envisage une grossesse dans l’année :',
    opts: ['Poursuivre 6 mois à 1 an après la rémission', 'L’arrêt se fera progressivement', 'Le projet de grossesse impose d’arrêter la sertraline immédiatement', 'Le CRAT permet de vérifier les données sur la molécule', 'Des symptômes à l’arrêt signent toujours une rechute'],
    ans: [0, 1, 3],
    why: ['Exact.', 'Exact.', 'Faux : on évalue le bénéfice et le risque avec elle ; la sertraline est parmi les mieux documentées.', 'Exact.', 'Faux : un syndrome d’arrêt est possible ; il survient dans les jours qui suivent la baisse.'],
    short: 'A, B, D.' },
  'c2-q1': { tag: 'Cas · étape 1', src: 'RCP Téralithe ; Finley 2016',
    stem: 'Son médecin vient d’introduire un IEC :',
    opts: ['Les IEC peuvent augmenter la lithiémie', 'L’effet peut apparaître avec retard, sur plusieurs semaines', 'Une lithiémie de contrôle doit être programmée', 'L’association est sans conséquence, l’IEC étant faiblement dosé', 'Un diurétique thiazidique serait une meilleure option'],
    ans: [0, 1, 2],
    why: ['Exact (jusqu’à 4 fois).', 'Exact.', 'Exact, et à répéter.', 'Faux.', 'Faux : les thiazidiques augmentent aussi la lithiémie (de 25 % à 4 fois).'],
    short: 'A, B, C.' },
  'c2-q2': { tag: 'Cas · étape 2', src: 'RCP Téralithe ; EXTRIP',
    stem: 'Diarrhée depuis 48 h, tremblement grossier, ataxie, ralentissement ; lithiémie 2,1 mEq/L :',
    opts: ['Le tableau évoque une intoxication au lithium', 'Il faut suspendre le lithium', 'Il faut réhydrater', 'Un avis néphrologique pour une épuration extrarénale se discute', 'Un diurétique accélérerait l’élimination du lithium'],
    ans: [0, 1, 2, 3],
    why: ['Exact.', 'Exact.', 'Exact (sérum salé isotonique).', 'Exact, devant les signes neurologiques.', 'Faux : les diurétiques sont à éviter.'],
    short: 'A, B, C, D.' },
  'c2-q3': { tag: 'Cas · étape 3', src: 'RCP Téralithe',
    stem: 'Avant de reprendre le lithium :',
    opts: ['Rechercher une altération de la fonction rénale', 'Doser la TSH et la calcémie', 'Choisir avec le médecin traitant un antihypertenseur qui ne modifie pas la lithiémie', 'Expliquer qu’il faut consulter en cas de diarrhée, de vomissements ou de fièvre', 'Reprendre d’emblée à une dose plus élevée pour éviter une rechute'],
    ans: [0, 1, 2, 3],
    why: ['Exact.', 'Exact.', 'Exact.', 'Exact.', 'Faux : reprise prudente, lithiémie à l’équilibre.'],
    short: 'A, B, C, D.' }
};
C.qcm = ['q-chimio', 'q-delai', 'q-h1', 'q-citalopram', 'q-venlafaxine', 'q-agomelatine', 'q-lithiemie', 'q-intox', 'q-valproate', 'q-lamotrigine', 'q-echec', 'q-switch', 'q-hunter', 'q-grossesse'];

C.cases = [
  { id: 'cas-d', t: 'Mme D., 34 ans : un premier épisode', steps: [
    { vig: 'Mme D., 34 ans, consulte pour une tristesse, une perte d’intérêt, une insomnie et des difficultés de concentration depuis six semaines, avec un retentissement professionnel. MADRS 30. Aucun antécédent ; pas de traitement.', q: 'c1-q1', after: 'Vous débutez la sertraline à 50 mg/j. À J10, elle signale des nausées et une agitation, en voie d’amélioration ; elle n’a pas d’idée suicidaire.' },
    { vig: 'À six semaines, la sertraline est bien tolérée et prise chaque jour ; la MADRS est à 20.', q: 'c1-q2', after: 'La sertraline passe à 100 mg/j. À douze semaines, la MADRS est à 9 : rémission.' },
    { vig: 'En rémission, elle demande quand elle pourra arrêter : elle envisage une grossesse dans l’année.', q: 'c1-q3', after: 'Vous convenez de poursuivre au moins six mois, de revoir le projet de grossesse ensemble, et de prévoir un arrêt progressif en période de stabilité.' }
  ] },
  { id: 'cas-b', t: 'M. B., 52 ans : le lithium au quotidien', steps: [
    { vig: 'M. B., 52 ans, trouble bipolaire de type I, stable sous Téralithe 250, 3 comprimés par jour (lithiémie 0,7 mEq/L il y a deux mois). Son médecin vient d’introduire un IEC (ramipril) pour une hypertension.', q: 'c2-q1', after: 'Aucune lithiémie n’est faite. Trois semaines plus tard, il arrive aux urgences après deux jours de diarrhée.' },
    { vig: 'Diarrhée depuis 48 h, tremblement grossier, démarche instable, propos ralentis. Lithiémie 2,1 mEq/L, prélevée 14 h après la dernière prise.', q: 'c2-q2', after: 'Le lithium est suspendu ; après réhydratation, la lithiémie redescend et les signes neurologiques régressent en quelques jours.' },
    { vig: 'Avant la reprise, vous faites le point avec lui et son médecin traitant.', q: 'c2-q3', after: 'Reprise à la dose antérieure après avis, lithiémie à J5–J7, changement d’antihypertenseur discuté, consignes écrites remises au patient.' }
  ] }
];

C.method = {
  t: 'Pourquoi ce cours est construit ainsi',
  intro: 'Deux heures de cours magistral laissent peu de traces ; deux heures alternant explications courtes, questions et prédictions en laissent beaucoup plus. Ce cours applique ce que la recherche en pédagogie a montré, et le rend facile à animer.',
  b: [
    { h: 'Ce que montrent les études' },
    { kpis: [{ v: '−⅓', l: 'd’échecs aux examens avec l’apprentissage actif (21,8 % contre 33,8 %), sur 225 études (Freeman 2014)' }] },
    { ul: [
      'Les étudiants apprennent plus en apprentissage actif, mais ont l’impression d’apprendre moins : la fluidité du cours magistral est trompeuse (Deslauriers 2019).',
      'Chercher la réponse en silence profite autant que la donner à voix haute : c’est l’effort de récupération qui compte (Smith, Roediger et Karpicke 2013). Personne n’a besoin d’être interrogé.',
      'Une question posée avant le cours, même ratée, améliore la mémorisation de la réponse et du contenu voisin (Soderstrom et Bjork 2023).',
      'Chez des internes, se tester à intervalles croissants retient mieux à six mois que relire (Larsen, Butler et Roediger 2009).',
      'L’attention ne chute pas à heure fixe ; elle fluctue, et remonte pendant les questions et les démonstrations (Bunce 2010 ; Bradbury 2016).',
      'Nommer les composants avant le mécanisme (pré-entraînement), segmenter, signaler l’essentiel et placer le texte près de l’image allègent la charge cognitive (Mayer 2008). D’où les animations en étapes : une notion à la fois, un halo clair sur ce qu’il faut regarder.'
    ] },
    { h: 'Animer une question à la salle' },
    { steps: [
      { t: 'Poser', p: 'Lire la question et les options ; dire que personne ne sera interrogé et qu’il suffit de répondre pour soi.' },
      { t: 'Laisser chercher', p: 'De quelques secondes à une minute de silence, sans minuterie ni décompte. Prendre les réponses de ceux qui veulent bien les donner.' },
      { t: 'Révéler', p: 'La réponse et son explication viennent au clic suivant ; si la salle hésite, réexpliquer autrement avant d’avancer.' },
      { t: 'Revenir', p: 'Les trois questions d’ouverture ne sont pas corrigées sur le moment : on y revient en fin de séance, et chacun compare avec sa réponse du début.' }
    ] },
    { h: 'Révéler pas à pas' },
    { p: 'Sur les diapositives denses, les intitulés apparaissent d’abord et le contenu au clic suivant : on peut demander à la salle ce qu’elle mettrait sous chaque titre avant de le montrer. Les animations (synapse, voies, titration du lithium) avancent elles aussi d’une étape par clic.' },
    { h: 'Le déroulé de la séance' },
    { ul: ['Une histoire qui ouvre une question (1952, Sea View), trois questions d’ouverture sans correction.', 'Quatre blocs de vingt à trente minutes, chacun avec au moins une question à la salle ou une prédiction.', 'Une pause à mi-parcours.', 'Retour sur les questions d’ouverture, sept messages, puis des codes QR pour retrouver les cartes de révision, les cas et les laboratoires après le cours.'] },
    { call: 'tip', t: 'Projection : P pour projeter depuis la lecture, flèches pour avancer, N pour les notes, O pour la vue d’ensemble, B pour l’écran noir ; la vue présentateur (P en projection) affiche la diapositive suivante, les notes et un chronomètre.' }
  ]
};

/* ─── trees ─── */
/* Arbres de décision (page « Raisonner ») : l’interne choisit chaque branche avant de voir la suite.
   n : nœuds (q, opts[{l, s, to}]) ou feuilles (leaf, tag, sub) ; cases : chemin attendu (ans = indice de l’option). */
C.trees = {
  echec: { label: 'Après un antidépresseur', t: 'Que faire à l’évaluation de S4–S8 ?', intro: 'D’après les recommandations françaises d’experts sur la dépression résistante (Bennabi et al. 2019) et la HAS (2017). Trois patients, trois chemins.',
    src: 'Bennabi et al., _BMC Psychiatry_ 2019 ; HAS 2017', root: 'n1',
    n: {
      n1: { q: 'Évaluation à S4–S8, à dose efficace : quelle réponse ?', ref: 'HAS 2017', hint: 'Réponse : baisse d’au moins 50 % de la MADRS ; non-réponse : moins de 25 %.', opts: [{ l: 'Rémission', s: 'rémission', to: 'l-cons' }, { l: 'Réponse partielle', s: 'partielle', to: 'n2' }, { l: 'Pas de réponse', s: 'non-réponse', to: 'n3' }] },
      'l-cons': { leaf: 'Consolider', tag: 'consolider', sub: 'Même dose pendant 6 mois à 1 an après la rémission (au moins 1 an chez le sujet âgé), puis arrêt progressif en période de stabilité.', ref: 'HAS 2017' },
      n2: { q: 'Réponse partielle : la dose est-elle optimisée, l’observance vérifiée ?', ref: 'Bennabi 2019', opts: [{ l: 'Non', s: 'non', to: 'l-opt' }, { l: 'Oui', s: 'oui', to: 'n4' }] },
      'l-opt': { leaf: 'Optimiser d’abord', tag: 'optimiser', sub: 'Vérifier l’observance, monter jusqu’à la dose maximale tolérée, réévaluer après 4 à 6 semaines à cette dose.', ref: 'Bennabi 2019' },
      n4: { q: 'Réponse partielle à dose optimale : que privilégier ?', ref: 'Bennabi 2019', opts: [{ l: 'Associer un antagoniste α2', s: 'associer', to: 'l-assoc' }, { l: 'Potentialiser', s: 'potentialiser', to: 'l-pot' }] },
      'l-assoc': { leaf: 'Associer mirtazapine ou miansérine', tag: 'associer', sub: 'Mirtazapine 15–30 mg/j ou miansérine 30–60 mg/j le soir, en gardant l’antidépresseur ; vérifier le QT avec la miansérine.', ref: 'Bennabi 2019' },
      'l-pot': { leaf: 'Potentialiser', tag: 'potentialiser', sub: 'Lithium (0,5–0,8 mEq/L) ou quétiapine (50–150 mg/j) ; puis aripiprazole (2,5–10 mg/j) ou T3 (25–50 µg/j).', ref: 'Bennabi 2019' },
      n3: { q: 'Pas de réponse : dose et durée suffisantes, observance bonne ?', ref: 'Bennabi 2019', opts: [{ l: 'Non', s: 'non', to: 'l-opt2' }, { l: 'Oui', s: 'oui', to: 'n5' }] },
      'l-opt2': { leaf: 'Optimiser d’abord', tag: 'optimiser', sub: 'Dose insuffisante ou observance douteuse : on corrige avant de conclure à un échec.', ref: 'Bennabi 2019' },
      n5: { q: 'Combien d’antidépresseurs bien conduits ont échoué dans cet épisode ?', ref: 'Bennabi 2019', opts: [{ l: 'Un seul', s: 'un', to: 'l-switch' }, { l: 'Deux ou plus', s: 'deux ou plus', to: 'l-res' }] },
      'l-switch': { leaf: 'Changer de classe', tag: 'changer', sub: 'Changement croisé vers une autre classe ; avec un IMAO, fenêtre thérapeutique obligatoire.', ref: 'Bennabi 2019' },
      'l-res': { leaf: 'Dépression résistante', tag: 'résistance', sub: 'Avis spécialisé : potentialisation, ECT selon la sévérité, rTMS, eskétamine si l’épisode est sévère.', ref: 'Bennabi 2019 ; HAS 2024' }
    },
    cases: [
      { id: 'r', label: 'M. R.', text: 'M. R., 45 ans, escitalopram 10 mg/j depuis six semaines, bien toléré. MADRS 32 → 27. Il reconnaît oublier souvent son traitement le week-end.',
        path: { n1: { ans: 2, why: 'Baisse de 16 % : moins de 25 %, c’est une non-réponse.', data: 'MADRS 32 → 27.' }, n3: { ans: 0, why: 'Dose minimale et observance douteuse : on optimise avant de parler d’échec.', data: '10 mg/j ; oublis le week-end.' } },
        end: 'Pilulier, horaire fixe, escitalopram 20 mg/j, réévaluation quatre semaines plus tard.' },
      { id: 's', label: 'Mme S.', text: 'Mme S., 58 ans, sertraline 150 mg/j depuis huit semaines, prise régulière. MADRS 34 → 22. Insomnie persistante, appétit diminué.',
        path: { n1: { ans: 1, why: 'Baisse de 35 % : réponse partielle (25 à 50 %).', data: 'MADRS 34 → 22.' }, n2: { ans: 1, why: 'Dose élevée et prise régulière : la dose est optimisée.', data: '150 mg/j depuis 8 semaines ; observance confirmée.' }, n4: { ans: 0, why: 'L’association à un antagoniste α2 est l’option de 1re intention en réponse partielle, et elle répond à l’insomnie et à l’anorexie.', data: 'Insomnie, appétit diminué.' } },
        end: 'Mirtazapine 15 mg le soir, en gardant la sertraline ; réévaluation à quatre semaines.' },
      { id: 't', label: 'M. T.', text: 'M. T., 39 ans. Après un échec de la sertraline à 150 mg/j, venlafaxine 225 mg/j depuis six semaines, observance vérifiée. MADRS 30 → 28.',
        path: { n1: { ans: 2, why: 'Baisse de 7 % : non-réponse.', data: 'MADRS 30 → 28.' }, n3: { ans: 1, why: 'Dose et durée suffisantes, observance vérifiée.', data: '225 mg/j depuis six semaines.' }, n5: { ans: 1, why: 'Deux antidépresseurs de deux classes, bien conduits : dépression résistante.', data: 'Sertraline, puis venlafaxine.' } },
        end: 'Revoir le diagnostic et les comorbidités, puis potentialisation (lithium ou quétiapine) ; ECT ou eskétamine selon la sévérité.' }
    ] },
  bipolaire: { label: 'Trouble bipolaire', t: 'Quel traitement pour cette phase ?', intro: 'D’après CANMAT/ISBD 2018 et les AMM françaises. Le traitement se choisit selon la phase, puis selon la polarité prédominante.',
    src: 'Yatham et al. 2018 ; RCP ; Vidal, recommandations trouble bipolaire', root: 'b1',
    n: {
      b1: { q: 'Quelle est la phase actuelle ?', ref: 'CANMAT 2018', opts: [{ l: 'Manie ou hypomanie', s: 'manie', to: 'b2' }, { l: 'Dépression', s: 'dépression', to: 'b3' }, { l: 'Euthymie (entretien)', s: 'entretien', to: 'b4' }] },
      b2: { q: 'Le patient prend-il un antidépresseur ?', ref: 'CANMAT 2018', opts: [{ l: 'Oui', s: 'oui', to: 'l-stopad' }, { l: 'Non', s: 'non', to: 'b2b' }] },
      'l-stopad': { leaf: 'Arrêter l’antidépresseur, puis traiter la manie', tag: 'arrêter l’AD', sub: 'Lithium, antipsychotique de 2e génération ou valproate (hors femme en âge de procréer) ; benzodiazépine si agitation.', ref: 'CANMAT 2018' },
      b2b: { q: 'S’agit-il d’une femme en âge de procréer ?', ref: 'ANSM', opts: [{ l: 'Oui', s: 'oui', to: 'l-maniaf' }, { l: 'Non', s: 'non', to: 'l-mania' }] },
      'l-maniaf': { leaf: 'Lithium ou antipsychotique, sans valproate', tag: 'sans valproate', sub: 'Le valproate n’est envisageable qu’en l’absence d’alternative, avec programme de prévention des grossesses.', ref: 'ANSM 2018' },
      'l-mania': { leaf: 'Lithium, antipsychotique ou valproate', tag: 'antimaniaque', sub: 'Le lithium est préféré, sauf manie mixte, comorbidité addictive ou échec antérieur.', ref: 'CANMAT 2018' },
      b3: { q: 'Y a-t-il des éléments mixtes (accélération, irritabilité, agitation) ?', ref: 'Vidal', opts: [{ l: 'Oui', s: 'oui', to: 'l-mixte' }, { l: 'Non', s: 'non', to: 'l-dep' }] },
      'l-mixte': { leaf: 'Pas d’antidépresseur', tag: 'état mixte', sub: 'Antipsychotique de 2e génération ou lithium ; l’antidépresseur est à proscrire.', ref: 'Vidal' },
      'l-dep': { leaf: 'Quétiapine ou lithium', tag: 'dépression', sub: 'Quétiapine LP 300 mg/j (seule AMM) ; un antidépresseur seulement associé à un thymorégulateur.', ref: 'RCP Xeroquel LP' },
      b4: { q: 'Quelle polarité domine les épisodes passés ?', ref: 'CANMAT 2018', opts: [{ l: 'Maniaque', s: 'maniaque', to: 'l-up' }, { l: 'Dépressive', s: 'dépressive', to: 'l-down' }] },
      'l-up': { leaf: 'Lithium, ou l’antipsychotique efficace en aigu', tag: 'par le haut', sub: 'Lithium en premier choix ; aripiprazole, quétiapine ou olanzapine si elles ont permis la réponse.', ref: 'CANMAT 2018' },
      'l-down': { leaf: 'Lithium, quétiapine ou lamotrigine', tag: 'par le bas', sub: 'La lamotrigine prévient surtout les dépressions (titration lente).', ref: 'CANMAT 2018 ; RCP Lamictal' }
    },
    cases: [
      { id: 'a', label: 'M. A.', text: 'M. A., 31 ans, trouble bipolaire de type I. Venlafaxine instaurée il y a trois semaines pour une « déprime » ; il dort trois heures par nuit, dépense sans compter et parle sans arrêt.',
        path: { b1: { ans: 0, why: 'Syndrome maniaque.', data: 'Réduction du sommeil, dépenses, logorrhée.' }, b2: { ans: 0, why: 'L’antidépresseur a probablement favorisé le virage : on l’arrête.', data: 'Venlafaxine depuis trois semaines.' } },
        end: 'Arrêt de la venlafaxine, antipsychotique de 2e génération ou lithium, benzodiazépine pour le sommeil.' },
      { id: 'c', label: 'Mme C.', text: 'Mme C., 27 ans, trouble bipolaire de type I. Tristesse, culpabilité, mais pensées qui s’accélèrent, irritabilité, agitation nocturne.',
        path: { b1: { ans: 1, why: 'Épisode dépressif.', data: 'Tristesse, culpabilité.' }, b3: { ans: 0, why: 'Accélération, irritabilité, agitation : éléments mixtes.', data: 'Pensées accélérées, irritabilité.' } },
        end: 'Pas d’antidépresseur ; antipsychotique de 2e génération ou lithium ; contraception et grossesse à discuter avant tout choix.' },
      { id: 'e', label: 'M. E.', text: 'M. E., 49 ans, trouble bipolaire de type I, euthymique depuis quatre mois. Quatre épisodes dépressifs pour un seul épisode maniaque.',
        path: { b1: { ans: 2, why: 'Euthymie : on choisit le traitement d’entretien.', data: 'Stable depuis quatre mois.' }, b4: { ans: 1, why: 'Polarité prédominante dépressive.', data: 'Quatre dépressions, une manie.' } },
        end: 'Lithium, quétiapine ou lamotrigine ; psychoéducation et repérage des prodromes.' }
    ] }
};

/* ─── cards ─── */
/* Cartes de révision espacée (FSRS-6) : une question, une réponse courte, la source, la diapositive. */
C.cards = [
  { id: 'k01', ch: 'chimio', q: 'Quelle enzyme est l’étape limitante de la synthèse de la sérotonine ?', a: 'La tryptophane hydroxylase (TPH2 dans les neurones).', src: 'Stahl 2013, chap. 6', sid: 'vie-monoamine' },
  { id: 'k02', ch: 'chimio', q: 'Quel transporteur stocke les monoamines dans les vésicules, et quel médicament le bloque ?', a: 'Le VMAT2 ; la réserpine (et la tétrabénazine).', src: 'Stahl 2013, chap. 6', sid: 'vie-monoamine' },
  { id: 'k03', ch: 'chimio', q: 'Où se trouve la MAO dans le neurone ?', a: 'Dans la membrane externe des mitochondries.', src: 'Stahl 2013, chap. 6', sid: 'vie-monoamine' },
  { id: 'k04', ch: 'chimio', q: 'Pourquoi bloquer le NET augmente-t-il la dopamine dans le cortex préfrontal ?', a: 'Le cortex préfrontal a peu de DAT : c’est le NET qui y recapte la dopamine.', src: 'Stahl 2013, fig. 7-33', sid: 'interactions' },
  { id: 'k05', ch: 'chimio', q: 'Quel est le seul récepteur ionotrope de la sérotonine, et quel effet indésirable lui doit-on ?', a: 'Le 5-HT3 ; les nausées (area postrema, intestin).', src: 'Stahl 2013, chap. 7', sid: 'recepteurs' },
  { id: 'k06', ch: 'chimio', q: 'Que fait la stimulation des récepteurs 5-HT2C sur la dopamine et la noradrénaline préfrontales ?', a: 'Elle freine leur libération ; les bloquer (agomélatine, fluoxétine, mirtazapine) la libère.', src: 'Stahl 2013, fig. 7-18', sid: 'interactions' },
  { id: 'k07', ch: 'chimio', q: 'Quels effets indésirables prédit un antagonisme H1 ? un antagonisme M1 ? un antagonisme α1 ?', a: 'H1 : sédation, appétit, poids. M1 : bouche sèche, constipation, rétention, confusion. α1 : hypotension orthostatique, vertiges, chutes.', src: 'Stahl 2013, chap. 7', sid: 'affinite' },
  { id: 'k08', ch: 'chimio', q: 'Quel pourcentage du SERT les ISRS occupent-ils aux doses minimales efficaces ?', a: 'Environ 80 % (Meyer et al. 2004).', src: 'Meyer et al. 2004', sid: 'affinite' },
  { id: 'k09', ch: 'chimio', q: 'Que conclut la revue de synthèse de 2023 sur la sérotonine et la dépression ?', a: 'Aucune preuve cohérente d’un déficit de sérotonine dans la dépression ; cela ne dit rien de l’efficacité des antidépresseurs.', src: 'Moncrieff et al. 2023', sid: 'hypothese' },
  { id: 'k10', ch: 'ad', q: 'Pourquoi les ISRS ont-ils un délai d’action de deux à quatre semaines ?', a: 'La sérotonine stimule d’abord les autorécepteurs 5-HT1A du raphé, qui freinent la décharge ; leur désensibilisation prend quelques semaines.', src: 'Stahl 2013, fig. 7-13 à 7-17', sid: 'synapse-isrs' },
  { id: 'k11', ch: 'ad', q: 'Que signifie l’absence d’amélioration de 20 % à deux semaines ?', a: 'Une réponse ultérieure devient peu probable (valeur prédictive négative de 82 à 100 %).', src: 'Szegedi et al. 2009', sid: 'delai-clinique' },
  { id: 'k12', ch: 'ad', q: 'Quand revoir un patient qui débute un antidépresseur, et quand évaluer la réponse ?', a: 'À une et deux semaines ; réponse entre quatre et huit semaines (six à douze chez le sujet âgé).', src: 'HAS 2017', sid: 'delai-clinique' },
  { id: 'k13', ch: 'ad', q: 'Doses maximales du citalopram et de l’escitalopram après 65 ans ?', a: 'Citalopram 20 mg/j ; escitalopram 10 mg/j (allongement du QT).', src: 'RCP Seropram, Seroplex', sid: 'isrs' },
  { id: 'k14', ch: 'ad', q: 'Quels ISRS inhibent fortement le CYP2D6 ?', a: 'La fluoxétine et la paroxétine.', src: 'RCP ; Stahl’s Prescriber’s Guide', sid: 'isrs' },
  { id: 'k15', ch: 'ad', q: 'Quel ISRS inhibe fortement le CYP1A2, et quel antidépresseur lui est contre-indiqué ?', a: 'La fluvoxamine ; l’agomélatine (et la duloxétine).', src: 'RCP Floxyfral, Valdoxan', sid: 'isrs' },
  { id: 'k16', ch: 'ad', q: 'Quel ISRS est le mieux documenté après un infarctus ?', a: 'La sertraline (essai SADHART).', src: 'Stahl’s Prescriber’s Guide', sid: 'isrs' },
  { id: 'k17', ch: 'ad', q: 'À partir de quelle dose la venlafaxine bloque-t-elle vraiment le NET ?', a: 'Aux doses élevées, au-delà de 150 mg/j environ ; à 75 mg/j, c’est surtout un inhibiteur de la recapture de la sérotonine.', src: 'Stahl 2013, fig. 7-30', sid: 'irsna' },
  { id: 'k18', ch: 'ad', q: 'Pourquoi les imipraminiques sont-ils dangereux en surdosage ?', a: 'Blocage des canaux sodiques cardiaques (QRS élargi, arythmies, convulsions), plus effets anticholinergiques, α1 et H1.', src: 'Stahl’s Prescriber’s Guide', sid: 'atc-surdosage' },
  { id: 'k19', ch: 'ad', q: 'Mécanisme de la réaction au fromage sous IMAO ?', a: 'La tyramine alimentaire, non dégradée par la MAO intestinale, chasse la noradrénaline des vésicules : poussée hypertensive.', src: 'Stahl 2013, chap. 7', sid: 'imao' },
  { id: 'k20', ch: 'ad', q: 'Pourquoi la mirtazapine donne-t-elle peu de nausées et de troubles sexuels ?', a: 'Elle bloque les récepteurs 5-HT2A, 5-HT2C et 5-HT3 tout en augmentant la libération de sérotonine (blocage α2).', src: 'Stahl 2013, fig. 7-44 à 7-47', sid: 'antagonistes-a2' },
  { id: 'k21', ch: 'ad', q: 'Calendrier des transaminases sous agomélatine ?', a: 'Avant de débuter, puis vers S3, S6, S12 et S24, et à chaque augmentation de dose ; arrêt si plus de 3 fois la normale.', src: 'RCP Valdoxan', sid: 'trois-mecanismes' },
  { id: 'k22', ch: 'ad', q: 'Quel est le mécanisme de la tianeptine, et quelle règle de prescription en découle ?', a: 'Agoniste µ-opioïde ; ordonnance sécurisée, 28 jours au plus.', src: 'Gassaway et al. 2014 ; arrêté du 27/07/2012', sid: 'trois-mecanismes' },
  { id: 'k23', ch: 'ad', q: 'Conditions de l’eskétamine en France ?', a: 'Dépression résistante sévère (au moins deux antidépresseurs de deux classes), adulte de moins de 65 ans, avec un ISRS ou un IRSN ; psychiatre, hôpital, ordonnance sécurisée de 4 semaines ; PA avant et environ 40 min après.', src: 'HAS 2024', sid: 'esketamine' },
  { id: 'k24', ch: 'thymo', q: 'Quels thymorégulateurs traitent et préviennent « par le haut » et « par le bas » ?', a: 'Le lithium et la quétiapine.', src: 'Yatham et al. 2018 ; Stahl 2013, chap. 8', sid: 'boussole' },
  { id: 'k25', ch: 'thymo', q: 'Cible et moment de prélèvement de la lithiémie avec Téralithe 250 ?', a: '0,5–0,8 mEq/L, le matin, 12 h après la dernière prise.', src: 'RCP Téralithe 250', sid: 'lithium-pratique' },
  { id: 'k26', ch: 'thymo', q: 'Avec Téralithe LP 400 pris à 20 h, quelles sont les deux cibles ?', a: 'Le soir (≈ 24 h, avant la prise) 0,5–0,8 ; le matin (≈ 12 h) 0,8–1,2 mEq/L.', src: 'RCP Téralithe LP 400', sid: 'lithium-pratique' },
  { id: 'k27', ch: 'thymo', q: 'Quels médicaments augmentent la lithiémie ?', a: 'AINS, IEC, sartans, diurétiques (thiazidiques surtout) ; et la déshydratation, le régime sans sel.', src: 'RCP Téralithe', sid: 'lithium-simulateur' },
  { id: 'k28', ch: 'thymo', q: 'Bilan avant de débuter le lithium ?', a: 'Créatinine et DFG, protéinurie, ionogramme, calcémie, TSH, glycémie, NFS, ECG ; test de grossesse et contraception.', src: 'RCP Téralithe 250', sid: 'lithium-pratique' },
  { id: 'k29', ch: 'thymo', q: 'Effet du lithium sur le suicide dans les essais randomisés ?', a: 'Odds ratio 0,13 contre placebo (Cipriani et al. 2013).', src: 'Cipriani et al., BMJ 2013', sid: 'lithium-mecanismes' },
  { id: 'k30', ch: 'thymo', q: 'Effets du lithium au long cours sur le rein et les glandes ?', a: 'Diabète insipide néphrogénique, insuffisance rénale chronique ; hypothyroïdie ; hyperparathyroïdie et hypercalcémie.', src: 'RCP Téralithe ; Stahl’s Prescriber’s Guide', sid: 'lithium-toxicite' },
  { id: 'k31', ch: 'thymo', q: 'Risques de l’exposition au valproate pendant la grossesse ?', a: 'Malformations ≈ 10 % et troubles du neurodéveloppement 30–40 % ; contre-indiqué dans le trouble bipolaire pendant la grossesse.', src: 'ANSM', sid: 'valproate' },
  { id: 'k32', ch: 'thymo', q: 'Qu’a changé janvier 2025 pour le valproate ?', a: 'Chez l’homme : prescription initiale par un spécialiste et attestation annuelle (risque de troubles neurodéveloppementaux si le père est traité dans les 3 mois avant la conception).', src: 'ANSM 2025', sid: 'valproate' },
  { id: 'k33', ch: 'thymo', q: 'Titration de la lamotrigine seule, et avec le valproate ?', a: 'Seule : 25 mg/j deux semaines, 50 mg/j deux semaines, puis 100 et 200 mg/j. Avec le valproate : doses divisées par deux.', src: 'RCP Lamictal', sid: 'carba-lamo' },
  { id: 'k34', ch: 'thymo', q: 'Quel est le seul médicament ayant l’AMM dans la dépression bipolaire en France ?', a: 'La quétiapine LP.', src: 'RCP Xeroquel LP', sid: 'apa2g' },
  { id: 'k35', ch: 'strat', q: 'Lignes de traitement de la HAS pour un épisode dépressif modéré à sévère ?', a: '1re : ISRS, IRSNa, autres (sauf tianeptine et agomélatine) ; 2e : imipraminiques ; 3e : tianeptine, agomélatine ; IMAO en dernier recours.', src: 'HAS 2017', sid: 'choisir' },
  { id: 'k36', ch: 'strat', q: 'Durée du traitement après la rémission ?', a: '6 mois à 1 an (au moins 1 an chez le sujet âgé), puis arrêt progressif.', src: 'HAS 2017', sid: 'suivre' },
  { id: 'k37', ch: 'strat', q: 'Définition d’une dépression résistante ?', a: 'Échec d’au moins deux antidépresseurs bien conduits (dose adéquate, 4 à 6 semaines à dose cible, observance).', src: 'Bennabi et al. 2019', sid: 'resistance' },
  { id: 'k38', ch: 'strat', q: 'Réponse partielle à dose optimisée : quelles options de 1re intention ?', a: 'Associer un antagoniste α2 (mirtazapine, miansérine) ; potentialiser par le lithium ou la quétiapine.', src: 'Bennabi et al. 2019', sid: 'echec' },
  { id: 'k39', ch: 'strat', q: 'Délai entre l’arrêt de la fluoxétine et un IMAO ? entre un IMAO irréversible et un autre antidépresseur ?', a: 'Au moins 5 semaines ; 2 semaines (15 jours).', src: 'RCP Prozac, Marsilid', sid: 'switch' },
  { id: 'k40', ch: 'strat', q: 'Critères de Hunter du syndrome sérotoninergique ?', a: 'Clonus spontané ; clonus inductible ou oculaire avec agitation ou sueurs ; tremblement et hyperréflexie ; hypertonie, température > 38 °C et clonus.', src: 'Dunkley et al. 2003', sid: 'serotoninergique' },
  { id: 'k41', ch: 'strat', q: 'Pourquoi diminuer un ISRS de façon proportionnelle et plus lentement à la fin ?', a: 'La relation dose–occupation du SERT est hyperbolique : les dernières baisses de dose font chuter l’occupation.', src: 'Horowitz et Taylor 2019', sid: 'arret' },
  { id: 'k42', ch: 'strat', q: 'Quel effet a l’arrêt du tabac sur la clozapine et l’olanzapine ?', a: 'Leurs taux augmentent : la fumée induit le CYP1A2 (pas la nicotine).', src: 'RCP ; Stahl’s Prescriber’s Guide', sid: 'interactions-cyp' },
  { id: 'k43', ch: 'ad', q: 'Quels freins la mirtazapine lève-t-elle, et qu’en résulte-t-il ?', a: 'Elle bloque les α2 : noradrénaline et sérotonine sont libérées ; elle bloque aussi 5-HT2A, 5-HT2C et 5-HT3, si bien que la sérotonine agit surtout sur 5-HT1A (peu de nausées, peu de troubles sexuels).', src: 'Stahl 2013, chap. 7', sid: 'dix-mecanismes' },
  { id: 'k44', ch: 'ad', q: 'Par quels cinq mécanismes la vortioxétine agit-elle ?', a: 'Inhibition du SERT, agonisme 5-HT1A, agonisme partiel 5-HT1B, antagonisme 5-HT3 et 5-HT7.', src: 'RCP Brintellix ; Stahl 2013', sid: 'dix-mecanismes' },
  { id: 'k45', ch: 'ad', q: 'Pourquoi la HAM-D peut-elle avantager une molécule sédative ?', a: 'Sur 17 items, trois portent sur le sommeil et six sur l’anxiété et les plaintes somatiques, contre un seul sur l’humeur dépressive.', src: 'Hamilton 1960 ; Bagby et al. 2004', sid: 'hamilton' },
  { id: 'k46', ch: 'ad', q: 'Comment prescrire un IMAO irréversible en France en 2026 ?', a: 'L’iproniazide est en rupture depuis 2023 : après échec des autres antidépresseurs, accès compassionnel (ANSM) à la phénelzine, la tranylcypromine ou la sélégiline transdermique ; le moclobémide (réversible) reste disponible.', src: 'ANSM 2026', sid: 'imao' },
  { id: 'k47', ch: 'ad', q: 'Kétamine IV dans les idées suicidaires sévères : quel cadre, quelle dose ?', a: 'Le cadre de prescription compassionnelle de l’ANSM (mars 2026) : 0,5 mg/kg en 40 minutes, à l’hôpital, prescrite par un psychiatre ; seconde dose possible à 24–48 h.', src: 'ANSM, CPC kétamine 2026', sid: 'esketamine' },
  { id: 'k48', ch: 'strat', q: 'Épisode dépressif avec caractéristiques psychotiques : quel traitement ?', a: 'Un antidépresseur associé à un antipsychotique de 2e génération (olanzapine, quétiapine), ou l’ECT, souvent la plus rapide dans les formes sévères ; un antidépresseur seul est insuffisant.', src: 'Kruizinga et al., Cochrane 2021 ; Meyers et al. 2009', sid: 'formes-cliniques' },
  { id: 'k49', ch: 'strat', q: 'Risque de virage sous antidépresseur en traitement aigu : trouble bipolaire de type I, de type II, dépression unipolaire ?', a: 'Environ 14 %, 7 % et 1,5 % (méta-analyse de Bond et al. 2008).', src: 'Bond et al. 2008', sid: 'bipolaire-phases' },
  { id: 'k50', ch: 'strat', q: 'Plainte qui persiste : fatigue, manque d’énergie, difficultés de concentration. Quelles monoamines viser ?', a: 'Surtout la noradrénaline et la dopamine : un IRSNa, ou une molécule qui lève le frein 5-HT2C (agomélatine) ; la fatigue est un symptôme résiduel fréquent sous ISRS.', src: 'Stahl 2013, chap. 7', sid: 'dimensions' }
];

/* ─── structures : coordonnées 2D calculées avec RDKit (tools/mols.py) ─── */
C.structures = {"serotonine":{"f":"C10H12N2O","a":[["N",2.419,-2.329,0,2],["C",2.109,-1.378,0,2],["C",1.131,-1.171,0,2],["C",0.821,-0.22,0,0],["C",1.408,0.589,0,1],["N",0.82,1.398,0,1],["C",-0.131,1.088,0,0],["C",-0.997,1.587,0,1],["C",-1.863,1.087,0,1],["C",-1.862,0.087,0,0],["O",-2.728,-0.414,0,1],["C",-0.996,-0.413,0,1],["C",-0.13,0.088,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,1],[9,11,2],[11,12,1],[12,3,1],[12,6,2]]},"noradrenaline":{"f":"C8H11NO3","a":[["N",-2.957,-0.636,0,2],["C",-2.092,-0.132,0,2],["C",-1.225,-0.629,0,1],["O",-1.221,-1.629,0,1],["C",-0.36,-0.126,0,0],["C",-0.364,0.874,0,1],["C",0.5,1.377,0,1],["C",1.368,0.88,0,0],["O",2.232,1.383,0,1],["C",1.372,-0.12,0,0],["O",2.239,-0.617,0,1],["C",0.507,-0.623,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[2,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,1],[7,9,2],[9,10,1],[9,11,1],[11,4,2]]},"dopamine":{"f":"C8H11NO2","a":[["N",-3.068,0.784,0,2],["C",-2.203,0.281,0,2],["C",-1.336,0.778,0,2],["C",-0.472,0.274,0,0],["C",-0.475,-0.725,0,1],["C",0.389,-1.229,0,1],["C",1.257,-0.732,0,0],["O",2.121,-1.235,0,1],["C",1.26,0.268,0,0],["O",2.128,0.765,0,1],["C",0.396,0.771,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,1],[6,8,2],[8,9,1],[8,10,1],[10,3,2]]},"glutamate":{"f":"C5H9NO4","a":[["N",-0.778,1.351,0,2],["C",0.087,0.85,0,1],["C",0.086,-0.15,0,2],["C",-0.78,-0.649,0,2],["C",-0.781,-1.649,0,0],["O",0.085,-2.15,0,0],["O",-1.647,-2.149,0,1],["C",0.954,1.349,0,0],["O",1.819,0.849,0,0],["O",0.954,2.349,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[4,6,1],[1,7,1],[7,8,2],[7,9,1]]},"gaba":{"f":"C4H9NO2","a":[["N",-2.351,-0.067,0,2],["C",-1.484,0.432,0,2],["C",-0.619,-0.07,0,2],["C",0.248,0.428,0,2],["C",1.113,-0.074,0,0],["O",1.111,-1.074,0,0],["O",1.98,0.425,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[4,6,1]]},"acetylcholine":{"f":"C7H16NO2+","a":[["C",-2.771,0.575,0,3],["C",-1.905,0.075,0,0],["O",-1.906,-0.925,0,0],["O",-1.039,0.574,0,0],["C",-0.173,0.073,0,2],["C",0.693,0.573,0,2],["N",1.559,0.072,1,0],["C",1.058,-0.794,0,3],["C",2.058,-0.794,0,3],["C",2.425,0.571,0,3]],"b":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[6,8,1],[6,9,1]]},"melatonine":{"f":"C13H16N2O2","a":[["C",-4.452,0.084,0,3],["C",-3.587,-0.417,0,0],["O",-3.59,-1.417,0,0],["N",-2.72,0.081,0,1],["C",-1.855,-0.421,0,2],["C",-0.988,0.077,0,2],["C",-0.123,-0.425,0,0],["C",-0.021,-1.42,0,1],["N",0.957,-1.63,0,1],["C",1.459,-0.765,0,0],["C",2.437,-0.559,0,1],["C",2.748,0.391,0,1],["C",2.081,1.136,0,0],["O",2.392,2.086,0,0],["C",3.371,2.292,0,3],["C",1.102,0.93,0,1],["C",0.791,-0.021,0,0]],"b":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,1],[9,10,1],[10,11,2],[11,12,1],[12,13,1],[13,14,1],[12,15,2],[15,16,1],[16,6,1],[16,9,2]]},"histamine":{"f":"C5H9N3","a":[["N",-2.41,0.638,0,2],["C",-1.543,0.139,0,2],["C",-0.678,0.64,0,2],["C",0.189,0.141,0,0],["C",0.294,-0.853,0,1],["N",1.273,-1.06,0,0],["C",1.772,-0.194,0,1],["N",1.102,0.549,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,1],[5,6,2],[6,7,1],[7,3,1]]},"tyramine":{"f":"C8H11NO","a":[["N",-2.855,0.86,0,2],["C",-1.991,0.357,0,2],["C",-1.123,0.854,0,2],["C",-0.259,0.351,0,0],["C",0.609,0.848,0,1],["C",1.473,0.345,0,1],["C",1.47,-0.655,0,0],["O",2.334,-1.158,0,1],["C",0.602,-1.152,0,1],["C",-0.262,-0.649,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,1],[6,8,2],[8,9,1],[9,3,2]]},"isoniazide":{"f":"C6H7N3O","a":[["N",0.784,-2.448,0,2],["N",0.782,-1.448,0,1],["C",-0.085,-0.95,0,0],["O",-0.95,-1.452,0,0],["C",-0.087,0.05,0,0],["C",-0.954,0.548,0,1],["C",-0.956,1.548,0,1],["N",-0.091,2.05,0,0],["C",0.776,1.552,0,1],["C",0.778,0.552,0,1]],"b":[[0,1,1],[1,2,1],[2,3,2],[2,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[9,4,2]]},"iproniazide":{"f":"C9H13N3O","a":[["C",-3.395,-0.589,0,3],["C",-2.531,-0.086,0,1],["C",-2.535,0.914,0,3],["N",-1.663,-0.583,0,1],["N",-0.799,-0.08,0,1],["C",0.069,-0.577,0,0],["O",0.072,-1.577,0,0],["C",0.933,-0.074,0,0],["C",1.801,-0.57,0,1],["C",2.665,-0.067,0,1],["N",2.661,0.933,0,0],["C",1.794,1.43,0,1],["C",0.929,0.926,0,1]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[5,7,1],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,7,2]]},"imipramine":{"f":"C19H24N2","a":[["C",-4.09,0.782,0,3],["N",-3.223,0.283,0,0],["C",-3.221,-0.717,0,3],["C",-2.358,0.785,0,2],["C",-1.491,0.286,0,2],["C",-0.626,0.788,0,2],["N",0.242,0.29,0,0],["C",1.066,0.854,0,0],["C",0.844,1.829,0,1],["C",1.575,2.512,0,1],["C",2.53,2.216,0,1],["C",2.755,1.242,0,1],["C",2.023,0.562,0,0],["C",2.388,-0.37,0,2],["C",1.892,-1.238,0,2],["C",0.903,-1.386,0,0],["C",0.683,-2.363,0,1],["C",-0.272,-2.659,0,1],["C",-1.007,-1.982,0,1],["C",-0.786,-1.006,0,1],["C",0.167,-0.709,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,6,1],[12,7,1],[20,15,1]]},"chlorpromazine":{"f":"C17H19ClN2S","a":[["C",1.534,-3.973,0,3],["N",1.532,-2.973,0,0],["C",2.397,-2.471,0,3],["C",0.665,-2.475,0,2],["C",0.663,-1.475,0,2],["C",-0.204,-0.977,0,2],["N",-0.206,0.023,0,0],["C",0.659,0.525,0,0],["C",1.526,0.027,0,1],["C",2.391,0.529,0,1],["C",2.389,1.528,0,1],["C",1.522,2.027,0,1],["C",0.657,1.525,0,0],["S",-0.21,2.023,0,0],["C",-1.075,1.522,0,0],["C",-1.942,2.02,0,1],["C",-2.807,1.518,0,1],["C",-2.805,0.518,0,0],["Cl",-3.67,0.016,0,0],["C",-1.938,0.02,0,1],["C",-1.073,0.522,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,2],[16,17,1],[17,18,1],[17,19,2],[19,20,1],[20,6,1],[12,7,1],[20,14,2]]},"amitriptyline":{"f":"C20H23N","a":[["C",2.925,-1.228,0,3],["N",2.057,-1.726,0,0],["C",2.055,-2.726,0,3],["C",1.193,-1.224,0,2],["C",0.325,-1.722,0,2],["C",-0.539,-1.22,0,1],["C",-0.537,-0.219,0,0],["C",-1.436,0.217,0,0],["C",-2.173,-0.46,0,1],["C",-3.128,-0.164,0,1],["C",-3.345,0.812,0,1],["C",-2.611,1.491,0,1],["C",-1.657,1.192,0,0],["C",-1.03,1.972,0,2],["C",-0.03,1.971,0,2],["C",0.59,1.187,0,0],["C",1.547,1.48,0,1],["C",2.278,0.798,0,1],["C",2.054,-0.176,0,1],["C",1.097,-0.468,0,1],["C",0.367,0.212,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,6,1],[12,7,1],[20,15,1]]},"clomipramine":{"f":"C19H23ClN2","a":[["C",-4.151,-0.623,0,3],["N",-3.284,-0.125,0,0],["C",-3.282,0.875,0,3],["C",-2.419,-0.626,0,2],["C",-1.552,-0.128,0,2],["C",-0.687,-0.629,0,2],["N",0.181,-0.131,0,0],["C",0.106,0.867,0,0],["C",-0.847,1.164,0,1],["C",-1.068,2.14,0,1],["C",-0.333,2.817,0,1],["C",0.622,2.521,0,1],["C",0.842,1.544,0,0],["C",1.831,1.396,0,2],["C",2.327,0.528,0,2],["C",1.961,-0.403,0,0],["C",2.694,-1.083,0,1],["C",2.469,-2.058,0,1],["C",1.514,-2.353,0,0],["Cl",1.29,-3.327,0,0],["C",0.783,-1.671,0,1],["C",1.005,-0.695,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,2],[17,18,1],[18,19,1],[18,20,2],[20,21,1],[21,6,1],[12,7,1],[21,15,2]]},"trimipramine":{"f":"C20H26N2","a":[["C",-1.421,-0.681,0,3],["C",-1.423,0.319,0,1],["C",-2.29,0.817,0,2],["N",-3.155,0.316,0,0],["C",-4.022,0.814,0,3],["C",-3.153,-0.684,0,3],["C",-0.558,0.82,0,2],["N",0.31,0.322,0,0],["C",1.134,0.886,0,0],["C",0.912,1.862,0,1],["C",1.643,2.544,0,1],["C",2.598,2.249,0,1],["C",2.823,1.274,0,1],["C",2.091,0.594,0,0],["C",2.456,-0.338,0,2],["C",1.96,-1.205,0,2],["C",0.971,-1.354,0,0],["C",0.751,-2.33,0,1],["C",-0.204,-2.626,0,1],["C",-0.939,-1.949,0,1],["C",-0.718,-0.973,0,1],["C",0.235,-0.676,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[3,5,1],[1,6,1],[6,7,1],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,2],[13,14,1],[14,15,1],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[19,20,1],[20,21,2],[21,7,1],[13,8,1],[21,16,1]]},"maprotiline":{"f":"C20H23N","a":[["C",1.271,-3.471,0,3],["N",0.605,-2.728,0,1],["C",0.901,-1.758,0,2],["C",0.191,-1.057,0,2],["C",0.385,-0.082,0,2],["C",-0.384,0.643,0,0],["C",-1.559,1.398,0,2],["C",-1.053,2.266,0,2],["C",-0.787,1.401,0,1],["C",0.606,2.115,0,0],["C",1.476,2.611,0,1],["C",2.342,2.11,0,1],["C",2.337,1.11,0,1],["C",1.468,0.612,0,1],["C",0.603,1.116,0,0],["C",-1.842,-0.154,0,0],["C",-2.394,-0.985,0,1],["C",-1.954,-1.879,0,1],["C",-0.96,-1.94,0,1],["C",-0.406,-1.111,0,1],["C",-0.847,-0.218,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[8,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[14,5,1],[20,15,1],[20,5,1],[14,9,1]]},"doxepine":{"f":"C19H21NO","a":[["C",1.371,-3.931,0,3],["N",1.369,-2.931,0,0],["C",2.233,-2.429,0,3],["C",0.501,-2.434,0,2],["C",0.499,-1.434,0,2],["C",-0.369,-0.936,0,1],["C",-0.371,0.064,0,0],["C",0.528,0.5,0,0],["C",1.265,-0.177,0,1],["C",2.22,0.119,0,1],["C",2.437,1.095,0,1],["C",1.703,1.774,0,1],["C",0.749,1.476,0,0],["C",0.122,2.255,0,2],["O",-0.878,2.255,0,0],["C",-1.498,1.47,0,0],["C",-2.455,1.764,0,1],["C",-3.186,1.081,0,1],["C",-2.962,0.107,0,1],["C",-2.005,-0.185,0,1],["C",-1.275,0.495,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,6,1],[12,7,1],[20,15,1]]},"dosulepine":{"f":"C19H21NS","a":[["C",1.371,-3.931,0,3],["N",1.369,-2.931,0,0],["C",2.233,-2.429,0,3],["C",0.501,-2.434,0,2],["C",0.499,-1.434,0,2],["C",-0.369,-0.936,0,1],["C",-0.371,0.064,0,0],["C",0.528,0.5,0,0],["C",1.265,-0.177,0,1],["C",2.22,0.119,0,1],["C",2.437,1.095,0,1],["C",1.703,1.774,0,1],["C",0.749,1.476,0,0],["C",0.122,2.255,0,2],["S",-0.878,2.255,0,0],["C",-1.498,1.47,0,0],["C",-2.455,1.764,0,1],["C",-3.186,1.081,0,1],["C",-2.962,0.107,0,1],["C",-2.005,-0.185,0,1],["C",-1.275,0.495,0,0]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,6,1],[12,7,1],[20,15,1]]},"fluoxetine":{"f":"C17H18F3NO","a":[["C",-4.644,0.946,0,3],["N",-3.778,1.445,0,1],["C",-2.912,0.945,0,2],["C",-2.046,1.444,0,2],["C",-1.18,0.943,0,1],["O",-0.314,1.443,0,0],["C",0.552,0.942,0,0],["C",0.551,-0.058,0,1],["C",1.417,-0.559,0,1],["C",2.283,-0.059,0,0],["C",2.284,0.941,0,1],["C",1.418,1.441,0,1],["C",3.149,-0.56,0,0],["F",2.648,-1.426,0,0],["F",3.648,-1.426,0,0],["F",4.015,-0.061,0,0],["C",-1.181,-0.057,0,0],["C",-0.315,-0.557,0,1],["C",-0.316,-1.557,0,1],["C",-1.183,-2.057,0,1],["C",-2.048,-1.556,0,1],["C",-2.047,-0.556,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[9,12,1],[12,13,1],[12,14,1],[12,15,1],[4,16,1],[16,17,2],[17,18,1],[18,19,2],[19,20,1],[20,21,2],[11,6,2],[21,16,1]]},"sertraline":{"f":"C17H17Cl2N","a":[["C",1.339,3.626,0,3],["N",0.474,3.125,0,1],["C",0.475,2.125,0,1],["C",1.341,1.626,0,2],["C",1.342,0.626,0,2],["C",0.476,0.125,0,1],["C",0.477,-0.875,0,0],["C",1.343,-1.374,0,1],["C",1.344,-2.374,0,1],["C",0.479,-2.875,0,0],["Cl",0.479,-3.875,0,0],["C",-0.388,-2.375,0,0],["Cl",-1.253,-2.876,0,0],["C",-0.389,-1.375,0,1],["C",-0.39,0.625,0,0],["C",-1.256,0.124,0,1],["C",-2.122,0.623,0,1],["C",-2.123,1.623,0,1],["C",-1.257,2.124,0,1],["C",-0.391,1.625,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,1],[9,11,2],[11,12,1],[11,13,1],[5,14,1],[14,15,2],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[19,2,1],[13,6,2],[19,14,1]]},"paroxetine":{"f":"C19H20FNO3","a":[["F",2.053,-3.418,0,0],["C",2.054,-2.418,0,0],["C",2.92,-1.919,0,1],["C",2.921,-0.919,0,1],["C",2.055,-0.418,0,0],["C",1.189,-0.918,0,1],["C",1.188,-1.918,0,1],["C",2.056,0.582,0,1],["C",2.923,1.081,0,2],["C",2.924,2.081,0,2],["N",2.058,2.582,0,1],["C",1.191,2.082,0,2],["C",1.19,1.082,0,1],["C",0.324,0.583,0,2],["O",-0.541,1.084,0,0],["C",-1.408,0.584,0,0],["C",-1.408,-0.416,0,1],["C",-2.275,-0.915,0,1],["C",-3.141,-0.414,0,0],["O",-4.092,-0.723,0,0],["C",-4.679,0.087,0,2],["O",-4.091,0.896,0,0],["C",-3.14,0.586,0,0],["C",-2.273,1.085,0,1]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[4,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,2],[17,18,1],[18,19,1],[19,20,1],[20,21,1],[21,22,1],[22,23,1],[6,1,2],[12,7,1],[23,15,2],[22,18,2]]},"citalopram":{"f":"C20H21FN2O","a":[["C",2.48,-2.674,0,3],["N",2.074,-1.76,0,0],["C",2.663,-0.951,0,3],["C",1.08,-1.654,0,2],["C",0.674,-0.741,0,2],["C",-0.32,-0.635,0,2],["C",-0.727,0.279,0,0],["O",-1.313,1.088,0,0],["C",-0.725,1.897,0,2],["C",0.226,1.587,0,0],["C",1.092,2.086,0,1],["C",1.958,1.586,0,0],["C",2.824,2.085,0,0],["N",3.69,2.584,0,0],["C",1.957,0.586,0,1],["C",1.09,0.086,0,1],["C",0.225,0.587,0,0],["C",-1.593,-0.22,0,0],["C",-1.594,-1.221,0,1],["C",-2.46,-1.72,0,1],["C",-3.326,-1.219,0,0],["F",-4.192,-1.718,0,0],["C",-3.325,-0.219,0,1],["C",-2.459,0.28,0,1]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,2],[11,12,1],[12,13,3],[11,14,1],[14,15,2],[15,16,1],[6,17,1],[17,18,1],[18,19,2],[19,20,1],[20,21,1],[20,22,2],[22,23,1],[16,6,1],[23,17,2],[16,9,2]]},"escitalopram":{"f":"C20H21FN2O","a":[["C",2.48,-2.674,0,3],["N",2.074,-1.76,0,0],["C",2.663,-0.951,0,3],["C",1.08,-1.654,0,2],["C",0.674,-0.741,0,2],["C",-0.32,-0.635,0,2],["C",-0.727,0.279,0,0],["O",-1.313,1.088,0,0],["C",-0.725,1.897,0,2],["C",0.226,1.587,0,0],["C",1.092,2.086,0,1],["C",1.958,1.586,0,0],["C",2.824,2.085,0,0],["N",3.69,2.584,0,0],["C",1.957,0.586,0,1],["C",1.09,0.086,0,1],["C",0.225,0.587,0,0],["C",-1.593,-0.22,0,0],["C",-1.594,-1.221,0,1],["C",-2.46,-1.72,0,1],["C",-3.326,-1.219,0,0],["F",-4.192,-1.718,0,0],["C",-3.325,-0.219,0,1],["C",-2.459,0.28,0,1]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,2],[11,12,1],[12,13,3],[11,14,1],[14,15,2],[15,16,1],[6,17,1],[17,18,1],[18,19,2],[19,20,1],[20,21,1],[20,22,2],[22,23,1],[16,6,1],[23,17,2],[16,9,2]]},"fluvoxamine":{"f":"C15H21F3N2O2","a":[["C",-5.274,-0.226,0,3],["O",-4.409,0.276,0,0],["C",-3.542,-0.222,0,2],["C",-2.677,0.28,0,2],["C",-1.81,-0.219,0,2],["C",-0.945,0.283,0,2],["C",-0.078,-0.215,0,0],["N",-0.076,-1.215,0,0],["O",-0.941,-1.717,0,0],["C",-0.939,-2.717,0,2],["C",-1.804,-3.219,0,2],["N",-1.802,-4.219,0,2],["C",0.787,0.286,0,0],["C",1.654,-0.212,0,1],["C",2.519,0.29,0,1],["C",2.517,1.29,0,0],["C",1.65,1.788,0,1],["C",0.785,1.286,0,1],["C",3.382,1.792,0,0],["F",2.88,2.657,0,0],["F",3.88,2.659,0,0],["F",4.249,1.293,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[6,12,1],[12,13,1],[13,14,2],[14,15,1],[15,16,2],[16,17,1],[15,18,1],[18,19,1],[18,20,1],[18,21,1],[17,12,2]]},"venlafaxine":{"f":"C17H27NO2","a":[["C",-0.246,-3.16,0,3],["N",-0.247,-2.16,0,0],["C",-1.114,-1.661,0,3],["C",0.618,-1.659,0,2],["C",0.617,-0.659,0,1],["C",-0.249,-0.161,0,0],["C",-1.115,-0.661,0,1],["C",-1.982,-0.162,0,1],["C",-1.983,0.838,0,0],["O",-2.849,1.336,0,0],["C",-2.85,2.336,0,3],["C",-1.117,1.338,0,1],["C",-0.25,0.84,0,1],["C",1.483,-0.159,0,0],["O",1.826,-1.098,0,1],["C",0.838,0.608,0,2],["C",1.18,1.546,0,2],["C",2.164,1.723,0,2],["C",2.809,0.956,0,2],["C",2.466,0.017,0,2]],"b":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,1],[9,10,1],[8,11,2],[11,12,1],[4,13,1],[13,14,1],[13,15,1],[15,16,1],[16,17,1],[17,18,1],[18,19,1],[12,5,2],[19,13,1]]},"duloxetine":{"f":"C18H19NOS","a":[["C",-3.918,-0.818,0,3],["N",-3.052,-0.319,0,1],["C",-2.186,-0.82,0,2],["C",-1.32,-0.32,0,2],["C",-0.454,-0.821,0,1],["O",0.412,-0.322,0,0],["C",0.413,0.678,0,0],["C",-0.453,1.179,0,1],["C",-0.452,2.179,0,1],["C",0.415,2.678,0,1],["C",1.28,2.178,0,0],["C",2.147,2.677,0,1],["C",3.012,2.176,0,1],["C",3.011,1.176,0,1],["C",2.145,0.677,0,1],["C",1.279,1.178,0,0],["C",-0.455,-1.821,0,0],["C",-1.265,-2.408,0,1],["C",-0.956,-3.359,0,1],["C",0.044,-3.36,0,1],["S",0.354,-2.409,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,2],[13,14,1],[14,15,2],[4,16,1],[16,17,2],[17,18,1],[18,19,2],[19,20,1],[15,6,1],[20,16,1],[15,10,1]]},"milnacipran":{"f":"C15H22N2O","a":[["C",-2.152,1.696,0,3],["C",-1.288,1.192,0,2],["N",-1.293,0.192,0,0],["C",-2.162,-0.304,0,2],["C",-3.025,0.2,0,3],["C",-0.43,-0.313,0,0],["O",-0.434,-1.313,0,0],["C",0.439,0.183,0,0],["C",1.085,0.946,0,2],["C",0.101,1.124,0,1],["C",-0.662,1.771,0,2],["N",-0.484,2.755,0,2],["C",1.078,-0.586,0,0],["C",2.064,-0.416,0,1],["C",2.703,-1.185,0,1],["C",2.357,-2.124,0,1],["C",1.371,-2.293,0,1],["C",0.732,-1.524,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[2,5,1],[5,6,2],[5,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[7,12,1],[12,13,2],[13,14,1],[14,15,2],[15,16,1],[16,17,2],[9,7,1],[17,12,1]]},"mirtazapine":{"f":"C17H19N3","a":[["C",1.629,-2.908,0,3],["N",0.951,-2.173,0,0],["C",-0.025,-2.393,0,2],["C",-0.703,-1.658,0,2],["N",-0.405,-0.703,0,0],["C",0.57,-0.484,0,1],["C",1.248,-1.218,0,2],["C",1.007,0.416,0,0],["C",2.004,0.339,0,1],["C",2.569,1.163,0,1],["C",2.138,2.065,0,1],["C",1.141,2.143,0,1],["C",0.575,1.318,0,0],["C",-0.399,1.544,0,2],["C",-1.183,0.922,0,0],["C",-2.047,1.425,0,1],["C",-2.915,0.927,0,1],["C",-2.917,-0.073,0,1],["N",-2.053,-0.575,0,0],["C",-1.185,-0.078,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[5,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,2],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[6,1,1],[12,7,1],[19,14,1],[19,4,1]]},"mianserine":{"f":"C18H20N2","a":[["C",1.629,-2.908,0,3],["N",0.951,-2.173,0,0],["C",-0.025,-2.393,0,2],["C",-0.703,-1.658,0,2],["N",-0.405,-0.703,0,0],["C",0.57,-0.484,0,1],["C",1.248,-1.218,0,2],["C",1.007,0.416,0,0],["C",2.004,0.339,0,1],["C",2.569,1.163,0,1],["C",2.138,2.065,0,1],["C",1.141,2.143,0,1],["C",0.575,1.318,0,0],["C",-0.399,1.544,0,2],["C",-1.183,0.922,0,0],["C",-2.047,1.425,0,1],["C",-2.915,0.927,0,1],["C",-2.917,-0.073,0,1],["C",-2.053,-0.575,0,1],["C",-1.185,-0.078,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[5,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,2],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[6,1,1],[12,7,1],[19,14,1],[19,4,1]]},"agomelatine":{"f":"C15H17NO2","a":[["C",2.21,3.78,0,3],["C",2.211,2.78,0,0],["O",3.077,2.28,0,0],["N",1.345,2.279,0,1],["C",1.346,1.279,0,2],["C",0.48,0.778,0,2],["C",0.481,-0.222,0,0],["C",1.348,-0.721,0,1],["C",1.349,-1.721,0,1],["C",0.483,-2.222,0,1],["C",-0.384,-1.723,0,0],["C",-1.249,-2.223,0,1],["C",-2.116,-1.724,0,1],["C",-2.116,-0.724,0,0],["O",-2.983,-0.225,0,0],["C",-3.848,-0.725,0,3],["C",-1.251,-0.223,0,1],["C",-0.384,-0.722,0,0]],"b":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[14,15,1],[13,16,2],[16,17,1],[17,6,2],[17,10,1]]},"vortioxetine":{"f":"C18H22N2S","a":[["C",0.174,-4.19,0,3],["C",0.171,-3.19,0,0],["C",-0.696,-2.692,0,1],["C",-0.698,-1.692,0,1],["C",0.167,-1.19,0,0],["S",0.165,-0.19,0,0],["C",-0.702,0.308,0,0],["C",-1.567,-0.194,0,1],["C",-2.434,0.305,0,1],["C",-2.436,1.305,0,1],["C",-1.571,1.806,0,1],["C",-0.704,1.308,0,0],["N",0.161,1.81,0,0],["C",0.159,2.81,0,2],["C",1.024,3.311,0,2],["N",1.891,2.813,0,1],["C",1.893,1.813,0,2],["C",1.028,1.311,0,2],["C",1.034,-1.688,0,0],["C",1.899,-1.187,0,3],["C",1.036,-2.688,0,1]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,1],[4,18,2],[18,19,1],[18,20,1],[20,1,2],[11,6,1],[17,12,1]]},"tianeptine":{"f":"C21H25ClN2O4S","a":[["C",4.109,-0.244,0,3],["N",3.112,-0.171,0,0],["C",2.744,0.759,0,0],["C",3.477,1.441,0,1],["C",3.251,2.414,0,1],["C",2.296,2.709,0,1],["C",1.565,2.026,0,1],["C",1.788,1.054,0,0],["C",0.964,0.487,0,1],["N",0.096,0.986,0,1],["C",-0.769,0.484,0,2],["C",-1.636,0.982,0,2],["C",-2.501,0.48,0,2],["C",-3.368,0.979,0,2],["C",-4.233,0.477,0,2],["C",-5.1,0.975,0,2],["C",-5.965,0.473,0,0],["O",-5.963,-0.527,0,0],["O",-6.832,0.971,0,1],["C",0.89,-0.511,0,0],["C",-0.065,-0.806,0,1],["C",-0.285,-1.782,0,1],["C",0.448,-2.462,0,0],["Cl",0.227,-3.437,0,0],["C",1.402,-2.164,0,1],["C",1.625,-1.189,0,0],["S",2.612,-1.038,0,0],["O",2.541,-2.036,0,0],["O",3.57,-1.331,0,0]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,2],[16,18,1],[8,19,1],[19,20,1],[20,21,2],[21,22,1],[22,23,1],[22,24,2],[24,25,1],[25,26,1],[26,27,2],[26,28,2],[26,1,1],[7,2,1],[25,19,2]]},"moclobemide":{"f":"C13H17ClN2O2","a":[["Cl",-4.42,1.738,0,0],["C",-3.556,1.235,0,0],["C",-3.559,0.235,0,1],["C",-2.695,-0.268,0,1],["C",-1.827,0.229,0,0],["C",-1.824,1.229,0,1],["C",-2.688,1.732,0,1],["C",-0.963,-0.274,0,0],["O",-0.967,-1.274,0,0],["N",-0.095,0.223,0,1],["C",0.769,-0.28,0,2],["C",1.637,0.216,0,2],["N",2.501,-0.287,0,0],["C",3.369,0.21,0,2],["C",4.233,-0.293,0,2],["O",4.229,-1.293,0,0],["C",3.361,-1.79,0,2],["C",2.497,-1.287,0,2]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[4,7,1],[7,8,2],[7,9,1],[9,10,1],[10,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,1],[6,1,2],[17,12,1]]},"ketamine":{"f":"C13H16ClNO","a":[["C",-1.659,1.174,0,3],["N",-1.021,0.405,0,1],["C",-0.034,0.569,0,0],["C",-0.389,1.504,0,2],["C",0.242,2.278,0,2],["C",1.23,2.115,0,2],["C",1.589,1.182,0,2],["C",0.956,0.409,0,0],["O",1.339,-0.512,0,0],["C",-0.076,-0.451,0,0],["C",0.789,-0.944,0,1],["C",0.791,-1.942,0,1],["C",-0.073,-2.441,0,1],["C",-0.939,-1.947,0,1],["C",-0.941,-0.949,0,0],["Cl",-1.807,-0.451,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[2,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[14,15,1],[7,2,1],[14,9,1]]},"esketamine":{"f":"C13H16ClNO","a":[["C",-1.659,1.174,0,3],["N",-1.021,0.405,0,1],["C",-0.034,0.569,0,0],["C",-0.389,1.504,0,2],["C",0.242,2.278,0,2],["C",1.23,2.115,0,2],["C",1.589,1.182,0,2],["C",0.956,0.409,0,0],["O",1.339,-0.512,0,0],["C",-0.076,-0.451,0,0],["C",0.789,-0.944,0,1],["C",0.791,-1.942,0,1],["C",-0.073,-2.441,0,1],["C",-0.939,-1.947,0,1],["C",-0.941,-0.949,0,0],["Cl",-1.807,-0.451,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,2],[2,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[14,15,1],[7,2,1],[14,9,1]]},"valproate":{"f":"C8H16O2","a":[["C",-2.599,0.698,0,3],["C",-1.732,0.199,0,2],["C",-0.867,0.699,0,2],["C",0,0.2,0,1],["C",0.865,0.701,0,2],["C",1.732,0.201,0,2],["C",2.597,0.702,0,3],["C",0.001,-0.8,0,0],["O",-0.865,-1.301,0,0],["O",0.867,-1.299,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[3,7,1],[7,8,2],[7,9,1]]},"valpromide":{"f":"C8H17NO","a":[["C",-2.599,0.698,0,3],["C",-1.732,0.199,0,2],["C",-0.867,0.699,0,2],["C",0,0.2,0,1],["C",0.865,0.701,0,2],["C",1.732,0.201,0,2],["C",2.597,0.702,0,3],["C",0.001,-0.8,0,0],["N",0.867,-1.299,0,2],["O",-0.865,-1.301,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[3,7,1],[7,8,1],[7,9,2]]},"carbamazepine":{"f":"C15H12N2O","a":[["N",0.872,-2.005,0,2],["C",0.004,-1.507,0,0],["O",-0.86,-2.009,0,0],["N",0.002,-0.507,0,0],["C",0.901,-0.07,0,0],["C",1.636,-0.748,0,1],["C",2.591,-0.451,0,1],["C",2.811,0.524,0,1],["C",2.076,1.202,0,1],["C",1.121,0.905,0,0],["C",0.495,1.685,0,1],["C",-0.505,1.682,0,1],["C",-1.126,0.899,0,0],["C",-2.082,1.191,0,1],["C",-2.813,0.509,0,1],["C",-2.588,-0.466,0,1],["C",-1.632,-0.758,0,1],["C",-0.901,-0.075,0,0]],"b":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,2],[13,14,1],[14,15,2],[15,16,1],[16,17,2],[17,3,1],[9,4,1],[17,12,1]]},"lamotrigine":{"f":"C9H7Cl2N5","a":[["N",-0.115,-3.437,0,2],["C",-0.113,-2.437,0,0],["N",0.754,-1.939,0,0],["N",0.756,-0.939,0,0],["C",-0.109,-0.437,0,0],["C",-0.976,-0.935,0,0],["N",-1.841,-0.434,0,2],["N",-0.978,-1.935,0,0],["C",-0.107,0.563,0,0],["C",-0.972,1.064,0,1],["C",-0.97,2.064,0,1],["C",-0.103,2.563,0,1],["C",0.762,2.061,0,0],["Cl",1.629,2.559,0,0],["C",0.76,1.061,0,0],["Cl",1.625,0.559,0,0]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[5,7,1],[4,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,1],[12,14,2],[14,15,1],[7,1,2],[14,8,1]]},"quetiapine":{"f":"C21H25N3O2S","a":[["O",-6.868,1.209,0,1],["C",-6.003,1.711,0,2],["C",-5.136,1.212,0,2],["O",-4.271,1.713,0,0],["C",-3.404,1.214,0,2],["C",-2.539,1.716,0,2],["N",-1.673,1.218,0,0],["C",-1.67,0.217,0,2],["C",-0.804,-0.281,0,2],["N",0.062,0.22,0,0],["C",0.059,1.22,0,2],["C",-0.807,1.719,0,2],["C",0.929,-0.277,0,0],["N",0.854,-1.275,0,0],["C",1.589,-1.953,0,0],["C",1.224,-2.886,0,1],["C",1.85,-3.665,0,1],["C",2.838,-3.517,0,1],["C",3.201,-2.585,0,1],["C",2.578,-1.805,0,0],["S",3.075,-0.937,0,0],["C",2.71,-0.006,0,0],["C",3.442,0.674,0,1],["C",3.217,1.649,0,1],["C",2.262,1.944,0,1],["C",1.531,1.262,0,1],["C",1.753,0.286,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[9,12,1],[12,13,2],[13,14,1],[14,15,2],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[19,20,1],[20,21,1],[21,22,2],[22,23,1],[23,24,2],[24,25,1],[25,26,2],[11,6,1],[26,12,1],[19,14,1],[26,21,1]]},"aripiprazole":{"f":"C23H27Cl2N3O2","a":[["Cl",5.482,3.171,0,0],["C",5.483,2.171,0,0],["C",6.349,1.672,0,1],["C",6.35,0.672,0,1],["C",5.485,0.171,0,1],["C",4.618,0.67,0,0],["N",3.753,0.17,0,0],["C",2.886,0.669,0,2],["C",2.021,0.168,0,2],["N",2.021,-0.832,0,0],["C",1.156,-1.332,0,2],["C",0.289,-0.833,0,2],["C",-0.576,-1.334,0,2],["C",-1.443,-0.835,0,2],["O",-2.308,-1.335,0,0],["C",-3.175,-0.836,0,0],["C",-3.175,0.164,0,1],["C",-4.042,0.663,0,1],["C",-4.907,0.163,0,0],["C",-5.774,0.662,0,2],["C",-6.639,0.161,0,2],["C",-6.639,-0.839,0,0],["O",-7.504,-1.339,0,0],["N",-5.772,-1.338,0,1],["C",-4.907,-0.837,0,0],["C",-4.04,-1.337,0,1],["C",2.888,-1.331,0,2],["C",3.753,-0.83,0,2],["C",4.617,1.67,0,0],["Cl",3.751,2.17,0,0]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1],[10,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,2],[17,18,1],[18,19,1],[19,20,1],[20,21,1],[21,22,2],[21,23,1],[23,24,1],[24,25,1],[9,26,1],[26,27,1],[5,28,1],[28,29,1],[28,1,2],[27,6,1],[25,15,2],[24,18,2]]},"olanzapine":{"f":"C17H20N4S","a":[["C",1.741,-3.847,0,3],["N",1.304,-2.948,0,0],["C",0.306,-2.877,0,2],["C",-0.131,-1.977,0,2],["N",0.429,-1.149,0,0],["C",1.427,-1.22,0,2],["C",1.864,-2.119,0,2],["C",-0.008,-0.25,0,0],["N",-1.008,-0.254,0,0],["C",-1.635,0.526,0,0],["C",-2.589,0.227,0,1],["C",-3.325,0.904,0,1],["C",-3.106,1.88,0,1],["C",-2.152,2.179,0,1],["C",-1.416,1.501,0,0],["N",-0.517,1.939,0,1],["C",0.386,1.509,0,0],["S",1.242,2.025,0,0],["C",1.998,1.37,0,0],["C",2.972,1.597,0,3],["C",1.608,0.449,0,1],["C",0.612,0.535,0,0]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[4,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[14,15,1],[15,16,1],[16,17,1],[17,18,1],[18,19,1],[18,20,2],[20,21,1],[6,1,1],[21,7,1],[14,9,1],[21,16,2]]},"risperidone":{"f":"C23H27FN4O2","a":[["C",1.125,2.982,0,3],["C",1.99,2.482,0,0],["N",2.858,2.98,0,0],["C",3.723,2.48,0,0],["C",4.59,2.978,0,2],["C",5.454,2.478,0,2],["C",5.455,1.477,0,2],["C",4.587,0.979,0,2],["N",3.723,1.479,0,0],["C",2.855,0.981,0,0],["O",2.856,-0.02,0,0],["C",1.991,1.481,0,0],["C",1.124,0.982,0,2],["C",1.123,-0.018,0,2],["N",0.257,-0.517,0,0],["C",-0.609,-0.018,0,2],["C",-1.476,-0.515,0,2],["C",-1.476,-1.518,0,1],["C",-0.61,-2.016,0,2],["C",0.257,-1.519,0,2],["C",-2.341,-2.017,0,0],["N",-2.449,-3.012,0,0],["O",-3.426,-3.218,0,0],["C",-3.926,-2.351,0,0],["C",-4.903,-2.14,0,1],["C",-5.211,-1.188,0,0],["F",-6.188,-0.978,0,0],["C",-4.539,-0.448,0,1],["C",-3.561,-0.656,0,1],["C",-3.254,-1.61,0,0]],"b":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,1],[5,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,2],[9,11,1],[11,12,1],[12,13,1],[13,14,1],[14,15,1],[15,16,1],[16,17,1],[17,18,1],[18,19,1],[17,20,1],[20,21,2],[21,22,1],[22,23,1],[23,24,1],[24,25,2],[25,26,1],[25,27,1],[27,28,2],[28,29,1],[11,1,2],[19,14,1],[29,20,1],[8,3,1],[29,23,2]]},"asenapine":{"f":"C17H16ClNO","a":[["C",0.535,-3.232,0,3],["N",0.315,-2.256,0,0],["C",-0.603,-1.86,0,2],["C",-0.511,-0.865,0,1],["C",-1.291,-0.239,0,0],["C",-2.158,-0.737,0,1],["C",-3.023,-0.234,0,1],["C",-3.02,0.766,0,1],["C",-2.153,1.263,0,1],["C",-1.288,0.761,0,0],["O",-0.505,1.382,0,0],["C",0.47,1.157,0,0],["C",1.036,1.981,0,1],["C",2.032,1.904,0,1],["C",2.464,1.002,0,0],["Cl",3.461,0.924,0,0],["C",1.898,0.177,0,1],["C",0.901,0.255,0,0],["C",0.465,-0.645,0,1],["C",0.975,-1.505,0,2]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,1],[11,12,1],[12,13,2],[13,14,1],[14,15,1],[14,16,2],[16,17,1],[17,18,1],[18,19,1],[19,1,1],[18,3,1],[9,4,1],[17,11,2]]},"bupropion":{"f":"C13H18ClNO","a":[["C",-0.814,0.859,0,3],["C",-0.812,-0.141,0,1],["N",-1.677,-0.643,0,1],["C",-2.544,-0.145,0,0],["C",-2.045,0.722,0,3],["C",-3.045,0.72,0,3],["C",-3.409,-0.646,0,3],["C",0.055,-0.639,0,0],["O",0.057,-1.639,0,0],["C",0.92,-0.138,0,0],["C",0.918,0.862,0,1],["C",1.783,1.364,0,1],["C",2.65,0.866,0,1],["C",2.652,-0.134,0,0],["Cl",3.519,-0.633,0,0],["C",1.787,-0.636,0,1]],"b":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[3,5,1],[3,6,1],[1,7,1],[7,8,2],[7,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,1],[13,15,2],[15,9,1]]},"lithium":{"f":"CLi2O3","a":[["Li",-1.144,0.917,1,0],["Li",1.721,-0.584,1,0],["O",-0.144,0.917,-1,0],["C",-0.144,-0.083,0,0],["O",0.721,-0.584,-1,0],["O",-1.011,-0.583,0,0]],"b":[[2,3,1],[3,4,1],[3,5,2]]},"urate-li":{"f":"C5H3LiN4O3","a":[["Li",0.49,1.978,1,0],["C",-0.221,-0.602,0,0],["C",-0.322,0.393,0,0],["N",-1.299,0.605,0,1],["C",-1.802,-0.259,0,0],["O",-2.797,-0.36,0,0],["N",-1.136,-1.005,0,1],["N",0.49,0.978,-1,0],["C",1.402,0.567,0,0],["O",2.213,1.152,0,0],["N",1.502,-0.428,0,1],["C",0.691,-1.012,0,0],["O",0.792,-2.007,0,0]],"b":[[1,2,2],[2,3,1],[3,4,1],[4,5,2],[4,6,1],[2,7,1],[7,8,1],[8,9,2],[8,10,1],[10,11,1],[11,12,2],[6,1,1],[11,1,1]]},"licl":{"f":"ClLi","a":[["Li",-0.85,0,1,0],["Cl",0.85,0,-1,0]],"b":[]}};
