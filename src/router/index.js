import { createRouter, createWebHistory } from 'vue-router'
import HousesView from '../views/HousesView.vue'
import HouseDetailsView from '../views/HouseDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'houses',
    component: HousesView
  },
  {
    path: '/',
    name: 'HouseDetails',
    component: HouseDetailsView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
