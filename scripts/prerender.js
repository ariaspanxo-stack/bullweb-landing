#!/usr/bin/env node
/**
 * Prerendering para SEO de la landing (SPA React).
 *
 * Levanta un servidor estático nativo de Node sobre `dist/`, navega con
 * Puppeteer las rutas públicas de la landing y guarda el HTML resultante en
 * `dist/prerendered/`.
 *
 * Rutas: "/", "/funciones", "/precios", "/faq".
 *
 * Uso:  node scripts/prerender.js
 */

import http from 'node:http';
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const OUT_DIR = path.join(DIST_DIR, 'prerendered');

// La landing es una single-page con secciones ancla (#features, #pricing, #faq).
// Navegamos con hash para forzar el render del contenido de cada sección.
// `replaceIndex: true` reemplaza dist/index.html con el HTML prerenderizado de
// la ruta raíz, de modo que Google/WhatsApp lean el contenido sin ejecutar JS.
const ROUTES = [
  { route: '/',           file: 'index.html',   replaceIndex: true },
  { route: '/#features',  file: 'funciones.html' },
  { route: '/#pricing',   file: 'precios.html' },
  { route: '/#faq',       file: 'faq.html' },
];

const PORT = process.env.PRERENDER_PORT || 4318;
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.txt':  'text/plain; charset=utf-8',
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Servidor estático con fallback a index.html (SPA).
 * Soporta rutas como /funciones, /precios, /faq.
 */
function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
        let filePath = path.join(DIST_DIR, urlPath);

        // Si es directorio o termina en /, servir index.html
        if (urlPath === '/' || urlPath.endsWith('/') || urlPath === '') {
          filePath = path.join(DIST_DIR, 'index.html');
        } else if (!existsSync(filePath) || (existsSync(filePath) && statSync(filePath).isDirectory())) {
          // Fallback SPA: si no existe el archivo, devolvemos index.html
          filePath = path.join(DIST_DIR, 'index.html');
        }

        if (!existsSync(filePath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }

        const data = await readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const type = MIME[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: ' + err.message);
      }
    });

    server.on('error', reject);
    server.listen(PORT, HOST, () => resolve(server));
  });
}

async function waitForNetwork(page) {
  try {
    await page.waitForNetworkIdle({ idleTime: 600, timeout: 12000 });
  } catch {
    // No crítico.
  }
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (type === 'media' || type === 'font' || type === 'image') {
        req.abort();
      } else {
        req.continue();
      }
    });

    const url = `http://${HOST}:${PORT}${route === '/' ? '/' : route}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitForNetwork(page);
    await sleep(700);

    // Forzamos scroll para disparar `whileInView` de framer-motion.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollBy(0, 600);
          y += 600;
          if (y >= document.body.scrollHeight) {
            window.scrollTo(0, 0);
            resolve();
          } else {
            setTimeout(step, 50);
          }
        };
        step();
      });
    });

    await sleep(300);
    return await page.content();
  } finally {
    await page.close();
  }
}

async function main() {
  if (!(await exists(DIST_DIR))) {
    throw new Error(`No existe ${DIST_DIR}. Ejecuta "vite build" antes del prerender.`);
  }

  await mkdir(OUT_DIR, { recursive: true });

  console.log(`▶ Servidor estático en http://${HOST}:${PORT} …`);
  const server = await startStaticServer();

  console.log('▶ Lanzando Puppeteer…');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const { route, file, replaceIndex } of ROUTES) {
      process.stdout.write(`  → ${route.padEnd(12)} `);
      const html = await renderRoute(browser, route);

      // Copia de respaldo en dist/prerendered/
      const outPath = path.join(OUT_DIR, file);
      await writeFile(outPath, html, 'utf8');
      console.log(`✓ ${path.relative(ROOT, outPath)} (${(html.length / 1024).toFixed(1)} KB)`);

      // Reemplazar dist/index.html para que crawlers lean el contenido SSG
      if (replaceIndex) {
        const indexPath = path.join(DIST_DIR, 'index.html');
        await writeFile(indexPath, html, 'utf8');
        console.log(`  ↻ Reemplazado ${path.relative(ROOT, indexPath)} con HTML prerenderizado`);
      }
    }
    console.log('✅ Prerender completo en dist/prerendered/ y dist/index.html actualizado');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('❌ Error en prerender:', err);
  process.exit(1);
});