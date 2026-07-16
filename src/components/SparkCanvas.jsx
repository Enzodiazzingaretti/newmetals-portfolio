import { useEffect, useRef } from 'react'

// Chispas de soldadura: partículas que brotan de un punto de soldadura,
// con gravedad y estela. Además escribe la variable CSS --weld (0..1) en el
// contenedor padre para que el fogonazo "revele" la máscara del hero.
export default function SparkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    const particles = []

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
    const emitter = () =>
      width < 640
        ? { x: width * 0.78, y: height * 0.74 }
        : { x: width * 0.56, y: height * 0.66 }

    const spawn = () => {
      const { x, y } = emitter()
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4
      const speed = 1.5 + Math.random() * 4.5
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.02,
        size: 0.6 + Math.random() * 1.6,
      })
    }

    // fogonazo de soldadura: valor suavizado que persigue un objetivo aleatorio,
    // con ráfagas intensas ocasionales — ilumina el glow, las chispas y la máscara
    let weld = 0.5
    let weldTarget = 0.5
    let retarget = 0
    const tick = () => {
      ctx.clearRect(0, 0, width, height)

      if (--retarget <= 0) {
        weldTarget = Math.random() < 0.22 ? 0.85 + Math.random() * 0.15 : 0.25 + Math.random() * 0.5
        retarget = 6 + Math.floor(Math.random() * 22)
      }
      weld += (weldTarget - weld) * 0.12
      host.style.setProperty('--weld', weld.toFixed(3))

      // punto de soldadura: núcleo brillante que pulsa con el fogonazo
      const { x, y } = emitter()
      const r = 70 + weld * 90
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r)
      glow.addColorStop(0, `rgba(255, 224, 170, ${0.30 + 0.45 * weld})`)
      glow.addColorStop(0.25, `rgba(255, 130, 30, ${0.15 + 0.28 * weld})`)
      glow.addColorStop(1, 'rgba(255, 103, 0, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(x - r, y - r, r * 2, r * 2)

      const births = weld > 0.7 ? 6 : weld > 0.4 ? 4 : 2
      for (let i = 0; i < births; i++) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.07 // gravedad
        p.vx *= 0.995
        p.life -= p.decay
        if (p.life <= 0 || p.y > height + 10) {
          particles.splice(i, 1)
          continue
        }
        const warm = p.life > 0.55
        ctx.strokeStyle = warm
          ? `rgba(255, ${170 + Math.floor(60 * p.life)}, 80, ${p.life})`
          : `rgba(255, 103, 0, ${p.life * 0.9})`
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

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
