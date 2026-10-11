import { motion } from 'framer-motion';
import { Check, X, Rocket, Zap, FileText } from 'lucide-react';
import { PRICE_BASICO, PRICE_TODO, PRICE_NOTE, BOLETAS_ACTIVACION } from '../lib/plans';
import { REGISTER_URL, track } from '../lib/measurement';

// Solo lo ADICIONAL de Full sobre Básico (la card abre con "Todo lo del
// Básico, más:"). Las boletas SII van aparte, destacadas, con su frase de
// activación.
const FEATURES_TODO = [
  'Pantalla de Cocina (KDS)',
  'Inventario en tiempo real y recetas',
  'CRM y fidelización · 100 emails incluidos al mes',
  'Cupones y promociones',
  'Reloj control y asistencia con exportación a PDF',
  'Reportes avanzados y exportación a Excel',
];

const FEATURES_BASICO = [
  'Punto de venta de mostrador con caja y cobros',
  'Gestión de mesas desde el punto de venta',
  'Comandas e impresión de tickets',
  'Tienda online: retiro y delivery propio',
  'Carta digital QR visual',
  'Reportes básicos de ventas',
  'App Mesero para tus garzones (sin hardware extra)',
];

const SIN_BASICO = [
  'Boletas electrónicas al SII',
  'Pantalla de Cocina (KDS)',
  'Inventario y recetas',
  'Fidelización y campañas',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💎 Dos planes — Sin letra chica
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Parte vendiendo hoy.{' '}
            <span className="text-orange-600">Crece cuando quieras.</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Los dos planes con 7 días de prueba gratis, sin tarjeta.
          </p>
        </motion.div>

        {/* Grid de dos cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ============ CARD TODO (destacada) — en celular va después de Básico ============ */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Badge destacada */}
              <div className="relative flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 bg-orange-500 text-brand-bg text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-lg shadow-orange-500/30">
                  <Rocket className="w-3.5 h-3.5" />
                  Recomendado
                </span>
              </div>

              {/* Nombre del plan (#228 — display "Full", identificador interno intacto) */}
              <h3 className="relative text-center text-xl font-extrabold text-white mb-1">
                Plan Full
              </h3>
              <p className="relative text-center text-gray-300 text-sm mb-6">
                Todo incluido — un solo precio, sin módulos aparte.
              </p>

              {/* Precio */}
              <div className="relative mb-2">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap justify-center">
                  <span className="text-white text-5xl font-black">{PRICE_TODO}</span>
                  <span className="text-gray-300 text-lg">/ mes</span>
                </div>
                <p className="text-center text-gray-200 text-sm font-semibold">{PRICE_NOTE}</p>
              </div>

              {/* Boletas SII — módulo destacado de Full, con su frase de activación */}
              <div className="relative mt-8 flex items-start gap-3 bg-orange-500/10 border border-orange-500/40 rounded-2xl p-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500 text-brand-bg shrink-0">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-white font-bold">Boletas electrónicas al SII incluidas</p>
                  <p className="text-gray-300 text-sm leading-relaxed mt-0.5">{BOLETAS_ACTIVACION}</p>
                </div>
              </div>

              {/* Lista de características: solo lo adicional sobre Básico */}
              <p className="relative text-white font-bold mt-6 mb-3">Todo lo del Básico, más:</p>
              <ul className="relative grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                {FEATURES_TODO.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200 text-sm">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="relative text-gray-300 text-sm mb-8">1 sucursal incluida por plan.</p>

              {/* Ancla de valor */}
              <p className="relative text-orange-300 text-sm font-medium text-center max-w-xl mx-auto leading-relaxed mb-8">
                Es lo que te cuesta la comisión de 2 pedidos de delivery al día. Por eso mismo,
                tienes todo tu restaurante funcionando.
              </p>

              {/* CTA */}
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { location: 'pricing-full' })}
                className="relative block w-full bg-orange-500 hover:bg-orange-400 text-brand-bg font-bold text-center py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/30"
              >
                Probar 7 días gratis
              </a>
              <p className="relative text-center text-gray-300 text-sm mt-3">
                Sin tarjeta · Sin contratos amarrados, cancela cuando quieras.
              </p>
            </div>
          </motion.div>

          {/* ============ CARD BÁSICO (secundaria) — primera en celular ============ */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-xl shadow-slate-200/60 relative overflow-hidden">

              {/* Badge secundaria */}
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-slate-200">
                  <Zap className="w-3.5 h-3.5" />
                  Para empezar
                </span>
              </div>

              {/* Nombre del plan */}
              <h3 className="text-center text-xl font-extrabold text-gray-900 mb-1">
                Plan Básico
              </h3>
              <p className="text-center text-slate-600 text-sm mb-6">
                Lo esencial para vender ordenado desde el día uno.
              </p>

              {/* Precio */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap justify-center">
                  <span className="text-gray-900 text-5xl font-black">{PRICE_BASICO}</span>
                  <span className="text-slate-600 text-lg">/ mes</span>
                </div>
                <p className="text-center text-slate-700 text-sm font-semibold">{PRICE_NOTE}</p>
              </div>

              {/* Lista de características */}
              <ul className="grid gap-y-3 my-8">
                {FEATURES_BASICO.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Los "SIN" — visibles y honestos */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3 text-center">
                  Lo que no incluye
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {SIN_BASICO.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                      <X className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Sin {f.charAt(0).toLowerCase() + f.slice(1)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('plan_selected', { plan: 'basico' })}
                className="block w-full bg-white hover:bg-slate-50 text-gray-900 font-bold text-center py-4 rounded-xl text-lg transition-colors border-2 border-slate-300 hover:border-slate-400"
              >
                Probar 7 días gratis
              </a>
              <p className="text-center text-slate-600 text-sm mt-3">
                Sin tarjeta · ¿Necesitas más? Mejora a Full desde el panel, en un clic.
              </p>
            </div>
          </motion.div>

        </div>

        {/* #191 — WhatsApp contextual de la sección (enlace secundario discreto) */}
        <p className="text-center mt-10">
          <a
            href="https://wa.me/56937458347?text=Hola%2C%20quiero%20empezar%20la%20prueba%20gratis%20de%207%20d%C3%ADas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-green-700 underline underline-offset-4 decoration-slate-400 hover:decoration-green-600 transition-colors text-sm"
          >
            ¿Prefieres que te guiemos? Escríbenos por WhatsApp
          </a>
        </p>

      </div>
    </section>
  );
}
