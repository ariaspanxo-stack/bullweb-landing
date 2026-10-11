/**
 * #227 — Fuente única de planes y precios de la landing.
 * Hero, Pricing, Features, FAQ y el generador de metas/JSON-LD (vite.config.ts)
 * importan desde aquí. PROHIBIDO escribir precios a mano en componentes.
 */

export interface Plan {
  id:       string;
  name:     string;
  priceCLP: number;
  tagline:  string;
  destaca:  boolean;
}

// #228 — NAMING "FULL" display-only: el nombre visible del plan TODO pasa a
// "Full" en TODA la landing. El identificador interno (id:'todo', plan:'TODO'
// en backend/BD) queda INTACTO — esto es solo texto visible.
export const PLANS: Plan[] = [
  { id: 'basico', name: 'Básico', priceCLP: 19900, tagline: 'Lo esencial para vender ordenado desde el día uno.', destaca: false },
  { id: 'todo',   name: 'Full',   priceCLP: 34000, tagline: 'Todo incluido — un solo precio, sin módulos aparte.',  destaca: true  },
];

export const PLAN_BASICO = PLANS[0];
export const PLAN_TODO   = PLANS[1];

/** 19900 -> "$19.900" */
export function formatCLP(n: number): string {
  return '$' + n.toLocaleString('es-CL');
}

export const PRICE_BASICO = formatCLP(PLAN_BASICO.priceCLP); // $19.900
export const PRICE_TODO   = formatCLP(PLAN_TODO.priceCLP);   // $34.000

/** #228 — IVA incluido: nota estándar para TODO texto de precio de la landing. */
export const PRICE_NOTE = 'IVA incluido';

/** Frase estándar de activación de boletas SII: va en o junto a cada mención. */
export const BOLETAS_ACTIVACION = 'Se activa con tu certificado y tus folios; te acompañamos en la puesta en marcha.';

/** "Desde $19.900/mes, IVA incluido." — subtítulo del Hero (#228). */
export const HERO_PRICE_TEXT = `Desde ${PRICE_BASICO}/mes, ${PRICE_NOTE}.`;

/** "Desde $19.900 (Básico) o $34.000 (Full)" */
export const PRICE_RANGE_TEXT = `Desde ${PRICE_BASICO} (Básico) o ${PRICE_TODO} (Full)`;

/** Badge dual del Hero (#227, naming Full #228). */
export const BADGE_DUAL = `Básico ${PRICE_BASICO} · Full ${PRICE_TODO} — tienda online incluida en ambos`;

/**
 * Copy SEO (#227) — inyectado en index.html vía vite.config.ts.
 * "POS" se permite aquí (title, description, Open Graph/Twitter) como
 * excepción SEO; en la interfaz se sigue usando "punto de venta" o "caja".
 * Límites: title ≤ 60 caracteres, description ≤ 155 (los valida scripts/check-dist.js).
 */
export const SEO = {
  title:       'Sistema POS para Restaurantes en Chile | BullWeb',
  description: `POS para restaurantes en Chile: punto de venta, comandas, App Mesero, tienda online y carta QR. Desde ${PRICE_BASICO}/mes ${PRICE_NOTE}. 7 días gratis.`,
};

/** Entrada FAQ de precios (#227, naming Full #228) — compartida por FAQ.tsx y el JSON-LD FAQPage. */
export const FAQ_PRECIOS_Q = '¿Los planes son de verdad todo incluido, o hay cobros escondidos?';
export const FAQ_PRECIOS_A = `${PRICE_RANGE_TEXT} al mes, sin cobros escondidos: no cobramos por usuario ni por función nueva, y el plan Full trae todas las funciones dentro del precio, sin módulos aparte. Sin contratos amarrados, cancelas cuando quieras.`;

/** AggregateOffer para el JSON-LD de SoftwareApplication (#227). */
export function jsonLdOffers() {
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'CLP',
    lowPrice: PLAN_BASICO.priceCLP,
    highPrice: PLAN_TODO.priceCLP,
    offerCount: PLANS.length,
    offers: PLANS.map(p => ({
      '@type': 'Offer',
      name: `Plan ${p.name}`,
      price: String(p.priceCLP),
      priceCurrency: 'CLP',
      description: `Plan ${p.name} BullWeb — ${p.tagline} Prueba 7 días gratis, sin tarjeta de crédito.`,
    })),
  };
}
