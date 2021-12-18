export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ma Super Boutique',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tous les produits que vous cherchez!' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css'
  ],

  router: {
    prefetchLinks: true
  },


  pageTransition: {
    name: 'wipe',
    mode: 'out-in',
  },

  loading: {
    color: '#42b983',
    height: '5px'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/repositories.js',
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.SERVER1_REST_API_BASE_URL || 'https://storerestservice.azurewebsites.net/api/'
    },

    server2BaseURL: process.env.SERVER2_REST_API_BASE_URL,
    authServerURL: process.env.AUTH_SERVER_URL || 'https://www.mocky.io/v2/5b9149823100002a00939952'
  },
  privateRuntimeConfig: {
    apiSecret: process.env.SERVER1_REST_API_SECRET
  }

}
