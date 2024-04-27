"use strict";
var N = Object.defineProperty;
var U = Object.getOwnPropertyDescriptor;
var R = Object.getOwnPropertyNames;
var A = Object.prototype.hasOwnProperty;
var D = (e, o) => {
  for (var r in o)
    N(e, r, { get: o[r], enumerable: !0 });
}, j = (e, o, r, t) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of R(o))
      !A.call(e, n) && n !== r && N(e, n, { get: () => o[n], enumerable: !(t = U(o, n)) || t.enumerable });
  return e;
};
var W = (e) => j(N({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var F = {};
D(F, {
  Exome: () => c,
  addMiddleware: () => O,
  exomeId: () => m,
  exomeName: () => x,
  getExomeId: () => h,
  onAction: () => I,
  runMiddleware: () => d,
  setExomeId: () => S,
  subscribe: () => b,
  update: () => E,
  updateAll: () => g
});
module.exports = W(F);

// src/constants.ts
var m = Symbol(), x = Symbol(), f = "function", w = "constructor";

// src/create-id.ts
var M = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, b = (e, o) => {
  var n, s;
  let r = (s = a[n = e[m]]) != null ? s : a[n] = /* @__PURE__ */ new Set(), t = () => o(e);
  return r.add(t), () => {
    r.delete(t);
  };
}, E = (e) => {
  var o, r;
  for (let t of ((r = (o = a[e[m]]) == null ? void 0 : o.values) == null ? void 0 : r.call(o)) || [])
    t();
}, g = () => {
  Object.values(a).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var T = [], O = (e) => (T.push(e), () => {
  T.splice(T.indexOf(e), 1);
}), d = (e, o, r) => {
  let t = T.map((n) => n(e, o, r));
  return (n) => {
    o !== "NEW" && E(e);
    let s = 0, i = t.length;
    for (; s < i; )
      typeof t[s] === f && t[s](n), ++s;
  };
};

// src/utils/wrapper.ts
var v = (e) => {
  var r;
  let o = Object.getPrototypeOf(e) || {};
  for (let t of Object.getOwnPropertyNames(o))
    if (!(typeof ((r = Object.getOwnPropertyDescriptor(o, t)) == null ? void 0 : r.get) === f)) {
      let s = o.hasOwnProperty(t), i = e[t];
      s && e instanceof c && t !== w && typeof i === f && (e[t] = (...u) => {
        let l = d(e, t, u);
        try {
          let p = i.apply(e, u);
          return p instanceof Promise ? new Promise((C, P) => {
            p.then((y) => (l(), C(y))).catch((y) => (P(y), l(y)));
          }) : (l(), p);
        } catch (p) {
          throw l(p), p;
        }
      });
    }
  return e;
};

// src/constructor.ts
var c = class {
  constructor() {
    let o = this[x] || this[w].name, r = this[m] = o + "-" + M(), t = d(this, "NEW", []);
    return a[r] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), v(this);
  }
};
m, x;

// src/on-action.ts
var I = (e, o, r, t = "after") => O((n, s, i) => {
  if (n instanceof e && (s === o || o === null)) {
    if (t === "before") {
      r(n, s, i);
      return;
    }
    return (u) => r(n, s, i, u);
  }
});

// src/utils/id.ts
var h = (e) => e[m], S = (e, o) => {
  let [r] = h(e).split("-");
  e[m] = `${r}-${o}`;
};
