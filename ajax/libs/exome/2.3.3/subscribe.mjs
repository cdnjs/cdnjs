// src/constants.ts
var s = Symbol(), m = Symbol();

// src/subscribe.ts
var n = {}, a = (t, o) => {
  var c, x;
  let e = (x = n[c = t[s]]) != null ? x : n[c] = /* @__PURE__ */ new Set(), r = () => o(t);
  return e.add(r), () => {
    e.delete(r);
  };
}, u = (t) => {
  var o, e;
  for (let r of ((e = (o = n[t[s]]) == null ? void 0 : o.values) == null ? void 0 : e.call(o)) || [])
    r();
}, f = () => {
  Object.values(n).map((t) => {
    for (let o of t.values())
      o();
  });
};
export {
  a as subscribe,
  n as subscriptions,
  u as update,
  f as updateAll
};
