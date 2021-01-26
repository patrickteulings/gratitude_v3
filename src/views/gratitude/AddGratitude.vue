<template>
  <div class="view addGratitude">
    <section class="section addGratitude__date">
      <div class="section__inner">
        <div class="date">{{ getDate() }}</div>
      </div>
    </section>
    <section class="section addGratitude__title">
      <div class="section__inner">
        <ContentEditable ref='titleElementRef' className="contenteditableHeader" @update-content="handleTitleUpdate" />
      </div>
    </section>
    <section class="section addGratitude__body">
      <div class="section__inner">
        <ContentEditable ref='bodyElementRef' className="contenteditableBody paragraph" @update-content="handleBodyUpdate" />
      </div>
    </section>
    <section class="section addGratitude__dropdown">
      <div class="section__inner">
        <drop-down :listData="moods" @onupdate="handleMoodUpdate"></drop-down>
      </div>
    </section>
    <section class="section addGratitude__actions">
      <div class="section__inner">
        <button class="btn" :class="{ 'isSubmitting': isSubmitting }" @click="submitNewGratitude()">
          <span v-if="!submitted && !isSubmitting">Add Gratitude</span>
          <span v-else-if="submitted && !isSubmitting">Update Gratitude</span>
          <div class="spinnerContainer" v-else>
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
      submitted: false
    })

    const titleElementRef = ref()
    const bodyElementRef = ref()

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

      // If Already submitted, update instead of adding new
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
      store.dispatch('gratitudeStore/saveGratitude', newGratitude).then((response) => {
        setTimeout(() => {
          state.isSubmitting = false
          state.submitted = true
        }, 1900)
      })
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
      clearGratitude,
      titleElementRef,
      bodyElementRef
    }
  }
})
</script>

<style lang="scss" scoped></style>
