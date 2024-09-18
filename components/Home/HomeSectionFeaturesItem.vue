<template>
  <div class="home-section-features-item">
    <nuxt-img
      class="home-section-features-item-img"
      :src="`/img/home/${imgFilename}`"
      :alt="imgAlt"
      format="webp"
    />
    <div class="home-section-features-item-text">
      <div class="home-section-features-item-text-headline">
        <img
          class="home-section-features-item-text-headline-icon"
          src="@/assets/img/_shared/font-awesome/check-solid-orange.svg"
        />
        <h3>{{ headline }}</h3>
      </div>
      <p class="home-section-features-item-text-article">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgFilename: {
      type: String,
      required: true
    },
    imgAlt: {
      type: String,
      required: true
    },
    headline: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.home-section-features-item {
  max-width: 300px;
  background-color: $greyLight;
  margin: 15px;
  width: 100%;

  @media #{$lg} {
    margin: 0;
    width: 31.5%;
  }

  .home-section-features-item-img {
    width: 100%;
    display: block;
  }

  .home-section-features-item-text {
    padding: 20px;

    .home-section-features-item-text-headline {
      display: flex;
      align-items: flex-start;
      min-height: 70px;
      padding-bottom: 20px;

      .home-section-features-item-text-headline-icon {
        margin: 7px 10px 0 0;
        width: 14px;
      }
    }
  }
}
</style>
