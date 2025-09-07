import { d as e, K as c, N as d, W as g } from "./base-component-BazRqYWL.mjs";
const i = "data-bs-target", s = "data-bs-parent", u = "data-bs-container", p = (a) => {
  const n = [i, s, u, "href"], o = e(a);
  return n.map((t) => {
    const r = c(a, t);
    return r ? t === s ? d(a, r) : g(r, o) : null;
  }).filter((t) => t)[0];
};
export {
  i as d,
  p as g
};
//# sourceMappingURL=getTargetElement-DX_B2QXD.mjs.map
