const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
  head: {
    title: 'Tak-mebel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      { hid: 'description', name: 'description', content: 'Tak-mebel' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/t-image.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  modules:['@nuxtjs/axios'],
  axios:{    
    baseURL: 'http://localhost:8000/api/v1/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    credentials : false,
    proxy: false,
    proxyHeaders: false,
    debug: true,
    retry: {
      retries: 3
    },
    requestInterceptor: (config, {store}) => {
      config.headers.common['Authorization'] = '';
      config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
      return config
    }   
  },
  plugins: [
    {src: '~plugins/vuetify.js', ssr: true},
    {src: '~plugins/particles.js', ssr: false},
    {src: '~plugins/chart.js', ssr: false},
    {src: '~plugins/select.js', ssr: false},
    {src: '~plugins/editor.js', ssr: false},
  ],
  css: [
    '~style/app.styl',
    '~style/main.css',
  ],
  loading: { color: '#3B8070' },
  router: {
    middleware: 'interceptor'
  },
  build: {
    postcss: false,
    vendor: ['axios'],
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    extend (config, {isDev, isClient}) {
      
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }

});