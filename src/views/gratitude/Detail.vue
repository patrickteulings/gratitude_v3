<template>
  <div class="view detail">
    <section class="section detail">
      <div class="section__inner">
        <div class="detail__meta" v-if="getGratitude" :style="[getMood(getGratitude.data), parallax()]" style="color: #fff;">
          <span class="date">{{ getDate(getGratitude.data) }}</span><span class="weather" v-if="getWeather(getGratitude.data)">{{ getWeather(getGratitude.data).temp }}&deg;C <i :class="getWeather(getGratitude.data).icon"></i></span>
        </div>
      </div>
    </section>
    <section class="section detail__title">
      <div class="section__inner">
        <h1 v-if="getGratitude" :style="getMood(getGratitude.data)" @click="handleDetailClick(getGratitude)">
         {{ getGratitude.data.title }}
        </h1>
      </div>
    </section>
    <section class="section detail__body">
      <div class="section__inner">
        <p v-if="getGratitude" v-html="getGratitude.data.body"></p>
        <p v-else></p>
    </div>
    </section>
  </div>
</template>

<script lang="ts">
// Core
import { reactive, toRefs, defineComponent, computed, onMounted, watch } from 'vue'
import router from '@/router'
import store from '@/store'
import { useScroll } from '@/use/useScroll'

// Composables
import useDate from '@/use/useDate'

// Interface
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'
import { IUser } from '@/types/UserType'


interface IState {
  originalGratitude: IGratitudeWrapper | null;
  user: IUser;
  data: IGratitude | null;
  selectedGratitude: IGratitude | null;
  scrollY: number;
  scroll: any;

}

export default defineComponent({
  components: {

  },
  setup () {
    const state: IState = reactive({
      data: null,
      count: 0,
      selectedGratitude: null,
      user: store.getters['userStore/getUser'],
      value: 'een value',
      scrollY: 0,
      originalGratitude: null,
      scroll: useScroll()
    })

    const getGratitude = computed(() => {
      state.originalGratitude = store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id)
      // return filtered || { data: { title: `It's called...`, body: 'gratitude' } }
      return (state.originalGratitude) ? state.originalGratitude : {}
    })

    const getDate = (gratitude: IGratitude) => useDate().getDefaultFormat(gratitude.timeStamp.toDate())

    const getMood = (gratitude: IGratitude) => {
      return {
        color: (gratitude.mood) ? gratitude.mood.value : '#FFFFFF'
      }
      // return (gratitude.data.mood.value) ? gratitude.data.mood.value : '#FFFFFF'
    }

    const getWeather = (gratitude: IGratitude) => {
      return (gratitude.weather && gratitude.weather.weatherID) ? { temp: Math.round(gratitude.weather.temp), icon: `wi wi-owm-${gratitude.weather.weatherID}` } : null
    }

    const parallax = () => {
      return {
        transform: `translateY(${(state.scrollY < 80) ? Math.round(state.scrollY / 2) : 40}px)`
      }
    }

    const handleScroll = (scrollObject) => {
      state.scrollY = scrollObject
    }

    const handleDetailClick = (gratitude: IGratitudeWrapper) => {
      router.push({ name: 'gratitude/edit', params: { id: gratitude.id } })
    }

    watch(state.scroll, (oldScrollPosition, newScrollPosition) => {
      const { scrollY } = newScrollPosition

      handleScroll(scrollY)
    })

    return {
      ...toRefs(state),
      router,
      getGratitude,
      getDate,
      getMood,
      getWeather,
      handleDetailClick,
      parallax,
      temperature: computed(() => store.getters['gratitudeStore/getWeather'])
    }
  }
})
</script>

<style lang="scss" scoped></style>
