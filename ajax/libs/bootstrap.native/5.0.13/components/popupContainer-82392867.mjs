import { createElement as c, isNode as n, getDocumentBody as f } from "@thednp/shorty";
const B = "modal", i = "offcanvas", e = c({ tagName: "div", className: "popup-container" }), m = (p, o) => {
  const s = n(o) && o.nodeName === "BODY", a = n(o) && !s ? o : e, d = s ? o : f(p);
  n(p) && (a === e && d.append(e), a.append(p));
}, v = (p, o) => {
  const s = n(o) && o.nodeName === "BODY", a = n(o) && !s ? o : e;
  n(p) && (p.remove(), a === e && !e.children.length && e.remove());
}, N = (p, o) => {
  const s = n(o) && o.nodeName !== "BODY" ? o : e;
  return n(p) && s.contains(p);
};
export {
  m as a,
  N as h,
  B as m,
  i as o,
  v as r
};
//# sourceMappingURL=popupContainer-82392867.mjs.map
