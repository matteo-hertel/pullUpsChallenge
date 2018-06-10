import globalConfig from '../nuxt.config'

export const state = () => ({
  appTitle: globalConfig.head.title,
  drawer: false
})

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer
  }
}
