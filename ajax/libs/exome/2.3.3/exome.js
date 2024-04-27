"use strict";
var O = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var U = Object.prototype.hasOwnProperty;
var R = (e, r) => {
  for (var o in r)
    O(e, o, { get: r[o], enumerable: !0 });
}, A = (e, r, o, t) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let n of P(r))
      !U.call(e, n) && n !== o && O(e, n, { get: () => r[n], enumerable: !(t = C(r, n)) || t.enumerable });
  return e;
};
var D = (e) => A(O({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var j = {};
R(j, {
  Exome: () => c,
  addMiddleware: () => T,
  exomeId: () => m,
  exomeName: () => x,
  getExomeId: () => N,
  onAction: () => v,
  runMiddleware: () => d,
  setExomeId: () => I,
  subscribe: () => M,
  update: () => E,
  updateAll: () => b
});
module.exports = D(j);

// src/constants.ts
var m = Symbol(), x = Symbol(), f = "function", y = "constructor";

// src/create-id.ts
var h = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, M = (e, r) => {
  var n, s;
  let o = (s = a[n = e[m]]) != null ? s : a[n] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, E = (e) => {
  var r, o;
  for (let t of ((o = (r = a[e[m]]) == null ? void 0 : r.values) == null ? void 0 : o.call(r)) || [])
    t();
}, b = () => {
  Object.values(a).map((e) => {
    for (let r of e.values())
      r();
  });
};

// src/middleware.ts
var w = [], T = (e) => (w.push(e), () => {
  w.splice(w.indexOf(e), 1);
}), d = (e, r, o) => {
  let t = w.map((n) => n(e, r, o));
  return (n) => {
    r !== "NEW" && E(e);
    let s = 0, i = t.length;
    for (; s < i; )
      typeof t[s] === f && t[s](n), ++s;
  };
};

// src/utils/wrapper.ts
var g = (e) => {
  var o;
  let r = Object.getPrototypeOf(e) || {};
  for (let t of Object.getOwnPropertyNames(r))
    if (!(typeof ((o = Object.getOwnPropertyDescriptor(r, t)) == null ? void 0 : o.get) === f)) {
      let s = r.hasOwnProperty(t), i = e[t];
      s && e instanceof c && t !== y && typeof i === f && (e[t] = (...u) => {
        let l = d(e, t, u);
        try {
          let p = i.apply(e, u);
          return p instanceof Promise ? p.then((S) => (l(), S)).catch(l) : (l(), p);
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
    let r = this[x] || this[y].name, o = this[m] = r + "-" + h(), t = d(this, "NEW", []);
    return a[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), g(this);
  }
};
m, x;

// src/on-action.ts
var v = (e, r, o, t = "after") => T((n, s, i) => {
  if (n instanceof e && (s === r || r === null)) {
    if (t === "before") {
      o(n, s, i);
      return;
    }
    return (u) => o(n, s, i, u);
  }
});

// src/utils/id.ts
var N = (e) => e[m], I = (e, r) => {
  let [o] = N(e).split("-");
  e[m] = `${o}-${r}`;
};
