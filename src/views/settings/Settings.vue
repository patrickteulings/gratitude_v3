<template>
  <div>
    Settings
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Settings',
  setup () {
    console.log('habits')

    onMounted(() => {
      document.body.classList.add('pampas')
    })

    onBeforeUnmount(() => {
      document.body.classList.remove('pampas')
    })

    return {}
  }
})
</script>

<style scoped>

</style>
