/*!
 * OverlayScrollbars
 * Version: 2.2.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

"use strict";

function each(t, n) {
  if (isArrayLike(t)) {
    for (let o = 0; o < t.length; o++) {
      if (false === n(t[o], o, t)) {
        break;
      }
    }
  } else if (t) {
    each(Object.keys(t), (o => n(t[o], o, t)));
  }
  return t;
}

function style(t, n) {
  const o = isString(n);
  const s = isArray(n) || o;
  if (s) {
    let s = o ? "" : {};
    if (t) {
      const e = window.getComputedStyle(t, null);
      s = o ? getCSSVal(t, e, n) : n.reduce(((n, o) => {
        n[o] = getCSSVal(t, e, o);
        return n;
      }), s);
    }
    return s;
  }
  t && each(keys(n), (o => setCSSVal(t, o, n[o])));
}

Object.defineProperties(exports, {
  o: {
    value: true
  },
  [Symbol.toStringTag]: {
    value: "Module"
  }
});

const createCache = (t, n) => {
  const {u: o, _: s, v: e} = t;
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

const isClient = () => "undefined" !== typeof window;

const t = isClient() && Node.ELEMENT_NODE;

const {toString: n, hasOwnProperty: o} = Object.prototype;

const isUndefined = t => void 0 === t;

const isNull = t => null === t;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : n.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase();

const isNumber = t => "number" === typeof t;

const isString = t => "string" === typeof t;

const isBoolean = t => "boolean" === typeof t;

const isFunction = t => "function" === typeof t;

const isArray = t => Array.isArray(t);

const isObject = t => "object" === typeof t && !isArray(t) && !isNull(t);

const isArrayLike = t => {
  const n = !!t && t.length;
  const o = isNumber(n) && n > -1 && n % 1 == 0;
  return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
};

const isPlainObject = t => {
  if (!t || !isObject(t) || "object" !== type(t)) {
    return false;
  }
  let n;
  const s = "constructor";
  const e = t[s];
  const c = e && e.prototype;
  const r = o.call(t, s);
  const l = c && o.call(c, "isPrototypeOf");
  if (e && !r && !l) {
    return false;
  }
  for (n in t) {}
  return isUndefined(n) || o.call(t, n);
};

const isHTMLElement = n => {
  const o = HTMLElement;
  return n ? o ? n instanceof o : n.nodeType === t : false;
};

const isElement = n => {
  const o = Element;
  return n ? o ? n instanceof o : n.nodeType === t : false;
};

const indexOf = (t, n, o) => t.indexOf(n, o);

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

const isEmptyArray = t => !!t && 0 === t.length;

const runEachAndClear = (t, n, o) => {
  const runFn = t => t && t.apply(void 0, n || []);
  each(t, runFn);
  !o && (t.length = 0);
};

const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);

const keys = t => t ? Object.keys(t) : [];

const assignDeep = (t, n, o, s, e, c, r) => {
  const l = [ n, o, s, e, c, r ];
  if (("object" !== typeof t || isNull(t)) && !isFunction(t)) {
    t = {};
  }
  each(l, (n => {
    each(keys(n), (o => {
      const s = n[o];
      if (t === s) {
        return true;
      }
      const e = isArray(s);
      if (s && (isPlainObject(s) || e)) {
        const n = t[o];
        let c = n;
        if (e && !isArray(n)) {
          c = [];
        } else if (!e && !isPlainObject(n)) {
          c = {};
        }
        t[o] = assignDeep(c, s);
      } else {
        t[o] = s;
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

const getSetProp = (t, n, o, s) => {
  if (isUndefined(s)) {
    return o ? o[t] : n;
  }
  o && (isString(s) || isNumber(s)) && (o[t] = s);
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

const attrClass = (t, n, o, s) => {
  if (o) {
    const e = attr(t, n) || "";
    const c = new Set(e.split(" "));
    c[s ? "add" : "delete"](o);
    const r = from(c).join(" ").trim();
    attr(t, n, r);
  }
};

const hasAttrClass = (t, n, o) => {
  const s = attr(t, n) || "";
  const e = new Set(s.split(" "));
  return e.has(o);
};

const scrollLeft = (t, n) => getSetProp("scrollLeft", 0, t, n);

const scrollTop = (t, n) => getSetProp("scrollTop", 0, t, n);

const s = isClient() && Element.prototype;

const find = (t, n) => {
  const o = [];
  const s = n ? isElement(n) ? n : null : document;
  return s ? push(o, s.querySelectorAll(t)) : o;
};

const findFirst = (t, n) => {
  const o = n ? isElement(n) ? n : null : document;
  return o ? o.querySelector(t) : null;
};

const is = (t, n) => {
  if (isElement(t)) {
    const o = s.matches || s.msMatchesSelector;
    return o.call(t, n);
  }
  return false;
};

const contents = t => t ? from(t.childNodes) : [];

const parent = t => t ? t.parentElement : null;

const closest = (t, n) => {
  if (isElement(t)) {
    const o = s.closest;
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
  return null;
};

const liesBetween = (t, n, o) => {
  const s = t && closest(t, n);
  const e = t && findFirst(o, s);
  const c = closest(e, n) === s;
  return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
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
  }
};

const appendChildren = (t, n) => {
  before(t, null, n);
};

const insertBefore = (t, n) => {
  before(parent(t), t, n);
};

const insertAfter = (t, n) => {
  before(parent(t), t && t.nextSibling, n);
};

const removeElements = t => {
  if (isArrayLike(t)) {
    each(from(t), (t => removeElements(t)));
  } else if (t) {
    const n = parent(t);
    if (n) {
      n.removeChild(t);
    }
  }
};

const createDiv = t => {
  const n = document.createElement("div");
  if (t) {
    attr(n, "class", t);
  }
  return n;
};

const createDOM = t => {
  const n = createDiv();
  n.innerHTML = t.trim();
  return each(contents(n), (t => removeElements(t)));
};

const firstLetterToUpper = t => t.charAt(0).toUpperCase() + t.slice(1);

const getDummyStyle = () => createDiv().style;

const e = [ "-webkit-", "-moz-", "-o-", "-ms-" ];

const c = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];

const r = {};

const l = {};

const cssProperty = t => {
  let n = l[t];
  if (hasOwnProperty(l, t)) {
    return n;
  }
  const o = firstLetterToUpper(t);
  const s = getDummyStyle();
  each(e, (e => {
    const c = e.replace(/-/g, "");
    const r = [ t, e + t, c + o, firstLetterToUpper(c) + o ];
    return !(n = r.find((t => void 0 !== s[t])));
  }));
  return l[t] = n || "";
};

const jsAPI = t => {
  if (isClient()) {
    let n = r[t] || window[t];
    if (hasOwnProperty(r, t)) {
      return n;
    }
    each(c, (o => {
      n = n || window[o + firstLetterToUpper(t)];
      return !n;
    }));
    r[t] = n;
    return n;
  }
};

const i = jsAPI("MutationObserver");

const a = jsAPI("IntersectionObserver");

const u = jsAPI("ResizeObserver");

const d = jsAPI("cancelAnimationFrame");

const f = jsAPI("requestAnimationFrame");

const _ = isClient() && window.setTimeout;

const h = isClient() && window.clearTimeout;

const v = /[^\x20\t\r\n\f]+/g;

const classListAction = (t, n, o) => {
  const s = t && t.classList;
  let e;
  let c = 0;
  let r = false;
  if (s && n && isString(n)) {
    const t = n.match(v) || [];
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
  return removeClass.bind(0, t, n);
};

const {max: g} = Math;

const animationCurrentTime = () => performance.now();

const animateNumber = (t, n, o, s, e) => {
  let c = 0;
  const r = animationCurrentTime();
  const l = g(0, o);
  const frame = o => {
    const i = animationCurrentTime();
    const a = i - r;
    const u = a >= l;
    const d = o ? 1 : 1 - (g(0, r + l - i) / l || 0);
    const _ = (n - t) * (isFunction(e) ? e(d, d * l, 0, 1, l) : d) + t;
    const h = u || 1 === d;
    s && s(_, d, h);
    c = h ? 0 : f((() => frame()));
  };
  frame();
  return t => {
    d(c);
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

const equalBCRWH = (t, n, o) => equal(t, n, [ "width", "height" ], o && (t => Math.round(t)));

const noop = () => {};

const selfClearTimeout = t => {
  let n;
  const o = t ? _ : f;
  const s = t ? h : d;
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
  const {g: r, p: l, m: i} = n || {};
  const a = function invokeFunctionToDebounce(n) {
    c();
    h(o);
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
      const u = n > 0 ? _ : f;
      const v = n > 0 ? h : d;
      const g = mergeParms(t);
      const w = g || t;
      const p = a.bind(0, w);
      c();
      const b = u(p, n);
      c = () => v(b);
      if (i && !o) {
        o = _(flush, r);
      }
      s = e = w;
    } else {
      a(t);
    }
  };
  u.S = flush;
  return u;
};

const w = {
  opacity: 1,
  zindex: 1
};

const parseToZeroOrNumber = (t, n) => {
  const o = n ? parseFloat(t) : parseInt(t, 10);
  return o === o ? o : 0;
};

const adaptCSSVal = (t, n) => !w[t.toLowerCase()] && isNumber(n) ? `${n}px` : n;

const getCSSVal = (t, n, o) => null != n ? n[o] || n.getPropertyValue(o) : t.style[o];

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

const directionIsRTL = t => "rtl" === style(t, "direction");

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

const {round: p} = Math;

const b = {
  w: 0,
  h: 0
};

const windowSize = () => ({
  w: window.innerWidth,
  h: window.innerHeight
});

const offsetSize = t => t ? {
  w: t.offsetWidth,
  h: t.offsetHeight
} : b;

const clientSize = t => t ? {
  w: t.clientWidth,
  h: t.clientHeight
} : b;

const scrollSize = t => t ? {
  w: t.scrollWidth,
  h: t.scrollHeight
} : b;

const fractionalSize = t => {
  const n = parseFloat(style(t, "height")) || 0;
  const o = parseFloat(style(t, "width")) || 0;
  return {
    w: o - p(o),
    h: n - p(n)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

let m;

const supportPassiveEvents = () => {
  if (isUndefined(m)) {
    m = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get() {
          m = true;
        }
      }));
    } catch (t) {}
  }
  return m;
};

const splitEventNames = t => t.split(" ");

const off = (t, n, o, s) => {
  each(splitEventNames(n), (n => {
    t.removeEventListener(n, o, s);
  }));
};

const on = (t, n, o, s) => {
  var e;
  const c = supportPassiveEvents();
  const r = null != (e = c && s && s.$) ? e : c;
  const l = s && s.C || false;
  const i = s && s.O || false;
  const a = [];
  const u = c ? {
    passive: r,
    capture: l
  } : l;
  each(splitEventNames(n), (n => {
    const s = i ? e => {
      t.removeEventListener(n, s, l);
      o && o(e);
    } : o;
    push(a, off.bind(null, t, n, s, l));
    t.addEventListener(n, s, u);
  }));
  return runEachAndClear.bind(0, a);
};

const stopPropagation = t => t.stopPropagation();

const preventDefault = t => t.preventDefault();

const y = {
  x: 0,
  y: 0
};

const absoluteCoordinates = t => {
  const n = t ? getBoundingClientRect(t) : 0;
  return n ? {
    x: n.left + window.pageYOffset,
    y: n.top + window.pageXOffset
  } : y;
};

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
      return removeEvent.bind(0, t, o);
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
    return runEachAndClear.bind(0, e);
  };
  const triggerEvent = (t, o) => {
    const s = n.get(t);
    each(from(s), (t => {
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
    throw new Error;
  }
  return n;
}));

const S = {
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
    dragScroll: true,
    clickScroll: false,
    pointers: [ "mouse", "touch", "pen" ]
  }
};

const getOptionsDiff = (t, n) => {
  const o = {};
  const s = keys(n).concat(keys(t));
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

const x = "os-environment";

const $ = `${x}-flexbox-glue`;

const C = `${$}-max`;

const O = `os-scrollbar-hidden`;

const z = "data-overlayscrollbars-initialize";

const T = "data-overlayscrollbars";

const E = `${T}-overflow-x`;

const I = `${T}-overflow-y`;

const A = "overflowVisible";

const L = "scrollbarHidden";

const H = "scrollbarPressed";

const P = "updating";

const M = "data-overlayscrollbars-viewport";

const D = "arrange";

const R = "scrollbarHidden";

const k = A;

const B = "data-overlayscrollbars-padding";

const V = k;

const Y = "data-overlayscrollbars-content";

const j = "os-size-observer";

const N = `${j}-appear`;

const q = `${j}-listener`;

const F = `${q}-scroll`;

const G = `${q}-item`;

const X = `${G}-final`;

const U = "os-trinsic-observer";

const W = "os-no-css-vars";

const Z = "os-theme-none";

const J = "os-scrollbar";

const K = `${J}-rtl`;

const Q = `${J}-horizontal`;

const tt = `${J}-vertical`;

const nt = `${J}-track`;

const ot = `${J}-handle`;

const st = `${J}-visible`;

const et = `${J}-cornerless`;

const ct = `${J}-transitionless`;

const rt = `${J}-interaction`;

const lt = `${J}-unusable`;

const it = `${J}-auto-hidden`;

const at = `${J}-wheel`;

const ut = `${nt}-interactive`;

const dt = `${ot}-interactive`;

const ft = {};

const getPlugins = () => ft;

const addPlugin = t => {
  const n = [];
  each(isArray(t) ? t : [ t ], (t => {
    const o = keys(t);
    each(o, (o => {
      push(n, ft[o] = t[o]);
    }));
  }));
  return n;
};

const _t = {
  boolean: "__TPL_boolean_TYPE__",
  number: "__TPL_number_TYPE__",
  string: "__TPL_string_TYPE__",
  array: "__TPL_array_TYPE__",
  object: "__TPL_object_TYPE__",
  function: "__TPL_function_TYPE__",
  null: "__TPL_null_TYPE__"
};

const ht = _t.number;

const vt = _t.boolean;

const gt = [ _t.array, _t.null ];

const wt = "hidden scroll visible visible-hidden";

const pt = "visible hidden auto";

const bt = "never scroll leavemove";

({
  paddingAbsolute: vt,
  showNativeOverlaidScrollbars: vt,
  update: {
    elementEvents: gt,
    attributes: gt,
    debounce: [ _t.number, _t.array, _t.null ],
    ignoreMutation: [ _t.function, _t.null ]
  },
  overflow: {
    x: wt,
    y: wt
  },
  scrollbars: {
    theme: [ _t.string, _t.null ],
    visibility: pt,
    autoHide: bt,
    autoHideDelay: ht,
    dragScroll: vt,
    clickScroll: vt,
    pointers: [ _t.array, _t.null ]
  }
});

const mt = "__osOptionsValidationPlugin";

const yt = 3333333;

const St = "scroll";

const xt = "__osSizeObserverPlugin";

const $t = /* @__PURE__ */ (() => ({
  [xt]: {
    T: (t, n, o) => {
      const s = createDOM(`<div class="${G}" dir="ltr"><div class="${G}"><div class="${X}"></div></div><div class="${G}"><div class="${X}" style="width: 200%; height: 200%"></div></div></div>`);
      appendChildren(t, s);
      addClass(t, F);
      const e = s[0];
      const c = e.lastChild;
      const r = e.firstChild;
      const l = null == r ? void 0 : r.firstChild;
      let i = offsetSize(e);
      let a = i;
      let u = false;
      let _;
      const reset = () => {
        scrollLeft(r, yt);
        scrollTop(r, yt);
        scrollLeft(c, yt);
        scrollTop(c, yt);
      };
      const onResized = t => {
        _ = 0;
        if (u) {
          i = a;
          n(true === t);
        }
      };
      const onScroll = t => {
        a = offsetSize(e);
        u = !t || !equalWH(a, i);
        if (t) {
          stopPropagation(t);
          if (u && !_) {
            d(_);
            _ = f(onResized);
          }
        } else {
          onResized(false === t);
        }
        reset();
      };
      const h = push([], [ on(r, St, onScroll), on(c, St, onScroll) ]);
      style(l, {
        width: yt,
        height: yt
      });
      f(reset);
      return [ o ? onScroll.bind(0, false) : reset, h ];
    }
  }
}))();

let Ct = 0;

const {round: Ot, abs: zt} = Math;

const getWindowDPR = () => {
  const t = window.screen.deviceXDPI || 0;
  const n = window.screen.logicalXDPI || 1;
  return window.devicePixelRatio || t / n;
};

const diffBiggerThanOne = (t, n) => {
  const o = zt(t);
  const s = zt(n);
  return !(o === s || o + 1 === s || o - 1 === s);
};

const Tt = "__osScrollbarsHidingPlugin";

const Et = /* @__PURE__ */ (() => ({
  [Tt]: {
    I: t => {
      const {A: n, L: o, H: s} = t;
      const e = !s && !n && (o.x || o.y);
      const c = e ? document.createElement("style") : false;
      if (c) {
        attr(c, "id", `${M}-${D}-${Ct}`);
        Ct++;
      }
      return c;
    },
    P: (t, n, o, s, e, c, r) => {
      const arrangeViewport = (n, c, r, l) => {
        if (t) {
          const {M: t} = e();
          const {D: i, R: a} = n;
          const {x: u, y: d} = a;
          const {x: f, y: _} = i;
          const h = l ? "paddingRight" : "paddingLeft";
          const v = t[h];
          const g = t.paddingTop;
          const w = c.w + r.w;
          const p = c.h + r.h;
          const b = {
            w: _ && d ? `${_ + w - v}px` : "",
            h: f && u ? `${f + p - g}px` : ""
          };
          if (s) {
            const {sheet: t} = s;
            if (t) {
              const {cssRules: n} = t;
              if (n) {
                if (!n.length) {
                  t.insertRule(`#${attr(s, "id")} + [${M}~='${D}']::before {}`, 0);
                }
                const o = n[0].style;
                o.width = b.w;
                o.height = b.h;
              }
            }
          } else {
            style(o, {
              "--os-vaw": b.w,
              "--os-vah": b.h
            });
          }
        }
        return t;
      };
      const undoViewportArrange = (s, l, i) => {
        if (t) {
          const a = i || c(s);
          const {M: u} = e();
          const {R: d} = a;
          const {x: f, y: _} = d;
          const h = {};
          const assignProps = t => each(t.split(" "), (t => {
            h[t] = u[t];
          }));
          if (f) {
            assignProps("marginBottom paddingTop paddingBottom");
          }
          if (_) {
            assignProps("marginLeft marginRight paddingLeft paddingRight");
          }
          const v = style(o, keys(h));
          attrClass(o, M, D);
          if (!n) {
            h.height = "";
          }
          style(o, h);
          return [ () => {
            r(a, l, t, v);
            style(o, v);
            attrClass(o, M, D, true);
          }, a ];
        }
        return [ noop ];
      };
      return [ arrangeViewport, undoViewportArrange ];
    },
    k: () => {
      let t = {
        w: 0,
        h: 0
      };
      let n = 0;
      return (o, s, e) => {
        const c = windowSize();
        const r = {
          w: c.w - t.w,
          h: c.h - t.h
        };
        if (0 === r.w && 0 === r.h) {
          return;
        }
        const l = {
          w: zt(r.w),
          h: zt(r.h)
        };
        const i = {
          w: zt(Ot(c.w / (t.w / 100))),
          h: zt(Ot(c.h / (t.h / 100)))
        };
        const a = getWindowDPR();
        const u = l.w > 2 && l.h > 2;
        const d = !diffBiggerThanOne(i.w, i.h);
        const f = a !== n && a > 0;
        const _ = u && d && f;
        if (_) {
          const [t, n] = s();
          assignDeep(o.B, t);
          if (n) {
            e();
          }
        }
        t = c;
        n = a;
      };
    }
  }
}))();

const It = "__osClickScrollPlugin";

const At = /* @__PURE__ */ (() => ({
  [It]: {
    T: (t, n, o, s, e) => {
      let c = 0;
      let r = noop;
      const animateClickScroll = l => {
        r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, i) => {
          t(o);
          const a = n();
          const u = a + s;
          const d = e >= a && e <= u;
          if (i && !d) {
            if (c) {
              animateClickScroll(o);
            } else {
              const t = setTimeout((() => {
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

let Lt;

const getNativeScrollbarSize = (t, n, o, s) => {
  appendChildren(t, n);
  const e = clientSize(n);
  const c = offsetSize(n);
  const r = fractionalSize(o);
  s && removeElements(n);
  return {
    x: c.h - e.h + r.h,
    y: c.w - e.w + r.w
  };
};

const getNativeScrollbarsHiding = t => {
  let n = false;
  const o = addClass(t, O);
  try {
    n = "none" === style(t, cssProperty("scrollbar-width")) || "none" === window.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display");
  } catch (s) {}
  o();
  return n;
};

const getRtlScrollBehavior = (t, n) => {
  const o = "hidden";
  style(t, {
    overflowX: o,
    overflowY: o,
    direction: "rtl"
  });
  scrollLeft(t, 0);
  const s = absoluteCoordinates(t);
  const e = absoluteCoordinates(n);
  scrollLeft(t, -999);
  const c = absoluteCoordinates(n);
  return {
    i: s.x === e.x,
    n: e.x !== c.x
  };
};

const getFlexboxGlue = (t, n) => {
  const o = addClass(t, $);
  const s = getBoundingClientRect(t);
  const e = getBoundingClientRect(n);
  const c = equalBCRWH(e, s, true);
  const r = addClass(t, C);
  const l = getBoundingClientRect(t);
  const i = getBoundingClientRect(n);
  const a = equalBCRWH(i, l, true);
  o();
  r();
  return c && a;
};

const createEnvironment = () => {
  const {body: t} = document;
  const n = createDOM(`<div class="${x}"><div></div></div>`);
  const o = n[0];
  const s = o.firstChild;
  const [e, , c] = createEventListenerHub();
  const [r, l] = createCache({
    u: getNativeScrollbarSize(t, o, s),
    _: equalXY
  }, getNativeScrollbarSize.bind(0, t, o, s, true));
  const [i] = l();
  const a = getNativeScrollbarsHiding(o);
  const u = {
    x: 0 === i.x,
    y: 0 === i.y
  };
  const d = {
    elements: {
      host: null,
      padding: !a,
      viewport: t => a && t === t.ownerDocument.body && t,
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
  const f = assignDeep({}, S);
  const _ = assignDeep.bind(0, {}, f);
  const h = assignDeep.bind(0, {}, d);
  const v = {
    B: i,
    L: u,
    A: a,
    H: "-1" === style(o, "zIndex"),
    V: getRtlScrollBehavior(o, s),
    Y: getFlexboxGlue(o, s),
    j: e.bind(0, "z"),
    N: e.bind(0, "r"),
    q: h,
    F: t => assignDeep(d, t) && h(),
    G: _,
    X: t => assignDeep(f, t) && _(),
    U: assignDeep({}, d),
    W: assignDeep({}, f)
  };
  const g = window.addEventListener;
  const w = debounce((t => c(t ? "z" : "r")), {
    g: 33,
    p: 99
  });
  removeAttr(o, "style");
  removeElements(o);
  g("resize", w.bind(0, false));
  if (!a && (!u.x || !u.y)) {
    let t;
    g("resize", (() => {
      const n = getPlugins()[Tt];
      t = t || n && n.k();
      t && t(v, r, w.bind(0, true));
    }));
  }
  return v;
};

const getEnvironment = () => {
  if (!Lt) {
    Lt = createEnvironment();
  }
  return Lt;
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

const cancelInitialization = (t, n, o) => {
  const {nativeScrollbarsOverlaid: s, body: e} = o || {};
  const {L: c, A: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = n;
  const a = null != s ? s : l;
  const u = isUndefined(e) ? i : e;
  const d = (c.x || c.y) && a;
  const f = t && (isNull(u) ? !r : u);
  return !!d || !!f;
};

const Ht = new WeakMap;

const addInstance = (t, n) => {
  Ht.set(t, n);
};

const removeInstance = t => {
  Ht.delete(t);
};

const getInstance = t => Ht.get(t);

const getPropByPath = (t, n) => t ? n.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;

const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || void 0 !== getPropByPath(n, s) ];

const createState = t => {
  let n = t;
  return [ () => n, t => {
    n = assignDeep({}, n, t);
  } ];
};

const Pt = "tabindex";

const Mt = createDiv.bind(0, "");

const unwrap = t => {
  appendChildren(parent(t), contents(t));
  removeElements(t);
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {q: o, A: s} = n;
  const e = getPlugins()[Tt];
  const c = e && e.I;
  const {elements: r} = o();
  const {host: l, padding: i, viewport: a, content: u} = r;
  const d = isHTMLElement(t);
  const f = d ? {} : t;
  const {elements: _} = f;
  const {host: h, padding: v, viewport: g, content: w} = _ || {};
  const p = d ? t : f.target;
  const b = is(p, "textarea");
  const m = p.ownerDocument;
  const y = m.documentElement;
  const S = p === m.body;
  const x = m.defaultView;
  const $ = staticInitializationElement.bind(0, [ p ]);
  const C = dynamicInitializationElement.bind(0, [ p ]);
  const A = resolveInitialization.bind(0, [ p ]);
  const L = $.bind(0, Mt, a);
  const H = C.bind(0, Mt, u);
  const P = L(g);
  const D = P === p;
  const k = D && S;
  const V = !D && H(w);
  const j = !D && isHTMLElement(P) && P === V;
  const N = j && !!A(u);
  const q = N ? L() : P;
  const F = N ? V : H();
  const G = j ? q : P;
  const X = k ? y : G;
  const U = b ? $(Mt, l, h) : p;
  const W = k ? X : U;
  const Z = j ? F : V;
  const J = m.activeElement;
  const K = !D && x.top === x && J === p;
  const Q = {
    Z: p,
    J: W,
    K: X,
    tt: !D && C(Mt, i, v),
    nt: Z,
    ot: !D && !s && c && c(n),
    st: k ? y : X,
    et: k ? m : X,
    ct: x,
    rt: m,
    lt: b,
    it: S,
    ut: d,
    dt: D,
    ft: j,
    _t: (t, n) => hasAttrClass(X, D ? T : M, D ? n : t),
    ht: (t, n, o) => attrClass(X, D ? T : M, D ? n : t, o)
  };
  const tt = keys(Q).reduce(((t, n) => {
    const o = Q[n];
    return push(t, o && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? indexOf(tt, t) > -1 : null;
  const {Z: nt, J: ot, tt: st, K: et, nt: ct, ot: rt} = Q;
  const lt = [ () => {
    removeAttr(ot, T);
    removeAttr(ot, z);
    removeAttr(nt, z);
    if (S) {
      removeAttr(y, T);
      removeAttr(y, z);
    }
  } ];
  const it = b && elementIsGenerated(ot);
  let at = b ? nt : contents([ ct, et, st, ot, nt ].find((t => false === elementIsGenerated(t))));
  const ut = k ? nt : ct || et;
  const appendElements = () => {
    attr(ot, T, D ? "viewport" : "host");
    attr(st, B, "");
    attr(ct, Y, "");
    if (!D) {
      attr(et, M, "");
    }
    const t = S && !D ? addClass(parent(p), O) : noop;
    if (it) {
      insertAfter(nt, ot);
      push(lt, (() => {
        insertAfter(ot, nt);
        removeElements(ot);
      }));
    }
    appendChildren(ut, at);
    appendChildren(ot, st);
    appendChildren(st || ot, !D && et);
    appendChildren(et, ct);
    push(lt, (() => {
      t();
      removeAttr(st, B);
      removeAttr(ct, Y);
      removeAttr(et, E);
      removeAttr(et, I);
      removeAttr(et, M);
      if (elementIsGenerated(ct)) {
        unwrap(ct);
      }
      if (elementIsGenerated(et)) {
        unwrap(et);
      }
      if (elementIsGenerated(st)) {
        unwrap(st);
      }
    }));
    if (s && !D) {
      attrClass(et, M, R, true);
      push(lt, removeAttr.bind(0, et, M));
    }
    if (rt) {
      insertBefore(et, rt);
      push(lt, removeElements.bind(0, rt));
    }
    if (K) {
      const t = attr(et, Pt);
      attr(et, Pt, "-1");
      et.focus();
      const revertViewportTabIndex = () => t ? attr(et, Pt, t) : removeAttr(et, Pt);
      const n = on(m, "pointerdown keydown", (() => {
        revertViewportTabIndex();
        n();
      }));
      push(lt, [ revertViewportTabIndex, n ]);
    } else if (J && J.focus) {
      J.focus();
    }
    at = 0;
  };
  return [ Q, appendElements, runEachAndClear.bind(0, lt) ];
};

const createTrinsicUpdateSegment = (t, n) => {
  const {nt: o} = t;
  const [s] = n;
  return t => {
    const {Y: n} = getEnvironment();
    const {vt: e} = s();
    const {gt: c} = t;
    const r = (o || !n) && c;
    if (r) {
      style(o, {
        height: e ? "" : "100%"
      });
    }
    return {
      wt: r,
      bt: r
    };
  };
};

const createPaddingUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {J: e, tt: c, K: r, dt: l} = t;
  const [i, a] = createCache({
    _: equalTRBL,
    u: topRightBottomLeft()
  }, topRightBottomLeft.bind(0, e, "padding", ""));
  return (t, n, e) => {
    let [u, d] = a(e);
    const {A: f, Y: _} = getEnvironment();
    const {yt: h} = o();
    const {wt: v, bt: g, St: w} = t;
    const [p, b] = n("paddingAbsolute");
    const m = !_ && g;
    if (v || d || m) {
      [u, d] = i(e);
    }
    const y = !l && (b || w || d);
    if (y) {
      const t = !p || !c && !f;
      const n = u.r + u.l;
      const o = u.t + u.b;
      const e = {
        marginRight: t && !h ? -n : 0,
        marginBottom: t ? -o : 0,
        marginLeft: t && h ? -n : 0,
        top: t ? -u.t : 0,
        right: t ? h ? -u.r : "auto" : 0,
        left: t ? h ? "auto" : -u.l : 0,
        width: t ? `calc(100% + ${n}px)` : ""
      };
      const l = {
        paddingTop: t ? u.t : 0,
        paddingRight: t ? u.r : 0,
        paddingBottom: t ? u.b : 0,
        paddingLeft: t ? u.l : 0
      };
      style(c || r, e);
      style(r, l);
      s({
        tt: u,
        xt: !t,
        M: c ? l : assignDeep({}, e, l)
      });
    }
    return {
      $t: y
    };
  };
};

const {max: Dt} = Math;

const Rt = Dt.bind(0, 0);

const kt = "visible";

const Bt = "hidden";

const Vt = 42;

const Yt = {
  _: equalWH,
  u: {
    w: 0,
    h: 0
  }
};

const jt = {
  _: equalXY,
  u: {
    x: Bt,
    y: Bt
  }
};

const getOverflowAmount = (t, n) => {
  const o = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
  const s = {
    w: Rt(t.w - n.w),
    h: Rt(t.h - n.h)
  };
  return {
    w: s.w > o ? s.w : 0,
    h: s.h > o ? s.h : 0
  };
};

const overflowIsVisible = t => 0 === t.indexOf(kt);

const createOverflowUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {J: e, tt: c, K: r, ot: l, dt: i, ht: a, it: u, ct: d} = t;
  const {B: f, Y: _, A: h, L: v} = getEnvironment();
  const g = getPlugins()[Tt];
  const w = !i && !h && (v.x || v.y);
  const p = u && i;
  const [b, m] = createCache(Yt, fractionalSize.bind(0, r));
  const [y, S] = createCache(Yt, scrollSize.bind(0, r));
  const [x, $] = createCache(Yt);
  const [C, O] = createCache(Yt);
  const [z] = createCache(jt);
  const fixFlexboxGlue = (t, n) => {
    style(r, {
      height: ""
    });
    if (n) {
      const {xt: n, tt: s} = o();
      const {Ct: c, D: l} = t;
      const i = fractionalSize(e);
      const a = clientSize(e);
      const u = "content-box" === style(r, "boxSizing");
      const d = n || u ? s.b + s.t : 0;
      const f = !(v.x && u);
      style(r, {
        height: a.h + i.h + (c.x && f ? l.x : 0) - d
      });
    }
  };
  const getViewportOverflowState = (t, n) => {
    const o = !h && !t ? Vt : 0;
    const getStatePerAxis = (t, s, e) => {
      const c = style(r, t);
      const l = n ? n[t] : c;
      const i = "scroll" === l;
      const a = s ? o : e;
      const u = i && !h ? a : 0;
      const d = s && !!o;
      return [ c, i, u, d ];
    };
    const [s, e, c, l] = getStatePerAxis("overflowX", v.x, f.x);
    const [i, a, u, d] = getStatePerAxis("overflowY", v.y, f.y);
    return {
      Ot: {
        x: s,
        y: i
      },
      Ct: {
        x: e,
        y: a
      },
      D: {
        x: c,
        y: u
      },
      R: {
        x: l,
        y: d
      }
    };
  };
  const setViewportOverflowState = (t, n, o, s) => {
    const setAxisOverflowStyle = (t, n) => {
      const o = overflowIsVisible(t);
      const s = n && o && t.replace(`${kt}-`, "") || "";
      return [ n && !o ? t : "", overflowIsVisible(s) ? "hidden" : s ];
    };
    const [e, c] = setAxisOverflowStyle(o.x, n.x);
    const [r, l] = setAxisOverflowStyle(o.y, n.y);
    s.overflowX = c && r ? c : e;
    s.overflowY = l && e ? l : r;
    return getViewportOverflowState(t, s);
  };
  const hideNativeScrollbars = (t, n, s, e) => {
    const {D: c, R: r} = t;
    const {x: l, y: i} = r;
    const {x: a, y: u} = c;
    const {M: d} = o();
    const f = n ? "marginLeft" : "marginRight";
    const _ = n ? "paddingLeft" : "paddingRight";
    const h = d[f];
    const v = d.marginBottom;
    const g = d[_];
    const w = d.paddingBottom;
    e.width = `calc(100% + ${u + -1 * h}px)`;
    e[f] = -u + h;
    e.marginBottom = -a + v;
    if (s) {
      e[_] = g + (i ? u : 0);
      e.paddingBottom = w + (l ? a : 0);
    }
  };
  const [H, P] = g ? g.P(w, _, r, l, o, getViewportOverflowState, hideNativeScrollbars) : [ () => w, () => [ noop ] ];
  return (t, n, l) => {
    const {wt: u, zt: f, bt: g, $t: w, gt: D, St: Y} = t;
    const {vt: j, yt: N} = o();
    const [q, F] = n("showNativeOverlaidScrollbars");
    const [G, X] = n("overflow");
    const U = q && v.x && v.y;
    const W = !i && !_ && (u || g || f || F || D);
    const Z = overflowIsVisible(G.x);
    const J = overflowIsVisible(G.y);
    const K = Z || J;
    let Q = m(l);
    let tt = S(l);
    let nt = $(l);
    let ot = O(l);
    let st;
    if (F && h) {
      a(R, L, !U);
    }
    if (W) {
      st = getViewportOverflowState(U);
      fixFlexboxGlue(st, j);
    }
    if (u || w || g || Y || F) {
      if (K) {
        a(k, A, false);
      }
      const [t, n] = P(U, N, st);
      const [o, s] = Q = b(l);
      const [e, c] = tt = y(l);
      const i = clientSize(r);
      let u = e;
      let f = i;
      t();
      if ((c || s || F) && n && !U && H(n, e, o, N)) {
        f = clientSize(r);
        u = scrollSize(r);
      }
      const _ = {
        w: Rt(Dt(e.w, u.w) + o.w),
        h: Rt(Dt(e.h, u.h) + o.h)
      };
      const h = {
        w: Rt((p ? d.innerWidth : f.w + Rt(i.w - e.w)) + o.w),
        h: Rt((p ? d.innerHeight + o.h : f.h + Rt(i.h - e.h)) + o.h)
      };
      ot = C(h);
      nt = x(getOverflowAmount(_, h), l);
    }
    const [et, ct] = ot;
    const [rt, lt] = nt;
    const [it, at] = tt;
    const [ut, dt] = Q;
    const ft = {
      x: rt.w > 0,
      y: rt.h > 0
    };
    const _t = Z && J && (ft.x || ft.y) || Z && ft.x && !ft.y || J && ft.y && !ft.x;
    if (w || Y || dt || at || ct || lt || X || F || W) {
      const t = {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        width: "",
        overflowY: "",
        overflowX: ""
      };
      const n = setViewportOverflowState(U, ft, G, t);
      const o = H(n, it, ut, N);
      if (!i) {
        hideNativeScrollbars(n, N, o, t);
      }
      if (W) {
        fixFlexboxGlue(n, j);
      }
      if (i) {
        attr(e, E, t.overflowX);
        attr(e, I, t.overflowY);
      } else {
        style(r, t);
      }
    }
    attrClass(e, T, A, _t);
    attrClass(c, B, V, _t);
    if (!i) {
      attrClass(r, M, k, K);
    }
    const [ht, vt] = z(getViewportOverflowState(U).Ot);
    s({
      Ot: ht,
      Tt: {
        x: et.w,
        y: et.h
      },
      Et: {
        x: rt.w,
        y: rt.h
      },
      It: ft
    });
    return {
      At: vt,
      Lt: ct,
      Ht: lt
    };
  };
};

const prepareUpdateHints = (t, n, o) => {
  const s = {};
  const e = n || {};
  const c = keys(t).concat(keys(e));
  each(c, (n => {
    const c = t[n];
    const r = e[n];
    s[n] = !!(o || c || r);
  }));
  return s;
};

const createStructureSetupUpdate = (t, n) => {
  const {Z: o, K: s, ht: e, dt: c} = t;
  const {A: r, L: l, Y: i} = getEnvironment();
  const a = !r && (l.x || l.y);
  const u = [ createTrinsicUpdateSegment(t, n), createPaddingUpdateSegment(t, n), createOverflowUpdateSegment(t, n) ];
  return (t, n, r) => {
    const l = prepareUpdateHints(assignDeep({
      wt: false,
      $t: false,
      St: false,
      gt: false,
      Lt: false,
      Ht: false,
      At: false,
      zt: false,
      bt: false
    }, n), {}, r);
    const d = a || !i;
    const f = d && scrollLeft(s);
    const _ = d && scrollTop(s);
    e("", P, true);
    let h = l;
    each(u, (n => {
      h = prepareUpdateHints(h, n(h, t, !!r) || {}, r);
    }));
    scrollLeft(s, f);
    scrollTop(s, _);
    e("", P);
    if (!c) {
      scrollLeft(o, 0);
      scrollTop(o, 0);
    }
    return h;
  };
};

const createEventContentChange = (t, n, o) => {
  let s;
  let e = false;
  const destroy = () => {
    e = true;
  };
  const updateElements = c => {
    if (o) {
      const r = o.reduce(((n, o) => {
        if (o) {
          const [s, e] = o;
          const r = e && s && (c ? c(s) : find(s, t));
          if (r && r.length && e && isString(e)) {
            push(n, [ r, e.trim() ], true);
          }
        }
        return n;
      }), []);
      each(r, (o => each(o[0], (c => {
        const r = o[1];
        const l = s.get(c) || [];
        const i = t.contains(c);
        if (i) {
          const t = on(c, r, (o => {
            if (e) {
              t();
              s.delete(c);
            } else {
              n(o);
            }
          }));
          s.set(c, push(l, t));
        } else {
          runEachAndClear(l);
          s.delete(c);
        }
      }))));
    }
  };
  if (o) {
    s = new WeakMap;
    updateElements();
  }
  return [ destroy, updateElements ];
};

const createDOMObserver = (t, n, o, s) => {
  let e = false;
  const {Pt: c, Mt: r, Dt: l, Rt: a, kt: u, Bt: d} = s || {};
  const f = debounce((() => {
    if (e) {
      o(true);
    }
  }), {
    g: 33,
    p: 99
  });
  const [_, h] = createEventContentChange(t, f, l);
  const v = c || [];
  const g = r || [];
  const w = v.concat(g);
  const observerCallback = (e, c) => {
    const r = u || noop;
    const l = d || noop;
    const i = new Set;
    const f = new Set;
    let _ = false;
    let v = false;
    each(e, (o => {
      const {attributeName: e, target: c, type: u, oldValue: d, addedNodes: h, removedNodes: w} = o;
      const p = "attributes" === u;
      const b = "childList" === u;
      const m = t === c;
      const y = p && isString(e) ? attr(c, e) : 0;
      const S = 0 !== y && d !== y;
      const x = indexOf(g, e) > -1 && S;
      if (n && (b || !m)) {
        const n = !p;
        const u = p && S;
        const f = u && a && is(c, a);
        const _ = f ? !r(c, e, d, y) : n || u;
        const g = _ && !l(o, !!f, t, s);
        each(h, (t => i.add(t)));
        each(w, (t => i.add(t)));
        v = v || g;
      }
      if (!n && m && S && !r(c, e, d, y)) {
        f.add(e);
        _ = _ || x;
      }
    }));
    if (i.size > 0) {
      h((t => from(i).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
    }
    if (n) {
      !c && v && o(false);
      return [ false ];
    }
    if (f.size > 0 || _) {
      const t = [ from(f), _ ];
      !c && o.apply(0, t);
      return t;
    }
  };
  const p = new i((t => observerCallback(t)));
  p.observe(t, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: w,
    subtree: n,
    childList: n,
    characterData: n
  });
  e = true;
  return [ () => {
    if (e) {
      _();
      p.disconnect();
      e = false;
    }
  }, () => {
    if (e) {
      f.S();
      const t = p.takeRecords();
      return !isEmptyArray(t) && observerCallback(t, true);
    }
  } ];
};

const Nt = 3333333;

const domRectHasDimensions = t => t && (t.height || t.width);

const createSizeObserver = (t, n, o) => {
  const {Vt: s = false, Yt: e = false} = o || {};
  const c = getPlugins()[xt];
  const {V: r} = getEnvironment();
  const l = createDOM(`<div class="${j}"><div class="${q}"></div></div>`);
  const i = l[0];
  const a = i.firstChild;
  const d = directionIsRTL.bind(0, t);
  const [f] = createCache({
    u: void 0,
    v: true,
    _: (t, n) => !(!t || !domRectHasDimensions(t) && domRectHasDimensions(n))
  });
  const onSizeChangedCallbackProxy = t => {
    const o = isArray(t) && t.length > 0 && isObject(t[0]);
    const e = !o && isBoolean(t[0]);
    let c = false;
    let l = false;
    let a = true;
    if (o) {
      const [n, , o] = f(t.pop().contentRect);
      const s = domRectHasDimensions(n);
      const e = domRectHasDimensions(o);
      c = !o || !s;
      l = !e && s;
      a = !c;
    } else if (e) {
      [, a] = t;
    } else {
      l = true === t;
    }
    if (s && a) {
      const n = e ? t[0] : directionIsRTL(i);
      scrollLeft(i, n ? r.n ? -Nt : r.i ? 0 : Nt : Nt);
      scrollTop(i, Nt);
    }
    if (!c) {
      n({
        wt: !e,
        jt: e ? t : void 0,
        Yt: !!l
      });
    }
  };
  const _ = [];
  let h = e ? onSizeChangedCallbackProxy : false;
  return [ () => {
    runEachAndClear(_);
    removeElements(i);
  }, () => {
    if (u) {
      const t = new u(onSizeChangedCallbackProxy);
      t.observe(a);
      push(_, (() => {
        t.disconnect();
      }));
    } else if (c) {
      const [t, n] = c.T(a, onSizeChangedCallbackProxy, e);
      h = t;
      push(_, n);
    }
    if (s) {
      const [t] = createCache({
        u: void 0
      }, d);
      push(_, on(i, "scroll", (n => {
        const o = t();
        const [s, e, c] = o;
        if (e) {
          removeClass(a, "ltr rtl");
          if (s) {
            addClass(a, "rtl");
          } else {
            addClass(a, "ltr");
          }
          onSizeChangedCallbackProxy([ !!s, e, c ]);
        }
        stopPropagation(n);
      })));
    }
    if (h) {
      addClass(i, N);
      push(_, on(i, "animationstart", h, {
        O: !!u
      }));
    }
    if (u || c) {
      appendChildren(t, i);
    }
  } ];
};

const isHeightIntrinsic = t => 0 === t.h || t.isIntersecting || t.intersectionRatio > 0;

const createTrinsicObserver = (t, n) => {
  let o;
  const s = createDiv(U);
  const e = [];
  const [c] = createCache({
    u: false
  });
  const triggerOnTrinsicChangedCallback = (t, o) => {
    if (t) {
      const s = c(isHeightIntrinsic(t));
      const [, e] = s;
      if (e) {
        !o && n(s);
        return [ s ];
      }
    }
  };
  const intersectionObserverCallback = (t, n) => {
    if (t && t.length > 0) {
      return triggerOnTrinsicChangedCallback(t.pop(), n);
    }
  };
  return [ () => {
    runEachAndClear(e);
    removeElements(s);
  }, () => {
    if (a) {
      o = new a((t => intersectionObserverCallback(t)), {
        root: t
      });
      o.observe(s);
      push(e, (() => {
        o.disconnect();
      }));
    } else {
      const onSizeChanged = () => {
        const t = offsetSize(s);
        triggerOnTrinsicChangedCallback(t);
      };
      const [t, n] = createSizeObserver(s, onSizeChanged);
      push(e, t);
      n();
      onSizeChanged();
    }
    appendChildren(t, s);
  }, () => {
    if (o) {
      return intersectionObserverCallback(o.takeRecords(), true);
    }
  } ];
};

const qt = `[${T}]`;

const Ft = `[${M}]`;

const Gt = [ "tabindex" ];

const Xt = [ "wrap", "cols", "rows" ];

const Ut = [ "id", "class", "style", "open" ];

const createStructureSetupObservers = (t, n, o) => {
  let s;
  let e;
  let c;
  const {J: r, K: l, nt: i, lt: a, dt: d, _t: f, ht: _} = t;
  const {Y: h} = getEnvironment();
  const [v] = createCache({
    _: equalWH,
    u: {
      w: 0,
      h: 0
    }
  }, (() => {
    const t = f(k, A);
    const n = f(D, "");
    const o = n && scrollLeft(l);
    const s = n && scrollTop(l);
    _(k, A);
    _(D, "");
    _("", P, true);
    const e = scrollSize(i);
    const c = scrollSize(l);
    const r = fractionalSize(l);
    _(k, A, t);
    _(D, "", n);
    _("", P);
    scrollLeft(l, o);
    scrollTop(l, s);
    return {
      w: c.w + e.w + r.w,
      h: c.h + e.h + r.h
    };
  }));
  const g = a ? Xt : Ut.concat(Xt);
  const w = debounce(o, {
    g: () => s,
    p: () => e,
    m(t, n) {
      const [o] = t;
      const [s] = n;
      return [ keys(o).concat(keys(s)).reduce(((t, n) => {
        t[n] = o[n] || s[n];
        return t;
      }), {}) ];
    }
  });
  const updateViewportAttrsFromHost = t => {
    each(t || Gt, (t => {
      if (indexOf(Gt, t) > -1) {
        const n = attr(r, t);
        if (isString(n)) {
          attr(l, t, n);
        } else {
          removeAttr(l, t);
        }
      }
    }));
  };
  const onTrinsicChanged = (t, s) => {
    const [e, c] = t;
    const r = {
      gt: c
    };
    n({
      vt: e
    });
    !s && o(r);
    return r;
  };
  const onSizeChanged = ({wt: t, jt: s, Yt: e}) => {
    const c = !t || e ? o : w;
    let r = false;
    if (s) {
      const [t, o] = s;
      r = o;
      n({
        yt: t
      });
    }
    c({
      wt: t,
      St: r
    });
  };
  const onContentMutation = (t, n) => {
    const [, s] = v();
    const e = {
      bt: s
    };
    const c = t ? o : w;
    if (s) {
      !n && c(e);
    }
    return e;
  };
  const onHostMutation = (t, n, o) => {
    const s = {
      zt: n
    };
    if (n) {
      !o && w(s);
    } else if (!d) {
      updateViewportAttrsFromHost(t);
    }
    return s;
  };
  const [p, b, m] = i || !h ? createTrinsicObserver(r, onTrinsicChanged) : [ noop, noop, noop ];
  const [y, S] = !d ? createSizeObserver(r, onSizeChanged, {
    Yt: true,
    Vt: true
  }) : [ noop, noop ];
  const [x, $] = createDOMObserver(r, false, onHostMutation, {
    Mt: Ut,
    Pt: Ut.concat(Gt)
  });
  const C = d && u && new u(onSizeChanged.bind(0, {
    wt: true
  }));
  C && C.observe(r);
  updateViewportAttrsFromHost();
  return [ () => {
    p();
    y();
    c && c[0]();
    C && C.disconnect();
    x();
  }, () => {
    S();
    b();
  }, () => {
    const t = {};
    const n = $();
    const o = m();
    const s = c && c[1]();
    if (n) {
      assignDeep(t, onHostMutation.apply(0, push(n, true)));
    }
    if (o) {
      assignDeep(t, onTrinsicChanged.apply(0, push(o, true)));
    }
    if (s) {
      assignDeep(t, onContentMutation.apply(0, push(s, true)));
    }
    return t;
  }, t => {
    const [n] = t("update.ignoreMutation");
    const [o, r] = t("update.attributes");
    const [a, u] = t("update.elementEvents");
    const [f, _] = t("update.debounce");
    const h = u || r;
    const ignoreMutationFromOptions = t => isFunction(n) && n(t);
    if (h) {
      if (c) {
        c[1]();
        c[0]();
      }
      c = createDOMObserver(i || l, true, onContentMutation, {
        Pt: g.concat(o || []),
        Dt: a,
        Rt: qt,
        Bt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !d ? liesBetween(o, qt, Ft) : false;
          return e || !!closest(o, `.${J}`) || !!ignoreMutationFromOptions(t);
        }
      });
    }
    if (_) {
      w.S();
      if (isArray(f)) {
        const t = f[0];
        const n = f[1];
        s = isNumber(t) && t;
        e = isNumber(n) && n;
      } else if (isNumber(f)) {
        s = f;
        e = false;
      } else {
        s = false;
        e = false;
      }
    }
  } ];
};

const Wt = {
  x: 0,
  y: 0
};

const createInitialStructureSetupUpdateState = t => ({
  tt: {
    t: 0,
    r: 0,
    b: 0,
    l: 0
  },
  xt: false,
  M: {
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  Tt: Wt,
  Et: Wt,
  Ot: {
    x: "hidden",
    y: "hidden"
  },
  It: {
    x: false,
    y: false
  },
  vt: false,
  yt: directionIsRTL(t.J)
});

const createStructureSetup = (t, n) => {
  const o = createOptionCheck(n, {});
  const [s, e, c] = createEventListenerHub();
  const [r, l, i] = createStructureSetupElements(t);
  const a = createState(createInitialStructureSetupUpdateState(r));
  const [u, d] = a;
  const f = createStructureSetupUpdate(r, a);
  const triggerUpdateEvent = (t, n, o) => {
    const s = keys(t).some((n => t[n]));
    const e = s || !isEmptyObject(n) || o;
    if (e) {
      c("u", [ t, n, o ]);
    }
    return e;
  };
  const [_, h, v, g] = createStructureSetupObservers(r, d, (t => triggerUpdateEvent(f(o, t), {}, false)));
  const w = u.bind(0);
  w.Nt = t => s("u", t);
  w.qt = () => {
    const {Z: t, K: n} = r;
    const o = scrollLeft(t);
    const s = scrollTop(t);
    h();
    l();
    scrollLeft(n, o);
    scrollTop(n, s);
  };
  w.Ft = r;
  return [ (t, o) => {
    const s = createOptionCheck(n, t, o);
    g(s);
    return triggerUpdateEvent(f(s, v(), o), t, !!o);
  }, w, () => {
    e();
    _();
    i();
  } ];
};

const {round: Zt} = Math;

const getScale = t => {
  const {width: n, height: o} = getBoundingClientRect(t);
  const {w: s, h: e} = offsetSize(t);
  return {
    x: Zt(n) / s || 1,
    y: Zt(o) / e || 1
  };
};

const continuePointerDown = (t, n, o) => {
  const s = n.scrollbars;
  const {button: e, isPrimary: c, pointerType: r} = t;
  const {pointers: l} = s;
  return 0 === e && c && s[o ? "dragScroll" : "clickScroll"] && (l || []).includes(r);
};

const createRootClickStopPropagationEvents = (t, n) => on(t, "mousedown", on.bind(0, n, "click", stopPropagation, {
  O: true,
  C: true
}), {
  C: true
});

const Jt = "pointerup pointerleave pointercancel lostpointercapture";

const createInteractiveScrollEvents = (t, n, o, s, e, c, r) => {
  const {V: l} = getEnvironment();
  const {Gt: i, Xt: a, Ut: u} = s;
  const d = `scroll${r ? "Left" : "Top"}`;
  const f = `client${r ? "X" : "Y"}`;
  const _ = r ? "width" : "height";
  const h = r ? "left" : "top";
  const v = r ? "w" : "h";
  const g = r ? "x" : "y";
  const createRelativeHandleMove = (t, n) => o => {
    const {Et: s} = c();
    const f = offsetSize(a)[v] - offsetSize(i)[v];
    const _ = n * o / f;
    const h = _ * s[g];
    const w = directionIsRTL(u);
    const p = w && r ? l.n || l.i ? 1 : -1 : 1;
    e[d] = t + h * p;
  };
  return on(a, "pointerdown", (s => {
    const c = closest(s.target, `.${ot}`) === i;
    const r = c ? i : a;
    attrClass(n, T, H, true);
    if (continuePointerDown(s, t, c)) {
      const t = !c && s.shiftKey;
      const getHandleRect = () => getBoundingClientRect(i);
      const getTrackRect = () => getBoundingClientRect(a);
      const getHandleOffset = (t, n) => (t || getHandleRect())[h] - (n || getTrackRect())[h];
      const l = createRelativeHandleMove(e[d] || 0, 1 / getScale(e)[g]);
      const u = s[f];
      const v = getHandleRect();
      const w = getTrackRect();
      const p = v[_];
      const b = getHandleOffset(v, w) + p / 2;
      const m = u - w[h];
      const y = c ? 0 : m - b;
      const releasePointerCapture = t => {
        runEachAndClear(S);
        r.releasePointerCapture(t.pointerId);
      };
      const S = [ attrClass.bind(0, n, T, H), on(o, Jt, releasePointerCapture), on(o, "selectstart", (t => preventDefault(t)), {
        $: false
      }), on(a, Jt, releasePointerCapture), on(a, "pointermove", (n => {
        const o = n[f] - u;
        if (c || t) {
          l(y + o);
        }
      })) ];
      if (t) {
        l(y);
      } else if (!c) {
        const t = getPlugins()[It];
        if (t) {
          push(S, t.T(l, getHandleOffset, y, p, m));
        }
      }
      r.setPointerCapture(s.pointerId);
    }
  }));
};

const createScrollbarsSetupEvents = (t, n) => (o, s, e, c, r, l) => {
  const {Ut: i} = o;
  const [a, u] = selfClearTimeout(333);
  const d = !!r.scrollBy;
  let f = true;
  return runEachAndClear.bind(0, [ on(i, "pointerenter", (() => {
    s(rt, true);
  })), on(i, "pointerleave pointercancel", (() => {
    s(rt);
  })), on(i, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: e} = t;
    if (d && f && 0 === e && parent(i) === c) {
      r.scrollBy({
        left: n,
        top: o,
        behavior: "smooth"
      });
    }
    f = false;
    s(at, true);
    a((() => {
      f = true;
      s(at);
    }));
    preventDefault(t);
  }), {
    $: false,
    C: true
  }), createRootClickStopPropagationEvents(i, e), createInteractiveScrollEvents(t, c, e, o, r, n, l), u ]);
};

const {min: Kt, max: Qt, abs: tn, round: nn} = Math;

const getScrollbarHandleLengthRatio = (t, n, o, s) => {
  if (s) {
    const t = o ? "x" : "y";
    const {Et: n, Tt: e} = s;
    const c = e[t];
    const r = n[t];
    return Qt(0, Kt(1, c / (c + r)));
  }
  const e = o ? "w" : "h";
  const c = offsetSize(t)[e];
  const r = offsetSize(n)[e];
  return Qt(0, Kt(1, c / r));
};

const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
  const {V: r} = getEnvironment();
  const l = c ? "x" : "y";
  const i = c ? "Left" : "Top";
  const {Et: a} = s;
  const u = nn(a[l]);
  const d = tn(o[`scroll${i}`]);
  const f = c && e;
  const _ = r.i ? d : u - d;
  const h = f ? _ : d;
  const v = Kt(1, h / u);
  const g = getScrollbarHandleLengthRatio(t, n, c);
  return 1 / g * (1 - g) * v;
};

const createScrollbarsSetupElements = (t, n, o) => {
  const {q: s, H: e} = getEnvironment();
  const {scrollbars: c} = s();
  const {slot: r} = c;
  const {rt: l, Z: i, J: a, K: u, ut: d, st: f, it: h, dt: v} = n;
  const {scrollbars: g} = d ? {} : t;
  const {slot: w} = g || {};
  const p = dynamicInitializationElement([ i, a, u ], (() => v && h ? i : a), r, w);
  const scrollbarStructureAddRemoveClass = (t, n, o) => {
    const s = o ? addClass : removeClass;
    each(t, (t => {
      s(t.Ut, n);
    }));
  };
  const scrollbarsHandleStyle = (t, n) => {
    each(t, (t => {
      const [o, s] = n(t);
      style(o, s);
    }));
  };
  const scrollbarStructureRefreshHandleLength = (t, n, o) => {
    scrollbarsHandleStyle(t, (t => {
      const {Gt: s, Xt: e} = t;
      return [ s, {
        [o ? "width" : "height"]: `${(100 * getScrollbarHandleLengthRatio(s, e, o, n)).toFixed(3)}%`
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
    const s = o ? "X" : "Y";
    scrollbarsHandleStyle(t, (t => {
      const {Gt: e, Xt: c, Ut: r} = t;
      const l = getScrollbarHandleOffsetRatio(e, c, f, n, directionIsRTL(r), o);
      const i = l === l;
      return [ e, {
        transform: i ? `translate${s}(${(100 * l).toFixed(3)}%)` : ""
      } ];
    }));
  };
  const b = [];
  const m = [];
  const y = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass(m, t, n);
    c && scrollbarStructureAddRemoveClass(y, t, n);
  };
  const refreshScrollbarsHandleLength = t => {
    scrollbarStructureRefreshHandleLength(m, t, true);
    scrollbarStructureRefreshHandleLength(y, t);
  };
  const refreshScrollbarsHandleOffset = t => {
    scrollbarStructureRefreshHandleOffset(m, t, true);
    scrollbarStructureRefreshHandleOffset(y, t);
  };
  const generateScrollbarDOM = t => {
    const n = t ? Q : tt;
    const s = t ? m : y;
    const c = isEmptyArray(s) ? ct : "";
    const r = createDiv(`${J} ${n} ${c}`);
    const i = createDiv(nt);
    const u = createDiv(ot);
    const d = {
      Ut: r,
      Xt: i,
      Gt: u
    };
    if (!e) {
      addClass(r, W);
    }
    appendChildren(r, i);
    appendChildren(i, u);
    push(s, d);
    push(b, [ removeElements.bind(0, r), o(d, scrollbarsAddRemoveClass, l, a, f, t) ]);
    return d;
  };
  const S = generateScrollbarDOM.bind(0, true);
  const x = generateScrollbarDOM.bind(0, false);
  const appendElements = () => {
    appendChildren(p, m[0].Ut);
    appendChildren(p, y[0].Ut);
    _((() => {
      scrollbarsAddRemoveClass(ct);
    }), 300);
  };
  S();
  x();
  return [ {
    Wt: refreshScrollbarsHandleLength,
    Zt: refreshScrollbarsHandleOffset,
    Jt: scrollbarsAddRemoveClass,
    Kt: {
      Qt: m,
      tn: S,
      nn: scrollbarsHandleStyle.bind(0, m)
    },
    sn: {
      Qt: y,
      tn: x,
      nn: scrollbarsHandleStyle.bind(0, y)
    }
  }, appendElements, runEachAndClear.bind(0, b) ];
};

const createScrollbarsSetup = (t, n, o, s) => {
  let e;
  let c;
  let r;
  let l;
  let i;
  let a = 0;
  const u = createState({});
  const [d] = u;
  const [f, _] = selfClearTimeout();
  const [h, v] = selfClearTimeout();
  const [g, w] = selfClearTimeout(100);
  const [p, b] = selfClearTimeout(100);
  const [m, y] = selfClearTimeout((() => a));
  const [S, x, $] = createScrollbarsSetupElements(t, o.Ft, createScrollbarsSetupEvents(n, o));
  const {J: C, K: O, st: z, et: T, dt: E, it: I} = o.Ft;
  const {Kt: A, sn: L, Jt: H, Wt: P, Zt: M} = S;
  const {nn: D} = A;
  const {nn: R} = L;
  const styleScrollbarPosition = t => {
    const {Ut: n} = t;
    const o = E && !I && parent(n) === O && n;
    return [ o, {
      transform: o ? `translate(${scrollLeft(z)}px, ${scrollTop(z)}px)` : ""
    } ];
  };
  const manageScrollbarsAutoHide = (t, n) => {
    y();
    if (t) {
      H(it);
    } else {
      const hide = () => H(it, true);
      if (a > 0 && !n) {
        m(hide);
      } else {
        hide();
      }
    }
  };
  const onHostMouseEnter = () => {
    l = c;
    l && manageScrollbarsAutoHide(true);
  };
  const k = [ w, y, b, v, _, $, on(C, "pointerover", onHostMouseEnter, {
    O: true
  }), on(C, "pointerenter", onHostMouseEnter), on(C, "pointerleave", (() => {
    l = false;
    c && manageScrollbarsAutoHide(false);
  })), on(C, "pointermove", (() => {
    e && f((() => {
      w();
      manageScrollbarsAutoHide(true);
      p((() => {
        e && manageScrollbarsAutoHide(false);
      }));
    }));
  })), on(T, "scroll", (t => {
    h((() => {
      M(o());
      r && manageScrollbarsAutoHide(true);
      g((() => {
        r && !l && manageScrollbarsAutoHide(false);
      }));
    }));
    s(t);
    E && D(styleScrollbarPosition);
    E && R(styleScrollbarPosition);
  })) ];
  const B = d.bind(0);
  B.Ft = S;
  B.qt = x;
  return [ (t, s, l) => {
    const {Lt: u, Ht: d, At: f, St: _} = l;
    const {L: h} = getEnvironment();
    const v = createOptionCheck(n, t, s);
    const g = o();
    const {Et: w, Ot: p, yt: b} = g;
    const [m, y] = v("showNativeOverlaidScrollbars");
    const [S, x] = v("scrollbars.theme");
    const [$, C] = v("scrollbars.visibility");
    const [O, z] = v("scrollbars.autoHide");
    const [T] = v("scrollbars.autoHideDelay");
    const [E, A] = v("scrollbars.dragScroll");
    const [L, D] = v("scrollbars.clickScroll");
    const R = u || d || _;
    const k = f || C;
    const B = m && h.x && h.y;
    const setScrollbarVisibility = (t, n) => {
      const o = "visible" === $ || "auto" === $ && "scroll" === t;
      H(st, o, n);
      return o;
    };
    a = T;
    if (y) {
      H(Z, B);
    }
    if (x) {
      H(i);
      H(S, true);
      i = S;
    }
    if (z) {
      e = "move" === O;
      c = "leave" === O;
      r = "never" !== O;
      manageScrollbarsAutoHide(!r, true);
    }
    if (A) {
      H(dt, E);
    }
    if (D) {
      H(ut, L);
    }
    if (k) {
      const t = setScrollbarVisibility(p.x, true);
      const n = setScrollbarVisibility(p.y, false);
      const o = t && n;
      H(et, !o);
    }
    if (R) {
      P(g);
      M(g);
      H(lt, !w.x, true);
      H(lt, !w.y, false);
      H(K, b && !I);
    }
  }, B, runEachAndClear.bind(0, k) ];
};

const invokePluginInstance = (t, n, o) => {
  if (isFunction(t)) {
    t(n || void 0, o || void 0);
  }
};

const OverlayScrollbars = (t, n, o) => {
  const {G: s, q: e, j: c, N: r} = getEnvironment();
  const l = getPlugins();
  const i = isHTMLElement(t);
  const a = i ? t : t.target;
  const u = getInstance(a);
  if (n && !u) {
    let u = false;
    const validateOptions = t => {
      const n = getPlugins()[mt];
      const o = n && n.T;
      return o ? o(t, true) : t;
    };
    const d = assignDeep({}, s(), validateOptions(n));
    const [f, _, h] = createEventListenerHub(o);
    const [v, g, w] = createStructureSetup(t, d);
    const [p, b, m] = createScrollbarsSetup(t, d, g, (t => h("scroll", [ $, t ])));
    const update = (t, n) => v(t, !!n);
    const y = update.bind(0, {}, true);
    const S = c(y);
    const x = r(y);
    const destroy = t => {
      removeInstance(a);
      S();
      x();
      m();
      w();
      u = true;
      h("destroyed", [ $, !!t ]);
      _();
    };
    const $ = {
      options(t, n) {
        if (t) {
          const o = n ? s() : {};
          const e = getOptionsDiff(d, assignDeep(o, validateOptions(t)));
          if (!isEmptyObject(e)) {
            assignDeep(d, e);
            update(e);
          }
        }
        return assignDeep({}, d);
      },
      on: f,
      off: (t, n) => {
        t && n && _(t, n);
      },
      state() {
        const {Tt: t, Et: n, Ot: o, It: s, tt: e, xt: c, yt: r} = g();
        return assignDeep({}, {
          overflowEdge: t,
          overflowAmount: n,
          overflowStyle: o,
          hasOverflow: s,
          padding: e,
          paddingAbsolute: c,
          directionRTL: r,
          destroyed: u
        });
      },
      elements() {
        const {Z: t, J: n, tt: o, K: s, nt: e, st: c, et: r} = g.Ft;
        const {Kt: l, sn: i} = b.Ft;
        const translateScrollbarStructure = t => {
          const {Gt: n, Xt: o, Ut: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {Qt: n, tn: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              p({}, true, {});
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
      update: t => update({}, t),
      destroy: destroy.bind(0)
    };
    g.Nt(((t, n, o) => {
      p(n, o, t);
    }));
    addInstance(a, $);
    each(keys(l), (t => invokePluginInstance(l[t], 0, $)));
    if (cancelInitialization(g.Ft.it, e().cancel, !i && t.cancel)) {
      destroy(true);
      return $;
    }
    g.qt();
    b.qt();
    h("initialized", [ $ ]);
    g.Nt(((t, n, o) => {
      const {wt: s, St: e, gt: c, Lt: r, Ht: l, At: i, bt: a, zt: u} = t;
      h("updated", [ $, {
        updateHints: {
          sizeChanged: s,
          directionChanged: e,
          heightIntrinsicChanged: c,
          overflowEdgeChanged: r,
          overflowAmountChanged: l,
          overflowStyleChanged: i,
          contentMutation: a,
          hostMutation: u
        },
        changedOptions: n,
        force: o
      } ]);
    }));
    $.update(true);
    return $;
  }
  return u;
};

OverlayScrollbars.plugin = t => {
  each(addPlugin(t), (t => invokePluginInstance(t, OverlayScrollbars)));
};

OverlayScrollbars.valid = t => {
  const n = t && t.elements;
  const o = isFunction(n) && n();
  return isPlainObject(o) && !!getInstance(o.target);
};

OverlayScrollbars.env = () => {
  const {B: t, L: n, A: o, V: s, Y: e, H: c, U: r, W: l, q: i, F: a, G: u, X: d} = getEnvironment();
  return assignDeep({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: n,
    scrollbarsHiding: o,
    rtlScrollBehavior: s,
    flexboxGlue: e,
    cssCustomProperties: c,
    staticDefaultInitialization: r,
    staticDefaultOptions: l,
    getDefaultInitialization: i,
    setDefaultInitialization: a,
    getDefaultOptions: u,
    setDefaultOptions: d
  });
};

exports.ClickScrollPlugin = At;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = Et;

exports.SizeObserverPlugin = $t;
//# sourceMappingURL=overlayscrollbars.cjs.js.map
