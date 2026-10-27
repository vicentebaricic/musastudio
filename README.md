# Musa Studio · sitio web

Sitio de **Musa Studio** (peluquería, uñas, pestañas y faciales · Strip Center Club Fama, Chicureo).
Basado en la estructura del sitio de Glanz, con identidad propia: negro profundo + champaña del logo,
tipografías Cormorant Garamond / Jost, modo oscuro por defecto (modo claro marfil/bronce con el botón de la luna).

## Páginas

`index.html` (inicio), `servicios.html`, `trabajos.html`, `tienda.html`, `gift-card.html` y `consulta-musa.html`
(cuestionario para afinar la propuesta con la dueña).

Las 5 primeras **no se editan directo**: se generan desde `src/` con

```bash
python3 tools/build_pages.py
```

- `src/pages/*.html` → contenido de cada página
- `src/partials/` → head, menú (header) y pie (footer, carrito, barra móvil)
- `src/styles.css` → estilos y paleta
- `src/app.js` → `CONFIG` (WhatsApp, AgendaPro, Instagram, horario) y datos: `SERVICES`, `TEAM`, `REVIEWS`, `PRODUCTS`, `GALLERY`

## Multimedia

- `Media/` guarda los **originales** (logo original, video 4K, fotos de stock, fachada).
- `assets/` tiene las versiones optimizadas que usa el sitio.

```bash
pip install potracer && python3 tools/build_logo.py   # logo vectorial (SVG), monograma, favicon, MUSA del pie, og-image
NODE_PATH=$(npm root -g) node tools/build_icons.js    # apple-touch-icon.png desde el favicon
python3 tools/build_media.py                           # recortes + grade "Musa" de fotos y video (Pillow, numpy, ffmpeg)
NODE_PATH=$(npm root -g) node tools/build_products.js # packshots de la tienda (Playwright) → luego pasar a webp
```

### Logo
`build_logo.py` toma `Media/logo-musa-nuevo.jpg` (monograma MS + MUSA / STUDIO sobre negro) y lo **vectoriza**:
SVG nítidos a cualquier tamaño, con MUSA en blanco y STUDIO / monograma en champaña (versión clara para el modo claro).

### Fotos
Regla: **ninguna foto se repite dentro de una página** (cada original de `Media/` se usa una vez por página;
se revisa con la lista `SHOTS` de `tools/build_media.py`).

## Pendiente (marcado en el sitio con etiquetas amarillas)

- Servicios, precios y duraciones reales (hoy son de ejemplo)
- Equipo: nombres, especialidades, días y fotos
- Horario completo (solo está confirmado el cierre a las 19:30)
- Fotos reales de trabajos, del estudio y posts de Instagram
- Reseñas reales de Google (la de Carolina P. es real)
- Productos de la tienda y si habrá despacho
- Confirmar que el +56 9 2642 4555 es WhatsApp

El botón "Ocultar etiquetas de ejemplo" del pie permite ver el diseño limpio.
