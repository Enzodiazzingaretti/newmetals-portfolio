import ReorderableList from '../ReorderableList.jsx'
import TextField from '../fields/TextField.jsx'
import IconPicker from '../fields/IconPicker.jsx'
import { SERVICE_ICONS } from '../icons.js'

export default function ServicesPanel({ draft, update }) {
  return (
    <ReorderableList
      items={draft.services}
      onChange={(arr) => update(['services'], arr)}
      addLabel="Agregar servicio"
      newItem={() => ({ id: 'srv-' + Date.now(), label: '', icon: 'Wrench', enabled: true })}
      renderItem={(item, patch) => (
        <div>
          <TextField label="Nombre" value={item.label} onChange={(v) => patch({ label: v })} placeholder="Portones y accesos" />
          <IconPicker options={SERVICE_ICONS} value={item.icon} onChange={(name) => patch({ icon: name })} />
        </div>
      )}
    />
  )
}
