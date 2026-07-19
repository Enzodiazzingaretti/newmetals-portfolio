import { useEffect } from 'react'

// Mantiene el foco ciclando dentro de un modal: Tab desde el último focusable
// vuelve al primero (y Shift+Tab desde el primero salta al último). Sin esto,
// Tab se escapa hacia el contenido tapado por el overlay.
export default function useFocusTrap(containerRef, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const root = containerRef.current
      if (!root) return
      const nodes = [...root.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')].filter(
        (n) => !n.disabled && n.offsetParent !== null,
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!root.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [containerRef, active])
}
