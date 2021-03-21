import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MoneyManagement from '../views/MoneyManagement.vue'
import Categories from '../views/Categories.vue'
import Settings from '../views/Settings.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MoneyManagement',
    component: MoneyManagement
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
