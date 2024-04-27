"use strict";
var c = Object.defineProperty;
var p = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var a = Object.prototype.hasOwnProperty;
var u = (t, o) => {
  for (var e in o)
    c(t, e, { get: o[e], enumerable: !0 });
}, f = (t, o, e, r) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of d(o))
      !a.call(t, n) && n !== e && c(t, n, { get: () => o[n], enumerable: !(r = p(o, n)) || r.enumerable });
  return t;
};
var l = (t) => f(c({}, "__esModule", { value: !0 }), t);

// src/subscribe.ts
var i = {};
u(i, {
  subscribe: () => T,
  subscriptions: () => s,
  update: () => S,
  updateAll: () => b
});
module.exports = l(i);

// src/constants.ts
var x = Symbol(), y = Symbol();

// src/subscribe.ts
var s = {}, T = (t, o) => {
  var n, m;
  let e = (m = s[n = t[x]]) != null ? m : s[n] = /* @__PURE__ */ new Set(), r = () => o(t);
  return e.add(r), () => {
    e.delete(r);
  };
}, S = (t) => {
  var o, e;
  for (let r of ((e = (o = s[t[x]]) == null ? void 0 : o.values) == null ? void 0 : e.call(o)) || [])
    r();
}, b = () => {
  Object.values(s).map((t) => {
    for (let o of t.values())
      o();
  });
};
