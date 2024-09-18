import {defineStore} from "pinia";
import {X_FEATURE_KEYS, X_FEATURES, Y_VALUES, Y_VALUES_KEYS} from "assets/js/constants.js";

export const useOverviewStatsStore = defineStore('overviewStats', {
    state: () => ({
        stats: {},
        activeLocation: {},
        activeXFeature: null,
        activeYValue: null,
        loading: false,

        additionalStats: null,
        priceOverTimeStats: null
    }),
    getters: {
        getStatsItem (state) {
            return ({ location, xFeature, yValue }) => {
                const statsItem = state.stats[getKeyFromParameters({ location, xFeature, yValue })]
                if (!statsItem) {
                    return
                }
                if (xFeature === X_FEATURES.CHILD_LOCATION && yValue === Y_VALUES.PRICE_PER_SQM) {
                    return overwriteAvgPricePerSqmForChildLocation(state, location, statsItem)
                }
                return statsItem
            }
        },
        currentStatsItem ({ activeLocation, activeXFeature, activeYValue }) {
            return this.getStatsItem({
                location: activeLocation,
                xFeature: activeXFeature,
                yValue: activeYValue
            })
        },
        activeXFeatureKey ({ activeXFeature }) {
            return activeXFeature
                ? X_FEATURE_KEYS[activeXFeature]
                : null
        },
        activeYValueKey ({ activeYValue }) {
            return activeYValue
                ? Y_VALUES_KEYS[activeYValue]
                : null
        },
        activeLocationAvgPricePerSqm ({ activeLocation }) {
            if (!activeLocation) {
                return null
            }
            const statsItem = this.getStatsItem({
                location: activeLocation,
                xFeature: X_FEATURES.PLOT_SIZE,
                yValue: Y_VALUES.PRICE_PER_SQM
            })
            if (!statsItem) {
                return null
            }
            const getAvg = values => values.find(i => !i[X_FEATURE_KEYS.PLOT_SIZE])[Y_VALUES_KEYS.PRICE_PER_SQM]
            return getAvg(statsItem.now)
        }
    },
    actions: {
        setStatsItem({ location, xFeature, yValue, values }) {
            const newStats = { ...this.stats }
            newStats[getKeyFromParameters({ location, xFeature, yValue })] = values
            this.stats = newStats
        },
        async selectOverviewStats (cachedApi, { location, xFeature, yValue }) {
            location = location || this.activeLocation
            xFeature = xFeature || this.activeXFeature
            yValue = yValue || this.activeYValue

            if (xFeature === X_FEATURES.YEARS) {
                await this.loadPriceOverTimeStats(cachedApi, location)
                yValue = Y_VALUES.PRICE_PER_SQM
            } else {
                await this.loadOverviewStats(cachedApi, { location, xFeature, yValue })
            }

            this.activeLocation = location
            this.activeXFeature = xFeature
            this.activeYValue = yValue
        },
        async loadOverviewStats (cachedApi, { location, xFeature, yValue }) {
            const params = { location, xFeature, yValue }
            const existingStatsItem = this.getStatsItem(params)
            if (!existingStatsItem) {
                this.loading = true
                const res = await cachedApi.request('/stats/overview', location || {}, {
                    location: location || {},
                    xFeature,
                    yValue
                })
                this.setStatsItem({ ...params, values: res.valuesWithHistoric })
                this.loading = false
            }
        },
        async loadAdditionalStats (cachedApi, location) {
            this.additionalStats = await cachedApi.request('/stats/additional', location || {})
        },
        async loadPriceOverTimeStats (cachedApi, location) {
            const res = await cachedApi.request('/stats/price-over-time', location || {})
            this.priceOverTimeStats = res.values
        }
    }
})

function getKeyFromParameters ({ location, xFeature, yValue }) {
    let keyString = ''
    Object.keys(location).forEach((key) => {
        if (location[key]) {
            keyString += `${key}-${location[key].replace(/[\W_]+/g, '')}__`
        }
    })
    keyString += `${xFeature}_${yValue}`
    return keyString
}

function overwriteAvgPricePerSqmForChildLocation (state, location, statsItem) {
    const statsItemPlotSizeToPricePerSqm = state.stats[getKeyFromParameters({
        location,
        xFeature: X_FEATURES.PLOT_SIZE,
        yValue: Y_VALUES.PRICE_PER_SQM
    })]
    if (!statsItemPlotSizeToPricePerSqm) {
        // eslint-disable-next-line no-console
        console.error('OverviewStats: Average pricePerSqm could not be overwritten for childLocations')
        return statsItem
    }
    const avgItemIndex = statsItem.now.findIndex(i => Object.keys(i).length === 1)
    const avgPlotSizeItemIndex = statsItemPlotSizeToPricePerSqm.now.findIndex(i => Object.keys(i).length === 1)
    return {
        ...statsItem,
        now: statsItem.now.map((i, index) => index === avgItemIndex
            ? { ...i, pricePerSqm: statsItemPlotSizeToPricePerSqm.now[avgPlotSizeItemIndex].pricePerSqm }
            : i
        )
    }
}
