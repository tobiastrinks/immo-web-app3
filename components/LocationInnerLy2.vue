<script setup>
import { PATHS } from '~/assets/js/constants'
import {useLocationStore} from "~/store/location.js";
import {useCfStore} from "~/store/cf.js";
import {useRoute as useNativeRoute} from "#vue-router";
import {enableSchemaOrg} from "assets/js/featureFlagUtils.js";

const TOC_SECTIONS = {
  ANALYSIS: 'auswertung',
  TREND: 'preisentwicklung',
  MARKET_REPORT: 'grundstuecksmarktbericht',
  BODENRICHTWERT: 'bodenrichtwerte',
  LOCATION_FAKTOREN: 'grundstueckswert-faktoren',
  PROPERTY_VALUE: 'grundstueckswert-ermitteln',
  PROPERTY_SELL: 'grundstueck-verkaufen',
  PROPERTY_BUY: 'grundstueck-kaufen',
  FAQ: 'faq'
}

const props = defineProps({
  headline: {
    type: String,
    required: true
  },
  subHeadline: {
    type: String,
    required: true
  }
})

const abTest = useAbTest()
const locationStore = useLocationStore()
const cfStore = useCfStore()
const nuxtApp = useNuxtApp()
const i18n = useI18n()
const route = useNativeRoute()
const config = useRuntimeConfig()

const affiliateAbTestType = abTest.getSessionFeature('affiliateWidgets')

const location = computed(() => {
  return locationStore.activeLocationMainData
})
const locationName = computed(() => {
  return location.value.name || i18n.t('_shared.location.germanyLocationName')
})
const locationType = computed(() => {
  return locationStore.activeLocationType
})
const hasTrend = computed(() => {
  return !!cfStore.locationTrend
})
const hasMarketReport = computed(() => {
  return !!locationStore.marketReport
})
const hasBodenrichtwert = computed(() => {
  return !!bodenrichtwert.value
})
const locationFaktoren = computed(() => {
  return cfStore.locationFaktoren
})
const locationFAQ = computed(() => {
  return cfStore.locationFAQ
})
const tocSections = computed(() => {
  return Object.keys(TOC_SECTIONS)
      .filter((s) => {
        switch (TOC_SECTIONS[s]) {
          case TOC_SECTIONS.TREND:
            return hasTrend.value
          case TOC_SECTIONS.MARKET_REPORT:
            return hasMarketReport.value
          case TOC_SECTIONS.BODENRICHTWERT:
            return hasBodenrichtwert.value
          case TOC_SECTIONS.LOCATION_FAKTOREN:
            return !!locationFaktoren.value
          case TOC_SECTIONS.FAQ:
            return !!locationFAQ.value
          default:
            return true
        }
      })
      .map((s, index) => ({
        id: TOC_SECTIONS[s],
        headline: getTocSectionHeadline(index + 1, TOC_SECTIONS[s])
      }))
})
const bodenrichtwert = computed(() => {
  const { locationBodenrichtwert, locationBodenrichtwertMini } = cfStore
  return locationBodenrichtwert || locationBodenrichtwertMini
})
const lastUpdatedText = computed(() => {
  return i18n.t('_shared.location.lastUpdated', { date: i18n.d(new Date(), 'short') })
})

const tocSection = (id) => {
  return tocSections.value.find(s => s.id === id)
}
const getTocSectionHeadline = (nb, section) => {
  const prefix = `${nb}. `
  switch (section) {
    case TOC_SECTIONS.ANALYSIS:
      return prefix + i18n.t('_shared.locationAnalysis.headline', { locationName: locationName.value })
    case TOC_SECTIONS.TREND:
      return prefix + i18n.t('_shared.locationTrend.headline')
    case TOC_SECTIONS.MARKET_REPORT:
      return prefix + i18n.t('_shared.locationMarketReport.headline', { locationName: locationName.value })
    case TOC_SECTIONS.BODENRICHTWERT:
      return prefix + i18n.t(`_shared.locationBodenrichtwert.${locationType.value}.headline`, { name: locationName.value })
    case TOC_SECTIONS.LOCATION_FAKTOREN:
      return prefix + i18n.t('_shared.locationFaktoren.headline')
    case TOC_SECTIONS.PROPERTY_VALUE:
      return prefix + i18n.t('_shared.locationPropertyValue.headline')
    case TOC_SECTIONS.PROPERTY_SELL:
      return prefix + i18n.t('_shared.locationPropertySell.headline')
    case TOC_SECTIONS.PROPERTY_BUY:
      return prefix + i18n.t('_shared.locationPropertyBuy.headline', {
        locationName: locationName.value
      })
    case TOC_SECTIONS.CALC:
      return prefix + i18n.t('_shared.locationCalc.headline')
    case TOC_SECTIONS.FAQ:
      return prefix + i18n.t('_shared.locationFAQ.headline')
  }
}
const clickCTA = () => {
  if (!route.path.includes(PATHS.PROPERTY_VALUE)) {
    nuxtApp.$gtm.push({ event: 'location.body.propertyValueCTA' })
  }
}

const showReview = enableSchemaOrg(route.path)
</script>

<template>
  <div class="location-inner-ly2">
    <InnerTemplateLy2
      :toc-sections="tocSections"
      :toc-arrow-label="$t('_shared.location.tocArrowLabel', { locationName })"
    >
      <template v-slot:head>
        <Headline
          :headline="headline"
          :sub-headline="subHeadline"
          centered
        />
        <p class="location-inner-ly2-template-head-last-updated">
          {{ lastUpdatedText }}
        </p>
        <LocationKPILy2 />
        <p class="location-inner-ly2-affiliate-paragraph">
          {{ $t('_shared.location.affiliateParagraph') }}
        </p>
        <div class="location-inner-ly2-affiliate-widget-wrapper">
          <client-only>
            <div
                v-if="affiliateAbTestType"
                class="location-inner-ly2-affiliate-widget"
            >
              <MieteAktuell v-if="affiliateAbTestType === 'mieteAktuell'" />
              <WattfoxImmo v-else-if="affiliateAbTestType === 'wattfoxImmo'" />
              <PropertyValueWidget v-else-if="affiliateAbTestType === 'propertyValueWidget'" />
              <PropertyValueWidget2
                  v-else
                  wrapper-class-name="location-inner-ly2-affiliate-widget-wrapper"
              />
            </div>
          </client-only>
        </div>
      </template>
      <template v-slot:sections>
        <div
            v-if="tocSection(TOC_SECTIONS.ANALYSIS)"
            :data-toc="TOC_SECTIONS.ANALYSIS"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.ANALYSIS).headline"
            :level="2"
          />
          <LocationAnalysis>
            <template v-slot:comparison>
              <slot name="comparison"></slot>
            </template>
          </LocationAnalysis>
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.TREND)"
            :data-toc="TOC_SECTIONS.TREND"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.TREND).headline"
            :sub-headline="$t(`_shared.locationTrend.${locationType}.subHeadline`, { name: locationName })"
            :level="2"
          />
          <LocationTrend />
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.MARKET_REPORT)"
            :data-toc="TOC_SECTIONS.MARKET_REPORT"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.MARKET_REPORT).headline"
            :level="2"
          />
          <LocationMarketReport />
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.BODENRICHTWERT)"
            :data-toc="TOC_SECTIONS.BODENRICHTWERT"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.BODENRICHTWERT).headline"
            :sub-headline="$t(`_shared.locationBodenrichtwert.${locationType}.subHeadline`, { name: locationName })"
            :level="2"
          />
          <LocationBodenrichtwert :bodenrichtwert="bodenrichtwert" />
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.LOCATION_FAKTOREN)"
            :data-toc="TOC_SECTIONS.LOCATION_FAKTOREN"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.LOCATION_FAKTOREN).headline"
            :level="2"
          />
          <CfArticle :content="locationFaktoren.article" />
        </div>
        <div
            :data-toc="TOC_SECTIONS.PROPERTY_VALUE"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.PROPERTY_VALUE).headline"
            :level="2"
          />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="$t('_shared.locationPropertyValue.text', { location: $t(`_shared.locationPropertyValue.textLocation.${locationType}`, { name: locationName }) })"></p>
          <CustomNuxtLink :to="PATHS.PROPERTY_VALUE">
            <Button
                :label="$t('_shared.locationPropertyValue.buttonLabel')"
                inline-block
                active
                @enabled-click="clickCTA"
            />
          </CustomNuxtLink>
        </div>
        <div
            :data-toc="TOC_SECTIONS.PROPERTY_SELL"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.PROPERTY_SELL).headline"
            :level="2"
          />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="$t('_shared.locationPropertySell.text', { location: $t(`_shared.locationPropertySell.textLocation.${locationType}`, { name: locationName }) })"></p>
          <CustomNuxtLink :to="PATHS.PROPERTY_SELL">
            <Button :label="$t('_shared.locationPropertySell.buttonLabel')" inline-block active />
          </CustomNuxtLink>
        </div>
        <div
            :data-toc="TOC_SECTIONS.PROPERTY_BUY"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.PROPERTY_BUY).headline"
            :level="2"
          />
          <p>{{ $t('_shared.locationPropertyBuy.text', { locationName: locationName }) }}</p>
          <LocationImmoPortals />
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.CALC)"
            :data-toc="TOC_SECTIONS.CALC"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.CALC).headline"
            :level="2"
          />
          <LocationCalc :location-name="locationName" />
          <CustomNuxtLink :to="PATHS.CALC_SEO">
            <Button :label="$t('_shared.locationCalc.buttonLabel')" inline-block active />
          </CustomNuxtLink>
        </div>
        <div
            v-if="tocSection(TOC_SECTIONS.FAQ)"
            :data-toc="TOC_SECTIONS.FAQ"
            class="inner-template-ly2-sections-item"
        >
          <Headline
            :headline="tocSection(TOC_SECTIONS.FAQ).headline"
            :level="2"
          />
          <InfoPageDropdown :items="locationFAQ.faqItems" />
        </div>
        <Reviews
            v-if="showReview && location.reviewValue && location.reviewCount"
            :count="location.reviewCount"
            :value="location.reviewValue"
        />
      </template>
    </InnerTemplateLy2>
  </div>
</template>

<style lang="scss" scoped>
.location-inner-ly2 {
  display: flex;
  flex-direction: column-reverse;

  @media #{$lg} {
    flex-direction: row;
  }

  p {
    margin-bottom: 20px;
    text-align: justify;
  }

  .location-inner-ly2-template-last-updated {
    display: none;

    @media #{$md} {
      display: inline;
    }
  }

  .location-inner-ly2-template-head-last-updated {
    text-align: center;
    font-size: 90%;
    margin: -15px 0 0;
    color: #666;

    @media #{$md} {
      margin-top: -30px;
    }
  }

  .location-inner-ly2-affiliate-paragraph {
    text-align: center;
  }

  .location-inner-ly2-affiliate-widget {
    margin: 0 -5vw;

    @media #{$lg} {
      margin: 0;
    }
  }
}
</style>
