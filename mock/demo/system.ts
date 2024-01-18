/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess } from '../_util'

const userList = (() => {
  const result: any[] = []
  for (let index = 0; index < 6; index++) {
    result.push({
      id: `${index}`,
      name: '@cname()',
      sex: '@integer(0,1)',
      email: '@email()',
      'role|1': ['超级管理员', '管理员', '测试'],
      status: '@boolean',
    })
  }
  return result
})()

const roleList = (() => {
  const result: any[] = [
    {
      id: 1,
      roleName: '超级管理员',
      mark: '@word(5)',
      'status|1': ['禁用', '激活'],
    },
    {
      id: 2,
      roleName: '管理员',
      mark: '@word(5)',
      'status|1': ['禁用', '激活'],
    },
    {
      id: 3,
      roleName: '测试员',
      mark: '@word(5)',
      'status|1': ['禁用', '激活'],
    },
  ]
  return result
})()

export default [
  {
    url: '/api/getUserList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, userList)
    },
  },
  {
    url: '/api/getRoleList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, roleList)
    },
  },
] as MockMethod[]
