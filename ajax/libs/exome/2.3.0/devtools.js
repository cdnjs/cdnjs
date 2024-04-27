"use strict";
var p = Object.defineProperty;
var A = Object.getOwnPropertyDescriptor;
var D = Object.getOwnPropertyNames, y = Object.getOwnPropertySymbols;
var b = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
var O = (e, t, n) => t in e ? p(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, _ = (e, t) => {
  for (var n in t || (t = {}))
    b.call(t, n) && O(e, n, t[n]);
  if (y)
    for (var n of y(t))
      w.call(t, n) && O(e, n, t[n]);
  return e;
};
var N = (e, t) => {
  var n = {};
  for (var o in e)
    b.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && y)
    for (var o of y(e))
      t.indexOf(o) < 0 && w.call(e, o) && (n[o] = e[o]);
  return n;
};
var M = (e, t) => {
  for (var n in t)
    p(e, n, { get: t[n], enumerable: !0 });
}, j = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of D(t))
      !b.call(e, r) && r !== n && p(e, r, { get: () => t[r], enumerable: !(o = A(t, r)) || o.enumerable });
  return e;
};
var C = (e) => j(p({}, "__esModule", { value: !0 }), e);

// src/devtools.ts
var T = {};
M(T, {
  exomeReduxDevtools: () => S
});
module.exports = C(T);

// src/devtools-redux.ts
var s = require("exome");
var u = /* @__PURE__ */ new Map();
function E(e, t = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof s.Exome && (0, s.getExomeId)(e)) {
    let o = (0, s.getExomeId)(e);
    if (t.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let r = E(_({}, e), t.concat(o));
    return _({
      $$exome_id: o
    }, r);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let n = e.constructor() || {};
  for (let o of Object.keys(e))
    n[o] = E(e[o], t);
  return n;
}
var $ = () => {
  let e = {};
  for (let [t, n] of u.entries())
    e[t] = Array.from(n.values());
  return E(e);
}, S = ({
  name: e,
  maxAge: t,
  actionsBlacklist: n
}) => {
  let o = "__REDUX_DEVTOOLS_EXTENSION__", r;
  try {
    r = window[o] || window.top[o];
  } catch (i) {
  }
  if (!r)
    return console.warn(
      `Please install Redux devtools extension
https://github.com/reduxjs/redux-devtools`
    ), () => {
    };
  let k = {
    name: e,
    maxAge: t,
    actionsBlacklist: n
  }, f = r.connect(k);
  return f.subscribe((i) => {
    i.type === "DISPATCH" && i.state && (JSON.parse(i.state, (m, a) => {
      var c;
      if (typeof a == "object" && a !== null && "$$exome_id" in a) {
        let l = a, { $$exome_id: d } = l, g = N(l, ["$$exome_id"]), [x] = d.split("-"), R = (c = u.get(x)) == null ? void 0 : c.get(d);
        return Object.assign(R, g), R;
      }
      return a;
    }), (0, s.updateAll)());
  }), f.init($()), (i, m, a) => {
    var g;
    let c = (0, s.getExomeId)(i).replace(/-.*$/, ""), d = `[${c}] ${m}`;
    if (c)
      return u.has(c) || u.set(c, /* @__PURE__ */ new Map()), m === "NEW" && ((g = u.get(c)) == null || g.set((0, s.getExomeId)(i), i), f.send({ type: d, payload: void 0 }, $())), () => {
        let x = [];
        try {
          x = JSON.parse(JSON.stringify(a));
        } catch (R) {
        }
        f.send({ type: d, payload: x }, $());
      };
  };
};
