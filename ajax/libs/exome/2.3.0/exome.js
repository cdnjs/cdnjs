"use strict";
var T = Object.defineProperty;
var C = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var U = Object.prototype.hasOwnProperty;
var R = (e, o) => {
  for (var t in o)
    T(e, t, { get: o[t], enumerable: !0 });
}, A = (e, o, t, r) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of P(o))
      !U.call(e, n) && n !== t && T(e, n, { get: () => o[n], enumerable: !(r = C(o, n)) || r.enumerable });
  return e;
};
var D = (e) => A(T({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var j = {};
R(j, {
  Exome: () => d,
  addMiddleware: () => y,
  exomeId: () => s,
  exomeName: () => c,
  getExomeId: () => E,
  onAction: () => I,
  runMiddleware: () => p,
  setExomeId: () => h,
  subscribe: () => b,
  update: () => u,
  updateAll: () => g
});
module.exports = D(j);

// src/constants.ts
var s = Symbol(), c = Symbol(), x = "function", f = "constructor";

// src/create-id.ts
var M = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var i = {}, b = (e, o) => {
  var n, m;
  let t = (m = i[n = e[s]]) != null ? m : i[n] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, u = (e) => {
  var o, t;
  for (let r of ((t = (o = i[e[s]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, g = () => {
  Object.values(i).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var l = [], y = (e) => (l.push(e), () => {
  l.splice(l.indexOf(e), 1);
}), p = (e, o, t) => {
  let r = l.map((n) => n(e, o, t));
  return () => {
    o !== "NEW" && u(e);
    let n = 0, m = r.length;
    for (; n < m; )
      typeof r[n] === x && r[n](), ++n;
  };
};

// src/utils/wrapper.ts
var v = (e) => {
  var t;
  let o = Object.getPrototypeOf(e) || {};
  for (let r of Object.getOwnPropertyNames(o))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(o, r)) == null ? void 0 : t.get) === x)) {
      let m = o.hasOwnProperty(r), a = e[r];
      m && e instanceof d && r !== f && typeof a === x && (e[r] = (...O) => {
        let N = p(e, r, O), w = a.apply(e, O);
        return w instanceof Promise ? w.then((S) => (N(), S)) : (N(), w);
      });
    }
  return e;
};

// src/constructor.ts
var d = class {
  constructor() {
    let o = this[c] || this[f].name, t = this[s] = o + "-" + M(), r = p(this, "NEW", []);
    return i[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(r), v(this);
  }
};
s, c;

// src/on-action.ts
var I = (e, o, t, r = "after") => y((n, m, a) => {
  if (n instanceof e && (m === o || o === null)) {
    if (r === "before") {
      t(n, m, a);
      return;
    }
    return () => t(n, m, a);
  }
});

// src/utils/id.ts
var E = (e) => e[s], h = (e, o) => {
  let [t] = E(e).split("-");
  e[s] = `${t}-${o}`;
};
