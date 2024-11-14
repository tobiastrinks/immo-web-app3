<script setup>
import {useCalcStore} from "~/store/calc.js";

const TYPES = {
  FLOAT: 'FLOAT',
  TEXT: 'TEXT'
}

const calcStore = useCalcStore()

const props = defineProps({
  type: {
    type: String,
    default: 'TEXT'
  },
  unit: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    required: true
  },
  validator: {
    type: Function,
    default: null
  },
  value: {
    type: [String, Number],
    required: true
  },
  mutation: {
    type: Function,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  info: {
    type: String,
    default: null
  },
  toggleErrors: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['keyupEnter', 'onInputChange'])

const isFocussed = ref(false)
const wasFocussed = ref(false)

const formatFloat = (num) => {
  const unitSuffix = props.unit ? ` ${props.unit}` : ''
  if (props.unit === '%') {
    // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
    // https://indepth.dev/posts/1139/here-is-what-you-need-to-know-about-javascripts-number-type
    num = Math.round(num * 1000000) / 10000
  }
  const fragments = Number(num)
      .toString()
      .split('.')
  const int = fragments[0]
  const floating = fragments[1]
  return (
      int
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') +
      (floating !== undefined
          ? `,${floating}`
          : '') +
      (isFocussed.value ? '' : unitSuffix)
  )
}
const format = (val) => {
  switch (props.type) {
    case TYPES.FLOAT:
      return formatFloat(val)
    default:
      return val
  }
}

const parseFloat = (text) => {
  const formattedStr = text
      .replace(props.unit, '')
      .replace(/ /g, '')
      .replace(/\./g, '')
      .replace(',', '.')
  if (!formattedStr.length) {
    return 0.0
  }
  let num = Number(formattedStr)
  if (props.unit === '%') {
    num /= 100
  }
  return num
}
const parse = (val) => {
  switch (props.type) {
    case TYPES.FLOAT:
      return parseFloat(val)
    default:
      return val
  }
}

const onEnter = (e) => {
  emit('keyupEnter', e)
}
const focusIn = () => {
  if (!props.readonly) {
    isFocussed.value = true
  }
}
const focusOut = () => {
  if (!props.readonly) {
    isFocussed.value = false
    wasFocussed.value = true
  }
}
const onInputChange = (e) => {
  emit('onInputChange', e.target.value)
}


const val = defineModel({
  get() {
    return format(props.value)
  },
  set(newVal) {
    if (props.mutation) {
      props.mutation(parse(newVal))
    }
  }
})
const restrictInput = (event) => {
  if (
      props.type === TYPES.FLOAT &&
      isNaN(String.fromCharCode(event.keyCode)) &&
      (String.fromCharCode(event.keyCode) !== ',' || val.includes(',')) // permit comma input only if no comma existing yet in input field
  ) {
    event.preventDefault()
  }
}

const isError = computed(() => {
  if (props.validator) {
    return !props.validator(props.value)
  } else {
    return false
  }
})
const showError = computed(() => {
  return isError.value && !props.readonly && (wasFocussed.value || props.toggleErrors)
})
const showChecked = computed(() => {
  return !isError.value
})
</script>

<template>
  <div class="input-st-wrapper">
    <div
        class="input-st"
        :class="{ showError, hasInfo: !!info }"
    >
      <input
          v-model="val"
          type="text"
          :class="{ hasContent: !!val, showError }"
          :readonly="readonly"
          :autocomplete="autocomplete"
          @keyup.enter="onEnter"
          @focusin="focusIn"
          @focusout="focusOut"
          @input="onInputChange"
          @keypress="restrictInput"
      />
      <span v-if="placeholder" class="input-st-placeholder">{{ placeholder }}</span>
      <div class="input-st-bg"></div>
      <img
          v-if="showChecked"
          src="~/assets/img/_shared/check-green.svg"
          class="input-st-checked"
      />
    </div>
    <img
        v-if="info"
        class="input-st-info-icon"
        src="~/assets/img/_shared/info-icon.svg"
        @click="calcStore.showInfoPopup({ title: placeholder, description: info })"
    />
  </div>
</template>

<style lang="scss">
.input-st-wrapper {
  @include input-wrapper;

  .input-st {
    @include input-field-wrapper;

    &.showError {

      input {
        @include input-field-error;
      }

      .input-st-placeholder {
        @include input-field-error-placeholder;
      }
    }

    input {
      @include input-field;

      &:focus:not(:read-only) {
        @include input-field-focussed;
      }

      &:read-only {
        opacity: .5;
      }
    }

    .input-st-placeholder {
      @include input-field-placeholder;
    }

    .input-st-bg {
      @include input-field-bg;
    }

    input:focus + .input-st-placeholder,
    input.hasContent + .input-st-placeholder {
      @include input-field-focussed-placeholder;
    }

    input.infoTooltip {
      padding-right: 25px;
    }

    .input-st-info-tooltip {
      position: absolute;
      right: 10px;
      bottom: 20px;
      transform: translateY(50%);
      z-index: 3;
      display: flex;

      &-icon {
        display: block;
        cursor: pointer;
      }
    }

    .input-st-focussed-tooltip {
      position: absolute;
      right: 24px;
      bottom: 20px;
    }

    .input-st-checked {
      position: absolute;
      right: 10px;
      bottom: 20px;
      width: 14px;
      z-index: 3;
      transform: translateY(50%);
    }
  }

  .input-st-info-icon {
    @include input-info-icon;
  }
}
</style>
