/*!
 * OverlayScrollbars
 * Version: 2.1.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */

var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  function each(r, a) {
    if (p(r)) {
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
        t = e ? Hr(r, v, a) : a.reduce((function(a, e) {
          a[e] = Hr(r, v, e);
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
  var g = function isObject(r) {
    return "object" === typeof r && !h(r) && !u(r);
  };
  var p = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = l(a) && a > -1 && a % 1 == 0;
    return h(r) || !d(r) && e ? a > 0 && g(r) ? a - 1 in r : true : false;
  };
  var w = function isPlainObject(r) {
    if (!r || !g(r) || "object" !== f(r)) {
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
    !e && !c(a) && p(a) ? Array.prototype.push.apply(r, a) : r.push(a);
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
  var T = function assignDeep(r, a, e, n, t, v, i) {
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
  var P = function isEmptyObject(r) {
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
      var v = new Set(t.split(" "));
      v[n ? "add" : "delete"](e);
      L(r, a, C(v).join(" ").trim());
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
    var v = F(t, a) === n;
    return n && t ? n === r || t === r || v && F(F(r, e), a) !== n : false;
  };
  var Y = function before(r, a, e) {
    if (e && r) {
      var n = a;
      var t;
      if (p(e)) {
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
    if (p(r)) {
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
  var dr = function equal(r, a, e, n) {
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
  var hr = function equalWH(r, a) {
    return dr(r, a, [ "w", "h" ]);
  };
  var gr = function equalXY(r, a) {
    return dr(r, a, [ "x", "y" ]);
  };
  var pr = function equalTRBL(r, a) {
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
    var v = wr;
    var i = a || {}, o = i.g, u = i.p, f = i._;
    var c = function invokeFunctionToDebounce(a) {
      v();
      sr(e);
      e = n = void 0;
      v = wr;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return f && n ? f(n, r) : r;
    };
    var h = function flush() {
      if (v !== wr) {
        c(s(t) || t);
      }
    };
    var g = function debouncedFn() {
      var r = C(arguments);
      var a = d(o) ? o() : o;
      var i = l(a) && a >= 0;
      if (i) {
        var f = d(u) ? u() : u;
        var g = l(f) && f >= 0;
        var p = a > 0 ? cr : lr;
        var w = a > 0 ? sr : fr;
        var b = s(r);
        var m = b || r;
        var y = c.bind(0, m);
        v();
        var S = p(y, a);
        v = function clear() {
          return w(S);
        };
        if (g && !e) {
          e = cr(h, f);
        }
        n = t = m;
      } else {
        c(r);
      }
    };
    g.m = h;
    return g;
  };
  var yr = Math.max;
  var Sr = function animationCurrentTime() {
    return performance.now();
  };
  var Cr = function animateNumber(r, a, e, n, t) {
    var v = 0;
    var i = Sr();
    var o = Math.max(0, e);
    var u = function frame(e) {
      var u = Sr();
      var f = u - i;
      var l = f >= o;
      var c = e ? 1 : 1 - (yr(0, i + o - u) / o || 0);
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
  var Or = /[^\x20\t\r\n\f]+/g;
  var xr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var v = 0;
    var i = false;
    if (n && a && c(a)) {
      var o = a.match(Or) || [];
      i = o.length > 0;
      while (t = o[v++]) {
        i = !!e(n, t) && i;
      }
    }
    return i;
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
  var Tr = function addClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return zr.bind(0, r, a);
  };
  var Pr = {
    opacity: 1,
    zindex: 1
  };
  var Ar = function parseToZeroOrNumber(r, a) {
    var e = a ? parseFloat(r) : parseInt(r, 10);
    return e === e ? e : 0;
  };
  var Lr = function adaptCSSVal(r, a) {
    return !Pr[r.toLowerCase()] && l(a) ? a + "px" : a;
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
    var v = n + "top" + t;
    var i = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var f = style(r, [ v, i, o, u ]);
    return {
      t: Ar(f[v], true),
      r: Ar(f[i], true),
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
    var v = Yr();
    var i = null != (t = v && n && n.S) ? t : v;
    var o = n && n.C || false;
    var u = n && n.O || false;
    var f = [];
    var l = v ? {
      passive: i,
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
      var v = a[n];
      if (g(t) && g(v)) {
        T(e[n] = {}, getOptionsDiff(t, v));
        if (P(e[n])) {
          delete e[n];
        }
      } else if (E(a, n) && v !== t) {
        var i = true;
        if (h(t) || h(v)) {
          try {
            if (aa(t) === aa(v)) {
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
  var ta = "os-environment";
  var va = ta + "-flexbox-glue";
  var ia = va + "-max";
  var oa = "data-overlayscrollbars";
  var ua = "data-overlayscrollbars-initialize";
  var fa = oa + "-overflow-x";
  var la = oa + "-overflow-y";
  var ca = "overflowVisible";
  var sa = "scrollbarHidden";
  var da = "updating";
  var ha = "os-padding";
  var ga = "os-viewport";
  var pa = ga + "-arrange";
  var _a = "os-content";
  var wa = ga + "-scrollbar-hidden";
  var ba = "os-overflow-visible";
  var ma = "os-size-observer";
  var ya = ma + "-appear";
  var Sa = ma + "-listener";
  var Ca = Sa + "-scroll";
  var Oa = Sa + "-item";
  var xa = Oa + "-final";
  var Ea = "os-trinsic-observer";
  var za = "os-no-css-vars";
  var Ta = "os-theme-none";
  var Pa = "os-scrollbar";
  var Aa = Pa + "-rtl";
  var La = Pa + "-horizontal";
  var Ha = Pa + "-vertical";
  var Ma = Pa + "-track";
  var Ra = Pa + "-handle";
  var Ia = Pa + "-visible";
  var Da = Pa + "-cornerless";
  var ka = Pa + "-transitionless";
  var Va = Pa + "-interaction";
  var Ba = Pa + "-unusable";
  var ja = Pa + "-auto-hidden";
  var Ua = Pa + "-wheel";
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
        var g = validateRecursive(l, u, e, d + i), p = g[0], b = g[1];
        t[i] = p;
        v[i] = b;
        each([ v, t ], (function(r) {
          if (P(r[i])) {
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
          t[i] = u;
        } else if (e) {
          console.warn('The option "' + d + i + "\" wasn't set, because it doesn't accept the type [ " + O.toUpperCase() + ' ] with the value of "' + u + '".\r\n' + "Accepted types are: [ " + C.join(", ").toUpperCase() + " ].\r\n" + (y.length > 0 ? "\r\nValid strings are: [ " + y.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ t, v ];
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
      T: function _(r, a) {
        var e = Za(ee, r, a), n = e[0], t = e[1];
        return _extends({}, t, n);
      }
    }, r;
  })();
  var te = 3333333;
  var ve = "scroll";
  var ie = "__osSizeObserverPlugin";
  var oe = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[ie] = {
      T: function _(r, a, e) {
        var n = J('<div class="' + Oa + '" dir="ltr"><div class="' + Oa + '"><div class="' + xa + '"></div></div><div class="' + Oa + '"><div class="' + xa + '" style="width: 200%; height: 200%"></div></div></div>');
        W(r, n);
        Tr(r, Ca);
        var t = n[0];
        var v = t.lastChild;
        var i = t.firstChild;
        var o = null == i ? void 0 : i.firstChild;
        var u = Br(t);
        var f = u;
        var l = false;
        var c;
        var s = function reset() {
          I(i, te);
          D(i, te);
          I(v, te);
          D(v, te);
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
        var g = S([], [ Xr(i, ve, h), Xr(v, ve, h) ]);
        style(o, {
          width: te,
          height: te
        });
        lr(s);
        return [ e ? h.bind(0, false) : s, g ];
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
      P: function _createUniqueViewportArrangeElement(r) {
        var a = r.A, e = r.L, n = r.H;
        var t = !n && !a && (e.x || e.y);
        var v = t ? document.createElement("style") : false;
        if (v) {
          L(v, "id", pa + "-" + ue);
          ue++;
        }
        return v;
      },
      M: function _overflowUpdateSegment(r, a, e, n, t, v, i) {
        var o = function arrangeViewport(a, v, i, o) {
          if (r) {
            var u = t(), f = u.R;
            var l = a.I, c = a.D;
            var s = c.x, d = c.y;
            var h = l.x, g = l.y;
            var p = o ? "paddingRight" : "paddingLeft";
            var w = f[p];
            var b = f.paddingTop;
            var m = v.w + i.w;
            var y = v.h + i.h;
            var S = {
              w: g && d ? g + m - w + "px" : "",
              h: h && s ? h + y - b + "px" : ""
            };
            if (n) {
              var C = n.sheet;
              if (C) {
                var O = C.cssRules;
                if (O) {
                  if (!O.length) {
                    C.insertRule("#" + L(n, "id") + " + ." + pa + "::before {}", 0);
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
            var l = t(), c = l.R;
            var s = f.D;
            var d = s.x, h = s.y;
            var g = {};
            var p = function assignProps(r) {
              return each(r.split(" "), (function(r) {
                g[r] = c[r];
              }));
            };
            if (d) {
              p("marginBottom paddingTop paddingBottom");
            }
            if (h) {
              p("marginLeft marginRight paddingLeft paddingRight");
            }
            var w = style(e, z(g));
            zr(e, pa);
            if (!a) {
              g.height = "";
            }
            style(e, g);
            return [ function() {
              i(f, o, r, w);
              style(e, w);
              Tr(e, pa);
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
          var v = Vr();
          var i = {
            w: v.w - r.w,
            h: v.h - r.h
          };
          if (0 === i.w && 0 === i.h) {
            return;
          }
          var o = {
            w: le(i.w),
            h: le(i.h)
          };
          var u = {
            w: le(fe(v.w / (r.w / 100))),
            h: le(fe(v.h / (r.h / 100)))
          };
          var f = ce();
          var l = o.w > 2 && o.h > 2;
          var c = !se(u.w, u.h);
          var s = f !== a && f > 0;
          var d = l && c && s;
          if (d) {
            var h = n(), g = h[0], p = h[1];
            T(e.V, g);
            if (p) {
              t();
            }
          }
          r = v;
          a = f;
        };
      }
    }, r;
  }();
  var ge = "__osClickScrollPlugin";
  var pe = /* @__PURE__ */ function() {
    var r;
    return r = {}, r[ge] = {
      T: function _(r, a, e, n, t) {
        var v = 0;
        var i = wr;
        var o = function animateClickScroll(o) {
          i = Cr(o, o + n * Math.sign(e), 133, (function(e, o, u) {
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
  var _e;
  var we = function getNativeScrollbarSize(r, a, e, n) {
    W(r, a);
    var t = jr(a);
    var v = Br(a);
    var i = qr(e);
    n && Z(a);
    return {
      x: v.h - t.h + i.h,
      y: v.w - t.w + i.w
    };
  };
  var be = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Tr(r, wa);
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
    var v = Kr(a);
    return {
      i: n.x === t.x,
      n: t.x !== v.x
    };
  };
  var ye = function getFlexboxGlue(r, a) {
    var e = Tr(r, va);
    var n = Fr(r);
    var t = Fr(a);
    var v = _r(t, n, true);
    var i = Tr(r, ia);
    var o = Fr(r);
    var u = Fr(a);
    var f = _r(u, o, true);
    e();
    i();
    return v && f;
  };
  var Se = function createEnvironment() {
    var r = document, e = r.body;
    var n = J('<div class="' + ta + '"><div></div></div>');
    var t = n[0];
    var v = t.firstChild;
    var i = ra(), o = i[0], u = i[2];
    var f = a({
      v: we(e, t, v),
      o: gr
    }, we.bind(0, e, t, v, true)), l = f[0], c = f[1];
    var s = c(), d = s[0];
    var h = be(t);
    var g = {
      x: 0 === d.x,
      y: 0 === d.y
    };
    var p = {
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
    var w = T({}, ea);
    var b = T.bind(0, {}, w);
    var m = T.bind(0, {}, p);
    var y = {
      V: d,
      L: g,
      A: h,
      H: "-1" === style(t, "zIndex"),
      B: me(t, v),
      j: ye(t, v),
      U: o.bind(0, "z"),
      q: o.bind(0, "r"),
      F: m,
      N: function _setDefaultInitialization(r) {
        return T(p, r) && m();
      },
      Y: b,
      W: function _setDefaultOptions(r) {
        return T(w, r) && b();
      },
      G: T({}, p),
      X: T({}, w)
    };
    var S = window.addEventListener;
    var C = mr((function(r) {
      return u(r ? "z" : "r");
    }), {
      g: 33,
      p: 99
    });
    R(t, "style");
    Z(t);
    S("resize", C.bind(0, false));
    if (!h && (!g.x || !g.y)) {
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
    var v = Oe(r, t);
    return v || a.apply(0, r);
  };
  var Ee = function dynamicInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var v = Oe(r, t);
    return !!v && (b(v) ? v : a.apply(0, r));
  };
  var ze = function cancelInitialization(r, a, e) {
    var n = e || {}, t = n.nativeScrollbarsOverlaid, v = n.body;
    var i = Ce(), f = i.L, l = i.A;
    var c = a.nativeScrollbarsOverlaid, s = a.body;
    var d = null != t ? t : c;
    var h = o(v) ? s : v;
    var g = (f.x || f.y) && d;
    var p = r && (u(h) ? !l : h);
    return !!g || !!p;
  };
  var Te = new WeakMap;
  var Pe = function addInstance(r, a) {
    Te.set(r, a);
  };
  var Ae = function removeInstance(r) {
    Te.delete(r);
  };
  var Le = function getInstance(r) {
    return Te.get(r);
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
      a = T({}, a, r);
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
    var v = t && t.P;
    var i = e(), o = i.elements;
    var u = o.host, f = o.padding, l = o.viewport, c = o.content;
    var s = b(r);
    var d = s ? {} : r;
    var h = d.elements;
    var g = h || {}, p = g.host, w = g.padding, m = g.viewport, C = g.content;
    var O = s ? r : d.target;
    var E = j(O, "textarea");
    var T = O.ownerDocument;
    var P = T.documentElement;
    var A = O === T.body;
    var I = T.defaultView;
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
    var nr = $ ? P : er;
    var tr = E ? D(De, u, p) : O;
    var vr = $ ? nr : tr;
    var ir = K ? ar : J;
    var or = T.activeElement;
    var ur = !Y && I.top === I && or === O;
    var fr = {
      Z: O,
      $: vr,
      J: nr,
      K: !Y && k(De, f, w),
      rr: ir,
      ar: !Y && !n && v && v(a),
      er: $ ? P : nr,
      nr: $ ? T : nr,
      tr: I,
      vr: T,
      ir: E,
      ur: A,
      lr: s,
      cr: Y,
      sr: K,
      dr: function _viewportHasClass(r, a) {
        return Y ? M(nr, oa, a) : Er(nr, r);
      },
      hr: function _viewportAddRemoveClass(r, a, e) {
        return Y ? H(nr, oa, a, e) : (e ? Tr : zr)(nr, r);
      }
    };
    var lr = z(fr).reduce((function(r, a) {
      var e = fr[a];
      return S(r, e && !q(e) ? e : false);
    }), []);
    var cr = function elementIsGenerated(r) {
      return r ? y(lr, r) > -1 : null;
    };
    var sr = fr.Z, dr = fr.$, hr = fr.K, gr = fr.J, pr = fr.rr, _r = fr.ar;
    var br = [ function() {
      R(dr, oa);
      R(dr, ua);
      R(sr, ua);
      if (A) {
        R(P, oa);
        R(P, ua);
      }
    } ];
    var mr = E && cr(dr);
    var yr = E ? sr : U([ pr, gr, hr, dr, sr ].find((function(r) {
      return false === cr(r);
    })));
    var Sr = $ ? sr : pr || gr;
    var Cr = function appendElements() {
      L(dr, oa, Y ? "viewport" : "host");
      var r = Tr(hr, ha);
      var a = Tr(gr, !Y && ga);
      var e = Tr(pr, _a);
      var t = A && !Y ? Tr(q(O), wa) : wr;
      if (mr) {
        X(sr, dr);
        S(br, (function() {
          X(dr, sr);
          Z(dr);
        }));
      }
      W(Sr, yr);
      W(dr, hr);
      W(hr || dr, !Y && gr);
      W(gr, pr);
      S(br, (function() {
        t();
        R(gr, fa);
        R(gr, la);
        if (cr(pr)) {
          ke(pr);
        }
        if (cr(gr)) {
          ke(gr);
        }
        if (cr(hr)) {
          ke(hr);
        }
        r();
        a();
        e();
      }));
      if (n && !Y) {
        S(br, zr.bind(0, gr, wa));
      }
      if (_r) {
        G(gr, _r);
        S(br, Z.bind(0, _r));
      }
      if (ur) {
        var v = L(gr, Ie);
        L(gr, Ie, "-1");
        gr.focus();
        var i = function revertViewportTabIndex() {
          return v ? L(gr, Ie, v) : R(gr, Ie);
        };
        var o = Xr(T, "pointerdown keydown", (function() {
          i();
          o();
        }));
        S(br, [ i, o ]);
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
      var v = n(), i = v.gr;
      var o = r.pr;
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
  var je = function createPaddingUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var v = r.$, i = r.K, o = r.J, u = r.cr;
    var f = a({
      o: pr,
      v: Ir()
    }, Ir.bind(0, v, "padding", "")), l = f[0], c = f[1];
    return function(r, a, e) {
      var v = c(e), f = v[0], s = v[1];
      var d = Ce(), h = d.A, g = d.j;
      var p = n(), w = p.br;
      var b = r._r, m = r.wr, y = r.mr;
      var S = a("paddingAbsolute"), C = S[0], O = S[1];
      var x = !g && m;
      if (b || s || x) {
        var E = l(e);
        f = E[0];
        s = E[1];
      }
      var z = !u && (O || y || s);
      if (z) {
        var P = !C || !i && !h;
        var A = f.r + f.l;
        var L = f.t + f.b;
        var H = {
          marginRight: P && !w ? -A : 0,
          marginBottom: P ? -L : 0,
          marginLeft: P && w ? -A : 0,
          top: P ? -f.t : 0,
          right: P ? w ? -f.r : "auto" : 0,
          left: P ? w ? "auto" : -f.l : 0,
          width: P ? "calc(100% + " + A + "px)" : ""
        };
        var M = {
          paddingTop: P ? f.t : 0,
          paddingRight: P ? f.r : 0,
          paddingBottom: P ? f.b : 0,
          paddingLeft: P ? f.l : 0
        };
        style(i || o, H);
        style(o, M);
        t({
          K: f,
          yr: !P,
          R: i ? M : T({}, H, M)
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
    o: gr,
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
    return e ? Tr(r, a) : zr(r, a);
  };
  var $e = function overflowIsVisible(r) {
    return 0 === r.indexOf(Fe);
  };
  var Je = function createOverflowUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var v = r.$, i = r.K, o = r.J, u = r.ar, f = r.cr, l = r.hr, c = r.ur, s = r.tr;
    var d = Ce(), h = d.V, g = d.j, p = d.A, w = d.L;
    var b = Ya()[de];
    var m = !f && !p && (w.x || w.y);
    var y = c && f;
    var S = a(We, qr.bind(0, o)), C = S[0], O = S[1];
    var x = a(We, Ur.bind(0, o)), E = x[0], z = x[1];
    var T = a(We), P = T[0], A = T[1];
    var M = a(We), R = M[0], I = M[1];
    var D = a(Ge), k = D[0];
    var V = function fixFlexboxGlue(r, a) {
      style(o, {
        height: ""
      });
      if (a) {
        var e = n(), t = e.yr, i = e.K;
        var u = r.Cr, f = r.I;
        var l = qr(v);
        var c = jr(v);
        var s = "content-box" === style(o, "boxSizing");
        var d = t || s ? i.b + i.t : 0;
        var h = !(w.x && s);
        style(o, {
          height: c.h + l.h + (u.x && h ? f.x : 0) - d
        });
      }
    };
    var B = function getViewportOverflowState(r, a) {
      var e = !p && !r ? Ye : 0;
      var n = function getStatePerAxis(r, n, t) {
        var v = style(o, r);
        var i = a ? a[r] : v;
        var u = "scroll" === i;
        var f = n ? e : t;
        var l = u && !p ? f : 0;
        var c = n && !!e;
        return [ v, u, l, c ];
      };
      var t = n("overflowX", w.x, h.x), v = t[0], i = t[1], u = t[2], f = t[3];
      var l = n("overflowY", w.y, h.y), c = l[0], s = l[1], d = l[2], g = l[3];
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
          y: g
        }
      };
    };
    var j = function setViewportOverflowState(r, a, e, n) {
      var t = function setAxisOverflowStyle(r, a) {
        var e = $e(r);
        var n = a && e && r.replace(Fe + "-", "") || "";
        return [ a && !e ? r : "", $e(n) ? "hidden" : n ];
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
      var c = n(), s = c.R;
      var d = a ? "marginLeft" : "marginRight";
      var h = a ? "paddingLeft" : "paddingRight";
      var g = s[d];
      var p = s.marginBottom;
      var w = s[h];
      var b = s.paddingBottom;
      t.width = "calc(100% + " + (l + -1 * g) + "px)";
      t[d] = -l + g;
      t.marginBottom = -f + p;
      if (e) {
        t[h] = w + (u ? l : 0);
        t.paddingBottom = b + (o ? f : 0);
      }
    };
    var q = b ? b.M(m, g, o, u, n, B, U) : [ function() {
      return m;
    }, function() {
      return [ wr ];
    } ], F = q[0], N = q[1];
    return function(r, a, e) {
      var u = r._r, c = r.Er, d = r.wr, h = r.Sr, b = r.pr, m = r.mr;
      var S = n(), x = S.gr, T = S.br;
      var M = a("showNativeOverlaidScrollbars"), D = M[0], q = M[1];
      var Y = a("overflow"), W = Y[0], G = Y[1];
      var X = D && w.x && w.y;
      var Z = !f && !g && (u || d || c || q || b);
      var $ = $e(W.x);
      var J = $e(W.y);
      var K = $ || J;
      var Q = O(e);
      var rr = z(e);
      var ar = A(e);
      var er = I(e);
      var nr;
      if (q && p) {
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
        var tr = N(X, T, nr), vr = tr[0], ir = tr[1];
        var or = Q = C(e), ur = or[0], fr = or[1];
        var lr = rr = E(e), cr = lr[0], sr = lr[1];
        var dr = jr(o);
        var hr = cr;
        var gr = dr;
        vr();
        if ((sr || fr || q) && ir && !X && F(ir, cr, ur, T)) {
          gr = jr(o);
          hr = Ur(o);
        }
        var pr = {
          w: qe(Ue(cr.w, hr.w) + ur.w),
          h: qe(Ue(cr.h, hr.h) + ur.h)
        };
        var _r = {
          w: qe((y ? s.innerWidth : gr.w + qe(dr.w - cr.w)) + ur.w),
          h: qe((y ? s.innerHeight + ur.h : gr.h + qe(dr.h - cr.h)) + ur.h)
        };
        er = R(_r);
        ar = P(Xe(pr, _r), e);
      }
      var wr = er, br = wr[0], mr = wr[1];
      var yr = ar, Sr = yr[0], Cr = yr[1];
      var Or = rr, xr = Or[0], Er = Or[1];
      var zr = Q, Tr = zr[0], Pr = zr[1];
      var Ar = {
        x: Sr.w > 0,
        y: Sr.h > 0
      };
      var Lr = $ && J && (Ar.x || Ar.y) || $ && Ar.x && !Ar.y || J && Ar.y && !Ar.x;
      if (h || m || Pr || Er || mr || Cr || G || q || Z) {
        var Hr = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        var Mr = j(X, Ar, W, Hr);
        var Rr = F(Mr, xr, Tr, T);
        if (!f) {
          U(Mr, T, Rr, Hr);
        }
        if (Z) {
          V(Mr, x);
        }
        if (f) {
          L(v, fa, Hr.overflowX);
          L(v, la, Hr.overflowY);
        } else {
          style(o, Hr);
        }
      }
      H(v, oa, ca, Lr);
      Ze(i, ba, Lr);
      !f && Ze(o, ba, K);
      var Ir = k(B(X).Or), Dr = Ir[0], kr = Ir[1];
      t({
        Or: Dr,
        zr: {
          x: br.w,
          y: br.h
        },
        Tr: {
          x: Sr.w,
          y: Sr.h
        },
        Pr: Ar
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
    var v = z(r).concat(z(t));
    each(v, (function(a) {
      var v = r[a];
      var i = t[a];
      n[a] = !!(e || v || i);
    }));
    return n;
  };
  var Qe = function createStructureSetupUpdate(r, a) {
    var e = r.Z, n = r.J, t = r.hr, v = r.cr;
    var i = Ce(), o = i.A, u = i.L, f = i.j;
    var l = !o && (u.x || u.y);
    var c = [ Be(r, a), je(r, a), Je(r, a) ];
    return function(r, a, i) {
      var o = Ke(T({
        _r: false,
        Sr: false,
        mr: false,
        pr: false,
        Lr: false,
        Hr: false,
        Ar: false,
        Er: false,
        wr: false
      }, a), {}, i);
      var u = l || !f;
      var s = u && I(n);
      var d = u && D(n);
      t("", da, true);
      var h = o;
      each(c, (function(a) {
        h = Ke(h, a(h, r, !!i) || {}, i);
      }));
      I(n, s);
      D(n, d);
      t("", da);
      if (!v) {
        I(e, 0);
        D(e, 0);
      }
      return h;
    };
  };
  var rn = function createEventContentChange(r, a, e) {
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
              var f = Xr(v, i, (function(r) {
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
  var an = function createDOMObserver(r, a, e, n) {
    var t = false;
    var v = n || {}, i = v.Mr, o = v.Rr, u = v.Ir, f = v.Dr, l = v.kr, s = v.Vr;
    var d = mr((function() {
      if (t) {
        e(true);
      }
    }), {
      g: 33,
      p: 99
    });
    var h = rn(r, d, u), g = h[0], p = h[1];
    var w = i || [];
    var b = o || [];
    var m = w.concat(b);
    var x = function observerCallback(t, v) {
      var i = l || wr;
      var o = s || wr;
      var u = new Set;
      var d = new Set;
      var h = false;
      var g = false;
      each(t, (function(e) {
        var t = e.attributeName, v = e.target, l = e.type, s = e.oldValue, p = e.addedNodes, w = e.removedNodes;
        var m = "attributes" === l;
        var S = "childList" === l;
        var C = r === v;
        var O = m && c(t) ? L(v, t) : 0;
        var x = 0 !== O && s !== O;
        var E = y(b, t) > -1 && x;
        if (a && (S || !C)) {
          var z = !m;
          var T = m && x;
          var P = T && f && j(v, f);
          var A = P ? !i(v, t, s, O) : z || T;
          var H = A && !o(e, !!P, r, n);
          each(p, (function(r) {
            return u.add(r);
          }));
          each(w, (function(r) {
            return u.add(r);
          }));
          g = g || H;
        }
        if (!a && C && x && !i(v, t, s, O)) {
          d.add(t);
          h = h || E;
        }
      }));
      if (u.size > 0) {
        p((function(r) {
          return C(u).reduce((function(a, e) {
            S(a, V(r, e));
            return j(e, r) ? S(a, e) : a;
          }), []);
        }));
      }
      if (a) {
        !v && g && e(false);
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
        g();
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
    var t = n || {}, v = t.Br, i = void 0 === v ? false : v, o = t.jr, u = void 0 === o ? false : o;
    var f = Ya()[ie];
    var l = Ce(), c = l.B;
    var d = J('<div class="' + ma + '"><div class="' + Sa + '"></div></div>');
    var p = d[0];
    var w = p.firstChild;
    var b = Rr.bind(0, r);
    var m = a({
      v: void 0,
      u: true,
      o: function _equal(r, a) {
        return !(!r || !nn(r) && nn(a));
      }
    }), y = m[0];
    var C = function onSizeChangedCallbackProxy(r) {
      var a = h(r) && r.length > 0 && g(r[0]);
      var n = !a && s(r[0]);
      var t = false;
      var v = false;
      var o = true;
      if (a) {
        var u = y(r.pop().contentRect), f = u[0], l = u[2];
        var d = nn(f);
        var w = nn(l);
        t = !l || !d;
        v = !w && d;
        o = !t;
      } else if (n) {
        o = r[1];
      } else {
        v = true === r;
      }
      if (i && o) {
        var b = n ? r[0] : Rr(p);
        I(p, b ? c.n ? -en : c.i ? 0 : en : en);
        D(p, en);
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
      Z(p);
    }, function() {
      if (ur) {
        var e = new ur(C);
        e.observe(w);
        S(O, (function() {
          e.disconnect();
        }));
      } else if (f) {
        var n = f.T(w, C, u), t = n[0], v = n[1];
        E = t;
        S(O, v);
      }
      if (i) {
        var o = a({
          v: void 0
        }, b), l = o[0];
        S(O, Xr(p, "scroll", (function(r) {
          var a = l();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            zr(w, "ltr rtl");
            if (e) {
              Tr(w, "rtl");
            } else {
              Tr(w, "ltr");
            }
            C([ !!e, n, t ]);
          }
          Zr(r);
        })));
      }
      if (E) {
        Tr(p, ya);
        S(O, Xr(p, "animationstart", E, {
          O: !!ur
        }));
      }
      if (ur || f) {
        W(r, p);
      }
    } ];
  };
  var vn = function isHeightIntrinsic(r) {
    return 0 === r.h || r.isIntersecting || r.intersectionRatio > 0;
  };
  var un = function createTrinsicObserver(r, e) {
    var n;
    var t = $(Ea);
    var v = [];
    var i = a({
      v: false
    }), o = i[0];
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
          var r = Br(t);
          u(r);
        };
        var e = tn(t, a), i = e[0], o = e[1];
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
  var fn = "[" + oa + "]";
  var ln = "." + ga;
  var cn = [ "tabindex" ];
  var sn = [ "wrap", "cols", "rows" ];
  var dn = [ "id", "class", "style", "open" ];
  var hn = function createStructureSetupObservers(r, e, n) {
    var t;
    var v;
    var i;
    var o = r.$, u = r.J, f = r.rr, s = r.ir, g = r.cr, p = r.dr, w = r.hr;
    var b = Ce(), m = b.j;
    var C = a({
      o: hr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = p(ba, ca);
      var a = p(pa, "");
      var e = a && I(u);
      var n = a && D(u);
      w(ba, ca);
      w(pa, "");
      w("", da, true);
      var t = Ur(f);
      var v = Ur(u);
      var i = qr(u);
      w(ba, ca, r);
      w(pa, "", a);
      w("", da);
      I(u, e);
      D(u, n);
      return {
        w: v.w + t.w + i.w,
        h: v.h + t.h + i.h
      };
    })), O = C[0];
    var x = s ? sn : dn.concat(sn);
    var E = mr(n, {
      g: function _timeout() {
        return t;
      },
      p: function _maxDelay() {
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
    var P = function updateViewportAttrsFromHost(r) {
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
      var t = r[0], v = r[1];
      var i = {
        pr: v
      };
      e({
        gr: t
      });
      !a && n(i);
      return i;
    };
    var H = function onSizeChanged(r) {
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
      } else if (!g) {
        P(r);
      }
      return n;
    };
    var V = f || !m ? un(o, A) : [ wr, wr, wr ], B = V[0], j = V[1], U = V[2];
    var q = !g ? tn(o, H, {
      jr: true,
      Br: true
    }) : [ wr, wr ], Y = q[0], W = q[1];
    var G = an(o, false, k, {
      Rr: dn,
      Mr: dn.concat(cn)
    }), X = G[0], Z = G[1];
    var $ = g && ur && new ur(H.bind(0, {
      _r: true
    }));
    $ && $.observe(o);
    P();
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
        T(r, k.apply(0, S(a, true)));
      }
      if (e) {
        T(r, A.apply(0, S(e, true)));
      }
      if (n) {
        T(r, M.apply(0, S(n, true)));
      }
      return r;
    }, function(r) {
      var a = r("update.ignoreMutation"), e = a[0];
      var n = r("update.attributes"), o = n[0], c = n[1];
      var s = r("update.elementEvents"), p = s[0], w = s[1];
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
        i = an(f || u, true, M, {
          Mr: x.concat(o || []),
          Ir: p,
          Dr: fn,
          Vr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !g ? N(e, fn, ln) : false;
            return t || !!F(e, "." + Pa) || !!C(r);
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
  var pn = function createInitialStructureSetupUpdateState(r) {
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
      zr: gn,
      Tr: gn,
      Or: {
        x: "hidden",
        y: "hidden"
      },
      Pr: {
        x: false,
        y: false
      },
      gr: false,
      br: Rr(r.$)
    };
  };
  var _n = function createStructureSetup(r, a) {
    var e = Me(a, {});
    var n = ra(), t = n[0], v = n[1], i = n[2];
    var o = Ve(r), u = o[0], f = o[1], l = o[2];
    var c = Re(pn(u));
    var s = c[0], d = c[1];
    var h = Qe(u, c);
    var g = function triggerUpdateEvent(r, a, e) {
      var n = z(r).some((function(a) {
        return r[a];
      }));
      var t = n || !P(a) || e;
      if (t) {
        i("u", [ r, a, e ]);
      }
      return t;
    };
    var p = hn(u, d, (function(r) {
      return g(h(e, r), {}, false);
    })), w = p[0], b = p[1], m = p[2], y = p[3];
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
      return g(h(n, m(), e), r, !!e);
    }, S, function() {
      v();
      w();
      l();
    } ];
  };
  var wn = Math.round;
  var bn = function getScale(r) {
    var a = Fr(r), e = a.width, n = a.height;
    var t = Br(r), v = t.w, i = t.h;
    return {
      x: wn(e) / v || 1,
      y: wn(n) / i || 1
    };
  };
  var mn = function continuePointerDown(r, a, e) {
    var n = a.scrollbars;
    var t = r.button, v = r.isPrimary, i = r.pointerType;
    var o = n.pointers;
    return 0 === t && v && n[e ? "dragScroll" : "clickScroll"] && (o || []).includes(i);
  };
  var yn = function createRootClickStopPropagationEvents(r, a) {
    return Xr(r, "mousedown", Xr.bind(0, a, "click", Zr, {
      O: true,
      C: true
    }), {
      C: true
    });
  };
  var Sn = function createInteractiveScrollEvents(r, a, e, n, t, v) {
    var i = Ce(), o = i.B;
    var u = e.Yr, f = e.Wr, l = e.Gr;
    var c = "scroll" + (v ? "Left" : "Top");
    var s = "client" + (v ? "X" : "Y");
    var d = v ? "width" : "height";
    var h = v ? "left" : "top";
    var g = v ? "w" : "h";
    var p = v ? "x" : "y";
    var w = function createRelativeHandleMove(r, a) {
      return function(e) {
        var i = t(), s = i.Tr;
        var d = Br(f)[g] - Br(u)[g];
        var h = a * e / d;
        var w = h * s[p];
        var b = Rr(l);
        var m = b && v ? o.n || o.i ? 1 : -1 : 1;
        n[c] = r + w * m;
      };
    };
    return Xr(f, "pointerdown", (function(e) {
      var t = F(e.target, "." + Ra) === u;
      var v = t ? u : f;
      if (mn(e, r, t)) {
        var i = !t && e.shiftKey;
        var o = function getHandleRect() {
          return Fr(u);
        };
        var l = function getTrackRect() {
          return Fr(f);
        };
        var g = function getHandleOffset(r, a) {
          return (r || o())[h] - (a || l())[h];
        };
        var b = w(n[c] || 0, 1 / bn(n)[p]);
        var m = e[s];
        var y = o();
        var C = l();
        var O = y[d];
        var E = g(y, C) + O / 2;
        var z = m - C[h];
        var T = t ? 0 : z - E;
        var P = [ Xr(a, "selectstart", (function(r) {
          return $r(r);
        }), {
          S: false
        }), Xr(f, "pointermove", (function(r) {
          var a = r[s] - m;
          if (t || i) {
            b(T + a);
          }
        })) ];
        if (i) {
          b(T);
        } else if (!t) {
          var A = Ya()[ge];
          if (A) {
            S(P, A.T(b, g, T, O, z));
          }
        }
        Xr(f, "pointerup", (function(r) {
          x(P);
          v.releasePointerCapture(r.pointerId);
        }), {
          O: true
        });
        v.setPointerCapture(e.pointerId);
      }
    }));
  };
  var Cn = function createScrollbarsSetupEvents(r, a) {
    return function(e, n, t, v, i, o) {
      var u = e.Gr;
      var f = br(333), l = f[0], c = f[1];
      var s = !!i.scrollBy;
      var d = true;
      return x.bind(0, [ Xr(u, "pointerenter", (function() {
        n(Va, true);
      })), Xr(u, "pointerleave pointercancel", (function() {
        n(Va);
      })), Xr(u, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (s && d && 0 === t && q(u) === v) {
          i.scrollBy({
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
      }), yn(u, t), Sn(r, t, e, i, a, o), c ]);
    };
  };
  var On = Math.min, xn = Math.max, En = Math.abs, zn = Math.round;
  var Tn = function getScrollbarHandleLengthRatio(r, a, e, n) {
    if (n) {
      var t = e ? "x" : "y";
      var v = n.Tr, i = n.zr;
      var o = i[t];
      var u = v[t];
      return xn(0, On(1, o / (o + u)));
    }
    var f = e ? "w" : "h";
    var l = Br(r)[f];
    var c = Br(a)[f];
    return xn(0, On(1, l / c));
  };
  var Pn = function getScrollbarHandleOffsetRatio(r, a, e, n, t, v) {
    var i = Ce(), o = i.B;
    var u = v ? "x" : "y";
    var f = v ? "Left" : "Top";
    var l = n.Tr;
    var c = zn(l[u]);
    var s = En(e["scroll" + f]);
    var d = v && t;
    var h = o.i ? s : c - s;
    var g = d ? h : s;
    var p = On(1, g / c);
    var w = Tn(r, a, v);
    return 1 / w * (1 - w) * p;
  };
  var An = function createScrollbarsSetupElements(r, a, e) {
    var n = Ce(), t = n.F, v = n.H;
    var i = t(), o = i.scrollbars;
    var u = o.slot;
    var f = a.vr, l = a.Z, c = a.$, d = a.J, h = a.lr, g = a.er, p = a.ur, w = a.cr;
    var b = h ? {} : r, m = b.scrollbars;
    var y = m || {}, C = y.slot;
    var E = Ee([ l, c, d ], (function() {
      return w && p ? l : c;
    }), u, C);
    var z = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? Tr : zr;
      each(r, (function(r) {
        n(r.Gr, a);
      }));
    };
    var T = function scrollbarsHandleStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        style(n, t);
      }));
    };
    var P = function scrollbarStructureRefreshHandleLength(r, a, e) {
      T(r, (function(r) {
        var n;
        var t = r.Yr, v = r.Wr;
        return [ t, (n = {}, n[e ? "width" : "height"] = (100 * Tn(t, v, e, a)).toFixed(3) + "%", 
        n) ];
      }));
    };
    var A = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      var n = e ? "X" : "Y";
      T(r, (function(r) {
        var t = r.Yr, v = r.Wr, i = r.Gr;
        var o = Pn(t, v, g, a, Rr(i), e);
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
      var v = n ? !e : true;
      t && z(H, r, a);
      v && z(M, r, a);
    };
    var I = function refreshScrollbarsHandleLength(r) {
      P(H, r, true);
      P(M, r);
    };
    var D = function refreshScrollbarsHandleOffset(r) {
      A(H, r, true);
      A(M, r);
    };
    var k = function generateScrollbarDOM(r) {
      var a = r ? La : Ha;
      var n = r ? H : M;
      var t = O(n) ? ka : "";
      var i = $(Pa + " " + a + " " + t);
      var o = $(Ma);
      var u = $(Ra);
      var l = {
        Gr: i,
        Wr: o,
        Yr: u
      };
      if (!v) {
        Tr(i, za);
      }
      W(i, o);
      W(o, u);
      S(n, l);
      S(L, [ Z.bind(0, i), e(l, R, f, c, g, r) ]);
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
        ra: T.bind(0, H)
      },
      aa: {
        Kr: M,
        Qr: B,
        ra: T.bind(0, M)
      }
    }, j, x.bind(0, L) ];
  };
  var Ln = function createScrollbarsSetup(r, a, e, n) {
    var t;
    var v;
    var i;
    var o;
    var u;
    var f = 0;
    var l = Re({});
    var c = l[0];
    var s = br(), d = s[0], h = s[1];
    var g = br(), p = g[0], w = g[1];
    var b = br(100), m = b[0], y = b[1];
    var S = br(100), C = S[0], O = S[1];
    var E = br((function() {
      return f;
    })), z = E[0], T = E[1];
    var P = An(r, e.Nr, Cn(a, e)), A = P[0], L = P[1], H = P[2];
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
      T();
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
      o = v;
      o && J(true);
    };
    var Q = [ y, T, O, w, h, H, Xr(R, "pointerover", K, {
      O: true
    }), Xr(R, "pointerenter", K), Xr(R, "pointerleave", (function() {
      o = false;
      v && J(false);
    })), Xr(R, "pointermove", (function() {
      t && d((function() {
        y();
        J(true);
        C((function() {
          t && J(false);
        }));
      }));
    })), Xr(B, "scroll", (function(r) {
      p((function() {
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
      var h = Ce(), g = h.L;
      var p = Me(a, r, n);
      var w = e();
      var b = w.Tr, m = w.Or, y = w.br;
      var S = p("showNativeOverlaidScrollbars"), C = S[0], O = S[1];
      var x = p("scrollbars.theme"), E = x[0], z = x[1];
      var T = p("scrollbars.visibility"), P = T[0], A = T[1];
      var L = p("scrollbars.autoHide"), H = L[0], M = L[1];
      var R = p("scrollbars.autoHideDelay"), I = R[0];
      var D = p("scrollbars.dragScroll"), k = D[0], V = D[1];
      var B = p("scrollbars.clickScroll"), j = B[0], q = B[1];
      var F = l || c || d;
      var N = s || A;
      var X = C && g.x && g.y;
      var Z = function setScrollbarVisibility(r, a) {
        var e = "visible" === P || "auto" === P && "scroll" === r;
        Y(Ia, e, a);
        return e;
      };
      f = I;
      if (O) {
        Y(Ta, X);
      }
      if (z) {
        Y(u);
        Y(E, true);
        u = E;
      }
      if (M) {
        t = "move" === H;
        v = "leave" === H;
        i = "never" !== H;
        J(!i, true);
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
  var Hn = function invokePluginInstance(r, a, e) {
    if (d(r)) {
      r(a || void 0, e || void 0);
    }
  };
  var Mn = function OverlayScrollbars(r, a, e) {
    var n = Ce(), t = n.Y, v = n.F, i = n.U, o = n.q;
    var u = Ya();
    var f = b(r);
    var l = f ? r : r.target;
    var c = Le(l);
    if (a && !c) {
      var s = false;
      var d = function validateOptions(r) {
        var a = Ya()[ne];
        var e = a && a.T;
        return e ? e(r, true) : r;
      };
      var h = T({}, t(), d(a));
      var g = ra(e), p = g[0], w = g[1], m = g[2];
      var y = _n(r, h), S = y[0], C = y[1], O = y[2];
      var x = Ln(r, h, C, (function(r) {
        return m("scroll", [ k, r ]);
      })), E = x[0], A = x[1], L = x[2];
      var H = function update(r, a) {
        return S(r, !!a);
      };
      var M = H.bind(0, {}, true);
      var R = i(M);
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
            var n = na(h, T(e, d(r)));
            if (!P(n)) {
              T(h, n);
              H(n);
            }
          }
          return T({}, h);
        },
        on: p,
        off: function off(r, a) {
          r && a && w(r, a);
        },
        state: function state() {
          var r = C(), a = r.zr, e = r.Tr, n = r.Or, t = r.Pr, v = r.K, i = r.yr, o = r.br;
          return T({}, {
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
            return T({}, n, {
              clone: function clone() {
                var r = c(e());
                E({}, true, {});
                return r;
              }
            });
          };
          return T({}, {
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
      Pe(l, k);
      each(z(u), (function(r) {
        return Hn(u[r], 0, k);
      }));
      if (ze(C.Nr.ur, v().cancel, !f && r.cancel)) {
        D(true);
        return k;
      }
      C.Fr();
      A.Fr();
      m("initialized", [ k ]);
      C.qr((function(r, a, e) {
        var n = r._r, t = r.mr, v = r.pr, i = r.Lr, o = r.Hr, u = r.Ar, f = r.wr, l = r.Er;
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
  Mn.plugin = function(r) {
    each(Wa(r), (function(r) {
      return Hn(r, Mn);
    }));
  };
  Mn.valid = function(r) {
    var a = r && r.elements;
    var e = d(a) && a();
    return w(e) && !!Le(e.target);
  };
  Mn.env = function() {
    var r = Ce(), a = r.V, e = r.L, n = r.A, t = r.B, v = r.j, i = r.H, o = r.G, u = r.X, f = r.F, l = r.N, c = r.Y, s = r.W;
    return T({}, {
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
  r.ClickScrollPlugin = pe;
  r.OverlayScrollbars = Mn;
  r.ScrollbarsHidingPlugin = he;
  r.SizeObserverPlugin = oe;
  Object.defineProperty(r, "ea", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
