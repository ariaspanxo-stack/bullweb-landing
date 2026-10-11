import { ArrowRight, CalendarCheck, FileText, Headset, KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { HERO_PRICE_TEXT } from '../lib/plans';

import { REGISTER_URL, track } from '../lib/measurement';

const LINKS = {
  register: REGISTER_URL, // #228 — UTM estándar via helper
  // #191 — WhatsApp contextual por sección
  demo:     'https://wa.me/56937458347?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20BullWeb',
};

// Insignia fija y corta (sin rotación): cabe en una línea a 375px.
const BADGE = 'Hecho en Chile para restaurantes';

const TRUST = [
  { icon: CalendarCheck, text: '7 días gratis' },
  { icon: ShieldCheck,   text: 'Sin tarjeta' },
  { icon: Headset,       text: 'Soporte en vivo y remoto' },
];

// Insignias junto a las capturas: máximo 2, en el flujo (no se cortan) y sin bucle.
const CHIPS = [
  { icon: FileText, title: 'Boletas SII incluidas en Full', sub: 'Se activa con tu certificado y tus folios' },
  { icon: KeyRound, title: 'App Mesero con PIN por empleado', sub: null },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E2A4A]">

      {/* Brillo sutil de fondo */}
      <div
        className="absolute -top-40 left-1/4 w-[44rem] h-[32rem] rounded-full bg-orange-500/[0.07] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">

          {/* Columna izquierda — texto */}
          <div className="text-center lg:text-left">

            {/* Insignia fija */}
            <p className="inline-flex items-center px-3.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full mb-5 text-orange-300 text-sm font-medium">
              {BADGE}
            </p>

            {/* H1 (#228 — frase del Comandante). Sin animación: es texto crítico de la primera vista. */}
            <h1 className="text-[clamp(2.25rem,0.9rem+2.35vw,2.9rem)] font-extrabold text-white leading-[1.08] tracking-[-0.03em] [text-wrap:balance] mb-5">
              El sistema completo para tu restaurante, con tu{' '}
              <span className="text-orange-500 underline decoration-orange-500/40 decoration-[3px] underline-offset-[0.18em]">
                tienda online incluida
              </span>
            </h1>

            {/* Subtítulo (#228 — único precio visible del Hero, desde las constantes) */}
            <p className="text-lg text-white/75 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              Vende en tu local, recibe pedidos por carta QR y toma pedidos online en el mismo
              sistema. {HERO_PRICE_TEXT}
            </p>

            {/* CTAs: mismo alto, ancho completo en celular */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <a
                href={LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('cta_click', { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 h-14 px-7 w-full sm:w-auto bg-orange-500 hover:bg-orange-400 text-brand-bg font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 text-base"
              >
                Probar 7 días gratis
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={LINKS.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 h-14 px-7 w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-bold rounded-2xl transition-all hover:-translate-y-0.5 text-base"
              >
                Agenda una demo
              </a>
            </div>

            {/* Línea de confianza */}
            <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-white/80">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha — capturas reales */}
          <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">

            {/* Brillo radial naranja detrás */}
            <div
              className="absolute -inset-x-8 -inset-y-10 bg-[radial-gradient(closest-side,rgba(249,115,22,0.28),transparent)] blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Navegador con el mapa de mesas */}
            <div className="relative motion-safe:animate-hero-in">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0B1120] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.75)] lg:[transform:perspective(1600px)_rotateY(-5deg)_rotateX(2deg)] lg:origin-left">
                <div className="flex items-center gap-3 px-3.5 h-9 bg-[#1B2540] border-b border-white/10">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1.5 h-6 max-w-xs mx-auto rounded-md bg-white/10 text-white/70 text-xs">
                    <Lock className="w-3 h-3" aria-hidden="true" />
                    app.bullwebchile.com
                  </div>
                  <div className="w-10" aria-hidden="true" />
                </div>
                <img
                  src="/images/mesas-1600.webp"
                  srcSet="/images/mesas-800.webp 800w, /images/mesas-1600.webp 1600w"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  width={1600}
                  height={570}
                  alt="Mapa de mesas del sistema POS para restaurantes BullWeb"
                  decoding="async"
                  {...{ fetchpriority: 'high' }}
                  className="block w-full h-auto"
                />
              </div>
            </div>

            {/* Celular con la carta QR (superpuesto abajo a la izquierda) + insignias */}
            <div className="relative z-10 mt-3 sm:mt-4 flex items-start lg:items-end gap-3 sm:gap-5 pl-3 sm:pl-6">
              <div
                className="shrink-0 -mt-14 sm:-mt-20 w-[6.5rem] sm:w-36 xl:w-40 rounded-[1.4rem] sm:rounded-[1.75rem] border-[5px] border-[#0B1120] bg-[#0B1120] ring-1 ring-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden motion-safe:animate-hero-in"
                style={{ animationDelay: '0.15s' }}
              >
                <img
                  src="/images/carta-qr-480.webp"
                  width={480}
                  height={827}
                  alt="Carta digital QR de un restaurante vista en un celular"
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto rounded-[1rem] sm:rounded-[1.35rem]"
                />
              </div>

              <ul className="flex-1 min-w-0 flex flex-col gap-2.5 pb-1 text-left">
                {CHIPS.map(({ icon: Icon, title, sub }) => (
                  <li
                    key={title}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-[#0F172A]/80 backdrop-blur px-3.5 py-2.5 shadow-lg shadow-black/30"
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500/15 text-orange-400 shrink-0">
                      <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-white text-sm font-semibold leading-snug">{title}</span>
                      {sub && <span className="block text-slate-300 text-[13px] leading-snug mt-0.5">{sub}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
