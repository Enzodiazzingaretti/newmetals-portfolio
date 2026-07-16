import { motion } from 'framer-motion'
import { VALUES } from '../content.js'
import { ICONS } from './icons.js'

// Sección identidad: la máscara de soldar pintada de Gabriel + lema del póster.
// La foto (máscara a la izquierda, negro a la derecha) es el fondo full-bleed;
// el texto ocupa el espacio oscuro de la derecha, como en el póster original.
export default function Values() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-coal">
      <img
        src={VALUES.maskImage}
        alt="Máscara de soldar pintada a mano, símbolo de New Metals"
        className="absolute inset-0 h-full w-full object-cover object-[28%_center]"
      />
      {/* legibilidad: velo suave en mobile, degradado hacia el texto en desktop */}
      <div className="absolute inset-0 bg-coal/60 lg:bg-gradient-to-r lg:from-transparent lg:via-coal/15 lg:to-coal/70" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-coal to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coal to-transparent" />

      <div className="container-x relative grid items-center gap-10 py-28 lg:min-h-[85vh] lg:grid-cols-2 lg:py-36">
        {/* columna vacía: deja ver la máscara en desktop */}
        <div className="hidden lg:block" />

        {/* lema + valores */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl font-bold uppercase leading-[1.05] text-bone sm:text-5xl lg:text-6xl"
          >
            {VALUES.titleTop}{' '}
            <span className="text-ember">{VALUES.titleAccent}</span>
            <span className="mt-2 block w-fit bg-bone px-3 py-1 text-coal">construye</span>
            <span className="block">tu mañana.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 h-px w-full max-w-md origin-left bg-ember/50"
          />

          <div className="mt-8 grid max-w-md grid-cols-3 divide-x divide-line">
            {VALUES.items.map((item, i) => {
              const Icon = ICONS[item.icon]
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
                  className="flex flex-col items-center gap-2 px-3 text-center"
                >
                  <Icon size={26} strokeWidth={1.5} className="text-ember" />
                  <span className="font-display text-xs font-semibold uppercase tracking-wider2 text-bone">
                    {item.label}
                  </span>
                  <span className="text-[11px] leading-snug text-steel">{item.sub}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
