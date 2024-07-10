/*!
 * OverlayScrollbars
 * Version: 2.9.2
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
  var z = function animateNumber(r, e, a, t, i) {
    var v = 0;
    var o = D();
    var u = n(0, a);
    var f = function frame(a) {
      var c = D();
      var f = c - o;
      var s = f >= u;
      var d = a ? 1 : 1 - (n(0, o + u - c) / u || 0);
      var p = (e - r) * (C(i) ? i(d, d * u, 0, 1, u) : d) + r;
      var _ = s || d === 1;
      t && t(p, d, _);
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
        var i = t ? t(r[a]) : r[a];
        var v = t ? t(e[a]) : e[a];
        if (i !== v) {
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
      var a = y(e) && e >= 0;
      if (a) {
        var v = C(n) ? n() : n;
        var m = y(v) && v >= 0;
        var S = e > 0 ? f : l;
        var w = e > 0 ? s : c;
        var O = h(r);
        var x = O || r;
        var E = g.bind(0, x);
        var A;
        _();
        if (i && !p) {
          E();
          p = true;
          A = S((function() {
            return p = void 0;
          }), e);
        } else {
          A = S(E, e);
          if (m && !o) {
            o = f(b, v);
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
        if (n && H(n)) {
          var v = r[t];
          var o = v;
          if (i && !x(v)) {
            o = [];
          } else if (!i && !H(v)) {
            o = {};
          }
          r[t] = assignDeep(o, n);
        } else {
          r[t] = i ? n.slice() : n;
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
    var i = Ir(n, e) === t;
    return t && n ? t === r || n === r || i && Ir(Ir(r, a), e) !== t : false;
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
      } catch (i) {}
    }));
  }
  function getStyles(r, e, a) {
    var n = w(e);
    var i = n ? "" : {};
    if (r) {
      var v = t.getComputedStyle(r, a) || r.style;
      i = n ? Ur(v, e) : k(e).reduce((function(r, e) {
        r[e] = Ur(v, e);
        return r;
      }), i);
    }
    return i;
  }
  var Xr = function topRightBottomLeft(r, e, a) {
    var t = e ? e + "-" : "";
    var n = a ? "-" + a : "";
    var i = t + "top" + n;
    var v = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Br(c[i]),
      r: Br(c[v]),
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
      w: e - v(e),
      h: a - v(a)
    };
  };
  var te = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ne = function hasDimensions(r) {
    return !!r && Gr(r);
  };
  var ie = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var ve = function domRectAppeared(r, e) {
    var a = ie(r);
    var t = ie(e);
    return !t && a;
  };
  var oe = function removeEventListener(r, e, a, t) {
    each(gr(e), (function(e) {
      r && r.removeEventListener(e, a, t);
    }));
  };
  var ue = function addEventListener(r, e, a, t) {
    var n;
    var i = (n = t && t.H) != null ? n : true;
    var v = t && t.T || false;
    var o = t && t.P || false;
    var u = {
      passive: i,
      capture: v
    };
    return or(N, gr(e).map((function(e) {
      var t = o ? function(n) {
        oe(r, e, t, v);
        a && a(n);
      } : a;
      r && r.addEventListener(e, t, u);
      return or(oe, r, e, t, v);
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
    var c = v(a.x, t.x, n), l = c[0], f = c[1];
    var s = v(a.y, t.y, i), d = s[0], p = s[1];
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
      var i = fr(r);
      var v = [];
      each(i, (function(e) {
        var a = r[e];
        a && I(v, addEvent(e, a));
      }));
      return or(N, v);
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
      var i = e[t];
      if (E(n) && E(i)) {
        sr(a[t] = {}, getOptionsDiff(n, i));
        if (pr(a[t])) {
          delete a[t];
        }
      } else if (lr(e, t) && i !== n) {
        var v = true;
        if (x(n) || x(i)) {
          try {
            if (ye(n) === ye(i)) {
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
  var ia = Ke + "-cornerless";
  var va = Ke + "-interaction";
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
      var i = ae(e);
      a && Rr(r);
      return {
        x: n.h - t.h + i.h,
        y: n.w - t.w + i.w
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
    var i = jr('<div class="' + Ae + '"><div></div><style>' + n + "</style></div>");
    var v = i[0];
    var o = v.firstChild;
    var u = v.lastChild;
    var c = pa();
    if (c) {
      u.nonce = c;
    }
    var l = Se(), f = l[0], s = l[2];
    var d = e({
      i: r(v, o),
      v: nr
    }, or(r, v, o, true)), p = d[0], _ = d[1];
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
    Sr(v, "style");
    Rr(v);
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
    var i = ma(r, n);
    return i || e.apply(0, r);
  };
  var ya = function dynamicInitializationElement(r, e, a, t) {
    var n = b(t) ? a : t;
    var i = ma(r, n);
    return !!i && (T(i) ? i : e.apply(0, r));
  };
  var wa = function cancelInitialization(r, e) {
    var a = e || {}, t = a.nativeScrollbarsOverlaid, n = a.body;
    var i = ba(), v = i.I, o = i.k, u = i.F;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = t != null ? t : l;
    var d = b(n) ? f : n;
    var p = (v.x || v.y) && s;
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
    var i = function destroy() {
      t = true;
    };
    var v = function updateElements(i) {
      if (n && a) {
        var v = a.map((function(e) {
          var a = e || [], t = a[0], n = a[1];
          var v = n && t ? (i || Tr)(t, r) : [];
          return [ v, n ];
        }));
        each(v, (function(a) {
          return each(a[0], (function(i) {
            var v = a[1];
            var o = n.get(i) || [];
            var u = r.contains(i);
            if (u && v) {
              var c = ue(i, v, (function(r) {
                if (t) {
                  c();
                  n.delete(i);
                } else {
                  e(r);
                }
              }));
              n.set(i, I(o, c));
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
  var Ha = function createDOMObserver(r, e, a, t) {
    var n = false;
    var i = t || {}, v = i.Y, o = i.W, u = i.X, c = i.Z, l = i.G, f = i.$;
    var s = cr((function() {
      return n && a(true);
    }), {
      u: 33,
      p: 99
    });
    var d = Aa(r, s, u), _ = d[0], g = d[1];
    var h = v || [];
    var b = o || [];
    var m = L(h, b);
    var S = function observerCallback(n, i) {
      if (!R(i)) {
        var v = l || vr;
        var o = f || vr;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(a) {
          var n = a.attributeName, i = a.target, l = a.type, f = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var h = l === "attributes";
          var m = l === "childList";
          var S = r === i;
          var y = h && n;
          var O = y && hr(i, n || "");
          var C = w(O) ? O : null;
          var x = y && f !== C;
          var E = M(b, n) && x;
          if (e && (m || !S)) {
            var A = h && x;
            var H = A && c && Dr(i, c);
            var T = H ? !v(i, n, f, C) : !h || A;
            var P = T && !o(a, !!H, r, t);
            each(_, (function(r) {
              return I(u, r);
            }));
            each(g, (function(r) {
              return I(u, r);
            }));
            p = p || P;
          }
          if (!e && S && x && !v(i, n, f, C)) {
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
      var n = r[t], i = n.static, v = n.instance;
      var o = a || [], u = o[0], c = o[1], l = o[2];
      var f = a ? v : i;
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
    var i = ka({}, e);
    var v = fr(r).filter((function(r) {
      return lr(e, r);
    }));
    each(v, (function(v) {
      var o = e[v];
      var u = r[v];
      var c = H(u);
      var l = t ? t + "." : "";
      if (c && H(o)) {
        var f = validateRecursive(u, o, a, l + v), s = f[0], d = f[1];
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
          n[v] = o;
        } else if (a) {
          console.warn('The option "' + l + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ n, i ];
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
        var i = "never scroll leavemove";
        var v = {
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
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: e,
            pointers: [ Va.array, Va.null ]
          }
        };
        return function(r, e) {
          var a = Fa(v, r, e), t = a[0], n = a[1];
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
          var i = "scroll";
          var v = jr('<div class="' + Ze + '" dir="ltr"><div class="' + Ze + '"><div class="' + Ge + '"></div></div><div class="' + Ze + '"><div class="' + Ge + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
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
          var S = [ Fr(r, v), ue(f, i, m), ue(u, i, m) ];
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
    var t = r("showNativeOverlaidScrollbars"), n = t[0], i = t[1];
    return [ n && a.x && a.y, i ];
  };
  var Ba = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Ya = function createViewportOverflowState(r, e) {
    var a = function getAxisOverflowStyle(r, e, a, t) {
      var n = r === K ? Q : r.replace(K + "-", "");
      var i = Ba(r);
      var v = Ba(a);
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
            var i = r.ar, v = r.tr;
            var o = t.k, u = t.I, c = t.L;
            var l = !i && !o && (u.x || u.y);
            var f = qa(n, t), s = f[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var e = getStyles(v, r);
                var a = e === rr;
                return [ e, a ];
              };
              var e = r(Z), a = e[0], t = e[1];
              var n = r(G), i = n[0], o = n[1];
              return {
                K: {
                  x: a,
                  y: i
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
                var i = e && !o ? n : 0;
                var v = r && !!a;
                return [ i, v ];
              };
              var n = t(u.x, e.x, c.x), i = n[0], v = n[1];
              var l = t(u.y, e.y, c.y), f = l[0], d = l[1];
              return {
                nr: {
                  x: i,
                  y: f
                },
                ir: {
                  x: v,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, a, t) {
              var n = a.vr;
              if (!i) {
                var v;
                var o = sr({}, (v = {}, v[W] = 0, v[X] = 0, v[Y] = 0, v));
                var u = p(r), c = u.nr, l = u.ir;
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
                var i = e.ur;
                var o = p(r), u = o.nr, c = o.ir;
                var f = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = a.vr;
                var h = g ? U : q;
                var b = i[h];
                var m = i.paddingTop;
                var S = t.w + n.w;
                var y = t.h + n.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: d && f ? d + y - m + "px" : ""
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
                var t = r || d();
                var n = e.ur;
                var i = p(t), o = i.ir;
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
                var g = getStyles(v, fr(f));
                var h = wr(v, Le, Ve);
                setStyles(v, f);
                return [ function() {
                  setStyles(v, sr({}, g, _(t, a, l)));
                  h();
                }, t ];
              }
              return [ vr ];
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
          var i = false;
          var v = vr;
          var o = vr;
          var u = ur(133), c = u[0], l = u[1];
          var f = function animateClickScroll(v, u, l) {
            return z(v, v + t * Math.sign(a), u ? 133 : 222, (function(a, v, l) {
              r(a);
              var f = e();
              var s = f + t;
              var d = n >= f && n <= s;
              var p = function animationCompletedAction() {
                o = animateClickScroll(a, u + 1);
              };
              if (!i && l && !d) {
                if (u) {
                  p();
                } else {
                  c(p);
                }
              }
            }), l);
          };
          v = f(0, 0, (function(r) {
            return 1 - (1 - r) * (1 - r);
          }));
          return function(r) {
            i = true;
            l();
            if (r) {
              v();
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
    var n = t || {}, i = n.pr;
    var v = Ma(ja);
    var o = e({
      i: false,
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
          var i = u(r.contentRect), v = i[0], o = i[2];
          var c = ie(v);
          n = ve(v, o);
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
      } else if (v) {
        var f = v(o, c, i), s = f[0], d = f[1];
        I(e, L([ Hr(n, Ye), ue(n, "animationstart", s) ], d));
      } else {
        return vr;
      }
      return or(N, I(e, Fr(r, n)));
    };
  };
  var Ja = function createTrinsicObserver(r, a) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Nr($e);
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
        I(e, (function() {
          t.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = Qr(i);
          u(r);
        };
        I(e, $a(i, a)());
        a();
      }
      return or(N, I(e, Fr(r, i)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Ka = function createObserversSetup(r, a, t, n) {
    var i;
    var v;
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
      vr: H(p)
    };
    var P = ba();
    var D = Ma(Wa);
    var z = e({
      v: tr,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = D && D.er(r, a, T, P, t).sr;
      var n = w && S;
      var i = !n && xr(_, ze, Pe);
      var v = !S && O(Ve);
      var o = v && de(b);
      var u = o && A();
      var c = E(Re, i);
      var l = v && e && e()[0];
      var f = ee(h);
      var s = ae(h);
      l && l();
      se(b, o);
      u && u();
      i && c();
      return {
        w: f.w + s.w,
        h: f.h + s.h
      };
    })), M = z[0];
    var I = cr(n, {
      u: function _timeout() {
        return i;
      },
      p: function _maxDelay() {
        return v;
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
        vr: e
      });
      l = e;
    };
    var V = function onTrinsicChanged(r, e) {
      var a = r[0], t = r[1];
      var i = {
        Ar: t
      };
      sr(T, {
        Cr: a
      });
      !e && n(i);
      return i;
    };
    var R = function onSizeChanged(r) {
      var e = r._r, a = r.pr;
      var t = e && !a;
      var i = !t && P.k ? I : n;
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
        Hr: t
      };
      k(i);
      var v = r ? n : I;
      t && !e && v(i);
      return i;
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
        pr: ve(e, c)
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
          i = y(j) && j;
          v = y(U) && U;
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
    var i = "--os-scroll-percent";
    var v = "--os-scroll-direction";
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
          }, a[i] = [ 0, 1 ], a), {
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
      var i = t ? !a : true;
      n && z(E, r, e);
      i && z(A, r, e);
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
            return [ e.Ir, (a = {}, a[i] = Yr(r) + "", a) ];
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
          return [ e.Ir, (a = {}, a[v] = r ? "0" : "1", a) ];
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
        var i = function styleScrollbarPosition(e) {
          var a = e.Ir;
          var i = Lr(a) === p && a;
          var v = function getTranslateValue(r, e, a) {
            var t = e * r;
            return Wr(a ? t : -t);
          };
          return [ i, i && {
            transform: Zr({
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
      var a = r ? ra : ea;
      var n = Nr(Ke + " " + a);
      var i = Nr(aa);
      var v = Nr(ta);
      var o = {
        Ir: n,
        Nr: i,
        jr: v
      };
      var u = P[e];
      I(r ? E : A, o);
      I(x, [ Fr(n, i), Fr(i, v), or(Rr, n), u && u.kr(o), t(o, L, r) ]);
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
    return function(n, i, u) {
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
        var i = u ? "left" : "top";
        var c = u ? "w" : "h";
        var l = u ? "x" : "y";
        var f = function createRelativeHandleMove(r, e) {
          return function(t) {
            var n;
            var i = a.Vr;
            var v = Qr(h)[c] - Qr(b)[c];
            var o = e * t / v;
            var u = o * i[l];
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
              return (r || T())[i] - (e || P())[i];
            };
            var z = v(te(d)[n]) / Qr(d)[c] || 1;
            var M = f(de(d)[l], 1 / z);
            var L = a[t];
            var k = T();
            var V = P();
            var R = k[n];
            var F = D(k, V) + R / 2;
            var j = L - V[i];
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
        i(va, true);
      })), ue(g, "pointerleave pointercancel", (function() {
        i(va, false);
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
        i(la, true);
        S((function() {
          H = true;
          i(la);
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
  var et = function createScrollbarsSetup(r, e, a, t, n, i) {
    var v;
    var o;
    var u;
    var c;
    var l;
    var f = vr;
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
      if (u ? !v : !c) {
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
        v = u;
        u && R(true);
      }
    };
    var q = [ x, m, w, g, function() {
      return f();
    }, ue(T, "pointerover", U, {
      P: true
    }), ue(T, "pointerenter", U), ue(T, "pointerleave", (function(r) {
      if (d(r)) {
        v = false;
        u && R(false);
      }
    })), ue(T, "pointermove", (function(r) {
      d(r) && o && F();
    })), ue(P, "scroll", (function(r) {
      _((function() {
        L();
        F();
      }));
      i(r);
      V();
    })) ];
    return [ function() {
      return or(N, I(q, H()));
    }, function(r) {
      var e = r.Dr, n = r.Mr, i = r.re, v = r.ee;
      var d = v || {}, p = d.ae, _ = d.te, g = d.ne, h = d.ie;
      var b = i || {}, m = b.Er, S = b.pr;
      var w = a.vr;
      var O = ba(), C = O.I;
      var x = t.K, E = t.ve;
      var A = e("showNativeOverlaidScrollbars"), H = A[0], T = A[1];
      var I = e("scrollbars.theme"), F = I[0], N = I[1];
      var U = e("scrollbars.visibility"), q = U[0], B = U[1];
      var Y = e("scrollbars.autoHide"), W = Y[0], X = Y[1];
      var Z = e("scrollbars.autoHideSuspend"), G = Z[0], $ = Z[1];
      var J = e("scrollbars.autoHideDelay"), Q = J[0];
      var er = e("scrollbars.dragScroll"), ar = er[0], tr = er[1];
      var nr = e("scrollbars.clickScroll"), ir = nr[0], vr = nr[1];
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
      if (vr) {
        z(fa, ir);
      }
      if (pr) {
        var hr = gr(cr.x, x.x, true);
        var br = gr(cr.y, x.y, false);
        var mr = hr && br;
        z(ia, !mr);
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
    var i = a(), v = i.elements;
    var o = v.padding, u = v.viewport, c = v.content;
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
      var i = "tabindex";
      var v = hr(K, i);
      var o = t(e);
      mr($, ze, P ? "" : Me);
      mr(J, Ue, "");
      mr(K, Le, "");
      mr(Q, qe, "");
      if (!P) {
        mr(K, i, v || "-1");
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
        v ? mr(K, i, v) : Sr(K, i);
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
    var t = r.hr, n = r.oe, i = r.tr, v = r.ar;
    var o = e({
      v: ir,
      i: Xr()
    }, or(Xr, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.Dr, t = r.re, o = r.le, l = r.Mr;
      var f = c(l), s = f[0], d = f[1];
      var p = ba(), _ = p.k;
      var g = t || {}, h = g._r, b = g.Hr, m = g.Er;
      var S = o.vr;
      var y = e("paddingAbsolute"), w = y[0], O = y[1];
      var C = l || b;
      if (h || d || C) {
        var x = u(l);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || m || d);
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
        setStyles(n || i, z);
        setStyles(i, M);
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
  var it = function createOverflowUpdateSegment(r, a) {
    var i = ba();
    var v = r.hr, o = r.oe, u = r.tr, c = r.ar, f = r.Qr, s = r.br, d = r.Sr, p = r.wr, _ = r.ce;
    var g = i.k;
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
    var S = fr(m);
    var y = {
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
      p(Re, !h && r);
    };
    var C = function getMeasuredScrollCoordinates(r) {
      var e = S.some((function(e) {
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
      var a = de(s);
      var t = p(je, true);
      var n = ue(f, rr, (function(r) {
        var e = de(s);
        if (r.isTrusted && e.x === a.x && e.y === a.y) {
          ce(r);
        }
      }), {
        T: true,
        P: true
      });
      se(s, {
        x: 0,
        y: 0
      });
      t();
      var i = de(s);
      var v = ee(s);
      se(s, {
        x: v.w,
        y: v.h
      });
      var o = de(s);
      se(s, {
        x: o.x - i.x < 1 && -v.w,
        y: o.y - i.y < 1 && -v.h
      });
      var u = de(s);
      se(s, a);
      l((function() {
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
    var E = e(y, or(ae, u)), A = E[0], H = E[1];
    var T = e(y, or(ee, u)), P = T[0], D = T[1];
    var z = e(y), M = z[0], L = z[1];
    var I = e(w), k = I[0];
    var V = e(y), R = V[0], F = V[1];
    var N = e(w), j = N[0];
    var U = e({
      v: function _equal(r, e) {
        return ar(r, e, S);
      },
      i: {}
    }, (function() {
      return ne(u) ? getStyles(u, S) : {};
    })), q = U[0];
    var B = e({
      v: function _equal(r, e) {
        return nr(r.D, e.D) && nr(r.M, e.M);
      },
      i: pe()
    }), Y = B[0], W = B[1];
    var X = Ma(Wa);
    var Z = function createViewportOverflowStyleClassName(r, e) {
      var a = e ? Ie : ke;
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
      p(fr(r).map((function(e) {
        return Z(r[e], e === "x");
      })).join(" "), true);
    };
    return function(e, t) {
      var n = e.Dr, c = e.re, l = e.le, f = e.Mr;
      var s = t.se;
      var d = c || {}, m = d.Er, S = d.pr, y = d.Pr;
      var w = X && X.er(r, a, l, i, n);
      var E = w || {}, T = E.lr, z = E.sr, I = E.dr;
      var V = qa(n, i), N = V[0], U = V[1];
      var B = n("overflow"), Z = B[0], $ = B[1];
      var J = Ba(Z.x);
      var K = Ba(Z.y);
      var Q = true;
      var rr = H(f);
      var er = D(f);
      var ar = L(f);
      var tr = F(f);
      if (U && g) {
        p(Ne, !N);
      }
      if (xr(v, ze, Pe)) {
        O(true);
      }
      var nr = z ? z() : [], ir = nr[0];
      var vr = rr = A(f), or = vr[0];
      var ur = er = P(f), cr = ur[0];
      var lr = re(u);
      var fr = h && Kr(_());
      var dr = {
        w: b(cr.w + or.w),
        h: b(cr.h + or.h)
      };
      var pr = {
        w: b((fr ? fr.w : lr.w + b(lr.w - cr.w)) + or.w),
        h: b((fr ? fr.h : lr.h + b(lr.h - cr.h)) + or.h)
      };
      ir && ir();
      tr = R(pr);
      ar = M(x(dr, pr), f);
      var _r = tr, gr = _r[0], hr = _r[1];
      var br = ar, mr = br[0], Sr = br[1];
      var yr = er, wr = yr[0], Or = yr[1];
      var Er = rr, Ar = Er[0], Hr = Er[1];
      var Tr = k({
        x: mr.w > 0,
        y: mr.h > 0
      }), Pr = Tr[0], Dr = Tr[1];
      var zr = J && K && (Pr.x || Pr.y) || J && Pr.x && !Pr.y || K && Pr.y && !Pr.x;
      var Mr = s || m || y || Hr || Or || hr || Sr || $ || U || Q;
      var Lr = Ya(Pr, Z);
      var Ir = j(Lr.K), kr = Ir[0], Vr = Ir[1];
      var Rr = q(f), Fr = Rr[0], Nr = Rr[1];
      var jr = m || S || Nr || Dr || f;
      var Ur = jr ? Y(C(Fr), f) : W(), qr = Ur[0], Br = Ur[1];
      if (Mr) {
        Vr && G(Lr.K);
        if (I && T) {
          setStyles(u, I(Lr, l, T(Lr, wr, Ar)));
        }
      }
      O(false);
      Cr(v, ze, Pe, zr);
      Cr(o, Ue, Pe, zr);
      sr(a, {
        K: kr,
        Rr: {
          x: gr.w,
          y: gr.h
        },
        Vr: {
          x: mr.w,
          y: mr.h
        },
        ve: Pr,
        Fr: _e(qr, mr)
      });
      return {
        ne: Vr,
        ae: hr,
        te: Sr,
        ie: Br || Sr,
        de: jr
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
      ve: {
        x: false,
        y: false
      },
      Fr: pe()
    };
    var o = t.gr, u = t.br, c = t.ar, l = t.Or;
    var f = ba(), s = f.k, d = f.I;
    var p = !s && (d.x || d.y);
    var _ = [ tt(t), nt(t, v), it(t, v) ];
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
    }, v, t, i ];
  };
  var ot = function createSetups(r, e, a, t, n) {
    var i = false;
    var v = xe(e, {});
    var o = vt(r), u = o[0], c = o[1], l = o[2], f = o[3], s = o[4];
    var d = Ka(f, l, v, (function(r) {
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
      var v = r.pe, o = r.Mr, u = r.zr, l = r._e;
      var f = v || {};
      var s = !!o || !i;
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
      i = true;
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
      var i = a();
      se(e, t);
      i();
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
    var i = T(r);
    var v = i ? r : r.target;
    var o = Ea(v);
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
        var n = e.re, i = e.ee;
        var v = n._r, o = n.Er, u = n.Ar, c = n.Hr, l = n.Tr, f = n.pr;
        var s = i.ae, d = i.te, p = i.ne, _ = i.ie;
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
        xa(v);
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
          var t = e.vr;
          var n = a.Rr, i = a.Vr, v = a.K, o = a.ve, c = a.oe, l = a.fe, f = a.Fr;
          return sr({}, {
            overflowEdge: n,
            overflowAmount: i,
            overflowStyle: v,
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
          var r = E.be, e = r.gr, a = r.hr, t = r.oe, n = r.tr, i = r.mr, v = r.br, o = r.Qr;
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
            content: i || n,
            scrollOffsetElement: v,
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
      Ca(v, P);
      za(Ta, OverlayScrollbars, [ P, p, l ]);
      if (wa(E.be.Sr, !i && r.cancel)) {
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
    var r = ba(), e = r.L, a = r.I, t = r.k, n = r.V, i = r.q, v = r.B, o = r.F, u = r.N, c = r.j, l = r.U;
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
