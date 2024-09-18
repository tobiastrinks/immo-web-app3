<template>
  <div
    v-click-outside="closeResults"
    class="search-input"
  >
    <input
      :value="searchInput"
      :name="randomString()"
      :autocomplete="randomString()"
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

<script>
import {useSearchStore} from "~/store/search.js";

export default defineNuxtComponent({
  setup() {
    return {
      apiFetch: useApiFetch(),
      searchStore: useSearchStore()
    }
  },
  props: {
    fullWidthResults: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      resultsOpened: false,
      searchTimeout: null,
      searchInput: ''
    }
  },
  computed: {
    stateResults () {
      return this.searchStore.enrichedStateResults
    },
    kreisResults () {
      return this.searchStore.enrichedKreisResults
    },
    gemeindeResults () {
      return this.searchStore.enrichedGemeindeResults
    },
    zipResults () {
      return this.searchStore.enrichedZipResults
    },
    noResults () {
      return [
        ...this.stateResults,
        ...this.kreisResults,
        ...this.gemeindeResults,
        ...this.zipResults
      ].length === 0
    }
  },
  methods: {
    setSearchString (val) {
      this.searchInput = val

      if (this.searchTimeout) {
        clearInterval(this.searchTimeout)
        this.searchTimeout = null
      }
      this.searchTimeout = setTimeout(() => {
        this.searchStore.search(this.apiFetch, this.searchInput)
        this.searchTimeout = null
      }, 300)
    },
    onSelect () {
      this.searchInput = ''
      this.closeResults()
    },
    closeResults () {
      this.resultsOpened = false
    },
    onFocusIn () {
      this.resultsOpened = true
      if (this.searchInput !== '') {
        this.searchStore.search(this.apiFetch, this.searchInput)
      }
    },
    randomString () {
      return Math.ceil(Math.random() * 100000).toString()
    }
  }
})
</script>

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
