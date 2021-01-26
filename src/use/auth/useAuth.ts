import { toRefs, reactive } from 'vue'

import { fire } from '@/config/firebaseConfigTypeScript'
import store from '@/store'
import { IUser } from '@/types/UserType.ts'

interface IState {
  user: IUser | null;
  loading: boolean;
  error: boolean | null;

}


export default function () {
  // our reactive properties...
  const state: IState = reactive({
    user: null,
    loading: true,
    error: null
  })

  // make the firebase call to listen for change in auth state,
  // we have set initial loading status to true so nothing happens on UI
  // side until loading is set to false
  fire.auth().onAuthStateChanged(function (_user) {
    if (_user && _user !== null) {
      const user: IUser = {
        displayName: _user.displayName,
        uid: _user.uid,
        email: _user.email,
        photoURL: _user.photoURL ? _user.photoURL : ''
      }
      state.user = user
      store.dispatch('userStore/setUser', user)
    } else {
      state.user = null
      store.dispatch('userStore/setUser', null) // User is gone, nullify
    }
    state.loading = false
  })

  // return all of the properties from the function
  return {
    ...toRefs(state)
  }
}
