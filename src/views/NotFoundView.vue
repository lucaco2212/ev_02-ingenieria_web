<script setup>
import { RouterLink } from 'vue-router'
// Vista para rutas no encontradas (error 404)
</script>

<template>
  <section class="view-container not-found">
    <h1>404 - Página no encontrada</h1>
    <p>La página o recurso que buscas no existe o fue movido.</p>
    <RouterLink to="/" class="btn">Volver al Inicio</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 3rem 1.5rem;
}

.not-found h1 {
  color: var(--color-danger);
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.not-found p {
  margin-bottom: 1.5rem;
}
</style>
