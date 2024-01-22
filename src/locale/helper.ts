import { mapValues } from 'lodash-es'

const modules = import.meta.glob('./lang/*.ts')

const loop: any = (locale: {}, index: number) =>
  mapValues(locale, (item) => {
    if (Object.prototype.toString.call(item).slice(8, -1) === 'Object') {
      return loop(item, index)
    }
    return item[index]
  })

const lang = (index: number) => {
  let locale = {}
  Object.keys(modules).forEach((key) => {
    const name = key?.split('/')?.pop()?.split('.').shift()
    if (!name) return
    const current = {
      [name]: modules[key],
    }
    locale = Object.assign(current, locale)
  })
  return loop(locale, index)
}

export const zhCN = () => lang(0)
export const enUS = () => lang(1)
