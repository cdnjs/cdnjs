import { B as f, W as g, _ as i, Z as c, a as u, s as v, t as h, m, E, r as _, v as A } from "./base-component-BMXjNJAi.mjs";
import { f as C } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { d as $ } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as b } from "./isDisabled-BG5MoQVt.mjs";
const n = "alert", d = "Alert", L = `.${n}`, B = `[${$}="${n}"]`, D = (s) => h(s, d), I = (s) => new w(s), a = m(
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
    super(t), this.dismiss = g(
      B,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return d;
  }
  close = (t) => {
    const { element: e, dismiss: o } = this;
    !e || !i(e, r) || t && o && b(o) || (c(e, a), !a.defaultPrevented && (u(e, r), i(e, C) ? v(e, () => l(this)) : l(this)));
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
