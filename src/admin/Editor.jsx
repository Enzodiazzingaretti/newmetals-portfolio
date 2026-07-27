import { useEffect, useState, useCallback } from 'react'
import {
  Building2, Home, Info, Wrench, LayoutGrid, Shield, Workflow, Phone,
  Save, Check, Loader2, AlertCircle, LogOut, ExternalLink, SlidersHorizontal,
} from 'lucide-react'
import { getContent, putContent, logout } from './api.js'
import Section from './Section.jsx'
import BrandPanel from './panels/BrandPanel.jsx'
import HeroPanel from './panels/HeroPanel.jsx'
import AboutPanel from './panels/AboutPanel.jsx'
import ServicesPanel from './panels/ServicesPanel.jsx'
import WorksPanel from './panels/WorksPanel.jsx'
import ValuesPanel from './panels/ValuesPanel.jsx'
import ProcessPanel from './panels/ProcessPanel.jsx'
import ContactPanel from './panels/ContactPanel.jsx'

export default function Editor({ onLogout }) {
  const [draft, setDraft] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState('')
  const [loadError, setLoadError] = useState('')
  const [advanced, setAdvanced] = useState(() => {
    try { return localStorage.getItem('admin.advanced') === '1' } catch { return false }
  })

  const toggleAdvanced = useCallback(() => {
    setAdvanced((v) => {
      const next = !v
      try { localStorage.setItem('admin.advanced', next ? '1' : '0') } catch { /* ignore */ }
      return next
    })
  }, [])

  useEffect(() => {
    getContent().then(setDraft).catch(() => setLoadError('No se pudo cargar el contenido.'))
  }, [])

  useEffect(() => {
    if (!dirty) return
    const h = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', h)
    return () => window.removeEventListener('beforeunload', h)
  }, [dirty])

  const update = useCallback((path, value) => {
    setDraft((prev) => {
      const next = structuredClone(prev)
      let obj = next
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]]
      obj[path[path.length - 1]] = value
      return next
    })
    setDirty(true)
    setSaveState('idle')
  }, [])

  async function save() {
    setSaveState('saving')
    try {
      await putContent(draft)
      setDirty(false)
      setSaveState('saved')
    } catch (e) {
      setErrorMsg(e.message)
      setSaveState('error')
    }
  }

  async function doLogout() { await logout().catch(() => {}); onLogout() }

  if (loadError) {
    return (
      <div className="min-h-screen bg-coal grid place-items-center text-center px-6">
        <div>
          <AlertCircle size={28} className="text-ember mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-bone">{loadError}</p>
          <p className="text-steel text-sm mt-1">Recargá la página o volvé a entrar.</p>
        </div>
      </div>
    )
  }
  if (!draft) {
    return (
      <div className="min-h-screen bg-coal grid place-items-center text-steel">
        <Loader2 size={26} className="animate-spin text-ember" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coal text-bone">
      <header className="sticky top-0 z-20 bg-coal/90 backdrop-blur border-b border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-light.svg" alt="New Metals" className="h-6 w-auto" />
            <div className="leading-tight">
              <h1 className="font-display text-lg uppercase tracking-wider2 text-bone">Panel</h1>
              <p className="font-display text-[10px] uppercase tracking-wider3 text-steel">New Metals</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <SaveStatus dirty={dirty} state={saveState} error={errorMsg} />
            <button
              onClick={save}
              disabled={!dirty || saveState === 'saving'}
              className="inline-flex items-center gap-2 bg-ember text-coal px-4 py-2.5 text-sm font-display font-semibold uppercase tracking-wider2 transition-colors disabled:opacity-40 hover:bg-spark"
            >
              {saveState === 'saving' ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} strokeWidth={1.75} />}
              Publicar
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Ver el sitio"
              className="grid place-items-center w-10 h-10 border border-line text-steel hover:text-ember hover:border-ember/50 transition-colors"
            >
              <ExternalLink size={16} strokeWidth={1.5} />
            </a>
            <button
              onClick={doLogout}
              title="Salir"
              className="grid place-items-center w-10 h-10 border border-line text-steel hover:text-ember hover:border-ember/50 transition-colors"
            >
              <LogOut size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="font-display text-2xl uppercase tracking-wider2 text-bone">Contenido del sitio</h2>
          <p className="text-steel text-sm mt-1">
            Editá todo desde acá. Al publicar, los cambios se ven en el sitio en ~1 minuto.
          </p>
        </div>

        {/* Contenido esencial: siempre visible */}
        <div className="space-y-4">
          <Section title="Marca y contacto" subtitle="Nombre, teléfono, WhatsApp y redes" icon={Building2} defaultOpen>
            <BrandPanel draft={draft} update={update} advanced={advanced} />
          </Section>
          <Section title="Sobre nosotros" subtitle="Texto de presentación y foto" icon={Info}>
            <AboutPanel draft={draft} update={update} />
          </Section>
          <Section title="Servicios" subtitle="Lo que ofrecen" icon={Wrench}>
            <ServicesPanel draft={draft} update={update} />
          </Section>
          <Section title="Trabajos" subtitle="Proyectos, fotos y fichas técnicas" icon={LayoutGrid}>
            <WorksPanel draft={draft} update={update} />
          </Section>
          <Section title="Proceso" subtitle="Cómo trabajan, paso a paso" icon={Workflow}>
            <ProcessPanel draft={draft} update={update} />
          </Section>
          <Section title="Contacto" subtitle="Bloque final de la página" icon={Phone}>
            <ContactPanel draft={draft} update={update} />
          </Section>
        </div>

        {/* Interruptor de opciones avanzadas */}
        <div className="mt-8 pt-2">
          <button
            type="button"
            onClick={toggleAdvanced}
            aria-expanded={advanced}
            className="w-full flex items-center gap-3 border border-dashed border-line bg-panel/40 px-5 py-3.5 text-left transition-colors hover:border-steel/40"
          >
            <span className="grid place-items-center w-9 h-9 shrink-0 bg-coal border border-line text-ember">
              <SlidersHorizontal size={16} strokeWidth={1.5} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-display text-sm uppercase tracking-wider2 text-bone">
                {advanced ? 'Ocultar opciones avanzadas' : 'Mostrar opciones avanzadas'}
              </span>
              <span className="block text-[12px] text-steel/80 mt-0.5">
                Portada (inicio), sección de valores y ajustes técnicos.
              </span>
            </span>
            <span className={`relative w-11 h-6 shrink-0 transition-colors duration-300 ${advanced ? 'bg-ember' : 'bg-line'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-bone transition-transform duration-300 ${advanced ? 'translate-x-5' : ''}`} />
            </span>
          </button>
        </div>

        {/* Opciones avanzadas */}
        {advanced && (
          <div className="space-y-4 mt-4">
            <Section title="Portada (inicio)" subtitle="Palabras y título de la pantalla principal" icon={Home}>
              <HeroPanel draft={draft} update={update} />
            </Section>
            <Section title="Valores" subtitle="Máscara, lema y valores destacados" icon={Shield}>
              <ValuesPanel draft={draft} update={update} />
            </Section>
          </div>
        )}
      </main>
    </div>
  )
}

function SaveStatus({ dirty, state, error }) {
  if (state === 'saving') {
    return <span className="hidden sm:inline text-sm text-steel">Publicando…</span>
  }
  if (state === 'error') {
    return (
      <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-ember" title={error}>
        <AlertCircle size={14} /> Error al publicar
      </span>
    )
  }
  if (state === 'saved' && !dirty) {
    return (
      <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-ember">
        <Check size={14} /> Publicado
      </span>
    )
  }
  if (dirty) {
    return (
      <span className="hidden sm:inline-flex items-center gap-2 text-sm text-steel">
        <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Cambios sin publicar
      </span>
    )
  }
  return null
}
