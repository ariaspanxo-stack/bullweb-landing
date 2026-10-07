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

// Taglines extraídos de Pricing.tsx (fuente de verdad del copy).
export const PLANS: Plan[] = [
  { id: 'basico', name: 'Básico', priceCLP: 19900, tagline: 'Lo esencial para vender ordenado desde el día uno.', destaca: false },
  { id: 'todo',   name: 'TODO',   priceCLP: 34000, tagline: 'Todo incluido — un solo precio, sin módulos aparte.',  destaca: true  },
];

export const PLAN_BASICO = PLANS[0];
export const PLAN_TODO   = PLANS[1];

/** 19900 -> "$19.900" */
export function formatCLP(n: number): string {
  return '$' + n.toLocaleString('es-CL');
}

export const PRICE_BASICO = formatCLP(PLAN_BASICO.priceCLP); // $19.900
export const PRICE_TODO   = formatCLP(PLAN_TODO.priceCLP);   // $34.000

/** "Desde $19.900 (Básico) o $34.000 (TODO)" */
export const PRICE_RANGE_TEXT = `Desde ${PRICE_BASICO} (Básico) o ${PRICE_TODO} (TODO)`;

/** Badge dual del Hero (#227). */
export const BADGE_DUAL = `Básico ${PRICE_BASICO} · TODO ${PRICE_TODO} — tienda online incluida en ambos`;

/** Copy SEO (#227) — inyectado en index.html vía vite.config.ts. */
export const SEO = {
  title:       'BullWeb — Punto de venta y tienda online para restaurantes',
  description: `Gestiona tu restaurante: venta en local, carta QR, comandas y tienda online. Planes desde ${PRICE_BASICO} al mes. Prueba 7 días gratis sin tarjeta.`,
};

/** Entrada FAQ de precios (#227) — compartida por FAQ.tsx y el JSON-LD FAQPage. */
export const FAQ_PRECIOS_Q = '¿Los planes son de verdad todo incluido, o hay cobros escondidos?';
export const FAQ_PRECIOS_A = `${PRICE_RANGE_TEXT} al mes, sin cobros escondidos: no cobramos por usuario ni por función nueva, y el plan TODO trae todas las funciones dentro del precio, sin módulos aparte. Sin contratos amarrados, cancelas cuando quieras.`;

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
