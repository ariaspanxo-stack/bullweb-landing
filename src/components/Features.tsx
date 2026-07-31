import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { WifiOff, Receipt, Boxes, FileText } from 'lucide-react';

interface PainPoint {
  icon:    React.ReactNode;
  title:    string;
  desc:     string;
  color:    string;
  bgColor:  string;
  tag:      string;
}

const PAINS: PainPoint[] = [
  {
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 mb-5">
        <WifiOff className="w-7 h-7" />
      </div>
    ),
    title:   'Internet',
    desc:    'Se cae el internet un viernes lleno y la caja se congela. Cada minuto sin vender es un cliente que se aburre y se va. → Con el Modo Offline, sigues cobrando sin señal. Todo se sincroniza solo cuando vuelve.',
    color:   'text-orange-500',
    bgColor: 'bg-orange-50',
    tag:     'Modo Offline PWA',
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 mb-5">
        <Receipt className="w-7 h-7" />
      </div>
    ),
    title:   'SII',
    desc:    'Cuadrar boletas y pelear con la emisión te roba horas que deberías estar en el salón. → BullWeb emite la boleta electrónica al SII desde la misma pantalla de venta. Cero doble trabajo.',
    color:   'text-blue-500',
    bgColor: 'bg-blue-50',
    tag:     'Boletas DTE integradas',
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 text-green-500 mb-5">
        <Boxes className="w-7 h-7" />
      </div>
    ),
    title:   'Competencia',
    desc:    'Con otros sistemas partes barato, pero fidelización aparte, reportes aparte, cada función es un cobro nuevo. En seis meses pagas el doble. → En BullWeb los $29.000 son los $29.000, con todo adentro.',
    color:   'text-green-500',
    bgColor: 'bg-green-50',
    tag:     'Todo incluido por $29.000',
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 mb-5">
        <FileText className="w-7 h-7" />
      </div>
    ),
    title:   'Dirección del Trabajo',
    desc:    'Un libro de asistencia mal llevado es una multa esperando a pasar. La Dirección del Trabajo no perdona el papeleo. → Reloj control y libro de asistencia digital que cumple el estándar de la DT. Tranquilidad en cada fiscalización.',
    color:   'text-purple-500',
    bgColor: 'bg-purple-50',
    tag:     'Libro de Asistencia Digital',
  },
];

function PainCard({ pain, index }: { pain: PainPoint; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {pain.icon}
      <span className={`inline-block self-start text-xs font-bold uppercase tracking-wider ${pain.color} bg-opacity-10 px-3 py-1 rounded-full mb-3 ${pain.bgColor}`}>
        {pain.tag}
      </span>
      <h3 className="text-lg font-bold text-slate-800 mb-3">{pain.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{pain.desc}</p>

      {/* Borde naranja en hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-orange-400/0 group-hover:border-orange-400/30 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="pain-points" className="py-24 bg-white">
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
            Problemas resueltos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight max-w-3xl mx-auto">
            Sabes exactamente{' '}
            <span className="text-orange-500">de qué hablamos.</span>
          </h2>
        </motion.div>

        {/* 4 puntos de dolor */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAINS.map((pain, i) => (
            <PainCard key={pain.title} pain={pain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}