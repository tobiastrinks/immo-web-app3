<script setup>
import { PATHS } from '~/assets/js/constants'

const props = defineProps({
  text: {
    type: Object,
    default: null
  },
  htmlText: {
    type: String,
    default: null
  },
  buttonLabel: {
    type: String,
    required: true
  },
  buttonPath: {
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
  if (props.buttonPath.includes(PATHS.PROPERTY_VALUE)) {
    nuxtApp.$gtm.push({ event: 'infoPageButton.propertyValueCTA' })
  }
}
</script>

<template>
  <div class="info-page-text-button-box">
    <div class="info-page-text-button-box-text">
      <CfArticle v-if="text" :content="text" no-justify />
      <p v-else v-html="htmlText"></p>
    </div>
    <div class="info-page-text-button-box-button">
      <CustomNuxtLink :to="buttonPath">
        <Button
            :label="buttonLabel"
            inline-block
            active
            @enabled-click="sendCTAClickEventIfApplicable"
        />
      </CustomNuxtLink>
      <div v-if="withSearchInput" class="info-page-text-button-box-button-search">
        <p class="info-page-text-button-box-button-search-text">
          {{ $t('_shared.infoPage.inlineSearch.boxText') }}
        </p>
        <InlineSearchInput
            class="info-page-text-button-box-button-search-input"
            :arrow-text="$t('_shared.infoPage.inlineSearch.arrowLabel')"
            bottom-arrow
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-page-text-button-box {
  background-color: $greyMedium;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  margin: 40px 0;
  border: 1px solid $colorStroke;

  .info-page-text-button-box-text {
    width: 100%;

    @media #{$lg} {
      width: 50%;
      margin-right: 5%;
    }
  }

  .info-page-text-button-box-button {
    text-align: right;
    margin-top: 20px;

    @media #{$lg} {
      margin-top: 0;
      width: 45%;
    }

    .info-page-text-button-box-button-search {

      .info-page-text-button-box-button-search-text {
        margin: 10px 0;
      }
    }

    .info-page-text-button-box-button-search-input {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
