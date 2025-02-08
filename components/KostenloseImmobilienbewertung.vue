<script setup>
const nuxtApp = useNuxtApp()

const props = defineProps({
  borderBottom: {
    type: Boolean,
    default: false
  }
})

const MIN_HEIGHT = 315

// initial height of the iframe is controlled via CSS, until the user interacts (next step loaded)
const iframeHeightLocked = ref(true)
const iframeHeight = ref(`${MIN_HEIGHT}px`)


const includedFormFields = [
  'Anlass der Bewertung',
  'Art der Immobilie',
  'Art der Bebauung',
  'Art des Grundstücks',
  'Art des Hauses',
  'Expertenbewertung',
  'Eigentümer',
]

const allowedOrigins = [
  'https://www.aktuelle-grundstueckspreise.de',
  'https://staging.aktuelle-grundstueckspreise.de',
  'http://localhost:3000'
]

const iframeMessageListener = (e) => {
  if (!allowedOrigins.includes(e.origin)) {
    console.error('Invalid origin')
    return
  }
  if (!e.data || typeof e.data !== 'string') {
    return
  }
  if (e.data.startsWith('KOSTENLOSE_IMMOBILIENBEWERTUNG_EVENT__')) {
    if (iframeHeightLocked) {
      iframeHeightLocked.value = false
    }

    const jsonEvent = e.data.replace('KOSTENLOSE_IMMOBILIENBEWERTUNG_EVENT__', '')
    const event = JSON.parse(jsonEvent)
    const submitFields = {}

    includedFormFields.forEach((key) => {
      if (event.fieldsSimple[key]) {
        submitFields[key] = event.fieldsSimple[key]
      }
    })

    nuxtApp.$gtm.push({
      event: `heyflow.kostenloseImmobilienbewertung.${event.stepName}.${event.event}`,
      fieldsSimple: submitFields
    })
  }
  if (e.data.startsWith('KOSTENLOSE_IMMOBILIENBEWERTUNG_HEIGHT__')) {
    const newHeight = e.data.replace('KOSTENLOSE_IMMOBILIENBEWERTUNG_HEIGHT__', '')
    let newHeightNumber = parseInt(newHeight)
    if (newHeightNumber < MIN_HEIGHT) {
      newHeightNumber = MIN_HEIGHT
    }
    iframeHeight.value = `${newHeightNumber}px`
  }
}

const features = [
    'In 2 Minuten Formular ausfüllen',
    'Kostenlose Bewertung erhalten',
    'Sie entscheiden, wie es weiter geht'
]
const instructionSteps = [
    'Formular ausfüllen',
    'Telefonisches Vorgespräch',
    'Vermittlung von bis zu 3 lokalen Immobilienexperten',
    'Kostenlose und unverbindliche Bewertung erhalten',
    'Sie entscheiden, wie es weiter geht'
]

onMounted(() => {
  window.addEventListener('message', iframeMessageListener)
})
onBeforeUnmount(() => {
  window.removeEventListener('message', iframeMessageListener)
})
</script>

<template>
  <div class="kostenlose-immobilienbewertung" :class="{ borderBottom: props.borderBottom }">
    <div class="kostenlose-immobilienbewertung-inner">
      <p class="kostenlose-immobilienbewertung-headline">
        Kostenlose Immobilienbewertung
      </p>
      <p  class="kostenlose-immobilienbewertung-description">
        Erhalten Sie in wenigen Schritten realistische Marktwertschätzungen – 100% kostenfrei.
      </p>
      <div class="kostenlose-immobilienbewertung-wizard">
        <iframe
            title="Immobilie kostenlos bewerten"
            class="kostenlose-immobilienbewertung-wizard-iframe"
            src="/kostenlose-immobilienbewertung.html?v=1"
            :style="{ height: iframeHeight }"
        ></iframe>
        <div class="kostenlose-immobilienbewertung-wizard-features">
          <div
              v-for="(feature, index) of features"
              :key="index"
              class="kostenlose-immobilienbewertung-wizard-features-item"
          >
            <img src="~/assets/img/_shared/check-green-2.svg" />
            <p class="kostenlose-immobilienbewertung-wizard-features-item-text">
              {{ feature }}
            </p>
          </div>
        </div>
      </div>
      <div class="kostenlose-immobilienbewertung-instructions">
        <img class="kostenlose-immobilienbewertung-instructions-img" src="/img/affiliate/property-value-2.png" />
        <div class="kostenlose-immobilienbewertung-instructions-steps">
          <p class="kostenlose-immobilienbewertung-instructions-steps-headline">
            So funktioniert's
          </p>
          <p
              v-for="(step, index) in instructionSteps"
              :key="index"
              class="kostenlose-immobilienbewertung-instructions-step"
          >
            <span class="kostenlose-immobilienbewertung-instructions-step-number">
              {{ index + 1 }}.
            </span>
            <span class="kostenlose-immobilienbewertung-instructions-step-value">
              {{ step }}
            </span>
          </p>
          <div class="kostenlose-immobilienbewertung-instructions-button">
            <a href="https://hausbewertung.aktuelle-grundstueckspreise.de/">
              <Button
                  label="Mehr erfahren"
                  active
                  no-scale-hover-effect
                  inline-block
                  small
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .kostenlose-immobilienbewertung {
    background-color: $colorLightGreyBg;
    border: 1px solid $colorStroke;
    padding: 40px 0;

    &.borderBottom {
      border-bottom: 1px solid $colorStroke;
    }

    .kostenlose-immobilienbewertung-inner {
      text-align: left;
      width: 90%;
      max-width: 700px;
      margin: 0 auto;

      .kostenlose-immobilienbewertung-headline {
        font-weight: 500;
        font-size: 105%;
      }

      .kostenlose-immobilienbewertung-description {
        margin-bottom: 15px;
      }

      .kostenlose-immobilienbewertung-wizard {
        border: 2px solid $colorPrimary;

        iframe {
          width: 100%;
          border: none;
          display: block;
        }

        .kostenlose-immobilienbewertung-wizard-features {
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

          .kostenlose-immobilienbewertung-wizard-features-item {
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

      .kostenlose-immobilienbewertung-instructions {
        margin-top: 30px;

        @media #{$md} {
          display: flex;
          margin-top: 50px;
        }

        .kostenlose-immobilienbewertung-instructions-img {
          align-self: flex-start;
          width: 180px;
          display: block;
          border: 1px solid $colorStroke;
          margin-bottom: 20px;

          @media #{$md} {
            margin-bottom: 0;
          }
        }

        .kostenlose-immobilienbewertung-instructions-steps {
          align-self: flex-start;
          position: relative;
          flex-grow: 1;

          @media #{$md} {
            margin-left: 40px;
          }

          .kostenlose-immobilienbewertung-instructions-steps-headline {
            font-weight: 500;
            font-size: 105%;
            margin-bottom: 8px;
          }

          .kostenlose-immobilienbewertung-instructions-step {
            display: flex;
            margin: 3px 0;

            .kostenlose-immobilienbewertung-instructions-step-number {
              flex-shrink: 0;
              color: $colorPrimary;
              font-weight: 500;
              margin-right: 8px;
            }
          }

          .kostenlose-immobilienbewertung-instructions-button {
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
