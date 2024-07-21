var h = Object.defineProperty;
var l = (s, e, t) => e in s ? h(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => (l(s, typeof e != "symbol" ? e + "" : e, t), t);
import { querySelector as m, isString as c, Data as r, ObjectKeys as a, normalizeOptions as f } from "@thednp/shorty";
const u = "5.0.13", g = u;
class d {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, t) {
    /** just to have something to extend from */
    i(this, "_toggleEventListeners", () => {
    });
    const n = m(e);
    if (!n)
      throw c(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = r.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && a(this.defaults).length ? f(n, this.defaults, t || {}, "bs") : {}, r.set(n, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return g;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /** Removes component from target element. */
  dispose() {
    r.remove(this.element, this.name), a(this).forEach((e) => {
      delete this[e];
    });
  }
}
export {
  d as B
};
//# sourceMappingURL=base-component-a56d44ba.mjs.map
