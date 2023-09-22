/*!
 * OverlayScrollbars
 * Version: 2.3.2
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
      if (n(t[o], o, t) === false) {
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
  const {u: o, _: s, g: e} = t;
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

const isClient = () => typeof window !== "undefined";

const t = isClient() && Node.ELEMENT_NODE;

const {toString: n, hasOwnProperty: o} = Object.prototype;

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : n.call(t).replace(/^\[object (.+)\]$/, "$1").toLowerCase();

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

const isEmptyArray = t => !!t && t.length === 0;

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
    each(keys(n), (o => {
      const s = n[o];
      if (t === s) {
        return true;
      }
      const e = isArray(s);
      if (s && isPlainObject(s)) {
        const n = t[o];
        let c = n;
        if (e && !isArray(n)) {
          c = [];
        } else if (!e && !isPlainObject(n)) {
          c = {};
        }
        t[o] = assignDeep(c, s);
      } else {
        t[o] = e ? s.slice() : s;
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

const scrollLeft = (t, n) => getSetProp("scrollLeft", 0, t, n);

const scrollTop = (t, n) => getSetProp("scrollTop", 0, t, n);

const s = isClient() && Element.prototype;

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
    const o = s.matches || s.msMatchesSelector;
    return o.call(t, n);
  }
  return false;
};

const contents = t => t ? from(t.childNodes) : [];

const parent = t => t && t.parentElement;

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
};

const liesBetween = (t, n, o) => {
  const s = closest(t, n);
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
    return !(n = r.find((t => s[t] !== void 0)));
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

const f = jsAPI("cancelAnimationFrame");

const d = jsAPI("requestAnimationFrame");

const _ = jsAPI("ScrollTimeline");

const h = isClient() && window.setTimeout;

const g = isClient() && window.clearTimeout;

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

const {max: p} = Math;

const animationCurrentTime = () => performance.now();

const animateNumber = (t, n, o, s, e) => {
  let c = 0;
  const r = animationCurrentTime();
  const l = p(0, o);
  const frame = o => {
    const i = animationCurrentTime();
    const a = i - r;
    const u = a >= l;
    const f = o ? 1 : 1 - (p(0, r + l - i) / l || 0);
    const _ = (n - t) * (isFunction(e) ? e(f, f * l, 0, 1, l) : f) + t;
    const h = u || f === 1;
    s && s(_, f, h);
    c = h ? 0 : d((() => frame()));
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

const equalBCRWH = (t, n, o) => equal(t, n, [ "width", "height" ], o && (t => Math.round(t)));

const noop = () => {};

const selfClearTimeout = t => {
  let n;
  const o = t ? h : d;
  const s = t ? g : f;
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
  const {v: r, p: l, m: i} = n || {};
  const a = function invokeFunctionToDebounce(n) {
    c();
    g(o);
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
      const u = n > 0 ? h : d;
      const _ = n > 0 ? g : f;
      const v = mergeParms(t);
      const p = v || t;
      const w = a.bind(0, p);
      c();
      const b = u(w, n);
      c = () => _(b);
      if (i && !o) {
        o = h(flush, r);
      }
      s = e = p;
    } else {
      a(t);
    }
  };
  u.S = flush;
  return u;
};

const w = {
  opacity: 1,
  zIndex: 1
};

const parseToZeroOrNumber = (t, n) => {
  const o = t || "";
  const s = n ? parseFloat(o) : parseInt(o, 10);
  return s === s ? s : 0;
};

const adaptCSSVal = (t, n) => !w[t] && isNumber(n) ? `${n}px` : n;

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

const directionIsRTL = t => style(t, "direction") === "rtl";

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

const getTrasformTranslateValue = (t, n) => `translate${isArray(t) ? `(${t[0]},${t[1]})` : `${n ? "X" : "Y"}(${t})`}`;

const {round: b} = Math;

const m = {
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
} : m;

const clientSize = t => t ? {
  w: t.clientWidth,
  h: t.clientHeight
} : m;

const scrollSize = t => t ? {
  w: t.scrollWidth,
  h: t.scrollHeight
} : m;

const fractionalSize = t => {
  const n = parseFloat(style(t, "height")) || 0;
  const o = parseFloat(style(t, "width")) || 0;
  return {
    w: o - b(o),
    h: n - b(n)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const domRectHasDimensions = t => !!(t && (t.height || t.width));

let y;

const supportPassiveEvents = () => {
  if (isUndefined(y)) {
    y = false;
    try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get() {
          y = true;
        }
      }));
    } catch (t) {}
  }
  return y;
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
  const r = (e = c && s && s.$) != null ? e : c;
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

const S = {
  x: 0,
  y: 0
};

const absoluteCoordinates = t => {
  const n = t ? getBoundingClientRect(t) : 0;
  return n ? {
    x: n.left + window.pageYOffset,
    y: n.top + window.pageXOffset
  } : S;
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

const $ = {
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

const x = `data-overlayscrollbars`;

const C = "os-environment";

const O = `${C}-flexbox-glue`;

const T = `${O}-max`;

const z = `os-scrollbar-hidden`;

const E = `${x}-initialize`;

const A = x;

const I = `${A}-overflow-x`;

const H = `${A}-overflow-y`;

const L = "overflowVisible";

const M = "scrollbarHidden";

const P = "scrollbarPressed";

const D = "updating";

const R = `${x}-viewport`;

const k = "arrange";

const B = "scrollbarHidden";

const V = L;

const Y = `${x}-padding`;

const j = V;

const N = `${x}-content`;

const q = "os-size-observer";

const F = `${q}-appear`;

const G = `${q}-listener`;

const X = `${G}-scroll`;

const U = `${G}-item`;

const W = `${U}-final`;

const Z = "os-trinsic-observer";

const J = "os-no-css-vars";

const K = "os-theme-none";

const Q = "os-scrollbar";

const tt = `${Q}-rtl`;

const nt = `${Q}-horizontal`;

const ot = `${Q}-vertical`;

const st = `${Q}-track`;

const et = `${Q}-handle`;

const ct = `${Q}-visible`;

const rt = `${Q}-cornerless`;

const lt = `${Q}-transitionless`;

const it = `${Q}-interaction`;

const at = `${Q}-unusable`;

const ut = `${Q}-auto-hide`;

const ft = `${ut}-hidden`;

const dt = `${Q}-wheel`;

const _t = `${st}-interactive`;

const ht = `${et}-interactive`;

const gt = {};

const getPlugins = () => gt;

const addPlugin = t => {
  const n = [];
  each(isArray(t) ? t : [ t ], (t => {
    const o = keys(t);
    each(o, (o => {
      push(n, gt[o] = t[o]);
    }));
  }));
  return n;
};

const vt = {
  boolean: "__TPL_boolean_TYPE__",
  number: "__TPL_number_TYPE__",
  string: "__TPL_string_TYPE__",
  array: "__TPL_array_TYPE__",
  object: "__TPL_object_TYPE__",
  function: "__TPL_function_TYPE__",
  null: "__TPL_null_TYPE__"
};

const pt = vt.number;

const wt = vt.boolean;

const bt = [ vt.array, vt.null ];

const mt = "hidden scroll visible visible-hidden";

const yt = "visible hidden auto";

const St = "never scroll leavemove";

({
  paddingAbsolute: wt,
  showNativeOverlaidScrollbars: wt,
  update: {
    elementEvents: bt,
    attributes: bt,
    debounce: [ vt.number, vt.array, vt.null ],
    ignoreMutation: [ vt.function, vt.null ]
  },
  overflow: {
    x: mt,
    y: mt
  },
  scrollbars: {
    theme: [ vt.string, vt.null ],
    visibility: yt,
    autoHide: St,
    autoHideDelay: pt,
    autoHideSuspend: wt,
    dragScroll: wt,
    clickScroll: wt,
    pointers: [ vt.array, vt.null ]
  }
});

const $t = "__osOptionsValidationPlugin";

const xt = 3333333;

const Ct = "scroll";

const Ot = "__osSizeObserverPlugin";

const Tt = /* @__PURE__ */ (() => ({
  [Ot]: {
    T: (t, n, o) => {
      const s = createDOM(`<div class="${U}" dir="ltr"><div class="${U}"><div class="${W}"></div></div><div class="${U}"><div class="${W}" style="width: 200%; height: 200%"></div></div></div>`);
      appendChildren(t, s);
      addClass(t, X);
      const e = s[0];
      const c = e.lastChild;
      const r = e.firstChild;
      const l = r == null ? void 0 : r.firstChild;
      let i = offsetSize(e);
      let a = i;
      let u = false;
      let _;
      const reset = () => {
        scrollLeft(r, xt);
        scrollTop(r, xt);
        scrollLeft(c, xt);
        scrollTop(c, xt);
      };
      const onResized = t => {
        _ = 0;
        if (u) {
          i = a;
          n(t === true);
        }
      };
      const onScroll = t => {
        a = offsetSize(e);
        u = !t || !equalWH(a, i);
        if (t) {
          stopPropagation(t);
          if (u && !_) {
            f(_);
            _ = d(onResized);
          }
        } else {
          onResized(t === false);
        }
        reset();
      };
      const h = push([], [ on(r, Ct, onScroll), on(c, Ct, onScroll) ]);
      style(l, {
        width: xt,
        height: xt
      });
      d(reset);
      return [ o ? onScroll.bind(0, false) : reset, h ];
    }
  }
}))();

let zt = 0;

const {round: Et, abs: At} = Math;

const getWindowDPR = () => {
  const t = window.screen.deviceXDPI || 0;
  const n = window.screen.logicalXDPI || 1;
  return window.devicePixelRatio || t / n;
};

const diffBiggerThanOne = (t, n) => {
  const o = At(t);
  const s = At(n);
  return !(o === s || o + 1 === s || o - 1 === s);
};

const It = "__osScrollbarsHidingPlugin";

const Ht = /* @__PURE__ */ (() => ({
  [It]: {
    A: t => {
      const {I: n, H: o, L: s} = t;
      const e = !s && !n && (o.x || o.y);
      const c = e ? document.createElement("style") : false;
      if (c) {
        attr(c, "id", `${R}-${k}-${zt}`);
        zt++;
      }
      return c;
    },
    M: (t, n, o, s, e, c, r) => {
      const arrangeViewport = (n, c, r, l) => {
        if (t) {
          const {P: t} = e();
          const {D: i, R: a} = n;
          const {x: u, y: f} = a;
          const {x: d, y: _} = i;
          const h = l ? "paddingRight" : "paddingLeft";
          const g = t[h];
          const v = t.paddingTop;
          const p = c.w + r.w;
          const w = c.h + r.h;
          const b = {
            w: _ && f ? `${_ + p - g}px` : "",
            h: d && u ? `${d + w - v}px` : ""
          };
          if (s) {
            const {sheet: t} = s;
            if (t) {
              const {cssRules: n} = t;
              if (n) {
                if (!n.length) {
                  t.insertRule(`#${attr(s, "id")} + [${R}~='${k}']::before {}`, 0);
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
          const {P: u} = e();
          const {R: f} = a;
          const {x: d, y: _} = f;
          const h = {};
          const assignProps = t => each(t.split(" "), (t => {
            h[t] = u[t];
          }));
          if (d) {
            assignProps("marginBottom paddingTop paddingBottom");
          }
          if (_) {
            assignProps("marginLeft marginRight paddingLeft paddingRight");
          }
          const g = style(o, keys(h));
          attrClass(o, R, k);
          if (!n) {
            h.height = "";
          }
          style(o, h);
          return [ () => {
            r(a, l, t, g);
            style(o, g);
            attrClass(o, R, k, true);
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
        if (r.w === 0 && r.h === 0) {
          return;
        }
        const l = {
          w: At(r.w),
          h: At(r.h)
        };
        const i = {
          w: At(Et(c.w / (t.w / 100))),
          h: At(Et(c.h / (t.h / 100)))
        };
        const a = getWindowDPR();
        const u = l.w > 2 && l.h > 2;
        const f = !diffBiggerThanOne(i.w, i.h);
        const d = a !== n && a > 0;
        const _ = u && f && d;
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

const Lt = "__osClickScrollPlugin";

const Mt = /* @__PURE__ */ (() => ({
  [Lt]: {
    T: (t, n, o, s, e) => {
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

let Pt;

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
  const o = addClass(t, z);
  try {
    n = style(t, cssProperty("scrollbar-width")) === "none" || window.getComputedStyle(t, "::-webkit-scrollbar").getPropertyValue("display") === "none";
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
  const o = addClass(t, O);
  const s = getBoundingClientRect(t);
  const e = getBoundingClientRect(n);
  const c = equalBCRWH(e, s, true);
  const r = addClass(t, T);
  const l = getBoundingClientRect(t);
  const i = getBoundingClientRect(n);
  const a = equalBCRWH(i, l, true);
  o();
  r();
  return c && a;
};

const createEnvironment = () => {
  const {body: t} = document;
  const n = createDOM(`<div class="${C}"><div></div></div>`);
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
    x: i.x === 0,
    y: i.y === 0
  };
  const f = {
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
  const d = assignDeep({}, $);
  const h = assignDeep.bind(0, {}, d);
  const g = assignDeep.bind(0, {}, f);
  const v = {
    B: i,
    H: u,
    I: a,
    L: style(o, "zIndex") === "-1",
    V: !!_,
    Y: getRtlScrollBehavior(o, s),
    j: getFlexboxGlue(o, s),
    N: e.bind(0, "z"),
    q: e.bind(0, "r"),
    F: g,
    G: t => assignDeep(f, t) && g(),
    X: h,
    U: t => assignDeep(d, t) && h(),
    W: assignDeep({}, f),
    Z: assignDeep({}, d)
  };
  const p = window.addEventListener;
  const w = debounce((t => c(t ? "z" : "r")), {
    v: 33,
    p: 99
  });
  removeAttr(o, "style");
  removeElements(o);
  p("resize", w.bind(0, false));
  if (!a && (!u.x || !u.y)) {
    let t;
    p("resize", (() => {
      const n = getPlugins()[It];
      t = t || n && n.k();
      t && t(v, r, w.bind(0, true));
    }));
  }
  return v;
};

const getEnvironment = () => {
  if (!Pt) {
    Pt = createEnvironment();
  }
  return Pt;
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
  const {H: c, I: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = n;
  const a = s != null ? s : l;
  const u = isUndefined(e) ? i : e;
  const f = (c.x || c.y) && a;
  const d = t && (isNull(u) ? !r : u);
  return !!f || !!d;
};

const Dt = new WeakMap;

const addInstance = (t, n) => {
  Dt.set(t, n);
};

const removeInstance = t => {
  Dt.delete(t);
};

const getInstance = t => Dt.get(t);

const getPropByPath = (t, n) => t ? n.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;

const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || getPropByPath(n, s) !== void 0 ];

const createState = t => {
  let n = t;
  return [ () => n, t => {
    n = assignDeep({}, n, t);
  } ];
};

const Rt = "tabindex";

const kt = createDiv.bind(0, "");

const unwrap = t => {
  appendChildren(parent(t), contents(t));
  removeElements(t);
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {F: o, I: s} = n;
  const e = getPlugins()[It];
  const c = e && e.A;
  const {elements: r} = o();
  const {host: l, padding: i, viewport: a, content: u} = r;
  const f = isHTMLElement(t);
  const d = f ? {} : t;
  const {elements: _} = d;
  const {host: h, padding: g, viewport: v, content: p} = _ || {};
  const w = f ? t : d.target;
  const b = is(w, "textarea");
  const m = w.ownerDocument;
  const y = m.documentElement;
  const S = w === m.body;
  const $ = m.defaultView;
  const x = staticInitializationElement.bind(0, [ w ]);
  const C = dynamicInitializationElement.bind(0, [ w ]);
  const O = resolveInitialization.bind(0, [ w ]);
  const T = x.bind(0, kt, a);
  const L = C.bind(0, kt, u);
  const M = T(v);
  const P = M === w;
  const D = P && S;
  const k = !P && L(p);
  const V = !P && isHTMLElement(M) && M === k;
  const j = V && !!O(u);
  const q = j ? T() : M;
  const F = j ? k : L();
  const G = V ? q : M;
  const X = D ? y : G;
  const U = b ? x(kt, l, h) : w;
  const W = D ? X : U;
  const Z = V ? F : k;
  const J = m.activeElement;
  const K = !P && $.top === $ && J === w;
  const Q = {
    J: w,
    K: W,
    tt: X,
    nt: !P && C(kt, i, g),
    ot: Z,
    st: !P && !s && c && c(n),
    et: D ? y : X,
    ct: D ? m : X,
    rt: $,
    lt: m,
    it: b,
    ut: S,
    ft: f,
    dt: P,
    _t: V,
    ht: (t, n) => hasAttrClass(X, P ? A : R, P ? n : t),
    gt: (t, n, o) => attrClass(X, P ? A : R, P ? n : t, o)
  };
  const tt = keys(Q).reduce(((t, n) => {
    const o = Q[n];
    return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? indexOf(tt, t) > -1 : null;
  const {J: nt, K: ot, nt: st, tt: et, ot: ct, st: rt} = Q;
  const lt = [ () => {
    removeAttr(ot, A);
    removeAttr(ot, E);
    removeAttr(nt, E);
    if (S) {
      removeAttr(y, A);
      removeAttr(y, E);
    }
  } ];
  const it = b && elementIsGenerated(ot);
  let at = b ? nt : contents([ ct, et, st, ot, nt ].find((t => elementIsGenerated(t) === false)));
  const ut = D ? nt : ct || et;
  const appendElements = () => {
    attr(ot, A, P ? "viewport" : "host");
    attr(st, Y, "");
    attr(ct, N, "");
    if (!P) {
      attr(et, R, "");
    }
    const t = S && !P ? addClass(parent(w), z) : noop;
    if (it) {
      insertAfter(nt, ot);
      push(lt, (() => {
        insertAfter(ot, nt);
        removeElements(ot);
      }));
    }
    appendChildren(ut, at);
    appendChildren(ot, st);
    appendChildren(st || ot, !P && et);
    appendChildren(et, ct);
    push(lt, (() => {
      t();
      removeAttr(st, Y);
      removeAttr(ct, N);
      removeAttr(et, I);
      removeAttr(et, H);
      removeAttr(et, R);
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
    if (s && !P) {
      attrClass(et, R, B, true);
      push(lt, removeAttr.bind(0, et, R));
    }
    if (rt) {
      insertBefore(et, rt);
      push(lt, removeElements.bind(0, rt));
    }
    if (K) {
      const t = attr(et, Rt);
      attr(et, Rt, "-1");
      et.focus();
      const revertViewportTabIndex = () => t ? attr(et, Rt, t) : removeAttr(et, Rt);
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
  const {ot: o} = t;
  const [s] = n;
  return t => {
    const {j: n} = getEnvironment();
    const {vt: e} = s();
    const {wt: c} = t;
    const r = (o || !n) && c;
    if (r) {
      style(o, {
        height: e ? "" : "100%"
      });
    }
    return {
      bt: r,
      yt: r
    };
  };
};

const createPaddingUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {K: e, nt: c, tt: r, dt: l} = t;
  const [i, a] = createCache({
    _: equalTRBL,
    u: topRightBottomLeft()
  }, topRightBottomLeft.bind(0, e, "padding", ""));
  return (t, n, e) => {
    let [u, f] = a(e);
    const {I: d, j: _} = getEnvironment();
    const {St: h} = o();
    const {bt: g, yt: v, $t: p} = t;
    const [w, b] = n("paddingAbsolute");
    const m = !_ && v;
    if (g || f || m) {
      [u, f] = i(e);
    }
    const y = !l && (b || p || f);
    if (y) {
      const t = !w || !c && !d;
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
        nt: u,
        xt: !t,
        P: c ? l : assignDeep({}, e, l)
      });
    }
    return {
      Ct: y
    };
  };
};

const {max: Bt} = Math;

const Vt = Bt.bind(0, 0);

const Yt = "visible";

const jt = "hidden";

const Nt = 42;

const qt = {
  _: equalWH,
  u: {
    w: 0,
    h: 0
  }
};

const Ft = {
  _: equalXY,
  u: {
    x: jt,
    y: jt
  }
};

const getOverflowAmount = (t, n) => {
  const o = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
  const s = {
    w: Vt(t.w - n.w),
    h: Vt(t.h - n.h)
  };
  return {
    w: s.w > o ? s.w : 0,
    h: s.h > o ? s.h : 0
  };
};

const overflowIsVisible = t => t.indexOf(Yt) === 0;

const createOverflowUpdateSegment = (t, n) => {
  const [o, s] = n;
  const {K: e, nt: c, tt: r, st: l, dt: i, gt: a, ut: u, rt: f} = t;
  const {B: d, j: _, I: h, H: g} = getEnvironment();
  const v = getPlugins()[It];
  const p = !i && !h && (g.x || g.y);
  const w = u && i;
  const [b, m] = createCache(qt, fractionalSize.bind(0, r));
  const [y, S] = createCache(qt, scrollSize.bind(0, r));
  const [$, x] = createCache(qt);
  const [C, O] = createCache(qt);
  const [T] = createCache(Ft);
  const fixFlexboxGlue = (t, n) => {
    style(r, {
      height: ""
    });
    if (n) {
      const {xt: n, nt: s} = o();
      const {Ot: c, D: l} = t;
      const i = fractionalSize(e);
      const a = clientSize(e);
      const u = style(r, "boxSizing") === "content-box";
      const f = n || u ? s.b + s.t : 0;
      const d = !(g.x && u);
      style(r, {
        height: a.h + i.h + (c.x && d ? l.x : 0) - f
      });
    }
  };
  const getViewportOverflowState = (t, n) => {
    const o = !h && !t ? Nt : 0;
    const getStatePerAxis = (t, s, e) => {
      const c = style(r, t);
      const l = n ? n[t] : c;
      const i = l === "scroll";
      const a = s ? o : e;
      const u = i && !h ? a : 0;
      const f = s && !!o;
      return [ c, i, u, f ];
    };
    const [s, e, c, l] = getStatePerAxis("overflowX", g.x, d.x);
    const [i, a, u, f] = getStatePerAxis("overflowY", g.y, d.y);
    return {
      Tt: {
        x: s,
        y: i
      },
      Ot: {
        x: e,
        y: a
      },
      D: {
        x: c,
        y: u
      },
      R: {
        x: l,
        y: f
      }
    };
  };
  const setViewportOverflowState = (t, n, o, s) => {
    const setAxisOverflowStyle = (t, n) => {
      const o = overflowIsVisible(t);
      const s = n && o && t.replace(`${Yt}-`, "") || "";
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
    const {P: f} = o();
    const d = n ? "marginLeft" : "marginRight";
    const _ = n ? "paddingLeft" : "paddingRight";
    const h = f[d];
    const g = f.marginBottom;
    const v = f[_];
    const p = f.paddingBottom;
    e.width = `calc(100% + ${u + h * -1}px)`;
    e[d] = -u + h;
    e.marginBottom = -a + g;
    if (s) {
      e[_] = v + (i ? u : 0);
      e.paddingBottom = p + (l ? a : 0);
    }
  };
  const [z, E] = v ? v.M(p, _, r, l, o, getViewportOverflowState, hideNativeScrollbars) : [ () => p, () => [ noop ] ];
  return (t, n, l) => {
    const {bt: u, zt: d, yt: v, Ct: p, wt: P, $t: D} = t;
    const {vt: k, St: N} = o();
    const [q, F] = n("showNativeOverlaidScrollbars");
    const [G, X] = n("overflow");
    const U = q && g.x && g.y;
    const W = !i && !_ && (u || v || d || F || P);
    const Z = overflowIsVisible(G.x);
    const J = overflowIsVisible(G.y);
    const K = Z || J;
    let Q = m(l);
    let tt = S(l);
    let nt = x(l);
    let ot = O(l);
    let st;
    if (F && h) {
      a(B, M, !U);
    }
    if (W) {
      st = getViewportOverflowState(U);
      fixFlexboxGlue(st, k);
    }
    if (u || p || v || D || F) {
      if (K) {
        a(V, L, false);
      }
      const [t, n] = E(U, N, st);
      const [o, s] = Q = b(l);
      const [e, c] = tt = y(l);
      const i = clientSize(r);
      let u = e;
      let d = i;
      t();
      if ((c || s || F) && n && !U && z(n, e, o, N)) {
        d = clientSize(r);
        u = scrollSize(r);
      }
      const _ = {
        w: Vt(Bt(e.w, u.w) + o.w),
        h: Vt(Bt(e.h, u.h) + o.h)
      };
      const h = {
        w: Vt((w ? f.innerWidth : d.w + Vt(i.w - e.w)) + o.w),
        h: Vt((w ? f.innerHeight + o.h : d.h + Vt(i.h - e.h)) + o.h)
      };
      ot = C(h);
      nt = $(getOverflowAmount(_, h), l);
    }
    const [et, ct] = ot;
    const [rt, lt] = nt;
    const [it, at] = tt;
    const [ut, ft] = Q;
    const dt = {
      x: rt.w > 0,
      y: rt.h > 0
    };
    const _t = Z && J && (dt.x || dt.y) || Z && dt.x && !dt.y || J && dt.y && !dt.x;
    if (p || D || ft || at || ct || lt || X || F || W) {
      const t = {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        width: "",
        overflowY: "",
        overflowX: ""
      };
      const n = setViewportOverflowState(U, dt, G, t);
      const o = z(n, it, ut, N);
      if (!i) {
        hideNativeScrollbars(n, N, o, t);
      }
      if (W) {
        fixFlexboxGlue(n, k);
      }
      if (i) {
        attr(e, I, t.overflowX);
        attr(e, H, t.overflowY);
      } else {
        style(r, t);
      }
    }
    attrClass(e, A, L, _t);
    attrClass(c, Y, j, _t);
    if (!i) {
      attrClass(r, R, V, K);
    }
    const [ht, gt] = T(getViewportOverflowState(U).Tt);
    s({
      Tt: ht,
      Et: {
        x: et.w,
        y: et.h
      },
      At: {
        x: rt.w,
        y: rt.h
      },
      It: dt
    });
    return {
      Ht: gt,
      Lt: ct,
      Mt: lt
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
  const {J: o, tt: s, gt: e, dt: c} = t;
  const {I: r, H: l, j: i} = getEnvironment();
  const a = !r && (l.x || l.y);
  const u = [ createTrinsicUpdateSegment(t, n), createPaddingUpdateSegment(t, n), createOverflowUpdateSegment(t, n) ];
  return (t, n, r) => {
    const l = prepareUpdateHints(assignDeep({
      bt: false,
      Ct: false,
      $t: false,
      wt: false,
      Lt: false,
      Mt: false,
      Ht: false,
      zt: false,
      yt: false,
      Pt: false
    }, n), {}, r);
    const f = a || !i;
    const d = f && scrollLeft(s);
    const _ = f && scrollTop(s);
    e("", D, true);
    let h = l;
    each(u, (n => {
      h = prepareUpdateHints(h, n(h, t, !!r) || {}, r);
    }));
    scrollLeft(s, d);
    scrollTop(s, _);
    e("", D);
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
  const {Dt: c, Rt: r, kt: l, Bt: a, Vt: u, Yt: f} = s || {};
  const d = debounce((() => e && o(true)), {
    v: 33,
    p: 99
  });
  const [_, h] = createEventContentChange(t, d, l);
  const g = c || [];
  const v = r || [];
  const p = g.concat(v);
  const observerCallback = (e, c) => {
    const r = u || noop;
    const l = f || noop;
    const i = new Set;
    const d = new Set;
    let _ = false;
    let g = false;
    each(e, (o => {
      const {attributeName: e, target: c, type: u, oldValue: f, addedNodes: h, removedNodes: p} = o;
      const w = u === "attributes";
      const b = u === "childList";
      const m = t === c;
      const y = w && isString(e) ? attr(c, e) : 0;
      const S = y !== 0 && f !== y;
      const $ = indexOf(v, e) > -1 && S;
      if (n && (b || !m)) {
        const n = !w;
        const u = w && S;
        const d = u && a && is(c, a);
        const _ = d ? !r(c, e, f, y) : n || u;
        const v = _ && !l(o, !!d, t, s);
        each(h, (t => i.add(t)));
        each(p, (t => i.add(t)));
        g = g || v;
      }
      if (!n && m && S && !r(c, e, f, y)) {
        d.add(e);
        _ = _ || $;
      }
    }));
    if (i.size > 0) {
      h((t => from(i).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
    }
    if (n) {
      !c && g && o(false);
      return [ false ];
    }
    if (d.size > 0 || _) {
      const t = [ from(d), _ ];
      !c && o.apply(0, t);
      return t;
    }
  };
  const w = new i((t => observerCallback(t)));
  w.observe(t, {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: p,
    subtree: n,
    childList: n,
    characterData: n
  });
  e = true;
  return [ () => {
    if (e) {
      _();
      w.disconnect();
      e = false;
    }
  }, () => {
    if (e) {
      d.S();
      const t = w.takeRecords();
      return !isEmptyArray(t) && observerCallback(t, true);
    }
  } ];
};

const Gt = 3333333;

const createSizeObserver = (t, n, o) => {
  const {jt: s, Pt: e} = o || {};
  const c = getPlugins()[Ot];
  const {Y: r} = getEnvironment();
  const l = createDOM(`<div class="${q}"><div class="${G}"></div></div>`);
  const i = l[0];
  const a = i.firstChild;
  const f = directionIsRTL.bind(0, t);
  const [d] = createCache({
    u: false,
    g: true,
    _: (t, n) => !(!t || !domRectHasDimensions(t) && domRectHasDimensions(n))
  });
  const onSizeChangedCallbackProxy = t => {
    const o = isArray(t) && t.length > 0 && isObject(t[0]);
    const e = !o && isBoolean(t[0]);
    let c = false;
    let l = false;
    let a = true;
    if (o) {
      const [n, , o] = d(t.pop().contentRect);
      const s = domRectHasDimensions(n);
      const e = domRectHasDimensions(o);
      const r = !o;
      c = r && !!e || !s;
      l = !e && s;
      a = !c;
    } else if (e) {
      [, a] = t;
    } else {
      l = t === true;
    }
    if (s && a) {
      const n = e ? t[0] : directionIsRTL(i);
      scrollLeft(i, n ? r.n ? -Gt : r.i ? 0 : Gt : Gt);
      scrollTop(i, Gt);
    }
    if (!c) {
      n({
        bt: !e,
        Nt: e ? t : void 0,
        Pt: !!l
      });
    }
  };
  const _ = [];
  return [ () => {
    runEachAndClear(_);
    removeElements(i);
  }, () => {
    let n = e && onSizeChangedCallbackProxy;
    if (u) {
      const t = new u(onSizeChangedCallbackProxy);
      t.observe(a);
      push(_, (() => {
        t.disconnect();
      }));
    } else if (c) {
      const [t, o] = c.T(a, onSizeChangedCallbackProxy, e);
      n = t;
      push(_, o);
    }
    if (s) {
      const [t] = createCache({
        u: void 0
      }, f);
      push(_, on(i, "scroll", (n => {
        const o = t();
        const [s, e, c] = o;
        if (e) {
          removeClass(a, "ltr rtl");
          addClass(a, s ? "rtl" : "ltr");
          onSizeChangedCallbackProxy([ !!s, e, c ]);
        }
        stopPropagation(n);
      })));
    }
    if (n) {
      addClass(i, F);
      push(_, on(i, "animationstart", n, {
        O: !!u
      }));
    }
    if (u || c) {
      appendChildren(t, i);
    }
  } ];
};

const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;

const createTrinsicObserver = (t, n) => {
  let o;
  const s = createDiv(Z);
  const e = [];
  const [c] = createCache({
    u: false
  });
  const triggerOnTrinsicChangedCallback = (t, o) => {
    if (t) {
      const s = c(isHeightIntrinsic(t));
      const [, e] = s;
      return e && !o && n(s) && [ s ];
    }
  };
  const intersectionObserverCallback = (t, n) => t && t.length > 0 && triggerOnTrinsicChangedCallback(t.pop(), n);
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
  }, () => o && intersectionObserverCallback(o.takeRecords(), true) ];
};

const Xt = `[${A}]`;

const Ut = `[${R}]`;

const Wt = [ "tabindex" ];

const Zt = [ "wrap", "cols", "rows" ];

const Jt = [ "id", "class", "style", "open" ];

const createStructureSetupObservers = (t, n, o) => {
  let s;
  let e;
  let c;
  const {K: r, tt: l, ot: i, it: a, dt: f, ht: d, gt: _} = t;
  const {j: h} = getEnvironment();
  const [g] = createCache({
    _: equalWH,
    u: {
      w: 0,
      h: 0
    }
  }, (() => {
    const t = d(V, L);
    const n = d(k, "");
    const o = n && scrollLeft(l);
    const s = n && scrollTop(l);
    _(V, L);
    _(k, "");
    _("", D, true);
    const e = scrollSize(i);
    const c = scrollSize(l);
    const r = fractionalSize(l);
    _(V, L, t);
    _(k, "", n);
    _("", D);
    scrollLeft(l, o);
    scrollTop(l, s);
    return {
      w: c.w + e.w + r.w,
      h: c.h + e.h + r.h
    };
  }));
  const v = a ? Zt : Jt.concat(Zt);
  const p = debounce(o, {
    v: () => s,
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
    each(t || Wt, (t => {
      if (indexOf(Wt, t) > -1) {
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
      wt: c
    };
    n({
      vt: e
    });
    !s && o(r);
    return r;
  };
  const onSizeChanged = ({bt: t, Nt: s, Pt: e}) => {
    const c = !t || e ? o : p;
    let r = false;
    if (s) {
      const [t, o] = s;
      r = o;
      n({
        St: t
      });
    }
    c({
      bt: t,
      Pt: e,
      $t: r
    });
  };
  const onContentMutation = (t, n) => {
    const [, s] = g();
    const e = {
      yt: s
    };
    const c = t ? o : p;
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
      !o && p(s);
    } else if (!f) {
      updateViewportAttrsFromHost(t);
    }
    return s;
  };
  const [w, b, m] = i || !h ? createTrinsicObserver(r, onTrinsicChanged) : [ noop, noop, noop ];
  const [y, S] = !f ? createSizeObserver(r, onSizeChanged, {
    Pt: true,
    jt: true
  }) : [ noop, noop ];
  const [$, x] = createDOMObserver(r, false, onHostMutation, {
    Rt: Jt,
    Dt: Jt.concat(Wt)
  });
  let C;
  const O = f && u && new u((t => {
    const n = t[t.length - 1].contentRect;
    const o = domRectHasDimensions(n);
    const s = domRectHasDimensions(C);
    const e = !s && o;
    onSizeChanged({
      bt: true,
      Pt: e
    });
    C = n;
  }));
  return [ () => {
    w();
    y();
    c && c[0]();
    O && O.disconnect();
    $();
  }, () => {
    O && O.observe(r);
    updateViewportAttrsFromHost();
    S();
    b();
  }, () => {
    const t = {};
    const n = x();
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
    const [d, _] = t("update.debounce");
    const h = u || r;
    const ignoreMutationFromOptions = t => isFunction(n) && n(t);
    if (h) {
      if (c) {
        c[1]();
        c[0]();
      }
      c = createDOMObserver(i || l, true, onContentMutation, {
        Dt: v.concat(o || []),
        kt: a,
        Bt: Xt,
        Yt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !f ? liesBetween(o, Xt, Ut) : false;
          return e || !!closest(o, `.${Q}`) || !!ignoreMutationFromOptions(t);
        }
      });
    }
    if (_) {
      p.S();
      if (isArray(d)) {
        const t = d[0];
        const n = d[1];
        s = isNumber(t) && t;
        e = isNumber(n) && n;
      } else if (isNumber(d)) {
        s = d;
        e = false;
      } else {
        s = false;
        e = false;
      }
    }
  } ];
};

const Kt = {
  x: 0,
  y: 0
};

const createInitialStructureSetupUpdateState = t => ({
  nt: {
    t: 0,
    r: 0,
    b: 0,
    l: 0
  },
  xt: false,
  P: {
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  Et: Kt,
  At: Kt,
  Tt: {
    x: "hidden",
    y: "hidden"
  },
  It: {
    x: false,
    y: false
  },
  vt: false,
  St: directionIsRTL(t.K)
});

const createStructureSetup = (t, n) => {
  const o = createOptionCheck(n, {});
  const [s, e, c] = createEventListenerHub();
  const [r, l, i] = createStructureSetupElements(t);
  const a = createState(createInitialStructureSetupUpdateState(r));
  const [u, f] = a;
  const d = createStructureSetupUpdate(r, a);
  const triggerUpdateEvent = (t, n, o) => {
    const s = keys(t).some((n => !!t[n]));
    const e = s || !isEmptyObject(n) || o;
    if (e) {
      c("u", [ t, n, o ]);
    }
    return e;
  };
  const [_, h, g, v] = createStructureSetupObservers(r, f, (t => triggerUpdateEvent(d(o, t), {}, false)));
  const p = u.bind(0);
  p.qt = t => s("u", t);
  p.Ft = () => {
    const {J: t, tt: n, lt: o, ut: s} = r;
    const e = s ? o.documentElement : t;
    const c = scrollLeft(e);
    const i = scrollTop(e);
    h();
    l();
    scrollLeft(n, c);
    scrollTop(n, i);
  };
  p.Gt = r;
  return [ (t, o) => {
    const s = createOptionCheck(n, t, o);
    v(s);
    return triggerUpdateEvent(d(s, g(), o), t, !!o);
  }, p, () => {
    e();
    _();
    i();
  } ];
};

const {round: Qt} = Math;

const getScale = t => {
  const {width: n, height: o} = getBoundingClientRect(t);
  const {w: s, h: e} = offsetSize(t);
  return {
    x: Qt(n) / s || 1,
    y: Qt(o) / e || 1
  };
};

const continuePointerDown = (t, n, o) => {
  const s = n.scrollbars;
  const {button: e, isPrimary: c, pointerType: r} = t;
  const {pointers: l} = s;
  return e === 0 && c && s[o ? "dragScroll" : "clickScroll"] && (l || []).includes(r);
};

const tn = "pointerup pointerleave pointercancel lostpointercapture";

const createRootClickStopPropagationEvents = (t, n) => on(t, "mousedown", on.bind(0, n, "click", stopPropagation, {
  O: true,
  C: true
}), {
  C: true
});

const createInteractiveScrollEvents = (t, n, o, s, e, c, r) => {
  const {Y: l} = getEnvironment();
  const {Xt: i, Ut: a, Wt: u} = s;
  const f = `scroll${r ? "Left" : "Top"}`;
  const d = `client${r ? "X" : "Y"}`;
  const _ = r ? "width" : "height";
  const h = r ? "left" : "top";
  const g = r ? "w" : "h";
  const v = r ? "x" : "y";
  const createRelativeHandleMove = (t, n) => o => {
    const {At: s} = c();
    const d = offsetSize(a)[g] - offsetSize(i)[g];
    const _ = n * o / d;
    const h = _ * s[v];
    const p = directionIsRTL(u);
    const w = p && r ? l.n || l.i ? 1 : -1 : 1;
    e[f] = t + h * w;
  };
  return on(a, "pointerdown", (s => {
    const c = closest(s.target, `.${et}`) === i;
    const r = c ? i : a;
    attrClass(n, A, P, true);
    if (continuePointerDown(s, t, c)) {
      const t = !c && s.shiftKey;
      const getHandleRect = () => getBoundingClientRect(i);
      const getTrackRect = () => getBoundingClientRect(a);
      const getHandleOffset = (t, n) => (t || getHandleRect())[h] - (n || getTrackRect())[h];
      const l = createRelativeHandleMove(e[f] || 0, 1 / getScale(e)[v]);
      const u = s[d];
      const g = getHandleRect();
      const p = getTrackRect();
      const w = g[_];
      const b = getHandleOffset(g, p) + w / 2;
      const m = u - p[h];
      const y = c ? 0 : m - b;
      const releasePointerCapture = t => {
        runEachAndClear(S);
        r.releasePointerCapture(t.pointerId);
      };
      const S = [ attrClass.bind(0, n, A, P), on(o, tn, releasePointerCapture), on(o, "selectstart", (t => preventDefault(t)), {
        $: false
      }), on(a, tn, releasePointerCapture), on(a, "pointermove", (n => {
        const o = n[d] - u;
        if (c || t) {
          l(y + o);
        }
      })) ];
      if (t) {
        l(y);
      } else if (!c) {
        const t = getPlugins()[Lt];
        if (t) {
          push(S, t.T(l, getHandleOffset, y, w, m));
        }
      }
      r.setPointerCapture(s.pointerId);
    }
  }));
};

const createScrollbarsSetupEvents = (t, n) => (o, s, e, c, r, l, i) => {
  const {Wt: a} = o;
  const [u, f] = selfClearTimeout(333);
  const d = !!r.scrollBy;
  let _ = true;
  return runEachAndClear.bind(0, [ on(a, "pointerenter", (() => {
    s(it, true);
  })), on(a, "pointerleave pointercancel", (() => {
    s(it);
  })), on(a, "wheel", (t => {
    const {deltaX: n, deltaY: o, deltaMode: e} = t;
    if (d && _ && e === 0 && parent(a) === c) {
      r.scrollBy({
        left: n,
        top: o,
        behavior: "smooth"
      });
    }
    _ = false;
    s(dt, true);
    u((() => {
      _ = true;
      s(dt);
    }));
    preventDefault(t);
  }), {
    $: false,
    C: true
  }), createRootClickStopPropagationEvents(a, e), createInteractiveScrollEvents(t, c, e, o, r, n, i), f ]);
};

const {min: nn, max: sn, round: en} = Math;

const getScrollbarHandleLengthRatio = (t, n, o, s) => {
  if (s) {
    const t = o ? "x" : "y";
    const {At: n, Et: e} = s;
    const c = e[t];
    const r = n[t];
    return sn(0, nn(1, c / (c + r)));
  }
  const e = o ? "width" : "height";
  const c = getBoundingClientRect(t)[e];
  const r = getBoundingClientRect(n)[e];
  return sn(0, nn(1, c / r));
};

const getScrollbarHandleOffsetRatio = (t, n, o, s, e, c) => {
  const {Y: r} = getEnvironment();
  const l = c ? "x" : "y";
  const i = c ? "Left" : "Top";
  const {At: a} = s;
  const u = en(a[l]);
  const f = nn(u, sn(0, o[`scroll${i}`]));
  const d = c && e;
  const _ = r.i ? f : u - f;
  const h = d ? _ : f;
  const g = nn(1, h / u);
  const v = getScrollbarHandleLengthRatio(t, n, c);
  return 1 / v * (1 - v) * g;
};

const animateElement = (t, n, o, s) => n && t.animate(o, {
  timeline: n,
  composite: s
});

const getScrollbarHandleAnimationKeyFrames = (t, n) => ({
  transform: [ getTrasformTranslateValue(`0%`, n), getTrasformTranslateValue(n && t ? "100%" : "-100%", n) ],
  [n ? t ? "right" : "left" : "top"]: [ "0%", "100%" ]
});

const maxScrollbarOffsetFrameValue = t => `${Math.max(0, t - .5)}px`;

const animateScrollbarOffset = (t, n, o, s) => animateElement(t, n, {
  transform: [ getTrasformTranslateValue(`0px`, s), getTrasformTranslateValue(maxScrollbarOffsetFrameValue(o), s) ]
}, "add");

const initScrollTimeline = (t, n) => _ ? new _({
  source: t,
  axis: n
}) : null;

const createScrollbarsSetupElements = (t, n, o) => {
  const {F: s, L: e} = getEnvironment();
  const {scrollbars: c} = s();
  const {slot: r} = c;
  const {lt: l, J: i, K: a, tt: u, ft: f, et: d, ut: _, dt: g} = n;
  const {scrollbars: v} = f ? {} : t;
  const {slot: p} = v || {};
  const w = new Map;
  const b = initScrollTimeline(d, "x");
  const m = initScrollTimeline(d, "y");
  const y = dynamicInitializationElement([ i, a, u ], (() => g && _ ? i : a), r, p);
  const doRefreshScrollbarOffset = t => g && !_ && parent(t) === u;
  const cancelElementAnimations = t => {
    w.forEach(((n, o) => {
      const s = t ? indexOf(isArray(t) ? t : [ t ], o) > -1 : true;
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
      s(t.Wt, n);
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
      const {Xt: s, Ut: e} = t;
      return [ s, {
        [o ? "width" : "height"]: `${(getScrollbarHandleLengthRatio(s, e, o, n) * 100).toFixed(3)}%`
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n, o) => {
    if (!m && !m) {
      scrollbarStyle(t, (t => {
        const {Xt: s, Ut: e, Wt: c} = t;
        const r = getScrollbarHandleOffsetRatio(s, e, d, n, directionIsRTL(c), o);
        const l = r === r;
        return [ s, {
          transform: l ? getTrasformTranslateValue(`${(r * 100).toFixed(3)}%`, o) : ""
        } ];
      }));
    }
  };
  const styleScrollbarPosition = t => {
    const {Wt: n} = t;
    const o = doRefreshScrollbarOffset(n) && n;
    return [ o, {
      transform: o ? getTrasformTranslateValue([ `${scrollLeft(d)}px`, `${scrollTop(d)}px` ]) : ""
    } ];
  };
  const S = [];
  const $ = [];
  const x = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass($, t, n);
    c && scrollbarStructureAddRemoveClass(x, t, n);
  };
  const refreshScrollbarsHandleLength = t => {
    scrollbarStructureRefreshHandleLength($, t, true);
    scrollbarStructureRefreshHandleLength(x, t);
  };
  const refreshScrollbarsHandleOffset = t => {
    scrollbarStructureRefreshHandleOffset($, t, true);
    scrollbarStructureRefreshHandleOffset(x, t);
  };
  const refreshScrollbarsHandleOffsetTimeline = () => {
    const forEachFn = (t, {Wt: n, Xt: o}) => {
      cancelElementAnimations(o);
      w.set(o, [ animateElement(o, t ? b : m, getScrollbarHandleAnimationKeyFrames(t && directionIsRTL(n), t)) ]);
    };
    $.forEach(forEachFn.bind(0, true));
    x.forEach(forEachFn.bind(0, false));
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (!m && !m) {
      g && scrollbarStyle($, styleScrollbarPosition);
      g && scrollbarStyle(x, styleScrollbarPosition);
    }
  };
  const refreshScrollbarsScrollbarOffsetTimeline = ({At: t}) => {
    x.concat($).forEach((({Wt: n}) => {
      cancelElementAnimations(n);
      if (doRefreshScrollbarOffset(n)) {
        w.set(n, [ animateScrollbarOffset(n, b, t.x, true), animateScrollbarOffset(n, m, t.y) ]);
      }
    }));
  };
  const generateScrollbarDOM = t => {
    const n = t ? nt : ot;
    const s = t ? $ : x;
    const c = isEmptyArray(s) ? lt : "";
    const r = createDiv(`${Q} ${n} ${c}`);
    const i = createDiv(st);
    const u = createDiv(et);
    const f = {
      Wt: r,
      Ut: i,
      Xt: u
    };
    if (!e) {
      addClass(r, J);
    }
    appendChildren(r, i);
    appendChildren(i, u);
    push(s, f);
    push(S, [ removeElements.bind(0, r), cancelElementAnimations, o(f, scrollbarsAddRemoveClass, l, a, d, t ? b : m, t) ]);
    return f;
  };
  const C = generateScrollbarDOM.bind(0, true);
  const O = generateScrollbarDOM.bind(0, false);
  const appendElements = () => {
    appendChildren(y, $[0].Wt);
    appendChildren(y, x[0].Wt);
    h((() => {
      scrollbarsAddRemoveClass(lt);
    }), 300);
  };
  C();
  O();
  return [ {
    Zt: refreshScrollbarsHandleLength,
    Jt: refreshScrollbarsHandleOffset,
    Kt: refreshScrollbarsHandleOffsetTimeline,
    Qt: refreshScrollbarsScrollbarOffsetTimeline,
    tn: refreshScrollbarsScrollbarOffset,
    nn: scrollbarsAddRemoveClass,
    sn: {
      V: b,
      en: $,
      cn: C,
      rn: scrollbarStyle.bind(0, $)
    },
    ln: {
      V: m,
      en: x,
      cn: O,
      rn: scrollbarStyle.bind(0, x)
    }
  }, appendElements, runEachAndClear.bind(0, S) ];
};

const isHoverablePointerType = t => t.pointerType === "mouse";

const createScrollbarsSetup = (t, n, o, s) => {
  let e;
  let c;
  let r;
  let l;
  let i;
  let a = noop;
  let u = 0;
  const f = createState({});
  const [d] = f;
  const [_, h] = selfClearTimeout();
  const [g, v] = selfClearTimeout();
  const [p, w] = selfClearTimeout(100);
  const [b, m] = selfClearTimeout(100);
  const [y, S] = selfClearTimeout(100);
  const [$, x] = selfClearTimeout((() => u));
  const [C, O, T] = createScrollbarsSetupElements(t, o.Gt, createScrollbarsSetupEvents(n, o));
  const {K: z, ct: E, ut: A} = o.Gt;
  const {nn: I, Zt: H, Jt: L, Kt: M, Qt: P, tn: D} = C;
  const manageAutoHideSuspension = t => {
    I(ut, t, true);
    I(ut, t, false);
  };
  const manageScrollbarsAutoHide = (t, n) => {
    x();
    if (t) {
      I(ft);
    } else {
      const hide = () => I(ft, true);
      if (u > 0 && !n) {
        $(hide);
      } else {
        hide();
      }
    }
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      l = c;
      l && manageScrollbarsAutoHide(true);
    }
  };
  const R = [ w, x, m, S, v, h, T, on(z, "pointerover", onHostMouseEnter, {
    O: true
  }), on(z, "pointerenter", onHostMouseEnter), on(z, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      l = false;
      c && manageScrollbarsAutoHide(false);
    }
  })), on(z, "pointermove", (t => {
    isHoverablePointerType(t) && e && _((() => {
      w();
      manageScrollbarsAutoHide(true);
      b((() => {
        e && manageScrollbarsAutoHide(false);
      }));
    }));
  })), on(E, "scroll", (t => {
    g((() => {
      L(o());
      r && manageScrollbarsAutoHide(true);
      p((() => {
        r && !l && manageScrollbarsAutoHide(false);
      }));
    }));
    s(t);
    D();
  })) ];
  const k = d.bind(0);
  k.Gt = C;
  k.Ft = O;
  return [ (t, s, l) => {
    const {Lt: f, Mt: d, Ht: _, $t: h, Pt: g} = l;
    const {H: v} = getEnvironment();
    const p = createOptionCheck(n, t, s);
    const w = o();
    const {At: b, Tt: m, St: S, It: $} = w;
    const [x, C] = p("showNativeOverlaidScrollbars");
    const [O, T] = p("scrollbars.theme");
    const [z, R] = p("scrollbars.visibility");
    const [k, B] = p("scrollbars.autoHide");
    const [V, Y] = p("scrollbars.autoHideSuspend");
    const [j] = p("scrollbars.autoHideDelay");
    const [N, q] = p("scrollbars.dragScroll");
    const [F, G] = p("scrollbars.clickScroll");
    const X = g && !s;
    const U = $.x || $.y;
    const W = f || d || h;
    const Z = _ || R;
    const J = x && v.x && v.y;
    const setScrollbarVisibility = (t, n) => {
      const o = z === "visible" || z === "auto" && t === "scroll";
      I(ct, o, n);
      return o;
    };
    u = j;
    if (X) {
      if (V && U) {
        manageAutoHideSuspension(false);
        a();
        y((() => {
          a = on(E, "scroll", manageAutoHideSuspension.bind(0, true), {
            O: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if (C) {
      I(K, J);
    }
    if (T) {
      I(i);
      I(O, true);
      i = O;
    }
    if (Y && !V) {
      manageAutoHideSuspension(true);
    }
    if (B) {
      e = k === "move";
      c = k === "leave";
      r = k !== "never";
      manageScrollbarsAutoHide(!r, true);
    }
    if (q) {
      I(ht, N);
    }
    if (G) {
      I(_t, F);
    }
    if (Z) {
      const t = setScrollbarVisibility(m.x, true);
      const n = setScrollbarVisibility(m.y, false);
      const o = t && n;
      I(rt, !o);
    }
    if (W) {
      H(w);
      L(w);
      M(w);
      P(w);
      D();
      I(at, !b.x, true);
      I(at, !b.y, false);
      I(tt, S && !A);
    }
  }, k, () => {
    runEachAndClear(R);
    a();
  } ];
};

const invokePluginInstance = (t, n, o) => {
  if (isFunction(t)) {
    t(n || void 0, o || void 0);
  }
};

const OverlayScrollbars = (t, n, o) => {
  const {X: s, F: e, N: c, q: r} = getEnvironment();
  const l = getPlugins();
  const i = isHTMLElement(t);
  const a = i ? t : t.target;
  const u = getInstance(a);
  if (n && !u) {
    let u = false;
    const validateOptions = t => {
      const n = getPlugins()[$t];
      const o = n && n.T;
      return o ? o(t, true) : t;
    };
    const f = assignDeep({}, s(), validateOptions(n));
    const [d, _, h] = createEventListenerHub(o);
    const [g, v, p] = createStructureSetup(t, f);
    const [w, b, m] = createScrollbarsSetup(t, f, v, (t => h("scroll", [ x, t ])));
    const update = (t, n) => g(t, !!n);
    const y = update.bind(0, {}, true);
    const S = c(y);
    const $ = r(y);
    const destroy = t => {
      removeInstance(a);
      S();
      $();
      m();
      p();
      u = true;
      h("destroyed", [ x, !!t ]);
      _();
    };
    const x = {
      options(t, n) {
        if (t) {
          const o = n ? s() : {};
          const e = getOptionsDiff(f, assignDeep(o, validateOptions(t)));
          if (!isEmptyObject(e)) {
            assignDeep(f, e);
            update(e);
          }
        }
        return assignDeep({}, f);
      },
      on: d,
      off: (t, n) => {
        t && n && _(t, n);
      },
      state() {
        const {Et: t, At: n, Tt: o, It: s, nt: e, xt: c, St: r} = v();
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
        const {J: t, K: n, nt: o, tt: s, ot: e, et: c, ct: r} = v.Gt;
        const {sn: l, ln: i} = b.Gt;
        const translateScrollbarStructure = t => {
          const {Xt: n, Ut: o, Wt: s} = t;
          return {
            scrollbar: s,
            track: o,
            handle: n
          };
        };
        const translateScrollbarsSetupElement = t => {
          const {en: n, cn: o} = t;
          const s = translateScrollbarStructure(n[0]);
          return assignDeep({}, s, {
            clone: () => {
              const t = translateScrollbarStructure(o());
              w({}, true, {});
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
    v.qt(((t, n, o) => {
      w(n, o, t);
    }));
    addInstance(a, x);
    each(keys(l), (t => invokePluginInstance(l[t], 0, x)));
    if (cancelInitialization(v.Gt.ut, e().cancel, !i && t.cancel)) {
      destroy(true);
      return x;
    }
    v.Ft();
    b.Ft();
    h("initialized", [ x ]);
    v.qt(((t, n, o) => {
      const {bt: s, $t: e, wt: c, Lt: r, Mt: l, Ht: i, yt: a, zt: u} = t;
      h("updated", [ x, {
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
    x.update(true);
    return x;
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
  const {B: t, H: n, I: o, Y: s, j: e, L: c, V: r, W: l, Z: i, F: a, G: u, X: f, U: d} = getEnvironment();
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
    setDefaultOptions: d
  });
};

exports.ClickScrollPlugin = Mt;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = Ht;

exports.SizeObserverPlugin = Tt;
//# sourceMappingURL=overlayscrollbars.cjs.map
