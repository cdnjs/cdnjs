"use strict";
var u = Object.defineProperty;
var s = Object.getOwnPropertyDescriptor;
var t = Object.getOwnPropertyNames;
var m = Object.prototype.hasOwnProperty;
var p = (o, n) => {
  for (var e in n)
    u(o, e, { get: n[e], enumerable: !0 });
}, x = (o, n, e, f) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let r of t(n))
      !m.call(o, r) && r !== e && u(o, r, { get: () => n[r], enumerable: !(f = s(n, r)) || f.enumerable });
  return o;
};
var d = (o) => x(u({}, "__esModule", { value: !0 }), o);

// src/vue.ts
var R = {};
p(R, {
  useStore: () => E
});
module.exports = d(R);
var c = require("exome"), i = require("vue");
function E(o) {
  let n = {};
  function e() {
    Object.keys(n).forEach((f) => {
      n[f].value = o[f];
    });
  }
  return (0, i.watchEffect)(() => (0, c.subscribe)(o, e), {
    flush: "pre"
  }), new Proxy(o, {
    get(f, r) {
      return f === o && typeof f[r] == "function" || f && f[r] instanceof c.Exome ? f[r] : n[r] || (n[r] = (0, i.ref)(f[r]));
    }
  });
}
