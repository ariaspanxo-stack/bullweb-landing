import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function TestimonioDestacado() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative bg-white rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-xl shadow-orange-500/5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Comilla decorativa */}
          <div className="absolute -top-6 left-8 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
            <Quote className="w-6 h-6" />
          </div>

          {/* Texto */}
          <p className="text-xl sm:text-2xl font-semibold text-slate-800 leading-relaxed mb-6">
            “Lo elegí por el Modo Offline: en Chillán el internet se cae y saber que la caja no se
            me frena me da tranquilidad. Y que venga todo incluido por $29.000 fue lo que cerró la
            decisión.”
          </p>

          {/* Autor */}
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-lg">
              F
            </div>
            <div>
              <p className="font-bold text-slate-800">Francisco</p>
              <p className="text-sm text-slate-500">
                Hamachi Nikkei Sushi, Chillán
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}