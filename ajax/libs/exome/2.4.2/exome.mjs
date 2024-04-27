// src/constants.ts
var m = Symbol(), y = Symbol(), d = "function", w = "constructor";

// src/create-id.ts
var N = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, v = (e, o) => {
  var s, n;
  let t = (n = a[s = e[m]]) != null ? n : a[s] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, T = (e) => {
  var o, t;
  for (let r of ((t = (o = a[e[m]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, I = () => {
  Object.values(a).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var E = [], O = (e) => (E.push(e), () => {
  E.splice(E.indexOf(e), 1);
}), c = (e, o, t) => {
  let r = E.map((s) => s(e, o, t));
  return (s) => {
    o !== "NEW" && T(e);
    let n = 0, i = r.length;
    for (; n < i; )
      typeof r[n] === d && r[n](s), ++n;
  };
};

// src/utils/wrapper.ts
var h = (e) => {
  var t;
  let o = Object.getPrototypeOf(e) || {};
  for (let r of Object.getOwnPropertyNames(o))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(o, r)) == null ? void 0 : t.get) === d)) {
      let n = o.hasOwnProperty(r), i = e[r];
      n && e instanceof x && r !== w && typeof i === d && (e[r] = (...f) => {
        let u = c(e, r, f);
        try {
          let p = i.apply(e, f);
          return p instanceof Promise ? new Promise((b, g) => {
            p.then((l) => (u(), b(l))).catch((l) => (g(l), u(l)));
          }) : (u(), p);
        } catch (p) {
          throw u(p), p;
        }
      });
    }
  return e;
};

// src/constructor.ts
var x = class {
  constructor() {
    let o = this[y] || this[w].name, t = this[m] = o + "-" + N(), r = c(this, "NEW", []);
    return a[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(r), h(this);
  }
};
m, y;

// src/on-action.ts
var S = (e, o, t, r = "after") => O((s, n, i) => {
  if (s instanceof e && (n === o || o === null)) {
    if (r === "before") {
      t(s, n, i);
      return;
    }
    return (f) => t(s, n, i, f);
  }
});

// src/utils/id.ts
var M = (e) => e[m], C = (e, o) => {
  let [t] = M(e).split("-");
  e[m] = `${t}-${o}`;
};
export {
  x as Exome,
  O as addMiddleware,
  m as exomeId,
  y as exomeName,
  M as getExomeId,
  S as onAction,
  c as runMiddleware,
  C as setExomeId,
  v as subscribe,
  T as update,
  I as updateAll
};
