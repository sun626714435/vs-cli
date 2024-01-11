// Pinia 持久储存
import stringify from 'json-stringify-safe'
import { Pinia, PiniaPluginContext } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import type { App } from 'vue'

const loadings = reactive<Record<string, boolean | undefined>>({})
const loadingPlugin = ({ app, store }: PiniaPluginContext) => {
  if (typeof app.config.globalProperties.loadings === 'undefined')
    app.config.globalProperties.loadings = loadings

  if (typeof store.loadings === 'undefined') store.loadings = loadings

  store.$onAction(({ name, store, after, onError }) => {
    loadings[`${store.$id}/${name}`] = true
    after(() => {
      loadings[`${store.$id}/${name}`] = false
    })
    onError(() => {
      loadings[`${store.$id}/${name}`] = false
    })
  })
}

export const setStore = (app: App) => {
  const pinia: Pinia = createPinia()
  const storage = sessionStorage
  pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: async (key: string) => storage.getItem(key),
        setItem: async (key: string, value: any) => storage.setItem(key, value),
        removeItem: async (key: string) => storage.removeItem(key),
      },
      serialize: (value: any) => stringify(value),
    })
  )
  pinia.use(loadingPlugin)
  app.use(pinia)
}
