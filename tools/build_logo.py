"""Genera las versiones web del logo de Musa Studio a partir de Media/logo-musa-original.jpg.

El original es dorado sobre negro (JPG). Aquí se le quita el fondo (PNG transparente)
y se arman las variantes que usa el sitio:

    assets/img/logo-emblema.png        logo completo (círculo), dorado — hero, footer, gift card
    assets/img/logo-emblema-oscuro.png logo completo en bronce, para fondos claros
    assets/img/logo-horizontal.png     medallón + MUSA / STUDIO en línea, dorado — header sobre fondo oscuro
    assets/img/logo-horizontal-oscuro.png  lo mismo en bronce, para fondos claros
    assets/img/medallon.png            solo la musa (rostro), dorado
    assets/img/musa-wordmark*.png      solo la palabra MUSA (pie de página), dorado y bronce
    assets/img/favicon.png, apple-touch-icon.png, og-image.jpg

Uso: python3 tools/build_logo.py   (requiere Pillow y numpy)
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Media", "logo-musa-original.jpg")
A = os.path.join(ROOT, "assets", "img")
SCALE = 3            # el original mide 534 px: se amplía antes de recortar para que los bordes queden suaves
GOLD = "#C9A55C"     # dorado de referencia (fondo del favicon, etc.)
BLACK = (11, 10, 9)

def unblack(im):
    """Dorado sobre negro → RGBA: alfa según el brillo, color 'des-multiplicado' para conservar el degradado."""
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
    mx = a.max(2)
    alpha = np.clip((mx - 0.075) / 0.50, 0, 1)
    color = np.clip(a / np.maximum(mx, 1e-3)[..., None] * np.clip(mx / 0.85, 0, 1)[..., None] * 1.18, 0, 1)
    rgba = np.dstack([color, alpha]) * 255
    return Image.fromarray(rgba.astype(np.uint8), "RGBA")

def recolor(im, dark=(92, 66, 24), light=(158, 118, 52)):
    """Versión bronce para fondos claros: mapea el brillo del dorado a un degradado bronce
    y engrosa un poco el alfa para que las líneas finas no se pierdan."""
    a = np.asarray(im).astype(np.float32)
    lum = (a[..., :3] / 255.0).mean(2, keepdims=True)
    lum = np.clip((lum - 0.35) / 0.55, 0, 1)
    a[..., :3] = np.array(dark) + (np.array(light) - np.array(dark)) * lum
    a[..., 3] = 255 * (a[..., 3] / 255.0) ** 0.75
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGBA")

def mask_keep(im, keep):
    """Deja solo los píxeles donde keep(x, y) es verdadero (coordenadas del original, 534 px)."""
    W, H = im.size
    yy, xx = np.mgrid[0:H, 0:W] / SCALE
    m = keep(xx, yy)
    a = np.asarray(im).copy()
    a[..., 3] = (a[..., 3] * m).astype(np.uint8)
    return Image.fromarray(a, "RGBA")

def trim(im, pad=0):
    box = im.getchannel("A").point(lambda v: 255 if v > 18 else 0).getbbox()
    box = (max(0, box[0]-pad), max(0, box[1]-pad), min(im.width, box[2]+pad), min(im.height, box[3]+pad))
    return im.crop(box)

def save(im, name):
    im.save(os.path.join(A, name), optimize=True)
    print("✓", name, im.size)

if __name__ == "__main__":
    os.makedirs(A, exist_ok=True)
    src = Image.open(SRC).convert("RGB")
    src = Image.fromarray(np.asarray(src)[:, :531])  # el JPG trae una línea clara en el borde derecho
    big = src.resize((src.width * SCALE, src.height * SCALE), Image.LANCZOS)
    rgba = unblack(big)
    C = 267  # centro del círculo en el original

    # 1) Emblema completo (con los anillos)
    full = trim(rgba, 6)
    save(full, "logo-emblema.png")
    save(recolor(full), "logo-emblema-oscuro.png")

    # 2) Piezas: medallón (rostro), MUSA y STUDIO, sin los anillos exteriores
    r = lambda x, y, cx=C, cy=C: np.hypot(x - cx, y - cy)
    medal = trim(mask_keep(rgba, lambda x, y: (y > 44) & (y < 252) & ((r(x, y, 267, 140) < 117) | ((x > 280) & (y > 100) & (r(x, y) < 215)))), 4)
    musa = trim(mask_keep(rgba, lambda x, y: (y > 250) & ((y < 342) | ((x < 175) & (y < 355))) & (r(x, y) < 215)), 2)
    studio = trim(mask_keep(rgba, lambda x, y: (y > 345) & (y < 378) & ~((x < 175) & (y < 355)) & (r(x, y) < 215)), 2)
    save(medal, "medallon.png")
    save(musa, "musa-wordmark.png")
    save(recolor(musa), "musa-wordmark-oscuro.png")

    # 3) Horizontal: medallón a la izquierda, MUSA / STUDIO a la derecha (para el header)
    H = medal.height
    tw = int(H * 1.55)
    m2 = musa.resize((tw, int(musa.height * tw / musa.width)), Image.LANCZOS)
    s2 = studio.resize((tw, int(studio.height * tw / studio.width)), Image.LANCZOS)
    gap = int(H * 0.10)
    block_h = m2.height + gap + s2.height
    canvas = Image.new("RGBA", (medal.width + int(H * 0.16) + tw, max(H, block_h)), (0, 0, 0, 0))
    canvas.alpha_composite(medal, (0, (canvas.height - H) // 2))
    x0 = medal.width + int(H * 0.16)
    y0 = (canvas.height - block_h) // 2
    canvas.alpha_composite(m2, (x0, y0))
    canvas.alpha_composite(s2, (x0, y0 + m2.height + gap))
    horiz = trim(canvas, 4)
    horiz.thumbnail((1200, 400), Image.LANCZOS)
    save(horiz, "logo-horizontal.png")
    save(recolor(horiz), "logo-horizontal-oscuro.png")

    # 4) Favicon / ícono: medallón dorado sobre negro, esquinas redondeadas
    def icon(size, radius):
        bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        ImageDraw.Draw(bg).rounded_rectangle((0, 0, size - 1, size - 1), radius, fill=BLACK + (255,))
        m = medal.copy(); m.thumbnail((int(size * .82), int(size * .82)), Image.LANCZOS)
        bg.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
        return bg
    save(icon(64, 14), "favicon.png")
    save(icon(180, 0).convert("RGB"), "apple-touch-icon.png")

    # 5) Imagen para compartir en redes (1200×630): emblema sobre negro
    og = Image.new("RGB", (1200, 630), BLACK)
    glow = Image.new("L", og.size, 0)
    ImageDraw.Draw(glow).ellipse((300, -40, 900, 670), fill=38)
    og.paste(Image.new("RGB", og.size, (201, 165, 92)), (0, 0), glow.filter(ImageFilter.GaussianBlur(120)))
    e = full.copy(); e.thumbnail((580, 580), Image.LANCZOS)
    og.paste(e, ((1200 - e.width) // 2, (630 - e.height) // 2), e)
    og.save(os.path.join(A, "og-image.jpg"), quality=86, optimize=True)
    print("✓ og-image.jpg")
