/*!
 * OverlayScrollbars
 * Version: 2.8.3
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

const t = typeof window !== "undefined" && typeof document !== "undefined";

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

const v = t && Node.ELEMENT_NODE;

const {toString: h, hasOwnProperty: g} = Object.prototype;

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

const isPlainObject = t => {
  if (!t || !isObject(t)) {
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
  return t ? n ? t instanceof n : t.nodeType === v : false;
};

const isElement = t => {
  const n = Element;
  return t ? n ? t instanceof n : t.nodeType === v : false;
};

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

const createOrKeepArray = t => isArray(t) ? t : [ t ];

const isEmptyArray = t => !!t && !t.length;

const deduplicateArray = t => from(new Set(t));

const runEachAndClear = (t, n, o) => {
  const runFn = t => t && t.apply(void 0, n || []);
  each(t, runFn);
  !o && (t.length = 0);
};

const b = "paddingTop";

const w = "paddingRight";

const y = "paddingLeft";

const m = "paddingBottom";

const S = "marginLeft";

const O = "marginRight";

const $ = "marginBottom";

const x = "overflowX";

const C = "overflowY";

const H = "width";

const E = "height";

const z = "visible";

const I = "hidden";

const A = "scroll";

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
  const {_: o, p: s, v: e, m: c} = n || {};
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
      let m;
      p();
      if (e && !f) {
        y();
        f = true;
        m = h((() => f = void 0), n);
      } else {
        m = h(y, n);
        if (c && !r) {
          r = a(flush, o);
        }
      }
      p = () => g(m);
      d = _ = w;
    } else {
      v(t);
    }
  };
  h.S = flush;
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

const isEmptyObject = t => {
  for (const n in t) {
    return false;
  }
  return true;
};

const capNumber = (t, n, e) => o(t, s(n, e));

const getDomTokensArray = t => from(new Set((isArray(t) ? t : (t || "").split(" ")).filter((t => t))));

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
  t && n && each(n, ((n, o) => {
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

const D = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : D;

const getWindowSize = t => getElmWidthHeightProperty("inner", t || n);

const k = bind(getElmWidthHeightProperty, "offset");

const M = bind(getElmWidthHeightProperty, "client");

const R = bind(getElmWidthHeightProperty, "scroll");

const getFractionalSize = t => {
  const n = parseFloat(getStyles(t, H)) || 0;
  const o = parseFloat(getStyles(t, E)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[E] || t[H]));

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
  T: {
    x: 0,
    y: 0
  },
  D: {
    x: 0,
    y: 0
  }
});

const sanitizeScrollCoordinates = (t, n) => {
  const {T: o, D: s} = t;
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
    T: {
      x: i,
      y: u
    },
    D: {
      x: a,
      y: d
    }
  };
};

const isDefaultDirectionScrollCoordinates = ({T: t, D: n}) => {
  const getAxis = (t, n) => t === 0 && t <= n;
  return {
    x: getAxis(t.x, n.x),
    y: getAxis(t.y, n.y)
  };
};

const getScrollCoordinatesPercent = ({T: t, D: n}, o) => {
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

const V = {
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

const L = `data-overlayscrollbars`;

const P = "os-environment";

const U = `${P}-scrollbar-hidden`;

const N = `${L}-initialize`;

const q = "noClipping";

const j = `${L}-body`;

const B = L;

const F = "host";

const X = `${L}-viewport`;

const Y = x;

const W = C;

const J = "arrange";

const K = "measuring";

const G = "scrollbarHidden";

const Q = "scrollbarPressed";

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

const dt = `${ut}-rtl`;

const _t = `${ut}-horizontal`;

const ft = `${ut}-vertical`;

const pt = `${ut}-track`;

const vt = `${ut}-handle`;

const ht = `${ut}-visible`;

const gt = `${ut}-cornerless`;

const bt = `${ut}-interaction`;

const wt = `${ut}-unusable`;

const yt = `${ut}-auto-hide`;

const mt = `${yt}-hidden`;

const St = `${ut}-wheel`;

const Ot = `${pt}-interactive`;

const $t = `${vt}-interactive`;

let xt;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o) => {
    appendChildren(document.body, t);
    appendChildren(document.body, t);
    const s = M(t);
    const e = k(t);
    const c = getFractionalSize(n);
    o && removeElements(t);
    return {
      x: e.h - s.h + c.h,
      y: e.w - s.w + c.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, U);
    try {
      n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const t = `.${P}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${P} div{width:200%;height:200%;margin:10px 0}.${U}{scrollbar-width:none!important}.${U}::-webkit-scrollbar,.${U}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const o = createDOM(`<div class="${P}"><div></div><style>${t}</style></div>`);
  const s = o[0];
  const e = s.firstChild;
  const [c, , r] = createEventListenerHub();
  const [l, i] = createCache({
    o: getNativeScrollbarSize(s, e),
    i: equalXY
  }, bind(getNativeScrollbarSize, s, e, true));
  const [a] = i();
  const u = getNativeScrollbarsHiding(s);
  const d = {
    x: a.x === 0,
    y: a.y === 0
  };
  const _ = {
    elements: {
      host: null,
      padding: !u,
      viewport: t => u && isBodyElement(t) && t,
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
  const f = assignDeep({}, V);
  const v = bind(assignDeep, {}, f);
  const h = bind(assignDeep, {}, _);
  const g = {
    k: a,
    M: d,
    R: u,
    V: !!p,
    L: bind(c, "r"),
    P: h,
    U: t => assignDeep(_, t) && h(),
    N: v,
    q: t => assignDeep(f, t) && v(),
    j: assignDeep({}, _),
    B: assignDeep({}, f)
  };
  removeAttrs(s, "style");
  removeElements(s);
  addEventListener(n, "resize", (() => {
    r("r", []);
  }));
  if (isFunction(n.matchMedia) && !u && (!d.x || !d.y)) {
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
      const [t, n] = l();
      assignDeep(g.k, t);
      r("r", [ n ]);
    }));
  }
  return g;
};

const getEnvironment = () => {
  if (!xt) {
    xt = createEnvironment();
  }
  return xt;
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
  const {M: e, R: c, P: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const d = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!d || !!_;
};

const Ct = new WeakMap;

const addInstance = (t, n) => {
  Ct.set(t, n);
};

const removeInstance = t => {
  Ct.delete(t);
};

const getInstance = t => Ct.get(t);

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
  const {F: c, X: r, Y: l, W: i, J: a, K: u} = s || {};
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
        const m = b && e;
        const S = m && getAttr(c, e || "");
        const O = isString(S) ? S : null;
        const $ = m && u !== O;
        const x = inArray(h, e) && $;
        if (n && (w || !y)) {
          const n = b && $;
          const a = n && i && is(c, i);
          const _ = a ? !r(c, e, u, O) : !b || n;
          const f = _ && !l(o, !!a, t, s);
          each(p, (t => push(d, t)));
          each(g, (t => push(d, t)));
          v = v || f;
        }
        if (!n && y && $ && !r(c, e, u, O)) {
          push(_, e);
          f = f || x;
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
      _.S();
      return observerCallback(true, b.takeRecords());
    }
  } ];
};

const Ht = {};

const Et = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    Ht[o] = t[o];
  }))));
};

const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
  const {static: e, instance: c} = t[s];
  const [r, l, i] = o || [];
  const a = o ? c : e;
  if (a) {
    const t = o ? a(r, l, n) : a(n);
    return (i || Et)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => Et[t];

const zt = "__osOptionsValidationPlugin";

const It = "__osSizeObserverPlugin";

const At = /* @__PURE__ */ (() => ({
  [It]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${rt}" dir="ltr"><div class="${rt}"><div class="${lt}"></div></div><div class="${rt}"><div class="${lt}" style="width: 200%; height: 200%"></div></div></div>`);
      const r = c[0];
      const a = r.lastChild;
      const u = r.firstChild;
      const d = u == null ? void 0 : u.firstChild;
      let _ = k(r);
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
        f = k(r);
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
      addClass(t, ct);
      setStyles(d, {
        [H]: s,
        [E]: s
      });
      i(reset);
      return [ o ? bind(onScroll, false) : reset, h ];
    }
  }
}))();

const getShowNativeOverlaidScrollbars = (t, n) => {
  const {M: o} = n;
  const [s, e] = t("showNativeOverlaidScrollbars");
  return [ s && o.x && o.y, e ];
};

const overflowIsVisible = t => t.indexOf(z) === 0;

const createViewportOverflowState = (t, n) => {
  const getAxisOverflowStyle = (t, n, o, s) => {
    const e = t === z ? I : t.replace(`${z}-`, "");
    const c = overflowIsVisible(t);
    const r = overflowIsVisible(o);
    if (!n && !s) {
      return I;
    }
    if (c && r) {
      return z;
    }
    if (c) {
      const t = n ? z : I;
      return n && s ? e : t;
    }
    const l = r && s ? z : I;
    return n ? e : l;
  };
  const o = {
    x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
    y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
  };
  return {
    G: o,
    Z: {
      x: o.x === A,
      y: o.y === A
    }
  };
};

const Tt = "__osScrollbarsHidingPlugin";

const Dt = /* @__PURE__ */ (() => ({
  [Tt]: {
    static: () => ({
      tt: (t, n, o, s, e) => {
        const {nt: c, ot: r} = t;
        const {R: l, M: i, k: a} = s;
        const u = !c && !l && (i.x || i.y);
        const [d] = getShowNativeOverlaidScrollbars(e, s);
        const readViewportOverflowState = () => {
          const getStatePerAxis = t => {
            const n = getStyles(r, t);
            const o = n === A;
            return [ n, o ];
          };
          const [t, n] = getStatePerAxis(x);
          const [o, s] = getStatePerAxis(C);
          return {
            G: {
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
              [O]: 0,
              [$]: 0,
              [S]: 0
            });
            const {st: c, et: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {rt: d} = n;
            const _ = o ? S : O;
            const f = o ? y : w;
            const p = d[_];
            const v = d[$];
            const h = d[f];
            const g = d[m];
            e[H] = `calc(100% + ${u + p * -1}px)`;
            e[_] = -u + p;
            e[$] = -a + v;
            if (s) {
              e[f] = h + (i ? u : 0);
              e[m] = g + (l ? a : 0);
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
            const p = f ? w : y;
            const v = c[p];
            const h = c.paddingTop;
            const g = s.w + e.w;
            const b = s.h + e.h;
            const m = {
              w: _ && u ? `${_ + g - v}px` : "",
              h: d && a ? `${d + b - h}px` : ""
            };
            setStyles(r, {
              "--os-vaw": m.w,
              "--os-vah": m.h
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
              assignProps([ $, b, m ]);
            }
            if (i) {
              assignProps([ S, O, y, w ]);
            }
            const d = getStyles(r, keys(a));
            const _ = removeAttrClass(r, X, J);
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

const kt = "__osClickScrollPlugin";

const Mt = /* @__PURE__ */ (() => ({
  [kt]: {
    static: () => (t, n, o, s, e) => {
      let c = 0;
      let r = noop;
      const animateClickScroll = l => {
        r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
          t(o);
          const u = n();
          const d = u + s;
          const _ = e >= u && e <= d;
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

const createSizeObserver = (t, n, o) => {
  const {_t: s} = o || {};
  const e = getStaticPluginModuleInstance(It);
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
      push(o, concat([ addClass(l, st), addEventListener(l, "animationstart", t) ], n));
    } else {
      return noop;
    }
    return bind(runEachAndClear, push(o, appendChildren(t, l)));
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
  const u = `[${B}]`;
  const d = `[${X}]`;
  const _ = [];
  const p = [ "wrap", "cols", "rows" ];
  const v = [ "id", "class", "style", "open" ];
  const {vt: h, ht: g, ot: b, gt: w, bt: y, wt: m, nt: S, yt: O, St: $, Ot: x} = t;
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
  const C = {
    $t: false,
    ct: getDirectionIsRTL(h)
  };
  const H = getEnvironment();
  const E = getStaticPluginModuleInstance(Tt);
  const [z] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = E && E.tt(t, n, C, H, o).ut;
    const e = O && S;
    const c = !e && hasAttrClass(g, B, q);
    const r = !S && $(J);
    const l = r && getElementScroll(w);
    const i = x(K, c);
    const a = r && s && s()[0];
    const u = R(b);
    const d = getFractionalSize(b);
    a && a();
    scrollElementTo(w, l);
    c && i();
    return {
      w: u.w + d.w,
      h: u.h + d.h
    };
  }));
  const I = m ? p : concat(v, p);
  const A = debounce(s, {
    _: () => e,
    p: () => c,
    m(t, n) {
      const [o] = t;
      const [s] = n;
      return [ concat(keys(o), keys(s)).reduce(((t, n) => {
        t[n] = o[n] || s[n];
        return t;
      }), {}) ];
    }
  });
  const setDirection = t => {
    const n = getDirectionIsRTL(h);
    assignDeep(t, {
      xt: a !== n
    });
    assignDeep(C, {
      ct: n
    });
    a = n;
  };
  const onTrinsicChanged = (t, n) => {
    const [o, e] = t;
    const c = {
      Ct: e
    };
    assignDeep(C, {
      $t: o
    });
    !n && s(c);
    return c;
  };
  const onSizeChanged = ({ft: t, _t: n}) => {
    const o = t && !n;
    const e = !o && H.R ? A : s;
    const c = {
      ft: t || n,
      _t: n
    };
    setDirection(c);
    e(c);
  };
  const onContentMutation = (t, n) => {
    const [, o] = z();
    const e = {
      Ht: o
    };
    setDirection(e);
    const c = t ? s : A;
    o && !n && c(e);
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      Et: n
    };
    setDirection(s);
    if (n && !o) {
      A(s);
    }
    return s;
  };
  const [T, D] = y ? createTrinsicObserver(g, onTrinsicChanged) : [];
  const k = !S && createSizeObserver(g, onSizeChanged, {
    _t: true
  });
  const [M, V] = createDOMObserver(g, false, onHostMutation, {
    X: v,
    F: concat(v, _)
  });
  const L = S && f && new f((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      ft: true,
      _t: domRectAppeared(n, i)
    });
    i = n;
  }));
  const P = debounce((() => {
    const [, t] = z();
    s({
      Ht: t
    });
  }), {
    _: 222,
    v: true
  });
  return [ () => {
    L && L.observe(g);
    const t = k && k();
    const n = T && T();
    const o = M();
    const s = H.L((t => {
      if (t) {
        A({
          zt: t
        });
      } else {
        P();
      }
    }));
    return () => {
      L && L.disconnect();
      t && t();
      n && n();
      l && l();
      o();
      s();
    };
  }, ({It: t, At: n, Tt: o}) => {
    const s = {};
    const [i] = t("update.ignoreMutation");
    const [a, _] = t("update.attributes");
    const [f, p] = t("update.elementEvents");
    const [v, h] = t("update.debounce");
    const g = p || _;
    const w = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (g) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(y || b, true, onContentMutation, {
        F: concat(I, a || []),
        Y: f,
        W: u,
        K: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !S ? liesBetween(o, u, d) : false;
          return e || !!closest(o, `.${ut}`) || !!ignoreMutationFromOptions(t);
        }
      });
      l = t();
      r = n;
    }
    if (h) {
      A.S();
      if (isArray(v)) {
        const t = v[0];
        const n = v[1];
        e = isNumber(t) && t;
        c = isNumber(n) && n;
      } else if (isNumber(v)) {
        e = v;
        c = false;
      } else {
        e = false;
        c = false;
      }
    }
    if (w) {
      const t = V();
      const n = D && D();
      const o = r && r();
      t && assignDeep(s, onHostMutation(t[0], t[1], w));
      n && assignDeep(s, onTrinsicChanged(n[0], w));
      o && assignDeep(s, onContentMutation(o[0], w));
    }
    setDirection(s);
    return s;
  }, C ];
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const {P: e} = getEnvironment();
  const {scrollbars: c} = e();
  const {slot: r} = c;
  const {vt: l, ht: i, ot: a, Dt: u, gt: d, yt: _, nt: f} = n;
  const {scrollbars: v} = u ? {} : t;
  const {slot: h} = v || {};
  const g = new Map;
  const initScrollTimeline = t => p && new p({
    source: d,
    axis: t
  });
  const b = {
    x: initScrollTimeline("x"),
    y: initScrollTimeline("y")
  };
  const w = dynamicInitializationElement([ l, i, a ], (() => f && _ ? l : i), r, h);
  const getScrollbarHandleLengthRatio = (t, n) => {
    if (n) {
      const o = t ? H : E;
      const {kt: s, Mt: e} = n;
      const c = getBoundingClientRect(e)[o];
      const r = getBoundingClientRect(s)[o];
      return capNumber(0, 1, c / r || 0);
    }
    const s = t ? "x" : "y";
    const {Rt: e, Vt: c} = o;
    const r = c[s];
    const l = e[s];
    return capNumber(0, 1, r / (r + l) || 0);
  };
  const getScrollbarHandleOffsetRatio = (t, n, o) => {
    const s = getScrollbarHandleLengthRatio(o, t);
    return 1 / s * (1 - s) * n;
  };
  const addDirectionRTLKeyframes = t => assignDeep(t, {
    clear: [ "left" ]
  });
  const cancelElementAnimations = t => {
    g.forEach(((n, o) => {
      const s = t ? inArray(createOrKeepArray(t), o) : true;
      if (s) {
        each(n || [], (t => {
          t && t.cancel();
        }));
        g.delete(o);
      }
    }));
  };
  const setElementAnimation = (t, n, o, s) => {
    const e = g.get(t) || [];
    const c = e.find((t => t && t.timeline === n));
    if (c) {
      c.effect = new KeyframeEffect(t, o, {
        composite: s
      });
    } else {
      g.set(t, concat(e, [ t.animate(o, {
        timeline: n,
        composite: s
      }) ]));
    }
  };
  const scrollbarStructureAddRemoveClass = (t, n, o) => {
    const s = o ? addClass : removeClass;
    each(t, (t => {
      s(t.Lt, n);
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
      const {Mt: o} = t;
      return [ o, {
        [n ? H : E]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n) => {
    const {Pt: s} = o;
    const e = n ? "x" : "y";
    const c = b[e];
    const r = isDefaultDirectionScrollCoordinates(s)[e];
    const getAxisTransformValue = (t, o) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, r ? o : 1 - o, n)), n);
    if (c) {
      each(t, (t => {
        const {Mt: n} = t;
        setElementAnimation(n, c, addDirectionRTLKeyframes({
          transform: [ 0, 1 ].map((n => getAxisTransformValue(t, n)))
        }));
      }));
    } else {
      scrollbarStyle(t, (t => [ t.Mt, {
        transform: getAxisTransformValue(t, getScrollCoordinatesPercent(s, getElementScroll(d))[e])
      } ]));
    }
  };
  const doRefreshScrollbarOffset = t => f && !_ && parent(t) === a;
  const y = [];
  const m = [];
  const S = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass(m, t, n);
    c && scrollbarStructureAddRemoveClass(S, t, n);
  };
  const refreshScrollbarsHandleLength = () => {
    scrollbarStructureRefreshHandleLength(m, true);
    scrollbarStructureRefreshHandleLength(S);
  };
  const refreshScrollbarsHandleOffset = () => {
    scrollbarStructureRefreshHandleOffset(m, true);
    scrollbarStructureRefreshHandleOffset(S);
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (f) {
      const {Rt: t, Pt: n} = o;
      const s = isDefaultDirectionScrollCoordinates(n);
      const e = .5;
      if (b.x && b.y) {
        each(concat(S, m), (({Lt: n}) => {
          if (doRefreshScrollbarOffset(n)) {
            const setScrollbarElementAnimation = o => setElementAnimation(n, b[o], addDirectionRTLKeyframes({
              transform: [ 0, s[o] ? 1 : -1 ].map((n => getTrasformTranslateValue(numberToCssPx(n * (t[o] - e)), o === "x")))
            }), "add");
            setScrollbarElementAnimation("x");
            setScrollbarElementAnimation("y");
          } else {
            cancelElementAnimations(n);
          }
        }));
      } else {
        const o = getScrollCoordinatesPercent(n, getElementScroll(d));
        const styleScrollbarPosition = n => {
          const {Lt: e} = n;
          const c = doRefreshScrollbarOffset(e) && e;
          const getTranslateValue = (t, n, o) => {
            const s = n * t;
            return numberToCssPx(o ? s : -s);
          };
          return [ c, c && {
            transform: getTrasformTranslateValue({
              x: getTranslateValue(o.x, t.x, s.x),
              y: getTranslateValue(o.y, t.y, s.y)
            })
          } ];
        };
        scrollbarStyle(m, styleScrollbarPosition);
        scrollbarStyle(S, styleScrollbarPosition);
      }
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? _t : ft;
    const o = createDiv(`${ut} ${n}`);
    const e = createDiv(pt);
    const c = createDiv(vt);
    const r = {
      Lt: o,
      kt: e,
      Mt: c
    };
    push(t ? m : S, r);
    push(y, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
    return r;
  };
  const O = bind(generateScrollbarDOM, true);
  const $ = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(w, m[0].Lt);
    appendChildren(w, S[0].Lt);
    return bind(runEachAndClear, y);
  };
  O();
  $();
  return [ {
    Ut: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    qt: refreshScrollbarsScrollbarOffset,
    jt: scrollbarsAddRemoveClass,
    Bt: {
      V: b.x,
      Ft: m,
      Xt: O,
      Yt: bind(scrollbarStyle, m)
    },
    Wt: {
      V: b.y,
      Ft: S,
      Xt: $,
      Yt: bind(scrollbarStyle, S)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => (r, l, i, u) => {
  const {ht: d, ot: _, nt: f, gt: p, Jt: v, Ot: h} = n;
  const {Lt: g, kt: b, Mt: w} = r;
  const [y, m] = selfClearTimeout(333);
  const [S, O] = selfClearTimeout(444);
  const [$, x] = selfClearTimeout();
  const C = bind(i, [ r ], u);
  const scrollOffsetElementScrollBy = t => {
    isFunction(p.scrollBy) && p.scrollBy({
      behavior: "smooth",
      left: t.x,
      top: t.y
    });
  };
  const z = u ? H : E;
  const createInteractiveScrollEvents = () => {
    const n = "pointerup pointercancel lostpointercapture";
    const s = `client${u ? "X" : "Y"}`;
    const r = u ? "left" : "top";
    const l = u ? "w" : "h";
    const i = u ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {Rt: e} = o;
      const c = k(b)[l] - k(w)[l];
      const r = n * s / c;
      const a = r * e[i];
      scrollElementTo(p, {
        [i]: t + a
      });
    };
    return addEventListener(b, "pointerdown", (o => {
      const a = closest(o.target, `.${vt}`) === w;
      const u = a ? w : b;
      const d = t.scrollbars;
      const {button: _, isPrimary: f, pointerType: g} = o;
      const {pointers: y} = d;
      const m = _ === 0 && f && d[a ? "dragScroll" : "clickScroll"] && (y || []).includes(g);
      if (m) {
        O();
        const t = !a && o.shiftKey;
        const d = bind(getBoundingClientRect, w);
        const _ = bind(getBoundingClientRect, b);
        const getHandleOffset = (t, n) => (t || d())[r] - (n || _())[r];
        const f = e(getBoundingClientRect(p)[z]) / k(p)[l] || 1;
        const g = createRelativeHandleMove(getElementScroll(p)[i], 1 / f);
        const y = o[s];
        const m = d();
        const $ = _();
        const x = m[z];
        const C = getHandleOffset(m, $) + x / 2;
        const H = y - $[r];
        const E = a ? 0 : H - C;
        const releasePointerCapture = t => {
          runEachAndClear(A);
          u.releasePointerCapture(t.pointerId);
        };
        const addScrollbarPressedClass = () => h(Q, true);
        const I = addScrollbarPressedClass();
        const A = [ () => {
          const t = getElementScroll(p);
          I();
          const n = getElementScroll(p);
          const o = {
            x: n.x - t.x,
            y: n.y - t.y
          };
          if (c(o.x) > 3 || c(o.y) > 3) {
            addScrollbarPressedClass();
            scrollElementTo(p, t);
            scrollOffsetElementScrollBy(o);
            S(I);
          }
        }, addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
          H: false
        }), addEventListener(b, n, releasePointerCapture), addEventListener(b, "pointermove", (n => {
          const o = n[s] - y;
          if (a || t) {
            g(E + o);
          }
        })) ];
        u.setPointerCapture(o.pointerId);
        if (t) {
          g(E);
        } else if (!a) {
          const t = getStaticPluginModuleInstance(kt);
          t && push(A, t(g, getHandleOffset, E, x, H));
        }
      }
    }));
  };
  let I = true;
  const isAffectingTransition = t => t.propertyName.indexOf(z) > -1;
  return bind(runEachAndClear, [ addEventListener(w, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
    l(bt, true);
  })), addEventListener(g, "pointerleave pointercancel", (() => {
    l(bt, false);
  })), !f && addEventListener(g, "mousedown", (() => {
    const t = getFocusedElement();
    if (hasAttr(t, X) || hasAttr(t, B) || t === document.body) {
      a(bind(focusElement, _), 25);
    }
  })), addEventListener(g, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: s} = t;
    if (I && s === 0 && parent(g) === d) {
      scrollOffsetElementScrollBy({
        x: n,
        y: o
      });
    }
    I = false;
    l(St, true);
    y((() => {
      I = true;
      l(St);
    }));
    preventDefault(t);
  }), {
    H: false,
    I: true
  }), addEventListener(w, "transitionstart", (t => {
    if (isAffectingTransition(t)) {
      const animateHandleOffset = () => {
        C();
        $(animateHandleOffset);
      };
      animateHandleOffset();
    }
  })), addEventListener(w, "transitionend transitioncancel", (t => {
    if (isAffectingTransition(t)) {
      x();
      C();
    }
  })), addEventListener(g, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
    A: true,
    I: true,
    H: false
  }), {
    I: true
  }), createInteractiveScrollEvents(), m, O, x ]);
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
  const [m, S] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
  const {ht: O, Kt: $, yt: x} = e;
  const {jt: C, Ut: H, Nt: E, qt: I} = m;
  const manageScrollbarsAutoHide = (t, n) => {
    y();
    if (t) {
      C(mt);
    } else {
      const t = bind(C, mt, true);
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
    C(yt, t, true);
    C(yt, t, false);
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
  })), addEventListener($, "scroll", (t => {
    f((() => {
      E();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    I();
  })) ];
  return [ () => bind(runEachAndClear, push(T, S())), ({It: t, Tt: n, Gt: e, Qt: c}) => {
    const {Zt: r, tn: f, nn: p, sn: v} = c || {};
    const {xt: h, _t: b} = e || {};
    const {ct: w} = o;
    const {M: y} = getEnvironment();
    const {G: m, en: S} = s;
    const [O, T] = t("showNativeOverlaidScrollbars");
    const [D, k] = t("scrollbars.theme");
    const [M, R] = t("scrollbars.visibility");
    const [V, L] = t("scrollbars.autoHide");
    const [P, U] = t("scrollbars.autoHideSuspend");
    const [N] = t("scrollbars.autoHideDelay");
    const [q, j] = t("scrollbars.dragScroll");
    const [B, F] = t("scrollbars.clickScroll");
    const [X, Y] = t("overflow");
    const W = b && !n;
    const J = S.x || S.y;
    const K = r || f || v || h || n;
    const G = p || R || Y;
    const Q = O && y.x && y.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(A) && (M === z || M === "auto" && n === A);
      C(ht, s, o);
      return s;
    };
    _ = N;
    if (W) {
      if (P && J) {
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
    if (T) {
      C(at, Q);
    }
    if (k) {
      C(u);
      C(D, true);
      u = D;
    }
    if (U && !P) {
      manageAutoHideSuspension(true);
    }
    if (L) {
      l = V === "move";
      i = V === "leave";
      a = V === "never";
      manageScrollbarsAutoHide(a, true);
    }
    if (j) {
      C($t, q);
    }
    if (F) {
      C(Ot, B);
    }
    if (G) {
      const t = setScrollbarVisibility(X.x, m.x, true);
      const n = setScrollbarVisibility(X.y, m.y, false);
      const o = t && n;
      C(gt, !o);
    }
    if (K) {
      H();
      E();
      I();
      C(wt, !S.x, true);
      C(wt, !S.y, false);
      C(dt, w && !x);
    }
  }, {}, m ];
};

const createStructureSetupElements = t => {
  const o = getEnvironment();
  const {P: s, R: e} = o;
  const {elements: c} = s();
  const {host: r, padding: l, viewport: i, content: a} = c;
  const u = isHTMLElement(t);
  const d = u ? {} : t;
  const {elements: _} = d;
  const {host: f, padding: p, viewport: v, content: h} = _ || {};
  const g = u ? t : d.target;
  const b = isBodyElement(g);
  const w = is(g, "textarea");
  const y = g.ownerDocument;
  const m = y.documentElement;
  const getDocumentWindow = () => y.defaultView || n;
  const S = bind(staticInitializationElement, [ g ]);
  const O = bind(dynamicInitializationElement, [ g ]);
  const $ = bind(createDiv, "");
  const x = bind(S, $, i);
  const C = bind(O, $, a);
  const H = x(v);
  const E = H === g;
  const z = E && b;
  const I = !E && C(h);
  const A = !E && H === I;
  const T = z ? m : H;
  const D = w ? S($, r, f) : g;
  const k = z ? T : D;
  const M = !E && O($, l, p);
  const R = !A && I;
  const V = [ R, T, M, k ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(V, t);
  const L = elementIsGenerated(T) ? g : T;
  const P = {
    vt: g,
    ht: k,
    ot: T,
    cn: M,
    bt: R,
    gt: z ? m : T,
    Kt: z ? y : T,
    rn: b ? m : L,
    Jt: y,
    wt: w,
    yt: b,
    Dt: u,
    nt: E,
    ln: getDocumentWindow,
    St: t => hasAttrClass(T, X, t),
    Ot: (t, n) => addRemoveAttrClass(T, X, t, n)
  };
  const {vt: U, ht: q, cn: Y, ot: W, bt: J} = P;
  const K = [ () => {
    removeAttrs(q, [ B, N ]);
    removeAttrs(U, N);
    if (b) {
      removeAttrs(m, [ N, B ]);
    }
  } ];
  const Q = w && elementIsGenerated(q);
  let Z = w ? U : contents([ J, W, Y, q, U ].find((t => t && !elementIsGenerated(t))));
  const ot = z ? U : J || W;
  const st = bind(runEachAndClear, K);
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
    const s = getAttr(W, o);
    const c = prepareWrapUnwrapFocus(n);
    setAttrs(q, B, E ? "" : F);
    setAttrs(Y, tt, "");
    setAttrs(W, X, "");
    setAttrs(J, nt, "");
    if (!E) {
      setAttrs(W, o, s || "-1");
      b && setAttrs(m, j, "");
    }
    if (Q) {
      insertAfter(U, q);
      push(K, (() => {
        insertAfter(q, U);
        removeElements(q);
      }));
    }
    appendChildren(ot, Z);
    appendChildren(q, Y);
    appendChildren(Y || q, !E && W);
    appendChildren(W, J);
    push(K, [ c, () => {
      const t = getFocusedElement();
      const n = elementIsGenerated(W);
      const e = n && t === W ? U : t;
      const c = prepareWrapUnwrapFocus(e);
      removeAttrs(Y, tt);
      removeAttrs(J, nt);
      removeAttrs(W, X);
      b && removeAttrs(m, j);
      s ? setAttrs(W, o, s) : removeAttrs(W, o);
      elementIsGenerated(J) && unwrap(J);
      n && unwrap(W);
      elementIsGenerated(Y) && unwrap(Y);
      focusElement(e);
      c();
    } ]);
    if (e && !E) {
      addAttrClass(W, X, G);
      push(K, bind(removeAttrs, W, X));
    }
    focusElement(!E && b && n === U && t.top === t ? W : n);
    c();
    Z = 0;
    return st;
  };
  return [ P, appendElements, st ];
};

const createTrinsicUpdateSegment = ({bt: t}) => ({Gt: n, an: o, Tt: s}) => {
  const {Ct: e} = n || {};
  const {$t: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [E]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({ht: t, cn: n, ot: o, nt: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({It: t, Gt: l, an: i, Tt: a}) => {
    let [u, d] = r(a);
    const {R: _} = getEnvironment();
    const {ft: f, Ht: p, xt: v} = l || {};
    const {ct: h} = i;
    const [g, x] = t("paddingAbsolute");
    const C = a || p;
    if (f || d || C) {
      [u, d] = c(a);
    }
    const E = !s && (x || v || d);
    if (E) {
      const t = !g || !n && !_;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [O]: t && !h ? -s : 0,
        [$]: t ? -c : 0,
        [S]: t && h ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? h ? -u.r : "auto" : 0,
        left: t ? h ? "auto" : -u.l : 0,
        [H]: t && `calc(100% + ${s}px)`
      };
      const l = {
        [b]: t ? u.t : 0,
        [w]: t ? u.r : 0,
        [m]: t ? u.b : 0,
        [y]: t ? u.l : 0
      };
      setStyles(n || o, r);
      setStyles(o, l);
      assignDeep(e, {
        cn: u,
        un: !t,
        rt: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      dn: E
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {ht: c, cn: r, ot: l, nt: a, Kt: u, gt: d, yt: _, Ot: f, ln: p} = t;
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
    f(K, !h && t);
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
  const [m, S] = createCache(w, bind(getFractionalSize, l));
  const [O, $] = createCache(w, bind(R, l));
  const [x, C] = createCache(w);
  const [H] = createCache(y);
  const [E, T] = createCache(w);
  const [D] = createCache(y);
  const [k] = createCache({
    i: (t, n) => equal(t, n, b),
    o: {}
  }, (() => hasDimensions(l) ? getStyles(l, b) : {}));
  const [V, L] = createCache({
    i: (t, n) => equalXY(t.T, n.T) && equalXY(t.D, n.D),
    o: getZeroScrollCoordinates()
  }, (() => {
    setMeasuringMode(true);
    const t = getElementScroll(d);
    const n = f(Z, true);
    const o = addEventListener(u, A, (n => {
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
    const e = R(d);
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
      T: s,
      D: r
    };
  }));
  const P = getStaticPluginModuleInstance(Tt);
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? Y : W;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  const setViewportOverflowStyle = t => {
    const createAllOverflowStyleClassNames = t => [ z, I, A ].map((n => createViewportOverflowStyleClassName(n, t)));
    const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
    f(n);
    f(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
  };
  return ({It: n, Gt: o, an: i, Tt: a}, {dn: u}) => {
    const {ft: d, Ht: _, xt: b, _t: w, zt: y} = o || {};
    const z = P && P.tt(t, s, i, e, n);
    const {it: I, ut: A, dt: R} = z || {};
    const [U, N] = getShowNativeOverlaidScrollbars(n, e);
    const [j, F] = n("overflow");
    const X = overflowIsVisible(j.x);
    const Y = overflowIsVisible(j.y);
    const W = d || u || _ || b || y || N;
    let J = S(a);
    let K = $(a);
    let Q = C(a);
    let Z = T(a);
    if (N && v) {
      f(G, !U);
    }
    if (W) {
      if (hasAttrClass(c, B, q)) {
        setMeasuringMode(true);
      }
      const [t] = A ? A() : [];
      const [n] = J = m(a);
      const [o] = K = O(a);
      const s = M(l);
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
      Z = E(i);
      Q = x(getOverflowAmount(r, i), a);
    }
    const [nt, ot] = Z;
    const [st, et] = Q;
    const [ct, rt] = K;
    const [lt, it] = J;
    const [at, ut] = H({
      x: st.w > 0,
      y: st.h > 0
    });
    const dt = X && Y && (at.x || at.y) || X && at.x && !at.y || Y && at.y && !at.x;
    const _t = u || b || y || it || rt || ot || et || F || N || W;
    const ft = createViewportOverflowState(at, j);
    const [pt, vt] = D(ft.G);
    const [, ht] = k(a);
    const gt = b || w || ht || ut || a;
    const [bt, wt] = gt ? V(a) : L();
    if (_t) {
      vt && setViewportOverflowStyle(ft.G);
      if (R && I) {
        setStyles(l, R(ft, i, I(ft, ct, lt)));
      }
    }
    setMeasuringMode(false);
    addRemoveAttrClass(c, B, q, dt);
    addRemoveAttrClass(r, tt, q, dt);
    assignDeep(s, {
      G: pt,
      Vt: {
        x: nt.w,
        y: nt.h
      },
      Rt: {
        x: st.w,
        y: st.h
      },
      en: at,
      Pt: sanitizeScrollCoordinates(bt, st)
    });
    return {
      nn: vt,
      Zt: ot,
      tn: et,
      sn: wt || et,
      _n: gt
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
    rt: {
      [O]: 0,
      [$]: 0,
      [S]: 0,
      [b]: 0,
      [w]: 0,
      [m]: 0,
      [y]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    G: {
      x: I,
      y: I
    },
    en: {
      x: false,
      y: false
    },
    Pt: getZeroScrollCoordinates()
  };
  const {vt: c, gt: r, nt: l} = n;
  const {R: i, M: a} = getEnvironment();
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
  const c = createOptionCheck(n, {});
  const [r, l, i, a, u] = createStructureSetup(t);
  const [d, _, f] = createObserversSetup(a, i, c, (t => {
    update({}, t);
  }));
  const [p, v, , h] = createScrollbarsSetup(t, n, f, i, a, e);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, e) => {
    if (o()) {
      return false;
    }
    const {fn: c, Tt: r, At: i, pn: a} = t;
    const u = c || {};
    const d = !!r;
    const p = {
      It: createOptionCheck(n, u, d),
      fn: u,
      Tt: d
    };
    if (a) {
      v(p);
      return false;
    }
    const h = e || _(assignDeep({}, p, {
      At: i
    }));
    const g = l(assignDeep({}, p, {
      an: f,
      Gt: h
    }));
    v(assignDeep({}, p, {
      Gt: h,
      Qt: g
    }));
    const b = updateHintsAreTruthy(h);
    const w = updateHintsAreTruthy(g);
    const y = b || w || !isEmptyObject(u) || d;
    y && s(t, {
      Gt: h,
      Qt: g
    });
    return y;
  };
  return [ () => {
    const {rn: t, gt: n} = a;
    const o = getElementScroll(t);
    const s = [ d(), r(), p() ];
    scrollElementTo(n, o);
    return bind(runEachAndClear, s);
  }, update, () => ({
    vn: f,
    hn: i
  }), {
    gn: a,
    bn: h
  }, u ];
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
      const o = getStaticPluginModuleInstance(zt);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, d, _] = createEventListenerHub();
    const [f, p, v] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      v(t, n);
      _(t, n);
    };
    const [h, g, b, w, y] = createSetups(t, a, (() => r), (({fn: t, Tt: n}, {Gt: o, Qt: s}) => {
      const {ft: e, xt: c, Ct: r, Ht: l, Et: i, _t: a} = o;
      const {Zt: u, tn: d, nn: _, sn: f} = s;
      triggerEvent("updated", [ m, {
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
    }), (t => triggerEvent("scroll", [ m, t ])));
    const destroy = t => {
      removeInstance(c);
      runEachAndClear(l);
      r = true;
      triggerEvent("destroyed", [ m, t ]);
      d();
      p();
    };
    const m = {
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
      on: f,
      off: (t, n) => {
        t && n && p(t, n);
      },
      state() {
        const {vn: t, hn: n} = b();
        const {ct: o} = t;
        const {Vt: s, Rt: e, G: c, en: l, cn: i, un: a, Pt: u} = n;
        return assignDeep({}, {
          overflowEdge: s,
          overflowAmount: e,
          overflowStyle: c,
          hasOverflow: l,
          scrollCoordinates: {
            start: u.T,
            end: u.D
          },
          padding: i,
          paddingAbsolute: a,
          directionRTL: o,
          destroyed: r
        });
      },
      elements() {
        const {vt: t, ht: n, cn: o, ot: s, bt: e, gt: c, Kt: r} = w.gn;
        const {Bt: l, Wt: i} = w.bn;
        const translateScrollbarStructure = t => {
          const {Mt: n, kt: o, Lt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Ft: n, Xt: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              g({
                pn: true
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
    addInstance(c, m);
    registerPluginModuleInstances(Ht, OverlayScrollbars, [ m, u, i ]);
    if (cancelInitialization(w.gn.yt, !e && t.cancel)) {
      destroy(true);
      return m;
    }
    push(l, h());
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
  const {k: t, M: n, R: o, V: s, j: e, B: c, P: r, U: l, N: i, q: a} = getEnvironment();
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

exports.ClickScrollPlugin = Mt;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = Dt;

exports.SizeObserverPlugin = At;
//# sourceMappingURL=overlayscrollbars.cjs.map
