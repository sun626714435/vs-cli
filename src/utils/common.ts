export const getImage = (imageName: string): InstanceType<typeof URL>['href'] =>
  new URL(`../assets/images/${imageName}`, import.meta.url).href

export const getPrimaryType = (params: any) => Object.prototype.toString.call(params).slice(8, -1)

export const isFormData = (params: any) => getPrimaryType(params) === 'FormData'

export const isUploadingFileInFormData = (param: any): boolean => {
  if (isFormData(param)) return param.has('file')
  return false
}

export const getCookie = (cname: any) => {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
