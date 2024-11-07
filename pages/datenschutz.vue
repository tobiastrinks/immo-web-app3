<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const cfStore = useCfStore()
const { path } = useNativeRoute()
const nuxtApp = useNuxtApp()

await useAsyncData(() => cfStore.fetchLegalPage(nuxtApp.$cfClient, path).then(() => true))
const config = useRuntimeConfig()

useHead({
  title: 'Aktuelle Grundstückspreise - Datenschutz',
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'robots', name: 'robots', content: 'noindex,follow' }
  ].filter(i => !!i),
  link: [getCanonical(config.public.canonicalHostname, path)]
})
</script>

<template>
  <Layout>
    <LegalPage :cf-data="cfStore.privacyPage" />
  </Layout>
</template>
