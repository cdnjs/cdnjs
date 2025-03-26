import { B as l, _ as i, Q as a, F as c, v as g, t as u, a as m, G as p, E as v, r as f } from "./base-component-BMXjNJAi.mjs";
import { a as n } from "./activeClass-iqaD75Su.mjs";
import { d as h } from "./dataBsToggle-B84TS15h.mjs";
import { i as b } from "./isDisabled-BG5MoQVt.mjs";
const d = "button", r = "Button", B = `[${h}="${d}"]`, _ = (e) => u(e, r), A = (e) => new C(e);
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
    (o ? m : p)(t, n), a(t, c, o ? "false" : "true"), this.isActive = i(t, n);
  };
  _toggleEventListeners = (s) => {
    (s ? v : f)(this.element, g, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  C as default
};
//# sourceMappingURL=button.mjs.map
