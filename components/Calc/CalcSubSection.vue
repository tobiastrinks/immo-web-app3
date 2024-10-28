<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="calc-sub-section">
    <div
      v-if="props.title"
      class="calc-sub-section-header"
    >
      <p class="calc-sub-section-header-title">
        {{ props.title }}
      </p>
    </div>
    <div class="calc-sub-section-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calc-sub-section {
  margin-bottom: 20px;

  .calc-sub-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 5%;
    background-color: #FAFAFA;
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
  }

  .calc-sub-section-body {
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

</style>
