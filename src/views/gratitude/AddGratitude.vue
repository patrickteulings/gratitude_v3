<template>
  <div class="view addGratitude">
    <section class="section addGratitude__date">
      <div class="section__inner">
        <!-- <div class="detail__meta" v-if="getGratitude" :style="[getMood(getGratitude.data), parallax()]" style="color: #fff;">
          adads
          <span class="date">{{ getDate(getGratitude.data) }}</span><span class="weather" v-if="getWeather(getGratitude.data)">{{ getWeather(getGratitude.data).temp }}&deg;C <i :class="getWeather(getGratitude.data).icon"></i></span>
        </div> -->
        <div class="addGratitude__meta" :style="[parallax()]">
          <span class="date">{{ getDate() }}</span>
          <span class="weather" v-if="getWeather()">{{ getWeather().temp }}&deg;C <i :class="getWeather().icon"></i></span>
        </div>
      </div>
    </section>
    <section class="section addGratitude__title">
      <div class="section__inner">
        <ContentEditable ref='titleElementRef' className="contenteditableHeader" @update-content="handleTitleUpdate" @on-focus="handleContenFocus" />
      </div>
    </section>
    <section class="section addGratitude__body">
      <div class="section__inner">
        <ContentEditable ref='bodyElementRef' className="contenteditableBody paragraph" @update-content="handleBodyUpdate" @on-focus="handleContenFocus" />
      </div>
    </section>
    <section class="section addGratitude__dropdown">
      <div class="section__inner">
        <drop-down :listData="moods" @onupdate="handleMoodUpdate"></drop-down>
      </div>
    </section>
    <section class="section addGratitude__actions">
      <div class="section__inner">
        <button class="btn" :class="{ 'isSubmitting': isSubmitting }" @click="submitNewGratitude()" :disabled="isButtonDisabled">
          <span v-if="!submitted && !isSubmitting">Add Gratitude</span>
          <span v-else-if="submitted && !isSubmitting">Update Gratitude</span>
          <div v-else class="spinnerContainer">
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>

        </button>
        <button v-if="submitted" class="btn btn--secondary" @click="clearGratitude()">Clear / new</button>
        <!-- <span v-if="isSubmitting === true">loading...</span> -->
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// Core
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import router from '@/router'
import store from '@/store'

// Composables
import useDate from '@/use/useDate'
import { useScroll } from '@/use/useScroll'

// Components
import ContentEditable from '@/components/contenteditable/Contenteditable.vue'
import DropDown from '@/components/ui/DropDown.vue'

// Interfaces
import { IUser } from '@/types/UserType'
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'
import { IMood } from '@/types/Mood'

interface IState {
  moods: Array<IMood>;
  user: IUser;
  title: string;
  body: string;
  selectedMood: IMood | null;
  isSubmitting: boolean;
  submitted: boolean;
  isButtonDisabled: boolean;
  scrollY: number;

}

export default defineComponent({
  components: {
    ContentEditable,
    DropDown
  },

  setup () {
    const state: IState = reactive({
      moods: store.getters['moodStore/getMoods'],
      user: store.getters['userStore/getUser'],
      title: '',
      body: '',
      selectedMood: null,
      isSubmitting: false,
      submitted: false,
      isButtonDisabled: false,
      scrollY: 0,
      scroll: useScroll()
    })

    const titleElementRef = ref(ContentEditable)
    const bodyElementRef = ref(ContentEditable)

    // Handle emitted new Title text from ContentEditable
    const handleTitleUpdate = (content: string): void => {
      state.title = content
    }

    // Handle emitted new Body text from ContentEditable
    const handleBodyUpdate = (content: string): void => {
      state.body = content
    }

    const handleMoodUpdate = (mood: IMood) => {
      state.selectedMood = mood
    }

    const clearGratitude = () => {
      titleElementRef.value.resetView()
      bodyElementRef.value.resetView()
      state.submitted = false
    }

    // Let's save this to Firestore
    // @ TODO run update script instead of 'ADD' when
    const submitNewGratitude = () => {
      state.isSubmitting = true
      state.isButtonDisabled = true

      const newGratitude: IGratitude = {
        title: state.title,
        body: state.body,
        location: store.getters['gratitudeStore/getLocation'],
        timeStamp: new Date(),
        dayStamp: useDate().getDayStamp(),
        weather: store.getters['gratitudeStore/getWeather'],
        mood: state.selectedMood,
        user: state.user
      }

      // If Already submitted, UPDATE instead of adding new
      if (state.submitted === true) {
        state.submitted = false

        const wrapper: IGratitudeWrapper = { id: store.getters['gratitudeStore/getCurrentGratitude'].id, data: newGratitude }

        store.dispatch('gratitudeStore/updateGratitude', wrapper).then(() => {
          setTimeout(() => {
            state.isSubmitting = false
            state.submitted = true
          }, 1000)
        })

        return
      }

      // Save to firebase
      store.dispatch('gratitudeStore/saveGratitude', newGratitude).then(() => {
        setTimeout(() => {
          state.isSubmitting = false
          state.submitted = true
        }, 1900)
      })
    }

    const handleContenFocus = () => {
      state.isButtonDisabled = false
    }

    const parallax = () => {
      return {
        transform: `translateY(${(state.scrollY < 80) ? Math.round(state.scrollY / 2) : 40}px)`
      }
    }

    const getWeather = () => {
      const weather = store.getters['gratitudeStore/getWeather']
      //
      return { temp: Math.round(weather.temp), icon: `wi wi-owm-${weather.weatherID}` }
    }
    // Well, get the formatted date
    const getDate = (): string => useDate().getDefaultFormat(new Date())

    onMounted(() => {
      for (const mood of state.moods) {
        if (mood.label && mood.label.toLowerCase() === 'neutral') {
          state.selectedMood = mood
        }
      }
    })

    return {
      ...toRefs(state),
      router,
      getDate,
      submitNewGratitude,
      handleTitleUpdate,
      handleBodyUpdate,
      handleMoodUpdate,
      handleContenFocus,
      getWeather,
      clearGratitude,
      titleElementRef,
      bodyElementRef,
      parallax
    }
  }
})
</script>

<style lang="scss" scoped></style>
