<script setup>
const IMAGE = {
  TO_TOP_LEFT: 'to-top-left.svg',
  TO_TOP_RIGHT: 'to-top-right.svg',
  TO_LEFT_TOP: 'to-left-top.svg',
  TO_LEFT_BOTTOM: 'to-left-bottom.svg',
  TO_RIGHT_BOTTOM: 'to-right-bottom.svg',
  TO_RIGHT: 'to-right.svg',
  TO_BOTTOM_LEFT: 'to-bottom-left.svg',
  TO_BOTTOM_LEFT_TILTED: 'to-bottom-left-tilted.svg'
}

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String, 
    required: true
  }
})
</script>

<template>
  <div class="blue-arrow" :class="type">
    <img
      :src="`/img/blueArrow/${IMAGE[type]}`"
    />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="text"></span>
  </div>
</template>

<style scoped lang="scss">
.blue-arrow {
  font-family: $fontBlueArrow;
  font-weight: 400;
  font-style: italic;
  color: $blueArrow;
  display: none;

  @media #{$lg} {
    display: block;
  }

  span {
    position: absolute;
    font-size: 130%;
    margin: 0;
    white-space: nowrap;
    line-height: 120%;
  }

  &.TO_TOP_LEFT {

    img {
      width: 30px;
    }
    span {
      top: 25px;
      left: 0;
      transform: rotate(-10deg);
    }
  }

  &.TO_TOP_RIGHT {

    img {
      width: 50px;
    }
    span {
      text-align: left;
      top: 25px;
      right: 0;
    }
  }

  &.TO_LEFT_TOP {

    img {
      width: 70px;
    }
    span {
      top: 60%;
      left: calc(100% + 20px);
      transform: translateX(-50%) rotate(-15deg);
    }
  }

  &.TO_LEFT_BOTTOM {

    img {
      width: 70px;
    }
    span {
      bottom: 100%;
      left: calc(100% + 20px);
      transform: translateX(-50%) rotate(-10deg);
    }
  }

  &.TO_RIGHT {

    img {
      width: 100px;
    }
    span {
      text-align: left;
      bottom: 110%;
      right: 40%;
      transform: rotate(-10deg);
    }
  }

  &.TO_RIGHT_BOTTOM {

    img {
      width: 40px;
      margin-top: 10px;
    }
    span {
      bottom: 100%;
      right: 100%;
      font-size: 115%;
      transform: translateX(40%) rotate(-15deg);
    }
  }

  &.TO_BOTTOM_LEFT {

    img {
      width: 40px;
    }

    span {
      top: 0;
      left: 100%;
      transform: translate(15px, -50%);
    }
  }

  &.TO_BOTTOM_LEFT_TILTED {

    img {
      width: 40px;
    }

    span {
      top: -20px;
      left: 100%;
      transform: translate(15px, -50%) rotate(-15deg);
    }
  }
}
</style>
