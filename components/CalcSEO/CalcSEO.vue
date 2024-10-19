<script setup>
import {useCalcStore} from "~/store/calc.js";
import {PATHS} from "assets/js/constants.js";
import {useCfStore} from "~/store/cf.js";

const calcStore = useCalcStore()
const cfStore = useCfStore()
const i18n = useI18n()
const router = useRouter()

const cfData = computed(() => {
  return cfStore.calcSeoPage
})

const startNewCalculation = () => {
  calcStore.startFreshCalculation({ noCancel: true, noInputReset: true })
  router.push(PATHS.CALC)
}
const loadSavedCalculation = () => {
  router.push({
    path: PATHS.CALC,
    query: { loadsaved: 1 }
  })
}

const tocSections = computed(() => {
  return cfData.value.infoSections
      .map(({ id, headline }, index) => ({ id, headline: `${index + 1}. ${headline}` }))
})
const getTocSection = (id) => {
  return tocSections.value.find(s => s.id === id)
}


const infoPopup = computed(() => {
  const { infoPopupTitle, infoPopupDescription } = calcStore
  if (infoPopupTitle && infoPopupDescription) {
    return {
      title: infoPopupTitle,
      description: infoPopupDescription
    }
  } else {
    return null
  }
})

const featureBarItems = computed(() => {
  return i18n.t('calcSEO.featureBar').map(i => (
      {
        iconSrc: `/img/calcSEO/${i.icon}`,
        title: i.textHeadline,
        description: i.textDescription
      }
  ))
})

</script>

<template>
  <div class="calc-seo">
    <div class="inner">
      <Headline
        :headline="cfData.headline"
        :sub-headline="cfData.subHeadline"
        centered
        only-use-paragraphs
      />
      <div class="calc-seo-teaser">
        <div class="calc-seo-teaser-form-wrapper">
          <p class="calc-seo-teaser-form-description">
            {{ $t('calcSEO.teaser.description') }}
          </p>
          <p
            v-for="(feature, index) in $t('calcSEO.teaser.features')"
            :key="index"
            class="calc-seo-teaser-form-feature"
          >
            <span class="calc-seo-teaser-form-feature-check">✓</span>
            <span>{{ feature }}</span>
          </p>
<!--          <div class="calc-seo-teaser-form-inputs">-->
<!--            <InputSt-->
<!--              type="FLOAT"-->
<!--              unit="€"-->
<!--              :placeholder="$t('calcSEO.teaser.inputs.kaufpreisLabel')"-->
<!--              :value="$store.state.calc.kaufpreis"-->
<!--              mutation="calc/SET_INPUT"-->
<!--              mutation-key="kaufpreis"-->
<!--            />-->
<!--            <InputSt-->
<!--              type="FLOAT"-->
<!--              unit="€"-->
<!--              :placeholder="$t('calcSEO.teaser.inputs.mieteinnahmenPaLabel')"-->
<!--              :value="$store.state.calc.mieteinnahmenPa"-->
<!--              mutation="calc/SET_INPUT"-->
<!--              mutation-key="mieteinnahmenPa"-->
<!--            />-->
<!--            <InputSt-->
<!--              type="FLOAT"-->
<!--              unit="€"-->
<!--              :placeholder="$t('calcSEO.teaser.inputs.eigenkapitalLabel')"-->
<!--              :value="$store.state.calc.eigenkapital"-->
<!--              mutation="calc/SET_INPUT"-->
<!--              mutation-key="eigenkapital"-->
<!--            />-->
<!--          </div>-->
          <div class="calc-seo-teaser-form-buttons">
            <Button
              active
              :label="$t('calcSEO.teaser.newButton')"
              no-scale-hover-effect
              inline-block
              class="calc-seo-teaser-form-buttons-first"
              @click="startNewCalculation"
            />
            <Button
              v-if="calcStore.propertyCalculations.length"
              :label="$t('calcSEO.teaser.savedButton')"
              no-scale-hover-effect
              inline-block
              @click="loadSavedCalculation"
            />
          </div>
        </div>
        <div class="calc-seo-teaser-img-wrapper">
          <p class="calc-seo-teaser-img-label">
            {{ $t('calcSEO.teaser.screenshotLabel') }}
          </p>
          <nuxt-img src="/img/calcSEO/example.png" format="webp" />
        </div>
      </div>
    </div>
<!--    <transition name="scale-fade">-->
<!--      <Popup-->
<!--        v-if="infoPopup"-->
<!--        :title="infoPopup.title"-->
<!--        :description="infoPopup.description"-->
<!--        @close="$store.commit('calc/HIDE_INFO_POPUP')"-->
<!--      />-->
<!--    </transition>-->
<!--    <FeatureBar :items="featureBarItems" />-->
<!--    <div class="inner">-->
<!--      <InnerTemplate-->
<!--        :headline="cfData.headline"-->
<!--        :sub-headline="cfData.subHeadline"-->
<!--        :toc-sections="tocSections"-->
<!--        :toc-arrow-label="$t('_shared.infoPage.tocArrowLabel')"-->
<!--        :toc-arrow-x-offset="200"-->
<!--      >-->
<!--        <template slot="head">-->
<!--          <CfArticle :content="cfData.introText" />-->
<!--          <InfoPageHighlight-->
<!--            v-if="!!cfData.introHighlight"-->
<!--            :type="cfData.introHighlight.type"-->
<!--            :text="cfData.introHighlight.text"-->
<!--          />-->
<!--        </template>-->
<!--        <template slot="sections">-->
<!--          <div-->
<!--            v-for="(infoSection, index) in cfData.infoSections"-->
<!--            :key="index"-->
<!--            :data-toc="infoSection.id"-->
<!--          >-->
<!--            <InfoSection-->
<!--              :info-section="infoSection"-->
<!--              :headline="getTocSection(infoSection.id).headline"-->
<!--            />-->
<!--          </div>-->
<!--        </template>-->
<!--      </InnerTemplate>-->
<!--      <InvestmentDisclaimer />-->
<!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.calc-seo {

  .calc-seo-teaser {

    @media #{$maxLg} {
      max-width: 500px;
      margin: 0 auto;
    }

    @media #{$lg} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .calc-seo-teaser-form-wrapper {

      @media #{$lg} {
        width: 40%;
      }

      .calc-seo-teaser-form-description {
        margin-bottom: 10px;
      }

      .calc-seo-teaser-form-feature {
        font-weight: 500;

        .calc-seo-teaser-form-feature-check {
          color: $colorPrimary;
        }
      }

      .calc-seo-teaser-form-inputs {
        margin: 20px 0;
      }

      .calc-seo-teaser-form-buttons {
        text-align: center;

        .calc-seo-teaser-form-buttons-first {
          margin-bottom: 10px;
        }
      }
    }

    .calc-seo-teaser-img-wrapper {

      @media #{$maxLg} {
        margin-top: 20px;
      }

      @media #{$lg} {
        width: 50%;
      }

      img {
        width: 100%;
      }

      .calc-seo-teaser-img-label {
        font-size: 90%;
        color: #8E8E8E;
      }
    }
  }
}
</style>
