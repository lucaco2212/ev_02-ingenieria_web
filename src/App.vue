<script setup>
// En Vue 3 con vue-router importamos RouterLink y RouterView para la navegación SPA
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- Encabezado con menú de navegación principal -->
  <header class="app-header">
    <div class="header-container">
      <!-- El logotipo o título también redirige al inicio usando RouterLink sin recargar la página -->
      <RouterLink to="/" class="brand-title">
        Servicios Ñuble
      </RouterLink>
      
      <!-- Menú principal usando exclusivamente RouterLink en lugar de etiquetas <a> -->
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/servicios" class="nav-link">Servicios</RouterLink>
        <RouterLink to="/favoritos" class="nav-link">Favoritos</RouterLink>
        <RouterLink to="/contacto" class="nav-link">Contacto</RouterLink>
      </nav>
    </div>
  </header>

  <!-- Contenedor principal donde se monta la vista activa según la ruta -->
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
/* Los estilos generales del encabezado y la navegación se encuentran en main.css */
</style>
