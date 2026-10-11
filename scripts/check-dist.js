#!/usr/bin/env node
/**
 * Controles post-build sobre dist/ (las 5 páginas HTML generadas + JS).
 *
 * Regla "POS": permitido SOLO en zonas SEO — <title>, meta description,
 * Open Graph/Twitter, el H2 de la sección SEO, las PREGUNTAS de la FAQ (y su
 * JSON-LD), atributos alt y datos estructurados. Prohibido en el resto de la
 * interfaz (botones, menú, planes, módulos, etiquetas) y en las respuestas
 * de la FAQ.
 *
 * Uso:  node scripts/check-dist.js   (después de npm run build)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');

const TITLE = 'Sistema POS para Restaurantes en Chile | BullWeb';
const H1 = 'El sistema completo para tu restaurante, con tu tienda online incluida';
const H2_SEO = 'Sistema POS para restaurantes en Chile: todo en un solo lugar';
const POS = /\bPOS\b/;

const PAGES = ['index.html', ...['index', 'funciones', 'precios', 'faq'].map(f => `prerendered/${f}.html`)];

const REQUIRED = ['IVA incluido', 'Plan Full', 'Probar 7 días gratis', 'Todo lo del Básico, más:',
  'Se activa con tu certificado y tus folios; te acompañamos en la puesta en marcha', 'fetchpriority="high"'];

const FORBIDDEN = [/Boletas DTE/i, /\bDTE\b/, /Rappi/i, /Uber/i, /Hamachi/i, /sin internet/i, /\b[úÚ]nic[oa]s?\b/,
  /ya emiten/i, /Boleta emitida/i, /Respondemos al instante/i, /primera conversación de venta/i, /cuadres/i,
  /Listo en minutos/i, /animate-ping/];

// Pendiente de decisión: aparece en la política de privacidad (sobre el documento, no el producto).
const WARN = [/siempre disponible/i];

let failed = 0, warned = 0;
const fail = (where, msg) => { failed++; console.log(`  ✗ ${where}: ${msg}`); };
const warn = (where, msg) => { warned++; console.log(`  ! ${where}: ${msg}`); };
const text = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const attr = (html, re) => (html.match(re) || [])[1];

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

for (const page of PAGES) {
  const html = readFileSync(path.join(DIST, page), 'utf8');
  const before = failed;

  // --- Head ---
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/);
  if (title !== TITLE) fail(page, `title inesperado: ${title}`);
  if ((title || '').length > 60) fail(page, `title de ${title.length} caracteres (máx. 60)`);
  if (!desc) fail(page, 'falta meta description');
  else {
    if (desc.length > 155) fail(page, `description de ${desc.length} caracteres (máx. 155)`);
    if (!/\$19\.900/.test(desc) || !/IVA incluido/.test(desc)) fail(page, 'description sin precio Básico o sin "IVA incluido"');
  }
  for (const k of ['og:title', 'twitter:title']) {
    if (attr(html, new RegExp(`<meta\\s+(?:property|name)="${k}"\\s+content="([^"]*)"`)) !== title) fail(page, `${k} distinto del title`);
  }
  for (const k of ['og:description', 'twitter:description']) {
    if (attr(html, new RegExp(`<meta\\s+(?:property|name)="${k}"\\s+content="([^"]*)"`)) !== desc) fail(page, `${k} distinto de la description`);
  }
  if (!/<html[^>]*lang="es-CL"/.test(html)) fail(page, 'falta lang="es-CL"');
  if (!html.includes('<link rel="canonical" href="https://bullwebchile.com/"')) fail(page, 'canonical inesperado');

  // --- Contenido ---
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => text(m[1]));
  if (h1s.length !== 1 || h1s[0] !== H1) fail(page, `H1 inesperado: ${JSON.stringify(h1s)}`);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => text(m[1]));
  if (!h2s.includes(H2_SEO)) fail(page, 'falta el H2 de la sección SEO');
  for (const r of REQUIRED) if (!html.includes(r)) fail(page, `falta "${r}"`);

  // --- JSON-LD ---
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      types.push(data['@type']);
      if (data['@type'] === 'SoftwareApplication' && data.offers?.['@type'] !== 'AggregateOffer') fail(page, 'SoftwareApplication sin AggregateOffer');
      if (data['@type'] === 'FAQPage') {
        if (data.mainEntity.length < 13) fail(page, `FAQPage con ${data.mainEntity.length} preguntas (se esperan 13)`);
        for (const q of data.mainEntity) {
          if (POS.test(q.acceptedAnswer.text)) fail(page, `"POS" en la respuesta de la FAQ "${q.name}"`);
        }
      }
    } catch (e) {
      fail(page, `JSON-LD inválido: ${e.message}`);
    }
  }
  for (const t of ['Organization', 'SoftwareApplication', 'FAQPage']) if (!types.includes(t)) fail(page, `falta JSON-LD ${t}`);

  // --- "POS" solo en zonas SEO: se quitan las zonas permitidas y no debe quedar ninguno ---
  const rest = html
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/<meta\s+(?:name|property)="(?:description|og:[a-z:_]+|twitter:[a-z:]+)"[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/\salt="[^"]*"/g, '')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, m => (text(m) === H2_SEO ? '' : m))
    .replace(/<section id="faq"[\s\S]*?<\/section>/g, sec => sec.replace(/<h3[^>]*>[\s\S]*?<\/h3>/g, ''))
    .replace(/<script[\s\S]*?<\/script>/g, '');
  const leak = rest.match(/.{0,50}\bPOS\b.{0,50}/);
  if (leak) fail(page, `"POS" fuera de las zonas SEO permitidas: …${text(leak[0])}…`);
  if (!POS.test(html)) fail(page, '"POS" no aparece en ninguna zona SEO');

  console.log(`${failed === before ? '✓' : '✗'} ${page}`);
}

// --- Cadenas prohibidas en todo dist/ (HTML + JS) ---
const files = walk(DIST);
for (const f of files.filter(f => /\.(html|js)$/.test(f))) {
  const s = readFileSync(f, 'utf8');
  const rel = path.relative(DIST, f);
  for (const re of FORBIDDEN) { const m = s.match(re); if (m) fail(rel, `cadena prohibida "${m[0]}"`); }
  for (const re of WARN) { const m = s.match(re); if (m) warn(rel, `revisar "${m[0]}" (pendiente de decisión)`); }
}

// --- Las capturas fuente no deben publicarse ---
for (const f of files) {
  if (/originales|capturas-fuente|[\/]pos\.png$|app-mesero/i.test(f)) fail(path.relative(DIST, f), 'captura fuente dentro de dist/');
}

console.log(failed ? `\n✗ ${failed} control(es) fallaron` : `\n✅ Controles OK (${PAGES.length} páginas, ${warned} aviso(s))`);
process.exit(failed ? 1 : 0);
