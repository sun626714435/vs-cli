import { RouteRecordRaw } from 'vue-router'

export interface CustomMeta extends RouteRecordRaw.meta {
  title?: string
  system?: string
  showSubNav?: boolean
  permission?: string
  requiresAuth?: boolean
  // 隐藏全部面包屑
  hiddenBreadcrumb?: boolean
  // 隐藏面包屑中当前路由
  hiddenInBreadcrumb?: boolean
  // 面包屑Name
  breadcrumbName?: string
  // 面包屑能否跳转
  isCanJump?: boolean
  showFather?: boolean
  hasBreadcrumbInQueryVehicle?: boolean
}

export interface CustomRouteRecordRaw extends RouteRecordRaw {
  path: RouteRecordRaw.path
  meta?: CustomMeta
  name?: RouteRecordRaw.name
  props?: RouteRecordRaw.props
  children?: CustomRouteRecordRaw[]
  redirect?: RouteRecordRaw.redirect
  component?: RouteRecordRaw.component
}
