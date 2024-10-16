<script setup>
import { LOCATION_TYPE } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div class="state">
    <div class="inner innerLarge">
      <LocationInnerLy2
        :headline="$t('state.overview.headline', { state: locationStore.state.state.name })"
        :sub-headline="$t('state.overview.subHeadline', { state: locationStore.state.state.name })"
      >
        <template v-slot:comparison>
          <LocationComparisonTable
            :data="locationStore.state.kreisChildren"
            :location-type="LOCATION_TYPE.KREIS"
          />
          <LocationComparisonSearch />
        </template>
      </LocationInnerLy2>
    </div>
    <LocationDisclaimer />
  </div>
</template>
