<script setup>
import {useCalcStore} from "~/store/calc.js";
import {ITEM_TYPES} from "~/components/Calc/config.js";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  toggleErrors: {
    type: Boolean,
    default: false
  }
})

const calcStore = useCalcStore()

const info = computed(() => {
  return calcStore.fieldNotes[props.item.storeKey]
})

const errorText = computed(() => {
  const hasRelatedErrorItem = calcStore.errorItems
      .find(errorItem =>
          (errorItem.storeKey && errorItem.storeKey === props.item.storeKey) ||
          (errorItem.storeKeyPrefix && errorItem.storeKeyPrefix === props.item.storeKeyPrefix)
      )
  return hasRelatedErrorItem ? props.item.validationError : null
})
</script>

<template>
  <div
    class="calc-item"
    :class="props.item.layout || ''"
  >
    <InputSt
      v-if="props.item.type === ITEM_TYPES.INPUT"
      :type="props.item.inputType"
      :unit="props.item.unit"
      :placeholder="props.item.placeholder"
      :value="calcStore[props.item.storeKey]"
      :mutation="(val) => { calcStore[props.item.storeKey] = val }"
      :is-required="props.item.required"
      :validator="props.item.validator"
      :info="info"
      :toggle-errors="props.toggleErrors"
      :readonly="props.item.readonly"
      :data-calc-error="errorText"
    />
    <DropdownInput
      v-else-if="props.item.type === ITEM_TYPES.DROPDOWN"
      :placeholder="props.item.placeholder"
      :value="calcStore[props.item.storeKey]"
      :mutation="(val) => { calcStore[props.item.storeKey] = val }"
      :options="props.item.options"
      :validator="props.item.validator"
      :info="info"
      :toggle-errors="props.toggleErrors"
      :data-calc-error="errorText"
    />
    <CalcEditableList
      v-else-if="props.item.type === ITEM_TYPES.EDITABLE_LIST"
      :config="props.item"
      :show-error="props.toggleErrors && !!errorText"
      :data-calc-error="errorText"
    />
    <CalcSavedCalculations
      v-else-if="props.item.type === ITEM_TYPES.SAVED_CALCULATIONS"
      :config="props.item"
    />
  </div>
</template>

<style lang="scss">
.calc-item {
  width: 100%;

  &.twoColumns {
    width: 48%;
  }
}
</style>
