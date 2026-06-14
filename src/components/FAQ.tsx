import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: '¿Necesito instalar algo en mi computador?',
    a: 'No. BullWeb es 100% en la nube. Solo necesitas un navegador moderno (Chrome, Edge, Firefox) y conexión a internet. No hay software que instalar ni actualizaciones manuales.',
  },
  {
    q: '¿Cuánto tiempo tarda la implementación?',
    a: 'La mayoría de nuestros clientes están operando el mismo día que se registran. El setup está incluido en tu plan. Te ayudamos a configurar todo el primer día por WhatsApp.',
  },
  {
    q: '¿Funciona sin internet? ¿Modo offline?',
    a: 'BullWeb requiere conexión activa para sincronización en tiempo real. Sin embargo, contamos con caché local que permite continuar tomando pedidos ante cortes breves. Recomendamos siempre tener un plan de datos móvil como respaldo.',
  },
  {
    q: '¿Emite boletas y facturas electrónicas (DTE)?',
    a: 'Sí. BullWeb está integrado con el SII de Chile para emisión de boletas y facturas electrónicas. Disponible en todos los planes. Solo debes tener tu empresa inscrita como contribuyente electrónico.',
  },
  {
    q: '¿Puedo gestionar múltiples sucursales?',
    a: 'Sí, BullWeb funciona para múltiples sucursales. Cada local mantiene su operación independiente con reportes consolidados en un panel central. Contáctanos por WhatsApp para coordinar el setup.',
  },
  {
    q: '¿Qué tipo de soporte ofrecen?',
    a: 'Todos los clientes tienen soporte directo por WhatsApp con Francisco, el fundador. Sin bots, sin tickets. Tenemos equipo en Chile atendiendo en español.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí, sin permanencia ni penalizaciones. Puedes cancelar tu suscripción en cualquier momento directamente desde el panel de administración. No hay compromisos de permanencia.',
  },
  {
    q: '¿Tiene integración con Uber Eats o Rappi?',
    a: 'La integración directa con marketplaces como Uber Eats y Rappi está en nuestro roadmap para 2026. Hoy puedes gestionar tu propio delivery integrado dentro de BullWeb sin comisiones de plataforma.',
  },
];

function FaqItem({ faq, idx }: { faq: typeof FAQS[0]; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border border-slate-100 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className={`font-semibold text-[0.9375rem] transition-colors ${open ? 'text-orange-500' : 'text-slate-800'}`}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-orange-500' : 'text-slate-400'}`} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full border border-slate-200 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
            Preguntas{' '}
            <span className="text-orange-500">frecuentes</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            ¿Tienes más dudas? Escríbenos por WhatsApp.
          </p>
        </motion.div>

        {/* Acordeón */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} idx={i} />
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            ¿No encontraste tu respuesta?{' '}
            <a
              href="https://wa.me/56937458347?text=Hola%2C%20quiero%20información%20sobre%20BullWeb%20Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Chatea con nosotros →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
