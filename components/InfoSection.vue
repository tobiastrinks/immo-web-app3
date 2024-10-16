<script setup>
import InfoPageTable from "~/components/InfoPageTable.vue";
import {CF_CONTENT_TYPES} from "assets/js/constants.js";

const props = defineProps({
  infoSection: {
    type: Object,
    required: true
  },
  headline: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div>
    <Headline :headline="props.headline || props.infoSection.headline" :level="2" />
    <div
      v-for="(item, index2) in props.infoSection.items"
      :key="index2"
    >
      <CfArticle
        v-if="item.cfContentType === CF_CONTENT_TYPES.INFO_ARTICLE"
        :content="item.text"
      />
      <InfoPageTable
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_TABLE"
        :id="item.id"
      />
      <InfoPageDropdown
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_DROPDOWN"
        :items="item.items"
      />
      <InfoPageHighlight
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_HIGHLIGHT"
        :type="item.type"
        :headline="item.headline"
        :text="item.text"
      />
      <CfChart
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.CHART"
        :data="item"
      />
      <InfoPageButton
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_BUTTON"
        :label="item.label"
        :path="item.path"
        :with-search-input="item.withSearchInput"
      />
      <InfoPageTextButtonBox
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_TEXT_BUTTON_BOX"
        :text="item.text"
        :button-label="item.buttonLabel"
        :button-path="item.buttonPath"
        :with-search-input="item.withSearchInput"
      />
      <InfoPageVideo
        v-else-if="item.cfContentType === CF_CONTENT_TYPES.INFO_VIDEO"
        :video-id="item.videoId"
        :arrow-label="item.arrowLabel"
        :description="item.description2"
      />
    </div>
  </div>
</template>
