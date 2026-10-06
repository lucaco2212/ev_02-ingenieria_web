<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand-title">
        Servicios Ñuble
      </div>
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/servicios" class="nav-link">Servicios</RouterLink>
        <RouterLink to="/favoritos" class="nav-link">Favoritos</RouterLink>
        <RouterLink to="/contacto" class="nav-link">Contacto</RouterLink>
      </nav>
    </div>
  </header>

  <main class="app-main">
    <!-- RouterView renderiza el componente asociado a la ruta actual -->
    <RouterView />
  </main>
</template>

<style scoped>
/* Los estilos estructurales generales se gestionan desde main.css */
</style>
