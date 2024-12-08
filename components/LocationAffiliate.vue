<script setup lang="ts">
import {useSSRImprovements} from "assets/js/featureFlagUtils";
import {useRoute as useNativeRoute} from "#vue-router";

const route = useNativeRoute()
const abTest = useAbTest()
const affiliateAbTestType = abTest.getSessionFeature('affiliateWidgets')

const enableSSRImprovements = useSSRImprovements(route.path)
</script>

<template>
  <div
      v-if="affiliateAbTestType"
      class="location-inner-ly2-affiliate-widget"
      :class="{ enableSSRImprovements }"
  >
    <MieteAktuell v-if="affiliateAbTestType === 'mieteAktuell'" />
    <WattfoxImmo v-else-if="affiliateAbTestType === 'wattfoxImmo'" />
    <PropertyValueWidget v-else-if="affiliateAbTestType === 'propertyValueWidget'" />
    <PropertyValueWidget2
        v-else
        wrapper-class-name="location-inner-ly2-affiliate-widget-wrapper"
    />
  </div>
</template>

<style lang="scss">
.location-inner-ly2-affiliate-widget {
  margin: 0 -5vw;

  @media #{$lg} {
    margin: 0;
  }

  &.enableSSRImprovements {

    .property-value-widget-wizard-iframe {
      height: 315px;
    }

    .property-value-widget-2-wizard-iframe {
      height: 460px;

      @media screen and (min-width: 700px) {
        height: 315px;
      }

      @media #{$lg} { // 900px
        height: 460px;
      }

      @media screen and (min-width: 1270px) {
        height: 315px;
      }
    }

    .wattfox-immo-iframe {
      height: 500px;

      @media screen and (min-width: 620px) {
        height: 350px;
      }

      @media #{$lg} { // 900px
        height: 500px;
      }

      @media screen and (min-width: 1160px) {
        height: 350px;
      }
    }
  }

  // already enabled globally to fix an existing bug with zips
  .miete-aktuell-iframe {
    height: 492px;

    &.zipParam {
      height: 710px;
    }
  }
}
</style>
