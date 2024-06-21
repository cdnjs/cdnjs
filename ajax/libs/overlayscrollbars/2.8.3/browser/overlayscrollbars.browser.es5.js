/*!
 * OverlayScrollbars
 * Version: 2.8.3
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
  var a = typeof window !== "undefined" && typeof document !== "undefined";
  var n = a ? window : {};
  var t = Math.max;
  var i = Math.min;
  var v = Math.round;
  var o = Math.abs;
  var u = Math.sign;
  var c = n.cancelAnimationFrame;
  var l = n.requestAnimationFrame;
  var f = n.setTimeout;
  var s = n.clearTimeout;
  var d = function getApi(r) {
    return typeof n[r] !== "undefined" ? n[r] : void 0;
  };
  var p = d("MutationObserver");
  var _ = d("IntersectionObserver");
  var g = d("ResizeObserver");
  var h = d("ScrollTimeline");
  var m = a && Node.ELEMENT_NODE;
  var b = Object.prototype, S = b.toString, y = b.hasOwnProperty;
  var w = /^\[object (.+)\]$/;
  var O = function isUndefined(r) {
    return r === void 0;
  };
  var C = function isNull(r) {
    return r === null;
  };
  var x = function type(r) {
    return O(r) || C(r) ? "" + r : S.call(r).replace(w, "$1").toLowerCase();
  };
  var E = function isNumber(r) {
    return typeof r === "number";
  };
  var A = function isString(r) {
    return typeof r === "string";
  };
  var H = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var T = function isFunction(r) {
    return typeof r === "function";
  };
  var P = function isArray(r) {
    return Array.isArray(r);
  };
  var D = function isObject(r) {
    return typeof r === "object" && !P(r) && !C(r);
  };
  var z = function isArrayLike(r) {
    var e = !!r && r.length;
    var a = E(e) && e > -1 && e % 1 == 0;
    return P(r) || !T(r) && a ? e > 0 && D(r) ? e - 1 in r : true : false;
  };
  var L = function isPlainObject(r) {
    if (!r || !D(r)) {
      return false;
    }
    var e;
    var a = "constructor";
    var n = r[a];
    var t = n && n.prototype;
    var i = y.call(r, a);
    var v = t && y.call(t, "isPrototypeOf");
    if (n && !i && !v) {
      return false;
    }
    for (e in r) {}
    return O(e) || y.call(r, e);
  };
  var M = function isHTMLElement(r) {
    var e = HTMLElement;
    return r ? e ? r instanceof e : r.nodeType === m : false;
  };
  var k = function isElement(r) {
    var e = Element;
    return r ? e ? r instanceof e : r.nodeType === m : false;
  };
  var I = function animationCurrentTime() {
    return performance.now();
  };
  var R = function animateNumber(r, e, a, n, i) {
    var v = 0;
    var o = I();
    var u = t(0, a);
    var f = function frame(a) {
      var c = I();
      var f = c - o;
      var s = f >= u;
      var d = a ? 1 : 1 - (t(0, o + u - c) / u || 0);
      var p = (e - r) * (T(i) ? i(d, d * u, 0, 1, u) : d) + r;
      var _ = s || d === 1;
      n && n(p, d, _);
      v = _ ? 0 : l((function() {
        return frame();
      }));
    };
    f();
    return function(r) {
      c(v);
      r && f(r);
    };
  };
  function each(r, e) {
    if (z(r)) {
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
  var V = function inArray(r, e) {
    return r.indexOf(e) >= 0;
  };
  var N = function concat(r, e) {
    return r.concat(e);
  };
  var j = function push(r, e, a) {
    !a && !A(e) && z(e) ? Array.prototype.push.apply(r, e) : r.push(e);
    return r;
  };
  var F = function from(r) {
    return Array.from(r || []);
  };
  var U = function createOrKeepArray(r) {
    return P(r) ? r : [ r ];
  };
  var q = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var B = function deduplicateArray(r) {
    return F(new Set(r));
  };
  var Y = function runEachAndClear(r, e, a) {
    var n = function runFn(r) {
      return r && r.apply(void 0, e || []);
    };
    each(r, n);
    !a && (r.length = 0);
  };
  var W = "paddingTop";
  var X = "paddingRight";
  var Z = "paddingLeft";
  var K = "paddingBottom";
  var G = "marginLeft";
  var $ = "marginRight";
  var J = "marginBottom";
  var Q = "overflowX";
  var rr = "overflowY";
  var er = "width";
  var ar = "height";
  var nr = "visible";
  var tr = "hidden";
  var ir = "scroll";
  var vr = function capitalizeFirstLetter(r) {
    var e = String(r || "");
    return e ? e[0].toUpperCase() + e.slice(1) : "";
  };
  var or = function equal(r, e, a, n) {
    if (r && e) {
      var t = true;
      each(a, (function(a) {
        var i = n ? n(r[a]) : r[a];
        var v = n ? n(e[a]) : e[a];
        if (i !== v) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var ur = function equalWH(r, e) {
    return or(r, e, [ "w", "h" ]);
  };
  var cr = function equalXY(r, e) {
    return or(r, e, [ "x", "y" ]);
  };
  var lr = function equalTRBL(r, e) {
    return or(r, e, [ "t", "r", "b", "l" ]);
  };
  var fr = function noop() {};
  var sr = function bind(r) {
    for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) {
      a[n - 1] = arguments[n];
    }
    return r.bind.apply(r, [ 0 ].concat(a));
  };
  var dr = function selfClearTimeout(r) {
    var e;
    var a = r ? f : l;
    var n = r ? s : c;
    return [ function(t) {
      n(e);
      e = a((function() {
        return t();
      }), T(r) ? r() : r);
    }, function() {
      return n(e);
    } ];
  };
  var pr = function debounce(r, e) {
    var a = e || {}, n = a.u, t = a.p, i = a._, v = a.m;
    var o;
    var u;
    var d;
    var p;
    var _ = fr;
    var g = function invokeFunctionToDebounce(e) {
      _();
      s(o);
      p = o = u = void 0;
      _ = fr;
      r.apply(this, e);
    };
    var h = function mergeParms(r) {
      return v && u ? v(u, r) : r;
    };
    var m = function flush() {
      if (_ !== fr) {
        g(h(d) || d);
      }
    };
    var b = function debouncedFn() {
      var r = F(arguments);
      var e = T(n) ? n() : n;
      var a = E(e) && e >= 0;
      if (a) {
        var v = T(t) ? t() : t;
        var b = E(v) && v >= 0;
        var S = e > 0 ? f : l;
        var y = e > 0 ? s : c;
        var w = h(r);
        var O = w || r;
        var C = g.bind(0, O);
        var x;
        _();
        if (i && !p) {
          C();
          p = true;
          x = S((function() {
            return p = void 0;
          }), e);
        } else {
          x = S(C, e);
          if (b && !o) {
            o = f(m, v);
          }
        }
        _ = function clear() {
          return y(x);
        };
        u = d = O;
      } else {
        g(r);
      }
    };
    b.S = m;
    return b;
  };
  var _r = function hasOwnProperty(r, e) {
    return Object.prototype.hasOwnProperty.call(r, e);
  };
  var gr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var hr = function assignDeep(r, e, a, n, t, i, v) {
    var o = [ e, a, n, t, i, v ];
    if ((typeof r !== "object" || C(r)) && !T(r)) {
      r = {};
    }
    each(o, (function(e) {
      each(e, (function(a, n) {
        var t = e[n];
        if (r === t) {
          return true;
        }
        var i = P(t);
        if (t && L(t)) {
          var v = r[n];
          var o = v;
          if (i && !P(v)) {
            o = [];
          } else if (!i && !L(v)) {
            o = {};
          }
          r[n] = assignDeep(o, t);
        } else {
          r[n] = i ? t.slice() : t;
        }
      }));
    }));
    return r;
  };
  var mr = function removeUndefinedProperties(r, e) {
    return each(hr({}, r), (function(r, a, n) {
      if (r === void 0) {
        delete n[a];
      } else if (e && r && L(r)) {
        n[a] = removeUndefinedProperties(r, e);
      }
    }));
  };
  var br = function isEmptyObject(r) {
    for (var e in r) {
      return false;
    }
    return true;
  };
  var Sr = function capNumber(r, e, a) {
    return t(r, i(e, a));
  };
  var yr = function getDomTokensArray(r) {
    return F(new Set((P(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    }))));
  };
  var wr = function getAttr(r, e) {
    return r && r.getAttribute(e);
  };
  var Or = function hasAttr(r, e) {
    return r && r.hasAttribute(e);
  };
  var Cr = function setAttrs(r, e, a) {
    each(yr(e), (function(e) {
      r && r.setAttribute(e, String(a || ""));
    }));
  };
  var xr = function removeAttrs(r, e) {
    each(yr(e), (function(e) {
      return r && r.removeAttribute(e);
    }));
  };
  var Er = function domTokenListAttr(r, e) {
    var a = yr(wr(r, e));
    var n = sr(Cr, r, e);
    var t = function domTokenListOperation(r, e) {
      var n = new Set(a);
      each(yr(r), (function(r) {
        n[e](r);
      }));
      return F(n).join(" ");
    };
    return {
      O: function _remove(r) {
        return n(t(r, "delete"));
      },
      C: function _add(r) {
        return n(t(r, "add"));
      },
      A: function _has(r) {
        var e = yr(r);
        return e.reduce((function(r, e) {
          return r && a.includes(e);
        }), e.length > 0);
      }
    };
  };
  var Ar = function removeAttrClass(r, e, a) {
    Er(r, e).O(a);
    return sr(Hr, r, e, a);
  };
  var Hr = function addAttrClass(r, e, a) {
    Er(r, e).C(a);
    return sr(Ar, r, e, a);
  };
  var Tr = function addRemoveAttrClass(r, e, a, n) {
    return (n ? Hr : Ar)(r, e, a);
  };
  var Pr = function hasAttrClass(r, e, a) {
    return Er(r, e).A(a);
  };
  var Dr = function createDomTokenListClass(r) {
    return Er(r, "class");
  };
  var zr = function removeClass(r, e) {
    Dr(r).O(e);
  };
  var Lr = function addClass(r, e) {
    Dr(r).C(e);
    return sr(zr, r, e);
  };
  var Mr = function find(r, e) {
    var a = [];
    var n = e ? k(e) && e : document;
    return n ? j(a, n.querySelectorAll(r)) : a;
  };
  var kr = function findFirst(r, e) {
    var a = e ? k(e) && e : document;
    return a ? a.querySelector(r) : null;
  };
  var Ir = function is(r, e) {
    if (k(r)) {
      return r.matches(e);
    }
    return false;
  };
  var Rr = function isBodyElement(r) {
    return Ir(r, "body");
  };
  var Vr = function contents(r) {
    return r ? F(r.childNodes) : [];
  };
  var Nr = function parent(r) {
    return r && r.parentElement;
  };
  var jr = function closest(r, e) {
    return k(r) && r.closest(e);
  };
  var Fr = function getFocusedElement(r) {
    return (r || document).activeElement;
  };
  var Ur = function liesBetween(r, e, a) {
    var n = jr(r, e);
    var t = r && kr(a, n);
    var i = jr(t, e) === n;
    return n && t ? n === r || t === r || i && jr(jr(r, a), e) !== n : false;
  };
  var qr = function removeElements(r) {
    if (z(r)) {
      each(F(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var e = Nr(r);
      e && e.removeChild(r);
    }
  };
  var Br = function before(r, e, a) {
    if (a && r) {
      var n = e;
      var t;
      if (z(a)) {
        t = document.createDocumentFragment();
        each(a, (function(r) {
          if (r === n) {
            n = r.previousSibling;
          }
          t.appendChild(r);
        }));
      } else {
        t = a;
      }
      if (e) {
        if (!n) {
          n = r.firstChild;
        } else if (n !== e) {
          n = n.nextSibling;
        }
      }
      r.insertBefore(t, n || null);
      return function() {
        return qr(a);
      };
    }
    return fr;
  };
  var Yr = function appendChildren(r, e) {
    return Br(r, null, e);
  };
  var Wr = function insertAfter(r, e) {
    return Br(Nr(r), r && r.nextSibling, e);
  };
  var Xr = function createDiv(r) {
    var e = document.createElement("div");
    Cr(e, "class", r);
    return e;
  };
  var Zr = function createDOM(r) {
    var e = Xr();
    e.innerHTML = r.trim();
    return each(Vr(e), (function(r) {
      return qr(r);
    }));
  };
  var Kr = /^--/;
  var Gr = function getCSSVal(r, e) {
    return r.getPropertyValue(e) || r[e] || "";
  };
  var $r = function validFiniteNumber(r) {
    var e = r || 0;
    return isFinite(e) ? e : 0;
  };
  var Jr = function parseToZeroOrNumber(r) {
    return $r(parseFloat(r || ""));
  };
  var Qr = function ratioToCssPercent(r) {
    return ($r(r) * 100).toFixed(3) + "%";
  };
  var re = function numberToCssPx(r) {
    return $r(r) + "px";
  };
  function setStyles(r, e) {
    r && e && each(e, (function(e, a) {
      try {
        var n = r.style;
        var t = E(e) ? re(e) : (e || "") + "";
        if (Kr.test(a)) {
          n.setProperty(a, t);
        } else {
          n[a] = t;
        }
      } catch (i) {}
    }));
  }
  function getStyles(r, e, a) {
    var t = A(e);
    var i = t ? "" : {};
    if (r) {
      var v = n.getComputedStyle(r, a) || r.style;
      i = t ? Gr(v, e) : F(e).reduce((function(r, e) {
        r[e] = Gr(v, e);
        return r;
      }), i);
    }
    return i;
  }
  var ee = function topRightBottomLeft(r, e, a) {
    var n = e ? e + "-" : "";
    var t = a ? "-" + a : "";
    var i = n + "top" + t;
    var v = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Jr(c[i]),
      r: Jr(c[v]),
      b: Jr(c[o]),
      l: Jr(c[u])
    };
  };
  var ae = function getTrasformTranslateValue(r, e) {
    return "translate" + (D(r) ? "(" + r.x + "," + r.y + ")" : (e ? "X" : "Y") + "(" + r + ")");
  };
  var ne = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var te = {
    w: 0,
    h: 0
  };
  var ie = function getElmWidthHeightProperty(r, e) {
    return e ? {
      w: e[r + "Width"],
      h: e[r + "Height"]
    } : te;
  };
  var ve = function getWindowSize(r) {
    return ie("inner", r || n);
  };
  var oe = sr(ie, "offset");
  var ue = sr(ie, "client");
  var ce = sr(ie, "scroll");
  var le = function getFractionalSize(r) {
    var e = parseFloat(getStyles(r, er)) || 0;
    var a = parseFloat(getStyles(r, ar)) || 0;
    return {
      w: e - v(e),
      h: a - v(a)
    };
  };
  var fe = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var se = function hasDimensions(r) {
    return !!r && ne(r);
  };
  var de = function domRectHasDimensions(r) {
    return !!(r && (r[ar] || r[er]));
  };
  var pe = function domRectAppeared(r, e) {
    var a = de(r);
    var n = de(e);
    return !n && a;
  };
  var _e = function removeEventListener(r, e, a, n) {
    each(yr(e), (function(e) {
      r && r.removeEventListener(e, a, n);
    }));
  };
  var ge = function addEventListener(r, e, a, n) {
    var t;
    var i = (t = n && n.H) != null ? t : true;
    var v = n && n.T || false;
    var o = n && n.P || false;
    var u = {
      passive: i,
      capture: v
    };
    return sr(Y, yr(e).map((function(e) {
      var n = o ? function(t) {
        _e(r, e, n, v);
        a && a(t);
      } : a;
      r && r.addEventListener(e, n, u);
      return sr(_e, r, e, n, v);
    })));
  };
  var he = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var me = function preventDefault(r) {
    return r.preventDefault();
  };
  var be = function stopAndPrevent(r) {
    return he(r) || me(r);
  };
  var Se = function scrollElementTo(r, e) {
    var a = E(e) ? {
      x: e,
      y: e
    } : e || {}, n = a.x, t = a.y;
    E(n) && (r.scrollLeft = n);
    E(t) && (r.scrollTop = t);
  };
  var ye = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var we = function getZeroScrollCoordinates() {
    return {
      D: {
        x: 0,
        y: 0
      },
      L: {
        x: 0,
        y: 0
      }
    };
  };
  var Oe = function sanitizeScrollCoordinates(r, e) {
    var a = r.D, n = r.L;
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
    var c = v(a.x, n.x, t), l = c[0], f = c[1];
    var s = v(a.y, n.y, i), d = s[0], p = s[1];
    return {
      D: {
        x: l,
        y: d
      },
      L: {
        x: f,
        y: p
      }
    };
  };
  var Ce = function isDefaultDirectionScrollCoordinates(r) {
    var e = r.D, a = r.L;
    var n = function getAxis(r, e) {
      return r === 0 && r <= e;
    };
    return {
      x: n(e.x, a.x),
      y: n(e.y, a.y)
    };
  };
  var xe = function getScrollCoordinatesPercent(r, e) {
    var a = r.D, n = r.L;
    var t = function getAxis(r, e, a) {
      return Sr(0, 1, (r - a) / (r - e) || 0);
    };
    return {
      x: t(a.x, n.x, e.x),
      y: t(a.y, n.y, e.y)
    };
  };
  var Ee = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true
      });
    }
  };
  var Ae = function manageListener(r, e) {
    each(U(e), r);
  };
  var He = function createEventListenerHub(r) {
    var e = new Map;
    var a = function removeEvent(r, a) {
      if (r) {
        var n = e.get(r);
        Ae((function(r) {
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
    var n = function addEvent(r, n) {
      if (A(r)) {
        var t = e.get(r) || new Set;
        e.set(r, t);
        Ae((function(r) {
          T(r) && t.add(r);
        }), n);
        return sr(a, r, n);
      }
      if (H(n) && n) {
        a();
      }
      var i = gr(r);
      var v = [];
      each(i, (function(e) {
        var a = r[e];
        a && j(v, addEvent(e, a));
      }));
      return sr(Y, v);
    };
    var t = function triggerEvent(r, a) {
      each(F(e.get(r)), (function(r) {
        if (a && !q(a)) {
          r.apply(0, a);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, a, t ];
  };
  var Te = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (T(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var Pe = function getPropByPath(r, e) {
    return r ? ("" + e).split(".").reduce((function(r, e) {
      return r && _r(r, e) ? r[e] : void 0;
    }), r) : void 0;
  };
  var De = {
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
  var ze = function getOptionsDiff(r, e) {
    var a = {};
    var n = N(gr(e), gr(r));
    each(n, (function(n) {
      var t = r[n];
      var i = e[n];
      if (D(t) && D(i)) {
        hr(a[n] = {}, getOptionsDiff(t, i));
        if (br(a[n])) {
          delete a[n];
        }
      } else if (_r(e, n) && i !== t) {
        var v = true;
        if (P(t) || P(i)) {
          try {
            if (Te(t) === Te(i)) {
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
  var Le = function createOptionCheck(r, e, a) {
    return function(n) {
      return [ Pe(r, n), a || Pe(e, n) !== void 0 ];
    };
  };
  var Me = "data-overlayscrollbars";
  var ke = "os-environment";
  var Ie = ke + "-scrollbar-hidden";
  var Re = Me + "-initialize";
  var Ve = "noClipping";
  var Ne = Me + "-body";
  var je = Me;
  var Fe = "host";
  var Ue = Me + "-viewport";
  var qe = Q;
  var Be = rr;
  var Ye = "arrange";
  var We = "measuring";
  var Xe = "scrollbarHidden";
  var Ze = "scrollbarPressed";
  var Ke = "noContent";
  var Ge = Me + "-padding";
  var $e = Me + "-content";
  var Je = "os-size-observer";
  var Qe = Je + "-appear";
  var ra = Je + "-listener";
  var ea = ra + "-scroll";
  var aa = ra + "-item";
  var na = aa + "-final";
  var ta = "os-trinsic-observer";
  var ia = "os-theme-none";
  var va = "os-scrollbar";
  var oa = va + "-rtl";
  var ua = va + "-horizontal";
  var ca = va + "-vertical";
  var la = va + "-track";
  var fa = va + "-handle";
  var sa = va + "-visible";
  var da = va + "-cornerless";
  var pa = va + "-interaction";
  var _a = va + "-unusable";
  var ga = va + "-auto-hide";
  var ha = ga + "-hidden";
  var ma = va + "-wheel";
  var ba = la + "-interactive";
  var Sa = fa + "-interactive";
  var ya;
  var wa = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, e, a) {
      Yr(document.body, r);
      Yr(document.body, r);
      var n = ue(r);
      var t = oe(r);
      var i = le(e);
      a && qr(r);
      return {
        x: t.h - n.h + i.h,
        y: t.w - n.w + i.w
      };
    };
    var a = function getNativeScrollbarsHiding(r) {
      var e = false;
      var a = Lr(r, Ie);
      try {
        e = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (n) {}
      a();
      return e;
    };
    var t = "." + ke + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + ke + " div{width:200%;height:200%;margin:10px 0}." + Ie + "{scrollbar-width:none!important}." + Ie + "::-webkit-scrollbar,." + Ie + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var i = Zr('<div class="' + ke + '"><div></div><style>' + t + "</style></div>");
    var v = i[0];
    var o = v.firstChild;
    var u = He(), c = u[0], l = u[2];
    var f = e({
      i: r(v, o),
      v: cr
    }, sr(r, v, o, true)), s = f[0], d = f[1];
    var p = d(), _ = p[0];
    var g = a(v);
    var m = {
      x: _.x === 0,
      y: _.y === 0
    };
    var b = {
      elements: {
        host: null,
        padding: !g,
        viewport: function viewport(r) {
          return g && Rr(r) && r;
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
    var S = hr({}, De);
    var y = sr(hr, {}, S);
    var w = sr(hr, {}, b);
    var O = {
      M: _,
      k: m,
      I: g,
      R: !!h,
      V: sr(c, "r"),
      N: w,
      j: function _setDefaultInitialization(r) {
        return hr(b, r) && w();
      },
      F: y,
      U: function _setDefaultOptions(r) {
        return hr(S, r) && y();
      },
      q: hr({}, b),
      B: hr({}, S)
    };
    xr(v, "style");
    qr(v);
    ge(n, "resize", (function() {
      l("r", []);
    }));
    if (T(n.matchMedia) && !g && (!m.x || !m.y)) {
      var C = function addZoomListener(r) {
        var e = n.matchMedia("(resolution: " + n.devicePixelRatio + "dppx)");
        ge(e, "change", (function() {
          r();
          addZoomListener(r);
        }), {
          P: true
        });
      };
      C((function() {
        var r = s(), e = r[0], a = r[1];
        hr(O.M, e);
        l("r", [ a ]);
      }));
    }
    return O;
  };
  var Oa = function getEnvironment() {
    if (!ya) {
      ya = wa();
    }
    return ya;
  };
  var Ca = function resolveInitialization(r, e) {
    return T(e) ? e.apply(0, r) : e;
  };
  var xa = function staticInitializationElement(r, e, a, n) {
    var t = O(n) ? a : n;
    var i = Ca(r, t);
    return i || e.apply(0, r);
  };
  var Ea = function dynamicInitializationElement(r, e, a, n) {
    var t = O(n) ? a : n;
    var i = Ca(r, t);
    return !!i && (M(i) ? i : e.apply(0, r));
  };
  var Aa = function cancelInitialization(r, e) {
    var a = e || {}, n = a.nativeScrollbarsOverlaid, t = a.body;
    var i = Oa(), v = i.k, o = i.I, u = i.N;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = n != null ? n : l;
    var d = O(t) ? f : t;
    var p = (v.x || v.y) && s;
    var _ = r && (C(d) ? !o : d);
    return !!p || !!_;
  };
  var Ha = new WeakMap;
  var Ta = function addInstance(r, e) {
    Ha.set(r, e);
  };
  var Pa = function removeInstance(r) {
    Ha.delete(r);
  };
  var Da = function getInstance(r) {
    return Ha.get(r);
  };
  var za = function createEventContentChange(r, e, a) {
    var n = false;
    var t = a ? new WeakMap : false;
    var i = function destroy() {
      n = true;
    };
    var v = function updateElements(i) {
      if (t && a) {
        var v = a.map((function(e) {
          var a = e || [], n = a[0], t = a[1];
          var v = t && n ? (i || Mr)(n, r) : [];
          return [ v, t ];
        }));
        each(v, (function(a) {
          return each(a[0], (function(i) {
            var v = a[1];
            var o = t.get(i) || [];
            var u = r.contains(i);
            if (u && v) {
              var c = ge(i, v, (function(r) {
                if (n) {
                  c();
                  t.delete(i);
                } else {
                  e(r);
                }
              }));
              t.set(i, j(o, c));
            } else {
              Y(o);
              t.delete(i);
            }
          }));
        }));
      }
    };
    v();
    return [ i, v ];
  };
  var La = function createDOMObserver(r, e, a, n) {
    var t = false;
    var i = n || {}, v = i.Y, o = i.W, u = i.X, c = i.Z, l = i.K, f = i.G;
    var s = pr((function() {
      return t && a(true);
    }), {
      u: 33,
      p: 99
    });
    var d = za(r, s, u), _ = d[0], g = d[1];
    var h = v || [];
    var m = o || [];
    var b = N(h, m);
    var S = function observerCallback(t, i) {
      if (!q(i)) {
        var v = l || fr;
        var o = f || fr;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(a) {
          var t = a.attributeName, i = a.target, l = a.type, f = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var h = l === "attributes";
          var b = l === "childList";
          var S = r === i;
          var y = h && t;
          var w = y && wr(i, t || "");
          var O = A(w) ? w : null;
          var C = y && f !== O;
          var x = V(m, t) && C;
          if (e && (b || !S)) {
            var E = h && C;
            var H = E && c && Ir(i, c);
            var T = H ? !v(i, t, f, O) : !h || E;
            var P = T && !o(a, !!H, r, n);
            each(_, (function(r) {
              return j(u, r);
            }));
            each(g, (function(r) {
              return j(u, r);
            }));
            p = p || P;
          }
          if (!e && S && C && !v(i, t, f, O)) {
            j(s, t);
            d = d || x;
          }
        }));
        g((function(r) {
          return B(u).reduce((function(e, a) {
            j(e, Mr(r, a));
            return Ir(a, r) ? j(e, a) : e;
          }), []);
        }));
        if (e) {
          !t && p && a(false);
          return [ false ];
        }
        if (!q(s) || d) {
          var _ = [ B(s), d ];
          !t && a.apply(0, _);
          return _;
        }
      }
    };
    var y = new p(sr(S, false));
    return [ function() {
      y.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: b,
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
        s.S();
        return S(true, y.takeRecords());
      }
    } ];
  };
  var Ma = {};
  var ka = {};
  var Ia = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        Ma[a] = r[a];
      }));
    }));
  };
  var Ra = function registerPluginModuleInstances(r, e, a) {
    return gr(r).map((function(n) {
      var t = r[n], i = t.static, v = t.instance;
      var o = a || [], u = o[0], c = o[1], l = o[2];
      var f = a ? v : i;
      if (f) {
        var s = a ? f(u, c, e) : f(e);
        return (l || ka)[n] = s;
      }
    }));
  };
  var Va = function getStaticPluginModuleInstance(r) {
    return ka[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.$ && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Na = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var e = 1; e < arguments.length; e++) {
          var a = arguments[e];
          for (var n in a) {
            if (Object.prototype.hasOwnProperty.call(a, n)) {
              r[n] = a[n];
            }
          }
        }
        return r;
      }, r.exports.$ = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.$ = true, r.exports["default"] = r.exports;
  })(Na);
  var ja = Na.exports;
  var Fa = /*@__PURE__*/ getDefaultExportFromCjs(ja);
  var Ua = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var qa = function validateRecursive(r, e, a, n) {
    var t = {};
    var i = Fa({}, e);
    var v = gr(r).filter((function(r) {
      return _r(e, r);
    }));
    each(v, (function(v) {
      var o = e[v];
      var u = r[v];
      var c = L(u);
      var l = n ? n + "." : "";
      if (c && L(o)) {
        var f = validateRecursive(u, o, a, l + v), s = f[0], d = f[1];
        t[v] = s;
        i[v] = d;
        each([ i, t ], (function(r) {
          if (br(r[v])) {
            delete r[v];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var g = [];
        var h = x(o);
        var m = U(u);
        each(m, (function(r) {
          var e;
          each(Ua, (function(a, n) {
            if (a === r) {
              e = n;
            }
          }));
          var a = O(e);
          if (a && A(o)) {
            var n = r.split(" ");
            p = !!n.find((function(r) {
              return r === o;
            }));
            j(_, n);
          } else {
            p = Ua[h] === r;
          }
          j(g, a ? Ua.string : e);
          return !p;
        }));
        if (p) {
          t[v] = o;
        } else if (a) {
          console.warn('The option "' + l + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ t, i ];
  };
  var Ba = function validateOptions(r, e, a) {
    return qa(r, e, a);
  };
  var Ya = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Ya] = {
      static: function _static() {
        var r = Ua.number;
        var e = Ua.boolean;
        var a = [ Ua.array, Ua.null ];
        var n = "hidden scroll visible visible-hidden";
        var t = "visible hidden auto";
        var i = "never scroll leavemove";
        var v = {
          paddingAbsolute: e,
          showNativeOverlaidScrollbars: e,
          update: {
            elementEvents: a,
            attributes: a,
            debounce: [ Ua.number, Ua.array, Ua.null ],
            ignoreMutation: [ Ua.function, Ua.null ]
          },
          overflow: {
            x: n,
            y: n
          },
          scrollbars: {
            theme: [ Ua.string, Ua.null ],
            visibility: t,
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: e,
            pointers: [ Ua.array, Ua.null ]
          }
        };
        return function(r, e) {
          var a = Ba(v, r, e), n = a[0], t = a[1];
          return Fa({}, t, n);
        };
      }
    }, r;
  })();
  var Wa = "__osSizeObserverPlugin";
  var Xa = /* @__PURE__ */ function(r) {
    return r = {}, r[Wa] = {
      static: function _static() {
        return function(r, e, a) {
          var n;
          var t = 3333333;
          var i = "scroll";
          var v = Zr('<div class="' + aa + '" dir="ltr"><div class="' + aa + '"><div class="' + na + '"></div></div><div class="' + aa + '"><div class="' + na + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
          var u = o.lastChild;
          var f = o.firstChild;
          var s = f == null ? void 0 : f.firstChild;
          var d = oe(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            Se(f, t);
            Se(u, t);
          };
          var m = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              e(r === true);
            }
          };
          var b = function onScroll(r) {
            p = oe(o);
            _ = !r || !ur(p, d);
            if (r) {
              he(r);
              if (_ && !g) {
                c(g);
                g = l(m);
              }
            } else {
              m(r === false);
            }
            h();
          };
          var S = [ Yr(r, v), ge(f, i, b), ge(u, i, b) ];
          Lr(r, ea);
          setStyles(s, (n = {}, n[er] = t, n[ar] = t, n));
          l(h);
          return [ a ? sr(b, false) : h, S ];
        };
      }
    }, r;
  }();
  var Za = function getShowNativeOverlaidScrollbars(r, e) {
    var a = e.k;
    var n = r("showNativeOverlaidScrollbars"), t = n[0], i = n[1];
    return [ t && a.x && a.y, i ];
  };
  var Ka = function overflowIsVisible(r) {
    return r.indexOf(nr) === 0;
  };
  var Ga = function createViewportOverflowState(r, e) {
    var a = function getAxisOverflowStyle(r, e, a, n) {
      var t = r === nr ? tr : r.replace(nr + "-", "");
      var i = Ka(r);
      var v = Ka(a);
      if (!e && !n) {
        return tr;
      }
      if (i && v) {
        return nr;
      }
      if (i) {
        var o = e ? nr : tr;
        return e && n ? t : o;
      }
      var u = v && n ? nr : tr;
      return e ? t : u;
    };
    var n = {
      x: a(e.x, r.x, e.y, r.y),
      y: a(e.y, r.y, e.x, r.x)
    };
    return {
      J: n,
      rr: {
        x: n.x === ir,
        y: n.y === ir
      }
    };
  };
  var $a = "__osScrollbarsHidingPlugin";
  var Ja = /* @__PURE__ */ function(r) {
    return r = {}, r[$a] = {
      static: function _static() {
        return {
          er: function _viewportArrangement(r, e, a, n, t) {
            var i = r.ar, v = r.nr;
            var o = n.I, u = n.k, c = n.M;
            var l = !i && !o && (u.x || u.y);
            var f = Za(t, n), s = f[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var e = getStyles(v, r);
                var a = e === ir;
                return [ e, a ];
              };
              var e = r(Q), a = e[0], n = e[1];
              var t = r(rr), i = t[0], o = t[1];
              return {
                J: {
                  x: a,
                  y: i
                },
                rr: {
                  x: n,
                  y: o
                }
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var e = r.rr;
              var a = o || s ? 0 : 42;
              var n = function getHideOffsetPerAxis(r, e, n) {
                var t = r ? a : n;
                var i = e && !o ? t : 0;
                var v = r && !!a;
                return [ i, v ];
              };
              var t = n(u.x, e.x, c.x), i = t[0], v = t[1];
              var l = n(u.y, e.y, c.y), f = l[0], d = l[1];
              return {
                tr: {
                  x: i,
                  y: f
                },
                ir: {
                  x: v,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, a, n) {
              var t = a.vr;
              if (!i) {
                var v;
                var o = hr({}, (v = {}, v[$] = 0, v[J] = 0, v[G] = 0, v));
                var u = p(r), c = u.tr, l = u.ir;
                var f = l.x, s = l.y;
                var d = c.x, _ = c.y;
                var g = e.ur;
                var h = t ? G : $;
                var m = t ? Z : X;
                var b = g[h];
                var S = g[J];
                var y = g[m];
                var w = g[K];
                o[er] = "calc(100% + " + (_ + b * -1) + "px)";
                o[h] = -_ + b;
                o[J] = -d + S;
                if (n) {
                  o[m] = y + (s ? _ : 0);
                  o[K] = w + (f ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, n, t) {
              if (l) {
                var i = e.ur;
                var o = p(r), u = o.tr, c = o.ir;
                var f = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = a.vr;
                var h = g ? X : Z;
                var m = i[h];
                var b = i.paddingTop;
                var S = n.w + t.w;
                var y = n.h + t.h;
                var w = {
                  w: _ && s ? _ + S - m + "px" : "",
                  h: d && f ? d + y - b + "px" : ""
                };
                setStyles(v, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return l;
            };
            var h = function _undoViewportArrange(r) {
              if (l) {
                var n = r || d();
                var t = e.ur;
                var i = p(n), o = i.ir;
                var u = o.x, c = o.y;
                var f = {};
                var s = function assignProps(r) {
                  return each(r, (function(r) {
                    f[r] = t[r];
                  }));
                };
                if (u) {
                  s([ J, W, K ]);
                }
                if (c) {
                  s([ G, $, Z, X ]);
                }
                var g = getStyles(v, gr(f));
                var h = Ar(v, Ue, Ye);
                setStyles(v, f);
                return [ function() {
                  setStyles(v, hr({}, g, _(n, a, l)));
                  h();
                }, n ];
              }
              return [ fr ];
            };
            return {
              cr: p,
              lr: g,
              sr: h,
              dr: _
            };
          }
        };
      }
    }, r;
  }();
  var Qa = "__osClickScrollPlugin";
  var rn = /* @__PURE__ */ function(r) {
    return r = {}, r[Qa] = {
      static: function _static() {
        return function(r, e, a, n, t) {
          var i = 0;
          var v = fr;
          var o = function animateClickScroll(o) {
            v = R(o, o + n * Math.sign(a), 133, (function(a, o, u) {
              r(a);
              var c = e();
              var l = c + n;
              var s = t >= c && t <= l;
              if (u && !s) {
                if (i) {
                  animateClickScroll(a);
                } else {
                  var d = f((function() {
                    animateClickScroll(a);
                  }), 222);
                  v = function clear() {
                    clearTimeout(d);
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
        };
      }
    }, r;
  }();
  var en = function createSizeObserver(r, a, n) {
    var t = n || {}, i = t.pr;
    var v = Va(Wa);
    var o = e({
      i: false,
      o: true
    }), u = o[0];
    return function() {
      var e = [];
      var n = Zr('<div class="' + Je + '"><div class="' + ra + '"></div></div>');
      var t = n[0];
      var o = t.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var e = r instanceof ResizeObserverEntry;
        var n = false;
        var t = false;
        if (e) {
          var i = u(r.contentRect), v = i[0], o = i[2];
          var c = de(v);
          t = pe(v, o);
          n = !t && !c;
        } else {
          t = r === true;
        }
        if (!n) {
          a({
            _r: true,
            pr: t
          });
        }
      };
      if (g) {
        var l = new g((function(r) {
          return c(r.pop());
        }));
        l.observe(o);
        j(e, (function() {
          l.disconnect();
        }));
      } else if (v) {
        var f = v(o, c, i), s = f[0], d = f[1];
        j(e, N([ Lr(t, Qe), ge(t, "animationstart", s) ], d));
      } else {
        return fr;
      }
      return sr(Y, j(e, Yr(r, t)));
    };
  };
  var an = function createTrinsicObserver(r, a) {
    var n;
    var t = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Xr(ta);
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
        n = new _(sr(c, false), {
          root: r
        });
        n.observe(i);
        j(e, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = oe(i);
          u(r);
        };
        j(e, en(i, a)());
        a();
      }
      return sr(Y, j(e, Yr(r, i)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var nn = function createObserversSetup(r, a, n, t) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var l;
    var f = "[" + je + "]";
    var s = "[" + Ue + "]";
    var d = [];
    var p = [ "wrap", "cols", "rows" ];
    var _ = [ "id", "class", "style", "open" ];
    var h = r.gr, m = r.hr, b = r.nr, S = r.mr, y = r.br, w = r.Sr, O = r.ar, C = r.yr, x = r.wr, A = r.Or;
    var H = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var D = {
      Cr: false,
      vr: H(h)
    };
    var z = Oa();
    var L = Va($a);
    var M = e({
      v: ur,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = L && L.er(r, a, D, z, n).sr;
      var t = C && O;
      var i = !t && Pr(m, je, Ve);
      var v = !O && x(Ye);
      var o = v && ye(S);
      var u = A(We, i);
      var c = v && e && e()[0];
      var l = ce(b);
      var f = le(b);
      c && c();
      Se(S, o);
      i && u();
      return {
        w: l.w + f.w,
        h: l.h + f.h
      };
    })), k = M[0];
    var I = w ? p : N(_, p);
    var R = pr(t, {
      u: function _timeout() {
        return i;
      },
      p: function _maxDelay() {
        return v;
      },
      m: function _mergeParams(r, e) {
        var a = r[0];
        var n = e[0];
        return [ N(gr(a), gr(n)).reduce((function(r, e) {
          r[e] = a[e] || n[e];
          return r;
        }), {}) ];
      }
    });
    var V = function setDirection(r) {
      var e = H(h);
      hr(r, {
        Er: l !== e
      });
      hr(D, {
        vr: e
      });
      l = e;
    };
    var j = function onTrinsicChanged(r, e) {
      var a = r[0], n = r[1];
      var i = {
        Ar: n
      };
      hr(D, {
        Cr: a
      });
      !e && t(i);
      return i;
    };
    var F = function onSizeChanged(r) {
      var e = r._r, a = r.pr;
      var n = e && !a;
      var i = !n && z.I ? R : t;
      var v = {
        _r: e || a,
        pr: a
      };
      V(v);
      i(v);
    };
    var U = function onContentMutation(r, e) {
      var a = k(), n = a[1];
      var i = {
        Hr: n
      };
      V(i);
      var v = r ? t : R;
      n && !e && v(i);
      return i;
    };
    var q = function onHostMutation(r, e, a) {
      var n = {
        Tr: e
      };
      V(n);
      if (e && !a) {
        R(n);
      }
      return n;
    };
    var B = y ? an(m, j) : [], Y = B[0], W = B[1];
    var X = !O && en(m, F, {
      pr: true
    });
    var Z = La(m, false, q, {
      W: _,
      Y: N(_, d)
    }), K = Z[0], G = Z[1];
    var $ = O && g && new g((function(r) {
      var e = r[r.length - 1].contentRect;
      F({
        _r: true,
        pr: pe(e, c)
      });
      c = e;
    }));
    var J = pr((function() {
      var r = k(), e = r[1];
      t({
        Hr: e
      });
    }), {
      u: 222,
      _: true
    });
    return [ function() {
      $ && $.observe(m);
      var r = X && X();
      var e = Y && Y();
      var a = K();
      var n = z.V((function(r) {
        if (r) {
          R({
            Pr: r
          });
        } else {
          J();
        }
      }));
      return function() {
        $ && $.disconnect();
        r && r();
        e && e();
        u && u();
        a();
        n();
      };
    }, function(r) {
      var e = r.Dr, a = r.zr, n = r.Lr;
      var t = {};
      var c = e("update.ignoreMutation"), l = c[0];
      var d = e("update.attributes"), p = d[0], _ = d[1];
      var g = e("update.elementEvents"), h = g[0], m = g[1];
      var S = e("update.debounce"), w = S[0], C = S[1];
      var x = m || _;
      var A = a || n;
      var H = function ignoreMutationFromOptions(r) {
        return T(l) && l(r);
      };
      if (x) {
        o && o();
        u && u();
        var D = La(y || b, true, U, {
          Y: N(I, p || []),
          X: h,
          Z: f,
          G: function _ignoreContentChange(r, e) {
            var a = r.target, n = r.attributeName;
            var t = !e && n && !O ? Ur(a, f, s) : false;
            return t || !!jr(a, "." + va) || !!H(r);
          }
        }), z = D[0], L = D[1];
        u = z();
        o = L;
      }
      if (C) {
        R.S();
        if (P(w)) {
          var M = w[0];
          var k = w[1];
          i = E(M) && M;
          v = E(k) && k;
        } else if (E(w)) {
          i = w;
          v = false;
        } else {
          i = false;
          v = false;
        }
      }
      if (A) {
        var F = G();
        var B = W && W();
        var Y = o && o();
        F && hr(t, q(F[0], F[1], A));
        B && hr(t, j(B[0], A));
        Y && hr(t, U(Y[0], A));
      }
      V(t);
      return t;
    }, D ];
  };
  var tn = function createScrollbarsSetupElements(r, e, a, n) {
    var t = Oa(), i = t.N;
    var v = i(), o = v.scrollbars;
    var u = o.slot;
    var c = e.gr, l = e.hr, f = e.nr, s = e.Mr, d = e.mr, p = e.yr, _ = e.ar;
    var g = s ? {} : r, m = g.scrollbars;
    var b = m || {}, S = b.slot;
    var y = new Map;
    var w = function initScrollTimeline(r) {
      return h && new h({
        source: d,
        axis: r
      });
    };
    var O = {
      x: w("x"),
      y: w("y")
    };
    var C = Ea([ c, l, f ], (function() {
      return _ && p ? c : l;
    }), u, S);
    var x = function getScrollbarHandleLengthRatio(r, e) {
      if (e) {
        var n = r ? er : ar;
        var t = e.kr, i = e.Ir;
        var v = fe(i)[n];
        var o = fe(t)[n];
        return Sr(0, 1, v / o || 0);
      }
      var u = r ? "x" : "y";
      var c = a.Rr, l = a.Vr;
      var f = l[u];
      var s = c[u];
      return Sr(0, 1, f / (f + s) || 0);
    };
    var E = function getScrollbarHandleOffsetRatio(r, e, a) {
      var n = x(a, r);
      return 1 / n * (1 - n) * e;
    };
    var A = function addDirectionRTLKeyframes(r) {
      return hr(r, {
        clear: [ "left" ]
      });
    };
    var T = function cancelElementAnimations(r) {
      y.forEach((function(e, a) {
        var n = r ? V(U(r), a) : true;
        if (n) {
          each(e || [], (function(r) {
            r && r.cancel();
          }));
          y.delete(a);
        }
      }));
    };
    var P = function setElementAnimation(r, e, a, n) {
      var t = y.get(r) || [];
      var i = t.find((function(r) {
        return r && r.timeline === e;
      }));
      if (i) {
        i.effect = new KeyframeEffect(r, a, {
          composite: n
        });
      } else {
        y.set(r, N(t, [ r.animate(a, {
          timeline: e,
          composite: n
        }) ]));
      }
    };
    var D = function scrollbarStructureAddRemoveClass(r, e, a) {
      var n = a ? Lr : zr;
      each(r, (function(r) {
        n(r.Nr, e);
      }));
    };
    var z = function scrollbarStyle(r, e) {
      each(r, (function(r) {
        var a = e(r), n = a[0], t = a[1];
        setStyles(n, t);
      }));
    };
    var L = function scrollbarStructureRefreshHandleLength(r, e) {
      z(r, (function(r) {
        var a;
        var n = r.Ir;
        return [ n, (a = {}, a[e ? er : ar] = Qr(x(e)), a) ];
      }));
    };
    var M = function scrollbarStructureRefreshHandleOffset(r, e) {
      var n = a.jr;
      var t = e ? "x" : "y";
      var i = O[t];
      var v = Ce(n)[t];
      var o = function getAxisTransformValue(r, a) {
        return ae(Qr(E(r, v ? a : 1 - a, e)), e);
      };
      if (i) {
        each(r, (function(r) {
          var e = r.Ir;
          P(e, i, A({
            transform: [ 0, 1 ].map((function(e) {
              return o(r, e);
            }))
          }));
        }));
      } else {
        z(r, (function(r) {
          return [ r.Ir, {
            transform: o(r, xe(n, ye(d))[t])
          } ];
        }));
      }
    };
    var k = function doRefreshScrollbarOffset(r) {
      return _ && !p && Nr(r) === f;
    };
    var I = [];
    var R = [];
    var F = [];
    var q = function scrollbarsAddRemoveClass(r, e, a) {
      var n = H(a);
      var t = n ? a : true;
      var i = n ? !a : true;
      t && D(R, r, e);
      i && D(F, r, e);
    };
    var B = function refreshScrollbarsHandleLength() {
      L(R, true);
      L(F);
    };
    var W = function refreshScrollbarsHandleOffset() {
      M(R, true);
      M(F);
    };
    var X = function refreshScrollbarsScrollbarOffset() {
      if (_) {
        var r = a.Rr, e = a.jr;
        var n = Ce(e);
        var t = .5;
        if (O.x && O.y) {
          each(N(F, R), (function(e) {
            var a = e.Nr;
            if (k(a)) {
              var i = function setScrollbarElementAnimation(e) {
                return P(a, O[e], A({
                  transform: [ 0, n[e] ? 1 : -1 ].map((function(a) {
                    return ae(re(a * (r[e] - t)), e === "x");
                  }))
                }), "add");
              };
              i("x");
              i("y");
            } else {
              T(a);
            }
          }));
        } else {
          var i = xe(e, ye(d));
          var v = function styleScrollbarPosition(e) {
            var a = e.Nr;
            var t = k(a) && a;
            var v = function getTranslateValue(r, e, a) {
              var n = e * r;
              return re(a ? n : -n);
            };
            return [ t, t && {
              transform: ae({
                x: v(i.x, r.x, n.x),
                y: v(i.y, r.y, n.y)
              })
            } ];
          };
          z(R, v);
          z(F, v);
        }
      }
    };
    var Z = function generateScrollbarDOM(r) {
      var e = r ? ua : ca;
      var a = Xr(va + " " + e);
      var t = Xr(la);
      var i = Xr(fa);
      var v = {
        Nr: a,
        kr: t,
        Ir: i
      };
      j(r ? R : F, v);
      j(I, [ Yr(a, t), Yr(t, i), sr(qr, a), T, n(v, q, M, r) ]);
      return v;
    };
    var K = sr(Z, true);
    var G = sr(Z, false);
    var $ = function appendElements() {
      Yr(C, R[0].Nr);
      Yr(C, F[0].Nr);
      return sr(Y, I);
    };
    K();
    G();
    return [ {
      Fr: B,
      Ur: W,
      qr: X,
      Br: q,
      Yr: {
        R: O.x,
        Wr: R,
        Xr: K,
        Zr: sr(z, R)
      },
      Kr: {
        R: O.y,
        Wr: F,
        Xr: G,
        Zr: sr(z, F)
      }
    }, $ ];
  };
  var vn = function createScrollbarsSetupEvents(r, e, a, n) {
    return function(t, i, u, c) {
      var l = e.hr, s = e.nr, d = e.ar, p = e.mr, _ = e.Gr, g = e.Or;
      var h = t.Nr, m = t.kr, b = t.Ir;
      var S = dr(333), y = S[0], w = S[1];
      var O = dr(444), C = O[0], x = O[1];
      var E = dr(), A = E[0], H = E[1];
      var P = sr(u, [ t ], c);
      var D = function scrollOffsetElementScrollBy(r) {
        T(p.scrollBy) && p.scrollBy({
          behavior: "smooth",
          left: r.x,
          top: r.y
        });
      };
      var z = c ? er : ar;
      var L = function createInteractiveScrollEvents() {
        var e = "pointerup pointercancel lostpointercapture";
        var n = "client" + (c ? "X" : "Y");
        var t = c ? "left" : "top";
        var i = c ? "w" : "h";
        var u = c ? "x" : "y";
        var l = function createRelativeHandleMove(r, e) {
          return function(n) {
            var t;
            var v = a.Rr;
            var o = oe(m)[i] - oe(b)[i];
            var c = e * n / o;
            var l = c * v[u];
            Se(p, (t = {}, t[u] = r + l, t));
          };
        };
        return ge(m, "pointerdown", (function(a) {
          var c = jr(a.target, "." + fa) === b;
          var f = c ? b : m;
          var s = r.scrollbars;
          var d = a.button, h = a.isPrimary, S = a.pointerType;
          var y = s.pointers;
          var w = d === 0 && h && s[c ? "dragScroll" : "clickScroll"] && (y || []).includes(S);
          if (w) {
            x();
            var O = !c && a.shiftKey;
            var E = sr(fe, b);
            var A = sr(fe, m);
            var H = function getHandleOffset(r, e) {
              return (r || E())[t] - (e || A())[t];
            };
            var T = v(fe(p)[z]) / oe(p)[i] || 1;
            var P = l(ye(p)[u], 1 / T);
            var L = a[n];
            var M = E();
            var k = A();
            var I = M[z];
            var R = H(M, k) + I / 2;
            var V = L - k[t];
            var N = c ? 0 : V - R;
            var F = function releasePointerCapture(r) {
              Y(B);
              f.releasePointerCapture(r.pointerId);
            };
            var U = function addScrollbarPressedClass() {
              return g(Ze, true);
            };
            var q = U();
            var B = [ function() {
              var r = ye(p);
              q();
              var e = ye(p);
              var a = {
                x: e.x - r.x,
                y: e.y - r.y
              };
              if (o(a.x) > 3 || o(a.y) > 3) {
                U();
                Se(p, r);
                D(a);
                C(q);
              }
            }, ge(_, e, F), ge(_, "selectstart", (function(r) {
              return me(r);
            }), {
              H: false
            }), ge(m, e, F), ge(m, "pointermove", (function(r) {
              var e = r[n] - L;
              if (c || O) {
                P(N + e);
              }
            })) ];
            f.setPointerCapture(a.pointerId);
            if (O) {
              P(N);
            } else if (!c) {
              var W = Va(Qa);
              W && j(B, W(P, H, N, I, V));
            }
          }
        }));
      };
      var M = true;
      var k = function isAffectingTransition(r) {
        return r.propertyName.indexOf(z) > -1;
      };
      return sr(Y, [ ge(b, "pointermove pointerleave", n), ge(h, "pointerenter", (function() {
        i(pa, true);
      })), ge(h, "pointerleave pointercancel", (function() {
        i(pa, false);
      })), !d && ge(h, "mousedown", (function() {
        var r = Fr();
        if (Or(r, Ue) || Or(r, je) || r === document.body) {
          f(sr(Ee, s), 25);
        }
      })), ge(h, "wheel", (function(r) {
        var e = r.deltaX, a = r.deltaY, n = r.deltaMode;
        if (M && n === 0 && Nr(h) === l) {
          D({
            x: e,
            y: a
          });
        }
        M = false;
        i(ma, true);
        y((function() {
          M = true;
          i(ma);
        }));
        me(r);
      }), {
        H: false,
        T: true
      }), ge(b, "transitionstart", (function(r) {
        if (k(r)) {
          var e = function animateHandleOffset() {
            P();
            A(animateHandleOffset);
          };
          e();
        }
      })), ge(b, "transitionend transitioncancel", (function(r) {
        if (k(r)) {
          H();
          P();
        }
      })), ge(h, "pointerdown", sr(ge, _, "click", be, {
        P: true,
        T: true,
        H: false
      }), {
        T: true
      }), L(), w, x, H ]);
    };
  };
  var on = function createScrollbarsSetup(r, e, a, n, t, i) {
    var v;
    var o;
    var u;
    var c;
    var l;
    var f = fr;
    var s = 0;
    var d = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var p = dr(), _ = p[0], g = p[1];
    var h = dr(100), m = h[0], b = h[1];
    var S = dr(100), y = S[0], w = S[1];
    var O = dr((function() {
      return s;
    })), C = O[0], x = O[1];
    var E = tn(r, t, n, vn(e, t, n, (function(r) {
      return d(r) && R();
    }))), A = E[0], H = E[1];
    var T = t.hr, P = t.$r, D = t.yr;
    var z = A.Br, L = A.Fr, M = A.Ur, k = A.qr;
    var I = function manageScrollbarsAutoHide(r, e) {
      x();
      if (r) {
        z(ha);
      } else {
        var a = sr(z, ha, true);
        if (s > 0 && !e) {
          C(a);
        } else {
          a();
        }
      }
    };
    var R = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !v : !c) {
        I(true);
        m((function() {
          I(false);
        }));
      }
    };
    var V = function manageAutoHideSuspension(r) {
      z(ga, r, true);
      z(ga, r, false);
    };
    var N = function onHostMouseEnter(r) {
      if (d(r)) {
        v = u;
        u && I(true);
      }
    };
    var F = [ x, b, w, g, function() {
      return f();
    }, ge(T, "pointerover", N, {
      P: true
    }), ge(T, "pointerenter", N), ge(T, "pointerleave", (function(r) {
      if (d(r)) {
        v = false;
        u && I(false);
      }
    })), ge(T, "pointermove", (function(r) {
      d(r) && o && R();
    })), ge(P, "scroll", (function(r) {
      _((function() {
        M();
        R();
      }));
      i(r);
      k();
    })) ];
    return [ function() {
      return sr(Y, j(F, H()));
    }, function(r) {
      var e = r.Dr, t = r.Lr, i = r.Jr, v = r.Qr;
      var d = v || {}, p = d.re, _ = d.ee, g = d.ae, h = d.ne;
      var m = i || {}, b = m.Er, S = m.pr;
      var w = a.vr;
      var O = Oa(), C = O.k;
      var x = n.J, E = n.te;
      var A = e("showNativeOverlaidScrollbars"), H = A[0], T = A[1];
      var R = e("scrollbars.theme"), N = R[0], j = R[1];
      var F = e("scrollbars.visibility"), U = F[0], q = F[1];
      var B = e("scrollbars.autoHide"), Y = B[0], W = B[1];
      var X = e("scrollbars.autoHideSuspend"), Z = X[0], K = X[1];
      var G = e("scrollbars.autoHideDelay"), $ = G[0];
      var J = e("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var er = e("scrollbars.clickScroll"), ar = er[0], tr = er[1];
      var vr = e("overflow"), or = vr[0], ur = vr[1];
      var cr = S && !t;
      var lr = E.x || E.y;
      var fr = p || _ || h || b || t;
      var dr = g || q || ur;
      var pr = H && C.x && C.y;
      var _r = function setScrollbarVisibility(r, e, a) {
        var n = r.includes(ir) && (U === nr || U === "auto" && e === ir);
        z(sa, n, a);
        return n;
      };
      s = $;
      if (cr) {
        if (Z && lr) {
          V(false);
          f();
          y((function() {
            f = ge(P, "scroll", sr(V, true), {
              P: true
            });
          }));
        } else {
          V(true);
        }
      }
      if (T) {
        z(ia, pr);
      }
      if (j) {
        z(l);
        z(N, true);
        l = N;
      }
      if (K && !Z) {
        V(true);
      }
      if (W) {
        o = Y === "move";
        u = Y === "leave";
        c = Y === "never";
        I(c, true);
      }
      if (rr) {
        z(Sa, Q);
      }
      if (tr) {
        z(ba, ar);
      }
      if (dr) {
        var gr = _r(or.x, x.x, true);
        var hr = _r(or.y, x.y, false);
        var mr = gr && hr;
        z(da, !mr);
      }
      if (fr) {
        L();
        M();
        k();
        z(_a, !E.x, true);
        z(_a, !E.y, false);
        z(oa, w && !D);
      }
    }, {}, A ];
  };
  var un = function createStructureSetupElements(r) {
    var e = Oa();
    var a = e.N, t = e.I;
    var i = a(), v = i.elements;
    var o = v.host, u = v.padding, c = v.viewport, l = v.content;
    var f = M(r);
    var s = f ? {} : r;
    var d = s.elements;
    var p = d || {}, _ = p.host, g = p.padding, h = p.viewport, m = p.content;
    var b = f ? r : s.target;
    var S = Rr(b);
    var y = Ir(b, "textarea");
    var w = b.ownerDocument;
    var O = w.documentElement;
    var C = function getDocumentWindow() {
      return w.defaultView || n;
    };
    var x = sr(xa, [ b ]);
    var E = sr(Ea, [ b ]);
    var A = sr(Xr, "");
    var H = sr(x, A, c);
    var T = sr(E, A, l);
    var P = H(h);
    var D = P === b;
    var z = D && S;
    var L = !D && T(m);
    var k = !D && P === L;
    var I = z ? O : P;
    var R = y ? x(A, o, _) : b;
    var N = z ? I : R;
    var F = !D && E(A, u, g);
    var U = !k && L;
    var q = [ U, I, F, N ].map((function(r) {
      return M(r) && !Nr(r) && r;
    }));
    var B = function elementIsGenerated(r) {
      return r && V(q, r);
    };
    var W = B(I) ? b : I;
    var X = {
      gr: b,
      hr: N,
      nr: I,
      ie: F,
      br: U,
      mr: z ? O : I,
      $r: z ? w : I,
      ve: S ? O : W,
      Gr: w,
      Sr: y,
      yr: S,
      Mr: f,
      ar: D,
      oe: C,
      wr: function _viewportHasClass(r) {
        return Pr(I, Ue, r);
      },
      Or: function _viewportAddRemoveClass(r, e) {
        return Tr(I, Ue, r, e);
      }
    };
    var Z = X.gr, K = X.hr, G = X.ie, $ = X.nr, J = X.br;
    var Q = [ function() {
      xr(K, [ je, Re ]);
      xr(Z, Re);
      if (S) {
        xr(O, [ Re, je ]);
      }
    } ];
    var rr = y && B(K);
    var er = y ? Z : Vr([ J, $, G, K, Z ].find((function(r) {
      return r && !B(r);
    })));
    var ar = z ? Z : J || $;
    var nr = sr(Y, Q);
    var tr = function appendElements() {
      var r = C();
      var e = Fr();
      var a = function unwrap(r) {
        Yr(Nr(r), Vr(r));
        qr(r);
      };
      var n = function prepareWrapUnwrapFocus(r) {
        return ge(r, "focusin focusout focus blur", be, {
          T: true,
          H: false
        });
      };
      var i = "tabindex";
      var v = wr($, i);
      var o = n(e);
      Cr(K, je, D ? "" : Fe);
      Cr(G, Ge, "");
      Cr($, Ue, "");
      Cr(J, $e, "");
      if (!D) {
        Cr($, i, v || "-1");
        S && Cr(O, Ne, "");
      }
      if (rr) {
        Wr(Z, K);
        j(Q, (function() {
          Wr(K, Z);
          qr(K);
        }));
      }
      Yr(ar, er);
      Yr(K, G);
      Yr(G || K, !D && $);
      Yr($, J);
      j(Q, [ o, function() {
        var r = Fr();
        var e = B($);
        var t = e && r === $ ? Z : r;
        var o = n(t);
        xr(G, Ge);
        xr(J, $e);
        xr($, Ue);
        S && xr(O, Ne);
        v ? Cr($, i, v) : xr($, i);
        B(J) && a(J);
        e && a($);
        B(G) && a(G);
        Ee(t);
        o();
      } ]);
      if (t && !D) {
        Hr($, Ue, Xe);
        j(Q, sr(xr, $, Ue));
      }
      Ee(!D && S && e === Z && r.top === r ? $ : e);
      o();
      er = 0;
      return nr;
    };
    return [ X, tr, nr ];
  };
  var cn = function createTrinsicUpdateSegment(r) {
    var e = r.br;
    return function(r) {
      var a = r.Jr, n = r.ue, t = r.Lr;
      var i = a || {}, v = i.Ar;
      var o = n.Cr;
      var u = e && (v || t);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[ar] = o && "100%", c));
      }
    };
  };
  var ln = function createPaddingUpdateSegment(r, a) {
    var n = r.hr, t = r.ie, i = r.nr, v = r.ar;
    var o = e({
      v: lr,
      i: ee()
    }, sr(ee, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Dr, n = r.Jr, o = r.ue, l = r.Lr;
      var f = c(l), s = f[0], d = f[1];
      var p = Oa(), _ = p.I;
      var g = n || {}, h = g._r, m = g.Hr, b = g.Er;
      var S = o.vr;
      var y = e("paddingAbsolute"), w = y[0], O = y[1];
      var C = l || m;
      if (h || d || C) {
        var x = u(l);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || b || d);
      if (E) {
        var A, H;
        var T = !w || !t && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (A = {}, A[$] = T && !S ? -P : 0, A[J] = T ? -D : 0, A[G] = T && S ? -P : 0, 
        A.top = T ? -s.t : 0, A.right = T ? S ? -s.r : "auto" : 0, A.left = T ? S ? "auto" : -s.l : 0, 
        A[er] = T && "calc(100% + " + P + "px)", A);
        var L = (H = {}, H[W] = T ? s.t : 0, H[X] = T ? s.r : 0, H[K] = T ? s.b : 0, H[Z] = T ? s.l : 0, 
        H);
        setStyles(t || i, z);
        setStyles(i, L);
        hr(a, {
          ie: s,
          ce: !T,
          ur: t ? L : hr({}, z, L)
        });
      }
      return {
        le: E
      };
    };
  };
  var fn = function createOverflowUpdateSegment(r, a) {
    var i = Oa();
    var v = r.hr, o = r.ie, u = r.nr, c = r.ar, f = r.$r, s = r.mr, d = r.yr, p = r.Or, _ = r.oe;
    var g = i.I;
    var h = d && c;
    var m = sr(t, 0);
    var b = [ "display", "direction", "flexDirection", "writingMode" ];
    var S = {
      v: ur,
      i: {
        w: 0,
        h: 0
      }
    };
    var y = {
      v: cr,
      i: {}
    };
    var w = function setMeasuringMode(r) {
      p(We, !h && r);
    };
    var O = function getOverflowAmount(r, e) {
      var a = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: m(r.w - e.w),
        h: m(r.h - e.h)
      };
      return {
        w: t.w > a ? t.w : 0,
        h: t.h > a ? t.h : 0
      };
    };
    var C = e(S, sr(le, u)), x = C[0], E = C[1];
    var A = e(S, sr(ce, u)), H = A[0], T = A[1];
    var P = e(S), D = P[0], z = P[1];
    var L = e(y), M = L[0];
    var k = e(S), I = k[0], R = k[1];
    var V = e(y), N = V[0];
    var j = e({
      v: function _equal(r, e) {
        return or(r, e, b);
      },
      i: {}
    }, (function() {
      return se(u) ? getStyles(u, b) : {};
    })), F = j[0];
    var U = e({
      v: function _equal(r, e) {
        return cr(r.D, e.D) && cr(r.L, e.L);
      },
      i: we()
    }, (function() {
      w(true);
      var r = ye(s);
      var e = p(Ke, true);
      var a = ge(f, ir, (function(e) {
        var a = ye(s);
        if (e.isTrusted && a.x === r.x && a.y === r.y) {
          he(e);
        }
      }), {
        T: true,
        P: true
      });
      Se(s, {
        x: 0,
        y: 0
      });
      e();
      var n = ye(s);
      var t = ce(s);
      Se(s, {
        x: t.w,
        y: t.h
      });
      var i = ye(s);
      Se(s, {
        x: i.x - n.x < 1 && -t.w,
        y: i.y - n.y < 1 && -t.h
      });
      var v = ye(s);
      Se(s, r);
      l((function() {
        return a();
      }));
      return {
        D: n,
        L: v
      };
    })), q = U[0], B = U[1];
    var Y = Va($a);
    var W = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? qe : Be;
      return "" + a + vr(r);
    };
    var X = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ nr, tr, ir ].map((function(e) {
          return W(e, r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      p(a);
      p(gr(r).map((function(e) {
        return W(r[e], e === "x");
      })).join(" "), true);
    };
    return function(e, n) {
      var t = e.Dr, c = e.Jr, l = e.ue, f = e.Lr;
      var s = n.le;
      var d = c || {}, b = d._r, S = d.Hr, y = d.Er, C = d.pr, A = d.Pr;
      var P = Y && Y.er(r, a, l, i, t);
      var L = P || {}, k = L.lr, V = L.sr, j = L.dr;
      var U = Za(t, i), W = U[0], Z = U[1];
      var K = t("overflow"), G = K[0], $ = K[1];
      var J = Ka(G.x);
      var Q = Ka(G.y);
      var rr = b || s || S || y || A || Z;
      var er = E(f);
      var ar = T(f);
      var nr = z(f);
      var tr = R(f);
      if (Z && g) {
        p(Xe, !W);
      }
      if (rr) {
        if (Pr(v, je, Ve)) {
          w(true);
        }
        var ir = V ? V() : [], vr = ir[0];
        var or = er = x(f), ur = or[0];
        var cr = ar = H(f), lr = cr[0];
        var fr = ue(u);
        var sr = h && ve(_());
        var dr = {
          w: m(lr.w + ur.w),
          h: m(lr.h + ur.h)
        };
        var pr = {
          w: m((sr ? sr.w : fr.w + m(fr.w - lr.w)) + ur.w),
          h: m((sr ? sr.h : fr.h + m(fr.h - lr.h)) + ur.h)
        };
        vr && vr();
        tr = I(pr);
        nr = D(O(dr, pr), f);
      }
      var _r = tr, gr = _r[0], mr = _r[1];
      var br = nr, Sr = br[0], yr = br[1];
      var wr = ar, Or = wr[0], Cr = wr[1];
      var xr = er, Er = xr[0], Ar = xr[1];
      var Hr = M({
        x: Sr.w > 0,
        y: Sr.h > 0
      }), Dr = Hr[0], zr = Hr[1];
      var Lr = J && Q && (Dr.x || Dr.y) || J && Dr.x && !Dr.y || Q && Dr.y && !Dr.x;
      var Mr = s || y || A || Ar || Cr || mr || yr || $ || Z || rr;
      var kr = Ga(Dr, G);
      var Ir = N(kr.J), Rr = Ir[0], Vr = Ir[1];
      var Nr = F(f), jr = Nr[1];
      var Fr = y || C || jr || zr || f;
      var Ur = Fr ? q(f) : B(), qr = Ur[0], Br = Ur[1];
      if (Mr) {
        Vr && X(kr.J);
        if (j && k) {
          setStyles(u, j(kr, l, k(kr, Or, Er)));
        }
      }
      w(false);
      Tr(v, je, Ve, Lr);
      Tr(o, Ge, Ve, Lr);
      hr(a, {
        J: Rr,
        Vr: {
          x: gr.w,
          y: gr.h
        },
        Rr: {
          x: Sr.w,
          y: Sr.h
        },
        te: Dr,
        jr: Oe(qr, Sr)
      });
      return {
        ae: Vr,
        re: mr,
        ee: yr,
        ne: Br || yr,
        fe: Fr
      };
    };
  };
  var sn = function createStructureSetup(r) {
    var e;
    var a = un(r), n = a[0], t = a[1], i = a[2];
    var v = {
      ie: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ce: false,
      ur: (e = {}, e[$] = 0, e[J] = 0, e[G] = 0, e[W] = 0, e[X] = 0, e[K] = 0, e[Z] = 0, 
      e),
      Vr: {
        x: 0,
        y: 0
      },
      Rr: {
        x: 0,
        y: 0
      },
      J: {
        x: tr,
        y: tr
      },
      te: {
        x: false,
        y: false
      },
      jr: we()
    };
    var o = n.gr, u = n.mr, c = n.ar;
    var l = Oa(), f = l.I, s = l.k;
    var d = !f && (s.x || s.y);
    var p = [ cn(n), ln(n, v), fn(n, v) ];
    return [ t, function(r) {
      var e = {};
      var a = d;
      var n = a && ye(u);
      each(p, (function(a) {
        hr(e, a(r, e) || {});
      }));
      Se(u, n);
      !c && Se(o, 0);
      return e;
    }, v, n, i ];
  };
  var dn = function createSetups(r, e, a, n, t) {
    var i = Le(e, {});
    var v = sn(r), o = v[0], u = v[1], c = v[2], l = v[3], f = v[4];
    var s = nn(l, c, i, (function(r) {
      y({}, r);
    })), d = s[0], p = s[1], _ = s[2];
    var g = on(r, e, _, c, l, t), h = g[0], m = g[1], b = g[3];
    var S = function updateHintsAreTruthy(r) {
      return gr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var y = function update(r, t) {
      if (a()) {
        return false;
      }
      var i = r.se, v = r.Lr, o = r.zr, c = r.de;
      var l = i || {};
      var f = !!v;
      var s = {
        Dr: Le(e, l, f),
        se: l,
        Lr: f
      };
      if (c) {
        m(s);
        return false;
      }
      var d = t || p(hr({}, s, {
        zr: o
      }));
      var g = u(hr({}, s, {
        ue: _,
        Jr: d
      }));
      m(hr({}, s, {
        Jr: d,
        Qr: g
      }));
      var h = S(d);
      var b = S(g);
      var y = h || b || !br(l) || f;
      y && n(r, {
        Jr: d,
        Qr: g
      });
      return y;
    };
    return [ function() {
      var r = l.ve, e = l.mr;
      var a = ye(r);
      var n = [ d(), o(), h() ];
      Se(e, a);
      return sr(Y, n);
    }, y, function() {
      return {
        pe: _,
        _e: c
      };
    }, {
      ge: l,
      he: b
    }, f ];
  };
  var pn = function OverlayScrollbars(r, e, a) {
    var n = Oa(), t = n.F;
    var i = M(r);
    var v = i ? r : r.target;
    var o = Da(v);
    if (e && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var e = mr(r, true);
        var a = Va(Ya);
        return a ? a(e, true) : e;
      };
      var s = hr({}, t(), f(e));
      var d = He(), p = d[0], _ = d[1], g = d[2];
      var h = He(a), m = h[0], b = h[1], S = h[2];
      var y = function triggerEvent(r, e) {
        S(r, e);
        g(r, e);
      };
      var w = dn(r, s, (function() {
        return u;
      }), (function(r, e) {
        var a = r.se, n = r.Lr;
        var t = e.Jr, i = e.Qr;
        var v = t._r, o = t.Er, u = t.Ar, c = t.Hr, l = t.Tr, f = t.pr;
        var s = i.re, d = i.ee, p = i.ae, _ = i.ne;
        y("updated", [ T, {
          updateHints: {
            sizeChanged: !!v,
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
          changedOptions: a || {},
          force: !!n
        } ]);
      }), (function(r) {
        return y("scroll", [ T, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var H = function destroy(r) {
        Pa(v);
        Y(c);
        u = true;
        y("destroyed", [ T, r ]);
        _();
        b();
      };
      var T = {
        options: function options(r, e) {
          if (r) {
            var a = e ? t() : {};
            var n = ze(s, hr(a, f(r)));
            if (!br(n)) {
              hr(s, n);
              C({
                se: n
              });
            }
          }
          return hr({}, s);
        },
        on: m,
        off: function off(r, e) {
          r && e && b(r, e);
        },
        state: function state() {
          var r = x(), e = r.pe, a = r._e;
          var n = e.vr;
          var t = a.Vr, i = a.Rr, v = a.J, o = a.te, c = a.ie, l = a.ce, f = a.jr;
          return hr({}, {
            overflowEdge: t,
            overflowAmount: i,
            overflowStyle: v,
            hasOverflow: o,
            scrollCoordinates: {
              start: f.D,
              end: f.L
            },
            padding: c,
            paddingAbsolute: l,
            directionRTL: n,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = E.ge, e = r.gr, a = r.hr, n = r.ie, t = r.nr, i = r.br, v = r.mr, o = r.$r;
          var u = E.he, c = u.Yr, l = u.Kr;
          var f = function translateScrollbarStructure(r) {
            var e = r.Ir, a = r.kr, n = r.Nr;
            return {
              scrollbar: n,
              track: a,
              handle: e
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var e = r.Wr, a = r.Xr;
            var n = f(e[0]);
            return hr({}, n, {
              clone: function clone() {
                var r = f(a());
                C({
                  de: true
                });
                return r;
              }
            });
          };
          return hr({}, {
            target: e,
            host: a,
            padding: n || t,
            viewport: t,
            content: i || t,
            scrollOffsetElement: v,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(l)
          });
        },
        update: function update(r) {
          return C({
            Lr: r,
            zr: true
          });
        },
        destroy: sr(H, false),
        plugin: function plugin(r) {
          return l[gr(r)[0]];
        }
      };
      j(c, [ A ]);
      Ta(v, T);
      Ra(Ma, OverlayScrollbars, [ T, p, l ]);
      if (Aa(E.ge.yr, !i && r.cancel)) {
        H(true);
        return T;
      }
      j(c, O());
      y("initialized", [ T ]);
      T.update(true);
      return T;
    }
    return o;
  };
  pn.plugin = function(r) {
    var e = P(r);
    var a = e ? r : [ r ];
    var n = a.map((function(r) {
      return Ra(r, pn)[0];
    }));
    Ia(a);
    return e ? n : n[0];
  };
  pn.valid = function(r) {
    var e = r && r.elements;
    var a = T(e) && e();
    return L(a) && !!Da(a.target);
  };
  pn.env = function() {
    var r = Oa(), e = r.M, a = r.k, n = r.I, t = r.R, i = r.q, v = r.B, o = r.N, u = r.j, c = r.F, l = r.U;
    return hr({}, {
      scrollbarsSize: e,
      scrollbarsOverlaid: a,
      scrollbarsHiding: n,
      scrollTimeline: t,
      staticDefaultInitialization: i,
      staticDefaultOptions: v,
      getDefaultInitialization: o,
      setDefaultInitialization: u,
      getDefaultOptions: c,
      setDefaultOptions: l
    });
  };
  r.ClickScrollPlugin = rn;
  r.OverlayScrollbars = pn;
  r.ScrollbarsHidingPlugin = Ja;
  r.SizeObserverPlugin = Xa;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
