"""Vectoriza el logo de Musa Studio (Media/logo-musa-nuevo.jpg: monograma MS + MUSA / STUDIO + HAIR · NAILS · BEAUTY).

El original es un JPG de 1080 px sobre negro. Cada pieza se amplía, se suaviza, se umbraliza y se traza
con potrace: quedan SVG nítidos a cualquier tamaño, con los colores del logo (MUSA blanco, resto champaña).

    assets/img/logo.svg             MUSA (blanco) + ── STUDIO ── (champaña): header, menú, pie, gift card
    assets/img/logo-claro.svg       lo mismo para modo claro (MUSA casi negro, STUDIO bronce)
    assets/img/monograma.svg        el monograma MS en su círculo, champaña (hero, equipo)
    assets/img/favicon.svg          monograma sobre negro (ícono de la pestaña)
    assets/img/og-image.jpg         logo completo sobre negro, 1200×630 (para compartir en redes)
    tools/musa-wordmark.svg         solo MUSA, color "currentColor" (build_pages.py lo inserta en el pie)

Uso: pip install potracer && python3 tools/build_logo.py
     (luego NODE_PATH=$(npm root -g) node tools/build_icons.js para el apple-touch-icon)
"""
import os
import numpy as np
import potrace
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Media", "logo-musa-nuevo.jpg")
A = os.path.join(ROOT, "assets", "img")
UP = 4   # ampliación antes de trazar (el original ya mide 1080 px)

# Bandas del original (y0, y1) medidas sobre el JPG
MONO, MUSA, STUDIO = (90, 595), (628, 765), (797, 851)
CHAMPAGNE = [(0, "#B98F68"), (0.4, "#E8D3BC"), (0.7, "#D4B391"), (1, "#F0E0CC")]
BRONZE = [(0, "#6E5236"), (0.5, "#8F6C4A"), (1, "#7A5A3C")]

def lum_up():
    im = Image.open(SRC).convert("RGB")
    lum = Image.fromarray(np.asarray(im).astype(np.float32).max(2).astype(np.uint8))
    big = lum.resize((im.width * UP, im.height * UP), Image.LANCZOS).filter(ImageFilter.GaussianBlur(UP * 0.45))
    return np.asarray(big).astype(np.float32) / 255.0

def trace(mask):
    """Máscara booleana (coordenadas ×UP) → datos de path SVG en coordenadas del original."""
    path = potrace.Bitmap(~mask).trace(turdsize=UP * UP * 4, alphamax=1.0, opticurve=True, opttolerance=0.2)
    f = lambda p: f"{p.x / UP:.2f} {p.y / UP:.2f}"
    d = []
    for curve in path:
        d.append("M" + f(curve.start_point))
        for s in curve.segments:
            d.append(("L" + f(s.c) + "L" + f(s.end_point)) if s.is_corner
                     else ("C" + f(s.c1) + " " + f(s.c2) + " " + f(s.end_point)))
        d.append("Z")
    return "".join(d)

def bbox(mask, pad=2):
    ys, xs = np.nonzero(mask)
    return xs.min() / UP - pad, ys.min() / UP - pad, xs.max() / UP + pad, ys.max() / UP + pad

def union(*boxes):
    return min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes)

def svg(box, body, defs=""):
    x0, y0, x1, y1 = box
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {x1 - x0:.2f} {y1 - y0:.2f}" '
            f'focusable="false">{defs}{body}</svg>')

def gradient(stops, gid="g"):
    s = "".join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
    return f'<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="0.6">{s}</linearGradient>'

def write(name, text):
    open(os.path.join(A, name) if not name.startswith("tools/") else os.path.join(ROOT, name), "w").write(text)
    print("✓", name)

if __name__ == "__main__":
    a = lum_up()
    yy = np.mgrid[0:a.shape[0], 0:a.shape[1]][0] / UP
    band = lambda b, t: (a > t) & (yy >= b[0]) & (yy < b[1])
    mono, musa, studio = band(MONO, 0.22), band(MUSA, 0.38), band(STUDIO, 0.30)
    d_mono, d_musa, d_studio = trace(mono), trace(musa), trace(studio)
    bm, bs, bo = bbox(musa), bbox(studio), bbox(mono)
    lock = union(bm, bs)

    def lockup(musa_fill, grad):
        return svg(lock, f'<path fill="{musa_fill}" fill-rule="evenodd" d="{d_musa}"/>'
                         f'<path fill="url(#g)" fill-rule="evenodd" d="{d_studio}"/>', f"<defs>{grad}</defs>")
    write("logo.svg", lockup("#FFFFFF", gradient(CHAMPAGNE)))
    write("logo-claro.svg", lockup("#171411", gradient(BRONZE)))
    write("monograma.svg", svg(bo, f'<path fill="url(#g)" fill-rule="evenodd" d="{d_mono}"/>', f"<defs>{gradient(CHAMPAGNE)}</defs>"))
    write("tools/musa-wordmark.svg", svg(bm, f'<path fill="currentColor" fill-rule="evenodd" d="{d_musa}"/>'))

    # Favicon: monograma sobre negro, con margen
    x0, y0, x1, y1 = bo
    side = max(x1 - x0, y1 - y0) * 1.18
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    vb = (cx - side / 2, cy - side / 2, cx + side / 2, cy + side / 2)
    rect = f'<rect x="{vb[0]:.2f}" y="{vb[1]:.2f}" width="{side:.2f}" height="{side:.2f}" rx="{side * .2:.2f}" fill="#0E0D0C"/>'
    write("favicon.svg", svg(vb, rect + f'<path fill="url(#g)" fill-rule="evenodd" d="{d_mono}"/>', f"<defs>{gradient(CHAMPAGNE)}</defs>"))

    # Imagen para redes: el logo completo (ya viene sobre negro) centrado en 1200×630
    im = Image.open(SRC).convert("RGB")
    logo = im.resize((600, 600), Image.LANCZOS)
    edge = np.concatenate([np.asarray(logo)[:, :6].reshape(-1, 3), np.asarray(logo)[:, -6:].reshape(-1, 3)])
    og = Image.new("RGB", (1200, 630), tuple(np.median(edge, 0).astype(int)))
    og.paste(logo, (300, 15))
    og.save(os.path.join(A, "og-image.jpg"), quality=88, optimize=True)
    print("✓ og-image.jpg")
