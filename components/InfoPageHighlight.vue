<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { INLINES } from '@contentful/rich-text-types'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  headline: {
    type: String,
    required: false
  },
  text: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()

const getUri = (data) => {
  const { uri } = data.data
  if (uri.startsWith('/')) {
    return `${config.public.canonicalHostname}${uri}`
  } else {
    return uri
  }
}
const getTarget = (data) => {
  const { uri } = data.data
  if (uri.startsWith('/')) {
    return '_self'
  } else {
    return '_blank'
  }
}

const iconSrc = computed(() => {
  const filename = {
    summary: 'summary.svg',
    tip: 'tip.svg',
    hint: 'hint.svg',
    example: 'example.svg',
    attention: 'attention.svg'
  }[props.type]
  return `/img/infoHighlightIcons/${filename}`
})

const renderedContent = computed(() => {
  return documentToHtmlString(props.text, {
    renderNode: {
      [INLINES.HYPERLINK]: (data) => {
        return `<a href="${getUri(data)}" target="${getTarget(data)}">${data.content[0].value}</a>`
      }
    }
  })
})
</script>

<template>
  <div class="info-page-highlight" :class="props.type">
    <div class="info-page-highlight-header">
      <img
        class="info-page-highlight-header-icon"
        :src="iconSrc"
      />
      <p class="info-page-highlight-header-text">
        {{ props.headline || $t('_shared.infoPage.highlight.defaultHeadlines.summary') }}
      </p>
    </div>
    <div
      class="info-page-highlight-body-text"
      v-html="renderedContent"
    ></div>
  </div>
</template>

<style lang="scss">
.info-page-highlight {
  padding: 20px;
  margin: 30px 0;

  &.summary {
    background-color: rgba($colorPrimary, .1);
    .info-page-highlight-header-text, a {
      color: $colorPrimary;
    }
  }

  &.tip {
    background-color: rgba($yellow, .1);
    .info-page-highlight-header-text, a {
      color: $yellow;
    }
  }

  &.hint {
    background-color: rgba($blue2, .1);
    .info-page-highlight-header-text, a {
      color: $blue2;
    }
  }

  &.example {
    background-color: rgba($green2, .1);
    .info-page-highlight-header-text, a {
      color: $green2;
    }
  }

  &.attention {
    background-color: rgba($red2, .1);
    .info-page-highlight-header-text, a {
      color: $red2;
    }
  }

  .info-page-highlight-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .info-page-highlight-header-icon {
      height: 30px;
      margin-right: 10px;
    }

    .info-page-highlight-header-text {
      font-weight: 500;
      font-size: 120%;
    }
  }

  .info-page-highlight-body-text {

    ul, ol {
      align-self: stretch;
      margin: 0;
      padding-left: 3px;

      li {
        display: flex;
        align-items: flex-start;
        margin: 10px 10px 0;
        padding: 0;

        &::before {
          content: "";
          margin-top: 12px;
          width: 4px;
          height: 4px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #000;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
