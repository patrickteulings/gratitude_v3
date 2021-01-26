import { reactive } from 'vue'
import { db } from '@/config/firebaseConfigTypeScript'

// Types.Interfaces
import { IGratitude, IGratitudeWrapper } from '@/types/Gratitude'
import { ILocation } from '@/types/Location'
import { IWeather } from '@/types/Weather'

const ADD_MULTIPLE_GRATITUDES = 'ADD_MULTIPLE_GRATITUDES'
const ADD_GRATITUDE = 'ADD_GRATITUDE'
const UPDATE_GRATITUDE = 'UPDATE_GRATITUDE'
const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER'
const SAVE_GRATITUDE = 'SAVE_GRATITUDE'

export const GratitudeStore = {
  namespaced: true,
  state: reactive({
    gratitudes: [],
    location: null,
    weather: null,
    currentGratitude: null
  }),


  mutations: {
    ADD_MULTIPLE_GRATITUDES: (state: any, payload: Array<IGratitude>) => {
      console.log(state.gratitudes)
    },

    ADD_GRATITUDE: (state: any, payload: IGratitude) => {
      state.gratitudes.push(payload)
    },

    SAVE_GRATITUDE: (state, payload: IGratitude) => {
      const userID = (payload.user !== undefined) ? payload.user.uid : ''
      const ref = db.collection('users').doc(userID).collection('gratitudes')

      if (userID === '') return

      ref.add(payload).then((response: firebase.firestore.DocumentReference) => {
        const getRef = db.collection('users').doc(userID).collection('gratitudes').doc(response.id).get().then((result: firebase.firestore.DocumentData) => {
          const gratitudeWrapper: IGratitudeWrapper = { id: result.id, data: result.data() }
          state.currentGratitude = gratitudeWrapper
          state.gratitudes.push(gratitudeWrapper)
        })
      }).catch((error) => {
        console.error('Error writing document: ', error)
      }).finally(() => {
        console.log('SAVE_GRATITUDE: finally')
      })
    },

    UPDATE_GRATITUDE: (state: any, payload: IGratitudeWrapper): void => {
      const userID = (payload.data && payload.data.user) ? payload.data.user.uid : ''
      const docRef = db.collection('users').doc(userID).collection('gratitudes').doc(payload.id)
      docRef.set(payload.data).then((result: any) => {
        console.log('success', result)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('FINALLY')
      })
    },

    SET_CURRENT_LOCATION: (state: any, payload: ILocation) => {
      state.location = payload
    },

    SET_CURRENT_WEATHER: (state: any, payload: IWeather) => {
      console.log('SET_CURRENT_WEATHER', payload)
      state.weather = payload
    }
  },

  actions: {
    // loadGratitudes: (context: any, user: any): Promise<firebase.firestore.QuerySnapshot> => {
    loadGratitudes: (context: any, user: any): void => {
      console.log('LOADING')
      const { commit } = context
      const ref = db.collection('users').doc(user.uid).collection('gratitudes').orderBy('timeStamp', 'desc').limit(20).get()

      ref.then((result: firebase.firestore.QuerySnapshot) => {
        result.forEach((item: firebase.firestore.DocumentData) => {
          commit(ADD_GRATITUDE,
            {
              data: item.data(),
              id: item.id
            })
        })
      })
    },

    loadGratitudesPromise: (context: any, user: any) => {
      const ref = db.collection('users').doc(user.uid).collection('gratitudes').orderBy('timeStamp', 'desc').limit(20)
      return ref.get()
    },

    addGratitudes: (context, gratitudes: Array<IGratitude>): void => {
      const { commit } = context
      commit(ADD_MULTIPLE_GRATITUDES, gratitudes)
    },

    addSingleGratitude: (context, gratitude: IGratitude): void => {
      const { commit } = context
      commit(ADD_GRATITUDE, gratitude)
    },

    updateGratitude: (context, gratitude: IGratitudeWrapper): void => {
      const { commit } = context
      commit(UPDATE_GRATITUDE, gratitude)
    },

    deleteGratitude: (context, gratitude: IGratitudeWrapper) => {
      const userID = (gratitude.data && gratitude.data.user) ? gratitude.data.user.uid : ''
      const ref = db.collection('users').doc(userID).collection('gratitudes').doc(gratitude.id)
      return ref.delete()
    },

    setLocation: (context, location: ILocation): void => {
      const { commit } = context
      commit(SET_CURRENT_LOCATION, location)
    },

    setWeather: (context, weather: IWeather): void => {
      const { commit } = context
      commit(SET_CURRENT_WEATHER, weather)
    },

    saveGratitude: (context, gratitude: IGratitude): void => {
      const { commit, rootGetters } = context
      commit(SAVE_GRATITUDE, gratitude)
    }
  },

  getters: {
    getGratitudes: (state) => {
      return state.gratitudes
    },
    getLocation: (state): ILocation => {
      return state.location
    },
    getWeather: (state): ILocation => {
      return state.weather
    },
    getCurrentGratitude: (state): IGratitudeWrapper => {
      return state.currentGratitude
    }
  }
}
