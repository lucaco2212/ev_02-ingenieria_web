<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ServicioCard from '../components/ServicioCard.vue'
import { obtenerServicios } from '../services/serviciosService.js'
import { obtenerFavoritos, guardarFavoritos } from '../services/favoritosStorage.js'

// =============================================================================
// ARQUITECTURA DE DATOS: CARGA ASÍNCRONA EN onMounted
// Decisión pedagógica: Cada vista gestiona su ciclo de carga asíncrona de manera
// independiente invocando el servicio en onMounted(). Esto mantiene cada componente
// autónomo, fácil de razonar y con control total sobre su propio estado de carga
// y su botón de reintento ante fallos de red.
// =============================================================================

// Tres estados reactivos para la carga asíncrona
const servicios = ref([])
const cargando = ref(true)
const error = ref(null)

// Función asíncrona protegida con try / catch / finally para consultar los datos
const cargarServicios = async () => {
  cargando.value = true
  error.value = null

  try {
    servicios.value = await obtenerServicios()
  } catch (err) {
    error.value = 'No se pudieron cargar los servicios. Intenta nuevamente.'
  } finally {
    cargando.value = false
  }
}

// Invocamos la carga al montarse el componente
onMounted(() => {
  cargarServicios()
})

// =============================================================================
// GESTIÓN DE FAVORITOS PERSISTIDOS Y COMUNICACIÓN PADRE ↔ HIJO
// =============================================================================
const favoritos = ref(obtenerFavoritos())

watch(
  favoritos,
  (nuevosFavoritos) => {
    guardarFavoritos(nuevosFavoritos)
  },
  { deep: true }
)

const manejarToggleFavorito = (idServicio) => {
  if (favoritos.value.includes(idServicio)) {
    favoritos.value = favoritos.value.filter((id) => id !== idServicio)
  } else {
    favoritos.value.push(idServicio)
  }
}

// Variables reactivas para búsqueda y filtros con v-model
const busqueda = ref('')
const categoriaSeleccionada = ref('Todas')

// [COMPUTED 1]: Extrae las categorías únicas disponibles
const categorias = computed(() => {
  const listaCategorias = servicios.value.map((s) => s.categoria)
  return [...new Set(listaCategorias)]
})

// [COMPUTED 2]: Filtra los servicios según nombre y categoría
const serviciosFiltrados = computed(() => {
  const termino = busqueda.value.toLowerCase().trim()

  return servicios.value.filter((servicio) => {
    const coincideNombre = servicio.nombre.toLowerCase().includes(termino)
    const coincideCategoria =
      categoriaSeleccionada.value === 'Todas' ||
      servicio.categoria === categoriaSeleccionada.value

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

      <!-- Alerta informativa de favoritos seleccionados -->
      <div v-if="favoritos.length > 0" class="favoritos-alerta">
        <span>Has marcado <strong>{{ favoritos.length }}</strong> servicio(s) como favorito(s).</span>
        <RouterLink to="/favoritos" class="link-favoritos">
          Ir a Favoritos &rarr;
        </RouterLink>
      </div>
    </div>

    <!-- ESTADO 1: CARGANDO -->
    <div v-if="cargando" class="estado-cargando">
      <div class="spinner"></div>
      <p>Cargando servicios...</p>
    </div>

    <!-- ESTADO 2: ERROR CON BOTÓN REINTENTAR -->
    <div v-else-if="error" class="estado-error">
      <h2>Ocurrió un inconveniente</h2>
      <p class="error-mensaje">{{ error }}</p>
      <button type="button" class="btn" @click="cargarServicios">
        Reintentar
      </button>
    </div>

    <!-- ESTADO 3: ÉXITO - MUESTRA CATÁLOGO Y FILTROS -->
    <div v-else class="contenido-catalogo">
      <!-- Barra de filtros y búsqueda -->
      <div class="filtros-container">
        <!-- [V-MODEL 1]: Búsqueda por texto -->
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

        <!-- [V-MODEL 2]: Filtro por categoría -->
        <div class="filtro-campo">
          <label for="filtrar-categoria" class="filtro-label">Filtrar por categoría:</label>
          <select
            id="filtrar-categoria"
            v-model="categoriaSeleccionada"
            class="filtro-select"
          >
            <option value="Todas">Todas</option>
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

      <!-- [V-IF / V-ELSE]: Grilla de resultados vs Mensaje de búsqueda sin coincidencias -->
      <div v-if="serviciosFiltrados.length > 0" class="servicios-grid">
        <ServicioCard
          v-for="servicio in serviciosFiltrados"
          :key="servicio.id"
          :servicio="servicio"
          :es-favorito="favoritos.includes(servicio.id)"
          @toggle-favorito="manejarToggleFavorito"
        />
      </div>

      <div v-else class="sin-resultados">
        <p>No se encontraron servicios para los criterios seleccionados.</p>
      </div>
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

.contenido-catalogo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

/* Grilla de tarjetas */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Estado vacío de búsqueda */
.sin-resultados {
  background-color: var(--color-card-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  padding: 3rem 1.5rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

/* Estilos de los estados de carga y error */
.estado-cargando,
.estado-error {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 3.5rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow);
}

.estado-cargando p {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.estado-error h2 {
  color: var(--color-danger);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.error-mensaje {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin-bottom: 1rem;
}
</style>
