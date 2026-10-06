<script setup>
import { RouterLink } from 'vue-router'

// Definición de las props que recibe el componente desde el componente padre
const props = defineProps({
  servicio: {
    type: Object,
    required: true,
  },
})

// Función auxiliar para formatear valores numéricos a formato de moneda chilena (CLP)
const formatearPrecio = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <article class="servicio-card">
    <!-- Encabezado de la tarjeta con categoría y badge de disponibilidad -->
    <div class="card-header">
      <span class="badge-categoria">{{ servicio.categoria }}</span>
      <span
        v-if="servicio.disponible"
        class="badge-disponibilidad disponible"
      >
        Disponible
      </span>
      <span
        v-else
        class="badge-disponibilidad no-disponible"
      >
        No disponible
      </span>
    </div>

    <!-- Contenido principal -->
    <div class="card-body">
      <h3 class="servicio-nombre">{{ servicio.nombre }}</h3>
      <p class="servicio-descripcion">{{ servicio.descripcion }}</p>
      <p class="servicio-precio">
        <strong>Precio referencial:</strong> {{ formatearPrecio(servicio.precio) }}
      </p>
    </div>

    <!-- Pie de la tarjeta con enlace hacia la vista de detalle -->
    <div class="card-footer">
      <RouterLink
        :to="{ name: 'servicio-detalle', params: { id: servicio.id } }"
        class="btn-detalle"
      >
        Ver detalle
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.servicio-card {
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.servicio-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  gap: 0.5rem;
}

.badge-categoria {
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-disponibilidad {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.badge-disponibilidad.disponible {
  background-color: #dcfce7;
  color: #15803d;
}

.badge-disponibilidad.no-disponible {
  background-color: #fee2e2;
  color: #b91c1c;
}

.card-body {
  flex: 1;
}

.servicio-nombre {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.servicio-descripcion {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.servicio-precio {
  font-size: 1.05rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.btn-detalle {
  display: block;
  text-align: center;
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 0.55rem 1rem;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.btn-detalle:hover {
  background-color: var(--color-primary-hover);
  color: #ffffff;
}
</style>
