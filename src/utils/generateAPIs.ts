import { isEmpty } from 'lodash-es'
import { ElMessage } from 'element-plus'
import { StatusCodes } from 'http-status-codes'

import { LOCALE_KEYS } from '@/locale'
import { useCommonStore } from '@/store/useCommonStore'
import { LOCALSTORAGE_KEYS } from '@/static/enums'
import { isUploadingFileInFormData } from './common'
import generateRequest, { generatorAPIS as G } from './request'
import { useApiLoading } from '@/hooks/use-api-loading'

const TIMEOUT = {
  DEFAULT: 60000,
  UPLOADING: 5 * 60000,
}

const ERROR_CODES = {
  REPEAT_LOGIN: '510',
  CASE_NO_OPERATION: '3005',
}

const uploadAPIs = ['static-files']

const { addLoading, clearLoading } = useApiLoading()

export const request = generateRequest({
  timeout: TIMEOUT.DEFAULT,
  withCredentials: true,
  requestInterceptors: [
    (config: any) => {
      addLoading()

      const { url, data } = config
      const commonStore = useCommonStore()
      const { org, role, locale } = commonStore
      return {
        ...config,
        timeout:
          uploadAPIs.some((item) => (url as string).includes(item)) &&
          isUploadingFileInFormData(data)
            ? TIMEOUT.UPLOADING
            : config.timeout,
        headers: {
          ...config.headers,
          ORG: org,
          ROLE: role,
          locale,
        },
      }
    },
    (error: any) => Promise.reject(error),
  ],
  responseInterceptors: [
    (response: any) => {
      clearLoading()

      const commonStore = useCommonStore()
      const { data, status } = response

      if (status === StatusCodes.OK) {
        const { exceptionInfo, code } = data
        const {
          messageEn = '',
          messageCn = '',
          exceptionCode = '',
        } = !isEmpty(exceptionInfo) ? exceptionInfo : {}
        const message = commonStore.locale === LOCALE_KEYS.CN ? messageCn : messageEn

        if (typeof code === 'undefined' && data instanceof Blob) return response
        if (code !== StatusCodes.OK) {
          if (message) ElMessage.error(message)
          if (code === StatusCodes.GONE) {
            const redirect = localStorage.getItem(LOCALSTORAGE_KEYS.REDIRECT)
            localStorage.removeItem(LOCALSTORAGE_KEYS.TOKEN)
            window.location.href =
              data.data + (redirect && redirect !== 'null' ? `&state=${redirect}` : '')
          }
          if (exceptionCode === ERROR_CODES.CASE_NO_OPERATION) window.location.href = `#/403`
          return Promise.reject(response)
        }

        return response
      }
      return Promise.reject(response)
    },
    (error: any) => {
      clearLoading()

      ElMessage.error(error as string)
      return Promise.reject(error)
    },
  ],
  authorizationToken: LOCALSTORAGE_KEYS.TOKEN,
})

export const generatorAPIS = <T extends string>(apiConfig: Record<string, string>) =>
  G<T>(request, apiConfig)
