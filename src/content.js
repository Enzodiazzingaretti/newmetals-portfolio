// Defaults embebidos: el sitio nunca queda en blanco aunque falle el fetch.
// La fuente de verdad editable es public/content.json (mismo shape).
export const DEFAULTS = {
  brand: {
    name: 'New Metals',
    tagline: 'Fabricación y soldadura metálica a medida. Calidad, resistencia y precisión en cada proyecto.',
    location: 'Tupungato, Mendoza, Argentina',
    phone: '+54 9 2615 26-4634',
    whatsapp: '5492615264634',
    instagram: '@newmetals.ok',
    instagramUrl: 'https://instagram.com/newmetals.ok',
    hours: 'Lunes a Viernes · 8:00 - 18:00 hs',
  },
  // Navegación: estructural, no se edita desde el panel.
  nav: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Trabajos', href: '#trabajos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ],
  hero: {
    kicker: ['Calidad', 'Resistencia', 'Precisión'],
    title: ['Fabricación y', 'soldadura', 'metálica a medida'],
    copy: 'Creamos estructuras metálicas pensadas para durar. Cada proyecto, hecho con compromiso y atención al detalle.',
    cta: 'Solicitar presupuesto',
  },
  about: {
    kicker: 'Sobre nosotros',
    title: 'Diseñamos. Fabricamos. Construimos con fuerza.',
    copy: 'En New Metals transformamos ideas en estructuras reales. Trabajamos cada proyecto con compromiso, materiales de calidad y atención al detalle para garantizar resultados sólidos y duraderos.',
    image: '',
  },
  services: [
    { id: 'portones', icon: 'Fence', label: 'Portones y accesos', enabled: true },
    { id: 'rejas', icon: 'Columns3', label: 'Rejas y cerramientos', enabled: true },
    { id: 'escaleras', icon: 'TrendingUp', label: 'Escaleras y barandas', enabled: true },
    { id: 'estructuras', icon: 'Warehouse', label: 'Estructuras metálicas', enabled: true },
    { id: 'muebles', icon: 'Armchair', label: 'Muebles industriales', enabled: true },
    { id: 'reparaciones', icon: 'Wrench', label: 'Reparaciones y refuerzos', enabled: true },
    { id: 'personalizados', icon: 'PencilRuler', label: 'Trabajos personalizados', enabled: true },
  ],
  works: [
    {
      id: 'porton-corredizo',
      title: 'Portón corredizo',
      meta: 'Acero · Mendoza',
      image: '/assets/works/porton.svg',
      gallery: ['/assets/works/porton.svg', '/assets/works/detalle.svg', '/assets/works/montaje.svg'],
      description:
        'Portón corredizo de acero fabricado a medida para el ingreso de una vivienda. Estructura de caño estructural con chapa plegada, pensada para uso diario y preparada para automatización.',
      specs: [
        { label: 'Material', value: 'Caño estructural + chapa plegada' },
        { label: 'Medidas', value: '4,00 × 2,10 m (a medida)' },
        { label: 'Terminación', value: 'Antióxido + esmalte sintético negro' },
        { label: 'Sistema', value: 'Riel inferior con rodamientos reforzados' },
        { label: 'Preparado para', value: 'Motor corredizo (automatización)' },
        { label: 'Plazo estimado', value: '3 a 4 semanas' },
      ],
      enabled: true,
    },
    {
      id: 'escalera-metalica',
      title: 'Escalera metálica',
      meta: 'Hierro · Interior',
      image: '/assets/works/escalera.svg',
      gallery: ['/assets/works/escalera.svg', '/assets/works/detalle.svg', '/assets/works/montaje.svg'],
      description:
        'Escalera interior con estructura de perfil UPN y planchuela. Escalones aptos para revestir en madera y baranda de caño con pasamanos, combinando resistencia y una estética industrial.',
      specs: [
        { label: 'Estructura', value: 'Perfil UPN + planchuela' },
        { label: 'Escalones', value: 'Chapa antideslizante o apto madera' },
        { label: 'Baranda', value: 'Caño redondo con pasamanos' },
        { label: 'Terminación', value: 'Pintura epoxi gris grafito' },
        { label: 'Plazo estimado', value: '2 a 3 semanas' },
      ],
      enabled: true,
    },
    {
      id: 'estructura-pergola',
      title: 'Estructura pérgola',
      meta: 'Acero · Exterior',
      image: '/assets/works/pergola.svg',
      gallery: ['/assets/works/pergola.svg', '/assets/works/detalle.svg', '/assets/works/montaje.svg'],
      description:
        'Pérgola de acero para exterior, con caño estructural y cubierta de listones metálicos. Tratada para intemperie y anclada con platinas, para dar sombra y carácter a patios y quinchos.',
      specs: [
        { label: 'Material', value: 'Caño estructural 100 × 100' },
        { label: 'Cubierta', value: 'Listones metálicos / policarbonato opcional' },
        { label: 'Tratamiento', value: 'Galvanizado en frío + esmalte exterior' },
        { label: 'Medidas', value: '3 × 4 m (a medida)' },
        { label: 'Anclaje', value: 'Platinas con brocas químicas' },
      ],
      enabled: true,
    },
    {
      id: 'mesa-industrial',
      title: 'Mesa industrial',
      meta: 'Hierro y Madera',
      image: '/assets/works/mesa.svg',
      gallery: ['/assets/works/mesa.svg', '/assets/works/detalle.svg', '/assets/works/montaje.svg'],
      description:
        'Mesa de estilo industrial que combina una estructura de hierro con tapa de madera maciza. Una pieza robusta y cálida a la vez, ideal para comedores, oficinas o locales.',
      specs: [
        { label: 'Estructura', value: 'Caño 40 × 40 estilo industrial' },
        { label: 'Tapa', value: 'Madera maciza / paraíso lustrado' },
        { label: 'Terminación', value: 'Hierro negro mate o con óxido sellado' },
        { label: 'Medidas', value: '1,60 × 0,80 m (a medida)' },
        { label: 'Plazo estimado', value: '2 semanas' },
      ],
      enabled: true,
    },
    {
      id: 'baranda-metalica',
      title: 'Baranda metálica',
      meta: 'Hierro · Exterior',
      image: '/assets/works/baranda.svg',
      gallery: ['/assets/works/baranda.svg', '/assets/works/detalle.svg', '/assets/works/montaje.svg'],
      description:
        'Baranda de hierro para balcón o escalera exterior, con diseño de barrotes horizontales. Cumple la altura reglamentaria y se termina galvanizada para resistir la intemperie.',
      specs: [
        { label: 'Material', value: 'Caño y planchuela' },
        { label: 'Diseño', value: 'Barrotes horizontales (a medida)' },
        { label: 'Altura', value: '1,00 m (reglamentaria)' },
        { label: 'Terminación', value: 'Galvanizado + esmalte' },
        { label: 'Anclaje', value: 'Amurado o con platina' },
      ],
      enabled: true,
    },
  ],
  values: {
    titleTop: 'El esfuerzo',
    titleAccent: 'de hoy',
    maskImage: '/assets/mascara.jpg',
    items: [
      { id: 'seguridad', icon: 'Shield', label: 'Seguridad', sub: 'en cada detalle' },
      { id: 'calidad', icon: 'Settings', label: 'Calidad', sub: 'que se nota' },
      { id: 'responsabilidad', icon: 'Handshake', label: 'Responsabilidad', sub: 'que nos define' },
    ],
  },
  process: {
    kicker: 'Proceso de trabajo',
    title: 'Así trabajamos',
    steps: [
      { id: 'contanos', icon: 'MessageSquareText', title: 'Contanos qué necesitás', copy: 'Charlamos tu idea y los detalles del proyecto.', enabled: true },
      { id: 'presupuesto', icon: 'FileText', title: 'Te pasamos un presupuesto', copy: 'Evaluamos el trabajo y te enviamos la mejor propuesta.', enabled: true },
      { id: 'fabricamos', icon: 'Flame', title: 'Fabricamos', copy: 'Nos encargamos de cada proceso con precisión y calidad.', enabled: true },
      { id: 'instalamos', icon: 'CircleCheckBig', title: 'Instalamos', copy: 'Entregamos e instalamos asegurando un trabajo firme y seguro.', enabled: true },
    ],
  },
  contact: {
    title: '¿Tenés un proyecto en mente?',
    copy: 'Escribinos y hagámoslo realidad.',
    cta: 'Escribinos por WhatsApp',
  },
}

// --- Links de WhatsApp (dependen del número de la marca) ---
export const waLink = (whatsapp, text = 'Hola! Quiero pedir un presupuesto.') =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`

export const workWaLink = (whatsapp, title) =>
  waLink(whatsapp, `Hola! Me interesa un trabajo como "${title}". ¿Me pasás más información?`)

export const serviceWaLink = (whatsapp, label) =>
  waLink(whatsapp, `Hola! Quiero consultar por: ${label.toLowerCase()}.`)

// --- Carga del contenido editable ---
function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v)
}

// Merge profundo. Los arrays se reemplazan enteros (para reordenar/borrar desde el panel).
export function mergeContent(defaults, incoming) {
  if (!isObject(incoming)) return defaults
  const out = Array.isArray(defaults) ? [...defaults] : { ...defaults }
  for (const key of Object.keys(incoming)) {
    const dv = defaults ? defaults[key] : undefined
    const iv = incoming[key]
    if (isObject(dv) && isObject(iv)) out[key] = mergeContent(dv, iv)
    else out[key] = iv
  }
  return out
}

export async function loadContent(fetchImpl = fetch) {
  try {
    const res = await fetchImpl('/content.json', { cache: 'no-store' })
    if (!res || !res.ok) return DEFAULTS
    const json = await res.json()
    return mergeContent(DEFAULTS, json)
  } catch {
    return DEFAULTS
  }
}
