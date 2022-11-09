import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/index',
    component: () => import('@/components/Main/main.vue'),
    children: [
      {
        path: '',
        name: '首页',
        component: () => import('@/pages/Home.vue')
      },
      {
        path: 'music',
        name: '音乐',
        component: () => import('@/pages/music.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
