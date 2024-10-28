<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: null
  },
  mutation: {
    type: Function,
    required: true
  },
  info: {
    type: String,
    default: null
  },
  validator: {
    type: Function,
    default: null
  },
  toggleErrors: {
    type: Boolean,
    default: false
  }
})

const wasFocussed = ref(false)
const opened = ref(false)

const activeLabel = computed(() => {
  const activeOption = props.options.find(o => o.value === props.value)
  return activeOption
      ? activeOption.label
      : null
})
const isError = computed(() => {
  if (props.validator) {
    return !props.validator(props.value)
  } else {
    return false
  }
})
const showError = computed(() => {
  return isError.value && (wasFocussed.value || props.toggleErrors)
})

watch(() => opened.value, (beingOpened) => {
  if (!beingOpened) {
    wasFocussed.value = true
  }
})

const select = (val) => {
  props.mutation(val)
  opened.value = false
}
const closeDropdown = () => {
  opened.value = false
}
</script>

<template>
  <div class="dropdown-input-wrapper">
    <div
      v-click-outside="closeDropdown"
      class="dropdown-input"
      :class="{ opened, showError }"
    >
      <div
        class="dropdown-input-field"
        :class="{ hasValue: !!props.value }"
        @click="opened = !opened"
      >
        <span
          class="dropdown-input-field-value"
          :class="{ noValue: !props.value }"
        >
          {{ activeLabel || '-' }}
        </span>
        <img
          src="~/assets/img/_shared/font-awesome/chevron-down-solid.svg"
          class="dropdown-input-field-arrow"
        />
      </div>
      <div
        class="dropdown-input-placeholder"
        :class="{ outside: !!props.value }"
        @click="opened = !opened"
      >
        {{ props.placeholder }}
      </div>
      <div class="dropdown-input-bg"></div>
      <transition name="dropdown-slide">
        <div v-if="opened" class="dropdown-input-options">
          <div
            v-for="(option, index) in props.options"
            :key="index"
            class="dropdown-input-options-item"
            @click="select(option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </transition>
    </div>
    <img
      v-if="props.info"
      class="dropdown-input-info-icon"
      src="~/assets/img/_shared/info-icon.svg"
      @click="$store.commit('calc/SHOW_INFO_POPUP', { title: props.placeholder, description: props.info })"
    />
  </div>
</template>

<style scoped lang="scss">
.dropdown-input-wrapper {
  @include input-wrapper;

  .dropdown-input {
    @include input-field-wrapper;
    z-index: 5;

    &.opened {

      .dropdown-input-field {
        border-bottom-color: transparent;

        .dropdown-input-field-arrow {
          transform: rotate(180deg);
        }
      }
    }

    &.showError {

      .dropdown-input-field {
        @include input-field-error;
      }

      .dropdown-input-placeholder {
        @include input-field-error-placeholder;
      }
    }

    .dropdown-input-field {
      @include input-field;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .dropdown-input-field-value {
        line-height: normal;

        &.noValue {
          opacity: 0;
        }
      }

      .dropdown-input-field-arrow {
        transition: transform .4s;
        width: 10px;
      }
    }

    .dropdown-input-placeholder {
      @include input-field-placeholder;

      &.outside {
        @include input-field-focussed-placeholder;
      }
    }

    .dropdown-input-bg {
      @include input-field-bg;
    }

    .dropdown-input-options {
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      border: 1px solid #D1D3D9;
      border-top: none;
      font-size: 90%;

      .dropdown-input-options-item {
        padding: 6px 10px;
        border-top: 1px solid #F3F3F3;
        cursor: pointer;

        &:hover {
          background-color: #f6f6f6;
        }
      }
    }
  }

  .dropdown-input-info-icon {
    @include input-info-icon;
  }
}
</style>
