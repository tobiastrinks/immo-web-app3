<script setup>
import { LOCATION_TYPE } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div>
    <div class="inner innerLarge">
      <LocationInnerLy2
          :headline="$t('germany.overview.headline')"
          :sub-headline="$t('germany.overview.subHeadline')"
      >
        <template v-slot:comparison>
          <LocationComparisonTable
              :data="locationStore.germany.stateChildren"
              :location-type="LOCATION_TYPE.STATE"
          />
          <LocationComparisonSearch />
        </template>
      </LocationInnerLy2>
    </div>
    <LocationDisclaimer />
  </div>
</template>
