<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { obtenerServicios } from '../services/serviciosService.js'

// =============================================================================
// ARQUITECTURA DE DATOS: CARGA ASÍNCRONA EN onMounted
// Decisión pedagógica: La vista de detalle consulta los servicios a través de
// obtenerServicios() en onMounted(). De este modo, si un usuario ingresa
// directamente por URL (ej: /servicios/2) o recarga la página, los datos se
// solicitan y procesan de forma autónoma con sus propios estados de carga y error.
// =============================================================================

const route = useRoute()

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

// Computed que busca el servicio correspondiente comparando el :id numéricamente
const servicio = computed(() => {
  const idNumerico = Number(route.params.id)
  return servicios.value.find((item) => item.id === idNumerico)
})

// Función para formatear precio en CLP
const formatearPrecio = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(valor)
}
</script>

<template>
  <div class="detalle-page">
    <!-- ESTADO 1: CARGANDO -->
    <div v-if="cargando" class="view-container estado-cargando">
      <div class="spinner"></div>
      <p>Cargando servicios...</p>
    </div>

    <!-- ESTADO 2: ERROR CON BOTÓN REINTENTAR -->
    <div v-else-if="error" class="view-container estado-error">
      <h2>Ocurrió un inconveniente</h2>
      <p class="error-mensaje">{{ error }}</p>
      <button type="button" class="btn" @click="cargarDatos">
        Reintentar
      </button>
    </div>

    <!-- ESTADO 3: ÉXITO - SI EXISTE EL SERVICIO CON EL ID PROVISTO -->
    <section v-else-if="servicio" class="view-container detalle-card">
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

      <h1 class="detalle-titulo">{{ servicio.nombre }}</h1>

      <div class="detalle-precio-box">
        <span class="precio-label">Tarifa referencial:</span>
        <span class="precio-valor">{{ formatearPrecio(servicio.precio) }}</span>
      </div>

      <div class="detalle-seccion">
        <h2>Descripción del Servicio</h2>
        <p class="detalle-descripcion">{{ servicio.descripcion }}</p>
      </div>

      <div class="detalle-acciones">
        <RouterLink to="/servicios" class="btn btn-secondary">
          &larr; Volver a servicios
        </RouterLink>
        <RouterLink to="/contacto" class="btn">
          Contactar o cotizar &rarr;
        </RouterLink>
      </div>
    </section>

    <!-- ESTADO ALTERNATIVO: EL ID NO CORRESPONDE A NINGÚN SERVICIO -->
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
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detalle-acciones .btn {
  margin-top: 0;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #1e293b;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
  color: #0f172a;
}

/* Estado de error y carga */
.estado-cargando,
.estado-error {
  text-align: center;
  padding: 3.5rem 1.5rem;
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
