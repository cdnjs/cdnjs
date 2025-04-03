// src/constants.ts
var a = Symbol(), f = Symbol(), c = "function", u = "constructor";

// src/create-id.ts
var O = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var d = {}, N = (e, r) => {
  var s, i;
  if (e == null)
    return () => {
    };
  let o = (i = d[s = e[a]]) != null ? i : d[s] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, w = (e) => {
  var r, o;
  for (let t of ((o = (r = d[e[a]]) == null ? void 0 : r.values) == null ? void 0 : o.call(r)) || [])
    t();
}, g = () => {
  Object.values(d).map((e) => {
    for (let r of e.values())
      r();
  });
};

// src/middleware.ts
var l = [], E = (e) => (l.push(e), () => {
  l.splice(l.indexOf(e), 1);
}), x = (e, r, o) => {
  let t = l.map((s) => s(e, r, o));
  return (s, i) => {
    r !== "NEW" && w(e);
    let n = 0, m = t.length;
    for (; n < m; )
      typeof t[n] === c && t[n](s, i), ++n;
  };
};

// src/utils/wrapper.ts
function M(e) {
  let r = [];
  for (; (e = Object.getPrototypeOf(e)) && e !== Object.prototype; )
    r.push(
      ...Object.getOwnPropertyNames(e).filter(
        (o) => {
          var t;
          return o !== u && e.hasOwnProperty(o) && typeof ((t = Object.getOwnPropertyDescriptor(e, o)) == null ? void 0 : t.get) !== c;
        }
      )
    );
  return r;
}
var v = (e) => {
  let r = M(e);
  for (let o of r) {
    let t = e[o];
    typeof t === c && (e[o] = (...s) => {
      let i = x(e, o, s);
      try {
        let n = t.apply(e, s);
        return n instanceof Promise ? new Promise((m, y) => {
          n.then(
            (p) => (i(void 0, p), m(p))
          ).catch((p) => (y(p), i(p)));
        }) : (i(void 0, n), n);
      } catch (n) {
        throw i(n), n;
      }
    });
  }
  return e;
};

// src/constructor.ts
a, f;
var T = class {
  constructor() {
    let r = this[f] || this[u].name, o = this[a] = r + "-" + O(), t = x(this, "NEW", []);
    return d[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), v(this);
  }
};

// src/on-action.ts
var P = (e, r, o, t = "after") => E((s, i, n) => {
  if (s instanceof e && (i === r || r === null)) {
    if (t === "before") {
      o(s, i, n);
      return;
    }
    return (m, y) => o(s, i, n, m, y);
  }
});

// src/utils/id.ts
var h = (e) => e[a], I = (e, r) => {
  let [o] = h(e).split("-");
  e[a] = `${o}-${r}`;
};
export {
  T as Exome,
  E as addMiddleware,
  a as exomeId,
  f as exomeName,
  h as getExomeId,
  P as onAction,
  x as runMiddleware,
  I as setExomeId,
  N as subscribe,
  w as update,
  g as updateAll
};
