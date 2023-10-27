/*!
 * OverlayScrollbars
 * Version: 2.4.4
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var a = function createCache(r, a) {
    var e = r.v, t = r.o, n = r.u;
    var v = e;
    var i;
    var o = function cacheUpdateContextual(r, a) {
      var e = v;
      var o = r;
      var u = a || (t ? !t(e, o) : e !== o);
      if (u || n) {
        v = o;
        i = e;
      }
      return [ v, u, i ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(a(v, i), r);
    };
    var l = function getCurrentCache(r) {
      return [ v, !!r, i ];
    };
    return [ a ? u : o, l ];
  };
  var e = typeof window !== "undefined";
  var t = e && Node.ELEMENT_NODE;
  var n = Object.prototype, v = n.toString, i = n.hasOwnProperty;
  var o = /^\[object (.+)\]$/;
  var u = function isUndefined(r) {
    return r === void 0;
  };
  var l = function isNull(r) {
    return r === null;
  };
  var c = function type(r) {
    return u(r) || l(r) ? "" + r : v.call(r).replace(o, "$1").toLowerCase();
  };
  var f = function isNumber(r) {
    return typeof r === "number";
  };
  var s = function isString(r) {
    return typeof r === "string";
  };
  var d = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var p = function isFunction(r) {
    return typeof r === "function";
  };
  var _ = function isArray(r) {
    return Array.isArray(r);
  };
  var b = function isObject(r) {
    return typeof r === "object" && !_(r) && !l(r);
  };
  var h = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = f(a) && a > -1 && a % 1 == 0;
    return _(r) || !p(r) && e ? a > 0 && b(r) ? a - 1 in r : true : false;
  };
  var g = function isPlainObject(r) {
    if (!r || !b(r) || c(r) !== "object") {
      return false;
    }
    var a;
    var e = "constructor";
    var t = r[e];
    var n = t && t.prototype;
    var v = i.call(r, e);
    var o = n && i.call(n, "isPrototypeOf");
    if (t && !v && !o) {
      return false;
    }
    for (a in r) {}
    return u(a) || i.call(r, a);
  };
  var m = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === t : false;
  };
  var S = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === t : false;
  };
  function each(r, a) {
    if (h(r)) {
      for (var e = 0; e < r.length; e++) {
        if (a(r[e], e, r) === false) {
          break;
        }
      }
    } else if (r) {
      each(Object.keys(r), (function(e) {
        return a(r[e], e, r);
      }));
    }
    return r;
  }
  var y = function inArray(r, a) {
    return r.indexOf(a) >= 0;
  };
  var w = function concat(r, a) {
    return r.concat(a);
  };
  var O = function push(r, a, e) {
    !e && !s(a) && h(a) ? Array.prototype.push.apply(r, a) : r.push(a);
    return r;
  };
  var C = function from(r) {
    var a = Array.from;
    var e = [];
    if (a && r) {
      return a(r);
    }
    if (r instanceof Set) {
      r.forEach((function(r) {
        O(e, r);
      }));
    } else {
      each(r, (function(r) {
        O(e, r);
      }));
    }
    return e;
  };
  var x = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var E = function deduplicateArray(r) {
    return C(new Set(r));
  };
  var T = function runEachAndClear(r, a, e) {
    var t = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, t);
    !e && (r.length = 0);
  };
  var H = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var P = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var A = function assignDeep(r, a, e, t, n, v, i) {
    var o = [ a, e, t, n, v, i ];
    if ((typeof r !== "object" || l(r)) && !p(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, t) {
        var n = a[t];
        if (r === n) {
          return true;
        }
        var v = _(n);
        if (n && g(n)) {
          var i = r[t];
          var o = i;
          if (v && !_(i)) {
            o = [];
          } else if (!v && !g(i)) {
            o = {};
          }
          r[t] = assignDeep(o, n);
        } else {
          r[t] = v ? n.slice() : n;
        }
      }));
    }));
    return r;
  };
  var z = function removeUndefinedProperties(r, a) {
    return each(A({}, r), (function(r, e, t) {
      if (r === void 0) {
        delete t[e];
      } else if (a && r && g(r)) {
        t[e] = removeUndefinedProperties(r, a);
      }
    }));
  };
  var I = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var D = function attr(r, a, e) {
    if (u(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var L = function getValueSet(r, a) {
    return new Set((D(r, a) || "").split(" "));
  };
  var R = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var M = function attrClass(r, a, e, t) {
    if (e) {
      var n = L(r, a);
      n[t ? "add" : "delete"](e);
      var v = C(n).join(" ").trim();
      D(r, a, v);
    }
  };
  var k = function hasAttrClass(r, a, e) {
    return L(r, a).has(e);
  };
  var V = e && Element.prototype;
  var j = function find(r, a) {
    var e = [];
    var t = a ? S(a) && a : document;
    return t ? O(e, t.querySelectorAll(r)) : e;
  };
  var U = function findFirst(r, a) {
    var e = a ? S(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var F = function is(r, a) {
    if (S(r)) {
      var e = V.matches || V.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var B = function contents(r) {
    return r ? C(r.childNodes) : [];
  };
  var N = function parent(r) {
    return r && r.parentElement;
  };
  var q = function closest(r, a) {
    if (S(r)) {
      var e = V.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (F(r, a)) {
          return r;
        }
        r = N(r);
      } while (r);
    }
  };
  var Y = function liesBetween(r, a, e) {
    var t = q(r, a);
    var n = r && U(e, t);
    var v = q(n, a) === t;
    return t && n ? t === r || n === r || v && q(q(r, e), a) !== t : false;
  };
  var W = function noop() {};
  var G = function removeElements(r) {
    if (h(r)) {
      each(C(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = N(r);
      a && a.removeChild(r);
    }
  };
  var X = function before(r, a, e) {
    if (e && r) {
      var t = a;
      var n;
      if (h(e)) {
        n = document.createDocumentFragment();
        each(e, (function(r) {
          if (r === t) {
            t = r.previousSibling;
          }
          n.appendChild(r);
        }));
      } else {
        n = e;
      }
      if (a) {
        if (!t) {
          t = r.firstChild;
        } else if (t !== a) {
          t = t.nextSibling;
        }
      }
      r.insertBefore(n, t || null);
      return function() {
        return G(e);
      };
    }
    return W;
  };
  var Z = function appendChildren(r, a) {
    return X(r, null, a);
  };
  var $ = function insertBefore(r, a) {
    return X(N(r), r, a);
  };
  var J = function insertAfter(r, a) {
    return X(N(r), r && r.nextSibling, a);
  };
  var K = function createDiv(r) {
    var a = document.createElement("div");
    D(a, "class", r);
    return a;
  };
  var Q = function createDOM(r) {
    var a = K();
    a.innerHTML = r.trim();
    return each(B(a), (function(r) {
      return G(r);
    }));
  };
  var rr = e ? window : {};
  var ar = Math.max;
  var er = Math.min;
  var tr = Math.round;
  var nr = Math.abs;
  var vr = rr.cancelAnimationFrame;
  var ir = rr.requestAnimationFrame;
  var or = rr.setTimeout;
  var ur = rr.clearTimeout;
  var lr = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var cr = function getDummyStyle() {
    return K().style;
  };
  var fr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var sr = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var dr = {};
  var pr = {};
  var _r = function cssProperty(r) {
    var a = pr[r];
    if (H(pr, r)) {
      return a;
    }
    var e = lr(r);
    var t = cr();
    each(fr, (function(n) {
      var v = n.replace(/-/g, "");
      var i = [ r, n + r, v + e, lr(v) + e ];
      return !(a = i.find((function(r) {
        return t[r] !== void 0;
      })));
    }));
    return pr[r] = a || "";
  };
  var br = function jsAPI(r) {
    var a = dr[r] || rr[r];
    if (H(dr, r)) {
      return a;
    }
    each(sr, (function(e) {
      a = a || rr[e + lr(r)];
      return !a;
    }));
    dr[r] = a;
    return a;
  };
  var hr = br("MutationObserver");
  var gr = br("IntersectionObserver");
  var mr = br("ResizeObserver");
  var Sr = br("ScrollTimeline");
  var yr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var wr = function selfClearTimeout(r) {
    var a;
    var e = r ? or : ir;
    var t = r ? ur : vr;
    return [ function(n) {
      t(a);
      a = e(n, p(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var Or = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = W;
    var i = a || {}, o = i.p, u = i._, l = i.g;
    var c = function invokeFunctionToDebounce(a) {
      v();
      ur(e);
      e = t = void 0;
      v = W;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return l && t ? l(t, r) : r;
    };
    var d = function flush() {
      if (v !== W) {
        c(s(n) || n);
      }
    };
    var _ = function debouncedFn() {
      var r = C(arguments);
      var a = p(o) ? o() : o;
      var i = f(a) && a >= 0;
      if (i) {
        var l = p(u) ? u() : u;
        var _ = f(l) && l >= 0;
        var b = a > 0 ? or : ir;
        var h = a > 0 ? ur : vr;
        var g = s(r);
        var m = g || r;
        var S = c.bind(0, m);
        v();
        var y = b(S, a);
        v = function clear() {
          return h(y);
        };
        if (_ && !e) {
          e = or(d, l);
        }
        t = n = m;
      } else {
        c(r);
      }
    };
    _.m = d;
    return _;
  };
  var Cr = /[^\x20\t\r\n\f]+/g;
  var xr = function classListAction(r, a, e) {
    var t = r && r.classList;
    var n;
    var v = 0;
    var i = false;
    if (t && a && s(a)) {
      var o = a.match(Cr) || [];
      i = o.length > 0;
      while (n = o[v++]) {
        i = !!e(t, n) && i;
      }
    }
    return i;
  };
  var Er = function removeClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Tr = function addClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return yr(Er, r, a);
  };
  var Hr = {
    opacity: 1,
    zIndex: 1
  };
  var Pr = function parseToZeroOrNumber(r, a) {
    var e = r || "";
    var t = a ? parseFloat(e) : parseInt(e, 10);
    return t === t ? t : 0;
  };
  var Ar = function adaptCSSVal(r, a) {
    return !Hr[r] && f(a) ? a + "px" : a;
  };
  var zr = function getCSSVal(r, a, e) {
    return String((a != null ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
  };
  var Ir = function setCSSVal(r, a, e) {
    try {
      var t = r.style;
      if (!u(t[a])) {
        t[a] = Ar(a, e);
      } else {
        t.setProperty(a, e);
      }
    } catch (n) {}
  };
  function style(r, a) {
    var e = s(a);
    var t = _(a) || e;
    if (t) {
      var n = e ? "" : {};
      if (r) {
        var v = rr.getComputedStyle(r, null);
        n = e ? zr(r, v, a) : a.reduce((function(a, e) {
          a[e] = zr(r, v, e);
          return a;
        }), n);
      }
      return n;
    }
    r && each(a, (function(e, t) {
      return Ir(r, t, a[t]);
    }));
  }
  var Dr = function getDirectionIsRTL(r) {
    return style(r, "direction") === "rtl";
  };
  var Lr = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var l = style(r, [ v, i, o, u ]);
    return {
      t: Pr(l[v], true),
      r: Pr(l[i], true),
      b: Pr(l[o], true),
      l: Pr(l[u], true)
    };
  };
  var Rr = function getTrasformTranslateValue(r, a) {
    return "translate" + (b(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Mr = "paddingTop";
  var kr = "paddingRight";
  var Vr = "paddingLeft";
  var jr = "paddingBottom";
  var Ur = "marginLeft";
  var Fr = "marginRight";
  var Br = "marginBottom";
  var Nr = "overflowX";
  var qr = "overflowY";
  var Yr = "width";
  var Wr = "height";
  var Gr = "hidden";
  var Xr = {
    w: 0,
    h: 0
  };
  var Zr = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : Xr;
  };
  var $r = function windowSize(r) {
    return Zr("inner", r || rr);
  };
  var Jr = yr(Zr, "offset");
  var Kr = yr(Zr, "client");
  var Qr = yr(Zr, "scroll");
  var ra = function fractionalSize(r) {
    var a = parseFloat(style(r, Yr)) || 0;
    var e = parseFloat(style(r, Wr)) || 0;
    return {
      w: a - tr(a),
      h: e - tr(e)
    };
  };
  var aa = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ea = function domRectHasDimensions(r) {
    return !!(r && (r[Wr] || r[Yr]));
  };
  var ta = function domRectAppeared(r, a) {
    var e = ea(r);
    var t = ea(a);
    return !t && e;
  };
  var na = function animationCurrentTime() {
    return performance.now();
  };
  var va = function animateNumber(r, a, e, t, n) {
    var v = 0;
    var i = na();
    var o = ar(0, e);
    var u = function frame(e) {
      var u = na();
      var l = u - i;
      var c = l >= o;
      var f = e ? 1 : 1 - (ar(0, i + o - u) / o || 0);
      var s = (a - r) * (p(n) ? n(f, f * o, 0, 1, o) : f) + r;
      var d = c || f === 1;
      t && t(s, f, d);
      v = d ? 0 : ir((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      vr(v);
      r && u(r);
    };
  };
  var ia = function equal(r, a, e, t) {
    if (r && a) {
      var n = true;
      each(e, (function(e) {
        var v = t ? t(r[e]) : r[e];
        var i = t ? t(a[e]) : a[e];
        if (v !== i) {
          n = false;
        }
      }));
      return n;
    }
    return false;
  };
  var oa = function equalWH(r, a) {
    return ia(r, a, [ "w", "h" ]);
  };
  var ua = function equalXY(r, a) {
    return ia(r, a, [ "x", "y" ]);
  };
  var la = function equalTRBL(r, a) {
    return ia(r, a, [ "t", "r", "b", "l" ]);
  };
  var ca = function equalBCRWH(r, a, e) {
    return ia(r, a, [ Yr, Wr ], e && function(r) {
      return tr(r);
    });
  };
  var fa;
  var sa = "passive";
  var da = function supportPassiveEvents() {
    if (u(fa)) {
      fa = false;
      try {
        rr.addEventListener(sa, W, Object.defineProperty({}, sa, {
          get: function get() {
            fa = true;
          }
        }));
      } catch (r) {}
    }
    return fa;
  };
  var pa = function splitEventNames(r) {
    return r.split(" ");
  };
  var _a = function removeEventListener(r, a, e, t) {
    each(pa(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var ba = function addEventListener(r, a, e, t) {
    var n;
    var v = da();
    var i = (n = v && t && t.S) != null ? n : v;
    var o = t && t.O || false;
    var u = t && t.C || false;
    var l = v ? {
      passive: i,
      capture: o
    } : o;
    return yr(T, pa(a).map((function(a) {
      var t = u ? function(n) {
        _a(r, a, t, o);
        e(n);
      } : e;
      r.addEventListener(a, t, l);
      return yr(_a, r, a, t, o);
    })));
  };
  var ha = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var ga = function preventDefault(r) {
    return r.preventDefault();
  };
  var ma = {
    x: 0,
    y: 0
  };
  var Sa = function absoluteCoordinates(r) {
    var a = r && aa(r);
    return a ? {
      x: a.left + rr.pageYOffset,
      y: a.top + rr.pageXOffset
    } : ma;
  };
  var ya = function getRTLCompatibleScrollPosition(r, a, e) {
    return e ? e.n ? -r : e.i ? a - r : r : r;
  };
  var wa = function getRTLCompatibleScrollBounds(r, a) {
    return [ a ? a.i ? r : 0 : 0, ya(r, r, a) ];
  };
  var Oa = function scrollElementTo(r, a) {
    var e = f(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    f(t) && (r.scrollLeft = t);
    f(n) && (r.scrollTop = n);
  };
  var Ca = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var xa = function manageListener(r, a) {
    each(_(a) ? a : [ a ], r);
  };
  var Ea = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        xa((function(r) {
          if (t) {
            t[r ? "delete" : "clear"](r);
          }
        }), e);
      } else {
        a.forEach((function(r) {
          r.clear();
        }));
        a.clear();
      }
    };
    var t = function addEvent(r, t) {
      if (s(r)) {
        var n = a.get(r) || new Set;
        a.set(r, n);
        xa((function(r) {
          p(r) && n.add(r);
        }), t);
        return yr(e, r, t);
      }
      if (d(t) && t) {
        e();
      }
      var v = P(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && O(i, addEvent(a, e));
      }));
      return yr(T, i);
    };
    var n = function triggerEvent(r, e) {
      each(C(a.get(r)), (function(r) {
        if (e && !x(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var Ta = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (p(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Ha = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && H(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Pa = {
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
  var Aa = function getOptionsDiff(r, a) {
    var e = {};
    var t = w(P(a), P(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (b(n) && b(v)) {
        A(e[t] = {}, getOptionsDiff(n, v));
        if (I(e[t])) {
          delete e[t];
        }
      } else if (H(a, t) && v !== n) {
        var i = true;
        if (_(n) || _(v)) {
          try {
            if (Ta(n) === Ta(v)) {
              i = false;
            }
          } catch (o) {}
        }
        if (i) {
          e[t] = v;
        }
      }
    }));
    return e;
  };
  var za = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Ha(r, t), e || Ha(a, t) !== void 0 ];
    };
  };
  var Ia = "data-overlayscrollbars";
  var Da = "os-environment";
  var La = Da + "-flexbox-glue";
  var Ra = La + "-max";
  var Ma = "os-scrollbar-hidden";
  var ka = Ia + "-initialize";
  var Va = Ia;
  var ja = Va + "-overflow-x";
  var Ua = Va + "-overflow-y";
  var Fa = "overflowVisible";
  var Ba = "scrollbarHidden";
  var Na = "scrollbarPressed";
  var qa = "updating";
  var Ya = Ia + "-viewport";
  var Wa = "arrange";
  var Ga = "scrollbarHidden";
  var Xa = Fa;
  var Za = Ia + "-padding";
  var $a = Xa;
  var Ja = Ia + "-content";
  var Ka = "os-size-observer";
  var Qa = Ka + "-appear";
  var re = Ka + "-listener";
  var ae = re + "-scroll";
  var ee = re + "-item";
  var te = ee + "-final";
  var ne = "os-trinsic-observer";
  var ve = "os-no-css-vars";
  var ie = "os-theme-none";
  var oe = "os-scrollbar";
  var ue = oe + "-rtl";
  var le = oe + "-horizontal";
  var ce = oe + "-vertical";
  var fe = oe + "-track";
  var se = oe + "-handle";
  var de = oe + "-visible";
  var pe = oe + "-cornerless";
  var _e = oe + "-transitionless";
  var be = oe + "-interaction";
  var he = oe + "-unusable";
  var ge = oe + "-auto-hide";
  var me = ge + "-hidden";
  var Se = oe + "-wheel";
  var ye = fe + "-interactive";
  var we = se + "-interactive";
  var Oe = {};
  var Ce = {};
  var xe = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        Oe[e] = r[e];
      }));
    }));
  };
  var Ee = function registerPluginModuleInstances(r, a, e) {
    return P(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], l = o[1], c = o[2];
      var f = e ? i : v;
      if (f) {
        var s = e ? f(u, l, a) : f(a);
        return (c || Ce)[t] = s;
      }
    }));
  };
  var Te = function getStaticPluginModuleInstance(r) {
    return Ce[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.T && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var He = {};
  var Pe = {
    get exports() {
      return He;
    },
    set exports(r) {
      He = r;
    }
  };
  (function(r) {
    function _extends() {
      r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var a = 1; a < arguments.length; a++) {
          var e = arguments[a];
          for (var t in e) {
            if (Object.prototype.hasOwnProperty.call(e, t)) {
              r[t] = e[t];
            }
          }
        }
        return r;
      }, r.exports.T = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.T = true, r.exports["default"] = r.exports;
  })(Pe);
  var Ae = /*@__PURE__*/ getDefaultExportFromCjs(He);
  var ze = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ie = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = Ae({}, a);
    var i = P(r).filter((function(r) {
      return H(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var l = r[i];
      var f = g(l);
      var d = t ? t + "." : "";
      if (f && g(o)) {
        var p = validateRecursive(l, o, e, d + i), b = p[0], h = p[1];
        n[i] = b;
        v[i] = h;
        each([ v, n ], (function(r) {
          if (I(r[i])) {
            delete r[i];
          }
        }));
      } else if (!f) {
        var m = false;
        var S = [];
        var y = [];
        var w = c(o);
        var C = !_(l) ? [ l ] : l;
        each(C, (function(r) {
          var a;
          each(ze, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = u(a);
          if (e && s(o)) {
            var t = r.split(" ");
            m = !!t.find((function(r) {
              return r === o;
            }));
            O(S, t);
          } else {
            m = ze[w] === r;
          }
          O(y, e ? ze.string : a);
          return !m;
        }));
        if (m) {
          n[i] = o;
        } else if (e) {
          console.warn('The option "' + d + i + "\" wasn't set, because it doesn't accept the type [ " + w.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + y.join(", ").toUpperCase() + " ].\r\n" + (S.length > 0 ? "\r\nValid strings are: [ " + S.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var De = function validateOptions(r, a, e) {
    return Ie(r, a, e);
  };
  var Le = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Le] = {
      static: function _static() {
        var r = ze.number;
        var a = ze.boolean;
        var e = [ ze.array, ze.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ ze.number, ze.array, ze.null ],
            ignoreMutation: [ ze.function, ze.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ ze.string, ze.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ ze.array, ze.null ]
          }
        };
        return function(r, a) {
          var e = De(i, r, a), t = e[0], n = e[1];
          return Ae({}, n, t);
        };
      }
    }, r;
  })();
  var Re = "__osSizeObserverPlugin";
  var Me = /* @__PURE__ */ function(r) {
    return r = {}, r[Re] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = Q('<div class="' + ee + '" dir="ltr"><div class="' + ee + '"><div class="' + te + '"></div></div><div class="' + ee + '"><div class="' + te + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var l = o.firstChild;
          var c = l == null ? void 0 : l.firstChild;
          var f = Jr(o);
          var s = f;
          var d = false;
          var p;
          var _ = function reset() {
            Oa(l, n);
            Oa(u, n);
          };
          var b = function onResized(r) {
            p = 0;
            if (d) {
              f = s;
              a(r === true);
            }
          };
          var h = function onScroll(r) {
            s = Jr(o);
            d = !r || !oa(s, f);
            if (r) {
              ha(r);
              if (d && !p) {
                vr(p);
                p = ir(b);
              }
            } else {
              b(r === false);
            }
            _();
          };
          var g = [ Z(r, i), ba(l, v, h), ba(u, v, h) ];
          Tr(r, ae);
          style(c, (t = {}, t[Yr] = n, t[Wr] = n, t));
          ir(_);
          return [ e ? yr(h, false) : _, g ];
        };
      }
    }, r;
  }();
  var ke = 0;
  var Ve = "__osScrollbarsHidingPlugin";
  var je = /* @__PURE__ */ function(r) {
    return r = {}, r[Ve] = {
      static: function _static() {
        return {
          H: function _createUniqueViewportArrangeElement(r) {
            var a = r.P, e = r.A, t = r.I;
            var n = !t && !a && (e.x || e.y);
            var v = n ? document.createElement("style") : false;
            if (v) {
              D(v, "id", Ya + "-" + Wa + "-" + ke);
              ke++;
            }
            return v;
          },
          D: function _overflowUpdateSegment(r, a, e, t, n, v, i) {
            var o = function arrangeViewport(a, v, i, o) {
              if (r) {
                var u = n.L;
                var l = a.R, c = a.M;
                var f = c.x, s = c.y;
                var d = l.x, p = l.y;
                var _ = o ? kr : Vr;
                var b = u[_];
                var h = u.paddingTop;
                var g = v.w + i.w;
                var m = v.h + i.h;
                var S = {
                  w: p && s ? p + g - b + "px" : "",
                  h: d && f ? d + m - h + "px" : ""
                };
                if (t) {
                  var y = t.sheet;
                  if (y) {
                    var w = y.cssRules;
                    if (w) {
                      if (!w.length) {
                        y.insertRule("#" + D(t, "id") + " + [" + Ya + "~='" + Wa + "']::before {}", 0);
                      }
                      var O = w[0].style;
                      O[Yr] = S.w;
                      O[Wr] = S.h;
                    }
                  }
                } else {
                  style(e, {
                    "--os-vaw": S.w,
                    "--os-vah": S.h
                  });
                }
              }
              return r;
            };
            var u = function undoViewportArrange(t, o, u) {
              if (r) {
                var l = u || v(t);
                var c = n.L;
                var f = l.M;
                var s = f.x, d = f.y;
                var p = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    p[r] = c[r];
                  }));
                };
                if (s) {
                  _([ Br, Mr, jr ]);
                }
                if (d) {
                  _([ Ur, Fr, Vr, kr ]);
                }
                var b = style(e, P(p));
                M(e, Ya, Wa);
                if (!a) {
                  p[Wr] = "";
                }
                style(e, p);
                return [ function() {
                  i(l, o, r, b);
                  style(e, b);
                  M(e, Ya, Wa, true);
                }, l ];
              }
              return [ W ];
            };
            return [ o, u ];
          },
          k: function _envWindowZoom() {
            var r = {
              w: 0,
              h: 0
            };
            var a = 0;
            var e = function getWindowDPR() {
              var r = rr.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return rr.devicePixelRatio || a / e;
            };
            var t = function diffBiggerThanOne(r, a) {
              var e = nr(r);
              var t = nr(a);
              return !(e === t || e + 1 === t || e - 1 === t);
            };
            return function(n, v) {
              var i = $r();
              var o = {
                w: i.w - r.w,
                h: i.h - r.h
              };
              if (o.w === 0 && o.h === 0) {
                return;
              }
              var u = {
                w: nr(o.w),
                h: nr(o.h)
              };
              var l = {
                w: nr(tr(i.w / (r.w / 100))),
                h: nr(tr(i.h / (r.h / 100)))
              };
              var c = e();
              var f = u.w > 2 && u.h > 2;
              var s = !t(l.w, l.h);
              var d = c !== a && c > 0;
              var p = f && s && d;
              var _;
              var b;
              if (p) {
                var h = v();
                b = h[0];
                _ = h[1];
                A(n.V, b);
              }
              r = i;
              a = c;
              return _;
            };
          }
        };
      }
    }, r;
  }();
  var Ue = "__osClickScrollPlugin";
  var Fe = /* @__PURE__ */ function(r) {
    return r = {}, r[Ue] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = W;
          var o = function animateClickScroll(o) {
            i = va(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var l = a();
              var c = l + t;
              var f = n >= l && n <= c;
              if (u && !f) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var s = or((function() {
                    animateClickScroll(e);
                  }), 222);
                  i = function clear() {
                    clearTimeout(s);
                  };
                }
                v++;
              }
            }));
          };
          o(0);
          return function() {
            return i();
          };
        };
      }
    }, r;
  }();
  var Be;
  var Ne = function getNativeScrollbarSize(r, a, e, t) {
    Z(r, a);
    var n = Kr(a);
    var v = Jr(a);
    var i = ra(e);
    t && G(a);
    return {
      x: v.h - n.h + i.h,
      y: v.w - n.w + i.w
    };
  };
  var qe = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Tr(r, Ma);
    try {
      a = style(r, _r("scrollbar-width")) === "none" || rr.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (t) {}
    e();
    return a;
  };
  var Ye = function getRtlScrollBehavior(r, a) {
    var e;
    style(r, (e = {}, e[Nr] = Gr, e[qr] = Gr, e.direction = "rtl", e));
    Oa(r, {
      x: 0
    });
    var t = Sa(r);
    var n = Sa(a);
    Oa(r, {
      x: -999
    });
    var v = Sa(a);
    return {
      i: t.x === n.x,
      n: n.x !== v.x
    };
  };
  var We = function getFlexboxGlue(r, a) {
    var e = Tr(r, La);
    var t = aa(r);
    var n = aa(a);
    var v = ca(n, t, true);
    var i = Tr(r, Ra);
    var o = aa(r);
    var u = aa(a);
    var l = ca(u, o, true);
    e();
    i();
    return v && l;
  };
  var Ge = function createEnvironment() {
    var r = document, e = r.body;
    var t = Q('<div class="' + Da + '"><div></div></div>');
    var n = t[0];
    var v = n.firstChild;
    var i = Ea(), o = i[0], u = i[2];
    var l = a({
      v: Ne(e, n, v),
      o: ua
    }, yr(Ne, e, n, v, true)), c = l[0], f = l[1];
    var s = f(), d = s[0];
    var p = qe(n);
    var _ = {
      x: d.x === 0,
      y: d.y === 0
    };
    var b = {
      elements: {
        host: null,
        padding: !p,
        viewport: function viewport(r) {
          return p && r === r.ownerDocument.body && r;
        },
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
    var h = A({}, Pa);
    var g = yr(A, {}, h);
    var m = yr(A, {}, b);
    var S = {
      V: d,
      A: _,
      P: p,
      I: style(n, "zIndex") === "-1",
      j: !!Sr,
      U: Ye(n, v),
      F: We(n, v),
      B: yr(o, "r"),
      N: m,
      q: function _setDefaultInitialization(r) {
        return A(b, r) && m();
      },
      Y: g,
      W: function _setDefaultOptions(r) {
        return A(h, r) && g();
      },
      G: A({}, b),
      X: A({}, h)
    };
    R(n, "style");
    G(n);
    rr.addEventListener("resize", (function() {
      var r;
      if (!p && (!_.x || !_.y)) {
        var a = Te(Ve);
        var e = a ? a.k() : W;
        r = !!e(S, c);
      }
      u("r", [ r ]);
    }));
    return S;
  };
  var Xe = function getEnvironment() {
    if (!Be) {
      Be = Ge();
    }
    return Be;
  };
  var Ze = function resolveInitialization(r, a) {
    return p(a) ? a.apply(0, r) : a;
  };
  var $e = function staticInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = Ze(r, n);
    return v || a.apply(0, r);
  };
  var Je = function dynamicInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = Ze(r, n);
    return !!v && (m(v) ? v : a.apply(0, r));
  };
  var Ke = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = Xe(), i = v.A, o = v.P, c = v.N;
    var f = c().cancel, s = f.nativeScrollbarsOverlaid, d = f.body;
    var p = t != null ? t : s;
    var _ = u(n) ? d : n;
    var b = (i.x || i.y) && p;
    var h = r && (l(_) ? !o : _);
    return !!b || !!h;
  };
  var Qe = new WeakMap;
  var rt = function addInstance(r, a) {
    Qe.set(r, a);
  };
  var at = function removeInstance(r) {
    Qe.delete(r);
  };
  var et = function getInstance(r) {
    return Qe.get(r);
  };
  var tt = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || j)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var l = ba(v, i.trim(), (function(r) {
                if (t) {
                  l();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, O(o, l));
            } else {
              T(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var nt = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.Z, o = v.$, u = v.J, l = v.K, c = v.rr, f = v.ar;
    var s = Or((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = tt(r, s, u), p = d[0], _ = d[1];
    var b = i || [];
    var h = o || [];
    var g = w(b, h);
    var m = function observerCallback(n, v) {
      if (!x(v)) {
        var i = c || W;
        var o = f || W;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, c = e.type, f = e.oldValue, _ = e.addedNodes, b = e.removedNodes;
          var g = c === "attributes";
          var m = c === "childList";
          var S = r === v;
          var w = g && n;
          var C = w ? D(v, n || "") : null;
          var x = w && f !== C;
          var E = y(h, n) && x;
          if (a && (m || !S)) {
            var T = g && x;
            var H = T && l && F(v, l);
            var P = H ? !i(v, n, f, C) : !g || T;
            var A = P && !o(e, !!H, r, t);
            each(_, (function(r) {
              return O(u, r);
            }));
            each(b, (function(r) {
              return O(u, r);
            }));
            p = p || A;
          }
          if (!a && S && x && !i(v, n, f, C)) {
            O(s, n);
            d = d || E;
          }
        }));
        _((function(r) {
          return E(u).reduce((function(a, e) {
            O(a, j(r, e));
            return F(e, r) ? O(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!x(s) || d) {
          var b = [ E(s), d ];
          !n && e.apply(0, b);
          return b;
        }
      }
    };
    var S = new hr(yr(m, false));
    return [ function() {
      S.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: g,
        subtree: a,
        childList: a,
        characterData: a
      });
      n = true;
      return function() {
        if (n) {
          p();
          S.disconnect();
          n = false;
        }
      };
    }, function() {
      if (n) {
        s.m();
        return m(true, S.takeRecords());
      }
    } ];
  };
  var vt = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.er, o = v.tr;
    var u = Te(Re);
    var l = Xe(), c = l.U;
    var f = yr(Dr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = Q('<div class="' + Ka + '"><div class="' + re + '"></div></div>');
      var l = v[0];
      var s = l.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = !a && _(r);
        var v = false;
        var o = false;
        var u = true;
        if (a) {
          var f = d(r.contentRect), s = f[0], p = f[2];
          var b = ea(s);
          var h = ta(s, p);
          var g = !p;
          o = g || h;
          v = !o && !b;
          u = !v;
        } else if (t) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var m = t ? r[0] : Dr(l);
          Oa(l, {
            x: ya(n, n, m && c),
            y: n
          });
        }
        if (!v) {
          e({
            nr: t ? r : void 0,
            vr: !t,
            tr: o
          });
        }
      };
      if (mr) {
        var b = new mr((function(r) {
          return p(r.pop());
        }));
        b.observe(s);
        O(t, (function() {
          b.disconnect();
        }));
      } else if (u) {
        var h = u(s, p, o), g = h[0], m = h[1];
        O(t, w([ Tr(l, Qa), ba(l, "animationstart", g) ], m));
      } else {
        return W;
      }
      if (i) {
        var S = a({
          v: void 0
        }, f), y = S[0];
        O(t, ba(l, "scroll", (function(r) {
          var a = y();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Er(s, "ltr rtl");
            Tr(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          ha(r);
        })));
      }
      return yr(T, O(t, Z(r, l)));
    };
  };
  var it = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = K(ne);
    var i = a({
      v: false
    }), o = i[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var t = o(n(r));
        var v = t[1];
        return v && !a && e(t) && [ t ];
      }
    };
    var l = function intersectionObserverCallback(r, a) {
      return u(a.pop(), r);
    };
    return [ function() {
      var a = [];
      if (gr) {
        t = new gr(yr(l, false), {
          root: r
        });
        t.observe(v);
        O(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = Jr(v);
          u(r);
        };
        O(a, vt(v, e)());
        e();
      }
      return yr(T, O(a, Z(r, v)));
    }, function() {
      return t && l(true, t.takeRecords());
    } ];
  };
  var ot = function createObserversSetup(r, e) {
    var t;
    var n;
    var v;
    var i;
    var o;
    var u = Xe(), l = u.P;
    var c = "[" + Va + "]";
    var d = "[" + Ya + "]";
    var b = [ "tabindex" ];
    var h = [ "wrap", "cols", "rows" ];
    var g = [ "id", "class", "style", "open" ];
    var m = {
      ir: false,
      ur: Dr(r.lr)
    };
    var S = r.lr, O = r.cr, C = r.sr, x = r.dr, E = r.pr, T = r._r, H = r.br;
    var z = Xe(), I = z.F, L = z.B;
    var M = a({
      o: oa,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = T(Xa, Fa);
      var a = T(Wa, "");
      var e = a && Ca(O);
      H(Xa, Fa);
      H(Wa, "");
      H("", qa, true);
      var t = Qr(C);
      var n = Qr(O);
      var v = ra(O);
      H(Xa, Fa, r);
      H(Wa, "", a);
      H("", qa);
      Oa(O, e);
      return {
        w: n.w + t.w + v.w,
        h: n.h + t.h + v.h
      };
    })), k = M[0];
    var V = x ? h : w(g, h);
    var j = Or(e, {
      p: function _timeout() {
        return t;
      },
      _: function _maxDelay() {
        return n;
      },
      g: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ w(P(e), P(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var U = function updateViewportAttrsFromHost(r) {
      each(r || b, (function(r) {
        if (y(b, r)) {
          var a = D(S, r);
          if (s(a)) {
            D(O, r, a);
          } else {
            R(O, r);
          }
        }
      }));
    };
    var F = function onTrinsicChanged(r, a) {
      var t = r[0], n = r[1];
      var v = {
        hr: n
      };
      A(m, {
        ir: t
      });
      !a && e(v);
      return v;
    };
    var B = function onSizeChanged(r) {
      var a = r.vr, t = r.nr, n = r.tr;
      var v = a && !n && !t;
      var i = !v && l ? j : e;
      var o = t || [], u = o[0], c = o[1];
      t && A(m, {
        ur: u
      });
      i({
        vr: a || n,
        tr: n,
        gr: c
      });
    };
    var N = function onContentMutation(r, a) {
      var t = k(), n = t[1];
      var v = {
        mr: n
      };
      var i = r ? e : j;
      n && !a && i(v);
      return v;
    };
    var W = function onHostMutation(r, a, e) {
      var t = {
        Sr: a
      };
      if (a && !e) {
        j(t);
      } else if (!E) {
        U(r);
      }
      return t;
    };
    var G = C || !I ? it(S, F) : [], X = G[0], Z = G[1];
    var $ = !E && vt(S, B, {
      tr: true,
      er: true
    });
    var J = nt(S, false, W, {
      $: g,
      Z: w(g, b)
    }), K = J[0], Q = J[1];
    var rr = E && mr && new mr((function(r) {
      var a = r[r.length - 1].contentRect;
      B({
        vr: true,
        tr: ta(a, o)
      });
      o = a;
    }));
    return [ function() {
      U();
      rr && rr.observe(S);
      var r = $ && $();
      var a = X && X();
      var e = K();
      var t = L((function(r) {
        var a = k(), e = a[1];
        j({
          yr: r,
          mr: e
        });
      }));
      return function() {
        rr && rr.disconnect();
        r && r();
        a && a();
        i && i();
        e();
        t();
      };
    }, function(r) {
      var a = r.wr, e = r.Or, o = r.Cr;
      var u = {};
      var l = a("update.ignoreMutation"), s = l[0];
      var b = a("update.attributes"), h = b[0], g = b[1];
      var m = a("update.elementEvents"), S = m[0], y = m[1];
      var x = a("update.debounce"), T = x[0], H = x[1];
      var P = y || g;
      var z = e || o;
      var I = function ignoreMutationFromOptions(r) {
        return p(s) && s(r);
      };
      if (P) {
        v && v();
        i && i();
        var D = nt(C || O, true, N, {
          Z: w(V, h || []),
          J: S,
          K: c,
          ar: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !E ? Y(e, c, d) : false;
            return n || !!q(e, "." + oe) || !!I(r);
          }
        }), L = D[0], R = D[1];
        i = L();
        v = R;
      }
      if (H) {
        j.m();
        if (_(T)) {
          var M = T[0];
          var k = T[1];
          t = f(M) && M;
          n = f(k) && k;
        } else if (f(T)) {
          t = T;
          n = false;
        } else {
          t = false;
          n = false;
        }
      }
      if (z) {
        var U = Q();
        var B = Z && Z();
        var G = v && v();
        U && A(u, W(U[0], U[1], z));
        B && A(u, F(B[0], z));
        G && A(u, N(G[0], z));
      }
      return u;
    }, m ];
  };
  var ut = function capNumber(r, a, e) {
    return ar(r, er(a, e));
  };
  var lt = function getScrollbarHandleOffsetPercent(r, a, e) {
    var t = tr(a);
    var n = wa(t, e), v = n[0], i = n[1];
    var o = (i - r) / i;
    var u = r / v;
    var l = r / i;
    var c = e ? e.n ? o : e.i ? u : l : l;
    return ut(0, 1, c);
  };
  var ct = function getScrollbarHandleLengthRatio(r, a, e, t) {
    if (t) {
      var n = e ? "x" : "y";
      var v = t.Er, i = t.Tr;
      var o = i[n];
      var u = v[n];
      return ut(0, 1, o / (o + u));
    }
    var l = e ? Yr : Wr;
    var c = aa(r)[l];
    var f = aa(a)[l];
    return ut(0, 1, c / f);
  };
  var ft = function getScrollbarHandleOffsetRatio(r, a, e, t) {
    var n = ct(r, a, t);
    return 1 / n * (1 - n) * e;
  };
  var st = function createScrollbarsSetupElements(r, a, e) {
    var t = Xe(), n = t.N, v = t.I;
    var i = n(), o = i.scrollbars;
    var u = o.slot;
    var l = a.Hr, c = a.lr, f = a.cr, s = a.Pr, p = a.Ar, b = a.zr, h = a.pr;
    var g = s ? {} : r, m = g.scrollbars;
    var S = m || {}, C = S.slot;
    var E = new Map;
    var H = function initScrollTimeline(r) {
      return Sr && new Sr({
        source: p,
        axis: r
      });
    };
    var P = H("x");
    var z = H("y");
    var I = Je([ l, c, f ], (function() {
      return h && b ? l : c;
    }), u, C);
    var D = function doRefreshScrollbarOffset(r) {
      return h && !b && N(r) === f;
    };
    var L = function cancelElementAnimations(r) {
      E.forEach((function(a, e) {
        var t = r ? y(_(r) ? r : [ r ], e) : true;
        if (t) {
          (a || []).forEach((function(r) {
            r && r.cancel();
          }));
          E.delete(e);
        }
      }));
    };
    var R = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Tr : Er;
      each(r, (function(r) {
        t(r.Ir, a);
      }));
    };
    var M = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        style(t, n);
      }));
    };
    var k = function validFiniteNumber(r) {
      var a = r || 0;
      return isFinite(a) ? a : 0;
    };
    var V = function ratioToCssPercent(r) {
      return (k(r) * 100).toFixed(3) + "%";
    };
    var j = function numberToCssPx(r) {
      return k(r) + "px";
    };
    var U = function scrollbarStructureRefreshHandleLength(r, a, e) {
      M(r, (function(r) {
        var t;
        var n = r.Dr, v = r.Lr;
        return [ n, (t = {}, t[e ? Yr : Wr] = V(ct(n, v, e, a)), t) ];
      }));
    };
    var F = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      M(r, (function(r) {
        var t = r.Dr, n = r.Lr, v = r.Ir;
        var i = Xe(), o = i.U;
        var u = e ? "x" : "y";
        var l = e ? "Left" : "Top";
        var c = a.Er;
        var f = Dr(v);
        var s = ft(t, n, lt(p["scroll" + l], c[u], e && f && o), e);
        return [ t, {
          transform: Rr(V(s), e)
        } ];
      }));
    };
    var B = function styleScrollbarPosition(r) {
      var a = r.Ir;
      var e = D(a) && a;
      var t = Ca(p), n = t.x, v = t.y;
      return [ e, {
        transform: e ? Rr({
          x: j(n),
          y: j(v)
        }) : ""
      } ];
    };
    var q = function animateElement(r, a, e, t) {
      return a && r.animate(e, {
        timeline: a,
        composite: t
      });
    };
    var Y = function animateScrollbarOffset(r, a, e, t) {
      return q(r, a, {
        transform: [ Rr(j(0), t), Rr(j(ar(0, e - .5)), t) ]
      }, "add");
    };
    var W = [];
    var X = [];
    var $ = [];
    var J = function scrollbarsAddRemoveClass(r, a, e) {
      var t = d(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && R(X, r, a);
      v && R($, r, a);
    };
    var Q = function refreshScrollbarsHandleLength(r) {
      U(X, r, true);
      U($, r);
    };
    var rr = function refreshScrollbarsHandleOffset(r) {
      if (!P && !z) {
        F(X, r, true);
        F($, r);
      }
    };
    var er = function refreshScrollbarsHandleOffsetTimeline() {
      var r = function forEachFn(r, a) {
        var e = a.Ir, t = a.Lr, n = a.Dr;
        var v = r && Dr(e);
        var i = yr(ft, n, t);
        var o = i(v ? 1 : 0, r);
        var u = i(v ? 0 : 1, r);
        L(n);
        E.set(n, [ q(n, r ? P : z, A({
          transform: [ Rr(V(o), r), Rr(V(u), r) ]
        }, v ? {
          clear: [ "left" ]
        } : {})) ]);
      };
      X.forEach(yr(r, true));
      $.forEach(yr(r, false));
    };
    var tr = function refreshScrollbarsScrollbarOffset() {
      if (!z && !z) {
        h && M(X, B);
        h && M($, B);
      }
    };
    var nr = function refreshScrollbarsScrollbarOffsetTimeline(r) {
      var a = r.Er;
      w($, X).forEach((function(r) {
        var e = r.Ir;
        L(e);
        if (D(e)) {
          E.set(e, [ Y(e, P, a.x, true), Y(e, z, a.y) ]);
        }
      }));
    };
    var vr = function generateScrollbarDOM(r) {
      var a = r ? le : ce;
      var t = r ? X : $;
      var n = x(t) ? _e : "";
      var i = K(oe + " " + a + " " + n);
      var o = K(fe);
      var u = K(se);
      var l = {
        Ir: i,
        Lr: o,
        Dr: u
      };
      if (!v) {
        Tr(i, ve);
      }
      O(t, l);
      O(W, [ Z(i, o), Z(o, u), yr(G, i), L, e(l, J, r) ]);
      return l;
    };
    var ir = yr(vr, true);
    var ur = yr(vr, false);
    var lr = function appendElements() {
      Z(I, X[0].Ir);
      Z(I, $[0].Ir);
      or((function() {
        J(_e);
      }), 300);
      return yr(T, W);
    };
    ir();
    ur();
    return [ {
      Rr: Q,
      Mr: rr,
      kr: er,
      Vr: nr,
      jr: tr,
      Ur: J,
      Fr: {
        j: P,
        Br: X,
        Nr: ir,
        qr: yr(M, X)
      },
      Yr: {
        j: z,
        Br: $,
        Nr: ur,
        qr: yr(M, $)
      }
    }, lr ];
  };
  var dt = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.lr, n = a.Ar, v = a.Wr;
    var i = function createInteractiveScrollEvents(a, i) {
      var o = a.Dr, u = a.Lr;
      var l = "scroll" + (i ? "Left" : "Top");
      var c = "client" + (i ? "X" : "Y");
      var f = i ? Yr : Wr;
      var s = i ? "left" : "top";
      var d = i ? "w" : "h";
      var p = i ? "x" : "y";
      var _ = "pointerup pointerleave pointercancel lostpointercapture";
      var b = function createRelativeHandleMove(r, a) {
        return function(t) {
          var v = e.Er;
          var i = Jr(u)[d] - Jr(o)[d];
          var c = a * t / i;
          var f = c * v[p];
          n[l] = r + f;
        };
      };
      return ba(u, "pointerdown", (function(a) {
        var e = q(a.target, "." + se) === o;
        var i = e ? o : u;
        var p = r.scrollbars;
        var h = a.button, g = a.isPrimary, m = a.pointerType;
        var S = p.pointers;
        var y = h === 0 && g && p[e ? "dragScroll" : "clickScroll"] && (S || []).includes(m);
        M(t, Va, Na, true);
        if (y) {
          var w = !e && a.shiftKey;
          var C = yr(aa, o);
          var x = yr(aa, u);
          var E = function getHandleOffset(r, a) {
            return (r || C())[s] - (a || x())[s];
          };
          var H = tr(aa(n)[f]) / Jr(n)[d] || 1;
          var P = b(n[l] || 0, 1 / H);
          var A = a[c];
          var z = C();
          var I = x();
          var D = z[f];
          var L = E(z, I) + D / 2;
          var R = A - I[s];
          var k = e ? 0 : R - L;
          var V = function releasePointerCapture(r) {
            T(j);
            i.releasePointerCapture(r.pointerId);
          };
          var j = [ yr(M, t, Va, Na), ba(v, _, V), ba(v, "selectstart", (function(r) {
            return ga(r);
          }), {
            S: false
          }), ba(u, _, V), ba(u, "pointermove", (function(r) {
            var a = r[c] - A;
            if (e || w) {
              P(k + a);
            }
          })) ];
          if (w) {
            P(k);
          } else if (!e) {
            var U = Te(Ue);
            U && O(j, U(P, E, k, D, R));
          }
          i.setPointerCapture(a.pointerId);
        }
      }));
    };
    return function(r, a, e) {
      var o = r.Ir;
      var u = wr(333), l = u[0], c = u[1];
      var f = !!n.scrollBy;
      var s = true;
      return yr(T, [ ba(o, "pointerenter", (function() {
        a(be, true);
      })), ba(o, "pointerleave pointercancel", (function() {
        a(be, false);
      })), ba(o, "wheel", (function(r) {
        var e = r.deltaX, v = r.deltaY, i = r.deltaMode;
        if (f && s && i === 0 && N(o) === t) {
          n.scrollBy({
            left: e,
            top: v,
            behavior: "smooth"
          });
        }
        s = false;
        a(Se, true);
        l((function() {
          s = true;
          a(Se);
        }));
        ga(r);
      }), {
        S: false,
        O: true
      }), ba(o, "mousedown", yr(ba, v, "click", ha, {
        C: true,
        O: true
      }), {
        O: true
      }), i(r, e), c ]);
    };
  };
  var pt = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var l;
    var c;
    var f = W;
    var s = 0;
    var d = wr(), p = d[0], _ = d[1];
    var b = wr(), h = b[0], g = b[1];
    var m = wr(100), S = m[0], y = m[1];
    var w = wr(100), C = w[0], x = w[1];
    var E = wr(100), H = E[0], P = E[1];
    var A = wr((function() {
      return s;
    })), z = A[0], I = A[1];
    var D = st(r, n, dt(a, n, t)), L = D[0], R = D[1];
    var M = n.lr, k = n.Gr, V = n.zr;
    var j = L.Ur, U = L.Rr, F = L.Mr, B = L.kr, N = L.Vr, q = L.jr;
    var Y = function manageAutoHideSuspension(r) {
      j(ge, r, true);
      j(ge, r, false);
    };
    var G = function manageScrollbarsAutoHide(r, a) {
      I();
      if (r) {
        j(me);
      } else {
        var e = yr(j, me, true);
        if (s > 0 && !a) {
          z(e);
        } else {
          e();
        }
      }
    };
    var X = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var Z = function onHostMouseEnter(r) {
      if (X(r)) {
        l = o;
        l && G(true);
      }
    };
    var $ = [ y, I, x, P, g, _, function() {
      return f();
    }, ba(M, "pointerover", Z, {
      C: true
    }), ba(M, "pointerenter", Z), ba(M, "pointerleave", (function(r) {
      if (X(r)) {
        l = false;
        o && G(false);
      }
    })), ba(M, "pointermove", (function(r) {
      X(r) && i && p((function() {
        y();
        G(true);
        C((function() {
          i && G(false);
        }));
      }));
    })), ba(k, "scroll", (function(r) {
      h((function() {
        F(t);
        u && G(true);
        S((function() {
          u && !l && G(false);
        }));
      }));
      v(r);
      q();
    })) ];
    return [ function() {
      return yr(T, O($, R()));
    }, function(r) {
      var a = r.wr, n = r.Cr, v = r.Xr, l = r.Zr;
      var d = l || {}, p = d.$r, _ = d.Jr, b = d.Kr;
      var h = v || {}, g = h.gr, m = h.tr;
      var S = e.ur;
      var y = Xe(), w = y.A;
      var O = t.Er, C = t.Qr, x = t.ra;
      var E = a("showNativeOverlaidScrollbars"), T = E[0], P = E[1];
      var A = a("scrollbars.theme"), z = A[0], I = A[1];
      var D = a("scrollbars.visibility"), L = D[0], R = D[1];
      var M = a("scrollbars.autoHide"), W = M[0], X = M[1];
      var Z = a("scrollbars.autoHideSuspend"), $ = Z[0], J = Z[1];
      var K = a("scrollbars.autoHideDelay"), Q = K[0];
      var rr = a("scrollbars.dragScroll"), ar = rr[0], er = rr[1];
      var tr = a("scrollbars.clickScroll"), nr = tr[0], vr = tr[1];
      var ir = m && !n;
      var or = x.x || x.y;
      var ur = p || _ || g || n;
      var lr = b || R;
      var cr = T && w.x && w.y;
      var fr = function setScrollbarVisibility(r, a) {
        var e = L === "visible" || L === "auto" && r === "scroll";
        j(de, e, a);
        return e;
      };
      s = Q;
      if (ir) {
        if ($ && or) {
          Y(false);
          f();
          H((function() {
            f = ba(k, "scroll", yr(Y, true), {
              C: true
            });
          }));
        } else {
          Y(true);
        }
      }
      if (P) {
        j(ie, cr);
      }
      if (I) {
        j(c);
        j(z, true);
        c = z;
      }
      if (J && !$) {
        Y(true);
      }
      if (X) {
        i = W === "move";
        o = W === "leave";
        u = W !== "never";
        G(!u, true);
      }
      if (er) {
        j(we, ar);
      }
      if (vr) {
        j(ye, nr);
      }
      if (lr) {
        var sr = fr(C.x, true);
        var dr = fr(C.y, false);
        var pr = sr && dr;
        j(pe, !pr);
      }
      if (ur) {
        U(t);
        F(t);
        B(t);
        q();
        N(t);
        j(he, !O.x, true);
        j(he, !O.y, false);
        j(ue, S && !V);
      }
    }, {}, L ];
  };
  var _t = function createStructureSetupElements(r) {
    var a = Xe();
    var e = a.N, t = a.P;
    var n = Te(Ve);
    var v = n && n.H;
    var i = e(), o = i.elements;
    var u = o.host, l = o.padding, c = o.viewport, f = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, b = _.host, h = _.padding, g = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var C = F(w, "textarea");
    var x = w.ownerDocument;
    var E = x.documentElement;
    var H = w === x.body;
    var A = x.defaultView;
    var z = yr($e, [ w ]);
    var I = yr(Je, [ w ]);
    var L = yr(Ze, [ w ]);
    var V = yr(K, "");
    var j = yr(z, V, c);
    var U = yr(I, V, f);
    var q = j(g);
    var Y = q === w;
    var X = Y && H;
    var Q = !Y && U(S);
    var rr = !Y && m(q) && q === Q;
    var ar = rr && !!L(f);
    var er = ar ? j() : q;
    var tr = ar ? Q : U();
    var nr = rr ? er : q;
    var vr = X ? E : nr;
    var ir = C ? z(V, u, b) : w;
    var or = X ? vr : ir;
    var ur = rr ? tr : Q;
    var lr = x.activeElement;
    var cr = !Y && A.top === A && lr === w;
    var fr = {
      Hr: w,
      lr: or,
      cr: vr,
      aa: !Y && I(V, l, h),
      sr: ur,
      ea: !Y && !t && v && v(a),
      Ar: X ? E : vr,
      Gr: X ? x : vr,
      ta: A,
      Wr: x,
      dr: C,
      zr: H,
      Pr: s,
      pr: Y,
      na: rr,
      _r: function _viewportHasClass(r, a) {
        return k(vr, Y ? Va : Ya, Y ? a : r);
      },
      br: function _viewportAddRemoveClass(r, a, e) {
        return M(vr, Y ? Va : Ya, Y ? a : r, e);
      }
    };
    var sr = P(fr).reduce((function(r, a) {
      var e = fr[a];
      return O(r, e && m(e) && !N(e) ? e : false);
    }), []);
    var dr = function elementIsGenerated(r) {
      return r ? y(sr, r) : null;
    };
    var pr = fr.Hr, _r = fr.lr, br = fr.aa, hr = fr.cr, gr = fr.sr, mr = fr.ea;
    var Sr = [ function() {
      R(_r, Va);
      R(_r, ka);
      R(pr, ka);
      if (H) {
        R(E, Va);
        R(E, ka);
      }
    } ];
    var wr = C && dr(_r);
    var Or = C ? pr : B([ gr, hr, br, _r, pr ].find((function(r) {
      return dr(r) === false;
    })));
    var Cr = X ? pr : gr || hr;
    var xr = yr(T, Sr);
    var Er = function appendElements() {
      D(_r, Va, Y ? "viewport" : "host");
      D(br, Za, "");
      D(gr, Ja, "");
      if (!Y) {
        D(hr, Ya, "");
      }
      var r = H && !Y ? Tr(N(w), Ma) : W;
      var a = function unwrap(r) {
        Z(N(r), B(r));
        G(r);
      };
      if (wr) {
        J(pr, _r);
        O(Sr, (function() {
          J(_r, pr);
          G(_r);
        }));
      }
      Z(Cr, Or);
      Z(_r, br);
      Z(br || _r, !Y && hr);
      Z(hr, gr);
      O(Sr, (function() {
        r();
        R(br, Za);
        R(gr, Ja);
        R(hr, ja);
        R(hr, Ua);
        R(hr, Ya);
        dr(gr) && a(gr);
        dr(hr) && a(hr);
        dr(br) && a(br);
      }));
      if (t && !Y) {
        M(hr, Ya, Ga, true);
        O(Sr, yr(R, hr, Ya));
      }
      if (mr) {
        $(hr, mr);
        O(Sr, yr(G, mr));
      }
      if (cr) {
        var e = "tabindex";
        var n = D(hr, e);
        D(hr, e, "-1");
        hr.focus();
        var v = function revertViewportTabIndex() {
          return n ? D(hr, e, n) : R(hr, e);
        };
        var i = ba(x, "pointerdown keydown", (function() {
          v();
          i();
        }));
        O(Sr, [ v, i ]);
      } else if (lr && lr.focus) {
        lr.focus();
      }
      Or = 0;
      return xr;
    };
    return [ fr, Er, xr ];
  };
  var bt = function createTrinsicUpdateSegment(r) {
    var a = r.sr;
    return function(r) {
      var e = r.Xr, t = r.va, n = r.Cr;
      var v = Xe(), i = v.F;
      var o = e || {}, u = o.hr;
      var l = t.ir;
      var c = (a || !i) && (u || n);
      if (c) {
        var f;
        style(a, (f = {}, f[Wr] = l ? "" : "100%", f));
      }
    };
  };
  var ht = function createPaddingUpdateSegment(r, e) {
    var t = r.lr, n = r.aa, v = r.cr, i = r.pr;
    var o = a({
      o: la,
      v: Lr()
    }, yr(Lr, t, "padding", "")), u = o[0], l = o[1];
    return function(r) {
      var a = r.wr, t = r.Xr, o = r.va, c = r.Cr;
      var f = l(c), s = f[0], d = f[1];
      var p = Xe(), _ = p.P, b = p.F;
      var h = t || {}, g = h.vr, m = h.mr, S = h.gr;
      var y = o.ur;
      var w = a("paddingAbsolute"), O = w[0], C = w[1];
      var x = c || !b && m;
      if (g || d || x) {
        var E = u(c);
        s = E[0];
        d = E[1];
      }
      var T = !i && (C || S || d);
      if (T) {
        var H, P;
        var z = !O || !n && !_;
        var I = s.r + s.l;
        var D = s.t + s.b;
        var L = (H = {}, H[Fr] = z && !y ? -I : 0, H[Br] = z ? -D : 0, H[Ur] = z && y ? -I : 0, 
        H.top = z ? -s.t : 0, H.right = z ? y ? -s.r : "auto" : 0, H.left = z ? y ? "auto" : -s.l : 0, 
        H[Yr] = z ? "calc(100% + " + I + "px)" : "", H);
        var R = (P = {}, P[Mr] = z ? s.t : 0, P[kr] = z ? s.r : 0, P[jr] = z ? s.b : 0, 
        P[Vr] = z ? s.l : 0, P);
        style(n || v, L);
        style(v, R);
        A(e, {
          aa: s,
          ia: !z,
          L: n ? R : A({}, L, R)
        });
      }
      return {
        oa: T
      };
    };
  };
  var gt = function createOverflowUpdateSegment(r, e) {
    var t = r.lr, n = r.aa, v = r.cr, i = r.ea, o = r.pr, u = r.br, l = r.zr, c = r.ta;
    var f = yr(ar, 0);
    var s = "visible";
    var d = 42;
    var p = {
      o: oa,
      v: {
        w: 0,
        h: 0
      }
    };
    var _ = {
      o: ua,
      v: {
        x: Gr,
        y: Gr
      }
    };
    var b = function getOverflowAmount(r, a) {
      var e = rr.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: f(r.w - a.w),
        h: f(r.h - a.h)
      };
      return {
        w: t.w > e ? t.w : 0,
        h: t.h > e ? t.h : 0
      };
    };
    var h = function overflowIsVisible(r) {
      return r.indexOf(s) === 0;
    };
    var g = Xe(), m = g.V, S = g.F, y = g.P, w = g.A;
    var O = Te(Ve);
    var C = !o && !y && (w.x || w.y);
    var x = l && o;
    var E = a(p, yr(ra, v)), T = E[0], H = E[1];
    var P = a(p, yr(Qr, v)), z = P[0], I = P[1];
    var L = a(p), R = L[0], k = L[1];
    var V = a(p), j = V[0], U = V[1];
    var F = a(_), B = F[0];
    var N = function fixFlexboxGlue(r, a) {
      var n;
      style(v, (n = {}, n[Wr] = "", n));
      if (a) {
        var i;
        var o = e.ia, u = e.aa;
        var l = r.ua, c = r.R;
        var f = ra(t);
        var s = Kr(t);
        var d = style(v, "boxSizing") === "content-box";
        var p = o || d ? u.b + u.t : 0;
        var _ = !(w.x && d);
        style(v, (i = {}, i[Wr] = s.h + f.h + (l.x && _ ? c.x : 0) - p, i));
      }
    };
    var q = function getViewportOverflowState(r, a) {
      var e = !y && !r ? d : 0;
      var t = function getStatePerAxis(r, t, n) {
        var i = style(v, r);
        var o = a ? a[r] : i;
        var u = o === "scroll";
        var l = t ? e : n;
        var c = u && !y ? l : 0;
        var f = t && !!e;
        return [ i, u, c, f ];
      };
      var n = t(Nr, w.x, m.x), i = n[0], o = n[1], u = n[2], l = n[3];
      var c = t(qr, w.y, m.y), f = c[0], s = c[1], p = c[2], _ = c[3];
      return {
        Qr: {
          x: i,
          y: f
        },
        ua: {
          x: o,
          y: s
        },
        R: {
          x: u,
          y: p
        },
        M: {
          x: l,
          y: _
        }
      };
    };
    var Y = function setViewportOverflowState(r, a, e, t) {
      var n = function setAxisOverflowStyle(r, a) {
        var e = h(r);
        var t = a && e && r.replace(s + "-", "") || "";
        return [ a && !e ? r : "", h(t) ? "hidden" : t ];
      };
      var v = n(e.x, a.x), i = v[0], o = v[1];
      var u = n(e.y, a.y), l = u[0], c = u[1];
      t[Nr] = o && l ? o : i;
      t[qr] = c && i ? c : l;
      return q(r, t);
    };
    var G = function hideNativeScrollbars(r, a, t, n) {
      var v = r.R, i = r.M;
      var o = i.x, u = i.y;
      var l = v.x, c = v.y;
      var f = e.L;
      var s = a ? Ur : Fr;
      var d = a ? Vr : kr;
      var p = f[s];
      var _ = f[Br];
      var b = f[d];
      var h = f[jr];
      n[Yr] = "calc(100% + " + (c + p * -1) + "px)";
      n[s] = -c + p;
      n[Br] = -l + _;
      if (t) {
        n[d] = b + (u ? c : 0);
        n[jr] = h + (o ? l : 0);
      }
    };
    var X = O ? O.D(C, S, v, i, e, q, G) : [ function() {
      return C;
    }, function() {
      return [ W ];
    } ], Z = X[0], $ = X[1];
    return function(r, a) {
      var i = r.wr, l = r.Xr, s = r.va, d = r.Cr;
      var p = a.oa;
      var _ = l || {}, g = _.vr, m = _.Sr, O = _.mr, C = _.hr, E = _.gr, P = _.yr;
      var L = s.ir, V = s.ur;
      var F = i("showNativeOverlaidScrollbars"), W = F[0], X = F[1];
      var J = i("overflow"), K = J[0], Q = J[1];
      var rr = W && w.x && w.y;
      var er = !o && !S && (g || O || m || X || C);
      var tr = g || p || O || E || P || X;
      var nr = h(K.x);
      var vr = h(K.y);
      var ir = nr || vr;
      var or = H(d);
      var ur = I(d);
      var lr = k(d);
      var cr = U(d);
      var fr;
      if (X && y) {
        u(Ga, Ba, !rr);
      }
      if (er) {
        fr = q(rr);
        N(fr, L);
      }
      if (tr) {
        if (ir) {
          u(Xa, Fa, false);
        }
        var sr = $(rr, V, fr), dr = sr[0], pr = sr[1];
        var _r = or = T(d), br = _r[0], hr = _r[1];
        var gr = ur = z(d), mr = gr[0], Sr = gr[1];
        var yr = Kr(v);
        var wr = mr;
        var Or = yr;
        dr();
        if ((Sr || hr || X) && pr && !rr && Z(pr, mr, br, V)) {
          Or = Kr(v);
          wr = Qr(v);
        }
        var Cr = $r(c);
        var xr = {
          w: f(ar(mr.w, wr.w) + br.w),
          h: f(ar(mr.h, wr.h) + br.h)
        };
        var Er = {
          w: f((x ? Cr.w : Or.w + f(yr.w - mr.w)) + br.w),
          h: f((x ? Cr.h : Or.h + f(yr.h - mr.h)) + br.h)
        };
        cr = j(Er);
        lr = R(b(xr, Er), d);
      }
      var Tr = cr, Hr = Tr[0], Pr = Tr[1];
      var Ar = lr, zr = Ar[0], Ir = Ar[1];
      var Dr = ur, Lr = Dr[0], Rr = Dr[1];
      var Mr = or, kr = Mr[0], Vr = Mr[1];
      var jr = {
        x: zr.w > 0,
        y: zr.h > 0
      };
      var Wr = nr && vr && (jr.x || jr.y) || nr && jr.x && !jr.y || vr && jr.y && !jr.x;
      var Gr = p || E || P || Vr || Rr || Pr || Ir || Q || X || er || tr;
      if (Gr) {
        var Xr;
        var Zr = (Xr = {}, Xr[Fr] = 0, Xr[Br] = 0, Xr[Ur] = 0, Xr[Yr] = "", Xr[Nr] = "", 
        Xr[qr] = "", Xr);
        var Jr = Y(rr, jr, K, Zr);
        var ra = Z(Jr, Lr, kr, V);
        if (!o) {
          G(Jr, V, ra, Zr);
        }
        if (er) {
          N(Jr, L);
        }
        if (o) {
          D(t, ja, Zr[Nr]);
          D(t, Ua, Zr[qr]);
        } else {
          style(v, Zr);
        }
      }
      M(t, Va, Fa, Wr);
      M(n, Za, $a, Wr);
      if (!o) {
        M(v, Ya, Xa, ir);
      }
      var aa = B(q(rr).Qr), ea = aa[0], ta = aa[1];
      A(e, {
        Qr: ea,
        Tr: {
          x: Hr.w,
          y: Hr.h
        },
        Er: {
          x: zr.w,
          y: zr.h
        },
        ra: jr
      });
      return {
        Kr: ta,
        $r: Pr,
        Jr: Ir
      };
    };
  };
  var mt = function createStructureSetup(r) {
    var a;
    var e = _t(r), t = e[0], n = e[1], v = e[2];
    var i = {
      aa: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ia: false,
      L: (a = {}, a[Fr] = 0, a[Br] = 0, a[Ur] = 0, a[Mr] = 0, a[kr] = 0, a[jr] = 0, a[Vr] = 0, 
      a),
      Tr: {
        x: 0,
        y: 0
      },
      Er: {
        x: 0,
        y: 0
      },
      Qr: {
        x: Gr,
        y: Gr
      },
      ra: {
        x: false,
        y: false
      }
    };
    var o = t.Hr, u = t.cr, l = t.br, c = t.pr;
    var f = Xe(), s = f.P, d = f.A, p = f.F;
    var _ = !s && (d.x || d.y);
    var b = [ bt(t), ht(t, i), gt(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = _ || !p;
      var t = e && Ca(u);
      l("", qa, true);
      each(b, (function(e) {
        A(a, e(r, a) || {});
      }));
      l("", qa);
      Oa(u, t);
      !c && Oa(o, 0);
      return a;
    }, i, t, v ];
  };
  var St = function createSetups(r, a, e, t) {
    var n = mt(r), v = n[0], i = n[1], o = n[2], u = n[3], l = n[4];
    var c = ot(u, (function(r) {
      m({}, r);
    })), f = c[0], s = c[1], d = c[2];
    var p = pt(r, a, d, o, u, t), _ = p[0], b = p[1], h = p[3];
    var g = function updateHintsAreTruthy(r) {
      return P(r).some((function(a) {
        return !!r[a];
      }));
    };
    var m = function update(r, t) {
      var n = r.la, v = r.Cr, o = r.Or, u = r.ca;
      var l = n || {};
      var c = !!v;
      var f = {
        wr: za(a, l, c),
        la: l,
        Cr: c
      };
      if (u) {
        b(f);
        return false;
      }
      var p = t || s(A({}, f, {
        Or: o
      }));
      var _ = i(A({}, f, {
        va: d,
        Xr: p
      }));
      b(A({}, f, {
        Xr: p,
        Zr: _
      }));
      var h = g(p);
      var m = g(_);
      var S = h || m || !I(l) || c;
      S && e(r, {
        Xr: p,
        Zr: _
      });
      return S;
    };
    return [ function() {
      var r = u.Hr, a = u.cr, e = u.Wr, t = u.zr;
      var n = t ? e.documentElement : r;
      var i = Ca(n);
      var o = [ f(), v(), _() ];
      Oa(a, i);
      return yr(T, o);
    }, m, function() {
      return {
        fa: d,
        sa: o
      };
    }, {
      da: u,
      pa: h
    }, l ];
  };
  var yt = function OverlayScrollbars(r, a, e) {
    var t = Xe(), n = t.Y;
    var v = m(r);
    var i = v ? r : r.target;
    var o = et(i);
    if (a && !o) {
      var u = false;
      var l = [];
      var c = {};
      var f = function validateOptions(r) {
        var a = z(r, true);
        var e = Te(Le);
        return e ? e(a, true) : a;
      };
      var s = A({}, n(), f(a));
      var d = Ea(), p = d[0], _ = d[1], b = d[2];
      var h = Ea(e), g = h[0], S = h[1], y = h[2];
      var w = function triggerEvent(r, a) {
        y(r, a);
        b(r, a);
      };
      var C = St(r, s, (function(r, a) {
        var e = r.la, t = r.Cr;
        var n = a.Xr, v = a.Zr;
        var i = n.vr, o = n.gr, u = n.hr, l = n.mr, c = n.Sr, f = n.tr;
        var s = v.$r, d = v.Jr, p = v.Kr;
        w("updated", [ M, {
          updateHints: {
            sizeChanged: !!i,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            contentMutation: !!l,
            hostMutation: !!c,
            appear: !!f
          },
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return w("scroll", [ M, r ]);
      })), x = C[0], E = C[1], H = C[2], D = C[3], L = C[4];
      var R = function destroy(r) {
        at(i);
        T(l);
        u = true;
        w("destroyed", [ M, r ]);
        _();
        S();
      };
      var M = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Aa(s, A(e, f(r)));
            if (!I(t)) {
              A(s, t);
              E({
                la: t
              });
            }
          }
          return A({}, s);
        },
        on: g,
        off: function off(r, a) {
          r && a && S(r, a);
        },
        state: function state() {
          var r = H(), a = r.fa, e = r.sa;
          var t = a.ur;
          var n = e.Tr, v = e.Er, i = e.Qr, o = e.ra, l = e.aa, c = e.ia;
          return A({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: l,
            paddingAbsolute: c,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = D.da, a = r.Hr, e = r.lr, t = r.aa, n = r.cr, v = r.sr, i = r.Ar, o = r.Gr;
          var u = D.pa, l = u.Fr, c = u.Yr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Dr, e = r.Lr, t = r.Ir;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Br, e = r.Nr;
            var t = f(a[0]);
            return A({}, t, {
              clone: function clone() {
                var r = f(e());
                E({
                  ca: true
                });
                return r;
              }
            });
          };
          return A({}, {
            target: a,
            host: e,
            padding: t || n,
            viewport: n,
            content: v || n,
            scrollOffsetElement: i,
            scrollEventElement: o,
            scrollbarHorizontal: s(l),
            scrollbarVertical: s(c)
          });
        },
        update: function update(r) {
          return E({
            Cr: r,
            Or: true
          });
        },
        destroy: yr(R, false),
        plugin: function plugin(r) {
          return c[P(r)[0]];
        }
      };
      O(l, [ L ]);
      rt(i, M);
      Ee(Oe, OverlayScrollbars, [ M, p, c ]);
      if (Ke(D.da.zr, !v && r.cancel)) {
        R(true);
        return M;
      }
      O(l, x());
      w("initialized", [ M ]);
      M.update(true);
      return M;
    }
    return o;
  };
  yt.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return Ee(r, yt)[0];
    }));
    xe(e);
    return a ? t : t[0];
  };
  yt.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return g(e) && !!et(e.target);
  };
  yt.env = function() {
    var r = Xe(), a = r.V, e = r.A, t = r.P, n = r.U, v = r.F, i = r.I, o = r.j, u = r.G, l = r.X, c = r.N, f = r.q, s = r.Y, d = r.W;
    return A({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: t,
      rtlScrollBehavior: n,
      flexboxGlue: v,
      cssCustomProperties: i,
      scrollTimeline: o,
      staticDefaultInitialization: u,
      staticDefaultOptions: l,
      getDefaultInitialization: c,
      setDefaultInitialization: f,
      getDefaultOptions: s,
      setDefaultOptions: d
    });
  };
  r.ClickScrollPlugin = Fe;
  r.OverlayScrollbars = yt;
  r.ScrollbarsHidingPlugin = je;
  r.SizeObserverPlugin = Me;
  Object.defineProperty(r, "T", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
