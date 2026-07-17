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

// Link de WhatsApp con el nombre del trabajo ya escrito en el mensaje.
export const workWhatsappLink = (title) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hola! Me interesa un trabajo como "${title}". ¿Me pasás más información?`,
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
  image: '/assets/taller.svg', // placeholder — reemplazar por foto real del taller
}

export const SERVICES = [
  { icon: 'Fence', label: 'Portones y accesos' },
  { icon: 'Columns3', label: 'Rejas y cerramientos' },
  { icon: 'TrendingUp', label: 'Escaleras y barandas' },
  { icon: 'Warehouse', label: 'Estructuras metálicas' },
  { icon: 'Armchair', label: 'Muebles industriales' },
  { icon: 'Wrench', label: 'Reparaciones y refuerzos' },
  { icon: 'PencilRuler', label: 'Trabajos personalizados' },
]

// Cada trabajo abre un modal de detalle. `image` es la portada; `gallery` son
// las fotos del detalle (hoy placeholders blueprint — reemplazar por fotos
// reales). `description` y `specs` son contenido conceptual de muestra:
// confirmar los datos reales con Gabriel.
export const WORKS = [
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
  },
]

export const VALUES = {
  // Sección inspirada en el póster de la máscara pintada de Gabriel.
  titleTop: 'El esfuerzo',
  titleAccent: 'de hoy',
  titleBottom: 'construye tu mañana.',
  maskImage: '/assets/mascara.jpg', // máscara pintada de Gabriel, vista 3/4 con espacio negro a la derecha
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

// Easter egg de cumpleaños: el sitio es un regalo de Enzo para su hermano.
// Se abre tocando la máscara pintada 3 veces (está escondido a propósito:
// no hay cursor ni pista visual, así ningún cliente lo activa sin querer).
// Editá libremente el mensaje y la firma.
export const BIRTHDAY = {
  clicksToOpen: 3,
  greeting: 'Feliz cumple',
  name: 'Gabriel',
  message:
    'Este sitio es tu regalo. Lo armé para que New Metals se vea tan sólido como los trabajos que salen de tus manos. Que cada chispa siga construyendo lo que te propongas.',
  signature: '— Enzo',
}
