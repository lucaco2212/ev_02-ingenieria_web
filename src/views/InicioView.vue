<script setup>
import { RouterLink } from 'vue-router'
// Vista principal: Presentación y bienvenida a la plataforma
</script>

<template>
  <section class="inicio-container">
    <div class="view-container hero-card">
      <span class="hero-badge">Región de Ñuble</span>
      <h1>Portal de Servicios Profesionales de Ñuble</h1>
      <p class="hero-subtitulo">
        Bienvenido al portal oficial de servicios profesionales de la Región de Ñuble.
        Conecta fácilmente con especialistas calificados de Chillán, San Carlos y toda la región en áreas legales, salud, tecnología, arquitectura y más.
      </p>

      <div class="hero-acciones">
        <RouterLink to="/servicios" class="btn">
          Explorar catálogo de servicios &rarr;
        </RouterLink>
      </div>
    </div>

    <!-- Puntos destacados de la plataforma -->
    <div class="destacados-grid">
      <article class="destacado-card">
        <div class="destacado-icono">📋</div>
        <h3>Catálogo Verificado</h3>
        <p>Especialistas verificados con información transparente de tarifas y disponibilidad en tiempo real.</p>
      </article>

      <article class="destacado-card">
        <div class="destacado-icono">⭐</div>
        <h3>Mis Favoritos</h3>
        <p>Guarda y gestiona los profesionales de tu interés con persistencia local en tu navegador.</p>
      </article>

      <article class="destacado-card">
        <div class="destacado-icono">✉️</div>
        <h3>Contacto Directo</h3>
        <p>Formulario integrado para cotizar y resolver consultas de forma ágil y personalizada.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.inicio-container {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.hero-card {
  padding: 2.5rem 2rem;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
}

.hero-badge {
  display: inline-block;
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.hero-card h1 {
  font-size: 2.1rem;
  color: var(--color-primary);
  margin-bottom: 0.85rem;
  line-height: 1.25;
}

.hero-subtitulo {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  max-width: 800px;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.hero-acciones {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.destacados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
}

.destacado-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.destacado-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.destacado-icono {
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
}

.destacado-card h3 {
  color: var(--color-primary);
  font-size: 1.15rem;
  margin-bottom: 0.4rem;
}

.destacado-card p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .hero-card {
    padding: 1.75rem 1.25rem;
  }

  .hero-card h1 {
    font-size: 1.6rem;
  }
}
</style>

