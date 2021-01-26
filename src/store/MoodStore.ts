// Core
import { reactive } from 'vue'

// Firebase
import { db } from '@/config/firebaseConfigTypeScript'

// Interfaces
import { IMood } from '@/types/Mood'

// Constants
const ADD_SINGLE_MOOD = 'ADD_SINGLE_MOOD'

export const MoodStore = {
  namespaced: true,
  state: reactive({
    moods: []
  }),
  mutations: {
    ADD_SINGLE_MOOD: (state: any, mood: IMood) => {
      console.log('moods', mood)
      state.moods.push(mood)
    }
  },
  actions: {
    addSingleMood: (context: any, mood: IMood) => {
      context.commit(ADD_SINGLE_MOOD, mood)
    },

    loadMoods: (context: any, user: any) => {
      const ref = db.collection('users').doc(user.uid).collection('settings').doc('moods').collection('items')
      return ref.get()
    }
  },
  getters: {
    getMoods: (state) => state.moods
  }
}
