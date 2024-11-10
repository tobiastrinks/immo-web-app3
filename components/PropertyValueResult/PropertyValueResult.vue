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
const inputsTable = computed(() => {
  let artGrundstueck = result.value.request.artGrundstueck
  let erschliessung = result.value.request.erschliessung

  if (result.value.request.istBebaut === 'Ja') {
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
          result.value.request.istBebaut && [
            { text: 'Bebaut' },
            { text: result.value.request.istBebaut, bold: true }
          ]
        ].filter(i => !!i)
      },
      result.value.request.istBebaut === 'Ja' && {
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
            { text: 'Grundstücksfläche (ohne Bebauung)' },
            { text: `${pricePerSqmEstimateFrom} - ${pricePerSqmEstimateTo} €/m²`, bold: true }
          ],
          result.value.request.wohnflaeche && [
            { text: 'Wohnfläche' },
            { text: 'Weitere Angaben benötigt', bold: true }
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
            { text: 'Geschätzter Marktwert des Grundstücks<br /> (ohne Bebauung)' },
            { text: `${marketValueFrom} - ${marketValueTo} €`, bold: true }
          ],
          this.result.request.wohnflaeche && [
            { text: 'Wohnfläche' },
            { text: 'Weitere Angaben benötigt', bold: true }
          ],
          this.result.request.gewerbeflaeche && [
            { text: 'Gewerbefläche' },
            { text: 'Weitere Angaben benötigt', bold: true }
          ],
          [
            { text: 'Weitere Angaben machen und kostenlos Immobilie durch Experten bewerten lassen:', bold: true, paddingTop: 20 },
            { button: 'Weitere Angaben machen', paddingTop: 20 }
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
        subTitle: 'Es tut uns Leid! Leider könnten wir für Ihre Immobilie keinen Wert berechnen.',
        rows: [
          [
            { text: 'Fehler' },
            { text: failedStatusText[result.value.status] || result.value.status, bold: true }
          ],
          [
            { text: 'Sie möchten eine kostenlose Bewertung durch einen lokalen Immobilienexperten?', bold: true, paddingTop: 20 },
            { button: 'Exakten Wert ermitteln lassen', paddingTop: 20 }
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
</script>

<template>
  <div class="property-value-result">
    <div class="inner">
      <div class="property-value-result-columns">
        <div class="property-value-result-content">
          <Headline
            :headline="`Bewertungsergebnis für ${result.request.firstName} ${result.request.lastName}`"
            :sub-headline="`Berechnung vom ${$d(new Date(result.createdAt), 'short')}`"
          />
          <div class="property-value-result-appointment-mobile">
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
            <template v-if="!isFailed">
              <PropertyValueResultTable
                :content="resultPricePerSqmTable"
              />
              <PropertyValueResultTable
                :content="resultTable"
                @button-click="openAppointmentPopup"
              />
              <TextArticle
                :paragraphs="[
                  `Diese Schätzung basiert auf den Marktdaten vom ${$d(new Date(result.createdAt), 'short')}.`,
                  '<b>Hinweis:</b> Unsere Marktpreisschätzung kann ein guter Orientierungspunkt sein, ersetzt aber nicht die Wertermittlung durch einen erfahrenen Experten. Wir können leider nicht alle Merkmale Ihrer Immobilie berücksichtigen. <b>Daher ist es nicht ungewöhnlich, dass sich der tatsächlich am Markt zu erzielende Preis (Verkehrswert) in der Praxis um bis zu 20 Prozent und mehr vom errechneten Wert unterscheidet.</b> Gerne unterstützen wir Sie in einem persönlichen Telefonat bei der genauen Wertermittlung.'
                ]"
                small-margin
                use-raw-html
              />
            </template>
            <PropertyValueResultTable
              v-else
              :content="resultFailedTable"
              @button-click="openAppointmentPopup"
            />
          </div>
          <div v-if="!isFailed" class="property-value-result-content-section">
            <PropertyValueResultButtonBox :result="result" @button-click="openAppointmentPopup" />
          </div>
          <div class="property-value-result-content-section">
            <Headline
              headline="Kostenlose Expertenbewertung"
              :level="2"
            />
            <TextArticle
              :paragraphs="[
                'Unser kostenloser und unverbindlicher Service ermöglicht es Ihnen, bis zu drei Immobilienmakler kennenzulernen und eine professionelle Bewertung Ihrer Immobilie zu erhalten. Ziel ist es, Ihnen eine fundierte Einschätzung des aktuellen Marktwerts zu bieten – und das ganz ohne Verpflichtungen oder Kosten.'
              ]"
              small-margin
            />
            <BulletBox
              headline="So funktioniert der Service"
              :rows="[
                { number: '1.', text: '<b>Unverbindlich Makler kennenlernen:</b> Wir stellen Ihnen bis zu drei erfahrene Immobilienmakler vor, die für Ihr Objekt infrage kommen.' },
                { number: '2.', text: '<b>Kostenlose Bewertung:</b> Jeder Makler führt eine individuelle, professionelle Bewertung Ihrer Immobilie durch, basierend auf Marktdaten und seiner Expertise.' },
                { number: '3.', text: '<b>Entscheidungsfreiheit:</b> Nach der Bewertung können Sie in Ruhe entscheiden, ob und mit welchem Makler Sie zusammenarbeiten möchten – ohne jegliche Verpflichtung.' }
              ]"
            />
            <TextArticle
              headline="Vorteile der kostenlosen Bewertung"
              :paragraphs="[
                'Die Bewertung bietet Ihnen einen realistischen Überblick über den Marktwert Ihrer Immobilie. Dies hilft Ihnen, realistische Verkaufspreise zu ermitteln und die richtigen Entscheidungen zu treffen. Der gesamte Prozess ist für Sie risikofrei und kostenfrei, sodass Sie ohne Druck agieren können.'
              ]"
              small-inner-margin
            />
            <TextArticle
              headline="Warum bieten Makler diesen Service an?"
              :paragraphs="[
                'Makler bieten diesen Service an, um ihre Expertise zu demonstrieren und Vertrauen bei potenziellen Verkäufern aufzubauen. Ihr Ziel ist es, sich als verlässlicher Partner für einen möglichen Immobilienverkauf zu empfehlen. Für Sie bedeutet dies, dass der Makler sich von seiner besten Seite zeigt, ohne dabei Druck auszuüben – er möchte durch gute Beratung überzeugen.'
              ]"
              small-inner-margin
            />
            <TextArticle
              headline="Keine Verpflichtungen und kein Druck"
              :paragraphs="[
                'Wir verstehen, dass viele Verkäufer befürchten, nach der Bewertung zu einem Auftrag gedrängt zu werden. Daher garantieren wir, dass der Service völlig unverbindlich ist. Sie sind zu keinem Zeitpunkt verpflichtet, einen Makler zu beauftragen. Zudem versichern wir Ihnen, dass Sie nach der Bewertung nicht mit weiteren Anrufen oder E-Mails belästigt werden.'
              ]"
              small-inner-margin
            />
            <Button
              label="Kostenlose Expertenbewertung vereinbaren"
              active
              inline-block
              small
              @click="openAppointmentPopup"
            />
          </div>
          <p v-if="!isFailed" class="property-value-result-footnote">
            * Basierend auf einer von März 2017 bis März 2019 durchgeführten Analyse von auf ImmobilienScout24 inserierten Immobilien. Untersucht wurden die Vermarktungspreise von Immobilien mit dem Produkt Schaufenster, welches ausschließlich von Maklern gebucht werden kann, im Verhältnis zu vergleichbaren Standard-inserierten Objekten.
          </p>
        </div>
        <div class="property-value-result-appointment-desktop">
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
