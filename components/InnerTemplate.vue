<script setup>
import { offsetTop } from 'assets/js/scrollUtils'

const props = defineProps({
  headline: {
    type: String,
    default: null
  },
  subHeadline: {
    type: String,
    default: null
  },
  tocSections: {
    type: Array,
    default: null
  },
  hideToc: {
    type: Boolean,
    default: false
  }
})

const sectionOffsets = ref([])
const activeTOCItem = ref(null)
const recalculateSectionOffsetInterval = ref()

const calculateSectionOffsets = () => {
  sectionOffsets.value = [...document.querySelectorAll('.inner-template-sections-item[data-toc]')]
      .map(i => ({
        dataToc: i.attributes.getNamedItem('data-toc').value,
        offsetTop: offsetTop(i)
      }))
}
const onScroll = () => {
  const windowOffset = window.scrollY + 155
  const activeSectionOffset = sectionOffsets.value.findLast(s => s.offsetTop < windowOffset)

  if (!activeSectionOffset) {
    if (activeTOCItem.value) {
      activeTOCItem.value = null
    }
  } else if (activeTOCItem.value !== activeSectionOffset.dataToc) {
    activeTOCItem.value = activeSectionOffset.dataToc
  }
}

onMounted(() => {
  calculateSectionOffsets()
  onScroll()

  recalculateSectionOffsetInterval.value = window.setInterval(
      calculateSectionOffsets, 5000
  )
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.clearInterval(recalculateSectionOffsetInterval.value)
  window.removeEventListener('scroll', onScroll)
})


// TODO: extra line between affiliate header and info content
</script>

<template>
  <div class="inner-template">
    <div class="inner-template-columns" :class="{hideToc}">
      <div v-if="!hideToc" class="inner-template-toc-sidebar">
        <InnerTemplateToC
            :sections="tocSections"
            :active-item="activeTOCItem"
            sidebar
        />
      </div>
      <div class="inner-template-main" :class="{hideToc}">
        <div v-if="headline">
          <Headline
              :headline="headline"
              :sub-headline="subHeadline"
              :level="1"
              centered
          />
        </div>
        <div class="inner-template-head">
          <slot name="head"></slot>
        </div>
        <div v-if="!hideToc" class="inner-template-toc-mobile">
          <InnerTemplateToC
              :sections="tocSections"
          />
        </div>
        <div class="inner-template-sections">
          <slot name="sections"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.inner-template {

  .inner-template-columns {

    @media #{$lg} {
      &:not(.hideToc) {
        display: flex;
        max-width: 1200px;
      }
    }

    .inner-template-toc-sidebar {
      display: none;

      &:not(.hideToc) {

        @media #{$lg} {
          display: block;
          width: 250px;
          margin-right: 30px;
          margin-top: -20px;
        }

        @media #{$xl} {
          width: 350px;
          margin-right: 60px;
        }
      }
    }

    .inner-template-main {

      &:not(.hideToc) {
        @media #{$lg} {
          width: calc(100% - 280px);
        }

        @media #{$xl} {
          width: calc(100% - 410px);
        }
      }

      .inner-template-head {
        margin-bottom: 40px;
      }

      .inner-template-toc-mobile {

        @media #{$lg} {
          display: none;
        }
      }
    }

    .inner-template-sections {
      margin-top: 60px;

      .inner-template-sections-item {
        margin: 60px 0;

        @media #{$md} {
          margin: 80px 0;
        }

        &:first-child {
          margin-top: 0;
          margin-bottom: 50px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
