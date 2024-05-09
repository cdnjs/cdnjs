/*!
 * OverlayScrollbars
 * Version: 2.8.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var a = function createCache(r, a) {
    var e = r.i, t = r.v, n = r.o;
    var i = e;
    var v;
    var o = function cacheUpdateContextual(r, a) {
      var e = i;
      var o = r;
      var u = a || (t ? !t(e, o) : e !== o);
      if (u || n) {
        i = o;
        v = e;
      }
      return [ i, u, v ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(a(i, v), r);
    };
    var c = function getCurrentCache(r) {
      return [ i, !!r, v ];
    };
    return [ a ? u : o, c ];
  };
  var e = typeof window !== "undefined" && typeof document !== "undefined";
  var t = e ? window : {};
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
  var m = e && Node.ELEMENT_NODE;
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
    var a = !!r && r.length;
    var e = E(a) && a > -1 && a % 1 == 0;
    return P(r) || !T(r) && e ? a > 0 && D(r) ? a - 1 in r : true : false;
  };
  var L = function isPlainObject(r) {
    if (!r || !D(r) || x(r) !== "object") {
      return false;
    }
    var a;
    var e = "constructor";
    var t = r[e];
    var n = t && t.prototype;
    var i = y.call(r, e);
    var v = n && y.call(n, "isPrototypeOf");
    if (t && !i && !v) {
      return false;
    }
    for (a in r) {}
    return O(a) || y.call(r, a);
  };
  var k = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === m : false;
  };
  var I = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === m : false;
  };
  var M = function animationCurrentTime() {
    return performance.now();
  };
  var R = function animateNumber(r, a, e, t, i) {
    var v = 0;
    var o = M();
    var u = n(0, e);
    var f = function frame(e) {
      var c = M();
      var f = c - o;
      var s = f >= u;
      var d = e ? 1 : 1 - (n(0, o + u - c) / u || 0);
      var p = (a - r) * (T(i) ? i(d, d * u, 0, 1, u) : d) + r;
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
  function each(r, a) {
    if (z(r)) {
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
  var V = function inArray(r, a) {
    return r.indexOf(a) >= 0;
  };
  var F = function concat(r, a) {
    return r.concat(a);
  };
  var j = function push(r, a, e) {
    !e && !A(a) && z(a) ? Array.prototype.push.apply(r, a) : r.push(a);
    return r;
  };
  var N = function from(r) {
    return Array.from(r || []);
  };
  var U = function createOrKeepArray(r) {
    return P(r) ? r : [ r ];
  };
  var q = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var B = function deduplicateArray(r) {
    return N(new Set(r));
  };
  var Y = function runEachAndClear(r, a, e) {
    var t = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, t);
    !e && (r.length = 0);
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
  var ar = "width";
  var er = "height";
  var tr = "visible";
  var nr = "hidden";
  var ir = "scroll";
  var vr = function capitalizeFirstLetter(r) {
    var a = String(r || "");
    return a ? a[0].toUpperCase() + a.slice(1) : "";
  };
  var or = function equal(r, a, e, t) {
    if (r && a) {
      var n = true;
      each(e, (function(e) {
        var i = t ? t(r[e]) : r[e];
        var v = t ? t(a[e]) : a[e];
        if (i !== v) {
          n = false;
        }
      }));
      return n;
    }
    return false;
  };
  var ur = function equalWH(r, a) {
    return or(r, a, [ "w", "h" ]);
  };
  var cr = function equalXY(r, a) {
    return or(r, a, [ "x", "y" ]);
  };
  var lr = function equalTRBL(r, a) {
    return or(r, a, [ "t", "r", "b", "l" ]);
  };
  var fr = function noop() {};
  var sr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var dr = function selfClearTimeout(r) {
    var a;
    var e = r ? f : l;
    var t = r ? s : c;
    return [ function(n) {
      t(a);
      a = e(n, T(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var pr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var i = fr;
    var v = a || {}, o = v.u, u = v.p, d = v._;
    var p = function invokeFunctionToDebounce(a) {
      i();
      s(e);
      e = t = void 0;
      i = fr;
      r.apply(this, a);
    };
    var _ = function mergeParms(r) {
      return d && t ? d(t, r) : r;
    };
    var g = function flush() {
      if (i !== fr) {
        p(_(n) || n);
      }
    };
    var h = function debouncedFn() {
      var r = N(arguments);
      var a = T(o) ? o() : o;
      var v = E(a) && a >= 0;
      if (v) {
        var d = T(u) ? u() : u;
        var h = E(d) && d >= 0;
        var m = a > 0 ? f : l;
        var b = a > 0 ? s : c;
        var S = _(r);
        var y = S || r;
        var w = p.bind(0, y);
        i();
        var O = m(w, a);
        i = function clear() {
          return b(O);
        };
        if (h && !e) {
          e = f(g, d);
        }
        t = n = y;
      } else {
        p(r);
      }
    };
    h.m = g;
    return h;
  };
  var _r = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var gr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var hr = function assignDeep(r, a, e, t, n, i, v) {
    var o = [ a, e, t, n, i, v ];
    if ((typeof r !== "object" || C(r)) && !T(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, t) {
        var n = a[t];
        if (r === n) {
          return true;
        }
        var i = P(n);
        if (n && L(n)) {
          var v = r[t];
          var o = v;
          if (i && !P(v)) {
            o = [];
          } else if (!i && !L(v)) {
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
  var mr = function removeUndefinedProperties(r, a) {
    return each(hr({}, r), (function(r, e, t) {
      if (r === void 0) {
        delete t[e];
      } else if (a && r && L(r)) {
        t[e] = removeUndefinedProperties(r, a);
      }
    }));
  };
  var br = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var Sr = function capNumber(r, a, e) {
    return n(r, i(a, e));
  };
  var yr = function getDomTokensArray(r) {
    return N(new Set((P(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    }))));
  };
  var wr = function getAttr(r, a) {
    return r && r.getAttribute(a);
  };
  var Or = function hasAttr(r, a) {
    return r && r.hasAttribute(a);
  };
  var Cr = function setAttrs(r, a, e) {
    each(yr(a), (function(a) {
      r && r.setAttribute(a, String(e || ""));
    }));
  };
  var xr = function removeAttrs(r, a) {
    each(yr(a), (function(a) {
      return r && r.removeAttribute(a);
    }));
  };
  var Er = function domTokenListAttr(r, a) {
    var e = yr(wr(r, a));
    var t = sr(Cr, r, a);
    var n = function domTokenListOperation(r, a) {
      var t = new Set(e);
      each(yr(r), (function(r) {
        t[a](r);
      }));
      return N(t).join(" ");
    };
    return {
      S: function _remove(r) {
        return t(n(r, "delete"));
      },
      O: function _add(r) {
        return t(n(r, "add"));
      },
      C: function _has(r) {
        var a = yr(r);
        return a.reduce((function(r, a) {
          return r && e.includes(a);
        }), a.length > 0);
      }
    };
  };
  var Ar = function removeAttrClass(r, a, e) {
    Er(r, a).S(e);
    return sr(Hr, r, a, e);
  };
  var Hr = function addAttrClass(r, a, e) {
    Er(r, a).O(e);
    return sr(Ar, r, a, e);
  };
  var Tr = function addRemoveAttrClass(r, a, e, t) {
    return (t ? Hr : Ar)(r, a, e);
  };
  var Pr = function hasAttrClass(r, a, e) {
    return Er(r, a).C(e);
  };
  var Dr = function createDomTokenListClass(r) {
    return Er(r, "class");
  };
  var zr = function removeClass(r, a) {
    Dr(r).S(a);
  };
  var Lr = function addClass(r, a) {
    Dr(r).O(a);
    return sr(zr, r, a);
  };
  var kr = function find(r, a) {
    var e = [];
    var t = a ? I(a) && a : document;
    return t ? j(e, t.querySelectorAll(r)) : e;
  };
  var Ir = function findFirst(r, a) {
    var e = a ? I(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var Mr = function is(r, a) {
    if (I(r)) {
      return r.matches(a);
    }
    return false;
  };
  var Rr = function isBodyElement(r) {
    return Mr(r, "body");
  };
  var Vr = function contents(r) {
    return r ? N(r.childNodes) : [];
  };
  var Fr = function parent(r) {
    return r && r.parentElement;
  };
  var jr = function closest(r, a) {
    return I(r) && r.closest(a);
  };
  var Nr = function getFocusedElement(r) {
    return (r || document).activeElement;
  };
  var Ur = function liesBetween(r, a, e) {
    var t = jr(r, a);
    var n = r && Ir(e, t);
    var i = jr(n, a) === t;
    return t && n ? t === r || n === r || i && jr(jr(r, e), a) !== t : false;
  };
  var qr = function removeElements(r) {
    if (z(r)) {
      each(N(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = Fr(r);
      a && a.removeChild(r);
    }
  };
  var Br = function before(r, a, e) {
    if (e && r) {
      var t = a;
      var n;
      if (z(e)) {
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
        return qr(e);
      };
    }
    return fr;
  };
  var Yr = function appendChildren(r, a) {
    return Br(r, null, a);
  };
  var Wr = function insertAfter(r, a) {
    return Br(Fr(r), r && r.nextSibling, a);
  };
  var Xr = function createDiv(r) {
    var a = document.createElement("div");
    Cr(a, "class", r);
    return a;
  };
  var Zr = function createDOM(r) {
    var a = Xr();
    a.innerHTML = r.trim();
    return each(Vr(a), (function(r) {
      return qr(r);
    }));
  };
  var Kr = /^--/;
  var Gr = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var $r = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Jr = function parseToZeroOrNumber(r) {
    return $r(parseFloat(r || ""));
  };
  var Qr = function ratioToCssPercent(r) {
    return ($r(r) * 100).toFixed(3) + "%";
  };
  var ra = function numberToCssPx(r) {
    return $r(r) + "px";
  };
  function setStyles(r, a) {
    r && a && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = E(a) ? ra(a) : (a || "") + "";
        if (Kr.test(e)) {
          t.setProperty(e, n);
        } else {
          t[e] = n;
        }
      } catch (i) {}
    }));
  }
  function getStyles(r, a, e) {
    var n = A(a);
    var i = n ? "" : {};
    if (r) {
      var v = t.getComputedStyle(r, e) || r.style;
      i = n ? Gr(v, a) : N(a).reduce((function(r, a) {
        r[a] = Gr(v, a);
        return r;
      }), i);
    }
    return i;
  }
  var aa = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var i = t + "top" + n;
    var v = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Jr(c[i]),
      r: Jr(c[v]),
      b: Jr(c[o]),
      l: Jr(c[u])
    };
  };
  var ea = function getTrasformTranslateValue(r, a) {
    return "translate" + (D(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var ta = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var na = {
    w: 0,
    h: 0
  };
  var ia = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : na;
  };
  var va = function getWindowSize(r) {
    return ia("inner", r || t);
  };
  var oa = sr(ia, "offset");
  var ua = sr(ia, "client");
  var ca = sr(ia, "scroll");
  var la = function getFractionalSize(r) {
    var a = parseFloat(getStyles(r, ar)) || 0;
    var e = parseFloat(getStyles(r, er)) || 0;
    return {
      w: a - v(a),
      h: e - v(e)
    };
  };
  var fa = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var sa = function hasDimensions(r) {
    return !!r && ta(r);
  };
  var da = function domRectHasDimensions(r) {
    return !!(r && (r[er] || r[ar]));
  };
  var pa = function domRectAppeared(r, a) {
    var e = da(r);
    var t = da(a);
    return !t && e;
  };
  var _a = function removeEventListener(r, a, e, t) {
    each(yr(a), (function(a) {
      r && r.removeEventListener(a, e, t);
    }));
  };
  var ga = function addEventListener(r, a, e, t) {
    var n;
    var i = (n = t && t.A) != null ? n : true;
    var v = t && t.H || false;
    var o = t && t.T || false;
    var u = {
      passive: i,
      capture: v
    };
    return sr(Y, yr(a).map((function(a) {
      var t = o ? function(n) {
        _a(r, a, t, v);
        e && e(n);
      } : e;
      r && r.addEventListener(a, t, u);
      return sr(_a, r, a, t, v);
    })));
  };
  var ha = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var ma = function preventDefault(r) {
    return r.preventDefault();
  };
  var ba = function stopAndPrevent(r) {
    return ha(r) || ma(r);
  };
  var Sa = function scrollElementTo(r, a) {
    var e = E(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    E(t) && (r.scrollLeft = t);
    E(n) && (r.scrollTop = n);
  };
  var ya = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var wa = function getZeroScrollCoordinates() {
    return {
      P: {
        x: 0,
        y: 0
      },
      D: {
        x: 0,
        y: 0
      }
    };
  };
  var Oa = function sanatizeScrollCoordinates(r, a) {
    var e = r.P, t = r.D;
    var n = a.w, i = a.h;
    var v = function sanitizeAxis(r, a, e) {
      var t = u(r) * e;
      var n = u(a) * e;
      if (t === n) {
        var i = o(r);
        var v = o(a);
        n = i > v ? 0 : n;
        t = i < v ? 0 : t;
      }
      return [ t + 0, n + 0 ];
    };
    var c = v(e.x, t.x, n), l = c[0], f = c[1];
    var s = v(e.y, t.y, i), d = s[0], p = s[1];
    return {
      P: {
        x: l,
        y: d
      },
      D: {
        x: f,
        y: p
      }
    };
  };
  var Ca = function isDefaultDirectionScrollCoordinates(r) {
    var a = r.P, e = r.D;
    var t = function getAxis(r, a) {
      return r === 0 && r <= a;
    };
    return {
      x: t(a.x, e.x),
      y: t(a.y, e.y)
    };
  };
  var xa = function getScrollCoordinatesPercent(r, a) {
    var e = r.P, t = r.D;
    var n = function getAxis(r, a, e) {
      return Sr(0, 1, (r - e) / (r - a) || 0);
    };
    return {
      x: n(e.x, t.x, a.x),
      y: n(e.y, t.y, a.y)
    };
  };
  var Ea = function manageListener(r, a) {
    each(U(a), r);
  };
  var Aa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        Ea((function(r) {
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
      if (A(r)) {
        var n = a.get(r) || new Set;
        a.set(r, n);
        Ea((function(r) {
          T(r) && n.add(r);
        }), t);
        return sr(e, r, t);
      }
      if (H(t) && t) {
        e();
      }
      var i = gr(r);
      var v = [];
      each(i, (function(a) {
        var e = r[a];
        e && j(v, addEvent(a, e));
      }));
      return sr(Y, v);
    };
    var n = function triggerEvent(r, e) {
      each(N(a.get(r)), (function(r) {
        if (e && !q(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var Ha = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (T(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Ta = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && _r(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Pa = {
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
    var t = F(gr(a), gr(r));
    each(t, (function(t) {
      var n = r[t];
      var i = a[t];
      if (D(n) && D(i)) {
        hr(e[t] = {}, getOptionsDiff(n, i));
        if (br(e[t])) {
          delete e[t];
        }
      } else if (_r(a, t) && i !== n) {
        var v = true;
        if (P(n) || P(i)) {
          try {
            if (Ha(n) === Ha(i)) {
              v = false;
            }
          } catch (o) {}
        }
        if (v) {
          e[t] = i;
        }
      }
    }));
    return e;
  };
  var za = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Ta(r, t), e || Ta(a, t) !== void 0 ];
    };
  };
  var La = "data-overlayscrollbars";
  var ka = "os-environment";
  var Ia = ka + "-scrollbar-hidden";
  var Ma = La + "-initialize";
  var Ra = "noClipping";
  var Va = La + "-body";
  var Fa = La;
  var ja = "host";
  var Na = La + "-viewport";
  var Ua = Q;
  var qa = rr;
  var Ba = "arrange";
  var Ya = "measuring";
  var Wa = "scrollbarHidden";
  var Xa = "scrollbarPressed";
  var Za = "noContent";
  var Ka = La + "-padding";
  var Ga = La + "-content";
  var $a = "os-size-observer";
  var Ja = $a + "-appear";
  var Qa = $a + "-listener";
  var re = Qa + "-scroll";
  var ae = Qa + "-item";
  var ee = ae + "-final";
  var te = "os-trinsic-observer";
  var ne = "os-theme-none";
  var ie = "os-scrollbar";
  var ve = ie + "-rtl";
  var oe = ie + "-horizontal";
  var ue = ie + "-vertical";
  var ce = ie + "-track";
  var le = ie + "-handle";
  var fe = ie + "-visible";
  var se = ie + "-cornerless";
  var de = ie + "-interaction";
  var pe = ie + "-unusable";
  var _e = ie + "-auto-hide";
  var ge = _e + "-hidden";
  var he = ie + "-wheel";
  var me = ce + "-interactive";
  var be = le + "-interactive";
  var Se;
  var ye = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, a, e) {
      Yr(document.body, r);
      Yr(document.body, r);
      var t = ua(r);
      var n = oa(r);
      var i = la(a);
      e && qr(r);
      return {
        x: n.h - t.h + i.h,
        y: n.w - t.w + i.w
      };
    };
    var e = function getNativeScrollbarsHiding(r) {
      var a = false;
      var e = Lr(r, Ia);
      try {
        a = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      e();
      return a;
    };
    var n = "." + ka + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + ka + " div{width:200%;height:200%;margin:10px 0}." + Ia + "{scrollbar-width:none!important}." + Ia + "::-webkit-scrollbar,." + Ia + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var i = Zr('<div class="' + ka + '"><div></div><style>' + n + "</style></div>");
    var v = i[0];
    var o = v.firstChild;
    var u = Aa(), c = u[0], l = u[2];
    var f = a({
      i: r(v, o),
      v: cr
    }, sr(r, v, o, true)), s = f[0], d = f[1];
    var p = d(), _ = p[0];
    var g = e(v);
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
    var S = hr({}, Pa);
    var y = sr(hr, {}, S);
    var w = sr(hr, {}, b);
    var O = {
      L: _,
      k: m,
      I: g,
      M: !!h,
      R: sr(c, "r"),
      V: w,
      F: function _setDefaultInitialization(r) {
        return hr(b, r) && w();
      },
      j: y,
      N: function _setDefaultOptions(r) {
        return hr(S, r) && y();
      },
      U: hr({}, b),
      q: hr({}, S)
    };
    xr(v, "style");
    qr(v);
    ga(t, "resize", (function() {
      l("r", []);
    }));
    if (T(t.matchMedia) && !g && (!m.x || !m.y)) {
      var C = function addZoomListener(r) {
        var a = t.matchMedia("(resolution: " + t.devicePixelRatio + "dppx)");
        ga(a, "change", (function() {
          r();
          addZoomListener(r);
        }), {
          T: true
        });
      };
      C((function() {
        var r = s(), a = r[0], e = r[1];
        hr(O.L, a);
        l("r", [ e ]);
      }));
    }
    return O;
  };
  var we = function getEnvironment() {
    if (!Se) {
      Se = ye();
    }
    return Se;
  };
  var Oe = function resolveInitialization(r, a) {
    return T(a) ? a.apply(0, r) : a;
  };
  var Ce = function staticInitializationElement(r, a, e, t) {
    var n = O(t) ? e : t;
    var i = Oe(r, n);
    return i || a.apply(0, r);
  };
  var xe = function dynamicInitializationElement(r, a, e, t) {
    var n = O(t) ? e : t;
    var i = Oe(r, n);
    return !!i && (k(i) ? i : a.apply(0, r));
  };
  var Ee = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var i = we(), v = i.k, o = i.I, u = i.V;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = t != null ? t : l;
    var d = O(n) ? f : n;
    var p = (v.x || v.y) && s;
    var _ = r && (C(d) ? !o : d);
    return !!p || !!_;
  };
  var Ae = new WeakMap;
  var He = function addInstance(r, a) {
    Ae.set(r, a);
  };
  var Te = function removeInstance(r) {
    Ae.delete(r);
  };
  var Pe = function getInstance(r) {
    return Ae.get(r);
  };
  var De = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var i = function destroy() {
      t = true;
    };
    var v = function updateElements(i) {
      if (n && e) {
        var v = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var v = n && t ? (i || kr)(t, r) : [];
          return [ v, n ];
        }));
        each(v, (function(e) {
          return each(e[0], (function(i) {
            var v = e[1];
            var o = n.get(i) || [];
            var u = r.contains(i);
            if (u && v) {
              var c = ga(i, v, (function(r) {
                if (t) {
                  c();
                  n.delete(i);
                } else {
                  a(r);
                }
              }));
              n.set(i, j(o, c));
            } else {
              Y(o);
              n.delete(i);
            }
          }));
        }));
      }
    };
    v();
    return [ i, v ];
  };
  var ze = function createDOMObserver(r, a, e, t) {
    var n = false;
    var i = t || {}, v = i.B, o = i.Y, u = i.W, c = i.X, l = i.Z, f = i.K;
    var s = pr((function() {
      return n && e(true);
    }), {
      u: 33,
      p: 99
    });
    var d = De(r, s, u), _ = d[0], g = d[1];
    var h = v || [];
    var m = o || [];
    var b = F(h, m);
    var S = function observerCallback(n, i) {
      if (!q(i)) {
        var v = l || fr;
        var o = f || fr;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(e) {
          var n = e.attributeName, i = e.target, l = e.type, f = e.oldValue, _ = e.addedNodes, g = e.removedNodes;
          var h = l === "attributes";
          var b = l === "childList";
          var S = r === i;
          var y = h && n;
          var w = y && wr(i, n || "") || null;
          var O = y && f !== w;
          var C = V(m, n) && O;
          if (a && (b || !S)) {
            var x = h && O;
            var E = x && c && Mr(i, c);
            var A = E ? !v(i, n, f, w) : !h || x;
            var H = A && !o(e, !!E, r, t);
            each(_, (function(r) {
              return j(u, r);
            }));
            each(g, (function(r) {
              return j(u, r);
            }));
            p = p || H;
          }
          if (!a && S && O && !v(i, n, f, w)) {
            j(s, n);
            d = d || C;
          }
        }));
        g((function(r) {
          return B(u).reduce((function(a, e) {
            j(a, kr(r, e));
            return Mr(e, r) ? j(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!q(s) || d) {
          var _ = [ B(s), d ];
          !n && e.apply(0, _);
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
        subtree: a,
        childList: a,
        characterData: a
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
        s.m();
        return S(true, y.takeRecords());
      }
    } ];
  };
  var Le = {};
  var ke = {};
  var Ie = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        Le[e] = r[e];
      }));
    }));
  };
  var Me = function registerPluginModuleInstances(r, a, e) {
    return gr(r).map((function(t) {
      var n = r[t], i = n.static, v = n.instance;
      var o = e || [], u = o[0], c = o[1], l = o[2];
      var f = e ? v : i;
      if (f) {
        var s = e ? f(u, c, a) : f(a);
        return (l || ke)[t] = s;
      }
    }));
  };
  var Re = function getStaticPluginModuleInstance(r) {
    return ke[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.G && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Ve = {
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
      }, r.exports.G = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.G = true, r.exports["default"] = r.exports;
  })(Ve);
  var Fe = Ve.exports;
  var je = /*@__PURE__*/ getDefaultExportFromCjs(Fe);
  var Ne = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ue = function validateRecursive(r, a, e, t) {
    var n = {};
    var i = je({}, a);
    var v = gr(r).filter((function(r) {
      return _r(a, r);
    }));
    each(v, (function(v) {
      var o = a[v];
      var u = r[v];
      var c = L(u);
      var l = t ? t + "." : "";
      if (c && L(o)) {
        var f = validateRecursive(u, o, e, l + v), s = f[0], d = f[1];
        n[v] = s;
        i[v] = d;
        each([ i, n ], (function(r) {
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
          var a;
          each(Ne, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = O(a);
          if (e && A(o)) {
            var t = r.split(" ");
            p = !!t.find((function(r) {
              return r === o;
            }));
            j(_, t);
          } else {
            p = Ne[h] === r;
          }
          j(g, e ? Ne.string : a);
          return !p;
        }));
        if (p) {
          n[v] = o;
        } else if (e) {
          console.warn('The option "' + l + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ n, i ];
  };
  var qe = function validateOptions(r, a, e) {
    return Ue(r, a, e);
  };
  var Be = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Be] = {
      static: function _static() {
        var r = Ne.number;
        var a = Ne.boolean;
        var e = [ Ne.array, Ne.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var i = "never scroll leavemove";
        var v = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Ne.number, Ne.array, Ne.null ],
            ignoreMutation: [ Ne.function, Ne.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Ne.string, Ne.null ],
            visibility: n,
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Ne.array, Ne.null ]
          }
        };
        return function(r, a) {
          var e = qe(v, r, a), t = e[0], n = e[1];
          return je({}, n, t);
        };
      }
    }, r;
  })();
  var Ye = "__osSizeObserverPlugin";
  var We = /* @__PURE__ */ function(r) {
    return r = {}, r[Ye] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var i = "scroll";
          var v = Zr('<div class="' + ae + '" dir="ltr"><div class="' + ae + '"><div class="' + ee + '"></div></div><div class="' + ae + '"><div class="' + ee + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
          var u = o.lastChild;
          var f = o.firstChild;
          var s = f == null ? void 0 : f.firstChild;
          var d = oa(o);
          var p = d;
          var _ = false;
          var g;
          var h = function reset() {
            Sa(f, n);
            Sa(u, n);
          };
          var m = function onResized(r) {
            g = 0;
            if (_) {
              d = p;
              a(r === true);
            }
          };
          var b = function onScroll(r) {
            p = oa(o);
            _ = !r || !ur(p, d);
            if (r) {
              ha(r);
              if (_ && !g) {
                c(g);
                g = l(m);
              }
            } else {
              m(r === false);
            }
            h();
          };
          var S = [ Yr(r, v), ga(f, i, b), ga(u, i, b) ];
          Lr(r, re);
          setStyles(s, (t = {}, t[ar] = n, t[er] = n, t));
          l(h);
          return [ e ? sr(b, false) : h, S ];
        };
      }
    }, r;
  }();
  var Xe = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.k;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], i = t[1];
    return [ n && e.x && e.y, i ];
  };
  var Ze = function overflowIsVisible(r) {
    return r.indexOf(tr) === 0;
  };
  var Ke = function createViewportOverflowState(r, a) {
    var e = function getAxisOverflowStyle(r, a, e, t) {
      var n = r === tr ? nr : r.replace(tr + "-", "");
      var i = Ze(r);
      var v = Ze(e);
      if (!a && !t) {
        return nr;
      }
      if (i && v) {
        return tr;
      }
      if (i) {
        var o = a ? tr : nr;
        return a && t ? n : o;
      }
      var u = v && t ? tr : nr;
      return a ? n : u;
    };
    var t = {
      x: e(a.x, r.x, a.y, r.y),
      y: e(a.y, r.y, a.x, r.x)
    };
    return {
      $: t,
      J: {
        x: t.x === ir,
        y: t.y === ir
      }
    };
  };
  var Ge = "__osScrollbarsHidingPlugin";
  var $e = /* @__PURE__ */ function(r) {
    return r = {}, r[Ge] = {
      static: function _static() {
        return {
          rr: function _viewportArrangement(r, a, e, t, n) {
            var i = r.ar, v = r.er;
            var o = t.I, u = t.k, c = t.L;
            var l = !i && !o && (u.x || u.y);
            var f = Xe(n, t), s = f[0];
            var d = function readViewportOverflowState() {
              var r = function getStatePerAxis(r) {
                var a = getStyles(v, r);
                var e = a === ir;
                return [ a, e ];
              };
              var a = r(Q), e = a[0], t = a[1];
              var n = r(rr), i = n[0], o = n[1];
              return {
                $: {
                  x: e,
                  y: i
                },
                J: {
                  x: t,
                  y: o
                }
              };
            };
            var p = function _getViewportOverflowHideOffset(r) {
              var a = r.J;
              var e = o || s ? 0 : 42;
              var t = function getHideOffsetPerAxis(r, a, t) {
                var n = r ? e : t;
                var i = a && !o ? n : 0;
                var v = r && !!e;
                return [ i, v ];
              };
              var n = t(u.x, a.x, c.x), i = n[0], v = n[1];
              var l = t(u.y, a.y, c.y), f = l[0], d = l[1];
              return {
                tr: {
                  x: i,
                  y: f
                },
                nr: {
                  x: v,
                  y: d
                }
              };
            };
            var _ = function _hideNativeScrollbars(r, e, t) {
              var n = e.ir;
              if (!i) {
                var v;
                var o = hr({}, (v = {}, v[$] = 0, v[J] = 0, v[G] = 0, v));
                var u = p(r), c = u.tr, l = u.nr;
                var f = l.x, s = l.y;
                var d = c.x, _ = c.y;
                var g = a.vr;
                var h = n ? G : $;
                var m = n ? Z : X;
                var b = g[h];
                var S = g[J];
                var y = g[m];
                var w = g[K];
                o[ar] = "calc(100% + " + (_ + b * -1) + "px)";
                o[h] = -_ + b;
                o[J] = -d + S;
                if (t) {
                  o[m] = y + (s ? _ : 0);
                  o[K] = w + (f ? d : 0);
                }
                return o;
              }
            };
            var g = function _arrangeViewport(r, t, n) {
              if (l) {
                var i = a.vr;
                var o = p(r), u = o.tr, c = o.nr;
                var f = c.x, s = c.y;
                var d = u.x, _ = u.y;
                var g = e.ir;
                var h = g ? X : Z;
                var m = i[h];
                var b = i.paddingTop;
                var S = t.w + n.w;
                var y = t.h + n.h;
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
                var t = r || d();
                var n = a.vr;
                var i = p(t), o = i.nr;
                var u = o.x, c = o.y;
                var f = {};
                var s = function assignProps(r) {
                  return each(r, (function(r) {
                    f[r] = n[r];
                  }));
                };
                if (u) {
                  s([ J, W, K ]);
                }
                if (c) {
                  s([ G, $, Z, X ]);
                }
                var g = getStyles(v, gr(f));
                var h = Ar(v, Na, Ba);
                setStyles(v, f);
                return [ function() {
                  setStyles(v, hr({}, g, _(t, e, l)));
                  h();
                }, t ];
              }
              return [ fr ];
            };
            return {
              ur: p,
              cr: g,
              lr: h,
              sr: _
            };
          }
        };
      }
    }, r;
  }();
  var Je = "__osClickScrollPlugin";
  var Qe = /* @__PURE__ */ function(r) {
    return r = {}, r[Je] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var i = 0;
          var v = fr;
          var o = function animateClickScroll(o) {
            v = R(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var l = c + t;
              var s = n >= c && n <= l;
              if (u && !s) {
                if (i) {
                  animateClickScroll(e);
                } else {
                  var d = f((function() {
                    animateClickScroll(e);
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
  var rt = function createSizeObserver(r, e, t) {
    var n = t || {}, i = n.dr;
    var v = Re(Ye);
    var o = a({
      i: false,
      o: true
    }), u = o[0];
    return function() {
      var a = [];
      var t = Zr('<div class="' + $a + '"><div class="' + Qa + '"></div></div>');
      var n = t[0];
      var o = n.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = false;
        var n = false;
        if (a) {
          var i = u(r.contentRect), v = i[0], o = i[2];
          var c = da(v);
          n = pa(v, o);
          t = !n && !c;
        } else {
          n = r === true;
        }
        if (!t) {
          e({
            pr: true,
            dr: n
          });
        }
      };
      if (g) {
        var l = new g((function(r) {
          return c(r.pop());
        }));
        l.observe(o);
        j(a, (function() {
          l.disconnect();
        }));
      } else if (v) {
        var f = v(o, c, i), s = f[0], d = f[1];
        j(a, F([ Lr(n, Ja), ga(n, "animationstart", s) ], d));
      } else {
        return fr;
      }
      return sr(Y, j(a, Yr(r, n)));
    };
  };
  var at = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Xr(te);
    var v = a({
      i: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var t = o(n(r));
        var i = t[1];
        return i && !a && e(t) && [ t ];
      }
    };
    var c = function intersectionObserverCallback(r, a) {
      return u(a.pop(), r);
    };
    return [ function() {
      var a = [];
      if (_) {
        t = new _(sr(c, false), {
          root: r
        });
        t.observe(i);
        j(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = oa(i);
          u(r);
        };
        j(a, rt(i, e)());
        e();
      }
      return sr(Y, j(a, Yr(r, i)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var et = function createObserversSetup(r, e, t, n) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var l;
    var f = we(), s = f.I;
    var d = "[" + Fa + "]";
    var p = "[" + Na + "]";
    var _ = [ "tabindex" ];
    var h = [ "wrap", "cols", "rows" ];
    var m = [ "id", "class", "style", "open" ];
    var b = r._r, S = r.gr, y = r.er, w = r.hr, O = r.mr, C = r.br, x = r.ar, H = r.Sr, D = r.yr;
    var z = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var L = {
      wr: false,
      ir: z(b)
    };
    var k = we();
    var I = Re(Ge);
    var M = a({
      v: ur,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = I && I.rr(r, e, L, k, t).lr;
      var n = !x && H(Ba);
      var i = n && ya(w);
      var v = D(Ya, true);
      var o = n && a && a()[0];
      var u = ca(O);
      var c = ca(y);
      var l = la(y);
      o && o();
      Sa(w, i);
      v();
      return {
        w: c.w + u.w + l.w,
        h: c.h + u.h + l.h
      };
    })), R = M[0];
    var j = C ? h : F(m, h);
    var N = pr(n, {
      u: function _timeout() {
        return i;
      },
      p: function _maxDelay() {
        return v;
      },
      _: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ F(gr(e), gr(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var U = function setDirection(r) {
      var a = z(b);
      hr(r, {
        Or: l !== a
      });
      hr(L, {
        ir: a
      });
      l = a;
    };
    var q = function updateViewportAttrsFromHost(r) {
      each(r || _, (function(r) {
        if (V(_, r)) {
          var a = wr(S, r);
          if (A(a)) {
            Cr(y, r, a);
          } else {
            xr(y, r);
          }
        }
      }));
    };
    var B = function onTrinsicChanged(r, a) {
      var e = r[0], t = r[1];
      var i = {
        Cr: t
      };
      hr(L, {
        wr: e
      });
      !a && n(i);
      return i;
    };
    var Y = function onSizeChanged(r) {
      var a = r.pr, e = r.dr;
      var t = a && !e;
      var i = !t && s ? N : n;
      var v = {
        pr: a || e,
        dr: e
      };
      U(v);
      i(v);
    };
    var W = function onContentMutation(r, a) {
      var e = R(), t = e[1];
      var i = {
        Er: t
      };
      U(i);
      var v = r ? n : N;
      t && !a && v(i);
      return i;
    };
    var X = function onHostMutation(r, a, e) {
      var t = {
        Ar: a
      };
      U(t);
      if (a && !e) {
        N(t);
      } else if (!x) {
        q(r);
      }
      return t;
    };
    var Z = k.R;
    var K = O ? at(S, B) : [], G = K[0], $ = K[1];
    var J = !x && rt(S, Y, {
      dr: true
    });
    var Q = ze(S, false, X, {
      Y: m,
      B: F(m, _)
    }), rr = Q[0], ar = Q[1];
    var er = x && g && new g((function(r) {
      var a = r[r.length - 1].contentRect;
      Y({
        pr: true,
        dr: pa(a, c)
      });
      c = a;
    }));
    return [ function() {
      q();
      er && er.observe(S);
      var r = J && J();
      var a = G && G();
      var e = rr();
      var t = Z((function(r) {
        var a = R(), e = a[1];
        N({
          Hr: r,
          Er: e
        });
      }));
      return function() {
        er && er.disconnect();
        r && r();
        a && a();
        u && u();
        e();
        t();
      };
    }, function(r) {
      var a = r.Tr, e = r.Pr, t = r.Dr;
      var n = {};
      var c = a("update.ignoreMutation"), l = c[0];
      var f = a("update.attributes"), s = f[0], _ = f[1];
      var g = a("update.elementEvents"), h = g[0], m = g[1];
      var b = a("update.debounce"), S = b[0], w = b[1];
      var C = m || _;
      var A = e || t;
      var H = function ignoreMutationFromOptions(r) {
        return T(l) && l(r);
      };
      if (C) {
        o && o();
        u && u();
        var D = ze(O || y, true, W, {
          B: F(j, s || []),
          W: h,
          X: d,
          K: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !x ? Ur(e, d, p) : false;
            return n || !!jr(e, "." + ie) || !!H(r);
          }
        }), z = D[0], L = D[1];
        u = z();
        o = L;
      }
      if (w) {
        N.m();
        if (P(S)) {
          var k = S[0];
          var I = S[1];
          i = E(k) && k;
          v = E(I) && I;
        } else if (E(S)) {
          i = S;
          v = false;
        } else {
          i = false;
          v = false;
        }
      }
      if (A) {
        var M = ar();
        var R = $ && $();
        var V = o && o();
        M && hr(n, X(M[0], M[1], A));
        R && hr(n, B(R[0], A));
        V && hr(n, W(V[0], A));
      }
      U(n);
      return n;
    }, L ];
  };
  var tt = function createScrollbarsSetupElements(r, a, e, t) {
    var n = we(), i = n.V;
    var v = i(), o = v.scrollbars;
    var u = o.slot;
    var c = a._r, l = a.gr, f = a.er, s = a.zr, d = a.hr, p = a.Lr, _ = a.ar;
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
    var C = xe([ c, l, f ], (function() {
      return _ && p ? c : l;
    }), u, S);
    var x = function getScrollbarHandleLengthRatio(r, a) {
      if (a) {
        var t = r ? ar : er;
        var n = a.kr, i = a.Ir;
        var v = fa(i)[t];
        var o = fa(n)[t];
        return Sr(0, 1, v / o || 0);
      }
      var u = r ? "x" : "y";
      var c = e.Mr, l = e.Rr;
      var f = l[u];
      var s = c[u];
      return Sr(0, 1, f / (f + s) || 0);
    };
    var E = function getScrollbarHandleOffsetRatio(r, a, e) {
      var t = x(e, r);
      return 1 / t * (1 - t) * a;
    };
    var A = function addDirectionRTLKeyframes(r) {
      return hr(r, {
        clear: [ "left" ]
      });
    };
    var T = function cancelElementAnimations(r) {
      y.forEach((function(a, e) {
        var t = r ? V(U(r), e) : true;
        if (t) {
          each(a || [], (function(r) {
            r && r.cancel();
          }));
          y.delete(e);
        }
      }));
    };
    var P = function setElementAnimation(r, a, e, t) {
      var n = y.get(r) || [];
      var i = n.find((function(r) {
        return r && r.timeline === a;
      }));
      if (i) {
        i.effect = new KeyframeEffect(r, e, {
          composite: t
        });
      } else {
        y.set(r, F(n, [ r.animate(e, {
          timeline: a,
          composite: t
        }) ]));
      }
    };
    var D = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Lr : zr;
      each(r, (function(r) {
        t(r.Vr, a);
      }));
    };
    var z = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var L = function scrollbarStructureRefreshHandleLength(r, a) {
      z(r, (function(r) {
        var e;
        var t = r.Ir;
        return [ t, (e = {}, e[a ? ar : er] = Qr(x(a)), e) ];
      }));
    };
    var k = function scrollbarStructureRefreshHandleOffset(r, a) {
      var t = e.Fr;
      var n = a ? "x" : "y";
      var i = O[n];
      var v = Ca(t)[n];
      var o = function getAxisTransformValue(r, e) {
        return ea(Qr(E(r, v ? e : 1 - e, a)), a);
      };
      if (i) {
        each(r, (function(r) {
          var a = r.Ir;
          P(a, i, A({
            transform: [ 0, 1 ].map((function(a) {
              return o(r, a);
            }))
          }));
        }));
      } else {
        z(r, (function(r) {
          return [ r.Ir, {
            transform: o(r, xa(t, ya(d))[n])
          } ];
        }));
      }
    };
    var I = function doRefreshScrollbarOffset(r) {
      return _ && !p && Fr(r) === f;
    };
    var M = [];
    var R = [];
    var N = [];
    var q = function scrollbarsAddRemoveClass(r, a, e) {
      var t = H(e);
      var n = t ? e : true;
      var i = t ? !e : true;
      n && D(R, r, a);
      i && D(N, r, a);
    };
    var B = function refreshScrollbarsHandleLength() {
      L(R, true);
      L(N);
    };
    var W = function refreshScrollbarsHandleOffset() {
      k(R, true);
      k(N);
    };
    var X = function refreshScrollbarsScrollbarOffset() {
      if (_) {
        var r = e.Mr, a = e.Fr;
        var t = Ca(a);
        var n = .5;
        if (O.x && O.y) {
          each(F(N, R), (function(a) {
            var e = a.Vr;
            if (I(e)) {
              var i = function setScrollbarElementAnimation(a) {
                return P(e, O[a], A({
                  transform: [ 0, t[a] ? 1 : -1 ].map((function(e) {
                    return ea(ra(e * (r[a] - n)), a === "x");
                  }))
                }), "add");
              };
              i("x");
              i("y");
            } else {
              T(e);
            }
          }));
        } else {
          var i = xa(a, ya(d));
          var v = function styleScrollbarPosition(a) {
            var e = a.Vr;
            var n = I(e) && e;
            var v = function getTranslateValue(r, a, e) {
              var t = a * r;
              return ra(e ? t : -t);
            };
            return [ n, n && {
              transform: ea({
                x: v(i.x, r.x, t.x),
                y: v(i.y, r.y, t.y)
              })
            } ];
          };
          z(R, v);
          z(N, v);
        }
      }
    };
    var Z = function generateScrollbarDOM(r) {
      var a = r ? oe : ue;
      var e = Xr(ie + " " + a);
      var n = Xr(ce);
      var i = Xr(le);
      var v = {
        Vr: e,
        kr: n,
        Ir: i
      };
      j(r ? R : N, v);
      j(M, [ Yr(e, n), Yr(n, i), sr(qr, e), T, t(v, q, k, r) ]);
      return v;
    };
    var K = sr(Z, true);
    var G = sr(Z, false);
    var $ = function appendElements() {
      Yr(C, R[0].Vr);
      Yr(C, N[0].Vr);
      return sr(Y, M);
    };
    K();
    G();
    return [ {
      jr: B,
      Nr: W,
      Ur: X,
      qr: q,
      Br: {
        M: O.x,
        Yr: R,
        Wr: K,
        Xr: sr(z, R)
      },
      Zr: {
        M: O.y,
        Yr: N,
        Wr: G,
        Xr: sr(z, N)
      }
    }, $ ];
  };
  var nt = function createScrollbarsSetupEvents(r, a, e, t) {
    return function(n, i, u, c) {
      var l = a.gr, s = a.er, d = a.ar, p = a.hr, _ = a.Kr, g = a.yr;
      var h = n.Vr, m = n.kr, b = n.Ir;
      var S = dr(333), y = S[0], w = S[1];
      var O = dr(444), C = O[0], x = O[1];
      var E = dr(), A = E[0], H = E[1];
      var P = sr(u, [ n ], c);
      var D = function scrollOffsetElementScrollBy(r) {
        T(p.scrollBy) && p.scrollBy({
          behavior: "smooth",
          left: r.x,
          top: r.y
        });
      };
      var z = c ? ar : er;
      var L = function createInteractiveScrollEvents() {
        var a = "pointerup pointercancel lostpointercapture";
        var t = "client" + (c ? "X" : "Y");
        var n = c ? "left" : "top";
        var i = c ? "w" : "h";
        var u = c ? "x" : "y";
        var l = function createRelativeHandleMove(r, a) {
          return function(t) {
            var n;
            var v = e.Mr;
            var o = oa(m)[i] - oa(b)[i];
            var c = a * t / o;
            var l = c * v[u];
            Sa(p, (n = {}, n[u] = r + l, n));
          };
        };
        return ga(m, "pointerdown", (function(e) {
          var c = jr(e.target, "." + le) === b;
          var f = c ? b : m;
          var s = r.scrollbars;
          var d = e.button, h = e.isPrimary, S = e.pointerType;
          var y = s.pointers;
          var w = d === 0 && h && s[c ? "dragScroll" : "clickScroll"] && (y || []).includes(S);
          if (w) {
            x();
            var O = !c && e.shiftKey;
            var E = sr(fa, b);
            var A = sr(fa, m);
            var H = function getHandleOffset(r, a) {
              return (r || E())[n] - (a || A())[n];
            };
            var T = v(fa(p)[z]) / oa(p)[i] || 1;
            var P = l(ya(p)[u], 1 / T);
            var L = e[t];
            var k = E();
            var I = A();
            var M = k[z];
            var R = H(k, I) + M / 2;
            var V = L - I[n];
            var F = c ? 0 : V - R;
            var N = function releasePointerCapture(r) {
              Y(B);
              f.releasePointerCapture(r.pointerId);
            };
            var U = function addScrollbarPressedClass() {
              return g(Xa, true);
            };
            var q = U();
            var B = [ function() {
              var r = ya(p);
              q();
              var a = ya(p);
              var e = {
                x: a.x - r.x,
                y: a.y - r.y
              };
              if (o(e.x) > 3 || o(e.y) > 3) {
                U();
                Sa(p, r);
                D(e);
                C(q);
              }
            }, ga(_, a, N), ga(_, "selectstart", (function(r) {
              return ma(r);
            }), {
              A: false
            }), ga(m, a, N), ga(m, "pointermove", (function(r) {
              var a = r[t] - L;
              if (c || O) {
                P(F + a);
              }
            })) ];
            f.setPointerCapture(e.pointerId);
            if (O) {
              P(F);
            } else if (!c) {
              var W = Re(Je);
              W && j(B, W(P, H, F, M, V));
            }
          }
        }));
      };
      var k = true;
      var I = function isAffectingTransition(r) {
        return r.propertyName.indexOf(z) > -1;
      };
      return sr(Y, [ ga(b, "pointermove pointerleave", t), ga(h, "pointerenter", (function() {
        i(de, true);
      })), ga(h, "pointerleave pointercancel", (function() {
        i(de, false);
      })), !d && ga(h, "mousedown", (function() {
        var r = Nr();
        if (Or(r, Na) || Or(r, Fa) || r === document.body) {
          f((function() {
            s.focus({
              preventScroll: true
            });
          }), 25);
        }
      })), ga(h, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (k && t === 0 && Fr(h) === l) {
          D({
            x: a,
            y: e
          });
        }
        k = false;
        i(he, true);
        y((function() {
          k = true;
          i(he);
        }));
        ma(r);
      }), {
        A: false,
        H: true
      }), ga(b, "transitionstart", (function(r) {
        if (I(r)) {
          var a = function animateHandleOffset() {
            P();
            A(animateHandleOffset);
          };
          a();
        }
      })), ga(b, "transitionend transitioncancel", (function(r) {
        if (I(r)) {
          H();
          P();
        }
      })), ga(h, "pointerdown", sr(ga, _, "click", ba, {
        T: true,
        H: true,
        A: false
      }), {
        H: true
      }), L(), w, x, H ]);
    };
  };
  var it = function createScrollbarsSetup(r, a, e, t, n, i) {
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
    var E = tt(r, n, t, nt(a, n, t, (function(r) {
      return d(r) && R();
    }))), A = E[0], H = E[1];
    var T = n.gr, P = n.Gr, D = n.Lr;
    var z = A.qr, L = A.jr, k = A.Nr, I = A.Ur;
    var M = function manageScrollbarsAutoHide(r, a) {
      x();
      if (r) {
        z(ge);
      } else {
        var e = sr(z, ge, true);
        if (s > 0 && !a) {
          C(e);
        } else {
          e();
        }
      }
    };
    var R = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !v : !c) {
        M(true);
        m((function() {
          M(false);
        }));
      }
    };
    var V = function manageAutoHideSuspension(r) {
      z(_e, r, true);
      z(_e, r, false);
    };
    var F = function onHostMouseEnter(r) {
      if (d(r)) {
        v = u;
        u && M(true);
      }
    };
    var N = [ x, b, w, g, function() {
      return f();
    }, ga(T, "pointerover", F, {
      T: true
    }), ga(T, "pointerenter", F), ga(T, "pointerleave", (function(r) {
      if (d(r)) {
        v = false;
        u && M(false);
      }
    })), ga(T, "pointermove", (function(r) {
      d(r) && o && R();
    })), ga(P, "scroll", (function(r) {
      _((function() {
        k();
        R();
      }));
      i(r);
      I();
    })) ];
    return [ function() {
      return sr(Y, j(N, H()));
    }, function(r) {
      var a = r.Tr, n = r.Dr, i = r.$r, v = r.Jr;
      var d = v || {}, p = d.Qr, _ = d.ra, g = d.aa, h = d.ea;
      var m = i || {}, b = m.Or, S = m.dr;
      var w = e.ir;
      var O = we(), C = O.k;
      var x = t.$, E = t.ta;
      var A = a("showNativeOverlaidScrollbars"), H = A[0], T = A[1];
      var R = a("scrollbars.theme"), F = R[0], j = R[1];
      var N = a("scrollbars.visibility"), U = N[0], q = N[1];
      var B = a("scrollbars.autoHide"), Y = B[0], W = B[1];
      var X = a("scrollbars.autoHideSuspend"), Z = X[0], K = X[1];
      var G = a("scrollbars.autoHideDelay"), $ = G[0];
      var J = a("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var ar = a("scrollbars.clickScroll"), er = ar[0], nr = ar[1];
      var vr = a("overflow"), or = vr[0], ur = vr[1];
      var cr = S && !n;
      var lr = E.x || E.y;
      var fr = p || _ || h || b || n;
      var dr = g || q || ur;
      var pr = H && C.x && C.y;
      var _r = function setScrollbarVisibility(r, a, e) {
        var t = r.includes(ir) && (U === tr || U === "auto" && a === ir);
        z(fe, t, e);
        return t;
      };
      s = $;
      if (cr) {
        if (Z && lr) {
          V(false);
          f();
          y((function() {
            f = ga(P, "scroll", sr(V, true), {
              T: true
            });
          }));
        } else {
          V(true);
        }
      }
      if (T) {
        z(ne, pr);
      }
      if (j) {
        z(l);
        z(F, true);
        l = F;
      }
      if (K && !Z) {
        V(true);
      }
      if (W) {
        o = Y === "move";
        u = Y === "leave";
        c = Y === "never";
        M(c, true);
      }
      if (rr) {
        z(be, Q);
      }
      if (nr) {
        z(me, er);
      }
      if (dr) {
        var gr = _r(or.x, x.x, true);
        var hr = _r(or.y, x.y, false);
        var mr = gr && hr;
        z(se, !mr);
      }
      if (fr) {
        L();
        k();
        I();
        z(pe, !E.x, true);
        z(pe, !E.y, false);
        z(ve, w && !D);
      }
    }, {}, A ];
  };
  var vt = function createStructureSetupElements(r) {
    var a = we();
    var e = a.V, n = a.I;
    var i = e(), v = i.elements;
    var o = v.host, u = v.padding, c = v.viewport, l = v.content;
    var f = k(r);
    var s = f ? {} : r;
    var d = s.elements;
    var p = d || {}, _ = p.host, g = p.padding, h = p.viewport, m = p.content;
    var b = f ? r : s.target;
    var S = Rr(b);
    var y = Mr(b, "textarea");
    var w = b.ownerDocument;
    var O = w.documentElement;
    var C = function getDocumentWindow() {
      return w.defaultView || t;
    };
    var x = function focusElm(r) {
      if (r && r.focus) {
        r.focus({
          preventScroll: true
        });
      }
    };
    var E = sr(Ce, [ b ]);
    var A = sr(xe, [ b ]);
    var H = sr(Xr, "");
    var T = sr(E, H, c);
    var P = sr(A, H, l);
    var D = T(h);
    var z = D === b;
    var L = z && S;
    var I = !z && P(m);
    var M = !z && D === I;
    var R = L ? O : D;
    var F = y ? E(H, o, _) : b;
    var N = L ? R : F;
    var U = !z && A(H, u, g);
    var q = !M && I;
    var B = [ q, R, U, N ].map((function(r) {
      return k(r) && !Fr(r) && r;
    }));
    var W = function elementIsGenerated(r) {
      return r && V(B, r);
    };
    var X = W(R) ? b : R;
    var Z = {
      _r: b,
      gr: N,
      er: R,
      na: U,
      mr: q,
      hr: L ? O : R,
      Gr: L ? w : R,
      ia: S ? O : X,
      Kr: w,
      br: y,
      Lr: S,
      zr: f,
      ar: z,
      va: C,
      Sr: function _viewportHasClass(r) {
        return Pr(R, Na, r);
      },
      yr: function _viewportAddRemoveClass(r, a) {
        return Tr(R, Na, r, a);
      }
    };
    var K = Z._r, G = Z.gr, $ = Z.na, J = Z.er, Q = Z.mr;
    var rr = [ function() {
      xr(G, [ Fa, Ma ]);
      xr(K, Ma);
      if (S) {
        xr(O, [ Ma, Fa ]);
      }
    } ];
    var ar = y && W(G);
    var er = y ? K : Vr([ Q, J, $, G, K ].find((function(r) {
      return r && !W(r);
    })));
    var tr = L ? K : Q || J;
    var nr = sr(Y, rr);
    var ir = function appendElements() {
      var r = C();
      var a = Nr();
      var e = function unwrap(r) {
        Yr(Fr(r), Vr(r));
        qr(r);
      };
      var t = function prepareWrapUnwrapFocus(r) {
        return ga(r, "focusin focusout focus blur", ha, {
          H: true
        });
      };
      var i = "tabindex";
      var v = wr(J, i);
      var o = t(a);
      Cr(G, Fa, z ? "" : ja);
      Cr($, Ka, "");
      Cr(J, Na, "");
      Cr(Q, Ga, "");
      if (!z) {
        Cr(J, i, v || "-1");
        S && Cr(O, Va, "");
      }
      if (ar) {
        Wr(K, G);
        j(rr, (function() {
          Wr(G, K);
          qr(G);
        }));
      }
      Yr(tr, er);
      Yr(G, $);
      Yr($ || G, !z && J);
      Yr(J, Q);
      j(rr, [ o, function() {
        var r = Nr();
        var a = t(r);
        xr($, Ka);
        xr(Q, Ga);
        xr(J, Na);
        S && xr(O, Va);
        v ? Cr(J, i, v) : xr(J, i);
        W(Q) && e(Q);
        W(J) && e(J);
        W($) && e($);
        x(r);
        a();
      } ]);
      if (n && !z) {
        Hr(J, Na, Wa);
        j(rr, sr(xr, J, Na));
      }
      x(!z && a === b && r.top === r ? J : a);
      o();
      er = 0;
      return nr;
    };
    return [ Z, ir, nr ];
  };
  var ot = function createTrinsicUpdateSegment(r) {
    var a = r.mr;
    return function(r) {
      var e = r.$r, t = r.oa, n = r.Dr;
      var i = e || {}, v = i.Cr;
      var o = t.wr;
      var u = a && (v || n);
      if (u) {
        var c;
        setStyles(a, (c = {}, c[er] = o && "100%", c));
      }
    };
  };
  var ut = function createPaddingUpdateSegment(r, e) {
    var t = r.gr, n = r.na, i = r.er, v = r.ar;
    var o = a({
      v: lr,
      i: aa()
    }, sr(aa, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Tr, t = r.$r, o = r.oa, l = r.Dr;
      var f = c(l), s = f[0], d = f[1];
      var p = we(), _ = p.I;
      var g = t || {}, h = g.pr, m = g.Er, b = g.Or;
      var S = o.ir;
      var y = a("paddingAbsolute"), w = y[0], O = y[1];
      var C = l || m;
      if (h || d || C) {
        var x = u(l);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || b || d);
      if (E) {
        var A, H;
        var T = !w || !n && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var z = (A = {}, A[$] = T && !S ? -P : 0, A[J] = T ? -D : 0, A[G] = T && S ? -P : 0, 
        A.top = T ? -s.t : 0, A.right = T ? S ? -s.r : "auto" : 0, A.left = T ? S ? "auto" : -s.l : 0, 
        A[ar] = T && "calc(100% + " + P + "px)", A);
        var L = (H = {}, H[W] = T ? s.t : 0, H[X] = T ? s.r : 0, H[K] = T ? s.b : 0, H[Z] = T ? s.l : 0, 
        H);
        setStyles(n || i, z);
        setStyles(i, L);
        hr(e, {
          na: s,
          ua: !T,
          vr: n ? L : hr({}, z, L)
        });
      }
      return {
        ca: E
      };
    };
  };
  var ct = function createOverflowUpdateSegment(r, e) {
    var i = we();
    var v = r.gr, o = r.na, u = r.er, c = r.ar, l = r.hr, f = r.Lr, s = r.yr, d = r.va;
    var p = i.I;
    var _ = f && c;
    var g = sr(n, 0);
    var h = [ "display", "direction", "flexDirection", "writingMode" ];
    var m = {
      v: ur,
      i: {
        w: 0,
        h: 0
      }
    };
    var b = {
      v: cr,
      i: {}
    };
    var S = function getOverflowAmount(r, a) {
      var e = t.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: g(r.w - a.w),
        h: g(r.h - a.h)
      };
      return {
        w: n.w > e ? n.w : 0,
        h: n.h > e ? n.h : 0
      };
    };
    var y = function measureScrollCoordinates() {
      var r = ya(l);
      var a = s(Za, true);
      var e = ga(l, ir, ha, {
        H: true
      });
      Sa(l, {
        x: 0,
        y: 0
      });
      a();
      var t = ya(l);
      var n = ca(l);
      Sa(l, {
        x: n.w,
        y: n.h
      });
      var i = ya(l);
      Sa(l, {
        x: i.x - t.x < 1 && -n.w,
        y: i.y - t.y < 1 && -n.h
      });
      var v = ya(l);
      Sa(l, r);
      e();
      return {
        P: t,
        D: v
      };
    };
    var w = function getFlowDirectionStyles() {
      return hr({}, sa(u) ? getStyles(u, h) : {});
    };
    var O = a(m, sr(la, u)), C = O[0], x = O[1];
    var E = a(m, sr(ca, u)), A = E[0], H = E[1];
    var T = a(m), P = T[0], D = T[1];
    var z = a(b), L = z[0];
    var k = a(m), I = k[0], M = k[1];
    var R = a(b), V = R[0];
    var F = a({
      v: function _equal(r, a) {
        return or(r, a, h);
      },
      i: {}
    }), j = F[0];
    var N = a({
      v: function _equal(r, a) {
        return cr(r.P, a.P) && cr(r.D, a.D);
      },
      i: wa()
    }), U = N[0], q = N[1];
    var B = Re(Ge);
    var Y = function createViewportOverflowStyleClassName(r, a) {
      var e = a ? Ua : qa;
      return "" + e + vr(r);
    };
    var W = function setViewportOverflow(r) {
      var a = r.$;
      each(gr(a), (function(r) {
        var e = r === "x";
        var t = [ tr, nr, ir ].map((function(r) {
          return Y(r, e);
        }));
        s(t.join(" "));
        s(Y(a[r], e), true);
      }));
    };
    return function(a, t) {
      var c = a.Tr, l = a.$r, f = a.oa, h = a.Dr;
      var m = t.ca;
      var b = l || {}, O = b.pr, E = b.Er, T = b.Or, z = b.dr, k = b.Hr;
      var R = B && B.rr(r, e, f, i, c);
      var F = R || {}, N = F.cr, Y = F.lr, X = F.sr;
      var Z = Xe(c, i), K = Z[0], G = Z[1];
      var $ = c("overflow"), J = $[0], Q = $[1];
      var rr = Ze(J.x);
      var ar = Ze(J.y);
      var er = O || m || E || T || k || G;
      var tr = x(h);
      var nr = H(h);
      var ir = D(h);
      var vr = M(h);
      if (G && p) {
        s(Wa, !K);
      }
      if (er) {
        var or = Y ? Y() : [], ur = or[0];
        var cr = tr = C(h), lr = cr[0];
        var fr = nr = A(h), sr = fr[0];
        var dr = ua(u);
        var pr = sr;
        var _r = dr;
        ur && ur();
        var gr = va(d());
        var mr = {
          w: g(n(sr.w, pr.w) + lr.w),
          h: g(n(sr.h, pr.h) + lr.h)
        };
        var br = {
          w: g((_ ? gr.w : _r.w + g(dr.w - sr.w)) + lr.w),
          h: g((_ ? gr.h : _r.h + g(dr.h - sr.h)) + lr.h)
        };
        vr = I(br);
        ir = P(S(mr, br), h);
      }
      var Sr = vr, yr = Sr[0], wr = Sr[1];
      var Or = ir, Cr = Or[0], xr = Or[1];
      var Er = nr, Ar = Er[0], Hr = Er[1];
      var Pr = tr, Dr = Pr[0], zr = Pr[1];
      var Lr = L({
        x: Cr.w > 0,
        y: Cr.h > 0
      }), kr = Lr[0], Ir = Lr[1];
      var Mr = rr && ar && (kr.x || kr.y) || rr && kr.x && !kr.y || ar && kr.y && !kr.x;
      var Rr = m || T || k || zr || Hr || wr || xr || Q || G || er;
      var Vr = Ke(kr, J);
      var Fr = V(Vr.$), jr = Fr[0], Nr = Fr[1];
      var Ur = j(w(), h), qr = Ur[1];
      var Br = T || z || qr || Ir || h;
      var Yr = Br ? U(y(), h) : q(), Wr = Yr[0], Xr = Yr[1];
      if (Rr) {
        W(Vr);
        if (X && N) {
          setStyles(u, X(Vr, f, N(Vr, Ar, Dr)));
        }
      }
      Tr(v, Fa, Ra, Mr);
      Tr(o, Ka, Ra, Mr);
      hr(e, {
        $: jr,
        Rr: {
          x: yr.w,
          y: yr.h
        },
        Mr: {
          x: Cr.w,
          y: Cr.h
        },
        ta: kr,
        Fr: Oa(Wr, Cr)
      });
      return {
        aa: Nr,
        Qr: wr,
        ra: xr,
        ea: Xr || xr
      };
    };
  };
  var lt = function createStructureSetup(r) {
    var a;
    var e = vt(r), t = e[0], n = e[1], i = e[2];
    var v = {
      na: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ua: false,
      vr: (a = {}, a[$] = 0, a[J] = 0, a[G] = 0, a[W] = 0, a[X] = 0, a[K] = 0, a[Z] = 0, 
      a),
      Rr: {
        x: 0,
        y: 0
      },
      Mr: {
        x: 0,
        y: 0
      },
      $: {
        x: nr,
        y: nr
      },
      ta: {
        x: false,
        y: false
      },
      Fr: wa()
    };
    var o = t._r, u = t.hr, c = t.ar, l = t.yr;
    var f = we(), s = f.I, d = f.k;
    var p = !s && (d.x || d.y);
    var _ = [ ot(t), ut(t, v), ct(t, v) ];
    return [ n, function(r) {
      var a = {};
      var e = p;
      var t = l(Ya, true);
      var n = e && ya(u);
      each(_, (function(e) {
        hr(a, e(r, a) || {});
      }));
      Sa(u, n);
      !c && Sa(o, 0);
      t();
      return a;
    }, v, t, i ];
  };
  var ft = function createSetups(r, a, e, t) {
    var n = za(a, {});
    var i = lt(r), v = i[0], o = i[1], u = i[2], c = i[3], l = i[4];
    var f = et(c, u, n, (function(r) {
      S({}, r);
    })), s = f[0], d = f[1], p = f[2];
    var _ = it(r, a, p, u, c, t), g = _[0], h = _[1], m = _[3];
    var b = function updateHintsAreTruthy(r) {
      return gr(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, t) {
      var n = r.la, i = r.Dr, v = r.Pr, u = r.fa;
      var c = n || {};
      var l = !!i;
      var f = {
        Tr: za(a, c, l),
        la: c,
        Dr: l
      };
      if (u) {
        h(f);
        return false;
      }
      var s = t || d(hr({}, f, {
        Pr: v
      }));
      var _ = o(hr({}, f, {
        oa: p,
        $r: s
      }));
      h(hr({}, f, {
        $r: s,
        Jr: _
      }));
      var g = b(s);
      var m = b(_);
      var S = g || m || !br(c) || l;
      S && e(r, {
        $r: s,
        Jr: _
      });
      return S;
    };
    return [ function() {
      var r = c.ia, a = c.hr, e = c.yr;
      var t = e(Ya, true);
      var n = ya(r);
      var i = [ s(), v(), g() ];
      Sa(a, n);
      t();
      return sr(Y, i);
    }, S, function() {
      return {
        sa: p,
        da: u
      };
    }, {
      pa: c,
      _a: m
    }, l ];
  };
  var st = function OverlayScrollbars(r, a, e) {
    var t = we(), n = t.j;
    var i = k(r);
    var v = i ? r : r.target;
    var o = Pe(v);
    if (a && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var a = mr(r, true);
        var e = Re(Be);
        return e ? e(a, true) : a;
      };
      var s = hr({}, n(), f(a));
      var d = Aa(), p = d[0], _ = d[1], g = d[2];
      var h = Aa(e), m = h[0], b = h[1], S = h[2];
      var y = function triggerEvent(r, a) {
        S(r, a);
        g(r, a);
      };
      var w = ft(r, s, (function(r, a) {
        var e = r.la, t = r.Dr;
        var n = a.$r, i = a.Jr;
        var v = n.pr, o = n.Or, u = n.Cr, c = n.Er, l = n.Ar, f = n.dr;
        var s = i.Qr, d = i.ra, p = i.aa, _ = i.ea;
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
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return y("scroll", [ T, r ]);
      })), O = w[0], C = w[1], x = w[2], E = w[3], A = w[4];
      var H = function destroy(r) {
        Te(v);
        Y(c);
        u = true;
        y("destroyed", [ T, r ]);
        _();
        b();
      };
      var T = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Da(s, hr(e, f(r)));
            if (!br(t)) {
              hr(s, t);
              C({
                la: t
              });
            }
          }
          return hr({}, s);
        },
        on: m,
        off: function off(r, a) {
          r && a && b(r, a);
        },
        state: function state() {
          var r = x(), a = r.sa, e = r.da;
          var t = a.ir;
          var n = e.Rr, i = e.Mr, v = e.$, o = e.ta, c = e.na, l = e.ua, f = e.Fr;
          return hr({}, {
            overflowEdge: n,
            overflowAmount: i,
            overflowStyle: v,
            hasOverflow: o,
            scrollCoordinates: {
              start: f.P,
              end: f.D
            },
            padding: c,
            paddingAbsolute: l,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = E.pa, a = r._r, e = r.gr, t = r.na, n = r.er, i = r.mr, v = r.hr, o = r.Gr;
          var u = E._a, c = u.Br, l = u.Zr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Ir, e = r.kr, t = r.Vr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Yr, e = r.Wr;
            var t = f(a[0]);
            return hr({}, t, {
              clone: function clone() {
                var r = f(e());
                C({
                  fa: true
                });
                return r;
              }
            });
          };
          return hr({}, {
            target: a,
            host: e,
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
            Dr: r,
            Pr: true
          });
        },
        destroy: sr(H, false),
        plugin: function plugin(r) {
          return l[gr(r)[0]];
        }
      };
      j(c, [ A ]);
      He(v, T);
      Me(Le, OverlayScrollbars, [ T, p, l ]);
      if (Ee(E.pa.Lr, !i && r.cancel)) {
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
  st.plugin = function(r) {
    var a = P(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return Me(r, st)[0];
    }));
    Ie(e);
    return a ? t : t[0];
  };
  st.valid = function(r) {
    var a = r && r.elements;
    var e = T(a) && a();
    return L(e) && !!Pe(e.target);
  };
  st.env = function() {
    var r = we(), a = r.L, e = r.k, t = r.I, n = r.M, i = r.U, v = r.q, o = r.V, u = r.F, c = r.j, l = r.N;
    return hr({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
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
  r.ClickScrollPlugin = Qe;
  r.OverlayScrollbars = st;
  r.ScrollbarsHidingPlugin = $e;
  r.SizeObserverPlugin = We;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
