"use strict";
var _ = Object.defineProperty;
var B = Object.getOwnPropertyDescriptor;
var G = Object.getOwnPropertyNames, w = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var T = (e, n, t) => n in e ? _(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, A = (e, n) => {
  for (var t in n || (n = {}))
    D.call(n, t) && T(e, t, n[t]);
  if (w)
    for (var t of w(n))
      k.call(n, t) && T(e, t, n[t]);
  return e;
};
var I = (e, n) => {
  var t = {};
  for (var o in e)
    D.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && w)
    for (var o of w(e))
      n.indexOf(o) < 0 && k.call(e, o) && (t[o] = e[o]);
  return t;
};
var W = (e, n) => {
  for (var t in n)
    _(e, t, { get: n[t], enumerable: !0 });
}, F = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of G(n))
      !D.call(e, s) && s !== t && _(e, s, { get: () => n[s], enumerable: !(o = B(n, s)) || o.enumerable });
  return e;
};
var H = (e) => F(_({}, "__esModule", { value: !0 }), e);

// src/devtools.ts
var q = {};
W(q, {
  exomeReduxDevtools: () => C,
  unstableExomeDevtools: () => L
});
module.exports = H(q);

// src/devtools-redux.ts
var m = require("exome");
var v = /* @__PURE__ */ new Map();
function S(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof m.Exome && (0, m.getExomeId)(e)) {
    let o = (0, m.getExomeId)(e);
    if (n.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let s = S(A({}, e), n.concat(o));
    return A({
      $$exome_id: o
    }, s);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let t = e.constructor() || {};
  for (let o of Object.keys(e))
    t[o] = S(e[o], n);
  return t;
}
var R = () => {
  let e = {};
  for (let [n, t] of v.entries())
    e[n] = Array.from(t.values());
  return S(e);
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
        let i = y, { $$exome_id: l } = i, d = I(i, ["$$exome_id"]), [p] = l.split("-"), E = (c = v.get(p)) == null ? void 0 : c.get(l);
        return Object.assign(E, d), E;
      }
      return y;
    }), (0, m.updateAll)());
  }), f.init(R()), (r, a, y) => {
    var d;
    let c = (0, m.getExomeId)(r).replace(/-.*$/, ""), l = `[${c}] ${a}`;
    if (c)
      return v.has(c) || v.set(c, /* @__PURE__ */ new Map()), a === "NEW" && ((d = v.get(c)) == null || d.set((0, m.getExomeId)(r), r), f.send({ type: l, payload: void 0 }, R())), () => {
        let p = [];
        try {
          p = JSON.parse(JSON.stringify(y));
        } catch (E) {
        }
        f.send({ type: l, payload: p }, R());
      };
  };
};

// src/devtools-exome.ts
var u = require("exome");

// package-json:/home/runner/work/exome/exome/package.json
var P = "2.4.2";

// src/devtools-exome.ts
var $ = /* @__PURE__ */ new Map(), N = [], J = Object.getOwnPropertyDescriptor, L = ({
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
        actions: N,
        states: [...$].flatMap(
          ([c, l]) => [...l].map(([d, p]) => [d, x(p)])
        )
      }
    });
  }), (i, c, l) => {
    var M, j;
    let d = (0, u.getExomeId)(i), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if ($.has(p) || $.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (M = $.get(p)) == null || M.set(d, i), a.send({
        event: "send",
        type: "state",
        payload: [d, x(i)]
      }), () => {
        a.send({
          event: "update",
          type: "state",
          payload: [d, x(i), (0, u.getExomeId)(i)]
        }), (0, u.subscribe)(i, (O) => {
          a.send({
            event: "update",
            type: "state",
            payload: [d, x(O), (0, u.getExomeId)(O)]
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
    let E = x(i), X = String(Math.random()), z = ((j = new Error().stack) == null ? void 0 : j.split(/\n/g)[6]) || "", h = performance.now();
    f += 1;
    let b = {
      id: X,
      name: c,
      instance: d,
      payload: l.map(V),
      now: h,
      depth: f,
      trace: z,
      before: E
    };
    return y(b), a.send({
      event: "send",
      type: "action",
      payload: b
    }), (O) => {
      O !== void 0 && (b.error = String(O)), b.time = performance.now() - h, b.after = x(i), f -= 1, a.send({
        event: "update",
        type: "action",
        payload: b
      });
    };
  };
  function y(i) {
    N.push(i), N.length > n && N.splice(0, n);
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
