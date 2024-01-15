/* eslint-disable no-unused-vars */
import { generatorAPIS } from '@/utils/generateAPIs'

enum apis {
  // login
  login = 'POST login d:*',
  // 获取用户信息
  getUserInfo = 'GET users/currentUserInfo',
  // 更新自己信息刷新用户信息
  // refreshUserInfo = 'GET users/findUserByUserCode q:userCode',
  // Exit Login
  exitLogin = 'GET openid/logout',
}

export default generatorAPIS<keyof typeof apis>(apis)
