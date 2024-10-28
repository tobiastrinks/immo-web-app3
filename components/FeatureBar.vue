<template>
  <div class="feature-bar" :class="{ greyBg }">
    <div class="inner">
      <div class="feature-bar-inner">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="feature-bar-item"
        >
          <img :src="item.iconSrc" />
          <p class="feature-bar-item-text-headline">
            <span class="feature-bar-item-text-headline-check">✓</span>
            {{ item.title }}
          </p>
          <p class="feature-bar-item-text-description">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    greyBg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.feature-bar {
  margin: 80px 0 0;
  background-color: rgba(#EC7B2F, .15);

  &.greyBg {
    background-color: #F0F0F0;
  }

  .feature-bar-inner {
    display: flex;
    padding: 5px 0;
    flex-wrap: wrap;
    justify-content: center;

    @media #{$md} {
      justify-content: space-between;
    }

    .feature-bar-item {
      text-align: center;
      max-width: 250px;
      margin: 30px 0;

      @media #{$md} {
        width: 30%;
      }

      .feature-bar-item-text-headline {
        font-weight: 500;
        margin: 10px 0;

        .feature-bar-item-text-headline-check {
          color: $colorPrimary;
        }
      }
    }
  }
}
</style>
