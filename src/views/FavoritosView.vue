<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ServicioCard from '../components/ServicioCard.vue'
import { obtenerServicios } from '../services/serviciosService.js'
import { obtenerFavoritos, guardarFavoritos } from '../services/favoritosStorage.js'

// =============================================================================
// ARQUITECTURA DE DATOS: CARGA ASÍNCRONA EN onMounted
// Decisión pedagógica: FavoritosView obtiene el catálogo completo llamando a
// obtenerServicios() en onMounted(), y luego aplica un computed para filtrar
// solo los servicios marcados. Esto garantiza que la vista sea autónoma, maneje
// sus propios estados de carga y error, y funcione correctamente incluso si el
// usuario entra directamente a /favoritos.
// =============================================================================

// Tres estados reactivos para la petición asíncrona
const servicios = ref([])
const cargando = ref(true)
const error = ref(null)

// Función para obtener los datos desde el servicio
const cargarDatos = async () => {
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

// Invocamos la carga al montar el componente
onMounted(() => {
  cargarDatos()
})

// Estado de favoritos persistidos en localStorage
const favoritos = ref(obtenerFavoritos())

watch(
  favoritos,
  (nuevosFavoritos) => {
    guardarFavoritos(nuevosFavoritos)
  },
  { deep: true }
)

// [COMPUTED]: Filtra SOLO los servicios cuyos IDs están presentes en 'favoritos'
const serviciosFavoritos = computed(() => {
  return servicios.value.filter((servicio) => favoritos.value.includes(servicio.id))
})

// Reutilizamos el evento @toggle-favorito emitido por ServicioCard para removerlo
const eliminarFavorito = (idServicio) => {
  favoritos.value = favoritos.value.filter((id) => id !== idServicio)
}
</script>

<template>
  <section class="favoritos-container">
    <div class="favoritos-header">
      <h1>Mis Servicios Favoritos</h1>
      <p>
        Acceso rápido a los profesionales y especialistas de la Región de Ñuble que has guardado.
      </p>
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
      <button type="button" class="btn" @click="cargarDatos">
        Reintentar
      </button>
    </div>

    <!-- ESTADO 3: ÉXITO -->
    <div v-else>
      <!-- Si hay favoritos guardados, muestra la grilla -->
      <div v-if="serviciosFavoritos.length > 0" class="servicios-grid">
        <ServicioCard
          v-for="servicio in serviciosFavoritos"
          :key="servicio.id"
          :servicio="servicio"
          :es-favorito="true"
          @toggle-favorito="eliminarFavorito"
        />
      </div>

      <!-- Estado vacío si el usuario no tiene favoritos -->
      <div v-else class="sin-favoritos">
        <h2>Aún no has guardado favoritos</h2>
        <p>
          No tienes servicios guardados en favoritos. Puedes marcar servicios con el ícono de corazón desde el catálogo principal.
        </p>
        <RouterLink to="/servicios" class="btn">
          Explorar catálogo de servicios
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.favoritos-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.favoritos-header {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow);
}

.favoritos-header h1 {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.favoritos-header p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

/* Grilla de tarjetas */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Estado vacío */
.sin-favoritos {
  background-color: var(--color-card-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius);
  padding: 3.5rem 1.5rem;
  text-align: center;
}

.sin-favoritos h2 {
  color: var(--color-text);
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}

.sin-favoritos p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  max-width: 550px;
  margin: 0 auto 1.5rem auto;
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
