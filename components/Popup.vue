<template>
  <div class="popup-wrapper" :class="{ calc }">
    <div
      class="popup-bg"
      @click="$emit('close')"
    ></div>
    <div
      class="popup"
      :class="{ smallMarginTop }"
      data-transition="subject"
    >
      <div class="popup-head">
        <img v-if="!hideIcon" src="~/assets/img/_shared/info-icon-orange.svg" />
        <p class="popup-head-title">
          {{ title }}
        </p>
        <img
          src="@/assets/img/_shared/font-awesome/xmark-solid.svg"
          class="popup-head-icon"
          @click="$emit('close')"
        />
      </div>
      <div class="popup-body">
        <p v-if="description">
          {{ description }}
        </p>
        <slot v-else></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    smallMarginTop: {
      type: Boolean,
      default: false
    },
    calc: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.popup-wrapper {
  position: fixed;
  z-index: 11;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  &.calc {

    @media #{$lg} {
      width: $calcInputWidth;
      min-width: $calcInputMinWidth;
    }
  }

  .popup-bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(#fff, .7);
  }

  .popup {
    position: relative;
    margin: 80px auto 30px;
    background-color: #fff;
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
    width: 90%;
    max-width: 500px;

    &.smallMarginTop {
      margin-top: 30px;

      @media #{$lg} {
        margin-top: 80px;
      }
    }

    .popup-head {
      padding: 20px;
      border-bottom: 1px solid #C4C4C4;
      display: flex;
      align-items: flex-start;

      img {
        margin-top: 4px;
      }

      .popup-head-title {
        flex-grow: 1;
        margin-left: 10px;
        font-family: $fontHeadline;
      }

      .popup-head-icon {
        width: 14px;
        padding: 5px;
        margin-right: -5px;
        cursor: pointer;

        &:hover {
          opacity: .7;
        }
      }
    }

    .popup-body {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>
