<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'
import usePageSchemaOrg from "~/composables/usePageSchemaOrg.js";

const cfStore = useCfStore()
const { path } = useNativeRoute()

const config = useRuntimeConfig()

const cfData = cfStore.dynamicInfoPage

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
