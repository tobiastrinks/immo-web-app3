<script setup lang="ts">
const emit = defineEmits(['select-timeframe'])
const submitted = ref(false)

const timeframes = [
  '9-11 Uhr',
  '11-13 Uhr',
  '13-16 Uhr',
  '16-19 Uhr'
]

const selectTimeframe = (timeframe) => {
  emit('select-timeframe', timeframe)
  submitted.value = true
}
</script>

<template>
  <PropertyValueResultBox
      id="property-value-result-appointment-section-incomplete"
      title="Berechnung unvollständig"
      highlighted
  >
    <template v-if="!submitted">
      <p class="property-value-result-appointment-section-text">
        Leider konnten wir den Wert Ihrer Immobilie nicht vollständig berechnen. Ihre Berechnung wird daher von unserem Bewertungsteam manuell geprüft. Wir werden Ihnen zeitnah eine kostenlose Bewertung zukommen lassen.
      </p>
      <p class="property-value-result-appointment-section-question">
        Bei Rückfragen, wann können wir Sie telefonisch am besten erreichen?
      </p>
      <div class="property-value-result-appointment-section-time-buttons">
        <Button
            v-for="(timeframe, index) in timeframes"
            :key="index"
            class="property-value-result-appointment-section-time-buttons-button"
            :label="timeframe"
            active
            small
            inline-block
            no-scale-hover-effect
            @click="() => selectTimeframe(timeframe)"
        />
      </div>
    </template>
    <template v-else>
      <p class="property-value-result-appointment-section-time-headline">
        Vielen Dank für Ihre Anfrage!
      </p>
      <p class="property-value-result-appointment-section-time-sub-headline">
        Wir melden uns bei Ihnen zur ausgewählten Zeit!
      </p>
    </template>
  </PropertyValueResultBox>
</template>

<style scoped lang="scss">
.property-value-result-appointment-section-text {
  margin-bottom: 10px;
}

.property-value-result-appointment-section-question {
  font-weight: 400;
  margin-bottom: 10px;
}

.property-value-result-appointment-section-time-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1%;

  .property-value-result-appointment-section-time-buttons-button {
    margin: 5px 1%;
    width: 48%;
    box-sizing: border-box;
  }
}

.property-value-result-appointment-section-time-headline {
  font-weight: 400;
  margin: 20px 0;
}
</style>
