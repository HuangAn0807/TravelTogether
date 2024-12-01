import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/views/layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          component: layout,
          redirect: '/home',
          children: [
              {
                  path: '/home',
                  component: () => import('@/views/home/index.vue'),
              },
              {
                  path: '/user',
                  component: () => import('@/views/user/index.vue'),
              },
              {
                  path: '/message',
                  component: () => import('@/views/message/index.vue'),
              },
          ],
      },
      {
          path: '/login',
          component: () => import('@/views/login/index.vue'),
      },
      {
          path: '/register',
          component: () => import('@/views/register/index.vue'),
      },
      {
          path: '/401',
          component: () => import('@/views/error/Page401.vue'),
      },
      {
          path: '/404',
          component: () => import('@/views/error/Page404.vue'),
      },
  ],
})

// router.beforeEach(async (to, from) => {
//   if (
//     // 检查用户是否已登录
    
//     // ❗️ 避免无限重定向
//     to.name !== 'Login'
//   ) {
//     // 将用户重定向到登录页面
//     return { name: 'Login' }
//   }
// })
export default router
