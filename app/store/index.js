import globalConfig from '../nuxt.config'

export const state = () => ({
  appTitle: globalConfig.head.title,
  sidebar: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}
