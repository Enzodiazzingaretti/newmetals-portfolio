import { motion } from 'framer-motion'
import { Instagram, MapPin, Phone, Clock, MessageCircle, Flame } from 'lucide-react'
import { waLink } from '../content.js'
import { useContent } from '../ContentContext.jsx'

export default function Footer() {
  const { brand: BRAND, contact: CONTACT } = useContent()
  const WHATSAPP_LINK = waLink(BRAND.whatsapp)
  return (
    <footer id="contacto" className="border-t border-line bg-coal">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-3 lg:py-20">
        {/* marca */}
        <div>
          <img src="/assets/logo-light.svg" alt="New Metals" className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">{BRAND.tagline}</p>
        </div>

        {/* contacto */}
        <div>
          <p className="kicker mb-5">Contacto</p>
          <ul className="space-y-3 text-sm text-steel">
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-ember" />
              <a href={`tel:${BRAND.phone.replace(/[\s-]/g, '')}`} className="hover:text-bone">
                {BRAND.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={15} className="text-ember" />
              <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-bone">
                {BRAND.instagram}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={15} className="text-ember" />
              {BRAND.location}
            </li>
            <li className="flex items-center gap-3">
              <Clock size={15} className="text-ember" />
              {BRAND.hours}
            </li>
          </ul>
        </div>

        {/* CTA con borde que se "suelda" al entrar en viewport */}
        <div className="relative border border-line bg-panel p-6 sm:p-8">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              stroke="#ff6700"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.9 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                pathLength: { duration: 1.6, ease: 'easeInOut', delay: 0.2 },
                opacity: { duration: 0.3, delay: 0.2 },
              }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,103,0,0.6))' }}
            />
          </svg>
          <h3 className="font-display text-xl font-semibold uppercase text-bone">{CONTACT.title}</h3>
          <p className="mt-3 text-sm text-steel">{CONTACT.copy}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-ember mt-6 whitespace-nowrap px-5 text-xs sm:px-7"
          >
            <MessageCircle size={15} />
            {CONTACT.cta}
          </a>
        </div>
      </div>

      <div className="border-t border-line py-5 flex items-center justify-center gap-2 text-center text-xs text-steel/70">
        <span>© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</span>
        <a
          href="/admin"
          aria-label="Panel de administración"
          title="Panel"
          className="inline-flex items-center text-steel/30 transition-colors hover:text-ember"
        >
          <Flame size={13} />
        </a>
      </div>
    </footer>
  )
}
