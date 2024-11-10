import { PATHS } from './constants'

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

// keep as a template for more experimental features in the future
//
// export function showExperimentalFeatures (path) {
//   return (
//     (path.includes('/schleswig-holstein/') || path.endsWith('/schleswig-holstein')) ||
//     (path.includes('/sachsen/') || path.endsWith('/sachsen'))
//   )
// }
