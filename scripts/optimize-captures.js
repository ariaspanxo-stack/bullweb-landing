#!/usr/bin/env node
/**
 * Genera las versiones web (WebP, recortadas) de las capturas reales y del
 * logo transparente. Los originales viven en capturas-fuente/ (fuera de public/
 * y de git), así que nunca llegan a dist/.
 *
 * Uso:  node scripts/optimize-captures.js
 */

import sharp from 'sharp';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');
const SRC = path.resolve(__dirname, '..', 'capturas-fuente');
const OUT = path.join(PUBLIC, 'images');

// crop: región a conservar del original (px). widths: anchos de salida.
const JOBS = [
  // Sin la franja vacía inferior.
  { src: 'mesas.png',         name: 'mesas',         crop: { left: 0, top: 0, width: 1797, height: 640 },     widths: [1600, 800] },
  // Sin el menú lateral.
  { src: 'reportes.png',      name: 'reportes',      crop: { left: 186, top: 0, width: 1618, height: 872 },   widths: [1200, 640] },
  { src: 'tienda-online.png', name: 'tienda-online', crop: null,                                              widths: [1200, 640] },
  // Sin la barra de estado/navegador de Android ni la barra de navegación inferior.
  { src: 'carta-qr.png',      name: 'carta-qr',      crop: { left: 0, top: 166, width: 640, height: 1102 },   widths: [480] },
];

for (const job of JOBS) {
  for (const w of job.widths) {
    let img = sharp(path.join(SRC, job.src));
    if (job.crop) img = img.extract(job.crop);
    const out = path.join(OUT, `${job.name}-${w}.webp`);
    const info = await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    console.log(`${path.basename(out)}: ${info.width}x${info.height}, ${(statSync(out).size / 1024).toFixed(0)} KB`);
  }
}

// Logo transparente: se muestra a 36–40px, 160px cubre pantallas de alta densidad.
const logoOut = path.join(PUBLIC, 'logo-bullweb-transparente.webp');
const logo = await sharp(path.join(PUBLIC, 'logo_transparente_440.png')).resize({ width: 160 }).webp({ quality: 90 }).toFile(logoOut);
console.log(`logo-bullweb-transparente.webp: ${logo.width}x${logo.height}, ${(statSync(logoOut).size / 1024).toFixed(0)} KB`);
