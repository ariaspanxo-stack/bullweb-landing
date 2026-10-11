#!/usr/bin/env node
/**
 * Controles post-build sobre dist/ (portada: 5 HTML; legales: 3 HTML; + JS).
 *
 * Regla "POS": permitido SOLO en zonas SEO —
 *   - <title>, meta description, Open Graph/Twitter y datos estructurados;
 *   - el H2 de la sección SEO y hasta 2 menciones en el cuerpo de esa sección;
 *   - las PREGUNTAS de la FAQ, y 1 mención por respuesta solo en las 3
 *     preguntas SEO (SEO_FAQ);
 *   - atributos alt de las capturas.
 * Prohibido en el resto de la interfaz (botones, menú, nombres de planes y
 * módulos, etiquetas), en las demás respuestas de la FAQ y en las páginas
 * legales.
 *
 * Uso:  node scripts/check-dist.js   (después de npm run build)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const ORIGIN = 'https://bullwebchile.com';

const TITLE = 'Sistema POS para Restaurantes en Chile | BullWeb';
const H1 = 'El sistema completo para tu restaurante, con tu tienda online incluida';
const H2_SEO = 'Sistema POS para restaurantes en Chile: todo en un solo lugar';
const SEO_SECTION_ID = 'sistema-pos-restaurantes-chile';
const SEO_FAQ = [
  '¿Qué es un sistema POS para restaurantes?',
  '¿Cuánto cuesta un POS para restaurantes en Chile?',
  '¿Sirve para cafeterías, sushi y locales de comida?',
];
const FAQ_COUNT = 13;

const HOME_PAGES = ['index.html', ...['index', 'funciones', 'precios', 'faq'].map(f => `prerendered/${f}.html`)];
const LEGAL_PAGES = [
  { file: 'terminos.html',   path: '/terminos',   title: 'Términos y condiciones | BullWeb' },
  { file: 'privacidad.html', path: '/privacidad', title: 'Política de privacidad | BullWeb' },
  { file: 'cookies.html',    path: '/cookies',    title: 'Política de cookies | BullWeb' },
];

const REQUIRED = ['IVA incluido', 'Plan Full', 'Probar 7 días gratis', 'Todo lo del Básico, más:',
  'Se activa con tu certificado y tus folios; te acompañamos en la puesta en marcha', 'fetchpriority="high"'];

const FORBIDDEN = [/Boletas DTE/i, /\bDTE\b/, /Rappi/i, /Uber/i, /Hamachi/i, /sin internet/i, /siempre disponible/i,
  /\b[úÚ]nic[oa]s?\b/, /ya emiten/i, /Boleta emitida/i, /Respondemos al instante/i, /primera conversación de venta/i,
  /cuadres/i, /Listo en minutos/i, /animate-ping/];

let failed = 0;
const fail = (where, msg) => { failed++; console.log(`  ✗ ${where}: ${msg}`); };
const text = s => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const attr = (html, re) => (html.match(re) || [])[1];
const meta = (html, key) => attr(html, new RegExp(`<meta\\s+(?:property|name)="${key}"\\s+content="([^"]*)"`));
const countPos = s => (s.match(/\bPOS\b/g) || []).length;
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

/** Head común: title, description, OG/Twitter coherentes, lang y canonical. */
function checkHead(page, html, { title: expected, canonical }) {
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = meta(html, 'description');
  if (title !== expected) fail(page, `title inesperado: ${title}`);
  if ((title || '').length > 60) fail(page, `title de ${title.length} caracteres (máx. 60)`);
  if (!desc) fail(page, 'falta meta description');
  else if (desc.length > 155) fail(page, `description de ${desc.length} caracteres (máx. 155)`);
  for (const k of ['og:title', 'twitter:title']) if (meta(html, k) !== title) fail(page, `${k} distinto del title`);
  for (const k of ['og:description', 'twitter:description']) if (meta(html, k) !== desc) fail(page, `${k} distinto de la description`);
  if (meta(html, 'og:url') !== canonical) fail(page, `og:url inesperado: ${meta(html, 'og:url')}`);
  if (attr(html, /<link rel="canonical" href="([^"]*)"/) !== canonical) fail(page, 'canonical inesperado');
  if (!/<html[^>]*lang="es-CL"/.test(html)) fail(page, 'falta lang="es-CL"');
  return desc;
}

// ───────────── Portada (5 HTML) ─────────────
for (const page of HOME_PAGES) {
  const html = readFileSync(path.join(DIST, page), 'utf8');
  const before = failed;

  const desc = checkHead(page, html, { title: TITLE, canonical: `${ORIGIN}/` });
  if (desc && (!/\$19\.900/.test(desc) || !/IVA incluido/.test(desc))) fail(page, 'description sin precio Básico o sin "IVA incluido"');

  // --- Contenido ---
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => text(m[1]));
  if (h1s.length !== 1 || h1s[0] !== H1) fail(page, `H1 inesperado: ${JSON.stringify(h1s)}`);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => text(m[1]));
  if (!h2s.includes(H2_SEO)) fail(page, 'falta el H2 de la sección SEO');
  for (const r of REQUIRED) if (!html.includes(r)) fail(page, `falta "${r}"`);

  // --- JSON-LD ---
  const types = [];
  for (const raw of jsonLd(html)) {
    try {
      const data = JSON.parse(raw);
      types.push(data['@type']);
      if (data['@type'] === 'SoftwareApplication' && data.offers?.['@type'] !== 'AggregateOffer') fail(page, 'SoftwareApplication sin AggregateOffer');
      if (data['@type'] === 'FAQPage') {
        if (data.mainEntity.length !== FAQ_COUNT) fail(page, `FAQPage con ${data.mainEntity.length} preguntas (se esperan ${FAQ_COUNT})`);
        for (const q of data.mainEntity) {
          const n = countPos(q.acceptedAnswer.text);
          const max = SEO_FAQ.includes(q.name) ? 1 : 0;
          if (n > max) fail(page, `"POS" ${n} vez/veces en la respuesta de "${q.name}" (máx. ${max})`);
        }
        for (const q of SEO_FAQ) if (!data.mainEntity.some(e => e.name === q)) fail(page, `falta la pregunta SEO "${q}"`);
      }
    } catch (e) {
      fail(page, `JSON-LD inválido: ${e.message}`);
    }
  }
  for (const t of ['Organization', 'SoftwareApplication', 'FAQPage']) if (!types.includes(t)) fail(page, `falta JSON-LD ${t}`);

  // --- Cuerpo de la sección SEO: máx. 2 menciones (sin contar el H2) ---
  const seoSection = attr(html, new RegExp(`(<section id="${SEO_SECTION_ID}"[\\s\\S]*?</section>)`)) || '';
  if (!seoSection) fail(page, 'falta la sección SEO');
  const inBody = countPos(seoSection.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, ''));
  if (inBody > 2) fail(page, `"POS" ${inBody} veces en el cuerpo de la sección SEO (máx. 2)`);

  // --- "POS" solo en zonas SEO: se quitan las zonas permitidas y no debe quedar ninguno ---
  const rest = html
    .replace(/<title>[^<]*<\/title>/g, '')
    .replace(/<meta\s+(?:name|property)="(?:description|og:[a-z:_]+|twitter:[a-z:]+)"[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
    .replace(/\salt="[^"]*"/g, '')
    .replace(seoSection, '')
    .replace(/<section id="faq"[\s\S]*?<\/section>/g, sec => sec.replace(/<h3[^>]*>[\s\S]*?<\/h3>/g, ''))
    .replace(/<script[\s\S]*?<\/script>/g, '');
  const leak = rest.match(/.{0,50}\bPOS\b.{0,50}/);
  if (leak) fail(page, `"POS" fuera de las zonas SEO permitidas: …${text(leak[0])}…`);
  if (!countPos(html)) fail(page, '"POS" no aparece en ninguna zona SEO');

  console.log(`${failed === before ? '✓' : '✗'} ${page}`);
}

// ───────────── Páginas legales (3 HTML) ─────────────
for (const { file, path: route, title } of LEGAL_PAGES) {
  const before = failed;
  let html;
  try {
    html = readFileSync(path.join(DIST, file), 'utf8');
  } catch {
    fail(file, 'no existe en dist/');
    console.log(`✗ ${file}`);
    continue;
  }

  checkHead(file, html, { title, canonical: `${ORIGIN}${route}` });
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) fail(file, `se espera 1 H1 y hay ${h1s.length}`);
  if (html.includes(H1)) fail(file, 'contiene el contenido de la portada');

  // Solo Organization: FAQPage y SoftwareApplication describen la portada.
  for (const raw of jsonLd(html)) {
    try {
      const type = JSON.parse(raw)['@type'];
      if (type !== 'Organization') fail(file, `JSON-LD ${type} no corresponde a una página legal`);
    } catch (e) {
      fail(file, `JSON-LD inválido: ${e.message}`);
    }
  }
  const leak = html.replace(/<script[\s\S]*?<\/script>/g, '').match(/.{0,50}\bPOS\b.{0,50}/);
  if (leak) fail(file, `"POS" en una página legal: …${text(leak[0])}…`);

  console.log(`${failed === before ? '✓' : '✗'} ${file}`);
}

// ───────────── sitemap.xml coherente con las páginas ─────────────
const sitemap = readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(m => m[1]).sort();
const expectedLocs = [`${ORIGIN}/`, ...LEGAL_PAGES.map(p => `${ORIGIN}${p.path}`)].sort();
if (JSON.stringify(locs) !== JSON.stringify(expectedLocs)) fail('sitemap.xml', `URLs inesperadas: ${locs.join(', ')}`);
else console.log('✓ sitemap.xml');

// ───────────── Cadenas prohibidas en todo dist/ (HTML + JS) ─────────────
const files = walk(DIST);
for (const f of files.filter(f => /\.(html|js)$/.test(f))) {
  const s = readFileSync(f, 'utf8');
  for (const re of FORBIDDEN) { const m = s.match(re); if (m) fail(path.relative(DIST, f), `cadena prohibida "${m[0]}"`); }
}

// ───────────── Las capturas fuente no deben publicarse ─────────────
for (const f of files) {
  if (/originales|capturas-fuente|[\\/]pos\.png$|app-mesero/i.test(f)) fail(path.relative(DIST, f), 'captura fuente dentro de dist/');
}

console.log(failed
  ? `\n✗ ${failed} control(es) fallaron`
  : `\n✅ Controles OK (${HOME_PAGES.length} páginas de portada, ${LEGAL_PAGES.length} legales, sin avisos)`);
process.exit(failed ? 1 : 0);
