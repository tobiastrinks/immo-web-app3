<script setup>
import { offsetTop } from 'assets/js/scrollUtils'
import { CALC_CONFIG } from './config'
import {useCalcStore} from "~/store/calc.js";
import useCalc from "~/composables/useCalc.js";

const calcStore = useCalcStore()
const nuxtApp = useNuxtApp()
const calc = useCalc()
const i18n = useI18n()

const outputsVisible = computed(() => {
  return !!calcStore.activeOutput
})

const sections = computed(() => {
  return outputsVisible.value
      ? CALC_CONFIG.sections
      : CALC_CONFIG.sections.slice(1)
})

const initialIndex = computed(() => {
  return outputsVisible.value
      ? 0
      : 1
})

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

const calculateButtonLabel = computed(() => {
  return outputsVisible.value
      ? i18n.t('calc.recalculateButtonLabel')
      : i18n.t('calc.calculateButtonLabel')
})

const disabledSubmitClick = () => {
  calcStore.setShowErrorsGlobally()
  const firstErrorItem = document.querySelector('[data-calc-error]')
  if (firstErrorItem) {
    window.scrollTo({
      top: offsetTop(firstErrorItem) - window.innerHeight * 0.3,
      left: 0,
      behavior: 'smooth'
    })
    nuxtApp.$toast.error(firstErrorItem.getAttribute('data-calc-error'))
  }
}
</script>

<template>
  <div class="calc" :class="{ outputsVisible }">
    <Headline
      v-if="!outputsVisible && !calcStore.freshCalculationCancelPropertyCalculation"
      :headline="$t('calc.headline')"
      :sub-headline="$t('calc.subHeadline')"
      centered
    />
    <transition name="scale-fade">
      <Popup
        v-if="infoPopup"
        :title="infoPopup.title"
        :description="infoPopup.description"
        @close="calcStore.hideInfoPopup()"
      />
    </transition>
    <div class="calc-inner">
      <div class="calc-inputs">
        <div class="calc-inputs-fresh-cancel">
          <Button
            v-if="!!calcStore.freshCalculationCancelPropertyCalculation"
            :label="$t('calc.cancelFreshCalculationButton')"
            small
            inline-block
            no-scale-hover-effect
            class="calc-inputs-fresh-cancel-button"
            @enabledClick="calcStore.cancelFreshCalculation()"
          />
        </div>
        <div class="calc-inputs-inner">
          <CalcSection
            v-for="(section, idx) in sections"
            :key="idx"
            :title="section.title"
            :position="idx + initialIndex"
          >
            <CalcSubSection
              v-for="(subSection, idx2) in section.subsections"
              :key="idx2"
              :title="subSection.title"
              :layout="subSection.layout"
            >
              <CalcItem
                v-for="(item, idx3) in subSection.items"
                :key="idx3"
                :item="item"
                toggle-errors
              />
            </CalcSubSection>
          </CalcSection>
          <div
            class="calc-submit"
            :class="{
              outputsVisible,
              activePropertyCalculation: calcStore.activePropertyCalculation
            }"
          >
            <Button
              :label="calculateButtonLabel"
              :pending="calcStore.calculationPending"
              active
              :disabled="calcStore.errorItems.length > 0"
              class="calc-submit-button"
              no-scale-hover-effect
              @enabledClick="calcStore.submitTransient(calc)"
              @disabledClick="disabledSubmitClick"
            />
<!--            <CalcSaveInputs-->
<!--              @disabledSubmitClick="disabledSubmitClick"-->
<!--            />-->
          </div>
        </div>
      </div>
      <div id="calc-outputs" class="calc-outputs">
<!--        <CalcOutput v-if="outputsVisible" />-->
        <InvestmentDisclaimer />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calc {

  .calc-submit {
    width: 90%;
    margin: 10px auto;

    @media #{$maxLg} {
      display: flex;
      justify-content: space-between;

      .calc-submit-button {
        box-sizing: border-box;
        width: 48%;
      }
    }

    .calc-submit-button {
      margin-bottom: 10px;
    }
  }

  &:not(.outputsVisible) {
    margin-top: 80px;

    @media #{$maxLg} {
      margin-bottom: 20px;
    }

    .calc-inner {

      .calc-inputs {
        margin: 0 auto;
        max-width: 600px;
        padding-bottom: 60px;

        .calc-inputs-fresh-cancel {
          margin: 0 auto 20px;
          text-align: center;
        }
      }
    }
  }

  &.outputsVisible {

    @media #{$maxLg} {

      .calc-submit {

        &.activePropertyCalculation {
          position: sticky;
          z-index: 9;
          bottom: 0;
          padding-bottom: 20px;
        }
      }
    }

    @media #{$lg} {
      margin-top: 46px;

      .calc-inner {
        display: flex;

        .calc-inputs {
          position: sticky;
          z-index: 9;
          top: 46px;
          width: 30%;
          min-width: 360px;
          flex-shrink: 0;
          height: calc(100vh - 46px);
          overflow-y: auto;
          border-right: 3px solid #C4C4C4;

          .calc-inputs-inner {
            padding-bottom: 40px;

            .calc-submit {
              position: sticky;
              z-index: 9;
              bottom: 0;
              padding: 15px 0;
            }
          }
        }

        .calc-outputs {
          width: 70%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
