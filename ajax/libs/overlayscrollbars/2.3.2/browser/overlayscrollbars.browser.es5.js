/*!
 * OverlayScrollbars
 * Version: 2.3.2
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
  function style(r, a) {
    var e = c(a);
    var n = h(a) || e;
    if (n) {
      var t = e ? "" : {};
      if (r) {
        var i = window.getComputedStyle(r, null);
        t = e ? Rr(r, i, a) : a.reduce((function(a, e) {
          a[e] = Rr(r, i, e);
          return a;
        }), t);
      }
      return t;
    }
    r && each(T(a), (function(e) {
      return Mr(r, e, a[e]);
    }));
  }
  function getDefaultExportFromCjs(r) {
    return r && r.v && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var a = function createCache(r, a) {
    var e = r.o, n = r.u, t = r.p;
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
    return typeof window !== "undefined";
  };
  var n = e() && Node.ELEMENT_NODE;
  var t = Object.prototype, i = t.toString, v = t.hasOwnProperty;
  var o = function isUndefined(r) {
    return r === void 0;
  };
  var u = function isNull(r) {
    return r === null;
  };
  var f = function type(r) {
    return o(r) || u(r) ? "" + r : i.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  };
  var l = function isNumber(r) {
    return typeof r === "number";
  };
  var c = function isString(r) {
    return typeof r === "string";
  };
  var s = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var d = function isFunction(r) {
    return typeof r === "function";
  };
  var h = function isArray(r) {
    return Array.isArray(r);
  };
  var p = function isObject(r) {
    return typeof r === "object" && !h(r) && !u(r);
  };
  var g = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = l(a) && a > -1 && a % 1 == 0;
    return h(r) || !d(r) && e ? a > 0 && p(r) ? a - 1 in r : true : false;
  };
  var m = function isPlainObject(r) {
    if (!r || !p(r) || f(r) !== "object") {
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
    return !!r && r.length === 0;
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
    if ((typeof r !== "object" || u(r)) && !d(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(T(a), (function(e) {
        var n = a[e];
        if (r === n) {
          return true;
        }
        var t = h(n);
        if (n && m(n)) {
          var i = r[e];
          var v = i;
          if (t && !h(i)) {
            v = [];
          } else if (!t && !m(i)) {
            v = {};
          }
          r[e] = assignDeep(v, n);
        } else {
          r[e] = t ? n.slice() : n;
        }
      }));
    }));
    return r;
  };
  var H = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var P = function getSetProp(r, a, e, n) {
    if (o(n)) {
      return e ? e[r] : a;
    }
    e && (c(n) || l(n)) && (e[r] = n);
  };
  var A = function attr(r, a, e) {
    if (o(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var L = function getValueSet(r, a) {
    return new Set((A(r, a) || "").split(" "));
  };
  var R = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var M = function attrClass(r, a, e, n) {
    if (e) {
      var t = L(r, a);
      t[n ? "add" : "delete"](e);
      var i = O(t).join(" ").trim();
      A(r, a, i);
    }
  };
  var I = function hasAttrClass(r, a, e) {
    return L(r, a).has(e);
  };
  var D = function scrollLeft(r, a) {
    return P("scrollLeft", 0, r, a);
  };
  var k = function scrollTop(r, a) {
    return P("scrollTop", 0, r, a);
  };
  var V = e() && Element.prototype;
  var j = function find(r, a) {
    var e = [];
    var n = a ? w(a) && a : document;
    return n ? y(e, n.querySelectorAll(r)) : e;
  };
  var B = function findFirst(r, a) {
    var e = a ? w(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var F = function is(r, a) {
    if (w(r)) {
      var e = V.matches || V.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var U = function contents(r) {
    return r ? O(r.childNodes) : [];
  };
  var q = function parent(r) {
    return r && r.parentElement;
  };
  var N = function closest(r, a) {
    if (w(r)) {
      var e = V.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (F(r, a)) {
          return r;
        }
        r = q(r);
      } while (r);
    }
  };
  var Y = function liesBetween(r, a, e) {
    var n = N(r, a);
    var t = r && B(e, n);
    var i = N(t, a) === n;
    return n && t ? n === r || t === r || i && N(N(r, e), a) !== n : false;
  };
  var W = function before(r, a, e) {
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
  var G = function appendChildren(r, a) {
    W(r, null, a);
  };
  var X = function insertBefore(r, a) {
    W(q(r), r, a);
  };
  var Z = function insertAfter(r, a) {
    W(q(r), r && r.nextSibling, a);
  };
  var K = function removeElements(r) {
    if (g(r)) {
      each(O(r), (function(r) {
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
      A(a, "class", r);
    }
    return a;
  };
  var J = function createDOM(r) {
    var a = $();
    a.innerHTML = r.trim();
    return each(U(a), (function(r) {
      return K(r);
    }));
  };
  var Q = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var rr = function getDummyStyle() {
    return $().style;
  };
  var ar = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var er = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var nr = {};
  var tr = {};
  var ir = function cssProperty(r) {
    var a = tr[r];
    if (E(tr, r)) {
      return a;
    }
    var e = Q(r);
    var n = rr();
    each(ar, (function(t) {
      var i = t.replace(/-/g, "");
      var v = [ r, t + r, i + e, Q(i) + e ];
      return !(a = v.find((function(r) {
        return n[r] !== void 0;
      })));
    }));
    return tr[r] = a || "";
  };
  var vr = function jsAPI(r) {
    if (e()) {
      var a = nr[r] || window[r];
      if (E(nr, r)) {
        return a;
      }
      each(er, (function(e) {
        a = a || window[e + Q(r)];
        return !a;
      }));
      nr[r] = a;
      return a;
    }
  };
  var or = vr("MutationObserver");
  var ur = vr("IntersectionObserver");
  var fr = vr("ResizeObserver");
  var lr = vr("cancelAnimationFrame");
  var cr = vr("requestAnimationFrame");
  var sr = vr("ScrollTimeline");
  var dr = e() && window.setTimeout;
  var hr = e() && window.clearTimeout;
  var pr = /[^\x20\t\r\n\f]+/g;
  var gr = function classListAction(r, a, e) {
    var n = r && r.classList;
    var t;
    var i = 0;
    var v = false;
    if (n && a && c(a)) {
      var o = a.match(pr) || [];
      v = o.length > 0;
      while (t = o[i++]) {
        v = !!e(n, t) && v;
      }
    }
    return v;
  };
  var _r = function removeClass(r, a) {
    gr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var mr = function addClass(r, a) {
    gr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return _r.bind(0, r, a);
  };
  var br = Math.max;
  var wr = function animationCurrentTime() {
    return performance.now();
  };
  var Sr = function animateNumber(r, a, e, n, t) {
    var i = 0;
    var v = wr();
    var o = br(0, e);
    var u = function frame(e) {
      var u = wr();
      var f = u - v;
      var l = f >= o;
      var c = e ? 1 : 1 - (br(0, v + o - u) / o || 0);
      var s = (a - r) * (d(t) ? t(c, c * o, 0, 1, o) : c) + r;
      var h = l || c === 1;
      n && n(s, c, h);
      i = h ? 0 : cr((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      lr(i);
      r && u(r);
    };
  };
  var yr = function equal(r, a, e, n) {
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
  var Or = function equalWH(r, a) {
    return yr(r, a, [ "w", "h" ]);
  };
  var Cr = function equalXY(r, a) {
    return yr(r, a, [ "x", "y" ]);
  };
  var xr = function equalTRBL(r, a) {
    return yr(r, a, [ "t", "r", "b", "l" ]);
  };
  var Er = function equalBCRWH(r, a, e) {
    return yr(r, a, [ "width", "height" ], e && function(r) {
      return Math.round(r);
    });
  };
  var Tr = function noop() {};
  var zr = function selfClearTimeout(r) {
    var a;
    var e = r ? dr : cr;
    var n = r ? hr : lr;
    return [ function(t) {
      n(a);
      a = e(t, d(r) ? r() : r);
    }, function() {
      return n(a);
    } ];
  };
  var Hr = function debounce(r, a) {
    var e;
    var n;
    var t;
    var i = Tr;
    var v = a || {}, o = v.g, u = v._, f = v.m;
    var c = function invokeFunctionToDebounce(a) {
      i();
      hr(e);
      e = n = void 0;
      i = Tr;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return f && n ? f(n, r) : r;
    };
    var h = function flush() {
      if (i !== Tr) {
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
        var g = a > 0 ? dr : cr;
        var m = a > 0 ? hr : lr;
        var b = s(r);
        var w = b || r;
        var S = c.bind(0, w);
        i();
        var y = g(S, a);
        i = function clear() {
          return m(y);
        };
        if (p && !e) {
          e = dr(h, f);
        }
        n = t = w;
      } else {
        c(r);
      }
    };
    p.S = h;
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
  var Lr = function adaptCSSVal(r, a) {
    return !Pr[r] && l(a) ? a + "px" : a;
  };
  var Rr = function getCSSVal(r, a, e) {
    return String((a != null ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
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
  var Ir = function directionIsRTL(r) {
    return style(r, "direction") === "rtl";
  };
  var Dr = function topRightBottomLeft(r, a, e) {
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
  var kr = function getTrasformTranslateValue(r, a) {
    return "translate" + (h(r) ? "(" + r[0] + "," + r[1] + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Vr = Math.round;
  var jr = {
    w: 0,
    h: 0
  };
  var Br = function windowSize() {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  };
  var Fr = function offsetSize(r) {
    return r ? {
      w: r.offsetWidth,
      h: r.offsetHeight
    } : jr;
  };
  var Ur = function clientSize(r) {
    return r ? {
      w: r.clientWidth,
      h: r.clientHeight
    } : jr;
  };
  var qr = function scrollSize(r) {
    return r ? {
      w: r.scrollWidth,
      h: r.scrollHeight
    } : jr;
  };
  var Nr = function fractionalSize(r) {
    var a = parseFloat(style(r, "height")) || 0;
    var e = parseFloat(style(r, "width")) || 0;
    return {
      w: e - Vr(e),
      h: a - Vr(a)
    };
  };
  var Yr = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var Wr = function domRectHasDimensions(r) {
    return !!(r && (r.height || r.width));
  };
  var Gr;
  var Xr = function supportPassiveEvents() {
    if (o(Gr)) {
      Gr = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function get() {
            Gr = true;
          }
        }));
      } catch (r) {}
    }
    return Gr;
  };
  var Zr = function splitEventNames(r) {
    return r.split(" ");
  };
  var Kr = function off(r, a, e, n) {
    each(Zr(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var $r = function on(r, a, e, n) {
    var t;
    var i = Xr();
    var v = (t = i && n && n.O) != null ? t : i;
    var o = n && n.C || false;
    var u = n && n.T || false;
    var f = [];
    var l = i ? {
      passive: v,
      capture: o
    } : o;
    each(Zr(a), (function(a) {
      var n = u ? function(t) {
        r.removeEventListener(a, n, o);
        e && e(t);
      } : e;
      y(f, Kr.bind(null, r, a, n, o));
      r.addEventListener(a, n, l);
    }));
    return x.bind(0, f);
  };
  var Jr = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var Qr = function preventDefault(r) {
    return r.preventDefault();
  };
  var ra = {
    x: 0,
    y: 0
  };
  var aa = function absoluteCoordinates(r) {
    var a = r ? Yr(r) : 0;
    return a ? {
      x: a.left + window.pageYOffset,
      y: a.top + window.pageXOffset
    } : ra;
  };
  var ea = function manageListener(r, a) {
    each(h(a) ? a : [ a ], r);
  };
  var na = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        ea((function(r) {
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
        ea((function(r) {
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
  var ta = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (d(a)) {
        throw new Error;
      }
      return a;
    }));
  };
  var ia = {
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
  var va = function getOptionsDiff(r, a) {
    var e = {};
    var n = T(a).concat(T(r));
    each(n, (function(n) {
      var t = r[n];
      var i = a[n];
      if (p(t) && p(i)) {
        z(e[n] = {}, getOptionsDiff(t, i));
        if (H(e[n])) {
          delete e[n];
        }
      } else if (E(a, n) && i !== t) {
        var v = true;
        if (h(t) || h(i)) {
          try {
            if (ta(t) === ta(i)) {
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
  var oa = "data-overlayscrollbars";
  var ua = "os-environment";
  var fa = ua + "-flexbox-glue";
  var la = fa + "-max";
  var ca = "os-scrollbar-hidden";
  var sa = oa + "-initialize";
  var da = oa;
  var ha = da + "-overflow-x";
  var pa = da + "-overflow-y";
  var ga = "overflowVisible";
  var _a = "scrollbarHidden";
  var ma = "scrollbarPressed";
  var ba = "updating";
  var wa = oa + "-viewport";
  var Sa = "arrange";
  var ya = "scrollbarHidden";
  var Oa = ga;
  var Ca = oa + "-padding";
  var xa = Oa;
  var Ea = oa + "-content";
  var Ta = "os-size-observer";
  var za = Ta + "-appear";
  var Ha = Ta + "-listener";
  var Pa = Ha + "-scroll";
  var Aa = Ha + "-item";
  var La = Aa + "-final";
  var Ra = "os-trinsic-observer";
  var Ma = "os-no-css-vars";
  var Ia = "os-theme-none";
  var Da = "os-scrollbar";
  var ka = Da + "-rtl";
  var Va = Da + "-horizontal";
  var ja = Da + "-vertical";
  var Ba = Da + "-track";
  var Fa = Da + "-handle";
  var Ua = Da + "-visible";
  var qa = Da + "-cornerless";
  var Na = Da + "-transitionless";
  var Ya = Da + "-interaction";
  var Wa = Da + "-unusable";
  var Ga = Da + "-auto-hide";
  var Xa = Ga + "-hidden";
  var Za = Da + "-wheel";
  var Ka = Ba + "-interactive";
  var $a = Fa + "-interactive";
  var Ja = {};
  var Qa = function getPlugins() {
    return Ja;
  };
  var re = function addPlugin(r) {
    var a = [];
    each(h(r) ? r : [ r ], (function(r) {
      var e = T(r);
      each(e, (function(e) {
        y(a, Ja[e] = r[e]);
      }));
    }));
    return a;
  };
  var ae = {};
  var ee = {
    get exports() {
      return ae;
    },
    set exports(r) {
      ae = r;
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
      }, r.exports.v = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.v = true, r.exports["default"] = r.exports;
  })(ee);
  var ne = /*@__PURE__*/ getDefaultExportFromCjs(ae);
  var te = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var ie = function validateRecursive(r, a, e, n) {
    var t = {};
    var i = ne({}, a);
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
          if (H(r[v])) {
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
          each(te, (function(e, n) {
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
            w = te[C] === r;
          }
          y(O, e ? te.string : a);
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
  var ve = function validateOptions(r, a, e) {
    return ie(r, a, e);
  };
  var oe = te.number;
  var ue = te.boolean;
  var fe = [ te.array, te.null ];
  var le = "hidden scroll visible visible-hidden";
  var ce = "visible hidden auto";
  var se = "never scroll leavemove";
  var de = {
    paddingAbsolute: ue,
    showNativeOverlaidScrollbars: ue,
    update: {
      elementEvents: fe,
      attributes: fe,
      debounce: [ te.number, te.array, te.null ],
      ignoreMutation: [ te.function, te.null ]
    },
    overflow: {
      x: le,
      y: le
    },
    scrollbars: {
      theme: [ te.string, te.null ],
      visibility: ce,
      autoHide: se,
      autoHideDelay: oe,
      autoHideSuspend: ue,
      dragScroll: ue,
      clickScroll: ue,
      pointers: [ te.array, te.null ]
    }
  };
  var he = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[he] = {
      H: function _(r, a) {
        var e = ve(de, r, a), n = e[0], t = e[1];
        return ne({}, t, n);
      }
    }, r;
  })();
  var pe = 3333333;
  var ge = "scroll";
  var _e = "__osSizeObserverPlugin";
  var me = /* @__PURE__ */ function(r) {
    return r = {}, r[_e] = {
      H: function _(r, a, e) {
        var n = J('<div class="' + Aa + '" dir="ltr"><div class="' + Aa + '"><div class="' + La + '"></div></div><div class="' + Aa + '"><div class="' + La + '" style="width: 200%; height: 200%"></div></div></div>');
        G(r, n);
        mr(r, Pa);
        var t = n[0];
        var i = t.lastChild;
        var v = t.firstChild;
        var o = v == null ? void 0 : v.firstChild;
        var u = Fr(t);
        var f = u;
        var l = false;
        var c;
        var s = function reset() {
          D(v, pe);
          k(v, pe);
          D(i, pe);
          k(i, pe);
        };
        var d = function onResized(r) {
          c = 0;
          if (l) {
            u = f;
            a(r === true);
          }
        };
        var h = function onScroll(r) {
          f = Fr(t);
          l = !r || !Or(f, u);
          if (r) {
            Jr(r);
            if (l && !c) {
              lr(c);
              c = cr(d);
            }
          } else {
            d(r === false);
          }
          s();
        };
        var p = y([], [ $r(v, ge, h), $r(i, ge, h) ]);
        style(o, {
          width: pe,
          height: pe
        });
        cr(s);
        return [ e ? h.bind(0, false) : s, p ];
      }
    }, r;
  }();
  var be = 0;
  var we = Math.round, Se = Math.abs;
  var ye = function getWindowDPR() {
    var r = window.screen.deviceXDPI || 0;
    var a = window.screen.logicalXDPI || 1;
    return window.devicePixelRatio || r / a;
  };
  var Oe = function diffBiggerThanOne(r, a) {
    var e = Se(r);
    var n = Se(a);
    return !(e === n || e + 1 === n || e - 1 === n);
  };
  var Ce = "__osScrollbarsHidingPlugin";
  var xe = /* @__PURE__ */ function(r) {
    return r = {}, r[Ce] = {
      P: function _createUniqueViewportArrangeElement(r) {
        var a = r.A, e = r.L, n = r.R;
        var t = !n && !a && (e.x || e.y);
        var i = t ? document.createElement("style") : false;
        if (i) {
          A(i, "id", wa + "-" + Sa + "-" + be);
          be++;
        }
        return i;
      },
      M: function _overflowUpdateSegment(r, a, e, n, t, i, v) {
        var o = function arrangeViewport(a, i, v, o) {
          if (r) {
            var u = t(), f = u.I;
            var l = a.D, c = a.k;
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
                    O.insertRule("#" + A(n, "id") + " + [" + wa + "~='" + Sa + "']::before {}", 0);
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
            var l = t(), c = l.I;
            var s = f.k;
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
            M(e, wa, Sa);
            if (!a) {
              p.height = "";
            }
            style(e, p);
            return [ function() {
              v(f, o, r, m);
              style(e, m);
              M(e, wa, Sa, true);
            }, f ];
          }
          return [ Tr ];
        };
        return [ o, u ];
      },
      V: function _envWindowZoom() {
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
          if (v.w === 0 && v.h === 0) {
            return;
          }
          var o = {
            w: Se(v.w),
            h: Se(v.h)
          };
          var u = {
            w: Se(we(i.w / (r.w / 100))),
            h: Se(we(i.h / (r.h / 100)))
          };
          var f = ye();
          var l = o.w > 2 && o.h > 2;
          var c = !Oe(u.w, u.h);
          var s = f !== a && f > 0;
          var d = l && c && s;
          if (d) {
            var h = n(), p = h[0], g = h[1];
            z(e.j, p);
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
  var Ee = "__osClickScrollPlugin";
  var Te = /* @__PURE__ */ function(r) {
    return r = {}, r[Ee] = {
      H: function _(r, a, e, n, t) {
        var i = 0;
        var v = Tr;
        var o = function animateClickScroll(o) {
          v = Sr(o, o + n * Math.sign(e), 133, (function(e, o, u) {
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
  var ze;
  var He = function getNativeScrollbarSize(r, a, e, n) {
    G(r, a);
    var t = Ur(a);
    var i = Fr(a);
    var v = Nr(e);
    n && K(a);
    return {
      x: i.h - t.h + v.h,
      y: i.w - t.w + v.w
    };
  };
  var Pe = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = mr(r, ca);
    try {
      a = style(r, ir("scrollbar-width")) === "none" || window.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (n) {}
    e();
    return a;
  };
  var Ae = function getRtlScrollBehavior(r, a) {
    var e = "hidden";
    style(r, {
      overflowX: e,
      overflowY: e,
      direction: "rtl"
    });
    D(r, 0);
    var n = aa(r);
    var t = aa(a);
    D(r, -999);
    var i = aa(a);
    return {
      i: n.x === t.x,
      n: t.x !== i.x
    };
  };
  var Le = function getFlexboxGlue(r, a) {
    var e = mr(r, fa);
    var n = Yr(r);
    var t = Yr(a);
    var i = Er(t, n, true);
    var v = mr(r, la);
    var o = Yr(r);
    var u = Yr(a);
    var f = Er(u, o, true);
    e();
    v();
    return i && f;
  };
  var Re = function createEnvironment() {
    var r = document, e = r.body;
    var n = J('<div class="' + ua + '"><div></div></div>');
    var t = n[0];
    var i = t.firstChild;
    var v = na(), o = v[0], u = v[2];
    var f = a({
      o: He(e, t, i),
      u: Cr
    }, He.bind(0, e, t, i, true)), l = f[0], c = f[1];
    var s = c(), d = s[0];
    var h = Pe(t);
    var p = {
      x: d.x === 0,
      y: d.y === 0
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
    var m = z({}, ia);
    var b = z.bind(0, {}, m);
    var w = z.bind(0, {}, g);
    var S = {
      j: d,
      L: p,
      A: h,
      R: style(t, "zIndex") === "-1",
      B: !!sr,
      F: Ae(t, i),
      U: Le(t, i),
      q: o.bind(0, "z"),
      N: o.bind(0, "r"),
      Y: w,
      W: function _setDefaultInitialization(r) {
        return z(g, r) && w();
      },
      G: b,
      X: function _setDefaultOptions(r) {
        return z(m, r) && b();
      },
      Z: z({}, g),
      K: z({}, m)
    };
    var y = window.addEventListener;
    var O = Hr((function(r) {
      return u(r ? "z" : "r");
    }), {
      g: 33,
      _: 99
    });
    R(t, "style");
    K(t);
    y("resize", O.bind(0, false));
    if (!h && (!p.x || !p.y)) {
      var C;
      y("resize", (function() {
        var r = Qa()[Ce];
        C = C || r && r.V();
        C && C(S, l, O.bind(0, true));
      }));
    }
    return S;
  };
  var Me = function getEnvironment() {
    if (!ze) {
      ze = Re();
    }
    return ze;
  };
  var Ie = function resolveInitialization(r, a) {
    return d(a) ? a.apply(0, r) : a;
  };
  var De = function staticInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = Ie(r, t);
    return i || a.apply(0, r);
  };
  var ke = function dynamicInitializationElement(r, a, e, n) {
    var t = o(n) ? e : n;
    var i = Ie(r, t);
    return !!i && (b(i) ? i : a.apply(0, r));
  };
  var Ve = function cancelInitialization(r, a, e) {
    var n = e || {}, t = n.nativeScrollbarsOverlaid, i = n.body;
    var v = Me(), f = v.L, l = v.A;
    var c = a.nativeScrollbarsOverlaid, s = a.body;
    var d = t != null ? t : c;
    var h = o(i) ? s : i;
    var p = (f.x || f.y) && d;
    var g = r && (u(h) ? !l : h);
    return !!p || !!g;
  };
  var je = new WeakMap;
  var Be = function addInstance(r, a) {
    je.set(r, a);
  };
  var Fe = function removeInstance(r) {
    je.delete(r);
  };
  var Ue = function getInstance(r) {
    return je.get(r);
  };
  var qe = function getPropByPath(r, a) {
    return r ? a.split(".").reduce((function(r, a) {
      return r && E(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ne = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ qe(r, n), e || qe(a, n) !== void 0 ];
    };
  };
  var Ye = function createState(r) {
    var a = r;
    return [ function() {
      return a;
    }, function(r) {
      a = z({}, a, r);
    } ];
  };
  var We = "tabindex";
  var Ge = $.bind(0, "");
  var Xe = function unwrap(r) {
    G(q(r), U(r));
    K(r);
  };
  var Ze = function createStructureSetupElements(r) {
    var a = Me();
    var e = a.Y, n = a.A;
    var t = Qa()[Ce];
    var i = t && t.P;
    var v = e(), o = v.elements;
    var u = o.host, f = o.padding, l = o.viewport, c = o.content;
    var s = b(r);
    var d = s ? {} : r;
    var h = d.elements;
    var p = h || {}, g = p.host, m = p.padding, w = p.viewport, O = p.content;
    var C = s ? r : d.target;
    var E = F(C, "textarea");
    var z = C.ownerDocument;
    var H = z.documentElement;
    var P = C === z.body;
    var L = z.defaultView;
    var D = De.bind(0, [ C ]);
    var k = ke.bind(0, [ C ]);
    var V = Ie.bind(0, [ C ]);
    var j = D.bind(0, Ge, l);
    var B = k.bind(0, Ge, c);
    var N = j(w);
    var Y = N === C;
    var W = Y && P;
    var $ = !Y && B(O);
    var J = !Y && b(N) && N === $;
    var Q = J && !!V(c);
    var rr = Q ? j() : N;
    var ar = Q ? $ : B();
    var er = J ? rr : N;
    var nr = W ? H : er;
    var tr = E ? D(Ge, u, g) : C;
    var ir = W ? nr : tr;
    var vr = J ? ar : $;
    var or = z.activeElement;
    var ur = !Y && L.top === L && or === C;
    var fr = {
      $: C,
      J: ir,
      rr: nr,
      ar: !Y && k(Ge, f, m),
      er: vr,
      nr: !Y && !n && i && i(a),
      tr: W ? H : nr,
      ir: W ? z : nr,
      vr: L,
      ur: z,
      lr: E,
      cr: P,
      sr: s,
      dr: Y,
      hr: J,
      pr: function _viewportHasClass(r, a) {
        return I(nr, Y ? da : wa, Y ? a : r);
      },
      gr: function _viewportAddRemoveClass(r, a, e) {
        return M(nr, Y ? da : wa, Y ? a : r, e);
      }
    };
    var lr = T(fr).reduce((function(r, a) {
      var e = fr[a];
      return y(r, e && b(e) && !q(e) ? e : false);
    }), []);
    var cr = function elementIsGenerated(r) {
      return r ? S(lr, r) > -1 : null;
    };
    var sr = fr.$, dr = fr.J, hr = fr.ar, pr = fr.rr, gr = fr.er, _r = fr.nr;
    var br = [ function() {
      R(dr, da);
      R(dr, sa);
      R(sr, sa);
      if (P) {
        R(H, da);
        R(H, sa);
      }
    } ];
    var wr = E && cr(dr);
    var Sr = E ? sr : U([ gr, pr, hr, dr, sr ].find((function(r) {
      return cr(r) === false;
    })));
    var yr = W ? sr : gr || pr;
    var Or = function appendElements() {
      A(dr, da, Y ? "viewport" : "host");
      A(hr, Ca, "");
      A(gr, Ea, "");
      if (!Y) {
        A(pr, wa, "");
      }
      var r = P && !Y ? mr(q(C), ca) : Tr;
      if (wr) {
        Z(sr, dr);
        y(br, (function() {
          Z(dr, sr);
          K(dr);
        }));
      }
      G(yr, Sr);
      G(dr, hr);
      G(hr || dr, !Y && pr);
      G(pr, gr);
      y(br, (function() {
        r();
        R(hr, Ca);
        R(gr, Ea);
        R(pr, ha);
        R(pr, pa);
        R(pr, wa);
        if (cr(gr)) {
          Xe(gr);
        }
        if (cr(pr)) {
          Xe(pr);
        }
        if (cr(hr)) {
          Xe(hr);
        }
      }));
      if (n && !Y) {
        M(pr, wa, ya, true);
        y(br, R.bind(0, pr, wa));
      }
      if (_r) {
        X(pr, _r);
        y(br, K.bind(0, _r));
      }
      if (ur) {
        var a = A(pr, We);
        A(pr, We, "-1");
        pr.focus();
        var e = function revertViewportTabIndex() {
          return a ? A(pr, We, a) : R(pr, We);
        };
        var t = $r(z, "pointerdown keydown", (function() {
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
  var Ke = function createTrinsicUpdateSegment(r, a) {
    var e = r.er;
    var n = a[0];
    return function(r) {
      var a = Me(), t = a.U;
      var i = n(), v = i._r;
      var o = r.mr;
      var u = (e || !t) && o;
      if (u) {
        style(e, {
          height: v ? "" : "100%"
        });
      }
      return {
        br: u,
        wr: u
      };
    };
  };
  var $e = function createPaddingUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.J, v = r.ar, o = r.rr, u = r.dr;
    var f = a({
      u: xr,
      o: Dr()
    }, Dr.bind(0, i, "padding", "")), l = f[0], c = f[1];
    return function(r, a, e) {
      var i = c(e), f = i[0], s = i[1];
      var d = Me(), h = d.A, p = d.U;
      var g = n(), m = g.Sr;
      var b = r.br, w = r.wr, S = r.yr;
      var y = a("paddingAbsolute"), O = y[0], C = y[1];
      var x = !p && w;
      if (b || s || x) {
        var E = l(e);
        f = E[0];
        s = E[1];
      }
      var T = !u && (C || S || s);
      if (T) {
        var H = !O || !v && !h;
        var P = f.r + f.l;
        var A = f.t + f.b;
        var L = {
          marginRight: H && !m ? -P : 0,
          marginBottom: H ? -A : 0,
          marginLeft: H && m ? -P : 0,
          top: H ? -f.t : 0,
          right: H ? m ? -f.r : "auto" : 0,
          left: H ? m ? "auto" : -f.l : 0,
          width: H ? "calc(100% + " + P + "px)" : ""
        };
        var R = {
          paddingTop: H ? f.t : 0,
          paddingRight: H ? f.r : 0,
          paddingBottom: H ? f.b : 0,
          paddingLeft: H ? f.l : 0
        };
        style(v || o, L);
        style(o, R);
        t({
          ar: f,
          Or: !H,
          I: v ? R : z({}, L, R)
        });
      }
      return {
        Cr: T
      };
    };
  };
  var Je = Math.max;
  var Qe = Je.bind(0, 0);
  var rn = "visible";
  var an = "hidden";
  var en = 42;
  var nn = {
    u: Or,
    o: {
      w: 0,
      h: 0
    }
  };
  var tn = {
    u: Cr,
    o: {
      x: an,
      y: an
    }
  };
  var vn = function getOverflowAmount(r, a) {
    var e = window.devicePixelRatio % 1 !== 0 ? 1 : 0;
    var n = {
      w: Qe(r.w - a.w),
      h: Qe(r.h - a.h)
    };
    return {
      w: n.w > e ? n.w : 0,
      h: n.h > e ? n.h : 0
    };
  };
  var un = function overflowIsVisible(r) {
    return r.indexOf(rn) === 0;
  };
  var fn = function createOverflowUpdateSegment(r, e) {
    var n = e[0], t = e[1];
    var i = r.J, v = r.ar, o = r.rr, u = r.nr, f = r.dr, l = r.gr, c = r.cr, s = r.vr;
    var d = Me(), h = d.j, p = d.U, g = d.A, m = d.L;
    var b = Qa()[Ce];
    var w = !f && !g && (m.x || m.y);
    var S = c && f;
    var y = a(nn, Nr.bind(0, o)), O = y[0], C = y[1];
    var x = a(nn, qr.bind(0, o)), E = x[0], T = x[1];
    var z = a(nn), H = z[0], P = z[1];
    var L = a(nn), R = L[0], I = L[1];
    var D = a(tn), k = D[0];
    var V = function fixFlexboxGlue(r, a) {
      style(o, {
        height: ""
      });
      if (a) {
        var e = n(), t = e.Or, v = e.ar;
        var u = r.Er, f = r.D;
        var l = Nr(i);
        var c = Ur(i);
        var s = style(o, "boxSizing") === "content-box";
        var d = t || s ? v.b + v.t : 0;
        var h = !(m.x && s);
        style(o, {
          height: c.h + l.h + (u.x && h ? f.x : 0) - d
        });
      }
    };
    var j = function getViewportOverflowState(r, a) {
      var e = !g && !r ? en : 0;
      var n = function getStatePerAxis(r, n, t) {
        var i = style(o, r);
        var v = a ? a[r] : i;
        var u = v === "scroll";
        var f = n ? e : t;
        var l = u && !g ? f : 0;
        var c = n && !!e;
        return [ i, u, l, c ];
      };
      var t = n("overflowX", m.x, h.x), i = t[0], v = t[1], u = t[2], f = t[3];
      var l = n("overflowY", m.y, h.y), c = l[0], s = l[1], d = l[2], p = l[3];
      return {
        Tr: {
          x: i,
          y: c
        },
        Er: {
          x: v,
          y: s
        },
        D: {
          x: u,
          y: d
        },
        k: {
          x: f,
          y: p
        }
      };
    };
    var B = function setViewportOverflowState(r, a, e, n) {
      var t = function setAxisOverflowStyle(r, a) {
        var e = un(r);
        var n = a && e && r.replace(rn + "-", "") || "";
        return [ a && !e ? r : "", un(n) ? "hidden" : n ];
      };
      var i = t(e.x, a.x), v = i[0], o = i[1];
      var u = t(e.y, a.y), f = u[0], l = u[1];
      n.overflowX = o && f ? o : v;
      n.overflowY = l && v ? l : f;
      return j(r, n);
    };
    var F = function hideNativeScrollbars(r, a, e, t) {
      var i = r.D, v = r.k;
      var o = v.x, u = v.y;
      var f = i.x, l = i.y;
      var c = n(), s = c.I;
      var d = a ? "marginLeft" : "marginRight";
      var h = a ? "paddingLeft" : "paddingRight";
      var p = s[d];
      var g = s.marginBottom;
      var m = s[h];
      var b = s.paddingBottom;
      t.width = "calc(100% + " + (l + p * -1) + "px)";
      t[d] = -l + p;
      t.marginBottom = -f + g;
      if (e) {
        t[h] = m + (u ? l : 0);
        t.paddingBottom = b + (o ? f : 0);
      }
    };
    var U = b ? b.M(w, p, o, u, n, j, F) : [ function() {
      return w;
    }, function() {
      return [ Tr ];
    } ], q = U[0], N = U[1];
    return function(r, a, e) {
      var u = r.br, c = r.zr, d = r.wr, h = r.Cr, b = r.mr, w = r.yr;
      var y = n(), x = y._r, z = y.Sr;
      var L = a("showNativeOverlaidScrollbars"), D = L[0], U = L[1];
      var Y = a("overflow"), W = Y[0], G = Y[1];
      var X = D && m.x && m.y;
      var Z = !f && !p && (u || d || c || U || b);
      var K = un(W.x);
      var $ = un(W.y);
      var J = K || $;
      var Q = C(e);
      var rr = T(e);
      var ar = P(e);
      var er = I(e);
      var nr;
      if (U && g) {
        l(ya, _a, !X);
      }
      if (Z) {
        nr = j(X);
        V(nr, x);
      }
      if (u || h || d || w || U) {
        if (J) {
          l(Oa, ga, false);
        }
        var tr = N(X, z, nr), ir = tr[0], vr = tr[1];
        var or = Q = O(e), ur = or[0], fr = or[1];
        var lr = rr = E(e), cr = lr[0], sr = lr[1];
        var dr = Ur(o);
        var hr = cr;
        var pr = dr;
        ir();
        if ((sr || fr || U) && vr && !X && q(vr, cr, ur, z)) {
          pr = Ur(o);
          hr = qr(o);
        }
        var gr = {
          w: Qe(Je(cr.w, hr.w) + ur.w),
          h: Qe(Je(cr.h, hr.h) + ur.h)
        };
        var _r = {
          w: Qe((S ? s.innerWidth : pr.w + Qe(dr.w - cr.w)) + ur.w),
          h: Qe((S ? s.innerHeight + ur.h : pr.h + Qe(dr.h - cr.h)) + ur.h)
        };
        er = R(_r);
        ar = H(vn(gr, _r), e);
      }
      var mr = er, br = mr[0], wr = mr[1];
      var Sr = ar, yr = Sr[0], Or = Sr[1];
      var Cr = rr, xr = Cr[0], Er = Cr[1];
      var Tr = Q, zr = Tr[0], Hr = Tr[1];
      var Pr = {
        x: yr.w > 0,
        y: yr.h > 0
      };
      var Ar = K && $ && (Pr.x || Pr.y) || K && Pr.x && !Pr.y || $ && Pr.y && !Pr.x;
      if (h || w || Hr || Er || wr || Or || G || U || Z) {
        var Lr = {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          width: "",
          overflowY: "",
          overflowX: ""
        };
        var Rr = B(X, Pr, W, Lr);
        var Mr = q(Rr, xr, zr, z);
        if (!f) {
          F(Rr, z, Mr, Lr);
        }
        if (Z) {
          V(Rr, x);
        }
        if (f) {
          A(i, ha, Lr.overflowX);
          A(i, pa, Lr.overflowY);
        } else {
          style(o, Lr);
        }
      }
      M(i, da, ga, Ar);
      M(v, Ca, xa, Ar);
      if (!f) {
        M(o, wa, Oa, J);
      }
      var Ir = k(j(X).Tr), Dr = Ir[0], kr = Ir[1];
      t({
        Tr: Dr,
        Hr: {
          x: br.w,
          y: br.h
        },
        Pr: {
          x: yr.w,
          y: yr.h
        },
        Ar: Pr
      });
      return {
        Lr: kr,
        Rr: wr,
        Mr: Or
      };
    };
  };
  var ln = function prepareUpdateHints(r, a, e) {
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
  var cn = function createStructureSetupUpdate(r, a) {
    var e = r.$, n = r.rr, t = r.gr, i = r.dr;
    var v = Me(), o = v.A, u = v.L, f = v.U;
    var l = !o && (u.x || u.y);
    var c = [ Ke(r, a), $e(r, a), fn(r, a) ];
    return function(r, a, v) {
      var o = ln(z({
        br: false,
        Cr: false,
        yr: false,
        mr: false,
        Rr: false,
        Mr: false,
        Lr: false,
        zr: false,
        wr: false,
        Ir: false
      }, a), {}, v);
      var u = l || !f;
      var s = u && D(n);
      var d = u && k(n);
      t("", ba, true);
      var h = o;
      each(c, (function(a) {
        h = ln(h, a(h, r, !!v) || {}, v);
      }));
      D(n, s);
      k(n, d);
      t("", ba);
      if (!i) {
        D(e, 0);
        k(e, 0);
      }
      return h;
    };
  };
  var sn = function createEventContentChange(r, a, e) {
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
            var v = t && n && (i ? i(n) : j(n, r));
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
              var f = $r(i, v, (function(r) {
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
  var dn = function createDOMObserver(r, a, e, n) {
    var t = false;
    var i = n || {}, v = i.Dr, o = i.kr, u = i.Vr, f = i.jr, l = i.Br, s = i.Fr;
    var d = Hr((function() {
      return t && e(true);
    }), {
      g: 33,
      _: 99
    });
    var h = sn(r, d, u), p = h[0], g = h[1];
    var m = v || [];
    var b = o || [];
    var w = m.concat(b);
    var x = function observerCallback(t, i) {
      var v = l || Tr;
      var o = s || Tr;
      var u = new Set;
      var d = new Set;
      var h = false;
      var p = false;
      each(t, (function(e) {
        var t = e.attributeName, i = e.target, l = e.type, s = e.oldValue, g = e.addedNodes, m = e.removedNodes;
        var w = l === "attributes";
        var y = l === "childList";
        var O = r === i;
        var C = w && c(t) ? A(i, t) : 0;
        var x = C !== 0 && s !== C;
        var E = S(b, t) > -1 && x;
        if (a && (y || !O)) {
          var T = !w;
          var z = w && x;
          var H = z && f && F(i, f);
          var P = H ? !v(i, t, s, C) : T || z;
          var L = P && !o(e, !!H, r, n);
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
            y(a, j(r, e));
            return F(e, r) ? y(a, e) : a;
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
    var E = new or((function(r) {
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
        d.S();
        var r = E.takeRecords();
        return !C(r) && x(r, true);
      }
    } ];
  };
  var hn = 3333333;
  var pn = function createSizeObserver(r, e, n) {
    var t = n || {}, i = t.Ur, v = t.Ir;
    var o = Qa()[_e];
    var u = Me(), f = u.F;
    var l = J('<div class="' + Ta + '"><div class="' + Ha + '"></div></div>');
    var c = l[0];
    var d = c.firstChild;
    var g = Ir.bind(0, r);
    var m = a({
      o: false,
      p: true,
      u: function _equal(r, a) {
        return !(!r || !Wr(r) && Wr(a));
      }
    }), b = m[0];
    var w = function onSizeChangedCallbackProxy(r) {
      var a = h(r) && r.length > 0 && p(r[0]);
      var n = !a && s(r[0]);
      var t = false;
      var v = false;
      var o = true;
      if (a) {
        var u = b(r.pop().contentRect), l = u[0], d = u[2];
        var g = Wr(l);
        var m = Wr(d);
        var w = !d;
        t = w && !!m || !g;
        v = !m && g;
        o = !t;
      } else if (n) {
        o = r[1];
      } else {
        v = r === true;
      }
      if (i && o) {
        var S = n ? r[0] : Ir(c);
        D(c, S ? f.n ? -hn : f.i ? 0 : hn : hn);
        k(c, hn);
      }
      if (!t) {
        e({
          br: !n,
          qr: n ? r : void 0,
          Ir: !!v
        });
      }
    };
    var S = [];
    return [ function() {
      x(S);
      K(c);
    }, function() {
      var e = v && w;
      if (fr) {
        var n = new fr(w);
        n.observe(d);
        y(S, (function() {
          n.disconnect();
        }));
      } else if (o) {
        var t = o.H(d, w, v), u = t[0], f = t[1];
        e = u;
        y(S, f);
      }
      if (i) {
        var l = a({
          o: void 0
        }, g), s = l[0];
        y(S, $r(c, "scroll", (function(r) {
          var a = s();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            _r(d, "ltr rtl");
            mr(d, e ? "rtl" : "ltr");
            w([ !!e, n, t ]);
          }
          Jr(r);
        })));
      }
      if (e) {
        mr(c, za);
        y(S, $r(c, "animationstart", e, {
          T: !!fr
        }));
      }
      if (fr || o) {
        G(r, c);
      }
    } ];
  };
  var gn = function isHeightIntrinsic(r) {
    return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
  };
  var _n = function createTrinsicObserver(r, e) {
    var n;
    var t = $(Ra);
    var i = [];
    var v = a({
      o: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(gn(r));
        var t = n[1];
        return t && !a && e(n) && [ n ];
      }
    };
    var f = function intersectionObserverCallback(r, a) {
      return r && r.length > 0 && u(r.pop(), a);
    };
    return [ function() {
      x(i);
      K(t);
    }, function() {
      if (ur) {
        n = new ur((function(r) {
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
          var r = Fr(t);
          u(r);
        };
        var e = pn(t, a), v = e[0], o = e[1];
        y(i, v);
        o();
        a();
      }
      G(r, t);
    }, function() {
      return n && f(n.takeRecords(), true);
    } ];
  };
  var mn = "[" + da + "]";
  var bn = "[" + wa + "]";
  var wn = [ "tabindex" ];
  var Sn = [ "wrap", "cols", "rows" ];
  var yn = [ "id", "class", "style", "open" ];
  var On = function createStructureSetupObservers(r, e, n) {
    var t;
    var i;
    var v;
    var o = r.J, u = r.rr, f = r.er, s = r.lr, p = r.dr, g = r.pr, m = r.gr;
    var b = Me(), w = b.U;
    var O = a({
      u: Or,
      o: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = g(Oa, ga);
      var a = g(Sa, "");
      var e = a && D(u);
      var n = a && k(u);
      m(Oa, ga);
      m(Sa, "");
      m("", ba, true);
      var t = qr(f);
      var i = qr(u);
      var v = Nr(u);
      m(Oa, ga, r);
      m(Sa, "", a);
      m("", ba);
      D(u, e);
      k(u, n);
      return {
        w: i.w + t.w + v.w,
        h: i.h + t.h + v.h
      };
    })), C = O[0];
    var x = s ? Sn : yn.concat(Sn);
    var E = Hr(n, {
      g: function _timeout() {
        return t;
      },
      _: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var n = a[0];
        return [ T(e).concat(T(n)).reduce((function(r, a) {
          r[a] = e[a] || n[a];
          return r;
        }), {}) ];
      }
    });
    var H = function updateViewportAttrsFromHost(r) {
      each(r || wn, (function(r) {
        if (S(wn, r) > -1) {
          var a = A(o, r);
          if (c(a)) {
            A(u, r, a);
          } else {
            R(u, r);
          }
        }
      }));
    };
    var P = function onTrinsicChanged(r, a) {
      var t = r[0], i = r[1];
      var v = {
        mr: i
      };
      e({
        _r: t
      });
      !a && n(v);
      return v;
    };
    var L = function onSizeChanged(r) {
      var a = r.br, t = r.qr, i = r.Ir;
      var v = !a || i ? n : E;
      var o = false;
      if (t) {
        var u = t[0], f = t[1];
        o = f;
        e({
          Sr: u
        });
      }
      v({
        br: a,
        Ir: i,
        yr: o
      });
    };
    var M = function onContentMutation(r, a) {
      var e = C(), t = e[1];
      var i = {
        wr: t
      };
      var v = r ? n : E;
      if (t) {
        !a && v(i);
      }
      return i;
    };
    var I = function onHostMutation(r, a, e) {
      var n = {
        zr: a
      };
      if (a) {
        !e && E(n);
      } else if (!p) {
        H(r);
      }
      return n;
    };
    var V = f || !w ? _n(o, P) : [ Tr, Tr, Tr ], j = V[0], B = V[1], F = V[2];
    var U = !p ? pn(o, L, {
      Ir: true,
      Ur: true
    }) : [ Tr, Tr ], q = U[0], W = U[1];
    var G = dn(o, false, I, {
      kr: yn,
      Dr: yn.concat(wn)
    }), X = G[0], Z = G[1];
    var K;
    var $ = p && fr && new fr((function(r) {
      var a = r[r.length - 1].contentRect;
      var e = Wr(a);
      var n = Wr(K);
      var t = !n && e;
      L({
        br: true,
        Ir: t
      });
      K = a;
    }));
    return [ function() {
      j();
      q();
      v && v[0]();
      $ && $.disconnect();
      X();
    }, function() {
      $ && $.observe(o);
      H();
      W();
      B();
    }, function() {
      var r = {};
      var a = Z();
      var e = F();
      var n = v && v[1]();
      if (a) {
        z(r, I.apply(0, y(a, true)));
      }
      if (e) {
        z(r, P.apply(0, y(e, true)));
      }
      if (n) {
        z(r, M.apply(0, y(n, true)));
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
        v = dn(f || u, true, M, {
          Dr: x.concat(o || []),
          Vr: g,
          jr: mn,
          Fr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !p ? Y(e, mn, bn) : false;
            return t || !!N(e, "." + Da) || !!O(r);
          }
        });
      }
      if (S) {
        E.S();
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
  var Cn = {
    x: 0,
    y: 0
  };
  var xn = function createInitialStructureSetupUpdateState(r) {
    return {
      ar: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      Or: false,
      I: {
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
      },
      Hr: Cn,
      Pr: Cn,
      Tr: {
        x: "hidden",
        y: "hidden"
      },
      Ar: {
        x: false,
        y: false
      },
      _r: false,
      Sr: Ir(r.J)
    };
  };
  var En = function createStructureSetup(r, a) {
    var e = Ne(a, {});
    var n = na(), t = n[0], i = n[1], v = n[2];
    var o = Ze(r), u = o[0], f = o[1], l = o[2];
    var c = Ye(xn(u));
    var s = c[0], d = c[1];
    var h = cn(u, c);
    var p = function triggerUpdateEvent(r, a, e) {
      var n = T(r).some((function(a) {
        return !!r[a];
      }));
      var t = n || !H(a) || e;
      if (t) {
        v("u", [ r, a, e ]);
      }
      return t;
    };
    var g = On(u, d, (function(r) {
      return p(h(e, r), {}, false);
    })), m = g[0], b = g[1], w = g[2], S = g[3];
    var y = s.bind(0);
    y.Nr = function(r) {
      return t("u", r);
    };
    y.Yr = function() {
      var r = u.$, a = u.rr, e = u.ur, n = u.cr;
      var t = n ? e.documentElement : r;
      var i = D(t);
      var v = k(t);
      b();
      f();
      D(a, i);
      k(a, v);
    };
    y.Wr = u;
    return [ function(r, e) {
      var n = Ne(a, r, e);
      S(n);
      return p(h(n, w(), e), r, !!e);
    }, y, function() {
      i();
      m();
      l();
    } ];
  };
  var Tn = Math.round;
  var zn = function getScale(r) {
    var a = Yr(r), e = a.width, n = a.height;
    var t = Fr(r), i = t.w, v = t.h;
    return {
      x: Tn(e) / i || 1,
      y: Tn(n) / v || 1
    };
  };
  var Hn = function continuePointerDown(r, a, e) {
    var n = a.scrollbars;
    var t = r.button, i = r.isPrimary, v = r.pointerType;
    var o = n.pointers;
    return t === 0 && i && n[e ? "dragScroll" : "clickScroll"] && (o || []).includes(v);
  };
  var Pn = "pointerup pointerleave pointercancel lostpointercapture";
  var An = function createRootClickStopPropagationEvents(r, a) {
    return $r(r, "mousedown", $r.bind(0, a, "click", Jr, {
      T: true,
      C: true
    }), {
      C: true
    });
  };
  var Ln = function createInteractiveScrollEvents(r, a, e, n, t, i, v) {
    var o = Me(), u = o.F;
    var f = n.Gr, l = n.Xr, c = n.Zr;
    var s = "scroll" + (v ? "Left" : "Top");
    var d = "client" + (v ? "X" : "Y");
    var h = v ? "width" : "height";
    var p = v ? "left" : "top";
    var g = v ? "w" : "h";
    var m = v ? "x" : "y";
    var b = function createRelativeHandleMove(r, a) {
      return function(e) {
        var n = i(), o = n.Pr;
        var d = Fr(l)[g] - Fr(f)[g];
        var h = a * e / d;
        var p = h * o[m];
        var b = Ir(c);
        var w = b && v ? u.n || u.i ? 1 : -1 : 1;
        t[s] = r + p * w;
      };
    };
    return $r(l, "pointerdown", (function(n) {
      var i = N(n.target, "." + Fa) === f;
      var v = i ? f : l;
      M(a, da, ma, true);
      if (Hn(n, r, i)) {
        var o = !i && n.shiftKey;
        var u = function getHandleRect() {
          return Yr(f);
        };
        var c = function getTrackRect() {
          return Yr(l);
        };
        var g = function getHandleOffset(r, a) {
          return (r || u())[p] - (a || c())[p];
        };
        var w = b(t[s] || 0, 1 / zn(t)[m]);
        var S = n[d];
        var O = u();
        var C = c();
        var E = O[h];
        var T = g(O, C) + E / 2;
        var z = S - C[p];
        var H = i ? 0 : z - T;
        var P = function releasePointerCapture(r) {
          x(A);
          v.releasePointerCapture(r.pointerId);
        };
        var A = [ M.bind(0, a, da, ma), $r(e, Pn, P), $r(e, "selectstart", (function(r) {
          return Qr(r);
        }), {
          O: false
        }), $r(l, Pn, P), $r(l, "pointermove", (function(r) {
          var a = r[d] - S;
          if (i || o) {
            w(H + a);
          }
        })) ];
        if (o) {
          w(H);
        } else if (!i) {
          var L = Qa()[Ee];
          if (L) {
            y(A, L.H(w, g, H, E, z));
          }
        }
        v.setPointerCapture(n.pointerId);
      }
    }));
  };
  var Rn = function createScrollbarsSetupEvents(r, a) {
    return function(e, n, t, i, v, o, u) {
      var f = e.Zr;
      var l = zr(333), c = l[0], s = l[1];
      var d = !!v.scrollBy;
      var h = true;
      return x.bind(0, [ $r(f, "pointerenter", (function() {
        n(Ya, true);
      })), $r(f, "pointerleave pointercancel", (function() {
        n(Ya);
      })), $r(f, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (d && h && t === 0 && q(f) === i) {
          v.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        h = false;
        n(Za, true);
        c((function() {
          h = true;
          n(Za);
        }));
        Qr(r);
      }), {
        O: false,
        C: true
      }), An(f, t), Ln(r, i, t, e, v, a, u), s ]);
    };
  };
  var Mn = Math.min, In = Math.max, Dn = Math.round;
  var kn = function getScrollbarHandleLengthRatio(r, a, e, n) {
    if (n) {
      var t = e ? "x" : "y";
      var i = n.Pr, v = n.Hr;
      var o = v[t];
      var u = i[t];
      return In(0, Mn(1, o / (o + u)));
    }
    var f = e ? "width" : "height";
    var l = Yr(r)[f];
    var c = Yr(a)[f];
    return In(0, Mn(1, l / c));
  };
  var Vn = function getScrollbarHandleOffsetRatio(r, a, e, n, t, i) {
    var v = Me(), o = v.F;
    var u = i ? "x" : "y";
    var f = i ? "Left" : "Top";
    var l = n.Pr;
    var c = Dn(l[u]);
    var s = Mn(c, In(0, e["scroll" + f]));
    var d = i && t;
    var h = o.i ? s : c - s;
    var p = d ? h : s;
    var g = Mn(1, p / c);
    var m = kn(r, a, i);
    return 1 / m * (1 - m) * g;
  };
  var jn = function animateElement(r, a, e, n) {
    return a && r.animate(e, {
      timeline: a,
      composite: n
    });
  };
  var Bn = function getScrollbarHandleAnimationKeyFrames(r, a) {
    var e;
    return e = {
      transform: [ kr("0%", a), kr(a && r ? "100%" : "-100%", a) ]
    }, e[a ? r ? "right" : "left" : "top"] = [ "0%", "100%" ], e;
  };
  var Fn = function maxScrollbarOffsetFrameValue(r) {
    return Math.max(0, r - .5) + "px";
  };
  var Un = function animateScrollbarOffset(r, a, e, n) {
    return jn(r, a, {
      transform: [ kr("0px", n), kr(Fn(e), n) ]
    }, "add");
  };
  var qn = function initScrollTimeline(r, a) {
    return sr ? new sr({
      source: r,
      axis: a
    }) : null;
  };
  var Nn = function createScrollbarsSetupElements(r, a, e) {
    var n = Me(), t = n.Y, i = n.R;
    var v = t(), o = v.scrollbars;
    var u = o.slot;
    var f = a.ur, l = a.$, c = a.J, d = a.rr, p = a.sr, g = a.tr, m = a.cr, b = a.dr;
    var w = p ? {} : r, O = w.scrollbars;
    var E = O || {}, T = E.slot;
    var z = new Map;
    var H = qn(g, "x");
    var P = qn(g, "y");
    var A = ke([ l, c, d ], (function() {
      return b && m ? l : c;
    }), u, T);
    var L = function doRefreshScrollbarOffset(r) {
      return b && !m && q(r) === d;
    };
    var R = function cancelElementAnimations(r) {
      z.forEach((function(a, e) {
        var n = r ? S(h(r) ? r : [ r ], e) > -1 : true;
        if (n) {
          (a || []).forEach((function(r) {
            r && r.cancel();
          }));
          z.delete(e);
        }
      }));
    };
    var M = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? mr : _r;
      each(r, (function(r) {
        n(r.Zr, a);
      }));
    };
    var I = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        style(n, t);
      }));
    };
    var V = function scrollbarStructureRefreshHandleLength(r, a, e) {
      I(r, (function(r) {
        var n;
        var t = r.Gr, i = r.Xr;
        return [ t, (n = {}, n[e ? "width" : "height"] = (kn(t, i, e, a) * 100).toFixed(3) + "%", 
        n) ];
      }));
    };
    var j = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      if (!P && !P) {
        I(r, (function(r) {
          var n = r.Gr, t = r.Xr, i = r.Zr;
          var v = Vn(n, t, g, a, Ir(i), e);
          var o = v === v;
          return [ n, {
            transform: o ? kr((v * 100).toFixed(3) + "%", e) : ""
          } ];
        }));
      }
    };
    var B = function styleScrollbarPosition(r) {
      var a = r.Zr;
      var e = L(a) && a;
      return [ e, {
        transform: e ? kr([ D(g) + "px", k(g) + "px" ]) : ""
      } ];
    };
    var F = [];
    var U = [];
    var N = [];
    var Y = function scrollbarsAddRemoveClass(r, a, e) {
      var n = s(e);
      var t = n ? e : true;
      var i = n ? !e : true;
      t && M(U, r, a);
      i && M(N, r, a);
    };
    var W = function refreshScrollbarsHandleLength(r) {
      V(U, r, true);
      V(N, r);
    };
    var X = function refreshScrollbarsHandleOffset(r) {
      j(U, r, true);
      j(N, r);
    };
    var Z = function refreshScrollbarsHandleOffsetTimeline() {
      var r = function forEachFn(r, a) {
        var e = a.Zr, n = a.Gr;
        R(n);
        z.set(n, [ jn(n, r ? H : P, Bn(r && Ir(e), r)) ]);
      };
      U.forEach(r.bind(0, true));
      N.forEach(r.bind(0, false));
    };
    var J = function refreshScrollbarsScrollbarOffset() {
      if (!P && !P) {
        b && I(U, B);
        b && I(N, B);
      }
    };
    var Q = function refreshScrollbarsScrollbarOffsetTimeline(r) {
      var a = r.Pr;
      N.concat(U).forEach((function(r) {
        var e = r.Zr;
        R(e);
        if (L(e)) {
          z.set(e, [ Un(e, H, a.x, true), Un(e, P, a.y) ]);
        }
      }));
    };
    var rr = function generateScrollbarDOM(r) {
      var a = r ? Va : ja;
      var n = r ? U : N;
      var t = C(n) ? Na : "";
      var v = $(Da + " " + a + " " + t);
      var o = $(Ba);
      var u = $(Fa);
      var l = {
        Zr: v,
        Xr: o,
        Gr: u
      };
      if (!i) {
        mr(v, Ma);
      }
      G(v, o);
      G(o, u);
      y(n, l);
      y(F, [ K.bind(0, v), R, e(l, Y, f, c, g, r ? H : P, r) ]);
      return l;
    };
    var ar = rr.bind(0, true);
    var er = rr.bind(0, false);
    var nr = function appendElements() {
      G(A, U[0].Zr);
      G(A, N[0].Zr);
      dr((function() {
        Y(Na);
      }), 300);
    };
    ar();
    er();
    return [ {
      Kr: W,
      $r: X,
      Jr: Z,
      Qr: Q,
      ra: J,
      aa: Y,
      ea: {
        B: H,
        na: U,
        ta: ar,
        ia: I.bind(0, U)
      },
      va: {
        B: P,
        na: N,
        ta: er,
        ia: I.bind(0, N)
      }
    }, nr, x.bind(0, F) ];
  };
  var Yn = function isHoverablePointerType(r) {
    return r.pointerType === "mouse";
  };
  var Wn = function createScrollbarsSetup(r, a, e, n) {
    var t;
    var i;
    var v;
    var o;
    var u;
    var f = Tr;
    var l = 0;
    var c = Ye({});
    var s = c[0];
    var d = zr(), h = d[0], p = d[1];
    var g = zr(), m = g[0], b = g[1];
    var w = zr(100), S = w[0], y = w[1];
    var O = zr(100), C = O[0], E = O[1];
    var T = zr(100), z = T[0], H = T[1];
    var P = zr((function() {
      return l;
    })), A = P[0], L = P[1];
    var R = Nn(r, e.Wr, Rn(a, e)), M = R[0], I = R[1], D = R[2];
    var k = e.Wr, V = k.J, j = k.ir, B = k.cr;
    var F = M.aa, U = M.Kr, q = M.$r, N = M.Jr, Y = M.Qr, W = M.ra;
    var G = function manageAutoHideSuspension(r) {
      F(Ga, r, true);
      F(Ga, r, false);
    };
    var X = function manageScrollbarsAutoHide(r, a) {
      L();
      if (r) {
        F(Xa);
      } else {
        var e = function hide() {
          return F(Xa, true);
        };
        if (l > 0 && !a) {
          A(e);
        } else {
          e();
        }
      }
    };
    var Z = function onHostMouseEnter(r) {
      if (Yn(r)) {
        o = i;
        o && X(true);
      }
    };
    var K = [ y, L, E, H, b, p, D, $r(V, "pointerover", Z, {
      T: true
    }), $r(V, "pointerenter", Z), $r(V, "pointerleave", (function(r) {
      if (Yn(r)) {
        o = false;
        i && X(false);
      }
    })), $r(V, "pointermove", (function(r) {
      Yn(r) && t && h((function() {
        y();
        X(true);
        C((function() {
          t && X(false);
        }));
      }));
    })), $r(j, "scroll", (function(r) {
      m((function() {
        q(e());
        v && X(true);
        S((function() {
          v && !o && X(false);
        }));
      }));
      n(r);
      W();
    })) ];
    var $ = s.bind(0);
    $.Wr = M;
    $.Yr = I;
    return [ function(r, n, o) {
      var c = o.Rr, s = o.Mr, d = o.Lr, h = o.yr, p = o.Ir;
      var g = Me(), m = g.L;
      var b = Ne(a, r, n);
      var w = e();
      var S = w.Pr, y = w.Tr, O = w.Sr, C = w.Ar;
      var x = b("showNativeOverlaidScrollbars"), E = x[0], T = x[1];
      var H = b("scrollbars.theme"), P = H[0], A = H[1];
      var L = b("scrollbars.visibility"), R = L[0], M = L[1];
      var I = b("scrollbars.autoHide"), D = I[0], k = I[1];
      var V = b("scrollbars.autoHideSuspend"), Z = V[0], K = V[1];
      var $ = b("scrollbars.autoHideDelay"), J = $[0];
      var Q = b("scrollbars.dragScroll"), rr = Q[0], ar = Q[1];
      var er = b("scrollbars.clickScroll"), nr = er[0], tr = er[1];
      var ir = p && !n;
      var vr = C.x || C.y;
      var or = c || s || h;
      var ur = d || M;
      var fr = E && m.x && m.y;
      var lr = function setScrollbarVisibility(r, a) {
        var e = R === "visible" || R === "auto" && r === "scroll";
        F(Ua, e, a);
        return e;
      };
      l = J;
      if (ir) {
        if (Z && vr) {
          G(false);
          f();
          z((function() {
            f = $r(j, "scroll", G.bind(0, true), {
              T: true
            });
          }));
        } else {
          G(true);
        }
      }
      if (T) {
        F(Ia, fr);
      }
      if (A) {
        F(u);
        F(P, true);
        u = P;
      }
      if (K && !Z) {
        G(true);
      }
      if (k) {
        t = D === "move";
        i = D === "leave";
        v = D !== "never";
        X(!v, true);
      }
      if (ar) {
        F($a, rr);
      }
      if (tr) {
        F(Ka, nr);
      }
      if (ur) {
        var cr = lr(y.x, true);
        var sr = lr(y.y, false);
        var dr = cr && sr;
        F(qa, !dr);
      }
      if (or) {
        U(w);
        q(w);
        N(w);
        Y(w);
        W();
        F(Wa, !S.x, true);
        F(Wa, !S.y, false);
        F(ka, O && !B);
      }
    }, $, function() {
      x(K);
      f();
    } ];
  };
  var Gn = function invokePluginInstance(r, a, e) {
    if (d(r)) {
      r(a || void 0, e || void 0);
    }
  };
  var Xn = function OverlayScrollbars(r, a, e) {
    var n = Me(), t = n.G, i = n.Y, v = n.q, o = n.N;
    var u = Qa();
    var f = b(r);
    var l = f ? r : r.target;
    var c = Ue(l);
    if (a && !c) {
      var s = false;
      var d = function validateOptions(r) {
        var a = Qa()[he];
        var e = a && a.H;
        return e ? e(r, true) : r;
      };
      var h = z({}, t(), d(a));
      var p = na(e), g = p[0], m = p[1], w = p[2];
      var S = En(r, h), y = S[0], O = S[1], C = S[2];
      var x = Wn(r, h, O, (function(r) {
        return w("scroll", [ k, r ]);
      })), E = x[0], P = x[1], A = x[2];
      var L = function update(r, a) {
        return y(r, !!a);
      };
      var R = L.bind(0, {}, true);
      var M = v(R);
      var I = o(R);
      var D = function destroy(r) {
        Fe(l);
        M();
        I();
        A();
        C();
        s = true;
        w("destroyed", [ k, !!r ]);
        m();
      };
      var k = {
        options: function options(r, a) {
          if (r) {
            var e = a ? t() : {};
            var n = va(h, z(e, d(r)));
            if (!H(n)) {
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
          var r = O(), a = r.Hr, e = r.Pr, n = r.Tr, t = r.Ar, i = r.ar, v = r.Or, o = r.Sr;
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
          var r = O.Wr, a = r.$, e = r.J, n = r.ar, t = r.rr, i = r.er, v = r.tr, o = r.ir;
          var u = P.Wr, f = u.ea, l = u.va;
          var c = function translateScrollbarStructure(r) {
            var a = r.Gr, e = r.Xr, n = r.Zr;
            return {
              scrollbar: n,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.na, e = r.ta;
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
      O.Nr((function(r, a, e) {
        E(a, e, r);
      }));
      Be(l, k);
      each(T(u), (function(r) {
        return Gn(u[r], 0, k);
      }));
      if (Ve(O.Wr.cr, i().cancel, !f && r.cancel)) {
        D(true);
        return k;
      }
      O.Yr();
      P.Yr();
      w("initialized", [ k ]);
      O.Nr((function(r, a, e) {
        var n = r.br, t = r.yr, i = r.mr, v = r.Rr, o = r.Mr, u = r.Lr, f = r.wr, l = r.zr;
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
  Xn.plugin = function(r) {
    each(re(r), (function(r) {
      return Gn(r, Xn);
    }));
  };
  Xn.valid = function(r) {
    var a = r && r.elements;
    var e = d(a) && a();
    return m(e) && !!Ue(e.target);
  };
  Xn.env = function() {
    var r = Me(), a = r.j, e = r.L, n = r.A, t = r.F, i = r.U, v = r.R, o = r.B, u = r.Z, f = r.K, l = r.Y, c = r.W, s = r.G, d = r.X;
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
  r.ClickScrollPlugin = Te;
  r.OverlayScrollbars = Xn;
  r.ScrollbarsHidingPlugin = xe;
  r.SizeObserverPlugin = me;
  Object.defineProperty(r, "v", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
