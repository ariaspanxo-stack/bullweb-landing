#!/usr/bin/env node
/**
 * Genera public/og-image.png (1200x630) con Puppeteer desde un HTML local.
 * Fuente: Inter de @fontsource (ya instalada, sin Google Fonts).
 * Precio: desde src/lib/plans.ts (fuente única de precios).
 *
 * Uso:  node scripts/generate-og-image.js
 */

import puppeteer from 'puppeteer';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_PRICE_TEXT } from '../src/lib/plans.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'og-image.png');

const b64 = p => readFileSync(path.join(ROOT, p)).toString('base64');
const font = w => `@font-face { font-family: 'Inter'; font-weight: ${w}; font-style: normal;
  src: url(data:font/woff2;base64,${b64(`node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`)}) format('woff2'); }`;
const logo = b64('public/logo_transparente_440.png');

// "Desde $19.900/mes, IVA incluido." -> sin el punto final
const price = HERO_PRICE_TEXT.replace(/\.$/, '');

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><style>
${font(600)}
${font(900)}
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #1E2A4A; font-family: 'Inter', sans-serif;
  display: flex; align-items: center; gap: 64px; padding: 0 80px; }
/* El logo es de trazo azul oscuro: va sobre un círculo blanco para verse sobre el fondo de marca. */
.logo { flex: none; width: 380px; height: 380px; border-radius: 50%; background: #fff;
  display: flex; align-items: center; justify-content: center; }
.logo img { width: 340px; height: 340px; }
h1 { color: #fff; font-weight: 900; font-size: 68px; line-height: 1.08; letter-spacing: -0.02em; }
p { margin-top: 32px; color: #F97316; font-weight: 600; font-size: 36px; }
</style></head><body>
<div class="logo"><img src="data:image/png;base64,${logo}" alt=""></div>
<div><h1>El sistema completo para tu restaurante</h1><p>${price}</p></div>
</body></html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: OUT, type: 'png' });
await browser.close();

console.log(`og-image.png: 1200x630, ${(statSync(OUT).size / 1024).toFixed(0)} KB`);
