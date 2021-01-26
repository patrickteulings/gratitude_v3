<template>
  <div class="view moods-edit">
    <section class="section moods-edit">
      <div class="section__inner">
        <div>
          <div v-if="moods.length">
            <mood-item v-for="mood in moods" :key="mood.id" :moodData="mood" />
          </div>
        </div>
      </div>
    </section>
    <section class="moods-edit-illustration" role="presentation">
      <div class="mountain-back"><img src="/assets/images/moods/mountain-back.svg" alt="moutain background"></div>
      <div class="mountain-right"><img src="/assets/images/moods/mountain-right.svg" alt="moutain background"></div>
      <div class="plant"><img src="/assets/images/moods/plant.svg" alt="moutain background"></div>
      <div class="mountain-left"><img src="/assets/images/moods/mountain-left.svg" alt="moutain background"></div>
    </section>
  </div>
</template>

<script>
// Core
import { reactive, toRefs, defineComponent, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'

// Components
import MoodItem from '@/components/moods/MoodItem.vue'

export default defineComponent({
  components: {
    MoodItem
  },
  setup () {
    const state = reactive({
      count: 0,
      moods: store.getters['moodStore/getMoods']
    })

    onMounted(() => {
      // document.body.classList.add('pampas')
    })

    onBeforeUnmount(() => {
    // document.body.classList.remove('pampas')
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
