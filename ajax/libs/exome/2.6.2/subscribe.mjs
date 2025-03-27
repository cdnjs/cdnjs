// src/constants.ts
var s = Symbol(), d = Symbol();

// src/subscribe.ts
var n = {}, l = (e, o) => {
  var c, u;
  if (e == null)
    return () => {
    };
  let t = (u = n[c = e[s]]) != null ? u : n[c] = /* @__PURE__ */ new Set(), r = () => o(e);
  return t.add(r), () => {
    t.delete(r);
  };
}, p = (e) => {
  var o, t;
  for (let r of ((t = (o = n[e[s]]) == null ? void 0 : o.values) == null ? void 0 : t.call(o)) || [])
    r();
}, f = () => {
  Object.values(n).map((e) => {
    for (let o of e.values())
      o();
  });
};
export {
  l as subscribe,
  n as subscriptions,
  p as update,
  f as updateAll
};
