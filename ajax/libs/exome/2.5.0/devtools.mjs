var X = Object.defineProperty;
var $ = Object.getOwnPropertySymbols;
var j = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var h = (e, n, t) => n in e ? X(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, A = (e, n) => {
  for (var t in n || (n = {}))
    j.call(n, t) && h(e, t, n[t]);
  if ($)
    for (var t of $(n))
      k.call(n, t) && h(e, t, n[t]);
  return e;
};
var T = (e, n) => {
  var t = {};
  for (var o in e)
    j.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && $)
    for (var o of $(e))
      n.indexOf(o) < 0 && k.call(e, o) && (t[o] = e[o]);
  return t;
};

// src/devtools-redux.ts
import { Exome as V, getExomeId as w, updateAll as z } from "exome";
var O = /* @__PURE__ */ new Map();
function N(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof V && w(e)) {
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
        let s = f, { $$exome_id: u } = s, d = T(s, ["$$exome_id"]), [p] = u.split("-"), x = (c = O.get(p)) == null ? void 0 : c.get(u);
        return Object.assign(x, d), x;
      }
      return f;
    }), z());
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
import { Exome as W, getExomeId as E, subscribe as F } from "exome";

// package-json:/home/runner/work/exome/exome/package.json
var I = { version: "2.5.0" };

// src/devtools-exome.ts
var v = /* @__PURE__ */ new Map(), _ = [], C = Object.getOwnPropertyDescriptor, H = ({
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
    version: I.version
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
          ([c, u]) => [...u].map(([d, p]) => [d, m(p)])
        )
      }
    });
  }), (s, c, u) => {
    var M, S;
    let d = E(s), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if (v.has(p) || v.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (M = v.get(p)) == null || M.set(d, s), i.send({
        event: "send",
        type: "state",
        payload: [d, m(s)]
      }), () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, m(s), E(s)]
        }), F(s, (b) => {
          i.send({
            event: "update",
            type: "state",
            payload: [d, m(b), E(b)]
          });
        });
      };
    if (c === "LOAD_STATE")
      return () => {
        i.send({
          event: "update",
          type: "state",
          payload: [d, m(s), E(s)]
        });
      };
    if (t.indexOf(`${p}.${c}`) > -1)
      return;
    let x = m(s), L = String(Math.random()), P = ((S = new Error().stack) == null ? void 0 : S.split(/\n/g)[6]) || "", R = performance.now();
    y += 1;
    let l = {
      id: L,
      name: c,
      instance: d,
      payload: u.map(J),
      now: R,
      depth: y,
      trace: P,
      before: x
    };
    return f(l), i.send({
      event: "send",
      type: "action",
      payload: l
    }), (b) => {
      b !== void 0 && (l.error = String(b)), l.time = performance.now() - R, l.after = m(s), y -= 1, i.send({
        event: "update",
        type: "action",
        payload: l
      });
    };
  };
  function f(s) {
    _.push(s), _.length > n && _.splice(0, n);
  }
};
function m(e) {
  var g, y;
  let n = Object.getPrototypeOf(e), t = Object.getOwnPropertyNames(n), o = Object.getOwnPropertyNames(e).filter(
    (r) => t.indexOf(r) === -1
  ), a = {};
  for (let r of t) {
    if (r === "constructor")
      continue;
    if (typeof ((g = C(n, r)) == null ? void 0 : g.get) == "function") {
      a[`$$exome_gt:${r}`] = null;
      continue;
    }
    a[`$$exome_ac:${r}`] = "@TODO";
  }
  for (let r of o) {
    let i = (y = C(e, r)) == null ? void 0 : y.value;
    if (typeof i == "function") {
      a[`$$exome_sl:${r}`] = r;
      continue;
    }
    a[r] = J(i);
  }
  return a;
}
function J(e) {
  if (e === void 0)
    return e;
  try {
    return JSON.parse(
      JSON.stringify(
        e,
        (n, t) => t == null || typeof t != "object" ? t : t instanceof W ? {
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
  B as exomeReduxDevtools,
  H as unstableExomeDevtools
};
