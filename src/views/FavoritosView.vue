<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ServicioCard from '../components/ServicioCard.vue'
import { serviciosData } from '../services/serviciosData.js'
import { obtenerFavoritos, guardarFavoritos } from '../services/favoritosStorage.js'

// =============================================================================
// GESTIÓN DE FAVORITOS PERSISTIDOS EN FAVORITOSVIEW
// 1. Cargamos los IDs almacenados en localStorage al montar el componente.
// 2. Mediante un watch reactivo con { deep: true }, sincronizamos con localStorage.
// 3. Un computed filtra la lista de serviciosData para obtener únicamente los favoritos.
// 4. Reutilizamos el evento @toggle-favorito de ServicioCard para permitir desmarcar.
// =============================================================================
const favoritos = ref(obtenerFavoritos())

// Watcher para sincronizar con localStorage cuando se elimine un favorito
watch(
  favoritos,
  (nuevosFavoritos) => {
    guardarFavoritos(nuevosFavoritos)
  },
  { deep: true }
)

// [COMPUTED]: Obtiene SOLO los objetos de servicios que coincidan con los IDs guardados
const serviciosFavoritos = computed(() => {
  return serviciosData.filter((servicio) => favoritos.value.includes(servicio.id))
})

// Reutilizamos el mismo evento emitido por ServicioCard para remover el servicio
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

    <!-- [V-IF / V-ELSE]: Condicional según existan o no servicios guardados -->
    <div v-if="serviciosFavoritos.length > 0" class="servicios-grid">
      <!-- Reutilización limpia del componente ServicioCard -->
      <ServicioCard
        v-for="servicio in serviciosFavoritos"
        :key="servicio.id"
        :servicio="servicio"
        :es-favorito="true"
        @toggle-favorito="eliminarFavorito"
      />
    </div>

    <!-- Estado vacío cuando no hay favoritos guardados -->
    <div v-else class="sin-favoritos">
      <h2>Aún no has guardado favoritos</h2>
      <p>
        No tienes servicios guardados en favoritos. Puedes marcar servicios con el ícono de corazón desde el catálogo principal.
      </p>
      <RouterLink to="/servicios" class="btn">
        Explorar catálogo de servicios
      </RouterLink>
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

/* Grilla idéntica a ServiciosView para mantener consistencia visual */
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
</style>
