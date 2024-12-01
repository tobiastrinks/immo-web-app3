import {defineStore} from "pinia";
import {LOCATION_TYPE} from "assets/js/constants.js";

const locationDefaultState = {
  germany: null,
  state: null,
  kreis: null,
  gemeinde: null
}

const defaultState = {
  ...locationDefaultState,
  marketReport: null
}

export const useLocationStore = defineStore('location', {
  state: () => ({
    ...defaultState
  }),
  getters: {
    activeLocationMainData ({ germany, state, kreis, gemeinde }) {
      if (germany) {
        return {
          reviewCount: germany.reviewCount,
          reviewValue: germany.reviewValue,
        }
      } else if (state) {
        return state.state
      } else if (kreis) {
        return kreis.kreis
      } else if (gemeinde) {
        return gemeinde.gemeinde
      } else {
        return null
      }
    },
    activeLocationType ({ germany, state, kreis, gemeinde }) {
      if (gemeinde) {
        return LOCATION_TYPE.GEMEINDE
      } else if (kreis) {
        return LOCATION_TYPE.KREIS
      } else if (state) {
        return LOCATION_TYPE.STATE
      } else if (germany) {
        return LOCATION_TYPE.GERMANY
      }
    }
  },
  actions: {
    resetLocation() {
      Object.keys(locationDefaultState).forEach((key) => {
        this[key] = locationDefaultState[key]
      })
    },
    async getGermany (cachedApi) {
      const res = await cachedApi.request('/location', {})
      this.resetLocation()
      this.germany = res
    },
    async getState (cachedApi, { stateIdName }) {
      const res = await cachedApi.request('/location', {
        stateIdName
      })
      this.resetLocation()
      const { state, kreis, gemeinde } = res
      if (state) {
        this.state = res
      } else if (kreis) {
        this.kreis = res
      } else if (gemeinde) {
        this.gemeinde = res
      }
    },
    async getKreis (cachedApi, { stateIdName, kreisIdName }) {
      const res = await cachedApi.request('/location', {
        stateIdName,
        kreisIdName
      })
      this.resetLocation()
      const { kreis, gemeinde } = res
      if (kreis) {
        this.kreis = res
      } else if (gemeinde) {
        this.gemeinde = res
      }
    },
    async getGemeinde (cachedApi, { stateIdName, kreisIdName, gemeindeIdName }) {
      const res = await cachedApi.request('/location', {
        stateIdName,
        kreisIdName,
        gemeindeIdName
      })
      this.resetLocation()
      this.gemeinde = res
    },
    async getMarketReport (cachedApi, { stateIdName, kreisIdName, gemeindeIdName }) {
      const res = await cachedApi.request('/location/market-report', {
        stateIdName,
        kreisIdName,
        gemeindeIdName
      })
      if (res) {
        this.marketReport = res
      } else {
        this.marketReport = null
      }
    }
  }
})
