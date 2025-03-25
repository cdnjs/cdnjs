/*!
 * OverlayScrollbars
 * Version: 2.10.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
"use strict";

Object.defineProperty(exports, Symbol.toStringTag, {
  value: "Module"
});

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

const t = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;

const n = t ? window : {};

const o = Math.max;

const s = Math.min;

const e = Math.round;

const c = Math.abs;

const r = Math.sign;

const l = n.cancelAnimationFrame;

const i = n.requestAnimationFrame;

const a = n.setTimeout;

const u = n.clearTimeout;

const getApi = t => typeof n[t] !== "undefined" ? n[t] : void 0;

const _ = getApi("MutationObserver");

const d = getApi("IntersectionObserver");

const f = getApi("ResizeObserver");

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

const animateNumber = (t, n, s, e, c) => {
  let r = 0;
  const a = animationCurrentTime();
  const u = o(0, s);
  const frame = s => {
    const l = animationCurrentTime();
    const _ = l - a;
    const d = _ >= u;
    const f = s ? 1 : 1 - (o(0, a + u - l) / u || 0);
    const p = (n - t) * (isFunction(c) ? c(f, f * u, 0, 1, u) : f) + t;
    const v = d || f === 1;
    e && e(p, f, v);
    r = v ? 0 : i((() => frame()));
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
  !isString(n) && isArrayLike(n) ? Array.prototype.push.apply(t, n) : t.push(n);
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
  !o && (t.length = 0);
};

const v = "paddingTop";

const h = "paddingRight";

const g = "paddingLeft";

const b = "paddingBottom";

const y = "marginLeft";

const w = "marginRight";

const S = "marginBottom";

const m = "overflowX";

const O = "overflowY";

const $ = "width";

const C = "height";

const x = "visible";

const H = "hidden";

const E = "scroll";

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
  const o = t ? a : i;
  const s = t ? u : l;
  return [ e => {
    s(n);
    n = o((() => e()), isFunction(t) ? t() : t);
  }, () => s(n) ];
};

const debounce = (t, n) => {
  const {_: o, p: s, v: e, S: c} = n || {};
  let r;
  let _;
  let d;
  let f;
  let p = noop;
  const v = function invokeFunctionToDebounce(n) {
    p();
    u(r);
    f = r = _ = void 0;
    p = noop;
    t.apply(this, n);
  };
  const mergeParms = t => c && _ ? c(_, t) : t;
  const flush = () => {
    if (p !== noop) {
      v(mergeParms(d) || d);
    }
  };
  const h = function debouncedFn() {
    const t = from(arguments);
    const n = isFunction(o) ? o() : o;
    const c = isNumber(n) && n >= 0;
    if (c) {
      const o = isFunction(s) ? s() : s;
      const c = isNumber(o) && o >= 0;
      const h = n > 0 ? a : i;
      const g = n > 0 ? u : l;
      const b = mergeParms(t);
      const y = b || t;
      const w = v.bind(0, y);
      let S;
      p();
      if (e && !f) {
        w();
        f = true;
        S = h((() => f = void 0), n);
      } else {
        S = h(w, n);
        if (c && !r) {
          r = a(flush, o);
        }
      }
      p = () => g(S);
      _ = d = y;
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

const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
  if (t === void 0) {
    delete o[n];
  } else if (t && isPlainObject(t)) {
    o[n] = removeUndefinedProperties(t);
  }
}));

const isEmptyObject = t => !keys(t).length;

const capNumber = (t, n, e) => o(t, s(n, e));

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

function getStyles(t, o, s) {
  const e = isString(o);
  let c = e ? "" : {};
  if (t) {
    const r = n.getComputedStyle(t, s) || t.style;
    c = e ? getCSSVal(r, o) : from(o).reduce(((t, n) => {
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

const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${"Y"}(${t})`}`;

const elementHasDimensions = t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);

const z = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : z;

const getWindowSize = t => getElmWidthHeightProperty("inner", t || n);

const I = bind(getElmWidthHeightProperty, "offset");

const A = bind(getElmWidthHeightProperty, "client");

const D = bind(getElmWidthHeightProperty, "scroll");

const getFractionalSize = t => {
  const n = parseFloat(getStyles(t, $)) || 0;
  const o = parseFloat(getStyles(t, C)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[C] || t[$]));

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
  M: {
    x: 0,
    y: 0
  }
});

const sanitizeScrollCoordinates = (t, n) => {
  const {D: o, M: s} = t;
  const {w: e, h: l} = n;
  const sanitizeAxis = (t, n, o) => {
    let s = r(t) * o;
    let e = r(n) * o;
    if (s === e) {
      const o = c(t);
      const r = c(n);
      e = o > r ? 0 : e;
      s = o < r ? 0 : s;
    }
    s = s === e ? 0 : s;
    return [ s + 0, e + 0 ];
  };
  const [i, a] = sanitizeAxis(o.x, s.x, e);
  const [u, _] = sanitizeAxis(o.y, s.y, l);
  return {
    D: {
      x: i,
      y: u
    },
    M: {
      x: a,
      y: _
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

const M = {};

const T = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    M[o] = t[o];
  }))));
};

const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
  const {static: e, instance: c} = t[s];
  const [r, l, i] = o || [];
  const a = o ? c : e;
  if (a) {
    const t = o ? a(r, l, n) : a(n);
    return (i || T)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => T[t];

const k = "__osOptionsValidationPlugin";

const R = `data-overlayscrollbars`;

const V = "os-environment";

const L = `${V}-scrollbar-hidden`;

const U = `${R}-initialize`;

const P = "noClipping";

const N = `${R}-body`;

const q = R;

const j = "host";

const B = `${R}-viewport`;

const F = m;

const Y = O;

const W = "arrange";

const X = "measuring";

const J = "scrolling";

const G = "scrollbarHidden";

const K = "noContent";

const Q = `${R}-padding`;

const Z = `${R}-content`;

const tt = "os-size-observer";

const nt = `${tt}-appear`;

const ot = `${tt}-listener`;

const st = `${ot}-scroll`;

const et = `${ot}-item`;

const ct = `${et}-final`;

const rt = "os-trinsic-observer";

const lt = "os-theme-none";

const it = "os-scrollbar";

const at = `${it}-rtl`;

const ut = `${it}-horizontal`;

const _t = `${it}-vertical`;

const dt = `${it}-track`;

const ft = `${it}-handle`;

const pt = `${it}-visible`;

const vt = `${it}-cornerless`;

const ht = `${it}-interaction`;

const gt = `${it}-unusable`;

const bt = `${it}-auto-hide`;

const yt = `${bt}-hidden`;

const wt = `${it}-wheel`;

const St = `${dt}-interactive`;

const mt = `${ft}-interactive`;

const Ot = "__osSizeObserverPlugin";

const $t = /* @__PURE__ */ (() => ({
  [Ot]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${et}" dir="ltr"><div class="${et}"><div class="${ct}"></div></div><div class="${et}"><div class="${ct}" style="width: 200%; height: 200%"></div></div></div>`);
      const r = c[0];
      const a = r.lastChild;
      const u = r.firstChild;
      const _ = u == null ? void 0 : u.firstChild;
      let d = I(r);
      let f = d;
      let p = false;
      let v;
      const reset = () => {
        scrollElementTo(u, s);
        scrollElementTo(a, s);
      };
      const onResized = t => {
        v = 0;
        if (p) {
          d = f;
          n(t === true);
        }
      };
      const onScroll = t => {
        f = I(r);
        p = !t || !equalWH(f, d);
        if (t) {
          stopPropagation(t);
          if (p && !v) {
            l(v);
            v = i(onResized);
          }
        } else {
          onResized(t === false);
        }
        reset();
      };
      const h = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(a, e, onScroll) ];
      addClass(t, st);
      setStyles(_, {
        [$]: s,
        [C]: s
      });
      i(reset);
      return [ o ? bind(onScroll, false) : reset, h ];
    }
  }
}))();

const getShowNativeOverlaidScrollbars = (t, n) => {
  const {T: o} = n;
  const [s, e] = t("showNativeOverlaidScrollbars");
  return [ s && o.x && o.y, e ];
};

const overflowIsVisible = t => t.indexOf(x) === 0;

const createViewportOverflowState = (t, n) => {
  const getAxisOverflowStyle = (t, n, o, s) => {
    const e = t === x ? H : t.replace(`${x}-`, "");
    const c = overflowIsVisible(t);
    const r = overflowIsVisible(o);
    if (!n && !s) {
      return H;
    }
    if (c && r) {
      return x;
    }
    if (c) {
      const t = n ? x : H;
      return n && s ? e : t;
    }
    const l = r && s ? x : H;
    return n ? e : l;
  };
  const o = {
    x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
    y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
  };
  return {
    k: o,
    R: {
      x: o.x === E,
      y: o.y === E
    }
  };
};

const Ct = "__osScrollbarsHidingPlugin";

const xt = /* @__PURE__ */ (() => ({
  [Ct]: {
    static: () => ({
      V: (t, n, o, s, e) => {
        const {L: c, U: r} = t;
        const {P: l, T: i, N: a} = s;
        const u = !c && !l && (i.x || i.y);
        const [_] = getShowNativeOverlaidScrollbars(e, s);
        const readViewportOverflowState = () => {
          const getStatePerAxis = t => {
            const n = getStyles(r, t);
            const o = n === E;
            return [ n, o ];
          };
          const [t, n] = getStatePerAxis(m);
          const [o, s] = getStatePerAxis(O);
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
              [w]: 0,
              [S]: 0,
              [y]: 0
            });
            const {q: c, j: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {F: _} = n;
            const d = o ? y : w;
            const f = o ? g : h;
            const p = _[d];
            const v = _[S];
            const m = _[f];
            const O = _[b];
            e[$] = `calc(100% + ${u + p * -1}px)`;
            e[d] = -u + p;
            e[S] = -a + v;
            if (s) {
              e[f] = m + (i ? u : 0);
              e[b] = O + (l ? a : 0);
            }
            return e;
          }
        };
        const _arrangeViewport = (t, s, e) => {
          if (u) {
            const {F: c} = n;
            const {q: l, j: i} = _getViewportOverflowHideOffset(t);
            const {x: a, y: u} = i;
            const {x: _, y: d} = l;
            const {B: f} = o;
            const p = f ? h : g;
            const v = c[p];
            const b = c.paddingTop;
            const y = s.w + e.w;
            const w = s.h + e.h;
            const S = {
              w: d && u ? `${d + y - v}px` : "",
              h: _ && a ? `${_ + w - b}px` : ""
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
              assignProps([ S, v, b ]);
            }
            if (i) {
              assignProps([ y, w, g, h ]);
            }
            const _ = getStyles(r, keys(a));
            const d = removeAttrClass(r, B, W);
            setStyles(r, a);
            return [ () => {
              setStyles(r, assignDeep({}, _, _hideNativeScrollbars(s, o, u)));
              d();
            }, s ];
          }
          return [ noop ];
        };
        return {
          Y: _getViewportOverflowHideOffset,
          W: _arrangeViewport,
          X: _undoViewportArrange,
          J: _hideNativeScrollbars
        };
      }
    })
  }
}))();

const Ht = "__osClickScrollPlugin";

const Et = /* @__PURE__ */ (() => ({
  [Ht]: {
    static: () => (t, n, o, s) => {
      let e = false;
      let c = noop;
      const r = 133;
      const l = 222;
      const [i, a] = selfClearTimeout(r);
      const u = Math.sign(n);
      const _ = o * u;
      const d = _ / 2;
      const easing = t => 1 - (1 - t) * (1 - t);
      const easedEndPressAnimation = (n, o) => animateNumber(n, o, l, t, easing);
      const linearPressAnimation = (o, s) => animateNumber(o, n - _, r * s, ((o, s, e) => {
        t(o);
        if (e) {
          c = easedEndPressAnimation(o, n);
        }
      }));
      const f = animateNumber(0, _, l, ((r, l, a) => {
        t(r);
        if (a) {
          s(e);
          if (!e) {
            const t = n - r;
            const s = Math.sign(t - d) === u;
            s && i((() => {
              const s = t - _;
              const e = Math.sign(s) === u;
              c = e ? linearPressAnimation(r, Math.abs(s) / o) : easedEndPressAnimation(r, n);
            }));
          }
        }
      }), easing);
      return t => {
        e = true;
        if (t) {
          f();
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

const zt = {
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

let It;

const getNonce = () => It;

const setNonce = t => {
  It = t;
};

let At;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o) => {
    appendChildren(document.body, t);
    appendChildren(document.body, t);
    const s = A(t);
    const e = I(t);
    const c = getFractionalSize(n);
    o && removeElements(t);
    return {
      x: e.h - s.h + c.h,
      y: e.w - s.w + c.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, L);
    try {
      n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const t = `.${V}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${V} div{width:200%;height:200%;margin:10px 0}.${L}{scrollbar-width:none!important}.${L}::-webkit-scrollbar,.${L}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const o = createDOM(`<div class="${V}"><div></div><style>${t}</style></div>`);
  const s = o[0];
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
  const h = assignDeep({}, zt);
  const g = bind(assignDeep, {}, h);
  const b = bind(assignDeep, {}, v);
  const y = {
    N: _,
    T: f,
    P: d,
    G: !!p,
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
  addEventListener(n, "resize", (() => {
    i("r", []);
  }));
  if (isFunction(n.matchMedia) && !d && (!f.x || !f.y)) {
    const addZoomListener = t => {
      const o = n.matchMedia(`(resolution: ${n.devicePixelRatio}dppx)`);
      addEventListener(o, "change", (() => {
        t();
        addZoomListener(t);
      }), {
        A: true
      });
    };
    addZoomListener((() => {
      const [t, n] = a();
      assignDeep(y.N, t);
      i("r", [ n ]);
    }));
  }
  return y;
};

const getEnvironment = () => {
  if (!At) {
    At = createEnvironment();
  }
  return At;
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
  const {ct: c, rt: r, lt: l, it: i, ut: a, _t: u} = s || {};
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
      const _ = [];
      const d = [];
      let f = false;
      let v = false;
      each(c, (o => {
        const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: p, removedNodes: g} = o;
        const b = a === "attributes";
        const y = a === "childList";
        const w = t === c;
        const S = b && e;
        const m = S && getAttr(c, e || "");
        const O = isString(m) ? m : null;
        const $ = S && u !== O;
        const C = inArray(h, e) && $;
        if (n && (y || !w)) {
          const n = b && $;
          const a = n && i && is(c, i);
          const d = a ? !r(c, e, u, O) : !b || n;
          const f = d && !l(o, !!a, t, s);
          each(p, (t => push(_, t)));
          each(g, (t => push(_, t)));
          v = v || f;
        }
        if (!n && w && $ && !r(c, e, u, O)) {
          push(d, e);
          f = f || C;
        }
      }));
      p((t => deduplicateArray(_).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
      if (n) {
        !e && v && o(false);
        return [ false ];
      }
      if (!isEmptyArray(d) || f) {
        const t = [ deduplicateArray(d), f ];
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

const createSizeObserver = (t, n, o) => {
  const {dt: s} = o || {};
  const e = getStaticPluginModuleInstance(Ot);
  const [c] = createCache({
    o: false,
    u: true
  });
  return () => {
    const o = [];
    const r = createDOM(`<div class="${tt}"><div class="${ot}"></div></div>`);
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
    if (f) {
      const t = new f((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(i);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (e) {
      const [t, n] = e(i, onSizeChangedCallbackProxy, s);
      push(o, concat([ addClass(l, nt), addEventListener(l, "animationstart", t) ], n));
    } else {
      return noop;
    }
    return bind(runEachAndClear, push(o, appendChildren(t, l)));
  };
};

const createTrinsicObserver = (t, n) => {
  let o;
  const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
  const s = createDiv(rt);
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
        const t = I(s);
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
  const u = `[${q}]`;
  const _ = `[${B}]`;
  const d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
  const {vt: p, ht: v, U: h, gt: g, bt: b, L: y, yt: w, wt: S, St: m, Ot: O} = t;
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
  const $ = {
    $t: false,
    B: getDirectionIsRTL(p)
  };
  const C = getEnvironment();
  const x = getStaticPluginModuleInstance(Ct);
  const [H] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = x && x.V(t, n, $, C, o).X;
    const e = w && y;
    const c = !e && hasAttrClass(v, q, P);
    const r = !y && S(W);
    const l = r && getElementScroll(g);
    const i = l && O();
    const a = m(X, c);
    const u = r && s && s()[0];
    const _ = D(h);
    const d = getFractionalSize(h);
    u && u();
    scrollElementTo(g, l);
    i && i();
    c && a();
    return {
      w: _.w + d.w,
      h: _.h + d.h
    };
  }));
  const E = debounce(s, {
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
    const n = getDirectionIsRTL(p);
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
    !n && s(c);
    return c;
  };
  const onSizeChanged = ({ft: t, dt: n}) => {
    const o = t && !n;
    const e = !o && C.P ? E : s;
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
  const [z, I] = b ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const A = !y && createSizeObserver(v, onSizeChanged, {
    dt: true
  });
  const [M, T] = createDOMObserver(v, false, onHostMutation, {
    rt: d,
    ct: d
  });
  const k = y && f && new f((t => {
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
    v: true
  });
  return [ () => {
    k && k.observe(v);
    const t = A && A();
    const n = z && z();
    const o = M();
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
    const [p, v] = t("update.elementEvents");
    const [g, w] = t("update.debounce");
    const S = v || f;
    const m = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (S) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(b || h, true, onContentMutation, {
        ct: concat(d, a || []),
        lt: p,
        it: u,
        _t: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !y ? liesBetween(o, u, _) : false;
          return e || !!closest(o, `.${it}`) || !!ignoreMutationFromOptions(t);
        }
      });
      l = t();
      r = n;
    }
    if (w) {
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
      const t = T();
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
  const _ = (e.x || e.y) && a;
  const d = t && (isNull(u) ? !c : u);
  return !!_ || !!d;
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const e = "--os-viewport-percent";
  const c = "--os-scroll-percent";
  const r = "--os-scroll-direction";
  const {Z: l} = getEnvironment();
  const {scrollbars: i} = l();
  const {slot: a} = i;
  const {vt: u, ht: _, U: d, Mt: f, gt: v, yt: h, L: g} = n;
  const {scrollbars: b} = f ? {} : t;
  const {slot: y} = b || {};
  const w = [];
  const S = [];
  const m = [];
  const O = dynamicInitializationElement([ u, _, d ], (() => g && h ? u : _), a, y);
  const initScrollTimeline = t => {
    if (p) {
      const n = new p({
        source: v,
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
    if (!p) {
      const {Lt: t} = o;
      const n = getScrollCoordinatesPercent(t, getElementScroll(v));
      const createScrollbarStyleFn = t => n => [ n.Tt, {
        [c]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
    }
  };
  const refreshScrollbarsScrollCoordinates = () => {
    const {Lt: t} = o;
    const n = isDefaultDirectionScrollCoordinates(t);
    const createScrollbarStyleFn = t => n => [ n.Tt, {
      [r]: t ? "0" : "1"
    } ];
    scrollbarStyle(S, createScrollbarStyleFn(n.x));
    scrollbarStyle(m, createScrollbarStyleFn(n.y));
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (g && !h) {
      const {Rt: t, Lt: n} = o;
      const s = isDefaultDirectionScrollCoordinates(n);
      const e = getScrollCoordinatesPercent(n, getElementScroll(v));
      const styleScrollbarPosition = n => {
        const {Tt: o} = n;
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
    const o = t ? ut : _t;
    const e = createDiv(`${it} ${o}`);
    const c = createDiv(dt);
    const r = createDiv(ft);
    const l = {
      Tt: e,
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
    appendChildren(O, S[0].Tt);
    appendChildren(O, m[0].Tt);
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
    Yt: {
      Wt: S,
      Xt: C,
      Jt: bind(scrollbarStyle, S)
    },
    Gt: {
      Wt: m,
      Xt: x,
      Jt: bind(scrollbarStyle, m)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => (r, l, i) => {
  const {ht: u, U: _, L: d, gt: f, Kt: p, Ot: v} = n;
  const {Tt: h, Ut: g, Pt: b} = r;
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
    const r = i ? $ : C;
    const l = i ? "left" : "top";
    const a = i ? "w" : "h";
    const u = i ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {Rt: e} = o;
      const c = I(g)[a] - I(b)[a];
      const r = n * s / c;
      const l = r * e[u];
      scrollElementTo(f, {
        [u]: t + l
      });
    };
    const _ = [];
    return addEventListener(g, "pointerdown", (o => {
      const i = closest(o.target, `.${ft}`) === b;
      const d = i ? b : g;
      const h = t.scrollbars;
      const y = h[i ? "dragScroll" : "clickScroll"];
      const {button: w, isPrimary: O, pointerType: $} = o;
      const {pointers: C} = h;
      const x = w === 0 && O && y && (C || []).includes($);
      if (x) {
        runEachAndClear(_);
        m();
        const t = !i && (o.shiftKey || y === "instant");
        const h = bind(getBoundingClientRect, b);
        const w = bind(getBoundingClientRect, g);
        const getHandleOffset = (t, n) => (t || h())[l] - (n || w())[l];
        const O = e(getBoundingClientRect(f)[r]) / I(f)[a] || 1;
        const $ = createRelativeHandleMove(getElementScroll(f)[u], 1 / O);
        const C = o[s];
        const x = h();
        const H = w();
        const E = x[r];
        const z = getHandleOffset(x, H) + E / 2;
        const A = C - H[l];
        const D = i ? 0 : A - z;
        const releasePointerCapture = t => {
          runEachAndClear(k);
          d.releasePointerCapture(t.pointerId);
        };
        const M = i || t;
        const T = v();
        const k = [ addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
          H: false
        }), addEventListener(g, n, releasePointerCapture), M && addEventListener(g, "pointermove", (t => $(D + (t[s] - C)))), M && (() => {
          const t = getElementScroll(f);
          T();
          const n = getElementScroll(f);
          const o = {
            x: n.x - t.x,
            y: n.y - t.y
          };
          if (c(o.x) > 3 || c(o.y) > 3) {
            v();
            scrollElementTo(f, t);
            scrollOffsetElementScrollBy(o);
            S(T);
          }
        }) ];
        d.setPointerCapture(o.pointerId);
        if (t) {
          $(D);
        } else if (!i) {
          const t = getStaticPluginModuleInstance(Ht);
          if (t) {
            const n = t($, D, E, (t => {
              if (t) {
                T();
              } else {
                push(k, T);
              }
            }));
            push(k, n);
            push(_, bind(n, true));
          }
        }
      }
    }));
  };
  let O = true;
  return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(h, "pointerenter", (() => {
    l(ht, true);
  })), addEventListener(h, "pointerleave pointercancel", (() => {
    l(ht, false);
  })), !d && addEventListener(h, "mousedown", (() => {
    const t = getFocusedElement();
    if (hasAttr(t, B) || hasAttr(t, q) || t === document.body) {
      a(bind(focusElement, _), 25);
    }
  })), addEventListener(h, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: s} = t;
    if (O && s === 0 && parent(h) === u) {
      scrollOffsetElementScrollBy({
        x: n,
        y: o
      });
    }
    O = false;
    l(wt, true);
    y((() => {
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
  const f = [ "mouse", "pen" ];
  const isHoverablePointerType = t => f.includes(t.pointerType);
  const [p, v] = selfClearTimeout();
  const [h, g] = selfClearTimeout(100);
  const [b, y] = selfClearTimeout(100);
  const [w, S] = selfClearTimeout((() => d));
  const [m, O] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
  const {ht: $, Qt: C, yt: H} = e;
  const {Ft: z, Nt: I, qt: A, jt: D, Bt: M} = m;
  const manageScrollbarsAutoHide = (t, n) => {
    S();
    if (t) {
      z(yt);
    } else {
      const t = bind(z, yt, true);
      if (d > 0 && !n) {
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
    z(bt, t, true);
    z(bt, t, false);
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      r = i;
      i && manageScrollbarsAutoHide(true);
    }
  };
  const T = [ S, g, y, v, () => _(), addEventListener($, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      r = false;
      i && manageScrollbarsAutoHide(false);
    }
  })), addEventListener($, "pointermove", (t => {
    isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
  })), addEventListener(C, "scroll", (t => {
    p((() => {
      A();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    M();
  })) ];
  return [ () => bind(runEachAndClear, push(T, O())), ({It: t, Dt: n, Zt: e, tn: c}) => {
    const {nn: r, sn: f, en: p, cn: v} = c || {};
    const {Ct: h, dt: g} = e || {};
    const {B: y} = o;
    const {T: w} = getEnvironment();
    const {k: S, rn: m} = s;
    const [O, $] = t("showNativeOverlaidScrollbars");
    const [T, k] = t("scrollbars.theme");
    const [R, V] = t("scrollbars.visibility");
    const [L, U] = t("scrollbars.autoHide");
    const [P, N] = t("scrollbars.autoHideSuspend");
    const [q] = t("scrollbars.autoHideDelay");
    const [j, B] = t("scrollbars.dragScroll");
    const [F, Y] = t("scrollbars.clickScroll");
    const [W, X] = t("overflow");
    const J = g && !n;
    const G = m.x || m.y;
    const K = r || f || v || h || n;
    const Q = p || V || X;
    const Z = O && w.x && w.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(E) && (R === x || R === "auto" && n === E);
      z(pt, s, o);
      return s;
    };
    d = q;
    if (J) {
      if (P && G) {
        manageAutoHideSuspension(false);
        _();
        b((() => {
          _ = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if ($) {
      z(lt, Z);
    }
    if (k) {
      z(u);
      z(T, true);
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
      z(mt, j);
    }
    if (Y) {
      z(St, !!F);
    }
    if (Q) {
      const t = setScrollbarVisibility(W.x, S.x, true);
      const n = setScrollbarVisibility(W.y, S.y, false);
      const o = t && n;
      z(vt, !o);
    }
    if (K) {
      A();
      I();
      M();
      v && D();
      z(gt, !m.x, true);
      z(gt, !m.y, false);
      z(at, y && !H);
    }
  }, {}, m ];
};

const createStructureSetupElements = t => {
  const o = getEnvironment();
  const {Z: s, P: e} = o;
  const {elements: c} = s();
  const {padding: r, viewport: l, content: i} = c;
  const a = isHTMLElement(t);
  const u = a ? {} : t;
  const {elements: _} = u;
  const {padding: d, viewport: f, content: p} = _ || {};
  const v = a ? t : u.target;
  const h = isBodyElement(v);
  const g = v.ownerDocument;
  const b = g.documentElement;
  const getDocumentWindow = () => g.defaultView || n;
  const y = bind(staticInitializationElement, [ v ]);
  const w = bind(dynamicInitializationElement, [ v ]);
  const S = bind(createDiv, "");
  const $ = bind(y, S, l);
  const C = bind(w, S, i);
  const elementHasOverflow = t => {
    const n = I(t);
    const o = D(t);
    const s = getStyles(t, m);
    const e = getStyles(t, O);
    return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
  };
  const x = $(f);
  const H = x === v;
  const E = H && h;
  const z = !H && C(p);
  const A = !H && x === z;
  const M = E ? b : x;
  const T = E ? M : v;
  const k = !H && w(S, r, d);
  const R = !A && z;
  const V = [ R, M, k, T ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(V, t);
  const L = !elementIsGenerated(M) && elementHasOverflow(M) ? M : v;
  const P = E ? b : M;
  const F = E ? g : M;
  const Y = {
    vt: v,
    ht: T,
    U: M,
    ln: k,
    bt: R,
    gt: P,
    Qt: F,
    an: h ? b : L,
    Kt: g,
    yt: h,
    Mt: a,
    L: H,
    un: getDocumentWindow,
    wt: t => hasAttrClass(M, B, t),
    St: (t, n) => addRemoveAttrClass(M, B, t, n),
    Ot: () => addRemoveAttrClass(P, B, J, true)
  };
  const {vt: W, ht: X, ln: K, U: tt, bt: nt} = Y;
  const ot = [ () => {
    removeAttrs(X, [ q, U ]);
    removeAttrs(W, U);
    if (h) {
      removeAttrs(b, [ U, q ]);
    }
  } ];
  let st = contents([ nt, tt, K, X, W ].find((t => t && !elementIsGenerated(t))));
  const et = E ? W : nt || tt;
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
    setAttrs(X, q, H ? "" : j);
    setAttrs(K, Q, "");
    setAttrs(tt, B, "");
    setAttrs(nt, Z, "");
    if (!H) {
      setAttrs(tt, o, s || "-1");
      h && setAttrs(b, N, "");
    }
    appendChildren(et, st);
    appendChildren(X, K);
    appendChildren(K || X, !H && tt);
    appendChildren(tt, nt);
    push(ot, [ c, () => {
      const t = getFocusedElement();
      const n = elementIsGenerated(tt);
      const e = n && t === tt ? W : t;
      const c = prepareWrapUnwrapFocus(e);
      removeAttrs(K, Q);
      removeAttrs(nt, Z);
      removeAttrs(tt, B);
      h && removeAttrs(b, N);
      s ? setAttrs(tt, o, s) : removeAttrs(tt, o);
      elementIsGenerated(nt) && unwrap(nt);
      n && unwrap(tt);
      elementIsGenerated(K) && unwrap(K);
      focusElement(e);
      c();
    } ]);
    if (e && !H) {
      addAttrClass(tt, B, G);
      push(ot, bind(removeAttrs, tt, B));
    }
    focusElement(!H && h && n === W && t.top === t ? tt : n);
    c();
    st = 0;
    return ct;
  };
  return [ Y, appendElements, ct ];
};

const createTrinsicUpdateSegment = ({bt: t}) => ({Zt: n, _n: o, Dt: s}) => {
  const {xt: e} = n || {};
  const {$t: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [C]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({ht: t, ln: n, U: o, L: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({It: t, Zt: l, _n: i, Dt: a}) => {
    let [u, _] = r(a);
    const {P: d} = getEnvironment();
    const {ft: f, Ht: p, Ct: m} = l || {};
    const {B: O} = i;
    const [C, x] = t("paddingAbsolute");
    const H = a || p;
    if (f || _ || H) {
      [u, _] = c(a);
    }
    const E = !s && (x || m || _);
    if (E) {
      const t = !C || !n && !d;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [w]: t && !O ? -s : 0,
        [S]: t ? -c : 0,
        [y]: t && O ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? O ? -u.r : "auto" : 0,
        left: t ? O ? "auto" : -u.l : 0,
        [$]: t && `calc(100% + ${s}px)`
      };
      const l = {
        [v]: t ? u.t : 0,
        [h]: t ? u.r : 0,
        [b]: t ? u.b : 0,
        [g]: t ? u.l : 0
      };
      setStyles(n || o, r);
      setStyles(o, l);
      assignDeep(e, {
        ln: u,
        dn: !t,
        F: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      fn: E
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {ht: c, ln: r, U: l, L: a, Qt: u, gt: _, yt: d, St: f, un: p} = t;
  const {P: v} = e;
  const h = d && a;
  const g = bind(o, 0);
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
    f(X, !h && t);
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
        M: {
          x: 1,
          y: 1
        }
      };
    }
    setMeasuringMode(true);
    const o = getElementScroll(_);
    const s = f(K, true);
    const e = addEventListener(u, E, (t => {
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
    const r = D(_);
    scrollElementTo(_, {
      x: r.w,
      y: r.h
    });
    const l = getElementScroll(_);
    scrollElementTo(_, {
      x: l.x - c.x < 1 && -r.w,
      y: l.y - c.y < 1 && -r.h
    });
    const a = getElementScroll(_);
    scrollElementTo(_, o);
    i((() => e()));
    return {
      D: c,
      M: a
    };
  };
  const getOverflowAmount = (t, o) => {
    const s = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const e = {
      w: g(t.w - o.w),
      h: g(t.h - o.h)
    };
    return {
      w: e.w > s ? e.w : 0,
      h: e.h > s ? e.h : 0
    };
  };
  const [m, O] = createCache(w, bind(getFractionalSize, l));
  const [$, C] = createCache(w, bind(D, l));
  const [z, I] = createCache(w);
  const [M] = createCache(S);
  const [T, k] = createCache(w);
  const [R] = createCache(S);
  const [V] = createCache({
    i: (t, n) => equal(t, n, y),
    o: {}
  }, (() => hasDimensions(l) ? getStyles(l, y) : {}));
  const [L, U] = createCache({
    i: (t, n) => equalXY(t.D, n.D) && equalXY(t.M, n.M),
    o: getZeroScrollCoordinates()
  });
  const N = getStaticPluginModuleInstance(Ct);
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? F : Y;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  const setViewportOverflowStyle = t => {
    const createAllOverflowStyleClassNames = t => [ x, H, E ].map((n => createViewportOverflowStyleClassName(n, t)));
    const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
    f(n);
    f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
  };
  return ({It: n, Zt: o, _n: i, Dt: a}, {fn: u}) => {
    const {ft: _, Ht: d, Ct: b, dt: y, zt: w} = o || {};
    const S = N && N.V(t, s, i, e, n);
    const {W: x, X: H, J: E} = S || {};
    const [D, j] = getShowNativeOverlaidScrollbars(n, e);
    const [B, F] = n("overflow");
    const Y = overflowIsVisible(B.x);
    const W = overflowIsVisible(B.y);
    const X = true;
    let J = O(a);
    let K = C(a);
    let Z = I(a);
    let tt = k(a);
    if (j && v) {
      f(G, !D);
    }
    {
      if (hasAttrClass(c, q, P)) {
        setMeasuringMode(true);
      }
      const [t] = H ? H() : [];
      const [n] = J = m(a);
      const [o] = K = $(a);
      const s = A(l);
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
      tt = T(i);
      Z = z(getOverflowAmount(r, i), a);
    }
    const [nt, ot] = tt;
    const [st, et] = Z;
    const [ct, rt] = K;
    const [lt, it] = J;
    const [at, ut] = M({
      x: st.w > 0,
      y: st.h > 0
    });
    const _t = Y && W && (at.x || at.y) || Y && at.x && !at.y || W && at.y && !at.x;
    const dt = u || b || w || it || rt || ot || et || F || j || X;
    const ft = createViewportOverflowState(at, B);
    const [pt, vt] = R(ft.k);
    const [ht, gt] = V(a);
    const bt = b || y || gt || ut || a;
    const [yt, wt] = bt ? L(getMeasuredScrollCoordinates(ht), a) : U();
    if (dt) {
      vt && setViewportOverflowStyle(ft.k);
      if (E && x) {
        setStyles(l, E(ft, i, x(ft, ct, lt)));
      }
    }
    setMeasuringMode(false);
    addRemoveAttrClass(c, q, P, _t);
    addRemoveAttrClass(r, Q, P, _t);
    assignDeep(s, {
      k: pt,
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
      en: vt,
      nn: ot,
      sn: et,
      cn: wt || et,
      pn: bt
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
    F: {
      [w]: 0,
      [S]: 0,
      [y]: 0,
      [v]: 0,
      [h]: 0,
      [b]: 0,
      [g]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    k: {
      x: H,
      y: H
    },
    rn: {
      x: false,
      y: false
    },
    Lt: getZeroScrollCoordinates()
  };
  const {vt: c, gt: r, L: l, Ot: i} = n;
  const {P: a, T: u} = getEnvironment();
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
  const [d, f, p] = createObserversSetup(u, a, r, (t => {
    update({}, t);
  }));
  const [v, h, , g] = createScrollbarsSetup(t, n, p, a, u, e);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, e) => {
    if (o()) {
      return false;
    }
    const {vn: r, Dt: l, At: a, hn: u} = t;
    const _ = r || {};
    const d = !!l || !c;
    const v = {
      It: createOptionCheck(n, _, d),
      vn: _,
      Dt: d
    };
    if (u) {
      h(v);
      return false;
    }
    const g = e || f(assignDeep({}, v, {
      At: a
    }));
    const b = i(assignDeep({}, v, {
      _n: p,
      Zt: g
    }));
    h(assignDeep({}, v, {
      Zt: g,
      tn: b
    }));
    const y = updateHintsAreTruthy(g);
    const w = updateHintsAreTruthy(b);
    const S = y || w || !isEmptyObject(_) || d;
    c = true;
    S && s(t, {
      Zt: g,
      tn: b
    });
    return S;
  };
  return [ () => {
    const {an: t, gt: n, Ot: o} = u;
    const s = getElementScroll(t);
    const e = [ d(), l(), v() ];
    const c = o();
    scrollElementTo(n, s);
    c();
    return bind(runEachAndClear, e);
  }, update, () => ({
    gn: p,
    bn: a
  }), {
    yn: u,
    wn: g
  }, _ ];
};

const Dt = new WeakMap;

const addInstance = (t, n) => {
  Dt.set(t, n);
};

const removeInstance = t => {
  Dt.delete(t);
};

const getInstance = t => Dt.get(t);

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
      const o = getStaticPluginModuleInstance(k);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, _, d] = createEventListenerHub();
    const [f, p, v] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      v(t, n);
      d(t, n);
    };
    const [h, g, b, y, w] = createSetups(t, a, (() => r), (({vn: t, Dt: n}, {Zt: o, tn: s}) => {
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
              vn: e
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
        const {gn: t, bn: n} = b();
        const {B: o} = t;
        const {Vt: s, Rt: e, k: c, rn: l, ln: i, dn: a, Lt: u} = n;
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
        const {vt: t, ht: n, ln: o, U: s, bt: e, gt: c, Qt: r} = y.yn;
        const {Yt: l, Gt: i} = y.wn;
        const translateScrollbarStructure = t => {
          const {Pt: n, Ut: o, Tt: s} = t;
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
    push(l, [ w ]);
    addInstance(c, S);
    registerPluginModuleInstances(M, OverlayScrollbars, [ S, u, i ]);
    if (cancelInitialization(y.yn.yt, !e && t.cancel)) {
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
  const {N: t, T: n, P: o, G: s, st: e, et: c, Z: r, tt: l, nt: i, ot: a} = getEnvironment();
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

exports.ClickScrollPlugin = Et;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = xt;

exports.SizeObserverPlugin = $t;
//# sourceMappingURL=overlayscrollbars.cjs.js.map
