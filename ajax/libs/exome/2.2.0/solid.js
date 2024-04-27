"use strict";
var a = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var p = Object.prototype.hasOwnProperty;
var b = (n, e) => {
  for (var t in e)
    a(n, t, { get: e[t], enumerable: !0 });
}, f = (n, e, t, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of m(e))
      !p.call(n, o) && o !== t && a(n, o, { get: () => e[o], enumerable: !(r = c(e, o)) || r.enumerable });
  return n;
};
var x = (n) => f(a({}, "__esModule", { value: !0 }), n);

// src/solid.ts
var l = {};
b(l, {
  useStore: () => T
});
module.exports = x(l);
var s = require("exome"), u = require("solid-js");
function T(n, e = (t) => t) {
  let [t, r] = (0, u.createSignal)(e(n));
  function o() {
    r(() => e(n));
  }
  let i = (0, s.subscribe)(n, o);
  return (0, u.onCleanup)(() => i), t;
}
