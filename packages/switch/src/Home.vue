<script setup lang="ts">
  import { ref } from 'vue'
  const visible = ref(false)
  GM_registerMenuCommand('Settings', () => {
    
  })
</script>

<template>
  <h1>Home.vue</h1>
  <RouterLink to="//127.0.0.1:5173/setttings">settings</RouterLink>
  <dialog :open="visible">
    Settings
  </dialog>
</template>
