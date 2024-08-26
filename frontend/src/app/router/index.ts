import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { auth } from "@/processes/auth";

type CustomRouteRecordRaw = RouteRecordRaw & {
  meta?: {
    pageTitle?: string,
    menuTitle?: string,
    access?: string | string[]
  }
}


const routes: CustomRouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(auth)

export default router;
