"use strict";
var c = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var b = (n, e) => {
  for (var t in e)
    c(n, t, { get: e[t], enumerable: !0 });
}, f = (n, e, t, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of m(e))
      !p.call(n, o) && o !== t && c(n, o, { get: () => e[o], enumerable: !(r = i(e, o)) || r.enumerable });
  return n;
};
var x = (n) => f(c({}, "__esModule", { value: !0 }), n);

// src/solid.ts
var l = {};
b(l, {
  useStore: () => T
});
module.exports = x(l);
var u = require("exome"), s = require("solid-js");
function T(n, e = (t) => t) {
  let [t, r] = (0, s.createSignal)(e(n));
  function o() {
    r(() => e(n));
  }
  let a = (0, u.subscribe)(n, o);
  return (0, s.onCleanup)(() => a), t;
}
