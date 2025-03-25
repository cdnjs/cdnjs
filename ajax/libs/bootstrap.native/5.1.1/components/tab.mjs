import { B as A, S as p, H as R, K as f, W as H, c as v, G as l, t as d, a as T, q as b, n as D, X as z, p as C, m as W, R as F, a8 as E, E as J, r as N, g as O } from "./base-component--xj9oMJ8.mjs";
import { c as P } from "./collapsingClass-BxKtDBMH.mjs";
import { a as c } from "./activeClass-iqaD75Su.mjs";
import { f as h } from "./fadeClass-CLIYI_zn.mjs";
import { s as w } from "./showClass-C8hdJfjQ.mjs";
import { d as S } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as Q } from "./dataBsToggle-B84TS15h.mjs";
import { g as y } from "./getTargetElement-B-Gw6dom.mjs";
const m = "tab", X = "Tab", B = `[${Q}="${m}"]`, j = (s) => z(s, X), U = (s) => new Y(s), x = C(
  `show.bs.${m}`
), I = C(
  `shown.bs.${m}`
), $ = C(
  `hide.bs.${m}`
), L = C(
  `hidden.bs.${m}`
), u = /* @__PURE__ */ new Map(), _ = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, P) && (e.style.height = "", b(e, P)), t && v.clear(t);
}, k = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = d(i) && u.get(i) || { tab: null };
  if (t && n && l(n, h)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a !== r ? setTimeout(() => {
      t.style.height = `${r}px`, W(t), D(t, () => _(s));
    }, 50) : _(s);
  } else i && v.clear(i);
  I.relatedTarget = o, T(e, I);
}, q = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, h) && ([a, t].forEach((g) => {
    g && f(g, "overflow-hidden");
  }), r = a ? a.scrollHeight : 0), x.relatedTarget = o, L.relatedTarget = e, T(e, x), !x.defaultPrevented) {
    if (t && f(t, c), a && b(a, c), n && t && l(t, h)) {
      const g = t.scrollHeight;
      u.set(e, {
        currentHeight: r,
        nextHeight: g,
        tab: null,
        content: null
      }), f(n, P), n.style.height = `${r}px`, W(n), [a, t].forEach((G) => {
        G && b(G, "overflow-hidden");
      });
    }
    t && t && l(t, h) ? setTimeout(() => {
      f(t, w), D(t, () => {
        k(s);
      });
    }, 1) : (t && f(t, w), k(s)), o && T(o, L);
  }
}, K = (s) => {
  const { nav: e } = s;
  if (!d(e))
    return { tab: null, content: null };
  const t = F(
    c,
    e
  );
  let n = null;
  t.length === 1 && !S.some(
    (o) => l(t[0].parentElement, o)
  ) ? [n] = t : t.length > 1 && (n = t[t.length - 1]);
  const i = d(n) ? y(n) : null;
  return { tab: n, content: i };
}, M = (s) => {
  if (!d(s)) return null;
  const e = p(s, `.${S.join(",.")}`);
  return e ? R(`.${S[0]}-toggle`, e) : null;
}, V = (s) => {
  const e = p(s.target, B), t = e && j(e);
  t && (s.preventDefault(), t.show());
};
class Y extends A {
  static selector = B;
  static init = U;
  static getInstance = j;
  constructor(e) {
    super(e);
    const { element: t } = this, n = y(t);
    if (!n) return;
    const i = p(t, ".nav"), o = p(
      n,
      ".tab-content"
    );
    this.nav = i, this.content = n, this.tabContent = o, this.dropdown = M(t);
    const { tab: a } = K(this);
    if (i && !a) {
      const r = R(B, i), g = r && y(r);
      g && (f(r, c), f(g, w), f(g, c), H(t, E, "true"));
    }
    this._toggleEventListeners(!0);
  }
  get name() {
    return X;
  }
  show() {
    const { element: e, content: t, nav: n, dropdown: i } = this;
    if (n && v.get(n) || l(e, c)) return;
    const { tab: o, content: a } = K(this);
    if (n && o && u.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), $.relatedTarget = e, !d(o) || (T(o, $), $.defaultPrevented)) return;
    f(e, c), H(e, E, "true");
    const r = d(o) && M(o);
    if (r && l(r, c) && b(r, c), n) {
      const g = () => {
        o && (b(o, c), H(o, E, "false")), i && !l(i, c) && f(i, c);
      };
      a && (l(a, h) || t && l(t, h)) ? v.set(n, g, 1) : g();
    }
    a && (b(a, w), l(a, h) ? D(a, () => q(this)) : q(this));
  }
  _toggleEventListeners = (e) => {
    (e ? J : N)(this.element, O, V);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  Y as default
};
//# sourceMappingURL=tab.mjs.map
