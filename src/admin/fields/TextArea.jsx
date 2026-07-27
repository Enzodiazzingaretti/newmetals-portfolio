export default function TextArea({ label, value, onChange, placeholder, rows = 4, hint }) {
  return (
    <label className="block mb-5">
      <span className="block font-display text-[11px] uppercase tracking-wider2 text-steel mb-1.5">{label}</span>
      <textarea
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-coal border border-line px-4 py-2.5 text-bone placeholder-steel/50 outline-none transition-colors resize-y leading-relaxed focus:border-ember"
      />
      {hint && <span className="block text-[11px] text-steel/70 mt-1.5">{hint}</span>}
    </label>
  )
}
