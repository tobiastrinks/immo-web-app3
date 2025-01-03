<script setup>
import {useSSRImprovements} from "assets/js/featureFlagUtils.js";
import {useRoute as useNativeRoute} from "#vue-router";

const props = defineProps({
  cfData: {
    type: Object,
    required: true
  }
})

const route = useNativeRoute()
const abTest = useAbTest()
const affiliateAbTestType = abTest.getSessionFeature('affiliateWidgets')

const tocSections = computed(() => {
  return props.cfData.infoSections
      .map(({ id, headline }, index) => ({ id, headline: `${index + 1}. ${headline}` }))
})

const hasAffiliate = computed(() => {
  return !!affiliateAbTestType && !!props.cfData.affiliateType
})

const getTocSection = (id) => {
  return tocSections.value.find(s => s.id === id)
}

const enableSSRImprovements = useSSRImprovements(route.path)
</script>

<template>
  <div class="page-location-nav-active" :class="{ 'margin-top': !hasAffiliate }">
    <template v-if="hasAffiliate">
      <template v-if="!enableSSRImprovements">
        <client-only>
          <InfoPageAffiliate :type="affiliateAbTestType"/>
        </client-only>
      </template>
      <InfoPageAffiliate v-else :type="affiliateAbTestType"/>
    </template>
    <div class="inner">
      <InnerTemplateLy2
          :headline="props.cfData.headline"
          :sub-headline="props.cfData.subHeadline"
          :toc-sections="tocSections"
          :toc-arrow-label="$t('_shared.infoPage.tocArrowLabel')"
          :toc-arrow-x-offset="200"
      >
        <template v-slot:head>
          <CfArticle :content="props.cfData.introText" />
          <InfoPageHighlight
              v-if="!!props.cfData.introHighlight"
              :type="props.cfData.introHighlight.type"
              :text="props.cfData.introHighlight.text"
          />
        </template>
        <template v-slot:sections>
          <div
              v-for="(infoSection, index) in props.cfData.infoSections"
              :key="index"
              :data-toc="infoSection.id"
              class="inner-template-ly2-sections-item"
          >
            <InfoSection
                :info-section="infoSection"
                :headline="getTocSection(infoSection.id).headline"
            />
          </div>
          <Reviews
              v-if="cfData.reviewValue && cfData.reviewCount"
              :count="cfData.reviewCount"
              :value="cfData.reviewValue"
          />
        </template>
      </InnerTemplateLy2>
    </div>
  </div>
</template>
