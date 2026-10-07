#!/usr/bin/env node
/**
 * #227 — Optimiza public/logo-bullweb.png por debajo de 150 KB
 * (mismo nombre y ruta; referenciado por el JSON-LD de la landing).
 *
 * Uso:  node scripts/optimize-logo.js
 */

import sharp from 'sharp';
import { statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOGO = path.join(ROOT, 'public', 'logo-bullweb.png');
const TARGET = 150 * 1024; // 150 KB

const before = statSync(LOGO).size;

const attempts = [
  { width: 512, quality: 95, palette: true  },
  { width: 512, quality: 80, palette: true  },
  { width: 400, quality: 80, palette: true  },
  { width: 320, quality: 75, palette: true  },
];

let buf = null;
for (const a of attempts) {
  const candidate = await sharp(LOGO)
    .resize({ width: a.width, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: a.quality, palette: a.palette })
    .toBuffer();
  buf = candidate;
  if (buf.length <= TARGET) break;
}

writeFileSync(LOGO, buf);
const after = statSync(LOGO).size;

console.log(`logo-bullweb.png: ${before} bytes -> ${after} bytes (objetivo <= ${TARGET})`);
if (after > TARGET) {
  console.error('ERROR: el logo sigue por encima de 150 KB tras todos los intentos.');
  process.exit(1);
}
