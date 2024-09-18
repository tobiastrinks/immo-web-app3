export async function deepFetchCfObject (cfClient, query) {
  const { items } = await cfClient.getEntries(query)
  const nestedItems = await getDeepNestedItems(cfClient, items)
  return buildSimplifiedCfObject(items, nestedItems)
}

async function getDeepNestedItems (cfClient, initialItems) {
  const missingIds = extractNestedMissingFieldIds(initialItems.map(i => i.fields))
  if (!missingIds.length) {
    return []
  }
  const { items } = await cfClient.getEntries({
    'sys.id[in]': missingIds.join(',')
  })
  return [...items, ...(await getDeepNestedItems(cfClient, items))]
}

function isLinkWithoutFields (cfObj) {
  return (
    cfObj.sys &&
    !cfObj.fields &&
    cfObj.sys.type === 'Link' &&
    cfObj.sys.linkType === 'Entry'
  )
}

function extractNestedMissingFieldIds (cfObj) {
  if (Array.isArray(cfObj)) {
    return cfObj.map(i => extractNestedMissingFieldIds(i)).flatMap(i => i)
  }
  const missingIds = []
  Object.keys(cfObj).forEach((key) => {
    (Array.isArray(cfObj[key]) ? cfObj[key] : [cfObj[key]]).forEach((field) => {
      if (isLinkWithoutFields(field)) {
        missingIds.push(field.sys.id)
      } else if (field.fields) {
        missingIds.push(...extractNestedMissingFieldIds(field.fields))
      }
    })
  })
  return missingIds
}

function buildSimplifiedCfObject (items, nestedItems) {
  function getFieldsWithContentType (cfObj) {
    if (isLinkWithoutFields(cfObj)) {
      const link = nestedItems.find(i => i.sys.id === cfObj.sys.id)
      if (link) {
        const { fields, sys } = link
        cfObj.fields = fields
        cfObj.sys = sys
      } else {
        // eslint-disable-next-line no-console
        console.error('Contentful reference object missing:', cfObj, 'Not found in: ', nestedItems)
        cfObj.fields = {}
      }
    }
    const { contentType } = cfObj.sys
    const fields = {
      ...cfObj.fields,
      cfContentType: contentType ? contentType.sys.id : undefined
    }

    const keys = Object.keys(cfObj.fields)
    keys.forEach((key) => {
      if (fields[key].sys || (fields[key][0] && fields[key][0].sys)) {
        fields[key] = buildSimplifiedCfObject(fields[key], nestedItems)
      }
    })
    return fields
  }
  return Array.isArray(items)
    ? items.map(i => getFieldsWithContentType(i))
    : getFieldsWithContentType(items)
}
