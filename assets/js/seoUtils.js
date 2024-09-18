export function getCanonical (baseUrl, path) {
  return {
    rel: 'canonical',
    href: baseUrl + path
  }
}
