"use strict";
var a = Object.defineProperty;
var l = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var y = Object.prototype.hasOwnProperty;
var b = (e, n) => {
  for (var t in n)
    a(e, t, { get: n[t], enumerable: !0 });
}, p = (e, n, t, r) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of m(n))
      !y.call(e, o) && o !== t && a(e, o, { get: () => n[o], enumerable: !(r = l(n, o)) || r.enumerable });
  return e;
};
var x = (e) => p(a({}, "__esModule", { value: !0 }), e);

// src/angular.ts
var f = {};
b(f, {
  useStore: () => c
});
module.exports = x(f);
var s = require("@angular/core"), u = require("exome");
function c(e, n = (t) => t) {
  let t = (0, s.signal)(n(e));
  function r() {
    t.set(n(e));
  }
  let o = (0, u.subscribe)(e, r), i = (0, s.assertInInjectionContext)(c) ? (0, s.inject)(s.DestroyRef) : null;
  return i == null || i.onDestroy(o), t.asReadonly();
}
