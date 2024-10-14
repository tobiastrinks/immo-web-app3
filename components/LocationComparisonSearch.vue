<script setup>
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div class="location-comparison-search">
    <p class="location-comparison-search-text">
      {{ $t(`_shared.locationComparison.search.text.${locationStore.activeLocationType}`) }}
    </p>
    <InlineSearchInput :arrow-text="$t('_shared.locationComparison.search.arrowText')" />
  </div>
</template>

<style scoped lang="scss">
.location-comparison-search {
  margin: 30px 0;

  .location-comparison-search-text {
    margin-bottom: 15px;
    text-align: justify;
  }
}
</style>
