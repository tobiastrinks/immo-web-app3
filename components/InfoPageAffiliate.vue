<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="info-page-affiliate-wrapper">
    <div class="info-page-affiliate" :class="props.type">
      <p class="info-page-affiliate-title">
        {{ $t(`_shared.${props.type}.title`) }}
      </p>
      <div class="info-page-affiliate-description">
        <p>{{ $t(`_shared.${props.type}.description`) }}</p>
      </div>
      <div class="info-page-affiliate-iframe">
        <div v-if="props.type==='mieteAktuell'" class="info-page-affiliate-iframe-miete-aktuell">
          <MieteAktuell />
          <div class="info-page-affiliate-iframe-miete-aktuell-bg">
            <div class="info-page-affiliate-iframe-miete-aktuell-bg-overlay"></div>
            <nuxt-img src="/img/affiliate/bg-property.jpg" format="webp" class="info-page-affiliate-iframe-hausgold-bg-img1" />
            <nuxt-img src="/img/affiliate/bg-couple-2-cropped.jpg" format="webp" class="info-page-affiliate-iframe-hausgold-bg-img2" />
          </div>
        </div>
        <div v-else class="info-page-affiliate-iframe-wattfox-immo">
          <WattfoxImmo />
          <div class="info-page-affiliate-iframe-wattfox-immo-bg">
            <div class="info-page-affiliate-iframe-wattfox-immo-bg-overlay"></div>
            <nuxt-img src="/img/affiliate/bg-property.jpg" format="webp" class="info-page-affiliate-iframe-wattfox-immo-bg-img1" />
            <nuxt-img src="/img/affiliate/bg-couple-2-cropped.jpg" format="webp" class="info-page-affiliate-iframe-wattfox-immo-bg-img2" />
          </div>
        </div>
        <BlueArrow
          class="info-page-affiliate-iframe-arrow"
          type="TO_RIGHT"
          :text="$t('_shared.infoPage.affiliateArrowLabel')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.info-page-affiliate-wrapper {
  margin-bottom: 60px;

  @media #{$lg} {
    margin-bottom: 100px;
  }

  .info-page-affiliate {
    text-align: center;

    .info-page-affiliate-title {
      font-family: $fontHeadline;
      font-size: 150%;
      line-height: 1.4;
    }

    .info-page-affiliate-description {
      margin: 5px auto 30px;
      max-width: 600px;
      line-height: 1.4;

      hr {
        opacity: 0;
        margin: 5px 0;
      }

      &.hausgold {
        max-width: none;

        img {
          height: 30px;
          margin: 0 2px -10px;
        }
      }
    }

    .info-page-affiliate-disclaimer {
      background-color: $greyMedium;
      padding: 10px 15px;
      display: flex;
      justify-content: center;
      max-width: 400px;
      margin: 25px auto 25px;
      text-align: left;
      line-height: 1.4;

      .info-page-affiliate-disclaimer-text {
        margin-left: 10px;
      }
    }

    .info-page-affiliate-iframe {
      position: relative;
      margin: 0 auto;

      .info-page-affiliate-iframe-arrow {
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateY(-30px);

        @media screen and (max-width : 1200px) {
          display: none;
        }
      }
    }

    &.wattfoxImmo {

      .info-page-affiliate-iframe {

        .info-page-affiliate-iframe-wattfox-immo {
          position: relative;
          margin: 0 -5vw;

          @media #{$md} {
            margin: 0;
          }

          .info-page-affiliate-iframe-wattfox-immo-bg {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 400px;
            display: flex;
            justify-content: space-between;
            opacity: .8;

            @media screen and (max-width : 1250px) {
              display: none;
            }

            .info-page-affiliate-iframe-wattfox-immo-bg-overlay {
              position: absolute;
              width: 100%;
              height: 100px;
              background-image: linear-gradient(#fff, transparent);
            }

            img {
              width: calc(50% - 384px);
              min-width: 10%;
              height: 100%;
              object-fit: cover;

              &.info-page-affiliate-iframe-wattfox-immo-bg-img1 {
                object-position: 20% 50%;
              }

              &.info-page-affiliate-iframe-wattfox-immo-bg-img2 {
                object-position: 10% 50%;
              }
            }
          }
        }
      }
    }

    &.mieteAktuell {

      .info-page-affiliate-iframe {

        .info-page-affiliate-iframe-miete-aktuell {
          position: relative;
          margin: 0 -5vw;

          @media #{$md} {
            margin: 0;
          }

          .info-page-affiliate-iframe-miete-aktuell-bg {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            height: 400px;
            display: flex;
            justify-content: space-between;
            opacity: .8;

            @media screen and (max-width : 1250px) {
              display: none;
            }

            .info-page-affiliate-iframe-miete-aktuell-bg-overlay {
              position: absolute;
              width: 100%;
              height: 100px;
              background-image: linear-gradient(#fff, transparent);
            }

            img {
              width: calc(50% - 384px);
              min-width: 10%;
              height: 100%;
              object-fit: cover;

              &.info-page-affiliate-iframe-miete-aktuell-bg-img1 {
                object-position: 20% 50%;
              }

              &.info-page-affiliate-iframe-miete-aktuell-bg-img2 {
                object-position: 10% 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
