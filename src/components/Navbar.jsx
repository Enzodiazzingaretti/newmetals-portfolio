import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { waLink } from '../content.js'
import { useContent } from '../ContentContext.jsx'

export default function Navbar() {
  const { nav: NAV_LINKS, brand } = useContent()
  const WHATSAPP_LINK = waLink(brand.whatsapp)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-coal/95' : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/assets/logo-light.svg" alt="New Metals" className="h-6 w-auto sm:h-7" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-xs font-medium uppercase tracking-wider2 text-bone/80 transition-colors hover:text-ember"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 border border-ember px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider2 text-ember transition-colors hover:bg-ember hover:text-coal sm:inline-flex"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2.5 p-2.5 text-bone lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-coal lg:hidden">
          <ul className="container-x flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-display text-sm font-medium uppercase tracking-wider2 text-bone/85 hover:text-ember"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn-ember w-full justify-center">
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
