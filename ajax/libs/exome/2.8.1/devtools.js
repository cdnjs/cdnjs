"use strict";
var v = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var W = Object.getOwnPropertyNames, w = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable;
var I = (e, n, t) => n in e ? v(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, N = (e, n) => {
  for (var t in n || (n = {}))
    D.call(n, t) && I(e, t, n[t]);
  if (w)
    for (var t of w(n))
      C.call(n, t) && I(e, t, n[t]);
  return e;
};
var J = (e, n) => {
  var t = {};
  for (var o in e)
    D.call(e, o) && n.indexOf(o) < 0 && (t[o] = e[o]);
  if (e != null && w)
    for (var o of w(e))
      n.indexOf(o) < 0 && C.call(e, o) && (t[o] = e[o]);
  return t;
};
var F = (e, n) => {
  for (var t in n)
    v(e, t, { get: n[t], enumerable: !0 });
}, H = (e, n, t, o) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let s of W(n))
      !D.call(e, s) && s !== t && v(e, s, { get: () => n[s], enumerable: !(o = G(n, s)) || o.enumerable });
  return e;
};
var U = (e) => H(v({}, "__esModule", { value: !0 }), e);

// src/devtools.ts
var K = {};
F(K, {
  exomeReduxDevtools: () => L,
  unstableExomeDevtools: () => V
});
module.exports = U(K);

// src/devtools-redux.ts
var m = require("exome");
var $ = /* @__PURE__ */ new Map();
function M(e, n = []) {
  if (e == null || typeof e != "object")
    return e;
  if (e instanceof m.Exome && (0, m.getExomeId)(e)) {
    let o = (0, m.getExomeId)(e);
    if (n.indexOf(o) > -1)
      return {
        $$exome_id: o
      };
    let s = M(N({}, e), n.concat(o));
    return N({
      $$exome_id: o
    }, s);
  }
  if (e.constructor !== Array && e.constructor !== Object && e.constructor !== Date)
    return {
      $$exome_class: e.constructor.name
    };
  let t = e.constructor() || {};
  for (let o of Object.keys(e))
    t[o] = M(e[o], n);
  return t;
}
var R = () => {
  let e = {};
  for (let [n, t] of $.entries())
    e[n] = Array.from(t.values());
  return M(e);
}, L = ({
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
    return () => {
    };
  let l = {
    name: e,
    maxAge: n,
    actionsBlacklist: t
  }, y = s.connect(l);
  return y.subscribe((r) => {
    r.type === "DISPATCH" && r.state && (JSON.parse(r.state, (a, f) => {
      var c;
      if (typeof f == "object" && f !== null && "$$exome_id" in f) {
        let i = f, { $$exome_id: g } = i, d = J(i, ["$$exome_id"]), [p] = g.split("-"), O = (c = $.get(p)) == null ? void 0 : c.get(g);
        return Object.assign(O, d), O;
      }
      return f;
    }), (0, m.updateAll)());
  }), y.init(R()), (r, a, f) => {
    var d;
    let c = (0, m.getExomeId)(r).replace(/-.*$/, ""), g = `[${c}] ${a}`;
    if (c)
      return $.has(c) || $.set(c, /* @__PURE__ */ new Map()), a === "NEW" && ((d = $.get(c)) == null || d.set((0, m.getExomeId)(r), r), y.send({ type: g, payload: void 0 }, R())), () => {
        let p = [];
        try {
          p = JSON.parse(JSON.stringify(f));
        } catch (O) {
        }
        y.send({ type: g, payload: p }, R());
      };
  };
};

// src/devtools-exome.ts
var u = require("exome");

// package-json:/home/runner/work/exome/exome/package.json
var P = { version: "2.8.1" };

// src/devtools-exome.ts
var _ = /* @__PURE__ */ new Map(), A = [], X = Object.getOwnPropertyDescriptor, V = ({
  name: e = "Exome",
  maxAge: n = 20,
  ignoreListActions: t = [],
  ignoreListStores: o = []
}) => {
  let s = "__EXOME_DEVTOOLS_EXTENSION__", l;
  try {
    l = window[s] || window.top[s];
  } catch (i) {
  }
  if (!l)
    return () => {
    };
  let y = 0, r = {
    version: P.version
  }, a = l.connect({ name: e, maxAge: n, details: r });
  return window.addEventListener("beforeunload", a.disconnect, {
    once: !0
  }), a.subscribe(({ type: i }) => {
    i === "sync" && a.send({
      event: "update",
      type: "all",
      payload: {
        actions: A,
        states: [..._].flatMap(
          ([c, g]) => [...g].map(([d, p]) => [d, b(p)])
        )
      }
    });
  }), (i, c, g) => {
    var j, k;
    let d = (0, u.getExomeId)(i), p = d.replace(/-[a-z0-9]+$/gi, "");
    if (o.indexOf(p) > -1)
      return;
    if (_.has(p) || _.set(p, /* @__PURE__ */ new Map()), c === "NEW")
      return (j = _.get(p)) == null || j.set(d, i), a.send({
        event: "send",
        type: "state",
        payload: [d, b(i)]
      }), () => {
        a.send({
          event: "update",
          type: "state",
          payload: [d, b(i), (0, u.getExomeId)(i)]
        }), (0, u.subscribe)(i, (E) => {
          a.send({
            event: "update",
            type: "state",
            payload: [d, b(E), (0, u.getExomeId)(E)]
          });
        });
      };
    if (c === "LOAD_STATE")
      return () => {
        a.send({
          event: "update",
          type: "state",
          payload: [d, b(i), (0, u.getExomeId)(i)]
        });
      };
    if (t.indexOf(`${p}.${c}`) > -1)
      return;
    let O = b(i), z = String(Math.random()), B = ((k = new Error().stack) == null ? void 0 : k.split(/\n/g)[6]) || "", h = performance.now();
    y += 1;
    let x = {
      id: z,
      name: c,
      instance: d,
      payload: g.map(S),
      now: h,
      depth: y,
      trace: B,
      before: O
    };
    return f(x), a.send({
      event: "send",
      type: "action",
      payload: x
    }), (E, T) => {
      E !== void 0 && (x.error = String(E)), T !== void 0 && (x.response = S(T)), x.time = performance.now() - h, x.after = b(i), y -= 1, a.send({
        event: "update",
        type: "action",
        payload: x
      });
    };
  };
  function f(i) {
    A.push(i), A.length > n && A.splice(0, n);
  }
};
function b(e) {
  var l, y;
  let n = Object.getPrototypeOf(e), t = Object.getOwnPropertyNames(n), o = Object.getOwnPropertyNames(e).filter(
    (r) => t.indexOf(r) === -1
  ), s = {};
  for (let r of t) {
    if (r === "constructor")
      continue;
    if (typeof ((l = X(n, r)) == null ? void 0 : l.get) == "function") {
      s[`$$exome_gt:${r}`] = null;
      continue;
    }
    s[`$$exome_ac:${r}`] = "@TODO";
  }
  for (let r of o) {
    let a = (y = X(e, r)) == null ? void 0 : y.value;
    if (typeof a == "function") {
      s[`$$exome_sl:${r}`] = r;
      continue;
    }
    s[r] = S(a);
  }
  return s;
}
function S(e) {
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
