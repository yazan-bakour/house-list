import { createRouter, createWebHistory } from 'vue-router'
import HousesView from '../views/HousesView.vue'
import HouseDetailsView from '../views/HouseDetailsView.vue'
import CreateNewListingView from '../views/CreateNewListingView.vue'

const routes = [
  {
    path: '/',
    name: 'overview',
    component: HousesView
  },
  {
    path: '/details/:id',
    name: 'HouseDetails',
    component: HouseDetailsView
  },
  {
    path: '/listing',
    name: 'NewLisiting',
    component: CreateNewListingView
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
