import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const LINKS = {
  producto:  [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Módulos',         href: '#modules' },
    { label: 'Precios',         href: '#pricing' },
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
              <img
                src="/logo-bullweb.png"
                alt="BullWeb Chile"
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              El sistema POS en la nube diseñado para restaurantes chilenos. Rápido, simple y completo.
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
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Producto</h4>
            <ul className="space-y-3">
              {LINKS.producto.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
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
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Legal</h4>
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
              ✓ Compatible con Bsale · SII Chile
            </div>
          </div>
        </div>

        {/* Línea divisora */}
        <div className="my-10 border-t border-white/[0.06]" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} BullWeb Chile · Hecho con ❤️ en Chile 🇨🇱</p>
          <a href="mailto:f.arias@bullwebchile.com" className="hover:text-white transition-colors">f.arias@bullwebchile.com</a>
        </div>
      </div>
    </footer>
  );
}
