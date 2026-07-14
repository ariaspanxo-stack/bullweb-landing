import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Features     from './components/Features';
import HowItWorks   from './components/HowItWorks';
import Modules      from './components/Modules';
import SiiDirectoSection from './components/SiiDirectoSection';
import AhorroCalculator  from './components/AhorroCalculator';
import Pricing      from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ          from './components/FAQ';
import CTA          from './components/CTA';
import Footer        from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Terminos     from './pages/Terminos';
import Privacidad   from './pages/Privacidad';
import Cookies      from './pages/Cookies';

function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <AhorroCalculator />
        <Features />
        <HowItWorks />
        <Modules />
        <SiiDirectoSection />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
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
