// eslint-disable-next-line import/no-extraneous-dependencies
import { loadEnv, ConfigEnv, PluginOption, UserConfig } from 'vite'
import { createProxies } from './vite.proxy'
import { createPlugins } from './vite.plugin'

const path = require('path')

enum ENV {
  DEVELOPMENT = 'development',
  QA = 'qa',
  PROD = 'prod',
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = env
  const plugins: PluginOption | PluginOption[] = createPlugins(mode, env)
  return {
    base: VITE_PUBLIC_PATH,
    plugins,
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    define: {
      // 去掉I18N tree shaking 警告
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    server: {
      hmr: true, // 热更新
      host: true,
      open: false, // 浏览器自动打开
      port: Number(VITE_PORT),
      proxy: createProxies(VITE_PROXY),
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: mode === ENV.PROD,
          drop_debugger: true,
        },
      },
      sourcemap: mode !== ENV.PROD,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 8000,
    },
  }
}
