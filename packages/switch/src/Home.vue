<script setup lang="ts">
import { GM_registerMenuCommand } from 'vite-plugin-monkey/dist/client';
  import { ref } from 'vue'
  
  const visible = ref(false)
  GM_registerMenuCommand('Settings', () => {
    visible.value = true
  })

  const domain = '.591.com.tw'
  const configs = ref([
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


  const handle = (action: string) => {
    const hostname = window.location.hostname
    const pathname = window.location.pathname
    const search = window.location.search

    const hosts = configs.value.filter(item => hostname.includes(item.subdomain))

    const item = hosts.find(item => item.action === action)
    const _protocol = item?.port ? item?.port : 'https:'
    const _port = item?.port ? `:${item.port}` : ''
    const _prefix = item?.prefix ? item.prefix : ''

    if (item) {
      const url = `${_protocol}//${_prefix}${item.subdomain}${item.env}${domain}${_port}${pathname}${search}`
      console.log('url: ', url);
      window.location.href = url
    }

  }
</script>

<template>
  <section class="w-full h-full bg-#fff">
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold">Switch</h1>
        <p class="text-sm text-gray-500">Press Alt + 1, 2, 3 to switch</p>
      </div>
    </div>
  </section>
</template>
