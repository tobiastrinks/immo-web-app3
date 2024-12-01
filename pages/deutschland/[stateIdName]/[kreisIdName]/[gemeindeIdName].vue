<script setup>
import { getCanonical } from '~/assets/js/seoUtils'
import {META_TITLE_MONTHS, X_FEATURES, Y_VALUES} from '~/assets/js/constants'
import cfLocationFaktoren from '~/assets/cf/cfLocationFaktoren.json'
import cfLocationFAQ from '~/assets/cf/cfLocationFAQ.json'
import {useLocationStore} from "~/store/location.js";
import {useCfStore} from "~/store/cf.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useRoute as useNativeRoute} from "#vue-router";
import {enableSchemaOrg} from "assets/js/featureFlagUtils.js";
import usePageSchemaOrg from "~/composables/usePageSchemaOrg.js";

const nuxtApp = useNuxtApp()
const overviewStatsStore = useOverviewStatsStore()
const locationStore = useLocationStore()
const cfStore = useCfStore()
const cachedApi = useCachedApi()
const { path, params: { stateIdName, kreisIdName, gemeindeIdName } } = useNativeRoute()

const { error } = await useAsyncData(async () => {
  cfStore.resetBodenrichtwert()
  cfStore.locationFaktoren = cfLocationFaktoren
  cfStore.locationFAQ = cfLocationFAQ

  const location = { stateIdName, kreisIdName, gemeindeIdName }

  // do this first to catch 404 errors for invalid locations
  await locationStore.getGemeinde(cachedApi, location)

  await Promise.all([
    overviewStatsStore.loadAdditionalStats(cachedApi, location),
    overviewStatsStore.loadPriceOverTimeStats(cachedApi, location),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.PRICE_PER_SQM }),
    cfStore.fetchLocationBodenrichtwert(nuxtApp.$cfClient, location),
    cfStore.fetchLocationBodenrichtwert(nuxtApp.$cfClient, { stateIdName: location.stateIdName, mini: true }),
    cfStore.fetchLocationTrend(nuxtApp.$cfClient, location),
    locationStore.getMarketReport(cachedApi, location)
  ])

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

if (enableSchemaOrg(path)) {
  const pageSchemaOrg = usePageSchemaOrg()
  const locationText = useLocationText()

  pageSchemaOrg.faqAndProductPage({
    faqItems: cfStore.locationFAQ?.faqItems,
    reviewCount: locationStore.activeLocationMainData.reviewCount,
    reviewValue: locationStore.activeLocationMainData.reviewValue,
    productDescription: locationText.getPriceOverTimeText()
  })
}
</script>

<template>
  <Gemeinde v-if="locationStore.gemeinde" />
</template>
