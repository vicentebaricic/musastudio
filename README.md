# Musa Studio · sitio web

Sitio de **Musa Studio** (peluquería, uñas, pestañas y faciales · Strip Center Club Fama, Chicureo).
Basado en la estructura del sitio de Glanz, con identidad propia: negro profundo + dorado del logo,
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
python3 tools/build_logo.py                            # versiones web del logo (sin fondo, horizontal, bronce, favicon, og-image)
python3 tools/build_media.py                           # recortes + grade "Musa" de fotos y video (Pillow, numpy, ffmpeg)
NODE_PATH=$(npm root -g) node tools/build_products.js  # packshots de la tienda (Playwright) → luego pasar a webp
```

### Logo
`build_logo.py` toma `Media/logo-musa-original.jpg` (dorado sobre negro), le quita el fondo y genera:
emblema completo, versión **horizontal** (medallón + MUSA/STUDIO) para el menú, versiones **bronce** para fondo claro,
la palabra MUSA para el pie, favicon y la imagen para compartir en redes.

## Pendiente (marcado en el sitio con etiquetas amarillas)

- Servicios, precios y duraciones reales (hoy son de ejemplo)
- Equipo: nombres, especialidades, días y fotos
- Horario completo (solo está confirmado el cierre a las 19:30)
- Fotos reales de trabajos, del estudio y posts de Instagram
- Reseñas reales de Google (la de Carolina P. es real)
- Productos de la tienda y si habrá despacho
- Confirmar que el +56 9 2642 4555 es WhatsApp

El botón "Ocultar etiquetas de ejemplo" del pie permite ver el diseño limpio.
