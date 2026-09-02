import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap, ChefHat, Heart, ShieldCheck,
  Smartphone, QrCode, Package, BarChart3,
  Gift, Ticket, FileText, Clock,
} from 'lucide-react';

interface Pillar {
  icon:    React.ReactNode;
  kicker:  string;
  title:   string;
  bullets: { icon: React.ReactNode; text: string }[];
  accent:  string;
}

const PILLARS: Pillar[] = [
  {
    kicker: 'Pilar 1',
    title:  'Vende más rápido',
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 mb-5">
        <Zap className="w-7 h-7" />
      </div>
    ),
    accent: 'orange',
    bullets: [
      { icon: <Zap className="w-4 h-4" />,          text: 'POS ultrarrápido, siempre disponible' },
      { icon: <Smartphone className="w-4 h-4" />,   text: 'App Mesero desde el celular — sin hardware extra' },
      { icon: <QrCode className="w-4 h-4" />,       text: 'Carta digital QR, pedidos directos a la caja' },
    ],
  },
  {
    kicker: 'Pilar 2',
    title:  'Ordena la cocina y el stock',
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 mb-5">
        <ChefHat className="w-7 h-7" />
      </div>
    ),
    accent: 'blue',
    bullets: [
      { icon: <ChefHat className="w-4 h-4" />,  text: 'Pantalla de Cocina (KDS) con despacho por estaciones y tiempos reales' },
      { icon: <Package className="w-4 h-4" />,  text: 'Inventario en tiempo real: descuenta stock al cobrar' },
      { icon: <Package className="w-4 h-4" />,  text: 'Control de recetas y food cost' },
    ],
  },
  {
    kicker: 'Pilar 3',
    title:  'Haz que vuelvan',
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-400 mb-5">
        <Heart className="w-7 h-7" />
      </div>
    ),
    accent: 'pink',
    bullets: [
      { icon: <Heart className="w-4 h-4" />,  text: 'CRM y fidelización con puntos y segmentación' },
      { icon: <Ticket className="w-4 h-4" />, text: 'Cupones y promociones que se aplican solos en caja' },
      { icon: <Gift className="w-4 h-4" />,   text: 'Campañas dirigidas a tus mejores clientes' },
    ],
  },
  {
    kicker: 'Pilar 4',
    title:  'Cumple sin dolores de cabeza',
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/20 text-green-400 mb-5">
        <ShieldCheck className="w-7 h-7" />
      </div>
    ),
    accent: 'green',
    bullets: [
      { icon: <FileText className="w-4 h-4" />,    text: 'Boletas electrónicas al SII desde la venta' },
      { icon: <Clock className="w-4 h-4" />,       text: 'Reloj control y registro de asistencia con exportación a PDF' },
      { icon: <BarChart3 className="w-4 h-4" />,   text: 'Cuadres de caja, turnos, ingresos y egresos' },
      { icon: <BarChart3 className="w-4 h-4" />,   text: 'Reportes avanzados: ventas por mesero, heatmaps, exportación a Excel' },
    ],
  },
];

const SUBTITLE: Record<Pillar['accent'], string> = {
  orange: 'El salón funcionando sin fricción, en cada turno.',
  blue:   'Que nada se pierda entre la comanda y el plato.',
  pink:   'Convierte clientes de una vez en clientes de siempre.',
  green:  'Lo que el SII y la DT te exigen, resuelto por dentro.',
};

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col bg-white/5 hover:bg-white/10 rounded-3xl p-8 border border-white/10 hover:border-orange-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {pillar.icon}

      <span className="inline-block self-start text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
        {pillar.kicker}
      </span>
      <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        {SUBTITLE[pillar.accent]}
      </p>

      <ul className="space-y-3 mt-auto">
        {pillar.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 mt-0.5 shrink-0">
              {b.icon}
            </span>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Modules() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="features" className="py-24" style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-semibold rounded-full border border-orange-500/20 mb-4">
            4 pilares
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight max-w-3xl mx-auto">
            Un solo sistema para operar{' '}
            <span className="text-orange-400">todo el restaurante.</span>
          </h2>
        </motion.div>

        {/* 4 pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}