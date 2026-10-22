"""Mousse — glyphes. Unités : 1000 par cadratin. Chaque fonction renvoie (chemin, chasse de l’encre) ;
le dessin commence à x = 0 et les approches (flancs) sont ajoutées par build.py.
Grammaire tirée du lettrage « Jean Hans Arp » : traits monolinéaires gras, épaules carrées (n, m, h, a, u),
panses rondes (o, c, e, p, d), r à disque, A à sommet tronqué, J à crochet rond coupé en biais."""
import math
from geom import *

X = 490        # hauteur d’x
CAP = 700      # capitales
ASC = 735      # ascendantes
DESC = -240    # descendantes
S = 144        # fût des minuscules
B = 138        # barres des minuscules
SC = 152       # fût des capitales
BC = 140       # barres des capitales
O = 10         # débord des formes rondes
OA = 18        # débord des pointes

R = X / 2 + O          # rayon extérieur des panses
r_in = R - S           # rayon intérieur
CY = X / 2

G = {}
KERN = {}


def glyph(name, uni=None, sb=('st', 'st')):
    def deco(f):
        G[name] = dict(f=f, uni=uni, sb=sb)
        return f
    return deco


def ink(g):
    bx = g.bounds
    return move(g, -bx[0]), bx[2] - bx[0]


# ───────── panses ─────────
def bowl(cx=R, cy=CY):
    return ring(cx, cy, R, r_in)


@glyph('o', 'o', ('rd', 'rd'))
def o():
    return bowl(), 2 * R


@glyph('c', 'c', ('rd', 'op'))
def c():
    a = 40
    g = diff(bowl(), wedge(R, CY, -a, a))
    return g, R + R * math.cos(math.radians(a))


E_BAR = 104


def e_shape(cx=R):
    bt = E_BAR
    y0 = CY - bt / 2 + 4
    bar = inter(rect(cx - R, y0, cx + R, y0 + bt), circle(cx, CY, R - 2))
    g = union(bowl(cx), bar)
    return diff(g, wedge(cx, y0, -36, 0))


@glyph('e', 'e', ('rd', 'rd'))
def e():
    return e_shape(), 2 * R


@glyph('p', 'p', ('st', 'rd'))
def p():
    return union(bowl(), rect(0, DESC, S, X)), 2 * R


@glyph('b', 'b', ('st', 'rd'))
def b():
    return union(bowl(), rect(0, 0, S, ASC)), 2 * R


@glyph('d', 'd', ('rd', 'st'))
def d():
    return union(bowl(), rect(2 * R - S, 0, 2 * R, ASC)), 2 * R


@glyph('q', 'q', ('rd', 'st'))
def q():
    return union(bowl(), rect(2 * R - S, DESC, 2 * R, X)), 2 * R


def hook_down(xr, ytop, bottom, Rh, end=-158, t=S):
    """Crochet rond sous un fût dont le bord droit est en xr (J, j, g)."""
    cx, cy = xr - Rh, bottom + Rh
    h = inter(ring(cx, cy, Rh, Rh - t), wedge(cx, cy, end, 0))
    return union(h, rect(xr - t, cy, xr, ytop))


@glyph('g', 'g', ('rd', 'st'))
def g():
    xr = 2 * R
    tail = hook_down(xr, X, DESC - O, 196, end=-160)
    return ink(union(bowl(), tail))


# ───────── fûts et épaules carrées ─────────
NW = 428


@glyph('n', 'n')
def n():
    W = NW
    return union(rect(0, 0, S, X), rect(W - S, 0, W, X), rect(0, X - B, W, X)), W


@glyph('m', 'm')
def m():
    inner = 128
    W = 3 * S + 2 * inner
    mid = S + inner
    return union(rect(0, 0, S, X), rect(mid, 0, mid + S, X), rect(W - S, 0, W, X), rect(0, X - B, W, X)), W


@glyph('h', 'h')
def h():
    W = NW
    return union(rect(0, 0, S, ASC), rect(W - S, 0, W, X), rect(0, X - B, W, X)), W


@glyph('u', 'u')
def u():
    W = NW
    return union(rect(0, 0, S, X), rect(W - S, 0, W, X), rect(0, 0, W, B)), W


def a_shape():
    """a à épaule carrée : une barre plate à la hauteur d’x, qui déborde à gauche de la panse ronde."""
    Ra = 226
    W = 2 * Ra
    stem = rect(W - S, 0, W, X)
    bar = rect(112, X - B, W, X)
    body = circle(Ra, Ra - O, Ra)
    cnt = inter(ellipse(Ra - 8, 233, 88, 119), rect(0, 0, W, X - B))
    return diff(union(stem, bar, body), cnt), W


@glyph('a', 'a', ('rd', 'st'))
def a():
    return a_shape()


@glyph('r', 'r', ('st', 'bl'))
def r():
    rb = 103
    return union(rect(0, 0, S, X), circle(S + 82, X - rb + 4, rb)), S + 82 + rb


DOT = 80


def dot_at(cx, y=X + 78):
    return circle(cx, y + DOT, DOT)


@glyph('i', 'i')
def i():
    return union(rect(0, 0, S, X), dot_at(S / 2)), S


@glyph('dotlessi', 0x131)
def dotlessi():
    return rect(0, 0, S, X), S


@glyph('j', 'j', ('dg', 'st'))
def j():
    hk = hook_down(S, X, DESC - O, 150, end=-165)
    return ink(union(hk, dot_at(S / 2)))


@glyph('l', 'l')
def l():
    return rect(0, 0, S, ASC), S


@glyph('t', 't', ('dg', 'dg'))
def t():
    L = 70
    return union(rect(L, 0, L + S, 650), rect(0, X - B, L + S + 96, X)), L + S + 96


@glyph('f', 'f', ('dg', 'dg'))
def f():
    L = 64
    Rh = 160
    cx, cy = L + Rh, ASC - Rh + O
    top = inter(ring(cx, cy, Rh, Rh - S), wedge(cx, cy, 24, 180))
    stem = rect(L, 0, L + S, cy)
    bar = rect(0, X - B, L + S + 112, X)
    g = union(top, stem, bar)
    return g, g.bounds[2]


@glyph('k', 'k', ('st', 'dg'))
def k():
    W = 456
    arm = hstroke(S + 36, 150, W - 72, X, 150)
    leg = hstroke(S + 120, 246, W - 68, 0, 152)
    g = union(rect(0, 0, S, ASC), inter(union(arm, leg), rect(S - 20, 0, W + 40, X)))
    return g, g.bounds[2]


def vee(W, H, t, flat=0, base=0):
    """V pointu : triangle extérieur moins triangle intérieur (traits d’épaisseur t)."""
    cx = W / 2
    apex = base - OA * 0.6
    th = math.atan2(H - apex, cx - flat / 2)
    wh = t / math.sin(th)
    outer = poly([(0, H), (W, H), (cx + flat / 2, apex), (cx - flat / 2, apex)])
    yi = H - (H - apex) * (cx - wh) / (cx - flat / 2)
    inner = poly([(wh, H + 1), (W - wh, H + 1), (cx, yi)])
    return diff(outer, inner)


@glyph('v', 'v', ('dg', 'dg'))
def v():
    W = 474
    return vee(W, X, 146), W


@glyph('w', 'w', ('dg', 'dg'))
def w():
    return ink(double_v(700, X, 136, 400))


@glyph('y', 'y', ('dg', 'dg'))
def y():
    W = 480
    t = 146
    cx = W / 2
    apex = -OA * 0.6
    th = math.atan2(X - apex, cx)
    k_ = 1 / math.tan(th)
    left = inter(vee(W, X, t), rect(-10, 0, cx + 2, X + 1))
    right = hstroke(W - t / math.sin(th) / 2 - (X - DESC) * k_, DESC, W - t / math.sin(th) / 2, X, t)
    return ink(union(left, right))


@glyph('x', 'x', ('dg', 'dg'))
def x():
    W = 468
    g = union(hstroke(75, 0, W - 75, X, 146), hstroke(W - 75, 0, 75, X, 146))
    return ink(inter(g, rect(-60, 0, W + 60, X)))


@glyph('z', 'z', ('dg', 'dg'))
def z():
    W = 420
    dw = 150 / math.sin(math.atan2(X - 2 * B, W))
    g = union(rect(0, X - B, W, X), rect(0, 0, W, B), poly([(W - dw, X - B), (W, X - B), (dw, B), (0, B)]))
    return g, W


def s_shape(H, T, Th, rxo, a_top=40, a_bot=-140, o=O):
    ryo = (H + 2 * o + T) / 4
    ryi = ryo - T
    rxi = rxo - Th
    cx = rxo
    ct, cb = H + o - ryo, -o + ryo
    top = inter(ring(cx, ct, rxo, rxi, ry=ryi, Ry=ryo), wedge(cx, ct, a_top, 270))
    bot = inter(ring(cx, cb, rxo, rxi, ry=ryi, Ry=ryo), wedge(cx, cb, a_bot, 90))
    return union(top, bot), 2 * rxo


@glyph('s', 's', ('rd', 'rd'))
def s():
    return s_shape(X, 116, 146, 182)


# ───────── capitales ─────────
RC = CAP / 2 + O
rc_in = RC - SC


@glyph('C', 'C', ('rd', 'op'))
def C_():
    a = 40
    g = diff(ring(RC, CAP / 2, RC, rc_in), wedge(RC, CAP / 2, -a, a))
    return g, RC + RC * math.cos(math.radians(a))


@glyph('G', 'G', ('rd', 'st'))
def G_():
    g = diff(ring(RC, CAP / 2, RC, rc_in), wedge(RC, CAP / 2, 6, 42))
    bar = rect(RC - 6, CAP / 2 - BC + 18, 2 * RC, CAP / 2 + 18)
    g = union(g, inter(bar, circle(RC, CAP / 2, RC)))
    return g, 2 * RC


@glyph('O', 'O', ('rd', 'rd'))
def O_():
    return ring(RC, CAP / 2, RC, rc_in), 2 * RC


@glyph('Q', 'Q', ('rd', 'dg'))
def Q_():
    tail = hstroke(RC + 60, 230, 2 * RC + 40, -60, 140)
    return ink(union(ring(RC, CAP / 2, RC, rc_in), inter(tail, rect(0, -60, 2 * RC + 80, 260))))


@glyph('H', 'H')
def H_():
    W = 578
    yc = 368
    return union(rect(0, 0, SC, CAP), rect(W - SC, 0, W, CAP), rect(0, yc - BC / 2, W, yc + BC / 2)), W


def line_offset(p0, p1, d):
    """Décale la droite (p0, p1) de d vers sa gauche (sens de parcours)."""
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    L = math.hypot(dx, dy)
    nx, ny = -dy / L * d, dx / L * d
    return (p0[0] + nx, p0[1] + ny), (p1[0] + nx, p1[1] + ny)


def intersect(a0, a1, b0, b1):
    x1, y1 = a0; x2, y2 = a1; x3, y3 = b0; x4, y4 = b1
    den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den
    py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den
    return px, py


def a_cap(W=676, ta=112, ybar=134, t=SC):
    cx = W / 2
    L0, L1 = (0, 0), (cx - ta / 2, CAP)
    R0, R1 = (W, 0), (cx + ta / 2, CAP)
    outer = poly([L0, R0, R1, L1])
    il0, il1 = line_offset(L0, L1, -t)     # vers l’intérieur (à droite du bord gauche)
    ir0, ir1 = line_offset(R0, R1, t)
    apex = intersect(il0, il1, ir0, ir1)
    bl = intersect(il0, il1, (0, -2), (W, -2))
    br = intersect(ir0, ir1, (0, -2), (W, -2))
    inner = poly([bl, br, apex])
    bar = inter(rect(0, ybar, W, ybar + BC), outer)
    return union(diff(outer, inner), bar), W


@glyph('A', 'A', ('dg', 'dg'))
def A_():
    return a_cap()


@glyph('J', 'J', ('dg', 'st'))
def J_():
    Rh = 176
    xr = 230 + SC
    hk = inter(ring(xr - Rh, Rh - O, Rh, Rh - SC), wedge(xr - Rh, Rh - O, -157, 0))
    return ink(union(hk, rect(xr - SC, Rh - O, xr, CAP)))


@glyph('I', 'I')
def I_():
    return rect(0, 0, SC, CAP), SC


@glyph('L', 'L', ('st', 'dg'))
def L_():
    return union(rect(0, 0, SC, CAP), rect(0, 0, 430, BC)), 430


@glyph('E', 'E', ('st', 'dg'))
def E_():
    return union(rect(0, 0, SC, CAP), rect(0, 0, 440, BC), rect(0, CAP - BC, 440, CAP), rect(0, 366 - BC / 2, 400, 366 + BC / 2)), 440


@glyph('F', 'F', ('st', 'dg'))
def F_():
    return union(rect(0, 0, SC, CAP), rect(0, CAP - BC, 430, CAP), rect(0, 352 - BC / 2, 390, 352 + BC / 2)), 430


@glyph('T', 'T', ('dg', 'dg'))
def T_():
    W = 560
    return union(rect(0, CAP - BC, W, CAP), rect(W / 2 - SC / 2, 0, W / 2 + SC / 2, CAP)), W


def half_bowl(x0, y0, y1, depth, t):
    """Panse droite d’une capitale (P, B, R, D) : barres horizontales depuis x0 et demi-anneau."""
    h = y1 - y0
    ry = h / 2
    rx = min(depth, ry)
    cx = x0 + depth - rx
    cy = y0 + ry
    ringp = inter(ring(cx, cy, rx, max(rx - t, 1), ry=max(ry - t * 0.94, 1), Ry=ry), rect(cx, y0 - 1, cx + rx + 1, y1 + 1))
    bars = union(rect(x0, y1 - t * 0.94, cx + 1, y1), rect(x0, y0, cx + 1, y0 + t * 0.94))
    return union(ringp, bars)


@glyph('P', 'P', ('st', 'rd'))
def P_():
    W = 520
    return union(rect(0, 0, SC, CAP), half_bowl(0, 300, CAP, W, 140)), W


@glyph('R', 'R', ('st', 'dg'))
def R_():
    W = 520
    leg = hstroke(300, 300, 470, 0, 152)
    g = union(rect(0, 0, SC, CAP), half_bowl(0, 300, CAP, W, 140), inter(leg, rect(0, 0, 600, 330)))
    return ink(g)


@glyph('B', 'B', ('st', 'rd'))
def B_():
    W1, W2 = 470, 520
    g = union(rect(0, 0, SC, CAP), half_bowl(0, 360, CAP, W1, 134), half_bowl(0, 0, 380, W2, 140))
    return g, W2


@glyph('D', 'D', ('st', 'rd'))
def D_():
    W = 640
    return union(rect(0, 0, SC, CAP), half_bowl(0, 0, CAP, W, 150)), W


@glyph('U', 'U')
def U_():
    W = 600
    Rr = W / 2
    cy = Rr - O
    bot = inter(ring(Rr, cy, Rr, Rr - SC), rect(-1, -20, W + 1, cy))
    return union(bot, rect(0, cy, SC, CAP), rect(W - SC, cy, W, CAP)), W


@glyph('V', 'V', ('dg', 'dg'))
def V_():
    W = 660
    return vee(W, CAP, SC), W


def lam(x0, x1, H, t, base=0):
    """Λ pointu (sommet en haut) entre x0 et x1, traits d’épaisseur t."""
    cx = (x0 + x1) / 2
    top = H + OA * 0.6
    W = x1 - x0
    th = math.atan2(top - base, W / 2)
    wh = t / math.sin(th)
    outer = poly([(x0, base), (x1, base), (cx, top)])
    yi = top * (W / 2 - wh) / (W / 2) + base * (wh / (W / 2))
    inner = poly([(x0 + wh, base - 1), (x1 - wh, base - 1), (cx, yi)])
    return diff(outer, inner)


def double_v(W, H, t, Wv):
    """W et w : deux bras extérieurs et un Λ central, pointes en bas et sommet central pointu."""
    apex = -OA * 0.6
    q1, q3 = Wv / 2, W - Wv / 2
    th = math.atan2(H - apex, Wv / 2)
    wh = t / math.sin(th)
    left = hstroke(wh / 2, H, q1, apex, t)
    right = hstroke(W - wh / 2, H, q3, apex, t)
    mid = lam(q1 - wh / 2, q3 + wh / 2, H, t, base=apex)
    g = union(left, right, mid)
    tip = lambda xc: poly([(xc - wh, apex + 2), (xc + wh, apex + 2), (xc, apex - 400)])
    g = inter(g, rect(-50, apex, W + 50, H))
    return g


@glyph('W', 'W', ('dg', 'dg'))
def W_():
    return ink(double_v(960, CAP, 140, 560))


@glyph('M', 'M')
def M_():
    W = 780
    t = 140
    cx = W / 2
    apex = -OA * 0.4
    arms = union(hstroke(SC / 2 + 4, CAP, cx, apex, t), hstroke(W - SC / 2 - 4, CAP, cx, apex, t))
    arms = inter(arms, rect(0, apex, W, CAP))
    return union(rect(0, 0, SC, CAP), rect(W - SC, 0, W, CAP), arms), W


@glyph('N', 'N')
def N_():
    W = 600
    t = 150
    diag = poly([(0, CAP), (SC + 40, CAP), (W, 0), (W - SC - 40, 0)])
    return union(rect(0, 0, SC, CAP), rect(W - SC, 0, W, CAP), diag), W


@glyph('K', 'K', ('st', 'dg'))
def K_():
    W = 600
    arm = hstroke(SC + 20, 250, W - 90, CAP, 156)
    leg = hstroke(SC + 150, 380, W - 84, 0, 160)
    g = union(rect(0, 0, SC, CAP), inter(union(arm, leg), rect(SC - 20, 0, W + 60, CAP)))
    return g, g.bounds[2]


@glyph('X', 'X', ('dg', 'dg'))
def X_():
    W = 640
    g = union(hstroke(95, 0, W - 95, CAP, 156), hstroke(W - 95, 0, 95, CAP, 156))
    return ink(inter(g, rect(-80, 0, W + 80, CAP)))


@glyph('Y', 'Y', ('dg', 'dg'))
def Y_():
    W = 640
    v = inter(vee(W, CAP, 152, base=240), rect(-10, 300, W + 10, CAP))
    return union(v, rect(W / 2 - SC / 2, 0, W / 2 + SC / 2, 330)), W


@glyph('Z', 'Z', ('dg', 'dg'))
def Z_():
    W = 560
    dw = 160 / math.sin(math.atan2(CAP - 2 * BC, W))
    return union(rect(0, CAP - BC, W, CAP), rect(0, 0, W, BC), poly([(W - dw, CAP - BC), (W, CAP - BC), (dw, BC), (0, BC)])), W


@glyph('S', 'S', ('rd', 'rd'))
def S_():
    return s_shape(CAP, 134, 160, 244, a_top=38, a_bot=-142)


# ───────── signes ─────────
@glyph('quoteright', 0x2019, ('dg', 'dg'))
def apos():
    rd = 58
    cx, cy = rd, CAP - rd + 44
    disc = circle(cx, cy, rd)
    Rt, rt = 150, 92
    tcx, tcy = cx - 34, cy + 2
    tail = inter(ring(tcx, tcy, Rt, rt), wedge(tcx, tcy, -60, 0))
    return ink(union(disc, tail))


def comma_at(y):
    g, w = apos()
    return move(g, 0, y - (CAP - 58 + 44 - 58)), w


@glyph('quotesingle', 0x27, ('dg', 'dg'))
def quotesingle():
    return apos()


@glyph('quoteleft', 0x2018, ('dg', 'dg'))
def quoteleft():
    g, w = apos()
    g = transform(g, xx=-1, yy=-1, dx=w, dy=2 * (CAP - 58 + 44) - 30)
    return ink(g)


@glyph('comma', ',', ('dg', 'dg'))
def comma():
    g, w = apos()
    return move(g, 0, -(CAP - 58 + 44 - 58) - 10), w


@glyph('period', '.', ('dg', 'dg'))
def period():
    return circle(70, 70 - O, 70), 140


@glyph('periodcentered', 0xB7, ('dg', 'dg'))
def periodcentered():
    return circle(66, 250, 66), 132


@glyph('ellipsis', 0x2026, ('dg', 'dg'))
def ellipsis():
    return union(circle(70, 60, 70), circle(270, 60, 70), circle(470, 60, 70)), 540


@glyph('colon', ':', ('dg', 'dg'))
def colon():
    return union(circle(70, 70 - O, 70), circle(70, X - 70 + O, 70)), 140


@glyph('semicolon', ';', ('dg', 'dg'))
def semicolon():
    g, w = comma()
    return ink(union(g, circle(66, X - 70 + O, 70)))


@glyph('hyphen', '-', ('dg', 'dg'))
def hyphen():
    return rect(0, 230, 270, 230 + 120), 270


@glyph('endash', 0x2013, ('dg', 'dg'))
def endash():
    return rect(0, 230, 500, 230 + 110), 500


@glyph('emdash', 0x2014, ('dg', 'dg'))
def emdash():
    return rect(0, 230, 920, 230 + 110), 920


@glyph('exclam', '!', ('dg', 'dg'))
def exclam():
    return union(rect(0, 220, SC, CAP), circle(SC / 2, 70 - O, 74)), SC


@glyph('question', '?', ('dg', 'dg'))
def question():
    Rq = 210
    cx, cy = Rq, CAP - Rq + O
    top = inter(ring(cx, cy, Rq, Rq - SC), wedge(cx, cy, -90, 158))
    stem = rect(cx - SC / 2, 220, cx + SC / 2, cy - Rq + SC)
    return ink(union(top, stem, circle(cx, 70 - O, 74)))


def chevron(x0, w, h, t, y):
    return vstroke_chev(x0, w, h, t, y)


def vstroke_chev(x0, w, h, t, y):
    a = (x0 + w, y + h / 2), (x0, y)
    b = (x0 + w, y - h / 2), (x0, y)
    return union(vstroke(x0 + w, y + h / 2, x0, y, t), vstroke(x0 + w, y - h / 2, x0, y, t))


@glyph('guillemotleft', 0xAB, ('dg', 'dg'))
def guilleft():
    yc = 250
    def ch(x0):
        return poly([(x0, yc), (x0 + 150, yc + 170), (x0 + 270, yc + 170), (x0 + 120, yc), (x0 + 270, yc - 170), (x0 + 150, yc - 170)])
    return ink(union(ch(0), ch(200)))


@glyph('guillemotright', 0xBB, ('dg', 'dg'))
def guilright():
    g, w = guilleft()
    return ink(mirror_x(g, w / 2))


@glyph('parenleft', '(', ('dg', 'dg'))
def parenleft():
    Rp = 520
    cx, cy = Rp - 10, 250
    g = inter(ring(cx, cy, Rp, Rp - 126), rect(0, DESC + 20, 200, ASC))
    return ink(inter(g, wedge(cx, cy, 126, 234)))


@glyph('parenright', ')', ('dg', 'dg'))
def parenright():
    g, w = parenleft()
    return ink(mirror_x(g, w / 2))


@glyph('slash', '/', ('dg', 'dg'))
def slash():
    return ink(hstroke(0, DESC + 40, 330, ASC, 120))


@glyph('space', 0x20, ('none', 'none'))
def space():
    return path(), 230


@glyph('nbspace', 0xA0, ('none', 'none'))
def nbspace():
    return path(), 230


@glyph('thinspace', 0x202F, ('none', 'none'))
def thinspace():
    return path(), 120


# ───────── chiffres (alignés, chasse proportionnelle) ─────────
@glyph('zero', '0', ('rd', 'rd'))
def zero():
    rx, ry = 250, CAP / 2 + O
    return ring(rx, CAP / 2, rx, rx - SC * 0.96, ry=ry - BC, Ry=ry), 2 * rx


@glyph('one', '1', ('dg', 'st'))
def one():
    flag = poly([(150 - 10, CAP), (150 + SC, CAP), (150 + SC, CAP - 180), (0, CAP - 300), (0, CAP - 150)])
    return union(rect(150, 0, 150 + SC, CAP), inter(flag, rect(0, 0, 400, CAP))), 150 + SC


@glyph('two', '2', ('dg', 'dg'))
def two():
    Rt = 228
    cx, cy = Rt, CAP - Rt + O
    top = inter(ring(cx, cy, Rt, Rt - SC), wedge(cx, cy, -40, 162))
    a = math.radians(-22)
    px, py = cx + (Rt - SC / 2) * math.cos(a), cy + (Rt - SC / 2) * math.sin(a)
    diag = diff(hstroke(px, py, 70, BC - 4, 156), circle(cx, cy, Rt - SC))
    diag = inter(diag, rect(0, BC - 6, 2 * Rt + 20, cy))
    return ink(union(top, diag, rect(0, 0, 2 * Rt, BC)))


@glyph('three', '3', ('rd', 'rd'))
def three():
    T = 134
    mid = 380
    cxt = 236
    cyt = (CAP + O + mid - T / 2) / 2
    ryt = CAP + O - cyt
    cyb = (mid + T / 2 - O) / 2
    ryb = mid + T / 2 - cyb
    up = inter(ring(cxt, cyt, 196, 196 - SC, ry=ryt - T, Ry=ryt), wedge(cxt, cyt, -90, 152))
    lo = inter(ring(cxt, cyb, 230, 230 - SC, ry=ryb - T, Ry=ryb), wedge(cxt, cyb, -152, 90))
    bar = rect(cxt - 92, mid - T / 2, cxt + 2, mid + T / 2)
    return ink(union(up, lo, bar))


@glyph('four', '4', ('dg', 'dg'))
def four():
    W = 560
    g = union(rect(360, 0, 360 + SC, CAP), rect(0, 160, W, 160 + BC), poly([(360, CAP), (360 + SC, CAP), (150, 160 + BC), (0, 160)]))
    return inter(g, rect(0, 0, W, CAP)), W


@glyph('five', '5', ('dg', 'rd'))
def five():
    lo = inter(ring(240, 230, 240, 240 - SC, ry=240 - BC, Ry=240), wedge(240, 230, -150, 120))
    g = union(lo, rect(40, CAP - BC, 450, CAP), rect(40, 300, 40 + SC, CAP))
    return ink(g)


@glyph('six', '6', ('rd', 'rd'))
def six():
    Rl = 250
    cx, cy = Rl, Rl - O
    lo = ring(cx, cy, Rl, Rl - SC, ry=Rl - BC, Ry=Rl)
    a = math.radians(160)
    px, py = cx + (Rl - SC / 2) * math.cos(a), cy + (Rl - SC / 2) * math.sin(a)
    st = diff(hstroke(px, py, 330, CAP, 156), ellipse(cx, cy, Rl - SC, Rl - BC))
    st = inter(st, rect(0, cy - 40, 600, CAP))
    return ink(union(lo, st))


@glyph('seven', '7', ('dg', 'dg'))
def seven():
    W = 500
    g = union(rect(0, CAP - BC, W, CAP), hstroke(130, 0, W - 80, CAP - BC + 10, 156))
    return inter(g, rect(0, 0, W, CAP)), W


@glyph('eight', '8', ('rd', 'rd'))
def eight():
    up = ring(250, 530, 200, 200 - BC, ry=180 - BC * 0.92, Ry=180)
    lo = ring(250, 210, 250, 250 - SC, ry=220 - BC, Ry=220)
    return ink(union(up, lo))


@glyph('nine', '9', ('rd', 'rd'))
def nine():
    g, w = six()
    return ink(transform(g, xx=-1, yy=-1, dx=w, dy=CAP))


# ───────── ligatures et diacritiques ─────────
def acute(cx, base):
    return hstroke(cx - 50, base, cx + 50, base + 170, 118)


def grave(cx, base):
    return hstroke(cx + 50, base, cx - 50, base + 170, 118)


def circumflex(cx, base):
    t = 112
    return union(hstroke(cx - 120, base, cx - 10, base + 170, t), hstroke(cx + 120, base, cx + 10, base + 170, t), circle(cx, base + 170 - 46, 0.1))


def circumflex2(cx, base):
    outer = poly([(cx - 170, base), (cx - 50, base), (cx, base + 90), (cx + 50, base), (cx + 170, base), (cx + 60, base + 190), (cx - 60, base + 190)])
    return outer


def dieresis(cx, base, gap=190):
    return union(circle(cx - gap / 2, base + 70, 70), circle(cx + gap / 2, base + 70, 70))


def cedilla(cx):
    Rc = 90
    hk = inter(ring(cx - 10, -70, Rc, Rc - 70), wedge(cx - 10, -70, -150, 90))
    return union(hk, rect(cx - 45, -70 + Rc - 70 - 4, cx + 25, 20))


ACC = {'acute': acute, 'grave': grave, 'circumflex': circumflex2, 'dieresis': dieresis}
LOW_BASE = X + 86
CAP_BASE = CAP + 64


def compose(name, uni, base, mark, cap=False):
    spec = G[base]

    def f():
        g, w = spec['f']()
        bx = g.bounds
        cx = (bx[0] + bx[2]) / 2
        if base in ('i', 'dotlessi'):
            g, w = rect(0, 0, S, X), S
            cx = S / 2
        if base == 'a':
            cx = 260
        if base == 'u':
            cx = NW / 2
        m_ = ACC[mark](cx, CAP_BASE if cap else LOW_BASE)
        return union(g, m_), w
    G[name] = dict(f=f, uni=uni, sb=spec['sb'])


for nm, u_, bs, mk in [('eacute', 0xE9, 'e', 'acute'), ('egrave', 0xE8, 'e', 'grave'), ('ecircumflex', 0xEA, 'e', 'circumflex'), ('edieresis', 0xEB, 'e', 'dieresis'),
                       ('agrave', 0xE0, 'a', 'grave'), ('acircumflex', 0xE2, 'a', 'circumflex'), ('adieresis', 0xE4, 'a', 'dieresis'),
                       ('icircumflex', 0xEE, 'i', 'circumflex'), ('idieresis', 0xEF, 'i', 'dieresis'), ('ocircumflex', 0xF4, 'o', 'circumflex'), ('odieresis', 0xF6, 'o', 'dieresis'),
                       ('ugrave', 0xF9, 'u', 'grave'), ('ucircumflex', 0xFB, 'u', 'circumflex'), ('udieresis', 0xFC, 'u', 'dieresis'), ('ydieresis', 0xFF, 'y', 'dieresis'),
                       ('oacute', 0xF3, 'o', 'acute'), ('aacute', 0xE1, 'a', 'acute'), ('iacute', 0xED, 'i', 'acute'), ('uacute', 0xFA, 'u', 'acute')]:
    compose(nm, u_, bs, mk)
for nm, u_, bs, mk in [('Eacute', 0xC9, 'E', 'acute'), ('Egrave', 0xC8, 'E', 'grave'), ('Ecircumflex', 0xCA, 'E', 'circumflex'), ('Agrave', 0xC0, 'A', 'grave'),
                       ('Acircumflex', 0xC2, 'A', 'circumflex'), ('Ocircumflex', 0xD4, 'O', 'circumflex'), ('Icircumflex', 0xCE, 'I', 'circumflex'), ('Ucircumflex', 0xDB, 'U', 'circumflex')]:
    compose(nm, u_, bs, mk, cap=True)


@glyph('ccedilla', 0xE7, ('rd', 'op'))
def ccedilla():
    g, w = c()
    return union(g, cedilla(R)), w


@glyph('Ccedilla', 0xC7, ('rd', 'op'))
def Ccedilla():
    g, w = C_()
    return union(g, cedilla(RC)), w


@glyph('oe', 0x153, ('rd', 'rd'))
def oe():
    off = 2 * R - S * 0.9
    return union(bowl(), move(e_shape(), off)), off + 2 * R


@glyph('ae', 0xE6, ('rd', 'rd'))
def ae():
    ga, wa = a_shape()
    off = wa - S * 0.9
    return union(ga, move(e_shape(), off)), off + 2 * R


# approches de paires (en unités), réglées à l’œil sur le titre et des mots courants
KERN.update({
    ('C', 'h'): -10, ('r', 'c'): -14, ('r', 'a'): -14, ('r', 'e'): -16, ('r', 'o'): -16, ('r', 'period'): -40, ('r', 'comma'): -40,
    ('t', 'e'): -8, ('t', 'u'): -4, ('c', 't'): -6, ('l', 'quoteright'): -26, ('quoteright', 'h'): -18, ('quoteright', 'a'): -30,
    ('quoteright', 'e'): -30, ('quoteright', 'o'): -30, ('d', 'e'): 0, ('e', 'u'): -4, ('o', 'a'): -6, ('T', 'o'): -60, ('T', 'e'): -60, ('T', 'a'): -60,
    ('A', 'V'): -70, ('V', 'A'): -70, ('A', 'T'): -50, ('T', 'A'): -50, ('L', 'T'): -60, ('A', 'Y'): -60, ('Y', 'A'): -60, ('P', 'A'): -50,
    ('A', 'r'): -6, ('v', 'e'): -12, ('v', 'o'): -12, ('y', 'o'): -12, ('o', 'v'): -12, ('e', 'v'): -12, ('f', 'o'): -10, ('f', 'e'): -10,
})
