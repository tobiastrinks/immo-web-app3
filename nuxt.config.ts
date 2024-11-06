const {
  CANONICAL_HOSTNAME,
  API_URL,
  API_URL_CACHED,
  API_URL_CACHED_SSR,
  API_URL_PLATFORM,
  GTM_ENABLED,
  BLOCK_SEO_INDEXING
} = process.env

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
      canonicalHostname: CANONICAL_HOSTNAME,
      apiUrl: API_URL,
      apiUrlCached: API_URL_CACHED,
      apiUrlCachedSSR: API_URL_CACHED_SSR || API_URL_CACHED,
      apiUrlPlatform: API_URL_PLATFORM,
      blockSEOIndexing: BLOCK_SEO_INDEXING,
      gtmEnabled: GTM_ENABLED
    }
  }
})
