"use strict";
var T = Object.defineProperty;
var S = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var C = Object.prototype.hasOwnProperty;
var U = (e, r) => {
  for (var o in r)
    T(e, o, { get: r[o], enumerable: !0 });
}, A = (e, r, o, t) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let n of P(r))
      !C.call(e, n) && n !== o && T(e, n, { get: () => r[n], enumerable: !(t = S(r, n)) || t.enumerable });
  return e;
};
var R = (e) => A(T({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var W = {};
U(W, {
  Exome: () => w,
  addMiddleware: () => y,
  exomeId: () => m,
  exomeName: () => d,
  getExomeId: () => O,
  onAction: () => M,
  runMiddleware: () => a,
  setExomeId: () => I,
  subscribe: () => N,
  update: () => u,
  updateAll: () => h
});
module.exports = R(W);

// src/constants.ts
var m = Symbol(), d = Symbol(), c = "function", f = "constructor";

// src/create-id.ts
var v = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var p = {}, N = (e, r) => {
  var n, s;
  let o = (s = p[n = e[m]]) != null ? s : p[n] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, u = (e) => {
  var r, o;
  for (let t of ((o = (r = p[e[m]]) == null ? void 0 : r.values) == null ? void 0 : o.call(r)) || [])
    t();
}, h = () => {
  Object.values(p).map((e) => {
    for (let r of e.values())
      r();
  });
};

// src/middleware.ts
var l = [], y = (e) => (l.push(e), () => {
  l.splice(l.indexOf(e), 1);
}), a = (e, r, o) => {
  let t = l.map((n) => n(e, r, o));
  return (n) => {
    r !== "NEW" && u(e);
    let s = 0, i = t.length;
    for (; s < i; )
      typeof t[s] === c && t[s](n), ++s;
  };
};

// src/utils/wrapper.ts
function D(e) {
  let r = [];
  for (; (e = Object.getPrototypeOf(e)) && e !== Object.prototype; )
    r.push(
      ...Object.getOwnPropertyNames(e).filter(
        (o) => {
          var t;
          return o !== f && e.hasOwnProperty(o) && typeof ((t = Object.getOwnPropertyDescriptor(e, o)) == null ? void 0 : t.get) !== c;
        }
      )
    );
  return r;
}
var g = (e) => {
  let r = D(e);
  for (let o of r) {
    let t = e[o];
    typeof t === c && (e[o] = (...n) => {
      let s = a(e, o, n);
      try {
        let i = t.apply(e, n);
        return i instanceof Promise ? new Promise((E, b) => {
          i.then((x) => (s(), E(x))).catch((x) => (b(x), s(x)));
        }) : (s(), i);
      } catch (i) {
        throw s(i), i;
      }
    });
  }
  return e;
};

// src/constructor.ts
m, d;
var w = class {
  constructor() {
    let r = this[d] || this[f].name, o = this[m] = r + "-" + v(), t = a(this, "NEW", []);
    return p[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), g(this);
  }
};

// src/on-action.ts
var M = (e, r, o, t = "after") => y((n, s, i) => {
  if (n instanceof e && (s === r || r === null)) {
    if (t === "before") {
      o(n, s, i);
      return;
    }
    return (E) => o(n, s, i, E);
  }
});

// src/utils/id.ts
var O = (e) => e[m], I = (e, r) => {
  let [o] = O(e).split("-");
  e[m] = `${o}-${r}`;
};
