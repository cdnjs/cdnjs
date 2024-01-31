/*!
 * OverlayScrollbars
 * Version: 2.5.0
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
  var e = typeof window !== "undefined";
  var t = e ? window : {};
  var n = Math.max;
  var v = Math.min;
  var i = Math.round;
  var o = Math.abs;
  var u = t.cancelAnimationFrame;
  var c = t.requestAnimationFrame;
  var f = t.setTimeout;
  var l = t.clearTimeout;
  var s = function getApi(r) {
    return typeof t[r] !== "undefined" ? t[r] : void 0;
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
  var x = function isString(r) {
    return typeof r === "string";
  };
  var T = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var A = function isFunction(r) {
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
    return H(r) || !A(r) && e ? a > 0 && P(r) ? a - 1 in r : true : false;
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
    return w(a) || S.call(r, a);
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
    var f = n(0, e);
    var l = function frame(e) {
      var u = L();
      var l = u - o;
      var s = l >= f;
      var d = e ? 1 : 1 - (n(0, o + f - u) / f || 0);
      var p = (a - r) * (A(v) ? v(d, d * f, 0, 1, f) : d) + r;
      var _ = s || d === 1;
      t && t(p, d, _);
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
  var V = function inArray(r, a) {
    return r.indexOf(a) >= 0;
  };
  var M = function concat(r, a) {
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
  var U = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var B = function deduplicateArray(r) {
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
  var G = "paddingBottom";
  var K = "marginLeft";
  var Z = "marginRight";
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
  var fr = function selfClearTimeout(r) {
    var a;
    var e = r ? f : c;
    var t = r ? l : u;
    return [ function(n) {
      t(a);
      a = e(n, A(r) ? r() : r);
    }, function() {
      return t(a);
    } ];
  };
  var lr = function debounce(r, a) {
    var e;
    var t;
    var n;
    var v = ur;
    var i = a || {}, o = i.p, s = i._, d = i.m;
    var p = function invokeFunctionToDebounce(a) {
      v();
      l(e);
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
      var a = A(o) ? o() : o;
      var i = E(a) && a >= 0;
      if (i) {
        var d = A(s) ? s() : s;
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
        t = n = y;
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
    if ((typeof r !== "object" || O(r)) && !A(r)) {
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
    var t = cr(Sr, r, a);
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
  var Er = function addRemoveAttrClass(r, a, e, t) {
    (t ? Cr : Or)(r, a, e);
  };
  var xr = function hasAttrClass(r, a, e) {
    return wr(r, a).T(e);
  };
  var Tr = function createDomTokenListClass(r) {
    return wr(r, "class");
  };
  var Ar = function removeClass(r, a) {
    Tr(r).O(a);
  };
  var Hr = function addClass(r, a) {
    Tr(r).C(a);
    return cr(Ar, r, a);
  };
  var Pr = e && Element.prototype;
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
      var e = Pr.matches || Pr.msMatchesSelector;
      return e.call(r, a);
    }
    return false;
  };
  var Ir = function contents(r) {
    return r ? F(r.childNodes) : [];
  };
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var kr = function closest(r, a) {
    return I(r) && r.closest(a);
  };
  var Vr = function liesBetween(r, a, e) {
    var t = kr(r, a);
    var n = r && Rr(e, t);
    var v = kr(n, a) === t;
    return t && n ? t === r || n === r || v && kr(kr(r, e), a) !== t : false;
  };
  var Mr = function removeElements(r) {
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
        return Mr(e);
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
  var Ur = function createDiv(r) {
    var a = document.createElement("div");
    Sr(a, "class", r);
    return a;
  };
  var Br = function createDOM(r) {
    var a = Ur();
    a.innerHTML = r.trim();
    return each(Ir(a), (function(r) {
      return Mr(r);
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
  var Gr = function ratioToCssPercent(r) {
    return (qr(r) * 100).toFixed(3) + "%";
  };
  var Kr = function numberToCssPx(r) {
    return qr(r) + "px";
  };
  function setStyles(r, a) {
    r && each(a, (function(a, e) {
      try {
        var t = r.style;
        var n = E(a) ? Kr(a) : (a || "") + "";
        if (Yr.test(e)) {
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
      v = n ? Wr(i, a) : a.reduce((function(r, a) {
        r[a] = Wr(i, a);
        return r;
      }), v);
    }
    return v;
  }
  var Zr = function getDirectionIsRTL(r) {
    return getStyles(r, "direction") === "rtl";
  };
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
    return ra("inner", r || t);
  };
  var ea = cr(ra, "offset");
  var ta = cr(ra, "client");
  var na = cr(ra, "scroll");
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
    var t = oa(a);
    return !t && e;
  };
  var ca = function removeEventListener(r, a, e, t) {
    each(br(a), (function(a) {
      r.removeEventListener(a, e, t);
    }));
  };
  var fa = function addEventListener(r, a, e, t) {
    var n;
    var v = (n = t && t.A) != null ? n : true;
    var i = t && t.H || false;
    var o = t && t.P || false;
    var u = {
      passive: v,
      capture: i
    };
    return cr(Y, br(a).map((function(a) {
      var t = o ? function(n) {
        ca(r, a, t, i);
        e(n);
      } : e;
      r.addEventListener(a, t, u);
      return cr(ca, r, a, t, i);
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
      x: a.left + t.scrollX,
      y: a.top + t.scrollY
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
    } : a || {}, t = e.x, n = e.y;
    E(t) && (r.scrollLeft = t);
    E(n) && (r.scrollTop = n);
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
        var t = a.get(r);
        Sa((function(r) {
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
        Sa((function(r) {
          A(r) && n.add(r);
        }), t);
        return cr(e, r, t);
      }
      if (T(t) && t) {
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
        if (e && !U(e)) {
          r.apply(0, e);
        } else {
          r();
        }
      }));
    };
    t(r || {});
    return [ t, e, n ];
  };
  var wa = function opsStringify(r) {
    return JSON.stringify(r, (function(r, a) {
      if (A(a)) {
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
    var t = M(dr(a), dr(r));
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
            if (wa(n) === wa(v)) {
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
  var xa = function createOptionCheck(r, a, e) {
    return function(t) {
      return [ Oa(r, t), e || Oa(a, t) !== void 0 ];
    };
  };
  var Ta = "data-overlayscrollbars";
  var Aa = "os-environment";
  var Ha = Aa + "-scrollbar-hidden";
  var Pa = Ta + "-initialize";
  var Da = Ta;
  var Ra = Da + "-overflow-x";
  var za = Da + "-overflow-y";
  var Ia = "overflowVisible";
  var La = "scrollbarPressed";
  var ka = "updating";
  var Va = "body";
  var Ma = Ta + "-viewport";
  var ja = "arrange";
  var Fa = "scrollbarHidden";
  var Na = Ia;
  var Ua = Ta + "-padding";
  var Ba = Na;
  var Ya = Ta + "-content";
  var Wa = "os-size-observer";
  var qa = Wa + "-appear";
  var Xa = Wa + "-listener";
  var Ga = Xa + "-scroll";
  var Ka = Xa + "-item";
  var Za = Ka + "-final";
  var $a = "os-trinsic-observer";
  var Ja = "os-theme-none";
  var Qa = "os-scrollbar";
  var re = Qa + "-rtl";
  var ae = Qa + "-horizontal";
  var ee = Qa + "-vertical";
  var te = Qa + "-track";
  var ne = Qa + "-handle";
  var ve = Qa + "-visible";
  var ie = Qa + "-cornerless";
  var oe = Qa + "-transitionless";
  var ue = Qa + "-interaction";
  var ce = Qa + "-unusable";
  var fe = Qa + "-auto-hide";
  var le = fe + "-hidden";
  var se = Qa + "-wheel";
  var de = te + "-interactive";
  var pe = ne + "-interactive";
  var _e = {};
  var he = {};
  var ge = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(a, e) {
        _e[e] = r[e];
      }));
    }));
  };
  var be = function registerPluginModuleInstances(r, a, e) {
    return dr(r).map((function(t) {
      var n = r[t], v = n.static, i = n.instance;
      var o = e || [], u = o[0], c = o[1], f = o[2];
      var l = e ? i : v;
      if (l) {
        var s = e ? l(u, c, a) : l(a);
        return (f || he)[t] = s;
      }
    }));
  };
  var me = function getStaticPluginModuleInstance(r) {
    return he[r];
  };
  function getDefaultExportFromCjs(r) {
    return r && r.D && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Se = {
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
  })(Se);
  var ye = Se.exports;
  var we = /*@__PURE__*/ getDefaultExportFromCjs(ye);
  var Oe = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ce = function validateRecursive(r, a, e, t) {
    var n = {};
    var v = we({}, a);
    var i = dr(r).filter((function(r) {
      return sr(a, r);
    }));
    each(i, (function(i) {
      var o = a[i];
      var u = r[i];
      var c = R(u);
      var f = t ? t + "." : "";
      if (c && R(o)) {
        var l = validateRecursive(u, o, e, f + i), s = l[0], d = l[1];
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
          each(Oe, (function(e, t) {
            if (e === r) {
              a = t;
            }
          }));
          var e = w(a);
          if (e && x(o)) {
            var t = r.split(" ");
            p = !!t.find((function(r) {
              return r === o;
            }));
            j(_, t);
          } else {
            p = Oe[g] === r;
          }
          j(h, e ? Oe.string : a);
          return !p;
        }));
        if (p) {
          n[i] = o;
        } else if (e) {
          console.warn('The option "' + f + i + "\" wasn't set, because it doesn't accept the type [ " + g.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + h.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete v[i];
      }
    }));
    return [ n, v ];
  };
  var Ee = function validateOptions(r, a, e) {
    return Ce(r, a, e);
  };
  var xe = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[xe] = {
      static: function _static() {
        var r = Oe.number;
        var a = Oe.boolean;
        var e = [ Oe.array, Oe.null ];
        var t = "hidden scroll visible visible-hidden";
        var n = "visible hidden auto";
        var v = "never scroll leavemove";
        var i = {
          paddingAbsolute: a,
          showNativeOverlaidScrollbars: a,
          update: {
            elementEvents: e,
            attributes: e,
            debounce: [ Oe.number, Oe.array, Oe.null ],
            ignoreMutation: [ Oe.function, Oe.null ]
          },
          overflow: {
            x: t,
            y: t
          },
          scrollbars: {
            theme: [ Oe.string, Oe.null ],
            visibility: n,
            autoHide: v,
            autoHideDelay: r,
            autoHideSuspend: a,
            dragScroll: a,
            clickScroll: a,
            pointers: [ Oe.array, Oe.null ]
          }
        };
        return function(r, a) {
          var e = Ee(i, r, a), t = e[0], n = e[1];
          return we({}, n, t);
        };
      }
    }, r;
  })();
  var Te = "__osSizeObserverPlugin";
  var Ae = /* @__PURE__ */ function(r) {
    return r = {}, r[Te] = {
      static: function _static() {
        return function(r, a, e) {
          var t;
          var n = 3333333;
          var v = "scroll";
          var i = Br('<div class="' + Ka + '" dir="ltr"><div class="' + Ka + '"><div class="' + Za + '"></div></div><div class="' + Ka + '"><div class="' + Za + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = i[0];
          var f = o.lastChild;
          var l = o.firstChild;
          var s = l == null ? void 0 : l.firstChild;
          var d = ea(o);
          var p = d;
          var _ = false;
          var h;
          var g = function reset() {
            ba(l, n);
            ba(f, n);
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
          Hr(r, Ga);
          setStyles(s, (t = {}, t[rr] = n, t[ar] = n, t));
          c(g);
          return [ e ? cr(m, false) : g, S ];
        };
      }
    }, r;
  }();
  var He = function getShowNativeOverlaidScrollbars(r, a) {
    var e = a.R;
    var t = r("showNativeOverlaidScrollbars"), n = t[0], v = t[1];
    return [ n && e.x && e.y, v ];
  };
  var Pe = function overflowIsVisible(r) {
    return r.indexOf(tr) === 0;
  };
  var De = function getViewportOverflowState(r, a) {
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
  var Re = function setViewportOverflowState(r, a, e, t) {
    var n = a.x || a.y;
    var v = function setAxisOverflowStyle(r, a) {
      var e = Pe(r);
      var t = e && n ? "hidden" : "";
      var v = a && e && r.replace(tr + "-", "") || t;
      return [ a && !e ? r : "", Pe(v) ? "hidden" : v ];
    };
    var i = v(e.x, a.x), o = i[0], u = i[1];
    var c = v(e.y, a.y), f = c[0], l = c[1];
    t[J] = u && f ? u : o;
    t[Q] = l && o ? l : f;
    return De(r, t);
  };
  var ze = "__osScrollbarsHidingPlugin";
  var Ie = /* @__PURE__ */ function(r) {
    return r = {}, r[ze] = {
      static: function _static() {
        return {
          V: function _viewportArrangement(r, a, e, t, n) {
            var v = r.M, i = r.I;
            var o = t.j, u = t.R, c = t.F;
            var f = !v && !o && (u.x || u.y);
            var l = He(n, t), s = l[0];
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
              var f = t(u.y, a.y, c.y), l = f[0], d = f[1];
              return {
                N: {
                  x: v,
                  y: l
                },
                U: {
                  x: i,
                  y: d
                }
              };
            };
            var p = function _hideNativeScrollbars(r, e, t, n) {
              var i;
              var o = e.B;
              pr(n, (i = {}, i[Z] = 0, i[$] = 0, i[K] = 0, i));
              if (!v) {
                var u = d(r), c = u.N, f = u.U;
                var l = f.x, s = f.y;
                var p = c.x, _ = c.y;
                var h = a.Y;
                var g = o ? K : Z;
                var b = o ? X : q;
                var m = h[g];
                var S = h[$];
                var y = h[b];
                var w = h[G];
                n[rr] = "calc(100% + " + (_ + m * -1) + "px)";
                n[g] = -_ + m;
                n[$] = -p + S;
                if (t) {
                  n[b] = y + (s ? _ : 0);
                  n[G] = w + (l ? p : 0);
                }
              }
            };
            var _ = function _arrangeViewport(r, t, n) {
              if (f) {
                var v = a.Y;
                var o = d(r), u = o.N, c = o.U;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var h = e.B;
                var g = h ? q : X;
                var b = v[g];
                var m = v.paddingTop;
                var S = t.w + n.w;
                var y = t.h + n.h;
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
            var h = function _undoViewportArrange(t) {
              if (f) {
                var n = t || De(r);
                var v = a.Y;
                var o = d(n), u = o.U;
                var c = u.x, l = u.y;
                var s = {};
                var _ = function assignProps(r) {
                  return each(r, (function(r) {
                    s[r] = v[r];
                  }));
                };
                if (c) {
                  _([ $, W, G ]);
                }
                if (l) {
                  _([ K, Z, X, q ]);
                }
                var h = getStyles(i, dr(s));
                Or(i, Ma, ja);
                setStyles(i, s);
                return [ function() {
                  p(n, e, f, h);
                  setStyles(i, h);
                  Cr(i, Ma, ja);
                }, n ];
              }
              return [ ur ];
            };
            return {
              W: d,
              q: _,
              X: h,
              G: p
            };
          },
          K: function _envWindowZoom() {
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
              var p = !n(l.w, l.h);
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
  var Le = "__osClickScrollPlugin";
  var ke = /* @__PURE__ */ function(r) {
    return r = {}, r[Le] = {
      static: function _static() {
        return function(r, a, e, t, n) {
          var v = 0;
          var i = ur;
          var o = function animateClickScroll(o) {
            i = k(o, o + t * Math.sign(e), 133, (function(e, o, u) {
              r(e);
              var c = a();
              var l = c + t;
              var s = n >= c && n <= l;
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
  var Ve;
  var Me = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, a, e, t) {
      Fr(r, a);
      var n = ta(a);
      var v = ea(a);
      var i = va(e);
      t && Mr(a);
      return {
        x: v.h - n.h + i.h,
        y: v.w - n.w + i.w
      };
    };
    var e = function getNativeScrollbarsHiding(r) {
      var a = false;
      var e = Hr(r, Ha);
      try {
        a = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (t) {}
      e();
      return a;
    };
    var n = function getRtlScrollBehavior(r, a) {
      var e;
      setStyles(r, (e = {}, e[J] = er, e[Q] = er, e.direction = "rtl", e));
      ba(r, {
        x: 0
      });
      var t = pa(r);
      var n = pa(a);
      ba(r, {
        x: -999
      });
      var v = pa(a);
      return {
        i: t.x === n.x,
        n: n.x !== v.x
      };
    };
    var v = document, i = v.body;
    var o = Br('<div class="' + Aa + '"><div></div></div>');
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
          return m && r === r.ownerDocument.body && r;
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
      Z: !!h,
      $: n(u, c),
      J: cr(l, "r"),
      rr: C,
      ar: function _setDefaultInitialization(r) {
        return pr(y, r) && C();
      },
      er: O,
      tr: function _setDefaultOptions(r) {
        return pr(w, r) && O();
      },
      nr: pr({}, y),
      vr: pr({}, w)
    };
    yr(u, "style");
    Mr(u);
    t.addEventListener("resize", (function() {
      var r;
      if (!m && (!S.x || !S.y)) {
        var a = me(ze);
        var e = a ? a.K() : ur;
        r = !!e(E, p);
      }
      s("r", [ r ]);
    }));
    return E;
  };
  var je = function getEnvironment() {
    if (!Ve) {
      Ve = Me();
    }
    return Ve;
  };
  var Fe = function resolveInitialization(r, a) {
    return A(a) ? a.apply(0, r) : a;
  };
  var Ne = function staticInitializationElement(r, a, e, t) {
    var n = w(t) ? e : t;
    var v = Fe(r, n);
    return v || a.apply(0, r);
  };
  var Ue = function dynamicInitializationElement(r, a, e, t) {
    var n = w(t) ? e : t;
    var v = Fe(r, n);
    return !!v && (z(v) ? v : a.apply(0, r));
  };
  var Be = function cancelInitialization(r, a) {
    var e = a || {}, t = e.nativeScrollbarsOverlaid, n = e.body;
    var v = je(), i = v.R, o = v.j, u = v.rr;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = t != null ? t : f;
    var d = w(n) ? l : n;
    var p = (i.x || i.y) && s;
    var _ = r && (O(d) ? !o : d);
    return !!p || !!_;
  };
  var Ye = new WeakMap;
  var We = function addInstance(r, a) {
    Ye.set(r, a);
  };
  var qe = function removeInstance(r) {
    Ye.delete(r);
  };
  var Xe = function getInstance(r) {
    return Ye.get(r);
  };
  var Ge = function createEventContentChange(r, a, e) {
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
              var c = fa(v, i, (function(r) {
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
  var Ke = function createDOMObserver(r, a, e, t) {
    var n = false;
    var v = t || {}, i = v.ir, o = v.ur, u = v.cr, c = v.lr, f = v.sr, l = v.dr;
    var s = lr((function() {
      return n && e(true);
    }), {
      p: 33,
      _: 99
    });
    var p = Ge(r, s, u), _ = p[0], h = p[1];
    var g = i || [];
    var b = o || [];
    var m = M(g, b);
    var S = function observerCallback(n, v) {
      if (!U(v)) {
        var i = f || ur;
        var o = l || ur;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(v, (function(e) {
          var n = e.attributeName, v = e.target, f = e.type, l = e.oldValue, _ = e.addedNodes, h = e.removedNodes;
          var g = f === "attributes";
          var m = f === "childList";
          var S = r === v;
          var y = g && n;
          var w = y && mr(v, n || "") || null;
          var O = y && l !== w;
          var C = V(b, n) && O;
          if (a && (m || !S)) {
            var E = g && O;
            var x = E && c && zr(v, c);
            var T = x ? !i(v, n, l, w) : !g || E;
            var A = T && !o(e, !!x, r, t);
            each(_, (function(r) {
              return j(u, r);
            }));
            each(h, (function(r) {
              return j(u, r);
            }));
            p = p || A;
          }
          if (!a && S && O && !i(v, n, l, w)) {
            j(s, n);
            d = d || C;
          }
        }));
        h((function(r) {
          return B(u).reduce((function(a, e) {
            j(a, Dr(r, e));
            return zr(e, r) ? j(a, e) : a;
          }), []);
        }));
        if (a) {
          !n && p && e(false);
          return [ false ];
        }
        if (!U(s) || d) {
          var _ = [ B(s), d ];
          !n && e.apply(0, _);
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
  var Ze = function createSizeObserver(r, e, t) {
    var n = 3333333;
    var v = t || {}, i = v.pr, o = v._r;
    var u = me(Te);
    var c = je(), f = c.$;
    var l = cr(Zr, r);
    var s = a({
      v: false,
      u: true
    }), d = s[0];
    return function() {
      var t = [];
      var v = Br('<div class="' + Wa + '"><div class="' + Xa + '"></div></div>');
      var c = v[0];
      var s = c.firstChild;
      var p = function onSizeChangedCallbackProxy(r) {
        var a = r instanceof ResizeObserverEntry;
        var t = !a && H(r);
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
        } else if (t) {
          u = r[1];
        } else {
          o = r === true;
        }
        if (i && u) {
          var b = t ? r[0] : Zr(c);
          ba(c, {
            x: _a(n, n, b && f),
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
        j(t, M([ Hr(c, qa), fa(c, "animationstart", b) ], m));
      } else {
        return ur;
      }
      if (i) {
        var S = a({
          v: void 0
        }, l), y = S[0];
        j(t, fa(c, "scroll", (function(r) {
          var a = y();
          var e = a[0], t = a[1], n = a[2];
          if (t) {
            Ar(s, "ltr rtl");
            Hr(s, e ? "rtl" : "ltr");
            p([ !!e, t, n ]);
          }
          la(r);
        })));
      }
      return cr(Y, j(t, Fr(r, c)));
    };
  };
  var $e = function createTrinsicObserver(r, e) {
    var t;
    var n = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var v = Ur($a);
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
          var r = ea(v);
          u(r);
        };
        j(a, Ze(v, e)());
        e();
      }
      return cr(Y, j(a, Fr(r, v)));
    }, function() {
      return t && c(true, t.takeRecords());
    } ];
  };
  var Je = function createObserversSetup(r, e, t, n) {
    var v;
    var i;
    var o;
    var u;
    var c;
    var f;
    var l = je(), s = l.j;
    var d = "[" + Da + "]";
    var p = "[" + Ma + "]";
    var h = [ "tabindex" ];
    var g = [ "wrap", "cols", "rows" ];
    var b = [ "id", "class", "style", "open" ];
    var m = r.br, S = r.mr, y = r.I, w = r.Sr, O = r.yr, C = r.M, T = r.wr, P = r.Or;
    var D = {
      Cr: false,
      B: Zr(m)
    };
    var R = je();
    var z = me(ze);
    var I = a({
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    }, (function() {
      var a = z && z.V(r, e, D, R, t).X;
      var n = T(Na);
      var v = !C && T(ja);
      var i = v && ma(y);
      P(Na);
      C && P(ka, true);
      var o = v && a && a()[0];
      var u = na(w);
      var c = na(y);
      var f = va(y);
      P(Na, n);
      C && P(ka);
      o && o();
      ba(y, i);
      return {
        w: c.w + u.w + f.w,
        h: c.h + u.h + f.h
      };
    })), L = I[0];
    var k = O ? g : M(b, g);
    var j = lr(n, {
      p: function _timeout() {
        return v;
      },
      _: function _maxDelay() {
        return i;
      },
      m: function _mergeParams(r, a) {
        var e = r[0];
        var t = a[0];
        return [ M(dr(e), dr(t)).reduce((function(r, a) {
          r[a] = e[a] || t[a];
          return r;
        }), {}) ];
      }
    });
    var F = function setDirectionWhenViewportIsTarget(r) {
      if (C) {
        var a = Zr(m);
        pr(r, {
          Er: f !== a
        });
        pr(D, {
          B: a
        });
        f = a;
      }
    };
    var N = function updateViewportAttrsFromHost(r) {
      each(r || h, (function(r) {
        if (V(h, r)) {
          var a = mr(S, r);
          if (x(a)) {
            Sr(y, r, a);
          } else {
            yr(y, r);
          }
        }
      }));
    };
    var U = function onTrinsicChanged(r, a) {
      var e = r[0], t = r[1];
      var v = {
        Tr: t
      };
      pr(D, {
        Cr: e
      });
      !a && n(v);
      return v;
    };
    var B = function onSizeChanged(r) {
      var a = r.gr, e = r.hr, t = r._r;
      var v = a && !t && !e;
      var i = !v && s ? j : n;
      var o = e || [], u = o[0], c = o[1];
      var f = {
        gr: a || t,
        _r: t,
        Er: c
      };
      F(f);
      e && pr(D, {
        B: u
      });
      i(f);
    };
    var Y = function onContentMutation(r, a) {
      var e = L(), t = e[1];
      var v = {
        Ar: t
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
    var X = w ? $e(S, U) : [], G = X[0], K = X[1];
    var Z = !C && Ze(S, B, {
      _r: true,
      pr: true
    });
    var $ = Ke(S, false, W, {
      ur: b,
      ir: M(b, h)
    }), J = $[0], Q = $[1];
    var rr = C && _ && new _((function(r) {
      var a = r[r.length - 1].contentRect;
      B({
        gr: true,
        _r: ua(a, c)
      });
      c = a;
    }));
    return [ function() {
      N();
      rr && rr.observe(S);
      var r = Z && Z();
      var a = G && G();
      var e = J();
      var t = q((function(r) {
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
        t();
      };
    }, function(r) {
      var a = r.Dr, e = r.Rr, t = r.zr;
      var n = {};
      var c = a("update.ignoreMutation"), f = c[0];
      var l = a("update.attributes"), s = l[0], _ = l[1];
      var h = a("update.elementEvents"), g = h[0], b = h[1];
      var m = a("update.debounce"), S = m[0], O = m[1];
      var x = b || _;
      var T = e || t;
      var P = function ignoreMutationFromOptions(r) {
        return A(f) && f(r);
      };
      if (x) {
        o && o();
        u && u();
        var D = Ke(w || y, true, Y, {
          ir: M(k, s || []),
          cr: g,
          lr: d,
          dr: function _ignoreContentChange(r, a) {
            var e = r.target, t = r.attributeName;
            var n = !a && t && !C ? Vr(e, d, p) : false;
            return n || !!kr(e, "." + Qa) || !!P(r);
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
      if (T) {
        var V = Q();
        var N = K && K();
        var B = o && o();
        V && pr(n, W(V[0], V[1], T));
        N && pr(n, U(N[0], T));
        B && pr(n, Y(B[0], T));
      }
      F(n);
      return n;
    }, D ];
  };
  var Qe = function createScrollbarsSetupElements(r, a, e, t) {
    var n = je(), v = n.rr, i = n.$;
    var o = v(), u = o.scrollbars;
    var c = u.slot;
    var l = a.br, s = a.mr, d = a.I, p = a.Ir, _ = a.Lr, g = a.kr, b = a.M;
    var m = p ? {} : r, S = m.scrollbars;
    var y = S || {}, w = y.slot;
    var O = new Map;
    var C = function initScrollTimeline(r) {
      return h && new h({
        source: _,
        axis: r
      });
    };
    var E = C("x");
    var x = C("y");
    var A = Ue([ l, s, d ], (function() {
      return b && g ? l : s;
    }), c, w);
    var H = function getScrollbarHandleLengthRatio(r, a) {
      if (a) {
        var t = r ? rr : ar;
        var n = a.Vr, v = a.Mr;
        var i = ia(v)[t];
        var o = ia(n)[t];
        return gr(0, 1, i / o || 0);
      }
      var u = r ? "x" : "y";
      var c = e.jr, f = e.Fr;
      var l = f[u];
      var s = c[u];
      return gr(0, 1, l / (l + s) || 0);
    };
    var P = function getScrollbarHandleOffsetRatio(r, a, e, t) {
      var n = H(e, r);
      return 1 / n * (1 - n) * (t ? 1 - a : a) || 0;
    };
    var D = function addDirectionRTLKeyframes(r, a) {
      return pr(r, a ? {
        clear: [ "left" ]
      } : {});
    };
    var R = function cancelElementAnimations(r) {
      O.forEach((function(a, e) {
        var t = r ? V(N(r), e) : true;
        if (t) {
          each(a || [], (function(r) {
            r && r.cancel();
          }));
          O.delete(e);
        }
      }));
    };
    var z = function setElementAnimation(r, a, e, t) {
      var n = O.get(r) || [];
      var v = n.find((function(r) {
        return r && r.timeline === a;
      }));
      if (v) {
        v.effect = new KeyframeEffect(r, e, {
          composite: t
        });
      } else {
        O.set(r, M(n, [ r.animate(e, {
          timeline: a,
          composite: t
        }) ]));
      }
    };
    var I = function scrollbarStructureAddRemoveClass(r, a, e) {
      var t = e ? Hr : Ar;
      each(r, (function(r) {
        t(r.Nr, a);
      }));
    };
    var L = function scrollbarStyle(r, a) {
      each(r, (function(r) {
        var e = a(r), t = e[0], n = e[1];
        setStyles(t, n);
      }));
    };
    var k = function scrollbarStructureRefreshHandleLength(r, a) {
      L(r, (function(r) {
        var e;
        var t = r.Mr;
        return [ t, (e = {}, e[a ? rr : ar] = Gr(H(a)), e) ];
      }));
    };
    var F = function scrollbarStructureRefreshHandleOffset(r, a) {
      var t = e.jr;
      var n = a ? t.x : t.y;
      var v = function getTransformValue(r, e, t) {
        return Jr(Gr(P(r, ga(e, n, t), a, t)), a);
      };
      if (E && x) {
        each(r, (function(r) {
          var e = r.Nr, t = r.Mr;
          var o = a && Zr(e) && i;
          z(t, a ? E : x, D({
            transform: ha(n, o).map((function(a) {
              return v(r, a, o);
            }))
          }, o));
        }));
      } else {
        var o = ma(_);
        L(r, (function(r) {
          var e = r.Mr, t = r.Nr;
          return [ e, {
            transform: v(r, a ? o.x : o.y, a && Zr(t) && i)
          } ];
        }));
      }
    };
    var B = function doRefreshScrollbarOffset(r) {
      return b && !g && Lr(r) === d;
    };
    var W = [];
    var q = [];
    var X = [];
    var G = function scrollbarsAddRemoveClass(r, a, e) {
      var t = T(e);
      var n = t ? e : true;
      var v = t ? !e : true;
      n && I(q, r, a);
      v && I(X, r, a);
    };
    var K = function refreshScrollbarsHandleLength() {
      k(q, true);
      k(X);
    };
    var Z = function refreshScrollbarsHandleOffset() {
      F(q, true);
      F(X);
    };
    var $ = function refreshScrollbarsScrollbarOffset() {
      if (b) {
        var r = e.jr;
        var a = .5;
        if (E && x) {
          each(M(X, q), (function(e) {
            var t = e.Nr;
            if (B(t)) {
              var n = function setScrollbarElementAnimation(r, e, n) {
                var v = n && Zr(t) && i;
                z(t, r, D({
                  transform: ha(e - a, v).map((function(r) {
                    return Jr(Kr(r), n);
                  }))
                }, v), "add");
              };
              n(E, r.x, true);
              n(x, r.y);
            } else {
              R(t);
            }
          }));
        } else {
          var t = ma(_);
          var n = function styleScrollbarPosition(a) {
            var e = a.Nr;
            var n = B(e) && e;
            var v = function getTranslateValue(r, a, e) {
              var t = ga(r, a, e);
              var n = a * t;
              return Kr(e ? -n : n);
            };
            return [ n, {
              transform: n ? Jr({
                x: v(t.x, r.x, Zr(e) && i),
                y: v(t.y, r.y)
              }) : ""
            } ];
          };
          L(q, n);
          L(X, n);
        }
      }
    };
    var J = function generateScrollbarDOM(r) {
      var a = r ? ae : ee;
      var e = r ? q : X;
      var n = U(e) ? oe : "";
      var v = Ur(Qa + " " + a + " " + n);
      var i = Ur(te);
      var o = Ur(ne);
      var u = {
        Nr: v,
        Vr: i,
        Mr: o
      };
      j(e, u);
      j(W, [ Fr(v, i), Fr(i, o), cr(Mr, v), R, t(u, G, F, r) ]);
      return u;
    };
    var Q = cr(J, true);
    var er = cr(J, false);
    var tr = function appendElements() {
      Fr(A, q[0].Nr);
      Fr(A, X[0].Nr);
      f((function() {
        G(oe);
      }), 300);
      return cr(Y, W);
    };
    Q();
    er();
    return [ {
      Ur: K,
      Br: Z,
      Yr: $,
      Wr: G,
      qr: {
        Z: E,
        Xr: q,
        Gr: Q,
        Kr: cr(L, q)
      },
      Zr: {
        Z: x,
        Xr: X,
        Gr: er,
        Kr: cr(L, X)
      }
    }, tr ];
  };
  var rt = function createScrollbarsSetupEvents(r, a, e) {
    var t = a.mr, n = a.Lr, v = a.$r;
    return function(a, o, u, c) {
      var f = a.Nr, l = a.Vr, s = a.Mr;
      var d = fr(333), p = d[0], _ = d[1];
      var h = fr(), g = h[0], b = h[1];
      var m = cr(u, [ a ], c);
      var S = !!n.scrollBy;
      var y = "client" + (c ? "X" : "Y");
      var w = c ? rr : ar;
      var O = c ? "left" : "top";
      var C = c ? "w" : "h";
      var E = c ? "x" : "y";
      var x = function isAffectingTransition(r) {
        return r.propertyName.indexOf(w) > -1;
      };
      var T = function createInteractiveScrollEvents() {
        var a = "pointerup pointerleave pointercancel lostpointercapture";
        var o = function createRelativeHandleMove(r, a) {
          return function(t) {
            var v;
            var i = e.jr;
            var o = ea(l)[C] - ea(s)[C];
            var u = a * t / o;
            var c = u * i[E];
            ba(n, (v = {}, v[E] = r + c, v));
          };
        };
        return fa(l, "pointerdown", (function(e) {
          var u = kr(e.target, "." + ne) === s;
          var c = u ? s : l;
          var f = r.scrollbars;
          var d = e.button, p = e.isPrimary, _ = e.pointerType;
          var h = f.pointers;
          var g = d === 0 && p && f[u ? "dragScroll" : "clickScroll"] && (h || []).includes(_);
          if (g) {
            var b = !u && e.shiftKey;
            var m = cr(ia, s);
            var S = cr(ia, l);
            var x = function getHandleOffset(r, a) {
              return (r || m())[O] - (a || S())[O];
            };
            var T = i(ia(n)[w]) / ea(n)[C] || 1;
            var A = o(ma(n)[E] || 0, 1 / T);
            var H = e[y];
            var P = m();
            var D = S();
            var R = P[w];
            var z = x(P, D) + R / 2;
            var I = H - D[O];
            var L = u ? 0 : I - z;
            var k = function releasePointerCapture(r) {
              Y(M);
              c.releasePointerCapture(r.pointerId);
            };
            var V = Cr(t, Da, La);
            var M = [ V, fa(v, a, k), fa(v, "selectstart", (function(r) {
              return sa(r);
            }), {
              A: false
            }), fa(l, a, k), fa(l, "pointermove", (function(r) {
              var a = r[y] - H;
              if (u || b) {
                A(L + a);
              }
            })) ];
            c.setPointerCapture(e.pointerId);
            if (b) {
              A(L);
            } else if (!u) {
              var F = me(Le);
              F && j(M, F(A, x, L, R, I));
            }
          }
        }));
      };
      var A = true;
      return cr(Y, [ fa(f, "pointerenter", (function() {
        o(ue, true);
      })), fa(f, "pointerleave pointercancel", (function() {
        o(ue, false);
      })), fa(f, "wheel", (function(r) {
        var a = r.deltaX, e = r.deltaY, v = r.deltaMode;
        if (S && A && v === 0 && Lr(f) === t) {
          n.scrollBy({
            left: a,
            top: e,
            behavior: "smooth"
          });
        }
        A = false;
        o(se, true);
        p((function() {
          A = true;
          o(se);
        }));
        sa(r);
      }), {
        A: false,
        H: true
      }), fa(s, "transitionstart", (function(r) {
        if (x(r)) {
          var a = function animateHandleOffset() {
            m();
            g(animateHandleOffset);
          };
          a();
        }
      })), fa(s, "transitionend transitioncancel", (function(r) {
        if (x(r)) {
          b();
          m();
        }
      })), fa(f, "mousedown", cr(fa, v, "click", la, {
        P: true,
        H: true
      }), {
        H: true
      }), T(), _, b ]);
    };
  };
  var at = function createScrollbarsSetup(r, a, e, t, n, v) {
    var i;
    var o;
    var u;
    var c;
    var f;
    var l = ur;
    var s = 0;
    var d = fr(), p = d[0], _ = d[1];
    var h = fr(), g = h[0], b = h[1];
    var m = fr(100), S = m[0], y = m[1];
    var w = fr(100), O = w[0], C = w[1];
    var E = fr(100), x = E[0], T = E[1];
    var A = fr((function() {
      return s;
    })), H = A[0], P = A[1];
    var D = Qe(r, n, t, rt(a, n, t)), R = D[0], z = D[1];
    var I = n.mr, L = n.Jr, k = n.kr;
    var V = R.Wr, M = R.Ur, F = R.Br, N = R.Yr;
    var U = function manageAutoHideSuspension(r) {
      V(fe, r, true);
      V(fe, r, false);
    };
    var B = function manageScrollbarsAutoHide(r, a) {
      P();
      if (r) {
        V(le);
      } else {
        var e = cr(V, le, true);
        if (s > 0 && !a) {
          H(e);
        } else {
          e();
        }
      }
    };
    var W = function isHoverablePointerType(r) {
      return r.pointerType === "mouse";
    };
    var q = function onHostMouseEnter(r) {
      if (W(r)) {
        c = o;
        c && B(true);
      }
    };
    var X = [ y, P, C, T, b, _, function() {
      return l();
    }, fa(I, "pointerover", q, {
      P: true
    }), fa(I, "pointerenter", q), fa(I, "pointerleave", (function(r) {
      if (W(r)) {
        c = false;
        o && B(false);
      }
    })), fa(I, "pointermove", (function(r) {
      W(r) && i && p((function() {
        y();
        B(true);
        O((function() {
          i && B(false);
        }));
      }));
    })), fa(L, "scroll", (function(r) {
      g((function() {
        F();
        u && B(true);
        S((function() {
          u && !c && B(false);
        }));
      }));
      v(r);
      N();
    })) ];
    return [ function() {
      return cr(Y, j(X, z()));
    }, function(r) {
      var a = r.Dr, n = r.zr, v = r.Qr, c = r.ra;
      var d = c || {}, p = d.aa, _ = d.ea, h = d.ta;
      var g = v || {}, b = g.Er, m = g._r;
      var S = e.B;
      var y = je(), w = y.R;
      var O = t.jr, C = t.L, E = t.na;
      var T = a("showNativeOverlaidScrollbars"), A = T[0], H = T[1];
      var P = a("scrollbars.theme"), D = P[0], R = P[1];
      var z = a("scrollbars.visibility"), I = z[0], j = z[1];
      var Y = a("scrollbars.autoHide"), W = Y[0], q = Y[1];
      var X = a("scrollbars.autoHideSuspend"), G = X[0], K = X[1];
      var Z = a("scrollbars.autoHideDelay"), $ = Z[0];
      var J = a("scrollbars.dragScroll"), Q = J[0], rr = J[1];
      var ar = a("scrollbars.clickScroll"), er = ar[0], tr = ar[1];
      var nr = m && !n;
      var vr = E.x || E.y;
      var ir = p || _ || b || n;
      var or = h || j;
      var ur = A && w.x && w.y;
      var fr = function setScrollbarVisibility(r, a) {
        var e = I === "visible" || I === "auto" && r === "scroll";
        V(ve, e, a);
        return e;
      };
      s = $;
      if (nr) {
        if (G && vr) {
          U(false);
          l();
          x((function() {
            l = fa(L, "scroll", cr(U, true), {
              P: true
            });
          }));
        } else {
          U(true);
        }
      }
      if (H) {
        V(Ja, ur);
      }
      if (R) {
        V(f);
        V(D, true);
        f = D;
      }
      if (K && !G) {
        U(true);
      }
      if (q) {
        i = W === "move";
        o = W === "leave";
        u = W !== "never";
        B(!u, true);
      }
      if (rr) {
        V(pe, Q);
      }
      if (tr) {
        V(de, er);
      }
      if (or) {
        var lr = fr(C.x, true);
        var sr = fr(C.y, false);
        var dr = lr && sr;
        V(ie, !dr);
      }
      if (ir) {
        M();
        F();
        N();
        V(ce, !O.x, true);
        V(ce, !O.y, false);
        V(re, S && !k);
      }
    }, {}, R ];
  };
  var et = function createStructureSetupElements(r) {
    var a = je();
    var e = a.rr, t = a.j;
    var n = e(), v = n.elements;
    var i = v.host, o = v.padding, u = v.viewport, c = v.content;
    var f = z(r);
    var l = f ? {} : r;
    var s = l.elements;
    var d = s || {}, p = d.host, _ = d.padding, h = d.viewport, g = d.content;
    var b = f ? r : l.target;
    var m = zr(b, "textarea");
    var S = b.ownerDocument;
    var y = S.documentElement;
    var w = b === S.body;
    var O = S.defaultView;
    var C = function getFocusedElement() {
      return S.activeElement;
    };
    var E = function focusElm(r) {
      if (r && r.focus) {
        r.focus();
      }
    };
    var x = cr(Ne, [ b ]);
    var T = cr(Ue, [ b ]);
    var A = cr(Fe, [ b ]);
    var H = cr(Ur, "");
    var P = cr(x, H, u);
    var D = cr(T, H, c);
    var R = P(h);
    var I = R === b;
    var L = I && w;
    var k = !I && D(g);
    var M = !I && z(R) && R === k;
    var F = M && !!A(c);
    var N = F ? P() : R;
    var U = F ? k : D();
    var B = M ? N : R;
    var W = L ? y : B;
    var q = m ? x(H, i, p) : b;
    var X = L ? W : q;
    var G = M ? U : k;
    var K = {
      br: b,
      mr: X,
      I: W,
      va: !I && T(H, o, _),
      Sr: G,
      Lr: L ? y : W,
      Jr: L ? S : W,
      ia: w ? y : b,
      oa: O,
      $r: S,
      yr: m,
      kr: w,
      Ir: f,
      M: I,
      ua: M,
      wr: function _viewportHasClass(r) {
        return xr(W, I ? Da : Ma, r);
      },
      Or: function _viewportAddRemoveClass(r, a) {
        return Er(W, I ? Da : Ma, r, a);
      }
    };
    var Z = dr(K).reduce((function(r, a) {
      var e = K[a];
      return j(r, e && z(e) && !Lr(e) ? e : false);
    }), []);
    var $ = function elementIsGenerated(r) {
      return r ? V(Z, r) : null;
    };
    var J = K.br, Q = K.mr, rr = K.va, ar = K.I, er = K.Sr;
    var tr = [ function() {
      yr(Q, [ Da, Pa ]);
      yr(J, Pa);
      if (w) {
        yr(y, [ Pa, Da ]);
      }
    } ];
    var nr = m && $(Q);
    var vr = m ? J : Ir([ er, ar, rr, Q, J ].find((function(r) {
      return $(r) === false;
    })));
    var ir = L ? J : er || ar;
    var or = cr(Y, tr);
    var fr = function appendElements() {
      var r = C();
      var a = function unwrap(r) {
        Fr(Lr(r), Ir(r));
        Mr(r);
      };
      var e = function prepareWrapUnwrapFocus(r) {
        return r ? fa(r, "focus blur", (function(r) {
          la(r);
          r.stopImmediatePropagation();
        }), {
          H: true,
          A: false
        }) : ur;
      };
      var n = e(r);
      Sr(Q, Da, I ? "viewport" : "host");
      Sr(rr, Ua, "");
      Sr(er, Ya, "");
      if (!I) {
        Sr(ar, Ma, "");
        w && Cr(y, Da, Va);
      }
      if (nr) {
        Nr(J, Q);
        j(tr, (function() {
          Nr(Q, J);
          Mr(Q);
        }));
      }
      Fr(ir, vr);
      Fr(Q, rr);
      Fr(rr || Q, !I && ar);
      Fr(ar, er);
      j(tr, [ n, function() {
        var r = C();
        var t = e(r);
        yr(rr, Ua);
        yr(er, Ya);
        yr(ar, [ Ra, za, Ma ]);
        $(er) && a(er);
        $(ar) && a(ar);
        $(rr) && a(rr);
        E(r);
        t();
      } ]);
      if (t && !I) {
        Cr(ar, Ma, Fa);
        j(tr, cr(yr, ar, Ma));
      }
      if (!I && O.top === O && r === b) {
        var v = "tabindex";
        var i = mr(ar, v);
        Sr(ar, v, "-1");
        E(ar);
        var o = function revertViewportTabIndex() {
          return i ? Sr(ar, v, i) : yr(ar, v);
        };
        var u = fa(S, "pointerdown keydown", (function() {
          o();
          u();
        }));
        j(tr, [ o, u ]);
      } else {
        E(r);
      }
      n();
      vr = 0;
      return or;
    };
    return [ K, fr, or ];
  };
  var tt = function createTrinsicUpdateSegment(r) {
    var a = r.Sr;
    return function(r) {
      var e = r.Qr, t = r.ca, n = r.zr;
      var v = e || {}, i = v.Tr;
      var o = t.Cr;
      var u = a && (i || n);
      if (u) {
        var c;
        setStyles(a, (c = {}, c[ar] = o && "100%", c));
      }
    };
  };
  var nt = function createPaddingUpdateSegment(r, e) {
    var t = r.mr, n = r.va, v = r.I, i = r.M;
    var o = a({
      o: or,
      v: $r()
    }, cr($r, t, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var a = r.Dr, t = r.Qr, o = r.ca, f = r.zr;
      var l = c(f), s = l[0], d = l[1];
      var p = je(), _ = p.j;
      var h = t || {}, g = h.gr, b = h.Ar, m = h.Er;
      var S = o.B;
      var y = a("paddingAbsolute"), w = y[0], O = y[1];
      var C = f || b;
      if (g || d || C) {
        var E = u(f);
        s = E[0];
        d = E[1];
      }
      var x = !i && (O || m || d);
      if (x) {
        var T, A;
        var H = !w || !n && !_;
        var P = s.r + s.l;
        var D = s.t + s.b;
        var R = (T = {}, T[Z] = H && !S ? -P : 0, T[$] = H ? -D : 0, T[K] = H && S ? -P : 0, 
        T.top = H ? -s.t : 0, T.right = H ? S ? -s.r : "auto" : 0, T.left = H ? S ? "auto" : -s.l : 0, 
        T[rr] = H && "calc(100% + " + P + "px)", T);
        var z = (A = {}, A[W] = H ? s.t : 0, A[q] = H ? s.r : 0, A[G] = H ? s.b : 0, A[X] = H ? s.l : 0, 
        A);
        setStyles(n || v, R);
        setStyles(v, z);
        pr(e, {
          va: s,
          fa: !H,
          Y: n ? z : pr({}, R, z)
        });
      }
      return {
        la: x
      };
    };
  };
  var vt = function createOverflowUpdateSegment(r, e) {
    var v = je();
    var i = r.mr, o = r.va, u = r.I, c = r.M, f = r.Or, l = r.kr, s = r.oa;
    var d = v.j, p = v.R;
    var _ = l && c;
    var h = cr(n, 0);
    var g = {
      o: vr,
      v: {
        w: 0,
        h: 0
      }
    };
    var b = {
      o: ir,
      v: {
        x: er,
        y: er
      }
    };
    var m = function getOverflowAmount(r, a) {
      var e = t.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var n = {
        w: h(r.w - a.w),
        h: h(r.h - a.h)
      };
      return {
        w: n.w > e ? n.w : 0,
        h: n.h > e ? n.h : 0
      };
    };
    var S = a(g, cr(va, u)), y = S[0], w = S[1];
    var O = a(g, cr(na, u)), C = O[0], E = O[1];
    var x = a(g), T = x[0], A = x[1];
    var H = a(g), P = H[0], D = H[1];
    var R = a(b), z = R[0];
    var I = me(ze);
    return function(a, t) {
      var l = a.Dr, g = a.Qr, b = a.ca, S = a.zr;
      var O = t.la;
      var x = g || {}, H = x.gr, R = x.Hr, L = x.Ar, k = x.Tr, V = x.Er, M = x.Pr;
      var j = b.Cr;
      var F = I && I.V(r, e, b, v, l);
      var N = F || {}, U = N.q, B = N.X, Y = N.G, W = N.W;
      var q = function fixFlexboxGlue(r, a) {
        var t;
        setStyles(u, (t = {}, t[ar] = "", t));
        if (a) {
          var n;
          var v = e.fa, o = e.va;
          var c = r.k;
          var f = va(i);
          var l = ta(i);
          var s = getStyles(u, "boxSizing") === "content-box";
          var d = v || s ? o.b + o.t : 0;
          var _ = !(p.x && s);
          setStyles(u, (n = {}, n[ar] = l.h + f.h + (c.x && _ && W ? W(r).N.x : 0) - d, n));
        }
      };
      var X = He(l, v), G = X[0], K = X[1];
      var Z = l("overflow"), $ = Z[0], rr = Z[1];
      var er = !c && (H || L || R || K || k);
      var tr = H || O || L || V || M || K;
      var nr = Pe($.x);
      var vr = Pe($.y);
      var ir = nr || vr;
      var or = w(S);
      var ur = E(S);
      var cr = A(S);
      var fr = D(S);
      var lr;
      if (K && d) {
        f(Fa, !G);
      }
      if (er) {
        lr = De(r);
        q(lr, j);
      }
      if (tr) {
        if (ir) {
          f(Na, false);
        }
        var sr = B ? B(lr) : [], dr = sr[0], _r = sr[1];
        var hr = or = y(S), gr = hr[0], br = hr[1];
        var mr = ur = C(S), yr = mr[0], wr = mr[1];
        var Or = ta(u);
        var Cr = yr;
        var xr = Or;
        dr && dr();
        if ((wr || br || K) && _r && !G && U && U(_r, yr, gr)) {}
        var Tr = aa(s);
        var Ar = {
          w: h(n(yr.w, Cr.w) + gr.w),
          h: h(n(yr.h, Cr.h) + gr.h)
        };
        var Hr = {
          w: h((_ ? Tr.w : xr.w + h(Or.w - yr.w)) + gr.w),
          h: h((_ ? Tr.h : xr.h + h(Or.h - yr.h)) + gr.h)
        };
        fr = P(Hr);
        cr = T(m(Ar, Hr), S);
      }
      var Pr = fr, Dr = Pr[0], Rr = Pr[1];
      var zr = cr, Ir = zr[0], Lr = zr[1];
      var kr = ur, Vr = kr[0], Mr = kr[1];
      var jr = or, Fr = jr[0], Nr = jr[1];
      var Ur = {
        x: Ir.w > 0,
        y: Ir.h > 0
      };
      var Br = nr && vr && (Ur.x || Ur.y) || nr && Ur.x && !Ur.y || vr && Ur.y && !Ur.x;
      var Yr = O || V || M || Nr || Mr || Rr || Lr || rr || K || er || tr;
      if (Yr) {
        var Wr = {};
        var qr = Re(r, Ur, $, Wr);
        Y && Y(qr, b, !!U && U(qr, Vr, Fr), Wr);
        if (er) {
          q(qr, j);
        }
        if (c) {
          Sr(i, Ra, Wr[J]);
          Sr(i, za, Wr[Q]);
        } else {
          setStyles(u, Wr);
        }
      }
      Er(i, Da, Ia, Br);
      Er(o, Ua, Ba, Br);
      if (!c) {
        Er(u, Ma, Na, ir);
      }
      var Xr = z(De(r).L), Gr = Xr[0], Kr = Xr[1];
      pr(e, {
        L: Gr,
        Fr: {
          x: Dr.w,
          y: Dr.h
        },
        jr: {
          x: Ir.w,
          y: Ir.h
        },
        na: Ur
      });
      return {
        ta: Kr,
        aa: Rr,
        ea: Lr
      };
    };
  };
  var it = function createStructureSetup(r) {
    var a;
    var e = et(r), t = e[0], n = e[1], v = e[2];
    var i = {
      va: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      fa: false,
      Y: (a = {}, a[Z] = 0, a[$] = 0, a[K] = 0, a[W] = 0, a[q] = 0, a[G] = 0, a[X] = 0, 
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
    var o = t.br, u = t.I, c = t.M;
    var f = je(), l = f.j, s = f.R;
    var d = !l && (s.x || s.y);
    var p = [ tt(t), nt(t, i), vt(t, i) ];
    return [ n, function(r) {
      var a = {};
      var e = d;
      var t = e && ma(u);
      var n = c ? Cr(u, Da, ka) : ur;
      each(p, (function(e) {
        pr(a, e(r, a) || {});
      }));
      n();
      ba(u, t);
      !c && ba(o, 0);
      return a;
    }, i, t, v ];
  };
  var ot = function createSetups(r, a, e, t) {
    var n = xa(a, {});
    var v = it(r), i = v[0], o = v[1], u = v[2], c = v[3], f = v[4];
    var l = Je(c, u, n, (function(r) {
      S({}, r);
    })), s = l[0], d = l[1], p = l[2];
    var _ = at(r, a, p, u, c, t), h = _[0], g = _[1], b = _[3];
    var m = function updateHintsAreTruthy(r) {
      return dr(r).some((function(a) {
        return !!r[a];
      }));
    };
    var S = function update(r, t) {
      var n = r.sa, v = r.zr, i = r.Rr, u = r.da;
      var c = n || {};
      var f = !!v;
      var l = {
        Dr: xa(a, c, f),
        sa: c,
        zr: f
      };
      if (u) {
        g(l);
        return false;
      }
      var s = t || d(pr({}, l, {
        Rr: i
      }));
      var _ = o(pr({}, l, {
        ca: p,
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
      var t = [ s(), i(), h() ];
      ba(a, e);
      return cr(Y, t);
    }, S, function() {
      return {
        pa: p,
        _a: u
      };
    }, {
      ha: c,
      ga: b
    }, f ];
  };
  var ut = function OverlayScrollbars(r, a, e) {
    var t = je(), n = t.er;
    var v = z(r);
    var i = v ? r : r.target;
    var o = Xe(i);
    if (a && !o) {
      var u = false;
      var c = [];
      var f = {};
      var l = function validateOptions(r) {
        var a = _r(r, true);
        var e = me(xe);
        return e ? e(a, true) : a;
      };
      var s = pr({}, n(), l(a));
      var d = ya(), p = d[0], _ = d[1], h = d[2];
      var g = ya(e), b = g[0], m = g[1], S = g[2];
      var y = function triggerEvent(r, a) {
        S(r, a);
        h(r, a);
      };
      var w = ot(r, s, (function(r, a) {
        var e = r.sa, t = r.zr;
        var n = a.Qr, v = a.ra;
        var i = n.gr, o = n.Er, u = n.Tr, c = n.Ar, f = n.Hr, l = n._r;
        var s = v.aa, d = v.ea, p = v.ta;
        y("updated", [ H, {
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
          force: !!t
        } ]);
      }), (function(r) {
        return y("scroll", [ H, r ]);
      })), O = w[0], C = w[1], E = w[2], x = w[3], T = w[4];
      var A = function destroy(r) {
        qe(i);
        Y(c);
        u = true;
        y("destroyed", [ H, r ]);
        _();
        m();
      };
      var H = {
        options: function options(r, a) {
          if (r) {
            var e = a ? n() : {};
            var t = Ea(s, pr(e, l(r)));
            if (!hr(t)) {
              pr(s, t);
              C({
                sa: t
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
          var r = E(), a = r.pa, e = r._a;
          var t = a.B;
          var n = e.Fr, v = e.jr, i = e.L, o = e.na, c = e.va, f = e.fa;
          return pr({}, {
            overflowEdge: n,
            overflowAmount: v,
            overflowStyle: i,
            hasOverflow: o,
            padding: c,
            paddingAbsolute: f,
            directionRTL: t,
            destroyed: u
          });
        },
        elements: function elements() {
          var r = x.ha, a = r.br, e = r.mr, t = r.va, n = r.I, v = r.Sr, i = r.Lr, o = r.Jr;
          var u = x.ga, c = u.qr, f = u.Zr;
          var l = function translateScrollbarStructure(r) {
            var a = r.Mr, e = r.Vr, t = r.Nr;
            return {
              scrollbar: t,
              track: e,
              handle: a
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var a = r.Xr, e = r.Gr;
            var t = l(a[0]);
            return pr({}, t, {
              clone: function clone() {
                var r = l(e());
                C({
                  da: true
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
            scrollbarVertical: s(f)
          });
        },
        update: function update(r) {
          return C({
            zr: r,
            Rr: true
          });
        },
        destroy: cr(A, false),
        plugin: function plugin(r) {
          return f[dr(r)[0]];
        }
      };
      j(c, [ T ]);
      We(i, H);
      be(_e, OverlayScrollbars, [ H, p, f ]);
      if (Be(x.ha.kr, !v && r.cancel)) {
        A(true);
        return H;
      }
      j(c, O());
      y("initialized", [ H ]);
      H.update(true);
      return H;
    }
    return o;
  };
  ut.plugin = function(r) {
    var a = H(r);
    var e = a ? r : [ r ];
    var t = e.map((function(r) {
      return be(r, ut)[0];
    }));
    ge(e);
    return a ? t : t[0];
  };
  ut.valid = function(r) {
    var a = r && r.elements;
    var e = A(a) && a();
    return R(e) && !!Xe(e.target);
  };
  ut.env = function() {
    var r = je(), a = r.F, e = r.R, t = r.j, n = r.$, v = r.Z, i = r.nr, o = r.vr, u = r.rr, c = r.ar, f = r.er, l = r.tr;
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
      getDefaultOptions: f,
      setDefaultOptions: l
    });
  };
  r.ClickScrollPlugin = ke;
  r.OverlayScrollbars = ut;
  r.ScrollbarsHidingPlugin = Ie;
  r.SizeObserverPlugin = Ae;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
