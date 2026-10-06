<script setup>
import { useRoute } from 'vue-router'

// Obtenemos los parámetros de la ruta actual mediante useRoute
const route = useRoute()
</script>

<template>
  <section class="view-container">
    <h1>Detalle del Servicio</h1>
    <p v-if="route.params.id">
      Visualizando información detallada del servicio con identificador: <strong>#{{ route.params.id }}</strong>
    </p>
    <p v-else>
      Selecciona un servicio desde el catálogo para revisar sus detalles.
    </p>
  </section>
</template>

<style scoped>
/* Estilos específicos de la vista ServicioDetalle */
</style>
