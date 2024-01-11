import type { App } from 'vue'

import { useAccessesStore } from '@/store/useAccesses'

export default (app: App) => {
  // 权限指令，useAccessesStore 钩子执行返回结果为当前用户所具备的身份权限
  // binding.value 为该元素自身的身份权限
  // 当其中某个 canAccess 为 true 时，表示拥有该权限
  app.directive('permission', {
    mounted(el, binding) {
      const accesses = useAccessesStore()

      if (typeof binding.value !== 'undefined') {
        if (accesses[binding?.value] === false) {
          el.classList.add('hidden')
        } else {
          el.classList.remove('hidden')
          // eslint-disable-next-line no-unused-expressions
          import.meta.env.MODE === 'development' && el.classList.add('v-permission-active')
        }
      }
    },
  })
}
