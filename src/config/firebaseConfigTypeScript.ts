import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


export const fire = firebase
  .initializeApp({
    projectId: 'gratitude-945f7',
    apiKey: 'AIzaSyDpzAhwPJyampLkSA7nVX8zk6pykcaMC0c',
    authDomain: 'gratitude-945f7.firebaseapp.com'
  })

const googleProvider = new firebase.auth.GoogleAuthProvider()

// Get a Firestore instance
export const provider = googleProvider
export const db = fire.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
// const { TimeStamp, GeoPoint } = firebase.firestore
// export { TimeStamp, GeoPoint }
