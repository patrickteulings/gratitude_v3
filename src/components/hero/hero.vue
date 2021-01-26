<template>
  <div class="hero">
    <div class="hero__inner">
      <div class="hero__date">{{ getToday() }}</div>
      <div class="hero__weather">{{ (location) ? location.city : 'loading' }}, {{ (weather) ? weather.temp : 'loading' }}&deg;</div>
    </div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, computed } from 'vue'
import store from '@/store'

import { useDate } from '@/use/useDate'

export default defineComponent({
  setup () {
    const today = new Date()

    const getToday = (): string => {
      return useDate().getToday(today)
    }
    return {
      today,
      getToday,
      weather: computed(() => store.getters['gratitudeStore/getWeather']),
      location: computed(() => store.getters['gratitudeStore/getLocation'])
    }
  }
})
</script>

<style scoped>

</style>
