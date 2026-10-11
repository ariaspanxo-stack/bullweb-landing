import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import { BOLETAS_ACTIVACION } from '../lib/plans';
import { scrollBehavior } from '../lib/motion';

const LINKS = {
  producto:  [
    { label: 'Funciones', href: '#features' },
    { label: 'Módulos',   href: '#modules' },
    { label: 'Precios',   href: '#pricing' },
    { label: 'FAQ',       href: '#faq' },
  ],
  legal:    [
    { label: 'Términos de uso',     href: '/terminos'   },
    { label: 'Privacidad',          href: '/privacidad' },
    { label: 'Política de cookies', href: '/cookies'    },
  ],
};

const SOCIAL = [
  { icon: <Instagram className="w-4 h-4" />,     href: 'https://instagram.com/bullweb.chile', label: 'Instagram' },
  { icon: <MessageCircle className="w-4 h-4" />, href: 'https://wa.me/56937458347',             label: 'WhatsApp'  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white p-0.5">
                <img
                  src="/logo-bullweb-transparente.webp"
                  alt="BullWeb Chile"
                  width="160"
                  height="160"
                  loading="lazy"
                  className="w-full h-full"
                />
              </span>
              <span className="text-white font-black text-lg tracking-tight" aria-hidden="true">BullWeb</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              El sistema de punto de venta en la nube diseñado para restaurantes chilenos. Rápido, simple y completo.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Producto */}
          <div>
            <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Producto</h3>
            <ul className="space-y-3">
              {LINKS.producto.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: scrollBehavior() });
                    }}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>



          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {LINKS.legal.map(l => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Badge SII */}
            <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 text-xs font-semibold rounded-lg border border-green-500/20">
              ✓ Boletas SII incluidas en Full
            </div>
            <p className="mt-2 text-slate-400 text-xs leading-relaxed max-w-xs">
              {BOLETAS_ACTIVACION}
            </p>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="my-10 border-t border-white/[0.06]" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} BullWeb Chile · Hecho con ❤️ en Chile 🇨🇱</p>
          <a href="mailto:f.arias@bullwebchile.com" className="hover:text-white transition-colors">f.arias@bullwebchile.com</a>
        </div>
      </div>
    </footer>
  );
}
