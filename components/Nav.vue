<template>
  <div class="nav" :class="{ isCalc }">
    <div class="nav-fixed">
      <div v-if="false" class="nav-note">
        <div class="nav-inner">
          <p class="nav-note-text">
            <img src="../../../assets/img/_shared/info-icon-orange.svg" />
            <span></span>
          </p>
        </div>
        <div class="nav-note-close" @click="closeNavNote">
          <img
            src="@/assets/img/_shared/font-awesome/xmark-solid.svg"
            class="nav-note-close-icon"
          />
        </div>
      </div>
      <div class="nav-inner top">
        <CustomNuxtLink to="/">
          <nuxt-img
            class="nav-top-logo"
            format="webp"
            src="/img/logo.png"
            alt="Aktuelle Grundstückspreise Logo"
          />
        </CustomNuxtLink>
        <div class="nav-top-search">
          <p class="nav-top-search-text">
            {{ $t('_shared.nav.searchLabel') }}
          </p>
          <div class="nav-top-search-input">
            <SearchInput />
          </div>
        </div>
        <CustomNuxtLink class="nav-top-cta" :to="PATHS.PROPERTY_VALUE">
          <Button :label="$t('_shared.nav.ctaButton')" :active="orangeButton" small @click="clickCTA" />
        </CustomNuxtLink>
        <div class="nav-calc-headline">
          {{ $t('_shared.nav.calcHeadline') }}
        </div>
        <NuxtLink class="nav-calc-cancel-link" :to="PATHS.CALC_SEO">
          <Button
            class="nav-calc-cancel"
            :label="$t('_shared.nav.calcCancel')"
            small
            active
          />
        </NuxtLink>
      </div>
      <hr class="nav-line" />
      <div class="nav-inner bottom" :style="{ marginTop: displayNavMinified ? `-${mainStore.navDimensions.navBottomHeight}px` : 0 }">
        <div class="nav-bottom-items">
          <CustomNuxtLink :to="PATHS.GERMANY" :class="{ active: $route.path.startsWith(PATHS.GERMANY) }">
            {{ $t('_shared.nav.items.germany') }}
          </CustomNuxtLink>
          <CustomNuxtLink :to="PATHS.BODENRICHTWERT" :class="{ active: $route.path === PATHS.BODENRICHTWERT }">
            {{ $t('_shared.nav.items.bodenrichtwert') }}
          </CustomNuxtLink>
          <CustomNuxtLink :to="PATHS.PROPERTY_VALUE" :class="{ active: $route.path === PATHS.PROPERTY_VALUE }">
            {{ $t('_shared.nav.items.propertyValue') }}
          </CustomNuxtLink>
          <CustomNuxtLink :to="PATHS.PROPERTY_SELL" :class="{ active: $route.path === PATHS.PROPERTY_SELL }">
            {{ $t('_shared.nav.items.propertySell') }}
          </CustomNuxtLink>
          <CustomNuxtLink
            :to="PATHS.CALC_SEO"
            :class="{ active: $route.path === PATHS.CALC_SEO }"
          >
            {{ $t('_shared.nav.items.calculator') }}
          </CustomNuxtLink>
        </div>
      </div>
      <hr class="nav-line thin" />
      <div v-if="locationPath" class="nav-inner location">
        <template v-for="(item, index) in locationPath" :key="index">
          <CustomNuxtLink :to="item.link" class="nav-location-item" :class="{ active: index === (locationPath.length-1) }">
            {{ item.label }}
          </CustomNuxtLink>
          <span v-if="index < (locationPath.length-1)" class="nav-location-delimiter">
            <img
              src="@/assets/img/_shared/font-awesome/chevron-right-solid.svg"
              class="nav-location-delimiter-icon"
            />
          </span>
        </template>
      </div>
      <hr v-if="locationPath" class="nav-line" />
    </div>
  </div>
</template>

<script>
import {useStore} from "~/store/main.js";
import {useLocationStore} from "~/store/location.js";
import {useCfStore} from "~/store/cf.js";
import {PATH_TEMPLATES, PATHS} from "assets/js/constants.js";

export default defineNuxtComponent({
  setup () {
    return {
      mainStore: useStore(),
      locationStore: useLocationStore(),
      cfStore: useCfStore(),
    }
  },
  data () {
    return {
      PATHS,
      orangeButton: false,
    }
  },
  computed: {
    currentPath () {
      return this.$route.path
    },
    currentPathTemplate () {
      const { matched } = this.$route
      if (matched && matched[0]) {
        return matched[0].path
      }
      return null
    },
    isCalc () {
      return this.$route.path === PATHS.CALC
    },
    displayNavMinified () {
      return this.mainStore.navMinified
    },
    locationPath () {
      const activeLocationMainData = this.locationStore.activeLocationMainData
      if (!activeLocationMainData && this.currentPath.startsWith(PATHS.GERMANY)) {
        return null
      }
      const home = { label: this.$t('_shared.nav.location.home'), link: '/' }
      const germany = { label: this.$t(`_shared.nav.location.${PATHS.GERMANY}`), link: PATHS.GERMANY }
      const state = (name, idName) => ({ label: name, link: PATHS.STATE(null, idName) })
      const kreis = (name, idName) => ({ label: name, link: PATHS.KREIS(this.$route.params, idName) })
      const gemeinde = (name, idName) => ({ label: name, link: PATHS.GEMEINDE(this.$route.params, idName) })

      const { stateIdName, kreisIdName } = this.$route.params

      switch (this.currentPathTemplate) {
        case PATH_TEMPLATES.HOME:
          return null
        case PATH_TEMPLATES.STATE:
          return [
            home,
            germany,
            state(activeLocationMainData.name, activeLocationMainData.idName)
          ]
        case PATH_TEMPLATES.KREIS:
          return [
            home,
            germany,
            state(activeLocationMainData.stateName, stateIdName),
            kreis(activeLocationMainData.name, activeLocationMainData.idName)
          ]
        case PATH_TEMPLATES.GEMEINDE:
          return [
            home,
            germany,
            state(activeLocationMainData.stateName, stateIdName),
            kreis(activeLocationMainData.kreisName, kreisIdName),
            gemeinde(activeLocationMainData.name, activeLocationMainData.idName)
          ]
        default:
          return [
            home,
            {
              label: (() => {
                const i18nKey = `_shared.nav.location.${this.currentPath}`
                if (this.$te(i18nKey)) {
                  return this.$t(i18nKey)
                } else {
                  return this.cfStore.dynamicInfoPage?.headline
                }
              })(),
              link: this.currentPath
            }
          ]
      }
    },
  },
  watch: {
    currentPath: {
      immediate: false,
      handler () {
        this.$nextTick().then(() => {
          if (process.client) {
            this.setNavDimensions()
          }
        })
      }
    }
  },
  mounted () {
    this.onScroll()
    this.onResize()
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onScroll () {
      this.handleMinifyNav()
      this.makeButtonOrangeOnScroll()
    },
    onResize () {
      this.setNavDimensions()
    },
    handleMinifyNav () {
      const { navMinified } = this.mainStore
      const currentScrollPos = window.pageYOffset
      if (currentScrollPos <= 300) {
        if (navMinified) {
          this.mainStore.maximizeNav()
        }
      } else if (!navMinified) {
        this.mainStore.minifyNav()
      }
    },
    makeButtonOrangeOnScroll () {
      if (window.pageYOffset > 300) {
        if (!this.orangeButton) {
          this.orangeButton = true
        }
      } else if (this.orangeButton) {
        this.orangeButton = false
      }
    },
    setNavDimensions () {
      const { navDimensions } = this.mainStore
      const navTopHeight = document.querySelector('.nav-inner.top').clientHeight + 1
      const navBottomHeight = document.querySelector('.nav-inner.bottom').clientHeight + 1
      const navLocation = document.querySelector('.nav-inner.location')
      const navLocationHeight = navLocation ? navLocation.clientHeight + 1 : 0
      if (
        navDimensions.navTopHeight !== navTopHeight ||
        navDimensions.navBottomHeight !== navBottomHeight ||
        navDimensions.navLocationHeight !== navLocationHeight
      ) {
        this.mainStore.setNavDimensions({ navTopHeight, navBottomHeight, navLocationHeight })
      }
    },
    closeNavNote () {
      this.mainStore.closeNavNote()
    },
    clickCTA () {
      if (!this.$route.path.includes(PATHS.PROPERTY_VALUE)) {
        this.$gtm.push({ event: 'nav.propertyValueCTA' })
      }
    }
  }
})
</script>

<style scoped lang="scss">
.nav {
  font-weight: 400;
  display: none;
  height: 102px;

  @media #{$lg} {
    display: block;
  }

  .nav-line {
    &.thin {
      background-color: $colorStroke;
    }
  }

  .nav-fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;

    .nav-note {
      position: relative;
      background-color: $greyLight;
      padding: 7px 0;

      .nav-inner {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .nav-note-text {
          display: flex;
          font-weight: 300;
          font-size: 95%;

          img {
            margin-right: 10px;
          }
        }
      }

      .nav-note-close {
        position: absolute;
        top: 5px;
        right: 3px;
        padding: 0 5px;

        &:hover {
          cursor: pointer;
        }

        .nav-note-close-icon {
          width: 15px;
          color: $colorText;
        }
      }
    }
  }

  .nav-inner {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5px 0;

    &.top {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-sizing: border-box;

      .nav-top-logo {
        display: block;
        height: 35px;
      }

      .nav-top-search {
        display: flex;
        align-items: center;

        .nav-top-search-text {
          display: none;
          margin-right: 15px;
          font-size: 90%;

          @media screen and (min-width : 950px) {
            display: block;
          }
        }

        .nav-top-search-input {
          width: 300px;
        }
      }
    }

    &.bottom {
      padding: 0;
      transition: margin-top $minifyNavAnimationSpeed;

      .nav-bottom-items {
        display: flex;
        justify-content: flex-start;
        height: 50px;
        font-size: 90%;

        a {
          display: flex;
          align-items: center;
          margin: 0 10px;

          &.active {
            border-bottom: 3px solid $colorPrimary;
            padding-top: 3px;
          }

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    &.location {
      font-size: 85%;
      padding: 5px 0;
      box-sizing: border-box;

      .nav-location-item {
        font-weight: 300;

        &.active {
          font-weight: 400;
        }

        &:hover {
          color: $colorPrimary;
        }
      }

      .nav-location-delimiter {

        .nav-location-delimiter-icon {
          height: 8px;
          padding: 2px 5px;
        }
      }
    }
  }

  .nav-calc-headline, .nav-calc-link, .nav-calc-cancel-link {
    display: none;
  }

  &.isCalc {
    height: auto !important;

    .nav-note,
    .nav-inner.top .button,
    .nav-top-cta,
    .nav-inner.top .nav-top-search,
    .nav-inner.bottom,
    .nav-inner.location,
    .nav-line:not(.thin) {
      display: none;
    }

    .nav-inner {
      max-width: none;
      width: auto;
      margin: 0 20px;
    }

    .nav-inner.top {

      .nav-calc-headline {
        display: block;
        font-family: $fontHeadline;
      }

      .nav-calc-cancel-link {
        display: inline;

        .nav-calc-cancel {
          display: block;
        }
      }
    }
  }
}
</style>
