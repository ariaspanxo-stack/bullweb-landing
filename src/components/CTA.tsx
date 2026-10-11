import { motion } from 'framer-motion';
import {
  ArrowRight, MessageCircle, ShieldCheck,
  CalendarX, Headset, DatabaseBackup, Lock, Users, ClipboardCheck,
} from 'lucide-react';
import { REGISTER_URL, track } from '../lib/measurement';

// Franja de confianza: antes eran dos líneas de texto pequeño sobre naranja.
const TRUST = [
  { icon: <CalendarX className="w-5 h-5" />,      text: 'Sin contratos: cancela cuando quieras' },
  { icon: <Headset className="w-5 h-5" />,        text: 'Soporte en vivo y soporte remoto' },
  { icon: <DatabaseBackup className="w-5 h-5" />, text: 'Backups diarios automáticos' },
  { icon: <Lock className="w-5 h-5" />,           text: 'Datos aislados por restaurante' },
  { icon: <Users className="w-5 h-5" />,          text: 'Roles y permisos granulares' },
  { icon: <ClipboardCheck className="w-5 h-5" />, text: 'Auditoría de acciones críticas' },
];

export default function CTA() {
  return (
    <>
      {/* Franja de confianza */}
      <section className="bg-brand-bg py-12" aria-label="Garantías y seguridad">
        <ul className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {TRUST.map(t => (
            <li key={t.text} className="flex items-center gap-3 text-slate-200 text-base font-medium">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 shrink-0">
                {t.icon}
              </span>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </section>

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
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-bg/10 text-brand-bg text-sm font-semibold rounded-full border border-brand-bg/30 mb-6">
              <ShieldCheck className="w-4 h-4" />
              7 días gratis · Sin tarjeta
            </span>

            {/* Título */}
            <h2 className="text-3xl sm:text-5xl font-black text-brand-bg leading-tight mb-5">
              ¿Listo para transformar<br className="hidden sm:block" /> tu restaurante?
            </h2>

            {/* Subtítulo */}
            <p className="text-brand-bg text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Comienza gratis, sin compromiso.
            </p>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { location: 'cta-final' })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-bg text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Probar 7 días gratis
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              {/* #191 — WhatsApp contextual del CTA final */}
              <motion.a
                href="https://wa.me/56937458347?text=Hola%2C%20quiero%20agendar%20una%20demo"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { location: 'cta-final' })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/25 hover:bg-white/40 text-brand-bg font-bold rounded-2xl border border-brand-bg/40 transition-all text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
