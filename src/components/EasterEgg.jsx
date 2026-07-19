import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { BIRTHDAY } from '../content.js'
import useFocusTrap from './useFocusTrap.js'

// Chispas cayendo detrás del mensaje: mismo lenguaje que el hero, pero
// emitidas a lo ancho de la costura de soldadura en vez de un punto fijo.
function SeamSparks() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const parts = []

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      w = r.width
      h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      if (parts.length < 150 && Math.random() < 0.55) {
        const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.6
        const speed = 0.6 + Math.random() * 2.2
        parts.push({
          x: w * (0.15 + Math.random() * 0.7),
          y: h * 0.3,
          vx: Math.cos(angle) * speed * 0.6,
          vy: Math.sin(angle) * speed,
          life: 0.6 + Math.random() * 0.4,
          decay: 0.004 + Math.random() * 0.008,
          size: 0.6 + Math.random() * 1.2,
        })
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.03
        p.life -= p.decay
        if (p.life <= 0 || p.y > h + 10) {
          parts.splice(i, 1)
          continue
        }
        ctx.strokeStyle =
          p.life > 0.6
            ? `rgba(255,240,200,${p.life * 0.9})`
            : p.life > 0.3
              ? `rgba(255,160,60,${p.life * 0.9})`
              : `rgba(210,70,20,${p.life * 0.8})`
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

// Letras que nacen al blanco incandescente y se enfrían a metal, escalonadas
// como si las fuera soldando una a una.
function CooledText({ text, delay = 0, className = '', hot = '#fffdf5', cold = '#f4f4f2' }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{
            color: hot,
            textShadow:
              '0 0 18px rgba(255,180,90,0.95), 0 0 42px rgba(255,103,0,0.75), 0 0 80px rgba(255,103,0,0.4)',
            opacity: 0,
            y: 6,
          }}
          animate={{
            color: cold,
            textShadow: '0 0 0px rgba(255,180,90,0), 0 0 0px rgba(255,103,0,0)',
            opacity: 1,
            y: 0,
          }}
          transition={{
            opacity: { duration: 0.18, delay: delay + i * 0.055 },
            y: { duration: 0.18, delay: delay + i * 0.055 },
            color: { duration: 2.1, delay: delay + i * 0.055 + 0.15 },
            textShadow: { duration: 2.1, delay: delay + i * 0.055 + 0.15 },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function EasterEgg({ open, onClose }) {
  const dialogRef = useRef(null)
  useFocusTrap(dialogRef, open)

  // cerrar con Esc y bloquear el scroll de fondo mientras está abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${BIRTHDAY.greeting}, ${BIRTHDAY.name}`}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-coal px-6 py-16"
        >
          <div className="hero-grid pointer-events-none absolute inset-0" />
          <SeamSparks />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 z-10 p-2.5 text-steel transition-colors hover:text-ember"
          >
            <X size={22} />
          </button>

          <div className="relative z-10 w-full max-w-2xl text-center" onClick={(e) => e.stopPropagation()}>
            {/* costura de soldadura que se dibuja de izquierda a derecha */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="mx-auto h-[3px] w-40 origin-left rounded-full bg-gradient-to-r from-transparent via-ember to-transparent"
              style={{ boxShadow: '0 0 18px rgba(255,103,0,0.9), 0 0 40px rgba(255,103,0,0.5)' }}
            />

            <h2 className="mt-10 font-display font-bold uppercase leading-[1.05]">
              <CooledText
                text={BIRTHDAY.greeting}
                delay={0.9}
                className="block text-4xl sm:text-5xl lg:text-6xl"
              />
              <CooledText
                text={BIRTHDAY.name}
                delay={1.5}
                cold="#ff6700"
                className="mt-1 block text-5xl sm:text-6xl lg:text-7xl"
              />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="mx-auto mt-9 max-w-lg text-[15px] leading-relaxed text-steel"
            >
              {BIRTHDAY.message}
            </motion.p>

            {/* el remate, con su propio tiempo para que caiga solo */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 3.4 }}
              className="mx-auto mt-6 max-w-lg text-[13px] italic leading-relaxed text-ember/80"
            >
              {BIRTHDAY.postscript}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 4.1 }}
              className="mt-8 font-display text-sm font-medium uppercase tracking-wider2 text-bone"
            >
              {BIRTHDAY.signature}
            </motion.p>

            <motion.img
              src="/assets/logo-light.svg"
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              transition={{ duration: 1.2, delay: 4.4 }}
              className="mx-auto mt-12 h-6 w-auto"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
