/*!
 * OverlayScrollbars
 * Version: 2.2.0
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
        var v = window.getComputedStyle(r, null);
        t = e ? Lr(r, v, a) : a.reduce((function(a, e) {
          a[e] = Lr(r, v, e);
          return a;
        }), t);
      }
      return t;
    }
    r && each(z(a), (function(e) {
      return Hr(r, e, a[e]);
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
    var f = function getCurrentCache(r) {
      return [ v, !!r, i ];
    };
    return [ a ? u : o, f ];
  };
  var e = function isClient() {
    return "undefined" !== typeof window;
  };
  var n = e() && Node.ELEMENT_NODE;
  var t = Object.prototype, v = t.toString, i = t.hasOwnProperty;
  var o = function isUndefined(r) {
    return void 0 === r;
  };
  var u = function isNull(r) {
    return null === r;
  };
  var f = function type(r) {
    return o(r) || u(r) ? "" + r : v.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
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
    var v = i.call(r, e);
    var u = t && i.call(t, "isPrototypeOf");
    if (n && !v && !u) {
      return false;
    }
    for (a in r) {}
    return o(a) || i.call(r, a);
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
  var P = function assignDeep(r, a, e, n, t, v, i) {
    var o = [ a, e, n, t, v, i ];
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
          var v = r[e];
          var i = v;
          if (t && !h(v)) {
            i = [];
          } else if (!t && !w(v)) {
            i = {};
          }
          r[e] = assignDeep(i, n);
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
  var H = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var R = function attrClass(r, a, e, n) {
    if (e) {
      var t = L(r, a) || "";
      var v = new Set(t.split(" "));
      v[n ? "add" : "delete"](e);
      var i = C(v).join(" ").trim();
      L(r, a, i);
    }
  };
  var M = function hasAttrClass(r, a, e) {
    var n = L(r, a) || "";
    var t = new Set(n.split(" "));
    return t.has(e);
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
    var v = F(t, a) === n;
    return n && t ? n === r || t === r || v && F(F(r, e), a) !== n : false;
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
      var v = t.replace(/-/g, "");
      var i = [ r, t + r, v + e, K(v) + e ];
      return !(a = i.find((function(r) {
        return void 0 !== n[r];
      })));
    }));
    return nr[r] = a || "";
  };
  var vr = function jsAPI(r) {
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
  var ir = vr("MutationObserver");
  var or = vr("IntersectionObserver");
  var ur = vr("ResizeObserver");
  var fr = vr("cancelAnimationFrame");
  var lr = vr("requestAnimationFrame");
  var cr = e() && window.setTimeout;
  var sr = e() && window.clearTimeout;
  var dr = /[^\x20\t\r\n\f]+/g;
  var hr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var v = 0;
    var i = false;
    if (n && a && c(a)) {
      var o = a.match(dr) || [];
      i = o.length > 0;
      while (t = o[v++]) {
        i = !!e(n, t) && i;
      }
    }
    return i;
  };
  var pr = function removeClass(r, a) {
    hr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var gr = function addClass(r, a) {
    hr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return pr.bind(0, r, a);
  };
  var _r = Math.max;
  var wr = function animationCurrentTime() {
    return performance.now();
  };
  var br = function animateNumber(r, a, e, n, t) {
    var v = 0;
    var i = wr();
    var o = _r(0, e);
    var u = function frame(e) {
      var u = wr();
      var f = u - i;
      var l = f >= o;
      var c = e ? 1 : 1 - (_r(0, i + o - u) / o || 0);
      var s = (a - r) * (d(t) ? t(c, c * o, 0, 1, o) : c) + r;
      var h = l || 1 === c;
      n && n(s, c, h);
      v = h ? 0 : lr((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      fr(v);
      r && u(r);
    };
  };
  var mr = function equal(r, a, e, n) {
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
  var yr = function equalWH(r, a) {
    return mr(r, a, [ "w", "h" ]);
  };
  var Sr = function equalXY(r, a) {
    return mr(r, a, [ "x", "y" ]);
  };
  var Cr = function equalTRBL(r, a) {
    return mr(r, a, [ "t", "r", "b", "l" ]);
  };
  var Or = function equalBCRWH(r, a, e) {
    return mr(r, a, [ "width", "height" ], e && function(r) {
      return Math.round(r);
    });
  };
  var xr = function noop() {};
  var Er = function selfClearTimeout(r) {
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
  var zr = function debounce(r, a) {
    var e;
    var n;
    var t;
    var v = xr;
    var i = a || {}, o = i.p, u = i.g, f = i._;
    var c = function invokeFunctionToDebounce(a) {
      v();
      sr(e);
      e = n = void 0;
      v = xr;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return f && n ? f(n, r) : r;
    };
    var h = function flush() {
      if (v !== xr) {
        c(s(t) || t);
      }
    };
    var p = function debouncedFn() {
      var r = C(arguments);
      var a = d(o) ? o() : o;
      var i = l(a) && a >= 0;
      if (i) {
        var f = d(u) ? u() : u;
        var p = l(f) && f >= 0;
        var g = a > 0 ? cr : lr;
        var w = a > 0 ? sr : fr;
        var b = s(r);
        var m = b || r;
        var y = c.bind(0, m);
        v();
        var S = g(y, a);
        v = function clear() {
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
  var Pr = {
    opacity: 1,
    zindex: 1
  };
  var Tr = function parseToZeroOrNumber(r, a) {
    var e = a ? parseFloat(r) : parseInt(r, 10);
    return e === e ? e : 0;
  };
  var Ar = function adaptCSSVal(r, a) {
    return !Pr[r.toLowerCase()] && l(a) ? a + "px" : a;
  };
  var Lr = function getCSSVal(r, a, e) {
    return null != a ? a[e] || a.getPropertyValue(e) : r.style[e];
  };
  var Hr = function setCSSVal(r, a, e) {
    try {
      var n = r.style;
      if (!o(n[a])) {
        n[a] = Ar(a, e);
      } else {
        n.setProperty(a, e);
      }
    } catch (t) {}
  };
  var Rr = function directionIsRTL(r) {
    return "rtl" === style(r, "direction");
  };
  var Mr = function topRightBottomLeft(r, a, e) {
    var n = a ? a + "-" : "";
    var t = e ? "-" + e : "";
    var v = n + "top" + t;
    var i = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var f = style(r, [ v, i, o, u ]);
    return {
      t: Tr(f[v], true),
      r: Tr(f[i], true),
      b: Tr(f[o], true),
      l: Tr(f[u], true)
    };
  };
  var Ir = Math.round;
  var Dr = {
    w: 0,
    h: 0
  };
  var kr = function windowSize() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  };
  var Vr = function offsetSize(r) {
    return r ? {
      w: r.offsetWidth,
      h: r.offsetHeight
    } : Dr;
  };
  var Br = function clientSize(r) {
    return r ? {
      w: r.clientWidth,
      h: r.clientHeight
    } : Dr;
  };
  var jr = function scrollSize(r) {
    return r ? {
      w: r.scrollWidth,
      h: r.scrollHeight
    } : Dr;
  };
  var Ur = function fractionalSize(r) {
    var a = parseFloat(style(r, "height")) || 0;
    var e = parseFloat(style(r, "width")) || 0;
    return {
      w: e - Ir(e),
      h: a - Ir(a)
    };
  };
  var qr = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var Fr;
  var Nr = function supportPassiveEvents() {
    if (o(Fr)) {
      Fr = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            Fr = true;
          }
        }));
      } catch (r) {}
    }
    return Fr;
  };
  var Yr = function splitEventNames(r) {
    return r.split(" ");
  };
  var Wr = function off(r, a, e, n) {
    each(Yr(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var Gr = function on(r, a, e, n) {
    var t;
    var v = Nr();
    var i = null != (t = v && n && n.S) ? t : v;
    var o = n && n.C || false;
    var u = n && n.O || false;
    var f = [];
    var l = v ? {
      passive: i,
      capture: o
    } : o;
    each(Yr(a), (function(a) {
      var n = u ? function(t) {
        r.removeEventListener(a, n, o);
        e && e(t);
      } : e;
      S(f, Wr.bind(null, r, a, n, o));
      r.addEventListener(a, n, l);
    }));
    return x.bind(0, f);
  };
  var Xr = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var Zr = function preventDefault(r) {
    return r.preventDefault();
  };
  var $r = {
    x: 0,
    y: 0
  };
  var Jr = function absoluteCoordinates(r) {
    var a = r ? qr(r) : 0;
    return a ? {
      x: a.left + window.pageYOffset,
      y: a.top + window.pageXOffset
    } : $r;
  };
  var Kr = function manageListener(r, a) {
    each(h(a) ? a : [ a ], r);
  };
  var Qr = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        Kr((function(r) {
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
        Kr((function(r) {
          d(r) && t.add(r);
        }), n);
        return e.bind(0, r, n);
      }
      if (s(n) && n) {
        e();
      }
      var v = z(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && S(i, addEvent(a, e));
      }));
      return x.bind(0, i);
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
  var ra = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (d(a)) {
        throw new Error;
      }
      return a;
    }));
  };
  var aa = {
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
  var ea = function getOptionsDiff(r, a) {
    var e = {};
    var n = z(a).concat(z(r));
    each(n, (function(n) {
      var t = r[n];
      var v = a[n];
      if (p(t) && p(v)) {
        P(e[n] = {}, getOptionsDiff(t, v));
        if (T(e[n])) {
          delete e[n];
        }
      } else if (E(a, n) && v !== t) {
        var i = true;
        if (h(t) || h(v)) {
          try {
            if (ra(t) === ra(v)) {
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
  var na = "os-environment";
  var ta = na + "-flexbox-glue";
  var va = ta + "-max";
  var ia = "os-scrollbar-hidden";
  var oa = "data-overlayscrollbars-initialize";
  var ua = "data-overlayscrollbars";
  var fa = ua + "-overflow-x";
  var la = ua + "-overflow-y";
  var ca = "overflowVisible";
  var sa = "scrollbarHidden";
  var da = "scrollbarPressed";
  var ha = "updating";
  var pa = "data-overlayscrollbars-viewport";
  var ga = "arrange";
  var _a = "scrollbarHidden";
  var wa = ca;
  var ba = "data-overlayscrollbars-padding";
  var ma = wa;
  var ya = "data-overlayscrollbars-content";
  var Sa = "os-size-observer";
  var Ca = Sa + "-appear";
  var Oa = Sa + "-listener";
  var xa = Oa + "-scroll";
  var Ea = Oa + "-item";
  var za = Ea + "-final";
  var Pa = "os-trinsic-observer";
  var Ta = "os-no-css-vars";
  var Aa = "os-theme-none";
  var La = "os-scrollbar";
  var Ha = La + "-rtl";
  var Ra = La + "-horizontal";
  var Ma = La + "-vertical";
  var Ia = La + "-track";
  var Da = La + "-handle";
  var ka = La + "-visible";
  var Va = La + "-cornerless";
  var Ba = La + "-transitionless";
  var ja = La + "-interaction";
  var Ua = La + "-unusable";
  var qa = La + "-auto-hidden";
  var Fa = La + "-wheel";
  var Na = Ia + "-interactive";
  var Ya = Da + "-interactive";
  var Wa = {};
  var Ga = function getPlugins() {
    return Wa;
  };
  var Xa = function addPlugin(r) {
    var a = [];
    each(h(r) ? r : [ r ], (function(r) {
      var e = z(r);
      each(e, (function(e) {
        S(a, Wa[e] = r[e]);
      }));
    }));
    return a;
  };
  var Za = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var $a = function validateRecursive(r, a, e, n) {
    var t = {};
    var v = _extends({}, a);
    var i = z(r).filter((function(r) {
      return E(a, r);
    }));
    each(i, (function(i) {
      var u = a[i];
      var l = r[i];
      var s = w(l);
      var d = n ? n + "." : "";
      if (s && w(u)) {
        var p = validateRecursive(l, u, e, d + i), g = p[0], b = p[1];
        t[i] = g;
        v[i] = b;
        each([ v, t ], (function(r) {
          if (T(r[i])) {
            delete r[i];
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
          each(Za, (function(e, n) {
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
            m = Za[O] === r;
          }
          S(C, e ? Za.string : a);
          return !m;
        }));
        if (m) {
          t[i] = u;
        } else if (e) {
          console.warn('The option "' + d + i + "\" wasn't set, because it doesn't accept the type [ " + O.toUpperCase() + ' ] with the value of "' + u + '".\r\n' + "Accepted types are: [ " + C.join(", ").toUpperCase() + " ].\r\n" + (y.length > 0 ? "\r\nValid strings are: [ " + y.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ t, v ];
  };
  var Ja = function validateOptions(r, a, e) {
    return $a(r, a, e);
  };
  var Ka = Za.number;
  var Qa = Za.boolean;
  var re = [ Za.array, Za.null ];
  var ae = "hidden scroll visible visible-hidden";
  var ee = "visible hidden auto";
  var ne = "never scroll leavemove";
  var te = {
    paddingAbsolute: Qa,
    showNativeOverlaidScrollbars: Qa,
    update: {
      elementEvents: re,
      attributes: re,
      debounce: [ Za.number, Za.array, Za.null ],
      ignoreMutation: [ Za.function, Za.null ]
    },
    overflow: {
      x: ae,
      y: ae
    },
    scrollbars: {
      theme: [ Za.string, Za.null ],
      visibility: ee,
      autoHide: ne,
      autoHideDelay: Ka,
      dragScroll: Qa,
      clickScroll: Qa,
      pointers: [ Za.array, Za.null ]
    }
  };
  var ve = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function() {
    var r;
    return r = {}, r[ve] = {
      P: function _(r, a) {
        var e = Ja(te, r, a), n = e[0], t = e[1];
        return _extends({}, t, n);
      }
    }, r;
  })();
  var ie = 3333333;
  var oe = "scroll";
  var ue = "__osSizeObserverPlugin";
  var fe = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[ue] = {
      P: function _(r, a, e) {
        var n = J('<div class="' + Ea + '" dir="ltr"><div class="' + Ea + '"><div class="' + za + '"></div></div><div class="' + Ea + '"><div class="' + za + '" style="width: 200%; height: 200%"></div></div></div>');
        W(r, n);
        gr(r, xa);
        var t = n[0];
        var v = t.lastChild;
        var i = t.firstChild;
        var o = null == i ? void 0 : i.firstChild;
        var u = Vr(t);
        var f = u;
        var l = false;
        var c;
        var s = function reset() {
          I(i, ie);
          D(i, ie);
          I(v, ie);
          D(v, ie);
        };
        var d = function onResized(r) {
          c = 0;
          if (l) {
            u = f;
            a(true === r);
          }
        };
        var h = function onScroll(r) {
          f = Vr(t);
          l = !r || !yr(f, u);
          if (r) {
            Xr(r);
            if (l && !c) {
              fr(c);
              c = lr(d);
            }
          } else {
            d(false === r);
          }
          s();
        };
        var p = S([], [ Gr(i, oe, h), Gr(v, oe, h) ]);
        style(o, {
          width: ie,
          height: ie
        });
        lr(s);
        return [ e ? h.bind(0, false) : s, p ];
      }
    }, r;
  }();
  var le = 0;
  var ce = Math.round, se = Math.abs;
  var de = function getWindowDPR() {
    var r = window.screen.deviceXDPI || 0;
    var a = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || r / a;
  };
  var he = function diffBiggerThanOne(r, a) {
    var e = se(r);
    var n = se(a);
    return !(e === n || e + 1 === n || e - 1 === n);
  };
  var pe = "__osScrollbarsHidingPlugin";
  var ge = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[pe] = {
      T: function _createUniqueViewportArrangeElement(r) {
        var a = r.A, e = r.L, n = r.H;
        var t = !n && !a && (e.x || e.y);
        var v = t ? document.createElement("style") : false;
        if (v) {
          L(v, "id", pa + "-" + ga + "-" + le);
          le++;
        }
        return v;
      },
      R: function _overflowUpdateSegment(r, a, e, n, t, v, i) {
        var o = function arrangeViewport(a, v, i, o) {
          if (r) {
            var u = t(), f = u.M;
            var l = a.I, c = a.D;
            var s = c.x, d = c.y;
            var h = l.x, p = l.y;
            var g = o ? "paddingRight" : "paddingLeft";
            var w = f[g];
            var b = f.paddingTop;
            var m = v.w + i.w;
            var y = v.h + i.h;
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
                    C.insertRule("#" + L(n, "id") + " + [" + pa + "~='" + ga + "']::before {}", 0);
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
            var f = u || v(n);
            var l = t(), c = l.M;
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
            R(e, pa, ga);
            if (!a) {
              p.height = "";
            }
            style(e, p);
            return [ function() {
              i(f, o, r, w);
              style(e, w);
              R(e, pa, ga, true);
            }, f ];
          }
          return [ xr ];
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
          var v = kr();
          var i = {
            w: v.w - r.w,
            h: v.h - r.h
          };
          if (0 === i.w && 0 === i.h) {
            return;
          }
          var o = {
            w: se(i.w),
            h: se(i.h)
          };
          var u = {
            w: se(ce(v.w / (r.w / 100))),
            h: se(ce(v.h / (r.h / 100)))
          };
          var f = de();
          var l = o.w > 2 && o.h > 2;
          var c = !he(u.w, u.h);
          var s = f !== a && f > 0;
          var d = l && c && s;
          if (d) {
            var h = n(), p = h[0], g = h[1];
            P(e.V, p);
            if (g) {
              t();
            }
          }
          r = v;
          a = f;
        };
      }
    }, r;
  }();
  var _e = "__osClickScrollPlugin";
  var we = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[_e] = {
      P: function _(r, a, e, n, t) {
        var v = 0;
        var i = xr;
        var o = function animateClickScroll(o) {
          i = br(o, o + n * Math.sign(e), 133, (function(e, o, u) {
            r(e);
            var f = a();
            var l = f + n;
            var c = t >= f && t <= l;
            if (u && !c) {
              if (v) {
                animateClickScroll(e);
              } else {
                var s = setTimeout((function() {
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
      }
    }, r;
  }();
  var be;
  var me = function getNativeScrollbarSize(r, a, e, n) {
    W(r, a);
    var t = Br(a);
    var v = Vr(a);
    var i = Ur(e);
    n && Z(a);
    return {
      x: v.h - t.h + i.h,
      y: v.w - t.w + i.w
    };
  };
  var ye = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = gr(r, ia);
    try {
      a = "none" === style(r, tr("scrollbar-width")) || "none" === window.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display");
    } catch (n) {}
    e();
    return a;
  };
  var Se = function getRtlScrollBehavior(r, a) {
    var e = "hidden";
    style(r, {
      overflowX: e,
      overflowY: e,
      direction: "rtl"
    });
    I(r, 0);
    var n = Jr(r);
    var t = Jr(a);
    I(r, -999);
    var v = Jr(a);
    return {
      i: n.x === t.x,
      n: t.x !== v.x
    };
  };
  var Ce = function getFlexboxGlue(r, a) {
    var e = gr(r, ta);
    var n = qr(r);
    var t = qr(a);
    var v = Or(t, n, true);
    var i = gr(r, va);
    var o = qr(r);
    var u = qr(a);
    var f = Or(u, o, true);
    e();
    i();
    return v && f;
  };
  var Oe = function createEnvironment() {
    var r = document, e = r.body;
    var n = J('<div class="' + na + '"><div></div></div>');
    var t = n[0];
    var v = t.firstChild;
    var i = Qr(), o = i[0], u = i[2];
    var f = a({
      v: me(e, t, v),
      o: Sr
    }, me.bind(0, e, t, v, true)), l = f[0], c = f[1];
    var s = c(), d = s[0];
    var h = ye(t);
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
    var w = P({}, aa);
    var b = P.bind(0, {}, w);
    var m = P.bind(0, {}, g);
    var y = {
      V: d,
      L: p,
      A: h,
      H: "-1" === style(t, "zIndex"),
      B: Se(t, v),
      j: Ce(t, v),
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
    var C = zr((function(r) {
      return u(r ? "z" : "r");
    }), {
      p: 33,
      g: 99
    });
    H(t, "style");
    Z(t);
    S("resize", C.bind(0, false));
    if (!h && (!p.x || !p.y)) {
      var O;
      S("resize", (function() {
        var r = Ga()[pe];
        O = O || r && r.k();
        O && O(y, l, C.bind(0, true));
      }));
    }
    return y;
  };
  var xe = function getEnvironment() {
    if (!be) {
      be = Oe();
    }
    return be;
  };
  var Ee = function resolveInitialization(r, a) {
    return d(a) ? a.apply(0, r) : a;
  };
  var ze = function staticInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var v = Ee(r, t);
    return v || a.apply(0, r);
  };
  var Pe = function dynamicInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var v = Ee(r, t);
    return !!v && (b(v) ? v : a.apply(0, r));
  };
  var Te = function cancelInitialization(r, a, e) {
    var n = e || {}, t = n.nativeScrollbarsOverlaid, v = n.body;
    var i = xe(), f = i.L, l = i.A;
    var c = a.nativeScrollbarsOverlaid, s = a.body;
    var d = null != t ? t : c;
    var h = o(v) ? s : v;
    var p = (f.x || f.y) && d;
    var g = r && (u(h) ? !l : h);
    return !!p || !!g;
  };
  var Ae = new WeakMap;
  var Le = function addInstance(r, a) {
    Ae.set(r, a);
  };
  var He = function removeInstance(r) {
    Ae.delete(r);
  };
  var Re = function getInstance(r) {
    return Ae.get(r);
  };
  var Me = function getPropByPath(r, a) {
    return r ? a.split(".").reduce((function(r, a) {
      return r && E(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ie = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ Me(r, n), e || void 0 !== Me(a, n) ];
    };
  };
  var De = function createState(r) {
    var a = r;
    return [ function() {
      return a;
    }, function(r) {
      a = P({}, a, r);
    } ];
  };
  var ke = "tabindex";
  var Ve = $.bind(0, "");
  var Be = function unwrap(r) {
    W(q(r), U(r));
    Z(r);
  };
  var je = function createStructureSetupElements(r) {
    var a = xe();
    var e = a.F, n = a.A;
    var t = Ga()[pe];
    var v = t && t.T;
    var i = e(), o = i.elements;
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
    var D = ze.bind(0, [ O ]);
    var k = Pe.bind(0, [ O ]);
    var V = Ee.bind(0, [ O ]);
    var B = D.bind(0, Ve, l);
    var F = k.bind(0, Ve, c);
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
    var tr = E ? D(Ve, u, g) : O;
    var vr = $ ? nr : tr;
    var ir = K ? ar : J;
    var or = P.activeElement;
    var ur = !Y && I.top === I && or === O;
    var fr = {
      Z: O,
      $: vr,
      J: nr,
      K: !Y && k(Ve, f, w),
      rr: ir,
      ar: !Y && !n && v && v(a),
      er: $ ? T : nr,
      nr: $ ? P : nr,
      tr: I,
      vr: P,
      ir: E,
      ur: A,
      lr: s,
      cr: Y,
      sr: K,
      dr: function _viewportHasClass(r, a) {
        return M(nr, Y ? ua : pa, Y ? a : r);
      },
      hr: function _viewportAddRemoveClass(r, a, e) {
        return R(nr, Y ? ua : pa, Y ? a : r, e);
      }
    };
    var lr = z(fr).reduce((function(r, a) {
      var e = fr[a];
      return S(r, e && !q(e) ? e : false);
    }), []);
    var cr = function elementIsGenerated(r) {
      return r ? y(lr, r) > -1 : null;
    };
    var sr = fr.Z, dr = fr.$, hr = fr.K, pr = fr.J, _r = fr.rr, wr = fr.ar;
    var br = [ function() {
      H(dr, ua);
      H(dr, oa);
      H(sr, oa);
      if (A) {
        H(T, ua);
        H(T, oa);
      }
    } ];
    var mr = E && cr(dr);
    var yr = E ? sr : U([ _r, pr, hr, dr, sr ].find((function(r) {
      return false === cr(r);
    })));
    var Sr = $ ? sr : _r || pr;
    var Cr = function appendElements() {
      L(dr, ua, Y ? "viewport" : "host");
      L(hr, ba, "");
      L(_r, ya, "");
      if (!Y) {
        L(pr, pa, "");
      }
      var r = A && !Y ? gr(q(O), ia) : xr;
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
      W(pr, _r);
      S(br, (function() {
        r();
        H(hr, ba);
        H(_r, ya);
        H(pr, fa);
        H(pr, la);
        H(pr, pa);
        if (cr(_r)) {
          Be(_r);
        }
        if (cr(pr)) {
          Be(pr);
        }
        if (cr(hr)) {
          Be(hr);
        }
      }));
      if (n && !Y) {
        R(pr, pa, _a, true);
        S(br, H.bind(0, pr, pa));
      }
      if (wr) {
        G(pr, wr);
        S(br, Z.bind(0, wr));
      }
      if (ur) {
        var a = L(pr, ke);
        L(pr, ke, "-1");
        pr.focus();
        var e = function revertViewportTabIndex() {
          return a ? L(pr, ke, a) : H(pr, ke);
        };
        var t = Gr(P, "pointerdown keydown", (function() {
          e();
          t();
        }));
        S(br, [ e, t ]);
      } else if (or && or.focus) {
        or.focus();
      }
      yr = 0;
    };
    return [ fr, Cr, x.bind(0, br) ];
  };
  var Ue = function createTrinsicUpdateSegment(r, a) {
    var e = r.rr;
    var n = a[0];
    return function(r) {
      var a = xe(), t = a.j;
      var v = n(), i = v.pr;
      var o = r.gr;
      var u = (e || !t) && o;
      if (u) {
        style(e, {
          height: i ? "" : "100%"
        });
      }
      return {
        _r: u,
        wr: u
      };
    };
  };
  var qe = function createPaddingUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var v = r.$, i = r.K, o = r.J, u = r.cr;
    var f = a({
      o: Cr,
      v: Mr()
    }, Mr.bind(0, v, "padding", "")), l = f[0], c = f[1];
    return function(r, a, e) {
      var v = c(e), f = v[0], s = v[1];
      var d = xe(), h = d.A, p = d.j;
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
        var T = !C || !i && !h;
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
        var R = {
          paddingTop: T ? f.t : 0,
          paddingRight: T ? f.r : 0,
          paddingBottom: T ? f.b : 0,
          paddingLeft: T ? f.l : 0
        };
        style(i || o, H);
        style(o, R);
        t({
          K: f,
          yr: !T,
          M: i ? R : P({}, H, R)
        });
      }
      return {
        Sr: z
      };
    };
  };
  var Fe = Math.max;
  var Ne = Fe.bind(0, 0);
  var Ye = "visible";
  var We = "hidden";
  var Ge = 42;
  var Xe = {
    o: yr,
    v: {
      w: 0,
      h: 0
    }
  };
  var Ze = {
    o: Sr,
    v: {
      x: We,
      y: We
    }
  };
  var $e = function getOverflowAmount(r, a) {
    var e = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    var n = {
      w: Ne(r.w - a.w),
      h: Ne(r.h - a.h)
    };
    return {
      w: n.w > e ? n.w : 0,
      h: n.h > e ? n.h : 0
    };
  };
  var Je = function overflowIsVisible(r) {
    return 0 === r.indexOf(Ye);
  };
  var Ke = function createOverflowUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var v = r.$, i = r.K, o = r.J, u = r.ar, f = r.cr, l = r.hr, c = r.ur, s = r.tr;
    var d = xe(), h = d.V, p = d.j, g = d.A, w = d.L;
    var b = Ga()[pe];
    var m = !f && !g && (w.x || w.y);
    var y = c && f;
    var S = a(Xe, Ur.bind(0, o)), C = S[0], O = S[1];
    var x = a(Xe, jr.bind(0, o)), E = x[0], z = x[1];
    var P = a(Xe), T = P[0], A = P[1];
    var H = a(Xe), M = H[0], I = H[1];
    var D = a(Ze), k = D[0];
    var V = function fixFlexboxGlue(r, a) {
      style(o, {
        height: ""
      });
      if (a) {
        var e = n(), t = e.yr, i = e.K;
        var u = r.Cr, f = r.I;
        var l = Ur(v);
        var c = Br(v);
        var s = "content-box" === style(o, "boxSizing");
        var d = t || s ? i.b + i.t : 0;
        var h = !(w.x && s);
        style(o, {
          height: c.h + l.h + (u.x && h ? f.x : 0) - d
        });
      }
    };
    var B = function getViewportOverflowState(r, a) {
      var e = !g && !r ? Ge : 0;
      var n = function getStatePerAxis(r, n, t) {
        var v = style(o, r);
        var i = a ? a[r] : v;
        var u = "scroll" === i;
        var f = n ? e : t;
        var l = u && !g ? f : 0;
        var c = n && !!e;
        return [ v, u, l, c ];
      };
      var t = n("overflowX", w.x, h.x), v = t[0], i = t[1], u = t[2], f = t[3];
      var l = n("overflowY", w.y, h.y), c = l[0], s = l[1], d = l[2], p = l[3];
      return {
        Or: {
          x: v,
          y: c
        },
        Cr: {
          x: i,
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
        var e = Je(r);
        var n = a && e && r.replace(Ye + "-", "") || "";
        return [ a && !e ? r : "", Je(n) ? "hidden" : n ];
      };
      var v = t(e.x, a.x), i = v[0], o = v[1];
      var u = t(e.y, a.y), f = u[0], l = u[1];
      n.overflowX = o && f ? o : i;
      n.overflowY = l && i ? l : f;
      return B(r, n);
    };
    var U = function hideNativeScrollbars(r, a, e, t) {
      var v = r.I, i = r.D;
      var o = i.x, u = i.y;
      var f = v.x, l = v.y;
      var c = n(), s = c.M;
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
    var q = b ? b.R(m, p, o, u, n, B, U) : [ function() {
      return m;
    }, function() {
      return [ xr ];
    } ], F = q[0], N = q[1];
    return function(r, a, e) {
      var u = r._r, c = r.Er, d = r.wr, h = r.Sr, b = r.gr, m = r.mr;
      var S = n(), x = S.pr, P = S.br;
      var H = a("showNativeOverlaidScrollbars"), D = H[0], q = H[1];
      var Y = a("overflow"), W = Y[0], G = Y[1];
      var X = D && w.x && w.y;
      var Z = !f && !p && (u || d || c || q || b);
      var $ = Je(W.x);
      var J = Je(W.y);
      var K = $ || J;
      var Q = O(e);
      var rr = z(e);
      var ar = A(e);
      var er = I(e);
      var nr;
      if (q && g) {
        l(_a, sa, !X);
      }
      if (Z) {
        nr = B(X);
        V(nr, x);
      }
      if (u || h || d || m || q) {
        if (K) {
          l(wa, ca, false);
        }
        var tr = N(X, P, nr), vr = tr[0], ir = tr[1];
        var or = Q = C(e), ur = or[0], fr = or[1];
        var lr = rr = E(e), cr = lr[0], sr = lr[1];
        var dr = Br(o);
        var hr = cr;
        var pr = dr;
        vr();
        if ((sr || fr || q) && ir && !X && F(ir, cr, ur, P)) {
          pr = Br(o);
          hr = jr(o);
        }
        var gr = {
          w: Ne(Fe(cr.w, hr.w) + ur.w),
          h: Ne(Fe(cr.h, hr.h) + ur.h)
        };
        var _r = {
          w: Ne((y ? s.innerWidth : pr.w + Ne(dr.w - cr.w)) + ur.w),
          h: Ne((y ? s.innerHeight + ur.h : pr.h + Ne(dr.h - cr.h)) + ur.h)
        };
        er = M(_r);
        ar = T($e(gr, _r), e);
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
        var Rr = j(X, Ar, W, Hr);
        var Mr = F(Rr, xr, Pr, P);
        if (!f) {
          U(Rr, P, Mr, Hr);
        }
        if (Z) {
          V(Rr, x);
        }
        if (f) {
          L(v, fa, Hr.overflowX);
          L(v, la, Hr.overflowY);
        } else {
          style(o, Hr);
        }
      }
      R(v, ua, ca, Lr);
      R(i, ba, ma, Lr);
      if (!f) {
        R(o, pa, wa, K);
      }
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
  var Qe = function prepareUpdateHints(r, a, e) {
    var n = {};
    var t = a || {};
    var v = z(r).concat(z(t));
    each(v, (function(a) {
      var v = r[a];
      var i = t[a];
      n[a] = !!(e || v || i);
    }));
    return n;
  };
  var rn = function createStructureSetupUpdate(r, a) {
    var e = r.Z, n = r.J, t = r.hr, v = r.cr;
    var i = xe(), o = i.A, u = i.L, f = i.j;
    var l = !o && (u.x || u.y);
    var c = [ Ue(r, a), qe(r, a), Ke(r, a) ];
    return function(r, a, i) {
      var o = Qe(P({
        _r: false,
        Sr: false,
        mr: false,
        gr: false,
        Lr: false,
        Hr: false,
        Ar: false,
        Er: false,
        wr: false
      }, a), {}, i);
      var u = l || !f;
      var s = u && I(n);
      var d = u && D(n);
      t("", ha, true);
      var h = o;
      each(c, (function(a) {
        h = Qe(h, a(h, r, !!i) || {}, i);
      }));
      I(n, s);
      D(n, d);
      t("", ha);
      if (!v) {
        I(e, 0);
        D(e, 0);
      }
      return h;
    };
  };
  var an = function createEventContentChange(r, a, e) {
    var n;
    var t = false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (e) {
        var i = e.reduce((function(a, e) {
          if (e) {
            var n = e[0], t = e[1];
            var i = t && n && (v ? v(n) : V(n, r));
            if (i && i.length && t && c(t)) {
              S(a, [ i, t.trim() ], true);
            }
          }
          return a;
        }), []);
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u) {
              var f = Gr(v, i, (function(r) {
                if (t) {
                  f();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, S(o, f));
            } else {
              x(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    if (e) {
      n = new WeakMap;
      i();
    }
    return [ v, i ];
  };
  var en = function createDOMObserver(r, a, e, n) {
    var t = false;
    var v = n || {}, i = v.Rr, o = v.Mr, u = v.Ir, f = v.Dr, l = v.kr, s = v.Vr;
    var d = zr((function() {
      if (t) {
        e(true);
      }
    }), {
      p: 33,
      g: 99
    });
    var h = an(r, d, u), p = h[0], g = h[1];
    var w = i || [];
    var b = o || [];
    var m = w.concat(b);
    var x = function observerCallback(t, v) {
      var i = l || xr;
      var o = s || xr;
      var u = new Set;
      var d = new Set;
      var h = false;
      var p = false;
      each(t, (function(e) {
        var t = e.attributeName, v = e.target, l = e.type, s = e.oldValue, g = e.addedNodes, w = e.removedNodes;
        var m = "attributes" === l;
        var S = "childList" === l;
        var C = r === v;
        var O = m && c(t) ? L(v, t) : 0;
        var x = 0 !== O && s !== O;
        var E = y(b, t) > -1 && x;
        if (a && (S || !C)) {
          var z = !m;
          var P = m && x;
          var T = P && f && j(v, f);
          var A = T ? !i(v, t, s, O) : z || P;
          var H = A && !o(e, !!T, r, n);
          each(g, (function(r) {
            return u.add(r);
          }));
          each(w, (function(r) {
            return u.add(r);
          }));
          p = p || H;
        }
        if (!a && C && x && !i(v, t, s, O)) {
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
        !v && p && e(false);
        return [ false ];
      }
      if (d.size > 0 || h) {
        var w = [ C(d), h ];
        !v && e.apply(0, w);
        return w;
      }
    };
    var E = new ir((function(r) {
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
  var nn = 3333333;
  var tn = function domRectHasDimensions(r) {
    return r && (r.height || r.width);
  };
  var vn = function createSizeObserver(r, e, n) {
    var t = n || {}, v = t.Br, i = void 0 === v ? false : v, o = t.jr, u = void 0 === o ? false : o;
    var f = Ga()[ue];
    var l = xe(), c = l.B;
    var d = J('<div class="' + Sa + '"><div class="' + Oa + '"></div></div>');
    var g = d[0];
    var w = g.firstChild;
    var b = Rr.bind(0, r);
    var m = a({
      v: void 0,
      u: true,
      o: function _equal(r, a) {
        return !(!r || !tn(r) && tn(a));
      }
    }), y = m[0];
    var C = function onSizeChangedCallbackProxy(r) {
      var a = h(r) && r.length > 0 && p(r[0]);
      var n = !a && s(r[0]);
      var t = false;
      var v = false;
      var o = true;
      if (a) {
        var u = y(r.pop().contentRect), f = u[0], l = u[2];
        var d = tn(f);
        var w = tn(l);
        t = !l || !d;
        v = !w && d;
        o = !t;
      } else if (n) {
        o = r[1];
      } else {
        v = true === r;
      }
      if (i && o) {
        var b = n ? r[0] : Rr(g);
        I(g, b ? c.n ? -nn : c.i ? 0 : nn : nn);
        D(g, nn);
      }
      if (!t) {
        e({
          _r: !n,
          Ur: n ? r : void 0,
          jr: !!v
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
        var n = f.P(w, C, u), t = n[0], v = n[1];
        E = t;
        S(O, v);
      }
      if (i) {
        var o = a({
          v: void 0
        }, b), l = o[0];
        S(O, Gr(g, "scroll", (function(r) {
          var a = l();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            pr(w, "ltr rtl");
            if (e) {
              gr(w, "rtl");
            } else {
              gr(w, "ltr");
            }
            C([ !!e, n, t ]);
          }
          Xr(r);
        })));
      }
      if (E) {
        gr(g, Ca);
        S(O, Gr(g, "animationstart", E, {
          O: !!ur
        }));
      }
      if (ur || f) {
        W(r, g);
      }
    } ];
  };
  var un = function isHeightIntrinsic(r) {
    return 0 === r.h || r.isIntersecting || r.intersectionRatio > 0;
  };
  var fn = function createTrinsicObserver(r, e) {
    var n;
    var t = $(Pa);
    var v = [];
    var i = a({
      v: false
    }), o = i[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(un(r));
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
      x(v);
      Z(t);
    }, function() {
      if (or) {
        n = new or((function(r) {
          return f(r);
        }), {
          root: r
        });
        n.observe(t);
        S(v, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = Vr(t);
          u(r);
        };
        var e = vn(t, a), i = e[0], o = e[1];
        S(v, i);
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
  var ln = "[" + ua + "]";
  var cn = "[" + pa + "]";
  var sn = [ "tabindex" ];
  var dn = [ "wrap", "cols", "rows" ];
  var hn = [ "id", "class", "style", "open" ];
  var pn = function createStructureSetupObservers(r, e, n) {
    var t;
    var v;
    var i;
    var o = r.$, u = r.J, f = r.rr, s = r.ir, p = r.cr, g = r.dr, w = r.hr;
    var b = xe(), m = b.j;
    var C = a({
      o: yr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = g(wa, ca);
      var a = g(ga, "");
      var e = a && I(u);
      var n = a && D(u);
      w(wa, ca);
      w(ga, "");
      w("", ha, true);
      var t = jr(f);
      var v = jr(u);
      var i = Ur(u);
      w(wa, ca, r);
      w(ga, "", a);
      w("", ha);
      I(u, e);
      D(u, n);
      return {
        w: v.w + t.w + i.w,
        h: v.h + t.h + i.h
      };
    })), O = C[0];
    var x = s ? dn : hn.concat(dn);
    var E = zr(n, {
      p: function _timeout() {
        return t;
      },
      g: function _maxDelay() {
        return v;
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
      each(r || sn, (function(r) {
        if (y(sn, r) > -1) {
          var a = L(o, r);
          if (c(a)) {
            L(u, r, a);
          } else {
            H(u, r);
          }
        }
      }));
    };
    var A = function onTrinsicChanged(r, a) {
      var t = r[0], v = r[1];
      var i = {
        gr: v
      };
      e({
        pr: t
      });
      !a && n(i);
      return i;
    };
    var R = function onSizeChanged(r) {
      var a = r._r, t = r.Ur, v = r.jr;
      var i = !a || v ? n : E;
      var o = false;
      if (t) {
        var u = t[0], f = t[1];
        o = f;
        e({
          br: u
        });
      }
      i({
        _r: a,
        mr: o
      });
    };
    var M = function onContentMutation(r, a) {
      var e = O(), t = e[1];
      var v = {
        wr: t
      };
      var i = r ? n : E;
      if (t) {
        !a && i(v);
      }
      return v;
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
    var V = f || !m ? fn(o, A) : [ xr, xr, xr ], B = V[0], j = V[1], U = V[2];
    var q = !p ? vn(o, R, {
      jr: true,
      Br: true
    }) : [ xr, xr ], Y = q[0], W = q[1];
    var G = en(o, false, k, {
      Mr: hn,
      Rr: hn.concat(sn)
    }), X = G[0], Z = G[1];
    var $ = p && ur && new ur(R.bind(0, {
      _r: true
    }));
    $ && $.observe(o);
    T();
    return [ function() {
      B();
      Y();
      i && i[0]();
      $ && $.disconnect();
      X();
    }, function() {
      W();
      j();
    }, function() {
      var r = {};
      var a = Z();
      var e = U();
      var n = i && i[1]();
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
        if (i) {
          i[1]();
          i[0]();
        }
        i = en(f || u, true, M, {
          Rr: x.concat(o || []),
          Ir: g,
          Dr: ln,
          Vr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !p ? N(e, ln, cn) : false;
            return t || !!F(e, "." + La) || !!C(r);
          }
        });
      }
      if (y) {
        E.m();
        if (h(m)) {
          var O = m[0];
          var z = m[1];
          t = l(O) && O;
          v = l(z) && z;
        } else if (l(m)) {
          t = m;
          v = false;
        } else {
          t = false;
          v = false;
        }
      }
    } ];
  };
  var gn = {
    x: 0,
    y: 0
  };
  var _n = function createInitialStructureSetupUpdateState(r) {
    return {
      K: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      yr: false,
      M: {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
      },
      zr: gn,
      Pr: gn,
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
  var wn = function createStructureSetup(r, a) {
    var e = Ie(a, {});
    var n = Qr(), t = n[0], v = n[1], i = n[2];
    var o = je(r), u = o[0], f = o[1], l = o[2];
    var c = De(_n(u));
    var s = c[0], d = c[1];
    var h = rn(u, c);
    var p = function triggerUpdateEvent(r, a, e) {
      var n = z(r).some((function(a) {
        return r[a];
      }));
      var t = n || !T(a) || e;
      if (t) {
        i("u", [ r, a, e ]);
      }
      return t;
    };
    var g = pn(u, d, (function(r) {
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
      var n = Ie(a, r, e);
      y(n);
      return p(h(n, m(), e), r, !!e);
    }, S, function() {
      v();
      w();
      l();
    } ];
  };
  var bn = Math.round;
  var mn = function getScale(r) {
    var a = qr(r), e = a.width, n = a.height;
    var t = Vr(r), v = t.w, i = t.h;
    return {
      x: bn(e) / v || 1,
      y: bn(n) / i || 1
    };
  };
  var yn = function continuePointerDown(r, a, e) {
    var n = a.scrollbars;
    var t = r.button, v = r.isPrimary, i = r.pointerType;
    var o = n.pointers;
    return 0 === t && v && n[e ? "dragScroll" : "clickScroll"] && (o || []).includes(i);
  };
  var Sn = function createRootClickStopPropagationEvents(r, a) {
    return Gr(r, "mousedown", Gr.bind(0, a, "click", Xr, {
      O: true,
      C: true
    }), {
      C: true
    });
  };
  var Cn = "pointerup pointerleave pointercancel lostpointercapture";
  var On = function createInteractiveScrollEvents(r, a, e, n, t, v, i) {
    var o = xe(), u = o.B;
    var f = n.Yr, l = n.Wr, c = n.Gr;
    var s = "scroll" + (i ? "Left" : "Top");
    var d = "client" + (i ? "X" : "Y");
    var h = i ? "width" : "height";
    var p = i ? "left" : "top";
    var g = i ? "w" : "h";
    var w = i ? "x" : "y";
    var b = function createRelativeHandleMove(r, a) {
      return function(e) {
        var n = v(), o = n.Pr;
        var d = Vr(l)[g] - Vr(f)[g];
        var h = a * e / d;
        var p = h * o[w];
        var b = Rr(c);
        var m = b && i ? u.n || u.i ? 1 : -1 : 1;
        t[s] = r + p * m;
      };
    };
    return Gr(l, "pointerdown", (function(n) {
      var v = F(n.target, "." + Da) === f;
      var i = v ? f : l;
      R(a, ua, da, true);
      if (yn(n, r, v)) {
        var o = !v && n.shiftKey;
        var u = function getHandleRect() {
          return qr(f);
        };
        var c = function getTrackRect() {
          return qr(l);
        };
        var g = function getHandleOffset(r, a) {
          return (r || u())[p] - (a || c())[p];
        };
        var m = b(t[s] || 0, 1 / mn(t)[w]);
        var y = n[d];
        var C = u();
        var O = c();
        var E = C[h];
        var z = g(C, O) + E / 2;
        var P = y - O[p];
        var T = v ? 0 : P - z;
        var A = function releasePointerCapture(r) {
          x(L);
          i.releasePointerCapture(r.pointerId);
        };
        var L = [ R.bind(0, a, ua, da), Gr(e, Cn, A), Gr(e, "selectstart", (function(r) {
          return Zr(r);
        }), {
          S: false
        }), Gr(l, Cn, A), Gr(l, "pointermove", (function(r) {
          var a = r[d] - y;
          if (v || o) {
            m(T + a);
          }
        })) ];
        if (o) {
          m(T);
        } else if (!v) {
          var H = Ga()[_e];
          if (H) {
            S(L, H.P(m, g, T, E, P));
          }
        }
        i.setPointerCapture(n.pointerId);
      }
    }));
  };
  var xn = function createScrollbarsSetupEvents(r, a) {
    return function(e, n, t, v, i, o) {
      var u = e.Gr;
      var f = Er(333), l = f[0], c = f[1];
      var s = !!i.scrollBy;
      var d = true;
      return x.bind(0, [ Gr(u, "pointerenter", (function() {
        n(ja, true);
      })), Gr(u, "pointerleave pointercancel", (function() {
        n(ja);
      })), Gr(u, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (s && d && 0 === t && q(u) === v) {
          i.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        d = false;
        n(Fa, true);
        l((function() {
          d = true;
          n(Fa);
        }));
        Zr(r);
      }), {
        S: false,
        C: true
      }), Sn(u, t), On(r, v, t, e, i, a, o), c ]);
    };
  };
  var En = Math.min, zn = Math.max, Pn = Math.abs, Tn = Math.round;
  var An = function getScrollbarHandleLengthRatio(r, a, e, n) {
    if (n) {
      var t = e ? "x" : "y";
      var v = n.Pr, i = n.zr;
      var o = i[t];
      var u = v[t];
      return zn(0, En(1, o / (o + u)));
    }
    var f = e ? "w" : "h";
    var l = Vr(r)[f];
    var c = Vr(a)[f];
    return zn(0, En(1, l / c));
  };
  var Ln = function getScrollbarHandleOffsetRatio(r, a, e, n, t, v) {
    var i = xe(), o = i.B;
    var u = v ? "x" : "y";
    var f = v ? "Left" : "Top";
    var l = n.Pr;
    var c = Tn(l[u]);
    var s = Pn(e["scroll" + f]);
    var d = v && t;
    var h = o.i ? s : c - s;
    var p = d ? h : s;
    var g = En(1, p / c);
    var w = An(r, a, v);
    return 1 / w * (1 - w) * g;
  };
  var Hn = function createScrollbarsSetupElements(r, a, e) {
    var n = xe(), t = n.F, v = n.H;
    var i = t(), o = i.scrollbars;
    var u = o.slot;
    var f = a.vr, l = a.Z, c = a.$, d = a.J, h = a.lr, p = a.er, g = a.ur, w = a.cr;
    var b = h ? {} : r, m = b.scrollbars;
    var y = m || {}, C = y.slot;
    var E = Pe([ l, c, d ], (function() {
      return w && g ? l : c;
    }), u, C);
    var z = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? gr : pr;
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
        var t = r.Yr, v = r.Wr;
        return [ t, (n = {}, n[e ? "width" : "height"] = (100 * An(t, v, e, a)).toFixed(3) + "%", 
        n) ];
      }));
    };
    var A = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      var n = e ? "X" : "Y";
      P(r, (function(r) {
        var t = r.Yr, v = r.Wr, i = r.Gr;
        var o = Ln(t, v, p, a, Rr(i), e);
        var u = o === o;
        return [ t, {
          transform: u ? "translate" + n + "(" + (100 * o).toFixed(3) + "%)" : ""
        } ];
      }));
    };
    var L = [];
    var H = [];
    var R = [];
    var M = function scrollbarsAddRemoveClass(r, a, e) {
      var n = s(e);
      var t = n ? e : true;
      var v = n ? !e : true;
      t && z(H, r, a);
      v && z(R, r, a);
    };
    var I = function refreshScrollbarsHandleLength(r) {
      T(H, r, true);
      T(R, r);
    };
    var D = function refreshScrollbarsHandleOffset(r) {
      A(H, r, true);
      A(R, r);
    };
    var k = function generateScrollbarDOM(r) {
      var a = r ? Ra : Ma;
      var n = r ? H : R;
      var t = O(n) ? Ba : "";
      var i = $(La + " " + a + " " + t);
      var o = $(Ia);
      var u = $(Da);
      var l = {
        Gr: i,
        Wr: o,
        Yr: u
      };
      if (!v) {
        gr(i, Ta);
      }
      W(i, o);
      W(o, u);
      S(n, l);
      S(L, [ Z.bind(0, i), e(l, M, f, c, p, r) ]);
      return l;
    };
    var V = k.bind(0, true);
    var B = k.bind(0, false);
    var j = function appendElements() {
      W(E, H[0].Gr);
      W(E, R[0].Gr);
      cr((function() {
        M(Ba);
      }), 300);
    };
    V();
    B();
    return [ {
      Xr: I,
      Zr: D,
      $r: M,
      Jr: {
        Kr: H,
        Qr: V,
        ra: P.bind(0, H)
      },
      aa: {
        Kr: R,
        Qr: B,
        ra: P.bind(0, R)
      }
    }, j, x.bind(0, L) ];
  };
  var Rn = function createScrollbarsSetup(r, a, e, n) {
    var t;
    var v;
    var i;
    var o;
    var u;
    var f = 0;
    var l = De({});
    var c = l[0];
    var s = Er(), d = s[0], h = s[1];
    var p = Er(), g = p[0], w = p[1];
    var b = Er(100), m = b[0], y = b[1];
    var S = Er(100), C = S[0], O = S[1];
    var E = Er((function() {
      return f;
    })), z = E[0], P = E[1];
    var T = Hn(r, e.Nr, xn(a, e)), A = T[0], L = T[1], H = T[2];
    var R = e.Nr, M = R.$, k = R.J, V = R.er, B = R.nr, j = R.cr, U = R.ur;
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
        Y(qa);
      } else {
        var e = function hide() {
          return Y(qa, true);
        };
        if (f > 0 && !a) {
          z(e);
        } else {
          e();
        }
      }
    };
    var K = function onHostMouseEnter() {
      o = v;
      o && J(true);
    };
    var Q = [ y, P, O, w, h, H, Gr(M, "pointerover", K, {
      O: true
    }), Gr(M, "pointerenter", K), Gr(M, "pointerleave", (function() {
      o = false;
      v && J(false);
    })), Gr(M, "pointermove", (function() {
      t && d((function() {
        y();
        J(true);
        C((function() {
          t && J(false);
        }));
      }));
    })), Gr(B, "scroll", (function(r) {
      g((function() {
        G(e());
        i && J(true);
        m((function() {
          i && !o && J(false);
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
      var h = xe(), p = h.L;
      var g = Ie(a, r, n);
      var w = e();
      var b = w.Pr, m = w.Or, y = w.br;
      var S = g("showNativeOverlaidScrollbars"), C = S[0], O = S[1];
      var x = g("scrollbars.theme"), E = x[0], z = x[1];
      var P = g("scrollbars.visibility"), T = P[0], A = P[1];
      var L = g("scrollbars.autoHide"), H = L[0], R = L[1];
      var M = g("scrollbars.autoHideDelay"), I = M[0];
      var D = g("scrollbars.dragScroll"), k = D[0], V = D[1];
      var B = g("scrollbars.clickScroll"), j = B[0], q = B[1];
      var F = l || c || d;
      var N = s || A;
      var X = C && p.x && p.y;
      var Z = function setScrollbarVisibility(r, a) {
        var e = "visible" === T || "auto" === T && "scroll" === r;
        Y(ka, e, a);
        return e;
      };
      f = I;
      if (O) {
        Y(Aa, X);
      }
      if (z) {
        Y(u);
        Y(E, true);
        u = E;
      }
      if (R) {
        t = "move" === H;
        v = "leave" === H;
        i = "never" !== H;
        J(!i, true);
      }
      if (V) {
        Y(Ya, k);
      }
      if (q) {
        Y(Na, j);
      }
      if (N) {
        var $ = Z(m.x, true);
        var K = Z(m.y, false);
        var Q = $ && K;
        Y(Va, !Q);
      }
      if (F) {
        W(w);
        G(w);
        Y(Ua, !b.x, true);
        Y(Ua, !b.y, false);
        Y(Ha, y && !U);
      }
    }, rr, x.bind(0, Q) ];
  };
  var Mn = function invokePluginInstance(r, a, e) {
    if (d(r)) {
      r(a || void 0, e || void 0);
    }
  };
  var In = function OverlayScrollbars(r, a, e) {
    var n = xe(), t = n.Y, v = n.F, i = n.U, o = n.q;
    var u = Ga();
    var f = b(r);
    var l = f ? r : r.target;
    var c = Re(l);
    if (a && !c) {
      var s = false;
      var d = function validateOptions(r) {
        var a = Ga()[ve];
        var e = a && a.P;
        return e ? e(r, true) : r;
      };
      var h = P({}, t(), d(a));
      var p = Qr(e), g = p[0], w = p[1], m = p[2];
      var y = wn(r, h), S = y[0], C = y[1], O = y[2];
      var x = Rn(r, h, C, (function(r) {
        return m("scroll", [ k, r ]);
      })), E = x[0], A = x[1], L = x[2];
      var H = function update(r, a) {
        return S(r, !!a);
      };
      var R = H.bind(0, {}, true);
      var M = i(R);
      var I = o(R);
      var D = function destroy(r) {
        He(l);
        M();
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
            var n = ea(h, P(e, d(r)));
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
          var r = C(), a = r.zr, e = r.Pr, n = r.Or, t = r.Tr, v = r.K, i = r.yr, o = r.br;
          return P({}, {
            overflowEdge: a,
            overflowAmount: e,
            overflowStyle: n,
            hasOverflow: t,
            padding: v,
            paddingAbsolute: i,
            directionRTL: o,
            destroyed: s
          });
        },
        elements: function elements() {
          var r = C.Nr, a = r.Z, e = r.$, n = r.K, t = r.J, v = r.rr, i = r.er, o = r.nr;
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
            content: v || t,
            scrollOffsetElement: i,
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
      Le(l, k);
      each(z(u), (function(r) {
        return Mn(u[r], 0, k);
      }));
      if (Te(C.Nr.ur, v().cancel, !f && r.cancel)) {
        D(true);
        return k;
      }
      C.Fr();
      A.Fr();
      m("initialized", [ k ]);
      C.qr((function(r, a, e) {
        var n = r._r, t = r.mr, v = r.gr, i = r.Lr, o = r.Hr, u = r.Ar, f = r.wr, l = r.Er;
        m("updated", [ k, {
          updateHints: {
            sizeChanged: n,
            directionChanged: t,
            heightIntrinsicChanged: v,
            overflowEdgeChanged: i,
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
  In.plugin = function(r) {
    each(Xa(r), (function(r) {
      return Mn(r, In);
    }));
  };
  In.valid = function(r) {
    var a = r && r.elements;
    var e = d(a) && a();
    return w(e) && !!Re(e.target);
  };
  In.env = function() {
    var r = xe(), a = r.V, e = r.L, n = r.A, t = r.B, v = r.j, i = r.H, o = r.G, u = r.X, f = r.F, l = r.N, c = r.Y, s = r.W;
    return P({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: n,
      rtlScrollBehavior: t,
      flexboxGlue: v,
      cssCustomProperties: i,
      staticDefaultInitialization: o,
      staticDefaultOptions: u,
      getDefaultInitialization: f,
      setDefaultInitialization: l,
      getDefaultOptions: c,
      setDefaultOptions: s
    });
  };
  r.ClickScrollPlugin = we;
  r.OverlayScrollbars = In;
  r.ScrollbarsHidingPlugin = ge;
  r.SizeObserverPlugin = fe;
  Object.defineProperty(r, "ea", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
