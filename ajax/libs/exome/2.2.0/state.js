"use strict";
var x = Object.defineProperty;
var N = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols;
var $ = Object.prototype.hasOwnProperty, S = Object.prototype.propertyIsEnumerable;
var u = (t, e, o) => e in t ? x(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, h = (t, e) => {
  for (var o in e || (e = {}))
    $.call(e, o) && u(t, o, e[o]);
  if (f)
    for (var o of f(e))
      S.call(e, o) && u(t, o, e[o]);
  return t;
};
var E = (t, e) => {
  var o = {};
  for (var r in t)
    $.call(t, r) && e.indexOf(r) < 0 && (o[r] = t[r]);
  if (t != null && f)
    for (var r of f(t))
      e.indexOf(r) < 0 && S.call(t, r) && (o[r] = t[r]);
  return o;
};
var J = (t, e) => {
  for (var o in e)
    x(t, o, { get: e[o], enumerable: !0 });
}, M = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of R(e))
      !$.call(t, a) && a !== o && x(t, a, { get: () => e[a], enumerable: !(r = N(e, a)) || r.enumerable });
  return t;
};
var P = (t) => M(x({}, "__esModule", { value: !0 }), t);

// src/state.ts
var D = {};
J(D, {
  loadState: () => j,
  registerLoadable: () => O,
  saveState: () => _
});
module.exports = P(D);

// src/utils/save-state.ts
var g = require("exome");
var T = () => {
  let t = {};
  return (e, o) => {
    if (o instanceof g.Exome) {
      let r = (0, g.getExomeId)(o);
      return r ? t[r] ? {
        $$exome_id: r
      } : (t[r] = !0, h({
        $$exome_id: r
      }, o)) : o;
    }
    return o;
  };
}, _ = (t, e = !1) => {
  let o = JSON.stringify(t, T(), e ? 2 : void 0);
  return o === void 0 ? "null" : o;
};

// src/utils/load-state.ts
var s = require("exome");
var I = {}, O = (t) => {
  Object.keys(t).forEach((e) => {
    t[e].prototype[s.exomeName] = e, I[e] = t[e];
  });
}, j = (t, e) => {
  if (!e || typeof e != "string")
    throw new Error(
      `State was not loaded. Passed state must be string, instead received "${typeof e}".`
    );
  let o = /* @__PURE__ */ new Map(), r = JSON.parse(e, (L, i) => {
    if (L !== "" && i && typeof i == "object" && i.$$exome_id) {
      let y = i, {
        $$exome_id: d
      } = y, c = E(y, [
        "$$exome_id"
      ]), m = o.get(d);
      if (m) {
        for (let n in c)
          m[n] !== c[n] && (m[n] = c[n]);
        return m;
      }
      let [p] = d.split("-"), b = I[p];
      if (!b)
        throw new Error(
          `State cannot be loaded! "${p}" was not registered via \`registerLoadable\`.`
        );
      try {
        let n = new b(), A = (0, s.runMiddleware)(n, "LOAD_STATE", []);
        return n[s.exomeId] = d, Object.assign(n, c), o.set(d, n), A(), n;
      } catch (n) {
        throw new Error(
          `State cannot be loaded! "${p}.constructor" has logic that prevents state from being loaded.`
        );
      }
    }
    return i;
  });
  if (!(r != null && r.$$exome_id))
    throw new Error(
      "State was not loaded. Passed state string is not saved Exome instance."
    );
  let w = r, { $$exome_id: a } = w, l = E(w, ["$$exome_id"]);
  return Object.assign(t, l), (0, s.updateAll)(), l;
};
