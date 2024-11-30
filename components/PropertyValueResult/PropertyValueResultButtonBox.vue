<script setup>
const props = defineProps({
  result: {
    type: Object,
    required: true
  }
})

const extraValue = computed(() => {
  return props.result.pricePerSqmEstimate * props.result.request.plotArea * 0.13
})
</script>

<template>
  <div class="property-value-result-button-box">
    <p class="property-value-result-button-box-green">
      + {{ $n(extraValue, { maximumFractionDigits: 0 }) }} € mehr erzielen
    </p>
    <TextArticle
      :paragraphs="[
        'Laut einer Studie* verkaufen <b>Immobilienmakler</b> Objekte durchschnittlich zu einem <b>13% höheren Verkaufspreis</b> als Privatverkäufer.'
      ]"
      use-raw-html
      small-margin
    />
    <div class="property-value-result-button-box-button">
      <Button
        label="Jetzt Maklerempfehlung erhalten"
        small
        active
        inline-block
        @click="$emit('button-click')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.property-value-result-button-box {
  background-color: $colorLightGreyBg;
  padding: 20px;
  border: 1px solid $colorStroke;

  .property-value-result-button-box-green {
    font-family: $fontHeadline;
    color: #5ABA0E;
    font-weight: 700;
    font-size: 140%;
  }

  .property-value-result-button-box-button {
    margin-top: 20px;
  }
}
</style>
