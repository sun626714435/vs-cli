/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]

type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>

const httpsRE = /^https:\/\//

export function createProxies(data: string) {
  if (!data) return

  let proxyList: ProxyItem[] = []

  try {
    proxyList = JSON.parse(data)
  } catch (error) {
    proxyList = []
  }

  const proxies: ProxyTargetList = {}

  for (const [prefix, target] of proxyList) {
    const isHttps = httpsRE.test(target)

    proxies[prefix] = {
      ws: true,
      target: target,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      changeOrigin: true,
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }

  return proxies
}
