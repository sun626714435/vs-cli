import { isEmpty } from 'lodash-es'
import { StatusCodes } from 'http-status-codes'
import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

import router from '@/router'
import { paths } from '@/router/paths'
import commonAPIS from '@/api/common'
// import { request } from '@/utils/generateAPIs'
import { getCookie } from '@/utils/common'
import { LOCALE_KEYS } from '@/locale'
import { useAccessesStore } from './useAccesses'
import { LOCALSTORAGE_KEYS, RoleItem } from '@/static/enums'

export const useCommonStore = defineStore('COMMON_STORE', {
  state: () => ({
    org: localStorage.getItem(LOCALSTORAGE_KEYS.ORG) ?? '',
    role: localStorage.getItem(LOCALSTORAGE_KEYS.ROLE) ?? ('' as RoleItem | ''),
    locale: (localStorage.getItem(LOCALSTORAGE_KEYS.LOCALE) as LOCALE_KEYS) || LOCALE_KEYS.EN,
    system: '',
    userInfo: {},
    isCollapse: true,
    keepAliveComponentNames: [] as string[],
  }),
  actions: {
    async setToken(query: any) {
      const tokenInCookie = getCookie('token')
      let token = ''
      if (isEmpty(tokenInCookie)) {
        token = query.token
      } else {
        token = tokenInCookie
      }
      ;(VueCookies as any).remove('token')

      if (query.role) {
        this.role = query.role[0] as string
        localStorage.setItem(LOCALSTORAGE_KEYS.ROLE, this.role)
      }

      if (!isEmpty(token)) {
        localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, token)
        await this.getCurrentUserInfo()
        router.replace(paths.root)
      }
    },
    async login(params: any) {
      try {
        const { code, data } = await commonAPIS.login(params)
        if (code === 200) {
          const temp = {
            token: data.token,
            role: data.roles,
          }
          this.setToken(temp)
          await this.getCurrentUserInfo()
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async exitLogin() {
      try {
        const { code } = await commonAPIS.logout()
        if (code === 200) {
          this.$reset()
          localStorage.removeItem(LOCALSTORAGE_KEYS.ORG)
          localStorage.removeItem(LOCALSTORAGE_KEYS.ROLE)
          localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN)
          localStorage.removeItem(LOCALSTORAGE_KEYS.REDIRECT)
          sessionStorage.removeItem('ACCESSES')
          sessionStorage.removeItem('COMMON_STORE')
          router.push({ path: '/login' })
        }
      } catch (err) {
        console.log('exitLogin ===>', err)
      }
    },
    async getCurrentUserInfo() {
      try {
        const { code, data } = await commonAPIS.getUserInfo()
        if (code === StatusCodes.OK) {
          this.userInfo = data
          const role = data.roles.find((item: any) => item === this.role)
          if (!role) this.role = ''
          if (!this.role && data.roles?.length === 1) {
            this.role = data.roles[0].roleCode
          }
          const accesses = useAccessesStore()
          accesses.setAccesses(this.role ? [this.role] : data.roles)
          router.push({ path: data.homePath })
        }
      } catch (error) {
        console.log('getCurrentUserInfo =>', error)
        throw error
      }
    },
    addKeepAliveComponentName(componentName: string) {
      if (this.keepAliveComponentNames.indexOf(componentName) === -1) {
        this.keepAliveComponentNames.push(componentName)
      }
    },
    removeKeepAliveComponentName(componentName: string) {
      const index = this.keepAliveComponentNames.indexOf(componentName)
      if (index !== -1) {
        this.keepAliveComponentNames.splice(index, 1)
      }
    },
  },
  getters: {
    isProductionMode() {
      return import.meta.env.MODE === 'prod'
    },
  },
  persistedState: {
    includePaths: ['org', 'role', 'isCollapse'],
  },
})
