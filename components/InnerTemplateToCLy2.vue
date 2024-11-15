<script setup>
import {useStore} from "~/store/main.js";
import {offsetTop} from "assets/js/scrollUtils.js";

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false
  },
  sections: {
    type: Array,
    required: true
  },
  arrowLabel: {
    type: String,
    default: null
  },
  arrowXOffset: {
    type: Number,
    default: null
  },
  activeItem: {
    type: String,
    default: null
  }
})

const mainStore = useStore()
const route = useRoute()

const arrowLeft = ref(350)

const activeHash = computed(() => {
  const { fullPath } = route
  if (fullPath.includes('#')) {
    return fullPath.split('#').pop()
  } else {
    return null
  }
})

const scrollToHash = () => {
  if (!activeHash.value) {
    return
  }
  const sectionElem = document.querySelector(`*[data-toc="${activeHash.value}"]`)
  if (sectionElem) {
    window.scrollTo({
      top: offsetTop(sectionElem) - 150,
      left: 0,
      behavior: 'smooth'
    })
  }
}

const getActiveSectionId = (fullPath) => {
  if (fullPath.includes('#')) {
    return fullPath.split('#').pop()
  }
}

const scrollIfAlreadyActive = (sectionId) => {
  const { fullPath } = route
  if (getActiveSectionId(fullPath) === sectionId) {
    scrollToHash(fullPath)
  }
}

onMounted(() => {
  const { fullPath } = route
  scrollToHash(fullPath)

  const firstTocItemLabel = document.querySelector('.inner-template-toc-ly2-item .inner-template-toc-ly2-item-label')
  if (firstTocItemLabel) {
    arrowLeft.value = firstTocItemLabel.clientWidth + (props.arrowXOffset || 50)
  }
})

watch(() => route.fullPath, () => {
  scrollToHash()
})
</script>

<template>
  <div
      class="inner-template-toc-ly2"
      :class="{ navMinified: mainStore.navMinified, sidebar: props.sidebar }"
  >
    <p class="inner-template-toc-ly2-headline">
      {{ $t('_shared.locationToc.headline') }}
    </p>
    <nuxt-link
      v-for="(section, index) in sections"
      :key="index"
      class="inner-template-toc-ly2-item"
      :to="`#${section.id}`"
      @click.native="scrollIfAlreadyActive(section.id)"
    >
      <p class="inner-template-toc-ly2-item-label" :class="{ active: activeItem === section.id, sidebar }">
        <span class="inner-template-toc-ly2-item-label-number">{{ index + 1 }}.</span>
        {{ section.headline.split(' ').slice(1).join(' ') }}
      </p>
    </nuxt-link>
    <BlueArrow
      v-if="arrowLabel"
      class="inner-template-toc-ly2-arrow"
      :style="{ left: `${arrowLeft}px` }"
      type="TO_LEFT_BOTTOM"
      :text="arrowLabel"
    />
  </div>
</template>

<style scoped lang="scss">
.inner-template-toc-ly2 {
  line-height: 1.4;
  width: 100%;
  transition: top $minifyNavAnimationSpeed;
  padding: 20px 0;

  &.sidebar {
    top: 138px;
    max-height: calc(100vh - 178px);
    overflow-y: auto;

    &.navMinified {
      top: 87px;
      max-height: calc(100vh - 127px);
    }
  }

  @media #{$lg} {
    margin: 0;
    position: sticky;
  }

  .inner-template-toc-ly2-headline {
    font-size: 120%;
    margin-bottom: 10px;
    font-weight: 500;

    @media #{$lg} {
      font-size: 100%;
    }
  }

  .inner-template-toc-ly2-item {
    display: flex;
    margin: 10px 0;

    @media #{$lg} {
      font-size: 90%;
      margin: 5px 0;
    }

    &:hover {
      cursor: pointer;

      .inner-template-toc-ly2-item-icon {
        transform: translateX(5px) scale(1.2);
      }
    }

    .inner-template-toc-ly2-item-icon {
      color: $colorPrimary;
      margin-top: 5px;
      margin-right: 10px;
      transition: transform .4s;
      flex-shrink: 0;
    }

    .inner-template-toc-ly2-item-label {
      display: flex;

      &:hover {
        color: $colorPrimary;
      }

      &.active {
        font-weight: 500;
      }

      &:not(.active).sidebar {
        opacity: .75;
      }

      .inner-template-toc-ly2-item-label-number {
        text-align: right;
        flex-shrink: 0;
        width: 25px;
        margin-right: 7px;
        font-weight: 500;
        color: $colorPrimary;
      }
    }
  }
}
</style>
