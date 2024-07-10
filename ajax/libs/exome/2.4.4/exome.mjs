// src/constants.ts
var i = Symbol(), y = Symbol(), p = "function", E = "constructor";

// src/create-id.ts
var v = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, g = (e, o) => {
  var s, n;
  let t = (n = a[s = e[i]]) != null ? n : a[s] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, T = (e) => {
  var o, t;
  for (let r of ((t = (o = a[e[i]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, I = () => {
  Object.values(a).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var w = [], O = (e) => (w.push(e), () => {
  w.splice(w.indexOf(e), 1);
}), c = (e, o, t) => {
  let r = w.map((s) => s(e, o, t));
  return (s) => {
    o !== "NEW" && T(e);
    let n = 0, m = r.length;
    for (; n < m; )
      typeof r[n] === p && r[n](s), ++n;
  };
};

// src/utils/wrapper.ts
var b = (e) => {
  var t;
  let o = Object.getPrototypeOf(e) || {};
  for (let r of Object.getOwnPropertyNames(o))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(o, r)) == null ? void 0 : t.get) === p)) {
      let n = o.hasOwnProperty(r), m = e[r];
      n && e instanceof x && r !== E && typeof m === p && (e[r] = (...f) => {
        let u = c(e, r, f);
        try {
          let d = m.apply(e, f);
          return d instanceof Promise ? new Promise((h, M) => {
            d.then((l) => (u(), h(l))).catch((l) => (M(l), u(l)));
          }) : (u(), d);
        } catch (d) {
          throw u(d), d;
        }
      });
    }
  return e;
};

// src/constructor.ts
i, y;
var x = class {
  constructor() {
    let o = this[y] || this[E].name, t = this[i] = o + "-" + v(), r = c(this, "NEW", []);
    return a[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(r), b(this);
  }
};

// src/on-action.ts
var S = (e, o, t, r = "after") => O((s, n, m) => {
  if (s instanceof e && (n === o || o === null)) {
    if (r === "before") {
      t(s, n, m);
      return;
    }
    return (f) => t(s, n, m, f);
  }
});

// src/utils/id.ts
var N = (e) => e[i], C = (e, o) => {
  let [t] = N(e).split("-");
  e[i] = `${t}-${o}`;
};
export {
  x as Exome,
  O as addMiddleware,
  i as exomeId,
  y as exomeName,
  N as getExomeId,
  S as onAction,
  c as runMiddleware,
  C as setExomeId,
  g as subscribe,
  T as update,
  I as updateAll
};
