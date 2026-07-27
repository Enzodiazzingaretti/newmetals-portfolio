import { useState } from 'react'
import { ImagePlus, ArrowLeft, ArrowRight, X, Loader2 } from 'lucide-react'
import { compressImage } from '../lib/compressImage.js'
import { uploadImage } from './api.js'
import { move, removeAt } from './ReorderableList.jsx'

const SOFT_MAX = 20

export default function GalleryField({ slot, images, onChange }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function onFiles(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setBusy(true); setError('')
    try {
      const uploaded = []
      for (const f of files) {
        const dataUrl = await compressImage(f)
        const res = await uploadImage(slot, dataUrl)
        uploaded.push(res.url)
      }
      onChange([...(images || []), ...uploaded])
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  const list = images || []
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-display text-[11px] uppercase tracking-wider2 text-steel">
          Galería · <span className="text-bone/80 tabular-nums">{list.length}</span>
        </span>
        {list.length >= SOFT_MAX && (
          <span className="text-ember/90 text-[11px]">Conviene no pasar de {SOFT_MAX}.</span>
        )}
      </div>

      {list.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
          {list.map((url, i) => (
            <div key={url + i} className="relative group aspect-square overflow-hidden border border-line">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-coal/85 via-coal/20 to-coal/40">
                <button
                  type="button" aria-label="Mover antes"
                  onClick={() => onChange(move(list, i, i - 1))}
                  className="grid place-items-center w-6 h-6 bg-coal/70 text-bone hover:text-ember disabled:opacity-30"
                  disabled={i === 0}
                >
                  <ArrowLeft size={13} />
                </button>
                <button
                  type="button" aria-label="Quitar"
                  onClick={() => onChange(removeAt(list, i))}
                  className="grid place-items-center w-6 h-6 bg-coal/70 text-bone hover:text-ember"
                >
                  <X size={13} />
                </button>
                <button
                  type="button" aria-label="Mover después"
                  onClick={() => onChange(move(list, i, i + 1))}
                  className="grid place-items-center w-6 h-6 bg-coal/70 text-bone hover:text-ember disabled:opacity-30"
                  disabled={i === list.length - 1}
                >
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex items-center gap-2 border border-ember/40 text-ember px-4 py-2.5 text-sm cursor-pointer hover:border-ember/70 hover:bg-ember/5 transition-colors">
        {busy ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} strokeWidth={1.75} />}
        {busy ? 'Subiendo…' : 'Agregar fotos'}
        <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} disabled={busy} />
      </label>
      {error && <p className="text-ember text-sm mt-2">{error}</p>}
    </div>
  )
}
