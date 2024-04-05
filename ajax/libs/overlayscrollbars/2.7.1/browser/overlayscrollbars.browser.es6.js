/*!
 * OverlayScrollbars
 * Version: 2.7.1
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
  const n = typeof window !== "undefined" && typeof document !== "undefined";
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
  const d = getApi("MutationObserver");
  const f = getApi("IntersectionObserver");
  const _ = getApi("ResizeObserver");
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
      const d = l - a;
      const f = d >= u;
      const _ = o ? 1 : 1 - (s(0, a + u - l) / u || 0);
      const v = (n - t) * (isFunction(c) ? c(_, _ * u, 0, 1, u) : _) + t;
      const h = f || _ === 1;
      e && e(v, _, h);
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
  const y = "paddingRight";
  const S = "paddingLeft";
  const m = "paddingBottom";
  const O = "marginLeft";
  const $ = "marginRight";
  const C = "marginBottom";
  const x = "overflowX";
  const H = "overflowY";
  const z = "width";
  const I = "height";
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
    const {v: r, p: d, S: f} = n || {};
    const _ = function invokeFunctionToDebounce(n) {
      c();
      u(o);
      o = s = void 0;
      c = noop;
      t.apply(this, n);
    };
    const mergeParms = t => f && s ? f(s, t) : t;
    const flush = () => {
      if (c !== noop) {
        _(mergeParms(e) || e);
      }
    };
    const v = function debouncedFn() {
      const t = from(arguments);
      const n = isFunction(r) ? r() : r;
      const f = isNumber(n) && n >= 0;
      if (f) {
        const r = isFunction(d) ? d() : d;
        const f = isNumber(r) && r >= 0;
        const v = n > 0 ? a : i;
        const h = n > 0 ? u : l;
        const p = mergeParms(t);
        const g = p || t;
        const b = _.bind(0, g);
        c();
        const w = v(b, n);
        c = () => h(w);
        if (f && !o) {
          o = a(flush, r);
        }
        s = e = g;
      } else {
        _(t);
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
  const hasAttr = (t, n) => t && t.hasAttribute(n);
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
  const T = /^--/;
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
        if (T.test(o)) {
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
  const D = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : D;
  const windowSize = t => getElmWidthHeightProperty("inner", t || o);
  const k = bind(getElmWidthHeightProperty, "offset");
  const R = bind(getElmWidthHeightProperty, "client");
  const M = bind(getElmWidthHeightProperty, "scroll");
  const fractionalSize = t => {
    const n = parseFloat(getStyles(t, z)) || 0;
    const o = parseFloat(getStyles(t, I)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const domRectHasDimensions = t => !!(t && (t[I] || t[z]));
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
  const V = {
    x: 0,
    y: 0
  };
  const absoluteCoordinates = t => {
    const n = t && getBoundingClientRect(t);
    return n ? {
      x: n.left + o.scrollX,
      y: n.top + o.scrollY
    } : V;
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
  const B = `${U}-scrollbar-hidden`;
  const N = `${P}-initialize`;
  const j = P;
  const F = `${j}-overflow-x`;
  const q = `${j}-overflow-y`;
  const W = "overflowVisible";
  const X = "scrollbarPressed";
  const Y = "updating";
  const G = "body";
  const J = `${P}-viewport`;
  const K = "arrange";
  const Z = "scrollbarHidden";
  const Q = W;
  const tt = `${P}-padding`;
  const nt = Q;
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
  const ft = `${dt}-rtl`;
  const _t = `${dt}-horizontal`;
  const vt = `${dt}-vertical`;
  const ht = `${dt}-track`;
  const pt = `${dt}-handle`;
  const gt = `${dt}-visible`;
  const bt = `${dt}-cornerless`;
  const wt = `${dt}-interaction`;
  const yt = `${dt}-unusable`;
  const St = `${dt}-auto-hide`;
  const mt = `${St}-hidden`;
  const Ot = `${dt}-wheel`;
  const $t = `${ht}-interactive`;
  const Ct = `${pt}-interactive`;
  const xt = {};
  const Ht = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      xt[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, l, i] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, l, n) : a(n);
      return (i || Ht)[s] = t;
    }
  }));
  const getStaticPluginModuleInstance = t => Ht[t];
  const zt = "__osOptionsValidationPlugin";
  const It = "__osSizeObserverPlugin";
  const Et = /* @__PURE__ */ (() => ({
    [It]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${lt}" dir="ltr"><div class="${lt}"><div class="${it}"></div></div><div class="${lt}"><div class="${it}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const a = r.lastChild;
        const u = r.firstChild;
        const d = u == null ? void 0 : u.firstChild;
        let f = k(r);
        let _ = f;
        let v = false;
        let h;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(a, s);
        };
        const onResized = t => {
          h = 0;
          if (v) {
            f = _;
            n(t === true);
          }
        };
        const onScroll = t => {
          _ = k(r);
          v = !t || !equalWH(_, f);
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
        addClass(t, rt);
        setStyles(d, {
          [z]: s,
          [I]: s
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
  const At = "__osScrollbarsHidingPlugin";
  const Tt = /* @__PURE__ */ (() => ({
    [At]: {
      static: () => ({
        M: (t, n, o, s, e) => {
          const {V: c, D: r} = t;
          const {L: l, T: i, P: a} = s;
          const u = !c && !l && (i.x || i.y);
          const [d] = getShowNativeOverlaidScrollbars(e, s);
          const _getViewportOverflowHideOffset = t => {
            const {R: n} = t;
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
              const {j: d} = n;
              const f = o ? O : $;
              const _ = o ? S : y;
              const v = d[f];
              const h = d[C];
              const p = d[_];
              const g = d[m];
              e[z] = `calc(100% + ${u + v * -1}px)`;
              e[f] = -u + v;
              e[C] = -a + h;
              if (s) {
                e[_] = p + (i ? u : 0);
                e[m] = g + (l ? a : 0);
              }
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {j: c} = n;
              const {U: l, B: i} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = i;
              const {x: d, y: f} = l;
              const {N: _} = o;
              const v = _ ? y : S;
              const h = c[v];
              const p = c.paddingTop;
              const g = s.w + e.w;
              const b = s.h + e.h;
              const w = {
                w: f && u ? `${f + g - h}px` : "",
                h: d && a ? `${d + b - p}px` : ""
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
              const d = {};
              const assignProps = t => each(t, (t => {
                d[t] = c[t];
              }));
              if (i) {
                assignProps([ C, w, m ]);
              }
              if (a) {
                assignProps([ O, $, S, y ]);
              }
              const f = getStyles(r, keys(d));
              removeAttrClass(r, J, K);
              setStyles(r, d);
              return [ () => {
                _hideNativeScrollbars(e, o, u, f);
                setStyles(r, f);
                addAttrClass(r, J, K);
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
            const d = i.w > 2 && i.h > 2;
            const f = !diffBiggerThanOne(a.w, a.h);
            const _ = u !== n && u > 0;
            const v = d && f && _;
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
  const Dt = "__osClickScrollPlugin";
  const kt = /* @__PURE__ */ (() => ({
    [Dt]: {
      static: () => (t, n, o, s, e) => {
        let c = 0;
        let r = noop;
        const animateClickScroll = l => {
          r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
            t(o);
            const u = n();
            const d = u + s;
            const f = e >= u && e <= d;
            if (i && !f) {
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
  let Rt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o, s) => {
      appendChildren(t, n);
      const e = R(n);
      const c = k(n);
      const r = fractionalSize(o);
      s && removeElements(n);
      return {
        x: c.h - e.h + r.h,
        y: c.w - e.w + r.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, B);
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
    const n = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${B}{scrollbar-width:none!important}.${B}::-webkit-scrollbar,.${B}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
    const s = createDOM(`<div class="${U}"><div></div><style>${n}</style></div>`);
    const e = s[0];
    const c = e.firstChild;
    const [r, , l] = createEventListenerHub();
    const [i, a] = createCache({
      o: getNativeScrollbarSize(t, e, c),
      u: equalXY
    }, bind(getNativeScrollbarSize, t, e, c, true));
    const [u] = a();
    const d = getNativeScrollbarsHiding(e);
    const f = {
      x: u.x === 0,
      y: u.y === 0
    };
    const _ = {
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
    const h = assignDeep({}, L);
    const p = bind(assignDeep, {}, h);
    const g = bind(assignDeep, {}, _);
    const b = {
      P: u,
      T: f,
      L: d,
      G: !!v,
      J: getRtlScrollBehavior(e, c),
      K: bind(r, "r"),
      Z: g,
      tt: t => assignDeep(_, t) && g(),
      nt: p,
      ot: t => assignDeep(h, t) && p(),
      st: assignDeep({}, _),
      et: assignDeep({}, h)
    };
    removeAttrs(e, "style");
    removeElements(e);
    o.addEventListener("resize", (() => {
      let t;
      if (!d && (!f.x || !f.y)) {
        const n = getStaticPluginModuleInstance(At);
        const o = n ? n.Y() : noop;
        t = !!o(b, i);
      }
      l("r", [ t ]);
    }));
    return b;
  };
  const getEnvironment = () => {
    if (!Rt) {
      Rt = createEnvironment();
    }
    return Rt;
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
    const d = (e.x || e.y) && a;
    const f = t && (isNull(u) ? !c : u);
    return !!d || !!f;
  };
  const Mt = new WeakMap;
  const addInstance = (t, n) => {
    Mt.set(t, n);
  };
  const removeInstance = t => {
    Mt.delete(t);
  };
  const getInstance = t => Mt.get(t);
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
    const {ct: c, rt: r, lt: l, it: i, ut: a, dt: u} = s || {};
    const f = debounce((() => e && o(true)), {
      v: 33,
      p: 99
    });
    const [_, v] = createEventContentChange(t, f, l);
    const h = c || [];
    const p = r || [];
    const g = concat(h, p);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const l = u || noop;
        const d = [];
        const f = [];
        let _ = false;
        let h = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: v, removedNodes: g} = o;
          const b = a === "attributes";
          const w = a === "childList";
          const y = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "") || null;
          const O = S && u !== m;
          const $ = inArray(p, e) && O;
          if (n && (w || !y)) {
            const n = b && O;
            const a = n && i && is(c, i);
            const f = a ? !r(c, e, u, m) : !b || n;
            const _ = f && !l(o, !!a, t, s);
            each(v, (t => push(d, t)));
            each(g, (t => push(d, t)));
            h = h || _;
          }
          if (!n && y && O && !r(c, e, u, m)) {
            push(f, e);
            _ = _ || $;
          }
        }));
        v((t => deduplicateArray(d).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          !e && h && o(false);
          return [ false ];
        }
        if (!isEmptyArray(f) || _) {
          const t = [ deduplicateArray(f), _ ];
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
        attributeFilter: g,
        subtree: n,
        childList: n,
        characterData: n
      });
      e = true;
      return () => {
        if (e) {
          _();
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
  const createSizeObserver = (t, n, o) => {
    const s = 3333333;
    const {ft: e, _t: c} = o || {};
    const r = getStaticPluginModuleInstance(It);
    const {J: l} = getEnvironment();
    const i = bind(getDirectionIsRTL, t);
    const [a] = createCache({
      o: false,
      _: true
    });
    return () => {
      const o = [];
      const u = createDOM(`<div class="${st}"><div class="${ct}"></div></div>`);
      const d = u[0];
      const f = d.firstChild;
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
          const n = c ? t[0] : getDirectionIsRTL(d);
          scrollElementTo(d, {
            x: convertScrollPosition(s, s, n && l),
            y: s
          });
        }
        if (!r) {
          n({
            vt: c ? t : void 0,
            ht: !c,
            _t: i
          });
        }
      };
      if (_) {
        const t = new _((t => onSizeChangedCallbackProxy(t.pop())));
        t.observe(f);
        push(o, (() => {
          t.disconnect();
        }));
      } else if (r) {
        const [t, n] = r(f, onSizeChangedCallbackProxy, c);
        push(o, concat([ addClass(d, et), addEventListener(d, "animationstart", t) ], n));
      } else {
        return noop;
      }
      if (e) {
        const [t] = createCache({
          o: void 0
        }, i);
        push(o, addEventListener(d, "scroll", (n => {
          const o = t();
          const [s, e, c] = o;
          if (e) {
            removeClass(f, "ltr rtl");
            addClass(f, s ? "rtl" : "ltr");
            onSizeChangedCallbackProxy([ !!s, e, c ]);
          }
          stopPropagation(n);
        })));
      }
      return bind(runEachAndClear, push(o, appendChildren(t, d)));
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
          const t = k(s);
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
    const d = `[${j}]`;
    const f = `[${J}]`;
    const v = [ "tabindex" ];
    const h = [ "wrap", "cols", "rows" ];
    const p = [ "id", "class", "style", "open" ];
    const {gt: g, bt: b, D: w, wt: y, yt: S, V: m, St: O, Ot: $} = t;
    const C = {
      $t: false,
      N: getDirectionIsRTL(g)
    };
    const x = getEnvironment();
    const H = getStaticPluginModuleInstance(At);
    const [z] = createCache({
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = H && H.M(t, n, C, x, o).W;
      const e = O(Q);
      const c = !m && O(K);
      const r = c && getElmentScroll(w);
      $(Q);
      m && $(Y, true);
      const l = c && s && s()[0];
      const i = M(y);
      const a = M(w);
      const u = fractionalSize(w);
      $(Q, e);
      m && $(Y);
      l && l();
      scrollElementTo(w, r);
      return {
        w: a.w + i.w + u.w,
        h: a.h + i.h + u.h
      };
    }));
    const I = S ? h : concat(p, h);
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
    const onSizeChanged = ({ht: t, vt: n, _t: o}) => {
      const e = t && !o && !n;
      const c = !e && u ? E : s;
      const [r, l] = n || [];
      const i = {
        ht: t || o,
        _t: o,
        Ct: l
      };
      setDirectionWhenViewportIsTarget(i);
      n && assignDeep(C, {
        N: r
      });
      c(i);
    };
    const onContentMutation = (t, n) => {
      const [, o] = z();
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
        zt: n
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
    const [T, D] = y ? createTrinsicObserver(b, onTrinsicChanged) : [];
    const k = !m && createSizeObserver(b, onSizeChanged, {
      _t: true,
      ft: true
    });
    const [R, V] = createDOMObserver(b, false, onHostMutation, {
      rt: p,
      ct: concat(p, v)
    });
    const L = m && _ && new _((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        ht: true,
        _t: domRectAppeared(n, i)
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
        const [, n] = z();
        E({
          It: t,
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
      const [_, v] = t("update.elementEvents");
      const [h, p] = t("update.debounce");
      const g = v || u;
      const b = n || o;
      const ignoreMutationFromOptions = t => isFunction(i) && i(t);
      if (g) {
        r && r();
        l && l();
        const [t, n] = createDOMObserver(y || w, true, onContentMutation, {
          ct: concat(I, a || []),
          lt: _,
          it: d,
          dt: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !m ? liesBetween(o, d, f) : false;
            return e || !!closest(o, `.${dt}`) || !!ignoreMutationFromOptions(t);
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
        const t = V();
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
    const {gt: i, bt: a, D: u, Dt: d, kt: f, Rt: _, V: h} = n;
    const {scrollbars: p} = d ? {} : t;
    const {slot: g} = p || {};
    const b = new Map;
    const initScrollTimeline = t => v && new v({
      source: f,
      axis: t
    });
    const w = initScrollTimeline("x");
    const y = initScrollTimeline("y");
    const S = dynamicInitializationElement([ i, a, u ], (() => h && _ ? i : a), l, g);
    const getScrollbarHandleLengthRatio = (t, n) => {
      if (n) {
        const o = t ? z : I;
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
          [n ? z : I]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
        } ];
      }));
    };
    const scrollbarStructureRefreshHandleOffset = (t, n) => {
      const {Lt: s} = o;
      const e = n ? s.x : s.y;
      const getTransformValue = (t, o, s) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, getRawScrollRatio(o, e, s), n, s)), n);
      if (w && y) {
        each(t, (t => {
          const {Ut: o, Vt: s} = t;
          const r = n && getDirectionIsRTL(o) && c;
          setElementAnimation(s, n ? w : y, addDirectionRTLKeyframes({
            transform: getRawScrollBounds(e, r).map((n => getTransformValue(t, n, r)))
          }, r));
        }));
      } else {
        const o = getElmentScroll(f);
        scrollbarStyle(t, (t => {
          const {Vt: s, Ut: e} = t;
          return [ s, {
            transform: getTransformValue(t, n ? o.x : o.y, n && getDirectionIsRTL(e) && c)
          } ];
        }));
      }
    };
    const doRefreshScrollbarOffset = t => h && !_ && parent(t) === u;
    const m = [];
    const O = [];
    const $ = [];
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      e && scrollbarStructureAddRemoveClass(O, t, n);
      c && scrollbarStructureAddRemoveClass($, t, n);
    };
    const refreshScrollbarsHandleLength = () => {
      scrollbarStructureRefreshHandleLength(O, true);
      scrollbarStructureRefreshHandleLength($);
    };
    const refreshScrollbarsHandleOffset = () => {
      scrollbarStructureRefreshHandleOffset(O, true);
      scrollbarStructureRefreshHandleOffset($);
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (h) {
        const {Lt: t} = o;
        const n = .5;
        if (w && y) {
          each(concat($, O), (({Ut: o}) => {
            if (doRefreshScrollbarOffset(o)) {
              const setScrollbarElementAnimation = (t, s, e) => {
                const r = e && getDirectionIsRTL(o) && c;
                setElementAnimation(o, t, addDirectionRTLKeyframes({
                  transform: getRawScrollBounds(s - n, r).map((t => getTrasformTranslateValue(numberToCssPx(t), e)))
                }, r), "add");
              };
              setScrollbarElementAnimation(w, t.x, true);
              setScrollbarElementAnimation(y, t.y);
            } else {
              cancelElementAnimations(o);
            }
          }));
        } else {
          const n = getElmentScroll(f);
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
          scrollbarStyle(O, styleScrollbarPosition);
          scrollbarStyle($, styleScrollbarPosition);
        }
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? _t : vt;
      const o = createDiv(`${dt} ${n}`);
      const e = createDiv(ht);
      const c = createDiv(pt);
      const r = {
        Ut: o,
        Mt: e,
        Vt: c
      };
      push(t ? O : $, r);
      push(m, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
      return r;
    };
    const C = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(S, O[0].Ut);
      appendChildren(S, $[0].Ut);
      return bind(runEachAndClear, m);
    };
    C();
    x();
    return [ {
      Bt: refreshScrollbarsHandleLength,
      Nt: refreshScrollbarsHandleOffset,
      jt: refreshScrollbarsScrollbarOffset,
      Ft: scrollbarsAddRemoveClass,
      qt: {
        G: w,
        Wt: O,
        Xt: C,
        Yt: bind(scrollbarStyle, O)
      },
      Gt: {
        G: y,
        Wt: $,
        Xt: x,
        Yt: bind(scrollbarStyle, $)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s) => {
    const {bt: e, D: r, V: l, kt: i, Jt: u} = n;
    return (n, d, f, _) => {
      const {Ut: v, Mt: h, Vt: p} = n;
      const [g, b] = selfClearTimeout(333);
      const [w, y] = selfClearTimeout();
      const S = bind(f, [ n ], _);
      const m = !!i.scrollBy;
      const O = `client${_ ? "X" : "Y"}`;
      const $ = _ ? z : I;
      const C = _ ? "left" : "top";
      const x = _ ? "w" : "h";
      const H = _ ? "x" : "y";
      const isAffectingTransition = t => t.propertyName.indexOf($) > -1;
      const createInteractiveScrollEvents = () => {
        const n = "pointerup pointerleave pointercancel lostpointercapture";
        const createRelativeHandleMove = (t, n) => s => {
          const {Lt: e} = o;
          const c = k(h)[x] - k(p)[x];
          const r = n * s / c;
          const l = r * e[H];
          scrollElementTo(i, {
            [H]: t + l
          });
        };
        return addEventListener(h, "pointerdown", (o => {
          const s = closest(o.target, `.${pt}`) === p;
          const r = s ? p : h;
          const l = t.scrollbars;
          const {button: a, isPrimary: d, pointerType: f} = o;
          const {pointers: _} = l;
          const v = a === 0 && d && l[s ? "dragScroll" : "clickScroll"] && (_ || []).includes(f);
          if (v) {
            const t = !s && o.shiftKey;
            const l = bind(getBoundingClientRect, p);
            const a = bind(getBoundingClientRect, h);
            const getHandleOffset = (t, n) => (t || l())[C] - (n || a())[C];
            const d = c(getBoundingClientRect(i)[$]) / k(i)[x] || 1;
            const f = createRelativeHandleMove(getElmentScroll(i)[H] || 0, 1 / d);
            const _ = o[O];
            const v = l();
            const g = a();
            const b = v[$];
            const w = getHandleOffset(v, g) + b / 2;
            const y = _ - g[C];
            const S = s ? 0 : y - w;
            const releasePointerCapture = t => {
              runEachAndClear(z);
              r.releasePointerCapture(t.pointerId);
            };
            const m = addAttrClass(e, j, X);
            const z = [ m, addEventListener(u, n, releasePointerCapture), addEventListener(u, "selectstart", (t => preventDefault(t)), {
              H: false
            }), addEventListener(h, n, releasePointerCapture), addEventListener(h, "pointermove", (n => {
              const o = n[O] - _;
              if (s || t) {
                f(S + o);
              }
            })) ];
            r.setPointerCapture(o.pointerId);
            if (t) {
              f(S);
            } else if (!s) {
              const t = getStaticPluginModuleInstance(Dt);
              t && push(z, t(f, getHandleOffset, S, b, y));
            }
          }
        }));
      };
      let E = true;
      return bind(runEachAndClear, [ addEventListener(p, "pointermove pointerleave", s), addEventListener(v, "pointerenter", (() => {
        d(wt, true);
      })), addEventListener(v, "pointerleave pointercancel", (() => {
        d(wt, false);
      })), !l && addEventListener(v, "mousedown", (() => {
        const t = getFocusedElement();
        if (hasAttr(t, J) || hasAttr(t, j) || t === document.body) {
          a((() => {
            r.focus();
          }), 25);
        }
      })), addEventListener(v, "wheel", (t => {
        const {deltaX: n, deltaY: o, deltaMode: s} = t;
        if (m && E && s === 0 && parent(v) === e) {
          i.scrollBy({
            left: n,
            top: o,
            behavior: "smooth"
          });
        }
        E = false;
        d(Ot, true);
        g((() => {
          E = true;
          d(Ot);
        }));
        preventDefault(t);
      }), {
        H: false,
        I: true
      }), addEventListener(p, "transitionstart", (t => {
        if (isAffectingTransition(t)) {
          const animateHandleOffset = () => {
            S();
            w(animateHandleOffset);
          };
          animateHandleOffset();
        }
      })), addEventListener(p, "transitionend transitioncancel", (t => {
        if (isAffectingTransition(t)) {
          y();
          S();
        }
      })), addEventListener(v, "mousedown", bind(addEventListener, u, "click", stopPropagation, {
        A: true,
        I: true
      }), {
        I: true
      }), createInteractiveScrollEvents(), b, y ]);
    };
  };
  const createScrollbarsSetup = (t, n, o, s, e, c) => {
    let r;
    let l;
    let i;
    let a;
    let u;
    let d = noop;
    let f = 0;
    const isHoverablePointerType = t => t.pointerType === "mouse";
    const [_, v] = selfClearTimeout();
    const [h, p] = selfClearTimeout(100);
    const [g, b] = selfClearTimeout(100);
    const [w, y] = selfClearTimeout((() => f));
    const [S, m] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {bt: O, Kt: $, Rt: C} = e;
    const {Ft: x, Bt: H, Nt: z, jt: I} = S;
    const manageScrollbarsAutoHide = (t, n) => {
      y();
      if (t) {
        x(mt);
      } else {
        const t = bind(x, mt, true);
        if (f > 0 && !n) {
          w(t);
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
      x(St, t, true);
      x(St, t, false);
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        r = i;
        i && manageScrollbarsAutoHide(true);
      }
    };
    const E = [ y, p, b, v, () => d(), addEventListener(O, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener(O, "pointerenter", onHostMouseEnter), addEventListener(O, "pointerleave", (t => {
      if (isHoverablePointerType(t)) {
        r = false;
        i && manageScrollbarsAutoHide(false);
      }
    })), addEventListener(O, "pointermove", (t => {
      isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
    })), addEventListener($, "scroll", (t => {
      _((() => {
        z();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      c(t);
      I();
    })) ];
    return [ () => bind(runEachAndClear, push(E, m())), ({Et: t, Tt: n, Zt: e, Qt: c}) => {
      const {tn: r, nn: _, sn: v} = c || {};
      const {Ct: h, _t: p} = e || {};
      const {N: b} = o;
      const {T: w} = getEnvironment();
      const {k: y, en: S} = s;
      const [m, O] = t("showNativeOverlaidScrollbars");
      const [E, A] = t("scrollbars.theme");
      const [T, D] = t("scrollbars.visibility");
      const [k, R] = t("scrollbars.autoHide");
      const [M, V] = t("scrollbars.autoHideSuspend");
      const [L] = t("scrollbars.autoHideDelay");
      const [P, U] = t("scrollbars.dragScroll");
      const [B, N] = t("scrollbars.clickScroll");
      const [j, F] = t("overflow");
      const q = p && !n;
      const W = S.x || S.y;
      const X = r || _ || h || n;
      const Y = v || D || F;
      const G = m && w.x && w.y;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes("scroll") && (T === "visible" || T === "auto" && n === "scroll");
        x(gt, s, o);
        return s;
      };
      f = L;
      if (q) {
        if (M && W) {
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
      if (O) {
        x(ut, G);
      }
      if (A) {
        x(u);
        x(E, true);
        u = E;
      }
      if (V && !M) {
        manageAutoHideSuspension(true);
      }
      if (R) {
        l = k === "move";
        i = k === "leave";
        a = k === "never";
        manageScrollbarsAutoHide(a, true);
      }
      if (U) {
        x(Ct, P);
      }
      if (N) {
        x($t, B);
      }
      if (Y) {
        const t = setScrollbarVisibility(j.x, y.x, true);
        const n = setScrollbarVisibility(j.y, y.y, false);
        const o = t && n;
        x(bt, !o);
      }
      if (X) {
        H();
        z();
        I();
        x(yt, !S.x, true);
        x(yt, !S.y, false);
        x(ft, b && !C);
      }
    }, {}, S ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {Z: o, L: s} = n;
    const {elements: e} = o();
    const {host: c, padding: r, viewport: l, content: i} = e;
    const a = isHTMLElement(t);
    const u = a ? {} : t;
    const {elements: d} = u;
    const {host: f, padding: _, viewport: v, content: h} = d || {};
    const p = a ? t : u.target;
    const g = isBodyElement(p);
    const b = is(p, "textarea");
    const w = p.ownerDocument;
    const y = w.documentElement;
    const S = w.defaultView;
    const focusElm = t => {
      if (t && t.focus) {
        t.focus();
      }
    };
    const m = bind(staticInitializationElement, [ p ]);
    const O = bind(dynamicInitializationElement, [ p ]);
    const $ = bind(createDiv, "");
    const C = bind(m, $, l);
    const x = bind(O, $, i);
    const H = C(v);
    const z = H === p;
    const I = z && g;
    const E = !z && x(h);
    const A = !z && H === E;
    const T = I ? y : H;
    const D = b ? m($, c, f) : p;
    const k = I ? T : D;
    const R = !z && O($, r, _);
    const M = !A && E;
    const V = [ M, T, R, k ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(V, t);
    const L = elementIsGenerated(T) ? p : T;
    const P = {
      gt: p,
      bt: k,
      D: T,
      cn: R,
      wt: M,
      kt: I ? y : T,
      Kt: I ? w : T,
      rn: g ? y : L,
      ln: S,
      Jt: w,
      yt: b,
      Rt: g,
      Dt: a,
      V: z,
      St: t => hasAttrClass(T, z ? j : J, t),
      Ot: (t, n) => addRemoveAttrClass(T, z ? j : J, t, n)
    };
    const {gt: U, bt: B, cn: W, D: X, wt: Y} = P;
    const K = [ () => {
      removeAttrs(B, [ j, N ]);
      removeAttrs(U, N);
      if (g) {
        removeAttrs(y, [ N, j ]);
      }
    } ];
    const Q = b && elementIsGenerated(B);
    let nt = b ? U : contents([ Y, X, W, B, U ].find((t => t && !elementIsGenerated(t))));
    const st = I ? U : Y || X;
    const et = bind(runEachAndClear, K);
    const appendElements = () => {
      const t = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const prepareWrapUnwrapFocus = t => t ? addEventListener(t, "focusin focusout focus blur", (t => {
        stopPropagation(t);
        t.stopImmediatePropagation();
      }), {
        I: true,
        H: false
      }) : noop;
      const n = "tabindex";
      const o = getAttr(X, n);
      const e = prepareWrapUnwrapFocus(t);
      setAttrs(B, j, z ? "viewport" : "host");
      setAttrs(W, tt, "");
      setAttrs(Y, ot, "");
      if (!z) {
        setAttrs(X, J, "");
        setAttrs(X, n, o || "-1");
        g && addAttrClass(y, j, G);
      }
      if (Q) {
        insertAfter(U, B);
        push(K, (() => {
          insertAfter(B, U);
          removeElements(B);
        }));
      }
      appendChildren(st, nt);
      appendChildren(B, W);
      appendChildren(W || B, !z && X);
      appendChildren(X, Y);
      push(K, [ e, () => {
        const t = getFocusedElement();
        const s = prepareWrapUnwrapFocus(t);
        removeAttrs(W, tt);
        removeAttrs(Y, ot);
        removeAttrs(X, [ F, q, J ]);
        o ? setAttrs(X, n, o) : removeAttrs(X, n);
        elementIsGenerated(Y) && unwrap(Y);
        elementIsGenerated(X) && unwrap(X);
        elementIsGenerated(W) && unwrap(W);
        focusElm(t);
        s();
      } ]);
      if (s && !z) {
        addAttrClass(X, J, Z);
        push(K, bind(removeAttrs, X, J));
      }
      focusElm(!z && S.top === S && t === p ? X : t);
      e();
      nt = 0;
      return et;
    };
    return [ P, appendElements, et ];
  };
  const createTrinsicUpdateSegment = ({wt: t}) => ({Zt: n, an: o, Tt: s}) => {
    const {xt: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [I]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({bt: t, cn: n, D: o, V: s}, e) => {
    const [c, r] = createCache({
      u: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({Et: t, Zt: l, an: i, Tt: a}) => {
      let [u, d] = r(a);
      const {L: f} = getEnvironment();
      const {ht: _, Ht: v, Ct: h} = l || {};
      const {N: p} = i;
      const [g, b] = t("paddingAbsolute");
      const x = a || v;
      if (_ || d || x) {
        [u, d] = c(a);
      }
      const H = !s && (b || h || d);
      if (H) {
        const t = !g || !n && !f;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [$]: t && !p ? -s : 0,
          [C]: t ? -c : 0,
          [O]: t && p ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? p ? -u.r : "auto" : 0,
          left: t ? p ? "auto" : -u.l : 0,
          [z]: t && `calc(100% + ${s}px)`
        };
        const l = {
          [w]: t ? u.t : 0,
          [y]: t ? u.r : 0,
          [m]: t ? u.b : 0,
          [S]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, l);
        assignDeep(e, {
          cn: u,
          un: !t,
          j: n ? l : assignDeep({}, r, l)
        });
      }
      return {
        dn: H
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {bt: c, cn: r, D: l, V: i, Ot: a, Rt: u, ln: d} = t;
    const {L: f} = e;
    const _ = u && i;
    const v = bind(s, 0);
    const h = {
      u: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const p = {
      u: equalXY,
      o: {
        x: E,
        y: E
      }
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: v(t.w - n.w),
        h: v(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const [g, b] = createCache(h, bind(fractionalSize, l));
    const [w, y] = createCache(h, bind(M, l));
    const [S, m] = createCache(h);
    const [O, $] = createCache(h);
    const [C] = createCache(p);
    const z = getStaticPluginModuleInstance(At);
    return ({Et: o, Zt: u, an: h, Tt: p}, {dn: I}) => {
      const {ht: E, Ht: A, Ct: T, It: D} = u || {};
      const k = z && z.M(t, n, h, e, o);
      const {q: M, W: V, X: L} = k || {};
      const [P, U] = getShowNativeOverlaidScrollbars(o, e);
      const [B, N] = o("overflow");
      const X = E || I || A || T || D || U;
      const Y = overflowIsVisible(B.x);
      const G = overflowIsVisible(B.y);
      const K = Y || G;
      let ot = b(p);
      let st = y(p);
      let et = m(p);
      let ct = $(p);
      let rt;
      if (U && f) {
        a(Z, !P);
      }
      if (X) {
        if (K) {
          a(Q, false);
        }
        const [t, n] = V ? V(rt) : [];
        const [o, e] = ot = g(p);
        const [c, r] = st = w(p);
        const i = R(l);
        const u = c;
        const f = i;
        t && t();
        if ((r || e || U) && n && !P && M && M(n, c, o)) {}
        const h = windowSize(d);
        const b = {
          w: v(s(c.w, u.w) + o.w),
          h: v(s(c.h, u.h) + o.h)
        };
        const y = {
          w: v((_ ? h.w : f.w + v(i.w - c.w)) + o.w),
          h: v((_ ? h.h : f.h + v(i.h - c.h)) + o.h)
        };
        ct = O(y);
        et = S(getOverflowAmount(b, y), p);
      }
      const [lt, it] = ct;
      const [at, ut] = et;
      const [dt, ft] = st;
      const [_t, vt] = ot;
      const ht = {
        x: at.w > 0,
        y: at.h > 0
      };
      const pt = Y && G && (ht.x || ht.y) || Y && ht.x && !ht.y || G && ht.y && !ht.x;
      const gt = I || T || D || vt || ft || it || ut || N || U || X;
      if (gt) {
        const n = {};
        const o = setViewportOverflowState(t, ht, B, n);
        L && L(o, h, !!M && M(o, dt, _t), n);
        if (i) {
          setAttrs(c, F, n[x]);
          setAttrs(c, q, n[H]);
        } else {
          setStyles(l, n);
        }
      }
      addRemoveAttrClass(c, j, W, pt);
      addRemoveAttrClass(r, tt, nt, pt);
      if (!i) {
        addRemoveAttrClass(l, J, Q, K);
      }
      const [bt, wt] = C(getViewportOverflowState(t).k);
      assignDeep(n, {
        k: bt,
        Pt: {
          x: lt.w,
          y: lt.h
        },
        Lt: {
          x: at.w,
          y: at.h
        },
        en: ht
      });
      return {
        sn: wt,
        tn: it,
        nn: ut
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
      j: {
        [$]: 0,
        [C]: 0,
        [O]: 0,
        [w]: 0,
        [y]: 0,
        [m]: 0,
        [S]: 0
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
    const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = u;
      const s = o && getElmentScroll(r);
      const e = l ? addAttrClass(r, j, Y) : noop;
      each(d, (o => {
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
    const [u, d, f] = createObserversSetup(i, l, e, (t => {
      update({}, t);
    }));
    const [_, v, , h] = createScrollbarsSetup(t, n, f, l, i, s);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {fn: e, Tt: c, At: l, _n: i} = t;
      const a = e || {};
      const u = !!c;
      const _ = {
        Et: createOptionCheck(n, a, u),
        fn: a,
        Tt: u
      };
      if (i) {
        v(_);
        return false;
      }
      const h = s || d(assignDeep({}, _, {
        At: l
      }));
      const p = r(assignDeep({}, _, {
        an: f,
        Zt: h
      }));
      v(assignDeep({}, _, {
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
      const s = [ u(), c(), _() ];
      scrollElementTo(n, o);
      return bind(runEachAndClear, s);
    }, update, () => ({
      vn: f,
      hn: l
    }), {
      pn: i,
      gn: h
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
        const o = getStaticPluginModuleInstance(zt);
        return o ? o(n, true) : n;
      };
      const a = assignDeep({}, s(), validateOptions(n));
      const [u, d, f] = createEventListenerHub();
      const [_, v, h] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        h(t, n);
        f(t, n);
      };
      const [p, g, b, w, y] = createSetups(t, a, (({fn: t, Tt: n}, {Zt: o, Qt: s}) => {
        const {ht: e, Ct: c, xt: r, Ht: l, zt: i, _t: a} = o;
        const {tn: u, nn: d, sn: f} = s;
        triggerEvent("updated", [ S, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!f,
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
                fn: e
              });
            }
          }
          return assignDeep({}, a);
        },
        on: _,
        off: (t, n) => {
          t && n && v(t, n);
        },
        state() {
          const {vn: t, hn: n} = b();
          const {N: o} = t;
          const {Pt: s, Lt: e, k: c, en: l, cn: i, un: a} = n;
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
          const {gt: t, bt: n, cn: o, D: s, wt: e, kt: c, Kt: r} = w.pn;
          const {qt: l, Gt: i} = w.gn;
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
        update: t => g({
          Tt: t,
          At: true
        }),
        destroy: bind(destroy, false),
        plugin: t => i[keys(t)[0]]
      };
      push(l, [ y ]);
      addInstance(c, S);
      registerPluginModuleInstances(xt, OverlayScrollbars, [ S, u, i ]);
      if (cancelInitialization(w.pn.Rt, !e && t.cancel)) {
        destroy(true);
        return S;
      }
      push(l, p());
      triggerEvent("initialized", [ S ]);
      S.update(true);
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
  t.ClickScrollPlugin = kt;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = Tt;
  t.SizeObserverPlugin = Et;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
