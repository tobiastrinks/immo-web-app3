export default function () {

    const tests = {
        // CHECK VARY HEADER WHEN REMOVING -> varyHeader.js
        // default is always first item
        affiliateWidgets: {
            propertyValueWidget: 0.6,
            propertyValueWidget2: 0.3,
            mieteAktuell: 0.1,
        }
    }

    const selectedValues = {}

    /**
     * Random test session assignment
     */
    Object.entries(tests).forEach(([testName, options]) => {
        const abTestCookie = useCookie(`abTest.${testName}`)
        const abTestAssignedAtCookie = useCookie(`abTest.${testName}.assignedAt`)

        if (abTestCookie.value && Object.keys(options).includes(abTestCookie.value)) {
            selectedValues[testName] = abTestCookie.value
            return
        }
        const random = Math.random()
        let accProbability = 0

        for (const [feature, probability] of Object.entries(options)) {
            accProbability += probability
            if (random <= accProbability) {
                abTestCookie.value = feature
                abTestAssignedAtCookie.value = new Date().toISOString()
                selectedValues[testName] = feature
                return
            }
        }
    })

    return {
        getSessionFeature (testName) {
            return selectedValues[testName] || tests[testName][0]
        }
    }
}
