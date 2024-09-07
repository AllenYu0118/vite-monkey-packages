<script setup lang="ts">
import { ref } from 'vue'
import type { SwitchProps } from './types'
import Settings from './Settings.vue'
import { GM_getValue, GM_log, GM_registerMenuCommand, unsafeWindow } from '$'

const domain = ref(GM_getValue('domain', ''))
const configs = ref<SwitchProps[]>(JSON.parse(GM_getValue('configs', '')) || [])

const url = ref('')
const _window = unsafeWindow as Window

function shortcut(code = 'Digit1', callback: () => void) {
  document.addEventListener('keydown', (event) => {
    if (event.code === code && event.altKey) {
      event.preventDefault()
      callback()
    }
  })
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
  dev: '.dev',
  debug: '.debug',
  online: '',
} as const

type Action = keyof typeof envMap

function handle(action: Action) {
  const hostname = _window.location.hostname
  const pathname = _window.location.pathname
  const search = _window.location.search

  const hosts = configs.value.filter(item => hostname.includes(item.subdomain))

  const item = hosts.find(item => item.action === action)
  const _protocol = item?.protocol ? item?.protocol : 'https:'
  const _port = item?.port ? `:${item.port}` : ''
  const _prefix = item?.prefix ? item.prefix : ''

  if (item) {
    url.value = `${_protocol}//${_prefix}${item.subdomain}${item.env}${domain.value}${_port}${pathname}${search}`
  }
  else if (hostname.includes(domain.value)) {
    const _env = envMap[action]
    const _subdomain = hostname.split('.')[0]

    url.value = `https://${_subdomain}${_env}${domain.value}${pathname}${search}`
  }

  if (url.value) {
    if (url.value === _window.location.href) {
      GM_log('The current environment is the same as the target environment')
      url.value = ''
      return
    }
    _window.location.href = url.value
  }
  else {
    GM_log('No configuration found')
  }
}

const visible = ref(false)

GM_registerMenuCommand('Settings', () => {
  visible.value = true
})
</script>

<template>
  <section
    v-if="url"
    class="
      grid place-items-center
      w-full text-center
      fixed top-0 left-0 z-9999
      text-16px h-60px leading-24px text-#fff
      md:h-45px md:leading-45px md:text-22px
      hue
    "
  >
    <div>Switch: {{ url }}</div>
  </section>

  <Settings v-if="visible" @close="visible = false" />
</template>

<style scoped lang="scss">
.hue {
  background:
    linear-gradient(45deg, #5fddcc, #ff004d);
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
