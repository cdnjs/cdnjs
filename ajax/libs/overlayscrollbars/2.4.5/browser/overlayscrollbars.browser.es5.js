/*!
 * OverlayScrollbars
 * Version: 2.4.5
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var a = function createCache(r, a) {
    var e = r.v, n = r.o, t = r.u;
    var v = e;
    var i;
    var o = function cacheUpdateContextual(r, a) {
      var e = v;
      var o = r;
      var u = a || (n ? !n(e, o) : e !== o);
      if (u || t) {
        v = o;
        i = e;
      }
      return [ v, u, i ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(a(v, i), r);
    };
    var c = function getCurrentCache(r) {
      return [ v, !!r, i ];
    };
    return [ a ? u : o, c ];
  };
  var e = typeof window !== "undefined";
  var n = e && Node.ELEMENT_NODE;
  var t = Object.prototype, v = t.toString, i = t.hasOwnProperty;
  var o = /^\[object (.+)\]$/;
  var u = function isUndefined(r) {
    return r === void 0;
  };
  var c = function isNull(r) {
    return r === null;
  };
  var l = function type(r) {
    return u(r) || c(r) ? "" + r : v.call(r).replace(o, "$1").toLowerCase();
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
  var h = function isObject(r) {
    return typeof r === "object" && !_(r) && !c(r);
  };
  var b = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = f(a) && a > -1 && a % 1 == 0;
    return _(r) || !p(r) && e ? a > 0 && h(r) ? a - 1 in r : true : false;
  };
  var g = function isPlainObject(r) {
    if (!r || !h(r) || l(r) !== "object") {
      return false;
    }
    var a;
    var e = "constructor";
    var n = r[e];
    var t = n && n.prototype;
    var v = i.call(r, e);
    var o = t && i.call(t, "isPrototypeOf");
    if (n && !v && !o) {
      return false;
    }
    for (a in r) {}
    return u(a) || i.call(r, a);
  };
  var m = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === n : false;
  };
  var S = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === n : false;
  };
  function each(r, a) {
    if (b(r)) {
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
    !e && !s(a) && b(a) ? Array.prototype.push.apply(r, a) : r.push(a);
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
  var H = function runEachAndClear(r, a, e) {
    var n = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, n);
    !e && (r.length = 0);
  };
  var T = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var P = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var A = function assignDeep(r, a, e, n, t, v, i) {
    var o = [ a, e, n, t, v, i ];
    if ((typeof r !== "object" || c(r)) && !p(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, n) {
        var t = a[n];
        if (r === t) {
          return true;
        }
        var v = _(t);
        if (t && g(t)) {
          var i = r[n];
          var o = i;
          if (v && !_(i)) {
            o = [];
          } else if (!v && !g(i)) {
            o = {};
          }
          r[n] = assignDeep(o, t);
        } else {
          r[n] = v ? t.slice() : t;
        }
      }));
    }));
    return r;
  };
  var z = function removeUndefinedProperties(r, a) {
    return each(A({}, r), (function(r, e, n) {
      if (r === void 0) {
        delete n[e];
      } else if (a && r && g(r)) {
        n[e] = removeUndefinedProperties(r, a);
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
  var R = function getValueSet(r, a) {
    return new Set((D(r, a) || "").split(" "));
  };
  var L = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var M = function attrClass(r, a, e, n) {
    if (e) {
      var t = R(r, a);
      t[n ? "add" : "delete"](e);
      var v = C(t).join(" ").trim();
      D(r, a, v);
    }
  };
  var k = function hasAttrClass(r, a, e) {
    return R(r, a).has(e);
  };
  var V = e && Element.prototype;
  var j = function find(r, a) {
    var e = [];
    var n = a ? S(a) && a : document;
    return n ? O(e, n.querySelectorAll(r)) : e;
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
    var n = q(r, a);
    var t = r && U(e, n);
    var v = q(t, a) === n;
    return n && t ? n === r || t === r || v && q(q(r, e), a) !== n : false;
  };
  var W = function noop() {};
  var G = function removeElements(r) {
    if (b(r)) {
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
      var n = a;
      var t;
      if (b(e)) {
        t = document.createDocumentFragment();
        each(e, (function(r) {
          if (r === n) {
            n = r.previousSibling;
          }
          t.appendChild(r);
        }));
      } else {
        t = e;
      }
      if (a) {
        if (!n) {
          n = r.firstChild;
        } else if (n !== a) {
          n = n.nextSibling;
        }
      }
      r.insertBefore(t, n || null);
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
  var nr = Math.round;
  var tr = Math.abs;
  var vr = rr.cancelAnimationFrame;
  var ir = rr.requestAnimationFrame;
  var or = rr.setTimeout;
  var ur = rr.clearTimeout;
  var cr = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var lr = function getDummyStyle() {
    return K().style;
  };
  var fr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var sr = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var dr = {};
  var pr = {};
  var _r = function cssProperty(r) {
    var a = pr[r];
    if (T(pr, r)) {
      return a;
    }
    var e = cr(r);
    var n = lr();
    each(fr, (function(t) {
      var v = t.replace(/-/g, "");
      var i = [ r, t + r, v + e, cr(v) + e ];
      return !(a = i.find((function(r) {
        return n[r] !== void 0;
      })));
    }));
    return pr[r] = a || "";
  };
  var hr = function jsAPI(r) {
    var a = dr[r] || rr[r];
    if (T(dr, r)) {
      return a;
    }
    each(sr, (function(e) {
      a = a || rr[e + cr(r)];
      return !a;
    }));
    dr[r] = a;
    return a;
  };
  var br = hr("MutationObserver");
  var gr = hr("IntersectionObserver");
  var mr = hr("ResizeObserver");
  var Sr = hr("ScrollTimeline");
  var yr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), n = 1; n < a; n++) {
      e[n - 1] = arguments[n];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var wr = function selfClearTimeout(r) {
    var a;
    var e = r ? or : ir;
    var n = r ? ur : vr;
    return [ function(t) {
      n(a);
      a = e(t, p(r) ? r() : r);
    }, function() {
      return n(a);
    } ];
  };
  var Or = function debounce(r, a) {
    var e;
    var n;
    var t;
    var v = W;
    var i = a || {}, o = i.p, u = i._, c = i.g;
    var l = function invokeFunctionToDebounce(a) {
      v();
      ur(e);
      e = n = void 0;
      v = W;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return c && n ? c(n, r) : r;
    };
    var d = function flush() {
      if (v !== W) {
        l(s(t) || t);
      }
    };
    var _ = function debouncedFn() {
      var r = C(arguments);
      var a = p(o) ? o() : o;
      var i = f(a) && a >= 0;
      if (i) {
        var c = p(u) ? u() : u;
        var _ = f(c) && c >= 0;
        var h = a > 0 ? or : ir;
        var b = a > 0 ? ur : vr;
        var g = s(r);
        var m = g || r;
        var S = l.bind(0, m);
        v();
        var y = h(S, a);
        v = function clear() {
          return b(y);
        };
        if (_ && !e) {
          e = or(d, c);
        }
        n = t = m;
      } else {
        l(r);
      }
    };
    _.m = d;
    return _;
  };
  var Cr = /[^\x20\t\r\n\f]+/g;
  var xr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var v = 0;
    var i = false;
    if (n && a && s(a)) {
      var o = a.match(Cr) || [];
      i = o.length > 0;
      while (t = o[v++]) {
        i = !!e(n, t) && i;
      }
    }
    return i;
  };
  var Er = function removeClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Hr = function addClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return yr(Er, r, a);
  };
  var Tr = {
    opacity: 1,
    zIndex: 1
  };
  var Pr = function parseToZeroOrNumber(r, a) {
    var e = r || "";
    var n = a ? parseFloat(e) : parseInt(e, 10);
    return n === n ? n : 0;
  };
  var Ar = function adaptCSSVal(r, a) {
    return !Tr[r] && f(a) ? a + "px" : a;
  };
  var zr = function getCSSVal(r, a, e) {
    return String((a != null ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
  };
  var Ir = function setCSSVal(r, a, e) {
    try {
      var n = r.style;
      if (!u(n[a])) {
        n[a] = Ar(a, e);
      } else {
        n.setProperty(a, e);
      }
    } catch (t) {}
  };
  var Dr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  function style(r, a) {
    var e = s(a);
    var n = _(a) || e;
    if (n) {
      var t = e ? "" : {};
      if (r) {
        var v = rr.getComputedStyle(r, null);
        t = e ? zr(r, v, a) : a.reduce((function(a, e) {
          a[e] = zr(r, v, e);
          return a;
        }), t);
      }
      return t;
    }
    r && each(a, (function(e, n) {
      return Ir(r, n, a[n]);
    }));
  }
  var Rr = function getDirectionIsRTL(r) {
    return style(r, "direction") === "rtl";
  };
  var Lr = function topRightBottomLeft(r, a, e) {
    var n = a ? a + "-" : "";
    var t = e ? "-" + e : "";
    var v = n + "top" + t;
    var i = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var c = style(r, [ v, i, o, u ]);
    return {
      t: Pr(c[v], true),
      r: Pr(c[i], true),
      b: Pr(c[o], true),
      l: Pr(c[u], true)
    };
  };
  var Mr = function getTrasformTranslateValue(r, a) {
    return "translate" + (h(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var kr = function ratioToCssPercent(r) {
    return (Dr(r) * 100).toFixed(3) + "%";
  };
  var Vr = function numberToCssPx(r) {
    return Dr(r) + "px";
  };
  var jr = "paddingTop";
  var Ur = "paddingRight";
  var Fr = "paddingLeft";
  var Br = "paddingBottom";
  var Nr = "marginLeft";
  var qr = "marginRight";
  var Yr = "marginBottom";
  var Wr = "overflowX";
  var Gr = "overflowY";
  var Xr = "width";
  var Zr = "height";
  var $r = "hidden";
  var Jr = {
    w: 0,
    h: 0
  };
  var Kr = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : Jr;
  };
  var Qr = function windowSize(r) {
    return Kr("inner", r || rr);
  };
  var ra = yr(Kr, "offset");
  var aa = yr(Kr, "client");
  var ea = yr(Kr, "scroll");
  var na = function fractionalSize(r) {
    var a = parseFloat(style(r, Xr)) || 0;
    var e = parseFloat(style(r, Zr)) || 0;
    return {
      w: a - nr(a),
      h: e - nr(e)
    };
  };
  var ta = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var va = function domRectHasDimensions(r) {
    return !!(r && (r[Zr] || r[Xr]));
  };
  var ia = function domRectAppeared(r, a) {
    var e = va(r);
    var n = va(a);
    return !n && e;
  };
  var oa = function animationCurrentTime() {
    return performance.now();
  };
  var ua = function animateNumber(r, a, e, n, t) {
    var v = 0;
    var i = oa();
    var o = ar(0, e);
    var u = function frame(e) {
      var u = oa();
      var c = u - i;
      var l = c >= o;
      var f = e ? 1 : 1 - (ar(0, i + o - u) / o || 0);
      var s = (a - r) * (p(t) ? t(f, f * o, 0, 1, o) : f) + r;
      var d = l || f === 1;
      n && n(s, f, d);
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
  var ca = function equal(r, a, e, n) {
    if (r && a) {
      var t = true;
      each(e, (function(e) {
        var v = n ? n(r[e]) : r[e];
        var i = n ? n(a[e]) : a[e];
        if (v !== i) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var la = function equalWH(r, a) {
    return ca(r, a, [ "w", "h" ]);
  };
  var fa = function equalXY(r, a) {
    return ca(r, a, [ "x", "y" ]);
  };
  var sa = function equalTRBL(r, a) {
    return ca(r, a, [ "t", "r", "b", "l" ]);
  };
  var da = function equalBCRWH(r, a, e) {
    return ca(r, a, [ Xr, Zr ], e && function(r) {
      return nr(r);
    });
  };
  var pa;
  var _a = "passive";
  var ha = function supportPassiveEvents() {
    if (u(pa)) {
      pa = false;
      try {
        rr.addEventListener(_a, W, Object.defineProperty({}, _a, {
          get: function get() {
            pa = true;
          }
        }));
      } catch (r) {}
    }
    return pa;
  };
  var ba = function splitEventNames(r) {
    return r.split(" ");
  };
  var ga = function removeEventListener(r, a, e, n) {
    each(ba(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var ma = function addEventListener(r, a, e, n) {
    var t;
    var v = ha();
    var i = (t = v && n && n.S) != null ? t : v;
    var o = n && n.O || false;
    var u = n && n.C || false;
    var c = v ? {
      passive: i,
      capture: o
    } : o;
    return yr(H, ba(a).map((function(a) {
      var n = u ? function(t) {
        ga(r, a, n, o);
        e(t);
      } : e;
      r.addEventListener(a, n, c);
      return yr(ga, r, a, n, o);
    })));
  };
  var Sa = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var ya = function preventDefault(r) {
    return r.preventDefault();
  };
  var wa = {
    x: 0,
    y: 0
  };
  var Oa = function absoluteCoordinates(r) {
    var a = r && ta(r);
    return a ? {
      x: a.left + rr.pageYOffset,
      y: a.top + rr.pageXOffset
    } : wa;
  };
  var Ca = function getRTLCompatibleScrollPosition(r, a, e) {
    return e ? e.n ? -r : e.i ? a - r : r : r;
  };
  var xa = function getRTLCompatibleScrollBounds(r, a) {
    return [ a ? a.i ? r : 0 : 0, Ca(r, r, a) ];
  };
  var Ea = function scrollElementTo(r, a) {
    var e = f(a) ? {
      x: a,
      y: a
    } : a || {}, n = e.x, t = e.y;
    f(n) && (r.scrollLeft = n);
    f(t) && (r.scrollTop = t);
  };
  var Ha = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Ta = function manageListener(r, a) {
    each(_(a) ? a : [ a ], r);
  };
  var Pa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        Ta((function(r) {
          if (n) {
            n[r ? "delete" : "clear"](r);
          }
        }), e);
      } else {
        a.forEach((function(r) {
          r.clear();
        }));
        a.clear();
      }
    };
    var n = function addEvent(r, n) {
      if (s(r)) {
        var t = a.get(r) || new Set;
        a.set(r, t);
        Ta((function(r) {
          p(r) && t.add(r);
        }), n);
        return yr(e, r, n);
      }
      if (d(n) && n) {
        e();
      }
      var v = P(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && O(i, addEvent(a, e));
      }));
      return yr(H, i);
    };
    var t = function triggerEvent(r, e) {
      each(C(a.get(r)), (function(r) {
        if (e && !x(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, e, t ];
  };
  var Aa = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (p(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var za = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && T(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ia = {
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
  var Da = function getOptionsDiff(r, a) {
    var e = {};
    var n = w(P(a), P(r));
    each(n, (function(n) {
      var t = r[n];
      var v = a[n];
      if (h(t) && h(v)) {
        A(e[n] = {}, getOptionsDiff(t, v));
        if (I(e[n])) {
          delete e[n];
        }
      } else if (T(a, n) && v !== t) {
        var i = true;
        if (_(t) || _(v)) {
          try {
            if (Aa(t) === Aa(v)) {
              i = false;
            }
          } catch (o) {}
        }
        if (i) {
          e[n] = v;
        }
      }
    }));
    return e;
  };
  var Ra = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ za(r, n), e || za(a, n) !== void 0 ];
    };
  };
  var La = "data-overlayscrollbars";
  var Ma = "os-environment";
  var ka = Ma + "-flexbox-glue";
  var Va = ka + "-max";
  var ja = "os-scrollbar-hidden";
  var Ua = La + "-initialize";
  var Fa = La;
  var Ba = Fa + "-overflow-x";
  var Na = Fa + "-overflow-y";
  var qa = "overflowVisible";
  var Ya = "scrollbarHidden";
  var Wa = "scrollbarPressed";
  var Ga = "updating";
  var Xa = La + "-viewport";
  var Za = "arrange";
  var $a = "scrollbarHidden";
  var Ja = qa;
  var Ka = La + "-padding";
  var Qa = Ja;
  var re = La + "-content";
  var ae = "os-size-observer";
  var ee = ae + "-appear";
  var ne = ae + "-listener";
  var te = ne + "-scroll";
  var ve = ne + "-item";
  var ie = ve + "-final";
  var oe = "os-trinsic-observer";
  var ue = "os-no-css-vars";
  var ce = "os-theme-none";
  var le = "os-scrollbar";
  var fe = le + "-rtl";
  var se = le + "-horizontal";
  var de = le + "-vertical";
  var pe = le + "-track";
  var _e = le + "-handle";
  var he = le + "-visible";
  var be = le + "-cornerless";
  var ge = le + "-transitionless";
  var me = le + "-interaction";
  var Se = le + "-unusable";
  var ye = le + "-auto-hide";
  var we = ye + "-hidden";
  var Oe = le + "-wheel";
  var Ce = pe + "-interactive";
  var xe = _e + "-interactive";
  var Ee = {};
  var He = {};
  var Te = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        Ee[e] = r[e];
      }));
    }));
  };
  var Pe = function registerPluginModuleInstances(r, a, e) {
    return P(r).map((function(n) {
      var t = r[n], v = t.static, i = t.instance;
      var o = e || [], u = o[0], c = o[1], l = o[2];
      var f = e ? i : v;
      if (f) {
        var s = e ? f(u, c, a) : f(a);
        return (l || He)[n] = s;
      }
    }));
  };
  var Ae = function getStaticPluginModuleInstance(r) {
    return He[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.H && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var ze = {};
  var Ie = {
    get exports() {
      return ze;
    },
    set exports(r) {
      ze = r;
    }
  };
  (function(r) {
    function _extends() {
      r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var a = 1; a < arguments.length; a++) {
          var e = arguments[a];
          for (var n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              r[n] = e[n];
            }
          }
        }
        return r;
      }, r.exports.H = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.H = true, r.exports["default"] = r.exports;
  })(Ie);
  var De = /*@__PURE__*/ getDefaultExportFromCjs(ze);
  var Re = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Le = function validateRecursive(r, a, e, n) {
    var t = {};
    var v = De({}, a);
    var i = P(r).filter((function(r) {
      return T(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var c = r[i];
      var f = g(c);
      var d = n ? n + "." : "";
      if (f && g(o)) {
        var p = validateRecursive(c, o, e, d + i), h = p[0], b = p[1];
        t[i] = h;
        v[i] = b;
        each([ v, t ], (function(r) {
          if (I(r[i])) {
            delete r[i];
          }
        }));
      } else if (!f) {
        var m = false;
        var S = [];
        var y = [];
        var w = l(o);
        var C = !_(c) ? [ c ] : c;
        each(C, (function(r) {
          var a;
          each(Re, (function(e, n) {
            if (e === r) {
              a = n;
            }
          }));
          var e = u(a);
          if (e && s(o)) {
            var n = r.split(" ");
            m = !!n.find((function(r) {
              return r === o;
            }));
            O(S, n);
          } else {
            m = Re[w] === r;
          }
          O(y, e ? Re.string : a);
          return !m;
        }));
        if (m) {
          t[i] = o;
        } else if (e) {
          console.warn('The option "' + d + i + "\" wasn't set, because it doesn't accept the type [ " + w.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + y.join(", ").toUpperCase() + " ].\r\n" + (S.length > 0 ? "\r\nValid strings are: [ " + S.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ t, v ];
  };
  var Me = function validateOptions(r, a, e) {
    return Le(r, a, e);
  };
  var ke = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[ke] = {
      static: function _static() {
        var r = Re.number;
        var a = Re.boolean;
        var e = [ Re.array, Re.null ];
        var n = "hidden scroll visible visible-hidden";
        var t = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Re.number, Re.array, Re.null ],
            ignoreMutation: [ Re.function, Re.null ]
          },
          overflow: {
            x: n,
            y: n
          },
          scrollbars: {
            theme: [ Re.string, Re.null ],
            visibility: t,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Re.array, Re.null ]
          }
        };
        return function(r, a) {
          var e = Me(i, r, a), n = e[0], t = e[1];
          return De({}, t, n);
        };
      }
    }, r;
  })();
  var Ve = "__osSizeObserverPlugin";
  var je = /* @__PURE__ */ function(r) {
    return r = {}, r[Ve] = {
      static: function _static() {
        return function(r, a, e) {
          var n;
          var t = 3333333;
          var v = "scroll";
          var i = Q('<div class="' + ve + '" dir="ltr"><div class="' + ve + '"><div class="' + ie + '"></div></div><div class="' + ve + '"><div class="' + ie + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var c = o.firstChild;
          var l = c == null ? void 0 : c.firstChild;
          var f = ra(o);
          var s = f;
          var d = false;
          var p;
          var _ = function reset() {
            Ea(c, t);
            Ea(u, t);
          };
          var h = function onResized(r) {
            p = 0;
            if (d) {
              f = s;
              a(r === true);
            }
          };
          var b = function onScroll(r) {
            s = ra(o);
            d = !r || !la(s, f);
            if (r) {
              Sa(r);
              if (d && !p) {
                vr(p);
                p = ir(h);
              }
            } else {
              h(r === false);
            }
            _();
          };
          var g = [ Z(r, i), ma(c, v, b), ma(u, v, b) ];
          Hr(r, te);
          style(l, (n = {}, n[Xr] = t, n[Zr] = t, n));
          ir(_);
          return [ e ? yr(b, false) : _, g ];
        };
      }
    }, r;
  }();
  var Ue = 0;
  var Fe = "__osScrollbarsHidingPlugin";
  var Be = /* @__PURE__ */ function(r) {
    return r = {}, r[Fe] = {
      static: function _static() {
        return {
          T: function _createUniqueViewportArrangeElement(r) {
            var a = r.P, e = r.A, n = r.I;
            var t = !n && !a && (e.x || e.y);
            var v = t ? document.createElement("style") : false;
            if (v) {
              D(v, "id", Xa + "-" + Za + "-" + Ue);
              Ue++;
            }
            return v;
          },
          D: function _overflowUpdateSegment(r, a, e, n, t, v, i) {
            var o = function arrangeViewport(a, v, i, o) {
              if (r) {
                var u = t.R;
                var c = a.L, l = a.M;
                var f = l.x, s = l.y;
                var d = c.x, p = c.y;
                var _ = o ? Ur : Fr;
                var h = u[_];
                var b = u.paddingTop;
                var g = v.w + i.w;
                var m = v.h + i.h;
                var S = {
                  w: p && s ? p + g - h + "px" : "",
                  h: d && f ? d + m - b + "px" : ""
                };
                if (n) {
                  var y = n.sheet;
                  if (y) {
                    var w = y.cssRules;
                    if (w) {
                      if (!w.length) {
                        y.insertRule("#" + D(n, "id") + " + [" + Xa + "~='" + Za + "']::before {}", 0);
                      }
                      var O = w[0].style;
                      O[Xr] = S.w;
                      O[Zr] = S.h;
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
            var u = function undoViewportArrange(n, o, u) {
              if (r) {
                var c = u || v(n);
                var l = t.R;
                var f = c.M;
                var s = f.x, d = f.y;
                var p = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    p[r] = l[r];
                  }));
                };
                if (s) {
                  _([ Yr, jr, Br ]);
                }
                if (d) {
                  _([ Nr, qr, Fr, Ur ]);
                }
                var h = style(e, P(p));
                M(e, Xa, Za);
                if (!a) {
                  p[Zr] = "";
                }
                style(e, p);
                return [ function() {
                  i(c, o, r, h);
                  style(e, h);
                  M(e, Xa, Za, true);
                }, c ];
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
            var n = function diffBiggerThanOne(r, a) {
              var e = tr(r);
              var n = tr(a);
              return !(e === n || e + 1 === n || e - 1 === n);
            };
            return function(t, v) {
              var i = Qr();
              var o = {
                w: i.w - r.w,
                h: i.h - r.h
              };
              if (o.w === 0 && o.h === 0) {
                return;
              }
              var u = {
                w: tr(o.w),
                h: tr(o.h)
              };
              var c = {
                w: tr(nr(i.w / (r.w / 100))),
                h: tr(nr(i.h / (r.h / 100)))
              };
              var l = e();
              var f = u.w > 2 && u.h > 2;
              var s = !n(c.w, c.h);
              var d = l !== a && l > 0;
              var p = f && s && d;
              var _;
              var h;
              if (p) {
                var b = v();
                h = b[0];
                _ = b[1];
                A(t.V, h);
              }
              r = i;
              a = l;
              return _;
            };
          }
        };
      }
    }, r;
  }();
  var Ne = "__osClickScrollPlugin";
  var qe = /* @__PURE__ */ function(r) {
    return r = {}, r[Ne] = {
      static: function _static() {
        return function(r, a, e, n, t) {
          var v = 0;
          var i = W;
          var o = function animateClickScroll(o) {
            i = ua(o, o + n * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var l = c + n;
              var f = t >= c && t <= l;
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
  var Ye;
  var We = function getNativeScrollbarSize(r, a, e, n) {
    Z(r, a);
    var t = aa(a);
    var v = ra(a);
    var i = na(e);
    n && G(a);
    return {
      x: v.h - t.h + i.h,
      y: v.w - t.w + i.w
    };
  };
  var Ge = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Hr(r, ja);
    try {
      a = style(r, _r("scrollbar-width")) === "none" || rr.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (n) {}
    e();
    return a;
  };
  var Xe = function getRtlScrollBehavior(r, a) {
    var e;
    style(r, (e = {}, e[Wr] = $r, e[Gr] = $r, e.direction = "rtl", e));
    Ea(r, {
      x: 0
    });
    var n = Oa(r);
    var t = Oa(a);
    Ea(r, {
      x: -999
    });
    var v = Oa(a);
    return {
      i: n.x === t.x,
      n: t.x !== v.x
    };
  };
  var Ze = function getFlexboxGlue(r, a) {
    var e = Hr(r, ka);
    var n = ta(r);
    var t = ta(a);
    var v = da(t, n, true);
    var i = Hr(r, Va);
    var o = ta(r);
    var u = ta(a);
    var c = da(u, o, true);
    e();
    i();
    return v && c;
  };
  var $e = function createEnvironment() {
    var r = document, e = r.body;
    var n = Q('<div class="' + Ma + '"><div></div></div>');
    var t = n[0];
    var v = t.firstChild;
    var i = Pa(), o = i[0], u = i[2];
    var c = a({
      v: We(e, t, v),
      o: fa
    }, yr(We, e, t, v, true)), l = c[0], f = c[1];
    var s = f(), d = s[0];
    var p = Ge(t);
    var _ = {
      x: d.x === 0,
      y: d.y === 0
    };
    var h = {
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
    var b = A({}, Ia);
    var g = yr(A, {}, b);
    var m = yr(A, {}, h);
    var S = {
      V: d,
      A: _,
      P: p,
      I: style(t, "zIndex") === "-1",
      j: !!Sr,
      U: Xe(t, v),
      F: Ze(t, v),
      B: yr(o, "r"),
      N: m,
      q: function _setDefaultInitialization(r) {
        return A(h, r) && m();
      },
      Y: g,
      W: function _setDefaultOptions(r) {
        return A(b, r) && g();
      },
      G: A({}, h),
      X: A({}, b)
    };
    L(t, "style");
    G(t);
    rr.addEventListener("resize", (function() {
      var r;
      if (!p && (!_.x || !_.y)) {
        var a = Ae(Fe);
        var e = a ? a.k() : W;
        r = !!e(S, l);
      }
      u("r", [ r ]);
    }));
    return S;
  };
  var Je = function getEnvironment() {
    if (!Ye) {
      Ye = $e();
    }
    return Ye;
  };
  var Ke = function resolveInitialization(r, a) {
    return p(a) ? a.apply(0, r) : a;
  };
  var Qe = function staticInitializationElement(r, a, e, n) {
    var t = u(n) ? e : n;
    var v = Ke(r, t);
    return v || a.apply(0, r);
  };
  var rn = function dynamicInitializationElement(r, a, e, n) {
    var t = u(n) ? e : n;
    var v = Ke(r, t);
    return !!v && (m(v) ? v : a.apply(0, r));
  };
  var an = function cancelInitialization(r, a) {
    var e = a || {}, n = e.nativeScrollbarsOverlaid, t = e.body;
    var v = Je(), i = v.A, o = v.P, l = v.N;
    var f = l().cancel, s = f.nativeScrollbarsOverlaid, d = f.body;
    var p = n != null ? n : s;
    var _ = u(t) ? d : t;
    var h = (i.x || i.y) && p;
    var b = r && (c(_) ? !o : _);
    return !!h || !!b;
  };
  var en = new WeakMap;
  var nn = function addInstance(r, a) {
    en.set(r, a);
  };
  var tn = function removeInstance(r) {
    en.delete(r);
  };
  var vn = function getInstance(r) {
    return en.get(r);
  };
  var on = function createEventContentChange(r, a, e) {
    var n = false;
    var t = e ? new WeakMap : false;
    var v = function destroy() {
      n = true;
    };
    var i = function updateElements(v) {
      if (t && e) {
        var i = e.map((function(a) {
          var e = a || [], n = e[0], t = e[1];
          var i = t && n ? (v || j)(n, r) : [];
          return [ i, t ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = t.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = ma(v, i.trim(), (function(r) {
                if (n) {
                  c();
                  t.delete(v);
                } else {
                  a(r);
                }
              }));
              t.set(v, O(o, c));
            } else {
              H(o);
              t.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var un = function createDOMObserver(r, a, e, n) {
    var t = false;
    var v = n || {}, i = v.Z, o = v.$, u = v.J, c = v.K, l = v.rr, f = v.ar;
    var s = Or((function() {
      return t && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = on(r, s, u), p = d[0], _ = d[1];
    var h = i || [];
    var b = o || [];
    var g = w(h, b);
    var m = function observerCallback(t, v) {
      if (!x(v)) {
        var i = l || W;
        var o = f || W;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var t = e.attributeName, v = e.target, l = e.type, f = e.oldValue, _ = e.addedNodes, h = e.removedNodes;
          var g = l === "attributes";
          var m = l === "childList";
          var S = r === v;
          var w = g && t;
          var C = w ? D(v, t || "") : null;
          var x = w && f !== C;
          var E = y(b, t) && x;
          if (a && (m || !S)) {
            var H = g && x;
            var T = H && c && F(v, c);
            var P = T ? !i(v, t, f, C) : !g || H;
            var A = P && !o(e, !!T, r, n);
            each(_, (function(r) {
              return O(u, r);
            }));
            each(h, (function(r) {
              return O(u, r);
            }));
            p = p || A;
          }
          if (!a && S && x && !i(v, t, f, C)) {
            O(s, t);
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
          !t && p && e(false);
          return [ false ];
        }
        if (!x(s) || d) {
          var h = [ E(s), d ];
          !t && e.apply(0, h);
          return h;
        }
      }
    };
    var S = new br(yr(m, false));
    return [ function() {
      S.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: g,
        subtree: a,
        childList: a,
        characterData: a
      });
      t = true;
      return function() {
        if (t) {
          p();
          S.disconnect();
          t = false;
        }
      };
    }, function() {
      if (t) {
        s.m();
        return m(true, S.takeRecords());
      }
    } ];
  };
  var cn = function createSizeObserver(r, e, n) {
    var t = 3333333;
    var v = n || {}, i = v.er, o = v.nr;
    var u = Ae(Ve);
    var c = Je(), l = c.U;
    var f = yr(Rr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var n = [];
      var v = Q('<div class="' + ae + '"><div class="' + ne + '"></div></div>');
      var c = v[0];
      var s = c.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var n = !a && _(r);
        var v = false;
        var o = false;
        var u = true;
        if (a) {
          var f = d(r.contentRect), s = f[0], p = f[2];
          var h = va(s);
          var b = ia(s, p);
          var g = !p;
          o = g || b;
          v = !o && !h;
          u = !v;
        } else if (n) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var m = n ? r[0] : Rr(c);
          Ea(c, {
            x: Ca(t, t, m && l),
            y: t
          });
        }
        if (!v) {
          e({
            tr: n ? r : void 0,
            vr: !n,
            nr: o
          });
        }
      };
      if (mr) {
        var h = new mr((function(r) {
          return p(r.pop());
        }));
        h.observe(s);
        O(n, (function() {
          h.disconnect();
        }));
      } else if (u) {
        var b = u(s, p, o), g = b[0], m = b[1];
        O(n, w([ Hr(c, ee), ma(c, "animationstart", g) ], m));
      } else {
        return W;
      }
      if (i) {
        var S = a({
          v: void 0
        }, f), y = S[0];
        O(n, ma(c, "scroll", (function(r) {
          var a = y();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            Er(s, "ltr rtl");
            Hr(s, e ? "rtl" : "ltr");
            p([ !!e, n, t ]);
          }
          Sa(r);
        })));
      }
      return yr(H, O(n, Z(r, c)));
    };
  };
  var ln = function createTrinsicObserver(r, e) {
    var n;
    var t = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = K(oe);
    var i = a({
      v: false
    }), o = i[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(t(r));
        var v = n[1];
        return v && !a && e(n) && [ n ];
      }
    };
    var c = function intersectionObserverCallback(r, a) {
      return u(a.pop(), r);
    };
    return [ function() {
      var a = [];
      if (gr) {
        n = new gr(yr(c, false), {
          root: r
        });
        n.observe(v);
        O(a, (function() {
          n.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = ra(v);
          u(r);
        };
        O(a, cn(v, e)());
        e();
      }
      return yr(H, O(a, Z(r, v)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var fn = function createObserversSetup(r, e) {
    var n;
    var t;
    var v;
    var i;
    var o;
    var u = Je(), c = u.P;
    var l = "[" + Fa + "]";
    var d = "[" + Xa + "]";
    var h = [ "tabindex" ];
    var b = [ "wrap", "cols", "rows" ];
    var g = [ "id", "class", "style", "open" ];
    var m = {
      ir: false,
      ur: Rr(r.cr)
    };
    var S = r.cr, O = r.lr, C = r.sr, x = r.dr, E = r.pr, H = r._r, T = r.hr;
    var z = Je(), I = z.F, R = z.B;
    var M = a({
      o: la,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = H(Ja, qa);
      var a = H(Za, "");
      var e = a && Ha(O);
      T(Ja, qa);
      T(Za, "");
      T("", Ga, true);
      var n = ea(C);
      var t = ea(O);
      var v = na(O);
      T(Ja, qa, r);
      T(Za, "", a);
      T("", Ga);
      Ea(O, e);
      return {
        w: t.w + n.w + v.w,
        h: t.h + n.h + v.h
      };
    })), k = M[0];
    var V = x ? b : w(g, b);
    var j = Or(e, {
      p: function _timeout() {
        return n;
      },
      _: function _maxDelay() {
        return t;
      },
      g: function _mergeParams(r, a) {
        var e = r[0];
        var n = a[0];
        return [ w(P(e), P(n)).reduce((function(r, a) {
          r[a] = e[a] || n[a];
          return r;
        }), {}) ];
      }
    });
    var U = function updateViewportAttrsFromHost(r) {
      each(r || h, (function(r) {
        if (y(h, r)) {
          var a = D(S, r);
          if (s(a)) {
            D(O, r, a);
          } else {
            L(O, r);
          }
        }
      }));
    };
    var F = function onTrinsicChanged(r, a) {
      var n = r[0], t = r[1];
      var v = {
        br: t
      };
      A(m, {
        ir: n
      });
      !a && e(v);
      return v;
    };
    var B = function onSizeChanged(r) {
      var a = r.vr, n = r.tr, t = r.nr;
      var v = a && !t && !n;
      var i = !v && c ? j : e;
      var o = n || [], u = o[0], l = o[1];
      n && A(m, {
        ur: u
      });
      i({
        vr: a || t,
        nr: t,
        gr: l
      });
    };
    var N = function onContentMutation(r, a) {
      var n = k(), t = n[1];
      var v = {
        mr: t
      };
      var i = r ? e : j;
      t && !a && i(v);
      return v;
    };
    var W = function onHostMutation(r, a, e) {
      var n = {
        Sr: a
      };
      if (a && !e) {
        j(n);
      } else if (!E) {
        U(r);
      }
      return n;
    };
    var G = C || !I ? ln(S, F) : [], X = G[0], Z = G[1];
    var $ = !E && cn(S, B, {
      nr: true,
      er: true
    });
    var J = un(S, false, W, {
      $: g,
      Z: w(g, h)
    }), K = J[0], Q = J[1];
    var rr = E && mr && new mr((function(r) {
      var a = r[r.length - 1].contentRect;
      B({
        vr: true,
        nr: ia(a, o)
      });
      o = a;
    }));
    return [ function() {
      U();
      rr && rr.observe(S);
      var r = $ && $();
      var a = X && X();
      var e = K();
      var n = R((function(r) {
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
        n();
      };
    }, function(r) {
      var a = r.wr, e = r.Or, o = r.Cr;
      var u = {};
      var c = a("update.ignoreMutation"), s = c[0];
      var h = a("update.attributes"), b = h[0], g = h[1];
      var m = a("update.elementEvents"), S = m[0], y = m[1];
      var x = a("update.debounce"), H = x[0], T = x[1];
      var P = y || g;
      var z = e || o;
      var I = function ignoreMutationFromOptions(r) {
        return p(s) && s(r);
      };
      if (P) {
        v && v();
        i && i();
        var D = un(C || O, true, N, {
          Z: w(V, b || []),
          J: S,
          K: l,
          ar: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !E ? Y(e, l, d) : false;
            return t || !!q(e, "." + le) || !!I(r);
          }
        }), R = D[0], L = D[1];
        i = R();
        v = L;
      }
      if (T) {
        j.m();
        if (_(H)) {
          var M = H[0];
          var k = H[1];
          n = f(M) && M;
          t = f(k) && k;
        } else if (f(H)) {
          n = H;
          t = false;
        } else {
          n = false;
          t = false;
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
  var sn = function capNumber(r, a, e) {
    return ar(r, er(a, e));
  };
  var dn = function getScrollbarHandleOffsetPercent(r, a, e) {
    var n = nr(a);
    var t = xa(n, e), v = t[0], i = t[1];
    var o = (i - r) / i;
    var u = r / v;
    var c = r / i;
    var l = e ? e.n ? o : e.i ? u : c : c;
    return sn(0, 1, l);
  };
  var pn = function getScrollbarHandleLengthRatio(r, a, e) {
    if (e) {
      var n = a ? Xr : Zr;
      var t = e.Er, v = e.Hr;
      var i = ta(v)[n];
      var o = ta(t)[n];
      return sn(0, 1, i / o);
    }
    var u = a ? "x" : "y";
    var c = r.Tr, l = r.Pr;
    var f = l[u];
    var s = c[u];
    return sn(0, 1, f / (f + s));
  };
  var _n = function getScrollbarHandleOffsetRatio(r, a, e, n) {
    var t = pn(r, n, a);
    return 1 / t * (1 - t) * e;
  };
  var hn = function createScrollbarsSetupElements(r, a, e, n) {
    var t = Je(), v = t.N, i = t.I;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var l = a.Ar, f = a.cr, s = a.lr, p = a.zr, h = a.Ir, b = a.Dr, g = a.pr;
    var m = p ? {} : r, S = m.scrollbars;
    var C = S || {}, E = C.slot;
    var T = new Map;
    var P = function initScrollTimeline(r) {
      return Sr && new Sr({
        source: h,
        axis: r
      });
    };
    var z = P("x");
    var I = P("y");
    var D = rn([ l, f, s ], (function() {
      return g && b ? l : f;
    }), c, E);
    var R = function doRefreshScrollbarOffset(r) {
      return g && !b && N(r) === s;
    };
    var L = function cancelElementAnimations(r) {
      T.forEach((function(a, e) {
        var n = r ? y(_(r) ? r : [ r ], e) : true;
        if (n) {
          (a || []).forEach((function(r) {
            r && r.cancel();
          }));
          T.delete(e);
        }
      }));
    };
    var M = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? Hr : Er;
      each(r, (function(r) {
        n(r.Rr, a);
      }));
    };
    var k = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        style(n, t);
      }));
    };
    var V = function animateElement(r, a, e, n) {
      return a && r.animate(e, {
        timeline: a,
        composite: n
      });
    };
    var j = function scrollbarStructureRefreshHandleLength(r, a) {
      k(r, (function(r) {
        var n;
        var t = r.Hr;
        return [ t, (n = {}, n[a ? Xr : Zr] = kr(pn(e, a)), n) ];
      }));
    };
    var U = function scrollbarStructureRefreshHandleOffset(r, a) {
      if (z && I) {
        r.forEach((function(r) {
          var n = r.Rr, t = r.Hr;
          var v = yr(_n, e, r);
          var i = a && Rr(n);
          var o = v(i ? 1 : 0, a);
          var u = v(i ? 0 : 1, a);
          L(t);
          T.set(t, [ V(t, a ? z : I, A({
            transform: [ Mr(kr(o), a), Mr(kr(u), a) ]
          }, i ? {
            clear: [ "left" ]
          } : {})) ]);
        }));
      } else {
        k(r, (function(r) {
          var n = r.Hr, t = r.Rr;
          var v = Je(), i = v.U;
          var o = a ? "x" : "y";
          var u = e.Tr;
          var c = Rr(t);
          var l = _n(e, r, dn(Ha(h)[o], u[o], a && c && i), a);
          return [ n, {
            transform: Mr(kr(l), a)
          } ];
        }));
      }
    };
    var F = function styleScrollbarPosition(r) {
      var a = r.Rr;
      var e = R(a) && a;
      var n = Ha(h), t = n.x, v = n.y;
      return [ e, {
        transform: e ? Mr({
          x: Vr(t),
          y: Vr(v)
        }) : ""
      } ];
    };
    var B = function animateScrollbarOffset(r, a, e, n) {
      return V(r, a, {
        transform: [ Mr(Vr(0), n), Mr(Vr(ar(0, e - .5)), n) ]
      }, "add");
    };
    var q = [];
    var Y = [];
    var W = [];
    var X = function scrollbarsAddRemoveClass(r, a, e) {
      var n = d(e);
      var t = n ? e : true;
      var v = n ? !e : true;
      t && M(Y, r, a);
      v && M(W, r, a);
    };
    var $ = function refreshScrollbarsHandleLength() {
      j(Y, true);
      j(W);
    };
    var J = function refreshScrollbarsHandleOffset() {
      U(Y, true);
      U(W);
    };
    var Q = function refreshScrollbarsScrollbarOffset() {
      if (g) {
        if (I && I) {
          var r = e.Tr;
          w(W, Y).forEach((function(a) {
            var e = a.Rr;
            L(e);
            if (R(e)) {
              T.set(e, [ B(e, z, r.x, true), B(e, I, r.y) ]);
            }
          }));
        } else {
          k(Y, F);
          k(W, F);
        }
      }
    };
    var rr = function generateScrollbarDOM(r) {
      var a = r ? se : de;
      var e = r ? Y : W;
      var t = x(e) ? ge : "";
      var v = K(le + " " + a + " " + t);
      var o = K(pe);
      var u = K(_e);
      var c = {
        Rr: v,
        Er: o,
        Hr: u
      };
      if (!i) {
        Hr(v, ue);
      }
      O(e, c);
      O(q, [ Z(v, o), Z(o, u), yr(G, v), L, n(c, X, U, r) ]);
      return c;
    };
    var er = yr(rr, true);
    var nr = yr(rr, false);
    var tr = function appendElements() {
      Z(D, Y[0].Rr);
      Z(D, W[0].Rr);
      or((function() {
        X(ge);
      }), 300);
      return yr(H, q);
    };
    er();
    nr();
    return [ {
      Lr: $,
      Mr: J,
      kr: Q,
      Vr: X,
      jr: {
        j: z,
        Ur: Y,
        Fr: er,
        Br: yr(k, Y)
      },
      Nr: {
        j: I,
        Ur: W,
        Fr: nr,
        Br: yr(k, W)
      }
    }, tr ];
  };
  var bn = function createScrollbarsSetupEvents(r, a, e) {
    var n = a.cr, t = a.Ir, v = a.qr;
    return function(a, i, o, u) {
      var c = a.Rr, l = a.Er, f = a.Hr;
      var s = wr(333), d = s[0], p = s[1];
      var _ = wr(), h = _[0], b = _[1];
      var g = yr(o, [ a ], u);
      var m = !!t.scrollBy;
      var S = "client" + (u ? "X" : "Y");
      var y = u ? Xr : Zr;
      var w = u ? "left" : "top";
      var C = u ? "w" : "h";
      var x = u ? "x" : "y";
      var E = function isAffectingTransition(r) {
        return r.propertyName.indexOf(y) > -1;
      };
      var T = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var i = function createRelativeHandleMove(r, a) {
          return function(n) {
            var v;
            var i = e.Tr;
            var o = ra(l)[C] - ra(f)[C];
            var u = a * n / o;
            var c = u * i[x];
            Ea(t, (v = {}, v[x] = r + c, v));
          };
        };
        return ma(l, "pointerdown", (function(e) {
          var o = q(e.target, "." + _e) === f;
          var u = o ? f : l;
          var c = r.scrollbars;
          var s = e.button, d = e.isPrimary, p = e.pointerType;
          var _ = c.pointers;
          var h = s === 0 && d && c[o ? "dragScroll" : "clickScroll"] && (_ || []).includes(p);
          M(n, Fa, Wa, true);
          if (h) {
            var b = !o && e.shiftKey;
            var g = yr(ta, f);
            var m = yr(ta, l);
            var E = function getHandleOffset(r, a) {
              return (r || g())[w] - (a || m())[w];
            };
            var T = nr(ta(t)[y]) / ra(t)[C] || 1;
            var P = i(Ha(t)[x] || 0, 1 / T);
            var A = e[S];
            var z = g();
            var I = m();
            var D = z[y];
            var R = E(z, I) + D / 2;
            var L = A - I[w];
            var k = o ? 0 : L - R;
            var V = function releasePointerCapture(r) {
              H(j);
              u.releasePointerCapture(r.pointerId);
            };
            var j = [ yr(M, n, Fa, Wa), ma(v, a, V), ma(v, "selectstart", (function(r) {
              return ya(r);
            }), {
              S: false
            }), ma(l, a, V), ma(l, "pointermove", (function(r) {
              var a = r[S] - A;
              if (o || b) {
                P(k + a);
              }
            })) ];
            if (b) {
              P(k);
            } else if (!o) {
              var U = Ae(Ne);
              U && O(j, U(P, E, k, D, L));
            }
            u.setPointerCapture(e.pointerId);
          }
        }));
      };
      var P = true;
      return yr(H, [ ma(c, "pointerenter", (function() {
        i(me, true);
      })), ma(c, "pointerleave pointercancel", (function() {
        i(me, false);
      })), ma(c, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, v = r.deltaMode;
        if (m && P && v === 0 && N(c) === n) {
          t.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        P = false;
        i(Oe, true);
        d((function() {
          P = true;
          i(Oe);
        }));
        ya(r);
      }), {
        S: false,
        O: true
      }), ma(f, "transitionstart", (function(r) {
        if (E(r)) {
          var a = function animateHandleOffset() {
            g();
            h(animateHandleOffset);
          };
          a();
        }
      })), ma(f, "transitionend transitioncancel", (function(r) {
        if (E(r)) {
          b();
          g();
        }
      })), ma(c, "mousedown", yr(ma, v, "click", Sa, {
        C: true,
        O: true
      }), {
        O: true
      }), T(), p, b ]);
    };
  };
  var gn = function createScrollbarsSetup(r, a, e, n, t, v) {
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = W;
    var s = 0;
    var d = wr(), p = d[0], _ = d[1];
    var h = wr(), b = h[0], g = h[1];
    var m = wr(100), S = m[0], y = m[1];
    var w = wr(100), C = w[0], x = w[1];
    var E = wr(100), T = E[0], P = E[1];
    var A = wr((function() {
      return s;
    })), z = A[0], I = A[1];
    var D = hn(r, t, n, bn(a, t, n)), R = D[0], L = D[1];
    var M = t.cr, k = t.Yr, V = t.Dr;
    var j = R.Vr, U = R.Lr, F = R.Mr, B = R.kr;
    var N = function manageAutoHideSuspension(r) {
      j(ye, r, true);
      j(ye, r, false);
    };
    var q = function manageScrollbarsAutoHide(r, a) {
      I();
      if (r) {
        j(we);
      } else {
        var e = yr(j, we, true);
        if (s > 0 && !a) {
          z(e);
        } else {
          e();
        }
      }
    };
    var Y = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var G = function onHostMouseEnter(r) {
      if (Y(r)) {
        c = o;
        c && q(true);
      }
    };
    var X = [ y, I, x, P, g, _, function() {
      return f();
    }, ma(M, "pointerover", G, {
      C: true
    }), ma(M, "pointerenter", G), ma(M, "pointerleave", (function(r) {
      if (Y(r)) {
        c = false;
        o && q(false);
      }
    })), ma(M, "pointermove", (function(r) {
      Y(r) && i && p((function() {
        y();
        q(true);
        C((function() {
          i && q(false);
        }));
      }));
    })), ma(k, "scroll", (function(r) {
      b((function() {
        F();
        u && q(true);
        S((function() {
          u && !c && q(false);
        }));
      }));
      v(r);
      B();
    })) ];
    return [ function() {
      return yr(H, O(X, L()));
    }, function(r) {
      var a = r.wr, t = r.Cr, v = r.Wr, c = r.Gr;
      var d = c || {}, p = d.Xr, _ = d.Zr, h = d.$r;
      var b = v || {}, g = b.gr, m = b.nr;
      var S = e.ur;
      var y = Je(), w = y.A;
      var O = n.Tr, C = n.Jr, x = n.Kr;
      var E = a("showNativeOverlaidScrollbars"), H = E[0], P = E[1];
      var A = a("scrollbars.theme"), z = A[0], I = A[1];
      var D = a("scrollbars.visibility"), R = D[0], L = D[1];
      var M = a("scrollbars.autoHide"), Y = M[0], W = M[1];
      var G = a("scrollbars.autoHideSuspend"), X = G[0], Z = G[1];
      var $ = a("scrollbars.autoHideDelay"), J = $[0];
      var K = a("scrollbars.dragScroll"), Q = K[0], rr = K[1];
      var ar = a("scrollbars.clickScroll"), er = ar[0], nr = ar[1];
      var tr = m && !t;
      var vr = x.x || x.y;
      var ir = p || _ || g || t;
      var or = h || L;
      var ur = H && w.x && w.y;
      var cr = function setScrollbarVisibility(r, a) {
        var e = R === "visible" || R === "auto" && r === "scroll";
        j(he, e, a);
        return e;
      };
      s = J;
      if (tr) {
        if (X && vr) {
          N(false);
          f();
          T((function() {
            f = ma(k, "scroll", yr(N, true), {
              C: true
            });
          }));
        } else {
          N(true);
        }
      }
      if (P) {
        j(ce, ur);
      }
      if (I) {
        j(l);
        j(z, true);
        l = z;
      }
      if (Z && !X) {
        N(true);
      }
      if (W) {
        i = Y === "move";
        o = Y === "leave";
        u = Y !== "never";
        q(!u, true);
      }
      if (rr) {
        j(xe, Q);
      }
      if (nr) {
        j(Ce, er);
      }
      if (or) {
        var lr = cr(C.x, true);
        var fr = cr(C.y, false);
        var sr = lr && fr;
        j(be, !sr);
      }
      if (ir) {
        U();
        F();
        B();
        j(Se, !O.x, true);
        j(Se, !O.y, false);
        j(fe, S && !V);
      }
    }, {}, R ];
  };
  var mn = function createStructureSetupElements(r) {
    var a = Je();
    var e = a.N, n = a.P;
    var t = Ae(Fe);
    var v = t && t.T;
    var i = e(), o = i.elements;
    var u = o.host, c = o.padding, l = o.viewport, f = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, h = _.host, b = _.padding, g = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var C = F(w, "textarea");
    var x = w.ownerDocument;
    var E = x.documentElement;
    var T = w === x.body;
    var A = x.defaultView;
    var z = yr(Qe, [ w ]);
    var I = yr(rn, [ w ]);
    var R = yr(Ke, [ w ]);
    var V = yr(K, "");
    var j = yr(z, V, l);
    var U = yr(I, V, f);
    var q = j(g);
    var Y = q === w;
    var X = Y && T;
    var Q = !Y && U(S);
    var rr = !Y && m(q) && q === Q;
    var ar = rr && !!R(f);
    var er = ar ? j() : q;
    var nr = ar ? Q : U();
    var tr = rr ? er : q;
    var vr = X ? E : tr;
    var ir = C ? z(V, u, h) : w;
    var or = X ? vr : ir;
    var ur = rr ? nr : Q;
    var cr = x.activeElement;
    var lr = !Y && A.top === A && cr === w;
    var fr = {
      Ar: w,
      cr: or,
      lr: vr,
      Qr: !Y && I(V, c, b),
      sr: ur,
      ra: !Y && !n && v && v(a),
      Ir: X ? E : vr,
      Yr: X ? x : vr,
      aa: A,
      qr: x,
      dr: C,
      Dr: T,
      zr: s,
      pr: Y,
      ea: rr,
      _r: function _viewportHasClass(r, a) {
        return k(vr, Y ? Fa : Xa, Y ? a : r);
      },
      hr: function _viewportAddRemoveClass(r, a, e) {
        return M(vr, Y ? Fa : Xa, Y ? a : r, e);
      }
    };
    var sr = P(fr).reduce((function(r, a) {
      var e = fr[a];
      return O(r, e && m(e) && !N(e) ? e : false);
    }), []);
    var dr = function elementIsGenerated(r) {
      return r ? y(sr, r) : null;
    };
    var pr = fr.Ar, _r = fr.cr, hr = fr.Qr, br = fr.lr, gr = fr.sr, mr = fr.ra;
    var Sr = [ function() {
      L(_r, Fa);
      L(_r, Ua);
      L(pr, Ua);
      if (T) {
        L(E, Fa);
        L(E, Ua);
      }
    } ];
    var wr = C && dr(_r);
    var Or = C ? pr : B([ gr, br, hr, _r, pr ].find((function(r) {
      return dr(r) === false;
    })));
    var Cr = X ? pr : gr || br;
    var xr = yr(H, Sr);
    var Er = function appendElements() {
      D(_r, Fa, Y ? "viewport" : "host");
      D(hr, Ka, "");
      D(gr, re, "");
      if (!Y) {
        D(br, Xa, "");
      }
      var r = T && !Y ? Hr(N(w), ja) : W;
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
      Z(_r, hr);
      Z(hr || _r, !Y && br);
      Z(br, gr);
      O(Sr, (function() {
        r();
        L(hr, Ka);
        L(gr, re);
        L(br, Ba);
        L(br, Na);
        L(br, Xa);
        dr(gr) && a(gr);
        dr(br) && a(br);
        dr(hr) && a(hr);
      }));
      if (n && !Y) {
        M(br, Xa, $a, true);
        O(Sr, yr(L, br, Xa));
      }
      if (mr) {
        $(br, mr);
        O(Sr, yr(G, mr));
      }
      if (lr) {
        var e = "tabindex";
        var t = D(br, e);
        D(br, e, "-1");
        br.focus();
        var v = function revertViewportTabIndex() {
          return t ? D(br, e, t) : L(br, e);
        };
        var i = ma(x, "pointerdown keydown", (function() {
          v();
          i();
        }));
        O(Sr, [ v, i ]);
      } else if (cr && cr.focus) {
        cr.focus();
      }
      Or = 0;
      return xr;
    };
    return [ fr, Er, xr ];
  };
  var Sn = function createTrinsicUpdateSegment(r) {
    var a = r.sr;
    return function(r) {
      var e = r.Wr, n = r.na, t = r.Cr;
      var v = Je(), i = v.F;
      var o = e || {}, u = o.br;
      var c = n.ir;
      var l = (a || !i) && (u || t);
      if (l) {
        var f;
        style(a, (f = {}, f[Zr] = c ? "" : "100%", f));
      }
    };
  };
  var yn = function createPaddingUpdateSegment(r, e) {
    var n = r.cr, t = r.Qr, v = r.lr, i = r.pr;
    var o = a({
      o: sa,
      v: Lr()
    }, yr(Lr, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.wr, n = r.Wr, o = r.na, l = r.Cr;
      var f = c(l), s = f[0], d = f[1];
      var p = Je(), _ = p.P, h = p.F;
      var b = n || {}, g = b.vr, m = b.mr, S = b.gr;
      var y = o.ur;
      var w = a("paddingAbsolute"), O = w[0], C = w[1];
      var x = l || !h && m;
      if (g || d || x) {
        var E = u(l);
        s = E[0];
        d = E[1];
      }
      var H = !i && (C || S || d);
      if (H) {
        var T, P;
        var z = !O || !t && !_;
        var I = s.r + s.l;
        var D = s.t + s.b;
        var R = (T = {}, T[qr] = z && !y ? -I : 0, T[Yr] = z ? -D : 0, T[Nr] = z && y ? -I : 0, 
        T.top = z ? -s.t : 0, T.right = z ? y ? -s.r : "auto" : 0, T.left = z ? y ? "auto" : -s.l : 0, 
        T[Xr] = z ? "calc(100% + " + I + "px)" : "", T);
        var L = (P = {}, P[jr] = z ? s.t : 0, P[Ur] = z ? s.r : 0, P[Br] = z ? s.b : 0, 
        P[Fr] = z ? s.l : 0, P);
        style(t || v, R);
        style(v, L);
        A(e, {
          Qr: s,
          ta: !z,
          R: t ? L : A({}, R, L)
        });
      }
      return {
        va: H
      };
    };
  };
  var wn = function createOverflowUpdateSegment(r, e) {
    var n = r.cr, t = r.Qr, v = r.lr, i = r.ra, o = r.pr, u = r.hr, c = r.Dr, l = r.aa;
    var f = yr(ar, 0);
    var s = "visible";
    var d = 42;
    var p = {
      o: la,
      v: {
        w: 0,
        h: 0
      }
    };
    var _ = {
      o: fa,
      v: {
        x: $r,
        y: $r
      }
    };
    var h = function getOverflowAmount(r, a) {
      var e = rr.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: f(r.w - a.w),
        h: f(r.h - a.h)
      };
      return {
        w: n.w > e ? n.w : 0,
        h: n.h > e ? n.h : 0
      };
    };
    var b = function overflowIsVisible(r) {
      return r.indexOf(s) === 0;
    };
    var g = Je(), m = g.V, S = g.F, y = g.P, w = g.A;
    var O = Ae(Fe);
    var C = !o && !y && (w.x || w.y);
    var x = c && o;
    var E = a(p, yr(na, v)), H = E[0], T = E[1];
    var P = a(p, yr(ea, v)), z = P[0], I = P[1];
    var R = a(p), L = R[0], k = R[1];
    var V = a(p), j = V[0], U = V[1];
    var F = a(_), B = F[0];
    var N = function fixFlexboxGlue(r, a) {
      var t;
      style(v, (t = {}, t[Zr] = "", t));
      if (a) {
        var i;
        var o = e.ta, u = e.Qr;
        var c = r.ia, l = r.L;
        var f = na(n);
        var s = aa(n);
        var d = style(v, "boxSizing") === "content-box";
        var p = o || d ? u.b + u.t : 0;
        var _ = !(w.x && d);
        style(v, (i = {}, i[Zr] = s.h + f.h + (c.x && _ ? l.x : 0) - p, i));
      }
    };
    var q = function getViewportOverflowState(r, a) {
      var e = !y && !r ? d : 0;
      var n = function getStatePerAxis(r, n, t) {
        var i = style(v, r);
        var o = a ? a[r] : i;
        var u = o === "scroll";
        var c = n ? e : t;
        var l = u && !y ? c : 0;
        var f = n && !!e;
        return [ i, u, l, f ];
      };
      var t = n(Wr, w.x, m.x), i = t[0], o = t[1], u = t[2], c = t[3];
      var l = n(Gr, w.y, m.y), f = l[0], s = l[1], p = l[2], _ = l[3];
      return {
        Jr: {
          x: i,
          y: f
        },
        ia: {
          x: o,
          y: s
        },
        L: {
          x: u,
          y: p
        },
        M: {
          x: c,
          y: _
        }
      };
    };
    var Y = function setViewportOverflowState(r, a, e, n) {
      var t = function setAxisOverflowStyle(r, a) {
        var e = b(r);
        var n = a && e && r.replace(s + "-", "") || "";
        return [ a && !e ? r : "", b(n) ? "hidden" : n ];
      };
      var v = t(e.x, a.x), i = v[0], o = v[1];
      var u = t(e.y, a.y), c = u[0], l = u[1];
      n[Wr] = o && c ? o : i;
      n[Gr] = l && i ? l : c;
      return q(r, n);
    };
    var G = function hideNativeScrollbars(r, a, n, t) {
      var v = r.L, i = r.M;
      var o = i.x, u = i.y;
      var c = v.x, l = v.y;
      var f = e.R;
      var s = a ? Nr : qr;
      var d = a ? Fr : Ur;
      var p = f[s];
      var _ = f[Yr];
      var h = f[d];
      var b = f[Br];
      t[Xr] = "calc(100% + " + (l + p * -1) + "px)";
      t[s] = -l + p;
      t[Yr] = -c + _;
      if (n) {
        t[d] = h + (u ? l : 0);
        t[Br] = b + (o ? c : 0);
      }
    };
    var X = O ? O.D(C, S, v, i, e, q, G) : [ function() {
      return C;
    }, function() {
      return [ W ];
    } ], Z = X[0], $ = X[1];
    return function(r, a) {
      var i = r.wr, c = r.Wr, s = r.na, d = r.Cr;
      var p = a.va;
      var _ = c || {}, g = _.vr, m = _.Sr, O = _.mr, C = _.br, E = _.gr, P = _.yr;
      var R = s.ir, V = s.ur;
      var F = i("showNativeOverlaidScrollbars"), W = F[0], X = F[1];
      var J = i("overflow"), K = J[0], Q = J[1];
      var rr = W && w.x && w.y;
      var er = !o && !S && (g || O || m || X || C);
      var nr = g || p || O || E || P || X;
      var tr = b(K.x);
      var vr = b(K.y);
      var ir = tr || vr;
      var or = T(d);
      var ur = I(d);
      var cr = k(d);
      var lr = U(d);
      var fr;
      if (X && y) {
        u($a, Ya, !rr);
      }
      if (er) {
        fr = q(rr);
        N(fr, R);
      }
      if (nr) {
        if (ir) {
          u(Ja, qa, false);
        }
        var sr = $(rr, V, fr), dr = sr[0], pr = sr[1];
        var _r = or = H(d), hr = _r[0], br = _r[1];
        var gr = ur = z(d), mr = gr[0], Sr = gr[1];
        var yr = aa(v);
        var wr = mr;
        var Or = yr;
        dr();
        if ((Sr || br || X) && pr && !rr && Z(pr, mr, hr, V)) {
          Or = aa(v);
          wr = ea(v);
        }
        var Cr = Qr(l);
        var xr = {
          w: f(ar(mr.w, wr.w) + hr.w),
          h: f(ar(mr.h, wr.h) + hr.h)
        };
        var Er = {
          w: f((x ? Cr.w : Or.w + f(yr.w - mr.w)) + hr.w),
          h: f((x ? Cr.h : Or.h + f(yr.h - mr.h)) + hr.h)
        };
        lr = j(Er);
        cr = L(h(xr, Er), d);
      }
      var Hr = lr, Tr = Hr[0], Pr = Hr[1];
      var Ar = cr, zr = Ar[0], Ir = Ar[1];
      var Dr = ur, Rr = Dr[0], Lr = Dr[1];
      var Mr = or, kr = Mr[0], Vr = Mr[1];
      var jr = {
        x: zr.w > 0,
        y: zr.h > 0
      };
      var Ur = tr && vr && (jr.x || jr.y) || tr && jr.x && !jr.y || vr && jr.y && !jr.x;
      var Fr = p || E || P || Vr || Lr || Pr || Ir || Q || X || er || nr;
      if (Fr) {
        var Br;
        var Zr = (Br = {}, Br[qr] = 0, Br[Yr] = 0, Br[Nr] = 0, Br[Xr] = "", Br[Wr] = "", 
        Br[Gr] = "", Br);
        var $r = Y(rr, jr, K, Zr);
        var Jr = Z($r, Rr, kr, V);
        if (!o) {
          G($r, V, Jr, Zr);
        }
        if (er) {
          N($r, R);
        }
        if (o) {
          D(n, Ba, Zr[Wr]);
          D(n, Na, Zr[Gr]);
        } else {
          style(v, Zr);
        }
      }
      M(n, Fa, qa, Ur);
      M(t, Ka, Qa, Ur);
      if (!o) {
        M(v, Xa, Ja, ir);
      }
      var Kr = B(q(rr).Jr), ra = Kr[0], na = Kr[1];
      A(e, {
        Jr: ra,
        Pr: {
          x: Tr.w,
          y: Tr.h
        },
        Tr: {
          x: zr.w,
          y: zr.h
        },
        Kr: jr
      });
      return {
        $r: na,
        Xr: Pr,
        Zr: Ir
      };
    };
  };
  var On = function createStructureSetup(r) {
    var a;
    var e = mn(r), n = e[0], t = e[1], v = e[2];
    var i = {
      Qr: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ta: false,
      R: (a = {}, a[qr] = 0, a[Yr] = 0, a[Nr] = 0, a[jr] = 0, a[Ur] = 0, a[Br] = 0, a[Fr] = 0, 
      a),
      Pr: {
        x: 0,
        y: 0
      },
      Tr: {
        x: 0,
        y: 0
      },
      Jr: {
        x: $r,
        y: $r
      },
      Kr: {
        x: false,
        y: false
      }
    };
    var o = n.Ar, u = n.lr, c = n.hr, l = n.pr;
    var f = Je(), s = f.P, d = f.A, p = f.F;
    var _ = !s && (d.x || d.y);
    var h = [ Sn(n), yn(n, i), wn(n, i) ];
    return [ t, function(r) {
      var a = {};
      var e = _ || !p;
      var n = e && Ha(u);
      c("", Ga, true);
      each(h, (function(e) {
        A(a, e(r, a) || {});
      }));
      c("", Ga);
      Ea(u, n);
      !l && Ea(o, 0);
      return a;
    }, i, n, v ];
  };
  var Cn = function createSetups(r, a, e, n) {
    var t = On(r), v = t[0], i = t[1], o = t[2], u = t[3], c = t[4];
    var l = fn(u, (function(r) {
      m({}, r);
    })), f = l[0], s = l[1], d = l[2];
    var p = gn(r, a, d, o, u, n), _ = p[0], h = p[1], b = p[3];
    var g = function updateHintsAreTruthy(r) {
      return P(r).some((function(a) {
        return !!r[a];
      }));
    };
    var m = function update(r, n) {
      var t = r.oa, v = r.Cr, o = r.Or, u = r.ua;
      var c = t || {};
      var l = !!v;
      var f = {
        wr: Ra(a, c, l),
        oa: c,
        Cr: l
      };
      if (u) {
        h(f);
        return false;
      }
      var p = n || s(A({}, f, {
        Or: o
      }));
      var _ = i(A({}, f, {
        na: d,
        Wr: p
      }));
      h(A({}, f, {
        Wr: p,
        Gr: _
      }));
      var b = g(p);
      var m = g(_);
      var S = b || m || !I(c) || l;
      S && e(r, {
        Wr: p,
        Gr: _
      });
      return S;
    };
    return [ function() {
      var r = u.Ar, a = u.lr, e = u.qr, n = u.Dr;
      var t = n ? e.documentElement : r;
      var i = Ha(t);
      var o = [ f(), v(), _() ];
      Ea(a, i);
      return yr(H, o);
    }, m, function() {
      return {
        ca: d,
        la: o
      };
    }, {
      fa: u,
      sa: b
    }, c ];
  };
  var xn = function OverlayScrollbars(r, a, e) {
    var n = Je(), t = n.Y;
    var v = m(r);
    var i = v ? r : r.target;
    var o = vn(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var a = z(r, true);
        var e = Ae(ke);
        return e ? e(a, true) : a;
      };
      var s = A({}, t(), f(a));
      var d = Pa(), p = d[0], _ = d[1], h = d[2];
      var b = Pa(e), g = b[0], S = b[1], y = b[2];
      var w = function triggerEvent(r, a) {
        y(r, a);
        h(r, a);
      };
      var C = Cn(r, s, (function(r, a) {
        var e = r.oa, n = r.Cr;
        var t = a.Wr, v = a.Gr;
        var i = t.vr, o = t.gr, u = t.br, c = t.mr, l = t.Sr, f = t.nr;
        var s = v.Xr, d = v.Zr, p = v.$r;
        w("updated", [ M, {
          updateHints: {
            sizeChanged: !!i,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            contentMutation: !!c,
            hostMutation: !!l,
            appear: !!f
          },
          changedOptions: e || {},
          force: !!n
        } ]);
      }), (function(r) {
        return w("scroll", [ M, r ]);
      })), x = C[0], E = C[1], T = C[2], D = C[3], R = C[4];
      var L = function destroy(r) {
        tn(i);
        H(c);
        u = true;
        w("destroyed", [ M, r ]);
        _();
        S();
      };
      var M = {
        options: function options(r, a) {
          if (r) {
            var e = a ? t() : {};
            var n = Da(s, A(e, f(r)));
            if (!I(n)) {
              A(s, n);
              E({
                oa: n
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
          var r = T(), a = r.ca, e = r.la;
          var n = a.ur;
          var t = e.Pr, v = e.Tr, i = e.Jr, o = e.Kr, c = e.Qr, l = e.ta;
          return A({}, {
            overflowEdge: t,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: c,
            paddingAbsolute: l,
            directionRTL: n,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = D.fa, a = r.Ar, e = r.cr, n = r.Qr, t = r.lr, v = r.sr, i = r.Ir, o = r.Yr;
          var u = D.sa, c = u.jr, l = u.Nr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Hr, e = r.Er, n = r.Rr;
            return {
              scrollbar: n,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Ur, e = r.Fr;
            var n = f(a[0]);
            return A({}, n, {
              clone: function clone() {
                var r = f(e());
                E({
                  ua: true
                });
                return r;
              }
            });
          };
          return A({}, {
            target: a,
            host: e,
            padding: n || t,
            viewport: t,
            content: v || t,
            scrollOffsetElement: i,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(l)
          });
        },
        update: function update(r) {
          return E({
            Cr: r,
            Or: true
          });
        },
        destroy: yr(L, false),
        plugin: function plugin(r) {
          return l[P(r)[0]];
        }
      };
      O(c, [ R ]);
      nn(i, M);
      Pe(Ee, OverlayScrollbars, [ M, p, l ]);
      if (an(D.fa.Dr, !v && r.cancel)) {
        L(true);
        return M;
      }
      O(c, x());
      w("initialized", [ M ]);
      M.update(true);
      return M;
    }
    return o;
  };
  xn.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var n = e.map((function(r) {
      return Pe(r, xn)[0];
    }));
    Te(e);
    return a ? n : n[0];
  };
  xn.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return g(e) && !!vn(e.target);
  };
  xn.env = function() {
    var r = Je(), a = r.V, e = r.A, n = r.P, t = r.U, v = r.F, i = r.I, o = r.j, u = r.G, c = r.X, l = r.N, f = r.q, s = r.Y, d = r.W;
    return A({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: n,
      rtlScrollBehavior: t,
      flexboxGlue: v,
      cssCustomProperties: i,
      scrollTimeline: o,
      staticDefaultInitialization: u,
      staticDefaultOptions: c,
      getDefaultInitialization: l,
      setDefaultInitialization: f,
      getDefaultOptions: s,
      setDefaultOptions: d
    });
  };
  r.ClickScrollPlugin = qe;
  r.OverlayScrollbars = xn;
  r.ScrollbarsHidingPlugin = Be;
  r.SizeObserverPlugin = je;
  Object.defineProperty(r, "H", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
