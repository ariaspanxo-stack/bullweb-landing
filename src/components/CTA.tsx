import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full border border-white/30 mb-6">
            <ShieldCheck className="w-4 h-4" />
            7 días gratis · Sin tarjeta
          </span>

          {/* Título */}
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
            ¿Listo para transformar<br className="hidden sm:block" /> tu restaurante?
          </h2>

          {/* Subtítulo */}
          <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Más de 30 restaurantes chilenos ya gestionan su negocio con BullWeb.
            Comienza gratis, sin compromiso.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://app.bullwebchile.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Comenzar gratis ahora
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="https://wa.me/56937458347?text=Hola%2C%20quiero%20información%20sobre%20BullWeb%20Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl border border-white/30 transition-all text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              Hablar por WhatsApp
            </motion.a>
          </div>

          {/* Trust line */}
          <p className="text-orange-200 text-sm mt-8">
            Sin tarjeta de crédito · Cancela cuando quieras · Soporte local en español
          </p>
        </motion.div>
      </div>
    </section>
  );
}
