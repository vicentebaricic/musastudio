// Genera el apple-touch-icon.png (180×180, no puede ser SVG) desde assets/img/favicon.svg.
// Correr después de tools/build_logo.py.
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

  await b.close();
  console.log('✓ apple-touch-icon.png');
})();
