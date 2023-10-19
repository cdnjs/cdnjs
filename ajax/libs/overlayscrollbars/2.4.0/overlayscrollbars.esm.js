/*!
 * OverlayScrollbars
 * Version: 2.4.0
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

const O = "paddingTop";

const C = "paddingRight";

const z = "paddingLeft";

const H = "paddingBottom";

const I = "marginLeft";

const A = "marginRight";

const E = "marginBottom";

const T = "overflowX";

const D = "overflowY";

const R = "width";

const k = "height";

const M = "hidden";

const L = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : L;

const windowSize = t => getElmWidthHeightProperty("inner", t || r);

const P = bind(getElmWidthHeightProperty, "offset");

const V = bind(getElmWidthHeightProperty, "client");

const U = bind(getElmWidthHeightProperty, "scroll");

const fractionalSize = t => {
  const n = parseFloat(style(t, R)) || 0;
  const o = parseFloat(style(t, k)) || 0;
  return {
    w: n - a(n),
    h: o - a(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const domRectHasDimensions = t => !!(t && (t[k] || t[R]));

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

const equalBCRWH = (t, n, o) => equal(t, n, [ R, k ], o && (t => a(t)));

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

const W = "os-environment";

const F = `${W}-flexbox-glue`;

const X = `${F}-max`;

const Y = `os-scrollbar-hidden`;

const Z = `${q}-initialize`;

const J = q;

const K = `${J}-overflow-x`;

const Q = `${J}-overflow-y`;

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

const zt = `${yt}-cornerless`;

const Ht = `${yt}-transitionless`;

const It = `${yt}-interaction`;

const At = `${yt}-unusable`;

const Et = `${yt}-auto-hide`;

const Tt = `${Et}-hidden`;

const Dt = `${yt}-wheel`;

const Rt = `${xt}-interactive`;

const kt = `${Ot}-interactive`;

const Mt = {};

const Lt = {};

const addPlugins = t => {
  each(t, (t => each(t, ((n, o) => {
    Mt[o] = t[o];
  }))));
};

const registerPluginModuleInstances = (t, n, o, s) => keys(t).map((e => {
  const {static: c, instance: r} = t[e];
  const l = o ? r : c;
  if (l) {
    const t = o ? l(o, n) : l(n);
    return (s || Lt)[e] = t;
  }
}));

const getStaticPluginModuleInstance = t => Lt[t];

const Pt = "__osOptionsValidationPlugin";

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
      let u = P(r);
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
        d = P(r);
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
        [R]: s,
        [k]: s
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
            const {R: i, k: a} = n;
            const {x: u, y: f} = a;
            const {x: _, y: d} = i;
            const v = l ? C : z;
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
                  o[R] = w.w;
                  o[k] = w.h;
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
            const {k: f} = a;
            const {x: _, y: d} = f;
            const v = {};
            const assignProps = t => each(t, (t => {
              v[t] = u[t];
            }));
            if (_) {
              assignProps([ E, O, H ]);
            }
            if (d) {
              assignProps([ I, A, z, C ]);
            }
            const h = style(o, keys(v));
            attrClass(o, et, ct);
            if (!n) {
              v[k] = "";
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
      M: () => {
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
        return (o, s, e) => {
          const c = windowSize();
          const r = {
            w: c.w - t.w,
            h: c.h - t.h
          };
          if (r.w === 0 && r.h === 0) {
            return;
          }
          const l = {
            w: u(r.w),
            h: u(r.h)
          };
          const i = {
            w: u(a(c.w / (t.w / 100))),
            h: u(a(c.h / (t.h / 100)))
          };
          const f = getWindowDPR();
          const _ = l.w > 2 && l.h > 2;
          const d = !diffBiggerThanOne(i.w, i.h);
          const v = f !== n && f > 0;
          const h = _ && d && v;
          if (h) {
            const [t, n] = s();
            assignDeep(o.L, t);
            if (n) {
              e();
            }
          }
          t = c;
          n = f;
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

let Wt;

const getNativeScrollbarSize = (t, n, o, s) => {
  appendChildren(t, n);
  const e = V(n);
  const c = P(n);
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
    [T]: M,
    [D]: M,
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
  const o = addClass(t, F);
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
  const d = assignDeep({}, G);
  const v = bind(assignDeep, {}, d);
  const h = bind(assignDeep, {}, _);
  const p = {
    L: a,
    I: f,
    H: u,
    A: style(o, "zIndex") === "-1",
    P: !!S,
    V: getRtlScrollBehavior(o, s),
    U: getFlexboxGlue(o, s),
    B: bind(e, "z"),
    j: bind(e, "r"),
    N: h,
    G: t => assignDeep(_, t) && h(),
    q: v,
    W: t => assignDeep(d, t) && v(),
    F: assignDeep({}, _),
    X: assignDeep({}, d)
  };
  const g = bind(addEventListener, r, "resize");
  const b = debounce((t => c(t)), {
    v: 33,
    p: 99
  });
  removeAttr(o, "style");
  removeElements(o);
  g(bind(b, "r"));
  if (!u && (!f.x || !f.y)) {
    g((() => {
      const t = getStaticPluginModuleInstance(jt);
      const n = t ? t.M() : noop;
      n(p, l, bind(b, "z"));
    }));
  }
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
  const {I: e, H: c, N: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const f = (e.x || e.y) && a;
  const _ = t && (isNull(u) ? !c : u);
  return !!f || !!_;
};

const Ft = new WeakMap;

const addInstance = (t, n) => {
  Ft.set(t, n);
};

const removeInstance = t => {
  Ft.delete(t);
};

const getInstance = t => Ft.get(t);

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
  const {Y: c, Z: r, J: l, K: i, tt: a, nt: u} = s || {};
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
  let s = false;
  const e = 3333333;
  const {ot: c, st: l, et: i} = o || {};
  const a = getStaticPluginModuleInstance(Vt);
  const {V: u} = getEnvironment();
  const f = bind(getDirectionIsRTL, t);
  const [_, d] = selfClearTimeout(33);
  const [v] = createCache({
    o: false,
    _: true
  });
  return () => {
    const o = [ d, addEventListener(r, "resize", (() => {
      s = !!i;
      _((() => {
        s = false;
      }));
    })) ];
    const h = createDOM(`<div class="${ft}"><div class="${dt}"></div></div>`);
    const p = h[0];
    const g = p.firstChild;
    const onSizeChangedCallbackProxy = t => {
      const o = t instanceof ResizeObserverEntry;
      const r = !o && isArray(t);
      let l = false;
      let i = false;
      let a = true;
      if (o) {
        const [n, , o] = v(t.contentRect);
        const e = domRectHasDimensions(n);
        const c = domRectAppeared(n, o);
        const r = !o;
        i = r || c;
        l = !i && (!e || s);
        a = !l;
      } else if (r) {
        [, a] = t;
      } else {
        i = t === true;
      }
      if (c && a) {
        const n = r ? t[0] : getDirectionIsRTL(p);
        scrollElementTo(p, {
          x: getRTLCompatibleScrollPosition(e, e, n && u),
          y: e
        });
      }
      if (!l) {
        n({
          ct: r ? t : void 0,
          rt: !r,
          st: i
        });
      }
      s = false;
    };
    if (m) {
      const t = new m((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(g);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (a) {
      const [t, n] = a(g, onSizeChangedCallbackProxy, l);
      push(o, concat([ addClass(p, _t), addEventListener(p, "animationstart", t) ], n));
    } else {
      return noop;
    }
    if (c) {
      const [t] = createCache({
        o: void 0
      }, f);
      push(o, addEventListener(p, "scroll", (n => {
        const o = t();
        const [s, e, c] = o;
        if (e) {
          removeClass(g, "ltr rtl");
          addClass(g, s ? "rtl" : "ltr");
          onSizeChangedCallbackProxy([ !!s, e, c ]);
        }
        stopPropagation(n);
      })));
    }
    return bind(runEachAndClear, push(o, appendChildren(t, p)));
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
        const t = P(s);
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
  const i = `[${J}]`;
  const a = `[${et}]`;
  const u = [ "tabindex" ];
  const f = [ "wrap", "cols", "rows" ];
  const _ = [ "id", "class", "style", "open" ];
  const d = {
    lt: false,
    it: getDirectionIsRTL(t.ut)
  };
  const {ut: v, ft: h, _t: p, dt: g, vt: b, ht: w, gt: y} = t;
  const {U: S} = getEnvironment();
  const [$] = createCache({
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
  const x = g ? f : concat(_, f);
  const O = debounce(n, {
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
      bt: e
    };
    assignDeep(d, {
      lt: s
    });
    !o && n(c);
    return c;
  };
  const onSizeChanged = ({rt: t, ct: o, st: s}) => {
    const e = t && !s && !o;
    const c = !e && l ? O : n;
    const [r, i] = o || [];
    o && assignDeep(d, {
      it: r
    });
    c({
      rt: t || s,
      st: s,
      wt: i
    });
  };
  const onContentMutation = (t, o) => {
    const [, s] = $();
    const e = {
      yt: s
    };
    const c = t ? n : O;
    s && !o && c(e);
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      St: n
    };
    if (n && !o) {
      O(s);
    } else if (!b) {
      updateViewportAttrsFromHost(t);
    }
    return s;
  };
  const [C, z] = p || !S ? createTrinsicObserver(v, onTrinsicChanged) : [];
  const H = !b && createSizeObserver(v, onSizeChanged, {
    st: true,
    ot: true,
    et: true
  });
  const [I, A] = createDOMObserver(v, false, onHostMutation, {
    Z: _,
    Y: concat(_, u)
  });
  const E = b && m && new m((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      rt: true,
      st: domRectAppeared(n, r)
    });
    r = n;
  }));
  return [ () => {
    updateViewportAttrsFromHost();
    E && E.observe(v);
    const t = H && H();
    const n = C && C();
    const o = I();
    return () => {
      E && E.disconnect();
      t && t();
      n && n();
      c && c();
      o();
    };
  }, ({$t: t, xt: n, Ot: r}) => {
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
        Y: concat(x, f || []),
        J: d,
        K: i,
        nt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !b ? liesBetween(o, i, a) : false;
          return e || !!closest(o, `.${yt}`) || !!ignoreMutationFromOptions(t);
        }
      });
      c = t();
      e = n;
    }
    if (w) {
      O.m();
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
      const t = A();
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

const getScrollbarHandleLengthRatio = (t, n, o, s) => {
  if (s) {
    const t = o ? "x" : "y";
    const {Ct: n, zt: e} = s;
    const c = e[t];
    const r = n[t];
    return capNumber(0, 1, c / (c + r));
  }
  const e = o ? R : k;
  const c = getBoundingClientRect(t)[e];
  const r = getBoundingClientRect(n)[e];
  return capNumber(0, 1, c / r);
};

const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
  const {V: r} = getEnvironment();
  const l = c ? "x" : "y";
  const i = c ? "Left" : "Top";
  const {Ct: a} = s;
  const u = getScrollbarHandleLengthRatio(t, n, c);
  return 1 / u * (1 - u) * getScrollbarHandleOffsetPercent(o[`scroll${i}`], a[l], c && e && r);
};

const createScrollbarsSetupElements = (t, n, o) => {
  const {N: s, A: e} = getEnvironment();
  const {scrollbars: c} = s();
  const {slot: r} = c;
  const {Ht: i, ut: a, ft: u, It: f, At: _, Et: v, vt: h} = n;
  const {scrollbars: p} = f ? {} : t;
  const {slot: g} = p || {};
  const b = new Map;
  const initScrollTimeline = t => S && new S({
    source: _,
    axis: t
  });
  const w = initScrollTimeline("x");
  const y = initScrollTimeline("y");
  const m = dynamicInitializationElement([ i, a, u ], (() => h && v ? i : a), r, g);
  const doRefreshScrollbarOffset = t => h && !v && parent(t) === u;
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
      s(t.Tt, n);
    }));
  };
  const scrollbarStyle = (t, n) => {
    each(t, (t => {
      const [o, s] = n(t);
      style(o, s);
    }));
  };
  const scrollbarStructureRefreshHandleLength = (t, n, o) => {
    scrollbarStyle(t, (t => {
      const {Dt: s, Rt: e} = t;
      return [ s, {
        [o ? R : k]: `${(getScrollbarHandleLengthRatio(s, e, o, n) * 100).toFixed(3)}%`
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
    if (!y && !y) {
      scrollbarStyle(t, (t => {
        const {Dt: s, Rt: e, Tt: c} = t;
        const r = getScrollbarHandleOffsetRatio(s, e, _, n, getDirectionIsRTL(c), o);
        const l = r === r;
        return [ s, {
          transform: l ? getTrasformTranslateValue(`${(r * 100).toFixed(3)}%`, o) : ""
        } ];
      }));
    }
  };
  const styleScrollbarPosition = t => {
    const {Tt: n} = t;
    const o = doRefreshScrollbarOffset(n) && n;
    const s = getElmentScroll(_);
    return [ o, {
      transform: o ? getTrasformTranslateValue({
        x: `${s.x}px`,
        y: `${s.y}px`
      }) : ""
    } ];
  };
  const animateElement = (t, n, o, s) => n && t.animate(o, {
    timeline: n,
    composite: s
  });
  const animateScrollbarOffset = (t, n, o, s) => animateElement(t, n, {
    transform: [ getTrasformTranslateValue(`0px`, s), getTrasformTranslateValue(`${l(0, o - .5)}px`, s) ]
  }, "add");
  const $ = [];
  const x = [];
  const O = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass(x, t, n);
    c && scrollbarStructureAddRemoveClass(O, t, n);
  };
  const refreshScrollbarsHandleLength = t => {
    scrollbarStructureRefreshHandleLength(x, t, true);
    scrollbarStructureRefreshHandleLength(O, t);
  };
  const refreshScrollbarsHandleOffset = t => {
    scrollbarStructureRefreshHandleOffset(x, t, true);
    scrollbarStructureRefreshHandleOffset(O, t);
  };
  const refreshScrollbarsHandleOffsetTimeline = () => {
    const forEachFn = (t, {Tt: n, Dt: o}) => {
      const s = t && getDirectionIsRTL(n);
      cancelElementAnimations(o);
      b.set(o, [ animateElement(o, t ? w : y, {
        transform: [ getTrasformTranslateValue(`0%`, t), getTrasformTranslateValue(t && s ? "100%" : "-100%", t) ],
        [t ? s ? "right" : "left" : "top"]: [ "0%", "100%" ]
      }) ]);
    };
    x.forEach(bind(forEachFn, true));
    O.forEach(bind(forEachFn, false));
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (!y && !y) {
      h && scrollbarStyle(x, styleScrollbarPosition);
      h && scrollbarStyle(O, styleScrollbarPosition);
    }
  };
  const refreshScrollbarsScrollbarOffsetTimeline = ({Ct: t}) => {
    concat(O, x).forEach((({Tt: n}) => {
      cancelElementAnimations(n);
      if (doRefreshScrollbarOffset(n)) {
        b.set(n, [ animateScrollbarOffset(n, w, t.x, true), animateScrollbarOffset(n, y, t.y) ]);
      }
    }));
  };
  const generateScrollbarDOM = t => {
    const n = t ? St : $t;
    const s = t ? x : O;
    const c = isEmptyArray(s) ? Ht : "";
    const r = createDiv(`${yt} ${n} ${c}`);
    const l = createDiv(xt);
    const i = createDiv(Ot);
    const a = {
      Tt: r,
      Rt: l,
      Dt: i
    };
    if (!e) {
      addClass(r, bt);
    }
    push(s, a);
    push($, [ appendChildren(r, l), appendChildren(l, i), bind(removeElements, r), cancelElementAnimations, o(a, scrollbarsAddRemoveClass, t) ]);
    return a;
  };
  const C = bind(generateScrollbarDOM, true);
  const z = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(m, x[0].Tt);
    appendChildren(m, O[0].Tt);
    d((() => {
      scrollbarsAddRemoveClass(Ht);
    }), 300);
    return bind(runEachAndClear, $);
  };
  C();
  z();
  return [ {
    kt: refreshScrollbarsHandleLength,
    Mt: refreshScrollbarsHandleOffset,
    Lt: refreshScrollbarsHandleOffsetTimeline,
    Pt: refreshScrollbarsScrollbarOffsetTimeline,
    Vt: refreshScrollbarsScrollbarOffset,
    Ut: scrollbarsAddRemoveClass,
    Bt: {
      P: w,
      jt: x,
      Nt: C,
      Gt: bind(scrollbarStyle, x)
    },
    qt: {
      P: y,
      jt: O,
      Nt: z,
      Gt: bind(scrollbarStyle, O)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o) => {
  const {ut: s, At: e, Wt: c} = n;
  const createInteractiveScrollEvents = (n, r) => {
    const {Dt: l, Rt: i} = n;
    const u = `scroll${r ? "Left" : "Top"}`;
    const f = `client${r ? "X" : "Y"}`;
    const _ = r ? R : k;
    const d = r ? "left" : "top";
    const v = r ? "w" : "h";
    const h = r ? "x" : "y";
    const p = "pointerup pointerleave pointercancel lostpointercapture";
    const createRelativeHandleMove = (t, n) => s => {
      const {Ct: c} = o;
      const r = P(i)[v] - P(l)[v];
      const a = n * s / r;
      const f = a * c[h];
      e[u] = t + f;
    };
    return addEventListener(i, "pointerdown", (n => {
      const o = closest(n.target, `.${Ot}`) === l;
      const r = o ? l : i;
      const h = t.scrollbars;
      const {button: g, isPrimary: b, pointerType: w} = n;
      const {pointers: y} = h;
      const m = g === 0 && b && h[o ? "dragScroll" : "clickScroll"] && (y || []).includes(w);
      attrClass(s, J, ot, true);
      if (m) {
        const t = !o && n.shiftKey;
        const h = bind(getBoundingClientRect, l);
        const g = bind(getBoundingClientRect, i);
        const getHandleOffset = (t, n) => (t || h())[d] - (n || g())[d];
        const b = a(getBoundingClientRect(e)[_]) / P(e)[v] || 1;
        const w = createRelativeHandleMove(e[u] || 0, 1 / b);
        const y = n[f];
        const m = h();
        const S = g();
        const $ = m[_];
        const x = getHandleOffset(m, S) + $ / 2;
        const O = y - S[d];
        const C = o ? 0 : O - x;
        const releasePointerCapture = t => {
          runEachAndClear(z);
          r.releasePointerCapture(t.pointerId);
        };
        const z = [ bind(attrClass, s, J, ot), addEventListener(c, p, releasePointerCapture), addEventListener(c, "selectstart", (t => preventDefault(t)), {
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
          const t = getStaticPluginModuleInstance(Gt);
          t && push(z, t(w, getHandleOffset, C, $, O));
        }
        r.setPointerCapture(n.pointerId);
      }
    }));
  };
  return (t, n, o) => {
    const {Tt: r} = t;
    const [l, i] = selfClearTimeout(333);
    const a = !!e.scrollBy;
    let u = true;
    return bind(runEachAndClear, [ addEventListener(r, "pointerenter", (() => {
      n(It, true);
    })), addEventListener(r, "pointerleave pointercancel", (() => {
      n(It, false);
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
  const [$, x] = selfClearTimeout((() => _));
  const [O, C] = createScrollbarsSetupElements(t, e, createScrollbarsSetupEvents(n, e, s));
  const {ut: z, Ft: H, Et: I} = e;
  const {Ut: A, kt: E, Mt: T, Lt: D, Pt: R, Vt: k} = O;
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
  const M = [ b, x, y, S, p, v, () => f(), addEventListener(z, "pointerover", onHostMouseEnter, {
    O: true
  }), addEventListener(z, "pointerenter", onHostMouseEnter), addEventListener(z, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      a = false;
      l && manageScrollbarsAutoHide(false);
    }
  })), addEventListener(z, "pointermove", (t => {
    isHoverablePointerType(t) && r && d((() => {
      b();
      manageScrollbarsAutoHide(true);
      w((() => {
        r && manageScrollbarsAutoHide(false);
      }));
    }));
  })), addEventListener(H, "scroll", (t => {
    h((() => {
      T(s);
      i && manageScrollbarsAutoHide(true);
      g((() => {
        i && !a && manageScrollbarsAutoHide(false);
      }));
    }));
    c(t);
    k();
  })) ];
  return [ () => bind(runEachAndClear, push(M, C())), ({$t: t, Ot: n, Xt: e, Yt: c}) => {
    const {Zt: a, Jt: d, Kt: v} = c || {};
    const {wt: h, st: p} = e || {};
    const {it: g} = o;
    const {I: b} = getEnvironment();
    const {Ct: w, Qt: y, tn: S} = s;
    const [$, x] = t("showNativeOverlaidScrollbars");
    const [O, C] = t("scrollbars.theme");
    const [z, M] = t("scrollbars.visibility");
    const [L, P] = t("scrollbars.autoHide");
    const [V, U] = t("scrollbars.autoHideSuspend");
    const [B] = t("scrollbars.autoHideDelay");
    const [j, N] = t("scrollbars.dragScroll");
    const [G, q] = t("scrollbars.clickScroll");
    const W = p && !n;
    const F = S.x || S.y;
    const X = a || d || h || n;
    const Y = v || M;
    const Z = $ && b.x && b.y;
    const setScrollbarVisibility = (t, n) => {
      const o = z === "visible" || z === "auto" && t === "scroll";
      A(Ct, o, n);
      return o;
    };
    _ = B;
    if (W) {
      if (V && F) {
        manageAutoHideSuspension(false);
        f();
        m((() => {
          f = addEventListener(H, "scroll", bind(manageAutoHideSuspension, true), {
            O: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if (x) {
      A(wt, Z);
    }
    if (C) {
      A(u);
      A(O, true);
      u = O;
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
    if (N) {
      A(kt, j);
    }
    if (q) {
      A(Rt, G);
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
      D(s);
      k();
      R(s);
      A(At, !w.x, true);
      A(At, !w.y, false);
      A(mt, g && !I);
    }
  }, {}, O ];
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {N: o, H: s} = n;
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
  const z = bind(createDiv, "");
  const H = bind(x, z, a);
  const I = bind(O, z, u);
  const A = H(p);
  const E = A === b;
  const T = E && S;
  const D = !E && I(g);
  const R = !E && isHTMLElement(A) && A === D;
  const k = R && !!C(u);
  const M = k ? H() : A;
  const L = k ? D : I();
  const P = R ? M : A;
  const V = T ? m : P;
  const U = w ? x(z, l, v) : b;
  const B = T ? V : U;
  const j = R ? L : D;
  const N = y.activeElement;
  const G = !E && $.top === $ && N === b;
  const q = {
    Ht: b,
    ut: B,
    ft: V,
    nn: !E && O(z, i, h),
    _t: j,
    sn: !E && !s && c && c(n),
    At: T ? m : V,
    Ft: T ? y : V,
    en: $,
    Wt: y,
    dt: w,
    Et: S,
    It: f,
    vt: E,
    cn: R,
    ht: (t, n) => hasAttrClass(V, E ? J : et, E ? n : t),
    gt: (t, n, o) => attrClass(V, E ? J : et, E ? n : t, o)
  };
  const W = keys(q).reduce(((t, n) => {
    const o = q[n];
    return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? inArray(W, t) : null;
  const {Ht: F, ut: X, nn: tt, ft: nt, _t: ot, sn: st} = q;
  const ct = [ () => {
    removeAttr(X, J);
    removeAttr(X, Z);
    removeAttr(F, Z);
    if (S) {
      removeAttr(m, J);
      removeAttr(m, Z);
    }
  } ];
  const lt = w && elementIsGenerated(X);
  let at = w ? F : contents([ ot, nt, tt, X, F ].find((t => elementIsGenerated(t) === false)));
  const ft = T ? F : ot || nt;
  const _t = bind(runEachAndClear, ct);
  const appendElements = () => {
    attr(X, J, E ? "viewport" : "host");
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
      insertAfter(F, X);
      push(ct, (() => {
        insertAfter(X, F);
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
      removeAttr(nt, K);
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

const createTrinsicUpdateSegment = ({_t: t}) => ({Xt: n, rn: o, Ot: s}) => {
  const {U: e} = getEnvironment();
  const {bt: c} = n || {};
  const {lt: r} = o;
  const l = (t || !e) && (c || s);
  if (l) {
    style(t, {
      [k]: r ? "" : "100%"
    });
  }
};

const createPaddingUpdateSegment = ({ut: t, nn: n, ft: o, vt: s}, e) => {
  const [c, r] = createCache({
    u: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({$t: t, Xt: l, rn: i, Ot: a}) => {
    let [u, f] = r(a);
    const {H: _, U: d} = getEnvironment();
    const {rt: v, yt: h, wt: p} = l || {};
    const {it: g} = i;
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
        [R]: t ? `calc(100% + ${s}px)` : ""
      };
      const l = {
        [O]: t ? u.t : 0,
        [C]: t ? u.r : 0,
        [H]: t ? u.b : 0,
        [z]: t ? u.l : 0
      };
      style(n || o, r);
      style(o, l);
      assignDeep(e, {
        nn: u,
        ln: !t,
        D: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      an: m
    };
  };
};

const createOverflowUpdateSegment = ({ut: t, nn: n, ft: o, sn: s, vt: e, gt: c, Et: i, en: a}, u) => {
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
      x: M,
      y: M
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
  const {L: p, U: g, H: b, I: w} = getEnvironment();
  const y = getStaticPluginModuleInstance(jt);
  const m = !e && !b && (w.x || w.y);
  const S = i && e;
  const [$, x] = createCache(v, bind(fractionalSize, o));
  const [O, L] = createCache(v, bind(U, o));
  const [P, B] = createCache(v);
  const [j, N] = createCache(v);
  const [G] = createCache(h);
  const fixFlexboxGlue = (n, s) => {
    style(o, {
      [k]: ""
    });
    if (s) {
      const {ln: s, nn: e} = u;
      const {un: c, R: r} = n;
      const l = fractionalSize(t);
      const i = V(t);
      const a = style(o, "boxSizing") === "content-box";
      const f = s || a ? e.b + e.t : 0;
      const _ = !(w.x && a);
      style(o, {
        [k]: i.h + l.h + (c.x && _ ? r.x : 0) - f
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
      Qt: {
        x: e,
        y: i
      },
      un: {
        x: c,
        y: a
      },
      R: {
        x: r,
        y: u
      },
      k: {
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
    const {R: e, k: c} = t;
    const {x: r, y: l} = c;
    const {x: i, y: a} = e;
    const {D: f} = u;
    const _ = n ? I : A;
    const d = n ? z : C;
    const v = f[_];
    const h = f[E];
    const p = f[d];
    const g = f[H];
    s[R] = `calc(100% + ${a + v * -1}px)`;
    s[_] = -a + v;
    s[E] = -i + h;
    if (o) {
      s[d] = p + (l ? a : 0);
      s[H] = g + (r ? i : 0);
    }
  };
  const [q, W] = y ? y.T(m, g, o, s, u, getViewportOverflowState, hideNativeScrollbars) : [ () => m, () => [ noop ] ];
  return ({$t: s, Xt: r, rn: i, Ot: _}, {an: d}) => {
    const {rt: v, St: h, yt: p, bt: y, wt: m} = r || {};
    const {lt: C, it: z} = i;
    const [H, k] = s("showNativeOverlaidScrollbars");
    const [M, F] = s("overflow");
    const X = H && w.x && w.y;
    const Y = !e && !g && (v || p || h || k || y);
    const Z = v || d || p || m || k;
    const ot = overflowIsVisible(M.x);
    const st = overflowIsVisible(M.y);
    const ct = ot || st;
    let ut = x(_);
    let ft = L(_);
    let _t = B(_);
    let dt = N(_);
    let vt;
    if (k && b) {
      c(rt, nt, !X);
    }
    if (Y) {
      vt = getViewportOverflowState(X);
      fixFlexboxGlue(vt, C);
    }
    if (Z) {
      if (ct) {
        c(lt, tt, false);
      }
      const [t, n] = W(X, z, vt);
      const [s, e] = ut = $(_);
      const [r, i] = ft = O(_);
      const u = V(o);
      let d = r;
      let v = u;
      t();
      if ((i || e || k) && n && !X && q(n, r, s, z)) {
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
      dt = j(g);
      _t = P(getOverflowAmount(p, g), _);
    }
    const [ht, pt] = dt;
    const [gt, bt] = _t;
    const [wt, yt] = ft;
    const [mt, St] = ut;
    const $t = {
      x: gt.w > 0,
      y: gt.h > 0
    };
    const xt = ot && st && ($t.x || $t.y) || ot && $t.x && !$t.y || st && $t.y && !$t.x;
    const Ot = d || m || St || yt || pt || bt || F || k || Y || Z;
    if (Ot) {
      const n = {
        [A]: 0,
        [E]: 0,
        [I]: 0,
        [R]: "",
        [T]: "",
        [D]: ""
      };
      const s = setViewportOverflowState(X, $t, M, n);
      const c = q(s, wt, mt, z);
      if (!e) {
        hideNativeScrollbars(s, z, c, n);
      }
      if (Y) {
        fixFlexboxGlue(s, C);
      }
      if (e) {
        attr(t, K, n[T]);
        attr(t, Q, n[D]);
      } else {
        style(o, n);
      }
    }
    attrClass(t, J, tt, xt);
    attrClass(n, it, at, xt);
    if (!e) {
      attrClass(o, et, lt, ct);
    }
    const [Ct, zt] = G(getViewportOverflowState(X).Qt);
    assignDeep(u, {
      Qt: Ct,
      zt: {
        x: ht.w,
        y: ht.h
      },
      Ct: {
        x: gt.w,
        y: gt.h
      },
      tn: $t
    });
    return {
      Kt: zt,
      Zt: pt,
      Jt: bt
    };
  };
};

const createStructureSetup = t => {
  const [n, o, s] = createStructureSetupElements(t);
  const e = {
    nn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    ln: false,
    D: {
      [A]: 0,
      [E]: 0,
      [I]: 0,
      [O]: 0,
      [C]: 0,
      [H]: 0,
      [z]: 0
    },
    zt: {
      x: 0,
      y: 0
    },
    Ct: {
      x: 0,
      y: 0
    },
    Qt: {
      x: M,
      y: M
    },
    tn: {
      x: false,
      y: false
    }
  };
  const {Ht: c, ft: r, gt: l, vt: i} = n;
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
  const booleanUpdateHints = t => each(assignDeep({}, t), ((t, n, o) => {
    o[n] = !!t;
  }));
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, s) => {
    const {fn: e, Ot: r, xt: l, _n: i, dn: a} = t;
    const _ = e || {};
    const v = !!r;
    const h = {
      $t: createOptionCheck(n, _, v),
      fn: _,
      Ot: v
    };
    if (i) {
      d(h);
      return false;
    }
    const p = s || u(assignDeep({}, h, {
      xt: l
    }));
    if (a) {
      assignDeep(p, {
        rt: true,
        yt: true
      });
    }
    const g = c(assignDeep({}, h, {
      rn: f,
      Xt: p
    }));
    d(assignDeep({}, h, {
      Xt: p,
      Yt: g
    }));
    const b = updateHintsAreTruthy(p);
    const w = updateHintsAreTruthy(g);
    const y = b || w || !isEmptyObject(_) || v;
    y && o(t, {
      Xt: booleanUpdateHints(p),
      Yt: booleanUpdateHints(g)
    });
    return y;
  };
  return [ () => {
    const {Ht: t, ft: n, Wt: o, Et: s} = l;
    const c = s ? o.documentElement : t;
    const r = getElmentScroll(c);
    const i = [ a(), e(), _() ];
    scrollElementTo(n, r);
    return bind(runEachAndClear, i);
  }, update, () => ({
    vn: f,
    hn: r
  }), {
    pn: l,
    gn: v
  }, i ];
};

const OverlayScrollbars = (t, n, o) => {
  const {q: s, B: e, j: c} = getEnvironment();
  const r = isHTMLElement(t);
  const l = r ? t : t.target;
  const i = getInstance(l);
  if (n && !i) {
    let i = false;
    const a = [];
    const u = {};
    const validateOptions = t => {
      const n = getStaticPluginModuleInstance(Pt);
      return n ? n(t, true) : t;
    };
    const f = assignDeep({}, s(), validateOptions(n));
    const [_, d, v] = createEventListenerHub(o);
    const [h, p, g, b, w] = createSetups(t, f, (({fn: t, Ot: n}, {Xt: o, Yt: s}) => {
      const {rt: e, wt: c, bt: r, yt: l, St: i} = o;
      const {Zt: a, Jt: u, Kt: f} = s;
      v("updated", [ y, {
        updateHints: {
          sizeChanged: e,
          directionChanged: c,
          heightIntrinsicChanged: r,
          overflowEdgeChanged: a,
          overflowAmountChanged: u,
          overflowStyleChanged: f,
          contentMutation: l,
          hostMutation: i
        },
        changedOptions: t || {},
        force: !!n
      } ]);
    }), (t => v("scroll", [ y, t ])));
    const destroy = t => {
      removeInstance(l);
      runEachAndClear(a);
      i = true;
      v("destroyed", [ y, t ]);
      d();
    };
    const y = {
      options(t, n) {
        if (t) {
          const o = n ? s() : {};
          const e = getOptionsDiff(f, assignDeep(o, validateOptions(t)));
          if (!isEmptyObject(e)) {
            assignDeep(f, e);
            p({
              fn: e
            });
          }
        }
        return assignDeep({}, f);
      },
      on: _,
      off: (t, n) => {
        t && n && d(t, n);
      },
      state() {
        const {vn: t, hn: n} = g();
        const {it: o} = t;
        const {zt: s, Ct: e, Qt: c, tn: r, nn: l, ln: a} = n;
        return assignDeep({}, {
          overflowEdge: s,
          overflowAmount: e,
          overflowStyle: c,
          hasOverflow: r,
          padding: l,
          paddingAbsolute: a,
          directionRTL: o,
          destroyed: i
        });
      },
      elements() {
        const {Ht: t, ut: n, nn: o, ft: s, _t: e, At: c, Ft: r} = b.pn;
        const {Bt: l, qt: i} = b.gn;
        const translateScrollbarStructure = t => {
          const {Dt: n, Rt: o, Tt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {jt: n, Nt: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              p({
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
      update: t => p({
        Ot: t,
        xt: true
      }),
      destroy: bind(destroy, false),
      plugin: t => u[keys(t)[0]]
    };
    const onWindowResize = () => {
      const {hn: t} = g();
      const {tn: n} = t;
      const o = n.x || n.y;
      o && p({
        dn: o
      });
    };
    push(a, [ e(onWindowResize), c(onWindowResize), w ]);
    addInstance(l, y);
    registerPluginModuleInstances(Mt, OverlayScrollbars, y, u);
    if (cancelInitialization(b.pn.Et, !r && t.cancel)) {
      destroy(true);
      return y;
    }
    push(a, h());
    v("initialized", [ y ]);
    y.update(true);
    return y;
  }
  return i;
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
  const {L: t, I: n, H: o, V: s, U: e, A: c, P: r, F: l, X: i, N: a, G: u, q: f, W: _} = getEnvironment();
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
