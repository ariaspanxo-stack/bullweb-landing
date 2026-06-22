import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MonitorSmartphone, Smartphone, QrCode, ChefHat,
  Bike, BarChart3, FileText, Gift, Users, Package,
  Ticket, Building2,
} from 'lucide-react';

const FEATURED_MODULES = [
  { icon: <MonitorSmartphone className="w-6 h-6" />, label: 'Restaurant POS',  desc: 'Comandas, mesas y cobro rápido', badge: 'Core' },
  { icon: <Smartphone className="w-6 h-6" />,        label: 'App Mesero',      desc: 'Toma pedidos desde el celular', badge: 'Popular' },
  { icon: <ChefHat className="w-6 h-6" />,           label: 'KDS Cocina',      desc: 'Pantalla de comandas en cocina', badge: null },
  { icon: <BarChart3 className="w-6 h-6" />,         label: 'Reportes',        desc: 'Ventas e indicadores en tiempo real', badge: null },
];

const SECONDARY_MODULES = [
  { icon: <QrCode className="w-5 h-5" />,    label: 'Carta QR',        desc: 'Menú digital desde la mesa'    },
  { icon: <Bike className="w-5 h-5" />,      label: 'Delivery',        desc: 'Uber Eats, Rappi y PedidosYa'  },
  { icon: <FileText className="w-5 h-5" />,  label: 'Boletas DTE',     desc: 'Emisión electrónica SII'       },
  { icon: <Gift className="w-5 h-5" />,      label: 'Prog. Puntos',    desc: 'Fideliza a tus clientes'       },
  { icon: <Users className="w-5 h-5" />,     label: 'Empleados',       desc: 'Control de personal y turnos'  },
  { icon: <Package className="w-5 h-5" />,   label: 'Inventario + Recetas', desc: 'Costeo, márgenes y stock en tiempo real' },
  { icon: <Ticket className="w-5 h-5" />,    label: 'Cupones',         desc: 'Descuentos y promociones'      },
  { icon: <Building2 className="w-5 h-5" />, label: 'Multi-sucursal',  desc: 'Gestiona varios locales'       },
];

export default function Modules() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="modules" className="py-24" style={{ background: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm font-semibold rounded-full border border-orange-500/20 mb-4">
            Módulos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Todo lo que necesitas,{' '}
            <span className="text-orange-400">en un solo lugar</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Plataforma todo-en-uno diseñada para restaurantes chilenos.
            Sin integraciones complicadas.
          </p>
        </motion.div>

        {/* Banner todos incluidos */}
        <motion.div
          className="flex items-center justify-center gap-3 px-6 py-4 mb-10 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-400 font-semibold text-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>✅</span>
          <span>Todos los módulos incluidos en cada plan · Sin cargos extra ni integraciones de pago adicionales</span>
        </motion.div>

        {/* Cards destacadas (4) */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {FEATURED_MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              className="group relative flex flex-col gap-3 p-5 bg-white/10 hover:bg-orange-500/10 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-200 cursor-default"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 group-hover:bg-orange-500/20 transition-colors text-slate-300 group-hover:text-orange-400">
                  {mod.icon}
                </div>
                {mod.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">{mod.badge}</span>
                )}
              </div>
              <div>
<h3 className="font-bold text-white text-sm">{mod.label}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-snug">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cards secundarias (8) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SECONDARY_MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-orange-500/10 rounded-xl border border-white/5 hover:border-orange-500/20 transition-all duration-200 cursor-default"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: (i + 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-slate-400 group-hover:text-orange-400 transition-colors shrink-0">{mod.icon}</div>
              <div>
<h3 className="font-semibold text-white text-xs leading-tight">{mod.label}</h3>
                <p className="text-slate-500 text-[10px] mt-0.5 group-hover:text-slate-400 transition-colors leading-snug">{mod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
