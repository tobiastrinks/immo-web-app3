<script setup lang="ts">
const abTest = useAbTest()
const affiliateAbTestType = abTest.getSessionFeature('affiliateWidgets')
</script>

<template>
  <div
      v-if="affiliateAbTestType"
      class="location-inner-affiliate-widget"
  >
    <MieteAktuell v-if="affiliateAbTestType === 'mieteAktuell'" />
    <WattfoxImmo v-else-if="affiliateAbTestType === 'wattfoxImmo'" />
    <PropertyValueWidget v-else-if="affiliateAbTestType === 'propertyValueWidget'" />
    <PropertyValueWidget2
        v-else
        wrapper-class-name="location-inner-affiliate-widget-wrapper"
    />
  </div>
</template>

<style lang="scss">
.location-inner-affiliate-widget {
  margin: 0 -5vw;

  @media #{$lg} {
    margin: 0;
  }

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

  .miete-aktuell-iframe {
    height: 492px;

    &.zipParam {
      height: 710px;
    }
  }
}
</style>
