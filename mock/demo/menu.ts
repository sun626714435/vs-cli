// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util'
import { createFakeUserList } from './user'

const levelRoute = {
  path: 'other',
  name: '其他',
  icon: 'carbon:user-role',
  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: '/demo/level/Menu111',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: '/demo/level/Menu12',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: '/demo/level/Menu2',
      meta: {
        title: 'Menu2',
      },
    },
  ],
}

const levelDemo = {
  path: 'otherDemo',
  name: '其他DEMO',
  icon: 'carbon:user-role',
}
const levelDemo2 = {
  path: 'demo',
  name: 'DEMO',
  icon: 'carbon:user-role',
}

const system = {
  path: 'system',
  name: '系统设置',
  icon: 'ion:settings-outline',
  children: [
    {
      path: 'account',
      name: '用户管理',
    },
    {
      path: 'role',
      name: '角色管理',
    },
    {
      path: 'auth',
      name: '权限管理',
    },
    {
      path: 'menu',
      name: '菜单管理',
    },
  ],
}

export default [
  {
    url: '/api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('Invalid token!')
      }
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid user token!')
      }
      const id = checkUser.userId
      let menu: Object[]
      switch (id) {
        case '1':
          menu = [system, levelRoute, levelDemo, levelDemo2]
          break
        case '2':
          menu = [levelRoute, levelDemo, levelDemo2]
          break
        default:
          menu = []
      }

      return resultSuccess(menu)
    },
  },
] as unknown as MockMethod[]
