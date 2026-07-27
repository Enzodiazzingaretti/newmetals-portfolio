import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'
import ImageField from '../ImageField.jsx'

export default function AboutPanel({ draft, update }) {
  const a = draft.about
  return (
    <div>
      <TextField label="Etiqueta" value={a.kicker} onChange={(v) => update(['about', 'kicker'], v)} placeholder="Sobre nosotros" />
      <TextField label="Título" value={a.title} onChange={(v) => update(['about', 'title'], v)} />
      <TextArea label="Texto" value={a.copy} onChange={(v) => update(['about', 'copy'], v)} rows={5} />
      <ImageField label="Foto del taller" value={a.image} slot="about" onChange={(url) => update(['about', 'image'], url)} />
    </div>
  )
}
