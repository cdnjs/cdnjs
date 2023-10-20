/*!
 * OverlayScrollbars
 * Version: 2.4.2
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
  var h = function isObject(r) {
    return typeof r === "object" && !_(r) && !l(r);
  };
  var b = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = f(a) && a > -1 && a % 1 == 0;
    return _(r) || !p(r) && e ? a > 0 && h(r) ? a - 1 in r : true : false;
  };
  var g = function isPlainObject(r) {
    if (!r || !h(r) || c(r) !== "object") {
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
  var x = function from(r) {
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
  var C = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var E = function deduplicateArray(r) {
    return x(new Set(r));
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
  var z = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var P = function assignDeep(r, a, e, t, n, v, i) {
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
  var A = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var R = function attr(r, a, e) {
    if (u(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var D = function getValueSet(r, a) {
    return new Set((R(r, a) || "").split(" "));
  };
  var I = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var L = function attrClass(r, a, e, t) {
    if (e) {
      var n = D(r, a);
      n[t ? "add" : "delete"](e);
      var v = x(n).join(" ").trim();
      R(r, a, v);
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
    return r ? x(r.childNodes) : [];
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
  var W = function noop() {};
  var Y = function removeElements(r) {
    if (b(r)) {
      each(x(r), (function(r) {
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
      if (b(e)) {
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
        return Y(e);
      };
    }
    return W;
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
    R(a, "class", r);
    return a;
  };
  var K = function createDOM(r) {
    var a = J();
    a.innerHTML = r.trim();
    return each(B(a), (function(r) {
      return Y(r);
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
  var hr = _r("MutationObserver");
  var br = _r("IntersectionObserver");
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
    var v = W;
    var i = a || {}, o = i.p, u = i._, l = i.g;
    var c = function invokeFunctionToDebounce(a) {
      v();
      or(e);
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
      var r = x(arguments);
      var a = p(o) ? o() : o;
      var i = f(a) && a >= 0;
      if (i) {
        var l = p(u) ? u() : u;
        var _ = f(l) && l >= 0;
        var h = a > 0 ? ir : vr;
        var b = a > 0 ? or : nr;
        var g = s(r);
        var m = g || r;
        var S = c.bind(0, m);
        v();
        var y = h(S, a);
        v = function clear() {
          return b(y);
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
  var xr = function classListAction(r, a, e) {
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
  var Cr = function removeClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Er = function addClass(r, a) {
    xr(r, a, (function(r, a) {
      return r.add(a);
    }));
    return Sr(Cr, r, a);
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
  var zr = function adaptCSSVal(r, a) {
    return !Tr[r] && f(a) ? a + "px" : a;
  };
  var Pr = function getCSSVal(r, a, e) {
    return String((a != null ? a[e] || a.getPropertyValue(e) : r.style[e]) || "");
  };
  var Ar = function setCSSVal(r, a, e) {
    try {
      var t = r.style;
      if (!u(t[a])) {
        t[a] = zr(a, e);
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
        n = e ? Pr(r, v, a) : a.reduce((function(a, e) {
          a[e] = Pr(r, v, e);
          return a;
        }), n);
      }
      return n;
    }
    r && each(a, (function(e, t) {
      return Ar(r, t, a[t]);
    }));
  }
  var Rr = function getDirectionIsRTL(r) {
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
  var Ir = function getTrasformTranslateValue(r, a) {
    return "translate" + (h(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Lr = "paddingTop";
  var Mr = "paddingRight";
  var kr = "paddingLeft";
  var Vr = "paddingBottom";
  var jr = "marginLeft";
  var Ur = "marginRight";
  var Br = "marginBottom";
  var Fr = "overflowX";
  var Nr = "overflowY";
  var qr = "width";
  var Wr = "height";
  var Yr = "hidden";
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
    var e = parseFloat(style(r, Wr)) || 0;
    return {
      w: a - er(a),
      h: e - er(e)
    };
  };
  var ra = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var aa = function domRectHasDimensions(r) {
    return !!(r && (r[Wr] || r[qr]));
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
    return va(r, a, [ qr, Wr ], e && function(r) {
      return er(r);
    });
  };
  var ca;
  var fa = "passive";
  var sa = function supportPassiveEvents() {
    if (u(ca)) {
      ca = false;
      try {
        Q.addEventListener(fa, W, Object.defineProperty({}, fa, {
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
  var ha = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var ba = function preventDefault(r) {
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
  var xa = function manageListener(r, a) {
    each(_(a) ? a : [ a ], r);
  };
  var Ca = function createEventListenerHub(r) {
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
        return Sr(e, r, t);
      }
      if (d(t) && t) {
        e();
      }
      var v = z(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && O(i, addEvent(a, e));
      }));
      return Sr(T, i);
    };
    var n = function triggerEvent(r, e) {
      each(x(a.get(r)), (function(r) {
        if (e && !C(e)) {
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
  var za = function getOptionsDiff(r, a) {
    var e = {};
    var t = w(z(a), z(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (h(n) && h(v)) {
        P(e[t] = {}, getOptionsDiff(n, v));
        if (A(e[t])) {
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
  var Pa = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Ta(r, t), e || Ta(a, t) !== void 0 ];
    };
  };
  var Aa = "data-overlayscrollbars";
  var Ra = "os-environment";
  var Da = Ra + "-flexbox-glue";
  var Ia = Da + "-max";
  var La = "os-scrollbar-hidden";
  var Ma = Aa + "-initialize";
  var ka = Aa;
  var Va = ka + "-overflow-x";
  var ja = ka + "-overflow-y";
  var Ua = "overflowVisible";
  var Ba = "scrollbarHidden";
  var Fa = "scrollbarPressed";
  var Na = "updating";
  var qa = Aa + "-viewport";
  var Wa = "arrange";
  var Ya = "scrollbarHidden";
  var Ga = Ua;
  var Xa = Aa + "-padding";
  var Za = Ga;
  var $a = Aa + "-content";
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
  var he = ie + "-unusable";
  var be = ie + "-auto-hide";
  var ge = be + "-hidden";
  var me = ie + "-wheel";
  var Se = ce + "-interactive";
  var ye = fe + "-interactive";
  var we = {};
  var Oe = {};
  var xe = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        we[e] = r[e];
      }));
    }));
  };
  var Ce = function registerPluginModuleInstances(r, a, e) {
    return z(r).map((function(t) {
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
  var ze = /*@__PURE__*/ getDefaultExportFromCjs(Te);
  var Pe = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ae = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = ze({}, a);
    var i = z(r).filter((function(r) {
      return H(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var l = r[i];
      var f = g(l);
      var d = t ? t + "." : "";
      if (f && g(o)) {
        var p = validateRecursive(l, o, e, d + i), h = p[0], b = p[1];
        n[i] = h;
        v[i] = b;
        each([ v, n ], (function(r) {
          if (A(r[i])) {
            delete r[i];
          }
        }));
      } else if (!f) {
        var m = false;
        var S = [];
        var y = [];
        var w = c(o);
        var x = !_(l) ? [ l ] : l;
        each(x, (function(r) {
          var a;
          each(Pe, (function(e, t) {
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
            m = Pe[w] === r;
          }
          O(y, e ? Pe.string : a);
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
  var Re = function validateOptions(r, a, e) {
    return Ae(r, a, e);
  };
  var De = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[De] = {
      static: function _static() {
        var r = Pe.number;
        var a = Pe.boolean;
        var e = [ Pe.array, Pe.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Pe.number, Pe.array, Pe.null ],
            ignoreMutation: [ Pe.function, Pe.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Pe.string, Pe.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Pe.array, Pe.null ]
          }
        };
        return function(r, a) {
          var e = Re(i, r, a), t = e[0], n = e[1];
          return ze({}, n, t);
        };
      }
    }, r;
  })();
  var Ie = "__osSizeObserverPlugin";
  var Le = /* @__PURE__ */ function(r) {
    return r = {}, r[Ie] = {
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
          var h = function onResized(r) {
            p = 0;
            if (d) {
              f = s;
              a(r === true);
            }
          };
          var b = function onScroll(r) {
            s = $r(o);
            d = !r || !ia(s, f);
            if (r) {
              ha(r);
              if (d && !p) {
                nr(p);
                p = vr(h);
              }
            } else {
              h(r === false);
            }
            _();
          };
          var g = [ X(r, i), _a(l, v, b), _a(u, v, b) ];
          Er(r, re);
          style(c, (t = {}, t[qr] = n, t[Wr] = n, t));
          vr(_);
          return [ e ? Sr(b, false) : _, g ];
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
            var a = r.P, e = r.A, t = r.R;
            var n = !t && !a && (e.x || e.y);
            var v = n ? document.createElement("style") : false;
            if (v) {
              R(v, "id", qa + "-" + Wa + "-" + Me);
              Me++;
            }
            return v;
          },
          D: function _overflowUpdateSegment(r, a, e, t, n, v, i) {
            var o = function arrangeViewport(a, v, i, o) {
              if (r) {
                var u = n.I;
                var l = a.L, c = a.M;
                var f = c.x, s = c.y;
                var d = l.x, p = l.y;
                var _ = o ? Mr : kr;
                var h = u[_];
                var b = u.paddingTop;
                var g = v.w + i.w;
                var m = v.h + i.h;
                var S = {
                  w: p && s ? p + g - h + "px" : "",
                  h: d && f ? d + m - b + "px" : ""
                };
                if (t) {
                  var y = t.sheet;
                  if (y) {
                    var w = y.cssRules;
                    if (w) {
                      if (!w.length) {
                        y.insertRule("#" + R(t, "id") + " + [" + qa + "~='" + Wa + "']::before {}", 0);
                      }
                      var O = w[0].style;
                      O[qr] = S.w;
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
                var c = n.I;
                var f = l.M;
                var s = f.x, d = f.y;
                var p = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    p[r] = c[r];
                  }));
                };
                if (s) {
                  _([ Br, Lr, Vr ]);
                }
                if (d) {
                  _([ jr, Ur, kr, Mr ]);
                }
                var h = style(e, z(p));
                L(e, qa, Wa);
                if (!a) {
                  p[Wr] = "";
                }
                style(e, p);
                return [ function() {
                  i(l, o, r, h);
                  style(e, h);
                  L(e, qa, Wa, true);
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
            return function(n, v, i) {
              var o = Zr();
              var u = {
                w: o.w - r.w,
                h: o.h - r.h
              };
              if (u.w === 0 && u.h === 0) {
                return;
              }
              var l = {
                w: tr(u.w),
                h: tr(u.h)
              };
              var c = {
                w: tr(er(o.w / (r.w / 100))),
                h: tr(er(o.h / (r.h / 100)))
              };
              var f = e();
              var s = l.w > 2 && l.h > 2;
              var d = !t(c.w, c.h);
              var p = f !== a && f > 0;
              var _ = s && d && p;
              if (_) {
                var h = v(), b = h[0], g = h[1];
                P(n.V, b);
                if (g) {
                  i();
                }
              }
              r = o;
              a = f;
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
          var i = W;
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
    t && Y(a);
    return {
      x: v.h - n.h + i.h,
      y: v.w - n.w + i.w
    };
  };
  var Ne = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Er(r, La);
    try {
      a = style(r, pr("scrollbar-width")) === "none" || Q.getComputedStyle(r, "::-webkit-scrollbar").getPropertyValue("display") === "none";
    } catch (t) {}
    e();
    return a;
  };
  var qe = function getRtlScrollBehavior(r, a) {
    var e;
    style(r, (e = {}, e[Fr] = Yr, e[Nr] = Yr, e.direction = "rtl", e));
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
  var We = function getFlexboxGlue(r, a) {
    var e = Er(r, Da);
    var t = ra(r);
    var n = ra(a);
    var v = la(n, t, true);
    var i = Er(r, Ia);
    var o = ra(r);
    var u = ra(a);
    var l = la(u, o, true);
    e();
    i();
    return v && l;
  };
  var Ye = function createEnvironment() {
    var r = document, e = r.body;
    var t = K('<div class="' + Ra + '"><div></div></div>');
    var n = t[0];
    var v = n.firstChild;
    var i = Ca(), o = i[0], u = i[2];
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
    var b = P({}, Ha);
    var g = Sr(P, {}, b);
    var m = Sr(P, {}, h);
    var S = {
      V: d,
      A: _,
      P: p,
      R: style(n, "zIndex") === "-1",
      j: !!mr,
      U: qe(n, v),
      B: We(n, v),
      F: Sr(o, "z"),
      N: Sr(o, "r"),
      q: m,
      W: function _setDefaultInitialization(r) {
        return P(h, r) && m();
      },
      Y: g,
      G: function _setDefaultOptions(r) {
        return P(b, r) && g();
      },
      X: P({}, h),
      Z: P({}, b)
    };
    var y = Sr(_a, Q, "resize");
    var w = wr((function(r) {
      return u(r, []);
    }), {
      p: 33,
      _: 99
    });
    I(n, "style");
    Y(n);
    y(Sr(w, "r"));
    if (!p && (!_.x || !_.y)) {
      y((function() {
        var r = Ee(ke);
        var a = r ? r.k() : W;
        a(S, c, Sr(w, "z"));
      }));
    }
    return S;
  };
  var Ge = function getEnvironment() {
    if (!Be) {
      Be = Ye();
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
    var v = Ge(), i = v.A, o = v.P, c = v.q;
    var f = c().cancel, s = f.nativeScrollbarsOverlaid, d = f.body;
    var p = t != null ? t : s;
    var _ = u(n) ? d : n;
    var h = (i.x || i.y) && p;
    var b = r && (l(_) ? !o : _);
    return !!h || !!b;
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
    var v = t || {}, i = v.$, o = v.J, u = v.K, l = v.rr, c = v.ar, f = v.er;
    var s = wr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = et(r, s, u), p = d[0], _ = d[1];
    var h = i || [];
    var b = o || [];
    var g = w(h, b);
    var m = function observerCallback(n, v) {
      if (!C(v)) {
        var i = c || W;
        var o = f || W;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, c = e.type, f = e.oldValue, _ = e.addedNodes, h = e.removedNodes;
          var g = c === "attributes";
          var m = c === "childList";
          var S = r === v;
          var w = g && n;
          var x = w ? R(v, n || "") : null;
          var C = w && f !== x;
          var E = y(b, n) && C;
          if (a && (m || !S)) {
            var T = g && C;
            var H = T && l && U(v, l);
            var z = H ? !i(v, n, f, x) : !g || T;
            var P = z && !o(e, !!H, r, t);
            each(_, (function(r) {
              return O(u, r);
            }));
            each(h, (function(r) {
              return O(u, r);
            }));
            p = p || P;
          }
          if (!a && S && C && !i(v, n, f, x)) {
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
        if (!C(s) || d) {
          var h = [ E(s), d ];
          !n && e.apply(0, h);
          return h;
        }
      }
    };
    var S = new hr(Sr(m, false));
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
    var n = false;
    var v = 3333333;
    var i = t || {}, o = i.tr, u = i.nr, l = i.vr;
    var c = Ee(Ie);
    var f = Ge(), s = f.U;
    var d = Sr(Rr, r);
    var p = yr(33), h = p[0], b = p[1];
    var g = a({
      v: false,
      u: true
    }), m = g[0];
    return function() {
      var t = [ b, _a(Q, "resize", (function() {
        n = !!l;
        h((function() {
          n = false;
        }));
      })) ];
      var i = K('<div class="' + Ja + '"><div class="' + Qa + '"></div></div>');
      var f = i[0];
      var p = f.firstChild;
      var g = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = !a && _(r);
        var i = false;
        var u = false;
        var l = true;
        if (a) {
          var c = m(r.contentRect), d = c[0], p = c[2];
          var h = aa(d);
          var b = ea(d, p);
          var g = !p;
          u = g || b;
          i = !u && (!h || n);
          l = !i;
        } else if (t) {
          l = r[1];
        } else {
          u = r === true;
        }
        if (o && l) {
          var S = t ? r[0] : Rr(f);
          wa(f, {
            x: Sa(v, v, S && s),
            y: v
          });
        }
        if (!i) {
          e({
            ir: t ? r : void 0,
            ur: !t,
            nr: u
          });
        }
        n = false;
      };
      if (gr) {
        var S = new gr((function(r) {
          return g(r.pop());
        }));
        S.observe(p);
        O(t, (function() {
          S.disconnect();
        }));
      } else if (c) {
        var y = c(p, g, u), x = y[0], C = y[1];
        O(t, w([ Er(f, Ka), _a(f, "animationstart", x) ], C));
      } else {
        return W;
      }
      if (o) {
        var E = a({
          v: void 0
        }, d), H = E[0];
        O(t, _a(f, "scroll", (function(r) {
          var a = H();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Cr(p, "ltr rtl");
            Er(p, e ? "rtl" : "ltr");
            g([ !!e, t, n ]);
          }
          ha(r);
        })));
      }
      return Sr(T, O(t, X(r, f)));
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
      if (br) {
        t = new br(Sr(l, false), {
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
    var h = [ "tabindex" ];
    var b = [ "wrap", "cols", "rows" ];
    var g = [ "id", "class", "style", "open" ];
    var m = {
      lr: false,
      cr: Rr(r.sr)
    };
    var S = r.sr, O = r.dr, x = r.pr, C = r._r, E = r.hr, T = r.br, H = r.gr;
    var A = Ge(), D = A.B;
    var L = a({
      o: ia,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = T(Ga, Ua);
      var a = T(Wa, "");
      var e = a && Oa(O);
      H(Ga, Ua);
      H(Wa, "");
      H("", Na, true);
      var t = Kr(x);
      var n = Kr(O);
      var v = Qr(O);
      H(Ga, Ua, r);
      H(Wa, "", a);
      H("", Na);
      wa(O, e);
      return {
        w: n.w + t.w + v.w,
        h: n.h + t.h + v.h
      };
    })), M = L[0];
    var k = C ? b : w(g, b);
    var V = wr(e, {
      p: function _timeout() {
        return t;
      },
      _: function _maxDelay() {
        return n;
      },
      g: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ w(z(e), z(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var j = function updateViewportAttrsFromHost(r) {
      each(r || h, (function(r) {
        if (y(h, r)) {
          var a = R(S, r);
          if (s(a)) {
            R(O, r, a);
          } else {
            I(O, r);
          }
        }
      }));
    };
    var U = function onTrinsicChanged(r, a) {
      var t = r[0], n = r[1];
      var v = {
        mr: n
      };
      P(m, {
        lr: t
      });
      !a && e(v);
      return v;
    };
    var B = function onSizeChanged(r) {
      var a = r.ur, t = r.ir, n = r.nr;
      var v = a && !n && !t;
      var i = !v && l ? V : e;
      var o = t || [], u = o[0], c = o[1];
      t && P(m, {
        cr: u
      });
      i({
        ur: a || n,
        nr: n,
        Sr: c
      });
    };
    var F = function onContentMutation(r, a) {
      var t = M(), n = t[1];
      var v = {
        yr: n
      };
      var i = r ? e : V;
      n && !a && i(v);
      return v;
    };
    var W = function onHostMutation(r, a, e) {
      var t = {
        wr: a
      };
      if (a && !e) {
        V(t);
      } else if (!E) {
        j(r);
      }
      return t;
    };
    var Y = x || !D ? vt(S, U) : [], G = Y[0], X = Y[1];
    var Z = !E && nt(S, B, {
      nr: true,
      tr: true,
      vr: true
    });
    var $ = tt(S, false, W, {
      J: g,
      $: w(g, h)
    }), J = $[0], K = $[1];
    var Q = E && gr && new gr((function(r) {
      var a = r[r.length - 1].contentRect;
      B({
        ur: true,
        nr: ea(a, o)
      });
      o = a;
    }));
    return [ function() {
      j();
      Q && Q.observe(S);
      var r = Z && Z();
      var a = G && G();
      var e = J();
      return function() {
        Q && Q.disconnect();
        r && r();
        a && a();
        i && i();
        e();
      };
    }, function(r) {
      var a = r.Or, e = r.Cr, o = r.Er;
      var u = {};
      var l = a("update.ignoreMutation"), s = l[0];
      var h = a("update.attributes"), b = h[0], g = h[1];
      var m = a("update.elementEvents"), S = m[0], y = m[1];
      var C = a("update.debounce"), T = C[0], H = C[1];
      var z = y || g;
      var A = e || o;
      var R = function ignoreMutationFromOptions(r) {
        return p(s) && s(r);
      };
      if (z) {
        v && v();
        i && i();
        var D = tt(x || O, true, F, {
          $: w(k, b || []),
          K: S,
          rr: c,
          er: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !E ? q(e, c, d) : false;
            return n || !!N(e, "." + ie) || !!R(r);
          }
        }), I = D[0], L = D[1];
        i = I();
        v = L;
      }
      if (H) {
        V.m();
        if (_(T)) {
          var M = T[0];
          var j = T[1];
          t = f(M) && M;
          n = f(j) && j;
        } else if (f(T)) {
          t = T;
          n = false;
        } else {
          t = false;
          n = false;
        }
      }
      if (A) {
        var B = K();
        var Y = X && X();
        var G = v && v();
        B && P(u, W(B[0], B[1], A));
        Y && P(u, U(Y[0], A));
        G && P(u, F(G[0], A));
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
      var v = t.Tr, i = t.Hr;
      var o = i[n];
      var u = v[n];
      return ot(0, 1, o / (o + u));
    }
    var l = e ? qr : Wr;
    var c = ra(r)[l];
    var f = ra(a)[l];
    return ot(0, 1, c / f);
  };
  var ct = function getScrollbarHandleOffsetRatio(r, a, e, t, n, v) {
    var i = Ge(), o = i.U;
    var u = v ? "x" : "y";
    var l = v ? "Left" : "Top";
    var c = t.Tr;
    var f = lt(r, a, v);
    return 1 / f * (1 - f) * ut(e["scroll" + l], c[u], v && n && o);
  };
  var ft = function createScrollbarsSetupElements(r, a, e) {
    var t = Ge(), n = t.q, v = t.R;
    var i = n(), o = i.scrollbars;
    var u = o.slot;
    var l = a.zr, c = a.sr, f = a.dr, s = a.Pr, p = a.Ar, h = a.Rr, b = a.hr;
    var g = s ? {} : r, m = g.scrollbars;
    var S = m || {}, x = S.slot;
    var E = new Map;
    var H = function initScrollTimeline(r) {
      return mr && new mr({
        source: p,
        axis: r
      });
    };
    var z = H("x");
    var P = H("y");
    var A = $e([ l, c, f ], (function() {
      return b && h ? l : c;
    }), u, x);
    var R = function doRefreshScrollbarOffset(r) {
      return b && !h && F(r) === f;
    };
    var D = function cancelElementAnimations(r) {
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
    var I = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Er : Cr;
      each(r, (function(r) {
        t(r.Dr, a);
      }));
    };
    var L = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        style(t, n);
      }));
    };
    var M = function scrollbarStructureRefreshHandleLength(r, a, e) {
      L(r, (function(r) {
        var t;
        var n = r.Ir, v = r.Lr;
        return [ n, (t = {}, t[e ? qr : Wr] = (lt(n, v, e, a) * 100).toFixed(3) + "%", t) ];
      }));
    };
    var k = function scrollbarStructureRefreshHandleOffset(r, a, e) {
      if (!P && !P) {
        L(r, (function(r) {
          var t = r.Ir, n = r.Lr, v = r.Dr;
          var i = ct(t, n, p, a, Rr(v), e);
          var o = i === i;
          return [ t, {
            transform: o ? Ir((i * 100).toFixed(3) + "%", e) : ""
          } ];
        }));
      }
    };
    var V = function styleScrollbarPosition(r) {
      var a = r.Dr;
      var e = R(a) && a;
      var t = Oa(p);
      return [ e, {
        transform: e ? Ir({
          x: t.x + "px",
          y: t.y + "px"
        }) : ""
      } ];
    };
    var j = function animateElement(r, a, e, t) {
      return a && r.animate(e, {
        timeline: a,
        composite: t
      });
    };
    var U = function animateScrollbarOffset(r, a, e, t) {
      return j(r, a, {
        transform: [ Ir("0px", t), Ir(rr(0, e - .5) + "px", t) ]
      }, "add");
    };
    var B = [];
    var N = [];
    var q = [];
    var W = function scrollbarsAddRemoveClass(r, a, e) {
      var t = d(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && I(N, r, a);
      v && I(q, r, a);
    };
    var G = function refreshScrollbarsHandleLength(r) {
      M(N, r, true);
      M(q, r);
    };
    var Z = function refreshScrollbarsHandleOffset(r) {
      k(N, r, true);
      k(q, r);
    };
    var $ = function refreshScrollbarsHandleOffsetTimeline() {
      var r = function forEachFn(r, a) {
        var e;
        var t = a.Dr, n = a.Ir;
        var v = r && Rr(t);
        D(n);
        E.set(n, [ j(n, r ? z : P, (e = {
          transform: [ Ir("0%", r), Ir(r && v ? "100%" : "-100%", r) ]
        }, e[r ? v ? "right" : "left" : "top"] = [ "0%", "100%" ], e)) ]);
      };
      N.forEach(Sr(r, true));
      q.forEach(Sr(r, false));
    };
    var K = function refreshScrollbarsScrollbarOffset() {
      if (!P && !P) {
        b && L(N, V);
        b && L(q, V);
      }
    };
    var Q = function refreshScrollbarsScrollbarOffsetTimeline(r) {
      var a = r.Tr;
      w(q, N).forEach((function(r) {
        var e = r.Dr;
        D(e);
        if (R(e)) {
          E.set(e, [ U(e, z, a.x, true), U(e, P, a.y) ]);
        }
      }));
    };
    var ar = function generateScrollbarDOM(r) {
      var a = r ? ue : le;
      var t = r ? N : q;
      var n = C(t) ? pe : "";
      var i = J(ie + " " + a + " " + n);
      var o = J(ce);
      var u = J(fe);
      var l = {
        Dr: i,
        Lr: o,
        Ir: u
      };
      if (!v) {
        Er(i, ne);
      }
      O(t, l);
      O(B, [ X(i, o), X(o, u), Sr(Y, i), D, e(l, W, r) ]);
      return l;
    };
    var er = Sr(ar, true);
    var tr = Sr(ar, false);
    var nr = function appendElements() {
      X(A, N[0].Dr);
      X(A, q[0].Dr);
      ir((function() {
        W(pe);
      }), 300);
      return Sr(T, B);
    };
    er();
    tr();
    return [ {
      Mr: G,
      kr: Z,
      Vr: $,
      jr: Q,
      Ur: K,
      Br: W,
      Fr: {
        j: z,
        Nr: N,
        qr: er,
        Wr: Sr(L, N)
      },
      Yr: {
        j: P,
        Nr: q,
        qr: tr,
        Wr: Sr(L, q)
      }
    }, nr ];
  };
  var st = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.sr, n = a.Ar, v = a.Gr;
    var i = function createInteractiveScrollEvents(a, i) {
      var o = a.Ir, u = a.Lr;
      var l = "scroll" + (i ? "Left" : "Top");
      var c = "client" + (i ? "X" : "Y");
      var f = i ? qr : Wr;
      var s = i ? "left" : "top";
      var d = i ? "w" : "h";
      var p = i ? "x" : "y";
      var _ = "pointerup pointerleave pointercancel lostpointercapture";
      var h = function createRelativeHandleMove(r, a) {
        return function(t) {
          var v = e.Tr;
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
        var b = a.button, g = a.isPrimary, m = a.pointerType;
        var S = p.pointers;
        var y = b === 0 && g && p[e ? "dragScroll" : "clickScroll"] && (S || []).includes(m);
        L(t, ka, Fa, true);
        if (y) {
          var w = !e && a.shiftKey;
          var x = Sr(ra, o);
          var C = Sr(ra, u);
          var E = function getHandleOffset(r, a) {
            return (r || x())[s] - (a || C())[s];
          };
          var H = er(ra(n)[f]) / $r(n)[d] || 1;
          var z = h(n[l] || 0, 1 / H);
          var P = a[c];
          var A = x();
          var R = C();
          var D = A[f];
          var I = E(A, R) + D / 2;
          var M = P - R[s];
          var k = e ? 0 : M - I;
          var V = function releasePointerCapture(r) {
            T(j);
            i.releasePointerCapture(r.pointerId);
          };
          var j = [ Sr(L, t, ka, Fa), _a(v, _, V), _a(v, "selectstart", (function(r) {
            return ba(r);
          }), {
            S: false
          }), _a(u, _, V), _a(u, "pointermove", (function(r) {
            var a = r[c] - P;
            if (e || w) {
              z(k + a);
            }
          })) ];
          if (w) {
            z(k);
          } else if (!e) {
            var U = Ee(je);
            U && O(j, U(z, E, k, D, M));
          }
          i.setPointerCapture(a.pointerId);
        }
      }));
    };
    return function(r, a, e) {
      var o = r.Dr;
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
        ba(r);
      }), {
        S: false,
        O: true
      }), _a(o, "mousedown", Sr(_a, v, "click", ha, {
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
    var f = W;
    var s = 0;
    var d = yr(), p = d[0], _ = d[1];
    var h = yr(), b = h[0], g = h[1];
    var m = yr(100), S = m[0], y = m[1];
    var w = yr(100), x = w[0], C = w[1];
    var E = yr(100), H = E[0], z = E[1];
    var P = yr((function() {
      return s;
    })), A = P[0], R = P[1];
    var D = ft(r, n, st(a, n, t)), I = D[0], L = D[1];
    var M = n.sr, k = n.Xr, V = n.Rr;
    var j = I.Br, U = I.Mr, B = I.kr, F = I.Vr, N = I.jr, q = I.Ur;
    var Y = function manageAutoHideSuspension(r) {
      j(be, r, true);
      j(be, r, false);
    };
    var G = function manageScrollbarsAutoHide(r, a) {
      R();
      if (r) {
        j(ge);
      } else {
        var e = Sr(j, ge, true);
        if (s > 0 && !a) {
          A(e);
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
    var $ = [ y, R, C, z, g, _, function() {
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
        x((function() {
          i && G(false);
        }));
      }));
    })), _a(k, "scroll", (function(r) {
      b((function() {
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
      return Sr(T, O($, L()));
    }, function(r) {
      var a = r.Or, n = r.Er, v = r.Zr, l = r.$r;
      var d = l || {}, p = d.Jr, _ = d.Kr, h = d.Qr;
      var b = v || {}, g = b.Sr, m = b.nr;
      var S = e.cr;
      var y = Ge(), w = y.A;
      var O = t.Tr, x = t.ra, C = t.aa;
      var E = a("showNativeOverlaidScrollbars"), T = E[0], z = E[1];
      var P = a("scrollbars.theme"), A = P[0], R = P[1];
      var D = a("scrollbars.visibility"), I = D[0], L = D[1];
      var M = a("scrollbars.autoHide"), W = M[0], X = M[1];
      var Z = a("scrollbars.autoHideSuspend"), $ = Z[0], J = Z[1];
      var K = a("scrollbars.autoHideDelay"), Q = K[0];
      var rr = a("scrollbars.dragScroll"), ar = rr[0], er = rr[1];
      var tr = a("scrollbars.clickScroll"), nr = tr[0], vr = tr[1];
      var ir = m && !n;
      var or = C.x || C.y;
      var ur = p || _ || g || n;
      var lr = h || L;
      var cr = T && w.x && w.y;
      var fr = function setScrollbarVisibility(r, a) {
        var e = I === "visible" || I === "auto" && r === "scroll";
        j(se, e, a);
        return e;
      };
      s = Q;
      if (ir) {
        if ($ && or) {
          Y(false);
          f();
          H((function() {
            f = _a(k, "scroll", Sr(Y, true), {
              C: true
            });
          }));
        } else {
          Y(true);
        }
      }
      if (z) {
        j(ve, cr);
      }
      if (R) {
        j(c);
        j(A, true);
        c = A;
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
        j(ye, ar);
      }
      if (vr) {
        j(Se, nr);
      }
      if (lr) {
        var sr = fr(x.x, true);
        var dr = fr(x.y, false);
        var pr = sr && dr;
        j(de, !pr);
      }
      if (ur) {
        U(t);
        B(t);
        F(t);
        q();
        N(t);
        j(he, !O.x, true);
        j(he, !O.y, false);
        j(oe, S && !V);
      }
    }, {}, I ];
  };
  var pt = function createStructureSetupElements(r) {
    var a = Ge();
    var e = a.q, t = a.P;
    var n = Ee(ke);
    var v = n && n.H;
    var i = e(), o = i.elements;
    var u = o.host, l = o.padding, c = o.viewport, f = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, h = _.host, b = _.padding, g = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var x = U(w, "textarea");
    var C = w.ownerDocument;
    var E = C.documentElement;
    var H = w === C.body;
    var P = C.defaultView;
    var A = Sr(Ze, [ w ]);
    var D = Sr($e, [ w ]);
    var k = Sr(Xe, [ w ]);
    var V = Sr(J, "");
    var j = Sr(A, V, c);
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
    var ir = x ? A(V, u, h) : w;
    var or = K ? vr : ir;
    var ur = rr ? tr : Q;
    var lr = C.activeElement;
    var cr = !G && P.top === P && lr === w;
    var fr = {
      zr: w,
      sr: or,
      dr: vr,
      ea: !G && D(V, l, b),
      pr: ur,
      ta: !G && !t && v && v(a),
      Ar: K ? E : vr,
      Xr: K ? C : vr,
      na: P,
      Gr: C,
      _r: x,
      Rr: H,
      Pr: s,
      hr: G,
      va: rr,
      br: function _viewportHasClass(r, a) {
        return M(vr, G ? ka : qa, G ? a : r);
      },
      gr: function _viewportAddRemoveClass(r, a, e) {
        return L(vr, G ? ka : qa, G ? a : r, e);
      }
    };
    var sr = z(fr).reduce((function(r, a) {
      var e = fr[a];
      return O(r, e && m(e) && !F(e) ? e : false);
    }), []);
    var dr = function elementIsGenerated(r) {
      return r ? y(sr, r) : null;
    };
    var pr = fr.zr, _r = fr.sr, hr = fr.ea, br = fr.dr, gr = fr.pr, mr = fr.ta;
    var yr = [ function() {
      I(_r, ka);
      I(_r, Ma);
      I(pr, Ma);
      if (H) {
        I(E, ka);
        I(E, Ma);
      }
    } ];
    var wr = x && dr(_r);
    var Or = x ? pr : B([ gr, br, hr, _r, pr ].find((function(r) {
      return dr(r) === false;
    })));
    var xr = K ? pr : gr || br;
    var Cr = Sr(T, yr);
    var Tr = function appendElements() {
      R(_r, ka, G ? "viewport" : "host");
      R(hr, Xa, "");
      R(gr, $a, "");
      if (!G) {
        R(br, qa, "");
      }
      var r = H && !G ? Er(F(w), La) : W;
      var a = function unwrap(r) {
        X(F(r), B(r));
        Y(r);
      };
      if (wr) {
        $(pr, _r);
        O(yr, (function() {
          $(_r, pr);
          Y(_r);
        }));
      }
      X(xr, Or);
      X(_r, hr);
      X(hr || _r, !G && br);
      X(br, gr);
      O(yr, (function() {
        r();
        I(hr, Xa);
        I(gr, $a);
        I(br, Va);
        I(br, ja);
        I(br, qa);
        dr(gr) && a(gr);
        dr(br) && a(br);
        dr(hr) && a(hr);
      }));
      if (t && !G) {
        L(br, qa, Ya, true);
        O(yr, Sr(I, br, qa));
      }
      if (mr) {
        Z(br, mr);
        O(yr, Sr(Y, mr));
      }
      if (cr) {
        var e = "tabindex";
        var n = R(br, e);
        R(br, e, "-1");
        br.focus();
        var v = function revertViewportTabIndex() {
          return n ? R(br, e, n) : I(br, e);
        };
        var i = _a(C, "pointerdown keydown", (function() {
          v();
          i();
        }));
        O(yr, [ v, i ]);
      } else if (lr && lr.focus) {
        lr.focus();
      }
      Or = 0;
      return Cr;
    };
    return [ fr, Tr, Cr ];
  };
  var _t = function createTrinsicUpdateSegment(r) {
    var a = r.pr;
    return function(r) {
      var e = r.Zr, t = r.ia, n = r.Er;
      var v = Ge(), i = v.B;
      var o = e || {}, u = o.mr;
      var l = t.lr;
      var c = (a || !i) && (u || n);
      if (c) {
        var f;
        style(a, (f = {}, f[Wr] = l ? "" : "100%", f));
      }
    };
  };
  var ht = function createPaddingUpdateSegment(r, e) {
    var t = r.sr, n = r.ea, v = r.dr, i = r.hr;
    var o = a({
      o: ua,
      v: Dr()
    }, Sr(Dr, t, "padding", "")), u = o[0], l = o[1];
    return function(r) {
      var a = r.Or, t = r.Zr, o = r.ia, c = r.Er;
      var f = l(c), s = f[0], d = f[1];
      var p = Ge(), _ = p.P, h = p.B;
      var b = t || {}, g = b.ur, m = b.yr, S = b.Sr;
      var y = o.cr;
      var w = a("paddingAbsolute"), O = w[0], x = w[1];
      var C = c || !h && m;
      if (g || d || C) {
        var E = u(c);
        s = E[0];
        d = E[1];
      }
      var T = !i && (x || S || d);
      if (T) {
        var H, z;
        var A = !O || !n && !_;
        var R = s.r + s.l;
        var D = s.t + s.b;
        var I = (H = {}, H[Ur] = A && !y ? -R : 0, H[Br] = A ? -D : 0, H[jr] = A && y ? -R : 0, 
        H.top = A ? -s.t : 0, H.right = A ? y ? -s.r : "auto" : 0, H.left = A ? y ? "auto" : -s.l : 0, 
        H[qr] = A ? "calc(100% + " + R + "px)" : "", H);
        var L = (z = {}, z[Lr] = A ? s.t : 0, z[Mr] = A ? s.r : 0, z[Vr] = A ? s.b : 0, 
        z[kr] = A ? s.l : 0, z);
        style(n || v, I);
        style(v, L);
        P(e, {
          ea: s,
          oa: !A,
          I: n ? L : P({}, I, L)
        });
      }
      return {
        ua: T
      };
    };
  };
  var bt = function createOverflowUpdateSegment(r, e) {
    var t = r.sr, n = r.ea, v = r.dr, i = r.ta, o = r.hr, u = r.gr, l = r.Rr, c = r.na;
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
        x: Yr,
        y: Yr
      }
    };
    var h = function getOverflowAmount(r, a) {
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
    var b = function overflowIsVisible(r) {
      return r.indexOf(s) === 0;
    };
    var g = Ge(), m = g.V, S = g.B, y = g.P, w = g.A;
    var O = Ee(ke);
    var x = !o && !y && (w.x || w.y);
    var C = l && o;
    var E = a(p, Sr(Qr, v)), T = E[0], H = E[1];
    var z = a(p, Sr(Kr, v)), A = z[0], D = z[1];
    var I = a(p), M = I[0], k = I[1];
    var V = a(p), j = V[0], U = V[1];
    var B = a(_), F = B[0];
    var N = function fixFlexboxGlue(r, a) {
      var n;
      style(v, (n = {}, n[Wr] = "", n));
      if (a) {
        var i;
        var o = e.oa, u = e.ea;
        var l = r.la, c = r.L;
        var f = Qr(t);
        var s = Jr(t);
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
      var n = t(Fr, w.x, m.x), i = n[0], o = n[1], u = n[2], l = n[3];
      var c = t(Nr, w.y, m.y), f = c[0], s = c[1], p = c[2], _ = c[3];
      return {
        ra: {
          x: i,
          y: f
        },
        la: {
          x: o,
          y: s
        },
        L: {
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
        var e = b(r);
        var t = a && e && r.replace(s + "-", "") || "";
        return [ a && !e ? r : "", b(t) ? "hidden" : t ];
      };
      var v = n(e.x, a.x), i = v[0], o = v[1];
      var u = n(e.y, a.y), l = u[0], c = u[1];
      t[Fr] = o && l ? o : i;
      t[Nr] = c && i ? c : l;
      return q(r, t);
    };
    var G = function hideNativeScrollbars(r, a, t, n) {
      var v = r.L, i = r.M;
      var o = i.x, u = i.y;
      var l = v.x, c = v.y;
      var f = e.I;
      var s = a ? jr : Ur;
      var d = a ? kr : Mr;
      var p = f[s];
      var _ = f[Br];
      var h = f[d];
      var b = f[Vr];
      n[qr] = "calc(100% + " + (c + p * -1) + "px)";
      n[s] = -c + p;
      n[Br] = -l + _;
      if (t) {
        n[d] = h + (u ? c : 0);
        n[Vr] = b + (o ? l : 0);
      }
    };
    var X = O ? O.D(x, S, v, i, e, q, G) : [ function() {
      return x;
    }, function() {
      return [ W ];
    } ], Z = X[0], $ = X[1];
    return function(r, a) {
      var i = r.Or, l = r.Zr, s = r.ia, d = r.Er;
      var p = a.ua;
      var _ = l || {}, g = _.ur, m = _.wr, O = _.yr, x = _.mr, E = _.Sr;
      var z = s.lr, I = s.cr;
      var V = i("showNativeOverlaidScrollbars"), B = V[0], W = V[1];
      var X = i("overflow"), J = X[0], K = X[1];
      var Q = B && w.x && w.y;
      var ar = !o && !S && (g || O || m || W || x);
      var er = g || p || O || E || W;
      var tr = b(J.x);
      var nr = b(J.y);
      var vr = tr || nr;
      var ir = H(d);
      var or = D(d);
      var ur = k(d);
      var lr = U(d);
      var cr;
      if (W && y) {
        u(Ya, Ba, !Q);
      }
      if (ar) {
        cr = q(Q);
        N(cr, z);
      }
      if (er) {
        if (vr) {
          u(Ga, Ua, false);
        }
        var fr = $(Q, I, cr), sr = fr[0], dr = fr[1];
        var pr = ir = T(d), _r = pr[0], hr = pr[1];
        var br = or = A(d), gr = br[0], mr = br[1];
        var Sr = Jr(v);
        var yr = gr;
        var wr = Sr;
        sr();
        if ((mr || hr || W) && dr && !Q && Z(dr, gr, _r, I)) {
          wr = Jr(v);
          yr = Kr(v);
        }
        var Or = Zr(c);
        var xr = {
          w: f(rr(gr.w, yr.w) + _r.w),
          h: f(rr(gr.h, yr.h) + _r.h)
        };
        var Cr = {
          w: f((C ? Or.w : wr.w + f(Sr.w - gr.w)) + _r.w),
          h: f((C ? Or.h : wr.h + f(Sr.h - gr.h)) + _r.h)
        };
        lr = j(Cr);
        ur = M(h(xr, Cr), d);
      }
      var Er = lr, Tr = Er[0], Hr = Er[1];
      var zr = ur, Pr = zr[0], Ar = zr[1];
      var Rr = or, Dr = Rr[0], Ir = Rr[1];
      var Lr = ir, Mr = Lr[0], kr = Lr[1];
      var Vr = {
        x: Pr.w > 0,
        y: Pr.h > 0
      };
      var Wr = tr && nr && (Vr.x || Vr.y) || tr && Vr.x && !Vr.y || nr && Vr.y && !Vr.x;
      var Yr = p || E || kr || Ir || Hr || Ar || K || W || ar || er;
      if (Yr) {
        var Gr;
        var Xr = (Gr = {}, Gr[Ur] = 0, Gr[Br] = 0, Gr[jr] = 0, Gr[qr] = "", Gr[Fr] = "", 
        Gr[Nr] = "", Gr);
        var $r = Y(Q, Vr, J, Xr);
        var Qr = Z($r, Dr, Mr, I);
        if (!o) {
          G($r, I, Qr, Xr);
        }
        if (ar) {
          N($r, z);
        }
        if (o) {
          R(t, Va, Xr[Fr]);
          R(t, ja, Xr[Nr]);
        } else {
          style(v, Xr);
        }
      }
      L(t, ka, Ua, Wr);
      L(n, Xa, Za, Wr);
      if (!o) {
        L(v, qa, Ga, vr);
      }
      var ra = F(q(Q).ra), aa = ra[0], ea = ra[1];
      P(e, {
        ra: aa,
        Hr: {
          x: Tr.w,
          y: Tr.h
        },
        Tr: {
          x: Pr.w,
          y: Pr.h
        },
        aa: Vr
      });
      return {
        Qr: ea,
        Jr: Hr,
        Kr: Ar
      };
    };
  };
  var gt = function createStructureSetup(r) {
    var a;
    var e = pt(r), t = e[0], n = e[1], v = e[2];
    var i = {
      ea: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      oa: false,
      I: (a = {}, a[Ur] = 0, a[Br] = 0, a[jr] = 0, a[Lr] = 0, a[Mr] = 0, a[Vr] = 0, a[kr] = 0, 
      a),
      Hr: {
        x: 0,
        y: 0
      },
      Tr: {
        x: 0,
        y: 0
      },
      ra: {
        x: Yr,
        y: Yr
      },
      aa: {
        x: false,
        y: false
      }
    };
    var o = t.zr, u = t.dr, l = t.gr, c = t.hr;
    var f = Ge(), s = f.P, d = f.A, p = f.B;
    var _ = !s && (d.x || d.y);
    var h = [ _t(t), ht(t, i), bt(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = _ || !p;
      var t = e && Oa(u);
      l("", Na, true);
      each(h, (function(e) {
        P(a, e(r, a) || {});
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
      S({}, r);
    })), f = c[0], s = c[1], d = c[2];
    var p = dt(r, a, d, o, u, t), _ = p[0], h = p[1], b = p[3];
    var g = function booleanUpdateHints(r) {
      return each(P({}, r), (function(r, a, e) {
        e[a] = !!r;
      }));
    };
    var m = function updateHintsAreTruthy(r) {
      return z(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, t) {
      var n = r.ca, v = r.Er, o = r.Cr, u = r.fa, l = r.sa;
      var c = n || {};
      var f = !!v;
      var p = {
        Or: Pa(a, c, f),
        ca: c,
        Er: f
      };
      if (u) {
        h(p);
        return false;
      }
      var _ = t || s(P({}, p, {
        Cr: o
      }));
      if (l) {
        P(_, {
          ur: true,
          yr: true
        });
      }
      var b = i(P({}, p, {
        ia: d,
        Zr: _
      }));
      h(P({}, p, {
        Zr: _,
        $r: b
      }));
      var S = m(_);
      var y = m(b);
      var w = S || y || !A(c) || f;
      w && e(r, {
        Zr: g(_),
        $r: g(b)
      });
      return w;
    };
    return [ function() {
      var r = u.zr, a = u.dr, e = u.Gr, t = u.Rr;
      var n = t ? e.documentElement : r;
      var i = Oa(n);
      var o = [ f(), v(), _() ];
      wa(a, i);
      return Sr(T, o);
    }, S, function() {
      return {
        da: d,
        pa: o
      };
    }, {
      _a: u,
      ha: b
    }, l ];
  };
  var St = function OverlayScrollbars(r, a, e) {
    var t = Ge(), n = t.Y, v = t.F, i = t.N;
    var o = m(r);
    var u = o ? r : r.target;
    var l = at(u);
    if (a && !l) {
      var c = false;
      var f = [];
      var s = {};
      var d = function validateOptions(r) {
        var a = Ee(De);
        return a ? a(r, true) : r;
      };
      var p = P({}, n(), d(a));
      var _ = Ca(), h = _[0], b = _[1], g = _[2];
      var S = Ca(e), y = S[0], w = S[1], x = S[2];
      var C = function triggerEvent(r, a) {
        x(r, a);
        g(r, a);
      };
      var E = mt(r, p, (function(r, a) {
        var e = r.ca, t = r.Er;
        var n = a.Zr, v = a.$r;
        var i = n.ur, o = n.Sr, u = n.mr, l = n.yr, c = n.wr;
        var f = v.Jr, s = v.Kr, d = v.Qr;
        C("updated", [ k, {
          updateHints: {
            sizeChanged: i,
            directionChanged: o,
            heightIntrinsicChanged: u,
            overflowEdgeChanged: f,
            overflowAmountChanged: s,
            overflowStyleChanged: d,
            contentMutation: l,
            hostMutation: c
          },
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return C("scroll", [ k, r ]);
      })), H = E[0], R = E[1], D = E[2], I = E[3], L = E[4];
      var M = function destroy(r) {
        rt(u);
        T(f);
        c = true;
        C("destroyed", [ k, r ]);
        b();
        w();
      };
      var k = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = za(p, P(e, d(r)));
            if (!A(t)) {
              P(p, t);
              R({
                ca: t
              });
            }
          }
          return P({}, p);
        },
        on: y,
        off: function off(r, a) {
          r && a && w(r, a);
        },
        state: function state() {
          var r = D(), a = r.da, e = r.pa;
          var t = a.cr;
          var n = e.Hr, v = e.Tr, i = e.ra, o = e.aa, u = e.ea, l = e.oa;
          return P({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: u,
            paddingAbsolute: l,
            directionRTL: t,
            destroyed: c
          });
        },
        elements: function elements() {
          var r = I._a, a = r.zr, e = r.sr, t = r.ea, n = r.dr, v = r.pr, i = r.Ar, o = r.Xr;
          var u = I.ha, l = u.Fr, c = u.Yr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Ir, e = r.Lr, t = r.Dr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Nr, e = r.qr;
            var t = f(a[0]);
            return P({}, t, {
              clone: function clone() {
                var r = f(e());
                R({
                  fa: true
                });
                return r;
              }
            });
          };
          return P({}, {
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
          return R({
            Er: r,
            Cr: true
          });
        },
        destroy: Sr(M, false),
        plugin: function plugin(r) {
          return s[z(r)[0]];
        }
      };
      var V = function onWindowResize() {
        var r = D(), a = r.pa;
        var e = a.aa;
        var t = e.x || e.y;
        t && R({
          sa: t
        });
      };
      O(f, [ v(V), i(V), L ]);
      Qe(u, k);
      Ce(we, OverlayScrollbars, [ k, h, s ]);
      if (Je(I._a.Rr, !o && r.cancel)) {
        M(true);
        return k;
      }
      O(f, H());
      C("initialized", [ k ]);
      k.update(true);
      return k;
    }
    return l;
  };
  St.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return Ce(r, St)[0];
    }));
    xe(e);
    return a ? t : t[0];
  };
  St.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return g(e) && !!at(e.target);
  };
  St.env = function() {
    var r = Ge(), a = r.V, e = r.A, t = r.P, n = r.U, v = r.B, i = r.R, o = r.j, u = r.X, l = r.Z, c = r.q, f = r.W, s = r.Y, d = r.G;
    return P({}, {
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
  r.SizeObserverPlugin = Le;
  Object.defineProperty(r, "T", {
    value: true
  });
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
