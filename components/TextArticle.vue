<template>
  <div class="text-article" :class="{ smallMargin, greyBoxSmall, ly2 }">
    <h3 v-if="headline" class="text-article-headline">
      {{ headline }}
    </h3>
    <div
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      class="text-article-paragraph"
      :class="{ smallMargin }"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-if="useRawHtml" v-html="paragraph"></p>
      <p v-else>
        {{ paragraph }}
      </p>
    </div>
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<script>
import { showLayoutV2 } from '~/assets/js/featureFlagUtils'

export default {
  props: {
    headline: {
      type: String,
      default: null
    },
    paragraphs: {
      type: Array,
      default: () => []
    },
    useRawHtml: {
      type: Boolean,
      default: false
    },
    smallMargin: {
      type: Boolean,
      default: false
    },
    greyBoxSmall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ly2 () {
      return showLayoutV2(this.$route.path)
    }
  }
}
</script>

<style lang="scss">
.text-article {
  margin: 50px 0;

  &.smallMargin {
    margin: 30px 0;

    &.ly2 {
      margin: 10px 0;
    }
  }

  &.greyBoxSmall {
    background-color: $greyMedium;
    padding: 2px 10px;
    font-size: 90%;
  }

  .text-article-headline {
    font-weight: 500;
    font-size: 113%;
    margin-bottom: 25px;
  }

  .text-article-paragraph {
    margin: 20px 0;
    text-align: justify;

    &.smallMargin {
      margin: 10px 0;
    }

    b {
      font-weight: 400;
    }

    a {
      color: $colorPrimary;
    }
  }
}
</style>
