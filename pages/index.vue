<template>
  <Home />
</template>

<script>
import {useCfStore} from "~/store/cf.js";

export default defineNuxtComponent({
  async setup() {
    const cfStore = useCfStore()
    await useAsyncData(() => cfStore.fetchHomeFaq().then(() => true))
  }
})
// {
  // TODO
  // async fetch ({ store }) {
  //   await store.dispatch('cf/fetchHomeFaq')
  // },
  // head () {
  //   return {
  //     link: [getCanonical(this.$config.canonicalHostname, '/')],
  //     title: 'Aktuelle Grundstückspreise - Startseite',
  //     meta: [
  //       this.$config.blockSEOIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
  //       { hid: 'description', name: 'description', content: 'Die aktuellsten Grundstücksdaten für ganz Deutschland ✓ modernste Technologie ✓ umfangreiche Grundstücksdatenbank ✓ lokale Expertise' }
  //     ].filter(i => !!i)
  //   }
  // }
// }
</script>
