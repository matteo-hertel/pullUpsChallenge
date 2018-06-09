<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
disable-route-watcher
      mini-variant
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span class='ml-3'>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: true,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      title: 'Vuetify.js'
    }
  }
}
</script>
