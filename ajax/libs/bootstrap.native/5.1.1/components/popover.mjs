import { C as n, F as p, X as i } from "./base-component--xj9oMJ8.mjs";
import { d as r } from "./dataBsToggle-B84TS15h.mjs";
import { T as l, s as c, p as a, a as e, g as m, t as u } from "./tooltip-33b5qaZo.mjs";
const b = `[${r}="${e}"],[data-tip="${e}"]`, d = n({}, u, {
  template: m(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), f = (t) => i(t, a), g = (t) => new T(t);
class T extends l {
  static selector = b;
  static init = g;
  static getInstance = f;
  static styleTip = c;
  constructor(o, s) {
    super(o, s);
  }
  get name() {
    return a;
  }
  get defaults() {
    return d;
  }
  show = () => {
    super.show();
    const { options: o, btn: s } = this;
    o.dismissible && s && setTimeout(() => p(s), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
