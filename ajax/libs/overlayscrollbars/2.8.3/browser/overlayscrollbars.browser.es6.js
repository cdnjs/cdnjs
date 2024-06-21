/*!
 * OverlayScrollbars
 * Version: 2.8.3
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
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
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
    if (!t || !isObject(t)) {
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
  const w = "paddingTop";
  const y = "paddingRight";
  const m = "paddingLeft";
  const S = "paddingBottom";
  const O = "marginLeft";
  const $ = "marginRight";
  const C = "marginBottom";
  const x = "overflowX";
  const H = "overflowY";
  const E = "width";
  const z = "height";
  const I = "visible";
  const A = "hidden";
  const T = "scroll";
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
      n = o((() => e()), isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const debounce = (t, n) => {
    const {_: o, p: s, v: e, m: c} = n || {};
    let r;
    let l;
    let _;
    let f;
    let p = noop;
    const v = function invokeFunctionToDebounce(n) {
      p();
      d(r);
      f = r = l = void 0;
      p = noop;
      t.apply(this, n);
    };
    const mergeParms = t => c && l ? c(l, t) : t;
    const flush = () => {
      if (p !== noop) {
        v(mergeParms(_) || _);
      }
    };
    const h = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(o) ? o() : o;
      const c = isNumber(n) && n >= 0;
      if (c) {
        const o = isFunction(s) ? s() : s;
        const c = isNumber(o) && o >= 0;
        const h = n > 0 ? u : a;
        const g = n > 0 ? d : i;
        const b = mergeParms(t);
        const w = b || t;
        const y = v.bind(0, w);
        let m;
        p();
        if (e && !f) {
          y();
          f = true;
          m = h((() => f = void 0), n);
        } else {
          m = h(y, n);
          if (c && !r) {
            r = u(flush, o);
          }
        }
        p = () => g(m);
        l = _ = w;
      } else {
        v(t);
      }
    };
    h.S = flush;
    return h;
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
      O: t => s(domTokenListOperation(t, "delete")),
      $: t => s(domTokenListOperation(t, "add")),
      C: t => {
        const n = getDomTokensArray(t);
        return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
      }
    };
  };
  const removeAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).O(o);
    return bind(addAttrClass, t, n, o);
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).$(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).C(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).O(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).$(n);
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
  const D = /^--/;
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
        if (D.test(o)) {
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
  const k = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : k;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const M = bind(getElmWidthHeightProperty, "offset");
  const R = bind(getElmWidthHeightProperty, "client");
  const V = bind(getElmWidthHeightProperty, "scroll");
  const getFractionalSize = t => {
    const n = parseFloat(getStyles(t, E)) || 0;
    const o = parseFloat(getStyles(t, z)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[z] || t[E]));
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
    const c = (e = s && s.H) != null ? e : true;
    const r = s && s.I || false;
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
    T: {
      x: 0,
      y: 0
    },
    D: {
      x: 0,
      y: 0
    }
  });
  const sanitizeScrollCoordinates = (t, n) => {
    const {T: o, D: s} = t;
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
      s = s === e ? 0 : s;
      return [ s + 0, e + 0 ];
    };
    const [i, a] = sanitizeAxis(o.x, s.x, e);
    const [u, d] = sanitizeAxis(o.y, s.y, c);
    return {
      T: {
        x: i,
        y: u
      },
      D: {
        x: a,
        y: d
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({T: t, D: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({T: t, D: n}, o) => {
    const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
    return {
      x: getAxis(t.x, n.x, o.x),
      y: getAxis(t.y, n.y, o.y)
    };
  };
  const focusElement = t => {
    if (t && t.focus) {
      t.focus({
        preventScroll: true
      });
    }
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
  const L = {
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
  const P = `data-overlayscrollbars`;
  const U = "os-environment";
  const N = `${U}-scrollbar-hidden`;
  const q = `${P}-initialize`;
  const j = "noClipping";
  const B = `${P}-body`;
  const F = P;
  const X = "host";
  const Y = `${P}-viewport`;
  const W = x;
  const G = H;
  const J = "arrange";
  const K = "measuring";
  const Q = "scrollbarHidden";
  const Z = "scrollbarPressed";
  const tt = "noContent";
  const nt = `${P}-padding`;
  const ot = `${P}-content`;
  const st = "os-size-observer";
  const et = `${st}-appear`;
  const ct = `${st}-listener`;
  const rt = `${ct}-scroll`;
  const lt = `${ct}-item`;
  const it = `${lt}-final`;
  const at = "os-trinsic-observer";
  const ut = "os-theme-none";
  const dt = "os-scrollbar";
  const _t = `${dt}-rtl`;
  const ft = `${dt}-horizontal`;
  const pt = `${dt}-vertical`;
  const vt = `${dt}-track`;
  const ht = `${dt}-handle`;
  const gt = `${dt}-visible`;
  const bt = `${dt}-cornerless`;
  const wt = `${dt}-interaction`;
  const yt = `${dt}-unusable`;
  const mt = `${dt}-auto-hide`;
  const St = `${mt}-hidden`;
  const Ot = `${dt}-wheel`;
  const $t = `${vt}-interactive`;
  const Ct = `${ht}-interactive`;
  let xt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = R(t);
      const e = M(t);
      const c = getFractionalSize(n);
      o && removeElements(t);
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, N);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const t = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${N}{scrollbar-width:none!important}.${N}::-webkit-scrollbar,.${N}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const n = createDOM(`<div class="${U}"><div></div><style>${t}</style></div>`);
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
    const f = assignDeep({}, L);
    const p = bind(assignDeep, {}, f);
    const h = bind(assignDeep, {}, _);
    const g = {
      k: a,
      M: d,
      R: u,
      V: !!v,
      L: bind(c, "r"),
      P: h,
      U: t => assignDeep(_, t) && h(),
      N: p,
      q: t => assignDeep(f, t) && p(),
      j: assignDeep({}, _),
      B: assignDeep({}, f)
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
        assignDeep(g.k, t);
        r("r", [ n ]);
      }));
    }
    return g;
  };
  const getEnvironment = () => {
    if (!xt) {
      xt = createEnvironment();
    }
    return xt;
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
    const {M: e, R: c, P: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const d = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!d || !!_;
  };
  const Ht = new WeakMap;
  const addInstance = (t, n) => {
    Ht.set(t, n);
  };
  const removeInstance = t => {
    Ht.delete(t);
  };
  const getInstance = t => Ht.get(t);
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
    const {F: c, X: r, Y: l, W: i, G: a, J: u} = s || {};
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
          const m = b && e;
          const S = m && getAttr(c, e || "");
          const O = isString(S) ? S : null;
          const $ = m && u !== O;
          const C = inArray(h, e) && $;
          if (n && (w || !y)) {
            const n = b && $;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, O) : !b || n;
            const f = _ && !l(o, !!a, t, s);
            each(p, (t => push(d, t)));
            each(g, (t => push(d, t)));
            v = v || f;
          }
          if (!n && y && $ && !r(c, e, u, O)) {
            push(_, e);
            f = f || C;
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
  const Et = {};
  const zt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      Et[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || zt)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => zt[t];
  const It = "__osOptionsValidationPlugin";
  const At = "__osSizeObserverPlugin";
  const Tt = /* @__PURE__ */ (() => ({
    [At]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${lt}" dir="ltr"><div class="${lt}"><div class="${it}"></div></div><div class="${lt}"><div class="${it}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const u = r.firstChild;
        const d = u == null ? void 0 : u.firstChild;
        let _ = M(r);
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
          f = M(r);
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
        addClass(t, rt);
        setStyles(d, {
          [E]: s,
          [z]: s
        });
        a(reset);
        return [ o ? bind(onScroll, false) : reset, h ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {M: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(I) === 0;
  const createViewportOverflowState = (t, n) => {
    const getAxisOverflowStyle = (t, n, o, s) => {
      const e = t === I ? A : t.replace(`${I}-`, "");
      const c = overflowIsVisible(t);
      const r = overflowIsVisible(o);
      if (!n && !s) {
        return A;
      }
      if (c && r) {
        return I;
      }
      if (c) {
        const t = n ? I : A;
        return n && s ? e : t;
      }
      const l = r && s ? I : A;
      return n ? e : l;
    };
    const o = {
      x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
      y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
    };
    return {
      K: o,
      Z: {
        x: o.x === T,
        y: o.y === T
      }
    };
  };
  const Dt = "__osScrollbarsHidingPlugin";
  const kt = /* @__PURE__ */ (() => ({
    [Dt]: {
      static: () => ({
        tt: (t, n, o, s, e) => {
          const {nt: c, ot: r} = t;
          const {R: l, M: i, k: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [d] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === T;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(x);
            const [o, s] = getStatePerAxis(H);
            return {
              K: {
                x: t,
                y: o
              },
              Z: {
                x: n,
                y: s
              }
            };
          };
          const _getViewportOverflowHideOffset = t => {
            const {Z: n} = t;
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
              st: {
                x: s,
                y: c
              },
              et: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {ct: o}, s) => {
            if (!c) {
              const e = assignDeep({}, {
                [$]: 0,
                [C]: 0,
                [O]: 0
              });
              const {st: c, et: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {rt: d} = n;
              const _ = o ? O : $;
              const f = o ? m : y;
              const p = d[_];
              const v = d[C];
              const h = d[f];
              const g = d[S];
              e[E] = `calc(100% + ${u + p * -1}px)`;
              e[_] = -u + p;
              e[C] = -a + v;
              if (s) {
                e[f] = h + (i ? u : 0);
                e[S] = g + (l ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {rt: c} = n;
              const {st: l, et: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: d, y: _} = l;
              const {ct: f} = o;
              const p = f ? y : m;
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
              const {rt: e} = n;
              const {et: c} = _getViewportOverflowHideOffset(s);
              const {x: l, y: i} = c;
              const a = {};
              const assignProps = t => each(t, (t => {
                a[t] = e[t];
              }));
              if (l) {
                assignProps([ C, w, S ]);
              }
              if (i) {
                assignProps([ O, $, m, y ]);
              }
              const d = getStyles(r, keys(a));
              const _ = removeAttrClass(r, Y, J);
              setStyles(r, a);
              return [ () => {
                setStyles(r, assignDeep({}, d, _hideNativeScrollbars(s, o, u)));
                _();
              }, s ];
            }
            return [ noop ];
          };
          return {
            lt: _getViewportOverflowHideOffset,
            it: _arrangeViewport,
            ut: _undoViewportArrange,
            dt: _hideNativeScrollbars
          };
        }
      })
    }
  }))();
  const Mt = "__osClickScrollPlugin";
  const Rt = /* @__PURE__ */ (() => ({
    [Mt]: {
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
    const {_t: s} = o || {};
    const e = getStaticPluginModuleInstance(At);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${st}"><div class="${ct}"></div></div>`);
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
            ft: true,
            _t: e
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
        push(o, concat([ addClass(l, et), addEventListener(l, "animationstart", t) ], n));
      } else {
        return noop;
      }
      return bind(runEachAndClear, push(o, appendChildren(t, l)));
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(at);
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
          const t = M(s);
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
    const u = `[${F}]`;
    const d = `[${Y}]`;
    const _ = [];
    const f = [ "wrap", "cols", "rows" ];
    const v = [ "id", "class", "style", "open" ];
    const {vt: h, ht: g, ot: b, gt: w, bt: y, wt: m, nt: S, yt: O, St: $, Ot: C} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const x = {
      $t: false,
      ct: getDirectionIsRTL(h)
    };
    const H = getEnvironment();
    const E = getStaticPluginModuleInstance(Dt);
    const [z] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = E && E.tt(t, n, x, H, o).ut;
      const e = O && S;
      const c = !e && hasAttrClass(g, F, j);
      const r = !S && $(J);
      const l = r && getElementScroll(w);
      const i = C(K, c);
      const a = r && s && s()[0];
      const u = V(b);
      const d = getFractionalSize(b);
      a && a();
      scrollElementTo(w, l);
      c && i();
      return {
        w: u.w + d.w,
        h: u.h + d.h
      };
    }));
    const I = m ? f : concat(v, f);
    const A = debounce(s, {
      _: () => e,
      p: () => c,
      m(t, n) {
        const [o] = t;
        const [s] = n;
        return [ concat(keys(o), keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const setDirection = t => {
      const n = getDirectionIsRTL(h);
      assignDeep(t, {
        Ct: a !== n
      });
      assignDeep(x, {
        ct: n
      });
      a = n;
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        xt: e
      };
      assignDeep(x, {
        $t: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({ft: t, _t: n}) => {
      const o = t && !n;
      const e = !o && H.R ? A : s;
      const c = {
        ft: t || n,
        _t: n
      };
      setDirection(c);
      e(c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = z();
      const e = {
        Ht: o
      };
      setDirection(e);
      const c = t ? s : A;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Et: n
      };
      setDirection(s);
      if (n && !o) {
        A(s);
      }
      return s;
    };
    const [T, D] = y ? createTrinsicObserver(g, onTrinsicChanged) : [];
    const k = !S && createSizeObserver(g, onSizeChanged, {
      _t: true
    });
    const [M, R] = createDOMObserver(g, false, onHostMutation, {
      X: v,
      F: concat(v, _)
    });
    const L = S && p && new p((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ft: true,
        _t: domRectAppeared(n, i)
      });
      i = n;
    }));
    const P = debounce((() => {
      const [, t] = z();
      s({
        Ht: t
      });
    }), {
      _: 222,
      v: true
    });
    return [ () => {
      L && L.observe(g);
      const t = k && k();
      const n = T && T();
      const o = M();
      const s = H.L((t => {
        if (t) {
          A({
            zt: t
          });
        } else {
          P();
        }
      }));
      return () => {
        L && L.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({It: t, At: n, Tt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, _] = t("update.attributes");
      const [f, p] = t("update.elementEvents");
      const [v, h] = t("update.debounce");
      const g = p || _;
      const w = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (g) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(y || b, true, onContentMutation, {
          F: concat(I, a || []),
          Y: f,
          W: u,
          J: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !S ? liesBetween(o, u, d) : false;
            return e || !!closest(o, `.${dt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (h) {
        A.S();
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
      if (w) {
        const t = R();
        const n = D && D();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], w));
        n && assignDeep(s, onTrinsicChanged(n[0], w));
        o && assignDeep(s, onContentMutation(o[0], w));
      }
      setDirection(s);
      return s;
    }, x ];
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const {P: e} = getEnvironment();
    const {scrollbars: c} = e();
    const {slot: r} = c;
    const {vt: l, ht: i, ot: a, Dt: u, gt: d, yt: _, nt: f} = n;
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
        const o = t ? E : z;
        const {kt: s, Mt: e} = n;
        const c = getBoundingClientRect(e)[o];
        const r = getBoundingClientRect(s)[o];
        return capNumber(0, 1, c / r || 0);
      }
      const s = t ? "x" : "y";
      const {Rt: e, Vt: c} = o;
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
        s(t.Lt, n);
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
        const {Mt: o} = t;
        return [ o, {
          [n ? E : z]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n) => {
      const {Pt: s} = o;
      const e = n ? "x" : "y";
      const c = b[e];
      const r = isDefaultDirectionScrollCoordinates(s)[e];
      const getAxisTransformValue = (t, o) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, r ? o : 1 - o, n)), n);
      if (c) {
        each(t, (t => {
          const {Mt: n} = t;
          setElementAnimation(n, c, addDirectionRTLKeyframes({
            transform: [ 0, 1 ].map((n => getAxisTransformValue(t, n)))
          }));
        }));
      } else {
        scrollbarStyle(t, (t => [ t.Mt, {
          transform: getAxisTransformValue(t, getScrollCoordinatesPercent(s, getElementScroll(d))[e])
        } ]));
      }
    };
    const doRefreshScrollbarOffset = t => f && !_ && parent(t) === a;
    const y = [];
    const m = [];
    const S = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(m, t, n);
      c && scrollbarStructureAddRemoveClass(S, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      scrollbarStructureRefreshHandleLength(m, true);
      scrollbarStructureRefreshHandleLength(S);
    };
    const refreshScrollbarsHandleOffset = () => {
      scrollbarStructureRefreshHandleOffset(m, true);
      scrollbarStructureRefreshHandleOffset(S);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (f) {
        const {Rt: t, Pt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = .5;
        if (b.x && b.y) {
          each(concat(S, m), (({Lt: n}) => {
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
            const {Lt: e} = n;
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
          scrollbarStyle(m, styleScrollbarPosition);
          scrollbarStyle(S, styleScrollbarPosition);
        }
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? ft : pt;
      const o = createDiv(`${dt} ${n}`);
      const e = createDiv(vt);
      const c = createDiv(ht);
      const r = {
        Lt: o,
        kt: e,
        Mt: c
      };
      push(t ? m : S, r);
      push(y, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
      return r;
    };
    const O = bind(generateScrollbarDOM, true);
    const $ = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(w, m[0].Lt);
      appendChildren(w, S[0].Lt);
      return bind(runEachAndClear, y);
    };
    O();
    $();
    return [ {
      Ut: refreshScrollbarsHandleLength,
      Nt: refreshScrollbarsHandleOffset,
      qt: refreshScrollbarsScrollbarOffset,
      jt: scrollbarsAddRemoveClass,
      Bt: {
        V: b.x,
        Ft: m,
        Xt: O,
        Yt: bind(scrollbarStyle, m)
      },
      Wt: {
        V: b.y,
        Ft: S,
        Xt: $,
        Yt: bind(scrollbarStyle, S)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => (e, l, i, a) => {
    const {ht: d, ot: _, nt: f, gt: p, Gt: v, Ot: h} = n;
    const {Lt: g, kt: b, Mt: w} = e;
    const [y, m] = selfClearTimeout(333);
    const [S, O] = selfClearTimeout(444);
    const [$, C] = selfClearTimeout();
    const x = bind(i, [ e ], a);
    const scrollOffsetElementScrollBy = t => {
      isFunction(p.scrollBy) && p.scrollBy({
        behavior: "smooth",
        left: t.x,
        top: t.y
      });
    };
    const H = a ? E : z;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const s = `client${a ? "X" : "Y"}`;
      const e = a ? "left" : "top";
      const l = a ? "w" : "h";
      const i = a ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {Rt: e} = o;
        const c = M(b)[l] - M(w)[l];
        const r = n * s / c;
        const a = r * e[i];
        scrollElementTo(p, {
          [i]: t + a
        });
      };
      return addEventListener(b, "pointerdown", (o => {
        const a = closest(o.target, `.${ht}`) === w;
        const u = a ? w : b;
        const d = t.scrollbars;
        const {button: _, isPrimary: f, pointerType: g} = o;
        const {pointers: y} = d;
        const m = _ === 0 && f && d[a ? "dragScroll" : "clickScroll"] && (y || []).includes(g);
        if (m) {
          O();
          const t = !a && o.shiftKey;
          const d = bind(getBoundingClientRect, w);
          const _ = bind(getBoundingClientRect, b);
          const getHandleOffset = (t, n) => (t || d())[e] - (n || _())[e];
          const f = c(getBoundingClientRect(p)[H]) / M(p)[l] || 1;
          const g = createRelativeHandleMove(getElementScroll(p)[i], 1 / f);
          const y = o[s];
          const m = d();
          const $ = _();
          const C = m[H];
          const x = getHandleOffset(m, $) + C / 2;
          const E = y - $[e];
          const z = a ? 0 : E - x;
          const releasePointerCapture = t => {
            runEachAndClear(A);
            u.releasePointerCapture(t.pointerId);
          };
          const addScrollbarPressedClass = () => h(Z, true);
          const I = addScrollbarPressedClass();
          const A = [ () => {
            const t = getElementScroll(p);
            I();
            const n = getElementScroll(p);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              addScrollbarPressedClass();
              scrollElementTo(p, t);
              scrollOffsetElementScrollBy(o);
              S(I);
            }
          }, addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
            H: false
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
            const t = getStaticPluginModuleInstance(Mt);
            t && push(A, t(g, getHandleOffset, z, C, E));
          }
        }
      }));
    };
    let I = true;
    const isAffectingTransition = t => t.propertyName.indexOf(H) > -1;
    return bind(runEachAndClear, [ addEventListener(w, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
      l(wt, true);
    })), addEventListener(g, "pointerleave pointercancel", (() => {
      l(wt, false);
    })), !f && addEventListener(g, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, Y) || hasAttr(t, F) || t === document.body) {
        u(bind(focusElement, _), 25);
      }
    })), addEventListener(g, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (I && s === 0 && parent(g) === d) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      I = false;
      l(Ot, true);
      y((() => {
        I = true;
        l(Ot);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
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
      I: true,
      H: false
    }), {
      I: true
    }), createInteractiveScrollEvents(), m, O, C ]);
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
    const [m, S] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {ht: O, Jt: $, yt: C} = e;
    const {jt: x, Ut: H, Nt: E, qt: z} = m;
    const manageScrollbarsAutoHide = (t, n) => {
      y();
      if (t) {
        x(St);
      } else {
        const t = bind(x, St, true);
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
    return [ () => bind(runEachAndClear, push(A, S())), ({It: t, Tt: n, Kt: e, Qt: c}) => {
      const {Zt: r, tn: f, nn: p, sn: v} = c || {};
      const {Ct: h, _t: b} = e || {};
      const {ct: w} = o;
      const {M: y} = getEnvironment();
      const {K: m, en: S} = s;
      const [O, A] = t("showNativeOverlaidScrollbars");
      const [D, k] = t("scrollbars.theme");
      const [M, R] = t("scrollbars.visibility");
      const [V, L] = t("scrollbars.autoHide");
      const [P, U] = t("scrollbars.autoHideSuspend");
      const [N] = t("scrollbars.autoHideDelay");
      const [q, j] = t("scrollbars.dragScroll");
      const [B, F] = t("scrollbars.clickScroll");
      const [X, Y] = t("overflow");
      const W = b && !n;
      const G = S.x || S.y;
      const J = r || f || v || h || n;
      const K = p || R || Y;
      const Q = O && y.x && y.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(T) && (M === I || M === "auto" && n === T);
        x(gt, s, o);
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
        x(ut, Q);
      }
      if (k) {
        x(u);
        x(D, true);
        u = D;
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
      if (j) {
        x(Ct, q);
      }
      if (F) {
        x($t, B);
      }
      if (K) {
        const t = setScrollbarVisibility(X.x, m.x, true);
        const n = setScrollbarVisibility(X.y, m.y, false);
        const o = t && n;
        x(bt, !o);
      }
      if (J) {
        H();
        E();
        z();
        x(yt, !S.x, true);
        x(yt, !S.y, false);
        x(_t, w && !C);
      }
    }, {}, m ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {P: s, R: e} = n;
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
    const m = y.documentElement;
    const getDocumentWindow = () => y.defaultView || o;
    const S = bind(staticInitializationElement, [ g ]);
    const O = bind(dynamicInitializationElement, [ g ]);
    const $ = bind(createDiv, "");
    const C = bind(S, $, i);
    const x = bind(O, $, a);
    const H = C(v);
    const E = H === g;
    const z = E && b;
    const I = !E && x(h);
    const A = !E && H === I;
    const T = z ? m : H;
    const D = w ? S($, r, f) : g;
    const k = z ? T : D;
    const M = !E && O($, l, p);
    const R = !A && I;
    const V = [ R, T, M, k ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const L = elementIsGenerated(T) ? g : T;
    const P = {
      vt: g,
      ht: k,
      ot: T,
      cn: M,
      bt: R,
      gt: z ? m : T,
      Jt: z ? y : T,
      rn: b ? m : L,
      Gt: y,
      wt: w,
      yt: b,
      Dt: u,
      nt: E,
      ln: getDocumentWindow,
      St: t => hasAttrClass(T, Y, t),
      Ot: (t, n) => addRemoveAttrClass(T, Y, t, n)
    };
    const {vt: U, ht: N, cn: j, ot: W, bt: G} = P;
    const J = [ () => {
      removeAttrs(N, [ F, q ]);
      removeAttrs(U, q);
      if (b) {
        removeAttrs(m, [ q, F ]);
      }
    } ];
    const K = w && elementIsGenerated(N);
    let Z = w ? U : contents([ G, W, j, N, U ].find((t => t && !elementIsGenerated(t))));
    const tt = z ? U : G || W;
    const st = bind(runEachAndClear, J);
    const appendElements = () => {
      const t = getDocumentWindow();
      const n = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const prepareWrapUnwrapFocus = t => addEventListener(t, "focusin focusout focus blur", stopAndPrevent, {
        I: true,
        H: false
      });
      const o = "tabindex";
      const s = getAttr(W, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(N, F, E ? "" : X);
      setAttrs(j, nt, "");
      setAttrs(W, Y, "");
      setAttrs(G, ot, "");
      if (!E) {
        setAttrs(W, o, s || "-1");
        b && setAttrs(m, B, "");
      }
      if (K) {
        insertAfter(U, N);
        push(J, (() => {
          insertAfter(N, U);
          removeElements(N);
        }));
      }
      appendChildren(tt, Z);
      appendChildren(N, j);
      appendChildren(j || N, !E && W);
      appendChildren(W, G);
      push(J, [ c, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(W);
        const e = n && t === W ? U : t;
        const c = prepareWrapUnwrapFocus(e);
        removeAttrs(j, nt);
        removeAttrs(G, ot);
        removeAttrs(W, Y);
        b && removeAttrs(m, B);
        s ? setAttrs(W, o, s) : removeAttrs(W, o);
        elementIsGenerated(G) && unwrap(G);
        n && unwrap(W);
        elementIsGenerated(j) && unwrap(j);
        focusElement(e);
        c();
      } ]);
      if (e && !E) {
        addAttrClass(W, Y, Q);
        push(J, bind(removeAttrs, W, Y));
      }
      focusElement(!E && b && n === U && t.top === t ? W : n);
      c();
      Z = 0;
      return st;
    };
    return [ P, appendElements, st ];
  };
  const createTrinsicUpdateSegment = ({bt: t}) => ({Kt: n, an: o, Tt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [z]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ht: t, cn: n, ot: o, nt: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({It: t, Kt: l, an: i, Tt: a}) => {
      let [u, d] = r(a);
      const {R: _} = getEnvironment();
      const {ft: f, Ht: p, Ct: v} = l || {};
      const {ct: h} = i;
      const [g, b] = t("paddingAbsolute");
      const x = a || p;
      if (f || d || x) {
        [u, d] = c(a);
      }
      const H = !s && (b || v || d);
      if (H) {
        const t = !g || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [$]: t && !h ? -s : 0,
          [C]: t ? -c : 0,
          [O]: t && h ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? h ? -u.r : "auto" : 0,
          left: t ? h ? "auto" : -u.l : 0,
          [E]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [w]: t ? u.t : 0,
          [y]: t ? u.r : 0,
          [S]: t ? u.b : 0,
          [m]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          cn: u,
          un: !t,
          rt: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        dn: H
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {ht: c, cn: r, ot: l, nt: i, Jt: u, gt: d, yt: _, Ot: f, ln: p} = t;
    const {R: v} = e;
    const h = _ && i;
    const g = bind(s, 0);
    const b = [ "display", "direction", "flexDirection", "writingMode" ];
    const w = {
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const y = {
      i: equalXY,
      o: {}
    };
    const setMeasuringMode = t => {
      f(K, !h && t);
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: g(t.w - n.w),
        h: g(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const [m, S] = createCache(w, bind(getFractionalSize, l));
    const [O, $] = createCache(w, bind(V, l));
    const [C, x] = createCache(w);
    const [H] = createCache(y);
    const [E, z] = createCache(w);
    const [D] = createCache(y);
    const [k] = createCache({
      i: (t, n) => equal(t, n, b),
      o: {}
    }, (() => hasDimensions(l) ? getStyles(l, b) : {}));
    const [M, L] = createCache({
      i: (t, n) => equalXY(t.T, n.T) && equalXY(t.D, n.D),
      o: getZeroScrollCoordinates()
    }, (() => {
      setMeasuringMode(true);
      const t = getElementScroll(d);
      const n = f(tt, true);
      const o = addEventListener(u, T, (n => {
        const o = getElementScroll(d);
        if (n.isTrusted && o.x === t.x && o.y === t.y) {
          stopPropagation(n);
        }
      }), {
        I: true,
        A: true
      });
      scrollElementTo(d, {
        x: 0,
        y: 0
      });
      n();
      const s = getElementScroll(d);
      const e = V(d);
      scrollElementTo(d, {
        x: e.w,
        y: e.h
      });
      const c = getElementScroll(d);
      scrollElementTo(d, {
        x: c.x - s.x < 1 && -e.w,
        y: c.y - s.y < 1 && -e.h
      });
      const r = getElementScroll(d);
      scrollElementTo(d, t);
      a((() => o()));
      return {
        T: s,
        D: r
      };
    }));
    const P = getStaticPluginModuleInstance(Dt);
    const createViewportOverflowStyleClassName = (t, n) => {
      const o = n ? W : G;
      return `${o}${capitalizeFirstLetter(t)}`;
    };
    const setViewportOverflowStyle = t => {
      const createAllOverflowStyleClassNames = t => [ I, A, T ].map((n => createViewportOverflowStyleClassName(n, t)));
      const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
      f(n);
      f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
    };
    return ({It: o, Kt: s, an: i, Tt: a}, {dn: u}) => {
      const {ft: d, Ht: _, Ct: b, _t: w, zt: y} = s || {};
      const I = P && P.tt(t, n, i, e, o);
      const {it: A, ut: T, dt: V} = I || {};
      const [U, N] = getShowNativeOverlaidScrollbars(o, e);
      const [q, B] = o("overflow");
      const X = overflowIsVisible(q.x);
      const Y = overflowIsVisible(q.y);
      const W = d || u || _ || b || y || N;
      let G = S(a);
      let J = $(a);
      let K = x(a);
      let Z = z(a);
      if (N && v) {
        f(Q, !U);
      }
      if (W) {
        if (hasAttrClass(c, F, j)) {
          setMeasuringMode(true);
        }
        const [t] = T ? T() : [];
        const [n] = G = m(a);
        const [o] = J = O(a);
        const s = R(l);
        const e = h && getWindowSize(p());
        const r = {
          w: g(o.w + n.w),
          h: g(o.h + n.h)
        };
        const i = {
          w: g((e ? e.w : s.w + g(s.w - o.w)) + n.w),
          h: g((e ? e.h : s.h + g(s.h - o.h)) + n.h)
        };
        t && t();
        Z = E(i);
        K = C(getOverflowAmount(r, i), a);
      }
      const [tt, ot] = Z;
      const [st, et] = K;
      const [ct, rt] = J;
      const [lt, it] = G;
      const [at, ut] = H({
        x: st.w > 0,
        y: st.h > 0
      });
      const dt = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
      const _t = u || b || y || it || rt || ot || et || B || N || W;
      const ft = createViewportOverflowState(at, q);
      const [pt, vt] = D(ft.K);
      const [, ht] = k(a);
      const gt = b || w || ht || ut || a;
      const [bt, wt] = gt ? M(a) : L();
      if (_t) {
        vt && setViewportOverflowStyle(ft.K);
        if (V && A) {
          setStyles(l, V(ft, i, A(ft, ct, lt)));
        }
      }
      setMeasuringMode(false);
      addRemoveAttrClass(c, F, j, dt);
      addRemoveAttrClass(r, nt, j, dt);
      assignDeep(n, {
        K: pt,
        Vt: {
          x: tt.w,
          y: tt.h
        },
        Rt: {
          x: st.w,
          y: st.h
        },
        en: at,
        Pt: sanitizeScrollCoordinates(bt, st)
      });
      return {
        nn: vt,
        Zt: ot,
        tn: et,
        sn: wt || et,
        _n: gt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      cn: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      un: false,
      rt: {
        [$]: 0,
        [C]: 0,
        [O]: 0,
        [w]: 0,
        [y]: 0,
        [S]: 0,
        [m]: 0
      },
      Vt: {
        x: 0,
        y: 0
      },
      Rt: {
        x: 0,
        y: 0
      },
      K: {
        x: A,
        y: A
      },
      en: {
        x: false,
        y: false
      },
      Pt: getZeroScrollCoordinates()
    };
    const {vt: c, gt: r, nt: l} = n;
    const {R: i, M: a} = getEnvironment();
    const u = !i && (a.x || a.y);
    const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = u;
      const s = o && getElementScroll(r);
      each(d, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, s);
      !l && scrollElementTo(c, 0);
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s, e) => {
    const c = createOptionCheck(n, {});
    const [r, l, i, a, u] = createStructureSetup(t);
    const [d, _, f] = createObserversSetup(a, i, c, (t => {
      update({}, t);
    }));
    const [p, v, , h] = createScrollbarsSetup(t, n, f, i, a, e);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, e) => {
      if (o()) {
        return false;
      }
      const {fn: c, Tt: r, At: i, pn: a} = t;
      const u = c || {};
      const d = !!r;
      const p = {
        It: createOptionCheck(n, u, d),
        fn: u,
        Tt: d
      };
      if (a) {
        v(p);
        return false;
      }
      const h = e || _(assignDeep({}, p, {
        At: i
      }));
      const g = l(assignDeep({}, p, {
        an: f,
        Kt: h
      }));
      v(assignDeep({}, p, {
        Kt: h,
        Qt: g
      }));
      const b = updateHintsAreTruthy(h);
      const w = updateHintsAreTruthy(g);
      const y = b || w || !isEmptyObject(u) || d;
      y && s(t, {
        Kt: h,
        Qt: g
      });
      return y;
    };
    return [ () => {
      const {rn: t, gt: n} = a;
      const o = getElementScroll(t);
      const s = [ d(), r(), p() ];
      scrollElementTo(n, o);
      return bind(runEachAndClear, s);
    }, update, () => ({
      vn: f,
      hn: i
    }), {
      gn: a,
      bn: h
    }, u ];
  };
  const OverlayScrollbars = (t, n, o) => {
    const {N: s} = getEnvironment();
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
      const [h, g, b, w, y] = createSetups(t, a, (() => r), (({fn: t, Tt: n}, {Kt: o, Qt: s}) => {
        const {ft: e, Ct: c, xt: r, Ht: l, Et: i, _t: a} = o;
        const {Zt: u, tn: d, nn: _, sn: f} = s;
        triggerEvent("updated", [ m, {
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
      }), (t => triggerEvent("scroll", [ m, t ])));
      const destroy = t => {
        removeInstance(c);
        runEachAndClear(l);
        r = true;
        triggerEvent("destroyed", [ m, t ]);
        d();
        p();
      };
      const m = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              g({
                fn: e
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
          const {vn: t, hn: n} = b();
          const {ct: o} = t;
          const {Vt: s, Rt: e, K: c, en: l, cn: i, un: a, Pt: u} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            scrollCoordinates: {
              start: u.T,
              end: u.D
            },
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {vt: t, ht: n, cn: o, ot: s, bt: e, gt: c, Jt: r} = w.gn;
          const {Bt: l, Wt: i} = w.bn;
          const translateScrollbarStructure = t => {
            const {Mt: n, kt: o, Lt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Ft: n, Xt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  pn: true
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
          Tt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, m);
      registerPluginModuleInstances(Et, OverlayScrollbars, [ m, u, i ]);
      if (cancelInitialization(w.gn.yt, !e && t.cancel)) {
        destroy(true);
        return m;
      }
      push(l, h());
      triggerEvent("initialized", [ m ]);
      m.update(true);
      return m;
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
    const {k: t, M: n, R: o, V: s, j: e, B: c, P: r, U: l, N: i, q: a} = getEnvironment();
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
  t.ClickScrollPlugin = Rt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = kt;
  t.SizeObserverPlugin = Tt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
