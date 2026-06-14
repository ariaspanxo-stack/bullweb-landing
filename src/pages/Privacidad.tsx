import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';

export default function Privacidad() {
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
          <h1 className="text-4xl font-black text-white mb-3">Política de Privacidad</h1>
          <p className="text-slate-400 text-sm">Última actualización: enero 2026</p>
        </div>

        <div className="prose-legal">

          <Section title="1. Responsable del tratamiento">
            BullWeb Chile SpA, con domicilio en Chile, es el responsable del tratamiento de sus datos personales recopilados a través de bullwebchile.com y el sistema POS asociado. Contacto: <a href="mailto:contacto@bullwebchile.com" className="text-orange-400 hover:text-orange-300">contacto@bullwebchile.com</a>
          </Section>

          <Section title="2. Datos que recopilamos">
            <strong className="text-white">Datos que usted nos proporciona:</strong>
            <ul>
              <li>Nombre, correo electrónico y teléfono al registrarse.</li>
              <li>Datos del negocio: nombre, RUT, dirección y giro.</li>
              <li>Información de pago procesada de forma segura por nuestros proveedores de pago.</li>
            </ul>
            <strong className="text-white">Datos generados automáticamente:</strong>
            <ul>
              <li>Dirección IP y datos del navegador/dispositivo.</li>
              <li>Registros de uso del sistema (logs de acceso, acciones realizadas).</li>
              <li>Datos de rendimiento y errores del sistema.</li>
            </ul>
            <strong className="text-white">Datos de su negocio:</strong>
            <ul>
              <li>Menú, precios, productos y categorías.</li>
              <li>Pedidos, transacciones y reportes de ventas.</li>
              <li>Datos de clientes que usted ingrese en el sistema.</li>
            </ul>
          </Section>

          <Section title="3. Finalidad del tratamiento">
            Utilizamos sus datos para:
            <ul>
              <li>Proveer, mantener y mejorar el Servicio.</li>
              <li>Gestionar su cuenta y suscripción.</li>
              <li>Enviar comunicaciones de soporte y actualizaciones del Servicio.</li>
              <li>Cumplir con obligaciones legales y tributarias.</li>
              <li>Prevenir fraudes y garantizar la seguridad del Servicio.</li>
            </ul>
            No vendemos ni compartimos sus datos con terceros para fines de marketing.
          </Section>

          <Section title="4. Base legal">
            El tratamiento se basa en: (a) la ejecución del contrato de servicio; (b) su consentimiento explícito cuando corresponda; y (c) el cumplimiento de obligaciones legales conforme a la Ley N° 19.628 sobre Protección de la Vida Privada de Chile.
          </Section>

          <Section title="5. Conservación de datos">
            Conservamos sus datos mientras dure la relación contractual y por el período adicional exigido por la legislación chilena aplicable (typically 6 años para documentos tributarios). Tras la cancelación de la cuenta, los datos se eliminan de forma segura después de 30 días.
          </Section>

          <Section title="6. Compartición de datos">
            Podemos compartir sus datos con:
            <ul>
              <li><strong className="text-white">Proveedores de infraestructura:</strong> servidores cloud para alojar el Servicio.</li>
              <li><strong className="text-white">Procesadores de pago:</strong> para gestionar suscripciones de forma segura.</li>
              <li><strong className="text-white">Herramientas de análisis:</strong> para mejorar la experiencia (datos anonimizados).</li>
              <li><strong className="text-white">Autoridades legales:</strong> cuando sea requerido por la ley chilena.</li>
            </ul>
            Todos nuestros proveedores están sujetos a acuerdos de confidencialidad.
          </Section>

          <Section title="7. Sus derechos">
            Conforme a la Ley N° 19.628, usted tiene derecho a:
            <ul>
              <li><strong className="text-white">Acceso:</strong> solicitar una copia de sus datos personales.</li>
              <li><strong className="text-white">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong className="text-white">Cancelación:</strong> solicitar la eliminación de sus datos.</li>
              <li><strong className="text-white">Oposición:</strong> oponerse al tratamiento en determinados casos.</li>
            </ul>
            Para ejercer estos derechos, contáctenos en <a href="mailto:contacto@bullwebchile.com" className="text-orange-400 hover:text-orange-300">contacto@bullwebchile.com</a>
          </Section>

          <Section title="8. Seguridad">
            Implementamos medidas técnicas y organizativas para proteger sus datos, incluyendo: cifrado TLS en tránsito, cifrado en reposo, autenticación segura, control de acceso por roles y auditorías periódicas de seguridad.
          </Section>

          <Section title="9. Cookies">
            Utilizamos cookies técnicas necesarias para el funcionamiento del Servicio y cookies analíticas para mejorar la experiencia. Consulte nuestra <Link to="/cookies" className="text-orange-400 hover:text-orange-300">Política de Cookies</Link> para más detalles.
          </Section>

          <Section title="10. Modificaciones">
            Podemos actualizar esta política periódicamente. Notificaremos cambios significativos por correo electrónico. La versión vigente estará siempre disponible en esta página.
          </Section>

          <Section title="11. Contacto">
            Para consultas sobre privacidad: <a href="mailto:contacto@bullwebchile.com" className="text-orange-400 hover:text-orange-300">contacto@bullwebchile.com</a>
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
