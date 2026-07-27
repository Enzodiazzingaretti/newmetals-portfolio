import { motion } from 'framer-motion'
import { useContent } from '../ContentContext.jsx'
import { ICONS } from './icons.js'

// Sección identidad: la máscara de soldar pintada de Gabriel + lema del póster.
// Desktop: la foto es fondo full-bleed; la máscara ocupa la izquierda y el texto
// va sobre el espacio negro de la derecha, como en el póster original. La foto
// se monta más ancha que la sección y corrida a la izquierda: a estos anchos
// object-cover la ajusta al ancho exacto, así que object-position no la mueve.
// Mobile: encimar texto sobre la foto tapaba la máscara, así que va apilado —
// la máscara como bloque propio arriba y el texto abajo sobre negro.
export default function Values() {
  const { values: VALUES } = useContent()
  return (
    <section className="relative overflow-hidden border-t border-line bg-coal">
      {/* desktop: foto de fondo */}
      <img
        src={VALUES.maskImage}
        alt="Máscara de soldar pintada a mano, símbolo de New Metals"
        className="absolute inset-y-0 -left-[12%] hidden h-full w-[115%] max-w-none object-cover lg:block"
      />
      <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-transparent lg:via-coal/20 lg:to-coal/75" />
      <div className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-coal to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-coal to-transparent lg:block" />

      <div className="container-x relative grid items-center gap-12 py-20 sm:py-24 lg:min-h-[85vh] lg:grid-cols-2 lg:py-36">
        {/* mobile/tablet: la máscara como bloque, a sangre y sin velo encima */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative -mx-5 select-none overflow-hidden sm:-mx-8 lg:hidden"
        >
          <img
            src={VALUES.maskImage}
            alt="Máscara de soldar pintada a mano, símbolo de New Metals"
            className="aspect-[4/5] w-full object-cover object-[24%_center] sm:aspect-[16/10] sm:object-[28%_center]"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coal to-transparent" />
        </motion.div>

        {/* desktop: columna vacía que deja ver la máscara del fondo */}
        <div className="hidden self-stretch lg:block" aria-hidden="true" />

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
