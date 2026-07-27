import { Trash2, Plus } from 'lucide-react'
import ReorderableList, { removeAt } from '../ReorderableList.jsx'
import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'
import ImageField from '../ImageField.jsx'
import GalleryField from '../GalleryField.jsx'

// El slot va a un nombre de archivo en el repo: solo [a-z0-9-].
const slug = (id) => String(id).toLowerCase().replace(/[^a-z0-9-]/g, '-')

// Editor de la ficha técnica: filas de dato + valor.
function SpecsEditor({ specs, onChange }) {
  const list = specs || []
  const setRow = (i, patch) => { const n = [...list]; n[i] = { ...n[i], ...patch }; onChange(n) }
  return (
    <div className="mt-1">
      <span className="block font-display text-[11px] uppercase tracking-wider2 text-steel mb-2">Ficha técnica</span>
      <div className="space-y-2">
        {list.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={row.label ?? ''}
              onChange={(e) => setRow(i, { label: e.target.value })}
              placeholder="Dato (ej. Material)"
              className="w-2/5 bg-coal border border-line px-3 py-2 text-bone placeholder-steel/50 outline-none transition-colors focus:border-ember"
            />
            <input
              value={row.value ?? ''}
              onChange={(e) => setRow(i, { value: e.target.value })}
              placeholder="Valor (ej. Caño estructural)"
              className="flex-1 bg-coal border border-line px-3 py-2 text-bone placeholder-steel/50 outline-none transition-colors focus:border-ember"
            />
            <button
              type="button" aria-label="Quitar dato"
              onClick={() => onChange(removeAt(list, i))}
              className="grid place-items-center w-8 h-8 shrink-0 border border-line text-steel hover:text-ember hover:border-ember/50 transition-colors"
            >
              <Trash2 size={14} strokeWidth={1.75} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...list, { label: '', value: '' }])}
        className="mt-2 w-full flex items-center justify-center gap-2 border border-dashed border-line text-steel py-2 text-xs hover:border-ember/60 hover:text-ember transition-colors"
      >
        <Plus size={14} strokeWidth={1.75} /> Agregar dato
      </button>
    </div>
  )
}

export default function WorksPanel({ draft, update }) {
  return (
    <ReorderableList
      items={draft.works}
      onChange={(arr) => update(['works'], arr)}
      addLabel="Agregar trabajo"
      newItem={() => ({ id: 'work-' + Date.now(), title: '', meta: '', image: '', gallery: [], description: '', specs: [], enabled: true })}
      renderItem={(item, patch) => {
        const s = slug(item.id)
        return (
          <div>
            <TextField label="Título" value={item.title} onChange={(v) => patch({ title: v })} placeholder="Portón corredizo" />
            <TextField label="Etiqueta corta" value={item.meta} onChange={(v) => patch({ meta: v })} placeholder="Acero · Mendoza" />
            <TextArea label="Descripción" value={item.description} onChange={(v) => patch({ description: v })} rows={3} />
            <ImageField label="Foto de portada" value={item.image} slot={'work-' + s} onChange={(url) => patch({ image: url })} />
            <GalleryField slot={'gal-' + s} images={item.gallery} onChange={(gallery) => patch({ gallery })} />
            <div className="mt-4">
              <SpecsEditor specs={item.specs} onChange={(specs) => patch({ specs })} />
            </div>
          </div>
        )
      }}
    />
  )
}
