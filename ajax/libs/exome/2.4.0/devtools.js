"use strict";
var w = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var G = Object.getOwnPropertyNames, v = Object.getOwnPropertySymbols;
var N = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var T = (e, n, t) => n in e ? w(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, D = (e, n) => {
  for (var t in n || (n = {}))
    N.call(n, t) && T(e, t, n[t]);
  if (v)
    for (var t of v(n))
      k.call(n, t) && T(e, t, n[t]);
  return e;
};
var I = (e, n) => {
  var t = {};
  for (var o in e)
    N.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && v)
    for (var o of v(e))
      n.indexOf(o) < 0 && k.call(e, o) && (t[o] = e[o]);
  return t;
};
var W = (e, n) => {
  for (var t in n)
    w(e, t, { get: n[t], enumerable: !0 });
}, F = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of G(n))
      !N.call(e, s) && s !== t && w(e, s, { get: () => n[s], enumerable: !(o = B(n, s)) || o.enumerable });
  return e;
};
var H = (e) => F(w({}, "__esModule", { value: !0 }), e);

// src/devtools.ts
var q = {};
W(q, {
  exomeReduxDevtools: () => C,
  unstableExomeDevtools: () => L
});
module.exports = H(q);

// src/devtools-redux.ts
var m = require("exome");
var O = /* @__PURE__ */ new Map();
function R(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof m.Exome && (0, m.getExomeId)(e)) {
    let o = (0, m.getExomeId)(e);
    if (n.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let s = R(D({}, e), n.concat(o));
    return D({
      $$exome_id: o
    }, s);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let t = e.constructor() || {};
  for (let o of Object.keys(e))
    t[o] = R(e[o], n);
  return t;
}
var A = () => {
  let e = {};
  for (let [n, t] of O.entries())
    e[n] = Array.from(t.values());
  return R(e);
}, C = ({
  name: e,
  maxAge: n,
  actionsBlacklist: t
}) => {
  let o = "__REDUX_DEVTOOLS_EXTENSION__", s;
  try {
    s = window[o] || window.top[o];
  } catch (r) {
  }
  if (!s)
    return console.warn(
      `Please install Redux devtools extension
https://github.com/reduxjs/redux-devtools`
    ), () => {
    };
  let g = {
    name: e,
    maxAge: n,
    actionsBlacklist: t
  }, f = s.connect(g);
  return f.subscribe((r) => {
    r.type === "DISPATCH" && r.state && (JSON.parse(r.state, (a, y) => {
      var c;
      if (typeof y == "object" && y !== null && "$$exome_id" in y) {
        let i = y, { $$exome_id: l } = i, d = I(i, ["$$exome_id"]), [p] = l.split("-"), b = (c = O.get(p)) == null ? void 0 : c.get(l);
        return Object.assign(b, d), b;
      }
      return y;
    }), (0, m.updateAll)());
  }), f.init(A()), (r, a, y) => {
    var d;
    let c = (0, m.getExomeId)(r).replace(/-.*$/, ""), l = `[${c}] ${a}`;
    if (c)
      return O.has(c) || O.set(c, /* @__PURE__ */ new Map()), a === "NEW" && ((d = O.get(c)) == null || d.set((0, m.getExomeId)(r), r), f.send({ type: l, payload: void 0 }, A())), () => {
        let p = [];
        try {
          p = JSON.parse(JSON.stringify(y));
        } catch (b) {
        }
        f.send({ type: l, payload: p }, A());
      };
  };
};

// src/devtools-exome.ts
var u = require("exome");

// package-json:/home/runner/work/exome/exome/package.json
var P = "2.4.0";

// src/devtools-exome.ts
var _ = /* @__PURE__ */ new Map(), $ = [], J = Object.getOwnPropertyDescriptor, L = ({
  name: e = "Exome",
  maxAge: n = 20,
  ignoreListActions: t = [],
  ignoreListStores: o = []
}) => {
  let s = "__EXOME_DEVTOOLS_EXTENSION__", g;
  try {
    g = window[s] || window.top[s];
  } catch (i) {
  }
  if (!g)
    return console.warn(
      `Please install Exome devtools extension
https://github.com/Marcisbee/exome-devtools`
    ), () => {
    };
  let f = 0, r = {
    version: P
  }, a = g.connect({ name: e, maxAge: n, details: r });
  return window.addEventListener("beforeunload", a.disconnect, {
    once: !0
  }), a.subscribe(({ type: i }) => {
    i === "sync" && a.send({
      event: "update",
      type: "all",
      payload: {
        actions: $,
        states: [..._].flatMap(
          ([c, l]) => [...l].map(([d, p]) => [d, x(p)])
        )
      }
    });
  }), (i, c, l) => {
    var M, S;
    let d = (0, u.getExomeId)(i), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if (_.has(p) || _.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (M = _.get(p)) == null || M.set(d, i), a.send({
        event: "send",
        type: "state",
        payload: [d, x(i)]
      }), () => {
        a.send({
          event: "update",
          type: "state",
          payload: [d, x(i), (0, u.getExomeId)(i)]
        }), (0, u.subscribe)(i, (j) => {
          a.send({
            event: "update",
            type: "state",
            payload: [d, x(j), (0, u.getExomeId)(j)]
          });
        });
      };
    if (c === "LOAD_STATE")
      return () => {
        a.send({
          event: "update",
          type: "state",
          payload: [d, x(i), (0, u.getExomeId)(i)]
        });
      };
    if (t.indexOf(`${p}.${c}`) > -1)
      return;
    let b = x(i), X = String(Math.random()), z = ((S = new Error().stack) == null ? void 0 : S.split(/\n/g)[6]) || "", h = performance.now();
    f += 1;
    let E = {
      id: X,
      name: c,
      instance: d,
      payload: l.map(V),
      now: h,
      depth: f,
      trace: z,
      before: b
    };
    return y(E), a.send({
      event: "send",
      type: "action",
      payload: E
    }), () => {
      E.time = performance.now() - h, E.after = x(i), f -= 1, a.send({
        event: "update",
        type: "action",
        payload: E
      });
    };
  };
  function y(i) {
    $.push(i), $.length > n && $.splice(0, n);
  }
};
function x(e) {
  var g, f;
  let n = Object.getPrototypeOf(e), t = Object.getOwnPropertyNames(n), o = Object.getOwnPropertyNames(e).filter(
    (r) => t.indexOf(r) === -1
  ), s = {};
  for (let r of t) {
    if (r === "constructor")
      continue;
    if (typeof ((g = J(n, r)) == null ? void 0 : g.get) == "function") {
      s[`$$exome_gt:${r}`] = null;
      continue;
    }
    s[`$$exome_ac:${r}`] = "@TODO";
  }
  for (let r of o) {
    let a = (f = J(e, r)) == null ? void 0 : f.value;
    if (typeof a == "function") {
      s[`$$exome_sl:${r}`] = r;
      continue;
    }
    s[r] = V(a);
  }
  return s;
}
function V(e) {
  if (e === void 0)
    return e;
  try {
    return JSON.parse(
      JSON.stringify(
        e,
        (n, t) => t == null || typeof t != "object" ? t : t instanceof u.Exome ? {
          $$exome_id: (0, u.getExomeId)(t)
        } : t.constructor.name !== "Array" && t.constructor.name !== "Object" && t.constructor.name !== "Date" ? {
          $$exome_class: t.constructor.name
        } : t,
        2
      )
    );
  } catch (n) {
    return;
  }
}
