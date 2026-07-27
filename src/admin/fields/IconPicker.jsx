import { ICONS } from '../../components/icons.js'

// Selector de íconos: `options` es una lista de nombres que existen en ICONS.
export default function IconPicker({ label = 'Ícono', options, value, onChange }) {
  return (
    <div className="mb-4">
      <span className="block font-display text-[11px] uppercase tracking-wider2 text-steel mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((name) => {
          const Ico = ICONS[name]
          if (!Ico) return null
          const active = value === name
          return (
            <button
              key={name}
              type="button"
              aria-label={name}
              aria-pressed={active}
              onClick={() => onChange(name)}
              className={`grid place-items-center w-11 h-11 border transition-colors ${
                active
                  ? 'border-ember bg-ember/15 text-ember'
                  : 'border-line text-steel hover:text-bone hover:border-steel'
              }`}
            >
              <Ico size={18} strokeWidth={1.5} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
