import { getDocumentElement as x, getWindow as w, getDocumentBody as l, getElementStyle as i, setElementStyle as f, hasClass as C, getElementsByClassName as n, createElement as I, querySelector as B, getDocument as P, removeClass as g, addClass as m, reflow as M, isHTMLElement as T } from "@thednp/shorty";
import { f as b } from "./fadeClass-0d50d035.mjs";
import { s as c } from "./showClass-f6a4d601.mjs";
import { a as W, m as u, o as $, r as D } from "./popupContainer-82392867.mjs";
const U = "Modal", X = "Offcanvas", V = "fixed-top", A = "fixed-bottom", S = "sticky-top", E = "position-sticky", O = (s) => [
  ...n(V, s),
  ...n(A, s),
  ...n(S, s),
  ...n(E, s),
  ...n("is-fixed", s)
], q = (s) => {
  const o = l(s);
  f(o, {
    paddingRight: "",
    overflow: ""
  });
  const t = O(o);
  t.length && t.forEach((r) => {
    f(r, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, F = (s) => {
  const { clientWidth: o } = x(s), { innerWidth: t } = w(s);
  return Math.abs(t - o);
}, Y = (s, o) => {
  const t = l(s), r = parseInt(i(t, "paddingRight"), 10), d = i(t, "overflow") === "hidden" && r ? 0 : F(s), h = O(t);
  o && (f(t, {
    overflow: "hidden",
    paddingRight: `${r + d}px`
  }), h.length && h.forEach((e) => {
    const k = i(e, "paddingRight");
    if (e.style.paddingRight = `${parseInt(k, 10) + d}px`, [S, E].some((p) => C(e, p))) {
      const p = i(e, "marginRight");
      e.style.marginRight = `${parseInt(p, 10) - d}px`;
    }
  }));
}, R = "backdrop", v = `${u}-${R}`, y = `${$}-${R}`, H = `.${u}.${c}`, L = `.${$}.${c}`, a = I("div"), N = (s) => B(`${H},${L}`, P(s)), j = (s) => {
  const o = s ? v : y;
  [v, y].forEach((t) => {
    g(a, t);
  }), m(a, o);
}, Z = (s, o, t) => {
  j(t), W(a, l(s)), o && m(a, b);
}, _ = () => {
  C(a, c) || (m(a, c), M(a));
}, ss = () => {
  g(a, c);
}, ts = (s) => {
  N(s) || (g(a, b), D(a, l(s)), q(s));
}, os = (s) => T(s) && i(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  Z as a,
  a as b,
  F as c,
  Y as d,
  H as e,
  L as f,
  N as g,
  ss as h,
  os as i,
  U as m,
  X as o,
  ts as r,
  _ as s,
  j as t
};
//# sourceMappingURL=isVisible-19f1341e.mjs.map
