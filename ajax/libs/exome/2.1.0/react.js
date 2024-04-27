"use strict";
var u = Object.defineProperty;
var s = Object.getOwnPropertyDescriptor;
var m = Object.getOwnPropertyNames;
var i = Object.prototype.hasOwnProperty;
var d = (e, t) => {
  for (var r in t)
    u(e, r, { get: t[r], enumerable: !0 });
}, p = (e, t, r, f) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of m(t))
      !i.call(e, n) && n !== r && u(e, n, { get: () => t[n], enumerable: !(f = s(t, n)) || f.enumerable });
  return e;
};
var y = (e) => p(u({}, "__esModule", { value: !0 }), e);

// src/react.ts
var b = {};
d(b, {
  useStore: () => x
});
module.exports = y(b);
var c = require("exome"), o = require("react"), E = typeof window != "undefined" ? o.useLayoutEffect : o.useEffect;
function a(e) {
  return e + 1;
}
var x = (e) => {
  let [, t] = (0, o.useState)(0);
  return E(
    () => (0, c.subscribe)(e, () => t(a)),
    [e]
  ), e;
};
