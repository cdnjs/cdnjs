import { af as m, aq as o } from "./base-component-BazRqYWL.mjs";
var l = "1.1.0";
const d = [
  "all",
  "intersecting",
  "update"
], _ = "PositionObserver Error";
var v = class {
  entries;
  static version = l;
  /** `PositionObserver.tick` */
  _t;
  /** `PositionObserver.root` */
  _r;
  /** `PositionObserver.callbackMode` */
  _cm;
  /** `PositionObserver.root.clientWidth` */
  _w;
  /** `PositionObserver.root.clientHeight` */
  _h;
  /** `IntersectionObserver.options.rootMargin` */
  _rm;
  /** `IntersectionObserver.options.threshold` */
  _th;
  /** `PositionObserver.callback` */
  _c;
  /**
  * The constructor takes two arguments, a `callback`, which is called
  * whenever the position of an observed element changes and an `options` object.
  * The callback function takes an array of `PositionObserverEntry` objects
  * as its first argument and the PositionObserver instance as its second argument.
  *
  * @param callback the callback that applies to all targets of this observer
  * @param options the options of this observer
  */
  constructor(t, e) {
    if (!m(t)) throw new Error(`${_}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._c = t, this._t = 0;
    const i = o(e?.root) ? e.root : document?.documentElement;
    this._r = i, this._rm = e?.rootMargin, this._th = e?.threshold;
    this._cm = d.indexOf(e?.callbackMode || "intersecting"), this._w = i.clientWidth, this._h = i.clientHeight;
  }
  /**
  * Start observing the position of the specified element.
  * If the element is not currently attached to the DOM,
  * it will NOT be added to the entries.
  *
  * @param target an `Element` target
  */
  observe = (t) => {
    if (!o(t)) throw new Error(`${_}: ${t} is not an instance of Element.`);
    this._r.contains(t) && this._n(t).then((e) => {
      e.boundingClientRect && !this.getEntry(t) && this.entries.set(t, e);
      this._t || (this._t = requestAnimationFrame(this._rc));
    });
  };
  /**
  * Stop observing the position of the specified element.
  *
  * @param target an `Element` target
  */
  unobserve = (t) => {
    this.entries.has(t) && this.entries.delete(t);
  };
  /**
  * Private method responsible for all the heavy duty,
  * the observer's runtime.
  * `PositionObserver.runCallback`
  */
  _rc = () => {
    if (!this.entries.size) {
      this._t = 0;
      return;
    }
    const { clientWidth: t, clientHeight: e } = this._r, i = new Promise((s) => {
      const r = [];
      this.entries.forEach(({ target: h, boundingClientRect: c, isIntersecting: a }) => {
        this._r.contains(h) && this._n(h).then((n) => {
          if (!n.isIntersecting) {
            if (this._cm === 1) return;
            if (this._cm === 2) {
              a && (this.entries.set(h, n), r.push(n));
              return;
            }
          }
          const { left: f, top: u } = n.boundingClientRect;
          (c.top !== u || c.left !== f || this._w !== t || this._h !== e) && (this.entries.set(h, n), r.push(n));
        });
      }), this._w = t, this._h = e, s(r);
    });
    this._t = requestAnimationFrame(async () => {
      const s = await i;
      s.length && this._c(s, this), this._rc();
    });
  };
  /**
  * Check intersection status and resolve it
  * right away.
  *
  * `PositionObserver.newEntryForTarget`
  *
  * @param target an `Element` target
  */
  _n = (t) => new Promise((e) => {
    new IntersectionObserver(([s], r) => {
      r.disconnect(), e(s);
    }, {
      threshold: this._th,
      rootMargin: this._rm
    }).observe(t);
  });
  /**
  * Find the entry for a given target.
  *
  * @param target an `HTMLElement` target
  */
  getEntry = (t) => this.entries.get(t);
  /**
  * Immediately stop observing all elements.
  */
  disconnect = () => {
    cancelAnimationFrame(this._t), this.entries.clear(), this._t = 0;
  };
};
export {
  v as P
};
//# sourceMappingURL=index-K6w9MeGG.mjs.map
