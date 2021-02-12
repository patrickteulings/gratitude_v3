<template>
  <div>
    <months-ago :currentDate="new Date()" />
  </div>
</template>

<script lang="ts">

// @TODO update date when a date on homepage is clicked

import { defineComponent } from 'vue'

import MonthsAgo from '@/components/toast/MonthsAgo.vue'

export default defineComponent({
  components: {
    MonthsAgo
  },

  setup () {
    console.log('hi')
    return {}
  }
})
</script>

<style scoped>

</style>
