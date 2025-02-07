<template>
  <div class="location-immo-portals">
    <a href="https://www.immobilienscout24.de/wohnen/grundstueckserwerb.html" target="_blank">
      <img src="/img/immoPortals/immoscout.png" />
    </a>
    <a href="https://www.immowelt.de/suche/grundstuecke/kaufen" target="_blank">
      <img src="/img/immoPortals/immowelt.png" />
    </a>
    <a href="https://www.ebay-kleinanzeigen.de/s-grundstuecke-garten/c207" target="_blank">
      <img src="/img/immoPortals/ebaykleinanzeigen.png" />
    </a>
    <a href="https://www.immonet.de/grundstueck.html" target="_blank">
      <img src="/img/immoPortals/immonet.png" />
    </a>
    <a href="https://www.meinestadt.de/meine/immobilien/hausbau/grundstueck-kaufen" target="_blank">
      <img src="/img/immoPortals/meinestadt.png" />
    </a>
    <BlueArrow
      class="location-immo-portals-arrow"
      type="TO_TOP_RIGHT"
      :text="$t('_shared.locationPropertyBuy.immoPortals.arrowLabel')"
    />
  </div>
</template>

<style scoped lang="scss">
.location-immo-portals {
  position: relative;
  margin-top: 50px;
  text-align: center;

  @media #{$lg} {
    margin-bottom: 200px;
  }

  img {
    padding: 15px;
    box-sizing: border-box;
    width: 19%;
    min-width: 140px;
    transition: transform .4s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .location-immo-portals-arrow {
    position: absolute;
    top: calc(100% + 30px);
    left: 160px;
  }
}
</style>
