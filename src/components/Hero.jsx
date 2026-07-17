import { motion } from 'framer-motion'
import { ArrowRight, Instagram, MessageCircle, Mouse } from 'lucide-react'
import { HERO, WHATSAPP_LINK, BRAND } from '../content.js'
import SparkCanvas from './SparkCanvas.jsx'

export default function Hero() {
  const animated =
    !new URLSearchParams(window.location.search).has('nosparks') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* fondo negro con la escena de soldadura dibujada en canvas */}
      <div className="absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-coal to-transparent" />
        {animated && <SparkCanvas />}
      </div>

      {/* marcas de encuadre técnico (debajo del navbar) */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 top-20 z-0 sm:inset-x-6 sm:bottom-6">
        <span className="absolute left-0 top-0 h-7 w-7 border-l border-t border-ember/25" />
        <span className="absolute right-0 top-0 h-7 w-7 border-r border-t border-ember/25" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-ember/25" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-ember/25" />
      </div>

      <div className="container-x relative z-10 pb-24 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="kicker mb-6"
        >
          {HERO.kicker.join('  ·  ')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight text-bone sm:text-6xl lg:text-7xl"
        >
          {HERO.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-7 h-[3px] w-14 origin-left bg-ember"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-7 max-w-sm text-[15px] leading-relaxed text-steel"
        >
          {HERO.copy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-ember">
            {HERO.cta}
            <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* accesos sociales en mobile: en desktop viven en el rail vertical */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex items-center gap-5 lg:hidden"
        >
          <span className="font-display text-[11px] font-medium uppercase tracking-wider3 text-steel">
            Seguinos
          </span>
          <span className="h-px w-8 bg-line" />
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-steel transition-colors hover:text-ember"
          >
            <Instagram size={18} />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="text-steel transition-colors hover:text-ember"
          >
            <MessageCircle size={18} />
          </a>
        </motion.div>
      </div>

      {/* hint de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:gap-4"
      >
        <Mouse size={16} className="text-steel sm:h-[18px] sm:w-[18px]" />
        <span className="h-px w-8 bg-line sm:w-12" />
        <span className="whitespace-nowrap font-display text-[10px] font-medium uppercase tracking-wider3 text-steel sm:text-[11px]">
          Deslizá para descubrir
        </span>
      </motion.div>

      {/* rail social vertical */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
      >
        <span
          className="font-display text-[11px] font-medium uppercase tracking-wider3 text-steel"
          style={{ writingMode: 'vertical-rl' }}
        >
          Seguinos
        </span>
        <span className="h-10 w-px bg-line" />
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-steel transition-colors hover:text-ember"
        >
          <Instagram size={18} />
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="text-steel transition-colors hover:text-ember"
        >
          <MessageCircle size={18} />
        </a>
      </motion.div>
    </section>
  )
}
