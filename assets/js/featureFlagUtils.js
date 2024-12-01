// this.$route.path
export function showLayoutV2 (path) {
  return true
}

export function enableSchemaOrg (path) {
  return path.startsWith('/deutschland/niedersachsen') || path.startsWith('/deutschland/mecklenburg-vorpommern')
}
