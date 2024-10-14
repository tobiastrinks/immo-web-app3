import useAbTest from "~/composables/useAbTest.js";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const abTest = useAbTest()
    const router = useRouter()

    if (!config.public.gtmEnabled) {
        console.log('GTM not enabled')
        return {
            provide: {
                gtm: {
                    push (event) {
                        console.log('disabled GTM: Event: ', event)
                    }
                }
            }
        }
    }

    /* eslint-disable */
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NKWHDRF');

    window.dataLayer = window.dataLayer || []
    function push (payload) {
        try {
            dataLayer.push(payload)
        } catch (e) {
            console.error(e)
        }
    }
    /* eslint-enable */

    router.afterEach((to, from) => {
        window.setTimeout(() => {
            push({ event: 'nuxtRoute', pageURL: to.fullPath })
        }, 500)
    })

    const abTestAffiliateWidgetsFeature = abTest.getSessionFeature('affiliateWidgets')
    if (abTestAffiliateWidgetsFeature) {
        push({ event: `website.entered.version.${abTestAffiliateWidgetsFeature}` })
    }

    return {
        provide: {
            gtm: {
                push
            }
        }
    }
})
