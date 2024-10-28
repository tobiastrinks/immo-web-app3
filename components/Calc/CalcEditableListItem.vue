<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="calc-editable-list-item">
    <div class="calc-editable-list-item-data">
      <p class="calc-editable-list-item-data-title">
        {{ props.title }}
      </p>
      <div class="calc-editable-list-item-data-values">
        {{ props.subTitle }}
      </div>
    </div>
    <img
      src="@/assets/img/_shared/font-awesome/pencil-solid.svg"
      class="calc-editable-list-item-edit"
      @click="$emit('edit')"
    />
  </div>
</template>

<style scoped lang="scss">
.calc-editable-list-item {
  border: 1px solid #D8DCEE;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;

  .calc-editable-list-item-data {
    line-height: 1.4;

    .calc-editable-list-item-data-title {
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .calc-editable-list-item-data-values {
      font-size: 80%;
    }
  }

  .calc-editable-list-item-edit {
    width: 20px;
    opacity: .7;
    cursor: pointer;
    padding: 10px;

    &:hover {
      opacity: .5;
    }
  }
}
</style>
