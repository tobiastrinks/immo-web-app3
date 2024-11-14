<script setup>
import {useLocationStore} from "~/store/location.js";

const MIETE_AKTUELL_MIN_HEIGHT = 492

const mieteAktuellVersion = useCookie('mieteAktuellVersion')
const locationStore = useLocationStore()
const nuxtApp = useNuxtApp()

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false
  }
})

const iframeHeight = ref(null)

const zipParam = computed(() => {
  const { location } = locationStore
  if (location?.gemeinde?.gemeinde?.zip) {
    const { allZips } = location.gemeinde.gemeinde
    if (!allZips || allZips.length === 1) {
      return `&zip=${location.gemeinde.gemeinde.zip}`
    } else {
      return ''
    }
  } else {
    return ''
  }
})

const iframeMessageListener = (e) => {
  if (!e.data || typeof e.data !== 'string') {
    return
  }
  if (e.data.startsWith('MIETE_AKTUELL_HEIGHT__')) {
    const newHeight = e.data.replace('MIETE_AKTUELL_HEIGHT__', '')
    let newHeightNumber = parseInt(newHeight) + 5
    if (newHeightNumber < MIETE_AKTUELL_MIN_HEIGHT) {
      newHeightNumber = MIETE_AKTUELL_MIN_HEIGHT
    }
    iframeHeight.value = `${newHeightNumber}px`
  }
  if (e.data.startsWith('MIETE_AKTUELL_STEP__')) {
    const step = e.data.replace('MIETE_AKTUELL_STEP__', '')
    nuxtApp.$gtm.push({ event: step })
  }
}

onBeforeMount(() => {
  if (zipParam.value) {
    iframeHeight.value = '710px'
  } else {
    iframeHeight.value = `${MIETE_AKTUELL_MIN_HEIGHT}px`
  }
})

onMounted(() => {
  window.addEventListener('message', iframeMessageListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', iframeMessageListener)
})
</script>

<template>
  <div class="miete-aktuell">
    <div
      class="miete-aktuell-inner"
      :class="{ noBorder: props.sidebar }"
    >
      <div
        class="miete-aktuell-iframe-wrapper"
        :class="{ sidebar: props.sidebar }"
        :style="{ height: iframeHeight }"
      >
        <iframe
          ref="miete-aktuell"
          :src="`/miete-aktuell.html?version=${mieteAktuellVersion || '1'}${zipParam}`"
          :style="{ height: iframeHeight }"
        ></iframe>
      </div>
      <div class="miete-aktuell-features" :class="{ sidebar: props.sidebar }">
        <div
          v-for="(feature, index) of $tm('_shared.mieteAktuell.features')"
          :key="index"
          class="miete-aktuell-features-item"
          :class="{ sidebar: props.sidebar }"
        >
          <img src="~/assets/img/_shared/check-green-2.svg" />
          <p class="miete-aktuell-features-item-text">
            {{ feature }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.miete-aktuell {
  position: relative;
  z-index: 1;

  .miete-aktuell-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin: 0 auto;
    border-top: 2px solid #ECECEC;
    border-bottom: 2px solid #ECECEC;

    background-color: #fff;
    width: 100%;

    @media #{$md} {
      max-width: 768px;

      &:not(.noBorder) {
        border: 2px solid $colorPrimary;
        width: calc(100% - 4px);
      }
    }

    @media #{$lg} {
      align-items: center;
    }

    .miete-aktuell-iframe-wrapper {
      width: 100%;
      flex-grow: 1;
      transition: height .5s;
      height: 490px;

      iframe {
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
        z-index: 1;
        display: block;
      }
    }

    .miete-aktuell-features {
      background-color: #F9F9F9;
      border-top: #ECECEC 2px solid;
      font-size: 87%;
      padding: 20px 5%;

      &.sidebar {
        padding: 10px 5%;
      }

      @media #{$md} {
        &:not(.sidebar) {
          display: flex;
          justify-content: space-between;
        }
      }

      .miete-aktuell-features-item {
        display: flex;
        align-items: flex-start;
        text-align: left;
        line-height: 110%;
        margin: 10px 0;

        @media #{$md} {
          &:not(.sidebar) {
            margin: 0;
            width: 30%;
            justify-content: center;
          }
        }

        img {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
