<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

// see https://www.chartjs.org/docs/latest/getting-started/integration.html to check required imports
ChartJS.register(Title, Tooltip, PointElement, LineElement, CategoryScale, LinearScale)

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  dataSets: {
    type: Array,
    required: true
  },
  xLabel: {
    type: String,
    required: true
  },
  yLabel: {
    type: String,
    required: true
  },
  yLabelSecondary: {
    type: String,
    default: null
  },
  hideLegend: {
    type: Boolean,
    default: false
  }
})

const datasets = props.dataSets.map(({ values, legendLabel, lineColor, yAxisID }) => ({
  data: values,
  label: legendLabel,
  fill: false,
  backgroundColor: lineColor,
  cubicInterpolationMode: 'monotone',
  borderColor: lineColor,
  yAxisID: yAxisID == null || yAxisID === 'primary'
      ? 'y'
      : yAxisID
}))

const data = {
  labels: props.labels,
  datasets: datasets
}

const scaleYSecondaryOptions = props.yLabelSecondary
    ? {
      secondary: {
        title: {
          display: true,
          text: props.yLabelSecondary,
          color: '#6a6a6a',
          padding: 10
        },
        grid: {
          display: false
        },
        ticks: {
          padding: 10
        },
        beginAtZero: true,
        position: 'right'
      }
    }
    : {}

const options = {
  legend: {
    align: 'start',
    padding: 10,
    labels: {
      padding: 20,
      boxWidth: 15
    },
    display: !props.hideLegend
  },
  scales: {
    y: {
      title: {
        display: true,
        text: props.yLabel,
        color: '#6a6a6a',
        padding: 10
      },
      ticks: {
        padding: 10
      },
      beginAtZero: true
    },
    ...scaleYSecondaryOptions,
    x: {
      title: {
        display: true,
        text: props.xLabel,
        color: '#6a6a6a',
        padding: 15
      }
    }
  },
  tooltips: {
    xPadding: 10,
    yPadding: 10,
    titleMarginBottom: 10,
    bodySpacing: 10
  },
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    }
  }
}
</script>

<template>
  <div class="line-chart">
    <client-only>
      <Line
          class="line-chart-canvas"
          :data="data"
          :options="options"
      />
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.line-chart {
  height: 400px;

  .line-chart-canvas {
    height: 100%;
    width: calc(100% + 20px);
    margin-left: -20px;
  }
}
</style>
