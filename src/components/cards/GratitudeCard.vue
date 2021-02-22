<template>
  <div class="gratitudeCard">
    <div class="gratitudeCard__inner hasHabits">
      <small class="date">
        <span class="date__wrapper">
          <span class="date__mood" :style="getMoodStyle(gratitude).background"></span>
          <span :style="getMoodStyle(gratitude).color">{{ getReadableDate(gratitude.timeStamp.toDate()) }}</span>
        </span>
        <span class="mood__weather" v-if="gratitude.weather"><i :class="getWeatherIcon(gratitude)"></i></span></small>
      <h3 class="gratitudeCard__title">{{ gratitude.title }}</h3>
      <div class="gratitudeCard__body" v-html="gratitude.body"></div>
      <div class="gratitudeCard__tags">
        <div class="tag">Trust</div>
      </div>
    </div>
    <!-- <div class="gratitudeCard__habits">
      habits
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import store from '@/store'

// Components
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'


// Composables
import { useDate } from '@/use/useDate'

export default defineComponent({
  props: {
    gratitudeData: {
      type: Object as PropType<IGratitudeWrapper>,
      required: true
    }
  },

  setup (props) {
    const moods = store.getters['moodStore/getMoods']

    const getGratitudeData = (): IGratitude => {
      return { ...props.gratitudeData.data }
    }

    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    const getMoodStyle = (_gratitude) => {
      const mood = moods.find((mood) => mood.id === _gratitude.mood.id)

      const styleObj = {
        background: { backgroundColor: (mood) ? mood.value : '#2FD9D9' },
        color: { color: (mood) ? mood.value : '#2FD9D9' }
      }
      return styleObj
    }

    const getWeatherIcon = (gratitude: IGratitude) => {
      return `wi wi-owm-${gratitude.weather.weatherID}`
    }

    return {
      gratitude: getGratitudeData(),
      getMoodStyle,
      getReadableDate,
      getWeatherIcon,
      temp: computed(() => store.getters['gratitudeStore/getWeather'])
    }
  }
})
</script>

<style scoped>

</style>
