<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  highlighted: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="property-value-result-box" :class="{ highlighted: props.highlighted }">
    <p class="property-value-result-box-title">
      {{ props.title }}
    </p>
    <div class="property-value-result-box-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.property-value-result-box {
  background-color: $colorLightGreyBg;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid $colorStroke;

  &.highlighted {
    background-color: #FBF2EB;
  }

  @media #{$sm} {
    padding: 20px;
  }

  .property-value-result-box-title {
    font-weight: 500;
    font-size: 110%;
  }

  .property-value-result-box-content {
    margin-top: 8px;
  }
}
</style>
