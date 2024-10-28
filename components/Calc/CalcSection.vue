<script setup>
const props = defineProps({
  position: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const minified = ref(false)
</script>

<template>
  <div class="calc-section">
    <div
      class="calc-section-header"
      @click="minified=!minified"
    >
      <p v-if="props.position !== 0" class="calc-section-header-number">
        {{ props.position }}.
      </p>
      <p class="calc-section-header-title">
        {{ props.title }}
      </p>
      <img
        src="@/assets/img/_shared/font-awesome/chevron-up-solid.svg"
        class="calc-section-header-dropdown-icon"
        :class="{ minified }"
      />
    </div>
    <div class="calc-section-body" :class="{ minified }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calc-section {

  .calc-section-header {
    background-color: #E5E5E5;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 10px 5%;
    cursor: pointer;

    .calc-section-header-number {
      margin-right: 10px;
    }

    .calc-section-header-title {
      flex-grow: 1;
    }

    .calc-section-header-dropdown-icon {
      width: 18px;

      &.minified {
        transform: rotate(180deg);
      }
    }
  }

  .calc-section-body {

    &.minified {
      display: none;
    }
  }
}
</style>
