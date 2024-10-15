<script setup>
import { getCanonical } from '~/assets/js/seoUtils'
import {META_TITLE_MONTHS, X_FEATURES, Y_VALUES} from '~/assets/js/constants'
import cfLocationFaktoren from '~/assets/cf/cfLocationFaktoren.json'
import cfLocationFAQ from '~/assets/cf/cfLocationFAQ.json'
import {useRoute as useNativeRoute} from "#vue-router";
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";
import {useCfStore} from "~/store/cf.js";

const { path, params: { stateIdName, kreisIdName } } = useNativeRoute()

const overviewStatsStore = useOverviewStatsStore()
const locationStore = useLocationStore()
const cfStore = useCfStore()
const cachedApi = useCachedApi()

const { error } = await useAsyncData(async () => {
  cfStore.resetBodenrichtwert()
  cfStore.locationFaktoren = cfLocationFaktoren
  cfStore.locationFAQ = cfLocationFAQ

  const location = { stateIdName, kreisIdName }

  // do this first to catch 404 errors for invalid locations
  await locationStore.getKreis(cachedApi, location)

  const fetchPromises = [
    overviewStatsStore.loadAdditionalStats(cachedApi, location),
    overviewStatsStore.loadPriceOverTimeStats(cachedApi, location),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.PRICE_PER_SQM }),
    cfStore.fetchLocationBodenrichtwert(location),
    cfStore.fetchLocationBodenrichtwert({ ...location, mini: true }),
    cfStore.fetchLocationTrend(location),
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
    config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: `Grundstückspreise ${locationName} ${new Date().getFullYear()}: Jetzt kostenlos informieren! ✓ aktuelle Marktdaten ✓ interaktive Karte ✓ Quadratmeterpreis & Bodenrichtwert` }
  ].filter(i => !!i)
})
</script>

<template>
  <Layout>
    <Kreis v-if="locationStore.kreis" />
    <Gemeinde v-else-if="locationStore.gemeinde" />
  </Layout>
</template>
