import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';

export default function Terminos() {
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
          <h1 className="text-4xl font-black text-white mb-3">Términos de uso</h1>
          <p className="text-slate-400 text-sm">Última actualización: enero 2026</p>
        </div>

        <div className="prose-legal">

          <Section title="1. Aceptación de los términos">
            Al acceder o utilizar BullWeb Chile (en adelante, "el Servicio"), usted acepta quedar vinculado por estos Términos de Uso. Si no está de acuerdo con alguno de estos términos, no utilice el Servicio.
          </Section>

          <Section title="2. Descripción del Servicio">
            BullWeb Chile es un sistema de punto de venta (POS) en la nube diseñado para restaurantes y comercios chilenos. El Servicio incluye gestión de mesas, pedidos, cocina (KDS), caja, delivery y reportes, accesible vía navegador web y dispositivos móviles.
          </Section>

          <Section title="3. Registro y cuenta">
            <ul>
              <li>Debe proporcionar información verídica, completa y actualizada al crear su cuenta.</li>
              <li>Es responsable de mantener la confidencialidad de sus credenciales.</li>
              <li>Debe notificarnos de inmediato ante cualquier uso no autorizado de su cuenta.</li>
              <li>Una cuenta por negocio. El acceso multi-usuario está sujeto al plan contratado.</li>
            </ul>
          </Section>

          <Section title="4. Planes y pagos">
            <ul>
              <li>El Servicio se ofrece bajo modalidad de suscripción mensual o anual.</li>
              <li>Los precios están expresados en Pesos Chilenos (CLP) e incluyen IVA cuando corresponda.</li>
              <li>El período de prueba de 7 días es sin cargo y no requiere tarjeta de crédito.</li>
              <li>Pasado el período de prueba, se requiere suscripción activa para continuar usando el Servicio.</li>
              <li>No se realizan reembolsos por períodos parciales de uso.</li>
            </ul>
          </Section>

          <Section title="5. Uso aceptable">
            Usted se compromete a no:
            <ul>
              <li>Utilizar el Servicio para fines ilegales o no autorizados.</li>
              <li>Intentar acceder a cuentas de otros usuarios.</li>
              <li>Realizar ingeniería inversa, descompilar o desensamblar el software.</li>
              <li>Transmitir virus, malware o cualquier código dañino.</li>
              <li>Sobrecargar o interferir con la infraestructura del Servicio.</li>
            </ul>
          </Section>

          <Section title="6. Propiedad intelectual">
            Todo el contenido, diseño, software y materiales del Servicio son propiedad de BullWeb Chile o sus licenciantes, protegidos por las leyes de propiedad intelectual de Chile. No se transfiere ningún derecho de propiedad al usuario.
          </Section>

          <Section title="7. Datos y respaldo">
            <ul>
              <li>Sus datos de negocio son suyos. BullWeb Chile actúa como procesador de datos.</li>
              <li>Realizamos respaldos periódicos, pero recomendamos exportar sus datos regularmente.</li>
              <li>Ante cancelación de la cuenta, sus datos estarán disponibles para exportación durante 30 días.</li>
            </ul>
          </Section>

          <Section title="8. Disponibilidad del Servicio">
            Nos esforzamos por mantener una disponibilidad del 99.9%. Sin embargo, no garantizamos que el Servicio sea ininterrumpido o libre de errores. Planificamos mantenimientos en horarios de baja demanda y notificamos con anticipación.
          </Section>

          <Section title="9. Limitación de responsabilidad">
            En la máxima medida permitida por la ley chilena, BullWeb Chile no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o imposibilidad de uso del Servicio.
          </Section>

          <Section title="10. Modificaciones">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos cambios significativos por correo electrónico o mediante aviso en el panel de administración. El uso continuado del Servicio tras los cambios implica aceptación.
          </Section>

          <Section title="11. Ley aplicable">
            Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será sometida a los tribunales ordinarios de justicia de Santiago de Chile.
          </Section>

          <Section title="12. Contacto">
            Para consultas sobre estos términos: <a href="mailto:contacto@bullwebchile.com" className="text-orange-400 hover:text-orange-300">contacto@bullwebchile.com</a>
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
