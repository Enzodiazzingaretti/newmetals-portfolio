import { useState } from 'react'
import { Lock, LogIn, Loader2, AlertCircle } from 'lucide-react'
import { login } from './api.js'

export default function Login({ onSuccess }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError('')
    try { await login(pw); onSuccess() }
    catch (err) {
      setError(err.message === 'rate_limited' ? 'Demasiados intentos. Esperá unos minutos.' : 'Contraseña incorrecta.')
    } finally { setBusy(false) }
  }

  return (
    <div className="relative min-h-screen grid place-items-center bg-coal px-6 overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] rounded-full bg-ember/10 blur-[120px]" />

      <form onSubmit={submit} className="relative w-full max-w-sm border border-line bg-panel/90 backdrop-blur p-8 text-center">
        <div className="flex justify-center mb-6">
          <img src="/assets/logo-light.svg" alt="New Metals" className="h-8 w-auto" />
        </div>
        <h1 className="font-display text-2xl uppercase tracking-wider2 text-bone">Panel</h1>
        <p className="font-display text-[11px] uppercase tracking-wider3 text-steel mt-1 mb-7">Acceso privado</p>

        <div className="relative text-left">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel/60" strokeWidth={1.5} />
          <input
            type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder="Contraseña" autoFocus aria-label="Contraseña"
            className="w-full bg-coal border border-line pl-11 pr-4 py-3 text-bone placeholder-steel/50 outline-none transition-colors focus:border-ember"
          />
        </div>

        {error && (
          <p className="flex items-center justify-center gap-1.5 text-ember text-sm mt-3">
            <AlertCircle size={14} /> {error}
          </p>
        )}

        <button
          type="submit" disabled={busy}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-ember text-coal font-display font-semibold uppercase tracking-wider2 py-3 transition-colors hover:bg-spark disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} strokeWidth={1.75} />}
          {busy ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
