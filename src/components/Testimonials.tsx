import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

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

        {/* Tarjeta Francisco Arias */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-white rounded-3xl p-10 shadow-md border border-slate-100">
            {/* Comillas decorativas */}
            <span className="absolute top-6 right-8 text-7xl font-black text-orange-100 leading-none select-none">&ldquo;</span>

            {/* Badge */}
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-500 text-xs font-bold rounded-full border border-orange-100 mb-5">
              🧑‍💻 Fundador
            </span>

            {/* Rating */}
            <Stars count={5} />

            {/* Texto */}
            <blockquote className="mt-4 text-slate-700 leading-relaxed text-lg relative z-10">
              &ldquo;BullWeb Chile no nació como una idea más. Nació desde la necesidad de crear un sistema gastronómico realmente rápido, estable y escalable. Después de años analizando cómo operan distintos negocios del rubro, desarrollé una plataforma POS multitenant enfocada en rendimiento, automatización y control total de la operación. Cada función, mejora y actualización tiene un objetivo claro: simplificar procesos, ahorrar tiempo y entregar una herramienta moderna que realmente acompañe el crecimiento de cada negocio.&rdquo;
            </blockquote>

            {/* Autor */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
              <img
                src="/images/francisco-arias.jpg"
                alt="Francisco Arias"
                className="w-14 h-14 rounded-full object-cover bg-orange-100"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <p className="font-black text-slate-800 text-base">Francisco Arias</p>
                <p className="text-slate-500 text-sm">Fundador BullWeb · Ingeniero Software · Santiago, Chile</p>
              </div>
            </div>
          </div>
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
