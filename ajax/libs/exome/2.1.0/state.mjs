var h = Object.defineProperty;
var c = Object.getOwnPropertySymbols;
var l = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
var E = (e, t, o) => t in e ? h(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, y = (e, t) => {
  for (var o in t || (t = {}))
    l.call(t, o) && E(e, o, t[o]);
  if (c)
    for (var o of c(t))
      w.call(t, o) && E(e, o, t[o]);
  return e;
};
var f = (e, t) => {
  var o = {};
  for (var r in e)
    l.call(e, r) && t.indexOf(r) < 0 && (o[r] = e[r]);
  if (e != null && c)
    for (var r of c(e))
      t.indexOf(r) < 0 && w.call(e, r) && (o[r] = e[r]);
  return o;
};

// src/utils/save-state.ts
import { Exome as _, getExomeId as I } from "exome";
var O = () => {
  let e = {};
  return (t, o) => {
    if (o instanceof _) {
      let r = I(o);
      return r ? e[r] ? {
        $$exome_id: r
      } : (e[r] = !0, y({
        $$exome_id: r
      }, o)) : o;
    }
    return o;
  };
}, j = (e, t = !1) => {
  let o = JSON.stringify(e, O(), t ? 2 : void 0);
  return o === void 0 ? "null" : o;
};

// src/utils/load-state.ts
import { exomeId as L, exomeName as A, runMiddleware as N, updateAll as R } from "exome";
var b = {}, J = (e) => {
  Object.keys(e).forEach((t) => {
    e[t].prototype[A] = t, b[t] = e[t];
  });
}, M = (e, t) => {
  if (!t || typeof t != "string")
    throw new Error(
      `State was not loaded. Passed state must be string, instead received "${typeof t}".`
    );
  let o = /* @__PURE__ */ new Map(), r = JSON.parse(t, (u, s) => {
    if (u !== "" && s && typeof s == "object" && s.$$exome_id) {
      let p = s, {
        $$exome_id: a
      } = p, i = f(p, [
        "$$exome_id"
      ]), d = o.get(a);
      if (d) {
        for (let n in i)
          d[n] !== i[n] && (d[n] = i[n]);
        return d;
      }
      let [m] = a.split("-"), $ = b[m];
      if (!$)
        throw new Error(
          `State cannot be loaded! "${m}" was not registered via \`registerLoadable\`.`
        );
      try {
        let n = new $(), S = N(n, "LOAD_STATE", []);
        return n[L] = a, Object.assign(n, i), o.set(a, n), S(), n;
      } catch (n) {
        throw new Error(
          `State cannot be loaded! "${m}.constructor" has logic that prevents state from being loaded.`
        );
      }
    }
    return s;
  });
  if (!(r != null && r.$$exome_id))
    throw new Error(
      "State was not loaded. Passed state string is not saved Exome instance."
    );
  let g = r, { $$exome_id: P } = g, x = f(g, ["$$exome_id"]);
  return Object.assign(e, x), R(), x;
};
export {
  M as loadState,
  J as registerLoadable,
  j as saveState
};
