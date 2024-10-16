<script setup>
import {useCfStore} from "~/store/cf.js";

const props = defineProps({
  cfData: {
    type: Object,
    required: true
  }
})

const cfStore = useCfStore()
const abTest = useAbTest()
const affiliateAbTestType = abTest.getSessionFeature('affiliateWidgets')

const tocSections = computed(() => {
  return cfStore.infoSections
      .map(({ id, headline }, index) => ({ id, headline: `${index + 1}. ${headline}` }))
})

const getTocSection = (id) => {
  return tocSections.find(s => s.id === id)
}
</script>

<template>
  <div class="info-page">
    <div class="inner">
      <client-only>
        <InfoPageAffiliate
            v-if="!!affiliateAbTestType && !!props.cfData.affiliateType"
            :type="affiliateAbTestType"
        />
      </client-only>
      <InnerTemplate
          :headline="props.cfData.headline"
          :sub-headline="props.cfData.subHeadline"
          :toc-sections="tocSections"
          :toc-arrow-label="$t('_shared.infoPage.tocArrowLabel')"
          :toc-arrow-x-offset="200"
      >
<!--        <template slot="head">-->
<!--          <CfArticle :content="props.cfData.introText" />-->
<!--          <InfoPageHighlight-->
<!--              v-if="!!props.cfData.introHighlight"-->
<!--              :type="props.cfData.introHighlight.type"-->
<!--              :text="props.cfData.introHighlight.text"-->
<!--          />-->
<!--        </template>-->
<!--        <template slot="sections">-->
<!--          <div-->
<!--              v-for="(infoSection, index) in props.cfData.infoSections"-->
<!--              :key="index"-->
<!--              :data-toc="infoSection.id"-->
<!--          >-->
<!--            <InfoSection-->
<!--                :info-section="infoSection"-->
<!--                :headline="getTocSection(infoSection.id).headline"-->
<!--            />-->
<!--          </div>-->
<!--        </template>-->
      </InnerTemplate>
    </div>
  </div>
</template>
