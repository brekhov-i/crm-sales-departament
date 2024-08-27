import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { auth } from "@/processes/auth";


const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/index.vue')
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/login.vue'),
    meta: {
      layout: 'auth'
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(auth)

export default router;
