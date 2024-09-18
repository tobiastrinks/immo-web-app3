export function elemHeight (elem) {
  const style = getComputedStyle(elem)
  return elem.offsetHeight + parseInt(style.marginBottom) + parseInt(style.marginTop)
}
