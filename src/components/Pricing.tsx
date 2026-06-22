import { motion } from 'framer-motion';

const COMPARISON: [string, boolean, boolean][] = [
  ['POS + Gestión de mesas',         true,  true],
  ['Integración DTE / Bsale',          true,  true],
  ['App Mesero móvil',                true,  true],
  ['Inventario + Recetas',            true,  true],
  ['KDS Cocina Digital',              false, true],
  ['Carta QR (cliente pide solo)',     false, true],
  ['CRM + Programa de puntos',        false, true],
  ['Uber Eats + Rappi + PedidosYa integrados', false, true],
  ['Campañas email/WhatsApp',         false, true],
  ['PWA instalable',                  false, true],
  ['Soporte en español 24/7',         false, true],
];

const CUPOS_TOTAL = 5;
const CUPOS_USADOS = 0;
const CUPOS_RESTANTES = CUPOS_TOTAL - CUPOS_USADOS;

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🚀 Precio de Fundador · Tiempo limitado
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
            Un solo plan.{' '}
            <span className="text-orange-500">Todo incluido.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Sin planes confusos, sin add-ons escondidos.
            Un precio, todas las funciones, desde el día 1.
          </p>
        </motion.div>

        {/* Card principal */}
        <motion.div
          className="relative max-w-lg mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge cupos */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
              🔥 Solo {CUPOS_RESTANTES} cupos disponibles
            </span>
          </div>

          {/* Card */}
          <div className="bg-[#0f172a] rounded-3xl p-8 border-2 border-orange-500 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">⚡</span>
              <h3 className="text-white font-black text-xl tracking-wide uppercase">BullWeb Completo</h3>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-gray-500 line-through text-xl">$29.990/mes</span>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">-33% primer año</span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-white text-6xl font-black">$25.000</span>
                <span className="text-gray-400 text-lg">/mes</span>
              </div>
              <div className="flex items-center gap-2 mt-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <p className="text-orange-300 text-sm font-medium">Precio bloqueado por 12 meses</p>
              </div>
              <p className="text-gray-500 text-xs">A partir del mes 13 pasa a $29.990/mes</p>
            </div>

            {/* Top 3 features */}
            <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
              {[
                { icon: '🍽️', title: 'POS + Mesas',  desc: 'Comandas y cobro en segundos' },
                { icon: '👨‍🍳', title: 'KDS Cocina',   desc: 'Pantalla digital en tiempo real' },
                { icon: '📱', title: 'Carta QR',     desc: 'Clientes piden desde su celular' },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                  <div className="text-2xl mb-1">{f.icon}</div>
                  <div className="text-white font-bold text-xs mb-1">{f.title}</div>
                  <div className="text-white/50 text-xs leading-tight">{f.desc}</div>
                </div>
              ))}
            </div>

            {/* 2 columnas */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-6">
              <div className="space-y-2">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">⚙️ Operación</p>
                {['App Mesero (celular)', 'Arqueo de caja', 'Empleados + roles', 'Impresión Epson/Star', 'Uber Eats + Rappi + PedidosYa'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-xs">
                    <span className="text-orange-400">✓</span>{f}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">🚀 Crecimiento</p>
                {['CRM + Prog. de puntos', 'Cupones y descuentos', 'DTE / Integración Bsale', 'PWA (app instalable)', 'Soporte WhatsApp 24/7'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-xs">
                    <span className="text-orange-400">✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla valor */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <p className="text-white/50 text-xs mb-3 uppercase tracking-wider font-semibold">💰 Si lo contrataras por separado</p>
              <div className="space-y-1.5">
                {[
                  ['KDS Cocina Digital', '$15.000'],
                  ['App Mesero',         '$10.000'],
                  ['CRM + Fidelización', '$20.000'],
                  ['Carta QR',           '$12.000'],
                  ['Delivery propio',    '$10.000'],
                ].map(([name, price], i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">{name}</span>
                    <span className="text-white/40 text-xs line-through">{price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
                <span className="text-white/60 text-xs font-semibold">Valor de mercado:</span>
                <span className="text-white/40 text-sm line-through">$67.000/mes</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-orange-400 text-sm font-black">Tu precio hoy:</span>
                <span className="text-orange-400 text-xl font-black">$25.000/mes</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://app.bullwebchile.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-center py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/30"
            >
              Comenzar 7 días gratis →
            </a>
            <p className="text-center text-gray-500 text-xs mt-4">
              Sin tarjeta de crédito · Cancela cuando quieras · Setup incluido
            </p>
          </div>
        </motion.div>

        {/* ── Add-ons ── */}
        <motion.div
          className="mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8">
          {/* Separador */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-white/10" />
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold whitespace-nowrap">
              ➕ Agrega lo que necesitas
            </p>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-white/30 text-sm mb-8">
            Actívalos cuando quieras. Sin contrato. Cancela cuando quieras.
          </p>

          {/* Cards */}
          <div className="space-y-4">
            {[
              {
                icon: '⭐',
                nombre: 'Fidelización + CRM',
                precio: '$4.990',
                descripcion: 'Programa de puntos, emails automáticos, cumpleaños, historial de clientes y segmentación VIP.',
                msg: encodeURIComponent('Hola BullWeb 👋 quiero agregar Fidelización+CRM ($4.990/mes) a mi plan'),
              },
              {
                icon: '🎟️',
                nombre: 'Cupones',
                precio: '$2.990',
                descripcion: 'Códigos de descuento por % o monto fijo. Validación directa en el POS.',
                msg: encodeURIComponent('Hola BullWeb 👋 quiero agregar Cupones ($2.990/mes) a mi plan'),
              },
              {
                icon: '👥',
                nombre: 'Empleados',
                precio: '$3.990',
                descripcion: 'Gestión de personal, asistencia Kiosk QR, turnos e historial por empleado.',
                msg: encodeURIComponent('Hola BullWeb 👋 quiero agregar Empleados ($3.990/mes) a mi plan'),
              },
            ].map((addon, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 flex items-center justify-between gap-6 hover:bg-white/[0.15] hover:border-white/30 transition-all duration-200"
              >
                {/* Izquierda */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-4xl shrink-0">{addon.icon}</span>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-base mb-1">{addon.nombre}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{addon.descripcion}</p>
                  </div>
                </div>

                {/* Derecha */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-white font-black text-2xl leading-none">{addon.precio}</span>
                    <span className="text-white/40 text-sm">/mes</span>
                  </div>
                  <a
                    href={`https://wa.me/56937458347?text=${addon.msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    Solicítalo aquí →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Nota bundle */}
          <p className="text-center text-white/25 text-sm mt-8">
            💡 ¿Los quieres todos? Pregunta por el bundle completo en{' '}
            <a
              href="https://wa.me/56937458347?text=Hola%2C%20quiero%20información%20sobre%20BullWeb%20Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/60 underline transition-colors"
            >
              WhatsApp
            </a>
            .
          </p>          </div>        </motion.div>

        {/* Nota precio futuro */}
        <motion.div
          className="mt-8 text-center space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm">
            ⚠️ Al completarse los {CUPOS_TOTAL} cupos fundadores, el precio sube a{' '}
            <strong className="text-gray-300">$29.990/mes</strong>
          </p>
          <p className="text-gray-500 text-xs">
            🔒 Tu precio de $25.000 queda bloqueado los primeros 12 meses sin importar cuándo se llenen los cupos.
          </p>
        </motion.div>

        {/* Tabla comparativa */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-center text-2xl font-black text-gray-900 mb-2">
            ¿Por qué BullWeb?
          </h3>
          <p className="text-center text-gray-500 mb-10">
            Compara con otras empresas del mercado
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-5 text-gray-600 font-semibold text-sm w-1/2">
                    Funcionalidad
                  </th>
                  <th className="py-4 px-5 text-center text-gray-500 font-semibold text-sm">
                    Otras empresas
                    <div className="text-xs font-normal text-gray-400 mt-0.5">hasta $52.500/mes</div>
                  </th>
                  <th className="py-4 px-5 text-center bg-orange-50">
                    <span className="text-orange-600 font-black text-sm">⚡ BullWeb</span>
                    <div className="text-xs font-normal text-orange-500 mt-0.5">$25.000/mes</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, otros, bull], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-5 text-gray-700 text-sm">{feature}</td>
                    <td className="py-3 px-5 text-center">
                      {otros ? (
                        <span className="text-gray-400 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-300 text-lg">✕</span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-center bg-orange-50/50">
                      {bull ? (
                        <span className="text-orange-500 text-lg font-bold">✓</span>
                      ) : (
                        <span className="text-gray-300 text-lg">✕</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td className="py-4 px-5 text-gray-600 font-semibold text-sm">Precio mensual</td>
                  <td className="py-4 px-5 text-center text-gray-500 font-bold">hasta $52.500</td>
                  <td className="py-4 px-5 text-center bg-orange-50/50">
                    <span className="text-orange-500 font-black text-lg">$25.000</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-center text-gray-400 text-xs mt-4">
            * Comparación basada en planes disponibles al 9 de abril de 2026.
            Precios en pesos chilenos, IVA incluido.
          </p>
        </motion.div>

        {/* CTA final */}
        <motion.div
          className="mt-16 text-center bg-gray-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gray-600 text-lg mb-2">
            🇨🇱 Hecho en Chile, para restaurantes chilenos
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Setup incluido · Te ayudamos a configurar todo el primer día
          </p>
          <a
            href="https://app.bullwebchile.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Empezar ahora — es gratis →
          </a>
          <p className="text-gray-400 text-xs mt-3">
            7 días gratis · Sin tarjeta · Cancela cuando quieras
          </p>
        </motion.div>

      </div>
    </section>
  );
}