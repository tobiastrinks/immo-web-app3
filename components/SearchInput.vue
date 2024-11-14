<script setup>
import {useSearchStore} from "~/store/search.js";
import {useStore} from "~/store/main.js";

const apiFetch = useApiFetch()
const mainStore = useStore()
const searchStore = useSearchStore()

const props = defineProps({
  fullWidthResults: {
    type: Boolean,
    default: false
  }
})

const resultsOpened = ref(false)
const searchTimeout = ref(null)
const searchInput = ref('')

const stateResults = computed(() => {
  return searchStore.enrichedStateResults
})
const kreisResults = computed(() => {
  return searchStore.enrichedKreisResults
})
const gemeindeResults = computed(() => {
  return searchStore.enrichedGemeindeResults
})
const zipResults = computed(() => {
  return searchStore.enrichedZipResults
})
const noResults = computed(() => {
  return [
    ...stateResults.value,
    ...kreisResults.value,
    ...gemeindeResults.value,
    ...zipResults.value
  ].length === 0
})

const setSearchString = (val) => {
  searchInput.value = val

  if (searchTimeout.value) {
    clearInterval(searchTimeout.value)
    searchTimeout.value = null
  }
  searchTimeout.value = setTimeout(() => {
    searchStore.search(apiFetch, searchInput.value)
    searchTimeout.value = null
  }, 300)
}
const closeResults = () => {
  resultsOpened.value = false
}
const onSelect = () => {
  searchInput.value = ''
  closeResults()
}
const onFocusIn = () => {
  resultsOpened.value = true
  if (searchInput.value !== '') {
    searchStore.search(apiFetch, searchInput.value)
  }
}

</script>

<template>
  <div
    v-click-outside="closeResults"
    class="search-input"
  >
    <input
      :value="searchInput"
      :name="mainStore.searchRandomAutocomplete"
      :autocomplete="mainStore.searchRandomAutocomplete"
      class="search-input-field"
      :placeholder="$t('_shared.search.placeholder')"
      @input="setSearchString($event.target.value)"
      @focusin="onFocusIn"
    />
    <img
      src="@/assets/img/_shared/font-awesome/magnifying-glass-solid.svg"
      class="search-input-icon"
    />
    <div
      v-show="resultsOpened && searchInput !== ''"
      class="search-results"
      :class="{ fullWidthResults }"
    >
      <div v-if="fullWidthResults" class="search-results-close" @click="closeResults">
        <img
          src="@/assets/img/_shared/font-awesome/xmark-solid.svg"
          class="search-results-close-icon"
        />
      </div>
      <div v-if="noResults && searchStore.noResultsAllowed" class="search-results-empty">
        {{ $t('_shared.search.noResults') }}
      </div>
      <SearchInputResultsSection
        v-if="stateResults.length"
        headline="Bundesländer"
        :results="stateResults"
        @select="onSelect"
      />
      <SearchInputResultsSection
        v-if="kreisResults.length"
        headline="Kreise"
        :results="kreisResults"
        @select="onSelect"
      />
      <SearchInputResultsSection
        v-if="gemeindeResults.length"
        headline="Orte"
        :results="gemeindeResults"
        @select="onSelect"
      />
      <SearchInputResultsSection
        v-if="zipResults.length"
        headline="Postleitzahlen"
        :results="zipResults"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-input {
  position: relative;

  .search-input-field {
    position: relative;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px 10px 35px;
    // https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone
    font-size: 16px;
    background-color: $greyLight;
    border: 1px solid #eaeaea;

    @media #{$md} {
      font-size: 90%;
    }
  }

  .search-input-icon {
    position: absolute;
    z-index: 2;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 90%;
    width: 15px;
  }

  .search-results {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 100%;
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.07);
    border-top: 3px solid $colorPrimary;

    &.fullWidthResults {
      position: fixed;
      left: 50%;
      top: 46px;
      bottom: 0;
      transform: translateX(-50%);
      width: 100%;
      box-shadow: none;
    }

    .search-results-close {
      position: absolute;
      right: 11px;
      top: 8px;
      padding: 5px;

      .search-results-close-icon {
        width: 17px;
      }
    }

    .search-results-empty {
      padding: 20px;
      max-width: 300px;
    }

    .search-results-item {
      padding: 5px;
      border-bottom: 1px solid $colorStroke;

      .search-results-item-small {
        font-size: 60%;
        color: $grey;
      }

      .search-results-item-val {
      }
    }
  }
}
</style>
