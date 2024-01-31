/*!
 * OverlayScrollbars
 * Version: 2.5.0
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

const _ = getApi("ResizeObserver");

const d = getApi("ScrollTimeline");

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
    const _ = f >= u;
    const d = s ? 1 : 1 - (o(0, a + u - r) / u || 0);
    const v = (n - t) * (isFunction(c) ? c(d, d * u, 0, 1, u) : d) + t;
    const h = _ || d === 1;
    e && e(v, d, h);
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

const I = "height";

const z = "hidden";

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
  const {v: u, p: f, S: _} = n || {};
  const d = function invokeFunctionToDebounce(n) {
    c();
    a(o);
    o = s = void 0;
    c = noop;
    t.apply(this, n);
  };
  const mergeParms = t => _ && s ? _(s, t) : t;
  const flush = () => {
    if (c !== noop) {
      d(mergeParms(e) || e);
    }
  };
  const v = function debouncedFn() {
    const t = from(arguments);
    const n = isFunction(u) ? u() : u;
    const _ = isNumber(n) && n >= 0;
    if (_) {
      const u = isFunction(f) ? f() : f;
      const _ = isNumber(u) && u >= 0;
      const v = n > 0 ? i : l;
      const h = n > 0 ? a : r;
      const p = mergeParms(t);
      const g = p || t;
      const b = d.bind(0, g);
      c();
      const w = v(b, n);
      c = () => h(w);
      if (_ && !o) {
        o = i(flush, u);
      }
      s = e = g;
    } else {
      d(t);
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

const A = t && Element.prototype;

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
    const o = A.matches || A.msMatchesSelector;
    return o.call(t, n);
  }
  return false;
};

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
  t && each(n, ((n, o) => {
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

const D = {
  w: 0,
  h: 0
};

const getElmWidthHeightProperty = (t, n) => n ? {
  w: n[`${t}Width`],
  h: n[`${t}Height`]
} : D;

const windowSize = t => getElmWidthHeightProperty("inner", t || n);

const k = bind(getElmWidthHeightProperty, "offset");

const R = bind(getElmWidthHeightProperty, "client");

const M = bind(getElmWidthHeightProperty, "scroll");

const fractionalSize = t => {
  const n = parseFloat(getStyles(t, H)) || 0;
  const o = parseFloat(getStyles(t, I)) || 0;
  return {
    w: n - e(n),
    h: o - e(o)
  };
};

const getBoundingClientRect = t => t.getBoundingClientRect();

const domRectHasDimensions = t => !!(t && (t[I] || t[H]));

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

const V = {
  x: 0,
  y: 0
};

const absoluteCoordinates = t => {
  const o = t && getBoundingClientRect(t);
  return o ? {
    x: o.left + n.scrollX,
    y: o.top + n.scrollY
  } : V;
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

const B = `${U}-scrollbar-hidden`;

const N = `${P}-initialize`;

const j = P;

const F = `${j}-overflow-x`;

const q = `${j}-overflow-y`;

const W = "overflowVisible";

const X = "scrollbarPressed";

const Y = "updating";

const J = "body";

const K = `${P}-viewport`;

const Z = "arrange";

const G = "scrollbarHidden";

const Q = W;

const tt = `${P}-padding`;

const nt = Q;

const ot = `${P}-content`;

const st = "os-size-observer";

const et = `${st}-appear`;

const ct = `${st}-listener`;

const rt = `${ct}-scroll`;

const lt = `${ct}-item`;

const it = `${lt}-final`;

const at = "os-trinsic-observer";

const ut = "os-theme-none";

const ft = "os-scrollbar";

const _t = `${ft}-rtl`;

const dt = `${ft}-horizontal`;

const vt = `${ft}-vertical`;

const ht = `${ft}-track`;

const pt = `${ft}-handle`;

const gt = `${ft}-visible`;

const bt = `${ft}-cornerless`;

const wt = `${ft}-transitionless`;

const St = `${ft}-interaction`;

const yt = `${ft}-unusable`;

const mt = `${ft}-auto-hide`;

const Ot = `${mt}-hidden`;

const $t = `${ft}-wheel`;

const Ct = `${ht}-interactive`;

const xt = `${pt}-interactive`;

const Ht = {};

const It = {};

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
    return (i || It)[s] = t;
  }
}));

const getStaticPluginModuleInstance = t => It[t];

const zt = "__osOptionsValidationPlugin";

const Et = "__osSizeObserverPlugin";

const At = /* @__PURE__ */ (() => ({
  [Et]: {
    static: () => (t, n, o) => {
      const s = 3333333;
      const e = "scroll";
      const c = createDOM(`<div class="${lt}" dir="ltr"><div class="${lt}"><div class="${it}"></div></div><div class="${lt}"><div class="${it}" style="width: 200%; height: 200%"></div></div></div>`);
      const i = c[0];
      const a = i.lastChild;
      const u = i.firstChild;
      const f = u == null ? void 0 : u.firstChild;
      let _ = k(i);
      let d = _;
      let v = false;
      let h;
      const reset = () => {
        scrollElementTo(u, s);
        scrollElementTo(a, s);
      };
      const onResized = t => {
        h = 0;
        if (v) {
          _ = d;
          n(t === true);
        }
      };
      const onScroll = t => {
        d = k(i);
        v = !t || !equalWH(d, _);
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
      addClass(t, rt);
      setStyles(f, {
        [H]: s,
        [I]: s
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

const Tt = "__osScrollbarsHidingPlugin";

const Dt = /* @__PURE__ */ (() => ({
  [Tt]: {
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
            const _ = o ? m : O;
            const d = o ? S : w;
            const v = f[_];
            const h = f[$];
            const p = f[d];
            const g = f[y];
            e[H] = `calc(100% + ${u + v * -1}px)`;
            e[_] = -u + v;
            e[$] = -a + h;
            if (s) {
              e[d] = p + (i ? u : 0);
              e[y] = g + (l ? a : 0);
            }
          }
        };
        const _arrangeViewport = (t, s, e) => {
          if (u) {
            const {j: c} = n;
            const {U: l, B: i} = _getViewportOverflowHideOffset(t);
            const {x: a, y: u} = i;
            const {x: f, y: _} = l;
            const {N: d} = o;
            const v = d ? w : S;
            const h = c[v];
            const p = c.paddingTop;
            const g = s.w + e.w;
            const b = s.h + e.h;
            const y = {
              w: _ && u ? `${_ + g - h}px` : "",
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
            const _ = getStyles(r, keys(f));
            removeAttrClass(r, K, Z);
            setStyles(r, f);
            return [ () => {
              _hideNativeScrollbars(e, o, u, _);
              setStyles(r, _);
              addAttrClass(r, K, Z);
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
          const _ = !diffBiggerThanOne(a.w, a.h);
          const d = u !== o && u > 0;
          const v = f && _ && d;
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

const kt = "__osClickScrollPlugin";

const Rt = /* @__PURE__ */ (() => ({
  [kt]: {
    static: () => (t, n, o, s, e) => {
      let c = 0;
      let r = noop;
      const animateClickScroll = l => {
        r = animateNumber(l, l + s * Math.sign(o), 133, ((o, l, a) => {
          t(o);
          const u = n();
          const f = u + s;
          const _ = e >= u && e <= f;
          if (a && !_) {
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

let Mt;

const createEnvironment = () => {
  const getNativeScrollbarSize = (t, n, o, s) => {
    appendChildren(t, n);
    const e = R(n);
    const c = k(n);
    const r = fractionalSize(o);
    s && removeElements(n);
    return {
      x: c.h - e.h + r.h,
      y: c.w - e.w + r.w
    };
  };
  const getNativeScrollbarsHiding = t => {
    let n = false;
    const o = addClass(t, B);
    try {
      n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
    } catch (s) {}
    o();
    return n;
  };
  const getRtlScrollBehavior = (t, n) => {
    setStyles(t, {
      [C]: z,
      [x]: z,
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
  const o = createDOM(`<div class="${U}"><div></div></div>`);
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
  const v = assignDeep({}, L);
  const h = bind(assignDeep, {}, v);
  const p = bind(assignDeep, {}, _);
  const g = {
    P: a,
    T: f,
    L: u,
    J: !!d,
    K: getRtlScrollBehavior(s, e),
    Z: bind(c, "r"),
    G: p,
    tt: t => assignDeep(_, t) && p(),
    nt: h,
    ot: t => assignDeep(v, t) && h(),
    st: assignDeep({}, _),
    et: assignDeep({}, v)
  };
  removeAttrs(s, "style");
  removeElements(s);
  n.addEventListener("resize", (() => {
    let t;
    if (!u && (!f.x || !f.y)) {
      const n = getStaticPluginModuleInstance(Tt);
      const o = n ? n.Y() : noop;
      t = !!o(g, l);
    }
    r("r", [ t ]);
  }));
  return g;
};

const getEnvironment = () => {
  if (!Mt) {
    Mt = createEnvironment();
  }
  return Mt;
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
  const _ = t && (isNull(u) ? !c : u);
  return !!f || !!_;
};

const Vt = new WeakMap;

const addInstance = (t, n) => {
  Vt.set(t, n);
};

const removeInstance = t => {
  Vt.delete(t);
};

const getInstance = t => Vt.get(t);

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
  const _ = debounce((() => e && o(true)), {
    v: 33,
    p: 99
  });
  const [d, v] = createEventContentChange(t, _, l);
  const h = c || [];
  const p = r || [];
  const g = concat(h, p);
  const observerCallback = (e, c) => {
    if (!isEmptyArray(c)) {
      const r = a || noop;
      const l = f || noop;
      const u = [];
      const _ = [];
      let d = false;
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
          const _ = a ? !r(c, e, f, m) : !b || n;
          const d = _ && !l(o, !!a, t, s);
          each(v, (t => push(u, t)));
          each(g, (t => push(u, t)));
          h = h || d;
        }
        if (!n && S && O && !r(c, e, f, m)) {
          push(_, e);
          d = d || $;
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
      if (!isEmptyArray(_) || d) {
        const t = [ deduplicateArray(_), d ];
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
        d();
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

const createSizeObserver = (t, n, o) => {
  const s = 3333333;
  const {_t: e, dt: c} = o || {};
  const r = getStaticPluginModuleInstance(Et);
  const {K: l} = getEnvironment();
  const i = bind(getDirectionIsRTL, t);
  const [a] = createCache({
    o: false,
    _: true
  });
  return () => {
    const o = [];
    const u = createDOM(`<div class="${st}"><div class="${ct}"></div></div>`);
    const f = u[0];
    const d = f.firstChild;
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
          dt: i
        });
      }
    };
    if (_) {
      const t = new _((t => onSizeChangedCallbackProxy(t.pop())));
      t.observe(d);
      push(o, (() => {
        t.disconnect();
      }));
    } else if (r) {
      const [t, n] = r(d, onSizeChangedCallbackProxy, c);
      push(o, concat([ addClass(f, et), addEventListener(f, "animationstart", t) ], n));
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
          removeClass(d, "ltr rtl");
          addClass(d, s ? "rtl" : "ltr");
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
  const {L: u} = getEnvironment();
  const f = `[${j}]`;
  const d = `[${K}]`;
  const v = [ "tabindex" ];
  const h = [ "wrap", "cols", "rows" ];
  const p = [ "id", "class", "style", "open" ];
  const {gt: g, bt: b, D: w, wt: S, St: y, V: m, yt: O, Ot: $} = t;
  const C = {
    $t: false,
    N: getDirectionIsRTL(g)
  };
  const x = getEnvironment();
  const H = getStaticPluginModuleInstance(Tt);
  const [I] = createCache({
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  }, (() => {
    const s = H && H.M(t, n, C, x, o).W;
    const e = O(Q);
    const c = !m && O(Z);
    const r = c && getElmentScroll(w);
    $(Q);
    m && $(Y, true);
    const l = c && s && s()[0];
    const i = M(S);
    const a = M(w);
    const u = fractionalSize(w);
    $(Q, e);
    m && $(Y);
    l && l();
    scrollElementTo(w, r);
    return {
      w: a.w + i.w + u.w,
      h: a.h + i.h + u.h
    };
  }));
  const z = y ? h : concat(p, h);
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
  const onSizeChanged = ({ht: t, vt: n, dt: o}) => {
    const e = t && !o && !n;
    const c = !e && u ? E : s;
    const [r, l] = n || [];
    const i = {
      ht: t || o,
      dt: o,
      Ct: l
    };
    setDirectionWhenViewportIsTarget(i);
    n && assignDeep(C, {
      N: r
    });
    c(i);
  };
  const onContentMutation = (t, n) => {
    const [, o] = I();
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
      It: n
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
    dt: true,
    _t: true
  });
  const [R, V] = createDOMObserver(b, false, onHostMutation, {
    rt: p,
    ct: concat(p, v)
  });
  const L = m && _ && new _((t => {
    const n = t[t.length - 1].contentRect;
    onSizeChanged({
      ht: true,
      dt: domRectAppeared(n, i)
    });
    i = n;
  }));
  return [ () => {
    updateViewportAttrsFromHost();
    L && L.observe(b);
    const t = k && k();
    const n = T && T();
    const o = R();
    const s = A((t => {
      const [, n] = I();
      E({
        zt: t,
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
    const [_, v] = t("update.elementEvents");
    const [h, p] = t("update.debounce");
    const g = v || u;
    const b = n || o;
    const ignoreMutationFromOptions = t => isFunction(i) && i(t);
    if (g) {
      r && r();
      l && l();
      const [t, n] = createDOMObserver(S || w, true, onContentMutation, {
        ct: concat(z, a || []),
        lt: _,
        it: f,
        ft: (t, n) => {
          const {target: o, attributeName: s} = t;
          const e = !n && s && !m ? liesBetween(o, f, d) : false;
          return e || !!closest(o, `.${ft}`) || !!ignoreMutationFromOptions(t);
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
  const {gt: a, bt: u, D: f, Dt: _, kt: v, Rt: h, V: p} = n;
  const {scrollbars: g} = _ ? {} : t;
  const {slot: b} = g || {};
  const w = new Map;
  const initScrollTimeline = t => d && new d({
    source: v,
    axis: t
  });
  const S = initScrollTimeline("x");
  const y = initScrollTimeline("y");
  const m = dynamicInitializationElement([ a, u, f ], (() => p && h ? a : u), l, b);
  const getScrollbarHandleLengthRatio = (t, n) => {
    if (n) {
      const o = t ? H : I;
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
    w.forEach(((n, o) => {
      const s = t ? inArray(createOrKeepArray(t), o) : true;
      if (s) {
        each(n || [], (t => {
          t && t.cancel();
        }));
        w.delete(o);
      }
    }));
  };
  const setElementAnimation = (t, n, o, s) => {
    const e = w.get(t) || [];
    const c = e.find((t => t && t.timeline === n));
    if (c) {
      c.effect = new KeyframeEffect(t, o, {
        composite: s
      });
    } else {
      w.set(t, concat(e, [ t.animate(o, {
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
        [n ? H : I]: ratioToCssPercent(getScrollbarHandleLengthRatio(n))
      } ];
    }));
  };
  const scrollbarStructureRefreshHandleOffset = (t, n) => {
    const {Lt: s} = o;
    const e = n ? s.x : s.y;
    const getTransformValue = (t, o, s) => getTrasformTranslateValue(ratioToCssPercent(getScrollbarHandleOffsetRatio(t, getRawScrollRatio(o, e, s), n, s)), n);
    if (S && y) {
      each(t, (t => {
        const {Ut: o, Vt: s} = t;
        const r = n && getDirectionIsRTL(o) && c;
        setElementAnimation(s, n ? S : y, addDirectionRTLKeyframes({
          transform: getRawScrollBounds(e, r).map((n => getTransformValue(t, n, r)))
        }, r));
      }));
    } else {
      const o = getElmentScroll(v);
      scrollbarStyle(t, (t => {
        const {Vt: s, Ut: e} = t;
        return [ s, {
          transform: getTransformValue(t, n ? o.x : o.y, n && getDirectionIsRTL(e) && c)
        } ];
      }));
    }
  };
  const doRefreshScrollbarOffset = t => p && !h && parent(t) === f;
  const O = [];
  const $ = [];
  const C = [];
  const scrollbarsAddRemoveClass = (t, n, o) => {
    const s = isBoolean(o);
    const e = s ? o : true;
    const c = s ? !o : true;
    e && scrollbarStructureAddRemoveClass($, t, n);
    c && scrollbarStructureAddRemoveClass(C, t, n);
  };
  const refreshScrollbarsHandleLength = () => {
    scrollbarStructureRefreshHandleLength($, true);
    scrollbarStructureRefreshHandleLength(C);
  };
  const refreshScrollbarsHandleOffset = () => {
    scrollbarStructureRefreshHandleOffset($, true);
    scrollbarStructureRefreshHandleOffset(C);
  };
  const refreshScrollbarsScrollbarOffset = () => {
    if (p) {
      const {Lt: t} = o;
      const n = .5;
      if (S && y) {
        each(concat(C, $), (({Ut: o}) => {
          if (doRefreshScrollbarOffset(o)) {
            const setScrollbarElementAnimation = (t, s, e) => {
              const r = e && getDirectionIsRTL(o) && c;
              setElementAnimation(o, t, addDirectionRTLKeyframes({
                transform: getRawScrollBounds(s - n, r).map((t => getTrasformTranslateValue(numberToCssPx(t), e)))
              }, r), "add");
            };
            setScrollbarElementAnimation(S, t.x, true);
            setScrollbarElementAnimation(y, t.y);
          } else {
            cancelElementAnimations(o);
          }
        }));
      } else {
        const n = getElmentScroll(v);
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
        scrollbarStyle(C, styleScrollbarPosition);
      }
    }
  };
  const generateScrollbarDOM = t => {
    const n = t ? dt : vt;
    const o = t ? $ : C;
    const e = isEmptyArray(o) ? wt : "";
    const c = createDiv(`${ft} ${n} ${e}`);
    const r = createDiv(ht);
    const l = createDiv(pt);
    const i = {
      Ut: c,
      Mt: r,
      Vt: l
    };
    push(o, i);
    push(O, [ appendChildren(c, r), appendChildren(r, l), bind(removeElements, c), cancelElementAnimations, s(i, scrollbarsAddRemoveClass, scrollbarStructureRefreshHandleOffset, t) ]);
    return i;
  };
  const x = bind(generateScrollbarDOM, true);
  const z = bind(generateScrollbarDOM, false);
  const appendElements = () => {
    appendChildren(m, $[0].Ut);
    appendChildren(m, C[0].Ut);
    i((() => {
      scrollbarsAddRemoveClass(wt);
    }), 300);
    return bind(runEachAndClear, O);
  };
  x();
  z();
  return [ {
    Bt: refreshScrollbarsHandleLength,
    Nt: refreshScrollbarsHandleOffset,
    jt: refreshScrollbarsScrollbarOffset,
    Ft: scrollbarsAddRemoveClass,
    qt: {
      J: S,
      Wt: $,
      Xt: x,
      Yt: bind(scrollbarStyle, $)
    },
    Jt: {
      J: y,
      Wt: C,
      Xt: z,
      Yt: bind(scrollbarStyle, C)
    }
  }, appendElements ];
};

const createScrollbarsSetupEvents = (t, n, o) => {
  const {bt: s, kt: c, Kt: r} = n;
  return (n, l, i, a) => {
    const {Ut: u, Mt: f, Vt: _} = n;
    const [d, v] = selfClearTimeout(333);
    const [h, p] = selfClearTimeout();
    const g = bind(i, [ n ], a);
    const b = !!c.scrollBy;
    const w = `client${a ? "X" : "Y"}`;
    const S = a ? H : I;
    const y = a ? "left" : "top";
    const m = a ? "w" : "h";
    const O = a ? "x" : "y";
    const isAffectingTransition = t => t.propertyName.indexOf(S) > -1;
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointerleave pointercancel lostpointercapture";
      const createRelativeHandleMove = (t, n) => s => {
        const {Lt: e} = o;
        const r = k(f)[m] - k(_)[m];
        const l = n * s / r;
        const i = l * e[O];
        scrollElementTo(c, {
          [O]: t + i
        });
      };
      return addEventListener(f, "pointerdown", (o => {
        const l = closest(o.target, `.${pt}`) === _;
        const i = l ? _ : f;
        const a = t.scrollbars;
        const {button: u, isPrimary: d, pointerType: v} = o;
        const {pointers: h} = a;
        const p = u === 0 && d && a[l ? "dragScroll" : "clickScroll"] && (h || []).includes(v);
        if (p) {
          const t = !l && o.shiftKey;
          const a = bind(getBoundingClientRect, _);
          const u = bind(getBoundingClientRect, f);
          const getHandleOffset = (t, n) => (t || a())[y] - (n || u())[y];
          const d = e(getBoundingClientRect(c)[S]) / k(c)[m] || 1;
          const v = createRelativeHandleMove(getElmentScroll(c)[O] || 0, 1 / d);
          const h = o[w];
          const p = a();
          const g = u();
          const b = p[S];
          const $ = getHandleOffset(p, g) + b / 2;
          const C = h - g[y];
          const x = l ? 0 : C - $;
          const releasePointerCapture = t => {
            runEachAndClear(I);
            i.releasePointerCapture(t.pointerId);
          };
          const H = addAttrClass(s, j, X);
          const I = [ H, addEventListener(r, n, releasePointerCapture), addEventListener(r, "selectstart", (t => preventDefault(t)), {
            H: false
          }), addEventListener(f, n, releasePointerCapture), addEventListener(f, "pointermove", (n => {
            const o = n[w] - h;
            if (l || t) {
              v(x + o);
            }
          })) ];
          i.setPointerCapture(o.pointerId);
          if (t) {
            v(x);
          } else if (!l) {
            const t = getStaticPluginModuleInstance(kt);
            t && push(I, t(v, getHandleOffset, x, b, C));
          }
        }
      }));
    };
    let $ = true;
    return bind(runEachAndClear, [ addEventListener(u, "pointerenter", (() => {
      l(St, true);
    })), addEventListener(u, "pointerleave pointercancel", (() => {
      l(St, false);
    })), addEventListener(u, "wheel", (t => {
      const {deltaX: n, deltaY: o, deltaMode: e} = t;
      if (b && $ && e === 0 && parent(u) === s) {
        c.scrollBy({
          left: n,
          top: o,
          behavior: "smooth"
        });
      }
      $ = false;
      l($t, true);
      d((() => {
        $ = true;
        l($t);
      }));
      preventDefault(t);
    }), {
      H: false,
      I: true
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
    })), addEventListener(u, "mousedown", bind(addEventListener, r, "click", stopPropagation, {
      A: true,
      I: true
    }), {
      I: true
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
  const [w, S] = selfClearTimeout(100);
  const [y, m] = selfClearTimeout(100);
  const [O, $] = selfClearTimeout((() => _));
  const [C, x] = createScrollbarsSetupElements(t, e, s, createScrollbarsSetupEvents(n, e, s));
  const {bt: H, Zt: I, Rt: z} = e;
  const {Ft: E, Bt: A, Nt: T, jt: D} = C;
  const manageAutoHideSuspension = t => {
    E(mt, t, true);
    E(mt, t, false);
  };
  const manageScrollbarsAutoHide = (t, n) => {
    $();
    if (t) {
      E(Ot);
    } else {
      const t = bind(E, Ot, true);
      if (_ > 0 && !n) {
        O(t);
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
  const k = [ b, $, S, m, p, v, () => f(), addEventListener(H, "pointerover", onHostMouseEnter, {
    A: true
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
  })), addEventListener(I, "scroll", (t => {
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
  return [ () => bind(runEachAndClear, push(k, x())), ({Et: t, Tt: n, Gt: e, Qt: c}) => {
    const {tn: a, nn: d, sn: v} = c || {};
    const {Ct: h, dt: p} = e || {};
    const {N: g} = o;
    const {T: b} = getEnvironment();
    const {Lt: w, k: S, en: m} = s;
    const [O, $] = t("showNativeOverlaidScrollbars");
    const [C, x] = t("scrollbars.theme");
    const [H, k] = t("scrollbars.visibility");
    const [R, M] = t("scrollbars.autoHide");
    const [V, L] = t("scrollbars.autoHideSuspend");
    const [P] = t("scrollbars.autoHideDelay");
    const [U, B] = t("scrollbars.dragScroll");
    const [N, j] = t("scrollbars.clickScroll");
    const F = p && !n;
    const q = m.x || m.y;
    const W = a || d || h || n;
    const X = v || k;
    const Y = O && b.x && b.y;
    const setScrollbarVisibility = (t, n) => {
      const o = H === "visible" || H === "auto" && t === "scroll";
      E(gt, o, n);
      return o;
    };
    _ = P;
    if (F) {
      if (V && q) {
        manageAutoHideSuspension(false);
        f();
        y((() => {
          f = addEventListener(I, "scroll", bind(manageAutoHideSuspension, true), {
            A: true
          });
        }));
      } else {
        manageAutoHideSuspension(true);
      }
    }
    if ($) {
      E(ut, Y);
    }
    if (x) {
      E(u);
      E(C, true);
      u = C;
    }
    if (L && !V) {
      manageAutoHideSuspension(true);
    }
    if (M) {
      r = R === "move";
      l = R === "leave";
      i = R !== "never";
      manageScrollbarsAutoHide(!i, true);
    }
    if (B) {
      E(xt, U);
    }
    if (j) {
      E(Ct, N);
    }
    if (X) {
      const t = setScrollbarVisibility(S.x, true);
      const n = setScrollbarVisibility(S.y, false);
      const o = t && n;
      E(bt, !o);
    }
    if (W) {
      A();
      T();
      D();
      E(yt, !w.x, true);
      E(yt, !w.y, false);
      E(_t, g && !z);
    }
  }, {}, C ];
};

const createStructureSetupElements = t => {
  const n = getEnvironment();
  const {G: o, L: s} = n;
  const {elements: e} = o();
  const {host: c, padding: r, viewport: l, content: i} = e;
  const a = isHTMLElement(t);
  const u = a ? {} : t;
  const {elements: f} = u;
  const {host: _, padding: d, viewport: v, content: h} = f || {};
  const p = a ? t : u.target;
  const g = is(p, "textarea");
  const b = p.ownerDocument;
  const w = b.documentElement;
  const S = p === b.body;
  const y = b.defaultView;
  const getFocusedElement = () => b.activeElement;
  const focusElm = t => {
    if (t && t.focus) {
      t.focus();
    }
  };
  const m = bind(staticInitializationElement, [ p ]);
  const O = bind(dynamicInitializationElement, [ p ]);
  const $ = bind(resolveInitialization, [ p ]);
  const C = bind(createDiv, "");
  const x = bind(m, C, l);
  const H = bind(O, C, i);
  const I = x(v);
  const z = I === p;
  const E = z && S;
  const A = !z && H(h);
  const T = !z && isHTMLElement(I) && I === A;
  const D = T && !!$(i);
  const k = D ? x() : I;
  const R = D ? A : H();
  const M = T ? k : I;
  const V = E ? w : M;
  const L = g ? m(C, c, _) : p;
  const P = E ? V : L;
  const U = T ? R : A;
  const B = {
    gt: p,
    bt: P,
    D: V,
    cn: !z && O(C, r, d),
    wt: U,
    kt: E ? w : V,
    Zt: E ? b : V,
    rn: S ? w : p,
    ln: y,
    Kt: b,
    St: g,
    Rt: S,
    Dt: a,
    V: z,
    an: T,
    yt: t => hasAttrClass(V, z ? j : K, t),
    Ot: (t, n) => addRemoveAttrClass(V, z ? j : K, t, n)
  };
  const W = keys(B).reduce(((t, n) => {
    const o = B[n];
    return push(t, o && isHTMLElement(o) && !parent(o) ? o : false);
  }), []);
  const elementIsGenerated = t => t ? inArray(W, t) : null;
  const {gt: X, bt: Y, cn: Z, D: Q, wt: nt} = B;
  const st = [ () => {
    removeAttrs(Y, [ j, N ]);
    removeAttrs(X, N);
    if (S) {
      removeAttrs(w, [ N, j ]);
    }
  } ];
  const et = g && elementIsGenerated(Y);
  let ct = g ? X : contents([ nt, Q, Z, Y, X ].find((t => elementIsGenerated(t) === false)));
  const rt = E ? X : nt || Q;
  const lt = bind(runEachAndClear, st);
  const appendElements = () => {
    const t = getFocusedElement();
    const unwrap = t => {
      appendChildren(parent(t), contents(t));
      removeElements(t);
    };
    const prepareWrapUnwrapFocus = t => t ? addEventListener(t, "focus blur", (t => {
      stopPropagation(t);
      t.stopImmediatePropagation();
    }), {
      I: true,
      H: false
    }) : noop;
    const n = prepareWrapUnwrapFocus(t);
    setAttrs(Y, j, z ? "viewport" : "host");
    setAttrs(Z, tt, "");
    setAttrs(nt, ot, "");
    if (!z) {
      setAttrs(Q, K, "");
      S && addAttrClass(w, j, J);
    }
    if (et) {
      insertAfter(X, Y);
      push(st, (() => {
        insertAfter(Y, X);
        removeElements(Y);
      }));
    }
    appendChildren(rt, ct);
    appendChildren(Y, Z);
    appendChildren(Z || Y, !z && Q);
    appendChildren(Q, nt);
    push(st, [ n, () => {
      const t = getFocusedElement();
      const n = prepareWrapUnwrapFocus(t);
      removeAttrs(Z, tt);
      removeAttrs(nt, ot);
      removeAttrs(Q, [ F, q, K ]);
      elementIsGenerated(nt) && unwrap(nt);
      elementIsGenerated(Q) && unwrap(Q);
      elementIsGenerated(Z) && unwrap(Z);
      focusElm(t);
      n();
    } ]);
    if (s && !z) {
      addAttrClass(Q, K, G);
      push(st, bind(removeAttrs, Q, K));
    }
    if (!z && y.top === y && t === p) {
      const t = "tabindex";
      const n = getAttr(Q, t);
      setAttrs(Q, t, "-1");
      focusElm(Q);
      const revertViewportTabIndex = () => n ? setAttrs(Q, t, n) : removeAttrs(Q, t);
      const o = addEventListener(b, "pointerdown keydown", (() => {
        revertViewportTabIndex();
        o();
      }));
      push(st, [ revertViewportTabIndex, o ]);
    } else {
      focusElm(t);
    }
    n();
    ct = 0;
    return lt;
  };
  return [ B, appendElements, lt ];
};

const createTrinsicUpdateSegment = ({wt: t}) => ({Gt: n, un: o, Tt: s}) => {
  const {xt: e} = n || {};
  const {$t: c} = o;
  const r = t && (e || s);
  if (r) {
    setStyles(t, {
      [I]: c && "100%"
    });
  }
};

const createPaddingUpdateSegment = ({bt: t, cn: n, D: o, V: s}, e) => {
  const [c, r] = createCache({
    u: equalTRBL,
    o: topRightBottomLeft()
  }, bind(topRightBottomLeft, t, "padding", ""));
  return ({Et: t, Gt: l, un: i, Tt: a}) => {
    let [u, f] = r(a);
    const {L: _} = getEnvironment();
    const {ht: d, Ht: v, Ct: h} = l || {};
    const {N: p} = i;
    const [g, C] = t("paddingAbsolute");
    const x = a || v;
    if (d || f || x) {
      [u, f] = c(a);
    }
    const I = !s && (C || h || f);
    if (I) {
      const t = !g || !n && !_;
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
        fn: !t,
        j: n ? l : assignDeep({}, r, l)
      });
    }
    return {
      _n: I
    };
  };
};

const createOverflowUpdateSegment = (t, s) => {
  const e = getEnvironment();
  const {bt: c, cn: r, D: l, V: i, Ot: a, Rt: u, ln: f} = t;
  const {L: _, T: d} = e;
  const v = u && i;
  const h = bind(o, 0);
  const p = {
    u: equalWH,
    o: {
      w: 0,
      h: 0
    }
  };
  const g = {
    u: equalXY,
    o: {
      x: z,
      y: z
    }
  };
  const getOverflowAmount = (t, o) => {
    const s = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
    const e = {
      w: h(t.w - o.w),
      h: h(t.h - o.h)
    };
    return {
      w: e.w > s ? e.w : 0,
      h: e.h > s ? e.h : 0
    };
  };
  const [b, w] = createCache(p, bind(fractionalSize, l));
  const [S, y] = createCache(p, bind(M, l));
  const [m, O] = createCache(p);
  const [$, H] = createCache(p);
  const [E] = createCache(g);
  const A = getStaticPluginModuleInstance(Tt);
  return ({Et: n, Gt: u, un: p, Tt: g}, {_n: z}) => {
    const {ht: T, It: D, Ht: k, xt: M, Ct: V, zt: L} = u || {};
    const {$t: P} = p;
    const U = A && A.M(t, s, p, e, n);
    const {q: B, W: N, X: X, F: Y} = U || {};
    const fixFlexboxGlue = (t, n) => {
      setStyles(l, {
        [I]: ""
      });
      if (n) {
        const {fn: n, cn: o} = s;
        const {R: e} = t;
        const r = fractionalSize(c);
        const i = R(c);
        const a = getStyles(l, "boxSizing") === "content-box";
        const u = n || a ? o.b + o.t : 0;
        const f = !(d.x && a);
        setStyles(l, {
          [I]: i.h + r.h + (e.x && f && Y ? Y(t).U.x : 0) - u
        });
      }
    };
    const [J, Z] = getShowNativeOverlaidScrollbars(n, e);
    const [ot, st] = n("overflow");
    const et = !i && (T || k || D || Z || M);
    const ct = T || z || k || V || L || Z;
    const rt = overflowIsVisible(ot.x);
    const lt = overflowIsVisible(ot.y);
    const it = rt || lt;
    let at = w(g);
    let ut = y(g);
    let ft = O(g);
    let _t = H(g);
    let dt;
    if (Z && _) {
      a(G, !J);
    }
    if (et) {
      dt = getViewportOverflowState(t);
      fixFlexboxGlue(dt, P);
    }
    if (ct) {
      if (it) {
        a(Q, false);
      }
      const [t, n] = N ? N(dt) : [];
      const [s, e] = at = b(g);
      const [c, r] = ut = S(g);
      const i = R(l);
      const u = c;
      const _ = i;
      t && t();
      if ((r || e || Z) && n && !J && B && B(n, c, s)) {}
      const d = windowSize(f);
      const p = {
        w: h(o(c.w, u.w) + s.w),
        h: h(o(c.h, u.h) + s.h)
      };
      const w = {
        w: h((v ? d.w : _.w + h(i.w - c.w)) + s.w),
        h: h((v ? d.h : _.h + h(i.h - c.h)) + s.h)
      };
      _t = $(w);
      ft = m(getOverflowAmount(p, w), g);
    }
    const [vt, ht] = _t;
    const [pt, gt] = ft;
    const [bt, wt] = ut;
    const [St, yt] = at;
    const mt = {
      x: pt.w > 0,
      y: pt.h > 0
    };
    const Ot = rt && lt && (mt.x || mt.y) || rt && mt.x && !mt.y || lt && mt.y && !mt.x;
    const $t = z || V || L || yt || wt || ht || gt || st || Z || et || ct;
    if ($t) {
      const n = {};
      const o = setViewportOverflowState(t, mt, ot, n);
      X && X(o, p, !!B && B(o, bt, St), n);
      if (et) {
        fixFlexboxGlue(o, P);
      }
      if (i) {
        setAttrs(c, F, n[C]);
        setAttrs(c, q, n[x]);
      } else {
        setStyles(l, n);
      }
    }
    addRemoveAttrClass(c, j, W, Ot);
    addRemoveAttrClass(r, tt, nt, Ot);
    if (!i) {
      addRemoveAttrClass(l, K, Q, it);
    }
    const [Ct, xt] = E(getViewportOverflowState(t).k);
    assignDeep(s, {
      k: Ct,
      Pt: {
        x: vt.w,
        y: vt.h
      },
      Lt: {
        x: pt.w,
        y: pt.h
      },
      en: mt
    });
    return {
      sn: xt,
      tn: ht,
      nn: gt
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
    fn: false,
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
      x: z,
      y: z
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
    const e = l ? addAttrClass(r, j, Y) : noop;
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
  const [u, f, _] = createObserversSetup(i, l, e, (t => {
    update({}, t);
  }));
  const [d, v, , h] = createScrollbarsSetup(t, n, _, l, i, s);
  const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
  const update = (t, s) => {
    const {dn: e, Tt: c, At: l, vn: i} = t;
    const a = e || {};
    const u = !!c;
    const d = {
      Et: createOptionCheck(n, a, u),
      dn: a,
      Tt: u
    };
    if (i) {
      v(d);
      return false;
    }
    const h = s || f(assignDeep({}, d, {
      At: l
    }));
    const p = r(assignDeep({}, d, {
      un: _,
      Gt: h
    }));
    v(assignDeep({}, d, {
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
    const s = [ u(), c(), d() ];
    scrollElementTo(n, o);
    return bind(runEachAndClear, s);
  }, update, () => ({
    hn: _,
    pn: l
  }), {
    gn: i,
    bn: h
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
      const o = getStaticPluginModuleInstance(zt);
      return o ? o(n, true) : n;
    };
    const a = assignDeep({}, s(), validateOptions(n));
    const [u, f, _] = createEventListenerHub();
    const [d, v, h] = createEventListenerHub(o);
    const triggerEvent = (t, n) => {
      h(t, n);
      _(t, n);
    };
    const [p, g, b, w, S] = createSetups(t, a, (({dn: t, Tt: n}, {Gt: o, Qt: s}) => {
      const {ht: e, Ct: c, xt: r, Ht: l, It: i, dt: a} = o;
      const {tn: u, nn: f, sn: _} = s;
      triggerEvent("updated", [ y, {
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
      on: d,
      off: (t, n) => {
        t && n && v(t, n);
      },
      state() {
        const {hn: t, pn: n} = b();
        const {N: o} = t;
        const {Pt: s, Lt: e, k: c, en: l, cn: i, fn: a} = n;
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
        const {gt: t, bt: n, cn: o, D: s, wt: e, kt: c, Zt: r} = w.gn;
        const {qt: l, Jt: i} = w.bn;
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
        Tt: t,
        At: true
      }),
      destroy: bind(destroy, false),
      plugin: t => i[keys(t)[0]]
    };
    push(l, [ S ]);
    addInstance(c, y);
    registerPluginModuleInstances(Ht, OverlayScrollbars, [ y, u, i ]);
    if (cancelInitialization(w.gn.Rt, !e && t.cancel)) {
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

export { Rt as ClickScrollPlugin, OverlayScrollbars, Dt as ScrollbarsHidingPlugin, At as SizeObserverPlugin };
//# sourceMappingURL=overlayscrollbars.esm.js.map
