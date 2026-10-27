"""Genera las imágenes optimizadas de assets/ a partir de los originales en Media/.

Todas pasan por el mismo grade de color "Musa" (negros profundos, contraste elegante,
altas luces doradas, saturación contenida) para que se vean como una sola sesión
y combinen con el logo negro y dorado.
Uso: python3 tools/build_media.py   (requiere Pillow y numpy)
"""
import subprocess, tempfile, os
import numpy as np
from PIL import Image, ImageOps, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = os.path.join(ROOT, "Media")
A = os.path.join(ROOT, "assets", "img")
VIDEO = os.path.join(M, "7575516-uhd_3840_2160_24fps.mp4")

SRC = {
    "G": "giorgio-trovato-wSpkThmoZQc-unsplash.jpg",   # ondas con tenaza
    "C": "haircolouring.jpg",                          # coloración con pincel
    "F": "ionela-mat-16mHHrY3PUk-unsplash.jpg",        # facial
    "N": "manicure.jpg",                               # manicure
    "A": "a.jpg",                                      # clienta sonriendo durante el color
    "K": "aditya-sethia-iCJTDyLyP0I-unsplash.jpg",     # corte con cabello húmedo
    "S": "salon-referencia.png",                       # interior de salón (REFERENCIA, no es Musa)
    "M": "fachada-google-maps.jpg",                    # fachada real de Musa Studio (captura de Google Maps, baja resolución)
}

def grade(im, strength=1.0):
    """Grade 'Musa': negros profundos, contraste elegante, luces doradas."""
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
    # 1) balance de blancos parcial (gray world 50%)
    mean = a.reshape(-1, 3).mean(0)
    gain = (mean.mean() / mean) ** 0.5
    a = a * gain
    # 2) temperatura levemente dorada
    a = a * np.array([1.03, 1.0, 0.92])
    # 3) curva: S marcada, negros profundos (sin "fade")
    a = np.clip(a, 0, 1)
    a = a + 0.20 * np.sin(np.pi * a) * (a - 0.5)
    a = 0.018 + a * 0.965
    # 4) luces con tinte dorado, sombras neutras
    lum = a.mean(2, keepdims=True)
    a = a + lum ** 2 * np.array([0.03, 0.015, -0.025])
    # 5) saturación contenida
    lum = (a * np.array([0.299, 0.587, 0.114])).sum(2, keepdims=True)
    a = lum + (a - lum) * 0.84
    out = np.clip(a, 0, 1)
    if strength < 1:
        orig = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
        out = orig + (out - orig) * strength
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))

def before_look(im):
    """Simula un 'antes' para el prototipo: opaco, frío, sin brillo."""
    a = np.asarray(im).astype(np.float32) / 255.0
    lum = (a * np.array([0.299, 0.587, 0.114])).sum(2, keepdims=True)
    a = lum + (a - lum) * 0.55                    # menos color
    a = a * np.array([0.97, 0.99, 1.03])          # más frío
    a = 0.5 + (a - 0.5) * 0.82 - 0.04             # menos contraste y brillo
    out = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
    return out.filter(ImageFilter.GaussianBlur(1.2))

_cache = {}
def load(key):
    if key not in _cache:
        if key.startswith("V"):
            t = key[1:]
            f = tempfile.mktemp(suffix=".png")
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", t, "-i", VIDEO, "-frames:v", "1", f], check=True)
            _cache[key] = Image.open(f).convert("RGB")
        else:
            _cache[key] = ImageOps.exif_transpose(Image.open(os.path.join(M, SRC[key]))).convert("RGB")
    return _cache[key]

def crop(key, box, ar=None):
    """box en fracciones (x0,y0,x1,y1); ar = ancho/alto final (ajusta centrado)."""
    im = load(key); W, H = im.size
    x0, y0, x1, y1 = box[0]*W, box[1]*H, box[2]*W, box[3]*H
    if ar:
        cx, cy, w, h = (x0+x1)/2, (y0+y1)/2, x1-x0, y1-y0
        if w/h > ar: w = h*ar
        else: h = w/ar
        x0, y0 = max(0, min(cx-w/2, W-w)), max(0, min(cy-h/2, H-h))
        x1, y1 = x0+w, y0+h
    return im.crop((int(x0), int(y0), int(x1), int(y1)))

def save(img, path, w, q=80):
    img = img.copy(); img.thumbnail((w, w*3), Image.LANCZOS)
    full = os.path.join(A, path); os.makedirs(os.path.dirname(full), exist_ok=True)
    img.save(full, "WEBP", quality=q, method=6)
    return img

# (salida, fuente, caja, aspect, ancho)
SHOTS = [
    # Destacados y nosotros
    ("destacado-cabello.webp",       "G", (0.25,0.0,0.80,1.0), 4/5, 1400),
    ("destacado-color.webp",         "C", (0.15,0.05,0.80,0.95), 4/5, 1400),
    ("espacio/salon-01.webp",        "N", (0.20,0.05,0.80,0.95), 4/5, 1100),
    ("espacio/detalle-01.webp",      "G", (0.70,0.30,1.00,0.95), 3/4, 700),
    ("espacio/atencion-01.webp",     "G", (0.00,0.05,1.00,0.80), 16/10, 1400),
    ("espacio/salon-02.webp",        "G", (0.00,0.00,1.00,1.00), 16/9, 1600),
    ("espacio/fachada.webp",         "M", (0.00,0.00,1.00,1.00), None, 900),
    ("espacio/lavado.webp",          "V9.5", (0.20,0.0,0.80,1.0), 1, 800),
    ("espacio/recepcion.webp",       "C", (0.20,0.25,0.80,0.75), 7/5, 1000),
    ("espacio/cta.webp",             "V9.5", (0.00,0.00,1.00,1.00), 16/9, 1800),
    ("espacio/salon-main.webp",      "S", (0.00,0.00,1.00,1.00), 4/3, 1600),
    ("espacio/salon-espejos.webp",   "S", (0.00,0.02,0.56,0.62), 1, 800),
    ("espacio/salon-estantes.webp",  "S", (0.57,0.00,0.87,0.50), 1, 800),
    ("espacio/salon-lounge.webp",    "S", (0.52,0.45,1.00,1.00), 1, 800),
    ("servicios/cabello-wide.webp",   "G", (0.05,0.10,1.00,0.95), 5/2, 1400),
    ("servicios/belleza-wide.webp",   "N", (0.00,0.22,1.00,0.80), 5/2, 1400),
    ("servicios/bienestar-wide.webp", "F", (0.00,0.18,1.00,0.80), 5/2, 1400),
    ("servicios/home-cabello.webp",   "G", (0.30,0.05,0.80,1.00), 4/5, 800),
    ("servicios/home-belleza.webp",   "N", (0.25,0.10,0.75,0.95), 4/5, 800),
    ("servicios/home-bienestar.webp", "F", (0.30,0.05,0.85,1.00), 4/5, 800),
    ("destacado-corte.webp",         "K", (0.00,0.05,1.00,0.85), 4/5, 1400),
    ("nosotros-01.webp",             "A", (0.00,0.22,1.00,0.95), 4/5, 1100),
    ("nosotros-02.webp",             "N", (0.35,0.30,0.75,0.80), 3/4, 700),
    ("instagram/post-01.webp",       "C", (0.35,0.28,0.82,0.90), 4/5, 900),
    ("instagram/post-03.webp",       "A", (0.42,0.12,1.00,0.56), 4/5, 900),
    # Servicios
    ("servicios/cabello-01.webp",    "C", (0.20,0.10,0.75,0.90), 3/4, 1000),
    ("servicios/cabello-02.webp",    "G", (0.30,0.15,0.75,0.75), 1, 700),
    ("servicios/cabello-03.webp",    "V5", (0.15,0.0,0.75,1.0), 1, 700),
    ("servicios/belleza-01.webp",    "N", (0.25,0.10,0.75,0.90), 3/4, 1000),
    ("servicios/belleza-02.webp",    "F", (0.30,0.30,0.85,0.90), 1, 700),
    ("servicios/belleza-03.webp",    "N", (0.55,0.20,0.90,0.60), 1, 700),
    ("servicios/bienestar-01.webp",  "F", (0.25,0.00,0.85,1.00), 3/4, 1000),
    ("servicios/bienestar-02.webp",  "F", (0.25,0.00,0.75,0.55), 1, 700),
    ("servicios/bienestar-03.webp",  "F", (0.00,0.00,0.40,0.55), 1, 700),
    # Galería
    ("galeria/color-01.webp",        "C", (0.38,0.38,0.75,0.75), 1, 1100),
    ("galeria/color-02.webp",        "K", (0.05,0.10,0.95,1.00), 3/5, 800),
    ("galeria/color-03.webp",        "V7", (0.0,0.1,1.0,0.9), 16/9, 1000),
    ("galeria/color-04.webp",        "C", (0.25,0.30,0.72,0.62), 3/2, 800),
    ("galeria/corte-01.webp",        "G", (0.32,0.15,0.72,0.95), 1, 800),
    ("galeria/corte-02.webp",        "G", (0.15,0.05,0.50,0.60), 1, 800),
    ("galeria/corte-03.webp",        "V3", (0.10,0.0,0.80,1.0), 1, 800),
    ("galeria/unas-01.webp",         "N", (0.32,0.35,0.68,0.70), 1, 800),
    ("galeria/unas-02.webp",         "N", (0.10,0.25,0.90,0.80), 2/1, 1100),
    ("galeria/unas-03.webp",         "N", (0.50,0.15,0.95,0.70), 2/1, 1100),
    ("galeria/pestanas-01.webp",     "F", (0.40,0.25,0.85,0.85), 3/5, 800),
    ("galeria/pestanas-02.webp",     "F", (0.20,0.05,0.70,0.60), 1, 800),
]

BEFORE_AFTER = [
    ("color",    "G", (0.30,0.10,0.75,1.00), 4/5, 1000),
    ("facial",   "F", (0.35,0.25,0.85,0.90), 4/3, 900),
    ("unas",     "N", (0.25,0.25,0.75,0.75), 4/3, 900),
]

# Equipo: cuando lleguen las fotos reales, súbelas a Media/ y agrégalas aquí, p. ej. {"nombre": "nombre-equipo.jpg"}
TEAM = {}

if __name__ == "__main__":
    for out, key, box, ar, w in SHOTS:
        save(grade(crop(key, box, ar)), out, w)
        print("✓", out)
    for name, key, box, ar, w in BEFORE_AFTER:
        after = save(grade(crop(key, box, ar)), f"antes-despues/{name}-despues.webp", w)
        save(before_look(after), f"antes-despues/{name}-antes.webp", w)
        print("✓ antes/después", name)
    for n, f in TEAM.items():
        os.makedirs(os.path.join(A, "equipo"), exist_ok=True)
        im = ImageOps.fit(ImageOps.exif_transpose(Image.open(os.path.join(M, f))).convert("RGB"), (800, 1000), Image.LANCZOS)
        grade(im, 0.6).save(os.path.join(A, "equipo", n + ".webp"), "WEBP", quality=86)
    # video del hero (horizontal 1600×900 y vertical 720×1282), mismo look vía ffmpeg
    look = "eq=contrast=1.12:brightness=-0.03:saturation=0.86,colorbalance=rs=-0.02:bs=0.03:rh=0.04:gh=0.02:bh=-0.04"
    for name, vf in [("hero.mp4", "scale=1600:-2"), ("hero-mobile.mp4", "crop=ih*9/16:ih:iw*0.45-ih*9/32:0,scale=720:-2")]:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", VIDEO, "-an", "-vf", f"{vf},{look}", "-c:v", "libx264",
                        "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                        os.path.join(ROOT, "assets", "video", name)], check=True)
    # posters: primer cuadro del video ya procesado (mismo look exacto)
    for name, v in [("hero-poster.jpg", "hero.mp4"), ("hero-poster-mobile.jpg", "hero-mobile.mp4"), ("instagram/post-02.jpg", "hero-mobile.mp4")]:
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1", "-i", os.path.join(ROOT, "assets", "video", v),
                        "-frames:v", "1", "-q:v", "3", os.path.join(A, name)], check=True)
    print("listo")
