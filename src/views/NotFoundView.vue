<script setup>
import { RouterLink } from 'vue-router'
// Vista para rutas no encontradas (error 404)
</script>

<template>
  <section class="view-container not-found">
    <div class="not-found-icono">🔍</div>
    <h1>404 - Página no encontrada</h1>
    <p>La página o recurso que buscas no existe o fue movido.</p>
    <RouterLink to="/" class="btn">Volver al Inicio</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1.5rem;
  max-width: 600px;
  margin: 2rem auto;
}

.not-found-icono {
  font-size: 3rem;
  margin-bottom: 0.75rem;
}

.not-found h1 {
  color: var(--color-danger);
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

.not-found p {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  color: var(--color-text-muted);
}
</style>

