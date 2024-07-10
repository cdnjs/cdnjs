/*!
 * OverlayScrollbars
 * Version: 2.9.2
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
  const _ = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const d = getApi("MutationObserver");
  const f = getApi("IntersectionObserver");
  const v = getApi("ResizeObserver");
  const p = getApi("ScrollTimeline");
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
      const _ = i - l;
      const d = _ >= u;
      const f = o ? 1 : 1 - (s(0, l + u - i) / u || 0);
      const v = (n - t) * (isFunction(c) ? c(f, f * u, 0, 1, u) : f) + t;
      const p = d || f === 1;
      e && e(v, f, p);
      r = p ? 0 : a((() => frame()));
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
  const g = "paddingTop";
  const h = "paddingRight";
  const b = "paddingLeft";
  const y = "paddingBottom";
  const w = "marginLeft";
  const S = "marginRight";
  const m = "marginBottom";
  const O = "overflowX";
  const $ = "overflowY";
  const C = "width";
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
    const s = t ? _ : i;
    return [ e => {
      s(n);
      n = o((() => e()), isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const debounce = (t, n) => {
    const {_: o, v: s, p: e, S: c} = n || {};
    let r;
    let l;
    let d;
    let f;
    let v = noop;
    const p = function invokeFunctionToDebounce(n) {
      v();
      _(r);
      f = r = l = void 0;
      v = noop;
      t.apply(this, n);
    };
    const mergeParms = t => c && l ? c(l, t) : t;
    const flush = () => {
      if (v !== noop) {
        p(mergeParms(d) || d);
      }
    };
    const g = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(o) ? o() : o;
      const c = isNumber(n) && n >= 0;
      if (c) {
        const o = isFunction(s) ? s() : s;
        const c = isNumber(o) && o >= 0;
        const g = n > 0 ? u : a;
        const h = n > 0 ? _ : i;
        const b = mergeParms(t);
        const y = b || t;
        const w = p.bind(0, y);
        let S;
        v();
        if (e && !f) {
          w();
          f = true;
          S = g((() => f = void 0), n);
        } else {
          S = g(w, n);
          if (c && !r) {
            r = u(flush, o);
          }
        }
        v = () => h(S);
        l = d = y;
      } else {
        p(t);
      }
    };
    g.m = flush;
    return g;
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
    const n = parseFloat(getStyles(t, C)) || 0;
    const o = parseFloat(getStyles(t, x)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[x] || t[C]));
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
    const [u, _] = sanitizeAxis(o.y, s.y, c);
    return {
      D: {
        x: i,
        y: u
      },
      T: {
        x: a,
        y: _
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
  const U = "noClipping";
  const P = `${k}-body`;
  const N = k;
  const q = "host";
  const j = `${k}-viewport`;
  const B = O;
  const F = $;
  const X = "arrange";
  const Y = "measuring";
  const W = "scrolling";
  const G = "scrollbarHidden";
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
  const _t = `${lt}-track`;
  const dt = `${lt}-handle`;
  const ft = `${lt}-visible`;
  const vt = `${lt}-cornerless`;
  const pt = `${lt}-interaction`;
  const gt = `${lt}-unusable`;
  const ht = `${lt}-auto-hide`;
  const bt = `${ht}-hidden`;
  const yt = `${lt}-wheel`;
  const wt = `${_t}-interactive`;
  const St = `${dt}-interactive`;
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
    const [_] = u();
    const d = getNativeScrollbarsHiding(s);
    const f = {
      x: _.x === 0,
      y: _.y === 0
    };
    const v = {
      elements: {
        host: null,
        padding: !d,
        viewport: t => d && isBodyElement(t) && t,
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
    const g = assignDeep({}, M);
    const h = bind(assignDeep, {}, g);
    const b = bind(assignDeep, {}, v);
    const y = {
      M: _,
      k: f,
      R: d,
      V: !!p,
      L: bind(l, "r"),
      U: b,
      P: t => assignDeep(v, t) && b(),
      N: h,
      q: t => assignDeep(g, t) && h(),
      j: assignDeep({}, v),
      B: assignDeep({}, g)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      i("r", []);
    }));
    if (isFunction(o.matchMedia) && !d && (!f.x || !f.y)) {
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
        assignDeep(y.M, t);
        i("r", [ n ]);
      }));
    }
    return y;
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
    const {k: e, R: c, U: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const _ = (e.x || e.y) && a;
    const d = t && (isNull(u) ? !c : u);
    return !!_ || !!d;
  };
  const $t = new WeakMap;
  const addInstance = (t, n) => {
    $t.set(t, n);
  };
  const removeInstance = t => {
    $t.delete(t);
  };
  const getInstance = t => $t.get(t);
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
    const _ = debounce((() => e && o(true)), {
      _: 33,
      v: 99
    });
    const [f, v] = createEventContentChange(t, _, l);
    const p = c || [];
    const g = r || [];
    const h = concat(p, g);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const _ = [];
        const d = [];
        let f = false;
        let p = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: v, removedNodes: h} = o;
          const b = a === "attributes";
          const y = a === "childList";
          const w = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "");
          const O = isString(m) ? m : null;
          const $ = S && u !== O;
          const C = inArray(g, e) && $;
          if (n && (y || !w)) {
            const n = b && $;
            const a = n && i && is(c, i);
            const d = a ? !r(c, e, u, O) : !b || n;
            const f = d && !l(o, !!a, t, s);
            each(v, (t => push(_, t)));
            each(h, (t => push(_, t)));
            p = p || f;
          }
          if (!n && w && $ && !r(c, e, u, O)) {
            push(d, e);
            f = f || C;
          }
        }));
        v((t => deduplicateArray(_).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && p && o(false);
          return [ false ];
        }
        if (!isEmptyArray(d) || f) {
          const t = [ deduplicateArray(d), f ];
          !e && o.apply(0, t);
          return t;
        }
      }
    };
    const b = new d(bind(observerCallback, false));
    return [ () => {
      b.observe(t, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: h,
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
        _.m();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  const Ct = {};
  const xt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      Ct[o] = t[o];
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
        const _ = u == null ? void 0 : u.firstChild;
        let d = A(r);
        let f = d;
        let v = false;
        let p;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          p = 0;
          if (v) {
            d = f;
            n(t === true);
          }
        };
        const onScroll = t => {
          f = A(r);
          v = !t || !equalWH(f, d);
          if (t) {
            stopPropagation(t);
            if (v && !p) {
              i(p);
              p = a(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const g = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, ot);
        setStyles(_, {
          [C]: s,
          [x]: s
        });
        a(reset);
        return [ o ? bind(onScroll, false) : reset, g ];
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
          const [_] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === z;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(O);
            const [o, s] = getStatePerAxis($);
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
            const o = l || _ ? 0 : 42;
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
                [w]: 0
              });
              const {st: c, et: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {rt: _} = n;
              const d = o ? w : S;
              const f = o ? b : h;
              const v = _[d];
              const p = _[m];
              const g = _[f];
              const O = _[y];
              e[C] = `calc(100% + ${u + v * -1}px)`;
              e[d] = -u + v;
              e[m] = -a + p;
              if (s) {
                e[f] = g + (i ? u : 0);
                e[y] = O + (l ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {rt: c} = n;
              const {st: l, et: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: _, y: d} = l;
              const {ct: f} = o;
              const v = f ? h : b;
              const p = c[v];
              const g = c.paddingTop;
              const y = s.w + e.w;
              const w = s.h + e.h;
              const S = {
                w: d && u ? `${d + y - p}px` : "",
                h: _ && a ? `${_ + w - g}px` : ""
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
                assignProps([ m, g, y ]);
              }
              if (i) {
                assignProps([ w, S, b, h ]);
              }
              const _ = getStyles(r, keys(a));
              const d = removeAttrClass(r, j, X);
              setStyles(r, a);
              return [ () => {
                setStyles(r, assignDeep({}, _, _hideNativeScrollbars(s, o, u)));
                d();
              }, s ];
            }
            return [ noop ];
          };
          return {
            lt: _getViewportOverflowHideOffset,
            it: _arrangeViewport,
            ut: _undoViewportArrange,
            _t: _hideNativeScrollbars
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
          const _ = n();
          const d = _ + s;
          const f = e >= _ && e <= d;
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
    const {dt: s} = o || {};
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
            dt: e
          });
        }
      };
      if (v) {
        const t = new v((t => onSizeChangedCallbackProxy(t.pop())));
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
    const _ = `[${j}]`;
    const d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    const {vt: f, gt: p, ot: g, ht: h, bt: b, nt: y, yt: w, wt: S, St: m, Ot: O} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const $ = {
      $t: false,
      ct: getDirectionIsRTL(f)
    };
    const C = getEnvironment();
    const x = getStaticPluginModuleInstance(It);
    const [H] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = x && x.tt(t, n, $, C, o).ut;
      const e = w && y;
      const c = !e && hasAttrClass(p, N, U);
      const r = !y && S(X);
      const l = r && getElementScroll(h);
      const i = l && O();
      const a = m(Y, c);
      const u = r && s && s()[0];
      const _ = T(g);
      const d = getFractionalSize(g);
      u && u();
      scrollElementTo(h, l);
      i && i();
      c && a();
      return {
        w: _.w + d.w,
        h: _.h + d.h
      };
    }));
    const E = debounce(s, {
      _: () => e,
      v: () => c,
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
      assignDeep($, {
        ct: n
      });
      a = n;
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        xt: e
      };
      assignDeep($, {
        $t: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({ft: t, dt: n}) => {
      const o = t && !n;
      const e = !o && C.R ? E : s;
      const c = {
        ft: t || n,
        dt: n
      };
      setDirection(c);
      e(c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = H();
      const e = {
        Ht: o
      };
      setDirection(e);
      const c = t ? s : E;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Et: n
      };
      setDirection(s);
      if (n && !o) {
        E(s);
      }
      return s;
    };
    const [z, I] = b ? createTrinsicObserver(p, onTrinsicChanged) : [];
    const A = !y && createSizeObserver(p, onSizeChanged, {
      dt: true
    });
    const [D, M] = createDOMObserver(p, false, onHostMutation, {
      X: d,
      F: d
    });
    const k = y && v && new v((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ft: true,
        dt: domRectAppeared(n, i)
      });
      i = n;
    }));
    const R = debounce((() => {
      const [, t] = H();
      s({
        Ht: t
      });
    }), {
      _: 222,
      p: true
    });
    return [ () => {
      k && k.observe(p);
      const t = A && A();
      const n = z && z();
      const o = D();
      const s = C.L((t => {
        if (t) {
          E({
            zt: t
          });
        } else {
          R();
        }
      }));
      return () => {
        k && k.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({It: t, At: n, Dt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, f] = t("update.attributes");
      const [v, p] = t("update.elementEvents");
      const [h, w] = t("update.debounce");
      const S = p || f;
      const m = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (S) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(b || g, true, onContentMutation, {
          F: concat(d, a || []),
          Y: v,
          W: u,
          J: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !y ? liesBetween(o, u, _) : false;
            return e || !!closest(o, `.${lt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (w) {
        E.m();
        if (isArray(h)) {
          const t = h[0];
          const n = h[1];
          e = isNumber(t) && t;
          c = isNumber(n) && n;
        } else if (isNumber(h)) {
          e = h;
          c = false;
        } else {
          e = false;
          c = false;
        }
      }
      if (m) {
        const t = M();
        const n = I && I();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], m));
        n && assignDeep(s, onTrinsicChanged(n[0], m));
        o && assignDeep(s, onContentMutation(o[0], m));
      }
      setDirection(s);
      return s;
    }, $ ];
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const e = "--os-viewport-percent";
    const c = "--os-scroll-percent";
    const r = "--os-scroll-direction";
    const {U: l} = getEnvironment();
    const {scrollbars: i} = l();
    const {slot: a} = i;
    const {vt: u, gt: _, ot: d, Tt: f, ht: v, yt: g, nt: h} = n;
    const {scrollbars: b} = f ? {} : t;
    const {slot: y} = b || {};
    const w = [];
    const S = [];
    const m = [];
    const O = dynamicInitializationElement([ u, _, d ], (() => h && g ? u : _), a, y);
    const initScrollTimeline = t => {
      if (p) {
        const n = new p({
          source: v,
          axis: t
        });
        const _addScrollPercentAnimation = t => {
          const o = t.Mt.animate({
            clear: [ "left" ],
            [c]: [ 0, 1 ]
          }, {
            timeline: n
          });
          return () => o.cancel();
        };
        return {
          kt: _addScrollPercentAnimation
        };
      }
    };
    const $ = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const getViewportPercent = () => {
      const {Rt: t, Vt: n} = o;
      const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
      return {
        x: getAxisValue(n.x, t.x),
        y: getAxisValue(n.y, t.y)
      };
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Mt, n);
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
      const createScrollbarStyleFn = t => n => [ n.Mt, {
        [e]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(t.x));
      scrollbarStyle(m, createScrollbarStyleFn(t.y));
    };
    const refreshScrollbarsHandleOffset = () => {
      if (!p) {
        const {Lt: t} = o;
        const n = getScrollCoordinatesPercent(t, getElementScroll(v));
        const createScrollbarStyleFn = t => n => [ n.Mt, {
          [c]: roundCssNumber(t) + ""
        } ];
        scrollbarStyle(S, createScrollbarStyleFn(n.x));
        scrollbarStyle(m, createScrollbarStyleFn(n.y));
      }
    };
    const refreshScrollbarsScrollCoordinates = () => {
      const {Lt: t} = o;
      const n = isDefaultDirectionScrollCoordinates(t);
      const createScrollbarStyleFn = t => n => [ n.Mt, {
        [r]: t ? "0" : "1"
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (h && !g) {
        const {Rt: t, Lt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = getScrollCoordinatesPercent(n, getElementScroll(v));
        const styleScrollbarPosition = n => {
          const {Mt: o} = n;
          const c = parent(o) === d && o;
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
      const c = createDiv(_t);
      const r = createDiv(dt);
      const l = {
        Mt: e,
        Ut: c,
        Pt: r
      };
      const i = $[n];
      push(t ? S : m, l);
      push(w, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), i && i.kt(l), s(l, scrollbarsAddRemoveClass, t) ]);
      return l;
    };
    const C = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(O, S[0].Mt);
      appendChildren(O, m[0].Mt);
      return bind(runEachAndClear, w);
    };
    C();
    x();
    return [ {
      Nt: refreshScrollbarsHandleLength,
      qt: refreshScrollbarsHandleOffset,
      jt: refreshScrollbarsScrollCoordinates,
      Bt: refreshScrollbarsScrollbarOffset,
      Ft: scrollbarsAddRemoveClass,
      Xt: {
        Yt: S,
        Wt: C,
        Gt: bind(scrollbarStyle, S)
      },
      Jt: {
        Yt: m,
        Wt: x,
        Gt: bind(scrollbarStyle, m)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => (e, l, i) => {
    const {gt: a, ot: _, nt: d, ht: f, Kt: v, Ot: p} = n;
    const {Mt: g, Ut: h, Pt: b} = e;
    const [y, w] = selfClearTimeout(333);
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
      const e = i ? C : x;
      const l = i ? "left" : "top";
      const a = i ? "w" : "h";
      const u = i ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {Rt: e} = o;
        const c = A(h)[a] - A(b)[a];
        const r = n * s / c;
        const l = r * e[u];
        scrollElementTo(f, {
          [u]: t + l
        });
      };
      const _ = [];
      return addEventListener(h, "pointerdown", (o => {
        const i = closest(o.target, `.${dt}`) === b;
        const d = i ? b : h;
        const g = t.scrollbars;
        const {button: y, isPrimary: w, pointerType: O} = o;
        const {pointers: $} = g;
        const C = y === 0 && w && g[i ? "dragScroll" : "clickScroll"] && ($ || []).includes(O);
        if (C) {
          runEachAndClear(_);
          m();
          const t = !i && o.shiftKey;
          const g = bind(getBoundingClientRect, b);
          const y = bind(getBoundingClientRect, h);
          const getHandleOffset = (t, n) => (t || g())[l] - (n || y())[l];
          const w = c(getBoundingClientRect(f)[e]) / A(f)[a] || 1;
          const O = createRelativeHandleMove(getElementScroll(f)[u], 1 / w);
          const $ = o[s];
          const C = g();
          const x = y();
          const H = C[e];
          const E = getHandleOffset(C, x) + H / 2;
          const z = $ - x[l];
          const I = i ? 0 : z - E;
          const releasePointerCapture = t => {
            runEachAndClear(T);
            d.releasePointerCapture(t.pointerId);
          };
          const D = p();
          const T = [ () => {
            const t = getElementScroll(f);
            D();
            const n = getElementScroll(f);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              p();
              scrollElementTo(f, t);
              scrollOffsetElementScrollBy(o);
              S(D);
            }
          }, addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(h, n, releasePointerCapture), addEventListener(h, "pointermove", (n => {
            const o = n[s] - $;
            if (i || t) {
              O(I + o);
            }
          })) ];
          d.setPointerCapture(o.pointerId);
          if (t) {
            O(I);
          } else if (!i) {
            const t = getStaticPluginModuleInstance(Dt);
            if (t) {
              const n = t(O, getHandleOffset, I, H, z);
              push(T, bind(n));
              push(_, bind(n, true));
            }
          }
        }
      }));
    };
    let O = true;
    return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
      l(pt, true);
    })), addEventListener(g, "pointerleave pointercancel", (() => {
      l(pt, false);
    })), !d && addEventListener(g, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, j) || hasAttr(t, N) || t === document.body) {
        u(bind(focusElement, _), 25);
      }
    })), addEventListener(g, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (O && s === 0 && parent(g) === a) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      O = false;
      l(yt, true);
      y((() => {
        O = true;
        l(yt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(g, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
      A: true,
      I: true,
      H: false
    }), {
      I: true
    }), createInteractiveScrollEvents(), w, m ]);
  };
  const createScrollbarsSetup = (t, n, o, s, e, c) => {
    let r;
    let l;
    let i;
    let a;
    let u;
    let _ = noop;
    let d = 0;
    const isHoverablePointerType = t => t.pointerType === "mouse";
    const [f, v] = selfClearTimeout();
    const [p, g] = selfClearTimeout(100);
    const [h, b] = selfClearTimeout(100);
    const [y, w] = selfClearTimeout((() => d));
    const [S, m] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {gt: O, Qt: $, yt: C} = e;
    const {Ft: x, Nt: E, qt: I, jt: A, Bt: D} = S;
    const manageScrollbarsAutoHide = (t, n) => {
      w();
      if (t) {
        x(bt);
      } else {
        const t = bind(x, bt, true);
        if (d > 0 && !n) {
          y(t);
        } else {
          t();
        }
      }
    };
    const manageScrollbarsAutoHideInstantInteraction = () => {
      if (i ? !r : !a) {
        manageScrollbarsAutoHide(true);
        p((() => {
          manageScrollbarsAutoHide(false);
        }));
      }
    };
    const manageAutoHideSuspension = t => {
      x(ht, t, true);
      x(ht, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        i && manageScrollbarsAutoHide(true);
      }
    };
    const T = [ w, g, b, v, () => _(), addEventListener(O, "pointerover", onHostMouseEnter, {
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
        I();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      D();
    })) ];
    return [ () => bind(runEachAndClear, push(T, m())), ({It: t, Dt: n, Zt: e, tn: c}) => {
      const {nn: r, sn: f, en: v, cn: p} = c || {};
      const {Ct: g, dt: b} = e || {};
      const {ct: y} = o;
      const {k: w} = getEnvironment();
      const {K: S, rn: m} = s;
      const [O, T] = t("showNativeOverlaidScrollbars");
      const [M, k] = t("scrollbars.theme");
      const [R, V] = t("scrollbars.visibility");
      const [L, U] = t("scrollbars.autoHide");
      const [P, N] = t("scrollbars.autoHideSuspend");
      const [q] = t("scrollbars.autoHideDelay");
      const [j, B] = t("scrollbars.dragScroll");
      const [F, X] = t("scrollbars.clickScroll");
      const [Y, W] = t("overflow");
      const G = b && !n;
      const J = m.x || m.y;
      const K = r || f || p || g || n;
      const Q = v || V || W;
      const Z = O && w.x && w.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(z) && (R === H || R === "auto" && n === z);
        x(ft, s, o);
        return s;
      };
      d = q;
      if (G) {
        if (P && J) {
          manageAutoHideSuspension(false);
          _();
          h((() => {
            _ = addEventListener($, "scroll", bind(manageAutoHideSuspension, true), {
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
      if (N && !P) {
        manageAutoHideSuspension(true);
      }
      if (U) {
        l = L === "move";
        i = L === "leave";
        a = L === "never";
        manageScrollbarsAutoHide(a, true);
      }
      if (B) {
        x(St, j);
      }
      if (X) {
        x(wt, F);
      }
      if (Q) {
        const t = setScrollbarVisibility(Y.x, S.x, true);
        const n = setScrollbarVisibility(Y.y, S.y, false);
        const o = t && n;
        x(vt, !o);
      }
      if (K) {
        I();
        E();
        D();
        p && A();
        x(gt, !m.x, true);
        x(gt, !m.y, false);
        x(it, y && !C);
      }
    }, {}, S ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {U: s, R: e} = n;
    const {elements: c} = s();
    const {padding: r, viewport: l, content: i} = c;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: _} = u;
    const {padding: d, viewport: f, content: v} = _ || {};
    const p = a ? t : u.target;
    const g = isBodyElement(p);
    const h = p.ownerDocument;
    const b = h.documentElement;
    const getDocumentWindow = () => h.defaultView || o;
    const y = bind(staticInitializationElement, [ p ]);
    const w = bind(dynamicInitializationElement, [ p ]);
    const S = bind(createDiv, "");
    const m = bind(y, S, l);
    const C = bind(w, S, i);
    const elementHasOverflow = t => {
      const n = A(t);
      const o = T(t);
      const s = getStyles(t, O);
      const e = getStyles(t, $);
      return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
    };
    const x = m(f);
    const H = x === p;
    const E = H && g;
    const z = !H && C(v);
    const I = !H && x === z;
    const D = E ? b : x;
    const M = E ? D : p;
    const k = !H && w(S, r, d);
    const R = !I && z;
    const V = [ R, D, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const U = !elementIsGenerated(D) && elementHasOverflow(D) ? D : p;
    const B = E ? b : D;
    const F = E ? h : D;
    const X = {
      vt: p,
      gt: M,
      ot: D,
      ln: k,
      bt: R,
      ht: B,
      Qt: F,
      an: g ? b : U,
      Kt: h,
      yt: g,
      Tt: a,
      nt: H,
      un: getDocumentWindow,
      wt: t => hasAttrClass(D, j, t),
      St: (t, n) => addRemoveAttrClass(D, j, t, n),
      Ot: () => addRemoveAttrClass(B, j, W, true)
    };
    const {vt: Y, gt: J, ln: Z, ot: tt, bt: nt} = X;
    const ot = [ () => {
      removeAttrs(J, [ N, L ]);
      removeAttrs(Y, L);
      if (g) {
        removeAttrs(b, [ L, N ]);
      }
    } ];
    let st = contents([ nt, tt, Z, J, Y ].find((t => t && !elementIsGenerated(t))));
    const et = E ? Y : nt || tt;
    const ct = bind(runEachAndClear, ot);
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
      const s = getAttr(tt, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(J, N, H ? "" : q);
      setAttrs(Z, K, "");
      setAttrs(tt, j, "");
      setAttrs(nt, Q, "");
      if (!H) {
        setAttrs(tt, o, s || "-1");
        g && setAttrs(b, P, "");
      }
      appendChildren(et, st);
      appendChildren(J, Z);
      appendChildren(Z || J, !H && tt);
      appendChildren(tt, nt);
      push(ot, [ c, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(tt);
        const e = n && t === tt ? Y : t;
        const c = prepareWrapUnwrapFocus(e);
        removeAttrs(Z, K);
        removeAttrs(nt, Q);
        removeAttrs(tt, j);
        g && removeAttrs(b, P);
        s ? setAttrs(tt, o, s) : removeAttrs(tt, o);
        elementIsGenerated(nt) && unwrap(nt);
        n && unwrap(tt);
        elementIsGenerated(Z) && unwrap(Z);
        focusElement(e);
        c();
      } ]);
      if (e && !H) {
        addAttrClass(tt, j, G);
        push(ot, bind(removeAttrs, tt, j));
      }
      focusElement(!H && g && n === Y && t.top === t ? tt : n);
      c();
      st = 0;
      return ct;
    };
    return [ X, appendElements, ct ];
  };
  const createTrinsicUpdateSegment = ({bt: t}) => ({Zt: n, _n: o, Dt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [x]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({gt: t, ln: n, ot: o, nt: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({It: t, Zt: l, _n: i, Dt: a}) => {
      let [u, _] = r(a);
      const {R: d} = getEnvironment();
      const {ft: f, Ht: v, Ct: p} = l || {};
      const {ct: O} = i;
      const [$, x] = t("paddingAbsolute");
      const H = a || v;
      if (f || _ || H) {
        [u, _] = c(a);
      }
      const E = !s && (x || p || _);
      if (E) {
        const t = !$ || !n && !d;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [S]: t && !O ? -s : 0,
          [m]: t ? -c : 0,
          [w]: t && O ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? O ? -u.r : "auto" : 0,
          left: t ? O ? "auto" : -u.l : 0,
          [C]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [g]: t ? u.t : 0,
          [h]: t ? u.r : 0,
          [y]: t ? u.b : 0,
          [b]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          ln: u,
          dn: !t,
          rt: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        fn: E
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {gt: c, ln: r, ot: l, nt: i, Qt: u, ht: _, yt: d, St: f, un: v} = t;
    const {R: p} = e;
    const g = d && i;
    const h = bind(s, 0);
    const b = {
      display: () => false,
      direction: t => t !== "ltr",
      flexDirection: t => t.endsWith("-reverse"),
      writingMode: t => t !== "horizontal-tb"
    };
    const y = keys(b);
    const w = {
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const S = {
      i: equalXY,
      o: {}
    };
    const setMeasuringMode = t => {
      f(Y, !g && t);
    };
    const getMeasuredScrollCoordinates = t => {
      const n = y.some((n => {
        const o = t[n];
        return o && b[n](o);
      }));
      if (!n) {
        return {
          D: {
            x: 0,
            y: 0
          },
          T: {
            x: 1,
            y: 1
          }
        };
      }
      setMeasuringMode(true);
      const o = getElementScroll(_);
      const s = f(J, true);
      const e = addEventListener(u, z, (t => {
        const n = getElementScroll(_);
        if (t.isTrusted && n.x === o.x && n.y === o.y) {
          stopPropagation(t);
        }
      }), {
        I: true,
        A: true
      });
      scrollElementTo(_, {
        x: 0,
        y: 0
      });
      s();
      const c = getElementScroll(_);
      const r = T(_);
      scrollElementTo(_, {
        x: r.w,
        y: r.h
      });
      const l = getElementScroll(_);
      scrollElementTo(_, {
        x: l.x - c.x < 1 && -r.w,
        y: l.y - c.y < 1 && -r.h
      });
      const i = getElementScroll(_);
      scrollElementTo(_, o);
      a((() => e()));
      return {
        D: c,
        T: i
      };
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: h(t.w - n.w),
        h: h(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const [m, O] = createCache(w, bind(getFractionalSize, l));
    const [$, C] = createCache(w, bind(T, l));
    const [x, I] = createCache(w);
    const [A] = createCache(S);
    const [M, k] = createCache(w);
    const [R] = createCache(S);
    const [V] = createCache({
      i: (t, n) => equal(t, n, y),
      o: {}
    }, (() => hasDimensions(l) ? getStyles(l, y) : {}));
    const [L, P] = createCache({
      i: (t, n) => equalXY(t.D, n.D) && equalXY(t.T, n.T),
      o: getZeroScrollCoordinates()
    });
    const q = getStaticPluginModuleInstance(It);
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
    return ({It: o, Zt: s, _n: i, Dt: a}, {fn: u}) => {
      const {ft: _, Ht: d, Ct: b, dt: y, zt: w} = s || {};
      const S = q && q.tt(t, n, i, e, o);
      const {it: H, ut: E, _t: z} = S || {};
      const [T, j] = getShowNativeOverlaidScrollbars(o, e);
      const [B, F] = o("overflow");
      const X = overflowIsVisible(B.x);
      const Y = overflowIsVisible(B.y);
      const W = true;
      let J = O(a);
      let Q = C(a);
      let Z = I(a);
      let tt = k(a);
      if (j && p) {
        f(G, !T);
      }
      {
        if (hasAttrClass(c, N, U)) {
          setMeasuringMode(true);
        }
        const [t] = E ? E() : [];
        const [n] = J = m(a);
        const [o] = Q = $(a);
        const s = D(l);
        const e = g && getWindowSize(v());
        const r = {
          w: h(o.w + n.w),
          h: h(o.h + n.h)
        };
        const i = {
          w: h((e ? e.w : s.w + h(s.w - o.w)) + n.w),
          h: h((e ? e.h : s.h + h(s.h - o.h)) + n.h)
        };
        t && t();
        tt = M(i);
        Z = x(getOverflowAmount(r, i), a);
      }
      const [nt, ot] = tt;
      const [st, et] = Z;
      const [ct, rt] = Q;
      const [lt, it] = J;
      const [at, ut] = A({
        x: st.w > 0,
        y: st.h > 0
      });
      const _t = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
      const dt = u || b || w || it || rt || ot || et || F || j || W;
      const ft = createViewportOverflowState(at, B);
      const [vt, pt] = R(ft.K);
      const [gt, ht] = V(a);
      const bt = b || y || ht || ut || a;
      const [yt, wt] = bt ? L(getMeasuredScrollCoordinates(gt), a) : P();
      if (dt) {
        pt && setViewportOverflowStyle(ft.K);
        if (z && H) {
          setStyles(l, z(ft, i, H(ft, ct, lt)));
        }
      }
      setMeasuringMode(false);
      addRemoveAttrClass(c, N, U, _t);
      addRemoveAttrClass(r, K, U, _t);
      assignDeep(n, {
        K: vt,
        Vt: {
          x: nt.w,
          y: nt.h
        },
        Rt: {
          x: st.w,
          y: st.h
        },
        rn: at,
        Lt: sanitizeScrollCoordinates(yt, st)
      });
      return {
        en: pt,
        nn: ot,
        sn: et,
        cn: wt || et,
        vn: bt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      ln: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      dn: false,
      rt: {
        [S]: 0,
        [m]: 0,
        [w]: 0,
        [g]: 0,
        [h]: 0,
        [y]: 0,
        [b]: 0
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
        x: E,
        y: E
      },
      rn: {
        x: false,
        y: false
      },
      Lt: getZeroScrollCoordinates()
    };
    const {vt: c, ht: r, nt: l, Ot: i} = n;
    const {R: a, k: u} = getEnvironment();
    const _ = !a && (u.x || u.y);
    const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = _;
      const s = o && getElementScroll(r);
      const e = s && i();
      each(d, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, s);
      e && e();
      !l && scrollElementTo(c, 0);
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s, e) => {
    let c = false;
    const r = createOptionCheck(n, {});
    const [l, i, a, u, _] = createStructureSetup(t);
    const [d, f, v] = createObserversSetup(u, a, r, (t => {
      update({}, t);
    }));
    const [p, g, , h] = createScrollbarsSetup(t, n, v, a, u, e);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, e) => {
      if (o()) {
        return false;
      }
      const {pn: r, Dt: l, At: a, gn: u} = t;
      const _ = r || {};
      const d = !!l || !c;
      const p = {
        It: createOptionCheck(n, _, d),
        pn: _,
        Dt: d
      };
      if (u) {
        g(p);
        return false;
      }
      const h = e || f(assignDeep({}, p, {
        At: a
      }));
      const b = i(assignDeep({}, p, {
        _n: v,
        Zt: h
      }));
      g(assignDeep({}, p, {
        Zt: h,
        tn: b
      }));
      const y = updateHintsAreTruthy(h);
      const w = updateHintsAreTruthy(b);
      const S = y || w || !isEmptyObject(_) || d;
      c = true;
      S && s(t, {
        Zt: h,
        tn: b
      });
      return S;
    };
    return [ () => {
      const {an: t, ht: n, Ot: o} = u;
      const s = getElementScroll(t);
      const e = [ d(), l(), p() ];
      const c = o();
      scrollElementTo(n, s);
      c();
      return bind(runEachAndClear, e);
    }, update, () => ({
      hn: v,
      bn: a
    }), {
      yn: u,
      wn: h
    }, _ ];
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
      const [u, _, d] = createEventListenerHub();
      const [f, v, p] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        p(t, n);
        d(t, n);
      };
      const [g, h, b, y, w] = createSetups(t, a, (() => r), (({pn: t, Dt: n}, {Zt: o, tn: s}) => {
        const {ft: e, Ct: c, xt: r, Ht: l, Et: i, dt: a} = o;
        const {nn: u, sn: _, en: d, cn: f} = s;
        triggerEvent("updated", [ S, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!_,
            overflowStyleChanged: !!d,
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
        _();
        v();
      };
      const S = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              h({
                pn: e
              });
            }
          }
          return assignDeep({}, a);
        },
        on: f,
        off: (t, n) => {
          t && n && v(t, n);
        },
        state() {
          const {hn: t, bn: n} = b();
          const {ct: o} = t;
          const {Vt: s, Rt: e, K: c, rn: l, ln: i, dn: a, Lt: u} = n;
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
          const {vt: t, gt: n, ln: o, ot: s, bt: e, ht: c, Qt: r} = y.yn;
          const {Xt: l, Jt: i} = y.wn;
          const translateScrollbarStructure = t => {
            const {Pt: n, Ut: o, Mt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Yt: n, Wt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                h({
                  gn: true
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
        update: t => h({
          Dt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ w ]);
      addInstance(c, S);
      registerPluginModuleInstances(Ct, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(y.yn.yt, !e && t.cancel)) {
        destroy(true);
        return S;
      }
      push(l, g());
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
    const {M: t, k: n, R: o, V: s, j: e, B: c, U: r, P: l, N: i, q: a} = getEnvironment();
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
