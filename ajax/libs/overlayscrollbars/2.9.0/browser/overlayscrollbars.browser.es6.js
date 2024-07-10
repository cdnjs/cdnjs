/*!
 * OverlayScrollbars
 * Version: 2.9.0
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
  const n = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
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
  const isPlainObject = t => !!t && t.constructor === Object;
  const isHTMLElement = t => t instanceof HTMLElement;
  const isElement = t => t instanceof Element;
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
  const createOrKeepArray = t => {
    if (isArray(t)) {
      return t;
    }
    return !isString(t) && isArrayLike(t) ? from(t) : [ t ];
  };
  const isEmptyArray = t => !!t && !t.length;
  const deduplicateArray = t => from(new Set(t));
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t && t.apply(void 0, n || []);
    each(t, runFn);
    !o && (t.length = 0);
  };
  const h = "paddingTop";
  const g = "paddingRight";
  const b = "paddingLeft";
  const w = "paddingBottom";
  const y = "marginLeft";
  const S = "marginRight";
  const m = "marginBottom";
  const O = "overflowX";
  const C = "overflowY";
  const $ = "width";
  const x = "height";
  const H = "visible";
  const E = "hidden";
  const z = "scroll";
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
    const {_: o, p: s, v: e, S: c} = n || {};
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
        let S;
        p();
        if (e && !f) {
          y();
          f = true;
          S = h((() => f = void 0), n);
        } else {
          S = h(y, n);
          if (c && !r) {
            r = u(flush, o);
          }
        }
        p = () => g(S);
        l = _ = w;
      } else {
        v(t);
      }
    };
    h.m = flush;
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
  const isEmptyObject = t => !keys(t).length;
  const capNumber = (t, n, o) => s(t, e(n, o));
  const getDomTokensArray = t => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter((t => t)));
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
      C: t => s(domTokenListOperation(t, "add")),
      $: t => {
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
    domTokenListAttr(t, n).C(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).$(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).O(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).C(n);
    return bind(removeClass, t, n);
  };
  const find = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o ? from(o.querySelectorAll(t)) : [];
  };
  const findFirst = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o && o.querySelector(t);
  };
  const is = (t, n) => isElement(t) && t.matches(n);
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
    each(createOrKeepArray(t), (t => {
      const n = parent(t);
      t && n && n.removeChild(t);
    }));
  };
  const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), (n => {
    n && t.appendChild(n);
  })));
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
  const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
  const validFiniteNumber = t => {
    const n = t || 0;
    return isFinite(n) ? n : 0;
  };
  const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));
  const roundCssNumber = t => Math.round(t * 1e4) / 1e4;
  const numberToCssPx = t => `${roundCssNumber(validFiniteNumber(t))}px`;
  function setStyles(t, n) {
    t && n && each(n, ((n, o) => {
      try {
        const s = t.style;
        const e = isNull(n) || isBoolean(n) ? "" : isNumber(n) ? numberToCssPx(n) : n;
        if (o.indexOf("--") === 0) {
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
  const I = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : I;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const A = bind(getElmWidthHeightProperty, "offset");
  const D = bind(getElmWidthHeightProperty, "client");
  const T = bind(getElmWidthHeightProperty, "scroll");
  const getFractionalSize = t => {
    const n = parseFloat(getStyles(t, $)) || 0;
    const o = parseFloat(getStyles(t, x)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[x] || t[$]));
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
    D: {
      x: 0,
      y: 0
    },
    T: {
      x: 0,
      y: 0
    }
  });
  const sanitizeScrollCoordinates = (t, n) => {
    const {D: o, T: s} = t;
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
      D: {
        x: i,
        y: u
      },
      T: {
        x: a,
        y: d
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({D: t, T: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({D: t, T: n}, o) => {
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
  const M = {
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
  const k = `data-overlayscrollbars`;
  const R = "os-environment";
  const V = `${R}-scrollbar-hidden`;
  const L = `${k}-initialize`;
  const P = "noClipping";
  const U = `${k}-body`;
  const N = k;
  const q = "host";
  const j = `${k}-viewport`;
  const B = O;
  const F = C;
  const X = "arrange";
  const Y = "measuring";
  const W = "scrollbarHidden";
  const G = "scrollbarPressed";
  const J = "noContent";
  const K = `${k}-padding`;
  const Q = `${k}-content`;
  const Z = "os-size-observer";
  const tt = `${Z}-appear`;
  const nt = `${Z}-listener`;
  const ot = `${nt}-scroll`;
  const st = `${nt}-item`;
  const et = `${st}-final`;
  const ct = "os-trinsic-observer";
  const rt = "os-theme-none";
  const lt = "os-scrollbar";
  const it = `${lt}-rtl`;
  const at = `${lt}-horizontal`;
  const ut = `${lt}-vertical`;
  const dt = `${lt}-track`;
  const _t = `${lt}-handle`;
  const ft = `${lt}-visible`;
  const pt = `${lt}-cornerless`;
  const vt = `${lt}-interaction`;
  const ht = `${lt}-unusable`;
  const gt = `${lt}-auto-hide`;
  const bt = `${gt}-hidden`;
  const wt = `${lt}-wheel`;
  const yt = `${dt}-interactive`;
  const St = `${_t}-interactive`;
  let mt;
  const getNonce = () => mt;
  const setNonce = t => {
    mt = t;
  };
  let Ot;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = D(t);
      const e = A(t);
      const c = getFractionalSize(n);
      o && removeElements(t);
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, V);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const t = `.${R}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${R} div{width:200%;height:200%;margin:10px 0}.${V}{scrollbar-width:none!important}.${V}::-webkit-scrollbar,.${V}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const n = createDOM(`<div class="${R}"><div></div><style>${t}</style></div>`);
    const s = n[0];
    const e = s.firstChild;
    const c = s.lastChild;
    const r = getNonce();
    if (r) {
      c.nonce = r;
    }
    const [l, , i] = createEventListenerHub();
    const [a, u] = createCache({
      o: getNativeScrollbarSize(s, e),
      i: equalXY
    }, bind(getNativeScrollbarSize, s, e, true));
    const [d] = u();
    const _ = getNativeScrollbarsHiding(s);
    const f = {
      x: d.x === 0,
      y: d.y === 0
    };
    const p = {
      elements: {
        host: null,
        padding: !_,
        viewport: t => _ && isBodyElement(t) && t,
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
    const h = assignDeep({}, M);
    const g = bind(assignDeep, {}, h);
    const b = bind(assignDeep, {}, p);
    const w = {
      M: d,
      k: f,
      R: _,
      V: !!v,
      L: bind(l, "r"),
      P: b,
      U: t => assignDeep(p, t) && b(),
      N: g,
      q: t => assignDeep(h, t) && g(),
      j: assignDeep({}, p),
      B: assignDeep({}, h)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      i("r", []);
    }));
    if (isFunction(o.matchMedia) && !_ && (!f.x || !f.y)) {
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
        const [t, n] = a();
        assignDeep(w.M, t);
        i("r", [ n ]);
      }));
    }
    return w;
  };
  const getEnvironment = () => {
    if (!Ot) {
      Ot = createEnvironment();
    }
    return Ot;
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
    const {k: e, R: c, P: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const d = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!d || !!_;
  };
  const Ct = new WeakMap;
  const addInstance = (t, n) => {
    Ct.set(t, n);
  };
  const removeInstance = t => {
    Ct.delete(t);
  };
  const getInstance = t => Ct.get(t);
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
          const S = b && e;
          const m = S && getAttr(c, e || "");
          const O = isString(m) ? m : null;
          const C = S && u !== O;
          const $ = inArray(h, e) && C;
          if (n && (w || !y)) {
            const n = b && C;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, O) : !b || n;
            const f = _ && !l(o, !!a, t, s);
            each(p, (t => push(d, t)));
            each(g, (t => push(d, t)));
            v = v || f;
          }
          if (!n && y && C && !r(c, e, u, O)) {
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
        d.m();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  const $t = {};
  const xt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      $t[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || xt)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => xt[t];
  const Ht = "__osOptionsValidationPlugin";
  const Et = "__osSizeObserverPlugin";
  const zt = /* @__PURE__ */ (() => ({
    [Et]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${st}" dir="ltr"><div class="${st}"><div class="${et}"></div></div><div class="${st}"><div class="${et}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const u = r.firstChild;
        const d = u == null ? void 0 : u.firstChild;
        let _ = A(r);
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
          f = A(r);
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
        addClass(t, ot);
        setStyles(d, {
          [$]: s,
          [x]: s
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
  const overflowIsVisible = t => t.indexOf(H) === 0;
  const createViewportOverflowState = (t, n) => {
    const getAxisOverflowStyle = (t, n, o, s) => {
      const e = t === H ? E : t.replace(`${H}-`, "");
      const c = overflowIsVisible(t);
      const r = overflowIsVisible(o);
      if (!n && !s) {
        return E;
      }
      if (c && r) {
        return H;
      }
      if (c) {
        const t = n ? H : E;
        return n && s ? e : t;
      }
      const l = r && s ? H : E;
      return n ? e : l;
    };
    const o = {
      x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
      y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
    };
    return {
      K: o,
      Z: {
        x: o.x === z,
        y: o.y === z
      }
    };
  };
  const It = "__osScrollbarsHidingPlugin";
  const At = /* @__PURE__ */ (() => ({
    [It]: {
      static: () => ({
        tt: (t, n, o, s, e) => {
          const {nt: c, ot: r} = t;
          const {R: l, k: i, M: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [d] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === z;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(O);
            const [o, s] = getStatePerAxis(C);
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
                [S]: 0,
                [m]: 0,
                [y]: 0
              });
              const {st: c, et: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {rt: d} = n;
              const _ = o ? y : S;
              const f = o ? b : g;
              const p = d[_];
              const v = d[m];
              const h = d[f];
              const O = d[w];
              e[$] = `calc(100% + ${u + p * -1}px)`;
              e[_] = -u + p;
              e[m] = -a + v;
              if (s) {
                e[f] = h + (i ? u : 0);
                e[w] = O + (l ? a : 0);
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
              const p = f ? g : b;
              const v = c[p];
              const h = c.paddingTop;
              const w = s.w + e.w;
              const y = s.h + e.h;
              const S = {
                w: _ && u ? `${_ + w - v}px` : "",
                h: d && a ? `${d + y - h}px` : ""
              };
              setStyles(r, {
                "--os-vaw": S.w,
                "--os-vah": S.h
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
                assignProps([ m, h, w ]);
              }
              if (i) {
                assignProps([ y, S, b, g ]);
              }
              const d = getStyles(r, keys(a));
              const _ = removeAttrClass(r, j, X);
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
  const Dt = "__osClickScrollPlugin";
  const Tt = /* @__PURE__ */ (() => ({
    [Dt]: {
      static: () => (t, n, o, s, e) => {
        let c = false;
        let r = noop;
        let l = noop;
        const [i, a] = selfClearTimeout(133);
        const animateClickScroll = (r, a, u) => animateNumber(r, r + s * Math.sign(o), a ? 133 : 222, ((o, r, u) => {
          t(o);
          const d = n();
          const _ = d + s;
          const f = e >= d && e <= _;
          const animationCompletedAction = () => {
            l = animateClickScroll(o, a + 1);
          };
          if (!c && u && !f) {
            if (a) {
              animationCompletedAction();
            } else {
              i(animationCompletedAction);
            }
          }
        }), u);
        r = animateClickScroll(0, 0, (t => 1 - (1 - t) * (1 - t)));
        return t => {
          c = true;
          a();
          if (t) {
            r();
            l();
          } else {
            l();
          }
        };
      }
    }
  }))();
  const createSizeObserver = (t, n, o) => {
    const {_t: s} = o || {};
    const e = getStaticPluginModuleInstance(Et);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${Z}"><div class="${nt}"></div></div>`);
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
        push(o, concat([ addClass(l, tt), addEventListener(l, "animationstart", t) ], n));
      } else {
        return noop;
      }
      return bind(runEachAndClear, push(o, appendChildren(t, l)));
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(ct);
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
          const t = A(s);
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
    const u = `[${N}]`;
    const d = `[${j}]`;
    const _ = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    const {vt: f, ht: v, ot: h, gt: g, bt: b, nt: w, wt: y, yt: S, St: m} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const O = {
      Ot: false,
      ct: getDirectionIsRTL(f)
    };
    const C = getEnvironment();
    const $ = getStaticPluginModuleInstance(It);
    const [x] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = $ && $.tt(t, n, O, C, o).ut;
      const e = y && w;
      const c = !e && hasAttrClass(v, N, P);
      const r = !w && S(X);
      const l = r && getElementScroll(g);
      const i = m(Y, c);
      const a = r && s && s()[0];
      const u = T(h);
      const d = getFractionalSize(h);
      a && a();
      scrollElementTo(g, l);
      c && i();
      return {
        w: u.w + d.w,
        h: u.h + d.h
      };
    }));
    const H = debounce(s, {
      _: () => e,
      p: () => c,
      S(t, n) {
        const [o] = t;
        const [s] = n;
        return [ concat(keys(o), keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const setDirection = t => {
      const n = getDirectionIsRTL(f);
      assignDeep(t, {
        Ct: a !== n
      });
      assignDeep(O, {
        ct: n
      });
      a = n;
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        $t: e
      };
      assignDeep(O, {
        Ot: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({ft: t, _t: n}) => {
      const o = t && !n;
      const e = !o && C.R ? H : s;
      const c = {
        ft: t || n,
        _t: n
      };
      setDirection(c);
      e(c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = x();
      const e = {
        xt: o
      };
      setDirection(e);
      const c = t ? s : H;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Ht: n
      };
      setDirection(s);
      if (n && !o) {
        H(s);
      }
      return s;
    };
    const [E, z] = b ? createTrinsicObserver(v, onTrinsicChanged) : [];
    const I = !w && createSizeObserver(v, onSizeChanged, {
      _t: true
    });
    const [A, D] = createDOMObserver(v, false, onHostMutation, {
      X: _,
      F: _
    });
    const M = w && p && new p((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ft: true,
        _t: domRectAppeared(n, i)
      });
      i = n;
    }));
    const k = debounce((() => {
      const [, t] = x();
      s({
        xt: t
      });
    }), {
      _: 222,
      v: true
    });
    return [ () => {
      M && M.observe(v);
      const t = I && I();
      const n = E && E();
      const o = A();
      const s = C.L((t => {
        if (t) {
          H({
            Et: t
          });
        } else {
          k();
        }
      }));
      return () => {
        M && M.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({zt: t, It: n, At: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, f] = t("update.attributes");
      const [p, v] = t("update.elementEvents");
      const [g, y] = t("update.debounce");
      const S = v || f;
      const m = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (S) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(b || h, true, onContentMutation, {
          F: concat(_, a || []),
          Y: p,
          W: u,
          J: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !w ? liesBetween(o, u, d) : false;
            return e || !!closest(o, `.${lt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (y) {
        H.m();
        if (isArray(g)) {
          const t = g[0];
          const n = g[1];
          e = isNumber(t) && t;
          c = isNumber(n) && n;
        } else if (isNumber(g)) {
          e = g;
          c = false;
        } else {
          e = false;
          c = false;
        }
      }
      if (m) {
        const t = D();
        const n = z && z();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], m));
        n && assignDeep(s, onTrinsicChanged(n[0], m));
        o && assignDeep(s, onContentMutation(o[0], m));
      }
      setDirection(s);
      return s;
    }, O ];
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const e = "--os-viewport-percent";
    const c = "--os-scroll-percent";
    const r = "--os-scroll-direction";
    const {P: l} = getEnvironment();
    const {scrollbars: i} = l();
    const {slot: a} = i;
    const {vt: u, ht: d, ot: _, Dt: f, gt: p, wt: h, nt: g} = n;
    const {scrollbars: b} = f ? {} : t;
    const {slot: w} = b || {};
    const y = [];
    const S = [];
    const m = [];
    const O = dynamicInitializationElement([ u, d, _ ], (() => g && h ? u : d), a, w);
    const initScrollTimeline = t => {
      if (v) {
        const n = new v({
          source: p,
          axis: t
        });
        const _addScrollPercentAnimation = t => {
          const o = t.Tt.animate({
            clear: [ "left" ],
            [c]: [ 0, 1 ]
          }, {
            timeline: n
          });
          return () => o.cancel();
        };
        return {
          Mt: _addScrollPercentAnimation
        };
      }
    };
    const C = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const getViewportPercent = () => {
      const {kt: t, Rt: n} = o;
      const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
      return {
        x: getAxisValue(n.x, t.x),
        y: getAxisValue(n.y, t.y)
      };
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Tt, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        setStyles(o, s);
      }));
    };
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(S, t, n);
      c && scrollbarStructureAddRemoveClass(m, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      const t = getViewportPercent();
      const createScrollbarStyleFn = t => n => [ n.Tt, {
        [e]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(t.x));
      scrollbarStyle(m, createScrollbarStyleFn(t.y));
    };
    const refreshScrollbarsHandleOffset = () => {
      if (!v) {
        const {Vt: t} = o;
        const n = getScrollCoordinatesPercent(t, getElementScroll(p));
        const createScrollbarStyleFn = t => n => [ n.Tt, {
          [c]: roundCssNumber(t) + ""
        } ];
        scrollbarStyle(S, createScrollbarStyleFn(n.x));
        scrollbarStyle(m, createScrollbarStyleFn(n.y));
      }
    };
    const refreshScrollbarsScrollCoordinates = () => {
      const {Vt: t} = o;
      const n = isDefaultDirectionScrollCoordinates(t);
      const createScrollbarStyleFn = t => n => [ n.Tt, {
        [r]: t ? "0" : "1"
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (g && !h) {
        const {kt: t, Vt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = getScrollCoordinatesPercent(n, getElementScroll(p));
        const styleScrollbarPosition = n => {
          const {Tt: o} = n;
          const c = parent(o) === _ && o;
          const getTranslateValue = (t, n, o) => {
            const s = n * t;
            return numberToCssPx(o ? s : -s);
          };
          return [ c, c && {
            transform: getTrasformTranslateValue({
              x: getTranslateValue(e.x, t.x, s.x),
              y: getTranslateValue(e.y, t.y, s.y)
            })
          } ];
        };
        scrollbarStyle(S, styleScrollbarPosition);
        scrollbarStyle(m, styleScrollbarPosition);
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? "x" : "y";
      const o = t ? at : ut;
      const e = createDiv(`${lt} ${o}`);
      const c = createDiv(dt);
      const r = createDiv(_t);
      const l = {
        Tt: e,
        Lt: c,
        Pt: r
      };
      const i = C[n];
      push(t ? S : m, l);
      push(y, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), i && i.Mt(l), s(l, scrollbarsAddRemoveClass, t) ]);
      return l;
    };
    const $ = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(O, S[0].Tt);
      appendChildren(O, m[0].Tt);
      return bind(runEachAndClear, y);
    };
    $();
    x();
    return [ {
      Ut: refreshScrollbarsHandleLength,
      Nt: refreshScrollbarsHandleOffset,
      qt: refreshScrollbarsScrollCoordinates,
      jt: refreshScrollbarsScrollbarOffset,
      Bt: scrollbarsAddRemoveClass,
      Ft: {
        Xt: S,
        Yt: $,
        Wt: bind(scrollbarStyle, S)
      },
      Gt: {
        Xt: m,
        Yt: x,
        Wt: bind(scrollbarStyle, m)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => (e, l, i) => {
    const {ht: a, ot: d, nt: _, gt: f, Jt: p, St: v} = n;
    const {Tt: h, Lt: g, Pt: b} = e;
    const [w, y] = selfClearTimeout(333);
    const [S, m] = selfClearTimeout(444);
    const scrollOffsetElementScrollBy = t => {
      isFunction(f.scrollBy) && f.scrollBy({
        behavior: "smooth",
        left: t.x,
        top: t.y
      });
    };
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const s = `client${i ? "X" : "Y"}`;
      const e = i ? $ : x;
      const l = i ? "left" : "top";
      const a = i ? "w" : "h";
      const u = i ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {kt: e} = o;
        const c = A(g)[a] - A(b)[a];
        const r = n * s / c;
        const l = r * e[u];
        scrollElementTo(f, {
          [u]: t + l
        });
      };
      const d = [];
      return addEventListener(g, "pointerdown", (o => {
        const i = closest(o.target, `.${_t}`) === b;
        const _ = i ? b : g;
        const h = t.scrollbars;
        const {button: w, isPrimary: y, pointerType: O} = o;
        const {pointers: C} = h;
        const $ = w === 0 && y && h[i ? "dragScroll" : "clickScroll"] && (C || []).includes(O);
        if ($) {
          runEachAndClear(d);
          m();
          const t = !i && o.shiftKey;
          const h = bind(getBoundingClientRect, b);
          const w = bind(getBoundingClientRect, g);
          const getHandleOffset = (t, n) => (t || h())[l] - (n || w())[l];
          const y = c(getBoundingClientRect(f)[e]) / A(f)[a] || 1;
          const O = createRelativeHandleMove(getElementScroll(f)[u], 1 / y);
          const C = o[s];
          const $ = h();
          const x = w();
          const H = $[e];
          const E = getHandleOffset($, x) + H / 2;
          const z = C - x[l];
          const I = i ? 0 : z - E;
          const releasePointerCapture = t => {
            runEachAndClear(T);
            _.releasePointerCapture(t.pointerId);
          };
          const addScrollbarPressedClass = () => v(G, true);
          const D = addScrollbarPressedClass();
          const T = [ () => {
            const t = getElementScroll(f);
            D();
            const n = getElementScroll(f);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              addScrollbarPressedClass();
              scrollElementTo(f, t);
              scrollOffsetElementScrollBy(o);
              S(D);
            }
          }, addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(g, n, releasePointerCapture), addEventListener(g, "pointermove", (n => {
            const o = n[s] - C;
            if (i || t) {
              O(I + o);
            }
          })) ];
          _.setPointerCapture(o.pointerId);
          if (t) {
            O(I);
          } else if (!i) {
            const t = getStaticPluginModuleInstance(Dt);
            if (t) {
              const n = t(O, getHandleOffset, I, H, z);
              push(T, bind(n));
              push(d, bind(n, true));
            }
          }
        }
      }));
    };
    let O = true;
    return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(h, "pointerenter", (() => {
      l(vt, true);
    })), addEventListener(h, "pointerleave pointercancel", (() => {
      l(vt, false);
    })), !_ && addEventListener(h, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, j) || hasAttr(t, N) || t === document.body) {
        u(bind(focusElement, d), 25);
      }
    })), addEventListener(h, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (O && s === 0 && parent(h) === a) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      O = false;
      l(wt, true);
      w((() => {
        O = true;
        l(wt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(h, "pointerdown", bind(addEventListener, p, "click", stopAndPrevent, {
      A: true,
      I: true,
      H: false
    }), {
      I: true
    }), createInteractiveScrollEvents(), y, m ]);
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
    const {ht: O, Kt: C, wt: $} = e;
    const {Bt: x, Ut: E, Nt: I, qt: A, jt: D} = S;
    const manageScrollbarsAutoHide = (t, n) => {
      y();
      if (t) {
        x(bt);
      } else {
        const t = bind(x, bt, true);
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
      x(gt, t, true);
      x(gt, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        i && manageScrollbarsAutoHide(true);
      }
    };
    const T = [ y, h, b, p, () => d(), addEventListener(O, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener(O, "pointerenter", onHostMouseEnter), addEventListener(O, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        r = false;
        i && manageScrollbarsAutoHide(false);
      }
    })), addEventListener(O, "pointermove", (t => {
      isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
    })), addEventListener(C, "scroll", (t => {
      f((() => {
        I();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      D();
    })) ];
    return [ () => bind(runEachAndClear, push(T, m())), ({zt: t, At: n, Qt: e, Zt: c}) => {
      const {tn: r, nn: f, sn: p, en: v} = c || {};
      const {Ct: h, _t: b} = e || {};
      const {ct: w} = o;
      const {k: y} = getEnvironment();
      const {K: S, cn: m} = s;
      const [O, T] = t("showNativeOverlaidScrollbars");
      const [M, k] = t("scrollbars.theme");
      const [R, V] = t("scrollbars.visibility");
      const [L, P] = t("scrollbars.autoHide");
      const [U, N] = t("scrollbars.autoHideSuspend");
      const [q] = t("scrollbars.autoHideDelay");
      const [j, B] = t("scrollbars.dragScroll");
      const [F, X] = t("scrollbars.clickScroll");
      const [Y, W] = t("overflow");
      const G = b && !n;
      const J = m.x || m.y;
      const K = r || f || v || h || n;
      const Q = p || V || W;
      const Z = O && y.x && y.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(z) && (R === H || R === "auto" && n === z);
        x(ft, s, o);
        return s;
      };
      _ = q;
      if (G) {
        if (U && J) {
          manageAutoHideSuspension(false);
          d();
          g((() => {
            d = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if (T) {
        x(rt, Z);
      }
      if (k) {
        x(u);
        x(M, true);
        u = M;
      }
      if (N && !U) {
        manageAutoHideSuspension(true);
      }
      if (P) {
        l = L === "move";
        i = L === "leave";
        a = L === "never";
        manageScrollbarsAutoHide(a, true);
      }
      if (B) {
        x(St, j);
      }
      if (X) {
        x(yt, F);
      }
      if (Q) {
        const t = setScrollbarVisibility(Y.x, S.x, true);
        const n = setScrollbarVisibility(Y.y, S.y, false);
        const o = t && n;
        x(pt, !o);
      }
      if (K) {
        I();
        E();
        D();
        v && A();
        x(ht, !m.x, true);
        x(ht, !m.y, false);
        x(it, w && !$);
      }
    }, {}, S ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {P: s, R: e} = n;
    const {elements: c} = s();
    const {padding: r, viewport: l, content: i} = c;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: d} = u;
    const {padding: _, viewport: f, content: p} = d || {};
    const v = a ? t : u.target;
    const h = isBodyElement(v);
    const g = v.ownerDocument;
    const b = g.documentElement;
    const getDocumentWindow = () => g.defaultView || o;
    const w = bind(staticInitializationElement, [ v ]);
    const y = bind(dynamicInitializationElement, [ v ]);
    const S = bind(createDiv, "");
    const m = bind(w, S, l);
    const $ = bind(y, S, i);
    const elementHasOverflow = t => {
      const n = A(t);
      const o = T(t);
      const s = getStyles(t, O);
      const e = getStyles(t, C);
      return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
    };
    const x = m(f);
    const H = x === v;
    const E = H && h;
    const z = !H && $(p);
    const I = !H && x === z;
    const D = E ? b : x;
    const M = E ? D : v;
    const k = !H && y(S, r, _);
    const R = !I && z;
    const V = [ R, D, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const P = !elementIsGenerated(D) && elementHasOverflow(D) ? D : v;
    const B = {
      vt: v,
      ht: M,
      ot: D,
      rn: k,
      bt: R,
      gt: E ? b : D,
      Kt: E ? g : D,
      ln: h ? b : P,
      Jt: g,
      wt: h,
      Dt: a,
      nt: H,
      an: getDocumentWindow,
      yt: t => hasAttrClass(D, j, t),
      St: (t, n) => addRemoveAttrClass(D, j, t, n)
    };
    const {vt: F, ht: X, rn: Y, ot: G, bt: J} = B;
    const Z = [ () => {
      removeAttrs(X, [ N, L ]);
      removeAttrs(F, L);
      if (h) {
        removeAttrs(b, [ L, N ]);
      }
    } ];
    let tt = contents([ J, G, Y, X, F ].find((t => t && !elementIsGenerated(t))));
    const nt = E ? F : J || G;
    const ot = bind(runEachAndClear, Z);
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
      const s = getAttr(G, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(X, N, H ? "" : q);
      setAttrs(Y, K, "");
      setAttrs(G, j, "");
      setAttrs(J, Q, "");
      if (!H) {
        setAttrs(G, o, s || "-1");
        h && setAttrs(b, U, "");
      }
      appendChildren(nt, tt);
      appendChildren(X, Y);
      appendChildren(Y || X, !H && G);
      appendChildren(G, J);
      push(Z, [ c, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(G);
        const e = n && t === G ? F : t;
        const c = prepareWrapUnwrapFocus(e);
        removeAttrs(Y, K);
        removeAttrs(J, Q);
        removeAttrs(G, j);
        h && removeAttrs(b, U);
        s ? setAttrs(G, o, s) : removeAttrs(G, o);
        elementIsGenerated(J) && unwrap(J);
        n && unwrap(G);
        elementIsGenerated(Y) && unwrap(Y);
        focusElement(e);
        c();
      } ]);
      if (e && !H) {
        addAttrClass(G, j, W);
        push(Z, bind(removeAttrs, G, j));
      }
      focusElement(!H && h && n === F && t.top === t ? G : n);
      c();
      tt = 0;
      return ot;
    };
    return [ B, appendElements, ot ];
  };
  const createTrinsicUpdateSegment = ({bt: t}) => ({Qt: n, un: o, At: s}) => {
    const {$t: e} = n || {};
    const {Ot: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [x]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ht: t, rn: n, ot: o, nt: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({zt: t, Qt: l, un: i, At: a}) => {
      let [u, d] = r(a);
      const {R: _} = getEnvironment();
      const {ft: f, xt: p, Ct: v} = l || {};
      const {ct: O} = i;
      const [C, x] = t("paddingAbsolute");
      const H = a || p;
      if (f || d || H) {
        [u, d] = c(a);
      }
      const E = !s && (x || v || d);
      if (E) {
        const t = !C || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [S]: t && !O ? -s : 0,
          [m]: t ? -c : 0,
          [y]: t && O ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? O ? -u.r : "auto" : 0,
          left: t ? O ? "auto" : -u.l : 0,
          [$]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [h]: t ? u.t : 0,
          [g]: t ? u.r : 0,
          [w]: t ? u.b : 0,
          [b]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          rn: u,
          dn: !t,
          rt: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        _n: E
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {ht: c, rn: r, ot: l, nt: i, Kt: u, gt: d, wt: _, St: f, an: p} = t;
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
      f(Y, !h && t);
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
    const [S, m] = createCache(w, bind(getFractionalSize, l));
    const [O, C] = createCache(w, bind(T, l));
    const [$, x] = createCache(w);
    const [I] = createCache(y);
    const [A, M] = createCache(w);
    const [k] = createCache(y);
    const [R] = createCache({
      i: (t, n) => equal(t, n, b),
      o: {}
    }, (() => hasDimensions(l) ? getStyles(l, b) : {}));
    const [V, L] = createCache({
      i: (t, n) => equalXY(t.D, n.D) && equalXY(t.T, n.T),
      o: getZeroScrollCoordinates()
    }, (() => {
      setMeasuringMode(true);
      const t = getElementScroll(d);
      const n = f(J, true);
      const o = addEventListener(u, z, (n => {
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
      const e = T(d);
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
        D: s,
        T: r
      };
    }));
    const U = getStaticPluginModuleInstance(It);
    const createViewportOverflowStyleClassName = (t, n) => {
      const o = n ? B : F;
      return `${o}${capitalizeFirstLetter(t)}`;
    };
    const setViewportOverflowStyle = t => {
      const createAllOverflowStyleClassNames = t => [ H, E, z ].map((n => createViewportOverflowStyleClassName(n, t)));
      const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
      f(n);
      f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
    };
    return ({zt: o, Qt: s, un: i, At: a}, {_n: u}) => {
      const {ft: d, xt: _, Ct: b, _t: w, Et: y} = s || {};
      const H = U && U.tt(t, n, i, e, o);
      const {it: E, ut: z, dt: T} = H || {};
      const [q, j] = getShowNativeOverlaidScrollbars(o, e);
      const [B, F] = o("overflow");
      const X = overflowIsVisible(B.x);
      const Y = overflowIsVisible(B.y);
      const G = true;
      let J = m(a);
      let Q = C(a);
      let Z = x(a);
      let tt = M(a);
      if (j && v) {
        f(W, !q);
      }
      {
        if (hasAttrClass(c, N, P)) {
          setMeasuringMode(true);
        }
        const [t] = z ? z() : [];
        const [n] = J = S(a);
        const [o] = Q = O(a);
        const s = D(l);
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
        tt = A(i);
        Z = $(getOverflowAmount(r, i), a);
      }
      const [nt, ot] = tt;
      const [st, et] = Z;
      const [ct, rt] = Q;
      const [lt, it] = J;
      const [at, ut] = I({
        x: st.w > 0,
        y: st.h > 0
      });
      const dt = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
      const _t = u || b || y || it || rt || ot || et || F || j || G;
      const ft = createViewportOverflowState(at, B);
      const [pt, vt] = k(ft.K);
      const [, ht] = R(a);
      const gt = b || w || ht || ut || a;
      const [bt, wt] = gt ? V(a) : L();
      if (_t) {
        vt && setViewportOverflowStyle(ft.K);
        if (T && E) {
          setStyles(l, T(ft, i, E(ft, ct, lt)));
        }
      }
      setMeasuringMode(false);
      addRemoveAttrClass(c, N, P, dt);
      addRemoveAttrClass(r, K, P, dt);
      assignDeep(n, {
        K: pt,
        Rt: {
          x: nt.w,
          y: nt.h
        },
        kt: {
          x: st.w,
          y: st.h
        },
        cn: at,
        Vt: sanitizeScrollCoordinates(bt, st)
      });
      return {
        sn: vt,
        tn: ot,
        nn: et,
        en: wt || et,
        fn: gt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      rn: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      dn: false,
      rt: {
        [S]: 0,
        [m]: 0,
        [y]: 0,
        [h]: 0,
        [g]: 0,
        [w]: 0,
        [b]: 0
      },
      Rt: {
        x: 0,
        y: 0
      },
      kt: {
        x: 0,
        y: 0
      },
      K: {
        x: E,
        y: E
      },
      cn: {
        x: false,
        y: false
      },
      Vt: getZeroScrollCoordinates()
    };
    const {vt: c, gt: r, nt: l} = n;
    const {R: i, k: a} = getEnvironment();
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
    let c = false;
    const r = createOptionCheck(n, {});
    const [l, i, a, u, d] = createStructureSetup(t);
    const [_, f, p] = createObserversSetup(u, a, r, (t => {
      update({}, t);
    }));
    const [v, h, , g] = createScrollbarsSetup(t, n, p, a, u, e);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, e) => {
      if (o()) {
        return false;
      }
      const {pn: r, At: l, It: a, vn: u} = t;
      const d = r || {};
      const _ = !!l || !c;
      const v = {
        zt: createOptionCheck(n, d, _),
        pn: d,
        At: _
      };
      if (u) {
        h(v);
        return false;
      }
      const g = e || f(assignDeep({}, v, {
        It: a
      }));
      const b = i(assignDeep({}, v, {
        un: p,
        Qt: g
      }));
      h(assignDeep({}, v, {
        Qt: g,
        Zt: b
      }));
      const w = updateHintsAreTruthy(g);
      const y = updateHintsAreTruthy(b);
      const S = w || y || !isEmptyObject(d) || _;
      c = true;
      S && s(t, {
        Qt: g,
        Zt: b
      });
      return S;
    };
    return [ () => {
      const {ln: t, gt: n} = u;
      const o = getElementScroll(t);
      const s = [ _(), l(), v() ];
      scrollElementTo(n, o);
      return bind(runEachAndClear, s);
    }, update, () => ({
      hn: p,
      gn: a
    }), {
      bn: u,
      wn: g
    }, d ];
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
        const o = getStaticPluginModuleInstance(Ht);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, d, _] = createEventListenerHub();
      const [f, p, v] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        v(t, n);
        _(t, n);
      };
      const [h, g, b, w, y] = createSetups(t, a, (() => r), (({pn: t, At: n}, {Qt: o, Zt: s}) => {
        const {ft: e, Ct: c, $t: r, xt: l, Ht: i, _t: a} = o;
        const {tn: u, nn: d, sn: _, en: f} = s;
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
                pn: e
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
          const {hn: t, gn: n} = b();
          const {ct: o} = t;
          const {Rt: s, kt: e, K: c, cn: l, rn: i, dn: a, Vt: u} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            scrollCoordinates: {
              start: u.D,
              end: u.T
            },
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {vt: t, ht: n, rn: o, ot: s, bt: e, gt: c, Kt: r} = w.bn;
          const {Ft: l, Gt: i} = w.wn;
          const translateScrollbarStructure = t => {
            const {Pt: n, Lt: o, Tt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Xt: n, Yt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  vn: true
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
          It: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, S);
      registerPluginModuleInstances($t, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(w.bn.wt, !e && t.cancel)) {
        destroy(true);
        return S;
      }
      push(l, h());
      triggerEvent("initialized", [ S ]);
      S.update();
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
    const {M: t, k: n, R: o, V: s, j: e, B: c, P: r, U: l, N: i, q: a} = getEnvironment();
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
  OverlayScrollbars.nonce = setNonce;
  t.ClickScrollPlugin = Tt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = At;
  t.SizeObserverPlugin = zt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
