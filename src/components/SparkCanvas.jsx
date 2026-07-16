import { useEffect, useRef } from 'react'

// Punto de soldadura en canvas sobre fondo negro: arco que pulsa, humo tenue,
// reflejo cálido sobre la superficie implícita y chispas balísticas que se
// enfrían (blanco → amarillo → naranja → rojo), crepitan partiéndose en
// astillas y rebotan. Todo lo luminoso se dibuja en modo aditivo ('lighter').
export default function SparkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let t = 0
    const sparks = []
    const smoke = []

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // en pantallas chicas el texto ocupa todo el ancho: correr el punto de
    // soldadura abajo a la derecha para no lavar el párrafo con el glow
    const weldPoint = () =>
      width < 640
        ? { x: width * 0.78, y: height * 0.74 }
        : { x: width * 0.6, y: height * 0.64 }

    const spawnSpark = (x, y, opts = {}) => {
      if (sparks.length > 260) return
      const angle = opts.angle ?? -Math.PI / 2 + (Math.random() - 0.5) * 2.6
      const speed = opts.speed ?? 2 + Math.random() * 6
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: opts.life ?? 0.7 + Math.random() * 0.3,
        decay: opts.decay ?? 0.006 + Math.random() * 0.018,
        size: opts.size ?? 0.7 + Math.random() * 1.5,
      })
    }

    // color según cuánto se enfrió la chispa (1 = recién salida del arco)
    const sparkStroke = (life) => {
      if (life > 0.75) return `rgba(255,252,235,${life})`
      if (life > 0.5) return `rgba(255,214,120,${life})`
      if (life > 0.25) return `rgba(255,138,40,${life})`
      return `rgba(205,70,25,${life * 0.9})`
    }

    // flicker del arco: persigue objetivos aleatorios con ráfagas intensas
    let weld = 0.5
    let weldTarget = 0.5
    let retarget = 0

    const tick = () => {
      t++
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, width, height)

      const { x, y } = weldPoint()

      if (--retarget <= 0) {
        weldTarget = Math.random() < 0.25 ? 0.85 + Math.random() * 0.15 : 0.2 + Math.random() * 0.55
        retarget = 4 + Math.floor(Math.random() * 16)
      }
      weld += (weldTarget - weld) * 0.18

      // humo: sube lento desde el punto de soldadura y se disipa
      if (t % 14 === 0 && smoke.length < 12) {
        smoke.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y - 6,
          r: 6 + Math.random() * 8,
          vx: (Math.random() - 0.3) * 0.3,
          vy: -(0.25 + Math.random() * 0.4),
          a: 0.05 + Math.random() * 0.04,
        })
      }
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i]
        s.x += s.vx
        s.y += s.vy
        s.r += 0.35
        s.a *= 0.992
        if (s.a < 0.008 || s.y < -40) {
          smoke.splice(i, 1)
          continue
        }
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r)
        g.addColorStop(0, `rgba(140,130,120,${s.a})`)
        g.addColorStop(1, 'rgba(140,130,120,0)')
        ctx.fillStyle = g
        ctx.fillRect(s.x - s.r, s.y - s.r, s.r * 2, s.r * 2)
      }

      // ---- capa luminosa (aditiva) ----
      ctx.globalCompositeOperation = 'lighter'

      // reflejo del arco sobre la superficie implícita (elipse achatada)
      ctx.save()
      ctx.translate(x, y + 5)
      ctx.scale(1, 0.24)
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, 120)
      pool.addColorStop(0, `rgba(255,170,70,${0.08 + 0.2 * weld})`)
      pool.addColorStop(1, 'rgba(255,103,0,0)')
      ctx.fillStyle = pool
      ctx.fillRect(-120, -120, 240, 240)
      ctx.restore()

      // halo cálido + núcleo blanco del arco
      const r = 60 + weld * 110
      const halo = ctx.createRadialGradient(x, y, 0, x, y, r)
      halo.addColorStop(0, `rgba(255,190,90,${0.1 + 0.3 * weld})`)
      halo.addColorStop(1, 'rgba(255,103,0,0)')
      ctx.fillStyle = halo
      ctx.fillRect(x - r, y - r, r * 2, r * 2)

      const core = ctx.createRadialGradient(x, y - 2, 0, x, y - 2, 16)
      core.addColorStop(0, `rgba(255,255,250,${0.5 + weld * 0.5})`)
      core.addColorStop(0.4, `rgba(255,230,170,${0.2 + weld * 0.35})`)
      core.addColorStop(1, 'rgba(255,190,90,0)')
      ctx.fillStyle = core
      ctx.fillRect(x - 16, y - 18, 32, 32)

      // nacen chispas según la intensidad del arco
      const births = weld > 0.75 ? 7 : weld > 0.45 ? 3 : 1
      for (let i = 0; i < births; i++) spawnSpark(x, y - 2)

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.085 // gravedad
        p.vx *= 0.996
        p.life -= p.decay

        // crepitar: algunas chispas se parten en astillas más chicas
        if (p.life > 0.35 && p.size > 0.9 && Math.random() < 0.012) {
          for (let k = 0; k < 2; k++)
            spawnSpark(p.x, p.y, { speed: 1 + Math.random() * 2.5, life: 0.35, decay: 0.03, size: 0.5 })
          p.life -= 0.08
        }

        // rebote contra la superficie implícita
        if (p.vy > 0 && p.y >= y && p.y <= y + 14 && Math.abs(p.x - x) < 380) {
          if (Math.abs(p.vy) < 1.2) {
            sparks.splice(i, 1)
            continue
          }
          p.y = y - 0.5
          p.vy *= -(0.35 + Math.random() * 0.2)
          p.vx *= 0.75
          p.life -= 0.12
        }

        if (p.life <= 0 || p.y > height + 12) {
          sparks.splice(i, 1)
          continue
        }

        ctx.strokeStyle = sparkStroke(p.life)
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 2.4, p.y - p.vy * 2.4)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(tick)
    }
    document.addEventListener('visibilitychange', onVisibility)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
