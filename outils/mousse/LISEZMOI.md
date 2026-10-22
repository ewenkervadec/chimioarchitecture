# Mousse — la police du titre

Police de titrage dessinée pour « Chimioarchitecture de l’humeur », d’après la grammaire d’un lettrage géométrique de Jean (Hans) Arp : traits monolinéaires gras, épaules carrées, panses rondes, r à disque. Chaque glyphe est construit par géométrie (disques, anneaux, rectangles, opérations booléennes), puis ses angles sont adoucis comme une impression typographique.

- `glyphs.py` : le dessin de chaque glyphe (unités : 1000 par cadratin) ;
- `geom.py` : les primitives et les opérations booléennes (skia-pathops) ;
- `build.py` : construit `mousse.otf` et `mousse.woff2` ;

Reconstruire (Python 3, `pip install fonttools skia-pathops brotli`) :

```
python3 build.py sortie/
cp sortie/mousse.woff2 ../../assets/fonts/
```

Licence : SIL Open Font License 1.1 (voir `assets/fonts/OFL-mousse.txt`).
