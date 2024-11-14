<script setup>
import { getCanonical } from '~/assets/js/seoUtils'
import {useAsyncData} from "#app";
import {useCalcStore} from "~/store/calc.js";
import {useCfStore} from "~/store/cf.js";
import useCalc from "~/composables/useCalc.js";
import {useRoute as useNativeRoute} from "#vue-router";

const nuxtApp = useNuxtApp()
const calcStore = useCalcStore()
const cfStore = useCfStore()
const calc = useCalc()
const { path } = useNativeRoute()

await useAsyncData(async () => {
  await Promise.all([
    calcStore.loadFieldNotes(calc),
    calcStore.loadMyPropertyCalculations(calc),
    cfStore.fetchCalcPage(nuxtApp.$cfClient)
  ])
  return true
})

const config = useRuntimeConfig()

useHead({
  title: 'Renditerechner Immobilien - kostenlos & online',
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : null,
    { hid: 'description', name: 'description', content: 'Kostenloser Rechner: Cashflow und Rendite für Ihre Kapitalanlage berechnen ✓ Gewinn- und Verlustrechnung ✓ Cashflow ✓ Mietrendite / IRR' }
  ].filter(i => !!i),
  link: [getCanonical(config.public.canonicalHostname, path)]
})
</script>

<template>
  <CalcSEO />
</template>
