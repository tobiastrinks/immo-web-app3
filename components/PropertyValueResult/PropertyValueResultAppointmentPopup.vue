<script setup>
const emit = defineEmits(['select-timeframe', 'close'])
const submitted = ref(false)

const timeframes = [
  '9-11 Uhr',
  '11-13 Uhr',
  '13-16 Uhr',
  '16-19 Uhr'
]
const features = [
  'Bewertung durch Immobilienexperten',
  'Berücksichtigung der individuellen Eigenschaften Ihrer Immobilie',
  '100% kostenlos & unverbindlich'
]

const selectTimeframe = (timeframe) => {
  emit('select-timeframe', timeframe)
  submitted.value = true
}
</script>

<template>
  <Popup
    title="Kostenlose Expertenbewertung"
    hide-icon
    small-margin-top
    @close="() => emit('close')"
  >
    <div class="property-value-result-appointment-popup">
      <img src="@/assets/img/propertyValueResult/alexander-wagner.jpg" />
      <div class="property-value-result-appointment-popup-text">
        <p class="property-value-result-appointment-popup-name">
          Alexander Wagner
        </p>
        <p class="property-value-result-appointment-popup-position">
          Leiter Immobilienbewertung
        </p>
      </div>
      <template v-if="!submitted">
        <p class="property-value-result-appointment-popup-time-headline">
          Wann können wir Sie telefonisch am besten erreichen, um fehlende Angaben zu Ihrer Immobilie zu erfragen?
        </p>
        <div class="property-value-result-appointment-popup-time-buttons">
          <Button
            v-for="(timeframe, index) in timeframes"
            :key="index"
            class="property-value-result-appointment-popup-time-buttons-button"
            :label="timeframe"
            active
            small
            inline-block
            no-scale-hover-effect
            @click="() => selectTimeframe(timeframe)"
          />
        </div>
        <div class="property-value-result-appointment-popup-features">
          <div
            v-for="(feature, index) of features"
            :key="index"
            class="property-value-result-appointment-popup-features-item"
          >
            <img src="~/assets/img/_shared/check-green-2.svg" />
            <p class="property-value-result-appointment-popup-features-item-text">
              {{ feature }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="property-value-result-appointment-popup-time-headline">
          Vielen Dank für Ihre Anfrage!
        </p>
        <p class="property-value-result-appointment-popup-time-sub-headline">
          Wir melden uns bei Ihnen zur ausgewählten Zeit!
        </p>
        <Button
          label="Schließen"
          active-border
          @click="() => emit('close')"
        />
      </template>
    </div>
  </Popup>
</template>

<style scoped lang="scss">
.property-value-result-appointment-popup {
  width: 100%;
  align-items: center;
  text-align: center;
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  padding: 10px;

  img {
    display: block;
    width: 80px;
    border-radius: 100%;
  }

  .property-value-result-appointment-popup-text {
    margin: 15px 0;

    .property-value-result-appointment-popup-name {
      font-weight: 400;
    }
  }

  .property-value-result-appointment-popup-time-headline {
    font-size: 110%;
    font-weight: 500;
    margin: 10px 0;
  }

  .property-value-result-appointment-popup-time-sub-headline {
    margin-bottom: 20px;
  }

  .property-value-result-appointment-popup-time-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin: 0 auto;

    .property-value-result-appointment-popup-time-buttons-button {
      margin: 5px 1%;
      width: 48%;
      box-sizing: border-box;
    }
  }

  .property-value-result-appointment-popup-features {
    text-align: left;
    margin-top: 20px;

    .property-value-result-appointment-popup-features-item {
      display: flex;
      align-items: flex-start;
      margin: 5px 0;

      img {
        margin-top: 3px;
        width: 18px;
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
