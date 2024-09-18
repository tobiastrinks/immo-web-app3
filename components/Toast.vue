<template>
  <div class="toast" :class="toast.type">
    <p>{{ toast.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    toast: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.toast {
  cursor: default;
  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 20px;
  max-width: calc(100% - 40px);
  box-sizing: border-box;
  font-size: 90%;
  padding: 7px 15px;

  &.error {
    background-color: $red;
    color: #fff;
  }

  &.success {
    background-color: $green;
    color: #fff;
  }
}
</style>
