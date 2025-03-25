import { L as x, a4 as I, a0 as d, J as c, w as f, G as y, R as i, a5 as P, H as B, d as E, q as g, K as m, m as M, t as T } from "./base-component--xj9oMJ8.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { a as V, m as u, o as C, r as W } from "./popupContainer-T6ricSTx.mjs";
const U = "Modal", X = "Offcanvas", q = "fixed-top", A = "fixed-bottom", R = "sticky-top", O = "position-sticky", S = (s) => [
  ...i(q, s),
  ...i(A, s),
  ...i(R, s),
  ...i(O, s),
  ...i("is-fixed", s)
], G = (s) => {
  const a = d(s);
  f(a, {
    paddingRight: "",
    overflow: ""
  });
  const o = S(a);
  o.length && o.forEach((e) => {
    f(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, H = (s) => {
  const { clientWidth: a } = x(s), { innerWidth: o } = I(s);
  return Math.abs(o - a);
}, Y = (s, a) => {
  const o = d(s), e = parseInt(c(o, "paddingRight"), 10), l = c(o, "overflow") === "hidden" && e ? 0 : H(s), h = S(o);
  a && (f(o, {
    overflow: "hidden",
    paddingRight: `${e + l}px`
  }), h.length && h.forEach((n) => {
    const w = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(w, 10) + l}px`, [R, O].some((p) => y(n, p))) {
      const p = c(n, "marginRight");
      n.style.marginRight = `${parseInt(p, 10) - l}px`;
    }
  }));
}, k = "backdrop", v = `${u}-${k}`, b = `${C}-${k}`, K = `.${u}.${r}`, F = `.${C}.${r}`, t = P("div"), J = (s) => B(
  `${K},${F}`,
  E(s)
), L = (s) => {
  const a = s ? v : b;
  [v, b].forEach((o) => {
    g(t, o);
  }), m(t, a);
}, Z = (s, a, o) => {
  L(o), V(t, d(s)), a && m(t, $);
}, _ = () => {
  y(t, r) || (m(t, r), M(t));
}, ss = () => {
  g(t, r);
}, os = (s) => {
  J(s) || (g(t, $), W(t, d(s)), G(s));
}, as = (s) => T(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  Z as a,
  H as b,
  Y as c,
  X as d,
  K as e,
  F as f,
  J as g,
  ss as h,
  as as i,
  U as m,
  t as o,
  os as r,
  _ as s,
  L as t
};
//# sourceMappingURL=isVisible-D50RKO3x.mjs.map
