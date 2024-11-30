<script setup>
import {useStore} from "~/store/main.js";
import {useRoute as useNativeRoute} from "#vue-router";
import {useLocationStore} from "~/store/location.js";
import useCachedApi from "~/composables/useCachedApi.js";
import {useLoadingIndicator} from "#app/composables/loading-indicator.js";

const route = useNativeRoute()
const mainStore = useStore()
const locationStore = useLocationStore()
const cachedApi = useCachedApi()

const loadingIndicator = useLoadingIndicator()

/**
 * the layout is loaded before any page is loaded -> the navigation needs the location
 * to be already present in the pinia store, so that SSR can already pick the correct values.
 * -> Otherwise the SSR returns the navigation without location data and only the CSR adds this data
 * -> this leads to a hydration mismatch. More details here: https://github.com/nuxt/nuxt/issues/15474
 */
await useAsyncData(async () => {
  if (!route.path.startsWith('/deutschland')) {
    return true
  }
  const { stateIdName, kreisIdName, gemeindeIdName } = route.params
  if (gemeindeIdName) {
    await locationStore.getGemeinde(cachedApi, { stateIdName, kreisIdName, gemeindeIdName })
  } else if (kreisIdName) {
    await locationStore.getKreis(cachedApi, { stateIdName, kreisIdName })
  } else if (stateIdName) {
    await locationStore.getState(cachedApi, { stateIdName })
  } else {
    await locationStore.getGermany(cachedApi)
  }
  return true
})
</script>

<template>
  <div>
    <Nav />
    <NavMobile />
    <CookieBar />
    <div class="layout-default">
      <div class="layout-default-page">
        <slot />
      </div>
    </div>
    <Footer v-if="!loadingIndicator.isLoading" />
    <transition name="slide-fade">
      <Toast v-if="mainStore.toast" :toast="mainStore.toast" />
    </transition>
  </div>
</template>
