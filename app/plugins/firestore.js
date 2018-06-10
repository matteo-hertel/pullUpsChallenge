import firebaseConfig from '~/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebaseConfig) {
  throw new Error('missing firebase.json config.')
}

export default function({ store, redirect }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  const firestore = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  firestore.settings(settings)
  const cache = firestore
    .collection(`pullupTracking`)
    .doc('production')
    .collection('cache')
    .doc('appCache')
  cache
    .get()
    .then(ref => ref.data())
    .then(console.log)
}
