import TextField from '../fields/TextField.jsx'
import TextArea from '../fields/TextArea.jsx'

export default function BrandPanel({ draft, update, advanced = false }) {
  const b = draft.brand
  return (
    <div>
      <TextField label="Nombre" value={b.name} onChange={(v) => update(['brand', 'name'], v)} />
      <TextArea label="Frase / lema" value={b.tagline} onChange={(v) => update(['brand', 'tagline'], v)} rows={2} hint="Aparece en el pie de página." />
      <TextField label="Teléfono (visible)" value={b.phone} onChange={(v) => update(['brand', 'phone'], v)} placeholder="+54 9 2615 ..." />
      <TextField
        label="WhatsApp (solo números)"
        value={b.whatsapp}
        onChange={(v) => update(['brand', 'whatsapp'], v)}
        placeholder="5492615264634"
        hint="Con código de país, sin espacios ni signos. Con esto se arman todos los botones de WhatsApp."
      />
      <TextField label="Instagram (usuario)" value={b.instagram} onChange={(v) => update(['brand', 'instagram'], v)} placeholder="@newmetals.ok" />
      <TextField label="Ubicación" value={b.location} onChange={(v) => update(['brand', 'location'], v)} />
      <TextField label="Horarios" value={b.hours} onChange={(v) => update(['brand', 'hours'], v)} placeholder="Lunes a Viernes · 8:00 - 18:00 hs" />

      {advanced && (
        <div className="mt-5 pt-5 border-t border-line">
          <p className="font-display text-[11px] uppercase tracking-wider2 text-steel/70 mb-3">Técnico</p>
          <TextField
            label="Link de Instagram"
            value={b.instagramUrl}
            onChange={(v) => update(['brand', 'instagramUrl'], v)}
            placeholder="https://instagram.com/newmetals.ok"
            hint="El enlace real que abre el perfil al tocar el ícono."
          />
        </div>
      )}
    </div>
  )
}
