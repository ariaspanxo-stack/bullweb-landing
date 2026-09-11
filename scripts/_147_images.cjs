// Hotfix #147 — Fase 3: optimización de imágenes (usa sharp de frontend/node_modules)
const path = require('path');
const sharp = require(path.resolve(__dirname, '../../frontend/node_modules/sharp'));

const PUB = path.resolve(__dirname, '../public');

(async () => {
  // (a) logo-bullweb.webp: máx dimensión 320px, WebP q85
  const logoPng = path.join(PUB, 'logo-bullweb.png');
  const meta = await sharp(logoPng).metadata();
  console.log('logo original:', meta.width + 'x' + meta.height, meta.format);

  await sharp(logoPng)
    .resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(path.join(PUB, 'logo-bullweb.webp'));
  const webpMeta = await sharp(path.join(PUB, 'logo-bullweb.webp')).metadata();
  console.log('logo webp:', webpMeta.width + 'x' + webpMeta.height);

  // (b) og-image.png 1200x630: fondo slate-900 (#0F172A, navbar de la landing) + logo centrado
  // (fit inside con caja máxima que garantiza caber en el canvas: 1200x560)
  const logoResized = await sharp(logoPng)
    .resize({ width: 1200, height: 560, fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const rm = await sharp(logoResized).metadata();

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#0F172A' },
  })
    .composite([{ input: logoResized, left: Math.round((1200 - rm.width) / 2), top: Math.round((630 - rm.height) / 2) }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(PUB, 'og-image.png.new'));

  console.log('og-image generado: 1200x630');
})().catch(e => { console.error(e); process.exit(1); });
