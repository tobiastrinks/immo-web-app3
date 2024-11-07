<template>
  <div class="nav-mobile" :class="{ active, isCalc, isMinimalNav }">
    <div class="nav-mobile-head" :class="{ minified: headMinified && !active && !isMinimalNav }">
      <CustomNuxtLink to="/">
        <nuxt-img src="/img/logo-small.png" format="webp" />
      </CustomNuxtLink>
      <SearchInput class="nav-mobile-head-search" full-width-results />
      <div
          v-if="!isMinimalNav"
          class="nav-mobile-head-hamburger"
          :class="{ active }"
          @click="active = !active"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="nav-mobile-body" :class="{ active }">
      <ul>
        <li>
          <CustomNuxtLink :to="PATHS.GERMANY">
            {{ $t('_shared.nav.items.germany') }}
          </CustomNuxtLink>
        </li>
        <li>
          <CustomNuxtLink :to="PATHS.BODENRICHTWERT">
            {{ $t('_shared.nav.items.bodenrichtwert') }}
          </CustomNuxtLink>
        </li>
        <li>
          <CustomNuxtLink :to="PATHS.PROPERTY_VALUE">
            {{ $t('_shared.nav.items.propertyValue') }}
          </CustomNuxtLink>
        </li>
        <li>
          <CustomNuxtLink :to="PATHS.PROPERTY_SELL">
            {{ $t('_shared.nav.items.propertySell') }}
          </CustomNuxtLink>
        </li>
        <li>
          <CustomNuxtLink :to="PATHS.CALC_SEO">
            {{ $t('_shared.nav.items.calculator') }}
          </CustomNuxtLink>
        </li>
      </ul>
    </div>
    <div
      v-if="!isCalc"
      class="nav-mobile-sticky-cta"
      :class="{ minified: (ctaMinified && !active) || isMinimalNav, navOpened: active }"
    >
      <CustomNuxtLink :to="PATHS.PROPERTY_VALUE">
        <Button
          class="nav-mobile-sticky-cta-button"
          :label="$t('_shared.nav.ctaButton')"
          active
          @enabled-click="clickCTA"
        />
      </CustomNuxtLink>
      <div v-if="mainStore.navNoteOpened" class="nav-mobile-note">
        <CustomNuxtLink to="#">
          <p class="nav-mobile-note-text"></p>
        </CustomNuxtLink>
        <div class="nav-mobile-note-close" @click="closeNavNote">
          <img
            src="@/assets/img/_shared/font-awesome/xmark-solid.svg"
            class="nav-mobile-note-close-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {PATHS} from "assets/js/constants.js";
import {useStore} from "~/store/main.js";

export default defineNuxtComponent({
  setup() {
    return {
      mainStore: useStore()
    }
  },
  data () {
    return {
      PATHS,
      headMinified: false,
      ctaMinified: true
    }
  },
  computed: {
    active: {
      get () {
        return this.mainStore.mobileNavOpened
      },
      set (val) {
        val
          ? this.mainStore.openMobileNav()
          : this.mainStore.closeMobileNav()
      }
    },
    isCalc () {
      return this.$route.path === PATHS.CALC
    },
    isMinimalNav () {
      return this.$route.path.includes(PATHS.PROPERTY_VALUE_REQUEST)
    }
  },
  watch: {
    '$route' () {
      this.active = false
    }
  },
  mounted () {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      if (this.isCalc) {
        return
      }
      const { headMinified } = this
      const currentScrollPos = window.pageYOffset
      if (currentScrollPos <= 1100) {
        if (headMinified) {
          this.headMinified = false
          this.ctaMinified = true
        }
      } else if (!headMinified) {
        this.headMinified = true
        this.ctaMinified = false
      }
    },
    closeNavNote () {
      this.mainStore.closeNavNote()
    },
    clickCTA () {
      if (!this.$route.path.includes(PATHS.PROPERTY_VALUE)) {
        this.$gtm.push({ event: 'navMobile.propertyValueCTA' })
      }
    }
  }
})
</script>

<style lang="scss">
.nav-mobile {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;

  @media #{$lg} {
    display: none;
  }

  .nav-mobile-head {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);
    z-index: 1;
    transition: transform .4s;

    &.minified {
      transform: translateY(-50px);
    }

    img {
      display: block;
      width: 30px;
      padding: 5px;
    }

    .nav-mobile-head-search {
      width: calc(100% - 110px)
    }

    .nav-mobile-head-hamburger {
      width: 60px;
      height: 45px;
      position: relative;
      transform: scale(.35) rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;

      span {
        display: block;
        position: absolute;
        height: 9px;
        width: 100%;
        background: $colorText;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
      }

      span:nth-child(1) {
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      span:nth-child(2) {
        top: 18px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      span:nth-child(3) {
        top: 36px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      &.active span:nth-child(1) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: -3px;
        left: 8px;
      }

      &.active span:nth-child(2) {
        width: 0;
        opacity: 0;
      }

      &.active span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 39px;
        left: 8px;
      }
    }
  }

  .nav-mobile-body {
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    top: 0;
    bottom: 0;
    padding-top: 46px;
    left: 100%;
    width: 100%;
    transition: all .6s;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);
    overflow: auto;

    ul {
      list-style-type: none;
      margin: 50px 0 0 0;
      padding: 0;
      font-family: $fontHeadline;
      font-size: 130%;

      li {
        margin: 40px auto;
        width: 70%;

        .nuxt-link-active {
          text-decoration: underline;
          text-decoration-color: $colorPrimary;
        }
      }
    }

    .nav-mobile-cta-button {
      width: 70%;
      margin: 20px auto;
    }

    &.active {
      left: 0;
    }
  }

  .nav-mobile-sticky-cta {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: #fff;
    transition: all .4s;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

    &.minified {
      top: -60px;
    }

    &.navOpened {
      box-shadow: none;
      top: 50px;

      .nav-mobile-note {
        display: none;
      }
    }

    .nav-mobile-sticky-cta-button {
      width: 70%;
      margin: 5px auto;
    }

    .nav-mobile-note {
      position: relative;
      padding: 8px 10px 8px 5px;
      min-width: 300px;
      margin: 0 auto;
      background-color: $greyLight;

      .nav-mobile-note-text {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: underline;
        color: #484848;

        img {
          margin-right: 5px;
        }
      }

      .nav-mobile-note-close {
        position: absolute;
        right: 8px;
        top: 8px;

        .nav-mobile-note-close-icon {
          width: 13px;
          opacity: .8;
        }
      }
    }
  }

  &.isCalc {
    .nav-mobile-head-search {
      display: none;
    }
  }

  &.isMinimalNav {
    .nav-mobile-head-search {
      display: none;
    }
  }
}
</style>
