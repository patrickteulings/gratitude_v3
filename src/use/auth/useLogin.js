import { toRefs, reactive, computed } from 'vue'
import { fire, provider } from '@/config/firebaseConfigTypeScript'

export const useLogin = () => {
  const state = reactive({
    error: null,
    username: null,
    password: null,
    user: null
  })

  /**
  * have this value `isValid` get updated when the dependent properties
  * are changed in the composition function
  */
  const isValid = computed(() => {
    const { username, password } = state
    return (
      username !== null &&
      username.length !== 0 &&
      password !== null &&
      password.length !== 0
    )
  })


  const login = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(state.username, state.password)
      .then(() => {
        console.log('signed in with username/password')
      }, error => (state.error = error))
      .catch(error => {
        // Handle Errors here.
        state.error = error
      })
  }

  // const provider = new fire.auth.GoogleAuthProvider();

  const loginWithGoogle = () => {
    // console.log('trying');
    fire.auth().signInWithRedirect(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken
      // The signed-in user info.
      const user = result.user

      console.log(result)
      // ...
    }).catch(error => {
      state.error = error
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential
      // ...
      console.log(errorCode, errorMessage, email, credential)
    })
  }

  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log('logging out')
        this.$router.push('/login')
      }, error => (state.error = error))
      .catch(error => {
        // Handle Errors here.
        state.error = error
      })
  }

  return {
    // return all of the properties from the function
    ...toRefs(state),

    // return all of the computed value to make sure we
    // get non null values for username/password from the
    // function
    isValid,

    // pass back a login and logout function to be utilized
    // by the login form
    login,
    loginWithGoogle,
    logout
  }
}
