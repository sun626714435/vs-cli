import nprogress from 'nprogress' // @types/nprogress
import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
  START_LOCATION,
} from 'vue-router'
import 'nprogress/nprogress.css'

import Layout from '@/layout/default/Index.vue'
import { paths } from './paths'
import { useAccessesStore } from '@/store/useAccesses'

import type { CustomRouteRecordRaw } from '@/router/typing'

const routes: CustomRouteRecordRaw[] = [
  {
    path: paths.redirect4develop,
    component: () => import('@/views/redirect/Index.vue'),
  },
  {
    path: paths.login,
    name: 'Login',
    meta: {
      hiddenBreadcrumb: true,
    },
    component: () => import('@/layout/login/Login.vue'),
  },
  {
    path: paths.root,
    meta: {
      title: 'Retail Knowledge System',
    },
    name: 'Retail Knowledge System',
    children: [
      {
        path: paths.root,
        redirect: paths.login,
      },
      {
        path: paths.welcome,
        name: 'Welcome',
        meta: {
          hiddenBreadcrumb: true,
        },
        component: () => import('@/views/welcome/Welcome.vue'),
      },
      {
        // 403
        meta: {
          hiddenBreadcrumb: true,
        },
        name: '403',
        path: paths.forbidden,
        component: () => import('@/views/exceptions/403.vue'),
      },
      {
        // 404
        meta: {
          hiddenBreadcrumb: true,
        },
        name: '404',
        path: paths.notFound,
        component: () => import('@/views/exceptions/404.vue'),
      },
    ],
    component: Layout,
  },
  {
    // 404 跳转到首页(此配置必须处于路由最后一项)
    path: '/:catchAll(.*)',
    redirect: paths.notFound,
  },
]

const router = createRouter({
  routes: routes as RouteRecordRaw[],
  history: createWebHashHistory(), // createWebHistory
})

router.beforeEach(async (to: RouteLocationNormalized, from) => {
  try {
    if (from === START_LOCATION && to.path !== paths.redirect4develop) {
      // 开始加载进度条
      nprogress.start()
      // await store.getCurrentUserInfo()
    }
  } catch (error) {
    return false
  }

  const accesses = useAccessesStore()

  const { matched } = to

  if (![paths.login, paths.forbidden, paths.notFound].includes(to.path)) {
    const notAllowed = matched.some((item: CustomRouteRecordRaw) => {
      if (typeof item.meta === 'undefined' || typeof item.meta.permission === 'undefined')
        return false
      return ([] as string[])
        .concat(item.meta.permission)
        .filter((auth) => typeof auth !== 'undefined')
        .some((auth) => accesses[auth] === false)
    })
    if (notAllowed) {
      return { path: paths.forbidden }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
