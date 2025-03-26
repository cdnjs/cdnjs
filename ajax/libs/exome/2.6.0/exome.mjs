// src/constants.ts
var m = Symbol(), x = Symbol(), c = "function", u = "constructor";

// src/create-id.ts
var O = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var p = {}, h = (e, r) => {
  var s, i;
  let o = (i = p[s = e[m]]) != null ? i : p[s] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, w = (e) => {
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
var l = [], E = (e) => (l.push(e), () => {
  l.splice(l.indexOf(e), 1);
}), f = (e, r, o) => {
  let t = l.map((s) => s(e, r, o));
  return (s, i) => {
    r !== "NEW" && w(e);
    let n = 0, a = t.length;
    for (; n < a; )
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
      let i = f(e, o, s);
      try {
        let n = t.apply(e, s);
        return n instanceof Promise ? new Promise((a, y) => {
          n.then(
            (d) => (i(void 0, d), a(d))
          ).catch((d) => (y(d), i(d)));
        }) : (i(void 0, n), n);
      } catch (n) {
        throw i(n), n;
      }
    });
  }
  return e;
};

// src/constructor.ts
m, x;
var T = class {
  constructor() {
    let r = this[x] || this[u].name, o = this[m] = r + "-" + O(), t = f(this, "NEW", []);
    return p[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), v(this);
  }
};

// src/on-action.ts
var I = (e, r, o, t = "after") => E((s, i, n) => {
  if (s instanceof e && (i === r || r === null)) {
    if (t === "before") {
      o(s, i, n);
      return;
    }
    return (a, y) => o(s, i, n, a, y);
  }
});

// src/utils/id.ts
var N = (e) => e[m], b = (e, r) => {
  let [o] = N(e).split("-");
  e[m] = `${o}-${r}`;
};
export {
  T as Exome,
  E as addMiddleware,
  m as exomeId,
  x as exomeName,
  N as getExomeId,
  I as onAction,
  f as runMiddleware,
  b as setExomeId,
  h as subscribe,
  w as update,
  g as updateAll
};
