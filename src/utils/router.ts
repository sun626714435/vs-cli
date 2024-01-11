import router from '@/router'

import type { InitData } from './typing/common'

interface PathData {
  path: string
  params?: InitData
  query?: InitData
}

/**
 * type?:string 用什么方式 push、replace、go
 * isKeepAlive?:boolean 是否用KeepAlive
 */
interface Config {
  type?: string
  isKeepAlive?: boolean
}

export const routerTo = (pathData: PathData | string, config?: Config) => {
  setTimeout(() => {
    router[config?.type || 'push'](pathData)
  }, 20)
}

export const goTo = (pathData: PathData | string | number, type?: string) => {
  router[type || 'push'](pathData)
}
