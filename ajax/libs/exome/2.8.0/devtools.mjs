var V = Object.defineProperty;
var $ = Object.getOwnPropertySymbols;
var T = Object.prototype.hasOwnProperty, I = Object.prototype.propertyIsEnumerable;
var k = (e, n, t) => n in e ? V(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, A = (e, n) => {
  for (var t in n || (n = {}))
    T.call(n, t) && k(e, t, n[t]);
  if ($)
    for (var t of $(n))
      I.call(n, t) && k(e, t, n[t]);
  return e;
};
var C = (e, n) => {
  var t = {};
  for (var o in e)
    T.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && $)
    for (var o of $(e))
      n.indexOf(o) < 0 && I.call(e, o) && (t[o] = e[o]);
  return t;
};

// src/devtools-redux.ts
import { Exome as z, getExomeId as w, updateAll as B } from "exome";
var O = /* @__PURE__ */ new Map();
function N(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof z && w(e)) {
    let o = w(e);
    if (n.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let a = N(A({}, e), n.concat(o));
    return A({
      $$exome_id: o
    }, a);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let t = e.constructor() || {};
  for (let o of Object.keys(e))
    t[o] = N(e[o], n);
  return t;
}
var D = () => {
  let e = {};
  for (let [n, t] of O.entries())
    e[n] = Array.from(t.values());
  return N(e);
}, G = ({
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
    return () => {
    };
  let g = {
    name: e,
    maxAge: n,
    actionsBlacklist: t
  }, y = a.connect(g);
  return y.subscribe((r) => {
    r.type === "DISPATCH" && r.state && (JSON.parse(r.state, (i, f) => {
      var c;
      if (typeof f == "object" && f !== null && "$$exome_id" in f) {
        let s = f, { $$exome_id: u } = s, d = C(s, ["$$exome_id"]), [p] = u.split("-"), x = (c = O.get(p)) == null ? void 0 : c.get(u);
        return Object.assign(x, d), x;
      }
      return f;
    }), B());
  }), y.init(D()), (r, i, f) => {
    var d;
    let c = w(r).replace(/-.*$/, ""), u = `[${c}] ${i}`;
    if (c)
      return O.has(c) || O.set(c, /* @__PURE__ */ new Map()), i === "NEW" && ((d = O.get(c)) == null || d.set(w(r), r), y.send({ type: u, payload: void 0 }, D())), () => {
        let p = [];
        try {
          p = JSON.parse(JSON.stringify(f));
        } catch (x) {
        }
        y.send({ type: u, payload: p }, D());
      };
  };
};

// src/devtools-exome.ts
import { Exome as F, getExomeId as E, subscribe as H } from "exome";

// package-json:/home/runner/work/exome/exome/package.json
var J = { version: "2.8.0" };

// src/devtools-exome.ts
var v = /* @__PURE__ */ new Map(), _ = [], L = Object.getOwnPropertyDescriptor, U = ({
  name: e = "Exome",
  maxAge: n = 20,
  ignoreListActions: t = [],
  ignoreListStores: o = []
}) => {
  let a = "__EXOME_DEVTOOLS_EXTENSION__", g;
  try {
    g = window[a] || window.top[a];
  } catch (s) {
  }
  if (!g)
    return () => {
    };
  let y = 0, r = {
    version: J.version
  }, i = g.connect({ name: e, maxAge: n, details: r });
  return window.addEventListener("beforeunload", i.disconnect, {
    once: !0
  }), i.subscribe(({ type: s }) => {
    s === "sync" && i.send({
      event: "update",
      type: "all",
      payload: {
        actions: _,
        states: [...v].flatMap(
          ([c, u]) => [...u].map(([d, p]) => [d, l(p)])
        )
      }
    });
  }), (s, c, u) => {
    var S, h;
    let d = E(s), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if (v.has(p) || v.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (S = v.get(p)) == null || S.set(d, s), i.send({
        event: "send",
        type: "state",
        payload: [d, l(s)]
      }), () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, l(s), E(s)]
        }), H(s, (b) => {
          i.send({
            event: "update",
            type: "state",
            payload: [d, l(b), E(b)]
          });
        });
      };
    if (c === "LOAD_STATE")
      return () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, l(s), E(s)]
        });
      };
    if (t.indexOf(`${p}.${c}`) > -1)
      return;
    let x = l(s), P = String(Math.random()), X = ((h = new Error().stack) == null ? void 0 : h.split(/\n/g)[6]) || "", M = performance.now();
    y += 1;
    let m = {
      id: P,
      name: c,
      instance: d,
      payload: u.map(R),
      now: M,
      depth: y,
      trace: X,
      before: x
    };
    return f(m), i.send({
      event: "send",
      type: "action",
      payload: m
    }), (b, j) => {
      b !== void 0 && (m.error = String(b)), j !== void 0 && (m.response = R(j)), m.time = performance.now() - M, m.after = l(s), y -= 1, i.send({
        event: "update",
        type: "action",
        payload: m
      });
    };
  };
  function f(s) {
    _.push(s), _.length > n && _.splice(0, n);
  }
};
function l(e) {
  var g, y;
  let n = Object.getPrototypeOf(e), t = Object.getOwnPropertyNames(n), o = Object.getOwnPropertyNames(e).filter(
    (r) => t.indexOf(r) === -1
  ), a = {};
  for (let r of t) {
    if (r === "constructor")
      continue;
    if (typeof ((g = L(n, r)) == null ? void 0 : g.get) == "function") {
      a[`$$exome_gt:${r}`] = null;
      continue;
    }
    a[`$$exome_ac:${r}`] = "@TODO";
  }
  for (let r of o) {
    let i = (y = L(e, r)) == null ? void 0 : y.value;
    if (typeof i == "function") {
      a[`$$exome_sl:${r}`] = r;
      continue;
    }
    a[r] = R(i);
  }
  return a;
}
function R(e) {
  if (e === void 0)
    return e;
  try {
    return JSON.parse(
      JSON.stringify(
        e,
        (n, t) => t == null || typeof t != "object" ? t : t instanceof F ? {
          $$exome_id: E(t)
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
  G as exomeReduxDevtools,
  U as unstableExomeDevtools
};
