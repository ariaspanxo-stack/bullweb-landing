import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Cpu } from 'lucide-react';
import { HERO_PRICE_TEXT } from '../lib/plans';

import { REGISTER_URL, track } from '../lib/measurement';

const LINKS = {
  register: REGISTER_URL, // #228 — UTM estándar via helper
  // #191 — WhatsApp contextual por sección
  demo:     'https://wa.me/56937458347?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20BullWeb',
};

// Insignia fija y corta (sin rotación): cabe en una línea a 375px.
const BADGE = 'Hecho en Chile para restaurantes';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
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

            {/* Insignia fija */}
            <motion.p
              className="inline-flex items-center px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6 text-orange-300 text-sm font-medium"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {BADGE}
            </motion.p>

            {/* H1 (#228 — frase del Comandante). Sin animación: es el LCP. */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
              El sistema completo para tu restaurante, con tu tienda online incluida
            </h1>

            {/* Subtítulo (#228 — precio con IVA incluido, desde las constantes) */}
            <motion.p
              className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Vende en tu local, recibe pedidos por carta QR y toma pedidos online en el mismo
              sistema. {HERO_PRICE_TEXT}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5"
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <a
                href={LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-brand-bg font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 text-base"
              >
                Probar 7 días gratis
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={LINKS.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 text-base"
              >
                Agenda una demo
              </a>
            </motion.div>

            {/* Línea de confianza */}
            <motion.p
              className="text-sm text-white/60 text-center lg:text-left"
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Sin tarjeta · Sin instalar nada · Listo en minutos
            </motion.p>
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

                {/* Header punto de venta */}
                <div className="flex items-center justify-between mb-4 bg-white/5 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">BullWeb punto de venta</p>
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
                    { label: 'Boletas SII',  value: 'En Full', color: 'text-orange-400' },
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
                <p>Boletas SII incluidas en Full</p>
                <p className="text-green-100 text-[10px] font-medium">Se activa con tu certificado y tus folios</p>
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
