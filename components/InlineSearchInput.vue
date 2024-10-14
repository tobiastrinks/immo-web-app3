<template>
  <div class="inline-search-input" :class="{ bottomArrow }">
    <SearchInput />
    <BlueArrow v-if="bottomArrow" class="inline-search-input-arrow-bottom" type="TO_TOP_LEFT" :text="arrowText" />
    <BlueArrow v-else class="inline-search-input-arrow" type="TO_LEFT_TOP" :text="arrowText" />
  </div>
</template>

<script>
export default {
  props: {
    arrowText: {
      type: String,
      required: true
    },
    bottomArrow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.inline-search-input {
  position: relative;
  max-width: 300px;
  text-align: left;

  &.bottomArrow {

    @media #{$lg} {
      margin-bottom: 80px;
    }
  }

  .inline-search-input-arrow {
    position: absolute;
    left: calc(100% + 20px);
    top: -8px;
    transform: scale(.8);
  }

  .inline-search-input-arrow-bottom {
    position: absolute;
    top: calc(100% + 20px);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
