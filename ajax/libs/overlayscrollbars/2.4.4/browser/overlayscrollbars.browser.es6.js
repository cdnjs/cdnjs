/*!
 * OverlayScrollbars
 * Version: 2.4.4
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
  const H = "paddingRight";
  const z = "paddingLeft";
  const I = "paddingBottom";
  const A = "marginLeft";
  const E = "marginRight";
  const T = "marginBottom";
  const k = "overflowX";
  const D = "overflowY";
  const M = "width";
  const R = "height";
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
    const n = parseFloat(style(t, M)) || 0;
    const o = parseFloat(style(t, R)) || 0;
    return {
      w: n - u(n),
      h: o - u(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t[R] || t[M]));
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
  const equalBCRWH = (t, n, o) => equal(t, n, [ M, R ], o && (t => u(t)));
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
  const F = `data-overlayscrollbars`;
  const W = "os-environment";
  const X = `${W}-flexbox-glue`;
  const Y = `${X}-max`;
  const J = `os-scrollbar-hidden`;
  const K = `${F}-initialize`;
  const Z = F;
  const Q = `${Z}-overflow-x`;
  const tt = `${Z}-overflow-y`;
  const nt = "overflowVisible";
  const ot = "scrollbarHidden";
  const st = "scrollbarPressed";
  const et = "updating";
  const ct = `${F}-viewport`;
  const rt = "arrange";
  const lt = "scrollbarHidden";
  const it = nt;
  const at = `${F}-padding`;
  const ut = it;
  const ft = `${F}-content`;
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
  const Ht = `${mt}-visible`;
  const zt = `${mt}-cornerless`;
  const It = `${mt}-transitionless`;
  const At = `${mt}-interaction`;
  const Et = `${mt}-unusable`;
  const Tt = `${mt}-auto-hide`;
  const kt = `${Tt}-hidden`;
  const Dt = `${mt}-wheel`;
  const Mt = `${xt}-interactive`;
  const Rt = `${Ct}-interactive`;
  const Lt = {};
  const Pt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      Lt[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || Pt)[s] = t;
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
          [M]: s,
          [R]: s
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
              const {k: t} = e;
              const {D: i, M: a} = n;
              const {x: u, y: f} = a;
              const {x: _, y: d} = i;
              const v = l ? H : z;
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
                    o[M] = w.w;
                    o[R] = w.h;
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
              const {k: u} = e;
              const {M: f} = a;
              const {x: _, y: d} = f;
              const v = {};
              const assignProps = t => each(t, (t => {
                v[t] = u[t];
              }));
              if (_) {
                assignProps([ T, C, I ]);
              }
              if (d) {
                assignProps([ A, E, z, H ]);
              }
              const h = style(o, keys(v));
              attrClass(o, ct, rt);
              if (!n) {
                v[R] = "";
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
        R: () => {
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
          return (o, s) => {
            const e = windowSize();
            const c = {
              w: e.w - t.w,
              h: e.h - t.h
            };
            if (c.w === 0 && c.h === 0) {
              return;
            }
            const r = {
              w: f(c.w),
              h: f(c.h)
            };
            const l = {
              w: f(u(e.w / (t.w / 100))),
              h: f(u(e.h / (t.h / 100)))
            };
            const i = getWindowDPR();
            const a = r.w > 2 && r.h > 2;
            const _ = !diffBiggerThanOne(l.w, l.h);
            const d = i !== n && i > 0;
            const v = a && _ && d;
            let h;
            let p;
            if (v) {
              [p, h] = s();
              assignDeep(o.L, p);
            }
            t = e;
            n = i;
            return h;
          };
        }
      })
    }
  }))();
  const qt = "__osClickScrollPlugin";
  const Ft = /* @__PURE__ */ (() => ({
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
  let Wt;
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
    const o = addClass(t, J);
    try {
      n = style(t, cssProperty("scrollbar-width")) === "none" || l.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const getRtlScrollBehavior = (t, n) => {
    style(t, {
      [k]: L,
      [D]: L,
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
    const n = createDOM(`<div class="${W}"><div></div></div>`);
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
      B: bind(e, "r"),
      j: h,
      G: t => assignDeep(_, t) && h(),
      N: v,
      q: t => assignDeep(d, t) && v(),
      F: assignDeep({}, _),
      W: assignDeep({}, d)
    };
    removeAttr(o, "style");
    removeElements(o);
    l.addEventListener("resize", (() => {
      let t;
      if (!u && (!f.x || !f.y)) {
        const n = getStaticPluginModuleInstance(Gt);
        const o = n ? n.R() : noop;
        t = !!o(p, r);
      }
      c("r", [ t ]);
    }));
    return p;
  };
  const getEnvironment = () => {
    if (!Wt) {
      Wt = createEnvironment();
    }
    return Wt;
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
    const {I: e, H: c, j: r} = getEnvironment();
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
    const {X: c, Y: r, J: l, K: i, Z: a, tt: u} = s || {};
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
    const s = 3333333;
    const {nt: e, ot: c} = o || {};
    const r = getStaticPluginModuleInstance(Ut);
    const {V: l} = getEnvironment();
    const i = bind(getDirectionIsRTL, t);
    const [a] = createCache({
      o: false,
      _: true
    });
    return () => {
      const o = [];
      const u = createDOM(`<div class="${_t}"><div class="${vt}"></div></div>`);
      const f = u[0];
      const _ = f.firstChild;
      const onSizeChangedCallbackProxy = t => {
        const o = t instanceof ResizeObserverEntry;
        const c = !o && isArray(t);
        let r = false;
        let i = false;
        let u = true;
        if (o) {
          const [n, , o] = a(t.contentRect);
          const s = domRectHasDimensions(n);
          const e = domRectAppeared(n, o);
          const c = !o;
          i = c || e;
          r = !i && !s;
          u = !r;
        } else if (c) {
          [, u] = t;
        } else {
          i = t === true;
        }
        if (e && u) {
          const n = c ? t[0] : getDirectionIsRTL(f);
          scrollElementTo(f, {
            x: getRTLCompatibleScrollPosition(s, s, n && l),
            y: s
          });
        }
        if (!r) {
          n({
            st: c ? t : void 0,
            et: !c,
            ot: i
          });
        }
      };
      if (S) {
        const t = new S((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(_);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (r) {
        const [t, n] = r(_, onSizeChangedCallbackProxy, c);
        push(o, concat([ addClass(f, dt), addEventListener(f, "animationstart", t) ], n));
      } else {
        return noop;
      }
      if (e) {
        const [t] = createCache({
          o: void 0
        }, i);
        push(o, addEventListener(f, "scroll", (n => {
          const o = t();
          const [s, e, c] = o;
          if (e) {
            removeClass(_, "ltr rtl");
            addClass(_, s ? "rtl" : "ltr");
            onSizeChangedCallbackProxy([ !!s, e, c ]);
          }
          stopPropagation(n);
        })));
      }
      return bind(runEachAndClear, push(o, appendChildren(t, f)));
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
    const i = `[${Z}]`;
    const a = `[${ct}]`;
    const u = [ "tabindex" ];
    const f = [ "wrap", "cols", "rows" ];
    const _ = [ "id", "class", "style", "open" ];
    const d = {
      ct: false,
      rt: getDirectionIsRTL(t.lt)
    };
    const {lt: v, it: h, ut: p, ft: g, _t: b, dt: w, vt: y} = t;
    const {U: m, B: $} = getEnvironment();
    const [O] = createCache({
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
    const x = g ? f : concat(_, f);
    const C = debounce(n, {
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
        ht: e
      };
      assignDeep(d, {
        ct: s
      });
      !o && n(c);
      return c;
    };
    const onSizeChanged = ({et: t, st: o, ot: s}) => {
      const e = t && !s && !o;
      const c = !e && l ? C : n;
      const [r, i] = o || [];
      o && assignDeep(d, {
        rt: r
      });
      c({
        et: t || s,
        ot: s,
        gt: i
      });
    };
    const onContentMutation = (t, o) => {
      const [, s] = O();
      const e = {
        bt: s
      };
      const c = t ? n : C;
      s && !o && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        wt: n
      };
      if (n && !o) {
        C(s);
      } else if (!b) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const [H, z] = p || !m ? createTrinsicObserver(v, onTrinsicChanged) : [];
    const I = !b && createSizeObserver(v, onSizeChanged, {
      ot: true,
      nt: true
    });
    const [A, E] = createDOMObserver(v, false, onHostMutation, {
      Y: _,
      X: concat(_, u)
    });
    const T = b && S && new S((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        et: true,
        ot: domRectAppeared(n, r)
      });
      r = n;
    }));
    return [ () => {
      updateViewportAttrsFromHost();
      T && T.observe(v);
      const t = I && I();
      const n = H && H();
      const o = A();
      const s = $((t => {
        const [, n] = O();
        C({
          yt: t,
          bt: n
        });
      }));
      return () => {
        T && T.disconnect();
        t && t();
        n && n();
        c && c();
        o();
        s();
      };
    }, ({St: t, $t: n, Ot: r}) => {
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
          X: concat(x, f || []),
          J: d,
          K: i,
          tt: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !b ? liesBetween(o, i, a) : false;
            return e || !!closest(o, `.${mt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        c = t();
        e = n;
      }
      if (w) {
        C.m();
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
        const t = E();
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
      const {xt: n, Ct: e} = s;
      const c = e[t];
      const r = n[t];
      return capNumber(0, 1, c / (c + r));
    }
    const e = o ? M : R;
    const c = getBoundingClientRect(t)[e];
    const r = getBoundingClientRect(n)[e];
    return capNumber(0, 1, c / r);
  };
  const getScrollbarHandleOffsetRatio = (t, n, o, s) => {
    const e = getScrollbarHandleLengthRatio(t, n, s);
    return 1 / e * (1 - e) * o;
  };
  const createScrollbarsSetupElements = (t, n, o) => {
    const {j: s, A: e} = getEnvironment();
    const {scrollbars: c} = s();
    const {slot: r} = c;
    const {Ht: l, lt: a, it: u, zt: f, It: _, At: d, _t: h} = n;
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
        s(t.Et, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        style(o, s);
      }));
    };
    const validFiniteNumber = t => {
      const n = t || 0;
      return isFinite(n) ? n : 0;
    };
    const ratioToCssPercent = t => `${(validFiniteNumber(t) * 100).toFixed(3)}%`;
    const numberToCssPx = t => `${validFiniteNumber(t)}px`;
    const scrollbarStructureRefreshHandleLength = (t, n, o) => {
      scrollbarStyle(t, (t => {
        const {Tt: s, kt: e} = t;
        return [ s, {
          [o ? M : R]: ratioToCssPercent(getScrollbarHandleLengthRatio(s, e, o, n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
      scrollbarStyle(t, (t => {
        const {Tt: s, kt: e, Et: c} = t;
        const {V: r} = getEnvironment();
        const l = o ? "x" : "y";
        const i = o ? "Left" : "Top";
        const {xt: a} = n;
        const u = getDirectionIsRTL(c);
        const f = getScrollbarHandleOffsetRatio(s, e, getScrollbarHandleOffsetPercent(_[`scroll${i}`], a[l], o && u && r), o);
        return [ s, {
          transform: getTrasformTranslateValue(ratioToCssPercent(f), o)
        } ];
      }));
    };
    const styleScrollbarPosition = t => {
      const {Et: n} = t;
      const o = doRefreshScrollbarOffset(n) && n;
      const {x: s, y: e} = getElmentScroll(_);
      return [ o, {
        transform: o ? getTrasformTranslateValue({
          x: numberToCssPx(s),
          y: numberToCssPx(e)
        }) : ""
      } ];
    };
    const animateElement = (t, n, o, s) => n && t.animate(o, {
      timeline: n,
      composite: s
    });
    const animateScrollbarOffset = (t, n, o, s) => animateElement(t, n, {
      transform: [ getTrasformTranslateValue(numberToCssPx(0), s), getTrasformTranslateValue(numberToCssPx(i(0, o - .5)), s) ]
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
      if (!w && !y) {
        scrollbarStructureRefreshHandleOffset(O, t, true);
        scrollbarStructureRefreshHandleOffset(x, t);
      }
    };
    const refreshScrollbarsHandleOffsetTimeline = () => {
      const forEachFn = (t, {Et: n, kt: o, Tt: s}) => {
        const e = t && getDirectionIsRTL(n);
        const c = bind(getScrollbarHandleOffsetRatio, s, o);
        const r = c(e ? 1 : 0, t);
        const l = c(e ? 0 : 1, t);
        cancelElementAnimations(s);
        b.set(s, [ animateElement(s, t ? w : y, assignDeep({
          transform: [ getTrasformTranslateValue(ratioToCssPercent(r), t), getTrasformTranslateValue(ratioToCssPercent(l), t) ]
        }, e ? {
          clear: [ "left" ]
        } : {})) ]);
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
    const refreshScrollbarsScrollbarOffsetTimeline = ({xt: t}) => {
      concat(x, O).forEach((({Et: n}) => {
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
        Et: r,
        kt: l,
        Tt: i
      };
      if (!e) {
        addClass(r, wt);
      }
      push(s, a);
      push(S, [ appendChildren(r, l), appendChildren(l, i), bind(removeElements, r), cancelElementAnimations, o(a, scrollbarsAddRemoveClass, t) ]);
      return a;
    };
    const C = bind(generateScrollbarDOM, true);
    const H = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(m, O[0].Et);
      appendChildren(m, x[0].Et);
      v((() => {
        scrollbarsAddRemoveClass(It);
      }), 300);
      return bind(runEachAndClear, S);
    };
    C();
    H();
    return [ {
      Dt: refreshScrollbarsHandleLength,
      Mt: refreshScrollbarsHandleOffset,
      Rt: refreshScrollbarsHandleOffsetTimeline,
      Lt: refreshScrollbarsScrollbarOffsetTimeline,
      Pt: refreshScrollbarsScrollbarOffset,
      Vt: scrollbarsAddRemoveClass,
      Ut: {
        P: w,
        Bt: O,
        jt: C,
        Gt: bind(scrollbarStyle, O)
      },
      Nt: {
        P: y,
        Bt: x,
        jt: H,
        Gt: bind(scrollbarStyle, x)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o) => {
    const {lt: s, It: e, qt: c} = n;
    const createInteractiveScrollEvents = (n, r) => {
      const {Tt: l, kt: i} = n;
      const a = `scroll${r ? "Left" : "Top"}`;
      const f = `client${r ? "X" : "Y"}`;
      const _ = r ? M : R;
      const d = r ? "left" : "top";
      const v = r ? "w" : "h";
      const h = r ? "x" : "y";
      const p = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {xt: c} = o;
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
        attrClass(s, Z, st, true);
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
            runEachAndClear(H);
            r.releasePointerCapture(t.pointerId);
          };
          const H = [ bind(attrClass, s, Z, st), addEventListener(c, p, releasePointerCapture), addEventListener(c, "selectstart", (t => preventDefault(t)), {
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
            t && push(H, t(w, getHandleOffset, C, $, x));
          }
          r.setPointerCapture(n.pointerId);
        }
      }));
    };
    return (t, n, o) => {
      const {Et: r} = t;
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
        n(Dt, true);
        l((() => {
          u = true;
          n(Dt);
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
    const {lt: H, Ft: z, At: I} = e;
    const {Vt: A, Dt: E, Mt: T, Rt: k, Lt: D, Pt: M} = x;
    const manageAutoHideSuspension = t => {
      A(Tt, t, true);
      A(Tt, t, false);
    };
    const manageScrollbarsAutoHide = (t, n) => {
      O();
      if (t) {
        A(kt);
      } else {
        const t = bind(A, kt, true);
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
    const R = [ b, O, y, S, p, v, () => f(), addEventListener(H, "pointerover", onHostMouseEnter, {
      O: true
    }), addEventListener(H, "pointerenter", onHostMouseEnter), addEventListener(H, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        a = false;
        l && manageScrollbarsAutoHide(false);
      }
    })), addEventListener(H, "pointermove", (t => {
      isHoverablePointerType(t) && r && d((() => {
        b();
        manageScrollbarsAutoHide(true);
        w((() => {
          r && manageScrollbarsAutoHide(false);
        }));
      }));
    })), addEventListener(z, "scroll", (t => {
      h((() => {
        T(s);
        i && manageScrollbarsAutoHide(true);
        g((() => {
          i && !a && manageScrollbarsAutoHide(false);
        }));
      }));
      c(t);
      M();
    })) ];
    return [ () => bind(runEachAndClear, push(R, C())), ({St: t, Ot: n, Wt: e, Xt: c}) => {
      const {Yt: a, Jt: d, Kt: v} = c || {};
      const {gt: h, ot: p} = e || {};
      const {rt: g} = o;
      const {I: b} = getEnvironment();
      const {xt: w, Zt: y, Qt: S} = s;
      const [$, O] = t("showNativeOverlaidScrollbars");
      const [x, C] = t("scrollbars.theme");
      const [H, R] = t("scrollbars.visibility");
      const [L, P] = t("scrollbars.autoHide");
      const [V, U] = t("scrollbars.autoHideSuspend");
      const [B] = t("scrollbars.autoHideDelay");
      const [j, G] = t("scrollbars.dragScroll");
      const [N, q] = t("scrollbars.clickScroll");
      const F = p && !n;
      const W = S.x || S.y;
      const X = a || d || h || n;
      const Y = v || R;
      const J = $ && b.x && b.y;
      const setScrollbarVisibility = (t, n) => {
        const o = H === "visible" || H === "auto" && t === "scroll";
        A(Ht, o, n);
        return o;
      };
      _ = B;
      if (F) {
        if (V && W) {
          manageAutoHideSuspension(false);
          f();
          m((() => {
            f = addEventListener(z, "scroll", bind(manageAutoHideSuspension, true), {
              O: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if (O) {
        A(yt, J);
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
        A(Rt, j);
      }
      if (q) {
        A(Mt, N);
      }
      if (Y) {
        const t = setScrollbarVisibility(y.x, true);
        const n = setScrollbarVisibility(y.y, false);
        const o = t && n;
        A(zt, !o);
      }
      if (X) {
        E(s);
        T(s);
        k(s);
        M();
        D(s);
        A(Et, !w.x, true);
        A(Et, !w.y, false);
        A(St, g && !I);
      }
    }, {}, x ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {j: o, H: s} = n;
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
    const H = bind(createDiv, "");
    const z = bind(O, H, a);
    const I = bind(x, H, u);
    const A = z(p);
    const E = A === b;
    const T = E && S;
    const k = !E && I(g);
    const D = !E && isHTMLElement(A) && A === k;
    const M = D && !!C(u);
    const R = M ? z() : A;
    const L = M ? k : I();
    const P = D ? R : A;
    const V = T ? m : P;
    const U = w ? O(H, l, v) : b;
    const B = T ? V : U;
    const j = D ? L : k;
    const G = y.activeElement;
    const N = !E && $.top === $ && G === b;
    const q = {
      Ht: b,
      lt: B,
      it: V,
      tn: !E && x(H, i, h),
      ut: j,
      nn: !E && !s && c && c(n),
      It: T ? m : V,
      Ft: T ? y : V,
      sn: $,
      qt: y,
      ft: w,
      At: S,
      zt: f,
      _t: E,
      en: D,
      dt: (t, n) => hasAttrClass(V, E ? Z : ct, E ? n : t),
      vt: (t, n, o) => attrClass(V, E ? Z : ct, E ? n : t, o)
    };
    const F = keys(q).reduce(((t, n) => {
      const o = q[n];
      return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? inArray(F, t) : null;
    const {Ht: W, lt: X, tn: Y, it: nt, ut: ot, nn: st} = q;
    const et = [ () => {
      removeAttr(X, Z);
      removeAttr(X, K);
      removeAttr(W, K);
      if (S) {
        removeAttr(m, Z);
        removeAttr(m, K);
      }
    } ];
    const rt = w && elementIsGenerated(X);
    let it = w ? W : contents([ ot, nt, Y, X, W ].find((t => elementIsGenerated(t) === false)));
    const ut = T ? W : ot || nt;
    const _t = bind(runEachAndClear, et);
    const appendElements = () => {
      attr(X, Z, E ? "viewport" : "host");
      attr(Y, at, "");
      attr(ot, ft, "");
      if (!E) {
        attr(nt, ct, "");
      }
      const t = S && !E ? addClass(parent(b), J) : noop;
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      if (rt) {
        insertAfter(W, X);
        push(et, (() => {
          insertAfter(X, W);
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
  const createTrinsicUpdateSegment = ({ut: t}) => ({Wt: n, cn: o, Ot: s}) => {
    const {U: e} = getEnvironment();
    const {ht: c} = n || {};
    const {ct: r} = o;
    const l = (t || !e) && (c || s);
    if (l) {
      style(t, {
        [R]: r ? "" : "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({lt: t, tn: n, it: o, _t: s}, e) => {
    const [c, r] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({St: t, Wt: l, cn: i, Ot: a}) => {
      let [u, f] = r(a);
      const {H: _, U: d} = getEnvironment();
      const {et: v, bt: h, gt: p} = l || {};
      const {rt: g} = i;
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
          [M]: t ? `calc(100% + ${s}px)` : ""
        };
        const l = {
          [C]: t ? u.t : 0,
          [H]: t ? u.r : 0,
          [I]: t ? u.b : 0,
          [z]: t ? u.l : 0
        };
        style(n || o, r);
        style(o, l);
        assignDeep(e, {
          tn: u,
          rn: !t,
          k: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        ln: m
      };
    };
  };
  const createOverflowUpdateSegment = ({lt: t, tn: n, it: o, nn: s, _t: e, vt: c, At: r, sn: a}, u) => {
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
        [R]: ""
      });
      if (s) {
        const {rn: s, tn: e} = u;
        const {an: c, D: r} = n;
        const l = fractionalSize(t);
        const i = U(t);
        const a = style(o, "boxSizing") === "content-box";
        const f = s || a ? e.b + e.t : 0;
        const _ = !(w.x && a);
        style(o, {
          [R]: i.h + l.h + (c.x && _ ? r.x : 0) - f
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
      const [e, c, r, l] = getStatePerAxis(k, w.x, p.x);
      const [i, a, u, f] = getStatePerAxis(D, w.y, p.y);
      return {
        Zt: {
          x: e,
          y: i
        },
        an: {
          x: c,
          y: a
        },
        D: {
          x: r,
          y: u
        },
        M: {
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
      s[k] = c && r ? c : e;
      s[D] = l && e ? l : r;
      return getViewportOverflowState(t, s);
    };
    const hideNativeScrollbars = (t, n, o, s) => {
      const {D: e, M: c} = t;
      const {x: r, y: l} = c;
      const {x: i, y: a} = e;
      const {k: f} = u;
      const _ = n ? A : E;
      const d = n ? z : H;
      const v = f[_];
      const h = f[T];
      const p = f[d];
      const g = f[I];
      s[M] = `calc(100% + ${a + v * -1}px)`;
      s[_] = -a + v;
      s[T] = -i + h;
      if (o) {
        s[d] = p + (l ? a : 0);
        s[I] = g + (r ? i : 0);
      }
    };
    const [q, F] = y ? y.T(m, g, o, s, u, getViewportOverflowState, hideNativeScrollbars) : [ () => m, () => [ noop ] ];
    return ({St: s, Wt: r, cn: l, Ot: _}, {ln: d}) => {
      const {et: v, wt: h, bt: p, ht: y, gt: m, yt: H} = r || {};
      const {ct: z, rt: I} = l;
      const [R, L] = s("showNativeOverlaidScrollbars");
      const [W, X] = s("overflow");
      const Y = R && w.x && w.y;
      const J = !e && !g && (v || p || h || L || y);
      const K = v || d || p || m || H || L;
      const st = overflowIsVisible(W.x);
      const et = overflowIsVisible(W.y);
      const rt = st || et;
      let ft = O(_);
      let _t = C(_);
      let dt = V(_);
      let vt = G(_);
      let ht;
      if (L && b) {
        c(lt, ot, !Y);
      }
      if (J) {
        ht = getViewportOverflowState(Y);
        fixFlexboxGlue(ht, z);
      }
      if (K) {
        if (rt) {
          c(it, nt, false);
        }
        const [t, n] = F(Y, I, ht);
        const [s, e] = ft = $(_);
        const [r, l] = _t = x(_);
        const u = U(o);
        let d = r;
        let v = u;
        t();
        if ((l || e || L) && n && !Y && q(n, r, s, I)) {
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
        vt = j(g);
        dt = P(getOverflowAmount(p, g), _);
      }
      const [pt, gt] = vt;
      const [bt, wt] = dt;
      const [yt, mt] = _t;
      const [St, $t] = ft;
      const Ot = {
        x: bt.w > 0,
        y: bt.h > 0
      };
      const xt = st && et && (Ot.x || Ot.y) || st && Ot.x && !Ot.y || et && Ot.y && !Ot.x;
      const Ct = d || m || H || $t || mt || gt || wt || X || L || J || K;
      if (Ct) {
        const n = {
          [E]: 0,
          [T]: 0,
          [A]: 0,
          [M]: "",
          [k]: "",
          [D]: ""
        };
        const s = setViewportOverflowState(Y, Ot, W, n);
        const c = q(s, yt, St, I);
        if (!e) {
          hideNativeScrollbars(s, I, c, n);
        }
        if (J) {
          fixFlexboxGlue(s, z);
        }
        if (e) {
          attr(t, Q, n[k]);
          attr(t, tt, n[D]);
        } else {
          style(o, n);
        }
      }
      attrClass(t, Z, nt, xt);
      attrClass(n, at, ut, xt);
      if (!e) {
        attrClass(o, ct, it, rt);
      }
      const [Ht, zt] = N(getViewportOverflowState(Y).Zt);
      assignDeep(u, {
        Zt: Ht,
        Ct: {
          x: pt.w,
          y: pt.h
        },
        xt: {
          x: bt.w,
          y: bt.h
        },
        Qt: Ot
      });
      return {
        Kt: zt,
        Yt: gt,
        Jt: wt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      tn: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      rn: false,
      k: {
        [E]: 0,
        [T]: 0,
        [A]: 0,
        [C]: 0,
        [H]: 0,
        [I]: 0,
        [z]: 0
      },
      Ct: {
        x: 0,
        y: 0
      },
      xt: {
        x: 0,
        y: 0
      },
      Zt: {
        x: L,
        y: L
      },
      Qt: {
        x: false,
        y: false
      }
    };
    const {Ht: c, it: r, vt: l, _t: i} = n;
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
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {un: e, Ot: r, $t: l, fn: i} = t;
      const a = e || {};
      const _ = !!r;
      const v = {
        St: createOptionCheck(n, a, _),
        un: a,
        Ot: _
      };
      if (i) {
        d(v);
        return false;
      }
      const h = s || u(assignDeep({}, v, {
        $t: l
      }));
      const p = c(assignDeep({}, v, {
        cn: f,
        Wt: h
      }));
      d(assignDeep({}, v, {
        Wt: h,
        Xt: p
      }));
      const g = updateHintsAreTruthy(h);
      const b = updateHintsAreTruthy(p);
      const w = g || b || !isEmptyObject(a) || _;
      w && o(t, {
        Wt: h,
        Xt: p
      });
      return w;
    };
    return [ () => {
      const {Ht: t, it: n, qt: o, At: s} = l;
      const c = s ? o.documentElement : t;
      const r = getElmentScroll(c);
      const i = [ a(), e(), _() ];
      scrollElementTo(n, r);
      return bind(runEachAndClear, i);
    }, update, () => ({
      _n: f,
      dn: r
    }), {
      vn: l,
      hn: v
    }, i ];
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
        const o = getStaticPluginModuleInstance(Vt);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, f, _] = createEventListenerHub();
      const [d, v, h] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        h(t, n);
        _(t, n);
      };
      const [p, g, b, w, y] = createSetups(t, a, (({un: t, Ot: n}, {Wt: o, Xt: s}) => {
        const {et: e, gt: c, ht: r, bt: l, wt: i, ot: a} = o;
        const {Yt: u, Jt: f, Kt: _} = s;
        triggerEvent("updated", [ m, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!f,
            overflowStyleChanged: !!_,
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
        f();
        v();
      };
      const m = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              g({
                un: e
              });
            }
          }
          return assignDeep({}, a);
        },
        on: d,
        off: (t, n) => {
          t && n && v(t, n);
        },
        state() {
          const {_n: t, dn: n} = b();
          const {rt: o} = t;
          const {Ct: s, xt: e, Zt: c, Qt: l, tn: i, rn: a} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {Ht: t, lt: n, tn: o, it: s, ut: e, It: c, Ft: r} = w.vn;
          const {Ut: l, Nt: i} = w.hn;
          const translateScrollbarStructure = t => {
            const {Tt: n, kt: o, Et: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Bt: n, jt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  fn: true
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
          Ot: t,
          $t: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, m);
      registerPluginModuleInstances(Lt, OverlayScrollbars, [ m, u, i ]);
      if (cancelInitialization(w.vn.At, !e && t.cancel)) {
        destroy(true);
        return m;
      }
      push(l, p());
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
    const {L: t, I: n, H: o, V: s, U: e, A: c, P: r, F: l, W: i, j: a, G: u, N: f, q: _} = getEnvironment();
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
  t.ClickScrollPlugin = Ft;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Nt;
  t.SizeObserverPlugin = Bt;
  Object.defineProperties(t, {
    pn: {
      value: true
    },
    [Symbol.toStringTag]: {
      value: "Module"
    }
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
