<script setup>
import { offsetTop } from 'assets/js/scrollUtils'
import {useCalcStore} from "~/store/calc.js";

const calcStore = useCalcStore()
const nuxtApp = useNuxtApp()
const i18n = useI18n()

const output = computed(() => {
  return calcStore.activeOutput
})
const activePropertyCalculation = computed(() => {
  return calcStore.activePropertyCalculation
})
const activePropertyCalculationWasChanged = computed(() => {
  return calcStore.activePropertyCalculationWasChanged
})

const scrollToOutputs = () => {
  const outputsSection = document.querySelector('#calc-outputs')
  let scrollPosition = 0
  if (outputsSection) {
    scrollPosition = (offsetTop(outputsSection) - window.innerHeight / 5)
    scrollPosition = scrollPosition < 0 ? 0 : scrollPosition
  }
  window.scrollTo({
    top: scrollPosition,
    left: 0,
    behavior: scrollPosition === 0 ? undefined : 'smooth'
  })
}
const showSaveConfirmation = () => {
  nuxtApp.$toast.success(i18n.t('calc.saveConfirmation'))
}

onMounted(() => {
  scrollToOutputs()
})

watch(() => output.value, () => {
  scrollToOutputs()
})
</script>

<template>
  <div class="calc-output-wrapper">
    <div class="calc-output-head">
      <div class="calc-output-head-text">
        <p class="calc-output-head-text-title">
          {{ $t('calc.output.head.title') }}
        </p>
        <p v-if="activePropertyCalculation && !activePropertyCalculationWasChanged" class="calc-output-head-text-label">
          {{ activePropertyCalculation.label }}
        </p>
        <p v-else>
          {{ $t('calc.output.head.titleNotSaved') }}
        </p>
      </div>
      <div class="calc-output-head-buttons">
        <Button
          :label="$t('calc.output.head.saveButton')"
          no-scale-hover-effect
          active
          small
          :disabled="!activePropertyCalculationWasChanged && !!activePropertyCalculation"
          class="calc-output-head-save-button"
          @enabledClick="calcStore.openSaveInputsPopup"
          @disabledClick="showSaveConfirmation"
        />
        <Button
          :label="$t('calc.output.head.newButton')"
          no-scale-hover-effect
          active-border
          small
          @enabledClick="calcStore.startFreshCalculation"
        />
      </div>
    </div>
    <div v-if="activePropertyCalculation" class="calc-output-head-mobile">
      <div
        class="calc-output-head-mobile-saved"
        v-html="$t('calc.saveInputs.successfulMessage', { label: activePropertyCalculation.label })"
      ></div>
    </div>
    <CalcOutputKPI />
    <div class="calc-output">
      <div class="calc-output-table">
        <table>
          <tbody>
            <tr
              v-for="(row, idx1) in output.rows"
              :key="idx1"
              :class="[row.style, { lastRowOfSection: !output.rows[idx1+1] || output.rows[idx1+1].style === 'HEADLINE' }]"
            >
              <th>
                <div class="td-inner">
                  <p
                    v-if="row.operator"
                    class="calc-output-row-operator"
                  >
                    <img v-if="row.operator === '+'" src="@/assets/img/_shared/font-awesome/plus-solid.svg" />
                    <img v-else-if="row.operator === '-'" src="@/assets/img/_shared/font-awesome/minus-solid.svg" />
                    <img v-else-if="row.operator === '='" src="@/assets/img/_shared/font-awesome/equals-solid.svg" />
                    <img v-else-if="row.operator === '->'" src="@/assets/img/_shared/font-awesome/arrow-right-solid.svg" />
                  </p>
                  <p>{{ $t(`calc.output.rowLabels.${row.labelKey}`) }}</p>
                  <img
                    v-if="row.style === 'HEADLINE' && !!calcStore.fieldNotes[row.labelKey]"
                    class="calc-output-headline-info"
                    src="~/assets/img/_shared/info-icon.svg"
                    @click="calcStore.showInfoPopup({
                      title: $t(`calc.output.rowLabels.${row.labelKey}`),
                      description: calcStore.fieldNotes[row.labelKey]
                    })"
                  />
                </div>
              </th>
              <td
                v-for="(value, idx2) in (row.style === 'YEARS' ? output.columnYears : row.values)"
                :key="idx2"
              >
                <div class="td-inner">
                  <span v-if="row.style === 'YEARS'" class="calc-output-cell-value">
                    {{
                      value === 'YEAR_SUM'
                        ? $t('calc.output.yearSumLabel')
                        : value
                    }}
                  </span>
                  <span v-else-if="value !== null" class="calc-output-cell-value">
                    {{ $n(value, { maximumFractionDigits: 0 }) }} €
                  </span>
                </div>
              </td>
            </tr>
            <tr
              :key="output.rows.length + 1"
              class="hidden"
            >
              <th></th>
              <td
                v-for="(_, idx2) in output.columnYears"
                :key="idx2"
              >
                <div class="td-inner">
                  <span class="calc-output-cell-value">
                    10.000.000 €
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calc-output-wrapper {
  margin: 30px auto;
  width: 90%;

  @media #{$maxLg} {
    margin-top: 0;
  }

  .calc-output-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    @media #{$maxLg} {
      display: none;
    }

    .calc-output-head-text {
      line-height: 1.4;
      margin-right: 20px;
      margin-bottom: 10px;

      .calc-output-head-text-title {
        font-weight: 500;
      }
    }

    .calc-output-head-buttons {
      display: flex;

      .calc-output-head-save-button {
        margin-right: 15px;
      }
    }
  }

  .calc-output-head-mobile {
    text-align: center;
    font-size: 90%;
    line-height: 1.3;

    @media #{$lg} {
      display: none;
    }
  }

  .calc-output {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;

    .calc-output-table {
      overflow: auto;
      flex-grow: 1;

      table {
        margin: 0;
        border: none;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        text-align: left;
        line-height: 1.35;
        box-sizing: border-box;
        font-size: 85%;

        @media #{$lg} {
          font-size: 100%;
        }

        .calc-output-cell-value {
          white-space: nowrap;
        }

        tr {

          th {
            position: sticky;
            left: 0;
            background: white;
            z-index: 1;
            font-weight: normal;
            max-width: 160px;

            @media #{$lg} {
              max-width: 185px;
            }

            &:first-child {

              .td-inner {
                border-right: 3px solid #C4C4C4;
                min-height: 36px;
              }
            }

            .td-inner {
              border-left: 1px solid #C4C4C4;
              display: flex;

              .calc-output-row-operator {
                margin-right: 8px;

                &, img {
                  width: 7px;
                }
              }

              .calc-output-headline-info {
                margin-left: 15px;
                cursor: pointer;

                &:hover {
                  opacity: .8;
                }
              }
            }
          }

          td {
            text-align: right;
          }

          td, th {
            padding: 0;
            vertical-align: top;

            .td-inner {
              padding: 3px 8px;
            }
          }

          td, th:not(:first-child) {
            border-right: 1px solid #C4C4C4;
          }

          &.YEARS {

            th, td {
              background-color: #DBDBDB;
              font-weight: 700;

              .td-inner {
                min-height: auto;
                border-top: 1px solid #C4C4C4;
              }
            }
          }

          &.HEADLINE {

            th {
              vertical-align: center;
              border-left: none;

              .td-inner {
                white-space: nowrap;
                min-height: auto;
                font-size: 120%;
                border-right: none;
                padding-top: 30px;
                padding-bottom: 10px;
                border-left: none;
              }
            }

            & + th, & + td {

              .td-inner {
                border-top: 1px solid #C4C4C4;
              }
            }
          }

          &.VALUE_BOLD {

            th, td {
              font-weight: 700;
              background-color: #F3F3F3;
            }
          }

          &.lastRowOfSection {

            th, td {
              border-bottom: 1px solid #C4C4C4;
            }
          }

          &.hidden {
            opacity: 0;

            td {
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
