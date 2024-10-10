<template>
  <div class="inner-template-ly2">
    <div class="inner-template-ly2-toc-sidebar">
      <InnerTemplateToCLy2
        :sections="tocSections"
        :active-item="activeTOCItem"
        sidebar
      />
    </div>
    <div class="inner-template-ly2-main">
      <div class="inner-template-ly2-head">
        <slot name="head"></slot>
      </div>
      <div class="inner-template-ly2-toc-mobile">
        <InnerTemplateToCLy2
          :sections="tocSections"
        />
      </div>
      <div class="inner-template-ly2-sections">
        <slot name="sections"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { offsetTop } from 'assets/js/scrollUtils'

export default defineNuxtComponent({
  setup() {
    const sectionOffsets = ref()
    const activeTOCItem = ref(null)
    const recalculateSectionOffsetInterval = ref()

    const calculateSectionOffsets = () => {
      sectionOffsets.value = [...document.querySelectorAll('.inner-template-ly2-sections-item *[data-toc]')]
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

    return {
      activeTOCItem
    }
  },
  props: {
    tocSections: {
      type: Array,
      default: null
    },
    tocArrowLabel: {
      type: String,
      default: null
    },
    tocArrowXOffset: {
      type: Number,
      default: null
    },
    usePHeadline: {
      type: Boolean,
      default: false
    },
    noOuterMargins: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.inner-template-ly2 {
  width: 100%;

  @media #{$lg} {
    display: flex;
    max-width: 1200px;
  }

  .inner-template-ly2-toc-sidebar {
    display: none;

    @media #{$lg} {
      display: block;
      width: 250px;
      margin-right: 30px;
    }

    @media #{$xl} {
      width: 270px;
      margin-right: 60px;
    }
  }

  .inner-template-ly2-main {
    @media #{$lg} {
      width: calc(100% - 280px);
    }

    @media #{$xl} {
      width: calc(100% - 330px);
    }

    .inner-template-ly2-head {
      margin-bottom: 40px;
    }

    .inner-template-ly2-toc-mobile {

      @media #{$lg} {
        display: none;
      }
    }
  }

  .inner-template-ly2-sections {
    margin-top: 60px;

    .inner-template-ly2-sections-item {
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
</style>
