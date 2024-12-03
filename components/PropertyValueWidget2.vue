<script setup>
import {PATHS} from "assets/js/constants.js";

const nuxtApp = useNuxtApp()

const props = defineProps({
  wrapperClassName: {
    type: String,
    required: true
  },
  borderBottom: {
    type: Boolean,
    default: false
  }
})

let PROPERTY_VALUE_MIN_HEIGHT

const iframeHeight = ref(null)

const iframeMessageListener = (e) => {
  if (e.origin !== 'https://www.aktuelle-grundstueckspreise.de') {
    console.error('Invalid origin')
    return
  }
  if (!e.data || typeof e.data !== 'string') {
    return
  }
  if (e.data.startsWith('PROPERTY_VALUE_EVENT__')) {
    const jsonEvent = e.data.replace('PROPERTY_VALUE_EVENT__', '')
    const event = JSON.parse(jsonEvent)
    const submitFields = {}

    const anlass = event.fieldsSimple['Anlass der Bewertung']
    if (anlass) {
      submitFields.anlass = anlass
    }

    nuxtApp.$gtm.push({
      event: `heyflow.propertyValueWidget2.${event.stepName}.${event.event}`,
      fields: submitFields
    })
  }
  if (e.data.startsWith('PROPERTY_VALUE_HEIGHT__')) {
    const newHeight = e.data.replace('PROPERTY_VALUE_HEIGHT__', '')
    let newHeightNumber = parseInt(newHeight)
    if (newHeightNumber < PROPERTY_VALUE_MIN_HEIGHT) {
      newHeightNumber = PROPERTY_VALUE_MIN_HEIGHT
    }
    iframeHeight.value = `${newHeightNumber}px`
  }
}

const getIframeElement = () => {
  return document.querySelector('.property-value-widget-wizard-iframe')
}

const iframeLoadListener = () => {
  const iframe = getIframeElement()
  if (iframe) {
    try {
      // Access the new URL of the iframe
      const newUrl = iframe.contentWindow.location.href;
      if (newUrl.includes(PATHS.PROPERTY_VALUE_REQUEST)) {
        window.location.href = newUrl
      }
    } catch (e) {
      // Handle errors for cross-origin iframe
      console.log('Iframe redirected to a cross-origin URL.');
    }
  }
}

onBeforeMount(() => {
  const wrapperWidth = document.querySelector(`.${props.wrapperClassName}`)?.offsetWidth || window.innerWidth

  if (wrapperWidth < 690) {
    PROPERTY_VALUE_MIN_HEIGHT = 460
  } else {
    PROPERTY_VALUE_MIN_HEIGHT = 315
  }
  iframeHeight.value = `${PROPERTY_VALUE_MIN_HEIGHT}px`
})

onMounted(() => {
  window.addEventListener('message', iframeMessageListener)
  const iframe = getIframeElement()
  if (iframe) {
    iframe.addEventListener('load', iframeLoadListener)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('message', iframeMessageListener)
  const iframe = getIframeElement()
  if (iframe) {
    iframe.removeEventListener('load', iframeLoadListener)
  }
})

const features = [
    'In 2 Minuten Formular ausfüllen',
    'Ergebnis sofort online abrufen',
    '100% kostenlos & unverbindlich'
]
const instructionSteps = [
    'Angaben zur Immobilie machen',
    'Erste Einschätzung sofort online abrufen',
    'Kostenlose Expertenbewertung (optional)'
]
</script>

<template>
  <div class="property-value-widget" :class="{ borderBottom: props.borderBottom }">
    <div class="property-value-widget-inner">
      <p class="property-value-widget-headline">
        Immobilienwert-Rechner
      </p>
      <p  class="property-value-widget-description">
        Ermitteln Sie jetzt kostenlos den Wert Ihrer Immobilie
      </p>
      <div class="property-value-widget-wizard">
        <iframe
            class="property-value-widget-wizard-iframe"
            src="/property-value-2.html?v=2"
            :style="{ height: iframeHeight }"
        ></iframe>
        <div class="property-value-widget-wizard-features">
          <div
              v-for="(feature, index) of features"
              :key="index"
              class="property-value-widget-wizard-features-item"
          >
            <img src="~/assets/img/_shared/check-green-2.svg" />
            <p class="property-value-widget-wizard-features-item-text">
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
      <div class="property-value-widget-instructions">
        <img class="property-value-widget-instructions-img" src="/img/affiliate/property-value.png" />
        <div class="property-value-widget-instructions-steps">
          <p class="property-value-widget-instructions-steps-headline">
            So funktioniert's
          </p>
          <p
              v-for="(step, index) in instructionSteps"
              :key="index"
              class="property-value-widget-instructions-step"
          >
            <span class="property-value-widget-instructions-step-number">
              {{ index + 1 }}.
            </span>
            <span class="property-value-widget-instructions-step-value">
              {{ step }}
            </span>
          </p>
          <BlueArrow
              class="property-value-widget-instructions-arrow"
              type="TO_TOP_LEFT"
              text="Sie bestimmen, wie<br> es weiter geht!"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .property-value-widget {
    background-color: $colorLightGreyBg;
    border: 1px solid $colorStroke;
    padding: 40px 0;

    &.borderBottom {
      border-bottom: 1px solid $colorStroke;
    }

    .property-value-widget-inner {
      text-align: left;
      width: 90%;
      max-width: 700px;
      margin: 0 auto;

      .property-value-widget-headline {
        font-weight: 500;
        font-size: 105%;
      }

      .property-value-widget-description {
        margin-bottom: 15px;
      }

      .property-value-widget-wizard {
        border: 2px solid $colorPrimary;

        iframe {
          width: 100%;
          border: none;
          display: block;
        }

        .property-value-widget-wizard-features {
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

          .property-value-widget-wizard-features-item {
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

      .property-value-widget-instructions {
        margin-top: 30px;

        @media #{$md} {
          display: flex;
          margin-top: 50px;
        }

        .property-value-widget-instructions-img {
          align-self: flex-start;
          width: 180px;
          display: block;
          border: 1px solid $colorStroke;
          margin-bottom: 20px;

          @media #{$md} {
            margin-bottom: 0;
          }
        }

        .property-value-widget-instructions-steps {
          align-self: flex-start;
          position: relative;
          flex-grow: 1;

          @media #{$md} {
            margin-left: 20px;
            margin-bottom: 40px;
          }

          .property-value-widget-instructions-steps-headline {
            font-weight: 400;
            margin-bottom: 8px;
          }

          .property-value-widget-instructions-step {
            display: flex;
            margin: 3px 0;

            .property-value-widget-instructions-step-number {
              flex-shrink: 0;
              color: $colorPrimary;
              font-weight: 500;
              margin-right: 8px;
            }
          }

          .property-value-widget-instructions-arrow {
            position: absolute;
            bottom: -50px;
            left: 40%;
            font-size: 70%;

            & > span {
              left: 40px;
              top: -10px;
            }
          }
        }
      }
    }
  }
</style>
