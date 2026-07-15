import { useState } from 'react'
import { motion } from 'framer-motion'
import { VALUES } from '../content.js'
import { ICONS } from './icons.js'

// Sección identidad: la máscara de soldar pintada de Gabriel + lema del póster.
export default function Values() {
  const [maskMissing, setMaskMissing] = useState(false)

  return (
    <section className="relative overflow-hidden border-t border-line bg-coal">
      {/* brasa ambiental detrás de la máscara */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 60% at 28% 55%, rgba(255,103,0,0.10), transparent 65%)',
        }}
      />

      <div className="container-x relative grid items-center gap-14 py-24 lg:grid-cols-2 lg:py-32">
        {/* la máscara */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          {!maskMissing ? (
            <img
              src={VALUES.maskImage}
              alt="Máscara de soldar pintada a mano, símbolo de New Metals"
              onError={() => setMaskMissing(true)}
              className="w-full object-contain drop-shadow-[0_0_60px_rgba(255,103,0,0.15)]"
            />
          ) : (
            <div className="steel-placeholder flex aspect-[3/4] w-full items-center justify-center border border-line">
              <p className="max-w-[220px] text-center text-xs leading-relaxed text-steel">
                Foto de la máscara pintada
                <br />
                <span className="text-bone/60">public/assets/mascara.jpg</span>
              </p>
            </div>
          )}
        </motion.div>

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
            <span className="mt-2 block bg-bone px-3 py-1 text-coal w-fit">construye</span>
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
