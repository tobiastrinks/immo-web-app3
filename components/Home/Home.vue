<script setup>
import {useCfStore} from "~/store/cf.js";
import {PATHS} from "assets/js/constants.js";

const cfStore = useCfStore()

const cf = computed(() => {
  return cfStore
})
</script>

<template>
  <div class="home">
    <HomeHead />
    <HomeSectionFeatures />
    <HomeColumnSectionTemplate
        :headline="$t('home.section1.headline')"
        :sub-headline="$t('home.section1.subHeadline')"
        :button-label="$t('home.section1.buttonLabel')"
        :button-link="PATHS.GERMANY"
    >
      <template v-slot:text>
        <h3>{{ $t('home.section1.content.headline1') }}</h3>
        <p>{{ $t('home.section1.content.text1') }}</p>
        <br />
        <p>{{ $t('home.section1.content.note') }}</p>
      </template>
      <template v-slot:below-button>
        <div class="home-section-search">
          <p>{{ $t('home.section1.content.searchText') }}</p>
          <SearchInput />
          <BlueArrow class="home-section-search-arrow" type="TO_LEFT_TOP" :text="$t('home.section1.arrowText')" />
        </div>
        <div class="home-section-bodenrichtwert">
          <h3>{{ $t('home.section1.content.headline2') }}</h3>
          <p>{{ $t('home.section1.content.text2') }}</p>
          <CustomNuxtLink :to="PATHS.BODENRICHTWERT">
            <Button
                class="home-section-bodenrichtwert-button"
                :label="$t('home.section1.buttonLabel2')"
                active
                inline-block
            />
          </CustomNuxtLink>
        </div>
      </template>
      <template v-slot:image>
        <img
            src="/img/home/section1.jpg"
            alt="Grundstückspreise und Bodenrichtwerte für ganz Deutschland"
        />
      </template>
    </HomeColumnSectionTemplate>
    <HomeColumnSectionTemplate
        :headline="$t('home.section2.headline')"
        :sub-headline="$t('home.section2.subHeadline')"
        :button-label="$t('home.section2.buttonLabel')"
        :button-link="PATHS.PROPERTY_VALUE"
        inverted
    >
      <template v-slot:text>
        <h3>{{ $t('home.section2.content.headline1') }}</h3>
        <p>{{ $t('home.section2.content.text1') }}</p>
        <h3>{{ $t('home.section2.content.headline2') }}</h3>
        <p>{{ $t('home.section2.content.text2') }}</p>
        <h3>{{ $t('home.section2.content.headline3') }}</h3>
        <p>{{ $t('home.section2.content.text3') }}</p>
        <br />
        <p>{{ $t('home.section2.content.note') }}</p>
      </template>
      <template v-slot:image>
        <img
            src="/img/home/section2.jpg"
            alt="online Grundstückswert ermitteln"

        />
      </template>
    </HomeColumnSectionTemplate>
    <HomeColumnSectionTemplate
        :headline="$t('home.section3.headline')"
        :sub-headline="$t('home.section3.subHeadline')"
        :button-label="$t('home.section3.buttonLabel')"
        :button-link="PATHS.PROPERTY_SELL"
    >
      <template v-slot:text>
        <h3>{{ $t('home.section3.content.headline1') }}</h3>
        <p>{{ $t('home.section3.content.text1') }}</p>
        <h3>{{ $t('home.section3.content.headline2') }}</h3>
        <p>{{ $t('home.section3.content.text2') }}</p>
        <br />
        <p>{{ $t('home.section3.content.note') }}</p>
      </template>
      <template v-slot:image>
        <img
            src="/img/home/section3.jpg"
            alt="Grundstück verkaufen mit Makler oder ohne Makler"

        />
      </template>
    </HomeColumnSectionTemplate>
    <HomeSectionTemplate
        :headline="cf.homeFaq.headline"
        :sub-headline="cf.homeFaq.subHeadline"
    >
      <CfArticle :content="cf.homeFaq.text" />
    </HomeSectionTemplate>
  </div>
</template>

<style scoped lang="scss">
.home {

  .home-section-search {
    position: relative;
    margin-top: 15px;
    max-width: 300px;

    p {
      margin-bottom: 10px;
    }

    .home-section-search-arrow {
      position: absolute;
      left: calc(100% + 20px);
      top: 35px;
    }
  }

  .home-section-bodenrichtwert {
    margin-top: 50px;

    .home-section-bodenrichtwert-button {
      margin-top: 20px;
    }
  }
}
</style>
