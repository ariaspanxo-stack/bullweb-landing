import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Star, Cpu } from 'lucide-react';

const LINKS = {
  register: 'https://app.bullwebchile.com/register',
};

const METRICS = [
  { value: '$29.000', label: 'Precio fijo/mes',  hint: 'Todo incluido. Sin costos ocultos ni módulos extra.' },
  { value: '⚡',      label: 'POS ultrarrápido',  hint: 'App instalable que carga al instante.' },
  { value: '✓',       label: 'Boletas DTE integradas' },
];

const BADGES = [
  { emoji: '⚡', text: 'POS ultrarrápido, siempre disponible'      },
  { emoji: '🧾', text: 'Boletas DTE integradas al SII'             },
  { emoji: '🔒', text: 'Precio fijo $29.000 — sin letra chica'    },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const [badgeIdx, setBadgeIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIdx(i => (i + 1) % BADGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">

      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E2A4A] to-[#0F172A]" />

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob naranja difuso */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Columna izquierda — texto */}
          <div className="text-center lg:text-left">

            {/* Badge rotativo */}
            <motion.div
              className="inline-flex h-9 items-center px-4 bg-orange-500/10 border border-orange-500/20 rounded-full mb-6 overflow-hidden"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={badgeIdx}
                  className="flex items-center gap-2 text-orange-400 text-sm font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <span>{BADGES[badgeIdx].emoji}</span>
                  <span>{BADGES[badgeIdx].text}</span>
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* H1 */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6"
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Todo tu restaurante en un solo plan por{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                $29.000
              </span>
              . Sin letra chica.
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Punto de venta, cocina, inventario, fidelización, asistencia y boletas al SII — todo
              incluido en un precio fijo. Olvida los cobros por módulo de otros POS.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12"
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <a
                href={LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 text-base"
              >
                Pruébalo gratis 7 días — sin tarjeta
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 text-base"
              >
                Agenda una demo
              </a>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              className="text-sm text-white/40 mb-8 text-center lg:text-left"
              custom={0.35}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Sin tarjeta de crédito. Sin instalar nada. Listo en minutos.
            </motion.p>

            {/* Métricas */}
            <motion.div
              className="flex gap-8 justify-center lg:justify-start"
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {METRICS.map((m, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="text-2xl font-black text-white">{m.value}</p>
                  <p className="text-xs text-white/40 font-medium mt-0.5">{m.label}</p>
                  {m.hint && (
                    <p className="text-[10px] text-white/30 font-normal mt-1 max-w-[140px] leading-tight">
                      {m.hint}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Columna derecha — Mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">

              {/* Barra del browser */}
              <div className="bg-[#1E2A4A] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4 bg-white/5 rounded-lg px-3 py-1 text-white/30 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  app.bullwebchile.com
                </div>
              </div>

              {/* Contenido del mockup */}
              <div className="bg-[#0F172A] p-4 min-h-[380px]">

                {/* Header POS */}
                <div className="flex items-center justify-between mb-4 bg-white/5 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">BullWeb POS</p>
                      <p className="text-white/30 text-[10px]">Turno abierto · $10.000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[10px] font-medium">En línea</span>
                  </div>
                </div>

                {/* Grid de mesas */}
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider mb-2 px-1">Salón principal</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { n: 1,  status: 'libre'    },
                    { n: 2,  status: 'ocupada'  },
                    { n: 3,  status: 'ocupada'  },
                    { n: 4,  status: 'libre'    },
                    { n: 5,  status: 'cuenta'   },
                    { n: 6,  status: 'ocupada'  },
                    { n: 7,  status: 'libre'    },
                    { n: 8,  status: 'ocupada'  },
                  ].map(t => (
                    <div
                      key={t.n}
                      className={`rounded-xl p-2.5 text-center border transition-colors ${
                        t.status === 'libre'   ? 'bg-white/5 border-white/10' :
                        t.status === 'cuenta' ? 'bg-amber-500/20 border-amber-500/40' :
                                                 'bg-orange-500/20 border-orange-500/30'
                      }`}
                    >
                      <p className={`text-sm font-bold ${
                        t.status === 'libre'  ? 'text-white/30' :
                        t.status === 'cuenta' ? 'text-amber-400' :
                                                'text-orange-400'
                      }`}>
                        {t.n}
                      </p>
                      <p className={`text-[8px] font-medium leading-tight ${
                        t.status === 'libre'  ? 'text-white/20' :
                        t.status === 'cuenta' ? 'text-amber-500/70' :
                                                'text-orange-300/70'
                      }`}>
                        {t.status === 'libre' ? 'Libre' : t.status === 'cuenta' ? 'Cuenta' : 'Ocupada'}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Stats rápidas */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Ventas hoy',  value: '$487.250', color: 'text-green-400' },
                    { label: 'Boletas SII',  value: '$0 c/u',   color: 'text-orange-400' },
                    { label: 'En cocina',    value: '4',        color: 'text-blue-400'   },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-xl px-3 py-2 text-center border border-white/5">
                      <p className={`text-base font-black ${s.color}`}>{s.value}</p>
                      <p className="text-white/30 text-[9px]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Badges flotantes */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <div>
                <p className="text-xs font-black text-gray-800">4.9 / 5</p>
                <p className="text-[10px] text-gray-400">En producción real</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <CheckCircle className="w-4 h-4 text-green-500 fill-green-500" />
              <div>
                <p className="text-xs font-black text-gray-800">+12 órdenes</p>
                <p className="text-[10px] text-gray-400">esta hora</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg px-4 py-2.5 text-xs font-bold text-white flex items-center gap-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            >
              <CheckCircle className="w-4 h-4" />
              <div>
                <p>Boleta Emitida al SII</p>
                <p className="text-green-100 text-[10px] font-medium">Costo: $0</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 64V40C120 10 240 0 360 0s240 20 360 40 240 30 360 10 240-40 360-40v54H0z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
