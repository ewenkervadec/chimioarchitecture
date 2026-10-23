# Chimioarchitecture de l’humeur

Cours interactif pour les internes de psychiatrie, en début ou en milieu de DES : la **psychopharmacologie des antidépresseurs et des thymorégulateurs**, la **chimioarchitecture** des systèmes sérotoninergique, noradrénergique et dopaminergique qu’ils ciblent, et leur **place dans la pharmacopée française**. 

Sources principales : Stahl, _Essential Psychopharmacology_ (4e éd., 2013) et _Prescriber’s Guide_ (7e éd., 2021) ; Shorter, _A History of Psychiatry_ (1997) pour l’histoire ; HAS 2017, recommandations françaises sur la dépression résistante (Bennabi 2019), CANMAT/ISBD 2018 ; RCP français et données de l’ANSM (octobre 2026). Les textes sont reformulés et toutes les figures sont originales.

## Ce que contient le site

| Onglet | Contenu |
|---|---|
| **Le cours** | 77 diapositives en 6 chapitres, minutées pour 120 minutes (pause comprise). Chaque terme souligné ouvre sa définition (aperçus emboîtés) ; chaque molécule, cible ou archive s’ouvre en panneau à côté du texte. Recherche, mode « l’essentiel seulement », notes de l’enseignant, impression en polycopié. |
| **Laboratoires** | Six visualisations à manipuler : la synapse animée, une notion par étape (ISRS, IRSNa, IMAO, mirtazapine, vortioxétine) ; les voies monoaminergiques en plan de lignes, sans croisement ; la matrice des affinités (27 molécules × 17 cibles) ; la titration de Téralithe LP 400 et la simulation de la lithiémie ; le délai d’action ; la boussole des thymorégulateurs. |
| **Pharmacopée** | Les 36 molécules (24 antidépresseurs, lithium, anticonvulsivants, antipsychotiques de 2e génération), filtrables par profil ; une fiche pour chacune : AMM, posologie, effets indésirables, interactions, situations particulières, conseils pratiques, empreinte réceptorielle. |
| **Histoire** | Dix-huit archives, de Cade (1949) à l’eskétamine, placées aussi dans le cours. |
| **S’entraîner** | Deux cas cliniques progressifs, quatorze QRM au barème de l’EDN, deux arbres de décision (après un antidépresseur ; trouble bipolaire), et 50 cartes de révision espacée (FSRS-6). |
| **Glossaire** | 145 termes et 20 panneaux de cibles moléculaires. |

## Faire cours avec

- **Projeter** : bouton en haut à droite, touche **P** en lecture, ou bouton ▶ d’une diapositive pour projeter à partir d’elle.
- Pendant la projection :
  - **→**, **Espace** ou **Page suivante** : avancer, élément par élément (les visualisations changent d’état à chaque clic) ;
  - **←** : reculer ; **Début** et **Fin** ; un numéro puis **Entrée** : aller à cette diapositive ;
  - **F** : plein écran ; **N** : notes ; **O** : vue d’ensemble ; **B** : écran noir ; **Échap** : retour à la lecture.
- **Questions à la salle** : la question s’affiche, on laisse chercher, la réponse vient au clic suivant. Personne n’est interrogé, rien n’est compté, il n’y a pas de minuterie. Les trois questions d’ouverture ne sont pas corrigées sur le moment : on y revient en fin de séance.
- **Révélation pas à pas** : sur les diapositives denses, les intitulés apparaissent d’abord et le contenu au clic suivant, ou les étapes une à une, pour pouvoir interroger la salle avant de montrer. Les anecdotes historiques montrent d’abord la date, le lieu et le titre : le récit vient au clic suivant, le temps de le raconter. Les animations (synapse, voies, boussole, titration du lithium) avancent elles aussi d’une étape par clic.
- **Après le cours** : la dernière diapositive affiche quatre codes QR (cartes de révision, cas et QRM, laboratoires, pharmacopée).
- **Vue présentateur** (touche **P** en projection) : diapositive suivante, notes, minutage prévu et chronomètre ; elle pilote la projection. Les deux fenêtres doivent être ouvertes dans le même navigateur, sur le site en ligne ou sur un serveur local.
- **Lien direct** : `…/#/diapo/synapse-isrs` (projection) ou `…/#/cours/synapse-isrs` (lecture). La page « Méthode » (lien en bas de page) résume les preuves pédagogiques et la façon d’animer.

## Voir le site sur son ordinateur

Les navigateurs bloquent souvent les polices et la vue présentateur quand on ouvre `index.html` directement. Le plus simple est un petit serveur local, dans le dossier du site :

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Modifier le contenu

Tout le contenu est dans **`content/cours.js`** : métadonnées (`C.site`), chapitres, objectifs, diapositives (`C.slides`), fiches des molécules (`C.mols`), glossaire (`C.terms`), panneaux des cibles (`C.panes`), archives (`C.history`), votes (`C.votes`), QRM (`C.quiz`), cas, arbres, cartes de révision, affinités (`C.binding`) et structures 2D des molécules (`C.structures`, calculées avec RDKit).

Dans une diapositive, `b` est affiché en lecture et en projection, `more` en lecture seulement, `notes` contient les notes de l’enseignant, `mins` les minutes prévues ; `f: true` ou `step: true` fait apparaître un bloc au clic, `reveal: 'heads'` (colonnes, étapes) montre les intitulés avant le contenu, `reveal: 'cells'` (tableaux) la première colonne avant le reste de chaque ligne, et `steps` règle les états successifs d’une visualisation.

Le mini-balisage des textes :

- `[[cle]]` ou `[[cle|texte]]` : un terme du glossaire ;
- `{{id}}` ou `{{id|texte}}` : un panneau (molécule, cible `c-…`, archive `h-…`) ;
- `((id-de-diapositive|texte))` : un lien vers une diapositive ;
- `**gras**`, `_italique_` ; `→` devient une flèche dessinée ; 5-HT1A, α2, D2, H1 reçoivent leurs indices automatiquement.

Les chaînes sont entre apostrophes droites : dans les textes, utilise l’apostrophe typographique ’. Après une modification, vérifie la cohérence (termes, panneaux, diapositives, votes, QRM, arbres, cartes) avec Node.js :

```
node outils/verifier-contenu.js
```

## Avertissement et licences

Ressource pédagogique : elle ne remplace ni le RCP ni un avis médical. Les posologies, AMM, règles de prescription et disponibilités évoluent ; vérifie-les dans les sources officielles avant de prescrire. Les simulations (synapse, lithiémie) sont qualitatives et ne servent pas à doser un patient.

Polices libres (licence SIL Open Font License, textes dans `assets/fonts/`) : **Mousse**, la police du titre, dessinée pour ce cours d’après un lettrage géométrique de Jean (Hans) Arp ; Newsreader, Jost, DM Mono, Didact Gothic et Literata (pour le grec). Générateur de codes QR : qrcode-generator de Kazuhiko Arase (licence MIT, `assets/vendor/`). Aucune donnée ne quitte le navigateur : la progression des cartes et des QRM reste en stockage local.
