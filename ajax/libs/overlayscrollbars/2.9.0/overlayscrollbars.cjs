/*!
 * OverlayScrollbars
 * Version: 2.9.0
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

const d = getApi("MutationObserver");

const _ = getApi("IntersectionObserver");

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
    const d = l - a;
    const _ = d >= u;
    const f = s ? 1 : 1 - (o(0, a + u - l) / u || 0);
    const p = (n - t) * (isFunction(c) ? c(f, f * u, 0, 1, u) : f) + t;
    const v = _ || f === 1;
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

const v = "paddingTop";

const h = "paddingRight";

const g = "paddingLeft";

const b = "paddingBottom";

const w = "marginLeft";

const y = "marginRight";

const S = "marginBottom";

const m = "overflowX";

const O = "overflowY";

const C = "width";

const $ = "height";

const x = "visible";

const H = "hidden";

const E = "scroll";

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
  let d;
  let _;
  let f;
  let p = noop;
  const v = function invokeFunctionToDebounce(n) {
    p();
    u(r);
    f = r = d = void 0;
    p = noop;
    t.apply(this, n);
  };
  const mergeParms = t => c && d ? c(d, t) : t;
  const flush = () => {
    if (p !== noop) {
      v(mergeParms(_) || _);
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
      const w = b || t;
      const y = v.bind(0, w);
      let S;
      p();
      if (e && !f) {
        y();
        f = true;
        S = h((() => f = void 0), n);
      } else {
        S = h(y, n);
        if (c && !r) {
          r = a(flush, o);
        }
      }
      p = () => g(S);
      d = _ = w;
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

const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, o, s) => {
  if (t === void 0) {
    delete s[o];
  } else if (n && t && isPlainObject(t)) {
    s[o] = removeUndefinedProperties(t, n);
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
    C: t => s(domTokenListOperation(t, "add")),
    $: t => {
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
  domTokenListAttr(t, n).C(o);
  return bind(removeAttrClass, t, n, o);
};

const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);

const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).$(o);

const createDomTokenListClass = t => domTokenListAttr(t, "class");

const removeClass = (t, n) => {
  createDomTokenListClass(t).O(n);
};

const addClass = (t, n) => {
  createDomTokenListClass(t).C(n);
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

const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;

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
  const n = parseFloat(getStyles(t, C)) || 0;
  const o = parseFloat(getStyles(t, $)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[$] || t[C]));

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
  const [u, d] = sanitizeAxis(o.y, s.y, l);
  return {
    D: {
      x: i,
      y: u
    },
    T: {
      x: a,
      y: d
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

const T = {
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

const M = `data-overlayscrollbars`;

const k = "os-environment";

const R = `${k}-scrollbar-hidden`;

const V = `${M}-initialize`;

const L = "noClipping";

const P = `${M}-body`;

const U = M;

const N = "host";

const q = `${M}-viewport`;

const j = m;

const B = O;

const F = "arrange";

const X = "measuring";

const Y = "scrollbarHidden";

const W = "scrollbarPressed";

const J = "noContent";

const G = `${M}-padding`;

const K = `${M}-content`;

const Q = "os-size-observer";

const Z = `${Q}-appear`;

const tt = `${Q}-listener`;

const nt = `${tt}-scroll`;

const ot = `${tt}-item`;

const st = `${ot}-final`;

const et = "os-trinsic-observer";

const ct = "os-theme-none";

const rt = "os-scrollbar";

const lt = `${rt}-rtl`;

const it = `${rt}-horizontal`;

const at = `${rt}-vertical`;

const ut = `${rt}-track`;

const dt = `${rt}-handle`;

const _t = `${rt}-visible`;

const ft = `${rt}-cornerless`;

const pt = `${rt}-interaction`;

const vt = `${rt}-unusable`;

const ht = `${rt}-auto-hide`;

const gt = `${ht}-hidden`;

const bt = `${rt}-wheel`;

const wt = `${ut}-interactive`;

const yt = `${dt}-interactive`;

let St;

const getNonce = () => St;

const setNonce = t => {
  St = t;
};

let mt;

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
    const o = addClass(t, R);
    try {
      n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const t = `.${k}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${k} div{width:200%;height:200%;margin:10px 0}.${R}{scrollbar-width:none!important}.${R}::-webkit-scrollbar,.${R}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const o = createDOM(`<div class="${k}"><div></div><style>${t}</style></div>`);
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
  const [d] = u();
  const _ = getNativeScrollbarsHiding(s);
  const f = {
    x: d.x === 0,
    y: d.y === 0
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
  const h = assignDeep({}, T);
  const g = bind(assignDeep, {}, h);
  const b = bind(assignDeep, {}, v);
  const w = {
    M: d,
    k: f,
    R: _,
    V: !!p,
    L: bind(l, "r"),
    P: b,
    U: t => assignDeep(v, t) && b(),
    N: g,
    q: t => assignDeep(h, t) && g(),
    j: assignDeep({}, v),
    B: assignDeep({}, h)
  };
  removeAttrs(s, "style");
  removeElements(s);
  addEventListener(n, "resize", (() => {
    i("r", []);
  }));
  if (isFunction(n.matchMedia) && !_ && (!f.x || !f.y)) {
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
      assignDeep(w.M, t);
      i("r", [ n ]);
    }));
  }
  return w;
};

const getEnvironment = () => {
  if (!mt) {
    mt = createEnvironment();
  }
  return mt;
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
  const {k: e, R: c, P: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const d = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!d || !!_;
};

const Ot = new WeakMap;

const addInstance = (t, n) => {
  Ot.set(t, n);
};

const removeInstance = t => {
  Ot.delete(t);
};

const getInstance = t => Ot.get(t);

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
  const {F: c, X: r, Y: l, W: i, J: a, G: u} = s || {};
  const _ = debounce((() => e && o(true)), {
    _: 33,
    p: 99
  });
  const [f, p] = createEventContentChange(t, _, l);
  const v = c || [];
  const h = r || [];
  const g = concat(v, h);
  const observerCallback = (e, c) => {
    if (!isEmptyArray(c)) {
      const r = a || noop;
      const l = u || noop;
      const d = [];
      const _ = [];
      let f = false;
      let v = false;
      each(c, (o => {
        const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: p, removedNodes: g} = o;
        const b = a === "attributes";
        const w = a === "childList";
        const y = t === c;
        const S = b && e;
        const m = S && getAttr(c, e || "");
        const O = isString(m) ? m : null;
        const C = S && u !== O;
        const $ = inArray(h, e) && C;
        if (n && (w || !y)) {
          const n = b && C;
          const a = n && i && is(c, i);
          const _ = a ? !r(c, e, u, O) : !b || n;
          const f = _ && !l(o, !!a, t, s);
          each(p, (t => push(d, t)));
          each(g, (t => push(d, t)));
          v = v || f;
        }
        if (!n && y && C && !r(c, e, u, O)) {
          push(_, e);
          f = f || $;
        }
      }));
      p((t => deduplicateArray(d).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
      if (n) {
        !e && v && o(false);
        return [ false ];
      }
      if (!isEmptyArray(_) || f) {
        const t = [ deduplicateArray(_), f ];
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

const $t = {};

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
    return (i || $t)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => $t[t];

const xt = "__osOptionsValidationPlugin";

const Ht = "__osSizeObserverPlugin";

const Et = /* @__PURE__ */ (() => ({
  [Ht]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${ot}" dir="ltr"><div class="${ot}"><div class="${st}"></div></div><div class="${ot}"><div class="${st}" style="width: 200%; height: 200%"></div></div></div>`);
      const r = c[0];
      const a = r.lastChild;
      const u = r.firstChild;
      const d = u == null ? void 0 : u.firstChild;
      let _ = I(r);
      let f = _;
      let p = false;
      let v;
      const reset = () => {
        scrollElementTo(u, s);
        scrollElementTo(a, s);
      };
      const onResized = t => {
        v = 0;
        if (p) {
          _ = f;
          n(t === true);
        }
      };
      const onScroll = t => {
        f = I(r);
        p = !t || !equalWH(f, _);
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
      addClass(t, nt);
      setStyles(d, {
        [C]: s,
        [$]: s
      });
      i(reset);
      return [ o ? bind(onScroll, false) : reset, h ];
    }
  }
}))();

const getShowNativeOverlaidScrollbars = (t, n) => {
  const {k: o} = n;
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
    K: o,
    Z: {
      x: o.x === E,
      y: o.y === E
    }
  };
};

const zt = "__osScrollbarsHidingPlugin";

const It = /* @__PURE__ */ (() => ({
  [zt]: {
    static: () => ({
      tt: (t, n, o, s, e) => {
        const {nt: c, ot: r} = t;
        const {R: l, k: i, M: a} = s;
        const u = !c && !l && (i.x || i.y);
        const [d] = getShowNativeOverlaidScrollbars(e, s);
        const readViewportOverflowState = () => {
          const getStatePerAxis = t => {
            const n = getStyles(r, t);
            const o = n === E;
            return [ n, o ];
          };
          const [t, n] = getStatePerAxis(m);
          const [o, s] = getStatePerAxis(O);
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
              [y]: 0,
              [S]: 0,
              [w]: 0
            });
            const {st: c, et: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {rt: d} = n;
            const _ = o ? w : y;
            const f = o ? g : h;
            const p = d[_];
            const v = d[S];
            const m = d[f];
            const O = d[b];
            e[C] = `calc(100% + ${u + p * -1}px)`;
            e[_] = -u + p;
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
            const {rt: c} = n;
            const {st: l, et: i} = _getViewportOverflowHideOffset(t);
            const {x: a, y: u} = i;
            const {x: d, y: _} = l;
            const {ct: f} = o;
            const p = f ? h : g;
            const v = c[p];
            const b = c.paddingTop;
            const w = s.w + e.w;
            const y = s.h + e.h;
            const S = {
              w: _ && u ? `${_ + w - v}px` : "",
              h: d && a ? `${d + y - b}px` : ""
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
              assignProps([ S, v, b ]);
            }
            if (i) {
              assignProps([ w, y, g, h ]);
            }
            const d = getStyles(r, keys(a));
            const _ = removeAttrClass(r, q, F);
            setStyles(r, a);
            return [ () => {
              setStyles(r, assignDeep({}, d, _hideNativeScrollbars(s, o, u)));
              _();
            }, s ];
          }
          return [ noop ];
        };
        return {
          lt: _getViewportOverflowHideOffset,
          it: _arrangeViewport,
          ut: _undoViewportArrange,
          dt: _hideNativeScrollbars
        };
      }
    })
  }
}))();

const At = "__osClickScrollPlugin";

const Dt = /* @__PURE__ */ (() => ({
  [At]: {
    static: () => (t, n, o, s, e) => {
      let c = false;
      let r = noop;
      let l = noop;
      const [i, a] = selfClearTimeout(133);
      const animateClickScroll = (r, a, u) => animateNumber(r, r + s * Math.sign(o), a ? 133 : 222, ((o, r, u) => {
        t(o);
        const d = n();
        const _ = d + s;
        const f = e >= d && e <= _;
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
  const {_t: s} = o || {};
  const e = getStaticPluginModuleInstance(Ht);
  const [c] = createCache({
    o: false,
    u: true
  });
  return () => {
    const o = [];
    const r = createDOM(`<div class="${Q}"><div class="${tt}"></div></div>`);
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
          _t: e
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
      push(o, concat([ addClass(l, Z), addEventListener(l, "animationstart", t) ], n));
    } else {
      return noop;
    }
    return bind(runEachAndClear, push(o, appendChildren(t, l)));
  };
};

const createTrinsicObserver = (t, n) => {
  let o;
  const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
  const s = createDiv(et);
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
  const u = `[${U}]`;
  const d = `[${q}]`;
  const _ = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
  const {vt: p, ht: v, ot: h, gt: g, bt: b, nt: w, wt: y, yt: S, St: m} = t;
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
  const O = {
    Ot: false,
    ct: getDirectionIsRTL(p)
  };
  const C = getEnvironment();
  const $ = getStaticPluginModuleInstance(zt);
  const [x] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = $ && $.tt(t, n, O, C, o).ut;
    const e = y && w;
    const c = !e && hasAttrClass(v, U, L);
    const r = !w && S(F);
    const l = r && getElementScroll(g);
    const i = m(X, c);
    const a = r && s && s()[0];
    const u = D(h);
    const d = getFractionalSize(h);
    a && a();
    scrollElementTo(g, l);
    c && i();
    return {
      w: u.w + d.w,
      h: u.h + d.h
    };
  }));
  const H = debounce(s, {
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
    assignDeep(O, {
      ct: n
    });
    a = n;
  };
  const onTrinsicChanged = (t, n) => {
    const [o, e] = t;
    const c = {
      $t: e
    };
    assignDeep(O, {
      Ot: o
    });
    !n && s(c);
    return c;
  };
  const onSizeChanged = ({ft: t, _t: n}) => {
    const o = t && !n;
    const e = !o && C.R ? H : s;
    const c = {
      ft: t || n,
      _t: n
    };
    setDirection(c);
    e(c);
  };
  const onContentMutation = (t, n) => {
    const [, o] = x();
    const e = {
      xt: o
    };
    setDirection(e);
    const c = t ? s : H;
    o && !n && c(e);
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      Ht: n
    };
    setDirection(s);
    if (n && !o) {
      H(s);
    }
    return s;
  };
  const [E, z] = b ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const I = !w && createSizeObserver(v, onSizeChanged, {
    _t: true
  });
  const [A, T] = createDOMObserver(v, false, onHostMutation, {
    X: _,
    F: _
  });
  const M = w && f && new f((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      ft: true,
      _t: domRectAppeared(n, i)
    });
    i = n;
  }));
  const k = debounce((() => {
    const [, t] = x();
    s({
      xt: t
    });
  }), {
    _: 222,
    v: true
  });
  return [ () => {
    M && M.observe(v);
    const t = I && I();
    const n = E && E();
    const o = A();
    const s = C.L((t => {
      if (t) {
        H({
          Et: t
        });
      } else {
        k();
      }
    }));
    return () => {
      M && M.disconnect();
      t && t();
      n && n();
      l && l();
      o();
      s();
    };
  }, ({zt: t, It: n, At: o}) => {
    const s = {};
    const [i] = t("update.ignoreMutation");
    const [a, f] = t("update.attributes");
    const [p, v] = t("update.elementEvents");
    const [g, y] = t("update.debounce");
    const S = v || f;
    const m = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (S) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(b || h, true, onContentMutation, {
        F: concat(_, a || []),
        Y: p,
        W: u,
        G: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !w ? liesBetween(o, u, d) : false;
          return e || !!closest(o, `.${rt}`) || !!ignoreMutationFromOptions(t);
        }
      });
      l = t();
      r = n;
    }
    if (y) {
      H.m();
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
      const n = z && z();
      const o = r && r();
      t && assignDeep(s, onHostMutation(t[0], t[1], m));
      n && assignDeep(s, onTrinsicChanged(n[0], m));
      o && assignDeep(s, onContentMutation(o[0], m));
    }
    setDirection(s);
    return s;
  }, O ];
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const e = "--os-viewport-percent";
  const c = "--os-scroll-percent";
  const r = "--os-scroll-direction";
  const {P: l} = getEnvironment();
  const {scrollbars: i} = l();
  const {slot: a} = i;
  const {vt: u, ht: d, ot: _, Dt: f, gt: v, wt: h, nt: g} = n;
  const {scrollbars: b} = f ? {} : t;
  const {slot: w} = b || {};
  const y = [];
  const S = [];
  const m = [];
  const O = dynamicInitializationElement([ u, d, _ ], (() => g && h ? u : d), a, w);
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
        Mt: _addScrollPercentAnimation
      };
    }
  };
  const C = {
    x: initScrollTimeline("x"),
    y: initScrollTimeline("y")
  };
  const getViewportPercent = () => {
    const {kt: t, Rt: n} = o;
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
      const {Vt: t} = o;
      const n = getScrollCoordinatesPercent(t, getElementScroll(v));
      const createScrollbarStyleFn = t => n => [ n.Tt, {
        [c]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
    }
  };
  const refreshScrollbarsScrollCoordinates = () => {
    const {Vt: t} = o;
    const n = isDefaultDirectionScrollCoordinates(t);
    const createScrollbarStyleFn = t => n => [ n.Tt, {
      [r]: t ? "0" : "1"
    } ];
    scrollbarStyle(S, createScrollbarStyleFn(n.x));
    scrollbarStyle(m, createScrollbarStyleFn(n.y));
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (g && !h) {
      const {kt: t, Vt: n} = o;
      const s = isDefaultDirectionScrollCoordinates(n);
      const e = getScrollCoordinatesPercent(n, getElementScroll(v));
      const styleScrollbarPosition = n => {
        const {Tt: o} = n;
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
    const o = t ? it : at;
    const e = createDiv(`${rt} ${o}`);
    const c = createDiv(ut);
    const r = createDiv(dt);
    const l = {
      Tt: e,
      Lt: c,
      Pt: r
    };
    const i = C[n];
    push(t ? S : m, l);
    push(y, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), i && i.Mt(l), s(l, scrollbarsAddRemoveClass, t) ]);
    return l;
  };
  const $ = bind(generateScrollbarDOM, true);
  const x = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(O, S[0].Tt);
    appendChildren(O, m[0].Tt);
    return bind(runEachAndClear, y);
  };
  $();
  x();
  return [ {
    Ut: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    qt: refreshScrollbarsScrollCoordinates,
    jt: refreshScrollbarsScrollbarOffset,
    Bt: scrollbarsAddRemoveClass,
    Ft: {
      Xt: S,
      Yt: $,
      Wt: bind(scrollbarStyle, S)
    },
    Jt: {
      Xt: m,
      Yt: x,
      Wt: bind(scrollbarStyle, m)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => (r, l, i) => {
  const {ht: u, ot: d, nt: _, gt: f, Gt: p, St: v} = n;
  const {Tt: h, Lt: g, Pt: b} = r;
  const [w, y] = selfClearTimeout(333);
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
    const r = i ? C : $;
    const l = i ? "left" : "top";
    const a = i ? "w" : "h";
    const u = i ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {kt: e} = o;
      const c = I(g)[a] - I(b)[a];
      const r = n * s / c;
      const l = r * e[u];
      scrollElementTo(f, {
        [u]: t + l
      });
    };
    const d = [];
    return addEventListener(g, "pointerdown", (o => {
      const i = closest(o.target, `.${dt}`) === b;
      const _ = i ? b : g;
      const h = t.scrollbars;
      const {button: w, isPrimary: y, pointerType: O} = o;
      const {pointers: C} = h;
      const $ = w === 0 && y && h[i ? "dragScroll" : "clickScroll"] && (C || []).includes(O);
      if ($) {
        runEachAndClear(d);
        m();
        const t = !i && o.shiftKey;
        const h = bind(getBoundingClientRect, b);
        const w = bind(getBoundingClientRect, g);
        const getHandleOffset = (t, n) => (t || h())[l] - (n || w())[l];
        const y = e(getBoundingClientRect(f)[r]) / I(f)[a] || 1;
        const O = createRelativeHandleMove(getElementScroll(f)[u], 1 / y);
        const C = o[s];
        const $ = h();
        const x = w();
        const H = $[r];
        const E = getHandleOffset($, x) + H / 2;
        const z = C - x[l];
        const A = i ? 0 : z - E;
        const releasePointerCapture = t => {
          runEachAndClear(T);
          _.releasePointerCapture(t.pointerId);
        };
        const addScrollbarPressedClass = () => v(W, true);
        const D = addScrollbarPressedClass();
        const T = [ () => {
          const t = getElementScroll(f);
          D();
          const n = getElementScroll(f);
          const o = {
            x: n.x - t.x,
            y: n.y - t.y
          };
          if (c(o.x) > 3 || c(o.y) > 3) {
            addScrollbarPressedClass();
            scrollElementTo(f, t);
            scrollOffsetElementScrollBy(o);
            S(D);
          }
        }, addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
          H: false
        }), addEventListener(g, n, releasePointerCapture), addEventListener(g, "pointermove", (n => {
          const o = n[s] - C;
          if (i || t) {
            O(A + o);
          }
        })) ];
        _.setPointerCapture(o.pointerId);
        if (t) {
          O(A);
        } else if (!i) {
          const t = getStaticPluginModuleInstance(At);
          if (t) {
            const n = t(O, getHandleOffset, A, H, z);
            push(T, bind(n));
            push(d, bind(n, true));
          }
        }
      }
    }));
  };
  let O = true;
  return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s), addEventListener(h, "pointerenter", (() => {
    l(pt, true);
  })), addEventListener(h, "pointerleave pointercancel", (() => {
    l(pt, false);
  })), !_ && addEventListener(h, "mousedown", (() => {
    const t = getFocusedElement();
    if (hasAttr(t, q) || hasAttr(t, U) || t === document.body) {
      a(bind(focusElement, d), 25);
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
    l(bt, true);
    w((() => {
      O = true;
      l(bt);
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
  }), createInteractiveScrollEvents(), y, m ]);
};

const createScrollbarsSetup = (t, n, o, s, e, c) => {
  let r;
  let l;
  let i;
  let a;
  let u;
  let d = noop;
  let _ = 0;
  const isHoverablePointerType = t => t.pointerType === "mouse";
  const [f, p] = selfClearTimeout();
  const [v, h] = selfClearTimeout(100);
  const [g, b] = selfClearTimeout(100);
  const [w, y] = selfClearTimeout((() => _));
  const [S, m] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
  const {ht: O, Kt: C, wt: $} = e;
  const {Bt: H, Ut: z, Nt: I, qt: A, jt: D} = S;
  const manageScrollbarsAutoHide = (t, n) => {
    y();
    if (t) {
      H(gt);
    } else {
      const t = bind(H, gt, true);
      if (_ > 0 && !n) {
        w(t);
      } else {
        t();
      }
    }
  };
  const manageScrollbarsAutoHideInstantInteraction = () => {
    if (i ? !r : !a) {
      manageScrollbarsAutoHide(true);
      v((() => {
        manageScrollbarsAutoHide(false);
      }));
    }
  };
  const manageAutoHideSuspension = t => {
    H(ht, t, true);
    H(ht, t, false);
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      r = i;
      i && manageScrollbarsAutoHide(true);
    }
  };
  const T = [ y, h, b, p, () => d(), addEventListener(O, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener(O, "pointerenter", onHostMouseEnter), addEventListener(O, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      r = false;
      i && manageScrollbarsAutoHide(false);
    }
  })), addEventListener(O, "pointermove", (t => {
    isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
  })), addEventListener(C, "scroll", (t => {
    f((() => {
      I();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    D();
  })) ];
  return [ () => bind(runEachAndClear, push(T, m())), ({zt: t, At: n, Qt: e, Zt: c}) => {
    const {tn: r, nn: f, sn: p, en: v} = c || {};
    const {Ct: h, _t: b} = e || {};
    const {ct: w} = o;
    const {k: y} = getEnvironment();
    const {K: S, cn: m} = s;
    const [O, T] = t("showNativeOverlaidScrollbars");
    const [M, k] = t("scrollbars.theme");
    const [R, V] = t("scrollbars.visibility");
    const [L, P] = t("scrollbars.autoHide");
    const [U, N] = t("scrollbars.autoHideSuspend");
    const [q] = t("scrollbars.autoHideDelay");
    const [j, B] = t("scrollbars.dragScroll");
    const [F, X] = t("scrollbars.clickScroll");
    const [Y, W] = t("overflow");
    const J = b && !n;
    const G = m.x || m.y;
    const K = r || f || v || h || n;
    const Q = p || V || W;
    const Z = O && y.x && y.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(E) && (R === x || R === "auto" && n === E);
      H(_t, s, o);
      return s;
    };
    _ = q;
    if (J) {
      if (U && G) {
        manageAutoHideSuspension(false);
        d();
        g((() => {
          d = addEventListener(C, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if (T) {
      H(ct, Z);
    }
    if (k) {
      H(u);
      H(M, true);
      u = M;
    }
    if (N && !U) {
      manageAutoHideSuspension(true);
    }
    if (P) {
      l = L === "move";
      i = L === "leave";
      a = L === "never";
      manageScrollbarsAutoHide(a, true);
    }
    if (B) {
      H(yt, j);
    }
    if (X) {
      H(wt, F);
    }
    if (Q) {
      const t = setScrollbarVisibility(Y.x, S.x, true);
      const n = setScrollbarVisibility(Y.y, S.y, false);
      const o = t && n;
      H(ft, !o);
    }
    if (K) {
      I();
      z();
      D();
      v && A();
      H(vt, !m.x, true);
      H(vt, !m.y, false);
      H(lt, w && !$);
    }
  }, {}, S ];
};

const createStructureSetupElements = t => {
  const o = getEnvironment();
  const {P: s, R: e} = o;
  const {elements: c} = s();
  const {padding: r, viewport: l, content: i} = c;
  const a = isHTMLElement(t);
  const u = a ? {} : t;
  const {elements: d} = u;
  const {padding: _, viewport: f, content: p} = d || {};
  const v = a ? t : u.target;
  const h = isBodyElement(v);
  const g = v.ownerDocument;
  const b = g.documentElement;
  const getDocumentWindow = () => g.defaultView || n;
  const w = bind(staticInitializationElement, [ v ]);
  const y = bind(dynamicInitializationElement, [ v ]);
  const S = bind(createDiv, "");
  const C = bind(w, S, l);
  const $ = bind(y, S, i);
  const elementHasOverflow = t => {
    const n = I(t);
    const o = D(t);
    const s = getStyles(t, m);
    const e = getStyles(t, O);
    return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
  };
  const x = C(f);
  const H = x === v;
  const E = H && h;
  const z = !H && $(p);
  const A = !H && x === z;
  const T = E ? b : x;
  const M = E ? T : v;
  const k = !H && y(S, r, _);
  const R = !A && z;
  const L = [ R, T, k, M ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(L, t);
  const j = !elementIsGenerated(T) && elementHasOverflow(T) ? T : v;
  const B = {
    vt: v,
    ht: M,
    ot: T,
    rn: k,
    bt: R,
    gt: E ? b : T,
    Kt: E ? g : T,
    ln: h ? b : j,
    Gt: g,
    wt: h,
    Dt: a,
    nt: H,
    an: getDocumentWindow,
    yt: t => hasAttrClass(T, q, t),
    St: (t, n) => addRemoveAttrClass(T, q, t, n)
  };
  const {vt: F, ht: X, rn: W, ot: J, bt: Q} = B;
  const Z = [ () => {
    removeAttrs(X, [ U, V ]);
    removeAttrs(F, V);
    if (h) {
      removeAttrs(b, [ V, U ]);
    }
  } ];
  let tt = contents([ Q, J, W, X, F ].find((t => t && !elementIsGenerated(t))));
  const nt = E ? F : Q || J;
  const ot = bind(runEachAndClear, Z);
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
    setAttrs(X, U, H ? "" : N);
    setAttrs(W, G, "");
    setAttrs(J, q, "");
    setAttrs(Q, K, "");
    if (!H) {
      setAttrs(J, o, s || "-1");
      h && setAttrs(b, P, "");
    }
    appendChildren(nt, tt);
    appendChildren(X, W);
    appendChildren(W || X, !H && J);
    appendChildren(J, Q);
    push(Z, [ c, () => {
      const t = getFocusedElement();
      const n = elementIsGenerated(J);
      const e = n && t === J ? F : t;
      const c = prepareWrapUnwrapFocus(e);
      removeAttrs(W, G);
      removeAttrs(Q, K);
      removeAttrs(J, q);
      h && removeAttrs(b, P);
      s ? setAttrs(J, o, s) : removeAttrs(J, o);
      elementIsGenerated(Q) && unwrap(Q);
      n && unwrap(J);
      elementIsGenerated(W) && unwrap(W);
      focusElement(e);
      c();
    } ]);
    if (e && !H) {
      addAttrClass(J, q, Y);
      push(Z, bind(removeAttrs, J, q));
    }
    focusElement(!H && h && n === F && t.top === t ? J : n);
    c();
    tt = 0;
    return ot;
  };
  return [ B, appendElements, ot ];
};

const createTrinsicUpdateSegment = ({bt: t}) => ({Qt: n, un: o, At: s}) => {
  const {$t: e} = n || {};
  const {Ot: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [$]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({ht: t, rn: n, ot: o, nt: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({zt: t, Qt: l, un: i, At: a}) => {
    let [u, d] = r(a);
    const {R: _} = getEnvironment();
    const {ft: f, xt: p, Ct: m} = l || {};
    const {ct: O} = i;
    const [$, x] = t("paddingAbsolute");
    const H = a || p;
    if (f || d || H) {
      [u, d] = c(a);
    }
    const E = !s && (x || m || d);
    if (E) {
      const t = !$ || !n && !_;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [y]: t && !O ? -s : 0,
        [S]: t ? -c : 0,
        [w]: t && O ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? O ? -u.r : "auto" : 0,
        left: t ? O ? "auto" : -u.l : 0,
        [C]: t && `calc(100% + ${s}px)`
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
        rn: u,
        dn: !t,
        rt: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      _n: E
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {ht: c, rn: r, ot: l, nt: a, Kt: u, gt: d, wt: _, St: f, an: p} = t;
  const {R: v} = e;
  const h = _ && a;
  const g = bind(o, 0);
  const b = [ "display", "direction", "flexDirection", "writingMode" ];
  const w = {
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const y = {
    i: equalXY,
    o: {}
  };
  const setMeasuringMode = t => {
    f(X, !h && t);
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
  const [S, m] = createCache(w, bind(getFractionalSize, l));
  const [O, C] = createCache(w, bind(D, l));
  const [$, z] = createCache(w);
  const [I] = createCache(y);
  const [T, M] = createCache(w);
  const [k] = createCache(y);
  const [R] = createCache({
    i: (t, n) => equal(t, n, b),
    o: {}
  }, (() => hasDimensions(l) ? getStyles(l, b) : {}));
  const [V, P] = createCache({
    i: (t, n) => equalXY(t.D, n.D) && equalXY(t.T, n.T),
    o: getZeroScrollCoordinates()
  }, (() => {
    setMeasuringMode(true);
    const t = getElementScroll(d);
    const n = f(J, true);
    const o = addEventListener(u, E, (n => {
      const o = getElementScroll(d);
      if (n.isTrusted && o.x === t.x && o.y === t.y) {
        stopPropagation(n);
      }
    }), {
      I: true,
      A: true
    });
    scrollElementTo(d, {
      x: 0,
      y: 0
    });
    n();
    const s = getElementScroll(d);
    const e = D(d);
    scrollElementTo(d, {
      x: e.w,
      y: e.h
    });
    const c = getElementScroll(d);
    scrollElementTo(d, {
      x: c.x - s.x < 1 && -e.w,
      y: c.y - s.y < 1 && -e.h
    });
    const r = getElementScroll(d);
    scrollElementTo(d, t);
    i((() => o()));
    return {
      D: s,
      T: r
    };
  }));
  const N = getStaticPluginModuleInstance(zt);
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? j : B;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  const setViewportOverflowStyle = t => {
    const createAllOverflowStyleClassNames = t => [ x, H, E ].map((n => createViewportOverflowStyleClassName(n, t)));
    const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
    f(n);
    f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
  };
  return ({zt: n, Qt: o, un: i, At: a}, {_n: u}) => {
    const {ft: d, xt: _, Ct: b, _t: w, Et: y} = o || {};
    const x = N && N.tt(t, s, i, e, n);
    const {it: H, ut: E, dt: D} = x || {};
    const [q, j] = getShowNativeOverlaidScrollbars(n, e);
    const [B, F] = n("overflow");
    const X = overflowIsVisible(B.x);
    const W = overflowIsVisible(B.y);
    const J = true;
    let K = m(a);
    let Q = C(a);
    let Z = z(a);
    let tt = M(a);
    if (j && v) {
      f(Y, !q);
    }
    {
      if (hasAttrClass(c, U, L)) {
        setMeasuringMode(true);
      }
      const [t] = E ? E() : [];
      const [n] = K = S(a);
      const [o] = Q = O(a);
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
      Z = $(getOverflowAmount(r, i), a);
    }
    const [nt, ot] = tt;
    const [st, et] = Z;
    const [ct, rt] = Q;
    const [lt, it] = K;
    const [at, ut] = I({
      x: st.w > 0,
      y: st.h > 0
    });
    const dt = X && W && (at.x || at.y) || X && at.x && !at.y || W && at.y && !at.x;
    const _t = u || b || y || it || rt || ot || et || F || j || J;
    const ft = createViewportOverflowState(at, B);
    const [pt, vt] = k(ft.K);
    const [, ht] = R(a);
    const gt = b || w || ht || ut || a;
    const [bt, wt] = gt ? V(a) : P();
    if (_t) {
      vt && setViewportOverflowStyle(ft.K);
      if (D && H) {
        setStyles(l, D(ft, i, H(ft, ct, lt)));
      }
    }
    setMeasuringMode(false);
    addRemoveAttrClass(c, U, L, dt);
    addRemoveAttrClass(r, G, L, dt);
    assignDeep(s, {
      K: pt,
      Rt: {
        x: nt.w,
        y: nt.h
      },
      kt: {
        x: st.w,
        y: st.h
      },
      cn: at,
      Vt: sanitizeScrollCoordinates(bt, st)
    });
    return {
      sn: vt,
      tn: ot,
      nn: et,
      en: wt || et,
      fn: gt
    };
  };
};

const createStructureSetup = t => {
  const [n, o, s] = createStructureSetupElements(t);
  const e = {
    rn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: false,
    rt: {
      [y]: 0,
      [S]: 0,
      [w]: 0,
      [v]: 0,
      [h]: 0,
      [b]: 0,
      [g]: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    kt: {
      x: 0,
      y: 0
    },
    K: {
      x: H,
      y: H
    },
    cn: {
      x: false,
      y: false
    },
    Vt: getZeroScrollCoordinates()
  };
  const {vt: c, gt: r, nt: l} = n;
  const {R: i, k: a} = getEnvironment();
  const u = !i && (a.x || a.y);
  const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
  return [ o, t => {
    const n = {};
    const o = u;
    const s = o && getElementScroll(r);
    each(d, (o => {
      assignDeep(n, o(t, n) || {});
    }));
    scrollElementTo(r, s);
    !l && scrollElementTo(c, 0);
    return n;
  }, e, n, s ];
};

const createSetups = (t, n, o, s, e) => {
  let c = false;
  const r = createOptionCheck(n, {});
  const [l, i, a, u, d] = createStructureSetup(t);
  const [_, f, p] = createObserversSetup(u, a, r, (t => {
    update({}, t);
  }));
  const [v, h, , g] = createScrollbarsSetup(t, n, p, a, u, e);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, e) => {
    if (o()) {
      return false;
    }
    const {pn: r, At: l, It: a, vn: u} = t;
    const d = r || {};
    const _ = !!l || !c;
    const v = {
      zt: createOptionCheck(n, d, _),
      pn: d,
      At: _
    };
    if (u) {
      h(v);
      return false;
    }
    const g = e || f(assignDeep({}, v, {
      It: a
    }));
    const b = i(assignDeep({}, v, {
      un: p,
      Qt: g
    }));
    h(assignDeep({}, v, {
      Qt: g,
      Zt: b
    }));
    const w = updateHintsAreTruthy(g);
    const y = updateHintsAreTruthy(b);
    const S = w || y || !isEmptyObject(d) || _;
    c = true;
    S && s(t, {
      Qt: g,
      Zt: b
    });
    return S;
  };
  return [ () => {
    const {ln: t, gt: n} = u;
    const o = getElementScroll(t);
    const s = [ _(), l(), v() ];
    scrollElementTo(n, o);
    return bind(runEachAndClear, s);
  }, update, () => ({
    hn: p,
    gn: a
  }), {
    bn: u,
    wn: g
  }, d ];
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
      const o = getStaticPluginModuleInstance(xt);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, d, _] = createEventListenerHub();
    const [f, p, v] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      v(t, n);
      _(t, n);
    };
    const [h, g, b, w, y] = createSetups(t, a, (() => r), (({pn: t, At: n}, {Qt: o, Zt: s}) => {
      const {ft: e, Ct: c, $t: r, xt: l, Ht: i, _t: a} = o;
      const {tn: u, nn: d, sn: _, en: f} = s;
      triggerEvent("updated", [ S, {
        updateHints: {
          sizeChanged: !!e,
          directionChanged: !!c,
          heightIntrinsicChanged: !!r,
          overflowEdgeChanged: !!u,
          overflowAmountChanged: !!d,
          overflowStyleChanged: !!_,
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
      d();
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
              pn: e
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
        const {hn: t, gn: n} = b();
        const {ct: o} = t;
        const {Rt: s, kt: e, K: c, cn: l, rn: i, dn: a, Vt: u} = n;
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
        const {vt: t, ht: n, rn: o, ot: s, bt: e, gt: c, Kt: r} = w.bn;
        const {Ft: l, Jt: i} = w.wn;
        const translateScrollbarStructure = t => {
          const {Pt: n, Lt: o, Tt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Xt: n, Yt: o} = t;
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
        At: t,
        It: true
      }),
      destroy: bind(destroy, false),
      plugin: t => i[keys(t)[0]]
    };
    push(l, [ y ]);
    addInstance(c, S);
    registerPluginModuleInstances(Ct, OverlayScrollbars, [ S, u, i ]);
    if (cancelInitialization(w.bn.wt, !e && t.cancel)) {
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
  const {M: t, k: n, R: o, V: s, j: e, B: c, P: r, U: l, N: i, q: a} = getEnvironment();
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

exports.ClickScrollPlugin = Dt;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = It;

exports.SizeObserverPlugin = Et;
//# sourceMappingURL=overlayscrollbars.cjs.map
