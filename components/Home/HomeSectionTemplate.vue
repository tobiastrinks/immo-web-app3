<template>
  <div class="section-template">
    <div class="inner">
      <div class="section-template-text">
        <Headline
          :headline="headline"
          :level="2"
          :sub-headline="subHeadline"
          centered
        />
        <slot></slot>
        <Button
          v-if="buttonLabel"
          class="section-template-text-button"
          :class="{ centered }"
          :label="buttonLabel"
          active
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true
    },
    subHeadline: {
      type: String,
      required: true
    },
    buttonLabel: {
      type: String,
      default: null
    },
    centered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.section-template {
  border-top: 1px solid $colorStroke;
  margin: 100px 0;

  .inner {

    .section-template-text {
      border-top: 10px solid $greyMedium;
      padding-top: 40px;

      @media #{$lg} {
        padding-top: 80px;
      }

      h3 {
        margin-top: 20px;
      }

      .section-template-text-button {
        width: 270px;
        margin-top: 10px;
      }
    }
  }
}
</style>
