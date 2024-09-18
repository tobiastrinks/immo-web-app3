<template>
  <div class="home-column-section-template">
    <div class="inner" :class="{ inverted }">
      <div class="home-column-section-template-text">
        <Headline
          :headline="headline"
          :level="2"
          :sub-headline="subHeadline"
        />
        <slot name="text"></slot>
        <CustomNuxtLink
          v-if="buttonLabel && buttonLink"
          :to="buttonLink"
        >
          <Button
            class="home-column-section-template-text-button"
            :label="buttonLabel"
            active
          />
        </CustomNuxtLink>
        <slot name="below-button"></slot>
      </div>
      <div class="home-column-section-template-img">
        <slot name="image"></slot>
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
    buttonLink: {
      type: String,
      default: null
    },
    inverted: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.home-column-section-template {
  border-top: 1px solid $colorStroke;
  margin: 50px 0;

  @media #{$lg} {
    margin: 100px 0;
  }

  .inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &.inverted {
      flex-direction: row-reverse;
    }

    .home-column-section-template-text {
      border-top: 10px solid $greyMedium;
      padding-top: 50px;
      text-align: justify;

      @media #{$lg} {
        width: 47%;
        padding-top: 80px;
      }

      h3 {
        margin-top: 20px;
        text-align: left;
      }

      .home-column-section-template-text-button {
        width: 270px;
        margin-top: 10px;
      }
    }

    .home-column-section-template-img {
      margin-top: 50px;

      @media #{$lg} {
        width: 40%;
      }

      img {
        width: 100%;
      }
    }
  }
}
</style>
