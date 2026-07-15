// Todo el contenido editable del sitio vive acá.
// NOTA: teléfono / instagram son placeholders del mockup — reemplazar por los reales de Gabriel.

export const BRAND = {
  name: 'New Metals',
  tagline: 'Fabricación y soldadura metálica a medida. Calidad, resistencia y precisión en cada proyecto.',
  location: 'Mendoza, Argentina',
  phone: '+54 9 261 123 4567',
  whatsapp: '5492611234567',
  instagram: '@newmetals.ok',
  instagramUrl: 'https://instagram.com/newmetals.ok',
  hours: 'Lunes a Viernes · 8:00 - 18:00 hs',
}

export const WHATSAPP_LINK = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
  'Hola! Quiero pedir un presupuesto.',
)}`

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export const HERO = {
  kicker: ['Calidad', 'Resistencia', 'Precisión'],
  title: ['Fabricación y', 'soldadura', 'metálica a medida'],
  copy: 'Creamos estructuras metálicas pensadas para durar. Cada proyecto, hecho con compromiso y atención al detalle.',
  cta: 'Solicitar presupuesto',
}

export const ABOUT = {
  kicker: 'Sobre nosotros',
  title: 'Diseñamos. Fabricamos. Construimos con fuerza.',
  copy: 'En New Metals transformamos ideas en estructuras reales. Trabajamos cada proyecto con compromiso, materiales de calidad y atención al detalle para garantizar resultados sólidos y duraderos.',
  image: '', // foto del taller / escalera — dejar '' para placeholder
}

export const SERVICES = [
  { icon: 'Fence', label: 'Portones y accesos' },
  { icon: 'AlignVerticalJustifyEnd', label: 'Rejas y cerramientos' },
  { icon: 'TrendingUp', label: 'Escaleras y barandas' },
  { icon: 'Box', label: 'Estructuras metálicas' },
  { icon: 'Armchair', label: 'Muebles industriales' },
  { icon: 'Wrench', label: 'Reparaciones y refuerzos' },
  { icon: 'Sparkles', label: 'Trabajos personalizados' },
]

export const WORKS = [
  { title: 'Portón corredizo', meta: 'Acero · Mendoza', image: '' },
  { title: 'Escalera metálica', meta: 'Hierro · Interior', image: '' },
  { title: 'Estructura pérgola', meta: 'Acero · Exterior', image: '' },
  { title: 'Mesa industrial', meta: 'Hierro y Madera', image: '' },
  { title: 'Baranda metálica', meta: 'Hierro · Exterior', image: '' },
]

export const VALUES = {
  // Sección inspirada en el póster de la máscara pintada de Gabriel.
  titleTop: 'El esfuerzo',
  titleAccent: 'de hoy',
  titleBottom: 'construye tu mañana.',
  maskImage: '/assets/mascara.jpg', // foto real de la máscara pintada — poner el archivo en public/assets/
  items: [
    { icon: 'Shield', label: 'Seguridad', sub: 'en cada detalle' },
    { icon: 'Settings', label: 'Calidad', sub: 'que se nota' },
    { icon: 'Handshake', label: 'Responsabilidad', sub: 'que nos define' },
  ],
}

export const PROCESS = {
  kicker: 'Proceso de trabajo',
  title: 'Así trabajamos',
  steps: [
    {
      icon: 'MessageSquareText',
      title: 'Contanos qué necesitás',
      copy: 'Charlamos tu idea y los detalles del proyecto.',
    },
    {
      icon: 'FileText',
      title: 'Te pasamos un presupuesto',
      copy: 'Evaluamos el trabajo y te enviamos la mejor propuesta.',
    },
    {
      icon: 'Flame',
      title: 'Fabricamos',
      copy: 'Nos encargamos de cada proceso con precisión y calidad.',
    },
    {
      icon: 'CircleCheckBig',
      title: 'Instalamos',
      copy: 'Entregamos e instalamos asegurando un trabajo firme y seguro.',
    },
  ],
}

export const CONTACT = {
  title: '¿Tenés un proyecto en mente?',
  copy: 'Escribinos y hagámoslo realidad.',
  cta: 'Escribinos por WhatsApp',
}
