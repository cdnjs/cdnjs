"use strict";
var d = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var g = Object.getOwnPropertyNames;
var E = Object.prototype.hasOwnProperty;
var b = (r, n) => {
  for (var o in n)
    d(r, o, { get: n[o], enumerable: !0 });
}, x = (r, n, o, e) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let t of g(n))
      !E.call(r, t) && t !== o && d(r, t, { get: () => n[t], enumerable: !(e = y(n, t)) || e.enumerable });
  return r;
};
var m = (r) => x(d({}, "__esModule", { value: !0 }), r);

// src/utils.ts
var R = {};
b(R, {
  getActionStatus: () => A
});
module.exports = m(R);
var s = require("exome"), i = {};
function A(r, n) {
  let o = (0, s.getExomeId)(r) + ":" + n, e = i[o];
  if (e)
    return e;
  e = i[o] = {
    loading: !1,
    error: !1,
    response: void 0,
    unsubscribe() {
      u(), i[o] = void 0;
    }
  };
  let t = 0, u = (0, s.addMiddleware)((a, c, S) => {
    if (a !== r || c !== n || !e)
      return;
    t++;
    let f = t;
    return e.loading = !0, e.error = !1, e.response = void 0, (0, s.update)(a), (l, p) => {
      f !== t || !e || (e.loading = !1, e.error = l || !1, e.response = p || void 0, (0, s.update)(a));
    };
  });
  return e;
}
