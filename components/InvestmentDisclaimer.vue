<template>
  <div class="investment-disclaimer">
    <div class="inner">
      <div v-html="$t('_shared.investmentDisclaimer.text')"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.investment-disclaimer {
  background-color: $greyMedium;
  padding: 40px 0;
  text-align: center;
}
</style>
