<script setup>
import {LOCATION_TYPE} from "assets/js/constants.js";
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div class="page-location-nav-active margin-top gemeinde">
    <div class="inner">
      <LocationInner
        :headline="$t('gemeinde.overview.headline', { gemeinde: locationStore.gemeinde.gemeinde.name })"
        :sub-headline="$t('gemeinde.overview.subHeadline', { gemeinde: locationStore.gemeinde.gemeinde.name })"
      >
        <template slot="comparison">
          <LocationComparisonTable
            :data="locationStore.gemeinde.nearbyGemeindeWithStats"
            :location-type="LOCATION_TYPE.GEMEINDE"
            nearby-comparison
          />
          <LocationComparisonSearch />
        </template>
      </LocationInner>
    </div>
    <LocationDisclaimer />
  </div>
</template>
