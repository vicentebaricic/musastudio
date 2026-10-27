"""Vectoriza el texto del logo (MUSA / ── STUDIO ──) desde Media/logo-musa-original.jpg.

El logo original mide solo 534 px, así que en tamaños grandes se pixela. Aquí cada pieza se amplía,
se suaviza, se umbraliza y se traza con potrace: quedan SVG nítidos a cualquier tamaño.
La imagen de la musa (rostro) no se usa: el logo del sitio es solo "MUSA STUDIO".

    assets/img/logo-musa-studio.svg         MUSA + STUDIO, degradado dorado (header, menú, gift card)
    assets/img/logo-musa-studio-oscuro.svg  lo mismo en bronce, para fondos claros
    tools/musa-wordmark.svg                 solo MUSA, color "currentColor" (build_pages.py lo inserta en el pie)
    assets/img/favicon.svg                  la "M" dorada sobre negro (ícono de la pestaña)

Uso: pip install potracer && python3 tools/build_wordmark.py
"""
import os
import numpy as np
import potrace
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Media", "logo-musa-original.jpg")
A = os.path.join(ROOT, "assets", "img")
UP = 10   # ampliación antes de trazar
C = 267   # centro del círculo del logo en el original

def lum_up():
    im = Image.open(SRC).convert("RGB")
    lum = Image.fromarray(np.asarray(im).astype(np.float32).max(2).astype(np.uint8))
    big = lum.resize((im.width * UP, im.height * UP), Image.LANCZOS).filter(ImageFilter.GaussianBlur(UP * 0.5))
    return np.asarray(big).astype(np.float32) / 255.0

def trace(mask):
    """Máscara booleana (coordenadas ×UP) → datos de path SVG en coordenadas del original."""
    path = potrace.Bitmap(~mask).trace(turdsize=UP * UP * 3, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda p: f"{p.x / UP:.2f} {p.y / UP:.2f}"
    d = []
    for curve in path:
        d.append("M" + f(curve.start_point))
        for s in curve.segments:
            d.append(("L" + f(s.c) + "L" + f(s.end_point)) if s.is_corner
                     else ("C" + f(s.c1) + " " + f(s.c2) + " " + f(s.end_point)))
        d.append("Z")
    return "".join(d)

def bbox(mask, pad=1.5):
    ys, xs = np.nonzero(mask)
    return xs.min() / UP - pad, ys.min() / UP - pad, xs.max() / UP + pad, ys.max() / UP + pad

def svg(box, body, defs=""):
    x0, y0, x1, y1 = box
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {x1 - x0:.2f} {y1 - y0:.2f}" '
            f'focusable="false">{defs}{body}</svg>')

def gradient(stops):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.35">{s}</linearGradient></defs>'

if __name__ == "__main__":
    a = lum_up()
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    ox, oy = xx / UP, yy / UP
    ink = (a > 0.36) & (np.hypot(ox - C, oy - C) < 215)       # fuera del círculo exterior
    tail = (ox < 175) & (oy < 356)                             # cola de la M, que baja hasta la línea de STUDIO
    musa = ink & (oy > 250) & ((oy < 344) | tail)
    studio = ink & (oy > 344) & (oy < 380) & ~tail

    d_musa, d_studio = trace(musa), trace(studio)
    b1, b2 = bbox(musa), bbox(studio)
    full = (min(b1[0], b2[0]), b1[1], max(b1[2], b2[2]), b2[3])

    paths = f'<path fill="url(#g)" fill-rule="evenodd" d="{d_musa}{d_studio}"/>'
    gold = gradient([(0, "#A9843E"), (0.35, "#E8CB85"), (0.6, "#C9A55C"), (0.85, "#F1DCA2"), (1, "#B8934A")])
    bronze = gradient([(0, "#6E5220"), (0.45, "#9C7A35"), (1, "#7A5C24")])
    open(os.path.join(A, "logo-musa-studio.svg"), "w").write(svg(full, paths, gold))
    open(os.path.join(A, "logo-musa-studio-oscuro.svg"), "w").write(svg(full, paths, bronze))
    open(os.path.join(ROOT, "tools", "musa-wordmark.svg"), "w").write(
        svg(b1, f'<path fill="currentColor" fill-rule="evenodd" d="{d_musa}"/>'))
    # Favicon: solo la M (primer bloque de columnas con tinta), dorada sobre negro
    cols = musa.any(0)
    x = np.argmax(cols)
    while cols[x:x + UP * 3].any():
        x += 1
    m = musa & (xx < x)
    mx0, my0, mx1, my1 = bbox(m, 0)
    side = max(mx1 - mx0, my1 - my0) * 1.32
    cx, cy = (mx0 + mx1) / 2, (my0 + my1) / 2
    vb = (cx - side / 2, cy - side / 2, cx + side / 2, cy + side / 2)
    clip = f'<clipPath id="m"><rect x="{mx0 - 1:.2f}" y="{my0 - 1:.2f}" width="{mx1 - mx0 + 2:.2f}" height="{my1 - my0 + 2:.2f}"/></clipPath>'
    rect = f'<rect x="{vb[0]:.2f}" y="{vb[1]:.2f}" width="{side:.2f}" height="{side:.2f}" rx="{side * .2:.2f}" fill="#0E0D0C"/>'
    open(os.path.join(A, "favicon.svg"), "w").write(svg(vb, rect + f'<path clip-path="url(#m)" fill="url(#g)" fill-rule="evenodd" d="{trace(m)}"/>',
                                                        gold.replace("</defs>", clip + "</defs>")))
    print("✓ logo-musa-studio.svg, logo-musa-studio-oscuro.svg, favicon.svg, tools/musa-wordmark.svg")
