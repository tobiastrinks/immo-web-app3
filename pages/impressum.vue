<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const nuxtApp = useNuxtApp()
const cfStore = useCfStore()
const { path } = useNativeRoute()

await useAsyncData(() => cfStore.fetchLegalPage(nuxtApp.$cfClient, path).then(() => true))
const config = useRuntimeConfig()

useHead({
  title: 'Aktuelle Grundstückspreise - Impressum',
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'robots', name: 'robots', content: 'noindex,follow' }
  ].filter(i => !!i),
  link: [getCanonical(config.public.canonicalHostname, path)]
})
</script>

<template>
  <Layout>
    <div class="imprint">
      <LegalPage :cf-data="cfStore.imprintPage" />
    </div>
  </Layout>
</template>

<style lang="scss">
.imprint {

  img {
    width: 100%;
    max-width: 320px;
    margin: 10px 0 40px;
  }
}
</style>
