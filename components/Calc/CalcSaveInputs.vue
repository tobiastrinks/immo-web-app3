<script setup>
import {useCalcStore} from "~/store/calc.js";

const calc = useCalc()
const calcStore = useCalcStore()
const nuxtApp = useNuxtApp()
const router = useRouter()
const route = useRoute()

const showErrors = ref(false)

const inputErrorLabelKey = computed(() => {
  const { saveInputsOverwriteId, saveInputsLabel, propertyCalculations } = calcStore
  if (saveInputsOverwriteId !== 'NEW') {
    return null
  } else if (!saveInputsLabel) {
    return 'calc.saveInputs.labelCannotBeEmptyError'
  } else if (propertyCalculations.map(p => p.label).includes(saveInputsLabel)) {
    return 'calc.saveInputs.labelAlreadyInUseError'
  } else {
    return null
  }
})
const overwriteIdOptions = computed(() => {
  const existingCalculations = calcStore.propertyCalculations
      .map(propertyCalculation => ({
        value: propertyCalculation._id,
        label: propertyCalculation.label
      }))
  return [
    ...existingCalculations,
    {
      value: 'NEW',
      label: 'neue Berechnung'
    }
  ]
})
const isOverwrite = computed(() => {
  return calcStore.saveInputsOverwriteId !== 'NEW'
})
const outputsVisible = computed(() => {
  return !!calcStore.activeOutput
})

const throwErrors = () => {
  showErrors.value = true
  nuxtApp.$toast.error(i18n.t(inputErrorLabelKey.value))
}
const openSavePopup = () => {
  calcStore.openSaveInputsPopup()
}
const close = () => {
  calcStore.showSaveInputsPopup = true
}
const submit = async () => {
  await calcStore.submitAndSave(calc, {
    overwriteId: isOverwrite.value
        ? calcStore.saveInputsOverwriteId
        : null,
    label: isOverwrite.value
        ? undefined
        : calcStore.saveInputsLabel
  })
  close()
  nuxtApp.$toast.success(nuxtApp.t('calc.saveConfirmation'))
  router.push({
    path: route.path,
    query: { loadsaved: '1' }
  })
}
</script>

<template>
  <div class="calc-save-inputs">
    <transition name="scale-fade">
      <Popup
          v-if="calcStore.showSaveInputsPopup"
          :title="$t('calc.saveInputs.savePopup.title')"
          @close="close"
      >
        <DropdownInput
            class="calc-save-inputs-field"
            :mutation="(val) => { calcStore.saveInputsOverwriteId = val }"
            :options="overwriteIdOptions"
            :value="calcStore.saveInputsOverwriteId"
            :placeholder="$t('calc.saveInputs.savePopup.dropdown')"
        />
        <InputSt
            v-if="!isOverwrite"
            class="calc-save-inputs-field"
            :mutation="(val) => { calcStore.saveInputsLabel = val }"
            :value="calcStore.saveInputsLabel"
            :toggle-errors="showErrors && !!inputErrorLabelKey"
            :placeholder="$t('calc.saveInputs.savePopup.name')"
        />
        <Button
            class="calc-save-inputs-button"
            :label="isOverwrite ? $t('calc.saveInputs.submitOverwrite') : $t('calc.saveInputs.submitNew')"
            active
            small
            no-scale-hover-effect
            :pending="calcStore.calculationPending"
            :disabled="!!inputErrorLabelKey"
            @click="submit"
            @disabledClick="throwErrors"
        />
      </Popup>
    </transition>
    <div class="calc-save-inputs-entry-section" :class="{ outputsVisible }">
      <Button
          :label="$t('calc.saveInputs.savePopup.submit')"
          no-scale-hover-effect
          :disabled="calcStore.errorItems.length > 0 || calcStore.calculationPending"
          @click="openSavePopup"
          @disabledClick="$emit('disabledSubmitClick')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.calc-save-inputs {

  @media #{$maxLg} {
    width: 48%;
    background-color: #fff;
  }

  .calc-save-inputs-field {
    width: 100%;
  }

  .calc-save-inputs-button {
    width: 100%;
    margin-top: 15px;
  }

  .calc-save-inputs-entry-section {

    @media #{$lg} {
      display: none;
    }
  }
}
</style>
