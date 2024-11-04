<script setup>
import {useCalcStore} from "~/store/calc.js";

const calcStore = useCalcStore()
const i18n = useI18n()

const output = (() => {
  return calcStore.activeOutput
})
const kpis = computed(() => {
  return output.value?.kpis
})

const getFormattedValue = (kpi) => {
  const { value, valueFormat } = kpi
  if (valueFormat === 'PERCENTAGE') {
    return `${i18n.n(value * 100, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`
  } else {
    return `${i18n.n(value, { maximumFractionDigits: 0 })} €`
  }
}
const getKpiValueClasses = (kpi) => {
  const classes = []
  if (kpi.labelKey === 'irr') {
    classes.push({
      isIrr: true,
      lowIrr: kpi.value <= 0.01,
      mediumIrr: kpi.value > 0.01 && kpi.value < 0.08,
      highIrr: kpi.value >= 0.08
    })
  }
  return classes
}
</script>

<template>
  <div class="calc-output-kpi">
    <p class="calc-output-kpi-headline">
      {{ $t('calc.output.kpiHeadline') }}
    </p>
    <table>
      <tbody>
        <tr
          v-for="(kpi, index) in kpis"
          :key="index"
        >
          <th
            :colspan="kpi.valueFormat === 'HEADLINE' ? 2 : 1"
            :class="kpi.valueFormat"
          >
            {{ $t(`calc.output.kpiLabels.${kpi.labelKey}`) }}
          </th>
          <td
            v-if="kpi.valueFormat !== 'HEADLINE'"
            :class="getKpiValueClasses(kpi)"
          >
            {{ getFormattedValue(kpi) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.calc-output-kpi {
  margin: 10px 0 10px;

  @media #{$maxLg} {
    margin-top: 40px;
  }

  .calc-output-kpi-headline {
    font-size: 125%;
    margin-bottom: 5px;
    font-weight: 400;
  }

  table {
    width: 100%;
    max-width: 650px;
    border-collapse: collapse;
    line-height: 1.35;
    font-size: 85%;

    @media #{$lg} {
      font-size: 100%;
    }

    tr {

      th {
        font-weight: 500;
        text-align: left;
        background-color: #F2F2F2;

        @media #{$xl} {
          width: 50%;
        }

        &.HEADLINE {
          text-align: center;
          background-color: inherit;
          padding-top: 15px;
        }
      }

      th, td {
        border: 1px solid #C4C4C4;
        padding: 3px 8px;
      }

      td {
        text-align: right;

        &.isIrr {
          font-weight: 500;
          text-decoration: underline;

          &.lowIrr {
            background-color: rgba(#D57769, .5);
          }

          &.mediumIrr {
            background-color: rgba(#F8D35C, .5);
          }

          &.highIrr {
            background-color: rgba(#61B07E, .5);
          }
        }
      }
    }
  }
}
</style>
