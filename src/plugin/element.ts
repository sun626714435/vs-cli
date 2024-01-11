// elementUI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

export const setElement = (app: App) => {
  // 全局加载icon
  // eslint-disable-next-line array-callback-return
  Object.entries(ElementPlusIconsVue).map(([key, component]) => {
    app.component(key, component)
  })

  app.use(ElementPlus)
}
