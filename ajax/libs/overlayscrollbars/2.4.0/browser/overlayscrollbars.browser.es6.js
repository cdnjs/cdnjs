/*!
 * OverlayScrollbars
 * Version: 2.4.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(t) {
  "use strict";
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
  const n = typeof window !== "undefined";
  const o = n && Node.ELEMENT_NODE;
  const {toString: s, hasOwnProperty: e} = Object.prototype;
  const c = /^\[object (.+)\]$/;
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
  const type = t => isUndefined(t) || isNull(t) ? `${t}` : s.call(t).replace(c, "$1").toLowerCase();
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
    const c = s && s.prototype;
    const r = e.call(t, o);
    const l = c && e.call(c, "isPrototypeOf");
    if (s && !r && !l) {
      return false;
    }
    for (n in t) {}
    return isUndefined(n) || e.call(t, n);
  };
  const isHTMLElement = t => {
    const n = HTMLElement;
    return t ? n ? t instanceof n : t.nodeType === o : false;
  };
  const isElement = t => {
    const n = Element;
    return t ? n ? t instanceof n : t.nodeType === o : false;
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
  const isEmptyArray = t => !!t && !t.length;
  const deduplicateArray = t => from(new Set(t));
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t && t.apply(void 0, n || []);
    each(t, runFn);
    !o && (t.length = 0);
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
  const isEmptyObject = t => {
    for (const n in t) {
      return false;
    }
    return true;
  };
  const attr = (t, n, o) => {
    if (isUndefined(o)) {
      return t ? t.getAttribute(n) : null;
    }
    t && t.setAttribute(n, o);
  };
  const getValueSet = (t, n) => new Set((attr(t, n) || "").split(" "));
  const removeAttr = (t, n) => {
    t && t.removeAttribute(n);
  };
  const attrClass = (t, n, o, s) => {
    if (o) {
      const e = getValueSet(t, n);
      e[s ? "add" : "delete"](o);
      const c = from(e).join(" ").trim();
      attr(t, n, c);
    }
  };
  const hasAttrClass = (t, n, o) => getValueSet(t, n).has(o);
  const r = n && Element.prototype;
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
      const o = r.matches || r.msMatchesSelector;
      return o.call(t, n);
    }
    return false;
  };
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => {
    if (isElement(t)) {
      const o = r.closest;
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
  };
  const liesBetween = (t, n, o) => {
    const s = closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
  };
  const noop = () => {};
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
  const insertBefore = (t, n) => before(parent(t), t, n);
  const insertAfter = (t, n) => before(parent(t), t && t.nextSibling, n);
  const createDiv = t => {
    const n = document.createElement("div");
    attr(n, "class", t);
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    n.innerHTML = t.trim();
    return each(contents(n), (t => removeElements(t)));
  };
  const l = n ? window : {};
  const i = Math.max;
  const a = Math.min;
  const u = Math.round;
  const f = Math.abs;
  const _ = l.cancelAnimationFrame;
  const d = l.requestAnimationFrame;
  const v = l.setTimeout;
  const h = l.clearTimeout;
  const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);
  const getDummyStyle = () => createDiv().style;
  const p = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  const g = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  const b = {};
  const w = {};
  const cssProperty = t => {
    let n = w[t];
    if (hasOwnProperty(w, t)) {
      return n;
    }
    const o = firstLetterToUpper(t);
    const s = getDummyStyle();
    each(p, (e => {
      const c = e.replace(/-/g, "");
      const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
      return !(n = r.find((t => s[t] !== void 0)));
    }));
    return w[t] = n || "";
  };
  const jsAPI = t => {
    let n = b[t] || l[t];
    if (hasOwnProperty(b, t)) {
      return n;
    }
    each(g, (o => {
      n = n || l[o + firstLetterToUpper(t)];
      return !n;
    }));
    b[t] = n;
    return n;
  };
  const y = jsAPI("MutationObserver");
  const m = jsAPI("IntersectionObserver");
  const S = jsAPI("ResizeObserver");
  const $ = jsAPI("ScrollTimeline");
  const bind = (t, ...n) => t.bind(0, ...n);
  const selfClearTimeout = t => {
    let n;
    const o = t ? v : d;
    const s = t ? h : _;
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
    const {v: r, p: l, g: i} = n || {};
    const a = function invokeFunctionToDebounce(n) {
      c();
      h(o);
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
        const u = n > 0 ? v : d;
        const f = n > 0 ? h : _;
        const p = mergeParms(t);
        const g = p || t;
        const b = a.bind(0, g);
        c();
        const w = u(b, n);
        c = () => f(w);
        if (i && !o) {
          o = v(flush, r);
        }
        s = e = g;
      } else {
        a(t);
      }
    };
    u.m = flush;
    return u;
  };
  const O = /[^\x20\t\r\n\f]+/g;
  const classListAction = (t, n, o) => {
    const s = t && t.classList;
    let e;
    let c = 0;
    let r = false;
    if (s && n && isString(n)) {
      const t = n.match(O) || [];
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
    return bind(removeClass, t, n);
  };
  const x = {
    opacity: 1,
    zIndex: 1
  };
  const parseToZeroOrNumber = (t, n) => {
    const o = t || "";
    const s = n ? parseFloat(o) : parseInt(o, 10);
    return s === s ? s : 0;
  };
  const adaptCSSVal = (t, n) => !x[t] && isNumber(n) ? `${n}px` : n;
  const getCSSVal = (t, n, o) => String((n != null ? n[o] || n.getPropertyValue(o) : t.style[o]) || "");
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
  function style(t, n) {
    const o = isString(n);
    const s = isArray(n) || o;
    if (s) {
      let s = o ? "" : {};
      if (t) {
        const e = l.getComputedStyle(t, null);
        s = o ? getCSSVal(t, e, n) : n.reduce(((n, o) => {
          n[o] = getCSSVal(t, e, o);
          return n;
        }), s);
      }
      return s;
    }
    t && each(n, ((o, s) => setCSSVal(t, s, n[s])));
  }
  const getDirectionIsRTL = t => style(t, "direction") === "rtl";
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
  const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;
  const C = "paddingTop";
  const z = "paddingRight";
  const H = "paddingLeft";
  const I = "paddingBottom";
  const A = "marginLeft";
  const E = "marginRight";
  const T = "marginBottom";
  const D = "overflowX";
  const R = "overflowY";
  const k = "width";
  const M = "height";
  const L = "hidden";
  const P = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : P;
  const windowSize = t => getElmWidthHeightProperty("inner", t || l);
  const V = bind(getElmWidthHeightProperty, "offset");
  const U = bind(getElmWidthHeightProperty, "client");
  const B = bind(getElmWidthHeightProperty, "scroll");
  const fractionalSize = t => {
    const n = parseFloat(style(t, k)) || 0;
    const o = parseFloat(style(t, M)) || 0;
    return {
      w: n - u(n),
      h: o - u(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t[M] || t[k]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, s, e) => {
    let c = 0;
    const r = animationCurrentTime();
    const l = i(0, o);
    const frame = o => {
      const a = animationCurrentTime();
      const u = a - r;
      const f = u >= l;
      const _ = o ? 1 : 1 - (i(0, r + l - a) / l || 0);
      const v = (n - t) * (isFunction(e) ? e(_, _ * l, 0, 1, l) : _) + t;
      const h = f || _ === 1;
      s && s(v, _, h);
      c = h ? 0 : d((() => frame()));
    };
    frame();
    return t => {
      _(c);
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
  const equalBCRWH = (t, n, o) => equal(t, n, [ k, M ], o && (t => u(t)));
  let j;
  const G = "passive";
  const supportPassiveEvents = () => {
    if (isUndefined(j)) {
      j = false;
      try {
        l.addEventListener(G, noop, Object.defineProperty({}, G, {
          get() {
            j = true;
          }
        }));
      } catch (t) {}
    }
    return j;
  };
  const splitEventNames = t => t.split(" ");
  const removeEventListener = (t, n, o, s) => {
    each(splitEventNames(n), (n => {
      t.removeEventListener(n, o, s);
    }));
  };
  const addEventListener = (t, n, o, s) => {
    var e;
    const c = supportPassiveEvents();
    const r = (e = c && s && s.S) != null ? e : c;
    const l = s && s.$ || false;
    const i = s && s.O || false;
    const a = c ? {
      passive: r,
      capture: l
    } : l;
    return bind(runEachAndClear, splitEventNames(n).map((n => {
      const s = i ? e => {
        removeEventListener(t, n, s, l);
        o(e);
      } : o;
      t.addEventListener(n, s, a);
      return bind(removeEventListener, t, n, s, l);
    })));
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const N = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t && getBoundingClientRect(t);
    return n ? {
      x: n.left + l.pageYOffset,
      y: n.top + l.pageXOffset
    } : N;
  };
  const getRTLCompatibleScrollPosition = (t, n, o) => o ? o.n ? -t : o.i ? n - t : t : t;
  const getRTLCompatibleScrollBounds = (t, n) => [ n ? n.i ? t : 0 : 0, getRTLCompatibleScrollPosition(t, t, n) ];
  const scrollElementTo = (t, n) => {
    const {x: o, y: s} = isNumber(n) ? {
      x: n,
      y: n
    } : n || {};
    isNumber(o) && (t.scrollLeft = o);
    isNumber(s) && (t.scrollTop = s);
  };
  const getElmentScroll = t => ({
    x: t.scrollLeft,
    y: t.scrollTop
  });
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
  const q = {
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
  const W = `data-overlayscrollbars`;
  const F = "os-environment";
  const X = `${F}-flexbox-glue`;
  const Y = `${X}-max`;
  const Z = `os-scrollbar-hidden`;
  const J = `${W}-initialize`;
  const K = W;
  const Q = `${K}-overflow-x`;
  const tt = `${K}-overflow-y`;
  const nt = "overflowVisible";
  const ot = "scrollbarHidden";
  const st = "scrollbarPressed";
  const et = "updating";
  const ct = `${W}-viewport`;
  const rt = "arrange";
  const lt = "scrollbarHidden";
  const it = nt;
  const at = `${W}-padding`;
  const ut = it;
  const ft = `${W}-content`;
  const _t = "os-size-observer";
  const dt = `${_t}-appear`;
  const vt = `${_t}-listener`;
  const ht = `${vt}-scroll`;
  const pt = `${vt}-item`;
  const gt = `${pt}-final`;
  const bt = "os-trinsic-observer";
  const wt = "os-no-css-vars";
  const yt = "os-theme-none";
  const mt = "os-scrollbar";
  const St = `${mt}-rtl`;
  const $t = `${mt}-horizontal`;
  const Ot = `${mt}-vertical`;
  const xt = `${mt}-track`;
  const Ct = `${mt}-handle`;
  const zt = `${mt}-visible`;
  const Ht = `${mt}-cornerless`;
  const It = `${mt}-transitionless`;
  const At = `${mt}-interaction`;
  const Et = `${mt}-unusable`;
  const Tt = `${mt}-auto-hide`;
  const Dt = `${Tt}-hidden`;
  const Rt = `${mt}-wheel`;
  const kt = `${xt}-interactive`;
  const Mt = `${Ct}-interactive`;
  const Lt = {};
  const Pt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      Lt[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o, s) => keys(t).map((e => {
    const {static: c, instance: r} = t[e];
    const l = o ? r : c;
    if (l) {
      const t = o ? l(o, n) : l(n);
      return (s || Pt)[e] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => Pt[t];
  const Vt = "__osOptionsValidationPlugin";
  const Ut = "__osSizeObserverPlugin";
  const Bt = /* @__PURE__ */ (() => ({
    [Ut]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${pt}" dir="ltr"><div class="${pt}"><div class="${gt}"></div></div><div class="${pt}"><div class="${gt}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const i = r.firstChild;
        const a = i == null ? void 0 : i.firstChild;
        let u = V(r);
        let f = u;
        let v = false;
        let h;
        const reset = () => {
          scrollElementTo(i, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          h = 0;
          if (v) {
            u = f;
            n(t === true);
          }
        };
        const onScroll = t => {
          f = V(r);
          v = !t || !equalWH(f, u);
          if (t) {
            stopPropagation(t);
            if (v && !h) {
              _(h);
              h = d(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const p = [ appendChildren(t, c), addEventListener(i, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, ht);
        style(a, {
          [k]: s,
          [M]: s
        });
        d(reset);
        return [ o ? bind(onScroll, false) : reset, p ];
      }
    }
  }))();
  let jt = 0;
  const Gt = "__osScrollbarsHidingPlugin";
  const Nt = /* @__PURE__ */ (() => ({
    [Gt]: {
      static: () => ({
        C: t => {
          const {H: n, I: o, A: s} = t;
          const e = !s && !n && (o.x || o.y);
          const c = e ? document.createElement("style") : false;
          if (c) {
            attr(c, "id", `${ct}-${rt}-${jt}`);
            jt++;
          }
          return c;
        },
        T: (t, n, o, s, e, c, r) => {
          const arrangeViewport = (n, c, r, l) => {
            if (t) {
              const {D: t} = e;
              const {R: i, k: a} = n;
              const {x: u, y: f} = a;
              const {x: _, y: d} = i;
              const v = l ? z : H;
              const h = t[v];
              const p = t.paddingTop;
              const g = c.w + r.w;
              const b = c.h + r.h;
              const w = {
                w: d && f ? `${d + g - h}px` : "",
                h: _ && u ? `${_ + b - p}px` : ""
              };
              if (s) {
                const {sheet: t} = s;
                if (t) {
                  const {cssRules: n} = t;
                  if (n) {
                    if (!n.length) {
                      t.insertRule(`#${attr(s, "id")} + [${ct}~='${rt}']::before {}`, 0);
                    }
                    const o = n[0].style;
                    o[k] = w.w;
                    o[M] = w.h;
                  }
                }
              } else {
                style(o, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
            }
            return t;
          };
          const undoViewportArrange = (s, l, i) => {
            if (t) {
              const a = i || c(s);
              const {D: u} = e;
              const {k: f} = a;
              const {x: _, y: d} = f;
              const v = {};
              const assignProps = t => each(t, (t => {
                v[t] = u[t];
              }));
              if (_) {
                assignProps([ T, C, I ]);
              }
              if (d) {
                assignProps([ A, E, H, z ]);
              }
              const h = style(o, keys(v));
              attrClass(o, ct, rt);
              if (!n) {
                v[M] = "";
              }
              style(o, v);
              return [ () => {
                r(a, l, t, h);
                style(o, h);
                attrClass(o, ct, rt, true);
              }, a ];
            }
            return [ noop ];
          };
          return [ arrangeViewport, undoViewportArrange ];
        },
        M: () => {
          let t = {
            w: 0,
            h: 0
          };
          let n = 0;
          const getWindowDPR = () => {
            const t = l.screen;
            const n = t.deviceXDPI || 0;
            const o = t.logicalXDPI || 1;
            return l.devicePixelRatio || n / o;
          };
          const diffBiggerThanOne = (t, n) => {
            const o = f(t);
            const s = f(n);
            return !(o === s || o + 1 === s || o - 1 === s);
          };
          return (o, s, e) => {
            const c = windowSize();
            const r = {
              w: c.w - t.w,
              h: c.h - t.h
            };
            if (r.w === 0 && r.h === 0) {
              return;
            }
            const l = {
              w: f(r.w),
              h: f(r.h)
            };
            const i = {
              w: f(u(c.w / (t.w / 100))),
              h: f(u(c.h / (t.h / 100)))
            };
            const a = getWindowDPR();
            const _ = l.w > 2 && l.h > 2;
            const d = !diffBiggerThanOne(i.w, i.h);
            const v = a !== n && a > 0;
            const h = _ && d && v;
            if (h) {
              const [t, n] = s();
              assignDeep(o.L, t);
              if (n) {
                e();
              }
            }
            t = c;
            n = a;
          };
        }
      })
    }
  }))();
  const qt = "__osClickScrollPlugin";
  const Wt = /* @__PURE__ */ (() => ({
    [qt]: {
      static: () => (t, n, o, s, e) => {
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
                const t = v((() => {
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
  let Ft;
  const getNativeScrollbarSize = (t, n, o, s) => {
    appendChildren(t, n);
    const e = U(n);
    const c = V(n);
    const r = fractionalSize(o);
    s && removeElements(n);
    return {
      x: c.h - e.h + r.h,
      y: c.w - e.w + r.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, Z);
    try {
      n = style(t, cssProperty("scrollbar-width")) === "none" || l.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const getRtlScrollBehavior = (t, n) => {
    style(t, {
      [D]: L,
      [R]: L,
      direction: "rtl"
    });
    scrollElementTo(t, {
      x: 0
    });
    const o = absoluteCoordinates(t);
    const s = absoluteCoordinates(n);
    scrollElementTo(t, {
      x: -999
    });
    const e = absoluteCoordinates(n);
    return {
      i: o.x === s.x,
      n: s.x !== e.x
    };
  };
  const getFlexboxGlue = (t, n) => {
    const o = addClass(t, X);
    const s = getBoundingClientRect(t);
    const e = getBoundingClientRect(n);
    const c = equalBCRWH(e, s, true);
    const r = addClass(t, Y);
    const l = getBoundingClientRect(t);
    const i = getBoundingClientRect(n);
    const a = equalBCRWH(i, l, true);
    o();
    r();
    return c && a;
  };
  const createEnvironment = () => {
    const {body: t} = document;
    const n = createDOM(`<div class="${F}"><div></div></div>`);
    const o = n[0];
    const s = o.firstChild;
    const [e, , c] = createEventListenerHub();
    const [r, i] = createCache({
      o: getNativeScrollbarSize(t, o, s),
      u: equalXY
    }, bind(getNativeScrollbarSize, t, o, s, true));
    const [a] = i();
    const u = getNativeScrollbarsHiding(o);
    const f = {
      x: a.x === 0,
      y: a.y === 0
    };
    const _ = {
      elements: {
        host: null,
        padding: !u,
        viewport: t => u && t === t.ownerDocument.body && t,
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
    const d = assignDeep({}, q);
    const v = bind(assignDeep, {}, d);
    const h = bind(assignDeep, {}, _);
    const p = {
      L: a,
      I: f,
      H: u,
      A: style(o, "zIndex") === "-1",
      P: !!$,
      V: getRtlScrollBehavior(o, s),
      U: getFlexboxGlue(o, s),
      B: bind(e, "z"),
      j: bind(e, "r"),
      G: h,
      N: t => assignDeep(_, t) && h(),
      q: v,
      W: t => assignDeep(d, t) && v(),
      F: assignDeep({}, _),
      X: assignDeep({}, d)
    };
    const g = bind(addEventListener, l, "resize");
    const b = debounce((t => c(t)), {
      v: 33,
      p: 99
    });
    removeAttr(o, "style");
    removeElements(o);
    g(bind(b, "r"));
    if (!u && (!f.x || !f.y)) {
      g((() => {
        const t = getStaticPluginModuleInstance(Gt);
        const n = t ? t.M() : noop;
        n(p, r, bind(b, "z"));
      }));
    }
    return p;
  };
  const getEnvironment = () => {
    if (!Ft) {
      Ft = createEnvironment();
    }
    return Ft;
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
    const {I: e, H: c, G: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const f = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!f || !!_;
  };
  const Xt = new WeakMap;
  const addInstance = (t, n) => {
    Xt.set(t, n);
  };
  const removeInstance = t => {
    Xt.delete(t);
  };
  const getInstance = t => Xt.get(t);
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
            const t = addEventListener(c, r.trim(), (o => {
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
    const {Y: c, Z: r, J: l, K: i, tt: a, nt: u} = s || {};
    const f = debounce((() => e && o(true)), {
      v: 33,
      p: 99
    });
    const [_, d] = createEventContentChange(t, f, l);
    const v = c || [];
    const h = r || [];
    const p = concat(v, h);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const f = [];
        const _ = [];
        let v = false;
        let p = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: d, removedNodes: g} = o;
          const b = a === "attributes";
          const w = a === "childList";
          const y = t === c;
          const m = b && e;
          const S = m ? attr(c, e || "") : null;
          const $ = m && u !== S;
          const O = inArray(h, e) && $;
          if (n && (w || !y)) {
            const n = b && $;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, S) : !b || n;
            const v = _ && !l(o, !!a, t, s);
            each(d, (t => push(f, t)));
            each(g, (t => push(f, t)));
            p = p || v;
          }
          if (!n && y && $ && !r(c, e, u, S)) {
            push(_, e);
            v = v || O;
          }
        }));
        d((t => deduplicateArray(f).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && p && o(false);
          return [ false ];
        }
        if (!isEmptyArray(_) || v) {
          const t = [ deduplicateArray(_), v ];
          !e && o.apply(0, t);
          return t;
        }
      }
    };
    const g = new y(bind(observerCallback, false));
    return [ () => {
      g.observe(t, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: p,
        subtree: n,
        childList: n,
        characterData: n
      });
      e = true;
      return () => {
        if (e) {
          _();
          g.disconnect();
          e = false;
        }
      };
    }, () => {
      if (e) {
        f.m();
        return observerCallback(true, g.takeRecords());
      }
    } ];
  };
  const createSizeObserver = (t, n, o) => {
    let s = false;
    const e = 3333333;
    const {ot: c, st: r, et: i} = o || {};
    const a = getStaticPluginModuleInstance(Ut);
    const {V: u} = getEnvironment();
    const f = bind(getDirectionIsRTL, t);
    const [_, d] = selfClearTimeout(33);
    const [v] = createCache({
      o: false,
      _: true
    });
    return () => {
      const o = [ d, addEventListener(l, "resize", (() => {
        s = !!i;
        _((() => {
          s = false;
        }));
      })) ];
      const h = createDOM(`<div class="${_t}"><div class="${vt}"></div></div>`);
      const p = h[0];
      const g = p.firstChild;
      const onSizeChangedCallbackProxy = t => {
        const o = t instanceof ResizeObserverEntry;
        const r = !o && isArray(t);
        let l = false;
        let i = false;
        let a = true;
        if (o) {
          const [n, , o] = v(t.contentRect);
          const e = domRectHasDimensions(n);
          const c = domRectAppeared(n, o);
          const r = !o;
          i = r || c;
          l = !i && (!e || s);
          a = !l;
        } else if (r) {
          [, a] = t;
        } else {
          i = t === true;
        }
        if (c && a) {
          const n = r ? t[0] : getDirectionIsRTL(p);
          scrollElementTo(p, {
            x: getRTLCompatibleScrollPosition(e, e, n && u),
            y: e
          });
        }
        if (!l) {
          n({
            ct: r ? t : void 0,
            rt: !r,
            st: i
          });
        }
        s = false;
      };
      if (S) {
        const t = new S((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(g);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (a) {
        const [t, n] = a(g, onSizeChangedCallbackProxy, r);
        push(o, concat([ addClass(p, dt), addEventListener(p, "animationstart", t) ], n));
      } else {
        return noop;
      }
      if (c) {
        const [t] = createCache({
          o: void 0
        }, f);
        push(o, addEventListener(p, "scroll", (n => {
          const o = t();
          const [s, e, c] = o;
          if (e) {
            removeClass(g, "ltr rtl");
            addClass(g, s ? "rtl" : "ltr");
            onSizeChangedCallbackProxy([ !!s, e, c ]);
          }
          stopPropagation(n);
        })));
      }
      return bind(runEachAndClear, push(o, appendChildren(t, p)));
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(bt);
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
      if (m) {
        o = new m(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = V(s);
          triggerOnTrinsicChangedCallback(t);
        };
        push(n, createSizeObserver(s, onSizeChanged)());
        onSizeChanged();
      }
      return bind(runEachAndClear, push(n, appendChildren(t, s)));
    }, () => o && intersectionObserverCallback(true, o.takeRecords()) ];
  };
  const createObserversSetup = (t, n) => {
    let o;
    let s;
    let e;
    let c;
    let r;
    const {H: l} = getEnvironment();
    const i = `[${K}]`;
    const a = `[${ct}]`;
    const u = [ "tabindex" ];
    const f = [ "wrap", "cols", "rows" ];
    const _ = [ "id", "class", "style", "open" ];
    const d = {
      lt: false,
      it: getDirectionIsRTL(t.ut)
    };
    const {ut: v, ft: h, _t: p, dt: g, vt: b, ht: w, gt: y} = t;
    const {U: m} = getEnvironment();
    const [$] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const t = w(it, nt);
      const n = w(rt, "");
      const o = n && getElmentScroll(h);
      y(it, nt);
      y(rt, "");
      y("", et, true);
      const s = B(p);
      const e = B(h);
      const c = fractionalSize(h);
      y(it, nt, t);
      y(rt, "", n);
      y("", et);
      scrollElementTo(h, o);
      return {
        w: e.w + s.w + c.w,
        h: e.h + s.h + c.h
      };
    }));
    const O = g ? f : concat(_, f);
    const x = debounce(n, {
      v: () => o,
      p: () => s,
      g(t, n) {
        const [o] = t;
        const [s] = n;
        return [ concat(keys(o), keys(s)).reduce(((t, n) => {
          t[n] = o[n] || s[n];
          return t;
        }), {}) ];
      }
    });
    const updateViewportAttrsFromHost = t => {
      each(t || u, (t => {
        if (inArray(u, t)) {
          const n = attr(v, t);
          if (isString(n)) {
            attr(h, t, n);
          } else {
            removeAttr(h, t);
          }
        }
      }));
    };
    const onTrinsicChanged = (t, o) => {
      const [s, e] = t;
      const c = {
        bt: e
      };
      assignDeep(d, {
        lt: s
      });
      !o && n(c);
      return c;
    };
    const onSizeChanged = ({rt: t, ct: o, st: s}) => {
      const e = t && !s && !o;
      const c = !e && l ? x : n;
      const [r, i] = o || [];
      o && assignDeep(d, {
        it: r
      });
      c({
        rt: t || s,
        st: s,
        wt: i
      });
    };
    const onContentMutation = (t, o) => {
      const [, s] = $();
      const e = {
        yt: s
      };
      const c = t ? n : x;
      s && !o && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        St: n
      };
      if (n && !o) {
        x(s);
      } else if (!b) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const [C, z] = p || !m ? createTrinsicObserver(v, onTrinsicChanged) : [];
    const H = !b && createSizeObserver(v, onSizeChanged, {
      st: true,
      ot: true,
      et: true
    });
    const [I, A] = createDOMObserver(v, false, onHostMutation, {
      Z: _,
      Y: concat(_, u)
    });
    const E = b && S && new S((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        rt: true,
        st: domRectAppeared(n, r)
      });
      r = n;
    }));
    return [ () => {
      updateViewportAttrsFromHost();
      E && E.observe(v);
      const t = H && H();
      const n = C && C();
      const o = I();
      return () => {
        E && E.disconnect();
        t && t();
        n && n();
        c && c();
        o();
      };
    }, ({$t: t, Ot: n, xt: r}) => {
      const l = {};
      const [u] = t("update.ignoreMutation");
      const [f, _] = t("update.attributes");
      const [d, v] = t("update.elementEvents");
      const [g, w] = t("update.debounce");
      const y = v || _;
      const m = n || r;
      const ignoreMutationFromOptions = t => isFunction(u) && u(t);
      if (y) {
        e && e();
        c && c();
        const [t, n] = createDOMObserver(p || h, true, onContentMutation, {
          Y: concat(O, f || []),
          J: d,
          K: i,
          nt: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !b ? liesBetween(o, i, a) : false;
            return e || !!closest(o, `.${mt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        c = t();
        e = n;
      }
      if (w) {
        x.m();
        if (isArray(g)) {
          const t = g[0];
          const n = g[1];
          o = isNumber(t) && t;
          s = isNumber(n) && n;
        } else if (isNumber(g)) {
          o = g;
          s = false;
        } else {
          o = false;
          s = false;
        }
      }
      if (m) {
        const t = A();
        const n = z && z();
        const o = e && e();
        t && assignDeep(l, onHostMutation(t[0], t[1], m));
        n && assignDeep(l, onTrinsicChanged(n[0], m));
        o && assignDeep(l, onContentMutation(o[0], m));
      }
      return l;
    }, d ];
  };
  const capNumber = (t, n, o) => i(t, a(n, o));
  const getScrollbarHandleOffsetPercent = (t, n, o) => {
    const s = u(n);
    const [e, c] = getRTLCompatibleScrollBounds(s, o);
    const r = (c - t) / c;
    const l = t / e;
    const i = t / c;
    const a = o ? o.n ? r : o.i ? l : i : i;
    return capNumber(0, 1, a);
  };
  const getScrollbarHandleLengthRatio = (t, n, o, s) => {
    if (s) {
      const t = o ? "x" : "y";
      const {Ct: n, zt: e} = s;
      const c = e[t];
      const r = n[t];
      return capNumber(0, 1, c / (c + r));
    }
    const e = o ? k : M;
    const c = getBoundingClientRect(t)[e];
    const r = getBoundingClientRect(n)[e];
    return capNumber(0, 1, c / r);
  };
  const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
    const {V: r} = getEnvironment();
    const l = c ? "x" : "y";
    const i = c ? "Left" : "Top";
    const {Ct: a} = s;
    const u = getScrollbarHandleLengthRatio(t, n, c);
    return 1 / u * (1 - u) * getScrollbarHandleOffsetPercent(o[`scroll${i}`], a[l], c && e && r);
  };
  const createScrollbarsSetupElements = (t, n, o) => {
    const {G: s, A: e} = getEnvironment();
    const {scrollbars: c} = s();
    const {slot: r} = c;
    const {Ht: l, ut: a, ft: u, It: f, At: _, Et: d, vt: h} = n;
    const {scrollbars: p} = f ? {} : t;
    const {slot: g} = p || {};
    const b = new Map;
    const initScrollTimeline = t => $ && new $({
      source: _,
      axis: t
    });
    const w = initScrollTimeline("x");
    const y = initScrollTimeline("y");
    const m = dynamicInitializationElement([ l, a, u ], (() => h && d ? l : a), r, g);
    const doRefreshScrollbarOffset = t => h && !d && parent(t) === u;
    const cancelElementAnimations = t => {
      b.forEach(((n, o) => {
        const s = t ? inArray(isArray(t) ? t : [ t ], o) : true;
        if (s) {
          (n || []).forEach((t => {
            t && t.cancel();
          }));
          b.delete(o);
        }
      }));
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
        style(o, s);
      }));
    };
    const scrollbarStructureRefreshHandleLength = (t, n, o) => {
      scrollbarStyle(t, (t => {
        const {Dt: s, Rt: e} = t;
        return [ s, {
          [o ? k : M]: `${(getScrollbarHandleLengthRatio(s, e, o, n) * 100).toFixed(3)}%`
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
      if (!y && !y) {
        scrollbarStyle(t, (t => {
          const {Dt: s, Rt: e, Tt: c} = t;
          const r = getScrollbarHandleOffsetRatio(s, e, _, n, getDirectionIsRTL(c), o);
          const l = r === r;
          return [ s, {
            transform: l ? getTrasformTranslateValue(`${(r * 100).toFixed(3)}%`, o) : ""
          } ];
        }));
      }
    };
    const styleScrollbarPosition = t => {
      const {Tt: n} = t;
      const o = doRefreshScrollbarOffset(n) && n;
      const s = getElmentScroll(_);
      return [ o, {
        transform: o ? getTrasformTranslateValue({
          x: `${s.x}px`,
          y: `${s.y}px`
        }) : ""
      } ];
    };
    const animateElement = (t, n, o, s) => n && t.animate(o, {
      timeline: n,
      composite: s
    });
    const animateScrollbarOffset = (t, n, o, s) => animateElement(t, n, {
      transform: [ getTrasformTranslateValue(`0px`, s), getTrasformTranslateValue(`${i(0, o - .5)}px`, s) ]
    }, "add");
    const S = [];
    const O = [];
    const x = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(O, t, n);
      c && scrollbarStructureAddRemoveClass(x, t, n);
    };
    const refreshScrollbarsHandleLength = t => {
      scrollbarStructureRefreshHandleLength(O, t, true);
      scrollbarStructureRefreshHandleLength(x, t);
    };
    const refreshScrollbarsHandleOffset = t => {
      scrollbarStructureRefreshHandleOffset(O, t, true);
      scrollbarStructureRefreshHandleOffset(x, t);
    };
    const refreshScrollbarsHandleOffsetTimeline = () => {
      const forEachFn = (t, {Tt: n, Dt: o}) => {
        const s = t && getDirectionIsRTL(n);
        cancelElementAnimations(o);
        b.set(o, [ animateElement(o, t ? w : y, {
          transform: [ getTrasformTranslateValue(`0%`, t), getTrasformTranslateValue(t && s ? "100%" : "-100%", t) ],
          [t ? s ? "right" : "left" : "top"]: [ "0%", "100%" ]
        }) ]);
      };
      O.forEach(bind(forEachFn, true));
      x.forEach(bind(forEachFn, false));
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (!y && !y) {
        h && scrollbarStyle(O, styleScrollbarPosition);
        h && scrollbarStyle(x, styleScrollbarPosition);
      }
    };
    const refreshScrollbarsScrollbarOffsetTimeline = ({Ct: t}) => {
      concat(x, O).forEach((({Tt: n}) => {
        cancelElementAnimations(n);
        if (doRefreshScrollbarOffset(n)) {
          b.set(n, [ animateScrollbarOffset(n, w, t.x, true), animateScrollbarOffset(n, y, t.y) ]);
        }
      }));
    };
    const generateScrollbarDOM = t => {
      const n = t ? $t : Ot;
      const s = t ? O : x;
      const c = isEmptyArray(s) ? It : "";
      const r = createDiv(`${mt} ${n} ${c}`);
      const l = createDiv(xt);
      const i = createDiv(Ct);
      const a = {
        Tt: r,
        Rt: l,
        Dt: i
      };
      if (!e) {
        addClass(r, wt);
      }
      push(s, a);
      push(S, [ appendChildren(r, l), appendChildren(l, i), bind(removeElements, r), cancelElementAnimations, o(a, scrollbarsAddRemoveClass, t) ]);
      return a;
    };
    const C = bind(generateScrollbarDOM, true);
    const z = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(m, O[0].Tt);
      appendChildren(m, x[0].Tt);
      v((() => {
        scrollbarsAddRemoveClass(It);
      }), 300);
      return bind(runEachAndClear, S);
    };
    C();
    z();
    return [ {
      kt: refreshScrollbarsHandleLength,
      Mt: refreshScrollbarsHandleOffset,
      Lt: refreshScrollbarsHandleOffsetTimeline,
      Pt: refreshScrollbarsScrollbarOffsetTimeline,
      Vt: refreshScrollbarsScrollbarOffset,
      Ut: scrollbarsAddRemoveClass,
      Bt: {
        P: w,
        jt: O,
        Gt: C,
        Nt: bind(scrollbarStyle, O)
      },
      qt: {
        P: y,
        jt: x,
        Gt: z,
        Nt: bind(scrollbarStyle, x)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o) => {
    const {ut: s, At: e, Wt: c} = n;
    const createInteractiveScrollEvents = (n, r) => {
      const {Dt: l, Rt: i} = n;
      const a = `scroll${r ? "Left" : "Top"}`;
      const f = `client${r ? "X" : "Y"}`;
      const _ = r ? k : M;
      const d = r ? "left" : "top";
      const v = r ? "w" : "h";
      const h = r ? "x" : "y";
      const p = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {Ct: c} = o;
        const r = V(i)[v] - V(l)[v];
        const u = n * s / r;
        const f = u * c[h];
        e[a] = t + f;
      };
      return addEventListener(i, "pointerdown", (n => {
        const o = closest(n.target, `.${Ct}`) === l;
        const r = o ? l : i;
        const h = t.scrollbars;
        const {button: g, isPrimary: b, pointerType: w} = n;
        const {pointers: y} = h;
        const m = g === 0 && b && h[o ? "dragScroll" : "clickScroll"] && (y || []).includes(w);
        attrClass(s, K, st, true);
        if (m) {
          const t = !o && n.shiftKey;
          const h = bind(getBoundingClientRect, l);
          const g = bind(getBoundingClientRect, i);
          const getHandleOffset = (t, n) => (t || h())[d] - (n || g())[d];
          const b = u(getBoundingClientRect(e)[_]) / V(e)[v] || 1;
          const w = createRelativeHandleMove(e[a] || 0, 1 / b);
          const y = n[f];
          const m = h();
          const S = g();
          const $ = m[_];
          const O = getHandleOffset(m, S) + $ / 2;
          const x = y - S[d];
          const C = o ? 0 : x - O;
          const releasePointerCapture = t => {
            runEachAndClear(z);
            r.releasePointerCapture(t.pointerId);
          };
          const z = [ bind(attrClass, s, K, st), addEventListener(c, p, releasePointerCapture), addEventListener(c, "selectstart", (t => preventDefault(t)), {
            S: false
          }), addEventListener(i, p, releasePointerCapture), addEventListener(i, "pointermove", (n => {
            const s = n[f] - y;
            if (o || t) {
              w(C + s);
            }
          })) ];
          if (t) {
            w(C);
          } else if (!o) {
            const t = getStaticPluginModuleInstance(qt);
            t && push(z, t(w, getHandleOffset, C, $, x));
          }
          r.setPointerCapture(n.pointerId);
        }
      }));
    };
    return (t, n, o) => {
      const {Tt: r} = t;
      const [l, i] = selfClearTimeout(333);
      const a = !!e.scrollBy;
      let u = true;
      return bind(runEachAndClear, [ addEventListener(r, "pointerenter", (() => {
        n(At, true);
      })), addEventListener(r, "pointerleave pointercancel", (() => {
        n(At, false);
      })), addEventListener(r, "wheel", (t => {
        const {deltaX: o, deltaY: c, deltaMode: i} = t;
        if (a && u && i === 0 && parent(r) === s) {
          e.scrollBy({
            left: o,
            top: c,
            behavior: "smooth"
          });
        }
        u = false;
        n(Rt, true);
        l((() => {
          u = true;
          n(Rt);
        }));
        preventDefault(t);
      }), {
        S: false,
        $: true
      }), addEventListener(r, "mousedown", bind(addEventListener, c, "click", stopPropagation, {
        O: true,
        $: true
      }), {
        $: true
      }), createInteractiveScrollEvents(t, o), i ]);
    };
  };
  const createScrollbarsSetup = (t, n, o, s, e, c) => {
    let r;
    let l;
    let i;
    let a;
    let u;
    let f = noop;
    let _ = 0;
    const [d, v] = selfClearTimeout();
    const [h, p] = selfClearTimeout();
    const [g, b] = selfClearTimeout(100);
    const [w, y] = selfClearTimeout(100);
    const [m, S] = selfClearTimeout(100);
    const [$, O] = selfClearTimeout((() => _));
    const [x, C] = createScrollbarsSetupElements(t, e, createScrollbarsSetupEvents(n, e, s));
    const {ut: z, Ft: H, Et: I} = e;
    const {Ut: A, kt: E, Mt: T, Lt: D, Pt: R, Vt: k} = x;
    const manageAutoHideSuspension = t => {
      A(Tt, t, true);
      A(Tt, t, false);
    };
    const manageScrollbarsAutoHide = (t, n) => {
      O();
      if (t) {
        A(Dt);
      } else {
        const t = bind(A, Dt, true);
        if (_ > 0 && !n) {
          $(t);
        } else {
          t();
        }
      }
    };
    const isHoverablePointerType = t => t.pointerType === "mouse";
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        a = l;
        a && manageScrollbarsAutoHide(true);
      }
    };
    const M = [ b, O, y, S, p, v, () => f(), addEventListener(z, "pointerover", onHostMouseEnter, {
      O: true
    }), addEventListener(z, "pointerenter", onHostMouseEnter), addEventListener(z, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        a = false;
        l && manageScrollbarsAutoHide(false);
      }
    })), addEventListener(z, "pointermove", (t => {
      isHoverablePointerType(t) && r && d((() => {
        b();
        manageScrollbarsAutoHide(true);
        w((() => {
          r && manageScrollbarsAutoHide(false);
        }));
      }));
    })), addEventListener(H, "scroll", (t => {
      h((() => {
        T(s);
        i && manageScrollbarsAutoHide(true);
        g((() => {
          i && !a && manageScrollbarsAutoHide(false);
        }));
      }));
      c(t);
      k();
    })) ];
    return [ () => bind(runEachAndClear, push(M, C())), ({$t: t, xt: n, Xt: e, Yt: c}) => {
      const {Zt: a, Jt: d, Kt: v} = c || {};
      const {wt: h, st: p} = e || {};
      const {it: g} = o;
      const {I: b} = getEnvironment();
      const {Ct: w, Qt: y, tn: S} = s;
      const [$, O] = t("showNativeOverlaidScrollbars");
      const [x, C] = t("scrollbars.theme");
      const [z, M] = t("scrollbars.visibility");
      const [L, P] = t("scrollbars.autoHide");
      const [V, U] = t("scrollbars.autoHideSuspend");
      const [B] = t("scrollbars.autoHideDelay");
      const [j, G] = t("scrollbars.dragScroll");
      const [N, q] = t("scrollbars.clickScroll");
      const W = p && !n;
      const F = S.x || S.y;
      const X = a || d || h || n;
      const Y = v || M;
      const Z = $ && b.x && b.y;
      const setScrollbarVisibility = (t, n) => {
        const o = z === "visible" || z === "auto" && t === "scroll";
        A(zt, o, n);
        return o;
      };
      _ = B;
      if (W) {
        if (V && F) {
          manageAutoHideSuspension(false);
          f();
          m((() => {
            f = addEventListener(H, "scroll", bind(manageAutoHideSuspension, true), {
              O: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if (O) {
        A(yt, Z);
      }
      if (C) {
        A(u);
        A(x, true);
        u = x;
      }
      if (U && !V) {
        manageAutoHideSuspension(true);
      }
      if (P) {
        r = L === "move";
        l = L === "leave";
        i = L !== "never";
        manageScrollbarsAutoHide(!i, true);
      }
      if (G) {
        A(Mt, j);
      }
      if (q) {
        A(kt, N);
      }
      if (Y) {
        const t = setScrollbarVisibility(y.x, true);
        const n = setScrollbarVisibility(y.y, false);
        const o = t && n;
        A(Ht, !o);
      }
      if (X) {
        E(s);
        T(s);
        D(s);
        k();
        R(s);
        A(Et, !w.x, true);
        A(Et, !w.y, false);
        A(St, g && !I);
      }
    }, {}, x ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {G: o, H: s} = n;
    const e = getStaticPluginModuleInstance(Gt);
    const c = e && e.C;
    const {elements: r} = o();
    const {host: l, padding: i, viewport: a, content: u} = r;
    const f = isHTMLElement(t);
    const _ = f ? {} : t;
    const {elements: d} = _;
    const {host: v, padding: h, viewport: p, content: g} = d || {};
    const b = f ? t : _.target;
    const w = is(b, "textarea");
    const y = b.ownerDocument;
    const m = y.documentElement;
    const S = b === y.body;
    const $ = y.defaultView;
    const O = bind(staticInitializationElement, [ b ]);
    const x = bind(dynamicInitializationElement, [ b ]);
    const C = bind(resolveInitialization, [ b ]);
    const z = bind(createDiv, "");
    const H = bind(O, z, a);
    const I = bind(x, z, u);
    const A = H(p);
    const E = A === b;
    const T = E && S;
    const D = !E && I(g);
    const R = !E && isHTMLElement(A) && A === D;
    const k = R && !!C(u);
    const M = k ? H() : A;
    const L = k ? D : I();
    const P = R ? M : A;
    const V = T ? m : P;
    const U = w ? O(z, l, v) : b;
    const B = T ? V : U;
    const j = R ? L : D;
    const G = y.activeElement;
    const N = !E && $.top === $ && G === b;
    const q = {
      Ht: b,
      ut: B,
      ft: V,
      nn: !E && x(z, i, h),
      _t: j,
      sn: !E && !s && c && c(n),
      At: T ? m : V,
      Ft: T ? y : V,
      en: $,
      Wt: y,
      dt: w,
      Et: S,
      It: f,
      vt: E,
      cn: R,
      ht: (t, n) => hasAttrClass(V, E ? K : ct, E ? n : t),
      gt: (t, n, o) => attrClass(V, E ? K : ct, E ? n : t, o)
    };
    const W = keys(q).reduce(((t, n) => {
      const o = q[n];
      return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? inArray(W, t) : null;
    const {Ht: F, ut: X, nn: Y, ft: nt, _t: ot, sn: st} = q;
    const et = [ () => {
      removeAttr(X, K);
      removeAttr(X, J);
      removeAttr(F, J);
      if (S) {
        removeAttr(m, K);
        removeAttr(m, J);
      }
    } ];
    const rt = w && elementIsGenerated(X);
    let it = w ? F : contents([ ot, nt, Y, X, F ].find((t => elementIsGenerated(t) === false)));
    const ut = T ? F : ot || nt;
    const _t = bind(runEachAndClear, et);
    const appendElements = () => {
      attr(X, K, E ? "viewport" : "host");
      attr(Y, at, "");
      attr(ot, ft, "");
      if (!E) {
        attr(nt, ct, "");
      }
      const t = S && !E ? addClass(parent(b), Z) : noop;
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      if (rt) {
        insertAfter(F, X);
        push(et, (() => {
          insertAfter(X, F);
          removeElements(X);
        }));
      }
      appendChildren(ut, it);
      appendChildren(X, Y);
      appendChildren(Y || X, !E && nt);
      appendChildren(nt, ot);
      push(et, (() => {
        t();
        removeAttr(Y, at);
        removeAttr(ot, ft);
        removeAttr(nt, Q);
        removeAttr(nt, tt);
        removeAttr(nt, ct);
        elementIsGenerated(ot) && unwrap(ot);
        elementIsGenerated(nt) && unwrap(nt);
        elementIsGenerated(Y) && unwrap(Y);
      }));
      if (s && !E) {
        attrClass(nt, ct, lt, true);
        push(et, bind(removeAttr, nt, ct));
      }
      if (st) {
        insertBefore(nt, st);
        push(et, bind(removeElements, st));
      }
      if (N) {
        const t = "tabindex";
        const n = attr(nt, t);
        attr(nt, t, "-1");
        nt.focus();
        const revertViewportTabIndex = () => n ? attr(nt, t, n) : removeAttr(nt, t);
        const o = addEventListener(y, "pointerdown keydown", (() => {
          revertViewportTabIndex();
          o();
        }));
        push(et, [ revertViewportTabIndex, o ]);
      } else if (G && G.focus) {
        G.focus();
      }
      it = 0;
      return _t;
    };
    return [ q, appendElements, _t ];
  };
  const createTrinsicUpdateSegment = ({_t: t}) => ({Xt: n, rn: o, xt: s}) => {
    const {U: e} = getEnvironment();
    const {bt: c} = n || {};
    const {lt: r} = o;
    const l = (t || !e) && (c || s);
    if (l) {
      style(t, {
        [M]: r ? "" : "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ut: t, nn: n, ft: o, vt: s}, e) => {
    const [c, r] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({$t: t, Xt: l, rn: i, xt: a}) => {
      let [u, f] = r(a);
      const {H: _, U: d} = getEnvironment();
      const {rt: v, yt: h, wt: p} = l || {};
      const {it: g} = i;
      const [b, w] = t("paddingAbsolute");
      const y = a || !d && h;
      if (v || f || y) {
        [u, f] = c(a);
      }
      const m = !s && (w || p || f);
      if (m) {
        const t = !b || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [E]: t && !g ? -s : 0,
          [T]: t ? -c : 0,
          [A]: t && g ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? g ? -u.r : "auto" : 0,
          left: t ? g ? "auto" : -u.l : 0,
          [k]: t ? `calc(100% + ${s}px)` : ""
        };
        const l = {
          [C]: t ? u.t : 0,
          [z]: t ? u.r : 0,
          [I]: t ? u.b : 0,
          [H]: t ? u.l : 0
        };
        style(n || o, r);
        style(o, l);
        assignDeep(e, {
          nn: u,
          ln: !t,
          D: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        an: m
      };
    };
  };
  const createOverflowUpdateSegment = ({ut: t, nn: n, ft: o, sn: s, vt: e, gt: c, Et: r, en: a}, u) => {
    const f = bind(i, 0);
    const _ = "visible";
    const d = 42;
    const v = {
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const h = {
      u: equalXY,
      o: {
        x: L,
        y: L
      }
    };
    const getOverflowAmount = (t, n) => {
      const o = l.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const s = {
        w: f(t.w - n.w),
        h: f(t.h - n.h)
      };
      return {
        w: s.w > o ? s.w : 0,
        h: s.h > o ? s.h : 0
      };
    };
    const overflowIsVisible = t => t.indexOf(_) === 0;
    const {L: p, U: g, H: b, I: w} = getEnvironment();
    const y = getStaticPluginModuleInstance(Gt);
    const m = !e && !b && (w.x || w.y);
    const S = r && e;
    const [$, O] = createCache(v, bind(fractionalSize, o));
    const [x, C] = createCache(v, bind(B, o));
    const [P, V] = createCache(v);
    const [j, G] = createCache(v);
    const [N] = createCache(h);
    const fixFlexboxGlue = (n, s) => {
      style(o, {
        [M]: ""
      });
      if (s) {
        const {ln: s, nn: e} = u;
        const {un: c, R: r} = n;
        const l = fractionalSize(t);
        const i = U(t);
        const a = style(o, "boxSizing") === "content-box";
        const f = s || a ? e.b + e.t : 0;
        const _ = !(w.x && a);
        style(o, {
          [M]: i.h + l.h + (c.x && _ ? r.x : 0) - f
        });
      }
    };
    const getViewportOverflowState = (t, n) => {
      const s = !b && !t ? d : 0;
      const getStatePerAxis = (t, e, c) => {
        const r = style(o, t);
        const l = n ? n[t] : r;
        const i = l === "scroll";
        const a = e ? s : c;
        const u = i && !b ? a : 0;
        const f = e && !!s;
        return [ r, i, u, f ];
      };
      const [e, c, r, l] = getStatePerAxis(D, w.x, p.x);
      const [i, a, u, f] = getStatePerAxis(R, w.y, p.y);
      return {
        Qt: {
          x: e,
          y: i
        },
        un: {
          x: c,
          y: a
        },
        R: {
          x: r,
          y: u
        },
        k: {
          x: l,
          y: f
        }
      };
    };
    const setViewportOverflowState = (t, n, o, s) => {
      const setAxisOverflowStyle = (t, n) => {
        const o = overflowIsVisible(t);
        const s = n && o && t.replace(`${_}-`, "") || "";
        return [ n && !o ? t : "", overflowIsVisible(s) ? "hidden" : s ];
      };
      const [e, c] = setAxisOverflowStyle(o.x, n.x);
      const [r, l] = setAxisOverflowStyle(o.y, n.y);
      s[D] = c && r ? c : e;
      s[R] = l && e ? l : r;
      return getViewportOverflowState(t, s);
    };
    const hideNativeScrollbars = (t, n, o, s) => {
      const {R: e, k: c} = t;
      const {x: r, y: l} = c;
      const {x: i, y: a} = e;
      const {D: f} = u;
      const _ = n ? A : E;
      const d = n ? H : z;
      const v = f[_];
      const h = f[T];
      const p = f[d];
      const g = f[I];
      s[k] = `calc(100% + ${a + v * -1}px)`;
      s[_] = -a + v;
      s[T] = -i + h;
      if (o) {
        s[d] = p + (l ? a : 0);
        s[I] = g + (r ? i : 0);
      }
    };
    const [q, W] = y ? y.T(m, g, o, s, u, getViewportOverflowState, hideNativeScrollbars) : [ () => m, () => [ noop ] ];
    return ({$t: s, Xt: r, rn: l, xt: _}, {an: d}) => {
      const {rt: v, St: h, yt: p, bt: y, wt: m} = r || {};
      const {lt: z, it: H} = l;
      const [I, M] = s("showNativeOverlaidScrollbars");
      const [L, F] = s("overflow");
      const X = I && w.x && w.y;
      const Y = !e && !g && (v || p || h || M || y);
      const Z = v || d || p || m || M;
      const J = overflowIsVisible(L.x);
      const st = overflowIsVisible(L.y);
      const et = J || st;
      let rt = O(_);
      let ft = C(_);
      let _t = V(_);
      let dt = G(_);
      let vt;
      if (M && b) {
        c(lt, ot, !X);
      }
      if (Y) {
        vt = getViewportOverflowState(X);
        fixFlexboxGlue(vt, z);
      }
      if (Z) {
        if (et) {
          c(it, nt, false);
        }
        const [t, n] = W(X, H, vt);
        const [s, e] = rt = $(_);
        const [r, l] = ft = x(_);
        const u = U(o);
        let d = r;
        let v = u;
        t();
        if ((l || e || M) && n && !X && q(n, r, s, H)) {
          v = U(o);
          d = B(o);
        }
        const h = windowSize(a);
        const p = {
          w: f(i(r.w, d.w) + s.w),
          h: f(i(r.h, d.h) + s.h)
        };
        const g = {
          w: f((S ? h.w : v.w + f(u.w - r.w)) + s.w),
          h: f((S ? h.h : v.h + f(u.h - r.h)) + s.h)
        };
        dt = j(g);
        _t = P(getOverflowAmount(p, g), _);
      }
      const [ht, pt] = dt;
      const [gt, bt] = _t;
      const [wt, yt] = ft;
      const [mt, St] = rt;
      const $t = {
        x: gt.w > 0,
        y: gt.h > 0
      };
      const Ot = J && st && ($t.x || $t.y) || J && $t.x && !$t.y || st && $t.y && !$t.x;
      const xt = d || m || St || yt || pt || bt || F || M || Y || Z;
      if (xt) {
        const n = {
          [E]: 0,
          [T]: 0,
          [A]: 0,
          [k]: "",
          [D]: "",
          [R]: ""
        };
        const s = setViewportOverflowState(X, $t, L, n);
        const c = q(s, wt, mt, H);
        if (!e) {
          hideNativeScrollbars(s, H, c, n);
        }
        if (Y) {
          fixFlexboxGlue(s, z);
        }
        if (e) {
          attr(t, Q, n[D]);
          attr(t, tt, n[R]);
        } else {
          style(o, n);
        }
      }
      attrClass(t, K, nt, Ot);
      attrClass(n, at, ut, Ot);
      if (!e) {
        attrClass(o, ct, it, et);
      }
      const [Ct, zt] = N(getViewportOverflowState(X).Qt);
      assignDeep(u, {
        Qt: Ct,
        zt: {
          x: ht.w,
          y: ht.h
        },
        Ct: {
          x: gt.w,
          y: gt.h
        },
        tn: $t
      });
      return {
        Kt: zt,
        Zt: pt,
        Jt: bt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      nn: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ln: false,
      D: {
        [E]: 0,
        [T]: 0,
        [A]: 0,
        [C]: 0,
        [z]: 0,
        [I]: 0,
        [H]: 0
      },
      zt: {
        x: 0,
        y: 0
      },
      Ct: {
        x: 0,
        y: 0
      },
      Qt: {
        x: L,
        y: L
      },
      tn: {
        x: false,
        y: false
      }
    };
    const {Ht: c, ft: r, gt: l, vt: i} = n;
    const {H: a, I: u, U: f} = getEnvironment();
    const _ = !a && (u.x || u.y);
    const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = _ || !f;
      const s = o && getElmentScroll(r);
      l("", et, true);
      each(d, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      l("", et);
      scrollElementTo(r, s);
      !i && scrollElementTo(c, 0);
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s) => {
    const [e, c, r, l, i] = createStructureSetup(t);
    const [a, u, f] = createObserversSetup(l, (t => {
      update({}, t);
    }));
    const [_, d, , v] = createScrollbarsSetup(t, n, f, r, l, s);
    const booleanUpdateHints = t => each(assignDeep({}, t), ((t, n, o) => {
      o[n] = !!t;
    }));
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {fn: e, xt: r, Ot: l, _n: i, dn: a} = t;
      const _ = e || {};
      const v = !!r;
      const h = {
        $t: createOptionCheck(n, _, v),
        fn: _,
        xt: v
      };
      if (i) {
        d(h);
        return false;
      }
      const p = s || u(assignDeep({}, h, {
        Ot: l
      }));
      if (a) {
        assignDeep(p, {
          rt: true,
          yt: true
        });
      }
      const g = c(assignDeep({}, h, {
        rn: f,
        Xt: p
      }));
      d(assignDeep({}, h, {
        Xt: p,
        Yt: g
      }));
      const b = updateHintsAreTruthy(p);
      const w = updateHintsAreTruthy(g);
      const y = b || w || !isEmptyObject(_) || v;
      y && o(t, {
        Xt: booleanUpdateHints(p),
        Yt: booleanUpdateHints(g)
      });
      return y;
    };
    return [ () => {
      const {Ht: t, ft: n, Wt: o, Et: s} = l;
      const c = s ? o.documentElement : t;
      const r = getElmentScroll(c);
      const i = [ a(), e(), _() ];
      scrollElementTo(n, r);
      return bind(runEachAndClear, i);
    }, update, () => ({
      vn: f,
      hn: r
    }), {
      pn: l,
      gn: v
    }, i ];
  };
  const OverlayScrollbars = (t, n, o) => {
    const {q: s, B: e, j: c} = getEnvironment();
    const r = isHTMLElement(t);
    const l = r ? t : t.target;
    const i = getInstance(l);
    if (n && !i) {
      let i = false;
      const a = [];
      const u = {};
      const validateOptions = t => {
        const n = getStaticPluginModuleInstance(Vt);
        return n ? n(t, true) : t;
      };
      const f = assignDeep({}, s(), validateOptions(n));
      const [_, d, v] = createEventListenerHub(o);
      const [h, p, g, b, w] = createSetups(t, f, (({fn: t, xt: n}, {Xt: o, Yt: s}) => {
        const {rt: e, wt: c, bt: r, yt: l, St: i} = o;
        const {Zt: a, Jt: u, Kt: f} = s;
        v("updated", [ y, {
          updateHints: {
            sizeChanged: e,
            directionChanged: c,
            heightIntrinsicChanged: r,
            overflowEdgeChanged: a,
            overflowAmountChanged: u,
            overflowStyleChanged: f,
            contentMutation: l,
            hostMutation: i
          },
          changedOptions: t || {},
          force: !!n
        } ]);
      }), (t => v("scroll", [ y, t ])));
      const destroy = t => {
        removeInstance(l);
        runEachAndClear(a);
        i = true;
        v("destroyed", [ y, t ]);
        d();
      };
      const y = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(f, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(f, e);
              p({
                fn: e
              });
            }
          }
          return assignDeep({}, f);
        },
        on: _,
        off: (t, n) => {
          t && n && d(t, n);
        },
        state() {
          const {vn: t, hn: n} = g();
          const {it: o} = t;
          const {zt: s, Ct: e, Qt: c, tn: r, nn: l, ln: a} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: r,
            padding: l,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: i
          });
        },
        elements() {
          const {Ht: t, ut: n, nn: o, ft: s, _t: e, At: c, Ft: r} = b.pn;
          const {Bt: l, qt: i} = b.gn;
          const translateScrollbarStructure = t => {
            const {Dt: n, Rt: o, Tt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {jt: n, Gt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                p({
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
        update: t => p({
          xt: t,
          Ot: true
        }),
        destroy: bind(destroy, false),
        plugin: t => u[keys(t)[0]]
      };
      const onWindowResize = () => {
        const {hn: t} = g();
        const {tn: n} = t;
        const o = n.x || n.y;
        o && p({
          dn: o
        });
      };
      push(a, [ e(onWindowResize), c(onWindowResize), w ]);
      addInstance(l, y);
      registerPluginModuleInstances(Lt, OverlayScrollbars, y, u);
      if (cancelInitialization(b.pn.Et, !r && t.cancel)) {
        destroy(true);
        return y;
      }
      push(a, h());
      v("initialized", [ y ]);
      y.update(true);
      return y;
    }
    return i;
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
    const {L: t, I: n, H: o, V: s, U: e, A: c, P: r, F: l, X: i, G: a, N: u, q: f, W: _} = getEnvironment();
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
      setDefaultOptions: _
    });
  };
  t.ClickScrollPlugin = Wt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Nt;
  t.SizeObserverPlugin = Bt;
  Object.defineProperties(t, {
    bn: {
      value: true
    },
    [Symbol.toStringTag]: {
      value: "Module"
    }
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
