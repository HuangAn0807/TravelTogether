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
                  name: 'home',
                  component: () => import('@/views/home/index.vue'),
              },
              {
                  path: '/user',
                  name: 'user',
                  component: () => import('@/views/user/index.vue'),
              },
          ],
      },
      {
          path: '/uploader',
          name: 'uploader',
          component: () => import('@/views/upLoader/index.vue'),
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
      },
      {
          path: '/follow',
          name: 'follow',
          component: () => import('@/views/follow/index.vue'),
      },
      {
          path: '/401',
          component: () => import('@/views/error/Page401.vue'),
      },
      {
          path: '/404',
          component: () => import('@/views/error/Page404.vue'),
      },
      {
        path:'/location',
        name:'location',
        component: () => import('@/views/location/index.vue'),
      },
      {
        path:'/detail',
        name:'detail',
        component: () => import('@/views/detail/index.vue'),
      },
      {
        path:'/editInfo',
        name:'editInfo',
        component: () => import('@/views/editInfo/index.vue'),
      },
      {
        path:'/userDetail',
        name:'userDetail',
        component: () => import('@/views/userDetail/index.vue'),
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
