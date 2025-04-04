/*!
 * OverlayScrollbars
 * Version: 2.11.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var a = function createCache(r, a) {
    var e = r.v, t = r.i, n = r.o;
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
  var e = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  var t = e ? window : {};
  var n = Math.max;
  var v = Math.min;
  var i = Math.round;
  var o = Math.abs;
  var u = Math.sign;
  var c = t.cancelAnimationFrame;
  var l = t.requestAnimationFrame;
  var f = t.setTimeout;
  var s = t.clearTimeout;
  var d = function getApi(r) {
    return typeof t[r] !== "undefined" ? t[r] : void 0;
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
  var y = function type(r) {
    return b(r) || m(r) ? "" + r : Object.prototype.toString.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  };
  var S = function isNumber(r) {
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
    var a = !!r && r.length;
    var e = S(a) && a > -1 && a % 1 == 0;
    return x(r) || !C(r) && e ? a > 0 && E(r) ? a - 1 in r : true : false;
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
  var z = function animateNumber(r, a, e, t, v) {
    var i = 0;
    var o = D();
    var u = n(0, e);
    var f = function frame(e) {
      var c = D();
      var s = c - o;
      var d = s >= u;
      var p = e ? 1 : 1 - (n(0, o + u - c) / u || 0);
      var _ = (a - r) * (C(v) ? v(p, p * u, 0, 1, u) : p) + r;
      var g = d || p === 1;
      t && t(_, p, g);
      i = g ? 0 : l((function() {
        return f();
      }));
    };
    f();
    return function(r) {
      c(i);
      r && f(r);
    };
  };
  function each(r, a) {
    if (A(r)) {
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
  var M = function inArray(r, a) {
    return r.indexOf(a) >= 0;
  };
  var I = function concat(r, a) {
    return r.concat(a);
  };
  var L = function push(r, a, e) {
    !w(a) && A(a) ? Array.prototype.push.apply(r, a) : r.push(a);
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
  var N = function runEachAndClear(r, a, e) {
    var t = function runFn(r) {
      return r ? r.apply(void 0, a || []) : true;
    };
    each(r, t);
    !e && (r.length = 0);
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
  var ar = function capitalizeFirstLetter(r) {
    var a = String(r || "");
    return a ? a[0].toUpperCase() + a.slice(1) : "";
  };
  var er = function equal(r, a, e, t) {
    if (r && a) {
      var n = true;
      each(e, (function(e) {
        var t = r[e];
        var v = a[e];
        if (t !== v) {
          n = false;
        }
      }));
      return n;
    }
    return false;
  };
  var tr = function equalWH(r, a) {
    return er(r, a, [ "w", "h" ]);
  };
  var nr = function equalXY(r, a) {
    return er(r, a, [ "x", "y" ]);
  };
  var vr = function equalTRBL(r, a) {
    return er(r, a, [ "t", "r", "b", "l" ]);
  };
  var ir = function noop() {};
  var or = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var ur = function selfClearTimeout(r) {
    var a;
    var e = r ? f : l;
    var t = r ? s : c;
    return [ function(n) {
      t(a);
      a = e((function() {
        return n();
      }), C(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var cr = function debounce(r, a) {
    var e = a || {}, t = e.u, n = e.p, v = e._, i = e.m;
    var o;
    var u;
    var d;
    var p;
    var _ = ir;
    var g = function invokeFunctionToDebounce(a) {
      _();
      s(o);
      p = o = u = void 0;
      _ = ir;
      r.apply(this, a);
    };
    var h = function mergeParms(r) {
      return i && u ? i(u, r) : r;
    };
    var b = function flush() {
      if (_ !== ir) {
        g(h(d) || d);
      }
    };
    var m = function debouncedFn() {
      var r = V(arguments);
      var a = C(t) ? t() : t;
      var e = S(a) && a >= 0;
      if (e) {
        var i = C(n) ? n() : n;
        var m = S(i) && i >= 0;
        var y = a > 0 ? f : l;
        var w = a > 0 ? s : c;
        var O = h(r);
        var x = O || r;
        var E = g.bind(0, x);
        var A;
        _();
        if (v && !p) {
          E();
          p = true;
          A = y((function() {
            return p = void 0;
          }), a);
        } else {
          A = y(E, a);
          if (m && !o) {
            o = f(b, i);
          }
        }
        _ = function clear() {
          return w(A);
        };
        u = d = x;
      } else {
        g(r);
      }
    };
    m.S = b;
    return m;
  };
  var lr = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var fr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var sr = function assignDeep(r, a, e, t, n, v, i) {
    var o = [ a, e, t, n, v, i ];
    if ((typeof r !== "object" || m(r)) && !C(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, t) {
        var n = a[t];
        if (r === n) {
          return true;
        }
        var v = x(n);
        if (n && T(n)) {
          var i = r[t];
          var o = i;
          if (v && !x(i)) {
            o = [];
          } else if (!v && !T(i)) {
            o = {};
          }
          r[t] = sr(o, n);
        } else {
          r[t] = v ? n.slice() : n;
        }
      }));
    }));
    return r;
  };
  var dr = function removeUndefinedProperties(r, a) {
    return each(sr({}, r), (function(r, a, e) {
      if (r === void 0) {
        delete e[a];
      } else if (r && T(r)) {
        e[a] = dr(r);
      }
    }));
  };
  var pr = function isEmptyObject(r) {
    return !fr(r).length;
  };
  var _r = function capNumber(r, a, e) {
    return n(r, v(a, e));
  };
  var gr = function getDomTokensArray(r) {
    return F((x(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    })));
  };
  var hr = function getAttr(r, a) {
    return r && r.getAttribute(a);
  };
  var br = function hasAttr(r, a) {
    return r && r.hasAttribute(a);
  };
  var mr = function setAttrs(r, a, e) {
    each(gr(a), (function(a) {
      r && r.setAttribute(a, String(e || ""));
    }));
  };
  var yr = function removeAttrs(r, a) {
    each(gr(a), (function(a) {
      return r && r.removeAttribute(a);
    }));
  };
  var Sr = function domTokenListAttr(r, a) {
    var e = gr(hr(r, a));
    var t = or(mr, r, a);
    var n = function domTokenListOperation(r, a) {
      var t = new Set(e);
      each(gr(r), (function(r) {
        t[a](r);
      }));
      return V(t).join(" ");
    };
    return {
      O: function _remove(r) {
        return t(n(r, "delete"));
      },
      C: function _add(r) {
        return t(n(r, "add"));
      },
      A: function _has(r) {
        var a = gr(r);
        return a.reduce((function(r, a) {
          return r && e.includes(a);
        }), a.length > 0);
      }
    };
  };
  var wr = function removeAttrClass(r, a, e) {
    Sr(r, a).O(e);
    return or(Or, r, a, e);
  };
  var Or = function addAttrClass(r, a, e) {
    Sr(r, a).C(e);
    return or(wr, r, a, e);
  };
  var Cr = function addRemoveAttrClass(r, a, e, t) {
    return (t ? Or : wr)(r, a, e);
  };
  var xr = function hasAttrClass(r, a, e) {
    return Sr(r, a).A(e);
  };
  var Er = function createDomTokenListClass(r) {
    return Sr(r, "class");
  };
  var Ar = function removeClass(r, a) {
    Er(r).O(a);
  };
  var Tr = function addClass(r, a) {
    Er(r).C(a);
    return or(Ar, r, a);
  };
  var Hr = function find(r, a) {
    var e = a ? P(a) && a : document;
    return e ? V(e.querySelectorAll(r)) : [];
  };
  var Pr = function findFirst(r, a) {
    var e = a ? P(a) && a : document;
    return e && e.querySelector(r);
  };
  var Dr = function is(r, a) {
    return P(r) && r.matches(a);
  };
  var zr = function isBodyElement(r) {
    return Dr(r, "body");
  };
  var Mr = function contents(r) {
    return r ? V(r.childNodes) : [];
  };
  var Ir = function parent(r) {
    return r && r.parentElement;
  };
  var Lr = function closest(r, a) {
    return P(r) && r.closest(a);
  };
  var Vr = function getFocusedElement(r) {
    return document.activeElement;
  };
  var kr = function liesBetween(r, a, e) {
    var t = Lr(r, a);
    var n = r && Pr(e, t);
    var v = Lr(n, a) === t;
    return t && n ? t === r || n === r || v && Lr(Lr(r, e), a) !== t : false;
  };
  var Rr = function removeElements(r) {
    each(k(r), (function(r) {
      var a = Ir(r);
      r && a && a.removeChild(r);
    }));
  };
  var Fr = function appendChildren(r, a) {
    return or(Rr, r && a && each(k(a), (function(a) {
      a && r.appendChild(a);
    })));
  };
  var Nr;
  var jr = function getTrustedTypePolicy() {
    return Nr;
  };
  var qr = function setTrustedTypePolicy(r) {
    Nr = r;
  };
  var Ur = function createDiv(r) {
    var a = document.createElement("div");
    mr(a, "class", r);
    return a;
  };
  var Br = function createDOM(r) {
    var a = Ur();
    var e = jr();
    var t = r.trim();
    a.innerHTML = e ? e.createHTML(t) : t;
    return each(Mr(a), (function(r) {
      return Rr(r);
    }));
  };
  var Yr = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var Wr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Xr = function parseToZeroOrNumber(r) {
    return Wr(parseFloat(r || ""));
  };
  var Zr = function roundCssNumber(r) {
    return Math.round(r * 1e4) / 1e4;
  };
  var Gr = function numberToCssPx(r) {
    return Zr(Wr(r)) + "px";
  };
  function setStyles(r, a) {
    r && a && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = m(a) || O(a) ? "" : S(a) ? Gr(a) : a;
        if (e.indexOf("--") === 0) {
          t.setProperty(e, n);
        } else {
          t[e] = n;
        }
      } catch (v) {}
    }));
  }
  function getStyles(r, a, e) {
    var n = w(a);
    var v = n ? "" : {};
    if (r) {
      var i = t.getComputedStyle(r, e) || r.style;
      v = n ? Yr(i, a) : V(a).reduce((function(r, a) {
        r[a] = Yr(i, a);
        return r;
      }), v);
    }
    return v;
  }
  var $r = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Xr(c[v]),
      r: Xr(c[i]),
      b: Xr(c[o]),
      l: Xr(c[u])
    };
  };
  var Jr = function getTrasformTranslateValue(r, a) {
    return "translate" + (E(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var Kr = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var Qr = {
    w: 0,
    h: 0
  };
  var ra = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : Qr;
  };
  var aa = function getWindowSize(r) {
    return ra("inner", r || t);
  };
  var ea = or(ra, "offset");
  var ta = or(ra, "client");
  var na = or(ra, "scroll");
  var va = function getFractionalSize(r) {
    var a = parseFloat(getStyles(r, $)) || 0;
    var e = parseFloat(getStyles(r, J)) || 0;
    return {
      w: a - i(a),
      h: e - i(e)
    };
  };
  var ia = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var oa = function hasDimensions(r) {
    return !!r && Kr(r);
  };
  var ua = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var ca = function domRectAppeared(r, a) {
    var e = ua(r);
    var t = ua(a);
    return !t && e;
  };
  var la = function removeEventListener(r, a, e, t) {
    each(gr(a), (function(a) {
      r && r.removeEventListener(a, e, t);
    }));
  };
  var fa = function addEventListener(r, a, e, t) {
    var n;
    var v = (n = t && t.T) != null ? n : true;
    var i = t && t.H || false;
    var o = t && t.P || false;
    var u = {
      passive: v,
      capture: i
    };
    return or(N, gr(a).map((function(a) {
      var t = o ? function(n) {
        la(r, a, t, i);
        e && e(n);
      } : e;
      r && r.addEventListener(a, t, u);
      return or(la, r, a, t, i);
    })));
  };
  var sa = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var da = function preventDefault(r) {
    return r.preventDefault();
  };
  var pa = function stopAndPrevent(r) {
    return sa(r) || da(r);
  };
  var _a = function scrollElementTo(r, a) {
    var e = S(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    S(t) && (r.scrollLeft = t);
    S(n) && (r.scrollTop = n);
  };
  var ga = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var ha = function getZeroScrollCoordinates() {
    return {
      D: {
        x: 0,
        y: 0
      },
      M: {
        x: 0,
        y: 0
      }
    };
  };
  var ba = function sanitizeScrollCoordinates(r, a) {
    var e = r.D, t = r.M;
    var n = a.w, v = a.h;
    var i = function sanitizeAxis(r, a, e) {
      var t = u(r) * e;
      var n = u(a) * e;
      if (t === n) {
        var v = o(r);
        var i = o(a);
        n = v > i ? 0 : n;
        t = v < i ? 0 : t;
      }
      t = t === n ? 0 : t;
      return [ t + 0, n + 0 ];
    };
    var c = i(e.x, t.x, n), l = c[0], f = c[1];
    var s = i(e.y, t.y, v), d = s[0], p = s[1];
    return {
      D: {
        x: l,
        y: d
      },
      M: {
        x: f,
        y: p
      }
    };
  };
  var ma = function isDefaultDirectionScrollCoordinates(r) {
    var a = r.D, e = r.M;
    var t = function getAxis(r, a) {
      return r === 0 && r <= a;
    };
    return {
      x: t(a.x, e.x),
      y: t(a.y, e.y)
    };
  };
  var ya = function getScrollCoordinatesPercent(r, a) {
    var e = r.D, t = r.M;
    var n = function getAxis(r, a, e) {
      return _r(0, 1, (r - e) / (r - a) || 0);
    };
    return {
      x: n(e.x, t.x, a.x),
      y: n(e.y, t.y, a.y)
    };
  };
  var Sa = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true
      });
    }
  };
  var wa = function manageListener(r, a) {
    each(k(a), r);
  };
  var Oa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        wa((function(r) {
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
    var t = function addEvent(r, n) {
      if (w(r)) {
        var v = a.get(r) || new Set;
        a.set(r, v);
        wa((function(r) {
          C(r) && v.add(r);
        }), n);
        return or(e, r, n);
      }
      if (O(n) && n) {
        e();
      }
      var i = fr(r);
      var o = [];
      each(i, (function(a) {
        var e = r[a];
        e && L(o, t(a, e));
      }));
      return or(N, o);
    };
    var n = function triggerEvent(r, e) {
      each(V(a.get(r)), (function(r) {
        if (e && !R(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var Ca = {};
  var xa = {};
  var Ea = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        Ca[e] = r[e];
      }));
    }));
  };
  var Aa = function registerPluginModuleInstances(r, a, e) {
    return fr(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], c = o[1], l = o[2];
      var f = e ? i : v;
      if (f) {
        var s = e ? f(u, c, a) : f(a);
        return (l || xa)[t] = s;
      }
    }));
  };
  var Ta = function getStaticPluginModuleInstance(r) {
    return xa[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.I && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Ha = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      return r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var a = 1; a < arguments.length; a++) {
          var e = arguments[a];
          for (var t in e) {
            ({}).hasOwnProperty.call(e, t) && (r[t] = e[t]);
          }
        }
        return r;
      }, r.exports.I = true, r.exports["default"] = r.exports, _extends.apply(null, arguments);
    }
    r.exports = _extends, r.exports.I = true, r.exports["default"] = r.exports;
  })(Ha);
  var Pa = Ha.exports;
  var Da = /*@__PURE__*/ getDefaultExportFromCjs(Pa);
  var za = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ma = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = Da({}, a);
    var i = fr(r).filter((function(r) {
      return lr(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var u = r[i];
      var c = T(u);
      var l = t ? t + "." : "";
      if (c && T(o)) {
        var f = Ma(u, o, e, l + i), s = f[0], d = f[1];
        n[i] = s;
        v[i] = d;
        each([ v, n ], (function(r) {
          if (pr(r[i])) {
            delete r[i];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var g = [];
        var h = y(o);
        var m = k(u);
        each(m, (function(r) {
          var a;
          each(za, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = b(a);
          if (e && w(o)) {
            var t = r.split(" ");
            p = !!t.find((function(r) {
              return r === o;
            }));
            L(_, t);
          } else {
            p = za[h] === r;
          }
          L(g, e ? za.string : a);
          return !p;
        }));
        if (p) {
          n[i] = o;
        } else if (e) {
          console.warn('The option "' + l + i + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var Ia = function validateOptions(r, a, e) {
    return Ma(r, a, e);
  };
  var La = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[La] = {
      static: function _static() {
        var r = za.number;
        var a = za.boolean;
        var e = [ za.array, za.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = [ a, za.string ];
        var o = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ za.number, za.array, za.null ],
            ignoreMutation: [ za.function, za.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ za.string, za.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: i,
            pointers: [ za.array, za.null ]
          }
        };
        return function(r, a) {
          var e = Ia(o, r, a), t = e[0], n = e[1];
          return Da({}, n, t);
        };
      }
    }, r;
  })();
  var Va = "data-overlayscrollbars";
  var ka = "os-environment";
  var Ra = ka + "-scrollbar-hidden";
  var Fa = Va + "-initialize";
  var Na = "noClipping";
  var ja = Va + "-body";
  var qa = Va;
  var Ua = "host";
  var Ba = Va + "-viewport";
  var Ya = Z;
  var Wa = G;
  var Xa = "arrange";
  var Za = "measuring";
  var Ga = "scrolling";
  var $a = "scrollbarHidden";
  var Ja = "noContent";
  var Ka = Va + "-padding";
  var Qa = Va + "-content";
  var re = "os-size-observer";
  var ae = re + "-appear";
  var ee = re + "-listener";
  var te = ee + "-scroll";
  var ne = ee + "-item";
  var ve = ne + "-final";
  var ie = "os-trinsic-observer";
  var oe = "os-theme-none";
  var ue = "os-scrollbar";
  var ce = ue + "-rtl";
  var le = ue + "-horizontal";
  var fe = ue + "-vertical";
  var se = ue + "-track";
  var de = ue + "-handle";
  var pe = ue + "-visible";
  var _e = ue + "-cornerless";
  var ge = ue + "-interaction";
  var he = ue + "-unusable";
  var be = ue + "-auto-hide";
  var me = be + "-hidden";
  var ye = ue + "-wheel";
  var Se = se + "-interactive";
  var we = de + "-interactive";
  var Oe = "__osSizeObserverPlugin";
  var Ce = /* @__PURE__ */ function(r) {
    return r = {}, r[Oe] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = Br('<div class="' + ne + '" dir="ltr"><div class="' + ne + '"><div class="' + ve + '"></div></div><div class="' + ne + '"><div class="' + ve + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var f = o.firstChild;
          var s = f == null ? void 0 : f.firstChild;
          var d = ea(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            _a(f, n);
            _a(u, n);
          };
          var b = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              a(r === true);
            }
          };
          var m = function onScroll(r) {
            p = ea(o);
            _ = !r || !tr(p, d);
            if (r) {
              sa(r);
              if (_ && !g) {
                c(g);
                g = l(b);
              }
            } else {
              b(r === false);
            }
            h();
          };
          var y = [ Fr(r, i), fa(f, v, m), fa(u, v, m) ];
          Tr(r, te);
          setStyles(s, (t = {}, t[$] = n, t[J] = n, t));
          l(h);
          return [ e ? or(m, false) : h, y ];
        };
      }
    }, r;
  }();
  var xe = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.L;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], v = t[1];
    return [ n && e.x && e.y, v ];
  };
  var Ee = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Ae = function createViewportOverflowState(r, a) {
    var e = function getAxisOverflowStyle(r, a, e, t) {
      var n = r === K ? Q : r.replace(K + "-", "");
      var v = Ee(r);
      var i = Ee(e);
      if (!a && !t) {
        return Q;
      }
      if (v && i) {
        return K;
      }
      if (v) {
        var o = a ? K : Q;
        return a && t ? n : o;
      }
      var u = i && t ? K : Q;
      return a ? n : u;
    };
    var t = {
      x: e(a.x, r.x, a.y, r.y),
      y: e(a.y, r.y, a.x, r.x)
    };
    return {
      V: t,
      k: {
        x: t.x === rr,
        y: t.y === rr
      }
    };
  };
  var Te = "__osScrollbarsHidingPlugin";
  var He = /* @__PURE__ */ function(r) {
    return r = {}, r[Te] = {
      static: function _static() {
        return {
          R: function _viewportArrangement(r, a, e, t, n) {
            var v = r.F, i = r.N;
            var o = t.j, u = t.L, c = t.q;
            var l = !v && !o && (u.x || u.y);
            var f = xe(n, t), s = f[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var a = getStyles(i, r);
                var e = a === rr;
                return [ a, e ];
              };
              var a = r(Z), e = a[0], t = a[1];
              var n = r(G), v = n[0], o = n[1];
              return {
                V: {
                  x: e,
                  y: v
                },
                k: {
                  x: t,
                  y: o
                }
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var a = r.k;
              var e = o || s ? 0 : 42;
              var t = function getHideOffsetPerAxis(r, a, t) {
                var n = r ? e : t;
                var v = a && !o ? n : 0;
                var i = r && !!e;
                return [ v, i ];
              };
              var n = t(u.x, a.x, c.x), v = n[0], i = n[1];
              var l = t(u.y, a.y, c.y), f = l[0], d = l[1];
              return {
                U: {
                  x: v,
                  y: f
                },
                B: {
                  x: i,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, e, t) {
              var n = e.Y;
              if (!v) {
                var i;
                var o = sr({}, (i = {}, i[W] = 0, i[X] = 0, i[Y] = 0, i));
                var u = p(r), c = u.U, l = u.B;
                var f = l.x, s = l.y;
                var d = c.x, _ = c.y;
                var g = a.W;
                var h = n ? Y : W;
                var b = n ? U : q;
                var m = g[h];
                var y = g[X];
                var S = g[b];
                var w = g[B];
                o[$] = "calc(100% + " + (_ + m * -1) + "px)";
                o[h] = -_ + m;
                o[X] = -d + y;
                if (t) {
                  o[b] = S + (s ? _ : 0);
                  o[B] = w + (f ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, t, n) {
              if (l) {
                var v = a.W;
                var o = p(r), u = o.U, c = o.B;
                var f = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = e.Y;
                var h = g ? q : U;
                var b = v[h];
                var m = v.paddingTop;
                var y = t.w + n.w;
                var S = t.h + n.h;
                var w = {
                  w: _ && s ? _ + y - b + "px" : "",
                  h: d && f ? d + S - m + "px" : ""
                };
                setStyles(i, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return l;
            };
            var h = function _undoViewportArrange(r) {
              if (l) {
                var t = r || d();
                var n = a.W;
                var v = p(t), o = v.B;
                var u = o.x, c = o.y;
                var f = {};
                var s = function assignProps(r) {
                  return each(r, (function(r) {
                    f[r] = n[r];
                  }));
                };
                if (u) {
                  s([ X, j, B ]);
                }
                if (c) {
                  s([ Y, W, U, q ]);
                }
                var g = getStyles(i, fr(f));
                var h = wr(i, Ba, Xa);
                setStyles(i, f);
                return [ function() {
                  setStyles(i, sr({}, g, _(t, e, l)));
                  h();
                }, t ];
              }
              return [ ir ];
            };
            return {
              X: p,
              Z: g,
              G: h,
              $: _
            };
          }
        };
      }
    }, r;
  }();
  var Pe = "__osClickScrollPlugin";
  var De = /* @__PURE__ */ function(r) {
    return r = {}, r[Pe] = {
      static: function _static() {
        return function(r, a, e, t) {
          var n = false;
          var v = ir;
          var i = 133;
          var o = 222;
          var u = ur(i), c = u[0], l = u[1];
          var f = Math.sign(a);
          var s = e * f;
          var d = s / 2;
          var p = function easing(r) {
            return 1 - (1 - r) * (1 - r);
          };
          var _ = function easedEndPressAnimation(a, e) {
            return z(a, e, o, r, p);
          };
          var g = function linearPressAnimation(e, t) {
            return z(e, a - s, i * t, (function(e, t, n) {
              r(e);
              if (n) {
                v = _(e, a);
              }
            }));
          };
          var h = z(0, s, o, (function(i, o, u) {
            r(i);
            if (u) {
              t(n);
              if (!n) {
                var l = a - i;
                var p = Math.sign(l - d) === f;
                p && c((function() {
                  var r = l - s;
                  var t = Math.sign(r) === f;
                  v = t ? g(i, Math.abs(r) / e) : _(i, a);
                }));
              }
            }
          }), p);
          return function(r) {
            n = true;
            if (r) {
              h();
            }
            l();
            v();
          };
        };
      }
    }, r;
  }();
  var ze = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (C(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Me = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && lr(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ie = {
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
  var Le = function getOptionsDiff(r, a) {
    var e = {};
    var t = I(fr(a), fr(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (E(n) && E(v)) {
        sr(e[t] = {}, Le(n, v));
        if (pr(e[t])) {
          delete e[t];
        }
      } else if (lr(a, t) && v !== n) {
        var i = true;
        if (x(n) || x(v)) {
          try {
            if (ze(n) === ze(v)) {
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
  var Ve = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Me(r, t), e || Me(a, t) !== void 0 ];
    };
  };
  var ke;
  var Re = function getNonce() {
    return ke;
  };
  var Fe = function setNonce(r) {
    ke = r;
  };
  var Ne;
  var je = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, a, e) {
      Fr(document.body, r);
      Fr(document.body, r);
      var t = ta(r);
      var n = ea(r);
      var v = va(a);
      e && Rr(r);
      return {
        x: n.h - t.h + v.h,
        y: n.w - t.w + v.w
      };
    };
    var e = function getNativeScrollbarsHiding(r) {
      var a = false;
      var e = Tr(r, Ra);
      try {
        a = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      e();
      return a;
    };
    var n = "." + ka + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + ka + " div{width:200%;height:200%;margin:10px 0}." + Ra + "{scrollbar-width:none!important}." + Ra + "::-webkit-scrollbar,." + Ra + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var v = Br('<div class="' + ka + '"><div></div><style>' + n + "</style></div>");
    var i = v[0];
    var o = i.firstChild;
    var u = i.lastChild;
    var c = Re();
    if (c) {
      u.nonce = c;
    }
    var l = Oa(), f = l[0], s = l[2];
    var d = a({
      v: r(i, o),
      i: nr
    }, or(r, i, o, true)), p = d[0], _ = d[1];
    var g = _(), b = g[0];
    var m = e(i);
    var y = {
      x: b.x === 0,
      y: b.y === 0
    };
    var S = {
      elements: {
        host: null,
        padding: !m,
        viewport: function viewport(r) {
          return m && zr(r) && r;
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
    var w = sr({}, Ie);
    var O = or(sr, {}, w);
    var x = or(sr, {}, S);
    var E = {
      q: b,
      L: y,
      j: m,
      J: !!h,
      K: or(f, "r"),
      rr: x,
      ar: function _setDefaultInitialization(r) {
        return sr(S, r) && x();
      },
      er: O,
      tr: function _setDefaultOptions(r) {
        return sr(w, r) && O();
      },
      nr: sr({}, S),
      vr: sr({}, w)
    };
    yr(i, "style");
    Rr(i);
    fa(t, "resize", (function() {
      s("r", []);
    }));
    if (C(t.matchMedia) && !m && (!y.x || !y.y)) {
      var A = function addZoomListener(r) {
        var a = t.matchMedia("(resolution: " + t.devicePixelRatio + "dppx)");
        fa(a, "change", (function() {
          r();
          A(r);
        }), {
          P: true
        });
      };
      A((function() {
        var r = p(), a = r[0], e = r[1];
        sr(E.q, a);
        s("r", [ e ]);
      }));
    }
    return E;
  };
  var qe = function getEnvironment() {
    if (!Ne) {
      Ne = je();
    }
    return Ne;
  };
  var Ue = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || Hr)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = fa(v, i, (function(r) {
                if (t) {
                  c();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, L(o, c));
            } else {
              N(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var Be = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.ir, o = v.ur, u = v.cr, c = v.lr, l = v.sr, f = v.dr;
    var s = cr((function() {
      return n && e(true);
    }), {
      u: 33,
      p: 99
    });
    var d = Ue(r, s, u), _ = d[0], g = d[1];
    var h = i || [];
    var b = o || [];
    var m = I(h, b);
    var y = function observerCallback(n, v) {
      if (!R(v)) {
        var i = l || ir;
        var o = f || ir;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, l = e.type, f = e.oldValue, _ = e.addedNodes, g = e.removedNodes;
          var h = l === "attributes";
          var m = l === "childList";
          var y = r === v;
          var S = h && n;
          var O = S && hr(v, n || "");
          var C = w(O) ? O : null;
          var x = S && f !== C;
          var E = M(b, n) && x;
          if (a && (m || !y)) {
            var A = h && x;
            var T = A && c && Dr(v, c);
            var H = T ? !i(v, n, f, C) : !h || A;
            var P = H && !o(e, !!T, r, t);
            each(_, (function(r) {
              return L(u, r);
            }));
            each(g, (function(r) {
              return L(u, r);
            }));
            p = p || P;
          }
          if (!a && y && x && !i(v, n, f, C)) {
            L(s, n);
            d = d || E;
          }
        }));
        g((function(r) {
          return F(u).reduce((function(a, e) {
            L(a, Hr(r, e));
            return Dr(e, r) ? L(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!R(s) || d) {
          var _ = [ F(s), d ];
          !n && e.apply(0, _);
          return _;
        }
      }
    };
    var S = new p(or(y, false));
    return [ function() {
      S.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: m,
        subtree: a,
        childList: a,
        characterData: a
      });
      n = true;
      return function() {
        if (n) {
          _();
          S.disconnect();
          n = false;
        }
      };
    }, function() {
      if (n) {
        s.S();
        return y(true, S.takeRecords());
      }
    } ];
  };
  var Ye = function createSizeObserver(r, e, t) {
    var n = t || {}, v = n.pr;
    var i = Ta(Oe);
    var o = a({
      v: false,
      o: true
    }), u = o[0];
    return function() {
      var a = [];
      var t = Br('<div class="' + re + '"><div class="' + ee + '"></div></div>');
      var n = t[0];
      var o = n.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = false;
        var n = false;
        if (a) {
          var v = u(r.contentRect), i = v[0], o = v[2];
          var c = ua(i);
          n = ca(i, o);
          t = !n && !c;
        } else {
          n = r === true;
        }
        if (!t) {
          e({
            _r: true,
            pr: n
          });
        }
      };
      if (g) {
        var l = new g((function(r) {
          return c(r.pop());
        }));
        l.observe(o);
        L(a, (function() {
          l.disconnect();
        }));
      } else if (i) {
        var f = i(o, c, v), s = f[0], d = f[1];
        L(a, I([ Tr(n, ae), fa(n, "animationstart", s) ], d));
      } else {
        return ir;
      }
      return or(N, L(a, Fr(r, n)));
    };
  };
  var We = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Ur(ie);
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
      if (_) {
        t = new _(or(c, false), {
          root: r
        });
        t.observe(v);
        L(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = ea(v);
          u(r);
        };
        L(a, Ye(v, e)());
        e();
      }
      return or(N, L(a, Fr(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Xe = function createObserversSetup(r, e, t, n) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = "[" + qa + "]";
    var s = "[" + Ba + "]";
    var d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var p = r.gr, _ = r.hr, h = r.N, b = r.br, m = r.mr, y = r.F, w = r.yr, O = r.Sr, E = r.wr, A = r.Or;
    var T = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var H = {
      Cr: false,
      Y: T(p)
    };
    var P = qe();
    var D = Ta(Te);
    var z = a({
      i: tr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = D && D.R(r, e, H, P, t).G;
      var n = w && y;
      var v = !n && xr(_, qa, Na);
      var i = !y && O(Xa);
      var o = i && ga(b);
      var u = o && A();
      var c = E(Za, v);
      var l = i && a && a()[0];
      var f = na(h);
      var s = va(h);
      l && l();
      _a(b, o);
      u && u();
      v && c();
      return {
        w: f.w + s.w,
        h: f.h + s.h
      };
    })), M = z[0];
    var L = cr(n, {
      u: function _timeout() {
        return v;
      },
      p: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ I(fr(e), fr(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var V = function setDirection(r) {
      var a = T(p);
      sr(r, {
        Er: l !== a
      });
      sr(H, {
        Y: a
      });
      l = a;
    };
    var k = function onTrinsicChanged(r, a) {
      var e = r[0], t = r[1];
      var v = {
        Ar: t
      };
      sr(H, {
        Cr: e
      });
      !a && n(v);
      return v;
    };
    var R = function onSizeChanged(r) {
      var a = r._r, e = r.pr;
      var t = a && !e;
      var v = !t && P.j ? L : n;
      var i = {
        _r: a || e,
        pr: e
      };
      V(i);
      v(i);
    };
    var F = function onContentMutation(r, a) {
      var e = M(), t = e[1];
      var v = {
        Tr: t
      };
      V(v);
      var i = r ? n : L;
      t && !a && i(v);
      return v;
    };
    var N = function onHostMutation(r, a, e) {
      var t = {
        Hr: a
      };
      V(t);
      if (a && !e) {
        L(t);
      }
      return t;
    };
    var j = m ? We(_, k) : [], q = j[0], U = j[1];
    var B = !y && Ye(_, R, {
      pr: true
    });
    var Y = Be(_, false, N, {
      ur: d,
      ir: d
    }), W = Y[0], X = Y[1];
    var Z = y && g && new g((function(r) {
      var a = r[r.length - 1].contentRect;
      R({
        _r: true,
        pr: ca(a, c)
      });
      c = a;
    }));
    var G = cr((function() {
      var r = M(), a = r[1];
      n({
        Tr: a
      });
    }), {
      u: 222,
      _: true
    });
    return [ function() {
      Z && Z.observe(_);
      var r = B && B();
      var a = q && q();
      var e = W();
      var t = P.K((function(r) {
        if (r) {
          L({
            Pr: r
          });
        } else {
          G();
        }
      }));
      return function() {
        Z && Z.disconnect();
        r && r();
        a && a();
        u && u();
        e();
        t();
      };
    }, function(r) {
      var a = r.Dr, e = r.zr, t = r.Mr;
      var n = {};
      var c = a("update.ignoreMutation"), l = c[0];
      var p = a("update.attributes"), _ = p[0], g = p[1];
      var b = a("update.elementEvents"), w = b[0], O = b[1];
      var E = a("update.debounce"), A = E[0], T = E[1];
      var H = O || g;
      var P = e || t;
      var D = function ignoreMutationFromOptions(r) {
        return C(l) && l(r);
      };
      if (H) {
        o && o();
        u && u();
        var z = Be(m || h, true, F, {
          ir: I(d, _ || []),
          cr: w,
          lr: f,
          dr: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !y ? kr(e, f, s) : false;
            return n || !!Lr(e, "." + ue) || !!D(r);
          }
        }), M = z[0], R = z[1];
        u = M();
        o = R;
      }
      if (T) {
        L.S();
        if (x(A)) {
          var j = A[0];
          var q = A[1];
          v = S(j) && j;
          i = S(q) && q;
        } else if (S(A)) {
          v = A;
          i = false;
        } else {
          v = false;
          i = false;
        }
      }
      if (P) {
        var B = X();
        var Y = U && U();
        var W = o && o();
        B && sr(n, N(B[0], B[1], P));
        Y && sr(n, k(Y[0], P));
        W && sr(n, F(W[0], P));
      }
      V(n);
      return n;
    }, H ];
  };
  var Ze = function resolveInitialization(r, a) {
    return C(a) ? a.apply(0, r) : a;
  };
  var Ge = function staticInitializationElement(r, a, e, t) {
    var n = b(t) ? e : t;
    var v = Ze(r, n);
    return v || a.apply(0, r);
  };
  var $e = function dynamicInitializationElement(r, a, e, t) {
    var n = b(t) ? e : t;
    var v = Ze(r, n);
    return !!v && (H(v) ? v : a.apply(0, r));
  };
  var Je = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = qe(), i = v.L, o = v.j, u = v.rr;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = t != null ? t : l;
    var d = b(n) ? f : n;
    var p = (i.x || i.y) && s;
    var _ = r && (m(d) ? !o : d);
    return !!p || !!_;
  };
  var Ke = function createScrollbarsSetupElements(r, a, e, t) {
    var n = "--os-viewport-percent";
    var v = "--os-scroll-percent";
    var i = "--os-scroll-direction";
    var o = qe(), u = o.rr;
    var c = u(), l = c.scrollbars;
    var f = l.slot;
    var s = a.gr, d = a.hr, p = a.N, _ = a.Ir, g = a.br, b = a.yr, m = a.F;
    var y = _ ? {} : r, S = y.scrollbars;
    var w = S || {}, C = w.slot;
    var x = [];
    var E = [];
    var A = [];
    var T = $e([ s, d, p ], (function() {
      return m && b ? s : d;
    }), f, C);
    var H = function initScrollTimeline(r) {
      if (h) {
        var a = null;
        var t = [];
        var n = new h({
          source: g,
          axis: r
        });
        var v = function cancelAnimation() {
          a && a.cancel();
          a = null;
        };
        var i = function _setScrollPercentAnimation(i) {
          var o = e.Lr;
          var u = ma(o)[r];
          var c = r === "x";
          var l = [ Jr(0, c), Jr("calc(100cq" + (c ? "w" : "h") + " + -100%)", c) ];
          var f = u ? l : l.reverse();
          if (t[0] === f[0] && t[1] === f[1]) {
            return v;
          }
          v();
          t = f;
          a = i.Vr.animate({
            clear: [ "left" ],
            transform: f
          }, {
            timeline: n
          });
          return v;
        };
        return {
          kr: i
        };
      }
    };
    var P = {
      x: H("x"),
      y: H("y")
    };
    var D = function getViewportPercent() {
      var r = e.Rr, a = e.Fr;
      var t = function getAxisValue(r, a) {
        return _r(0, 1, r / (r + a) || 0);
      };
      return {
        x: t(a.x, r.x),
        y: t(a.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Tr : Ar;
      each(r, (function(r) {
        t(r.Nr, a);
      }));
    };
    var M = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var I = function scrollbarsAddRemoveClass(r, a, e) {
      var t = O(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && z(E, r, a);
      v && z(A, r, a);
    };
    var V = function refreshScrollbarsHandleLength() {
      var r = D();
      var a = function createScrollbarStyleFn(r) {
        return function(a) {
          var e;
          return [ a.Nr, (e = {}, e[n] = Zr(r) + "", e) ];
        };
      };
      M(E, a(r.x));
      M(A, a(r.y));
    };
    var k = function refreshScrollbarsHandleOffset() {
      if (!h) {
        var r = e.Lr;
        var a = ya(r, ga(g));
        var t = function createScrollbarStyleFn(r) {
          return function(a) {
            var e;
            return [ a.Nr, (e = {}, e[v] = Zr(r) + "", e) ];
          };
        };
        M(E, t(a.x));
        M(A, t(a.y));
      }
    };
    var R = function refreshScrollbarsScrollCoordinates() {
      var r = e.Lr;
      var a = ma(r);
      var t = function createScrollbarStyleFn(r) {
        return function(a) {
          var e;
          return [ a.Nr, (e = {}, e[i] = r ? "0" : "1", e) ];
        };
      };
      M(E, t(a.x));
      M(A, t(a.y));
      if (h) {
        E.forEach(P.x.kr);
        A.forEach(P.y.kr);
      }
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !b) {
        var r = e.Rr, a = e.Lr;
        var t = ma(a);
        var n = ya(a, ga(g));
        var v = function styleScrollbarPosition(a) {
          var e = a.Nr;
          var v = Ir(e) === p && e;
          var i = function getTranslateValue(r, a, e) {
            var t = a * r;
            return Gr(e ? t : -t);
          };
          return [ v, v && {
            transform: Jr({
              x: i(n.x, r.x, t.x),
              y: i(n.y, r.y, t.y)
            })
          } ];
        };
        M(E, v);
        M(A, v);
      }
    };
    var j = function generateScrollbarDOM(r) {
      var a = r ? "x" : "y";
      var e = r ? le : fe;
      var n = Ur(ue + " " + e);
      var v = Ur(se);
      var i = Ur(de);
      var o = {
        Nr: n,
        jr: v,
        Vr: i
      };
      var u = P[a];
      L(r ? E : A, o);
      L(x, [ Fr(n, v), Fr(v, i), or(Rr, n), u && u.kr(o), t(o, I, r) ]);
      return o;
    };
    var q = or(j, true);
    var U = or(j, false);
    var B = function appendElements() {
      Fr(T, E[0].Nr);
      Fr(T, A[0].Nr);
      return or(N, x);
    };
    q();
    U();
    return [ {
      qr: V,
      Ur: k,
      Br: R,
      Yr: F,
      Wr: I,
      Xr: {
        Zr: E,
        Gr: q,
        $r: or(M, E)
      },
      Jr: {
        Zr: A,
        Gr: U,
        $r: or(M, A)
      }
    }, B ];
  };
  var Qe = function createScrollbarsSetupEvents(r, a, e, t) {
    return function(n, v, u) {
      var c = a.hr, l = a.N, s = a.F, d = a.br, p = a.Kr, _ = a.Or;
      var g = n.Nr, h = n.jr, b = n.Vr;
      var m = ur(333), y = m[0], S = m[1];
      var w = ur(444), O = w[0], x = w[1];
      var E = function scrollOffsetElementScrollBy(r) {
        C(d.scrollBy) && d.scrollBy({
          behavior: "smooth",
          left: r.x,
          top: r.y
        });
      };
      var A = function createInteractiveScrollEvents() {
        var a = "pointerup pointercancel lostpointercapture";
        var t = "client" + (u ? "X" : "Y");
        var n = u ? $ : J;
        var v = u ? "left" : "top";
        var c = u ? "w" : "h";
        var l = u ? "x" : "y";
        var f = function createRelativeHandleMove(r, a) {
          return function(t) {
            var n;
            var v = e.Rr;
            var i = ea(h)[c] - ea(b)[c];
            var o = a * t / i;
            var u = o * v[l];
            _a(d, (n = {}, n[l] = r + u, n));
          };
        };
        var s = [];
        return fa(h, "pointerdown", (function(e) {
          var u = Lr(e.target, "." + de) === b;
          var g = u ? b : h;
          var m = r.scrollbars;
          var y = m[u ? "dragScroll" : "clickScroll"];
          var S = e.button, w = e.isPrimary, C = e.pointerType;
          var A = m.pointers;
          var T = S === 0 && w && y && (A || []).includes(C);
          if (T) {
            N(s);
            x();
            var H = !u && (e.shiftKey || y === "instant");
            var P = or(ia, b);
            var D = or(ia, h);
            var z = function getHandleOffset(r, a) {
              return (r || P())[v] - (a || D())[v];
            };
            var M = i(ia(d)[n]) / ea(d)[c] || 1;
            var I = f(ga(d)[l], 1 / M);
            var V = e[t];
            var k = P();
            var R = D();
            var F = k[n];
            var j = z(k, R) + F / 2;
            var q = V - R[v];
            var U = u ? 0 : q - j;
            var B = function releasePointerCapture(r) {
              N(X);
              g.releasePointerCapture(r.pointerId);
            };
            var Y = u || H;
            var W = _();
            var X = [ fa(p, a, B), fa(p, "selectstart", (function(r) {
              return da(r);
            }), {
              T: false
            }), fa(h, a, B), Y && fa(h, "pointermove", (function(r) {
              return I(U + (r[t] - V));
            })), Y && function() {
              var r = ga(d);
              W();
              var a = ga(d);
              var e = {
                x: a.x - r.x,
                y: a.y - r.y
              };
              if (o(e.x) > 3 || o(e.y) > 3) {
                _();
                _a(d, r);
                E(e);
                O(W);
              }
            } ];
            g.setPointerCapture(e.pointerId);
            if (H) {
              I(U);
            } else if (!u) {
              var Z = Ta(Pe);
              if (Z) {
                var G = Z(I, U, F, (function(r) {
                  if (r) {
                    W();
                  } else {
                    L(X, W);
                  }
                }));
                L(X, G);
                L(s, or(G, true));
              }
            }
          }
        }));
      };
      var T = true;
      return or(N, [ fa(b, "pointermove pointerleave", t), fa(g, "pointerenter", (function() {
        v(ge, true);
      })), fa(g, "pointerleave pointercancel", (function() {
        v(ge, false);
      })), !s && fa(g, "mousedown", (function() {
        var r = Vr();
        if (br(r, Ba) || br(r, qa) || r === document.body) {
          f(or(Sa, l), 25);
        }
      })), fa(g, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (T && t === 0 && Ir(g) === c) {
          E({
            x: a,
            y: e
          });
        }
        T = false;
        v(ye, true);
        y((function() {
          T = true;
          v(ye);
        }));
        da(r);
      }), {
        T: false,
        H: true
      }), fa(g, "pointerdown", or(fa, p, "click", pa, {
        P: true,
        H: true,
        T: false
      }), {
        H: true
      }), A(), S, x ]);
    };
  };
  var rt = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = ir;
    var s = 0;
    var d = [ "mouse", "pen" ];
    var p = function isHoverablePointerType(r) {
      return d.includes(r.pointerType);
    };
    var _ = ur(), g = _[0], h = _[1];
    var b = ur(100), m = b[0], y = b[1];
    var S = ur(100), w = S[0], O = S[1];
    var C = ur((function() {
      return s;
    })), x = C[0], E = C[1];
    var A = Ke(r, n, t, Qe(a, n, t, (function(r) {
      return p(r) && j();
    }))), T = A[0], H = A[1];
    var P = n.hr, D = n.Qr, z = n.yr;
    var M = T.Wr, I = T.qr, V = T.Ur, k = T.Br, R = T.Yr;
    var F = function manageScrollbarsAutoHide(r, a) {
      E();
      if (r) {
        M(me);
      } else {
        var e = or(M, me, true);
        if (s > 0 && !a) {
          x(e);
        } else {
          e();
        }
      }
    };
    var j = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !i : !c) {
        F(true);
        m((function() {
          F(false);
        }));
      }
    };
    var q = function manageAutoHideSuspension(r) {
      M(be, r, true);
      M(be, r, false);
    };
    var U = function onHostMouseEnter(r) {
      if (p(r)) {
        i = u;
        u && F(true);
      }
    };
    var B = [ E, y, O, h, function() {
      return f();
    }, fa(P, "pointerover", U, {
      P: true
    }), fa(P, "pointerenter", U), fa(P, "pointerleave", (function(r) {
      if (p(r)) {
        i = false;
        u && F(false);
      }
    })), fa(P, "pointermove", (function(r) {
      p(r) && o && j();
    })), fa(D, "scroll", (function(r) {
      g((function() {
        V();
        j();
      }));
      v(r);
      R();
    })) ];
    return [ function() {
      return or(N, L(B, H()));
    }, function(r) {
      var a = r.Dr, n = r.Mr, v = r.ra, i = r.aa;
      var d = i || {}, p = d.ea, _ = d.ta, g = d.na, h = d.va;
      var b = v || {}, m = b.Er, y = b.pr;
      var S = e.Y;
      var O = qe(), C = O.L;
      var x = t.V, E = t.ia;
      var A = a("showNativeOverlaidScrollbars"), T = A[0], H = A[1];
      var P = a("scrollbars.theme"), L = P[0], N = P[1];
      var j = a("scrollbars.visibility"), U = j[0], B = j[1];
      var Y = a("scrollbars.autoHide"), W = Y[0], X = Y[1];
      var Z = a("scrollbars.autoHideSuspend"), G = Z[0], $ = Z[1];
      var J = a("scrollbars.autoHideDelay"), Q = J[0];
      var ar = a("scrollbars.dragScroll"), er = ar[0], tr = ar[1];
      var nr = a("scrollbars.clickScroll"), vr = nr[0], ir = nr[1];
      var ur = a("overflow"), cr = ur[0], lr = ur[1];
      var fr = y && !n;
      var sr = E.x || E.y;
      var dr = p || _ || h || m || n;
      var pr = g || B || lr;
      var _r = T && C.x && C.y;
      var gr = function setScrollbarVisibility(r, a, e) {
        var t = r.includes(rr) && (U === K || U === "auto" && a === rr);
        M(pe, t, e);
        return t;
      };
      s = Q;
      if (fr) {
        if (G && sr) {
          q(false);
          f();
          w((function() {
            f = fa(D, "scroll", or(q, true), {
              P: true
            });
          }));
        } else {
          q(true);
        }
      }
      if (H) {
        M(oe, _r);
      }
      if (N) {
        M(l);
        M(L, true);
        l = L;
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
      if (tr) {
        M(we, er);
      }
      if (ir) {
        M(Se, !!vr);
      }
      if (pr) {
        var hr = gr(cr.x, x.x, true);
        var br = gr(cr.y, x.y, false);
        var mr = hr && br;
        M(_e, !mr);
      }
      if (dr) {
        V();
        I();
        R();
        h && k();
        M(he, !E.x, true);
        M(he, !E.y, false);
        M(ce, S && !z);
      }
    }, {}, T ];
  };
  var at = function createStructureSetupElements(r) {
    var a = qe();
    var e = a.rr, n = a.j;
    var v = e(), i = v.elements;
    var o = i.padding, u = i.viewport, c = i.content;
    var l = H(r);
    var f = l ? {} : r;
    var s = f.elements;
    var d = s || {}, p = d.padding, _ = d.viewport, g = d.content;
    var h = l ? r : f.target;
    var b = zr(h);
    var m = h.ownerDocument;
    var y = m.documentElement;
    var S = function getDocumentWindow() {
      return m.defaultView || t;
    };
    var w = or(Ge, [ h ]);
    var O = or($e, [ h ]);
    var C = or(Ur, "");
    var x = or(w, C, u);
    var E = or(O, C, c);
    var A = function elementHasOverflow(r) {
      var a = ea(r);
      var e = na(r);
      var t = getStyles(r, Z);
      var n = getStyles(r, G);
      return e.w - a.w > 0 && !Ee(t) || e.h - a.h > 0 && !Ee(n);
    };
    var T = x(_);
    var P = T === h;
    var D = P && b;
    var z = !P && E(g);
    var I = !P && T === z;
    var V = D ? y : T;
    var k = D ? V : h;
    var R = !P && O(C, o, p);
    var F = !I && z;
    var j = [ F, V, R, k ].map((function(r) {
      return H(r) && !Ir(r) && r;
    }));
    var q = function elementIsGenerated(r) {
      return r && M(j, r);
    };
    var U = !q(V) && A(V) ? V : h;
    var B = D ? y : V;
    var Y = D ? m : V;
    var W = {
      gr: h,
      hr: k,
      N: V,
      oa: R,
      mr: F,
      br: B,
      Qr: Y,
      ua: b ? y : U,
      Kr: m,
      yr: b,
      Ir: l,
      F: P,
      ca: S,
      Sr: function _viewportHasClass(r) {
        return xr(V, Ba, r);
      },
      wr: function _viewportAddRemoveClass(r, a) {
        return Cr(V, Ba, r, a);
      },
      Or: function _removeScrollObscuringStyles() {
        return Cr(B, Ba, Ga, true);
      }
    };
    var X = W.gr, $ = W.hr, J = W.oa, K = W.N, Q = W.mr;
    var rr = [ function() {
      yr($, [ qa, Fa ]);
      yr(X, Fa);
      if (b) {
        yr(y, [ Fa, qa ]);
      }
    } ];
    var ar = Mr([ Q, K, J, $, X ].find((function(r) {
      return r && !q(r);
    })));
    var er = D ? X : Q || K;
    var tr = or(N, rr);
    var nr = function appendElements() {
      var r = S();
      var a = Vr();
      var e = function unwrap(r) {
        Fr(Ir(r), Mr(r));
        Rr(r);
      };
      var t = function prepareWrapUnwrapFocus(r) {
        return fa(r, "focusin focusout focus blur", pa, {
          H: true,
          T: false
        });
      };
      var v = "tabindex";
      var i = hr(K, v);
      var o = t(a);
      mr($, qa, P ? "" : Ua);
      mr(J, Ka, "");
      mr(K, Ba, "");
      mr(Q, Qa, "");
      if (!P) {
        mr(K, v, i || "-1");
        b && mr(y, ja, "");
      }
      Fr(er, ar);
      Fr($, J);
      Fr(J || $, !P && K);
      Fr(K, Q);
      L(rr, [ o, function() {
        var r = Vr();
        var a = q(K);
        var n = a && r === K ? X : r;
        var o = t(n);
        yr(J, Ka);
        yr(Q, Qa);
        yr(K, Ba);
        b && yr(y, ja);
        i ? mr(K, v, i) : yr(K, v);
        q(Q) && e(Q);
        a && e(K);
        q(J) && e(J);
        Sa(n);
        o();
      } ]);
      if (n && !P) {
        Or(K, Ba, $a);
        L(rr, or(yr, K, Ba));
      }
      Sa(!P && b && a === X && r.top === r ? K : a);
      o();
      ar = 0;
      return tr;
    };
    return [ W, nr, tr ];
  };
  var et = function createTrinsicUpdateSegment(r) {
    var a = r.mr;
    return function(r) {
      var e = r.ra, t = r.la, n = r.Mr;
      var v = e || {}, i = v.Ar;
      var o = t.Cr;
      var u = a && (i || n);
      if (u) {
        var c;
        setStyles(a, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var tt = function createPaddingUpdateSegment(r, e) {
    var t = r.hr, n = r.oa, v = r.N, i = r.F;
    var o = a({
      i: vr,
      v: $r()
    }, or($r, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Dr, t = r.ra, o = r.la, l = r.Mr;
      var f = c(l), s = f[0], d = f[1];
      var p = qe(), _ = p.j;
      var g = t || {}, h = g._r, b = g.Tr, m = g.Er;
      var y = o.Y;
      var S = a("paddingAbsolute"), w = S[0], O = S[1];
      var C = l || b;
      if (h || d || C) {
        var x = u(l);
        s = x[0];
        d = x[1];
      }
      var E = !i && (O || m || d);
      if (E) {
        var A, T;
        var H = !w || !n && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (A = {}, A[W] = H && !y ? -P : 0, A[X] = H ? -D : 0, A[Y] = H && y ? -P : 0, 
        A.top = H ? -s.t : 0, A.right = H ? y ? -s.r : "auto" : 0, A.left = H ? y ? "auto" : -s.l : 0, 
        A[$] = H && "calc(100% + " + P + "px)", A);
        var M = (T = {}, T[j] = H ? s.t : 0, T[q] = H ? s.r : 0, T[B] = H ? s.b : 0, T[U] = H ? s.l : 0, 
        T);
        setStyles(n || v, z);
        setStyles(v, M);
        sr(e, {
          oa: s,
          fa: !H,
          W: n ? M : sr({}, z, M)
        });
      }
      return {
        sa: E
      };
    };
  };
  var nt = function createOverflowUpdateSegment(r, e) {
    var v = qe();
    var i = r.hr, o = r.oa, u = r.N, c = r.F, f = r.Qr, s = r.br, d = r.yr, p = r.wr, _ = r.ca;
    var g = v.j;
    var h = d && c;
    var b = or(n, 0);
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
    var y = fr(m);
    var S = {
      i: tr,
      v: {
        w: 0,
        h: 0
      }
    };
    var w = {
      i: nr,
      v: {}
    };
    var O = function setMeasuringMode(r) {
      p(Za, !h && r);
    };
    var C = function getMeasuredScrollCoordinates(r) {
      var a = y.some((function(a) {
        var e = r[a];
        return e && m[a](e);
      }));
      if (!a) {
        return {
          D: {
            x: 0,
            y: 0
          },
          M: {
            x: 1,
            y: 1
          }
        };
      }
      O(true);
      var e = ga(s);
      var t = p(Ja, true);
      var n = fa(f, rr, (function(r) {
        var a = ga(s);
        if (r.isTrusted && a.x === e.x && a.y === e.y) {
          sa(r);
        }
      }), {
        H: true,
        P: true
      });
      _a(s, {
        x: 0,
        y: 0
      });
      t();
      var v = ga(s);
      var i = na(s);
      _a(s, {
        x: i.w,
        y: i.h
      });
      var o = ga(s);
      _a(s, {
        x: o.x - v.x < 1 && -i.w,
        y: o.y - v.y < 1 && -i.h
      });
      var u = ga(s);
      _a(s, e);
      l((function() {
        return n();
      }));
      return {
        D: v,
        M: u
      };
    };
    var x = function getOverflowAmount(r, a) {
      var e = t.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: b(r.w - a.w),
        h: b(r.h - a.h)
      };
      return {
        w: n.w > e ? n.w : 0,
        h: n.h > e ? n.h : 0
      };
    };
    var E = a(S, or(va, u)), A = E[0], T = E[1];
    var H = a(S, or(na, u)), P = H[0], D = H[1];
    var z = a(S), M = z[0], I = z[1];
    var L = a(w), V = L[0];
    var k = a(S), R = k[0], F = k[1];
    var N = a(w), j = N[0];
    var q = a({
      i: function _equal(r, a) {
        return er(r, a, y);
      },
      v: {}
    }, (function() {
      return oa(u) ? getStyles(u, y) : {};
    })), U = q[0];
    var B = a({
      i: function _equal(r, a) {
        return nr(r.D, a.D) && nr(r.M, a.M);
      },
      v: ha()
    }), Y = B[0], W = B[1];
    var X = Ta(Te);
    var Z = function createViewportOverflowStyleClassName(r, a) {
      var e = a ? Ya : Wa;
      return "" + e + ar(r);
    };
    var G = function setViewportOverflowStyle(r) {
      var a = function createAllOverflowStyleClassNames(r) {
        return [ K, Q, rr ].map((function(a) {
          return Z(a, r);
        }));
      };
      var e = a(true).concat(a()).join(" ");
      p(e);
      p(fr(r).map((function(a) {
        return Z(r[a], a === "x");
      })).join(" "), true);
    };
    return function(a, t) {
      var n = a.Dr, c = a.ra, l = a.la, f = a.Mr;
      var s = t.sa;
      var d = c || {}, m = d.Er, y = d.pr, S = d.Pr;
      var w = X && X.R(r, e, l, v, n);
      var E = w || {}, H = E.Z, z = E.G, L = E.$;
      var k = xe(n, v), N = k[0], q = k[1];
      var B = n("overflow"), Z = B[0], $ = B[1];
      var J = Ee(Z.x);
      var K = Ee(Z.y);
      var Q = true;
      var rr = T(f);
      var ar = D(f);
      var er = I(f);
      var tr = F(f);
      if (q && g) {
        p($a, !N);
      }
      if (xr(i, qa, Na)) {
        O(true);
      }
      var nr = z ? z() : [], vr = nr[0];
      var ir = rr = A(f), or = ir[0];
      var ur = ar = P(f), cr = ur[0];
      var lr = ta(u);
      var fr = h && aa(_());
      var dr = {
        w: b(cr.w + or.w),
        h: b(cr.h + or.h)
      };
      var pr = {
        w: b((fr ? fr.w : lr.w + b(lr.w - cr.w)) + or.w),
        h: b((fr ? fr.h : lr.h + b(lr.h - cr.h)) + or.h)
      };
      vr && vr();
      tr = R(pr);
      er = M(x(dr, pr), f);
      var _r = tr, gr = _r[0], hr = _r[1];
      var br = er, mr = br[0], yr = br[1];
      var Sr = ar, wr = Sr[0], Or = Sr[1];
      var Er = rr, Ar = Er[0], Tr = Er[1];
      var Hr = V({
        x: mr.w > 0,
        y: mr.h > 0
      }), Pr = Hr[0], Dr = Hr[1];
      var zr = J && K && (Pr.x || Pr.y) || J && Pr.x && !Pr.y || K && Pr.y && !Pr.x;
      var Mr = s || m || S || Tr || Or || hr || yr || $ || q || Q;
      var Ir = Ae(Pr, Z);
      var Lr = j(Ir.V), Vr = Lr[0], kr = Lr[1];
      var Rr = U(f), Fr = Rr[0], Nr = Rr[1];
      var jr = m || y || Nr || Dr || f;
      var qr = jr ? Y(C(Fr), f) : W(), Ur = qr[0], Br = qr[1];
      if (Mr) {
        kr && G(Ir.V);
        if (L && H) {
          setStyles(u, L(Ir, l, H(Ir, wr, Ar)));
        }
      }
      O(false);
      Cr(i, qa, Na, zr);
      Cr(o, Ka, Na, zr);
      sr(e, {
        V: Vr,
        Fr: {
          x: gr.w,
          y: gr.h
        },
        Rr: {
          x: mr.w,
          y: mr.h
        },
        ia: Pr,
        Lr: ba(Ur, mr)
      });
      return {
        na: kr,
        ea: hr,
        ta: yr,
        va: Br || yr,
        da: jr
      };
    };
  };
  var vt = function createStructureSetup(r) {
    var a;
    var e = at(r), t = e[0], n = e[1], v = e[2];
    var i = {
      oa: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      fa: false,
      W: (a = {}, a[W] = 0, a[X] = 0, a[Y] = 0, a[j] = 0, a[q] = 0, a[B] = 0, a[U] = 0, 
      a),
      Fr: {
        x: 0,
        y: 0
      },
      Rr: {
        x: 0,
        y: 0
      },
      V: {
        x: Q,
        y: Q
      },
      ia: {
        x: false,
        y: false
      },
      Lr: ha()
    };
    var o = t.gr, u = t.br, c = t.F, l = t.Or;
    var f = qe(), s = f.j, d = f.L;
    var p = !s && (d.x || d.y);
    var _ = [ et(t), tt(t, i), nt(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = p;
      var t = e && ga(u);
      var n = t && l();
      each(_, (function(e) {
        sr(a, e(r, a) || {});
      }));
      _a(u, t);
      n && n();
      !c && _a(o, 0);
      return a;
    }, i, t, v ];
  };
  var it = function createSetups(r, a, e, t, n) {
    var v = false;
    var i = Ve(a, {});
    var o = vt(r), u = o[0], c = o[1], l = o[2], f = o[3], s = o[4];
    var d = Xe(f, l, i, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = rt(r, a, g, l, f, n), b = h[0], m = h[1], y = h[3];
    var S = function updateHintsAreTruthy(r) {
      return fr(r).some((function(a) {
        return !!r[a];
      }));
    };
    var w = function update(r, n) {
      if (e()) {
        return false;
      }
      var i = r.pa, o = r.Mr, u = r.zr, l = r._a;
      var f = i || {};
      var s = !!o || !v;
      var d = {
        Dr: Ve(a, f, s),
        pa: f,
        Mr: s
      };
      if (l) {
        m(d);
        return false;
      }
      var p = n || _(sr({}, d, {
        zr: u
      }));
      var h = c(sr({}, d, {
        la: g,
        ra: p
      }));
      m(sr({}, d, {
        ra: p,
        aa: h
      }));
      var b = S(p);
      var y = S(h);
      var w = b || y || !pr(f) || s;
      v = true;
      w && t(r, {
        ra: p,
        aa: h
      });
      return w;
    };
    return [ function() {
      var r = f.ua, a = f.br, e = f.Or;
      var t = ga(r);
      var n = [ p(), u(), b() ];
      var v = e();
      _a(a, t);
      v();
      return or(N, n);
    }, w, function() {
      return {
        ga: g,
        ha: l
      };
    }, {
      ba: f,
      ma: y
    }, s ];
  };
  var ot = new WeakMap;
  var ut = function addInstance(r, a) {
    ot.set(r, a);
  };
  var ct = function removeInstance(r) {
    ot.delete(r);
  };
  var lt = function getInstance(r) {
    return ot.get(r);
  };
  var ft = function OverlayScrollbars(r, a, e) {
    var t = qe(), n = t.er;
    var v = H(r);
    var i = v ? r : r.target;
    var o = lt(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var a = dr(r);
        var e = Ta(La);
        return e ? e(a, true) : a;
      };
      var s = sr({}, n(), f(a));
      var d = Oa(), p = d[0], _ = d[1], g = d[2];
      var h = Oa(e), b = h[0], m = h[1], y = h[2];
      var S = function triggerEvent(r, a) {
        y(r, a);
        g(r, a);
      };
      var w = it(r, s, (function() {
        return u;
      }), (function(r, a) {
        var e = r.pa, t = r.Mr;
        var n = a.ra, v = a.aa;
        var i = n._r, o = n.Er, u = n.Ar, c = n.Tr, l = n.Hr, f = n.pr;
        var s = v.ea, d = v.ta, p = v.na, _ = v.va;
        S("updated", [ P, {
          updateHints: {
            sizeChanged: !!i,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            scrollCoordinatesChanged: !!_,
            contentMutation: !!c,
            hostMutation: !!l,
            appear: !!f
          },
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return S("scroll", [ P, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var T = function destroy(r) {
        ct(i);
        N(c);
        u = true;
        S("destroyed", [ P, r ]);
        _();
        m();
      };
      var P = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Le(s, sr(e, f(r)));
            if (!pr(t)) {
              sr(s, t);
              C({
                pa: t
              });
            }
          }
          return sr({}, s);
        },
        on: b,
        off: function off(r, a) {
          r && a && m(r, a);
        },
        state: function state() {
          var r = x(), a = r.ga, e = r.ha;
          var t = a.Y;
          var n = e.Fr, v = e.Rr, i = e.V, o = e.ia, c = e.oa, l = e.fa, f = e.Lr;
          return sr({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            scrollCoordinates: {
              start: f.D,
              end: f.M
            },
            padding: c,
            paddingAbsolute: l,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = E.ba, a = r.gr, e = r.hr, t = r.oa, n = r.N, v = r.mr, i = r.br, o = r.Qr;
          var u = E.ma, c = u.Xr, l = u.Jr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Vr, e = r.jr, t = r.Nr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Zr, e = r.Gr;
            var t = f(a[0]);
            return sr({}, t, {
              clone: function clone() {
                var r = f(e());
                C({
                  _a: true
                });
                return r;
              }
            });
          };
          return sr({}, {
            target: a,
            host: e,
            padding: t || n,
            viewport: n,
            content: v || n,
            scrollOffsetElement: i,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(l)
          });
        },
        update: function update(r) {
          return C({
            Mr: r,
            zr: true
          });
        },
        destroy: or(T, false),
        plugin: function plugin(r) {
          return l[fr(r)[0]];
        }
      };
      L(c, [ A ]);
      ut(i, P);
      Aa(Ca, ft, [ P, p, l ]);
      if (Je(E.ba.yr, !v && r.cancel)) {
        T(true);
        return P;
      }
      L(c, O());
      S("initialized", [ P ]);
      P.update();
      return P;
    }
    return o;
  };
  ft.plugin = function(r) {
    var a = x(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return Aa(r, ft)[0];
    }));
    Ea(e);
    return a ? t : t[0];
  };
  ft.valid = function(r) {
    var a = r && r.elements;
    var e = C(a) && a();
    return T(e) && !!lt(e.target);
  };
  ft.env = function() {
    var r = qe(), a = r.q, e = r.L, t = r.j, n = r.J, v = r.nr, i = r.vr, o = r.rr, u = r.ar, c = r.er, l = r.tr;
    return sr({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: t,
      scrollTimeline: n,
      staticDefaultInitialization: v,
      staticDefaultOptions: i,
      getDefaultInitialization: o,
      setDefaultInitialization: u,
      getDefaultOptions: c,
      setDefaultOptions: l
    });
  };
  ft.nonce = Fe;
  ft.trustedTypePolicy = qr;
  r.ClickScrollPlugin = De;
  r.OverlayScrollbars = ft;
  r.ScrollbarsHidingPlugin = He;
  r.SizeObserverPlugin = Ce;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
