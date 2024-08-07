// src/constants.ts
var m = Symbol(), x = Symbol(), a = "function", f = "constructor";

// src/create-id.ts
var T = () => (Date.now().toString(36) + (Math.random() * 1e5 ^ 1).toString(36)).toUpperCase();

// src/subscribe.ts
var p = {}, h = (e, r) => {
  var s, n;
  let o = (n = p[s = e[m]]) != null ? n : p[s] = /* @__PURE__ */ new Set(), t = () => r(e);
  return o.add(t), () => {
    o.delete(t);
  };
}, y = (e) => {
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
var u = [], w = (e) => (u.push(e), () => {
  u.splice(u.indexOf(e), 1);
}), d = (e, r, o) => {
  let t = u.map((s) => s(e, r, o));
  return (s) => {
    r !== "NEW" && y(e);
    let n = 0, i = t.length;
    for (; n < i; )
      typeof t[n] === a && t[n](s), ++n;
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
          return o !== f && e.hasOwnProperty(o) && typeof ((t = Object.getOwnPropertyDescriptor(e, o)) == null ? void 0 : t.get) !== a;
        }
      )
    );
  return r;
}
var O = (e) => {
  let r = M(e);
  for (let o of r) {
    let t = e[o];
    typeof t === a && (e[o] = (...s) => {
      let n = d(e, o, s);
      try {
        let i = t.apply(e, s);
        return i instanceof Promise ? new Promise((l, N) => {
          i.then((c) => (n(), l(c))).catch((c) => (N(c), n(c)));
        }) : (n(), i);
      } catch (i) {
        throw n(i), i;
      }
    });
  }
  return e;
};

// src/constructor.ts
m, x;
var E = class {
  constructor() {
    let r = this[x] || this[f].name, o = this[m] = r + "-" + T(), t = d(this, "NEW", []);
    return p[o] = /* @__PURE__ */ new Set(), Promise.resolve().then(t), O(this);
  }
};

// src/on-action.ts
var I = (e, r, o, t = "after") => w((s, n, i) => {
  if (s instanceof e && (n === r || r === null)) {
    if (t === "before") {
      o(s, n, i);
      return;
    }
    return (l) => o(s, n, i, l);
  }
});

// src/utils/id.ts
var v = (e) => e[m], b = (e, r) => {
  let [o] = v(e).split("-");
  e[m] = `${o}-${r}`;
};
export {
  E as Exome,
  w as addMiddleware,
  m as exomeId,
  x as exomeName,
  v as getExomeId,
  I as onAction,
  d as runMiddleware,
  b as setExomeId,
  h as subscribe,
  y as update,
  g as updateAll
};
