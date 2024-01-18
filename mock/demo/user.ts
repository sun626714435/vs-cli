// eslint-disable-next-line import/no-extraneous-dependencies
import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: '123',
      realName: '123',
      password: '123',
      token: 'fakeToken1',
      homePath: '/system/user-management',
      roles: ['super'],
    },
    {
      userId: '2',
      username: '111',
      password: '111',
      realName: 'test user',
      token: 'fakeToken2',
      homePath: '/welcome',
      roles: ['test'],
    },
  ]
}

export default [
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { userId, username: _username, token, realName, roles } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
      })
    },
  },
  {
    url: '/api/users/currentUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
] as MockMethod[]
