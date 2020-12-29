import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - mrb_frontend',
    title: 'mrb_frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/date-fns
    '@nuxtjs/date-fns',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  router: {
    middleware: ['auth'],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },
  // Nuxt development server host (https://nuxtjs.org/faq/host-port#via-a-nuxt-config-in-the-packagejson)
  server: {
    port: 3030, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  proxy: {
    '/api/': { target: 'http://localhost:4040', pathRewrite: { '^/api/': '' } },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'values',
          },
          logout: null,
          user: {
            url: '/api/profile',
            method: 'get',
            propertyName: 'values',
          },
        },
        tokenType: '',
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      user: '/',
    },
  },
  pwa: {
    manifest: {
      name: 'mrb: meeting room booking',
      short_name: 'mrb',
      theme_color: '#ffffff',
      author: 'Arvian',
    },
    icon: {
      fileName: 'mrbicon.png',
    },
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
