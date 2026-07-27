import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { workWaLink } from '../content.js'
import { useContent } from '../ContentContext.jsx'
import useFocusTrap from './useFocusTrap.js'

// Modal de detalle de un trabajo: galería (foto principal + miniaturas),
// descripción, ficha técnica y CTA de WhatsApp con el nombre del proyecto.
export default function WorkModal({ work, onClose }) {
  const { brand } = useContent()
  const workWhatsappLink = (title) => workWaLink(brand.whatsapp, title)
  const [active, setActive] = useState(work.gallery?.[0] ?? work.image)
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  useFocusTrap(panelRef)

  // bloquear scroll del body + cerrar con Escape + foco inicial
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-title"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-coal/85 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-auto w-full max-w-5xl border border-line bg-smoke shadow-2xl"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <p className="kicker mb-2">{work.meta}</p>
            <h3 id="work-title" className="font-display text-2xl font-bold uppercase text-bone sm:text-3xl">
              {work.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 border border-line p-3 text-bone/70 transition-colors hover:border-ember hover:text-ember"
          >
            <X size={20} />
          </button>
        </div>

        {/* body */}
        <div className="grid gap-8 px-6 py-7 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-9">
          {/* galería */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-line">
              <img src={active} alt={work.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/40 to-transparent" />
            </div>
            {work.gallery?.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {work.gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActive(src)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`relative aspect-[4/3] overflow-hidden border transition-colors ${
                      active === src ? 'border-ember' : 'border-line hover:border-steel'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-xs italic text-steel">
              Imágenes de referencia — próximamente fotos reales del trabajo.
            </p>
          </div>

          {/* info */}
          <div className="flex flex-col">
            <p className="leading-relaxed text-steel">{work.description}</p>

            <p className="kicker mb-4 mt-8">Ficha técnica</p>
            <dl className="divide-y divide-line border-y border-line">
              {work.specs.map((spec) => (
                <div key={spec.label} className="flex gap-4 py-3">
                  <dt className="w-2/5 shrink-0 font-display text-xs font-medium uppercase tracking-wider2 text-steel">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-bone/90">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href={workWhatsappLink(work.title)}
              target="_blank"
              rel="noreferrer"
              className="btn-ember mt-8 w-full justify-center whitespace-nowrap px-5 sm:w-auto sm:px-7"
            >
              <MessageCircle size={16} className="shrink-0" />
              Consultar por este trabajo
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
