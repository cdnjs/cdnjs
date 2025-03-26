import { T as p, J as i, t as n } from "./base-component-BMXjNJAi.mjs";
import { d as l } from "./dataBsToggle-B84TS15h.mjs";
import { T as r, s as c, p as a, a as e, g as m, t as u } from "./tooltip-DS8L4mHj.mjs";
const b = `[${l}="${e}"],[data-tip="${e}"]`, d = p({}, u, {
  template: m(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), f = (t) => n(t, a), g = (t) => new T(t);
class T extends r {
  static selector = b;
  static init = g;
  static getInstance = f;
  static styleTip = c;
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
    s.dismissible && o && setTimeout(() => i(o), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
