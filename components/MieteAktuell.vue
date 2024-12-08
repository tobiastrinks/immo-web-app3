<script setup>
import {useLocationStore} from "~/store/location.js";
import {useRoute as useNativeRoute} from "#vue-router";

const mieteAktuellVersion = useCookie('mieteAktuellVersion')
const locationStore = useLocationStore()
const nuxtApp = useNuxtApp()
const route = useNativeRoute()

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false
  }
})

const zipParam = computed(() => {
  if (locationStore?.gemeinde?.gemeinde?.zip) {
    const { allZips } = locationStore.gemeinde.gemeinde
    if (!allZips || allZips.length === 1) {
      return `&zip=${locationStore.gemeinde.gemeinde.zip}`
    } else {
      return ''
    }
  } else {
    return ''
  }
})

// initial height of the iframe is controlled via CSS, until the user interacts (next step loaded)
const iframeHeightLocked = ref(true)
const iframeHeight = ref(null)

const MIETE_AKTUELL_MIN_HEIGHT = 492

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
    if (step !== 'mieteAktuell.step.objektart' && iframeHeightLocked.value) {
      iframeHeightLocked.value = false
    }
    nuxtApp.$gtm.push({ event: step })
  }
}

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
      >
        <iframe
          title="Immobilie kostenlos bewerten"
          class="miete-aktuell-iframe"
          ref="miete-aktuell"
          :src="`/miete-aktuell.html?version=${mieteAktuellVersion || '1'}${zipParam}&v=2`"
          :class="{ zipParam }"
          :style="{ height: !iframeHeightLocked ? iframeHeight : undefined }"
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

      iframe {
        width: 100%;
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
