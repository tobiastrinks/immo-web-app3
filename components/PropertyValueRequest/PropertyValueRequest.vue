<script setup>
import {PATHS} from "assets/js/constants.js";

const props = defineProps({
  phone: {
    type: String,
    required: true
  }
})

const apiFetch = useApiFetch()
const router = useRouter()

const pollForResult = () => {
  return setInterval(async () => {
    const res = await apiFetch('/property-value/request/search', {
      params: { phone: props.phone }
    })
    const resultId = res?.id
    if (resultId) {
      await router.replace(PATHS.PROPERTY_VALUE_RESULT(resultId))
    }
  }, 3000)
}

let pollingInterval

onMounted(() => {
  pollingInterval = pollForResult()
})

onBeforeUnmount(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }
})
</script>

<template>
  <div class="page-location-nav-active margin-top property-value-request">
    <div class="inner">
      <div class="property-value-request-loading">
        <img src="~/assets/img/_shared/loading.svg" />
        <p>Bitte haben Sie etwas Geduld. Die Berechnung kann bis zu einer Minute dauern...</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.property-value-request {
  min-height: 80vh;

  .property-value-request-loading {
    text-align: center;
    padding-top: 60px;
    font-weight: 400;

    img {
      width: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
