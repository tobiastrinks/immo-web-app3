<script setup>
const nuxtApp = useNuxtApp()

const props = defineProps({
  sidebar: {
    type: Boolean,
    default: false
  }
})

let WATTFOX_IMMO_MIN_HEIGHT

// initial height of the iframe is controlled via CSS, until the user interacts (next step loaded)
const iframeHeightLocked = ref(true)
const iframeHeight = ref(null)

const iframeMessageListener = (e) => {
  if (!e.data || typeof e.data !== 'string') {
    return
  }
  if (e.data.startsWith('WATTFOX_IMMO_EVENT__')) {
    if (iframeHeightLocked) {
      iframeHeightLocked.value = false
    }

    const event = e.data.replace('WATTFOX_IMMO_EVENT__', '')
    nuxtApp.$gtm.push({ event: `heyflow.wattfox.${event}` })
  }
  if (e.data.startsWith('WATTFOX_IMMO_HEIGHT__')) {
    const newHeight = e.data.replace('WATTFOX_IMMO_HEIGHT__', '')
    let newHeightNumber = parseInt(newHeight)
    if (newHeightNumber < WATTFOX_IMMO_MIN_HEIGHT) {
      newHeightNumber = WATTFOX_IMMO_MIN_HEIGHT
    }
    iframeHeight.value = `${newHeightNumber}px`
  }
}

onMounted(() => {
  nuxtApp.$gtm.push({ event: 'heyflow.wattfox.loaded' })
  window.addEventListener('message', iframeMessageListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', iframeMessageListener)
})
</script>

<template>
  <div class="wattfox-immo">
    <div
      class="wattfox-immo-inner"
      :class="{ noBorder: props.sidebar }"
    >
      <div class="wattfox-immo-iframe-wrapper">
        <iframe
          title="Immobilie kostenlos bewerten"
          class="wattfox-immo-iframe"
          ref="wattfox-immo"
          src="/wattfox-immo.html?v=2"
          :style="{ height: !iframeHeightLocked ? iframeHeight : undefined }"
        ></iframe>
      </div>
      <div class="wattfox-immo-features" :class="{ sidebar: props.sidebar }">
        <div
          v-for="(feature, index) of $tm('_shared.wattfoxImmo.features')"
          :key="index"
          class="wattfox-immo-features-item"
          :class="{ sidebar: props.sidebar }"
        >
          <img src="~/assets/img/_shared/check-green-2.svg" />
          <p class="wattfox-immo-features-item-text">
            {{ feature }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wattfox-immo {
  position: relative;
  z-index: 1;

  .wattfox-immo-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    margin: 0 auto;
    border-top: 2px solid #ECECEC;
    border-bottom: 2px solid #ECECEC;

    background-color: #fafbff;
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

    .wattfox-immo-iframe-wrapper {
      width: 100%;
      flex-grow: 1;
      transition: height .5s;
      background-color: #fff;

      iframe {
        width: 100%;
        border: none;
        position: relative;
        z-index: 1;
        display: block;
      }
    }

    .wattfox-immo-features {
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

      .wattfox-immo-features-item {
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
