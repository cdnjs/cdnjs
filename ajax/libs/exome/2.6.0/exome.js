"use strict";
var O = Object.defineProperty;
var S = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var C = Object.prototype.hasOwnProperty;
var U = (e, r) => {
  for (var o in r)
    O(e, o, { get: r[o], enumerable: !0 });
}, A = (e, r, o, t) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let n of P(r))
      !C.call(e, n) && n !== o && O(e, n, { get: () => r[n], enumerable: !(t = S(r, n)) || t.enumerable });
  return e;
};
var R = (e) => A(O({}, "__esModule", { value: !0 }), e);

// src/exome.ts
var W = {};
U(W, {
  Exome: () => E,
  addMiddleware: () => w,
  exomeId: () => m,
  exomeName: () => f,
  getExomeId: () => v,
  onAction: () => I,
  runMiddleware: () => a,
  setExomeId: () => b,
  subscribe: () => h,
  update: () => l,
  updateAll: () => g
});
module.exports = R(W);

// src/constants.ts
var m = Symbol(), f = Symbol(), x = "function", u = "constructor";

// src/create-id.ts
var N = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var p = {}, h = (e, r) => {
  var n, i;
  let o = (i = p[n = e[m]]) != null ? i : p[n] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, l = (e) => {
  var r, o;
  for (let t of ((o = (r = p[e[m]]) == null ? void 0 : r.values) == null ? void 0 : o.call(r)) || [])
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
}), a = (e, r, o) => {
  let t = y.map((n) => n(e, r, o));
  return (n, i) => {
    r !== "NEW" && l(e);
    let s = 0, d = t.length;
    for (; s < d; )
      typeof t[s] === x && t[s](n, i), ++s;
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
          return o !== u && e.hasOwnProperty(o) && typeof ((t = Object.getOwnPropertyDescriptor(e, o)) == null ? void 0 : t.get) !== x;
        }
      )
    );
  return r;
}
var M = (e) => {
  let r = D(e);
  for (let o of r) {
    let t = e[o];
    typeof t === x && (e[o] = (...n) => {
      let i = a(e, o, n);
      try {
        let s = t.apply(e, n);
        return s instanceof Promise ? new Promise((d, T) => {
          s.then(
            (c) => (i(void 0, c), d(c))
          ).catch((c) => (T(c), i(c)));
        }) : (i(void 0, s), s);
      } catch (s) {
        throw i(s), s;
      }
    });
  }
  return e;
};

// src/constructor.ts
m, f;
var E = class {
  constructor() {
    let r = this[f] || this[u].name, o = this[m] = r + "-" + N(), t = a(this, "NEW", []);
    return p[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), M(this);
  }
};

// src/on-action.ts
var I = (e, r, o, t = "after") => w((n, i, s) => {
  if (n instanceof e && (i === r || r === null)) {
    if (t === "before") {
      o(n, i, s);
      return;
    }
    return (d, T) => o(n, i, s, d, T);
  }
});

// src/utils/id.ts
var v = (e) => e[m], b = (e, r) => {
  let [o] = v(e).split("-");
  e[m] = `${o}-${r}`;
};
