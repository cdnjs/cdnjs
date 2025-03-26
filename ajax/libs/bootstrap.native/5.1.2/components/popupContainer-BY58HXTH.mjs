import { a5 as c, ah as s, a0 as f } from "./base-component-BMXjNJAi.mjs";
const v = "modal", B = "offcanvas", a = c({
  tagName: "div",
  className: "popup-container"
}), h = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a, d = n ? o : f(p);
  s(p) && (e === a && d.append(a), e.append(p));
}, i = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a;
  s(p) && (p.remove(), e === a && !a.children.length && a.remove());
}, N = (p, o) => {
  const n = s(o) && o.nodeName !== "BODY" ? o : a;
  return s(p) && n.contains(p);
};
export {
  h as a,
  N as h,
  v as m,
  B as o,
  i as r
};
//# sourceMappingURL=popupContainer-BY58HXTH.mjs.map
