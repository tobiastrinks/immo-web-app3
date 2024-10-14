<script setup>
import {useLocationStore} from "~/store/location.js";

const { $gtm } = useNuxtApp()
const i18n = useI18n()
const locationStore = useLocationStore()

const downloadClick = () => {
  $gtm.push({ event: 'download.marketReport' })
  window.open(locationStore.marketReport.url, '_blank')
}

const zustaendigerGutachterausschuss = computed(() => {
  const { gemeinde, kreis } = locationStore
  let translationKey
  if (gemeinde || kreis) {
    translationKey = '_shared.locationMarketReport.gutachterAusschussTemplate.kreis'
  } else {
    translationKey = '_shared.locationMarketReport.gutachterAusschussTemplate.state'
  }
  return i18n.t(translationKey, {
    zustaendigerGutachterausschuss: locationStore.marketReport.zustaendigerGutachterausschuss
  })
})

const paragraphs = computed(() => {
  const paragraphsKey = '_shared.locationMarketReport.paragraphs'
  return i18n.tm(paragraphsKey).map((_, index) => {
    return i18n.t(`${paragraphsKey}[${index}]`, {
      zustaendigerGutachterausschussTemplate: zustaendigerGutachterausschuss.value
    })
  })
})

const boxText = computed(() => {
  return i18n.t('_shared.locationMarketReport.box', {
    year: locationStore.marketReport.year,
    price: locationStore.marketReport.withFee
      ? i18n.t('_shared.locationMarketReport.boxPrice.withFee')
      : i18n.t('_shared.locationMarketReport.boxPrice.free')
  })
})

const buttonLabel = computed(() => {
  return i18n.t('_shared.locationMarketReport.buttonLabel', {
    zustaendigerGutachterausschuss: locationStore.marketReport.zustaendigerGutachterausschuss
  })
})
</script>

<template>
  <div class="location-market-report">
    <TextArticle
        class="location-market-report-text-article"
        :paragraphs="paragraphs"
    />
    <div class="location-market-report-box">
      <p class="location-market-report-box-text" v-html="boxText"></p>
      <Button
          :label="buttonLabel"
          use-raw-html
          inline-block
          active-border
          small
          @enabled-click="downloadClick"
      >
        <template #icon>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask
                id="mask0_5225_2155"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="25"
            >
              <rect y="0.0136719" width="24" height="24" fill="currentColor" />
            </mask>
            <g mask="url(#mask0_5225_2155)">
              <path d="M8 18.0137H16V16.0137H8V18.0137ZM8 14.0137H16V12.0137H8V14.0137ZM6 22.0137C5.45 22.0137 4.97917 21.8178 4.5875 21.4262C4.19583 21.0345 4 20.5637 4 20.0137V4.01367C4 3.46367 4.19583 2.99284 4.5875 2.60117C4.97917 2.20951 5.45 2.01367 6 2.01367H14L20 8.01367V20.0137C20 20.5637 19.8042 21.0345 19.4125 21.4262C19.0208 21.8178 18.55 22.0137 18 22.0137H6ZM13 9.01367V4.01367H6V20.0137H18V9.01367H13Z" fill="currentColor" />
            </g>
          </svg>
        </template>
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-market-report {

  .location-market-report-text-article {
    margin-bottom: 20px;
  }

  .location-market-report-box {
    background-color: #F2F2F2;
    border: 1px solid #C4C4C4;
    padding: 20px;

    .location-market-report-box-text {
      margin-bottom: 10px;
    }

    @media #{$xxl} {
      display: flex;
      align-items: center;

      .location-market-report-box-text {
        margin-right: 15px;
      }
    }
  }
}
</style>
