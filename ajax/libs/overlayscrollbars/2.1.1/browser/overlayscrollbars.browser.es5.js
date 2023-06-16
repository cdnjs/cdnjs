/*!
 * OverlayScrollbars
 * Version: 2.1.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  function each(r, a) {
    if (g(r)) {
      for (var e = 0; e < r.length; e++) {
        if (false === a(r[e], e, r)) {
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
  function style(r, a) {
    var e = c(a);
    var n = h(a) || e;
    if (n) {
      var t = e ? "" : {};
      if (r) {
        var i = window.getComputedStyle(r, null);
        t = e ? Hr(r, i, a) : a.reduce((function(a, e) {
          a[e] = Hr(r, i, e);
          return a;
        }), t);
      }
      return t;
    }
    r && each(z(a), (function(e) {
      return Mr(r, e, a[e]);
    }));
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(r) {
      for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) {
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            r[n] = e[n];
          }
        }
      }
      return r;
    };
    return _extends.apply(this, arguments);
  }
  var a = function createCache(r, a) {
    var e = r.v, n = r.o, t = r.u;
    var i = e;
    var v;
    var o = function cacheUpdateContextual(r, a) {
      var e = i;
      var o = r;
      var u = a || (n ? !n(e, o) : e !== o);
      if (u || t) {
        i = o;
        v = e;
      }
      return [ i, u, v ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(a(i, v), r);
    };
    var f = function getCurrentCache(r) {
      return [ i, !!r, v ];
    };
    return [ a ? u : o, f ];
  };
  var e = function isClient() {
    return "undefined" !== typeof window;
  };
  var n = e() && Node.ELEMENT_NODE;
  var t = Object.prototype, i = t.toString, v = t.hasOwnProperty;
  var o = function isUndefined(r) {
    return void 0 === r;
  };
  var u = function isNull(r) {
    return null === r;
  };
  var f = function type(r) {
    return o(r) || u(r) ? "" + r : i.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  };
  var l = function isNumber(r) {
    return "number" === typeof r;
  };
  var c = function isString(r) {
    return "string" === typeof r;
  };
  var s = function isBoolean(r) {
    return "boolean" === typeof r;
  };
  var d = function isFunction(r) {
    return "function" === typeof r;
  };
  var h = function isArray(r) {
    return Array.isArray(r);
  };
  var p = function isObject(r) {
    return "object" === typeof r && !h(r) && !u(r);
  };
  var g = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = l(a) && a > -1 && a % 1 == 0;
    return h(r) || !d(r) && e ? a > 0 && p(r) ? a - 1 in r : true : false;
  };
  var w = function isPlainObject(r) {
    if (!r || !p(r) || "object" !== f(r)) {
      return false;
    }
    var a;
    var e = "constructor";
    var n = r[e];
    var t = n && n.prototype;
    var i = v.call(r, e);
    var u = t && v.call(t, "isPrototypeOf");
    if (n && !i && !u) {
      return false;
    }
    for (a in r) {}
    return o(a) || v.call(r, a);
  };
  var b = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === n : false;
  };
  var m = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === n : false;
  };
  var y = function indexOf(r, a, e) {
    return r.indexOf(a, e);
  };
  var S = function push(r, a, e) {
    !e && !c(a) && g(a) ? Array.prototype.push.apply(r, a) : r.push(a);
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
        S(e, r);
      }));
    } else {
      each(r, (function(r) {
        S(e, r);
      }));
    }
    return e;
  };
  var O = function isEmptyArray(r) {
    return !!r && 0 === r.length;
  };
  var x = function runEachAndClear(r, a, e) {
    var n = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, n);
    !e && (r.length = 0);
  };
  var E = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var z = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var P = function assignDeep(r, a, e, n, t, i, v) {
    var o = [ a, e, n, t, i, v ];
    if (("object" !== typeof r || u(r)) && !d(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(z(a), (function(e) {
        var n = a[e];
        if (r === n) {
          return true;
        }
        var t = h(n);
        if (n && (w(n) || t)) {
          var i = r[e];
          var v = i;
          if (t && !h(i)) {
            v = [];
          } else if (!t && !w(i)) {
            v = {};
          }
          r[e] = assignDeep(v, n);
        } else {
          r[e] = n;
        }
      }));
    }));
    return r;
  };
  var T = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var A = function getSetProp(r, a, e, n) {
    if (o(n)) {
      return e ? e[r] : a;
    }
    e && (c(n) || l(n)) && (e[r] = n);
  };
  var L = function attr(r, a, e) {
    if (o(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var H = function attrClass(r, a, e, n) {
    if (e) {
      var t = L(r, a) || "";
      var i = new Set(t.split(" "));
      i[n ? "add" : "delete"](e);
      L(r, a, C(i).join(" ").trim());
    }
  };
  var M = function hasAttrClass(r, a, e) {
    var n = L(r, a) || "";
    var t = new Set(n.split(" "));
    return t.has(e);
  };
  var R = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var I = function scrollLeft(r, a) {
    return A("scrollLeft", 0, r, a);
  };
  var D = function scrollTop(r, a) {
    return A("scrollTop", 0, r, a);
  };
  var k = e() && Element.prototype;
  var V = function find(r, a) {
    var e = [];
    var n = a ? m(a) ? a : null : document;
    return n ? S(e, n.querySelectorAll(r)) : e;
  };
  var B = function findFirst(r, a) {
    var e = a ? m(a) ? a : null : document;
    return e ? e.querySelector(r) : null;
  };
  var j = function is(r, a) {
    if (m(r)) {
      var e = k.matches || k.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var U = function contents(r) {
    return r ? C(r.childNodes) : [];
  };
  var q = function parent(r) {
    return r ? r.parentElement : null;
  };
  var F = function closest(r, a) {
    if (m(r)) {
      var e = k.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (j(r, a)) {
          return r;
        }
        r = q(r);
      } while (r);
    }
    return null;
  };
  var N = function liesBetween(r, a, e) {
    var n = r && F(r, a);
    var t = r && B(e, n);
    var i = F(t, a) === n;
    return n && t ? n === r || t === r || i && F(F(r, e), a) !== n : false;
  };
  var Y = function before(r, a, e) {
    if (e && r) {
      var n = a;
      var t;
      if (g(e)) {
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
    }
  };
  var W = function appendChildren(r, a) {
    Y(r, null, a);
  };
  var G = function insertBefore(r, a) {
    Y(q(r), r, a);
  };
  var X = function insertAfter(r, a) {
    Y(q(r), r && r.nextSibling, a);
  };
  var Z = function removeElements(r) {
    if (g(r)) {
      each(C(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = q(r);
      if (a) {
        a.removeChild(r);
      }
    }
  };
  var $ = function createDiv(r) {
    var a = document.createElement("div");
    if (r) {
      L(a, "class", r);
    }
    return a;
  };
  var J = function createDOM(r) {
    var a = $();
    a.innerHTML = r.trim();
    return each(U(a), (function(r) {
      return Z(r);
    }));
  };
  var K = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var Q = function getDummyStyle() {
    return $().style;
  };
  var rr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var ar = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var er = {};
  var nr = {};
  var tr = function cssProperty(r) {
    var a = nr[r];
    if (E(nr, r)) {
      return a;
    }
    var e = K(r);
    var n = Q();
    each(rr, (function(t) {
      var i = t.replace(/-/g, "");
      var v = [ r, t + r, i + e, K(i) + e ];
      return !(a = v.find((function(r) {
        return void 0 !== n[r];
      })));
    }));
    return nr[r] = a || "";
  };
  var ir = function jsAPI(r) {
    if (e()) {
      var a = er[r] || window[r];
      if (E(er, r)) {
        return a;
      }
      each(ar, (function(e) {
        a = a || window[e + K(r)];
        return !a;
      }));
      er[r] = a;
      return a;
    }
  };
  var vr = ir("MutationObserver");
  var or = ir("IntersectionObserver");
  var ur = ir("ResizeObserver");
  var fr = ir("cancelAnimationFrame");
  var lr = ir("requestAnimationFrame");
  var cr = e() && window.setTimeout;
  var sr = e() && window.clearTimeout;
  var dr = function equal(r, a, e, n) {
    if (r && a) {
      var t = true;
      each(e, (function(e) {
        var i = n ? n(r[e]) : r[e];
        var v = n ? n(a[e]) : a[e];
        if (i !== v) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var hr = function equalWH(r, a) {
    return dr(r, a, [ "w", "h" ]);
  };
  var pr = function equalXY(r, a) {
    return dr(r, a, [ "x", "y" ]);
  };
  var gr = function equalTRBL(r, a) {
    return dr(r, a, [ "t", "r", "b", "l" ]);
  };
  var _r = function equalBCRWH(r, a, e) {
    return dr(r, a, [ "width", "height" ], e && function(r) {
      return Math.round(r);
    });
  };
  var wr = function noop() {};
  var br = function selfClearTimeout(r) {
    var a;
    var e = r ? cr : lr;
    var n = r ? sr : fr;
    return [ function(t) {
      n(a);
      a = e(t, d(r) ? r() : r);
    }, function() {
      return n(a);
    } ];
  };
  var mr = function debounce(r, a) {
    var e;
    var n;
    var t;
    var i = wr;
    var v = a || {}, o = v.p, u = v.g, f = v._;
    var c = function invokeFunctionToDebounce(a) {
      i();
      sr(e);
      e = n = void 0;
      i = wr;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return f && n ? f(n, r) : r;
    };
    var h = function flush() {
      if (i !== wr) {
        c(s(t) || t);
      }
    };
    var p = function debouncedFn() {
      var r = C(arguments);
      var a = d(o) ? o() : o;
      var v = l(a) && a >= 0;
      if (v) {
        var f = d(u) ? u() : u;
        var p = l(f) && f >= 0;
        var g = a > 0 ? cr : lr;
        var w = a > 0 ? sr : fr;
        var b = s(r);
        var m = b || r;
        var y = c.bind(0, m);
        i();
        var S = g(y, a);
        i = function clear() {
          return w(S);
        };
        if (p && !e) {
          e = cr(h, f);
        }
        n = t = m;
      } else {
        c(r);
      }
    };
    p.m = h;
    return p;
  };
  var yr = Math.max;
  var Sr = function animationCurrentTime() {
    return performance.now();
  };
  var Cr = function animateNumber(r, a, e, n, t) {
    var i = 0;
    var v = Sr();
    var o = Math.max(0, e);
    var u = function frame(e) {
      var u = Sr();
      var f = u - v;
      var l = f >= o;
      var c = e ? 1 : 1 - (yr(0, v + o - u) / o || 0);
      var s = (a - r) * (d(t) ? t(c, c * o, 0, 1, o) : c) + r;
      var h = l || 1 === c;
      n && n(s, c, h);
      i = h ? 0 : lr((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      fr(i);
      r && u(r);
    };
  };
  var Or = /[^\x20\t\r\n\f]+/g;
  var xr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var i = 0;
    var v = false;
    if (n && a && c(a)) {
      var o = a.match(Or) || [];
      v = o.length > 0;
      while (t = o[i++]) {
        v = !!e(n, t) && v;
      }
    }
    return v;
  };
  var Er = function hasClass(r, a) {
    return xr(r, a, (function(r, a) {
      return r.contains(a);
    }));
  };
  var zr = function removeClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Pr = function addClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return zr.bind(0, r, a);
  };
  var Tr = {
    opacity: 1,
    zindex: 1
  };
  var Ar = function parseToZeroOrNumber(r, a) {
    var e = a ? parseFloat(r) : parseInt(r, 10);
    return e === e ? e : 0;
  };
  var Lr = function adaptCSSVal(r, a) {
    return !Tr[r.toLowerCase()] && l(a) ? a + "px" : a;
  };
  var Hr = function getCSSVal(r, a, e) {
    return null != a ? a[e] || a.getPropertyValue(e) : r.style[e];
  };
  var Mr = function setCSSVal(r, a, e) {
    try {
      var n = r.style;
      if (!o(n[a])) {
        n[a] = Lr(a, e);
      } else {
        n.setProperty(a, e);
      }
    } catch (t) {}
  };
  var Rr = function directionIsRTL(r) {
    return "rtl" === style(r, "direction");
  };
  var Ir = function topRightBottomLeft(r, a, e) {
    var n = a ? a + "-" : "";
    var t = e ? "-" + e : "";
    var i = n + "top" + t;
    var v = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var f = style(r, [ i, v, o, u ]);
    return {
      t: Ar(f[i], true),
      r: Ar(f[v], true),
      b: Ar(f[o], true),
      l: Ar(f[u], true)
    };
  };
  var Dr = Math.round;
  var kr = {
    w: 0,
    h: 0
  };
  var Vr = function windowSize() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  };
  var Br = function offsetSize(r) {
    return r ? {
      w: r.offsetWidth,
      h: r.offsetHeight
    } : kr;
  };
  var jr = function clientSize(r) {
    return r ? {
      w: r.clientWidth,
      h: r.clientHeight
    } : kr;
  };
  var Ur = function scrollSize(r) {
    return r ? {
      w: r.scrollWidth,
      h: r.scrollHeight
    } : kr;
  };
  var qr = function fractionalSize(r) {
    var a = parseFloat(style(r, "height")) || 0;
    var e = parseFloat(style(r, "width")) || 0;
    return {
      w: e - Dr(e),
      h: a - Dr(a)
    };
  };
  var Fr = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var Nr;
  var Yr = function supportPassiveEvents() {
    if (o(Nr)) {
      Nr = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            Nr = true;
          }
        }));
      } catch (r) {}
    }
    return Nr;
  };
  var Wr = function splitEventNames(r) {
    return r.split(" ");
  };
  var Gr = function off(r, a, e, n) {
    each(Wr(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var Xr = function on(r, a, e, n) {
    var t;
    var i = Yr();
    var v = null != (t = i && n && n.S) ? t : i;
    var o = n && n.C || false;
    var u = n && n.O || false;
    var f = [];
    var l = i ? {
      passive: v,
      capture: o
    } : o;
    each(Wr(a), (function(a) {
      var n = u ? function(t) {
        r.removeEventListener(a, n, o);
        e && e(t);
      } : e;
      S(f, Gr.bind(null, r, a, n, o));
      r.addEventListener(a, n, l);
    }));
    return x.bind(0, f);
  };
  var Zr = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var $r = function preventDefault(r) {
    return r.preventDefault();
  };
  var Jr = {
    x: 0,
    y: 0
  };
  var Kr = function absoluteCoordinates(r) {
    var a = r ? Fr(r) : 0;
    return a ? {
      x: a.left + window.pageYOffset,
      y: a.top + window.pageXOffset
    } : Jr;
  };
  var Qr = function manageListener(r, a) {
    each(h(a) ? a : [ a ], r);
  };
  var ra = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        Qr((function(r) {
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
      if (c(r)) {
        var t = a.get(r) || new Set;
        a.set(r, t);
        Qr((function(r) {
          d(r) && t.add(r);
        }), n);
        return e.bind(0, r, n);
      }
      if (s(n) && n) {
        e();
      }
      var i = z(r);
      var v = [];
      each(i, (function(a) {
        var e = r[a];
        e && S(v, addEvent(a, e));
      }));
      return x.bind(0, v);
    };
    var t = function triggerEvent(r, e) {
      var n = a.get(r);
      each(C(n), (function(r) {
        if (e && !O(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, e, t ];
  };
  var aa = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (d(a)) {
        throw new Error;
      }
      return a;
    }));
  };
  var ea = {
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
  var na = function getOptionsDiff(r, a) {
    var e = {};
    var n = z(a).concat(z(r));
    each(n, (function(n) {
      var t = r[n];
      var i = a[n];
      if (p(t) && p(i)) {
        P(e[n] = {}, getOptionsDiff(t, i));
        if (T(e[n])) {
          delete e[n];
        }
      } else if (E(a, n) && i !== t) {
        var v = true;
        if (h(t) || h(i)) {
          try {
            if (aa(t) === aa(i)) {
              v = false;
            }
          } catch (o) {}
        }
        if (v) {
          e[n] = i;
        }
      }
    }));
    return e;
  };
  var ta = "os-environment";
  var ia = ta + "-flexbox-glue";
  var va = ia + "-max";
  var oa = "data-overlayscrollbars";
  var ua = "data-overlayscrollbars-initialize";
  var fa = oa + "-overflow-x";
  var la = oa + "-overflow-y";
  var ca = "overflowVisible";
  var sa = "scrollbarHidden";
  var da = "updating";
  var ha = "os-padding";
  var pa = "os-viewport";
  var ga = pa + "-arrange";
  var _a = "os-content";
  var wa = pa + "-scrollbar-hidden";
  var ba = "os-overflow-visible";
  var ma = "os-size-observer";
  var ya = ma + "-appear";
  var Sa = ma + "-listener";
  var Ca = Sa + "-scroll";
  var Oa = Sa + "-item";
  var xa = Oa + "-final";
  var Ea = "os-trinsic-observer";
  var za = "os-no-css-vars";
  var Pa = "os-theme-none";
  var Ta = "os-scrollbar";
  var Aa = Ta + "-rtl";
  var La = Ta + "-horizontal";
  var Ha = Ta + "-vertical";
  var Ma = Ta + "-track";
  var Ra = Ta + "-handle";
  var Ia = Ta + "-visible";
  var Da = Ta + "-cornerless";
  var ka = Ta + "-transitionless";
  var Va = Ta + "-interaction";
  var Ba = Ta + "-unusable";
  var ja = Ta + "-auto-hidden";
  var Ua = Ta + "-wheel";
  var qa = Ma + "-interactive";
  var Fa = Ra + "-interactive";
  var Na = {};
  var Ya = function getPlugins() {
    return Na;
  };
  var Wa = function addPlugin(r) {
    var a = [];
    each(h(r) ? r : [ r ], (function(r) {
      var e = z(r);
      each(e, (function(e) {
        S(a, Na[e] = r[e]);
      }));
    }));
    return a;
  };
  var Ga = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Xa = function validateRecursive(r, a, e, n) {
    var t = {};
    var i = _extends({}, a);
    var v = z(r).filter((function(r) {
      return E(a, r);
    }));
    each(v, (function(v) {
      var u = a[v];
      var l = r[v];
      var s = w(l);
      var d = n ? n + "." : "";
      if (s && w(u)) {
        var p = validateRecursive(l, u, e, d + v), g = p[0], b = p[1];
        t[v] = g;
        i[v] = b;
        each([ i, t ], (function(r) {
          if (T(r[v])) {
            delete r[v];
          }
        }));
      } else if (!s) {
        var m = false;
        var y = [];
        var C = [];
        var O = f(u);
        var x = !h(l) ? [ l ] : l;
        each(x, (function(r) {
          var a;
          each(Ga, (function(e, n) {
            if (e === r) {
              a = n;
            }
          }));
          var e = o(a);
          if (e && c(u)) {
            var n = r.split(" ");
            m = !!n.find((function(r) {
              return r === u;
            }));
            S(y, n);
          } else {
            m = Ga[O] === r;
          }
          S(C, e ? Ga.string : a);
          return !m;
        }));
        if (m) {
          t[v] = u;
        } else if (e) {
          console.warn('The option "' + d + v + "\" wasn't set, because it doesn't accept the type [ " + O.toUpperCase() + ' ] with the value of "' + u + '".\r\n' + "Accepted types are: [ " + C.join(", ").toUpperCase() + " ].\r\n" + (y.length > 0 ? "\r\nValid strings are: [ " + y.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ t, i ];
  };
  var Za = function validateOptions(r, a, e) {
    return Xa(r, a, e);
  };
  var $a = Ga.number;
  var Ja = Ga.boolean;
  var Ka = [ Ga.array, Ga.null ];
  var Qa = "hidden scroll visible visible-hidden";
  var re = "visible hidden auto";
  var ae = "never scroll leavemove";
  var ee = {
    paddingAbsolute: Ja,
    showNativeOverlaidScrollbars: Ja,
    update: {
      elementEvents: Ka,
      attributes: Ka,
      debounce: [ Ga.number, Ga.array, Ga.null ],
      ignoreMutation: [ Ga.function, Ga.null ]
    },
    overflow: {
      x: Qa,
      y: Qa
    },
    scrollbars: {
      theme: [ Ga.string, Ga.null ],
      visibility: re,
      autoHide: ae,
      autoHideDelay: $a,
      dragScroll: Ja,
      clickScroll: Ja,
      pointers: [ Ga.array, Ga.null ]
    }
  };
  var ne = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function() {
    var r;
    return r = {}, r[ne] = {
      P: function _(r, a) {
        var e = Za(ee, r, a), n = e[0], t = e[1];
        return _extends({}, t, n);
      }
    }, r;
  })();
  var te = 3333333;
  var ie = "scroll";
  var ve = "__osSizeObserverPlugin";
  var oe = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[ve] = {
      P: function _(r, a, e) {
        var n = J('<div class="' + Oa + '" dir="ltr"><div class="' + Oa + '"><div class="' + xa + '"></div></div><div class="' + Oa + '"><div class="' + xa + '" style="width: 200%; height: 200%"></div></div></div>');
        W(r, n);
        Pr(r, Ca);
        var t = n[0];
        var i = t.lastChild;
        var v = t.firstChild;
        var o = null == v ? void 0 : v.firstChild;
        var u = Br(t);
        var f = u;
        var l = false;
        var c;
        var s = function reset() {
          I(v, te);
          D(v, te);
          I(i, te);
          D(i, te);
        };
        var d = function onResized(r) {
          c = 0;
          if (l) {
            u = f;
            a(true === r);
          }
        };
        var h = function onScroll(r) {
          f = Br(t);
          l = !r || !hr(f, u);
          if (r) {
            Zr(r);
            if (l && !c) {
              fr(c);
              c = lr(d);
            }
          } else {
            d(false === r);
          }
          s();
        };
        var p = S([], [ Xr(v, ie, h), Xr(i, ie, h) ]);
        style(o, {
          width: te,
          height: te
        });
        lr(s);
        return [ e ? h.bind(0, false) : s, p ];
      }
    }, r;
  }();
  var ue = 0;
  var fe = Math.round, le = Math.abs;
  var ce = function getWindowDPR() {
    var r = window.screen.deviceXDPI || 0;
    var a = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || r / a;
  };
  var se = function diffBiggerThanOne(r, a) {
    var e = le(r);
    var n = le(a);
    return !(e === n || e + 1 === n || e - 1 === n);
  };
  var de = "__osScrollbarsHidingPlugin";
  var he = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[de] = {
      T: function _createUniqueViewportArrangeElement(r) {
        var a = r.A, e = r.L, n = r.H;
        var t = !n && !a && (e.x || e.y);
        var i = t ? document.createElement("style") : false;
        if (i) {
          L(i, "id", ga + "-" + ue);
          ue++;
        }
        return i;
      },
      M: function _overflowUpdateSegment(r, a, e, n, t, i, v) {
        var o = function arrangeViewport(a, i, v, o) {
          if (r) {
            var u = t(), f = u.R;
            var l = a.I, c = a.D;
            var s = c.x, d = c.y;
            var h = l.x, p = l.y;
            var g = o ? "paddingRight" : "paddingLeft";
            var w = f[g];
            var b = f.paddingTop;
            var m = i.w + v.w;
            var y = i.h + v.h;
            var S = {
              w: p && d ? p + m - w + "px" : "",
              h: h && s ? h + y - b + "px" : ""
            };
            if (n) {
              var C = n.sheet;
              if (C) {
                var O = C.cssRules;
                if (O) {
                  if (!O.length) {
                    C.insertRule("#" + L(n, "id") + " + ." + ga + "::before {}", 0);
                  }
                  var x = O[0].style;
                  x.width = S.w;
                  x.height = S.h;
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
            var f = u || i(n);
            var l = t(), c = l.R;
            var s = f.D;
            var d = s.x, h = s.y;
            var p = {};
            var g = function assignProps(r) {
              return each(r.split(" "), (function(r) {
                p[r] = c[r];
              }));
            };
            if (d) {
              g("marginBottom paddingTop paddingBottom");
            }
            if (h) {
              g("marginLeft marginRight paddingLeft paddingRight");
            }
            var w = style(e, z(p));
            zr(e, ga);
            if (!a) {
              p.height = "";
            }
            style(e, p);
            return [ function() {
              v(f, o, r, w);
              style(e, w);
              Pr(e, ga);
            }, f ];
          }
          return [ wr ];
        };
        return [ o, u ];
      },
      k: function _envWindowZoom() {
        var r = {
          w: 0,
          h: 0
        };
        var a = 0;
        return function(e, n, t) {
          var i = Vr();
          var v = {
            w: i.w - r.w,
            h: i.h - r.h
          };
          if (0 === v.w && 0 === v.h) {
            return;
          }
          var o = {
            w: le(v.w),
            h: le(v.h)
          };
          var u = {
            w: le(fe(i.w / (r.w / 100))),
            h: le(fe(i.h / (r.h / 100)))
          };
          var f = ce();
          var l = o.w > 2 && o.h > 2;
          var c = !se(u.w, u.h);
          var s = f !== a && f > 0;
          var d = l && c && s;
          if (d) {
            var h = n(), p = h[0], g = h[1];
            P(e.V, p);
            if (g) {
              t();
            }
          }
          r = i;
          a = f;
        };
      }
    }, r;
  }();
  var pe = "__osClickScrollPlugin";
  var ge = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[pe] = {
      P: function _(r, a, e, n, t) {
        var i = 0;
        var v = wr;
        var o = function animateClickScroll(o) {
          v = Cr(o, o + n * Math.sign(e), 133, (function(e, o, u) {
            r(e);
            var f = a();
            var l = f + n;
            var c = t >= f && t <= l;
            if (u && !c) {
              if (i) {
                animateClickScroll(e);
              } else {
                var s = setTimeout((function() {
                  animateClickScroll(e);
                }), 222);
                v = function clear() {
                  clearTimeout(s);
                };
              }
              i++;
            }
          }));
        };
        o(0);
        return function() {
          return v();
        };
      }
    }, r;
  }();
  var _e;
  var we = function getNativeScrollbarSize(r, a, e, n) {
    W(r, a);
    var t = jr(a);
    var i = Br(a);
    var v = qr(e);
    n && Z(a);
    return {
      x: i.h - t.h + v.h,
      y: i.w - t.w + v.w
    };
  };
  var be = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Pr(r, wa);
    try {
      a = "none" === style(r, tr("scrollbar-width")) || "none" === window.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display");
    } catch (n) {}
    e();
    return a;
  };
  var me = function getRtlScrollBehavior(r, a) {
    var e = "hidden";
    style(r, {
      overflowX: e,
      overflowY: e,
      direction: "rtl"
    });
    I(r, 0);
    var n = Kr(r);
    var t = Kr(a);
    I(r, -999);
    var i = Kr(a);
    return {
      i: n.x === t.x,
      n: t.x !== i.x
    };
  };
  var ye = function getFlexboxGlue(r, a) {
    var e = Pr(r, ia);
    var n = Fr(r);
    var t = Fr(a);
    var i = _r(t, n, true);
    var v = Pr(r, va);
    var o = Fr(r);
    var u = Fr(a);
    var f = _r(u, o, true);
    e();
    v();
    return i && f;
  };
  var Se = function createEnvironment() {
    var r = document, e = r.body;
    var n = J('<div class="' + ta + '"><div></div></div>');
    var t = n[0];
    var i = t.firstChild;
    var v = ra(), o = v[0], u = v[2];
    var f = a({
      v: we(e, t, i),
      o: pr
    }, we.bind(0, e, t, i, true)), l = f[0], c = f[1];
    var s = c(), d = s[0];
    var h = be(t);
    var p = {
      x: 0 === d.x,
      y: 0 === d.y
    };
    var g = {
      elements: {
        host: null,
        padding: !h,
        viewport: function viewport(r) {
          return h && r === r.ownerDocument.body && r;
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
    var w = P({}, ea);
    var b = P.bind(0, {}, w);
    var m = P.bind(0, {}, g);
    var y = {
      V: d,
      L: p,
      A: h,
      H: "-1" === style(t, "zIndex"),
      B: me(t, i),
      j: ye(t, i),
      U: o.bind(0, "z"),
      q: o.bind(0, "r"),
      F: m,
      N: function _setDefaultInitialization(r) {
        return P(g, r) && m();
      },
      Y: b,
      W: function _setDefaultOptions(r) {
        return P(w, r) && b();
      },
      G: P({}, g),
      X: P({}, w)
    };
    var S = window.addEventListener;
    var C = mr((function(r) {
      return u(r ? "z" : "r");
    }), {
      p: 33,
      g: 99
    });
    R(t, "style");
    Z(t);
    S("resize", C.bind(0, false));
    if (!h && (!p.x || !p.y)) {
      var O;
      S("resize", (function() {
        var r = Ya()[de];
        O = O || r && r.k();
        O && O(y, l, C.bind(0, true));
      }));
    }
    return y;
  };
  var Ce = function getEnvironment() {
    if (!_e) {
      _e = Se();
    }
    return _e;
  };
  var Oe = function resolveInitialization(r, a) {
    return d(a) ? a.apply(0, r) : a;
  };
  var xe = function staticInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = Oe(r, t);
    return i || a.apply(0, r);
  };
  var Ee = function dynamicInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = Oe(r, t);
    return !!i && (b(i) ? i : a.apply(0, r));
  };
  var ze = function cancelInitialization(r, a, e) {
    var n = e || {}, t = n.nativeScrollbarsOverlaid, i = n.body;
    var v = Ce(), f = v.L, l = v.A;
    var c = a.nativeScrollbarsOverlaid, s = a.body;
    var d = null != t ? t : c;
    var h = o(i) ? s : i;
    var p = (f.x || f.y) && d;
    var g = r && (u(h) ? !l : h);
    return !!p || !!g;
  };
  var Pe = new WeakMap;
  var Te = function addInstance(r, a) {
    Pe.set(r, a);
  };
  var Ae = function removeInstance(r) {
    Pe.delete(r);
  };
  var Le = function getInstance(r) {
    return Pe.get(r);
  };
  var He = function getPropByPath(r, a) {
    return r ? a.split(".").reduce((function(r, a) {
      return r && E(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Me = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ He(r, n), e || void 0 !== He(a, n) ];
    };
  };
  var Re = function createState(r) {
    var a = r;
    return [ function() {
      return a;
    }, function(r) {
      a = P({}, a, r);
    } ];
  };
  var Ie = "tabindex";
  var De = $.bind(0, "");
  var ke = function unwrap(r) {
    W(q(r), U(r));
    Z(r);
  };
  var Ve = function createStructureSetupElements(r) {
    var a = Ce();
    var e = a.F, n = a.A;
    var t = Ya()[de];
    var i = t && t.T;
    var v = e(), o = v.elements;
    var u = o.host, f = o.padding, l = o.viewport, c = o.content;
    var s = b(r);
    var d = s ? {} : r;
    var h = d.elements;
    var p = h || {}, g = p.host, w = p.padding, m = p.viewport, C = p.content;
    var O = s ? r : d.target;
    var E = j(O, "textarea");
    var P = O.ownerDocument;
    var T = P.documentElement;
    var A = O === P.body;
    var I = P.defaultView;
    var D = xe.bind(0, [ O ]);
    var k = Ee.bind(0, [ O ]);
    var V = Oe.bind(0, [ O ]);
    var B = D.bind(0, De, l);
    var F = k.bind(0, De, c);
    var N = B(m);
    var Y = N === O;
    var $ = Y && A;
    var J = !Y && F(C);
    var K = !Y && b(N) && N === J;
    var Q = K && !!V(c);
    var rr = Q ? B() : N;
    var ar = Q ? J : F();
    var er = K ? rr : N;
    var nr = $ ? T : er;
    var tr = E ? D(De, u, g) : O;
    var ir = $ ? nr : tr;
    var vr = K ? ar : J;
    var or = P.activeElement;
    var ur = !Y && I.top === I && or === O;
    var fr = {
      Z: O,
      $: ir,
      J: nr,
      K: !Y && k(De, f, w),
      rr: vr,
      ar: !Y && !n && i && i(a),
      er: $ ? T : nr,
      nr: $ ? P : nr,
      tr: I,
      ir: P,
      vr: E,
      ur: A,
      lr: s,
      cr: Y,
      sr: K,
      dr: function _viewportHasClass(r, a) {
        return Y ? M(nr, oa, a) : Er(nr, r);
      },
      hr: function _viewportAddRemoveClass(r, a, e) {
        return Y ? H(nr, oa, a, e) : (e ? Pr : zr)(nr, r);
      }
    };
    var lr = z(fr).reduce((function(r, a) {
      var e = fr[a];
      return S(r, e && !q(e) ? e : false);
    }), []);
    var cr = function elementIsGenerated(r) {
      return r ? y(lr, r) > -1 : null;
    };
    var sr = fr.Z, dr = fr.$, hr = fr.K, pr = fr.J, gr = fr.rr, _r = fr.ar;
    var br = [ function() {
      R(dr, oa);
      R(dr, ua);
      R(sr, ua);
      if (A) {
        R(T, oa);
        R(T, ua);
      }
    } ];
    var mr = E && cr(dr);
    var yr = E ? sr : U([ gr, pr, hr, dr, sr ].find((function(r) {
      return false === cr(r);
    })));
    var Sr = $ ? sr : gr || pr;
    var Cr = function appendElements() {
      L(dr, oa, Y ? "viewport" : "host");
      var r = Pr(hr, ha);
      var a = Pr(pr, !Y && pa);
      var e = Pr(gr, _a);
      var t = A && !Y ? Pr(q(O), wa) : wr;
      if (mr) {
        X(sr, dr);
        S(br, (function() {
          X(dr, sr);
          Z(dr);
        }));
      }
      W(Sr, yr);
      W(dr, hr);
      W(hr || dr, !Y && pr);
      W(pr, gr);
      S(br, (function() {
        t();
        R(pr, fa);
        R(pr, la);
        if (cr(gr)) {
          ke(gr);
        }
        if (cr(pr)) {
          ke(pr);
        }
        if (cr(hr)) {
          ke(hr);
        }
        r();
        a();
        e();
      }));
      if (n && !Y) {
        S(br, zr.bind(0, pr, wa));
      }
      if (_r) {
        G(pr, _r);
        S(br, Z.bind(0, _r));
      }
      if (ur) {
        var i = L(pr, Ie);
        L(pr, Ie, "-1");
        pr.focus();
        var v = function revertViewportTabIndex() {
          return i ? L(pr, Ie, i) : R(pr, Ie);
        };
        var o = Xr(P, "pointerdown keydown", (function() {
          v();
          o();
        }));
        S(br, [ v, o ]);
      } else if (or && or.focus) {
        or.focus();
      }
      yr = 0;
    };
    return [ fr, Cr, x.bind(0, br) ];
  };
  var Be = function createTrinsicUpdateSegment(r, a) {
    var e = r.rr;
    var n = a[0];
    return function(r) {
      var a = Ce(), t = a.j;
      var i = n(), v = i.pr;
      var o = r.gr;
      var u = (e || !t) && o;
      if (u) {
        style(e, {
          height: v ? "" : "100%"
        });
      }
      return {
        _r: u,
        wr: u
      };
    };
  };
  var je = function createPaddingUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.$, v = r.K, o = r.J, u = r.cr;
    var f = a({
      o: gr,
      v: Ir()
    }, Ir.bind(0, i, "padding", "")), l = f[0], c = f[1];
    return function(r, a, e) {
      var i = c(e), f = i[0], s = i[1];
      var d = Ce(), h = d.A, p = d.j;
      var g = n(), w = g.br;
      var b = r._r, m = r.wr, y = r.mr;
      var S = a("paddingAbsolute"), C = S[0], O = S[1];
      var x = !p && m;
      if (b || s || x) {
        var E = l(e);
        f = E[0];
        s = E[1];
      }
      var z = !u && (O || y || s);
      if (z) {
        var T = !C || !v && !h;
        var A = f.r + f.l;
        var L = f.t + f.b;
        var H = {
          marginRight: T && !w ? -A : 0,
          marginBottom: T ? -L : 0,
          marginLeft: T && w ? -A : 0,
          top: T ? -f.t : 0,
          right: T ? w ? -f.r : "auto" : 0,
          left: T ? w ? "auto" : -f.l : 0,
          width: T ? "calc(100% + " + A + "px)" : ""
        };
        var M = {
          paddingTop: T ? f.t : 0,
          paddingRight: T ? f.r : 0,
          paddingBottom: T ? f.b : 0,
          paddingLeft: T ? f.l : 0
        };
        style(v || o, H);
        style(o, M);
        t({
          K: f,
          yr: !T,
          R: v ? M : P({}, H, M)
        });
      }
      return {
        Sr: z
      };
    };
  };
  var Ue = Math.max;
  var qe = Ue.bind(0, 0);
  var Fe = "visible";
  var Ne = "hidden";
  var Ye = 42;
  var We = {
    o: hr,
    v: {
      w: 0,
      h: 0
    }
  };
  var Ge = {
    o: pr,
    v: {
      x: Ne,
      y: Ne
    }
  };
  var Xe = function getOverflowAmount(r, a) {
    var e = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    var n = {
      w: qe(r.w - a.w),
      h: qe(r.h - a.h)
    };
    return {
      w: n.w > e ? n.w : 0,
      h: n.h > e ? n.h : 0
    };
  };
  var Ze = function conditionalClass(r, a, e) {
    return e ? Pr(r, a) : zr(r, a);
  };
  var $e = function overflowIsVisible(r) {
    return 0 === r.indexOf(Fe);
  };
  var Je = function createOverflowUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.$, v = r.K, o = r.J, u = r.ar, f = r.cr, l = r.hr, c = r.ur, s = r.tr;
    var d = Ce(), h = d.V, p = d.j, g = d.A, w = d.L;
    var b = Ya()[de];
    var m = !f && !g && (w.x || w.y);
    var y = c && f;
    var S = a(We, qr.bind(0, o)), C = S[0], O = S[1];
    var x = a(We, Ur.bind(0, o)), E = x[0], z = x[1];
    var P = a(We), T = P[0], A = P[1];
    var M = a(We), R = M[0], I = M[1];
    var D = a(Ge), k = D[0];
    var V = function fixFlexboxGlue(r, a) {
      style(o, {
        height: ""
      });
      if (a) {
        var e = n(), t = e.yr, v = e.K;
        var u = r.Cr, f = r.I;
        var l = qr(i);
        var c = jr(i);
        var s = "content-box" === style(o, "boxSizing");
        var d = t || s ? v.b + v.t : 0;
        var h = !(w.x && s);
        style(o, {
          height: c.h + l.h + (u.x && h ? f.x : 0) - d
        });
      }
    };
    var B = function getViewportOverflowState(r, a) {
      var e = !g && !r ? Ye : 0;
      var n = function getStatePerAxis(r, n, t) {
        var i = style(o, r);
        var v = a ? a[r] : i;
        var u = "scroll" === v;
        var f = n ? e : t;
        var l = u && !g ? f : 0;
        var c = n && !!e;
        return [ i, u, l, c ];
      };
      var t = n("overflowX", w.x, h.x), i = t[0], v = t[1], u = t[2], f = t[3];
      var l = n("overflowY", w.y, h.y), c = l[0], s = l[1], d = l[2], p = l[3];
      return {
        Or: {
          x: i,
          y: c
        },
        Cr: {
          x: v,
          y: s
        },
        I: {
          x: u,
          y: d
        },
        D: {
          x: f,
          y: p
        }
      };
    };
    var j = function setViewportOverflowState(r, a, e, n) {
      var t = function setAxisOverflowStyle(r, a) {
        var e = $e(r);
        var n = a && e && r.replace(Fe + "-", "") || "";
        return [ a && !e ? r : "", $e(n) ? "hidden" : n ];
      };
      var i = t(e.x, a.x), v = i[0], o = i[1];
      var u = t(e.y, a.y), f = u[0], l = u[1];
      n.overflowX = o && f ? o : v;
      n.overflowY = l && v ? l : f;
      return B(r, n);
    };
    var U = function hideNativeScrollbars(r, a, e, t) {
      var i = r.I, v = r.D;
      var o = v.x, u = v.y;
      var f = i.x, l = i.y;
      var c = n(), s = c.R;
      var d = a ? "marginLeft" : "marginRight";
      var h = a ? "paddingLeft" : "paddingRight";
      var p = s[d];
      var g = s.marginBottom;
      var w = s[h];
      var b = s.paddingBottom;
      t.width = "calc(100% + " + (l + -1 * p) + "px)";
      t[d] = -l + p;
      t.marginBottom = -f + g;
      if (e) {
        t[h] = w + (u ? l : 0);
        t.paddingBottom = b + (o ? f : 0);
      }
    };
    var q = b ? b.M(m, p, o, u, n, B, U) : [ function() {
      return m;
    }, function() {
      return [ wr ];
    } ], F = q[0], N = q[1];
    return function(r, a, e) {
      var u = r._r, c = r.Er, d = r.wr, h = r.Sr, b = r.gr, m = r.mr;
      var S = n(), x = S.pr, P = S.br;
      var M = a("showNativeOverlaidScrollbars"), D = M[0], q = M[1];
      var Y = a("overflow"), W = Y[0], G = Y[1];
      var X = D && w.x && w.y;
      var Z = !f && !p && (u || d || c || q || b);
      var $ = $e(W.x);
      var J = $e(W.y);
      var K = $ || J;
      var Q = O(e);
      var rr = z(e);
      var ar = A(e);
      var er = I(e);
      var nr;
      if (q && g) {
        l(wa, sa, !X);
      }
      if (Z) {
        nr = B(X);
        V(nr, x);
      }
      if (u || h || d || m || q) {
        if (K) {
          l(ba, ca, false);
        }
        var tr = N(X, P, nr), ir = tr[0], vr = tr[1];
        var or = Q = C(e), ur = or[0], fr = or[1];
        var lr = rr = E(e), cr = lr[0], sr = lr[1];
        var dr = jr(o);
        var hr = cr;
        var pr = dr;
        ir();
        if ((sr || fr || q) && vr && !X && F(vr, cr, ur, P)) {
          pr = jr(o);
          hr = Ur(o);
        }
        var gr = {
          w: qe(Ue(cr.w, hr.w) + ur.w),
          h: qe(Ue(cr.h, hr.h) + ur.h)
        };
        var _r = {
          w: qe((y ? s.innerWidth : pr.w + qe(dr.w - cr.w)) + ur.w),
          h: qe((y ? s.innerHeight + ur.h : pr.h + qe(dr.h - cr.h)) + ur.h)
        };
        er = R(_r);
        ar = T(Xe(gr, _r), e);
      }
      var wr = er, br = wr[0], mr = wr[1];
      var yr = ar, Sr = yr[0], Cr = yr[1];
      var Or = rr, xr = Or[0], Er = Or[1];
      var zr = Q, Pr = zr[0], Tr = zr[1];
      var Ar = {
        x: Sr.w > 0,
        y: Sr.h > 0
      };
      var Lr = $ && J && (Ar.x || Ar.y) || $ && Ar.x && !Ar.y || J && Ar.y && !Ar.x;
      if (h || m || Tr || Er || mr || Cr || G || q || Z) {
        var Hr = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        var Mr = j(X, Ar, W, Hr);
        var Rr = F(Mr, xr, Pr, P);
        if (!f) {
          U(Mr, P, Rr, Hr);
        }
        if (Z) {
          V(Mr, x);
        }
        if (f) {
          L(i, fa, Hr.overflowX);
          L(i, la, Hr.overflowY);
        } else {
          style(o, Hr);
        }
      }
      H(i, oa, ca, Lr);
      Ze(v, ba, Lr);
      !f && Ze(o, ba, K);
      var Ir = k(B(X).Or), Dr = Ir[0], kr = Ir[1];
      t({
        Or: Dr,
        zr: {
          x: br.w,
          y: br.h
        },
        Pr: {
          x: Sr.w,
          y: Sr.h
        },
        Tr: Ar
      });
      return {
        Ar: kr,
        Lr: mr,
        Hr: Cr
      };
    };
  };
  var Ke = function prepareUpdateHints(r, a, e) {
    var n = {};
    var t = a || {};
    var i = z(r).concat(z(t));
    each(i, (function(a) {
      var i = r[a];
      var v = t[a];
      n[a] = !!(e || i || v);
    }));
    return n;
  };
  var Qe = function createStructureSetupUpdate(r, a) {
    var e = r.Z, n = r.J, t = r.hr, i = r.cr;
    var v = Ce(), o = v.A, u = v.L, f = v.j;
    var l = !o && (u.x || u.y);
    var c = [ Be(r, a), je(r, a), Je(r, a) ];
    return function(r, a, v) {
      var o = Ke(P({
        _r: false,
        Sr: false,
        mr: false,
        gr: false,
        Lr: false,
        Hr: false,
        Ar: false,
        Er: false,
        wr: false
      }, a), {}, v);
      var u = l || !f;
      var s = u && I(n);
      var d = u && D(n);
      t("", da, true);
      var h = o;
      each(c, (function(a) {
        h = Ke(h, a(h, r, !!v) || {}, v);
      }));
      I(n, s);
      D(n, d);
      t("", da);
      if (!i) {
        I(e, 0);
        D(e, 0);
      }
      return h;
    };
  };
  var rn = function createEventContentChange(r, a, e) {
    var n;
    var t = false;
    var i = function destroy() {
      t = true;
    };
    var v = function updateElements(i) {
      if (e) {
        var v = e.reduce((function(a, e) {
          if (e) {
            var n = e[0], t = e[1];
            var v = t && n && (i ? i(n) : V(n, r));
            if (v && v.length && t && c(t)) {
              S(a, [ v, t.trim() ], true);
            }
          }
          return a;
        }), []);
        each(v, (function(e) {
          return each(e[0], (function(i) {
            var v = e[1];
            var o = n.get(i) || [];
            var u = r.contains(i);
            if (u) {
              var f = Xr(i, v, (function(r) {
                if (t) {
                  f();
                  n.delete(i);
                } else {
                  a(r);
                }
              }));
              n.set(i, S(o, f));
            } else {
              x(o);
              n.delete(i);
            }
          }));
        }));
      }
    };
    if (e) {
      n = new WeakMap;
      v();
    }
    return [ i, v ];
  };
  var an = function createDOMObserver(r, a, e, n) {
    var t = false;
    var i = n || {}, v = i.Mr, o = i.Rr, u = i.Ir, f = i.Dr, l = i.kr, s = i.Vr;
    var d = mr((function() {
      if (t) {
        e(true);
      }
    }), {
      p: 33,
      g: 99
    });
    var h = rn(r, d, u), p = h[0], g = h[1];
    var w = v || [];
    var b = o || [];
    var m = w.concat(b);
    var x = function observerCallback(t, i) {
      var v = l || wr;
      var o = s || wr;
      var u = new Set;
      var d = new Set;
      var h = false;
      var p = false;
      each(t, (function(e) {
        var t = e.attributeName, i = e.target, l = e.type, s = e.oldValue, g = e.addedNodes, w = e.removedNodes;
        var m = "attributes" === l;
        var S = "childList" === l;
        var C = r === i;
        var O = m && c(t) ? L(i, t) : 0;
        var x = 0 !== O && s !== O;
        var E = y(b, t) > -1 && x;
        if (a && (S || !C)) {
          var z = !m;
          var P = m && x;
          var T = P && f && j(i, f);
          var A = T ? !v(i, t, s, O) : z || P;
          var H = A && !o(e, !!T, r, n);
          each(g, (function(r) {
            return u.add(r);
          }));
          each(w, (function(r) {
            return u.add(r);
          }));
          p = p || H;
        }
        if (!a && C && x && !v(i, t, s, O)) {
          d.add(t);
          h = h || E;
        }
      }));
      if (u.size > 0) {
        g((function(r) {
          return C(u).reduce((function(a, e) {
            S(a, V(r, e));
            return j(e, r) ? S(a, e) : a;
          }), []);
        }));
      }
      if (a) {
        !i && p && e(false);
        return [ false ];
      }
      if (d.size > 0 || h) {
        var w = [ C(d), h ];
        !i && e.apply(0, w);
        return w;
      }
    };
    var E = new vr((function(r) {
      return x(r);
    }));
    E.observe(r, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: m,
      subtree: a,
      childList: a,
      characterData: a
    });
    t = true;
    return [ function() {
      if (t) {
        p();
        E.disconnect();
        t = false;
      }
    }, function() {
      if (t) {
        d.m();
        var r = E.takeRecords();
        return !O(r) && x(r, true);
      }
    } ];
  };
  var en = 3333333;
  var nn = function domRectHasDimensions(r) {
    return r && (r.height || r.width);
  };
  var tn = function createSizeObserver(r, e, n) {
    var t = n || {}, i = t.Br, v = void 0 === i ? false : i, o = t.jr, u = void 0 === o ? false : o;
    var f = Ya()[ve];
    var l = Ce(), c = l.B;
    var d = J('<div class="' + ma + '"><div class="' + Sa + '"></div></div>');
    var g = d[0];
    var w = g.firstChild;
    var b = Rr.bind(0, r);
    var m = a({
      v: void 0,
      u: true,
      o: function _equal(r, a) {
        return !(!r || !nn(r) && nn(a));
      }
    }), y = m[0];
    var C = function onSizeChangedCallbackProxy(r) {
      var a = h(r) && r.length > 0 && p(r[0]);
      var n = !a && s(r[0]);
      var t = false;
      var i = false;
      var o = true;
      if (a) {
        var u = y(r.pop().contentRect), f = u[0], l = u[2];
        var d = nn(f);
        var w = nn(l);
        t = !l || !d;
        i = !w && d;
        o = !t;
      } else if (n) {
        o = r[1];
      } else {
        i = true === r;
      }
      if (v && o) {
        var b = n ? r[0] : Rr(g);
        I(g, b ? c.n ? -en : c.i ? 0 : en : en);
        D(g, en);
      }
      if (!t) {
        e({
          _r: !n,
          Ur: n ? r : void 0,
          jr: !!i
        });
      }
    };
    var O = [];
    var E = u ? C : false;
    return [ function() {
      x(O);
      Z(g);
    }, function() {
      if (ur) {
        var e = new ur(C);
        e.observe(w);
        S(O, (function() {
          e.disconnect();
        }));
      } else if (f) {
        var n = f.P(w, C, u), t = n[0], i = n[1];
        E = t;
        S(O, i);
      }
      if (v) {
        var o = a({
          v: void 0
        }, b), l = o[0];
        S(O, Xr(g, "scroll", (function(r) {
          var a = l();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            zr(w, "ltr rtl");
            if (e) {
              Pr(w, "rtl");
            } else {
              Pr(w, "ltr");
            }
            C([ !!e, n, t ]);
          }
          Zr(r);
        })));
      }
      if (E) {
        Pr(g, ya);
        S(O, Xr(g, "animationstart", E, {
          O: !!ur
        }));
      }
      if (ur || f) {
        W(r, g);
      }
    } ];
  };
  var vn = function isHeightIntrinsic(r) {
    return 0 === r.h || r.isIntersecting || r.intersectionRatio > 0;
  };
  var un = function createTrinsicObserver(r, e) {
    var n;
    var t = $(Ea);
    var i = [];
    var v = a({
      v: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(vn(r));
        var t = n[1];
        if (t) {
          !a && e(n);
          return [ n ];
        }
      }
    };
    var f = function intersectionObserverCallback(r, a) {
      if (r && r.length > 0) {
        return u(r.pop(), a);
      }
    };
    return [ function() {
      x(i);
      Z(t);
    }, function() {
      if (or) {
        n = new or((function(r) {
          return f(r);
        }), {
          root: r
        });
        n.observe(t);
        S(i, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = Br(t);
          u(r);
        };
        var e = tn(t, a), v = e[0], o = e[1];
        S(i, v);
        o();
        a();
      }
      W(r, t);
    }, function() {
      if (n) {
        return f(n.takeRecords(), true);
      }
    } ];
  };
  var fn = "[" + oa + "]";
  var ln = "." + pa;
  var cn = [ "tabindex" ];
  var sn = [ "wrap", "cols", "rows" ];
  var dn = [ "id", "class", "style", "open" ];
  var hn = function createStructureSetupObservers(r, e, n) {
    var t;
    var i;
    var v;
    var o = r.$, u = r.J, f = r.rr, s = r.vr, p = r.cr, g = r.dr, w = r.hr;
    var b = Ce(), m = b.j;
    var C = a({
      o: hr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = g(ba, ca);
      var a = g(ga, "");
      var e = a && I(u);
      var n = a && D(u);
      w(ba, ca);
      w(ga, "");
      w("", da, true);
      var t = Ur(f);
      var i = Ur(u);
      var v = qr(u);
      w(ba, ca, r);
      w(ga, "", a);
      w("", da);
      I(u, e);
      D(u, n);
      return {
        w: i.w + t.w + v.w,
        h: i.h + t.h + v.h
      };
    })), O = C[0];
    var x = s ? sn : dn.concat(sn);
    var E = mr(n, {
      p: function _timeout() {
        return t;
      },
      g: function _maxDelay() {
        return i;
      },
      _: function _mergeParams(r, a) {
        var e = r[0];
        var n = a[0];
        return [ z(e).concat(z(n)).reduce((function(r, a) {
          r[a] = e[a] || n[a];
          return r;
        }), {}) ];
      }
    });
    var T = function updateViewportAttrsFromHost(r) {
      each(r || cn, (function(r) {
        if (y(cn, r) > -1) {
          var a = L(o, r);
          if (c(a)) {
            L(u, r, a);
          } else {
            R(u, r);
          }
        }
      }));
    };
    var A = function onTrinsicChanged(r, a) {
      var t = r[0], i = r[1];
      var v = {
        gr: i
      };
      e({
        pr: t
      });
      !a && n(v);
      return v;
    };
    var H = function onSizeChanged(r) {
      var a = r._r, t = r.Ur, i = r.jr;
      var v = !a || i ? n : E;
      var o = false;
      if (t) {
        var u = t[0], f = t[1];
        o = f;
        e({
          br: u
        });
      }
      v({
        _r: a,
        mr: o
      });
    };
    var M = function onContentMutation(r, a) {
      var e = O(), t = e[1];
      var i = {
        wr: t
      };
      var v = r ? n : E;
      if (t) {
        !a && v(i);
      }
      return i;
    };
    var k = function onHostMutation(r, a, e) {
      var n = {
        Er: a
      };
      if (a) {
        !e && E(n);
      } else if (!p) {
        T(r);
      }
      return n;
    };
    var V = f || !m ? un(o, A) : [ wr, wr, wr ], B = V[0], j = V[1], U = V[2];
    var q = !p ? tn(o, H, {
      jr: true,
      Br: true
    }) : [ wr, wr ], Y = q[0], W = q[1];
    var G = an(o, false, k, {
      Rr: dn,
      Mr: dn.concat(cn)
    }), X = G[0], Z = G[1];
    var $ = p && ur && new ur(H.bind(0, {
      _r: true
    }));
    $ && $.observe(o);
    T();
    return [ function() {
      B();
      Y();
      v && v[0]();
      $ && $.disconnect();
      X();
    }, function() {
      W();
      j();
    }, function() {
      var r = {};
      var a = Z();
      var e = U();
      var n = v && v[1]();
      if (a) {
        P(r, k.apply(0, S(a, true)));
      }
      if (e) {
        P(r, A.apply(0, S(e, true)));
      }
      if (n) {
        P(r, M.apply(0, S(n, true)));
      }
      return r;
    }, function(r) {
      var a = r("update.ignoreMutation"), e = a[0];
      var n = r("update.attributes"), o = n[0], c = n[1];
      var s = r("update.elementEvents"), g = s[0], w = s[1];
      var b = r("update.debounce"), m = b[0], y = b[1];
      var S = w || c;
      var C = function ignoreMutationFromOptions(r) {
        return d(e) && e(r);
      };
      if (S) {
        if (v) {
          v[1]();
          v[0]();
        }
        v = an(f || u, true, M, {
          Mr: x.concat(o || []),
          Ir: g,
          Dr: fn,
          Vr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !p ? N(e, fn, ln) : false;
            return t || !!F(e, "." + Ta) || !!C(r);
          }
        });
      }
      if (y) {
        E.m();
        if (h(m)) {
          var O = m[0];
          var z = m[1];
          t = l(O) && O;
          i = l(z) && z;
        } else if (l(m)) {
          t = m;
          i = false;
        } else {
          t = false;
          i = false;
        }
      }
    } ];
  };
  var pn = {
    x: 0,
    y: 0
  };
  var gn = function createInitialStructureSetupUpdateState(r) {
    return {
      K: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      yr: false,
      R: {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
      },
      zr: pn,
      Pr: pn,
      Or: {
        x: "hidden",
        y: "hidden"
      },
      Tr: {
        x: false,
        y: false
      },
      pr: false,
      br: Rr(r.$)
    };
  };
  var _n = function createStructureSetup(r, a) {
    var e = Me(a, {});
    var n = ra(), t = n[0], i = n[1], v = n[2];
    var o = Ve(r), u = o[0], f = o[1], l = o[2];
    var c = Re(gn(u));
    var s = c[0], d = c[1];
    var h = Qe(u, c);
    var p = function triggerUpdateEvent(r, a, e) {
      var n = z(r).some((function(a) {
        return r[a];
      }));
      var t = n || !T(a) || e;
      if (t) {
        v("u", [ r, a, e ]);
      }
      return t;
    };
    var g = hn(u, d, (function(r) {
      return p(h(e, r), {}, false);
    })), w = g[0], b = g[1], m = g[2], y = g[3];
    var S = s.bind(0);
    S.qr = function(r) {
      return t("u", r);
    };
    S.Fr = function() {
      var r = u.Z, a = u.J;
      var e = I(r);
      var n = D(r);
      b();
      f();
      I(a, e);
      D(a, n);
    };
    S.Nr = u;
    return [ function(r, e) {
      var n = Me(a, r, e);
      y(n);
      return p(h(n, m(), e), r, !!e);
    }, S, function() {
      i();
      w();
      l();
    } ];
  };
  var wn = Math.round;
  var bn = function getScale(r) {
    var a = Fr(r), e = a.width, n = a.height;
    var t = Br(r), i = t.w, v = t.h;
    return {
      x: wn(e) / i || 1,
      y: wn(n) / v || 1
    };
  };
  var mn = function continuePointerDown(r, a, e) {
    var n = a.scrollbars;
    var t = r.button, i = r.isPrimary, v = r.pointerType;
    var o = n.pointers;
    return 0 === t && i && n[e ? "dragScroll" : "clickScroll"] && (o || []).includes(v);
  };
  var yn = function createRootClickStopPropagationEvents(r, a) {
    return Xr(r, "mousedown", Xr.bind(0, a, "click", Zr, {
      O: true,
      C: true
    }), {
      C: true
    });
  };
  var Sn = "pointerup pointerleave pointercancel lostpointercapture";
  var Cn = function createInteractiveScrollEvents(r, a, e, n, t, i) {
    var v = Ce(), o = v.B;
    var u = e.Yr, f = e.Wr, l = e.Gr;
    var c = "scroll" + (i ? "Left" : "Top");
    var s = "client" + (i ? "X" : "Y");
    var d = i ? "width" : "height";
    var h = i ? "left" : "top";
    var p = i ? "w" : "h";
    var g = i ? "x" : "y";
    var w = function createRelativeHandleMove(r, a) {
      return function(e) {
        var v = t(), s = v.Pr;
        var d = Br(f)[p] - Br(u)[p];
        var h = a * e / d;
        var w = h * s[g];
        var b = Rr(l);
        var m = b && i ? o.n || o.i ? 1 : -1 : 1;
        n[c] = r + w * m;
      };
    };
    return Xr(f, "pointerdown", (function(e) {
      var t = F(e.target, "." + Ra) === u;
      var i = t ? u : f;
      if (mn(e, r, t)) {
        var v = !t && e.shiftKey;
        var o = function getHandleRect() {
          return Fr(u);
        };
        var l = function getTrackRect() {
          return Fr(f);
        };
        var p = function getHandleOffset(r, a) {
          return (r || o())[h] - (a || l())[h];
        };
        var b = w(n[c] || 0, 1 / bn(n)[g]);
        var m = e[s];
        var y = o();
        var C = l();
        var O = y[d];
        var E = p(y, C) + O / 2;
        var z = m - C[h];
        var P = t ? 0 : z - E;
        var T = function releasePointerCapture(r) {
          x(A);
          i.releasePointerCapture(r.pointerId);
        };
        var A = [ Xr(a, Sn, T), Xr(a, "selectstart", (function(r) {
          return $r(r);
        }), {
          S: false
        }), Xr(f, Sn, T), Xr(f, "pointermove", (function(r) {
          var a = r[s] - m;
          if (t || v) {
            b(P + a);
          }
        })) ];
        if (v) {
          b(P);
        } else if (!t) {
          var L = Ya()[pe];
          if (L) {
            S(A, L.P(b, p, P, O, z));
          }
        }
        i.setPointerCapture(e.pointerId);
      }
    }));
  };
  var On = function createScrollbarsSetupEvents(r, a) {
    return function(e, n, t, i, v, o) {
      var u = e.Gr;
      var f = br(333), l = f[0], c = f[1];
      var s = !!v.scrollBy;
      var d = true;
      return x.bind(0, [ Xr(u, "pointerenter", (function() {
        n(Va, true);
      })), Xr(u, "pointerleave pointercancel", (function() {
        n(Va);
      })), Xr(u, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (s && d && 0 === t && q(u) === i) {
          v.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        d = false;
        n(Ua, true);
        l((function() {
          d = true;
          n(Ua);
        }));
        $r(r);
      }), {
        S: false,
        C: true
      }), yn(u, t), Cn(r, t, e, v, a, o), c ]);
    };
  };
  var xn = Math.min, En = Math.max, zn = Math.abs, Pn = Math.round;
  var Tn = function getScrollbarHandleLengthRatio(r, a, e, n) {
    if (n) {
      var t = e ? "x" : "y";
      var i = n.Pr, v = n.zr;
      var o = v[t];
      var u = i[t];
      return En(0, xn(1, o / (o + u)));
    }
    var f = e ? "w" : "h";
    var l = Br(r)[f];
    var c = Br(a)[f];
    return En(0, xn(1, l / c));
  };
  var An = function getScrollbarHandleOffsetRatio(r, a, e, n, t, i) {
    var v = Ce(), o = v.B;
    var u = i ? "x" : "y";
    var f = i ? "Left" : "Top";
    var l = n.Pr;
    var c = Pn(l[u]);
    var s = zn(e["scroll" + f]);
    var d = i && t;
    var h = o.i ? s : c - s;
    var p = d ? h : s;
    var g = xn(1, p / c);
    var w = Tn(r, a, i);
    return 1 / w * (1 - w) * g;
  };
  var Ln = function createScrollbarsSetupElements(r, a, e) {
    var n = Ce(), t = n.F, i = n.H;
    var v = t(), o = v.scrollbars;
    var u = o.slot;
    var f = a.ir, l = a.Z, c = a.$, d = a.J, h = a.lr, p = a.er, g = a.ur, w = a.cr;
    var b = h ? {} : r, m = b.scrollbars;
    var y = m || {}, C = y.slot;
    var E = Ee([ l, c, d ], (function() {
      return w && g ? l : c;
    }), u, C);
    var z = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? Pr : zr;
      each(r, (function(r) {
        n(r.Gr, a);
      }));
    };
    var P = function scrollbarsHandleStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        style(n, t);
      }));
    };
    var T = function scrollbarStructureRefreshHandleLength(r, a, e) {
      P(r, (function(r) {
        var n;
        var t = r.Yr, i = r.Wr;
        return [ t, (n = {}, n[e ? "width" : "height"] = (100 * Tn(t, i, e, a)).toFixed(3) + "%", 
        n) ];
      }));
    };
    var A = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      var n = e ? "X" : "Y";
      P(r, (function(r) {
        var t = r.Yr, i = r.Wr, v = r.Gr;
        var o = An(t, i, p, a, Rr(v), e);
        var u = o === o;
        return [ t, {
          transform: u ? "translate" + n + "(" + (100 * o).toFixed(3) + "%)" : ""
        } ];
      }));
    };
    var L = [];
    var H = [];
    var M = [];
    var R = function scrollbarsAddRemoveClass(r, a, e) {
      var n = s(e);
      var t = n ? e : true;
      var i = n ? !e : true;
      t && z(H, r, a);
      i && z(M, r, a);
    };
    var I = function refreshScrollbarsHandleLength(r) {
      T(H, r, true);
      T(M, r);
    };
    var D = function refreshScrollbarsHandleOffset(r) {
      A(H, r, true);
      A(M, r);
    };
    var k = function generateScrollbarDOM(r) {
      var a = r ? La : Ha;
      var n = r ? H : M;
      var t = O(n) ? ka : "";
      var v = $(Ta + " " + a + " " + t);
      var o = $(Ma);
      var u = $(Ra);
      var l = {
        Gr: v,
        Wr: o,
        Yr: u
      };
      if (!i) {
        Pr(v, za);
      }
      W(v, o);
      W(o, u);
      S(n, l);
      S(L, [ Z.bind(0, v), e(l, R, f, c, p, r) ]);
      return l;
    };
    var V = k.bind(0, true);
    var B = k.bind(0, false);
    var j = function appendElements() {
      W(E, H[0].Gr);
      W(E, M[0].Gr);
      cr((function() {
        R(ka);
      }), 300);
    };
    V();
    B();
    return [ {
      Xr: I,
      Zr: D,
      $r: R,
      Jr: {
        Kr: H,
        Qr: V,
        ra: P.bind(0, H)
      },
      aa: {
        Kr: M,
        Qr: B,
        ra: P.bind(0, M)
      }
    }, j, x.bind(0, L) ];
  };
  var Hn = function createScrollbarsSetup(r, a, e, n) {
    var t;
    var i;
    var v;
    var o;
    var u;
    var f = 0;
    var l = Re({});
    var c = l[0];
    var s = br(), d = s[0], h = s[1];
    var p = br(), g = p[0], w = p[1];
    var b = br(100), m = b[0], y = b[1];
    var S = br(100), C = S[0], O = S[1];
    var E = br((function() {
      return f;
    })), z = E[0], P = E[1];
    var T = Ln(r, e.Nr, On(a, e)), A = T[0], L = T[1], H = T[2];
    var M = e.Nr, R = M.$, k = M.J, V = M.er, B = M.nr, j = M.cr, U = M.ur;
    var F = A.Jr, N = A.aa, Y = A.$r, W = A.Xr, G = A.Zr;
    var X = F.ra;
    var Z = N.ra;
    var $ = function styleScrollbarPosition(r) {
      var a = r.Gr;
      var e = j && !U && q(a) === k && a;
      return [ e, {
        transform: e ? "translate(" + I(V) + "px, " + D(V) + "px)" : ""
      } ];
    };
    var J = function manageScrollbarsAutoHide(r, a) {
      P();
      if (r) {
        Y(ja);
      } else {
        var e = function hide() {
          return Y(ja, true);
        };
        if (f > 0 && !a) {
          z(e);
        } else {
          e();
        }
      }
    };
    var K = function onHostMouseEnter() {
      o = i;
      o && J(true);
    };
    var Q = [ y, P, O, w, h, H, Xr(R, "pointerover", K, {
      O: true
    }), Xr(R, "pointerenter", K), Xr(R, "pointerleave", (function() {
      o = false;
      i && J(false);
    })), Xr(R, "pointermove", (function() {
      t && d((function() {
        y();
        J(true);
        C((function() {
          t && J(false);
        }));
      }));
    })), Xr(B, "scroll", (function(r) {
      g((function() {
        G(e());
        v && J(true);
        m((function() {
          v && !o && J(false);
        }));
      }));
      n(r);
      j && X($);
      j && Z($);
    })) ];
    var rr = c.bind(0);
    rr.Nr = A;
    rr.Fr = L;
    return [ function(r, n, o) {
      var l = o.Lr, c = o.Hr, s = o.Ar, d = o.mr;
      var h = Ce(), p = h.L;
      var g = Me(a, r, n);
      var w = e();
      var b = w.Pr, m = w.Or, y = w.br;
      var S = g("showNativeOverlaidScrollbars"), C = S[0], O = S[1];
      var x = g("scrollbars.theme"), E = x[0], z = x[1];
      var P = g("scrollbars.visibility"), T = P[0], A = P[1];
      var L = g("scrollbars.autoHide"), H = L[0], M = L[1];
      var R = g("scrollbars.autoHideDelay"), I = R[0];
      var D = g("scrollbars.dragScroll"), k = D[0], V = D[1];
      var B = g("scrollbars.clickScroll"), j = B[0], q = B[1];
      var F = l || c || d;
      var N = s || A;
      var X = C && p.x && p.y;
      var Z = function setScrollbarVisibility(r, a) {
        var e = "visible" === T || "auto" === T && "scroll" === r;
        Y(Ia, e, a);
        return e;
      };
      f = I;
      if (O) {
        Y(Pa, X);
      }
      if (z) {
        Y(u);
        Y(E, true);
        u = E;
      }
      if (M) {
        t = "move" === H;
        i = "leave" === H;
        v = "never" !== H;
        J(!v, true);
      }
      if (V) {
        Y(Fa, k);
      }
      if (q) {
        Y(qa, j);
      }
      if (N) {
        var $ = Z(m.x, true);
        var K = Z(m.y, false);
        var Q = $ && K;
        Y(Da, !Q);
      }
      if (F) {
        W(w);
        G(w);
        Y(Ba, !b.x, true);
        Y(Ba, !b.y, false);
        Y(Aa, y && !U);
      }
    }, rr, x.bind(0, Q) ];
  };
  var Mn = function invokePluginInstance(r, a, e) {
    if (d(r)) {
      r(a || void 0, e || void 0);
    }
  };
  var Rn = function OverlayScrollbars(r, a, e) {
    var n = Ce(), t = n.Y, i = n.F, v = n.U, o = n.q;
    var u = Ya();
    var f = b(r);
    var l = f ? r : r.target;
    var c = Le(l);
    if (a && !c) {
      var s = false;
      var d = function validateOptions(r) {
        var a = Ya()[ne];
        var e = a && a.P;
        return e ? e(r, true) : r;
      };
      var h = P({}, t(), d(a));
      var p = ra(e), g = p[0], w = p[1], m = p[2];
      var y = _n(r, h), S = y[0], C = y[1], O = y[2];
      var x = Hn(r, h, C, (function(r) {
        return m("scroll", [ k, r ]);
      })), E = x[0], A = x[1], L = x[2];
      var H = function update(r, a) {
        return S(r, !!a);
      };
      var M = H.bind(0, {}, true);
      var R = v(M);
      var I = o(M);
      var D = function destroy(r) {
        Ae(l);
        R();
        I();
        L();
        O();
        s = true;
        m("destroyed", [ k, !!r ]);
        w();
      };
      var k = {
        options: function options(r, a) {
          if (r) {
            var e = a ? t() : {};
            var n = na(h, P(e, d(r)));
            if (!T(n)) {
              P(h, n);
              H(n);
            }
          }
          return P({}, h);
        },
        on: g,
        off: function off(r, a) {
          r && a && w(r, a);
        },
        state: function state() {
          var r = C(), a = r.zr, e = r.Pr, n = r.Or, t = r.Tr, i = r.K, v = r.yr, o = r.br;
          return P({}, {
            overflowEdge: a,
            overflowAmount: e,
            overflowStyle: n,
            hasOverflow: t,
            padding: i,
            paddingAbsolute: v,
            directionRTL: o,
            destroyed: s
          });
        },
        elements: function elements() {
          var r = C.Nr, a = r.Z, e = r.$, n = r.K, t = r.J, i = r.rr, v = r.er, o = r.nr;
          var u = A.Nr, f = u.Jr, l = u.aa;
          var c = function translateScrollbarStructure(r) {
            var a = r.Yr, e = r.Wr, n = r.Gr;
            return {
              scrollbar: n,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Kr, e = r.Qr;
            var n = c(a[0]);
            return P({}, n, {
              clone: function clone() {
                var r = c(e());
                E({}, true, {});
                return r;
              }
            });
          };
          return P({}, {
            target: a,
            host: e,
            padding: n || t,
            viewport: t,
            content: i || t,
            scrollOffsetElement: v,
            scrollEventElement: o,
            scrollbarHorizontal: s(f),
            scrollbarVertical: s(l)
          });
        },
        update: function update(r) {
          return H({}, r);
        },
        destroy: D.bind(0)
      };
      C.qr((function(r, a, e) {
        E(a, e, r);
      }));
      Te(l, k);
      each(z(u), (function(r) {
        return Mn(u[r], 0, k);
      }));
      if (ze(C.Nr.ur, i().cancel, !f && r.cancel)) {
        D(true);
        return k;
      }
      C.Fr();
      A.Fr();
      m("initialized", [ k ]);
      C.qr((function(r, a, e) {
        var n = r._r, t = r.mr, i = r.gr, v = r.Lr, o = r.Hr, u = r.Ar, f = r.wr, l = r.Er;
        m("updated", [ k, {
          updateHints: {
            sizeChanged: n,
            directionChanged: t,
            heightIntrinsicChanged: i,
            overflowEdgeChanged: v,
            overflowAmountChanged: o,
            overflowStyleChanged: u,
            contentMutation: f,
            hostMutation: l
          },
          changedOptions: a,
          force: e
        } ]);
      }));
      k.update(true);
      return k;
    }
    return c;
  };
  Rn.plugin = function(r) {
    each(Wa(r), (function(r) {
      return Mn(r, Rn);
    }));
  };
  Rn.valid = function(r) {
    var a = r && r.elements;
    var e = d(a) && a();
    return w(e) && !!Le(e.target);
  };
  Rn.env = function() {
    var r = Ce(), a = r.V, e = r.L, n = r.A, t = r.B, i = r.j, v = r.H, o = r.G, u = r.X, f = r.F, l = r.N, c = r.Y, s = r.W;
    return P({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: n,
      rtlScrollBehavior: t,
      flexboxGlue: i,
      cssCustomProperties: v,
      staticDefaultInitialization: o,
      staticDefaultOptions: u,
      getDefaultInitialization: f,
      setDefaultInitialization: l,
      getDefaultOptions: c,
      setDefaultOptions: s
    });
  };
  r.ClickScrollPlugin = ge;
  r.OverlayScrollbars = Rn;
  r.ScrollbarsHidingPlugin = he;
  r.SizeObserverPlugin = oe;
  Object.defineProperty(r, "ea", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
