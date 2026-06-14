import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = {
  register: 'https://app.bullwebchile.com/register',
  login:    'https://app.bullwebchile.com/login',
};

const NAV_ITEMS = [
  { label: 'Funciones', href: '#features' },
  { label: 'Módulos',   href: '#modules'  },
  { label: 'Precios',   href: '#pricing'  },
  { label: 'FAQ',      href: '#faq'      },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0F172A]/95 backdrop-blur-sm shadow-lg shadow-black/20 border-b border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <img
                src="/logo-bullweb.png"
                alt="BullWeb Chile"
                className="h-9 w-auto"
              />
            </a>

            {/* Centro — Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Derecha — Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={LINKS.login}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Iniciar sesión
              </a>
              <a
                href={LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
              >
                Prueba gratis
                <span className="text-orange-200">→</span>
              </a>
            </div>

            {/* Hamburger — Mobile */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-white/80 hover:text-white"
              aria-label="Menú"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0F172A] flex flex-col pt-20 px-6"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <nav className="flex flex-col gap-2 mt-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className="text-left px-4 py-4 text-lg font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={LINKS.login}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center text-white/70 font-medium border border-white/10 rounded-2xl hover:bg-white/5 transition-colors"
              >
                Iniciar sesión
              </a>
              <a
                href={LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-orange-500/30"
              >
                Prueba gratis →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
