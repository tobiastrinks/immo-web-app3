<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import { META_TITLE_MONTHS, X_FEATURES, Y_VALUES } from 'assets/js/constants'
import {useCfStore} from "~/store/cf.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";
import { useRoute as useNativeRoute } from 'vue-router'
import cfLocationFaktoren from '~/assets/cf/cfLocationFaktoren.json'
import cfLocationFAQ from '~/assets/cf/cfLocationFAQ.json'

const nuxtApp = useNuxtApp()
const overviewStatsStore = useOverviewStatsStore()
const locationStore = useLocationStore()
const cfStore = useCfStore()
const cachedApi = useCachedApi()
const { path, params: { stateIdName } } = useNativeRoute()

const { error } = await useAsyncData(async () => {
  cfStore.resetBodenrichtwert()
  cfStore.locationFaktoren = cfLocationFaktoren
  cfStore.locationFAQ = cfLocationFAQ

  const location = { stateIdName }

  // do this first to catch 404 errors for invalid locations
  await locationStore.getState(cachedApi, location)

  const fetchPromises = [
    overviewStatsStore.loadAdditionalStats(cachedApi, location),
    overviewStatsStore.loadPriceOverTimeStats(cachedApi, location),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.PRICE_PER_SQM }),
    cfStore.fetchLocationBodenrichtwert(nuxtApp.$cfClient, location),
    cfStore.fetchLocationTrend(nuxtApp.$cfClient, location),
    locationStore.getMarketReport(cachedApi, location)
  ]
  const { state, kreis } = locationStore
  if (state || kreis) {
    fetchPromises.push(
        overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: 'CHILD_LOCATION', yValue: 'PRICE_PER_SQM' })
    )
  }
  await Promise.all(fetchPromises)

  await overviewStatsStore.selectOverviewStats(cachedApi, { location, xFeature: 'PLOT_SIZE', yValue: 'PRICE_PER_SQM' })
  return true
})

if (error?.value?.statusCode === 404) {
  throw createError({ statusCode: 404, message: 'Diese URL ist ungültig' })
}

const config = useRuntimeConfig()
const now = new Date()
const locationName = locationStore.activeLocationMainData.name

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: `Grundstückspreise ${locationName} - Stand: ${META_TITLE_MONTHS[now.getMonth()]} ${now.getFullYear()}`,
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: `Grundstückspreise ${locationName} ${new Date().getFullYear()}: Jetzt kostenlos informieren! ✓ aktuelle Marktdaten ✓ interaktive Karte ✓ Quadratmeterpreis & Bodenrichtwert` }
  ].filter(i => !!i)
})
</script>

<template>
  <State v-if="locationStore.state" />
  <Kreis v-else-if="locationStore.kreis" />
  <Gemeinde v-else-if="locationStore.gemeinde" />
</template>
