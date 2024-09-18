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

    await useAsyncData(() => cfStore.fetchInfoPage(path).then(() => true))

    const config = useRuntimeConfig()

    useHead({
      link: [getCanonical(config.public.canonicalHostname, path)],
      title: cfStore.propertySellPage.seoMetaTitle,
      meta: [
        config.public.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
        { hid: 'description', name: 'description', content: cfStore.propertySellPage.seoMetaDescription }
      ].filter(i => !!i)
    })
  }
})
</script>
