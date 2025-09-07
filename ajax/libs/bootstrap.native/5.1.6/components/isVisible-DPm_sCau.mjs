import { P as w, a5 as I, a3 as d, M as c, j as i, y as p, _ as y, a6 as P, W, d as E, G as g, a as h, f as M, o as B } from "./base-component-BazRqYWL.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { m as u, o as C, a as T, r as V } from "./popupContainer-Dhe1NpFt.mjs";
const N = "Modal", Q = "Offcanvas", j = "fixed-top", A = "fixed-bottom", S = "sticky-top", O = "position-sticky", R = (s) => [
  ...i(j, s),
  ...i(A, s),
  ...i(S, s),
  ...i(O, s),
  ...i("is-fixed", s)
], G = (s) => {
  const a = d(s);
  p(a, {
    paddingRight: "",
    overflow: ""
  });
  const o = R(a);
  o.length && o.forEach((e) => {
    p(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, _ = (s) => {
  const { clientWidth: a } = w(s), { innerWidth: o } = I(s);
  return Math.abs(o - a);
}, U = (s, a) => {
  const o = d(s), e = parseInt(c(o, "paddingRight"), 10), f = c(o, "overflow") === "hidden" && e ? 0 : _(s), m = R(o);
  a && (p(o, {
    overflow: "hidden",
    paddingRight: `${e + f}px`
  }), m.length && m.forEach((n) => {
    const x = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(x, 10) + f}px`, [S, O].some((l) => y(n, l))) {
      const l = c(n, "marginRight");
      n.style.marginRight = `${parseInt(l, 10) - f}px`;
    }
  }));
}, k = "backdrop", v = `${u}-${k}`, b = `${C}-${k}`, F = `.${u}.${r}`, Z = `.${C}.${r}`, t = P("div"), q = (s) => W(
  `${F},${Z}`,
  E(s)
), z = (s) => {
  const a = s ? v : b;
  [v, b].forEach((o) => {
    h(t, o);
  }), g(t, a);
}, X = (s, a, o) => {
  z(o), T(t, d(s)), a && g(t, $);
}, Y = () => {
  y(t, r) || (g(t, r), M(t));
}, ss = () => {
  h(t, r);
}, os = (s) => {
  q(s) || (h(t, $), V(t, d(s)), G(s));
}, as = (s) => B(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  X as a,
  Q as b,
  _ as c,
  U as d,
  F as e,
  Z as f,
  q as g,
  ss as h,
  as as i,
  N as m,
  t as o,
  os as r,
  Y as s,
  z as t
};
//# sourceMappingURL=isVisible-DPm_sCau.mjs.map
