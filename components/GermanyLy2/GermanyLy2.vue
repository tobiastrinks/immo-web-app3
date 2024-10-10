<template>
  <div class="germany-ly2">
    <div class="inner innerLarge">
      <LocationInnerLy2
          :headline="$t('germany.overview.headline')"
          :sub-headline="$t('germany.overview.subHeadline')"
      >
<!--        <template slot="comparison">-->
<!--          <LocationComparisonTable-->
<!--              :data="$store.state.location.germany.stateChildren"-->
<!--              :location-type="LOCATION_TYPE.STATE"-->
<!--          />-->
<!--          <LocationComparisonSearch />-->
<!--        </template>-->
      </LocationInnerLy2>
    </div>
    <LocationDisclaimer />
  </div>
</template>

<script>
import { LOCATION_TYPE } from '~/assets/js/constants'
export default {
  data () {
    return { LOCATION_TYPE }
  }
}
</script>
