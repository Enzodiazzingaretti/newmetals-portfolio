import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { WORKS, BRAND } from '../content.js'
import WorkModal from './WorkModal.jsx'

export default function Works() {
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const scrollBy = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const step = card ? card.offsetWidth + 20 : 320
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="trabajos" className="texture-weld relative border-t border-line bg-smoke">
      <div className="container-x py-24 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-3">Trabajos realizados</p>
            <h2 className="font-display text-3xl font-semibold uppercase text-bone sm:text-4xl">
              Proyectos que hablan por sí solos
            </h2>
          </div>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost">
            Ver todos los trabajos
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="relative mt-12">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WORKS.map((work, i) => (
              <motion.button
                key={work.id}
                type="button"
                data-card
                onClick={() => setSelected(work)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group w-64 flex-none snap-start text-left sm:w-72"
                aria-label={`Ver detalle: ${work.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="steel-placeholder h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />
                  {/* affordance: botón "ver más" al hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-coal/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 border border-bone/60 px-4 py-2 font-display text-xs font-medium uppercase tracking-wider2 text-bone">
                      <Plus size={14} />
                      Ver detalle
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-ember transition-all duration-400 group-hover:w-full" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider2 text-bone">
                  {work.title}
                </h3>
                <p className="mt-1 text-xs text-steel">{work.meta}</p>
              </motion.button>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="border border-line p-3 text-bone/70 transition-colors hover:border-ember hover:text-ember"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Siguiente"
              className="border border-line p-3 text-bone/70 transition-colors hover:border-ember hover:text-ember"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <WorkModal key={selected.id} work={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
