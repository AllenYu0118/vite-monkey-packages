<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { GM_getValue, GM_log, GM_registerMenuCommand, GM_setValue, unsafeWindow } from '$'

const emits = defineEmits(['close'])
const domain = ref(GM_getValue('domain', ''))
const configs = ref(GM_getValue('configs', ''))

const dialog = ref<null | HTMLDialogElement>(null)

async function save() {
  await GM_setValue('domain', domain.value)
  await GM_setValue('configs', configs.value)

  unsafeWindow.alert('Saved!')

  close()
}

onMounted(() => {
  const clientWidth = document.documentElement.clientWidth

  if (clientWidth < 640) {
    unsafeWindow.alert('Please use a larger screen to view the settings.')

    emits('close')
  }
  else {
    dialog.value?.showModal()
  }
})

onUnmounted(() => {
  dialog.value?.close()
})

function close() {
  dialog.value?.close()

  emits('close')
}
</script>

<template>
  <dialog ref="dialog" class="bg-#fff w-80% h-80% border-none outline-none rounded-10px relative">
    <h2 class="border-b-2px b-b-#eee b-b-solid pb-10px">
      Switch Settings
    </h2>
    <i class="absolute right-30px top-18px cursor-pointer text-22px color-#333" title="关闭" @click="close">ⓧ</i>

    <div>
      <div class="mb-6 mt-20px">
        <label
          for="domain"
          class="block mb-2 font-medium text-gray-900 dark:text-white text-sm"
        >domian</label>

        <input id="domain" v-model="domain" type="input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=".google.com" required>
      </div>

      <label for="configs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Configs</label>
      <textarea id="configs" v-model="configs" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your configs here..." />

      <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 mt-20px cursor-pointer" @click="save">
        Save
      </button>
    </div>
  </dialog>
</template>

<style scoped lang="scss">

</style>

<style>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
}
</style>
