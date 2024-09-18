<template>
  <div class="footer">
    <div class="footer-inner">
      <div class="footer-columns">
        <div class="footer-column">
          <p class="footer-column-headline">
            {{ $t('_shared.footer.company.headline') }}
          </p>
          <p class="footer-column-company-link">
            <CustomNuxtLink to="/impressum">
              {{ $t('_shared.footer.company.imprint') }}
            </CustomNuxtLink>
          </p>
          <p class="footer-column-company-link">
            <CustomNuxtLink to="/datenschutz">
              {{ $t('_shared.footer.company.privacy') }}
            </CustomNuxtLink>
          </p>
          <p class="footer-column-company-link">
            <CustomNuxtLink to="/agb">
              {{ $t('_shared.footer.company.agb') }}
            </CustomNuxtLink>
          </p>
        </div>
        <div class="footer-column">
          <p class="footer-column-headline">
            {{ $t('_shared.footer.aboutUs.headline') }}
          </p>
          <p class="footer-column-about-us">
            {{ $t('_shared.footer.aboutUs.article') }}
          </p>
        </div>
      </div>
    </div>
    <hr class="footer-line" />
    <div class="footer-inner">
      <p class="footer-copyright">
        {{ $t('_shared.footer.copyright').replace('{year}', new Date().getUTCFullYear()) }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  background-color: $greyDark;
  color: #fff;

  .footer-inner {
    max-width: 900px;
    width: 90%;
    margin: 0 auto;

    .footer-columns {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 50px 0;

      .footer-column {

        &:first-child {
          margin-bottom: 30px;
          width: 100%;

          @media #{$md} {
            margin: 0;
            width: 30%;
          }
        }

        &:last-child {
          width: 100%;
          text-align: justify;

          @media #{$md} {
            width: 68%;
          }
        }


        .footer-column-headline {
          font-weight: 500;
          margin-bottom: 10px;

          @media #{$md} {
            margin-bottom: 30px;
          }
        }
      }
    }

    .footer-copyright {
      padding: 15px 0;
    }
  }
}
</style>
