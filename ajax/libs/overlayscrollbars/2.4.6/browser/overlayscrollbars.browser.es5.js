/*!
 * OverlayScrollbars
 * Version: 2.4.6
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
    var c = function getCurrentCache(r) {
      return [ v, !!r, i ];
    };
    return [ a ? u : o, c ];
  };
  var e = typeof window !== "undefined";
  var t = e && Node.ELEMENT_NODE;
  var n = Object.prototype, v = n.toString, i = n.hasOwnProperty;
  var o = /^\[object (.+)\]$/;
  var u = function isUndefined(r) {
    return r === void 0;
  };
  var c = function isNull(r) {
    return r === null;
  };
  var f = function type(r) {
    return u(r) || c(r) ? "" + r : v.call(r).replace(o, "$1").toLowerCase();
  };
  var l = function isNumber(r) {
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
  var g = function isObject(r) {
    return typeof r === "object" && !_(r) && !c(r);
  };
  var h = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = l(a) && a > -1 && a % 1 == 0;
    return _(r) || !p(r) && e ? a > 0 && g(r) ? a - 1 in r : true : false;
  };
  var b = function isPlainObject(r) {
    if (!r || !g(r) || f(r) !== "object") {
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
  var x = function createOrKeepArray(r) {
    return _(r) ? r : [ r ];
  };
  var E = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var T = function deduplicateArray(r) {
    return C(new Set(r));
  };
  var H = function runEachAndClear(r, a, e) {
    var t = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, t);
    !e && (r.length = 0);
  };
  var P = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var A = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var z = function assignDeep(r, a, e, t, n, v, i) {
    var o = [ a, e, t, n, v, i ];
    if ((typeof r !== "object" || c(r)) && !p(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, t) {
        var n = a[t];
        if (r === n) {
          return true;
        }
        var v = _(n);
        if (n && b(n)) {
          var i = r[t];
          var o = i;
          if (v && !_(i)) {
            o = [];
          } else if (!v && !b(i)) {
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
  var D = function removeUndefinedProperties(r, a) {
    return each(z({}, r), (function(r, e, t) {
      if (r === void 0) {
        delete t[e];
      } else if (a && r && b(r)) {
        t[e] = removeUndefinedProperties(r, a);
      }
    }));
  };
  var R = function isEmptyObject(r) {
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
  var L = function getValueSet(r, a) {
    return new Set((I(r, a) || "").split(" "));
  };
  var M = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var k = function attrClass(r, a, e, t) {
    if (e) {
      var n = L(r, a);
      n[t ? "add" : "delete"](e);
      var v = C(n).join(" ").trim();
      I(r, a, v);
    }
  };
  var V = function hasAttrClass(r, a, e) {
    return L(r, a).has(e);
  };
  var j = e && Element.prototype;
  var U = function find(r, a) {
    var e = [];
    var t = a ? S(a) && a : document;
    return t ? O(e, t.querySelectorAll(r)) : e;
  };
  var F = function findFirst(r, a) {
    var e = a ? S(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var B = function is(r, a) {
    if (S(r)) {
      var e = j.matches || j.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var N = function contents(r) {
    return r ? C(r.childNodes) : [];
  };
  var q = function parent(r) {
    return r && r.parentElement;
  };
  var Y = function closest(r, a) {
    if (S(r)) {
      var e = j.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (B(r, a)) {
          return r;
        }
        r = q(r);
      } while (r);
    }
  };
  var W = function liesBetween(r, a, e) {
    var t = Y(r, a);
    var n = r && F(e, t);
    var v = Y(n, a) === t;
    return t && n ? t === r || n === r || v && Y(Y(r, e), a) !== t : false;
  };
  var G = function noop() {};
  var K = function removeElements(r) {
    if (h(r)) {
      each(C(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = q(r);
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
        return K(e);
      };
    }
    return G;
  };
  var Z = function appendChildren(r, a) {
    return X(r, null, a);
  };
  var $ = function insertBefore(r, a) {
    return X(q(r), r, a);
  };
  var J = function insertAfter(r, a) {
    return X(q(r), r && r.nextSibling, a);
  };
  var Q = function createDiv(r) {
    var a = document.createElement("div");
    I(a, "class", r);
    return a;
  };
  var rr = function createDOM(r) {
    var a = Q();
    a.innerHTML = r.trim();
    return each(N(a), (function(r) {
      return K(r);
    }));
  };
  var ar = e ? window : {};
  var er = Math.max;
  var tr = Math.min;
  var nr = Math.round;
  var vr = Math.abs;
  var ir = ar.cancelAnimationFrame;
  var or = ar.requestAnimationFrame;
  var ur = ar.setTimeout;
  var cr = ar.clearTimeout;
  var fr = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var lr = function getDummyStyle() {
    return Q().style;
  };
  var sr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var dr = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var pr = {};
  var _r = {};
  var gr = function cssProperty(r) {
    var a = _r[r];
    if (P(_r, r)) {
      return a;
    }
    var e = fr(r);
    var t = lr();
    each(sr, (function(n) {
      var v = n.replace(/-/g, "");
      var i = [ r, n + r, v + e, fr(v) + e ];
      return !(a = i.find((function(r) {
        return t[r] !== void 0;
      })));
    }));
    return _r[r] = a || "";
  };
  var hr = function jsAPI(r) {
    var a = pr[r] || ar[r];
    if (P(pr, r)) {
      return a;
    }
    each(dr, (function(e) {
      a = a || ar[e + fr(r)];
      return !a;
    }));
    pr[r] = a;
    return a;
  };
  var br = hr("MutationObserver");
  var mr = hr("IntersectionObserver");
  var Sr = hr("ResizeObserver");
  var yr = hr("ScrollTimeline");
  var wr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var Or = function selfClearTimeout(r) {
    var a;
    var e = r ? ur : or;
    var t = r ? cr : ir;
    return [ function(n) {
      t(a);
      a = e(n, p(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var Cr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = G;
    var i = a || {}, o = i.p, u = i._, c = i.m;
    var f = function invokeFunctionToDebounce(a) {
      v();
      cr(e);
      e = t = void 0;
      v = G;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return c && t ? c(t, r) : r;
    };
    var d = function flush() {
      if (v !== G) {
        f(s(n) || n);
      }
    };
    var _ = function debouncedFn() {
      var r = C(arguments);
      var a = p(o) ? o() : o;
      var i = l(a) && a >= 0;
      if (i) {
        var c = p(u) ? u() : u;
        var _ = l(c) && c >= 0;
        var g = a > 0 ? ur : or;
        var h = a > 0 ? cr : ir;
        var b = s(r);
        var m = b || r;
        var S = f.bind(0, m);
        v();
        var y = g(S, a);
        v = function clear() {
          return h(y);
        };
        if (_ && !e) {
          e = ur(d, c);
        }
        t = n = m;
      } else {
        f(r);
      }
    };
    _.S = d;
    return _;
  };
  var xr = /[^\x20\t\r\n\f]+/g;
  var Er = function classListAction(r, a, e) {
    var t = r && r.classList;
    var n;
    var v = 0;
    var i = false;
    if (t && a && s(a)) {
      var o = a.match(xr) || [];
      i = o.length > 0;
      while (n = o[v++]) {
        i = !!e(t, n) && i;
      }
    }
    return i;
  };
  var Tr = function removeClass(r, a) {
    Er(r, a, (function(r, a) {
      return r.remove(a);
    }));
  };
  var Hr = function addClass(r, a) {
    Er(r, a, (function(r, a) {
      return r.add(a);
    }));
    return wr(Tr, r, a);
  };
  var Pr = /^--/;
  var Ar = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var zr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Dr = function parseToZeroOrNumber(r) {
    return zr(parseFloat(r || ""));
  };
  var Rr = function ratioToCssPercent(r) {
    return (zr(r) * 100).toFixed(3) + "%";
  };
  var Ir = function numberToCssPx(r) {
    return zr(r) + "px";
  };
  function setStyles(r, a) {
    r && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = l(a) ? Ir(a) : a + "";
        if (Pr.test(e)) {
          t.setProperty(e, n);
        } else {
          t[e] = n;
        }
      } catch (v) {}
    }));
  }
  function getStyles(r, a, e) {
    var t = s(a);
    var n = t ? "" : {};
    if (r) {
      var v = ar.getComputedStyle(r, e) || r.style;
      n = t ? Ar(v, a) : a.reduce((function(r, a) {
        r[a] = Ar(v, a);
        return r;
      }), n);
    }
    return n;
  }
  var Lr = function getDirectionIsRTL(r) {
    return getStyles(r, "direction") === "rtl";
  };
  var Mr = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Dr(c[v]),
      r: Dr(c[i]),
      b: Dr(c[o]),
      l: Dr(c[u])
    };
  };
  var kr = function getTrasformTranslateValue(r, a) {
    return "translate" + (g(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Vr = "paddingTop";
  var jr = "paddingRight";
  var Ur = "paddingLeft";
  var Fr = "paddingBottom";
  var Br = "marginLeft";
  var Nr = "marginRight";
  var qr = "marginBottom";
  var Yr = "overflowX";
  var Wr = "overflowY";
  var Gr = "width";
  var Kr = "height";
  var Xr = "hidden";
  var Zr = {
    w: 0,
    h: 0
  };
  var $r = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : Zr;
  };
  var Jr = function windowSize(r) {
    return $r("inner", r || ar);
  };
  var Qr = wr($r, "offset");
  var ra = wr($r, "client");
  var aa = wr($r, "scroll");
  var ea = function fractionalSize(r) {
    var a = parseFloat(getStyles(r, Gr)) || 0;
    var e = parseFloat(getStyles(r, Kr)) || 0;
    return {
      w: a - nr(a),
      h: e - nr(e)
    };
  };
  var ta = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var na = function domRectHasDimensions(r) {
    return !!(r && (r[Kr] || r[Gr]));
  };
  var va = function domRectAppeared(r, a) {
    var e = na(r);
    var t = na(a);
    return !t && e;
  };
  var ia = function animationCurrentTime() {
    return performance.now();
  };
  var oa = function animateNumber(r, a, e, t, n) {
    var v = 0;
    var i = ia();
    var o = er(0, e);
    var u = function frame(e) {
      var u = ia();
      var c = u - i;
      var f = c >= o;
      var l = e ? 1 : 1 - (er(0, i + o - u) / o || 0);
      var s = (a - r) * (p(n) ? n(l, l * o, 0, 1, o) : l) + r;
      var d = f || l === 1;
      t && t(s, l, d);
      v = d ? 0 : or((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      ir(v);
      r && u(r);
    };
  };
  var ua = function equal(r, a, e, t) {
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
  var ca = function equalWH(r, a) {
    return ua(r, a, [ "w", "h" ]);
  };
  var fa = function equalXY(r, a) {
    return ua(r, a, [ "x", "y" ]);
  };
  var la = function equalTRBL(r, a) {
    return ua(r, a, [ "t", "r", "b", "l" ]);
  };
  var sa = function equalBCRWH(r, a, e) {
    return ua(r, a, [ Gr, Kr ], e && function(r) {
      return nr(r);
    });
  };
  var da;
  var pa = "passive";
  var _a = function supportPassiveEvents() {
    if (u(da)) {
      da = false;
      try {
        ar.addEventListener(pa, G, Object.defineProperty({}, pa, {
          get: function get() {
            da = true;
          }
        }));
      } catch (r) {}
    }
    return da;
  };
  var ga = function splitEventNames(r) {
    return r.split(" ");
  };
  var ha = function removeEventListener(r, a, e, t) {
    each(ga(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var ba = function addEventListener(r, a, e, t) {
    var n;
    var v = _a();
    var i = (n = v && t && t.O) != null ? n : v;
    var o = t && t.C || false;
    var u = t && t.T || false;
    var c = v ? {
      passive: i,
      capture: o
    } : o;
    return wr(H, ga(a).map((function(a) {
      var t = u ? function(n) {
        ha(r, a, t, o);
        e(n);
      } : e;
      r.addEventListener(a, t, c);
      return wr(ha, r, a, t, o);
    })));
  };
  var ma = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var Sa = function preventDefault(r) {
    return r.preventDefault();
  };
  var ya = {
    x: 0,
    y: 0
  };
  var wa = function absoluteCoordinates(r) {
    var a = r && ta(r);
    return a ? {
      x: a.left + ar.pageYOffset,
      y: a.top + ar.pageXOffset
    } : ya;
  };
  var Oa = function getRTLCompatibleScrollPosition(r, a, e) {
    return e ? e.n ? -r : e.i ? a - r : r : r;
  };
  var Ca = function getRTLCompatibleScrollBounds(r, a) {
    return [ a ? a.i ? r : 0 : 0, Oa(r, r, a) ];
  };
  var xa = function scrollElementTo(r, a) {
    var e = l(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    l(t) && (r.scrollLeft = t);
    l(n) && (r.scrollTop = n);
  };
  var Ea = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Ta = function manageListener(r, a) {
    each(x(a), r);
  };
  var Ha = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        Ta((function(r) {
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
        Ta((function(r) {
          p(r) && n.add(r);
        }), t);
        return wr(e, r, t);
      }
      if (d(t) && t) {
        e();
      }
      var v = A(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && O(i, addEvent(a, e));
      }));
      return wr(H, i);
    };
    var n = function triggerEvent(r, e) {
      each(C(a.get(r)), (function(r) {
        if (e && !E(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var Pa = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (p(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Aa = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && P(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var za = {
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
    var t = w(A(a), A(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (g(n) && g(v)) {
        z(e[t] = {}, getOptionsDiff(n, v));
        if (R(e[t])) {
          delete e[t];
        }
      } else if (P(a, t) && v !== n) {
        var i = true;
        if (_(n) || _(v)) {
          try {
            if (Pa(n) === Pa(v)) {
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
  var Ra = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Aa(r, t), e || Aa(a, t) !== void 0 ];
    };
  };
  var Ia = "data-overlayscrollbars";
  var La = "os-environment";
  var Ma = La + "-flexbox-glue";
  var ka = Ma + "-max";
  var Va = "os-scrollbar-hidden";
  var ja = Ia + "-initialize";
  var Ua = Ia;
  var Fa = Ua + "-overflow-x";
  var Ba = Ua + "-overflow-y";
  var Na = "overflowVisible";
  var qa = "scrollbarHidden";
  var Ya = "scrollbarPressed";
  var Wa = "updating";
  var Ga = Ia + "-viewport";
  var Ka = "arrange";
  var Xa = "scrollbarHidden";
  var Za = Na;
  var $a = Ia + "-padding";
  var Ja = Za;
  var Qa = Ia + "-content";
  var re = "os-size-observer";
  var ae = re + "-appear";
  var ee = re + "-listener";
  var te = ee + "-scroll";
  var ne = ee + "-item";
  var ve = ne + "-final";
  var ie = "os-trinsic-observer";
  var oe = "os-no-css-vars";
  var ue = "os-theme-none";
  var ce = "os-scrollbar";
  var fe = ce + "-rtl";
  var le = ce + "-horizontal";
  var se = ce + "-vertical";
  var de = ce + "-track";
  var pe = ce + "-handle";
  var _e = ce + "-visible";
  var ge = ce + "-cornerless";
  var he = ce + "-transitionless";
  var be = ce + "-interaction";
  var me = ce + "-unusable";
  var Se = ce + "-auto-hide";
  var ye = Se + "-hidden";
  var we = ce + "-wheel";
  var Oe = de + "-interactive";
  var Ce = pe + "-interactive";
  var xe = {};
  var Ee = {};
  var Te = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        xe[e] = r[e];
      }));
    }));
  };
  var He = function registerPluginModuleInstances(r, a, e) {
    return A(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], c = o[1], f = o[2];
      var l = e ? i : v;
      if (l) {
        var s = e ? l(u, c, a) : l(a);
        return (f || Ee)[t] = s;
      }
    }));
  };
  var Pe = function getStaticPluginModuleInstance(r) {
    return Ee[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.H && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Ae = {
    exports: {}
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
      }, r.exports.H = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.H = true, r.exports["default"] = r.exports;
  })(Ae);
  var ze = Ae.exports;
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
  var Ie = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = De({}, a);
    var i = A(r).filter((function(r) {
      return P(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var c = r[i];
      var l = b(c);
      var d = t ? t + "." : "";
      if (l && b(o)) {
        var p = validateRecursive(c, o, e, d + i), _ = p[0], g = p[1];
        n[i] = _;
        v[i] = g;
        each([ v, n ], (function(r) {
          if (R(r[i])) {
            delete r[i];
          }
        }));
      } else if (!l) {
        var h = false;
        var m = [];
        var S = [];
        var y = f(o);
        var w = x(c);
        each(w, (function(r) {
          var a;
          each(Re, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = u(a);
          if (e && s(o)) {
            var t = r.split(" ");
            h = !!t.find((function(r) {
              return r === o;
            }));
            O(m, t);
          } else {
            h = Re[y] === r;
          }
          O(S, e ? Re.string : a);
          return !h;
        }));
        if (h) {
          n[i] = o;
        } else if (e) {
          console.warn('The option "' + d + i + "\" wasn't set, because it doesn't accept the type [ " + y.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + S.join(", ").toUpperCase() + " ].\r\n" + (m.length > 0 ? "\r\nValid strings are: [ " + m.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var Le = function validateOptions(r, a, e) {
    return Ie(r, a, e);
  };
  var Me = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Me] = {
      static: function _static() {
        var r = Re.number;
        var a = Re.boolean;
        var e = [ Re.array, Re.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
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
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Re.string, Re.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Re.array, Re.null ]
          }
        };
        return function(r, a) {
          var e = Le(i, r, a), t = e[0], n = e[1];
          return De({}, n, t);
        };
      }
    }, r;
  })();
  var ke = "__osSizeObserverPlugin";
  var Ve = /* @__PURE__ */ function(r) {
    return r = {}, r[ke] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = rr('<div class="' + ne + '" dir="ltr"><div class="' + ne + '"><div class="' + ve + '"></div></div><div class="' + ne + '"><div class="' + ve + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var c = o.firstChild;
          var f = c == null ? void 0 : c.firstChild;
          var l = Qr(o);
          var s = l;
          var d = false;
          var p;
          var _ = function reset() {
            xa(c, n);
            xa(u, n);
          };
          var g = function onResized(r) {
            p = 0;
            if (d) {
              l = s;
              a(r === true);
            }
          };
          var h = function onScroll(r) {
            s = Qr(o);
            d = !r || !ca(s, l);
            if (r) {
              ma(r);
              if (d && !p) {
                ir(p);
                p = or(g);
              }
            } else {
              g(r === false);
            }
            _();
          };
          var b = [ Z(r, i), ba(c, v, h), ba(u, v, h) ];
          Hr(r, te);
          setStyles(f, (t = {}, t[Gr] = n, t[Kr] = n, t));
          or(_);
          return [ e ? wr(h, false) : _, b ];
        };
      }
    }, r;
  }();
  var je = 0;
  var Ue = "__osScrollbarsHidingPlugin";
  var Fe = /* @__PURE__ */ function(r) {
    return r = {}, r[Ue] = {
      static: function _static() {
        return {
          P: function _createUniqueViewportArrangeElement(r) {
            var a = r.A, e = r.D, t = r.R;
            var n = !t && !a && (e.x || e.y);
            var v = n ? document.createElement("style") : false;
            if (v) {
              I(v, "id", Ga + "-" + Ka + "-" + je);
              je++;
            }
            return v;
          },
          I: function _overflowUpdateSegment(r, a, e, t, n, v, i) {
            var o = function arrangeViewport(a, v, i, o) {
              if (r) {
                var u = n.L;
                var c = a.M, f = a.k;
                var l = f.x, s = f.y;
                var d = c.x, p = c.y;
                var _ = o ? jr : Ur;
                var g = u[_];
                var h = u.paddingTop;
                var b = v.w + i.w;
                var m = v.h + i.h;
                var S = {
                  w: p && s ? p + b - g + "px" : "",
                  h: d && l ? d + m - h + "px" : ""
                };
                if (t) {
                  var y = t.sheet;
                  if (y) {
                    var w = y.cssRules;
                    if (w) {
                      if (!w.length) {
                        y.insertRule("#" + I(t, "id") + " + [" + Ga + "~='" + Ka + "']::before {}", 0);
                      }
                      var O = w[0].style;
                      O[Gr] = S.w;
                      O[Kr] = S.h;
                    }
                  }
                } else {
                  setStyles(e, {
                    "--os-vaw": S.w,
                    "--os-vah": S.h
                  });
                }
              }
              return r;
            };
            var u = function undoViewportArrange(t, o, u) {
              if (r) {
                var c = u || v(t);
                var f = n.L;
                var l = c.k;
                var s = l.x, d = l.y;
                var p = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    p[r] = f[r];
                  }));
                };
                if (s) {
                  _([ qr, Vr, Fr ]);
                }
                if (d) {
                  _([ Br, Nr, Ur, jr ]);
                }
                var g = getStyles(e, A(p));
                k(e, Ga, Ka);
                if (!a) {
                  p[Kr] = "";
                }
                setStyles(e, p);
                return [ function() {
                  i(c, o, r, g);
                  setStyles(e, g);
                  k(e, Ga, Ka, true);
                }, c ];
              }
              return [ G ];
            };
            return [ o, u ];
          },
          V: function _envWindowZoom() {
            var r = {
              w: 0,
              h: 0
            };
            var a = 0;
            var e = function getWindowDPR() {
              var r = ar.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return ar.devicePixelRatio || a / e;
            };
            var t = function diffBiggerThanOne(r, a) {
              var e = vr(r);
              var t = vr(a);
              return !(e === t || e + 1 === t || e - 1 === t);
            };
            return function(n, v) {
              var i = Jr();
              var o = {
                w: i.w - r.w,
                h: i.h - r.h
              };
              if (o.w === 0 && o.h === 0) {
                return;
              }
              var u = {
                w: vr(o.w),
                h: vr(o.h)
              };
              var c = {
                w: vr(nr(i.w / (r.w / 100))),
                h: vr(nr(i.h / (r.h / 100)))
              };
              var f = e();
              var l = u.w > 2 && u.h > 2;
              var s = !t(c.w, c.h);
              var d = f !== a && f > 0;
              var p = l && s && d;
              var _;
              var g;
              if (p) {
                var h = v();
                g = h[0];
                _ = h[1];
                z(n.j, g);
              }
              r = i;
              a = f;
              return _;
            };
          }
        };
      }
    }, r;
  }();
  var Be = "__osClickScrollPlugin";
  var Ne = /* @__PURE__ */ function(r) {
    return r = {}, r[Be] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = G;
          var o = function animateClickScroll(o) {
            i = oa(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var f = c + t;
              var l = n >= c && n <= f;
              if (u && !l) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var s = ur((function() {
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
  var qe;
  var Ye = function getNativeScrollbarSize(r, a, e, t) {
    Z(r, a);
    var n = ra(a);
    var v = Qr(a);
    var i = ea(e);
    t && K(a);
    return {
      x: v.h - n.h + i.h,
      y: v.w - n.w + i.w
    };
  };
  var We = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Hr(r, Va);
    try {
      a = getStyles(r, gr("scrollbar-width")) === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
    } catch (t) {}
    e();
    return a;
  };
  var Ge = function getRtlScrollBehavior(r, a) {
    var e;
    setStyles(r, (e = {}, e[Yr] = Xr, e[Wr] = Xr, e.direction = "rtl", e));
    xa(r, {
      x: 0
    });
    var t = wa(r);
    var n = wa(a);
    xa(r, {
      x: -999
    });
    var v = wa(a);
    return {
      i: t.x === n.x,
      n: n.x !== v.x
    };
  };
  var Ke = function getFlexboxGlue(r, a) {
    var e = Hr(r, Ma);
    var t = ta(r);
    var n = ta(a);
    var v = sa(n, t, true);
    var i = Hr(r, ka);
    var o = ta(r);
    var u = ta(a);
    var c = sa(u, o, true);
    e();
    i();
    return v && c;
  };
  var Xe = function createEnvironment() {
    var r = document, e = r.body;
    var t = rr('<div class="' + La + '"><div></div></div>');
    var n = t[0];
    var v = n.firstChild;
    var i = Ha(), o = i[0], u = i[2];
    var c = a({
      v: Ye(e, n, v),
      o: fa
    }, wr(Ye, e, n, v, true)), f = c[0], l = c[1];
    var s = l(), d = s[0];
    var p = We(n);
    var _ = {
      x: d.x === 0,
      y: d.y === 0
    };
    var g = {
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
    var h = z({}, za);
    var b = wr(z, {}, h);
    var m = wr(z, {}, g);
    var S = {
      j: d,
      D: _,
      A: p,
      R: getStyles(n, "zIndex") === "-1",
      U: !!yr,
      F: Ge(n, v),
      B: Ke(n, v),
      N: wr(o, "r"),
      q: m,
      Y: function _setDefaultInitialization(r) {
        return z(g, r) && m();
      },
      W: b,
      G: function _setDefaultOptions(r) {
        return z(h, r) && b();
      },
      K: z({}, g),
      X: z({}, h)
    };
    M(n, "style");
    K(n);
    ar.addEventListener("resize", (function() {
      var r;
      if (!p && (!_.x || !_.y)) {
        var a = Pe(Ue);
        var e = a ? a.V() : G;
        r = !!e(S, f);
      }
      u("r", [ r ]);
    }));
    return S;
  };
  var Ze = function getEnvironment() {
    if (!qe) {
      qe = Xe();
    }
    return qe;
  };
  var $e = function resolveInitialization(r, a) {
    return p(a) ? a.apply(0, r) : a;
  };
  var Je = function staticInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = $e(r, n);
    return v || a.apply(0, r);
  };
  var Qe = function dynamicInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = $e(r, n);
    return !!v && (m(v) ? v : a.apply(0, r));
  };
  var rt = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = Ze(), i = v.D, o = v.A, f = v.q;
    var l = f().cancel, s = l.nativeScrollbarsOverlaid, d = l.body;
    var p = t != null ? t : s;
    var _ = u(n) ? d : n;
    var g = (i.x || i.y) && p;
    var h = r && (c(_) ? !o : _);
    return !!g || !!h;
  };
  var at = new WeakMap;
  var et = function addInstance(r, a) {
    at.set(r, a);
  };
  var tt = function removeInstance(r) {
    at.delete(r);
  };
  var nt = function getInstance(r) {
    return at.get(r);
  };
  var vt = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || U)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = ba(v, i.trim(), (function(r) {
                if (t) {
                  c();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, O(o, c));
            } else {
              H(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var it = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.Z, o = v.$, u = v.J, c = v.rr, f = v.ar, l = v.er;
    var s = Cr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = vt(r, s, u), p = d[0], _ = d[1];
    var g = i || [];
    var h = o || [];
    var b = w(g, h);
    var m = function observerCallback(n, v) {
      if (!E(v)) {
        var i = f || G;
        var o = l || G;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, f = e.type, l = e.oldValue, _ = e.addedNodes, g = e.removedNodes;
          var b = f === "attributes";
          var m = f === "childList";
          var S = r === v;
          var w = b && n;
          var C = w ? I(v, n || "") : null;
          var x = w && l !== C;
          var E = y(h, n) && x;
          if (a && (m || !S)) {
            var T = b && x;
            var H = T && c && B(v, c);
            var P = H ? !i(v, n, l, C) : !b || T;
            var A = P && !o(e, !!H, r, t);
            each(_, (function(r) {
              return O(u, r);
            }));
            each(g, (function(r) {
              return O(u, r);
            }));
            p = p || A;
          }
          if (!a && S && x && !i(v, n, l, C)) {
            O(s, n);
            d = d || E;
          }
        }));
        _((function(r) {
          return T(u).reduce((function(a, e) {
            O(a, U(r, e));
            return B(e, r) ? O(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!E(s) || d) {
          var g = [ T(s), d ];
          !n && e.apply(0, g);
          return g;
        }
      }
    };
    var S = new br(wr(m, false));
    return [ function() {
      S.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: b,
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
        s.S();
        return m(true, S.takeRecords());
      }
    } ];
  };
  var ot = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.tr, o = v.nr;
    var u = Pe(ke);
    var c = Ze(), f = c.F;
    var l = wr(Lr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = rr('<div class="' + re + '"><div class="' + ee + '"></div></div>');
      var c = v[0];
      var s = c.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = !a && _(r);
        var v = false;
        var o = false;
        var u = true;
        if (a) {
          var l = d(r.contentRect), s = l[0], p = l[2];
          var g = na(s);
          var h = va(s, p);
          var b = !p;
          o = b || h;
          v = !o && !g;
          u = !v;
        } else if (t) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var m = t ? r[0] : Lr(c);
          xa(c, {
            x: Oa(n, n, m && f),
            y: n
          });
        }
        if (!v) {
          e({
            vr: t ? r : void 0,
            ir: !t,
            nr: o
          });
        }
      };
      if (Sr) {
        var g = new Sr((function(r) {
          return p(r.pop());
        }));
        g.observe(s);
        O(t, (function() {
          g.disconnect();
        }));
      } else if (u) {
        var h = u(s, p, o), b = h[0], m = h[1];
        O(t, w([ Hr(c, ae), ba(c, "animationstart", b) ], m));
      } else {
        return G;
      }
      if (i) {
        var S = a({
          v: void 0
        }, l), y = S[0];
        O(t, ba(c, "scroll", (function(r) {
          var a = y();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Tr(s, "ltr rtl");
            Hr(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          ma(r);
        })));
      }
      return wr(H, O(t, Z(r, c)));
    };
  };
  var ut = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Q(ie);
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
    var c = function intersectionObserverCallback(r, a) {
      return u(a.pop(), r);
    };
    return [ function() {
      var a = [];
      if (mr) {
        t = new mr(wr(c, false), {
          root: r
        });
        t.observe(v);
        O(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = Qr(v);
          u(r);
        };
        O(a, ot(v, e)());
        e();
      }
      return wr(H, O(a, Z(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var ct = function createObserversSetup(r, e) {
    var t;
    var n;
    var v;
    var i;
    var o;
    var u = Ze(), c = u.A;
    var f = "[" + Ua + "]";
    var d = "[" + Ga + "]";
    var g = [ "tabindex" ];
    var h = [ "wrap", "cols", "rows" ];
    var b = [ "id", "class", "style", "open" ];
    var m = {
      ur: false,
      cr: Lr(r.lr)
    };
    var S = r.lr, O = r.sr, C = r.dr, x = r.pr, E = r._r, T = r.gr, H = r.hr;
    var P = Ze(), D = P.B, R = P.N;
    var L = a({
      o: ca,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var r = T(Za, Na);
      var a = T(Ka, "");
      var e = a && Ea(O);
      H(Za, Na);
      H(Ka, "");
      H("", Wa, true);
      var t = aa(C);
      var n = aa(O);
      var v = ea(O);
      H(Za, Na, r);
      H(Ka, "", a);
      H("", Wa);
      xa(O, e);
      return {
        w: n.w + t.w + v.w,
        h: n.h + t.h + v.h
      };
    })), k = L[0];
    var V = x ? h : w(b, h);
    var j = Cr(e, {
      p: function _timeout() {
        return t;
      },
      _: function _maxDelay() {
        return n;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ w(A(e), A(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var U = function updateViewportAttrsFromHost(r) {
      each(r || g, (function(r) {
        if (y(g, r)) {
          var a = I(S, r);
          if (s(a)) {
            I(O, r, a);
          } else {
            M(O, r);
          }
        }
      }));
    };
    var F = function onTrinsicChanged(r, a) {
      var t = r[0], n = r[1];
      var v = {
        br: n
      };
      z(m, {
        ur: t
      });
      !a && e(v);
      return v;
    };
    var B = function onSizeChanged(r) {
      var a = r.ir, t = r.vr, n = r.nr;
      var v = a && !n && !t;
      var i = !v && c ? j : e;
      var o = t || [], u = o[0], f = o[1];
      t && z(m, {
        cr: u
      });
      i({
        ir: a || n,
        nr: n,
        mr: f
      });
    };
    var N = function onContentMutation(r, a) {
      var t = k(), n = t[1];
      var v = {
        Sr: n
      };
      var i = r ? e : j;
      n && !a && i(v);
      return v;
    };
    var q = function onHostMutation(r, a, e) {
      var t = {
        yr: a
      };
      if (a && !e) {
        j(t);
      } else if (!E) {
        U(r);
      }
      return t;
    };
    var G = C || !D ? ut(S, F) : [], K = G[0], X = G[1];
    var Z = !E && ot(S, B, {
      nr: true,
      tr: true
    });
    var $ = it(S, false, q, {
      $: b,
      Z: w(b, g)
    }), J = $[0], Q = $[1];
    var rr = E && Sr && new Sr((function(r) {
      var a = r[r.length - 1].contentRect;
      B({
        ir: true,
        nr: va(a, o)
      });
      o = a;
    }));
    return [ function() {
      U();
      rr && rr.observe(S);
      var r = Z && Z();
      var a = K && K();
      var e = J();
      var t = R((function(r) {
        var a = k(), e = a[1];
        j({
          wr: r,
          Sr: e
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
      var a = r.Or, e = r.Cr, o = r.Er;
      var u = {};
      var c = a("update.ignoreMutation"), s = c[0];
      var g = a("update.attributes"), h = g[0], b = g[1];
      var m = a("update.elementEvents"), S = m[0], y = m[1];
      var x = a("update.debounce"), T = x[0], H = x[1];
      var P = y || b;
      var A = e || o;
      var D = function ignoreMutationFromOptions(r) {
        return p(s) && s(r);
      };
      if (P) {
        v && v();
        i && i();
        var R = it(C || O, true, N, {
          Z: w(V, h || []),
          J: S,
          rr: f,
          er: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !E ? W(e, f, d) : false;
            return n || !!Y(e, "." + ce) || !!D(r);
          }
        }), I = R[0], L = R[1];
        i = I();
        v = L;
      }
      if (H) {
        j.S();
        if (_(T)) {
          var M = T[0];
          var k = T[1];
          t = l(M) && M;
          n = l(k) && k;
        } else if (l(T)) {
          t = T;
          n = false;
        } else {
          t = false;
          n = false;
        }
      }
      if (A) {
        var U = Q();
        var B = X && X();
        var G = v && v();
        U && z(u, q(U[0], U[1], A));
        B && z(u, F(B[0], A));
        G && z(u, N(G[0], A));
      }
      return u;
    }, m ];
  };
  var ft = function capNumber(r, a, e) {
    return er(r, tr(a, e));
  };
  var lt = function getScrollbarHandleOffsetPercent(r, a, e) {
    var t = nr(a);
    var n = Ca(t, e), v = n[0], i = n[1];
    var o = (i - r) / i;
    var u = r / v;
    var c = r / i;
    var f = e ? e.n ? o : e.i ? u : c : c;
    return ft(0, 1, f);
  };
  var st = function getScrollbarHandleLengthRatio(r, a, e) {
    if (e) {
      var t = a ? Gr : Kr;
      var n = e.Tr, v = e.Hr;
      var i = ta(v)[t];
      var o = ta(n)[t];
      return ft(0, 1, i / o);
    }
    var u = a ? "x" : "y";
    var c = r.Pr, f = r.Ar;
    var l = f[u];
    var s = c[u];
    return ft(0, 1, l / (l + s));
  };
  var dt = function getScrollbarHandleOffsetRatio(r, a, e, t) {
    var n = st(r, t, a);
    return 1 / n * (1 - n) * e;
  };
  var pt = function createScrollbarsSetupElements(r, a, e, t) {
    var n = Ze(), v = n.q, i = n.R;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var f = a.zr, l = a.lr, s = a.sr, p = a.Dr, _ = a.Rr, g = a.Ir, h = a._r;
    var b = p ? {} : r, m = b.scrollbars;
    var S = m || {}, C = S.slot;
    var T = new Map;
    var P = function initScrollTimeline(r) {
      return yr && new yr({
        source: _,
        axis: r
      });
    };
    var A = P("x");
    var D = P("y");
    var R = Qe([ f, l, s ], (function() {
      return h && g ? f : l;
    }), c, C);
    var I = function doRefreshScrollbarOffset(r) {
      return h && !g && q(r) === s;
    };
    var L = function getScrollbarOffsetKeyframes(r, a, e) {
      var t = .5 * (e ? 1 : -1);
      var n = a && e ? -1 : 1;
      return {
        transform: [ kr(Ir(0 + t), a), kr(Ir(r * n + t), a) ]
      };
    };
    var M = function addDirectionRTLKeyframes(r, a) {
      return z(r, a ? {
        clear: [ "left" ]
      } : {});
    };
    var k = function cancelElementAnimations(r) {
      T.forEach((function(a, e) {
        var t = r ? y(x(r), e) : true;
        if (t) {
          each(a || [], (function(r) {
            r && r.cancel();
          }));
          T.delete(e);
        }
      }));
    };
    var V = function setElementAnimation(r, a, e, t) {
      var n = T.get(r) || [];
      var v = n.find((function(r) {
        return r && r.timeline === a;
      }));
      if (v) {
        v.effect = new KeyframeEffect(r, e, {
          composite: t
        });
      } else {
        T.set(r, w(n, [ r.animate(e, {
          timeline: a,
          composite: t
        }) ]));
      }
    };
    var j = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Hr : Tr;
      each(r, (function(r) {
        t(r.Lr, a);
      }));
    };
    var U = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var F = function scrollbarStructureRefreshHandleLength(r, a) {
      U(r, (function(r) {
        var t;
        var n = r.Hr;
        return [ n, (t = {}, t[a ? Gr : Kr] = Rr(st(e, a)), t) ];
      }));
    };
    var B = function scrollbarStructureRefreshHandleOffset(r, a) {
      if (A && D) {
        each(r, (function(r) {
          var t = r.Lr, n = r.Hr;
          var v = wr(dt, e, r);
          var i = a && Lr(t);
          var o = v(i ? 1 : 0, a);
          var u = v(i ? 0 : 1, a);
          V(n, a ? A : D, M({
            transform: [ kr(Rr(o), a), kr(Rr(u), a) ]
          }, i));
        }));
      } else {
        U(r, (function(r) {
          var t = r.Hr, n = r.Lr;
          var v = Ze(), i = v.F;
          var o = a ? "x" : "y";
          var u = e.Pr;
          var c = Lr(n);
          var f = dt(e, r, lt(Ea(_)[o], u[o], a && c && i), a);
          return [ t, {
            transform: kr(Rr(f), a)
          } ];
        }));
      }
    };
    var N = function styleScrollbarPosition(r) {
      var a = r.Lr;
      var e = I(a) && a;
      var t = Ea(_), n = t.x, v = t.y;
      return [ e, {
        transform: e ? kr({
          x: Ir(n),
          y: Ir(v)
        }) : ""
      } ];
    };
    var Y = [];
    var W = [];
    var G = [];
    var X = function scrollbarsAddRemoveClass(r, a, e) {
      var t = d(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && j(W, r, a);
      v && j(G, r, a);
    };
    var $ = function refreshScrollbarsHandleLength() {
      F(W, true);
      F(G);
    };
    var J = function refreshScrollbarsHandleOffset() {
      B(W, true);
      B(G);
    };
    var rr = function refreshScrollbarsScrollbarOffset() {
      if (h) {
        if (A && D) {
          var r = e.Pr;
          var a = !!W.find((function(r) {
            var a = r.Lr;
            return Lr(a);
          }));
          var t = function setScrollbarElementAnimation(r, e, t, n, v) {
            return V(r, e, M(L(t, n, v), a), "add");
          };
          each(w(G, W), (function(e) {
            var n = e.Lr;
            if (I(n)) {
              t(n, A, r.x, true, a);
              t(n, D, r.y);
            } else {
              k(n);
            }
          }));
        } else {
          U(W, N);
          U(G, N);
        }
      }
    };
    var ar = function generateScrollbarDOM(r) {
      var a = r ? le : se;
      var e = r ? W : G;
      var n = E(e) ? he : "";
      var v = Q(ce + " " + a + " " + n);
      var o = Q(de);
      var u = Q(pe);
      var c = {
        Lr: v,
        Tr: o,
        Hr: u
      };
      if (!i) {
        Hr(v, oe);
      }
      O(e, c);
      O(Y, [ Z(v, o), Z(o, u), wr(K, v), k, t(c, X, B, r) ]);
      return c;
    };
    var er = wr(ar, true);
    var tr = wr(ar, false);
    var nr = function appendElements() {
      Z(R, W[0].Lr);
      Z(R, G[0].Lr);
      ur((function() {
        X(he);
      }), 300);
      return wr(H, Y);
    };
    er();
    tr();
    return [ {
      Mr: $,
      kr: J,
      Vr: rr,
      jr: X,
      Ur: {
        U: A,
        Fr: W,
        Br: er,
        Nr: wr(U, W)
      },
      qr: {
        U: D,
        Fr: G,
        Br: tr,
        Nr: wr(U, G)
      }
    }, nr ];
  };
  var _t = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.lr, n = a.Rr, v = a.Yr;
    return function(a, i, o, u) {
      var c = a.Lr, f = a.Tr, l = a.Hr;
      var s = Or(333), d = s[0], p = s[1];
      var _ = Or(), g = _[0], h = _[1];
      var b = wr(o, [ a ], u);
      var m = !!n.scrollBy;
      var S = "client" + (u ? "X" : "Y");
      var y = u ? Gr : Kr;
      var w = u ? "left" : "top";
      var C = u ? "w" : "h";
      var x = u ? "x" : "y";
      var E = function isAffectingTransition(r) {
        return r.propertyName.indexOf(y) > -1;
      };
      var T = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var i = function createRelativeHandleMove(r, a) {
          return function(t) {
            var v;
            var i = e.Pr;
            var o = Qr(f)[C] - Qr(l)[C];
            var u = a * t / o;
            var c = u * i[x];
            xa(n, (v = {}, v[x] = r + c, v));
          };
        };
        return ba(f, "pointerdown", (function(e) {
          var o = Y(e.target, "." + pe) === l;
          var u = o ? l : f;
          var c = r.scrollbars;
          var s = e.button, d = e.isPrimary, p = e.pointerType;
          var _ = c.pointers;
          var g = s === 0 && d && c[o ? "dragScroll" : "clickScroll"] && (_ || []).includes(p);
          if (g) {
            var h = !o && e.shiftKey;
            var b = wr(ta, l);
            var m = wr(ta, f);
            var E = function getHandleOffset(r, a) {
              return (r || b())[w] - (a || m())[w];
            };
            var T = nr(ta(n)[y]) / Qr(n)[C] || 1;
            var P = i(Ea(n)[x] || 0, 1 / T);
            var A = e[S];
            var z = b();
            var D = m();
            var R = z[y];
            var I = E(z, D) + R / 2;
            var L = A - D[w];
            var M = o ? 0 : L - I;
            var V = function releasePointerCapture(r) {
              H(j);
              u.releasePointerCapture(r.pointerId);
            };
            var j = [ wr(k, t, Ua, Ya), ba(v, a, V), ba(v, "selectstart", (function(r) {
              return Sa(r);
            }), {
              O: false
            }), ba(f, a, V), ba(f, "pointermove", (function(r) {
              var a = r[S] - A;
              if (o || h) {
                P(M + a);
              }
            })) ];
            k(t, Ua, Ya, true);
            u.setPointerCapture(e.pointerId);
            if (h) {
              P(M);
            } else if (!o) {
              var U = Pe(Be);
              U && O(j, U(P, E, M, R, L));
            }
          }
        }));
      };
      var P = true;
      return wr(H, [ ba(c, "pointerenter", (function() {
        i(be, true);
      })), ba(c, "pointerleave pointercancel", (function() {
        i(be, false);
      })), ba(c, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, v = r.deltaMode;
        if (m && P && v === 0 && q(c) === t) {
          n.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        P = false;
        i(we, true);
        d((function() {
          P = true;
          i(we);
        }));
        Sa(r);
      }), {
        O: false,
        C: true
      }), ba(l, "transitionstart", (function(r) {
        if (E(r)) {
          var a = function animateHandleOffset() {
            b();
            g(animateHandleOffset);
          };
          a();
        }
      })), ba(l, "transitionend transitioncancel", (function(r) {
        if (E(r)) {
          h();
          b();
        }
      })), ba(c, "mousedown", wr(ba, v, "click", ma, {
        T: true,
        C: true
      }), {
        C: true
      }), T(), p, h ]);
    };
  };
  var gt = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var f;
    var l = G;
    var s = 0;
    var d = Or(), p = d[0], _ = d[1];
    var g = Or(), h = g[0], b = g[1];
    var m = Or(100), S = m[0], y = m[1];
    var w = Or(100), C = w[0], x = w[1];
    var E = Or(100), T = E[0], P = E[1];
    var A = Or((function() {
      return s;
    })), z = A[0], D = A[1];
    var R = pt(r, n, t, _t(a, n, t)), I = R[0], L = R[1];
    var M = n.lr, k = n.Wr, V = n.Ir;
    var j = I.jr, U = I.Mr, F = I.kr, B = I.Vr;
    var N = function manageAutoHideSuspension(r) {
      j(Se, r, true);
      j(Se, r, false);
    };
    var q = function manageScrollbarsAutoHide(r, a) {
      D();
      if (r) {
        j(ye);
      } else {
        var e = wr(j, ye, true);
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
    var W = function onHostMouseEnter(r) {
      if (Y(r)) {
        c = o;
        c && q(true);
      }
    };
    var K = [ y, D, x, P, b, _, function() {
      return l();
    }, ba(M, "pointerover", W, {
      T: true
    }), ba(M, "pointerenter", W), ba(M, "pointerleave", (function(r) {
      if (Y(r)) {
        c = false;
        o && q(false);
      }
    })), ba(M, "pointermove", (function(r) {
      Y(r) && i && p((function() {
        y();
        q(true);
        C((function() {
          i && q(false);
        }));
      }));
    })), ba(k, "scroll", (function(r) {
      h((function() {
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
      return wr(H, O(K, L()));
    }, function(r) {
      var a = r.Or, n = r.Er, v = r.Gr, c = r.Kr;
      var d = c || {}, p = d.Xr, _ = d.Zr, g = d.$r;
      var h = v || {}, b = h.mr, m = h.nr;
      var S = e.cr;
      var y = Ze(), w = y.D;
      var O = t.Pr, C = t.Jr, x = t.Qr;
      var E = a("showNativeOverlaidScrollbars"), H = E[0], P = E[1];
      var A = a("scrollbars.theme"), z = A[0], D = A[1];
      var R = a("scrollbars.visibility"), I = R[0], L = R[1];
      var M = a("scrollbars.autoHide"), Y = M[0], W = M[1];
      var G = a("scrollbars.autoHideSuspend"), K = G[0], X = G[1];
      var Z = a("scrollbars.autoHideDelay"), $ = Z[0];
      var J = a("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var ar = a("scrollbars.clickScroll"), er = ar[0], tr = ar[1];
      var nr = m && !n;
      var vr = x.x || x.y;
      var ir = p || _ || b || n;
      var or = g || L;
      var ur = H && w.x && w.y;
      var cr = function setScrollbarVisibility(r, a) {
        var e = I === "visible" || I === "auto" && r === "scroll";
        j(_e, e, a);
        return e;
      };
      s = $;
      if (nr) {
        if (K && vr) {
          N(false);
          l();
          T((function() {
            l = ba(k, "scroll", wr(N, true), {
              T: true
            });
          }));
        } else {
          N(true);
        }
      }
      if (P) {
        j(ue, ur);
      }
      if (D) {
        j(f);
        j(z, true);
        f = z;
      }
      if (X && !K) {
        N(true);
      }
      if (W) {
        i = Y === "move";
        o = Y === "leave";
        u = Y !== "never";
        q(!u, true);
      }
      if (rr) {
        j(Ce, Q);
      }
      if (tr) {
        j(Oe, er);
      }
      if (or) {
        var fr = cr(C.x, true);
        var lr = cr(C.y, false);
        var sr = fr && lr;
        j(ge, !sr);
      }
      if (ir) {
        U();
        F();
        B();
        j(me, !O.x, true);
        j(me, !O.y, false);
        j(fe, S && !V);
      }
    }, {}, I ];
  };
  var ht = function createStructureSetupElements(r) {
    var a = Ze();
    var e = a.q, t = a.A;
    var n = Pe(Ue);
    var v = n && n.P;
    var i = e(), o = i.elements;
    var u = o.host, c = o.padding, f = o.viewport, l = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, g = _.host, h = _.padding, b = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var C = B(w, "textarea");
    var x = w.ownerDocument;
    var E = x.documentElement;
    var T = w === x.body;
    var P = x.defaultView;
    var z = wr(Je, [ w ]);
    var D = wr(Qe, [ w ]);
    var R = wr($e, [ w ]);
    var L = wr(Q, "");
    var j = wr(z, L, f);
    var U = wr(D, L, l);
    var F = j(b);
    var Y = F === w;
    var W = Y && T;
    var X = !Y && U(S);
    var rr = !Y && m(F) && F === X;
    var ar = rr && !!R(l);
    var er = ar ? j() : F;
    var tr = ar ? X : U();
    var nr = rr ? er : F;
    var vr = W ? E : nr;
    var ir = C ? z(L, u, g) : w;
    var or = W ? vr : ir;
    var ur = rr ? tr : X;
    var cr = x.activeElement;
    var fr = !Y && P.top === P && cr === w;
    var lr = {
      zr: w,
      lr: or,
      sr: vr,
      ra: !Y && D(L, c, h),
      dr: ur,
      aa: !Y && !t && v && v(a),
      Rr: W ? E : vr,
      Wr: W ? x : vr,
      ea: P,
      Yr: x,
      pr: C,
      Ir: T,
      Dr: s,
      _r: Y,
      ta: rr,
      gr: function _viewportHasClass(r, a) {
        return V(vr, Y ? Ua : Ga, Y ? a : r);
      },
      hr: function _viewportAddRemoveClass(r, a, e) {
        return k(vr, Y ? Ua : Ga, Y ? a : r, e);
      }
    };
    var sr = A(lr).reduce((function(r, a) {
      var e = lr[a];
      return O(r, e && m(e) && !q(e) ? e : false);
    }), []);
    var dr = function elementIsGenerated(r) {
      return r ? y(sr, r) : null;
    };
    var pr = lr.zr, _r = lr.lr, gr = lr.ra, hr = lr.sr, br = lr.dr, mr = lr.aa;
    var Sr = [ function() {
      M(_r, Ua);
      M(_r, ja);
      M(pr, ja);
      if (T) {
        M(E, Ua);
        M(E, ja);
      }
    } ];
    var yr = C && dr(_r);
    var Or = C ? pr : N([ br, hr, gr, _r, pr ].find((function(r) {
      return dr(r) === false;
    })));
    var Cr = W ? pr : br || hr;
    var xr = wr(H, Sr);
    var Er = function appendElements() {
      I(_r, Ua, Y ? "viewport" : "host");
      I(gr, $a, "");
      I(br, Qa, "");
      if (!Y) {
        I(hr, Ga, "");
      }
      var r = T && !Y ? Hr(q(w), Va) : G;
      var a = function unwrap(r) {
        Z(q(r), N(r));
        K(r);
      };
      if (yr) {
        J(pr, _r);
        O(Sr, (function() {
          J(_r, pr);
          K(_r);
        }));
      }
      Z(Cr, Or);
      Z(_r, gr);
      Z(gr || _r, !Y && hr);
      Z(hr, br);
      O(Sr, (function() {
        r();
        M(gr, $a);
        M(br, Qa);
        M(hr, Fa);
        M(hr, Ba);
        M(hr, Ga);
        dr(br) && a(br);
        dr(hr) && a(hr);
        dr(gr) && a(gr);
      }));
      if (t && !Y) {
        k(hr, Ga, Xa, true);
        O(Sr, wr(M, hr, Ga));
      }
      if (mr) {
        $(hr, mr);
        O(Sr, wr(K, mr));
      }
      if (fr) {
        var e = "tabindex";
        var n = I(hr, e);
        I(hr, e, "-1");
        hr.focus();
        var v = function revertViewportTabIndex() {
          return n ? I(hr, e, n) : M(hr, e);
        };
        var i = ba(x, "pointerdown keydown", (function() {
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
    return [ lr, Er, xr ];
  };
  var bt = function createTrinsicUpdateSegment(r) {
    var a = r.dr;
    return function(r) {
      var e = r.Gr, t = r.na, n = r.Er;
      var v = Ze(), i = v.B;
      var o = e || {}, u = o.br;
      var c = t.ur;
      var f = (a || !i) && (u || n);
      if (f) {
        var l;
        setStyles(a, (l = {}, l[Kr] = c ? "" : "100%", l));
      }
    };
  };
  var mt = function createPaddingUpdateSegment(r, e) {
    var t = r.lr, n = r.ra, v = r.sr, i = r._r;
    var o = a({
      o: la,
      v: Mr()
    }, wr(Mr, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Or, t = r.Gr, o = r.na, f = r.Er;
      var l = c(f), s = l[0], d = l[1];
      var p = Ze(), _ = p.A, g = p.B;
      var h = t || {}, b = h.ir, m = h.Sr, S = h.mr;
      var y = o.cr;
      var w = a("paddingAbsolute"), O = w[0], C = w[1];
      var x = f || !g && m;
      if (b || d || x) {
        var E = u(f);
        s = E[0];
        d = E[1];
      }
      var T = !i && (C || S || d);
      if (T) {
        var H, P;
        var A = !O || !n && !_;
        var D = s.r + s.l;
        var R = s.t + s.b;
        var I = (H = {}, H[Nr] = A && !y ? -D : 0, H[qr] = A ? -R : 0, H[Br] = A && y ? -D : 0, 
        H.top = A ? -s.t : 0, H.right = A ? y ? -s.r : "auto" : 0, H.left = A ? y ? "auto" : -s.l : 0, 
        H[Gr] = A ? "calc(100% + " + D + "px)" : "", H);
        var L = (P = {}, P[Vr] = A ? s.t : 0, P[jr] = A ? s.r : 0, P[Fr] = A ? s.b : 0, 
        P[Ur] = A ? s.l : 0, P);
        setStyles(n || v, I);
        setStyles(v, L);
        z(e, {
          ra: s,
          va: !A,
          L: n ? L : z({}, I, L)
        });
      }
      return {
        ia: T
      };
    };
  };
  var St = function createOverflowUpdateSegment(r, e) {
    var t = r.lr, n = r.ra, v = r.sr, i = r.aa, o = r._r, u = r.hr, c = r.Ir, f = r.ea;
    var l = wr(er, 0);
    var s = "visible";
    var d = 42;
    var p = {
      o: ca,
      v: {
        w: 0,
        h: 0
      }
    };
    var _ = {
      o: fa,
      v: {
        x: Xr,
        y: Xr
      }
    };
    var g = function getOverflowAmount(r, a) {
      var e = ar.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: l(r.w - a.w),
        h: l(r.h - a.h)
      };
      return {
        w: t.w > e ? t.w : 0,
        h: t.h > e ? t.h : 0
      };
    };
    var h = function overflowIsVisible(r) {
      return r.indexOf(s) === 0;
    };
    var b = Ze(), m = b.j, S = b.B, y = b.A, w = b.D;
    var O = Pe(Ue);
    var C = !o && !y && (w.x || w.y);
    var x = c && o;
    var E = a(p, wr(ea, v)), T = E[0], H = E[1];
    var P = a(p, wr(aa, v)), A = P[0], D = P[1];
    var R = a(p), L = R[0], M = R[1];
    var V = a(p), j = V[0], U = V[1];
    var F = a(_), B = F[0];
    var N = function fixFlexboxGlue(r, a) {
      var n;
      setStyles(v, (n = {}, n[Kr] = "", n));
      if (a) {
        var i;
        var o = e.va, u = e.ra;
        var c = r.oa, f = r.M;
        var l = ea(t);
        var s = ra(t);
        var d = getStyles(v, "boxSizing") === "content-box";
        var p = o || d ? u.b + u.t : 0;
        var _ = !(w.x && d);
        setStyles(v, (i = {}, i[Kr] = s.h + l.h + (c.x && _ ? f.x : 0) - p, i));
      }
    };
    var q = function getViewportOverflowState(r, a) {
      var e = !y && !r ? d : 0;
      var t = function getStatePerAxis(r, t, n) {
        var i = getStyles(v, r);
        var o = a ? a[r] : i;
        var u = o === "scroll";
        var c = t ? e : n;
        var f = u && !y ? c : 0;
        var l = t && !!e;
        return [ i, u, f, l ];
      };
      var n = t(Yr, w.x, m.x), i = n[0], o = n[1], u = n[2], c = n[3];
      var f = t(Wr, w.y, m.y), l = f[0], s = f[1], p = f[2], _ = f[3];
      return {
        Jr: {
          x: i,
          y: l
        },
        oa: {
          x: o,
          y: s
        },
        M: {
          x: u,
          y: p
        },
        k: {
          x: c,
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
      var u = n(e.y, a.y), c = u[0], f = u[1];
      t[Yr] = o && c ? o : i;
      t[Wr] = f && i ? f : c;
      return q(r, t);
    };
    var W = function hideNativeScrollbars(r, a, t, n) {
      var v = r.M, i = r.k;
      var o = i.x, u = i.y;
      var c = v.x, f = v.y;
      var l = e.L;
      var s = a ? Br : Nr;
      var d = a ? Ur : jr;
      var p = l[s];
      var _ = l[qr];
      var g = l[d];
      var h = l[Fr];
      n[Gr] = "calc(100% + " + (f + p * -1) + "px)";
      n[s] = -f + p;
      n[qr] = -c + _;
      if (t) {
        n[d] = g + (u ? f : 0);
        n[Fr] = h + (o ? c : 0);
      }
    };
    var K = O ? O.I(C, S, v, i, e, q, W) : [ function() {
      return C;
    }, function() {
      return [ G ];
    } ], X = K[0], Z = K[1];
    return function(r, a) {
      var i = r.Or, c = r.Gr, s = r.na, d = r.Er;
      var p = a.ia;
      var _ = c || {}, b = _.ir, m = _.yr, O = _.Sr, C = _.br, E = _.mr, P = _.wr;
      var R = s.ur, V = s.cr;
      var F = i("showNativeOverlaidScrollbars"), G = F[0], K = F[1];
      var $ = i("overflow"), J = $[0], Q = $[1];
      var rr = G && w.x && w.y;
      var ar = !o && !S && (b || O || m || K || C);
      var tr = b || p || O || E || P || K;
      var nr = h(J.x);
      var vr = h(J.y);
      var ir = nr || vr;
      var or = H(d);
      var ur = D(d);
      var cr = M(d);
      var fr = U(d);
      var lr;
      if (K && y) {
        u(Xa, qa, !rr);
      }
      if (ar) {
        lr = q(rr);
        N(lr, R);
      }
      if (tr) {
        if (ir) {
          u(Za, Na, false);
        }
        var sr = Z(rr, V, lr), dr = sr[0], pr = sr[1];
        var _r = or = T(d), gr = _r[0], hr = _r[1];
        var br = ur = A(d), mr = br[0], Sr = br[1];
        var yr = ra(v);
        var wr = mr;
        var Or = yr;
        dr();
        if ((Sr || hr || K) && pr && !rr && X(pr, mr, gr, V)) {
          Or = ra(v);
          wr = aa(v);
        }
        var Cr = Jr(f);
        var xr = {
          w: l(er(mr.w, wr.w) + gr.w),
          h: l(er(mr.h, wr.h) + gr.h)
        };
        var Er = {
          w: l((x ? Cr.w : Or.w + l(yr.w - mr.w)) + gr.w),
          h: l((x ? Cr.h : Or.h + l(yr.h - mr.h)) + gr.h)
        };
        fr = j(Er);
        cr = L(g(xr, Er), d);
      }
      var Tr = fr, Hr = Tr[0], Pr = Tr[1];
      var Ar = cr, zr = Ar[0], Dr = Ar[1];
      var Rr = ur, Ir = Rr[0], Lr = Rr[1];
      var Mr = or, kr = Mr[0], Vr = Mr[1];
      var jr = {
        x: zr.w > 0,
        y: zr.h > 0
      };
      var Ur = nr && vr && (jr.x || jr.y) || nr && jr.x && !jr.y || vr && jr.y && !jr.x;
      var Fr = p || E || P || Vr || Lr || Pr || Dr || Q || K || ar || tr;
      if (Fr) {
        var Kr;
        var Xr = (Kr = {}, Kr[Nr] = 0, Kr[qr] = 0, Kr[Br] = 0, Kr[Gr] = "", Kr[Yr] = "", 
        Kr[Wr] = "", Kr);
        var Zr = Y(rr, jr, J, Xr);
        var $r = X(Zr, Ir, kr, V);
        if (!o) {
          W(Zr, V, $r, Xr);
        }
        if (ar) {
          N(Zr, R);
        }
        if (o) {
          I(t, Fa, Xr[Yr]);
          I(t, Ba, Xr[Wr]);
        } else {
          setStyles(v, Xr);
        }
      }
      k(t, Ua, Na, Ur);
      k(n, $a, Ja, Ur);
      if (!o) {
        k(v, Ga, Za, ir);
      }
      var Qr = B(q(rr).Jr), ea = Qr[0], ta = Qr[1];
      z(e, {
        Jr: ea,
        Ar: {
          x: Hr.w,
          y: Hr.h
        },
        Pr: {
          x: zr.w,
          y: zr.h
        },
        Qr: jr
      });
      return {
        $r: ta,
        Xr: Pr,
        Zr: Dr
      };
    };
  };
  var yt = function createStructureSetup(r) {
    var a;
    var e = ht(r), t = e[0], n = e[1], v = e[2];
    var i = {
      ra: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      va: false,
      L: (a = {}, a[Nr] = 0, a[qr] = 0, a[Br] = 0, a[Vr] = 0, a[jr] = 0, a[Fr] = 0, a[Ur] = 0, 
      a),
      Ar: {
        x: 0,
        y: 0
      },
      Pr: {
        x: 0,
        y: 0
      },
      Jr: {
        x: Xr,
        y: Xr
      },
      Qr: {
        x: false,
        y: false
      }
    };
    var o = t.zr, u = t.sr, c = t.hr, f = t._r;
    var l = Ze(), s = l.A, d = l.D, p = l.B;
    var _ = !s && (d.x || d.y);
    var g = [ bt(t), mt(t, i), St(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = _ || !p;
      var t = e && Ea(u);
      c("", Wa, true);
      each(g, (function(e) {
        z(a, e(r, a) || {});
      }));
      c("", Wa);
      xa(u, t);
      !f && xa(o, 0);
      return a;
    }, i, t, v ];
  };
  var wt = function createSetups(r, a, e, t) {
    var n = yt(r), v = n[0], i = n[1], o = n[2], u = n[3], c = n[4];
    var f = ct(u, (function(r) {
      m({}, r);
    })), l = f[0], s = f[1], d = f[2];
    var p = gt(r, a, d, o, u, t), _ = p[0], g = p[1], h = p[3];
    var b = function updateHintsAreTruthy(r) {
      return A(r).some((function(a) {
        return !!r[a];
      }));
    };
    var m = function update(r, t) {
      var n = r.ua, v = r.Er, o = r.Cr, u = r.ca;
      var c = n || {};
      var f = !!v;
      var l = {
        Or: Ra(a, c, f),
        ua: c,
        Er: f
      };
      if (u) {
        g(l);
        return false;
      }
      var p = t || s(z({}, l, {
        Cr: o
      }));
      var _ = i(z({}, l, {
        na: d,
        Gr: p
      }));
      g(z({}, l, {
        Gr: p,
        Kr: _
      }));
      var h = b(p);
      var m = b(_);
      var S = h || m || !R(c) || f;
      S && e(r, {
        Gr: p,
        Kr: _
      });
      return S;
    };
    return [ function() {
      var r = u.zr, a = u.sr, e = u.Yr, t = u.Ir;
      var n = t ? e.documentElement : r;
      var i = Ea(n);
      var o = [ l(), v(), _() ];
      xa(a, i);
      return wr(H, o);
    }, m, function() {
      return {
        fa: d,
        la: o
      };
    }, {
      sa: u,
      da: h
    }, c ];
  };
  var Ot = function OverlayScrollbars(r, a, e) {
    var t = Ze(), n = t.W;
    var v = m(r);
    var i = v ? r : r.target;
    var o = nt(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var a = D(r, true);
        var e = Pe(Me);
        return e ? e(a, true) : a;
      };
      var s = z({}, n(), l(a));
      var d = Ha(), p = d[0], _ = d[1], g = d[2];
      var h = Ha(e), b = h[0], S = h[1], y = h[2];
      var w = function triggerEvent(r, a) {
        y(r, a);
        g(r, a);
      };
      var C = wt(r, s, (function(r, a) {
        var e = r.ua, t = r.Er;
        var n = a.Gr, v = a.Kr;
        var i = n.ir, o = n.mr, u = n.br, c = n.Sr, f = n.yr, l = n.nr;
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
            hostMutation: !!f,
            appear: !!l
          },
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return w("scroll", [ M, r ]);
      })), x = C[0], E = C[1], T = C[2], P = C[3], I = C[4];
      var L = function destroy(r) {
        tt(i);
        H(c);
        u = true;
        w("destroyed", [ M, r ]);
        _();
        S();
      };
      var M = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Da(s, z(e, l(r)));
            if (!R(t)) {
              z(s, t);
              E({
                ua: t
              });
            }
          }
          return z({}, s);
        },
        on: b,
        off: function off(r, a) {
          r && a && S(r, a);
        },
        state: function state() {
          var r = T(), a = r.fa, e = r.la;
          var t = a.cr;
          var n = e.Ar, v = e.Pr, i = e.Jr, o = e.Qr, c = e.ra, f = e.va;
          return z({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: c,
            paddingAbsolute: f,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = P.sa, a = r.zr, e = r.lr, t = r.ra, n = r.sr, v = r.dr, i = r.Rr, o = r.Wr;
          var u = P.da, c = u.Ur, f = u.qr;
          var l = function translateScrollbarStructure(r) {
            var a = r.Hr, e = r.Tr, t = r.Lr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Fr, e = r.Br;
            var t = l(a[0]);
            return z({}, t, {
              clone: function clone() {
                var r = l(e());
                E({
                  ca: true
                });
                return r;
              }
            });
          };
          return z({}, {
            target: a,
            host: e,
            padding: t || n,
            viewport: n,
            content: v || n,
            scrollOffsetElement: i,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(f)
          });
        },
        update: function update(r) {
          return E({
            Er: r,
            Cr: true
          });
        },
        destroy: wr(L, false),
        plugin: function plugin(r) {
          return f[A(r)[0]];
        }
      };
      O(c, [ I ]);
      et(i, M);
      He(xe, OverlayScrollbars, [ M, p, f ]);
      if (rt(P.sa.Ir, !v && r.cancel)) {
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
  Ot.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return He(r, Ot)[0];
    }));
    Te(e);
    return a ? t : t[0];
  };
  Ot.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return b(e) && !!nt(e.target);
  };
  Ot.env = function() {
    var r = Ze(), a = r.j, e = r.D, t = r.A, n = r.F, v = r.B, i = r.R, o = r.U, u = r.K, c = r.X, f = r.q, l = r.Y, s = r.W, d = r.G;
    return z({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: t,
      rtlScrollBehavior: n,
      flexboxGlue: v,
      cssCustomProperties: i,
      scrollTimeline: o,
      staticDefaultInitialization: u,
      staticDefaultOptions: c,
      getDefaultInitialization: f,
      setDefaultInitialization: l,
      getDefaultOptions: s,
      setDefaultOptions: d
    });
  };
  r.ClickScrollPlugin = Ne;
  r.OverlayScrollbars = Ot;
  r.ScrollbarsHidingPlugin = Fe;
  r.SizeObserverPlugin = Ve;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
