/*!
 * OverlayScrollbars
 * Version: 2.4.3
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
  var z = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var I = function attr(r, a, e) {
    if (u(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var D = function getValueSet(r, a) {
    return new Set((I(r, a) || "").split(" "));
  };
  var L = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var R = function attrClass(r, a, e, t) {
    if (e) {
      var n = D(r, a);
      n[t ? "add" : "delete"](e);
      var v = C(n).join(" ").trim();
      I(r, a, v);
    }
  };
  var M = function hasAttrClass(r, a, e) {
    return D(r, a).has(e);
  };
  var k = e && Element.prototype;
  var V = function find(r, a) {
    var e = [];
    var t = a ? S(a) && a : document;
    return t ? O(e, t.querySelectorAll(r)) : e;
  };
  var j = function findFirst(r, a) {
    var e = a ? S(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var U = function is(r, a) {
    if (S(r)) {
      var e = k.matches || k.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var B = function contents(r) {
    return r ? C(r.childNodes) : [];
  };
  var F = function parent(r) {
    return r && r.parentElement;
  };
  var N = function closest(r, a) {
    if (S(r)) {
      var e = k.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (U(r, a)) {
          return r;
        }
        r = F(r);
      } while (r);
    }
  };
  var q = function liesBetween(r, a, e) {
    var t = N(r, a);
    var n = r && j(e, t);
    var v = N(n, a) === t;
    return t && n ? t === r || n === r || v && N(N(r, e), a) !== t : false;
  };
  var Y = function noop() {};
  var W = function removeElements(r) {
    if (h(r)) {
      each(C(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = F(r);
      a && a.removeChild(r);
    }
  };
  var G = function before(r, a, e) {
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
        return W(e);
      };
    }
    return Y;
  };
  var X = function appendChildren(r, a) {
    return G(r, null, a);
  };
  var Z = function insertBefore(r, a) {
    return G(F(r), r, a);
  };
  var $ = function insertAfter(r, a) {
    return G(F(r), r && r.nextSibling, a);
  };
  var J = function createDiv(r) {
    var a = document.createElement("div");
    I(a, "class", r);
    return a;
  };
  var K = function createDOM(r) {
    var a = J();
    a.innerHTML = r.trim();
    return each(B(a), (function(r) {
      return W(r);
    }));
  };
  var Q = e ? window : {};
  var rr = Math.max;
  var ar = Math.min;
  var er = Math.round;
  var tr = Math.abs;
  var nr = Q.cancelAnimationFrame;
  var vr = Q.requestAnimationFrame;
  var ir = Q.setTimeout;
  var or = Q.clearTimeout;
  var ur = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var lr = function getDummyStyle() {
    return J().style;
  };
  var cr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var fr = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var sr = {};
  var dr = {};
  var pr = function cssProperty(r) {
    var a = dr[r];
    if (H(dr, r)) {
      return a;
    }
    var e = ur(r);
    var t = lr();
    each(cr, (function(n) {
      var v = n.replace(/-/g, "");
      var i = [ r, n + r, v + e, ur(v) + e ];
      return !(a = i.find((function(r) {
        return t[r] !== void 0;
      })));
    }));
    return dr[r] = a || "";
  };
  var _r = function jsAPI(r) {
    var a = sr[r] || Q[r];
    if (H(sr, r)) {
      return a;
    }
    each(fr, (function(e) {
      a = a || Q[e + ur(r)];
      return !a;
    }));
    sr[r] = a;
    return a;
  };
  var br = _r("MutationObserver");
  var hr = _r("IntersectionObserver");
  var gr = _r("ResizeObserver");
  var mr = _r("ScrollTimeline");
  var Sr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var yr = function selfClearTimeout(r) {
    var a;
    var e = r ? ir : vr;
    var t = r ? or : nr;
    return [ function(n) {
      t(a);
      a = e(n, p(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var wr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = Y;
    var i = a || {}, o = i.p, u = i._, l = i.g;
    var c = function invokeFunctionToDebounce(a) {
      v();
      or(e);
      e = t = void 0;
      v = Y;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return l && t ? l(t, r) : r;
    };
    var d = function flush() {
      if (v !== Y) {
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
        var b = a > 0 ? ir : vr;
        var h = a > 0 ? or : nr;
        var g = s(r);
        var m = g || r;
        var S = c.bind(0, m);
        v();
        var y = b(S, a);
        v = function clear() {
          return h(y);
        };
        if (_ && !e) {
          e = ir(d, l);
        }
        t = n = m;
      } else {
        c(r);
      }
    };
    _.m = d;
    return _;
  };
  var Or = /[^\x20\t\r\n\f]+/g;
  var Cr = function classListAction(r, a, e) {
    var t = r && r.classList;
    var n;
    var v = 0;
    var i = false;
    if (t && a && s(a)) {
      var o = a.match(Or) || [];
      i = o.length > 0;
      while (n = o[v++]) {
        i = !!e(t, n) && i;
      }
    }
    return i;
  };
  var xr = function removeClass(r, a) {
    Cr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Er = function addClass(r, a) {
    Cr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return Sr(xr, r, a);
  };
  var Tr = {
    opacity: 1,
    zIndex: 1
  };
  var Hr = function parseToZeroOrNumber(r, a) {
    var e = r || "";
    var t = a ? parseFloat(e) : parseInt(e, 10);
    return t === t ? t : 0;
  };
  var Pr = function adaptCSSVal(r, a) {
    return !Tr[r] && f(a) ? a + "px" : a;
  };
  var Ar = function getCSSVal(r, a, e) {
    return String((a != null ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
  };
  var zr = function setCSSVal(r, a, e) {
    try {
      var t = r.style;
      if (!u(t[a])) {
        t[a] = Pr(a, e);
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
        var v = Q.getComputedStyle(r, null);
        n = e ? Ar(r, v, a) : a.reduce((function(a, e) {
          a[e] = Ar(r, v, e);
          return a;
        }), n);
      }
      return n;
    }
    r && each(a, (function(e, t) {
      return zr(r, t, a[t]);
    }));
  }
  var Ir = function getDirectionIsRTL(r) {
    return style(r, "direction") === "rtl";
  };
  var Dr = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var l = style(r, [ v, i, o, u ]);
    return {
      t: Hr(l[v], true),
      r: Hr(l[i], true),
      b: Hr(l[o], true),
      l: Hr(l[u], true)
    };
  };
  var Lr = function getTrasformTranslateValue(r, a) {
    return "translate" + (b(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Rr = "paddingTop";
  var Mr = "paddingRight";
  var kr = "paddingLeft";
  var Vr = "paddingBottom";
  var jr = "marginLeft";
  var Ur = "marginRight";
  var Br = "marginBottom";
  var Fr = "overflowX";
  var Nr = "overflowY";
  var qr = "width";
  var Yr = "height";
  var Wr = "hidden";
  var Gr = {
    w: 0,
    h: 0
  };
  var Xr = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : Gr;
  };
  var Zr = function windowSize(r) {
    return Xr("inner", r || Q);
  };
  var $r = Sr(Xr, "offset");
  var Jr = Sr(Xr, "client");
  var Kr = Sr(Xr, "scroll");
  var Qr = function fractionalSize(r) {
    var a = parseFloat(style(r, qr)) || 0;
    var e = parseFloat(style(r, Yr)) || 0;
    return {
      w: a - er(a),
      h: e - er(e)
    };
  };
  var ra = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var aa = function domRectHasDimensions(r) {
    return !!(r && (r[Yr] || r[qr]));
  };
  var ea = function domRectAppeared(r, a) {
    var e = aa(r);
    var t = aa(a);
    return !t && e;
  };
  var ta = function animationCurrentTime() {
    return performance.now();
  };
  var na = function animateNumber(r, a, e, t, n) {
    var v = 0;
    var i = ta();
    var o = rr(0, e);
    var u = function frame(e) {
      var u = ta();
      var l = u - i;
      var c = l >= o;
      var f = e ? 1 : 1 - (rr(0, i + o - u) / o || 0);
      var s = (a - r) * (p(n) ? n(f, f * o, 0, 1, o) : f) + r;
      var d = c || f === 1;
      t && t(s, f, d);
      v = d ? 0 : vr((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      nr(v);
      r && u(r);
    };
  };
  var va = function equal(r, a, e, t) {
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
  var ia = function equalWH(r, a) {
    return va(r, a, [ "w", "h" ]);
  };
  var oa = function equalXY(r, a) {
    return va(r, a, [ "x", "y" ]);
  };
  var ua = function equalTRBL(r, a) {
    return va(r, a, [ "t", "r", "b", "l" ]);
  };
  var la = function equalBCRWH(r, a, e) {
    return va(r, a, [ qr, Yr ], e && function(r) {
      return er(r);
    });
  };
  var ca;
  var fa = "passive";
  var sa = function supportPassiveEvents() {
    if (u(ca)) {
      ca = false;
      try {
        Q.addEventListener(fa, Y, Object.defineProperty({}, fa, {
          get: function get() {
            ca = true;
          }
        }));
      } catch (r) {}
    }
    return ca;
  };
  var da = function splitEventNames(r) {
    return r.split(" ");
  };
  var pa = function removeEventListener(r, a, e, t) {
    each(da(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var _a = function addEventListener(r, a, e, t) {
    var n;
    var v = sa();
    var i = (n = v && t && t.S) != null ? n : v;
    var o = t && t.O || false;
    var u = t && t.C || false;
    var l = v ? {
      passive: i,
      capture: o
    } : o;
    return Sr(T, da(a).map((function(a) {
      var t = u ? function(n) {
        pa(r, a, t, o);
        e(n);
      } : e;
      r.addEventListener(a, t, l);
      return Sr(pa, r, a, t, o);
    })));
  };
  var ba = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var ha = function preventDefault(r) {
    return r.preventDefault();
  };
  var ga = {
    x: 0,
    y: 0
  };
  var ma = function absoluteCoordinates(r) {
    var a = r && ra(r);
    return a ? {
      x: a.left + Q.pageYOffset,
      y: a.top + Q.pageXOffset
    } : ga;
  };
  var Sa = function getRTLCompatibleScrollPosition(r, a, e) {
    return e ? e.n ? -r : e.i ? a - r : r : r;
  };
  var ya = function getRTLCompatibleScrollBounds(r, a) {
    return [ a ? a.i ? r : 0 : 0, Sa(r, r, a) ];
  };
  var wa = function scrollElementTo(r, a) {
    var e = f(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    f(t) && (r.scrollLeft = t);
    f(n) && (r.scrollTop = n);
  };
  var Oa = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Ca = function manageListener(r, a) {
    each(_(a) ? a : [ a ], r);
  };
  var xa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        Ca((function(r) {
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
        Ca((function(r) {
          p(r) && n.add(r);
        }), t);
        return Sr(e, r, t);
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
      return Sr(T, i);
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
  var Ea = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (p(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Ta = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && H(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ha = {
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
  var Pa = function getOptionsDiff(r, a) {
    var e = {};
    var t = w(P(a), P(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (b(n) && b(v)) {
        A(e[t] = {}, getOptionsDiff(n, v));
        if (z(e[t])) {
          delete e[t];
        }
      } else if (H(a, t) && v !== n) {
        var i = true;
        if (_(n) || _(v)) {
          try {
            if (Ea(n) === Ea(v)) {
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
  var Aa = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Ta(r, t), e || Ta(a, t) !== void 0 ];
    };
  };
  var za = "data-overlayscrollbars";
  var Ia = "os-environment";
  var Da = Ia + "-flexbox-glue";
  var La = Da + "-max";
  var Ra = "os-scrollbar-hidden";
  var Ma = za + "-initialize";
  var ka = za;
  var Va = ka + "-overflow-x";
  var ja = ka + "-overflow-y";
  var Ua = "overflowVisible";
  var Ba = "scrollbarHidden";
  var Fa = "scrollbarPressed";
  var Na = "updating";
  var qa = za + "-viewport";
  var Ya = "arrange";
  var Wa = "scrollbarHidden";
  var Ga = Ua;
  var Xa = za + "-padding";
  var Za = Ga;
  var $a = za + "-content";
  var Ja = "os-size-observer";
  var Ka = Ja + "-appear";
  var Qa = Ja + "-listener";
  var re = Qa + "-scroll";
  var ae = Qa + "-item";
  var ee = ae + "-final";
  var te = "os-trinsic-observer";
  var ne = "os-no-css-vars";
  var ve = "os-theme-none";
  var ie = "os-scrollbar";
  var oe = ie + "-rtl";
  var ue = ie + "-horizontal";
  var le = ie + "-vertical";
  var ce = ie + "-track";
  var fe = ie + "-handle";
  var se = ie + "-visible";
  var de = ie + "-cornerless";
  var pe = ie + "-transitionless";
  var _e = ie + "-interaction";
  var be = ie + "-unusable";
  var he = ie + "-auto-hide";
  var ge = he + "-hidden";
  var me = ie + "-wheel";
  var Se = ce + "-interactive";
  var ye = fe + "-interactive";
  var we = {};
  var Oe = {};
  var Ce = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        we[e] = r[e];
      }));
    }));
  };
  var xe = function registerPluginModuleInstances(r, a, e) {
    return P(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], l = o[1], c = o[2];
      var f = e ? i : v;
      if (f) {
        var s = e ? f(u, l, a) : f(a);
        return (c || Oe)[t] = s;
      }
    }));
  };
  var Ee = function getStaticPluginModuleInstance(r) {
    return Oe[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.T && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Te = {};
  var He = {
    get exports() {
      return Te;
    },
    set exports(r) {
      Te = r;
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
  })(He);
  var Pe = /*@__PURE__*/ getDefaultExportFromCjs(Te);
  var Ae = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var ze = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = Pe({}, a);
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
          if (z(r[i])) {
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
          each(Ae, (function(e, t) {
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
            m = Ae[w] === r;
          }
          O(y, e ? Ae.string : a);
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
  var Ie = function validateOptions(r, a, e) {
    return ze(r, a, e);
  };
  var De = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[De] = {
      static: function _static() {
        var r = Ae.number;
        var a = Ae.boolean;
        var e = [ Ae.array, Ae.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Ae.number, Ae.array, Ae.null ],
            ignoreMutation: [ Ae.function, Ae.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Ae.string, Ae.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Ae.array, Ae.null ]
          }
        };
        return function(r, a) {
          var e = Ie(i, r, a), t = e[0], n = e[1];
          return Pe({}, n, t);
        };
      }
    }, r;
  })();
  var Le = "__osSizeObserverPlugin";
  var Re = /* @__PURE__ */ function(r) {
    return r = {}, r[Le] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = K('<div class="' + ae + '" dir="ltr"><div class="' + ae + '"><div class="' + ee + '"></div></div><div class="' + ae + '"><div class="' + ee + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var l = o.firstChild;
          var c = l == null ? void 0 : l.firstChild;
          var f = $r(o);
          var s = f;
          var d = false;
          var p;
          var _ = function reset() {
            wa(l, n);
            wa(u, n);
          };
          var b = function onResized(r) {
            p = 0;
            if (d) {
              f = s;
              a(r === true);
            }
          };
          var h = function onScroll(r) {
            s = $r(o);
            d = !r || !ia(s, f);
            if (r) {
              ba(r);
              if (d && !p) {
                nr(p);
                p = vr(b);
              }
            } else {
              b(r === false);
            }
            _();
          };
          var g = [ X(r, i), _a(l, v, h), _a(u, v, h) ];
          Er(r, re);
          style(c, (t = {}, t[qr] = n, t[Yr] = n, t));
          vr(_);
          return [ e ? Sr(h, false) : _, g ];
        };
      }
    }, r;
  }();
  var Me = 0;
  var ke = "__osScrollbarsHidingPlugin";
  var Ve = /* @__PURE__ */ function(r) {
    return r = {}, r[ke] = {
      static: function _static() {
        return {
          H: function _createUniqueViewportArrangeElement(r) {
            var a = r.P, e = r.A, t = r.I;
            var n = !t && !a && (e.x || e.y);
            var v = n ? document.createElement("style") : false;
            if (v) {
              I(v, "id", qa + "-" + Ya + "-" + Me);
              Me++;
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
                var _ = o ? Mr : kr;
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
                        y.insertRule("#" + I(t, "id") + " + [" + qa + "~='" + Ya + "']::before {}", 0);
                      }
                      var O = w[0].style;
                      O[qr] = S.w;
                      O[Yr] = S.h;
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
                  _([ Br, Rr, Vr ]);
                }
                if (d) {
                  _([ jr, Ur, kr, Mr ]);
                }
                var b = style(e, P(p));
                R(e, qa, Ya);
                if (!a) {
                  p[Yr] = "";
                }
                style(e, p);
                return [ function() {
                  i(l, o, r, b);
                  style(e, b);
                  R(e, qa, Ya, true);
                }, l ];
              }
              return [ Y ];
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
              var r = Q.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return Q.devicePixelRatio || a / e;
            };
            var t = function diffBiggerThanOne(r, a) {
              var e = tr(r);
              var t = tr(a);
              return !(e === t || e + 1 === t || e - 1 === t);
            };
            return function(n, v) {
              var i = Zr();
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
              var l = {
                w: tr(er(i.w / (r.w / 100))),
                h: tr(er(i.h / (r.h / 100)))
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
  var je = "__osClickScrollPlugin";
  var Ue = /* @__PURE__ */ function(r) {
    return r = {}, r[je] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = Y;
          var o = function animateClickScroll(o) {
            i = na(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var l = a();
              var c = l + t;
              var f = n >= l && n <= c;
              if (u && !f) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var s = ir((function() {
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
  var Fe = function getNativeScrollbarSize(r, a, e, t) {
    X(r, a);
    var n = Jr(a);
    var v = $r(a);
    var i = Qr(e);
    t && W(a);
    return {
      x: v.h - n.h + i.h,
      y: v.w - n.w + i.w
    };
  };
  var Ne = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Er(r, Ra);
    try {
      a = style(r, pr("scrollbar-width")) === "none" || Q.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (t) {}
    e();
    return a;
  };
  var qe = function getRtlScrollBehavior(r, a) {
    var e;
    style(r, (e = {}, e[Fr] = Wr, e[Nr] = Wr, e.direction = "rtl", e));
    wa(r, {
      x: 0
    });
    var t = ma(r);
    var n = ma(a);
    wa(r, {
      x: -999
    });
    var v = ma(a);
    return {
      i: t.x === n.x,
      n: n.x !== v.x
    };
  };
  var Ye = function getFlexboxGlue(r, a) {
    var e = Er(r, Da);
    var t = ra(r);
    var n = ra(a);
    var v = la(n, t, true);
    var i = Er(r, La);
    var o = ra(r);
    var u = ra(a);
    var l = la(u, o, true);
    e();
    i();
    return v && l;
  };
  var We = function createEnvironment() {
    var r = document, e = r.body;
    var t = K('<div class="' + Ia + '"><div></div></div>');
    var n = t[0];
    var v = n.firstChild;
    var i = xa(), o = i[0], u = i[2];
    var l = a({
      v: Fe(e, n, v),
      o: oa
    }, Sr(Fe, e, n, v, true)), c = l[0], f = l[1];
    var s = f(), d = s[0];
    var p = Ne(n);
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
    var h = A({}, Ha);
    var g = Sr(A, {}, h);
    var m = Sr(A, {}, b);
    var S = {
      V: d,
      A: _,
      P: p,
      I: style(n, "zIndex") === "-1",
      j: !!mr,
      U: qe(n, v),
      B: Ye(n, v),
      F: Sr(o, "r"),
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
    L(n, "style");
    W(n);
    Q.addEventListener("resize", (function() {
      var r;
      if (!p && (!_.x || !_.y)) {
        var a = Ee(ke);
        var e = a ? a.k() : Y;
        r = !!e(S, c);
      }
      u("r", [ r ]);
    }));
    return S;
  };
  var Ge = function getEnvironment() {
    if (!Be) {
      Be = We();
    }
    return Be;
  };
  var Xe = function resolveInitialization(r, a) {
    return p(a) ? a.apply(0, r) : a;
  };
  var Ze = function staticInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = Xe(r, n);
    return v || a.apply(0, r);
  };
  var $e = function dynamicInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = Xe(r, n);
    return !!v && (m(v) ? v : a.apply(0, r));
  };
  var Je = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = Ge(), i = v.A, o = v.P, c = v.N;
    var f = c().cancel, s = f.nativeScrollbarsOverlaid, d = f.body;
    var p = t != null ? t : s;
    var _ = u(n) ? d : n;
    var b = (i.x || i.y) && p;
    var h = r && (l(_) ? !o : _);
    return !!b || !!h;
  };
  var Ke = new WeakMap;
  var Qe = function addInstance(r, a) {
    Ke.set(r, a);
  };
  var rt = function removeInstance(r) {
    Ke.delete(r);
  };
  var at = function getInstance(r) {
    return Ke.get(r);
  };
  var et = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || V)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var l = _a(v, i.trim(), (function(r) {
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
  var tt = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.Z, o = v.$, u = v.J, l = v.K, c = v.rr, f = v.ar;
    var s = wr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = et(r, s, u), p = d[0], _ = d[1];
    var b = i || [];
    var h = o || [];
    var g = w(b, h);
    var m = function observerCallback(n, v) {
      if (!x(v)) {
        var i = c || Y;
        var o = f || Y;
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
          var C = w ? I(v, n || "") : null;
          var x = w && f !== C;
          var E = y(h, n) && x;
          if (a && (m || !S)) {
            var T = g && x;
            var H = T && l && U(v, l);
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
            O(a, V(r, e));
            return U(e, r) ? O(a, e) : a;
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
    var S = new br(Sr(m, false));
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
  var nt = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.er, o = v.tr;
    var u = Ee(Le);
    var l = Ge(), c = l.U;
    var f = Sr(Ir, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = K('<div class="' + Ja + '"><div class="' + Qa + '"></div></div>');
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
          var b = aa(s);
          var h = ea(s, p);
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
          var m = t ? r[0] : Ir(l);
          wa(l, {
            x: Sa(n, n, m && c),
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
      if (gr) {
        var b = new gr((function(r) {
          return p(r.pop());
        }));
        b.observe(s);
        O(t, (function() {
          b.disconnect();
        }));
      } else if (u) {
        var h = u(s, p, o), g = h[0], m = h[1];
        O(t, w([ Er(l, Ka), _a(l, "animationstart", g) ], m));
      } else {
        return Y;
      }
      if (i) {
        var S = a({
          v: void 0
        }, f), y = S[0];
        O(t, _a(l, "scroll", (function(r) {
          var a = y();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            xr(s, "ltr rtl");
            Er(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          ba(r);
        })));
      }
      return Sr(T, O(t, X(r, l)));
    };
  };
  var vt = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = J(te);
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
      if (hr) {
        t = new hr(Sr(l, false), {
          root: r
        });
        t.observe(v);
        O(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = $r(v);
          u(r);
        };
        O(a, nt(v, e)());
        e();
      }
      return Sr(T, O(a, X(r, v)));
    }, function() {
      return t && l(true, t.takeRecords());
    } ];
  };
  var it = function createObserversSetup(r, e) {
    var t;
    var n;
    var v;
    var i;
    var o;
    var u = Ge(), l = u.P;
    var c = "[" + ka + "]";
    var d = "[" + qa + "]";
    var b = [ "tabindex" ];
    var h = [ "wrap", "cols", "rows" ];
    var g = [ "id", "class", "style", "open" ];
    var m = {
      ir: false,
      ur: Ir(r.lr)
    };
    var S = r.lr, O = r.cr, C = r.sr, x = r.dr, E = r.pr, T = r._r, H = r.br;
    var z = Ge(), D = z.B, R = z.F;
    var M = a({
      o: ia,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = T(Ga, Ua);
      var a = T(Ya, "");
      var e = a && Oa(O);
      H(Ga, Ua);
      H(Ya, "");
      H("", Na, true);
      var t = Kr(C);
      var n = Kr(O);
      var v = Qr(O);
      H(Ga, Ua, r);
      H(Ya, "", a);
      H("", Na);
      wa(O, e);
      return {
        w: n.w + t.w + v.w,
        h: n.h + t.h + v.h
      };
    })), k = M[0];
    var V = x ? h : w(g, h);
    var j = wr(e, {
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
          var a = I(S, r);
          if (s(a)) {
            I(O, r, a);
          } else {
            L(O, r);
          }
        }
      }));
    };
    var B = function onTrinsicChanged(r, a) {
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
    var F = function onSizeChanged(r) {
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
    var Y = function onContentMutation(r, a) {
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
    var G = C || !D ? vt(S, B) : [], X = G[0], Z = G[1];
    var $ = !E && nt(S, F, {
      tr: true,
      er: true
    });
    var J = tt(S, false, W, {
      $: g,
      Z: w(g, b)
    }), K = J[0], Q = J[1];
    var rr = E && gr && new gr((function(r) {
      var a = r[r.length - 1].contentRect;
      F({
        vr: true,
        tr: ea(a, o)
      });
      o = a;
    }));
    return [ function() {
      U();
      rr && rr.observe(S);
      var r = $ && $();
      var a = X && X();
      var e = K();
      var t = R((function(r) {
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
        var D = tt(C || O, true, Y, {
          Z: w(V, h || []),
          J: S,
          K: c,
          ar: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !E ? q(e, c, d) : false;
            return n || !!N(e, "." + ie) || !!I(r);
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
        var F = Z && Z();
        var G = v && v();
        U && A(u, W(U[0], U[1], z));
        F && A(u, B(F[0], z));
        G && A(u, Y(G[0], z));
      }
      return u;
    }, m ];
  };
  var ot = function capNumber(r, a, e) {
    return rr(r, ar(a, e));
  };
  var ut = function getScrollbarHandleOffsetPercent(r, a, e) {
    var t = er(a);
    var n = ya(t, e), v = n[0], i = n[1];
    var o = (i - r) / i;
    var u = r / v;
    var l = r / i;
    var c = e ? e.n ? o : e.i ? u : l : l;
    return ot(0, 1, c);
  };
  var lt = function getScrollbarHandleLengthRatio(r, a, e, t) {
    if (t) {
      var n = e ? "x" : "y";
      var v = t.Er, i = t.Tr;
      var o = i[n];
      var u = v[n];
      return ot(0, 1, o / (o + u));
    }
    var l = e ? qr : Yr;
    var c = ra(r)[l];
    var f = ra(a)[l];
    return ot(0, 1, c / f);
  };
  var ct = function getScrollbarHandleOffsetRatio(r, a, e, t) {
    var n = lt(r, a, t);
    return 1 / n * (1 - n) * e;
  };
  var ft = function createScrollbarsSetupElements(r, a, e) {
    var t = Ge(), n = t.N, v = t.I;
    var i = n(), o = i.scrollbars;
    var u = o.slot;
    var l = a.Hr, c = a.lr, f = a.cr, s = a.Pr, p = a.Ar, b = a.zr, h = a.pr;
    var g = s ? {} : r, m = g.scrollbars;
    var S = m || {}, C = S.slot;
    var E = new Map;
    var H = function initScrollTimeline(r) {
      return mr && new mr({
        source: p,
        axis: r
      });
    };
    var P = H("x");
    var z = H("y");
    var I = $e([ l, c, f ], (function() {
      return h && b ? l : c;
    }), u, C);
    var D = function doRefreshScrollbarOffset(r) {
      return h && !b && F(r) === f;
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
      var t = e ? Er : xr;
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
    var k = function ratioToCssPercent(r) {
      return (r * 100).toFixed(3) + "%";
    };
    var V = function numberToCssPx(r) {
      return r + "px";
    };
    var j = function scrollbarStructureRefreshHandleLength(r, a, e) {
      M(r, (function(r) {
        var t;
        var n = r.Dr, v = r.Lr;
        return [ n, (t = {}, t[e ? qr : Yr] = k(lt(n, v, e, a)), t) ];
      }));
    };
    var U = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      M(r, (function(r) {
        var t = r.Dr, n = r.Lr, v = r.Ir;
        var i = Ge(), o = i.U;
        var u = e ? "x" : "y";
        var l = e ? "Left" : "Top";
        var c = a.Er;
        var f = Ir(v);
        var s = ct(t, n, ut(p["scroll" + l], c[u], e && f && o), e);
        return [ t, {
          transform: Lr(k(s), e)
        } ];
      }));
    };
    var B = function styleScrollbarPosition(r) {
      var a = r.Ir;
      var e = D(a) && a;
      var t = Oa(p), n = t.x, v = t.y;
      return [ e, {
        transform: e ? Lr({
          x: V(n),
          y: V(v)
        }) : ""
      } ];
    };
    var N = function animateElement(r, a, e, t) {
      return a && r.animate(e, {
        timeline: a,
        composite: t
      });
    };
    var q = function animateScrollbarOffset(r, a, e, t) {
      return N(r, a, {
        transform: [ Lr(V(0), t), Lr(V(rr(0, e - .5)), t) ]
      }, "add");
    };
    var Y = [];
    var G = [];
    var Z = [];
    var $ = function scrollbarsAddRemoveClass(r, a, e) {
      var t = d(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && R(G, r, a);
      v && R(Z, r, a);
    };
    var K = function refreshScrollbarsHandleLength(r) {
      j(G, r, true);
      j(Z, r);
    };
    var Q = function refreshScrollbarsHandleOffset(r) {
      if (!P && !z) {
        U(G, r, true);
        U(Z, r);
      }
    };
    var ar = function refreshScrollbarsHandleOffsetTimeline() {
      var r = function forEachFn(r, a) {
        var e = a.Ir, t = a.Lr, n = a.Dr;
        var v = r && Ir(e);
        var i = Sr(ct, n, t);
        var o = i(v ? 1 : 0, r);
        var u = i(v ? 0 : 1, r);
        L(n);
        E.set(n, [ N(n, r ? P : z, A({
          transform: [ Lr(k(o), r), Lr(k(u), r) ]
        }, v ? {
          clear: [ "left" ]
        } : {})) ]);
      };
      G.forEach(Sr(r, true));
      Z.forEach(Sr(r, false));
    };
    var er = function refreshScrollbarsScrollbarOffset() {
      if (!z && !z) {
        h && M(G, B);
        h && M(Z, B);
      }
    };
    var tr = function refreshScrollbarsScrollbarOffsetTimeline(r) {
      var a = r.Er;
      w(Z, G).forEach((function(r) {
        var e = r.Ir;
        L(e);
        if (D(e)) {
          E.set(e, [ q(e, P, a.x, true), q(e, z, a.y) ]);
        }
      }));
    };
    var nr = function generateScrollbarDOM(r) {
      var a = r ? ue : le;
      var t = r ? G : Z;
      var n = x(t) ? pe : "";
      var i = J(ie + " " + a + " " + n);
      var o = J(ce);
      var u = J(fe);
      var l = {
        Ir: i,
        Lr: o,
        Dr: u
      };
      if (!v) {
        Er(i, ne);
      }
      O(t, l);
      O(Y, [ X(i, o), X(o, u), Sr(W, i), L, e(l, $, r) ]);
      return l;
    };
    var vr = Sr(nr, true);
    var or = Sr(nr, false);
    var ur = function appendElements() {
      X(I, G[0].Ir);
      X(I, Z[0].Ir);
      ir((function() {
        $(pe);
      }), 300);
      return Sr(T, Y);
    };
    vr();
    or();
    return [ {
      Rr: K,
      Mr: Q,
      kr: ar,
      Vr: tr,
      jr: er,
      Ur: $,
      Br: {
        j: P,
        Fr: G,
        Nr: vr,
        qr: Sr(M, G)
      },
      Yr: {
        j: z,
        Fr: Z,
        Nr: or,
        qr: Sr(M, Z)
      }
    }, ur ];
  };
  var st = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.lr, n = a.Ar, v = a.Wr;
    var i = function createInteractiveScrollEvents(a, i) {
      var o = a.Dr, u = a.Lr;
      var l = "scroll" + (i ? "Left" : "Top");
      var c = "client" + (i ? "X" : "Y");
      var f = i ? qr : Yr;
      var s = i ? "left" : "top";
      var d = i ? "w" : "h";
      var p = i ? "x" : "y";
      var _ = "pointerup pointerleave pointercancel lostpointercapture";
      var b = function createRelativeHandleMove(r, a) {
        return function(t) {
          var v = e.Er;
          var i = $r(u)[d] - $r(o)[d];
          var c = a * t / i;
          var f = c * v[p];
          n[l] = r + f;
        };
      };
      return _a(u, "pointerdown", (function(a) {
        var e = N(a.target, "." + fe) === o;
        var i = e ? o : u;
        var p = r.scrollbars;
        var h = a.button, g = a.isPrimary, m = a.pointerType;
        var S = p.pointers;
        var y = h === 0 && g && p[e ? "dragScroll" : "clickScroll"] && (S || []).includes(m);
        R(t, ka, Fa, true);
        if (y) {
          var w = !e && a.shiftKey;
          var C = Sr(ra, o);
          var x = Sr(ra, u);
          var E = function getHandleOffset(r, a) {
            return (r || C())[s] - (a || x())[s];
          };
          var H = er(ra(n)[f]) / $r(n)[d] || 1;
          var P = b(n[l] || 0, 1 / H);
          var A = a[c];
          var z = C();
          var I = x();
          var D = z[f];
          var L = E(z, I) + D / 2;
          var M = A - I[s];
          var k = e ? 0 : M - L;
          var V = function releasePointerCapture(r) {
            T(j);
            i.releasePointerCapture(r.pointerId);
          };
          var j = [ Sr(R, t, ka, Fa), _a(v, _, V), _a(v, "selectstart", (function(r) {
            return ha(r);
          }), {
            S: false
          }), _a(u, _, V), _a(u, "pointermove", (function(r) {
            var a = r[c] - A;
            if (e || w) {
              P(k + a);
            }
          })) ];
          if (w) {
            P(k);
          } else if (!e) {
            var U = Ee(je);
            U && O(j, U(P, E, k, D, M));
          }
          i.setPointerCapture(a.pointerId);
        }
      }));
    };
    return function(r, a, e) {
      var o = r.Ir;
      var u = yr(333), l = u[0], c = u[1];
      var f = !!n.scrollBy;
      var s = true;
      return Sr(T, [ _a(o, "pointerenter", (function() {
        a(_e, true);
      })), _a(o, "pointerleave pointercancel", (function() {
        a(_e, false);
      })), _a(o, "wheel", (function(r) {
        var e = r.deltaX, v = r.deltaY, i = r.deltaMode;
        if (f && s && i === 0 && F(o) === t) {
          n.scrollBy({
            left: e,
            top: v,
            behavior: "smooth"
          });
        }
        s = false;
        a(me, true);
        l((function() {
          s = true;
          a(me);
        }));
        ha(r);
      }), {
        S: false,
        O: true
      }), _a(o, "mousedown", Sr(_a, v, "click", ba, {
        C: true,
        O: true
      }), {
        O: true
      }), i(r, e), c ]);
    };
  };
  var dt = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var l;
    var c;
    var f = Y;
    var s = 0;
    var d = yr(), p = d[0], _ = d[1];
    var b = yr(), h = b[0], g = b[1];
    var m = yr(100), S = m[0], y = m[1];
    var w = yr(100), C = w[0], x = w[1];
    var E = yr(100), H = E[0], P = E[1];
    var A = yr((function() {
      return s;
    })), z = A[0], I = A[1];
    var D = ft(r, n, st(a, n, t)), L = D[0], R = D[1];
    var M = n.lr, k = n.Gr, V = n.zr;
    var j = L.Ur, U = L.Rr, B = L.Mr, F = L.kr, N = L.Vr, q = L.jr;
    var W = function manageAutoHideSuspension(r) {
      j(he, r, true);
      j(he, r, false);
    };
    var G = function manageScrollbarsAutoHide(r, a) {
      I();
      if (r) {
        j(ge);
      } else {
        var e = Sr(j, ge, true);
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
    }, _a(M, "pointerover", Z, {
      C: true
    }), _a(M, "pointerenter", Z), _a(M, "pointerleave", (function(r) {
      if (X(r)) {
        l = false;
        o && G(false);
      }
    })), _a(M, "pointermove", (function(r) {
      X(r) && i && p((function() {
        y();
        G(true);
        C((function() {
          i && G(false);
        }));
      }));
    })), _a(k, "scroll", (function(r) {
      h((function() {
        B(t);
        u && G(true);
        S((function() {
          u && !l && G(false);
        }));
      }));
      v(r);
      q();
    })) ];
    return [ function() {
      return Sr(T, O($, R()));
    }, function(r) {
      var a = r.wr, n = r.Cr, v = r.Xr, l = r.Zr;
      var d = l || {}, p = d.$r, _ = d.Jr, b = d.Kr;
      var h = v || {}, g = h.gr, m = h.tr;
      var S = e.ur;
      var y = Ge(), w = y.A;
      var O = t.Er, C = t.Qr, x = t.ra;
      var E = a("showNativeOverlaidScrollbars"), T = E[0], P = E[1];
      var A = a("scrollbars.theme"), z = A[0], I = A[1];
      var D = a("scrollbars.visibility"), L = D[0], R = D[1];
      var M = a("scrollbars.autoHide"), Y = M[0], X = M[1];
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
        j(se, e, a);
        return e;
      };
      s = Q;
      if (ir) {
        if ($ && or) {
          W(false);
          f();
          H((function() {
            f = _a(k, "scroll", Sr(W, true), {
              C: true
            });
          }));
        } else {
          W(true);
        }
      }
      if (P) {
        j(ve, cr);
      }
      if (I) {
        j(c);
        j(z, true);
        c = z;
      }
      if (J && !$) {
        W(true);
      }
      if (X) {
        i = Y === "move";
        o = Y === "leave";
        u = Y !== "never";
        G(!u, true);
      }
      if (er) {
        j(ye, ar);
      }
      if (vr) {
        j(Se, nr);
      }
      if (lr) {
        var sr = fr(C.x, true);
        var dr = fr(C.y, false);
        var pr = sr && dr;
        j(de, !pr);
      }
      if (ur) {
        U(t);
        B(t);
        F(t);
        q();
        N(t);
        j(be, !O.x, true);
        j(be, !O.y, false);
        j(oe, S && !V);
      }
    }, {}, L ];
  };
  var pt = function createStructureSetupElements(r) {
    var a = Ge();
    var e = a.N, t = a.P;
    var n = Ee(ke);
    var v = n && n.H;
    var i = e(), o = i.elements;
    var u = o.host, l = o.padding, c = o.viewport, f = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, b = _.host, h = _.padding, g = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var C = U(w, "textarea");
    var x = w.ownerDocument;
    var E = x.documentElement;
    var H = w === x.body;
    var A = x.defaultView;
    var z = Sr(Ze, [ w ]);
    var D = Sr($e, [ w ]);
    var k = Sr(Xe, [ w ]);
    var V = Sr(J, "");
    var j = Sr(z, V, c);
    var N = Sr(D, V, f);
    var q = j(g);
    var G = q === w;
    var K = G && H;
    var Q = !G && N(S);
    var rr = !G && m(q) && q === Q;
    var ar = rr && !!k(f);
    var er = ar ? j() : q;
    var tr = ar ? Q : N();
    var nr = rr ? er : q;
    var vr = K ? E : nr;
    var ir = C ? z(V, u, b) : w;
    var or = K ? vr : ir;
    var ur = rr ? tr : Q;
    var lr = x.activeElement;
    var cr = !G && A.top === A && lr === w;
    var fr = {
      Hr: w,
      lr: or,
      cr: vr,
      aa: !G && D(V, l, h),
      sr: ur,
      ea: !G && !t && v && v(a),
      Ar: K ? E : vr,
      Gr: K ? x : vr,
      ta: A,
      Wr: x,
      dr: C,
      zr: H,
      Pr: s,
      pr: G,
      na: rr,
      _r: function _viewportHasClass(r, a) {
        return M(vr, G ? ka : qa, G ? a : r);
      },
      br: function _viewportAddRemoveClass(r, a, e) {
        return R(vr, G ? ka : qa, G ? a : r, e);
      }
    };
    var sr = P(fr).reduce((function(r, a) {
      var e = fr[a];
      return O(r, e && m(e) && !F(e) ? e : false);
    }), []);
    var dr = function elementIsGenerated(r) {
      return r ? y(sr, r) : null;
    };
    var pr = fr.Hr, _r = fr.lr, br = fr.aa, hr = fr.cr, gr = fr.sr, mr = fr.ea;
    var yr = [ function() {
      L(_r, ka);
      L(_r, Ma);
      L(pr, Ma);
      if (H) {
        L(E, ka);
        L(E, Ma);
      }
    } ];
    var wr = C && dr(_r);
    var Or = C ? pr : B([ gr, hr, br, _r, pr ].find((function(r) {
      return dr(r) === false;
    })));
    var Cr = K ? pr : gr || hr;
    var xr = Sr(T, yr);
    var Tr = function appendElements() {
      I(_r, ka, G ? "viewport" : "host");
      I(br, Xa, "");
      I(gr, $a, "");
      if (!G) {
        I(hr, qa, "");
      }
      var r = H && !G ? Er(F(w), Ra) : Y;
      var a = function unwrap(r) {
        X(F(r), B(r));
        W(r);
      };
      if (wr) {
        $(pr, _r);
        O(yr, (function() {
          $(_r, pr);
          W(_r);
        }));
      }
      X(Cr, Or);
      X(_r, br);
      X(br || _r, !G && hr);
      X(hr, gr);
      O(yr, (function() {
        r();
        L(br, Xa);
        L(gr, $a);
        L(hr, Va);
        L(hr, ja);
        L(hr, qa);
        dr(gr) && a(gr);
        dr(hr) && a(hr);
        dr(br) && a(br);
      }));
      if (t && !G) {
        R(hr, qa, Wa, true);
        O(yr, Sr(L, hr, qa));
      }
      if (mr) {
        Z(hr, mr);
        O(yr, Sr(W, mr));
      }
      if (cr) {
        var e = "tabindex";
        var n = I(hr, e);
        I(hr, e, "-1");
        hr.focus();
        var v = function revertViewportTabIndex() {
          return n ? I(hr, e, n) : L(hr, e);
        };
        var i = _a(x, "pointerdown keydown", (function() {
          v();
          i();
        }));
        O(yr, [ v, i ]);
      } else if (lr && lr.focus) {
        lr.focus();
      }
      Or = 0;
      return xr;
    };
    return [ fr, Tr, xr ];
  };
  var _t = function createTrinsicUpdateSegment(r) {
    var a = r.sr;
    return function(r) {
      var e = r.Xr, t = r.va, n = r.Cr;
      var v = Ge(), i = v.B;
      var o = e || {}, u = o.hr;
      var l = t.ir;
      var c = (a || !i) && (u || n);
      if (c) {
        var f;
        style(a, (f = {}, f[Yr] = l ? "" : "100%", f));
      }
    };
  };
  var bt = function createPaddingUpdateSegment(r, e) {
    var t = r.lr, n = r.aa, v = r.cr, i = r.pr;
    var o = a({
      o: ua,
      v: Dr()
    }, Sr(Dr, t, "padding", "")), u = o[0], l = o[1];
    return function(r) {
      var a = r.wr, t = r.Xr, o = r.va, c = r.Cr;
      var f = l(c), s = f[0], d = f[1];
      var p = Ge(), _ = p.P, b = p.B;
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
        var L = (H = {}, H[Ur] = z && !y ? -I : 0, H[Br] = z ? -D : 0, H[jr] = z && y ? -I : 0, 
        H.top = z ? -s.t : 0, H.right = z ? y ? -s.r : "auto" : 0, H.left = z ? y ? "auto" : -s.l : 0, 
        H[qr] = z ? "calc(100% + " + I + "px)" : "", H);
        var R = (P = {}, P[Rr] = z ? s.t : 0, P[Mr] = z ? s.r : 0, P[Vr] = z ? s.b : 0, 
        P[kr] = z ? s.l : 0, P);
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
  var ht = function createOverflowUpdateSegment(r, e) {
    var t = r.lr, n = r.aa, v = r.cr, i = r.ea, o = r.pr, u = r.br, l = r.zr, c = r.ta;
    var f = Sr(rr, 0);
    var s = "visible";
    var d = 42;
    var p = {
      o: ia,
      v: {
        w: 0,
        h: 0
      }
    };
    var _ = {
      o: oa,
      v: {
        x: Wr,
        y: Wr
      }
    };
    var b = function getOverflowAmount(r, a) {
      var e = Q.devicePixelRatio % 1 !== 0 ? 1 : 0;
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
    var g = Ge(), m = g.V, S = g.B, y = g.P, w = g.A;
    var O = Ee(ke);
    var C = !o && !y && (w.x || w.y);
    var x = l && o;
    var E = a(p, Sr(Qr, v)), T = E[0], H = E[1];
    var P = a(p, Sr(Kr, v)), z = P[0], D = P[1];
    var L = a(p), M = L[0], k = L[1];
    var V = a(p), j = V[0], U = V[1];
    var B = a(_), F = B[0];
    var N = function fixFlexboxGlue(r, a) {
      var n;
      style(v, (n = {}, n[Yr] = "", n));
      if (a) {
        var i;
        var o = e.ia, u = e.aa;
        var l = r.ua, c = r.R;
        var f = Qr(t);
        var s = Jr(t);
        var d = style(v, "boxSizing") === "content-box";
        var p = o || d ? u.b + u.t : 0;
        var _ = !(w.x && d);
        style(v, (i = {}, i[Yr] = s.h + f.h + (l.x && _ ? c.x : 0) - p, i));
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
      var n = t(Fr, w.x, m.x), i = n[0], o = n[1], u = n[2], l = n[3];
      var c = t(Nr, w.y, m.y), f = c[0], s = c[1], p = c[2], _ = c[3];
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
    var W = function setViewportOverflowState(r, a, e, t) {
      var n = function setAxisOverflowStyle(r, a) {
        var e = h(r);
        var t = a && e && r.replace(s + "-", "") || "";
        return [ a && !e ? r : "", h(t) ? "hidden" : t ];
      };
      var v = n(e.x, a.x), i = v[0], o = v[1];
      var u = n(e.y, a.y), l = u[0], c = u[1];
      t[Fr] = o && l ? o : i;
      t[Nr] = c && i ? c : l;
      return q(r, t);
    };
    var G = function hideNativeScrollbars(r, a, t, n) {
      var v = r.R, i = r.M;
      var o = i.x, u = i.y;
      var l = v.x, c = v.y;
      var f = e.L;
      var s = a ? jr : Ur;
      var d = a ? kr : Mr;
      var p = f[s];
      var _ = f[Br];
      var b = f[d];
      var h = f[Vr];
      n[qr] = "calc(100% + " + (c + p * -1) + "px)";
      n[s] = -c + p;
      n[Br] = -l + _;
      if (t) {
        n[d] = b + (u ? c : 0);
        n[Vr] = h + (o ? l : 0);
      }
    };
    var X = O ? O.D(C, S, v, i, e, q, G) : [ function() {
      return C;
    }, function() {
      return [ Y ];
    } ], Z = X[0], $ = X[1];
    return function(r, a) {
      var i = r.wr, l = r.Xr, s = r.va, d = r.Cr;
      var p = a.oa;
      var _ = l || {}, g = _.vr, m = _.Sr, O = _.mr, C = _.hr, E = _.gr, P = _.yr;
      var L = s.ir, V = s.ur;
      var B = i("showNativeOverlaidScrollbars"), Y = B[0], X = B[1];
      var J = i("overflow"), K = J[0], Q = J[1];
      var ar = Y && w.x && w.y;
      var er = !o && !S && (g || O || m || X || C);
      var tr = g || p || O || E || P || X;
      var nr = h(K.x);
      var vr = h(K.y);
      var ir = nr || vr;
      var or = H(d);
      var ur = D(d);
      var lr = k(d);
      var cr = U(d);
      var fr;
      if (X && y) {
        u(Wa, Ba, !ar);
      }
      if (er) {
        fr = q(ar);
        N(fr, L);
      }
      if (tr) {
        if (ir) {
          u(Ga, Ua, false);
        }
        var sr = $(ar, V, fr), dr = sr[0], pr = sr[1];
        var _r = or = T(d), br = _r[0], hr = _r[1];
        var gr = ur = z(d), mr = gr[0], Sr = gr[1];
        var yr = Jr(v);
        var wr = mr;
        var Or = yr;
        dr();
        if ((Sr || hr || X) && pr && !ar && Z(pr, mr, br, V)) {
          Or = Jr(v);
          wr = Kr(v);
        }
        var Cr = Zr(c);
        var xr = {
          w: f(rr(mr.w, wr.w) + br.w),
          h: f(rr(mr.h, wr.h) + br.h)
        };
        var Er = {
          w: f((x ? Cr.w : Or.w + f(yr.w - mr.w)) + br.w),
          h: f((x ? Cr.h : Or.h + f(yr.h - mr.h)) + br.h)
        };
        cr = j(Er);
        lr = M(b(xr, Er), d);
      }
      var Tr = cr, Hr = Tr[0], Pr = Tr[1];
      var Ar = lr, zr = Ar[0], Ir = Ar[1];
      var Dr = ur, Lr = Dr[0], Rr = Dr[1];
      var Mr = or, kr = Mr[0], Vr = Mr[1];
      var Yr = {
        x: zr.w > 0,
        y: zr.h > 0
      };
      var Wr = nr && vr && (Yr.x || Yr.y) || nr && Yr.x && !Yr.y || vr && Yr.y && !Yr.x;
      var Gr = p || E || P || Vr || Rr || Pr || Ir || Q || X || er || tr;
      if (Gr) {
        var Xr;
        var $r = (Xr = {}, Xr[Ur] = 0, Xr[Br] = 0, Xr[jr] = 0, Xr[qr] = "", Xr[Fr] = "", 
        Xr[Nr] = "", Xr);
        var Qr = W(ar, Yr, K, $r);
        var ra = Z(Qr, Lr, kr, V);
        if (!o) {
          G(Qr, V, ra, $r);
        }
        if (er) {
          N(Qr, L);
        }
        if (o) {
          I(t, Va, $r[Fr]);
          I(t, ja, $r[Nr]);
        } else {
          style(v, $r);
        }
      }
      R(t, ka, Ua, Wr);
      R(n, Xa, Za, Wr);
      if (!o) {
        R(v, qa, Ga, ir);
      }
      var aa = F(q(ar).Qr), ea = aa[0], ta = aa[1];
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
        ra: Yr
      });
      return {
        Kr: ta,
        $r: Pr,
        Jr: Ir
      };
    };
  };
  var gt = function createStructureSetup(r) {
    var a;
    var e = pt(r), t = e[0], n = e[1], v = e[2];
    var i = {
      aa: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ia: false,
      L: (a = {}, a[Ur] = 0, a[Br] = 0, a[jr] = 0, a[Rr] = 0, a[Mr] = 0, a[Vr] = 0, a[kr] = 0, 
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
        x: Wr,
        y: Wr
      },
      ra: {
        x: false,
        y: false
      }
    };
    var o = t.Hr, u = t.cr, l = t.br, c = t.pr;
    var f = Ge(), s = f.P, d = f.A, p = f.B;
    var _ = !s && (d.x || d.y);
    var b = [ _t(t), bt(t, i), ht(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = _ || !p;
      var t = e && Oa(u);
      l("", Na, true);
      each(b, (function(e) {
        A(a, e(r, a) || {});
      }));
      l("", Na);
      wa(u, t);
      !c && wa(o, 0);
      return a;
    }, i, t, v ];
  };
  var mt = function createSetups(r, a, e, t) {
    var n = gt(r), v = n[0], i = n[1], o = n[2], u = n[3], l = n[4];
    var c = it(u, (function(r) {
      m({}, r);
    })), f = c[0], s = c[1], d = c[2];
    var p = dt(r, a, d, o, u, t), _ = p[0], b = p[1], h = p[3];
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
        wr: Aa(a, l, c),
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
      var S = h || m || !z(l) || c;
      S && e(r, {
        Xr: p,
        Zr: _
      });
      return S;
    };
    return [ function() {
      var r = u.Hr, a = u.cr, e = u.Wr, t = u.zr;
      var n = t ? e.documentElement : r;
      var i = Oa(n);
      var o = [ f(), v(), _() ];
      wa(a, i);
      return Sr(T, o);
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
  var St = function OverlayScrollbars(r, a, e) {
    var t = Ge(), n = t.Y;
    var v = m(r);
    var i = v ? r : r.target;
    var o = at(i);
    if (a && !o) {
      var u = false;
      var l = [];
      var c = {};
      var f = function validateOptions(r) {
        var a = Ee(De);
        return a ? a(r, true) : r;
      };
      var s = A({}, n(), f(a));
      var d = xa(), p = d[0], _ = d[1], b = d[2];
      var h = xa(e), g = h[0], S = h[1], y = h[2];
      var w = function triggerEvent(r, a) {
        y(r, a);
        b(r, a);
      };
      var C = mt(r, s, (function(r, a) {
        var e = r.la, t = r.Cr;
        var n = a.Xr, v = a.Zr;
        var i = n.vr, o = n.gr, u = n.hr, l = n.mr, c = n.Sr, f = n.tr;
        var s = v.$r, d = v.Jr, p = v.Kr;
        w("updated", [ R, {
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
        return w("scroll", [ R, r ]);
      })), x = C[0], E = C[1], H = C[2], I = C[3], D = C[4];
      var L = function destroy(r) {
        rt(i);
        T(l);
        u = true;
        w("destroyed", [ R, r ]);
        _();
        S();
      };
      var R = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Pa(s, A(e, f(r)));
            if (!z(t)) {
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
          var r = I.da, a = r.Hr, e = r.lr, t = r.aa, n = r.cr, v = r.sr, i = r.Ar, o = r.Gr;
          var u = I.pa, l = u.Br, c = u.Yr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Dr, e = r.Lr, t = r.Ir;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Fr, e = r.Nr;
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
        destroy: Sr(L, false),
        plugin: function plugin(r) {
          return c[P(r)[0]];
        }
      };
      O(l, [ D ]);
      Qe(i, R);
      xe(we, OverlayScrollbars, [ R, p, c ]);
      if (Je(I.da.zr, !v && r.cancel)) {
        L(true);
        return R;
      }
      O(l, x());
      w("initialized", [ R ]);
      R.update(true);
      return R;
    }
    return o;
  };
  St.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return xe(r, St)[0];
    }));
    Ce(e);
    return a ? t : t[0];
  };
  St.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return g(e) && !!at(e.target);
  };
  St.env = function() {
    var r = Ge(), a = r.V, e = r.A, t = r.P, n = r.U, v = r.B, i = r.I, o = r.j, u = r.G, l = r.X, c = r.N, f = r.q, s = r.Y, d = r.W;
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
  r.ClickScrollPlugin = Ue;
  r.OverlayScrollbars = St;
  r.ScrollbarsHidingPlugin = Ve;
  r.SizeObserverPlugin = Re;
  Object.defineProperty(r, "T", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
