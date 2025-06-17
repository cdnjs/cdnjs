"use strict";
var c = Object.defineProperty;
var m = Object.getOwnPropertyDescriptor;
var x = Object.getOwnPropertyNames;
var l = Object.prototype.hasOwnProperty;
var p = (e, o) => {
  for (var t in o)
    c(e, t, { get: o[t], enumerable: !0 });
}, f = (e, o, t, r) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of x(o))
      !l.call(e, n) && n !== t && c(e, n, { get: () => o[n], enumerable: !(r = m(o, n)) || r.enumerable });
  return e;
};
var i = (e) => f(c({}, "__esModule", { value: !0 }), e);

// src/subscribe.ts
var y = {};
p(y, {
  subscribe: () => a,
  subscriptions: () => s,
  update: () => v,
  updateAll: () => b
});
module.exports = i(y);

// src/constants.ts
var u = Symbol(), S = Symbol();

// src/subscribe.ts
var s = {}, a = (e, o) => {
  var n, d;
  if (e == null)
    return () => {
    };
  let t = (d = s[n = e[u]]) != null ? d : s[n] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, v = (e) => {
  var o, t;
  for (let r of ((t = (o = s[e[u]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, b = () => {
  Object.values(s).map((e) => {
    for (let o of e.values())
      o();
  });
};
