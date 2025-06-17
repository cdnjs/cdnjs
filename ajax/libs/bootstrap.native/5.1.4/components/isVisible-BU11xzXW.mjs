import { M as w, a4 as I, a2 as d, L as c, j as i, x as f, _ as y, a5 as P, W, d as E, G as g, a as h, e as M, o as B } from "./base-component-BO-nCUu-.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { m as u, o as C, a as T, r as V } from "./popupContainer-DjaIEtep.mjs";
const N = "Modal", Q = "Offcanvas", j = "fixed-top", A = "fixed-bottom", S = "sticky-top", x = "position-sticky", O = (s) => [
  ...i(j, s),
  ...i(A, s),
  ...i(S, s),
  ...i(x, s),
  ...i("is-fixed", s)
], G = (s) => {
  const a = d(s);
  f(a, {
    paddingRight: "",
    overflow: ""
  });
  const o = O(a);
  o.length && o.forEach((e) => {
    f(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, _ = (s) => {
  const { clientWidth: a } = w(s), { innerWidth: o } = I(s);
  return Math.abs(o - a);
}, U = (s, a) => {
  const o = d(s), e = parseInt(c(o, "paddingRight"), 10), l = c(o, "overflow") === "hidden" && e ? 0 : _(s), m = O(o);
  a && (f(o, {
    overflow: "hidden",
    paddingRight: `${e + l}px`
  }), m.length && m.forEach((n) => {
    const k = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(k, 10) + l}px`, [S, x].some((p) => y(n, p))) {
      const p = c(n, "marginRight");
      n.style.marginRight = `${parseInt(p, 10) - l}px`;
    }
  }));
}, R = "backdrop", v = `${u}-${R}`, b = `${C}-${R}`, F = `.${u}.${r}`, L = `.${C}.${r}`, t = P("div"), Z = (s) => W(
  `${F},${L}`,
  E(s)
), q = (s) => {
  const a = s ? v : b;
  [v, b].forEach((o) => {
    h(t, o);
  }), g(t, a);
}, X = (s, a, o) => {
  q(o), T(t, d(s)), a && g(t, $);
}, Y = () => {
  y(t, r) || (g(t, r), M(t));
}, ss = () => {
  h(t, r);
}, os = (s) => {
  Z(s) || (h(t, $), V(t, d(s)), G(s));
}, as = (s) => B(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  X as a,
  Q as b,
  _ as c,
  U as d,
  F as e,
  L as f,
  Z as g,
  ss as h,
  as as i,
  N as m,
  t as o,
  os as r,
  Y as s,
  q as t
};
//# sourceMappingURL=isVisible-BU11xzXW.mjs.map
