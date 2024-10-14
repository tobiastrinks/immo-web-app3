<template>
  <div class="location-ranking-ly2">
    <table class="location-ranking-ly2-table">
      <tbody>
        <tr>
          <td>{{ $t('_shared.locationRankingLy2.germanySubject') }}</td>
          <td>{{ $t('_shared.locationRankingLy2.position', { position: $n(ranking.germanyRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRankingLy2.totalCount', { count: $n(ranking.germanyRankingCount) }) }}</td>
        </tr>
        <tr v-if="location.stateName && ranking.stateRankingCount > 1">
          <td>{{ location.stateName }}</td>
          <td>{{ $t('_shared.locationRankingLy2.position', { position: $n(ranking.stateRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRankingLy2.totalCount', { count: $n(ranking.stateRankingCount) }) }}</td>
        </tr>
        <tr v-if="location.kreisName && ranking.kreisRankingCount > 1">
          <td>{{ location.kreisName }}</td>
          <td>{{ $t('_shared.locationRankingLy2.position', { position: $n(ranking.kreisRankingPosition) }) }}</td>
          <td>{{ $t('_shared.locationRankingLy2.totalCount', { count: $n(ranking.kreisRankingCount) }) }}</td>
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

<script>
import { getPathForLocationIdNames } from '~/assets/js/locationUtils'
import { LOCATION_TYPE, PATHS } from '~/assets/js/constants'
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";
export default defineNuxtComponent({
  setup() {
    return {
      overviewStatsStore: useOverviewStatsStore(),
      locationStore: useLocationStore()
    }
  },
  computed: {
    ranking () {
      return this.overviewStatsStore.additionalStats.ranking
    },
    location () {
      return this.locationStore.activeLocationMainData
    },
    rankingParagraphs () {
      const {
        germanyRankingPosition,
        germanyRankingCount,
        stateRankingPosition,
        stateRankingCount,
        kreisRankingPosition,
        kreisRankingCount
      } = this.ranking
      const localeLocationKey = this.locationStore.activeLocationType

      const paragraphs = []

      if (kreisRankingPosition && kreisRankingCount > 1) {
        paragraphs.push(
          this.$t('_shared.locationRankingLy2.article.kreis.template', {
            kreisName: this.location.kreisName,
            gemeindeName: this.location.name,
            position: this.$n(kreisRankingPosition),
            total: this.$n(kreisRankingCount)
          })
        )
      }
      if (stateRankingPosition) {
        paragraphs.push(
          this.$t('_shared.locationRankingLy2.article.state.template', {
            stateName: this.location.stateName,
            location: this.$t(`_shared.locationRankingLy2.article.state.location.${localeLocationKey}`, {
              name: this.location.name
            }),
            position: this.$n(stateRankingPosition),
            total: this.$n(stateRankingCount)
          })
        )
      }
      if (germanyRankingPosition) {
        paragraphs.push(
          this.$t('_shared.locationRankingLy2.article.germany.template', {
            location: this.$t(`_shared.locationRankingLy2.article.germany.location.${localeLocationKey}`, {
              name: this.location.name
            }),
            position: this.$n(germanyRankingPosition),
            total: this.$n(germanyRankingCount)
          })
        )
      }
      return [paragraphs.join(' ')]
    },
    parentLink () {
      const { gemeinde, kreis, state } = this.locationStore
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
          return { type: LOCATION_TYPE.GERMANY, name: this.$t('_shared.locationRankingLy2.germanySubject'), link: PATHS.GERMANY }
        }
      })()
      return {
        text: this.$t(`_shared.locationRankingLy2.parentLink.text.${parent.type}`, { name: parent.name }),
        link: parent.link,
        buttonLabel: this.$t('_shared.locationRankingLy2.parentLink.buttonLabel', { name: parent.name })
      }
    }
  }
})
</script>

<style scoped lang="scss">
.location-ranking-ly2 {

  .location-ranking-ly2-table {
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
