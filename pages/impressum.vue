<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const cfStore = useCfStore()
const { path } = useNativeRoute()

await useAsyncData(() => cfStore.fetchLegalPage(path).then(() => true))
const config = useRuntimeConfig()

useHead({
  title: 'Aktuelle Grundstückspreise - Impressum',
  meta: [
    config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'robots', name: 'robots', content: 'noindex,follow' }
  ].filter(i => !!i),
  link: [getCanonical(config.public.canonicalHostname, path)]
})
</script>

<template>
  <Layout>
    <LegalPage :cf-data="cfStore.imprintPage" />
  </Layout>
</template>
