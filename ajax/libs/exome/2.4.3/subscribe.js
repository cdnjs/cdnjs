"use strict";
var c = Object.defineProperty;
var d = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var u = Object.prototype.hasOwnProperty;
var a = (e, o) => {
  for (var t in o)
    c(e, t, { get: o[t], enumerable: !0 });
}, l = (e, o, t, r) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of p(o))
      !u.call(e, n) && n !== t && c(e, n, { get: () => o[n], enumerable: !(r = d(o, n)) || r.enumerable });
  return e;
};
var f = (e) => l(c({}, "__esModule", { value: !0 }), e);

// src/subscribe.ts
var y = {};
a(y, {
  subscribe: () => i,
  subscriptions: () => s,
  update: () => v,
  updateAll: () => b
});
module.exports = f(y);

// src/constants.ts
var m = Symbol(), S = Symbol();

// src/subscribe.ts
var s = {}, i = (e, o) => {
  var n, x;
  let t = (x = s[n = e[m]]) != null ? x : s[n] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, v = (e) => {
  var o, t;
  for (let r of ((t = (o = s[e[m]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, b = () => {
  Object.values(s).map((e) => {
    for (let o of e.values())
      o();
  });
};
