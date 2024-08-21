import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addModal',
      name: 'addModal',
      component: () => import('../components/add-modal.vue')
    },
    {
      path: '/itemCount',
      name: 'itemCount',
      component: () => import('../components/item-count.vue')
    },
    {
      path: '/itemTable',
      name: 'itemTable',
      component: () => import('../components/item-table.vue')
    },
    {
      path: '/editModal',
      name: 'editModal',
      component: () => import('../components/edit-modal.vue')
    }
  ]
})

export default router
