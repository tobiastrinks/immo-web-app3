<script setup>
import {useCalcStore} from "~/store/calc.js";
import useCalc from "~/composables/useCalc.js";

const nuxtApp = useNuxtApp()
const i18n = useI18n()
const calc = useCalc()
const calcStore = useCalcStore()

const showErrors = ref(false)

const inputErrorLabelKey = computed(() => {
  const { editSavedCalculationLabel, propertyCalculations } = calcStore

  if (!editSavedCalculationLabel) {
    return 'calc.editSavedCalculationLabel.labelCannotBeEmptyError'
  } else if (
      propertyCalculations
          .filter(p => p._id !== calcStore.editSavedCalculationId)
          .map(p => p.label)
          .includes(editSavedCalculationLabel)
  ) {
    return 'calc.editSavedCalculationLabel.labelAlreadyInUseError'
  } else {
    return null
  }
})
const select = (propertyCalculation) => {
  calcStore.setActivePropertyCalculation(propertyCalculation)
}
const edit = (propertyCalculation) => {
  calcStore.editSavedCalculationLabel = propertyCalculation.label
  calcStore.editSavedCalculationId = propertyCalculation._id
}
const throwErrors = () => {
  showErrors.value = true
  nuxtApp.$toast.error(i18n.t(inputErrorLabelKey.value))
}
const submit = async () => {
  await calcStore.submitAndSave(calc, {
    overwriteId: calcStore.editSavedCalculationId,
    label: calcStore.editSavedCalculationLabel
  })
  calcStore.editSavedCalculationId = null
}
const deleteClick = async () => {
  await calcStore.deletePropertyCalculation(calc, { id: calcStore.editSavedCalculationId })
  calcStore.editSavedCalculationId = null
}
</script>

<template>
  <transition name="scale-fade">
    <Popup
        class="calc-saved-calculations"
        v-if="calcStore.editSavedCalculationId"
        :title="$t('calc.saveInputs.editPopup.title')"
        @close="calcStore.editSavedCalculationId = null"
    >
      <InputSt
          class="calc-saved-calculations-edit-label-input"
          :mutation="(val) => { calcStore.editSavedCalculationLabel = val }"
          :value="calcStore.editSavedCalculationLabel"
          :toggle-errors="showErrors && !!inputErrorLabelKey"
          :placeholder="$t('calc.saveInputs.editPopup.label')"
      />
      <Button
          class="calc-saved-calculations-edit-label-submit"
          :label="$t('calc.saveInputs.editPopup.save')"
          active
          small
          :pending="calcStore.calculationPending || calcStore.deletePending"
          :disabled="!!inputErrorLabelKey"
          no-scale-hover-effect
          @enabledClick="submit"
          @disabledClick="throwErrors"
      />
      <p class="calc-saved-calculations-edit-delete-button" @click="deleteClick">
        {{ $t('calc.saveInputs.editPopup.delete') }}
      </p>
    </Popup>
  </transition>
</template>

<style scoped lang="scss">
.calc-saved-calculations {
  padding-top: 10px;

  .calc-saved-calculations-item {
    border: 1px solid #D8DCEE;
    border-radius: 4px;
    padding: 10px;
    margin: 5px 0;
    line-height: 1.4;
    display: flex;
    align-items: center;

    &.active {
      border: 2px solid $colorPrimary;
    }

    .calc-saved-calculations-item-content {
      flex-grow: 1;

      .calc-saved-calculations-item-label {
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .calc-saved-calculations-item-kpi {
        font-size: 80%;
      }
    }

    .calc-saved-calculations-item-edit {
      width: 16px;
      padding: 5px 3px;
      cursor: pointer;
    }
  }

  .calc-saved-calculations-save-button {
    margin-bottom: 5px;
  }

  .calc-saved-calculations-empty {
    margin: 15px 0;
  }

  .calc-saved-calculations-premium-info {
    line-height: 1.3;
    margin: 10px 0;
  }

  .calc-saved-calculations-button-note {
    font-size: 90%;
    line-height: 1.3;
    text-align: center;
    margin-top: 5px
  }

  .calc-saved-calculations-edit-label-input {
    width: 100%;
  }

  .calc-saved-calculations-edit-label-submit {
    width: 100%;
    margin-top: 15px;
  }

  .calc-saved-calculations-edit-delete-button {
    font-size: 85%;
    text-decoration: underline;
    margin: 5px auto 0;
    cursor: pointer;

    &:hover {
      color: $red;
    }
  }
}
</style>
