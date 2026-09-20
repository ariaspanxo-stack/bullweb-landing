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
            Construido por un restaurantero.{' '}
            <span className="text-orange-500">Probado en uno real.</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Bullweb no nació en una oficina: nació en la cocina. Nuestro propio restaurante
            opera con el sistema todos los días — POS, comandas, inventario y boletas al SII.
            Lo que ves en esta página es lo que usamos en producción.
          </p>
        </motion.div>

        {/* Tarjeta del fundador */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <img
              src="/images/francisco-arias.jpg"
              alt="Francisco Arias — Fundador de Bullweb"
              width="96"
              height="96"
              loading="lazy"
              className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-4 ring-orange-100"
            />
            <div className="text-center sm:text-left">
              <p className="text-slate-700 text-base leading-relaxed italic">
                "Antes pagaba por módulos y por cada boleta. Hoy pago un precio fijo y el
                restaurante completo corre en un solo sistema — empezando por el mío."
              </p>
              <p className="mt-4 text-slate-900 font-bold text-sm">
                Francisco Arias — Fundador · Cliente Cero
              </p>
            </div>
          </div>
        </motion.div>

        {/* Línea de cierre */}
        <motion.p
          className="text-center text-slate-400 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Operando desde 2026 · Santiago, Chile
        </motion.p>
      </div>
    </section>
  );
}
