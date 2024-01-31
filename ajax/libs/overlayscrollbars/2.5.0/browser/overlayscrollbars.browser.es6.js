/*!
 * OverlayScrollbars
 * Version: 2.5.0
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
  const o = n ? window : {};
  const s = Math.max;
  const e = Math.min;
  const c = Math.round;
  const r = Math.abs;
  const l = o.cancelAnimationFrame;
  const i = o.requestAnimationFrame;
  const a = o.setTimeout;
  const u = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const f = getApi("MutationObserver");
  const _ = getApi("IntersectionObserver");
  const d = getApi("ResizeObserver");
  const v = getApi("ScrollTimeline");
  const h = n && Node.ELEMENT_NODE;
  const {toString: p, hasOwnProperty: g} = Object.prototype;
  const b = /^\[object (.+)\]$/;
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
  const type = t => isUndefined(t) || isNull(t) ? `${t}` : p.call(t).replace(b, "$1").toLowerCase();
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
    const c = g.call(t, o);
    const r = e && g.call(e, "isPrototypeOf");
    if (s && !c && !r) {
      return false;
    }
    for (n in t) {}
    return isUndefined(n) || g.call(t, n);
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
    const a = animationCurrentTime();
    const u = s(0, o);
    const frame = o => {
      const l = animationCurrentTime();
      const f = l - a;
      const _ = f >= u;
      const d = o ? 1 : 1 - (s(0, a + u - l) / u || 0);
      const v = (n - t) * (isFunction(c) ? c(d, d * u, 0, 1, u) : d) + t;
      const h = _ || d === 1;
      e && e(v, d, h);
      r = h ? 0 : i((() => frame()));
    };
    frame();
    return t => {
      l(r);
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
  const S = "paddingRight";
  const y = "paddingLeft";
  const m = "paddingBottom";
  const O = "marginLeft";
  const $ = "marginRight";
  const C = "marginBottom";
  const x = "overflowX";
  const H = "overflowY";
  const I = "width";
  const z = "height";
  const E = "hidden";
  const A = "visible";
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
    const o = t ? a : i;
    const s = t ? u : l;
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
    const {v: r, p: f, S: _} = n || {};
    const d = function invokeFunctionToDebounce(n) {
      c();
      u(o);
      o = s = void 0;
      c = noop;
      t.apply(this, n);
    };
    const mergeParms = t => _ && s ? _(s, t) : t;
    const flush = () => {
      if (c !== noop) {
        d(mergeParms(e) || e);
      }
    };
    const v = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(r) ? r() : r;
      const _ = isNumber(n) && n >= 0;
      if (_) {
        const r = isFunction(f) ? f() : f;
        const _ = isNumber(r) && r >= 0;
        const v = n > 0 ? a : i;
        const h = n > 0 ? u : l;
        const p = mergeParms(t);
        const g = p || t;
        const b = d.bind(0, g);
        c();
        const w = v(b, n);
        c = () => h(w);
        if (_ && !o) {
          o = a(flush, r);
        }
        s = e = g;
      } else {
        d(t);
      }
    };
    v.m = flush;
    return v;
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
  const setAttrs = (t, n, o) => {
    each(getDomTokensArray(n), (n => {
      t && t.setAttribute(n, o || "");
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
      each(getDomTokensArray(t), (t => s[n](t)));
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
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).$(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => {
    (s ? addAttrClass : removeAttrClass)(t, n, o);
  };
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).C(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).O(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).$(n);
    return bind(removeClass, t, n);
  };
  const T = n && Element.prototype;
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
      const o = T.matches || T.msMatchesSelector;
      return o.call(t, n);
    }
    return false;
  };
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => isElement(t) && t.closest(n);
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
    t && each(n, ((n, o) => {
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
      c = e ? getCSSVal(r, n) : n.reduce(((t, n) => {
        t[n] = getCSSVal(r, n);
        return t;
      }), c);
    }
    return c;
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
  const k = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : k;
  const windowSize = t => getElmWidthHeightProperty("inner", t || o);
  const R = bind(getElmWidthHeightProperty, "offset");
  const M = bind(getElmWidthHeightProperty, "client");
  const V = bind(getElmWidthHeightProperty, "scroll");
  const fractionalSize = t => {
    const n = parseFloat(getStyles(t, I)) || 0;
    const o = parseFloat(getStyles(t, z)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t[z] || t[I]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  const removeEventListener = (t, n, o, s) => {
    each(getDomTokensArray(n), (n => {
      t.removeEventListener(n, o, s);
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
        o(e);
      } : o;
      t.addEventListener(n, s, i);
      return bind(removeEventListener, t, n, s, r);
    })));
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const L = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t && getBoundingClientRect(t);
    return n ? {
      x: n.left + o.scrollX,
      y: n.top + o.scrollY
    } : L;
  };
  const convertScrollPosition = (t, n, o) => o ? o.n ? -t + 0 : o.i ? n - t : t : t;
  const getRawScrollBounds = (t, n) => [ convertScrollPosition(0, t, n), convertScrollPosition(t, t, n) ];
  const getRawScrollRatio = (t, n, o) => capNumber(0, 1, convertScrollPosition(t, n, o) / n || 0);
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
  const B = "os-environment";
  const N = `${B}-scrollbar-hidden`;
  const j = `${U}-initialize`;
  const F = U;
  const q = `${F}-overflow-x`;
  const W = `${F}-overflow-y`;
  const X = "overflowVisible";
  const Y = "scrollbarPressed";
  const G = "updating";
  const J = "body";
  const K = `${U}-viewport`;
  const Z = "arrange";
  const Q = "scrollbarHidden";
  const tt = X;
  const nt = `${U}-padding`;
  const ot = tt;
  const st = `${U}-content`;
  const et = "os-size-observer";
  const ct = `${et}-appear`;
  const rt = `${et}-listener`;
  const lt = `${rt}-scroll`;
  const it = `${rt}-item`;
  const at = `${it}-final`;
  const ut = "os-trinsic-observer";
  const ft = "os-theme-none";
  const _t = "os-scrollbar";
  const dt = `${_t}-rtl`;
  const vt = `${_t}-horizontal`;
  const ht = `${_t}-vertical`;
  const pt = `${_t}-track`;
  const gt = `${_t}-handle`;
  const bt = `${_t}-visible`;
  const wt = `${_t}-cornerless`;
  const St = `${_t}-transitionless`;
  const yt = `${_t}-interaction`;
  const mt = `${_t}-unusable`;
  const Ot = `${_t}-auto-hide`;
  const $t = `${Ot}-hidden`;
  const Ct = `${_t}-wheel`;
  const xt = `${pt}-interactive`;
  const Ht = `${gt}-interactive`;
  const It = {};
  const zt = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      It[o] = t[o];
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
  const Et = "__osOptionsValidationPlugin";
  const At = "__osSizeObserverPlugin";
  const Tt = /* @__PURE__ */ (() => ({
    [At]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${it}" dir="ltr"><div class="${it}"><div class="${at}"></div></div><div class="${it}"><div class="${at}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const a = r.lastChild;
        const u = r.firstChild;
        const f = u == null ? void 0 : u.firstChild;
        let _ = R(r);
        let d = _;
        let v = false;
        let h;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(a, s);
        };
        const onResized = t => {
          h = 0;
          if (v) {
            _ = d;
            n(t === true);
          }
        };
        const onScroll = t => {
          d = R(r);
          v = !t || !equalWH(d, _);
          if (t) {
            stopPropagation(t);
            if (v && !h) {
              l(h);
              h = i(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const p = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(a, e, onScroll) ];
        addClass(t, lt);
        setStyles(f, {
          [I]: s,
          [z]: s
        });
        i(reset);
        return [ o ? bind(onScroll, false) : reset, p ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {T: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(A) === 0;
  const getViewportOverflowState = (t, n) => {
    const {D: o} = t;
    const getStatePerAxis = t => {
      const s = getStyles(o, t);
      const e = n ? n[t] : s;
      const c = e === "scroll";
      return [ s, c ];
    };
    const [s, e] = getStatePerAxis(x);
    const [c, r] = getStatePerAxis(H);
    return {
      k: {
        x: s,
        y: c
      },
      R: {
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
      const c = n && o && t.replace(`${A}-`, "") || s;
      return [ n && !o ? t : "", overflowIsVisible(c) ? "hidden" : c ];
    };
    const [c, r] = setAxisOverflowStyle(o.x, n.x);
    const [l, i] = setAxisOverflowStyle(o.y, n.y);
    s[x] = r && l ? r : c;
    s[H] = i && c ? i : l;
    return getViewportOverflowState(t, s);
  };
  const Dt = "__osScrollbarsHidingPlugin";
  const kt = /* @__PURE__ */ (() => ({
    [Dt]: {
      static: () => ({
        M: (t, n, o, s, e) => {
          const {V: c, D: r} = t;
          const {L: l, T: i, P: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [f] = getShowNativeOverlaidScrollbars(e, s);
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
              U: {
                x: s,
                y: c
              },
              B: {
                x: e,
                y: r
              }
            };
          };
          const _hideNativeScrollbars = (t, {N: o}, s, e) => {
            assignDeep(e, {
              [$]: 0,
              [C]: 0,
              [O]: 0
            });
            if (!c) {
              const {U: c, B: r} = _getViewportOverflowHideOffset(t);
              const {x: l, y: i} = r;
              const {x: a, y: u} = c;
              const {j: f} = n;
              const _ = o ? O : $;
              const d = o ? y : S;
              const v = f[_];
              const h = f[C];
              const p = f[d];
              const g = f[m];
              e[I] = `calc(100% + ${u + v * -1}px)`;
              e[_] = -u + v;
              e[C] = -a + h;
              if (s) {
                e[d] = p + (i ? u : 0);
                e[m] = g + (l ? a : 0);
              }
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {j: c} = n;
              const {U: l, B: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: f, y: _} = l;
              const {N: d} = o;
              const v = d ? S : y;
              const h = c[v];
              const p = c.paddingTop;
              const g = s.w + e.w;
              const b = s.h + e.h;
              const w = {
                w: _ && u ? `${_ + g - h}px` : "",
                h: f && a ? `${f + b - p}px` : ""
              };
              setStyles(r, {
                "--os-vaw": w.w,
                "--os-vah": w.h
              });
            }
            return u;
          };
          const _undoViewportArrange = s => {
            if (u) {
              const e = s || getViewportOverflowState(t);
              const {j: c} = n;
              const {B: l} = _getViewportOverflowHideOffset(e);
              const {x: i, y: a} = l;
              const f = {};
              const assignProps = t => each(t, (t => {
                f[t] = c[t];
              }));
              if (i) {
                assignProps([ C, w, m ]);
              }
              if (a) {
                assignProps([ O, $, y, S ]);
              }
              const _ = getStyles(r, keys(f));
              removeAttrClass(r, K, Z);
              setStyles(r, f);
              return [ () => {
                _hideNativeScrollbars(e, o, u, _);
                setStyles(r, _);
                addAttrClass(r, K, Z);
              }, e ];
            }
            return [ noop ];
          };
          return {
            F: _getViewportOverflowHideOffset,
            q: _arrangeViewport,
            W: _undoViewportArrange,
            X: _hideNativeScrollbars
          };
        },
        Y: () => {
          let t = {
            w: 0,
            h: 0
          };
          let n = 0;
          const getWindowDPR = () => {
            const t = o.screen;
            const n = t.deviceXDPI || 0;
            const s = t.logicalXDPI || 1;
            return o.devicePixelRatio || n / s;
          };
          const diffBiggerThanOne = (t, n) => {
            const o = r(t);
            const s = r(n);
            return !(o === s || o + 1 === s || o - 1 === s);
          };
          return (o, s) => {
            const e = windowSize();
            const l = {
              w: e.w - t.w,
              h: e.h - t.h
            };
            if (l.w === 0 && l.h === 0) {
              return;
            }
            const i = {
              w: r(l.w),
              h: r(l.h)
            };
            const a = {
              w: r(c(e.w / (t.w / 100))),
              h: r(c(e.h / (t.h / 100)))
            };
            const u = getWindowDPR();
            const f = i.w > 2 && i.h > 2;
            const _ = !diffBiggerThanOne(a.w, a.h);
            const d = u !== n && u > 0;
            const v = f && _ && d;
            let h;
            let p;
            if (v) {
              [p, h] = s();
              assignDeep(o.P, p);
            }
            t = e;
            n = u;
            return h;
          };
        }
      })
    }
  }))();
  const Rt = "__osClickScrollPlugin";
  const Mt = /* @__PURE__ */ (() => ({
    [Rt]: {
      static: () => (t, n, o, s, e) => {
        let c = 0;
        let r = noop;
        const animateClickScroll = l => {
          r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
            t(o);
            const u = n();
            const f = u + s;
            const _ = e >= u && e <= f;
            if (i && !_) {
              if (c) {
                animateClickScroll(o);
              } else {
                const t = a((() => {
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
  let Vt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o, s) => {
      appendChildren(t, n);
      const e = M(n);
      const c = R(n);
      const r = fractionalSize(o);
      s && removeElements(n);
      return {
        x: c.h - e.h + r.h,
        y: c.w - e.w + r.w
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
    const getRtlScrollBehavior = (t, n) => {
      setStyles(t, {
        [x]: E,
        [H]: E,
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
    const {body: t} = document;
    const n = createDOM(`<div class="${B}"><div></div></div>`);
    const s = n[0];
    const e = s.firstChild;
    const [c, , r] = createEventListenerHub();
    const [l, i] = createCache({
      o: getNativeScrollbarSize(t, s, e),
      u: equalXY
    }, bind(getNativeScrollbarSize, t, s, e, true));
    const [a] = i();
    const u = getNativeScrollbarsHiding(s);
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
    const d = assignDeep({}, P);
    const h = bind(assignDeep, {}, d);
    const p = bind(assignDeep, {}, _);
    const g = {
      P: a,
      T: f,
      L: u,
      G: !!v,
      J: getRtlScrollBehavior(s, e),
      K: bind(c, "r"),
      Z: p,
      tt: t => assignDeep(_, t) && p(),
      nt: h,
      ot: t => assignDeep(d, t) && h(),
      st: assignDeep({}, _),
      et: assignDeep({}, d)
    };
    removeAttrs(s, "style");
    removeElements(s);
    o.addEventListener("resize", (() => {
      let t;
      if (!u && (!f.x || !f.y)) {
        const n = getStaticPluginModuleInstance(Dt);
        const o = n ? n.Y() : noop;
        t = !!o(g, l);
      }
      r("r", [ t ]);
    }));
    return g;
  };
  const getEnvironment = () => {
    if (!Vt) {
      Vt = createEnvironment();
    }
    return Vt;
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
    const {T: e, L: c, Z: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
    const a = o != null ? o : l;
    const u = isUndefined(s) ? i : s;
    const f = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!f || !!_;
  };
  const Lt = new WeakMap;
  const addInstance = (t, n) => {
    Lt.set(t, n);
  };
  const removeInstance = t => {
    Lt.delete(t);
  };
  const getInstance = t => Lt.get(t);
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
    const _ = debounce((() => e && o(true)), {
      v: 33,
      p: 99
    });
    const [d, v] = createEventContentChange(t, _, l);
    const h = c || [];
    const p = r || [];
    const g = concat(h, p);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const f = [];
        const _ = [];
        let d = false;
        let h = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: v, removedNodes: g} = o;
          const b = a === "attributes";
          const w = a === "childList";
          const S = t === c;
          const y = b && e;
          const m = y && getAttr(c, e || "") || null;
          const O = y && u !== m;
          const $ = inArray(p, e) && O;
          if (n && (w || !S)) {
            const n = b && O;
            const a = n && i && is(c, i);
            const _ = a ? !r(c, e, u, m) : !b || n;
            const d = _ && !l(o, !!a, t, s);
            each(v, (t => push(f, t)));
            each(g, (t => push(f, t)));
            h = h || d;
          }
          if (!n && S && O && !r(c, e, u, m)) {
            push(_, e);
            d = d || $;
          }
        }));
        v((t => deduplicateArray(f).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && h && o(false);
          return [ false ];
        }
        if (!isEmptyArray(_) || d) {
          const t = [ deduplicateArray(_), d ];
          !e && o.apply(0, t);
          return t;
        }
      }
    };
    const b = new f(bind(observerCallback, false));
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
        _.m();
        return observerCallback(true, b.takeRecords());
      }
    } ];
  };
  const createSizeObserver = (t, n, o) => {
    const s = 3333333;
    const {_t: e, dt: c} = o || {};
    const r = getStaticPluginModuleInstance(At);
    const {J: l} = getEnvironment();
    const i = bind(getDirectionIsRTL, t);
    const [a] = createCache({
      o: false,
      _: true
    });
    return () => {
      const o = [];
      const u = createDOM(`<div class="${et}"><div class="${rt}"></div></div>`);
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
            x: convertScrollPosition(s, s, n && l),
            y: s
          });
        }
        if (!r) {
          n({
            vt: c ? t : void 0,
            ht: !c,
            dt: i
          });
        }
      };
      if (d) {
        const t = new d((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(_);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (r) {
        const [t, n] = r(_, onSizeChangedCallbackProxy, c);
        push(o, concat([ addClass(f, ct), addEventListener(f, "animationstart", t) ], n));
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
      if (_) {
        o = new _(bind(intersectionObserverCallback, false), {
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
    const {L: u} = getEnvironment();
    const f = `[${F}]`;
    const _ = `[${K}]`;
    const v = [ "tabindex" ];
    const h = [ "wrap", "cols", "rows" ];
    const p = [ "id", "class", "style", "open" ];
    const {gt: g, bt: b, D: w, wt: S, St: y, V: m, yt: O, Ot: $} = t;
    const C = {
      $t: false,
      N: getDirectionIsRTL(g)
    };
    const x = getEnvironment();
    const H = getStaticPluginModuleInstance(Dt);
    const [I] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = H && H.M(t, n, C, x, o).W;
      const e = O(tt);
      const c = !m && O(Z);
      const r = c && getElmentScroll(w);
      $(tt);
      m && $(G, true);
      const l = c && s && s()[0];
      const i = V(S);
      const a = V(w);
      const u = fractionalSize(w);
      $(tt, e);
      m && $(G);
      l && l();
      scrollElementTo(w, r);
      return {
        w: a.w + i.w + u.w,
        h: a.h + i.h + u.h
      };
    }));
    const z = y ? h : concat(p, h);
    const E = debounce(s, {
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
    const setDirectionWhenViewportIsTarget = t => {
      if (m) {
        const n = getDirectionIsRTL(g);
        assignDeep(t, {
          Ct: a !== n
        });
        assignDeep(C, {
          N: n
        });
        a = n;
      }
    };
    const updateViewportAttrsFromHost = t => {
      each(t || v, (t => {
        if (inArray(v, t)) {
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
        xt: e
      };
      assignDeep(C, {
        $t: o
      });
      !n && s(c);
      return c;
    };
    const onSizeChanged = ({ht: t, vt: n, dt: o}) => {
      const e = t && !o && !n;
      const c = !e && u ? E : s;
      const [r, l] = n || [];
      const i = {
        ht: t || o,
        dt: o,
        Ct: l
      };
      setDirectionWhenViewportIsTarget(i);
      n && assignDeep(C, {
        N: r
      });
      c(i);
    };
    const onContentMutation = (t, n) => {
      const [, o] = I();
      const e = {
        Ht: o
      };
      setDirectionWhenViewportIsTarget(e);
      const c = t ? s : E;
      o && !n && c(e);
      return e;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        It: n
      };
      setDirectionWhenViewportIsTarget(s);
      if (n && !o) {
        E(s);
      } else if (!m) {
        updateViewportAttrsFromHost(t);
      }
      return s;
    };
    const {K: A} = x;
    const [T, D] = S ? createTrinsicObserver(b, onTrinsicChanged) : [];
    const k = !m && createSizeObserver(b, onSizeChanged, {
      dt: true,
      _t: true
    });
    const [R, M] = createDOMObserver(b, false, onHostMutation, {
      rt: p,
      ct: concat(p, v)
    });
    const L = m && d && new d((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ht: true,
        dt: domRectAppeared(n, i)
      });
      i = n;
    }));
    return [ () => {
      updateViewportAttrsFromHost();
      L && L.observe(b);
      const t = k && k();
      const n = T && T();
      const o = R();
      const s = A((t => {
        const [, n] = I();
        E({
          zt: t,
          Ht: n
        });
      }));
      return () => {
        L && L.disconnect();
        t && t();
        n && n();
        l && l();
        o();
        s();
      };
    }, ({Et: t, At: n, Tt: o}) => {
      const s = {};
      const [i] = t("update.ignoreMutation");
      const [a, u] = t("update.attributes");
      const [d, v] = t("update.elementEvents");
      const [h, p] = t("update.debounce");
      const g = v || u;
      const b = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (g) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(S || w, true, onContentMutation, {
          ct: concat(z, a || []),
          lt: d,
          it: f,
          ft: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !m ? liesBetween(o, f, _) : false;
            return e || !!closest(o, `.${_t}`) || !!ignoreMutationFromOptions(t);
          }
        });
        l = t();
        r = n;
      }
      if (p) {
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
      if (b) {
        const t = M();
        const n = D && D();
        const o = r && r();
        t && assignDeep(s, onHostMutation(t[0], t[1], b));
        n && assignDeep(s, onTrinsicChanged(n[0], b));
        o && assignDeep(s, onContentMutation(o[0], b));
      }
      setDirectionWhenViewportIsTarget(s);
      return s;
    }, C ];
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const {Z: e, J: c} = getEnvironment();
    const {scrollbars: r} = e();
    const {slot: l} = r;
    const {gt: i, bt: u, D: f, Dt: _, kt: d, Rt: h, V: p} = n;
    const {scrollbars: g} = _ ? {} : t;
    const {slot: b} = g || {};
    const w = new Map;
    const initScrollTimeline = t => v && new v({
      source: d,
      axis: t
    });
    const S = initScrollTimeline("x");
    const y = initScrollTimeline("y");
    const m = dynamicInitializationElement([ i, u, f ], (() => p && h ? i : u), l, b);
    const getScrollbarHandleLengthRatio = (t, n) => {
      if (n) {
        const o = t ? I : z;
        const {Mt: s, Vt: e} = n;
        const c = getBoundingClientRect(e)[o];
        const r = getBoundingClientRect(s)[o];
        return capNumber(0, 1, c / r || 0);
      }
      const s = t ? "x" : "y";
      const {Lt: e, Pt: c} = o;
      const r = c[s];
      const l = e[s];
      return capNumber(0, 1, r / (r + l) || 0);
    };
    const getScrollbarHandleOffsetRatio = (t, n, o, s) => {
      const e = getScrollbarHandleLengthRatio(o, t);
      return 1 / e * (1 - e) * (s ? 1 - n : n) || 0;
    };
    const addDirectionRTLKeyframes = (t, n) => assignDeep(t, n ? {
      clear: [ "left" ]
    } : {});
    const cancelElementAnimations = t => {
      w.forEach(((n, o) => {
        const s = t ? inArray(createOrKeepArray(t), o) : true;
        if (s) {
          each(n || [], (t => {
            t && t.cancel();
          }));
          w.delete(o);
        }
      }));
    };
    const setElementAnimation = (t, n, o, s) => {
      const e = w.get(t) || [];
      const c = e.find((t => t && t.timeline === n));
      if (c) {
        c.effect = new KeyframeEffect(t, o, {
          composite: s
        });
      } else {
        w.set(t, concat(e, [ t.animate(o, {
          timeline: n,
          composite: s
        }) ]));
      }
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
    const scrollbarStructureRefreshHandleLength = (t, n) => {
      scrollbarStyle(t, (t => {
        const {Vt: o} = t;
        return [ o, {
          [n ? I : z]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n) => {
      const {Lt: s} = o;
      const e = n ? s.x : s.y;
      const getTransformValue = (t, o, s) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, getRawScrollRatio(o, e, s), n, s)), n);
      if (S && y) {
        each(t, (t => {
          const {Ut: o, Vt: s} = t;
          const r = n && getDirectionIsRTL(o) && c;
          setElementAnimation(s, n ? S : y, addDirectionRTLKeyframes({
            transform: getRawScrollBounds(e, r).map((n => getTransformValue(t, n, r)))
          }, r));
        }));
      } else {
        const o = getElmentScroll(d);
        scrollbarStyle(t, (t => {
          const {Vt: s, Ut: e} = t;
          return [ s, {
            transform: getTransformValue(t, n ? o.x : o.y, n && getDirectionIsRTL(e) && c)
          } ];
        }));
      }
    };
    const doRefreshScrollbarOffset = t => p && !h && parent(t) === f;
    const O = [];
    const $ = [];
    const C = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass($, t, n);
      c && scrollbarStructureAddRemoveClass(C, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      scrollbarStructureRefreshHandleLength($, true);
      scrollbarStructureRefreshHandleLength(C);
    };
    const refreshScrollbarsHandleOffset = () => {
      scrollbarStructureRefreshHandleOffset($, true);
      scrollbarStructureRefreshHandleOffset(C);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (p) {
        const {Lt: t} = o;
        const n = .5;
        if (S && y) {
          each(concat(C, $), (({Ut: o}) => {
            if (doRefreshScrollbarOffset(o)) {
              const setScrollbarElementAnimation = (t, s, e) => {
                const r = e && getDirectionIsRTL(o) && c;
                setElementAnimation(o, t, addDirectionRTLKeyframes({
                  transform: getRawScrollBounds(s - n, r).map((t => getTrasformTranslateValue(numberToCssPx(t), e)))
                }, r), "add");
              };
              setScrollbarElementAnimation(S, t.x, true);
              setScrollbarElementAnimation(y, t.y);
            } else {
              cancelElementAnimations(o);
            }
          }));
        } else {
          const n = getElmentScroll(d);
          const styleScrollbarPosition = o => {
            const {Ut: s} = o;
            const e = doRefreshScrollbarOffset(s) && s;
            const getTranslateValue = (t, n, o) => {
              const s = getRawScrollRatio(t, n, o);
              const e = n * s;
              return numberToCssPx(o ? -e : e);
            };
            return [ e, {
              transform: e ? getTrasformTranslateValue({
                x: getTranslateValue(n.x, t.x, getDirectionIsRTL(s) && c),
                y: getTranslateValue(n.y, t.y)
              }) : ""
            } ];
          };
          scrollbarStyle($, styleScrollbarPosition);
          scrollbarStyle(C, styleScrollbarPosition);
        }
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? vt : ht;
      const o = t ? $ : C;
      const e = isEmptyArray(o) ? St : "";
      const c = createDiv(`${_t} ${n} ${e}`);
      const r = createDiv(pt);
      const l = createDiv(gt);
      const i = {
        Ut: c,
        Mt: r,
        Vt: l
      };
      push(o, i);
      push(O, [ appendChildren(c, r), appendChildren(r, l), bind(removeElements, c), cancelElementAnimations, s(i, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
      return i;
    };
    const x = bind(generateScrollbarDOM, true);
    const H = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(m, $[0].Ut);
      appendChildren(m, C[0].Ut);
      a((() => {
        scrollbarsAddRemoveClass(St);
      }), 300);
      return bind(runEachAndClear, O);
    };
    x();
    H();
    return [ {
      Bt: refreshScrollbarsHandleLength,
      Nt: refreshScrollbarsHandleOffset,
      jt: refreshScrollbarsScrollbarOffset,
      Ft: scrollbarsAddRemoveClass,
      qt: {
        G: S,
        Wt: $,
        Xt: x,
        Yt: bind(scrollbarStyle, $)
      },
      Gt: {
        G: y,
        Wt: C,
        Xt: H,
        Yt: bind(scrollbarStyle, C)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o) => {
    const {bt: s, kt: e, Jt: r} = n;
    return (n, l, i, a) => {
      const {Ut: u, Mt: f, Vt: _} = n;
      const [d, v] = selfClearTimeout(333);
      const [h, p] = selfClearTimeout();
      const g = bind(i, [ n ], a);
      const b = !!e.scrollBy;
      const w = `client${a ? "X" : "Y"}`;
      const S = a ? I : z;
      const y = a ? "left" : "top";
      const m = a ? "w" : "h";
      const O = a ? "x" : "y";
      const isAffectingTransition = t => t.propertyName.indexOf(S) > -1;
      const createInteractiveScrollEvents = () => {
        const n = "pointerup pointerleave pointercancel lostpointercapture";
        const createRelativeHandleMove = (t, n) => s => {
          const {Lt: c} = o;
          const r = R(f)[m] - R(_)[m];
          const l = n * s / r;
          const i = l * c[O];
          scrollElementTo(e, {
            [O]: t + i
          });
        };
        return addEventListener(f, "pointerdown", (o => {
          const l = closest(o.target, `.${gt}`) === _;
          const i = l ? _ : f;
          const a = t.scrollbars;
          const {button: u, isPrimary: d, pointerType: v} = o;
          const {pointers: h} = a;
          const p = u === 0 && d && a[l ? "dragScroll" : "clickScroll"] && (h || []).includes(v);
          if (p) {
            const t = !l && o.shiftKey;
            const a = bind(getBoundingClientRect, _);
            const u = bind(getBoundingClientRect, f);
            const getHandleOffset = (t, n) => (t || a())[y] - (n || u())[y];
            const d = c(getBoundingClientRect(e)[S]) / R(e)[m] || 1;
            const v = createRelativeHandleMove(getElmentScroll(e)[O] || 0, 1 / d);
            const h = o[w];
            const p = a();
            const g = u();
            const b = p[S];
            const $ = getHandleOffset(p, g) + b / 2;
            const C = h - g[y];
            const x = l ? 0 : C - $;
            const releasePointerCapture = t => {
              runEachAndClear(I);
              i.releasePointerCapture(t.pointerId);
            };
            const H = addAttrClass(s, F, Y);
            const I = [ H, addEventListener(r, n, releasePointerCapture), addEventListener(r, "selectstart", (t => preventDefault(t)), {
              H: false
            }), addEventListener(f, n, releasePointerCapture), addEventListener(f, "pointermove", (n => {
              const o = n[w] - h;
              if (l || t) {
                v(x + o);
              }
            })) ];
            i.setPointerCapture(o.pointerId);
            if (t) {
              v(x);
            } else if (!l) {
              const t = getStaticPluginModuleInstance(Rt);
              t && push(I, t(v, getHandleOffset, x, b, C));
            }
          }
        }));
      };
      let $ = true;
      return bind(runEachAndClear, [ addEventListener(u, "pointerenter", (() => {
        l(yt, true);
      })), addEventListener(u, "pointerleave pointercancel", (() => {
        l(yt, false);
      })), addEventListener(u, "wheel", (t => {
        const {deltaX: n, deltaY: o, deltaMode: c} = t;
        if (b && $ && c === 0 && parent(u) === s) {
          e.scrollBy({
            left: n,
            top: o,
            behavior: "smooth"
          });
        }
        $ = false;
        l(Ct, true);
        d((() => {
          $ = true;
          l(Ct);
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
      })), addEventListener(u, "mousedown", bind(addEventListener, r, "click", stopPropagation, {
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
    const [C, x] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s));
    const {bt: H, Kt: I, Rt: z} = e;
    const {Ft: E, Bt: A, Nt: T, jt: D} = C;
    const manageAutoHideSuspension = t => {
      E(Ot, t, true);
      E(Ot, t, false);
    };
    const manageScrollbarsAutoHide = (t, n) => {
      $();
      if (t) {
        E($t);
      } else {
        const t = bind(E, $t, true);
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
    })), addEventListener(I, "scroll", (t => {
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
    return [ () => bind(runEachAndClear, push(k, x())), ({Et: t, Tt: n, Zt: e, Qt: c}) => {
      const {tn: a, nn: d, sn: v} = c || {};
      const {Ct: h, dt: p} = e || {};
      const {N: g} = o;
      const {T: b} = getEnvironment();
      const {Lt: w, k: S, en: m} = s;
      const [O, $] = t("showNativeOverlaidScrollbars");
      const [C, x] = t("scrollbars.theme");
      const [H, k] = t("scrollbars.visibility");
      const [R, M] = t("scrollbars.autoHide");
      const [V, L] = t("scrollbars.autoHideSuspend");
      const [P] = t("scrollbars.autoHideDelay");
      const [U, B] = t("scrollbars.dragScroll");
      const [N, j] = t("scrollbars.clickScroll");
      const F = p && !n;
      const q = m.x || m.y;
      const W = a || d || h || n;
      const X = v || k;
      const Y = O && b.x && b.y;
      const setScrollbarVisibility = (t, n) => {
        const o = H === "visible" || H === "auto" && t === "scroll";
        E(bt, o, n);
        return o;
      };
      _ = P;
      if (F) {
        if (V && q) {
          manageAutoHideSuspension(false);
          f();
          y((() => {
            f = addEventListener(I, "scroll", bind(manageAutoHideSuspension, true), {
              A: true
            });
          }));
        } else {
          manageAutoHideSuspension(true);
        }
      }
      if ($) {
        E(ft, Y);
      }
      if (x) {
        E(u);
        E(C, true);
        u = C;
      }
      if (L && !V) {
        manageAutoHideSuspension(true);
      }
      if (M) {
        r = R === "move";
        l = R === "leave";
        i = R !== "never";
        manageScrollbarsAutoHide(!i, true);
      }
      if (B) {
        E(Ht, U);
      }
      if (j) {
        E(xt, N);
      }
      if (X) {
        const t = setScrollbarVisibility(S.x, true);
        const n = setScrollbarVisibility(S.y, false);
        const o = t && n;
        E(wt, !o);
      }
      if (W) {
        A();
        T();
        D();
        E(mt, !w.x, true);
        E(mt, !w.y, false);
        E(dt, g && !z);
      }
    }, {}, C ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {Z: o, L: s} = n;
    const {elements: e} = o();
    const {host: c, padding: r, viewport: l, content: i} = e;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: f} = u;
    const {host: _, padding: d, viewport: v, content: h} = f || {};
    const p = a ? t : u.target;
    const g = is(p, "textarea");
    const b = p.ownerDocument;
    const w = b.documentElement;
    const S = p === b.body;
    const y = b.defaultView;
    const getFocusedElement = () => b.activeElement;
    const focusElm = t => {
      if (t && t.focus) {
        t.focus();
      }
    };
    const m = bind(staticInitializationElement, [ p ]);
    const O = bind(dynamicInitializationElement, [ p ]);
    const $ = bind(resolveInitialization, [ p ]);
    const C = bind(createDiv, "");
    const x = bind(m, C, l);
    const H = bind(O, C, i);
    const I = x(v);
    const z = I === p;
    const E = z && S;
    const A = !z && H(h);
    const T = !z && isHTMLElement(I) && I === A;
    const D = T && !!$(i);
    const k = D ? x() : I;
    const R = D ? A : H();
    const M = T ? k : I;
    const V = E ? w : M;
    const L = g ? m(C, c, _) : p;
    const P = E ? V : L;
    const U = T ? R : A;
    const B = {
      gt: p,
      bt: P,
      D: V,
      cn: !z && O(C, r, d),
      wt: U,
      kt: E ? w : V,
      Kt: E ? b : V,
      rn: S ? w : p,
      ln: y,
      Jt: b,
      St: g,
      Rt: S,
      Dt: a,
      V: z,
      an: T,
      yt: t => hasAttrClass(V, z ? F : K, t),
      Ot: (t, n) => addRemoveAttrClass(V, z ? F : K, t, n)
    };
    const N = keys(B).reduce(((t, n) => {
      const o = B[n];
      return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
    }), []);
    const elementIsGenerated = t => t ? inArray(N, t) : null;
    const {gt: X, bt: Y, cn: G, D: Z, wt: tt} = B;
    const ot = [ () => {
      removeAttrs(Y, [ F, j ]);
      removeAttrs(X, j);
      if (S) {
        removeAttrs(w, [ j, F ]);
      }
    } ];
    const et = g && elementIsGenerated(Y);
    let ct = g ? X : contents([ tt, Z, G, Y, X ].find((t => elementIsGenerated(t) === false)));
    const rt = E ? X : tt || Z;
    const lt = bind(runEachAndClear, ot);
    const appendElements = () => {
      const t = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const prepareWrapUnwrapFocus = t => t ? addEventListener(t, "focus blur", (t => {
        stopPropagation(t);
        t.stopImmediatePropagation();
      }), {
        I: true,
        H: false
      }) : noop;
      const n = prepareWrapUnwrapFocus(t);
      setAttrs(Y, F, z ? "viewport" : "host");
      setAttrs(G, nt, "");
      setAttrs(tt, st, "");
      if (!z) {
        setAttrs(Z, K, "");
        S && addAttrClass(w, F, J);
      }
      if (et) {
        insertAfter(X, Y);
        push(ot, (() => {
          insertAfter(Y, X);
          removeElements(Y);
        }));
      }
      appendChildren(rt, ct);
      appendChildren(Y, G);
      appendChildren(G || Y, !z && Z);
      appendChildren(Z, tt);
      push(ot, [ n, () => {
        const t = getFocusedElement();
        const n = prepareWrapUnwrapFocus(t);
        removeAttrs(G, nt);
        removeAttrs(tt, st);
        removeAttrs(Z, [ q, W, K ]);
        elementIsGenerated(tt) && unwrap(tt);
        elementIsGenerated(Z) && unwrap(Z);
        elementIsGenerated(G) && unwrap(G);
        focusElm(t);
        n();
      } ]);
      if (s && !z) {
        addAttrClass(Z, K, Q);
        push(ot, bind(removeAttrs, Z, K));
      }
      if (!z && y.top === y && t === p) {
        const t = "tabindex";
        const n = getAttr(Z, t);
        setAttrs(Z, t, "-1");
        focusElm(Z);
        const revertViewportTabIndex = () => n ? setAttrs(Z, t, n) : removeAttrs(Z, t);
        const o = addEventListener(b, "pointerdown keydown", (() => {
          revertViewportTabIndex();
          o();
        }));
        push(ot, [ revertViewportTabIndex, o ]);
      } else {
        focusElm(t);
      }
      n();
      ct = 0;
      return lt;
    };
    return [ B, appendElements, lt ];
  };
  const createTrinsicUpdateSegment = ({wt: t}) => ({Zt: n, un: o, Tt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [z]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({bt: t, cn: n, D: o, V: s}, e) => {
    const [c, r] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({Et: t, Zt: l, un: i, Tt: a}) => {
      let [u, f] = r(a);
      const {L: _} = getEnvironment();
      const {ht: d, Ht: v, Ct: h} = l || {};
      const {N: p} = i;
      const [g, b] = t("paddingAbsolute");
      const x = a || v;
      if (d || f || x) {
        [u, f] = c(a);
      }
      const H = !s && (b || h || f);
      if (H) {
        const t = !g || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [$]: t && !p ? -s : 0,
          [C]: t ? -c : 0,
          [O]: t && p ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? p ? -u.r : "auto" : 0,
          left: t ? p ? "auto" : -u.l : 0,
          [I]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [w]: t ? u.t : 0,
          [S]: t ? u.r : 0,
          [m]: t ? u.b : 0,
          [y]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          cn: u,
          fn: !t,
          j: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        _n: H
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {bt: c, cn: r, D: l, V: i, Ot: a, Rt: u, ln: f} = t;
    const {L: _, T: d} = e;
    const v = u && i;
    const h = bind(s, 0);
    const p = {
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const g = {
      u: equalXY,
      o: {
        x: E,
        y: E
      }
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
    const [b, w] = createCache(p, bind(fractionalSize, l));
    const [S, y] = createCache(p, bind(V, l));
    const [m, O] = createCache(p);
    const [$, C] = createCache(p);
    const [I] = createCache(g);
    const A = getStaticPluginModuleInstance(Dt);
    return ({Et: o, Zt: u, un: p, Tt: g}, {_n: E}) => {
      const {ht: T, It: D, Ht: k, xt: R, Ct: V, zt: L} = u || {};
      const {$t: P} = p;
      const U = A && A.M(t, n, p, e, o);
      const {q: B, W: N, X: j, F: Y} = U || {};
      const fixFlexboxGlue = (t, o) => {
        setStyles(l, {
          [z]: ""
        });
        if (o) {
          const {fn: o, cn: s} = n;
          const {R: e} = t;
          const r = fractionalSize(c);
          const i = M(c);
          const a = getStyles(l, "boxSizing") === "content-box";
          const u = o || a ? s.b + s.t : 0;
          const f = !(d.x && a);
          setStyles(l, {
            [z]: i.h + r.h + (e.x && f && Y ? Y(t).U.x : 0) - u
          });
        }
      };
      const [G, J] = getShowNativeOverlaidScrollbars(o, e);
      const [Z, st] = o("overflow");
      const et = !i && (T || k || D || J || R);
      const ct = T || E || k || V || L || J;
      const rt = overflowIsVisible(Z.x);
      const lt = overflowIsVisible(Z.y);
      const it = rt || lt;
      let at = w(g);
      let ut = y(g);
      let ft = O(g);
      let _t = C(g);
      let dt;
      if (J && _) {
        a(Q, !G);
      }
      if (et) {
        dt = getViewportOverflowState(t);
        fixFlexboxGlue(dt, P);
      }
      if (ct) {
        if (it) {
          a(tt, false);
        }
        const [t, n] = N ? N(dt) : [];
        const [o, e] = at = b(g);
        const [c, r] = ut = S(g);
        const i = M(l);
        const u = c;
        const _ = i;
        t && t();
        if ((r || e || J) && n && !G && B && B(n, c, o)) {}
        const d = windowSize(f);
        const p = {
          w: h(s(c.w, u.w) + o.w),
          h: h(s(c.h, u.h) + o.h)
        };
        const w = {
          w: h((v ? d.w : _.w + h(i.w - c.w)) + o.w),
          h: h((v ? d.h : _.h + h(i.h - c.h)) + o.h)
        };
        _t = $(w);
        ft = m(getOverflowAmount(p, w), g);
      }
      const [vt, ht] = _t;
      const [pt, gt] = ft;
      const [bt, wt] = ut;
      const [St, yt] = at;
      const mt = {
        x: pt.w > 0,
        y: pt.h > 0
      };
      const Ot = rt && lt && (mt.x || mt.y) || rt && mt.x && !mt.y || lt && mt.y && !mt.x;
      const $t = E || V || L || yt || wt || ht || gt || st || J || et || ct;
      if ($t) {
        const n = {};
        const o = setViewportOverflowState(t, mt, Z, n);
        j && j(o, p, !!B && B(o, bt, St), n);
        if (et) {
          fixFlexboxGlue(o, P);
        }
        if (i) {
          setAttrs(c, q, n[x]);
          setAttrs(c, W, n[H]);
        } else {
          setStyles(l, n);
        }
      }
      addRemoveAttrClass(c, F, X, Ot);
      addRemoveAttrClass(r, nt, ot, Ot);
      if (!i) {
        addRemoveAttrClass(l, K, tt, it);
      }
      const [Ct, xt] = I(getViewportOverflowState(t).k);
      assignDeep(n, {
        k: Ct,
        Pt: {
          x: vt.w,
          y: vt.h
        },
        Lt: {
          x: pt.w,
          y: pt.h
        },
        en: mt
      });
      return {
        sn: xt,
        tn: ht,
        nn: gt
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
      fn: false,
      j: {
        [$]: 0,
        [C]: 0,
        [O]: 0,
        [w]: 0,
        [S]: 0,
        [m]: 0,
        [y]: 0
      },
      Pt: {
        x: 0,
        y: 0
      },
      Lt: {
        x: 0,
        y: 0
      },
      k: {
        x: E,
        y: E
      },
      en: {
        x: false,
        y: false
      }
    };
    const {gt: c, D: r, V: l} = n;
    const {L: i, T: a} = getEnvironment();
    const u = !i && (a.x || a.y);
    const f = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = u;
      const s = o && getElmentScroll(r);
      const e = l ? addAttrClass(r, F, G) : noop;
      each(f, (o => {
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
      const {dn: e, Tt: c, At: l, vn: i} = t;
      const a = e || {};
      const u = !!c;
      const d = {
        Et: createOptionCheck(n, a, u),
        dn: a,
        Tt: u
      };
      if (i) {
        v(d);
        return false;
      }
      const h = s || f(assignDeep({}, d, {
        At: l
      }));
      const p = r(assignDeep({}, d, {
        un: _,
        Zt: h
      }));
      v(assignDeep({}, d, {
        Zt: h,
        Qt: p
      }));
      const g = updateHintsAreTruthy(h);
      const b = updateHintsAreTruthy(p);
      const w = g || b || !isEmptyObject(a) || u;
      w && o(t, {
        Zt: h,
        Qt: p
      });
      return w;
    };
    return [ () => {
      const {rn: t, D: n} = i;
      const o = getElmentScroll(t);
      const s = [ u(), c(), d() ];
      scrollElementTo(n, o);
      return bind(runEachAndClear, s);
    }, update, () => ({
      hn: _,
      pn: l
    }), {
      gn: i,
      bn: h
    }, a ];
  };
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
        const n = removeUndefinedProperties(t, true);
        const o = getStaticPluginModuleInstance(Et);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, f, _] = createEventListenerHub();
      const [d, v, h] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        h(t, n);
        _(t, n);
      };
      const [p, g, b, w, S] = createSetups(t, a, (({dn: t, Tt: n}, {Zt: o, Qt: s}) => {
        const {ht: e, Ct: c, xt: r, Ht: l, It: i, dt: a} = o;
        const {tn: u, nn: f, sn: _} = s;
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
                dn: e
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
          const {hn: t, pn: n} = b();
          const {N: o} = t;
          const {Pt: s, Lt: e, k: c, en: l, cn: i, fn: a} = n;
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
          const {gt: t, bt: n, cn: o, D: s, wt: e, kt: c, Kt: r} = w.gn;
          const {qt: l, Gt: i} = w.bn;
          const translateScrollbarStructure = t => {
            const {Vt: n, Mt: o, Ut: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Wt: n, Xt: o} = t;
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
          Tt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ S ]);
      addInstance(c, y);
      registerPluginModuleInstances(It, OverlayScrollbars, [ y, u, i ]);
      if (cancelInitialization(w.gn.Rt, !e && t.cancel)) {
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
    const {P: t, T: n, L: o, J: s, G: e, st: c, et: r, Z: l, tt: i, nt: a, ot: u} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      rtlScrollBehavior: s,
      scrollTimeline: e,
      staticDefaultInitialization: c,
      staticDefaultOptions: r,
      getDefaultInitialization: l,
      setDefaultInitialization: i,
      getDefaultOptions: a,
      setDefaultOptions: u
    });
  };
  t.ClickScrollPlugin = Mt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = kt;
  t.SizeObserverPlugin = Tt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
