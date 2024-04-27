// src/constants.ts
var m = Symbol(), l = Symbol(), d = "function", y = "constructor";

// src/create-id.ts
var O = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var a = {}, b = (e, r) => {
  var s, n;
  let t = (n = a[s = e[m]]) != null ? n : a[s] = /* @__PURE__ */ new Set(), o = () => r(e);
  return t.add(o), () => {
    t.delete(o);
  };
}, w = (e) => {
  var r, t;
  for (let o of ((t = (r = a[e[m]]) == null ? void 0 : r.values) == null ? void 0 : t.call(r)) || [])
    o();
}, g = () => {
  Object.values(a).map((e) => {
    for (let r of e.values())
      r();
  });
};

// src/middleware.ts
var E = [], T = (e) => (E.push(e), () => {
  E.splice(E.indexOf(e), 1);
}), c = (e, r, t) => {
  let o = E.map((s) => s(e, r, t));
  return (s) => {
    r !== "NEW" && w(e);
    let n = 0, i = o.length;
    for (; n < i; )
      typeof o[n] === d && o[n](s), ++n;
  };
};

// src/utils/wrapper.ts
var N = (e) => {
  var t;
  let r = Object.getPrototypeOf(e) || {};
  for (let o of Object.getOwnPropertyNames(r))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(r, o)) == null ? void 0 : t.get) === d)) {
      let n = r.hasOwnProperty(o), i = e[o];
      n && e instanceof x && o !== y && typeof i === d && (e[o] = (...f) => {
        let u = c(e, o, f);
        try {
          let p = i.apply(e, f);
          return p instanceof Promise ? p.then((M) => (u(), M)).catch(u) : (u(), p);
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
    let r = this[l] || this[y].name, t = this[m] = r + "-" + O(), o = c(this, "NEW", []);
    return a[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(o), N(this);
  }
};
m, l;

// src/on-action.ts
var v = (e, r, t, o = "after") => T((s, n, i) => {
  if (s instanceof e && (n === r || r === null)) {
    if (o === "before") {
      t(s, n, i);
      return;
    }
    return (f) => t(s, n, i, f);
  }
});

// src/utils/id.ts
var h = (e) => e[m], I = (e, r) => {
  let [t] = h(e).split("-");
  e[m] = `${t}-${r}`;
};
export {
  x as Exome,
  T as addMiddleware,
  m as exomeId,
  l as exomeName,
  h as getExomeId,
  v as onAction,
  c as runMiddleware,
  I as setExomeId,
  b as subscribe,
  w as update,
  g as updateAll
};
