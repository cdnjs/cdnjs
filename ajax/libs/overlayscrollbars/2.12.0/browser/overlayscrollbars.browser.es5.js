/*!
 * OverlayScrollbars
 * Version: 2.12.0
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
  var T = function isArrayLike(r) {
    var e = !!r && r.length;
    var a = y(e) && e > -1 && e % 1 == 0;
    return x(r) || !C(r) && a ? e > 0 && E(r) ? e - 1 in r : true : false;
  };
  var A = function isPlainObject(r) {
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
    if (T(r)) {
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
    if (!w(e) && T(e)) {
      Array.prototype.push.apply(r, e);
    } else {
      r.push(e);
    }
    return r;
  };
  var k = function from(r) {
    return Array.from(r || []);
  };
  var V = function createOrKeepArray(r) {
    if (x(r)) {
      return r;
    }
    return !w(r) && T(r) ? k(r) : [ r ];
  };
  var R = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var F = function deduplicateArray(r) {
    return k(new Set(r));
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
    var l = function invokeFunctionToDebounce(e) {
      if (u) {
        u();
      }
      if (o) {
        o();
      }
      f = u = o = c = void 0;
      r.apply(this, e);
    };
    var s = function mergeParms(r) {
      return v && c ? v(c, r) : r;
    };
    var d = function flush() {
      if (u && c) {
        l(s(c) || c);
      }
    };
    var p = function debouncedFn() {
      var r = k(arguments);
      var e = ur(n);
      if (e) {
        var a = ur(t);
        var v = s(r);
        var p = v || r;
        var _ = l.bind(0, p);
        if (u) {
          u();
        }
        if (i && !f) {
          _();
          f = true;
          u = e((function() {
            return f = void 0;
          }));
        } else {
          u = e(_);
          if (a && !o) {
            o = a(d);
          }
        }
        c = p;
      } else {
        l(r);
      }
    };
    p.O = d;
    return p;
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
        if (t && A(t)) {
          var v = r[n];
          var o = v;
          if (i && !x(v)) {
            o = [];
          } else if (!i && !A(v)) {
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
      } else if (r && A(r)) {
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
      return k(n).join(" ");
    };
    return {
      C: function _remove(r) {
        return n(t(r, "delete"));
      },
      T: function _add(r) {
        return n(t(r, "add"));
      },
      A: function _has(r) {
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
    wr(r, e).T(a);
    return vr(Or, r, e, a);
  };
  var xr = function addRemoveAttrClass(r, e, a, n) {
    return (n ? Cr : Or)(r, e, a);
  };
  var Er = function hasAttrClass(r, e, a) {
    return wr(r, e).A(a);
  };
  var Tr = function createDomTokenListClass(r) {
    return wr(r, "class");
  };
  var Ar = function removeClass(r, e) {
    Tr(r).C(e);
  };
  var Hr = function addClass(r, e) {
    Tr(r).T(e);
    return vr(Ar, r, e);
  };
  var Pr = function find(r, e) {
    var a = e ? P(e) && e : document;
    return a ? k(a.querySelectorAll(r)) : [];
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
    return r ? k(r.childNodes) : [];
  };
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var kr = function closest(r, e) {
    return P(r) && r.closest(e);
  };
  var Vr = function getFocusedElement(r) {
    return document.activeElement;
  };
  var Rr = function liesBetween(r, e, a) {
    var n = kr(r, e);
    var t = r && Dr(a, n);
    var i = kr(t, e) === n;
    return n && t ? n === r || t === r || i && kr(kr(r, a), e) !== n : false;
  };
  var Fr = function removeElements(r) {
    each(V(r), (function(r) {
      var e = Lr(r);
      if (r && e) {
        e.removeChild(r);
      }
    }));
  };
  var Nr = function appendChildren(r, e) {
    return vr(Fr, r && e && each(V(e), (function(e) {
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
      i = t ? Wr(v, e) : k(e).reduce((function(r, e) {
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
    each(V(e), r);
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
      each(k(e.get(r)), (function(r) {
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
  var Te = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        xe[a] = r[a];
      }));
    }));
  };
  var Ae = function registerPluginModuleInstances(r, e, a) {
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
      var c = A(u);
      var f = n ? n + "." : "";
      if (c && A(o)) {
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
        var m = V(u);
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
  var ke = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[ke] = {
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
  var Ve = "data-overlayscrollbars";
  var Re = "os-environment";
  var Fe = Re + "-scrollbar-hidden";
  var Ne = Ve + "-initialize";
  var je = "noClipping";
  var qe = Ve + "-body";
  var Ue = Ve;
  var Be = "host";
  var Ye = Ve + "-viewport";
  var We = Z;
  var Xe = G;
  var Ze = "arrange";
  var Ge = "measuring";
  var $e = "scrolling";
  var Je = "scrollbarHidden";
  var Ke = "noContent";
  var Qe = Ve + "-padding";
  var ra = Ve + "-content";
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
    var a = e.k;
    var n = r("showNativeOverlaidScrollbars"), t = n[0], i = n[1];
    return [ t && a.x && a.y, i ];
  };
  var Ta = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Aa = function overflowBehaviorToOverflowStyle(r) {
    return r.replace(K + "-", "");
  };
  var Ha = function overflowCssValueToOverflowStyle(r, e) {
    if (r === "auto") {
      return e ? rr : Q;
    }
    var a = r || Q;
    return [ Q, rr, K ].includes(a) ? a : Q;
  };
  var Pa = function getElementOverflowStyle(r, e) {
    var a = getStyles(r, [ Z, G ]), n = a.overflowX, t = a.overflowY;
    return {
      x: Ha(n, e.x),
      y: Ha(t, e.y)
    };
  };
  var Da = "__osScrollbarsHidingPlugin";
  var za = /* @__PURE__ */ function(r) {
    return r = {}, r[Da] = {
      static: function _static() {
        return {
          V: function _viewportArrangement(r, e, a, n, t) {
            var i = r.R, v = r.F;
            var o = n.N, u = n.k, c = n.j;
            var f = !i && !o && (u.x || u.y);
            var l = Ea(t, n), s = l[0];
            var d = function _getViewportOverflowHideOffset(r) {
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
            var p = function _hideNativeScrollbars(r) {
              if (!i) {
                var n;
                var t = a.B;
                var v = sr({}, (n = {}, n[W] = 0, n[X] = 0, n[Y] = 0, n));
                var o = d(r), u = o.q, c = o.U;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var g = e.Y;
                var h = t ? Y : W;
                var b = t ? U : q;
                var m = g[h];
                var S = g[X];
                var y = g[b];
                var w = g[B];
                v[$] = "calc(100% + " + (_ + m * -1) + "px)";
                v[h] = -_ + m;
                v[X] = -p + S;
                if (f) {
                  v[b] = y + (s ? _ : 0);
                  v[B] = w + (l ? p : 0);
                }
                return v;
              }
            };
            var _ = function _arrangeViewport(r, n, t) {
              if (f) {
                var i = e.Y;
                var o = d(r), u = o.q, c = o.U;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var g = a.B;
                var h = g ? q : U;
                var b = i[h];
                var m = i.paddingTop;
                var S = n.w + t.w;
                var y = n.h + t.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: p && l ? p + y - m + "px" : ""
                };
                setStyles(v, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return f;
            };
            var g = function _undoViewportArrange() {
              if (f) {
                var r = e.W, a = e.Y;
                var n = Pa(v, r);
                var t = d(n), i = t.U;
                var o = i.x, u = i.y;
                var c = {};
                var l = function assignProps(r) {
                  return each(r, (function(r) {
                    c[r] = a[r];
                  }));
                };
                if (o) {
                  l([ X, j, B ]);
                }
                if (u) {
                  l([ Y, W, U, q ]);
                }
                var s = getStyles(v, lr(c));
                var _ = Or(v, Ye, Ze);
                setStyles(v, c);
                return function() {
                  setStyles(v, sr({}, s, p(n)));
                  _();
                };
              }
              return _r;
            };
            return {
              X: _,
              Z: g,
              G: p
            };
          }
        };
      }
    }, r;
  }();
  var Ma = "__osClickScrollPlugin";
  var Ia = /* @__PURE__ */ function(r) {
    return r = {}, r[Ma] = {
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
  var La = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (C(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var ka = function getPropByPath(r, e) {
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
  var Ra = function getOptionsDiff(r, e) {
    var a = {};
    var n = I(lr(e), lr(r));
    each(n, (function(n) {
      var t = r[n];
      var i = e[n];
      if (E(t) && E(i)) {
        sr(a[n] = {}, Ra(t, i));
        if (pr(a[n])) {
          delete a[n];
        }
      } else if (fr(e, n) && i !== t) {
        var v = true;
        if (x(t) || x(i)) {
          try {
            if (La(t) === La(i)) {
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
  var Fa = function createOptionCheck(r, e, a) {
    return function(n) {
      return [ ka(r, n), a || ka(e, n) !== void 0 ];
    };
  };
  var Na;
  var ja = function getNonce() {
    return Na;
  };
  var qa = function setNonce(r) {
    Na = r;
  };
  var Ua;
  var Ba = function createEnvironment() {
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
    var c = ja();
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
      k: S,
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
      var T = function addZoomListener(r) {
        var e = n.matchMedia("(resolution: " + n.devicePixelRatio + "dppx)");
        se(e, "change", (function() {
          r();
          T(r);
        }), {
          D: true
        });
      };
      T((function() {
        var r = p(), e = r[0], a = r[1];
        sr(E.j, e);
        s("r", [ a ]);
      }));
    }
    return E;
  };
  var Ya = function getEnvironment() {
    if (!Ua) {
      Ua = Ba();
    }
    return Ua;
  };
  var Wa = function createEventContentChange(r, e, a) {
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
  var Xa = function createDOMObserver(r, e, a, n) {
    var t = false;
    var i = n || {}, v = i.ir, o = i.vr, u = i.ur, c = i.cr, f = i.lr, l = i.sr;
    var s = cr((function() {
      return t && a(true);
    }), {
      p: 33,
      _: 99
    });
    var d = Wa(r, s, u), _ = d[0], g = d[1];
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
            var T = h && x;
            var A = T && c && zr(i, c);
            var H = A ? !v(i, t, l, C) : !h || T;
            var P = H && !o(a, !!A, r, n);
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
  var Za = null;
  var Ga = function createSizeObserver(r, a, n) {
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
        if (!O(Za)) {
          var f = new g(_r);
          f.observe(r, {
            get box() {
              Za = true;
            }
          });
          Za = Za || false;
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
        d.observe(Za ? r : o);
        L(e, [ function() {
          d.disconnect();
        }, !Za && Nr(r, t) ]);
        if (Za) {
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
  var $a = function createTrinsicObserver(r, a) {
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
        L(e, Ga(i, a)());
        a();
      }
      return vr(N, L(e, Nr(r, i)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var Ja = function createObserversSetup(r, a, n, t) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var f;
    var l = "[" + Ue + "]";
    var s = "[" + Ye + "]";
    var d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var p = r._r, _ = r.gr, h = r.F, b = r.hr, m = r.br, S = r.R, w = r.mr, O = r.Sr, E = r.yr, T = r.wr;
    var A = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var H = {
      Or: false,
      B: A(p)
    };
    var P = Ya();
    var D = He(Da);
    var z = e({
      v: nr,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = D && D.V(r, a, H, P, n).Z;
      var t = w && S;
      var i = !t && Er(_, Ue, je);
      var v = !S && O(Ze);
      var o = v && he(b);
      var u = o && T();
      var c = E(Ge, i);
      var f = v && e && e();
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
    var k = function setDirection(r) {
      var e = A(p);
      sr(r, {
        Cr: f !== e
      });
      sr(H, {
        B: e
      });
      f = e;
    };
    var V = function onTrinsicChanged(r, e) {
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
      k(v);
      i(v);
    };
    var F = function onContentMutation(r, e) {
      var a = M(), n = a[1];
      var i = {
        Tr: n
      };
      k(i);
      var v = r ? t : L;
      if (n && !e) {
        v(i);
      }
      return i;
    };
    var N = function onHostMutation(r, e, a) {
      var n = {
        Ar: e
      };
      k(n);
      if (e && !a) {
        L(n);
      }
      return n;
    };
    var j = m ? $a(_, V) : [], q = j[0], U = j[1];
    var B = !S && Ga(_, R, {
      dr: true
    });
    var Y = Xa(_, false, N, {
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
        Tr: e,
        pr: w
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
      var E = e("update.debounce"), T = E[0], A = E[1];
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
        var z = Xa(m || h, true, F, {
          ir: I(d, _ || []),
          ur: w,
          cr: l,
          sr: function _ignoreContentChange(r, e) {
            var a = r.target, n = r.attributeName;
            var t = !e && n && !S ? Rr(a, l, s) : false;
            return t || !!kr(a, "." + ca) || !!D(r);
          }
        }), M = z[0], R = z[1];
        u = M();
        o = R;
      }
      if (A) {
        L.O();
        if (x(T)) {
          var j = T[0];
          var q = T[1];
          i = y(j) && j;
          v = y(q) && q;
        } else if (y(T)) {
          i = T;
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
          sr(t, V(Y[0], P));
        }
        if (W) {
          sr(t, F(W[0], P));
        }
      }
      k(t);
      return t;
    }, H ];
  };
  var Ka = function resolveInitialization(r, e) {
    return C(e) ? e.apply(0, r) : e;
  };
  var Qa = function staticInitializationElement(r, e, a, n) {
    var t = b(n) ? a : n;
    var i = Ka(r, t);
    return i || e.apply(0, r);
  };
  var rn = function dynamicInitializationElement(r, e, a, n) {
    var t = b(n) ? a : n;
    var i = Ka(r, t);
    return !!i && (H(i) ? i : e.apply(0, r));
  };
  var en = function cancelInitialization(r, e) {
    var a = e || {}, n = a.nativeScrollbarsOverlaid, t = a.body;
    var i = Ya(), v = i.k, o = i.N, u = i.K;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = n != null ? n : f;
    var d = b(t) ? l : t;
    var p = (v.x || v.y) && s;
    var _ = r && (m(d) ? !o : d);
    return !!p || !!_;
  };
  var an = function createScrollbarsSetupElements(r, e, a, n) {
    var t = "--os-viewport-percent";
    var i = "--os-scroll-percent";
    var v = "--os-scroll-direction";
    var o = Ya(), u = o.K;
    var c = u(), f = c.scrollbars;
    var l = f.slot;
    var s = e._r, d = e.gr, p = e.F, _ = e.Mr, g = e.hr, b = e.mr, m = e.R;
    var S = _ ? {} : r, y = S.scrollbars;
    var w = y || {}, C = w.slot;
    var x = [];
    var E = [];
    var T = [];
    var A = rn([ s, d, p ], (function() {
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
          kr: v
        };
      }
    };
    var P = {
      x: H("x"),
      y: H("y")
    };
    var D = function getViewportPercent() {
      var r = a.Vr, e = a.Rr;
      var n = function getAxisValue(r, e) {
        return gr(0, 1, r / (r + e) || 0);
      };
      return {
        x: n(e.x, r.x),
        y: n(e.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, e, a) {
      var n = a ? Hr : Ar;
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
        z(T, r, e);
      }
    };
    var k = function refreshScrollbarsHandleLength() {
      var r = D();
      var e = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Fr, (a = {}, a[t] = Gr(r) + "", a) ];
        };
      };
      M(E, e(r.x));
      M(T, e(r.y));
    };
    var V = function refreshScrollbarsHandleOffset() {
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
        M(T, n(e.y));
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
      M(T, n(e.y));
      if (h) {
        E.forEach(P.x.kr);
        T.forEach(P.y.kr);
      }
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !b) {
        var r = a.Vr, e = a.Ir;
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
        M(T, i);
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
      L(r ? E : T, o);
      L(x, [ Nr(t, i), Nr(i, v), vr(Fr, t), u && u.kr(o), n(o, I, r) ]);
      return o;
    };
    var q = vr(j, true);
    var U = vr(j, false);
    var B = function appendElements() {
      Nr(A, E[0].Fr);
      Nr(A, T[0].Fr);
      return vr(N, x);
    };
    q();
    U();
    return [ {
      jr: k,
      qr: V,
      Ur: R,
      Br: F,
      Yr: I,
      Wr: {
        Xr: E,
        Zr: q,
        Gr: vr(M, E)
      },
      $r: {
        Xr: T,
        Zr: U,
        Gr: vr(M, T)
      }
    }, B ];
  };
  var nn = function createScrollbarsSetupEvents(r, e, a, n) {
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
      var T = function createInteractiveScrollEvents() {
        var e = "pointerup pointercancel lostpointercapture";
        var n = "client" + (u ? "X" : "Y");
        var t = u ? $ : J;
        var i = u ? "left" : "top";
        var c = u ? "w" : "h";
        var f = u ? "x" : "y";
        var l = function createRelativeHandleMove(r, e) {
          return function(n) {
            var t;
            var i = a.Vr;
            var v = ne(h)[c] - ne(b)[c];
            var o = e * n / v;
            var u = o * i[f];
            ge(d, (t = {}, t[f] = r + u, t));
          };
        };
        var s = [];
        return se(h, "pointerdown", (function(a) {
          var u = kr(a.target, "." + pa) === b;
          var g = u ? b : h;
          var m = r.scrollbars;
          var S = m[u ? "dragScroll" : "clickScroll"];
          var y = a.button, w = a.isPrimary, C = a.pointerType;
          var T = m.pointers;
          var A = y === 0 && w && S && (T || []).includes(C);
          if (A) {
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
            var k = a[n];
            var V = P();
            var R = D();
            var F = V[t];
            var j = z(V, R) + F / 2;
            var q = k - R[i];
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
              return I(U + (r[n] - k));
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
              var Z = He(Ma);
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
      var A = true;
      return vr(N, [ se(b, "pointermove pointerleave", n), se(g, "pointerenter", (function() {
        i(ha, true);
      })), se(g, "pointerleave pointercancel", (function() {
        i(ha, false);
      })), !s && se(g, "mousedown", (function() {
        var r = Vr();
        if (mr(r, Ye) || mr(r, Ue) || r === document.body) {
          l(vr(we, f), 25);
        }
      })), se(g, "wheel", (function(r) {
        var e = r.deltaX, a = r.deltaY, n = r.deltaMode;
        if (A && n === 0 && Lr(g) === c) {
          E({
            x: e,
            y: a
          });
        }
        A = false;
        i(ya, true);
        S((function() {
          A = true;
          i(ya);
        }));
        pe(r);
      }), {
        H: false,
        P: true
      }), se(g, "pointerdown", (function() {
        var r = se(p, "click", (function(r) {
          e();
          _e(r);
        }), {
          D: true,
          P: true,
          H: false
        });
        var e = se(p, "pointerup pointercancel", (function() {
          e();
          setTimeout(r, 150);
        }), {
          P: true,
          H: true
        });
      }), {
        P: true,
        H: true
      }), T(), y, x ]);
    };
  };
  var tn = function createScrollbarsSetup(r, e, a, n, t, i) {
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
    var T = an(r, t, n, nn(e, t, n, (function(r) {
      return p(r) && j();
    }))), A = T[0], H = T[1];
    var P = t.gr, D = t.Kr, z = t.mr;
    var M = A.Yr, I = A.jr, k = A.qr, V = A.Ur, R = A.Br;
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
        k();
        j();
      }));
      i(r);
      R();
    })) ];
    var Y = He(Da);
    return [ function() {
      return vr(N, L(B, H()));
    }, function(r) {
      var e = r.Pr, t = r.zr, i = r.Qr, v = r.re;
      var d = v || {}, p = d.ee, _ = d.ae, g = d.ne, h = d.te;
      var b = i || {}, m = b.Cr, S = b.dr;
      var y = a.B;
      var O = Ya(), C = O.k, x = O.N;
      var E = n.ie, T = n.W;
      var A = e("showNativeOverlaidScrollbars"), H = A[0], P = A[1];
      var L = e("scrollbars.theme"), N = L[0], j = L[1];
      var U = e("scrollbars.visibility"), B = U[0], W = U[1];
      var X = e("scrollbars.autoHide"), Z = X[0], G = X[1];
      var $ = e("scrollbars.autoHideSuspend"), J = $[0], Q = $[1];
      var er = e("scrollbars.autoHideDelay"), ar = er[0];
      var nr = e("scrollbars.dragScroll"), tr = nr[0], ir = nr[1];
      var or = e("scrollbars.clickScroll"), ur = or[0], cr = or[1];
      var fr = e("overflow"), lr = fr[0], sr = fr[1];
      var dr = S && !t;
      var pr = T.x || T.y;
      var _r = p || _ || h || m || t;
      var gr = g || W || sr;
      var hr = H && C.x && C.y;
      var br = !x && !Y;
      var mr = hr || br;
      var Sr = function setScrollbarVisibility(r, e, a) {
        var n = r.includes(rr) && (B === K || B === "auto" && e === rr);
        M(_a, n, a);
        return n;
      };
      s = ar;
      if (dr) {
        if (J && pr) {
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
      if (P || br) {
        M(ua, mr);
      }
      if (j) {
        M(f);
        M(N, true);
        f = N;
      }
      if (Q && !J) {
        q(true);
      }
      if (G) {
        o = Z === "move";
        u = Z === "leave";
        c = Z === "never";
        F(c, true);
      }
      if (ir) {
        M(Oa, tr);
      }
      if (cr) {
        M(wa, !!ur);
      }
      if (gr) {
        var yr = Sr(lr.x, E.x, true);
        var wr = Sr(lr.y, E.y, false);
        var Or = yr && wr;
        M(ga, !Or);
      }
      if (_r) {
        k();
        I();
        R();
        if (h) {
          V();
        }
        M(ba, !T.x, true);
        M(ba, !T.y, false);
        M(fa, y && !z);
      }
    }, {}, A ];
  };
  var vn = function createStructureSetupElements(r) {
    var e = Ya();
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
    var w = vr(Qa, [ h ]);
    var O = vr(rn, [ h ]);
    var C = vr(Br, "");
    var x = vr(w, C, u);
    var E = vr(O, C, c);
    var T = function elementHasOverflow(r) {
      var e = ne(r);
      var a = ie(r);
      var n = getStyles(r, Z);
      var t = getStyles(r, G);
      return a.w - e.w > 0 && !Ta(n) || a.h - e.h > 0 && !Ta(t);
    };
    var A = x(_);
    var P = A === h;
    var D = P && b;
    var z = !P && E(g);
    var I = !P && A === z;
    var k = D ? S : A;
    var V = D ? k : h;
    var R = !P && O(C, o, p);
    var F = !I && z;
    var j = [ F, k, R, V ].map((function(r) {
      return H(r) && !Lr(r) && r;
    }));
    var q = function elementIsGenerated(r) {
      return r && M(j, r);
    };
    var U = !q(k) && T(k) ? k : h;
    var B = D ? S : k;
    var Y = D ? m : k;
    var W = {
      _r: h,
      gr: V,
      F: k,
      ve: R,
      br: F,
      hr: B,
      Kr: Y,
      oe: b ? S : U,
      Jr: m,
      mr: b,
      Mr: f,
      R: P,
      ue: y,
      Sr: function _viewportHasClass(r) {
        return Er(k, Ye, r);
      },
      yr: function _viewportAddRemoveClass(r, e) {
        return xr(k, Ye, r, e);
      },
      wr: function _removeScrollObscuringStyles() {
        return xr(B, Ye, $e, true);
      }
    };
    var X = W._r, $ = W.gr, J = W.ve, K = W.F, Q = W.br;
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
      var e = Vr();
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
        var r = Vr();
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
  var on = function createTrinsicUpdateSegment(r) {
    var e = r.br;
    return function(r) {
      var a = r.Qr, n = r.ce, t = r.zr;
      var i = a || {}, v = i.Er;
      var o = n.Or;
      var u = e && (v || t);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var un = function createPaddingUpdateSegment(r, a) {
    var n = r.gr, t = r.ve, i = r.F, v = r.R;
    var o = e({
      v: ir,
      i: Jr()
    }, vr(Jr, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Pr, n = r.Qr, o = r.ce, f = r.zr;
      var l = c(f), s = l[0], d = l[1];
      var p = Ya(), _ = p.N;
      var g = n || {}, h = g.pr, b = g.Tr, m = g.Cr;
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
        var T, A;
        var H = !w || !t && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (T = {}, T[W] = H && !S ? -P : 0, T[X] = H ? -D : 0, T[Y] = H && S ? -P : 0, 
        T.top = H ? -s.t : 0, T.right = H ? S ? -s.r : "auto" : 0, T.left = H ? S ? "auto" : -s.l : 0, 
        T[$] = H && "calc(100% + " + P + "px)", T);
        var M = (A = {}, A[j] = H ? s.t : 0, A[q] = H ? s.r : 0, A[B] = H ? s.b : 0, A[U] = H ? s.l : 0, 
        A);
        setStyles(t || i, z);
        setStyles(i, M);
        sr(a, {
          ve: s,
          fe: !H,
          Y: t ? M : sr({}, z, M)
        });
      }
      return {
        le: E
      };
    };
  };
  var cn = function createOverflowUpdateSegment(r, a) {
    var i = Ya();
    var v = r.gr, o = r.ve, u = r.F, c = r.R, l = r.Kr, s = r.hr, d = r.mr, p = r.yr, _ = r.ue;
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
        var t = r === K ? Q : Aa(r);
        var i = Ta(r);
        var v = Ta(a);
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
    var T = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ K, Q, rr ].map((function(e) {
          return $(Ha(e), r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      p(a);
      p(lr(r).map((function(e) {
        return $(r[e], e === "x");
      })).join(" "), true);
    };
    var A = e(y, vr(ve, u)), H = A[0], P = A[1];
    var D = e(y, vr(ie, u)), z = D[0], M = D[1];
    var I = e(y), L = I[0], k = I[1];
    var V = e(w), R = V[0];
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
    }), X = W[0], Z = W[1];
    var G = He(Da);
    var $ = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? We : Xe;
      return "" + a + er(r);
    };
    return function(e, n) {
      var t = e.Pr, c = e.Qr, f = e.ce, l = e.zr;
      var s = n.le;
      var d = c || {}, m = d.pr, S = d.Ar, y = d.Tr, w = d.Cr, A = d.dr, D = d.Hr;
      var I = G && G.V(r, a, f, i, t);
      var V = I || {}, F = V.X, q = V.Z, B = V.G;
      var W = Ea(t, i), $ = W[0], J = W[1];
      var K = t("overflow"), Q = K[0], rr = K[1];
      var er = Ta(Q.x);
      var ar = Ta(Q.y);
      var nr = m || s || y || w || D || J;
      var tr = P(l);
      var ir = M(l);
      var vr = k(l);
      var or = j(l);
      if (J && g) {
        p(Je, !$);
      }
      if (nr) {
        if (Er(v, Ue, je)) {
          O(true);
        }
        var ur = q && q();
        var cr = tr = H(l), fr = cr[0];
        var lr = ir = z(l), dr = lr[0];
        var pr = te(u);
        var _r = h && ae(_());
        var gr = {
          w: b(dr.w + fr.w),
          h: b(dr.h + fr.h)
        };
        var hr = {
          w: b((_r ? _r.w : pr.w + b(pr.w - dr.w)) + fr.w),
          h: b((_r ? _r.h : pr.h + b(pr.h - dr.h)) + fr.h)
        };
        if (ur) {
          ur();
        }
        or = N(hr);
        vr = L(x(gr, hr), l);
      }
      var br = or, mr = br[0], Sr = br[1];
      var yr = vr, wr = yr[0], Or = yr[1];
      var Cr = ir, Tr = Cr[0], Ar = Cr[1];
      var Hr = tr, Pr = Hr[0], Dr = Hr[1];
      var zr = R({
        x: wr.w > 0,
        y: wr.h > 0
      }), Mr = zr[0], Ir = zr[1];
      var Lr = er && ar && (Mr.x || Mr.y) || er && Mr.x && !Mr.y || ar && Mr.y && !Mr.x;
      var kr = s || w || D || Dr || Ar || Sr || Or || rr || J || nr || S && h;
      var Vr = Y(l), Rr = Vr[0], Fr = Vr[1];
      var Nr = w || A || Fr || Ir || l;
      var jr = Nr ? X(C(Rr), l) : Z(), qr = jr[0], Ur = jr[1];
      var Br = E(Mr, Q);
      O(false);
      if (kr) {
        T(Br);
        Br = Pa(u, Mr);
        if (B && F) {
          F(Br, Tr, Pr);
          setStyles(u, B(Br));
        }
      }
      var Yr = U(Br), Wr = Yr[0], Xr = Yr[1];
      xr(v, Ue, je, Lr);
      xr(o, Qe, je, Lr);
      sr(a, {
        ie: Wr,
        Rr: {
          x: mr.w,
          y: mr.h
        },
        Vr: {
          x: wr.w,
          y: wr.h
        },
        W: Mr,
        Ir: me(qr, wr)
      });
      return {
        ne: Xr,
        ee: Sr,
        ae: Or,
        te: Ur || Or
      };
    };
  };
  var fn = function createStructureSetup(r) {
    var e;
    var a = vn(r), n = a[0], t = a[1], i = a[2];
    var v = {
      ve: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      fe: false,
      Y: (e = {}, e[W] = 0, e[X] = 0, e[Y] = 0, e[j] = 0, e[q] = 0, e[B] = 0, e[U] = 0, 
      e),
      Rr: {
        x: 0,
        y: 0
      },
      Vr: {
        x: 0,
        y: 0
      },
      ie: {
        x: Q,
        y: Q
      },
      W: {
        x: false,
        y: false
      },
      Ir: be()
    };
    var o = n._r, u = n.hr, c = n.R, f = n.wr;
    var l = Ya(), s = l.N, d = l.k;
    var p = !s && (d.x || d.y);
    var _ = [ on(n), un(n, v), cn(n, v) ];
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
  var ln = function createSetups(r, e, a, n, t) {
    var i = false;
    var v = Fa(e, {});
    var o = fn(r), u = o[0], c = o[1], f = o[2], l = o[3], s = o[4];
    var d = Ja(l, f, v, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = tn(r, e, g, f, l, t), b = h[0], m = h[1], S = h[3];
    var y = function updateHintsAreTruthy(r) {
      return lr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var w = function update(r, t) {
      if (a()) {
        return false;
      }
      var v = r.se, o = r.zr, u = r.Dr, f = r.de;
      var l = v || {};
      var s = !!o || !i;
      var d = {
        Pr: Fa(e, l, s),
        se: l,
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
        ce: g,
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
      var r = l.oe, e = l.hr, a = l.wr;
      var n = he(r);
      var t = [ p(), u(), b() ];
      var i = a();
      ge(e, n);
      i();
      return vr(N, t);
    }, w, function() {
      return {
        pe: g,
        _e: f
      };
    }, {
      ge: l,
      he: S
    }, s ];
  };
  var sn = new WeakMap;
  var dn = function addInstance(r, e) {
    sn.set(r, e);
  };
  var pn = function removeInstance(r) {
    sn.delete(r);
  };
  var _n = function getInstance(r) {
    return sn.get(r);
  };
  var gn = function OverlayScrollbars(r, e, a) {
    var n = Ya(), t = n.er;
    var i = H(r);
    var v = i ? r : r.target;
    var o = _n(v);
    if (e && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var e = dr(r);
        var a = He(ke);
        return a ? a(e, true) : e;
      };
      var s = sr({}, t(), l(e));
      var d = Ce(), p = d[0], _ = d[1], g = d[2];
      var h = Ce(a), b = h[0], m = h[1], S = h[2];
      var y = function triggerEvent(r, e) {
        S(r, e);
        g(r, e);
      };
      var w = ln(r, s, (function() {
        return u;
      }), (function(r, e) {
        var a = r.se, n = r.zr;
        var t = e.Qr, i = e.re;
        var v = t.pr, o = t.Cr, u = t.Er, c = t.Tr, f = t.Ar, l = t.dr;
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
      })), O = w[0], C = w[1], x = w[2], E = w[3], T = w[4];
      var A = function destroy(r) {
        pn(v);
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
            var n = Ra(s, sr(a, l(r)));
            if (!pr(n)) {
              sr(s, n);
              C({
                se: n
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
          var r = x(), e = r.pe, a = r._e;
          var n = e.B;
          var t = a.Rr, i = a.Vr, v = a.ie, o = a.W, c = a.ve, f = a.fe, l = a.Ir;
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
          var r = E.ge, e = r._r, a = r.gr, n = r.ve, t = r.F, i = r.br, v = r.hr, o = r.Kr;
          var u = E.he, c = u.Wr, f = u.$r;
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
                  de: true
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
        destroy: vr(A, false),
        plugin: function plugin(r) {
          return f[lr(r)[0]];
        }
      };
      L(c, [ T ]);
      dn(v, P);
      Ae(xe, gn, [ P, p, f ]);
      if (en(E.ge.mr, !i && r.cancel)) {
        A(true);
        return P;
      }
      L(c, O());
      y("initialized", [ P ]);
      P.update();
      return P;
    }
    return o;
  };
  gn.plugin = function(r) {
    var e = x(r);
    var a = e ? r : [ r ];
    var n = a.map((function(r) {
      return Ae(r, gn)[0];
    }));
    Te(a);
    return e ? n : n[0];
  };
  gn.valid = function(r) {
    var e = r && r.elements;
    var a = C(e) && e();
    return A(a) && !!_n(a.target);
  };
  gn.env = function() {
    var r = Ya(), e = r.j, a = r.k, n = r.N, t = r.$, i = r.nr, v = r.tr, o = r.K, u = r.rr, c = r.er, f = r.ar;
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
  gn.nonce = qa;
  gn.trustedTypePolicy = Ur;
  r.ClickScrollPlugin = Ia;
  r.OverlayScrollbars = gn;
  r.ScrollbarsHidingPlugin = za;
  r.SizeObserverPlugin = xa;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
