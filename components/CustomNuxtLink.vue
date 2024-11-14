<script setup>
import {useStore} from "~/store/main.js";

const mainStore = useStore()
const route = useRoute()

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const onClick = () => {
  if (route.path === props.to) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    if (mainStore.mobileNavOpened) {
      mainStore.closeMobileNav()
    }
  }
}
</script>

<template>
  <nuxt-link :to="to" @click.native="onClick">
    <slot></slot>
  </nuxt-link>
</template>
