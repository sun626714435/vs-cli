/* eslint-disable prefer-regex-literals */
import qs from 'qs'
import { omit, isObject, isArray, isEmpty } from 'lodash-es'

import type { BasicResponse, RequestInstance } from '../../typing/common'
import { DataTypeString } from '@/static/enums'

const injectPathQueriesIntoUrl = (url: string, pathQueries: Record<string, string>) =>
  url.replace(/{(.*)}/g, (_, b) => pathQueries[b])

const SEPARATOR = /\s{1,}/
const COMMON_PATTERN = '*'
const IF_DATA_IS_ARRAY = /\s\[d|(data)]\s?/
const IF_DATA_IS_FORM_DATA = /\s(d|(data))\.(f|formData):/
const MATCH_DATA_STRING = new RegExp('(?<=\\s(d|(data))(\\.(f|formData))?:)(\\S*)')
const MATCH_PATH_STRING = new RegExp('(?<=\\spath:)(\\S*)')
const MATCH_QUERY_STRING = new RegExp('(?<=\\s(q|query):)(\\S*)')

const getNewObjectByKeysFrom = (target: Record<string, any>, keys: string[]) =>
  keys.reduce((acc: Record<string, any>, key: string) => ({ ...acc, [key]: target[key] }), {})

const apiTransfer = (request: RequestInstance<any>, requestString: string) => {
  const [method, url] = requestString.split(SEPARATOR)
  const isDataArray = IF_DATA_IS_ARRAY.test(requestString)
  const [pathKeysString] = requestString.match(MATCH_PATH_STRING) || []
  const [queryKeysString] = requestString.match(MATCH_QUERY_STRING) || []
  const [paramsKeysString] = requestString.match(MATCH_DATA_STRING) || []

  const hasPathQueries = !!pathKeysString

  const pathKeys = pathKeysString?.split(',') || []
  const queryKeys = queryKeysString?.split(',') || []

  const isFormData = !isDataArray ? IF_DATA_IS_FORM_DATA.test(requestString) : false
  const isPatternData = paramsKeysString === COMMON_PATTERN
  return (...args: any[]) => {
    let data
    let path
    let query
    const [majorPayload, otherPayload, otherAxiosConfig = {}] = args

    if (isDataArray) {
      data = majorPayload
      path = getNewObjectByKeysFrom(otherPayload, pathKeys)
      query = getNewObjectByKeysFrom(otherPayload, queryKeys)
    } else {
      let omittedParams
      if (majorPayload?.dataType === DataTypeString) {
        omittedParams = majorPayload?.id
      } else {
        omittedParams = omit(majorPayload, [...queryKeys, ...pathKeys])
      }
      data =
        isPatternData || isFormData
          ? omittedParams
          : getNewObjectByKeysFrom(omittedParams, paramsKeysString?.split(',') || [])
      path = getNewObjectByKeysFrom(majorPayload, pathKeys)
      query = getNewObjectByKeysFrom(majorPayload, queryKeys)
    }
    const finalUrl = hasPathQueries ? injectPathQueriesIntoUrl(url, path) : url
    const finalQueries = queryKeys ? qs.stringify(query) : ''

    return request(
      {
        url: `${import.meta.env.VITE_API_BASE_URL}${finalUrl}${
          finalQueries ? `?${finalQueries}` : ''
        }`,
        method: method.toLocaleUpperCase(),
        ...(isObject(data) && !isArray(data) && isEmpty(data) ? {} : { params: data }),
        ...omit(otherAxiosConfig, ['url', 'params']),
      },
      isFormData
    )
  }
}

export const generatorAPIS = <T extends string>(
  request: RequestInstance<any>,
  apis: Record<string, string>
) =>
  Object.keys(apis).reduce(
    (acc, key) => ({
      ...acc,
      [key]: apiTransfer(request, apis[key]),
    }),
    {}
  ) as Record<T, (...args: any[]) => Promise<BasicResponse<any>>>
