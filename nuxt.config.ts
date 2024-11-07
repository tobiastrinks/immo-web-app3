export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    awsAmplify: {}
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/_vars.scss" as *;`
        }
      }
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/google-fonts'],
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    vueI18n: './i18n.config.ts',
  },
  googleFonts: {
    families: {
      'Noto Serif': [400, 600],
      Roboto: [300, 400, 500],
      'Averia Sans Libre': {
        ital: 400
      }
    }
  },
  runtimeConfig: {
    public: {
      canonicalHostname: '',
      apiUrl: '',
      apiUrlCached: '',
      apiUrlCachedSsr: '',
      apiUrlPlatform: '',
      blockSeoIndexing: 'true',
      gtmEnabled: 'false'
    }
  }
})
