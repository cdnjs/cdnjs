/*!
 * OverlayScrollbars
 * Version: 2.7.1
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
  var e = typeof window !== "undefined" && typeof document !== "undefined";
  var t = e ? window : {};
  var n = Math.max;
  var v = Math.min;
  var i = Math.round;
  var o = Math.abs;
  var u = t.cancelAnimationFrame;
  var c = t.requestAnimationFrame;
  var l = t.setTimeout;
  var f = t.clearTimeout;
  var s = function getApi(r) {
    return typeof t[r] !== "undefined" ? t[r] : void 0;
  };
  var d = s("MutationObserver");
  var p = s("IntersectionObserver");
  var _ = s("ResizeObserver");
  var h = s("ScrollTimeline");
  var g = e && Node.ELEMENT_NODE;
  var b = Object.prototype, m = b.toString, S = b.hasOwnProperty;
  var w = /^\[object (.+)\]$/;
  var y = function isUndefined(r) {
    return r === void 0;
  };
  var O = function isNull(r) {
    return r === null;
  };
  var C = function type(r) {
    return y(r) || O(r) ? "" + r : m.call(r).replace(w, "$1").toLowerCase();
  };
  var E = function isNumber(r) {
    return typeof r === "number";
  };
  var x = function isString(r) {
    return typeof r === "string";
  };
  var A = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var T = function isFunction(r) {
    return typeof r === "function";
  };
  var H = function isArray(r) {
    return Array.isArray(r);
  };
  var P = function isObject(r) {
    return typeof r === "object" && !H(r) && !O(r);
  };
  var D = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = E(a) && a > -1 && a % 1 == 0;
    return H(r) || !T(r) && e ? a > 0 && P(r) ? a - 1 in r : true : false;
  };
  var R = function isPlainObject(r) {
    if (!r || !P(r) || C(r) !== "object") {
      return false;
    }
    var a;
    var e = "constructor";
    var t = r[e];
    var n = t && t.prototype;
    var v = S.call(r, e);
    var i = n && S.call(n, "isPrototypeOf");
    if (t && !v && !i) {
      return false;
    }
    for (a in r) {}
    return y(a) || S.call(r, a);
  };
  var z = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === g : false;
  };
  var I = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === g : false;
  };
  var L = function animationCurrentTime() {
    return performance.now();
  };
  var k = function animateNumber(r, a, e, t, v) {
    var i = 0;
    var o = L();
    var l = n(0, e);
    var f = function frame(e) {
      var u = L();
      var f = u - o;
      var s = f >= l;
      var d = e ? 1 : 1 - (n(0, o + l - u) / l || 0);
      var p = (a - r) * (T(v) ? v(d, d * l, 0, 1, l) : d) + r;
      var _ = s || d === 1;
      t && t(p, d, _);
      i = _ ? 0 : c((function() {
        return frame();
      }));
    };
    f();
    return function(r) {
      u(i);
      r && f(r);
    };
  };
  function each(r, a) {
    if (D(r)) {
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
  var V = function concat(r, a) {
    return r.concat(a);
  };
  var j = function push(r, a, e) {
    !e && !x(a) && D(a) ? Array.prototype.push.apply(r, a) : r.push(a);
    return r;
  };
  var F = function from(r) {
    return Array.from(r || []);
  };
  var N = function createOrKeepArray(r) {
    return H(r) ? r : [ r ];
  };
  var B = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var U = function deduplicateArray(r) {
    return F(new Set(r));
  };
  var Y = function runEachAndClear(r, a, e) {
    var t = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, t);
    !e && (r.length = 0);
  };
  var W = "paddingTop";
  var q = "paddingRight";
  var X = "paddingLeft";
  var K = "paddingBottom";
  var Z = "marginLeft";
  var G = "marginRight";
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
  var ur = function noop() {};
  var cr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), t = 1; t < a; t++) {
      e[t - 1] = arguments[t];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var lr = function selfClearTimeout(r) {
    var a;
    var e = r ? l : c;
    var t = r ? f : u;
    return [ function(n) {
      t(a);
      a = e(n, T(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var fr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = ur;
    var i = a || {}, o = i.p, s = i._, d = i.m;
    var p = function invokeFunctionToDebounce(a) {
      v();
      f(e);
      e = t = void 0;
      v = ur;
      r.apply(this, a);
    };
    var _ = function mergeParms(r) {
      return d && t ? d(t, r) : r;
    };
    var h = function flush() {
      if (v !== ur) {
        p(_(n) || n);
      }
    };
    var g = function debouncedFn() {
      var r = F(arguments);
      var a = T(o) ? o() : o;
      var i = E(a) && a >= 0;
      if (i) {
        var d = T(s) ? s() : s;
        var g = E(d) && d >= 0;
        var b = a > 0 ? l : c;
        var m = a > 0 ? f : u;
        var S = _(r);
        var w = S || r;
        var y = p.bind(0, w);
        v();
        var O = b(y, a);
        v = function clear() {
          return m(O);
        };
        if (g && !e) {
          e = l(h, d);
        }
        t = n = w;
      } else {
        p(r);
      }
    };
    g.S = h;
    return g;
  };
  var sr = function hasOwnProperty(r, a) {
    return Object.prototype.hasOwnProperty.call(r, a);
  };
  var dr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var pr = function assignDeep(r, a, e, t, n, v, i) {
    var o = [ a, e, t, n, v, i ];
    if ((typeof r !== "object" || O(r)) && !T(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, t) {
        var n = a[t];
        if (r === n) {
          return true;
        }
        var v = H(n);
        if (n && R(n)) {
          var i = r[t];
          var o = i;
          if (v && !H(i)) {
            o = [];
          } else if (!v && !R(i)) {
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
  var _r = function removeUndefinedProperties(r, a) {
    return each(pr({}, r), (function(r, e, t) {
      if (r === void 0) {
        delete t[e];
      } else if (a && r && R(r)) {
        t[e] = removeUndefinedProperties(r, a);
      }
    }));
  };
  var hr = function isEmptyObject(r) {
    for (var a in r) {
      return false;
    }
    return true;
  };
  var gr = function capNumber(r, a, e) {
    return n(r, v(a, e));
  };
  var br = function getDomTokensArray(r) {
    return F(new Set((H(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    }))));
  };
  var mr = function getAttr(r, a) {
    return r && r.getAttribute(a);
  };
  var Sr = function hasAttr(r, a) {
    return r && r.hasAttribute(a);
  };
  var wr = function setAttrs(r, a, e) {
    each(br(a), (function(a) {
      r && r.setAttribute(a, e || "");
    }));
  };
  var yr = function removeAttrs(r, a) {
    each(br(a), (function(a) {
      return r && r.removeAttribute(a);
    }));
  };
  var Or = function domTokenListAttr(r, a) {
    var e = br(mr(r, a));
    var t = cr(wr, r, a);
    var n = function domTokenListOperation(r, a) {
      var t = new Set(e);
      each(br(r), (function(r) {
        return t[a](r);
      }));
      return F(t).join(" ");
    };
    return {
      O: function _remove(r) {
        return t(n(r, "delete"));
      },
      C: function _add(r) {
        return t(n(r, "add"));
      },
      A: function _has(r) {
        var a = br(r);
        return a.reduce((function(r, a) {
          return r && e.includes(a);
        }), a.length > 0);
      }
    };
  };
  var Cr = function removeAttrClass(r, a, e) {
    Or(r, a).O(e);
  };
  var Er = function addAttrClass(r, a, e) {
    Or(r, a).C(e);
    return cr(Cr, r, a, e);
  };
  var xr = function addRemoveAttrClass(r, a, e, t) {
    (t ? Er : Cr)(r, a, e);
  };
  var Ar = function hasAttrClass(r, a, e) {
    return Or(r, a).A(e);
  };
  var Tr = function createDomTokenListClass(r) {
    return Or(r, "class");
  };
  var Hr = function removeClass(r, a) {
    Tr(r).O(a);
  };
  var Pr = function addClass(r, a) {
    Tr(r).C(a);
    return cr(Hr, r, a);
  };
  var Dr = function find(r, a) {
    var e = [];
    var t = a ? I(a) && a : document;
    return t ? j(e, t.querySelectorAll(r)) : e;
  };
  var Rr = function findFirst(r, a) {
    var e = a ? I(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var zr = function is(r, a) {
    if (I(r)) {
      return r.matches(a);
    }
    return false;
  };
  var Ir = function isBodyElement(r) {
    return zr(r, "body");
  };
  var Lr = function contents(r) {
    return r ? F(r.childNodes) : [];
  };
  var kr = function parent(r) {
    return r && r.parentElement;
  };
  var Mr = function closest(r, a) {
    return I(r) && r.closest(a);
  };
  var Vr = function getFocusedElement(r) {
    return (r || document).activeElement;
  };
  var jr = function liesBetween(r, a, e) {
    var t = Mr(r, a);
    var n = r && Rr(e, t);
    var v = Mr(n, a) === t;
    return t && n ? t === r || n === r || v && Mr(Mr(r, e), a) !== t : false;
  };
  var Fr = function removeElements(r) {
    if (D(r)) {
      each(F(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = kr(r);
      a && a.removeChild(r);
    }
  };
  var Nr = function before(r, a, e) {
    if (e && r) {
      var t = a;
      var n;
      if (D(e)) {
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
        return Fr(e);
      };
    }
    return ur;
  };
  var Br = function appendChildren(r, a) {
    return Nr(r, null, a);
  };
  var Ur = function insertAfter(r, a) {
    return Nr(kr(r), r && r.nextSibling, a);
  };
  var Yr = function createDiv(r) {
    var a = document.createElement("div");
    wr(a, "class", r);
    return a;
  };
  var Wr = function createDOM(r) {
    var a = Yr();
    a.innerHTML = r.trim();
    return each(Lr(a), (function(r) {
      return Fr(r);
    }));
  };
  var qr = /^--/;
  var Xr = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var Kr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Zr = function parseToZeroOrNumber(r) {
    return Kr(parseFloat(r || ""));
  };
  var Gr = function ratioToCssPercent(r) {
    return (Kr(r) * 100).toFixed(3) + "%";
  };
  var $r = function numberToCssPx(r) {
    return Kr(r) + "px";
  };
  function setStyles(r, a) {
    r && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = E(a) ? $r(a) : (a || "") + "";
        if (qr.test(e)) {
          t.setProperty(e, n);
        } else {
          t[e] = n;
        }
      } catch (v) {}
    }));
  }
  function getStyles(r, a, e) {
    var n = x(a);
    var v = n ? "" : {};
    if (r) {
      var i = t.getComputedStyle(r, e) || r.style;
      v = n ? Xr(i, a) : a.reduce((function(r, a) {
        r[a] = Xr(i, a);
        return r;
      }), v);
    }
    return v;
  }
  var Jr = function getDirectionIsRTL(r) {
    return getStyles(r, "direction") === "rtl";
  };
  var Qr = function topRightBottomLeft(r, a, e) {
    var t = a ? a + "-" : "";
    var n = e ? "-" + e : "";
    var v = t + "top" + n;
    var i = t + "right" + n;
    var o = t + "bottom" + n;
    var u = t + "left" + n;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Zr(c[v]),
      r: Zr(c[i]),
      b: Zr(c[o]),
      l: Zr(c[u])
    };
  };
  var ra = function getTrasformTranslateValue(r, a) {
    return "translate" + (P(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
  };
  var aa = {
    w: 0,
    h: 0
  };
  var ea = function getElmWidthHeightProperty(r, a) {
    return a ? {
      w: a[r + "Width"],
      h: a[r + "Height"]
    } : aa;
  };
  var ta = function windowSize(r) {
    return ea("inner", r || t);
  };
  var na = cr(ea, "offset");
  var va = cr(ea, "client");
  var ia = cr(ea, "scroll");
  var oa = function fractionalSize(r) {
    var a = parseFloat(getStyles(r, rr)) || 0;
    var e = parseFloat(getStyles(r, ar)) || 0;
    return {
      w: a - i(a),
      h: e - i(e)
    };
  };
  var ua = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ca = function domRectHasDimensions(r) {
    return !!(r && (r[ar] || r[rr]));
  };
  var la = function domRectAppeared(r, a) {
    var e = ca(r);
    var t = ca(a);
    return !t && e;
  };
  var fa = function removeEventListener(r, a, e, t) {
    each(br(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var sa = function addEventListener(r, a, e, t) {
    var n;
    var v = (n = t && t.T) != null ? n : true;
    var i = t && t.H || false;
    var o = t && t.P || false;
    var u = {
      passive: v,
      capture: i
    };
    return cr(Y, br(a).map((function(a) {
      var t = o ? function(n) {
        fa(r, a, t, i);
        e(n);
      } : e;
      r.addEventListener(a, t, u);
      return cr(fa, r, a, t, i);
    })));
  };
  var da = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var pa = function preventDefault(r) {
    return r.preventDefault();
  };
  var _a = {
    x: 0,
    y: 0
  };
  var ha = function absoluteCoordinates(r) {
    var a = r && ua(r);
    return a ? {
      x: a.left + t.scrollX,
      y: a.top + t.scrollY
    } : _a;
  };
  var ga = function convertScrollPosition(r, a, e) {
    return e ? e.n ? -r + 0 : e.i ? a - r : r : r;
  };
  var ba = function getRawScrollBounds(r, a) {
    return [ ga(0, r, a), ga(r, r, a) ];
  };
  var ma = function getRawScrollRatio(r, a, e) {
    return gr(0, 1, ga(r, a, e) / a || 0);
  };
  var Sa = function scrollElementTo(r, a) {
    var e = E(a) ? {
      x: a,
      y: a
    } : a || {}, t = e.x, n = e.y;
    E(t) && (r.scrollLeft = t);
    E(n) && (r.scrollTop = n);
  };
  var wa = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var ya = function manageListener(r, a) {
    each(N(a), r);
  };
  var Oa = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var t = a.get(r);
        ya((function(r) {
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
      if (x(r)) {
        var n = a.get(r) || new Set;
        a.set(r, n);
        ya((function(r) {
          T(r) && n.add(r);
        }), t);
        return cr(e, r, t);
      }
      if (A(t) && t) {
        e();
      }
      var v = dr(r);
      var i = [];
      each(v, (function(a) {
        var e = r[a];
        e && j(i, addEvent(a, e));
      }));
      return cr(Y, i);
    };
    var n = function triggerEvent(r, e) {
      each(F(a.get(r)), (function(r) {
        if (e && !B(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var Ca = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (T(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Ea = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && sr(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var xa = {
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
  var Aa = function getOptionsDiff(r, a) {
    var e = {};
    var t = V(dr(a), dr(r));
    each(t, (function(t) {
      var n = r[t];
      var v = a[t];
      if (P(n) && P(v)) {
        pr(e[t] = {}, getOptionsDiff(n, v));
        if (hr(e[t])) {
          delete e[t];
        }
      } else if (sr(a, t) && v !== n) {
        var i = true;
        if (H(n) || H(v)) {
          try {
            if (Ca(n) === Ca(v)) {
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
  var Ta = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Ea(r, t), e || Ea(a, t) !== void 0 ];
    };
  };
  var Ha = "data-overlayscrollbars";
  var Pa = "os-environment";
  var Da = Pa + "-scrollbar-hidden";
  var Ra = Ha + "-initialize";
  var za = Ha;
  var Ia = za + "-overflow-x";
  var La = za + "-overflow-y";
  var ka = "overflowVisible";
  var Ma = "scrollbarPressed";
  var Va = "updating";
  var ja = "body";
  var Fa = Ha + "-viewport";
  var Na = "arrange";
  var Ba = "scrollbarHidden";
  var Ua = ka;
  var Ya = Ha + "-padding";
  var Wa = Ua;
  var qa = Ha + "-content";
  var Xa = "os-size-observer";
  var Ka = Xa + "-appear";
  var Za = Xa + "-listener";
  var Ga = Za + "-scroll";
  var $a = Za + "-item";
  var Ja = $a + "-final";
  var Qa = "os-trinsic-observer";
  var re = "os-theme-none";
  var ae = "os-scrollbar";
  var ee = ae + "-rtl";
  var te = ae + "-horizontal";
  var ne = ae + "-vertical";
  var ve = ae + "-track";
  var ie = ae + "-handle";
  var oe = ae + "-visible";
  var ue = ae + "-cornerless";
  var ce = ae + "-interaction";
  var le = ae + "-unusable";
  var fe = ae + "-auto-hide";
  var se = fe + "-hidden";
  var de = ae + "-wheel";
  var pe = ve + "-interactive";
  var _e = ie + "-interactive";
  var he = {};
  var ge = {};
  var be = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        he[e] = r[e];
      }));
    }));
  };
  var me = function registerPluginModuleInstances(r, a, e) {
    return dr(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], c = o[1], l = o[2];
      var f = e ? i : v;
      if (f) {
        var s = e ? f(u, c, a) : f(a);
        return (l || ge)[t] = s;
      }
    }));
  };
  var Se = function getStaticPluginModuleInstance(r) {
    return ge[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.D && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var we = {
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
  })(we);
  var ye = we.exports;
  var Oe = /*@__PURE__*/ getDefaultExportFromCjs(ye);
  var Ce = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ee = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = Oe({}, a);
    var i = dr(r).filter((function(r) {
      return sr(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var u = r[i];
      var c = R(u);
      var l = t ? t + "." : "";
      if (c && R(o)) {
        var f = validateRecursive(u, o, e, l + i), s = f[0], d = f[1];
        n[i] = s;
        v[i] = d;
        each([ v, n ], (function(r) {
          if (hr(r[i])) {
            delete r[i];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var h = [];
        var g = C(o);
        var b = N(u);
        each(b, (function(r) {
          var a;
          each(Ce, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = y(a);
          if (e && x(o)) {
            var t = r.split(" ");
            p = !!t.find((function(r) {
              return r === o;
            }));
            j(_, t);
          } else {
            p = Ce[g] === r;
          }
          j(h, e ? Ce.string : a);
          return !p;
        }));
        if (p) {
          n[i] = o;
        } else if (e) {
          console.warn('The option "' + l + i + "\" wasn't set, because it doesn't accept the type [ " + g.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + h.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var xe = function validateOptions(r, a, e) {
    return Ee(r, a, e);
  };
  var Ae = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Ae] = {
      static: function _static() {
        var r = Ce.number;
        var a = Ce.boolean;
        var e = [ Ce.array, Ce.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Ce.number, Ce.array, Ce.null ],
            ignoreMutation: [ Ce.function, Ce.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Ce.string, Ce.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Ce.array, Ce.null ]
          }
        };
        return function(r, a) {
          var e = xe(i, r, a), t = e[0], n = e[1];
          return Oe({}, n, t);
        };
      }
    }, r;
  })();
  var Te = "__osSizeObserverPlugin";
  var He = /* @__PURE__ */ function(r) {
    return r = {}, r[Te] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = Wr('<div class="' + $a + '" dir="ltr"><div class="' + $a + '"><div class="' + Ja + '"></div></div><div class="' + $a + '"><div class="' + Ja + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var l = o.lastChild;
          var f = o.firstChild;
          var s = f == null ? void 0 : f.firstChild;
          var d = na(o);
          var p = d;
          var _ = false;
          var h;
          var g = function reset() {
            Sa(f, n);
            Sa(l, n);
          };
          var b = function onResized(r) {
            h = 0;
            if (_) {
              d = p;
              a(r === true);
            }
          };
          var m = function onScroll(r) {
            p = na(o);
            _ = !r || !vr(p, d);
            if (r) {
              da(r);
              if (_ && !h) {
                u(h);
                h = c(b);
              }
            } else {
              b(r === false);
            }
            g();
          };
          var S = [ Br(r, i), sa(f, v, m), sa(l, v, m) ];
          Pr(r, Ga);
          setStyles(s, (t = {}, t[rr] = n, t[ar] = n, t));
          c(g);
          return [ e ? cr(m, false) : g, S ];
        };
      }
    }, r;
  }();
  var Pe = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.R;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], v = t[1];
    return [ n && e.x && e.y, v ];
  };
  var De = function overflowIsVisible(r) {
    return r.indexOf(tr) === 0;
  };
  var Re = function getViewportOverflowState(r, a) {
    var e = r.I;
    var t = function getStatePerAxis(r) {
      var t = getStyles(e, r);
      var n = a ? a[r] : t;
      var v = n === "scroll";
      return [ t, v ];
    };
    var n = t(J), v = n[0], i = n[1];
    var o = t(Q), u = o[0], c = o[1];
    return {
      L: {
        x: v,
        y: u
      },
      k: {
        x: i,
        y: c
      }
    };
  };
  var ze = function setViewportOverflowState(r, a, e, t) {
    var n = a.x || a.y;
    var v = function setAxisOverflowStyle(r, a) {
      var e = De(r);
      var t = e && n ? "hidden" : "";
      var v = a && e && r.replace(tr + "-", "") || t;
      return [ a && !e ? r : "", De(v) ? "hidden" : v ];
    };
    var i = v(e.x, a.x), o = i[0], u = i[1];
    var c = v(e.y, a.y), l = c[0], f = c[1];
    t[J] = u && l ? u : o;
    t[Q] = f && o ? f : l;
    return Re(r, t);
  };
  var Ie = "__osScrollbarsHidingPlugin";
  var Le = /* @__PURE__ */ function(r) {
    return r = {}, r[Ie] = {
      static: function _static() {
        return {
          M: function _viewportArrangement(r, a, e, t, n) {
            var v = r.V, i = r.I;
            var o = t.j, u = t.R, c = t.F;
            var l = !v && !o && (u.x || u.y);
            var f = Pe(n, t), s = f[0];
            var d = function _getViewportOverflowHideOffset(r) {
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
                N: {
                  x: v,
                  y: f
                },
                B: {
                  x: i,
                  y: d
                }
              };
            };
            var p = function _hideNativeScrollbars(r, e, t, n) {
              var i;
              var o = e.U;
              pr(n, (i = {}, i[G] = 0, i[$] = 0, i[Z] = 0, i));
              if (!v) {
                var u = d(r), c = u.N, l = u.B;
                var f = l.x, s = l.y;
                var p = c.x, _ = c.y;
                var h = a.Y;
                var g = o ? Z : G;
                var b = o ? X : q;
                var m = h[g];
                var S = h[$];
                var w = h[b];
                var y = h[K];
                n[rr] = "calc(100% + " + (_ + m * -1) + "px)";
                n[g] = -_ + m;
                n[$] = -p + S;
                if (t) {
                  n[b] = w + (s ? _ : 0);
                  n[K] = y + (f ? p : 0);
                }
              }
            };
            var _ = function _arrangeViewport(r, t, n) {
              if (l) {
                var v = a.Y;
                var o = d(r), u = o.N, c = o.B;
                var f = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var h = e.U;
                var g = h ? q : X;
                var b = v[g];
                var m = v.paddingTop;
                var S = t.w + n.w;
                var w = t.h + n.h;
                var y = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: p && f ? p + w - m + "px" : ""
                };
                setStyles(i, {
                  "--os-vaw": y.w,
                  "--os-vah": y.h
                });
              }
              return l;
            };
            var h = function _undoViewportArrange(t) {
              if (l) {
                var n = t || Re(r);
                var v = a.Y;
                var o = d(n), u = o.B;
                var c = u.x, f = u.y;
                var s = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    s[r] = v[r];
                  }));
                };
                if (c) {
                  _([ $, W, K ]);
                }
                if (f) {
                  _([ Z, G, X, q ]);
                }
                var h = getStyles(i, dr(s));
                Cr(i, Fa, Na);
                setStyles(i, s);
                return [ function() {
                  p(n, e, l, h);
                  setStyles(i, h);
                  Er(i, Fa, Na);
                }, n ];
              }
              return [ ur ];
            };
            return {
              W: d,
              q: _,
              X: h,
              K: p
            };
          },
          Z: function _envWindowZoom() {
            var r = {
              w: 0,
              h: 0
            };
            var a = 0;
            var e = function getWindowDPR() {
              var r = t.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return t.devicePixelRatio || a / e;
            };
            var n = function diffBiggerThanOne(r, a) {
              var e = o(r);
              var t = o(a);
              return !(e === t || e + 1 === t || e - 1 === t);
            };
            return function(t, v) {
              var u = ta();
              var c = {
                w: u.w - r.w,
                h: u.h - r.h
              };
              if (c.w === 0 && c.h === 0) {
                return;
              }
              var l = {
                w: o(c.w),
                h: o(c.h)
              };
              var f = {
                w: o(i(u.w / (r.w / 100))),
                h: o(i(u.h / (r.h / 100)))
              };
              var s = e();
              var d = l.w > 2 && l.h > 2;
              var p = !n(f.w, f.h);
              var _ = s !== a && s > 0;
              var h = d && p && _;
              var g;
              var b;
              if (h) {
                var m = v();
                b = m[0];
                g = m[1];
                pr(t.F, b);
              }
              r = u;
              a = s;
              return g;
            };
          }
        };
      }
    }, r;
  }();
  var ke = "__osClickScrollPlugin";
  var Me = /* @__PURE__ */ function(r) {
    return r = {}, r[ke] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = ur;
          var o = function animateClickScroll(o) {
            i = k(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var f = c + t;
              var s = n >= c && n <= f;
              if (u && !s) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var d = l((function() {
                    animateClickScroll(e);
                  }), 222);
                  i = function clear() {
                    clearTimeout(d);
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
  var Ve;
  var je = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, a, e, t) {
      Br(r, a);
      var n = va(a);
      var v = na(a);
      var i = oa(e);
      t && Fr(a);
      return {
        x: v.h - n.h + i.h,
        y: v.w - n.w + i.w
      };
    };
    var e = function getNativeScrollbarsHiding(r) {
      var a = false;
      var e = Pr(r, Da);
      try {
        a = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      e();
      return a;
    };
    var n = function getRtlScrollBehavior(r, a) {
      var e;
      setStyles(r, (e = {}, e[J] = er, e[Q] = er, e.direction = "rtl", e));
      Sa(r, {
        x: 0
      });
      var t = ha(r);
      var n = ha(a);
      Sa(r, {
        x: -999
      });
      var v = ha(a);
      return {
        i: t.x === n.x,
        n: n.x !== v.x
      };
    };
    var v = document, i = v.body;
    var o = "." + Pa + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + Pa + " div{width:200%;height:200%;margin:10px 0}." + Da + "{scrollbar-width:none!important}." + Da + "::-webkit-scrollbar,." + Da + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}";
    var u = Wr('<div class="' + Pa + '"><div></div><style>' + o + "</style></div>");
    var c = u[0];
    var l = c.firstChild;
    var f = Oa(), s = f[0], d = f[2];
    var p = a({
      v: r(i, c, l),
      o: ir
    }, cr(r, i, c, l, true)), _ = p[0], g = p[1];
    var b = g(), m = b[0];
    var S = e(c);
    var w = {
      x: m.x === 0,
      y: m.y === 0
    };
    var y = {
      elements: {
        host: null,
        padding: !S,
        viewport: function viewport(r) {
          return S && Ir(r) && r;
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
    var O = pr({}, xa);
    var C = cr(pr, {}, O);
    var E = cr(pr, {}, y);
    var x = {
      F: m,
      R: w,
      j: S,
      G: !!h,
      $: n(c, l),
      J: cr(s, "r"),
      rr: E,
      ar: function _setDefaultInitialization(r) {
        return pr(y, r) && E();
      },
      er: C,
      tr: function _setDefaultOptions(r) {
        return pr(O, r) && C();
      },
      nr: pr({}, y),
      vr: pr({}, O)
    };
    yr(c, "style");
    Fr(c);
    t.addEventListener("resize", (function() {
      var r;
      if (!S && (!w.x || !w.y)) {
        var a = Se(Ie);
        var e = a ? a.Z() : ur;
        r = !!e(x, _);
      }
      d("r", [ r ]);
    }));
    return x;
  };
  var Fe = function getEnvironment() {
    if (!Ve) {
      Ve = je();
    }
    return Ve;
  };
  var Ne = function resolveInitialization(r, a) {
    return T(a) ? a.apply(0, r) : a;
  };
  var Be = function staticInitializationElement(r, a, e, t) {
    var n = y(t) ? e : t;
    var v = Ne(r, n);
    return v || a.apply(0, r);
  };
  var Ue = function dynamicInitializationElement(r, a, e, t) {
    var n = y(t) ? e : t;
    var v = Ne(r, n);
    return !!v && (z(v) ? v : a.apply(0, r));
  };
  var Ye = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = Fe(), i = v.R, o = v.j, u = v.rr;
    var c = u().cancel, l = c.nativeScrollbarsOverlaid, f = c.body;
    var s = t != null ? t : l;
    var d = y(n) ? f : n;
    var p = (i.x || i.y) && s;
    var _ = r && (O(d) ? !o : d);
    return !!p || !!_;
  };
  var We = new WeakMap;
  var qe = function addInstance(r, a) {
    We.set(r, a);
  };
  var Xe = function removeInstance(r) {
    We.delete(r);
  };
  var Ke = function getInstance(r) {
    return We.get(r);
  };
  var Ze = function createEventContentChange(r, a, e) {
    var t = false;
    var n = e ? new WeakMap : false;
    var v = function destroy() {
      t = true;
    };
    var i = function updateElements(v) {
      if (n && e) {
        var i = e.map((function(a) {
          var e = a || [], t = e[0], n = e[1];
          var i = n && t ? (v || Dr)(t, r) : [];
          return [ i, n ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = n.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = sa(v, i, (function(r) {
                if (t) {
                  c();
                  n.delete(v);
                } else {
                  a(r);
                }
              }));
              n.set(v, j(o, c));
            } else {
              Y(o);
              n.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var Ge = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.ir, o = v.ur, u = v.cr, c = v.lr, l = v.sr, f = v.dr;
    var s = fr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var p = Ze(r, s, u), _ = p[0], h = p[1];
    var g = i || [];
    var b = o || [];
    var m = V(g, b);
    var S = function observerCallback(n, v) {
      if (!B(v)) {
        var i = l || ur;
        var o = f || ur;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, l = e.type, f = e.oldValue, _ = e.addedNodes, h = e.removedNodes;
          var g = l === "attributes";
          var m = l === "childList";
          var S = r === v;
          var w = g && n;
          var y = w && mr(v, n || "") || null;
          var O = w && f !== y;
          var C = M(b, n) && O;
          if (a && (m || !S)) {
            var E = g && O;
            var x = E && c && zr(v, c);
            var A = x ? !i(v, n, f, y) : !g || E;
            var T = A && !o(e, !!x, r, t);
            each(_, (function(r) {
              return j(u, r);
            }));
            each(h, (function(r) {
              return j(u, r);
            }));
            p = p || T;
          }
          if (!a && S && O && !i(v, n, f, y)) {
            j(s, n);
            d = d || C;
          }
        }));
        h((function(r) {
          return U(u).reduce((function(a, e) {
            j(a, Dr(r, e));
            return zr(e, r) ? j(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!B(s) || d) {
          var _ = [ U(s), d ];
          !n && e.apply(0, _);
          return _;
        }
      }
    };
    var w = new d(cr(S, false));
    return [ function() {
      w.observe(r, {
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
          w.disconnect();
          n = false;
        }
      };
    }, function() {
      if (n) {
        s.S();
        return S(true, w.takeRecords());
      }
    } ];
  };
  var $e = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.pr, o = v._r;
    var u = Se(Te);
    var c = Fe(), l = c.$;
    var f = cr(Jr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = Wr('<div class="' + Xa + '"><div class="' + Za + '"></div></div>');
      var c = v[0];
      var s = c.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = !a && H(r);
        var v = false;
        var o = false;
        var u = true;
        if (a) {
          var f = d(r.contentRect), s = f[0], p = f[2];
          var _ = ca(s);
          var h = la(s, p);
          var g = !p;
          o = g || h;
          v = !o && !_;
          u = !v;
        } else if (t) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var b = t ? r[0] : Jr(c);
          Sa(c, {
            x: ga(n, n, b && l),
            y: n
          });
        }
        if (!v) {
          e({
            hr: t ? r : void 0,
            gr: !t,
            _r: o
          });
        }
      };
      if (_) {
        var h = new _((function(r) {
          return p(r.pop());
        }));
        h.observe(s);
        j(t, (function() {
          h.disconnect();
        }));
      } else if (u) {
        var g = u(s, p, o), b = g[0], m = g[1];
        j(t, V([ Pr(c, Ka), sa(c, "animationstart", b) ], m));
      } else {
        return ur;
      }
      if (i) {
        var S = a({
          v: void 0
        }, f), w = S[0];
        j(t, sa(c, "scroll", (function(r) {
          var a = w();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Hr(s, "ltr rtl");
            Pr(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          da(r);
        })));
      }
      return cr(Y, j(t, Br(r, c)));
    };
  };
  var Je = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Yr(Qa);
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
      if (p) {
        t = new p(cr(c, false), {
          root: r
        });
        t.observe(v);
        j(a, (function() {
          t.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = na(v);
          u(r);
        };
        j(a, $e(v, e)());
        e();
      }
      return cr(Y, j(a, Br(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Qe = function createObserversSetup(r, e, t, n) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = Fe(), s = f.j;
    var d = "[" + za + "]";
    var p = "[" + Fa + "]";
    var h = [ "tabindex" ];
    var g = [ "wrap", "cols", "rows" ];
    var b = [ "id", "class", "style", "open" ];
    var m = r.br, S = r.mr, w = r.I, y = r.Sr, O = r.wr, C = r.V, A = r.yr, P = r.Or;
    var D = {
      Cr: false,
      U: Jr(m)
    };
    var R = Fe();
    var z = Se(Ie);
    var I = a({
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = z && z.M(r, e, D, R, t).X;
      var n = A(Ua);
      var v = !C && A(Na);
      var i = v && wa(w);
      P(Ua);
      C && P(Va, true);
      var o = v && a && a()[0];
      var u = ia(y);
      var c = ia(w);
      var l = oa(w);
      P(Ua, n);
      C && P(Va);
      o && o();
      Sa(w, i);
      return {
        w: c.w + u.w + l.w,
        h: c.h + u.h + l.h
      };
    })), L = I[0];
    var k = O ? g : V(b, g);
    var j = fr(n, {
      p: function _timeout() {
        return v;
      },
      _: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ V(dr(e), dr(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var F = function setDirectionWhenViewportIsTarget(r) {
      if (C) {
        var a = Jr(m);
        pr(r, {
          Er: l !== a
        });
        pr(D, {
          U: a
        });
        l = a;
      }
    };
    var N = function updateViewportAttrsFromHost(r) {
      each(r || h, (function(r) {
        if (M(h, r)) {
          var a = mr(S, r);
          if (x(a)) {
            wr(w, r, a);
          } else {
            yr(w, r);
          }
        }
      }));
    };
    var B = function onTrinsicChanged(r, a) {
      var e = r[0], t = r[1];
      var v = {
        Ar: t
      };
      pr(D, {
        Cr: e
      });
      !a && n(v);
      return v;
    };
    var U = function onSizeChanged(r) {
      var a = r.gr, e = r.hr, t = r._r;
      var v = a && !t && !e;
      var i = !v && s ? j : n;
      var o = e || [], u = o[0], c = o[1];
      var l = {
        gr: a || t,
        _r: t,
        Er: c
      };
      F(l);
      e && pr(D, {
        U: u
      });
      i(l);
    };
    var Y = function onContentMutation(r, a) {
      var e = L(), t = e[1];
      var v = {
        Tr: t
      };
      F(v);
      var i = r ? n : j;
      t && !a && i(v);
      return v;
    };
    var W = function onHostMutation(r, a, e) {
      var t = {
        Hr: a
      };
      F(t);
      if (a && !e) {
        j(t);
      } else if (!C) {
        N(r);
      }
      return t;
    };
    var q = R.J;
    var X = y ? Je(S, B) : [], K = X[0], Z = X[1];
    var G = !C && $e(S, U, {
      _r: true,
      pr: true
    });
    var $ = Ge(S, false, W, {
      ur: b,
      ir: V(b, h)
    }), J = $[0], Q = $[1];
    var rr = C && _ && new _((function(r) {
      var a = r[r.length - 1].contentRect;
      U({
        gr: true,
        _r: la(a, c)
      });
      c = a;
    }));
    return [ function() {
      N();
      rr && rr.observe(S);
      var r = G && G();
      var a = K && K();
      var e = J();
      var t = q((function(r) {
        var a = L(), e = a[1];
        j({
          Pr: r,
          Tr: e
        });
      }));
      return function() {
        rr && rr.disconnect();
        r && r();
        a && a();
        u && u();
        e();
        t();
      };
    }, function(r) {
      var a = r.Dr, e = r.Rr, t = r.zr;
      var n = {};
      var c = a("update.ignoreMutation"), l = c[0];
      var f = a("update.attributes"), s = f[0], _ = f[1];
      var h = a("update.elementEvents"), g = h[0], b = h[1];
      var m = a("update.debounce"), S = m[0], O = m[1];
      var x = b || _;
      var A = e || t;
      var P = function ignoreMutationFromOptions(r) {
        return T(l) && l(r);
      };
      if (x) {
        o && o();
        u && u();
        var D = Ge(y || w, true, Y, {
          ir: V(k, s || []),
          cr: g,
          lr: d,
          dr: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !C ? jr(e, d, p) : false;
            return n || !!Mr(e, "." + ae) || !!P(r);
          }
        }), R = D[0], z = D[1];
        u = R();
        o = z;
      }
      if (O) {
        j.S();
        if (H(S)) {
          var I = S[0];
          var L = S[1];
          v = E(I) && I;
          i = E(L) && L;
        } else if (E(S)) {
          v = S;
          i = false;
        } else {
          v = false;
          i = false;
        }
      }
      if (A) {
        var M = Q();
        var N = Z && Z();
        var U = o && o();
        M && pr(n, W(M[0], M[1], A));
        N && pr(n, B(N[0], A));
        U && pr(n, Y(U[0], A));
      }
      F(n);
      return n;
    }, D ];
  };
  var rt = function createScrollbarsSetupElements(r, a, e, t) {
    var n = Fe(), v = n.rr, i = n.$;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var l = a.br, f = a.mr, s = a.I, d = a.Ir, p = a.Lr, _ = a.kr, g = a.V;
    var b = d ? {} : r, m = b.scrollbars;
    var S = m || {}, w = S.slot;
    var y = new Map;
    var O = function initScrollTimeline(r) {
      return h && new h({
        source: p,
        axis: r
      });
    };
    var C = O("x");
    var E = O("y");
    var x = Ue([ l, f, s ], (function() {
      return g && _ ? l : f;
    }), c, w);
    var T = function getScrollbarHandleLengthRatio(r, a) {
      if (a) {
        var t = r ? rr : ar;
        var n = a.Mr, v = a.Vr;
        var i = ua(v)[t];
        var o = ua(n)[t];
        return gr(0, 1, i / o || 0);
      }
      var u = r ? "x" : "y";
      var c = e.jr, l = e.Fr;
      var f = l[u];
      var s = c[u];
      return gr(0, 1, f / (f + s) || 0);
    };
    var H = function getScrollbarHandleOffsetRatio(r, a, e, t) {
      var n = T(e, r);
      return 1 / n * (1 - n) * (t ? 1 - a : a) || 0;
    };
    var P = function addDirectionRTLKeyframes(r, a) {
      return pr(r, a ? {
        clear: [ "left" ]
      } : {});
    };
    var D = function cancelElementAnimations(r) {
      y.forEach((function(a, e) {
        var t = r ? M(N(r), e) : true;
        if (t) {
          each(a || [], (function(r) {
            r && r.cancel();
          }));
          y.delete(e);
        }
      }));
    };
    var R = function setElementAnimation(r, a, e, t) {
      var n = y.get(r) || [];
      var v = n.find((function(r) {
        return r && r.timeline === a;
      }));
      if (v) {
        v.effect = new KeyframeEffect(r, e, {
          composite: t
        });
      } else {
        y.set(r, V(n, [ r.animate(e, {
          timeline: a,
          composite: t
        }) ]));
      }
    };
    var z = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Pr : Hr;
      each(r, (function(r) {
        t(r.Nr, a);
      }));
    };
    var I = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var L = function scrollbarStructureRefreshHandleLength(r, a) {
      I(r, (function(r) {
        var e;
        var t = r.Vr;
        return [ t, (e = {}, e[a ? rr : ar] = Gr(T(a)), e) ];
      }));
    };
    var k = function scrollbarStructureRefreshHandleOffset(r, a) {
      var t = e.jr;
      var n = a ? t.x : t.y;
      var v = function getTransformValue(r, e, t) {
        return ra(Gr(H(r, ma(e, n, t), a, t)), a);
      };
      if (C && E) {
        each(r, (function(r) {
          var e = r.Nr, t = r.Vr;
          var o = a && Jr(e) && i;
          R(t, a ? C : E, P({
            transform: ba(n, o).map((function(a) {
              return v(r, a, o);
            }))
          }, o));
        }));
      } else {
        var o = wa(p);
        I(r, (function(r) {
          var e = r.Vr, t = r.Nr;
          return [ e, {
            transform: v(r, a ? o.x : o.y, a && Jr(t) && i)
          } ];
        }));
      }
    };
    var F = function doRefreshScrollbarOffset(r) {
      return g && !_ && kr(r) === s;
    };
    var B = [];
    var U = [];
    var W = [];
    var q = function scrollbarsAddRemoveClass(r, a, e) {
      var t = A(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && z(U, r, a);
      v && z(W, r, a);
    };
    var X = function refreshScrollbarsHandleLength() {
      L(U, true);
      L(W);
    };
    var K = function refreshScrollbarsHandleOffset() {
      k(U, true);
      k(W);
    };
    var Z = function refreshScrollbarsScrollbarOffset() {
      if (g) {
        var r = e.jr;
        var a = .5;
        if (C && E) {
          each(V(W, U), (function(e) {
            var t = e.Nr;
            if (F(t)) {
              var n = function setScrollbarElementAnimation(r, e, n) {
                var v = n && Jr(t) && i;
                R(t, r, P({
                  transform: ba(e - a, v).map((function(r) {
                    return ra($r(r), n);
                  }))
                }, v), "add");
              };
              n(C, r.x, true);
              n(E, r.y);
            } else {
              D(t);
            }
          }));
        } else {
          var t = wa(p);
          var n = function styleScrollbarPosition(a) {
            var e = a.Nr;
            var n = F(e) && e;
            var v = function getTranslateValue(r, a, e) {
              var t = ma(r, a, e);
              var n = a * t;
              return $r(e ? -n : n);
            };
            return [ n, {
              transform: n ? ra({
                x: v(t.x, r.x, Jr(e) && i),
                y: v(t.y, r.y)
              }) : ""
            } ];
          };
          I(U, n);
          I(W, n);
        }
      }
    };
    var G = function generateScrollbarDOM(r) {
      var a = r ? te : ne;
      var e = Yr(ae + " " + a);
      var n = Yr(ve);
      var v = Yr(ie);
      var i = {
        Nr: e,
        Mr: n,
        Vr: v
      };
      j(r ? U : W, i);
      j(B, [ Br(e, n), Br(n, v), cr(Fr, e), D, t(i, q, k, r) ]);
      return i;
    };
    var $ = cr(G, true);
    var J = cr(G, false);
    var Q = function appendElements() {
      Br(x, U[0].Nr);
      Br(x, W[0].Nr);
      return cr(Y, B);
    };
    $();
    J();
    return [ {
      Br: X,
      Ur: K,
      Yr: Z,
      Wr: q,
      qr: {
        G: C,
        Xr: U,
        Kr: $,
        Zr: cr(I, U)
      },
      Gr: {
        G: E,
        Xr: W,
        Kr: J,
        Zr: cr(I, W)
      }
    }, Q ];
  };
  var at = function createScrollbarsSetupEvents(r, a, e, t) {
    var n = a.mr, v = a.I, o = a.V, u = a.Lr, c = a.$r;
    return function(a, f, s, d) {
      var p = a.Nr, _ = a.Mr, h = a.Vr;
      var g = lr(333), b = g[0], m = g[1];
      var S = lr(), w = S[0], y = S[1];
      var O = cr(s, [ a ], d);
      var C = !!u.scrollBy;
      var E = "client" + (d ? "X" : "Y");
      var x = d ? rr : ar;
      var A = d ? "left" : "top";
      var T = d ? "w" : "h";
      var H = d ? "x" : "y";
      var P = function isAffectingTransition(r) {
        return r.propertyName.indexOf(x) > -1;
      };
      var D = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var t = function createRelativeHandleMove(r, a) {
          return function(t) {
            var n;
            var v = e.jr;
            var i = na(_)[T] - na(h)[T];
            var o = a * t / i;
            var c = o * v[H];
            Sa(u, (n = {}, n[H] = r + c, n));
          };
        };
        return sa(_, "pointerdown", (function(e) {
          var v = Mr(e.target, "." + ie) === h;
          var o = v ? h : _;
          var l = r.scrollbars;
          var f = e.button, s = e.isPrimary, d = e.pointerType;
          var p = l.pointers;
          var g = f === 0 && s && l[v ? "dragScroll" : "clickScroll"] && (p || []).includes(d);
          if (g) {
            var b = !v && e.shiftKey;
            var m = cr(ua, h);
            var S = cr(ua, _);
            var w = function getHandleOffset(r, a) {
              return (r || m())[A] - (a || S())[A];
            };
            var y = i(ua(u)[x]) / na(u)[T] || 1;
            var O = t(wa(u)[H] || 0, 1 / y);
            var C = e[E];
            var P = m();
            var D = S();
            var R = P[x];
            var z = w(P, D) + R / 2;
            var I = C - D[A];
            var L = v ? 0 : I - z;
            var k = function releasePointerCapture(r) {
              Y(V);
              o.releasePointerCapture(r.pointerId);
            };
            var M = Er(n, za, Ma);
            var V = [ M, sa(c, a, k), sa(c, "selectstart", (function(r) {
              return pa(r);
            }), {
              T: false
            }), sa(_, a, k), sa(_, "pointermove", (function(r) {
              var a = r[E] - C;
              if (v || b) {
                O(L + a);
              }
            })) ];
            o.setPointerCapture(e.pointerId);
            if (b) {
              O(L);
            } else if (!v) {
              var F = Se(ke);
              F && j(V, F(O, w, L, R, I));
            }
          }
        }));
      };
      var R = true;
      return cr(Y, [ sa(h, "pointermove pointerleave", t), sa(p, "pointerenter", (function() {
        f(ce, true);
      })), sa(p, "pointerleave pointercancel", (function() {
        f(ce, false);
      })), !o && sa(p, "mousedown", (function() {
        var r = Vr();
        if (Sr(r, Fa) || Sr(r, za) || r === document.body) {
          l((function() {
            v.focus();
          }), 25);
        }
      })), sa(p, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, t = r.deltaMode;
        if (C && R && t === 0 && kr(p) === n) {
          u.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        R = false;
        f(de, true);
        b((function() {
          R = true;
          f(de);
        }));
        pa(r);
      }), {
        T: false,
        H: true
      }), sa(h, "transitionstart", (function(r) {
        if (P(r)) {
          var a = function animateHandleOffset() {
            O();
            w(animateHandleOffset);
          };
          a();
        }
      })), sa(h, "transitionend transitioncancel", (function(r) {
        if (P(r)) {
          y();
          O();
        }
      })), sa(p, "mousedown", cr(sa, c, "click", da, {
        P: true,
        H: true
      }), {
        H: true
      }), D(), m, y ]);
    };
  };
  var et = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var l;
    var f = ur;
    var s = 0;
    var d = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var p = lr(), _ = p[0], h = p[1];
    var g = lr(100), b = g[0], m = g[1];
    var S = lr(100), w = S[0], y = S[1];
    var O = lr((function() {
      return s;
    })), C = O[0], E = O[1];
    var x = rt(r, n, t, at(a, n, t, (function(r) {
      return d(r) && M();
    }))), A = x[0], T = x[1];
    var H = n.mr, P = n.Jr, D = n.kr;
    var R = A.Wr, z = A.Br, I = A.Ur, L = A.Yr;
    var k = function manageScrollbarsAutoHide(r, a) {
      E();
      if (r) {
        R(se);
      } else {
        var e = cr(R, se, true);
        if (s > 0 && !a) {
          C(e);
        } else {
          e();
        }
      }
    };
    var M = function manageScrollbarsAutoHideInstantInteraction() {
      if (u ? !i : !c) {
        k(true);
        b((function() {
          k(false);
        }));
      }
    };
    var V = function manageAutoHideSuspension(r) {
      R(fe, r, true);
      R(fe, r, false);
    };
    var F = function onHostMouseEnter(r) {
      if (d(r)) {
        i = u;
        u && k(true);
      }
    };
    var N = [ E, m, y, h, function() {
      return f();
    }, sa(H, "pointerover", F, {
      P: true
    }), sa(H, "pointerenter", F), sa(H, "pointerleave", (function(r) {
      if (d(r)) {
        i = false;
        u && k(false);
      }
    })), sa(H, "pointermove", (function(r) {
      d(r) && o && M();
    })), sa(P, "scroll", (function(r) {
      _((function() {
        I();
        M();
      }));
      v(r);
      L();
    })) ];
    return [ function() {
      return cr(Y, j(N, T()));
    }, function(r) {
      var a = r.Dr, n = r.zr, v = r.Qr, i = r.ra;
      var d = i || {}, p = d.aa, _ = d.ea, h = d.ta;
      var g = v || {}, b = g.Er, m = g._r;
      var S = e.U;
      var y = Fe(), O = y.R;
      var C = t.L, E = t.na;
      var x = a("showNativeOverlaidScrollbars"), A = x[0], T = x[1];
      var H = a("scrollbars.theme"), M = H[0], j = H[1];
      var F = a("scrollbars.visibility"), N = F[0], B = F[1];
      var U = a("scrollbars.autoHide"), Y = U[0], W = U[1];
      var q = a("scrollbars.autoHideSuspend"), X = q[0], K = q[1];
      var Z = a("scrollbars.autoHideDelay"), G = Z[0];
      var $ = a("scrollbars.dragScroll"), J = $[0], Q = $[1];
      var rr = a("scrollbars.clickScroll"), ar = rr[0], er = rr[1];
      var tr = a("overflow"), nr = tr[0], vr = tr[1];
      var ir = m && !n;
      var or = E.x || E.y;
      var ur = p || _ || b || n;
      var lr = h || B || vr;
      var fr = A && O.x && O.y;
      var sr = function setScrollbarVisibility(r, a, e) {
        var t = r.includes("scroll") && (N === "visible" || N === "auto" && a === "scroll");
        R(oe, t, e);
        return t;
      };
      s = G;
      if (ir) {
        if (X && or) {
          V(false);
          f();
          w((function() {
            f = sa(P, "scroll", cr(V, true), {
              P: true
            });
          }));
        } else {
          V(true);
        }
      }
      if (T) {
        R(re, fr);
      }
      if (j) {
        R(l);
        R(M, true);
        l = M;
      }
      if (K && !X) {
        V(true);
      }
      if (W) {
        o = Y === "move";
        u = Y === "leave";
        c = Y === "never";
        k(c, true);
      }
      if (Q) {
        R(_e, J);
      }
      if (er) {
        R(pe, ar);
      }
      if (lr) {
        var dr = sr(nr.x, C.x, true);
        var pr = sr(nr.y, C.y, false);
        var _r = dr && pr;
        R(ue, !_r);
      }
      if (ur) {
        z();
        I();
        L();
        R(le, !E.x, true);
        R(le, !E.y, false);
        R(ee, S && !D);
      }
    }, {}, A ];
  };
  var tt = function createStructureSetupElements(r) {
    var a = Fe();
    var e = a.rr, t = a.j;
    var n = e(), v = n.elements;
    var i = v.host, o = v.padding, u = v.viewport, c = v.content;
    var l = z(r);
    var f = l ? {} : r;
    var s = f.elements;
    var d = s || {}, p = d.host, _ = d.padding, h = d.viewport, g = d.content;
    var b = l ? r : f.target;
    var m = Ir(b);
    var S = zr(b, "textarea");
    var w = b.ownerDocument;
    var y = w.documentElement;
    var O = w.defaultView;
    var C = function focusElm(r) {
      if (r && r.focus) {
        r.focus();
      }
    };
    var E = cr(Be, [ b ]);
    var x = cr(Ue, [ b ]);
    var A = cr(Yr, "");
    var T = cr(E, A, u);
    var H = cr(x, A, c);
    var P = T(h);
    var D = P === b;
    var R = D && m;
    var I = !D && H(g);
    var L = !D && P === I;
    var k = R ? y : P;
    var V = S ? E(A, i, p) : b;
    var F = R ? k : V;
    var N = !D && x(A, o, _);
    var B = !L && I;
    var U = [ B, k, N, F ].map((function(r) {
      return z(r) && !kr(r) && r;
    }));
    var W = function elementIsGenerated(r) {
      return r && M(U, r);
    };
    var q = W(k) ? b : k;
    var X = {
      br: b,
      mr: F,
      I: k,
      va: N,
      Sr: B,
      Lr: R ? y : k,
      Jr: R ? w : k,
      ia: m ? y : q,
      oa: O,
      $r: w,
      wr: S,
      kr: m,
      Ir: l,
      V: D,
      yr: function _viewportHasClass(r) {
        return Ar(k, D ? za : Fa, r);
      },
      Or: function _viewportAddRemoveClass(r, a) {
        return xr(k, D ? za : Fa, r, a);
      }
    };
    var K = X.br, Z = X.mr, G = X.va, $ = X.I, J = X.Sr;
    var Q = [ function() {
      yr(Z, [ za, Ra ]);
      yr(K, Ra);
      if (m) {
        yr(y, [ Ra, za ]);
      }
    } ];
    var rr = S && W(Z);
    var ar = S ? K : Lr([ J, $, G, Z, K ].find((function(r) {
      return r && !W(r);
    })));
    var er = R ? K : J || $;
    var tr = cr(Y, Q);
    var nr = function appendElements() {
      var r = Vr();
      var a = function unwrap(r) {
        Br(kr(r), Lr(r));
        Fr(r);
      };
      var e = function prepareWrapUnwrapFocus(r) {
        return r ? sa(r, "focusin focusout focus blur", (function(r) {
          da(r);
          r.stopImmediatePropagation();
        }), {
          H: true,
          T: false
        }) : ur;
      };
      var n = "tabindex";
      var v = mr($, n);
      var i = e(r);
      wr(Z, za, D ? "viewport" : "host");
      wr(G, Ya, "");
      wr(J, qa, "");
      if (!D) {
        wr($, Fa, "");
        wr($, n, v || "-1");
        m && Er(y, za, ja);
      }
      if (rr) {
        Ur(K, Z);
        j(Q, (function() {
          Ur(Z, K);
          Fr(Z);
        }));
      }
      Br(er, ar);
      Br(Z, G);
      Br(G || Z, !D && $);
      Br($, J);
      j(Q, [ i, function() {
        var r = Vr();
        var t = e(r);
        yr(G, Ya);
        yr(J, qa);
        yr($, [ Ia, La, Fa ]);
        v ? wr($, n, v) : yr($, n);
        W(J) && a(J);
        W($) && a($);
        W(G) && a(G);
        C(r);
        t();
      } ]);
      if (t && !D) {
        Er($, Fa, Ba);
        j(Q, cr(yr, $, Fa));
      }
      C(!D && O.top === O && r === b ? $ : r);
      i();
      ar = 0;
      return tr;
    };
    return [ X, nr, tr ];
  };
  var nt = function createTrinsicUpdateSegment(r) {
    var a = r.Sr;
    return function(r) {
      var e = r.Qr, t = r.ua, n = r.zr;
      var v = e || {}, i = v.Ar;
      var o = t.Cr;
      var u = a && (i || n);
      if (u) {
        var c;
        setStyles(a, (c = {}, c[ar] = o && "100%", c));
      }
    };
  };
  var vt = function createPaddingUpdateSegment(r, e) {
    var t = r.mr, n = r.va, v = r.I, i = r.V;
    var o = a({
      o: or,
      v: Qr()
    }, cr(Qr, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Dr, t = r.Qr, o = r.ua, l = r.zr;
      var f = c(l), s = f[0], d = f[1];
      var p = Fe(), _ = p.j;
      var h = t || {}, g = h.gr, b = h.Tr, m = h.Er;
      var S = o.U;
      var w = a("paddingAbsolute"), y = w[0], O = w[1];
      var C = l || b;
      if (g || d || C) {
        var E = u(l);
        s = E[0];
        d = E[1];
      }
      var x = !i && (O || m || d);
      if (x) {
        var A, T;
        var H = !y || !n && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var R = (A = {}, A[G] = H && !S ? -P : 0, A[$] = H ? -D : 0, A[Z] = H && S ? -P : 0, 
        A.top = H ? -s.t : 0, A.right = H ? S ? -s.r : "auto" : 0, A.left = H ? S ? "auto" : -s.l : 0, 
        A[rr] = H && "calc(100% + " + P + "px)", A);
        var z = (T = {}, T[W] = H ? s.t : 0, T[q] = H ? s.r : 0, T[K] = H ? s.b : 0, T[X] = H ? s.l : 0, 
        T);
        setStyles(n || v, R);
        setStyles(v, z);
        pr(e, {
          va: s,
          ca: !H,
          Y: n ? z : pr({}, R, z)
        });
      }
      return {
        la: x
      };
    };
  };
  var it = function createOverflowUpdateSegment(r, e) {
    var v = Fe();
    var i = r.mr, o = r.va, u = r.I, c = r.V, l = r.Or, f = r.kr, s = r.oa;
    var d = v.j;
    var p = f && c;
    var _ = cr(n, 0);
    var h = {
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    };
    var g = {
      o: ir,
      v: {
        x: er,
        y: er
      }
    };
    var b = function getOverflowAmount(r, a) {
      var e = t.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: _(r.w - a.w),
        h: _(r.h - a.h)
      };
      return {
        w: n.w > e ? n.w : 0,
        h: n.h > e ? n.h : 0
      };
    };
    var m = a(h, cr(oa, u)), S = m[0], w = m[1];
    var y = a(h, cr(ia, u)), O = y[0], C = y[1];
    var E = a(h), x = E[0], A = E[1];
    var T = a(h), H = T[0], P = T[1];
    var D = a(g), R = D[0];
    var z = Se(Ie);
    return function(a, t) {
      var f = a.Dr, h = a.Qr, g = a.ua, m = a.zr;
      var y = t.la;
      var E = h || {}, T = E.gr, D = E.Tr, I = E.Er, L = E.Pr;
      var k = z && z.M(r, e, g, v, f);
      var M = k || {}, V = M.q, j = M.X, F = M.K;
      var N = Pe(f, v), B = N[0], U = N[1];
      var Y = f("overflow"), W = Y[0], q = Y[1];
      var X = T || y || D || I || L || U;
      var K = De(W.x);
      var Z = De(W.y);
      var G = K || Z;
      var $ = w(m);
      var rr = C(m);
      var ar = A(m);
      var er = P(m);
      var tr;
      if (U && d) {
        l(Ba, !B);
      }
      if (X) {
        if (G) {
          l(Ua, false);
        }
        var nr = j ? j(tr) : [], vr = nr[0], ir = nr[1];
        var or = $ = S(m), ur = or[0], cr = or[1];
        var lr = rr = O(m), fr = lr[0], sr = lr[1];
        var dr = va(u);
        var _r = fr;
        var hr = dr;
        vr && vr();
        if ((sr || cr || U) && ir && !B && V && V(ir, fr, ur)) {}
        var gr = ta(s);
        var br = {
          w: _(n(fr.w, _r.w) + ur.w),
          h: _(n(fr.h, _r.h) + ur.h)
        };
        var mr = {
          w: _((p ? gr.w : hr.w + _(dr.w - fr.w)) + ur.w),
          h: _((p ? gr.h : hr.h + _(dr.h - fr.h)) + ur.h)
        };
        er = H(mr);
        ar = x(b(br, mr), m);
      }
      var Sr = er, yr = Sr[0], Or = Sr[1];
      var Cr = ar, Er = Cr[0], Ar = Cr[1];
      var Tr = rr, Hr = Tr[0], Pr = Tr[1];
      var Dr = $, Rr = Dr[0], zr = Dr[1];
      var Ir = {
        x: Er.w > 0,
        y: Er.h > 0
      };
      var Lr = K && Z && (Ir.x || Ir.y) || K && Ir.x && !Ir.y || Z && Ir.y && !Ir.x;
      var kr = y || I || L || zr || Pr || Or || Ar || q || U || X;
      if (kr) {
        var Mr = {};
        var Vr = ze(r, Ir, W, Mr);
        F && F(Vr, g, !!V && V(Vr, Hr, Rr), Mr);
        if (c) {
          wr(i, Ia, Mr[J]);
          wr(i, La, Mr[Q]);
        } else {
          setStyles(u, Mr);
        }
      }
      xr(i, za, ka, Lr);
      xr(o, Ya, Wa, Lr);
      if (!c) {
        xr(u, Fa, Ua, G);
      }
      var jr = R(Re(r).L), Fr = jr[0], Nr = jr[1];
      pr(e, {
        L: Fr,
        Fr: {
          x: yr.w,
          y: yr.h
        },
        jr: {
          x: Er.w,
          y: Er.h
        },
        na: Ir
      });
      return {
        ta: Nr,
        aa: Or,
        ea: Ar
      };
    };
  };
  var ot = function createStructureSetup(r) {
    var a;
    var e = tt(r), t = e[0], n = e[1], v = e[2];
    var i = {
      va: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      ca: false,
      Y: (a = {}, a[G] = 0, a[$] = 0, a[Z] = 0, a[W] = 0, a[q] = 0, a[K] = 0, a[X] = 0, 
      a),
      Fr: {
        x: 0,
        y: 0
      },
      jr: {
        x: 0,
        y: 0
      },
      L: {
        x: er,
        y: er
      },
      na: {
        x: false,
        y: false
      }
    };
    var o = t.br, u = t.I, c = t.V;
    var l = Fe(), f = l.j, s = l.R;
    var d = !f && (s.x || s.y);
    var p = [ nt(t), vt(t, i), it(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = d;
      var t = e && wa(u);
      var n = c ? Er(u, za, Va) : ur;
      each(p, (function(e) {
        pr(a, e(r, a) || {});
      }));
      n();
      Sa(u, t);
      !c && Sa(o, 0);
      return a;
    }, i, t, v ];
  };
  var ut = function createSetups(r, a, e, t) {
    var n = Ta(a, {});
    var v = ot(r), i = v[0], o = v[1], u = v[2], c = v[3], l = v[4];
    var f = Qe(c, u, n, (function(r) {
      S({}, r);
    })), s = f[0], d = f[1], p = f[2];
    var _ = et(r, a, p, u, c, t), h = _[0], g = _[1], b = _[3];
    var m = function updateHintsAreTruthy(r) {
      return dr(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, t) {
      var n = r.fa, v = r.zr, i = r.Rr, u = r.sa;
      var c = n || {};
      var l = !!v;
      var f = {
        Dr: Ta(a, c, l),
        fa: c,
        zr: l
      };
      if (u) {
        g(f);
        return false;
      }
      var s = t || d(pr({}, f, {
        Rr: i
      }));
      var _ = o(pr({}, f, {
        ua: p,
        Qr: s
      }));
      g(pr({}, f, {
        Qr: s,
        ra: _
      }));
      var h = m(s);
      var b = m(_);
      var S = h || b || !hr(c) || l;
      S && e(r, {
        Qr: s,
        ra: _
      });
      return S;
    };
    return [ function() {
      var r = c.ia, a = c.I;
      var e = wa(r);
      var t = [ s(), i(), h() ];
      Sa(a, e);
      return cr(Y, t);
    }, S, function() {
      return {
        da: p,
        pa: u
      };
    }, {
      _a: c,
      ha: b
    }, l ];
  };
  var ct = function OverlayScrollbars(r, a, e) {
    var t = Fe(), n = t.er;
    var v = z(r);
    var i = v ? r : r.target;
    var o = Ke(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var l = {};
      var f = function validateOptions(r) {
        var a = _r(r, true);
        var e = Se(Ae);
        return e ? e(a, true) : a;
      };
      var s = pr({}, n(), f(a));
      var d = Oa(), p = d[0], _ = d[1], h = d[2];
      var g = Oa(e), b = g[0], m = g[1], S = g[2];
      var w = function triggerEvent(r, a) {
        S(r, a);
        h(r, a);
      };
      var y = ut(r, s, (function(r, a) {
        var e = r.fa, t = r.zr;
        var n = a.Qr, v = a.ra;
        var i = n.gr, o = n.Er, u = n.Ar, c = n.Tr, l = n.Hr, f = n._r;
        var s = v.aa, d = v.ea, p = v.ta;
        w("updated", [ H, {
          updateHints: {
            sizeChanged: !!i,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            contentMutation: !!c,
            hostMutation: !!l,
            appear: !!f
          },
          changedOptions: e || {},
          force: !!t
        } ]);
      }), (function(r) {
        return w("scroll", [ H, r ]);
      })), O = y[0], C = y[1], E = y[2], x = y[3], A = y[4];
      var T = function destroy(r) {
        Xe(i);
        Y(c);
        u = true;
        w("destroyed", [ H, r ]);
        _();
        m();
      };
      var H = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Aa(s, pr(e, f(r)));
            if (!hr(t)) {
              pr(s, t);
              C({
                fa: t
              });
            }
          }
          return pr({}, s);
        },
        on: b,
        off: function off(r, a) {
          r && a && m(r, a);
        },
        state: function state() {
          var r = E(), a = r.da, e = r.pa;
          var t = a.U;
          var n = e.Fr, v = e.jr, i = e.L, o = e.na, c = e.va, l = e.ca;
          return pr({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: c,
            paddingAbsolute: l,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = x._a, a = r.br, e = r.mr, t = r.va, n = r.I, v = r.Sr, i = r.Lr, o = r.Jr;
          var u = x.ha, c = u.qr, l = u.Gr;
          var f = function translateScrollbarStructure(r) {
            var a = r.Vr, e = r.Mr, t = r.Nr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Xr, e = r.Kr;
            var t = f(a[0]);
            return pr({}, t, {
              clone: function clone() {
                var r = f(e());
                C({
                  sa: true
                });
                return r;
              }
            });
          };
          return pr({}, {
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
            zr: r,
            Rr: true
          });
        },
        destroy: cr(T, false),
        plugin: function plugin(r) {
          return l[dr(r)[0]];
        }
      };
      j(c, [ A ]);
      qe(i, H);
      me(he, OverlayScrollbars, [ H, p, l ]);
      if (Ye(x._a.kr, !v && r.cancel)) {
        T(true);
        return H;
      }
      j(c, O());
      w("initialized", [ H ]);
      H.update(true);
      return H;
    }
    return o;
  };
  ct.plugin = function(r) {
    var a = H(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return me(r, ct)[0];
    }));
    be(e);
    return a ? t : t[0];
  };
  ct.valid = function(r) {
    var a = r && r.elements;
    var e = T(a) && a();
    return R(e) && !!Ke(e.target);
  };
  ct.env = function() {
    var r = Fe(), a = r.F, e = r.R, t = r.j, n = r.$, v = r.G, i = r.nr, o = r.vr, u = r.rr, c = r.ar, l = r.er, f = r.tr;
    return pr({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: t,
      rtlScrollBehavior: n,
      scrollTimeline: v,
      staticDefaultInitialization: i,
      staticDefaultOptions: o,
      getDefaultInitialization: u,
      setDefaultInitialization: c,
      getDefaultOptions: l,
      setDefaultOptions: f
    });
  };
  r.ClickScrollPlugin = Me;
  r.OverlayScrollbars = ct;
  r.ScrollbarsHidingPlugin = Le;
  r.SizeObserverPlugin = He;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
