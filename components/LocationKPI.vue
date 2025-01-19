<script setup>
import { offsetTop } from '~/assets/js/scrollUtils'
import { OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER, OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER } from '~/assets/js/constants'
import {useOverviewStatsStore} from "~/store/overviewStats.js";

const overviewStatsStore = useOverviewStatsStore()

const pricePerSqm = computed(() => {
  return overviewStatsStore.activeLocationAvgPricePerSqm
})
const pricePerSqmFrom = computed(() => {
  return pricePerSqm.value * OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER
})
const pricePerSqmTo = computed(() => {
  return pricePerSqm.value * OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER
})

const scrollToExplanation = () => {
  const expl = document.getElementById('location-overview-paragraph-data-source')
  if (expl) {
    window.scrollTo({
      top: offsetTop(expl) - window.innerHeight * 0.3,
      left: 0,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div class="location-kpi">
    <div class="location-kpi-header">
      <p class="location-kpi-header-headline">
        {{ $t('_shared.locationKPI.withCTA.priceLabel') }}
      </p>
      <p class="location-kpi-header-price">
        {{ $t('_shared.locationKPI.withCTA.price', {
        priceFrom: $n(pricePerSqmFrom, { maximumFractionDigits: 0 }),
        priceTo: $n(pricePerSqmTo, { maximumFractionDigits: 0 })
      }) }}
      </p>
      <p class="location-kpi-header-price-explanation" @click="scrollToExplanation">
        {{ $t('_shared.locationKPI.withCTA.priceExplanation') }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-kpi {
  max-width: 550px;
  margin: 40px auto;
  text-align: center;

  .location-kpi-header {
    line-height: 160%;

    .location-kpi-header-headline {
      font-weight: 400;
    }

    .location-kpi-header-price {
      font-weight: 500;
      font-size: 135%;
      background-color: $greyMedium;
      border: 1px solid $colorStroke;
      display: inline-block;
      padding: 10px 20px;
      margin: 10px 0 5px 0;
    }

    .location-kpi-header-price-explanation {
      text-decoration: underline;
      font-size: 70%;
      cursor: pointer;
      opacity: .7;
    }
  }

  .location-kpi-body {
    padding: 15px;

    .location-kpi-body-text {
      margin-bottom: 10px;
    }
  }
}
</style>
