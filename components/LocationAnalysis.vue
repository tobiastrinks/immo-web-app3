<template>
  <div class="location-analysis">
    <Headline
      :headline="$t('_shared.locationAnalysis.h3Market', { locationName })"
      :level="3"
    />
    <LocationOverviewStatsLy2 />
    <div v-if="hasRanking" class="location-analysis-ranking">
      <Headline
        :headline="$t('_shared.locationAnalysis.h3Ranking', { locationName })"
        :level="3"
      />
      <LocationRankingLy2 />
    </div>
    <div class="location-analysis-nearby">
      <Headline
        :headline="$t(`_shared.locationAnalysis.h3Nearby.${locationType}.main`)"
        :sub-headline="$t(`_shared.locationAnalysis.h3Nearby.${locationType}.sub`, { locationName })"
        :level="3"
      />
      <slot name="comparison"></slot>
    </div>
    <div id="location-overview-paragraph-data-source" class="location-analysis-data">
      <Headline
        :headline="$t('_shared.locationAnalysis.h3Data', { locationName })"
        :level="3"
      />
      <TextArticle
        :paragraphs="[dataSourceParagraph]"
        use-raw-html
        small-margin
      />
    </div>
  </div>
</template>

<script>
import {useLocationStore} from "~/store/location.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";

export default defineNuxtComponent({
  setup() {
    return {
      locationStore: useLocationStore(),
      overviewStatsStore: useOverviewStatsStore()
    }
  },
  computed: {
    location () {
      return this.locationStore.activeLocationMainData
    },
    locationName () {
      return this.location.name || this.$t('_shared.location.germanyLocationName')
    },
    locationType () {
      return this.locationStore.activeLocationType
    },
    dataSourceParagraph () {
      const {
        additionalStats: {
          propertyRadius,
          propertyCount
        }
      } = this.overviewStatsStore
      return this.$t('_shared.locationAnalysis.dataSourceParagraph', {
        optionalRadius: propertyRadius
          ? this.$t('_shared.locationAnalysis.optionalRadius', {
            propertyRadius,
            locationName: this.locationName
          })
          : '',
        propertyCount: this.$n(propertyCount)
      })
    },
    hasRanking () {
      const { gemeinde, kreis, state } = this.locationStore
      return (
        !!this.overviewStatsStore.additionalStats.ranking &&
        (gemeinde || kreis || state)
      )
    }
  }
})
</script>

<style lang="scss">
.location-analysis {

  .location-analysis-ranking {
    margin-bottom: 50px;
  }

  .location-analysis-nearby {
    margin-bottom: 70px;
  }
}
</style>
