import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-semibold rounded-full border border-amber-100 mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
            Directo desde{' '}
            <span className="text-orange-500">producción real</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            En producción desde 2026 · Santiago, Chile
          </p>
        </motion.div>

        {/* Sub-texto invitación */}
        <motion.p
          className="text-center text-slate-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          ¿Quieres ser el próximo testimonio?{' '}
          <a
            href="https://app.bullwebchile.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 font-semibold hover:underline"
          >
            Empieza gratis hoy →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
