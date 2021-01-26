import { createStore } from 'vuex'
import { UserStore } from '@/store/UserStore.ts'
import { GratitudeStore } from '@/store/GratitudeStore.ts'
import { MoodStore } from '@/store/MoodStore.ts'
import { HabitStore } from '@/store/HabitStore.ts'


export default createStore({
  state: {
    user: null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore: UserStore,
    gratitudeStore: GratitudeStore,
    moodStore: MoodStore,
    habitStore: HabitStore
  }
})
