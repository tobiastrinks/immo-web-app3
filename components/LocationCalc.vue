<script setup>
const props = defineProps({
  locationName: {
    type: String,
    required: true
  }
})
const i18n = useI18n()
const text = computed(() => {
  return i18n.t('_shared.locationCalc.text', { locationName: props.locationName })
})
</script>

<template>
  <div class="location-calc">
    <div v-html="text"></div>
    <div class="location-calc-features">
      <p
          v-for="(feature, index) in $t('calcSEO.teaser.features')"
          :key="index"
          class="location-calc-feature"
      >
        <span class="location-calc-feature-check">✓</span>
        <span>{{ feature }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-calc {

  .location-calc-features {
    margin: 15px 0;

    .location-calc-feature {
      font-weight: 500;

      .location-calc-feature-check {
        color: $colorPrimary;
      }
    }
  }
}
</style>
