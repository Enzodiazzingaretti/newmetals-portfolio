import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { VALUES, BIRTHDAY } from '../content.js'
import { ICONS } from './icons.js'
import EasterEgg from './EasterEgg.jsx'

// Sección identidad: la máscara de soldar pintada de Gabriel + lema del póster.
// Desktop: la foto es fondo full-bleed; la máscara ocupa la izquierda y el texto
// va sobre el espacio negro de la derecha, como en el póster original. La foto
// se monta más ancha que la sección y corrida a la izquierda: a estos anchos
// object-cover la ajusta al ancho exacto, así que object-position no la mueve.
// Mobile: encimar texto sobre la foto tapaba la máscara, así que va apilado —
// la máscara como bloque propio arriba y el texto abajo sobre negro.
export default function Values() {
  const [eggOpen, setEggOpen] = useState(false)
  const taps = useRef(0)
  const timer = useRef(0)

  // toques seguidos sobre la máscara: se reinicia si pasan más de 1,2 s entre
  // uno y otro, así solo lo abre quien lo busca a propósito
  const tapMask = () => {
    clearTimeout(timer.current)
    taps.current += 1
    if (taps.current >= BIRTHDAY.clicksToOpen) {
      taps.current = 0
      setEggOpen(true)
      return
    }
    timer.current = setTimeout(() => {
      taps.current = 0
    }, 1200)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  // el día del cumple el mensaje se abre solo, con un respiro para que el sitio
  // alcance a aparecer antes de la sorpresa. Una vez por sesión: si cierra y
  // sigue navegando, no vuelve a saltar. ?cumple lo fuerza cualquier día.
  // La bandera se marca al abrir y no al agendar: si se marcara antes, el
  // doble montaje de StrictMode cancelaría el timer y el segundo pase saldría
  // temprano por la bandera ya puesta, y no se abriría nunca.
  useEffect(() => {
    const forzado = new URLSearchParams(window.location.search).has('cumple')
    const vista = () => {
      try {
        return !!sessionStorage.getItem('nm-cumple-visto')
      } catch {
        return false // sessionStorage bloqueado (modo privado): igual lo mostramos
      }
    }
    if (!forzado) {
      if (!BIRTHDAY.dates || BIRTHDAY.dates.length === 0) return
      const hoy = new Date()
      const mmdd = `${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
      if (!BIRTHDAY.dates.includes(mmdd)) return
      if (vista()) return
    }
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem('nm-cumple-visto', '1')
      } catch {
        /* no pasa nada: solo perdemos el "una vez por sesión" */
      }
      setEggOpen(true)
    }, 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden border-t border-line bg-coal">
      {/* desktop: foto de fondo */}
      <img
        src={VALUES.maskImage}
        alt="Máscara de soldar pintada a mano, símbolo de New Metals"
        className="absolute inset-y-0 -left-[12%] hidden h-full w-[115%] max-w-none object-cover lg:block"
      />
      <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-transparent lg:via-coal/20 lg:to-coal/75" />
      <div className="absolute inset-x-0 top-0 hidden h-24 bg-gradient-to-b from-coal to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-coal to-transparent lg:block" />

      <div className="container-x relative grid items-center gap-12 py-20 sm:py-24 lg:min-h-[85vh] lg:grid-cols-2 lg:py-36">
        {/* mobile/tablet: la máscara como bloque, a sangre y sin velo encima */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          onClick={tapMask}
          className="relative -mx-5 select-none overflow-hidden sm:-mx-8 lg:hidden"
        >
          <img
            src={VALUES.maskImage}
            alt="Máscara de soldar pintada a mano, símbolo de New Metals"
            className="aspect-[4/5] w-full object-cover object-[24%_center] sm:aspect-[16/10] sm:object-[28%_center]"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coal to-transparent" />
        </motion.div>

        {/* desktop: columna vacía que deja ver la máscara del fondo. Como cae
            justo encima de ella, hace de zona de toque del easter egg */}
        <div className="hidden self-stretch lg:block" onClick={tapMask} aria-hidden="true" />

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
            <span className="mt-2 block w-fit bg-bone px-3 py-1 text-coal">construye</span>
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

      <EasterEgg open={eggOpen} onClose={() => setEggOpen(false)} />
    </section>
  )
}
