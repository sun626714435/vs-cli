import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

import type { App } from 'vue'
import enUS from './enUS'
import zhCN from './zhCN'
import { LOCALSTORAGE_KEYS } from '@/static/enums'

export enum LOCALE_KEYS {
  CN = 'zhCN',
  EN = 'enUS',
}

const locale = localStorage.getItem(LOCALSTORAGE_KEYS.LOCALE) || LOCALE_KEYS.EN

if (!locale) {
  localStorage.setItem(LOCALSTORAGE_KEYS.LOCALE, LOCALE_KEYS.EN)
}

export const i18n = createI18n({
  fallbackLocale: LOCALE_KEYS.CN,
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale,
  messages: {
    enUS,
    zhCN,
  },
  // silentTranslationWarn: true
}) as I18n

export async function setupI18n(app: App) {
  app.use(i18n)
}
