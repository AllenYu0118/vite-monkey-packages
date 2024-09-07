import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/index.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: '@allen/vite-monkey-password',
        include: ['*'],
      },
      build: {
        fileName: 'allen-show-password.user.js',
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})
