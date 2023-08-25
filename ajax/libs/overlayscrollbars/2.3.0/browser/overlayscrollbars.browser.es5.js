/*!
 * OverlayScrollbars
 * Version: 2.3.0
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
        t = e ? Lr(r, i, a) : a.reduce((function(a, e) {
          a[e] = Lr(r, i, e);
          return a;
        }), t);
      }
      return t;
    }
    r && each(T(a), (function(e) {
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
  var m = function isPlainObject(r) {
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
  var w = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === n : false;
  };
  var S = function indexOf(r, a, e) {
    return r.indexOf(a, e);
  };
  var y = function push(r, a, e) {
    !e && !c(a) && g(a) ? Array.prototype.push.apply(r, a) : r.push(a);
    return r;
  };
  var O = function from(r) {
    var a = Array.from;
    var e = [];
    if (a && r) {
      return a(r);
    }
    if (r instanceof Set) {
      r.forEach((function(r) {
        y(e, r);
      }));
    } else {
      each(r, (function(r) {
        y(e, r);
      }));
    }
    return e;
  };
  var C = function isEmptyArray(r) {
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
  var T = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var z = function assignDeep(r, a, e, n, t, i, v) {
    var o = [ a, e, n, t, i, v ];
    if (("object" !== typeof r || u(r)) && !d(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(T(a), (function(e) {
        var n = a[e];
        if (r === n) {
          return true;
        }
        var t = h(n);
        if (n && (m(n) || t)) {
          var i = r[e];
          var v = i;
          if (t && !h(i)) {
            v = [];
          } else if (!t && !m(i)) {
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
  var H = function attr(r, a, e) {
    if (o(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var L = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var M = function attrClass(r, a, e, n) {
    if (e) {
      var t = H(r, a) || "";
      var i = new Set(t.split(" "));
      i[n ? "add" : "delete"](e);
      var v = O(i).join(" ").trim();
      H(r, a, v);
    }
  };
  var R = function hasAttrClass(r, a, e) {
    var n = H(r, a) || "";
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
    var n = a ? w(a) ? a : null : document;
    return n ? y(e, n.querySelectorAll(r)) : e;
  };
  var B = function findFirst(r, a) {
    var e = a ? w(a) ? a : null : document;
    return e ? e.querySelector(r) : null;
  };
  var j = function is(r, a) {
    if (w(r)) {
      var e = k.matches || k.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var F = function contents(r) {
    return r ? O(r.childNodes) : [];
  };
  var U = function parent(r) {
    return r ? r.parentElement : null;
  };
  var q = function closest(r, a) {
    if (w(r)) {
      var e = k.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (j(r, a)) {
          return r;
        }
        r = U(r);
      } while (r);
    }
    return null;
  };
  var N = function liesBetween(r, a, e) {
    var n = r && q(r, a);
    var t = r && B(e, n);
    var i = q(t, a) === n;
    return n && t ? n === r || t === r || i && q(q(r, e), a) !== n : false;
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
    Y(U(r), r, a);
  };
  var X = function insertAfter(r, a) {
    Y(U(r), r && r.nextSibling, a);
  };
  var Z = function removeElements(r) {
    if (g(r)) {
      each(O(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = U(r);
      if (a) {
        a.removeChild(r);
      }
    }
  };
  var K = function createDiv(r) {
    var a = document.createElement("div");
    if (r) {
      H(a, "class", r);
    }
    return a;
  };
  var $ = function createDOM(r) {
    var a = K();
    a.innerHTML = r.trim();
    return each(F(a), (function(r) {
      return Z(r);
    }));
  };
  var J = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var Q = function getDummyStyle() {
    return K().style;
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
    var e = J(r);
    var n = Q();
    each(rr, (function(t) {
      var i = t.replace(/-/g, "");
      var v = [ r, t + r, i + e, J(i) + e ];
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
        a = a || window[e + J(r)];
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
  var cr = ir("ScrollTimeline");
  var sr = e() && window.setTimeout;
  var dr = e() && window.clearTimeout;
  var hr = /[^\x20\t\r\n\f]+/g;
  var pr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var i = 0;
    var v = false;
    if (n && a && c(a)) {
      var o = a.match(hr) || [];
      v = o.length > 0;
      while (t = o[i++]) {
        v = !!e(n, t) && v;
      }
    }
    return v;
  };
  var gr = function removeClass(r, a) {
    pr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var _r = function addClass(r, a) {
    pr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return gr.bind(0, r, a);
  };
  var mr = Math.max;
  var br = function animationCurrentTime() {
    return performance.now();
  };
  var wr = function animateNumber(r, a, e, n, t) {
    var i = 0;
    var v = br();
    var o = mr(0, e);
    var u = function frame(e) {
      var u = br();
      var f = u - v;
      var l = f >= o;
      var c = e ? 1 : 1 - (mr(0, v + o - u) / o || 0);
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
  var Sr = function equal(r, a, e, n) {
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
  var yr = function equalWH(r, a) {
    return Sr(r, a, [ "w", "h" ]);
  };
  var Or = function equalXY(r, a) {
    return Sr(r, a, [ "x", "y" ]);
  };
  var Cr = function equalTRBL(r, a) {
    return Sr(r, a, [ "t", "r", "b", "l" ]);
  };
  var xr = function equalBCRWH(r, a, e) {
    return Sr(r, a, [ "width", "height" ], e && function(r) {
      return Math.round(r);
    });
  };
  var Er = function noop() {};
  var Tr = function selfClearTimeout(r) {
    var a;
    var e = r ? sr : lr;
    var n = r ? dr : fr;
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
    var i = Er;
    var v = a || {}, o = v.p, u = v.g, f = v._;
    var c = function invokeFunctionToDebounce(a) {
      i();
      dr(e);
      e = n = void 0;
      i = Er;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return f && n ? f(n, r) : r;
    };
    var h = function flush() {
      if (i !== Er) {
        c(s(t) || t);
      }
    };
    var p = function debouncedFn() {
      var r = O(arguments);
      var a = d(o) ? o() : o;
      var v = l(a) && a >= 0;
      if (v) {
        var f = d(u) ? u() : u;
        var p = l(f) && f >= 0;
        var g = a > 0 ? sr : lr;
        var m = a > 0 ? dr : fr;
        var b = s(r);
        var w = b || r;
        var S = c.bind(0, w);
        i();
        var y = g(S, a);
        i = function clear() {
          return m(y);
        };
        if (p && !e) {
          e = sr(h, f);
        }
        n = t = w;
      } else {
        c(r);
      }
    };
    p.m = h;
    return p;
  };
  var Pr = {
    opacity: 1,
    zIndex: 1
  };
  var Ar = function parseToZeroOrNumber(r, a) {
    var e = r || "";
    var n = a ? parseFloat(e) : parseInt(e, 10);
    return n === n ? n : 0;
  };
  var Hr = function adaptCSSVal(r, a) {
    return !Pr[r] && l(a) ? a + "px" : a;
  };
  var Lr = function getCSSVal(r, a, e) {
    return String((null != a ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
  };
  var Mr = function setCSSVal(r, a, e) {
    try {
      var n = r.style;
      if (!o(n[a])) {
        n[a] = Hr(a, e);
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
  var Dr = function getTrasformTranslateValue(r, a) {
    return "translate" + (h(r) ? "(" + r[0] + "," + r[1] + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var kr = Math.round;
  var Vr = {
    w: 0,
    h: 0
  };
  var Br = function windowSize() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  };
  var jr = function offsetSize(r) {
    return r ? {
      w: r.offsetWidth,
      h: r.offsetHeight
    } : Vr;
  };
  var Fr = function clientSize(r) {
    return r ? {
      w: r.clientWidth,
      h: r.clientHeight
    } : Vr;
  };
  var Ur = function scrollSize(r) {
    return r ? {
      w: r.scrollWidth,
      h: r.scrollHeight
    } : Vr;
  };
  var qr = function fractionalSize(r) {
    var a = parseFloat(style(r, "height")) || 0;
    var e = parseFloat(style(r, "width")) || 0;
    return {
      w: e - kr(e),
      h: a - kr(a)
    };
  };
  var Nr = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var Yr = function domRectHasDimensions(r) {
    return !!(r && (r.height || r.width));
  };
  var Wr;
  var Gr = function supportPassiveEvents() {
    if (o(Wr)) {
      Wr = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            Wr = true;
          }
        }));
      } catch (r) {}
    }
    return Wr;
  };
  var Xr = function splitEventNames(r) {
    return r.split(" ");
  };
  var Zr = function off(r, a, e, n) {
    each(Xr(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var Kr = function on(r, a, e, n) {
    var t;
    var i = Gr();
    var v = null != (t = i && n && n.S) ? t : i;
    var o = n && n.O || false;
    var u = n && n.C || false;
    var f = [];
    var l = i ? {
      passive: v,
      capture: o
    } : o;
    each(Xr(a), (function(a) {
      var n = u ? function(t) {
        r.removeEventListener(a, n, o);
        e && e(t);
      } : e;
      y(f, Zr.bind(null, r, a, n, o));
      r.addEventListener(a, n, l);
    }));
    return x.bind(0, f);
  };
  var $r = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var Jr = function preventDefault(r) {
    return r.preventDefault();
  };
  var Qr = {
    x: 0,
    y: 0
  };
  var ra = function absoluteCoordinates(r) {
    var a = r ? Nr(r) : 0;
    return a ? {
      x: a.left + window.pageYOffset,
      y: a.top + window.pageXOffset
    } : Qr;
  };
  var aa = function manageListener(r, a) {
    each(h(a) ? a : [ a ], r);
  };
  var ea = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        aa((function(r) {
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
        aa((function(r) {
          d(r) && t.add(r);
        }), n);
        return e.bind(0, r, n);
      }
      if (s(n) && n) {
        e();
      }
      var i = T(r);
      var v = [];
      each(i, (function(a) {
        var e = r[a];
        e && y(v, addEvent(a, e));
      }));
      return x.bind(0, v);
    };
    var t = function triggerEvent(r, e) {
      var n = a.get(r);
      each(O(n), (function(r) {
        if (e && !C(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, e, t ];
  };
  var na = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (d(a)) {
        throw new Error;
      }
      return a;
    }));
  };
  var ta = {
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
  var ia = function getOptionsDiff(r, a) {
    var e = {};
    var n = T(a).concat(T(r));
    each(n, (function(n) {
      var t = r[n];
      var i = a[n];
      if (p(t) && p(i)) {
        z(e[n] = {}, getOptionsDiff(t, i));
        if (P(e[n])) {
          delete e[n];
        }
      } else if (E(a, n) && i !== t) {
        var v = true;
        if (h(t) || h(i)) {
          try {
            if (na(t) === na(i)) {
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
  var va = "data-overlayscrollbars";
  var oa = "os-environment";
  var ua = oa + "-flexbox-glue";
  var fa = ua + "-max";
  var la = "os-scrollbar-hidden";
  var ca = va + "-initialize";
  var sa = va;
  var da = sa + "-overflow-x";
  var ha = sa + "-overflow-y";
  var pa = "overflowVisible";
  var ga = "scrollbarHidden";
  var _a = "scrollbarPressed";
  var ma = "updating";
  var ba = va + "-viewport";
  var wa = "arrange";
  var Sa = "scrollbarHidden";
  var ya = pa;
  var Oa = va + "-padding";
  var Ca = ya;
  var xa = va + "-content";
  var Ea = "os-size-observer";
  var Ta = Ea + "-appear";
  var za = Ea + "-listener";
  var Pa = za + "-scroll";
  var Aa = za + "-item";
  var Ha = Aa + "-final";
  var La = "os-trinsic-observer";
  var Ma = "os-no-css-vars";
  var Ra = "os-theme-none";
  var Ia = "os-scrollbar";
  var Da = Ia + "-rtl";
  var ka = Ia + "-horizontal";
  var Va = Ia + "-vertical";
  var Ba = Ia + "-track";
  var ja = Ia + "-handle";
  var Fa = Ia + "-visible";
  var Ua = Ia + "-cornerless";
  var qa = Ia + "-transitionless";
  var Na = Ia + "-interaction";
  var Ya = Ia + "-unusable";
  var Wa = Ia + "-auto-hide";
  var Ga = Wa + "-hidden";
  var Xa = Ia + "-wheel";
  var Za = Ba + "-interactive";
  var Ka = ja + "-interactive";
  var $a = {};
  var Ja = function getPlugins() {
    return $a;
  };
  var Qa = function addPlugin(r) {
    var a = [];
    each(h(r) ? r : [ r ], (function(r) {
      var e = T(r);
      each(e, (function(e) {
        y(a, $a[e] = r[e]);
      }));
    }));
    return a;
  };
  var re = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var ae = function validateRecursive(r, a, e, n) {
    var t = {};
    var i = _extends({}, a);
    var v = T(r).filter((function(r) {
      return E(a, r);
    }));
    each(v, (function(v) {
      var u = a[v];
      var l = r[v];
      var s = m(l);
      var d = n ? n + "." : "";
      if (s && m(u)) {
        var p = validateRecursive(l, u, e, d + v), g = p[0], b = p[1];
        t[v] = g;
        i[v] = b;
        each([ i, t ], (function(r) {
          if (P(r[v])) {
            delete r[v];
          }
        }));
      } else if (!s) {
        var w = false;
        var S = [];
        var O = [];
        var C = f(u);
        var x = !h(l) ? [ l ] : l;
        each(x, (function(r) {
          var a;
          each(re, (function(e, n) {
            if (e === r) {
              a = n;
            }
          }));
          var e = o(a);
          if (e && c(u)) {
            var n = r.split(" ");
            w = !!n.find((function(r) {
              return r === u;
            }));
            y(S, n);
          } else {
            w = re[C] === r;
          }
          y(O, e ? re.string : a);
          return !w;
        }));
        if (w) {
          t[v] = u;
        } else if (e) {
          console.warn('The option "' + d + v + "\" wasn't set, because it doesn't accept the type [ " + C.toUpperCase() + ' ] with the value of "' + u + '".\r\n' + "Accepted types are: [ " + O.join(", ").toUpperCase() + " ].\r\n" + (S.length > 0 ? "\r\nValid strings are: [ " + S.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ t, i ];
  };
  var ee = function validateOptions(r, a, e) {
    return ae(r, a, e);
  };
  var ne = re.number;
  var te = re.boolean;
  var ie = [ re.array, re.null ];
  var ve = "hidden scroll visible visible-hidden";
  var oe = "visible hidden auto";
  var ue = "never scroll leavemove";
  var fe = {
    paddingAbsolute: te,
    showNativeOverlaidScrollbars: te,
    update: {
      elementEvents: ie,
      attributes: ie,
      debounce: [ re.number, re.array, re.null ],
      ignoreMutation: [ re.function, re.null ]
    },
    overflow: {
      x: ve,
      y: ve
    },
    scrollbars: {
      theme: [ re.string, re.null ],
      visibility: oe,
      autoHide: ue,
      autoHideDelay: ne,
      autoHideSuspend: te,
      dragScroll: te,
      clickScroll: te,
      pointers: [ re.array, re.null ]
    }
  };
  var le = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[le] = {
      T: function _(r, a) {
        var e = ee(fe, r, a), n = e[0], t = e[1];
        return _extends({}, t, n);
      }
    }, r;
  })();
  var ce = 3333333;
  var se = "scroll";
  var de = "__osSizeObserverPlugin";
  var he = /* @__PURE__ */ function(r) {
    return r = {}, r[de] = {
      T: function _(r, a, e) {
        var n = $('<div class="' + Aa + '" dir="ltr"><div class="' + Aa + '"><div class="' + Ha + '"></div></div><div class="' + Aa + '"><div class="' + Ha + '" style="width: 200%; height: 200%"></div></div></div>');
        W(r, n);
        _r(r, Pa);
        var t = n[0];
        var i = t.lastChild;
        var v = t.firstChild;
        var o = null == v ? void 0 : v.firstChild;
        var u = jr(t);
        var f = u;
        var l = false;
        var c;
        var s = function reset() {
          I(v, ce);
          D(v, ce);
          I(i, ce);
          D(i, ce);
        };
        var d = function onResized(r) {
          c = 0;
          if (l) {
            u = f;
            a(true === r);
          }
        };
        var h = function onScroll(r) {
          f = jr(t);
          l = !r || !yr(f, u);
          if (r) {
            $r(r);
            if (l && !c) {
              fr(c);
              c = lr(d);
            }
          } else {
            d(false === r);
          }
          s();
        };
        var p = y([], [ Kr(v, se, h), Kr(i, se, h) ]);
        style(o, {
          width: ce,
          height: ce
        });
        lr(s);
        return [ e ? h.bind(0, false) : s, p ];
      }
    }, r;
  }();
  var pe = 0;
  var ge = Math.round, _e = Math.abs;
  var me = function getWindowDPR() {
    var r = window.screen.deviceXDPI || 0;
    var a = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || r / a;
  };
  var be = function diffBiggerThanOne(r, a) {
    var e = _e(r);
    var n = _e(a);
    return !(e === n || e + 1 === n || e - 1 === n);
  };
  var we = "__osScrollbarsHidingPlugin";
  var Se = /* @__PURE__ */ function(r) {
    return r = {}, r[we] = {
      P: function _createUniqueViewportArrangeElement(r) {
        var a = r.A, e = r.H, n = r.L;
        var t = !n && !a && (e.x || e.y);
        var i = t ? document.createElement("style") : false;
        if (i) {
          H(i, "id", ba + "-" + wa + "-" + pe);
          pe++;
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
            var m = f[g];
            var b = f.paddingTop;
            var w = i.w + v.w;
            var S = i.h + v.h;
            var y = {
              w: p && d ? p + w - m + "px" : "",
              h: h && s ? h + S - b + "px" : ""
            };
            if (n) {
              var O = n.sheet;
              if (O) {
                var C = O.cssRules;
                if (C) {
                  if (!C.length) {
                    O.insertRule("#" + H(n, "id") + " + [" + ba + "~='" + wa + "']::before {}", 0);
                  }
                  var x = C[0].style;
                  x.width = y.w;
                  x.height = y.h;
                }
              }
            } else {
              style(e, {
                "--os-vaw": y.w,
                "--os-vah": y.h
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
            var m = style(e, T(p));
            M(e, ba, wa);
            if (!a) {
              p.height = "";
            }
            style(e, p);
            return [ function() {
              v(f, o, r, m);
              style(e, m);
              M(e, ba, wa, true);
            }, f ];
          }
          return [ Er ];
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
          var i = Br();
          var v = {
            w: i.w - r.w,
            h: i.h - r.h
          };
          if (0 === v.w && 0 === v.h) {
            return;
          }
          var o = {
            w: _e(v.w),
            h: _e(v.h)
          };
          var u = {
            w: _e(ge(i.w / (r.w / 100))),
            h: _e(ge(i.h / (r.h / 100)))
          };
          var f = me();
          var l = o.w > 2 && o.h > 2;
          var c = !be(u.w, u.h);
          var s = f !== a && f > 0;
          var d = l && c && s;
          if (d) {
            var h = n(), p = h[0], g = h[1];
            z(e.V, p);
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
  var ye = "__osClickScrollPlugin";
  var Oe = /* @__PURE__ */ function(r) {
    return r = {}, r[ye] = {
      T: function _(r, a, e, n, t) {
        var i = 0;
        var v = Er;
        var o = function animateClickScroll(o) {
          v = wr(o, o + n * Math.sign(e), 133, (function(e, o, u) {
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
  var Ce;
  var xe = function getNativeScrollbarSize(r, a, e, n) {
    W(r, a);
    var t = Fr(a);
    var i = jr(a);
    var v = qr(e);
    n && Z(a);
    return {
      x: i.h - t.h + v.h,
      y: i.w - t.w + v.w
    };
  };
  var Ee = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = _r(r, la);
    try {
      a = "none" === style(r, tr("scrollbar-width")) || "none" === window.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display");
    } catch (n) {}
    e();
    return a;
  };
  var Te = function getRtlScrollBehavior(r, a) {
    var e = "hidden";
    style(r, {
      overflowX: e,
      overflowY: e,
      direction: "rtl"
    });
    I(r, 0);
    var n = ra(r);
    var t = ra(a);
    I(r, -999);
    var i = ra(a);
    return {
      i: n.x === t.x,
      n: t.x !== i.x
    };
  };
  var ze = function getFlexboxGlue(r, a) {
    var e = _r(r, ua);
    var n = Nr(r);
    var t = Nr(a);
    var i = xr(t, n, true);
    var v = _r(r, fa);
    var o = Nr(r);
    var u = Nr(a);
    var f = xr(u, o, true);
    e();
    v();
    return i && f;
  };
  var Pe = function createEnvironment() {
    var r = document, e = r.body;
    var n = $('<div class="' + oa + '"><div></div></div>');
    var t = n[0];
    var i = t.firstChild;
    var v = ea(), o = v[0], u = v[2];
    var f = a({
      v: xe(e, t, i),
      o: Or
    }, xe.bind(0, e, t, i, true)), l = f[0], c = f[1];
    var s = c(), d = s[0];
    var h = Ee(t);
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
    var m = z({}, ta);
    var b = z.bind(0, {}, m);
    var w = z.bind(0, {}, g);
    var S = {
      V: d,
      H: p,
      A: h,
      L: "-1" === style(t, "zIndex"),
      B: !!cr,
      j: Te(t, i),
      F: ze(t, i),
      U: o.bind(0, "z"),
      q: o.bind(0, "r"),
      N: w,
      Y: function _setDefaultInitialization(r) {
        return z(g, r) && w();
      },
      W: b,
      G: function _setDefaultOptions(r) {
        return z(m, r) && b();
      },
      X: z({}, g),
      Z: z({}, m)
    };
    var y = window.addEventListener;
    var O = zr((function(r) {
      return u(r ? "z" : "r");
    }), {
      p: 33,
      g: 99
    });
    L(t, "style");
    Z(t);
    y("resize", O.bind(0, false));
    if (!h && (!p.x || !p.y)) {
      var C;
      y("resize", (function() {
        var r = Ja()[we];
        C = C || r && r.k();
        C && C(S, l, O.bind(0, true));
      }));
    }
    return S;
  };
  var Ae = function getEnvironment() {
    if (!Ce) {
      Ce = Pe();
    }
    return Ce;
  };
  var He = function resolveInitialization(r, a) {
    return d(a) ? a.apply(0, r) : a;
  };
  var Le = function staticInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = He(r, t);
    return i || a.apply(0, r);
  };
  var Me = function dynamicInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = He(r, t);
    return !!i && (b(i) ? i : a.apply(0, r));
  };
  var Re = function cancelInitialization(r, a, e) {
    var n = e || {}, t = n.nativeScrollbarsOverlaid, i = n.body;
    var v = Ae(), f = v.H, l = v.A;
    var c = a.nativeScrollbarsOverlaid, s = a.body;
    var d = null != t ? t : c;
    var h = o(i) ? s : i;
    var p = (f.x || f.y) && d;
    var g = r && (u(h) ? !l : h);
    return !!p || !!g;
  };
  var Ie = new WeakMap;
  var De = function addInstance(r, a) {
    Ie.set(r, a);
  };
  var ke = function removeInstance(r) {
    Ie.delete(r);
  };
  var Ve = function getInstance(r) {
    return Ie.get(r);
  };
  var Be = function getPropByPath(r, a) {
    return r ? a.split(".").reduce((function(r, a) {
      return r && E(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var je = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ Be(r, n), e || void 0 !== Be(a, n) ];
    };
  };
  var Fe = function createState(r) {
    var a = r;
    return [ function() {
      return a;
    }, function(r) {
      a = z({}, a, r);
    } ];
  };
  var Ue = "tabindex";
  var qe = K.bind(0, "");
  var Ne = function unwrap(r) {
    W(U(r), F(r));
    Z(r);
  };
  var Ye = function createStructureSetupElements(r) {
    var a = Ae();
    var e = a.N, n = a.A;
    var t = Ja()[we];
    var i = t && t.P;
    var v = e(), o = v.elements;
    var u = o.host, f = o.padding, l = o.viewport, c = o.content;
    var s = b(r);
    var d = s ? {} : r;
    var h = d.elements;
    var p = h || {}, g = p.host, m = p.padding, w = p.viewport, O = p.content;
    var C = s ? r : d.target;
    var E = j(C, "textarea");
    var z = C.ownerDocument;
    var P = z.documentElement;
    var A = C === z.body;
    var I = z.defaultView;
    var D = Le.bind(0, [ C ]);
    var k = Me.bind(0, [ C ]);
    var V = He.bind(0, [ C ]);
    var B = D.bind(0, qe, l);
    var q = k.bind(0, qe, c);
    var N = B(w);
    var Y = N === C;
    var K = Y && A;
    var $ = !Y && q(O);
    var J = !Y && b(N) && N === $;
    var Q = J && !!V(c);
    var rr = Q ? B() : N;
    var ar = Q ? $ : q();
    var er = J ? rr : N;
    var nr = K ? P : er;
    var tr = E ? D(qe, u, g) : C;
    var ir = K ? nr : tr;
    var vr = J ? ar : $;
    var or = z.activeElement;
    var ur = !Y && I.top === I && or === C;
    var fr = {
      K: C,
      $: ir,
      J: nr,
      rr: !Y && k(qe, f, m),
      ar: vr,
      er: !Y && !n && i && i(a),
      nr: K ? P : nr,
      tr: K ? z : nr,
      ir: I,
      vr: z,
      ur: E,
      lr: A,
      cr: s,
      sr: Y,
      dr: J,
      hr: function _viewportHasClass(r, a) {
        return R(nr, Y ? sa : ba, Y ? a : r);
      },
      pr: function _viewportAddRemoveClass(r, a, e) {
        return M(nr, Y ? sa : ba, Y ? a : r, e);
      }
    };
    var lr = T(fr).reduce((function(r, a) {
      var e = fr[a];
      return y(r, e && b(e) && !U(e) ? e : false);
    }), []);
    var cr = function elementIsGenerated(r) {
      return r ? S(lr, r) > -1 : null;
    };
    var sr = fr.K, dr = fr.$, hr = fr.rr, pr = fr.J, gr = fr.ar, mr = fr.er;
    var br = [ function() {
      L(dr, sa);
      L(dr, ca);
      L(sr, ca);
      if (A) {
        L(P, sa);
        L(P, ca);
      }
    } ];
    var wr = E && cr(dr);
    var Sr = E ? sr : F([ gr, pr, hr, dr, sr ].find((function(r) {
      return false === cr(r);
    })));
    var yr = K ? sr : gr || pr;
    var Or = function appendElements() {
      H(dr, sa, Y ? "viewport" : "host");
      H(hr, Oa, "");
      H(gr, xa, "");
      if (!Y) {
        H(pr, ba, "");
      }
      var r = A && !Y ? _r(U(C), la) : Er;
      if (wr) {
        X(sr, dr);
        y(br, (function() {
          X(dr, sr);
          Z(dr);
        }));
      }
      W(yr, Sr);
      W(dr, hr);
      W(hr || dr, !Y && pr);
      W(pr, gr);
      y(br, (function() {
        r();
        L(hr, Oa);
        L(gr, xa);
        L(pr, da);
        L(pr, ha);
        L(pr, ba);
        if (cr(gr)) {
          Ne(gr);
        }
        if (cr(pr)) {
          Ne(pr);
        }
        if (cr(hr)) {
          Ne(hr);
        }
      }));
      if (n && !Y) {
        M(pr, ba, Sa, true);
        y(br, L.bind(0, pr, ba));
      }
      if (mr) {
        G(pr, mr);
        y(br, Z.bind(0, mr));
      }
      if (ur) {
        var a = H(pr, Ue);
        H(pr, Ue, "-1");
        pr.focus();
        var e = function revertViewportTabIndex() {
          return a ? H(pr, Ue, a) : L(pr, Ue);
        };
        var t = Kr(z, "pointerdown keydown", (function() {
          e();
          t();
        }));
        y(br, [ e, t ]);
      } else if (or && or.focus) {
        or.focus();
      }
      Sr = 0;
    };
    return [ fr, Or, x.bind(0, br) ];
  };
  var We = function createTrinsicUpdateSegment(r, a) {
    var e = r.ar;
    var n = a[0];
    return function(r) {
      var a = Ae(), t = a.F;
      var i = n(), v = i.gr;
      var o = r._r;
      var u = (e || !t) && o;
      if (u) {
        style(e, {
          height: v ? "" : "100%"
        });
      }
      return {
        mr: u,
        br: u
      };
    };
  };
  var Ge = function createPaddingUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.$, v = r.rr, o = r.J, u = r.sr;
    var f = a({
      o: Cr,
      v: Ir()
    }, Ir.bind(0, i, "padding", "")), l = f[0], c = f[1];
    return function(r, a, e) {
      var i = c(e), f = i[0], s = i[1];
      var d = Ae(), h = d.A, p = d.F;
      var g = n(), m = g.wr;
      var b = r.mr, w = r.br, S = r.Sr;
      var y = a("paddingAbsolute"), O = y[0], C = y[1];
      var x = !p && w;
      if (b || s || x) {
        var E = l(e);
        f = E[0];
        s = E[1];
      }
      var T = !u && (C || S || s);
      if (T) {
        var P = !O || !v && !h;
        var A = f.r + f.l;
        var H = f.t + f.b;
        var L = {
          marginRight: P && !m ? -A : 0,
          marginBottom: P ? -H : 0,
          marginLeft: P && m ? -A : 0,
          top: P ? -f.t : 0,
          right: P ? m ? -f.r : "auto" : 0,
          left: P ? m ? "auto" : -f.l : 0,
          width: P ? "calc(100% + " + A + "px)" : ""
        };
        var M = {
          paddingTop: P ? f.t : 0,
          paddingRight: P ? f.r : 0,
          paddingBottom: P ? f.b : 0,
          paddingLeft: P ? f.l : 0
        };
        style(v || o, L);
        style(o, M);
        t({
          rr: f,
          yr: !P,
          R: v ? M : z({}, L, M)
        });
      }
      return {
        Or: T
      };
    };
  };
  var Xe = Math.max;
  var Ze = Xe.bind(0, 0);
  var Ke = "visible";
  var $e = "hidden";
  var Je = 42;
  var Qe = {
    o: yr,
    v: {
      w: 0,
      h: 0
    }
  };
  var rn = {
    o: Or,
    v: {
      x: $e,
      y: $e
    }
  };
  var an = function getOverflowAmount(r, a) {
    var e = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    var n = {
      w: Ze(r.w - a.w),
      h: Ze(r.h - a.h)
    };
    return {
      w: n.w > e ? n.w : 0,
      h: n.h > e ? n.h : 0
    };
  };
  var en = function overflowIsVisible(r) {
    return 0 === r.indexOf(Ke);
  };
  var nn = function createOverflowUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.$, v = r.rr, o = r.J, u = r.er, f = r.sr, l = r.pr, c = r.lr, s = r.ir;
    var d = Ae(), h = d.V, p = d.F, g = d.A, m = d.H;
    var b = Ja()[we];
    var w = !f && !g && (m.x || m.y);
    var S = c && f;
    var y = a(Qe, qr.bind(0, o)), O = y[0], C = y[1];
    var x = a(Qe, Ur.bind(0, o)), E = x[0], T = x[1];
    var z = a(Qe), P = z[0], A = z[1];
    var L = a(Qe), R = L[0], I = L[1];
    var D = a(rn), k = D[0];
    var V = function fixFlexboxGlue(r, a) {
      style(o, {
        height: ""
      });
      if (a) {
        var e = n(), t = e.yr, v = e.rr;
        var u = r.Cr, f = r.I;
        var l = qr(i);
        var c = Fr(i);
        var s = "content-box" === style(o, "boxSizing");
        var d = t || s ? v.b + v.t : 0;
        var h = !(m.x && s);
        style(o, {
          height: c.h + l.h + (u.x && h ? f.x : 0) - d
        });
      }
    };
    var B = function getViewportOverflowState(r, a) {
      var e = !g && !r ? Je : 0;
      var n = function getStatePerAxis(r, n, t) {
        var i = style(o, r);
        var v = a ? a[r] : i;
        var u = "scroll" === v;
        var f = n ? e : t;
        var l = u && !g ? f : 0;
        var c = n && !!e;
        return [ i, u, l, c ];
      };
      var t = n("overflowX", m.x, h.x), i = t[0], v = t[1], u = t[2], f = t[3];
      var l = n("overflowY", m.y, h.y), c = l[0], s = l[1], d = l[2], p = l[3];
      return {
        Er: {
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
        var e = en(r);
        var n = a && e && r.replace(Ke + "-", "") || "";
        return [ a && !e ? r : "", en(n) ? "hidden" : n ];
      };
      var i = t(e.x, a.x), v = i[0], o = i[1];
      var u = t(e.y, a.y), f = u[0], l = u[1];
      n.overflowX = o && f ? o : v;
      n.overflowY = l && v ? l : f;
      return B(r, n);
    };
    var F = function hideNativeScrollbars(r, a, e, t) {
      var i = r.I, v = r.D;
      var o = v.x, u = v.y;
      var f = i.x, l = i.y;
      var c = n(), s = c.R;
      var d = a ? "marginLeft" : "marginRight";
      var h = a ? "paddingLeft" : "paddingRight";
      var p = s[d];
      var g = s.marginBottom;
      var m = s[h];
      var b = s.paddingBottom;
      t.width = "calc(100% + " + (l + -1 * p) + "px)";
      t[d] = -l + p;
      t.marginBottom = -f + g;
      if (e) {
        t[h] = m + (u ? l : 0);
        t.paddingBottom = b + (o ? f : 0);
      }
    };
    var U = b ? b.M(w, p, o, u, n, B, F) : [ function() {
      return w;
    }, function() {
      return [ Er ];
    } ], q = U[0], N = U[1];
    return function(r, a, e) {
      var u = r.mr, c = r.Tr, d = r.br, h = r.Or, b = r._r, w = r.Sr;
      var y = n(), x = y.gr, z = y.wr;
      var L = a("showNativeOverlaidScrollbars"), D = L[0], U = L[1];
      var Y = a("overflow"), W = Y[0], G = Y[1];
      var X = D && m.x && m.y;
      var Z = !f && !p && (u || d || c || U || b);
      var K = en(W.x);
      var $ = en(W.y);
      var J = K || $;
      var Q = C(e);
      var rr = T(e);
      var ar = A(e);
      var er = I(e);
      var nr;
      if (U && g) {
        l(Sa, ga, !X);
      }
      if (Z) {
        nr = B(X);
        V(nr, x);
      }
      if (u || h || d || w || U) {
        if (J) {
          l(ya, pa, false);
        }
        var tr = N(X, z, nr), ir = tr[0], vr = tr[1];
        var or = Q = O(e), ur = or[0], fr = or[1];
        var lr = rr = E(e), cr = lr[0], sr = lr[1];
        var dr = Fr(o);
        var hr = cr;
        var pr = dr;
        ir();
        if ((sr || fr || U) && vr && !X && q(vr, cr, ur, z)) {
          pr = Fr(o);
          hr = Ur(o);
        }
        var gr = {
          w: Ze(Xe(cr.w, hr.w) + ur.w),
          h: Ze(Xe(cr.h, hr.h) + ur.h)
        };
        var _r = {
          w: Ze((S ? s.innerWidth : pr.w + Ze(dr.w - cr.w)) + ur.w),
          h: Ze((S ? s.innerHeight + ur.h : pr.h + Ze(dr.h - cr.h)) + ur.h)
        };
        er = R(_r);
        ar = P(an(gr, _r), e);
      }
      var mr = er, br = mr[0], wr = mr[1];
      var Sr = ar, yr = Sr[0], Or = Sr[1];
      var Cr = rr, xr = Cr[0], Er = Cr[1];
      var Tr = Q, zr = Tr[0], Pr = Tr[1];
      var Ar = {
        x: yr.w > 0,
        y: yr.h > 0
      };
      var Hr = K && $ && (Ar.x || Ar.y) || K && Ar.x && !Ar.y || $ && Ar.y && !Ar.x;
      if (h || w || Pr || Er || wr || Or || G || U || Z) {
        var Lr = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        var Mr = j(X, Ar, W, Lr);
        var Rr = q(Mr, xr, zr, z);
        if (!f) {
          F(Mr, z, Rr, Lr);
        }
        if (Z) {
          V(Mr, x);
        }
        if (f) {
          H(i, da, Lr.overflowX);
          H(i, ha, Lr.overflowY);
        } else {
          style(o, Lr);
        }
      }
      M(i, sa, pa, Hr);
      M(v, Oa, Ca, Hr);
      if (!f) {
        M(o, ba, ya, J);
      }
      var Ir = k(B(X).Er), Dr = Ir[0], kr = Ir[1];
      t({
        Er: Dr,
        zr: {
          x: br.w,
          y: br.h
        },
        Pr: {
          x: yr.w,
          y: yr.h
        },
        Ar: Ar
      });
      return {
        Hr: kr,
        Lr: wr,
        Mr: Or
      };
    };
  };
  var tn = function prepareUpdateHints(r, a, e) {
    var n = {};
    var t = a || {};
    var i = T(r).concat(T(t));
    each(i, (function(a) {
      var i = r[a];
      var v = t[a];
      n[a] = !!(e || i || v);
    }));
    return n;
  };
  var vn = function createStructureSetupUpdate(r, a) {
    var e = r.K, n = r.J, t = r.pr, i = r.sr;
    var v = Ae(), o = v.A, u = v.H, f = v.F;
    var l = !o && (u.x || u.y);
    var c = [ We(r, a), Ge(r, a), nn(r, a) ];
    return function(r, a, v) {
      var o = tn(z({
        mr: false,
        Or: false,
        Sr: false,
        _r: false,
        Lr: false,
        Mr: false,
        Hr: false,
        Tr: false,
        br: false,
        Rr: false
      }, a), {}, v);
      var u = l || !f;
      var s = u && I(n);
      var d = u && D(n);
      t("", ma, true);
      var h = o;
      each(c, (function(a) {
        h = tn(h, a(h, r, !!v) || {}, v);
      }));
      I(n, s);
      D(n, d);
      t("", ma);
      if (!i) {
        I(e, 0);
        D(e, 0);
      }
      return h;
    };
  };
  var un = function createEventContentChange(r, a, e) {
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
              y(a, [ v, t.trim() ], true);
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
              var f = Kr(i, v, (function(r) {
                if (t) {
                  f();
                  n.delete(i);
                } else {
                  a(r);
                }
              }));
              n.set(i, y(o, f));
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
  var fn = function createDOMObserver(r, a, e, n) {
    var t = false;
    var i = n || {}, v = i.Ir, o = i.Dr, u = i.kr, f = i.Vr, l = i.Br, s = i.jr;
    var d = zr((function() {
      if (t) {
        e(true);
      }
    }), {
      p: 33,
      g: 99
    });
    var h = un(r, d, u), p = h[0], g = h[1];
    var m = v || [];
    var b = o || [];
    var w = m.concat(b);
    var x = function observerCallback(t, i) {
      var v = l || Er;
      var o = s || Er;
      var u = new Set;
      var d = new Set;
      var h = false;
      var p = false;
      each(t, (function(e) {
        var t = e.attributeName, i = e.target, l = e.type, s = e.oldValue, g = e.addedNodes, m = e.removedNodes;
        var w = "attributes" === l;
        var y = "childList" === l;
        var O = r === i;
        var C = w && c(t) ? H(i, t) : 0;
        var x = 0 !== C && s !== C;
        var E = S(b, t) > -1 && x;
        if (a && (y || !O)) {
          var T = !w;
          var z = w && x;
          var P = z && f && j(i, f);
          var A = P ? !v(i, t, s, C) : T || z;
          var L = A && !o(e, !!P, r, n);
          each(g, (function(r) {
            return u.add(r);
          }));
          each(m, (function(r) {
            return u.add(r);
          }));
          p = p || L;
        }
        if (!a && O && x && !v(i, t, s, C)) {
          d.add(t);
          h = h || E;
        }
      }));
      if (u.size > 0) {
        g((function(r) {
          return O(u).reduce((function(a, e) {
            y(a, V(r, e));
            return j(e, r) ? y(a, e) : a;
          }), []);
        }));
      }
      if (a) {
        !i && p && e(false);
        return [ false ];
      }
      if (d.size > 0 || h) {
        var m = [ O(d), h ];
        !i && e.apply(0, m);
        return m;
      }
    };
    var E = new vr((function(r) {
      return x(r);
    }));
    E.observe(r, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: w,
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
        return !C(r) && x(r, true);
      }
    } ];
  };
  var ln = 3333333;
  var cn = function createSizeObserver(r, e, n) {
    var t = n || {}, i = t.Fr, v = void 0 === i ? false : i, o = t.Rr, u = void 0 === o ? false : o;
    var f = Ja()[de];
    var l = Ae(), c = l.j;
    var d = $('<div class="' + Ea + '"><div class="' + za + '"></div></div>');
    var g = d[0];
    var m = g.firstChild;
    var b = Rr.bind(0, r);
    var w = a({
      v: void 0,
      u: true,
      o: function _equal(r, a) {
        return !(!r || !Yr(r) && Yr(a));
      }
    }), S = w[0];
    var O = function onSizeChangedCallbackProxy(r) {
      var a = h(r) && r.length > 0 && p(r[0]);
      var n = !a && s(r[0]);
      var t = false;
      var i = false;
      var o = true;
      if (a) {
        var u = S(r.pop().contentRect), f = u[0], l = u[2];
        var d = Yr(f);
        var m = Yr(l);
        var b = !l;
        t = b && !!m || !d;
        i = !m && d;
        o = !t;
      } else if (n) {
        o = r[1];
      } else {
        i = true === r;
      }
      if (v && o) {
        var w = n ? r[0] : Rr(g);
        I(g, w ? c.n ? -ln : c.i ? 0 : ln : ln);
        D(g, ln);
      }
      if (!t) {
        e({
          mr: !n,
          Ur: n ? r : void 0,
          Rr: !!i
        });
      }
    };
    var C = [];
    var E = u ? O : false;
    return [ function() {
      x(C);
      Z(g);
    }, function() {
      if (ur) {
        var e = new ur(O);
        e.observe(m);
        y(C, (function() {
          e.disconnect();
        }));
      } else if (f) {
        var n = f.T(m, O, u), t = n[0], i = n[1];
        E = t;
        y(C, i);
      }
      if (v) {
        var o = a({
          v: void 0
        }, b), l = o[0];
        y(C, Kr(g, "scroll", (function(r) {
          var a = l();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            gr(m, "ltr rtl");
            if (e) {
              _r(m, "rtl");
            } else {
              _r(m, "ltr");
            }
            O([ !!e, n, t ]);
          }
          $r(r);
        })));
      }
      if (E) {
        _r(g, Ta);
        y(C, Kr(g, "animationstart", E, {
          C: !!ur
        }));
      }
      if (ur || f) {
        W(r, g);
      }
    } ];
  };
  var sn = function isHeightIntrinsic(r) {
    return 0 === r.h || r.isIntersecting || r.intersectionRatio > 0;
  };
  var dn = function createTrinsicObserver(r, e) {
    var n;
    var t = K(La);
    var i = [];
    var v = a({
      v: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(sn(r));
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
        y(i, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = jr(t);
          u(r);
        };
        var e = cn(t, a), v = e[0], o = e[1];
        y(i, v);
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
  var hn = "[" + sa + "]";
  var pn = "[" + ba + "]";
  var gn = [ "tabindex" ];
  var _n = [ "wrap", "cols", "rows" ];
  var mn = [ "id", "class", "style", "open" ];
  var bn = function createStructureSetupObservers(r, e, n) {
    var t;
    var i;
    var v;
    var o = r.$, u = r.J, f = r.ar, s = r.ur, p = r.sr, g = r.hr, m = r.pr;
    var b = Ae(), w = b.F;
    var O = a({
      o: yr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = g(ya, pa);
      var a = g(wa, "");
      var e = a && I(u);
      var n = a && D(u);
      m(ya, pa);
      m(wa, "");
      m("", ma, true);
      var t = Ur(f);
      var i = Ur(u);
      var v = qr(u);
      m(ya, pa, r);
      m(wa, "", a);
      m("", ma);
      I(u, e);
      D(u, n);
      return {
        w: i.w + t.w + v.w,
        h: i.h + t.h + v.h
      };
    })), C = O[0];
    var x = s ? _n : mn.concat(_n);
    var E = zr(n, {
      p: function _timeout() {
        return t;
      },
      g: function _maxDelay() {
        return i;
      },
      _: function _mergeParams(r, a) {
        var e = r[0];
        var n = a[0];
        return [ T(e).concat(T(n)).reduce((function(r, a) {
          r[a] = e[a] || n[a];
          return r;
        }), {}) ];
      }
    });
    var P = function updateViewportAttrsFromHost(r) {
      each(r || gn, (function(r) {
        if (S(gn, r) > -1) {
          var a = H(o, r);
          if (c(a)) {
            H(u, r, a);
          } else {
            L(u, r);
          }
        }
      }));
    };
    var A = function onTrinsicChanged(r, a) {
      var t = r[0], i = r[1];
      var v = {
        _r: i
      };
      e({
        gr: t
      });
      !a && n(v);
      return v;
    };
    var M = function onSizeChanged(r) {
      var a = r.mr, t = r.Ur, i = r.Rr;
      var v = !a || i ? n : E;
      var o = false;
      if (t) {
        var u = t[0], f = t[1];
        o = f;
        e({
          wr: u
        });
      }
      v({
        mr: a,
        Rr: i,
        Sr: o
      });
    };
    var R = function onContentMutation(r, a) {
      var e = C(), t = e[1];
      var i = {
        br: t
      };
      var v = r ? n : E;
      if (t) {
        !a && v(i);
      }
      return i;
    };
    var k = function onHostMutation(r, a, e) {
      var n = {
        Tr: a
      };
      if (a) {
        !e && E(n);
      } else if (!p) {
        P(r);
      }
      return n;
    };
    var V = f || !w ? dn(o, A) : [ Er, Er, Er ], B = V[0], j = V[1], F = V[2];
    var U = !p ? cn(o, M, {
      Rr: true,
      Fr: true
    }) : [ Er, Er ], Y = U[0], W = U[1];
    var G = fn(o, false, k, {
      Dr: mn,
      Ir: mn.concat(gn)
    }), X = G[0], Z = G[1];
    var K;
    var $ = p && ur && new ur((function(r) {
      var a = r[r.length - 1].contentRect;
      var e = Yr(a);
      var n = Yr(K);
      var t = !n && e;
      M({
        mr: true,
        Rr: t
      });
      K = a;
    }));
    return [ function() {
      B();
      Y();
      v && v[0]();
      $ && $.disconnect();
      X();
    }, function() {
      $ && $.observe(o);
      P();
      W();
      j();
    }, function() {
      var r = {};
      var a = Z();
      var e = F();
      var n = v && v[1]();
      if (a) {
        z(r, k.apply(0, y(a, true)));
      }
      if (e) {
        z(r, A.apply(0, y(e, true)));
      }
      if (n) {
        z(r, R.apply(0, y(n, true)));
      }
      return r;
    }, function(r) {
      var a = r("update.ignoreMutation"), e = a[0];
      var n = r("update.attributes"), o = n[0], c = n[1];
      var s = r("update.elementEvents"), g = s[0], m = s[1];
      var b = r("update.debounce"), w = b[0], S = b[1];
      var y = m || c;
      var O = function ignoreMutationFromOptions(r) {
        return d(e) && e(r);
      };
      if (y) {
        if (v) {
          v[1]();
          v[0]();
        }
        v = fn(f || u, true, R, {
          Ir: x.concat(o || []),
          kr: g,
          Vr: hn,
          jr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !p ? N(e, hn, pn) : false;
            return t || !!q(e, "." + Ia) || !!O(r);
          }
        });
      }
      if (S) {
        E.m();
        if (h(w)) {
          var C = w[0];
          var T = w[1];
          t = l(C) && C;
          i = l(T) && T;
        } else if (l(w)) {
          t = w;
          i = false;
        } else {
          t = false;
          i = false;
        }
      }
    } ];
  };
  var wn = {
    x: 0,
    y: 0
  };
  var Sn = function createInitialStructureSetupUpdateState(r) {
    return {
      rr: {
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
      zr: wn,
      Pr: wn,
      Er: {
        x: "hidden",
        y: "hidden"
      },
      Ar: {
        x: false,
        y: false
      },
      gr: false,
      wr: Rr(r.$)
    };
  };
  var yn = function createStructureSetup(r, a) {
    var e = je(a, {});
    var n = ea(), t = n[0], i = n[1], v = n[2];
    var o = Ye(r), u = o[0], f = o[1], l = o[2];
    var c = Fe(Sn(u));
    var s = c[0], d = c[1];
    var h = vn(u, c);
    var p = function triggerUpdateEvent(r, a, e) {
      var n = T(r).some((function(a) {
        return !!r[a];
      }));
      var t = n || !P(a) || e;
      if (t) {
        v("u", [ r, a, e ]);
      }
      return t;
    };
    var g = bn(u, d, (function(r) {
      return p(h(e, r), {}, false);
    })), m = g[0], b = g[1], w = g[2], S = g[3];
    var y = s.bind(0);
    y.qr = function(r) {
      return t("u", r);
    };
    y.Nr = function() {
      var r = u.K, a = u.J, e = u.vr, n = u.lr;
      var t = n ? e.documentElement : r;
      var i = I(t);
      var v = D(t);
      b();
      f();
      I(a, i);
      D(a, v);
    };
    y.Yr = u;
    return [ function(r, e) {
      var n = je(a, r, e);
      S(n);
      return p(h(n, w(), e), r, !!e);
    }, y, function() {
      i();
      m();
      l();
    } ];
  };
  var On = Math.round;
  var Cn = function getScale(r) {
    var a = Nr(r), e = a.width, n = a.height;
    var t = jr(r), i = t.w, v = t.h;
    return {
      x: On(e) / i || 1,
      y: On(n) / v || 1
    };
  };
  var xn = function continuePointerDown(r, a, e) {
    var n = a.scrollbars;
    var t = r.button, i = r.isPrimary, v = r.pointerType;
    var o = n.pointers;
    return 0 === t && i && n[e ? "dragScroll" : "clickScroll"] && (o || []).includes(v);
  };
  var En = "pointerup pointerleave pointercancel lostpointercapture";
  var Tn = function getScrollTimelineAnimation(r) {
    var a;
    return a = {
      transform: [ Dr("0%", r), Dr("-100%", r) ]
    }, a[r ? "left" : "top"] = [ "0%", "100%" ], a;
  };
  var zn = function createRootClickStopPropagationEvents(r, a) {
    return Kr(r, "mousedown", Kr.bind(0, a, "click", $r, {
      C: true,
      O: true
    }), {
      O: true
    });
  };
  var Pn = function createInteractiveScrollEvents(r, a, e, n, t, i, v) {
    var o = Ae(), u = o.j;
    var f = n.Wr, l = n.Gr, c = n.Xr;
    var s = "scroll" + (v ? "Left" : "Top");
    var d = "client" + (v ? "X" : "Y");
    var h = v ? "width" : "height";
    var p = v ? "left" : "top";
    var g = v ? "w" : "h";
    var m = v ? "x" : "y";
    var b = function createRelativeHandleMove(r, a) {
      return function(e) {
        var n = i(), o = n.Pr;
        var d = jr(l)[g] - jr(f)[g];
        var h = a * e / d;
        var p = h * o[m];
        var b = Rr(c);
        var w = b && v ? u.n || u.i ? 1 : -1 : 1;
        t[s] = r + p * w;
      };
    };
    return Kr(l, "pointerdown", (function(n) {
      var i = q(n.target, "." + ja) === f;
      var v = i ? f : l;
      M(a, sa, _a, true);
      if (xn(n, r, i)) {
        var o = !i && n.shiftKey;
        var u = function getHandleRect() {
          return Nr(f);
        };
        var c = function getTrackRect() {
          return Nr(l);
        };
        var g = function getHandleOffset(r, a) {
          return (r || u())[p] - (a || c())[p];
        };
        var w = b(t[s] || 0, 1 / Cn(t)[m]);
        var S = n[d];
        var O = u();
        var C = c();
        var E = O[h];
        var T = g(O, C) + E / 2;
        var z = S - C[p];
        var P = i ? 0 : z - T;
        var A = function releasePointerCapture(r) {
          x(H);
          v.releasePointerCapture(r.pointerId);
        };
        var H = [ M.bind(0, a, sa, _a), Kr(e, En, A), Kr(e, "selectstart", (function(r) {
          return Jr(r);
        }), {
          S: false
        }), Kr(l, En, A), Kr(l, "pointermove", (function(r) {
          var a = r[d] - S;
          if (i || o) {
            w(P + a);
          }
        })) ];
        if (o) {
          w(P);
        } else if (!i) {
          var L = Ja()[ye];
          if (L) {
            y(H, L.T(w, g, P, E, z));
          }
        }
        v.setPointerCapture(n.pointerId);
      }
    }));
  };
  var An = function createScrollTimelineEvents(r, a, e) {
    var n = r.Wr;
    if (!a) {
      return Er;
    }
    var t = n.animate(Tn(e), {
      timeline: a
    });
    return function() {
      t.cancel();
    };
  };
  var Hn = function createScrollbarsSetupEvents(r, a) {
    return function(e, n, t, i, v, o, u) {
      var f = e.Xr;
      var l = Tr(333), c = l[0], s = l[1];
      var d = !!v.scrollBy;
      var h = true;
      return x.bind(0, [ Kr(f, "pointerenter", (function() {
        n(Na, true);
      })), Kr(f, "pointerleave pointercancel", (function() {
        n(Na);
      })), Kr(f, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (d && h && 0 === t && U(f) === i) {
          v.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        h = false;
        n(Xa, true);
        c((function() {
          h = true;
          n(Xa);
        }));
        Jr(r);
      }), {
        S: false,
        O: true
      }), zn(f, t), Pn(r, i, t, e, v, a, u), An(e, o, u), s ]);
    };
  };
  var Ln = Math.min, Mn = Math.max, Rn = Math.abs, In = Math.round;
  var Dn = function getScrollbarHandleLengthRatio(r, a, e, n) {
    if (n) {
      var t = e ? "x" : "y";
      var i = n.Pr, v = n.zr;
      var o = v[t];
      var u = i[t];
      return Mn(0, Ln(1, o / (o + u)));
    }
    var f = e ? "width" : "height";
    var l = Nr(r)[f];
    var c = Nr(a)[f];
    return Mn(0, Ln(1, l / c));
  };
  var kn = function getScrollbarHandleOffsetRatio(r, a, e, n, t, i) {
    var v = Ae(), o = v.j;
    var u = i ? "x" : "y";
    var f = i ? "Left" : "Top";
    var l = n.Pr;
    var c = In(l[u]);
    var s = Rn(e["scroll" + f]);
    var d = i && t;
    var h = o.i ? s : c - s;
    var p = d ? h : s;
    var g = Ln(1, p / c);
    var m = Dn(r, a, i);
    return 1 / m * (1 - m) * g;
  };
  var Vn = function maxAnimationKeyFrameValue(r) {
    return Math.max(0, r - .5) + "px";
  };
  var Bn = function animateScrollbar(r, a, e, n) {
    return r.animate({
      transform: [ Dr("0px", n), Dr(Vn(e), n) ]
    }, {
      timeline: a,
      composite: "add"
    });
  };
  var jn = function initScrollTimeline(r, a) {
    return cr ? new cr({
      source: r,
      axis: a
    }) : null;
  };
  var Fn = function createScrollbarsSetupElements(r, a, e) {
    var n = Ae(), t = n.N, i = n.L;
    var v = t(), o = v.scrollbars;
    var u = o.slot;
    var f = a.vr, l = a.K, c = a.$, d = a.J, h = a.cr, p = a.nr, g = a.lr, m = a.sr;
    var b = h ? {} : r, w = b.scrollbars;
    var S = w || {}, O = S.slot;
    var E = new Map;
    var T = jn(p, "x");
    var z = jn(p, "y");
    var P = Me([ l, c, d ], (function() {
      return m && g ? l : c;
    }), u, O);
    var A = function doRefreshScrollbarOffset(r) {
      return m && !g && U(r) === d;
    };
    var H = function cancelScrollbarsOffsetAnimations() {
      E.forEach((function(r) {
        (r || []).forEach((function(r) {
          r.cancel();
        }));
      }));
    };
    var L = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? _r : gr;
      each(r, (function(r) {
        n(r.Xr, a);
      }));
    };
    var M = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        style(n, t);
      }));
    };
    var R = function scrollbarStructureRefreshHandleLength(r, a, e) {
      M(r, (function(r) {
        var n;
        var t = r.Wr, i = r.Gr;
        return [ t, (n = {}, n[e ? "width" : "height"] = (100 * Dn(t, i, e, a)).toFixed(3) + "%", 
        n) ];
      }));
    };
    var k = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      if (!z && !z) {
        M(r, (function(r) {
          var n = r.Wr, t = r.Gr, i = r.Xr;
          var v = kn(n, t, p, a, Rr(i), e);
          var o = v === v;
          return [ n, {
            transform: o ? Dr((100 * v).toFixed(3) + "%", e) : ""
          } ];
        }));
      }
    };
    var V = function styleScrollbarPosition(r) {
      var a = r.Xr;
      var e = A(a) && a;
      return [ e, {
        transform: e ? Dr([ I(p) + "px", D(p) + "px" ]) : ""
      } ];
    };
    var B = [];
    var j = [];
    var F = [];
    var q = function scrollbarsAddRemoveClass(r, a, e) {
      var n = s(e);
      var t = n ? e : true;
      var i = n ? !e : true;
      t && L(j, r, a);
      i && L(F, r, a);
    };
    var N = function refreshScrollbarsHandleLength(r) {
      R(j, r, true);
      R(F, r);
    };
    var Y = function refreshScrollbarsHandleOffset(r) {
      k(j, r, true);
      k(F, r);
    };
    var G = function refreshScrollbarsScrollbarOffset() {
      if (!z && !z) {
        m && M(j, V);
        m && M(F, V);
      }
    };
    var X = function refreshScrollbarsScrollbarOffsetTimeline(r) {
      var a = r.Pr;
      H();
      F.concat(j).forEach((function(r) {
        var e = r.Xr;
        if (A(e)) {
          E.set(e, [ Bn(e, T, a.x, true), Bn(e, z, a.y) ]);
        }
      }));
    };
    var $ = function generateScrollbarDOM(r) {
      var a = r ? ka : Va;
      var n = r ? j : F;
      var t = C(n) ? qa : "";
      var v = K(Ia + " " + a + " " + t);
      var o = K(Ba);
      var u = K(ja);
      var l = {
        Xr: v,
        Gr: o,
        Wr: u
      };
      if (!i) {
        _r(v, Ma);
      }
      W(v, o);
      W(o, u);
      y(n, l);
      y(B, [ function() {
        H();
        E.clear();
      }, Z.bind(0, v), e(l, q, f, c, p, r ? T : z, r) ]);
      return l;
    };
    var J = $.bind(0, true);
    var Q = $.bind(0, false);
    var rr = function appendElements() {
      W(P, j[0].Xr);
      W(P, F[0].Xr);
      sr((function() {
        q(qa);
      }), 300);
    };
    J();
    Q();
    return [ {
      Zr: N,
      Kr: Y,
      $r: X,
      Jr: G,
      Qr: q,
      ra: {
        B: T,
        aa: j,
        ea: J,
        na: M.bind(0, j)
      },
      ta: {
        B: z,
        aa: F,
        ea: Q,
        na: M.bind(0, F)
      }
    }, rr, x.bind(0, B) ];
  };
  var Un = function createScrollbarsSetup(r, a, e, n) {
    var t;
    var i;
    var v;
    var o;
    var u;
    var f = 0;
    var l = Fe({});
    var c = l[0];
    var s = Tr(), d = s[0], h = s[1];
    var p = Tr(), g = p[0], m = p[1];
    var b = Tr(100), w = b[0], S = b[1];
    var y = Tr(100), O = y[0], C = y[1];
    var E = Tr(100), T = E[0], z = E[1];
    var P = Tr((function() {
      return f;
    })), A = P[0], H = P[1];
    var L = Fn(r, e.Yr, Hn(a, e)), M = L[0], R = L[1], I = L[2];
    var D = e.Yr, k = D.$, V = D.tr, B = D.lr;
    var j = M.Qr, F = M.Zr, U = M.Kr, q = M.$r, N = M.Jr;
    var Y = function manageAutoHideSuspension(r) {
      j(Wa, r, true);
      j(Wa, r, false);
    };
    var W = function manageScrollbarsAutoHide(r, a) {
      H();
      if (r) {
        j(Ga);
      } else {
        var e = function hide() {
          return j(Ga, true);
        };
        if (f > 0 && !a) {
          A(e);
        } else {
          e();
        }
      }
    };
    var G = function onHostMouseEnter() {
      o = i;
      o && W(true);
    };
    var X = [ S, H, C, z, m, h, I, Kr(k, "pointerover", G, {
      C: true
    }), Kr(k, "pointerenter", G), Kr(k, "pointerleave", (function() {
      o = false;
      i && W(false);
    })), Kr(k, "pointermove", (function() {
      t && d((function() {
        S();
        W(true);
        O((function() {
          t && W(false);
        }));
      }));
    })), Kr(V, "scroll", (function(r) {
      g((function() {
        U(e());
        v && W(true);
        w((function() {
          v && !o && W(false);
        }));
      }));
      n(r);
      N();
    })) ];
    var Z = c.bind(0);
    Z.Yr = M;
    Z.Nr = R;
    return [ function(r, n, o) {
      var l = o.Lr, c = o.Mr, s = o.Hr, d = o.Sr, h = o.Rr;
      var p = Ae(), g = p.H;
      var m = je(a, r, n);
      var b = e();
      var w = b.Pr, S = b.Er, y = b.wr, O = b.Ar;
      var C = m("showNativeOverlaidScrollbars"), x = C[0], E = C[1];
      var z = m("scrollbars.theme"), P = z[0], A = z[1];
      var H = m("scrollbars.visibility"), L = H[0], M = H[1];
      var R = m("scrollbars.autoHide"), I = R[0], D = R[1];
      var k = m("scrollbars.autoHideSuspend"), G = k[0], Z = k[1];
      var K = m("scrollbars.autoHideDelay"), $ = K[0];
      var J = m("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var ar = m("scrollbars.clickScroll"), er = ar[0], nr = ar[1];
      var tr = h && !n;
      var ir = l || c || d;
      var vr = s || M;
      var or = x && g.x && g.y;
      var ur = function setScrollbarVisibility(r, a) {
        var e = "visible" === L || "auto" === L && "scroll" === r;
        j(Fa, e, a);
        return e;
      };
      f = $;
      if (E) {
        j(Ra, or);
      }
      if (A) {
        j(u);
        j(P, true);
        u = P;
      }
      if (Z || tr) {
        if (G && tr && (O.x || O.y)) {
          Y(false);
          T((function() {
            return X.push(Kr(V, "scroll", Y.bind(0, true), {
              C: true
            }));
          }));
        } else {
          Y(true);
        }
      }
      if (D) {
        t = "move" === I;
        i = "leave" === I;
        v = "never" !== I;
        W(!v, true);
      }
      if (rr) {
        j(Ka, Q);
      }
      if (nr) {
        j(Za, er);
      }
      if (vr) {
        var fr = ur(S.x, true);
        var lr = ur(S.y, false);
        var cr = fr && lr;
        j(Ua, !cr);
      }
      if (ir) {
        F(b);
        U(b);
        q(b);
        N();
        j(Ya, !w.x, true);
        j(Ya, !w.y, false);
        j(Da, y && !B);
      }
    }, Z, x.bind(0, X) ];
  };
  var qn = function invokePluginInstance(r, a, e) {
    if (d(r)) {
      r(a || void 0, e || void 0);
    }
  };
  var Nn = function OverlayScrollbars(r, a, e) {
    var n = Ae(), t = n.W, i = n.N, v = n.U, o = n.q;
    var u = Ja();
    var f = b(r);
    var l = f ? r : r.target;
    var c = Ve(l);
    if (a && !c) {
      var s = false;
      var d = function validateOptions(r) {
        var a = Ja()[le];
        var e = a && a.T;
        return e ? e(r, true) : r;
      };
      var h = z({}, t(), d(a));
      var p = ea(e), g = p[0], m = p[1], w = p[2];
      var S = yn(r, h), y = S[0], O = S[1], C = S[2];
      var x = Un(r, h, O, (function(r) {
        return w("scroll", [ k, r ]);
      })), E = x[0], A = x[1], H = x[2];
      var L = function update(r, a) {
        return y(r, !!a);
      };
      var M = L.bind(0, {}, true);
      var R = v(M);
      var I = o(M);
      var D = function destroy(r) {
        ke(l);
        R();
        I();
        H();
        C();
        s = true;
        w("destroyed", [ k, !!r ]);
        m();
      };
      var k = {
        options: function options(r, a) {
          if (r) {
            var e = a ? t() : {};
            var n = ia(h, z(e, d(r)));
            if (!P(n)) {
              z(h, n);
              L(n);
            }
          }
          return z({}, h);
        },
        on: g,
        off: function off(r, a) {
          r && a && m(r, a);
        },
        state: function state() {
          var r = O(), a = r.zr, e = r.Pr, n = r.Er, t = r.Ar, i = r.rr, v = r.yr, o = r.wr;
          return z({}, {
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
          var r = O.Yr, a = r.K, e = r.$, n = r.rr, t = r.J, i = r.ar, v = r.nr, o = r.tr;
          var u = A.Yr, f = u.ra, l = u.ta;
          var c = function translateScrollbarStructure(r) {
            var a = r.Wr, e = r.Gr, n = r.Xr;
            return {
              scrollbar: n,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.aa, e = r.ea;
            var n = c(a[0]);
            return z({}, n, {
              clone: function clone() {
                var r = c(e());
                E({}, true, {});
                return r;
              }
            });
          };
          return z({}, {
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
          return L({}, r);
        },
        destroy: D.bind(0)
      };
      O.qr((function(r, a, e) {
        E(a, e, r);
      }));
      De(l, k);
      each(T(u), (function(r) {
        return qn(u[r], 0, k);
      }));
      if (Re(O.Yr.lr, i().cancel, !f && r.cancel)) {
        D(true);
        return k;
      }
      O.Nr();
      A.Nr();
      w("initialized", [ k ]);
      O.qr((function(r, a, e) {
        var n = r.mr, t = r.Sr, i = r._r, v = r.Lr, o = r.Mr, u = r.Hr, f = r.br, l = r.Tr;
        w("updated", [ k, {
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
  Nn.plugin = function(r) {
    each(Qa(r), (function(r) {
      return qn(r, Nn);
    }));
  };
  Nn.valid = function(r) {
    var a = r && r.elements;
    var e = d(a) && a();
    return m(e) && !!Ve(e.target);
  };
  Nn.env = function() {
    var r = Ae(), a = r.V, e = r.H, n = r.A, t = r.j, i = r.F, v = r.L, o = r.B, u = r.X, f = r.Z, l = r.N, c = r.Y, s = r.W, d = r.G;
    return z({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: n,
      rtlScrollBehavior: t,
      flexboxGlue: i,
      cssCustomProperties: v,
      scrollTimeline: o,
      staticDefaultInitialization: u,
      staticDefaultOptions: f,
      getDefaultInitialization: l,
      setDefaultInitialization: c,
      getDefaultOptions: s,
      setDefaultOptions: d
    });
  };
  r.ClickScrollPlugin = Oe;
  r.OverlayScrollbars = Nn;
  r.ScrollbarsHidingPlugin = Se;
  r.SizeObserverPlugin = he;
  Object.defineProperty(r, "ia", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
