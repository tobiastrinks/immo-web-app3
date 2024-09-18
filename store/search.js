export const useSearchStore = defineStore('search', {
    state: () => ({
        stateResults: [],
        kreisResults: [],
        gemeindeResults: [],
        zipResults: [],
        noResultsAllowed: false
    }),
    actions: {
        async search (fetch, searchInput) {
            const res = await fetch('/location/search', {
                method: 'GET',
                params: {
                    s: searchInput
                }
            })
            const { stateResults, kreisResults, gemeindeResults, zipResults } = res
            this.stateResults = stateResults
            this.kreisResults = kreisResults
            this.gemeindeResults = gemeindeResults
            this.zipResults = zipResults
            this.noResultsAllowed = true
        }
    },
    getters: {
        enrichedStateResults ({ stateResults }) {
            return stateResults.map(i => ({
                ...i,
                label: i.name
            }))
        },
        enrichedKreisResults ({ kreisResults }) {
            return kreisResults.map(i => ({
                ...i,
                label: `${i.name} (Kreis)`
            }))
        },
        enrichedGemeindeResults ({ gemeindeResults }) {
            return gemeindeResults.map((i) => {
                const duplicate = gemeindeResults.filter(g => g.name === i.name).length > 1
                return {
                    ...i,
                    label: `${i.name} ${duplicate ? `(${i.parentName})` : ''}`
                }
            })
        },
        enrichedZipResults ({ zipResults }) {
            return zipResults.map((i) => {
                return {
                    ...i,
                    label: `${i.name} ${i.parentName}`
                }
            })
        }
    }
})
