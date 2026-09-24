import { motion } from 'framer-motion';
import { Check, X, Rocket, Zap } from 'lucide-react';

const FEATURES_TODO = [
  'POS ultrarrápido, siempre disponible',
  'App Mesero (sin hardware extra)',
  'Pantalla de Cocina (KDS)',
  'Carta digital QR',
  'Inventario en tiempo real y recetas',
  'Cuadres de caja y turnos',
  'Reloj control y asistencia con exportación a PDF',
  'CRM y fidelización · 100 emails incluidos al mes',
  'Cupones y promociones',
  'Boletas electrónicas al SII',
  'Reportes avanzados y exportación a Excel',
  '1 sucursal incluida por plan',
];

const FEATURES_BASICO = [
  'POS de mostrador con caja y cobros',
  'Gestión de mesas desde el POS',
  'Comandas e impresión de tickets',
  'Tienda online: retiro y delivery propio',
  'Carta digital QR visual',
  'Reportes básicos de ventas',
];

const SIN_BASICO = [
  'Boletas electrónicas al SII',
  'Pantalla de Cocina (KDS)',
  'App Mesero',
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
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💎 Dos planes — Sin letra chica
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Parte vendiendo hoy.{' '}
            <span className="text-orange-500">Crece cuando quieras.</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Los dos planes con 7 días de prueba gratis, sin tarjeta.
          </p>
        </motion.div>

        {/* Grid de dos cards */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ============ CARD TODO (destacada) ============ */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Badge destacada */}
              <div className="relative flex justify-center mb-4">
                <span className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-lg shadow-orange-500/30">
                  <Rocket className="w-3.5 h-3.5" />
                  Recomendado
                </span>
              </div>

              {/* Nombre del plan */}
              <h3 className="relative text-center text-xl font-extrabold text-white mb-1">
                Plan TODO
              </h3>
              <p className="relative text-center text-gray-400 text-sm mb-6">
                Todo incluido — un solo precio, sin módulos aparte.
              </p>

              {/* Precio */}
              <div className="relative mb-2">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap justify-center">
                  <span className="text-white text-5xl font-black">$34.000</span>
                  <span className="text-gray-400 text-lg">/ mes</span>
                </div>
                <p className="text-center text-gray-500 text-xs">IVA incluido</p>
              </div>

              {/* Lista de características */}
              <ul className="relative grid sm:grid-cols-2 gap-x-6 gap-y-3 my-8">
                {FEATURES_TODO.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-200 text-sm">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Ancla de valor */}
              <p className="relative text-orange-300 text-sm font-medium text-center max-w-xl mx-auto leading-relaxed mb-8">
                Es lo que te cuesta la comisión de 2 pedidos de delivery al día. Por eso mismo,
                tienes todo tu restaurante funcionando.
              </p>

              {/* CTA */}
              <a
                href="https://app.bullwebchile.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/30"
              >
                Empieza gratis 7 días — sin tarjeta
              </a>
              <p className="relative text-center text-gray-500 text-xs mt-3">
                Sin contratos amarrados. Cancela cuando quieras.
              </p>
            </div>
          </motion.div>

          {/* ============ CARD BÁSICO (secundaria) ============ */}
          <motion.div
            className="relative"
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
              <p className="text-center text-slate-500 text-sm mb-6">
                Lo esencial para vender ordenado desde el día uno.
              </p>

              {/* Precio */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap justify-center">
                  <span className="text-gray-900 text-5xl font-black">$19.900</span>
                  <span className="text-slate-400 text-lg">/ mes</span>
                </div>
                <p className="text-center text-slate-400 text-xs">IVA incluido</p>
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
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 text-center">
                  Lo que no incluye
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                  {SIN_BASICO.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                      <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      <span>Sin {f.charAt(0).toLowerCase() + f.slice(1)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href="https://app.bullwebchile.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white hover:bg-slate-50 text-gray-900 font-bold text-center py-4 rounded-xl text-lg transition-colors border-2 border-slate-300 hover:border-slate-400"
              >
                Empezar con Básico — 7 días gratis
              </a>
              <p className="text-center text-slate-400 text-xs mt-3">
                ¿Necesitas más? Mejora a TODO desde el panel, en un clic.
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
            className="text-gray-500 hover:text-green-600 underline underline-offset-4 decoration-gray-300 hover:decoration-green-500 transition-colors text-xs"
          >
            ¿Prefieres que te guiemos? Escríbenos por WhatsApp
          </a>
        </p>

      </div>
    </section>
  );
}
