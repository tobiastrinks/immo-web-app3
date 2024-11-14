<script setup>
import { getCanonical } from 'assets/js/seoUtils'
import {useCalcStore} from "~/store/calc.js";
import useCalc from "~/composables/useCalc.js";
import {useRoute as useNativeRoute} from "#vue-router";

const calc = useCalc()
const calcStore = useCalcStore()
const { path, query: { loadsaved } } = useNativeRoute()

await useAsyncData(async () => {
  await Promise.all([
    calcStore.loadFieldNotes(calc),
    calcStore.loadMyPropertyCalculations(calc)
  ])
  if (calcStore.propertyCalculations.length && loadsaved) {
    calcStore.setActivePropertyCalculation(calcStore.propertyCalculations[0])
  }
  return true
})

const config = useRuntimeConfig()

useHead({
  link: [getCanonical(config.public.canonicalHostname, path)],
  title: 'Renditerechner Immobilien',
  meta: [
    config.public.blockSeoIndexing ? { hid: 'robots', name: 'robots', content: 'noindex' } : { hid: 'robots', name: 'robots', content: 'noindex, follow' },
    { hid: 'description', name: 'description', content: 'Berechnen Sie in wenigen Schritte den Cashflow und die Rendite Ihrer Immobilie auf 10 Jahre.' }
  ].filter(i => !!i)
})
</script>

<template>
  <client-only>
    <Calc />
  </client-only>
</template>
