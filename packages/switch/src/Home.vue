<script setup lang="ts">
  import { ref } from 'vue'
  import { useStorage } from '@vueuse/core'
  const visible = ref(false)
  GM_registerMenuCommand('Settings', () => {
    visible.value = true
  })

  const domain = '.591.com.tw'
  const configs = ref([
    { action: 'dev', subdomain: 'rent', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'rent', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'rent', env: '', port: 0 },

    { action: 'dev', subdomain: 'sale', env: '.dev', port: 3003 },
    { action: 'debug', subdomain: 'sale', env: '.debug', port: 0 },
    { action: 'online', subdomain: 'sale', env: '', port: 0 },
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
    const _port = item?.port ? `:${item.port}` : ''

    if (item) {
      const url = `//${item.subdomain}${item.env}${domain}${_port}${pathname}${search}`
      console.log('url: ', url);
      window.location.href = url
    }

  }
</script>

<template>
  <h1>Home.vue</h1>
  <RouterLink to="//127.0.0.1:5173/setttings">settings</RouterLink>
  <!-- <dialog :open="visible">
    <textarea v-model="ls" />
  </dialog> -->
</template>
