<template>
  <div class="view detail">
    <section class="section detail">
      <div class="section__inner">
        <div class="detail__meta" v-if="getGratitude" :style="[getMood(getGratitude), parallax()]" style="color: #fff;" :class="{'ghosted': doneDeleting}">
          <span class="date">{{ getDate(getGratitude) }}</span><span class="weather" v-if="getWeather(getGratitude)">{{ getWeather(getGratitude).temp }}&deg;C <i :class="getWeather(getGratitude).icon"></i></span>
        </div>
      </div>
    </section>
    <section class="section detail__title">
      <div class="section__inner">
        <div contenteditable="true" class="contenteditableHeader" :class="{'ghosted': doneDeleting}" @keyup="handleTitleEdit">
          {{ getGratitude.title }}
        </div>
        <!-- <h1 v-if="getGratitude" :style="getMood(getGratitude)">
          Edit {{ getGratitude.title }}
        </h1> -->
      </div>
    </section>
    <section class="section detail__body">
      <div class="section__inner">
        <div contenteditable="true" class="contenteditableBody contenteditableBody--edit paragraph" :class="{'ghosted': doneDeleting}" v-html="original.data.body" @keyUp="handleBodyEdit"></div>
    </div>
    </section>
    <section class="section edit__dropdown">
      <div class="section__inner">
        <drop-down :listData="moods" @onupdate="handleMoodEdit" :class="{'ghosted': doneDeleting}"></drop-down>
      </div>
    </section>
    <section class="section edit__actions">
      <div class="section__inner">
          <button v-if="!doneDeleting && !isDeleting" @click="submitGratitude()" class="btn" :class="{'isSubmitting': isSubmitting}">
            <span v-if="isSubmitting === false">Update</span>
            <div class="spinnerContainer" v-if="isSubmitting === true">
              <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
              </svg>
            </div>
          </button>
          <button v-if="!doneDeleting" @click="handleDelete()" class="btn btn--delete" :class="{confirm: deleteWarningShown, isSubmitting: isDeleting}">
            <span v-if="deleteWarningShown && !isDeleting">Are you sure?</span>
            <span v-else-if="!isDeleting">Delete</span>
            <div class="spinnerContainer" v-if="isDeleting === true">
              <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
              </svg>
            </div>
          </button>
        <button @click="handleBack()" class="btn btn--delete confirm" v-if="doneDeleting">
          Back home
        </button>
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

import DropDown from '@/components/ui/DropDown.vue'
// Composables
import useDate from '@/use/useDate'

// Interface
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'
import { IUser } from '@/types/UserType'
import { IMood } from '@/types/Mood'

interface IState {
  originalGratitude: IGratitudeWrapper | object;
  editedGratitude: IGratitudeWrapper | object;
  user: IUser;
  data: IGratitude | null;
  scrollY: number;
  scroll: Function;
  deleteWarningShown: boolean;
}

export default defineComponent({
  components: {
    DropDown
  },
  setup () {
    const state = reactive({
      data: null,
      count: 0,
      deleteWarningShown: false,
      originalGratitude: store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id),
      editedGratitude: store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id),
      moods: store.getters['moodStore/getMoods'],
      user: store.getters['userStore/getUser'],
      value: 'een value',
      scrollY: 0,
      scroll: useScroll(),
      isSubmitting: false,
      isDeleting: false,
      doneDeleting: false
    })

    const original = store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id)

    let editedTitle = ''
    let editedBody = ''
    let editedMood: IMood

    const getGratitude = computed(() => {
      const filtered = store.getters['gratitudeStore/getGratitudes'].find(item => item.id === router.currentRoute.value.params.id)
      state.originalGratitude = Object.assign({}, filtered)

      return filtered.data
    })

    const getDate = (gratitude: IGratitude) => {
      return useDate().getDefaultFormat(gratitude.timeStamp.toDate())
    }

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

    const handleTitleEdit = (e) => {
      editedTitle = e.target.innerText
    }

    const handleBodyEdit = (e) => {
      editedBody = e.target.innerText
    }

    const handleMoodEdit = (mood: IMood) => {
      editedMood = mood
      console.log('selected ', editedMood)
    }

    const submitGratitude = () => {
      state.isSubmitting = true

      state.editedGratitude.data.user = store.getters['userStore/getUser']
      state.editedGratitude.data.title = (editedTitle.length) ? editedTitle : state.originalGratitude.data.title
      state.editedGratitude.data.body = (editedBody.length) ? editedBody : state.originalGratitude.data.body
      state.editedGratitude.data.mood = editedMood || {}


      store.dispatch('gratitudeStore/updateGratitude', state.editedGratitude).then(() => {
        setTimeout(() => {
          console.log('ge-updated')
          state.isSubmitting = false
        }, 1900)
      })
    }

    // Deleting is a two-step process. First click asks for a confirmation
    const handleDelete = () => {
      if (state.deleteWarningShown) {
        state.isDeleting = true

        store.dispatch('gratitudeStore/deleteGratitude', state.originalGratitude).then(() => {
          console.log('deleted')
          setTimeout(() => {
            state.isDeleting = false
            state.doneDeleting = true
          }, 1000)
        })
      } else {
        state.deleteWarningShown = true
      }
    }

    const handleBack = () => {
      router.push('/')
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
      parallax,
      handleTitleEdit,
      handleBodyEdit,
      handleMoodEdit,
      original,
      submitGratitude,
      handleDelete,
      handleBack,
      temperature: computed(() => store.getters['gratitudeStore/getWeather'])
    }
  }
})
</script>

<style lang="scss" scoped></style>
