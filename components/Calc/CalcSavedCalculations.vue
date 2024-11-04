<script setup>
import {useCalcStore} from "~/store/calc.js";
import useCalc from "~/composables/useCalc.js";

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const nuxtApp = useNuxtApp()
const i18n = useI18n()
const calc = useCalc()
const calcStore = useCalcStore()

const editSavedCalculationId = ref(null)
const showErrors = ref(false)

const isPremium = true // TODO

const propertyCalculations = computed(() => {
  return calcStore.propertyCalculations
})
const inputErrorLabelKey = computed(() => {
  const { editSavedCalculationLabel, propertyCalculations } = calcStore

  if (!editSavedCalculationLabel) {
    return 'calc.editSavedCalculationLabel.labelCannotBeEmptyError'
  } else if (
      propertyCalculations
          .filter(p => p._id !== editSavedCalculationId.value)
          .map(p => p.label)
          .includes(editSavedCalculationLabel)
  ) {
    return 'calc.editSavedCalculationLabel.labelAlreadyInUseError'
  } else {
    return null
  }
})
const activePropertyCalculation = computed(() => {
  return calcStore.activePropertyCalculation
})
const activePropertyCalculationWasChanged = computed(() => {
  return calcStore.activePropertyCalculationWasChanged
})

const isActive = (propertyCalculation) => {
  return (
      propertyCalculation._id === calcStore.activePropertyCalculation?._id &&
      !calcStore.activePropertyCalculationWasChanged
  )
}
const select = (propertyCalculation) => {
  calcStore.setActivePropertyCalculation(propertyCalculation)
}
const edit = (propertyCalculation) => {
  calcStore.editSavedCalculationLabel(propertyCalculation.label)
  editSavedCalculationId.value = propertyCalculation._id
}
const throwErrors = () => {
  showErrors.value = true
  nuxtApp.$toast.error(i18n.t(inputErrorLabelKey.value))
}
const submit = async () => {
  await calcStore.submitAndSave(calc, {
    overwriteId: editSavedCalculationId.value,
    label: calcStore.editSavedCalculationLabel
  })
  editSavedCalculationId.value = null
}
const deleteClick = async () => {
  await calcStore.deletePropertyCalculation(calc, { id: editSavedCalculationId.value })
  editSavedCalculationId.value = null
}
const showSaveConfirmation = () => {
  nuxtApp.$toast.success(i18n.t('calc.saveConfirmation'))
}
</script>

<template>
  <div class="calc-saved-calculations">
    <template v-if="propertyCalculations.length">
      <div
        v-for="(calc, index) of propertyCalculations"
        :key="index"
        class="calc-saved-calculations-item"
        :class="{ active: isActive(calc) }"
        @click="select(calc)"
      >
        <div class="calc-saved-calculations-item-content">
          <p class="calc-saved-calculations-item-label">
            {{ calc.label }}
          </p>
          <div class="calc-saved-calculations-item-kpi">
            {{ config.renderItemSubTitle(calc.input, i18n) }}
          </div>
        </div>
        <img
          src="@/assets/img/_shared/font-awesome/pencil-solid.svg"
          class="calc-saved-calculations-item-edit"
          @click="edit(calc)"
        />
      </div>
    </template>
    <template v-else>
      <p class="calc-saved-calculations-empty">
        {{ $t('calc.savedCalculations.empty') }}
      </p>
      <template v-if="!isPremium">
        <p class="calc-saved-calculations-premium-info">
          {{ $t('calc.savedCalculations.premiumInfo') }}
        </p>
        <Button
          :label="$t('calc.savedCalculations.ctaButton')"
          active
        />
        <p
          class="calc-saved-calculations-button-note"
          v-html="$t('calc.savedCalculations.ctaButtonNote')"
        ></p>
      </template>
    </template>
    <Button
      class="calc-saved-calculations-save-button"
      :label="$t('calc.output.head.saveButton')"
      no-scale-hover-effect
      inline-block
      active
      small
      :disabled="!activePropertyCalculationWasChanged && !!activePropertyCalculation"
      @click="calcStore.openSaveInputsPopup"
      @disabledClick="showSaveConfirmation"
    />
    <Button
      :label="$t('calc.output.head.newButton')"
      no-scale-hover-effect
      active-border
      inline-block
      small
      @click="calcStore.startFreshCalculation"
    />
    <transition name="scale-fade">
      <Popup
        v-if="editSavedCalculationId"
        :title="$t('calc.saveInputs.editPopup.title')"
        @close="editSavedCalculationId = null"
      >
        <InputSt
          class="calc-saved-calculations-edit-label-input"
          mutation="calc/SET_EDIT_SAVED_CALCULATION_LABEL"
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
          @click="submit"
          @disabledClick="throwErrors"
        />
        <p class="calc-saved-calculations-edit-delete-button" @click="deleteClick">
          {{ $t('calc.saveInputs.editPopup.delete') }}
        </p>
      </Popup>
    </transition>
  </div>
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
