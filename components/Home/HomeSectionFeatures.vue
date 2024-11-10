<template>
  <div class="home-section-features">
    <div class="inner innerSmall">
      <Headline
        :headline="$t('home.featureSection.headline')"
        :level="2"
        :sub-headline="$t('home.featureSection.subHeadline')"
        centered
      />
      <div class="home-section-features-text">
        {{ $t('home.featureSection.text') }}
      </div>
      <div class="home-section-features-items">
        <HomeSectionFeaturesItem
          :headline="$t('home.featureSection.features.headline1')"
          :text="$t('home.featureSection.features.text1')"
          img-filename="featureTech.jpg"
          img-alt="aktuelle Grundstückspreise dank modernster Technologie"
        />
        <HomeSectionFeaturesItem
          :headline="$t('home.featureSection.features.headline2')"
          :text="$t('home.featureSection.features.text2')"
          img-filename="featureDb.jpg"
          img-alt="umfangreiche Datenbank der aktuellen Grundstückspreise"
        />
        <HomeSectionFeaturesItem
          :headline="$t('home.featureSection.features.headline3')"
          :text="$t('home.featureSection.features.text3')"
          img-filename="featureExperts.jpg"
          img-alt="lokale Expertise bei der Grundstückswertermittlung"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-section-features {
  margin: 50px 0;

  @media #{$lg} {
    margin: 100px 0;
  }

  .home-section-features-text {
    text-align: justify;
    margin-bottom: 50px;
  }

  .home-section-features-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media #{$lg} {
      justify-content: space-between;
    }
  }
}
</style>
