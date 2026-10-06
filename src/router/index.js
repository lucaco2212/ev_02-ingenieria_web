import { createRouter, createWebHistory } from 'vue-router'

// Importación de las vistas principales de la aplicación
import InicioView from '../views/InicioView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import ServicioDetalleView from '../views/ServicioDetalleView.vue'
import FavoritosView from '../views/FavoritosView.vue'
import ContactoView from '../views/ContactoView.vue'
import NotFoundView from '../views/NotFoundView.vue'

// Definición de las rutas del sistema
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
    // Captura cualquier ruta que no coincida con las anteriores (Error 404)
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
