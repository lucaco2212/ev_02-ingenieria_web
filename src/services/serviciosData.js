// Arreglo temporal centralizado de servicios profesionales de la Región de Ñuble
// Nota: en la Etapa 8 este archivo se reemplazará por una petición fetch() a una API o JSON local

export const serviciosData = [
  {
    id: 1,
    nombre: 'Asesoría Legal y Redacción de Contratos',
    categoria: 'Legal',
    descripcion: 'Servicio jurídico integral para personas naturales y pymes de Ñuble. Especialidad en contratos comerciales, derecho civil, arriendos y representación legal presencial en tribunales de Chillán y comunas aledañas.',
    precio: 45000,
    disponible: true,
  },
  {
    id: 2,
    nombre: 'Declaración de Renta y Asesoría Tributaria',
    categoria: 'Contabilidad',
    descripcion: 'Contador auditor colegiado con más de 10 años de trayectoria asesorando a micro y pequeñas empresas agrícolas, comerciales y de servicios en San Carlos y Chillán. Balances anuales, F29 mensual y planificación tributaria.',
    precio: 35000,
    disponible: true,
  },
  {
    id: 3,
    nombre: 'Diseño y Regularización de Planos',
    categoria: 'Arquitectura',
    descripcion: 'Arquitecto colegiado experto en regularizaciones municipales bajo la Ley del Mono, loteos rurales y desarrollo de proyectos habitacionales completos con planimetría y tramitación en direcciones de obras de Ñuble.',
    precio: 85000,
    disponible: false, // Temporalmente no disponible
  },
  {
    id: 4,
    nombre: 'Atención Psicológica Clínica para Adultos',
    categoria: 'Salud',
    descripcion: 'Psicoterapia profesional individual orientada a manejo de ansiedad, estrés laboral, depresión y duelo. Modalidad presencial en consulta céntrica de Chillán y sesiones complementarias por videollamada.',
    precio: 32000,
    disponible: true,
  },
  {
    id: 5,
    nombre: 'Instalación y Certificación Eléctrica SEC',
    categoria: 'Técnico',
    descripcion: 'Instalador eléctrico certificado Clase B ante la Superintendencia de Electricidad y Combustibles (SEC). Planos eléctricos T1, aumento de capacidad, cableado nuevo y mantención preventiva en Chillán Viejo.',
    precio: 50000,
    disponible: false, // Temporalmente no disponible
  },
  {
    id: 6,
    nombre: 'Diseño de Sitios Web y Tiendas Online',
    categoria: 'Tecnología',
    descripcion: 'Desarrollo web a la medida utilizando tecnologías modernas y responsivas. Optimización para motores de búsqueda (SEO local para Ñuble), catálogos digitales interactivos y pasarelas de pago chilenas.',
    precio: 95000,
    disponible: true,
  },
]
