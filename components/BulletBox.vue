<script setup>
const props = defineProps({
  headline: {
    type: String,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bullet-box">
    <p class="bullet-box-headline">
      {{ props.headline }}
    </p>
    <div class="bullet-box-content">
      <div
        v-for="(row, index) in props.rows"
        :key="index"
        class="bullet-box-content-row"
      >
        <p class="bullet-box-content-number">
          {{ row.number }}
        </p>
        <p
          class="bullet-box-content-text"
          v-html="row.text"
        ></p>
      </div>
    </div>
    <BlueArrow
      class="bullet-box-blue-arrow"
      text="Sie bestimmen, wie<br> es weiter geht!"
      type="TO_LEFT_BOTTOM"
    />
  </div>
</template>

<style lang="scss">
.bullet-box {
  background-color: $colorLightGreyBg;
  padding: 20px;
  margin: 20px 0;
  position: relative;

  @media #{$xl} {
    width: calc(100% - 250px);
  }

  .bullet-box-headline {
    font-weight: 500;
    font-size: 110%;
  }

  .bullet-box-content {

    .bullet-box-content-row {
      display: flex;
      margin: 10px 0;
      align-items: flex-start;

      .bullet-box-content-number {
        color: $colorPrimary;
        flex-shrink: 0;
        width: 15px;
        padding-right: 10px;
        text-align: right;
        font-weight: 500;
      }

      .bullet-box-content-text {
        flex-grow: 1;
      }
    }
  }

  .bullet-box-blue-arrow {
    display: none;
    position: absolute;
    left: calc(100% + 20px);
    bottom: 10px;

    span {
      font-size: 105%;
    }

    @media #{$xl} {
      display: block;
    }
  }
}
</style>
