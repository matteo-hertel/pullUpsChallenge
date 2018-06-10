// import firebase from 'firebase'
// import { firebaseMutations, firebaseAction } from 'vuexfire'
import globalConfig from '../nuxt.config'

export const state = () => ({
  appTitle: globalConfig.head.title,
  drawer: false,
  stats: {},
  isLoading: true
})

export const mutations = {
  // ...firebaseMutations,
  toggleLodingState(state) {
    state.isLoading = !state.isLoading
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  }
}

// const createStore = () => {
//  return new Vuex.Store({
//    state: {
//      user: null,
//      account: null
//    },
//    getters: {
//      isAuthenticated (state) {
//        return !!state.user
//      }
//    },
//    actions: ,
//    mutations: {
//      setUser (state, user) {
//        state.user = user
//        return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
//      }
//    }
//  })
// }
//
// export default createStore
