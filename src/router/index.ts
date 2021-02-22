import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import Settings from '../views/Settings.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categories',
    // component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue')
    component: Categories
  },
  {
    path: '/settings',
    name: 'Settings',
    // component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
