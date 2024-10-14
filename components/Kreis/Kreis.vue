<script setup>
import { LOCATION_TYPE } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()

const kreis = computed(() => {
  return locationStore.kreis
})
</script>

<template>
  <div class="kreis">
    <div class="inner innerLarge">
      <LocationInnerLy2
        :headline="$t('kreis.overview.headline', { kreis: kreis.name })"
        :sub-headline="$t('kreis.overview.subHeadline', { kreis: kreis.name })"
      >
        <template v-slot:comparison>
          <LocationComparisonTable
            :data="kreis.gemeindeChildren"
            :location-type="LOCATION_TYPE.GEMEINDE"
          />
          <LocationComparisonSearch />
        </template>
      </LocationInnerLy2>
    </div>
    <LocationDisclaimer />
  </div>
</template>
