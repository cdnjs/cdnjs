import { B as g, G as i, W as a, I as c, g as l, X as u, q as m, K as p, E as f, r as h } from "./base-component-LaJIjMhh.mjs";
import { a as n } from "./activeClass-iqaD75Su.mjs";
import { d as v } from "./dataBsToggle-B84TS15h.mjs";
import { i as b } from "./isDisabled-DmmaKYeZ.mjs";
const d = "button", r = "Button", B = `[${v}="${d}"]`, I = (e) => u(e, r), A = (e) => new C(e);
class C extends g {
  static selector = B;
  static init = A;
  static getInstance = I;
  constructor(s) {
    super(s);
    const { element: t } = this;
    this.isActive = i(t, n), a(t, c, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  get name() {
    return r;
  }
  toggle = (s) => {
    s && s.preventDefault();
    const { element: t, isActive: o } = this;
    if (b(t)) return;
    (o ? m : p)(t, n), a(t, c, o ? "false" : "true"), this.isActive = i(t, n);
  };
  _toggleEventListeners = (s) => {
    (s ? f : h)(this.element, l, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  C as default
};
//# sourceMappingURL=button.mjs.map
