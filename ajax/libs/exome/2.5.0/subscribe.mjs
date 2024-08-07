// src/constants.ts
var s = Symbol(), x = Symbol();

// src/subscribe.ts
var n = {}, u = (e, o) => {
  var c, m;
  let t = (m = n[c = e[s]]) != null ? m : n[c] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, a = (e) => {
  var o, t;
  for (let r of ((t = (o = n[e[s]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, l = () => {
  Object.values(n).map((e) => {
    for (let o of e.values())
      o();
  });
};
export {
  u as subscribe,
  n as subscriptions,
  a as update,
  l as updateAll
};
