"""Géométrie constructive pour la police Mousse : disques, anneaux, rectangles, polygones,
secteurs, opérations booléennes (skia-pathops), transformations."""
import math
import pathops
from fontTools.pens.transformPen import TransformPen

K = 0.5522847498307936  # approximation d'un quart de cercle par une cubique


def path():
    return pathops.Path()


def ellipse(cx, cy, rx, ry):
    p = path()
    p.moveTo(cx + rx, cy)
    p.cubicTo(cx + rx, cy + ry * K, cx + rx * K, cy + ry, cx, cy + ry)
    p.cubicTo(cx - rx * K, cy + ry, cx - rx, cy + ry * K, cx - rx, cy)
    p.cubicTo(cx - rx, cy - ry * K, cx - rx * K, cy - ry, cx, cy - ry)
    p.cubicTo(cx + rx * K, cy - ry, cx + rx, cy - ry * K, cx + rx, cy)
    p.close()
    return p


def circle(cx, cy, r):
    return ellipse(cx, cy, r, r)


def rect(x0, y0, x1, y1):
    p = path()
    p.moveTo(x0, y0); p.lineTo(x1, y0); p.lineTo(x1, y1); p.lineTo(x0, y1); p.close()
    return p


def poly(pts):
    p = path()
    p.moveTo(*pts[0])
    for q in pts[1:]:
        p.lineTo(*q)
    p.close()
    return p


def union(*ps):
    ps = [p for p in ps if p is not None]
    out = ps[0]
    for q in ps[1:]:
        out = pathops.op(out, q, pathops.PathOp.UNION)
    return out


def diff(a, *bs):
    out = a
    for b in bs:
        out = pathops.op(out, b, pathops.PathOp.DIFFERENCE)
    return out


def inter(a, b):
    return pathops.op(a, b, pathops.PathOp.INTERSECTION)


def ring(cx, cy, R, r, ry=None, Ry=None):
    """Anneau ; ellipses si Ry/ry sont donnés (R, r : demi-axes horizontaux)."""
    Ry = R if Ry is None else Ry
    ry = r if ry is None else ry
    return diff(ellipse(cx, cy, R, Ry), ellipse(cx, cy, r, ry))


def wedge(cx, cy, a0, a1, R=4000, n=48):
    """Secteur angulaire (degrés, sens trigonométrique de a0 à a1), assez grand pour couper."""
    if a1 < a0:
        a1 += 360
    pts = [(cx, cy)]
    for i in range(n + 1):
        a = math.radians(a0 + (a1 - a0) * i / n)
        pts.append((cx + R * math.cos(a), cy + R * math.sin(a)))
    return poly(pts)


def hstroke(x0, y0, x1, y1, t):
    """Trait oblique d’épaisseur t (perpendiculaire), extrémités coupées à l’horizontale."""
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy)
    s = abs(dy) / L if L else 1
    w = t / max(s, 1e-6) / 2
    return poly([(x0 - w, y0), (x0 + w, y0), (x1 + w, y1), (x1 - w, y1)])


def vstroke(x0, y0, x1, y1, t):
    """Trait oblique d’épaisseur t, extrémités coupées à la verticale."""
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy)
    c = abs(dx) / L if L else 1
    h = t / max(c, 1e-6) / 2
    return poly([(x0, y0 - h), (x1, y1 - h), (x1, y1 + h), (x0, y0 + h)])


def transform(p, xx=1, xy=0, yx=0, yy=1, dx=0, dy=0):
    q = path()
    p.draw(TransformPen(q.getPen(), (xx, xy, yx, yy, dx, dy)))
    return q


def move(p, dx=0, dy=0):
    return transform(p, dx=dx, dy=dy)


def mirror_x(p, axis):
    return transform(p, xx=-1, dx=2 * axis)


def bounds(p):
    b = p.bounds
    return b  # (xmin, ymin, xmax, ymax)


def clean(p):
    q = pathops.simplify(p, fix_winding=True)
    return q


def band(p, w):
    """Bande d’épaisseur w centrée sur le contour (jointures rondes)."""
    q = path()
    q.addPath(p)
    q.stroke(w, pathops.LineCap.BUTT_CAP, pathops.LineJoin.ROUND_JOIN, 4)
    q.convertConicsToQuads()
    return q


def shrink(p, d):
    return diff(p, band(p, 2 * d))


def grow(p, d):
    return union(p, band(p, 2 * d))


def soften(p, convex=6, concave=4):
    """Adoucit les angles comme une impression typographique : saillants arrondis de rayon convex,
    rentrants de rayon concave."""
    q = p
    if convex:
        q = grow(shrink(q, convex), convex)
    if concave:
        q = shrink(grow(q, concave), concave)
    return q
