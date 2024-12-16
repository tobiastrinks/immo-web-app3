export default function () {
    const tests = {
        // CHECK VARY HEADER WHEN REMOVING -> varyHeader.js
        // default is always first item
        affiliateWidgets: {
            propertyValueWidget: 0.40,
            propertyValueWidget2: 0.40,
            mieteAktuell: 0.2,
        }
    }
    /**
     * Random test session assignment
     */
    Object.entries(tests).forEach(([testName, options]) => {
        const abTestCookie = useCookie(`abTest.${testName}`)
        const abTestAssignedAtCookie = useCookie(`abTest.${testName}.assignedAt`)

        if (abTestCookie.value && Object.keys(options).includes(abTestCookie.value)) {
            return
        }
        const random = Math.random()
        let accProbability = 0

        for (const [feature, probability] of Object.entries(options)) {
            accProbability += probability
            if (random <= accProbability) {
                abTestCookie.value = feature
                abTestAssignedAtCookie.value = new Date().toISOString()
                return
            }
        }
    })

    return {
        getSessionFeature (testName) {
            return useCookie(`abTest.${testName}`).value || tests[testName][0]
        }
    }
}
