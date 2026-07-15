import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ABOUT, WHATSAPP_LINK } from '../content.js'

export default function About() {
  return (
    <section id="nosotros" className="texture-weld relative border-t border-line bg-smoke">
      <div className="container-x grid items-center gap-12 py-24 lg:grid-cols-2 lg:py-32">
        {/* imagen (o placeholder acero) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          {ABOUT.image ? (
            <img src={ABOUT.image} alt="Taller New Metals" className="h-full w-full object-cover" />
          ) : (
            <div className="steel-placeholder h-full w-full" />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-coal/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-ember" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* monograma NM de fondo */}
          <img
            src="/assets/logo-light.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 bottom-0 w-52 opacity-[0.06]"
          />
          <p className="kicker mb-4">{ABOUT.kicker}</p>
          <h2 className="font-display text-3xl font-semibold uppercase leading-tight text-bone sm:text-4xl">
            {ABOUT.title}
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-steel">{ABOUT.copy}</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-ghost mt-9">
            Conocer más
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
