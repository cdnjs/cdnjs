var V = Object.defineProperty;
var v = Object.getOwnPropertySymbols;
var j = Object.prototype.hasOwnProperty, T = Object.prototype.propertyIsEnumerable;
var M = (e, n, t) => n in e ? V(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, N = (e, n) => {
  for (var t in n || (n = {}))
    j.call(n, t) && M(e, t, n[t]);
  if (v)
    for (var t of v(n))
      T.call(n, t) && M(e, t, n[t]);
  return e;
};
var k = (e, n) => {
  var t = {};
  for (var o in e)
    j.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && v)
    for (var o of v(e))
      n.indexOf(o) < 0 && T.call(e, o) && (t[o] = e[o]);
  return t;
};

// src/devtools-redux.ts
import { Exome as X, getExomeId as w, updateAll as z } from "exome";
var E = /* @__PURE__ */ new Map();
function A(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof X && w(e)) {
    let o = w(e);
    if (n.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let a = A(N({}, e), n.concat(o));
    return N({
      $$exome_id: o
    }, a);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let t = e.constructor() || {};
  for (let o of Object.keys(e))
    t[o] = A(e[o], n);
  return t;
}
var D = () => {
  let e = {};
  for (let [n, t] of E.entries())
    e[n] = Array.from(t.values());
  return A(e);
}, B = ({
  name: e,
  maxAge: n,
  actionsBlacklist: t
}) => {
  let o = "__REDUX_DEVTOOLS_EXTENSION__", a;
  try {
    a = window[o] || window.top[o];
  } catch (r) {
  }
  if (!a)
    return console.warn(
      `Please install Redux devtools extension
https://github.com/reduxjs/redux-devtools`
    ), () => {
    };
  let l = {
    name: e,
    maxAge: n,
    actionsBlacklist: t
  }, f = a.connect(l);
  return f.subscribe((r) => {
    r.type === "DISPATCH" && r.state && (JSON.parse(r.state, (i, y) => {
      var c;
      if (typeof y == "object" && y !== null && "$$exome_id" in y) {
        let s = y, { $$exome_id: u } = s, d = k(s, ["$$exome_id"]), [p] = u.split("-"), x = (c = E.get(p)) == null ? void 0 : c.get(u);
        return Object.assign(x, d), x;
      }
      return y;
    }), z());
  }), f.init(D()), (r, i, y) => {
    var d;
    let c = w(r).replace(/-.*$/, ""), u = `[${c}] ${i}`;
    if (c)
      return E.has(c) || E.set(c, /* @__PURE__ */ new Map()), i === "NEW" && ((d = E.get(c)) == null || d.set(w(r), r), f.send({ type: u, payload: void 0 }, D())), () => {
        let p = [];
        try {
          p = JSON.parse(JSON.stringify(y));
        } catch (x) {
        }
        f.send({ type: u, payload: p }, D());
      };
  };
};

// src/devtools-exome.ts
import { Exome as W, getExomeId as O, subscribe as F } from "exome";

// package-json:/home/runner/work/exome/exome/package.json
var I = "2.4.2";

// src/devtools-exome.ts
var _ = /* @__PURE__ */ new Map(), $ = [], C = Object.getOwnPropertyDescriptor, H = ({
  name: e = "Exome",
  maxAge: n = 20,
  ignoreListActions: t = [],
  ignoreListStores: o = []
}) => {
  let a = "__EXOME_DEVTOOLS_EXTENSION__", l;
  try {
    l = window[a] || window.top[a];
  } catch (s) {
  }
  if (!l)
    return console.warn(
      `Please install Exome devtools extension
https://github.com/Marcisbee/exome-devtools`
    ), () => {
    };
  let f = 0, r = {
    version: I
  }, i = l.connect({ name: e, maxAge: n, details: r });
  return window.addEventListener("beforeunload", i.disconnect, {
    once: !0
  }), i.subscribe(({ type: s }) => {
    s === "sync" && i.send({
      event: "update",
      type: "all",
      payload: {
        actions: $,
        states: [..._].flatMap(
          ([c, u]) => [...u].map(([d, p]) => [d, m(p)])
        )
      }
    });
  }), (s, c, u) => {
    var S, h;
    let d = O(s), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if (_.has(p) || _.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (S = _.get(p)) == null || S.set(d, s), i.send({
        event: "send",
        type: "state",
        payload: [d, m(s)]
      }), () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, m(s), O(s)]
        }), F(s, (b) => {
          i.send({
            event: "update",
            type: "state",
            payload: [d, m(b), O(b)]
          });
        });
      };
    if (c === "LOAD_STATE")
      return () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, m(s), O(s)]
        });
      };
    if (t.indexOf(`${p}.${c}`) > -1)
      return;
    let x = m(s), J = String(Math.random()), L = ((h = new Error().stack) == null ? void 0 : h.split(/\n/g)[6]) || "", R = performance.now();
    f += 1;
    let g = {
      id: J,
      name: c,
      instance: d,
      payload: u.map(P),
      now: R,
      depth: f,
      trace: L,
      before: x
    };
    return y(g), i.send({
      event: "send",
      type: "action",
      payload: g
    }), (b) => {
      b !== void 0 && (g.error = String(b)), g.time = performance.now() - R, g.after = m(s), f -= 1, i.send({
        event: "update",
        type: "action",
        payload: g
      });
    };
  };
  function y(s) {
    $.push(s), $.length > n && $.splice(0, n);
  }
};
function m(e) {
  var l, f;
  let n = Object.getPrototypeOf(e), t = Object.getOwnPropertyNames(n), o = Object.getOwnPropertyNames(e).filter(
    (r) => t.indexOf(r) === -1
  ), a = {};
  for (let r of t) {
    if (r === "constructor")
      continue;
    if (typeof ((l = C(n, r)) == null ? void 0 : l.get) == "function") {
      a[`$$exome_gt:${r}`] = null;
      continue;
    }
    a[`$$exome_ac:${r}`] = "@TODO";
  }
  for (let r of o) {
    let i = (f = C(e, r)) == null ? void 0 : f.value;
    if (typeof i == "function") {
      a[`$$exome_sl:${r}`] = r;
      continue;
    }
    a[r] = P(i);
  }
  return a;
}
function P(e) {
  if (e === void 0)
    return e;
  try {
    return JSON.parse(
      JSON.stringify(
        e,
        (n, t) => t == null || typeof t != "object" ? t : t instanceof W ? {
          $$exome_id: O(t)
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
export {
  B as exomeReduxDevtools,
  H as unstableExomeDevtools
};
