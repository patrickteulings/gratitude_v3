import { IUser } from '@/types/UserType'
import { reactive } from 'vue'

const SET_USER = 'SET_USER'

export const UserStore = {
  namespaced: true,
  state: reactive({
    user: null
  }),
  mutations: {
    SET_USER: (state: any, user: IUser) => {
      console.log('user', user)
      state.user = user
    }
  },
  actions: {
    setUser: (context: any, user: IUser) => {
      context.commit(SET_USER, user)
    }
  },
  getters: {
    getUser: (state) => state.user
  }
}
