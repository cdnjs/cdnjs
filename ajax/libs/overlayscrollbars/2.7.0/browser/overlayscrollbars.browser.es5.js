/*!
 * OverlayScrollbars
 * Version: 2.7.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var a = function createCache(r, a) {
    var e = r.v, n = r.o, t = r.u;
    var v = e;
    var i;
    var o = function cacheUpdateContextual(r, a) {
      var e = v;
      var o = r;
      var u = a || (n ? !n(e, o) : e !== o);
      if (u || t) {
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
  var n = e ? window : {};
  var t = Math.max;
  var v = Math.min;
  var i = Math.round;
  var o = Math.abs;
  var u = n.cancelAnimationFrame;
  var c = n.requestAnimationFrame;
  var f = n.setTimeout;
  var l = n.clearTimeout;
  var s = function getApi(r) {
    return typeof n[r] !== "undefined" ? n[r] : void 0;
  };
  var d = s("MutationObserver");
  var p = s("IntersectionObserver");
  var _ = s("ResizeObserver");
  var h = s("ScrollTimeline");
  var g = e && Node.ELEMENT_NODE;
  var b = Object.prototype, m = b.toString, S = b.hasOwnProperty;
  var y = /^\[object (.+)\]$/;
  var w = function isUndefined(r) {
    return r === void 0;
  };
  var O = function isNull(r) {
    return r === null;
  };
  var C = function type(r) {
    return w(r) || O(r) ? "" + r : m.call(r).replace(y, "$1").toLowerCase();
  };
  var E = function isNumber(r) {
    return typeof r === "number";
  };
  var T = function isString(r) {
    return typeof r === "string";
  };
  var A = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var H = function isFunction(r) {
    return typeof r === "function";
  };
  var x = function isArray(r) {
    return Array.isArray(r);
  };
  var P = function isObject(r) {
    return typeof r === "object" && !x(r) && !O(r);
  };
  var D = function isArrayLike(r) {
    var a = !!r && r.length;
    var e = E(a) && a > -1 && a % 1 == 0;
    return x(r) || !H(r) && e ? a > 0 && P(r) ? a - 1 in r : true : false;
  };
  var R = function isPlainObject(r) {
    if (!r || !P(r) || C(r) !== "object") {
      return false;
    }
    var a;
    var e = "constructor";
    var n = r[e];
    var t = n && n.prototype;
    var v = S.call(r, e);
    var i = t && S.call(t, "isPrototypeOf");
    if (n && !v && !i) {
      return false;
    }
    for (a in r) {}
    return w(a) || S.call(r, a);
  };
  var I = function isHTMLElement(r) {
    var a = HTMLElement;
    return r ? a ? r instanceof a : r.nodeType === g : false;
  };
  var z = function isElement(r) {
    var a = Element;
    return r ? a ? r instanceof a : r.nodeType === g : false;
  };
  var L = function animationCurrentTime() {
    return performance.now();
  };
  var k = function animateNumber(r, a, e, n, v) {
    var i = 0;
    var o = L();
    var f = t(0, e);
    var l = function frame(e) {
      var u = L();
      var l = u - o;
      var s = l >= f;
      var d = e ? 1 : 1 - (t(0, o + f - u) / f || 0);
      var p = (a - r) * (H(v) ? v(d, d * f, 0, 1, f) : d) + r;
      var _ = s || d === 1;
      n && n(p, d, _);
      i = _ ? 0 : c((function() {
        return frame();
      }));
    };
    l();
    return function(r) {
      u(i);
      r && l(r);
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
    !e && !T(a) && D(a) ? Array.prototype.push.apply(r, a) : r.push(a);
    return r;
  };
  var F = function from(r) {
    return Array.from(r || []);
  };
  var N = function createOrKeepArray(r) {
    return x(r) ? r : [ r ];
  };
  var B = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var U = function deduplicateArray(r) {
    return F(new Set(r));
  };
  var Y = function runEachAndClear(r, a, e) {
    var n = function runFn(r) {
      return r && r.apply(void 0, a || []);
    };
    each(r, n);
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
  var nr = "visible";
  var tr = function equal(r, a, e, n) {
    if (r && a) {
      var t = true;
      each(e, (function(e) {
        var v = n ? n(r[e]) : r[e];
        var i = n ? n(a[e]) : a[e];
        if (v !== i) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var vr = function equalWH(r, a) {
    return tr(r, a, [ "w", "h" ]);
  };
  var ir = function equalXY(r, a) {
    return tr(r, a, [ "x", "y" ]);
  };
  var or = function equalTRBL(r, a) {
    return tr(r, a, [ "t", "r", "b", "l" ]);
  };
  var ur = function noop() {};
  var cr = function bind(r) {
    for (var a = arguments.length, e = new Array(a > 1 ? a - 1 : 0), n = 1; n < a; n++) {
      e[n - 1] = arguments[n];
    }
    return r.bind.apply(r, [ 0 ].concat(e));
  };
  var fr = function selfClearTimeout(r) {
    var a;
    var e = r ? f : c;
    var n = r ? l : u;
    return [ function(t) {
      n(a);
      a = e(t, H(r) ? r() : r);
    }, function() {
      return n(a);
    } ];
  };
  var lr = function debounce(r, a) {
    var e;
    var n;
    var t;
    var v = ur;
    var i = a || {}, o = i.p, s = i._, d = i.m;
    var p = function invokeFunctionToDebounce(a) {
      v();
      l(e);
      e = n = void 0;
      v = ur;
      r.apply(this, a);
    };
    var _ = function mergeParms(r) {
      return d && n ? d(n, r) : r;
    };
    var h = function flush() {
      if (v !== ur) {
        p(_(t) || t);
      }
    };
    var g = function debouncedFn() {
      var r = F(arguments);
      var a = H(o) ? o() : o;
      var i = E(a) && a >= 0;
      if (i) {
        var d = H(s) ? s() : s;
        var g = E(d) && d >= 0;
        var b = a > 0 ? f : c;
        var m = a > 0 ? l : u;
        var S = _(r);
        var y = S || r;
        var w = p.bind(0, y);
        v();
        var O = b(w, a);
        v = function clear() {
          return m(O);
        };
        if (g && !e) {
          e = f(h, d);
        }
        n = t = y;
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
  var pr = function assignDeep(r, a, e, n, t, v, i) {
    var o = [ a, e, n, t, v, i ];
    if ((typeof r !== "object" || O(r)) && !H(r)) {
      r = {};
    }
    each(o, (function(a) {
      each(a, (function(e, n) {
        var t = a[n];
        if (r === t) {
          return true;
        }
        var v = x(t);
        if (t && R(t)) {
          var i = r[n];
          var o = i;
          if (v && !x(i)) {
            o = [];
          } else if (!v && !R(i)) {
            o = {};
          }
          r[n] = assignDeep(o, t);
        } else {
          r[n] = v ? t.slice() : t;
        }
      }));
    }));
    return r;
  };
  var _r = function removeUndefinedProperties(r, a) {
    return each(pr({}, r), (function(r, e, n) {
      if (r === void 0) {
        delete n[e];
      } else if (a && r && R(r)) {
        n[e] = removeUndefinedProperties(r, a);
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
    return t(r, v(a, e));
  };
  var br = function getDomTokensArray(r) {
    return F(new Set((x(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    }))));
  };
  var mr = function getAttr(r, a) {
    return r && r.getAttribute(a);
  };
  var Sr = function setAttrs(r, a, e) {
    each(br(a), (function(a) {
      r && r.setAttribute(a, e || "");
    }));
  };
  var yr = function removeAttrs(r, a) {
    each(br(a), (function(a) {
      return r && r.removeAttribute(a);
    }));
  };
  var wr = function domTokenListAttr(r, a) {
    var e = br(mr(r, a));
    var n = cr(Sr, r, a);
    var t = function domTokenListOperation(r, a) {
      var n = new Set(e);
      each(br(r), (function(r) {
        return n[a](r);
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
      T: function _has(r) {
        var a = br(r);
        return a.reduce((function(r, a) {
          return r && e.includes(a);
        }), a.length > 0);
      }
    };
  };
  var Or = function removeAttrClass(r, a, e) {
    wr(r, a).O(e);
  };
  var Cr = function addAttrClass(r, a, e) {
    wr(r, a).C(e);
    return cr(Or, r, a, e);
  };
  var Er = function addRemoveAttrClass(r, a, e, n) {
    (n ? Cr : Or)(r, a, e);
  };
  var Tr = function hasAttrClass(r, a, e) {
    return wr(r, a).T(e);
  };
  var Ar = function createDomTokenListClass(r) {
    return wr(r, "class");
  };
  var Hr = function removeClass(r, a) {
    Ar(r).O(a);
  };
  var xr = function addClass(r, a) {
    Ar(r).C(a);
    return cr(Hr, r, a);
  };
  var Pr = function find(r, a) {
    var e = [];
    var n = a ? z(a) && a : document;
    return n ? j(e, n.querySelectorAll(r)) : e;
  };
  var Dr = function findFirst(r, a) {
    var e = a ? z(a) && a : document;
    return e ? e.querySelector(r) : null;
  };
  var Rr = function is(r, a) {
    if (z(r)) {
      return r.matches(a);
    }
    return false;
  };
  var Ir = function isBodyElement(r) {
    return Rr(r, "body");
  };
  var zr = function contents(r) {
    return r ? F(r.childNodes) : [];
  };
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var kr = function closest(r, a) {
    return z(r) && r.closest(a);
  };
  var Mr = function liesBetween(r, a, e) {
    var n = kr(r, a);
    var t = r && Dr(e, n);
    var v = kr(t, a) === n;
    return n && t ? n === r || t === r || v && kr(kr(r, e), a) !== n : false;
  };
  var Vr = function removeElements(r) {
    if (D(r)) {
      each(F(r), (function(r) {
        return removeElements(r);
      }));
    } else if (r) {
      var a = Lr(r);
      a && a.removeChild(r);
    }
  };
  var jr = function before(r, a, e) {
    if (e && r) {
      var n = a;
      var t;
      if (D(e)) {
        t = document.createDocumentFragment();
        each(e, (function(r) {
          if (r === n) {
            n = r.previousSibling;
          }
          t.appendChild(r);
        }));
      } else {
        t = e;
      }
      if (a) {
        if (!n) {
          n = r.firstChild;
        } else if (n !== a) {
          n = n.nextSibling;
        }
      }
      r.insertBefore(t, n || null);
      return function() {
        return Vr(e);
      };
    }
    return ur;
  };
  var Fr = function appendChildren(r, a) {
    return jr(r, null, a);
  };
  var Nr = function insertAfter(r, a) {
    return jr(Lr(r), r && r.nextSibling, a);
  };
  var Br = function createDiv(r) {
    var a = document.createElement("div");
    Sr(a, "class", r);
    return a;
  };
  var Ur = function createDOM(r) {
    var a = Br();
    a.innerHTML = r.trim();
    return each(zr(a), (function(r) {
      return Vr(r);
    }));
  };
  var Yr = /^--/;
  var Wr = function getCSSVal(r, a) {
    return r.getPropertyValue(a) || r[a] || "";
  };
  var qr = function validFiniteNumber(r) {
    var a = r || 0;
    return isFinite(a) ? a : 0;
  };
  var Xr = function parseToZeroOrNumber(r) {
    return qr(parseFloat(r || ""));
  };
  var Kr = function ratioToCssPercent(r) {
    return (qr(r) * 100).toFixed(3) + "%";
  };
  var Zr = function numberToCssPx(r) {
    return qr(r) + "px";
  };
  function setStyles(r, a) {
    r && each(a, (function(a, e) {
      try {
        var n = r.style;
        var t = E(a) ? Zr(a) : (a || "") + "";
        if (Yr.test(e)) {
          n.setProperty(e, t);
        } else {
          n[e] = t;
        }
      } catch (v) {}
    }));
  }
  function getStyles(r, a, e) {
    var t = T(a);
    var v = t ? "" : {};
    if (r) {
      var i = n.getComputedStyle(r, e) || r.style;
      v = t ? Wr(i, a) : a.reduce((function(r, a) {
        r[a] = Wr(i, a);
        return r;
      }), v);
    }
    return v;
  }
  var Gr = function getDirectionIsRTL(r) {
    return getStyles(r, "direction") === "rtl";
  };
  var $r = function topRightBottomLeft(r, a, e) {
    var n = a ? a + "-" : "";
    var t = e ? "-" + e : "";
    var v = n + "top" + t;
    var i = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var c = getStyles(r, [ v, i, o, u ]);
    return {
      t: Xr(c[v]),
      r: Xr(c[i]),
      b: Xr(c[o]),
      l: Xr(c[u])
    };
  };
  var Jr = function getTrasformTranslateValue(r, a) {
    return "translate" + (P(r) ? "(" + r.x + "," + r.y + ")" : (a ? "X" : "Y") + "(" + r + ")");
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
  var aa = function windowSize(r) {
    return ra("inner", r || n);
  };
  var ea = cr(ra, "offset");
  var na = cr(ra, "client");
  var ta = cr(ra, "scroll");
  var va = function fractionalSize(r) {
    var a = parseFloat(getStyles(r, rr)) || 0;
    var e = parseFloat(getStyles(r, ar)) || 0;
    return {
      w: a - i(a),
      h: e - i(e)
    };
  };
  var ia = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var oa = function domRectHasDimensions(r) {
    return !!(r && (r[ar] || r[rr]));
  };
  var ua = function domRectAppeared(r, a) {
    var e = oa(r);
    var n = oa(a);
    return !n && e;
  };
  var ca = function removeEventListener(r, a, e, n) {
    each(br(a), (function(a) {
      r.removeEventListener(a, e, n);
    }));
  };
  var fa = function addEventListener(r, a, e, n) {
    var t;
    var v = (t = n && n.A) != null ? t : true;
    var i = n && n.H || false;
    var o = n && n.P || false;
    var u = {
      passive: v,
      capture: i
    };
    return cr(Y, br(a).map((function(a) {
      var n = o ? function(t) {
        ca(r, a, n, i);
        e(t);
      } : e;
      r.addEventListener(a, n, u);
      return cr(ca, r, a, n, i);
    })));
  };
  var la = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var sa = function preventDefault(r) {
    return r.preventDefault();
  };
  var da = {
    x: 0,
    y: 0
  };
  var pa = function absoluteCoordinates(r) {
    var a = r && ia(r);
    return a ? {
      x: a.left + n.scrollX,
      y: a.top + n.scrollY
    } : da;
  };
  var _a = function convertScrollPosition(r, a, e) {
    return e ? e.n ? -r + 0 : e.i ? a - r : r : r;
  };
  var ha = function getRawScrollBounds(r, a) {
    return [ _a(0, r, a), _a(r, r, a) ];
  };
  var ga = function getRawScrollRatio(r, a, e) {
    return gr(0, 1, _a(r, a, e) / a || 0);
  };
  var ba = function scrollElementTo(r, a) {
    var e = E(a) ? {
      x: a,
      y: a
    } : a || {}, n = e.x, t = e.y;
    E(n) && (r.scrollLeft = n);
    E(t) && (r.scrollTop = t);
  };
  var ma = function getElmentScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Sa = function manageListener(r, a) {
    each(N(a), r);
  };
  var ya = function createEventListenerHub(r) {
    var a = new Map;
    var e = function removeEvent(r, e) {
      if (r) {
        var n = a.get(r);
        Sa((function(r) {
          if (n) {
            n[r ? "delete" : "clear"](r);
          }
        }), e);
      } else {
        a.forEach((function(r) {
          r.clear();
        }));
        a.clear();
      }
    };
    var n = function addEvent(r, n) {
      if (T(r)) {
        var t = a.get(r) || new Set;
        a.set(r, t);
        Sa((function(r) {
          H(r) && t.add(r);
        }), n);
        return cr(e, r, n);
      }
      if (A(n) && n) {
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
    var t = function triggerEvent(r, e) {
      each(F(a.get(r)), (function(r) {
        if (e && !B(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, e, t ];
  };
  var wa = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (H(a)) {
        throw 0;
      }
      return a;
    }));
  };
  var Oa = function getPropByPath(r, a) {
    return r ? ("" + a).split(".").reduce((function(r, a) {
      return r && sr(r, a) ? r[a] : void 0;
    }), r) : void 0;
  };
  var Ca = {
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
  var Ea = function getOptionsDiff(r, a) {
    var e = {};
    var n = V(dr(a), dr(r));
    each(n, (function(n) {
      var t = r[n];
      var v = a[n];
      if (P(t) && P(v)) {
        pr(e[n] = {}, getOptionsDiff(t, v));
        if (hr(e[n])) {
          delete e[n];
        }
      } else if (sr(a, n) && v !== t) {
        var i = true;
        if (x(t) || x(v)) {
          try {
            if (wa(t) === wa(v)) {
              i = false;
            }
          } catch (o) {}
        }
        if (i) {
          e[n] = v;
        }
      }
    }));
    return e;
  };
  var Ta = function createOptionCheck(r, a, e) {
    return function(n) {
      return [ Oa(r, n), e || Oa(a, n) !== void 0 ];
    };
  };
  var Aa = "data-overlayscrollbars";
  var Ha = "os-environment";
  var xa = Ha + "-scrollbar-hidden";
  var Pa = Aa + "-initialize";
  var Da = Aa;
  var Ra = Da + "-overflow-x";
  var Ia = Da + "-overflow-y";
  var za = "overflowVisible";
  var La = "scrollbarPressed";
  var ka = "updating";
  var Ma = "body";
  var Va = Aa + "-viewport";
  var ja = "arrange";
  var Fa = "scrollbarHidden";
  var Na = za;
  var Ba = Aa + "-padding";
  var Ua = Na;
  var Ya = Aa + "-content";
  var Wa = "os-size-observer";
  var qa = Wa + "-appear";
  var Xa = Wa + "-listener";
  var Ka = Xa + "-scroll";
  var Za = Xa + "-item";
  var Ga = Za + "-final";
  var $a = "os-trinsic-observer";
  var Ja = "os-theme-none";
  var Qa = "os-scrollbar";
  var re = Qa + "-rtl";
  var ae = Qa + "-horizontal";
  var ee = Qa + "-vertical";
  var ne = Qa + "-track";
  var te = Qa + "-handle";
  var ve = Qa + "-visible";
  var ie = Qa + "-cornerless";
  var oe = Qa + "-interaction";
  var ue = Qa + "-unusable";
  var ce = Qa + "-auto-hide";
  var fe = ce + "-hidden";
  var le = Qa + "-wheel";
  var se = ne + "-interactive";
  var de = te + "-interactive";
  var pe = {};
  var _e = {};
  var he = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        pe[e] = r[e];
      }));
    }));
  };
  var ge = function registerPluginModuleInstances(r, a, e) {
    return dr(r).map((function(n) {
      var t = r[n], v = t.static, i = t.instance;
      var o = e || [], u = o[0], c = o[1], f = o[2];
      var l = e ? i : v;
      if (l) {
        var s = e ? l(u, c, a) : l(a);
        return (f || _e)[n] = s;
      }
    }));
  };
  var be = function getStaticPluginModuleInstance(r) {
    return _e[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.D && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var me = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var a = 1; a < arguments.length; a++) {
          var e = arguments[a];
          for (var n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              r[n] = e[n];
            }
          }
        }
        return r;
      }, r.exports.D = true, r.exports["default"] = r.exports;
      return _extends.apply(this, arguments);
    }
    r.exports = _extends, r.exports.D = true, r.exports["default"] = r.exports;
  })(me);
  var Se = me.exports;
  var ye = /*@__PURE__*/ getDefaultExportFromCjs(Se);
  var we = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Oe = function validateRecursive(r, a, e, n) {
    var t = {};
    var v = ye({}, a);
    var i = dr(r).filter((function(r) {
      return sr(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var u = r[i];
      var c = R(u);
      var f = n ? n + "." : "";
      if (c && R(o)) {
        var l = validateRecursive(u, o, e, f + i), s = l[0], d = l[1];
        t[i] = s;
        v[i] = d;
        each([ v, t ], (function(r) {
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
          each(we, (function(e, n) {
            if (e === r) {
              a = n;
            }
          }));
          var e = w(a);
          if (e && T(o)) {
            var n = r.split(" ");
            p = !!n.find((function(r) {
              return r === o;
            }));
            j(_, n);
          } else {
            p = we[g] === r;
          }
          j(h, e ? we.string : a);
          return !p;
        }));
        if (p) {
          t[i] = o;
        } else if (e) {
          console.warn('The option "' + f + i + "\" wasn't set, because it doesn't accept the type [ " + g.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + h.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ t, v ];
  };
  var Ce = function validateOptions(r, a, e) {
    return Oe(r, a, e);
  };
  var Ee = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Ee] = {
      static: function _static() {
        var r = we.number;
        var a = we.boolean;
        var e = [ we.array, we.null ];
        var n = "hidden scroll visible visible-hidden";
        var t = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ we.number, we.array, we.null ],
            ignoreMutation: [ we.function, we.null ]
          },
          overflow: {
            x: n,
            y: n
          },
          scrollbars: {
            theme: [ we.string, we.null ],
            visibility: t,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ we.array, we.null ]
          }
        };
        return function(r, a) {
          var e = Ce(i, r, a), n = e[0], t = e[1];
          return ye({}, t, n);
        };
      }
    }, r;
  })();
  var Te = "__osSizeObserverPlugin";
  var Ae = /* @__PURE__ */ function(r) {
    return r = {}, r[Te] = {
      static: function _static() {
        return function(r, a, e) {
          var n;
          var t = 3333333;
          var v = "scroll";
          var i = Ur('<div class="' + Za + '" dir="ltr"><div class="' + Za + '"><div class="' + Ga + '"></div></div><div class="' + Za + '"><div class="' + Ga + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var f = o.lastChild;
          var l = o.firstChild;
          var s = l == null ? void 0 : l.firstChild;
          var d = ea(o);
          var p = d;
          var _ = false;
          var h;
          var g = function reset() {
            ba(l, t);
            ba(f, t);
          };
          var b = function onResized(r) {
            h = 0;
            if (_) {
              d = p;
              a(r === true);
            }
          };
          var m = function onScroll(r) {
            p = ea(o);
            _ = !r || !vr(p, d);
            if (r) {
              la(r);
              if (_ && !h) {
                u(h);
                h = c(b);
              }
            } else {
              b(r === false);
            }
            g();
          };
          var S = [ Fr(r, i), fa(l, v, m), fa(f, v, m) ];
          xr(r, Ka);
          setStyles(s, (n = {}, n[rr] = t, n[ar] = t, n));
          c(g);
          return [ e ? cr(m, false) : g, S ];
        };
      }
    }, r;
  }();
  var He = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.R;
    var n = r("showNativeOverlaidScrollbars"), t = n[0], v = n[1];
    return [ t && e.x && e.y, v ];
  };
  var xe = function overflowIsVisible(r) {
    return r.indexOf(nr) === 0;
  };
  var Pe = function getViewportOverflowState(r, a) {
    var e = r.I;
    var n = function getStatePerAxis(r) {
      var n = getStyles(e, r);
      var t = a ? a[r] : n;
      var v = t === "scroll";
      return [ n, v ];
    };
    var t = n(J), v = t[0], i = t[1];
    var o = n(Q), u = o[0], c = o[1];
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
  var De = function setViewportOverflowState(r, a, e, n) {
    var t = a.x || a.y;
    var v = function setAxisOverflowStyle(r, a) {
      var e = xe(r);
      var n = e && t ? "hidden" : "";
      var v = a && e && r.replace(nr + "-", "") || n;
      return [ a && !e ? r : "", xe(v) ? "hidden" : v ];
    };
    var i = v(e.x, a.x), o = i[0], u = i[1];
    var c = v(e.y, a.y), f = c[0], l = c[1];
    n[J] = u && f ? u : o;
    n[Q] = l && o ? l : f;
    return Pe(r, n);
  };
  var Re = "__osScrollbarsHidingPlugin";
  var Ie = /* @__PURE__ */ function(r) {
    return r = {}, r[Re] = {
      static: function _static() {
        return {
          M: function _viewportArrangement(r, a, e, n, t) {
            var v = r.V, i = r.I;
            var o = n.j, u = n.R, c = n.F;
            var f = !v && !o && (u.x || u.y);
            var l = He(t, n), s = l[0];
            var d = function _getViewportOverflowHideOffset(r) {
              var a = r.k;
              var e = o || s ? 0 : 42;
              var n = function getHideOffsetPerAxis(r, a, n) {
                var t = r ? e : n;
                var v = a && !o ? t : 0;
                var i = r && !!e;
                return [ v, i ];
              };
              var t = n(u.x, a.x, c.x), v = t[0], i = t[1];
              var f = n(u.y, a.y, c.y), l = f[0], d = f[1];
              return {
                N: {
                  x: v,
                  y: l
                },
                B: {
                  x: i,
                  y: d
                }
              };
            };
            var p = function _hideNativeScrollbars(r, e, n, t) {
              var i;
              var o = e.U;
              pr(t, (i = {}, i[G] = 0, i[$] = 0, i[Z] = 0, i));
              if (!v) {
                var u = d(r), c = u.N, f = u.B;
                var l = f.x, s = f.y;
                var p = c.x, _ = c.y;
                var h = a.Y;
                var g = o ? Z : G;
                var b = o ? X : q;
                var m = h[g];
                var S = h[$];
                var y = h[b];
                var w = h[K];
                t[rr] = "calc(100% + " + (_ + m * -1) + "px)";
                t[g] = -_ + m;
                t[$] = -p + S;
                if (n) {
                  t[b] = y + (s ? _ : 0);
                  t[K] = w + (l ? p : 0);
                }
              }
            };
            var _ = function _arrangeViewport(r, n, t) {
              if (f) {
                var v = a.Y;
                var o = d(r), u = o.N, c = o.B;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var h = e.U;
                var g = h ? q : X;
                var b = v[g];
                var m = v.paddingTop;
                var S = n.w + t.w;
                var y = n.h + t.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: p && l ? p + y - m + "px" : ""
                };
                setStyles(i, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return f;
            };
            var h = function _undoViewportArrange(n) {
              if (f) {
                var t = n || Pe(r);
                var v = a.Y;
                var o = d(t), u = o.B;
                var c = u.x, l = u.y;
                var s = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    s[r] = v[r];
                  }));
                };
                if (c) {
                  _([ $, W, K ]);
                }
                if (l) {
                  _([ Z, G, X, q ]);
                }
                var h = getStyles(i, dr(s));
                Or(i, Va, ja);
                setStyles(i, s);
                return [ function() {
                  p(t, e, f, h);
                  setStyles(i, h);
                  Cr(i, Va, ja);
                }, t ];
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
              var r = n.screen;
              var a = r.deviceXDPI || 0;
              var e = r.logicalXDPI || 1;
              return n.devicePixelRatio || a / e;
            };
            var t = function diffBiggerThanOne(r, a) {
              var e = o(r);
              var n = o(a);
              return !(e === n || e + 1 === n || e - 1 === n);
            };
            return function(n, v) {
              var u = aa();
              var c = {
                w: u.w - r.w,
                h: u.h - r.h
              };
              if (c.w === 0 && c.h === 0) {
                return;
              }
              var f = {
                w: o(c.w),
                h: o(c.h)
              };
              var l = {
                w: o(i(u.w / (r.w / 100))),
                h: o(i(u.h / (r.h / 100)))
              };
              var s = e();
              var d = f.w > 2 && f.h > 2;
              var p = !t(l.w, l.h);
              var _ = s !== a && s > 0;
              var h = d && p && _;
              var g;
              var b;
              if (h) {
                var m = v();
                b = m[0];
                g = m[1];
                pr(n.F, b);
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
  var ze = "__osClickScrollPlugin";
  var Le = /* @__PURE__ */ function(r) {
    return r = {}, r[ze] = {
      static: function _static() {
        return function(r, a, e, n, t) {
          var v = 0;
          var i = ur;
          var o = function animateClickScroll(o) {
            i = k(o, o + n * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var l = c + n;
              var s = t >= c && t <= l;
              if (u && !s) {
                if (v) {
                  animateClickScroll(e);
                } else {
                  var d = f((function() {
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
  var ke;
  var Me = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, a, e, n) {
      Fr(r, a);
      var t = na(a);
      var v = ea(a);
      var i = va(e);
      n && Vr(a);
      return {
        x: v.h - t.h + i.h,
        y: v.w - t.w + i.w
      };
    };
    var e = function getNativeScrollbarsHiding(r) {
      var a = false;
      var e = xr(r, xa);
      try {
        a = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (n) {}
      e();
      return a;
    };
    var t = function getRtlScrollBehavior(r, a) {
      var e;
      setStyles(r, (e = {}, e[J] = er, e[Q] = er, e.direction = "rtl", e));
      ba(r, {
        x: 0
      });
      var n = pa(r);
      var t = pa(a);
      ba(r, {
        x: -999
      });
      var v = pa(a);
      return {
        i: n.x === t.x,
        n: t.x !== v.x
      };
    };
    var v = document, i = v.body;
    var o = Ur('<div class="' + Ha + '"><div></div></div>');
    var u = o[0];
    var c = u.firstChild;
    var f = ya(), l = f[0], s = f[2];
    var d = a({
      v: r(i, u, c),
      o: ir
    }, cr(r, i, u, c, true)), p = d[0], _ = d[1];
    var g = _(), b = g[0];
    var m = e(u);
    var S = {
      x: b.x === 0,
      y: b.y === 0
    };
    var y = {
      elements: {
        host: null,
        padding: !m,
        viewport: function viewport(r) {
          return m && Ir(r) && r;
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
    var w = pr({}, Ca);
    var O = cr(pr, {}, w);
    var C = cr(pr, {}, y);
    var E = {
      F: b,
      R: S,
      j: m,
      G: !!h,
      $: t(u, c),
      J: cr(l, "r"),
      rr: C,
      ar: function _setDefaultInitialization(r) {
        return pr(y, r) && C();
      },
      er: O,
      nr: function _setDefaultOptions(r) {
        return pr(w, r) && O();
      },
      tr: pr({}, y),
      vr: pr({}, w)
    };
    yr(u, "style");
    Vr(u);
    n.addEventListener("resize", (function() {
      var r;
      if (!m && (!S.x || !S.y)) {
        var a = be(Re);
        var e = a ? a.Z() : ur;
        r = !!e(E, p);
      }
      s("r", [ r ]);
    }));
    return E;
  };
  var Ve = function getEnvironment() {
    if (!ke) {
      ke = Me();
    }
    return ke;
  };
  var je = function resolveInitialization(r, a) {
    return H(a) ? a.apply(0, r) : a;
  };
  var Fe = function staticInitializationElement(r, a, e, n) {
    var t = w(n) ? e : n;
    var v = je(r, t);
    return v || a.apply(0, r);
  };
  var Ne = function dynamicInitializationElement(r, a, e, n) {
    var t = w(n) ? e : n;
    var v = je(r, t);
    return !!v && (I(v) ? v : a.apply(0, r));
  };
  var Be = function cancelInitialization(r, a) {
    var e = a || {}, n = e.nativeScrollbarsOverlaid, t = e.body;
    var v = Ve(), i = v.R, o = v.j, u = v.rr;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = n != null ? n : f;
    var d = w(t) ? l : t;
    var p = (i.x || i.y) && s;
    var _ = r && (O(d) ? !o : d);
    return !!p || !!_;
  };
  var Ue = new WeakMap;
  var Ye = function addInstance(r, a) {
    Ue.set(r, a);
  };
  var We = function removeInstance(r) {
    Ue.delete(r);
  };
  var qe = function getInstance(r) {
    return Ue.get(r);
  };
  var Xe = function createEventContentChange(r, a, e) {
    var n = false;
    var t = e ? new WeakMap : false;
    var v = function destroy() {
      n = true;
    };
    var i = function updateElements(v) {
      if (t && e) {
        var i = e.map((function(a) {
          var e = a || [], n = e[0], t = e[1];
          var i = t && n ? (v || Pr)(n, r) : [];
          return [ i, t ];
        }));
        each(i, (function(e) {
          return each(e[0], (function(v) {
            var i = e[1];
            var o = t.get(v) || [];
            var u = r.contains(v);
            if (u && i) {
              var c = fa(v, i, (function(r) {
                if (n) {
                  c();
                  t.delete(v);
                } else {
                  a(r);
                }
              }));
              t.set(v, j(o, c));
            } else {
              Y(o);
              t.delete(v);
            }
          }));
        }));
      }
    };
    i();
    return [ v, i ];
  };
  var Ke = function createDOMObserver(r, a, e, n) {
    var t = false;
    var v = n || {}, i = v.ir, o = v.ur, u = v.cr, c = v.lr, f = v.sr, l = v.dr;
    var s = lr((function() {
      return t && e(true);
    }), {
      p: 33,
      _: 99
    });
    var p = Xe(r, s, u), _ = p[0], h = p[1];
    var g = i || [];
    var b = o || [];
    var m = V(g, b);
    var S = function observerCallback(t, v) {
      if (!B(v)) {
        var i = f || ur;
        var o = l || ur;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var t = e.attributeName, v = e.target, f = e.type, l = e.oldValue, _ = e.addedNodes, h = e.removedNodes;
          var g = f === "attributes";
          var m = f === "childList";
          var S = r === v;
          var y = g && t;
          var w = y && mr(v, t || "") || null;
          var O = y && l !== w;
          var C = M(b, t) && O;
          if (a && (m || !S)) {
            var E = g && O;
            var T = E && c && Rr(v, c);
            var A = T ? !i(v, t, l, w) : !g || E;
            var H = A && !o(e, !!T, r, n);
            each(_, (function(r) {
              return j(u, r);
            }));
            each(h, (function(r) {
              return j(u, r);
            }));
            p = p || H;
          }
          if (!a && S && O && !i(v, t, l, w)) {
            j(s, t);
            d = d || C;
          }
        }));
        h((function(r) {
          return U(u).reduce((function(a, e) {
            j(a, Pr(r, e));
            return Rr(e, r) ? j(a, e) : a;
          }), []);
        }));
        if (a) {
          !t && p && e(false);
          return [ false ];
        }
        if (!B(s) || d) {
          var _ = [ U(s), d ];
          !t && e.apply(0, _);
          return _;
        }
      }
    };
    var y = new d(cr(S, false));
    return [ function() {
      y.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: m,
        subtree: a,
        childList: a,
        characterData: a
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
  var Ze = function createSizeObserver(r, e, n) {
    var t = 3333333;
    var v = n || {}, i = v.pr, o = v._r;
    var u = be(Te);
    var c = Ve(), f = c.$;
    var l = cr(Gr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var n = [];
      var v = Ur('<div class="' + Wa + '"><div class="' + Xa + '"></div></div>');
      var c = v[0];
      var s = c.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var n = !a && x(r);
        var v = false;
        var o = false;
        var u = true;
        if (a) {
          var l = d(r.contentRect), s = l[0], p = l[2];
          var _ = oa(s);
          var h = ua(s, p);
          var g = !p;
          o = g || h;
          v = !o && !_;
          u = !v;
        } else if (n) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var b = n ? r[0] : Gr(c);
          ba(c, {
            x: _a(t, t, b && f),
            y: t
          });
        }
        if (!v) {
          e({
            hr: n ? r : void 0,
            gr: !n,
            _r: o
          });
        }
      };
      if (_) {
        var h = new _((function(r) {
          return p(r.pop());
        }));
        h.observe(s);
        j(n, (function() {
          h.disconnect();
        }));
      } else if (u) {
        var g = u(s, p, o), b = g[0], m = g[1];
        j(n, V([ xr(c, qa), fa(c, "animationstart", b) ], m));
      } else {
        return ur;
      }
      if (i) {
        var S = a({
          v: void 0
        }, l), y = S[0];
        j(n, fa(c, "scroll", (function(r) {
          var a = y();
          var e = a[0], n = a[1], t = a[2];
          if (n) {
            Hr(s, "ltr rtl");
            xr(s, e ? "rtl" : "ltr");
            p([ !!e, n, t ]);
          }
          la(r);
        })));
      }
      return cr(Y, j(n, Fr(r, c)));
    };
  };
  var Ge = function createTrinsicObserver(r, e) {
    var n;
    var t = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Br($a);
    var i = a({
      v: false
    }), o = i[0];
    var u = function triggerOnTrinsicChangedCallback(r, a) {
      if (r) {
        var n = o(t(r));
        var v = n[1];
        return v && !a && e(n) && [ n ];
      }
    };
    var c = function intersectionObserverCallback(r, a) {
      return u(a.pop(), r);
    };
    return [ function() {
      var a = [];
      if (p) {
        n = new p(cr(c, false), {
          root: r
        });
        n.observe(v);
        j(a, (function() {
          n.disconnect();
        }));
      } else {
        var e = function onSizeChanged() {
          var r = ea(v);
          u(r);
        };
        j(a, Ze(v, e)());
        e();
      }
      return cr(Y, j(a, Fr(r, v)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var $e = function createObserversSetup(r, e, n, t) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var f;
    var l = Ve(), s = l.j;
    var d = "[" + Da + "]";
    var p = "[" + Va + "]";
    var h = [ "tabindex" ];
    var g = [ "wrap", "cols", "rows" ];
    var b = [ "id", "class", "style", "open" ];
    var m = r.br, S = r.mr, y = r.I, w = r.Sr, O = r.yr, C = r.V, A = r.wr, P = r.Or;
    var D = {
      Cr: false,
      U: Gr(m)
    };
    var R = Ve();
    var I = be(Re);
    var z = a({
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = I && I.M(r, e, D, R, n).X;
      var t = A(Na);
      var v = !C && A(ja);
      var i = v && ma(y);
      P(Na);
      C && P(ka, true);
      var o = v && a && a()[0];
      var u = ta(w);
      var c = ta(y);
      var f = va(y);
      P(Na, t);
      C && P(ka);
      o && o();
      ba(y, i);
      return {
        w: c.w + u.w + f.w,
        h: c.h + u.h + f.h
      };
    })), L = z[0];
    var k = O ? g : V(b, g);
    var j = lr(t, {
      p: function _timeout() {
        return v;
      },
      _: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var n = a[0];
        return [ V(dr(e), dr(n)).reduce((function(r, a) {
          r[a] = e[a] || n[a];
          return r;
        }), {}) ];
      }
    });
    var F = function setDirectionWhenViewportIsTarget(r) {
      if (C) {
        var a = Gr(m);
        pr(r, {
          Er: f !== a
        });
        pr(D, {
          U: a
        });
        f = a;
      }
    };
    var N = function updateViewportAttrsFromHost(r) {
      each(r || h, (function(r) {
        if (M(h, r)) {
          var a = mr(S, r);
          if (T(a)) {
            Sr(y, r, a);
          } else {
            yr(y, r);
          }
        }
      }));
    };
    var B = function onTrinsicChanged(r, a) {
      var e = r[0], n = r[1];
      var v = {
        Tr: n
      };
      pr(D, {
        Cr: e
      });
      !a && t(v);
      return v;
    };
    var U = function onSizeChanged(r) {
      var a = r.gr, e = r.hr, n = r._r;
      var v = a && !n && !e;
      var i = !v && s ? j : t;
      var o = e || [], u = o[0], c = o[1];
      var f = {
        gr: a || n,
        _r: n,
        Er: c
      };
      F(f);
      e && pr(D, {
        U: u
      });
      i(f);
    };
    var Y = function onContentMutation(r, a) {
      var e = L(), n = e[1];
      var v = {
        Ar: n
      };
      F(v);
      var i = r ? t : j;
      n && !a && i(v);
      return v;
    };
    var W = function onHostMutation(r, a, e) {
      var n = {
        Hr: a
      };
      F(n);
      if (a && !e) {
        j(n);
      } else if (!C) {
        N(r);
      }
      return n;
    };
    var q = R.J;
    var X = w ? Ge(S, B) : [], K = X[0], Z = X[1];
    var G = !C && Ze(S, U, {
      _r: true,
      pr: true
    });
    var $ = Ke(S, false, W, {
      ur: b,
      ir: V(b, h)
    }), J = $[0], Q = $[1];
    var rr = C && _ && new _((function(r) {
      var a = r[r.length - 1].contentRect;
      U({
        gr: true,
        _r: ua(a, c)
      });
      c = a;
    }));
    return [ function() {
      N();
      rr && rr.observe(S);
      var r = G && G();
      var a = K && K();
      var e = J();
      var n = q((function(r) {
        var a = L(), e = a[1];
        j({
          Pr: r,
          Ar: e
        });
      }));
      return function() {
        rr && rr.disconnect();
        r && r();
        a && a();
        u && u();
        e();
        n();
      };
    }, function(r) {
      var a = r.Dr, e = r.Rr, n = r.Ir;
      var t = {};
      var c = a("update.ignoreMutation"), f = c[0];
      var l = a("update.attributes"), s = l[0], _ = l[1];
      var h = a("update.elementEvents"), g = h[0], b = h[1];
      var m = a("update.debounce"), S = m[0], O = m[1];
      var T = b || _;
      var A = e || n;
      var P = function ignoreMutationFromOptions(r) {
        return H(f) && f(r);
      };
      if (T) {
        o && o();
        u && u();
        var D = Ke(w || y, true, Y, {
          ir: V(k, s || []),
          cr: g,
          lr: d,
          dr: function _ignoreContentChange(r, a) {
            var e = r.target, n = r.attributeName;
            var t = !a && n && !C ? Mr(e, d, p) : false;
            return t || !!kr(e, "." + Qa) || !!P(r);
          }
        }), R = D[0], I = D[1];
        u = R();
        o = I;
      }
      if (O) {
        j.S();
        if (x(S)) {
          var z = S[0];
          var L = S[1];
          v = E(z) && z;
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
        M && pr(t, W(M[0], M[1], A));
        N && pr(t, B(N[0], A));
        U && pr(t, Y(U[0], A));
      }
      F(t);
      return t;
    }, D ];
  };
  var Je = function createScrollbarsSetupElements(r, a, e, n) {
    var t = Ve(), v = t.rr, i = t.$;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var f = a.br, l = a.mr, s = a.I, d = a.zr, p = a.Lr, _ = a.kr, g = a.V;
    var b = d ? {} : r, m = b.scrollbars;
    var S = m || {}, y = S.slot;
    var w = new Map;
    var O = function initScrollTimeline(r) {
      return h && new h({
        source: p,
        axis: r
      });
    };
    var C = O("x");
    var E = O("y");
    var T = Ne([ f, l, s ], (function() {
      return g && _ ? f : l;
    }), c, y);
    var H = function getScrollbarHandleLengthRatio(r, a) {
      if (a) {
        var n = r ? rr : ar;
        var t = a.Mr, v = a.Vr;
        var i = ia(v)[n];
        var o = ia(t)[n];
        return gr(0, 1, i / o || 0);
      }
      var u = r ? "x" : "y";
      var c = e.jr, f = e.Fr;
      var l = f[u];
      var s = c[u];
      return gr(0, 1, l / (l + s) || 0);
    };
    var x = function getScrollbarHandleOffsetRatio(r, a, e, n) {
      var t = H(e, r);
      return 1 / t * (1 - t) * (n ? 1 - a : a) || 0;
    };
    var P = function addDirectionRTLKeyframes(r, a) {
      return pr(r, a ? {
        clear: [ "left" ]
      } : {});
    };
    var D = function cancelElementAnimations(r) {
      w.forEach((function(a, e) {
        var n = r ? M(N(r), e) : true;
        if (n) {
          each(a || [], (function(r) {
            r && r.cancel();
          }));
          w.delete(e);
        }
      }));
    };
    var R = function setElementAnimation(r, a, e, n) {
      var t = w.get(r) || [];
      var v = t.find((function(r) {
        return r && r.timeline === a;
      }));
      if (v) {
        v.effect = new KeyframeEffect(r, e, {
          composite: n
        });
      } else {
        w.set(r, V(t, [ r.animate(e, {
          timeline: a,
          composite: n
        }) ]));
      }
    };
    var I = function scrollbarStructureAddRemoveClass(r, a, e) {
      var n = e ? xr : Hr;
      each(r, (function(r) {
        n(r.Nr, a);
      }));
    };
    var z = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), n = e[0], t = e[1];
        setStyles(n, t);
      }));
    };
    var L = function scrollbarStructureRefreshHandleLength(r, a) {
      z(r, (function(r) {
        var e;
        var n = r.Vr;
        return [ n, (e = {}, e[a ? rr : ar] = Kr(H(a)), e) ];
      }));
    };
    var k = function scrollbarStructureRefreshHandleOffset(r, a) {
      var n = e.jr;
      var t = a ? n.x : n.y;
      var v = function getTransformValue(r, e, n) {
        return Jr(Kr(x(r, ga(e, t, n), a, n)), a);
      };
      if (C && E) {
        each(r, (function(r) {
          var e = r.Nr, n = r.Vr;
          var o = a && Gr(e) && i;
          R(n, a ? C : E, P({
            transform: ha(t, o).map((function(a) {
              return v(r, a, o);
            }))
          }, o));
        }));
      } else {
        var o = ma(p);
        z(r, (function(r) {
          var e = r.Vr, n = r.Nr;
          return [ e, {
            transform: v(r, a ? o.x : o.y, a && Gr(n) && i)
          } ];
        }));
      }
    };
    var F = function doRefreshScrollbarOffset(r) {
      return g && !_ && Lr(r) === s;
    };
    var B = [];
    var U = [];
    var W = [];
    var q = function scrollbarsAddRemoveClass(r, a, e) {
      var n = A(e);
      var t = n ? e : true;
      var v = n ? !e : true;
      t && I(U, r, a);
      v && I(W, r, a);
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
            var n = e.Nr;
            if (F(n)) {
              var t = function setScrollbarElementAnimation(r, e, t) {
                var v = t && Gr(n) && i;
                R(n, r, P({
                  transform: ha(e - a, v).map((function(r) {
                    return Jr(Zr(r), t);
                  }))
                }, v), "add");
              };
              t(C, r.x, true);
              t(E, r.y);
            } else {
              D(n);
            }
          }));
        } else {
          var n = ma(p);
          var t = function styleScrollbarPosition(a) {
            var e = a.Nr;
            var t = F(e) && e;
            var v = function getTranslateValue(r, a, e) {
              var n = ga(r, a, e);
              var t = a * n;
              return Zr(e ? -t : t);
            };
            return [ t, {
              transform: t ? Jr({
                x: v(n.x, r.x, Gr(e) && i),
                y: v(n.y, r.y)
              }) : ""
            } ];
          };
          z(U, t);
          z(W, t);
        }
      }
    };
    var G = function generateScrollbarDOM(r) {
      var a = r ? ae : ee;
      var e = Br(Qa + " " + a);
      var t = Br(ne);
      var v = Br(te);
      var i = {
        Nr: e,
        Mr: t,
        Vr: v
      };
      j(r ? U : W, i);
      j(B, [ Fr(e, t), Fr(t, v), cr(Vr, e), D, n(i, q, k, r) ]);
      return i;
    };
    var $ = cr(G, true);
    var J = cr(G, false);
    var Q = function appendElements() {
      Fr(T, U[0].Nr);
      Fr(T, W[0].Nr);
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
        Zr: cr(z, U)
      },
      Gr: {
        G: E,
        Xr: W,
        Kr: J,
        Zr: cr(z, W)
      }
    }, Q ];
  };
  var Qe = function createScrollbarsSetupEvents(r, a, e, n) {
    var t = a.mr, v = a.Lr, o = a.$r;
    return function(a, u, c, f) {
      var l = a.Nr, s = a.Mr, d = a.Vr;
      var p = fr(333), _ = p[0], h = p[1];
      var g = fr(), b = g[0], m = g[1];
      var S = cr(c, [ a ], f);
      var y = !!v.scrollBy;
      var w = "client" + (f ? "X" : "Y");
      var O = f ? rr : ar;
      var C = f ? "left" : "top";
      var E = f ? "w" : "h";
      var T = f ? "x" : "y";
      var A = function isAffectingTransition(r) {
        return r.propertyName.indexOf(O) > -1;
      };
      var H = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var n = function createRelativeHandleMove(r, a) {
          return function(n) {
            var t;
            var i = e.jr;
            var o = ea(s)[E] - ea(d)[E];
            var u = a * n / o;
            var c = u * i[T];
            ba(v, (t = {}, t[T] = r + c, t));
          };
        };
        return fa(s, "pointerdown", (function(e) {
          var u = kr(e.target, "." + te) === d;
          var c = u ? d : s;
          var f = r.scrollbars;
          var l = e.button, p = e.isPrimary, _ = e.pointerType;
          var h = f.pointers;
          var g = l === 0 && p && f[u ? "dragScroll" : "clickScroll"] && (h || []).includes(_);
          if (g) {
            var b = !u && e.shiftKey;
            var m = cr(ia, d);
            var S = cr(ia, s);
            var y = function getHandleOffset(r, a) {
              return (r || m())[C] - (a || S())[C];
            };
            var A = i(ia(v)[O]) / ea(v)[E] || 1;
            var H = n(ma(v)[T] || 0, 1 / A);
            var x = e[w];
            var P = m();
            var D = S();
            var R = P[O];
            var I = y(P, D) + R / 2;
            var z = x - D[C];
            var L = u ? 0 : z - I;
            var k = function releasePointerCapture(r) {
              Y(V);
              c.releasePointerCapture(r.pointerId);
            };
            var M = Cr(t, Da, La);
            var V = [ M, fa(o, a, k), fa(o, "selectstart", (function(r) {
              return sa(r);
            }), {
              A: false
            }), fa(s, a, k), fa(s, "pointermove", (function(r) {
              var a = r[w] - x;
              if (u || b) {
                H(L + a);
              }
            })) ];
            c.setPointerCapture(e.pointerId);
            if (b) {
              H(L);
            } else if (!u) {
              var F = be(ze);
              F && j(V, F(H, y, L, R, z));
            }
          }
        }));
      };
      var x = true;
      return cr(Y, [ fa(l, "pointerenter", (function() {
        u(oe, true);
      })), fa(l, "pointerleave pointercancel", (function() {
        u(oe, false);
      })), fa(l, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, n = r.deltaMode;
        if (y && x && n === 0 && Lr(l) === t) {
          v.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        x = false;
        u(le, true);
        _((function() {
          x = true;
          u(le);
        }));
        sa(r);
      }), {
        A: false,
        H: true
      }), fa(d, "pointermove pointerleave", n), fa(d, "transitionstart", (function(r) {
        if (A(r)) {
          var a = function animateHandleOffset() {
            S();
            b(animateHandleOffset);
          };
          a();
        }
      })), fa(d, "transitionend transitioncancel", (function(r) {
        if (A(r)) {
          m();
          S();
        }
      })), fa(l, "mousedown", cr(fa, o, "click", la, {
        P: true,
        H: true
      }), {
        H: true
      }), H(), h, m ]);
    };
  };
  var rn = function createScrollbarsSetup(r, a, e, n, t, v) {
    var i;
    var o;
    var u;
    var c;
    var f = ur;
    var l = 0;
    var s = function getAutoHideIsScrollOrMove() {
      return !u && !o;
    };
    var d = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var p = fr(), _ = p[0], h = p[1];
    var g = fr(100), b = g[0], m = g[1];
    var S = fr(100), y = S[0], w = S[1];
    var O = fr((function() {
      return l;
    })), C = O[0], E = O[1];
    var T = Je(r, t, n, Qe(a, t, n, (function(r) {
      return d(r) && s() && M();
    }))), A = T[0], H = T[1];
    var x = t.mr, P = t.Jr, D = t.kr;
    var R = A.Wr, I = A.Br, z = A.Ur, L = A.Yr;
    var k = function manageScrollbarsAutoHide(r, a) {
      E();
      if (r) {
        R(fe);
      } else {
        var e = cr(R, fe, true);
        if (l > 0 && !a) {
          C(e);
        } else {
          e();
        }
      }
    };
    var M = function manageScrollbarsAutoHideInstantInteraction() {
      k(true);
      b((function() {
        k(false);
      }));
    };
    var V = function manageAutoHideSuspension(r) {
      R(ce, r, true);
      R(ce, r, false);
    };
    var F = function onHostMouseEnter(r) {
      if (d(r)) {
        o && k(true);
      }
    };
    var N = [ E, m, w, h, function() {
      return f();
    }, fa(x, "pointerover", F, {
      P: true
    }), fa(x, "pointerenter", F), fa(x, "pointerleave", (function(r) {
      if (d(r)) {
        o && k(false);
      }
    })), fa(x, "pointermove", (function(r) {
      d(r) && i && M();
    })), fa(P, "scroll", (function(r) {
      _((function() {
        z();
        s() && M();
      }));
      v(r);
      L();
    })) ];
    return [ function() {
      return cr(Y, j(N, H()));
    }, function(r) {
      var a = r.Dr, t = r.Ir, v = r.Qr, s = r.ra;
      var d = s || {}, p = d.aa, _ = d.ea, h = d.na;
      var g = v || {}, b = g.Er, m = g._r;
      var S = e.U;
      var w = Ve(), O = w.R;
      var C = n.L, E = n.ta;
      var T = a("showNativeOverlaidScrollbars"), A = T[0], H = T[1];
      var x = a("scrollbars.theme"), M = x[0], j = x[1];
      var F = a("scrollbars.visibility"), N = F[0], B = F[1];
      var U = a("scrollbars.autoHide"), Y = U[0], W = U[1];
      var q = a("scrollbars.autoHideSuspend"), X = q[0], K = q[1];
      var Z = a("scrollbars.autoHideDelay"), G = Z[0];
      var $ = a("scrollbars.dragScroll"), J = $[0], Q = $[1];
      var rr = a("scrollbars.clickScroll"), ar = rr[0], er = rr[1];
      var nr = a("overflow"), tr = nr[0], vr = nr[1];
      var ir = m && !t;
      var or = E.x || E.y;
      var ur = p || _ || b || t;
      var fr = h || B || vr;
      var lr = A && O.x && O.y;
      var sr = function setScrollbarVisibility(r, a, e) {
        var n = r.includes("scroll") && (N === "visible" || N === "auto" && a === "scroll");
        R(ve, n, e);
        return n;
      };
      l = G;
      if (ir) {
        if (X && or) {
          V(false);
          f();
          y((function() {
            f = fa(P, "scroll", cr(V, true), {
              P: true
            });
          }));
        } else {
          V(true);
        }
      }
      if (H) {
        R(Ja, lr);
      }
      if (j) {
        R(c);
        R(M, true);
        c = M;
      }
      if (K && !X) {
        V(true);
      }
      if (W) {
        i = Y === "move";
        o = Y === "leave";
        u = Y === "never";
        k(u, true);
      }
      if (Q) {
        R(de, J);
      }
      if (er) {
        R(se, ar);
      }
      if (fr) {
        var dr = sr(tr.x, C.x, true);
        var pr = sr(tr.y, C.y, false);
        var _r = dr && pr;
        R(ie, !_r);
      }
      if (ur) {
        I();
        z();
        L();
        R(ue, !E.x, true);
        R(ue, !E.y, false);
        R(re, S && !D);
      }
    }, {}, A ];
  };
  var an = function createStructureSetupElements(r) {
    var a = Ve();
    var e = a.rr, n = a.j;
    var t = e(), v = t.elements;
    var i = v.host, o = v.padding, u = v.viewport, c = v.content;
    var f = I(r);
    var l = f ? {} : r;
    var s = l.elements;
    var d = s || {}, p = d.host, _ = d.padding, h = d.viewport, g = d.content;
    var b = f ? r : l.target;
    var m = Ir(b);
    var S = Rr(b, "textarea");
    var y = b.ownerDocument;
    var w = y.documentElement;
    var O = y.defaultView;
    var C = function getFocusedElement() {
      return y.activeElement;
    };
    var E = function focusElm(r) {
      if (r && r.focus) {
        r.focus();
      }
    };
    var T = cr(Fe, [ b ]);
    var A = cr(Ne, [ b ]);
    var H = cr(Br, "");
    var x = cr(T, H, u);
    var P = cr(A, H, c);
    var D = x(h);
    var R = D === b;
    var z = R && m;
    var L = !R && P(g);
    var k = !R && D === L;
    var V = z ? w : D;
    var F = S ? T(H, i, p) : b;
    var N = z ? V : F;
    var B = !R && A(H, o, _);
    var U = !k && L;
    var W = [ U, V, B, N ].map((function(r) {
      return I(r) && !Lr(r) && r;
    }));
    var q = function elementIsGenerated(r) {
      return r && M(W, r);
    };
    var X = q(V) ? b : V;
    var K = {
      br: b,
      mr: N,
      I: V,
      va: B,
      Sr: U,
      Lr: z ? w : V,
      Jr: z ? y : V,
      ia: m ? w : X,
      oa: O,
      $r: y,
      yr: S,
      kr: m,
      zr: f,
      V: R,
      wr: function _viewportHasClass(r) {
        return Tr(V, R ? Da : Va, r);
      },
      Or: function _viewportAddRemoveClass(r, a) {
        return Er(V, R ? Da : Va, r, a);
      }
    };
    var Z = K.br, G = K.mr, $ = K.va, J = K.I, Q = K.Sr;
    var rr = [ function() {
      yr(G, [ Da, Pa ]);
      yr(Z, Pa);
      if (m) {
        yr(w, [ Pa, Da ]);
      }
    } ];
    var ar = S && q(G);
    var er = S ? Z : zr([ Q, J, $, G, Z ].find((function(r) {
      return r && !q(r);
    })));
    var nr = z ? Z : Q || J;
    var tr = cr(Y, rr);
    var vr = function appendElements() {
      var r = C();
      var a = function unwrap(r) {
        Fr(Lr(r), zr(r));
        Vr(r);
      };
      var e = function prepareWrapUnwrapFocus(r) {
        return r ? fa(r, "focusin focusout focus blur", (function(r) {
          la(r);
          r.stopImmediatePropagation();
        }), {
          H: true,
          A: false
        }) : ur;
      };
      var t = e(r);
      Sr(G, Da, R ? "viewport" : "host");
      Sr($, Ba, "");
      Sr(Q, Ya, "");
      if (!R) {
        Sr(J, Va, "");
        m && Cr(w, Da, Ma);
      }
      if (ar) {
        Nr(Z, G);
        j(rr, (function() {
          Nr(G, Z);
          Vr(G);
        }));
      }
      Fr(nr, er);
      Fr(G, $);
      Fr($ || G, !R && J);
      Fr(J, Q);
      j(rr, [ t, function() {
        var r = C();
        var n = e(r);
        yr($, Ba);
        yr(Q, Ya);
        yr(J, [ Ra, Ia, Va ]);
        q(Q) && a(Q);
        q(J) && a(J);
        q($) && a($);
        E(r);
        n();
      } ]);
      if (n && !R) {
        Cr(J, Va, Fa);
        j(rr, cr(yr, J, Va));
      }
      if (!R && O.top === O && r === b) {
        var v = "tabindex";
        var i = mr(J, v);
        Sr(J, v, "-1");
        E(J);
        var o = function revertViewportTabIndex() {
          return i ? Sr(J, v, i) : yr(J, v);
        };
        var u = fa(y, "pointerdown keydown", (function() {
          o();
          u();
        }));
        j(rr, [ o, u ]);
      } else {
        E(r);
      }
      t();
      er = 0;
      return tr;
    };
    return [ K, vr, tr ];
  };
  var en = function createTrinsicUpdateSegment(r) {
    var a = r.Sr;
    return function(r) {
      var e = r.Qr, n = r.ua, t = r.Ir;
      var v = e || {}, i = v.Tr;
      var o = n.Cr;
      var u = a && (i || t);
      if (u) {
        var c;
        setStyles(a, (c = {}, c[ar] = o && "100%", c));
      }
    };
  };
  var nn = function createPaddingUpdateSegment(r, e) {
    var n = r.mr, t = r.va, v = r.I, i = r.V;
    var o = a({
      o: or,
      v: $r()
    }, cr($r, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Dr, n = r.Qr, o = r.ua, f = r.Ir;
      var l = c(f), s = l[0], d = l[1];
      var p = Ve(), _ = p.j;
      var h = n || {}, g = h.gr, b = h.Ar, m = h.Er;
      var S = o.U;
      var y = a("paddingAbsolute"), w = y[0], O = y[1];
      var C = f || b;
      if (g || d || C) {
        var E = u(f);
        s = E[0];
        d = E[1];
      }
      var T = !i && (O || m || d);
      if (T) {
        var A, H;
        var x = !w || !t && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var R = (A = {}, A[G] = x && !S ? -P : 0, A[$] = x ? -D : 0, A[Z] = x && S ? -P : 0, 
        A.top = x ? -s.t : 0, A.right = x ? S ? -s.r : "auto" : 0, A.left = x ? S ? "auto" : -s.l : 0, 
        A[rr] = x && "calc(100% + " + P + "px)", A);
        var I = (H = {}, H[W] = x ? s.t : 0, H[q] = x ? s.r : 0, H[K] = x ? s.b : 0, H[X] = x ? s.l : 0, 
        H);
        setStyles(t || v, R);
        setStyles(v, I);
        pr(e, {
          va: s,
          ca: !x,
          Y: t ? I : pr({}, R, I)
        });
      }
      return {
        fa: T
      };
    };
  };
  var tn = function createOverflowUpdateSegment(r, e) {
    var v = Ve();
    var i = r.mr, o = r.va, u = r.I, c = r.V, f = r.Or, l = r.kr, s = r.oa;
    var d = v.j;
    var p = l && c;
    var _ = cr(t, 0);
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
      var e = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: _(r.w - a.w),
        h: _(r.h - a.h)
      };
      return {
        w: t.w > e ? t.w : 0,
        h: t.h > e ? t.h : 0
      };
    };
    var m = a(h, cr(va, u)), S = m[0], y = m[1];
    var w = a(h, cr(ta, u)), O = w[0], C = w[1];
    var E = a(h), T = E[0], A = E[1];
    var H = a(h), x = H[0], P = H[1];
    var D = a(g), R = D[0];
    var I = be(Re);
    return function(a, n) {
      var l = a.Dr, h = a.Qr, g = a.ua, m = a.Ir;
      var w = n.fa;
      var E = h || {}, H = E.gr, D = E.Ar, z = E.Er, L = E.Pr;
      var k = I && I.M(r, e, g, v, l);
      var M = k || {}, V = M.q, j = M.X, F = M.K;
      var N = He(l, v), B = N[0], U = N[1];
      var Y = l("overflow"), W = Y[0], q = Y[1];
      var X = H || w || D || z || L || U;
      var K = xe(W.x);
      var Z = xe(W.y);
      var G = K || Z;
      var $ = y(m);
      var rr = C(m);
      var ar = A(m);
      var er = P(m);
      var nr;
      if (U && d) {
        f(Fa, !B);
      }
      if (X) {
        if (G) {
          f(Na, false);
        }
        var tr = j ? j(nr) : [], vr = tr[0], ir = tr[1];
        var or = $ = S(m), ur = or[0], cr = or[1];
        var fr = rr = O(m), lr = fr[0], sr = fr[1];
        var dr = na(u);
        var _r = lr;
        var hr = dr;
        vr && vr();
        if ((sr || cr || U) && ir && !B && V && V(ir, lr, ur)) {}
        var gr = aa(s);
        var br = {
          w: _(t(lr.w, _r.w) + ur.w),
          h: _(t(lr.h, _r.h) + ur.h)
        };
        var mr = {
          w: _((p ? gr.w : hr.w + _(dr.w - lr.w)) + ur.w),
          h: _((p ? gr.h : hr.h + _(dr.h - lr.h)) + ur.h)
        };
        er = x(mr);
        ar = T(b(br, mr), m);
      }
      var yr = er, wr = yr[0], Or = yr[1];
      var Cr = ar, Tr = Cr[0], Ar = Cr[1];
      var Hr = rr, xr = Hr[0], Pr = Hr[1];
      var Dr = $, Rr = Dr[0], Ir = Dr[1];
      var zr = {
        x: Tr.w > 0,
        y: Tr.h > 0
      };
      var Lr = K && Z && (zr.x || zr.y) || K && zr.x && !zr.y || Z && zr.y && !zr.x;
      var kr = w || z || L || Ir || Pr || Or || Ar || q || U || X;
      if (kr) {
        var Mr = {};
        var Vr = De(r, zr, W, Mr);
        F && F(Vr, g, !!V && V(Vr, xr, Rr), Mr);
        if (c) {
          Sr(i, Ra, Mr[J]);
          Sr(i, Ia, Mr[Q]);
        } else {
          setStyles(u, Mr);
        }
      }
      Er(i, Da, za, Lr);
      Er(o, Ba, Ua, Lr);
      if (!c) {
        Er(u, Va, Na, G);
      }
      var jr = R(Pe(r).L), Fr = jr[0], Nr = jr[1];
      pr(e, {
        L: Fr,
        Fr: {
          x: wr.w,
          y: wr.h
        },
        jr: {
          x: Tr.w,
          y: Tr.h
        },
        ta: zr
      });
      return {
        na: Nr,
        aa: Or,
        ea: Ar
      };
    };
  };
  var vn = function createStructureSetup(r) {
    var a;
    var e = an(r), n = e[0], t = e[1], v = e[2];
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
      ta: {
        x: false,
        y: false
      }
    };
    var o = n.br, u = n.I, c = n.V;
    var f = Ve(), l = f.j, s = f.R;
    var d = !l && (s.x || s.y);
    var p = [ en(n), nn(n, i), tn(n, i) ];
    return [ t, function(r) {
      var a = {};
      var e = d;
      var n = e && ma(u);
      var t = c ? Cr(u, Da, ka) : ur;
      each(p, (function(e) {
        pr(a, e(r, a) || {});
      }));
      t();
      ba(u, n);
      !c && ba(o, 0);
      return a;
    }, i, n, v ];
  };
  var on = function createSetups(r, a, e, n) {
    var t = Ta(a, {});
    var v = vn(r), i = v[0], o = v[1], u = v[2], c = v[3], f = v[4];
    var l = $e(c, u, t, (function(r) {
      S({}, r);
    })), s = l[0], d = l[1], p = l[2];
    var _ = rn(r, a, p, u, c, n), h = _[0], g = _[1], b = _[3];
    var m = function updateHintsAreTruthy(r) {
      return dr(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, n) {
      var t = r.la, v = r.Ir, i = r.Rr, u = r.sa;
      var c = t || {};
      var f = !!v;
      var l = {
        Dr: Ta(a, c, f),
        la: c,
        Ir: f
      };
      if (u) {
        g(l);
        return false;
      }
      var s = n || d(pr({}, l, {
        Rr: i
      }));
      var _ = o(pr({}, l, {
        ua: p,
        Qr: s
      }));
      g(pr({}, l, {
        Qr: s,
        ra: _
      }));
      var h = m(s);
      var b = m(_);
      var S = h || b || !hr(c) || f;
      S && e(r, {
        Qr: s,
        ra: _
      });
      return S;
    };
    return [ function() {
      var r = c.ia, a = c.I;
      var e = ma(r);
      var n = [ s(), i(), h() ];
      ba(a, e);
      return cr(Y, n);
    }, S, function() {
      return {
        da: p,
        pa: u
      };
    }, {
      _a: c,
      ha: b
    }, f ];
  };
  var un = function OverlayScrollbars(r, a, e) {
    var n = Ve(), t = n.er;
    var v = I(r);
    var i = v ? r : r.target;
    var o = qe(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var a = _r(r, true);
        var e = be(Ee);
        return e ? e(a, true) : a;
      };
      var s = pr({}, t(), l(a));
      var d = ya(), p = d[0], _ = d[1], h = d[2];
      var g = ya(e), b = g[0], m = g[1], S = g[2];
      var y = function triggerEvent(r, a) {
        S(r, a);
        h(r, a);
      };
      var w = on(r, s, (function(r, a) {
        var e = r.la, n = r.Ir;
        var t = a.Qr, v = a.ra;
        var i = t.gr, o = t.Er, u = t.Tr, c = t.Ar, f = t.Hr, l = t._r;
        var s = v.aa, d = v.ea, p = v.na;
        y("updated", [ x, {
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
          force: !!n
        } ]);
      }), (function(r) {
        return y("scroll", [ x, r ]);
      })), O = w[0], C = w[1], E = w[2], T = w[3], A = w[4];
      var H = function destroy(r) {
        We(i);
        Y(c);
        u = true;
        y("destroyed", [ x, r ]);
        _();
        m();
      };
      var x = {
        options: function options(r, a) {
          if (r) {
            var e = a ? t() : {};
            var n = Ea(s, pr(e, l(r)));
            if (!hr(n)) {
              pr(s, n);
              C({
                la: n
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
          var n = a.U;
          var t = e.Fr, v = e.jr, i = e.L, o = e.ta, c = e.va, f = e.ca;
          return pr({}, {
            overflowEdge: t,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: c,
            paddingAbsolute: f,
            directionRTL: n,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = T._a, a = r.br, e = r.mr, n = r.va, t = r.I, v = r.Sr, i = r.Lr, o = r.Jr;
          var u = T.ha, c = u.qr, f = u.Gr;
          var l = function translateScrollbarStructure(r) {
            var a = r.Vr, e = r.Mr, n = r.Nr;
            return {
              scrollbar: n,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Xr, e = r.Kr;
            var n = l(a[0]);
            return pr({}, n, {
              clone: function clone() {
                var r = l(e());
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
            padding: n || t,
            viewport: t,
            content: v || t,
            scrollOffsetElement: i,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(f)
          });
        },
        update: function update(r) {
          return C({
            Ir: r,
            Rr: true
          });
        },
        destroy: cr(H, false),
        plugin: function plugin(r) {
          return f[dr(r)[0]];
        }
      };
      j(c, [ A ]);
      Ye(i, x);
      ge(pe, OverlayScrollbars, [ x, p, f ]);
      if (Be(T._a.kr, !v && r.cancel)) {
        H(true);
        return x;
      }
      j(c, O());
      y("initialized", [ x ]);
      x.update(true);
      return x;
    }
    return o;
  };
  un.plugin = function(r) {
    var a = x(r);
    var e = a ? r : [ r ];
    var n = e.map((function(r) {
      return ge(r, un)[0];
    }));
    he(e);
    return a ? n : n[0];
  };
  un.valid = function(r) {
    var a = r && r.elements;
    var e = H(a) && a();
    return R(e) && !!qe(e.target);
  };
  un.env = function() {
    var r = Ve(), a = r.F, e = r.R, n = r.j, t = r.$, v = r.G, i = r.tr, o = r.vr, u = r.rr, c = r.ar, f = r.er, l = r.nr;
    return pr({}, {
      scrollbarsSize: a,
      scrollbarsOverlaid: e,
      scrollbarsHiding: n,
      rtlScrollBehavior: t,
      scrollTimeline: v,
      staticDefaultInitialization: i,
      staticDefaultOptions: o,
      getDefaultInitialization: u,
      setDefaultInitialization: c,
      getDefaultOptions: f,
      setDefaultOptions: l
    });
  };
  r.ClickScrollPlugin = Le;
  r.OverlayScrollbars = un;
  r.ScrollbarsHidingPlugin = Ie;
  r.SizeObserverPlugin = Ae;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
