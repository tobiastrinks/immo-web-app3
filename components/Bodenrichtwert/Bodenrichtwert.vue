<script setup>
import {useCfStore} from "~/store/cf.js";
const cfStore = useCfStore()
</script>

<template>
  <InfoPage :cf-data="cfStore.bodenrichtwertPage" />
</template>
