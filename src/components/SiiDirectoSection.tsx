import { motion } from 'framer-motion';
import { CheckCircle, Zap, Upload, CreditCard, ShieldCheck } from 'lucide-react';

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
    title: 'Sube tu Firma Electrónica',
    desc: 'Carga tu certificado .pfx una sola vez. Bullweb lo encripta y guarda seguro.',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-orange-400" />,
    title: 'Cobra en el POS',
    desc: 'Funciona como siempre. No cambias tu flujo de trabajo ni tu operación.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: 'Boleta emitida al SII',
    desc: 'En 2 segundos la boleta se firma y se envía automáticamente. Cero clicks extra.',
  },
];

export default function SiiDirectoSection() {
  return (
    <section className="relative bg-brand-bg py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* ── Hero ── */}
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
            Emite tus Boletas al SII a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Costo CERO.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-4 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Sin intermediarios. Sin cobros por documento. Directo de tu POS al SII con tu
            propia Firma Electrónica.
          </motion.p>
        </motion.div>

        {/* ── El Problema ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-red-400 mb-3">
            💸 El costo oculto que te está sangrando.
          </h3>
          <p className="text-slate-300 leading-relaxed">
            Otros sistemas POS te cobran por cada boleta que emites, o te obligan a pagar
            costosas suscripciones a plataformas intermedias. Si emites 100 boletas al día,
            eso son <strong className="text-white">miles de pesos mensuales</strong> que se
            van por el desagüe.
          </p>
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
            🚀 SII Directo: Tu Facturación sin comisiones.
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-2xl">🔴</span>
              <div>
                <span className="text-xl font-extrabold text-red-400">
                  Costo por Boleta: $0
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>Conexión Directa al SII</strong> — Sin pasar por terceros.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>Usa tu Firma Electrónica</strong> — Tú ya la tienes, solo súbela.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-200 text-lg">
                <strong>100% Automático</strong> — Cobras en el POS y la boleta se emite
                sola en 2 segundos.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* ── El Flujo ── */}
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
      </div>
    </section>
  );
}