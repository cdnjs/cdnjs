var u = Object.defineProperty;
var d = (e, i, t) => i in e ? u(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t;
var n = (e, i, t) => (d(e, typeof i != "symbol" ? i + "" : i, t), t);
import { hasClass as a, setAttribute as l, ariaPressed as g, getAttribute as p, mouseclickEvent as v, getInstance as f, removeClass as b, addClass as h } from "@thednp/shorty";
import { addListener as A, removeListener as C } from "@thednp/event-listener";
import { a as r } from "./activeClass-b231b21b.mjs";
import { d as L } from "./dataBsToggle-330f300b.mjs";
import { B as E } from "./base-component-a56d44ba.mjs";
const I = "button", m = "Button", B = `[${L}="${I}"]`, S = (e) => f(e, m), _ = (e) => new o(e);
class o extends E {
  /**
   * @param target usually a `.btn` element
   */
  constructor(t) {
    super(t);
    n(this, "isActive", !1);
    // BUTTON PUBLIC METHODS
    // =====================
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    n(this, "toggle", (t) => {
      t && t.preventDefault();
      const { element: s, isActive: c } = this;
      !a(s, "disabled") && !p(s, "disabled") && ((c ? b : h)(s, r), l(s, g, c ? "false" : "true"), this.isActive = a(s, r));
    });
    // BUTTON PRIVATE METHOD
    // =====================
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    n(this, "_toggleEventListeners", (t) => {
      (t ? A : C)(this.element, v, this.toggle);
    });
    const { element: s } = this;
    this.isActive = a(s, r), l(s, g, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return m;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
n(o, "selector", B), n(o, "init", _), n(o, "getInstance", S);
export {
  o as default
};
//# sourceMappingURL=button.mjs.map
