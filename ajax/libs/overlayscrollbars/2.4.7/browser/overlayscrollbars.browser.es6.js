/*!
 * OverlayScrollbars
 * Version: 2.4.7
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
  const createOrKeepArray = t => isArray(t) ? t : [ t ];
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
  const r = n ? window : {};
  const l = Math.max;
  const i = Math.min;
  const a = Math.round;
  const u = Math.abs;
  const f = r.cancelAnimationFrame;
  const _ = r.requestAnimationFrame;
  const d = r.setTimeout;
  const v = r.clearTimeout;
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, s, e) => {
    let c = 0;
    const r = animationCurrentTime();
    const i = l(0, o);
    const frame = o => {
      const a = animationCurrentTime();
      const u = a - r;
      const f = u >= i;
      const d = o ? 1 : 1 - (l(0, r + i - a) / i || 0);
      const v = (n - t) * (isFunction(e) ? e(d, d * i, 0, 1, i) : d) + t;
      const h = f || d === 1;
      s && s(v, d, h);
      c = h ? 0 : _((() => frame()));
    };
    frame();
    return t => {
      f(c);
      t && frame(t);
    };
  };
  const h = "paddingTop";
  const p = "paddingRight";
  const g = "paddingLeft";
  const b = "paddingBottom";
  const w = "marginLeft";
  const S = "marginRight";
  const y = "marginBottom";
  const m = "overflowX";
  const O = "overflowY";
  const $ = "width";
  const x = "height";
  const C = "hidden";
  const H = "visible";
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
  const equalBCRWH = (t, n, o) => equal(t, n, [ $, x ], o && (t => a(t)));
  const noop = () => {};
  const bind = (t, ...n) => t.bind(0, ...n);
  const selfClearTimeout = t => {
    let n;
    const o = t ? d : _;
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
    const {v: r, p: l, S: i} = n || {};
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
        const u = n > 0 ? d : _;
        const h = n > 0 ? v : f;
        const p = mergeParms(t);
        const g = p || t;
        const b = a.bind(0, g);
        c();
        const w = u(b, n);
        c = () => h(w);
        if (i && !o) {
          o = d(flush, r);
        }
        s = e = g;
      } else {
        a(t);
      }
    };
    u.m = flush;
    return u;
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
  const domTokenListAttr = (t, n) => {
    const o = bind(attr, t, n);
    const getDomTokenListSet = t => new Set((t || "").split(" ").filter((t => !!t)));
    const domTokenListOperation = (t, n, o) => {
      const s = new Set(t);
      getDomTokenListSet(n).forEach((t => {
        s[o](t);
      }));
      return from(s).join(" ");
    };
    const s = getDomTokenListSet(o());
    return {
      O: t => o(domTokenListOperation(s, t, "delete")),
      $: t => o(domTokenListOperation(s, t, "add")),
      C: t => {
        const n = getDomTokenListSet(t);
        return from(n).reduce(((t, n) => t && s.has(n)), n.size > 0);
      }
    };
  };
  const removeAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).O(o);
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).$(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => {
    (s ? addAttrClass : removeAttrClass)(t, n, o);
  };
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).C(o);
  const z = n && Element.prototype;
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
      const o = z.matches || z.msMatchesSelector;
      return o.call(t, n);
    }
    return false;
  };
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => {
    if (isElement(t)) {
      const o = z.closest;
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
  const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);
  const getDummyStyle = () => createDiv().style;
  const I = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  const A = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  const E = {};
  const T = {};
  const cssProperty = t => {
    let n = T[t];
    if (hasOwnProperty(T, t)) {
      return n;
    }
    const o = firstLetterToUpper(t);
    const s = getDummyStyle();
    each(I, (e => {
      const c = e.replace(/-/g, "");
      const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
      return !(n = r.find((t => s[t] !== void 0)));
    }));
    return T[t] = n || "";
  };
  const jsAPI = t => {
    let n = E[t] || r[t];
    if (hasOwnProperty(E, t)) {
      return n;
    }
    each(A, (o => {
      n = n || r[o + firstLetterToUpper(t)];
      return !n;
    }));
    E[t] = n;
    return n;
  };
  const D = jsAPI("MutationObserver");
  const k = jsAPI("IntersectionObserver");
  const M = jsAPI("ResizeObserver");
  const R = jsAPI("ScrollTimeline");
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).O(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).$(n);
    return bind(removeClass, t, n);
  };
  const V = /^--/;
  const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
  const validFiniteNumber = t => {
    const n = t || 0;
    return isFinite(n) ? n : 0;
  };
  const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));
  const ratioToCssPercent = t => `${(validFiniteNumber(t) * 100).toFixed(3)}%`;
  const numberToCssPx = t => `${validFiniteNumber(t)}px`;
  function setStyles(t, n) {
    t && each(n, ((n, o) => {
      try {
        const s = t.style;
        const e = isNumber(n) ? numberToCssPx(n) : (n || "") + "";
        if (V.test(o)) {
          s.setProperty(o, e);
        } else {
          s[o] = e;
        }
      } catch (s) {}
    }));
  }
  function getStyles(t, n, o) {
    const s = isString(n);
    let e = s ? "" : {};
    if (t) {
      const c = r.getComputedStyle(t, o) || t.style;
      e = s ? getCSSVal(c, n) : n.reduce(((t, n) => {
        t[n] = getCSSVal(c, n);
        return t;
      }), e);
    }
    return e;
  }
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
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
  const P = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : P;
  const windowSize = t => getElmWidthHeightProperty("inner", t || r);
  const L = bind(getElmWidthHeightProperty, "offset");
  const U = bind(getElmWidthHeightProperty, "client");
  const B = bind(getElmWidthHeightProperty, "scroll");
  const fractionalSize = t => {
    const n = parseFloat(getStyles(t, $)) || 0;
    const o = parseFloat(getStyles(t, x)) || 0;
    return {
      w: n - a(n),
      h: o - a(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t[x] || t[$]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  let N;
  const j = "passive";
  const supportPassiveEvents = () => {
    if (isUndefined(N)) {
      N = false;
      try {
        r.addEventListener(j, noop, Object.defineProperty({}, j, {
          get() {
            N = true;
          }
        }));
      } catch (t) {}
    }
    return N;
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
    const r = (e = c && s && s.H) != null ? e : c;
    const l = s && s.I || false;
    const i = s && s.A || false;
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
  const G = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t && getBoundingClientRect(t);
    return n ? {
      x: n.left + r.pageYOffset,
      y: n.top + r.pageXOffset
    } : G;
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
  const X = `${W}-scrollbar-hidden`;
  const Y = `${W}-flexbox-glue`;
  const K = `${Y}-max`;
  const J = `${F}-initialize`;
  const Z = F;
  const Q = `${Z}-overflow-x`;
  const tt = `${Z}-overflow-y`;
  const nt = "overflowVisible";
  const ot = "scrollbarPressed";
  const st = "updating";
  const et = "body";
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
  const St = "os-theme-none";
  const yt = "os-scrollbar";
  const mt = `${yt}-rtl`;
  const Ot = `${yt}-horizontal`;
  const $t = `${yt}-vertical`;
  const xt = `${yt}-track`;
  const Ct = `${yt}-handle`;
  const Ht = `${yt}-visible`;
  const zt = `${yt}-cornerless`;
  const It = `${yt}-transitionless`;
  const At = `${yt}-interaction`;
  const Et = `${yt}-unusable`;
  const Tt = `${yt}-auto-hide`;
  const Dt = `${Tt}-hidden`;
  const kt = `${yt}-wheel`;
  const Mt = `${xt}-interactive`;
  const Rt = `${Ct}-interactive`;
  const Vt = {};
  const Pt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      Vt[o] = t[o];
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
  const Lt = "__osOptionsValidationPlugin";
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
        let u = L(r);
        let d = u;
        let v = false;
        let h;
        const reset = () => {
          scrollElementTo(i, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          h = 0;
          if (v) {
            u = d;
            n(t === true);
          }
        };
        const onScroll = t => {
          d = L(r);
          v = !t || !equalWH(d, u);
          if (t) {
            stopPropagation(t);
            if (v && !h) {
              f(h);
              h = _(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const p = [ appendChildren(t, c), addEventListener(i, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, ht);
        setStyles(a, {
          [$]: s,
          [x]: s
        });
        _(reset);
        return [ o ? bind(onScroll, false) : reset, p ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {T: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(H) === 0;
  const getViewportOverflowState = (t, n) => {
    const {D: o} = t;
    const getStatePerAxis = t => {
      const s = getStyles(o, t);
      const e = n ? n[t] : s;
      const c = e === "scroll";
      return [ s, c ];
    };
    const [s, e] = getStatePerAxis(m);
    const [c, r] = getStatePerAxis(O);
    return {
      k: {
        x: s,
        y: c
      },
      M: {
        x: e,
        y: r
      }
    };
  };
  const setViewportOverflowState = (t, n, o, s) => {
    const e = n.x || n.y;
    const setAxisOverflowStyle = (t, n) => {
      const o = overflowIsVisible(t);
      const s = o && e ? "hidden" : "";
      const c = n && o && t.replace(`${H}-`, "") || s;
      return [ n && !o ? t : "", overflowIsVisible(c) ? "hidden" : c ];
    };
    const [c, r] = setAxisOverflowStyle(o.x, n.x);
    const [l, i] = setAxisOverflowStyle(o.y, n.y);
    s[m] = r && l ? r : c;
    s[O] = i && c ? i : l;
    return getViewportOverflowState(t, s);
  };
  let Nt = 0;
  const jt = "__osScrollbarsHidingPlugin";
  const Gt = /* @__PURE__ */ (() => ({
    [jt]: {
      static: () => ({
        R: t => {
          const {V: n, T: o, P: s} = t;
          const e = !s && !n && (o.x || o.y);
          const c = e ? document.createElement("style") : false;
          if (c) {
            attr(c, "id", `${ct}-${rt}-${Nt}`);
            Nt++;
          }
          return c;
        },
        L: (t, n, o, s, e) => {
          const {U: c, D: r, B: l} = t;
          const {V: i, T: a, N: u, j: f} = s;
          const _ = !c && !i && (a.x || a.y);
          const [d] = getShowNativeOverlaidScrollbars(e, s);
          const _getViewportOverflowHideOffset = t => {
            const {M: n} = t;
            const o = i || d ? 0 : 42;
            const getHideOffsetPerAxis = (t, n, s) => {
              const e = t ? o : s;
              const c = n && !i ? e : 0;
              const r = t && !!o;
              return [ c, r ];
            };
            const [s, e] = getHideOffsetPerAxis(a.x, n.x, f.x);
            const [c, r] = getHideOffsetPerAxis(a.y, n.y, f.y);
            return {
              G: {
                x: s,
                y: c
              },
              q: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {F: o}, s, e) => {
            assignDeep(e, {
              [S]: 0,
              [y]: 0,
              [w]: 0
            });
            if (!c) {
              const {G: c, q: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {W: f} = n;
              const _ = o ? w : S;
              const d = o ? g : p;
              const v = f[_];
              const h = f[y];
              const m = f[d];
              const O = f[b];
              e[$] = `calc(100% + ${u + v * -1}px)`;
              e[_] = -u + v;
              e[y] = -a + h;
              if (s) {
                e[d] = m + (i ? u : 0);
                e[b] = O + (l ? a : 0);
              }
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (_) {
              const {W: c} = n;
              const {G: i, q: a} = _getViewportOverflowHideOffset(t);
              const {x: u, y: f} = a;
              const {x: _, y: d} = i;
              const {F: v} = o;
              const h = v ? p : g;
              const b = c[h];
              const w = c.paddingTop;
              const S = s.w + e.w;
              const y = s.h + e.h;
              const m = {
                w: d && f ? `${d + S - b}px` : "",
                h: _ && u ? `${_ + y - w}px` : ""
              };
              if (l) {
                const {sheet: t} = l;
                if (t) {
                  const {cssRules: n} = t;
                  if (n) {
                    if (!n.length) {
                      t.insertRule(`#${attr(l, "id")} + [${ct}~='${rt}']::before {}`, 0);
                    }
                    const o = n[0].style;
                    o[$] = m.w;
                    o[x] = m.h;
                  }
                }
              } else {
                setStyles(r, {
                  "--os-vaw": m.w,
                  "--os-vah": m.h
                });
              }
            }
            return _;
          };
          const _undoViewportArrange = s => {
            if (_) {
              const e = s || getViewportOverflowState(t);
              const {W: c} = n;
              const {q: l} = _getViewportOverflowHideOffset(e);
              const {x: i, y: a} = l;
              const f = {};
              const assignProps = t => each(t, (t => {
                f[t] = c[t];
              }));
              if (i) {
                assignProps([ y, h, b ]);
              }
              if (a) {
                assignProps([ w, S, g, p ]);
              }
              const d = getStyles(r, keys(f));
              removeAttrClass(r, ct, rt);
              if (!u) {
                f[x] = "";
              }
              setStyles(r, f);
              return [ () => {
                _hideNativeScrollbars(e, o, _, d);
                setStyles(r, d);
                addAttrClass(r, ct, rt);
              }, e ];
            }
            return [ noop ];
          };
          return {
            X: _getViewportOverflowHideOffset,
            Y: _arrangeViewport,
            K: _undoViewportArrange,
            J: _hideNativeScrollbars
          };
        },
        Z: () => {
          let t = {
            w: 0,
            h: 0
          };
          let n = 0;
          const getWindowDPR = () => {
            const t = r.screen;
            const n = t.deviceXDPI || 0;
            const o = t.logicalXDPI || 1;
            return r.devicePixelRatio || n / o;
          };
          const diffBiggerThanOne = (t, n) => {
            const o = u(t);
            const s = u(n);
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
              w: u(c.w),
              h: u(c.h)
            };
            const l = {
              w: u(a(e.w / (t.w / 100))),
              h: u(a(e.h / (t.h / 100)))
            };
            const i = getWindowDPR();
            const f = r.w > 2 && r.h > 2;
            const _ = !diffBiggerThanOne(l.w, l.h);
            const d = i !== n && i > 0;
            const v = f && _ && d;
            let h;
            let p;
            if (v) {
              [p, h] = s();
              assignDeep(o.j, p);
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
                const t = d((() => {
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
    const c = L(n);
    const r = fractionalSize(o);
    s && removeElements(n);
    return {
      x: c.h - e.h + r.h,
      y: c.w - e.w + r.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, X);
    try {
      n = getStyles(t, cssProperty("scrollbar-width")) === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const getRtlScrollBehavior = (t, n) => {
    setStyles(t, {
      [m]: C,
      [O]: C,
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
    const o = addClass(t, Y);
    const s = getBoundingClientRect(t);
    const e = getBoundingClientRect(n);
    const c = equalBCRWH(e, s, true);
    const r = addClass(t, K);
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
    const [l, i] = createCache({
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
      j: a,
      T: f,
      V: u,
      P: getStyles(o, "zIndex") === "-1",
      tt: !!R,
      nt: getRtlScrollBehavior(o, s),
      N: getFlexboxGlue(o, s),
      ot: bind(e, "r"),
      st: h,
      et: t => assignDeep(_, t) && h(),
      ct: v,
      rt: t => assignDeep(d, t) && v(),
      lt: assignDeep({}, _),
      it: assignDeep({}, d)
    };
    removeAttr(o, "style");
    removeElements(o);
    r.addEventListener("resize", (() => {
      let t;
      if (!u && (!f.x || !f.y)) {
        const n = getStaticPluginModuleInstance(jt);
        const o = n ? n.Z() : noop;
        t = !!o(p, l);
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
    const {T: e, V: c, st: r} = getEnvironment();
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
    const {ut: c, ft: r, _t: l, dt: i, vt: a, ht: u} = s || {};
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
          const S = t === c;
          const y = b && e;
          const m = y ? attr(c, e || "") : null;
          const O = y && u !== m;
          const $ = inArray(h, e) && O;
          if (n && (w || !S)) {
            const n = b && O;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, m) : !b || n;
            const v = _ && !l(o, !!a, t, s);
            each(d, (t => push(f, t)));
            each(g, (t => push(f, t)));
            p = p || v;
          }
          if (!n && S && O && !r(c, e, u, m)) {
            push(_, e);
            v = v || $;
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
    const g = new D(bind(observerCallback, false));
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
    const {gt: e, bt: c} = o || {};
    const r = getStaticPluginModuleInstance(Ut);
    const {nt: l} = getEnvironment();
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
            wt: c ? t : void 0,
            St: !c,
            bt: i
          });
        }
      };
      if (M) {
        const t = new M((t => onSizeChangedCallbackProxy(t.pop())));
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
      if (k) {
        o = new k(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = L(s);
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
    const {V: a} = getEnvironment();
    const u = `[${Z}]`;
    const f = `[${ct}]`;
    const _ = [ "tabindex" ];
    const d = [ "wrap", "cols", "rows" ];
    const v = [ "id", "class", "style", "open" ];
    const h = {
      yt: false,
      F: getDirectionIsRTL(t.Ot)
    };
    const {Ot: p, D: g, $t: b, xt: w, U: S, Ct: y, Ht: m} = t;
    const O = getEnvironment();
    const $ = getStaticPluginModuleInstance(jt);
    const [x] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = $ && $.L(t, n, h, O, o).K;
      const e = y(it);
      const c = !S && y(rt);
      const r = c && getElmentScroll(g);
      m(it);
      S && m(st, true);
      const l = c && s && s()[0];
      const i = B(b);
      const a = B(g);
      const u = fractionalSize(g);
      m(it, e);
      S && m(st);
      l && l();
      scrollElementTo(g, r);
      return {
        w: a.w + i.w + u.w,
        h: a.h + i.h + u.h
      };
    }));
    const C = w ? d : concat(v, d);
    const H = debounce(s, {
      v: () => e,
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
    const updateViewportAttrsFromHost = t => {
      each(t || _, (t => {
        if (inArray(_, t)) {
          const n = attr(p, t);
          if (isString(n)) {
            attr(g, t, n);
          } else {
            removeAttr(g, t);
          }
        }
      }));
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        zt: e
      };
      assignDeep(h, {
        yt: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({St: t, wt: n, bt: o}) => {
      const e = t && !o && !n;
      const c = !e && a ? H : s;
      const [r, l] = n || [];
      n && assignDeep(h, {
        F: r
      });
      c({
        St: t || o,
        bt: o,
        It: l
      });
    };
    const onContentMutation = (t, n) => {
      const [, o] = x();
      const e = {
        At: o
      };
      const c = t ? s : H;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Et: n
      };
      if (n && !o) {
        H(s);
      } else if (!S) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const {N: z, ot: I} = O;
    const [A, E] = b || !z ? createTrinsicObserver(p, onTrinsicChanged) : [];
    const T = !S && createSizeObserver(p, onSizeChanged, {
      bt: true,
      gt: true
    });
    const [D, k] = createDOMObserver(p, false, onHostMutation, {
      ft: v,
      ut: concat(v, _)
    });
    const R = S && M && new M((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        St: true,
        bt: domRectAppeared(n, i)
      });
      i = n;
    }));
    return [ () => {
      updateViewportAttrsFromHost();
      R && R.observe(p);
      const t = T && T();
      const n = A && A();
      const o = D();
      const s = I((t => {
        const [, n] = x();
        H({
          Tt: t,
          At: n
        });
      }));
      return () => {
        R && R.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({Dt: t, kt: n, Mt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, _] = t("update.attributes");
      const [d, v] = t("update.elementEvents");
      const [h, p] = t("update.debounce");
      const w = v || _;
      const y = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (w) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(b || g, true, onContentMutation, {
          ut: concat(C, a || []),
          _t: d,
          dt: u,
          ht: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !S ? liesBetween(o, u, f) : false;
            return e || !!closest(o, `.${yt}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (p) {
        H.m();
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
      if (y) {
        const t = k();
        const n = E && E();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], y));
        n && assignDeep(s, onTrinsicChanged(n[0], y));
        o && assignDeep(s, onContentMutation(o[0], y));
      }
      return s;
    }, h ];
  };
  const capNumber = (t, n, o) => l(t, i(n, o));
  const getScrollbarHandleOffsetPercent = (t, n, o) => {
    const s = a(n);
    const [e, c] = getRTLCompatibleScrollBounds(s, o);
    const r = (c - t) / c;
    const l = t / e;
    const i = t / c;
    const u = o ? o.n ? r : o.i ? l : i : i;
    return capNumber(0, 1, u);
  };
  const getScrollbarHandleLengthRatio = (t, n, o) => {
    if (o) {
      const t = n ? $ : x;
      const {Rt: s, Vt: e} = o;
      const c = getBoundingClientRect(e)[t];
      const r = getBoundingClientRect(s)[t];
      return capNumber(0, 1, c / r);
    }
    const s = n ? "x" : "y";
    const {Pt: e, Lt: c} = t;
    const r = c[s];
    const l = e[s];
    return capNumber(0, 1, r / (r + l));
  };
  const getScrollbarHandleOffsetRatio = (t, n, o, s) => {
    const e = getScrollbarHandleLengthRatio(t, s, n);
    return 1 / e * (1 - e) * o;
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const {st: e, P: c} = getEnvironment();
    const {scrollbars: r} = e();
    const {slot: l} = r;
    const {Ut: i, Ot: a, D: u, Bt: f, Nt: _, jt: v, U: h} = n;
    const {scrollbars: p} = f ? {} : t;
    const {slot: g} = p || {};
    const b = new Map;
    const initScrollTimeline = t => R && new R({
      source: _,
      axis: t
    });
    const w = initScrollTimeline("x");
    const S = initScrollTimeline("y");
    const y = dynamicInitializationElement([ i, a, u ], (() => h && v ? i : a), l, g);
    const doRefreshScrollbarOffset = t => h && !v && parent(t) === u;
    const getScrollbarOffsetKeyframes = (t, n, o) => {
      const s = .5 * (o ? 1 : -1);
      const e = n && o ? -1 : 1;
      return {
        transform: [ getTrasformTranslateValue(numberToCssPx(0 + s), n), getTrasformTranslateValue(numberToCssPx(t * e + s), n) ]
      };
    };
    const addDirectionRTLKeyframes = (t, n) => assignDeep(t, n ? {
      clear: [ "left" ]
    } : {});
    const cancelElementAnimations = t => {
      b.forEach(((n, o) => {
        const s = t ? inArray(createOrKeepArray(t), o) : true;
        if (s) {
          each(n || [], (t => {
            t && t.cancel();
          }));
          b.delete(o);
        }
      }));
    };
    const setElementAnimation = (t, n, o, s) => {
      const e = b.get(t) || [];
      const c = e.find((t => t && t.timeline === n));
      if (c) {
        c.effect = new KeyframeEffect(t, o, {
          composite: s
        });
      } else {
        b.set(t, concat(e, [ t.animate(o, {
          timeline: n,
          composite: s
        }) ]));
      }
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Gt, n);
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
        const {Vt: s} = t;
        return [ s, {
          [n ? $ : x]: ratioToCssPercent(getScrollbarHandleLengthRatio(o, n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n) => {
      if (w && S) {
        each(t, (t => {
          const {Gt: s, Vt: e} = t;
          const c = bind(getScrollbarHandleOffsetRatio, o, t);
          const r = n && getDirectionIsRTL(s);
          const l = c(r ? 1 : 0, n);
          const i = c(r ? 0 : 1, n);
          setElementAnimation(e, n ? w : S, addDirectionRTLKeyframes({
            transform: [ getTrasformTranslateValue(ratioToCssPercent(l), n), getTrasformTranslateValue(ratioToCssPercent(i), n) ]
          }, r));
        }));
      } else {
        scrollbarStyle(t, (t => {
          const {Vt: s, Gt: e} = t;
          const {nt: c} = getEnvironment();
          const r = n ? "x" : "y";
          const {Pt: l} = o;
          const i = getDirectionIsRTL(e);
          const a = getScrollbarHandleOffsetRatio(o, t, getScrollbarHandleOffsetPercent(getElmentScroll(_)[r], l[r], n && i && c), n);
          return [ s, {
            transform: getTrasformTranslateValue(ratioToCssPercent(a), n)
          } ];
        }));
      }
    };
    const styleScrollbarPosition = t => {
      const {Gt: n} = t;
      const o = doRefreshScrollbarOffset(n) && n;
      const {x: s, y: e} = getElmentScroll(_);
      return [ o, {
        transform: o ? getTrasformTranslateValue({
          x: numberToCssPx(s),
          y: numberToCssPx(e)
        }) : ""
      } ];
    };
    const m = [];
    const O = [];
    const C = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(O, t, n);
      c && scrollbarStructureAddRemoveClass(C, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      scrollbarStructureRefreshHandleLength(O, true);
      scrollbarStructureRefreshHandleLength(C);
    };
    const refreshScrollbarsHandleOffset = () => {
      scrollbarStructureRefreshHandleOffset(O, true);
      scrollbarStructureRefreshHandleOffset(C);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (h) {
        if (w && S) {
          const {Pt: t} = o;
          const n = !!O.find((({Gt: t}) => getDirectionIsRTL(t)));
          const setScrollbarElementAnimation = (t, o, s, e, c) => setElementAnimation(t, o, addDirectionRTLKeyframes(getScrollbarOffsetKeyframes(s, e, c), n), "add");
          each(concat(C, O), (({Gt: o}) => {
            if (doRefreshScrollbarOffset(o)) {
              setScrollbarElementAnimation(o, w, t.x, true, n);
              setScrollbarElementAnimation(o, S, t.y);
            } else {
              cancelElementAnimations(o);
            }
          }));
        } else {
          scrollbarStyle(O, styleScrollbarPosition);
          scrollbarStyle(C, styleScrollbarPosition);
        }
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? Ot : $t;
      const o = t ? O : C;
      const e = isEmptyArray(o) ? It : "";
      const r = createDiv(`${yt} ${n} ${e}`);
      const l = createDiv(xt);
      const i = createDiv(Ct);
      const a = {
        Gt: r,
        Rt: l,
        Vt: i
      };
      if (!c) {
        addClass(r, wt);
      }
      push(o, a);
      push(m, [ appendChildren(r, l), appendChildren(l, i), bind(removeElements, r), cancelElementAnimations, s(a, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
      return a;
    };
    const H = bind(generateScrollbarDOM, true);
    const z = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(y, O[0].Gt);
      appendChildren(y, C[0].Gt);
      d((() => {
        scrollbarsAddRemoveClass(It);
      }), 300);
      return bind(runEachAndClear, m);
    };
    H();
    z();
    return [ {
      qt: refreshScrollbarsHandleLength,
      Ft: refreshScrollbarsHandleOffset,
      Wt: refreshScrollbarsScrollbarOffset,
      Xt: scrollbarsAddRemoveClass,
      Yt: {
        tt: w,
        Kt: O,
        Jt: H,
        Zt: bind(scrollbarStyle, O)
      },
      Qt: {
        tt: S,
        Kt: C,
        Jt: z,
        Zt: bind(scrollbarStyle, C)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o) => {
    const {Ot: s, Nt: e, tn: c} = n;
    return (n, r, l, i) => {
      const {Gt: u, Rt: f, Vt: _} = n;
      const [d, v] = selfClearTimeout(333);
      const [h, p] = selfClearTimeout();
      const g = bind(l, [ n ], i);
      const b = !!e.scrollBy;
      const w = `client${i ? "X" : "Y"}`;
      const S = i ? $ : x;
      const y = i ? "left" : "top";
      const m = i ? "w" : "h";
      const O = i ? "x" : "y";
      const isAffectingTransition = t => t.propertyName.indexOf(S) > -1;
      const createInteractiveScrollEvents = () => {
        const n = "pointerup pointerleave pointercancel lostpointercapture";
        const createRelativeHandleMove = (t, n) => s => {
          const {Pt: c} = o;
          const r = L(f)[m] - L(_)[m];
          const l = n * s / r;
          const i = l * c[O];
          scrollElementTo(e, {
            [O]: t + i
          });
        };
        return addEventListener(f, "pointerdown", (o => {
          const r = closest(o.target, `.${Ct}`) === _;
          const l = r ? _ : f;
          const i = t.scrollbars;
          const {button: u, isPrimary: d, pointerType: v} = o;
          const {pointers: h} = i;
          const p = u === 0 && d && i[r ? "dragScroll" : "clickScroll"] && (h || []).includes(v);
          if (p) {
            const t = !r && o.shiftKey;
            const i = bind(getBoundingClientRect, _);
            const u = bind(getBoundingClientRect, f);
            const getHandleOffset = (t, n) => (t || i())[y] - (n || u())[y];
            const d = a(getBoundingClientRect(e)[S]) / L(e)[m] || 1;
            const v = createRelativeHandleMove(getElmentScroll(e)[O] || 0, 1 / d);
            const h = o[w];
            const p = i();
            const g = u();
            const b = p[S];
            const $ = getHandleOffset(p, g) + b / 2;
            const x = h - g[y];
            const C = r ? 0 : x - $;
            const releasePointerCapture = t => {
              runEachAndClear(z);
              l.releasePointerCapture(t.pointerId);
            };
            const H = addAttrClass(s, Z, ot);
            const z = [ H, addEventListener(c, n, releasePointerCapture), addEventListener(c, "selectstart", (t => preventDefault(t)), {
              H: false
            }), addEventListener(f, n, releasePointerCapture), addEventListener(f, "pointermove", (n => {
              const o = n[w] - h;
              if (r || t) {
                v(C + o);
              }
            })) ];
            l.setPointerCapture(o.pointerId);
            if (t) {
              v(C);
            } else if (!r) {
              const t = getStaticPluginModuleInstance(qt);
              t && push(z, t(v, getHandleOffset, C, b, x));
            }
          }
        }));
      };
      let C = true;
      return bind(runEachAndClear, [ addEventListener(u, "pointerenter", (() => {
        r(At, true);
      })), addEventListener(u, "pointerleave pointercancel", (() => {
        r(At, false);
      })), addEventListener(u, "wheel", (t => {
        const {deltaX: n, deltaY: o, deltaMode: c} = t;
        if (b && C && c === 0 && parent(u) === s) {
          e.scrollBy({
            left: n,
            top: o,
            behavior: "smooth"
          });
        }
        C = false;
        r(kt, true);
        d((() => {
          C = true;
          r(kt);
        }));
        preventDefault(t);
      }), {
        H: false,
        I: true
      }), addEventListener(_, "transitionstart", (t => {
        if (isAffectingTransition(t)) {
          const animateHandleOffset = () => {
            g();
            h(animateHandleOffset);
          };
          animateHandleOffset();
        }
      })), addEventListener(_, "transitionend transitioncancel", (t => {
        if (isAffectingTransition(t)) {
          p();
          g();
        }
      })), addEventListener(u, "mousedown", bind(addEventListener, c, "click", stopPropagation, {
        A: true,
        I: true
      }), {
        I: true
      }), createInteractiveScrollEvents(), v, p ]);
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
    const [w, S] = selfClearTimeout(100);
    const [y, m] = selfClearTimeout(100);
    const [O, $] = selfClearTimeout((() => _));
    const [x, C] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s));
    const {Ot: H, nn: z, jt: I} = e;
    const {Xt: A, qt: E, Ft: T, Wt: D} = x;
    const manageAutoHideSuspension = t => {
      A(Tt, t, true);
      A(Tt, t, false);
    };
    const manageScrollbarsAutoHide = (t, n) => {
      $();
      if (t) {
        A(Dt);
      } else {
        const t = bind(A, Dt, true);
        if (_ > 0 && !n) {
          O(t);
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
    const k = [ b, $, S, m, p, v, () => f(), addEventListener(H, "pointerover", onHostMouseEnter, {
      A: true
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
        T();
        i && manageScrollbarsAutoHide(true);
        g((() => {
          i && !a && manageScrollbarsAutoHide(false);
        }));
      }));
      c(t);
      D();
    })) ];
    return [ () => bind(runEachAndClear, push(k, C())), ({Dt: t, Mt: n, sn: e, en: c}) => {
      const {cn: a, rn: d, ln: v} = c || {};
      const {It: h, bt: p} = e || {};
      const {F: g} = o;
      const {T: b} = getEnvironment();
      const {Pt: w, k: S, an: m} = s;
      const [O, $] = t("showNativeOverlaidScrollbars");
      const [x, C] = t("scrollbars.theme");
      const [H, k] = t("scrollbars.visibility");
      const [M, R] = t("scrollbars.autoHide");
      const [V, P] = t("scrollbars.autoHideSuspend");
      const [L] = t("scrollbars.autoHideDelay");
      const [U, B] = t("scrollbars.dragScroll");
      const [N, j] = t("scrollbars.clickScroll");
      const G = p && !n;
      const q = m.x || m.y;
      const F = a || d || h || n;
      const W = v || k;
      const X = O && b.x && b.y;
      const setScrollbarVisibility = (t, n) => {
        const o = H === "visible" || H === "auto" && t === "scroll";
        A(Ht, o, n);
        return o;
      };
      _ = L;
      if (G) {
        if (V && q) {
          manageAutoHideSuspension(false);
          f();
          y((() => {
            f = addEventListener(z, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if ($) {
        A(St, X);
      }
      if (C) {
        A(u);
        A(x, true);
        u = x;
      }
      if (P && !V) {
        manageAutoHideSuspension(true);
      }
      if (R) {
        r = M === "move";
        l = M === "leave";
        i = M !== "never";
        manageScrollbarsAutoHide(!i, true);
      }
      if (B) {
        A(Rt, U);
      }
      if (j) {
        A(Mt, N);
      }
      if (W) {
        const t = setScrollbarVisibility(S.x, true);
        const n = setScrollbarVisibility(S.y, false);
        const o = t && n;
        A(zt, !o);
      }
      if (F) {
        E();
        T();
        D();
        A(Et, !w.x, true);
        A(Et, !w.y, false);
        A(mt, g && !I);
      }
    }, {}, x ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {st: o, V: s} = n;
    const e = getStaticPluginModuleInstance(jt);
    const c = e && e.R;
    const {elements: r} = o();
    const {host: l, padding: i, viewport: a, content: u} = r;
    const f = isHTMLElement(t);
    const _ = f ? {} : t;
    const {elements: d} = _;
    const {host: v, padding: h, viewport: p, content: g} = d || {};
    const b = f ? t : _.target;
    const w = is(b, "textarea");
    const S = b.ownerDocument;
    const y = S.documentElement;
    const m = b === S.body;
    const O = S.defaultView;
    const $ = bind(staticInitializationElement, [ b ]);
    const x = bind(dynamicInitializationElement, [ b ]);
    const C = bind(resolveInitialization, [ b ]);
    const H = bind(createDiv, "");
    const z = bind($, H, a);
    const I = bind(x, H, u);
    const A = z(p);
    const E = A === b;
    const T = E && m;
    const D = !E && I(g);
    const k = !E && isHTMLElement(A) && A === D;
    const M = k && !!C(u);
    const R = M ? z() : A;
    const V = M ? D : I();
    const P = k ? R : A;
    const L = T ? y : P;
    const U = w ? $(H, l, v) : b;
    const B = T ? L : U;
    const N = k ? V : D;
    const j = S.activeElement;
    const G = !E && O.top === O && j === b;
    const q = {
      Ut: b,
      Ot: B,
      D: L,
      un: !E && x(H, i, h),
      $t: N,
      B: !E && !s && c && c(n),
      Nt: T ? y : L,
      nn: T ? S : L,
      fn: m ? y : b,
      _n: O,
      tn: S,
      xt: w,
      jt: m,
      Bt: f,
      U: E,
      dn: k,
      Ct: t => hasAttrClass(L, E ? Z : ct, t),
      Ht: (t, n) => addRemoveAttrClass(L, E ? Z : ct, t, n)
    };
    const F = keys(q).reduce(((t, n) => {
      const o = q[n];
      return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? inArray(F, t) : null;
    const {Ut: W, Ot: X, un: Y, D: K, $t: nt, B: ot} = q;
    const st = [ () => {
      removeAttr(X, Z);
      removeAttr(X, J);
      removeAttr(W, J);
      if (m) {
        removeAttr(y, Z);
        removeAttr(y, J);
      }
    } ];
    const rt = w && elementIsGenerated(X);
    let it = w ? W : contents([ nt, K, Y, X, W ].find((t => elementIsGenerated(t) === false)));
    const ut = T ? W : nt || K;
    const _t = bind(runEachAndClear, st);
    const appendElements = () => {
      attr(X, Z, E ? "viewport" : "host");
      attr(Y, at, "");
      attr(nt, ft, "");
      if (!E) {
        attr(K, ct, "");
        m && addAttrClass(y, Z, et);
      }
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      if (rt) {
        insertAfter(W, X);
        push(st, (() => {
          insertAfter(X, W);
          removeElements(X);
        }));
      }
      appendChildren(ut, it);
      appendChildren(X, Y);
      appendChildren(Y || X, !E && K);
      appendChildren(K, nt);
      push(st, (() => {
        removeAttr(Y, at);
        removeAttr(nt, ft);
        removeAttr(K, Q);
        removeAttr(K, tt);
        removeAttr(K, ct);
        elementIsGenerated(nt) && unwrap(nt);
        elementIsGenerated(K) && unwrap(K);
        elementIsGenerated(Y) && unwrap(Y);
      }));
      if (s && !E) {
        addAttrClass(K, ct, lt);
        push(st, bind(removeAttr, K, ct));
      }
      if (ot) {
        insertBefore(K, ot);
        push(st, bind(removeElements, ot));
      }
      if (G) {
        const t = "tabindex";
        const n = attr(K, t);
        attr(K, t, "-1");
        K.focus();
        const revertViewportTabIndex = () => n ? attr(K, t, n) : removeAttr(K, t);
        const o = addEventListener(S, "pointerdown keydown", (() => {
          revertViewportTabIndex();
          o();
        }));
        push(st, [ revertViewportTabIndex, o ]);
      } else if (j && j.focus) {
        j.focus();
      }
      it = 0;
      return _t;
    };
    return [ q, appendElements, _t ];
  };
  const createTrinsicUpdateSegment = ({$t: t}) => ({sn: n, vn: o, Mt: s}) => {
    const {N: e} = getEnvironment();
    const {zt: c} = n || {};
    const {yt: r} = o;
    const l = (t || !e) && (c || s);
    if (l) {
      setStyles(t, {
        [x]: r && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({Ot: t, un: n, D: o, U: s}, e) => {
    const [c, r] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({Dt: t, sn: l, vn: i, Mt: a}) => {
      let [u, f] = r(a);
      const {V: _, N: d} = getEnvironment();
      const {St: v, At: m, It: O} = l || {};
      const {F: x} = i;
      const [C, H] = t("paddingAbsolute");
      const z = a || !d && m;
      if (v || f || z) {
        [u, f] = c(a);
      }
      const I = !s && (H || O || f);
      if (I) {
        const t = !C || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [S]: t && !x ? -s : 0,
          [y]: t ? -c : 0,
          [w]: t && x ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? x ? -u.r : "auto" : 0,
          left: t ? x ? "auto" : -u.l : 0,
          [$]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [h]: t ? u.t : 0,
          [p]: t ? u.r : 0,
          [b]: t ? u.b : 0,
          [g]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          un: u,
          hn: !t,
          W: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        pn: I
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const o = getEnvironment();
    const {Ot: s, un: e, D: c, U: i, Ht: a, jt: u, _n: f} = t;
    const {N: _, V: d, T: v} = o;
    const h = u && i;
    const p = bind(l, 0);
    const g = {
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const b = {
      u: equalXY,
      o: {
        x: C,
        y: C
      }
    };
    const getOverflowAmount = (t, n) => {
      const o = r.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const s = {
        w: p(t.w - n.w),
        h: p(t.h - n.h)
      };
      return {
        w: s.w > o ? s.w : 0,
        h: s.h > o ? s.h : 0
      };
    };
    const [w, S] = createCache(g, bind(fractionalSize, c));
    const [y, $] = createCache(g, bind(B, c));
    const [H, z] = createCache(g);
    const [I, A] = createCache(g);
    const [E] = createCache(b);
    const T = getStaticPluginModuleInstance(jt);
    return ({Dt: r, sn: u, vn: g, Mt: b}, {pn: C}) => {
      const {St: D, Et: k, At: M, zt: R, It: V, Tt: P} = u || {};
      const {yt: L} = g;
      const B = T && T.L(t, n, g, o, r);
      const {Y: N, K: j, J: G, X: q} = B || {};
      const fixFlexboxGlue = (t, o) => {
        setStyles(c, {
          [x]: ""
        });
        if (o) {
          const {hn: o, un: e} = n;
          const {M: r} = t;
          const l = fractionalSize(s);
          const i = U(s);
          const a = getStyles(c, "boxSizing") === "content-box";
          const u = o || a ? e.b + e.t : 0;
          const f = !(v.x && a);
          setStyles(c, {
            [x]: i.h + l.h + (r.x && f && q ? q(t).G.x : 0) - u
          });
        }
      };
      const [F, W] = getShowNativeOverlaidScrollbars(r, o);
      const [X, Y] = r("overflow");
      const K = !i && !_ && (D || M || k || W || R);
      const J = D || C || M || V || P || W;
      const ot = overflowIsVisible(X.x);
      const st = overflowIsVisible(X.y);
      const et = ot || st;
      let rt = S(b);
      let ft = $(b);
      let _t = z(b);
      let dt = A(b);
      let vt;
      if (W && d) {
        a(lt, !F);
      }
      if (K) {
        vt = getViewportOverflowState(t);
        fixFlexboxGlue(vt, L);
      }
      if (J) {
        if (et) {
          a(it, false);
        }
        const [t, n] = j ? j(vt) : [];
        const [o, s] = rt = w(b);
        const [e, r] = ft = y(b);
        const i = U(c);
        const u = e;
        const _ = i;
        t && t();
        if ((r || s || W) && n && !F && N && N(n, e, o)) {}
        const d = windowSize(f);
        const v = {
          w: p(l(e.w, u.w) + o.w),
          h: p(l(e.h, u.h) + o.h)
        };
        const g = {
          w: p((h ? d.w : _.w + p(i.w - e.w)) + o.w),
          h: p((h ? d.h : _.h + p(i.h - e.h)) + o.h)
        };
        dt = I(g);
        _t = H(getOverflowAmount(v, g), b);
      }
      const [ht, pt] = dt;
      const [gt, bt] = _t;
      const [wt, St] = ft;
      const [yt, mt] = rt;
      const Ot = {
        x: gt.w > 0,
        y: gt.h > 0
      };
      const $t = ot && st && (Ot.x || Ot.y) || ot && Ot.x && !Ot.y || st && Ot.y && !Ot.x;
      const xt = C || V || P || mt || St || pt || bt || Y || W || K || J;
      if (xt) {
        const n = {};
        const o = setViewportOverflowState(t, Ot, X, n);
        G && G(o, g, !!N && N(o, wt, yt), n);
        if (K) {
          fixFlexboxGlue(o, L);
        }
        if (i) {
          attr(s, Q, n[m]);
          attr(s, tt, n[O]);
        } else {
          setStyles(c, n);
        }
      }
      addRemoveAttrClass(s, Z, nt, $t);
      addRemoveAttrClass(e, at, ut, $t);
      if (!i) {
        addRemoveAttrClass(c, ct, it, et);
      }
      const [Ct, Ht] = E(getViewportOverflowState(t).k);
      assignDeep(n, {
        k: Ct,
        Lt: {
          x: ht.w,
          y: ht.h
        },
        Pt: {
          x: gt.w,
          y: gt.h
        },
        an: Ot
      });
      return {
        ln: Ht,
        cn: pt,
        rn: bt
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      un: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      hn: false,
      W: {
        [S]: 0,
        [y]: 0,
        [w]: 0,
        [h]: 0,
        [p]: 0,
        [b]: 0,
        [g]: 0
      },
      Lt: {
        x: 0,
        y: 0
      },
      Pt: {
        x: 0,
        y: 0
      },
      k: {
        x: C,
        y: C
      },
      an: {
        x: false,
        y: false
      }
    };
    const {Ut: c, D: r, U: l} = n;
    const {V: i, T: a, N: u} = getEnvironment();
    const f = !i && (a.x || a.y);
    const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = f || !u;
      const s = o && getElmentScroll(r);
      const e = l ? addAttrClass(r, Z, st) : noop;
      each(_, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      e();
      scrollElementTo(r, s);
      !l && scrollElementTo(c, 0);
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s) => {
    const e = createOptionCheck(n, {});
    const [c, r, l, i, a] = createStructureSetup(t);
    const [u, f, _] = createObserversSetup(i, l, e, (t => {
      update({}, t);
    }));
    const [d, v, , h] = createScrollbarsSetup(t, n, _, l, i, s);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {gn: e, Mt: c, kt: l, bn: i} = t;
      const a = e || {};
      const u = !!c;
      const d = {
        Dt: createOptionCheck(n, a, u),
        gn: a,
        Mt: u
      };
      if (i) {
        v(d);
        return false;
      }
      const h = s || f(assignDeep({}, d, {
        kt: l
      }));
      const p = r(assignDeep({}, d, {
        vn: _,
        sn: h
      }));
      v(assignDeep({}, d, {
        sn: h,
        en: p
      }));
      const g = updateHintsAreTruthy(h);
      const b = updateHintsAreTruthy(p);
      const w = g || b || !isEmptyObject(a) || u;
      w && o(t, {
        sn: h,
        en: p
      });
      return w;
    };
    return [ () => {
      const {fn: t, D: n} = i;
      const o = getElmentScroll(t);
      const s = [ u(), c(), d() ];
      scrollElementTo(n, o);
      return bind(runEachAndClear, s);
    }, update, () => ({
      wn: _,
      Sn: l
    }), {
      yn: i,
      mn: h
    }, a ];
  };
  const OverlayScrollbars = (t, n, o) => {
    const {ct: s} = getEnvironment();
    const e = isHTMLElement(t);
    const c = e ? t : t.target;
    const r = getInstance(c);
    if (n && !r) {
      let r = false;
      const l = [];
      const i = {};
      const validateOptions = t => {
        const n = removeUndefinedProperties(t, true);
        const o = getStaticPluginModuleInstance(Lt);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, f, _] = createEventListenerHub();
      const [d, v, h] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        h(t, n);
        _(t, n);
      };
      const [p, g, b, w, S] = createSetups(t, a, (({gn: t, Mt: n}, {sn: o, en: s}) => {
        const {St: e, It: c, zt: r, At: l, Et: i, bt: a} = o;
        const {cn: u, rn: f, ln: _} = s;
        triggerEvent("updated", [ y, {
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
      }), (t => triggerEvent("scroll", [ y, t ])));
      const destroy = t => {
        removeInstance(c);
        runEachAndClear(l);
        r = true;
        triggerEvent("destroyed", [ y, t ]);
        f();
        v();
      };
      const y = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(a, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(a, e);
              g({
                gn: e
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
          const {wn: t, Sn: n} = b();
          const {F: o} = t;
          const {Lt: s, Pt: e, k: c, an: l, un: i, hn: a} = n;
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
          const {Ut: t, Ot: n, un: o, D: s, $t: e, Nt: c, nn: r} = w.yn;
          const {Yt: l, Qt: i} = w.mn;
          const translateScrollbarStructure = t => {
            const {Vt: n, Rt: o, Gt: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Kt: n, Jt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                g({
                  bn: true
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
          Mt: t,
          kt: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ S ]);
      addInstance(c, y);
      registerPluginModuleInstances(Vt, OverlayScrollbars, [ y, u, i ]);
      if (cancelInitialization(w.yn.jt, !e && t.cancel)) {
        destroy(true);
        return y;
      }
      push(l, p());
      triggerEvent("initialized", [ y ]);
      y.update(true);
      return y;
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
    const {j: t, T: n, V: o, nt: s, N: e, P: c, tt: r, lt: l, it: i, st: a, et: u, ct: f, rt: _} = getEnvironment();
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
  t.ScrollbarsHidingPlugin = Gt;
  t.SizeObserverPlugin = Bt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
