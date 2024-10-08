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
      path: '/catFacts',
      name: 'catFacts',
      component: () => import('../views/CatFacts.vue')
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
    },
    {
      path: '/guide',
      name: 'ballooonGuide',
      component: () => import('../components/balloon-guide.vue')
    }
  ]
})

export default router
