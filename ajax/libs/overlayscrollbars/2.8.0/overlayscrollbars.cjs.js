/*!
 * OverlayScrollbars
 * Version: 2.8.0
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

const b = /^\[object (.+)\]$/;

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : h.call(t).replace(b, "$1").toLowerCase();

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

const w = "paddingTop";

const y = "paddingRight";

const S = "paddingLeft";

const m = "paddingBottom";

const O = "marginLeft";

const $ = "marginRight";

const C = "marginBottom";

const x = "overflowX";

const H = "overflowY";

const E = "width";

const z = "height";

const A = "visible";

const I = "hidden";

const T = "scroll";

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
    n = o(e, isFunction(t) ? t() : t);
  }, () => s(n) ];
};

const debounce = (t, n) => {
  let o;
  let s;
  let e;
  let c = noop;
  const {_: r, p: d, v: _} = n || {};
  const f = function invokeFunctionToDebounce(n) {
    c();
    u(o);
    o = s = void 0;
    c = noop;
    t.apply(this, n);
  };
  const mergeParms = t => _ && s ? _(s, t) : t;
  const flush = () => {
    if (c !== noop) {
      f(mergeParms(e) || e);
    }
  };
  const p = function debouncedFn() {
    const t = from(arguments);
    const n = isFunction(r) ? r() : r;
    const _ = isNumber(n) && n >= 0;
    if (_) {
      const r = isFunction(d) ? d() : d;
      const _ = isNumber(r) && r >= 0;
      const p = n > 0 ? a : i;
      const v = n > 0 ? u : l;
      const h = mergeParms(t);
      const g = h || t;
      const b = f.bind(0, g);
      c();
      const w = p(b, n);
      c = () => v(w);
      if (_ && !o) {
        o = a(flush, r);
      }
      s = e = g;
    } else {
      f(t);
    }
  };
  p.S = flush;
  return p;
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
    m: t => s(domTokenListOperation(t, "delete")),
    O: t => s(domTokenListOperation(t, "add")),
    $: t => {
      const n = getDomTokensArray(t);
      return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
    }
  };
};

const removeAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).m(o);
  return bind(addAttrClass, t, n, o);
};

const addAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).O(o);
  return bind(removeAttrClass, t, n, o);
};

const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);

const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).$(o);

const createDomTokenListClass = t => domTokenListAttr(t, "class");

const removeClass = (t, n) => {
  createDomTokenListClass(t).m(n);
};

const addClass = (t, n) => {
  createDomTokenListClass(t).O(n);
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
  t && n && each(n, ((n, o) => {
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

const k = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : k;

const getWindowSize = t => getElmWidthHeightProperty("inner", t || n);

const M = bind(getElmWidthHeightProperty, "offset");

const R = bind(getElmWidthHeightProperty, "client");

const V = bind(getElmWidthHeightProperty, "scroll");

const getFractionalSize = t => {
  const n = parseFloat(getStyles(t, E)) || 0;
  const o = parseFloat(getStyles(t, z)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const hasDimensions = t => !!t && elementHasDimensions(t);

const domRectHasDimensions = t => !!(t && (t[z] || t[E]));

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
  const c = (e = s && s.C) != null ? e : true;
  const r = s && s.H || false;
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
  I: {
    x: 0,
    y: 0
  },
  T: {
    x: 0,
    y: 0
  }
});

const sanatizeScrollCoordinates = (t, n) => {
  const {I: o, T: s} = t;
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
    return [ s + 0, e + 0 ];
  };
  const [i, a] = sanitizeAxis(o.x, s.x, e);
  const [u, d] = sanitizeAxis(o.y, s.y, l);
  return {
    I: {
      x: i,
      y: u
    },
    T: {
      x: a,
      y: d
    }
  };
};

const isDefaultDirectionScrollCoordinates = ({I: t, T: n}) => {
  const getAxis = (t, n) => t === 0 && t <= n;
  return {
    x: getAxis(t.x, n.x),
    y: getAxis(t.y, n.y)
  };
};

const getScrollCoordinatesPercent = ({I: t, T: n}, o) => {
  const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
  return {
    x: getAxis(t.x, n.x, o.x),
    y: getAxis(t.y, n.y, o.y)
  };
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

const N = `${U}-scrollbar-hidden`;

const j = `${P}-initialize`;

const q = "noClipping";

const F = `${P}-body`;

const B = P;

const X = "host";

const Y = `${P}-viewport`;

const W = x;

const J = H;

const K = "arrange";

const G = "measuring";

const Q = "scrollbarHidden";

const Z = "scrollbarPressed";

const tt = "noContent";

const nt = `${P}-padding`;

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

const _t = `${dt}-rtl`;

const ft = `${dt}-horizontal`;

const pt = `${dt}-vertical`;

const vt = `${dt}-track`;

const ht = `${dt}-handle`;

const gt = `${dt}-visible`;

const bt = `${dt}-cornerless`;

const wt = `${dt}-interaction`;

const yt = `${dt}-unusable`;

const St = `${dt}-auto-hide`;

const mt = `${St}-hidden`;

const Ot = `${dt}-wheel`;

const $t = `${vt}-interactive`;

const Ct = `${ht}-interactive`;

let xt;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o) => {
    appendChildren(document.body, t);
    appendChildren(document.body, t);
    const s = R(t);
    const e = M(t);
    const c = getFractionalSize(n);
    o && removeElements(t);
    return {
      x: e.h - s.h + c.h,
      y: e.w - s.w + c.w
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
  const t = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${N}{scrollbar-width:none!important}.${N}::-webkit-scrollbar,.${N}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const o = createDOM(`<div class="${U}"><div></div><style>${t}</style></div>`);
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
  const f = assignDeep({}, L);
  const v = bind(assignDeep, {}, f);
  const h = bind(assignDeep, {}, _);
  const g = {
    D: a,
    k: d,
    M: u,
    R: !!p,
    V: bind(c, "r"),
    L: h,
    P: t => assignDeep(_, t) && h(),
    U: v,
    N: t => assignDeep(f, t) && v(),
    j: assignDeep({}, _),
    q: assignDeep({}, f)
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
      assignDeep(g.D, t);
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
  const {k: e, M: c, L: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const d = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!d || !!_;
};

const Ht = new WeakMap;

const addInstance = (t, n) => {
  Ht.set(t, n);
};

const removeInstance = t => {
  Ht.delete(t);
};

const getInstance = t => Ht.get(t);

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
  const {F: c, B: r, X: l, Y: i, W: a, J: u} = s || {};
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
        const m = S && getAttr(c, e || "") || null;
        const O = S && u !== m;
        const $ = inArray(h, e) && O;
        if (n && (w || !y)) {
          const n = b && O;
          const a = n && i && is(c, i);
          const _ = a ? !r(c, e, u, m) : !b || n;
          const f = _ && !l(o, !!a, t, s);
          each(p, (t => push(d, t)));
          each(g, (t => push(d, t)));
          v = v || f;
        }
        if (!n && y && O && !r(c, e, u, m)) {
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
      _.S();
      return observerCallback(true, b.takeRecords());
    }
  } ];
};

const Et = {};

const zt = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    Et[o] = t[o];
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

const At = "__osOptionsValidationPlugin";

const It = "__osSizeObserverPlugin";

const Tt = /* @__PURE__ */ (() => ({
  [It]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${lt}" dir="ltr"><div class="${lt}"><div class="${it}"></div></div><div class="${lt}"><div class="${it}" style="width: 200%; height: 200%"></div></div></div>`);
      const r = c[0];
      const a = r.lastChild;
      const u = r.firstChild;
      const d = u == null ? void 0 : u.firstChild;
      let _ = M(r);
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
        f = M(r);
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
      addClass(t, rt);
      setStyles(d, {
        [E]: s,
        [z]: s
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

const overflowIsVisible = t => t.indexOf(A) === 0;

const createViewportOverflowState = (t, n) => {
  const getAxisOverflowStyle = (t, n, o, s) => {
    const e = t === A ? I : t.replace(`${A}-`, "");
    const c = overflowIsVisible(t);
    const r = overflowIsVisible(o);
    if (!n && !s) {
      return I;
    }
    if (c && r) {
      return A;
    }
    if (c) {
      const t = n ? A : I;
      return n && s ? e : t;
    }
    const l = r && s ? A : I;
    return n ? e : l;
  };
  const o = {
    x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
    y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
  };
  return {
    K: o,
    G: {
      x: o.x === T,
      y: o.y === T
    }
  };
};

const Dt = "__osScrollbarsHidingPlugin";

const kt = /* @__PURE__ */ (() => ({
  [Dt]: {
    static: () => ({
      Z: (t, n, o, s, e) => {
        const {tt: c, nt: r} = t;
        const {M: l, k: i, D: a} = s;
        const u = !c && !l && (i.x || i.y);
        const [d] = getShowNativeOverlaidScrollbars(e, s);
        const readViewportOverflowState = () => {
          const getStatePerAxis = t => {
            const n = getStyles(r, t);
            const o = n === T;
            return [ n, o ];
          };
          const [t, n] = getStatePerAxis(x);
          const [o, s] = getStatePerAxis(H);
          return {
            K: {
              x: t,
              y: o
            },
            G: {
              x: n,
              y: s
            }
          };
        };
        const _getViewportOverflowHideOffset = t => {
          const {G: n} = t;
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
            ot: {
              x: s,
              y: c
            },
            st: {
              x: e,
              y: r
            }
          };
        };
        const _hideNativeScrollbars = (t, {et: o}, s) => {
          if (!c) {
            const e = assignDeep({}, {
              [$]: 0,
              [C]: 0,
              [O]: 0
            });
            const {ot: c, st: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {ct: d} = n;
            const _ = o ? O : $;
            const f = o ? S : y;
            const p = d[_];
            const v = d[C];
            const h = d[f];
            const g = d[m];
            e[E] = `calc(100% + ${u + p * -1}px)`;
            e[_] = -u + p;
            e[C] = -a + v;
            if (s) {
              e[f] = h + (i ? u : 0);
              e[m] = g + (l ? a : 0);
            }
            return e;
          }
        };
        const _arrangeViewport = (t, s, e) => {
          if (u) {
            const {ct: c} = n;
            const {ot: l, st: i} = _getViewportOverflowHideOffset(t);
            const {x: a, y: u} = i;
            const {x: d, y: _} = l;
            const {et: f} = o;
            const p = f ? y : S;
            const v = c[p];
            const h = c.paddingTop;
            const g = s.w + e.w;
            const b = s.h + e.h;
            const w = {
              w: _ && u ? `${_ + g - v}px` : "",
              h: d && a ? `${d + b - h}px` : ""
            };
            setStyles(r, {
              "--os-vaw": w.w,
              "--os-vah": w.h
            });
          }
          return u;
        };
        const _undoViewportArrange = t => {
          if (u) {
            const s = t || readViewportOverflowState();
            const {ct: e} = n;
            const {st: c} = _getViewportOverflowHideOffset(s);
            const {x: l, y: i} = c;
            const a = {};
            const assignProps = t => each(t, (t => {
              a[t] = e[t];
            }));
            if (l) {
              assignProps([ C, w, m ]);
            }
            if (i) {
              assignProps([ O, $, S, y ]);
            }
            const d = getStyles(r, keys(a));
            const _ = removeAttrClass(r, Y, K);
            setStyles(r, a);
            return [ () => {
              setStyles(r, assignDeep({}, d, _hideNativeScrollbars(s, o, u)));
              _();
            }, s ];
          }
          return [ noop ];
        };
        return {
          rt: _getViewportOverflowHideOffset,
          lt: _arrangeViewport,
          it: _undoViewportArrange,
          ut: _hideNativeScrollbars
        };
      }
    })
  }
}))();

const Mt = "__osClickScrollPlugin";

const Rt = /* @__PURE__ */ (() => ({
  [Mt]: {
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
  const {dt: s} = o || {};
  const e = getStaticPluginModuleInstance(It);
  const [c] = createCache({
    o: false,
    u: true
  });
  return () => {
    const o = [];
    const r = createDOM(`<div class="${st}"><div class="${ct}"></div></div>`);
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
          _t: true,
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
      push(o, concat([ addClass(l, et), addEventListener(l, "animationstart", t) ], n));
    } else {
      return noop;
    }
    return bind(runEachAndClear, push(o, appendChildren(t, l)));
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
        const t = M(s);
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
  const {M: u} = getEnvironment();
  const d = `[${B}]`;
  const _ = `[${Y}]`;
  const p = [ "tabindex" ];
  const v = [ "wrap", "cols", "rows" ];
  const h = [ "id", "class", "style", "open" ];
  const {ft: g, vt: b, nt: w, ht: y, gt: S, bt: m, tt: O, wt: $, yt: C} = t;
  const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
  const x = {
    St: false,
    et: getDirectionIsRTL(g)
  };
  const H = getEnvironment();
  const E = getStaticPluginModuleInstance(Dt);
  const [z] = createCache({
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = E && E.Z(t, n, x, H, o).it;
    const e = !O && $(K);
    const c = e && getElementScroll(y);
    const r = C(G, true);
    const l = e && s && s()[0];
    const i = V(S);
    const a = V(w);
    const u = getFractionalSize(w);
    l && l();
    scrollElementTo(y, c);
    r();
    return {
      w: a.w + i.w + u.w,
      h: a.h + i.h + u.h
    };
  }));
  const A = m ? v : concat(h, v);
  const I = debounce(s, {
    _: () => e,
    p: () => c,
    v(t, n) {
      const [o] = t;
      const [s] = n;
      return [ concat(keys(o), keys(s)).reduce(((t, n) => {
        t[n] = o[n] || s[n];
        return t;
      }), {}) ];
    }
  });
  const setDirection = t => {
    const n = getDirectionIsRTL(g);
    assignDeep(t, {
      Ot: a !== n
    });
    assignDeep(x, {
      et: n
    });
    a = n;
  };
  const updateViewportAttrsFromHost = t => {
    each(t || p, (t => {
      if (inArray(p, t)) {
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
      $t: e
    };
    assignDeep(x, {
      St: o
    });
    !n && s(c);
    return c;
  };
  const onSizeChanged = ({_t: t, dt: n}) => {
    const o = t && !n;
    const e = !o && u ? I : s;
    const c = {
      _t: t || n,
      dt: n
    };
    setDirection(c);
    e(c);
  };
  const onContentMutation = (t, n) => {
    const [, o] = z();
    const e = {
      Ct: o
    };
    setDirection(e);
    const c = t ? s : I;
    o && !n && c(e);
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      xt: n
    };
    setDirection(s);
    if (n && !o) {
      I(s);
    } else if (!O) {
      updateViewportAttrsFromHost(t);
    }
    return s;
  };
  const {V: T} = H;
  const [D, k] = S ? createTrinsicObserver(b, onTrinsicChanged) : [];
  const M = !O && createSizeObserver(b, onSizeChanged, {
    dt: true
  });
  const [R, L] = createDOMObserver(b, false, onHostMutation, {
    B: h,
    F: concat(h, p)
  });
  const P = O && f && new f((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      _t: true,
      dt: domRectAppeared(n, i)
    });
    i = n;
  }));
  return [ () => {
    updateViewportAttrsFromHost();
    P && P.observe(b);
    const t = M && M();
    const n = D && D();
    const o = R();
    const s = T((t => {
      const [, n] = z();
      I({
        Ht: t,
        Ct: n
      });
    }));
    return () => {
      P && P.disconnect();
      t && t();
      n && n();
      l && l();
      o();
      s();
    };
  }, ({Et: t, zt: n, At: o}) => {
    const s = {};
    const [i] = t("update.ignoreMutation");
    const [a, u] = t("update.attributes");
    const [f, p] = t("update.elementEvents");
    const [v, h] = t("update.debounce");
    const g = p || u;
    const b = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (g) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(S || w, true, onContentMutation, {
        F: concat(A, a || []),
        X: f,
        Y: d,
        J: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !O ? liesBetween(o, d, _) : false;
          return e || !!closest(o, `.${dt}`) || !!ignoreMutationFromOptions(t);
        }
      });
      l = t();
      r = n;
    }
    if (h) {
      I.S();
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
    if (b) {
      const t = L();
      const n = k && k();
      const o = r && r();
      t && assignDeep(s, onHostMutation(t[0], t[1], b));
      n && assignDeep(s, onTrinsicChanged(n[0], b));
      o && assignDeep(s, onContentMutation(o[0], b));
    }
    setDirection(s);
    return s;
  }, x ];
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const {L: e} = getEnvironment();
  const {scrollbars: c} = e();
  const {slot: r} = c;
  const {ft: l, vt: i, nt: a, It: u, ht: d, Tt: _, tt: f} = n;
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
      const o = t ? E : z;
      const {Dt: s, kt: e} = n;
      const c = getBoundingClientRect(e)[o];
      const r = getBoundingClientRect(s)[o];
      return capNumber(0, 1, c / r || 0);
    }
    const s = t ? "x" : "y";
    const {Mt: e, Rt: c} = o;
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
      s(t.Vt, n);
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
      const {kt: o} = t;
      return [ o, {
        [n ? E : z]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n) => {
    const {Lt: s} = o;
    const e = n ? "x" : "y";
    const c = b[e];
    const r = isDefaultDirectionScrollCoordinates(s)[e];
    const getAxisTransformValue = (t, o) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, r ? o : 1 - o, n)), n);
    if (c) {
      each(t, (t => {
        const {kt: n} = t;
        setElementAnimation(n, c, addDirectionRTLKeyframes({
          transform: [ 0, 1 ].map((n => getAxisTransformValue(t, n)))
        }));
      }));
    } else {
      scrollbarStyle(t, (t => [ t.kt, {
        transform: getAxisTransformValue(t, getScrollCoordinatesPercent(s, getElementScroll(d))[e])
      } ]));
    }
  };
  const doRefreshScrollbarOffset = t => f && !_ && parent(t) === a;
  const y = [];
  const S = [];
  const m = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass(S, t, n);
    c && scrollbarStructureAddRemoveClass(m, t, n);
  };
  const refreshScrollbarsHandleLength = () => {
    scrollbarStructureRefreshHandleLength(S, true);
    scrollbarStructureRefreshHandleLength(m);
  };
  const refreshScrollbarsHandleOffset = () => {
    scrollbarStructureRefreshHandleOffset(S, true);
    scrollbarStructureRefreshHandleOffset(m);
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (f) {
      const {Mt: t, Lt: n} = o;
      const s = isDefaultDirectionScrollCoordinates(n);
      const e = .5;
      if (b.x && b.y) {
        each(concat(m, S), (({Vt: n}) => {
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
          const {Vt: e} = n;
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
        scrollbarStyle(S, styleScrollbarPosition);
        scrollbarStyle(m, styleScrollbarPosition);
      }
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? ft : pt;
    const o = createDiv(`${dt} ${n}`);
    const e = createDiv(vt);
    const c = createDiv(ht);
    const r = {
      Vt: o,
      Dt: e,
      kt: c
    };
    push(t ? S : m, r);
    push(y, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
    return r;
  };
  const O = bind(generateScrollbarDOM, true);
  const $ = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(w, S[0].Vt);
    appendChildren(w, m[0].Vt);
    return bind(runEachAndClear, y);
  };
  O();
  $();
  return [ {
    Pt: refreshScrollbarsHandleLength,
    Ut: refreshScrollbarsHandleOffset,
    Nt: refreshScrollbarsScrollbarOffset,
    jt: scrollbarsAddRemoveClass,
    qt: {
      R: b.x,
      Ft: S,
      Bt: O,
      Xt: bind(scrollbarStyle, S)
    },
    Yt: {
      R: b.y,
      Ft: m,
      Bt: $,
      Xt: bind(scrollbarStyle, m)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => (r, l, i, u) => {
  const {vt: d, nt: _, tt: f, ht: p, Wt: v, yt: h} = n;
  const {Vt: g, Dt: b, kt: w} = r;
  const [y, S] = selfClearTimeout(333);
  const [m, O] = selfClearTimeout(444);
  const [$, C] = selfClearTimeout();
  const x = bind(i, [ r ], u);
  const scrollOffsetElementScrollBy = t => {
    isFunction(p.scrollBy) && p.scrollBy({
      behavior: "smooth",
      left: t.x,
      top: t.y
    });
  };
  const H = u ? E : z;
  const createInteractiveScrollEvents = () => {
    const n = "pointerup pointercancel lostpointercapture";
    const s = `client${u ? "X" : "Y"}`;
    const r = u ? "left" : "top";
    const l = u ? "w" : "h";
    const i = u ? "x" : "y";
    const createRelativeHandleMove = (t, n) => s => {
      const {Mt: e} = o;
      const c = M(b)[l] - M(w)[l];
      const r = n * s / c;
      const a = r * e[i];
      scrollElementTo(p, {
        [i]: t + a
      });
    };
    return addEventListener(b, "pointerdown", (o => {
      const a = closest(o.target, `.${ht}`) === w;
      const u = a ? w : b;
      const d = t.scrollbars;
      const {button: _, isPrimary: f, pointerType: g} = o;
      const {pointers: y} = d;
      const S = _ === 0 && f && d[a ? "dragScroll" : "clickScroll"] && (y || []).includes(g);
      if (S) {
        O();
        const t = !a && o.shiftKey;
        const d = bind(getBoundingClientRect, w);
        const _ = bind(getBoundingClientRect, b);
        const getHandleOffset = (t, n) => (t || d())[r] - (n || _())[r];
        const f = e(getBoundingClientRect(p)[H]) / M(p)[l] || 1;
        const g = createRelativeHandleMove(getElementScroll(p)[i], 1 / f);
        const y = o[s];
        const S = d();
        const $ = _();
        const C = S[H];
        const x = getHandleOffset(S, $) + C / 2;
        const E = y - $[r];
        const z = a ? 0 : E - x;
        const releasePointerCapture = t => {
          runEachAndClear(I);
          u.releasePointerCapture(t.pointerId);
        };
        const addScrollbarPressedClass = () => h(Z, true);
        const A = addScrollbarPressedClass();
        const I = [ () => {
          const t = getElementScroll(p);
          A();
          const n = getElementScroll(p);
          const o = {
            x: n.x - t.x,
            y: n.y - t.y
          };
          if (c(o.x) > 3 || c(o.y) > 3) {
            addScrollbarPressedClass();
            scrollElementTo(p, t);
            scrollOffsetElementScrollBy(o);
            m(A);
          }
        }, addEventListener(v, n, releasePointerCapture), addEventListener(v, "selectstart", (t => preventDefault(t)), {
          C: false
        }), addEventListener(b, n, releasePointerCapture), addEventListener(b, "pointermove", (n => {
          const o = n[s] - y;
          if (a || t) {
            g(z + o);
          }
        })) ];
        u.setPointerCapture(o.pointerId);
        if (t) {
          g(z);
        } else if (!a) {
          const t = getStaticPluginModuleInstance(Mt);
          t && push(I, t(g, getHandleOffset, z, C, E));
        }
      }
    }));
  };
  let A = true;
  const isAffectingTransition = t => t.propertyName.indexOf(H) > -1;
  return bind(runEachAndClear, [ addEventListener(w, "pointermove pointerleave", s), addEventListener(g, "pointerenter", (() => {
    l(wt, true);
  })), addEventListener(g, "pointerleave pointercancel", (() => {
    l(wt, false);
  })), !f && addEventListener(g, "mousedown", (() => {
    const t = getFocusedElement();
    if (hasAttr(t, Y) || hasAttr(t, B) || t === document.body) {
      a((() => {
        _.focus({
          preventScroll: true
        });
      }), 25);
    }
  })), addEventListener(g, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: s} = t;
    if (A && s === 0 && parent(g) === d) {
      scrollOffsetElementScrollBy({
        x: n,
        y: o
      });
    }
    A = false;
    l(Ot, true);
    y((() => {
      A = true;
      l(Ot);
    }));
    preventDefault(t);
  }), {
    C: false,
    H: true
  }), addEventListener(w, "transitionstart", (t => {
    if (isAffectingTransition(t)) {
      const animateHandleOffset = () => {
        x();
        $(animateHandleOffset);
      };
      animateHandleOffset();
    }
  })), addEventListener(w, "transitionend transitioncancel", (t => {
    if (isAffectingTransition(t)) {
      C();
      x();
    }
  })), addEventListener(g, "pointerdown", bind(addEventListener, v, "click", stopAndPrevent, {
    A: true,
    H: true,
    C: false
  }), {
    H: true
  }), createInteractiveScrollEvents(), S, O, C ]);
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
  const {vt: O, Jt: $, Tt: C} = e;
  const {jt: x, Pt: H, Ut: E, Nt: z} = S;
  const manageScrollbarsAutoHide = (t, n) => {
    y();
    if (t) {
      x(mt);
    } else {
      const t = bind(x, mt, true);
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
    x(St, t, true);
    x(St, t, false);
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      r = i;
      i && manageScrollbarsAutoHide(true);
    }
  };
  const I = [ y, h, b, p, () => d(), addEventListener(O, "pointerover", onHostMouseEnter, {
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
    z();
  })) ];
  return [ () => bind(runEachAndClear, push(I, m())), ({Et: t, At: n, Kt: e, Gt: c}) => {
    const {Qt: r, Zt: f, tn: p, nn: v} = c || {};
    const {Ot: h, dt: b} = e || {};
    const {et: w} = o;
    const {k: y} = getEnvironment();
    const {K: S, sn: m} = s;
    const [O, I] = t("showNativeOverlaidScrollbars");
    const [D, k] = t("scrollbars.theme");
    const [M, R] = t("scrollbars.visibility");
    const [V, L] = t("scrollbars.autoHide");
    const [P, U] = t("scrollbars.autoHideSuspend");
    const [N] = t("scrollbars.autoHideDelay");
    const [j, q] = t("scrollbars.dragScroll");
    const [F, B] = t("scrollbars.clickScroll");
    const [X, Y] = t("overflow");
    const W = b && !n;
    const J = m.x || m.y;
    const K = r || f || v || h || n;
    const G = p || R || Y;
    const Q = O && y.x && y.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes(T) && (M === A || M === "auto" && n === T);
      x(gt, s, o);
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
    if (I) {
      x(ut, Q);
    }
    if (k) {
      x(u);
      x(D, true);
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
    if (q) {
      x(Ct, j);
    }
    if (B) {
      x($t, F);
    }
    if (G) {
      const t = setScrollbarVisibility(X.x, S.x, true);
      const n = setScrollbarVisibility(X.y, S.y, false);
      const o = t && n;
      x(bt, !o);
    }
    if (K) {
      H();
      E();
      z();
      x(yt, !m.x, true);
      x(yt, !m.y, false);
      x(_t, w && !C);
    }
  }, {}, S ];
};

const createStructureSetupElements = t => {
  const o = getEnvironment();
  const {L: s, M: e} = o;
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
  const S = y.documentElement;
  const getDocumentWindow = () => y.defaultView || n;
  const focusElm = t => {
    if (t && t.focus) {
      t.focus({
        preventScroll: true
      });
    }
  };
  const m = bind(staticInitializationElement, [ g ]);
  const O = bind(dynamicInitializationElement, [ g ]);
  const $ = bind(createDiv, "");
  const C = bind(m, $, i);
  const x = bind(O, $, a);
  const H = C(v);
  const E = H === g;
  const z = E && b;
  const A = !E && x(h);
  const I = !E && H === A;
  const T = z ? S : H;
  const D = w ? m($, r, f) : g;
  const k = z ? T : D;
  const M = !E && O($, l, p);
  const R = !I && A;
  const V = [ R, T, M, k ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(V, t);
  const L = elementIsGenerated(T) ? g : T;
  const P = {
    ft: g,
    vt: k,
    nt: T,
    en: M,
    gt: R,
    ht: z ? S : T,
    Jt: z ? y : T,
    cn: b ? S : L,
    Wt: y,
    bt: w,
    Tt: b,
    It: u,
    tt: E,
    rn: getDocumentWindow,
    wt: t => hasAttrClass(T, Y, t),
    yt: (t, n) => addRemoveAttrClass(T, Y, t, n)
  };
  const {ft: U, vt: N, en: q, nt: W, gt: J} = P;
  const K = [ () => {
    removeAttrs(N, [ B, j ]);
    removeAttrs(U, j);
    if (b) {
      removeAttrs(S, [ j, B ]);
    }
  } ];
  const G = w && elementIsGenerated(N);
  let Z = w ? U : contents([ J, W, q, N, U ].find((t => t && !elementIsGenerated(t))));
  const tt = z ? U : J || W;
  const st = bind(runEachAndClear, K);
  const appendElements = () => {
    const t = getDocumentWindow();
    const n = getFocusedElement();
    const unwrap = t => {
      appendChildren(parent(t), contents(t));
      removeElements(t);
    };
    const prepareWrapUnwrapFocus = t => addEventListener(t, "focusin focusout focus blur", stopPropagation, {
      H: true
    });
    const o = "tabindex";
    const s = getAttr(W, o);
    const c = prepareWrapUnwrapFocus(n);
    setAttrs(N, B, E ? "" : X);
    setAttrs(q, nt, "");
    setAttrs(W, Y, "");
    setAttrs(J, ot, "");
    if (!E) {
      setAttrs(W, o, s || "-1");
      b && setAttrs(S, F, "");
    }
    if (G) {
      insertAfter(U, N);
      push(K, (() => {
        insertAfter(N, U);
        removeElements(N);
      }));
    }
    appendChildren(tt, Z);
    appendChildren(N, q);
    appendChildren(q || N, !E && W);
    appendChildren(W, J);
    push(K, [ c, () => {
      const t = getFocusedElement();
      const n = prepareWrapUnwrapFocus(t);
      removeAttrs(q, nt);
      removeAttrs(J, ot);
      removeAttrs(W, Y);
      b && removeAttrs(S, F);
      s ? setAttrs(W, o, s) : removeAttrs(W, o);
      elementIsGenerated(J) && unwrap(J);
      elementIsGenerated(W) && unwrap(W);
      elementIsGenerated(q) && unwrap(q);
      focusElm(t);
      n();
    } ]);
    if (e && !E) {
      addAttrClass(W, Y, Q);
      push(K, bind(removeAttrs, W, Y));
    }
    focusElm(!E && n === g && t.top === t ? W : n);
    c();
    Z = 0;
    return st;
  };
  return [ P, appendElements, st ];
};

const createTrinsicUpdateSegment = ({gt: t}) => ({Kt: n, ln: o, At: s}) => {
  const {$t: e} = n || {};
  const {St: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [z]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({vt: t, en: n, nt: o, tt: s}, e) => {
  const [c, r] = createCache({
    i: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({Et: t, Kt: l, ln: i, At: a}) => {
    let [u, d] = r(a);
    const {M: _} = getEnvironment();
    const {_t: f, Ct: p, Ot: v} = l || {};
    const {et: h} = i;
    const [g, b] = t("paddingAbsolute");
    const x = a || p;
    if (f || d || x) {
      [u, d] = c(a);
    }
    const H = !s && (b || v || d);
    if (H) {
      const t = !g || !n && !_;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [$]: t && !h ? -s : 0,
        [C]: t ? -c : 0,
        [O]: t && h ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? h ? -u.r : "auto" : 0,
        left: t ? h ? "auto" : -u.l : 0,
        [E]: t && `calc(100% + ${s}px)`
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
        en: u,
        an: !t,
        ct: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      un: H
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {vt: c, en: r, nt: l, tt: i, ht: a, Tt: u, yt: d, rn: _} = t;
  const {M: f} = e;
  const p = u && i;
  const v = bind(o, 0);
  const h = [ "display", "direction", "flexDirection", "writingMode" ];
  const g = {
    i: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const b = {
    i: equalXY,
    o: {}
  };
  const getOverflowAmount = (t, o) => {
    const s = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const e = {
      w: v(t.w - o.w),
      h: v(t.h - o.h)
    };
    return {
      w: e.w > s ? e.w : 0,
      h: e.h > s ? e.h : 0
    };
  };
  const measureScrollCoordinates = () => {
    const t = getElementScroll(a);
    const n = d(tt, true);
    const o = addEventListener(a, T, stopPropagation, {
      H: true
    });
    scrollElementTo(a, {
      x: 0,
      y: 0
    });
    n();
    const s = getElementScroll(a);
    const e = V(a);
    scrollElementTo(a, {
      x: e.w,
      y: e.h
    });
    const c = getElementScroll(a);
    scrollElementTo(a, {
      x: c.x - s.x < 1 && -e.w,
      y: c.y - s.y < 1 && -e.h
    });
    const r = getElementScroll(a);
    scrollElementTo(a, t);
    o();
    return {
      I: s,
      T: r
    };
  };
  const getFlowDirectionStyles = () => assignDeep({}, hasDimensions(l) ? getStyles(l, h) : {});
  const [w, y] = createCache(g, bind(getFractionalSize, l));
  const [S, m] = createCache(g, bind(V, l));
  const [O, $] = createCache(g);
  const [C] = createCache(b);
  const [x, H] = createCache(g);
  const [E] = createCache(b);
  const [z] = createCache({
    i: (t, n) => equal(t, n, h),
    o: {}
  });
  const [D, k] = createCache({
    i: (t, n) => equalXY(t.I, n.I) && equalXY(t.T, n.T),
    o: getZeroScrollCoordinates()
  });
  const M = getStaticPluginModuleInstance(Dt);
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? W : J;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  const setViewportOverflow = t => {
    const {K: n} = t;
    each(keys(n), (t => {
      const o = t === "x";
      const s = [ A, I, T ].map((t => createViewportOverflowStyleClassName(t, o)));
      d(s.join(" "));
      d(createViewportOverflowStyleClassName(n[t], o), true);
    }));
  };
  return ({Et: n, Kt: i, ln: a, At: u}, {un: h}) => {
    const {_t: g, Ct: b, Ot: A, dt: I, Ht: T} = i || {};
    const V = M && M.Z(t, s, a, e, n);
    const {lt: L, it: P, ut: U} = V || {};
    const [N, j] = getShowNativeOverlaidScrollbars(n, e);
    const [F, X] = n("overflow");
    const Y = overflowIsVisible(F.x);
    const W = overflowIsVisible(F.y);
    const J = g || h || b || A || T || j;
    let K = y(u);
    let G = m(u);
    let Z = $(u);
    let tt = H(u);
    if (j && f) {
      d(Q, !N);
    }
    if (J) {
      const [t] = P ? P() : [];
      const [n] = K = w(u);
      const [s] = G = S(u);
      const e = R(l);
      const c = s;
      const r = e;
      t && t();
      const i = getWindowSize(_());
      const a = {
        w: v(o(s.w, c.w) + n.w),
        h: v(o(s.h, c.h) + n.h)
      };
      const d = {
        w: v((p ? i.w : r.w + v(e.w - s.w)) + n.w),
        h: v((p ? i.h : r.h + v(e.h - s.h)) + n.h)
      };
      tt = x(d);
      Z = O(getOverflowAmount(a, d), u);
    }
    const [ot, st] = tt;
    const [et, ct] = Z;
    const [rt, lt] = G;
    const [it, at] = K;
    const [ut, dt] = C({
      x: et.w > 0,
      y: et.h > 0
    });
    const _t = Y && W && (ut.x || ut.y) || Y && ut.x && !ut.y || W && ut.y && !ut.x;
    const ft = h || A || T || at || lt || st || ct || X || j || J;
    const pt = createViewportOverflowState(ut, F);
    const [vt, ht] = E(pt.K);
    const [, gt] = z(getFlowDirectionStyles(), u);
    const bt = A || I || gt || dt || u;
    const [wt, yt] = bt ? D(measureScrollCoordinates(), u) : k();
    if (ft) {
      setViewportOverflow(pt);
      if (U && L) {
        setStyles(l, U(pt, a, L(pt, rt, it)));
      }
    }
    addRemoveAttrClass(c, B, q, _t);
    addRemoveAttrClass(r, nt, q, _t);
    assignDeep(s, {
      K: vt,
      Rt: {
        x: ot.w,
        y: ot.h
      },
      Mt: {
        x: et.w,
        y: et.h
      },
      sn: ut,
      Lt: sanatizeScrollCoordinates(wt, et)
    });
    return {
      tn: ht,
      Qt: st,
      Zt: ct,
      nn: yt || ct
    };
  };
};

const createStructureSetup = t => {
  const [n, o, s] = createStructureSetupElements(t);
  const e = {
    en: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    an: false,
    ct: {
      [$]: 0,
      [C]: 0,
      [O]: 0,
      [w]: 0,
      [y]: 0,
      [m]: 0,
      [S]: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    Mt: {
      x: 0,
      y: 0
    },
    K: {
      x: I,
      y: I
    },
    sn: {
      x: false,
      y: false
    },
    Lt: getZeroScrollCoordinates()
  };
  const {ft: c, ht: r, tt: l, yt: i} = n;
  const {M: a, k: u} = getEnvironment();
  const d = !a && (u.x || u.y);
  const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
  return [ o, t => {
    const n = {};
    const o = d;
    const s = i(G, true);
    const e = o && getElementScroll(r);
    each(_, (o => {
      assignDeep(n, o(t, n) || {});
    }));
    scrollElementTo(r, e);
    !l && scrollElementTo(c, 0);
    s();
    return n;
  }, e, n, s ];
};

const createSetups = (t, n, o, s) => {
  const e = createOptionCheck(n, {});
  const [c, r, l, i, a] = createStructureSetup(t);
  const [u, d, _] = createObserversSetup(i, l, e, (t => {
    update({}, t);
  }));
  const [f, p, , v] = createScrollbarsSetup(t, n, _, l, i, s);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, s) => {
    const {dn: e, At: c, zt: l, _n: i} = t;
    const a = e || {};
    const u = !!c;
    const f = {
      Et: createOptionCheck(n, a, u),
      dn: a,
      At: u
    };
    if (i) {
      p(f);
      return false;
    }
    const v = s || d(assignDeep({}, f, {
      zt: l
    }));
    const h = r(assignDeep({}, f, {
      ln: _,
      Kt: v
    }));
    p(assignDeep({}, f, {
      Kt: v,
      Gt: h
    }));
    const g = updateHintsAreTruthy(v);
    const b = updateHintsAreTruthy(h);
    const w = g || b || !isEmptyObject(a) || u;
    w && o(t, {
      Kt: v,
      Gt: h
    });
    return w;
  };
  return [ () => {
    const {cn: t, ht: n, yt: o} = i;
    const s = o(G, true);
    const e = getElementScroll(t);
    const r = [ u(), c(), f() ];
    scrollElementTo(n, e);
    s();
    return bind(runEachAndClear, r);
  }, update, () => ({
    fn: _,
    pn: l
  }), {
    vn: i,
    hn: v
  }, a ];
};

const OverlayScrollbars = (t, n, o) => {
  const {U: s} = getEnvironment();
  const e = isHTMLElement(t);
  const c = e ? t : t.target;
  const r = getInstance(c);
  if (n && !r) {
    let r = false;
    const l = [];
    const i = {};
    const validateOptions = t => {
      const n = removeUndefinedProperties(t, true);
      const o = getStaticPluginModuleInstance(At);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, d, _] = createEventListenerHub();
    const [f, p, v] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      v(t, n);
      _(t, n);
    };
    const [h, g, b, w, y] = createSetups(t, a, (({dn: t, At: n}, {Kt: o, Gt: s}) => {
      const {_t: e, Ot: c, $t: r, Ct: l, xt: i, dt: a} = o;
      const {Qt: u, Zt: d, tn: _, nn: f} = s;
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
              dn: e
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
        const {fn: t, pn: n} = b();
        const {et: o} = t;
        const {Rt: s, Mt: e, K: c, sn: l, en: i, an: a, Lt: u} = n;
        return assignDeep({}, {
          overflowEdge: s,
          overflowAmount: e,
          overflowStyle: c,
          hasOverflow: l,
          scrollCoordinates: {
            start: u.I,
            end: u.T
          },
          padding: i,
          paddingAbsolute: a,
          directionRTL: o,
          destroyed: r
        });
      },
      elements() {
        const {ft: t, vt: n, en: o, nt: s, gt: e, ht: c, Jt: r} = w.vn;
        const {qt: l, Yt: i} = w.hn;
        const translateScrollbarStructure = t => {
          const {kt: n, Dt: o, Vt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Ft: n, Bt: o} = t;
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
        At: t,
        zt: true
      }),
      destroy: bind(destroy, false),
      plugin: t => i[keys(t)[0]]
    };
    push(l, [ y ]);
    addInstance(c, S);
    registerPluginModuleInstances(Et, OverlayScrollbars, [ S, u, i ]);
    if (cancelInitialization(w.vn.Tt, !e && t.cancel)) {
      destroy(true);
      return S;
    }
    push(l, h());
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
  const {D: t, k: n, M: o, R: s, j: e, q: c, L: r, P: l, U: i, N: a} = getEnvironment();
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

exports.ClickScrollPlugin = Rt;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = kt;

exports.SizeObserverPlugin = Tt;
//# sourceMappingURL=overlayscrollbars.cjs.js.map
