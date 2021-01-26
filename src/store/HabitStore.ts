// Core
import { reactive } from 'vue'

// Firebase
import { db } from '@/config/firebaseConfigTypeScript'

// Interfaces
import { IHabit } from '@/types/Habit'
import { IUser } from '@/types/UserType'

// Constants
const ADD_SINGLE_HABIT = 'ADD_SINGLE_HABIT'

export const HabitStore = {
  namespaced: true,
  state: reactive({
    habits: []
  }),
  mutations: {
    ADD_SINGLE_HABIT: (state: any, habit: IHabit) => {
      console.log('habits', habit)
      state.habits.push(habit)
    }
  },
  actions: {
    addSingleHabit: (context: any, habit: IHabit) => {
      context.commit(ADD_SINGLE_HABIT, habit)
    },

    loadHabits: (context: any, user: IUser) => {
      const ref = db.collection('users').doc(user.uid).collection('settings').doc('habits').collection('items')
      return ref.get()
    }
  },
  getters: {
    getHabits: (state) => state.habits
  }
}
