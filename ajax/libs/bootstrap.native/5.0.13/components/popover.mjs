var r = Object.defineProperty;
var l = (t, e, s) => e in t ? r(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var o = (t, e, s) => (l(t, typeof e != "symbol" ? e + "" : e, s), s);
import { ObjectAssign as c, focus as m, getInstance as u } from "@thednp/shorty";
import { d as g } from "./dataBsToggle-330f300b.mjs";
import { t as b, g as f, T as d, s as T, p, a as n } from "./tooltip-4ba42f84.mjs";
import "@thednp/event-listener";
import "./showClass-f6a4d601.mjs";
import "./popupContainer-82392867.mjs";
import "./fadeClass-0d50d035.mjs";
import "./base-component-a56d44ba.mjs";
const C = `[${g}="${n}"],[data-tip="${n}"]`, I = c({}, b, {
  template: f(n),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), h = (t) => u(t, p), v = (t) => new a(t);
class a extends d {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, i) {
    super(s, i);
    /* extend original `show()` */
    o(this, "show", () => {
      super.show();
      const { options: s, btn: i } = this;
      s.dismissible && i && setTimeout(() => m(i), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return p;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return I;
  }
}
o(a, "selector", C), o(a, "init", v), o(a, "getInstance", h), o(a, "styleTip", T);
export {
  a as default
};
//# sourceMappingURL=popover.mjs.map
