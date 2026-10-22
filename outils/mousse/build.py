"""Construit la police Mousse (OTF/CFF et WOFF2) à partir de glyphs.py.
Usage : python3 build.py [dossier de sortie]"""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(__file__))
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.ttLib import TTFont
import pathops
import glyphs as GL
from geom import move, clean, soften
SOFT = (int(os.environ.get('MOUSSE_SOFT', '7')), int(os.environ.get('MOUSSE_SOFT2', '4')))

SBT = {'st': 46, 'rd': 30, 'op': 20, 'dg': 14, 'bl': 16, 'none': 0}
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), 'out')
os.makedirs(OUT, exist_ok=True)

KERN = getattr(GL, 'KERN', {})


def build():
    order = ['.notdef'] + sorted(GL.G.keys(), key=lambda k: (k != 'space', k))
    cmap, charstrings, metrics = {}, {}, {}
    from fontTools.pens.t2CharStringPen import T2CharStringPen
    # .notdef : un rectangle vide
    pen = T2CharStringPen(500, None)
    pen.moveTo((50, 0)); pen.lineTo((450, 0)); pen.lineTo((450, 700)); pen.lineTo((50, 700)); pen.closePath()
    pen.moveTo((100, 50)); pen.lineTo((100, 650)); pen.lineTo((400, 650)); pen.lineTo((400, 50)); pen.closePath()
    charstrings['.notdef'] = pen.getCharString(); metrics['.notdef'] = (500, 50)
    for name in order[1:]:
        spec = GL.G[name]
        g, w = spec['f']()
        l, rr = spec['sb']
        lsb, rsb = SBT[l], SBT[rr]
        if name == 'space':
            adv = int(round(w))
            pen = T2CharStringPen(adv, None)
            charstrings[name] = pen.getCharString(); metrics[name] = (adv, 0)
        else:
            g = move(g, lsb, 0)
            if SOFT[0] or SOFT[1]:
                g = soften(g, SOFT[0], SOFT[1])
            g = clean(g)
            adv = int(round(lsb + w + rsb))
            pen = T2CharStringPen(adv, None)
            g.draw(pen)
            charstrings[name] = pen.getCharString()
            bp = BoundsPen(None); g.draw(bp)
            metrics[name] = (adv, int(round(bp.bounds[0])) if bp.bounds else 0)
        if spec['uni'] is not None:
            u = spec['uni'] if isinstance(spec['uni'], int) else ord(spec['uni'])
            cmap[u] = name
        for extra in spec.get('alt', []):
            cmap[extra] = name
    fb = FontBuilder(1000, isTTF=False)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    fb.setupCFF('Mousse-Bold', {'FullName': 'Mousse Bold', 'FamilyName': 'Mousse', 'Weight': 'Bold'}, charstrings, {})
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=900, descent=-260)
    fb.setupNameTable({'familyName': 'Mousse', 'styleName': 'Bold', 'uniqueFontIdentifier': 'Mousse-Bold-2026',
                       'fullName': 'Mousse Bold', 'psName': 'Mousse-Bold', 'version': 'Version 1.000',
                       'copyright': 'Copyright 2026, Ewen Kervadec. Lettrage de titrage dessiné pour « Chimioarchitecture de l’humeur ».',
                       'licenseDescription': 'This Font Software is licensed under the SIL Open Font License, Version 1.1.',
                       'licenseInfoURL': 'https://openfontlicense.org'})
    fb.setupOS2(sTypoAscender=760, sTypoDescender=-250, sTypoLineGap=120, usWinAscent=920, usWinDescent=280,
                sxHeight=GL.X, sCapHeight=GL.CAP, usWeightClass=700, fsSelection=0x20, achVendID='EWEN')
    fb.setupPost()
    font = fb.font
    if KERN:
        fea = 'languagesystem DFLT dflt;\nlanguagesystem latn dflt;\nfeature kern {\n' + ''.join(
            '  pos %s %s %d;\n' % (a, b, v) for (a, b), v in KERN.items() if a in charstrings and b in charstrings) + '} kern;\n'
        addOpenTypeFeaturesFromString(font, fea)
    otf = os.path.join(OUT, 'mousse.otf')
    font.save(otf)
    f2 = TTFont(otf); f2.flavor = 'woff2'; f2.save(os.path.join(OUT, 'mousse.woff2'))
    print('ok', len(order), 'glyphes ->', OUT)


if __name__ == '__main__':
    build()
