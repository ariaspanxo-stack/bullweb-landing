import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ShoppingCart,
  ChefHat,
  Truck,
  Star,
  BarChart3,
  Calculator,
} from 'lucide-react';

interface Feature {
  icon:        React.ReactNode;
  title:       string;
  desc:        string;
  color:       string;
  bgColor:     string;
  metric:      string;
  metricLabel: string;
}

const FEATURES: Feature[] = [
  {
    icon:        <ShoppingCart className="w-6 h-6" />,
    title:       'POS Completo',
    desc:        'Mesas, mostrador y delivery en una pantalla. Rápido y sin errores.',
    color:       'text-orange-500',
    bgColor:     'bg-orange-50',
    metric:      '< 30 s',
    metricLabel: 'por comanda',
  },
  {
    icon:        <ChefHat className="w-6 h-6" />,
    title:       'KDS — Cocina Digital',
    desc:        'Pantalla de cocina en tiempo real. Sin tickets de papel, sin demoras.',
    color:       'text-blue-500',
    bgColor:     'bg-blue-50',
    metric:      '0',
    metricLabel: 'tickets de papel',
  },
  {
    icon:        <Truck className="w-6 h-6" />,
    title:       'Delivery de Apps Integrado',
    desc:        'Conecta Uber Eats, Rappi y PedidosYa. Los pedidos llegan directo a tu POS y cocina. Si un producto se agota, se pausa solo en las apps.',
    color:       'text-green-500',
    bgColor:     'bg-green-50',
    metric:      '3 apps',
    metricLabel: 'en una sola pantalla',
  },
  {
    icon:        <Star className="w-6 h-6" />,
    title:       'Programa de Puntos',
    desc:        'Fideliza clientes con puntos en cada compra. Aumenta el retorno.',
    color:       'text-purple-500',
    bgColor:     'bg-purple-50',
    metric:      '+35%',
    metricLabel: 'retorno de clientes',
  },
  {
    icon:        <BarChart3 className="w-6 h-6" />,
    title:       'Reportes en Tiempo Real',
    desc:        'Ventas, propinas y arqueo de caja. Todo en un clic.',
    color:       'text-rose-500',
    bgColor:     'bg-rose-50',
    metric:      '24/7',
    metricLabel: 'datos en vivo',
  },
  {
    icon:        <Calculator className="w-6 h-6" />,
    title:       'Recetas y Costeo Real',
    desc:        'Sabe exactamente cuánto te cuesta cada plato. Calcula márgenes de ganancia al instante y deja de perder dinero.',
    color:       'text-amber-500',
    bgColor:     'bg-amber-50',
    metric:      '+15%',
    metricLabel: 'margen promedio',
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${feature.bgColor} ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {feature.icon}
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">{feature.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{feature.desc}</p>

      {/* Métrica */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <span className={`text-2xl font-black ${feature.color}`}>{feature.metric}</span>
        <span className="text-xs text-slate-400 ml-1.5">{feature.metricLabel}</span>
      </div>

      {/* Borde naranja en hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-orange-400/0 group-hover:border-orange-400/30 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-500 text-sm font-semibold rounded-full border border-orange-100 mb-4">
            Funcionalidades
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
            Todo lo que necesitas para{' '}
            <span className="text-orange-500">operar</span> tu restaurante
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            Un sistema pensado para el día a día del restaurante chileno.
            Sin complicaciones.
          </p>
        </motion.div>

        {/* Fila 1: 3 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {FEATURES.slice(0, 3).map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
        {/* Fila 2: 3 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.slice(3).map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
