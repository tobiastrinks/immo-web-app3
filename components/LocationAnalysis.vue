<script setup>
import {useLocationStore} from "~/store/location.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";

const locationStore = useLocationStore()
const overviewStatsStore = useOverviewStatsStore()
const i18n = useI18n()

const location = computed(() => {
  return locationStore.activeLocationMainData
})
const locationName = computed(() => {
  return location.value.name || i18n.t('_shared.location.germanyLocationName')
})
const locationType = computed(() => {
  return locationStore.activeLocationType
})
const dataSourceParagraph = computed(() => {
  const {
    additionalStats: {
      propertyRadius,
      propertyCount
    }
  } = overviewStatsStore
  return i18n.t('_shared.locationAnalysis.dataSourceParagraph', {
    optionalRadius: propertyRadius
        ? i18n.t('_shared.locationAnalysis.optionalRadius', {
          propertyRadius,
          locationName: locationName.value
        })
        : '',
    propertyCount: i18n.n(propertyCount)
  })
})
const hasRanking = computed(() => {
  const { gemeinde, kreis, state } = locationStore
  return (
      !!overviewStatsStore.additionalStats.ranking &&
      (gemeinde || kreis || state)
  )
})
</script>

<template>
  <div class="location-analysis">
    <Headline
      :headline="$t('_shared.locationAnalysis.h3Market', { locationName })"
      :level="3"
    />
    <LocationOverviewStats />
    <div v-if="hasRanking" class="location-analysis-ranking">
      <Headline
        :headline="$t('_shared.locationAnalysis.h3Ranking', { locationName })"
        :level="3"
      />
      <LocationRanking />
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
