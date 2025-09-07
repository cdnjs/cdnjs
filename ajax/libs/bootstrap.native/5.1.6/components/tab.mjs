import { B as q, t as z, N as p, W as Q, G as g, Q as E, h as v, _ as l, m as C, o as d, Z as T, a as b, s as y, E as F, r as J, a9 as H, v as K, j as O, f as W } from "./base-component-BazRqYWL.mjs";
import { c as _ } from "./collapsingClass-BxKtDBMH.mjs";
import { a as c } from "./activeClass-iqaD75Su.mjs";
import { f as h } from "./fadeClass-CLIYI_zn.mjs";
import { s as w } from "./showClass-C8hdJfjQ.mjs";
import { d as B } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as R } from "./dataBsToggle-B84TS15h.mjs";
import { g as P } from "./getTargetElement-DX_B2QXD.mjs";
const m = "tab", Z = "Tab", j = `[${R}="${m}"]`, A = (s) => z(s, Z), U = (s) => new X(s), x = C(
  `show.bs.${m}`
), I = C(
  `shown.bs.${m}`
), $ = C(
  `hide.bs.${m}`
), L = C(
  `hidden.bs.${m}`
), u = /* @__PURE__ */ new Map(), S = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, _) && (e.style.height = "", b(e, _)), t && v.clear(t);
}, k = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = d(i) && u.get(i) || { tab: null };
  if (t && n && l(n, h)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a !== r ? setTimeout(() => {
      t.style.height = `${r}px`, W(t), y(t, () => S(s));
    }, 50) : S(s);
  } else i && v.clear(i);
  I.relatedTarget = o, T(e, I);
}, G = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, h) && ([a, t].forEach((f) => {
    f && g(f, "overflow-hidden");
  }), r = a ? a.scrollHeight : 0), x.relatedTarget = o, L.relatedTarget = e, T(e, x), !x.defaultPrevented) {
    if (t && g(t, c), a && b(a, c), n && t && l(t, h)) {
      const f = t.scrollHeight;
      u.set(e, {
        currentHeight: r,
        nextHeight: f,
        tab: null,
        content: null
      }), g(n, _), n.style.height = `${r}px`, W(n), [a, t].forEach((D) => {
        D && b(D, "overflow-hidden");
      });
    }
    t && t && l(t, h) ? setTimeout(() => {
      g(t, w), y(t, () => {
        k(s);
      });
    }, 1) : (t && g(t, w), k(s)), o && T(o, L);
  }
}, M = (s) => {
  const { nav: e } = s;
  if (!d(e))
    return { tab: null, content: null };
  const t = O(
    c,
    e
  );
  let n = null;
  t.length === 1 && !B.some(
    (o) => l(t[0].parentElement, o)
  ) ? [n] = t : t.length > 1 && (n = t[t.length - 1]);
  const i = d(n) ? P(n) : null;
  return { tab: n, content: i };
}, N = (s) => {
  if (!d(s)) return null;
  const e = p(s, `.${B.join(",.")}`);
  return e ? Q(`.${B[0]}-toggle`, e) : null;
}, V = (s) => {
  const e = p(s.target, j), t = e && A(e);
  t && (s.preventDefault(), t.show());
};
class X extends q {
  static selector = j;
  static init = U;
  static getInstance = A;
  constructor(e) {
    super(e);
    const { element: t } = this, n = P(t);
    if (!n) return;
    const i = p(t, ".nav"), o = p(
      n,
      ".tab-content"
    );
    this.nav = i, this.content = n, this.tabContent = o, this.dropdown = N(t);
    const { tab: a } = M(this);
    if (i && !a) {
      const r = Q(j, i), f = r && P(r);
      f && (g(r, c), g(f, w), g(f, c), E(t, H, "true"));
    }
    this._toggleEventListeners(!0);
  }
  get name() {
    return Z;
  }
  show() {
    const { element: e, content: t, nav: n, dropdown: i } = this;
    if (n && v.get(n) || l(e, c)) return;
    const { tab: o, content: a } = M(this);
    if (n && o && u.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), $.relatedTarget = e, !d(o) || (T(o, $), $.defaultPrevented)) return;
    g(e, c), E(e, H, "true");
    const r = d(o) && N(o);
    if (r && l(r, c) && b(r, c), n) {
      const f = () => {
        o && (b(o, c), E(o, H, "false")), i && !l(i, c) && g(i, c);
      };
      a && (l(a, h) || t && l(t, h)) ? v.set(n, f, 1) : f();
    }
    a && (b(a, w), l(a, h) ? y(a, () => G(this)) : G(this));
  }
  _toggleEventListeners = (e) => {
    (e ? F : J)(this.element, K, V);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  X as default
};
//# sourceMappingURL=tab.mjs.map
