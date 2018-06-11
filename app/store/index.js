import globalConfig from '../nuxt.config'
import Vue from 'vue'

export const state = () => ({
  appTitle: globalConfig.head.title,
  isLoading: true,
  showError: false
})

export const getters = {
  allTimeAverageWeek: state => {
    try {
      return state.stats.average
    } catch (exc) {
      return 0
    }
  },
  currentWeekCompleted: state => {
    try {
      return state.stats.currentWeek.completed
    } catch (exc) {
      return 0
    }
  },
  currentWeekRejected: state => {
    try {
      return state.stats.currentWeek.rejected
    } catch (exc) {
      return 0
    }
  },
  allTimeRejected: state => {
    try {
      return state.stats.rejected
    } catch (exc) {
      return 0
    }
  },
  allTimeCompleted: state => {
    try {
      return state.stats.completed
    } catch (exc) {
      return 0
    }
  },
  loadingState: state => state.isLoading
}
export const mutations = {
  storeStats(state, stats) {
    Vue.set(state, 'stats', stats)
  },
  toggleLodingState(state) {
    Vue.set(state, 'isLoading', !state.isLoading)
  }
}
export const actions = {
  storeStats({ commit, dispatch }, payload) {
    commit('storeStats', payload)
    commit('toggleLodingState')
  }
}
