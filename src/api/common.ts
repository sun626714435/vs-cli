/* eslint-disable no-unused-vars */
import { generatorAPIS } from '@/utils/generateAPIs'

enum apis {
  // login
  login = 'POST login d:*',
  // logout
  logout = 'GET logout',
  // 获取用户信息
  getUserInfo = 'GET users/currentUserInfo',
  // 更新自己信息刷新用户信息
  // refreshUserInfo = 'GET users/findUserByUserCode q:userCode',
  // getMenuList
  getMenuList = 'GET getMenuList',
  // getUserList
  getUserList = 'GET getUserList',
  // delUser
  delUser = 'POST delUser d:*',
  // editUser
  editUser = 'POST editUser d:*',
  // addUser
  addUser = 'POST addUser d:*',
  // getRoleList
  getRoleList = 'GET getRoleList',
}

export default generatorAPIS<keyof typeof apis>(apis)
