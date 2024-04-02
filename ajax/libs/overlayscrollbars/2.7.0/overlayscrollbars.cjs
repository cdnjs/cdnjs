/*!
 * OverlayScrollbars
 * Version: 2.7.0
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

const f = getApi("IntersectionObserver");

const d = getApi("ResizeObserver");

const _ = getApi("ScrollTimeline");

const v = t && Node.ELEMENT_NODE;

const {toString: h, hasOwnProperty: p} = Object.prototype;

const g = /^\[object (.+)\]$/;

const isUndefined = t => t === void 0;

const isNull = t => t === null;

const type = t => isUndefined(t) || isNull(t) ? `${t}` : h.call(t).replace(g, "$1").toLowerCase();

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
  const c = p.call(t, o);
  const r = e && p.call(e, "isPrototypeOf");
  if (s && !c && !r) {
    return false;
  }
  for (n in t) {}
  return isUndefined(n) || p.call(t, n);
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
    const f = r - a;
    const d = f >= u;
    const _ = s ? 1 : 1 - (o(0, a + u - r) / u || 0);
    const v = (n - t) * (isFunction(c) ? c(_, _ * u, 0, 1, u) : _) + t;
    const h = d || _ === 1;
    e && e(v, _, h);
    i = h ? 0 : l((() => frame()));
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

const S = "paddingLeft";

const y = "paddingBottom";

const m = "marginLeft";

const O = "marginRight";

const $ = "marginBottom";

const C = "overflowX";

const x = "overflowY";

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
  const {v: u, p: f, S: d} = n || {};
  const _ = function invokeFunctionToDebounce(n) {
    c();
    a(o);
    o = s = void 0;
    c = noop;
    t.apply(this, n);
  };
  const mergeParms = t => d && s ? d(s, t) : t;
  const flush = () => {
    if (c !== noop) {
      _(mergeParms(e) || e);
    }
  };
  const v = function debouncedFn() {
    const t = from(arguments);
    const n = isFunction(u) ? u() : u;
    const d = isNumber(n) && n >= 0;
    if (d) {
      const u = isFunction(f) ? f() : f;
      const d = isNumber(u) && u >= 0;
      const v = n > 0 ? i : l;
      const h = n > 0 ? a : r;
      const p = mergeParms(t);
      const g = p || t;
      const b = _.bind(0, g);
      c();
      const w = v(b, n);
      c = () => h(w);
      if (d && !o) {
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

const ft = `${ut}-rtl`;

const dt = `${ut}-horizontal`;

const _t = `${ut}-vertical`;

const vt = `${ut}-track`;

const ht = `${ut}-handle`;

const pt = `${ut}-visible`;

const gt = `${ut}-cornerless`;

const bt = `${ut}-interaction`;

const wt = `${ut}-unusable`;

const St = `${ut}-auto-hide`;

const yt = `${St}-hidden`;

const mt = `${ut}-wheel`;

const Ot = `${vt}-interactive`;

const $t = `${ht}-interactive`;

const Ct = {};

const xt = {};

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
    return (i || xt)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => xt[t];

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
      const f = u == null ? void 0 : u.firstChild;
      let d = D(i);
      let _ = d;
      let v = false;
      let h;
      const reset = () => {
        scrollElementTo(u, s);
        scrollElementTo(a, s);
      };
      const onResized = t => {
        h = 0;
        if (v) {
          d = _;
          n(t === true);
        }
      };
      const onScroll = t => {
        _ = D(i);
        v = !t || !equalWH(_, d);
        if (t) {
          stopPropagation(t);
          if (v && !h) {
            r(h);
            h = l(onResized);
          }
        } else {
          onResized(t === false);
        }
        reset();
      };
      const p = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(a, e, onScroll) ];
      addClass(t, ct);
      setStyles(f, {
        [H]: s,
        [z]: s
      });
      l(reset);
      return [ o ? bind(onScroll, false) : reset, p ];
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
  const [s, e] = getStatePerAxis(C);
  const [c, r] = getStatePerAxis(x);
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
  s[C] = r && l ? r : c;
  s[x] = i && c ? i : l;
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
        const [f] = getShowNativeOverlaidScrollbars(e, s);
        const _getViewportOverflowHideOffset = t => {
          const {R: n} = t;
          const o = l || f ? 0 : 42;
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
            [O]: 0,
            [$]: 0,
            [m]: 0
          });
          if (!c) {
            const {U: c, B: r} = _getViewportOverflowHideOffset(t);
            const {x: l, y: i} = r;
            const {x: a, y: u} = c;
            const {j: f} = n;
            const d = o ? m : O;
            const _ = o ? S : w;
            const v = f[d];
            const h = f[$];
            const p = f[_];
            const g = f[y];
            e[H] = `calc(100% + ${u + v * -1}px)`;
            e[d] = -u + v;
            e[$] = -a + h;
            if (s) {
              e[_] = p + (i ? u : 0);
              e[y] = g + (l ? a : 0);
            }
          }
        };
        const _arrangeViewport = (t, s, e) => {
          if (u) {
            const {j: c} = n;
            const {U: l, B: i} = _getViewportOverflowHideOffset(t);
            const {x: a, y: u} = i;
            const {x: f, y: d} = l;
            const {N: _} = o;
            const v = _ ? w : S;
            const h = c[v];
            const p = c.paddingTop;
            const g = s.w + e.w;
            const b = s.h + e.h;
            const y = {
              w: d && u ? `${d + g - h}px` : "",
              h: f && a ? `${f + b - p}px` : ""
            };
            setStyles(r, {
              "--os-vaw": y.w,
              "--os-vah": y.h
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
            const f = {};
            const assignProps = t => each(t, (t => {
              f[t] = c[t];
            }));
            if (i) {
              assignProps([ $, b, y ]);
            }
            if (a) {
              assignProps([ m, O, S, w ]);
            }
            const d = getStyles(r, keys(f));
            removeAttrClass(r, J, K);
            setStyles(r, f);
            return [ () => {
              _hideNativeScrollbars(e, o, u, d);
              setStyles(r, d);
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
          const f = i.w > 2 && i.h > 2;
          const d = !diffBiggerThanOne(a.w, a.h);
          const _ = u !== o && u > 0;
          const v = f && d && _;
          let h;
          let p;
          if (v) {
            [p, h] = s();
            assignDeep(n.P, p);
          }
          t = r;
          o = u;
          return h;
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
          const f = u + s;
          const d = e >= u && e <= f;
          if (a && !d) {
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
      [C]: I,
      [x]: I,
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
  const o = createDOM(`<div class="${P}"><div></div></div>`);
  const s = o[0];
  const e = s.firstChild;
  const [c, , r] = createEventListenerHub();
  const [l, i] = createCache({
    o: getNativeScrollbarSize(t, s, e),
    u: equalXY
  }, bind(getNativeScrollbarSize, t, s, e, true));
  const [a] = i();
  const u = getNativeScrollbarsHiding(s);
  const f = {
    x: a.x === 0,
    y: a.y === 0
  };
  const d = {
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
  const v = assignDeep({}, V);
  const h = bind(assignDeep, {}, v);
  const p = bind(assignDeep, {}, d);
  const g = {
    P: a,
    T: f,
    L: u,
    J: !!_,
    K: getRtlScrollBehavior(s, e),
    Z: bind(c, "r"),
    G: p,
    tt: t => assignDeep(d, t) && p(),
    nt: h,
    ot: t => assignDeep(v, t) && h(),
    st: assignDeep({}, d),
    et: assignDeep({}, v)
  };
  removeAttrs(s, "style");
  removeElements(s);
  n.addEventListener("resize", (() => {
    let t;
    if (!u && (!f.x || !f.y)) {
      const n = getStaticPluginModuleInstance(Et);
      const o = n ? n.Y() : noop;
      t = !!o(g, l);
    }
    r("r", [ t ]);
  }));
  return g;
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
  const f = (e.x || e.y) && a;
  const d = t && (isNull(u) ? !c : u);
  return !!f || !!d;
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
  const {ct: c, rt: r, lt: l, it: i, ut: a, ft: f} = s || {};
  const d = debounce((() => e && o(true)), {
    v: 33,
    p: 99
  });
  const [_, v] = createEventContentChange(t, d, l);
  const h = c || [];
  const p = r || [];
  const g = concat(h, p);
  const observerCallback = (e, c) => {
    if (!isEmptyArray(c)) {
      const r = a || noop;
      const l = f || noop;
      const u = [];
      const d = [];
      let _ = false;
      let h = false;
      each(c, (o => {
        const {attributeName: e, target: c, type: a, oldValue: f, addedNodes: v, removedNodes: g} = o;
        const b = a === "attributes";
        const w = a === "childList";
        const S = t === c;
        const y = b && e;
        const m = y && getAttr(c, e || "") || null;
        const O = y && f !== m;
        const $ = inArray(p, e) && O;
        if (n && (w || !S)) {
          const n = b && O;
          const a = n && i && is(c, i);
          const d = a ? !r(c, e, f, m) : !b || n;
          const _ = d && !l(o, !!a, t, s);
          each(v, (t => push(u, t)));
          each(g, (t => push(u, t)));
          h = h || _;
        }
        if (!n && S && O && !r(c, e, f, m)) {
          push(d, e);
          _ = _ || $;
        }
      }));
      v((t => deduplicateArray(u).reduce(((n, o) => {
        push(n, find(t, o));
        return is(o, t) ? push(n, o) : n;
      }), [])));
      if (n) {
        !e && h && o(false);
        return [ false ];
      }
      if (!isEmptyArray(d) || _) {
        const t = [ deduplicateArray(d), _ ];
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
      d.m();
      return observerCallback(true, b.takeRecords());
    }
  } ];
};

const createSizeObserver = (t, n, o) => {
  const s = 3333333;
  const {dt: e, _t: c} = o || {};
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
    if (d) {
      const t = new d((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(_);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (r) {
      const [t, n] = r(_, onSizeChangedCallbackProxy, c);
      push(o, concat([ addClass(f, st), addEventListener(f, "animationstart", t) ], n));
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
  const f = `[${N}]`;
  const _ = `[${J}]`;
  const v = [ "tabindex" ];
  const h = [ "wrap", "cols", "rows" ];
  const p = [ "id", "class", "style", "open" ];
  const {gt: g, bt: b, D: w, wt: S, St: y, V: m, yt: O, Ot: $} = t;
  const C = {
    $t: false,
    N: getDirectionIsRTL(g)
  };
  const x = getEnvironment();
  const H = getStaticPluginModuleInstance(Et);
  const [z] = createCache({
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = H && H.M(t, n, C, x, o).W;
    const e = O(G);
    const c = !m && O(K);
    const r = c && getElmentScroll(w);
    $(G);
    m && $(X, true);
    const l = c && s && s()[0];
    const i = R(S);
    const a = R(w);
    const u = fractionalSize(w);
    $(G, e);
    m && $(X);
    l && l();
    scrollElementTo(w, r);
    return {
      w: a.w + i.w + u.w,
      h: a.h + i.h + u.h
    };
  }));
  const I = y ? h : concat(p, h);
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
  const {Z: A} = x;
  const [T, D] = S ? createTrinsicObserver(b, onTrinsicChanged) : [];
  const k = !m && createSizeObserver(b, onSizeChanged, {
    _t: true,
    dt: true
  });
  const [M, V] = createDOMObserver(b, false, onHostMutation, {
    rt: p,
    ct: concat(p, v)
  });
  const L = m && d && new d((t => {
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
    const [d, v] = t("update.elementEvents");
    const [h, p] = t("update.debounce");
    const g = v || u;
    const b = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (g) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(S || w, true, onContentMutation, {
        ct: concat(I, a || []),
        lt: d,
        it: f,
        ft: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !m ? liesBetween(o, f, _) : false;
          return e || !!closest(o, `.${ut}`) || !!ignoreMutationFromOptions(t);
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
  const {G: e, K: c} = getEnvironment();
  const {scrollbars: r} = e();
  const {slot: l} = r;
  const {gt: i, bt: a, D: u, Dt: f, kt: d, Rt: v, V: h} = n;
  const {scrollbars: p} = f ? {} : t;
  const {slot: g} = p || {};
  const b = new Map;
  const initScrollTimeline = t => _ && new _({
    source: d,
    axis: t
  });
  const w = initScrollTimeline("x");
  const S = initScrollTimeline("y");
  const y = dynamicInitializationElement([ i, a, u ], (() => h && v ? i : a), l, g);
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
    if (w && S) {
      each(t, (t => {
        const {Ut: o, Vt: s} = t;
        const r = n && getDirectionIsRTL(o) && c;
        setElementAnimation(s, n ? w : S, addDirectionRTLKeyframes({
          transform: getRawScrollBounds(e, r).map((n => getTransformValue(t, n, r)))
        }, r));
      }));
    } else {
      const o = getElmentScroll(d);
      scrollbarStyle(t, (t => {
        const {Vt: s, Ut: e} = t;
        return [ s, {
          transform: getTransformValue(t, n ? o.x : o.y, n && getDirectionIsRTL(e) && c)
        } ];
      }));
    }
  };
  const doRefreshScrollbarOffset = t => h && !v && parent(t) === u;
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
      if (w && S) {
        each(concat($, O), (({Ut: o}) => {
          if (doRefreshScrollbarOffset(o)) {
            const setScrollbarElementAnimation = (t, s, e) => {
              const r = e && getDirectionIsRTL(o) && c;
              setElementAnimation(o, t, addDirectionRTLKeyframes({
                transform: getRawScrollBounds(s - n, r).map((t => getTrasformTranslateValue(numberToCssPx(t), e)))
              }, r), "add");
            };
            setScrollbarElementAnimation(w, t.x, true);
            setScrollbarElementAnimation(S, t.y);
          } else {
            cancelElementAnimations(o);
          }
        }));
      } else {
        const n = getElmentScroll(d);
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
    const n = t ? dt : _t;
    const o = createDiv(`${ut} ${n}`);
    const e = createDiv(vt);
    const c = createDiv(ht);
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
    appendChildren(y, O[0].Ut);
    appendChildren(y, $[0].Ut);
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
      J: w,
      Wt: O,
      Xt: C,
      Yt: bind(scrollbarStyle, O)
    },
    Jt: {
      J: S,
      Wt: $,
      Xt: x,
      Yt: bind(scrollbarStyle, $)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o, s) => {
  const {bt: c, kt: r, Kt: l} = n;
  return (n, i, a, u) => {
    const {Ut: f, Mt: d, Vt: _} = n;
    const [v, h] = selfClearTimeout(333);
    const [p, g] = selfClearTimeout();
    const b = bind(a, [ n ], u);
    const w = !!r.scrollBy;
    const S = `client${u ? "X" : "Y"}`;
    const y = u ? H : z;
    const m = u ? "left" : "top";
    const O = u ? "w" : "h";
    const $ = u ? "x" : "y";
    const isAffectingTransition = t => t.propertyName.indexOf(y) > -1;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {Lt: e} = o;
        const c = D(d)[O] - D(_)[O];
        const l = n * s / c;
        const i = l * e[$];
        scrollElementTo(r, {
          [$]: t + i
        });
      };
      return addEventListener(d, "pointerdown", (o => {
        const s = closest(o.target, `.${ht}`) === _;
        const i = s ? _ : d;
        const a = t.scrollbars;
        const {button: u, isPrimary: f, pointerType: v} = o;
        const {pointers: h} = a;
        const p = u === 0 && f && a[s ? "dragScroll" : "clickScroll"] && (h || []).includes(v);
        if (p) {
          const t = !s && o.shiftKey;
          const a = bind(getBoundingClientRect, _);
          const u = bind(getBoundingClientRect, d);
          const getHandleOffset = (t, n) => (t || a())[m] - (n || u())[m];
          const f = e(getBoundingClientRect(r)[y]) / D(r)[O] || 1;
          const v = createRelativeHandleMove(getElmentScroll(r)[$] || 0, 1 / f);
          const h = o[S];
          const p = a();
          const g = u();
          const b = p[y];
          const w = getHandleOffset(p, g) + b / 2;
          const C = h - g[m];
          const x = s ? 0 : C - w;
          const releasePointerCapture = t => {
            runEachAndClear(z);
            i.releasePointerCapture(t.pointerId);
          };
          const H = addAttrClass(c, N, W);
          const z = [ H, addEventListener(l, n, releasePointerCapture), addEventListener(l, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(d, n, releasePointerCapture), addEventListener(d, "pointermove", (n => {
            const o = n[S] - h;
            if (s || t) {
              v(x + o);
            }
          })) ];
          i.setPointerCapture(o.pointerId);
          if (t) {
            v(x);
          } else if (!s) {
            const t = getStaticPluginModuleInstance(Tt);
            t && push(z, t(v, getHandleOffset, x, b, C));
          }
        }
      }));
    };
    let C = true;
    return bind(runEachAndClear, [ addEventListener(f, "pointerenter", (() => {
      i(bt, true);
    })), addEventListener(f, "pointerleave pointercancel", (() => {
      i(bt, false);
    })), addEventListener(f, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (w && C && s === 0 && parent(f) === c) {
        r.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      C = false;
      i(mt, true);
      v((() => {
        C = true;
        i(mt);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
    }), addEventListener(_, "pointermove pointerleave", s), addEventListener(_, "transitionstart", (t => {
      if (isAffectingTransition(t)) {
        const animateHandleOffset = () => {
          b();
          p(animateHandleOffset);
        };
        animateHandleOffset();
      }
    })), addEventListener(_, "transitionend transitioncancel", (t => {
      if (isAffectingTransition(t)) {
        g();
        b();
      }
    })), addEventListener(f, "mousedown", bind(addEventListener, l, "click", stopPropagation, {
      A: true,
      I: true
    }), {
      I: true
    }), createInteractiveScrollEvents(), h, g ]);
  };
};

const createScrollbarsSetup = (t, n, o, s, e, c) => {
  let r;
  let l;
  let i;
  let a;
  let u = noop;
  let f = 0;
  const getAutoHideIsScrollOrMove = () => !i && !l;
  const isHoverablePointerType = t => t.pointerType === "mouse";
  const [d, _] = selfClearTimeout();
  const [v, h] = selfClearTimeout(100);
  const [p, g] = selfClearTimeout(100);
  const [b, w] = selfClearTimeout((() => f));
  const [S, y] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s, (t => isHoverablePointerType(t) && getAutoHideIsScrollOrMove() && manageScrollbarsAutoHideInstantInteraction())));
  const {bt: m, Zt: O, Rt: $} = e;
  const {Ft: C, Bt: x, Nt: H, jt: z} = S;
  const manageScrollbarsAutoHide = (t, n) => {
    w();
    if (t) {
      C(yt);
    } else {
      const t = bind(C, yt, true);
      if (f > 0 && !n) {
        b(t);
      } else {
        t();
      }
    }
  };
  const manageScrollbarsAutoHideInstantInteraction = () => {
    manageScrollbarsAutoHide(true);
    v((() => {
      manageScrollbarsAutoHide(false);
    }));
  };
  const manageAutoHideSuspension = t => {
    C(St, t, true);
    C(St, t, false);
  };
  const onHostMouseEnter = t => {
    if (isHoverablePointerType(t)) {
      l && manageScrollbarsAutoHide(true);
    }
  };
  const I = [ w, h, g, _, () => u(), addEventListener(m, "pointerover", onHostMouseEnter, {
    A: true
  }), addEventListener(m, "pointerenter", onHostMouseEnter), addEventListener(m, "pointerleave", (t => {
    if (isHoverablePointerType(t)) {
      l && manageScrollbarsAutoHide(false);
    }
  })), addEventListener(m, "pointermove", (t => {
    isHoverablePointerType(t) && r && manageScrollbarsAutoHideInstantInteraction();
  })), addEventListener(O, "scroll", (t => {
    d((() => {
      H();
      getAutoHideIsScrollOrMove() && manageScrollbarsAutoHideInstantInteraction();
    }));
    c(t);
    z();
  })) ];
  return [ () => bind(runEachAndClear, push(I, y())), ({Et: t, Tt: n, Gt: e, Qt: c}) => {
    const {tn: d, nn: _, sn: v} = c || {};
    const {Ct: h, _t: g} = e || {};
    const {N: b} = o;
    const {T: w} = getEnvironment();
    const {k: S, en: y} = s;
    const [m, I] = t("showNativeOverlaidScrollbars");
    const [E, A] = t("scrollbars.theme");
    const [T, D] = t("scrollbars.visibility");
    const [k, R] = t("scrollbars.autoHide");
    const [M, V] = t("scrollbars.autoHideSuspend");
    const [L] = t("scrollbars.autoHideDelay");
    const [P, U] = t("scrollbars.dragScroll");
    const [B, N] = t("scrollbars.clickScroll");
    const [j, F] = t("overflow");
    const q = g && !n;
    const W = y.x || y.y;
    const X = d || _ || h || n;
    const Y = v || D || F;
    const J = m && w.x && w.y;
    const setScrollbarVisibility = (t, n, o) => {
      const s = t.includes("scroll") && (T === "visible" || T === "auto" && n === "scroll");
      C(pt, s, o);
      return s;
    };
    f = L;
    if (q) {
      if (M && W) {
        manageAutoHideSuspension(false);
        u();
        p((() => {
          u = addEventListener(O, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if (I) {
      C(at, J);
    }
    if (A) {
      C(a);
      C(E, true);
      a = E;
    }
    if (V && !M) {
      manageAutoHideSuspension(true);
    }
    if (R) {
      r = k === "move";
      l = k === "leave";
      i = k === "never";
      manageScrollbarsAutoHide(i, true);
    }
    if (U) {
      C($t, P);
    }
    if (N) {
      C(Ot, B);
    }
    if (Y) {
      const t = setScrollbarVisibility(j.x, S.x, true);
      const n = setScrollbarVisibility(j.y, S.y, false);
      const o = t && n;
      C(gt, !o);
    }
    if (X) {
      x();
      H();
      z();
      C(wt, !y.x, true);
      C(wt, !y.y, false);
      C(ft, b && !$);
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
  const {elements: f} = u;
  const {host: d, padding: _, viewport: v, content: h} = f || {};
  const p = a ? t : u.target;
  const g = isBodyElement(p);
  const b = is(p, "textarea");
  const w = p.ownerDocument;
  const S = w.documentElement;
  const y = w.defaultView;
  const getFocusedElement = () => w.activeElement;
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
  const T = I ? S : H;
  const D = b ? m($, c, d) : p;
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
    kt: I ? S : T,
    Zt: I ? w : T,
    rn: g ? S : L,
    ln: y,
    Kt: w,
    St: b,
    Rt: g,
    Dt: a,
    V: z,
    yt: t => hasAttrClass(T, z ? N : J, t),
    Ot: (t, n) => addRemoveAttrClass(T, z ? N : J, t, n)
  };
  const {gt: U, bt: q, cn: W, D: X, wt: K} = P;
  const G = [ () => {
    removeAttrs(q, [ N, B ]);
    removeAttrs(U, B);
    if (g) {
      removeAttrs(S, [ B, N ]);
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
    const n = prepareWrapUnwrapFocus(t);
    setAttrs(q, N, z ? "viewport" : "host");
    setAttrs(W, Q, "");
    setAttrs(K, nt, "");
    if (!z) {
      setAttrs(X, J, "");
      g && addAttrClass(S, N, Y);
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
    push(G, [ n, () => {
      const t = getFocusedElement();
      const n = prepareWrapUnwrapFocus(t);
      removeAttrs(W, Q);
      removeAttrs(K, nt);
      removeAttrs(X, [ j, F, J ]);
      elementIsGenerated(K) && unwrap(K);
      elementIsGenerated(X) && unwrap(X);
      elementIsGenerated(W) && unwrap(W);
      focusElm(t);
      n();
    } ]);
    if (s && !z) {
      addAttrClass(X, J, Z);
      push(G, bind(removeAttrs, X, J));
    }
    if (!z && y.top === y && t === p) {
      const t = "tabindex";
      const n = getAttr(X, t);
      setAttrs(X, t, "-1");
      focusElm(X);
      const revertViewportTabIndex = () => n ? setAttrs(X, t, n) : removeAttrs(X, t);
      const o = addEventListener(w, "pointerdown keydown", (() => {
        revertViewportTabIndex();
        o();
      }));
      push(G, [ revertViewportTabIndex, o ]);
    } else {
      focusElm(t);
    }
    n();
    ot = 0;
    return et;
  };
  return [ P, appendElements, et ];
};

const createTrinsicUpdateSegment = ({wt: t}) => ({Gt: n, an: o, Tt: s}) => {
  const {xt: e} = n || {};
  const {$t: c} = o;
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
    let [u, f] = r(a);
    const {L: d} = getEnvironment();
    const {ht: _, Ht: v, Ct: h} = l || {};
    const {N: p} = i;
    const [g, C] = t("paddingAbsolute");
    const x = a || v;
    if (_ || f || x) {
      [u, f] = c(a);
    }
    const z = !s && (C || h || f);
    if (z) {
      const t = !g || !n && !d;
      const s = u.r + u.l;
      const c = u.t + u.b;
      const r = {
        [O]: t && !p ? -s : 0,
        [$]: t ? -c : 0,
        [m]: t && p ? -s : 0,
        top: t ? -u.t : 0,
        right: t ? p ? -u.r : "auto" : 0,
        left: t ? p ? "auto" : -u.l : 0,
        [H]: t && `calc(100% + ${s}px)`
      };
      const l = {
        [b]: t ? u.t : 0,
        [w]: t ? u.r : 0,
        [y]: t ? u.b : 0,
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
      fn: z
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {bt: c, cn: r, D: l, V: i, Ot: a, Rt: u, ln: f} = t;
  const {L: d} = e;
  const _ = u && i;
  const v = bind(o, 0);
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
  const [g, b] = createCache(h, bind(fractionalSize, l));
  const [w, S] = createCache(h, bind(R, l));
  const [y, m] = createCache(h);
  const [O, $] = createCache(h);
  const [H] = createCache(p);
  const z = getStaticPluginModuleInstance(Et);
  return ({Et: n, Gt: u, an: h, Tt: p}, {fn: I}) => {
    const {ht: E, Ht: A, Ct: T, It: D} = u || {};
    const R = z && z.M(t, s, h, e, n);
    const {q: M, W: V, X: L} = R || {};
    const [P, U] = getShowNativeOverlaidScrollbars(n, e);
    const [B, W] = n("overflow");
    const X = E || I || A || T || D || U;
    const Y = overflowIsVisible(B.x);
    const K = overflowIsVisible(B.y);
    const nt = Y || K;
    let ot = b(p);
    let st = S(p);
    let et = m(p);
    let ct = $(p);
    let rt;
    if (U && d) {
      a(Z, !P);
    }
    if (X) {
      if (nt) {
        a(G, false);
      }
      const [t, n] = V ? V(rt) : [];
      const [s, e] = ot = g(p);
      const [c, r] = st = w(p);
      const i = k(l);
      const u = c;
      const d = i;
      t && t();
      if ((r || e || U) && n && !P && M && M(n, c, s)) {}
      const h = windowSize(f);
      const b = {
        w: v(o(c.w, u.w) + s.w),
        h: v(o(c.h, u.h) + s.h)
      };
      const S = {
        w: v((_ ? h.w : d.w + v(i.w - c.w)) + s.w),
        h: v((_ ? h.h : d.h + v(i.h - c.h)) + s.h)
      };
      ct = O(S);
      et = y(getOverflowAmount(b, S), p);
    }
    const [lt, it] = ct;
    const [at, ut] = et;
    const [ft, dt] = st;
    const [_t, vt] = ot;
    const ht = {
      x: at.w > 0,
      y: at.h > 0
    };
    const pt = Y && K && (ht.x || ht.y) || Y && ht.x && !ht.y || K && ht.y && !ht.x;
    const gt = I || T || D || vt || dt || it || ut || W || U || X;
    if (gt) {
      const n = {};
      const o = setViewportOverflowState(t, ht, B, n);
      L && L(o, h, !!M && M(o, ft, _t), n);
      if (i) {
        setAttrs(c, j, n[C]);
        setAttrs(c, F, n[x]);
      } else {
        setStyles(l, n);
      }
    }
    addRemoveAttrClass(c, N, q, pt);
    addRemoveAttrClass(r, Q, tt, pt);
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
      [O]: 0,
      [$]: 0,
      [m]: 0,
      [b]: 0,
      [w]: 0,
      [y]: 0,
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
  const f = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
  return [ o, t => {
    const n = {};
    const o = u;
    const s = o && getElmentScroll(r);
    const e = l ? addAttrClass(r, N, X) : noop;
    each(f, (o => {
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
  const [u, f, d] = createObserversSetup(i, l, e, (t => {
    update({}, t);
  }));
  const [_, v, , h] = createScrollbarsSetup(t, n, d, l, i, s);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, s) => {
    const {dn: e, Tt: c, At: l, _n: i} = t;
    const a = e || {};
    const u = !!c;
    const _ = {
      Et: createOptionCheck(n, a, u),
      dn: a,
      Tt: u
    };
    if (i) {
      v(_);
      return false;
    }
    const h = s || f(assignDeep({}, _, {
      At: l
    }));
    const p = r(assignDeep({}, _, {
      an: d,
      Gt: h
    }));
    v(assignDeep({}, _, {
      Gt: h,
      Qt: p
    }));
    const g = updateHintsAreTruthy(h);
    const b = updateHintsAreTruthy(p);
    const w = g || b || !isEmptyObject(a) || u;
    w && o(t, {
      Gt: h,
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
    vn: d,
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
      const o = getStaticPluginModuleInstance(Ht);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, f, d] = createEventListenerHub();
    const [_, v, h] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      h(t, n);
      d(t, n);
    };
    const [p, g, b, w, S] = createSetups(t, a, (({dn: t, Tt: n}, {Gt: o, Qt: s}) => {
      const {ht: e, Ct: c, xt: r, Ht: l, zt: i, _t: a} = o;
      const {tn: u, nn: f, sn: d} = s;
      triggerEvent("updated", [ y, {
        updateHints: {
          sizeChanged: !!e,
          directionChanged: !!c,
          heightIntrinsicChanged: !!r,
          overflowEdgeChanged: !!u,
          overflowAmountChanged: !!f,
          overflowStyleChanged: !!d,
          contentMutation: !!l,
          hostMutation: !!i,
          appear: !!a
        },
        changedOptions: t || {},
        force: !!n
      } ]);
    }), (t => triggerEvent("scroll", [ y, t ])));
    const destroy = t => {
      removeInstance(c);
      runEachAndClear(l);
      r = true;
      triggerEvent("destroyed", [ y, t ]);
      f();
      v();
    };
    const y = {
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
        const {gt: t, bt: n, cn: o, D: s, wt: e, kt: c, Zt: r} = w.pn;
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
    push(l, [ S ]);
    addInstance(c, y);
    registerPluginModuleInstances(Ct, OverlayScrollbars, [ y, u, i ]);
    if (cancelInitialization(w.pn.Rt, !e && t.cancel)) {
      destroy(true);
      return y;
    }
    push(l, p());
    triggerEvent("initialized", [ y ]);
    y.update(true);
    return y;
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
//# sourceMappingURL=overlayscrollbars.cjs.map
