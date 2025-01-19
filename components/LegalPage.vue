<script setup>
const props = defineProps({
  cfData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="page-location-nav-active margin-top inner">
    <InnerTemplate
        :headline="props.cfData.headline"
        :sub-headline="props.cfData.subHeadline"
        hide-toc
    >
      <template v-slot:sections>
        <div class="legal-page-content">
          <CfArticle :content="props.cfData.text" />
        </div>
      </template>
    </InnerTemplate>
  </div>
</template>

<style lang="scss">
.legal-page-content {
  margin-bottom: 50px;
}
</style>
