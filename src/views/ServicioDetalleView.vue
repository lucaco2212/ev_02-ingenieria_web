<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { serviciosData } from '../services/serviciosData.js'

// useRoute() permite acceder a la información de la ruta actual, incluidos sus parámetros
const route = useRoute()

// Computed que busca el servicio correspondiente según el parámetro :id de la URL.
// IMPORTANTE: route.params.id llega como String desde la URL, por lo que convertimos
// con Number(route.params.id) para comparar de forma estricta contra el id numérico del objeto.
const servicio = computed(() => {
  const idNumerico = Number(route.params.id)
  return serviciosData.find((item) => item.id === idNumerico)
})

// Función para formatear el precio en pesos chilenos (CLP)
const formatearPrecio = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <div class="detalle-page">
    <!-- Renderizado condicional: si el servicio existe con el id provisto -->
    <section v-if="servicio" class="view-container detalle-card">
      <!-- Encabezado con categoría y estado de disponibilidad -->
      <div class="detalle-header">
        <span class="badge-categoria">{{ servicio.categoria }}</span>
        <span
          v-if="servicio.disponible"
          class="badge-disponibilidad disponible"
        >
          Disponible para atención
        </span>
        <span
          v-else
          class="badge-disponibilidad no-disponible"
        >
          Temporalmente no disponible
        </span>
      </div>

      <!-- Título principal con el nombre del servicio -->
      <h1 class="detalle-titulo">{{ servicio.nombre }}</h1>

      <!-- Precio referencial -->
      <div class="detalle-precio-box">
        <span class="precio-label">Tarifa referencial:</span>
        <span class="precio-valor">{{ formatearPrecio(servicio.precio) }}</span>
      </div>

      <!-- Descripción completa y detallada -->
      <div class="detalle-seccion">
        <h2>Descripción del Servicio</h2>
        <p class="detalle-descripcion">{{ servicio.descripcion }}</p>
      </div>

      <!-- Barra de acciones y navegación -->
      <div class="detalle-acciones">
        <RouterLink to="/servicios" class="btn btn-secondary">
          &larr; Volver a servicios
        </RouterLink>
      </div>
    </section>

    <!-- Estado alternativo v-else: si el id no corresponde a ningún servicio existente -->
    <section v-else class="view-container servicio-no-encontrado">
      <div class="alerta-error">
        <h1>Servicio no encontrado</h1>
        <p class="mensaje-error">El servicio solicitado no existe.</p>
        <p class="submensaje">
          Es posible que el identificador ingresado en la URL sea incorrecto o el servicio haya sido dado de baja.
        </p>
        <RouterLink to="/servicios" class="btn">
          Volver al catálogo de servicios
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.detalle-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detalle-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.badge-categoria {
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-disponibilidad {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.35rem 0.8rem;
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

.detalle-titulo {
  font-size: 2rem;
  color: var(--color-text);
  line-height: 1.25;
}

.detalle-precio-box {
  background-color: #f1f5f9;
  border-left: 4px solid var(--color-primary);
  padding: 1rem 1.25rem;
  border-radius: 4px;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.precio-label {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.precio-valor {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-primary);
}

.detalle-seccion h2 {
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}

.detalle-descripcion {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text);
}

.detalle-acciones {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 1rem;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #1e293b;
  margin-top: 0;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  color: #0f172a;
}

/* Estado de error cuando el servicio no existe */
.servicio-no-encontrado {
  text-align: center;
  padding: 3.5rem 1.5rem;
}

.mensaje-error {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-danger);
  margin: 1rem 0 0.5rem 0;
}

.submensaje {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}
</style>
