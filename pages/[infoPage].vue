<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCfStore} from "~/store/cf.js";
import { useRoute as useNativeRoute } from 'vue-router'

const cfStore = useCfStore()
const { path } = useNativeRoute()
const nuxtApp = useNuxtApp()

await useAsyncData(() => cfStore.fetchInfoPage(nuxtApp.$cfClient, path).then(() => true))
if (!cfStore.dynamicInfoPage) {
  throw createError({ statusCode: 404, message: 'Diese URL ist ungültig' })
}

const config = useRuntimeConfig()

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: cfStore.dynamicInfoPage.seoMetaTitle,
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: cfStore.dynamicInfoPage.seoMetaDescription }
  ].filter(i => !!i)
})
</script>

<template>
  <InfoPage :cf-data="cfStore.dynamicInfoPage" />
</template>
