import { motion } from 'framer-motion'
import { PROCESS } from '../content.js'
import { ICONS } from './icons.js'

export default function Process() {
  return (
    <section id="proceso" className="texture-weld relative border-t border-line bg-smoke">
      <div className="container-x py-24 lg:py-28">
        <p className="kicker mb-3">{PROCESS.kicker}</p>
        <h2 className="font-display text-3xl font-semibold uppercase text-bone sm:text-4xl">
          {PROCESS.title}
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.steps.map((step, i) => {
            const Icon = ICONS[step.icon]
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <Icon size={26} strokeWidth={1.4} className="text-bone/70" />
                  <span className="font-display text-3xl font-semibold text-ember">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {i < PROCESS.steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-ember/60 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-wider2 text-bone">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-steel">{step.copy}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
