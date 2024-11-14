<script setup>
import { CF_CONTENT_TYPES } from '~/assets/js/constants'
import {useCfStore} from "~/store/cf.js";

const cfStore = useCfStore()

const trendItems = computed(() => {
  const { locationTrend } = cfStore
  return locationTrend ? locationTrend.content : []
})
</script>

<template>
  <div class="location-trend">
    <template v-for="(item, index) in trendItems">
      <CfArticle
        v-if="item.cfContentType === CF_CONTENT_TYPES.LOCATION_TREND_ARTICLE"
        :key="`0-${index}`"
        :content="item.content"
      />
      <CfChart
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.CHART"
        :key="`1-${index}`"
        :data="item"
      />
    </template>
  </div>
</template>
