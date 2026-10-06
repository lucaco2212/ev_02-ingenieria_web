<script setup>
// [COMPUTED & REF] Importamos ref para el estado reactivo y computed para propiedades computadas
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ServicioCard from '../components/ServicioCard.vue'
import { serviciosData } from '../services/serviciosData.js'

// Arreglo reactivo centralizado de servicios profesionales en la Región de Ñuble
// Nota: en la Etapa 8 este arreglo se reemplazará por una petición fetch()
const servicios = ref(serviciosData)

// =============================================================================
// FLUJO DE COMUNICACIÓN COMPLETO: PADRE ↔ HIJO
// 1. PADRE → PROPS → HIJO:
//    ServiciosView (padre) posee la fuente de verdad del estado de favoritos (ref 'favoritos').
//    Por cada elemento iterado, le pasa a ServicioCard (hijo) la prop :es-favorito="favoritos.includes(servicio.id)".
// 2. HIJO → EMIT → PADRE:
//    El componente hijo ServicioCard NO muta sus props (principio de flujo unidireccional de Vue).
//    Al interactuar con el botón, el hijo emite un evento personalizado 'toggle-favorito' enviando el ID.
// 3. PADRE (MANEJADOR DE EVENTO):
//    El padre escucha el evento con @toggle-favorito="manejarToggleFavorito" y actualiza su ref local.
//    Al mutar 'favoritos', Vue reactivamente recalcula las props enviadas hacia los componentes hijos.
// =============================================================================
const favoritos = ref([])

const manejarToggleFavorito = (idServicio) => {
  if (favoritos.value.includes(idServicio)) {
    // Si ya existe en la lista, lo quitamos
    favoritos.value = favoritos.value.filter((id) => id !== idServicio)
  } else {
    // Si no existe, lo agregamos
    favoritos.value.push(idServicio)
  }
}

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
      <div class="header-texto">
        <h1>Catálogo de Servicios Profesionales</h1>
        <p>
          Encuentra especialistas verificados en Chillán, San Carlos y las 21 comunas de la Región de Ñuble.
        </p>
      </div>

      <!-- Resumen reactivo de favoritos seleccionados en la sesión actual -->
      <div v-if="favoritos.length > 0" class="favoritos-alerta">
        <span>Has marcado <strong>{{ favoritos.length }}</strong> servicio(s) como favorito(s).</span>
        <RouterLink to="/favoritos" class="link-favoritos">
          Ir a Favoritos &rarr;
        </RouterLink>
      </div>
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
      <!-- 
        [COMUNICACIÓN PADRE ↔ HIJO]:
        - Padre → Hijo (Props): :servicio y :es-favorito
        - Hijo → Padre (Emit): @toggle-favorito="manejarToggleFavorito"
      -->
      <ServicioCard
        v-for="servicio in serviciosFiltrados"
        :key="servicio.id"
        :servicio="servicio"
        :es-favorito="favoritos.includes(servicio.id)"
        @toggle-favorito="manejarToggleFavorito"
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.favoritos-alerta {
  background-color: #ffe4e6;
  border: 1px solid #fecdd3;
  color: #9f1239;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.link-favoritos {
  font-weight: 700;
  color: #e11d48;
  text-decoration: underline;
}

.link-favoritos:hover {
  color: #be123c;
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
