// src/constants.ts
var m = Symbol(), x = Symbol(), d = "function", f = "constructor";

// src/create-id.ts
var O = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var i = {}, g = (e, o) => {
  var n, s;
  let r = (s = i[n = e[m]]) != null ? s : i[n] = /* @__PURE__ */ new Set(), t = () => o(e);
  return r.add(t), () => {
    r.delete(t);
  };
}, y = (e) => {
  var o, r;
  for (let t of ((r = (o = i[e[m]]) == null ? void 0 : o.values) == null ? void 0 : r.call(o)) || [])
    t();
}, v = () => {
  Object.values(i).map((e) => {
    for (let o of e.values())
      o();
  });
};

// src/middleware.ts
var u = [], w = (e) => (u.push(e), () => {
  u.splice(u.indexOf(e), 1);
}), a = (e, o, r) => {
  let t = u.map((n) => n(e, o, r));
  return () => {
    o !== "NEW" && y(e);
    let n = 0, s = t.length;
    for (; n < s; )
      typeof t[n] === d && t[n](), ++n;
  };
};

// src/utils/wrapper.ts
var N = (e) => {
  var r;
  let o = Object.getPrototypeOf(e) || {};
  for (let t of Object.getOwnPropertyNames(o))
    if (!(typeof ((r = Object.getOwnPropertyDescriptor(o, t)) == null ? void 0 : r.get) === d)) {
      let s = o.hasOwnProperty(t), p = e[t];
      s && e instanceof c && t !== f && typeof p === d && (e[t] = (...T) => {
        let E = a(e, t, T), l = p.apply(e, T);
        return l instanceof Promise ? l.then((b) => (E(), b)) : (E(), l);
      });
    }
  return e;
};

// src/constructor.ts
var c = class {
  constructor() {
    let o = this[x] || this[f].name, r = this[m] = o + "-" + O(), t = a(this, "NEW", []);
    return i[r] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), N(this);
  }
};
m, x;

// src/on-action.ts
var I = (e, o, r, t = "after") => w((n, s, p) => {
  if (n instanceof e && (s === o || o === null)) {
    if (t === "before") {
      r(n, s, p);
      return;
    }
    return () => r(n, s, p);
  }
});

// src/utils/id.ts
var M = (e) => e[m], h = (e, o) => {
  let [r] = M(e).split("-");
  e[m] = `${r}-${o}`;
};
export {
  c as Exome,
  w as addMiddleware,
  m as exomeId,
  x as exomeName,
  M as getExomeId,
  I as onAction,
  a as runMiddleware,
  h as setExomeId,
  g as subscribe,
  y as update,
  v as updateAll
};
