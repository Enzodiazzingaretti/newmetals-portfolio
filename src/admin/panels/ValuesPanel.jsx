import TextField from '../fields/TextField.jsx'
import ImageField from '../ImageField.jsx'
import IconPicker from '../fields/IconPicker.jsx'
import { VALUE_ICONS } from '../icons.js'

export default function ValuesPanel({ draft, update }) {
  const v = draft.values
  const items = v.items || []
  const setItem = (i, patch) => {
    const n = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it))
    update(['values', 'items'], n)
  }
  return (
    <div>
      <TextField label="Título (línea 1)" value={v.titleTop} onChange={(x) => update(['values', 'titleTop'], x)} placeholder="El esfuerzo" />
      <TextField label="Palabra destacada" value={v.titleAccent} onChange={(x) => update(['values', 'titleAccent'], x)} placeholder="de hoy" hint="Se resalta en color naranja." />
      <ImageField label="Imagen de la máscara" value={v.maskImage} slot="mask" onChange={(url) => update(['values', 'maskImage'], url)} />

      <p className="font-display text-[11px] uppercase tracking-wider2 text-steel/70 mt-5 mb-3">Valores (3)</p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={it.id ?? i} className="border border-line bg-coal p-4">
            <TextField label="Título" value={it.label} onChange={(x) => setItem(i, { label: x })} placeholder="Seguridad" />
            <TextField label="Subtítulo" value={it.sub} onChange={(x) => setItem(i, { sub: x })} placeholder="en cada detalle" />
            <IconPicker options={VALUE_ICONS} value={it.icon} onChange={(name) => setItem(i, { icon: name })} />
          </div>
        ))}
      </div>
    </div>
  )
}
