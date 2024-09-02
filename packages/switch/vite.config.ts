import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        include: ['*'],
        resource: {
          setttings: '//127.0.0.1:5173/settings',
        }
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
      server: { mountGmApi: true },
    }),
    
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: 'src/main.ts',
  //       settings: 'src/settings.ts',
  //     }
  //   }
  // }
});
