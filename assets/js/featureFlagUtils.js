// this.$route.path
export function showLayoutV2 (path) {
  return true
}

export function enableSchemaOrg (path) {
  return path.startsWith('/deutschland/niedersachsen') || path.startsWith('/deutschland/mecklenburg-vorpommern')
}

export function useSSRImprovements (path) {
  return path.startsWith('/deutschland/bayern') || path.startsWith('/deutschland/hessen') || path.startsWith('/bodenrichtwerte')
}
