/// <reference types="vite/client" />

declare module '*.vue' {
  // eslint-disable-next-line import/no-duplicates
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/locale' {
  // eslint-disable-next-line import/no-duplicates
  import { App } from 'vue'
  import { I18n } from 'vue-i18n'

  const i18n: I18n & { global: I18n['global'] & { t: (...args: any[]) => string } }
  const setupI18n: (app: App) => void

  export enum LOCALE_KEYS {
    CN = 'zhCN',
    EN = 'enUS',
  }

  export { i18n, setupI18n }
}

declare module 'uuid'
declare module 'PubSub'
declare module 'localforage'
declare module 'json-stringify-safe'
declare module 'pinia-plugin-persistedstate-2'
declare module 'element-plus/dist/locale/en'
declare module 'element-plus/dist/locale/zh-cn'
