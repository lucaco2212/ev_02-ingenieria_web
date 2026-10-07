<script setup>
import { ref, onMounted } from 'vue'
import { obtenerServicios } from '../services/serviciosService.js'

// =============================================================================
// ESTADO REACTIVO DEL FORMULARIO Y VALIDACIÓN
// =============================================================================

// Estado de los campos del formulario vinculado bidireccionalmente con v-model
const formulario = ref({
  nombre: '',
  correo: '',
  servicioInteres: '',
  mensaje: '',
})

// Objeto reactivo para registrar los mensajes de error individuales por campo
const errores = ref({
  nombre: '',
  correo: '',
  servicioInteres: '',
  mensaje: '',
})

// Mensaje de éxito al completar el envío satisfactoriamente
const mensajeConfirmacion = ref('')

// Catálogo de servicios disponibles para el <select>
const servicios = ref([])
const cargandoServicios = ref(true)

// Obtenemos los servicios disponibles reutilizando el servicio de datos fetch
onMounted(async () => {
  try {
    servicios.value = await obtenerServicios()
  } catch (err) {
    console.error('Error al cargar servicios para el formulario de contacto:', err)
  } finally {
    cargandoServicios.value = false
  }
})

// =============================================================================
// FLUJO DE VALIDACIÓN (Al enviar el formulario con @submit.prevent)
// 1. Se reinician los errores previos para comenzar desde un estado limpio.
// 2. Se valida el campo 'nombre': no debe estar vacío ni contener solo espacios.
// 3. Se valida el campo 'correo': no vacío y que coincida con una expresión regular (regex).
// 4. Se valida 'servicioInteres': debe seleccionarse una opción válida del <select>.
// 5. Se valida 'mensaje': no vacío y longitud mínima de 10 caracteres.
// 6. Si todas las validaciones pasan (esValido === true):
//    - Se construye el mensaje de confirmación "Gracias, [nombre]. Tu mensaje fue enviado".
//    - Se limpian todos los campos del formulario.
// =============================================================================
const validarFormulario = () => {
  let esValido = true

  // Paso 1: Reiniciar mensajes de error
  errores.value = {
    nombre: '',
    correo: '',
    servicioInteres: '',
    mensaje: '',
  }

  // Paso 2: Validación de Nombre (no vacío)
  if (!formulario.value.nombre.trim()) {
    errores.value.nombre = 'El nombre es obligatorio.'
    esValido = false
  }

  // Paso 3: Validación de Correo electrónico con regex simple
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formulario.value.correo.trim()) {
    errores.value.correo = 'El correo electrónico es obligatorio.'
    esValido = false
  } else if (!regexCorreo.test(formulario.value.correo.trim())) {
    errores.value.correo = 'Ingresa un formato de correo válido (ej: usuario@correo.cl).'
    esValido = false
  }

  // Paso 4: Validación de Selección de Servicio
  if (!formulario.value.servicioInteres) {
    errores.value.servicioInteres = 'Debes seleccionar un servicio de interés.'
    esValido = false
  }

  // Paso 5: Validación de Mensaje (mínimo 10 caracteres)
  if (!formulario.value.mensaje.trim()) {
    errores.value.mensaje = 'El mensaje no puede estar vacío.'
    esValido = false
  } else if (formulario.value.mensaje.trim().length < 10) {
    errores.value.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    esValido = false
  }

  return esValido
}

const procesarEnvio = () => {
  // Ocultamos cualquier mensaje de confirmación previo
  mensajeConfirmacion.value = ''

  // Ejecutamos el flujo de validación
  if (validarFormulario()) {
    const nombreEnviado = formulario.value.nombre.trim()
    mensajeConfirmacion.value = `Gracias, ${nombreEnviado}. Tu mensaje fue enviado`

    // Limpiamos los campos del formulario tras el envío exitoso
    formulario.value = {
      nombre: '',
      correo: '',
      servicioInteres: '',
      mensaje: '',
    }
  }
}
</script>

<template>
  <section class="contacto-container">
    <div class="view-container">
      <div class="contacto-header">
        <h1>Contacto y Consultas</h1>
        <p>
          Comunícate con nuestro equipo para solicitar presupuestos o resolver dudas sobre los servicios profesionales de la Región de Ñuble.
        </p>
      </div>

      <!-- Alerta de éxito con v-if al enviar satisfactoriamente -->
      <div v-if="mensajeConfirmacion" class="alerta-exito">
        <span class="icono-exito">✔</span>
        <p class="texto-exito">{{ mensajeConfirmacion }}</p>
      </div>

      <!-- Formulario con modificador @submit.prevent para evitar recarga de página -->
      <form class="formulario-contacto" @submit.prevent="procesarEnvio" novalidate>
        <!-- Campo: Nombre -->
        <div class="campo-grupo">
          <label for="nombre" class="campo-label">Nombre completo:</label>
          <input
            id="nombre"
            v-model="formulario.nombre"
            type="text"
            placeholder="Ej: Juan Pérez"
            class="campo-input"
            :class="{ 'input-error': errores.nombre }"
          />
          <!-- Mensaje de error claro bajo el campo con v-if -->
          <p v-if="errores.nombre" class="error-mensaje">
            {{ errores.nombre }}
          </p>
        </div>

        <!-- Campo: Correo -->
        <div class="campo-grupo">
          <label for="correo" class="campo-label">Correo electrónico:</label>
          <input
            id="correo"
            v-model="formulario.correo"
            type="email"
            placeholder="Ej: juan.perez@correo.cl"
            class="campo-input"
            :class="{ 'input-error': errores.correo }"
          />
          <p v-if="errores.correo" class="error-mensaje">
            {{ errores.correo }}
          </p>
        </div>

        <!-- Campo: Servicio de interés (cargado dinámicamente) -->
        <div class="campo-grupo">
          <label for="servicio-interes" class="campo-label">Servicio de interés:</label>
          <select
            id="servicio-interes"
            v-model="formulario.servicioInteres"
            class="campo-select"
            :class="{ 'input-error': errores.servicioInteres }"
          >
            <option value="" disabled>
              {{ cargandoServicios ? 'Cargando servicios disponibles...' : 'Selecciona un servicio de la lista...' }}
            </option>
            <option
              v-for="s in servicios"
              :key="s.id"
              :value="s.nombre"
            >
              {{ s.nombre }} ({{ s.categoria }})
            </option>
          </select>
          <p v-if="errores.servicioInteres" class="error-mensaje">
            {{ errores.servicioInteres }}
          </p>
        </div>

        <!-- Campo: Mensaje -->
        <div class="campo-grupo">
          <label for="mensaje" class="campo-label">Mensaje o consulta:</label>
          <textarea
            id="mensaje"
            v-model="formulario.mensaje"
            rows="5"
            placeholder="Escribe aquí tu consulta o requerimiento (mínimo 10 caracteres)..."
            class="campo-textarea"
            :class="{ 'input-error': errores.mensaje }"
          ></textarea>
          <p v-if="errores.mensaje" class="error-mensaje">
            {{ errores.mensaje }}
          </p>
        </div>

        <!-- Botón de envío -->
        <div class="formulario-acciones">
          <button type="submit" class="btn btn-enviar">
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contacto-container {
  max-width: 750px;
  margin: 0 auto;
}

.contacto-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.contacto-header h1 {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.contacto-header p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
}

/* Alerta de confirmación de envío exitoso */
.alerta-exito {
  background-color: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
  padding: 1rem 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 2px 6px rgba(22, 101, 52, 0.08);
}

.icono-exito {
  font-size: 1.3rem;
  font-weight: 700;
}

.texto-exito {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
  color: #166534;
}

/* Estructura del Formulario */
.formulario-contacto {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.campo-grupo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.campo-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.campo-input,
.campo-select,
.campo-textarea {
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-text);
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.campo-input:focus,
.campo-select:focus,
.campo-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

/* Estilos de campo con error */
.campo-input.input-error,
.campo-select.input-error,
.campo-textarea.input-error {
  border-color: var(--color-danger);
  background-color: #fffaf0;
}

.campo-input.input-error:focus,
.campo-select.input-error:focus,
.campo-textarea.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.error-mensaje {
  color: var(--color-danger);
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.1rem;
}

.formulario-acciones {
  margin-top: 0.5rem;
}

.btn-enviar {
  width: 100%;
  padding: 0.8rem 1.5rem;
  font-size: 1.05rem;
  font-weight: 600;
}
</style>
