<script setup>
// [COMPUTED & REF] Importamos ref para el estado reactivo y computed para propiedades computadas
import { ref, computed } from 'vue'
import ServicioCard from '../components/ServicioCard.vue'

// Arreglo reactivo temporal de servicios profesionales en la Región de Ñuble
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

// Variables reactivas vinculadas mediante v-model a los campos del formulario
const busqueda = ref('')
const categoriaSeleccionada = ref('Todas')

// [COMPUTED 1] Generación dinámica de la lista única de categorías desde los datos disponibles
const categorias = computed(() => {
  // Extraemos las categorías únicas usando Set a partir del arreglo de servicios
  const listaCategorias = servicios.value.map((s) => s.categoria)
  return [...new Set(listaCategorias)]
})

// [COMPUTED 2] Filtro combinado de búsqueda por nombre y categoría
const serviciosFiltrados = computed(() => {
  const termino = busqueda.value.toLowerCase().trim()

  return servicios.value.filter((servicio) => {
    // 1. Filtro por nombre (insensible a mayúsculas/minúsculas)
    const coincideNombre = servicio.nombre.toLowerCase().includes(termino)

    // 2. Filtro por categoría ('Todas' o coincidencia exacta con la categoría seleccionada)
    const coincideCategoria =
      categoriaSeleccionada.value === 'Todas' ||
      servicio.categoria === categoriaSeleccionada.value

    // Deben cumplirse ambos filtros simultáneamente
    return coincideNombre && coincideCategoria
  })
})
</script>

<template>
  <section class="servicios-container">
    <div class="servicios-header">
      <h1>Catálogo de Servicios Profesionales</h1>
      <p>
        Encuentra especialistas verificados en Chillán, San Carlos y las 21 comunas de la Región de Ñuble.
      </p>
    </div>

    <!-- Barra de filtros y búsqueda -->
    <div class="filtros-container">
      <!-- [V-MODEL 1]: Enlace bidireccional entre el input de texto y la variable ref 'busqueda' -->
      <div class="filtro-campo">
        <label for="buscar-nombre" class="filtro-label">Buscar por nombre:</label>
        <input
          id="buscar-nombre"
          v-model="busqueda"
          type="text"
          placeholder="Ej: abogado, contador, web..."
          class="filtro-input"
        />
      </div>

      <!-- [V-MODEL 2]: Enlace bidireccional entre el select y la variable ref 'categoriaSeleccionada' -->
      <div class="filtro-campo">
        <label for="filtrar-categoria" class="filtro-label">Filtrar por categoría:</label>
        <select
          id="filtrar-categoria"
          v-model="categoriaSeleccionada"
          class="filtro-select"
        >
          <option value="Todas">Todas</option>
          <!-- [V-FOR 1]: Renderizado de las opciones de categoría calculadas dinámicamente -->
          <option
            v-for="cat in categorias"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
      </div>
    </div>

    <!-- [V-IF / V-ELSE]: Condicional según existan o no resultados en serviciosFiltrados -->
    <div v-if="serviciosFiltrados.length > 0" class="servicios-grid">
      <!-- [V-FOR 2]: Renderizado iterativo de las tarjetas con la lista computada filtrada -->
      <ServicioCard
        v-for="servicio in serviciosFiltrados"
        :key="servicio.id"
        :servicio="servicio"
      />
    </div>

    <!-- Mensaje cuando no hay resultados que coincidan con la búsqueda o filtro -->
    <div v-else class="sin-resultados">
      <p>No se encontraron servicios para los criterios seleccionados.</p>
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

/* Panel de Filtros */
.filtros-container {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
}

.filtro-campo {
  flex: 1;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.filtro-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.filtro-input,
.filtro-select {
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--color-text);
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filtro-input:focus,
.filtro-select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

/* Grilla de resultados */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Estado vacío cuando no hay resultados */
.sin-resultados {
  background-color: var(--color-card-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  padding: 3rem 1.5rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}
</style>
