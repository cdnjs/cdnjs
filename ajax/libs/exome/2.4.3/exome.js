"use strict";
var v = Object.defineProperty;
var U = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames;
var A = Object.prototype.hasOwnProperty;
var D = (e, o) => {
  for (var r in o)
    v(e, r, { get: o[r], enumerable: !0 });
}, j = (e, o, r, t) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of R(o))
      !A.call(e, n) && n !== r && v(e, n, { get: () => o[n], enumerable: !(t = U(o, n)) || t.enumerable });
  return e;
};
var W = (e) => j(v({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var F = {};
D(F, {
  Exome: () => c,
  addMiddleware: () => O,
  exomeId: () => i,
  exomeName: () => x,
  getExomeId: () => b,
  onAction: () => I,
  runMiddleware: () => p,
  setExomeId: () => S,
  subscribe: () => h,
  update: () => w,
  updateAll: () => M
});
module.exports = W(F);

// src/constants.ts
var i = Symbol(), x = Symbol(), f = "function", E = "constructor";

// src/create-id.ts
var N = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, h = (e, o) => {
  var n, s;
  let r = (s = a[n = e[i]]) != null ? s : a[n] = /* @__PURE__ */ new Set(), t = () => o(e);
  return r.add(t), () => {
    r.delete(t);
  };
}, w = (e) => {
  var o, r;
  for (let t of ((r = (o = a[e[i]]) == null ? void 0 : o.values) == null ? void 0 : r.call(o)) || [])
    t();
}, M = () => {
  Object.values(a).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var T = [], O = (e) => (T.push(e), () => {
  T.splice(T.indexOf(e), 1);
}), p = (e, o, r) => {
  let t = T.map((n) => n(e, o, r));
  return (n) => {
    o !== "NEW" && w(e);
    let s = 0, m = t.length;
    for (; s < m; )
      typeof t[s] === f && t[s](n), ++s;
  };
};

// src/utils/wrapper.ts
var g = (e) => {
  var r;
  let o = Object.getPrototypeOf(e) || {};
  for (let t of Object.getOwnPropertyNames(o))
    if (!(typeof ((r = Object.getOwnPropertyDescriptor(o, t)) == null ? void 0 : r.get) === f)) {
      let s = o.hasOwnProperty(t), m = e[t];
      s && e instanceof c && t !== E && typeof m === f && (e[t] = (...u) => {
        let l = p(e, t, u);
        try {
          let d = m.apply(e, u);
          return d instanceof Promise ? new Promise((C, P) => {
            d.then((y) => (l(), C(y))).catch((y) => (P(y), l(y)));
          }) : (l(), d);
        } catch (d) {
          throw l(d), d;
        }
      });
    }
  return e;
};

// src/constructor.ts
var c = class {
  constructor() {
    let o = this[x] || this[E].name, r = this[i] = o + "-" + N(), t = p(this, "NEW", []);
    return a[r] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), g(this);
  }
};
i, x;

// src/on-action.ts
var I = (e, o, r, t = "after") => O((n, s, m) => {
  if (n instanceof e && (s === o || o === null)) {
    if (t === "before") {
      r(n, s, m);
      return;
    }
    return (u) => r(n, s, m, u);
  }
});

// src/utils/id.ts
var b = (e) => e[i], S = (e, o) => {
  let [r] = b(e).split("-");
  e[i] = `${r}-${o}`;
};
