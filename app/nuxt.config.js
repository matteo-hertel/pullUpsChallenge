const colors = require('vuetify/es5/util/colors').default
module.exports = {
  /*
  ** Headers of the page
  */
  lol: true,
  head: {
    title: 'PullUpTracking',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Chatty Images' },
      { name: 'msapplication-TileImage', content: '/icons/144.png' },
      { name: 'msapplication-TileColor', content: '#000' },
      {
        hid: 'description',
        name: 'description',
        content: 'Pullup tracking to push the limit!'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', href: '/icons/144.png.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    {
      src: '~/plugins/firestore',
      ssr: false
    }
  ],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: colors.blue.darken2 },
  modules: ['@nuxtjs/dotenv', '@nuxtjs/pwa'],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/vuetify.js'],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
