var h = Object.defineProperty;
var u = (t, s, e) => s in t ? h(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var o = (t, s, e) => (u(t, typeof s != "symbol" ? s + "" : s, e), e);
import { createCustomEvent as d, querySelector as E, hasClass as a, dispatchEvent as p, removeClass as C, emulateTransitionEnd as L, mouseclickEvent as $, getInstance as I } from "@thednp/shorty";
import { addListener as S, removeListener as _ } from "@thednp/event-listener";
import { f as b } from "./fadeClass-0d50d035.mjs";
import { s as c } from "./showClass-f6a4d601.mjs";
import { d as B } from "./dataBsDismiss-afbfbc79.mjs";
import { B as k } from "./base-component-a56d44ba.mjs";
const i = "alert", g = "Alert", w = `.${i}`, x = `[${B}="${i}"]`, A = (t) => I(t, g), D = (t) => new n(t), l = d(`close.bs.${i}`), T = d(`closed.bs.${i}`), m = (t) => {
  const { element: s } = t;
  p(s, T), t._toggleEventListeners(), t.dispose(), s.remove();
};
class n extends k {
  constructor(e) {
    super(e);
    o(this, "dismiss");
    // ALERT PUBLIC METHODS
    // ====================
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    o(this, "close", () => {
      const { element: e } = this;
      e && a(e, c) && (p(e, l), l.defaultPrevented || (C(e, c), a(e, b) ? L(e, () => m(this)) : m(this)));
    });
    /**
     * Toggle on / off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    o(this, "_toggleEventListeners", (e) => {
      const v = e ? S : _, { dismiss: r, close: f } = this;
      r && v(r, $, f);
    });
    this.dismiss = E(x, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return g;
  }
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
o(n, "selector", w), o(n, "init", D), o(n, "getInstance", A);
export {
  n as default
};
//# sourceMappingURL=alert.mjs.map
