import { defineSitemapEventHandler } from '#imports'
import {PATHS} from "assets/js/constants.js";

export default defineSitemapEventHandler(async () => {

    const config = useRuntimeConfig()
    const locationList = await fetchLocationList(config.public.apiUrl)

    const now = new Date()
    now.setHours(15, 0, 0, 0)
    const lastmod = now.toISOString().split('T')[0]

    const paths = locationList.map(location => getLocationPath(location))

    return paths.map(path => ({
        loc: path,
        lastmod,
    }))
})


async function fetchLocationList (apiBaseUrl) {
    const url = new URL('/location/tree', apiBaseUrl)
    const locationTree = await (fetch(url.toString())
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }))
    const locationGermany = {}
    const locationList = [locationGermany]
    locationTree.stateList.forEach((state) => {
        const stateIdName = state.idName
        locationList.push({ stateIdName })
        if (state.kreisList) {
            state.kreisList.forEach((kreis) => {
                const kreisIdName = kreis.idName
                locationList.push({ stateIdName, kreisIdName })
                if (kreis.gemeindeList) {
                    kreis.gemeindeList.forEach((gemeinde) => {
                        const gemeindeIdName = gemeinde.idName
                        locationList.push({ stateIdName, kreisIdName, gemeindeIdName })
                    })
                }
            })
        }
    })
    return locationList
}

function getLocationPath ({ stateIdName, kreisIdName, gemeindeIdName }) {
    let path = PATHS.GERMANY
    if (stateIdName) {
        path += `/${stateIdName}`
    }
    if (kreisIdName) {
        path += `/${kreisIdName}`
    }
    if (gemeindeIdName) {
        path += `/${gemeindeIdName}`
    }
    return path
}
