/*!
 * OverlayScrollbars
 * Version: 2.4.5
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

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

const t = typeof window !== "undefined";

const n = t && Node.ELEMENT_NODE;

const {toString: o, hasOwnProperty: s} = Object.prototype;

const e = /^\[object (.+)\]$/;

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : o.call(t).replace(e, "$1").toLowerCase();

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
  const e = t[o];
  const c = e && e.prototype;
  const r = s.call(t, o);
  const l = c && s.call(c, "isPrototypeOf");
  if (e && !r && !l) {
    return false;
  }
  for (n in t) {}
  return isUndefined(n) || s.call(t, n);
};

const isHTMLElement = t => {
  const o = HTMLElement;
  return t ? o ? t instanceof o : t.nodeType === n : false;
};

const isElement = t => {
  const o = Element;
  return t ? o ? t instanceof o : t.nodeType === n : false;
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

const c = t && Element.prototype;

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
    const o = c.matches || c.msMatchesSelector;
    return o.call(t, n);
  }
  return false;
};

const contents = t => t ? from(t.childNodes) : [];

const parent = t => t && t.parentElement;

const closest = (t, n) => {
  if (isElement(t)) {
    const o = c.closest;
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

const r = t ? window : {};

const l = Math.max;

const i = Math.min;

const a = Math.round;

const u = Math.abs;

const f = r.cancelAnimationFrame;

const _ = r.requestAnimationFrame;

const d = r.setTimeout;

const v = r.clearTimeout;

const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);

const getDummyStyle = () => createDiv().style;

const h = [ "-webkit-", "-moz-", "-o-", "-ms-" ];

const p = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];

const g = {};

const b = {};

const cssProperty = t => {
  let n = b[t];
  if (hasOwnProperty(b, t)) {
    return n;
  }
  const o = firstLetterToUpper(t);
  const s = getDummyStyle();
  each(h, (e => {
    const c = e.replace(/-/g, "");
    const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
    return !(n = r.find((t => s[t] !== void 0)));
  }));
  return b[t] = n || "";
};

const jsAPI = t => {
  let n = g[t] || r[t];
  if (hasOwnProperty(g, t)) {
    return n;
  }
  each(p, (o => {
    n = n || r[o + firstLetterToUpper(t)];
    return !n;
  }));
  g[t] = n;
  return n;
};

const w = jsAPI("MutationObserver");

const y = jsAPI("IntersectionObserver");

const m = jsAPI("ResizeObserver");

const S = jsAPI("ScrollTimeline");

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
  const {v: r, p: l, g: i} = n || {};
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

const $ = /[^\x20\t\r\n\f]+/g;

const classListAction = (t, n, o) => {
  const s = t && t.classList;
  let e;
  let c = 0;
  let r = false;
  if (s && n && isString(n)) {
    const t = n.match($) || [];
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

const validFiniteNumber = t => {
  const n = t || 0;
  return isFinite(n) ? n : 0;
};

function style(t, n) {
  const o = isString(n);
  const s = isArray(n) || o;
  if (s) {
    let s = o ? "" : {};
    if (t) {
      const e = r.getComputedStyle(t, null);
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

const ratioToCssPercent = t => `${(validFiniteNumber(t) * 100).toFixed(3)}%`;

const numberToCssPx = t => `${validFiniteNumber(t)}px`;

const O = "paddingTop";

const C = "paddingRight";

const H = "paddingLeft";

const z = "paddingBottom";

const I = "marginLeft";

const A = "marginRight";

const E = "marginBottom";

const T = "overflowX";

const D = "overflowY";

const k = "width";

const M = "height";

const R = "hidden";

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

const V = bind(getElmWidthHeightProperty, "client");

const U = bind(getElmWidthHeightProperty, "scroll");

const fractionalSize = t => {
  const n = parseFloat(style(t, k)) || 0;
  const o = parseFloat(style(t, M)) || 0;
  return {
    w: n - a(n),
    h: o - a(o)
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

const equalBCRWH = (t, n, o) => equal(t, n, [ k, M ], o && (t => a(t)));

let B;

const j = "passive";

const supportPassiveEvents = () => {
  if (isUndefined(B)) {
    B = false;
    try {
      r.addEventListener(j, noop, Object.defineProperty({}, j, {
        get() {
          B = true;
        }
      }));
    } catch (t) {}
  }
  return B;
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
    x: n.left + r.pageYOffset,
    y: n.top + r.pageXOffset
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

const G = {
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

const q = `data-overlayscrollbars`;

const F = "os-environment";

const W = `${F}-flexbox-glue`;

const X = `${W}-max`;

const Y = `os-scrollbar-hidden`;

const J = `${q}-initialize`;

const K = q;

const Z = `${K}-overflow-x`;

const Q = `${K}-overflow-y`;

const tt = "overflowVisible";

const nt = "scrollbarHidden";

const ot = "scrollbarPressed";

const st = "updating";

const et = `${q}-viewport`;

const ct = "arrange";

const rt = "scrollbarHidden";

const lt = tt;

const it = `${q}-padding`;

const at = lt;

const ut = `${q}-content`;

const ft = "os-size-observer";

const _t = `${ft}-appear`;

const dt = `${ft}-listener`;

const vt = `${dt}-scroll`;

const ht = `${dt}-item`;

const pt = `${ht}-final`;

const gt = "os-trinsic-observer";

const bt = "os-no-css-vars";

const wt = "os-theme-none";

const yt = "os-scrollbar";

const mt = `${yt}-rtl`;

const St = `${yt}-horizontal`;

const $t = `${yt}-vertical`;

const xt = `${yt}-track`;

const Ot = `${yt}-handle`;

const Ct = `${yt}-visible`;

const Ht = `${yt}-cornerless`;

const zt = `${yt}-transitionless`;

const It = `${yt}-interaction`;

const At = `${yt}-unusable`;

const Et = `${yt}-auto-hide`;

const Tt = `${Et}-hidden`;

const Dt = `${yt}-wheel`;

const kt = `${xt}-interactive`;

const Mt = `${Ot}-interactive`;

const Rt = {};

const Pt = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    Rt[o] = t[o];
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

const Vt = "__osSizeObserverPlugin";

const Ut = /* @__PURE__ */ (() => ({
  [Vt]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${ht}" dir="ltr"><div class="${ht}"><div class="${pt}"></div></div><div class="${ht}"><div class="${pt}" style="width: 200%; height: 200%"></div></div></div>`);
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
      addClass(t, vt);
      style(a, {
        [k]: s,
        [M]: s
      });
      _(reset);
      return [ o ? bind(onScroll, false) : reset, p ];
    }
  }
}))();

let Bt = 0;

const jt = "__osScrollbarsHidingPlugin";

const Nt = /* @__PURE__ */ (() => ({
  [jt]: {
    static: () => ({
      C: t => {
        const {H: n, I: o, A: s} = t;
        const e = !s && !n && (o.x || o.y);
        const c = e ? document.createElement("style") : false;
        if (c) {
          attr(c, "id", `${et}-${ct}-${Bt}`);
          Bt++;
        }
        return c;
      },
      T: (t, n, o, s, e, c, r) => {
        const arrangeViewport = (n, c, r, l) => {
          if (t) {
            const {D: t} = e;
            const {k: i, M: a} = n;
            const {x: u, y: f} = a;
            const {x: _, y: d} = i;
            const v = l ? C : H;
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
                    t.insertRule(`#${attr(s, "id")} + [${et}~='${ct}']::before {}`, 0);
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
            const {M: f} = a;
            const {x: _, y: d} = f;
            const v = {};
            const assignProps = t => each(t, (t => {
              v[t] = u[t];
            }));
            if (_) {
              assignProps([ E, O, z ]);
            }
            if (d) {
              assignProps([ I, A, H, C ]);
            }
            const h = style(o, keys(v));
            attrClass(o, et, ct);
            if (!n) {
              v[M] = "";
            }
            style(o, v);
            return [ () => {
              r(a, l, t, h);
              style(o, h);
              attrClass(o, et, ct, true);
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
            assignDeep(o.P, p);
          }
          t = e;
          n = i;
          return h;
        };
      }
    })
  }
}))();

const Gt = "__osClickScrollPlugin";

const qt = /* @__PURE__ */ (() => ({
  [Gt]: {
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

let Ft;

const getNativeScrollbarSize = (t, n, o, s) => {
  appendChildren(t, n);
  const e = V(n);
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
  const o = addClass(t, Y);
  try {
    n = style(t, cssProperty("scrollbar-width")) === "none" || r.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display") === "none";
  } catch (s) {}
  o();
  return n;
};

const getRtlScrollBehavior = (t, n) => {
  style(t, {
    [T]: R,
    [D]: R,
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
  const o = addClass(t, W);
  const s = getBoundingClientRect(t);
  const e = getBoundingClientRect(n);
  const c = equalBCRWH(e, s, true);
  const r = addClass(t, X);
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
  const d = assignDeep({}, G);
  const v = bind(assignDeep, {}, d);
  const h = bind(assignDeep, {}, _);
  const p = {
    P: a,
    I: f,
    H: u,
    A: style(o, "zIndex") === "-1",
    L: !!S,
    V: getRtlScrollBehavior(o, s),
    U: getFlexboxGlue(o, s),
    B: bind(e, "r"),
    j: h,
    N: t => assignDeep(_, t) && h(),
    G: v,
    q: t => assignDeep(d, t) && v(),
    F: assignDeep({}, _),
    W: assignDeep({}, d)
  };
  removeAttr(o, "style");
  removeElements(o);
  r.addEventListener("resize", (() => {
    let t;
    if (!u && (!f.x || !f.y)) {
      const n = getStaticPluginModuleInstance(jt);
      const o = n ? n.R() : noop;
      t = !!o(p, l);
    }
    c("r", [ t ]);
  }));
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
  const {I: e, H: c, j: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const f = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!f || !!_;
};

const Wt = new WeakMap;

const addInstance = (t, n) => {
  Wt.set(t, n);
};

const removeInstance = t => {
  Wt.delete(t);
};

const getInstance = t => Wt.get(t);

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
        const x = inArray(h, e) && $;
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
          v = v || x;
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
  const g = new w(bind(observerCallback, false));
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
  const r = getStaticPluginModuleInstance(Vt);
  const {V: l} = getEnvironment();
  const i = bind(getDirectionIsRTL, t);
  const [a] = createCache({
    o: false,
    _: true
  });
  return () => {
    const o = [];
    const u = createDOM(`<div class="${ft}"><div class="${dt}"></div></div>`);
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
    if (m) {
      const t = new m((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(_);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (r) {
      const [t, n] = r(_, onSizeChangedCallbackProxy, c);
      push(o, concat([ addClass(f, _t), addEventListener(f, "animationstart", t) ], n));
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
  const s = createDiv(gt);
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
    if (y) {
      o = new y(bind(intersectionObserverCallback, false), {
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

const createObserversSetup = (t, n) => {
  let o;
  let s;
  let e;
  let c;
  let r;
  const {H: l} = getEnvironment();
  const i = `[${K}]`;
  const a = `[${et}]`;
  const u = [ "tabindex" ];
  const f = [ "wrap", "cols", "rows" ];
  const _ = [ "id", "class", "style", "open" ];
  const d = {
    ct: false,
    rt: getDirectionIsRTL(t.lt)
  };
  const {lt: v, it: h, ut: p, ft: g, _t: b, dt: w, vt: y} = t;
  const {U: S, B: $} = getEnvironment();
  const [x] = createCache({
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const t = w(lt, tt);
    const n = w(ct, "");
    const o = n && getElmentScroll(h);
    y(lt, tt);
    y(ct, "");
    y("", st, true);
    const s = U(p);
    const e = U(h);
    const c = fractionalSize(h);
    y(lt, tt, t);
    y(ct, "", n);
    y("", st);
    scrollElementTo(h, o);
    return {
      w: e.w + s.w + c.w,
      h: e.h + s.h + c.h
    };
  }));
  const O = g ? f : concat(_, f);
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
    const [, s] = x();
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
  const [H, z] = p || !S ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const I = !b && createSizeObserver(v, onSizeChanged, {
    ot: true,
    nt: true
  });
  const [A, E] = createDOMObserver(v, false, onHostMutation, {
    Y: _,
    X: concat(_, u)
  });
  const T = b && m && new m((t => {
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
      const [, n] = x();
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
  }, ({St: t, $t: n, xt: r}) => {
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
        X: concat(O, f || []),
        J: d,
        K: i,
        tt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !b ? liesBetween(o, i, a) : false;
          return e || !!closest(o, `.${yt}`) || !!ignoreMutationFromOptions(t);
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
    const t = n ? k : M;
    const {Ot: s, Ct: e} = o;
    const c = getBoundingClientRect(e)[t];
    const r = getBoundingClientRect(s)[t];
    return capNumber(0, 1, c / r);
  }
  const s = n ? "x" : "y";
  const {Ht: e, zt: c} = t;
  const r = c[s];
  const l = e[s];
  return capNumber(0, 1, r / (r + l));
};

const getScrollbarHandleOffsetRatio = (t, n, o, s) => {
  const e = getScrollbarHandleLengthRatio(t, s, n);
  return 1 / e * (1 - e) * o;
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const {j: e, A: c} = getEnvironment();
  const {scrollbars: r} = e();
  const {slot: i} = r;
  const {It: a, lt: u, it: f, At: _, Et: v, Tt: h, _t: p} = n;
  const {scrollbars: g} = _ ? {} : t;
  const {slot: b} = g || {};
  const w = new Map;
  const initScrollTimeline = t => S && new S({
    source: v,
    axis: t
  });
  const y = initScrollTimeline("x");
  const m = initScrollTimeline("y");
  const $ = dynamicInitializationElement([ a, u, f ], (() => p && h ? a : u), i, b);
  const doRefreshScrollbarOffset = t => p && !h && parent(t) === f;
  const cancelElementAnimations = t => {
    w.forEach(((n, o) => {
      const s = t ? inArray(isArray(t) ? t : [ t ], o) : true;
      if (s) {
        (n || []).forEach((t => {
          t && t.cancel();
        }));
        w.delete(o);
      }
    }));
  };
  const scrollbarStructureAddRemoveClass = (t, n, o) => {
    const s = o ? addClass : removeClass;
    each(t, (t => {
      s(t.Dt, n);
    }));
  };
  const scrollbarStyle = (t, n) => {
    each(t, (t => {
      const [o, s] = n(t);
      style(o, s);
    }));
  };
  const animateElement = (t, n, o, s) => n && t.animate(o, {
    timeline: n,
    composite: s
  });
  const scrollbarStructureRefreshHandleLength = (t, n) => {
    scrollbarStyle(t, (t => {
      const {Ct: s} = t;
      return [ s, {
        [n ? k : M]: ratioToCssPercent(getScrollbarHandleLengthRatio(o, n))
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n) => {
    if (y && m) {
      t.forEach((t => {
        const {Dt: s, Ct: e} = t;
        const c = bind(getScrollbarHandleOffsetRatio, o, t);
        const r = n && getDirectionIsRTL(s);
        const l = c(r ? 1 : 0, n);
        const i = c(r ? 0 : 1, n);
        cancelElementAnimations(e);
        w.set(e, [ animateElement(e, n ? y : m, assignDeep({
          transform: [ getTrasformTranslateValue(ratioToCssPercent(l), n), getTrasformTranslateValue(ratioToCssPercent(i), n) ]
        }, r ? {
          clear: [ "left" ]
        } : {})) ]);
      }));
    } else {
      scrollbarStyle(t, (t => {
        const {Ct: s, Dt: e} = t;
        const {V: c} = getEnvironment();
        const r = n ? "x" : "y";
        const {Ht: l} = o;
        const i = getDirectionIsRTL(e);
        const a = getScrollbarHandleOffsetRatio(o, t, getScrollbarHandleOffsetPercent(getElmentScroll(v)[r], l[r], n && i && c), n);
        return [ s, {
          transform: getTrasformTranslateValue(ratioToCssPercent(a), n)
        } ];
      }));
    }
  };
  const styleScrollbarPosition = t => {
    const {Dt: n} = t;
    const o = doRefreshScrollbarOffset(n) && n;
    const {x: s, y: e} = getElmentScroll(v);
    return [ o, {
      transform: o ? getTrasformTranslateValue({
        x: numberToCssPx(s),
        y: numberToCssPx(e)
      }) : ""
    } ];
  };
  const animateScrollbarOffset = (t, n, o, s) => animateElement(t, n, {
    transform: [ getTrasformTranslateValue(numberToCssPx(0), s), getTrasformTranslateValue(numberToCssPx(l(0, o - .5)), s) ]
  }, "add");
  const x = [];
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
    if (p) {
      if (m && m) {
        const {Ht: t} = o;
        concat(C, O).forEach((({Dt: n}) => {
          cancelElementAnimations(n);
          if (doRefreshScrollbarOffset(n)) {
            w.set(n, [ animateScrollbarOffset(n, y, t.x, true), animateScrollbarOffset(n, m, t.y) ]);
          }
        }));
      } else {
        scrollbarStyle(O, styleScrollbarPosition);
        scrollbarStyle(C, styleScrollbarPosition);
      }
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? St : $t;
    const o = t ? O : C;
    const e = isEmptyArray(o) ? zt : "";
    const r = createDiv(`${yt} ${n} ${e}`);
    const l = createDiv(xt);
    const i = createDiv(Ot);
    const a = {
      Dt: r,
      Ot: l,
      Ct: i
    };
    if (!c) {
      addClass(r, bt);
    }
    push(o, a);
    push(x, [ appendChildren(r, l), appendChildren(l, i), bind(removeElements, r), cancelElementAnimations, s(a, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
    return a;
  };
  const H = bind(generateScrollbarDOM, true);
  const z = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren($, O[0].Dt);
    appendChildren($, C[0].Dt);
    d((() => {
      scrollbarsAddRemoveClass(zt);
    }), 300);
    return bind(runEachAndClear, x);
  };
  H();
  z();
  return [ {
    kt: refreshScrollbarsHandleLength,
    Mt: refreshScrollbarsHandleOffset,
    Rt: refreshScrollbarsScrollbarOffset,
    Pt: scrollbarsAddRemoveClass,
    Lt: {
      L: y,
      Vt: O,
      Ut: H,
      Bt: bind(scrollbarStyle, O)
    },
    jt: {
      L: m,
      Vt: C,
      Ut: z,
      Bt: bind(scrollbarStyle, C)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o) => {
  const {lt: s, Et: e, Nt: c} = n;
  return (n, r, l, i) => {
    const {Dt: u, Ot: f, Ct: _} = n;
    const [d, v] = selfClearTimeout(333);
    const [h, p] = selfClearTimeout();
    const g = bind(l, [ n ], i);
    const b = !!e.scrollBy;
    const w = `client${i ? "X" : "Y"}`;
    const y = i ? k : M;
    const m = i ? "left" : "top";
    const S = i ? "w" : "h";
    const $ = i ? "x" : "y";
    const isAffectingTransition = t => t.propertyName.indexOf(y) > -1;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {Ht: c} = o;
        const r = L(f)[S] - L(_)[S];
        const l = n * s / r;
        const i = l * c[$];
        scrollElementTo(e, {
          [$]: t + i
        });
      };
      return addEventListener(f, "pointerdown", (o => {
        const r = closest(o.target, `.${Ot}`) === _;
        const l = r ? _ : f;
        const i = t.scrollbars;
        const {button: u, isPrimary: d, pointerType: v} = o;
        const {pointers: h} = i;
        const p = u === 0 && d && i[r ? "dragScroll" : "clickScroll"] && (h || []).includes(v);
        attrClass(s, K, ot, true);
        if (p) {
          const t = !r && o.shiftKey;
          const i = bind(getBoundingClientRect, _);
          const u = bind(getBoundingClientRect, f);
          const getHandleOffset = (t, n) => (t || i())[m] - (n || u())[m];
          const d = a(getBoundingClientRect(e)[y]) / L(e)[S] || 1;
          const v = createRelativeHandleMove(getElmentScroll(e)[$] || 0, 1 / d);
          const h = o[w];
          const p = i();
          const g = u();
          const b = p[y];
          const x = getHandleOffset(p, g) + b / 2;
          const O = h - g[m];
          const C = r ? 0 : O - x;
          const releasePointerCapture = t => {
            runEachAndClear(H);
            l.releasePointerCapture(t.pointerId);
          };
          const H = [ bind(attrClass, s, K, ot), addEventListener(c, n, releasePointerCapture), addEventListener(c, "selectstart", (t => preventDefault(t)), {
            S: false
          }), addEventListener(f, n, releasePointerCapture), addEventListener(f, "pointermove", (n => {
            const o = n[w] - h;
            if (r || t) {
              v(C + o);
            }
          })) ];
          if (t) {
            v(C);
          } else if (!r) {
            const t = getStaticPluginModuleInstance(Gt);
            t && push(H, t(v, getHandleOffset, C, b, O));
          }
          l.setPointerCapture(o.pointerId);
        }
      }));
    };
    let x = true;
    return bind(runEachAndClear, [ addEventListener(u, "pointerenter", (() => {
      r(It, true);
    })), addEventListener(u, "pointerleave pointercancel", (() => {
      r(It, false);
    })), addEventListener(u, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: c} = t;
      if (b && x && c === 0 && parent(u) === s) {
        e.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      x = false;
      r(Dt, true);
      d((() => {
        x = true;
        r(Dt);
      }));
      preventDefault(t);
    }), {
      S: false,
      $: true
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
      O: true,
      $: true
    }), {
      $: true
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
  const [w, y] = selfClearTimeout(100);
  const [m, S] = selfClearTimeout(100);
  const [$, x] = selfClearTimeout((() => _));
  const [O, C] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s));
  const {lt: H, Gt: z, Tt: I} = e;
  const {Pt: A, kt: E, Mt: T, Rt: D} = O;
  const manageAutoHideSuspension = t => {
    A(Et, t, true);
    A(Et, t, false);
  };
  const manageScrollbarsAutoHide = (t, n) => {
    x();
    if (t) {
      A(Tt);
    } else {
      const t = bind(A, Tt, true);
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
  const k = [ b, x, y, S, p, v, () => f(), addEventListener(H, "pointerover", onHostMouseEnter, {
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
      T();
      i && manageScrollbarsAutoHide(true);
      g((() => {
        i && !a && manageScrollbarsAutoHide(false);
      }));
    }));
    c(t);
    D();
  })) ];
  return [ () => bind(runEachAndClear, push(k, C())), ({St: t, xt: n, qt: e, Ft: c}) => {
    const {Wt: a, Xt: d, Yt: v} = c || {};
    const {gt: h, ot: p} = e || {};
    const {rt: g} = o;
    const {I: b} = getEnvironment();
    const {Ht: w, Jt: y, Kt: S} = s;
    const [$, x] = t("showNativeOverlaidScrollbars");
    const [O, C] = t("scrollbars.theme");
    const [H, k] = t("scrollbars.visibility");
    const [M, R] = t("scrollbars.autoHide");
    const [P, L] = t("scrollbars.autoHideSuspend");
    const [V] = t("scrollbars.autoHideDelay");
    const [U, B] = t("scrollbars.dragScroll");
    const [j, N] = t("scrollbars.clickScroll");
    const G = p && !n;
    const q = S.x || S.y;
    const F = a || d || h || n;
    const W = v || k;
    const X = $ && b.x && b.y;
    const setScrollbarVisibility = (t, n) => {
      const o = H === "visible" || H === "auto" && t === "scroll";
      A(Ct, o, n);
      return o;
    };
    _ = V;
    if (G) {
      if (P && q) {
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
    if (x) {
      A(wt, X);
    }
    if (C) {
      A(u);
      A(O, true);
      u = O;
    }
    if (L && !P) {
      manageAutoHideSuspension(true);
    }
    if (R) {
      r = M === "move";
      l = M === "leave";
      i = M !== "never";
      manageScrollbarsAutoHide(!i, true);
    }
    if (B) {
      A(Mt, U);
    }
    if (N) {
      A(kt, j);
    }
    if (W) {
      const t = setScrollbarVisibility(y.x, true);
      const n = setScrollbarVisibility(y.y, false);
      const o = t && n;
      A(Ht, !o);
    }
    if (F) {
      E();
      T();
      D();
      A(At, !w.x, true);
      A(At, !w.y, false);
      A(mt, g && !I);
    }
  }, {}, O ];
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {j: o, H: s} = n;
  const e = getStaticPluginModuleInstance(jt);
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
  const x = bind(staticInitializationElement, [ b ]);
  const O = bind(dynamicInitializationElement, [ b ]);
  const C = bind(resolveInitialization, [ b ]);
  const H = bind(createDiv, "");
  const z = bind(x, H, a);
  const I = bind(O, H, u);
  const A = z(p);
  const E = A === b;
  const T = E && S;
  const D = !E && I(g);
  const k = !E && isHTMLElement(A) && A === D;
  const M = k && !!C(u);
  const R = M ? z() : A;
  const P = M ? D : I();
  const L = k ? R : A;
  const V = T ? m : L;
  const U = w ? x(H, l, v) : b;
  const B = T ? V : U;
  const j = k ? P : D;
  const N = y.activeElement;
  const G = !E && $.top === $ && N === b;
  const q = {
    It: b,
    lt: B,
    it: V,
    Zt: !E && O(H, i, h),
    ut: j,
    Qt: !E && !s && c && c(n),
    Et: T ? m : V,
    Gt: T ? y : V,
    tn: $,
    Nt: y,
    ft: w,
    Tt: S,
    At: f,
    _t: E,
    nn: k,
    dt: (t, n) => hasAttrClass(V, E ? K : et, E ? n : t),
    vt: (t, n, o) => attrClass(V, E ? K : et, E ? n : t, o)
  };
  const F = keys(q).reduce(((t, n) => {
    const o = q[n];
    return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? inArray(F, t) : null;
  const {It: W, lt: X, Zt: tt, it: nt, ut: ot, Qt: st} = q;
  const ct = [ () => {
    removeAttr(X, K);
    removeAttr(X, J);
    removeAttr(W, J);
    if (S) {
      removeAttr(m, K);
      removeAttr(m, J);
    }
  } ];
  const lt = w && elementIsGenerated(X);
  let at = w ? W : contents([ ot, nt, tt, X, W ].find((t => elementIsGenerated(t) === false)));
  const ft = T ? W : ot || nt;
  const _t = bind(runEachAndClear, ct);
  const appendElements = () => {
    attr(X, K, E ? "viewport" : "host");
    attr(tt, it, "");
    attr(ot, ut, "");
    if (!E) {
      attr(nt, et, "");
    }
    const t = S && !E ? addClass(parent(b), Y) : noop;
    const unwrap = t => {
      appendChildren(parent(t), contents(t));
      removeElements(t);
    };
    if (lt) {
      insertAfter(W, X);
      push(ct, (() => {
        insertAfter(X, W);
        removeElements(X);
      }));
    }
    appendChildren(ft, at);
    appendChildren(X, tt);
    appendChildren(tt || X, !E && nt);
    appendChildren(nt, ot);
    push(ct, (() => {
      t();
      removeAttr(tt, it);
      removeAttr(ot, ut);
      removeAttr(nt, Z);
      removeAttr(nt, Q);
      removeAttr(nt, et);
      elementIsGenerated(ot) && unwrap(ot);
      elementIsGenerated(nt) && unwrap(nt);
      elementIsGenerated(tt) && unwrap(tt);
    }));
    if (s && !E) {
      attrClass(nt, et, rt, true);
      push(ct, bind(removeAttr, nt, et));
    }
    if (st) {
      insertBefore(nt, st);
      push(ct, bind(removeElements, st));
    }
    if (G) {
      const t = "tabindex";
      const n = attr(nt, t);
      attr(nt, t, "-1");
      nt.focus();
      const revertViewportTabIndex = () => n ? attr(nt, t, n) : removeAttr(nt, t);
      const o = addEventListener(y, "pointerdown keydown", (() => {
        revertViewportTabIndex();
        o();
      }));
      push(ct, [ revertViewportTabIndex, o ]);
    } else if (N && N.focus) {
      N.focus();
    }
    at = 0;
    return _t;
  };
  return [ q, appendElements, _t ];
};

const createTrinsicUpdateSegment = ({ut: t}) => ({qt: n, sn: o, xt: s}) => {
  const {U: e} = getEnvironment();
  const {ht: c} = n || {};
  const {ct: r} = o;
  const l = (t || !e) && (c || s);
  if (l) {
    style(t, {
      [M]: r ? "" : "100%"
    });
  }
};

const createPaddingUpdateSegment = ({lt: t, Zt: n, it: o, _t: s}, e) => {
  const [c, r] = createCache({
    u: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({St: t, qt: l, sn: i, xt: a}) => {
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
        [A]: t && !g ? -s : 0,
        [E]: t ? -c : 0,
        [I]: t && g ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? g ? -u.r : "auto" : 0,
        left: t ? g ? "auto" : -u.l : 0,
        [k]: t ? `calc(100% + ${s}px)` : ""
      };
      const l = {
        [O]: t ? u.t : 0,
        [C]: t ? u.r : 0,
        [z]: t ? u.b : 0,
        [H]: t ? u.l : 0
      };
      style(n || o, r);
      style(o, l);
      assignDeep(e, {
        Zt: u,
        en: !t,
        D: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      cn: m
    };
  };
};

const createOverflowUpdateSegment = ({lt: t, Zt: n, it: o, Qt: s, _t: e, vt: c, Tt: i, tn: a}, u) => {
  const f = bind(l, 0);
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
      x: R,
      y: R
    }
  };
  const getOverflowAmount = (t, n) => {
    const o = r.devicePixelRatio % 1 !== 0 ? 1 : 0;
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
  const {P: p, U: g, H: b, I: w} = getEnvironment();
  const y = getStaticPluginModuleInstance(jt);
  const m = !e && !b && (w.x || w.y);
  const S = i && e;
  const [$, x] = createCache(v, bind(fractionalSize, o));
  const [O, P] = createCache(v, bind(U, o));
  const [L, B] = createCache(v);
  const [j, N] = createCache(v);
  const [G] = createCache(h);
  const fixFlexboxGlue = (n, s) => {
    style(o, {
      [M]: ""
    });
    if (s) {
      const {en: s, Zt: e} = u;
      const {rn: c, k: r} = n;
      const l = fractionalSize(t);
      const i = V(t);
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
    const [e, c, r, l] = getStatePerAxis(T, w.x, p.x);
    const [i, a, u, f] = getStatePerAxis(D, w.y, p.y);
    return {
      Jt: {
        x: e,
        y: i
      },
      rn: {
        x: c,
        y: a
      },
      k: {
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
    s[T] = c && r ? c : e;
    s[D] = l && e ? l : r;
    return getViewportOverflowState(t, s);
  };
  const hideNativeScrollbars = (t, n, o, s) => {
    const {k: e, M: c} = t;
    const {x: r, y: l} = c;
    const {x: i, y: a} = e;
    const {D: f} = u;
    const _ = n ? I : A;
    const d = n ? H : C;
    const v = f[_];
    const h = f[E];
    const p = f[d];
    const g = f[z];
    s[k] = `calc(100% + ${a + v * -1}px)`;
    s[_] = -a + v;
    s[E] = -i + h;
    if (o) {
      s[d] = p + (l ? a : 0);
      s[z] = g + (r ? i : 0);
    }
  };
  const [q, F] = y ? y.T(m, g, o, s, u, getViewportOverflowState, hideNativeScrollbars) : [ () => m, () => [ noop ] ];
  return ({St: s, qt: r, sn: i, xt: _}, {cn: d}) => {
    const {et: v, wt: h, bt: p, ht: y, gt: m, yt: C} = r || {};
    const {ct: H, rt: z} = i;
    const [M, R] = s("showNativeOverlaidScrollbars");
    const [W, X] = s("overflow");
    const Y = M && w.x && w.y;
    const J = !e && !g && (v || p || h || R || y);
    const ot = v || d || p || m || C || R;
    const st = overflowIsVisible(W.x);
    const ct = overflowIsVisible(W.y);
    const ut = st || ct;
    let ft = x(_);
    let _t = P(_);
    let dt = B(_);
    let vt = N(_);
    let ht;
    if (R && b) {
      c(rt, nt, !Y);
    }
    if (J) {
      ht = getViewportOverflowState(Y);
      fixFlexboxGlue(ht, H);
    }
    if (ot) {
      if (ut) {
        c(lt, tt, false);
      }
      const [t, n] = F(Y, z, ht);
      const [s, e] = ft = $(_);
      const [r, i] = _t = O(_);
      const u = V(o);
      let d = r;
      let v = u;
      t();
      if ((i || e || R) && n && !Y && q(n, r, s, z)) {
        v = V(o);
        d = U(o);
      }
      const h = windowSize(a);
      const p = {
        w: f(l(r.w, d.w) + s.w),
        h: f(l(r.h, d.h) + s.h)
      };
      const g = {
        w: f((S ? h.w : v.w + f(u.w - r.w)) + s.w),
        h: f((S ? h.h : v.h + f(u.h - r.h)) + s.h)
      };
      vt = j(g);
      dt = L(getOverflowAmount(p, g), _);
    }
    const [pt, gt] = vt;
    const [bt, wt] = dt;
    const [yt, mt] = _t;
    const [St, $t] = ft;
    const xt = {
      x: bt.w > 0,
      y: bt.h > 0
    };
    const Ot = st && ct && (xt.x || xt.y) || st && xt.x && !xt.y || ct && xt.y && !xt.x;
    const Ct = d || m || C || $t || mt || gt || wt || X || R || J || ot;
    if (Ct) {
      const n = {
        [A]: 0,
        [E]: 0,
        [I]: 0,
        [k]: "",
        [T]: "",
        [D]: ""
      };
      const s = setViewportOverflowState(Y, xt, W, n);
      const c = q(s, yt, St, z);
      if (!e) {
        hideNativeScrollbars(s, z, c, n);
      }
      if (J) {
        fixFlexboxGlue(s, H);
      }
      if (e) {
        attr(t, Z, n[T]);
        attr(t, Q, n[D]);
      } else {
        style(o, n);
      }
    }
    attrClass(t, K, tt, Ot);
    attrClass(n, it, at, Ot);
    if (!e) {
      attrClass(o, et, lt, ut);
    }
    const [Ht, zt] = G(getViewportOverflowState(Y).Jt);
    assignDeep(u, {
      Jt: Ht,
      zt: {
        x: pt.w,
        y: pt.h
      },
      Ht: {
        x: bt.w,
        y: bt.h
      },
      Kt: xt
    });
    return {
      Yt: zt,
      Wt: gt,
      Xt: wt
    };
  };
};

const createStructureSetup = t => {
  const [n, o, s] = createStructureSetupElements(t);
  const e = {
    Zt: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    en: false,
    D: {
      [A]: 0,
      [E]: 0,
      [I]: 0,
      [O]: 0,
      [C]: 0,
      [z]: 0,
      [H]: 0
    },
    zt: {
      x: 0,
      y: 0
    },
    Ht: {
      x: 0,
      y: 0
    },
    Jt: {
      x: R,
      y: R
    },
    Kt: {
      x: false,
      y: false
    }
  };
  const {It: c, it: r, vt: l, _t: i} = n;
  const {H: a, I: u, U: f} = getEnvironment();
  const _ = !a && (u.x || u.y);
  const d = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
  return [ o, t => {
    const n = {};
    const o = _ || !f;
    const s = o && getElmentScroll(r);
    l("", st, true);
    each(d, (o => {
      assignDeep(n, o(t, n) || {});
    }));
    l("", st);
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
    const {ln: e, xt: r, $t: l, an: i} = t;
    const a = e || {};
    const _ = !!r;
    const v = {
      St: createOptionCheck(n, a, _),
      ln: a,
      xt: _
    };
    if (i) {
      d(v);
      return false;
    }
    const h = s || u(assignDeep({}, v, {
      $t: l
    }));
    const p = c(assignDeep({}, v, {
      sn: f,
      qt: h
    }));
    d(assignDeep({}, v, {
      qt: h,
      Ft: p
    }));
    const g = updateHintsAreTruthy(h);
    const b = updateHintsAreTruthy(p);
    const w = g || b || !isEmptyObject(a) || _;
    w && o(t, {
      qt: h,
      Ft: p
    });
    return w;
  };
  return [ () => {
    const {It: t, it: n, Nt: o, Tt: s} = l;
    const c = s ? o.documentElement : t;
    const r = getElmentScroll(c);
    const i = [ a(), e(), _() ];
    scrollElementTo(n, r);
    return bind(runEachAndClear, i);
  }, update, () => ({
    un: f,
    fn: r
  }), {
    _n: l,
    dn: v
  }, i ];
};

const OverlayScrollbars = (t, n, o) => {
  const {G: s} = getEnvironment();
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
    const [p, g, b, w, y] = createSetups(t, a, (({ln: t, xt: n}, {qt: o, Ft: s}) => {
      const {et: e, gt: c, ht: r, bt: l, wt: i, ot: a} = o;
      const {Wt: u, Xt: f, Yt: _} = s;
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
              ln: e
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
        const {un: t, fn: n} = b();
        const {rt: o} = t;
        const {zt: s, Ht: e, Jt: c, Kt: l, Zt: i, en: a} = n;
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
        const {It: t, lt: n, Zt: o, it: s, ut: e, Et: c, Gt: r} = w._n;
        const {Lt: l, jt: i} = w.dn;
        const translateScrollbarStructure = t => {
          const {Ct: n, Ot: o, Dt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Vt: n, Ut: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              g({
                an: true
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
        xt: t,
        $t: true
      }),
      destroy: bind(destroy, false),
      plugin: t => i[keys(t)[0]]
    };
    push(l, [ y ]);
    addInstance(c, m);
    registerPluginModuleInstances(Rt, OverlayScrollbars, [ m, u, i ]);
    if (cancelInitialization(w._n.Tt, !e && t.cancel)) {
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
  const {P: t, I: n, H: o, V: s, U: e, A: c, L: r, F: l, W: i, j: a, N: u, G: f, q: _} = getEnvironment();
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

export { qt as ClickScrollPlugin, OverlayScrollbars, Nt as ScrollbarsHidingPlugin, Ut as SizeObserverPlugin };
//# sourceMappingURL=overlayscrollbars.esm.js.map
