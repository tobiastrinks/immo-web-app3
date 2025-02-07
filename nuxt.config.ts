export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "~/assets/css/_vars.scss" as *;`
        }
      }
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    'nuxt-schema-org'
  ],
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    vueI18n: './i18n.config.ts',
  },
  googleFonts: {
    subsets: ['latin'],
    families: {
      'Noto Serif': [400, 600],
      Roboto: [300, 400, 500],
      'Averia Sans Libre': {
        ital: 400
      }
    }
  },
  site: {
    url: 'https://www.aktuelle-grundstueckspreise.de',
    name: 'Aktuelle Grundstückspreise'
  },
  schemaOrg: {
    defaults: false
  },
  sitemap: {
    sitemaps: {
      locations: {
        sources: [
          '/api/__sitemap__/locations',
        ]
      },
      info: {
        includeAppSources: true,
        exclude: [
          '/deutschland/**',
          '/renditerechner-immobilien/rechner'
        ],
        urls: () => {
          return [
              '/geschossflaechenzahl-gfz',
              '/grundflaechenzahl-grz',
              '/grundstueckswert-rechner',
              '/hauswert-ermitteln',
              '/grundstueckswert-ermitteln',
              '/vergleichswertverfahren',
              '/immobilienbewertung',
              '/solaranlagen-photovoltaik',
              '/bodenrichtwerte',
              '/grundstueck-verkaufen',
              '/grundstuecksgroesse-ermitteln',
              '/immobilienmakler',
              '/wertgutachten-immobilien',
              '/hausverkauf-bei-scheidung',
              '/grundstueck-teilen-und-verkaufen',
          ]
        }
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
