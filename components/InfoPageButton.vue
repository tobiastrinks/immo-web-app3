<script setup>
import {PATHS} from "assets/js/constants.js";

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  withSearchInput: {
    type: Boolean,
    default: false
  }
})

const nuxtApp = useNuxtApp()

const sendCTAClickEventIfApplicable = () => {
  if (props.path.includes(PATHS.PROPERTY_VALUE)) {
    nuxtApp.$gtm.push({ event: 'infoPageButton.propertyValueCTA' })
  }
}
</script>

<template>
  <div class="info-page-button">
    <CustomNuxtLink :to="props.path">
      <Button
          :label="props.label"
          inline-block
          active
          @enabledClick="sendCTAClickEventIfApplicable"
      />
    </CustomNuxtLink>
    <div v-if="props.withSearchInput" class="info-page-button-search">
      <p class="info-page-button-search-text">
        {{ $t('_shared.infoPage.inlineSearch.text') }}
      </p>
      <InlineSearchInput :arrow-text="$t('_shared.infoPage.inlineSearch.arrowLabel')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-page-button {
  margin-bottom: 40px;

  .info-page-button-search {
    margin: 30px 0 70px;

    .info-page-button-search-text {
      margin-bottom: 15px;
      text-align: justify;
    }
  }
}
</style>
