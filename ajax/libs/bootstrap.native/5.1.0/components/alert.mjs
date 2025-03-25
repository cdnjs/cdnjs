import { B as g, H as f, G as i, a as c, q as u, n as h, X as v, p as m, E, r as A, g as C } from "./base-component-LaJIjMhh.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { d as b } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as L } from "./isDisabled-DmmaKYeZ.mjs";
const o = "alert", d = "Alert", _ = `.${o}`, B = `[${b}="${o}"]`, D = (s) => v(s, d), G = (s) => new S(s), a = m(
  `close.bs.${o}`
), I = m(
  `closed.bs.${o}`
), l = (s) => {
  const { element: t } = s;
  c(t, I), s._toggleEventListeners(), s.dispose(), t.remove();
};
class S extends g {
  static selector = _;
  static init = G;
  static getInstance = D;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = f(
      B,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return d;
  }
  close = (t) => {
    const { element: e, dismiss: n } = this;
    !e || !i(e, r) || t && n && L(n) || (c(e, a), !a.defaultPrevented && (u(e, r), i(e, $) ? h(e, () => l(this)) : l(this)));
  };
  _toggleEventListeners = (t) => {
    const e = t ? E : A, { dismiss: n, close: p } = this;
    n && e(n, C, p);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  S as default
};
//# sourceMappingURL=alert.mjs.map
