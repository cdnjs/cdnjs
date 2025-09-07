import { B as l, t as g, _ as i, Q as a, F as c, a as u, G as m, E as p, r as v, v as f } from "./base-component-BazRqYWL.mjs";
import { a as n } from "./activeClass-iqaD75Su.mjs";
import { d as h } from "./dataBsToggle-B84TS15h.mjs";
import { i as b } from "./isDisabled-CipSDrHr.mjs";
const d = "button", r = "Button", B = `[${h}="${d}"]`, _ = (e) => g(e, r), A = (e) => new C(e);
class C extends l {
  static selector = B;
  static init = A;
  static getInstance = _;
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
    (o ? u : m)(t, n), a(t, c, o ? "false" : "true"), this.isActive = i(t, n);
  };
  _toggleEventListeners = (s) => {
    (s ? p : v)(this.element, f, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  C as default
};
//# sourceMappingURL=button.mjs.map
