import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'

export default function ContactPanel({ draft, update }) {
  const c = draft.contact
  return (
    <div>
      <TextField label="Título" value={c.title} onChange={(v) => update(['contact', 'title'], v)} placeholder="¿Tenés un proyecto en mente?" />
      <TextArea label="Texto" value={c.copy} onChange={(v) => update(['contact', 'copy'], v)} rows={2} />
      <TextField label="Botón (texto)" value={c.cta} onChange={(v) => update(['contact', 'cta'], v)} placeholder="Escribinos por WhatsApp" />
    </div>
  )
}
