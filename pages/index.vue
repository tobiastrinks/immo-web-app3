<script setup>
import {useCfStore} from "~/store/cf.js";
import {getCanonical} from "assets/js/seoUtils.js";

const cfStore = useCfStore()
await useAsyncData(() => cfStore.fetchHomeFaq().then(() => true))

const config = useRuntimeConfig()

useHead({
  link: [getCanonical(config.public.canonicalHostname, '/')],
  title: 'Aktuelle Grundstückspreise - Startseite',
  meta: [
    config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: 'Die aktuellsten Grundstücksdaten für ganz Deutschland ✓ modernste Technologie ✓ umfangreiche Grundstücksdatenbank ✓ lokale Expertise' }
  ].filter(i => !!i)
})
</script>

<template>
  <Layout>
    <Home />
  </Layout>
</template>
