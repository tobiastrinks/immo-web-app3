import { PATHS } from './constants'
import useApiFetch from "~/composables/useApiFetch.js";

export function getPathForLocationIdNames ({ gemeindeIdName, kreisIdName, stateIdName }) {
  if (gemeindeIdName) {
    return PATHS.GEMEINDE({ kreisIdName, stateIdName }, gemeindeIdName)
  } else if (kreisIdName) {
    return PATHS.KREIS({ stateIdName }, kreisIdName)
  } else if (stateIdName) {
    return PATHS.STATE(null, stateIdName)
  } else {
    return PATHS.GERMANY
  }
}

// TODO: sitemap
export async function fetchLocationList (apiBaseUrl) {
  const apiFetch = useApiFetch()
  const locationTree = apiFetch('/location/tree')
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

export function getLocationPath ({ stateIdName, kreisIdName, gemeindeIdName }) {
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

// keep as a template for more experimental features in the future
//
// export function showExperimentalFeatures (path) {
//   return (
//     (path.includes('/schleswig-holstein/') || path.endsWith('/schleswig-holstein')) ||
//     (path.includes('/sachsen/') || path.endsWith('/sachsen'))
//   )
// }
