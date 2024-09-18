export function offsetTop (elem) {
  Element.prototype.documentOffsetTop = function () {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0)
  }
  return elem.documentOffsetTop()
}

export function debounce (method, delay) {
  clearTimeout(method._tId)
  method._tId = setTimeout(function () {
    method()
  }, delay)
}

export function throttle (fn, delay) {
  let time = Date.now()
  return () => {
    if ((time + delay - Date.now()) <= 0) {
      fn()
      time = Date.now()
    }
  }
}
