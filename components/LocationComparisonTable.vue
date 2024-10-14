<template>
  <div class="location-comparison-table">
    <div class="location-comparison-table-height-limiter" :class="{ maximized }">
      <table>
        <thead>
          <tr :class="{ maximized }">
            <th :style="thStyle">
              {{ locationTypeLabel }}
            </th>
            <th v-if="nearbyComparison" :style="thStyle">
              {{ $t('_shared.locationComparison.table.headLabels.distance') }}
            </th>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <th :style="thStyle" v-html="$t('_shared.locationComparison.table.headLabels.pricePerSqm')"></th>
            <th :style="thStyle">
              <pre>{{ $t('_shared.locationComparison.table.headLabels.totalPlotArea') }}</pre>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
          >
            <td>
              <CustomNuxtLink :to="getLink(row)">
                {{ row.name }}
              </CustomNuxtLink>
              <span v-if="row.isKreisfrei && !nearbyComparison" class="location-comparison-table-kreisfrei-label">
                {{ $t('_shared.locationComparison.table.kreisfreiLabel') }}
              </span>
            </td>
            <td v-if="nearbyComparison">
              {{ $n(row.distance, { maximumFractionDigits: 0 }) }} km
            </td>
            <td>
              {{ $n(row.pricePerSqm, { maximumFractionDigits: 0 }) }}€
            </td>
            <td>
              {{ $n(row.totalPlotArea || 0, { maximumFractionDigits: 0 }) }} m²
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showMaximizeButton" class="location-comparison-table-button-wrapper" :class="{ maximized }">
      <div v-show="!maximized" class="location-comparison-table-button-overlay" @click="maximized = !maximized"></div>
      <div class="location-comparison-table-button" @click="maximized = !maximized">
        <p v-if="maximized">
          <img
            src="@/assets/img/_shared/font-awesome/chevron-up-solid.svg"
            class="location-comparison-table-button-icon"
          />
          {{ $t('_shared.locationComparison.table.minimizeLabel') }}
        </p>
        <p v-else>
          <img
            src="@/assets/img/_shared/font-awesome/chevron-down-solid.svg"
            class="location-comparison-table-button-icon"
          />
          {{ $t('_shared.locationComparison.table.maximizeLabel') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { PATHS } from '~/assets/js/constants'
import { getPathForLocationIdNames } from '~/assets/js/locationUtils'
import {useStore} from "~/store/main.js";

export default defineNuxtComponent({
  setup() {
    return {
      mainStore: useStore()
    }
  },
  props: {
    nearbyComparison: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    },
    locationType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMaximizeButton: false,
      maximized: false,
      attachHeadToTop: false
    }
  },
  computed: {
    locationTypeLabel () {
      return this.$t(`_shared.locationComparison.table.headLabels.${this.locationType}`)
    },
    thStyle () {
      if (!this.maximized) {
        return {}
      }
      return { top: `${this.mainStore.maximizedNavHeight + this.mainStore.navMinifyOffset}px` }
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    getLink (row) {
      if (this.nearbyComparison) {
        // we cannot use current location as nearby cities could be in another state
        const { gemeindeIdName, kreisIdName, stateIdName } = row
        return getPathForLocationIdNames({ gemeindeIdName, kreisIdName, stateIdName })
      } else {
        return PATHS[this.locationType](this.$route.params, row.idName)
      }
    },
    onResize () {
      const tableHeightLimiter = document.querySelector('.location-comparison-table-height-limiter')
      const table = document.querySelector('.location-comparison-table-height-limiter table')
      if (!tableHeightLimiter || !table) { return }
      if (tableHeightLimiter.offsetHeight < table.offsetHeight) {
        if (!this.showMaximizeButton) {
          this.showMaximizeButton = true
        }
      } else if (this.showMaximizeButton) {
        this.showMaximizeButton = false
      }
    }
  }
})
</script>

<style lang="scss">
.location-comparison-table {
  position: relative;
  font-size: 90%;
  margin: 20px 0;

  @media #{$lg} {
    font-size: 100%;
  }

  .location-comparison-table-height-limiter {
    max-height: 800px;
    overflow: hidden;

    &.maximized {
      max-height: none;
      overflow: unset;
    }

    table {
      width: 100%;
      box-sizing: border-box;
      border-collapse: collapse;

      tr {

        th {
          font-weight: 400;
          background-color: $greyLight;
          white-space: nowrap;

          &:first-child {
            width: 99%;
            white-space: unset;
          }

          @media #{$lg} {
            width: unset !important;
            white-space: unset;
          }

          pre {
            margin: 0;
          }
        }

        &.maximized {

          th {
            position: sticky;
            transition: top $minifyNavAnimationSpeed;
            box-shadow: 0 1px 1px 0 $colorStroke;
          }
        }

        td, th {
          text-align: right;
          border: 1px solid $colorStroke;
          padding: 5px 6px;
          box-sizing: border-box;

          @media #{$lg} {
            padding: 5px 20px;
          }

          &:first-child {
            text-align: left;
          }

          &:last-child {

            @media #{$maxLg} {
              display: none;
            }
          }

          a {
            color: $colorPrimary;
          }

          .location-comparison-table-kreisfrei-label {
            color: $grey;
            font-size: 80%;
            margin-left: 3px;
          }
        }
      }
    }
  }

  .location-comparison-table-button-wrapper {
    position: relative;
    bottom: 0;
    z-index: 1;

    &.maximized {
      position: sticky;
    }

    .location-comparison-table-button-overlay {
      position: absolute;
      left: 1px;
      right: 1px;
      bottom: 100%;
      height: 120px;
      background-image: linear-gradient(to top, #fff, rgba(#fff, .7), transparent);
    }

    .location-comparison-table-button {
      text-align: center;
      padding: 10px 0;
      background-color: $greyLight;
      border: 1px solid $colorStroke;

      &:hover {
        cursor: pointer;
      }

      .location-comparison-table-button-icon {
        margin-right: 10px;
        width: 15px;
      }
    }
  }
}
</style>
