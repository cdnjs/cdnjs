/*!
 * OverlayScrollbars
 * Version: 2.4.7
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
  var E = function createOrKeepArray(r) {
    return _(r) ? r : [ r ];
  };
  var x = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var T = function deduplicateArray(r) {
    return C(new Set(r));
  };
  var A = function runEachAndClear(r, a, e) {
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
  var L = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var R = e ? window : {};
  var I = Math.max;
  var k = Math.min;
  var M = Math.round;
  var V = Math.abs;
  var j = R.cancelAnimationFrame;
  var N = R.requestAnimationFrame;
  var F = R.setTimeout;
  var U = R.clearTimeout;
  var B = function animationCurrentTime() {
    return performance.now();
  };
  var q = function animateNumber(r, a, e, t, n) {
    var v = 0;
    var i = B();
    var o = I(0, e);
    var u = function frame(e) {
      var u = B();
      var c = u - i;
      var f = c >= o;
      var l = e ? 1 : 1 - (I(0, i + o - u) / o || 0);
      var s = (a - r) * (p(n) ? n(l, l * o, 0, 1, o) : l) + r;
      var d = f || l === 1;
      t && t(s, l, d);
      v = d ? 0 : N((function() {
        return frame();
      }));
    };
    u();
    return function(r) {
      j(v);
      r && u(r);
    };
  };
  var Y = "paddingTop";
  var W = "paddingRight";
  var G = "paddingLeft";
  var K = "paddingBottom";
  var X = "marginLeft";
  var Z = "marginRight";
  var $ = "marginBottom";
  var J = "overflowX";
  var Q = "overflowY";
  var rr = "width";
  var ar = "height";
  var er = "hidden";
  var tr = "visible";
  var nr = function equal(r, a, e, t) {
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
  var vr = function equalWH(r, a) {
    return nr(r, a, [ "w", "h" ]);
  };
  var ir = function equalXY(r, a) {
    return nr(r, a, [ "x", "y" ]);
  };
  var or = function equalTRBL(r, a) {
    return nr(r, a, [ "t", "r", "b", "l" ]);
  };
  var ur = function equalBCRWH(r, a, e) {
    return nr(r, a, [ rr, ar ], e && function(r) {
      return M(r);
    });
  };
  var cr = function noop() {};
  var fr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var lr = function selfClearTimeout(r) {
    var a;
    var e = r ? F : N;
    var t = r ? U : j;
    return [ function(n) {
      t(a);
      a = e(n, p(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var sr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = cr;
    var i = a || {}, o = i.p, u = i._, c = i.m;
    var f = function invokeFunctionToDebounce(a) {
      v();
      U(e);
      e = t = void 0;
      v = cr;
      r.apply(this, a);
    };
    var s = function mergeParms(r) {
      return c && t ? c(t, r) : r;
    };
    var d = function flush() {
      if (v !== cr) {
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
        var g = a > 0 ? F : N;
        var h = a > 0 ? U : j;
        var b = s(r);
        var m = b || r;
        var S = f.bind(0, m);
        v();
        var y = g(S, a);
        v = function clear() {
          return h(y);
        };
        if (_ && !e) {
          e = F(d, c);
        }
        t = n = m;
      } else {
        f(r);
      }
    };
    _.S = d;
    return _;
  };
  var dr = function attr(r, a, e) {
    if (u(e)) {
      return r ? r.getAttribute(a) : null;
    }
    r && r.setAttribute(a, e);
  };
  var pr = function removeAttr(r, a) {
    r && r.removeAttribute(a);
  };
  var _r = function domTokenListAttr(r, a) {
    var e = fr(dr, r, a);
    var t = function getDomTokenListSet(r) {
      return new Set((r || "").split(" ").filter((function(r) {
        return !!r;
      })));
    };
    var n = function domTokenListOperation(r, a, e) {
      var n = new Set(r);
      t(a).forEach((function(r) {
        n[e](r);
      }));
      return C(n).join(" ");
    };
    var v = t(e());
    return {
      O: function _remove(r) {
        return e(n(v, r, "delete"));
      },
      C: function _add(r) {
        return e(n(v, r, "add"));
      },
      T: function _has(r) {
        var a = t(r);
        return C(a).reduce((function(r, a) {
          return r && v.has(a);
        }), a.size > 0);
      }
    };
  };
  var gr = function removeAttrClass(r, a, e) {
    _r(r, a).O(e);
  };
  var hr = function addAttrClass(r, a, e) {
    _r(r, a).C(e);
    return fr(gr, r, a, e);
  };
  var br = function addRemoveAttrClass(r, a, e, t) {
    (t ? hr : gr)(r, a, e);
  };
  var mr = function hasAttrClass(r, a, e) {
    return _r(r, a).T(e);
  };
  var Sr = e && Element.prototype;
  var yr = function find(r, a) {
    var e = [];
    var t = a ? S(a) && a : document;
    return t ? O(e, t.querySelectorAll(r)) : e;
  };
  var wr = function findFirst(r, a) {
    var e = a ? S(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var Or = function is(r, a) {
    if (S(r)) {
      var e = Sr.matches || Sr.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var Cr = function contents(r) {
    return r ? C(r.childNodes) : [];
  };
  var Er = function parent(r) {
    return r && r.parentElement;
  };
  var xr = function closest(r, a) {
    if (S(r)) {
      var e = Sr.closest;
      if (e) {
        return e.call(r, a);
      }
      do {
        if (Or(r, a)) {
          return r;
        }
        r = Er(r);
      } while (r);
    }
  };
  var Tr = function liesBetween(r, a, e) {
    var t = xr(r, a);
    var n = r && wr(e, t);
    var v = xr(n, a) === t;
    return t && n ? t === r || n === r || v && xr(xr(r, e), a) !== t : false;
  };
  var Ar = function removeElements(r) {
    if (h(r)) {
      each(C(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = Er(r);
      a && a.removeChild(r);
    }
  };
  var Hr = function before(r, a, e) {
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
        return Ar(e);
      };
    }
    return cr;
  };
  var Pr = function appendChildren(r, a) {
    return Hr(r, null, a);
  };
  var zr = function insertBefore(r, a) {
    return Hr(Er(r), r, a);
  };
  var Dr = function insertAfter(r, a) {
    return Hr(Er(r), r && r.nextSibling, a);
  };
  var Lr = function createDiv(r) {
    var a = document.createElement("div");
    dr(a, "class", r);
    return a;
  };
  var Rr = function createDOM(r) {
    var a = Lr();
    a.innerHTML = r.trim();
    return each(Cr(a), (function(r) {
      return Ar(r);
    }));
  };
  var Ir = function firstLetterToUpper(r) {
    return r.charAt(0).toUpperCase() + r.slice(1);
  };
  var kr = function getDummyStyle() {
    return Lr().style;
  };
  var Mr = [ "-webkit-", "-moz-", "-o-", "-ms-" ];
  var Vr = [ "WebKit", "Moz", "O", "MS", "webkit", "moz", "o", "ms" ];
  var jr = {};
  var Nr = {};
  var Fr = function cssProperty(r) {
    var a = Nr[r];
    if (H(Nr, r)) {
      return a;
    }
    var e = Ir(r);
    var t = kr();
    each(Mr, (function(n) {
      var v = n.replace(/-/g, "");
      var i = [ r, n + r, v + e, Ir(v) + e ];
      return !(a = i.find((function(r) {
        return t[r] !== void 0;
      })));
    }));
    return Nr[r] = a || "";
  };
  var Ur = function jsAPI(r) {
    var a = jr[r] || R[r];
    if (H(jr, r)) {
      return a;
    }
    each(Vr, (function(e) {
      a = a || R[e + Ir(r)];
      return !a;
    }));
    jr[r] = a;
    return a;
  };
  var Br = Ur("MutationObserver");
  var qr = Ur("IntersectionObserver");
  var Yr = Ur("ResizeObserver");
  var Wr = Ur("ScrollTimeline");
  var Gr = function createDomTokenListClass(r) {
    return _r(r, "class");
  };
  var Kr = function removeClass(r, a) {
    Gr(r).O(a);
  };
  var Xr = function addClass(r, a) {
    Gr(r).C(a);
    return fr(Kr, r, a);
  };
  var Zr = /^--/;
  var $r = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var Jr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Qr = function parseToZeroOrNumber(r) {
    return Jr(parseFloat(r || ""));
  };
  var ra = function ratioToCssPercent(r) {
    return (Jr(r) * 100).toFixed(3) + "%";
  };
  var aa = function numberToCssPx(r) {
    return Jr(r) + "px";
  };
  function setStyles(r, a) {
    r && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = l(a) ? aa(a) : (a || "") + "";
        if (Zr.test(e)) {
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
      var v = R.getComputedStyle(r, e) || r.style;
      n = t ? $r(v, a) : a.reduce((function(r, a) {
        r[a] = $r(v, a);
        return r;
      }), n);
    }
    return n;
  }
  var ea = function getDirectionIsRTL(r) {
    return getStyles(r, "direction") === "rtl";
  };
  var ta = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Qr(c[v]),
      r: Qr(c[i]),
      b: Qr(c[o]),
      l: Qr(c[u])
    };
  };
  var na = function getTrasformTranslateValue(r, a) {
    return "translate" + (g(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var va = {
    w: 0,
    h: 0
  };
  var ia = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : va;
  };
  var oa = function windowSize(r) {
    return ia("inner", r || R);
  };
  var ua = fr(ia, "offset");
  var ca = fr(ia, "client");
  var fa = fr(ia, "scroll");
  var la = function fractionalSize(r) {
    var a = parseFloat(getStyles(r, rr)) || 0;
    var e = parseFloat(getStyles(r, ar)) || 0;
    return {
      w: a - M(a),
      h: e - M(e)
    };
  };
  var sa = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var da = function domRectHasDimensions(r) {
    return !!(r && (r[ar] || r[rr]));
  };
  var pa = function domRectAppeared(r, a) {
    var e = da(r);
    var t = da(a);
    return !t && e;
  };
  var _a;
  var ga = "passive";
  var ha = function supportPassiveEvents() {
    if (u(_a)) {
      _a = false;
      try {
        R.addEventListener(ga, cr, Object.defineProperty({}, ga, {
          get: function get() {
            _a = true;
          }
        }));
      } catch (r) {}
    }
    return _a;
  };
  var ba = function splitEventNames(r) {
    return r.split(" ");
  };
  var ma = function removeEventListener(r, a, e, t) {
    each(ba(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var Sa = function addEventListener(r, a, e, t) {
    var n;
    var v = ha();
    var i = (n = v && t && t.A) != null ? n : v;
    var o = t && t.H || false;
    var u = t && t.P || false;
    var c = v ? {
      passive: i,
      capture: o
    } : o;
    return fr(A, ba(a).map((function(a) {
      var t = u ? function(n) {
        ma(r, a, t, o);
        e(n);
      } : e;
      r.addEventListener(a, t, c);
      return fr(ma, r, a, t, o);
    })));
  };
  var ya = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var wa = function preventDefault(r) {
    return r.preventDefault();
  };
  var Oa = {
    x: 0,
    y: 0
  };
  var Ca = function absoluteCoordinates(r) {
    var a = r && sa(r);
    return a ? {
      x: a.left + R.pageYOffset,
      y: a.top + R.pageXOffset
    } : Oa;
  };
  var Ea = function getRTLCompatibleScrollPosition(r, a, e) {
    return e ? e.n ? -r : e.i ? a - r : r : r;
  };
  var xa = function getRTLCompatibleScrollBounds(r, a) {
    return [ a ? a.i ? r : 0 : 0, Ea(r, r, a) ];
  };
  var Ta = function scrollElementTo(r, a) {
    var e = l(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    l(t) && (r.scrollLeft = t);
    l(n) && (r.scrollTop = n);
  };
  var Aa = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Ha = function manageListener(r, a) {
    each(E(a), r);
  };
  var Pa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        Ha((function(r) {
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
        Ha((function(r) {
          p(r) && n.add(r);
        }), t);
        return fr(e, r, t);
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
      return fr(A, i);
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
  var za = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (p(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Da = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && H(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var La = {
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
  var Ra = function getOptionsDiff(r, a) {
    var e = {};
    var t = w(P(a), P(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (g(n) && g(v)) {
        z(e[t] = {}, getOptionsDiff(n, v));
        if (L(e[t])) {
          delete e[t];
        }
      } else if (H(a, t) && v !== n) {
        var i = true;
        if (_(n) || _(v)) {
          try {
            if (za(n) === za(v)) {
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
  var Ia = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Da(r, t), e || Da(a, t) !== void 0 ];
    };
  };
  var ka = "data-overlayscrollbars";
  var Ma = "os-environment";
  var Va = Ma + "-scrollbar-hidden";
  var ja = Ma + "-flexbox-glue";
  var Na = ja + "-max";
  var Fa = ka + "-initialize";
  var Ua = ka;
  var Ba = Ua + "-overflow-x";
  var qa = Ua + "-overflow-y";
  var Ya = "overflowVisible";
  var Wa = "scrollbarPressed";
  var Ga = "updating";
  var Ka = "body";
  var Xa = ka + "-viewport";
  var Za = "arrange";
  var $a = "scrollbarHidden";
  var Ja = Ya;
  var Qa = ka + "-padding";
  var re = Ja;
  var ae = ka + "-content";
  var ee = "os-size-observer";
  var te = ee + "-appear";
  var ne = ee + "-listener";
  var ve = ne + "-scroll";
  var ie = ne + "-item";
  var oe = ie + "-final";
  var ue = "os-trinsic-observer";
  var ce = "os-no-css-vars";
  var fe = "os-theme-none";
  var le = "os-scrollbar";
  var se = le + "-rtl";
  var de = le + "-horizontal";
  var pe = le + "-vertical";
  var _e = le + "-track";
  var ge = le + "-handle";
  var he = le + "-visible";
  var be = le + "-cornerless";
  var me = le + "-transitionless";
  var Se = le + "-interaction";
  var ye = le + "-unusable";
  var we = le + "-auto-hide";
  var Oe = we + "-hidden";
  var Ce = le + "-wheel";
  var Ee = _e + "-interactive";
  var xe = ge + "-interactive";
  var Te = {};
  var Ae = {};
  var He = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        Te[e] = r[e];
      }));
    }));
  };
  var Pe = function registerPluginModuleInstances(r, a, e) {
    return P(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], c = o[1], f = o[2];
      var l = e ? i : v;
      if (l) {
        var s = e ? l(u, c, a) : l(a);
        return (f || Ae)[t] = s;
      }
    }));
  };
  var ze = function getStaticPluginModuleInstance(r) {
    return Ae[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.D && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var De = {
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
      }, r.exports.D = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.D = true, r.exports["default"] = r.exports;
  })(De);
  var Le = De.exports;
  var Re = /*@__PURE__*/ getDefaultExportFromCjs(Le);
  var Ie = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var ke = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = Re({}, a);
    var i = P(r).filter((function(r) {
      return H(a, r);
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
          if (L(r[i])) {
            delete r[i];
          }
        }));
      } else if (!l) {
        var h = false;
        var m = [];
        var S = [];
        var y = f(o);
        var w = E(c);
        each(w, (function(r) {
          var a;
          each(Ie, (function(e, t) {
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
            h = Ie[y] === r;
          }
          O(S, e ? Ie.string : a);
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
  var Me = function validateOptions(r, a, e) {
    return ke(r, a, e);
  };
  var Ve = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Ve] = {
      static: function _static() {
        var r = Ie.number;
        var a = Ie.boolean;
        var e = [ Ie.array, Ie.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Ie.number, Ie.array, Ie.null ],
            ignoreMutation: [ Ie.function, Ie.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Ie.string, Ie.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Ie.array, Ie.null ]
          }
        };
        return function(r, a) {
          var e = Me(i, r, a), t = e[0], n = e[1];
          return Re({}, n, t);
        };
      }
    }, r;
  })();
  var je = "__osSizeObserverPlugin";
  var Ne = /* @__PURE__ */ function(r) {
    return r = {}, r[je] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = Rr('<div class="' + ie + '" dir="ltr"><div class="' + ie + '"><div class="' + oe + '"></div></div><div class="' + ie + '"><div class="' + oe + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var c = o.firstChild;
          var f = c == null ? void 0 : c.firstChild;
          var l = ua(o);
          var s = l;
          var d = false;
          var p;
          var _ = function reset() {
            Ta(c, n);
            Ta(u, n);
          };
          var g = function onResized(r) {
            p = 0;
            if (d) {
              l = s;
              a(r === true);
            }
          };
          var h = function onScroll(r) {
            s = ua(o);
            d = !r || !vr(s, l);
            if (r) {
              ya(r);
              if (d && !p) {
                j(p);
                p = N(g);
              }
            } else {
              g(r === false);
            }
            _();
          };
          var b = [ Pr(r, i), Sa(c, v, h), Sa(u, v, h) ];
          Xr(r, ve);
          setStyles(f, (t = {}, t[rr] = n, t[ar] = n, t));
          N(_);
          return [ e ? fr(h, false) : _, b ];
        };
      }
    }, r;
  }();
  var Fe = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.L;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], v = t[1];
    return [ n && e.x && e.y, v ];
  };
  var Ue = function overflowIsVisible(r) {
    return r.indexOf(tr) === 0;
  };
  var Be = function getViewportOverflowState(r, a) {
    var e = r.R;
    var t = function getStatePerAxis(r) {
      var t = getStyles(e, r);
      var n = a ? a[r] : t;
      var v = n === "scroll";
      return [ t, v ];
    };
    var n = t(J), v = n[0], i = n[1];
    var o = t(Q), u = o[0], c = o[1];
    return {
      I: {
        x: v,
        y: u
      },
      k: {
        x: i,
        y: c
      }
    };
  };
  var qe = function setViewportOverflowState(r, a, e, t) {
    var n = a.x || a.y;
    var v = function setAxisOverflowStyle(r, a) {
      var e = Ue(r);
      var t = e && n ? "hidden" : "";
      var v = a && e && r.replace(tr + "-", "") || t;
      return [ a && !e ? r : "", Ue(v) ? "hidden" : v ];
    };
    var i = v(e.x, a.x), o = i[0], u = i[1];
    var c = v(e.y, a.y), f = c[0], l = c[1];
    t[J] = u && f ? u : o;
    t[Q] = l && o ? l : f;
    return Be(r, t);
  };
  var Ye = 0;
  var We = "__osScrollbarsHidingPlugin";
  var Ge = /* @__PURE__ */ function(r) {
    return r = {}, r[We] = {
      static: function _static() {
        return {
          M: function _createUniqueViewportArrangeElement(r) {
            var a = r.V, e = r.L, t = r.j;
            var n = !t && !a && (e.x || e.y);
            var v = n ? document.createElement("style") : false;
            if (v) {
              dr(v, "id", Xa + "-" + Za + "-" + Ye);
              Ye++;
            }
            return v;
          },
          N: function _viewportArrangement(r, a, e, t, n) {
            var v = r.F, i = r.R, o = r.U;
            var u = t.V, c = t.L, f = t.B, l = t.q;
            var s = !v && !u && (c.x || c.y);
            var d = Fe(n, t), p = d[0];
            var _ = function _getViewportOverflowHideOffset(r) {
              var a = r.k;
              var e = u || p ? 0 : 42;
              var t = function getHideOffsetPerAxis(r, a, t) {
                var n = r ? e : t;
                var v = a && !u ? n : 0;
                var i = r && !!e;
                return [ v, i ];
              };
              var n = t(c.x, a.x, l.x), v = n[0], i = n[1];
              var o = t(c.y, a.y, l.y), f = o[0], s = o[1];
              return {
                Y: {
                  x: v,
                  y: f
                },
                W: {
                  x: i,
                  y: s
                }
              };
            };
            var g = function _hideNativeScrollbars(r, e, t, n) {
              var i;
              var o = e.G;
              z(n, (i = {}, i[Z] = 0, i[$] = 0, i[X] = 0, i));
              if (!v) {
                var u = _(r), c = u.Y, f = u.W;
                var l = f.x, s = f.y;
                var d = c.x, p = c.y;
                var g = a.K;
                var h = o ? X : Z;
                var b = o ? G : W;
                var m = g[h];
                var S = g[$];
                var y = g[b];
                var w = g[K];
                n[rr] = "calc(100% + " + (p + m * -1) + "px)";
                n[h] = -p + m;
                n[$] = -d + S;
                if (t) {
                  n[b] = y + (s ? p : 0);
                  n[K] = w + (l ? d : 0);
                }
              }
            };
            var h = function _arrangeViewport(r, t, n) {
              if (s) {
                var v = a.K;
                var u = _(r), c = u.Y, f = u.W;
                var l = f.x, d = f.y;
                var p = c.x, g = c.y;
                var h = e.G;
                var b = h ? W : G;
                var m = v[b];
                var S = v.paddingTop;
                var y = t.w + n.w;
                var w = t.h + n.h;
                var O = {
                  w: g && d ? g + y - m + "px" : "",
                  h: p && l ? p + w - S + "px" : ""
                };
                if (o) {
                  var C = o.sheet;
                  if (C) {
                    var E = C.cssRules;
                    if (E) {
                      if (!E.length) {
                        C.insertRule("#" + dr(o, "id") + " + [" + Xa + "~='" + Za + "']::before {}", 0);
                      }
                      var x = E[0].style;
                      x[rr] = O.w;
                      x[ar] = O.h;
                    }
                  }
                } else {
                  setStyles(i, {
                    "--os-vaw": O.w,
                    "--os-vah": O.h
                  });
                }
              }
              return s;
            };
            var b = function _undoViewportArrange(t) {
              if (s) {
                var n = t || Be(r);
                var v = a.K;
                var o = _(n), u = o.W;
                var c = u.x, l = u.y;
                var d = {};
                var p = function assignProps(r) {
                  return each(r, (function(r) {
                    d[r] = v[r];
                  }));
                };
                if (c) {
                  p([ $, Y, K ]);
                }
                if (l) {
                  p([ X, Z, G, W ]);
                }
                var h = getStyles(i, P(d));
                gr(i, Xa, Za);
                if (!f) {
                  d[ar] = "";
                }
                setStyles(i, d);
                return [ function() {
                  g(n, e, s, h);
                  setStyles(i, h);
                  hr(i, Xa, Za);
                }, n ];
              }
              return [ cr ];
            };
            return {
              X: _,
              Z: h,
              $: b,
              J: g
            };
          },
          rr: function _envWindowZoom() {
            var r = {
              w: 0,
              h: 0
            };
            var a = 0;
            var e = function getWindowDPR() {
              var r = R.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return R.devicePixelRatio || a / e;
            };
            var t = function diffBiggerThanOne(r, a) {
              var e = V(r);
              var t = V(a);
              return !(e === t || e + 1 === t || e - 1 === t);
            };
            return function(n, v) {
              var i = oa();
              var o = {
                w: i.w - r.w,
                h: i.h - r.h
              };
              if (o.w === 0 && o.h === 0) {
                return;
              }
              var u = {
                w: V(o.w),
                h: V(o.h)
              };
              var c = {
                w: V(M(i.w / (r.w / 100))),
                h: V(M(i.h / (r.h / 100)))
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
                z(n.q, g);
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
  var Ke = "__osClickScrollPlugin";
  var Xe = /* @__PURE__ */ function(r) {
    return r = {}, r[Ke] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = cr;
          var o = function animateClickScroll(o) {
            i = q(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var f = c + t;
              var l = n >= c && n <= f;
              if (u && !l) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var s = F((function() {
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
  var Ze;
  var $e = function getNativeScrollbarSize(r, a, e, t) {
    Pr(r, a);
    var n = ca(a);
    var v = ua(a);
    var i = la(e);
    t && Ar(a);
    return {
      x: v.h - n.h + i.h,
      y: v.w - n.w + i.w
    };
  };
  var Je = function getNativeScrollbarsHiding(r) {
    var a = false;
    var e = Xr(r, Va);
    try {
      a = getStyles(r, Fr("scrollbar-width")) === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
    } catch (t) {}
    e();
    return a;
  };
  var Qe = function getRtlScrollBehavior(r, a) {
    var e;
    setStyles(r, (e = {}, e[J] = er, e[Q] = er, e.direction = "rtl", e));
    Ta(r, {
      x: 0
    });
    var t = Ca(r);
    var n = Ca(a);
    Ta(r, {
      x: -999
    });
    var v = Ca(a);
    return {
      i: t.x === n.x,
      n: n.x !== v.x
    };
  };
  var rt = function getFlexboxGlue(r, a) {
    var e = Xr(r, ja);
    var t = sa(r);
    var n = sa(a);
    var v = ur(n, t, true);
    var i = Xr(r, Na);
    var o = sa(r);
    var u = sa(a);
    var c = ur(u, o, true);
    e();
    i();
    return v && c;
  };
  var at = function createEnvironment() {
    var r = document, e = r.body;
    var t = Rr('<div class="' + Ma + '"><div></div></div>');
    var n = t[0];
    var v = n.firstChild;
    var i = Pa(), o = i[0], u = i[2];
    var c = a({
      v: $e(e, n, v),
      o: ir
    }, fr($e, e, n, v, true)), f = c[0], l = c[1];
    var s = l(), d = s[0];
    var p = Je(n);
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
    var h = z({}, La);
    var b = fr(z, {}, h);
    var m = fr(z, {}, g);
    var S = {
      q: d,
      L: _,
      V: p,
      j: getStyles(n, "zIndex") === "-1",
      ar: !!Wr,
      er: Qe(n, v),
      B: rt(n, v),
      tr: fr(o, "r"),
      nr: m,
      vr: function _setDefaultInitialization(r) {
        return z(g, r) && m();
      },
      ir: b,
      ur: function _setDefaultOptions(r) {
        return z(h, r) && b();
      },
      cr: z({}, g),
      lr: z({}, h)
    };
    pr(n, "style");
    Ar(n);
    R.addEventListener("resize", (function() {
      var r;
      if (!p && (!_.x || !_.y)) {
        var a = ze(We);
        var e = a ? a.rr() : cr;
        r = !!e(S, f);
      }
      u("r", [ r ]);
    }));
    return S;
  };
  var et = function getEnvironment() {
    if (!Ze) {
      Ze = at();
    }
    return Ze;
  };
  var tt = function resolveInitialization(r, a) {
    return p(a) ? a.apply(0, r) : a;
  };
  var nt = function staticInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = tt(r, n);
    return v || a.apply(0, r);
  };
  var vt = function dynamicInitializationElement(r, a, e, t) {
    var n = u(t) ? e : t;
    var v = tt(r, n);
    return !!v && (m(v) ? v : a.apply(0, r));
  };
  var it = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = et(), i = v.L, o = v.V, f = v.nr;
    var l = f().cancel, s = l.nativeScrollbarsOverlaid, d = l.body;
    var p = t != null ? t : s;
    var _ = u(n) ? d : n;
    var g = (i.x || i.y) && p;
    var h = r && (c(_) ? !o : _);
    return !!g || !!h;
  };
  var ot = new WeakMap;
  var ut = function addInstance(r, a) {
    ot.set(r, a);
  };
  var ct = function removeInstance(r) {
    ot.delete(r);
  };
  var ft = function getInstance(r) {
    return ot.get(r);
  };
  var lt = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || yr)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = Sa(v, i.trim(), (function(r) {
                if (t) {
                  c();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, O(o, c));
            } else {
              A(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var st = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.sr, o = v.dr, u = v.pr, c = v._r, f = v.gr, l = v.hr;
    var s = sr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var d = lt(r, s, u), p = d[0], _ = d[1];
    var g = i || [];
    var h = o || [];
    var b = w(g, h);
    var m = function observerCallback(n, v) {
      if (!x(v)) {
        var i = f || cr;
        var o = l || cr;
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
          var C = w ? dr(v, n || "") : null;
          var E = w && l !== C;
          var x = y(h, n) && E;
          if (a && (m || !S)) {
            var T = b && E;
            var A = T && c && Or(v, c);
            var H = A ? !i(v, n, l, C) : !b || T;
            var P = H && !o(e, !!A, r, t);
            each(_, (function(r) {
              return O(u, r);
            }));
            each(g, (function(r) {
              return O(u, r);
            }));
            p = p || P;
          }
          if (!a && S && E && !i(v, n, l, C)) {
            O(s, n);
            d = d || x;
          }
        }));
        _((function(r) {
          return T(u).reduce((function(a, e) {
            O(a, yr(r, e));
            return Or(e, r) ? O(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!x(s) || d) {
          var g = [ T(s), d ];
          !n && e.apply(0, g);
          return g;
        }
      }
    };
    var S = new Br(fr(m, false));
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
  var dt = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.br, o = v.mr;
    var u = ze(je);
    var c = et(), f = c.er;
    var l = fr(ea, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = Rr('<div class="' + ee + '"><div class="' + ne + '"></div></div>');
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
          var g = da(s);
          var h = pa(s, p);
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
          var m = t ? r[0] : ea(c);
          Ta(c, {
            x: Ea(n, n, m && f),
            y: n
          });
        }
        if (!v) {
          e({
            Sr: t ? r : void 0,
            yr: !t,
            mr: o
          });
        }
      };
      if (Yr) {
        var g = new Yr((function(r) {
          return p(r.pop());
        }));
        g.observe(s);
        O(t, (function() {
          g.disconnect();
        }));
      } else if (u) {
        var h = u(s, p, o), b = h[0], m = h[1];
        O(t, w([ Xr(c, te), Sa(c, "animationstart", b) ], m));
      } else {
        return cr;
      }
      if (i) {
        var S = a({
          v: void 0
        }, l), y = S[0];
        O(t, Sa(c, "scroll", (function(r) {
          var a = y();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Kr(s, "ltr rtl");
            Xr(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          ya(r);
        })));
      }
      return fr(A, O(t, Pr(r, c)));
    };
  };
  var pt = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Lr(ue);
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
      if (qr) {
        t = new qr(fr(c, false), {
          root: r
        });
        t.observe(v);
        O(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = ua(v);
          u(r);
        };
        O(a, dt(v, e)());
        e();
      }
      return fr(A, O(a, Pr(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var _t = function createObserversSetup(r, e, t, n) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var f = et(), d = f.V;
    var g = "[" + Ua + "]";
    var h = "[" + Xa + "]";
    var b = [ "tabindex" ];
    var m = [ "wrap", "cols", "rows" ];
    var S = [ "id", "class", "style", "open" ];
    var O = {
      wr: false,
      G: ea(r.Or)
    };
    var C = r.Or, E = r.R, x = r.Cr, T = r.Er, A = r.F, H = r.Tr, D = r.Ar;
    var L = et();
    var R = ze(We);
    var I = a({
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = R && R.N(r, e, O, L, t).$;
      var n = H(Ja);
      var v = !A && H(Za);
      var i = v && Aa(E);
      D(Ja);
      A && D(Ga, true);
      var o = v && a && a()[0];
      var u = fa(x);
      var c = fa(E);
      var f = la(E);
      D(Ja, n);
      A && D(Ga);
      o && o();
      Ta(E, i);
      return {
        w: c.w + u.w + f.w,
        h: c.h + u.h + f.h
      };
    })), k = I[0];
    var M = T ? m : w(S, m);
    var V = sr(n, {
      p: function _timeout() {
        return v;
      },
      _: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ w(P(e), P(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var j = function updateViewportAttrsFromHost(r) {
      each(r || b, (function(r) {
        if (y(b, r)) {
          var a = dr(C, r);
          if (s(a)) {
            dr(E, r, a);
          } else {
            pr(E, r);
          }
        }
      }));
    };
    var N = function onTrinsicChanged(r, a) {
      var e = r[0], t = r[1];
      var v = {
        Hr: t
      };
      z(O, {
        wr: e
      });
      !a && n(v);
      return v;
    };
    var F = function onSizeChanged(r) {
      var a = r.yr, e = r.Sr, t = r.mr;
      var v = a && !t && !e;
      var i = !v && d ? V : n;
      var o = e || [], u = o[0], c = o[1];
      e && z(O, {
        G: u
      });
      i({
        yr: a || t,
        mr: t,
        Pr: c
      });
    };
    var U = function onContentMutation(r, a) {
      var e = k(), t = e[1];
      var v = {
        zr: t
      };
      var i = r ? n : V;
      t && !a && i(v);
      return v;
    };
    var B = function onHostMutation(r, a, e) {
      var t = {
        Dr: a
      };
      if (a && !e) {
        V(t);
      } else if (!A) {
        j(r);
      }
      return t;
    };
    var q = L.B, Y = L.tr;
    var W = x || !q ? pt(C, N) : [], G = W[0], K = W[1];
    var X = !A && dt(C, F, {
      mr: true,
      br: true
    });
    var Z = st(C, false, B, {
      dr: S,
      sr: w(S, b)
    }), $ = Z[0], J = Z[1];
    var Q = A && Yr && new Yr((function(r) {
      var a = r[r.length - 1].contentRect;
      F({
        yr: true,
        mr: pa(a, c)
      });
      c = a;
    }));
    return [ function() {
      j();
      Q && Q.observe(C);
      var r = X && X();
      var a = G && G();
      var e = $();
      var t = Y((function(r) {
        var a = k(), e = a[1];
        V({
          Lr: r,
          zr: e
        });
      }));
      return function() {
        Q && Q.disconnect();
        r && r();
        a && a();
        u && u();
        e();
        t();
      };
    }, function(r) {
      var a = r.Rr, e = r.Ir, t = r.kr;
      var n = {};
      var c = a("update.ignoreMutation"), f = c[0];
      var s = a("update.attributes"), d = s[0], b = s[1];
      var m = a("update.elementEvents"), S = m[0], y = m[1];
      var O = a("update.debounce"), C = O[0], T = O[1];
      var H = y || b;
      var P = e || t;
      var D = function ignoreMutationFromOptions(r) {
        return p(f) && f(r);
      };
      if (H) {
        o && o();
        u && u();
        var L = st(x || E, true, U, {
          sr: w(M, d || []),
          pr: S,
          _r: g,
          hr: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !A ? Tr(e, g, h) : false;
            return n || !!xr(e, "." + le) || !!D(r);
          }
        }), R = L[0], I = L[1];
        u = R();
        o = I;
      }
      if (T) {
        V.S();
        if (_(C)) {
          var k = C[0];
          var j = C[1];
          v = l(k) && k;
          i = l(j) && j;
        } else if (l(C)) {
          v = C;
          i = false;
        } else {
          v = false;
          i = false;
        }
      }
      if (P) {
        var F = J();
        var q = K && K();
        var Y = o && o();
        F && z(n, B(F[0], F[1], P));
        q && z(n, N(q[0], P));
        Y && z(n, U(Y[0], P));
      }
      return n;
    }, O ];
  };
  var gt = function capNumber(r, a, e) {
    return I(r, k(a, e));
  };
  var ht = function getScrollbarHandleOffsetPercent(r, a, e) {
    var t = M(a);
    var n = xa(t, e), v = n[0], i = n[1];
    var o = (i - r) / i;
    var u = r / v;
    var c = r / i;
    var f = e ? e.n ? o : e.i ? u : c : c;
    return gt(0, 1, f);
  };
  var bt = function getScrollbarHandleLengthRatio(r, a, e) {
    if (e) {
      var t = a ? rr : ar;
      var n = e.Mr, v = e.Vr;
      var i = sa(v)[t];
      var o = sa(n)[t];
      return gt(0, 1, i / o);
    }
    var u = a ? "x" : "y";
    var c = r.jr, f = r.Nr;
    var l = f[u];
    var s = c[u];
    return gt(0, 1, l / (l + s));
  };
  var mt = function getScrollbarHandleOffsetRatio(r, a, e, t) {
    var n = bt(r, t, a);
    return 1 / n * (1 - n) * e;
  };
  var St = function createScrollbarsSetupElements(r, a, e, t) {
    var n = et(), v = n.nr, i = n.j;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var f = a.Fr, l = a.Or, s = a.R, p = a.Ur, _ = a.Br, g = a.qr, h = a.F;
    var b = p ? {} : r, m = b.scrollbars;
    var S = m || {}, C = S.slot;
    var T = new Map;
    var H = function initScrollTimeline(r) {
      return Wr && new Wr({
        source: _,
        axis: r
      });
    };
    var P = H("x");
    var D = H("y");
    var L = vt([ f, l, s ], (function() {
      return h && g ? f : l;
    }), c, C);
    var R = function doRefreshScrollbarOffset(r) {
      return h && !g && Er(r) === s;
    };
    var I = function getScrollbarOffsetKeyframes(r, a, e) {
      var t = .5 * (e ? 1 : -1);
      var n = a && e ? -1 : 1;
      return {
        transform: [ na(aa(0 + t), a), na(aa(r * n + t), a) ]
      };
    };
    var k = function addDirectionRTLKeyframes(r, a) {
      return z(r, a ? {
        clear: [ "left" ]
      } : {});
    };
    var M = function cancelElementAnimations(r) {
      T.forEach((function(a, e) {
        var t = r ? y(E(r), e) : true;
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
      var t = e ? Xr : Kr;
      each(r, (function(r) {
        t(r.Yr, a);
      }));
    };
    var N = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var U = function scrollbarStructureRefreshHandleLength(r, a) {
      N(r, (function(r) {
        var t;
        var n = r.Vr;
        return [ n, (t = {}, t[a ? rr : ar] = ra(bt(e, a)), t) ];
      }));
    };
    var B = function scrollbarStructureRefreshHandleOffset(r, a) {
      if (P && D) {
        each(r, (function(r) {
          var t = r.Yr, n = r.Vr;
          var v = fr(mt, e, r);
          var i = a && ea(t);
          var o = v(i ? 1 : 0, a);
          var u = v(i ? 0 : 1, a);
          V(n, a ? P : D, k({
            transform: [ na(ra(o), a), na(ra(u), a) ]
          }, i));
        }));
      } else {
        N(r, (function(r) {
          var t = r.Vr, n = r.Yr;
          var v = et(), i = v.er;
          var o = a ? "x" : "y";
          var u = e.jr;
          var c = ea(n);
          var f = mt(e, r, ht(Aa(_)[o], u[o], a && c && i), a);
          return [ t, {
            transform: na(ra(f), a)
          } ];
        }));
      }
    };
    var q = function styleScrollbarPosition(r) {
      var a = r.Yr;
      var e = R(a) && a;
      var t = Aa(_), n = t.x, v = t.y;
      return [ e, {
        transform: e ? na({
          x: aa(n),
          y: aa(v)
        }) : ""
      } ];
    };
    var Y = [];
    var W = [];
    var G = [];
    var K = function scrollbarsAddRemoveClass(r, a, e) {
      var t = d(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && j(W, r, a);
      v && j(G, r, a);
    };
    var X = function refreshScrollbarsHandleLength() {
      U(W, true);
      U(G);
    };
    var Z = function refreshScrollbarsHandleOffset() {
      B(W, true);
      B(G);
    };
    var $ = function refreshScrollbarsScrollbarOffset() {
      if (h) {
        if (P && D) {
          var r = e.jr;
          var a = !!W.find((function(r) {
            var a = r.Yr;
            return ea(a);
          }));
          var t = function setScrollbarElementAnimation(r, e, t, n, v) {
            return V(r, e, k(I(t, n, v), a), "add");
          };
          each(w(G, W), (function(e) {
            var n = e.Yr;
            if (R(n)) {
              t(n, P, r.x, true, a);
              t(n, D, r.y);
            } else {
              M(n);
            }
          }));
        } else {
          N(W, q);
          N(G, q);
        }
      }
    };
    var J = function generateScrollbarDOM(r) {
      var a = r ? de : pe;
      var e = r ? W : G;
      var n = x(e) ? me : "";
      var v = Lr(le + " " + a + " " + n);
      var o = Lr(_e);
      var u = Lr(ge);
      var c = {
        Yr: v,
        Mr: o,
        Vr: u
      };
      if (!i) {
        Xr(v, ce);
      }
      O(e, c);
      O(Y, [ Pr(v, o), Pr(o, u), fr(Ar, v), M, t(c, K, B, r) ]);
      return c;
    };
    var Q = fr(J, true);
    var er = fr(J, false);
    var tr = function appendElements() {
      Pr(L, W[0].Yr);
      Pr(L, G[0].Yr);
      F((function() {
        K(me);
      }), 300);
      return fr(A, Y);
    };
    Q();
    er();
    return [ {
      Wr: X,
      Gr: Z,
      Kr: $,
      Xr: K,
      Zr: {
        ar: P,
        $r: W,
        Jr: Q,
        Qr: fr(N, W)
      },
      ra: {
        ar: D,
        $r: G,
        Jr: er,
        Qr: fr(N, G)
      }
    }, tr ];
  };
  var yt = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.Or, n = a.Br, v = a.aa;
    return function(a, i, o, u) {
      var c = a.Yr, f = a.Mr, l = a.Vr;
      var s = lr(333), d = s[0], p = s[1];
      var _ = lr(), g = _[0], h = _[1];
      var b = fr(o, [ a ], u);
      var m = !!n.scrollBy;
      var S = "client" + (u ? "X" : "Y");
      var y = u ? rr : ar;
      var w = u ? "left" : "top";
      var C = u ? "w" : "h";
      var E = u ? "x" : "y";
      var x = function isAffectingTransition(r) {
        return r.propertyName.indexOf(y) > -1;
      };
      var T = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var i = function createRelativeHandleMove(r, a) {
          return function(t) {
            var v;
            var i = e.jr;
            var o = ua(f)[C] - ua(l)[C];
            var u = a * t / o;
            var c = u * i[E];
            Ta(n, (v = {}, v[E] = r + c, v));
          };
        };
        return Sa(f, "pointerdown", (function(e) {
          var o = xr(e.target, "." + ge) === l;
          var u = o ? l : f;
          var c = r.scrollbars;
          var s = e.button, d = e.isPrimary, p = e.pointerType;
          var _ = c.pointers;
          var g = s === 0 && d && c[o ? "dragScroll" : "clickScroll"] && (_ || []).includes(p);
          if (g) {
            var h = !o && e.shiftKey;
            var b = fr(sa, l);
            var m = fr(sa, f);
            var x = function getHandleOffset(r, a) {
              return (r || b())[w] - (a || m())[w];
            };
            var T = M(sa(n)[y]) / ua(n)[C] || 1;
            var H = i(Aa(n)[E] || 0, 1 / T);
            var P = e[S];
            var z = b();
            var D = m();
            var L = z[y];
            var R = x(z, D) + L / 2;
            var I = P - D[w];
            var k = o ? 0 : I - R;
            var V = function releasePointerCapture(r) {
              A(N);
              u.releasePointerCapture(r.pointerId);
            };
            var j = hr(t, Ua, Wa);
            var N = [ j, Sa(v, a, V), Sa(v, "selectstart", (function(r) {
              return wa(r);
            }), {
              A: false
            }), Sa(f, a, V), Sa(f, "pointermove", (function(r) {
              var a = r[S] - P;
              if (o || h) {
                H(k + a);
              }
            })) ];
            u.setPointerCapture(e.pointerId);
            if (h) {
              H(k);
            } else if (!o) {
              var F = ze(Ke);
              F && O(N, F(H, x, k, L, I));
            }
          }
        }));
      };
      var H = true;
      return fr(A, [ Sa(c, "pointerenter", (function() {
        i(Se, true);
      })), Sa(c, "pointerleave pointercancel", (function() {
        i(Se, false);
      })), Sa(c, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, v = r.deltaMode;
        if (m && H && v === 0 && Er(c) === t) {
          n.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        H = false;
        i(Ce, true);
        d((function() {
          H = true;
          i(Ce);
        }));
        wa(r);
      }), {
        A: false,
        H: true
      }), Sa(l, "transitionstart", (function(r) {
        if (x(r)) {
          var a = function animateHandleOffset() {
            b();
            g(animateHandleOffset);
          };
          a();
        }
      })), Sa(l, "transitionend transitioncancel", (function(r) {
        if (x(r)) {
          h();
          b();
        }
      })), Sa(c, "mousedown", fr(Sa, v, "click", ya, {
        P: true,
        H: true
      }), {
        H: true
      }), T(), p, h ]);
    };
  };
  var wt = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var f;
    var l = cr;
    var s = 0;
    var d = lr(), p = d[0], _ = d[1];
    var g = lr(), h = g[0], b = g[1];
    var m = lr(100), S = m[0], y = m[1];
    var w = lr(100), C = w[0], E = w[1];
    var x = lr(100), T = x[0], H = x[1];
    var P = lr((function() {
      return s;
    })), z = P[0], D = P[1];
    var L = St(r, n, t, yt(a, n, t)), R = L[0], I = L[1];
    var k = n.Or, M = n.ea, V = n.qr;
    var j = R.Xr, N = R.Wr, F = R.Gr, U = R.Kr;
    var B = function manageAutoHideSuspension(r) {
      j(we, r, true);
      j(we, r, false);
    };
    var q = function manageScrollbarsAutoHide(r, a) {
      D();
      if (r) {
        j(Oe);
      } else {
        var e = fr(j, Oe, true);
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
    var G = [ y, D, E, H, b, _, function() {
      return l();
    }, Sa(k, "pointerover", W, {
      P: true
    }), Sa(k, "pointerenter", W), Sa(k, "pointerleave", (function(r) {
      if (Y(r)) {
        c = false;
        o && q(false);
      }
    })), Sa(k, "pointermove", (function(r) {
      Y(r) && i && p((function() {
        y();
        q(true);
        C((function() {
          i && q(false);
        }));
      }));
    })), Sa(M, "scroll", (function(r) {
      h((function() {
        F();
        u && q(true);
        S((function() {
          u && !c && q(false);
        }));
      }));
      v(r);
      U();
    })) ];
    return [ function() {
      return fr(A, O(G, I()));
    }, function(r) {
      var a = r.Rr, n = r.kr, v = r.ta, c = r.na;
      var d = c || {}, p = d.va, _ = d.ia, g = d.oa;
      var h = v || {}, b = h.Pr, m = h.mr;
      var S = e.G;
      var y = et(), w = y.L;
      var O = t.jr, C = t.I, E = t.ua;
      var x = a("showNativeOverlaidScrollbars"), A = x[0], H = x[1];
      var P = a("scrollbars.theme"), z = P[0], D = P[1];
      var L = a("scrollbars.visibility"), R = L[0], I = L[1];
      var k = a("scrollbars.autoHide"), Y = k[0], W = k[1];
      var G = a("scrollbars.autoHideSuspend"), K = G[0], X = G[1];
      var Z = a("scrollbars.autoHideDelay"), $ = Z[0];
      var J = a("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var ar = a("scrollbars.clickScroll"), er = ar[0], tr = ar[1];
      var nr = m && !n;
      var vr = E.x || E.y;
      var ir = p || _ || b || n;
      var or = g || I;
      var ur = A && w.x && w.y;
      var cr = function setScrollbarVisibility(r, a) {
        var e = R === "visible" || R === "auto" && r === "scroll";
        j(he, e, a);
        return e;
      };
      s = $;
      if (nr) {
        if (K && vr) {
          B(false);
          l();
          T((function() {
            l = Sa(M, "scroll", fr(B, true), {
              P: true
            });
          }));
        } else {
          B(true);
        }
      }
      if (H) {
        j(fe, ur);
      }
      if (D) {
        j(f);
        j(z, true);
        f = z;
      }
      if (X && !K) {
        B(true);
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
      if (tr) {
        j(Ee, er);
      }
      if (or) {
        var lr = cr(C.x, true);
        var sr = cr(C.y, false);
        var dr = lr && sr;
        j(be, !dr);
      }
      if (ir) {
        N();
        F();
        U();
        j(ye, !O.x, true);
        j(ye, !O.y, false);
        j(se, S && !V);
      }
    }, {}, R ];
  };
  var Ot = function createStructureSetupElements(r) {
    var a = et();
    var e = a.nr, t = a.V;
    var n = ze(We);
    var v = n && n.M;
    var i = e(), o = i.elements;
    var u = o.host, c = o.padding, f = o.viewport, l = o.content;
    var s = m(r);
    var d = s ? {} : r;
    var p = d.elements;
    var _ = p || {}, g = _.host, h = _.padding, b = _.viewport, S = _.content;
    var w = s ? r : d.target;
    var C = Or(w, "textarea");
    var E = w.ownerDocument;
    var x = E.documentElement;
    var T = w === E.body;
    var H = E.defaultView;
    var z = fr(nt, [ w ]);
    var D = fr(vt, [ w ]);
    var L = fr(tt, [ w ]);
    var R = fr(Lr, "");
    var I = fr(z, R, f);
    var k = fr(D, R, l);
    var M = I(b);
    var V = M === w;
    var j = V && T;
    var N = !V && k(S);
    var F = !V && m(M) && M === N;
    var U = F && !!L(l);
    var B = U ? I() : M;
    var q = U ? N : k();
    var Y = F ? B : M;
    var W = j ? x : Y;
    var G = C ? z(R, u, g) : w;
    var K = j ? W : G;
    var X = F ? q : N;
    var Z = E.activeElement;
    var $ = !V && H.top === H && Z === w;
    var J = {
      Fr: w,
      Or: K,
      R: W,
      ca: !V && D(R, c, h),
      Cr: X,
      U: !V && !t && v && v(a),
      Br: j ? x : W,
      ea: j ? E : W,
      fa: T ? x : w,
      la: H,
      aa: E,
      Er: C,
      qr: T,
      Ur: s,
      F: V,
      sa: F,
      Tr: function _viewportHasClass(r) {
        return mr(W, V ? Ua : Xa, r);
      },
      Ar: function _viewportAddRemoveClass(r, a) {
        return br(W, V ? Ua : Xa, r, a);
      }
    };
    var Q = P(J).reduce((function(r, a) {
      var e = J[a];
      return O(r, e && m(e) && !Er(e) ? e : false);
    }), []);
    var rr = function elementIsGenerated(r) {
      return r ? y(Q, r) : null;
    };
    var ar = J.Fr, er = J.Or, tr = J.ca, nr = J.R, vr = J.Cr, ir = J.U;
    var or = [ function() {
      pr(er, Ua);
      pr(er, Fa);
      pr(ar, Fa);
      if (T) {
        pr(x, Ua);
        pr(x, Fa);
      }
    } ];
    var ur = C && rr(er);
    var cr = C ? ar : Cr([ vr, nr, tr, er, ar ].find((function(r) {
      return rr(r) === false;
    })));
    var lr = j ? ar : vr || nr;
    var sr = fr(A, or);
    var _r = function appendElements() {
      dr(er, Ua, V ? "viewport" : "host");
      dr(tr, Qa, "");
      dr(vr, ae, "");
      if (!V) {
        dr(nr, Xa, "");
        T && hr(x, Ua, Ka);
      }
      var r = function unwrap(r) {
        Pr(Er(r), Cr(r));
        Ar(r);
      };
      if (ur) {
        Dr(ar, er);
        O(or, (function() {
          Dr(er, ar);
          Ar(er);
        }));
      }
      Pr(lr, cr);
      Pr(er, tr);
      Pr(tr || er, !V && nr);
      Pr(nr, vr);
      O(or, (function() {
        pr(tr, Qa);
        pr(vr, ae);
        pr(nr, Ba);
        pr(nr, qa);
        pr(nr, Xa);
        rr(vr) && r(vr);
        rr(nr) && r(nr);
        rr(tr) && r(tr);
      }));
      if (t && !V) {
        hr(nr, Xa, $a);
        O(or, fr(pr, nr, Xa));
      }
      if (ir) {
        zr(nr, ir);
        O(or, fr(Ar, ir));
      }
      if ($) {
        var a = "tabindex";
        var e = dr(nr, a);
        dr(nr, a, "-1");
        nr.focus();
        var n = function revertViewportTabIndex() {
          return e ? dr(nr, a, e) : pr(nr, a);
        };
        var v = Sa(E, "pointerdown keydown", (function() {
          n();
          v();
        }));
        O(or, [ n, v ]);
      } else if (Z && Z.focus) {
        Z.focus();
      }
      cr = 0;
      return sr;
    };
    return [ J, _r, sr ];
  };
  var Ct = function createTrinsicUpdateSegment(r) {
    var a = r.Cr;
    return function(r) {
      var e = r.ta, t = r.da, n = r.kr;
      var v = et(), i = v.B;
      var o = e || {}, u = o.Hr;
      var c = t.wr;
      var f = (a || !i) && (u || n);
      if (f) {
        var l;
        setStyles(a, (l = {}, l[ar] = c && "100%", l));
      }
    };
  };
  var Et = function createPaddingUpdateSegment(r, e) {
    var t = r.Or, n = r.ca, v = r.R, i = r.F;
    var o = a({
      o: or,
      v: ta()
    }, fr(ta, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Rr, t = r.ta, o = r.da, f = r.kr;
      var l = c(f), s = l[0], d = l[1];
      var p = et(), _ = p.V, g = p.B;
      var h = t || {}, b = h.yr, m = h.zr, S = h.Pr;
      var y = o.G;
      var w = a("paddingAbsolute"), O = w[0], C = w[1];
      var E = f || !g && m;
      if (b || d || E) {
        var x = u(f);
        s = x[0];
        d = x[1];
      }
      var T = !i && (C || S || d);
      if (T) {
        var A, H;
        var P = !O || !n && !_;
        var D = s.r + s.l;
        var L = s.t + s.b;
        var R = (A = {}, A[Z] = P && !y ? -D : 0, A[$] = P ? -L : 0, A[X] = P && y ? -D : 0, 
        A.top = P ? -s.t : 0, A.right = P ? y ? -s.r : "auto" : 0, A.left = P ? y ? "auto" : -s.l : 0, 
        A[rr] = P && "calc(100% + " + D + "px)", A);
        var I = (H = {}, H[Y] = P ? s.t : 0, H[W] = P ? s.r : 0, H[K] = P ? s.b : 0, H[G] = P ? s.l : 0, 
        H);
        setStyles(n || v, R);
        setStyles(v, I);
        z(e, {
          ca: s,
          pa: !P,
          K: n ? I : z({}, R, I)
        });
      }
      return {
        _a: T
      };
    };
  };
  var xt = function createOverflowUpdateSegment(r, e) {
    var t = et();
    var n = r.Or, v = r.ca, i = r.R, o = r.F, u = r.Ar, c = r.qr, f = r.la;
    var l = t.B, s = t.V, d = t.L;
    var p = c && o;
    var _ = fr(I, 0);
    var g = {
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    };
    var h = {
      o: ir,
      v: {
        x: er,
        y: er
      }
    };
    var b = function getOverflowAmount(r, a) {
      var e = R.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: _(r.w - a.w),
        h: _(r.h - a.h)
      };
      return {
        w: t.w > e ? t.w : 0,
        h: t.h > e ? t.h : 0
      };
    };
    var m = a(g, fr(la, i)), S = m[0], y = m[1];
    var w = a(g, fr(fa, i)), O = w[0], C = w[1];
    var E = a(g), x = E[0], T = E[1];
    var A = a(g), H = A[0], P = A[1];
    var D = a(h), L = D[0];
    var k = ze(We);
    return function(a, c) {
      var g = a.Rr, h = a.ta, m = a.da, w = a.kr;
      var E = c._a;
      var A = h || {}, D = A.yr, R = A.Dr, M = A.zr, V = A.Hr, j = A.Pr, N = A.Lr;
      var F = m.wr;
      var U = k && k.N(r, e, m, t, g);
      var B = U || {}, q = B.Z, Y = B.$, W = B.J, G = B.X;
      var K = function fixFlexboxGlue(r, a) {
        var t;
        setStyles(i, (t = {}, t[ar] = "", t));
        if (a) {
          var v;
          var o = e.pa, u = e.ca;
          var c = r.k;
          var f = la(n);
          var l = ca(n);
          var s = getStyles(i, "boxSizing") === "content-box";
          var p = o || s ? u.b + u.t : 0;
          var _ = !(d.x && s);
          setStyles(i, (v = {}, v[ar] = l.h + f.h + (c.x && _ && G ? G(r).Y.x : 0) - p, v));
        }
      };
      var X = Fe(g, t), Z = X[0], $ = X[1];
      var rr = g("overflow"), er = rr[0], tr = rr[1];
      var nr = !o && !l && (D || M || R || $ || V);
      var vr = D || E || M || j || N || $;
      var ir = Ue(er.x);
      var or = Ue(er.y);
      var ur = ir || or;
      var cr = y(w);
      var fr = C(w);
      var lr = T(w);
      var sr = P(w);
      var pr;
      if ($ && s) {
        u($a, !Z);
      }
      if (nr) {
        pr = Be(r);
        K(pr, F);
      }
      if (vr) {
        if (ur) {
          u(Ja, false);
        }
        var _r = Y ? Y(pr) : [], gr = _r[0], hr = _r[1];
        var mr = cr = S(w), Sr = mr[0], yr = mr[1];
        var wr = fr = O(w), Or = wr[0], Cr = wr[1];
        var Er = ca(i);
        var xr = Or;
        var Tr = Er;
        gr && gr();
        if ((Cr || yr || $) && hr && !Z && q && q(hr, Or, Sr)) {}
        var Ar = oa(f);
        var Hr = {
          w: _(I(Or.w, xr.w) + Sr.w),
          h: _(I(Or.h, xr.h) + Sr.h)
        };
        var Pr = {
          w: _((p ? Ar.w : Tr.w + _(Er.w - Or.w)) + Sr.w),
          h: _((p ? Ar.h : Tr.h + _(Er.h - Or.h)) + Sr.h)
        };
        sr = H(Pr);
        lr = x(b(Hr, Pr), w);
      }
      var zr = sr, Dr = zr[0], Lr = zr[1];
      var Rr = lr, Ir = Rr[0], kr = Rr[1];
      var Mr = fr, Vr = Mr[0], jr = Mr[1];
      var Nr = cr, Fr = Nr[0], Ur = Nr[1];
      var Br = {
        x: Ir.w > 0,
        y: Ir.h > 0
      };
      var qr = ir && or && (Br.x || Br.y) || ir && Br.x && !Br.y || or && Br.y && !Br.x;
      var Yr = E || j || N || Ur || jr || Lr || kr || tr || $ || nr || vr;
      if (Yr) {
        var Wr = {};
        var Gr = qe(r, Br, er, Wr);
        W && W(Gr, m, !!q && q(Gr, Vr, Fr), Wr);
        if (nr) {
          K(Gr, F);
        }
        if (o) {
          dr(n, Ba, Wr[J]);
          dr(n, qa, Wr[Q]);
        } else {
          setStyles(i, Wr);
        }
      }
      br(n, Ua, Ya, qr);
      br(v, Qa, re, qr);
      if (!o) {
        br(i, Xa, Ja, ur);
      }
      var Kr = L(Be(r).I), Xr = Kr[0], Zr = Kr[1];
      z(e, {
        I: Xr,
        Nr: {
          x: Dr.w,
          y: Dr.h
        },
        jr: {
          x: Ir.w,
          y: Ir.h
        },
        ua: Br
      });
      return {
        oa: Zr,
        va: Lr,
        ia: kr
      };
    };
  };
  var Tt = function createStructureSetup(r) {
    var a;
    var e = Ot(r), t = e[0], n = e[1], v = e[2];
    var i = {
      ca: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      pa: false,
      K: (a = {}, a[Z] = 0, a[$] = 0, a[X] = 0, a[Y] = 0, a[W] = 0, a[K] = 0, a[G] = 0, 
      a),
      Nr: {
        x: 0,
        y: 0
      },
      jr: {
        x: 0,
        y: 0
      },
      I: {
        x: er,
        y: er
      },
      ua: {
        x: false,
        y: false
      }
    };
    var o = t.Fr, u = t.R, c = t.F;
    var f = et(), l = f.V, s = f.L, d = f.B;
    var p = !l && (s.x || s.y);
    var _ = [ Ct(t), Et(t, i), xt(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = p || !d;
      var t = e && Aa(u);
      var n = c ? hr(u, Ua, Ga) : cr;
      each(_, (function(e) {
        z(a, e(r, a) || {});
      }));
      n();
      Ta(u, t);
      !c && Ta(o, 0);
      return a;
    }, i, t, v ];
  };
  var At = function createSetups(r, a, e, t) {
    var n = Ia(a, {});
    var v = Tt(r), i = v[0], o = v[1], u = v[2], c = v[3], f = v[4];
    var l = _t(c, u, n, (function(r) {
      S({}, r);
    })), s = l[0], d = l[1], p = l[2];
    var _ = wt(r, a, p, u, c, t), g = _[0], h = _[1], b = _[3];
    var m = function updateHintsAreTruthy(r) {
      return P(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, t) {
      var n = r.ga, v = r.kr, i = r.Ir, u = r.ha;
      var c = n || {};
      var f = !!v;
      var l = {
        Rr: Ia(a, c, f),
        ga: c,
        kr: f
      };
      if (u) {
        h(l);
        return false;
      }
      var s = t || d(z({}, l, {
        Ir: i
      }));
      var _ = o(z({}, l, {
        da: p,
        ta: s
      }));
      h(z({}, l, {
        ta: s,
        na: _
      }));
      var g = m(s);
      var b = m(_);
      var S = g || b || !L(c) || f;
      S && e(r, {
        ta: s,
        na: _
      });
      return S;
    };
    return [ function() {
      var r = c.fa, a = c.R;
      var e = Aa(r);
      var t = [ s(), i(), g() ];
      Ta(a, e);
      return fr(A, t);
    }, S, function() {
      return {
        ba: p,
        ma: u
      };
    }, {
      Sa: c,
      ya: b
    }, f ];
  };
  var Ht = function OverlayScrollbars(r, a, e) {
    var t = et(), n = t.ir;
    var v = m(r);
    var i = v ? r : r.target;
    var o = ft(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var a = D(r, true);
        var e = ze(Ve);
        return e ? e(a, true) : a;
      };
      var s = z({}, n(), l(a));
      var d = Pa(), p = d[0], _ = d[1], g = d[2];
      var h = Pa(e), b = h[0], S = h[1], y = h[2];
      var w = function triggerEvent(r, a) {
        y(r, a);
        g(r, a);
      };
      var C = At(r, s, (function(r, a) {
        var e = r.ga, t = r.kr;
        var n = a.ta, v = a.na;
        var i = n.yr, o = n.Pr, u = n.Hr, c = n.zr, f = n.Dr, l = n.mr;
        var s = v.va, d = v.ia, p = v.oa;
        w("updated", [ k, {
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
        return w("scroll", [ k, r ]);
      })), E = C[0], x = C[1], T = C[2], H = C[3], R = C[4];
      var I = function destroy(r) {
        ct(i);
        A(c);
        u = true;
        w("destroyed", [ k, r ]);
        _();
        S();
      };
      var k = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Ra(s, z(e, l(r)));
            if (!L(t)) {
              z(s, t);
              x({
                ga: t
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
          var r = T(), a = r.ba, e = r.ma;
          var t = a.G;
          var n = e.Nr, v = e.jr, i = e.I, o = e.ua, c = e.ca, f = e.pa;
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
          var r = H.Sa, a = r.Fr, e = r.Or, t = r.ca, n = r.R, v = r.Cr, i = r.Br, o = r.ea;
          var u = H.ya, c = u.Zr, f = u.ra;
          var l = function translateScrollbarStructure(r) {
            var a = r.Vr, e = r.Mr, t = r.Yr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.$r, e = r.Jr;
            var t = l(a[0]);
            return z({}, t, {
              clone: function clone() {
                var r = l(e());
                x({
                  ha: true
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
          return x({
            kr: r,
            Ir: true
          });
        },
        destroy: fr(I, false),
        plugin: function plugin(r) {
          return f[P(r)[0]];
        }
      };
      O(c, [ R ]);
      ut(i, k);
      Pe(Te, OverlayScrollbars, [ k, p, f ]);
      if (it(H.Sa.qr, !v && r.cancel)) {
        I(true);
        return k;
      }
      O(c, E());
      w("initialized", [ k ]);
      k.update(true);
      return k;
    }
    return o;
  };
  Ht.plugin = function(r) {
    var a = _(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return Pe(r, Ht)[0];
    }));
    He(e);
    return a ? t : t[0];
  };
  Ht.valid = function(r) {
    var a = r && r.elements;
    var e = p(a) && a();
    return b(e) && !!ft(e.target);
  };
  Ht.env = function() {
    var r = et(), a = r.q, e = r.L, t = r.V, n = r.er, v = r.B, i = r.j, o = r.ar, u = r.cr, c = r.lr, f = r.nr, l = r.vr, s = r.ir, d = r.ur;
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
  r.ClickScrollPlugin = Xe;
  r.OverlayScrollbars = Ht;
  r.ScrollbarsHidingPlugin = Ge;
  r.SizeObserverPlugin = Ne;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
