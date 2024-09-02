import { createMemoryHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: import('./Home.vue') },
  { path: '/settings', component: import('./Settings.vue') },
]

 const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router