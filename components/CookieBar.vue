<template>
  <div class="cookiebar" :class="{ active }">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="cookiebar-text" v-html="$t('_shared.cookieBar')"></p>
    <Button label="Verstanden" active @click.native="close" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      if (!this.active && !localStorage.getItem('cookieBarHidden')) {
        this.active = true
      }
    },
    close () {
      this.active = false
      localStorage.setItem('cookieBarHidden', '1')
    }
  }
}
</script>

<style lang="scss">
.cookiebar {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 100%;
  background-color: $greyLight;
  padding: 10px 20px;
  transition: transform .4s;

  @media #{$md} {
    display: flex;
    align-items: center;
  }

  &.active {
    transform: translateY(-100%);
    box-shadow: 0 0 40px 0 rgba(0,0,0,0.2);
  }

  .cookiebar-text {
    font-size: 90%;
    margin-bottom: 10px;

    @media #{$md} {
      margin-bottom: 0;
    }

    a {
      color: $colorPrimary;
    }
  }
}
</style>
