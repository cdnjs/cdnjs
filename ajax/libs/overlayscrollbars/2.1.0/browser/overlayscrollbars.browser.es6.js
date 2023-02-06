/*!
 * OverlayScrollbars
 * Version: 2.1.0
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
      const i = t;
      const l = n || (s ? !s(o, i) : o !== i);
      if (l || e) {
        c = i;
        r = o;
      }
      return [ c, l, r ];
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
    const i = c && s.call(c, "isPrototypeOf");
    if (e && !r && !i) {
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
    const i = [ n, o, s, e, c, r ];
    if (("object" !== typeof t || isNull(t)) && !isFunction(t)) {
      t = {};
    }
    each(i, (n => {
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
  const attrClass = (t, n, o, s) => {
    if (o) {
      const e = attr(t, n) || "";
      const c = new Set(e.split(" "));
      c[s ? "add" : "delete"](o);
      attr(t, n, from(c).join(" ").trim());
    }
  };
  const hasAttrClass = (t, n, o) => {
    const s = attr(t, n) || "";
    const e = new Set(s.split(" "));
    return e.has(o);
  };
  const removeAttr = (t, n) => {
    t && t.removeAttribute(n);
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
  const i = {};
  const l = {};
  const cssProperty = t => {
    let n = l[t];
    if (hasOwnProperty(l, t)) {
      return n;
    }
    const o = firstLetterToUpper(t);
    const s = getDummyStyle();
    each(c, (e => {
      const c = e.replace(/-/g, "");
      const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
      return !(n = r.find((t => void 0 !== s[t])));
    }));
    return l[t] = n || "";
  };
  const jsAPI = t => {
    if (isClient()) {
      let n = i[t] || window[t];
      if (hasOwnProperty(i, t)) {
        return n;
      }
      each(r, (o => {
        n = n || window[o + firstLetterToUpper(t)];
        return !n;
      }));
      i[t] = n;
      return n;
    }
  };
  const a = jsAPI("MutationObserver");
  const u = jsAPI("IntersectionObserver");
  const d = jsAPI("ResizeObserver");
  const f = jsAPI("cancelAnimationFrame");
  const _ = jsAPI("requestAnimationFrame");
  const h = isClient() && window.setTimeout;
  const v = isClient() && window.clearTimeout;
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
    const o = t ? h : _;
    const s = t ? v : f;
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
    const {v: r, g: i, p: l} = n || {};
    const a = function invokeFunctionToDebounce(n) {
      c();
      v(o);
      o = s = void 0;
      c = noop;
      t.apply(this, n);
    };
    const mergeParms = t => l && s ? l(s, t) : t;
    const flush = () => {
      if (c !== noop) {
        a(mergeParms(e) || e);
      }
    };
    const u = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(r) ? r() : r;
      const l = isNumber(n) && n >= 0;
      if (l) {
        const r = isFunction(i) ? i() : i;
        const l = isNumber(r) && r >= 0;
        const u = n > 0 ? h : _;
        const d = n > 0 ? v : f;
        const g = mergeParms(t);
        const w = g || t;
        const p = a.bind(0, w);
        c();
        const b = u(p, n);
        c = () => d(b);
        if (l && !o) {
          o = h(flush, r);
        }
        s = e = w;
      } else {
        a(t);
      }
    };
    u.m = flush;
    return u;
  };
  const {max: g} = Math;
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, s, e) => {
    let c = 0;
    const r = animationCurrentTime();
    const i = Math.max(0, o);
    const frame = o => {
      const l = animationCurrentTime();
      const a = l - r;
      const u = a >= i;
      const d = o ? 1 : 1 - (g(0, r + i - l) / i || 0);
      const f = (n - t) * (isFunction(e) ? e(d, d * i, 0, 1, i) : d) + t;
      const h = u || 1 === d;
      s && s(f, d, h);
      c = h ? 0 : _((() => frame()));
    };
    frame();
    return t => {
      f(c);
      t && frame(t);
    };
  };
  const w = /[^\x20\t\r\n\f]+/g;
  const classListAction = (t, n, o) => {
    const s = t && t.classList;
    let e;
    let c = 0;
    let r = false;
    if (s && n && isString(n)) {
      const t = n.match(w) || [];
      r = t.length > 0;
      while (e = t[c++]) {
        r = !!o(s, e) && r;
      }
    }
    return r;
  };
  const hasClass = (t, n) => classListAction(t, n, ((t, n) => t.contains(n)));
  const removeClass = (t, n) => {
    classListAction(t, n, ((t, n) => t.remove(n)));
  };
  const addClass = (t, n) => {
    classListAction(t, n, ((t, n) => t.add(n)));
    return removeClass.bind(0, t, n);
  };
  const p = {
    opacity: 1,
    zindex: 1
  };
  const parseToZeroOrNumber = (t, n) => {
    const o = n ? parseFloat(t) : parseInt(t, 10);
    return o === o ? o : 0;
  };
  const adaptCSSVal = (t, n) => !p[t.toLowerCase()] && isNumber(n) ? `${n}px` : n;
  const getCSSVal = (t, n, o) => null != n ? n[o] || n.getPropertyValue(o) : t.style[o];
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
    const i = `${s}bottom${e}`;
    const l = `${s}left${e}`;
    const a = style(t, [ c, r, i, l ]);
    return {
      t: parseToZeroOrNumber(a[c], true),
      r: parseToZeroOrNumber(a[r], true),
      b: parseToZeroOrNumber(a[i], true),
      l: parseToZeroOrNumber(a[l], true)
    };
  };
  const {round: b} = Math;
  const m = {
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
  } : m;
  const clientSize = t => t ? {
    w: t.clientWidth,
    h: t.clientHeight
  } : m;
  const scrollSize = t => t ? {
    w: t.scrollWidth,
    h: t.scrollHeight
  } : m;
  const fractionalSize = t => {
    const n = parseFloat(style(t, "height")) || 0;
    const o = parseFloat(style(t, "width")) || 0;
    return {
      w: o - b(o),
      h: n - b(n)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  let y;
  const supportPassiveEvents = () => {
    if (isUndefined(y)) {
      y = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get() {
            y = true;
          }
        }));
      } catch (t) {}
    }
    return y;
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
    const i = s && s.$ || false;
    const l = s && s.C || false;
    const a = [];
    const u = c ? {
      passive: r,
      capture: i
    } : i;
    each(splitEventNames(n), (n => {
      const s = l ? e => {
        t.removeEventListener(n, s, i);
        o && o(e);
      } : o;
      push(a, off.bind(null, t, n, s, i));
      t.addEventListener(n, s, u);
    }));
    return runEachAndClear.bind(0, a);
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const S = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t ? getBoundingClientRect(t) : 0;
    return n ? {
      x: n.left + window.pageYOffset,
      y: n.top + window.pageXOffset
    } : S;
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
  const $ = "os-environment";
  const C = `${$}-flexbox-glue`;
  const O = `${C}-max`;
  const z = "data-overlayscrollbars";
  const T = "data-overlayscrollbars-initialize";
  const E = `${z}-overflow-x`;
  const I = `${z}-overflow-y`;
  const A = "overflowVisible";
  const L = "scrollbarHidden";
  const H = "updating";
  const M = "os-padding";
  const P = "os-viewport";
  const D = `${P}-arrange`;
  const R = "os-content";
  const k = `${P}-scrollbar-hidden`;
  const B = `os-overflow-visible`;
  const V = "os-size-observer";
  const Y = `${V}-appear`;
  const j = `${V}-listener`;
  const N = `${j}-scroll`;
  const q = `${j}-item`;
  const G = `${q}-final`;
  const F = "os-trinsic-observer";
  const X = "os-no-css-vars";
  const U = "os-theme-none";
  const W = "os-scrollbar";
  const Z = `${W}-rtl`;
  const J = `${W}-horizontal`;
  const K = `${W}-vertical`;
  const Q = `${W}-track`;
  const tt = `${W}-handle`;
  const nt = `${W}-visible`;
  const ot = `${W}-cornerless`;
  const st = `${W}-transitionless`;
  const et = `${W}-interaction`;
  const ct = `${W}-unusable`;
  const rt = `${W}-auto-hidden`;
  const it = `${W}-wheel`;
  const lt = `${Q}-interactive`;
  const at = `${tt}-interactive`;
  const ut = {};
  const getPlugins = () => ut;
  const addPlugin = t => {
    const n = [];
    each(isArray(t) ? t : [ t ], (t => {
      const o = keys(t);
      each(o, (o => {
        push(n, ut[o] = t[o]);
      }));
    }));
    return n;
  };
  const dt = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  const ft = dt.number;
  const _t = dt.boolean;
  const ht = [ dt.array, dt.null ];
  const vt = "hidden scroll visible visible-hidden";
  const gt = "visible hidden auto";
  const wt = "never scroll leavemove";
  ({
    paddingAbsolute: _t,
    showNativeOverlaidScrollbars: _t,
    update: {
      elementEvents: ht,
      attributes: ht,
      debounce: [ dt.number, dt.array, dt.null ],
      ignoreMutation: [ dt.function, dt.null ]
    },
    overflow: {
      x: vt,
      y: vt
    },
    scrollbars: {
      theme: [ dt.string, dt.null ],
      visibility: gt,
      autoHide: wt,
      autoHideDelay: ft,
      dragScroll: _t,
      clickScroll: _t,
      pointers: [ dt.array, dt.null ]
    }
  });
  const pt = "__osOptionsValidationPlugin";
  const bt = 3333333;
  const mt = "scroll";
  const yt = "__osSizeObserverPlugin";
  const St = /* @__PURE__ */ (() => ({
    [yt]: {
      O: (t, n, o) => {
        const s = createDOM(`<div class="${q}" dir="ltr"><div class="${q}"><div class="${G}"></div></div><div class="${q}"><div class="${G}" style="width: 200%; height: 200%"></div></div></div>`);
        appendChildren(t, s);
        addClass(t, N);
        const e = s[0];
        const c = e.lastChild;
        const r = e.firstChild;
        const i = null == r ? void 0 : r.firstChild;
        let l = offsetSize(e);
        let a = l;
        let u = false;
        let d;
        const reset = () => {
          scrollLeft(r, bt);
          scrollTop(r, bt);
          scrollLeft(c, bt);
          scrollTop(c, bt);
        };
        const onResized = t => {
          d = 0;
          if (u) {
            l = a;
            n(true === t);
          }
        };
        const onScroll = t => {
          a = offsetSize(e);
          u = !t || !equalWH(a, l);
          if (t) {
            stopPropagation(t);
            if (u && !d) {
              f(d);
              d = _(onResized);
            }
          } else {
            onResized(false === t);
          }
          reset();
        };
        const h = push([], [ on(r, mt, onScroll), on(c, mt, onScroll) ]);
        style(i, {
          width: bt,
          height: bt
        });
        _(reset);
        return [ o ? onScroll.bind(0, false) : reset, h ];
      }
    }
  }))();
  let xt = 0;
  const {round: $t, abs: Ct} = Math;
  const getWindowDPR = () => {
    const t = window.screen.deviceXDPI || 0;
    const n = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || t / n;
  };
  const diffBiggerThanOne = (t, n) => {
    const o = Ct(t);
    const s = Ct(n);
    return !(o === s || o + 1 === s || o - 1 === s);
  };
  const Ot = "__osScrollbarsHidingPlugin";
  const zt = /* @__PURE__ */ (() => ({
    [Ot]: {
      T: t => {
        const {I: n, A: o, L: s} = t;
        const e = !s && !n && (o.x || o.y);
        const c = e ? document.createElement("style") : false;
        if (c) {
          attr(c, "id", `${D}-${xt}`);
          xt++;
        }
        return c;
      },
      H: (t, n, o, s, e, c, r) => {
        const arrangeViewport = (n, c, r, i) => {
          if (t) {
            const {M: t} = e();
            const {P: l, D: a} = n;
            const {x: u, y: d} = a;
            const {x: f, y: _} = l;
            const h = i ? "paddingRight" : "paddingLeft";
            const v = t[h];
            const g = t.paddingTop;
            const w = c.w + r.w;
            const p = c.h + r.h;
            const b = {
              w: _ && d ? `${_ + w - v}px` : "",
              h: f && u ? `${f + p - g}px` : ""
            };
            if (s) {
              const {sheet: t} = s;
              if (t) {
                const {cssRules: n} = t;
                if (n) {
                  if (!n.length) {
                    t.insertRule(`#${attr(s, "id")} + .${D}::before {}`, 0);
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
        const undoViewportArrange = (s, i, l) => {
          if (t) {
            const a = l || c(s);
            const {M: u} = e();
            const {D: d} = a;
            const {x: f, y: _} = d;
            const h = {};
            const assignProps = t => each(t.split(" "), (t => {
              h[t] = u[t];
            }));
            if (f) {
              assignProps("marginBottom paddingTop paddingBottom");
            }
            if (_) {
              assignProps("marginLeft marginRight paddingLeft paddingRight");
            }
            const v = style(o, keys(h));
            removeClass(o, D);
            if (!n) {
              h.height = "";
            }
            style(o, h);
            return [ () => {
              r(a, i, t, v);
              style(o, v);
              addClass(o, D);
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
          const i = {
            w: Ct(r.w),
            h: Ct(r.h)
          };
          const l = {
            w: Ct($t(c.w / (t.w / 100))),
            h: Ct($t(c.h / (t.h / 100)))
          };
          const a = getWindowDPR();
          const u = i.w > 2 && i.h > 2;
          const d = !diffBiggerThanOne(l.w, l.h);
          const f = a !== n && a > 0;
          const _ = u && d && f;
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
  const Tt = "__osClickScrollPlugin";
  const Et = /* @__PURE__ */ (() => ({
    [Tt]: {
      O: (t, n, o, s, e) => {
        let c = 0;
        let r = noop;
        const animateClickScroll = i => {
          r = animateNumber(i, i + s * Math.sign(o), 133, ((o, i, l) => {
            t(o);
            const a = n();
            const u = a + s;
            const d = e >= a && e <= u;
            if (l && !d) {
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
  let It;
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
    const o = addClass(t, k);
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
    const o = addClass(t, C);
    const s = getBoundingClientRect(t);
    const e = getBoundingClientRect(n);
    const c = equalBCRWH(e, s, true);
    const r = addClass(t, O);
    const i = getBoundingClientRect(t);
    const l = getBoundingClientRect(n);
    const a = equalBCRWH(l, i, true);
    o();
    r();
    return c && a;
  };
  const createEnvironment = () => {
    const {body: t} = document;
    const n = createDOM(`<div class="${$}"><div></div></div>`);
    const o = n[0];
    const s = o.firstChild;
    const [e, , c] = createEventListenerHub();
    const [r, i] = createCache({
      o: getNativeScrollbarSize(t, o, s),
      u: equalXY
    }, getNativeScrollbarSize.bind(0, t, o, s, true));
    const [l] = i();
    const a = getNativeScrollbarsHiding(o);
    const u = {
      x: 0 === l.x,
      y: 0 === l.y
    };
    const d = {
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
    const f = assignDeep({}, x);
    const _ = assignDeep.bind(0, {}, f);
    const h = assignDeep.bind(0, {}, d);
    const v = {
      k: l,
      A: u,
      I: a,
      L: "-1" === style(o, "zIndex"),
      B: getRtlScrollBehavior(o, s),
      V: getFlexboxGlue(o, s),
      Y: e.bind(0, "z"),
      j: e.bind(0, "r"),
      N: h,
      q: t => assignDeep(d, t) && h(),
      G: _,
      F: t => assignDeep(f, t) && _(),
      X: assignDeep({}, d),
      U: assignDeep({}, f)
    };
    const g = window.addEventListener;
    const w = debounce((t => c(t ? "z" : "r")), {
      v: 33,
      g: 99
    });
    removeAttr(o, "style");
    removeElements(o);
    g("resize", w.bind(0, false));
    if (!a && (!u.x || !u.y)) {
      let t;
      g("resize", (() => {
        const n = getPlugins()[Ot];
        t = t || n && n.R();
        t && t(v, r, w.bind(0, true));
      }));
    }
    return v;
  };
  const getEnvironment = () => {
    if (!It) {
      It = createEnvironment();
    }
    return It;
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
    const {A: c, I: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: i, body: l} = n;
    const a = null != s ? s : i;
    const u = isUndefined(e) ? l : e;
    const d = (c.x || c.y) && a;
    const f = t && (isNull(u) ? !r : u);
    return !!d || !!f;
  };
  const At = new WeakMap;
  const addInstance = (t, n) => {
    At.set(t, n);
  };
  const removeInstance = t => {
    At.delete(t);
  };
  const getInstance = t => At.get(t);
  const getPropByPath = (t, n) => t ? n.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || void 0 !== getPropByPath(n, s) ];
  const createState = t => {
    let n = t;
    return [ () => n, t => {
      n = assignDeep({}, n, t);
    } ];
  };
  const Lt = "tabindex";
  const Ht = createDiv.bind(0, "");
  const unwrap = t => {
    appendChildren(parent(t), contents(t));
    removeElements(t);
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {N: o, I: s} = n;
    const e = getPlugins()[Ot];
    const c = e && e.T;
    const {elements: r} = o();
    const {host: i, padding: l, viewport: a, content: u} = r;
    const d = isHTMLElement(t);
    const f = d ? {} : t;
    const {elements: _} = f;
    const {host: h, padding: v, viewport: g, content: w} = _ || {};
    const p = d ? t : f.target;
    const b = is(p, "textarea");
    const m = p.ownerDocument;
    const y = m.documentElement;
    const S = p === m.body;
    const x = m.defaultView;
    const $ = staticInitializationElement.bind(0, [ p ]);
    const C = dynamicInitializationElement.bind(0, [ p ]);
    const O = resolveInitialization.bind(0, [ p ]);
    const A = $.bind(0, Ht, a);
    const L = C.bind(0, Ht, u);
    const H = A(g);
    const D = H === p;
    const B = D && S;
    const V = !D && L(w);
    const Y = !D && isHTMLElement(H) && H === V;
    const j = Y && !!O(u);
    const N = j ? A() : H;
    const q = j ? V : L();
    const G = Y ? N : H;
    const F = B ? y : G;
    const X = b ? $(Ht, i, h) : p;
    const U = B ? F : X;
    const W = Y ? q : V;
    const Z = m.activeElement;
    const J = !D && x.top === x && Z === p;
    const K = {
      W: p,
      Z: U,
      J: F,
      K: !D && C(Ht, l, v),
      tt: W,
      nt: !D && !s && c && c(n),
      ot: B ? y : F,
      st: B ? m : F,
      et: x,
      ct: m,
      rt: b,
      it: S,
      lt: d,
      ut: D,
      dt: Y,
      ft: (t, n) => D ? hasAttrClass(F, z, n) : hasClass(F, t),
      _t: (t, n, o) => D ? attrClass(F, z, n, o) : (o ? addClass : removeClass)(F, t)
    };
    const Q = keys(K).reduce(((t, n) => {
      const o = K[n];
      return push(t, o && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? indexOf(Q, t) > -1 : null;
    const {W: tt, Z: nt, K: ot, J: st, tt: et, nt: ct} = K;
    const rt = [ () => {
      removeAttr(nt, z);
      removeAttr(nt, T);
      removeAttr(tt, T);
      if (S) {
        removeAttr(y, z);
        removeAttr(y, T);
      }
    } ];
    const it = b && elementIsGenerated(nt);
    let lt = b ? tt : contents([ et, st, ot, nt, tt ].find((t => false === elementIsGenerated(t))));
    const at = B ? tt : et || st;
    const appendElements = () => {
      attr(nt, z, D ? "viewport" : "host");
      const t = addClass(ot, M);
      const n = addClass(st, !D && P);
      const o = addClass(et, R);
      const e = S && !D ? addClass(parent(p), k) : noop;
      if (it) {
        insertAfter(tt, nt);
        push(rt, (() => {
          insertAfter(nt, tt);
          removeElements(nt);
        }));
      }
      appendChildren(at, lt);
      appendChildren(nt, ot);
      appendChildren(ot || nt, !D && st);
      appendChildren(st, et);
      push(rt, (() => {
        e();
        removeAttr(st, E);
        removeAttr(st, I);
        if (elementIsGenerated(et)) {
          unwrap(et);
        }
        if (elementIsGenerated(st)) {
          unwrap(st);
        }
        if (elementIsGenerated(ot)) {
          unwrap(ot);
        }
        t();
        n();
        o();
      }));
      if (s && !D) {
        push(rt, removeClass.bind(0, st, k));
      }
      if (ct) {
        insertBefore(st, ct);
        push(rt, removeElements.bind(0, ct));
      }
      if (J) {
        const t = attr(st, Lt);
        attr(st, Lt, "-1");
        st.focus();
        const revertViewportTabIndex = () => t ? attr(st, Lt, t) : removeAttr(st, Lt);
        const n = on(m, "pointerdown keydown", (() => {
          revertViewportTabIndex();
          n();
        }));
        push(rt, [ revertViewportTabIndex, n ]);
      } else if (Z && Z.focus) {
        Z.focus();
      }
      lt = 0;
    };
    return [ K, appendElements, runEachAndClear.bind(0, rt) ];
  };
  const createTrinsicUpdateSegment = (t, n) => {
    const {tt: o} = t;
    const [s] = n;
    return t => {
      const {V: n} = getEnvironment();
      const {ht: e} = s();
      const {vt: c} = t;
      const r = (o || !n) && c;
      if (r) {
        style(o, {
          height: e ? "" : "100%"
        });
      }
      return {
        gt: r,
        wt: r
      };
    };
  };
  const createPaddingUpdateSegment = (t, n) => {
    const [o, s] = n;
    const {Z: e, K: c, J: r, ut: i} = t;
    const [l, a] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, topRightBottomLeft.bind(0, e, "padding", ""));
    return (t, n, e) => {
      let [u, d] = a(e);
      const {I: f, V: _} = getEnvironment();
      const {bt: h} = o();
      const {gt: v, wt: g, yt: w} = t;
      const [p, b] = n("paddingAbsolute");
      const m = !_ && g;
      if (v || d || m) {
        [u, d] = l(e);
      }
      const y = !i && (b || w || d);
      if (y) {
        const t = !p || !c && !f;
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
        const i = {
          paddingTop: t ? u.t : 0,
          paddingRight: t ? u.r : 0,
          paddingBottom: t ? u.b : 0,
          paddingLeft: t ? u.l : 0
        };
        style(c || r, e);
        style(r, i);
        s({
          K: u,
          St: !t,
          M: c ? i : assignDeep({}, e, i)
        });
      }
      return {
        xt: y
      };
    };
  };
  const {max: Mt} = Math;
  const Pt = Mt.bind(0, 0);
  const Dt = "visible";
  const Rt = "hidden";
  const kt = 42;
  const Bt = {
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const Vt = {
    u: equalXY,
    o: {
      x: Rt,
      y: Rt
    }
  };
  const getOverflowAmount = (t, n) => {
    const o = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const s = {
      w: Pt(t.w - n.w),
      h: Pt(t.h - n.h)
    };
    return {
      w: s.w > o ? s.w : 0,
      h: s.h > o ? s.h : 0
    };
  };
  const conditionalClass = (t, n, o) => o ? addClass(t, n) : removeClass(t, n);
  const overflowIsVisible = t => 0 === t.indexOf(Dt);
  const createOverflowUpdateSegment = (t, n) => {
    const [o, s] = n;
    const {Z: e, K: c, J: r, nt: i, ut: l, _t: a, it: u, et: d} = t;
    const {k: f, V: _, I: h, A: v} = getEnvironment();
    const g = getPlugins()[Ot];
    const w = !l && !h && (v.x || v.y);
    const p = u && l;
    const [b, m] = createCache(Bt, fractionalSize.bind(0, r));
    const [y, S] = createCache(Bt, scrollSize.bind(0, r));
    const [x, $] = createCache(Bt);
    const [C, O] = createCache(Bt);
    const [T] = createCache(Vt);
    const fixFlexboxGlue = (t, n) => {
      style(r, {
        height: ""
      });
      if (n) {
        const {St: n, K: s} = o();
        const {$t: c, P: i} = t;
        const l = fractionalSize(e);
        const a = clientSize(e);
        const u = "content-box" === style(r, "boxSizing");
        const d = n || u ? s.b + s.t : 0;
        const f = !(v.x && u);
        style(r, {
          height: a.h + l.h + (c.x && f ? i.x : 0) - d
        });
      }
    };
    const getViewportOverflowState = (t, n) => {
      const o = !h && !t ? kt : 0;
      const getStatePerAxis = (t, s, e) => {
        const c = style(r, t);
        const i = n ? n[t] : c;
        const l = "scroll" === i;
        const a = s ? o : e;
        const u = l && !h ? a : 0;
        const d = s && !!o;
        return [ c, l, u, d ];
      };
      const [s, e, c, i] = getStatePerAxis("overflowX", v.x, f.x);
      const [l, a, u, d] = getStatePerAxis("overflowY", v.y, f.y);
      return {
        Ct: {
          x: s,
          y: l
        },
        $t: {
          x: e,
          y: a
        },
        P: {
          x: c,
          y: u
        },
        D: {
          x: i,
          y: d
        }
      };
    };
    const setViewportOverflowState = (t, n, o, s) => {
      const setAxisOverflowStyle = (t, n) => {
        const o = overflowIsVisible(t);
        const s = n && o && t.replace(`${Dt}-`, "") || "";
        return [ n && !o ? t : "", overflowIsVisible(s) ? "hidden" : s ];
      };
      const [e, c] = setAxisOverflowStyle(o.x, n.x);
      const [r, i] = setAxisOverflowStyle(o.y, n.y);
      s.overflowX = c && r ? c : e;
      s.overflowY = i && e ? i : r;
      return getViewportOverflowState(t, s);
    };
    const hideNativeScrollbars = (t, n, s, e) => {
      const {P: c, D: r} = t;
      const {x: i, y: l} = r;
      const {x: a, y: u} = c;
      const {M: d} = o();
      const f = n ? "marginLeft" : "marginRight";
      const _ = n ? "paddingLeft" : "paddingRight";
      const h = d[f];
      const v = d.marginBottom;
      const g = d[_];
      const w = d.paddingBottom;
      e.width = `calc(100% + ${u + -1 * h}px)`;
      e[f] = -u + h;
      e.marginBottom = -a + v;
      if (s) {
        e[_] = g + (l ? u : 0);
        e.paddingBottom = w + (i ? a : 0);
      }
    };
    const [H, M] = g ? g.H(w, _, r, i, o, getViewportOverflowState, hideNativeScrollbars) : [ () => w, () => [ noop ] ];
    return (t, n, i) => {
      const {gt: u, Ot: f, wt: g, xt: w, vt: P, yt: D} = t;
      const {ht: R, bt: V} = o();
      const [Y, j] = n("showNativeOverlaidScrollbars");
      const [N, q] = n("overflow");
      const G = Y && v.x && v.y;
      const F = !l && !_ && (u || g || f || j || P);
      const X = overflowIsVisible(N.x);
      const U = overflowIsVisible(N.y);
      const W = X || U;
      let Z = m(i);
      let J = S(i);
      let K = $(i);
      let Q = O(i);
      let tt;
      if (j && h) {
        a(k, L, !G);
      }
      if (F) {
        tt = getViewportOverflowState(G);
        fixFlexboxGlue(tt, R);
      }
      if (u || w || g || D || j) {
        if (W) {
          a(B, A, false);
        }
        const [t, n] = M(G, V, tt);
        const [o, s] = Z = b(i);
        const [e, c] = J = y(i);
        const l = clientSize(r);
        let u = e;
        let f = l;
        t();
        if ((c || s || j) && n && !G && H(n, e, o, V)) {
          f = clientSize(r);
          u = scrollSize(r);
        }
        const _ = {
          w: Pt(Mt(e.w, u.w) + o.w),
          h: Pt(Mt(e.h, u.h) + o.h)
        };
        const h = {
          w: Pt((p ? d.innerWidth : f.w + Pt(l.w - e.w)) + o.w),
          h: Pt((p ? d.innerHeight + o.h : f.h + Pt(l.h - e.h)) + o.h)
        };
        Q = C(h);
        K = x(getOverflowAmount(_, h), i);
      }
      const [nt, ot] = Q;
      const [st, et] = K;
      const [ct, rt] = J;
      const [it, lt] = Z;
      const at = {
        x: st.w > 0,
        y: st.h > 0
      };
      const ut = X && U && (at.x || at.y) || X && at.x && !at.y || U && at.y && !at.x;
      if (w || D || lt || rt || ot || et || q || j || F) {
        const t = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        const n = setViewportOverflowState(G, at, N, t);
        const o = H(n, ct, it, V);
        if (!l) {
          hideNativeScrollbars(n, V, o, t);
        }
        if (F) {
          fixFlexboxGlue(n, R);
        }
        if (l) {
          attr(e, E, t.overflowX);
          attr(e, I, t.overflowY);
        } else {
          style(r, t);
        }
      }
      attrClass(e, z, A, ut);
      conditionalClass(c, B, ut);
      !l && conditionalClass(r, B, W);
      const [dt, ft] = T(getViewportOverflowState(G).Ct);
      s({
        Ct: dt,
        zt: {
          x: nt.w,
          y: nt.h
        },
        Tt: {
          x: st.w,
          y: st.h
        },
        Et: at
      });
      return {
        It: ft,
        At: ot,
        Lt: et
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
    const {W: o, J: s, _t: e, ut: c} = t;
    const {I: r, A: i, V: l} = getEnvironment();
    const a = !r && (i.x || i.y);
    const u = [ createTrinsicUpdateSegment(t, n), createPaddingUpdateSegment(t, n), createOverflowUpdateSegment(t, n) ];
    return (t, n, r) => {
      const i = prepareUpdateHints(assignDeep({
        gt: false,
        xt: false,
        yt: false,
        vt: false,
        At: false,
        Lt: false,
        It: false,
        Ot: false,
        wt: false
      }, n), {}, r);
      const d = a || !l;
      const f = d && scrollLeft(s);
      const _ = d && scrollTop(s);
      e("", H, true);
      let h = i;
      each(u, (n => {
        h = prepareUpdateHints(h, n(h, t, !!r) || {}, r);
      }));
      scrollLeft(s, f);
      scrollTop(s, _);
      e("", H);
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
          const i = s.get(c) || [];
          const l = t.contains(c);
          if (l) {
            const t = on(c, r, (o => {
              if (e) {
                t();
                s.delete(c);
              } else {
                n(o);
              }
            }));
            s.set(c, push(i, t));
          } else {
            runEachAndClear(i);
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
    const {Ht: c, Mt: r, Pt: i, Dt: l, Rt: u, kt: d} = s || {};
    const f = debounce((() => {
      if (e) {
        o(true);
      }
    }), {
      v: 33,
      g: 99
    });
    const [_, h] = createEventContentChange(t, f, i);
    const v = c || [];
    const g = r || [];
    const w = v.concat(g);
    const observerCallback = (e, c) => {
      const r = u || noop;
      const i = d || noop;
      const a = new Set;
      const f = new Set;
      let _ = false;
      let v = false;
      each(e, (o => {
        const {attributeName: e, target: c, type: u, oldValue: d, addedNodes: h, removedNodes: w} = o;
        const p = "attributes" === u;
        const b = "childList" === u;
        const m = t === c;
        const y = p && isString(e) ? attr(c, e) : 0;
        const S = 0 !== y && d !== y;
        const x = indexOf(g, e) > -1 && S;
        if (n && (b || !m)) {
          const n = !p;
          const u = p && S;
          const f = u && l && is(c, l);
          const _ = f ? !r(c, e, d, y) : n || u;
          const g = _ && !i(o, !!f, t, s);
          each(h, (t => a.add(t)));
          each(w, (t => a.add(t)));
          v = v || g;
        }
        if (!n && m && S && !r(c, e, d, y)) {
          f.add(e);
          _ = _ || x;
        }
      }));
      if (a.size > 0) {
        h((t => from(a).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
      }
      if (n) {
        !c && v && o(false);
        return [ false ];
      }
      if (f.size > 0 || _) {
        const t = [ from(f), _ ];
        !c && o.apply(0, t);
        return t;
      }
    };
    const p = new a((t => observerCallback(t)));
    p.observe(t, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: w,
      subtree: n,
      childList: n,
      characterData: n
    });
    e = true;
    return [ () => {
      if (e) {
        _();
        p.disconnect();
        e = false;
      }
    }, () => {
      if (e) {
        f.m();
        const t = p.takeRecords();
        return !isEmptyArray(t) && observerCallback(t, true);
      }
    } ];
  };
  const Yt = 3333333;
  const domRectHasDimensions = t => t && (t.height || t.width);
  const createSizeObserver = (t, n, o) => {
    const {Bt: s = false, Vt: e = false} = o || {};
    const c = getPlugins()[yt];
    const {B: r} = getEnvironment();
    const i = createDOM(`<div class="${V}"><div class="${j}"></div></div>`);
    const l = i[0];
    const a = l.firstChild;
    const u = directionIsRTL.bind(0, t);
    const [f] = createCache({
      o: void 0,
      _: true,
      u: (t, n) => !(!t || !domRectHasDimensions(t) && domRectHasDimensions(n))
    });
    const onSizeChangedCallbackProxy = t => {
      const o = isArray(t) && t.length > 0 && isObject(t[0]);
      const e = !o && isBoolean(t[0]);
      let c = false;
      let i = false;
      let a = true;
      if (o) {
        const [n, , o] = f(t.pop().contentRect);
        const s = domRectHasDimensions(n);
        const e = domRectHasDimensions(o);
        c = !o || !s;
        i = !e && s;
        a = !c;
      } else if (e) {
        [, a] = t;
      } else {
        i = true === t;
      }
      if (s && a) {
        const n = e ? t[0] : directionIsRTL(l);
        scrollLeft(l, n ? r.n ? -Yt : r.i ? 0 : Yt : Yt);
        scrollTop(l, Yt);
      }
      if (!c) {
        n({
          gt: !e,
          Yt: e ? t : void 0,
          Vt: !!i
        });
      }
    };
    const _ = [];
    let h = e ? onSizeChangedCallbackProxy : false;
    return [ () => {
      runEachAndClear(_);
      removeElements(l);
    }, () => {
      if (d) {
        const t = new d(onSizeChangedCallbackProxy);
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
        push(_, on(l, "scroll", (n => {
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
        addClass(l, Y);
        push(_, on(l, "animationstart", h, {
          C: !!d
        }));
      }
      if (d || c) {
        appendChildren(t, l);
      }
    } ];
  };
  const isHeightIntrinsic = t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0;
  const createTrinsicObserver = (t, n) => {
    let o;
    const s = createDiv(F);
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
  const jt = `[${z}]`;
  const Nt = `.${P}`;
  const qt = [ "tabindex" ];
  const Gt = [ "wrap", "cols", "rows" ];
  const Ft = [ "id", "class", "style", "open" ];
  const createStructureSetupObservers = (t, n, o) => {
    let s;
    let e;
    let c;
    const {Z: r, J: i, tt: l, rt: a, ut: u, ft: f, _t: _} = t;
    const {V: h} = getEnvironment();
    const [v] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const t = f(B, A);
      const n = f(D, "");
      const o = n && scrollLeft(i);
      const s = n && scrollTop(i);
      _(B, A);
      _(D, "");
      _("", H, true);
      const e = scrollSize(l);
      const c = scrollSize(i);
      const r = fractionalSize(i);
      _(B, A, t);
      _(D, "", n);
      _("", H);
      scrollLeft(i, o);
      scrollTop(i, s);
      return {
        w: c.w + e.w + r.w,
        h: c.h + e.h + r.h
      };
    }));
    const g = a ? Gt : Ft.concat(Gt);
    const w = debounce(o, {
      v: () => s,
      g: () => e,
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
      each(t || qt, (t => {
        if (indexOf(qt, t) > -1) {
          const n = attr(r, t);
          if (isString(n)) {
            attr(i, t, n);
          } else {
            removeAttr(i, t);
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
        ht: e
      });
      !s && o(r);
      return r;
    };
    const onSizeChanged = ({gt: t, Yt: s, Vt: e}) => {
      const c = !t || e ? o : w;
      let r = false;
      if (s) {
        const [t, o] = s;
        r = o;
        n({
          bt: t
        });
      }
      c({
        gt: t,
        yt: r
      });
    };
    const onContentMutation = (t, n) => {
      const [, s] = v();
      const e = {
        wt: s
      };
      const c = t ? o : w;
      if (s) {
        !n && c(e);
      }
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Ot: n
      };
      if (n) {
        !o && w(s);
      } else if (!u) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const [p, b, m] = l || !h ? createTrinsicObserver(r, onTrinsicChanged) : [ noop, noop, noop ];
    const [y, S] = !u ? createSizeObserver(r, onSizeChanged, {
      Vt: true,
      Bt: true
    }) : [ noop, noop ];
    const [x, $] = createDOMObserver(r, false, onHostMutation, {
      Mt: Ft,
      Ht: Ft.concat(qt)
    });
    const C = u && d && new d(onSizeChanged.bind(0, {
      gt: true
    }));
    C && C.observe(r);
    updateViewportAttrsFromHost();
    return [ () => {
      p();
      y();
      c && c[0]();
      C && C.disconnect();
      x();
    }, () => {
      S();
      b();
    }, () => {
      const t = {};
      const n = $();
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
      const [a, d] = t("update.elementEvents");
      const [f, _] = t("update.debounce");
      const h = d || r;
      const ignoreMutationFromOptions = t => isFunction(n) && n(t);
      if (h) {
        if (c) {
          c[1]();
          c[0]();
        }
        c = createDOMObserver(l || i, true, onContentMutation, {
          Ht: g.concat(o || []),
          Pt: a,
          Dt: jt,
          kt: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !u ? liesBetween(o, jt, Nt) : false;
            return e || !!closest(o, `.${W}`) || !!ignoreMutationFromOptions(t);
          }
        });
      }
      if (_) {
        w.m();
        if (isArray(f)) {
          const t = f[0];
          const n = f[1];
          s = isNumber(t) && t;
          e = isNumber(n) && n;
        } else if (isNumber(f)) {
          s = f;
          e = false;
        } else {
          s = false;
          e = false;
        }
      }
    } ];
  };
  const Xt = {
    x: 0,
    y: 0
  };
  const createInitialStructureSetupUpdateState = t => ({
    K: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    St: false,
    M: {
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0
    },
    zt: Xt,
    Tt: Xt,
    Ct: {
      x: "hidden",
      y: "hidden"
    },
    Et: {
      x: false,
      y: false
    },
    ht: false,
    bt: directionIsRTL(t.Z)
  });
  const createStructureSetup = (t, n) => {
    const o = createOptionCheck(n, {});
    const [s, e, c] = createEventListenerHub();
    const [r, i, l] = createStructureSetupElements(t);
    const a = createState(createInitialStructureSetupUpdateState(r));
    const [u, d] = a;
    const f = createStructureSetupUpdate(r, a);
    const triggerUpdateEvent = (t, n, o) => {
      const s = keys(t).some((n => t[n]));
      const e = s || !isEmptyObject(n) || o;
      if (e) {
        c("u", [ t, n, o ]);
      }
      return e;
    };
    const [_, h, v, g] = createStructureSetupObservers(r, d, (t => triggerUpdateEvent(f(o, t), {}, false)));
    const w = u.bind(0);
    w.jt = t => s("u", t);
    w.Nt = () => {
      const {W: t, J: n} = r;
      const o = scrollLeft(t);
      const s = scrollTop(t);
      h();
      i();
      scrollLeft(n, o);
      scrollTop(n, s);
    };
    w.qt = r;
    return [ (t, o) => {
      const s = createOptionCheck(n, t, o);
      g(s);
      return triggerUpdateEvent(f(s, v(), o), t, !!o);
    }, w, () => {
      e();
      _();
      l();
    } ];
  };
  const {round: Ut} = Math;
  const getScale = t => {
    const {width: n, height: o} = getBoundingClientRect(t);
    const {w: s, h: e} = offsetSize(t);
    return {
      x: Ut(n) / s || 1,
      y: Ut(o) / e || 1
    };
  };
  const continuePointerDown = (t, n, o) => {
    const s = n.scrollbars;
    const {button: e, isPrimary: c, pointerType: r} = t;
    const {pointers: i} = s;
    return 0 === e && c && s[o ? "dragScroll" : "clickScroll"] && (i || []).includes(r);
  };
  const createRootClickStopPropagationEvents = (t, n) => on(t, "mousedown", on.bind(0, n, "click", stopPropagation, {
    C: true,
    $: true
  }), {
    $: true
  });
  const createInteractiveScrollEvents = (t, n, o, s, e, c) => {
    const {B: r} = getEnvironment();
    const {Gt: i, Ft: l, Xt: a} = o;
    const u = `scroll${c ? "Left" : "Top"}`;
    const d = `client${c ? "X" : "Y"}`;
    const f = c ? "width" : "height";
    const _ = c ? "left" : "top";
    const h = c ? "w" : "h";
    const v = c ? "x" : "y";
    const createRelativeHandleMove = (t, n) => o => {
      const {Tt: d} = e();
      const f = offsetSize(l)[h] - offsetSize(i)[h];
      const _ = n * o / f;
      const g = _ * d[v];
      const w = directionIsRTL(a);
      const p = w && c ? r.n || r.i ? 1 : -1 : 1;
      s[u] = t + g * p;
    };
    return on(l, "pointerdown", (o => {
      const e = closest(o.target, `.${tt}`) === i;
      const c = e ? i : l;
      if (continuePointerDown(o, t, e)) {
        const t = !e && o.shiftKey;
        const getHandleRect = () => getBoundingClientRect(i);
        const getTrackRect = () => getBoundingClientRect(l);
        const getHandleOffset = (t, n) => (t || getHandleRect())[_] - (n || getTrackRect())[_];
        const r = createRelativeHandleMove(s[u] || 0, 1 / getScale(s)[v]);
        const a = o[d];
        const h = getHandleRect();
        const g = getTrackRect();
        const w = h[f];
        const p = getHandleOffset(h, g) + w / 2;
        const b = a - g[_];
        const m = e ? 0 : b - p;
        const y = [ on(n, "selectstart", (t => preventDefault(t)), {
          S: false
        }), on(l, "pointermove", (n => {
          const o = n[d] - a;
          if (e || t) {
            r(m + o);
          }
        })) ];
        if (t) {
          r(m);
        } else if (!e) {
          const t = getPlugins()[Tt];
          if (t) {
            push(y, t.O(r, getHandleOffset, m, w, b));
          }
        }
        on(l, "pointerup", (t => {
          runEachAndClear(y);
          c.releasePointerCapture(t.pointerId);
        }), {
          C: true
        });
        c.setPointerCapture(o.pointerId);
      }
    }));
  };
  const createScrollbarsSetupEvents = (t, n) => (o, s, e, c, r, i) => {
    const {Xt: l} = o;
    const [a, u] = selfClearTimeout(333);
    const d = !!r.scrollBy;
    let f = true;
    return runEachAndClear.bind(0, [ on(l, "pointerenter", (() => {
      s(et, true);
    })), on(l, "pointerleave pointercancel", (() => {
      s(et);
    })), on(l, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: e} = t;
      if (d && f && 0 === e && parent(l) === c) {
        r.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      f = false;
      s(it, true);
      a((() => {
        f = true;
        s(it);
      }));
      preventDefault(t);
    }), {
      S: false,
      $: true
    }), createRootClickStopPropagationEvents(l, e), createInteractiveScrollEvents(t, e, o, r, n, i), u ]);
  };
  const {min: Wt, max: Zt, abs: Jt, round: Kt} = Math;
  const getScrollbarHandleLengthRatio = (t, n, o, s) => {
    if (s) {
      const t = o ? "x" : "y";
      const {Tt: n, zt: e} = s;
      const c = e[t];
      const r = n[t];
      return Zt(0, Wt(1, c / (c + r)));
    }
    const e = o ? "w" : "h";
    const c = offsetSize(t)[e];
    const r = offsetSize(n)[e];
    return Zt(0, Wt(1, c / r));
  };
  const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
    const {B: r} = getEnvironment();
    const i = c ? "x" : "y";
    const l = c ? "Left" : "Top";
    const {Tt: a} = s;
    const u = Kt(a[i]);
    const d = Jt(o[`scroll${l}`]);
    const f = c && e;
    const _ = r.i ? d : u - d;
    const h = f ? _ : d;
    const v = Wt(1, h / u);
    const g = getScrollbarHandleLengthRatio(t, n, c);
    return 1 / g * (1 - g) * v;
  };
  const createScrollbarsSetupElements = (t, n, o) => {
    const {N: s, L: e} = getEnvironment();
    const {scrollbars: c} = s();
    const {slot: r} = c;
    const {ct: i, W: l, Z: a, J: u, lt: d, ot: f, it: _, ut: v} = n;
    const {scrollbars: g} = d ? {} : t;
    const {slot: w} = g || {};
    const p = dynamicInitializationElement([ l, a, u ], (() => v && _ ? l : a), r, w);
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Xt, n);
      }));
    };
    const scrollbarsHandleStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        style(o, s);
      }));
    };
    const scrollbarStructureRefreshHandleLength = (t, n, o) => {
      scrollbarsHandleStyle(t, (t => {
        const {Gt: s, Ft: e} = t;
        return [ s, {
          [o ? "width" : "height"]: `${(100 * getScrollbarHandleLengthRatio(s, e, o, n)).toFixed(3)}%`
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
      const s = o ? "X" : "Y";
      scrollbarsHandleStyle(t, (t => {
        const {Gt: e, Ft: c, Xt: r} = t;
        const i = getScrollbarHandleOffsetRatio(e, c, f, n, directionIsRTL(r), o);
        const l = i === i;
        return [ e, {
          transform: l ? `translate${s}(${(100 * i).toFixed(3)}%)` : ""
        } ];
      }));
    };
    const b = [];
    const m = [];
    const y = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(m, t, n);
      c && scrollbarStructureAddRemoveClass(y, t, n);
    };
    const refreshScrollbarsHandleLength = t => {
      scrollbarStructureRefreshHandleLength(m, t, true);
      scrollbarStructureRefreshHandleLength(y, t);
    };
    const refreshScrollbarsHandleOffset = t => {
      scrollbarStructureRefreshHandleOffset(m, t, true);
      scrollbarStructureRefreshHandleOffset(y, t);
    };
    const generateScrollbarDOM = t => {
      const n = t ? J : K;
      const s = t ? m : y;
      const c = isEmptyArray(s) ? st : "";
      const r = createDiv(`${W} ${n} ${c}`);
      const l = createDiv(Q);
      const u = createDiv(tt);
      const d = {
        Xt: r,
        Ft: l,
        Gt: u
      };
      if (!e) {
        addClass(r, X);
      }
      appendChildren(r, l);
      appendChildren(l, u);
      push(s, d);
      push(b, [ removeElements.bind(0, r), o(d, scrollbarsAddRemoveClass, i, a, f, t) ]);
      return d;
    };
    const S = generateScrollbarDOM.bind(0, true);
    const x = generateScrollbarDOM.bind(0, false);
    const appendElements = () => {
      appendChildren(p, m[0].Xt);
      appendChildren(p, y[0].Xt);
      h((() => {
        scrollbarsAddRemoveClass(st);
      }), 300);
    };
    S();
    x();
    return [ {
      Ut: refreshScrollbarsHandleLength,
      Wt: refreshScrollbarsHandleOffset,
      Zt: scrollbarsAddRemoveClass,
      Jt: {
        Kt: m,
        Qt: S,
        tn: scrollbarsHandleStyle.bind(0, m)
      },
      nn: {
        Kt: y,
        Qt: x,
        tn: scrollbarsHandleStyle.bind(0, y)
      }
    }, appendElements, runEachAndClear.bind(0, b) ];
  };
  const createScrollbarsSetup = (t, n, o, s) => {
    let e;
    let c;
    let r;
    let i;
    let l;
    let a = 0;
    const u = createState({});
    const [d] = u;
    const [f, _] = selfClearTimeout();
    const [h, v] = selfClearTimeout();
    const [g, w] = selfClearTimeout(100);
    const [p, b] = selfClearTimeout(100);
    const [m, y] = selfClearTimeout((() => a));
    const [S, x, $] = createScrollbarsSetupElements(t, o.qt, createScrollbarsSetupEvents(n, o));
    const {Z: C, J: O, ot: z, st: T, ut: E, it: I} = o.qt;
    const {Jt: A, nn: L, Zt: H, Ut: M, Wt: P} = S;
    const {tn: D} = A;
    const {tn: R} = L;
    const styleScrollbarPosition = t => {
      const {Xt: n} = t;
      const o = E && !I && parent(n) === O && n;
      return [ o, {
        transform: o ? `translate(${scrollLeft(z)}px, ${scrollTop(z)}px)` : ""
      } ];
    };
    const manageScrollbarsAutoHide = (t, n) => {
      y();
      if (t) {
        H(rt);
      } else {
        const hide = () => H(rt, true);
        if (a > 0 && !n) {
          m(hide);
        } else {
          hide();
        }
      }
    };
    const onHostMouseEnter = () => {
      i = c;
      i && manageScrollbarsAutoHide(true);
    };
    const k = [ w, y, b, v, _, $, on(C, "pointerover", onHostMouseEnter, {
      C: true
    }), on(C, "pointerenter", onHostMouseEnter), on(C, "pointerleave", (() => {
      i = false;
      c && manageScrollbarsAutoHide(false);
    })), on(C, "pointermove", (() => {
      e && f((() => {
        w();
        manageScrollbarsAutoHide(true);
        p((() => {
          e && manageScrollbarsAutoHide(false);
        }));
      }));
    })), on(T, "scroll", (t => {
      h((() => {
        P(o());
        r && manageScrollbarsAutoHide(true);
        g((() => {
          r && !i && manageScrollbarsAutoHide(false);
        }));
      }));
      s(t);
      E && D(styleScrollbarPosition);
      E && R(styleScrollbarPosition);
    })) ];
    const B = d.bind(0);
    B.qt = S;
    B.Nt = x;
    return [ (t, s, i) => {
      const {At: u, Lt: d, It: f, yt: _} = i;
      const {A: h} = getEnvironment();
      const v = createOptionCheck(n, t, s);
      const g = o();
      const {Tt: w, Ct: p, bt: b} = g;
      const [m, y] = v("showNativeOverlaidScrollbars");
      const [S, x] = v("scrollbars.theme");
      const [$, C] = v("scrollbars.visibility");
      const [O, z] = v("scrollbars.autoHide");
      const [T] = v("scrollbars.autoHideDelay");
      const [E, A] = v("scrollbars.dragScroll");
      const [L, D] = v("scrollbars.clickScroll");
      const R = u || d || _;
      const k = f || C;
      const B = m && h.x && h.y;
      const setScrollbarVisibility = (t, n) => {
        const o = "visible" === $ || "auto" === $ && "scroll" === t;
        H(nt, o, n);
        return o;
      };
      a = T;
      if (y) {
        H(U, B);
      }
      if (x) {
        H(l);
        H(S, true);
        l = S;
      }
      if (z) {
        e = "move" === O;
        c = "leave" === O;
        r = "never" !== O;
        manageScrollbarsAutoHide(!r, true);
      }
      if (A) {
        H(at, E);
      }
      if (D) {
        H(lt, L);
      }
      if (k) {
        const t = setScrollbarVisibility(p.x, true);
        const n = setScrollbarVisibility(p.y, false);
        const o = t && n;
        H(ot, !o);
      }
      if (R) {
        M(g);
        P(g);
        H(ct, !w.x, true);
        H(ct, !w.y, false);
        H(Z, b && !I);
      }
    }, B, runEachAndClear.bind(0, k) ];
  };
  const invokePluginInstance = (t, n, o) => {
    if (isFunction(t)) {
      t(n || void 0, o || void 0);
    }
  };
  const OverlayScrollbars = (t, n, o) => {
    const {G: s, N: e, Y: c, j: r} = getEnvironment();
    const i = getPlugins();
    const l = isHTMLElement(t);
    const a = l ? t : t.target;
    const u = getInstance(a);
    if (n && !u) {
      let u = false;
      const validateOptions = t => {
        const n = getPlugins()[pt];
        const o = n && n.O;
        return o ? o(t, true) : t;
      };
      const d = assignDeep({}, s(), validateOptions(n));
      const [f, _, h] = createEventListenerHub(o);
      const [v, g, w] = createStructureSetup(t, d);
      const [p, b, m] = createScrollbarsSetup(t, d, g, (t => h("scroll", [ $, t ])));
      const update = (t, n) => v(t, !!n);
      const y = update.bind(0, {}, true);
      const S = c(y);
      const x = r(y);
      const destroy = t => {
        removeInstance(a);
        S();
        x();
        m();
        w();
        u = true;
        h("destroyed", [ $, !!t ]);
        _();
      };
      const $ = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(d, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(d, e);
              update(e);
            }
          }
          return assignDeep({}, d);
        },
        on: f,
        off: (t, n) => {
          t && n && _(t, n);
        },
        state() {
          const {zt: t, Tt: n, Ct: o, Et: s, K: e, St: c, bt: r} = g();
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
          const {W: t, Z: n, K: o, J: s, tt: e, ot: c, st: r} = g.qt;
          const {Jt: i, nn: l} = b.qt;
          const translateScrollbarStructure = t => {
            const {Gt: n, Ft: o, Xt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Kt: n, Qt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                p({}, true, {});
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
            scrollbarHorizontal: translateScrollbarsSetupElement(i),
            scrollbarVertical: translateScrollbarsSetupElement(l)
          });
        },
        update: t => update({}, t),
        destroy: destroy.bind(0)
      };
      g.jt(((t, n, o) => {
        p(n, o, t);
      }));
      addInstance(a, $);
      each(keys(i), (t => invokePluginInstance(i[t], 0, $)));
      if (cancelInitialization(g.qt.it, e().cancel, !l && t.cancel)) {
        destroy(true);
        return $;
      }
      g.Nt();
      b.Nt();
      h("initialized", [ $ ]);
      g.jt(((t, n, o) => {
        const {gt: s, yt: e, vt: c, At: r, Lt: i, It: l, wt: a, Ot: u} = t;
        h("updated", [ $, {
          updateHints: {
            sizeChanged: s,
            directionChanged: e,
            heightIntrinsicChanged: c,
            overflowEdgeChanged: r,
            overflowAmountChanged: i,
            overflowStyleChanged: l,
            contentMutation: a,
            hostMutation: u
          },
          changedOptions: n,
          force: o
        } ]);
      }));
      $.update(true);
      return $;
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
    const {k: t, A: n, I: o, B: s, V: e, L: c, X: r, U: i, N: l, q: a, G: u, F: d} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      rtlScrollBehavior: s,
      flexboxGlue: e,
      cssCustomProperties: c,
      staticDefaultInitialization: r,
      staticDefaultOptions: i,
      getDefaultInitialization: l,
      setDefaultInitialization: a,
      getDefaultOptions: u,
      setDefaultOptions: d
    });
  };
  t.ClickScrollPlugin = Et;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = zt;
  t.SizeObserverPlugin = St;
  Object.defineProperties(t, {
    sn: {
      value: true
    },
    [Symbol.toStringTag]: {
      value: "Module"
    }
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
