<template>
  <span
    class="button"
    :class="{ active, activeBorder, inlineBlock, small, disabled, noScaleHoverEffect, pending, useRawHtml, hasIcon }"
    @click="onClick"
  >
    <span class="button-pending-spinner">
      <span></span>
    </span>
    <div class="button-inner">
      <slot name="icon"></slot>
      <span v-if="useRawHtml" class="button-text" v-html="label"></span>
      <span v-else class="button-text">{{ label }}</span>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    activeBorder: {
      type: Boolean,
      default: false
    },
    inlineBlock: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noScaleHoverEffect: {
      type: Boolean,
      default: false
    },
    pending: {
      type: Boolean,
      default: false
    },
    useRawHtml: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasIcon () {
      return !!this.$slots.icon
    }
  },
  methods: {
    onClick () {
      // TODO: use enabledClick in parent components!
      if (this.pending) { return }
      return this.disabled
        ? this.$emit('disabledClick')
        : this.$emit('enabledClick')
    }
  }
}
</script>

<style scoped lang="scss">
.button {
  position: relative;
  border: 1px solid $grey;
  color: $grey;
  font-size: 90%;
  padding: 14px 15px;
  text-align: center;
  transition: transform .4s;
  display: block;

  span {
    display: block;
  }

  &:not(.useRawHtml) {
    font-weight: 500;
  }

  &.small {
    padding: 10px 15px;
  }

  &.active {
    transition: all .4s;
    background-color: $colorPrimary;
    color: #fff;
    border: 1px solid $colorPrimary;
  }

  &.activeBorder {
    color: $colorPrimary;
    border: 1px solid $colorPrimary;
    background-color: #fff;
  }

  &.centered {
    margin: 0 auto;
  }

  &.inlineBlock {
    display: inline-block;
  }

  &:not(.disabled):hover {
    cursor: pointer;

    &:not(.noScaleHoverEffect) {
      transform: scale(1.05);
      background-color: $colorPrimary;
      color: #fff;
      border: 1px solid $colorPrimary;
    }

    &.noScaleHoverEffect {

      &.active {
        background-color: #ea8e50;
      }

      &.activeBorder {
        border: 1px solid #ea8e50;
        color: #ea8e50;
      }
    }
  }

  &.disabled {
    opacity: .5;
  }

  &.pending {
    .button-text {
      opacity: 0;
    }

    .button-pending-spinner {
      opacity: 1;
    }
  }

  &.hasIcon {
    text-align: left;

    .button-inner {
      .button-text {
        margin-left: 5px;
      }
    }
  }

  .button-inner {
    display: flex;
    align-items: center;
    justify-content: center;

    .button-text {
      line-height: 1.2;
    }
  }

  .button-pending-spinner {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
      display: block;
      border: 3px solid #f3f3f3;
      border-top-color: $colorPrimary;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      animation: rotate 1.5s linear infinite;
    }
  }
}
</style>
