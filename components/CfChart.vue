<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const labels = computed(() => {
  return props.data.xValues.split(',')
})

const dataSets = computed(() => {
  return props.data.chartDatasets
      .map(dataset => ({
        values: dataset.yValues.split(',').map(v => parseFloat(v)),
        legendLabel: dataset.label,
        lineColor: dataset.color,
        yAxisID: dataset.secondaryAxis ? 'secondary' : 'primary'
      }))
})

const footerNote = computed(() => {
  return documentToHtmlString(props.data.footerNote2)
})

const cfChartMounted = ref(false)
onMounted(() => {
  window.setTimeout(() => {
    cfChartMounted.value = true
  }, 10000)
})
</script>

<template>
  <div class="cf-chart">
    <client-only>
      <LazyLineChart
        v-if="cfChartMounted"
        :labels="labels"
        :data-sets="dataSets"
        :x-label="props.data.xLabel"
        :y-label="props.data.yLabel"
        :y-label-secondary="props.data.yLabelSecondary"
      />
    </client-only>
    <div
      v-if="footerNote"
      class="cf-chart-footer-note"
      v-html="footerNote"
    ></div>
  </div>
</template>

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
