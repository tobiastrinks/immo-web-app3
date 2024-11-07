<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const cfStore = useCfStore()
const route = useNativeRoute()
const nuxtApp = useNuxtApp()

await useAsyncData(() => cfStore.fetchInfoPage(nuxtApp.$cfClient, route.path).then(() => true))

const config = useRuntimeConfig()

useHead({
  link: [getCanonical(config.public.canonicalHostname, route.path)],
  title: cfStore.bodenrichtwertPage.seoMetaTitle,
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: cfStore.bodenrichtwertPage.seoMetaDescription }
  ].filter(i => !!i)
})
</script>

<template>
  <Layout>
    <InfoPage :cf-data="cfStore.bodenrichtwertPage" />
  </Layout>
</template>
