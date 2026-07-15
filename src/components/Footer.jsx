import { Instagram, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import { BRAND, CONTACT, WHATSAPP_LINK } from '../content.js'

export default function Footer() {
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
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="hover:text-bone">
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

        {/* CTA */}
        <div className="border border-line bg-panel p-8">
          <h3 className="font-display text-xl font-semibold uppercase text-bone">{CONTACT.title}</h3>
          <p className="mt-3 text-sm text-steel">{CONTACT.copy}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-ember mt-6 text-xs"
          >
            <MessageCircle size={15} />
            {CONTACT.cta}
          </a>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-xs text-steel/70">
        © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
