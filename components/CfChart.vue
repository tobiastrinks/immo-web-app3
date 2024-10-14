<template>
  <div class="cf-chart">
    <LineChart
      :labels="labels"
      :data-sets="dataSets"
      :x-label="data.xLabel"
      :y-label="data.yLabel"
      :y-label-secondary="data.yLabelSecondary"
    />
    <div
      v-if="footerNote"
      class="cf-chart-footer-note"
      v-html="footerNote"
    ></div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    labels () {
      return this.data.xValues.split(',')
    },
    dataSets () {
      return this.data.chartDatasets
        .map(dataset => ({
          values: dataset.yValues.split(',').map(v => parseFloat(v)),
          legendLabel: dataset.label,
          lineColor: dataset.color,
          yAxisID: dataset.secondaryAxis ? 'secondary' : 'primary'
        }))
    },
    footerNote () {
      return documentToHtmlString(this.data.footerNote2)
    }
  }
}
</script>

<style scoped lang="scss">
.cf-chart {
  margin: 20px 0 50px 0;

  .cf-chart-footer-note {
    font-size: 86%;

    strong {
      font-weight: 400;
    }
  }
}
</style>
