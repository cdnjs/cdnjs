const f = (e) => e != null && typeof e == "object" || !1, k = (e) => f(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, h = (e) => k(e) && e.nodeType === 1 || !1, w = (e) => typeof e == "function" || !1, g = "1.0.2", a = "PositionObserver Error";
class p {
  entries;
  static version = g;
  _tick;
  _root;
  _callback;
  /**
   * The constructor takes two arguments, a `callback`, which is called
   * whenever the position of an observed element changes and an `options` object.
   * The callback function should take an array of `PositionObserverEntry` objects
   * as its only argument, but it's not required.
   *
   * @param callback the callback that applies to all targets of this observer
   * @param options the options of this observer
   */
  constructor(t, n) {
    if (!w(t))
      throw new Error(`${a}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = h(n?.root) ? n.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!h(t))
      throw new Error(
        `${a}: ${t} is not an instance of Element.`
      );
    this._root.contains(t) && this._new(t).then((n) => {
      n && !this.getEntry(t) && this.entries.set(t, n), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
    });
  };
  /**
   * Stop observing the position of the specified element.
   *
   * @param target an `HTMLElement` target
   */
  unobserve = (t) => {
    this.entries.has(t) && this.entries.delete(t);
  };
  /**
   * Private method responsible for all the heavy duty,
   * the observer's runtime.
   */
  _runCallback = () => {
    if (!this.entries.size) return;
    const t = new Promise((n) => {
      const s = [];
      this.entries.forEach(
        ({ target: i, boundingClientRect: o }) => {
          this._root.contains(i) && this._new(i).then(({ boundingClientRect: r, isIntersecting: l }) => {
            if (!l) return;
            const { left: _, top: b, bottom: u, right: m } = r;
            if (o.top !== b || o.left !== _ || o.right !== m || o.bottom !== u) {
              const c = { target: i, boundingClientRect: r };
              this.entries.set(i, c), s.push(c);
            }
          });
        }
      ), n(s);
    });
    this._tick = requestAnimationFrame(async () => {
      const n = await t;
      n.length && this._callback(n, this), this._runCallback();
    });
  };
  /**
   * Calculate the target bounding box and determine
   * the value of `isVisible`.
   *
   * @param target an `Element` target
   */
  _new = (t) => new Promise((n) => {
    new IntersectionObserver(
      ([s], i) => {
        i.disconnect(), n(s);
      }
    ).observe(t);
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
    cancelAnimationFrame(this._tick), this.entries.clear(), this._tick = 0;
  };
}
export {
  p as v
};
//# sourceMappingURL=index-DXF8ibvt.mjs.map
