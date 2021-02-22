<template>
  <div class="highlights">
    <div class="highlights__inner" ref="myWrapper" id="test">
      <div class="highlights__item" @click="navigateTo">
        <h5 class="highlights__title">Blast from the past</h5>
        <span class="highlights__body">What did you write on previous thursdays?</span>
      </div>
      <div class="highlights__item" @click="navigateTo">
        <h5 class="highlights__title">Streaks</h5>
        <span class="highlights__body">Your previous streaks and accomplishments</span>
      </div>
      <div class="highlights__item" @click="navigateTo">
        <h5 class="highlights__title">Habits</h5>
        <span class="highlights__body">Keep track of your healthy habit that support your gratitude</span>
      </div>
      <div class="highlights__item" @click="navigateTo">
        <h5 class="highlights__title">Habits</h5>
        <span class="highlights__body">We're working on this</span>
      </div>
    </div>
  </div>
  <div style="display: none;">
    <months-ago :currentDate="new Date()" />
  </div>
</template>

<script lang="ts">

// @TODO update date when a date on homepage is clicked

import { defineComponent, watch, computed, onMounted, onBeforeUnmount, ref } from 'vue'

import MonthsAgo from '@/components/toast/MonthsAgo.vue'

// Composables
import { useSwipe } from '@/use/useSwipe'


export default defineComponent({
  components: {
    MonthsAgo
  },

  setup () {
    const myWrapper = ref<HTMLElement | null>()
    // const transform = ref(0)
    const { diffX, currentX, isInputDeviceDown } = useSwipe(myWrapper)
    const highlightsPosition = ref(0)

    const getPosition = computed(() => {
      return { transform: `translateX(${highlightsPosition.value}px)` }
    })

    const removeEvents = () => {
      console.log('removeevents')
    }

    const navigateTo = () => {
      console.log('navigate To')
    }

    onMounted(() => {
      myWrapper.value = document.getElementById('test')
    })

    const updatePosition = (diff: number) => {
      highlightsPosition.value = diff
    }

    onBeforeUnmount(() => {
      removeEvents()
    })

    watch([currentX, isInputDeviceDown], othervalue => {
      console.log('isInputDeviceDown', isInputDeviceDown.value)
      updatePosition(-diffX.value)
    })

    return {
      getPosition,
      currentX,
      diffX,
      navigateTo
    }
  }
})
</script>

<style scoped>

</style>
