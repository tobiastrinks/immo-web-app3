<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const cfStore = useCfStore()
const { path } = useNativeRoute()

await useAsyncData(() => cfStore.fetchInfoPage(path).then(() => true))

const config = useRuntimeConfig()

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: cfStore.propertyValuePage.seoMetaTitle,
  meta: [
    config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: cfStore.propertyValuePage.seoMetaDescription }
  ].filter(i => !!i)
})
</script>

<template>
  <Layout>
    <InfoPage :cf-data="cfStore.propertyValuePage" />
  </Layout>
</template>
