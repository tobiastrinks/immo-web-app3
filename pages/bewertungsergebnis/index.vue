<script setup>
import {getCanonical} from "assets/js/seoUtils.js";
import { useRoute as useNativeRoute } from 'vue-router'

const route = useNativeRoute()
const config = useRuntimeConfig()

if (!route.query.phone) {
  throw createError({ statusCode: 404, message: 'Diese URL ist ungültig' })
}

useHead({
  link: [getCanonical(config.public.canonicalHostname, route.path)],
  title: 'Bewertungsergebnis wird berechnet...',
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex' },
    { hid: 'description', name: 'description', content: 'Bewertungsergebnis' }
  ].filter(i => !!i)
})
</script>

<template>
  <Layout>
    <PropertyValueRequest
        :phone="route.query.phone"
    />
  </Layout>
</template>
