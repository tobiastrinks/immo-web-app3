<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import { META_TITLE_MONTHS, X_FEATURES, Y_VALUES } from 'assets/js/constants'
import {useCfStore} from "~/store/cf.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";
import { useRoute as useNativeRoute } from 'vue-router'
import usePageSchemaOrg from "~/composables/usePageSchemaOrg.js";
import cfLocationFaktoren from "assets/cf/cfLocationFaktoren.json";
import cfLocationFAQ from "assets/cf/cfLocationFAQ.json";

const nuxtApp = useNuxtApp()
const overviewStatsStore = useOverviewStatsStore()
const locationStore = useLocationStore()
const cfStore = useCfStore()
const cachedApi = useCachedApi()
const { path } = useNativeRoute()

const config = useRuntimeConfig()

await useAsyncData(async () => {
  locationStore.marketReport = null
  cfStore.resetBodenrichtwert()
  cfStore.locationFaktoren = cfLocationFaktoren
  cfStore.locationFAQ = cfLocationFAQ

  await Promise.all([
    locationStore.getGermany(cachedApi),
    overviewStatsStore.loadAdditionalStats(cachedApi, {}),
    overviewStatsStore.loadPriceOverTimeStats(cachedApi, {}),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.PLOT_SIZE, yValue: Y_VALUES.PROPERTY_COUNT }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.DEVELOPMENT_STATUS, yValue: Y_VALUES.PROPERTY_COUNT }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.BUILDING_PERMISSION, yValue: Y_VALUES.PROPERTY_COUNT }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.CHILD_LOCATION, yValue: Y_VALUES.PRICE_PER_SQM }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.CHILD_LOCATION, yValue: Y_VALUES.MARKETING_PERIOD }),
    overviewStatsStore.loadOverviewStats(cachedApi, { location: {}, xFeature: X_FEATURES.CHILD_LOCATION, yValue: Y_VALUES.PROPERTY_COUNT }),
    cfStore.fetchLocationBodenrichtwert(nuxtApp.$cfClient, {}),
    cfStore.fetchLocationTrend(nuxtApp.$cfClient, {})
  ])
  await overviewStatsStore.selectOverviewStats(cachedApi, { location: {}, xFeature: 'PLOT_SIZE', yValue: 'PRICE_PER_SQM' })
  return true
})

const now = new Date()

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: `Aktuelle Grundstückspreise in Deutschland - Stand: ${META_TITLE_MONTHS[now.getMonth()]} ${now.getFullYear()}`,
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: `Grundstückspreise Deutschland ${new Date().getFullYear()}: Jetzt kostenlos informieren! ✓ aktuelle Marktdaten ✓ interaktive Karte ✓ Quadratmeterpreis & Bodenrichtwert` }
  ].filter(i => !!i)
})

const pageSchemaOrg = usePageSchemaOrg()
const locationText = useLocationText()

pageSchemaOrg.faqAndProductPage({
    faqItems: cfStore.locationFAQ?.faqItems,
    reviewCount: locationStore.activeLocationMainData.reviewCount,
    reviewValue: locationStore.activeLocationMainData.reviewValue,
    productDescription: locationText.getPriceOverTimeText()
})
</script>

<template>
  <Germany v-if="locationStore.germany" />
</template>
