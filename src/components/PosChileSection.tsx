import { BOLETAS_ACTIVACION } from '../lib/plans';
import { scrollBehavior } from '../lib/motion';

/**
 * Sección SEO corta entre Modules y Pricing. "POS" se permite en el H2 y,
 * como máximo, 2 veces en el cuerpo (excepción SEO; lo valida check-dist.js).
 */
const LINKS = [
  { label: 'Ver módulos',          href: '#modules' },
  { label: 'Ver precios',          href: '#pricing' },
  { label: 'Preguntas frecuentes', href: '#faq' },
];

export default function PosChileSection() {
  return (
    <section id="sistema-pos-restaurantes-chile" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight mb-6">
          Sistema POS para restaurantes en Chile: todo en un solo lugar
        </h2>

        <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
          <p>
            BullWeb es un sistema POS (punto de venta) pensado para restaurantes, cafeterías y
            locales de comida en Chile. Reúne en un solo lugar lo que suele estar repartido
            entre la caja, las libretas y varias aplicaciones: cobras en el punto de venta, ves
            el estado de cada mesa y envías las comandas a cocina sin pasos intermedios.
          </p>
          <p>
            Tus garzones toman pedidos desde su propio celular con la App Mesero, cada uno con
            su PIN. Tus clientes revisan la carta QR desde la mesa y también pueden pedir en tu
            tienda online, sin comisiones, para retiro o delivery propio.
          </p>
          <p>
            El POS funciona desde el navegador, en los equipos que ya tienes. El plan Full incluye
            además boletas electrónicas al SII: {BOLETAS_ACTIVACION.charAt(0).toLowerCase() + BOLETAS_ACTIVACION.slice(1)}
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={e => {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: scrollBehavior() });
                }}
                className="text-orange-700 font-semibold underline underline-offset-4 decoration-orange-300 hover:decoration-orange-700 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
