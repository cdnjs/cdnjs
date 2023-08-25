/*!
 * OverlayScrollbars
 * Version: 2.3.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(t) {
  "use strict";
  function each(t, n) {
    if (isArrayLike(t)) {
      for (let o = 0; o < t.length; o++) {
        if (false === n(t[o], o, t)) {
          break;
        }
      }
    } else if (t) {
      each(Object.keys(t), (o => n(t[o], o, t)));
    }
    return t;
  }
  function style(t, n) {
    const o = isString(n);
    const s = isArray(n) || o;
    if (s) {
      let s = o ? "" : {};
      if (t) {
        const e = window.getComputedStyle(t, null);
        s = o ? getCSSVal(t, e, n) : n.reduce(((n, o) => {
          n[o] = getCSSVal(t, e, o);
          return n;
        }), s);
      }
      return s;
    }
    t && each(keys(n), (o => setCSSVal(t, o, n[o])));
  }
  const createCache = (t, n) => {
    const {o: o, u: s, _: e} = t;
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
  const isClient = () => "undefined" !== typeof window;
  const n = isClient() && Node.ELEMENT_NODE;
  const {toString: o, hasOwnProperty: s} = Object.prototype;
  const isUndefined = t => void 0 === t;
  const isNull = t => null === t;
  const type = t => isUndefined(t) || isNull(t) ? `${t}` : o.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  const isNumber = t => "number" === typeof t;
  const isString = t => "string" === typeof t;
  const isBoolean = t => "boolean" === typeof t;
  const isFunction = t => "function" === typeof t;
  const isArray = t => Array.isArray(t);
  const isObject = t => "object" === typeof t && !isArray(t) && !isNull(t);
  const isArrayLike = t => {
    const n = !!t && t.length;
    const o = isNumber(n) && n > -1 && n % 1 == 0;
    return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
  };
  const isPlainObject = t => {
    if (!t || !isObject(t) || "object" !== type(t)) {
      return false;
    }
    let n;
    const o = "constructor";
    const e = t[o];
    const c = e && e.prototype;
    const r = s.call(t, o);
    const l = c && s.call(c, "isPrototypeOf");
    if (e && !r && !l) {
      return false;
    }
    for (n in t) {}
    return isUndefined(n) || s.call(t, n);
  };
  const isHTMLElement = t => {
    const o = HTMLElement;
    return t ? o ? t instanceof o : t.nodeType === n : false;
  };
  const isElement = t => {
    const o = Element;
    return t ? o ? t instanceof o : t.nodeType === n : false;
  };
  const indexOf = (t, n, o) => t.indexOf(n, o);
  const push = (t, n, o) => {
    !o && !isString(n) && isArrayLike(n) ? Array.prototype.push.apply(t, n) : t.push(n);
    return t;
  };
  const from = t => {
    const n = Array.from;
    const o = [];
    if (n && t) {
      return n(t);
    }
    if (t instanceof Set) {
      t.forEach((t => {
        push(o, t);
      }));
    } else {
      each(t, (t => {
        push(o, t);
      }));
    }
    return o;
  };
  const isEmptyArray = t => !!t && 0 === t.length;
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t && t.apply(void 0, n || []);
    each(t, runFn);
    !o && (t.length = 0);
  };
  const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
  const keys = t => t ? Object.keys(t) : [];
  const assignDeep = (t, n, o, s, e, c, r) => {
    const l = [ n, o, s, e, c, r ];
    if (("object" !== typeof t || isNull(t)) && !isFunction(t)) {
      t = {};
    }
    each(l, (n => {
      each(keys(n), (o => {
        const s = n[o];
        if (t === s) {
          return true;
        }
        const e = isArray(s);
        if (s && (isPlainObject(s) || e)) {
          const n = t[o];
          let c = n;
          if (e && !isArray(n)) {
            c = [];
          } else if (!e && !isPlainObject(n)) {
            c = {};
          }
          t[o] = assignDeep(c, s);
        } else {
          t[o] = s;
        }
      }));
    }));
    return t;
  };
  const isEmptyObject = t => {
    for (const n in t) {
      return false;
    }
    return true;
  };
  const getSetProp = (t, n, o, s) => {
    if (isUndefined(s)) {
      return o ? o[t] : n;
    }
    o && (isString(s) || isNumber(s)) && (o[t] = s);
  };
  const attr = (t, n, o) => {
    if (isUndefined(o)) {
      return t ? t.getAttribute(n) : null;
    }
    t && t.setAttribute(n, o);
  };
  const removeAttr = (t, n) => {
    t && t.removeAttribute(n);
  };
  const attrClass = (t, n, o, s) => {
    if (o) {
      const e = attr(t, n) || "";
      const c = new Set(e.split(" "));
      c[s ? "add" : "delete"](o);
      const r = from(c).join(" ").trim();
      attr(t, n, r);
    }
  };
  const hasAttrClass = (t, n, o) => {
    const s = attr(t, n) || "";
    const e = new Set(s.split(" "));
    return e.has(o);
  };
  const scrollLeft = (t, n) => getSetProp("scrollLeft", 0, t, n);
  const scrollTop = (t, n) => getSetProp("scrollTop", 0, t, n);
  const e = isClient() && Element.prototype;
  const find = (t, n) => {
    const o = [];
    const s = n ? isElement(n) ? n : null : document;
    return s ? push(o, s.querySelectorAll(t)) : o;
  };
  const findFirst = (t, n) => {
    const o = n ? isElement(n) ? n : null : document;
    return o ? o.querySelector(t) : null;
  };
  const is = (t, n) => {
    if (isElement(t)) {
      const o = e.matches || e.msMatchesSelector;
      return o.call(t, n);
    }
    return false;
  };
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t ? t.parentElement : null;
  const closest = (t, n) => {
    if (isElement(t)) {
      const o = e.closest;
      if (o) {
        return o.call(t, n);
      }
      do {
        if (is(t, n)) {
          return t;
        }
        t = parent(t);
      } while (t);
    }
    return null;
  };
  const liesBetween = (t, n, o) => {
    const s = t && closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
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
    }
  };
  const appendChildren = (t, n) => {
    before(t, null, n);
  };
  const insertBefore = (t, n) => {
    before(parent(t), t, n);
  };
  const insertAfter = (t, n) => {
    before(parent(t), t && t.nextSibling, n);
  };
  const removeElements = t => {
    if (isArrayLike(t)) {
      each(from(t), (t => removeElements(t)));
    } else if (t) {
      const n = parent(t);
      if (n) {
        n.removeChild(t);
      }
    }
  };
  const createDiv = t => {
    const n = document.createElement("div");
    if (t) {
      attr(n, "class", t);
    }
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    n.innerHTML = t.trim();
    return each(contents(n), (t => removeElements(t)));
  };
  const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);
  const getDummyStyle = () => createDiv().style;
  const c = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  const r = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  const l = {};
  const i = {};
  const cssProperty = t => {
    let n = i[t];
    if (hasOwnProperty(i, t)) {
      return n;
    }
    const o = firstLetterToUpper(t);
    const s = getDummyStyle();
    each(c, (e => {
      const c = e.replace(/-/g, "");
      const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
      return !(n = r.find((t => void 0 !== s[t])));
    }));
    return i[t] = n || "";
  };
  const jsAPI = t => {
    if (isClient()) {
      let n = l[t] || window[t];
      if (hasOwnProperty(l, t)) {
        return n;
      }
      each(r, (o => {
        n = n || window[o + firstLetterToUpper(t)];
        return !n;
      }));
      l[t] = n;
      return n;
    }
  };
  const a = jsAPI("MutationObserver");
  const u = jsAPI("IntersectionObserver");
  const f = jsAPI("ResizeObserver");
  const d = jsAPI("cancelAnimationFrame");
  const _ = jsAPI("requestAnimationFrame");
  const h = jsAPI("ScrollTimeline");
  const g = isClient() && window.setTimeout;
  const v = isClient() && window.clearTimeout;
  const p = /[^\x20\t\r\n\f]+/g;
  const classListAction = (t, n, o) => {
    const s = t && t.classList;
    let e;
    let c = 0;
    let r = false;
    if (s && n && isString(n)) {
      const t = n.match(p) || [];
      r = t.length > 0;
      while (e = t[c++]) {
        r = !!o(s, e) && r;
      }
    }
    return r;
  };
  const removeClass = (t, n) => {
    classListAction(t, n, ((t, n) => t.remove(n)));
  };
  const addClass = (t, n) => {
    classListAction(t, n, ((t, n) => t.add(n)));
    return removeClass.bind(0, t, n);
  };
  const {max: w} = Math;
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, s, e) => {
    let c = 0;
    const r = animationCurrentTime();
    const l = w(0, o);
    const frame = o => {
      const i = animationCurrentTime();
      const a = i - r;
      const u = a >= l;
      const f = o ? 1 : 1 - (w(0, r + l - i) / l || 0);
      const d = (n - t) * (isFunction(e) ? e(f, f * l, 0, 1, l) : f) + t;
      const h = u || 1 === f;
      s && s(d, f, h);
      c = h ? 0 : _((() => frame()));
    };
    frame();
    return t => {
      d(c);
      t && frame(t);
    };
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
  const equalBCRWH = (t, n, o) => equal(t, n, [ "width", "height" ], o && (t => Math.round(t)));
  const noop = () => {};
  const selfClearTimeout = t => {
    let n;
    const o = t ? g : _;
    const s = t ? v : d;
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
    const {g: r, v: l, p: i} = n || {};
    const a = function invokeFunctionToDebounce(n) {
      c();
      v(o);
      o = s = void 0;
      c = noop;
      t.apply(this, n);
    };
    const mergeParms = t => i && s ? i(s, t) : t;
    const flush = () => {
      if (c !== noop) {
        a(mergeParms(e) || e);
      }
    };
    const u = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(r) ? r() : r;
      const i = isNumber(n) && n >= 0;
      if (i) {
        const r = isFunction(l) ? l() : l;
        const i = isNumber(r) && r >= 0;
        const u = n > 0 ? g : _;
        const f = n > 0 ? v : d;
        const h = mergeParms(t);
        const p = h || t;
        const w = a.bind(0, p);
        c();
        const b = u(w, n);
        c = () => f(b);
        if (i && !o) {
          o = g(flush, r);
        }
        s = e = p;
      } else {
        a(t);
      }
    };
    u.m = flush;
    return u;
  };
  const b = {
    opacity: 1,
    zIndex: 1
  };
  const parseToZeroOrNumber = (t, n) => {
    const o = t || "";
    const s = n ? parseFloat(o) : parseInt(o, 10);
    return s === s ? s : 0;
  };
  const adaptCSSVal = (t, n) => !b[t] && isNumber(n) ? `${n}px` : n;
  const getCSSVal = (t, n, o) => String((null != n ? n[o] || n.getPropertyValue(o) : t.style[o]) || "");
  const setCSSVal = (t, n, o) => {
    try {
      const {style: s} = t;
      if (!isUndefined(s[n])) {
        s[n] = adaptCSSVal(n, o);
      } else {
        s.setProperty(n, o);
      }
    } catch (s) {}
  };
  const directionIsRTL = t => "rtl" === style(t, "direction");
  const topRightBottomLeft = (t, n, o) => {
    const s = n ? `${n}-` : "";
    const e = o ? `-${o}` : "";
    const c = `${s}top${e}`;
    const r = `${s}right${e}`;
    const l = `${s}bottom${e}`;
    const i = `${s}left${e}`;
    const a = style(t, [ c, r, l, i ]);
    return {
      t: parseToZeroOrNumber(a[c], true),
      r: parseToZeroOrNumber(a[r], true),
      b: parseToZeroOrNumber(a[l], true),
      l: parseToZeroOrNumber(a[i], true)
    };
  };
  const getTrasformTranslateValue = (t, n) => `translate${isArray(t) ? `(${t[0]},${t[1]})` : `${n ? "X" : "Y"}(${t})`}`;
  const {round: m} = Math;
  const y = {
    w: 0,
    h: 0
  };
  const windowSize = () => ({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const offsetSize = t => t ? {
    w: t.offsetWidth,
    h: t.offsetHeight
  } : y;
  const clientSize = t => t ? {
    w: t.clientWidth,
    h: t.clientHeight
  } : y;
  const scrollSize = t => t ? {
    w: t.scrollWidth,
    h: t.scrollHeight
  } : y;
  const fractionalSize = t => {
    const n = parseFloat(style(t, "height")) || 0;
    const o = parseFloat(style(t, "width")) || 0;
    return {
      w: o - m(o),
      h: n - m(n)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t.height || t.width));
  let S;
  const supportPassiveEvents = () => {
    if (isUndefined(S)) {
      S = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get() {
            S = true;
          }
        }));
      } catch (t) {}
    }
    return S;
  };
  const splitEventNames = t => t.split(" ");
  const off = (t, n, o, s) => {
    each(splitEventNames(n), (n => {
      t.removeEventListener(n, o, s);
    }));
  };
  const on = (t, n, o, s) => {
    var e;
    const c = supportPassiveEvents();
    const r = null != (e = c && s && s.S) ? e : c;
    const l = s && s.$ || false;
    const i = s && s.C || false;
    const a = [];
    const u = c ? {
      passive: r,
      capture: l
    } : l;
    each(splitEventNames(n), (n => {
      const s = i ? e => {
        t.removeEventListener(n, s, l);
        o && o(e);
      } : o;
      push(a, off.bind(null, t, n, s, l));
      t.addEventListener(n, s, u);
    }));
    return runEachAndClear.bind(0, a);
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const $ = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t ? getBoundingClientRect(t) : 0;
    return n ? {
      x: n.left + window.pageYOffset,
      y: n.top + window.pageXOffset
    } : $;
  };
  const manageListener = (t, n) => {
    each(isArray(n) ? n : [ n ], t);
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
        return removeEvent.bind(0, t, o);
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
      return runEachAndClear.bind(0, e);
    };
    const triggerEvent = (t, o) => {
      const s = n.get(t);
      each(from(s), (t => {
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
      throw new Error;
    }
    return n;
  }));
  const x = {
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
    const s = keys(n).concat(keys(t));
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
  const C = `data-overlayscrollbars`;
  const O = "os-environment";
  const T = `${O}-flexbox-glue`;
  const z = `${T}-max`;
  const E = `os-scrollbar-hidden`;
  const A = `${C}-initialize`;
  const I = C;
  const H = `${I}-overflow-x`;
  const L = `${I}-overflow-y`;
  const M = "overflowVisible";
  const P = "scrollbarHidden";
  const D = "scrollbarPressed";
  const R = "updating";
  const k = `${C}-viewport`;
  const B = "arrange";
  const V = "scrollbarHidden";
  const Y = M;
  const j = `${C}-padding`;
  const N = Y;
  const q = `${C}-content`;
  const G = "os-size-observer";
  const F = `${G}-appear`;
  const X = `${G}-listener`;
  const U = `${X}-scroll`;
  const W = `${X}-item`;
  const Z = `${W}-final`;
  const J = "os-trinsic-observer";
  const K = "os-no-css-vars";
  const Q = "os-theme-none";
  const tt = "os-scrollbar";
  const nt = `${tt}-rtl`;
  const ot = `${tt}-horizontal`;
  const st = `${tt}-vertical`;
  const et = `${tt}-track`;
  const ct = `${tt}-handle`;
  const rt = `${tt}-visible`;
  const lt = `${tt}-cornerless`;
  const it = `${tt}-transitionless`;
  const at = `${tt}-interaction`;
  const ut = `${tt}-unusable`;
  const ft = `${tt}-auto-hide`;
  const dt = `${ft}-hidden`;
  const _t = `${tt}-wheel`;
  const ht = `${et}-interactive`;
  const gt = `${ct}-interactive`;
  const vt = {};
  const getPlugins = () => vt;
  const addPlugin = t => {
    const n = [];
    each(isArray(t) ? t : [ t ], (t => {
      const o = keys(t);
      each(o, (o => {
        push(n, vt[o] = t[o]);
      }));
    }));
    return n;
  };
  const pt = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  const wt = pt.number;
  const bt = pt.boolean;
  const mt = [ pt.array, pt.null ];
  const yt = "hidden scroll visible visible-hidden";
  const St = "visible hidden auto";
  const $t = "never scroll leavemove";
  ({
    paddingAbsolute: bt,
    showNativeOverlaidScrollbars: bt,
    update: {
      elementEvents: mt,
      attributes: mt,
      debounce: [ pt.number, pt.array, pt.null ],
      ignoreMutation: [ pt.function, pt.null ]
    },
    overflow: {
      x: yt,
      y: yt
    },
    scrollbars: {
      theme: [ pt.string, pt.null ],
      visibility: St,
      autoHide: $t,
      autoHideDelay: wt,
      autoHideSuspend: bt,
      dragScroll: bt,
      clickScroll: bt,
      pointers: [ pt.array, pt.null ]
    }
  });
  const xt = "__osOptionsValidationPlugin";
  const Ct = 3333333;
  const Ot = "scroll";
  const Tt = "__osSizeObserverPlugin";
  const zt = /* @__PURE__ */ (() => ({
    [Tt]: {
      O: (t, n, o) => {
        const s = createDOM(`<div class="${W}" dir="ltr"><div class="${W}"><div class="${Z}"></div></div><div class="${W}"><div class="${Z}" style="width: 200%; height: 200%"></div></div></div>`);
        appendChildren(t, s);
        addClass(t, U);
        const e = s[0];
        const c = e.lastChild;
        const r = e.firstChild;
        const l = null == r ? void 0 : r.firstChild;
        let i = offsetSize(e);
        let a = i;
        let u = false;
        let f;
        const reset = () => {
          scrollLeft(r, Ct);
          scrollTop(r, Ct);
          scrollLeft(c, Ct);
          scrollTop(c, Ct);
        };
        const onResized = t => {
          f = 0;
          if (u) {
            i = a;
            n(true === t);
          }
        };
        const onScroll = t => {
          a = offsetSize(e);
          u = !t || !equalWH(a, i);
          if (t) {
            stopPropagation(t);
            if (u && !f) {
              d(f);
              f = _(onResized);
            }
          } else {
            onResized(false === t);
          }
          reset();
        };
        const h = push([], [ on(r, Ot, onScroll), on(c, Ot, onScroll) ]);
        style(l, {
          width: Ct,
          height: Ct
        });
        _(reset);
        return [ o ? onScroll.bind(0, false) : reset, h ];
      }
    }
  }))();
  let Et = 0;
  const {round: At, abs: It} = Math;
  const getWindowDPR = () => {
    const t = window.screen.deviceXDPI || 0;
    const n = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || t / n;
  };
  const diffBiggerThanOne = (t, n) => {
    const o = It(t);
    const s = It(n);
    return !(o === s || o + 1 === s || o - 1 === s);
  };
  const Ht = "__osScrollbarsHidingPlugin";
  const Lt = /* @__PURE__ */ (() => ({
    [Ht]: {
      T: t => {
        const {A: n, I: o, H: s} = t;
        const e = !s && !n && (o.x || o.y);
        const c = e ? document.createElement("style") : false;
        if (c) {
          attr(c, "id", `${k}-${B}-${Et}`);
          Et++;
        }
        return c;
      },
      L: (t, n, o, s, e, c, r) => {
        const arrangeViewport = (n, c, r, l) => {
          if (t) {
            const {M: t} = e();
            const {P: i, D: a} = n;
            const {x: u, y: f} = a;
            const {x: d, y: _} = i;
            const h = l ? "paddingRight" : "paddingLeft";
            const g = t[h];
            const v = t.paddingTop;
            const p = c.w + r.w;
            const w = c.h + r.h;
            const b = {
              w: _ && f ? `${_ + p - g}px` : "",
              h: d && u ? `${d + w - v}px` : ""
            };
            if (s) {
              const {sheet: t} = s;
              if (t) {
                const {cssRules: n} = t;
                if (n) {
                  if (!n.length) {
                    t.insertRule(`#${attr(s, "id")} + [${k}~='${B}']::before {}`, 0);
                  }
                  const o = n[0].style;
                  o.width = b.w;
                  o.height = b.h;
                }
              }
            } else {
              style(o, {
                "--os-vaw": b.w,
                "--os-vah": b.h
              });
            }
          }
          return t;
        };
        const undoViewportArrange = (s, l, i) => {
          if (t) {
            const a = i || c(s);
            const {M: u} = e();
            const {D: f} = a;
            const {x: d, y: _} = f;
            const h = {};
            const assignProps = t => each(t.split(" "), (t => {
              h[t] = u[t];
            }));
            if (d) {
              assignProps("marginBottom paddingTop paddingBottom");
            }
            if (_) {
              assignProps("marginLeft marginRight paddingLeft paddingRight");
            }
            const g = style(o, keys(h));
            attrClass(o, k, B);
            if (!n) {
              h.height = "";
            }
            style(o, h);
            return [ () => {
              r(a, l, t, g);
              style(o, g);
              attrClass(o, k, B, true);
            }, a ];
          }
          return [ noop ];
        };
        return [ arrangeViewport, undoViewportArrange ];
      },
      R: () => {
        let t = {
          w: 0,
          h: 0
        };
        let n = 0;
        return (o, s, e) => {
          const c = windowSize();
          const r = {
            w: c.w - t.w,
            h: c.h - t.h
          };
          if (0 === r.w && 0 === r.h) {
            return;
          }
          const l = {
            w: It(r.w),
            h: It(r.h)
          };
          const i = {
            w: It(At(c.w / (t.w / 100))),
            h: It(At(c.h / (t.h / 100)))
          };
          const a = getWindowDPR();
          const u = l.w > 2 && l.h > 2;
          const f = !diffBiggerThanOne(i.w, i.h);
          const d = a !== n && a > 0;
          const _ = u && f && d;
          if (_) {
            const [t, n] = s();
            assignDeep(o.k, t);
            if (n) {
              e();
            }
          }
          t = c;
          n = a;
        };
      }
    }
  }))();
  const Mt = "__osClickScrollPlugin";
  const Pt = /* @__PURE__ */ (() => ({
    [Mt]: {
      O: (t, n, o, s, e) => {
        let c = 0;
        let r = noop;
        const animateClickScroll = l => {
          r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
            t(o);
            const a = n();
            const u = a + s;
            const f = e >= a && e <= u;
            if (i && !f) {
              if (c) {
                animateClickScroll(o);
              } else {
                const t = setTimeout((() => {
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
  let Dt;
  const getNativeScrollbarSize = (t, n, o, s) => {
    appendChildren(t, n);
    const e = clientSize(n);
    const c = offsetSize(n);
    const r = fractionalSize(o);
    s && removeElements(n);
    return {
      x: c.h - e.h + r.h,
      y: c.w - e.w + r.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, E);
    try {
      n = "none" === style(t, cssProperty("scrollbar-width")) || "none" === window.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display");
    } catch (s) {}
    o();
    return n;
  };
  const getRtlScrollBehavior = (t, n) => {
    const o = "hidden";
    style(t, {
      overflowX: o,
      overflowY: o,
      direction: "rtl"
    });
    scrollLeft(t, 0);
    const s = absoluteCoordinates(t);
    const e = absoluteCoordinates(n);
    scrollLeft(t, -999);
    const c = absoluteCoordinates(n);
    return {
      i: s.x === e.x,
      n: e.x !== c.x
    };
  };
  const getFlexboxGlue = (t, n) => {
    const o = addClass(t, T);
    const s = getBoundingClientRect(t);
    const e = getBoundingClientRect(n);
    const c = equalBCRWH(e, s, true);
    const r = addClass(t, z);
    const l = getBoundingClientRect(t);
    const i = getBoundingClientRect(n);
    const a = equalBCRWH(i, l, true);
    o();
    r();
    return c && a;
  };
  const createEnvironment = () => {
    const {body: t} = document;
    const n = createDOM(`<div class="${O}"><div></div></div>`);
    const o = n[0];
    const s = o.firstChild;
    const [e, , c] = createEventListenerHub();
    const [r, l] = createCache({
      o: getNativeScrollbarSize(t, o, s),
      u: equalXY
    }, getNativeScrollbarSize.bind(0, t, o, s, true));
    const [i] = l();
    const a = getNativeScrollbarsHiding(o);
    const u = {
      x: 0 === i.x,
      y: 0 === i.y
    };
    const f = {
      elements: {
        host: null,
        padding: !a,
        viewport: t => a && t === t.ownerDocument.body && t,
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
    const d = assignDeep({}, x);
    const _ = assignDeep.bind(0, {}, d);
    const g = assignDeep.bind(0, {}, f);
    const v = {
      k: i,
      I: u,
      A: a,
      H: "-1" === style(o, "zIndex"),
      B: !!h,
      V: getRtlScrollBehavior(o, s),
      Y: getFlexboxGlue(o, s),
      j: e.bind(0, "z"),
      N: e.bind(0, "r"),
      q: g,
      G: t => assignDeep(f, t) && g(),
      F: _,
      X: t => assignDeep(d, t) && _(),
      U: assignDeep({}, f),
      W: assignDeep({}, d)
    };
    const p = window.addEventListener;
    const w = debounce((t => c(t ? "z" : "r")), {
      g: 33,
      v: 99
    });
    removeAttr(o, "style");
    removeElements(o);
    p("resize", w.bind(0, false));
    if (!a && (!u.x || !u.y)) {
      let t;
      p("resize", (() => {
        const n = getPlugins()[Ht];
        t = t || n && n.R();
        t && t(v, r, w.bind(0, true));
      }));
    }
    return v;
  };
  const getEnvironment = () => {
    if (!Dt) {
      Dt = createEnvironment();
    }
    return Dt;
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
  const cancelInitialization = (t, n, o) => {
    const {nativeScrollbarsOverlaid: s, body: e} = o || {};
    const {I: c, A: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = n;
    const a = null != s ? s : l;
    const u = isUndefined(e) ? i : e;
    const f = (c.x || c.y) && a;
    const d = t && (isNull(u) ? !r : u);
    return !!f || !!d;
  };
  const Rt = new WeakMap;
  const addInstance = (t, n) => {
    Rt.set(t, n);
  };
  const removeInstance = t => {
    Rt.delete(t);
  };
  const getInstance = t => Rt.get(t);
  const getPropByPath = (t, n) => t ? n.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || void 0 !== getPropByPath(n, s) ];
  const createState = t => {
    let n = t;
    return [ () => n, t => {
      n = assignDeep({}, n, t);
    } ];
  };
  const kt = "tabindex";
  const Bt = createDiv.bind(0, "");
  const unwrap = t => {
    appendChildren(parent(t), contents(t));
    removeElements(t);
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {q: o, A: s} = n;
    const e = getPlugins()[Ht];
    const c = e && e.T;
    const {elements: r} = o();
    const {host: l, padding: i, viewport: a, content: u} = r;
    const f = isHTMLElement(t);
    const d = f ? {} : t;
    const {elements: _} = d;
    const {host: h, padding: g, viewport: v, content: p} = _ || {};
    const w = f ? t : d.target;
    const b = is(w, "textarea");
    const m = w.ownerDocument;
    const y = m.documentElement;
    const S = w === m.body;
    const $ = m.defaultView;
    const x = staticInitializationElement.bind(0, [ w ]);
    const C = dynamicInitializationElement.bind(0, [ w ]);
    const O = resolveInitialization.bind(0, [ w ]);
    const T = x.bind(0, Bt, a);
    const z = C.bind(0, Bt, u);
    const M = T(v);
    const P = M === w;
    const D = P && S;
    const R = !P && z(p);
    const B = !P && isHTMLElement(M) && M === R;
    const Y = B && !!O(u);
    const N = Y ? T() : M;
    const G = Y ? R : z();
    const F = B ? N : M;
    const X = D ? y : F;
    const U = b ? x(Bt, l, h) : w;
    const W = D ? X : U;
    const Z = B ? G : R;
    const J = m.activeElement;
    const K = !P && $.top === $ && J === w;
    const Q = {
      Z: w,
      J: W,
      K: X,
      tt: !P && C(Bt, i, g),
      nt: Z,
      ot: !P && !s && c && c(n),
      st: D ? y : X,
      et: D ? m : X,
      ct: $,
      rt: m,
      lt: b,
      it: S,
      ut: f,
      ft: P,
      dt: B,
      _t: (t, n) => hasAttrClass(X, P ? I : k, P ? n : t),
      ht: (t, n, o) => attrClass(X, P ? I : k, P ? n : t, o)
    };
    const tt = keys(Q).reduce(((t, n) => {
      const o = Q[n];
      return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? indexOf(tt, t) > -1 : null;
    const {Z: nt, J: ot, tt: st, K: et, nt: ct, ot: rt} = Q;
    const lt = [ () => {
      removeAttr(ot, I);
      removeAttr(ot, A);
      removeAttr(nt, A);
      if (S) {
        removeAttr(y, I);
        removeAttr(y, A);
      }
    } ];
    const it = b && elementIsGenerated(ot);
    let at = b ? nt : contents([ ct, et, st, ot, nt ].find((t => false === elementIsGenerated(t))));
    const ut = D ? nt : ct || et;
    const appendElements = () => {
      attr(ot, I, P ? "viewport" : "host");
      attr(st, j, "");
      attr(ct, q, "");
      if (!P) {
        attr(et, k, "");
      }
      const t = S && !P ? addClass(parent(w), E) : noop;
      if (it) {
        insertAfter(nt, ot);
        push(lt, (() => {
          insertAfter(ot, nt);
          removeElements(ot);
        }));
      }
      appendChildren(ut, at);
      appendChildren(ot, st);
      appendChildren(st || ot, !P && et);
      appendChildren(et, ct);
      push(lt, (() => {
        t();
        removeAttr(st, j);
        removeAttr(ct, q);
        removeAttr(et, H);
        removeAttr(et, L);
        removeAttr(et, k);
        if (elementIsGenerated(ct)) {
          unwrap(ct);
        }
        if (elementIsGenerated(et)) {
          unwrap(et);
        }
        if (elementIsGenerated(st)) {
          unwrap(st);
        }
      }));
      if (s && !P) {
        attrClass(et, k, V, true);
        push(lt, removeAttr.bind(0, et, k));
      }
      if (rt) {
        insertBefore(et, rt);
        push(lt, removeElements.bind(0, rt));
      }
      if (K) {
        const t = attr(et, kt);
        attr(et, kt, "-1");
        et.focus();
        const revertViewportTabIndex = () => t ? attr(et, kt, t) : removeAttr(et, kt);
        const n = on(m, "pointerdown keydown", (() => {
          revertViewportTabIndex();
          n();
        }));
        push(lt, [ revertViewportTabIndex, n ]);
      } else if (J && J.focus) {
        J.focus();
      }
      at = 0;
    };
    return [ Q, appendElements, runEachAndClear.bind(0, lt) ];
  };
  const createTrinsicUpdateSegment = (t, n) => {
    const {nt: o} = t;
    const [s] = n;
    return t => {
      const {Y: n} = getEnvironment();
      const {gt: e} = s();
      const {vt: c} = t;
      const r = (o || !n) && c;
      if (r) {
        style(o, {
          height: e ? "" : "100%"
        });
      }
      return {
        wt: r,
        bt: r
      };
    };
  };
  const createPaddingUpdateSegment = (t, n) => {
    const [o, s] = n;
    const {J: e, tt: c, K: r, ft: l} = t;
    const [i, a] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, topRightBottomLeft.bind(0, e, "padding", ""));
    return (t, n, e) => {
      let [u, f] = a(e);
      const {A: d, Y: _} = getEnvironment();
      const {yt: h} = o();
      const {wt: g, bt: v, St: p} = t;
      const [w, b] = n("paddingAbsolute");
      const m = !_ && v;
      if (g || f || m) {
        [u, f] = i(e);
      }
      const y = !l && (b || p || f);
      if (y) {
        const t = !w || !c && !d;
        const n = u.r + u.l;
        const o = u.t + u.b;
        const e = {
          marginRight: t && !h ? -n : 0,
          marginBottom: t ? -o : 0,
          marginLeft: t && h ? -n : 0,
          top: t ? -u.t : 0,
          right: t ? h ? -u.r : "auto" : 0,
          left: t ? h ? "auto" : -u.l : 0,
          width: t ? `calc(100% + ${n}px)` : ""
        };
        const l = {
          paddingTop: t ? u.t : 0,
          paddingRight: t ? u.r : 0,
          paddingBottom: t ? u.b : 0,
          paddingLeft: t ? u.l : 0
        };
        style(c || r, e);
        style(r, l);
        s({
          tt: u,
          $t: !t,
          M: c ? l : assignDeep({}, e, l)
        });
      }
      return {
        xt: y
      };
    };
  };
  const {max: Vt} = Math;
  const Yt = Vt.bind(0, 0);
  const jt = "visible";
  const Nt = "hidden";
  const qt = 42;
  const Gt = {
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const Ft = {
    u: equalXY,
    o: {
      x: Nt,
      y: Nt
    }
  };
  const getOverflowAmount = (t, n) => {
    const o = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const s = {
      w: Yt(t.w - n.w),
      h: Yt(t.h - n.h)
    };
    return {
      w: s.w > o ? s.w : 0,
      h: s.h > o ? s.h : 0
    };
  };
  const overflowIsVisible = t => 0 === t.indexOf(jt);
  const createOverflowUpdateSegment = (t, n) => {
    const [o, s] = n;
    const {J: e, tt: c, K: r, ot: l, ft: i, ht: a, it: u, ct: f} = t;
    const {k: d, Y: _, A: h, I: g} = getEnvironment();
    const v = getPlugins()[Ht];
    const p = !i && !h && (g.x || g.y);
    const w = u && i;
    const [b, m] = createCache(Gt, fractionalSize.bind(0, r));
    const [y, S] = createCache(Gt, scrollSize.bind(0, r));
    const [$, x] = createCache(Gt);
    const [C, O] = createCache(Gt);
    const [T] = createCache(Ft);
    const fixFlexboxGlue = (t, n) => {
      style(r, {
        height: ""
      });
      if (n) {
        const {$t: n, tt: s} = o();
        const {Ct: c, P: l} = t;
        const i = fractionalSize(e);
        const a = clientSize(e);
        const u = "content-box" === style(r, "boxSizing");
        const f = n || u ? s.b + s.t : 0;
        const d = !(g.x && u);
        style(r, {
          height: a.h + i.h + (c.x && d ? l.x : 0) - f
        });
      }
    };
    const getViewportOverflowState = (t, n) => {
      const o = !h && !t ? qt : 0;
      const getStatePerAxis = (t, s, e) => {
        const c = style(r, t);
        const l = n ? n[t] : c;
        const i = "scroll" === l;
        const a = s ? o : e;
        const u = i && !h ? a : 0;
        const f = s && !!o;
        return [ c, i, u, f ];
      };
      const [s, e, c, l] = getStatePerAxis("overflowX", g.x, d.x);
      const [i, a, u, f] = getStatePerAxis("overflowY", g.y, d.y);
      return {
        Ot: {
          x: s,
          y: i
        },
        Ct: {
          x: e,
          y: a
        },
        P: {
          x: c,
          y: u
        },
        D: {
          x: l,
          y: f
        }
      };
    };
    const setViewportOverflowState = (t, n, o, s) => {
      const setAxisOverflowStyle = (t, n) => {
        const o = overflowIsVisible(t);
        const s = n && o && t.replace(`${jt}-`, "") || "";
        return [ n && !o ? t : "", overflowIsVisible(s) ? "hidden" : s ];
      };
      const [e, c] = setAxisOverflowStyle(o.x, n.x);
      const [r, l] = setAxisOverflowStyle(o.y, n.y);
      s.overflowX = c && r ? c : e;
      s.overflowY = l && e ? l : r;
      return getViewportOverflowState(t, s);
    };
    const hideNativeScrollbars = (t, n, s, e) => {
      const {P: c, D: r} = t;
      const {x: l, y: i} = r;
      const {x: a, y: u} = c;
      const {M: f} = o();
      const d = n ? "marginLeft" : "marginRight";
      const _ = n ? "paddingLeft" : "paddingRight";
      const h = f[d];
      const g = f.marginBottom;
      const v = f[_];
      const p = f.paddingBottom;
      e.width = `calc(100% + ${u + -1 * h}px)`;
      e[d] = -u + h;
      e.marginBottom = -a + g;
      if (s) {
        e[_] = v + (i ? u : 0);
        e.paddingBottom = p + (l ? a : 0);
      }
    };
    const [z, E] = v ? v.L(p, _, r, l, o, getViewportOverflowState, hideNativeScrollbars) : [ () => p, () => [ noop ] ];
    return (t, n, l) => {
      const {wt: u, Tt: d, bt: v, xt: p, vt: A, St: D} = t;
      const {gt: R, yt: B} = o();
      const [q, G] = n("showNativeOverlaidScrollbars");
      const [F, X] = n("overflow");
      const U = q && g.x && g.y;
      const W = !i && !_ && (u || v || d || G || A);
      const Z = overflowIsVisible(F.x);
      const J = overflowIsVisible(F.y);
      const K = Z || J;
      let Q = m(l);
      let tt = S(l);
      let nt = x(l);
      let ot = O(l);
      let st;
      if (G && h) {
        a(V, P, !U);
      }
      if (W) {
        st = getViewportOverflowState(U);
        fixFlexboxGlue(st, R);
      }
      if (u || p || v || D || G) {
        if (K) {
          a(Y, M, false);
        }
        const [t, n] = E(U, B, st);
        const [o, s] = Q = b(l);
        const [e, c] = tt = y(l);
        const i = clientSize(r);
        let u = e;
        let d = i;
        t();
        if ((c || s || G) && n && !U && z(n, e, o, B)) {
          d = clientSize(r);
          u = scrollSize(r);
        }
        const _ = {
          w: Yt(Vt(e.w, u.w) + o.w),
          h: Yt(Vt(e.h, u.h) + o.h)
        };
        const h = {
          w: Yt((w ? f.innerWidth : d.w + Yt(i.w - e.w)) + o.w),
          h: Yt((w ? f.innerHeight + o.h : d.h + Yt(i.h - e.h)) + o.h)
        };
        ot = C(h);
        nt = $(getOverflowAmount(_, h), l);
      }
      const [et, ct] = ot;
      const [rt, lt] = nt;
      const [it, at] = tt;
      const [ut, ft] = Q;
      const dt = {
        x: rt.w > 0,
        y: rt.h > 0
      };
      const _t = Z && J && (dt.x || dt.y) || Z && dt.x && !dt.y || J && dt.y && !dt.x;
      if (p || D || ft || at || ct || lt || X || G || W) {
        const t = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        const n = setViewportOverflowState(U, dt, F, t);
        const o = z(n, it, ut, B);
        if (!i) {
          hideNativeScrollbars(n, B, o, t);
        }
        if (W) {
          fixFlexboxGlue(n, R);
        }
        if (i) {
          attr(e, H, t.overflowX);
          attr(e, L, t.overflowY);
        } else {
          style(r, t);
        }
      }
      attrClass(e, I, M, _t);
      attrClass(c, j, N, _t);
      if (!i) {
        attrClass(r, k, Y, K);
      }
      const [ht, gt] = T(getViewportOverflowState(U).Ot);
      s({
        Ot: ht,
        zt: {
          x: et.w,
          y: et.h
        },
        Et: {
          x: rt.w,
          y: rt.h
        },
        At: dt
      });
      return {
        It: gt,
        Ht: ct,
        Lt: lt
      };
    };
  };
  const prepareUpdateHints = (t, n, o) => {
    const s = {};
    const e = n || {};
    const c = keys(t).concat(keys(e));
    each(c, (n => {
      const c = t[n];
      const r = e[n];
      s[n] = !!(o || c || r);
    }));
    return s;
  };
  const createStructureSetupUpdate = (t, n) => {
    const {Z: o, K: s, ht: e, ft: c} = t;
    const {A: r, I: l, Y: i} = getEnvironment();
    const a = !r && (l.x || l.y);
    const u = [ createTrinsicUpdateSegment(t, n), createPaddingUpdateSegment(t, n), createOverflowUpdateSegment(t, n) ];
    return (t, n, r) => {
      const l = prepareUpdateHints(assignDeep({
        wt: false,
        xt: false,
        St: false,
        vt: false,
        Ht: false,
        Lt: false,
        It: false,
        Tt: false,
        bt: false,
        Mt: false
      }, n), {}, r);
      const f = a || !i;
      const d = f && scrollLeft(s);
      const _ = f && scrollTop(s);
      e("", R, true);
      let h = l;
      each(u, (n => {
        h = prepareUpdateHints(h, n(h, t, !!r) || {}, r);
      }));
      scrollLeft(s, d);
      scrollTop(s, _);
      e("", R);
      if (!c) {
        scrollLeft(o, 0);
        scrollTop(o, 0);
      }
      return h;
    };
  };
  const createEventContentChange = (t, n, o) => {
    let s;
    let e = false;
    const destroy = () => {
      e = true;
    };
    const updateElements = c => {
      if (o) {
        const r = o.reduce(((n, o) => {
          if (o) {
            const [s, e] = o;
            const r = e && s && (c ? c(s) : find(s, t));
            if (r && r.length && e && isString(e)) {
              push(n, [ r, e.trim() ], true);
            }
          }
          return n;
        }), []);
        each(r, (o => each(o[0], (c => {
          const r = o[1];
          const l = s.get(c) || [];
          const i = t.contains(c);
          if (i) {
            const t = on(c, r, (o => {
              if (e) {
                t();
                s.delete(c);
              } else {
                n(o);
              }
            }));
            s.set(c, push(l, t));
          } else {
            runEachAndClear(l);
            s.delete(c);
          }
        }))));
      }
    };
    if (o) {
      s = new WeakMap;
      updateElements();
    }
    return [ destroy, updateElements ];
  };
  const createDOMObserver = (t, n, o, s) => {
    let e = false;
    const {Pt: c, Dt: r, Rt: l, kt: i, Bt: u, Vt: f} = s || {};
    const d = debounce((() => {
      if (e) {
        o(true);
      }
    }), {
      g: 33,
      v: 99
    });
    const [_, h] = createEventContentChange(t, d, l);
    const g = c || [];
    const v = r || [];
    const p = g.concat(v);
    const observerCallback = (e, c) => {
      const r = u || noop;
      const l = f || noop;
      const a = new Set;
      const d = new Set;
      let _ = false;
      let g = false;
      each(e, (o => {
        const {attributeName: e, target: c, type: u, oldValue: f, addedNodes: h, removedNodes: p} = o;
        const w = "attributes" === u;
        const b = "childList" === u;
        const m = t === c;
        const y = w && isString(e) ? attr(c, e) : 0;
        const S = 0 !== y && f !== y;
        const $ = indexOf(v, e) > -1 && S;
        if (n && (b || !m)) {
          const n = !w;
          const u = w && S;
          const d = u && i && is(c, i);
          const _ = d ? !r(c, e, f, y) : n || u;
          const v = _ && !l(o, !!d, t, s);
          each(h, (t => a.add(t)));
          each(p, (t => a.add(t)));
          g = g || v;
        }
        if (!n && m && S && !r(c, e, f, y)) {
          d.add(e);
          _ = _ || $;
        }
      }));
      if (a.size > 0) {
        h((t => from(a).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
      }
      if (n) {
        !c && g && o(false);
        return [ false ];
      }
      if (d.size > 0 || _) {
        const t = [ from(d), _ ];
        !c && o.apply(0, t);
        return t;
      }
    };
    const w = new a((t => observerCallback(t)));
    w.observe(t, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: p,
      subtree: n,
      childList: n,
      characterData: n
    });
    e = true;
    return [ () => {
      if (e) {
        _();
        w.disconnect();
        e = false;
      }
    }, () => {
      if (e) {
        d.m();
        const t = w.takeRecords();
        return !isEmptyArray(t) && observerCallback(t, true);
      }
    } ];
  };
  const Xt = 3333333;
  const createSizeObserver = (t, n, o) => {
    const {Yt: s = false, Mt: e = false} = o || {};
    const c = getPlugins()[Tt];
    const {V: r} = getEnvironment();
    const l = createDOM(`<div class="${G}"><div class="${X}"></div></div>`);
    const i = l[0];
    const a = i.firstChild;
    const u = directionIsRTL.bind(0, t);
    const [d] = createCache({
      o: void 0,
      _: true,
      u: (t, n) => !(!t || !domRectHasDimensions(t) && domRectHasDimensions(n))
    });
    const onSizeChangedCallbackProxy = t => {
      const o = isArray(t) && t.length > 0 && isObject(t[0]);
      const e = !o && isBoolean(t[0]);
      let c = false;
      let l = false;
      let a = true;
      if (o) {
        const [n, , o] = d(t.pop().contentRect);
        const s = domRectHasDimensions(n);
        const e = domRectHasDimensions(o);
        const r = !o;
        c = r && !!e || !s;
        l = !e && s;
        a = !c;
      } else if (e) {
        [, a] = t;
      } else {
        l = true === t;
      }
      if (s && a) {
        const n = e ? t[0] : directionIsRTL(i);
        scrollLeft(i, n ? r.n ? -Xt : r.i ? 0 : Xt : Xt);
        scrollTop(i, Xt);
      }
      if (!c) {
        n({
          wt: !e,
          jt: e ? t : void 0,
          Mt: !!l
        });
      }
    };
    const _ = [];
    let h = e ? onSizeChangedCallbackProxy : false;
    return [ () => {
      runEachAndClear(_);
      removeElements(i);
    }, () => {
      if (f) {
        const t = new f(onSizeChangedCallbackProxy);
        t.observe(a);
        push(_, (() => {
          t.disconnect();
        }));
      } else if (c) {
        const [t, n] = c.O(a, onSizeChangedCallbackProxy, e);
        h = t;
        push(_, n);
      }
      if (s) {
        const [t] = createCache({
          o: void 0
        }, u);
        push(_, on(i, "scroll", (n => {
          const o = t();
          const [s, e, c] = o;
          if (e) {
            removeClass(a, "ltr rtl");
            if (s) {
              addClass(a, "rtl");
            } else {
              addClass(a, "ltr");
            }
            onSizeChangedCallbackProxy([ !!s, e, c ]);
          }
          stopPropagation(n);
        })));
      }
      if (h) {
        addClass(i, F);
        push(_, on(i, "animationstart", h, {
          C: !!f
        }));
      }
      if (f || c) {
        appendChildren(t, i);
      }
    } ];
  };
  const isHeightIntrinsic = t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0;
  const createTrinsicObserver = (t, n) => {
    let o;
    const s = createDiv(J);
    const e = [];
    const [c] = createCache({
      o: false
    });
    const triggerOnTrinsicChangedCallback = (t, o) => {
      if (t) {
        const s = c(isHeightIntrinsic(t));
        const [, e] = s;
        if (e) {
          !o && n(s);
          return [ s ];
        }
      }
    };
    const intersectionObserverCallback = (t, n) => {
      if (t && t.length > 0) {
        return triggerOnTrinsicChangedCallback(t.pop(), n);
      }
    };
    return [ () => {
      runEachAndClear(e);
      removeElements(s);
    }, () => {
      if (u) {
        o = new u((t => intersectionObserverCallback(t)), {
          root: t
        });
        o.observe(s);
        push(e, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = offsetSize(s);
          triggerOnTrinsicChangedCallback(t);
        };
        const [t, n] = createSizeObserver(s, onSizeChanged);
        push(e, t);
        n();
        onSizeChanged();
      }
      appendChildren(t, s);
    }, () => {
      if (o) {
        return intersectionObserverCallback(o.takeRecords(), true);
      }
    } ];
  };
  const Ut = `[${I}]`;
  const Wt = `[${k}]`;
  const Zt = [ "tabindex" ];
  const Jt = [ "wrap", "cols", "rows" ];
  const Kt = [ "id", "class", "style", "open" ];
  const createStructureSetupObservers = (t, n, o) => {
    let s;
    let e;
    let c;
    const {J: r, K: l, nt: i, lt: a, ft: u, _t: d, ht: _} = t;
    const {Y: h} = getEnvironment();
    const [g] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const t = d(Y, M);
      const n = d(B, "");
      const o = n && scrollLeft(l);
      const s = n && scrollTop(l);
      _(Y, M);
      _(B, "");
      _("", R, true);
      const e = scrollSize(i);
      const c = scrollSize(l);
      const r = fractionalSize(l);
      _(Y, M, t);
      _(B, "", n);
      _("", R);
      scrollLeft(l, o);
      scrollTop(l, s);
      return {
        w: c.w + e.w + r.w,
        h: c.h + e.h + r.h
      };
    }));
    const v = a ? Jt : Kt.concat(Jt);
    const p = debounce(o, {
      g: () => s,
      v: () => e,
      p(t, n) {
        const [o] = t;
        const [s] = n;
        return [ keys(o).concat(keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const updateViewportAttrsFromHost = t => {
      each(t || Zt, (t => {
        if (indexOf(Zt, t) > -1) {
          const n = attr(r, t);
          if (isString(n)) {
            attr(l, t, n);
          } else {
            removeAttr(l, t);
          }
        }
      }));
    };
    const onTrinsicChanged = (t, s) => {
      const [e, c] = t;
      const r = {
        vt: c
      };
      n({
        gt: e
      });
      !s && o(r);
      return r;
    };
    const onSizeChanged = ({wt: t, jt: s, Mt: e}) => {
      const c = !t || e ? o : p;
      let r = false;
      if (s) {
        const [t, o] = s;
        r = o;
        n({
          yt: t
        });
      }
      c({
        wt: t,
        Mt: e,
        St: r
      });
    };
    const onContentMutation = (t, n) => {
      const [, s] = g();
      const e = {
        bt: s
      };
      const c = t ? o : p;
      if (s) {
        !n && c(e);
      }
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Tt: n
      };
      if (n) {
        !o && p(s);
      } else if (!u) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const [w, b, m] = i || !h ? createTrinsicObserver(r, onTrinsicChanged) : [ noop, noop, noop ];
    const [y, S] = !u ? createSizeObserver(r, onSizeChanged, {
      Mt: true,
      Yt: true
    }) : [ noop, noop ];
    const [$, x] = createDOMObserver(r, false, onHostMutation, {
      Dt: Kt,
      Pt: Kt.concat(Zt)
    });
    let C;
    const O = u && f && new f((t => {
      const n = t[t.length - 1].contentRect;
      const o = domRectHasDimensions(n);
      const s = domRectHasDimensions(C);
      const e = !s && o;
      onSizeChanged({
        wt: true,
        Mt: e
      });
      C = n;
    }));
    return [ () => {
      w();
      y();
      c && c[0]();
      O && O.disconnect();
      $();
    }, () => {
      O && O.observe(r);
      updateViewportAttrsFromHost();
      S();
      b();
    }, () => {
      const t = {};
      const n = x();
      const o = m();
      const s = c && c[1]();
      if (n) {
        assignDeep(t, onHostMutation.apply(0, push(n, true)));
      }
      if (o) {
        assignDeep(t, onTrinsicChanged.apply(0, push(o, true)));
      }
      if (s) {
        assignDeep(t, onContentMutation.apply(0, push(s, true)));
      }
      return t;
    }, t => {
      const [n] = t("update.ignoreMutation");
      const [o, r] = t("update.attributes");
      const [a, f] = t("update.elementEvents");
      const [d, _] = t("update.debounce");
      const h = f || r;
      const ignoreMutationFromOptions = t => isFunction(n) && n(t);
      if (h) {
        if (c) {
          c[1]();
          c[0]();
        }
        c = createDOMObserver(i || l, true, onContentMutation, {
          Pt: v.concat(o || []),
          Rt: a,
          kt: Ut,
          Vt: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !u ? liesBetween(o, Ut, Wt) : false;
            return e || !!closest(o, `.${tt}`) || !!ignoreMutationFromOptions(t);
          }
        });
      }
      if (_) {
        p.m();
        if (isArray(d)) {
          const t = d[0];
          const n = d[1];
          s = isNumber(t) && t;
          e = isNumber(n) && n;
        } else if (isNumber(d)) {
          s = d;
          e = false;
        } else {
          s = false;
          e = false;
        }
      }
    } ];
  };
  const Qt = {
    x: 0,
    y: 0
  };
  const createInitialStructureSetupUpdateState = t => ({
    tt: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    $t: false,
    M: {
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0
    },
    zt: Qt,
    Et: Qt,
    Ot: {
      x: "hidden",
      y: "hidden"
    },
    At: {
      x: false,
      y: false
    },
    gt: false,
    yt: directionIsRTL(t.J)
  });
  const createStructureSetup = (t, n) => {
    const o = createOptionCheck(n, {});
    const [s, e, c] = createEventListenerHub();
    const [r, l, i] = createStructureSetupElements(t);
    const a = createState(createInitialStructureSetupUpdateState(r));
    const [u, f] = a;
    const d = createStructureSetupUpdate(r, a);
    const triggerUpdateEvent = (t, n, o) => {
      const s = keys(t).some((n => !!t[n]));
      const e = s || !isEmptyObject(n) || o;
      if (e) {
        c("u", [ t, n, o ]);
      }
      return e;
    };
    const [_, h, g, v] = createStructureSetupObservers(r, f, (t => triggerUpdateEvent(d(o, t), {}, false)));
    const p = u.bind(0);
    p.Nt = t => s("u", t);
    p.qt = () => {
      const {Z: t, K: n, rt: o, it: s} = r;
      const e = s ? o.documentElement : t;
      const c = scrollLeft(e);
      const i = scrollTop(e);
      h();
      l();
      scrollLeft(n, c);
      scrollTop(n, i);
    };
    p.Gt = r;
    return [ (t, o) => {
      const s = createOptionCheck(n, t, o);
      v(s);
      return triggerUpdateEvent(d(s, g(), o), t, !!o);
    }, p, () => {
      e();
      _();
      i();
    } ];
  };
  const {round: tn} = Math;
  const getScale = t => {
    const {width: n, height: o} = getBoundingClientRect(t);
    const {w: s, h: e} = offsetSize(t);
    return {
      x: tn(n) / s || 1,
      y: tn(o) / e || 1
    };
  };
  const continuePointerDown = (t, n, o) => {
    const s = n.scrollbars;
    const {button: e, isPrimary: c, pointerType: r} = t;
    const {pointers: l} = s;
    return 0 === e && c && s[o ? "dragScroll" : "clickScroll"] && (l || []).includes(r);
  };
  const nn = "pointerup pointerleave pointercancel lostpointercapture";
  const getScrollTimelineAnimation = t => ({
    transform: [ getTrasformTranslateValue(`0%`, t), getTrasformTranslateValue("-100%", t) ],
    [t ? "left" : "top"]: [ "0%", "100%" ]
  });
  const createRootClickStopPropagationEvents = (t, n) => on(t, "mousedown", on.bind(0, n, "click", stopPropagation, {
    C: true,
    $: true
  }), {
    $: true
  });
  const createInteractiveScrollEvents = (t, n, o, s, e, c, r) => {
    const {V: l} = getEnvironment();
    const {Ft: i, Xt: a, Ut: u} = s;
    const f = `scroll${r ? "Left" : "Top"}`;
    const d = `client${r ? "X" : "Y"}`;
    const _ = r ? "width" : "height";
    const h = r ? "left" : "top";
    const g = r ? "w" : "h";
    const v = r ? "x" : "y";
    const createRelativeHandleMove = (t, n) => o => {
      const {Et: s} = c();
      const d = offsetSize(a)[g] - offsetSize(i)[g];
      const _ = n * o / d;
      const h = _ * s[v];
      const p = directionIsRTL(u);
      const w = p && r ? l.n || l.i ? 1 : -1 : 1;
      e[f] = t + h * w;
    };
    return on(a, "pointerdown", (s => {
      const c = closest(s.target, `.${ct}`) === i;
      const r = c ? i : a;
      attrClass(n, I, D, true);
      if (continuePointerDown(s, t, c)) {
        const t = !c && s.shiftKey;
        const getHandleRect = () => getBoundingClientRect(i);
        const getTrackRect = () => getBoundingClientRect(a);
        const getHandleOffset = (t, n) => (t || getHandleRect())[h] - (n || getTrackRect())[h];
        const l = createRelativeHandleMove(e[f] || 0, 1 / getScale(e)[v]);
        const u = s[d];
        const g = getHandleRect();
        const p = getTrackRect();
        const w = g[_];
        const b = getHandleOffset(g, p) + w / 2;
        const m = u - p[h];
        const y = c ? 0 : m - b;
        const releasePointerCapture = t => {
          runEachAndClear(S);
          r.releasePointerCapture(t.pointerId);
        };
        const S = [ attrClass.bind(0, n, I, D), on(o, nn, releasePointerCapture), on(o, "selectstart", (t => preventDefault(t)), {
          S: false
        }), on(a, nn, releasePointerCapture), on(a, "pointermove", (n => {
          const o = n[d] - u;
          if (c || t) {
            l(y + o);
          }
        })) ];
        if (t) {
          l(y);
        } else if (!c) {
          const t = getPlugins()[Mt];
          if (t) {
            push(S, t.O(l, getHandleOffset, y, w, m));
          }
        }
        r.setPointerCapture(s.pointerId);
      }
    }));
  };
  const createScrollTimelineEvents = ({Ft: t}, n, o) => {
    if (!n) {
      return noop;
    }
    const s = t.animate(getScrollTimelineAnimation(o), {
      timeline: n
    });
    return () => {
      s.cancel();
    };
  };
  const createScrollbarsSetupEvents = (t, n) => (o, s, e, c, r, l, i) => {
    const {Ut: a} = o;
    const [u, f] = selfClearTimeout(333);
    const d = !!r.scrollBy;
    let _ = true;
    return runEachAndClear.bind(0, [ on(a, "pointerenter", (() => {
      s(at, true);
    })), on(a, "pointerleave pointercancel", (() => {
      s(at);
    })), on(a, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: e} = t;
      if (d && _ && 0 === e && parent(a) === c) {
        r.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      _ = false;
      s(_t, true);
      u((() => {
        _ = true;
        s(_t);
      }));
      preventDefault(t);
    }), {
      S: false,
      $: true
    }), createRootClickStopPropagationEvents(a, e), createInteractiveScrollEvents(t, c, e, o, r, n, i), createScrollTimelineEvents(o, l, i), f ]);
  };
  const {min: sn, max: en, abs: cn, round: rn} = Math;
  const getScrollbarHandleLengthRatio = (t, n, o, s) => {
    if (s) {
      const t = o ? "x" : "y";
      const {Et: n, zt: e} = s;
      const c = e[t];
      const r = n[t];
      return en(0, sn(1, c / (c + r)));
    }
    const e = o ? "width" : "height";
    const c = getBoundingClientRect(t)[e];
    const r = getBoundingClientRect(n)[e];
    return en(0, sn(1, c / r));
  };
  const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
    const {V: r} = getEnvironment();
    const l = c ? "x" : "y";
    const i = c ? "Left" : "Top";
    const {Et: a} = s;
    const u = rn(a[l]);
    const f = cn(o[`scroll${i}`]);
    const d = c && e;
    const _ = r.i ? f : u - f;
    const h = d ? _ : f;
    const g = sn(1, h / u);
    const v = getScrollbarHandleLengthRatio(t, n, c);
    return 1 / v * (1 - v) * g;
  };
  const maxAnimationKeyFrameValue = t => `${Math.max(0, t - .5)}px`;
  const animateScrollbar = (t, n, o, s) => t.animate({
    transform: [ getTrasformTranslateValue(`0px`, s), getTrasformTranslateValue(maxAnimationKeyFrameValue(o), s) ]
  }, {
    timeline: n,
    composite: "add"
  });
  const initScrollTimeline = (t, n) => h ? new h({
    source: t,
    axis: n
  }) : null;
  const createScrollbarsSetupElements = (t, n, o) => {
    const {q: s, H: e} = getEnvironment();
    const {scrollbars: c} = s();
    const {slot: r} = c;
    const {rt: l, Z: i, J: a, K: u, ut: f, st: d, it: _, ft: h} = n;
    const {scrollbars: v} = f ? {} : t;
    const {slot: p} = v || {};
    const w = new Map;
    const b = initScrollTimeline(d, "x");
    const m = initScrollTimeline(d, "y");
    const y = dynamicInitializationElement([ i, a, u ], (() => h && _ ? i : a), r, p);
    const doRefreshScrollbarOffset = t => h && !_ && parent(t) === u;
    const cancelScrollbarsOffsetAnimations = () => {
      w.forEach((t => {
        (t || []).forEach((t => {
          t.cancel();
        }));
      }));
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Ut, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        style(o, s);
      }));
    };
    const scrollbarStructureRefreshHandleLength = (t, n, o) => {
      scrollbarStyle(t, (t => {
        const {Ft: s, Xt: e} = t;
        return [ s, {
          [o ? "width" : "height"]: `${(100 * getScrollbarHandleLengthRatio(s, e, o, n)).toFixed(3)}%`
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
      if (!m && !m) {
        scrollbarStyle(t, (t => {
          const {Ft: s, Xt: e, Ut: c} = t;
          const r = getScrollbarHandleOffsetRatio(s, e, d, n, directionIsRTL(c), o);
          const l = r === r;
          return [ s, {
            transform: l ? getTrasformTranslateValue(`${(100 * r).toFixed(3)}%`, o) : ""
          } ];
        }));
      }
    };
    const styleScrollbarPosition = t => {
      const {Ut: n} = t;
      const o = doRefreshScrollbarOffset(n) && n;
      return [ o, {
        transform: o ? getTrasformTranslateValue([ `${scrollLeft(d)}px`, `${scrollTop(d)}px` ]) : ""
      } ];
    };
    const S = [];
    const $ = [];
    const x = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass($, t, n);
      c && scrollbarStructureAddRemoveClass(x, t, n);
    };
    const refreshScrollbarsHandleLength = t => {
      scrollbarStructureRefreshHandleLength($, t, true);
      scrollbarStructureRefreshHandleLength(x, t);
    };
    const refreshScrollbarsHandleOffset = t => {
      scrollbarStructureRefreshHandleOffset($, t, true);
      scrollbarStructureRefreshHandleOffset(x, t);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (!m && !m) {
        h && scrollbarStyle($, styleScrollbarPosition);
        h && scrollbarStyle(x, styleScrollbarPosition);
      }
    };
    const refreshScrollbarsScrollbarOffsetTimeline = ({Et: t}) => {
      cancelScrollbarsOffsetAnimations();
      x.concat($).forEach((({Ut: n}) => {
        if (doRefreshScrollbarOffset(n)) {
          w.set(n, [ animateScrollbar(n, b, t.x, true), animateScrollbar(n, m, t.y) ]);
        }
      }));
    };
    const generateScrollbarDOM = t => {
      const n = t ? ot : st;
      const s = t ? $ : x;
      const c = isEmptyArray(s) ? it : "";
      const r = createDiv(`${tt} ${n} ${c}`);
      const i = createDiv(et);
      const u = createDiv(ct);
      const f = {
        Ut: r,
        Xt: i,
        Ft: u
      };
      if (!e) {
        addClass(r, K);
      }
      appendChildren(r, i);
      appendChildren(i, u);
      push(s, f);
      push(S, [ () => {
        cancelScrollbarsOffsetAnimations();
        w.clear();
      }, removeElements.bind(0, r), o(f, scrollbarsAddRemoveClass, l, a, d, t ? b : m, t) ]);
      return f;
    };
    const C = generateScrollbarDOM.bind(0, true);
    const O = generateScrollbarDOM.bind(0, false);
    const appendElements = () => {
      appendChildren(y, $[0].Ut);
      appendChildren(y, x[0].Ut);
      g((() => {
        scrollbarsAddRemoveClass(it);
      }), 300);
    };
    C();
    O();
    return [ {
      Wt: refreshScrollbarsHandleLength,
      Zt: refreshScrollbarsHandleOffset,
      Jt: refreshScrollbarsScrollbarOffsetTimeline,
      Kt: refreshScrollbarsScrollbarOffset,
      Qt: scrollbarsAddRemoveClass,
      tn: {
        B: b,
        nn: $,
        sn: C,
        en: scrollbarStyle.bind(0, $)
      },
      cn: {
        B: m,
        nn: x,
        sn: O,
        en: scrollbarStyle.bind(0, x)
      }
    }, appendElements, runEachAndClear.bind(0, S) ];
  };
  const createScrollbarsSetup = (t, n, o, s) => {
    let e;
    let c;
    let r;
    let l;
    let i;
    let a = 0;
    const u = createState({});
    const [f] = u;
    const [d, _] = selfClearTimeout();
    const [h, g] = selfClearTimeout();
    const [v, p] = selfClearTimeout(100);
    const [w, b] = selfClearTimeout(100);
    const [m, y] = selfClearTimeout(100);
    const [S, $] = selfClearTimeout((() => a));
    const [x, C, O] = createScrollbarsSetupElements(t, o.Gt, createScrollbarsSetupEvents(n, o));
    const {J: T, et: z, it: E} = o.Gt;
    const {Qt: A, Wt: I, Zt: H, Jt: L, Kt: M} = x;
    const manageAutoHideSuspension = t => {
      A(ft, t, true);
      A(ft, t, false);
    };
    const manageScrollbarsAutoHide = (t, n) => {
      $();
      if (t) {
        A(dt);
      } else {
        const hide = () => A(dt, true);
        if (a > 0 && !n) {
          S(hide);
        } else {
          hide();
        }
      }
    };
    const onHostMouseEnter = () => {
      l = c;
      l && manageScrollbarsAutoHide(true);
    };
    const P = [ p, $, b, y, g, _, O, on(T, "pointerover", onHostMouseEnter, {
      C: true
    }), on(T, "pointerenter", onHostMouseEnter), on(T, "pointerleave", (() => {
      l = false;
      c && manageScrollbarsAutoHide(false);
    })), on(T, "pointermove", (() => {
      e && d((() => {
        p();
        manageScrollbarsAutoHide(true);
        w((() => {
          e && manageScrollbarsAutoHide(false);
        }));
      }));
    })), on(z, "scroll", (t => {
      h((() => {
        H(o());
        r && manageScrollbarsAutoHide(true);
        v((() => {
          r && !l && manageScrollbarsAutoHide(false);
        }));
      }));
      s(t);
      M();
    })) ];
    const D = f.bind(0);
    D.Gt = x;
    D.qt = C;
    return [ (t, s, l) => {
      const {Ht: u, Lt: f, It: d, St: _, Mt: h} = l;
      const {I: g} = getEnvironment();
      const v = createOptionCheck(n, t, s);
      const p = o();
      const {Et: w, Ot: b, yt: y, At: S} = p;
      const [$, x] = v("showNativeOverlaidScrollbars");
      const [C, O] = v("scrollbars.theme");
      const [T, D] = v("scrollbars.visibility");
      const [R, k] = v("scrollbars.autoHide");
      const [B, V] = v("scrollbars.autoHideSuspend");
      const [Y] = v("scrollbars.autoHideDelay");
      const [j, N] = v("scrollbars.dragScroll");
      const [q, G] = v("scrollbars.clickScroll");
      const F = h && !s;
      const X = u || f || _;
      const U = d || D;
      const W = $ && g.x && g.y;
      const setScrollbarVisibility = (t, n) => {
        const o = "visible" === T || "auto" === T && "scroll" === t;
        A(rt, o, n);
        return o;
      };
      a = Y;
      if (x) {
        A(Q, W);
      }
      if (O) {
        A(i);
        A(C, true);
        i = C;
      }
      if (V || F) {
        if (B && F && (S.x || S.y)) {
          manageAutoHideSuspension(false);
          m((() => P.push(on(z, "scroll", manageAutoHideSuspension.bind(0, true), {
            C: true
          }))));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if (k) {
        e = "move" === R;
        c = "leave" === R;
        r = "never" !== R;
        manageScrollbarsAutoHide(!r, true);
      }
      if (N) {
        A(gt, j);
      }
      if (G) {
        A(ht, q);
      }
      if (U) {
        const t = setScrollbarVisibility(b.x, true);
        const n = setScrollbarVisibility(b.y, false);
        const o = t && n;
        A(lt, !o);
      }
      if (X) {
        I(p);
        H(p);
        L(p);
        M();
        A(ut, !w.x, true);
        A(ut, !w.y, false);
        A(nt, y && !E);
      }
    }, D, runEachAndClear.bind(0, P) ];
  };
  const invokePluginInstance = (t, n, o) => {
    if (isFunction(t)) {
      t(n || void 0, o || void 0);
    }
  };
  const OverlayScrollbars = (t, n, o) => {
    const {F: s, q: e, j: c, N: r} = getEnvironment();
    const l = getPlugins();
    const i = isHTMLElement(t);
    const a = i ? t : t.target;
    const u = getInstance(a);
    if (n && !u) {
      let u = false;
      const validateOptions = t => {
        const n = getPlugins()[xt];
        const o = n && n.O;
        return o ? o(t, true) : t;
      };
      const f = assignDeep({}, s(), validateOptions(n));
      const [d, _, h] = createEventListenerHub(o);
      const [g, v, p] = createStructureSetup(t, f);
      const [w, b, m] = createScrollbarsSetup(t, f, v, (t => h("scroll", [ x, t ])));
      const update = (t, n) => g(t, !!n);
      const y = update.bind(0, {}, true);
      const S = c(y);
      const $ = r(y);
      const destroy = t => {
        removeInstance(a);
        S();
        $();
        m();
        p();
        u = true;
        h("destroyed", [ x, !!t ]);
        _();
      };
      const x = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(f, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(f, e);
              update(e);
            }
          }
          return assignDeep({}, f);
        },
        on: d,
        off: (t, n) => {
          t && n && _(t, n);
        },
        state() {
          const {zt: t, Et: n, Ot: o, At: s, tt: e, $t: c, yt: r} = v();
          return assignDeep({}, {
            overflowEdge: t,
            overflowAmount: n,
            overflowStyle: o,
            hasOverflow: s,
            padding: e,
            paddingAbsolute: c,
            directionRTL: r,
            destroyed: u
          });
        },
        elements() {
          const {Z: t, J: n, tt: o, K: s, nt: e, st: c, et: r} = v.Gt;
          const {tn: l, cn: i} = b.Gt;
          const translateScrollbarStructure = t => {
            const {Ft: n, Xt: o, Ut: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {nn: n, sn: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                w({}, true, {});
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
        update: t => update({}, t),
        destroy: destroy.bind(0)
      };
      v.Nt(((t, n, o) => {
        w(n, o, t);
      }));
      addInstance(a, x);
      each(keys(l), (t => invokePluginInstance(l[t], 0, x)));
      if (cancelInitialization(v.Gt.it, e().cancel, !i && t.cancel)) {
        destroy(true);
        return x;
      }
      v.qt();
      b.qt();
      h("initialized", [ x ]);
      v.Nt(((t, n, o) => {
        const {wt: s, St: e, vt: c, Ht: r, Lt: l, It: i, bt: a, Tt: u} = t;
        h("updated", [ x, {
          updateHints: {
            sizeChanged: s,
            directionChanged: e,
            heightIntrinsicChanged: c,
            overflowEdgeChanged: r,
            overflowAmountChanged: l,
            overflowStyleChanged: i,
            contentMutation: a,
            hostMutation: u
          },
          changedOptions: n,
          force: o
        } ]);
      }));
      x.update(true);
      return x;
    }
    return u;
  };
  OverlayScrollbars.plugin = t => {
    each(addPlugin(t), (t => invokePluginInstance(t, OverlayScrollbars)));
  };
  OverlayScrollbars.valid = t => {
    const n = t && t.elements;
    const o = isFunction(n) && n();
    return isPlainObject(o) && !!getInstance(o.target);
  };
  OverlayScrollbars.env = () => {
    const {k: t, I: n, A: o, V: s, Y: e, H: c, B: r, U: l, W: i, q: a, G: u, F: f, X: d} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      rtlScrollBehavior: s,
      flexboxGlue: e,
      cssCustomProperties: c,
      scrollTimeline: r,
      staticDefaultInitialization: l,
      staticDefaultOptions: i,
      getDefaultInitialization: a,
      setDefaultInitialization: u,
      getDefaultOptions: f,
      setDefaultOptions: d
    });
  };
  t.ClickScrollPlugin = Pt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Lt;
  t.SizeObserverPlugin = zt;
  Object.defineProperties(t, {
    rn: {
      value: true
    },
    [Symbol.toStringTag]: {
      value: "Module"
    }
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
