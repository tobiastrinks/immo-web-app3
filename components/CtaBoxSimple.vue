<template>
  <div class="cta-box-simple">
    <p class="cta-box-simple-text">
      {{ $t('_shared.ctaBoxSimple.text') }}
    </p>
    <nuxt-link :to="PATHS.PROPERTY_VALUE">
      <Button
        :label="$t('_shared.ctaBoxSimple.button')"
        active
        inline-block
        small
      />
    </nuxt-link>
  </div>
</template>

<script>
import {PATHS} from "assets/js/constants.js";

export default {
  data () {
    return {
      PATHS
    }
  }
}
</script>

<style scoped lang="scss">
.cta-box-simple {
  background-color: #F2F2F2;
  padding: 20px;
  overflow: hidden;
  text-align: center;
  border: 1px solid $colorStroke;
  margin: 20px 0;

  .cta-box-simple-text {
    margin-bottom: 10px;
  }
}
</style>
