"use strict";
var n = Object.defineProperty;
var s = Object.getOwnPropertyDescriptor;
var a = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var x = (r, e) => {
  for (var t in e)
    n(r, t, { get: e[t], enumerable: !0 });
}, T = (r, e, t, i) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let u of a(e))
      !m.call(r, u) && u !== t && n(r, u, { get: () => e[u], enumerable: !(i = s(e, u)) || i.enumerable });
  return r;
};
var b = (r) => T(n({}, "__esModule", { value: !0 }), r);

// src/svelte.ts
var R = {};
x(R, {
  useStore: () => p
});
module.exports = b(R);
var o = require("exome");
function p(r, e = (t) => t) {
  return {
    subscribe(t) {
      return t(e(r)), (0, o.subscribe)(r, () => t(e(r)));
    }
  };
}
