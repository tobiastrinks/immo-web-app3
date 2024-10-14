<template>
  <div class="gemeinde">
    <div class="inner innerLarge">
      <LocationInnerLy2
        :headline="$t('gemeinde.overview.headline', { gemeinde: gemeinde.name })"
        :sub-headline="$t('gemeinde.overview.subHeadline', { gemeinde: gemeinde.name })"
      >
        <template slot="comparison">
          <LocationComparisonTable
            :data="$store.state.location.gemeinde.nearbyGemeindeWithStats"
            :location-type="LOCATION_TYPE.GEMEINDE"
            nearby-comparison
          />
          <LocationComparisonSearch />
        </template>
      </LocationInnerLy2>
    </div>
    <LocationDisclaimer />
  </div>
</template>

<script>
import LocationComparisonTable from '../_shared/LocationComparisonTable/LocationComparisonTable'
import { LOCATION_TYPE } from '../../assets/constants'
import LocationDisclaimer from '../_shared/LocationDisclaimer/LocationDisclaimer'
import LocationInnerLy2 from '../_shared/LocationInnerLy2/LocationInnerLy2'
import LocationComparisonSearch from '../_shared/LocationComparisonSearch/LocationComparisonSearch'
export default {
  name: 'GemeindeLy2',
  components: { LocationComparisonSearch, LocationInnerLy2, LocationDisclaimer, LocationComparisonTable },
  data () {
    return { LOCATION_TYPE }
  },
  computed: {
    gemeinde () {
      return this.$store.state.location.gemeinde.gemeinde
    }
  }
}
</script>
