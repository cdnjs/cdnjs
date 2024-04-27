"use strict";
var u = Object.defineProperty;
var i = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var s = Object.prototype.hasOwnProperty;
var d = (e, t) => {
  for (var r in t)
    u(e, r, { get: t[r], enumerable: !0 });
}, p = (e, t, r, f) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of m(t))
      !s.call(e, o) && o !== r && u(e, o, { get: () => t[o], enumerable: !(f = i(t, o)) || f.enumerable });
  return e;
};
var y = (e) => p(u({}, "__esModule", { value: !0 }), e);

// src/preact.ts
var b = {};
d(b, {
  useStore: () => x
});
module.exports = y(b);
var c = require("exome"), n = require("preact/hooks"), E = typeof window != "undefined" ? n.useLayoutEffect : n.useEffect;
function a(e) {
  return e + 1;
}
function x(e) {
  let [, t] = (0, n.useState)(0);
  return E(
    () => (0, c.subscribe)(e, () => t(a)),
    [e]
  ), e;
}
