export function yearsDiff (d1, d2) {
  const date1 = new Date(d1)
  const date2 = new Date(d2)
  return date2.getFullYear() - date1.getFullYear()
}

export function monthsDiff (d1, d2) {
  const date1 = new Date(d1)
  const date2 = new Date(d2)
  const years = yearsDiff(d1, d2)
  return (years * 12) + (date2.getMonth() - date1.getMonth())
}
