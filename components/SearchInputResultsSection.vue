<template>
  <div class="search-input-results-section">
    <p class="search-input-results-section-headline">
      {{ headline }}
    </p>
    <div
      v-for="(res, index) in results"
      :key="index"
      class="search-input-results-section-item"
    >
      <CustomNuxtLink :to="getLinkFromLocation(res.location)" @click.native="$emit('select')">
        <div class="search-input-results-section-item-inner">
          <template v-if="res.matchingLength > 0">
            <span>{{
              res.label.slice(0, res.matchingStart)
            }}</span><span class="search-input-results-section-item-matched">{{
              res.label.slice(res.matchingStart, res.matchingLength + res.matchingStart)
            }}</span><span>{{
              res.label.slice(res.matchingStart + res.matchingLength)
            }}</span>
          </template>
          <span v-else>
            {{ res.label }}
          </span>
        </div>
      </CustomNuxtLink>
    </div>
  </div>
</template>

<script>
import {PATHS} from "assets/js/constants.js";

export default {
  props: {
    headline: {
      type: String,
      required: true
    },
    results: {
      type: Array,
      required: true
    }
  },
  methods: {
    getLinkFromLocation ({ gemeindeIdName, kreisIdName, stateIdName }) {
      if (gemeindeIdName) {
        return PATHS.GEMEINDE({ kreisIdName, stateIdName }, gemeindeIdName)
      } else if (kreisIdName) {
        return PATHS.KREIS({ stateIdName }, kreisIdName)
      } else if (stateIdName) {
        return PATHS.STATE(null, stateIdName)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-input-results-section {

  .search-input-results-section-headline {
    padding: 15px 15px 5px;
    font-size: 90%;
    color: $grey;
  }
  .search-input-results-section-item {

    .search-input-results-section-item-inner {
      padding: 8px 15px;

      &:hover {
        cursor: pointer;
        color: #fff;
        background-color: $colorPrimary;
      }

      .search-input-results-section-item-matched {
        font-weight: 500;
      }
    }
  }
}
</style>
