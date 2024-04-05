/*!
 * OverlayScrollbars
 * Version: 2.7.1
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

const t = typeof window !== "undefined" && typeof document !== "undefined";

const n = t ? window : {};

const o = Math.max;

const s = Math.min;

const e = Math.round;

const c = Math.abs;

const r = n.cancelAnimationFrame;

const l = n.requestAnimationFrame;

const i = n.setTimeout;

const a = n.clearTimeout;

const getApi = t => typeof n[t] !== "undefined" ? n[t] : void 0;

const u = getApi("MutationObserver");

const d = getApi("IntersectionObserver");

const f = getApi("ResizeObserver");

const _ = getApi("ScrollTimeline");

const v = t && Node.ELEMENT_NODE;

const {toString: p, hasOwnProperty: h} = Object.prototype;

const g = /^\[object (.+)\]$/;

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : p.call(t).replace(g, "$1").toLowerCase();

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
  const c = h.call(t, o);
  const r = e && h.call(e, "isPrototypeOf");
  if (s && !c && !r) {
    return false;
  }
  for (n in t) {}
  return isUndefined(n) || h.call(t, n);
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
  let i = 0;
  const a = animationCurrentTime();
  const u = o(0, s);
  const frame = s => {
    const r = animationCurrentTime();
    const d = r - a;
    const f = d >= u;
    const _ = s ? 1 : 1 - (o(0, a + u - r) / u || 0);
    const v = (n - t) * (isFunction(c) ? c(_, _ * u, 0, 1, u) : _) + t;
    const p = f || _ === 1;
    e && e(v, _, p);
    i = p ? 0 : l((() => frame()));
  };
  frame();
  return t => {
    r(i);
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

const S = "paddingBottom";

const m = "marginLeft";

const $ = "marginRight";

const O = "marginBottom";

const x = "overflowX";

const C = "overflowY";

const H = "width";

const z = "height";

const I = "hidden";

const E = "visible";

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
  const o = t ? i : l;
  const s = t ? a : r;
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
  const {v: u, p: d, S: f} = n || {};
  const _ = function invokeFunctionToDebounce(n) {
    c();
    a(o);
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
    const n = isFunction(u) ? u() : u;
    const f = isNumber(n) && n >= 0;
    if (f) {
      const u = isFunction(d) ? d() : d;
      const f = isNumber(u) && u >= 0;
      const v = n > 0 ? i : l;
      const p = n > 0 ? a : r;
      const h = mergeParms(t);
      const g = h || t;
      const b = _.bind(0, g);
      c();
      const w = v(b, n);
      c = () => p(w);
      if (f && !o) {
        o = i(flush, u);
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

const capNumber = (t, n, e) => o(t, s(n, e));

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
    $: t => s(domTokenListOperation(t, "delete")),
    O: t => s(domTokenListOperation(t, "add")),
    C: t => {
      const n = getDomTokensArray(t);
      return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
    }
  };
};

const removeAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).$(o);
};

const addAttrClass = (t, n, o) => {
  domTokenListAttr(t, n).O(o);
  return bind(removeAttrClass, t, n, o);
};

const addRemoveAttrClass = (t, n, o, s) => {
  (s ? addAttrClass : removeAttrClass)(t, n, o);
};

const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).C(o);

const createDomTokenListClass = t => domTokenListAttr(t, "class");

const removeClass = (t, n) => {
  createDomTokenListClass(t).$(n);
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

const A = /^--/;

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
      if (A.test(o)) {
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
    c = e ? getCSSVal(r, o) : o.reduce(((t, n) => {
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

const T = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : T;

const windowSize = t => getElmWidthHeightProperty("inner", t || n);

const D = bind(getElmWidthHeightProperty, "offset");

const k = bind(getElmWidthHeightProperty, "client");

const R = bind(getElmWidthHeightProperty, "scroll");

const fractionalSize = t => {
  const n = parseFloat(getStyles(t, H)) || 0;
  const o = parseFloat(getStyles(t, z)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const domRectHasDimensions = t => !!(t && (t[z] || t[H]));

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

const M = {
  x: 0,
  y: 0
};

const absoluteCoordinates = t => {
  const o = t && getBoundingClientRect(t);
  return o ? {
    x: o.left + n.scrollX,
    y: o.top + n.scrollY
  } : M;
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

const B = `${L}-initialize`;

const N = L;

const j = `${N}-overflow-x`;

const F = `${N}-overflow-y`;

const q = "overflowVisible";

const W = "scrollbarPressed";

const X = "updating";

const Y = "body";

const J = `${L}-viewport`;

const K = "arrange";

const Z = "scrollbarHidden";

const G = q;

const Q = `${L}-padding`;

const tt = G;

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

const ft = `${ut}-horizontal`;

const _t = `${ut}-vertical`;

const vt = `${ut}-track`;

const pt = `${ut}-handle`;

const ht = `${ut}-visible`;

const gt = `${ut}-cornerless`;

const bt = `${ut}-interaction`;

const wt = `${ut}-unusable`;

const yt = `${ut}-auto-hide`;

const St = `${yt}-hidden`;

const mt = `${ut}-wheel`;

const $t = `${vt}-interactive`;

const Ot = `${pt}-interactive`;

const xt = {};

const Ct = {};

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
    return (i || Ct)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => Ct[t];

const Ht = "__osOptionsValidationPlugin";

const zt = "__osSizeObserverPlugin";

const It = /* @__PURE__ */ (() => ({
  [zt]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${rt}" dir="ltr"><div class="${rt}"><div class="${lt}"></div></div><div class="${rt}"><div class="${lt}" style="width: 200%; height: 200%"></div></div></div>`);
      const i = c[0];
      const a = i.lastChild;
      const u = i.firstChild;
      const d = u == null ? void 0 : u.firstChild;
      let f = D(i);
      let _ = f;
      let v = false;
      let p;
      const reset = () => {
        scrollElementTo(u, s);
        scrollElementTo(a, s);
      };
      const onResized = t => {
        p = 0;
        if (v) {
          f = _;
          n(t === true);
        }
      };
      const onScroll = t => {
        _ = D(i);
        v = !t || !equalWH(_, f);
        if (t) {
          stopPropagation(t);
          if (v && !p) {
            r(p);
            p = l(onResized);
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
        [z]: s
      });
      l(reset);
      return [ o ? bind(onScroll, false) : reset, h ];
    }
  }
}))();

const getShowNativeOverlaidScrollbars = (t, n) => {
  const {T: o} = n;
  const [s, e] = t("showNativeOverlaidScrollbars");
  return [ s && o.x && o.y, e ];
};

const overflowIsVisible = t => t.indexOf(E) === 0;

const getViewportOverflowState = (t, n) => {
  const {D: o} = t;
  const getStatePerAxis = t => {
    const s = getStyles(o, t);
    const e = n ? n[t] : s;
    const c = e === "scroll";
    return [ s, c ];
  };
  const [s, e] = getStatePerAxis(x);
  const [c, r] = getStatePerAxis(C);
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
    const c = n && o && t.replace(`${E}-`, "") || s;
    return [ n && !o ? t : "", overflowIsVisible(c) ? "hidden" : c ];
  };
  const [c, r] = setAxisOverflowStyle(o.x, n.x);
  const [l, i] = setAxisOverflowStyle(o.y, n.y);
  s[x] = r && l ? r : c;
  s[C] = i && c ? i : l;
  return getViewportOverflowState(t, s);
};

const Et = "__osScrollbarsHidingPlugin";

const At = /* @__PURE__ */ (() => ({
  [Et]: {
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
            [O]: 0,
            [m]: 0
          });
          if (!c) {
            const {U: c, B: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {j: d} = n;
            const f = o ? m : $;
            const _ = o ? y : w;
            const v = d[f];
            const p = d[O];
            const h = d[_];
            const g = d[S];
            e[H] = `calc(100% + ${u + v * -1}px)`;
            e[f] = -u + v;
            e[O] = -a + p;
            if (s) {
              e[_] = h + (i ? u : 0);
              e[S] = g + (l ? a : 0);
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
            const v = _ ? w : y;
            const p = c[v];
            const h = c.paddingTop;
            const g = s.w + e.w;
            const b = s.h + e.h;
            const S = {
              w: f && u ? `${f + g - p}px` : "",
              h: d && a ? `${d + b - h}px` : ""
            };
            setStyles(r, {
              "--os-vaw": S.w,
              "--os-vah": S.h
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
              assignProps([ O, b, S ]);
            }
            if (a) {
              assignProps([ m, $, y, w ]);
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
        let o = 0;
        const getWindowDPR = () => {
          const t = n.screen;
          const o = t.deviceXDPI || 0;
          const s = t.logicalXDPI || 1;
          return n.devicePixelRatio || o / s;
        };
        const diffBiggerThanOne = (t, n) => {
          const o = c(t);
          const s = c(n);
          return !(o === s || o + 1 === s || o - 1 === s);
        };
        return (n, s) => {
          const r = windowSize();
          const l = {
            w: r.w - t.w,
            h: r.h - t.h
          };
          if (l.w === 0 && l.h === 0) {
            return;
          }
          const i = {
            w: c(l.w),
            h: c(l.h)
          };
          const a = {
            w: c(e(r.w / (t.w / 100))),
            h: c(e(r.h / (t.h / 100)))
          };
          const u = getWindowDPR();
          const d = i.w > 2 && i.h > 2;
          const f = !diffBiggerThanOne(a.w, a.h);
          const _ = u !== o && u > 0;
          const v = d && f && _;
          let p;
          let h;
          if (v) {
            [h, p] = s();
            assignDeep(n.P, h);
          }
          t = r;
          o = u;
          return p;
        };
      }
    })
  }
}))();

const Tt = "__osClickScrollPlugin";

const Dt = /* @__PURE__ */ (() => ({
  [Tt]: {
    static: () => (t, n, o, s, e) => {
      let c = 0;
      let r = noop;
      const animateClickScroll = l => {
        r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, a) => {
          t(o);
          const u = n();
          const d = u + s;
          const f = e >= u && e <= d;
          if (a && !f) {
            if (c) {
              animateClickScroll(o);
            } else {
              const t = i((() => {
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

let kt;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o, s) => {
    appendChildren(t, n);
    const e = k(n);
    const c = D(n);
    const r = fractionalSize(o);
    s && removeElements(n);
    return {
      x: c.h - e.h + r.h,
      y: c.w - e.w + r.w
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
  const getRtlScrollBehavior = (t, n) => {
    setStyles(t, {
      [x]: I,
      [C]: I,
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
  const o = `.${P}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${P} div{width:200%;height:200%;margin:10px 0}.${U}{scrollbar-width:none!important}.${U}::-webkit-scrollbar,.${U}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`;
  const s = createDOM(`<div class="${P}"><div></div><style>${o}</style></div>`);
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
  const p = assignDeep({}, V);
  const h = bind(assignDeep, {}, p);
  const g = bind(assignDeep, {}, v);
  const b = {
    P: u,
    T: f,
    L: d,
    J: !!_,
    K: getRtlScrollBehavior(e, c),
    Z: bind(r, "r"),
    G: g,
    tt: t => assignDeep(v, t) && g(),
    nt: h,
    ot: t => assignDeep(p, t) && h(),
    st: assignDeep({}, v),
    et: assignDeep({}, p)
  };
  removeAttrs(e, "style");
  removeElements(e);
  n.addEventListener("resize", (() => {
    let t;
    if (!d && (!f.x || !f.y)) {
      const n = getStaticPluginModuleInstance(Et);
      const o = n ? n.Y() : noop;
      t = !!o(b, i);
    }
    l("r", [ t ]);
  }));
  return b;
};

const getEnvironment = () => {
  if (!kt) {
    kt = createEnvironment();
  }
  return kt;
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
  const {T: e, L: c, G: r} = getEnvironment();
  const {nativeScrollbarsOverlaid: l, body: i} = r().cancel;
  const a = o != null ? o : l;
  const u = isUndefined(s) ? i : s;
  const d = (e.x || e.y) && a;
  const f = t && (isNull(u) ? !c : u);
  return !!d || !!f;
};

const Rt = new WeakMap;

const addInstance = (t, n) => {
  Rt.set(t, n);
};

const removeInstance = t => {
  Rt.delete(t);
};

const getInstance = t => Rt.get(t);

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
  const {ct: c, rt: r, lt: l, it: i, ut: a, dt: d} = s || {};
  const f = debounce((() => e && o(true)), {
    v: 33,
    p: 99
  });
  const [_, v] = createEventContentChange(t, f, l);
  const p = c || [];
  const h = r || [];
  const g = concat(p, h);
  const observerCallback = (e, c) => {
    if (!isEmptyArray(c)) {
      const r = a || noop;
      const l = d || noop;
      const u = [];
      const f = [];
      let _ = false;
      let p = false;
      each(c, (o => {
        const {attributeName: e, target: c, type: a, oldValue: d, addedNodes: v, removedNodes: g} = o;
        const b = a === "attributes";
        const w = a === "childList";
        const y = t === c;
        const S = b && e;
        const m = S && getAttr(c, e || "") || null;
        const $ = S && d !== m;
        const O = inArray(h, e) && $;
        if (n && (w || !y)) {
          const n = b && $;
          const a = n && i && is(c, i);
          const f = a ? !r(c, e, d, m) : !b || n;
          const _ = f && !l(o, !!a, t, s);
          each(v, (t => push(u, t)));
          each(g, (t => push(u, t)));
          p = p || _;
        }
        if (!n && y && $ && !r(c, e, d, m)) {
          push(f, e);
          _ = _ || O;
        }
      }));
      v((t => deduplicateArray(u).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
      if (n) {
        !e && p && o(false);
        return [ false ];
      }
      if (!isEmptyArray(f) || _) {
        const t = [ deduplicateArray(f), _ ];
        !e && o.apply(0, t);
        return t;
      }
    }
  };
  const b = new u(bind(observerCallback, false));
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
  const r = getStaticPluginModuleInstance(zt);
  const {K: l} = getEnvironment();
  const i = bind(getDirectionIsRTL, t);
  const [a] = createCache({
    o: false,
    _: true
  });
  return () => {
    const o = [];
    const u = createDOM(`<div class="${ot}"><div class="${et}"></div></div>`);
    const d = u[0];
    const _ = d.firstChild;
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
    if (f) {
      const t = new f((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(_);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (r) {
      const [t, n] = r(_, onSizeChangedCallbackProxy, c);
      push(o, concat([ addClass(d, st), addEventListener(d, "animationstart", t) ], n));
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
          removeClass(_, "ltr rtl");
          addClass(_, s ? "rtl" : "ltr");
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
        const t = D(s);
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
  const d = `[${N}]`;
  const _ = `[${J}]`;
  const v = [ "tabindex" ];
  const p = [ "wrap", "cols", "rows" ];
  const h = [ "id", "class", "style", "open" ];
  const {gt: g, bt: b, D: w, wt: y, yt: S, V: m, St: $, $t: O} = t;
  const x = {
    Ot: false,
    N: getDirectionIsRTL(g)
  };
  const C = getEnvironment();
  const H = getStaticPluginModuleInstance(Et);
  const [z] = createCache({
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = H && H.M(t, n, x, C, o).W;
    const e = $(G);
    const c = !m && $(K);
    const r = c && getElmentScroll(w);
    O(G);
    m && O(X, true);
    const l = c && s && s()[0];
    const i = R(y);
    const a = R(w);
    const u = fractionalSize(w);
    O(G, e);
    m && O(X);
    l && l();
    scrollElementTo(w, r);
    return {
      w: a.w + i.w + u.w,
      h: a.h + i.h + u.h
    };
  }));
  const I = S ? p : concat(h, p);
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
        xt: a !== n
      });
      assignDeep(x, {
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
      Ct: e
    };
    assignDeep(x, {
      Ot: o
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
      xt: l
    };
    setDirectionWhenViewportIsTarget(i);
    n && assignDeep(x, {
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
  const {Z: A} = C;
  const [T, D] = y ? createTrinsicObserver(b, onTrinsicChanged) : [];
  const k = !m && createSizeObserver(b, onSizeChanged, {
    _t: true,
    ft: true
  });
  const [M, V] = createDOMObserver(b, false, onHostMutation, {
    rt: h,
    ct: concat(h, v)
  });
  const L = m && f && new f((t => {
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
    const o = M();
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
    const [f, v] = t("update.elementEvents");
    const [p, h] = t("update.debounce");
    const g = v || u;
    const b = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (g) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(y || w, true, onContentMutation, {
        ct: concat(I, a || []),
        lt: f,
        it: d,
        dt: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !m ? liesBetween(o, d, _) : false;
          return e || !!closest(o, `.${ut}`) || !!ignoreMutationFromOptions(t);
        }
      });
      l = t();
      r = n;
    }
    if (h) {
      E.m();
      if (isArray(p)) {
        const t = p[0];
        const n = p[1];
        e = isNumber(t) && t;
        c = isNumber(n) && n;
      } else if (isNumber(p)) {
        e = p;
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
  }, x ];
};

const createScrollbarsSetupElements = (t, n, o, s) => {
  const {G: e, K: c} = getEnvironment();
  const {scrollbars: r} = e();
  const {slot: l} = r;
  const {gt: i, bt: a, D: u, Dt: d, kt: f, Rt: v, V: p} = n;
  const {scrollbars: h} = d ? {} : t;
  const {slot: g} = h || {};
  const b = new Map;
  const initScrollTimeline = t => _ && new _({
    source: f,
    axis: t
  });
  const w = initScrollTimeline("x");
  const y = initScrollTimeline("y");
  const S = dynamicInitializationElement([ i, a, u ], (() => p && v ? i : a), l, g);
  const getScrollbarHandleLengthRatio = (t, n) => {
    if (n) {
      const o = t ? H : z;
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
        [n ? H : z]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
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
  const doRefreshScrollbarOffset = t => p && !v && parent(t) === u;
  const m = [];
  const $ = [];
  const O = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass($, t, n);
    c && scrollbarStructureAddRemoveClass(O, t, n);
  };
  const refreshScrollbarsHandleLength = () => {
    scrollbarStructureRefreshHandleLength($, true);
    scrollbarStructureRefreshHandleLength(O);
  };
  const refreshScrollbarsHandleOffset = () => {
    scrollbarStructureRefreshHandleOffset($, true);
    scrollbarStructureRefreshHandleOffset(O);
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (p) {
      const {Lt: t} = o;
      const n = .5;
      if (w && y) {
        each(concat(O, $), (({Ut: o}) => {
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
        scrollbarStyle($, styleScrollbarPosition);
        scrollbarStyle(O, styleScrollbarPosition);
      }
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? ft : _t;
    const o = createDiv(`${ut} ${n}`);
    const e = createDiv(vt);
    const c = createDiv(pt);
    const r = {
      Ut: o,
      Mt: e,
      Vt: c
    };
    push(t ? $ : O, r);
    push(m, [ appendChildren(o, e), appendChildren(e, c), bind(removeElements, o), cancelElementAnimations, s(r, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
    return r;
  };
  const x = bind(generateScrollbarDOM, true);
  const C = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(S, $[0].Ut);
    appendChildren(S, O[0].Ut);
    return bind(runEachAndClear, m);
  };
  x();
  C();
  return [ {
    Bt: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    jt: refreshScrollbarsScrollbarOffset,
    Ft: scrollbarsAddRemoveClass,
    qt: {
      J: w,
      Wt: $,
      Xt: x,
      Yt: bind(scrollbarStyle, $)
    },
    Jt: {
      J: y,
      Wt: O,
      Xt: C,
      Yt: bind(scrollbarStyle, O)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => {
  const {bt: c, D: r, V: l, kt: a, Kt: u} = n;
  return (n, d, f, _) => {
    const {Ut: v, Mt: p, Vt: h} = n;
    const [g, b] = selfClearTimeout(333);
    const [w, y] = selfClearTimeout();
    const S = bind(f, [ n ], _);
    const m = !!a.scrollBy;
    const $ = `client${_ ? "X" : "Y"}`;
    const O = _ ? H : z;
    const x = _ ? "left" : "top";
    const C = _ ? "w" : "h";
    const I = _ ? "x" : "y";
    const isAffectingTransition = t => t.propertyName.indexOf(O) > -1;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {Lt: e} = o;
        const c = D(p)[C] - D(h)[C];
        const r = n * s / c;
        const l = r * e[I];
        scrollElementTo(a, {
          [I]: t + l
        });
      };
      return addEventListener(p, "pointerdown", (o => {
        const s = closest(o.target, `.${pt}`) === h;
        const r = s ? h : p;
        const l = t.scrollbars;
        const {button: i, isPrimary: d, pointerType: f} = o;
        const {pointers: _} = l;
        const v = i === 0 && d && l[s ? "dragScroll" : "clickScroll"] && (_ || []).includes(f);
        if (v) {
          const t = !s && o.shiftKey;
          const l = bind(getBoundingClientRect, h);
          const i = bind(getBoundingClientRect, p);
          const getHandleOffset = (t, n) => (t || l())[x] - (n || i())[x];
          const d = e(getBoundingClientRect(a)[O]) / D(a)[C] || 1;
          const f = createRelativeHandleMove(getElmentScroll(a)[I] || 0, 1 / d);
          const _ = o[$];
          const v = l();
          const g = i();
          const b = v[O];
          const w = getHandleOffset(v, g) + b / 2;
          const y = _ - g[x];
          const S = s ? 0 : y - w;
          const releasePointerCapture = t => {
            runEachAndClear(H);
            r.releasePointerCapture(t.pointerId);
          };
          const m = addAttrClass(c, N, W);
          const H = [ m, addEventListener(u, n, releasePointerCapture), addEventListener(u, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(p, n, releasePointerCapture), addEventListener(p, "pointermove", (n => {
            const o = n[$] - _;
            if (s || t) {
              f(S + o);
            }
          })) ];
          r.setPointerCapture(o.pointerId);
          if (t) {
            f(S);
          } else if (!s) {
            const t = getStaticPluginModuleInstance(Tt);
            t && push(H, t(f, getHandleOffset, S, b, y));
          }
        }
      }));
    };
    let E = true;
    return bind(runEachAndClear, [ addEventListener(h, "pointermove pointerleave", s), addEventListener(v, "pointerenter", (() => {
      d(bt, true);
    })), addEventListener(v, "pointerleave pointercancel", (() => {
      d(bt, false);
    })), !l && addEventListener(v, "mousedown", (() => {
      const t = getFocusedElement();
      if (hasAttr(t, J) || hasAttr(t, N) || t === document.body) {
        i((() => {
          r.focus();
        }), 25);
      }
    })), addEventListener(v, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (m && E && s === 0 && parent(v) === c) {
        a.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      E = false;
      d(mt, true);
      g((() => {
        E = true;
        d(mt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(h, "transitionstart", (t => {
      if (isAffectingTransition(t)) {
        const animateHandleOffset = () => {
          S();
          w(animateHandleOffset);
        };
        animateHandleOffset();
      }
    })), addEventListener(h, "transitionend transitioncancel", (t => {
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
  const [p, h] = selfClearTimeout(100);
  const [g, b] = selfClearTimeout(100);
  const [w, y] = selfClearTimeout((() => f));
  const [S, m] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
  const {bt: $, Zt: O, Rt: x} = e;
  const {Ft: C, Bt: H, Nt: z, jt: I} = S;
  const manageScrollbarsAutoHide = (t, n) => {
    y();
    if (t) {
      C(St);
    } else {
      const t = bind(C, St, true);
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
      p((() => {
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
  const E = [ y, h, b, v, () => d(), addEventListener($, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      r = false;
      i && manageScrollbarsAutoHide(false);
    }
  })), addEventListener($, "pointermove", (t => {
    isHoverablePointerType(t) && l && manageScrollbarsAutoHideInstantInteraction();
  })), addEventListener(O, "scroll", (t => {
    _((() => {
      z();
      manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    I();
  })) ];
  return [ () => bind(runEachAndClear, push(E, m())), ({Et: t, Tt: n, Gt: e, Qt: c}) => {
    const {tn: r, nn: _, sn: v} = c || {};
    const {xt: p, _t: h} = e || {};
    const {N: b} = o;
    const {T: w} = getEnvironment();
    const {k: y, en: S} = s;
    const [m, $] = t("showNativeOverlaidScrollbars");
    const [E, A] = t("scrollbars.theme");
    const [T, D] = t("scrollbars.visibility");
    const [k, R] = t("scrollbars.autoHide");
    const [M, V] = t("scrollbars.autoHideSuspend");
    const [L] = t("scrollbars.autoHideDelay");
    const [P, U] = t("scrollbars.dragScroll");
    const [B, N] = t("scrollbars.clickScroll");
    const [j, F] = t("overflow");
    const q = h && !n;
    const W = S.x || S.y;
    const X = r || _ || p || n;
    const Y = v || D || F;
    const J = m && w.x && w.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes("scroll") && (T === "visible" || T === "auto" && n === "scroll");
      C(ht, s, o);
      return s;
    };
    f = L;
    if (q) {
      if (M && W) {
        manageAutoHideSuspension(false);
        d();
        g((() => {
          d = addEventListener(O, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if ($) {
      C(at, J);
    }
    if (A) {
      C(u);
      C(E, true);
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
      C(Ot, P);
    }
    if (N) {
      C($t, B);
    }
    if (Y) {
      const t = setScrollbarVisibility(j.x, y.x, true);
      const n = setScrollbarVisibility(j.y, y.y, false);
      const o = t && n;
      C(gt, !o);
    }
    if (X) {
      H();
      z();
      I();
      C(wt, !S.x, true);
      C(wt, !S.y, false);
      C(dt, b && !x);
    }
  }, {}, S ];
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {G: o, L: s} = n;
  const {elements: e} = o();
  const {host: c, padding: r, viewport: l, content: i} = e;
  const a = isHTMLElement(t);
  const u = a ? {} : t;
  const {elements: d} = u;
  const {host: f, padding: _, viewport: v, content: p} = d || {};
  const h = a ? t : u.target;
  const g = isBodyElement(h);
  const b = is(h, "textarea");
  const w = h.ownerDocument;
  const y = w.documentElement;
  const S = w.defaultView;
  const focusElm = t => {
    if (t && t.focus) {
      t.focus();
    }
  };
  const m = bind(staticInitializationElement, [ h ]);
  const $ = bind(dynamicInitializationElement, [ h ]);
  const O = bind(createDiv, "");
  const x = bind(m, O, l);
  const C = bind($, O, i);
  const H = x(v);
  const z = H === h;
  const I = z && g;
  const E = !z && C(p);
  const A = !z && H === E;
  const T = I ? y : H;
  const D = b ? m(O, c, f) : h;
  const k = I ? T : D;
  const R = !z && $(O, r, _);
  const M = !A && E;
  const V = [ M, T, R, k ].map((t => isHTMLElement(t) && !parent(t) && t));
  const elementIsGenerated = t => t && inArray(V, t);
  const L = elementIsGenerated(T) ? h : T;
  const P = {
    gt: h,
    bt: k,
    D: T,
    cn: R,
    wt: M,
    kt: I ? y : T,
    Zt: I ? w : T,
    rn: g ? y : L,
    ln: S,
    Kt: w,
    yt: b,
    Rt: g,
    Dt: a,
    V: z,
    St: t => hasAttrClass(T, z ? N : J, t),
    $t: (t, n) => addRemoveAttrClass(T, z ? N : J, t, n)
  };
  const {gt: U, bt: q, cn: W, D: X, wt: K} = P;
  const G = [ () => {
    removeAttrs(q, [ N, B ]);
    removeAttrs(U, B);
    if (g) {
      removeAttrs(y, [ B, N ]);
    }
  } ];
  const tt = b && elementIsGenerated(q);
  let ot = b ? U : contents([ K, X, W, q, U ].find((t => t && !elementIsGenerated(t))));
  const st = I ? U : K || X;
  const et = bind(runEachAndClear, G);
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
    setAttrs(q, N, z ? "viewport" : "host");
    setAttrs(W, Q, "");
    setAttrs(K, nt, "");
    if (!z) {
      setAttrs(X, J, "");
      setAttrs(X, n, o || "-1");
      g && addAttrClass(y, N, Y);
    }
    if (tt) {
      insertAfter(U, q);
      push(G, (() => {
        insertAfter(q, U);
        removeElements(q);
      }));
    }
    appendChildren(st, ot);
    appendChildren(q, W);
    appendChildren(W || q, !z && X);
    appendChildren(X, K);
    push(G, [ e, () => {
      const t = getFocusedElement();
      const s = prepareWrapUnwrapFocus(t);
      removeAttrs(W, Q);
      removeAttrs(K, nt);
      removeAttrs(X, [ j, F, J ]);
      o ? setAttrs(X, n, o) : removeAttrs(X, n);
      elementIsGenerated(K) && unwrap(K);
      elementIsGenerated(X) && unwrap(X);
      elementIsGenerated(W) && unwrap(W);
      focusElm(t);
      s();
    } ]);
    if (s && !z) {
      addAttrClass(X, J, Z);
      push(G, bind(removeAttrs, X, J));
    }
    focusElm(!z && S.top === S && t === h ? X : t);
    e();
    ot = 0;
    return et;
  };
  return [ P, appendElements, et ];
};

const createTrinsicUpdateSegment = ({wt: t}) => ({Gt: n, an: o, Tt: s}) => {
  const {Ct: e} = n || {};
  const {Ot: c} = o;
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
  return ({Et: t, Gt: l, an: i, Tt: a}) => {
    let [u, d] = r(a);
    const {L: f} = getEnvironment();
    const {ht: _, Ht: v, xt: p} = l || {};
    const {N: h} = i;
    const [g, x] = t("paddingAbsolute");
    const C = a || v;
    if (_ || d || C) {
      [u, d] = c(a);
    }
    const z = !s && (x || p || d);
    if (z) {
      const t = !g || !n && !f;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [$]: t && !h ? -s : 0,
        [O]: t ? -c : 0,
        [m]: t && h ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? h ? -u.r : "auto" : 0,
        left: t ? h ? "auto" : -u.l : 0,
        [H]: t && `calc(100% + ${s}px)`
      };
      const l = {
        [b]: t ? u.t : 0,
        [w]: t ? u.r : 0,
        [S]: t ? u.b : 0,
        [y]: t ? u.l : 0
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
      dn: z
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {bt: c, cn: r, D: l, V: i, $t: a, Rt: u, ln: d} = t;
  const {L: f} = e;
  const _ = u && i;
  const v = bind(o, 0);
  const p = {
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const h = {
    u: equalXY,
    o: {
      x: I,
      y: I
    }
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
  const [g, b] = createCache(p, bind(fractionalSize, l));
  const [w, y] = createCache(p, bind(R, l));
  const [S, m] = createCache(p);
  const [$, O] = createCache(p);
  const [H] = createCache(h);
  const z = getStaticPluginModuleInstance(Et);
  return ({Et: n, Gt: u, an: p, Tt: h}, {dn: I}) => {
    const {ht: E, Ht: A, xt: T, It: D} = u || {};
    const R = z && z.M(t, s, p, e, n);
    const {q: M, W: V, X: L} = R || {};
    const [P, U] = getShowNativeOverlaidScrollbars(n, e);
    const [B, W] = n("overflow");
    const X = E || I || A || T || D || U;
    const Y = overflowIsVisible(B.x);
    const K = overflowIsVisible(B.y);
    const nt = Y || K;
    let ot = b(h);
    let st = y(h);
    let et = m(h);
    let ct = O(h);
    let rt;
    if (U && f) {
      a(Z, !P);
    }
    if (X) {
      if (nt) {
        a(G, false);
      }
      const [t, n] = V ? V(rt) : [];
      const [s, e] = ot = g(h);
      const [c, r] = st = w(h);
      const i = k(l);
      const u = c;
      const f = i;
      t && t();
      if ((r || e || U) && n && !P && M && M(n, c, s)) {}
      const p = windowSize(d);
      const b = {
        w: v(o(c.w, u.w) + s.w),
        h: v(o(c.h, u.h) + s.h)
      };
      const y = {
        w: v((_ ? p.w : f.w + v(i.w - c.w)) + s.w),
        h: v((_ ? p.h : f.h + v(i.h - c.h)) + s.h)
      };
      ct = $(y);
      et = S(getOverflowAmount(b, y), h);
    }
    const [lt, it] = ct;
    const [at, ut] = et;
    const [dt, ft] = st;
    const [_t, vt] = ot;
    const pt = {
      x: at.w > 0,
      y: at.h > 0
    };
    const ht = Y && K && (pt.x || pt.y) || Y && pt.x && !pt.y || K && pt.y && !pt.x;
    const gt = I || T || D || vt || ft || it || ut || W || U || X;
    if (gt) {
      const n = {};
      const o = setViewportOverflowState(t, pt, B, n);
      L && L(o, p, !!M && M(o, dt, _t), n);
      if (i) {
        setAttrs(c, j, n[x]);
        setAttrs(c, F, n[C]);
      } else {
        setStyles(l, n);
      }
    }
    addRemoveAttrClass(c, N, q, ht);
    addRemoveAttrClass(r, Q, tt, ht);
    if (!i) {
      addRemoveAttrClass(l, J, G, nt);
    }
    const [bt, wt] = H(getViewportOverflowState(t).k);
    assignDeep(s, {
      k: bt,
      Pt: {
        x: lt.w,
        y: lt.h
      },
      Lt: {
        x: at.w,
        y: at.h
      },
      en: pt
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
      [O]: 0,
      [m]: 0,
      [b]: 0,
      [w]: 0,
      [S]: 0,
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
      x: I,
      y: I
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
    const e = l ? addAttrClass(r, N, X) : noop;
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
  const [_, v, , p] = createScrollbarsSetup(t, n, f, l, i, s);
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
    const p = s || d(assignDeep({}, _, {
      At: l
    }));
    const h = r(assignDeep({}, _, {
      an: f,
      Gt: p
    }));
    v(assignDeep({}, _, {
      Gt: p,
      Qt: h
    }));
    const g = updateHintsAreTruthy(p);
    const b = updateHintsAreTruthy(h);
    const w = g || b || !isEmptyObject(a) || u;
    w && o(t, {
      Gt: p,
      Qt: h
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
    pn: l
  }), {
    hn: i,
    gn: p
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
      const o = getStaticPluginModuleInstance(Ht);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, d, f] = createEventListenerHub();
    const [_, v, p] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      p(t, n);
      f(t, n);
    };
    const [h, g, b, w, y] = createSetups(t, a, (({fn: t, Tt: n}, {Gt: o, Qt: s}) => {
      const {ht: e, xt: c, Ct: r, Ht: l, zt: i, _t: a} = o;
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
        const {vn: t, pn: n} = b();
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
        const {gt: t, bt: n, cn: o, D: s, wt: e, kt: c, Zt: r} = w.hn;
        const {qt: l, Jt: i} = w.gn;
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
    if (cancelInitialization(w.hn.Rt, !e && t.cancel)) {
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
  const {P: t, T: n, L: o, K: s, J: e, st: c, et: r, G: l, tt: i, nt: a, ot: u} = getEnvironment();
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

exports.ClickScrollPlugin = Dt;

exports.OverlayScrollbars = OverlayScrollbars;

exports.ScrollbarsHidingPlugin = At;

exports.SizeObserverPlugin = It;
//# sourceMappingURL=overlayscrollbars.cjs.js.map
