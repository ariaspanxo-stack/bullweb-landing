/**
 * Fuente única de la FAQ de la landing: la consumen FAQ.tsx y el JSON-LD
 * FAQPage de index.html (inyectado vía vite.config.ts).
 */
import { FAQ_PRECIOS_Q, FAQ_PRECIOS_A, BOLETAS_ACTIVACION, PRICE_NOTE } from './plans';

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: '¿Necesito comprar hardware caro?',
    a: 'No. BullWeb funciona en los dispositivos que ya tienes: el celular o tablet de tus meseros hace de comandera, y cualquier computador o tablet sirve de caja. La App Mesero es una PWA — se abre desde el navegador, sin instalar nada. Si más adelante quieres impresora o pantalla de cocina dedicada, se conectan, pero para partir no necesitas invertir en equipos.',
  },
  {
    q: '¿Qué pasa si me quiero cambiar desde mi sistema actual?',
    a: 'Te acompañamos en el traspaso. Cargamos tu carta, tus productos y tus datos para que arranques rápido, sin partir de cero. Y como tienes 7 días de prueba gratis sin tarjeta, puedes tenerlo funcionando en paralelo y comprobar que todo calza antes de soltar tu sistema viejo.',
  },
  {
    // #227 — entrada dual desde las constantes (src/lib/plans.ts)
    q: FAQ_PRECIOS_Q,
    a: FAQ_PRECIOS_A,
  },
  {
    q: '¿Cómo activo las boletas electrónicas al SII?',
    a: `Las boletas al SII están incluidas en el plan Full. ${BOLETAS_ACTIVACION} Necesitas tu certificado digital (lo emite un certificador externo), tus folios (se obtienen gratis en mi.sii.cl) y tu RUT.`,
  },
  {
    q: '¿Qué pasa al terminar los 7 días de prueba?',
    a: 'Si decides seguir, eliges tu plan y pagas. Si no, no pagas nada: la prueba es sin tarjeta.',
  },
  {
    q: '¿Cómo se paga el plan?',
    a: `Pago con tarjeta por Webpay. Los precios son con ${PRICE_NOTE}.`,
  },
  {
    q: '¿Cómo funciona el soporte?',
    a: 'Escríbenos por WhatsApp y te atendemos directo. Contamos con soporte en vivo y soporte remoto.',
  },
  {
    q: '¿Me ayudan a configurar mi impresora?',
    a: 'Sí. Contamos con soporte en vivo y soporte remoto para dejarla configurada contigo. Escríbenos por WhatsApp.',
  },
  {
    q: '¿Se puede instalar como app?',
    a: 'Sí. BullWeb se abre desde el navegador y también puedes instalarlo como app en tu celular, tablet o computador, sin pasar por tiendas de aplicaciones.',
  },
  {
    q: '¿Se integra con apps de delivery?',
    a: 'Hoy no. Gestionas tu delivery propio desde el sistema: recibes el pedido, asignas repartidor y cobras, todo dentro de BullWeb.',
  },
];

/** JSON-LD FAQPage generado desde FAQS. */
export function jsonLdFaq() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
