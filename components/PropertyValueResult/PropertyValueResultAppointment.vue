<script setup>
const features = [
  'Vor-Ort-Bewertung durch Immobilienexperten',
  'Berücksichtigung der individuellen Eigenschaften Ihrer Immobilie',
  '100% kostenlos & unverbindlich'
]
</script>

<template>
  <div class="property-value-result-appointment">
    <img src="@/assets/img/propertyValueResult/alexander-wagner.jpg" />
    <div class="property-value-result-appointment-text">
      <p class="property-value-result-appointment-name">
        Alexander Wagner
      </p>
      <p class="property-value-result-appointment-position">
        Leiter Immobilienbewertung
      </p>
    </div>
    <div class="property-value-result-appointment-features">
      <p class="property-value-result-appointment-features-title">
        Kostenlose Expertenbewertung
      </p>
      <div
        v-for="(feature, index) of features"
        :key="index"
        class="property-value-result-appointment-features-item"
      >
        <img src="~/assets/img/_shared/check-green-2.svg" />
        <p class="property-value-result-appointment-features-item-text">
          {{ feature }}
        </p>
      </div>
      <Button
        class="property-value-result-appointment-features-button"
        label="Jetzt Rückruf vereinbaren"
        active
        small
        no-scale-hover-effect
        @click="$emit('open-popup')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.property-value-result-appointment {
  padding: 20px;
  border: 1px solid $colorStroke;
  align-items: center;
  text-align: center;
  flex-direction: column;
  display: flex;

  img {
    display: block;
    width: 80px;
    border-radius: 100%;
  }

  .property-value-result-appointment-text {
    margin: 15px 0;

    .property-value-result-appointment-name {
      font-weight: 400;
    }
  }

  .property-value-result-appointment-features {
    text-align: left;
    padding: 20px;
    background-color: $colorLightGreyBg;

    .property-value-result-appointment-features-title {
      font-weight: 400;
      font-size: 90%;
      margin-bottom: 10px;
    }

    .property-value-result-appointment-features-item {
      font-size: 80%;
      display: flex;
      align-items: flex-start;
      margin: 7px 0;

      img {
        margin-top: 3px;
        width: 13px;
        margin-right: 5px;
        flex-shrink: 0;
      }
    }

    .property-value-result-appointment-features-button {
      margin-top: 15px;
    }
  }
}
</style>
