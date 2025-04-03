"use strict";
var r = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var s = Object.getOwnPropertyNames;
var i = Object.prototype.hasOwnProperty;
var d = (e, n) => {
  for (var u in n)
    r(e, u, { get: n[u], enumerable: !0 });
}, p = (e, n, u, f) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of s(n))
      !i.call(e, o) && o !== u && r(e, o, { get: () => n[o], enumerable: !(f = m(n, o)) || f.enumerable });
  return e;
};
var y = (e) => p(r({}, "__esModule", { value: !0 }), e);

// src/react.ts
var x = {};
d(x, {
  useStore: () => b
});
module.exports = y(x);
var c = require("exome"), t = require("react"), E = typeof window != "undefined" ? t.useLayoutEffect : t.useEffect;
function a(e) {
  return e + 1;
}
var b = (e) => {
  let [, n] = (0, t.useState)(0);
  return E(
    () => (0, c.subscribe)(e, () => n(a)),
    [e]
  ), e;
};
