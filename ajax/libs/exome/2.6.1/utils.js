"use strict";
var i = Object.defineProperty;
var g = Object.getOwnPropertyDescriptor;
var E = Object.getOwnPropertyNames;
var b = Object.prototype.hasOwnProperty;
var x = (t, r) => {
  for (var o in r)
    i(t, o, { get: r[o], enumerable: !0 });
}, y = (t, r, o, e) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let n of E(r))
      !b.call(t, n) && n !== o && i(t, n, { get: () => r[n], enumerable: !(e = g(r, n)) || e.enumerable });
  return t;
};
var m = (t) => y(i({}, "__esModule", { value: !0 }), t);

// src/utils.ts
var A = {};
x(A, {
  getActionStatus: () => p
});
module.exports = m(A);
var a = require("exome"), u = {};
function p(t, r) {
  let o = (0, a.getExomeId)(t) + ":" + r, e = u[o];
  if (e)
    return e;
  e = u[o] = {
    loading: !1,
    error: !1,
    unsubscribe() {
      d(), u[o] = void 0;
    }
  };
  let n = 0, d = (0, a.addMiddleware)((s, c, S) => {
    if (s !== t || c !== r || !e)
      return;
    n++;
    let l = n;
    return e.loading = !0, e.error = !1, (0, a.update)(s), (f) => {
      l !== n || !e || (e.loading = !1, e.error = f || !1, (0, a.update)(s));
    };
  });
  return e;
}
