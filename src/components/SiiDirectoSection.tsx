import { motion } from 'framer-motion';
import { CheckCircle, Zap, Upload, ShieldCheck, FileCheck } from 'lucide-react';
import { REGISTER_URL, track } from '../lib/measurement';

/**
 * #228 — BOLETAS REUBICADAS (módulo del plan Full, se muestra después de
 * Pricing en App.tsx). Redacción con la frase exacta del Comandante, SIN
 * jerga DTE, SIN "$0 por boleta" como dato destacado, SIN "ya emiten".
 */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-orange-400" />,
    title: 'Carga tu certificado',
    desc: 'Tu certificado digital (emitido por un certificador externo) se sube una sola vez. Queda encriptado y guardado seguro.',
  },
  {
    icon: <FileCheck className="w-8 h-8 text-orange-400" />,
    title: 'Carga tus folios',
    desc: 'Tus folios CAF se obtienen gratis en mi.sii.cl. Con ellos el sistema queda autorizado para emitir tus boletas.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: 'Emite directo al SII',
    desc: 'Cobras en el punto de venta y la boleta se firma y envía automáticamente. Te acompañamos en la puesta en marcha.',
  },
];

export default function SiiDirectoSection() {
  return (
    <section className="relative bg-brand-bg py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* ── Encabezado (frase exacta del Comandante) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Boletas incluidas en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Full
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Boletas incluidas en Full: emisión directa al SII, sin comisión por
            documento. Se activa cargando tu certificado y tus folios — te
            acompañamos en la puesta en marcha.
          </motion.p>
        </motion.div>

        {/* ── La Solución ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            🚀 Emisión directa al SII, sin comisión por documento.
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>Incluidas en el plan Full</strong> — dentro del precio
                del plan, sin cobros por documento.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>Conexión directa al SII</strong> — emisión con tu
                propio certificado digital y tus folios.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>100% automático</strong> — cobras en el punto de venta
                y la boleta se firma y envía sola en segundos.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* ── El Flujo de activación ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Así de simple funciona
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center hover:border-orange-500/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-orange-400 mb-2">
                  PASO {i + 1}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Primera línea de activación + nota ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-slate-200 leading-relaxed">
            Para activarlas necesitas tu certificado digital (un certificador
            externo), tus folios CAF (gratis en mi.sii.cl) y tu RUT.
          </p>
          <p className="text-slate-500 text-xs mt-3">
            Requisito informado en la primera conversación de venta.
          </p>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('cta_click', { location: 'sii-directo-full' })}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/30"
          >
            Quiero el plan Full con boletas incluidas →
          </a>
          <p className="text-slate-500 text-xs mt-3">
            7 días gratis · Sin tarjeta · IVA incluido
          </p>
          {/* #191 — WhatsApp contextual de la sección */}
          <p className="mt-4">
            <a
              href="https://wa.me/56937458347?text=Hola%2C%20quiero%20saber%20c%C3%B3mo%20funcionan%20las%20boletas%20al%20SII"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 underline underline-offset-4 decoration-slate-600 hover:decoration-green-400 transition-colors text-sm"
            >
              ¿Dudas con las boletas? Pregúntanos por WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
