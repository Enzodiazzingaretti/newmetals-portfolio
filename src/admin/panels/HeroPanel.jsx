import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'

export default function HeroPanel({ draft, update }) {
  const h = draft.hero
  const kicker = Array.isArray(h.kicker) ? h.kicker.join(', ') : ''
  const title = Array.isArray(h.title) ? h.title.join('\n') : ''
  return (
    <div>
      <TextField
        label="Palabras destacadas"
        value={kicker}
        onChange={(v) => update(['hero', 'kicker'], v.split(',').map((s) => s.trim()).filter(Boolean))}
        placeholder="Calidad, Resistencia, Precisión"
        hint="Separadas por coma. Se muestran arriba del título."
      />
      <TextArea
        label="Título principal"
        value={title}
        onChange={(v) => update(['hero', 'title'], v.split('\n').map((s) => s.trim()).filter(Boolean))}
        rows={3}
        hint="Un renglón por línea del título."
      />
      <TextArea label="Texto de bienvenida" value={h.copy} onChange={(v) => update(['hero', 'copy'], v)} rows={3} />
      <TextField label="Botón (texto)" value={h.cta} onChange={(v) => update(['hero', 'cta'], v)} placeholder="Solicitar presupuesto" />
    </div>
  )
}
