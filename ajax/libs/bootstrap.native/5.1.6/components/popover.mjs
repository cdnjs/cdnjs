import { T as p, t as i, L as n } from "./base-component-BazRqYWL.mjs";
import { d as l } from "./dataBsToggle-B84TS15h.mjs";
import { g as r, t as c, T as m, p as e, s as u, a } from "./tooltip-BL2s6EHC.mjs";
const b = `[${l}="${e}"],[data-tip="${e}"]`, d = p({}, c, {
  template: r(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), f = (t) => i(t, a), g = (t) => new T(t);
class T extends m {
  static selector = b;
  static init = g;
  static getInstance = f;
  static styleTip = u;
  constructor(s, o) {
    super(s, o);
  }
  get name() {
    return a;
  }
  get defaults() {
    return d;
  }
  show = () => {
    super.show();
    const { options: s, btn: o } = this;
    s.dismissible && o && setTimeout(() => n(o), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
