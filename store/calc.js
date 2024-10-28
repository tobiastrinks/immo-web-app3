import {defineStore} from "pinia";
import {CALC_CONFIG, ITEM_TYPES} from "~/components/Calc/config.js";

const DEFAULT_INPUTS = {
    kaufpreis: 100000,
    wertgutachten: 0,
    renovierung: 0,
    umbau: 0,
    bundesland: null,
    grunderwerbssteuer: 0,
    notar: 0.015,
    maklerprovision: 0,
    verwaltungskostenProEinheit: 0,
    instandhaltungskosten: 0,
    indexierungBewirtschaftungskosten: 0.015,
    indexierungMieteinnahmen: 0.015,
    mietausfallwagnis: 0.02,
    eigenkapital: 10000,
    kfwFoerderung: 0,
    zinssatzNominal: 0.015,
    anfaenglicheTilgung: 0.03,
    jaehrlicheSondertilgung: 0,
    grundstuecksgroesse: 0,
    bodenrichtwertProM2: 0,
    abschreibungssatz: 0.02,
    persoenlicherSteuersatz: 0.42,

    wohnungen__form__active: false,
    wohnungen__form__editIndex: null,
    wohnungen__form__toggleErrors: false,
    wohnungen__formField__groesse: 0,
    wohnungen__formField__mieteProM2: 0,
    wohnungen__formField__beschreibung: '',
    wohnungen: [],

    stellplaetze__form__active: false,
    stellplaetze__form__editIndex: null,
    stellplaetze__form__toggleErrors: false,
    stellplaetze__formField__miete: 0,
    stellplaetze__formField__beschreibung: '',
    stellplaetze: [],

    extraKosten__form__active: false,
    extraKosten__form__editIndex: null,
    extraKosten__form__toggleErrors: false,
    extraKosten__formField__jahr: '',
    extraKosten__formField__betrag: 0,
    extraKosten__formField__beschreibung: '',
    extraKosten: [],

    showErrorsGlobally: false
}

const DEFAULT_STATE = {
    ...DEFAULT_INPUTS,

    mieteinnahmenPa: 4000, // calcSEO page, unused for calculator

    infoPopupTitle: null,
    infoPopupDescription: null,

    calculationPending: false,
    deletePending: false,

    fieldNotes: null,

    propertyCalculations: [],
    activePropertyCalculationId: null,

    saveInputsOverwriteId: 'NEW',
    saveInputsLabel: '',

    showSaveInputsPopup: false,
    editSavedCalculationLabel: '',

    transientOutput: null,

    freshCalculationCancelPropertyCalculation: null
}

export const useCalcStore = defineStore('calc', {
    state: () => ({
        ...DEFAULT_STATE
    }),
    getters: {
        activePropertyCalculation ({ propertyCalculations, activePropertyCalculationId }) {
            return propertyCalculations.find(i => i._id === activePropertyCalculationId)
        },
        activePropertyCalculationWasChanged (state) {
            const { activePropertyCalculation } = this
            return !activePropertyCalculation
                ? false
                : !!Object.entries(activePropertyCalculation.input)
                    .find(([key, value]) => JSON.stringify(state[key]) !== JSON.stringify(value))
        },
        activeOutput ({ transientOutput }) {
            return transientOutput
        },
        errorItems (state) {
            return CALC_CONFIG.sections
                .flatMap(s => s.subsections
                    .flatMap(sub => sub.items
                        .flatMap((item) => {
                            switch (item.type) {
                                case ITEM_TYPES.INPUT:
                                case ITEM_TYPES.DROPDOWN:
                                    if (
                                        typeof item.validator === 'function' &&
                                        !item.validator(state[item.storeKey]) &&
                                        !item.readonly
                                    ) {
                                        return item
                                    }
                                    break
                                case ITEM_TYPES.EDITABLE_LIST:
                                    if (
                                        item.minCount &&
                                        state[item.storeKeyPrefix].length < item.minCount
                                    ) {
                                        return item
                                    }
                            }
                            return []
                        })
                    )
                )
        },
        submissionData ({
            kaufpreis,
            wertgutachten,
            renovierung,
            umbau,
            bundesland,
            grunderwerbssteuer,
            notar,
            maklerprovision,
            verwaltungskostenProEinheit,
            instandhaltungskosten,
            indexierungBewirtschaftungskosten,
            indexierungMieteinnahmen,
            mietausfallwagnis,
            eigenkapital,
            kfwFoerderung,
            zinssatzNominal,
            anfaenglicheTilgung,
            jaehrlicheSondertilgung,
            grundstuecksgroesse,
            bodenrichtwertProM2,
            abschreibungssatz,
            persoenlicherSteuersatz,
            wohnungen,
            stellplaetze,
            extraKosten
        }) {
            return {
                kaufpreis,
                wertgutachten,
                renovierung,
                umbau,
                bundesland,
                grunderwerbssteuer,
                notar,
                maklerprovision,
                verwaltungskostenProEinheit,
                instandhaltungskosten,
                indexierungBewirtschaftungskosten,
                indexierungMieteinnahmen,
                mietausfallwagnis,
                eigenkapital,
                kfwFoerderung,
                zinssatzNominal,
                anfaenglicheTilgung,
                jaehrlicheSondertilgung,
                grundstuecksgroesse,
                bodenrichtwertProM2,
                abschreibungssatz,
                persoenlicherSteuersatz,
                wohnungen,
                stellplaetze,
                extraKosten
            }
        }
    },
    actions: {
        resetInputs() {
            Object.entries(DEFAULT_INPUTS).forEach(([key, value]) => {
                this[key] = value
            })
        },
        async submitTransient (calc) {
            this.calculationPending = true
            const transientPropertyCalculation = await calc.submitTransient(this.submissionData)
            this.transientOutput = transientPropertyCalculation.cachedResult
            this.calculationPending = false
            this.freshCalculationCancelPropertyCalculation = null
        },
        addPropertyCalculation(propertyCalculation) {
            const updated = this.propertyCalculations.slice()
            updated.push(propertyCalculation)
            this.propertyCalculations = updated
        },
        updatePropertyCalculation(propertyCalculation) {
            const updated = this.propertyCalculations.slice()
            const index = updated.findIndex(i => i._id === propertyCalculation._id)
            updated[index] = propertyCalculation
            this.propertyCalculations = updated
        },
        setActivePropertyCalculation(propertyCalculation) {
            this.activePropertyCalculationId = propertyCalculation._id
            this.transientOutput = propertyCalculation.cachedResult
            Object.entries(propertyCalculation.input).forEach(([key, value]) => {
                this[key] = value
            })
        },
        async submitAndSave (calc, { overwriteId, label }) {
            this.calculationPending = true
            let propertyCalculation
            if (overwriteId) {
                propertyCalculation = await calc.overwriteSaved(overwriteId, this.submissionData, label)
                this.updatePropertyCalculation(propertyCalculation)
            } else {
                propertyCalculation = await calc.saveNew(this.submissionData, label)
                this.addPropertyCalculation(propertyCalculation)
            }
            this.setActivePropertyCalculation(propertyCalculation)
            this.calculationPending = false
            this.freshCalculationCancelPropertyCalculation = null
            window.scrollTo({ top: 0, left: 0 })
        },
        async loadMyPropertyCalculations (calc) {
            this.propertyCalculations = await calc.getAll()
        },
        async deletePropertyCalculation (calc, { id }) {
            this.deletePending = true
            await calc.deleteOne(id)

            const updated = this.propertyCalculations.slice()
            const index = updated.findIndex(i => i._id === id)
            updated.splice(index, 1)
            this.propertyCalculations = updated

            this.deletePending = false
        },
        async loadFieldNotes (calc) {
            this.fieldNotes = await calc.getFieldNotes()
        },
        openSaveInputsPopup () {
            if (this.activePropertyCalculation && this.propertyCalculations.map(c => c._id).includes(this.activePropertyCalculation._id)) {
                this.saveInputsOverwriteId = this.activePropertyCalculation._id
            } else {
                this.saveInputsOverwriteId = 'NEW'
            }
            this.saveInputsLabel = ''
            this.showSaveInputsPopup = true
        },
        startFreshCalculation ({ noCancel, noInputReset } = {}) {
            if (!noCancel) {
                if (this.activePropertyCalculation) {
                    this.freshCalculationCancelPropertyCalculation = this.activePropertyCalculation
                } else {
                    this.freshCalculationCancelPropertyCalculation = {
                        input: this.submissionData,
                        transientOutput: this.transientOutput
                    }
                }
            }
            this.activePropertyCalculationId = null
            this.transientOutput = null
            if (!noInputReset) {
                this.resetInputs()
            }
        },
        cancelFreshCalculation () {
            const { freshCalculationCancelPropertyCalculation } = this
            if (freshCalculationCancelPropertyCalculation._id) {
                this.setActivePropertyCalculation(freshCalculationCancelPropertyCalculation)
            } else {
                this.setTransientPropertyCalculation(freshCalculationCancelPropertyCalculation)
            }
            this.freshCalculationCancelPropertyCalculation = null
        },
        setTransientPropertyCalculation(transientPropertyCalculation) {
            this.transientOutput = transientPropertyCalculation.transientOutput
            Object.entries(transientPropertyCalculation.input).forEach(([key, value]) => {
                this[key] = value
            })
        },
        showInfoPopup({ title, description }) {
            this.infoPopupTitle = title
            this.infoPopupDescription = description
        },
        hideInfoPopup() {
            this.infoPopupTitle = null
            this.infoPopupDescription = null
        },
        initEditableListForm({ storeKeyPrefix, editIndex }) {
            this[`${storeKeyPrefix}__form__editIndex`] = editIndex
            this[`${storeKeyPrefix}__form__active`] = true

            if (!isNaN(editIndex)) {
                Object.keys(this).filter(k => k.startsWith(`${storeKeyPrefix}__formField`))
                    .forEach((key) => {
                        this[key] = this[storeKeyPrefix][editIndex][key.replace(`${storeKeyPrefix}__formField__`, '')]
                    })
            }
        },
        hideEditableListForm({ storeKeyPrefix }) {
            this[`${storeKeyPrefix}__form__active`] = false

            if (!isNaN(this[`${storeKeyPrefix}__form__editIndex`])) {
                resetEditableListForm(this, storeKeyPrefix)
            }
        },
        toggleEditableListFormErrors({ storeKeyPrefix }) {
            this[`${storeKeyPrefix}__form__toggleErrors`] = true
        },
        submitEditableListForm({ storeKeyPrefix }) {
            const item = {}
            Object.keys(this).filter(k => k.startsWith(`${storeKeyPrefix}__formField`))
                .forEach((key) => {
                    item[key.replace(`${storeKeyPrefix}__formField__`, '')] = this[key]
                })

            const editIndex = this[`${storeKeyPrefix}__form__editIndex`]
            if (isNaN(editIndex)) {
                this[storeKeyPrefix] = [...this[storeKeyPrefix], item]
            } else {
                const items = this[storeKeyPrefix].slice()
                items[editIndex] = item
                this[storeKeyPrefix] = items
            }

            resetEditableListForm(this, storeKeyPrefix)
            this[`${storeKeyPrefix}__form__active`] = false
        },
        deleteEditableListFormItem({ storeKeyPrefix }) {
            const editIndex = this[`${storeKeyPrefix}__form__editIndex`]
            if (!isNaN(editIndex)) {
                const items = this[storeKeyPrefix].slice()
                items.splice(editIndex, 1)
                this[storeKeyPrefix] = items

                resetEditableListForm(this, storeKeyPrefix)
                this[`${storeKeyPrefix}__form__active`] = false
            }
        },
        setShowErrorsGlobally() {
            this.showErrorsGlobally = true
        },
    }
})

function resetEditableListForm (state, storeKeyPrefix) {
    Object.keys(state).filter(k => k.startsWith(`${storeKeyPrefix}__formField`))
        .forEach((key) => {
            state[key] = DEFAULT_STATE[key]
        })
}
