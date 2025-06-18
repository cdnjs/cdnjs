/*!
 * OverlayScrollbars
 * Version: 2.11.2
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var e = function createCache(r, e) {
    var a = r.i, n = r.v, t = r.o;
    var i = a;
    var v;
    var o = function cacheUpdateContextual(r, e) {
      var a = i;
      var o = r;
      var u = e || (n ? !n(a, o) : a !== o);
      if (u || t) {
        i = o;
        v = a;
      }
      return [ i, u, v ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(e(i, v), r);
    };
    var c = function getCurrentCache(r) {
      return [ i, !!r, v ];
    };
    return [ e ? u : o, c ];
  };
  var a = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  var n = a ? window : {};
  var t = Math.max;
  var i = Math.min;
  var v = Math.round;
  var o = Math.abs;
  var u = Math.sign;
  var c = n.cancelAnimationFrame;
  var f = n.requestAnimationFrame;
  var l = n.setTimeout;
  var s = n.clearTimeout;
  var d = function getApi(r) {
    return typeof n[r] !== "undefined" ? n[r] : void 0;
  };
  var p = d("MutationObserver");
  var _ = d("IntersectionObserver");
  var g = d("ResizeObserver");
  var h = d("ScrollTimeline");
  var b = function isUndefined(r) {
    return r === void 0;
  };
  var m = function isNull(r) {
    return r === null;
  };
  var S = function type(r) {
    return b(r) || m(r) ? "" + r : Object.prototype.toString.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  };
  var y = function isNumber(r) {
    return typeof r === "number";
  };
  var w = function isString(r) {
    return typeof r === "string";
  };
  var O = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var C = function isFunction(r) {
    return typeof r === "function";
  };
  var x = function isArray(r) {
    return Array.isArray(r);
  };
  var E = function isObject(r) {
    return typeof r === "object" && !x(r) && !m(r);
  };
  var A = function isArrayLike(r) {
    var e = !!r && r.length;
    var a = y(e) && e > -1 && e % 1 == 0;
    return x(r) || !C(r) && a ? e > 0 && E(r) ? e - 1 in r : true : false;
  };
  var T = function isPlainObject(r) {
    return !!r && r.constructor === Object;
  };
  var H = function isHTMLElement(r) {
    return r instanceof HTMLElement;
  };
  var P = function isElement(r) {
    return r instanceof Element;
  };
  var D = function animationCurrentTime() {
    return performance.now();
  };
  var z = function animateNumber(r, e, a, n, i) {
    var v = 0;
    var o = D();
    var u = t(0, a);
    var l = function frame(a) {
      var c = D();
      var s = c - o;
      var d = s >= u;
      var p = a ? 1 : 1 - (t(0, o + u - c) / u || 0);
      var _ = (e - r) * (C(i) ? i(p, p * u, 0, 1, u) : p) + r;
      var g = d || p === 1;
      if (n) {
        n(_, p, g);
      }
      v = g ? 0 : f((function() {
        return l();
      }));
    };
    l();
    return function(r) {
      c(v);
      if (r) {
        l(r);
      }
    };
  };
  function each(r, e) {
    if (A(r)) {
      for (var a = 0; a < r.length; a++) {
        if (e(r[a], a, r) === false) {
          break;
        }
      }
    } else if (r) {
      each(Object.keys(r), (function(a) {
        return e(r[a], a, r);
      }));
    }
    return r;
  }
  var M = function inArray(r, e) {
    return r.indexOf(e) >= 0;
  };
  var I = function concat(r, e) {
    return r.concat(e);
  };
  var L = function push(r, e, a) {
    if (!w(e) && A(e)) {
      Array.prototype.push.apply(r, e);
    } else {
      r.push(e);
    }
    return r;
  };
  var V = function from(r) {
    return Array.from(r || []);
  };
  var k = function createOrKeepArray(r) {
    if (x(r)) {
      return r;
    }
    return !w(r) && A(r) ? V(r) : [ r ];
  };
  var R = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var F = function deduplicateArray(r) {
    return V(new Set(r));
  };
  var N = function runEachAndClear(r, e, a) {
    var n = function runFn(r) {
      return r ? r.apply(void 0, e || []) : true;
    };
    each(r, n);
    if (!a) {
      r.length = 0;
    }
  };
  var j = "paddingTop";
  var q = "paddingRight";
  var U = "paddingLeft";
  var B = "paddingBottom";
  var Y = "marginLeft";
  var W = "marginRight";
  var X = "marginBottom";
  var Z = "overflowX";
  var G = "overflowY";
  var $ = "width";
  var J = "height";
  var K = "visible";
  var Q = "hidden";
  var rr = "scroll";
  var er = function capitalizeFirstLetter(r) {
    var e = String(r || "");
    return e ? e[0].toUpperCase() + e.slice(1) : "";
  };
  var ar = function equal(r, e, a, n) {
    if (r && e) {
      var t = true;
      each(a, (function(a) {
        var n = r[a];
        var i = e[a];
        if (n !== i) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var nr = function equalWH(r, e) {
    return ar(r, e, [ "w", "h" ]);
  };
  var tr = function equalXY(r, e) {
    return ar(r, e, [ "x", "y" ]);
  };
  var ir = function equalTRBL(r, e) {
    return ar(r, e, [ "t", "r", "b", "l" ]);
  };
  var vr = function bind(r) {
    for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) {
      a[n - 1] = arguments[n];
    }
    return r.bind.apply(r, [ 0 ].concat(a));
  };
  var or = function selfClearTimeout(r) {
    var e;
    var a = r ? l : f;
    var n = r ? s : c;
    return [ function(t) {
      n(e);
      e = a((function() {
        return t();
      }), C(r) ? r() : r);
    }, function() {
      return n(e);
    } ];
  };
  var ur = function getDebouncer(r) {
    var e = C(r) ? r() : r;
    if (y(e)) {
      var a = e ? l : f;
      var n = e ? s : c;
      return function(r) {
        var t = a((function() {
          return r();
        }), e);
        return function() {
          n(t);
        };
      };
    }
    return e && e.u;
  };
  var cr = function debounce(r, e) {
    var a = e || {}, n = a.p, t = a._, i = a.m, v = a.S;
    var o;
    var u;
    var c;
    var f;
    var l;
    var s = function invokeFunctionToDebounce(e) {
      if (u) {
        u();
      }
      if (o) {
        o();
      }
      l = u = o = c = void 0;
      r.apply(this, e);
    };
    var d = function mergeParms(r) {
      return v && c ? v(c, r) : r;
    };
    var p = function flush() {
      if (u) {
        s(d(f) || f);
      }
    };
    var _ = function debouncedFn() {
      var r = V(arguments);
      var e = ur(n);
      if (e) {
        var a = ur(t);
        var v = d(r);
        var _ = v || r;
        var g = s.bind(0, _);
        if (u) {
          u();
        }
        if (i && !l) {
          g();
          l = true;
          u = e((function() {
            return l = void 0;
          }));
        } else {
          u = e(g);
          if (a && !o) {
            o = a(p);
          }
        }
        c = f = _;
      } else {
        s(r);
      }
    };
    _.O = p;
    return _;
  };
  var fr = function hasOwnProperty(r, e) {
    return Object.prototype.hasOwnProperty.call(r, e);
  };
  var lr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var sr = function assignDeep(r, e, a, n, t, i, v) {
    var o = [ e, a, n, t, i, v ];
    if ((typeof r !== "object" || m(r)) && !C(r)) {
      r = {};
    }
    each(o, (function(e) {
      each(e, (function(a, n) {
        var t = e[n];
        if (r === t) {
          return true;
        }
        var i = x(t);
        if (t && T(t)) {
          var v = r[n];
          var o = v;
          if (i && !x(v)) {
            o = [];
          } else if (!i && !T(v)) {
            o = {};
          }
          r[n] = sr(o, t);
        } else {
          r[n] = i ? t.slice() : t;
        }
      }));
    }));
    return r;
  };
  var dr = function removeUndefinedProperties(r, e) {
    return each(sr({}, r), (function(r, e, a) {
      if (r === void 0) {
        delete a[e];
      } else if (r && T(r)) {
        a[e] = dr(r);
      }
    }));
  };
  var pr = function isEmptyObject(r) {
    return !lr(r).length;
  };
  var _r = function noop() {};
  var gr = function capNumber(r, e, a) {
    return t(r, i(e, a));
  };
  var hr = function getDomTokensArray(r) {
    return F((x(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    })));
  };
  var br = function getAttr(r, e) {
    return r && r.getAttribute(e);
  };
  var mr = function hasAttr(r, e) {
    return r && r.hasAttribute(e);
  };
  var Sr = function setAttrs(r, e, a) {
    each(hr(e), (function(e) {
      if (r) {
        r.setAttribute(e, String(a || ""));
      }
    }));
  };
  var yr = function removeAttrs(r, e) {
    each(hr(e), (function(e) {
      return r && r.removeAttribute(e);
    }));
  };
  var wr = function domTokenListAttr(r, e) {
    var a = hr(br(r, e));
    var n = vr(Sr, r, e);
    var t = function domTokenListOperation(r, e) {
      var n = new Set(a);
      each(hr(r), (function(r) {
        n[e](r);
      }));
      return V(n).join(" ");
    };
    return {
      C: function _remove(r) {
        return n(t(r, "delete"));
      },
      A: function _add(r) {
        return n(t(r, "add"));
      },
      T: function _has(r) {
        var e = hr(r);
        return e.reduce((function(r, e) {
          return r && a.includes(e);
        }), e.length > 0);
      }
    };
  };
  var Or = function removeAttrClass(r, e, a) {
    wr(r, e).C(a);
    return vr(Cr, r, e, a);
  };
  var Cr = function addAttrClass(r, e, a) {
    wr(r, e).A(a);
    return vr(Or, r, e, a);
  };
  var xr = function addRemoveAttrClass(r, e, a, n) {
    return (n ? Cr : Or)(r, e, a);
  };
  var Er = function hasAttrClass(r, e, a) {
    return wr(r, e).T(a);
  };
  var Ar = function createDomTokenListClass(r) {
    return wr(r, "class");
  };
  var Tr = function removeClass(r, e) {
    Ar(r).C(e);
  };
  var Hr = function addClass(r, e) {
    Ar(r).A(e);
    return vr(Tr, r, e);
  };
  var Pr = function find(r, e) {
    var a = e ? P(e) && e : document;
    return a ? V(a.querySelectorAll(r)) : [];
  };
  var Dr = function findFirst(r, e) {
    var a = e ? P(e) && e : document;
    return a && a.querySelector(r);
  };
  var zr = function is(r, e) {
    return P(r) && r.matches(e);
  };
  var Mr = function isBodyElement(r) {
    return zr(r, "body");
  };
  var Ir = function contents(r) {
    return r ? V(r.childNodes) : [];
  };
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var Vr = function closest(r, e) {
    return P(r) && r.closest(e);
  };
  var kr = function getFocusedElement(r) {
    return document.activeElement;
  };
  var Rr = function liesBetween(r, e, a) {
    var n = Vr(r, e);
    var t = r && Dr(a, n);
    var i = Vr(t, e) === n;
    return n && t ? n === r || t === r || i && Vr(Vr(r, a), e) !== n : false;
  };
  var Fr = function removeElements(r) {
    each(k(r), (function(r) {
      var e = Lr(r);
      if (r && e) {
        e.removeChild(r);
      }
    }));
  };
  var Nr = function appendChildren(r, e) {
    return vr(Fr, r && e && each(k(e), (function(e) {
      if (e) {
        r.appendChild(e);
      }
    })));
  };
  var jr;
  var qr = function getTrustedTypePolicy() {
    return jr;
  };
  var Ur = function setTrustedTypePolicy(r) {
    jr = r;
  };
  var Br = function createDiv(r) {
    var e = document.createElement("div");
    Sr(e, "class", r);
    return e;
  };
  var Yr = function createDOM(r) {
    var e = Br();
    var a = qr();
    var n = r.trim();
    e.innerHTML = a ? a.createHTML(n) : n;
    return each(Ir(e), (function(r) {
      return Fr(r);
    }));
  };
  var Wr = function getCSSVal(r, e) {
    return r.getPropertyValue(e) || r[e] || "";
  };
  var Xr = function validFiniteNumber(r) {
    var e = r || 0;
    return isFinite(e) ? e : 0;
  };
  var Zr = function parseToZeroOrNumber(r) {
    return Xr(parseFloat(r || ""));
  };
  var Gr = function roundCssNumber(r) {
    return Math.round(r * 1e4) / 1e4;
  };
  var $r = function numberToCssPx(r) {
    return Gr(Xr(r)) + "px";
  };
  function setStyles(r, e) {
    r && e && each(e, (function(e, a) {
      try {
        var n = r.style;
        var t = m(e) || O(e) ? "" : y(e) ? $r(e) : e;
        if (a.indexOf("--") === 0) {
          n.setProperty(a, t);
        } else {
          n[a] = t;
        }
      } catch (i) {}
    }));
  }
  function getStyles(r, e, a) {
    var t = w(e);
    var i = t ? "" : {};
    if (r) {
      var v = n.getComputedStyle(r, a) || r.style;
      i = t ? Wr(v, e) : V(e).reduce((function(r, e) {
        r[e] = Wr(v, e);
        return r;
      }), i);
    }
    return i;
  }
  var Jr = function topRightBottomLeft(r, e, a) {
    var n = e ? e + "-" : "";
    var t = a ? "-" + a : "";
    var i = n + "top" + t;
    var v = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Zr(c[i]),
      r: Zr(c[v]),
      b: Zr(c[o]),
      l: Zr(c[u])
    };
  };
  var Kr = function getTrasformTranslateValue(r, e) {
    return "translate" + (E(r) ? "(" + r.x + "," + r.y + ")" : (e ? "X" : "Y") + "(" + r + ")");
  };
  var Qr = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var re = {
    w: 0,
    h: 0
  };
  var ee = function getElmWidthHeightProperty(r, e) {
    return e ? {
      w: e[r + "Width"],
      h: e[r + "Height"]
    } : re;
  };
  var ae = function getWindowSize(r) {
    return ee("inner", r || n);
  };
  var ne = vr(ee, "offset");
  var te = vr(ee, "client");
  var ie = vr(ee, "scroll");
  var ve = function getFractionalSize(r) {
    var e = parseFloat(getStyles(r, $)) || 0;
    var a = parseFloat(getStyles(r, J)) || 0;
    return {
      w: e - v(e),
      h: a - v(a)
    };
  };
  var oe = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ue = function hasDimensions(r) {
    return !!r && Qr(r);
  };
  var ce = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var fe = function domRectAppeared(r, e) {
    var a = ce(r);
    var n = ce(e);
    return !n && a;
  };
  var le = function removeEventListener(r, e, a, n) {
    each(hr(e), (function(e) {
      if (r) {
        r.removeEventListener(e, a, n);
      }
    }));
  };
  var se = function addEventListener(r, e, a, n) {
    var t;
    var i = (t = n && n.H) != null ? t : true;
    var v = n && n.P || false;
    var o = n && n.D || false;
    var u = {
      passive: i,
      capture: v
    };
    return vr(N, hr(e).map((function(e) {
      var n = o ? function(t) {
        le(r, e, n, v);
        if (a) {
          a(t);
        }
      } : a;
      if (r) {
        r.addEventListener(e, n, u);
      }
      return vr(le, r, e, n, v);
    })));
  };
  var de = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var pe = function preventDefault(r) {
    return r.preventDefault();
  };
  var _e = function stopAndPrevent(r) {
    return de(r) || pe(r);
  };
  var ge = function scrollElementTo(r, e) {
    var a = y(e) ? {
      x: e,
      y: e
    } : e || {}, n = a.x, t = a.y;
    y(n) && (r.scrollLeft = n);
    y(t) && (r.scrollTop = t);
  };
  var he = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var be = function getZeroScrollCoordinates() {
    return {
      M: {
        x: 0,
        y: 0
      },
      I: {
        x: 0,
        y: 0
      }
    };
  };
  var me = function sanitizeScrollCoordinates(r, e) {
    var a = r.M, n = r.I;
    var t = e.w, i = e.h;
    var v = function sanitizeAxis(r, e, a) {
      var n = u(r) * a;
      var t = u(e) * a;
      if (n === t) {
        var i = o(r);
        var v = o(e);
        t = i > v ? 0 : t;
        n = i < v ? 0 : n;
      }
      n = n === t ? 0 : n;
      return [ n + 0, t + 0 ];
    };
    var c = v(a.x, n.x, t), f = c[0], l = c[1];
    var s = v(a.y, n.y, i), d = s[0], p = s[1];
    return {
      M: {
        x: f,
        y: d
      },
      I: {
        x: l,
        y: p
      }
    };
  };
  var Se = function isDefaultDirectionScrollCoordinates(r) {
    var e = r.M, a = r.I;
    var n = function getAxis(r, e) {
      return r === 0 && r <= e;
    };
    return {
      x: n(e.x, a.x),
      y: n(e.y, a.y)
    };
  };
  var ye = function getScrollCoordinatesPercent(r, e) {
    var a = r.M, n = r.I;
    var t = function getAxis(r, e, a) {
      return gr(0, 1, (r - a) / (r - e) || 0);
    };
    return {
      x: t(a.x, n.x, e.x),
      y: t(a.y, n.y, e.y)
    };
  };
  var we = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true
      });
    }
  };
  var Oe = function manageListener(r, e) {
    each(k(e), r);
  };
  var Ce = function createEventListenerHub(r) {
    var e = new Map;
    var a = function removeEvent(r, a) {
      if (r) {
        var n = e.get(r);
        Oe((function(r) {
          if (n) {
            n[r ? "delete" : "clear"](r);
          }
        }), a);
      } else {
        e.forEach((function(r) {
          r.clear();
        }));
        e.clear();
      }
    };
    var n = function addEvent(r, t) {
      if (w(r)) {
        var i = e.get(r) || new Set;
        e.set(r, i);
        Oe((function(r) {
          if (C(r)) {
            i.add(r);
          }
        }), t);
        return vr(a, r, t);
      }
      if (O(t) && t) {
        a();
      }
      var v = lr(r);
      var o = [];
      each(v, (function(e) {
        var a = r[e];
        if (a) {
          L(o, n(e, a));
        }
      }));
      return vr(N, o);
    };
    var t = function triggerEvent(r, a) {
      each(V(e.get(r)), (function(r) {
        if (a && !R(a)) {
          r.apply(0, a);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, a, t ];
  };
  var xe = {};
  var Ee = {};
  var Ae = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        xe[a] = r[a];
      }));
    }));
  };
  var Te = function registerPluginModuleInstances(r, e, a) {
    return lr(r).map((function(n) {
      var t = r[n], i = t.static, v = t.instance;
      var o = a || [], u = o[0], c = o[1], f = o[2];
      var l = a ? v : i;
      if (l) {
        var s = a ? l(u, c, e) : l(e);
        return (f || Ee)[n] = s;
      }
    }));
  };
  var He = function getStaticPluginModuleInstance(r) {
    return Ee[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.L && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Pe = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      return r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var e = 1; e < arguments.length; e++) {
          var a = arguments[e];
          for (var n in a) {
            ({}).hasOwnProperty.call(a, n) && (r[n] = a[n]);
          }
        }
        return r;
      }, r.exports.L = true, r.exports["default"] = r.exports, _extends.apply(null, arguments);
    }
    r.exports = _extends, r.exports.L = true, r.exports["default"] = r.exports;
  })(Pe);
  var De = Pe.exports;
  var ze = /*@__PURE__*/ getDefaultExportFromCjs(De);
  var Me = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ie = function validateRecursive(r, e, a, n) {
    var t = {};
    var i = ze({}, e);
    var v = lr(r).filter((function(r) {
      return fr(e, r);
    }));
    each(v, (function(v) {
      var o = e[v];
      var u = r[v];
      var c = T(u);
      var f = n ? n + "." : "";
      if (c && T(o)) {
        var l = Ie(u, o, a, f + v), s = l[0], d = l[1];
        t[v] = s;
        i[v] = d;
        each([ i, t ], (function(r) {
          if (pr(r[v])) {
            delete r[v];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var g = [];
        var h = S(o);
        var m = k(u);
        each(m, (function(r) {
          var e;
          each(Me, (function(a, n) {
            if (a === r) {
              e = n;
            }
          }));
          var a = b(e);
          if (a && w(o)) {
            var n = r.split(" ");
            p = !!n.find((function(r) {
              return r === o;
            }));
            L(_, n);
          } else {
            p = Me[h] === r;
          }
          L(g, a ? Me.string : e);
          return !p;
        }));
        if (p) {
          t[v] = o;
        } else if (a) {
          console.warn('The option "' + f + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ t, i ];
  };
  var Le = function validateOptions(r, e, a) {
    return Ie(r, e, a);
  };
  var Ve = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Ve] = {
      static: function _static() {
        var r = Me.number;
        var e = Me.boolean;
        var a = [ Me.array, Me.null ];
        var n = "hidden scroll visible visible-hidden";
        var t = "visible hidden auto";
        var i = "never scroll leavemove";
        var v = [ e, Me.string ];
        var o = {
          paddingAbsolute: e,
          showNativeOverlaidScrollbars: e,
          update: {
            elementEvents: a,
            attributes: a,
            debounce: [ Me.number, Me.array, Me.null ],
            ignoreMutation: [ Me.function, Me.null ]
          },
          overflow: {
            x: n,
            y: n
          },
          scrollbars: {
            theme: [ Me.string, Me.null ],
            visibility: t,
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: v,
            pointers: [ Me.array, Me.null ]
          }
        };
        return function(r, e) {
          var a = Le(o, r, e), n = a[0], t = a[1];
          return ze({}, t, n);
        };
      }
    }, r;
  })();
  var ke = "data-overlayscrollbars";
  var Re = "os-environment";
  var Fe = Re + "-scrollbar-hidden";
  var Ne = ke + "-initialize";
  var je = "noClipping";
  var qe = ke + "-body";
  var Ue = ke;
  var Be = "host";
  var Ye = ke + "-viewport";
  var We = Z;
  var Xe = G;
  var Ze = "arrange";
  var Ge = "measuring";
  var $e = "scrolling";
  var Je = "scrollbarHidden";
  var Ke = "noContent";
  var Qe = ke + "-padding";
  var ra = ke + "-content";
  var ea = "os-size-observer";
  var aa = ea + "-appear";
  var na = ea + "-listener";
  var ta = na + "-scroll";
  var ia = na + "-item";
  var va = ia + "-final";
  var oa = "os-trinsic-observer";
  var ua = "os-theme-none";
  var ca = "os-scrollbar";
  var fa = ca + "-rtl";
  var la = ca + "-horizontal";
  var sa = ca + "-vertical";
  var da = ca + "-track";
  var pa = ca + "-handle";
  var _a = ca + "-visible";
  var ga = ca + "-cornerless";
  var ha = ca + "-interaction";
  var ba = ca + "-unusable";
  var ma = ca + "-auto-hide";
  var Sa = ma + "-hidden";
  var ya = ca + "-wheel";
  var wa = da + "-interactive";
  var Oa = pa + "-interactive";
  var Ca = "__osSizeObserverPlugin";
  var xa = /* @__PURE__ */ function(r) {
    return r = {}, r[Ca] = {
      static: function _static() {
        return function(r, e, a) {
          var n;
          var t = 3333333;
          var i = "scroll";
          var v = Yr('<div class="' + ia + '" dir="ltr"><div class="' + ia + '"><div class="' + va + '"></div></div><div class="' + ia + '"><div class="' + va + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
          var u = o.lastChild;
          var l = o.firstChild;
          var s = l == null ? void 0 : l.firstChild;
          var d = ne(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            ge(l, t);
            ge(u, t);
          };
          var b = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              e(r === true);
            }
          };
          var m = function onScroll(r) {
            p = ne(o);
            _ = !r || !nr(p, d);
            if (r) {
              de(r);
              if (_ && !g) {
                c(g);
                g = f(b);
              }
            } else {
              b(r === false);
            }
            h();
          };
          var S = [ Nr(r, v), se(l, i, m), se(u, i, m) ];
          Hr(r, ta);
          setStyles(s, (n = {}, n[$] = t, n[J] = t, n));
          f(h);
          return [ a ? vr(m, false) : h, S ];
        };
      }
    }, r;
  }();
  var Ea = function getShowNativeOverlaidScrollbars(r, e) {
    var a = e.V;
    var n = r("showNativeOverlaidScrollbars"), t = n[0], i = n[1];
    return [ t && a.x && a.y, i ];
  };
  var Aa = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Ta = function overflowBehaviorToOverflowStyle(r) {
    return r.replace(K + "-", "");
  };
  var Ha = function overflowCssValueToOverflowStyle(r) {
    return r ? [ Q, rr, K ].includes(r) ? r : Q : Q;
  };
  var Pa = "__osScrollbarsHidingPlugin";
  var Da = /* @__PURE__ */ function(r) {
    return r = {}, r[Pa] = {
      static: function _static() {
        return {
          k: function _viewportArrangement(r, e, a, n, t) {
            var i = r.R, v = r.F;
            var o = n.N, u = n.V, c = n.j;
            var f = !i && !o && (u.x || u.y);
            var l = Ea(t, n), s = l[0];
            var d = function readViewportOverflowStyle() {
              var r = function getStatePerAxis(r) {
                return Ha(getStyles(v, r));
              };
              return {
                x: r(Z),
                y: r(G)
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var e = o || s ? 0 : 42;
              var a = function getHideOffsetPerAxis(r, a, n) {
                var t = r ? e : n;
                var i = a && !o ? t : 0;
                var v = r && !!e;
                return [ i, v ];
              };
              var n = a(u.x, r.x === rr, c.x), t = n[0], i = n[1];
              var v = a(u.y, r.y === rr, c.y), f = v[0], l = v[1];
              return {
                q: {
                  x: t,
                  y: f
                },
                U: {
                  x: i,
                  y: l
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, a, n) {
              var t = a.B;
              if (!i) {
                var v;
                var o = sr({}, (v = {}, v[W] = 0, v[X] = 0, v[Y] = 0, v));
                var u = p(r), c = u.q, f = u.U;
                var l = f.x, s = f.y;
                var d = c.x, _ = c.y;
                var g = e.Y;
                var h = t ? Y : W;
                var b = t ? U : q;
                var m = g[h];
                var S = g[X];
                var y = g[b];
                var w = g[B];
                o[$] = "calc(100% + " + (_ + m * -1) + "px)";
                o[h] = -_ + m;
                o[X] = -d + S;
                if (n) {
                  o[b] = y + (s ? _ : 0);
                  o[B] = w + (l ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, n, t) {
              if (f) {
                var i = e.Y;
                var o = p(r), u = o.q, c = o.U;
                var l = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = a.B;
                var h = g ? q : U;
                var b = i[h];
                var m = i.paddingTop;
                var S = n.w + t.w;
                var y = n.h + t.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: d && l ? d + y - m + "px" : ""
                };
                setStyles(v, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return f;
            };
            var h = function _undoViewportArrange() {
              if (f) {
                var r = d();
                var n = e.Y;
                var t = p(r), i = t.U;
                var o = i.x, u = i.y;
                var c = {};
                var l = function assignProps(r) {
                  return each(r, (function(r) {
                    c[r] = n[r];
                  }));
                };
                if (o) {
                  l([ X, j, B ]);
                }
                if (u) {
                  l([ Y, W, U, q ]);
                }
                var s = getStyles(v, lr(c));
                var g = Or(v, Ye, Ze);
                setStyles(v, c);
                return [ function() {
                  setStyles(v, sr({}, s, _(r, a, f)));
                  g();
                }, r ];
              }
              return [ _r ];
            };
            return {
              W: p,
              X: g,
              Z: h,
              G: _
            };
          }
        };
      }
    }, r;
  }();
  var za = "__osClickScrollPlugin";
  var Ma = /* @__PURE__ */ function(r) {
    return r = {}, r[za] = {
      static: function _static() {
        return function(r, e, a, n) {
          var t = false;
          var i = _r;
          var v = 133;
          var o = 222;
          var u = or(v), c = u[0], f = u[1];
          var l = Math.sign(e);
          var s = a * l;
          var d = s / 2;
          var p = function easing(r) {
            return 1 - (1 - r) * (1 - r);
          };
          var _ = function easedEndPressAnimation(e, a) {
            return z(e, a, o, r, p);
          };
          var g = function linearPressAnimation(a, n) {
            return z(a, e - s, v * n, (function(a, n, t) {
              r(a);
              if (t) {
                i = _(a, e);
              }
            }));
          };
          var h = z(0, s, o, (function(v, o, u) {
            r(v);
            if (u) {
              n(t);
              if (!t) {
                var f = e - v;
                var p = Math.sign(f - d) === l;
                if (p) {
                  c((function() {
                    var r = f - s;
                    var n = Math.sign(r) === l;
                    i = n ? g(v, Math.abs(r) / a) : _(v, e);
                  }));
                }
              }
            }
          }), p);
          return function(r) {
            t = true;
            if (r) {
              h();
            }
            f();
            i();
          };
        };
      }
    }, r;
  }();
  var Ia = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (C(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var La = function getPropByPath(r, e) {
    return r ? ("" + e).split(".").reduce((function(r, e) {
      return r && fr(r, e) ? r[e] : void 0;
    }), r) : void 0;
  };
  var Va = {
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
  var ka = function getOptionsDiff(r, e) {
    var a = {};
    var n = I(lr(e), lr(r));
    each(n, (function(n) {
      var t = r[n];
      var i = e[n];
      if (E(t) && E(i)) {
        sr(a[n] = {}, ka(t, i));
        if (pr(a[n])) {
          delete a[n];
        }
      } else if (fr(e, n) && i !== t) {
        var v = true;
        if (x(t) || x(i)) {
          try {
            if (Ia(t) === Ia(i)) {
              v = false;
            }
          } catch (o) {}
        }
        if (v) {
          a[n] = i;
        }
      }
    }));
    return a;
  };
  var Ra = function createOptionCheck(r, e, a) {
    return function(n) {
      return [ La(r, n), a || La(e, n) !== void 0 ];
    };
  };
  var Fa;
  var Na = function getNonce() {
    return Fa;
  };
  var ja = function setNonce(r) {
    Fa = r;
  };
  var qa;
  var Ua = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, e, a) {
      Nr(document.body, r);
      Nr(document.body, r);
      var n = te(r);
      var t = ne(r);
      var i = ve(e);
      if (a) {
        Fr(r);
      }
      return {
        x: t.h - n.h + i.h,
        y: t.w - n.w + i.w
      };
    };
    var a = function getNativeScrollbarsHiding(r) {
      var e = false;
      var a = Hr(r, Fe);
      try {
        e = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (n) {}
      a();
      return e;
    };
    var t = "." + Re + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + Re + " div{width:200%;height:200%;margin:10px 0}." + Fe + "{scrollbar-width:none!important}." + Fe + "::-webkit-scrollbar,." + Fe + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var i = Yr('<div class="' + Re + '"><div></div><style>' + t + "</style></div>");
    var v = i[0];
    var o = v.firstChild;
    var u = v.lastChild;
    var c = Na();
    if (c) {
      u.nonce = c;
    }
    var f = Ce(), l = f[0], s = f[2];
    var d = e({
      i: r(v, o),
      v: tr
    }, vr(r, v, o, true)), p = d[0], _ = d[1];
    var g = _(), b = g[0];
    var m = a(v);
    var S = {
      x: b.x === 0,
      y: b.y === 0
    };
    var y = {
      elements: {
        host: null,
        padding: !m,
        viewport: function viewport(r) {
          return m && Mr(r) && r;
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
    var w = sr({}, Va);
    var O = vr(sr, {}, w);
    var x = vr(sr, {}, y);
    var E = {
      j: b,
      V: S,
      N: m,
      $: !!h,
      J: vr(l, "r"),
      K: x,
      rr: function _setDefaultInitialization(r) {
        return sr(y, r) && x();
      },
      er: O,
      ar: function _setDefaultOptions(r) {
        return sr(w, r) && O();
      },
      nr: sr({}, y),
      tr: sr({}, w)
    };
    yr(v, "style");
    Fr(v);
    se(n, "resize", (function() {
      s("r", []);
    }));
    if (C(n.matchMedia) && !m && (!S.x || !S.y)) {
      var A = function addZoomListener(r) {
        var e = n.matchMedia("(resolution: " + n.devicePixelRatio + "dppx)");
        se(e, "change", (function() {
          r();
          A(r);
        }), {
          D: true
        });
      };
      A((function() {
        var r = p(), e = r[0], a = r[1];
        sr(E.j, e);
        s("r", [ a ]);
      }));
    }
    return E;
  };
  var Ba = function getEnvironment() {
    if (!qa) {
      qa = Ua();
    }
    return qa;
  };
  var Ya = function createEventContentChange(r, e, a) {
    var n = false;
    var t = a ? new WeakMap : false;
    var i = function destroy() {
      n = true;
    };
    var v = function updateElements(i) {
      if (t && a) {
        var v = a.map((function(e) {
          var a = e || [], n = a[0], t = a[1];
          var v = t && n ? (i || Pr)(n, r) : [];
          return [ v, t ];
        }));
        each(v, (function(a) {
          return each(a[0], (function(i) {
            var v = a[1];
            var o = t.get(i) || [];
            var u = r.contains(i);
            if (u && v) {
              var c = se(i, v, (function(r) {
                if (n) {
                  c();
                  t.delete(i);
                } else {
                  e(r);
                }
              }));
              t.set(i, L(o, c));
            } else {
              N(o);
              t.delete(i);
            }
          }));
        }));
      }
    };
    v();
    return [ i, v ];
  };
  var Wa = function createDOMObserver(r, e, a, n) {
    var t = false;
    var i = n || {}, v = i.ir, o = i.vr, u = i.ur, c = i.cr, f = i.lr, l = i.sr;
    var s = cr((function() {
      return t && a(true);
    }), {
      p: 33,
      _: 99
    });
    var d = Ya(r, s, u), _ = d[0], g = d[1];
    var h = v || [];
    var b = o || [];
    var m = I(h, b);
    var S = function observerCallback(t, i) {
      if (!R(i)) {
        var v = f || _r;
        var o = l || _r;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(a) {
          var t = a.attributeName, i = a.target, f = a.type, l = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var h = f === "attributes";
          var m = f === "childList";
          var S = r === i;
          var y = h && t;
          var O = y && br(i, t || "");
          var C = w(O) ? O : null;
          var x = y && l !== C;
          var E = M(b, t) && x;
          if (e && (m || !S)) {
            var A = h && x;
            var T = A && c && zr(i, c);
            var H = T ? !v(i, t, l, C) : !h || A;
            var P = H && !o(a, !!T, r, n);
            each(_, (function(r) {
              return L(u, r);
            }));
            each(g, (function(r) {
              return L(u, r);
            }));
            p = p || P;
          }
          if (!e && S && x && !v(i, t, l, C)) {
            L(s, t);
            d = d || E;
          }
        }));
        g((function(r) {
          return F(u).reduce((function(e, a) {
            L(e, Pr(r, a));
            return zr(a, r) ? L(e, a) : e;
          }), []);
        }));
        if (e) {
          if (!t && p) {
            a(false);
          }
          return [ false ];
        }
        if (!R(s) || d) {
          var _ = [ F(s), d ];
          if (!t) {
            a.apply(0, _);
          }
          return _;
        }
      }
    };
    var y = new p(vr(S, false));
    return [ function() {
      y.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: m,
        subtree: e,
        childList: e,
        characterData: e
      });
      t = true;
      return function() {
        if (t) {
          _();
          y.disconnect();
          t = false;
        }
      };
    }, function() {
      if (t) {
        s.O();
        return S(true, y.takeRecords());
      }
    } ];
  };
  var Xa = null;
  var Za = function createSizeObserver(r, a, n) {
    var t = n || {}, i = t.dr;
    var v = He(Ca);
    var o = e({
      i: false,
      o: true
    }), u = o[0];
    return function() {
      var e = [];
      var n = Yr('<div class="' + ea + '"><div class="' + na + '"></div></div>');
      var t = n[0];
      var o = t.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var e = x(r) && !R(r);
        var n = false;
        var t = false;
        if (e) {
          var i = r[0];
          var v = u(i.contentRect), o = v[0], c = v[2];
          var f = ce(o);
          t = fe(o, c);
          n = !t && !f;
        } else {
          t = r === true;
        }
        if (!n) {
          a({
            pr: true,
            dr: t
          });
        }
      };
      if (g) {
        if (!O(Xa)) {
          var f = new g(_r);
          f.observe(r, {
            get box() {
              Xa = true;
            }
          });
          Xa = Xa || false;
          f.disconnect();
        }
        var l = cr(c, {
          p: 0,
          _: 0
        });
        var s = function resizeObserverCallback(r) {
          return l(r);
        };
        var d = new g(s);
        d.observe(Xa ? r : o);
        L(e, [ function() {
          d.disconnect();
        }, !Xa && Nr(r, t) ]);
        if (Xa) {
          var p = new g(s);
          p.observe(r, {
            box: "border-box"
          });
          L(e, (function() {
            return p.disconnect();
          }));
        }
      } else if (v) {
        var _ = v(o, c, i), h = _[0], b = _[1];
        L(e, I([ Hr(t, aa), se(t, "animationstart", h), Nr(r, t) ], b));
      } else {
        return _r;
      }
      return vr(N, e);
    };
  };
  var Ga = function createTrinsicObserver(r, a) {
    var n;
    var t = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Br(oa);
    var v = e({
      i: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, e) {
      if (r) {
        var n = o(t(r));
        var i = n[1];
        return i && !e && a(n) && [ n ];
      }
    };
    var c = function intersectionObserverCallback(r, e) {
      return u(e.pop(), r);
    };
    return [ function() {
      var e = [];
      if (_) {
        n = new _(vr(c, false), {
          root: r
        });
        n.observe(i);
        L(e, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = ne(i);
          u(r);
        };
        L(e, Za(i, a)());
        a();
      }
      return vr(N, L(e, Nr(r, i)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var $a = function createObserversSetup(r, a, n, t) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var f;
    var l = "[" + Ue + "]";
    var s = "[" + Ye + "]";
    var d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var p = r._r, _ = r.gr, h = r.F, b = r.hr, m = r.br, S = r.R, w = r.mr, O = r.Sr, E = r.yr, A = r.wr;
    var T = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var H = {
      Or: false,
      B: T(p)
    };
    var P = Ba();
    var D = He(Pa);
    var z = e({
      v: nr,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = D && D.k(r, a, H, P, n).Z;
      var t = w && S;
      var i = !t && Er(_, Ue, je);
      var v = !S && O(Ze);
      var o = v && he(b);
      var u = o && A();
      var c = E(Ge, i);
      var f = v && e && e()[0];
      var l = ie(h);
      var s = ve(h);
      if (f) {
        f();
      }
      ge(b, o);
      if (u) {
        u();
      }
      if (i) {
        c();
      }
      return {
        w: l.w + s.w,
        h: l.h + s.h
      };
    })), M = z[0];
    var L = cr(t, {
      p: function _debounceTiming() {
        return i;
      },
      _: function _maxDebounceTiming() {
        return v;
      },
      S: function _mergeParams(r, e) {
        var a = r[0];
        var n = e[0];
        return [ I(lr(a), lr(n)).reduce((function(r, e) {
          r[e] = a[e] || n[e];
          return r;
        }), {}) ];
      }
    });
    var V = function setDirection(r) {
      var e = T(p);
      sr(r, {
        Cr: f !== e
      });
      sr(H, {
        B: e
      });
      f = e;
    };
    var k = function onTrinsicChanged(r, e) {
      var a = r[0], n = r[1];
      var i = {
        Er: n
      };
      sr(H, {
        Or: a
      });
      if (!e) {
        t(i);
      }
      return i;
    };
    var R = function onSizeChanged(r) {
      var e = r.pr, a = r.dr;
      var n = e && !a;
      var i = !n && P.N ? L : t;
      var v = {
        pr: e || a,
        dr: a
      };
      V(v);
      i(v);
    };
    var F = function onContentMutation(r, e) {
      var a = M(), n = a[1];
      var i = {
        Ar: n
      };
      V(i);
      var v = r ? t : L;
      if (n && !e) {
        v(i);
      }
      return i;
    };
    var N = function onHostMutation(r, e, a) {
      var n = {
        Tr: e
      };
      V(n);
      if (e && !a) {
        L(n);
      }
      return n;
    };
    var j = m ? Ga(_, k) : [], q = j[0], U = j[1];
    var B = !S && Za(_, R, {
      dr: true
    });
    var Y = Wa(_, false, N, {
      vr: d,
      ir: d
    }), W = Y[0], X = Y[1];
    var Z = S && g && new g((function(r) {
      var e = r[r.length - 1].contentRect;
      R({
        pr: true,
        dr: fe(e, c)
      });
      c = e;
    }));
    var G = cr((function() {
      var r = M(), e = r[1];
      t({
        Ar: e
      });
    }), {
      p: 222,
      m: true
    });
    return [ function() {
      if (Z) {
        Z.observe(_);
      }
      var r = B && B();
      var e = q && q();
      var a = W();
      var n = P.J((function(r) {
        if (r) {
          L({
            Hr: r
          });
        } else {
          G();
        }
      }));
      return function() {
        if (Z) {
          Z.disconnect();
        }
        if (r) {
          r();
        }
        if (e) {
          e();
        }
        if (u) {
          u();
        }
        a();
        n();
      };
    }, function(r) {
      var e = r.Pr, a = r.Dr, n = r.zr;
      var t = {};
      var c = e("update.ignoreMutation"), f = c[0];
      var p = e("update.attributes"), _ = p[0], g = p[1];
      var b = e("update.elementEvents"), w = b[0], O = b[1];
      var E = e("update.debounce"), A = E[0], T = E[1];
      var H = O || g;
      var P = a || n;
      var D = function ignoreMutationFromOptions(r) {
        return C(f) && f(r);
      };
      if (H) {
        if (o) {
          o();
        }
        if (u) {
          u();
        }
        var z = Wa(m || h, true, F, {
          ir: I(d, _ || []),
          ur: w,
          cr: l,
          sr: function _ignoreContentChange(r, e) {
            var a = r.target, n = r.attributeName;
            var t = !e && n && !S ? Rr(a, l, s) : false;
            return t || !!Vr(a, "." + ca) || !!D(r);
          }
        }), M = z[0], R = z[1];
        u = M();
        o = R;
      }
      if (T) {
        L.O();
        if (x(A)) {
          var j = A[0];
          var q = A[1];
          i = y(j) && j;
          v = y(q) && q;
        } else if (y(A)) {
          i = A;
          v = false;
        } else {
          i = false;
          v = false;
        }
      }
      if (P) {
        var B = X();
        var Y = U && U();
        var W = o && o();
        if (B) {
          sr(t, N(B[0], B[1], P));
        }
        if (Y) {
          sr(t, k(Y[0], P));
        }
        if (W) {
          sr(t, F(W[0], P));
        }
      }
      V(t);
      return t;
    }, H ];
  };
  var Ja = function resolveInitialization(r, e) {
    return C(e) ? e.apply(0, r) : e;
  };
  var Ka = function staticInitializationElement(r, e, a, n) {
    var t = b(n) ? a : n;
    var i = Ja(r, t);
    return i || e.apply(0, r);
  };
  var Qa = function dynamicInitializationElement(r, e, a, n) {
    var t = b(n) ? a : n;
    var i = Ja(r, t);
    return !!i && (H(i) ? i : e.apply(0, r));
  };
  var rn = function cancelInitialization(r, e) {
    var a = e || {}, n = a.nativeScrollbarsOverlaid, t = a.body;
    var i = Ba(), v = i.V, o = i.N, u = i.K;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = n != null ? n : f;
    var d = b(t) ? l : t;
    var p = (v.x || v.y) && s;
    var _ = r && (m(d) ? !o : d);
    return !!p || !!_;
  };
  var en = function createScrollbarsSetupElements(r, e, a, n) {
    var t = "--os-viewport-percent";
    var i = "--os-scroll-percent";
    var v = "--os-scroll-direction";
    var o = Ba(), u = o.K;
    var c = u(), f = c.scrollbars;
    var l = f.slot;
    var s = e._r, d = e.gr, p = e.F, _ = e.Mr, g = e.hr, b = e.mr, m = e.R;
    var S = _ ? {} : r, y = S.scrollbars;
    var w = y || {}, C = w.slot;
    var x = [];
    var E = [];
    var A = [];
    var T = Qa([ s, d, p ], (function() {
      return m && b ? s : d;
    }), l, C);
    var H = function initScrollTimeline(r) {
      if (h) {
        var e = null;
        var n = [];
        var t = new h({
          source: g,
          axis: r
        });
        var i = function cancelAnimation() {
          if (e) {
            e.cancel();
          }
          e = null;
        };
        var v = function _setScrollPercentAnimation(v) {
          var o = a.Ir;
          var u = Se(o)[r];
          var c = r === "x";
          var f = [ Kr(0, c), Kr("calc(100cq" + (c ? "w" : "h") + " + -100%)", c) ];
          var l = u ? f : f.reverse();
          if (n[0] === l[0] && n[1] === l[1]) {
            return i;
          }
          i();
          n = l;
          e = v.Lr.animate({
            clear: [ "left" ],
            transform: l
          }, {
            timeline: t
          });
          return i;
        };
        return {
          Vr: v
        };
      }
    };
    var P = {
      x: H("x"),
      y: H("y")
    };
    var D = function getViewportPercent() {
      var r = a.kr, e = a.Rr;
      var n = function getAxisValue(r, e) {
        return gr(0, 1, r / (r + e) || 0);
      };
      return {
        x: n(e.x, r.x),
        y: n(e.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, e, a) {
      var n = a ? Hr : Tr;
      each(r, (function(r) {
        n(r.Fr, e);
      }));
    };
    var M = function scrollbarStyle(r, e) {
      each(r, (function(r) {
        var a = e(r), n = a[0], t = a[1];
        setStyles(n, t);
      }));
    };
    var I = function scrollbarsAddRemoveClass(r, e, a) {
      var n = O(a);
      var t = n ? a : true;
      var i = n ? !a : true;
      if (t) {
        z(E, r, e);
      }
      if (i) {
        z(A, r, e);
      }
    };
    var V = function refreshScrollbarsHandleLength() {
      var r = D();
      var e = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Fr, (a = {}, a[t] = Gr(r) + "", a) ];
        };
      };
      M(E, e(r.x));
      M(A, e(r.y));
    };
    var k = function refreshScrollbarsHandleOffset() {
      if (!h) {
        var r = a.Ir;
        var e = ye(r, he(g));
        var n = function createScrollbarStyleFn(r) {
          return function(e) {
            var a;
            return [ e.Fr, (a = {}, a[i] = Gr(r) + "", a) ];
          };
        };
        M(E, n(e.x));
        M(A, n(e.y));
      }
    };
    var R = function refreshScrollbarsScrollCoordinates() {
      var r = a.Ir;
      var e = Se(r);
      var n = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Fr, (a = {}, a[v] = r ? "0" : "1", a) ];
        };
      };
      M(E, n(e.x));
      M(A, n(e.y));
      if (h) {
        E.forEach(P.x.Vr);
        A.forEach(P.y.Vr);
      }
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !b) {
        var r = a.kr, e = a.Ir;
        var n = Se(e);
        var t = ye(e, he(g));
        var i = function styleScrollbarPosition(e) {
          var a = e.Fr;
          var i = Lr(a) === p && a;
          var v = function getTranslateValue(r, e, a) {
            var n = e * r;
            return $r(a ? n : -n);
          };
          return [ i, i && {
            transform: Kr({
              x: v(t.x, r.x, n.x),
              y: v(t.y, r.y, n.y)
            })
          } ];
        };
        M(E, i);
        M(A, i);
      }
    };
    var j = function generateScrollbarDOM(r) {
      var e = r ? "x" : "y";
      var a = r ? la : sa;
      var t = Br(ca + " " + a);
      var i = Br(da);
      var v = Br(pa);
      var o = {
        Fr: t,
        Nr: i,
        Lr: v
      };
      var u = P[e];
      L(r ? E : A, o);
      L(x, [ Nr(t, i), Nr(i, v), vr(Fr, t), u && u.Vr(o), n(o, I, r) ]);
      return o;
    };
    var q = vr(j, true);
    var U = vr(j, false);
    var B = function appendElements() {
      Nr(T, E[0].Fr);
      Nr(T, A[0].Fr);
      return vr(N, x);
    };
    q();
    U();
    return [ {
      jr: V,
      qr: k,
      Ur: R,
      Br: F,
      Yr: I,
      Wr: {
        Xr: E,
        Zr: q,
        Gr: vr(M, E)
      },
      $r: {
        Xr: A,
        Zr: U,
        Gr: vr(M, A)
      }
    }, B ];
  };
  var an = function createScrollbarsSetupEvents(r, e, a, n) {
    return function(t, i, u) {
      var c = e.gr, f = e.F, s = e.R, d = e.hr, p = e.Jr, _ = e.wr;
      var g = t.Fr, h = t.Nr, b = t.Lr;
      var m = or(333), S = m[0], y = m[1];
      var w = or(444), O = w[0], x = w[1];
      var E = function scrollOffsetElementScrollBy(r) {
        if (C(d.scrollBy)) {
          d.scrollBy({
            behavior: "smooth",
            left: r.x,
            top: r.y
          });
        }
      };
      var A = function createInteractiveScrollEvents() {
        var e = "pointerup pointercancel lostpointercapture";
        var n = "client" + (u ? "X" : "Y");
        var t = u ? $ : J;
        var i = u ? "left" : "top";
        var c = u ? "w" : "h";
        var f = u ? "x" : "y";
        var l = function createRelativeHandleMove(r, e) {
          return function(n) {
            var t;
            var i = a.kr;
            var v = ne(h)[c] - ne(b)[c];
            var o = e * n / v;
            var u = o * i[f];
            ge(d, (t = {}, t[f] = r + u, t));
          };
        };
        var s = [];
        return se(h, "pointerdown", (function(a) {
          var u = Vr(a.target, "." + pa) === b;
          var g = u ? b : h;
          var m = r.scrollbars;
          var S = m[u ? "dragScroll" : "clickScroll"];
          var y = a.button, w = a.isPrimary, C = a.pointerType;
          var A = m.pointers;
          var T = y === 0 && w && S && (A || []).includes(C);
          if (T) {
            N(s);
            x();
            var H = !u && (a.shiftKey || S === "instant");
            var P = vr(oe, b);
            var D = vr(oe, h);
            var z = function getHandleOffset(r, e) {
              return (r || P())[i] - (e || D())[i];
            };
            var M = v(oe(d)[t]) / ne(d)[c] || 1;
            var I = l(he(d)[f], 1 / M);
            var V = a[n];
            var k = P();
            var R = D();
            var F = k[t];
            var j = z(k, R) + F / 2;
            var q = V - R[i];
            var U = u ? 0 : q - j;
            var B = function releasePointerCapture(r) {
              N(X);
              g.releasePointerCapture(r.pointerId);
            };
            var Y = u || H;
            var W = _();
            var X = [ se(p, e, B), se(p, "selectstart", (function(r) {
              return pe(r);
            }), {
              H: false
            }), se(h, e, B), Y && se(h, "pointermove", (function(r) {
              return I(U + (r[n] - V));
            })), Y && function() {
              var r = he(d);
              W();
              var e = he(d);
              var a = {
                x: e.x - r.x,
                y: e.y - r.y
              };
              if (o(a.x) > 3 || o(a.y) > 3) {
                _();
                ge(d, r);
                E(a);
                O(W);
              }
            } ];
            g.setPointerCapture(a.pointerId);
            if (H) {
              I(U);
            } else if (!u) {
              var Z = He(za);
              if (Z) {
                var G = Z(I, U, F, (function(r) {
                  if (r) {
                    W();
                  } else {
                    L(X, W);
                  }
                }));
                L(X, G);
                L(s, vr(G, true));
              }
            }
          }
        }));
      };
      var T = true;
      return vr(N, [ se(b, "pointermove pointerleave", n), se(g, "pointerenter", (function() {
        i(ha, true);
      })), se(g, "pointerleave pointercancel", (function() {
        i(ha, false);
      })), !s && se(g, "mousedown", (function() {
        var r = kr();
        if (mr(r, Ye) || mr(r, Ue) || r === document.body) {
          l(vr(we, f), 25);
        }
      })), se(g, "wheel", (function(r) {
        var e = r.deltaX, a = r.deltaY, n = r.deltaMode;
        if (T && n === 0 && Lr(g) === c) {
          E({
            x: e,
            y: a
          });
        }
        T = false;
        i(ya, true);
        S((function() {
          T = true;
          i(ya);
        }));
        pe(r);
      }), {
        H: false,
        P: true
      }), se(g, "pointerdown", vr(se, p, "click", _e, {
        D: true,
        P: true,
        H: false
      }), {
        P: true
      }), A(), y, x ]);
    };
  };
  var nn = function createScrollbarsSetup(r, e, a, n, t, i) {
    var v;
    var o;
    var u;
    var c;
    var f;
    var l = _r;
    var s = 0;
    var d = [ "mouse", "pen" ];
    var p = function isHoverablePointerType(r) {
      return d.includes(r.pointerType);
    };
    var _ = or(), g = _[0], h = _[1];
    var b = or(100), m = b[0], S = b[1];
    var y = or(100), w = y[0], O = y[1];
    var C = or((function() {
      return s;
    })), x = C[0], E = C[1];
    var A = en(r, t, n, an(e, t, n, (function(r) {
      return p(r) && j();
    }))), T = A[0], H = A[1];
    var P = t.gr, D = t.Kr, z = t.mr;
    var M = T.Yr, I = T.jr, V = T.qr, k = T.Ur, R = T.Br;
    var F = function manageScrollbarsAutoHide(r, e) {
      E();
      if (r) {
        M(Sa);
      } else {
        var a = vr(M, Sa, true);
        if (s > 0 && !e) {
          x(a);
        } else {
          a();
        }
      }
    };
    var j = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !v : !c) {
        F(true);
        m((function() {
          F(false);
        }));
      }
    };
    var q = function manageAutoHideSuspension(r) {
      M(ma, r, true);
      M(ma, r, false);
    };
    var U = function onHostMouseEnter(r) {
      if (p(r)) {
        v = u;
        if (u) {
          F(true);
        }
      }
    };
    var B = [ E, S, O, h, function() {
      return l();
    }, se(P, "pointerover", U, {
      D: true
    }), se(P, "pointerenter", U), se(P, "pointerleave", (function(r) {
      if (p(r)) {
        v = false;
        if (u) {
          F(false);
        }
      }
    })), se(P, "pointermove", (function(r) {
      if (p(r) && o) {
        j();
      }
    })), se(D, "scroll", (function(r) {
      g((function() {
        V();
        j();
      }));
      i(r);
      R();
    })) ];
    return [ function() {
      return vr(N, L(B, H()));
    }, function(r) {
      var e = r.Pr, t = r.zr, i = r.Qr, v = r.re;
      var d = v || {}, p = d.ee, _ = d.ae, g = d.ne, h = d.te;
      var b = i || {}, m = b.Cr, S = b.dr;
      var y = a.B;
      var O = Ba(), C = O.V;
      var x = n.ie, E = n.ve;
      var A = e("showNativeOverlaidScrollbars"), T = A[0], H = A[1];
      var P = e("scrollbars.theme"), L = P[0], N = P[1];
      var j = e("scrollbars.visibility"), U = j[0], B = j[1];
      var Y = e("scrollbars.autoHide"), W = Y[0], X = Y[1];
      var Z = e("scrollbars.autoHideSuspend"), G = Z[0], $ = Z[1];
      var J = e("scrollbars.autoHideDelay"), Q = J[0];
      var er = e("scrollbars.dragScroll"), ar = er[0], nr = er[1];
      var tr = e("scrollbars.clickScroll"), ir = tr[0], or = tr[1];
      var ur = e("overflow"), cr = ur[0], fr = ur[1];
      var lr = S && !t;
      var sr = E.x || E.y;
      var dr = p || _ || h || m || t;
      var pr = g || B || fr;
      var _r = T && C.x && C.y;
      var gr = function setScrollbarVisibility(r, e, a) {
        var n = r.includes(rr) && (U === K || U === "auto" && e === rr);
        M(_a, n, a);
        return n;
      };
      s = Q;
      if (lr) {
        if (G && sr) {
          q(false);
          l();
          w((function() {
            l = se(D, "scroll", vr(q, true), {
              D: true
            });
          }));
        } else {
          q(true);
        }
      }
      if (H) {
        M(ua, _r);
      }
      if (N) {
        M(f);
        M(L, true);
        f = L;
      }
      if ($ && !G) {
        q(true);
      }
      if (X) {
        o = W === "move";
        u = W === "leave";
        c = W === "never";
        F(c, true);
      }
      if (nr) {
        M(Oa, ar);
      }
      if (or) {
        M(wa, !!ir);
      }
      if (pr) {
        var hr = gr(cr.x, x.x, true);
        var br = gr(cr.y, x.y, false);
        var mr = hr && br;
        M(ga, !mr);
      }
      if (dr) {
        V();
        I();
        R();
        if (h) {
          k();
        }
        M(ba, !E.x, true);
        M(ba, !E.y, false);
        M(fa, y && !z);
      }
    }, {}, T ];
  };
  var tn = function createStructureSetupElements(r) {
    var e = Ba();
    var a = e.K, t = e.N;
    var i = a(), v = i.elements;
    var o = v.padding, u = v.viewport, c = v.content;
    var f = H(r);
    var l = f ? {} : r;
    var s = l.elements;
    var d = s || {}, p = d.padding, _ = d.viewport, g = d.content;
    var h = f ? r : l.target;
    var b = Mr(h);
    var m = h.ownerDocument;
    var S = m.documentElement;
    var y = function getDocumentWindow() {
      return m.defaultView || n;
    };
    var w = vr(Ka, [ h ]);
    var O = vr(Qa, [ h ]);
    var C = vr(Br, "");
    var x = vr(w, C, u);
    var E = vr(O, C, c);
    var A = function elementHasOverflow(r) {
      var e = ne(r);
      var a = ie(r);
      var n = getStyles(r, Z);
      var t = getStyles(r, G);
      return a.w - e.w > 0 && !Aa(n) || a.h - e.h > 0 && !Aa(t);
    };
    var T = x(_);
    var P = T === h;
    var D = P && b;
    var z = !P && E(g);
    var I = !P && T === z;
    var V = D ? S : T;
    var k = D ? V : h;
    var R = !P && O(C, o, p);
    var F = !I && z;
    var j = [ F, V, R, k ].map((function(r) {
      return H(r) && !Lr(r) && r;
    }));
    var q = function elementIsGenerated(r) {
      return r && M(j, r);
    };
    var U = !q(V) && A(V) ? V : h;
    var B = D ? S : V;
    var Y = D ? m : V;
    var W = {
      _r: h,
      gr: k,
      F: V,
      oe: R,
      br: F,
      hr: B,
      Kr: Y,
      ue: b ? S : U,
      Jr: m,
      mr: b,
      Mr: f,
      R: P,
      ce: y,
      Sr: function _viewportHasClass(r) {
        return Er(V, Ye, r);
      },
      yr: function _viewportAddRemoveClass(r, e) {
        return xr(V, Ye, r, e);
      },
      wr: function _removeScrollObscuringStyles() {
        return xr(B, Ye, $e, true);
      }
    };
    var X = W._r, $ = W.gr, J = W.oe, K = W.F, Q = W.br;
    var rr = [ function() {
      yr($, [ Ue, Ne ]);
      yr(X, Ne);
      if (b) {
        yr(S, [ Ne, Ue ]);
      }
    } ];
    var er = Ir([ Q, K, J, $, X ].find((function(r) {
      return r && !q(r);
    })));
    var ar = D ? X : Q || K;
    var nr = vr(N, rr);
    var tr = function appendElements() {
      var r = y();
      var e = kr();
      var a = function unwrap(r) {
        Nr(Lr(r), Ir(r));
        Fr(r);
      };
      var n = function prepareWrapUnwrapFocus(r) {
        return se(r, "focusin focusout focus blur", _e, {
          P: true,
          H: false
        });
      };
      var i = "tabindex";
      var v = br(K, i);
      var o = n(e);
      Sr($, Ue, P ? "" : Be);
      Sr(J, Qe, "");
      Sr(K, Ye, "");
      Sr(Q, ra, "");
      if (!P) {
        Sr(K, i, v || "-1");
        if (b) {
          Sr(S, qe, "");
        }
      }
      Nr(ar, er);
      Nr($, J);
      Nr(J || $, !P && K);
      Nr(K, Q);
      L(rr, [ o, function() {
        var r = kr();
        var e = q(K);
        var t = e && r === K ? X : r;
        var o = n(t);
        yr(J, Qe);
        yr(Q, ra);
        yr(K, Ye);
        if (b) {
          yr(S, qe);
        }
        if (v) {
          Sr(K, i, v);
        } else {
          yr(K, i);
        }
        if (q(Q)) {
          a(Q);
        }
        if (e) {
          a(K);
        }
        if (q(J)) {
          a(J);
        }
        we(t);
        o();
      } ]);
      if (t && !P) {
        Cr(K, Ye, Je);
        L(rr, vr(yr, K, Ye));
      }
      we(!P && b && e === X && r.top === r ? K : e);
      o();
      er = 0;
      return nr;
    };
    return [ W, tr, nr ];
  };
  var vn = function createTrinsicUpdateSegment(r) {
    var e = r.br;
    return function(r) {
      var a = r.Qr, n = r.fe, t = r.zr;
      var i = a || {}, v = i.Er;
      var o = n.Or;
      var u = e && (v || t);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var on = function createPaddingUpdateSegment(r, a) {
    var n = r.gr, t = r.oe, i = r.F, v = r.R;
    var o = e({
      v: ir,
      i: Jr()
    }, vr(Jr, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Pr, n = r.Qr, o = r.fe, f = r.zr;
      var l = c(f), s = l[0], d = l[1];
      var p = Ba(), _ = p.N;
      var g = n || {}, h = g.pr, b = g.Ar, m = g.Cr;
      var S = o.B;
      var y = e("paddingAbsolute"), w = y[0], O = y[1];
      var C = f || b;
      if (h || d || C) {
        var x = u(f);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || m || d);
      if (E) {
        var A, T;
        var H = !w || !t && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (A = {}, A[W] = H && !S ? -P : 0, A[X] = H ? -D : 0, A[Y] = H && S ? -P : 0, 
        A.top = H ? -s.t : 0, A.right = H ? S ? -s.r : "auto" : 0, A.left = H ? S ? "auto" : -s.l : 0, 
        A[$] = H && "calc(100% + " + P + "px)", A);
        var M = (T = {}, T[j] = H ? s.t : 0, T[q] = H ? s.r : 0, T[B] = H ? s.b : 0, T[U] = H ? s.l : 0, 
        T);
        setStyles(t || i, z);
        setStyles(i, M);
        sr(a, {
          oe: s,
          le: !H,
          Y: t ? M : sr({}, z, M)
        });
      }
      return {
        se: E
      };
    };
  };
  var un = function createOverflowUpdateSegment(r, a) {
    var i = Ba();
    var v = r.gr, o = r.oe, u = r.F, c = r.R, l = r.Kr, s = r.hr, d = r.mr, p = r.yr, _ = r.ce;
    var g = i.N;
    var h = d && c;
    var b = vr(t, 0);
    var m = {
      display: function display() {
        return false;
      },
      direction: function direction(r) {
        return r !== "ltr";
      },
      flexDirection: function flexDirection(r) {
        return r.endsWith("-reverse");
      },
      writingMode: function writingMode(r) {
        return r !== "horizontal-tb";
      }
    };
    var S = lr(m);
    var y = {
      v: nr,
      i: {
        w: 0,
        h: 0
      }
    };
    var w = {
      v: tr,
      i: {}
    };
    var O = function setMeasuringMode(r) {
      p(Ge, !h && r);
    };
    var C = function getMeasuredScrollCoordinates(r) {
      var e = S.some((function(e) {
        var a = r[e];
        return a && m[e](a);
      }));
      if (!e) {
        return {
          M: {
            x: 0,
            y: 0
          },
          I: {
            x: 1,
            y: 1
          }
        };
      }
      O(true);
      var a = he(s);
      var n = p(Ke, true);
      var t = se(l, rr, (function(r) {
        var e = he(s);
        if (r.isTrusted && e.x === a.x && e.y === a.y) {
          de(r);
        }
      }), {
        P: true,
        D: true
      });
      ge(s, {
        x: 0,
        y: 0
      });
      n();
      var i = he(s);
      var v = ie(s);
      ge(s, {
        x: v.w,
        y: v.h
      });
      var o = he(s);
      ge(s, {
        x: o.x - i.x < 1 && -v.w,
        y: o.y - i.y < 1 && -v.h
      });
      var u = he(s);
      ge(s, a);
      f((function() {
        return t();
      }));
      return {
        M: i,
        I: u
      };
    };
    var x = function getOverflowAmount(r, e) {
      var a = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: b(r.w - e.w),
        h: b(r.h - e.h)
      };
      return {
        w: t.w > a ? t.w : 0,
        h: t.h > a ? t.h : 0
      };
    };
    var E = function getViewportOverflowStyle(r, e) {
      var a = function getAxisOverflowStyle(r, e, a, n) {
        var t = r === K ? Q : Ta(r);
        var i = Aa(r);
        var v = Aa(a);
        if (!e && !n) {
          return Q;
        }
        if (i && v) {
          return K;
        }
        if (i) {
          var o = e ? K : Q;
          return e && n ? t : o;
        }
        var u = v && n ? K : Q;
        return e ? t : u;
      };
      return {
        x: a(e.x, r.x, e.y, r.y),
        y: a(e.y, r.y, e.x, r.x)
      };
    };
    var A = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ K, Q, rr ].map((function(e) {
          return ir(Ha(e), r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      p(a);
      p(lr(r).map((function(e) {
        return ir(r[e], e === "x");
      })).join(" "), true);
    };
    var T = e(y, vr(ve, u)), H = T[0], P = T[1];
    var D = e(y, vr(ie, u)), z = D[0], M = D[1];
    var I = e(y), L = I[0], V = I[1];
    var k = e(w), R = k[0];
    var F = e(y), N = F[0], j = F[1];
    var q = e(w), U = q[0];
    var B = e({
      v: function _equal(r, e) {
        return ar(r, e, S);
      },
      i: {}
    }, (function() {
      return ue(u) ? getStyles(u, S) : {};
    })), Y = B[0];
    var W = e({
      v: function _equal(r, e) {
        return tr(r.M, e.M) && tr(r.I, e.I);
      },
      i: be()
    }), X = W[0], $ = W[1];
    var J = He(Pa);
    var ir = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? We : Xe;
      return "" + a + er(r);
    };
    return function(e, n) {
      var t = e.Pr, c = e.Qr, f = e.fe, l = e.zr;
      var s = n.se;
      var d = c || {}, m = d.pr, S = d.Tr, y = d.Ar, w = d.Cr, T = d.dr, D = d.Hr;
      var I = J && J.k(r, a, f, i, t);
      var k = I || {}, F = k.X, q = k.Z, B = k.G;
      var W = Ea(t, i), K = W[0], Q = W[1];
      var rr = t("overflow"), er = rr[0], ar = rr[1];
      var nr = Aa(er.x);
      var tr = Aa(er.y);
      var ir = m || s || y || w || D || Q;
      var vr = P(l);
      var or = M(l);
      var ur = V(l);
      var cr = j(l);
      if (Q && g) {
        p(Je, !K);
      }
      if (ir) {
        if (Er(v, Ue, je)) {
          O(true);
        }
        var fr = q ? q() : [], lr = fr[0];
        var dr = vr = H(l), pr = dr[0];
        var _r = or = z(l), gr = _r[0];
        var hr = te(u);
        var br = h && ae(_());
        var mr = {
          w: b(gr.w + pr.w),
          h: b(gr.h + pr.h)
        };
        var Sr = {
          w: b((br ? br.w : hr.w + b(hr.w - gr.w)) + pr.w),
          h: b((br ? br.h : hr.h + b(hr.h - gr.h)) + pr.h)
        };
        if (lr) {
          lr();
        }
        cr = N(Sr);
        ur = L(x(mr, Sr), l);
      }
      var yr = cr, wr = yr[0], Or = yr[1];
      var Cr = ur, Ar = Cr[0], Tr = Cr[1];
      var Hr = or, Pr = Hr[0], Dr = Hr[1];
      var zr = vr, Mr = zr[0], Ir = zr[1];
      var Lr = R({
        x: Ar.w > 0,
        y: Ar.h > 0
      }), Vr = Lr[0], kr = Lr[1];
      var Rr = nr && tr && (Vr.x || Vr.y) || nr && Vr.x && !Vr.y || tr && Vr.y && !Vr.x;
      var Fr = s || w || D || Ir || Dr || Or || Tr || ar || Q || ir || S && h;
      var Nr = Y(l), jr = Nr[0], qr = Nr[1];
      var Ur = w || T || qr || kr || l;
      var Br = Ur ? X(C(jr), l) : $(), Yr = Br[0], Wr = Br[1];
      var Xr = E(Vr, er);
      O(false);
      if (Fr) {
        A(Xr);
        var Zr = getStyles(u, [ Z, G ]), Gr = Zr.overflowX, $r = Zr.overflowY;
        Xr = {
          x: Ha(Gr),
          y: Ha($r)
        };
        if (B && F) {
          setStyles(u, B(Xr, f, F(Xr, Pr, Mr)));
        }
      }
      var Jr = U(Xr), Kr = Jr[0], Qr = Jr[1];
      xr(v, Ue, je, Rr);
      xr(o, Qe, je, Rr);
      sr(a, {
        ie: Kr,
        Rr: {
          x: wr.w,
          y: wr.h
        },
        kr: {
          x: Ar.w,
          y: Ar.h
        },
        ve: Vr,
        Ir: me(Yr, Ar)
      });
      return {
        ne: Qr,
        ee: Or,
        ae: Tr,
        te: Wr || Tr,
        de: Ur
      };
    };
  };
  var cn = function createStructureSetup(r) {
    var e;
    var a = tn(r), n = a[0], t = a[1], i = a[2];
    var v = {
      oe: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      le: false,
      Y: (e = {}, e[W] = 0, e[X] = 0, e[Y] = 0, e[j] = 0, e[q] = 0, e[B] = 0, e[U] = 0, 
      e),
      Rr: {
        x: 0,
        y: 0
      },
      kr: {
        x: 0,
        y: 0
      },
      ie: {
        x: Q,
        y: Q
      },
      ve: {
        x: false,
        y: false
      },
      Ir: be()
    };
    var o = n._r, u = n.hr, c = n.R, f = n.wr;
    var l = Ba(), s = l.N, d = l.V;
    var p = !s && (d.x || d.y);
    var _ = [ vn(n), on(n, v), un(n, v) ];
    return [ t, function(r) {
      var e = {};
      var a = p;
      var n = a && he(u);
      var t = n && f();
      each(_, (function(a) {
        sr(e, a(r, e) || {});
      }));
      ge(u, n);
      if (t) {
        t();
      }
      if (!c) {
        ge(o, 0);
      }
      return e;
    }, v, n, i ];
  };
  var fn = function createSetups(r, e, a, n, t) {
    var i = false;
    var v = Ra(e, {});
    var o = cn(r), u = o[0], c = o[1], f = o[2], l = o[3], s = o[4];
    var d = $a(l, f, v, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = nn(r, e, g, f, l, t), b = h[0], m = h[1], S = h[3];
    var y = function updateHintsAreTruthy(r) {
      return lr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var w = function update(r, t) {
      if (a()) {
        return false;
      }
      var v = r.pe, o = r.zr, u = r.Dr, f = r._e;
      var l = v || {};
      var s = !!o || !i;
      var d = {
        Pr: Ra(e, l, s),
        pe: l,
        zr: s
      };
      if (f) {
        m(d);
        return false;
      }
      var p = t || _(sr({}, d, {
        Dr: u
      }));
      var h = c(sr({}, d, {
        fe: g,
        Qr: p
      }));
      m(sr({}, d, {
        Qr: p,
        re: h
      }));
      var b = y(p);
      var S = y(h);
      var w = b || S || !pr(l) || s;
      i = true;
      if (w) {
        n(r, {
          Qr: p,
          re: h
        });
      }
      return w;
    };
    return [ function() {
      var r = l.ue, e = l.hr, a = l.wr;
      var n = he(r);
      var t = [ p(), u(), b() ];
      var i = a();
      ge(e, n);
      i();
      return vr(N, t);
    }, w, function() {
      return {
        ge: g,
        he: f
      };
    }, {
      be: l,
      me: S
    }, s ];
  };
  var ln = new WeakMap;
  var sn = function addInstance(r, e) {
    ln.set(r, e);
  };
  var dn = function removeInstance(r) {
    ln.delete(r);
  };
  var pn = function getInstance(r) {
    return ln.get(r);
  };
  var _n = function OverlayScrollbars(r, e, a) {
    var n = Ba(), t = n.er;
    var i = H(r);
    var v = i ? r : r.target;
    var o = pn(v);
    if (e && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var e = dr(r);
        var a = He(Ve);
        return a ? a(e, true) : e;
      };
      var s = sr({}, t(), l(e));
      var d = Ce(), p = d[0], _ = d[1], g = d[2];
      var h = Ce(a), b = h[0], m = h[1], S = h[2];
      var y = function triggerEvent(r, e) {
        S(r, e);
        g(r, e);
      };
      var w = fn(r, s, (function() {
        return u;
      }), (function(r, e) {
        var a = r.pe, n = r.zr;
        var t = e.Qr, i = e.re;
        var v = t.pr, o = t.Cr, u = t.Er, c = t.Ar, f = t.Tr, l = t.dr;
        var s = i.ee, d = i.ae, p = i.ne, _ = i.te;
        y("updated", [ P, {
          updateHints: {
            sizeChanged: !!v,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            scrollCoordinatesChanged: !!_,
            contentMutation: !!c,
            hostMutation: !!f,
            appear: !!l
          },
          changedOptions: a || {},
          force: !!n
        } ]);
      }), (function(r) {
        return y("scroll", [ P, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var T = function destroy(r) {
        dn(v);
        N(c);
        u = true;
        y("destroyed", [ P, r ]);
        _();
        m();
      };
      var P = {
        options: function options(r, e) {
          if (r) {
            var a = e ? t() : {};
            var n = ka(s, sr(a, l(r)));
            if (!pr(n)) {
              sr(s, n);
              C({
                pe: n
              });
            }
          }
          return sr({}, s);
        },
        on: b,
        off: function off(r, e) {
          if (r && e) {
            m(r, e);
          }
        },
        state: function state() {
          var r = x(), e = r.ge, a = r.he;
          var n = e.B;
          var t = a.Rr, i = a.kr, v = a.ie, o = a.ve, c = a.oe, f = a.le, l = a.Ir;
          return sr({}, {
            overflowEdge: t,
            overflowAmount: i,
            overflowStyle: v,
            hasOverflow: o,
            scrollCoordinates: {
              start: l.M,
              end: l.I
            },
            padding: c,
            paddingAbsolute: f,
            directionRTL: n,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = E.be, e = r._r, a = r.gr, n = r.oe, t = r.F, i = r.br, v = r.hr, o = r.Kr;
          var u = E.me, c = u.Wr, f = u.$r;
          var l = function translateScrollbarStructure(r) {
            var e = r.Lr, a = r.Nr, n = r.Fr;
            return {
              scrollbar: n,
              track: a,
              handle: e
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var e = r.Xr, a = r.Zr;
            var n = l(e[0]);
            return sr({}, n, {
              clone: function clone() {
                var r = l(a());
                C({
                  _e: true
                });
                return r;
              }
            });
          };
          return sr({}, {
            target: e,
            host: a,
            padding: n || t,
            viewport: t,
            content: i || t,
            scrollOffsetElement: v,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(f)
          });
        },
        update: function update(r) {
          return C({
            zr: r,
            Dr: true
          });
        },
        destroy: vr(T, false),
        plugin: function plugin(r) {
          return f[lr(r)[0]];
        }
      };
      L(c, [ A ]);
      sn(v, P);
      Te(xe, _n, [ P, p, f ]);
      if (rn(E.be.mr, !i && r.cancel)) {
        T(true);
        return P;
      }
      L(c, O());
      y("initialized", [ P ]);
      P.update();
      return P;
    }
    return o;
  };
  _n.plugin = function(r) {
    var e = x(r);
    var a = e ? r : [ r ];
    var n = a.map((function(r) {
      return Te(r, _n)[0];
    }));
    Ae(a);
    return e ? n : n[0];
  };
  _n.valid = function(r) {
    var e = r && r.elements;
    var a = C(e) && e();
    return T(a) && !!pn(a.target);
  };
  _n.env = function() {
    var r = Ba(), e = r.j, a = r.V, n = r.N, t = r.$, i = r.nr, v = r.tr, o = r.K, u = r.rr, c = r.er, f = r.ar;
    return sr({}, {
      scrollbarsSize: e,
      scrollbarsOverlaid: a,
      scrollbarsHiding: n,
      scrollTimeline: t,
      staticDefaultInitialization: i,
      staticDefaultOptions: v,
      getDefaultInitialization: o,
      setDefaultInitialization: u,
      getDefaultOptions: c,
      setDefaultOptions: f
    });
  };
  _n.nonce = ja;
  _n.trustedTypePolicy = Ur;
  r.ClickScrollPlugin = Ma;
  r.OverlayScrollbars = _n;
  r.ScrollbarsHidingPlugin = Da;
  r.SizeObserverPlugin = xa;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
