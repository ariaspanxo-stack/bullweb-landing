import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';
import Features           from './components/Features';          // Pain Points
import OfflineModeSection from './components/OfflineModeSection'; // Modo Offline destacado
import Modules            from './components/Modules';            // 4 pilares
import TestimonioDestacado from './components/TestimonioDestacado';
import Pricing            from './components/Pricing';
import FAQ                from './components/FAQ';
import CTA                from './components/CTA';
import Footer             from './components/Footer';
import WhatsAppButton     from './components/WhatsAppButton';
import Terminos     from './pages/Terminos';
import Privacidad   from './pages/Privacidad';
import Cookies      from './pages/Cookies';

function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />                {/* 1º CTA dentro del Hero */}
        <TestimonioDestacado /> {/* Social Proof */}
        <Features />            {/* Pain Points */}
        <Modules />             {/* 4 pilares */}
        <OfflineModeSection />  {/* Modo Offline destacado + 2º CTA */}
        <Pricing />
        <FAQ />
        <CTA />                 {/* 3º CTA tras la FAQ */}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('render-event'));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/terminos"   element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies"    element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  );
}