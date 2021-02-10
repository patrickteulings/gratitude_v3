// Core
import { reactive } from 'vue'

// Firebase
import { db } from '@/config/firebaseConfigTypeScript'

// Interfaces
import { IMood } from '@/types/Mood'
import { IUser } from '@/types/UserType'

// Constants
const ADD_SINGLE_MOOD = 'ADD_SINGLE_MOOD'
const UPDATE_SINGLE_MOOD = 'UPDATE_SINGLE_MOOD'

export const MoodStore = {
  namespaced: true,
  state: reactive({
    moods: []
  }),

  mutations: {
    ADD_SINGLE_MOOD: (state: any, mood: IMood) => {
      state.moods.push(mood)
    },

    UPDATE_SINGLE_MOOD: (state: any, mood: IMood) => {
      let el = state.moods.find(item => item.id === mood.id)
      el = mood
    }
  },

  actions: {
    addSingleMood: (context: any, mood: IMood) => {
      context.commit(ADD_SINGLE_MOOD, mood)
    },

    loadMoods: (context: any, user: any) => {
      const ref = db.collection('users').doc(user.uid).collection('settings').doc('moods').collection('items')
      return ref.get()
    },

    updateMood: (context: any, payload: any): Promise<any> => {
      const { mood, user } = payload
      const moodReference = db.collection('users').doc(user.uid).collection('settings').doc('moods').collection('items')

      return moodReference.doc(mood.id).set(mood).then(() => {
        context.commit(UPDATE_SINGLE_MOOD)
      }).catch(() => {
        console.log('Error - updateMood')
      })
    }
  },

  getters: {
    getMoods: (state) => state.moods
  }
}
