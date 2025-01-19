<script setup>
import { LOCATION_TYPE } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";

const locationStore = useLocationStore()
</script>

<template>
  <div class="page-location-nav-active margin-top">
    <div class="inner">
      <LocationInner
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
      </LocationInner>
    </div>
    <LocationDisclaimer />
  </div>
</template>
