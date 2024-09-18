<template>
  <div>
    <Nav />
    <NavMobile />
    <CookieBar />
    <div class="layout-default" :class="{ noMarginTop, isCalc, navNoteOpened }">
      <div class="layout-default-page">
        <slot />
      </div>
    </div>
    <Footer />
    <transition name="slide-fade">
      <Toast v-if="mainStore.toast" :toast="mainStore.toast" />
    </transition>
  </div>
</template>

<script>
import {useStore} from "~/store/main.js";
import {PATHS} from "assets/js/constants.js";

export default defineNuxtComponent({
  setup() {
    return {
      mainStore: useStore(),
    }
  },
  computed: {
    isCalc () {
      return this.$route.path === PATHS.CALC
    },
    noMarginTop () {
      return this.$route.path === '/' || this.isCalc
    },
    navNoteOpened () {
      return this.mainStore.navNoteOpened
    }
  }
})
</script>

