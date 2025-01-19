<script setup>
import chartjsPluginAnnotation from 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {Bar} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, PointElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { CHART_UNITS } from '~/assets/js/constants'

ChartJS.register(Title, Tooltip, PointElement, BarElement, CategoryScale, LinearScale, chartjsPluginAnnotation, ChartDataLabels)

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const i18n = useI18n()

const formatAsCurrency = (value) => {
  return i18n.n(value, { maximumFractionDigits: 0 }) + '€'
}
const formatAsFloat = (value) => {
  return i18n.n(value, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
const formatAsCount = (value) => {
  return i18n.n(value, { maximumFractionDigits: 0 })
}
const formatAsWeek = (value, isAxis) => {
  return i18n.n(value, { maximumFractionDigits: 0 }) + (isAxis ? '' : ' Wochen')
}

const getChartData = (chartDataset, chartAverage) => {
  const values = chartDataset.map(d => d.value)
  const colors = chartDataset.map(d => d.color || '#EC7B2F')
  const labels = chartDataset.map(d => d.label)
  if (chartAverage) {
    values.push(chartAverage)
    colors.push('#d8d8d8')
    labels.push('Ø')
  }
  return {
    labels,
    datasets: [
      {
        barPercentage: 0.7,
        hoverBackgroundColor: colors,
        data: values,
        backgroundColor: colors
      }
    ]
  }
}
const getChartOptions = (chartData, chartAverage, xLabel, yLabel, unit) => {
  const valueFormatter = (value, isAxis) => {
    switch (unit) {
      case CHART_UNITS.COUNT:
        return formatAsCount(value)
      case CHART_UNITS.FLOAT:
        return formatAsFloat(value)
      case CHART_UNITS.EURO:
        return formatAsCurrency(value)
      case CHART_UNITS.WEEK:
        return formatAsWeek(value, isAxis)
    }
  }
  const annotation = chartAverage
    ? {
      annotation: {
        annotations: {
          avgLine: {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y',
            value: chartAverage,
            borderColor: '#333333',
            borderWidth: 2
          }
        }
      }
    }
    : {}

  return {
    layout: {
      padding: {
        top: 30
      }
    },
    plugins: {
      tooltip: {
        enabled: false
      },
      datalabels: {
        clamp: true,
        anchor: 'end',
        align: 'top',
        formatter (value, context) {
          return valueFormatter(value)
        }
      },
      ...annotation
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yLabel,
          color: '#6a6a6a',
          padding: 10
        },
        ticks: {
          padding: 10,
          // callback: (value, index, values) => valueFormatter(value, true)
        },
        beginAtZero: true
      },
      x: {
        title: {
          display: true,
          text: xLabel,
          color: '#6a6a6a',
          padding: 10
        },
        grid: {
          display: true
        }
      }
    }
  }
}

const chartData = ref()
const chartOptions = ref()

const { chartDataset, chartAverage, xLabel, yLabel, unit } = props.data
chartData.value = getChartData(chartDataset, chartAverage)
chartOptions.value = getChartOptions(chartData, chartAverage, xLabel, yLabel, unit)

watch(() => props.data, (newData, previousData) => {
  if (JSON.stringify(newData) === JSON.stringify(previousData)) { return }
  const { chartDataset, chartAverage, xLabel, yLabel, unit } = newData
  chartData.value = getChartData(chartDataset, chartAverage)
  chartOptions.value = getChartOptions(chartData, chartAverage, xLabel, yLabel, unit)
})
</script>

<template>
  <div class="bar-chart">
    <client-only>
      <Bar
          class="bar-chart-canvas"
          :data="chartData"
          :options="chartOptions"
      />
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.bar-chart {
  height: 400px;

  .bar-chart-canvas {
    height: 100%;
    width: calc(100% + 20px);
    margin-left: -20px;
  }
}
</style>
