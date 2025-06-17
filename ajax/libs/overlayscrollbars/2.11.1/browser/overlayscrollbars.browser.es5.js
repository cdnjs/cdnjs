/*!
 * OverlayScrollbars
 * Version: 2.11.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var e = function createCache(r, e) {
    var a = r.i, t = r.v, n = r.o;
    var i = a;
    var v;
    var o = function cacheUpdateContextual(r, e) {
      var a = i;
      var o = r;
      var u = e || (t ? !t(a, o) : a !== o);
      if (u || n) {
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
  var t = a ? window : {};
  var n = Math.max;
  var i = Math.min;
  var v = Math.round;
  var o = Math.abs;
  var u = Math.sign;
  var c = t.cancelAnimationFrame;
  var f = t.requestAnimationFrame;
  var l = t.setTimeout;
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
    var e = !!r && r.length;
    var a = S(e) && e > -1 && e % 1 == 0;
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
  var z = function animateNumber(r, e, a, t, i) {
    var v = 0;
    var o = D();
    var u = n(0, a);
    var l = function frame(a) {
      var c = D();
      var s = c - o;
      var d = s >= u;
      var p = a ? 1 : 1 - (n(0, o + u - c) / u || 0);
      var _ = (e - r) * (C(i) ? i(p, p * u, 0, 1, u) : p) + r;
      var g = d || p === 1;
      if (t) {
        t(_, p, g);
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
  var k = function from(r) {
    return Array.from(r || []);
  };
  var V = function createOrKeepArray(r) {
    if (x(r)) {
      return r;
    }
    return !w(r) && A(r) ? k(r) : [ r ];
  };
  var R = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var F = function deduplicateArray(r) {
    return k(new Set(r));
  };
  var N = function runEachAndClear(r, e, a) {
    var t = function runFn(r) {
      return r ? r.apply(void 0, e || []) : true;
    };
    each(r, t);
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
  var ar = function equal(r, e, a, t) {
    if (r && e) {
      var n = true;
      each(a, (function(a) {
        var t = r[a];
        var i = e[a];
        if (t !== i) {
          n = false;
        }
      }));
      return n;
    }
    return false;
  };
  var tr = function equalWH(r, e) {
    return ar(r, e, [ "w", "h" ]);
  };
  var nr = function equalXY(r, e) {
    return ar(r, e, [ "x", "y" ]);
  };
  var ir = function equalTRBL(r, e) {
    return ar(r, e, [ "t", "r", "b", "l" ]);
  };
  var vr = function noop() {};
  var or = function bind(r) {
    for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++) {
      a[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(a));
  };
  var ur = function selfClearTimeout(r) {
    var e;
    var a = r ? l : f;
    var t = r ? s : c;
    return [ function(n) {
      t(e);
      e = a((function() {
        return n();
      }), C(r) ? r() : r);
    }, function() {
      return t(e);
    } ];
  };
  var cr = function debounce(r, e) {
    var a = e || {}, t = a.u, n = a.p, i = a._, v = a.m;
    var o;
    var u;
    var d;
    var p;
    var _ = vr;
    var g = function invokeFunctionToDebounce(e) {
      _();
      s(o);
      p = o = u = void 0;
      _ = vr;
      r.apply(this, e);
    };
    var h = function mergeParms(r) {
      return v && u ? v(u, r) : r;
    };
    var b = function flush() {
      if (_ !== vr) {
        g(h(d) || d);
      }
    };
    var m = function debouncedFn() {
      var r = k(arguments);
      var e = C(t) ? t() : t;
      var a = S(e) && e >= 0;
      if (a) {
        var v = C(n) ? n() : n;
        var m = S(v) && v >= 0;
        var y = e > 0 ? l : f;
        var w = e > 0 ? s : c;
        var O = h(r);
        var x = O || r;
        var E = g.bind(0, x);
        var A;
        _();
        if (i && !p) {
          E();
          p = true;
          A = y((function() {
            return p = void 0;
          }), e);
        } else {
          A = y(E, e);
          if (m && !o) {
            o = l(b, v);
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
  var fr = function hasOwnProperty(r, e) {
    return Object.prototype.hasOwnProperty.call(r, e);
  };
  var lr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var sr = function assignDeep(r, e, a, t, n, i, v) {
    var o = [ e, a, t, n, i, v ];
    if ((typeof r !== "object" || m(r)) && !C(r)) {
      r = {};
    }
    each(o, (function(e) {
      each(e, (function(a, t) {
        var n = e[t];
        if (r === n) {
          return true;
        }
        var i = x(n);
        if (n && T(n)) {
          var v = r[t];
          var o = v;
          if (i && !x(v)) {
            o = [];
          } else if (!i && !T(v)) {
            o = {};
          }
          r[t] = sr(o, n);
        } else {
          r[t] = i ? n.slice() : n;
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
  var _r = function capNumber(r, e, a) {
    return n(r, i(e, a));
  };
  var gr = function getDomTokensArray(r) {
    return F((x(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    })));
  };
  var hr = function getAttr(r, e) {
    return r && r.getAttribute(e);
  };
  var br = function hasAttr(r, e) {
    return r && r.hasAttribute(e);
  };
  var mr = function setAttrs(r, e, a) {
    each(gr(e), (function(e) {
      if (r) {
        r.setAttribute(e, String(a || ""));
      }
    }));
  };
  var yr = function removeAttrs(r, e) {
    each(gr(e), (function(e) {
      return r && r.removeAttribute(e);
    }));
  };
  var Sr = function domTokenListAttr(r, e) {
    var a = gr(hr(r, e));
    var t = or(mr, r, e);
    var n = function domTokenListOperation(r, e) {
      var t = new Set(a);
      each(gr(r), (function(r) {
        t[e](r);
      }));
      return k(t).join(" ");
    };
    return {
      O: function _remove(r) {
        return t(n(r, "delete"));
      },
      C: function _add(r) {
        return t(n(r, "add"));
      },
      A: function _has(r) {
        var e = gr(r);
        return e.reduce((function(r, e) {
          return r && a.includes(e);
        }), e.length > 0);
      }
    };
  };
  var wr = function removeAttrClass(r, e, a) {
    Sr(r, e).O(a);
    return or(Or, r, e, a);
  };
  var Or = function addAttrClass(r, e, a) {
    Sr(r, e).C(a);
    return or(wr, r, e, a);
  };
  var Cr = function addRemoveAttrClass(r, e, a, t) {
    return (t ? Or : wr)(r, e, a);
  };
  var xr = function hasAttrClass(r, e, a) {
    return Sr(r, e).A(a);
  };
  var Er = function createDomTokenListClass(r) {
    return Sr(r, "class");
  };
  var Ar = function removeClass(r, e) {
    Er(r).O(e);
  };
  var Tr = function addClass(r, e) {
    Er(r).C(e);
    return or(Ar, r, e);
  };
  var Hr = function find(r, e) {
    var a = e ? P(e) && e : document;
    return a ? k(a.querySelectorAll(r)) : [];
  };
  var Pr = function findFirst(r, e) {
    var a = e ? P(e) && e : document;
    return a && a.querySelector(r);
  };
  var Dr = function is(r, e) {
    return P(r) && r.matches(e);
  };
  var zr = function isBodyElement(r) {
    return Dr(r, "body");
  };
  var Mr = function contents(r) {
    return r ? k(r.childNodes) : [];
  };
  var Ir = function parent(r) {
    return r && r.parentElement;
  };
  var Lr = function closest(r, e) {
    return P(r) && r.closest(e);
  };
  var kr = function getFocusedElement(r) {
    return document.activeElement;
  };
  var Vr = function liesBetween(r, e, a) {
    var t = Lr(r, e);
    var n = r && Pr(a, t);
    var i = Lr(n, e) === t;
    return t && n ? t === r || n === r || i && Lr(Lr(r, a), e) !== t : false;
  };
  var Rr = function removeElements(r) {
    each(V(r), (function(r) {
      var e = Ir(r);
      if (r && e) {
        e.removeChild(r);
      }
    }));
  };
  var Fr = function appendChildren(r, e) {
    return or(Rr, r && e && each(V(e), (function(e) {
      if (e) {
        r.appendChild(e);
      }
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
    var e = document.createElement("div");
    mr(e, "class", r);
    return e;
  };
  var Br = function createDOM(r) {
    var e = Ur();
    var a = jr();
    var t = r.trim();
    e.innerHTML = a ? a.createHTML(t) : t;
    return each(Mr(e), (function(r) {
      return Rr(r);
    }));
  };
  var Yr = function getCSSVal(r, e) {
    return r.getPropertyValue(e) || r[e] || "";
  };
  var Wr = function validFiniteNumber(r) {
    var e = r || 0;
    return isFinite(e) ? e : 0;
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
  function setStyles(r, e) {
    r && e && each(e, (function(e, a) {
      try {
        var t = r.style;
        var n = m(e) || O(e) ? "" : S(e) ? Gr(e) : e;
        if (a.indexOf("--") === 0) {
          t.setProperty(a, n);
        } else {
          t[a] = n;
        }
      } catch (i) {}
    }));
  }
  function getStyles(r, e, a) {
    var n = w(e);
    var i = n ? "" : {};
    if (r) {
      var v = t.getComputedStyle(r, a) || r.style;
      i = n ? Yr(v, e) : k(e).reduce((function(r, e) {
        r[e] = Yr(v, e);
        return r;
      }), i);
    }
    return i;
  }
  var $r = function topRightBottomLeft(r, e, a) {
    var t = e ? e + "-" : "";
    var n = a ? "-" + a : "";
    var i = t + "top" + n;
    var v = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Xr(c[i]),
      r: Xr(c[v]),
      b: Xr(c[o]),
      l: Xr(c[u])
    };
  };
  var Jr = function getTrasformTranslateValue(r, e) {
    return "translate" + (E(r) ? "(" + r.x + "," + r.y + ")" : (e ? "X" : "Y") + "(" + r + ")");
  };
  var Kr = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var Qr = {
    w: 0,
    h: 0
  };
  var re = function getElmWidthHeightProperty(r, e) {
    return e ? {
      w: e[r + "Width"],
      h: e[r + "Height"]
    } : Qr;
  };
  var ee = function getWindowSize(r) {
    return re("inner", r || t);
  };
  var ae = or(re, "offset");
  var te = or(re, "client");
  var ne = or(re, "scroll");
  var ie = function getFractionalSize(r) {
    var e = parseFloat(getStyles(r, $)) || 0;
    var a = parseFloat(getStyles(r, J)) || 0;
    return {
      w: e - v(e),
      h: a - v(a)
    };
  };
  var ve = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var oe = function hasDimensions(r) {
    return !!r && Kr(r);
  };
  var ue = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var ce = function domRectAppeared(r, e) {
    var a = ue(r);
    var t = ue(e);
    return !t && a;
  };
  var fe = function removeEventListener(r, e, a, t) {
    each(gr(e), (function(e) {
      if (r) {
        r.removeEventListener(e, a, t);
      }
    }));
  };
  var le = function addEventListener(r, e, a, t) {
    var n;
    var i = (n = t && t.T) != null ? n : true;
    var v = t && t.H || false;
    var o = t && t.P || false;
    var u = {
      passive: i,
      capture: v
    };
    return or(N, gr(e).map((function(e) {
      var t = o ? function(n) {
        fe(r, e, t, v);
        if (a) {
          a(n);
        }
      } : a;
      if (r) {
        r.addEventListener(e, t, u);
      }
      return or(fe, r, e, t, v);
    })));
  };
  var se = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var de = function preventDefault(r) {
    return r.preventDefault();
  };
  var pe = function stopAndPrevent(r) {
    return se(r) || de(r);
  };
  var _e = function scrollElementTo(r, e) {
    var a = S(e) ? {
      x: e,
      y: e
    } : e || {}, t = a.x, n = a.y;
    S(t) && (r.scrollLeft = t);
    S(n) && (r.scrollTop = n);
  };
  var ge = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var he = function getZeroScrollCoordinates() {
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
  var be = function sanitizeScrollCoordinates(r, e) {
    var a = r.D, t = r.M;
    var n = e.w, i = e.h;
    var v = function sanitizeAxis(r, e, a) {
      var t = u(r) * a;
      var n = u(e) * a;
      if (t === n) {
        var i = o(r);
        var v = o(e);
        n = i > v ? 0 : n;
        t = i < v ? 0 : t;
      }
      t = t === n ? 0 : t;
      return [ t + 0, n + 0 ];
    };
    var c = v(a.x, t.x, n), f = c[0], l = c[1];
    var s = v(a.y, t.y, i), d = s[0], p = s[1];
    return {
      D: {
        x: f,
        y: d
      },
      M: {
        x: l,
        y: p
      }
    };
  };
  var me = function isDefaultDirectionScrollCoordinates(r) {
    var e = r.D, a = r.M;
    var t = function getAxis(r, e) {
      return r === 0 && r <= e;
    };
    return {
      x: t(e.x, a.x),
      y: t(e.y, a.y)
    };
  };
  var ye = function getScrollCoordinatesPercent(r, e) {
    var a = r.D, t = r.M;
    var n = function getAxis(r, e, a) {
      return _r(0, 1, (r - a) / (r - e) || 0);
    };
    return {
      x: n(a.x, t.x, e.x),
      y: n(a.y, t.y, e.y)
    };
  };
  var Se = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true
      });
    }
  };
  var we = function manageListener(r, e) {
    each(V(e), r);
  };
  var Oe = function createEventListenerHub(r) {
    var e = new Map;
    var a = function removeEvent(r, a) {
      if (r) {
        var t = e.get(r);
        we((function(r) {
          if (t) {
            t[r ? "delete" : "clear"](r);
          }
        }), a);
      } else {
        e.forEach((function(r) {
          r.clear();
        }));
        e.clear();
      }
    };
    var t = function addEvent(r, n) {
      if (w(r)) {
        var i = e.get(r) || new Set;
        e.set(r, i);
        we((function(r) {
          if (C(r)) {
            i.add(r);
          }
        }), n);
        return or(a, r, n);
      }
      if (O(n) && n) {
        a();
      }
      var v = lr(r);
      var o = [];
      each(v, (function(e) {
        var a = r[e];
        if (a) {
          L(o, t(e, a));
        }
      }));
      return or(N, o);
    };
    var n = function triggerEvent(r, a) {
      each(k(e.get(r)), (function(r) {
        if (a && !R(a)) {
          r.apply(0, a);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, a, n ];
  };
  var Ce = {};
  var xe = {};
  var Ee = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        Ce[a] = r[a];
      }));
    }));
  };
  var Ae = function registerPluginModuleInstances(r, e, a) {
    return lr(r).map((function(t) {
      var n = r[t], i = n.static, v = n.instance;
      var o = a || [], u = o[0], c = o[1], f = o[2];
      var l = a ? v : i;
      if (l) {
        var s = a ? l(u, c, e) : l(e);
        return (f || xe)[t] = s;
      }
    }));
  };
  var Te = function getStaticPluginModuleInstance(r) {
    return xe[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.I && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var He = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      return r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var e = 1; e < arguments.length; e++) {
          var a = arguments[e];
          for (var t in a) {
            ({}).hasOwnProperty.call(a, t) && (r[t] = a[t]);
          }
        }
        return r;
      }, r.exports.I = true, r.exports["default"] = r.exports, _extends.apply(null, arguments);
    }
    r.exports = _extends, r.exports.I = true, r.exports["default"] = r.exports;
  })(He);
  var Pe = He.exports;
  var De = /*@__PURE__*/ getDefaultExportFromCjs(Pe);
  var ze = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Me = function validateRecursive(r, e, a, t) {
    var n = {};
    var i = De({}, e);
    var v = lr(r).filter((function(r) {
      return fr(e, r);
    }));
    each(v, (function(v) {
      var o = e[v];
      var u = r[v];
      var c = T(u);
      var f = t ? t + "." : "";
      if (c && T(o)) {
        var l = Me(u, o, a, f + v), s = l[0], d = l[1];
        n[v] = s;
        i[v] = d;
        each([ i, n ], (function(r) {
          if (pr(r[v])) {
            delete r[v];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var g = [];
        var h = y(o);
        var m = V(u);
        each(m, (function(r) {
          var e;
          each(ze, (function(a, t) {
            if (a === r) {
              e = t;
            }
          }));
          var a = b(e);
          if (a && w(o)) {
            var t = r.split(" ");
            p = !!t.find((function(r) {
              return r === o;
            }));
            L(_, t);
          } else {
            p = ze[h] === r;
          }
          L(g, a ? ze.string : e);
          return !p;
        }));
        if (p) {
          n[v] = o;
        } else if (a) {
          console.warn('The option "' + f + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ n, i ];
  };
  var Ie = function validateOptions(r, e, a) {
    return Me(r, e, a);
  };
  var Le = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Le] = {
      static: function _static() {
        var r = ze.number;
        var e = ze.boolean;
        var a = [ ze.array, ze.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var i = "never scroll leavemove";
        var v = [ e, ze.string ];
        var o = {
          paddingAbsolute: e,
          showNativeOverlaidScrollbars: e,
          update: {
            elementEvents: a,
            attributes: a,
            debounce: [ ze.number, ze.array, ze.null ],
            ignoreMutation: [ ze.function, ze.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ ze.string, ze.null ],
            visibility: n,
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: v,
            pointers: [ ze.array, ze.null ]
          }
        };
        return function(r, e) {
          var a = Ie(o, r, e), t = a[0], n = a[1];
          return De({}, n, t);
        };
      }
    }, r;
  })();
  var ke = "data-overlayscrollbars";
  var Ve = "os-environment";
  var Re = Ve + "-scrollbar-hidden";
  var Fe = ke + "-initialize";
  var Ne = "noClipping";
  var je = ke + "-body";
  var qe = ke;
  var Ue = "host";
  var Be = ke + "-viewport";
  var Ye = Z;
  var We = G;
  var Xe = "arrange";
  var Ze = "measuring";
  var Ge = "scrolling";
  var $e = "scrollbarHidden";
  var Je = "noContent";
  var Ke = ke + "-padding";
  var Qe = ke + "-content";
  var ra = "os-size-observer";
  var ea = ra + "-appear";
  var aa = ra + "-listener";
  var ta = aa + "-scroll";
  var na = aa + "-item";
  var ia = na + "-final";
  var va = "os-trinsic-observer";
  var oa = "os-theme-none";
  var ua = "os-scrollbar";
  var ca = ua + "-rtl";
  var fa = ua + "-horizontal";
  var la = ua + "-vertical";
  var sa = ua + "-track";
  var da = ua + "-handle";
  var pa = ua + "-visible";
  var _a = ua + "-cornerless";
  var ga = ua + "-interaction";
  var ha = ua + "-unusable";
  var ba = ua + "-auto-hide";
  var ma = ba + "-hidden";
  var ya = ua + "-wheel";
  var Sa = sa + "-interactive";
  var wa = da + "-interactive";
  var Oa = "__osSizeObserverPlugin";
  var Ca = /* @__PURE__ */ function(r) {
    return r = {}, r[Oa] = {
      static: function _static() {
        return function(r, e, a) {
          var t;
          var n = 3333333;
          var i = "scroll";
          var v = Br('<div class="' + na + '" dir="ltr"><div class="' + na + '"><div class="' + ia + '"></div></div><div class="' + na + '"><div class="' + ia + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
          var u = o.lastChild;
          var l = o.firstChild;
          var s = l == null ? void 0 : l.firstChild;
          var d = ae(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            _e(l, n);
            _e(u, n);
          };
          var b = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              e(r === true);
            }
          };
          var m = function onScroll(r) {
            p = ae(o);
            _ = !r || !tr(p, d);
            if (r) {
              se(r);
              if (_ && !g) {
                c(g);
                g = f(b);
              }
            } else {
              b(r === false);
            }
            h();
          };
          var y = [ Fr(r, v), le(l, i, m), le(u, i, m) ];
          Tr(r, ta);
          setStyles(s, (t = {}, t[$] = n, t[J] = n, t));
          f(h);
          return [ a ? or(m, false) : h, y ];
        };
      }
    }, r;
  }();
  var xa = function getShowNativeOverlaidScrollbars(r, e) {
    var a = e.L;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], i = t[1];
    return [ n && a.x && a.y, i ];
  };
  var Ea = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Aa = function createViewportOverflowState(r, e) {
    var a = function getAxisOverflowStyle(r, e, a, t) {
      var n = r === K ? Q : r.replace(K + "-", "");
      var i = Ea(r);
      var v = Ea(a);
      if (!e && !t) {
        return Q;
      }
      if (i && v) {
        return K;
      }
      if (i) {
        var o = e ? K : Q;
        return e && t ? n : o;
      }
      var u = v && t ? K : Q;
      return e ? n : u;
    };
    var t = {
      x: a(e.x, r.x, e.y, r.y),
      y: a(e.y, r.y, e.x, r.x)
    };
    return {
      k: t,
      V: {
        x: t.x === rr,
        y: t.y === rr
      }
    };
  };
  var Ta = "__osScrollbarsHidingPlugin";
  var Ha = /* @__PURE__ */ function(r) {
    return r = {}, r[Ta] = {
      static: function _static() {
        return {
          R: function _viewportArrangement(r, e, a, t, n) {
            var i = r.F, v = r.N;
            var o = t.j, u = t.L, c = t.q;
            var f = !i && !o && (u.x || u.y);
            var l = xa(n, t), s = l[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var e = getStyles(v, r);
                var a = e === rr;
                return [ e, a ];
              };
              var e = r(Z), a = e[0], t = e[1];
              var n = r(G), i = n[0], o = n[1];
              return {
                k: {
                  x: a,
                  y: i
                },
                V: {
                  x: t,
                  y: o
                }
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var e = r.V;
              var a = o || s ? 0 : 42;
              var t = function getHideOffsetPerAxis(r, e, t) {
                var n = r ? a : t;
                var i = e && !o ? n : 0;
                var v = r && !!a;
                return [ i, v ];
              };
              var n = t(u.x, e.x, c.x), i = n[0], v = n[1];
              var f = t(u.y, e.y, c.y), l = f[0], d = f[1];
              return {
                U: {
                  x: i,
                  y: l
                },
                B: {
                  x: v,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, a, t) {
              var n = a.Y;
              if (!i) {
                var v;
                var o = sr({}, (v = {}, v[W] = 0, v[X] = 0, v[Y] = 0, v));
                var u = p(r), c = u.U, f = u.B;
                var l = f.x, s = f.y;
                var d = c.x, _ = c.y;
                var g = e.W;
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
                  o[B] = w + (l ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, t, n) {
              if (f) {
                var i = e.W;
                var o = p(r), u = o.U, c = o.B;
                var l = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = a.Y;
                var h = g ? q : U;
                var b = i[h];
                var m = i.paddingTop;
                var y = t.w + n.w;
                var S = t.h + n.h;
                var w = {
                  w: _ && s ? _ + y - b + "px" : "",
                  h: d && l ? d + S - m + "px" : ""
                };
                setStyles(v, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return f;
            };
            var h = function _undoViewportArrange(r) {
              if (f) {
                var t = r || d();
                var n = e.W;
                var i = p(t), o = i.B;
                var u = o.x, c = o.y;
                var l = {};
                var s = function assignProps(r) {
                  return each(r, (function(r) {
                    l[r] = n[r];
                  }));
                };
                if (u) {
                  s([ X, j, B ]);
                }
                if (c) {
                  s([ Y, W, U, q ]);
                }
                var g = getStyles(v, lr(l));
                var h = wr(v, Be, Xe);
                setStyles(v, l);
                return [ function() {
                  setStyles(v, sr({}, g, _(t, a, f)));
                  h();
                }, t ];
              }
              return [ vr ];
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
  var Pa = "__osClickScrollPlugin";
  var Da = /* @__PURE__ */ function(r) {
    return r = {}, r[Pa] = {
      static: function _static() {
        return function(r, e, a, t) {
          var n = false;
          var i = vr;
          var v = 133;
          var o = 222;
          var u = ur(v), c = u[0], f = u[1];
          var l = Math.sign(e);
          var s = a * l;
          var d = s / 2;
          var p = function easing(r) {
            return 1 - (1 - r) * (1 - r);
          };
          var _ = function easedEndPressAnimation(e, a) {
            return z(e, a, o, r, p);
          };
          var g = function linearPressAnimation(a, t) {
            return z(a, e - s, v * t, (function(a, t, n) {
              r(a);
              if (n) {
                i = _(a, e);
              }
            }));
          };
          var h = z(0, s, o, (function(v, o, u) {
            r(v);
            if (u) {
              t(n);
              if (!n) {
                var f = e - v;
                var p = Math.sign(f - d) === l;
                if (p) {
                  c((function() {
                    var r = f - s;
                    var t = Math.sign(r) === l;
                    i = t ? g(v, Math.abs(r) / a) : _(v, e);
                  }));
                }
              }
            }
          }), p);
          return function(r) {
            n = true;
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
  var za = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (C(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var Ma = function getPropByPath(r, e) {
    return r ? ("" + e).split(".").reduce((function(r, e) {
      return r && fr(r, e) ? r[e] : void 0;
    }), r) : void 0;
  };
  var Ia = {
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
  var La = function getOptionsDiff(r, e) {
    var a = {};
    var t = I(lr(e), lr(r));
    each(t, (function(t) {
      var n = r[t];
      var i = e[t];
      if (E(n) && E(i)) {
        sr(a[t] = {}, La(n, i));
        if (pr(a[t])) {
          delete a[t];
        }
      } else if (fr(e, t) && i !== n) {
        var v = true;
        if (x(n) || x(i)) {
          try {
            if (za(n) === za(i)) {
              v = false;
            }
          } catch (o) {}
        }
        if (v) {
          a[t] = i;
        }
      }
    }));
    return a;
  };
  var ka = function createOptionCheck(r, e, a) {
    return function(t) {
      return [ Ma(r, t), a || Ma(e, t) !== void 0 ];
    };
  };
  var Va;
  var Ra = function getNonce() {
    return Va;
  };
  var Fa = function setNonce(r) {
    Va = r;
  };
  var Na;
  var ja = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, e, a) {
      Fr(document.body, r);
      Fr(document.body, r);
      var t = te(r);
      var n = ae(r);
      var i = ie(e);
      if (a) {
        Rr(r);
      }
      return {
        x: n.h - t.h + i.h,
        y: n.w - t.w + i.w
      };
    };
    var a = function getNativeScrollbarsHiding(r) {
      var e = false;
      var a = Tr(r, Re);
      try {
        e = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      a();
      return e;
    };
    var n = "." + Ve + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + Ve + " div{width:200%;height:200%;margin:10px 0}." + Re + "{scrollbar-width:none!important}." + Re + "::-webkit-scrollbar,." + Re + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var i = Br('<div class="' + Ve + '"><div></div><style>' + n + "</style></div>");
    var v = i[0];
    var o = v.firstChild;
    var u = v.lastChild;
    var c = Ra();
    if (c) {
      u.nonce = c;
    }
    var f = Oe(), l = f[0], s = f[2];
    var d = e({
      i: r(v, o),
      v: nr
    }, or(r, v, o, true)), p = d[0], _ = d[1];
    var g = _(), b = g[0];
    var m = a(v);
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
    var w = sr({}, Ia);
    var O = or(sr, {}, w);
    var x = or(sr, {}, S);
    var E = {
      q: b,
      L: y,
      j: m,
      J: !!h,
      K: or(l, "r"),
      rr: x,
      er: function _setDefaultInitialization(r) {
        return sr(S, r) && x();
      },
      ar: O,
      tr: function _setDefaultOptions(r) {
        return sr(w, r) && O();
      },
      nr: sr({}, S),
      ir: sr({}, w)
    };
    yr(v, "style");
    Rr(v);
    le(t, "resize", (function() {
      s("r", []);
    }));
    if (C(t.matchMedia) && !m && (!y.x || !y.y)) {
      var A = function addZoomListener(r) {
        var e = t.matchMedia("(resolution: " + t.devicePixelRatio + "dppx)");
        le(e, "change", (function() {
          r();
          A(r);
        }), {
          P: true
        });
      };
      A((function() {
        var r = p(), e = r[0], a = r[1];
        sr(E.q, e);
        s("r", [ a ]);
      }));
    }
    return E;
  };
  var qa = function getEnvironment() {
    if (!Na) {
      Na = ja();
    }
    return Na;
  };
  var Ua = function createEventContentChange(r, e, a) {
    var t = false;
    var n = a ? new WeakMap : false;
    var i = function destroy() {
      t = true;
    };
    var v = function updateElements(i) {
      if (n && a) {
        var v = a.map((function(e) {
          var a = e || [], t = a[0], n = a[1];
          var v = n && t ? (i || Hr)(t, r) : [];
          return [ v, n ];
        }));
        each(v, (function(a) {
          return each(a[0], (function(i) {
            var v = a[1];
            var o = n.get(i) || [];
            var u = r.contains(i);
            if (u && v) {
              var c = le(i, v, (function(r) {
                if (t) {
                  c();
                  n.delete(i);
                } else {
                  e(r);
                }
              }));
              n.set(i, L(o, c));
            } else {
              N(o);
              n.delete(i);
            }
          }));
        }));
      }
    };
    v();
    return [ i, v ];
  };
  var Ba = function createDOMObserver(r, e, a, t) {
    var n = false;
    var i = t || {}, v = i.vr, o = i.ur, u = i.cr, c = i.lr, f = i.sr, l = i.dr;
    var s = cr((function() {
      return n && a(true);
    }), {
      u: 33,
      p: 99
    });
    var d = Ua(r, s, u), _ = d[0], g = d[1];
    var h = v || [];
    var b = o || [];
    var m = I(h, b);
    var y = function observerCallback(n, i) {
      if (!R(i)) {
        var v = f || vr;
        var o = l || vr;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(a) {
          var n = a.attributeName, i = a.target, f = a.type, l = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var h = f === "attributes";
          var m = f === "childList";
          var y = r === i;
          var S = h && n;
          var O = S && hr(i, n || "");
          var C = w(O) ? O : null;
          var x = S && l !== C;
          var E = M(b, n) && x;
          if (e && (m || !y)) {
            var A = h && x;
            var T = A && c && Dr(i, c);
            var H = T ? !v(i, n, l, C) : !h || A;
            var P = H && !o(a, !!T, r, t);
            each(_, (function(r) {
              return L(u, r);
            }));
            each(g, (function(r) {
              return L(u, r);
            }));
            p = p || P;
          }
          if (!e && y && x && !v(i, n, l, C)) {
            L(s, n);
            d = d || E;
          }
        }));
        g((function(r) {
          return F(u).reduce((function(e, a) {
            L(e, Hr(r, a));
            return Dr(a, r) ? L(e, a) : e;
          }), []);
        }));
        if (e) {
          if (!n && p) {
            a(false);
          }
          return [ false ];
        }
        if (!R(s) || d) {
          var _ = [ F(s), d ];
          if (!n) {
            a.apply(0, _);
          }
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
        subtree: e,
        childList: e,
        characterData: e
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
  var Ya = null;
  var Wa = function createSizeObserver(r, a, t) {
    var n = t || {}, i = n.pr;
    var v = Te(Oa);
    var o = e({
      i: false,
      o: true
    }), u = o[0];
    return function() {
      var e = [];
      var t = Br('<div class="' + ra + '"><div class="' + aa + '"></div></div>');
      var n = t[0];
      var o = n.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var e = r instanceof ResizeObserverEntry;
        var t = false;
        var n = false;
        if (e) {
          var i = u(r.contentRect), v = i[0], o = i[2];
          var c = ue(v);
          n = ce(v, o);
          t = !n && !c;
        } else {
          n = r === true;
        }
        if (!t) {
          a({
            _r: true,
            pr: n
          });
        }
      };
      if (g) {
        if (!O(Ya)) {
          var f = new g(vr);
          f.observe(r, {
            get box() {
              Ya = true;
            }
          });
          Ya = Ya || false;
          f.disconnect();
        }
        var l = cr(c, {
          u: 0,
          p: 0
        });
        var s = function resizeObserverCallback(r) {
          return l(r.pop());
        };
        var d = new g(s);
        d.observe(Ya ? r : o);
        L(e, [ function() {
          return d.disconnect();
        }, !Ya && Fr(r, n) ]);
        if (Ya) {
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
        L(e, I([ Tr(n, ea), le(n, "animationstart", h), Fr(r, n) ], b));
      } else {
        return vr;
      }
      return or(N, e);
    };
  };
  var Xa = function createTrinsicObserver(r, a) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Ur(va);
    var v = e({
      i: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, e) {
      if (r) {
        var t = o(n(r));
        var i = t[1];
        return i && !e && a(t) && [ t ];
      }
    };
    var c = function intersectionObserverCallback(r, e) {
      return u(e.pop(), r);
    };
    return [ function() {
      var e = [];
      if (_) {
        t = new _(or(c, false), {
          root: r
        });
        t.observe(i);
        L(e, (function() {
          t.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = ae(i);
          u(r);
        };
        L(e, Wa(i, a)());
        a();
      }
      return or(N, L(e, Fr(r, i)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Za = function createObserversSetup(r, a, t, n) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var f;
    var l = "[" + qe + "]";
    var s = "[" + Be + "]";
    var d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var p = r.gr, _ = r.hr, h = r.N, b = r.br, m = r.mr, y = r.F, w = r.yr, O = r.Sr, E = r.wr, A = r.Or;
    var T = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var H = {
      Cr: false,
      Y: T(p)
    };
    var P = qa();
    var D = Te(Ta);
    var z = e({
      v: tr,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = D && D.R(r, a, H, P, t).G;
      var n = w && y;
      var i = !n && xr(_, qe, Ne);
      var v = !y && O(Xe);
      var o = v && ge(b);
      var u = o && A();
      var c = E(Ze, i);
      var f = v && e && e()[0];
      var l = ne(h);
      var s = ie(h);
      if (f) {
        f();
      }
      _e(b, o);
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
    var L = cr(n, {
      u: function _timeout() {
        return i;
      },
      p: function _maxDelay() {
        return v;
      },
      m: function _mergeParams(r, e) {
        var a = r[0];
        var t = e[0];
        return [ I(lr(a), lr(t)).reduce((function(r, e) {
          r[e] = a[e] || t[e];
          return r;
        }), {}) ];
      }
    });
    var k = function setDirection(r) {
      var e = T(p);
      sr(r, {
        Er: f !== e
      });
      sr(H, {
        Y: e
      });
      f = e;
    };
    var V = function onTrinsicChanged(r, e) {
      var a = r[0], t = r[1];
      var i = {
        Ar: t
      };
      sr(H, {
        Cr: a
      });
      if (!e) {
        n(i);
      }
      return i;
    };
    var R = function onSizeChanged(r) {
      var e = r._r, a = r.pr;
      var t = e && !a;
      var i = !t && P.j ? L : n;
      var v = {
        _r: e || a,
        pr: a
      };
      k(v);
      i(v);
    };
    var F = function onContentMutation(r, e) {
      var a = M(), t = a[1];
      var i = {
        Tr: t
      };
      k(i);
      var v = r ? n : L;
      if (t && !e) {
        v(i);
      }
      return i;
    };
    var N = function onHostMutation(r, e, a) {
      var t = {
        Hr: e
      };
      k(t);
      if (e && !a) {
        L(t);
      }
      return t;
    };
    var j = m ? Xa(_, V) : [], q = j[0], U = j[1];
    var B = !y && Wa(_, R, {
      pr: true
    });
    var Y = Ba(_, false, N, {
      ur: d,
      vr: d
    }), W = Y[0], X = Y[1];
    var Z = y && g && new g((function(r) {
      var e = r[r.length - 1].contentRect;
      R({
        _r: true,
        pr: ce(e, c)
      });
      c = e;
    }));
    var G = cr((function() {
      var r = M(), e = r[1];
      n({
        Tr: e
      });
    }), {
      u: 222,
      _: true
    });
    return [ function() {
      if (Z) {
        Z.observe(_);
      }
      var r = B && B();
      var e = q && q();
      var a = W();
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
        t();
      };
    }, function(r) {
      var e = r.Dr, a = r.zr, t = r.Mr;
      var n = {};
      var c = e("update.ignoreMutation"), f = c[0];
      var p = e("update.attributes"), _ = p[0], g = p[1];
      var b = e("update.elementEvents"), w = b[0], O = b[1];
      var E = e("update.debounce"), A = E[0], T = E[1];
      var H = O || g;
      var P = a || t;
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
        var z = Ba(m || h, true, F, {
          vr: I(d, _ || []),
          cr: w,
          lr: l,
          dr: function _ignoreContentChange(r, e) {
            var a = r.target, t = r.attributeName;
            var n = !e && t && !y ? Vr(a, l, s) : false;
            return n || !!Lr(a, "." + ua) || !!D(r);
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
          i = S(j) && j;
          v = S(q) && q;
        } else if (S(A)) {
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
          sr(n, N(B[0], B[1], P));
        }
        if (Y) {
          sr(n, V(Y[0], P));
        }
        if (W) {
          sr(n, F(W[0], P));
        }
      }
      k(n);
      return n;
    }, H ];
  };
  var Ga = function resolveInitialization(r, e) {
    return C(e) ? e.apply(0, r) : e;
  };
  var $a = function staticInitializationElement(r, e, a, t) {
    var n = b(t) ? a : t;
    var i = Ga(r, n);
    return i || e.apply(0, r);
  };
  var Ja = function dynamicInitializationElement(r, e, a, t) {
    var n = b(t) ? a : t;
    var i = Ga(r, n);
    return !!i && (H(i) ? i : e.apply(0, r));
  };
  var Ka = function cancelInitialization(r, e) {
    var a = e || {}, t = a.nativeScrollbarsOverlaid, n = a.body;
    var i = qa(), v = i.L, o = i.j, u = i.rr;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = t != null ? t : f;
    var d = b(n) ? l : n;
    var p = (v.x || v.y) && s;
    var _ = r && (m(d) ? !o : d);
    return !!p || !!_;
  };
  var Qa = function createScrollbarsSetupElements(r, e, a, t) {
    var n = "--os-viewport-percent";
    var i = "--os-scroll-percent";
    var v = "--os-scroll-direction";
    var o = qa(), u = o.rr;
    var c = u(), f = c.scrollbars;
    var l = f.slot;
    var s = e.gr, d = e.hr, p = e.N, _ = e.Ir, g = e.br, b = e.yr, m = e.F;
    var y = _ ? {} : r, S = y.scrollbars;
    var w = S || {}, C = w.slot;
    var x = [];
    var E = [];
    var A = [];
    var T = Ja([ s, d, p ], (function() {
      return m && b ? s : d;
    }), l, C);
    var H = function initScrollTimeline(r) {
      if (h) {
        var e = null;
        var t = [];
        var n = new h({
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
          var o = a.Lr;
          var u = me(o)[r];
          var c = r === "x";
          var f = [ Jr(0, c), Jr("calc(100cq" + (c ? "w" : "h") + " + -100%)", c) ];
          var l = u ? f : f.reverse();
          if (t[0] === l[0] && t[1] === l[1]) {
            return i;
          }
          i();
          t = l;
          e = v.kr.animate({
            clear: [ "left" ],
            transform: l
          }, {
            timeline: n
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
      var r = a.Rr, e = a.Fr;
      var t = function getAxisValue(r, e) {
        return _r(0, 1, r / (r + e) || 0);
      };
      return {
        x: t(e.x, r.x),
        y: t(e.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, e, a) {
      var t = a ? Tr : Ar;
      each(r, (function(r) {
        t(r.Nr, e);
      }));
    };
    var M = function scrollbarStyle(r, e) {
      each(r, (function(r) {
        var a = e(r), t = a[0], n = a[1];
        setStyles(t, n);
      }));
    };
    var I = function scrollbarsAddRemoveClass(r, e, a) {
      var t = O(a);
      var n = t ? a : true;
      var i = t ? !a : true;
      if (n) {
        z(E, r, e);
      }
      if (i) {
        z(A, r, e);
      }
    };
    var k = function refreshScrollbarsHandleLength() {
      var r = D();
      var e = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Nr, (a = {}, a[n] = Zr(r) + "", a) ];
        };
      };
      M(E, e(r.x));
      M(A, e(r.y));
    };
    var V = function refreshScrollbarsHandleOffset() {
      if (!h) {
        var r = a.Lr;
        var e = ye(r, ge(g));
        var t = function createScrollbarStyleFn(r) {
          return function(e) {
            var a;
            return [ e.Nr, (a = {}, a[i] = Zr(r) + "", a) ];
          };
        };
        M(E, t(e.x));
        M(A, t(e.y));
      }
    };
    var R = function refreshScrollbarsScrollCoordinates() {
      var r = a.Lr;
      var e = me(r);
      var t = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Nr, (a = {}, a[v] = r ? "0" : "1", a) ];
        };
      };
      M(E, t(e.x));
      M(A, t(e.y));
      if (h) {
        E.forEach(P.x.Vr);
        A.forEach(P.y.Vr);
      }
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !b) {
        var r = a.Rr, e = a.Lr;
        var t = me(e);
        var n = ye(e, ge(g));
        var i = function styleScrollbarPosition(e) {
          var a = e.Nr;
          var i = Ir(a) === p && a;
          var v = function getTranslateValue(r, e, a) {
            var t = e * r;
            return Gr(a ? t : -t);
          };
          return [ i, i && {
            transform: Jr({
              x: v(n.x, r.x, t.x),
              y: v(n.y, r.y, t.y)
            })
          } ];
        };
        M(E, i);
        M(A, i);
      }
    };
    var j = function generateScrollbarDOM(r) {
      var e = r ? "x" : "y";
      var a = r ? fa : la;
      var n = Ur(ua + " " + a);
      var i = Ur(sa);
      var v = Ur(da);
      var o = {
        Nr: n,
        jr: i,
        kr: v
      };
      var u = P[e];
      L(r ? E : A, o);
      L(x, [ Fr(n, i), Fr(i, v), or(Rr, n), u && u.Vr(o), t(o, I, r) ]);
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
      qr: k,
      Ur: V,
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
  var rt = function createScrollbarsSetupEvents(r, e, a, t) {
    return function(n, i, u) {
      var c = e.hr, f = e.N, s = e.F, d = e.br, p = e.Kr, _ = e.Or;
      var g = n.Nr, h = n.jr, b = n.kr;
      var m = ur(333), y = m[0], S = m[1];
      var w = ur(444), O = w[0], x = w[1];
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
        var t = "client" + (u ? "X" : "Y");
        var n = u ? $ : J;
        var i = u ? "left" : "top";
        var c = u ? "w" : "h";
        var f = u ? "x" : "y";
        var l = function createRelativeHandleMove(r, e) {
          return function(t) {
            var n;
            var i = a.Rr;
            var v = ae(h)[c] - ae(b)[c];
            var o = e * t / v;
            var u = o * i[f];
            _e(d, (n = {}, n[f] = r + u, n));
          };
        };
        var s = [];
        return le(h, "pointerdown", (function(a) {
          var u = Lr(a.target, "." + da) === b;
          var g = u ? b : h;
          var m = r.scrollbars;
          var y = m[u ? "dragScroll" : "clickScroll"];
          var S = a.button, w = a.isPrimary, C = a.pointerType;
          var A = m.pointers;
          var T = S === 0 && w && y && (A || []).includes(C);
          if (T) {
            N(s);
            x();
            var H = !u && (a.shiftKey || y === "instant");
            var P = or(ve, b);
            var D = or(ve, h);
            var z = function getHandleOffset(r, e) {
              return (r || P())[i] - (e || D())[i];
            };
            var M = v(ve(d)[n]) / ae(d)[c] || 1;
            var I = l(ge(d)[f], 1 / M);
            var k = a[t];
            var V = P();
            var R = D();
            var F = V[n];
            var j = z(V, R) + F / 2;
            var q = k - R[i];
            var U = u ? 0 : q - j;
            var B = function releasePointerCapture(r) {
              N(X);
              g.releasePointerCapture(r.pointerId);
            };
            var Y = u || H;
            var W = _();
            var X = [ le(p, e, B), le(p, "selectstart", (function(r) {
              return de(r);
            }), {
              T: false
            }), le(h, e, B), Y && le(h, "pointermove", (function(r) {
              return I(U + (r[t] - k));
            })), Y && function() {
              var r = ge(d);
              W();
              var e = ge(d);
              var a = {
                x: e.x - r.x,
                y: e.y - r.y
              };
              if (o(a.x) > 3 || o(a.y) > 3) {
                _();
                _e(d, r);
                E(a);
                O(W);
              }
            } ];
            g.setPointerCapture(a.pointerId);
            if (H) {
              I(U);
            } else if (!u) {
              var Z = Te(Pa);
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
      return or(N, [ le(b, "pointermove pointerleave", t), le(g, "pointerenter", (function() {
        i(ga, true);
      })), le(g, "pointerleave pointercancel", (function() {
        i(ga, false);
      })), !s && le(g, "mousedown", (function() {
        var r = kr();
        if (br(r, Be) || br(r, qe) || r === document.body) {
          l(or(Se, f), 25);
        }
      })), le(g, "wheel", (function(r) {
        var e = r.deltaX, a = r.deltaY, t = r.deltaMode;
        if (T && t === 0 && Ir(g) === c) {
          E({
            x: e,
            y: a
          });
        }
        T = false;
        i(ya, true);
        y((function() {
          T = true;
          i(ya);
        }));
        de(r);
      }), {
        T: false,
        H: true
      }), le(g, "pointerdown", or(le, p, "click", pe, {
        P: true,
        H: true,
        T: false
      }), {
        H: true
      }), A(), S, x ]);
    };
  };
  var et = function createScrollbarsSetup(r, e, a, t, n, i) {
    var v;
    var o;
    var u;
    var c;
    var f;
    var l = vr;
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
    var A = Qa(r, n, t, rt(e, n, t, (function(r) {
      return p(r) && j();
    }))), T = A[0], H = A[1];
    var P = n.hr, D = n.Qr, z = n.yr;
    var M = T.Wr, I = T.qr, k = T.Ur, V = T.Br, R = T.Yr;
    var F = function manageScrollbarsAutoHide(r, e) {
      E();
      if (r) {
        M(ma);
      } else {
        var a = or(M, ma, true);
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
      M(ba, r, true);
      M(ba, r, false);
    };
    var U = function onHostMouseEnter(r) {
      if (p(r)) {
        v = u;
        if (u) {
          F(true);
        }
      }
    };
    var B = [ E, y, O, h, function() {
      return l();
    }, le(P, "pointerover", U, {
      P: true
    }), le(P, "pointerenter", U), le(P, "pointerleave", (function(r) {
      if (p(r)) {
        v = false;
        if (u) {
          F(false);
        }
      }
    })), le(P, "pointermove", (function(r) {
      if (p(r) && o) {
        j();
      }
    })), le(D, "scroll", (function(r) {
      g((function() {
        k();
        j();
      }));
      i(r);
      R();
    })) ];
    return [ function() {
      return or(N, L(B, H()));
    }, function(r) {
      var e = r.Dr, n = r.Mr, i = r.re, v = r.ee;
      var d = v || {}, p = d.ae, _ = d.te, g = d.ne, h = d.ie;
      var b = i || {}, m = b.Er, y = b.pr;
      var S = a.Y;
      var O = qa(), C = O.L;
      var x = t.k, E = t.ve;
      var A = e("showNativeOverlaidScrollbars"), T = A[0], H = A[1];
      var P = e("scrollbars.theme"), L = P[0], N = P[1];
      var j = e("scrollbars.visibility"), U = j[0], B = j[1];
      var Y = e("scrollbars.autoHide"), W = Y[0], X = Y[1];
      var Z = e("scrollbars.autoHideSuspend"), G = Z[0], $ = Z[1];
      var J = e("scrollbars.autoHideDelay"), Q = J[0];
      var er = e("scrollbars.dragScroll"), ar = er[0], tr = er[1];
      var nr = e("scrollbars.clickScroll"), ir = nr[0], vr = nr[1];
      var ur = e("overflow"), cr = ur[0], fr = ur[1];
      var lr = y && !n;
      var sr = E.x || E.y;
      var dr = p || _ || h || m || n;
      var pr = g || B || fr;
      var _r = T && C.x && C.y;
      var gr = function setScrollbarVisibility(r, e, a) {
        var t = r.includes(rr) && (U === K || U === "auto" && e === rr);
        M(pa, t, a);
        return t;
      };
      s = Q;
      if (lr) {
        if (G && sr) {
          q(false);
          l();
          w((function() {
            l = le(D, "scroll", or(q, true), {
              P: true
            });
          }));
        } else {
          q(true);
        }
      }
      if (H) {
        M(oa, _r);
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
      if (tr) {
        M(wa, ar);
      }
      if (vr) {
        M(Sa, !!ir);
      }
      if (pr) {
        var hr = gr(cr.x, x.x, true);
        var br = gr(cr.y, x.y, false);
        var mr = hr && br;
        M(_a, !mr);
      }
      if (dr) {
        k();
        I();
        R();
        if (h) {
          V();
        }
        M(ha, !E.x, true);
        M(ha, !E.y, false);
        M(ca, S && !z);
      }
    }, {}, T ];
  };
  var at = function createStructureSetupElements(r) {
    var e = qa();
    var a = e.rr, n = e.j;
    var i = a(), v = i.elements;
    var o = v.padding, u = v.viewport, c = v.content;
    var f = H(r);
    var l = f ? {} : r;
    var s = l.elements;
    var d = s || {}, p = d.padding, _ = d.viewport, g = d.content;
    var h = f ? r : l.target;
    var b = zr(h);
    var m = h.ownerDocument;
    var y = m.documentElement;
    var S = function getDocumentWindow() {
      return m.defaultView || t;
    };
    var w = or($a, [ h ]);
    var O = or(Ja, [ h ]);
    var C = or(Ur, "");
    var x = or(w, C, u);
    var E = or(O, C, c);
    var A = function elementHasOverflow(r) {
      var e = ae(r);
      var a = ne(r);
      var t = getStyles(r, Z);
      var n = getStyles(r, G);
      return a.w - e.w > 0 && !Ea(t) || a.h - e.h > 0 && !Ea(n);
    };
    var T = x(_);
    var P = T === h;
    var D = P && b;
    var z = !P && E(g);
    var I = !P && T === z;
    var k = D ? y : T;
    var V = D ? k : h;
    var R = !P && O(C, o, p);
    var F = !I && z;
    var j = [ F, k, R, V ].map((function(r) {
      return H(r) && !Ir(r) && r;
    }));
    var q = function elementIsGenerated(r) {
      return r && M(j, r);
    };
    var U = !q(k) && A(k) ? k : h;
    var B = D ? y : k;
    var Y = D ? m : k;
    var W = {
      gr: h,
      hr: V,
      N: k,
      oe: R,
      mr: F,
      br: B,
      Qr: Y,
      ue: b ? y : U,
      Kr: m,
      yr: b,
      Ir: f,
      F: P,
      ce: S,
      Sr: function _viewportHasClass(r) {
        return xr(k, Be, r);
      },
      wr: function _viewportAddRemoveClass(r, e) {
        return Cr(k, Be, r, e);
      },
      Or: function _removeScrollObscuringStyles() {
        return Cr(B, Be, Ge, true);
      }
    };
    var X = W.gr, $ = W.hr, J = W.oe, K = W.N, Q = W.mr;
    var rr = [ function() {
      yr($, [ qe, Fe ]);
      yr(X, Fe);
      if (b) {
        yr(y, [ Fe, qe ]);
      }
    } ];
    var er = Mr([ Q, K, J, $, X ].find((function(r) {
      return r && !q(r);
    })));
    var ar = D ? X : Q || K;
    var tr = or(N, rr);
    var nr = function appendElements() {
      var r = S();
      var e = kr();
      var a = function unwrap(r) {
        Fr(Ir(r), Mr(r));
        Rr(r);
      };
      var t = function prepareWrapUnwrapFocus(r) {
        return le(r, "focusin focusout focus blur", pe, {
          H: true,
          T: false
        });
      };
      var i = "tabindex";
      var v = hr(K, i);
      var o = t(e);
      mr($, qe, P ? "" : Ue);
      mr(J, Ke, "");
      mr(K, Be, "");
      mr(Q, Qe, "");
      if (!P) {
        mr(K, i, v || "-1");
        if (b) {
          mr(y, je, "");
        }
      }
      Fr(ar, er);
      Fr($, J);
      Fr(J || $, !P && K);
      Fr(K, Q);
      L(rr, [ o, function() {
        var r = kr();
        var e = q(K);
        var n = e && r === K ? X : r;
        var o = t(n);
        yr(J, Ke);
        yr(Q, Qe);
        yr(K, Be);
        if (b) {
          yr(y, je);
        }
        if (v) {
          mr(K, i, v);
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
        Se(n);
        o();
      } ]);
      if (n && !P) {
        Or(K, Be, $e);
        L(rr, or(yr, K, Be));
      }
      Se(!P && b && e === X && r.top === r ? K : e);
      o();
      er = 0;
      return tr;
    };
    return [ W, nr, tr ];
  };
  var tt = function createTrinsicUpdateSegment(r) {
    var e = r.mr;
    return function(r) {
      var a = r.re, t = r.fe, n = r.Mr;
      var i = a || {}, v = i.Ar;
      var o = t.Cr;
      var u = e && (v || n);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var nt = function createPaddingUpdateSegment(r, a) {
    var t = r.hr, n = r.oe, i = r.N, v = r.F;
    var o = e({
      v: ir,
      i: $r()
    }, or($r, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Dr, t = r.re, o = r.fe, f = r.Mr;
      var l = c(f), s = l[0], d = l[1];
      var p = qa(), _ = p.j;
      var g = t || {}, h = g._r, b = g.Tr, m = g.Er;
      var y = o.Y;
      var S = e("paddingAbsolute"), w = S[0], O = S[1];
      var C = f || b;
      if (h || d || C) {
        var x = u(f);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || m || d);
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
        setStyles(n || i, z);
        setStyles(i, M);
        sr(a, {
          oe: s,
          le: !H,
          W: n ? M : sr({}, z, M)
        });
      }
      return {
        se: E
      };
    };
  };
  var it = function createOverflowUpdateSegment(r, a) {
    var i = qa();
    var v = r.hr, o = r.oe, u = r.N, c = r.F, l = r.Qr, s = r.br, d = r.yr, p = r.wr, _ = r.ce;
    var g = i.j;
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
    var y = lr(m);
    var S = {
      v: tr,
      i: {
        w: 0,
        h: 0
      }
    };
    var w = {
      v: nr,
      i: {}
    };
    var O = function setMeasuringMode(r) {
      p(Ze, !h && r);
    };
    var C = function getMeasuredScrollCoordinates(r) {
      var e = y.some((function(e) {
        var a = r[e];
        return a && m[e](a);
      }));
      if (!e) {
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
      var a = ge(s);
      var t = p(Je, true);
      var n = le(l, rr, (function(r) {
        var e = ge(s);
        if (r.isTrusted && e.x === a.x && e.y === a.y) {
          se(r);
        }
      }), {
        H: true,
        P: true
      });
      _e(s, {
        x: 0,
        y: 0
      });
      t();
      var i = ge(s);
      var v = ne(s);
      _e(s, {
        x: v.w,
        y: v.h
      });
      var o = ge(s);
      _e(s, {
        x: o.x - i.x < 1 && -v.w,
        y: o.y - i.y < 1 && -v.h
      });
      var u = ge(s);
      _e(s, a);
      f((function() {
        return n();
      }));
      return {
        D: i,
        M: u
      };
    };
    var x = function getOverflowAmount(r, e) {
      var a = t.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: b(r.w - e.w),
        h: b(r.h - e.h)
      };
      return {
        w: n.w > a ? n.w : 0,
        h: n.h > a ? n.h : 0
      };
    };
    var E = e(S, or(ie, u)), A = E[0], T = E[1];
    var H = e(S, or(ne, u)), P = H[0], D = H[1];
    var z = e(S), M = z[0], I = z[1];
    var L = e(w), k = L[0];
    var V = e(S), R = V[0], F = V[1];
    var N = e(w), j = N[0];
    var q = e({
      v: function _equal(r, e) {
        return ar(r, e, y);
      },
      i: {}
    }, (function() {
      return oe(u) ? getStyles(u, y) : {};
    })), U = q[0];
    var B = e({
      v: function _equal(r, e) {
        return nr(r.D, e.D) && nr(r.M, e.M);
      },
      i: he()
    }), Y = B[0], W = B[1];
    var X = Te(Ta);
    var Z = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? Ye : We;
      return "" + a + er(r);
    };
    var G = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ K, Q, rr ].map((function(e) {
          return Z(e, r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      p(a);
      p(lr(r).map((function(e) {
        return Z(r[e], e === "x");
      })).join(" "), true);
    };
    return function(e, t) {
      var n = e.Dr, c = e.re, f = e.fe, l = e.Mr;
      var s = t.se;
      var d = c || {}, m = d._r, y = d.Tr, S = d.Er, w = d.pr, E = d.Pr;
      var H = X && X.R(r, a, f, i, n);
      var z = H || {}, L = z.Z, V = z.G, N = z.$;
      var q = xa(n, i), B = q[0], Z = q[1];
      var $ = n("overflow"), J = $[0], K = $[1];
      var Q = Ea(J.x);
      var rr = Ea(J.y);
      var er = m || s || y || S || E || Z;
      var ar = T(l);
      var tr = D(l);
      var nr = I(l);
      var ir = F(l);
      if (Z && g) {
        p($e, !B);
      }
      if (er) {
        if (xr(v, qe, Ne)) {
          O(true);
        }
        var vr = V ? V() : [], or = vr[0];
        var ur = ar = A(l), cr = ur[0];
        var fr = tr = P(l), lr = fr[0];
        var dr = te(u);
        var pr = h && ee(_());
        var _r = {
          w: b(lr.w + cr.w),
          h: b(lr.h + cr.h)
        };
        var gr = {
          w: b((pr ? pr.w : dr.w + b(dr.w - lr.w)) + cr.w),
          h: b((pr ? pr.h : dr.h + b(dr.h - lr.h)) + cr.h)
        };
        if (or) {
          or();
        }
        ir = R(gr);
        nr = M(x(_r, gr), l);
      }
      var hr = ir, br = hr[0], mr = hr[1];
      var yr = nr, Sr = yr[0], wr = yr[1];
      var Or = tr, Er = Or[0], Ar = Or[1];
      var Tr = ar, Hr = Tr[0], Pr = Tr[1];
      var Dr = k({
        x: Sr.w > 0,
        y: Sr.h > 0
      }), zr = Dr[0], Mr = Dr[1];
      var Ir = Q && rr && (zr.x || zr.y) || Q && zr.x && !zr.y || rr && zr.y && !zr.x;
      var Lr = s || S || E || Pr || Ar || mr || wr || K || Z || er;
      var kr = Aa(zr, J);
      var Vr = j(kr.k), Rr = Vr[0], Fr = Vr[1];
      var Nr = U(l), jr = Nr[0], qr = Nr[1];
      var Ur = S || w || qr || Mr || l;
      var Br = Ur ? Y(C(jr), l) : W(), Yr = Br[0], Wr = Br[1];
      if (Lr) {
        if (Fr) {
          G(kr.k);
        }
        if (N && L) {
          setStyles(u, N(kr, f, L(kr, Er, Hr)));
        }
      }
      O(false);
      Cr(v, qe, Ne, Ir);
      Cr(o, Ke, Ne, Ir);
      sr(a, {
        k: Rr,
        Fr: {
          x: br.w,
          y: br.h
        },
        Rr: {
          x: Sr.w,
          y: Sr.h
        },
        ve: zr,
        Lr: be(Yr, Sr)
      });
      return {
        ne: Fr,
        ae: mr,
        te: wr,
        ie: Wr || wr,
        de: Ur
      };
    };
  };
  var vt = function createStructureSetup(r) {
    var e;
    var a = at(r), t = a[0], n = a[1], i = a[2];
    var v = {
      oe: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      le: false,
      W: (e = {}, e[W] = 0, e[X] = 0, e[Y] = 0, e[j] = 0, e[q] = 0, e[B] = 0, e[U] = 0, 
      e),
      Fr: {
        x: 0,
        y: 0
      },
      Rr: {
        x: 0,
        y: 0
      },
      k: {
        x: Q,
        y: Q
      },
      ve: {
        x: false,
        y: false
      },
      Lr: he()
    };
    var o = t.gr, u = t.br, c = t.F, f = t.Or;
    var l = qa(), s = l.j, d = l.L;
    var p = !s && (d.x || d.y);
    var _ = [ tt(t), nt(t, v), it(t, v) ];
    return [ n, function(r) {
      var e = {};
      var a = p;
      var t = a && ge(u);
      var n = t && f();
      each(_, (function(a) {
        sr(e, a(r, e) || {});
      }));
      _e(u, t);
      if (n) {
        n();
      }
      if (!c) {
        _e(o, 0);
      }
      return e;
    }, v, t, i ];
  };
  var ot = function createSetups(r, e, a, t, n) {
    var i = false;
    var v = ka(e, {});
    var o = vt(r), u = o[0], c = o[1], f = o[2], l = o[3], s = o[4];
    var d = Za(l, f, v, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = et(r, e, g, f, l, n), b = h[0], m = h[1], y = h[3];
    var S = function updateHintsAreTruthy(r) {
      return lr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var w = function update(r, n) {
      if (a()) {
        return false;
      }
      var v = r.pe, o = r.Mr, u = r.zr, f = r._e;
      var l = v || {};
      var s = !!o || !i;
      var d = {
        Dr: ka(e, l, s),
        pe: l,
        Mr: s
      };
      if (f) {
        m(d);
        return false;
      }
      var p = n || _(sr({}, d, {
        zr: u
      }));
      var h = c(sr({}, d, {
        fe: g,
        re: p
      }));
      m(sr({}, d, {
        re: p,
        ee: h
      }));
      var b = S(p);
      var y = S(h);
      var w = b || y || !pr(l) || s;
      i = true;
      if (w) {
        t(r, {
          re: p,
          ee: h
        });
      }
      return w;
    };
    return [ function() {
      var r = l.ue, e = l.br, a = l.Or;
      var t = ge(r);
      var n = [ p(), u(), b() ];
      var i = a();
      _e(e, t);
      i();
      return or(N, n);
    }, w, function() {
      return {
        ge: g,
        he: f
      };
    }, {
      be: l,
      me: y
    }, s ];
  };
  var ut = new WeakMap;
  var ct = function addInstance(r, e) {
    ut.set(r, e);
  };
  var ft = function removeInstance(r) {
    ut.delete(r);
  };
  var lt = function getInstance(r) {
    return ut.get(r);
  };
  var st = function OverlayScrollbars(r, e, a) {
    var t = qa(), n = t.ar;
    var i = H(r);
    var v = i ? r : r.target;
    var o = lt(v);
    if (e && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var e = dr(r);
        var a = Te(Le);
        return a ? a(e, true) : e;
      };
      var s = sr({}, n(), l(e));
      var d = Oe(), p = d[0], _ = d[1], g = d[2];
      var h = Oe(a), b = h[0], m = h[1], y = h[2];
      var S = function triggerEvent(r, e) {
        y(r, e);
        g(r, e);
      };
      var w = ot(r, s, (function() {
        return u;
      }), (function(r, e) {
        var a = r.pe, t = r.Mr;
        var n = e.re, i = e.ee;
        var v = n._r, o = n.Er, u = n.Ar, c = n.Tr, f = n.Hr, l = n.pr;
        var s = i.ae, d = i.te, p = i.ne, _ = i.ie;
        S("updated", [ P, {
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
          force: !!t
        } ]);
      }), (function(r) {
        return S("scroll", [ P, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var T = function destroy(r) {
        ft(v);
        N(c);
        u = true;
        S("destroyed", [ P, r ]);
        _();
        m();
      };
      var P = {
        options: function options(r, e) {
          if (r) {
            var a = e ? n() : {};
            var t = La(s, sr(a, l(r)));
            if (!pr(t)) {
              sr(s, t);
              C({
                pe: t
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
          var t = e.Y;
          var n = a.Fr, i = a.Rr, v = a.k, o = a.ve, c = a.oe, f = a.le, l = a.Lr;
          return sr({}, {
            overflowEdge: n,
            overflowAmount: i,
            overflowStyle: v,
            hasOverflow: o,
            scrollCoordinates: {
              start: l.D,
              end: l.M
            },
            padding: c,
            paddingAbsolute: f,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = E.be, e = r.gr, a = r.hr, t = r.oe, n = r.N, i = r.mr, v = r.br, o = r.Qr;
          var u = E.me, c = u.Xr, f = u.Jr;
          var l = function translateScrollbarStructure(r) {
            var e = r.kr, a = r.jr, t = r.Nr;
            return {
              scrollbar: t,
              track: a,
              handle: e
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var e = r.Zr, a = r.Gr;
            var t = l(e[0]);
            return sr({}, t, {
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
            padding: t || n,
            viewport: n,
            content: i || n,
            scrollOffsetElement: v,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(f)
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
          return f[lr(r)[0]];
        }
      };
      L(c, [ A ]);
      ct(v, P);
      Ae(Ce, st, [ P, p, f ]);
      if (Ka(E.be.yr, !i && r.cancel)) {
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
  st.plugin = function(r) {
    var e = x(r);
    var a = e ? r : [ r ];
    var t = a.map((function(r) {
      return Ae(r, st)[0];
    }));
    Ee(a);
    return e ? t : t[0];
  };
  st.valid = function(r) {
    var e = r && r.elements;
    var a = C(e) && e();
    return T(a) && !!lt(a.target);
  };
  st.env = function() {
    var r = qa(), e = r.q, a = r.L, t = r.j, n = r.J, i = r.nr, v = r.ir, o = r.rr, u = r.er, c = r.ar, f = r.tr;
    return sr({}, {
      scrollbarsSize: e,
      scrollbarsOverlaid: a,
      scrollbarsHiding: t,
      scrollTimeline: n,
      staticDefaultInitialization: i,
      staticDefaultOptions: v,
      getDefaultInitialization: o,
      setDefaultInitialization: u,
      getDefaultOptions: c,
      setDefaultOptions: f
    });
  };
  st.nonce = Fa;
  st.trustedTypePolicy = qr;
  r.ClickScrollPlugin = Da;
  r.OverlayScrollbars = st;
  r.ScrollbarsHidingPlugin = Ha;
  r.SizeObserverPlugin = Ca;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
