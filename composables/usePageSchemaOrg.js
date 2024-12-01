import useContentfulHelper from "~/composables/useContentfulHelper.js";
import {useRoute as useNativeRoute} from "#vue-router";

export default function () {

    const route = useNativeRoute()
    const contentfulHelper = useContentfulHelper()
    const siteConfig = useSiteConfig()

    const getQuestions = (faqItems) => {
        return faqItems.map(faqItem => {
            return defineQuestion({
                name: faqItem.label,
                acceptedAnswer: contentfulHelper.renderCfContent(faqItem.text),
            })
        })
    }

    const getProduct = ({ reviewValue, reviewCount, productDescription }) => {
        const productConfig = {
            aggregateRating: {
                ratingValue: reviewValue,
                bestRating: 5,
                ratingCount: reviewCount,
            }
        }
        if (productDescription) {
            productConfig.description = productDescription
        }
        return defineProduct(productConfig)
    }

    return {
        faqAndProductPage({ faqItems, reviewCount, reviewValue, productDescription }) {
            const hasFAQAndReview = faqItems?.length && reviewCount && reviewValue
            const hasOnlyFAQ = faqItems?.length && !hasFAQAndReview
            const hasOnlyReview = reviewCount && reviewValue && !hasFAQAndReview

            if (hasFAQAndReview) {
                useSchemaOrg([
                    defineWebPage({
                        '@type': 'FAQPage'
                    }),
                    getProduct({ reviewCount, reviewValue, productDescription }),
                    ...getQuestions(faqItems)
                ])
            } else if (hasOnlyFAQ) {
                useSchemaOrg([
                    defineWebPage({
                        '@type': 'FAQPage',
                    }),
                    ...getQuestions(faqItems)
                ])
            } else if (hasOnlyReview) {
                useSchemaOrg([
                    defineWebPage({
                        '@type': 'WebPage',
                    }),
                    getProduct({ reviewCount, reviewValue, productDescription })
                ])
            }
        }
    }
}
