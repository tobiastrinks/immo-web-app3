<template>
  <Layout></Layout>
</template>

<script>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

export default defineNuxtComponent({
  async setup() {
    const cfStore = useCfStore()
    const { path } = useNativeRoute()

    await useAsyncData(() => cfStore.fetchLegalPage(path).then(() => true))
    const config = useRuntimeConfig()

    useHead({
      title: 'Aktuelle Grundstückspreise - Datenschutz',
      meta: [
        config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
        { hid: 'robots', name: 'robots', content: 'noindex,follow' }
      ].filter(i => !!i),
      link: [getCanonical(config.public.canonicalHostname, path)]
    })
  }
})
</script>
