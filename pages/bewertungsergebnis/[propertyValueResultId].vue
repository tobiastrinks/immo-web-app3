<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import PropertyValueResult from '@/components/PropertyValueResult/PropertyValueResult.vue'
import {usePropertyValueStore} from "~/store/propertyValue.js";
import {useRoute as useNativeRoute} from "#vue-router";

const propertyValueStore = usePropertyValueStore()
const apiFetch = useApiFetch()
const i18n = useI18n()
const route = useNativeRoute()
const config = useRuntimeConfig()

await useAsyncData(async () => {
  await propertyValueStore.getResult(apiFetch, route.params.propertyValueResultId)
  return true
})

useHead({
  link: [getCanonical(config.public.canonicalHostname, route.path)],
  title: `Bewertungsergebnis für ${propertyValueStore.result?.request?.firstName} ${propertyValueStore.result?.request?.lastName} - Aktuelle Grundstückspreise`,
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex' },
    { hid: 'description', name: 'description', content: `Berechnung vom ${i18n.d(new Date(propertyValueStore.result?.createdAt), 'short')}` }
  ].filter(i => !!i)
})
</script>

<template>
  <div class="property-value-result-page">
    <client-only>
      <PropertyValueResult />
    </client-only>
  </div>
</template>

<style lang="scss">
.property-value-result-page {
  min-height: 100vh;
}
</style>
