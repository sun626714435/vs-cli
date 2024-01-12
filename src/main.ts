import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/icons/sprite'
import '@/assets/styles/index.scss'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css'

import { setStore } from '@/plugin/store'
import { setupI18n } from '@/locale'
import setPermission from './directive/permission'
import { setElement } from '@/plugin/element'

const render = async () => {
  const app = createApp(App)
  await setupI18n(app)
  app.config.warnHandler = () => null
  setStore(app)
  setElement(app)
  setPermission(app)
  setRem()

  app.use(router).mount('#app')
}
const setRem = () => {
  const rem = document.documentElement.clientWidth / 16
  document.documentElement.style.fontSize = `${rem}px`
}
window.addEventListener('resize', setRem)
render()
