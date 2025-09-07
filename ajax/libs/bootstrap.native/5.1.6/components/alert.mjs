import { B as f, t as g, W as u, _ as i, Z as c, m, a as v, s as h, E, r as _, v as A } from "./base-component-BazRqYWL.mjs";
import { f as C } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { d as $ } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as b } from "./isDisabled-CipSDrHr.mjs";
const n = "alert", d = "Alert", L = `.${n}`, B = `[${$}="${n}"]`, D = (s) => g(s, d), I = (s) => new w(s), a = m(
  `close.bs.${n}`
), S = m(
  `closed.bs.${n}`
), l = (s) => {
  const { element: t } = s;
  c(t, S), s._toggleEventListeners(), s.dispose(), t.remove();
};
class w extends f {
  static selector = L;
  static init = I;
  static getInstance = D;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = u(
      B,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return d;
  }
  close = (t) => {
    const { element: e, dismiss: o } = this;
    !e || !i(e, r) || t && o && b(o) || (c(e, a), !a.defaultPrevented && (v(e, r), i(e, C) ? h(e, () => l(this)) : l(this)));
  };
  _toggleEventListeners = (t) => {
    const e = t ? E : _, { dismiss: o, close: p } = this;
    o && e(o, A, p);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  w as default
};
//# sourceMappingURL=alert.mjs.map
