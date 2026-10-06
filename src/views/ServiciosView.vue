<script setup>
import { ref } from 'vue'
import ServicioCard from '../components/ServicioCard.vue'

// Arreglo temporal de servicios profesionales en la Región de Ñuble
// Nota: en la Etapa 8 este arreglo se reemplazará por una petición fetch()
const servicios = ref([
  {
    id: 1,
    nombre: 'Asesoría Legal y Redacción de Contratos',
    categoria: 'Legal',
    descripcion: 'Atención presencial en Chillán y asesoría online para personas y empresas de la región.',
    precio: 45000,
    disponible: true,
  },
  {
    id: 2,
    nombre: 'Declaración de Renta y Asesoría Tributaria',
    categoria: 'Contabilidad',
    descripcion: 'Contador auditor con experiencia en pymes comerciales y agrícolas de San Carlos.',
    precio: 35000,
    disponible: true,
  },
  {
    id: 3,
    nombre: 'Diseño y Regularización de Planos',
    categoria: 'Arquitectura',
    descripcion: 'Arquitecto colegiado para loteos y regularizaciones municipales en Ñuble.',
    precio: 85000,
    disponible: false, // Servicio actualmente no disponible
  },
  {
    id: 4,
    nombre: 'Atención Psicológica Clínica para Adultos',
    categoria: 'Salud',
    descripcion: 'Psicoterapia presencial en Chillán con enfoque cognitivo-conductual.',
    precio: 32000,
    disponible: true,
  },
  {
    id: 5,
    nombre: 'Instalación y Certificación Eléctrica SEC',
    categoria: 'Técnico',
    descripcion: 'Técnico electricista certificado para viviendas particulares y locales en Chillán Viejo.',
    precio: 50000,
    disponible: false, // Servicio actualmente no disponible
  },
  {
    id: 6,
    nombre: 'Diseño de Sitios Web y Tiendas Online',
    categoria: 'Tecnología',
    descripcion: 'Desarrollo web moderno y adaptable a móviles para emprendimientos locales.',
    precio: 95000,
    disponible: true,
  },
])
</script>

<template>
  <section class="servicios-container">
    <div class="servicios-header">
      <h1>Catálogo de Servicios Profesionales</h1>
      <p>
        Encuentra especialistas verificados en Chillán, San Carlos y las 21 comunas de la Región de Ñuble.
      </p>
    </div>

    <!-- Renderizado dinámico de tarjetas utilizando v-for con clave única :key -->
    <div class="servicios-grid">
      <ServicioCard
        v-for="servicio in servicios"
        :key="servicio.id"
        :servicio="servicio"
      />
    </div>
  </section>
</template>

<style scoped>
.servicios-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.servicios-header {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow);
}

.servicios-header h1 {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.servicios-header p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

/* Grilla responsive para las tarjetas de servicios */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
