import 'vue'
import 'pinia'
import { StatusCodes } from 'http-status-codes'

declare namespace Base {
  interface ExceptionInfo {
    exceptionCode: string
    messageEn: string
    messageCn: string
    businessDomain: string
    others: unknown
  }
  interface BasicResponse<T> {
    code?: StatusCodes
    data?: T
    exceptionInfo?: ExceptionInfo
    msg?: string
    pageIndex?: number
    pageSize?: number
    total?: number
  }

  interface IBasicItem {
    id: number | string
    [key: string]: any
  }

  type Pagination = {
    total: number
    current: number
    pageSize: number
  }
}

export = Base
export as namespace VSCLI

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // 通过使用一个 setter，我们可以允许字符串和引用。
    loadings: Record<string, boolean | undefined>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    loadings: Record<string, boolean | undefined>
  }
}
