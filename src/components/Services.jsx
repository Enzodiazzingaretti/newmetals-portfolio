import { motion } from 'framer-motion'
import { SERVICES } from '../content.js'
import { ICONS } from './icons.js'

export default function Services() {
  return (
    <section id="servicios" className="border-t border-line bg-coal">
      <div className="container-x py-24 lg:py-28">
        <p className="kicker mb-3">Servicios</p>
        <h2 className="font-display text-3xl font-semibold uppercase text-bone sm:text-4xl">
          ¿Qué hacemos?
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-7">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon]
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group flex flex-col items-center gap-5 bg-coal px-4 py-10 text-center transition-colors duration-300 hover:bg-panel"
              >
                <Icon
                  size={34}
                  strokeWidth={1.25}
                  className="text-bone/80 transition-colors duration-300 group-hover:text-ember"
                />
                <span className="font-display text-xs font-medium uppercase tracking-wider2 text-bone/85">
                  {service.label}
                </span>
              </motion.div>
            )
          })}
          {/* rellenos: sin ellos las celdas sobrantes de la última fila muestran
              el color de las divisorias como un bloque gris. 7 servicios →
              faltan 1 celda a 2 columnas y 2 a 3 columnas; a 7 no falta ninguna */}
          <div className="bg-coal lg:hidden" aria-hidden="true" />
          <div className="hidden bg-coal sm:block lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
