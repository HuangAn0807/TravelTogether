import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout.vue'
import { useUserStore } from '@/stores/userStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { keepAlive: true },
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          meta: { keepAlive: true },
          component: () => import('@/views/user/index.vue'),
        },
      ],
    },
    {
      path: '/uploader',
      name: 'uploader',
      meta: { keepAlive: false },
      component: () => import('@/views/upLoader/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { keepAlive: false },
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/follow',
      name: 'follow',
      meta: { keepAlive: true },
      component: () => import('@/views/follow/index.vue'),
    },
    {
      path: '/401',
      meta: { keepAlive: false },
      component: () => import('@/views/error/Page401.vue'),
    },
    {
      path: '/404',
      meta: { keepAlive: false },
      component: () => import('@/views/error/Page404.vue'),
    },
    {
      path: '/location',
      name: 'location',
      meta: { keepAlive: false },
      component: () => import('@/views/location/index.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      meta: { keepAlive: false },
      component: () => import('@/views/detail/index.vue'),
    },
    {
      path: '/editInfo',
      name: 'editInfo',
      meta: { keepAlive: false },
      component: () => import('@/views/editInfo/index.vue'),
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      meta: { keeAlive: true },
      component: () => import('@/views/userDetail/index.vue'),
    },
    {
      path: '/search',
      name: 'search',
      meta: { keepAlive: false },
      component: () => import('@/views/search/index.vue'),
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      meta: { keepAlive: false },
      component: () => import('@/views/changePassword/index.vue')
    }
  ],
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const token = userStore.token
  // 检查用户是否已登录
  // ❗️ 避免无限重定向
  if (!token && to.name !== 'login') {
    // 将用户重定向到登录页面
    return { name: 'login' }
  } else {
    return true
  }
})
export default router
