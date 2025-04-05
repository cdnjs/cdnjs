var O = Object.defineProperty;
var c = Object.getOwnPropertySymbols;
var y = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable;
var $ = (e, t, o) => t in e ? O(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, w = (e, t) => {
  for (var o in t || (t = {}))
    y.call(t, o) && $(e, o, t[o]);
  if (c)
    for (var o of c(t))
      l.call(t, o) && $(e, o, t[o]);
  return e;
};
var f = (e, t) => {
  var o = {};
  for (var r in e)
    y.call(e, r) && t.indexOf(r) < 0 && (o[r] = e[r]);
  if (e != null && c)
    for (var r of c(e))
      t.indexOf(r) < 0 && l.call(e, r) && (o[r] = e[r]);
  return o;
};

// src/utils/save-state.ts
import { Exome as I, getExomeId as A } from "exome";
var L = () => {
  let e = {};
  return (t, o) => {
    if (o instanceof I) {
      let r = A(o);
      return r ? e[r] ? {
        $$exome_id: r
      } : (e[r] = !0, w({
        $$exome_id: r
      }, o)) : o;
    }
    return o;
  };
}, j = (e, t = !1) => {
  let o = JSON.stringify(e, L(), t ? 2 : void 0);
  return o === void 0 ? "null" : o;
};

// src/utils/load-state.ts
import {
  exomeId as T,
  exomeName as N,
  runMiddleware as S,
  updateAll as R
} from "exome";
var b = {}, D = (e) => {
  Object.keys(e).forEach((t) => {
    e[t].prototype[N] = t, b[t] = e[t];
  });
}, J = (e, t) => {
  if (!t || typeof t != "string")
    throw new Error(
      `State was not loaded. Passed state must be string, instead received "${typeof t}".`
    );
  let o = /* @__PURE__ */ new Map(), r = JSON.parse(t, (_, s) => {
    if (_ !== "" && s && typeof s == "object" && s.$$exome_id) {
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
      let [m] = a.split("-"), E = b[m];
      if (!E)
        throw new Error(
          `State cannot be loaded! "${m}" was not registered via \`registerLoadable\`.`
        );
      try {
        let n = new E(), h = S(n, "LOAD_STATE", []);
        return n[T] = a, Object.assign(n, i), o.set(a, n), h(), n;
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
  let g = r, { $$exome_id: M } = g, x = f(g, ["$$exome_id"]), u = S(e, "LOAD_STATE", []);
  return Object.assign(e, x), u(), R(), x;
};
export {
  J as loadState,
  D as registerLoadable,
  j as saveState
};
