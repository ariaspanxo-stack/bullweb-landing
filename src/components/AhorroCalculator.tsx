import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Calculator, TrendingDown, ArrowRight } from 'lucide-react';

const COSTO_POR_BOLETA = 15; // CLP — hardcodeado, editable

function formatCLP(n: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(n);
}

/** Animates a number from 0 to target */
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 30 });
  const display = useTransform(spring, (v) => formatCLP(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function AhorroCalculator() {
  const [boletas, setBoletas] = useState(300);
  const perMonth = boletas * COSTO_POR_BOLETA;
  const perYear = perMonth * 12;

  return (
    <section className="relative bg-brand-bg py-24 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Calculadora de Ahorro
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Cuánto estás perdiendo al mes?
          </h2>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 md:p-12"
        >
          {/* Slider */}
          <div className="mb-8">
            <label className="block text-slate-300 text-lg font-semibold mb-2">
              ¿Cuántas boletas emites al mes?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50}
                max={5000}
                step={10}
                value={boletas}
                onChange={(e) => setBoletas(Number(e.target.value))}
                className="flex-1 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:hover:bg-orange-400 [&::-webkit-slider-thumb]:transition-colors"
              />
              <span className="text-2xl font-bold text-orange-400 min-w-[80px] text-right">
                {boletas.toLocaleString('es-CL')}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              Costo promedio por boleta en otros sistemas: <strong className="text-slate-400">${COSTO_POR_BOLETA} CLP</strong>
            </p>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Per Month */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-slate-400 text-sm mb-1">Estás perdiendo al mes</p>
              <p className="text-3xl md:text-4xl font-extrabold text-red-400">
                <AnimatedNumber value={perMonth} />
              </p>
            </div>
            {/* Per Year */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-slate-400 text-sm mb-1">Esto es al año BOTADOS</p>
              <p className="text-3xl md:text-4xl font-extrabold text-red-400">
                <AnimatedNumber value={perYear} />
              </p>
            </div>
          </div>

          {/* Punchline */}
          <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 border border-orange-500/30 rounded-xl p-6 mb-8 text-center">
            <p className="text-lg md:text-xl text-slate-200">
              Con <strong className="text-orange-400">Bullweb SII Directo</strong>, esos{' '}
              <strong className="text-white">{formatCLP(perYear)}</strong> se quedan en tu
              bolsillo. <span className="text-green-400 font-bold">Cero comisiones.</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="#contacto"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-105"
            >
              Quiero emitir mis Boletas Gratis
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}