/* eslint-disable import/no-extraneous-dependencies */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { terser } from 'rollup-plugin-terser'
import ViteRestart from 'vite-plugin-restart'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'

import type { PluginOption } from 'vite'

export const createPlugins = (mode: string, env: Record<string, string>) => {
  const pluginArr: PluginOption | PluginOption[] = [
    vue(),
    vueJsx(),
    ViteRestart({
      restart: ['vite.config.[jt]s'],
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-i18n', 'vue-router', 'pinia'],
      dts: 'auto-import.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: 'readonly',
      },
    }),
    terser(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: env.VITE_APP_TITLE,
        },
      },
      template: 'index.html',
    }),
    visualizer({ open: false }),
    viteMockServe({
      mockPath: 'mock',
    }),
  ]
  return pluginArr
}
