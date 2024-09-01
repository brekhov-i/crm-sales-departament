import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { auth } from "@/processes/auth";


const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/index.vue'),
    meta: {
      access: ['dashboard']
    }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/pages/403.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      auth: false,
      layout: 'auth'
    }
  },
  {
    name: 'Directory',
    path: '/directory',
    component: () => import('@/pages/directory.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(auth)

export default router;
