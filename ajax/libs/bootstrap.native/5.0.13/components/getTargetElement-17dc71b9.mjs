import { getDocument as o, getAttribute as c, closest as d, querySelector as g } from "@thednp/shorty";
const u = "data-bs-target", e = "data-bs-parent", i = "data-bs-container", b = (a) => {
  const n = [u, e, i, "href"], s = o(a);
  return n.map((t) => {
    const r = c(a, t);
    return r ? t === e ? d(a, r) : g(r, s) : null;
  }).filter((t) => t)[0];
};
export {
  u as d,
  b as g
};
//# sourceMappingURL=getTargetElement-17dc71b9.mjs.map
