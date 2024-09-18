<template>
  <nuxt-link :to="to" @click.native="onClick">
    <slot></slot>
  </nuxt-link>
</template>

<script>
import {useStore} from "~/store/main.js";

export default defineNuxtComponent({
  setup() {
    return {
      mainStore: useStore()
    }
  },
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      if (this.$route.path === this.to) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        if (this.mainStore.mobileNavOpened) {
          this.mainStore.closeMobileNav()
        }
      }
    }
  }
})
</script>
