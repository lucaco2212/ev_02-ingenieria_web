// =============================================================================
// Servicio de persistencia local para la lista de servicios favoritos
// Utiliza localStorage de forma segura con serialización JSON y manejo de errores
// =============================================================================

// Clave única y constante para almacenar los favoritos en el navegador
const CLAVE_FAVORITOS = 'nuble_servicios_favoritos'

/**
 * Obtiene el listado de IDs favoritos almacenados en localStorage.
 * Si no existen registros o ocurre un error al parsear el JSON, retorna un arreglo vacío [].
 * @returns {Array<number>} Arreglo con los IDs de los servicios favoritos
 */
export const obtenerFavoritos = () => {
  try {
    const datosSerializados = localStorage.getItem(CLAVE_FAVORITOS)
    if (!datosSerializados) {
      return []
    }
    const favoritosParseados = JSON.parse(datosSerializados)
    // Nos aseguramos de que el resultado sea efectivamente un arreglo
    return Array.isArray(favoritosParseados) ? favoritosParseados : []
  } catch (error) {
    console.error('Error al leer los favoritos desde localStorage:', error)
    return []
  }
}

/**
 * Guarda el arreglo de IDs favoritos en localStorage convirtiéndolo a JSON.
 * @param {Array<number>} ids - Arreglo con los identificadores a persistir
 */
export const guardarFavoritos = (ids) => {
  try {
    const idsValidos = Array.isArray(ids) ? ids : []
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(idsValidos))
  } catch (error) {
    console.error('Error al guardar los favoritos en localStorage:', error)
  }
}
