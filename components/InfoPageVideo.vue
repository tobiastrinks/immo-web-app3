<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  arrowLabel: {
    type: String,
    required: true
  },
  description: {
    type: Object,
    required: true
  }
})

const renderedDescription = computed(() => {
  return documentToHtmlString(props.description)
})
</script>

<template>
  <div class="info-page-video">
    <iframe
        :src="`https://www.youtube.com/embed/${props.videoId}`"
        title="Wie ermittelt man den Bodenwert für ein Baugrundstück?"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    <BlueArrow class="info-page-video-arrow" type="TO_LEFT_BOTTOM" :text="props.arrowLabel" />
    <div
      class="info-page-video-description"
      v-html="renderedDescription"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.info-page-video {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 30px 0;

  iframe {
    width: 100%;
    height: 250px;

    @media #{$md} {
      height: 300px;
    }
  }

  .info-page-video-arrow {
    position: absolute;
    top: 50%;
    left: calc(100% + 20px);
    transform: translateY(-50%);
  }

  .info-page-video-description {
    font-size: 90%;
  }
}
</style>
