export const usePropertyValueStore = defineStore('propertyValue', {
  state: () => ({
    loading: false,
    result: null
  }),
  actions: {
    async getResult (fetch, id) {
      this.result = await fetch(`/property-value/result/${id}`)
    }
  }
})
