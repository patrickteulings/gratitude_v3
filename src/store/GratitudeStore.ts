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

interface IGratitudeState {
  gratitudes: Array<IGratitudeWrapper>;
  location: ILocation | null;
  weather: IWeather | null;
  currentGratitude: IGratitudeWrapper | null;
}

export const GratitudeStore = {
  namespaced: true,
  state: reactive({
    gratitudes: [],
    location: null,
    weather: null,
    currentGratitude: null
  }),


  mutations: {
    ADD_MULTIPLE_GRATITUDES: (state: IGratitudeState, payload: Array<IGratitude>) => {
      console.log(state.gratitudes)
    },

    ADD_GRATITUDE: (state: IGratitudeState, payload: IGratitudeWrapper) => {
      state.gratitudes.push(payload)
    },

    SAVE_GRATITUDE: (state: IGratitudeState, payload: IGratitude) => {
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

    UPDATE_GRATITUDE: (state: IGratitudeState, payload: IGratitudeWrapper): void => {
      // Now update local store
      const userID = (payload.data && payload.data.user) ? payload.data.user.uid : ''
      const docRef = db.collection('users').doc(userID).collection('gratitudes').doc(payload.id)
      const el = state.gratitudes.find(item => item.id === payload.id)

      if (el) el.data.title = payload.data.title
      if (el) el.data.body = payload.data.body
      if (el) el.data.mood = payload.data.mood

      docRef.set(payload.data).then((result: any) => {
        console.log('success', result)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('FINALLY')
      })
    },

    SET_CURRENT_LOCATION: (state: IGratitudeState, payload: ILocation) => {
      state.location = payload
    },

    SET_CURRENT_WEATHER: (state: IGratitudeState, payload: IWeather) => {
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

      const el = context.state.gratitudes.findIndex(item => item.id === gratitude.id)
      context.state.gratitudes.splice(el, 1)

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
