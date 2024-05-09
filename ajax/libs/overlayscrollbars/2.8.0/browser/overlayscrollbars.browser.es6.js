/*!
 * OverlayScrollbars
 * Version: 2.8.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(t) {
  "use strict";
  const createCache = (t, n) => {
    const {o: o, i: s, u: e} = t;
    let c = o;
    let r;
    const cacheUpdateContextual = (t, n) => {
      const o = c;
      const l = t;
      const i = n || (s ? !s(o, l) : o !== l);
      if (i || e) {
        c = l;
        r = o;
      }
      return [ c, i, r ];
    };
    const cacheUpdateIsolated = t => cacheUpdateContextual(n(c, r), t);
    const getCurrentCache = t => [ c, !!t, r ];
    return [ n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache ];
  };
  const n = typeof window !== "undefined" && typeof document !== "undefined";
  const o = n ? window : {};
  const s = Math.max;
  const e = Math.min;
  const c = Math.round;
  const r = Math.abs;
  const l = Math.sign;
  const i = o.cancelAnimationFrame;
  const a = o.requestAnimationFrame;
  const u = o.setTimeout;
  const d = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const _ = getApi("MutationObserver");
  const f = getApi("IntersectionObserver");
  const p = getApi("ResizeObserver");
  const v = getApi("ScrollTimeline");
  const h = n && Node.ELEMENT_NODE;
  const {toString: g, hasOwnProperty: b} = Object.prototype;
  const w = /^\[object (.+)\]$/;
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
  const type = t => isUndefined(t) || isNull(t) ? `${t}` : g.call(t).replace(w, "$1").toLowerCase();
  const isNumber = t => typeof t === "number";
  const isString = t => typeof t === "string";
  const isBoolean = t => typeof t === "boolean";
  const isFunction = t => typeof t === "function";
  const isArray = t => Array.isArray(t);
  const isObject = t => typeof t === "object" && !isArray(t) && !isNull(t);
  const isArrayLike = t => {
    const n = !!t && t.length;
    const o = isNumber(n) && n > -1 && n % 1 == 0;
    return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
  };
  const isPlainObject = t => {
    if (!t || !isObject(t) || type(t) !== "object") {
      return false;
    }
    let n;
    const o = "constructor";
    const s = t[o];
    const e = s && s.prototype;
    const c = b.call(t, o);
    const r = e && b.call(e, "isPrototypeOf");
    if (s && !c && !r) {
      return false;
    }
    for (n in t) {}
    return isUndefined(n) || b.call(t, n);
  };
  const isHTMLElement = t => {
    const n = HTMLElement;
    return t ? n ? t instanceof n : t.nodeType === h : false;
  };
  const isElement = t => {
    const n = Element;
    return t ? n ? t instanceof n : t.nodeType === h : false;
  };
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, e, c) => {
    let r = 0;
    const l = animationCurrentTime();
    const u = s(0, o);
    const frame = o => {
      const i = animationCurrentTime();
      const d = i - l;
      const _ = d >= u;
      const f = o ? 1 : 1 - (s(0, l + u - i) / u || 0);
      const p = (n - t) * (isFunction(c) ? c(f, f * u, 0, 1, u) : f) + t;
      const v = _ || f === 1;
      e && e(p, f, v);
      r = v ? 0 : a((() => frame()));
    };
    frame();
    return t => {
      i(r);
      t && frame(t);
    };
  };
  function each(t, n) {
    if (isArrayLike(t)) {
      for (let o = 0; o < t.length; o++) {
        if (n(t[o], o, t) === false) {
          break;
        }
      }
    } else if (t) {
      each(Object.keys(t), (o => n(t[o], o, t)));
    }
    return t;
  }
  const inArray = (t, n) => t.indexOf(n) >= 0;
  const concat = (t, n) => t.concat(n);
  const push = (t, n, o) => {
    !o && !isString(n) && isArrayLike(n) ? Array.prototype.push.apply(t, n) : t.push(n);
    return t;
  };
  const from = t => Array.from(t || []);
  const createOrKeepArray = t => isArray(t) ? t : [ t ];
  const isEmptyArray = t => !!t && !t.length;
  const deduplicateArray = t => from(new Set(t));
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t && t.apply(void 0, n || []);
    each(t, runFn);
    !o && (t.length = 0);
  };
  const y = "paddingTop";
  const S = "paddingRight";
  const m = "paddingLeft";
  const O = "paddingBottom";
  const $ = "marginLeft";
  const C = "marginRight";
  const x = "marginBottom";
  const H = "overflowX";
  const E = "overflowY";
  const z = "width";
  const A = "height";
  const I = "visible";
  const T = "hidden";
  const D = "scroll";
  const capitalizeFirstLetter = t => {
    const n = String(t || "");
    return n ? n[0].toUpperCase() + n.slice(1) : "";
  };
  const equal = (t, n, o, s) => {
    if (t && n) {
      let e = true;
      each(o, (o => {
        const c = s ? s(t[o]) : t[o];
        const r = s ? s(n[o]) : n[o];
        if (c !== r) {
          e = false;
        }
      }));
      return e;
    }
    return false;
  };
  const equalWH = (t, n) => equal(t, n, [ "w", "h" ]);
  const equalXY = (t, n) => equal(t, n, [ "x", "y" ]);
  const equalTRBL = (t, n) => equal(t, n, [ "t", "r", "b", "l" ]);
  const noop = () => {};
  const bind = (t, ...n) => t.bind(0, ...n);
  const selfClearTimeout = t => {
    let n;
    const o = t ? u : a;
    const s = t ? d : i;
    return [ e => {
      s(n);
      n = o(e, isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const debounce = (t, n) => {
    let o;
    let s;
    let e;
    let c = noop;
    const {_: r, p: l, v: _} = n || {};
    const f = function invokeFunctionToDebounce(n) {
      c();
      d(o);
      o = s = void 0;
      c = noop;
      t.apply(this, n);
    };
    const mergeParms = t => _ && s ? _(s, t) : t;
    const flush = () => {
      if (c !== noop) {
        f(mergeParms(e) || e);
      }
    };
    const p = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(r) ? r() : r;
      const _ = isNumber(n) && n >= 0;
      if (_) {
        const r = isFunction(l) ? l() : l;
        const _ = isNumber(r) && r >= 0;
        const p = n > 0 ? u : a;
        const v = n > 0 ? d : i;
        const h = mergeParms(t);
        const g = h || t;
        const b = f.bind(0, g);
        c();
        const w = p(b, n);
        c = () => v(w);
        if (_ && !o) {
          o = u(flush, r);
        }
        s = e = g;
      } else {
        f(t);
      }
    };
    p.S = flush;
    return p;
  };
  const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
  const keys = t => t ? Object.keys(t) : [];
  const assignDeep = (t, n, o, s, e, c, r) => {
    const l = [ n, o, s, e, c, r ];
    if ((typeof t !== "object" || isNull(t)) && !isFunction(t)) {
      t = {};
    }
    each(l, (n => {
      each(n, ((o, s) => {
        const e = n[s];
        if (t === e) {
          return true;
        }
        const c = isArray(e);
        if (e && isPlainObject(e)) {
          const n = t[s];
          let o = n;
          if (c && !isArray(n)) {
            o = [];
          } else if (!c && !isPlainObject(n)) {
            o = {};
          }
          t[s] = assignDeep(o, e);
        } else {
          t[s] = c ? e.slice() : e;
        }
      }));
    }));
    return t;
  };
  const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, o, s) => {
    if (t === void 0) {
      delete s[o];
    } else if (n && t && isPlainObject(t)) {
      s[o] = removeUndefinedProperties(t, n);
    }
  }));
  const isEmptyObject = t => {
    for (const n in t) {
      return false;
    }
    return true;
  };
  const capNumber = (t, n, o) => s(t, e(n, o));
  const getDomTokensArray = t => from(new Set((isArray(t) ? t : (t || "").split(" ")).filter((t => t))));
  const getAttr = (t, n) => t && t.getAttribute(n);
  const hasAttr = (t, n) => t && t.hasAttribute(n);
  const setAttrs = (t, n, o) => {
    each(getDomTokensArray(n), (n => {
      t && t.setAttribute(n, String(o || ""));
    }));
  };
  const removeAttrs = (t, n) => {
    each(getDomTokensArray(n), (n => t && t.removeAttribute(n)));
  };
  const domTokenListAttr = (t, n) => {
    const o = getDomTokensArray(getAttr(t, n));
    const s = bind(setAttrs, t, n);
    const domTokenListOperation = (t, n) => {
      const s = new Set(o);
      each(getDomTokensArray(t), (t => {
        s[n](t);
      }));
      return from(s).join(" ");
    };
    return {
      m: t => s(domTokenListOperation(t, "delete")),
      O: t => s(domTokenListOperation(t, "add")),
      $: t => {
        const n = getDomTokensArray(t);
        return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
      }
    };
  };
  const removeAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).m(o);
    return bind(addAttrClass, t, n, o);
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).O(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).$(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).m(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).O(n);
    return bind(removeClass, t, n);
  };
  const find = (t, n) => {
    const o = [];
    const s = n ? isElement(n) && n : document;
    return s ? push(o, s.querySelectorAll(t)) : o;
  };
  const findFirst = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o ? o.querySelector(t) : null;
  };
  const is = (t, n) => {
    if (isElement(t)) {
      return t.matches(n);
    }
    return false;
  };
  const isBodyElement = t => is(t, "body");
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => isElement(t) && t.closest(n);
  const getFocusedElement = t => (t || document).activeElement;
  const liesBetween = (t, n, o) => {
    const s = closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
  };
  const removeElements = t => {
    if (isArrayLike(t)) {
      each(from(t), (t => removeElements(t)));
    } else if (t) {
      const n = parent(t);
      n && n.removeChild(t);
    }
  };
  const before = (t, n, o) => {
    if (o && t) {
      let s = n;
      let e;
      if (isArrayLike(o)) {
        e = document.createDocumentFragment();
        each(o, (t => {
          if (t === s) {
            s = t.previousSibling;
          }
          e.appendChild(t);
        }));
      } else {
        e = o;
      }
      if (n) {
        if (!s) {
          s = t.firstChild;
        } else if (s !== n) {
          s = s.nextSibling;
        }
      }
      t.insertBefore(e, s || null);
      return () => removeElements(o);
    }
    return noop;
  };
  const appendChildren = (t, n) => before(t, null, n);
  const insertAfter = (t, n) => before(parent(t), t && t.nextSibling, n);
  const createDiv = t => {
    const n = document.createElement("div");
    setAttrs(n, "class", t);
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    n.innerHTML = t.trim();
    return each(contents(n), (t => removeElements(t)));
  };
  const k = /^--/;
  const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
  const validFiniteNumber = t => {
    const n = t || 0;
    return isFinite(n) ? n : 0;
  };
  const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));
  const ratioToCssPercent = t => `${(validFiniteNumber(t) * 100).toFixed(3)}%`;
  const numberToCssPx = t => `${validFiniteNumber(t)}px`;
  function setStyles(t, n) {
    t && n && each(n, ((n, o) => {
      try {
        const s = t.style;
        const e = isNumber(n) ? numberToCssPx(n) : (n || "") + "";
        if (k.test(o)) {
          s.setProperty(o, e);
        } else {
          s[o] = e;
        }
      } catch (s) {}
    }));
  }
  function getStyles(t, n, s) {
    const e = isString(n);
    let c = e ? "" : {};
    if (t) {
      const r = o.getComputedStyle(t, s) || t.style;
      c = e ? getCSSVal(r, n) : from(n).reduce(((t, n) => {
        t[n] = getCSSVal(r, n);
        return t;
      }), c);
    }
    return c;
  }
  const topRightBottomLeft = (t, n, o) => {
    const s = n ? `${n}-` : "";
    const e = o ? `-${o}` : "";
    const c = `${s}top${e}`;
    const r = `${s}right${e}`;
    const l = `${s}bottom${e}`;
    const i = `${s}left${e}`;
    const a = getStyles(t, [ c, r, l, i ]);
    return {
      t: parseToZeroOrNumber(a[c]),
      r: parseToZeroOrNumber(a[r]),
      b: parseToZeroOrNumber(a[l]),
      l: parseToZeroOrNumber(a[i])
    };
  };
  const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;
  const elementHasDimensions = t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  const M = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : M;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const R = bind(getElmWidthHeightProperty, "offset");
  const V = bind(getElmWidthHeightProperty, "client");
  const L = bind(getElmWidthHeightProperty, "scroll");
  const getFractionalSize = t => {
    const n = parseFloat(getStyles(t, z)) || 0;
    const o = parseFloat(getStyles(t, A)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[A] || t[z]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  const removeEventListener = (t, n, o, s) => {
    each(getDomTokensArray(n), (n => {
      t && t.removeEventListener(n, o, s);
    }));
  };
  const addEventListener = (t, n, o, s) => {
    var e;
    const c = (e = s && s.C) != null ? e : true;
    const r = s && s.H || false;
    const l = s && s.A || false;
    const i = {
      passive: c,
      capture: r
    };
    return bind(runEachAndClear, getDomTokensArray(n).map((n => {
      const s = l ? e => {
        removeEventListener(t, n, s, r);
        o && o(e);
      } : o;
      t && t.addEventListener(n, s, i);
      return bind(removeEventListener, t, n, s, r);
    })));
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const stopAndPrevent = t => stopPropagation(t) || preventDefault(t);
  const scrollElementTo = (t, n) => {
    const {x: o, y: s} = isNumber(n) ? {
      x: n,
      y: n
    } : n || {};
    isNumber(o) && (t.scrollLeft = o);
    isNumber(s) && (t.scrollTop = s);
  };
  const getElementScroll = t => ({
    x: t.scrollLeft,
    y: t.scrollTop
  });
  const getZeroScrollCoordinates = () => ({
    I: {
      x: 0,
      y: 0
    },
    T: {
      x: 0,
      y: 0
    }
  });
  const sanatizeScrollCoordinates = (t, n) => {
    const {I: o, T: s} = t;
    const {w: e, h: c} = n;
    const sanitizeAxis = (t, n, o) => {
      let s = l(t) * o;
      let e = l(n) * o;
      if (s === e) {
        const o = r(t);
        const c = r(n);
        e = o > c ? 0 : e;
        s = o < c ? 0 : s;
      }
      return [ s + 0, e + 0 ];
    };
    const [i, a] = sanitizeAxis(o.x, s.x, e);
    const [u, d] = sanitizeAxis(o.y, s.y, c);
    return {
      I: {
        x: i,
        y: u
      },
      T: {
        x: a,
        y: d
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({I: t, T: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({I: t, T: n}, o) => {
    const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
    return {
      x: getAxis(t.x, n.x, o.x),
      y: getAxis(t.y, n.y, o.y)
    };
  };
  const manageListener = (t, n) => {
    each(createOrKeepArray(n), t);
  };
  const createEventListenerHub = t => {
    const n = new Map;
    const removeEvent = (t, o) => {
      if (t) {
        const s = n.get(t);
        manageListener((t => {
          if (s) {
            s[t ? "delete" : "clear"](t);
          }
        }), o);
      } else {
        n.forEach((t => {
          t.clear();
        }));
        n.clear();
      }
    };
    const addEvent = (t, o) => {
      if (isString(t)) {
        const s = n.get(t) || new Set;
        n.set(t, s);
        manageListener((t => {
          isFunction(t) && s.add(t);
        }), o);
        return bind(removeEvent, t, o);
      }
      if (isBoolean(o) && o) {
        removeEvent();
      }
      const s = keys(t);
      const e = [];
      each(s, (n => {
        const o = t[n];
        o && push(e, addEvent(n, o));
      }));
      return bind(runEachAndClear, e);
    };
    const triggerEvent = (t, o) => {
      each(from(n.get(t)), (t => {
        if (o && !isEmptyArray(o)) {
          t.apply(0, o);
        } else {
          t();
        }
      }));
    };
    addEvent(t || {});
    return [ addEvent, removeEvent, triggerEvent ];
  };
  const opsStringify = t => JSON.stringify(t, ((t, n) => {
    if (isFunction(n)) {
      throw 0;
    }
    return n;
  }));
  const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const P = {
    paddingAbsolute: false,
    showNativeOverlaidScrollbars: false,
    update: {
      elementEvents: [ [ "img", "load" ] ],
      debounce: [ 0, 33 ],
      attributes: null,
      ignoreMutation: null
    },
    overflow: {
      x: "scroll",
      y: "scroll"
    },
    scrollbars: {
      theme: "os-theme-dark",
      visibility: "auto",
      autoHide: "never",
      autoHideDelay: 1300,
      autoHideSuspend: false,
      dragScroll: true,
      clickScroll: false,
      pointers: [ "mouse", "touch", "pen" ]
    }
  };
  const getOptionsDiff = (t, n) => {
    const o = {};
    const s = concat(keys(n), keys(t));
    each(s, (s => {
      const e = t[s];
      const c = n[s];
      if (isObject(e) && isObject(c)) {
        assignDeep(o[s] = {}, getOptionsDiff(e, c));
        if (isEmptyObject(o[s])) {
          delete o[s];
        }
      } else if (hasOwnProperty(n, s) && c !== e) {
        let t = true;
        if (isArray(e) || isArray(c)) {
          try {
            if (opsStringify(e) === opsStringify(c)) {
              t = false;
            }
          } catch (r) {}
        }
        if (t) {
          o[s] = c;
        }
      }
    }));
    return o;
  };
  const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || getPropByPath(n, s) !== void 0 ];
  const U = `data-overlayscrollbars`;
  const N = "os-environment";
  const j = `${N}-scrollbar-hidden`;
  const q = `${U}-initialize`;
  const F = "noClipping";
  const B = `${U}-body`;
  const X = U;
  const Y = "host";
  const W = `${U}-viewport`;
  const G = H;
  const J = E;
  const K = "arrange";
  const Q = "measuring";
  const Z = "scrollbarHidden";
  const tt = "scrollbarPressed";
  const nt = "noContent";
  const ot = `${U}-padding`;
  const st = `${U}-content`;
  const et = "os-size-observer";
  const ct = `${et}-appear`;
  const rt = `${et}-listener`;
  const lt = `${rt}-scroll`;
  const it = `${rt}-item`;
  const at = `${it}-final`;
  const ut = "os-trinsic-observer";
  const dt = "os-theme-none";
  const _t = "os-scrollbar";
  const ft = `${_t}-rtl`;
  const pt = `${_t}-horizontal`;
  const vt = `${_t}-vertical`;
  const ht = `${_t}-track`;
  const gt = `${_t}-handle`;
  const bt = `${_t}-visible`;
  const wt = `${_t}-cornerless`;
  const yt = `${_t}-interaction`;
  const St = `${_t}-unusable`;
  const mt = `${_t}-auto-hide`;
  const Ot = `${mt}-hidden`;
  const $t = `${_t}-wheel`;
  const Ct = `${ht}-interactive`;
  const xt = `${gt}-interactive`;
  let Ht;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = V(t);
      const e = R(t);
      const c = getFractionalSize(n);
      o && removeElements(t);
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, j);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const t = `.${N}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${N} div{width:200%;height:200%;margin:10px 0}.${j}{scrollbar-width:none!important}.${j}::-webkit-scrollbar,.${j}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const n = createDOM(`<div class="${N}"><div></div><style>${t}</style></div>`);
    const s = n[0];
    const e = s.firstChild;
    const [c, , r] = createEventListenerHub();
    const [l, i] = createCache({
      o: getNativeScrollbarSize(s, e),
      i: equalXY
    }, bind(getNativeScrollbarSize, s, e, true));
    const [a] = i();
    const u = getNativeScrollbarsHiding(s);
    const d = {
      x: a.x === 0,
      y: a.y === 0
    };
    const _ = {
      elements: {
        host: null,
        padding: !u,
        viewport: t => u && isBodyElement(t) && t,
        content: false
      },
      scrollbars: {
        slot: true
      },
      cancel: {
        nativeScrollbarsOverlaid: false,
        body: null
      }
    };
    const f = assignDeep({}, P);
    const p = bind(assignDeep, {}, f);
    const h = bind(assignDeep, {}, _);
    const g = {
      D: a,
      k: d,
      M: u,
      R: !!v,
      V: bind(c, "r"),
      L: h,
      P: t => assignDeep(_, t) && h(),
      U: p,
      N: t => assignDeep(f, t) && p(),
      j: assignDeep({}, _),
      q: assignDeep({}, f)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      r("r", []);
    }));
    if (isFunction(o.matchMedia) && !u && (!d.x || !d.y)) {
      const addZoomListener = t => {
        const n = o.matchMedia(`(resolution: ${o.devicePixelRatio}dppx)`);
        addEventListener(n, "change", (() => {
          t();
          addZoomListener(t);
        }), {
          A: true
        });
      };
      addZoomListener((() => {
        const [t, n] = l();
        assignDeep(g.D, t);
        r("r", [ n ]);
      }));
    }
    return g;
  };
  const getEnvironment = () => {
    if (!Ht) {
      Ht = createEnvironment();
    }
    return Ht;
  };
  const resolveInitialization = (t, n) => isFunction(n) ? n.apply(0, t) : n;
  const staticInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return c || n.apply(0, t);
  };
  const dynamicInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return !!c && (isHTMLElement(c) ? c : n.apply(0, t));
  };
  const cancelInitialization = (t, n) => {
    const {nativeScrollbarsOverlaid: o, body: s} = n || {};
    const {k: e, M: c, L: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const d = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!d || !!_;
  };
  const Et = new WeakMap;
  const addInstance = (t, n) => {
    Et.set(t, n);
  };
  const removeInstance = t => {
    Et.delete(t);
  };
  const getInstance = t => Et.get(t);
  const createEventContentChange = (t, n, o) => {
    let s = false;
    const e = o ? new WeakMap : false;
    const destroy = () => {
      s = true;
    };
    const updateElements = c => {
      if (e && o) {
        const r = o.map((n => {
          const [o, s] = n || [];
          const e = s && o ? (c || find)(o, t) : [];
          return [ e, s ];
        }));
        each(r, (o => each(o[0], (c => {
          const r = o[1];
          const l = e.get(c) || [];
          const i = t.contains(c);
          if (i && r) {
            const t = addEventListener(c, r, (o => {
              if (s) {
                t();
                e.delete(c);
              } else {
                n(o);
              }
            }));
            e.set(c, push(l, t));
          } else {
            runEachAndClear(l);
            e.delete(c);
          }
        }))));
      }
    };
    updateElements();
    return [ destroy, updateElements ];
  };
  const createDOMObserver = (t, n, o, s) => {
    let e = false;
    const {F: c, B: r, X: l, Y: i, W: a, G: u} = s || {};
    const d = debounce((() => e && o(true)), {
      _: 33,
      p: 99
    });
    const [f, p] = createEventContentChange(t, d, l);
    const v = c || [];
    const h = r || [];
    const g = concat(v, h);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const d = [];
        const _ = [];
        let f = false;
        let v = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: p, removedNodes: g} = o;
          const b = a === "attributes";
          const w = a === "childList";
          const y = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "") || null;
          const O = S && u !== m;
          const $ = inArray(h, e) && O;
          if (n && (w || !y)) {
            const n = b && O;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, m) : !b || n;
            const f = _ && !l(o, !!a, t, s);
            each(p, (t => push(d, t)));
            each(g, (t => push(d, t)));
            v = v || f;
          }
          if (!n && y && O && !r(c, e, u, m)) {
            push(_, e);
            f = f || $;
          }
        }));
        p((t => deduplicateArray(d).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && v && o(false);
          return [ false ];
        }
        if (!isEmptyArray(_) || f) {
          const t = [ deduplicateArray(_), f ];
          !e && o.apply(0, t);
          return t;
        }
      }
    };
    const b = new _(bind(observerCallback, false));
    return [ () => {
      b.observe(t, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: g,
        subtree: n,
        childList: n,
        characterData: n
      });
      e = true;
      return () => {
        if (e) {
          f();
          b.disconnect();
          e = false;
        }
      };
    }, () => {
      if (e) {
        d.S();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  const zt = {};
  const At = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      zt[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || At)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => At[t];
  const It = "__osOptionsValidationPlugin";
  const Tt = "__osSizeObserverPlugin";
  const Dt = /* @__PURE__ */ (() => ({
    [Tt]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${it}" dir="ltr"><div class="${it}"><div class="${at}"></div></div><div class="${it}"><div class="${at}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const u = r.firstChild;
        const d = u == null ? void 0 : u.firstChild;
        let _ = R(r);
        let f = _;
        let p = false;
        let v;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          v = 0;
          if (p) {
            _ = f;
            n(t === true);
          }
        };
        const onScroll = t => {
          f = R(r);
          p = !t || !equalWH(f, _);
          if (t) {
            stopPropagation(t);
            if (p && !v) {
              i(v);
              v = a(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const h = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, lt);
        setStyles(d, {
          [z]: s,
          [A]: s
        });
        a(reset);
        return [ o ? bind(onScroll, false) : reset, h ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {k: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(I) === 0;
  const createViewportOverflowState = (t, n) => {
    const getAxisOverflowStyle = (t, n, o, s) => {
      const e = t === I ? T : t.replace(`${I}-`, "");
      const c = overflowIsVisible(t);
      const r = overflowIsVisible(o);
      if (!n && !s) {
        return T;
      }
      if (c && r) {
        return I;
      }
      if (c) {
        const t = n ? I : T;
        return n && s ? e : t;
      }
      const l = r && s ? I : T;
      return n ? e : l;
    };
    const o = {
      x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
      y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
    };
    return {
      J: o,
      K: {
        x: o.x === D,
        y: o.y === D
      }
    };
  };
  const kt = "__osScrollbarsHidingPlugin";
  const Mt = /* @__PURE__ */ (() => ({
    [kt]: {
      static: () => ({
        Z: (t, n, o, s, e) => {
          const {tt: c, nt: r} = t;
          const {M: l, k: i, D: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [d] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === D;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(H);
            const [o, s] = getStatePerAxis(E);
            return {
              J: {
                x: t,
                y: o
              },
              K: {
                x: n,
                y: s
              }
            };
          };
          const _getViewportOverflowHideOffset = t => {
            const {K: n} = t;
            const o = l || d ? 0 : 42;
            const getHideOffsetPerAxis = (t, n, s) => {
              const e = t ? o : s;
              const c = n && !l ? e : 0;
              const r = t && !!o;
              return [ c, r ];
            };
            const [s, e] = getHideOffsetPerAxis(i.x, n.x, a.x);
            const [c, r] = getHideOffsetPerAxis(i.y, n.y, a.y);
            return {
              ot: {
                x: s,
                y: c
              },
              st: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {et: o}, s) => {
            if (!c) {
              const e = assignDeep({}, {
                [C]: 0,
                [x]: 0,
                [$]: 0
              });
              const {ot: c, st: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {ct: d} = n;
              const _ = o ? $ : C;
              const f = o ? m : S;
              const p = d[_];
              const v = d[x];
              const h = d[f];
              const g = d[O];
              e[z] = `calc(100% + ${u + p * -1}px)`;
              e[_] = -u + p;
              e[x] = -a + v;
              if (s) {
                e[f] = h + (i ? u : 0);
                e[O] = g + (l ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {ct: c} = n;
              const {ot: l, st: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: d, y: _} = l;
              const {et: f} = o;
              const p = f ? S : m;
              const v = c[p];
              const h = c.paddingTop;
              const g = s.w + e.w;
              const b = s.h + e.h;
              const w = {
                w: _ && u ? `${_ + g - v}px` : "",
                h: d && a ? `${d + b - h}px` : ""
              };
              setStyles(r, {
                "--os-vaw": w.w,
                "--os-vah": w.h
              });
            }
            return u;
          };
          const _undoViewportArrange = t => {
            if (u) {
              const s = t || readViewportOverflowState();
              const {ct: e} = n;
              const {st: c} = _getViewportOverflowHideOffset(s);
              const {x: l, y: i} = c;
              const a = {};
              const assignProps = t => each(t, (t => {
                a[t] = e[t];
              }));
              if (l) {
                assignProps([ x, y, O ]);
              }
              if (i) {
                assignProps([ $, C, m, S ]);
              }
              const d = getStyles(r, keys(a));
              const _ = removeAttrClass(r, W, K);
              setStyles(r, a);
              return [ () => {
                setStyles(r, assignDeep({}, d, _hideNativeScrollbars(s, o, u)));
                _();
              }, s ];
            }
            return [ noop ];
          };
          return {
            rt: _getViewportOverflowHideOffset,
            lt: _arrangeViewport,
            it: _undoViewportArrange,
            ut: _hideNativeScrollbars
          };
        }
      })
    }
  }))();
  const Rt = "__osClickScrollPlugin";
  const Vt = /* @__PURE__ */ (() => ({
    [Rt]: {
      static: () => (t, n, o, s, e) => {
        let c = 0;
        let r = noop;
        const animateClickScroll = l => {
          r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
            t(o);
            const a = n();
            const d = a + s;
            const _ = e >= a && e <= d;
            if (i && !_) {
              if (c) {
                animateClickScroll(o);
              } else {
                const t = u((() => {
                  animateClickScroll(o);
                }), 222);
                r = () => {
                  clearTimeout(t);
                };
              }
              c++;
            }
          }));
        };
        animateClickScroll(0);
        return () => r();
      }
    }
  }))();
  const createSizeObserver = (t, n, o) => {
    const {dt: s} = o || {};
    const e = getStaticPluginModuleInstance(Tt);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${et}"><div class="${rt}"></div></div>`);
      const l = r[0];
      const i = l.firstChild;
      const onSizeChangedCallbackProxy = t => {
        const o = t instanceof ResizeObserverEntry;
        let s = false;
        let e = false;
        if (o) {
          const [n, , o] = c(t.contentRect);
          const r = domRectHasDimensions(n);
          e = domRectAppeared(n, o);
          s = !e && !r;
        } else {
          e = t === true;
        }
        if (!s) {
          n({
            _t: true,
            dt: e
          });
        }
      };
      if (p) {
        const t = new p((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(i);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (e) {
        const [t, n] = e(i, onSizeChangedCallbackProxy, s);
        push(o, concat([ addClass(l, ct), addEventListener(l, "animationstart", t) ], n));
      } else {
        return noop;
      }
      return bind(runEachAndClear, push(o, appendChildren(t, l)));
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(ut);
    const [e] = createCache({
      o: false
    });
    const triggerOnTrinsicChangedCallback = (t, o) => {
      if (t) {
        const s = e(isHeightIntrinsic(t));
        const [, c] = s;
        return c && !o && n(s) && [ s ];
      }
    };
    const intersectionObserverCallback = (t, n) => triggerOnTrinsicChangedCallback(n.pop(), t);
    return [ () => {
      const n = [];
      if (f) {
        o = new f(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = R(s);
          triggerOnTrinsicChangedCallback(t);
        };
        push(n, createSizeObserver(s, onSizeChanged)());
        onSizeChanged();
      }
      return bind(runEachAndClear, push(n, appendChildren(t, s)));
    }, () => o && intersectionObserverCallback(true, o.takeRecords()) ];
  };
  const createObserversSetup = (t, n, o, s) => {
    let e;
    let c;
    let r;
    let l;
    let i;
    let a;
    const {M: u} = getEnvironment();
    const d = `[${X}]`;
    const _ = `[${W}]`;
    const f = [ "tabindex" ];
    const v = [ "wrap", "cols", "rows" ];
    const h = [ "id", "class", "style", "open" ];
    const {ft: g, vt: b, nt: w, ht: y, gt: S, bt: m, tt: O, wt: $, yt: C} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const x = {
      St: false,
      et: getDirectionIsRTL(g)
    };
    const H = getEnvironment();
    const E = getStaticPluginModuleInstance(kt);
    const [z] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = E && E.Z(t, n, x, H, o).it;
      const e = !O && $(K);
      const c = e && getElementScroll(y);
      const r = C(Q, true);
      const l = e && s && s()[0];
      const i = L(S);
      const a = L(w);
      const u = getFractionalSize(w);
      l && l();
      scrollElementTo(y, c);
      r();
      return {
        w: a.w + i.w + u.w,
        h: a.h + i.h + u.h
      };
    }));
    const A = m ? v : concat(h, v);
    const I = debounce(s, {
      _: () => e,
      p: () => c,
      v(t, n) {
        const [o] = t;
        const [s] = n;
        return [ concat(keys(o), keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const setDirection = t => {
      const n = getDirectionIsRTL(g);
      assignDeep(t, {
        Ot: a !== n
      });
      assignDeep(x, {
        et: n
      });
      a = n;
    };
    const updateViewportAttrsFromHost = t => {
      each(t || f, (t => {
        if (inArray(f, t)) {
          const n = getAttr(b, t);
          if (isString(n)) {
            setAttrs(w, t, n);
          } else {
            removeAttrs(w, t);
          }
        }
      }));
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        $t: e
      };
      assignDeep(x, {
        St: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({_t: t, dt: n}) => {
      const o = t && !n;
      const e = !o && u ? I : s;
      const c = {
        _t: t || n,
        dt: n
      };
      setDirection(c);
      e(c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = z();
      const e = {
        Ct: o
      };
      setDirection(e);
      const c = t ? s : I;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        xt: n
      };
      setDirection(s);
      if (n && !o) {
        I(s);
      } else if (!O) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const {V: T} = H;
    const [D, k] = S ? createTrinsicObserver(b, onTrinsicChanged) : [];
    const M = !O && createSizeObserver(b, onSizeChanged, {
      dt: true
    });
    const [R, V] = createDOMObserver(b, false, onHostMutation, {
      B: h,
      F: concat(h, f)
    });
    const P = O && p && new p((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        _t: true,
        dt: domRectAppeared(n, i)
      });
      i = n;
    }));
    return [ () => {
      updateViewportAttrsFromHost();
      P && P.observe(b);
      const t = M && M();
      const n = D && D();
      const o = R();
      const s = T((t => {
        const [, n] = z();
        I({
          Ht: t,
          Ct: n
        });
      }));
      return () => {
        P && P.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({Et: t, zt: n, At: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, u] = t("update.attributes");
      const [f, p] = t("update.elementEvents");
      const [v, h] = t("update.debounce");
      const g = p || u;
      const b = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (g) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(S || w, true, onContentMutation, {
          F: concat(A, a || []),
          X: f,
          Y: d,
          G: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !O ? liesBetween(o, d, _) : false;
            return e || !!closest(o, `.${_t}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (h) {
        I.S();
        if (isArray(v)) {
          const t = v[0];
          const n = v[1];
          e = isNumber(t) && t;
          c = isNumber(n) && n;
        } else if (isNumber(v)) {
          e = v;
          c = false;
        } else {
          e = false;
          c = false;
        }
      }
      if (b) {
        const t = V();
        const n = k && k();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], b));
        n && assignDeep(s, onTrinsicChanged(n[0], b));
        o && assignDeep(s, onContentMutation(o[0], b));
      }
      setDirection(s);
      return s;
    }, x ];
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const {L: e} = getEnvironment();
    const {scrollbars: c} = e();
    const {slot: r} = c;
    const {ft: l, vt: i, nt: a, It: u, ht: d, Tt: _, tt: f} = n;
    const {scrollbars: p} = u ? {} : t;
    const {slot: h} = p || {};
    const g = new Map;
    const initScrollTimeline = t => v && new v({
      source: d,
      axis: t
    });
    const b = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const w = dynamicInitializationElement([ l, i, a ], (() => f && _ ? l : i), r, h);
    const getScrollbarHandleLengthRatio = (t, n) => {
      if (n) {
        const o = t ? z : A;
        const {Dt: s, kt: e} = n;
        const c = getBoundingClientRect(e)[o];
        const r = getBoundingClientRect(s)[o];
        return capNumber(0, 1, c / r || 0);
      }
      const s = t ? "x" : "y";
      const {Mt: e, Rt: c} = o;
      const r = c[s];
      const l = e[s];
      return capNumber(0, 1, r / (r + l) || 0);
    };
    const getScrollbarHandleOffsetRatio = (t, n, o) => {
      const s = getScrollbarHandleLengthRatio(o, t);
      return 1 / s * (1 - s) * n;
    };
    const addDirectionRTLKeyframes = t => assignDeep(t, {
      clear: [ "left" ]
    });
    const cancelElementAnimations = t => {
      g.forEach(((n, o) => {
        const s = t ? inArray(createOrKeepArray(t), o) : true;
        if (s) {
          each(n || [], (t => {
            t && t.cancel();
          }));
          g.delete(o);
        }
      }));
    };
    const setElementAnimation = (t, n, o, s) => {
      const e = g.get(t) || [];
      const c = e.find((t => t && t.timeline === n));
      if (c) {
        c.effect = new KeyframeEffect(t, o, {
          composite: s
        });
      } else {
        g.set(t, concat(e, [ t.animate(o, {
          timeline: n,
          composite: s
        }) ]));
      }
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Vt, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        setStyles(o, s);
      }));
    };
    const scrollbarStructureRefreshHandleLength = (t, n) => {
      scrollbarStyle(t, (t => {
        const {kt: o} = t;
        return [ o, {
          [n ? z : A]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n) => {
      const {Lt: s} = o;
      const e = n ? "x" : "y";
      const c = b[e];
      const r = isDefaultDirectionScrollCoordinates(s)[e];
      const getAxisTransformValue = (t, o) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, r ? o : 1 - o, n)), n);
      if (c) {
        each(t, (t => {
          const {kt: n} = t;
          setElementAnimation(n, c, addDirectionRTLKeyframes({
            transform: [ 0, 1 ].map((n => getAxisTransformValue(t, n)))
          }));
        }));
      } else {
        scrollbarStyle(t, (t => [ t.kt, {
          transform: getAxisTransformValue(t, getScrollCoordinatesPercent(s, getElementScroll(d))[e])
        } ]));
      }
    };
    const doRefreshScrollbarOffset = t => f && !_ && parent(t) === a;
    const y = [];
    const S = [];
    const m = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(S, t, n);
      c && scrollbarStructureAddRemoveClass(m, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      scrollbarStructureRefreshHandleLength(S, true);
      scrollbarStructureRefreshHandleLength(m);
    };
    const refreshScrollbarsHandleOffset = () => {
      scrollbarStructureRefreshHandleOffset(S, true);
      scrollbarStructureRefreshHandleOffset(m);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (f) {
        const {Mt: t, Lt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = .5;
        if (b.x && b.y) {
          each(concat(m, S), (({Vt: n}) => {
            if (doRefreshScrollbarOffset(n)) {
              const setScrollbarElementAnimation = o => setElementAnimation(n, b[o], addDirectionRTLKeyframes({
                transform: [ 0, s[o] ? 1 : -1 ].map((n => getTrasformTranslateValue(numberToCssPx(n * (t[o] - e)), o === "x")))
              }), "add");
              setScrollbarElementAnimation("x");
              setScrollbarElementAnimation("y");
            } else {
              cancelElementAnimations(n);
            }
          }));
        } else {
          const o = getScrollCoordinatesPercent(n, getElementScroll(d));
          const styleScrollbarPosition = n => {
            const {Vt: e} = n;
            const c = doRefreshScrollbarOffset(e) && e;
            const getTranslateValue = (t, n, o) => {
              const s = n * t;
              return numberToCssPx(o ? s : -s);
            };
            return [ c, c && {
              transform: getTrasformTranslateValue({
                x: getTranslateValue(o.x, t.x, s.x),
                y: getTranslateValue(o.y, t.y, s.y)
              })
            } ];
          };
          scrollbarStyle(S, styleScrollbarPosition);
          scrollbarStyle(m, styleScrollbarPosition);
        }
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? pt : vt;
      const o = createDiv(`${_t} ${n}`);
      const e = createDiv(ht);
      const c = createDiv(gt);
      const r = {
        Vt: o,
        Dt: e,
        kt: c
      };
      push(t ? S : m, r);
      push(y, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
      return r;
    };
    const O = bind(generateScrollbarDOM, true);
    const $ = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(w, S[0].Vt);
      appendChildren(w, m[0].Vt);
      return bind(runEachAndClear, y);
    };
    O();
    $();
    return [ {
      Pt: refreshScrollbarsHandleLength,
      Ut: refreshScrollbarsHandleOffset,
      Nt: refreshScrollbarsScrollbarOffset,
      jt: scrollbarsAddRemoveClass,
      qt: {
        R: b.x,
        Ft: S,
        Bt: O,
        Xt: bind(scrollbarStyle, S)
      },
      Yt: {
        R: b.y,
        Ft: m,
        Bt: $,
        Xt: bind(scrollbarStyle, m)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => (e, l, i, a) => {
    const {vt: d, nt: _, tt: f, ht: p, Wt: v, yt: h} = n;
    const {Vt: g, Dt: b, kt: w} = e;
    const [y, S] = selfClearTimeout(333);
    const [m, O] = selfClearTimeout(444);
    const [$, C] = selfClearTimeout();
    const x = bind(i, [ e ], a);
    const scrollOffsetElementScrollBy = t => {
      isFunction(p.scrollBy) && p.scrollBy({
        behavior: "smooth",
        left: t.x,
        top: t.y
      });
    };
    const H = a ? z : A;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const s = `client${a ? "X" : "Y"}`;
      const e = a ? "left" : "top";
      const l = a ? "w" : "h";
      const i = a ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {Mt: e} = o;
        const c = R(b)[l] - R(w)[l];
        const r = n * s / c;
        const a = r * e[i];
        scrollElementTo(p, {
          [i]: t + a
        });
      };
      return addEventListener(b, "pointerdown", (o => {
        const a = closest(o.target, `.${gt}`) === w;
        const u = a ? w : b;
        const d = t.scrollbars;
        const {button: _, isPrimary: f, pointerType: g} = o;
        const {pointers: y} = d;
        const S = _ === 0 && f && d[a ? "dragScroll" : "clickScroll"] && (y || []).includes(g);
        if (S) {
          O();
          const t = !a && o.shiftKey;
          const d = bind(getBoundingClientRect, w);
          const _ = bind(getBoundingClientRect, b);
          const getHandleOffset = (t, n) => (t || d())[e] - (n || _())[e];
          const f = c(getBoundingClientRect(p)[H]) / R(p)[l] || 1;
          const g = createRelativeHandleMove(getElementScroll(p)[i], 1 / f);
          const y = o[s];
          const S = d();
          const $ = _();
          const C = S[H];
          const x = getHandleOffset(S, $) + C / 2;
          const E = y - $[e];
          const z = a ? 0 : E - x;
          const releasePointerCapture = t => {
            runEachAndClear(I);
            u.releasePointerCapture(t.pointerId);
          };
          const addScrollbarPressedClass = () => h(tt, true);
          const A = addScrollbarPressedClass();
          const I = [ () => {
            const t = getElementScroll(p);
            A();
            const n = getElementScroll(p);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              addScrollbarPressedClass();
              scrollElementTo(p, t);
              scrollOffsetElementScrollBy(o);
              m(A);
            }
          }, addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
            C: false
          }), addEventListener(b, n, releasePointerCapture), addEventListener(b, "pointermove", (n => {
            const o = n[s] - y;
            if (a || t) {
              g(z + o);
            }
          })) ];
          u.setPointerCapture(o.pointerId);
          if (t) {
            g(z);
          } else if (!a) {
            const t = getStaticPluginModuleInstance(Rt);
            t && push(I, t(g, getHandleOffset, z, C, E));
          }
        }
      }));
    };
    let E = true;
    const isAffectingTransition = t => t.propertyName.indexOf(H) > -1;
    return bind(runEachAndClear, [ addEventListener(w, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
      l(yt, true);
    })), addEventListener(g, "pointerleave pointercancel", (() => {
      l(yt, false);
    })), !f && addEventListener(g, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, W) || hasAttr(t, X) || t === document.body) {
        u((() => {
          _.focus({
            preventScroll: true
          });
        }), 25);
      }
    })), addEventListener(g, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (E && s === 0 && parent(g) === d) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      E = false;
      l($t, true);
      y((() => {
        E = true;
        l($t);
      }));
      preventDefault(t);
    }), {
      C: false,
      H: true
    }), addEventListener(w, "transitionstart", (t => {
      if (isAffectingTransition(t)) {
        const animateHandleOffset = () => {
          x();
          $(animateHandleOffset);
        };
        animateHandleOffset();
      }
    })), addEventListener(w, "transitionend transitioncancel", (t => {
      if (isAffectingTransition(t)) {
        C();
        x();
      }
    })), addEventListener(g, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
      A: true,
      H: true,
      C: false
    }), {
      H: true
    }), createInteractiveScrollEvents(), S, O, C ]);
  };
  const createScrollbarsSetup = (t, n, o, s, e, c) => {
    let r;
    let l;
    let i;
    let a;
    let u;
    let d = noop;
    let _ = 0;
    const isHoverablePointerType = t => t.pointerType === "mouse";
    const [f, p] = selfClearTimeout();
    const [v, h] = selfClearTimeout(100);
    const [g, b] = selfClearTimeout(100);
    const [w, y] = selfClearTimeout((() => _));
    const [S, m] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {vt: O, Gt: $, Tt: C} = e;
    const {jt: x, Pt: H, Ut: E, Nt: z} = S;
    const manageScrollbarsAutoHide = (t, n) => {
      y();
      if (t) {
        x(Ot);
      } else {
        const t = bind(x, Ot, true);
        if (_ > 0 && !n) {
          w(t);
        } else {
          t();
        }
      }
    };
    const manageScrollbarsAutoHideInstantInteraction = () => {
      if (i ? !r : !a) {
        manageScrollbarsAutoHide(true);
        v((() => {
          manageScrollbarsAutoHide(false);
        }));
      }
    };
    const manageAutoHideSuspension = t => {
      x(mt, t, true);
      x(mt, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        i && manageScrollbarsAutoHide(true);
      }
    };
    const A = [ y, h, b, p, () => d(), addEventListener(O, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener(O, "pointerenter", onHostMouseEnter), addEventListener(O, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        r = false;
        i && manageScrollbarsAutoHide(false);
      }
    })), addEventListener(O, "pointermove", (t => {
      isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
    })), addEventListener($, "scroll", (t => {
      f((() => {
        E();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      z();
    })) ];
    return [ () => bind(runEachAndClear, push(A, m())), ({Et: t, At: n, Jt: e, Kt: c}) => {
      const {Qt: r, Zt: f, tn: p, nn: v} = c || {};
      const {Ot: h, dt: b} = e || {};
      const {et: w} = o;
      const {k: y} = getEnvironment();
      const {J: S, sn: m} = s;
      const [O, A] = t("showNativeOverlaidScrollbars");
      const [T, k] = t("scrollbars.theme");
      const [M, R] = t("scrollbars.visibility");
      const [V, L] = t("scrollbars.autoHide");
      const [P, U] = t("scrollbars.autoHideSuspend");
      const [N] = t("scrollbars.autoHideDelay");
      const [j, q] = t("scrollbars.dragScroll");
      const [F, B] = t("scrollbars.clickScroll");
      const [X, Y] = t("overflow");
      const W = b && !n;
      const G = m.x || m.y;
      const J = r || f || v || h || n;
      const K = p || R || Y;
      const Q = O && y.x && y.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(D) && (M === I || M === "auto" && n === D);
        x(bt, s, o);
        return s;
      };
      _ = N;
      if (W) {
        if (P && G) {
          manageAutoHideSuspension(false);
          d();
          g((() => {
            d = addEventListener($, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if (A) {
        x(dt, Q);
      }
      if (k) {
        x(u);
        x(T, true);
        u = T;
      }
      if (U && !P) {
        manageAutoHideSuspension(true);
      }
      if (L) {
        l = V === "move";
        i = V === "leave";
        a = V === "never";
        manageScrollbarsAutoHide(a, true);
      }
      if (q) {
        x(xt, j);
      }
      if (B) {
        x(Ct, F);
      }
      if (K) {
        const t = setScrollbarVisibility(X.x, S.x, true);
        const n = setScrollbarVisibility(X.y, S.y, false);
        const o = t && n;
        x(wt, !o);
      }
      if (J) {
        H();
        E();
        z();
        x(St, !m.x, true);
        x(St, !m.y, false);
        x(ft, w && !C);
      }
    }, {}, S ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {L: s, M: e} = n;
    const {elements: c} = s();
    const {host: r, padding: l, viewport: i, content: a} = c;
    const u = isHTMLElement(t);
    const d = u ? {} : t;
    const {elements: _} = d;
    const {host: f, padding: p, viewport: v, content: h} = _ || {};
    const g = u ? t : d.target;
    const b = isBodyElement(g);
    const w = is(g, "textarea");
    const y = g.ownerDocument;
    const S = y.documentElement;
    const getDocumentWindow = () => y.defaultView || o;
    const focusElm = t => {
      if (t && t.focus) {
        t.focus({
          preventScroll: true
        });
      }
    };
    const m = bind(staticInitializationElement, [ g ]);
    const O = bind(dynamicInitializationElement, [ g ]);
    const $ = bind(createDiv, "");
    const C = bind(m, $, i);
    const x = bind(O, $, a);
    const H = C(v);
    const E = H === g;
    const z = E && b;
    const A = !E && x(h);
    const I = !E && H === A;
    const T = z ? S : H;
    const D = w ? m($, r, f) : g;
    const k = z ? T : D;
    const M = !E && O($, l, p);
    const R = !I && A;
    const V = [ R, T, M, k ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const L = elementIsGenerated(T) ? g : T;
    const P = {
      ft: g,
      vt: k,
      nt: T,
      en: M,
      gt: R,
      ht: z ? S : T,
      Gt: z ? y : T,
      cn: b ? S : L,
      Wt: y,
      bt: w,
      Tt: b,
      It: u,
      tt: E,
      rn: getDocumentWindow,
      wt: t => hasAttrClass(T, W, t),
      yt: (t, n) => addRemoveAttrClass(T, W, t, n)
    };
    const {ft: U, vt: N, en: j, nt: F, gt: G} = P;
    const J = [ () => {
      removeAttrs(N, [ X, q ]);
      removeAttrs(U, q);
      if (b) {
        removeAttrs(S, [ q, X ]);
      }
    } ];
    const K = w && elementIsGenerated(N);
    let Q = w ? U : contents([ G, F, j, N, U ].find((t => t && !elementIsGenerated(t))));
    const tt = z ? U : G || F;
    const nt = bind(runEachAndClear, J);
    const appendElements = () => {
      const t = getDocumentWindow();
      const n = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const prepareWrapUnwrapFocus = t => addEventListener(t, "focusin focusout focus blur", stopPropagation, {
        H: true
      });
      const o = "tabindex";
      const s = getAttr(F, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(N, X, E ? "" : Y);
      setAttrs(j, ot, "");
      setAttrs(F, W, "");
      setAttrs(G, st, "");
      if (!E) {
        setAttrs(F, o, s || "-1");
        b && setAttrs(S, B, "");
      }
      if (K) {
        insertAfter(U, N);
        push(J, (() => {
          insertAfter(N, U);
          removeElements(N);
        }));
      }
      appendChildren(tt, Q);
      appendChildren(N, j);
      appendChildren(j || N, !E && F);
      appendChildren(F, G);
      push(J, [ c, () => {
        const t = getFocusedElement();
        const n = prepareWrapUnwrapFocus(t);
        removeAttrs(j, ot);
        removeAttrs(G, st);
        removeAttrs(F, W);
        b && removeAttrs(S, B);
        s ? setAttrs(F, o, s) : removeAttrs(F, o);
        elementIsGenerated(G) && unwrap(G);
        elementIsGenerated(F) && unwrap(F);
        elementIsGenerated(j) && unwrap(j);
        focusElm(t);
        n();
      } ]);
      if (e && !E) {
        addAttrClass(F, W, Z);
        push(J, bind(removeAttrs, F, W));
      }
      focusElm(!E && n === g && t.top === t ? F : n);
      c();
      Q = 0;
      return nt;
    };
    return [ P, appendElements, nt ];
  };
  const createTrinsicUpdateSegment = ({gt: t}) => ({Jt: n, ln: o, At: s}) => {
    const {$t: e} = n || {};
    const {St: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [A]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({vt: t, en: n, nt: o, tt: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({Et: t, Jt: l, ln: i, At: a}) => {
      let [u, d] = r(a);
      const {M: _} = getEnvironment();
      const {_t: f, Ct: p, Ot: v} = l || {};
      const {et: h} = i;
      const [g, b] = t("paddingAbsolute");
      const w = a || p;
      if (f || d || w) {
        [u, d] = c(a);
      }
      const H = !s && (b || v || d);
      if (H) {
        const t = !g || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [C]: t && !h ? -s : 0,
          [x]: t ? -c : 0,
          [$]: t && h ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? h ? -u.r : "auto" : 0,
          left: t ? h ? "auto" : -u.l : 0,
          [z]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [y]: t ? u.t : 0,
          [S]: t ? u.r : 0,
          [O]: t ? u.b : 0,
          [m]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          en: u,
          an: !t,
          ct: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        un: H
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {vt: c, en: r, nt: l, tt: i, ht: a, Tt: u, yt: d, rn: _} = t;
    const {M: f} = e;
    const p = u && i;
    const v = bind(s, 0);
    const h = [ "display", "direction", "flexDirection", "writingMode" ];
    const g = {
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const b = {
      i: equalXY,
      o: {}
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: v(t.w - n.w),
        h: v(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const measureScrollCoordinates = () => {
      const t = getElementScroll(a);
      const n = d(nt, true);
      const o = addEventListener(a, D, stopPropagation, {
        H: true
      });
      scrollElementTo(a, {
        x: 0,
        y: 0
      });
      n();
      const s = getElementScroll(a);
      const e = L(a);
      scrollElementTo(a, {
        x: e.w,
        y: e.h
      });
      const c = getElementScroll(a);
      scrollElementTo(a, {
        x: c.x - s.x < 1 && -e.w,
        y: c.y - s.y < 1 && -e.h
      });
      const r = getElementScroll(a);
      scrollElementTo(a, t);
      o();
      return {
        I: s,
        T: r
      };
    };
    const getFlowDirectionStyles = () => assignDeep({}, hasDimensions(l) ? getStyles(l, h) : {});
    const [w, y] = createCache(g, bind(getFractionalSize, l));
    const [S, m] = createCache(g, bind(L, l));
    const [O, $] = createCache(g);
    const [C] = createCache(b);
    const [x, H] = createCache(g);
    const [E] = createCache(b);
    const [z] = createCache({
      i: (t, n) => equal(t, n, h),
      o: {}
    });
    const [A, k] = createCache({
      i: (t, n) => equalXY(t.I, n.I) && equalXY(t.T, n.T),
      o: getZeroScrollCoordinates()
    });
    const M = getStaticPluginModuleInstance(kt);
    const createViewportOverflowStyleClassName = (t, n) => {
      const o = n ? G : J;
      return `${o}${capitalizeFirstLetter(t)}`;
    };
    const setViewportOverflow = t => {
      const {J: n} = t;
      each(keys(n), (t => {
        const o = t === "x";
        const s = [ I, T, D ].map((t => createViewportOverflowStyleClassName(t, o)));
        d(s.join(" "));
        d(createViewportOverflowStyleClassName(n[t], o), true);
      }));
    };
    return ({Et: o, Jt: i, ln: a, At: u}, {un: h}) => {
      const {_t: g, Ct: b, Ot: I, dt: T, Ht: D} = i || {};
      const R = M && M.Z(t, n, a, e, o);
      const {lt: L, it: P, ut: U} = R || {};
      const [N, j] = getShowNativeOverlaidScrollbars(o, e);
      const [q, B] = o("overflow");
      const Y = overflowIsVisible(q.x);
      const W = overflowIsVisible(q.y);
      const G = g || h || b || I || D || j;
      let J = y(u);
      let K = m(u);
      let Q = $(u);
      let tt = H(u);
      if (j && f) {
        d(Z, !N);
      }
      if (G) {
        const [t] = P ? P() : [];
        const [n] = J = w(u);
        const [o] = K = S(u);
        const e = V(l);
        const c = o;
        const r = e;
        t && t();
        const i = getWindowSize(_());
        const a = {
          w: v(s(o.w, c.w) + n.w),
          h: v(s(o.h, c.h) + n.h)
        };
        const d = {
          w: v((p ? i.w : r.w + v(e.w - o.w)) + n.w),
          h: v((p ? i.h : r.h + v(e.h - o.h)) + n.h)
        };
        tt = x(d);
        Q = O(getOverflowAmount(a, d), u);
      }
      const [nt, st] = tt;
      const [et, ct] = Q;
      const [rt, lt] = K;
      const [it, at] = J;
      const [ut, dt] = C({
        x: et.w > 0,
        y: et.h > 0
      });
      const _t = Y && W && (ut.x || ut.y) || Y && ut.x && !ut.y || W && ut.y && !ut.x;
      const ft = h || I || D || at || lt || st || ct || B || j || G;
      const pt = createViewportOverflowState(ut, q);
      const [vt, ht] = E(pt.J);
      const [, gt] = z(getFlowDirectionStyles(), u);
      const bt = I || T || gt || dt || u;
      const [wt, yt] = bt ? A(measureScrollCoordinates(), u) : k();
      if (ft) {
        setViewportOverflow(pt);
        if (U && L) {
          setStyles(l, U(pt, a, L(pt, rt, it)));
        }
      }
      addRemoveAttrClass(c, X, F, _t);
      addRemoveAttrClass(r, ot, F, _t);
      assignDeep(n, {
        J: vt,
        Rt: {
          x: nt.w,
          y: nt.h
        },
        Mt: {
          x: et.w,
          y: et.h
        },
        sn: ut,
        Lt: sanatizeScrollCoordinates(wt, et)
      });
      return {
        tn: ht,
        Qt: st,
        Zt: ct,
        nn: yt || ct
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      en: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      an: false,
      ct: {
        [C]: 0,
        [x]: 0,
        [$]: 0,
        [y]: 0,
        [S]: 0,
        [O]: 0,
        [m]: 0
      },
      Rt: {
        x: 0,
        y: 0
      },
      Mt: {
        x: 0,
        y: 0
      },
      J: {
        x: T,
        y: T
      },
      sn: {
        x: false,
        y: false
      },
      Lt: getZeroScrollCoordinates()
    };
    const {ft: c, ht: r, tt: l, yt: i} = n;
    const {M: a, k: u} = getEnvironment();
    const d = !a && (u.x || u.y);
    const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = d;
      const s = i(Q, true);
      const e = o && getElementScroll(r);
      each(_, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, e);
      !l && scrollElementTo(c, 0);
      s();
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s) => {
    const e = createOptionCheck(n, {});
    const [c, r, l, i, a] = createStructureSetup(t);
    const [u, d, _] = createObserversSetup(i, l, e, (t => {
      update({}, t);
    }));
    const [f, p, , v] = createScrollbarsSetup(t, n, _, l, i, s);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {dn: e, At: c, zt: l, _n: i} = t;
      const a = e || {};
      const u = !!c;
      const f = {
        Et: createOptionCheck(n, a, u),
        dn: a,
        At: u
      };
      if (i) {
        p(f);
        return false;
      }
      const v = s || d(assignDeep({}, f, {
        zt: l
      }));
      const h = r(assignDeep({}, f, {
        ln: _,
        Jt: v
      }));
      p(assignDeep({}, f, {
        Jt: v,
        Kt: h
      }));
      const g = updateHintsAreTruthy(v);
      const b = updateHintsAreTruthy(h);
      const w = g || b || !isEmptyObject(a) || u;
      w && o(t, {
        Jt: v,
        Kt: h
      });
      return w;
    };
    return [ () => {
      const {cn: t, ht: n, yt: o} = i;
      const s = o(Q, true);
      const e = getElementScroll(t);
      const r = [ u(), c(), f() ];
      scrollElementTo(n, e);
      s();
      return bind(runEachAndClear, r);
    }, update, () => ({
      fn: _,
      pn: l
    }), {
      vn: i,
      hn: v
    }, a ];
  };
  const OverlayScrollbars = (t, n, o) => {
    const {U: s} = getEnvironment();
    const e = isHTMLElement(t);
    const c = e ? t : t.target;
    const r = getInstance(c);
    if (n && !r) {
      let r = false;
      const l = [];
      const i = {};
      const validateOptions = t => {
        const n = removeUndefinedProperties(t, true);
        const o = getStaticPluginModuleInstance(It);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, d, _] = createEventListenerHub();
      const [f, p, v] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        v(t, n);
        _(t, n);
      };
      const [h, g, b, w, y] = createSetups(t, a, (({dn: t, At: n}, {Jt: o, Kt: s}) => {
        const {_t: e, Ot: c, $t: r, Ct: l, xt: i, dt: a} = o;
        const {Qt: u, Zt: d, tn: _, nn: f} = s;
        triggerEvent("updated", [ S, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!_,
            scrollCoordinatesChanged: !!f,
            contentMutation: !!l,
            hostMutation: !!i,
            appear: !!a
          },
          changedOptions: t || {},
          force: !!n
        } ]);
      }), (t => triggerEvent("scroll", [ S, t ])));
      const destroy = t => {
        removeInstance(c);
        runEachAndClear(l);
        r = true;
        triggerEvent("destroyed", [ S, t ]);
        d();
        p();
      };
      const S = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              g({
                dn: e
              });
            }
          }
          return assignDeep({}, a);
        },
        on: f,
        off: (t, n) => {
          t && n && p(t, n);
        },
        state() {
          const {fn: t, pn: n} = b();
          const {et: o} = t;
          const {Rt: s, Mt: e, J: c, sn: l, en: i, an: a, Lt: u} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            scrollCoordinates: {
              start: u.I,
              end: u.T
            },
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {ft: t, vt: n, en: o, nt: s, gt: e, ht: c, Gt: r} = w.vn;
          const {qt: l, Yt: i} = w.hn;
          const translateScrollbarStructure = t => {
            const {kt: n, Dt: o, Vt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Ft: n, Bt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  _n: true
                });
                return t;
              }
            });
          };
          return assignDeep({}, {
            target: t,
            host: n,
            padding: o || s,
            viewport: s,
            content: e || s,
            scrollOffsetElement: c,
            scrollEventElement: r,
            scrollbarHorizontal: translateScrollbarsSetupElement(l),
            scrollbarVertical: translateScrollbarsSetupElement(i)
          });
        },
        update: t => g({
          At: t,
          zt: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, S);
      registerPluginModuleInstances(zt, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(w.vn.Tt, !e && t.cancel)) {
        destroy(true);
        return S;
      }
      push(l, h());
      triggerEvent("initialized", [ S ]);
      S.update(true);
      return S;
    }
    return r;
  };
  OverlayScrollbars.plugin = t => {
    const n = isArray(t);
    const o = n ? t : [ t ];
    const s = o.map((t => registerPluginModuleInstances(t, OverlayScrollbars)[0]));
    addPlugins(o);
    return n ? s : s[0];
  };
  OverlayScrollbars.valid = t => {
    const n = t && t.elements;
    const o = isFunction(n) && n();
    return isPlainObject(o) && !!getInstance(o.target);
  };
  OverlayScrollbars.env = () => {
    const {D: t, k: n, M: o, R: s, j: e, q: c, L: r, P: l, U: i, N: a} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      scrollTimeline: s,
      staticDefaultInitialization: e,
      staticDefaultOptions: c,
      getDefaultInitialization: r,
      setDefaultInitialization: l,
      getDefaultOptions: i,
      setDefaultOptions: a
    });
  };
  t.ClickScrollPlugin = Vt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Mt;
  t.SizeObserverPlugin = Dt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
