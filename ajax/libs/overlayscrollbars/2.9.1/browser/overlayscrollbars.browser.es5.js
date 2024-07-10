/*!
 * OverlayScrollbars
 * Version: 2.9.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var e = function createCache(r, e) {
    var a = r.v, t = r.i, n = r.o;
    var v = a;
    var i;
    var o = function cacheUpdateContextual(r, e) {
      var a = v;
      var o = r;
      var u = e || (t ? !t(a, o) : a !== o);
      if (u || n) {
        v = o;
        i = a;
      }
      return [ v, u, i ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(e(v, i), r);
    };
    var c = function getCurrentCache(r) {
      return [ v, !!r, i ];
    };
    return [ e ? u : o, c ];
  };
  var a = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  var t = a ? window : {};
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
  var H = function isPlainObject(r) {
    return !!r && r.constructor === Object;
  };
  var T = function isHTMLElement(r) {
    return r instanceof HTMLElement;
  };
  var P = function isElement(r) {
    return r instanceof Element;
  };
  var D = function animationCurrentTime() {
    return performance.now();
  };
  var z = function animateNumber(r, e, a, t, v) {
    var i = 0;
    var o = D();
    var u = n(0, a);
    var f = function frame(a) {
      var c = D();
      var f = c - o;
      var s = f >= u;
      var d = a ? 1 : 1 - (n(0, o + u - c) / u || 0);
      var p = (e - r) * (C(v) ? v(d, d * u, 0, 1, u) : d) + r;
      var _ = s || d === 1;
      t && t(p, d, _);
      i = _ ? 0 : l((function() {
        return frame();
      }));
    };
    f();
    return function(r) {
      c(i);
      r && f(r);
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
  var L = function concat(r, e) {
    return r.concat(e);
  };
  var I = function push(r, e, a) {
    !a && !w(e) && A(e) ? Array.prototype.push.apply(r, e) : r.push(e);
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
      return r && r.apply(void 0, e || []);
    };
    each(r, t);
    !a && (r.length = 0);
  };
  var j = "paddingTop";
  var U = "paddingRight";
  var q = "paddingLeft";
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
        var v = t ? t(r[a]) : r[a];
        var i = t ? t(e[a]) : e[a];
        if (v !== i) {
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
  var vr = function equalTRBL(r, e) {
    return ar(r, e, [ "t", "r", "b", "l" ]);
  };
  var ir = function noop() {};
  var or = function bind(r) {
    for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++) {
      a[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(a));
  };
  var ur = function selfClearTimeout(r) {
    var e;
    var a = r ? f : l;
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
    var a = e || {}, t = a.u, n = a.p, v = a._, i = a.m;
    var o;
    var u;
    var d;
    var p;
    var _ = ir;
    var g = function invokeFunctionToDebounce(e) {
      _();
      s(o);
      p = o = u = void 0;
      _ = ir;
      r.apply(this, e);
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
      var r = k(arguments);
      var e = C(t) ? t() : t;
      var a = y(e) && e >= 0;
      if (a) {
        var i = C(n) ? n() : n;
        var m = y(i) && i >= 0;
        var S = e > 0 ? f : l;
        var w = e > 0 ? s : c;
        var O = h(r);
        var x = O || r;
        var E = g.bind(0, x);
        var A;
        _();
        if (v && !p) {
          E();
          p = true;
          A = S((function() {
            return p = void 0;
          }), e);
        } else {
          A = S(E, e);
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
  var lr = function hasOwnProperty(r, e) {
    return Object.prototype.hasOwnProperty.call(r, e);
  };
  var fr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var sr = function assignDeep(r, e, a, t, n, v, i) {
    var o = [ e, a, t, n, v, i ];
    if ((typeof r !== "object" || m(r)) && !C(r)) {
      r = {};
    }
    each(o, (function(e) {
      each(e, (function(a, t) {
        var n = e[t];
        if (r === n) {
          return true;
        }
        var v = x(n);
        if (n && H(n)) {
          var i = r[t];
          var o = i;
          if (v && !x(i)) {
            o = [];
          } else if (!v && !H(i)) {
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
  var dr = function removeUndefinedProperties(r, e) {
    return each(sr({}, r), (function(r, a, t) {
      if (r === void 0) {
        delete t[a];
      } else if (e && r && H(r)) {
        t[a] = removeUndefinedProperties(r, e);
      }
    }));
  };
  var pr = function isEmptyObject(r) {
    return !fr(r).length;
  };
  var _r = function capNumber(r, e, a) {
    return n(r, v(e, a));
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
      r && r.setAttribute(e, String(a || ""));
    }));
  };
  var Sr = function removeAttrs(r, e) {
    each(gr(e), (function(e) {
      return r && r.removeAttribute(e);
    }));
  };
  var yr = function domTokenListAttr(r, e) {
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
    yr(r, e).O(a);
    return or(Or, r, e, a);
  };
  var Or = function addAttrClass(r, e, a) {
    yr(r, e).C(a);
    return or(wr, r, e, a);
  };
  var Cr = function addRemoveAttrClass(r, e, a, t) {
    return (t ? Or : wr)(r, e, a);
  };
  var xr = function hasAttrClass(r, e, a) {
    return yr(r, e).A(a);
  };
  var Er = function createDomTokenListClass(r) {
    return yr(r, "class");
  };
  var Ar = function removeClass(r, e) {
    Er(r).O(e);
  };
  var Hr = function addClass(r, e) {
    Er(r).C(e);
    return or(Ar, r, e);
  };
  var Tr = function find(r, e) {
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
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var Ir = function closest(r, e) {
    return P(r) && r.closest(e);
  };
  var kr = function getFocusedElement(r) {
    return (r || document).activeElement;
  };
  var Vr = function liesBetween(r, e, a) {
    var t = Ir(r, e);
    var n = r && Pr(a, t);
    var v = Ir(n, e) === t;
    return t && n ? t === r || n === r || v && Ir(Ir(r, a), e) !== t : false;
  };
  var Rr = function removeElements(r) {
    each(V(r), (function(r) {
      var e = Lr(r);
      r && e && e.removeChild(r);
    }));
  };
  var Fr = function appendChildren(r, e) {
    return or(Rr, r && e && each(V(e), (function(e) {
      e && r.appendChild(e);
    })));
  };
  var Nr = function createDiv(r) {
    var e = document.createElement("div");
    mr(e, "class", r);
    return e;
  };
  var jr = function createDOM(r) {
    var e = Nr();
    e.innerHTML = r.trim();
    return each(Mr(e), (function(r) {
      return Rr(r);
    }));
  };
  var Ur = function getCSSVal(r, e) {
    return r.getPropertyValue(e) || r[e] || "";
  };
  var qr = function validFiniteNumber(r) {
    var e = r || 0;
    return isFinite(e) ? e : 0;
  };
  var Br = function parseToZeroOrNumber(r) {
    return qr(parseFloat(r || ""));
  };
  var Yr = function roundCssNumber(r) {
    return Math.round(r * 1e4) / 1e4;
  };
  var Wr = function numberToCssPx(r) {
    return Yr(qr(r)) + "px";
  };
  function setStyles(r, e) {
    r && e && each(e, (function(e, a) {
      try {
        var t = r.style;
        var n = m(e) || O(e) ? "" : y(e) ? Wr(e) : e;
        if (a.indexOf("--") === 0) {
          t.setProperty(a, n);
        } else {
          t[a] = n;
        }
      } catch (v) {}
    }));
  }
  function getStyles(r, e, a) {
    var n = w(e);
    var v = n ? "" : {};
    if (r) {
      var i = t.getComputedStyle(r, a) || r.style;
      v = n ? Ur(i, e) : k(e).reduce((function(r, e) {
        r[e] = Ur(i, e);
        return r;
      }), v);
    }
    return v;
  }
  var Xr = function topRightBottomLeft(r, e, a) {
    var t = e ? e + "-" : "";
    var n = a ? "-" + a : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Br(c[v]),
      r: Br(c[i]),
      b: Br(c[o]),
      l: Br(c[u])
    };
  };
  var Zr = function getTrasformTranslateValue(r, e) {
    return "translate" + (E(r) ? "(" + r.x + "," + r.y + ")" : (e ? "X" : "Y") + "(" + r + ")");
  };
  var Gr = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var $r = {
    w: 0,
    h: 0
  };
  var Jr = function getElmWidthHeightProperty(r, e) {
    return e ? {
      w: e[r + "Width"],
      h: e[r + "Height"]
    } : $r;
  };
  var Kr = function getWindowSize(r) {
    return Jr("inner", r || t);
  };
  var Qr = or(Jr, "offset");
  var re = or(Jr, "client");
  var ee = or(Jr, "scroll");
  var ae = function getFractionalSize(r) {
    var e = parseFloat(getStyles(r, $)) || 0;
    var a = parseFloat(getStyles(r, J)) || 0;
    return {
      w: e - i(e),
      h: a - i(a)
    };
  };
  var te = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ne = function hasDimensions(r) {
    return !!r && Gr(r);
  };
  var ve = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var ie = function domRectAppeared(r, e) {
    var a = ve(r);
    var t = ve(e);
    return !t && a;
  };
  var oe = function removeEventListener(r, e, a, t) {
    each(gr(e), (function(e) {
      r && r.removeEventListener(e, a, t);
    }));
  };
  var ue = function addEventListener(r, e, a, t) {
    var n;
    var v = (n = t && t.H) != null ? n : true;
    var i = t && t.T || false;
    var o = t && t.P || false;
    var u = {
      passive: v,
      capture: i
    };
    return or(N, gr(e).map((function(e) {
      var t = o ? function(n) {
        oe(r, e, t, i);
        a && a(n);
      } : a;
      r && r.addEventListener(e, t, u);
      return or(oe, r, e, t, i);
    })));
  };
  var ce = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var le = function preventDefault(r) {
    return r.preventDefault();
  };
  var fe = function stopAndPrevent(r) {
    return ce(r) || le(r);
  };
  var se = function scrollElementTo(r, e) {
    var a = y(e) ? {
      x: e,
      y: e
    } : e || {}, t = a.x, n = a.y;
    y(t) && (r.scrollLeft = t);
    y(n) && (r.scrollTop = n);
  };
  var de = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var pe = function getZeroScrollCoordinates() {
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
  var _e = function sanitizeScrollCoordinates(r, e) {
    var a = r.D, t = r.M;
    var n = e.w, v = e.h;
    var i = function sanitizeAxis(r, e, a) {
      var t = u(r) * a;
      var n = u(e) * a;
      if (t === n) {
        var v = o(r);
        var i = o(e);
        n = v > i ? 0 : n;
        t = v < i ? 0 : t;
      }
      t = t === n ? 0 : t;
      return [ t + 0, n + 0 ];
    };
    var c = i(a.x, t.x, n), l = c[0], f = c[1];
    var s = i(a.y, t.y, v), d = s[0], p = s[1];
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
  var ge = function isDefaultDirectionScrollCoordinates(r) {
    var e = r.D, a = r.M;
    var t = function getAxis(r, e) {
      return r === 0 && r <= e;
    };
    return {
      x: t(e.x, a.x),
      y: t(e.y, a.y)
    };
  };
  var he = function getScrollCoordinatesPercent(r, e) {
    var a = r.D, t = r.M;
    var n = function getAxis(r, e, a) {
      return _r(0, 1, (r - a) / (r - e) || 0);
    };
    return {
      x: n(a.x, t.x, e.x),
      y: n(a.y, t.y, e.y)
    };
  };
  var be = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true
      });
    }
  };
  var me = function manageListener(r, e) {
    each(V(e), r);
  };
  var Se = function createEventListenerHub(r) {
    var e = new Map;
    var a = function removeEvent(r, a) {
      if (r) {
        var t = e.get(r);
        me((function(r) {
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
    var t = function addEvent(r, t) {
      if (w(r)) {
        var n = e.get(r) || new Set;
        e.set(r, n);
        me((function(r) {
          C(r) && n.add(r);
        }), t);
        return or(a, r, t);
      }
      if (O(t) && t) {
        a();
      }
      var v = fr(r);
      var i = [];
      each(v, (function(e) {
        var a = r[e];
        a && I(i, addEvent(e, a));
      }));
      return or(N, i);
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
  var ye = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (C(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var we = function getPropByPath(r, e) {
    return r ? ("" + e).split(".").reduce((function(r, e) {
      return r && lr(r, e) ? r[e] : void 0;
    }), r) : void 0;
  };
  var Oe = {
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
  var Ce = function getOptionsDiff(r, e) {
    var a = {};
    var t = L(fr(e), fr(r));
    each(t, (function(t) {
      var n = r[t];
      var v = e[t];
      if (E(n) && E(v)) {
        sr(a[t] = {}, getOptionsDiff(n, v));
        if (pr(a[t])) {
          delete a[t];
        }
      } else if (lr(e, t) && v !== n) {
        var i = true;
        if (x(n) || x(v)) {
          try {
            if (ye(n) === ye(v)) {
              i = false;
            }
          } catch (o) {}
        }
        if (i) {
          a[t] = v;
        }
      }
    }));
    return a;
  };
  var xe = function createOptionCheck(r, e, a) {
    return function(t) {
      return [ we(r, t), a || we(e, t) !== void 0 ];
    };
  };
  var Ee = "data-overlayscrollbars";
  var Ae = "os-environment";
  var He = Ae + "-scrollbar-hidden";
  var Te = Ee + "-initialize";
  var Pe = "noClipping";
  var De = Ee + "-body";
  var ze = Ee;
  var Me = "host";
  var Le = Ee + "-viewport";
  var Ie = Z;
  var ke = G;
  var Ve = "arrange";
  var Re = "measuring";
  var Fe = "scrolling";
  var Ne = "scrollbarHidden";
  var je = "noContent";
  var Ue = Ee + "-padding";
  var qe = Ee + "-content";
  var Be = "os-size-observer";
  var Ye = Be + "-appear";
  var We = Be + "-listener";
  var Xe = We + "-scroll";
  var Ze = We + "-item";
  var Ge = Ze + "-final";
  var $e = "os-trinsic-observer";
  var Je = "os-theme-none";
  var Ke = "os-scrollbar";
  var Qe = Ke + "-rtl";
  var ra = Ke + "-horizontal";
  var ea = Ke + "-vertical";
  var aa = Ke + "-track";
  var ta = Ke + "-handle";
  var na = Ke + "-visible";
  var va = Ke + "-cornerless";
  var ia = Ke + "-interaction";
  var oa = Ke + "-unusable";
  var ua = Ke + "-auto-hide";
  var ca = ua + "-hidden";
  var la = Ke + "-wheel";
  var fa = aa + "-interactive";
  var sa = ta + "-interactive";
  var da;
  var pa = function getNonce() {
    return da;
  };
  var _a = function setNonce(r) {
    da = r;
  };
  var ga;
  var ha = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, e, a) {
      Fr(document.body, r);
      Fr(document.body, r);
      var t = re(r);
      var n = Qr(r);
      var v = ae(e);
      a && Rr(r);
      return {
        x: n.h - t.h + v.h,
        y: n.w - t.w + v.w
      };
    };
    var a = function getNativeScrollbarsHiding(r) {
      var e = false;
      var a = Hr(r, He);
      try {
        e = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      a();
      return e;
    };
    var n = "." + Ae + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + Ae + " div{width:200%;height:200%;margin:10px 0}." + He + "{scrollbar-width:none!important}." + He + "::-webkit-scrollbar,." + He + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var v = jr('<div class="' + Ae + '"><div></div><style>' + n + "</style></div>");
    var i = v[0];
    var o = i.firstChild;
    var u = i.lastChild;
    var c = pa();
    if (c) {
      u.nonce = c;
    }
    var l = Se(), f = l[0], s = l[2];
    var d = e({
      v: r(i, o),
      i: nr
    }, or(r, i, o, true)), p = d[0], _ = d[1];
    var g = _(), b = g[0];
    var m = a(i);
    var S = {
      x: b.x === 0,
      y: b.y === 0
    };
    var y = {
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
    var w = sr({}, Oe);
    var O = or(sr, {}, w);
    var x = or(sr, {}, y);
    var E = {
      L: b,
      I: S,
      k: m,
      V: !!h,
      R: or(f, "r"),
      F: x,
      N: function _setDefaultInitialization(r) {
        return sr(y, r) && x();
      },
      j: O,
      U: function _setDefaultOptions(r) {
        return sr(w, r) && O();
      },
      q: sr({}, y),
      B: sr({}, w)
    };
    Sr(i, "style");
    Rr(i);
    ue(t, "resize", (function() {
      s("r", []);
    }));
    if (C(t.matchMedia) && !m && (!S.x || !S.y)) {
      var A = function addZoomListener(r) {
        var e = t.matchMedia("(resolution: " + t.devicePixelRatio + "dppx)");
        ue(e, "change", (function() {
          r();
          addZoomListener(r);
        }), {
          P: true
        });
      };
      A((function() {
        var r = p(), e = r[0], a = r[1];
        sr(E.L, e);
        s("r", [ a ]);
      }));
    }
    return E;
  };
  var ba = function getEnvironment() {
    if (!ga) {
      ga = ha();
    }
    return ga;
  };
  var ma = function resolveInitialization(r, e) {
    return C(e) ? e.apply(0, r) : e;
  };
  var Sa = function staticInitializationElement(r, e, a, t) {
    var n = b(t) ? a : t;
    var v = ma(r, n);
    return v || e.apply(0, r);
  };
  var ya = function dynamicInitializationElement(r, e, a, t) {
    var n = b(t) ? a : t;
    var v = ma(r, n);
    return !!v && (T(v) ? v : e.apply(0, r));
  };
  var wa = function cancelInitialization(r, e) {
    var a = e || {}, t = a.nativeScrollbarsOverlaid, n = a.body;
    var v = ba(), i = v.I, o = v.k, u = v.F;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = t != null ? t : l;
    var d = b(n) ? f : n;
    var p = (i.x || i.y) && s;
    var _ = r && (m(d) ? !o : d);
    return !!p || !!_;
  };
  var Oa = new WeakMap;
  var Ca = function addInstance(r, e) {
    Oa.set(r, e);
  };
  var xa = function removeInstance(r) {
    Oa.delete(r);
  };
  var Ea = function getInstance(r) {
    return Oa.get(r);
  };
  var Aa = function createEventContentChange(r, e, a) {
    var t = false;
    var n = a ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && a) {
        var i = a.map((function(e) {
          var a = e || [], t = a[0], n = a[1];
          var i = n && t ? (v || Tr)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(a) {
          return each(a[0], (function(v) {
            var i = a[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = ue(v, i, (function(r) {
                if (t) {
                  c();
                  n.delete(v);
                } else {
                  e(r);
                }
              }));
              n.set(v, I(o, c));
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
  var Ha = function createDOMObserver(r, e, a, t) {
    var n = false;
    var v = t || {}, i = v.Y, o = v.W, u = v.X, c = v.Z, l = v.G, f = v.$;
    var s = cr((function() {
      return n && a(true);
    }), {
      u: 33,
      p: 99
    });
    var d = Aa(r, s, u), _ = d[0], g = d[1];
    var h = i || [];
    var b = o || [];
    var m = L(h, b);
    var S = function observerCallback(n, v) {
      if (!R(v)) {
        var i = l || ir;
        var o = f || ir;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(a) {
          var n = a.attributeName, v = a.target, l = a.type, f = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var h = l === "attributes";
          var m = l === "childList";
          var S = r === v;
          var y = h && n;
          var O = y && hr(v, n || "");
          var C = w(O) ? O : null;
          var x = y && f !== C;
          var E = M(b, n) && x;
          if (e && (m || !S)) {
            var A = h && x;
            var H = A && c && Dr(v, c);
            var T = H ? !i(v, n, f, C) : !h || A;
            var P = T && !o(a, !!H, r, t);
            each(_, (function(r) {
              return I(u, r);
            }));
            each(g, (function(r) {
              return I(u, r);
            }));
            p = p || P;
          }
          if (!e && S && x && !i(v, n, f, C)) {
            I(s, n);
            d = d || E;
          }
        }));
        g((function(r) {
          return F(u).reduce((function(e, a) {
            I(e, Tr(r, a));
            return Dr(a, r) ? I(e, a) : e;
          }), []);
        }));
        if (e) {
          !n && p && a(false);
          return [ false ];
        }
        if (!R(s) || d) {
          var _ = [ F(s), d ];
          !n && a.apply(0, _);
          return _;
        }
      }
    };
    var y = new p(or(S, false));
    return [ function() {
      y.observe(r, {
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
          y.disconnect();
          n = false;
        }
      };
    }, function() {
      if (n) {
        s.S();
        return S(true, y.takeRecords());
      }
    } ];
  };
  var Ta = {};
  var Pa = {};
  var Da = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        Ta[a] = r[a];
      }));
    }));
  };
  var za = function registerPluginModuleInstances(r, e, a) {
    return fr(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = a || [], u = o[0], c = o[1], l = o[2];
      var f = a ? i : v;
      if (f) {
        var s = a ? f(u, c, e) : f(e);
        return (l || Pa)[t] = s;
      }
    }));
  };
  var Ma = function getStaticPluginModuleInstance(r) {
    return Pa[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.J && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var La = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var e = 1; e < arguments.length; e++) {
          var a = arguments[e];
          for (var t in a) {
            if (Object.prototype.hasOwnProperty.call(a, t)) {
              r[t] = a[t];
            }
          }
        }
        return r;
      }, r.exports.J = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.J = true, r.exports["default"] = r.exports;
  })(La);
  var Ia = La.exports;
  var ka = /*@__PURE__*/ getDefaultExportFromCjs(Ia);
  var Va = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ra = function validateRecursive(r, e, a, t) {
    var n = {};
    var v = ka({}, e);
    var i = fr(r).filter((function(r) {
      return lr(e, r);
    }));
    each(i, (function(i) {
      var o = e[i];
      var u = r[i];
      var c = H(u);
      var l = t ? t + "." : "";
      if (c && H(o)) {
        var f = validateRecursive(u, o, a, l + i), s = f[0], d = f[1];
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
        var h = S(o);
        var m = V(u);
        each(m, (function(r) {
          var e;
          each(Va, (function(a, t) {
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
            I(_, t);
          } else {
            p = Va[h] === r;
          }
          I(g, a ? Va.string : e);
          return !p;
        }));
        if (p) {
          n[i] = o;
        } else if (a) {
          console.warn('The option "' + l + i + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var Fa = function validateOptions(r, e, a) {
    return Ra(r, e, a);
  };
  var Na = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Na] = {
      static: function _static() {
        var r = Va.number;
        var e = Va.boolean;
        var a = [ Va.array, Va.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: e,
          showNativeOverlaidScrollbars: e,
          update: {
            elementEvents: a,
            attributes: a,
            debounce: [ Va.number, Va.array, Va.null ],
            ignoreMutation: [ Va.function, Va.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Va.string, Va.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: e,
            pointers: [ Va.array, Va.null ]
          }
        };
        return function(r, e) {
          var a = Fa(i, r, e), t = a[0], n = a[1];
          return ka({}, n, t);
        };
      }
    }, r;
  })();
  var ja = "__osSizeObserverPlugin";
  var Ua = /* @__PURE__ */ function(r) {
    return r = {}, r[ja] = {
      static: function _static() {
        return function(r, e, a) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = jr('<div class="' + Ze + '" dir="ltr"><div class="' + Ze + '"><div class="' + Ge + '"></div></div><div class="' + Ze + '"><div class="' + Ge + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var u = o.lastChild;
          var f = o.firstChild;
          var s = f == null ? void 0 : f.firstChild;
          var d = Qr(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            se(f, n);
            se(u, n);
          };
          var b = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              e(r === true);
            }
          };
          var m = function onScroll(r) {
            p = Qr(o);
            _ = !r || !tr(p, d);
            if (r) {
              ce(r);
              if (_ && !g) {
                c(g);
                g = l(b);
              }
            } else {
              b(r === false);
            }
            h();
          };
          var S = [ Fr(r, i), ue(f, v, m), ue(u, v, m) ];
          Hr(r, Xe);
          setStyles(s, (t = {}, t[$] = n, t[J] = n, t));
          l(h);
          return [ a ? or(m, false) : h, S ];
        };
      }
    }, r;
  }();
  var qa = function getShowNativeOverlaidScrollbars(r, e) {
    var a = e.I;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], v = t[1];
    return [ n && a.x && a.y, v ];
  };
  var Ba = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Ya = function createViewportOverflowState(r, e) {
    var a = function getAxisOverflowStyle(r, e, a, t) {
      var n = r === K ? Q : r.replace(K + "-", "");
      var v = Ba(r);
      var i = Ba(a);
      if (!e && !t) {
        return Q;
      }
      if (v && i) {
        return K;
      }
      if (v) {
        var o = e ? K : Q;
        return e && t ? n : o;
      }
      var u = i && t ? K : Q;
      return e ? n : u;
    };
    var t = {
      x: a(e.x, r.x, e.y, r.y),
      y: a(e.y, r.y, e.x, r.x)
    };
    return {
      K: t,
      rr: {
        x: t.x === rr,
        y: t.y === rr
      }
    };
  };
  var Wa = "__osScrollbarsHidingPlugin";
  var Xa = /* @__PURE__ */ function(r) {
    return r = {}, r[Wa] = {
      static: function _static() {
        return {
          er: function _viewportArrangement(r, e, a, t, n) {
            var v = r.ar, i = r.tr;
            var o = t.k, u = t.I, c = t.L;
            var l = !v && !o && (u.x || u.y);
            var f = qa(n, t), s = f[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var e = getStyles(i, r);
                var a = e === rr;
                return [ e, a ];
              };
              var e = r(Z), a = e[0], t = e[1];
              var n = r(G), v = n[0], o = n[1];
              return {
                K: {
                  x: a,
                  y: v
                },
                rr: {
                  x: t,
                  y: o
                }
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var e = r.rr;
              var a = o || s ? 0 : 42;
              var t = function getHideOffsetPerAxis(r, e, t) {
                var n = r ? a : t;
                var v = e && !o ? n : 0;
                var i = r && !!a;
                return [ v, i ];
              };
              var n = t(u.x, e.x, c.x), v = n[0], i = n[1];
              var l = t(u.y, e.y, c.y), f = l[0], d = l[1];
              return {
                nr: {
                  x: v,
                  y: f
                },
                vr: {
                  x: i,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, a, t) {
              var n = a.ir;
              if (!v) {
                var i;
                var o = sr({}, (i = {}, i[W] = 0, i[X] = 0, i[Y] = 0, i));
                var u = p(r), c = u.nr, l = u.vr;
                var f = l.x, s = l.y;
                var d = c.x, _ = c.y;
                var g = e.ur;
                var h = n ? Y : W;
                var b = n ? q : U;
                var m = g[h];
                var S = g[X];
                var y = g[b];
                var w = g[B];
                o[$] = "calc(100% + " + (_ + m * -1) + "px)";
                o[h] = -_ + m;
                o[X] = -d + S;
                if (t) {
                  o[b] = y + (s ? _ : 0);
                  o[B] = w + (f ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, t, n) {
              if (l) {
                var v = e.ur;
                var o = p(r), u = o.nr, c = o.vr;
                var f = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = a.ir;
                var h = g ? U : q;
                var b = v[h];
                var m = v.paddingTop;
                var S = t.w + n.w;
                var y = t.h + n.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: d && f ? d + y - m + "px" : ""
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
                var n = e.ur;
                var v = p(t), o = v.vr;
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
                  s([ Y, W, q, U ]);
                }
                var g = getStyles(i, fr(f));
                var h = wr(i, Le, Ve);
                setStyles(i, f);
                return [ function() {
                  setStyles(i, sr({}, g, _(t, a, l)));
                  h();
                }, t ];
              }
              return [ ir ];
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
  var Za = "__osClickScrollPlugin";
  var Ga = /* @__PURE__ */ function(r) {
    return r = {}, r[Za] = {
      static: function _static() {
        return function(r, e, a, t, n) {
          var v = false;
          var i = ir;
          var o = ir;
          var u = ur(133), c = u[0], l = u[1];
          var f = function animateClickScroll(i, u, l) {
            return z(i, i + t * Math.sign(a), u ? 133 : 222, (function(a, i, l) {
              r(a);
              var f = e();
              var s = f + t;
              var d = n >= f && n <= s;
              var p = function animationCompletedAction() {
                o = animateClickScroll(a, u + 1);
              };
              if (!v && l && !d) {
                if (u) {
                  p();
                } else {
                  c(p);
                }
              }
            }), l);
          };
          i = f(0, 0, (function(r) {
            return 1 - (1 - r) * (1 - r);
          }));
          return function(r) {
            v = true;
            l();
            if (r) {
              i();
              o();
            } else {
              o();
            }
          };
        };
      }
    }, r;
  }();
  var $a = function createSizeObserver(r, a, t) {
    var n = t || {}, v = n.pr;
    var i = Ma(ja);
    var o = e({
      v: false,
      o: true
    }), u = o[0];
    return function() {
      var e = [];
      var t = jr('<div class="' + Be + '"><div class="' + We + '"></div></div>');
      var n = t[0];
      var o = n.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var e = r instanceof ResizeObserverEntry;
        var t = false;
        var n = false;
        if (e) {
          var v = u(r.contentRect), i = v[0], o = v[2];
          var c = ve(i);
          n = ie(i, o);
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
        var l = new g((function(r) {
          return c(r.pop());
        }));
        l.observe(o);
        I(e, (function() {
          l.disconnect();
        }));
      } else if (i) {
        var f = i(o, c, v), s = f[0], d = f[1];
        I(e, L([ Hr(n, Ye), ue(n, "animationstart", s) ], d));
      } else {
        return ir;
      }
      return or(N, I(e, Fr(r, n)));
    };
  };
  var Ja = function createTrinsicObserver(r, a) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Nr($e);
    var i = e({
      v: false
    }), o = i[0];
    var u = function triggerOnTrinsicChangedCallback(r, e) {
      if (r) {
        var t = o(n(r));
        var v = t[1];
        return v && !e && a(t) && [ t ];
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
        t.observe(v);
        I(e, (function() {
          t.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = Qr(v);
          u(r);
        };
        I(e, $a(v, a)());
        a();
      }
      return or(N, I(e, Fr(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Ka = function createObserversSetup(r, a, t, n) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = "[" + ze + "]";
    var s = "[" + Le + "]";
    var d = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var p = r.gr, _ = r.hr, h = r.tr, b = r.br, m = r.mr, S = r.ar, w = r.Sr, O = r.yr, E = r.wr, A = r.Or;
    var H = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var T = {
      Cr: false,
      ir: H(p)
    };
    var P = ba();
    var D = Ma(Wa);
    var z = e({
      i: tr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = D && D.er(r, a, T, P, t).sr;
      var n = w && S;
      var v = !n && xr(_, ze, Pe);
      var i = !S && O(Ve);
      var o = i && de(b);
      var u = o && A();
      var c = E(Re, v);
      var l = i && e && e()[0];
      var f = ee(h);
      var s = ae(h);
      l && l();
      se(b, o);
      u && u();
      v && c();
      return {
        w: f.w + s.w,
        h: f.h + s.h
      };
    })), M = z[0];
    var I = cr(n, {
      u: function _timeout() {
        return v;
      },
      p: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, e) {
        var a = r[0];
        var t = e[0];
        return [ L(fr(a), fr(t)).reduce((function(r, e) {
          r[e] = a[e] || t[e];
          return r;
        }), {}) ];
      }
    });
    var k = function setDirection(r) {
      var e = H(p);
      sr(r, {
        Er: l !== e
      });
      sr(T, {
        ir: e
      });
      l = e;
    };
    var V = function onTrinsicChanged(r, e) {
      var a = r[0], t = r[1];
      var v = {
        Ar: t
      };
      sr(T, {
        Cr: a
      });
      !e && n(v);
      return v;
    };
    var R = function onSizeChanged(r) {
      var e = r._r, a = r.pr;
      var t = e && !a;
      var v = !t && P.k ? I : n;
      var i = {
        _r: e || a,
        pr: a
      };
      k(i);
      v(i);
    };
    var F = function onContentMutation(r, e) {
      var a = M(), t = a[1];
      var v = {
        Hr: t
      };
      k(v);
      var i = r ? n : I;
      t && !e && i(v);
      return v;
    };
    var N = function onHostMutation(r, e, a) {
      var t = {
        Tr: e
      };
      k(t);
      if (e && !a) {
        I(t);
      }
      return t;
    };
    var j = m ? Ja(_, V) : [], U = j[0], q = j[1];
    var B = !S && $a(_, R, {
      pr: true
    });
    var Y = Ha(_, false, N, {
      W: d,
      Y: d
    }), W = Y[0], X = Y[1];
    var Z = S && g && new g((function(r) {
      var e = r[r.length - 1].contentRect;
      R({
        _r: true,
        pr: ie(e, c)
      });
      c = e;
    }));
    var G = cr((function() {
      var r = M(), e = r[1];
      n({
        Hr: e
      });
    }), {
      u: 222,
      _: true
    });
    return [ function() {
      Z && Z.observe(_);
      var r = B && B();
      var e = U && U();
      var a = W();
      var t = P.R((function(r) {
        if (r) {
          I({
            Pr: r
          });
        } else {
          G();
        }
      }));
      return function() {
        Z && Z.disconnect();
        r && r();
        e && e();
        u && u();
        a();
        t();
      };
    }, function(r) {
      var e = r.Dr, a = r.zr, t = r.Mr;
      var n = {};
      var c = e("update.ignoreMutation"), l = c[0];
      var p = e("update.attributes"), _ = p[0], g = p[1];
      var b = e("update.elementEvents"), w = b[0], O = b[1];
      var E = e("update.debounce"), A = E[0], H = E[1];
      var T = O || g;
      var P = a || t;
      var D = function ignoreMutationFromOptions(r) {
        return C(l) && l(r);
      };
      if (T) {
        o && o();
        u && u();
        var z = Ha(m || h, true, F, {
          Y: L(d, _ || []),
          X: w,
          Z: f,
          $: function _ignoreContentChange(r, e) {
            var a = r.target, t = r.attributeName;
            var n = !e && t && !S ? Vr(a, f, s) : false;
            return n || !!Ir(a, "." + Ke) || !!D(r);
          }
        }), M = z[0], R = z[1];
        u = M();
        o = R;
      }
      if (H) {
        I.S();
        if (x(A)) {
          var j = A[0];
          var U = A[1];
          v = y(j) && j;
          i = y(U) && U;
        } else if (y(A)) {
          v = A;
          i = false;
        } else {
          v = false;
          i = false;
        }
      }
      if (P) {
        var B = X();
        var Y = q && q();
        var W = o && o();
        B && sr(n, N(B[0], B[1], P));
        Y && sr(n, V(Y[0], P));
        W && sr(n, F(W[0], P));
      }
      k(n);
      return n;
    }, T ];
  };
  var Qa = function createScrollbarsSetupElements(r, e, a, t) {
    var n = "--os-viewport-percent";
    var v = "--os-scroll-percent";
    var i = "--os-scroll-direction";
    var o = ba(), u = o.F;
    var c = u(), l = c.scrollbars;
    var f = l.slot;
    var s = e.gr, d = e.hr, p = e.tr, _ = e.Lr, g = e.br, b = e.Sr, m = e.ar;
    var S = _ ? {} : r, y = S.scrollbars;
    var w = y || {}, C = w.slot;
    var x = [];
    var E = [];
    var A = [];
    var H = ya([ s, d, p ], (function() {
      return m && b ? s : d;
    }), f, C);
    var T = function initScrollTimeline(r) {
      if (h) {
        var e = new h({
          source: g,
          axis: r
        });
        var a = function _addScrollPercentAnimation(r) {
          var a;
          var t = r.Ir.animate((a = {
            clear: [ "left" ]
          }, a[v] = [ 0, 1 ], a), {
            timeline: e
          });
          return function() {
            return t.cancel();
          };
        };
        return {
          kr: a
        };
      }
    };
    var P = {
      x: T("x"),
      y: T("y")
    };
    var D = function getViewportPercent() {
      var r = a.Vr, e = a.Rr;
      var t = function getAxisValue(r, e) {
        return _r(0, 1, r / (r + e) || 0);
      };
      return {
        x: t(e.x, r.x),
        y: t(e.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, e, a) {
      var t = a ? Hr : Ar;
      each(r, (function(r) {
        t(r.Ir, e);
      }));
    };
    var M = function scrollbarStyle(r, e) {
      each(r, (function(r) {
        var a = e(r), t = a[0], n = a[1];
        setStyles(t, n);
      }));
    };
    var L = function scrollbarsAddRemoveClass(r, e, a) {
      var t = O(a);
      var n = t ? a : true;
      var v = t ? !a : true;
      n && z(E, r, e);
      v && z(A, r, e);
    };
    var k = function refreshScrollbarsHandleLength() {
      var r = D();
      var e = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Ir, (a = {}, a[n] = Yr(r) + "", a) ];
        };
      };
      M(E, e(r.x));
      M(A, e(r.y));
    };
    var V = function refreshScrollbarsHandleOffset() {
      if (!h) {
        var r = a.Fr;
        var e = he(r, de(g));
        var t = function createScrollbarStyleFn(r) {
          return function(e) {
            var a;
            return [ e.Ir, (a = {}, a[v] = Yr(r) + "", a) ];
          };
        };
        M(E, t(e.x));
        M(A, t(e.y));
      }
    };
    var R = function refreshScrollbarsScrollCoordinates() {
      var r = a.Fr;
      var e = ge(r);
      var t = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.Ir, (a = {}, a[i] = r ? "0" : "1", a) ];
        };
      };
      M(E, t(e.x));
      M(A, t(e.y));
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !b) {
        var r = a.Vr, e = a.Fr;
        var t = ge(e);
        var n = he(e, de(g));
        var v = function styleScrollbarPosition(e) {
          var a = e.Ir;
          var v = Lr(a) === p && a;
          var i = function getTranslateValue(r, e, a) {
            var t = e * r;
            return Wr(a ? t : -t);
          };
          return [ v, v && {
            transform: Zr({
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
      var e = r ? "x" : "y";
      var a = r ? ra : ea;
      var n = Nr(Ke + " " + a);
      var v = Nr(aa);
      var i = Nr(ta);
      var o = {
        Ir: n,
        Nr: v,
        jr: i
      };
      var u = P[e];
      I(r ? E : A, o);
      I(x, [ Fr(n, v), Fr(v, i), or(Rr, n), u && u.kr(o), t(o, L, r) ]);
      return o;
    };
    var U = or(j, true);
    var q = or(j, false);
    var B = function appendElements() {
      Fr(H, E[0].Ir);
      Fr(H, A[0].Ir);
      return or(N, x);
    };
    U();
    q();
    return [ {
      Ur: k,
      qr: V,
      Br: R,
      Yr: F,
      Wr: L,
      Xr: {
        Zr: E,
        Gr: U,
        $r: or(M, E)
      },
      Jr: {
        Zr: A,
        Gr: q,
        $r: or(M, A)
      }
    }, B ];
  };
  var rt = function createScrollbarsSetupEvents(r, e, a, t) {
    return function(n, v, u) {
      var c = e.hr, l = e.tr, s = e.ar, d = e.br, p = e.Kr, _ = e.Or;
      var g = n.Ir, h = n.Nr, b = n.jr;
      var m = ur(333), S = m[0], y = m[1];
      var w = ur(444), O = w[0], x = w[1];
      var E = function scrollOffsetElementScrollBy(r) {
        C(d.scrollBy) && d.scrollBy({
          behavior: "smooth",
          left: r.x,
          top: r.y
        });
      };
      var A = function createInteractiveScrollEvents() {
        var e = "pointerup pointercancel lostpointercapture";
        var t = "client" + (u ? "X" : "Y");
        var n = u ? $ : J;
        var v = u ? "left" : "top";
        var c = u ? "w" : "h";
        var l = u ? "x" : "y";
        var f = function createRelativeHandleMove(r, e) {
          return function(t) {
            var n;
            var v = a.Vr;
            var i = Qr(h)[c] - Qr(b)[c];
            var o = e * t / i;
            var u = o * v[l];
            se(d, (n = {}, n[l] = r + u, n));
          };
        };
        var s = [];
        return ue(h, "pointerdown", (function(a) {
          var u = Ir(a.target, "." + ta) === b;
          var g = u ? b : h;
          var m = r.scrollbars;
          var S = a.button, y = a.isPrimary, w = a.pointerType;
          var C = m.pointers;
          var A = S === 0 && y && m[u ? "dragScroll" : "clickScroll"] && (C || []).includes(w);
          if (A) {
            N(s);
            x();
            var H = !u && a.shiftKey;
            var T = or(te, b);
            var P = or(te, h);
            var D = function getHandleOffset(r, e) {
              return (r || T())[v] - (e || P())[v];
            };
            var z = i(te(d)[n]) / Qr(d)[c] || 1;
            var M = f(de(d)[l], 1 / z);
            var L = a[t];
            var k = T();
            var V = P();
            var R = k[n];
            var F = D(k, V) + R / 2;
            var j = L - V[v];
            var U = u ? 0 : j - F;
            var q = function releasePointerCapture(r) {
              N(Y);
              g.releasePointerCapture(r.pointerId);
            };
            var B = _();
            var Y = [ function() {
              var r = de(d);
              B();
              var e = de(d);
              var a = {
                x: e.x - r.x,
                y: e.y - r.y
              };
              if (o(a.x) > 3 || o(a.y) > 3) {
                _();
                se(d, r);
                E(a);
                O(B);
              }
            }, ue(p, e, q), ue(p, "selectstart", (function(r) {
              return le(r);
            }), {
              H: false
            }), ue(h, e, q), ue(h, "pointermove", (function(r) {
              var e = r[t] - L;
              if (u || H) {
                M(U + e);
              }
            })) ];
            g.setPointerCapture(a.pointerId);
            if (H) {
              M(U);
            } else if (!u) {
              var W = Ma(Za);
              if (W) {
                var X = W(M, D, U, R, j);
                I(Y, or(X));
                I(s, or(X, true));
              }
            }
          }
        }));
      };
      var H = true;
      return or(N, [ ue(b, "pointermove pointerleave", t), ue(g, "pointerenter", (function() {
        v(ia, true);
      })), ue(g, "pointerleave pointercancel", (function() {
        v(ia, false);
      })), !s && ue(g, "mousedown", (function() {
        var r = kr();
        if (br(r, Le) || br(r, ze) || r === document.body) {
          f(or(be, l), 25);
        }
      })), ue(g, "wheel", (function(r) {
        var e = r.deltaX, a = r.deltaY, t = r.deltaMode;
        if (H && t === 0 && Lr(g) === c) {
          E({
            x: e,
            y: a
          });
        }
        H = false;
        v(la, true);
        S((function() {
          H = true;
          v(la);
        }));
        le(r);
      }), {
        H: false,
        T: true
      }), ue(g, "pointerdown", or(ue, p, "click", fe, {
        P: true,
        T: true,
        H: false
      }), {
        T: true
      }), A(), y, x ]);
    };
  };
  var et = function createScrollbarsSetup(r, e, a, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = ir;
    var s = 0;
    var d = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var p = ur(), _ = p[0], g = p[1];
    var h = ur(100), b = h[0], m = h[1];
    var S = ur(100), y = S[0], w = S[1];
    var O = ur((function() {
      return s;
    })), C = O[0], x = O[1];
    var E = Qa(r, n, t, rt(e, n, t, (function(r) {
      return d(r) && F();
    }))), A = E[0], H = E[1];
    var T = n.hr, P = n.Qr, D = n.Sr;
    var z = A.Wr, M = A.Ur, L = A.qr, k = A.Br, V = A.Yr;
    var R = function manageScrollbarsAutoHide(r, e) {
      x();
      if (r) {
        z(ca);
      } else {
        var a = or(z, ca, true);
        if (s > 0 && !e) {
          C(a);
        } else {
          a();
        }
      }
    };
    var F = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !i : !c) {
        R(true);
        b((function() {
          R(false);
        }));
      }
    };
    var j = function manageAutoHideSuspension(r) {
      z(ua, r, true);
      z(ua, r, false);
    };
    var U = function onHostMouseEnter(r) {
      if (d(r)) {
        i = u;
        u && R(true);
      }
    };
    var q = [ x, m, w, g, function() {
      return f();
    }, ue(T, "pointerover", U, {
      P: true
    }), ue(T, "pointerenter", U), ue(T, "pointerleave", (function(r) {
      if (d(r)) {
        i = false;
        u && R(false);
      }
    })), ue(T, "pointermove", (function(r) {
      d(r) && o && F();
    })), ue(P, "scroll", (function(r) {
      _((function() {
        L();
        F();
      }));
      v(r);
      V();
    })) ];
    return [ function() {
      return or(N, I(q, H()));
    }, function(r) {
      var e = r.Dr, n = r.Mr, v = r.re, i = r.ee;
      var d = i || {}, p = d.ae, _ = d.te, g = d.ne, h = d.ve;
      var b = v || {}, m = b.Er, S = b.pr;
      var w = a.ir;
      var O = ba(), C = O.I;
      var x = t.K, E = t.ie;
      var A = e("showNativeOverlaidScrollbars"), H = A[0], T = A[1];
      var I = e("scrollbars.theme"), F = I[0], N = I[1];
      var U = e("scrollbars.visibility"), q = U[0], B = U[1];
      var Y = e("scrollbars.autoHide"), W = Y[0], X = Y[1];
      var Z = e("scrollbars.autoHideSuspend"), G = Z[0], $ = Z[1];
      var J = e("scrollbars.autoHideDelay"), Q = J[0];
      var er = e("scrollbars.dragScroll"), ar = er[0], tr = er[1];
      var nr = e("scrollbars.clickScroll"), vr = nr[0], ir = nr[1];
      var ur = e("overflow"), cr = ur[0], lr = ur[1];
      var fr = S && !n;
      var sr = E.x || E.y;
      var dr = p || _ || h || m || n;
      var pr = g || B || lr;
      var _r = H && C.x && C.y;
      var gr = function setScrollbarVisibility(r, e, a) {
        var t = r.includes(rr) && (q === K || q === "auto" && e === rr);
        z(na, t, a);
        return t;
      };
      s = Q;
      if (fr) {
        if (G && sr) {
          j(false);
          f();
          y((function() {
            f = ue(P, "scroll", or(j, true), {
              P: true
            });
          }));
        } else {
          j(true);
        }
      }
      if (T) {
        z(Je, _r);
      }
      if (N) {
        z(l);
        z(F, true);
        l = F;
      }
      if ($ && !G) {
        j(true);
      }
      if (X) {
        o = W === "move";
        u = W === "leave";
        c = W === "never";
        R(c, true);
      }
      if (tr) {
        z(sa, ar);
      }
      if (ir) {
        z(fa, vr);
      }
      if (pr) {
        var hr = gr(cr.x, x.x, true);
        var br = gr(cr.y, x.y, false);
        var mr = hr && br;
        z(va, !mr);
      }
      if (dr) {
        L();
        M();
        V();
        h && k();
        z(oa, !E.x, true);
        z(oa, !E.y, false);
        z(Qe, w && !D);
      }
    }, {}, A ];
  };
  var at = function createStructureSetupElements(r) {
    var e = ba();
    var a = e.F, n = e.k;
    var v = a(), i = v.elements;
    var o = i.padding, u = i.viewport, c = i.content;
    var l = T(r);
    var f = l ? {} : r;
    var s = f.elements;
    var d = s || {}, p = d.padding, _ = d.viewport, g = d.content;
    var h = l ? r : f.target;
    var b = zr(h);
    var m = h.ownerDocument;
    var S = m.documentElement;
    var y = function getDocumentWindow() {
      return m.defaultView || t;
    };
    var w = or(Sa, [ h ]);
    var O = or(ya, [ h ]);
    var C = or(Nr, "");
    var x = or(w, C, u);
    var E = or(O, C, c);
    var A = function elementHasOverflow(r) {
      var e = Qr(r);
      var a = ee(r);
      var t = getStyles(r, Z);
      var n = getStyles(r, G);
      return a.w - e.w > 0 && !Ba(t) || a.h - e.h > 0 && !Ba(n);
    };
    var H = x(_);
    var P = H === h;
    var D = P && b;
    var z = !P && E(g);
    var L = !P && H === z;
    var k = D ? S : H;
    var V = D ? k : h;
    var R = !P && O(C, o, p);
    var F = !L && z;
    var j = [ F, k, R, V ].map((function(r) {
      return T(r) && !Lr(r) && r;
    }));
    var U = function elementIsGenerated(r) {
      return r && M(j, r);
    };
    var q = !U(k) && A(k) ? k : h;
    var B = D ? S : k;
    var Y = D ? m : k;
    var W = {
      gr: h,
      hr: V,
      tr: k,
      oe: R,
      mr: F,
      br: B,
      Qr: Y,
      ue: b ? S : q,
      Kr: m,
      Sr: b,
      Lr: l,
      ar: P,
      ce: y,
      yr: function _viewportHasClass(r) {
        return xr(k, Le, r);
      },
      wr: function _viewportAddRemoveClass(r, e) {
        return Cr(k, Le, r, e);
      },
      Or: function _removeScrollObscuringStyles() {
        return Cr(B, Le, Fe, true);
      }
    };
    var X = W.gr, $ = W.hr, J = W.oe, K = W.tr, Q = W.mr;
    var rr = [ function() {
      Sr($, [ ze, Te ]);
      Sr(X, Te);
      if (b) {
        Sr(S, [ Te, ze ]);
      }
    } ];
    var er = Mr([ Q, K, J, $, X ].find((function(r) {
      return r && !U(r);
    })));
    var ar = D ? X : Q || K;
    var tr = or(N, rr);
    var nr = function appendElements() {
      var r = y();
      var e = kr();
      var a = function unwrap(r) {
        Fr(Lr(r), Mr(r));
        Rr(r);
      };
      var t = function prepareWrapUnwrapFocus(r) {
        return ue(r, "focusin focusout focus blur", fe, {
          T: true,
          H: false
        });
      };
      var v = "tabindex";
      var i = hr(K, v);
      var o = t(e);
      mr($, ze, P ? "" : Me);
      mr(J, Ue, "");
      mr(K, Le, "");
      mr(Q, qe, "");
      if (!P) {
        mr(K, v, i || "-1");
        b && mr(S, De, "");
      }
      Fr(ar, er);
      Fr($, J);
      Fr(J || $, !P && K);
      Fr(K, Q);
      I(rr, [ o, function() {
        var r = kr();
        var e = U(K);
        var n = e && r === K ? X : r;
        var o = t(n);
        Sr(J, Ue);
        Sr(Q, qe);
        Sr(K, Le);
        b && Sr(S, De);
        i ? mr(K, v, i) : Sr(K, v);
        U(Q) && a(Q);
        e && a(K);
        U(J) && a(J);
        be(n);
        o();
      } ]);
      if (n && !P) {
        Or(K, Le, Ne);
        I(rr, or(Sr, K, Le));
      }
      be(!P && b && e === X && r.top === r ? K : e);
      o();
      er = 0;
      return tr;
    };
    return [ W, nr, tr ];
  };
  var tt = function createTrinsicUpdateSegment(r) {
    var e = r.mr;
    return function(r) {
      var a = r.re, t = r.le, n = r.Mr;
      var v = a || {}, i = v.Ar;
      var o = t.Cr;
      var u = e && (i || n);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var nt = function createPaddingUpdateSegment(r, a) {
    var t = r.hr, n = r.oe, v = r.tr, i = r.ar;
    var o = e({
      i: vr,
      v: Xr()
    }, or(Xr, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Dr, t = r.re, o = r.le, l = r.Mr;
      var f = c(l), s = f[0], d = f[1];
      var p = ba(), _ = p.k;
      var g = t || {}, h = g._r, b = g.Hr, m = g.Er;
      var S = o.ir;
      var y = e("paddingAbsolute"), w = y[0], O = y[1];
      var C = l || b;
      if (h || d || C) {
        var x = u(l);
        s = x[0];
        d = x[1];
      }
      var E = !i && (O || m || d);
      if (E) {
        var A, H;
        var T = !w || !n && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (A = {}, A[W] = T && !S ? -P : 0, A[X] = T ? -D : 0, A[Y] = T && S ? -P : 0, 
        A.top = T ? -s.t : 0, A.right = T ? S ? -s.r : "auto" : 0, A.left = T ? S ? "auto" : -s.l : 0, 
        A[$] = T && "calc(100% + " + P + "px)", A);
        var M = (H = {}, H[j] = T ? s.t : 0, H[U] = T ? s.r : 0, H[B] = T ? s.b : 0, H[q] = T ? s.l : 0, 
        H);
        setStyles(n || v, z);
        setStyles(v, M);
        sr(a, {
          oe: s,
          fe: !T,
          ur: n ? M : sr({}, z, M)
        });
      }
      return {
        se: E
      };
    };
  };
  var vt = function createOverflowUpdateSegment(r, a) {
    var v = ba();
    var i = r.hr, o = r.oe, u = r.tr, c = r.ar, f = r.Qr, s = r.br, d = r.Sr, p = r.wr, _ = r.ce;
    var g = v.k;
    var h = d && c;
    var b = or(n, 0);
    var m = [ "display", "direction", "flexDirection", "writingMode" ];
    var S = {
      i: tr,
      v: {
        w: 0,
        h: 0
      }
    };
    var y = {
      i: nr,
      v: {}
    };
    var w = function setMeasuringMode(r) {
      p(Re, !h && r);
    };
    var O = function getOverflowAmount(r, e) {
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
    var C = e(S, or(ae, u)), x = C[0], E = C[1];
    var A = e(S, or(ee, u)), H = A[0], T = A[1];
    var P = e(S), D = P[0], z = P[1];
    var M = e(y), L = M[0];
    var I = e(S), k = I[0], V = I[1];
    var R = e(y), F = R[0];
    var N = e({
      i: function _equal(r, e) {
        return ar(r, e, m);
      },
      v: {}
    }, (function() {
      return ne(u) ? getStyles(u, m) : {};
    })), j = N[0];
    var U = e({
      i: function _equal(r, e) {
        return nr(r.D, e.D) && nr(r.M, e.M);
      },
      v: pe()
    }, (function() {
      w(true);
      var r = de(s);
      var e = p(je, true);
      var a = ue(f, rr, (function(e) {
        var a = de(s);
        if (e.isTrusted && a.x === r.x && a.y === r.y) {
          ce(e);
        }
      }), {
        T: true,
        P: true
      });
      se(s, {
        x: 0,
        y: 0
      });
      e();
      var t = de(s);
      var n = ee(s);
      se(s, {
        x: n.w,
        y: n.h
      });
      var v = de(s);
      se(s, {
        x: v.x - t.x < 1 && -n.w,
        y: v.y - t.y < 1 && -n.h
      });
      var i = de(s);
      se(s, r);
      l((function() {
        return a();
      }));
      return {
        D: t,
        M: i
      };
    })), q = U[0], B = U[1];
    var Y = Ma(Wa);
    var W = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? Ie : ke;
      return "" + a + er(r);
    };
    var X = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ K, Q, rr ].map((function(e) {
          return W(e, r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      p(a);
      p(fr(r).map((function(e) {
        return W(r[e], e === "x");
      })).join(" "), true);
    };
    return function(e, t) {
      var n = e.Dr, c = e.re, l = e.le, f = e.Mr;
      var s = t.se;
      var d = c || {}, m = d.Er, S = d.pr, y = d.Pr;
      var C = Y && Y.er(r, a, l, v, n);
      var A = C || {}, P = A.lr, M = A.sr, I = A.dr;
      var R = qa(n, v), N = R[0], U = R[1];
      var W = n("overflow"), Z = W[0], G = W[1];
      var $ = Ba(Z.x);
      var J = Ba(Z.y);
      var K = true;
      var Q = E(f);
      var rr = T(f);
      var er = z(f);
      var ar = V(f);
      if (U && g) {
        p(Ne, !N);
      }
      if (xr(i, ze, Pe)) {
        w(true);
      }
      var tr = M ? M() : [], nr = tr[0];
      var vr = Q = x(f), ir = vr[0];
      var or = rr = H(f), ur = or[0];
      var cr = re(u);
      var lr = h && Kr(_());
      var fr = {
        w: b(ur.w + ir.w),
        h: b(ur.h + ir.h)
      };
      var dr = {
        w: b((lr ? lr.w : cr.w + b(cr.w - ur.w)) + ir.w),
        h: b((lr ? lr.h : cr.h + b(cr.h - ur.h)) + ir.h)
      };
      nr && nr();
      ar = k(dr);
      er = D(O(fr, dr), f);
      var pr = ar, _r = pr[0], gr = pr[1];
      var hr = er, br = hr[0], mr = hr[1];
      var Sr = rr, yr = Sr[0], wr = Sr[1];
      var Or = Q, Er = Or[0], Ar = Or[1];
      var Hr = L({
        x: br.w > 0,
        y: br.h > 0
      }), Tr = Hr[0], Pr = Hr[1];
      var Dr = $ && J && (Tr.x || Tr.y) || $ && Tr.x && !Tr.y || J && Tr.y && !Tr.x;
      var zr = s || m || y || Ar || wr || gr || mr || G || U || K;
      var Mr = Ya(Tr, Z);
      var Lr = F(Mr.K), Ir = Lr[0], kr = Lr[1];
      var Vr = j(f), Rr = Vr[1];
      var Fr = m || S || Rr || Pr || f;
      var Nr = Fr ? q(f) : B(), jr = Nr[0], Ur = Nr[1];
      if (zr) {
        kr && X(Mr.K);
        if (I && P) {
          setStyles(u, I(Mr, l, P(Mr, yr, Er)));
        }
      }
      w(false);
      Cr(i, ze, Pe, Dr);
      Cr(o, Ue, Pe, Dr);
      sr(a, {
        K: Ir,
        Rr: {
          x: _r.w,
          y: _r.h
        },
        Vr: {
          x: br.w,
          y: br.h
        },
        ie: Tr,
        Fr: _e(jr, br)
      });
      return {
        ne: kr,
        ae: gr,
        te: mr,
        ve: Ur || mr,
        de: Fr
      };
    };
  };
  var it = function createStructureSetup(r) {
    var e;
    var a = at(r), t = a[0], n = a[1], v = a[2];
    var i = {
      oe: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      fe: false,
      ur: (e = {}, e[W] = 0, e[X] = 0, e[Y] = 0, e[j] = 0, e[U] = 0, e[B] = 0, e[q] = 0, 
      e),
      Rr: {
        x: 0,
        y: 0
      },
      Vr: {
        x: 0,
        y: 0
      },
      K: {
        x: Q,
        y: Q
      },
      ie: {
        x: false,
        y: false
      },
      Fr: pe()
    };
    var o = t.gr, u = t.br, c = t.ar, l = t.Or;
    var f = ba(), s = f.k, d = f.I;
    var p = !s && (d.x || d.y);
    var _ = [ tt(t), nt(t, i), vt(t, i) ];
    return [ n, function(r) {
      var e = {};
      var a = p;
      var t = a && de(u);
      var n = t && l();
      each(_, (function(a) {
        sr(e, a(r, e) || {});
      }));
      se(u, t);
      n && n();
      !c && se(o, 0);
      return e;
    }, i, t, v ];
  };
  var ot = function createSetups(r, e, a, t, n) {
    var v = false;
    var i = xe(e, {});
    var o = it(r), u = o[0], c = o[1], l = o[2], f = o[3], s = o[4];
    var d = Ka(f, l, i, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = et(r, e, g, l, f, n), b = h[0], m = h[1], S = h[3];
    var y = function updateHintsAreTruthy(r) {
      return fr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var w = function update(r, n) {
      if (a()) {
        return false;
      }
      var i = r.pe, o = r.Mr, u = r.zr, l = r._e;
      var f = i || {};
      var s = !!o || !v;
      var d = {
        Dr: xe(e, f, s),
        pe: f,
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
        le: g,
        re: p
      }));
      m(sr({}, d, {
        re: p,
        ee: h
      }));
      var b = y(p);
      var S = y(h);
      var w = b || S || !pr(f) || s;
      v = true;
      w && t(r, {
        re: p,
        ee: h
      });
      return w;
    };
    return [ function() {
      var r = f.ue, e = f.br, a = f.Or;
      var t = de(r);
      var n = [ p(), u(), b() ];
      var v = a();
      se(e, t);
      v();
      return or(N, n);
    }, w, function() {
      return {
        ge: g,
        he: l
      };
    }, {
      be: f,
      me: S
    }, s ];
  };
  var ut = function OverlayScrollbars(r, e, a) {
    var t = ba(), n = t.j;
    var v = T(r);
    var i = v ? r : r.target;
    var o = Ea(i);
    if (e && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var e = dr(r, true);
        var a = Ma(Na);
        return a ? a(e, true) : e;
      };
      var s = sr({}, n(), f(e));
      var d = Se(), p = d[0], _ = d[1], g = d[2];
      var h = Se(a), b = h[0], m = h[1], S = h[2];
      var y = function triggerEvent(r, e) {
        S(r, e);
        g(r, e);
      };
      var w = ot(r, s, (function() {
        return u;
      }), (function(r, e) {
        var a = r.pe, t = r.Mr;
        var n = e.re, v = e.ee;
        var i = n._r, o = n.Er, u = n.Ar, c = n.Hr, l = n.Tr, f = n.pr;
        var s = v.ae, d = v.te, p = v.ne, _ = v.ve;
        y("updated", [ P, {
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
          changedOptions: a || {},
          force: !!t
        } ]);
      }), (function(r) {
        return y("scroll", [ P, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var H = function destroy(r) {
        xa(i);
        N(c);
        u = true;
        y("destroyed", [ P, r ]);
        _();
        m();
      };
      var P = {
        options: function options(r, e) {
          if (r) {
            var a = e ? n() : {};
            var t = Ce(s, sr(a, f(r)));
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
          r && e && m(r, e);
        },
        state: function state() {
          var r = x(), e = r.ge, a = r.he;
          var t = e.ir;
          var n = a.Rr, v = a.Vr, i = a.K, o = a.ie, c = a.oe, l = a.fe, f = a.Fr;
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
          var r = E.be, e = r.gr, a = r.hr, t = r.oe, n = r.tr, v = r.mr, i = r.br, o = r.Qr;
          var u = E.me, c = u.Xr, l = u.Jr;
          var f = function translateScrollbarStructure(r) {
            var e = r.jr, a = r.Nr, t = r.Ir;
            return {
              scrollbar: t,
              track: a,
              handle: e
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var e = r.Zr, a = r.Gr;
            var t = f(e[0]);
            return sr({}, t, {
              clone: function clone() {
                var r = f(a());
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
        destroy: or(H, false),
        plugin: function plugin(r) {
          return l[fr(r)[0]];
        }
      };
      I(c, [ A ]);
      Ca(i, P);
      za(Ta, OverlayScrollbars, [ P, p, l ]);
      if (wa(E.be.Sr, !v && r.cancel)) {
        H(true);
        return P;
      }
      I(c, O());
      y("initialized", [ P ]);
      P.update();
      return P;
    }
    return o;
  };
  ut.plugin = function(r) {
    var e = x(r);
    var a = e ? r : [ r ];
    var t = a.map((function(r) {
      return za(r, ut)[0];
    }));
    Da(a);
    return e ? t : t[0];
  };
  ut.valid = function(r) {
    var e = r && r.elements;
    var a = C(e) && e();
    return H(a) && !!Ea(a.target);
  };
  ut.env = function() {
    var r = ba(), e = r.L, a = r.I, t = r.k, n = r.V, v = r.q, i = r.B, o = r.F, u = r.N, c = r.j, l = r.U;
    return sr({}, {
      scrollbarsSize: e,
      scrollbarsOverlaid: a,
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
  ut.nonce = _a;
  r.ClickScrollPlugin = Ga;
  r.OverlayScrollbars = ut;
  r.ScrollbarsHidingPlugin = Xa;
  r.SizeObserverPlugin = Ua;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
