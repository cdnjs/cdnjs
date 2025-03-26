"use strict";
var o = Object.defineProperty;
var b = Object.getOwnPropertyDescriptor;
var n = Object.getOwnPropertyNames;
var a = Object.prototype.hasOwnProperty;
var v = (u, e) => {
  for (var i in e)
    o(u, i, { get: e[i], enumerable: !0 });
}, d = (u, e, i, s) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of n(e))
      !a.call(u, r) && r !== i && o(u, r, { get: () => e[r], enumerable: !(s = b(e, r)) || s.enumerable });
  return u;
};
var m = (u) => d(o({}, "__esModule", { value: !0 }), u);

// src/svelte.ts
var R = {};
v(R, {
  useStore: () => x
});
module.exports = m(R);
var t = require("exome");
function x(u, e = (i) => i) {
  return {
    subscribe(i) {
      return i(e(u)), (0, t.subscribe)(u, () => i(e(u)));
    }
  };
}
