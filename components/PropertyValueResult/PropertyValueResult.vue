<script setup>
import {usePropertyValueStore} from "~/store/propertyValue.js";

const propertyValueStore = usePropertyValueStore()
const apiFetch = useApiFetch()
const i18n = useI18n()

const showAppointmentPopup = ref(false)

const result = computed(() => {
  return propertyValueStore.result
})
const isFailed = computed(() => {
  return result.value.status !== 'SUCCESSFUL'
})
const isTargetGroup = computed(() => {
  const anlass = result.value.request.anlass
  return (
      !anlass ||
      anlass?.toLowerCase()?.includes('verkauf') || [
        'Erbe oder Schenkung',
        'Vermögensaufteilung',
        'Sonstiges'
      ].includes(anlass)
  )
})

const inputsTable = computed(() => {
  let artGrundstueck = result.value.request.artGrundstueck
  let erschliessung = result.value.request.erschliessung

  const istBebaut = (
      result.value.request.istBebaut === 'Ja' ||
      ['Haus', 'Gewerbe', 'Wohnung'].includes(result.value.request.artImmobilie)
  )

  if (istBebaut) {
    artGrundstueck = 'Bauland'
    erschliessung = 'Erschlossen'
  }

  return {
    sections: [
      {
        title: 'Lage',
        rows: result.value.request.zip
            ? [
              [
                { text: 'Straße' },
                { text: result.value.request.streetAndNumber, bold: true }
              ],
              [
                { text: 'Postleitzahl' },
                { text: result.value.request.zip, bold: true }
              ],
              [
                { text: 'Stadt' },
                { text: result.value.request.city, bold: true }
              ]
            ].filter(i => !!i)
            : [
              result.value.request.flurstueckZip && [
                { text: 'Postleitzahl' },
                { text: result.value.request.flurstueckZip, bold: true }
              ],
              result.value.request.gemarkung && [
                { text: 'Gemarkung' },
                { text: result.value.request.gemarkung, bold: true }
              ],
              result.value.request.flur && [
                { text: 'Flur' },
                { text: result.value.request.flur, bold: true }
              ],
              result.value.request.flurstueck && [
                { text: 'Flurstück' },
                { text: result.value.request.flurstueck, bold: true }
              ],
              result.value.request.flurstueckNenner && [
                { text: 'Flurstück-Nenner' },
                { text: result.value.request.flurstueckNenner, bold: true }
              ]
            ].filter(i => !!i)
      },
      {
        title: 'Grundstück',
        rows: [
          result.value.request.plotArea && [
            { text: 'Grundstücksgröße' },
            { text: `${i18n.n(result.value.request.plotArea)} m²`, bold: true }
          ],
          artGrundstueck && [
            { text: 'Art des Grundstücks' },
            { text: artGrundstueck, bold: true }
          ],
          erschliessung && [
            { text: 'Erschließungsgrad' },
            { text: erschliessung, bold: true }
          ],
          [
            { text: 'Bebaut' },
            { text: istBebaut ? 'Ja' : 'Nein', bold: true }
          ]
        ].filter(i => !!i)
      },
      (istBebaut) && {
        title: 'Bebauung',
        rows: [
          result.value.request.artBebauung && [
            { text: 'Art der Bebauung' },
            { text: result.value.request.artBebauung, bold: true }
          ],
          result.value.request.artHaus && [
            { text: 'Art des Hauses' },
            { text: result.value.request.artHaus, bold: true }
          ],
          result.value.request.gewerbeeinheiten && result.value.request.gewerbeeinheiten !== '0' && [
            { text: 'Anzahl Gewerbeeinheiten' },
            { text: result.value.request.gewerbeeinheiten, bold: true }
          ],
          result.value.request.gewerbeflaeche && result.value.request.gewerbeflaeche !== '0' && [
            { text: 'Gewerbefläche' },
            { text: `${result.value.request.gewerbeflaeche} m²`, bold: true }
          ],
          result.value.request.wohneinheiten && result.value.request.wohneinheiten !== '0' && [
            { text: 'Anzahl Wohneinheiten' },
            { text: result.value.request.wohneinheiten, bold: true }
          ],
          result.value.request.wohnflaeche && result.value.request.wohnflaeche !== '0' && [
            { text: 'Wohnfläche' },
            { text: `${result.value.request.wohnflaeche} m²`, bold: true }
          ],
          result.value.request.zimmer && result.value.request.zimmer !== '0' && [
            { text: 'Zimmer' },
            { text: result.value.request.zimmer, bold: true }
          ],
          result.value.request.baujahr && [
            { text: 'Baujahr' },
            { text: result.value.request.baujahr, bold: true }
          ],
          result.value.request.zustand && [
            { text: 'Zustand' },
            { text: result.value.request.zustand, bold: true }
          ]
        ].filter(i => !!i)
      },
      result.value.request.erschliessung && {
        title: 'Entwicklungszustand',
        rows: [
          [
            { text: 'Erschließungsgrad' },
            { text: `${result.value.request.erschliessung}`, bold: true }
          ]
        ]
      }
    ].filter(i => !!i)
  }
})
const resultPricePerSqmTable = computed(() => {
  const pricePerSqmEstimateFrom = i18n.n(result.value.pricePerSqmEstimate * 0.8, { maximumFractionDigits: 0 })
  const pricePerSqmEstimateTo = i18n.n(result.value.pricePerSqmEstimate * 1.2, { maximumFractionDigits: 0 })
  return {
    sections: [
      {
        title: 'Geschätzte Quadratmeterpreise',
        rows: [
          [
            { text: 'Grundstücksfläche <br />(ohne Bebauung)', paddingBottom: 10 },
            { text: `${pricePerSqmEstimateFrom} - ${pricePerSqmEstimateTo} €/m²`, bold: true, paddingBottom: 10, warning: isTargetGroup.value }
          ],
          result.value.request.wohnflaeche && [
            { text: 'Wohnfläche', paddingBottom: !!result.value.request.gewerbeflaeche && 10 },
            { text: 'Weitere Angaben benötigt', bold: true, paddingBottom: !!result.value.request.gewerbeflaeche && 10 }
          ],
          result.value.request.gewerbeflaeche && [
            { text: 'Gewerbefläche' },
            { text: 'Weitere Angaben benötigt', bold: true }
          ]
        ].filter(i => !!i)
      }
    ]
  }
})
const marketValue = computed(() => {
  return result.value.pricePerSqmEstimate * result.value.request.plotArea
})
const resultTable = computed(() => {
  const marketValueFrom = i18n.n(marketValue.value * 0.8, { maximumFractionDigits: 0 })
  const marketValueTo = i18n.n(marketValue.value * 1.2, { maximumFractionDigits: 0 })
  return {
    sections: [
      {
        title: 'Ergebnis',
        rows: [
          [
            { text: 'Geschätzter Marktwert des Grundstücks<br /> (ohne Bebauung)', paddingBottom: 10 },
            { text: `${marketValueFrom} - ${marketValueTo} €`, bold: true, paddingBottom: 10, warning: isTargetGroup.value }
          ],
          result.value.request.wohnflaeche && [
            { text: 'Wohnfläche', paddingBottom: !!result.value.request.gewerbeflaeche && 10 },
            { text: 'Weitere Angaben benötigt', bold: true, paddingBottom: !!result.value.request.gewerbeflaeche && 10 }
          ],
          result.value.request.gewerbeflaeche && [
            { text: 'Gewerbefläche' },
            { text: 'Weitere Angaben benötigt', bold: true }
          ]
        ].filter(i => !!i)
      }
    ]
  }
})
const resultFailedTable = computed(() => {
  const failedStatusText = {
    ZIP_MATCHING_FAILED: 'Die angegebene Postleitzahl konnte nicht zugeordnet werden.',
    LAND_TYPE_MATCHING_FAILED: 'Leider wurden keine passenden Vergleichsgrundstücke gefunden.',
    NO_MATCHING_PROPERTIES: 'Leider wurden keine passenden Vergleichsgrundstücke gefunden.'
  }
  return {
    sections: [
      {
        title: 'Ergebnis',
        subTitle: 'Es tut uns Leid! Leider konnten wir für Ihre Immobilie keinen Wert berechnen.',
        rows: [
          [
            { text: 'Fehler', paddingBottom: 10 },
            { text: failedStatusText[result.value.status] || result.value.status, bold: true, paddingBottom: 10 }
          ]
        ]
      }
    ]
  }
})

const openAppointmentPopup = () => {
  showAppointmentPopup.value = true
}
const closeAppointmentPopup = () => {
  showAppointmentPopup.value = false
}
const selectTimeframe = async (timeframe) => {
  await apiFetch(`/property-value/result/${result.value.id}/submit-appointment-preference`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timeframe })
  })
}

let debounceTimeout = null;

function handleOnScroll() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    apiFetch(`/property-value/result/${result.value.id}/updates`)
  }, 3000);
}

onMounted(() => {
  window.onbeforeunload = (e) => {
    e.preventDefault()
    e.returnValue = 'Sicher?'
  }

  window.addEventListener('scroll', handleOnScroll)
})
onUnmounted(() => {
  window.onbeforeunload = () => {}
  window.removeEventListener('scroll', handleOnScroll)
})
</script>

<template>
  <div class="page-location-nav-active margin-top property-value-result">
    <div class="inner">
      <div class="property-value-result-columns">
        <div class="property-value-result-content">
          <Headline
            :headline="`Bewertungsergebnis für ${result.request.firstName} ${result.request.lastName}`"
            :sub-headline="`Berechnung vom ${$d(new Date(result.createdAt), 'short')}`"
          />
          <div v-if="isTargetGroup" class="property-value-result-appointment-mobile">
            <PropertyValueResultAppointment @open-popup="openAppointmentPopup" />
          </div>
          <div class="property-value-result-content-section">
            <Headline
              headline="Beschreibende Merkmale"
              :level="2"
            />
            <TextArticle
              :paragraphs="[
                'Wir haben folgende Daten zu Ihrer Immobilie erfasst:'
              ]"
              small-margin
            />
            <PropertyValueResultTable
              :content="inputsTable"
            />
          </div>
          <div class="property-value-result-content-section">
            <Headline
              headline="Marktwert Ihrer Immobilie"
              :level="2"
            />
            <TextArticle
              :paragraphs="[
                'Der Wert Ihrer Immobilie wird basierend auf einer Analyse ähnlicher Immobilien wie folgt geschätzt:'
              ]"
              small-margin
            />
            <template v-if="isFailed">
              <PropertyValueResultTable :content="resultFailedTable" />
              <PropertyValueResultAppointmentSectionIncomplete
                  v-if="isTargetGroup"
                  @select-timeframe="selectTimeframe"
              />
            </template>
            <template v-else>
              <PropertyValueResultTable
                :content="resultPricePerSqmTable"
              />
              <PropertyValueResultTable
                :content="resultTable"
                @button-click="openAppointmentPopup"
              />
              <PropertyValueResultAppointmentSectionIncomplete
                  v-if="isTargetGroup"
                  @select-timeframe="selectTimeframe"
              />
              <TextArticle
                :paragraphs="[
                  `Diese Schätzung basiert auf den Marktdaten vom ${$d(new Date(result.createdAt), 'short')}.`,
                  `<b>Hinweis:</b> Unsere Marktpreisschätzung kann ein guter Orientierungspunkt sein, ersetzt aber nicht die Wertermittlung durch einen erfahrenen Experten. Wir können leider nicht alle Merkmale Ihrer Immobilie berücksichtigen.
                   <b>Daher ist es nicht ungewöhnlich, dass sich der tatsächlich am Markt zu erzielende Preis (Verkehrswert) in der Praxis um bis zu 20 Prozent und mehr vom errechneten Wert unterscheidet.</b>
                   ${isTargetGroup ? 'Gerne unterstützen wir Sie in einem persönlichen Telefonat bei der genauen Wertermittlung.' : ''}
                  `
                ]"
                small-margin
                use-raw-html
              />
            </template>
          </div>
        </div>
        <div v-if="isTargetGroup" class="property-value-result-appointment-desktop">
          <PropertyValueResultAppointment @open-popup="openAppointmentPopup" />
        </div>
      </div>
    </div>
    <LocationDisclaimer />
    <PropertyValueResultAppointmentPopup
      v-if="showAppointmentPopup"
      @select-timeframe="selectTimeframe"
      @close="closeAppointmentPopup"
    />
  </div>
</template>

<style scoped lang="scss">
.property-value-result {
  margin-top: 130px;

  .property-value-result-columns {
    padding-bottom: 60px;

    @media #{$lg} {
      display: flex;
      align-items: flex-start;
    }

    .property-value-result-content {
      flex-grow: 1;

      .property-value-result-content-section {
        margin: 80px 0;

        &:first-child {
          margin-top: 0;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }

      .property-value-result-table-add-values-text {
        margin-top: 20px;
        margin-bottom: 10px;
      }

      .property-value-result-footnote {
        font-size: 80%;
      }
    }

    .property-value-result-appointment-mobile {

      @media #{$lg} {
        display: none;
      }
    }

    .property-value-result-appointment-desktop {
      display: none;
      position: sticky;
      top: 100px;
      width: 350px;
      flex-shrink: 0;
      margin-left: 40px;

      @media #{$lg} {
        display: block;
      }
    }
  }

  .property-value-result-failed {
    background-color: $colorLightGreyBg;
    padding: 20px;
  }
}
</style>
