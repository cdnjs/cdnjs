/*!
 * OverlayScrollbars
 * Version: 2.11.1
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
  const f = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const _ = getApi("MutationObserver");
  const d = getApi("IntersectionObserver");
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
      const f = i - l;
      const _ = f >= u;
      const d = o ? 1 : 1 - (s(0, l + u - i) / u || 0);
      const v = (n - t) * (isFunction(c) ? c(d, d * u, 0, 1, u) : d) + t;
      const p = _ || d === 1;
      if (e) {
        e(v, d, p);
      }
      r = p ? 0 : a((() => frame()));
    };
    frame();
    return t => {
      i(r);
      if (t) {
        frame(t);
      }
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
    if (!isString(n) && isArrayLike(n)) {
      Array.prototype.push.apply(t, n);
    } else {
      t.push(n);
    }
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
    const runFn = t => t ? t.apply(void 0, n || []) : true;
    each(t, runFn);
    if (!o) {
      t.length = 0;
    }
  };
  const h = "paddingTop";
  const g = "paddingRight";
  const b = "paddingLeft";
  const w = "paddingBottom";
  const y = "marginLeft";
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
      let s = true;
      each(o, (o => {
        const e = t[o];
        const c = n[o];
        if (e !== c) {
          s = false;
        }
      }));
      return s;
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
    const s = t ? f : i;
    return [ e => {
      s(n);
      n = o((() => e()), isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const debounce = (t, n) => {
    const {_: o, v: s, p: e, S: c} = n || {};
    let r;
    let l;
    let _;
    let d;
    let v = noop;
    const p = function invokeFunctionToDebounce(n) {
      v();
      f(r);
      d = r = l = void 0;
      v = noop;
      t.apply(this, n);
    };
    const mergeParms = t => c && l ? c(l, t) : t;
    const flush = () => {
      if (v !== noop) {
        p(mergeParms(_) || _);
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
        const g = n > 0 ? f : i;
        const b = mergeParms(t);
        const w = b || t;
        const y = p.bind(0, w);
        let S;
        v();
        if (e && !d) {
          y();
          d = true;
          S = h((() => d = void 0), n);
        } else {
          S = h(y, n);
          if (c && !r) {
            r = u(flush, o);
          }
        }
        v = () => g(S);
        l = _ = w;
      } else {
        p(t);
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
  const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
    if (t === void 0) {
      delete o[n];
    } else if (t && isPlainObject(t)) {
      o[n] = removeUndefinedProperties(t);
    }
  }));
  const isEmptyObject = t => !keys(t).length;
  const capNumber = (t, n, o) => s(t, e(n, o));
  const getDomTokensArray = t => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter((t => t)));
  const getAttr = (t, n) => t && t.getAttribute(n);
  const hasAttr = (t, n) => t && t.hasAttribute(n);
  const setAttrs = (t, n, o) => {
    each(getDomTokensArray(n), (n => {
      if (t) {
        t.setAttribute(n, String(o || ""));
      }
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
  const getFocusedElement = t => document.activeElement;
  const liesBetween = (t, n, o) => {
    const s = closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
  };
  const removeElements = t => {
    each(createOrKeepArray(t), (t => {
      const n = parent(t);
      if (t && n) {
        n.removeChild(t);
      }
    }));
  };
  const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), (n => {
    if (n) {
      t.appendChild(n);
    }
  })));
  let I;
  const getTrustedTypePolicy = () => I;
  const setTrustedTypePolicy = t => {
    I = t;
  };
  const createDiv = t => {
    const n = document.createElement("div");
    setAttrs(n, "class", t);
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    const o = getTrustedTypePolicy();
    const s = t.trim();
    n.innerHTML = o ? o.createHTML(s) : s;
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
  const A = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : A;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const D = bind(getElmWidthHeightProperty, "offset");
  const M = bind(getElmWidthHeightProperty, "client");
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
      if (t) {
        t.removeEventListener(n, o, s);
      }
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
        if (o) {
          o(e);
        }
      } : o;
      if (t) {
        t.addEventListener(n, s, i);
      }
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
    M: {
      x: 0,
      y: 0
    }
  });
  const sanitizeScrollCoordinates = (t, n) => {
    const {D: o, M: s} = t;
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
    const [u, f] = sanitizeAxis(o.y, s.y, c);
    return {
      D: {
        x: i,
        y: u
      },
      M: {
        x: a,
        y: f
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({D: t, M: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({D: t, M: n}, o) => {
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
          if (isFunction(t)) {
            s.add(t);
          }
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
        if (o) {
          push(e, addEvent(n, o));
        }
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
  const k = {};
  const R = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      k[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || R)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => R[t];
  const V = "__osOptionsValidationPlugin";
  const L = `data-overlayscrollbars`;
  const U = "os-environment";
  const P = `${U}-scrollbar-hidden`;
  const N = `${L}-initialize`;
  const q = "noClipping";
  const j = `${L}-body`;
  const B = L;
  const F = "host";
  const X = `${L}-viewport`;
  const Y = O;
  const W = $;
  const G = "arrange";
  const J = "measuring";
  const K = "scrolling";
  const Q = "scrollbarHidden";
  const Z = "noContent";
  const tt = `${L}-padding`;
  const nt = `${L}-content`;
  const ot = "os-size-observer";
  const st = `${ot}-appear`;
  const et = `${ot}-listener`;
  const ct = `${et}-scroll`;
  const rt = `${et}-item`;
  const lt = `${rt}-final`;
  const it = "os-trinsic-observer";
  const at = "os-theme-none";
  const ut = "os-scrollbar";
  const ft = `${ut}-rtl`;
  const _t = `${ut}-horizontal`;
  const dt = `${ut}-vertical`;
  const vt = `${ut}-track`;
  const pt = `${ut}-handle`;
  const ht = `${ut}-visible`;
  const gt = `${ut}-cornerless`;
  const bt = `${ut}-interaction`;
  const wt = `${ut}-unusable`;
  const yt = `${ut}-auto-hide`;
  const St = `${yt}-hidden`;
  const mt = `${ut}-wheel`;
  const Ot = `${vt}-interactive`;
  const $t = `${pt}-interactive`;
  const Ct = "__osSizeObserverPlugin";
  const xt = /* @__PURE__ */ (() => ({
    [Ct]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${rt}" dir="ltr"><div class="${rt}"><div class="${lt}"></div></div><div class="${rt}"><div class="${lt}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const l = r.lastChild;
        const u = r.firstChild;
        const f = u == null ? void 0 : u.firstChild;
        let _ = D(r);
        let d = _;
        let v = false;
        let p;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(l, s);
        };
        const onResized = t => {
          p = 0;
          if (v) {
            _ = d;
            n(t === true);
          }
        };
        const onScroll = t => {
          d = D(r);
          v = !t || !equalWH(d, _);
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
        const h = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(l, e, onScroll) ];
        addClass(t, ct);
        setStyles(f, {
          [C]: s,
          [x]: s
        });
        a(reset);
        return [ o ? bind(onScroll, false) : reset, h ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {T: o} = n;
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
      k: o,
      R: {
        x: o.x === z,
        y: o.y === z
      }
    };
  };
  const Ht = "__osScrollbarsHidingPlugin";
  const Et = /* @__PURE__ */ (() => ({
    [Ht]: {
      static: () => ({
        V: (t, n, o, s, e) => {
          const {L: c, U: r} = t;
          const {P: l, T: i, N: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [f] = getShowNativeOverlaidScrollbars(e, s);
          const readViewportOverflowState = () => {
            const getStatePerAxis = t => {
              const n = getStyles(r, t);
              const o = n === z;
              return [ n, o ];
            };
            const [t, n] = getStatePerAxis(O);
            const [o, s] = getStatePerAxis($);
            return {
              k: {
                x: t,
                y: o
              },
              R: {
                x: n,
                y: s
              }
            };
          };
          const _getViewportOverflowHideOffset = t => {
            const {R: n} = t;
            const o = l || f ? 0 : 42;
            const getHideOffsetPerAxis = (t, n, s) => {
              const e = t ? o : s;
              const c = n && !l ? e : 0;
              const r = t && !!o;
              return [ c, r ];
            };
            const [s, e] = getHideOffsetPerAxis(i.x, n.x, a.x);
            const [c, r] = getHideOffsetPerAxis(i.y, n.y, a.y);
            return {
              q: {
                x: s,
                y: c
              },
              j: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {B: o}, s) => {
            if (!c) {
              const e = assignDeep({}, {
                [S]: 0,
                [m]: 0,
                [y]: 0
              });
              const {q: c, j: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {F: f} = n;
              const _ = o ? y : S;
              const d = o ? b : g;
              const v = f[_];
              const p = f[m];
              const h = f[d];
              const O = f[w];
              e[C] = `calc(100% + ${u + v * -1}px)`;
              e[_] = -u + v;
              e[m] = -a + p;
              if (s) {
                e[d] = h + (i ? u : 0);
                e[w] = O + (l ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {F: c} = n;
              const {q: l, j: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: f, y: _} = l;
              const {B: d} = o;
              const v = d ? g : b;
              const p = c[v];
              const h = c.paddingTop;
              const w = s.w + e.w;
              const y = s.h + e.h;
              const S = {
                w: _ && u ? `${_ + w - p}px` : "",
                h: f && a ? `${f + y - h}px` : ""
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
              const {F: e} = n;
              const {j: c} = _getViewportOverflowHideOffset(s);
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
              const f = getStyles(r, keys(a));
              const _ = removeAttrClass(r, X, G);
              setStyles(r, a);
              return [ () => {
                setStyles(r, assignDeep({}, f, _hideNativeScrollbars(s, o, u)));
                _();
              }, s ];
            }
            return [ noop ];
          };
          return {
            X: _getViewportOverflowHideOffset,
            Y: _arrangeViewport,
            W: _undoViewportArrange,
            G: _hideNativeScrollbars
          };
        }
      })
    }
  }))();
  const zt = "__osClickScrollPlugin";
  const It = /* @__PURE__ */ (() => ({
    [zt]: {
      static: () => (t, n, o, s) => {
        let e = false;
        let c = noop;
        const r = 133;
        const l = 222;
        const [i, a] = selfClearTimeout(r);
        const u = Math.sign(n);
        const f = o * u;
        const _ = f / 2;
        const easing = t => 1 - (1 - t) * (1 - t);
        const easedEndPressAnimation = (n, o) => animateNumber(n, o, l, t, easing);
        const linearPressAnimation = (o, s) => animateNumber(o, n - f, r * s, ((o, s, e) => {
          t(o);
          if (e) {
            c = easedEndPressAnimation(o, n);
          }
        }));
        const d = animateNumber(0, f, l, ((r, l, a) => {
          t(r);
          if (a) {
            s(e);
            if (!e) {
              const t = n - r;
              const s = Math.sign(t - _) === u;
              if (s) {
                i((() => {
                  const s = t - f;
                  const e = Math.sign(s) === u;
                  c = e ? linearPressAnimation(r, Math.abs(s) / o) : easedEndPressAnimation(r, n);
                }));
              }
            }
          }
        }), easing);
        return t => {
          e = true;
          if (t) {
            d();
          }
          a();
          c();
        };
      }
    }
  }))();
  const opsStringify = t => JSON.stringify(t, ((t, n) => {
    if (isFunction(n)) {
      throw 0;
    }
    return n;
  }));
  const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const At = {
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
  let Dt;
  const getNonce = () => Dt;
  const setNonce = t => {
    Dt = t;
  };
  let Mt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = M(t);
      const e = D(t);
      const c = getFractionalSize(n);
      if (o) {
        removeElements(t);
      }
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, P);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const t = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${P}{scrollbar-width:none!important}.${P}::-webkit-scrollbar,.${P}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const n = createDOM(`<div class="${U}"><div></div><style>${t}</style></div>`);
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
    const [f] = u();
    const _ = getNativeScrollbarsHiding(s);
    const d = {
      x: f.x === 0,
      y: f.y === 0
    };
    const v = {
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
    const h = assignDeep({}, At);
    const g = bind(assignDeep, {}, h);
    const b = bind(assignDeep, {}, v);
    const w = {
      N: f,
      T: d,
      P: _,
      J: !!p,
      K: bind(l, "r"),
      Z: b,
      tt: t => assignDeep(v, t) && b(),
      nt: g,
      ot: t => assignDeep(h, t) && g(),
      st: assignDeep({}, v),
      et: assignDeep({}, h)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      i("r", []);
    }));
    if (isFunction(o.matchMedia) && !_ && (!d.x || !d.y)) {
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
        assignDeep(w.N, t);
        i("r", [ n ]);
      }));
    }
    return w;
  };
  const getEnvironment = () => {
    if (!Mt) {
      Mt = createEnvironment();
    }
    return Mt;
  };
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
    const {ct: c, rt: r, lt: l, it: i, ut: a, ft: u} = s || {};
    const f = debounce((() => e && o(true)), {
      _: 33,
      v: 99
    });
    const [d, v] = createEventContentChange(t, f, l);
    const p = c || [];
    const h = r || [];
    const g = concat(p, h);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const f = [];
        const _ = [];
        let d = false;
        let p = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: v, removedNodes: g} = o;
          const b = a === "attributes";
          const w = a === "childList";
          const y = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "");
          const O = isString(m) ? m : null;
          const $ = S && u !== O;
          const C = inArray(h, e) && $;
          if (n && (w || !y)) {
            const n = b && $;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, O) : !b || n;
            const d = _ && !l(o, !!a, t, s);
            each(v, (t => push(f, t)));
            each(g, (t => push(f, t)));
            p = p || d;
          }
          if (!n && y && $ && !r(c, e, u, O)) {
            push(_, e);
            d = d || C;
          }
        }));
        v((t => deduplicateArray(f).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          if (!e && p) {
            o(false);
          }
          return [ false ];
        }
        if (!isEmptyArray(_) || d) {
          const t = [ deduplicateArray(_), d ];
          if (!e) {
            o.apply(0, t);
          }
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
          d();
          b.disconnect();
          e = false;
        }
      };
    }, () => {
      if (e) {
        f.m();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  let Tt = null;
  const createSizeObserver = (t, n, o) => {
    const {_t: s} = o || {};
    const e = getStaticPluginModuleInstance(Ct);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${ot}"><div class="${et}"></div></div>`);
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
            dt: true,
            _t: e
          });
        }
      };
      if (v) {
        if (!isBoolean(Tt)) {
          const n = new v(noop);
          n.observe(t, {
            get box() {
              Tt = true;
            }
          });
          Tt = Tt || false;
          n.disconnect();
        }
        const n = debounce(onSizeChangedCallbackProxy, {
          _: 0,
          v: 0
        });
        const resizeObserverCallback = t => n(t.pop());
        const s = new v(resizeObserverCallback);
        s.observe(Tt ? t : i);
        push(o, [ () => s.disconnect(), !Tt && appendChildren(t, l) ]);
        if (Tt) {
          const n = new v(resizeObserverCallback);
          n.observe(t, {
            box: "border-box"
          });
          push(o, (() => n.disconnect()));
        }
      } else if (e) {
        const [n, c] = e(i, onSizeChangedCallbackProxy, s);
        push(o, concat([ addClass(l, st), addEventListener(l, "animationstart", n), appendChildren(t, l) ], c));
      } else {
        return noop;
      }
      return bind(runEachAndClear, o);
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(it);
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
      if (d) {
        o = new d(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = D(s);
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
    const u = `[${B}]`;
    const f = `[${X}]`;
    const _ = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    const {vt: d, ht: p, U: h, gt: g, bt: b, L: w, wt: y, yt: S, St: m, Ot: O} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const $ = {
      $t: false,
      B: getDirectionIsRTL(d)
    };
    const C = getEnvironment();
    const x = getStaticPluginModuleInstance(Ht);
    const [H] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = x && x.V(t, n, $, C, o).W;
      const e = y && w;
      const c = !e && hasAttrClass(p, B, q);
      const r = !w && S(G);
      const l = r && getElementScroll(g);
      const i = l && O();
      const a = m(J, c);
      const u = r && s && s()[0];
      const f = T(h);
      const _ = getFractionalSize(h);
      if (u) {
        u();
      }
      scrollElementTo(g, l);
      if (i) {
        i();
      }
      if (c) {
        a();
      }
      return {
        w: f.w + _.w,
        h: f.h + _.h
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
      const n = getDirectionIsRTL(d);
      assignDeep(t, {
        Ct: a !== n
      });
      assignDeep($, {
        B: n
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
      if (!n) {
        s(c);
      }
      return c;
    };
    const onSizeChanged = ({dt: t, _t: n}) => {
      const o = t && !n;
      const e = !o && C.P ? E : s;
      const c = {
        dt: t || n,
        _t: n
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
      if (o && !n) {
        c(e);
      }
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
    const A = !w && createSizeObserver(p, onSizeChanged, {
      _t: true
    });
    const [D, M] = createDOMObserver(p, false, onHostMutation, {
      rt: _,
      ct: _
    });
    const k = w && v && new v((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        dt: true,
        _t: domRectAppeared(n, i)
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
      if (k) {
        k.observe(p);
      }
      const t = A && A();
      const n = z && z();
      const o = D();
      const s = C.K((t => {
        if (t) {
          E({
            zt: t
          });
        } else {
          R();
        }
      }));
      return () => {
        if (k) {
          k.disconnect();
        }
        if (t) {
          t();
        }
        if (n) {
          n();
        }
        if (l) {
          l();
        }
        o();
        s();
      };
    }, ({It: t, At: n, Dt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, d] = t("update.attributes");
      const [v, p] = t("update.elementEvents");
      const [g, y] = t("update.debounce");
      const S = p || d;
      const m = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (S) {
        if (r) {
          r();
        }
        if (l) {
          l();
        }
        const [t, n] = createDOMObserver(b || h, true, onContentMutation, {
          ct: concat(_, a || []),
          lt: v,
          it: u,
          ft: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !w ? liesBetween(o, u, f) : false;
            return e || !!closest(o, `.${ut}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (y) {
        E.m();
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
        const t = M();
        const n = I && I();
        const o = r && r();
        if (t) {
          assignDeep(s, onHostMutation(t[0], t[1], m));
        }
        if (n) {
          assignDeep(s, onTrinsicChanged(n[0], m));
        }
        if (o) {
          assignDeep(s, onContentMutation(o[0], m));
        }
      }
      setDirection(s);
      return s;
    }, $ ];
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
    const {T: e, P: c, Z: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const f = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!f || !!_;
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const e = "--os-viewport-percent";
    const c = "--os-scroll-percent";
    const r = "--os-scroll-direction";
    const {Z: l} = getEnvironment();
    const {scrollbars: i} = l();
    const {slot: a} = i;
    const {vt: u, ht: f, U: _, Mt: d, gt: v, wt: h, L: g} = n;
    const {scrollbars: b} = d ? {} : t;
    const {slot: w} = b || {};
    const y = [];
    const S = [];
    const m = [];
    const O = dynamicInitializationElement([ u, f, _ ], (() => g && h ? u : f), a, w);
    const initScrollTimeline = t => {
      if (p) {
        let n = null;
        let s = [];
        const e = new p({
          source: v,
          axis: t
        });
        const cancelAnimation = () => {
          if (n) {
            n.cancel();
          }
          n = null;
        };
        const _setScrollPercentAnimation = c => {
          const {Tt: r} = o;
          const l = isDefaultDirectionScrollCoordinates(r)[t];
          const i = t === "x";
          const a = [ getTrasformTranslateValue(0, i), getTrasformTranslateValue(`calc(100cq${i ? "w" : "h"} + -100%)`, i) ];
          const u = l ? a : a.reverse();
          if (s[0] === u[0] && s[1] === u[1]) {
            return cancelAnimation;
          }
          cancelAnimation();
          s = u;
          n = c.kt.animate({
            clear: [ "left" ],
            transform: u
          }, {
            timeline: e
          });
          return cancelAnimation;
        };
        return {
          Rt: _setScrollPercentAnimation
        };
      }
    };
    const $ = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const getViewportPercent = () => {
      const {Vt: t, Lt: n} = o;
      const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
      return {
        x: getAxisValue(n.x, t.x),
        y: getAxisValue(n.y, t.y)
      };
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
        setStyles(o, s);
      }));
    };
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      if (e) {
        scrollbarStructureAddRemoveClass(S, t, n);
      }
      if (c) {
        scrollbarStructureAddRemoveClass(m, t, n);
      }
    };
    const refreshScrollbarsHandleLength = () => {
      const t = getViewportPercent();
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [e]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(t.x));
      scrollbarStyle(m, createScrollbarStyleFn(t.y));
    };
    const refreshScrollbarsHandleOffset = () => {
      if (!p) {
        const {Tt: t} = o;
        const n = getScrollCoordinatesPercent(t, getElementScroll(v));
        const createScrollbarStyleFn = t => n => [ n.Ut, {
          [c]: roundCssNumber(t) + ""
        } ];
        scrollbarStyle(S, createScrollbarStyleFn(n.x));
        scrollbarStyle(m, createScrollbarStyleFn(n.y));
      }
    };
    const refreshScrollbarsScrollCoordinates = () => {
      const {Tt: t} = o;
      const n = isDefaultDirectionScrollCoordinates(t);
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [r]: t ? "0" : "1"
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
      if (p) {
        S.forEach($.x.Rt);
        m.forEach($.y.Rt);
      }
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (g && !h) {
        const {Vt: t, Tt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = getScrollCoordinatesPercent(n, getElementScroll(v));
        const styleScrollbarPosition = n => {
          const {Ut: o} = n;
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
      const o = t ? _t : dt;
      const e = createDiv(`${ut} ${o}`);
      const c = createDiv(vt);
      const r = createDiv(pt);
      const l = {
        Ut: e,
        Pt: c,
        kt: r
      };
      const i = $[n];
      push(t ? S : m, l);
      push(y, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), i && i.Rt(l), s(l, scrollbarsAddRemoveClass, t) ]);
      return l;
    };
    const C = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(O, S[0].Ut);
      appendChildren(O, m[0].Ut);
      return bind(runEachAndClear, y);
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
    const {ht: a, U: f, L: _, gt: d, Kt: v, Ot: p} = n;
    const {Ut: h, Pt: g, kt: b} = e;
    const [w, y] = selfClearTimeout(333);
    const [S, m] = selfClearTimeout(444);
    const scrollOffsetElementScrollBy = t => {
      if (isFunction(d.scrollBy)) {
        d.scrollBy({
          behavior: "smooth",
          left: t.x,
          top: t.y
        });
      }
    };
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const s = `client${i ? "X" : "Y"}`;
      const e = i ? C : x;
      const l = i ? "left" : "top";
      const a = i ? "w" : "h";
      const u = i ? "x" : "y";
      const createRelativeHandleMove = (t, n) => s => {
        const {Vt: e} = o;
        const c = D(g)[a] - D(b)[a];
        const r = n * s / c;
        const l = r * e[u];
        scrollElementTo(d, {
          [u]: t + l
        });
      };
      const f = [];
      return addEventListener(g, "pointerdown", (o => {
        const i = closest(o.target, `.${pt}`) === b;
        const _ = i ? b : g;
        const h = t.scrollbars;
        const w = h[i ? "dragScroll" : "clickScroll"];
        const {button: y, isPrimary: O, pointerType: $} = o;
        const {pointers: C} = h;
        const x = y === 0 && O && w && (C || []).includes($);
        if (x) {
          runEachAndClear(f);
          m();
          const t = !i && (o.shiftKey || w === "instant");
          const h = bind(getBoundingClientRect, b);
          const y = bind(getBoundingClientRect, g);
          const getHandleOffset = (t, n) => (t || h())[l] - (n || y())[l];
          const O = c(getBoundingClientRect(d)[e]) / D(d)[a] || 1;
          const $ = createRelativeHandleMove(getElementScroll(d)[u], 1 / O);
          const C = o[s];
          const x = h();
          const H = y();
          const E = x[e];
          const z = getHandleOffset(x, H) + E / 2;
          const I = C - H[l];
          const A = i ? 0 : I - z;
          const releasePointerCapture = t => {
            runEachAndClear(k);
            _.releasePointerCapture(t.pointerId);
          };
          const M = i || t;
          const T = p();
          const k = [ addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(g, n, releasePointerCapture), M && addEventListener(g, "pointermove", (t => $(A + (t[s] - C)))), M && (() => {
            const t = getElementScroll(d);
            T();
            const n = getElementScroll(d);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              p();
              scrollElementTo(d, t);
              scrollOffsetElementScrollBy(o);
              S(T);
            }
          }) ];
          _.setPointerCapture(o.pointerId);
          if (t) {
            $(A);
          } else if (!i) {
            const t = getStaticPluginModuleInstance(zt);
            if (t) {
              const n = t($, A, E, (t => {
                if (t) {
                  T();
                } else {
                  push(k, T);
                }
              }));
              push(k, n);
              push(f, bind(n, true));
            }
          }
        }
      }));
    };
    let O = true;
    return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(h, "pointerenter", (() => {
      l(bt, true);
    })), addEventListener(h, "pointerleave pointercancel", (() => {
      l(bt, false);
    })), !_ && addEventListener(h, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, X) || hasAttr(t, B) || t === document.body) {
        u(bind(focusElement, f), 25);
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
      l(mt, true);
      w((() => {
        O = true;
        l(mt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(h, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
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
    let f = noop;
    let _ = 0;
    const d = [ "mouse", "pen" ];
    const isHoverablePointerType = t => d.includes(t.pointerType);
    const [v, p] = selfClearTimeout();
    const [h, g] = selfClearTimeout(100);
    const [b, w] = selfClearTimeout(100);
    const [y, S] = selfClearTimeout((() => _));
    const [m, O] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {ht: $, Qt: C, wt: x} = e;
    const {Ft: E, Nt: I, qt: A, jt: D, Bt: M} = m;
    const manageScrollbarsAutoHide = (t, n) => {
      S();
      if (t) {
        E(St);
      } else {
        const t = bind(E, St, true);
        if (_ > 0 && !n) {
          y(t);
        } else {
          t();
        }
      }
    };
    const manageScrollbarsAutoHideInstantInteraction = () => {
      if (i ? !r : !a) {
        manageScrollbarsAutoHide(true);
        h((() => {
          manageScrollbarsAutoHide(false);
        }));
      }
    };
    const manageAutoHideSuspension = t => {
      E(yt, t, true);
      E(yt, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        if (i) {
          manageScrollbarsAutoHide(true);
        }
      }
    };
    const T = [ S, g, w, p, () => f(), addEventListener($, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        r = false;
        if (i) {
          manageScrollbarsAutoHide(false);
        }
      }
    })), addEventListener($, "pointermove", (t => {
      if (isHoverablePointerType(t) && l) {
        manageScrollbarsAutoHideInstantInteraction();
      }
    })), addEventListener(C, "scroll", (t => {
      v((() => {
        A();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      M();
    })) ];
    return [ () => bind(runEachAndClear, push(T, O())), ({It: t, Dt: n, Zt: e, tn: c}) => {
      const {nn: r, sn: d, en: v, cn: p} = c || {};
      const {Ct: h, _t: g} = e || {};
      const {B: w} = o;
      const {T: y} = getEnvironment();
      const {k: S, rn: m} = s;
      const [O, $] = t("showNativeOverlaidScrollbars");
      const [T, k] = t("scrollbars.theme");
      const [R, V] = t("scrollbars.visibility");
      const [L, U] = t("scrollbars.autoHide");
      const [P, N] = t("scrollbars.autoHideSuspend");
      const [q] = t("scrollbars.autoHideDelay");
      const [j, B] = t("scrollbars.dragScroll");
      const [F, X] = t("scrollbars.clickScroll");
      const [Y, W] = t("overflow");
      const G = g && !n;
      const J = m.x || m.y;
      const K = r || d || p || h || n;
      const Q = v || V || W;
      const Z = O && y.x && y.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(z) && (R === H || R === "auto" && n === z);
        E(ht, s, o);
        return s;
      };
      _ = q;
      if (G) {
        if (P && J) {
          manageAutoHideSuspension(false);
          f();
          b((() => {
            f = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if ($) {
        E(at, Z);
      }
      if (k) {
        E(u);
        E(T, true);
        u = T;
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
        E($t, j);
      }
      if (X) {
        E(Ot, !!F);
      }
      if (Q) {
        const t = setScrollbarVisibility(Y.x, S.x, true);
        const n = setScrollbarVisibility(Y.y, S.y, false);
        const o = t && n;
        E(gt, !o);
      }
      if (K) {
        A();
        I();
        M();
        if (p) {
          D();
        }
        E(wt, !m.x, true);
        E(wt, !m.y, false);
        E(ft, w && !x);
      }
    }, {}, m ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {Z: s, P: e} = n;
    const {elements: c} = s();
    const {padding: r, viewport: l, content: i} = c;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: f} = u;
    const {padding: _, viewport: d, content: v} = f || {};
    const p = a ? t : u.target;
    const h = isBodyElement(p);
    const g = p.ownerDocument;
    const b = g.documentElement;
    const getDocumentWindow = () => g.defaultView || o;
    const w = bind(staticInitializationElement, [ p ]);
    const y = bind(dynamicInitializationElement, [ p ]);
    const S = bind(createDiv, "");
    const m = bind(w, S, l);
    const C = bind(y, S, i);
    const elementHasOverflow = t => {
      const n = D(t);
      const o = T(t);
      const s = getStyles(t, O);
      const e = getStyles(t, $);
      return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
    };
    const x = m(d);
    const H = x === p;
    const E = H && h;
    const z = !H && C(v);
    const I = !H && x === z;
    const A = E ? b : x;
    const M = E ? A : p;
    const k = !H && y(S, r, _);
    const R = !I && z;
    const V = [ R, A, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const L = !elementIsGenerated(A) && elementHasOverflow(A) ? A : p;
    const U = E ? b : A;
    const P = E ? g : A;
    const q = {
      vt: p,
      ht: M,
      U: A,
      ln: k,
      bt: R,
      gt: U,
      Qt: P,
      an: h ? b : L,
      Kt: g,
      wt: h,
      Mt: a,
      L: H,
      un: getDocumentWindow,
      yt: t => hasAttrClass(A, X, t),
      St: (t, n) => addRemoveAttrClass(A, X, t, n),
      Ot: () => addRemoveAttrClass(U, X, K, true)
    };
    const {vt: Y, ht: W, ln: G, U: J, bt: Z} = q;
    const ot = [ () => {
      removeAttrs(W, [ B, N ]);
      removeAttrs(Y, N);
      if (h) {
        removeAttrs(b, [ N, B ]);
      }
    } ];
    let st = contents([ Z, J, G, W, Y ].find((t => t && !elementIsGenerated(t))));
    const et = E ? Y : Z || J;
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
      const s = getAttr(J, o);
      const c = prepareWrapUnwrapFocus(n);
      setAttrs(W, B, H ? "" : F);
      setAttrs(G, tt, "");
      setAttrs(J, X, "");
      setAttrs(Z, nt, "");
      if (!H) {
        setAttrs(J, o, s || "-1");
        if (h) {
          setAttrs(b, j, "");
        }
      }
      appendChildren(et, st);
      appendChildren(W, G);
      appendChildren(G || W, !H && J);
      appendChildren(J, Z);
      push(ot, [ c, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(J);
        const e = n && t === J ? Y : t;
        const c = prepareWrapUnwrapFocus(e);
        removeAttrs(G, tt);
        removeAttrs(Z, nt);
        removeAttrs(J, X);
        if (h) {
          removeAttrs(b, j);
        }
        if (s) {
          setAttrs(J, o, s);
        } else {
          removeAttrs(J, o);
        }
        if (elementIsGenerated(Z)) {
          unwrap(Z);
        }
        if (n) {
          unwrap(J);
        }
        if (elementIsGenerated(G)) {
          unwrap(G);
        }
        focusElement(e);
        c();
      } ]);
      if (e && !H) {
        addAttrClass(J, X, Q);
        push(ot, bind(removeAttrs, J, X));
      }
      focusElement(!H && h && n === Y && t.top === t ? J : n);
      c();
      st = 0;
      return ct;
    };
    return [ q, appendElements, ct ];
  };
  const createTrinsicUpdateSegment = ({bt: t}) => ({Zt: n, fn: o, Dt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [x]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ht: t, ln: n, U: o, L: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({It: t, Zt: l, fn: i, Dt: a}) => {
      let [u, f] = r(a);
      const {P: _} = getEnvironment();
      const {dt: d, Ht: v, Ct: p} = l || {};
      const {B: O} = i;
      const [$, x] = t("paddingAbsolute");
      const H = a || v;
      if (d || f || H) {
        [u, f] = c(a);
      }
      const E = !s && (x || p || f);
      if (E) {
        const t = !$ || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [S]: t && !O ? -s : 0,
          [m]: t ? -c : 0,
          [y]: t && O ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? O ? -u.r : "auto" : 0,
          left: t ? O ? "auto" : -u.l : 0,
          [C]: t && `calc(100% + ${s}px)`
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
          ln: u,
          _n: !t,
          F: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        dn: E
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {ht: c, ln: r, U: l, L: i, Qt: u, gt: f, wt: _, St: d, un: v} = t;
    const {P: p} = e;
    const h = _ && i;
    const g = bind(s, 0);
    const b = {
      display: () => false,
      direction: t => t !== "ltr",
      flexDirection: t => t.endsWith("-reverse"),
      writingMode: t => t !== "horizontal-tb"
    };
    const w = keys(b);
    const y = {
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
      d(J, !h && t);
    };
    const getMeasuredScrollCoordinates = t => {
      const n = w.some((n => {
        const o = t[n];
        return o && b[n](o);
      }));
      if (!n) {
        return {
          D: {
            x: 0,
            y: 0
          },
          M: {
            x: 1,
            y: 1
          }
        };
      }
      setMeasuringMode(true);
      const o = getElementScroll(f);
      const s = d(Z, true);
      const e = addEventListener(u, z, (t => {
        const n = getElementScroll(f);
        if (t.isTrusted && n.x === o.x && n.y === o.y) {
          stopPropagation(t);
        }
      }), {
        I: true,
        A: true
      });
      scrollElementTo(f, {
        x: 0,
        y: 0
      });
      s();
      const c = getElementScroll(f);
      const r = T(f);
      scrollElementTo(f, {
        x: r.w,
        y: r.h
      });
      const l = getElementScroll(f);
      scrollElementTo(f, {
        x: l.x - c.x < 1 && -r.w,
        y: l.y - c.y < 1 && -r.h
      });
      const i = getElementScroll(f);
      scrollElementTo(f, o);
      a((() => e()));
      return {
        D: c,
        M: i
      };
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
    const [m, O] = createCache(y, bind(getFractionalSize, l));
    const [$, C] = createCache(y, bind(T, l));
    const [x, I] = createCache(y);
    const [A] = createCache(S);
    const [D, k] = createCache(y);
    const [R] = createCache(S);
    const [V] = createCache({
      i: (t, n) => equal(t, n, w),
      o: {}
    }, (() => hasDimensions(l) ? getStyles(l, w) : {}));
    const [L, U] = createCache({
      i: (t, n) => equalXY(t.D, n.D) && equalXY(t.M, n.M),
      o: getZeroScrollCoordinates()
    });
    const P = getStaticPluginModuleInstance(Ht);
    const createViewportOverflowStyleClassName = (t, n) => {
      const o = n ? Y : W;
      return `${o}${capitalizeFirstLetter(t)}`;
    };
    const setViewportOverflowStyle = t => {
      const createAllOverflowStyleClassNames = t => [ H, E, z ].map((n => createViewportOverflowStyleClassName(n, t)));
      const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
      d(n);
      d(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
    };
    return ({It: o, Zt: s, fn: i, Dt: a}, {dn: u}) => {
      const {dt: f, Ht: _, Ct: b, _t: w, zt: y} = s || {};
      const S = P && P.V(t, n, i, e, o);
      const {Y: H, W: E, G: z} = S || {};
      const [T, N] = getShowNativeOverlaidScrollbars(o, e);
      const [j, F] = o("overflow");
      const X = overflowIsVisible(j.x);
      const Y = overflowIsVisible(j.y);
      const W = f || u || _ || b || y || N;
      let G = O(a);
      let J = C(a);
      let K = I(a);
      let Z = k(a);
      if (N && p) {
        d(Q, !T);
      }
      if (W) {
        if (hasAttrClass(c, B, q)) {
          setMeasuringMode(true);
        }
        const [t] = E ? E() : [];
        const [n] = G = m(a);
        const [o] = J = $(a);
        const s = M(l);
        const e = h && getWindowSize(v());
        const r = {
          w: g(o.w + n.w),
          h: g(o.h + n.h)
        };
        const i = {
          w: g((e ? e.w : s.w + g(s.w - o.w)) + n.w),
          h: g((e ? e.h : s.h + g(s.h - o.h)) + n.h)
        };
        if (t) {
          t();
        }
        Z = D(i);
        K = x(getOverflowAmount(r, i), a);
      }
      const [nt, ot] = Z;
      const [st, et] = K;
      const [ct, rt] = J;
      const [lt, it] = G;
      const [at, ut] = A({
        x: st.w > 0,
        y: st.h > 0
      });
      const ft = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
      const _t = u || b || y || it || rt || ot || et || F || N || W;
      const dt = createViewportOverflowState(at, j);
      const [vt, pt] = R(dt.k);
      const [ht, gt] = V(a);
      const bt = b || w || gt || ut || a;
      const [wt, yt] = bt ? L(getMeasuredScrollCoordinates(ht), a) : U();
      if (_t) {
        if (pt) {
          setViewportOverflowStyle(dt.k);
        }
        if (z && H) {
          setStyles(l, z(dt, i, H(dt, ct, lt)));
        }
      }
      setMeasuringMode(false);
      addRemoveAttrClass(c, B, q, ft);
      addRemoveAttrClass(r, tt, q, ft);
      assignDeep(n, {
        k: vt,
        Lt: {
          x: nt.w,
          y: nt.h
        },
        Vt: {
          x: st.w,
          y: st.h
        },
        rn: at,
        Tt: sanitizeScrollCoordinates(wt, st)
      });
      return {
        en: pt,
        nn: ot,
        sn: et,
        cn: yt || et,
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
      _n: false,
      F: {
        [S]: 0,
        [m]: 0,
        [y]: 0,
        [h]: 0,
        [g]: 0,
        [w]: 0,
        [b]: 0
      },
      Lt: {
        x: 0,
        y: 0
      },
      Vt: {
        x: 0,
        y: 0
      },
      k: {
        x: E,
        y: E
      },
      rn: {
        x: false,
        y: false
      },
      Tt: getZeroScrollCoordinates()
    };
    const {vt: c, gt: r, L: l, Ot: i} = n;
    const {P: a, T: u} = getEnvironment();
    const f = !a && (u.x || u.y);
    const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = f;
      const s = o && getElementScroll(r);
      const e = s && i();
      each(_, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, s);
      if (e) {
        e();
      }
      if (!l) {
        scrollElementTo(c, 0);
      }
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s, e) => {
    let c = false;
    const r = createOptionCheck(n, {});
    const [l, i, a, u, f] = createStructureSetup(t);
    const [_, d, v] = createObserversSetup(u, a, r, (t => {
      update({}, t);
    }));
    const [p, h, , g] = createScrollbarsSetup(t, n, v, a, u, e);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, e) => {
      if (o()) {
        return false;
      }
      const {pn: r, Dt: l, At: a, hn: u} = t;
      const f = r || {};
      const _ = !!l || !c;
      const p = {
        It: createOptionCheck(n, f, _),
        pn: f,
        Dt: _
      };
      if (u) {
        h(p);
        return false;
      }
      const g = e || d(assignDeep({}, p, {
        At: a
      }));
      const b = i(assignDeep({}, p, {
        fn: v,
        Zt: g
      }));
      h(assignDeep({}, p, {
        Zt: g,
        tn: b
      }));
      const w = updateHintsAreTruthy(g);
      const y = updateHintsAreTruthy(b);
      const S = w || y || !isEmptyObject(f) || _;
      c = true;
      if (S) {
        s(t, {
          Zt: g,
          tn: b
        });
      }
      return S;
    };
    return [ () => {
      const {an: t, gt: n, Ot: o} = u;
      const s = getElementScroll(t);
      const e = [ _(), l(), p() ];
      const c = o();
      scrollElementTo(n, s);
      c();
      return bind(runEachAndClear, e);
    }, update, () => ({
      gn: v,
      bn: a
    }), {
      wn: u,
      yn: g
    }, f ];
  };
  const kt = new WeakMap;
  const addInstance = (t, n) => {
    kt.set(t, n);
  };
  const removeInstance = t => {
    kt.delete(t);
  };
  const getInstance = t => kt.get(t);
  const OverlayScrollbars = (t, n, o) => {
    const {nt: s} = getEnvironment();
    const e = isHTMLElement(t);
    const c = e ? t : t.target;
    const r = getInstance(c);
    if (n && !r) {
      let r = false;
      const l = [];
      const i = {};
      const validateOptions = t => {
        const n = removeUndefinedProperties(t);
        const o = getStaticPluginModuleInstance(V);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, f, _] = createEventListenerHub();
      const [d, v, p] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        p(t, n);
        _(t, n);
      };
      const [h, g, b, w, y] = createSetups(t, a, (() => r), (({pn: t, Dt: n}, {Zt: o, tn: s}) => {
        const {dt: e, Ct: c, xt: r, Ht: l, Et: i, _t: a} = o;
        const {nn: u, sn: f, en: _, cn: d} = s;
        triggerEvent("updated", [ S, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!f,
            overflowStyleChanged: !!_,
            scrollCoordinatesChanged: !!d,
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
        f();
        v();
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
        on: d,
        off: (t, n) => {
          if (t && n) {
            v(t, n);
          }
        },
        state() {
          const {gn: t, bn: n} = b();
          const {B: o} = t;
          const {Lt: s, Vt: e, k: c, rn: l, ln: i, _n: a, Tt: u} = n;
          return assignDeep({}, {
            overflowEdge: s,
            overflowAmount: e,
            overflowStyle: c,
            hasOverflow: l,
            scrollCoordinates: {
              start: u.D,
              end: u.M
            },
            padding: i,
            paddingAbsolute: a,
            directionRTL: o,
            destroyed: r
          });
        },
        elements() {
          const {vt: t, ht: n, ln: o, U: s, bt: e, gt: c, Qt: r} = w.wn;
          const {Xt: l, Jt: i} = w.yn;
          const translateScrollbarStructure = t => {
            const {kt: n, Pt: o, Ut: s} = t;
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
                g({
                  hn: true
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
          Dt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, S);
      registerPluginModuleInstances(k, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(w.wn.wt, !e && t.cancel)) {
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
    const {N: t, T: n, P: o, J: s, st: e, et: c, Z: r, tt: l, nt: i, ot: a} = getEnvironment();
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
  OverlayScrollbars.trustedTypePolicy = setTrustedTypePolicy;
  t.ClickScrollPlugin = It;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Et;
  t.SizeObserverPlugin = xt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
