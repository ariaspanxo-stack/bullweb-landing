import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    emoji:  '👤',
    title:  'Crea tu cuenta',
    desc:   'Registro en 2 minutos. Sin tarjeta de crédito. Sin instalación.',
    time:   '2 minutos',
    color:  'text-orange-500',
    border: 'border-orange-500',
    bg:     'bg-orange-500',
  },
  {
    number: '02',
    emoji:  '⚙️',
    title:  'Configura tu local',
    desc:   'Agrega tu menú, mesas y equipo. Te ayudamos en el onboarding.',
    time:   '10 minutos',
    color:  'text-blue-500',
    border: 'border-blue-600',
    bg:     'bg-blue-600',
  },
  {
    number: '03',
    emoji:  '🚀',
    title:  'Empieza a vender',
    desc:   'Sistema listo al instante. POS, cocina y delivery desde el día 1.',
    time:   'Inmediato',
    color:  'text-green-500',
    border: 'border-green-500',
    bg:     'bg-green-500',
  },
];

export default function HowItWorks() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-sm font-semibold rounded-full border border-green-100 mb-4">
            Onboarding
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
            Empieza a vender{' '}
            <span className="text-orange-500">hoy mismo</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            Tres pasos simples para tener tu restaurante operando con BullWeb.
          </p>
        </motion.div>

        {/* Pasos */}
        <div ref={ref} className="relative">

          {/* Línea conectora desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.666%+40px)] right-[calc(16.666%+40px)] h-px bg-gradient-to-r from-orange-200 via-blue-200 to-green-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Número grande decorativo */}
                <div className="relative mb-6">
                  <span className={`absolute -top-8 -left-4 text-7xl font-black ${step.color} opacity-10 select-none leading-none`}>
                    {step.number}
                  </span>
                  <div className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-3xl ${step.bg} shadow-sm`}>
                    <span className="text-4xl leading-none">{step.emoji}</span>
                  </div>
                </div>

                {/* Badge número */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 ${step.bg} text-white`}>
                  <span>Paso {step.number}</span>
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">{step.desc}</p>
                <span className="text-xs text-slate-400 mt-2 block">⏱ {step.time}</span>

                {/* Flecha mobile entre pasos */}
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center mt-8 lg:hidden">
                    <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA bajo los pasos */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://app.bullwebchile.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5"
          >
            Comenzar ahora — es gratis
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-sm text-slate-400 mt-3">7 días gratis · Sin tarjeta · Sin compromiso</p>
        </motion.div>
      </div>
    </section>
  );
}
