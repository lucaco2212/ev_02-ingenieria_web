// =============================================================================
// Servicio de obtención de datos mediante Fetch API
// =============================================================================

/**
 * Consulta de forma asíncrona el listado de servicios profesionales desde '/servicios.json'.
 * Valida response.ok y maneja posibles errores de red o archivo inexistente.
 * @returns {Promise<Array>} Promesa que resuelve al arreglo de servicios
 */
export const obtenerServicios = async () => {
  // Retardo artificial de ~1 segundo solo para demostrar el estado de carga visual
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Petición HTTP al archivo estático ubicado en la carpeta public/
  const response = await fetch('/servicios.json')

  // Verificamos si la respuesta HTTP fue exitosa (códigos 200-299)
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: no se pudo cargar la información`)
  }

  // Parseamos y retornamos los datos en formato JavaScript
  return await response.json()
}
