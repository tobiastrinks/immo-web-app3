<template>
  <div class="headline" :class="[{ centered, noSubHeadline: !subHeadline, ly2 }, `level${level}`]">
    <p v-if="onlyUseParagraphs" class="headline-main">
      {{ headline }}
    </p>
    <h1 v-else-if="level === 1" class="headline-main">
      {{ headline }}
    </h1>
    <h2 v-else-if="level === 2" class="headline-main">
      {{ headline }}
    </h2>
    <h3 v-else-if="level === 3" class="headline-main">
      {{ headline }}
    </h3>
    <p v-if="subHeadline" class="headline-sub">
      {{ subHeadline }}
    </p>
  </div>
</template>

<script>
import { showLayoutV2 } from '@/assets/js/featureFlagUtils'

export default {
  name: 'Headline',
  props: {
    headline: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      default: 1
    },
    subHeadline: {
      type: String,
      default: null
    },
    centered: {
      type: Boolean,
      default: false
    },
    onlyUseParagraphs: {
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

<style scoped lang="scss">
.headline {
  margin-bottom: 20px;

  &.noSubHeadline {
    margin-bottom: 30px;
  }

  @media #{$md} {
    margin-bottom: 40px;
  }

  &.centered {
    text-align: center;
  }

  .headline-main {
    margin-bottom: 10px;
  }

  p.headline-main {
    font-family: $fontHeadline;
    font-size: 144%;
    font-weight: 600;

    @media #{$md} {
      font-size: 180%;
    }
  }

  .headline-sub {
    font-size: 120%;
    font-weight: 300;
    line-height: 1.4;

    @media #{$md} {
      font-size: 130%;
    }
  }

  &.ly2 {

    &.level3 {
      margin-bottom: 10px;
    }

    p.headline-main {
      font-size: 120%;

      @media #{$md} {
        font-size: 150%;
      }
    }

    .headline-sub {
      font-size: 100%;

      @media #{$md} {
        font-size: 110%;
      }
    }

    h3 {
      font-family: $fontPrimary;
      font-weight: 500;
    }
  }
}
</style>
