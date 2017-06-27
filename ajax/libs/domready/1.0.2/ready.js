/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function () {

  var fns = [], fn, f = false
    , doc = document
    , domContentLoaded = 'DOMContentLoaded'
    , onreadystatechange = 'onreadystatechange'
    , loaded = /^loaded|^c/.test(doc.readyState)

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc.addEventListener(domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }
});
