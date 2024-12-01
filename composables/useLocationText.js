import {OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER, OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER} from "assets/js/constants.js";
import {useOverviewStatsStore} from "~/store/overviewStats.js";
import {useLocationStore} from "~/store/location.js";

export default function () {
    const overviewStatsStore = useOverviewStatsStore()
    const locationStore = useLocationStore()
    const i18n = useI18n()

    const getLocationName = () => {
        return locationStore.activeLocationMainData?.location?.name || i18n.t('_shared.location.germanyLocationName')
    }

    return {
        getLocationName,
        getPriceOverTimeText() {
            const averagePrice = overviewStatsStore.activeLocationAvgPricePerSqm
            const { priceOverTimeStats } = overviewStatsStore

            const lastIndex = priceOverTimeStats.length - 1
            const priceChange3Years = 1 - (priceOverTimeStats[lastIndex - 3].pricePerSqm / averagePrice)
            const priceChange1Year = 1 - (priceOverTimeStats[lastIndex - 1].pricePerSqm / averagePrice)

            const getPriceChangeText = (relativeChange) => {
                const percentage = i18n.n(relativeChange * 100, { maximumFractionDigits: 1 })
                return priceChange3Years > 0
                    ? i18n.t('_shared.locationAnalysis.priceOverTimeText.priceIncreasing', { percentage })
                    : i18n.t('_shared.locationAnalysis.priceOverTimeText.priceDecreasing', { percentage })
            }

            const locationName = getLocationName()

            return i18n.t('_shared.locationAnalysis.priceOverTimeText.text', {
                locationName: locationName.value,
                averagePriceFrom: i18n.n(averagePrice * OVERVIEW_STATS_AVG_PRICE_FROM_MULTIPLIER, { maximumFractionDigits: 0 }),
                averagePriceTo: i18n.n(averagePrice * OVERVIEW_STATS_AVG_PRICE_TO_MULTIPLIER, { maximumFractionDigits: 0 }),
                priceChange1Year: getPriceChangeText(priceChange1Year),
                priceChange3Years: getPriceChangeText(priceChange3Years)
            })
        }
    }
}
