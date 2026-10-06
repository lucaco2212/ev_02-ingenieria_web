import { createRouter, createWebHistory } from 'vue-router'

// Importación de las vistas para cada ruta
import InicioView from '../views/InicioView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import ServicioDetalleView from '../views/ServicioDetalleView.vue'
import FavoritosView from '../views/FavoritosView.vue'
import ContactoView from '../views/ContactoView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// Definición de las rutas del sistema con sus nombres correspondientes
const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView,
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: ServiciosView,
  },
  {
    path: '/servicios/:id',
    name: 'servicio-detalle',
    component: ServicioDetalleView,
    // props: true permite pasar el parámetro :id directamente como prop al componente
    props: true,
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoritosView,
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: ContactoView,
  },
  {
    // Ruta comodín (catch-all) para páginas no encontradas (error 404)
    // :pathMatch(.*)* captura cualquier segmento de URL no coincidente
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

// Creación de la instancia del router usando el historial HTML5 (createWebHistory)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
