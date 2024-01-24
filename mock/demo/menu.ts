// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util'
import { createFakeUserList } from './user'

const levelRoute = {
  path: 'other',
  name: '其他',
  icon: '',
  type: 'root',
  status: true,
  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      status: true,
      root: 'other',
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      status: true,
      root: 'other',
    },
  ],
}

const levelDemo = {
  path: '/otherDemo',
  name: '其他DEMO',
  icon: '',
  type: 'root',
  status: true,
}
const levelDemo2 = {
  path: '/welcome',
  name: 'HOME',
  icon: 'carbon:user-role',
  type: 'root',
  status: true,
}

const system = {
  path: 'system',
  name: '系统设置',
  icon: 'ion:settings-outline',
  type: 'root',
  status: true,
  mark: '父菜单',
  children: [
    {
      path: '/system/user-management',
      name: '用户管理',
      status: true,
      root: 'system',
      mark: '子菜单',
    },
    {
      path: '/system/role-management',
      name: '角色管理',
      status: true,
      root: 'system',
      mark: '子菜单',
    },
    {
      path: '/system/menu-management',
      name: '菜单管理',
      status: true,
      root: 'system',
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
