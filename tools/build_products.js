// Captura los packshots de tools/products.html → assets/img/tienda/*.png (luego se pasan a webp)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 800, height: 1000 } });
  await p.goto('file://' + path.join(__dirname, 'products.html'));
  for (const el of await p.$$('.shot')) {
    const id = await el.getAttribute('id');
    await el.screenshot({ path: path.join(__dirname, '..', 'assets', 'img', 'tienda', id + '.png') });
  }
  await b.close();
})();
