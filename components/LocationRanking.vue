<script setup>
import { getPathForLocationIdNames } from '~/assets/js/locationUtils'
import { LOCATION_TYPE, PATHS } from '~/assets/js/constants'
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";

const overviewStatsStore = useOverviewStatsStore()
const locationStore = useLocationStore()
const i18n = useI18n()

const ranking = computed(() => {
  return overviewStatsStore.additionalStats.ranking
})
const location = computed(() => {
  return locationStore.activeLocationMainData
})
const rankingParagraphs = computed(() => {
  const {
    germanyRankingPosition,
    germanyRankingCount,
    stateRankingPosition,
    stateRankingCount,
    kreisRankingPosition,
    kreisRankingCount
  } = ranking.value
  const localeLocationKey = locationStore.activeLocationType

  const paragraphs = []

  if (kreisRankingPosition && kreisRankingCount > 1) {
    paragraphs.push(
        i18n.t('_shared.locationRanking.article.kreis.template', {
          kreisName: location.value.kreisName,
          gemeindeName: location.value.name,
          position: i18n.n(kreisRankingPosition),
          total: i18n.n(kreisRankingCount)
        })
    )
  }
  if (stateRankingPosition) {
    paragraphs.push(
        i18n.t('_shared.locationRanking.article.state.template', {
          stateName: location.value.stateName,
          location: i18n.t(`_shared.locationRanking.article.state.location.${localeLocationKey}`, {
            name: location.value.name
          }),
          position: i18n.n(stateRankingPosition),
          total: i18n.n(stateRankingCount)
        })
    )
  }
  if (germanyRankingPosition) {
    paragraphs.push(
        i18n.t('_shared.locationRanking.article.germany.template', {
          location: i18n.t(`_shared.locationRanking.article.germany.location.${localeLocationKey}`, {
            name: location.value.name
          }),
          position: i18n.n(germanyRankingPosition),
          total: i18n.n(germanyRankingCount)
        })
    )
  }
  return [paragraphs.join(' ')]
})
const parentLink = computed(() => {
  const { gemeinde, kreis, state } = locationStore
  const parent = (() => {
    if (gemeinde) {
      const { kreisIdName, kreisName, stateIdName, stateName, idName } = gemeinde.gemeinde
      if (idName === kreisIdName) {
        return { type: LOCATION_TYPE.STATE, name: stateName, link: getPathForLocationIdNames({ stateIdName }) }
      }
      return { type: LOCATION_TYPE.KREIS, name: kreisName, link: getPathForLocationIdNames({ kreisIdName, stateIdName }) }
    } else if (kreis) {
      const { stateIdName, stateName } = kreis.kreis
      return { type: LOCATION_TYPE.STATE, name: stateName, link: getPathForLocationIdNames({ stateIdName }) }
    } else if (state) {
      return { type: LOCATION_TYPE.GERMANY, name: i18n.t('_shared.locationRanking.germanySubject'), link: PATHS.GERMANY }
    }
  })()
  return {
    text: i18n.t(`_shared.locationRanking.parentLink.text.${parent.type}`, { name: parent.name }),
    link: parent.link,
    buttonLabel: i18n.t('_shared.locationRanking.parentLink.buttonLabel', { name: parent.name })
  }
})
</script>

<template>
  <div class="location-ranking">
    <table class="location-ranking-table">
      <tbody>
        <tr>
          <td>{{ $t('_shared.locationRanking.germanySubject') }}</td>
          <td>{{ $t('_shared.locationRanking.position', { position: $n(ranking.germanyRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRanking.totalCount', { count: $n(ranking.germanyRankingCount) }) }}</td>
        </tr>
        <tr v-if="location.stateName && ranking.stateRankingCount > 1">
          <td>{{ location.stateName }}</td>
          <td>{{ $t('_shared.locationRanking.position', { position: $n(ranking.stateRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRanking.totalCount', { count: $n(ranking.stateRankingCount) }) }}</td>
        </tr>
        <tr v-if="location.kreisName && ranking.kreisRankingCount > 1">
          <td>{{ location.kreisName }}</td>
          <td>{{ $t('_shared.locationRanking.position', { position: $n(ranking.kreisRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRanking.totalCount', { count: $n(ranking.kreisRankingCount) }) }}</td>
        </tr>
      </tbody>
    </table>
    <TextArticle :paragraphs="rankingParagraphs" small-margin use-raw-html />
    <InfoPageTextButtonBox
      :button-path="parentLink.link"
      :button-label="parentLink.buttonLabel"
      :html-text="parentLink.text"
    />
  </div>
</template>

<style scoped lang="scss">
.location-ranking {

  .location-ranking-table {
    border-collapse: collapse;
    margin: 20px 0;

    tr {

      td {
        padding: 8px 15px;
        border: 1px solid $colorStroke;

        &:first-child {
          background-color: $greyMedium;
        }

        &:nth-child(2) {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
