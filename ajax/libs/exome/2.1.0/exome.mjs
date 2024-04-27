// src/constants.ts
var m = Symbol(), x = Symbol(), d = "function", f = "constructor";

// src/create-id.ts
var O = () => (Date.now().toString(36) + (Math.random() * 1e3 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var i = {}, v = (e, o) => {
  var n, s;
  let t = (s = i[n = e[m]]) != null ? s : i[n] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, y = (e) => {
  var o, t;
  for (let r of ((t = (o = i[e[m]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, I = () => {
  Object.values(i).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var u = [], w = (e) => (u.push(e), () => {
  u.splice(u.indexOf(e), 1);
}), a = (e, o, t) => {
  let r = u.map((n) => n(e, o, t));
  return () => {
    y(e);
    let n = 0, s = r.length;
    for (; n < s; )
      typeof r[n] === d && r[n](), ++n;
  };
};

// src/utils/wrapper.ts
var N = (e) => {
  var t;
  let o = Object.getPrototypeOf(e) || {};
  for (let r of Object.getOwnPropertyNames(o))
    if (!(typeof ((t = Object.getOwnPropertyDescriptor(o, r)) == null ? void 0 : t.get) === d)) {
      let s = o.hasOwnProperty(r), p = e[r];
      s && e instanceof c && r !== f && typeof p === d && (e[r] = (...E) => {
        let T = a(e, r, E), l = p.apply(e, E);
        return l instanceof Promise ? l.then((b) => (T(), b)) : (T(), l);
      });
    }
  return e;
};

// src/constructor.ts
var c = class {
  constructor() {
    let o = this[x] || this[f].name, t = this[m] = o + "-" + O();
    return i[t] = /* @__PURE__ */ new Set(), Promise.resolve().then(() => a(this, "NEW", [])), N(this);
  }
};
m, x;

// src/on-action.ts
var g = (e, o, t, r = "after") => w((n, s, p) => {
  if (n instanceof e && (s === o || o === null)) {
    if (s === "NEW" || r === "before") {
      t(n, s, p);
      return;
    }
    return () => t(n, s, p);
  }
});

// src/utils/id.ts
var M = (e) => e[m], h = (e, o) => {
  let [t] = M(e).split("-");
  e[m] = `${t}-${o}`;
};
export {
  c as Exome,
  w as addMiddleware,
  m as exomeId,
  x as exomeName,
  M as getExomeId,
  g as onAction,
  a as runMiddleware,
  h as setExomeId,
  v as subscribe,
  y as update,
  I as updateAll
};
