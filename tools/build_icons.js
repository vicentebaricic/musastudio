// Genera los PNG que no pueden ser SVG a partir del logo vectorial (correr después de build_wordmark.py):
//   assets/img/apple-touch-icon.png (180×180) y assets/img/og-image.jpg (1200×630, para compartir en redes)
// Uso: NODE_PATH=$(npm root -g) node tools/build_icons.js
const { chromium } = require('playwright');
const path = require('path');
const IMG = path.join(__dirname, '..', 'assets', 'img');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 180, height: 180 } });
  await p.goto('file://' + path.join(IMG, 'favicon.svg'));
  await p.evaluate(() => { const s = document.documentElement; s.setAttribute('width', 180); s.setAttribute('height', 180); s.style.background = '#0E0D0C'; });
  await p.screenshot({ path: path.join(IMG, 'apple-touch-icon.png'), omitBackground: false });

  await p.setViewportSize({ width: 1200, height: 630 });
  await p.goto('file://' + path.join(IMG, 'logo-musa-studio.svg'));
  await p.evaluate(() => {
    const s = document.documentElement;
    s.setAttribute('width', 1200); s.setAttribute('height', 630);
    const vb = s.viewBox.baseVal, padX = vb.width * 0.55, padY = (vb.width + 2 * padX) * 630 / 1200 - vb.height;
    s.setAttribute('viewBox', `${vb.x - padX} ${vb.y - padY / 2} ${vb.width + 2 * padX} ${vb.height + padY}`);
    s.style.background = 'radial-gradient(60% 70% at 50% 50%, #241D12 0%, #0E0D0C 70%)';
  });
  await p.screenshot({ path: path.join(IMG, 'og-image.jpg'), type: 'jpeg', quality: 88 });
  await b.close();
  console.log('✓ apple-touch-icon.png, og-image.jpg');
})();
