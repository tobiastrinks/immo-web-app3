import { defineStore } from 'pinia'
import {CF_CONTENT_TYPES, PATHS} from "assets/js/constants.js";
import {deepFetchCfObject} from "assets/js/cfUtils.js";

export const useCfStore = defineStore('cf', {
    state: () => ({
        locationBodenrichtwert: null,
        locationBodenrichtwertMini: null,
        locationTrend: null,
        locationFaktoren: null,
        locationFAQ: null,
        propertyValuePage: null,
        bodenrichtwertPage: null,
        propertySellPage: null,
        calcSeoPage: null,
        dynamicInfoPage: null,
        privacyPage: null,
        imprintPage: null,
        termsAndConditionsPage: null,
        homeFaq: null
    }),
    actions: {
        resetBodenrichtwert() {
            this.locationBodenrichtwert = null
            this.locationBodenrichtwertMini = null
        },
        async fetchLocationBodenrichtwert (cfClient, { stateIdName, kreisIdName, gemeindeIdName, mini }) {
            const res = await cfClient.getEntries({
                content_type: CF_CONTENT_TYPES.LOCATION_BODENRICHTWERT,
                'fields.stateIdName': stateIdName || 'germany',
                'fields.kreisIdName': kreisIdName || '-',
                'fields.gemeindeIdName': gemeindeIdName || '-',
                'fields.mini': mini || false
            })
            if (mini) {
                if (res.items.length) {
                    this.locationBodenrichtwertMini = res.items[0].fields
                } else {
                    this.locationBodenrichtwertMini = null
                }
            } else {
                if (res.items.length) {
                    this.locationBodenrichtwert = res.items[0].fields
                } else {
                    this.locationBodenrichtwert = null
                }
            }
        },
        async fetchLocationTrend (cfClient, { stateIdName, kreisIdName, gemeindeIdName }) {
            const res = await deepFetchCfObject(cfClient, {
                content_type: CF_CONTENT_TYPES.LOCATION_TREND,
                'fields.stateIdName': stateIdName || 'germany',
                'fields.kreisIdName': kreisIdName || '-',
                'fields.gemeindeIdName': gemeindeIdName || '-'
            })
            if (res.length) {
                this.locationTrend = res[0]
            } else {
                this.locationTrend = null
            }
        },
        // currently statically loaded from cfLocationFaktoren.json
        async fetchLocationFaktoren (cfClient) {
            const res = await deepFetchCfObject(cfClient, {
                content_type: CF_CONTENT_TYPES.LOCATION_FAKTOREN
            })
            if (res.length) {
                this.locationFaktoren = res[0]
            } else {
                this.locationFaktoren = null
            }
        },
        // currently statically loaded from cfLocationFAQ.json
        async fetchLocationFAQ (cfClient) {
            const res = await deepFetchCfObject(cfClient, {
                content_type: CF_CONTENT_TYPES.LOCATION_FAQ
            })
            if (res.length) {
                this.locationFAQ = res[0]
            } else {
                this.locationFAQ = null
            }
        },
        async fetchInfoPage (cfClient, path) {
            const key = pageKeys(path)
            if (this[key] && key !== 'dynamicInfoPage') {
                return
            }
            const res = await deepFetchCfObject(cfClient, {
                content_type: CF_CONTENT_TYPES.INFO_PAGE,
                'fields.path': path
            })
            this[key] = res[0]
        },
        async fetchLegalPage (cfClient, path) {
            const key = pageKeys(path)
            if (this[key]) {
                return
            }
            const res = await cfClient.getEntries({
                content_type: CF_CONTENT_TYPES.LEGAL_PAGE,
                'fields.path': path
            })
            this[key] = res.items[0].fields
        },
        async fetchCalcPage (cfClient) {
            if (this.calcSeoPage) {
                return
            }
            const res = await deepFetchCfObject(cfClient, {
                content_type: CF_CONTENT_TYPES.CALC_SEO_PAGE
            })
            this.calcSeoPage = res[0]
        },
        async fetchHomeFaq(cfClient) {
            if (this.homeFaq) {
                return
            }
            const res = await cfClient.getEntries({
                content_type: CF_CONTENT_TYPES.HOME_FAQ
            })
            this.homeFaq = res.items[0].fields
        }
    }
})

const pageKeys = (page) => ({
    [PATHS.PRIVACY]: 'privacyPage',
    [PATHS.IMPRINT]: 'imprintPage',
    [PATHS.TERMS_AND_CONDITIONS]: 'termsAndConditionsPage',
    [PATHS.BODENRICHTWERT]: 'bodenrichtwertPage',
    [PATHS.PROPERTY_VALUE]: 'propertyValuePage',
    [PATHS.PROPERTY_SELL]: 'propertySellPage',
})[page] || 'dynamicInfoPage'
