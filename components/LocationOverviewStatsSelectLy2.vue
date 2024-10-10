<template>
  <div class="location-overview-stats-select-ly2">
    <div class="location-overview-stats-select-ly2-title">
      <p class="location-overview-stats-select-ly2-title-text">
        <span class="location-overview-stats-select-ly2-title-text-main">
          {{ title }}
        </span>
        <span class="location-overview-stats-select-ly2-title-text-brackets">
          {{ titleBrackets }}
        </span>
      </p>
    </div>
    <div class="location-overview-stats-select-ly2-options">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="location-overview-stats-select-ly2-options-item"
        :class="{ selected: option.val === selected, disabled: option.disabled }"
        @click="selectStats(option)"
      >
        <div class="location-overview-stats-select-ly2-options-item-radio">
          <div class="location-overview-stats-select-ly2-options-item-radio-inner"></div>
        </div>
        <p class="location-overview-stats-select-ly2-options-item-text">
          {{ $t(`_shared.locationOverviewStats.select.labels.${option.localeKey}`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { offsetTop } from '~/assets/js/scrollUtils'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    titleBrackets: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      default: null
    }
  },
  methods: {
    selectStats (option) {
      if (option.disabled) {
        return
      }
      this.$emit('select', option.val)
      if (window.innerWidth < 600) {
        window.scrollTo({
          top: offsetTop(document.querySelector('.location-overview-stats')) - 100,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
$customBreakpoint: "screen and (min-width : 700px)";

.location-overview-stats-select-ly2 {
  width: 100%;

  &:last-child {
    margin-top: 20px;

    @media #{$md} {
      margin: 0;
    }
  }

  .location-overview-stats-select-ly2-title {
    font-weight: 400;
    margin: 0 auto;

    @media #{$md} {
      margin-bottom: 15px;
    }

    .location-overview-stats-select-ly2-title-text {
      display: flex;
      align-items: center;

      .location-overview-stats-select-ly2-title-text-main {
        font-size: 130%;
        font-weight: 500;
        margin-right: 10px;
      }

      .location-overview-stats-select-ly2-title-text-brackets {
        font-weight: 300;
      }
    }
  }

  .location-overview-stats-select-ly2-options {

    .location-overview-stats-select-ly2-options-item {
      font-weight: 400;
      display: flex;
      align-items: center;
      margin: 8px 0;
      cursor: pointer;

      &.selected {
        font-weight: 700;

        .location-overview-stats-select-ly2-options-item-radio {

          .location-overview-stats-select-ly2-options-item-radio-inner {
            display: block;
          }
        }
      }

      &.disabled {
        opacity: .3;
        cursor: default;
      }

      &:not(.disabled):hover {

        .location-overview-stats-select-ly2-options-item-text {
          transform: scale(1.05);
        }
      }

      .location-overview-stats-select-ly2-options-item-radio {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border: 2.5px solid $colorPrimary;
        border-radius: 30px;
        flex-shrink: 0;

        .location-overview-stats-select-ly2-options-item-radio-inner {
          display: none;
          width: 100%;
          height: 100%;
          background-color: $colorPrimary;
          border-radius: 100%;
          border: 3px solid #fff;
          box-sizing: border-box;
        }
      }

      .location-overview-stats-select-ly2-options-item-text {
        transition: transform .4s;
        text-align: center;
      }
    }
  }
}
</style>
