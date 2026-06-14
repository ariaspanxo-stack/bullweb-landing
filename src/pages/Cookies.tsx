import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';

export default function Cookies() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen font-sans" style={{ background: '#0F172A' }}>
      {/* Nav mínimo */}
      <nav className="sticky top-0 z-50 border-b border-white/5" style={{ background: '#0F172A' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-white font-black text-lg leading-none">BULLWEB</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">Legal</span>
          <h1 className="text-4xl font-black text-white mb-3">Política de Cookies</h1>
          <p className="text-slate-400 text-sm">Última actualización: enero 2026</p>
        </div>

        <div className="prose-legal">

          <Section title="¿Qué son las cookies?">
            Las cookies son pequeños archivos de texto que los sitios web guardan en su dispositivo cuando los visita. Se utilizan ampliamente para hacer que los sitios funcionen correctamente, de forma más eficiente, y para proporcionar información a los propietarios del sitio.
          </Section>

          <Section title="¿Qué cookies usamos?">
            <CookieTable cookies={[
              {
                nombre: 'auth-storage',
                tipo: 'Esencial',
                duracion: 'Sesión / Persistente',
                descripcion: 'Mantiene la sesión iniciada del usuario en el panel de administración. Sin esta cookie el sistema POS no puede funcionar.',
              },
              {
                nombre: 'theme-preference',
                tipo: 'Funcional',
                duracion: '1 año',
                descripcion: 'Recuerda la preferencia de tema (claro/oscuro) del usuario.',
              },
              {
                nombre: '_ga, _ga_*',
                tipo: 'Analítica',
                duracion: '2 años',
                descripcion: 'Google Analytics. Recopila información anónima sobre cómo los visitantes usan el sitio (páginas vistas, tiempo de visita, dispositivo).',
              },
              {
                nombre: 'XSRF-TOKEN',
                tipo: 'Seguridad',
                duracion: 'Sesión',
                descripcion: 'Protege contra ataques CSRF (Cross-Site Request Forgery). Esencial para la seguridad del Servicio.',
              },
            ]} />
          </Section>

          <Section title="Tipos de cookies por finalidad">
            <div className="space-y-4">
              <CookieTipo
                color="green"
                tipo="Esenciales"
                descripcion="Necesarias para el funcionamiento básico del Servicio. No pueden desactivarse. Sin ellas, el sistema POS no puede operar correctamente."
              />
              <CookieTipo
                color="blue"
                tipo="Funcionales"
                descripcion="Permiten recordar sus preferencias para ofrecerle una experiencia personalizada. Su desactivación no impedirá el uso del Servicio pero puede reducir la comodidad."
              />
              <CookieTipo
                color="yellow"
                tipo="Analíticas"
                descripcion="Nos ayudan a entender cómo se usa el Servicio para mejorarlo. Los datos son anónimos y agregados. Puede desactivarlas sin afectar la funcionalidad."
              />
              <CookieTipo
                color="red"
                tipo="Marketing"
                descripcion="Actualmente NO utilizamos cookies de marketing ni publicidad de terceros en nuestro servicio."
              />
            </div>
          </Section>

          <Section title="Cookies de terceros">
            Algunos servicios integrados en nuestra plataforma pueden establecer sus propias cookies:
            <ul>
              <li><strong className="text-white">Google Analytics:</strong> análisis de uso del sitio web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">Política de privacidad de Google</a></li>
              <li><strong className="text-white">Google Fonts:</strong> tipografías web. No almacena cookies de identificación personal.</li>
            </ul>
          </Section>

          <Section title="Cómo controlar las cookies">
            <strong className="text-white">Desde su navegador:</strong>
            <ul>
              <li><strong className="text-white">Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
              <li><strong className="text-white">Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
              <li><strong className="text-white">Safari:</strong> Preferencias → Privacidad → Cookies</li>
              <li><strong className="text-white">Edge:</strong> Configuración → Privacidad → Cookies</li>
            </ul>
            <p className="mt-2">Tenga en cuenta que bloquear todas las cookies puede impedir el correcto funcionamiento del sistema POS.</p>
          </Section>

          <Section title="Opt-out de Google Analytics">
            Para desactivar el seguimiento de Google Analytics puede instalar el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300">complemento de inhabilitación de Google Analytics</a> disponible para los principales navegadores.
          </Section>

          <Section title="Actualizaciones de esta política">
            Podemos actualizar esta política para reflejar cambios en las cookies que utilizamos. Le notificaremos de cualquier cambio significativo mediante un aviso en el sitio web.
          </Section>

          <Section title="Contacto">
            Para consultas sobre cookies y privacidad: <a href="mailto:contacto@bullwebchile.com" className="text-orange-400 hover:text-orange-300">contacto@bullwebchile.com</a>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
      <div className="text-slate-300 leading-relaxed text-sm space-y-2">{children}</div>
    </section>
  );
}

function CookieTable({ cookies }: { cookies: { nombre: string; tipo: string; duracion: string; descripcion: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 mt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <th className="text-left px-4 py-3 text-slate-400 font-semibold">Cookie</th>
            <th className="text-left px-4 py-3 text-slate-400 font-semibold">Tipo</th>
            <th className="text-left px-4 py-3 text-slate-400 font-semibold">Duración</th>
            <th className="text-left px-4 py-3 text-slate-400 font-semibold">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="px-4 py-3 font-mono text-orange-400 text-xs">{c.nombre}</td>
              <td className="px-4 py-3 text-slate-300">{c.tipo}</td>
              <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{c.duracion}</td>
              <td className="px-4 py-3 text-slate-400">{c.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CookieTipo({ tipo, descripcion, color }: { tipo: string; descripcion: string; color: 'green' | 'blue' | 'yellow' | 'red' }) {
  const colors = {
    green:  'bg-green-500/10 border-green-500/20 text-green-400',
    blue:   'bg-blue-500/10 border-blue-500/20 text-blue-400',
    yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
    red:    'bg-red-500/10 border-red-500/20 text-red-400',
  };
  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <p className="font-bold text-sm mb-1">{tipo}</p>
      <p className="text-slate-400 text-sm">{descripcion}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 mt-16 py-8">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-xs">© 2026 BullWeb Chile · Hecho con ❤️ en Chile 🇨🇱</p>
        <div className="flex items-center gap-6">
          <Link to="/terminos" className="text-slate-500 hover:text-orange-400 text-xs transition-colors">Términos</Link>
          <Link to="/privacidad" className="text-slate-500 hover:text-orange-400 text-xs transition-colors">Privacidad</Link>
          <Link to="/cookies" className="text-slate-500 hover:text-orange-400 text-xs transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
