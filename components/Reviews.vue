<script setup>
const props = defineProps({
  value: Number,
  count: Number
})
</script>

<template>
  <div class="review">
    <img
        class="review-img"
        src="~/assets/img/_shared/star.svg"
    />
    <p class="review-text">
      <span class="review-text-number">
        {{ $n(props.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}
      </span>
      bei
      <span class="review-text-number">
        {{ $n(props.count, { maximumFractionDigits: 0 }) }}
      </span>
      Bewertungen
    </p>
  </div>
</template>

<style scoped lang="scss">
.review {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  .review-img {
    margin-right: 8px;
    width: 23px;
  }

  .review-text {

    .review-text-number {
      font-weight: 400;
    }
  }
}
</style>
