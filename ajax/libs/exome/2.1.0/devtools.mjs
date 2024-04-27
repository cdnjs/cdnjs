var S = Object.defineProperty;
var x = Object.getOwnPropertySymbols;
var E = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable;
var $ = (e, t, n) => t in e ? S(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, R = (e, t) => {
  for (var n in t || (t = {}))
    E.call(t, n) && $(e, n, t[n]);
  if (x)
    for (var n of x(t))
      O.call(t, n) && $(e, n, t[n]);
  return e;
};
var w = (e, t) => {
  var n = {};
  for (var o in e)
    E.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
  if (e != null && x)
    for (var o of x(e))
      t.indexOf(o) < 0 && O.call(e, o) && (n[o] = e[o]);
  return n;
};

// src/devtools-redux.ts
import { Exome as k, getExomeId as y, updateAll as A } from "exome";
var d = /* @__PURE__ */ new Map();
function _(e, t = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof k && y(e)) {
    let o = y(e);
    if (t.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let c = _(R({}, e), t.concat(o));
    return R({
      $$exome_id: o
    }, c);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let n = e.constructor() || {};
  for (let o of Object.keys(e))
    n[o] = _(e[o], t);
  return n;
}
var b = () => {
  let e = {};
  for (let [t, n] of d.entries())
    e[t] = Array.from(n.values());
  return _(e);
}, D = ({
  name: e,
  maxAge: t,
  actionsBlacklist: n
}) => {
  let o = "__REDUX_DEVTOOLS_EXTENSION__", c;
  try {
    c = window[o] || window.top[o];
  } catch (r) {
  }
  if (!c)
    return console.warn(
      `Please install Redux devtools extension
https://github.com/reduxjs/redux-devtools`
    ), () => {
    };
  let N = {
    name: e,
    maxAge: t,
    actionsBlacklist: n
  }, u = c.connect(N);
  return u.subscribe((r) => {
    r.type === "DISPATCH" && r.state && (JSON.parse(r.state, (p, i) => {
      var s;
      if (typeof i == "object" && i !== null && "$$exome_id" in i) {
        let m = i, { $$exome_id: a } = m, f = w(m, ["$$exome_id"]), [g] = a.split("-"), l = (s = d.get(g)) == null ? void 0 : s.get(a);
        return Object.assign(l, f), l;
      }
      return i;
    }), A());
  }), u.init(b()), (r, p, i) => {
    var f;
    let s = y(r).replace(/-.*$/, ""), a = `[${s}] ${p}`;
    if (s)
      return d.has(s) || d.set(s, /* @__PURE__ */ new Map()), p === "NEW" && ((f = d.get(s)) == null || f.set(y(r), r), u.send({ type: a, payload: void 0 }, b())), () => {
        let g = [];
        try {
          g = JSON.parse(JSON.stringify(i));
        } catch (l) {
        }
        u.send({ type: a, payload: g }, b());
      };
  };
};
export {
  D as exomeReduxDevtools
};
