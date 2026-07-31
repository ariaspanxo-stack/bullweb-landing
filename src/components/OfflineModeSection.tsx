import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Wifi, WifiOff, RefreshCw, ArrowRight } from 'lucide-react';

const STATES = [
  {
    icon: Wifi,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    dot: 'bg-green-500',
    label: 'Venta normal',
    desc: 'Internet estable. El POS toma pedidos y emite boletas al SII en tiempo real.',
  },
  {
    icon: WifiOff,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    dot: 'bg-orange-500',
    label: 'Sin señal',
    desc: 'Se cayó la conexión. El mozo sigue cobrando en Modo Offline sin interrupciones.',
  },
  {
    icon: RefreshCw,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    dot: 'bg-blue-500',
    label: 'Reconecta',
    desc: 'Vuelve el internet y todo se sincroniza solo: ventas, boletas y stock.',
  },
];

const LINKS = {
  register: 'https://app.bullwebchile.com/register',
};

export default function OfflineModeSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="modo-offline" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-semibold rounded-full border border-orange-500/20 mb-4">
            <WifiOff className="w-4 h-4" />
            Modo Offline PWA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mx-auto mb-4">
            Se cae el internet.{' '}
            <span className="text-orange-400">Tú sigues vendiendo.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            En Chile el internet de los locales falla, y cada caída es plata que no entra. BullWeb
            es el POS que no se frena: el mozo sigue tomando pedidos y cobrando aunque no haya señal.
            Cuando la conexión vuelve, todo se sincroniza solo. Sin perder una venta, sin perder una
            boleta.
          </p>
        </motion.div>

        {/* 3 estados visuales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STATES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className={`relative bg-white/5 rounded-3xl p-8 border ${s.border} text-center backdrop-blur-sm`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Icono */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${s.bg} ${s.color} mb-5`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Indicador */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dot} ${i === 1 ? 'animate-pulse' : ''}`} />
                  <span className={`text-xs font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>

                {/* Flecha conectora */}
                {i < STATES.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 -translate-y-1/2 text-slate-600 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Cierre + CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xl font-bold text-white mb-6">
            Ningún competidor a este precio te da esto.
          </p>
          <a
            href={LINKS.register}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 text-base"
          >
            Pruébalo gratis 7 días — sin tarjeta
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}