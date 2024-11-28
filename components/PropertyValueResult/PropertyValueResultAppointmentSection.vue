<script setup lang="ts">
const emit = defineEmits(['select-timeframe'])
const submitted = ref(false)

const props = defineProps({
  isInterested: {
    type: Boolean,
    default: false
  }
})

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
  <PropertyValueResultBox title="Kostenlose Expertenbewertung">
    <template v-if="!submitted">
      <p v-if="props.isInterested" class="property-value-result-appointment-section-text">
        Ihre Anfrage wird von unserem Team bearbeitet.
      </p>
      <p v-else class="property-value-result-appointment-section-text">
        Haben Sie Interesse an einer kostenlosen Expertenbewertung? Jetzt Rückruf vereinbaren.
      </p>
      <p class="property-value-result-appointment-section-question">
        Wann können wir Sie telefonisch am besten erreichen, um fehlende Angaben zu Ihrer Immobilie zu klären?
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
      <div class="property-value-result-appointment-section-box">
        <img
            class="property-value-result-appointment-section-box-img"
            src="/img/affiliate/property-value.png"
        />
        <div class="property-value-result-appointment-section-box-features">
          <p class="property-value-result-appointment-section-box-features-headline">
            Kostenlose Expertenbewertung
          </p>
          <div
              v-for="(feature, index) of features"
              :key="index"
              class="property-value-result-appointment-section-box-features-item"
          >
            <img src="~/assets/img/_shared/check-green-2.svg" />
            <p class="property-value-result-appointment-section-box-features-item-text">
              {{ feature }}
            </p>
          </div>
        </div>
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

.property-value-result-appointment-section-box {
  padding: 20px;
  background-color: #fff;
  border: 1px solid $colorStroke;
  margin-top: 10px;

  @media #{$md} {
    display: flex;
    align-items: flex-start;
  }

  .property-value-result-appointment-section-box-img {
    width: 180px;
    border: 1px solid $colorStroke;
    margin-bottom: 10px;
    flex-shrink: 0;

    @media #{$md} {
      margin-right: 20px;
      margin-bottom: 0;
    }
  }

  .property-value-result-appointment-section-box-features {
    text-align: left;

    .property-value-result-appointment-section-box-features-headline {
      font-weight: 400;
      margin-bottom: 10px;
    }

    .property-value-result-appointment-section-box-features-item {
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

.property-value-result-appointment-section-time-headline {
  font-weight: 400;
  margin: 20px 0;
}
</style>
