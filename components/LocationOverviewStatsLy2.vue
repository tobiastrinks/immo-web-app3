<template>
  <div class="location-overview-stats-ly2">
    <div class="location-overview-stats-ly2-chart-wrapper" :class="{ loading: overviewStatsStore.loading }">
      <div class="location-overview-stats-ly2-chart-loading">
        <img src="~/assets/img/_shared/loading.svg" />
      </div>
      <p class="location-overview-stats-ly2-chart-mobile-y-label">
        {{ yLabel }}
      </p>
      <LocationOverviewStatsChartLy2
        class="location-overview-stats-ly2-chart bar"
        :data="{ chartDataset, chartAverage, xLabel, yLabel, unit }"
      />
    </div>
    <div class="location-overview-stats-ly2-select-wrapper">
      <BlueArrow class="location-overview-stats-ly2-select-blue-arrow" type="TO_RIGHT_BOTTOM" :text="$t('_shared.locationOverviewStats.select.blueArrowText')" />
      <LocationOverviewStatsSelectLy2
        :title="$t('_shared.locationOverviewStats.select.headlineYValues')"
        :title-brackets="$t('_shared.locationOverviewStats.select.headlineYValuesBrackets')"
        :options="getSelectOptions(Object.keys(Y_VALUES))"
        :selected="overviewStatsStore.activeYValue"
        @select="(yValue) => overviewStatsStore.selectOverviewStats(cachedApi, { yValue })"
      />
      <LocationOverviewStatsSelectLy2
        :title="$t('_shared.locationOverviewStats.select.headlineXFeatures')"
        :title-brackets="$t('_shared.locationOverviewStats.select.headlineXFeaturesBrackets')"
        :options="getSelectOptions(Object.keys(X_FEATURES))"
        :selected="overviewStatsStore.activeXFeature"
        @select="(xFeature) => overviewStatsStore.selectOverviewStats(cachedApi, { xFeature })"
      />
    </div>
    <ul class="location-overview-stats-ly2-bullets">
      <li v-for="(bullet, index) in bullets" :key="index" v-html="bullet"></li>
    </ul>
    <div class="location-overview-stats-ly2-price-over-time">
      <Headline
        :headline="$t('_shared.locationAnalysis.h3PriceOverTime', { locationName })"
        :level="3"
      />
      <LineChart
        :y-label="$t('_shared.locationOverviewStats.yLabel.PRICE_PER_SQM')"
        :x-label="$t('_shared.locationOverviewStats.xLabel.YEARS')"
        :data-sets="lineChartDataSets"
        :labels="lineChartXValues"
        hide-legend
      />
      <div class="location-analysis-price-over-time-text">
        <TextArticle
          class="location-analysis-price-over-time-text-article"
          :paragraphs="[priceOverTimeText]"
          use-raw-html
          small-margin
        />
        <CtaBoxSimple />
      </div>
    </div>
  </div>
</template>

<script>
import {
  X_FEATURE_KEYS,
  X_FEATURE_PLOT_SIZE_LABEL_ORDER,
  X_FEATURE_DEVELOPMENT_STATUS_LABEL_ORDER,
  Y_VALUES,
  CHART_UNITS,
  X_FEATURES_LY2,
  LOCATION_TYPE,
  PATHS,
  X_FEATURES,
  Y_VALUES_KEYS,
  X_FEATURE_DEVELOPMENT_STATUS,
  OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER, OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER
} from '~/assets/js/constants'
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";

export default defineNuxtComponent({
  setup() {
    return {
      overviewStatsStore: useOverviewStatsStore(),
      locationStore: useLocationStore(),
      cachedApi: useCachedApi()
    }
  },
  data () {
    return {
      X_FEATURES: X_FEATURES_LY2,
      Y_VALUES
    }
  },
  computed: {
    lineChartXValues () {
      return this.overviewStatsStore.priceOverTimeStats.map(i => i.year)
    },
    lineChartDataSets () {
      return [{
        values: this.overviewStatsStore.priceOverTimeStats.map(i => i.pricePerSqm),
        lineColor: '#EC7B2F',
        yAxisID: 'y'
      }]
    },
    currentStatsItem () {
      return this.overviewStatsStore.currentStatsItem
    },
    chartDataset () {
      if (!this.currentStatsItem) {
        return []
      }
      const XFeatureKey = this.overviewStatsStore.activeXFeatureKey
      const YValueKey = this.overviewStatsStore.activeYValueKey
      const dataset = this.currentStatsItem.now
        .map((item) => {
          return {
            label: item[XFeatureKey],
            value: item[YValueKey]
          }
        })
        .filter(item => item.label !== undefined)
        .sort((a, b) => this.sortByLabel(XFeatureKey, a.label, b.label))
        .sort((a, b) => this.sortByValue(XFeatureKey, a.value, b.value))
        .map(item => ({
          ...item,
          label: this.getLocalizedLabelIfExisting(XFeatureKey, item.label.toString())
        }))
      if (dataset.length > 16) {
        return [
          ...dataset.slice(0, 8).map(i => ({ ...i, color: '#30A168' })),
          ...dataset.slice(-8).map(i => ({ ...i, color: '#ED3924' }))
        ]
      } else {
        return dataset
      }
    },
    chartAverage () {
      if (!this.currentStatsItem) {
        return null
      }
      const { now } = this.currentStatsItem
      if (!now.length) {
        return null
      }
      switch (this.overviewStatsStore.activeYValue) {
        case Y_VALUES.PROPERTY_COUNT:
          return null
        default:
          return now.find(i => i[this.overviewStatsStore.activeXFeatureKey] === undefined)[this.overviewStatsStore.activeYValueKey]
      }
    },
    xLabel () {
      const { activeXFeature } = this.overviewStatsStore
      if (activeXFeature === 'CHILD_LOCATION') {
        return this.$t(`_shared.locationOverviewStats.xLabel.${this.getXFeatureLocaleKey(activeXFeature)}`)
      } else {
        return this.$t(`_shared.locationOverviewStats.xLabel.${activeXFeature}`)
      }
    },
    yLabel () {
      return this.$t(`_shared.locationOverviewStats.yLabel.${this.overviewStatsStore.activeYValue}`)
    },
    unit () {
      switch (this.overviewStatsStore.activeYValue) {
        case Y_VALUES.PRICE_PER_SQM:
          return CHART_UNITS.EURO
        case Y_VALUES.MARKETING_PERIOD:
          return CHART_UNITS.WEEK
        case Y_VALUES.PROPERTY_COUNT:
          return CHART_UNITS.COUNT
        default:
          return CHART_UNITS.COUNT
      }
    },
    location () {
      return this.locationStore.activeLocationMainData
    },
    locationType () {
      return this.locationStore.activeLocationType
    },
    locationName () {
      return this.location.name || this.$t('_shared.location.germanyLocationName')
    },
    localeKeyPrefix () {
      switch (this.locationType) {
        case LOCATION_TYPE.GERMANY:
          return '_shared.locationAnalysis.bulletsChildComparison.germany'
        case LOCATION_TYPE.STATE:
          return '_shared.locationAnalysis.bulletsChildComparison.state'
        case LOCATION_TYPE.KREIS:
          return '_shared.locationAnalysis.bulletsChildComparison.kreis'
      }
      return null
    },
    mostAndLeastExpensive () {
      const {
        kreis,
        state,
        germany
      } = this.locationStore

      let children, path
      if (kreis) {
        children = kreis.gemeindeChildren
        path = PATHS.GEMEINDE
      } else if (state) {
        children = state.kreisChildren
        path = PATHS.KREIS
      } else if (germany) {
        children = germany.stateChildren
        path = PATHS.STATE
      }

      /**
       * TODO: remove this after successful rollout -> just for hiding this section
       * when there are not all children rolled out yet
       */
      const childLocationStats = this.overviewStatsStore.getStatsItem({
        location: this.overviewStatsStore.activeLocation,
        xFeature: X_FEATURES.CHILD_LOCATION,
        yValue: Y_VALUES.PRICE_PER_SQM
      })
      const childLocationStatsCount = childLocationStats ? childLocationStats.now.length - 1 : 0
      /**
       * ---- remove until here (keep condition below)
       */

      if (!children || !path || children.length < childLocationStatsCount) {
        return null
      }

      const childrenWithLink = ({ idName, name, isKreisfrei }, displayedChildren) => {
        const { activeLocation } = this.overviewStatsStore
        const kreisfreiLabel = displayedChildren.filter(c => c.name === name).length > 1 && isKreisfrei
          ? this.$t('_shared.locationOverviewParagraph.kreisfreiLabel')
          : ''
        return `<a href="${path(activeLocation, idName)}">${name}${kreisfreiLabel}</a>`
      }
      const childrenSortedByPrice = children
        .slice()
        .filter(i => !!i[X_FEATURE_KEYS.CHILD_LOCATION])
        .sort((a, b) => a[Y_VALUES_KEYS.PRICE_PER_SQM] - b[Y_VALUES_KEYS.PRICE_PER_SQM])
      let mostAndLeastExpensiveKeyNb
      if (childrenSortedByPrice.length > 6) {
        mostAndLeastExpensiveKeyNb = 3
      } else if (childrenSortedByPrice.length > 4) {
        mostAndLeastExpensiveKeyNb = 2
      } else if (childrenSortedByPrice.length >= 2) {
        mostAndLeastExpensiveKeyNb = 1
      } else {
        return null
      }

      const params = {}
      const displayedChildren = [
        ...childrenSortedByPrice.slice(0, mostAndLeastExpensiveKeyNb),
        ...childrenSortedByPrice.slice(-mostAndLeastExpensiveKeyNb)
      ]
      for (let x = 0; x < mostAndLeastExpensiveKeyNb; x++) {
        params[`leastExpensive${x + 1}`] = childrenWithLink(childrenSortedByPrice[x], displayedChildren)
        params[`mostExpensive${x + 1}`] = childrenWithLink(childrenSortedByPrice[childrenSortedByPrice.length - (x + 1)], displayedChildren)
      }
      return this.$t(`${this.localeKeyPrefix}.mostAndLeastExpensive${mostAndLeastExpensiveKeyNb}`, params)
    },
    bullets () {
      const {
        additionalStats: {
          pricePerSqmByPriceCategories: {
            percentile10,
            percentile90
          }
        },
        activeLocation
      } = this.overviewStatsStore
      const getStats = (xFeature, yValue) => this.overviewStatsStore.getStatsItem({ location: activeLocation, xFeature, yValue })
      const PLOT_SIZE_PRICE_PER_SQM = getStats(X_FEATURES.PLOT_SIZE, Y_VALUES.PRICE_PER_SQM)
      const PLOT_SIZE_MARKETING_PERIOD = getStats(X_FEATURES.PLOT_SIZE, Y_VALUES.MARKETING_PERIOD)
      const DEVELOPMENT_STATUS_PRICE_PER_SQM = getStats(X_FEATURES.DEVELOPMENT_STATUS, Y_VALUES.PRICE_PER_SQM)
      const BUILDING_PERMISSION_PRICE_PER_SQM = getStats(X_FEATURES.BUILDING_PERMISSION, Y_VALUES.PRICE_PER_SQM)

      const plotSizesSortedByPrice = PLOT_SIZE_PRICE_PER_SQM.now
        .slice()
        .filter(i => !!i[X_FEATURE_KEYS.PLOT_SIZE])
        .sort((a, b) => a[Y_VALUES_KEYS.PRICE_PER_SQM] - b[Y_VALUES_KEYS.PRICE_PER_SQM])
      const mostExpensivePlotSizeKey = plotSizesSortedByPrice.slice().pop()[X_FEATURE_KEYS.PLOT_SIZE]
      const leastExpensivePlotSizeKey = plotSizesSortedByPrice[0][X_FEATURE_KEYS.PLOT_SIZE]

      const averageMarketingPeriodInWeeks = PLOT_SIZE_MARKETING_PERIOD.now.find(i => !i[X_FEATURE_KEYS.PLOT_SIZE])[Y_VALUES_KEYS.MARKETING_PERIOD]

      const getDevelopmentStatusPricePerSqm = (developmentStatus) => {
        const item = DEVELOPMENT_STATUS_PRICE_PER_SQM.now.find(i => i[X_FEATURE_KEYS.DEVELOPMENT_STATUS] === developmentStatus)
        return item ? item[Y_VALUES_KEYS.PRICE_PER_SQM] : null
      }
      const developedPricePerSqm = getDevelopmentStatusPricePerSqm(X_FEATURE_DEVELOPMENT_STATUS.DEVELOPED)
      const developedPartiallyPricePerSqm = getDevelopmentStatusPricePerSqm(X_FEATURE_DEVELOPMENT_STATUS.DEVELOPED_PARTIALLY)
      const notDevelopedPricePerSqm = getDevelopmentStatusPricePerSqm(X_FEATURE_DEVELOPMENT_STATUS.NOT_DEVELOPED)

      const getBuildingPermissionPricePerSqm = (buildingPermission) => {
        const item = BUILDING_PERMISSION_PRICE_PER_SQM.now.find(i => i[X_FEATURE_KEYS.BUILDING_PERMISSION] === buildingPermission)
        return item ? item[Y_VALUES_KEYS.PRICE_PER_SQM] : null
      }
      const withBuildingPermissionPricePerSqm = getBuildingPermissionPricePerSqm(true)
      const withoutBuildingPermissionPricePerSqm = getBuildingPermissionPricePerSqm(false)

      const paragraphsKey = '_shared.locationAnalysis.bullets'

      const isValidBulletValue = (value) => {
        return value && value !== '∞' && value > -100
      }

      const bullets = this.$tm(paragraphsKey)
        .map((_, index) => {
          const developedSurchargeOverDevelopedPartiallyInPercent = (developedPricePerSqm && developedPartiallyPricePerSqm)
              ? this.$n((developedPricePerSqm / developedPartiallyPricePerSqm * 100) - 100, { maximumFractionDigits: 0 })
              : null
          const developedSurchargeOverNotDevelopedInPercent = (developedPricePerSqm && notDevelopedPricePerSqm)
              ? this.$n((developedPricePerSqm / notDevelopedPricePerSqm * 100) - 100, { maximumFractionDigits: 0 })
              : null
          const withBuildingPermissionSurchargeOverWithoutBuildingPermissionInPercent = (withBuildingPermissionPricePerSqm && withoutBuildingPermissionPricePerSqm)
              ? this.$n((withBuildingPermissionPricePerSqm / withoutBuildingPermissionPricePerSqm * 100) - 100, { maximumFractionDigits: 0 })
              : null

          const template = this.$t(`${paragraphsKey}[${index}]`)
          if (
            (template.includes('{developedSurchargeOverDevelopedPartiallyInPercent}') && isValidBulletValue(developedSurchargeOverDevelopedPartiallyInPercent)) ||
            (template.includes('{developedSurchargeOverNotDevelopedInPercent}') && isValidBulletValue(developedSurchargeOverNotDevelopedInPercent)) ||
            (template.includes('{withBuildingPermissionSurchargeOverWithoutBuildingPermissionInPercent}') && isValidBulletValue(withBuildingPermissionSurchargeOverWithoutBuildingPermissionInPercent))
          ) {
            return null
          }
          return this.$t(`${paragraphsKey}[${index}]`, {
            locationName: this.locationName,
            averagePricePerSqm: this.$n(PLOT_SIZE_PRICE_PER_SQM.now.find(i => !i[X_FEATURE_KEYS.PLOT_SIZE]).pricePerSqm, { maximumFractionDigits: 0 }),
            percentile10: this.$n(percentile10, { maximumFractionDigits: 0 }),
            percentile90: this.$n(percentile90, { maximumFractionDigits: 0 }),
            mostExpensivePlotSize: this.$tm(`_shared.locationOverviewStats.plotSizeLabels.${mostExpensivePlotSizeKey}`).join(' '),
            leastExpensivePlotSize: this.$tm(`_shared.locationOverviewStats.plotSizeLabels.${leastExpensivePlotSizeKey}`).join(' '),
            developedSurchargeOverDevelopedPartiallyInPercent,
            developedSurchargeOverNotDevelopedInPercent,
            withBuildingPermissionSurchargeOverWithoutBuildingPermissionInPercent,
            averageMarketingPeriodInWeeks: this.$n(averageMarketingPeriodInWeeks, { maximumFractionDigits: 0 })
          })
        }).filter(p => !!p)
      if (this.mostAndLeastExpensive) {
        bullets.push(this.$t('_shared.locationAnalysis.bulletsChildComparison.text', { mostAndLeastExpensive: this.mostAndLeastExpensive }))
      }
      return bullets
    },
    priceOverTimeText () {
      const averagePrice = this.overviewStatsStore.activeLocationAvgPricePerSqm
      const { priceOverTimeStats } = this.overviewStatsStore

      const lastIndex = priceOverTimeStats.length - 1
      const priceChange3Years = 1 - (priceOverTimeStats[lastIndex - 3].pricePerSqm / averagePrice)
      const priceChange1Year = 1 - (priceOverTimeStats[lastIndex - 1].pricePerSqm / averagePrice)

      const getPriceChangeText = (relativeChange) => {
        const percentage = this.$n(relativeChange * 100, { maximumFractionDigits: 1 })
        return priceChange3Years > 0
          ? this.$t('_shared.locationAnalysis.priceOverTimeText.priceIncreasing', { percentage })
          : this.$t('_shared.locationAnalysis.priceOverTimeText.priceDecreasing', { percentage })
      }

      return this.$t('_shared.locationAnalysis.priceOverTimeText.text', {
        locationName: this.locationName,
        averagePriceFrom: this.$n(averagePrice * OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER, { maximumFractionDigits: 0 }),
        averagePriceTo: this.$n(averagePrice * OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER, { maximumFractionDigits: 0 }),
        priceChange1Year: getPriceChangeText(priceChange1Year),
        priceChange3Years: getPriceChangeText(priceChange3Years)
      })
    }
  },
  methods: {
    getLocalizedLabelIfExisting (XFeatureKey, label) {
      switch (XFeatureKey) {
        case X_FEATURE_KEYS.PLOT_SIZE:
          return this.$tm(`_shared.locationOverviewStats.plotSizeLabels.${label}`)
        case X_FEATURE_KEYS.BUILDING_PERMISSION:
          return this.$tm(`_shared.locationOverviewStats.buildingPermissionLabels.${label}`)
        case X_FEATURE_KEYS.DEVELOPMENT_STATUS:
          return this.$tm(`_shared.locationOverviewStats.developmentStatusLabels.${label}`)
        default:
          return label
      }
    },
    sortByLabel (XFeatureKey, a, b) {
      switch (XFeatureKey) {
        case X_FEATURE_KEYS.PLOT_SIZE:
          return X_FEATURE_PLOT_SIZE_LABEL_ORDER.indexOf(a) > X_FEATURE_PLOT_SIZE_LABEL_ORDER.indexOf(b) ? 1 : -1
        case X_FEATURE_KEYS.DEVELOPMENT_STATUS:
          return X_FEATURE_DEVELOPMENT_STATUS_LABEL_ORDER.indexOf(a) > X_FEATURE_DEVELOPMENT_STATUS_LABEL_ORDER.indexOf(b) ? 1 : -1
        default:
          return 0
      }
    },
    sortByValue (XFeatureKey, a, b) {
      switch (XFeatureKey) {
        case X_FEATURE_KEYS.CHILD_LOCATION:
          return a > b ? -1 : 1
        default:
          return 0
      }
    },
    getSelectOptions (optionKeys) {
      return optionKeys.map(o => ({
        val: o,
        localeKey: this.getXFeatureLocaleKey(o),
        disabled: (
          // disable Y_VALUES for priceOverTime graph except Y.PRICE_PER_SQM
          Object.keys(Y_VALUES).includes(o) &&
          this.overviewStatsStore.activeXFeatureKey === X_FEATURE_KEYS.YEARS &&
          o !== Y_VALUES.PRICE_PER_SQM
        )
      })).filter(o => !!o.localeKey)
    },
    getXFeatureLocaleKey (option) {
      if (option === 'CHILD_LOCATION') {
        const {
          germany,
          state,
          kreis
        } = this.locationStore
        if (kreis) {
          return 'CHILD_LOCATION_GEMEINDE'
        } else if (state) {
          return 'CHILD_LOCATION_KREIS'
        } else if (germany) {
          return 'CHILD_LOCATION_STATE'
        }
      } else {
        return option
      }
    }
  }
})
</script>

<style lang="scss">
.location-overview-stats-ly2 {
  width: 100%;
  margin: 0 auto;

  .location-overview-stats-ly2-chart-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;

    @media #{$md} {
      overflow: unset;
    }

    &.loading {
      .location-overview-stats-ly2-chart {
        opacity: 0.3;
      }

      .location-overview-stats-ly2-chart-loading {
        display: block;
      }
    }

    .location-overview-stats-ly2-chart-loading {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 50px;
      }
    }

    .location-overview-stats-ly2-chart-mobile-y-label {
      color: #6a6a6a;
      font-size: 12px;
      font-weight: 400;

      @media #{$md} {
        display: none;
      }
    }
  }

  .location-overview-stats-ly2-select-wrapper {
    position: relative;
    border: 1px solid #C4C4C4;
    padding: 15px 20px;
    margin: 0 auto;

    @media #{$md} {
      display: flex;
      padding: 20px;
      max-width: none;
      margin-left: 75px;
    }

    .location-overview-stats-ly2-select-blue-arrow {
      position: absolute;
      top: 50px;
      right: calc(100% + 10px);
    }
  }

  .location-overview-stats-ly2-bullets {
    margin: 30px 0;
    text-align: justify;
    padding-left: 20px;

    li {
      margin: 5px 0;
    }

    a {
      color: $colorPrimary;
    }
  }

  .location-overview-stats-ly2-price-over-time {
    margin: 50px 0;

    .location-overview-stats-ly2-chart {
      margin: 20px 0;
    }

    .location-analysis-price-over-time-text {

      .location-analysis-price-over-time-text-article {

        .increase {
          color: $green;
        }

        .decrease {
          color: $red;
        }
      }
    }
  }
}
</style>
