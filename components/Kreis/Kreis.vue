<script setup>
import { LOCATION_TYPE } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div class="page-location-nav-active margin-top kreis">
    <div class="inner">
      <LocationInner
        :headline="$t('kreis.overview.headline', { kreis: locationStore.kreis.kreis.name })"
        :sub-headline="$t('kreis.overview.subHeadline', { kreis: locationStore.kreis.kreis.name })"
      >
        <template v-slot:comparison>
          <LocationComparisonTable
            :data="locationStore.kreis.gemeindeChildren"
            :location-type="LOCATION_TYPE.GEMEINDE"
          />
          <LocationComparisonSearch />
        </template>
      </LocationInner>
    </div>
    <LocationDisclaimer />
  </div>
</template>
