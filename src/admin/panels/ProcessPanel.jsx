import ReorderableList from '../ReorderableList.jsx'
import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'
import IconPicker from '../fields/IconPicker.jsx'
import { PROCESS_ICONS } from '../icons.js'

export default function ProcessPanel({ draft, update }) {
  const p = draft.process
  return (
    <div>
      <TextField label="Etiqueta" value={p.kicker} onChange={(v) => update(['process', 'kicker'], v)} placeholder="Proceso de trabajo" />
      <TextField label="Título" value={p.title} onChange={(v) => update(['process', 'title'], v)} placeholder="Así trabajamos" />

      <p className="font-display text-[11px] uppercase tracking-wider2 text-steel/70 mt-5 mb-3">Pasos</p>
      <ReorderableList
        items={p.steps}
        onChange={(arr) => update(['process', 'steps'], arr)}
        addLabel="Agregar paso"
        newItem={() => ({ id: 'stp-' + Date.now(), icon: 'CircleCheckBig', title: '', copy: '', enabled: true })}
        renderItem={(item, patch) => (
          <div>
            <TextField label="Título" value={item.title} onChange={(v) => patch({ title: v })} />
            <TextArea label="Descripción" value={item.copy} onChange={(v) => patch({ copy: v })} rows={2} />
            <IconPicker options={PROCESS_ICONS} value={item.icon} onChange={(name) => patch({ icon: name })} />
          </div>
        )}
      />
    </div>
  )
}
