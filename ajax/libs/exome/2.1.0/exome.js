"use strict";
var E = Object.defineProperty;
var S = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var U = Object.prototype.hasOwnProperty;
var R = (e, o) => {
  for (var t in o)
    E(e, t, { get: o[t], enumerable: !0 });
}, j = (e, o, t, r) => {
  if (o && typeof o == "object" || typeof o == "function")
    for (let n of P(o))
      !U.call(e, n) && n !== t && E(e, n, { get: () => o[n], enumerable: !(r = S(o, n)) || r.enumerable });
  return e;
};
var D = (e) => j(E({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var W = {};
R(W, {
  Exome: () => d,
  addMiddleware: () => y,
  exomeId: () => m,
  exomeName: () => c,
  getExomeId: () => T,
  onAction: () => g,
  runMiddleware: () => p,
  setExomeId: () => h,
  subscribe: () => b,
  update: () => u,
  updateAll: () => v
});
module.exports = D(W);

// src/constants.ts
var m = Symbol(), c = Symbol(), x = "function", f = "constructor";

// src/create-id.ts
var M = () => (Date.now().toString(36) + (Math.random() * 1e3 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var i = {}, b = (e, o) => {
  var n, s;
  let t = (s = i[n = e[m]]) != null ? s : i[n] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, u = (e) => {
  var o, t;
  for (let r of ((t = (o = i[e[m]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, v = () => {
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
    u(e);
    let n = 0, s = r.length;
    for (; n < s; )
      typeof r[n] === x && r[n](), ++n;
  };
};

// src/utils/wrapper.ts
var I = (e) => {
  var t;
  let o = Object.getPrototypeOf(e) || {};
  for (let r of Object.getOwnPropertyNames(o))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(o, r)) == null ? void 0 : t.get) === x)) {
      let s = o.hasOwnProperty(r), a = e[r];
      s && e instanceof d && r !== f && typeof a === x && (e[r] = (...O) => {
        let N = p(e, r, O), w = a.apply(e, O);
        return w instanceof Promise ? w.then((C) => (N(), C)) : (N(), w);
      });
    }
  return e;
};

// src/constructor.ts
var d = class {
  constructor() {
    let o = this[c] || this[f].name, t = this[m] = o + "-" + M();
    return i[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(() => p(this, "NEW", [])), I(this);
  }
};
m, c;

// src/on-action.ts
var g = (e, o, t, r = "after") => y((n, s, a) => {
  if (n instanceof e && (s === o || o === null)) {
    if (s === "NEW" || r === "before") {
      t(n, s, a);
      return;
    }
    return () => t(n, s, a);
  }
});

// src/utils/id.ts
var T = (e) => e[m], h = (e, o) => {
  let [t] = T(e).split("-");
  e[m] = `${t}-${o}`;
};
