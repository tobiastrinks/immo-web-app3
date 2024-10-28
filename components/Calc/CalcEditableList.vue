<script setup>
import {useCalcStore} from "~/store/calc.js";

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  showError: {
    type: Boolean,
    default: false
  }
})

const calcStore = useCalcStore()
const i18n = useI18n()

const isEdit = computed(() => {
  const editIndex = calcStore[`${props.config.storeKeyPrefix}__form__editIndex`]
  return !isNaN(editIndex)
})
const formTitle = computed(() => {
  return isEdit.value
      ? props.config.formTitle.edit
      : props.config.formTitle.create
})
const formSubmitButtonLabel = computed(() => {
  return isEdit.value
      ? props.config.formButton.editSubmit
      : props.config.formButton.createSubmit
})
const formActive = computed(() => {
  return calcStore[`${props.config.storeKeyPrefix}__form__active`]
})
const formToggleErrors = computed(() => {
  return calcStore[`${props.config.storeKeyPrefix}__form__toggleErrors`]
})
const formValid = computed(() => {
  const invalidItem = props.config.formItems.find((i) => {
    if (i.validator) {
      return !i.validator(calcStore[i.storeKey])
    } else {
      return false
    }
  })
  return !invalidItem
})
const items = computed(() => {
  const items = calcStore[props.config.storeKeyPrefix]
  if (props.config.orderBy) {
    return items.slice().sort((a, b) => a[props.config.orderBy] > b[props.config.orderBy] ? 1 : -1)
  } else {
    return items
  }
})
const maxCountReached = computed(() => {
  return items.value.length === props.config.maxCount
})

const add = () => {
  const { storeKeyPrefix } = props.config
  calcStore.initEditableListForm({ storeKeyPrefix })
}
const edit = (editIndex) => {
  const { storeKeyPrefix } = props.config
  calcStore.initEditableListForm({ storeKeyPrefix, editIndex })
}
const disabledSubmitClick = () => {
  const { storeKeyPrefix } = props.config
  calcStore.toggleEditableListFormErrors({ storeKeyPrefix })
}
const submitClick = () => {
  const { storeKeyPrefix } = props.config
  calcStore.submitEditableListForm({ storeKeyPrefix })
}
const deleteClick = () => {
  const { storeKeyPrefix } = props.config
  calcStore.deleteEditableListFormItem({ storeKeyPrefix })
}
const hideForm = () => {
  const { storeKeyPrefix } = props.config
  calcStore.hideEditableListForm({ storeKeyPrefix })
}
</script>

<template>
  <div>
    <div class="calc-editable-list">
      <p v-if="props.config.emptyText" class="calc-editable-list-empty" :class="{ showError }">
        {{ props.config.emptyText }}
      </p>
      <CalcEditableListItem
        v-for="(item, index) in items"
        :key="index"
        :title="props.config.item.renderTitle(item)"
        :sub-title="props.config.item.renderSubTitle(item, i18n)"
        @edit="edit(index)"
      />
      <div v-if="!maxCountReached" class="calc-editable-list-add" @click="add">
        <p class="calc-editable-list-add-plus">
          +
        </p>
        <div>
          <p class="calc-editable-list-add-main">
            {{ props.config.addText }}
          </p>
          <p class="calc-editable-list-add-sub">
            {{ props.config.addTextSub }}
          </p>
        </div>
      </div>
    </div>
    <transition name="scale-fade">
      <Popup
        v-if="formActive"
        :title="formTitle"
        @close="hideForm"
      >
        <CalcItem
          v-for="(item, idx) in props.config.formItems"
          :key="idx"
          :item="item"
          :toggle-errors="formToggleErrors"
        />
        <Button
          class="calc-editable-list-form-button"
          :label="formSubmitButtonLabel"
          :disabled="!formValid"
          active
          small
          no-scale-hover-effect
          @disabledClick="disabledSubmitClick"
          @click="submitClick"
        />
        <p v-if="isEdit" class="calc-editable-list-form-button-delete" @click="deleteClick">
          {{ props.config.formButton.editDelete }}
        </p>
      </Popup>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.calc-editable-list {
  padding-top: 10px;

  .calc-editable-list-empty {
    font-weight: 500;
    margin-bottom: 10px;

    &.showError {
      color: $red;
    }
  }

  .calc-editable-list-add {
    margin-top: 10px;
    color: $colorPrimary;
    display: flex;
    line-height: 1.4;
    cursor: pointer;

    &:hover {
      opacity: .8;
    }

    .calc-editable-list-add-plus {
      font-weight: 500;
      margin-right: 5px;
    }

    .calc-editable-list-add-main {
      font-weight: 500;
    }

    .calc-editable-list-add-sub {
      font-size: 80%;
    }
  }
}

.calc-editable-list-form-button {
  width: 100%;
  margin-top: 20px;
}

.calc-editable-list-form-button-delete {
  font-size: 85%;
  text-decoration: underline;
  margin: 5px auto 0;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }
}
</style>
