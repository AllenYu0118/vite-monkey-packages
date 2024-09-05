<script setup lang="ts">
import { GM_registerMenuCommand, GM_log } from 'vite-plugin-monkey/dist/client';
  import { ref } from 'vue'
  import { SwitchProps } from './types'
  
  const visible = ref(false)
  GM_registerMenuCommand('Settings', () => {
    visible.value = true
  })

  const domain = '.591.com.tw'
  const url = ref('')
  const configs = ref<SwitchProps[]>([
    { action: 'dev', subdomain: 'rent', prefix: 'house-', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'rent', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'rent', env: '', port: 0 },

    { action: 'dev', subdomain: 'sale', prefix: 'house-', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'sale', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'sale', env: '', port: 0 },

    { action: 'dev', subdomain: 'busines', prefix: 'house-', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'busines', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'busines', env: '', port: 0 },

    { action: 'dev', subdomain: 'land', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'land', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'land', env: '', port: 0 },
  ])


  function shortcut(code = 'Digit1', callback: Function) {
    document.addEventListener('keydown', function (event) {
      if (event.code === code && event.altKey) {
        event.preventDefault();
        typeof callback === 'function' && callback()
      }
    });
  }

  shortcut('Digit1', () => {
    handle('dev')
  })

  shortcut('Digit2', () => {
    handle('debug')
  })

  shortcut('Digit3', () => {
    handle('online')
  })

  const envMap = {
    'dev': '.dev',
    'debug': '.debug',
    'online': '',
  } as const

  type Action = keyof typeof envMap

  const handle = (action: Action) => {
    const hostname = window.location.hostname
    const pathname = window.location.pathname
    const search = window.location.search

    const hosts = configs.value.filter(item => hostname.includes(item.subdomain))

    const item = hosts.find(item => item.action === action)
    const _protocol = item?.protocol ? item?.protocol : 'https:'
    const _port = item?.port ? `:${item.port}` : ''
    const _prefix = item?.prefix ? item.prefix : ''

    if (item) {
      url.value = `${_protocol}//${_prefix}${item.subdomain}${item.env}${domain}${_port}${pathname}${search}`
    } else if (hostname.includes(domain)){
      const _env = envMap[action]
      const _subdomain = hostname.split('.')[0]

      url.value = `https://${_subdomain}${_env}${domain}${pathname}${search}`
    }

    if (url.value) {
      if (url.value === window.location.href) {
        GM_log('The current environment is the same as the target environment')
        url.value = ''
        return
      }
      window.location.href = url.value
    } else {
      GM_log('No configuration found')
    }
  }
</script>

<template>
  <section class="w-full h-full bg-green progress hue" v-if="url">
    Switch: {{ url }}
  </section>
</template>

<style scoped lang="scss">
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: #f56c6c;
  z-index: 9999;
  color: #fff;
  text-align: center;
  font-size: 22px;
  line-height: 30px;
}

.hue {
  background: 
    linear-gradient(45deg,0% #5fddcc, 50% #ff004d,);
  animation: hueRotate 2s infinite alternate;
}

@keyframes hueRotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
