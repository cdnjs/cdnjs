"use strict";
var O = Object.defineProperty;
var b = Object.getOwnPropertyDescriptor;
var S = Object.getOwnPropertyNames;
var A = Object.prototype.hasOwnProperty;
var C = (e, r) => {
  for (var o in r)
    O(e, o, { get: r[o], enumerable: !0 });
}, U = (e, r, o, t) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let n of S(r))
      !A.call(e, n) && n !== o && O(e, n, { get: () => r[n], enumerable: !(t = b(r, n)) || t.enumerable });
  return e;
};
var R = (e) => U(O({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var F = {};
C(F, {
  Exome: () => E,
  addMiddleware: () => w,
  exomeId: () => a,
  exomeName: () => f,
  getExomeId: () => v,
  onAction: () => P,
  runMiddleware: () => m,
  setExomeId: () => I,
  subscribe: () => N,
  update: () => l,
  updateAll: () => g
});
module.exports = R(F);

// src/constants.ts
var a = Symbol(), f = Symbol(), d = "function", u = "constructor";

// src/create-id.ts
var h = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var p = {}, N = (e, r) => {
  var n, i;
  if (e == null)
    return () => {
    };
  let o = (i = p[n = e[a]]) != null ? i : p[n] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, l = (e) => {
  var r, o;
  for (let t of ((o = (r = p[e[a]]) == null ? void 0 : r.values) == null ? void 0 : o.call(r)) || [])
    t();
}, g = () => {
  Object.values(p).map((e) => {
    for (let r of e.values())
      r();
  });
};

// src/middleware.ts
var y = [], w = (e) => (y.push(e), () => {
  y.splice(y.indexOf(e), 1);
}), m = (e, r, o) => {
  let t = y.map((n) => n(e, r, o));
  return (n, i) => {
    r !== "NEW" && l(e);
    let s = 0, c = t.length;
    for (; s < c; )
      typeof t[s] === d && t[s](n, i), ++s;
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
          return o !== u && e.hasOwnProperty(o) && typeof ((t = Object.getOwnPropertyDescriptor(e, o)) == null ? void 0 : t.get) !== d;
        }
      )
    );
  return r;
}
var M = (e) => {
  let r = D(e);
  for (let o of r) {
    let t = e[o];
    typeof t === d && (e[o] = (...n) => {
      let i = m(e, o, n);
      try {
        let s = t.apply(e, n);
        return s && typeof s.then === d ? new Promise((c, T) => {
          s.then(
            (x) => (i(void 0, x), c(x))
          ).catch((x) => (T(x), i(x)));
        }) : (i(void 0, s), s);
      } catch (s) {
        throw i(s), s;
      }
    });
  }
  return e;
};

// src/constructor.ts
a, f;
var E = class {
  constructor() {
    let r = this[f] || this[u].name, o = this[a] = r + "-" + h(), t = m(this, "NEW", []);
    return p[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), M(this);
  }
};

// src/on-action.ts
var P = (e, r, o, t = "after") => w((n, i, s) => {
  if (n instanceof e && (i === r || r === null)) {
    if (t === "before") {
      o(n, i, s);
      return;
    }
    return (c, T) => o(n, i, s, c, T);
  }
});

// src/utils/id.ts
var v = (e) => e[a], I = (e, r) => {
  let [o] = v(e).split("-");
  e[a] = `${o}-${r}`;
};
