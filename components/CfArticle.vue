<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="cf-article" :class="{ noJustify }" v-html="renderedContent"></div>
</template>

<script>
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
export default defineNuxtComponent({
  setup() {
    return {
      config: useRuntimeConfig()
    }
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    noJustify: {
      type: Boolean,
      default: false
    },
    parameters: {
      type: Object,
      default: null
    }
  },
  computed: {
    renderedContent () {
      return documentToHtmlString(this.content, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields } } }) =>
            `<img src="${fields.file.url}?fm=webp" alt="${fields.description}"/>`,
          [INLINES.HYPERLINK]: (data) => {
            return `<a href="${this.getUri(data)}" target="${this.getTarget(data)}">${data.content[0].value}</a>`
          },
          [BLOCKS.PARAGRAPH]: (node, next) => {
            let content = next(node.content)
            if (this.parameters) {
              Object.keys(this.parameters).forEach((key) => {
                content = content.replace(new RegExp(key, 'g'), this.parameters[key])
              })
            }
            return `<p>${content}</p>`
          }
        }
      })
    }
  },
  methods: {
    getUri (data) {
      const { uri } = data.data
      if (uri.startsWith('/')) {
        return `${this.config.public.canonicalHostname}${uri}`
      } else {
        return uri
      }
    },
    getTarget (data) {
      const { uri } = data.data
      if (uri.startsWith('/')) {
        return '_self'
      } else {
        return '_blank'
      }
    }
  }
})
</script>

<style lang="scss">
.cf-article {

  & > *:first-child {
    margin-top: 0;
  }

  h2 {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  h3 {
    margin-top: 30px;
    margin-bottom: 5px;

    & + p {
      margin-top: 5px;
    }
  }

  p {
    margin: 15px 0;
  }

  &:not(.noJustify) p {
    text-align: justify;
  }

  b {
    font-weight: 400;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      margin: 0 0 0 20px;

      p {
        text-align: left !important;
        margin: 5px 0;
      }
    }
  }

  img {
    display: block;
    width: 100%;
    max-width: 600px;
    margin-top: 30px;

    &+p {
      font-weight: 400;
      font-size: 90%;
      text-align: left !important;
    }
  }

  hr {
    max-width: 200px;
    margin-top: 50px;
  }

  a {
    color: $colorPrimary;
    word-wrap: break-word;
  }

  blockquote {
    margin: 15px 0;
    padding: 10px 20px;
    border: 1px solid $colorStroke;
    font-weight: 400;
    display: inline-block;

    p {
      margin: 0
    }
  }

  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    border-collapse: collapse;
    margin: 20px 0;

    p {
      margin: 0;
    }

    b {
      font-weight: 500;
    }

    th {
      background-color: #FBF2EB;
      font-weight: 500;
      border: 1px solid rgba(#000, .1);
      border-top: 0;
      border-bottom: 0;
      padding: 5px 10px;

      &:first-child {
        border-left: 0;
      }

      &:last-child {
        border-right: 0;
      }
    }

    tr {

      &:nth-child(odd) {
        background-color: rgba(#000, .03)
      }

      td {
        padding: 5px 10px;
        border: 1px solid rgba(#000, .1);
        border-top: 0;
        border-bottom: 0;

        &:first-child {
          border-left: 0;
        }

        &:last-child {
          border-right: 0;
        }
      }

      &:first-child {
        td {
          border-top: 0;
        }
      }

      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
