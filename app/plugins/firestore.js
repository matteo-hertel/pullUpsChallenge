import firebaseConfig from '~/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebaseConfig) {
  throw new Error('missing firebase.json config.')
}

export default function({ store }) {
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

  cache.onSnapshot(presentationLayer(storePayload(store, 'storeStats')))
}
// Move this somewhere sensible
function presentationLayer(fn) {
  return function formatData(data) {
    const rawData = getSnaspshotData(data)
    rawData.average = rawData.completed / Object.keys(rawData.weeks).length
    const currentWeek = rawData.weeks[Object.keys(rawData.weeks).pop()]
    rawData.currentWeek = currentWeek
    return fn(rawData)
  }
}
function storePayload(store, action) {
  return function storeData(data) {
    return store.dispatch(action, data)
  }
}

function getSnaspshotData(snap) {
  return getData(snap)

  function getData(obj) {
    return obj.data()
  }
}
