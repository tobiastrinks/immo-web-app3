<template>
  <div class="home-head">
    <div class="home-head-bg">
      <NuxtImg
          src="/img/home/headBg.jpg"
          format="webp"
          class="home-head-bg-img"
      />
    </div>
    <div class="home-head-bg-transition"></div>
    <div class="inner">
      <div class="home-head-box">
        <Headline :headline="$t('home.headline')" />
        <p
            v-for="(feature, index) in $tm('home.head.features')"
            :key="index"
            class="home-head-box-feature"
        >
          <img
              class="home-head-box-feature-icon"
              src="@/assets/img/_shared/font-awesome/check-solid-white.svg"
          />
          {{ feature }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-head {
  position: relative;
  transition: transform $minifyNavAnimationSpeed;

  @media #{$md} {
    overflow: hidden;
    height: 500px;
  }

  .home-head-bg {
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 300px;

    @media #{$md} {
      height: unset;
      bottom: 0;
    }

    .home-head-bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .home-head-bg-transition {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background: transparent linear-gradient(180deg, transparent, rgba(#fff, .6));
  }

  .inner {
    position: relative;
    z-index: 2;
    padding-top: 270px;

    @media #{$md} {
      padding-top: 100px;
    }

    .home-head-box {
      width: 100%;
      max-width: 400px;
      padding: 20px 30px;
      box-sizing: border-box;
      color: #fff;
      background-color: $colorPrimary;
      margin: 0 auto;

      @media #{$md} {
        margin: unset;
      }

      h1 {
        white-space: pre-wrap;
        max-width: 400px;
        margin-bottom: 15px;
      }

      .home-head-box-feature {
        font-weight: 400;

        .home-head-box-feature-icon {
          width: 14px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
