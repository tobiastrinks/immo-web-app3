<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'
import usePageSchemaOrg from "~/composables/usePageSchemaOrg.js";

const nuxtApp = useNuxtApp()
const cfStore = useCfStore()
const { path } = useNativeRoute()

await useAsyncData(() => cfStore.fetchInfoPage(nuxtApp.$cfClient, path).then(() => true))

const config = useRuntimeConfig()

const cfData = cfStore.propertyValuePage

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: cfData.seoMetaTitle,
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: cfData.seoMetaDescription }
  ].filter(i => !!i)
})

const pageSchemaOrg = usePageSchemaOrg()
const faqItems = cfData.infoSections
    .find(i => i.id === 'faq')
    ?.items
    ?.find(i => i.cfContentType === 'infoDropdown')
    ?.items

pageSchemaOrg.faqAndProductPage({
  faqItems,
  reviewCount: cfData.reviewCount,
  reviewValue: cfData.reviewValue
})
</script>

<template>
  <InfoPage :cf-data="cfData" />
</template>
