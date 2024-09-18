export const ITEM_TYPES = {
  INPUT: 'INPUT',
  DROPDOWN: 'DROPDOWN',
  EDITABLE_LIST: 'EDITABLE_LIST',
  SAVED_CALCULATIONS: 'SAVED_CALCULATIONS'
}

const isNotNullOrBlank = v => !!v

export const CALC_CONFIG = {
  sections: [
    {
      title: 'Meine gespeicherten Berechnungen',
      subsections: [
        {
          title: 'Meine gespeicherten Berechnungen',
          items: [
            {
              type: ITEM_TYPES.SAVED_CALCULATIONS,
              renderItemSubTitle: (input, i18n) => `${i18n.n(input.kaufpreis, { maximumFractionDigits: 0 })} €`
            }
          ]
        }
      ]
    },
    {
      title: 'Basisdaten',
      subsections: [
        {
          title: 'Einmalkosten',
          items: [
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Kaufpreis',
              storeKey: 'kaufpreis',
              validator: isNotNullOrBlank,
              validationError: 'Bitte Kaufpreis angeben!'
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Kosten Wertgutachten',
              storeKey: 'wertgutachten'
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Renovierung',
              storeKey: 'renovierung'
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Umbau',
              storeKey: 'umbau'
            }
          ]
        },
        {
          title: '%-Sätze Kaufnebenkosten',
          items: [
            {
              type: ITEM_TYPES.DROPDOWN,
              options: [
                { value: 'badenWuerttemberg', label: 'Baden-Württemberg' },
                { value: 'bayern', label: 'Bayern' },
                { value: 'berlin', label: 'Berlin' },
                { value: 'brandenburg', label: 'Brandenburg' },
                { value: 'bremen', label: 'Bremen' },
                { value: 'hamburg', label: 'Hamburg' },
                { value: 'hessen', label: 'Hessen' },
                { value: 'mecklenburgVorpommern', label: 'Mecklenburg-Vorpommern' },
                { value: 'niedersachsen', label: 'Niedersachsen' },
                { value: 'nordrheinWestfalen', label: 'Nordrhein-Westfalen' },
                { value: 'rheinlandPfalz', label: 'Rheinland-Pfalz' },
                { value: 'saarland', label: 'Saarland' },
                { value: 'sachsen', label: 'Sachsen' },
                { value: 'sachsenAnhalt', label: 'Sachsen-Anhalt' },
                { value: 'schleswigHolstein', label: 'Schleswig-Holstein' },
                { value: 'thueringen', label: 'Thüringen' }
              ],
              placeholder: 'Bundesland',
              storeKey: 'bundesland',
              validator: isNotNullOrBlank,
              validationError: 'Bundesland wird benötigt um die Grunderwerbssteuer zu berechnen.'
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Grunderwerbssteuer',
              storeKey: 'grunderwerbssteuer',
              readonly: true,
              validator: isNotNullOrBlank
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Notar',
              storeKey: 'notar',
              validator: isNotNullOrBlank
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Maklerprovision',
              storeKey: 'maklerprovision'
            }
          ]
        },
        {
          title: 'Bewirtschaftungskosten',
          items: [
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Verwaltungskosten pro Wohneinheit p.a.',
              storeKey: 'verwaltungskostenProEinheit'
            },
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Instandhaltungskosten pro m2 p.a.',
              storeKey: 'instandhaltungskosten'
            },
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Indexierung Bewirtschaftungskosten',
              storeKey: 'indexierungBewirtschaftungskosten'
            }
          ]
        }
      ]
    },
    {
      title: 'Mieterliste',
      subsections: [
        {
          title: 'Wohneinheiten',
          items: [
            {
              type: ITEM_TYPES.EDITABLE_LIST,
              storeKeyPrefix: 'wohnungen',
              minCount: 1,
              maxCount: 20,
              validationError: 'Bitte fügen Sie mindestens eine Wohneinheit hinzu.',
              emptyText: 'Bitte fügen Sie eine Wohneinheit hinzu.',
              addText: 'Wohnung hinzufügen',
              addTextSub: '(Wohnfläche, Miete, Beschreibung)',
              formTitle: {
                create: 'Wohneinheit hinzufügen',
                edit: 'Wohneinheit bearbeiten'
              },
              formButton: {
                createSubmit: 'Hinzufügen',
                editSubmit: 'Speichern',
                editDelete: 'Wohneinheit entfernen'
              },
              formItems: [
                {
                  layout: 'twoColumns',
                  type: ITEM_TYPES.INPUT,
                  inputType: 'FLOAT',
                  unit: 'm²',
                  validator: isNotNullOrBlank,
                  placeholder: 'Wohnfläche in m²',
                  storeKey: 'wohnungen__formField__groesse'
                },
                {
                  layout: 'twoColumns',
                  type: ITEM_TYPES.INPUT,
                  inputType: 'FLOAT',
                  unit: '€',
                  validator: isNotNullOrBlank,
                  placeholder: 'Monatliche Miete pro m²',
                  storeKey: 'wohnungen__formField__mieteProM2'
                },
                {
                  type: ITEM_TYPES.INPUT,
                  inputType: 'TEXT',
                  validator: isNotNullOrBlank,
                  placeholder: 'Beschreibung (z.B. 3.OG links)',
                  storeKey: 'wohnungen__formField__beschreibung'
                }
              ],
              item: {
                renderTitle: item => item.beschreibung,
                renderSubTitle: (item, i18n) => `${item.groesse} m² | ${i18n.n(item.mieteProM2, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} €/m²/Monat`
              }
            }
          ]
        },
        {
          title: 'Stellplätze (optional)',
          items: [
            {
              type: ITEM_TYPES.EDITABLE_LIST,
              storeKeyPrefix: 'stellplaetze',
              maxCount: 10,
              addText: 'Stellplatz hinzufügen',
              addTextSub: '(Miete, Beschreibung)',
              formTitle: {
                create: 'Stellplatz hinzufügen',
                edit: 'Stellplatz bearbeiten'
              },
              formButton: {
                createSubmit: 'Hinzufügen',
                editSubmit: 'Speichern',
                editDelete: 'Stellplatz entfernen'
              },
              formItems: [
                {
                  type: ITEM_TYPES.INPUT,
                  inputType: 'FLOAT',
                  unit: '€',
                  validator: isNotNullOrBlank,
                  placeholder: 'Monatliche Miete',
                  storeKey: 'stellplaetze__formField__miete'
                },
                {
                  type: ITEM_TYPES.INPUT,
                  inputType: 'TEXT',
                  validator: isNotNullOrBlank,
                  placeholder: 'Beschreibung',
                  storeKey: 'stellplaetze__formField__beschreibung'
                }
              ],
              item: {
                renderTitle: item => item.beschreibung,
                renderSubTitle: (item, i18n) => `${i18n.n(item.miete, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} €/m²/Monat`
              }
            }
          ]
        },
        {
          title: 'Indexierung und Mietausfallwagnis',
          items: [
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Indexierung Mieteinnahmen',
              storeKey: 'indexierungMieteinnahmen'
            },
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Mietausfallwagnis',
              storeKey: 'mietausfallwagnis'
            }
          ]
        }
      ]
    },
    {
      title: 'Finanzierung',
      subsections: [
        {
          title: 'Kreditbedarf (Annuitätendarlehen)',
          items: [
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Eigenkapital',
              storeKey: 'eigenkapital',
              validator: isNotNullOrBlank
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Kfw-Förderung',
              storeKey: 'kfwFoerderung'
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Zinssatz nominal p.a.',
              storeKey: 'zinssatzNominal',
              validator: isNotNullOrBlank
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Anfängliche Tilgung p.a.',
              storeKey: 'anfaenglicheTilgung',
              validator: isNotNullOrBlank
            },
            {
              layout: 'twoColumns',
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Jährliche Sondertilgung',
              storeKey: 'jaehrlicheSondertilgung'
            }
          ]
        }
      ]
    },
    {
      title: 'Außerordentliche Kosten (optional)',
      subsections: [
        {
          items: [
            {
              type: ITEM_TYPES.EDITABLE_LIST,
              storeKeyPrefix: 'extraKosten',
              emptyText: 'Sie können für jedes Jahr außerordentliche Kosten hinzufügen, die Sie berücksichtigen möchten.',
              addText: 'Kosten hinzufügen',
              addTextSub: '(Jahr, Betrag, Beschreibung)',
              formTitle: {
                create: 'Kosten hinzufügen',
                edit: 'Kosten bearbeiten'
              },
              formButton: {
                createSubmit: 'Hinzufügen',
                editSubmit: 'Speichern',
                editDelete: 'Kostenstelle entfernen'
              },
              orderBy: 'jahr',
              formItems: [
                {
                  layout: 'twoColumns',
                  type: ITEM_TYPES.DROPDOWN,
                  options: [
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                    { value: 6, label: '6' },
                    { value: 7, label: '7' },
                    { value: 8, label: '8' },
                    { value: 9, label: '9' },
                    { value: 10, label: '10' }
                  ],
                  placeholder: 'Jahr',
                  storeKey: 'extraKosten__formField__jahr',
                  validator: isNotNullOrBlank
                },
                {
                  layout: 'twoColumns',
                  type: ITEM_TYPES.INPUT,
                  inputType: 'FLOAT',
                  unit: '€',
                  validator: isNotNullOrBlank,
                  placeholder: 'Betrag',
                  storeKey: 'extraKosten__formField__betrag'
                },
                {
                  type: ITEM_TYPES.INPUT,
                  inputType: 'TEXT',
                  validator: isNotNullOrBlank,
                  placeholder: 'Beschreibung (z.B. Renovierung Küche)',
                  storeKey: 'extraKosten__formField__beschreibung'
                }
              ],
              item: {
                renderTitle: item => item.beschreibung,
                renderSubTitle: (item, i18n) => `Jahr ${item.jahr} | ${i18n.n(item.betrag)} €`
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Steuern',
      subsections: [
        {
          title: 'Abschreibungen',
          items: [
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: 'm²',
              placeholder: 'Grundstücksgröße (anteilig)',
              storeKey: 'grundstuecksgroesse'
            },
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '€',
              placeholder: 'Bodenrichtwert pro m2',
              storeKey: 'bodenrichtwertProM2'
            },
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Abschreibungssatz Gebäude',
              storeKey: 'abschreibungssatz'
            }
          ]
        },
        {
          title: 'Persönlicher Grenzsteuersatz',
          items: [
            {
              type: ITEM_TYPES.INPUT,
              inputType: 'FLOAT',
              unit: '%',
              placeholder: 'Persönlicher Grenzsteuersatz',
              storeKey: 'persoenlicherSteuersatz',
              validator: isNotNullOrBlank
            }
          ]
        }
      ]
    }
  ]
}
