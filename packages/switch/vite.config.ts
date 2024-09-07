import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'
import UnoCSS from 'unocss/vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        version: pkg.version,
        namespace: 'allen/allen-env-switch',
        include: ['*'],
      },
      build: {
        fileName: 'allen-env-switch.user.js',

        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),

  ],
})
