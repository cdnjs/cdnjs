import { a6 as c, ai as s, a3 as f } from "./base-component-BazRqYWL.mjs";
const i = "modal", v = "offcanvas", a = c({
  tagName: "div",
  className: "popup-container"
}), B = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a, d = n ? o : f(p);
  s(p) && (e === a && d.append(a), e.append(p));
}, N = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a;
  s(p) && (p.remove(), e === a && !a.children.length && a.remove());
}, h = (p, o) => {
  const n = s(o) && o.nodeName !== "BODY" ? o : a;
  return s(p) && n.contains(p);
};
export {
  B as a,
  h,
  i as m,
  v as o,
  N as r
};
//# sourceMappingURL=popupContainer-Dhe1NpFt.mjs.map
