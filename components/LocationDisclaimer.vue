<template>
  <div class="location-disclaimer">
    <div class="location-disclaimer-inner">
      <p class="location-disclaimer-headline">
        {{ $t('_shared.locationDisclaimer.headline') }}
      </p>
      <p class="location-disclaimer-text">
        {{ $t('_shared.locationDisclaimer.text') }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-disclaimer {
  background-color: $greyMedium;
  margin-top: 100px;
  padding: 30px 0;
  font-size: 86%;

  .location-disclaimer-inner {
    max-width: 900px;
    width: 90%;
    margin: 0 auto;

    .location-disclaimer-headline {
      font-weight: 500;
      margin-bottom: 20px;
    }

    .location-disclaimer-text {
      text-align: justify;
    }
  }
}
</style>
