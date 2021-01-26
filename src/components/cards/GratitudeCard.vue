<template>
  <div class="gratitudeCard">
    <div class="gratitudeCard__inner hasHabits">
      <small class="date">
        <span class="date__mood" :style="getMoodStyle(gratitude)"></span>
        <span>{{ getReadableDate(gratitude.timeStamp.toDate()) }}</span>
        <span class="mood__weather" v-if="gratitude.weather"><i :class="getWeatherIcon(gratitude)"></i></span></small>
      <h1 class="gratitudeCard__title">{{ gratitude.title }}</h1>
      <div class="gratitudeCard__body" v-html="gratitude.body"></div>
      <div class="gratitudeCard__tags">
        <div class="tag">trust</div>
      </div>
    </div>
    <div class="gratitudeCard__habits">
      habits
    </div>
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
    const getGratitudeData = (): IGratitude => {
      return { ...props.gratitudeData.data }
    }

    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    const getMoodStyle = (_gratitude) => {
      const styleObj = {
        backgroundColor: (_gratitude.mood) ? _gratitude.mood.value : '#2FD9D9'
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
