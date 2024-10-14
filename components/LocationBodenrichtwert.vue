<script setup>
import {useLocationStore} from "~/store/location.js";

const props = defineProps({
  bodenrichtwert: {
    type: Object,
    required: true
  }
})

const locationStore = useLocationStore()
const i18n = useI18n()

const button = computed(() => {
  return props.bodenrichtwert.button.fields
})
const location = computed(() => {
  return locationStore.activeLocationMainData
})
const locationName = (() => {
  return location.value.name || i18n.t('_shared.location.germanyLocationName')
})
</script>

<template>
  <div class="location-bodenrichtwert">
    <CfArticle :content="bodenrichtwert.article" :parameters="{ '{name}': locationName }" />
    <InfoPageTextButtonBox
        class="location-bodenrichtwert-button"
        :button-label="button.buttonLabel"
        :button-path="button.buttonPath"
        :text="button.text"
        :with-search-input="button.withSearchInput"
        active
    />
  </div>
</template>
