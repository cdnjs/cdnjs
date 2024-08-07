"use strict";
var x = Object.defineProperty;
var N = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames, f = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, u = Object.prototype.propertyIsEnumerable;
var b = (t, e, o) => e in t ? x(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, _ = (t, e) => {
  for (var o in e || (e = {}))
    E.call(e, o) && b(t, o, e[o]);
  if (f)
    for (var o of f(e))
      u.call(e, o) && b(t, o, e[o]);
  return t;
};
var $ = (t, e) => {
  var o = {};
  for (var r in t)
    E.call(t, r) && e.indexOf(r) < 0 && (o[r] = t[r]);
  if (t != null && f)
    for (var r of f(t))
      e.indexOf(r) < 0 && u.call(t, r) && (o[r] = t[r]);
  return o;
};
var D = (t, e) => {
  for (var o in e)
    x(t, o, { get: e[o], enumerable: !0 });
}, J = (t, e, o, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of R(e))
      !E.call(t, a) && a !== o && x(t, a, { get: () => e[a], enumerable: !(r = N(e, a)) || r.enumerable });
  return t;
};
var M = (t) => J(x({}, "__esModule", { value: !0 }), t);

// src/state.ts
var k = {};
D(k, {
  loadState: () => A,
  registerLoadable: () => I,
  saveState: () => h
});
module.exports = M(k);

// src/utils/save-state.ts
var g = require("exome");
var P = () => {
  let t = {};
  return (e, o) => {
    if (o instanceof g.Exome) {
      let r = (0, g.getExomeId)(o);
      return r ? t[r] ? {
        $$exome_id: r
      } : (t[r] = !0, _({
        $$exome_id: r
      }, o)) : o;
    }
    return o;
  };
}, h = (t, e = !1) => {
  let o = JSON.stringify(t, P(), e ? 2 : void 0);
  return o === void 0 ? "null" : o;
};

// src/utils/load-state.ts
var s = require("exome");
var O = {}, I = (t) => {
  Object.keys(t).forEach((e) => {
    t[e].prototype[s.exomeName] = e, O[e] = t[e];
  });
}, A = (t, e) => {
  if (!e || typeof e != "string")
    throw new Error(
      `State was not loaded. Passed state must be string, instead received "${typeof e}".`
    );
  let o = /* @__PURE__ */ new Map(), r = JSON.parse(e, (j, i) => {
    if (j !== "" && i && typeof i == "object" && i.$$exome_id) {
      let w = i, {
        $$exome_id: d
      } = w, c = $(w, [
        "$$exome_id"
      ]), m = o.get(d);
      if (m) {
        for (let n in c)
          m[n] !== c[n] && (m[n] = c[n]);
        return m;
      }
      let [p] = d.split("-"), S = O[p];
      if (!S)
        throw new Error(
          `State cannot be loaded! "${p}" was not registered via \`registerLoadable\`.`
        );
      try {
        let n = new S(), T = (0, s.runMiddleware)(n, "LOAD_STATE", []);
        return n[s.exomeId] = d, Object.assign(n, c), o.set(d, n), T(), n;
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
  let l = r, { $$exome_id: a } = l, y = $(l, ["$$exome_id"]), L = (0, s.runMiddleware)(t, "LOAD_STATE", []);
  return Object.assign(t, y), L(), (0, s.updateAll)(), y;
};
