import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const FEATURES = [
  'POS ultrarrápido, siempre disponible',
  'App Mesero (sin hardware extra)',
  'Pantalla de Cocina (KDS)',
  'Carta digital QR',
  'Inventario en tiempo real y recetas',
  'Cuadres de caja y turnos',
  'Reloj control y asistencia con exportación a PDF',
  'CRM y fidelización',
  'Cupones y promociones',
  'Boletas electrónicas al SII',
  'Reportes avanzados y exportación a Excel',
  '1 sucursal incluida por plan',
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            💎 Plan único — Sin letra chica
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Un precio.{' '}
            <span className="text-orange-500">Todo incluido.</span>{' '}
            Sin sorpresas.
          </h2>
        </motion.div>

        {/* Card principal */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Precio */}
            <div className="relative mb-2">
              <div className="flex items-baseline gap-2 mb-2 flex-wrap justify-center">
                <span className="text-white text-5xl sm:text-6xl font-black">$29.000</span>
                <span className="text-gray-400 text-lg">/ mes</span>
              </div>
            </div>

            {/* Lista de características */}
            <ul className="relative grid sm:grid-cols-2 gap-x-6 gap-y-3 my-8">
              {FEATURES.map((f, i) => (
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
            <p className="relative text-center text-gray-500 text-xs mt-4">
              Sin contratos amarrados. Cancela cuando quieras.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}