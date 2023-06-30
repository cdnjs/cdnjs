import { h as Be, render as R1, defineComponent as H, ref as L, reactive as oe, inject as re, withDirectives as ue, openBlock as h, createElementBlock as _, createVNode as M, unref as i, normalizeClass as P, Transition as Ee, withCtx as S, createElementVNode as s, createCommentVNode as N, createTextVNode as ae, toDisplayString as Y, nextTick as ge, pushScopeId as Q, popScopeId as G, computed as Z, renderSlot as ie, createBlock as K, resolveComponent as te, watch as de, createSlots as Y1, useCssVars as Te, normalizeStyle as ke, onMounted as he, vShow as Me, toRefs as Oe, withKeys as je, Fragment as X, renderList as ne, onUnmounted as Fe, toRef as a1, withModifiers as n1, vModelText as N1, provide as ye, useSlots as q1 } from "vue";
import { ElButton as Ue, ClickOutside as l1, ElLink as s1, ElInfiniteScroll as P1, ElDialog as W1, ElForm as Z1, ElFormItem as Ce, ElInput as Se, ElScrollbar as Re, ElCarousel as K1, ElPopover as Ke, ElImage as i1, ElAvatar as Ye, ElTag as J1, ElPagination as X1 } from "element-plus";
import { ElAvatar as d6, ElButton as v6, ElCarousel as p6, ElDialog as h6, ElDropdown as f6, ElDropdownItem as m6, ElDropdownMenu as g6, ElImage as _6, ElInput as w6, ElLink as y6, ElPagination as x6, ElPopover as b6, ElScrollbar as $6, ElTag as C6, ElInfiniteScroll as k6 } from "element-plus";
function Q1(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function yt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function xt(e) {
  return !isNaN(Number(e));
}
function X8(e) {
  return typeof e == "function";
}
function Q8(e) {
  return typeof e == "string";
}
function G8(e) {
  return typeof e == "boolean";
}
function Ze(e) {
  return Q1(e) ? e.length === 0 : yt(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const Pe = (e, l) => Ze(e) ? l : e, $e = (e) => Object.prototype.toString.call(e), bt = (e) => $e(e) === "[object String]" && typeof e == "object" && e.charAt, $t = (e) => $e(e) === "[object Number]" && typeof e == "object", Ct = (e) => $e(e) === "[object Boolean]" && typeof e == "object", kt = (e) => $e(e) === "[object Map]", Mt = (e) => $e(e) === "[object Set]", zt = (e) => $e(e) === "[object Object]", Lt = (e) => $e(e) === "[object Function]", St = (e) => $e(e) === "[object RegExp]", Ft = (e) => $e(e) === "[object Date]", Tt = (e) => $e(e) === "[object DataView]", Ht = (e) => Array.isArray(e), Vt = (e) => /^\[object (((Big)?(Int|Uint|Float)\d+)?(Clamped|Shared)?Array(Buffer)?|Blob)\]$/.test($e(e)), It = (e) => new String(e), Bt = (e) => new Number(e), At = (e) => new Boolean(e.toString() === "true"), Dt = (e) => new Date(e), Et = (e) => new Set(e), Ot = (e) => new Map(e), jt = (e) => new RegExp(e), Ut = (e) => new Function("return " + e.toString())(), Rt = (e) => new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength), Yt = (e) => e.slice(0), Nt = (e) => {
  const l = [];
  return e.forEach((n, t) => {
    l.push(We(n, l, t));
  }), l;
}, qt = (e) => {
  const l = Object.getOwnPropertyDescriptors(e), n = {};
  return Object.keys(l).forEach((o) => {
    const r = l[o];
    !r.writable || !r.configurable || !r.enumerable ? Object.defineProperty(n, o, Object.assign({}, r, { value: We(r.value, n, o) })) : n[o] = We(e[o], n, o);
  }), Object.getOwnPropertySymbols(e).forEach((o, r) => {
    n[o] = We(e[o], n, o);
  }), n;
};
let h1 = [], f1 = [];
const We = (e, l, n) => {
  let t = {
    original: e,
    copy: void 0
  };
  const a = h1.find((o) => o.original === e);
  return a ? (t = a, f1.push({
    target: l,
    key: n,
    catchItem: t
  }), a.copy) : (h1.push(t), bt(e) ? t.copy = It(e) : $t(e) ? t.copy = Bt(e) : Ct(e) ? t.copy = At(e) : Mt(e) ? t.copy = Et(e) : kt(e) ? t.copy = Ot(e) : Lt(e) ? t.copy = Ut(e) : zt(e) ? t.copy = qt(e) : Ht(e) ? t.copy = Nt(e) : St(e) ? t.copy = jt(e) : Ft(e) ? t.copy = Dt(e) : Tt(e) ? t.copy = Rt(e) : Vt(e) ? t.copy = Yt(e) : t.copy = e, t.copy);
}, Pt = (e) => {
  const l = We(e);
  return f1.forEach((n) => {
    n.target[n.key] = n.catchItem.copy;
  }), h1 = [], f1 = [], l;
};
function e6(e, { parentId: l = "parentId", children: n = "children" }) {
  e = Pt(e);
  const t = [], a = {};
  return e.forEach((o) => a[o.id] = o), e.forEach((o) => {
    const r = a[o[l]];
    r ? (r[n] || (r[n] = [])).push(o) : t.push(o);
  }), t;
}
function t6(e = [], { parentId: l = "parentId", children: n = "children" }) {
  const t = [], a = (o, r) => {
    o.forEach((c) => {
      c.id || (c.id = r++), c[l] = r, t.push(c), c[n] && Q1(c[n]) && a(c[n], c.id);
    });
  };
  return a(e || [], null), t;
}
const n6 = (e, l = 1 / 0) => e.flat(l), fe = (e, l) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(l ?? {})])
      n.component(t.name, t);
  }, l)
    for (const [n, t] of Object.entries(l))
      e[n] = t;
  return e;
};
function o6() {
  const { clientWidth: e } = document.documentElement, l = navigator.userAgent.toLowerCase();
  let n = (l.match(/firefox|chrome|safari|opera/g) || "other")[0];
  (l.match(/msie|trident/g) || [])[0] && (n = "msie");
  let t = "";
  "ontouchstart" in window || l.indexOf("touch") !== -1 || l.indexOf("mobile") !== -1 ? l.indexOf("ipad") !== -1 ? t = "pad" : l.indexOf("mobile") !== -1 ? t = "mobile" : l.indexOf("android") !== -1 ? t = "androidPad" : t = "pc" : t = "pc";
  let o = "";
  switch (n) {
    case "chrome":
    case "safari":
    case "mobile":
      o = "webkit";
      break;
    case "msie":
      o = "ms";
      break;
    case "firefox":
      o = "Moz";
      break;
    case "opera":
      o = "O";
      break;
    default:
      o = "webkit";
      break;
  }
  const r = l.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let c = "full";
  e < 768 ? c = "xs" : e < 992 ? c = "sm" : e < 1200 ? c = "md" : e < 1920 ? c = "xl" : c = "full";
  const w = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), p = (l.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], d = t === "pc", u = !d, v = c === "xs" || u, f = window.innerHeight + "px";
  return {
    version: p,
    type: n,
    plat: r,
    tag: t,
    prefix: o,
    isMobile: u,
    isIOS: w,
    isPC: d,
    isMini: v,
    screen: c,
    innerHeight: f
  };
}
function Wt(e, l) {
  const n = Be(e, l), t = document.createElement("div");
  return document.body.append(t), R1(n, t), { vnode: n, div: t };
}
function Zt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const r1 = (e) => e ? "localStorage" : "sessionStorage", Kt = (e, l, n = !0) => {
  (l === "" || l === null || l === void 0) && (l = null), window[r1(n)].setItem(e, JSON.stringify(l));
}, Jt = (e, l = !0) => {
  let n;
  const t = window[r1(l)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Xt = (e, l = !0) => {
  window[r1(l)].removeItem(e);
}, Qt = (e = !0) => {
  window[r1(e)].clear();
}, e1 = {
  set: Kt,
  get: Jt,
  remove: Xt,
  clear: Qt
}, Gt = (e, l = 200, n = !1) => {
  let t = !1, a = null;
  const o = (...r) => new Promise((c, w) => {
    if (a && clearTimeout(a), n && !t) {
      const p = e.apply(void 0, r);
      c(p), t = !0;
    } else
      a = setTimeout(() => {
        const p = e.apply(void 0, r);
        c(p), t = !1, a = null;
      }, l);
  });
  return o.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, o;
}, a6 = (e, l = 500) => {
  let n = 0;
  const t = (...a) => new Promise((o, r) => {
    const c = (/* @__PURE__ */ new Date()).getTime();
    if (c - n >= l) {
      const w = e.apply(void 0, a);
      o(w), n = c;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, Ve = (e) => e == null ? "" : String(e);
function e2(e) {
  let l = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return l.indexOf(t.toLowerCase()) != -1;
}
function t2(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function l6(e) {
  const l = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, o) => l.append(n + `[${o}]`, a)) : l.append(n, e[n]);
  }), l;
}
function s6(e) {
  return Object.keys(e).filter((l) => e[l] !== null && e[l] !== void 0).reduce((l, n) => ({ ...l, [n]: e[n] }), {});
}
var x1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, o1 = {}, n2 = {
  get exports() {
    return o1;
  },
  set exports(e) {
    o1 = e;
  }
};
(function(e, l) {
  (function(n, t) {
    e.exports = t();
  })(x1, function() {
    var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", r = "second", c = "minute", w = "hour", p = "day", d = "week", u = "month", v = "quarter", f = "year", g = "date", m = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(V) {
      var k = ["th", "st", "nd", "rd"], y = V % 100;
      return "[" + V + (k[(y - 20) % 10] || k[y] || k[0]) + "]";
    } }, D = function(V, k, y) {
      var I = String(V);
      return !I || I.length >= k ? V : "" + Array(k + 1 - I.length).join(y) + V;
    }, T = { s: D, z: function(V) {
      var k = -V.utcOffset(), y = Math.abs(k), I = Math.floor(y / 60), $ = y % 60;
      return (k <= 0 ? "+" : "-") + D(I, 2, "0") + ":" + D($, 2, "0");
    }, m: function V(k, y) {
      if (k.date() < y.date())
        return -V(y, k);
      var I = 12 * (y.year() - k.year()) + (y.month() - k.month()), $ = k.clone().add(I, u), E = y - $ < 0, A = k.clone().add(I + (E ? -1 : 1), u);
      return +(-(I + (y - $) / (E ? $ - A : A - $)) || 0);
    }, a: function(V) {
      return V < 0 ? Math.ceil(V) || 0 : Math.floor(V);
    }, p: function(V) {
      return { M: u, y: f, w: d, d: p, D: g, h: w, m: c, s: r, ms: o, Q: v }[V] || String(V || "").toLowerCase().replace(/s$/, "");
    }, u: function(V) {
      return V === void 0;
    } }, C = "en", z = {};
    z[C] = B;
    var F = function(V) {
      return V instanceof _e;
    }, U = function V(k, y, I) {
      var $;
      if (!k)
        return C;
      if (typeof k == "string") {
        var E = k.toLowerCase();
        z[E] && ($ = E), y && (z[E] = y, $ = E);
        var A = k.split("-");
        if (!$ && A.length > 1)
          return V(A[0]);
      } else {
        var R = k.name;
        z[R] = k, $ = R;
      }
      return !I && $ && (C = $), $ || !I && C;
    }, O = function(V, k) {
      if (F(V))
        return V.clone();
      var y = typeof k == "object" ? k : {};
      return y.date = V, y.args = arguments, new _e(y);
    }, j = T;
    j.l = U, j.i = F, j.w = function(V, k) {
      return O(V, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
    };
    var _e = function() {
      function V(y) {
        this.$L = U(y.locale, null, !0), this.parse(y);
      }
      var k = V.prototype;
      return k.parse = function(y) {
        this.$d = function(I) {
          var $ = I.date, E = I.utc;
          if ($ === null)
            return /* @__PURE__ */ new Date(NaN);
          if (j.u($))
            return /* @__PURE__ */ new Date();
          if ($ instanceof Date)
            return new Date($);
          if (typeof $ == "string" && !/Z$/i.test($)) {
            var A = $.match(b);
            if (A) {
              var R = A[2] - 1 || 0, W = (A[7] || "0").substring(0, 3);
              return E ? new Date(Date.UTC(A[1], R, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, W)) : new Date(A[1], R, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, W);
            }
          }
          return new Date($);
        }(y), this.$x = y.x || {}, this.init();
      }, k.init = function() {
        var y = this.$d;
        this.$y = y.getFullYear(), this.$M = y.getMonth(), this.$D = y.getDate(), this.$W = y.getDay(), this.$H = y.getHours(), this.$m = y.getMinutes(), this.$s = y.getSeconds(), this.$ms = y.getMilliseconds();
      }, k.$utils = function() {
        return j;
      }, k.isValid = function() {
        return this.$d.toString() !== m;
      }, k.isSame = function(y, I) {
        var $ = O(y);
        return this.startOf(I) <= $ && $ <= this.endOf(I);
      }, k.isAfter = function(y, I) {
        return O(y) < this.startOf(I);
      }, k.isBefore = function(y, I) {
        return this.endOf(I) < O(y);
      }, k.$g = function(y, I, $) {
        return j.u(y) ? this[I] : this.set($, y);
      }, k.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, k.valueOf = function() {
        return this.$d.getTime();
      }, k.startOf = function(y, I) {
        var $ = this, E = !!j.u(I) || I, A = j.p(y), R = function(we, ee) {
          var pe = j.w($.$u ? Date.UTC($.$y, ee, we) : new Date($.$y, ee, we), $);
          return E ? pe : pe.endOf(p);
        }, W = function(we, ee) {
          return j.w($.toDate()[we].apply($.toDate("s"), (E ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ee)), $);
        }, q = this.$W, J = this.$M, ve = this.$D, ce = "set" + (this.$u ? "UTC" : "");
        switch (A) {
          case f:
            return E ? R(1, 0) : R(31, 11);
          case u:
            return E ? R(1, J) : R(0, J + 1);
          case d:
            var xe = this.$locale().weekStart || 0, be = (q < xe ? q + 7 : q) - xe;
            return R(E ? ve - be : ve + (6 - be), J);
          case p:
          case g:
            return W(ce + "Hours", 0);
          case w:
            return W(ce + "Minutes", 1);
          case c:
            return W(ce + "Seconds", 2);
          case r:
            return W(ce + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, k.endOf = function(y) {
        return this.startOf(y, !1);
      }, k.$set = function(y, I) {
        var $, E = j.p(y), A = "set" + (this.$u ? "UTC" : ""), R = ($ = {}, $[p] = A + "Date", $[g] = A + "Date", $[u] = A + "Month", $[f] = A + "FullYear", $[w] = A + "Hours", $[c] = A + "Minutes", $[r] = A + "Seconds", $[o] = A + "Milliseconds", $)[E], W = E === p ? this.$D + (I - this.$W) : I;
        if (E === u || E === f) {
          var q = this.clone().set(g, 1);
          q.$d[R](W), q.init(), this.$d = q.set(g, Math.min(this.$D, q.daysInMonth())).$d;
        } else
          R && this.$d[R](W);
        return this.init(), this;
      }, k.set = function(y, I) {
        return this.clone().$set(y, I);
      }, k.get = function(y) {
        return this[j.p(y)]();
      }, k.add = function(y, I) {
        var $, E = this;
        y = Number(y);
        var A = j.p(I), R = function(J) {
          var ve = O(E);
          return j.w(ve.date(ve.date() + Math.round(J * y)), E);
        };
        if (A === u)
          return this.set(u, this.$M + y);
        if (A === f)
          return this.set(f, this.$y + y);
        if (A === p)
          return R(1);
        if (A === d)
          return R(7);
        var W = ($ = {}, $[c] = t, $[w] = a, $[r] = n, $)[A] || 1, q = this.$d.getTime() + y * W;
        return j.w(q, this);
      }, k.subtract = function(y, I) {
        return this.add(-1 * y, I);
      }, k.format = function(y) {
        var I = this, $ = this.$locale();
        if (!this.isValid())
          return $.invalidDate || m;
        var E = y || "YYYY-MM-DDTHH:mm:ssZ", A = j.z(this), R = this.$H, W = this.$m, q = this.$M, J = $.weekdays, ve = $.months, ce = function(ee, pe, He, ze) {
          return ee && (ee[pe] || ee(I, E)) || He[pe].slice(0, ze);
        }, xe = function(ee) {
          return j.s(R % 12 || 12, ee, "0");
        }, be = $.meridiem || function(ee, pe, He) {
          var ze = ee < 12 ? "AM" : "PM";
          return He ? ze.toLowerCase() : ze;
        }, we = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: q + 1, MM: j.s(q + 1, 2, "0"), MMM: ce($.monthsShort, q, ve, 3), MMMM: ce(ve, q), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: ce($.weekdaysMin, this.$W, J, 2), ddd: ce($.weekdaysShort, this.$W, J, 3), dddd: J[this.$W], H: String(R), HH: j.s(R, 2, "0"), h: xe(1), hh: xe(2), a: be(R, W, !0), A: be(R, W, !1), m: String(W), mm: j.s(W, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: A };
        return E.replace(x, function(ee, pe) {
          return pe || we[ee] || A.replace(":", "");
        });
      }, k.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, k.diff = function(y, I, $) {
        var E, A = j.p(I), R = O(y), W = (R.utcOffset() - this.utcOffset()) * t, q = this - R, J = j.m(this, R);
        return J = (E = {}, E[f] = J / 12, E[u] = J, E[v] = J / 3, E[d] = (q - W) / 6048e5, E[p] = (q - W) / 864e5, E[w] = q / a, E[c] = q / t, E[r] = q / n, E)[A] || q, $ ? J : j.a(J);
      }, k.daysInMonth = function() {
        return this.endOf(u).$D;
      }, k.$locale = function() {
        return z[this.$L];
      }, k.locale = function(y, I) {
        if (!y)
          return this.$L;
        var $ = this.clone(), E = U(y, I, !0);
        return E && ($.$L = E), $;
      }, k.clone = function() {
        return j.w(this.$d, this);
      }, k.toDate = function() {
        return new Date(this.valueOf());
      }, k.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, k.toISOString = function() {
        return this.$d.toISOString();
      }, k.toString = function() {
        return this.$d.toUTCString();
      }, V;
    }(), Ne = _e.prototype;
    return O.prototype = Ne, [["$ms", o], ["$s", r], ["$m", c], ["$H", w], ["$W", p], ["$M", u], ["$y", f], ["$D", g]].forEach(function(V) {
      Ne[V[1]] = function(k) {
        return this.$g(k, V[0], V[1]);
      };
    }), O.extend = function(V, k) {
      return V.$i || (V(k, _e, O), V.$i = !0), O;
    }, O.locale = U, O.isDayjs = F, O.unix = function(V) {
      return O(1e3 * V);
    }, O.en = z[C], O.Ls = z, O.p = {}, O;
  });
})(n2);
const b1 = o1;
var D1 = {}, o2 = {
  get exports() {
    return D1;
  },
  set exports(e) {
    D1 = e;
  }
};
(function(e, l) {
  (function(n, t) {
    e.exports = t(o1);
  })(x1, function(n) {
    function t(r) {
      return r && typeof r == "object" && "default" in r ? r : { default: r };
    }
    var a = t(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(r, c) {
      return c === "W" ? r + "周" : r + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(r, c) {
      var w = 100 * r + c;
      return w < 600 ? "凌晨" : w < 900 ? "早上" : w < 1100 ? "上午" : w < 1300 ? "中午" : w < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(o2);
var m1 = {}, a2 = {
  get exports() {
    return m1;
  },
  set exports(e) {
    m1 = e;
  }
};
(function(e, l) {
  (function(n, t) {
    e.exports = t();
  })(x1, function() {
    return function(n, t, a) {
      n = n || {};
      var o = t.prototype, r = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function c(p, d, u, v) {
        return o.fromToBase(p, d, u, v);
      }
      a.en.relativeTime = r, o.fromToBase = function(p, d, u, v, f) {
        for (var g, m, b, x = u.$locale().relativeTime || r, B = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], D = B.length, T = 0; T < D; T += 1) {
          var C = B[T];
          C.d && (g = v ? a(p).diff(u, C.d, !0) : u.diff(p, C.d, !0));
          var z = (n.rounding || Math.round)(Math.abs(g));
          if (b = g > 0, z <= C.r || !C.r) {
            z <= 1 && T > 0 && (C = B[T - 1]);
            var F = x[C.l];
            f && (z = f("" + z)), m = typeof F == "string" ? F.replace("%d", z) : F(z, d, C.l, b);
            break;
          }
        }
        if (d)
          return m;
        var U = b ? x.future : x.past;
        return typeof U == "function" ? U(m) : U.replace("%s", m);
      }, o.to = function(p, d) {
        return c(p, d, this, !0);
      }, o.from = function(p, d) {
        return c(p, d, this);
      };
      var w = function(p) {
        return p.$u ? a.utc() : a();
      };
      o.toNow = function(p) {
        return this.to(w(this), p);
      }, o.fromNow = function(p) {
        return this.from(w(this), p);
      };
    };
  });
})(a2);
const l2 = m1;
b1.locale("zh-cn");
b1.extend(l2);
const $1 = Symbol(), G1 = Symbol(), C1 = Symbol(), g1 = Symbol(), et = (e) => (Q("data-v-3fac30ed"), e = e(), G(), e), s2 = { class: "comment-box" }, i2 = {
  key: 0,
  class: "action-box"
}, r2 = /* @__PURE__ */ et(() => /* @__PURE__ */ s("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ s("path", {
    "data-v-48a7e3c5": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
  })
], -1)), c2 = /* @__PURE__ */ et(() => /* @__PURE__ */ s("span", null, "图片", -1)), u2 = /* @__PURE__ */ H({
  props: {
    placeholder: null,
    contentBtn: null,
    parentId: null,
    reply: null
  },
  emits: ["hide", "close"],
  setup(e, { expose: l, emit: n }) {
    const t = e, a = L(""), o = L(!1), r = L(!0), c = L(), w = L(), p = L(), d = L([]), u = L([]), v = oe({
      imgLength: 0
    }), f = (z) => {
      Ze(a.value.replace(/&nbsp;|<br>| /g, "")) ? r.value = !0 : r.value = !1;
    }, { upload: g, submit: m } = re(G1), b = re(Ge), x = () => {
      m({
        content: t.reply ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: Pe(t.parentId, null),
        reply: t.reply,
        files: u.value,
        clear: () => {
          B(), n("close");
        }
      });
    }, B = () => {
      c.value.clear(), d.value.length = 0, u.value = [], r.value = !0;
    };
    function D(z) {
      Ze(a.value) && !v.imgLength && (o.value = !1, n("hide", z));
    }
    function T() {
      o.value = !0, ge(() => {
        w.value = document.querySelector("div[id^='el-popper-container']");
      });
    }
    l({
      focus: () => {
        var z;
        return (z = c.value) == null ? void 0 : z.focus();
      }
    });
    const C = (z) => {
      var U;
      d.value.length = 0, u.value.length = 0, console.log(z);
      const F = (U = p.value) == null ? void 0 : U.files;
      if (v.imgLength = Pe(F == null ? void 0 : F.length, 0), F)
        for (let O = 0; O < F.length; O++) {
          let j = F[O].name, _e = t2(F[O]);
          u.value.push(F[O]), e2(j) ? d.value.push(_e) : M1({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    };
    return (z, F) => ue((h(), _("div", s2, [
      M(i(ot), {
        ref_key: "editorRef",
        ref: c,
        modelValue: a.value,
        "onUpdate:modelValue": F[0] || (F[0] = (U) => a.value = U),
        class: P({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": d.value,
        onFocus: T,
        onInput: f,
        onSubmit: x
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      M(Ee, { name: "fade" }, {
        default: S(() => [
          o.value ? (h(), _("div", i2, [
            M(i(_t), {
              emoji: i(b),
              onAddEmoji: F[1] || (F[1] = (U) => {
                var O;
                return (O = c.value) == null ? void 0 : O.addText(U);
              })
            }, null, 8, ["emoji"]),
            i(g) ? (h(), _("div", {
              key: 0,
              class: "picture",
              onClick: F[2] || (F[2] = //@ts-ignore
              (...U) => {
                var O, j;
                return ((O = p.value) == null ? void 0 : O.click) && ((j = p.value) == null ? void 0 : j.click(...U));
              })
            }, [
              r2,
              c2,
              s("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: p,
                type: "file",
                multiple: "",
                onChange: C
              }, null, 544)
            ])) : N("", !0),
            M(i(Ue), {
              type: "primary",
              disabled: r.value,
              onClick: x
            }, {
              default: S(() => [
                ae(Y(t.contentBtn), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ])) : N("", !0)
        ]),
        _: 1
      })
    ])), [
      [i(l1), D, w.value]
    ]);
  }
});
const se = (e, l) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of l)
    n[t] = a;
  return n;
}, tt = /* @__PURE__ */ se(u2, [["__scopeId", "data-v-3fac30ed"]]), d2 = { class: "u-comment-scroll" }, v2 = ["infinite-scroll-disabled"], p2 = { class: "scroll-btn" }, h2 = /* @__PURE__ */ ae("加载更多"), f2 = { key: 1 }, m2 = { key: 2 }, g2 = H({
  name: "UCommentScroll"
}), _2 = /* @__PURE__ */ H({
  ...g2,
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(!1), o = Z(() => a.value && n.disable), r = Z(() => !a.value || t.value || o.value), c = Gt(() => {
      l("more"), t.value = !1;
    }, 500), w = () => {
      t.value = !0, c();
    };
    return (p, d) => (h(), _("div", d2, [
      ue((h(), _("div", {
        "infinite-scroll-disabled": i(r),
        "infinite-scroll-distance": "2"
      }, [
        ie(p.$slots, "default", {}, void 0, !0),
        s("div", p2, [
          a.value ? N("", !0) : (h(), K(i(s1), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: d[0] || (d[0] = (u) => a.value = !a.value)
          }, {
            default: S(() => [
              h2
            ]),
            _: 1
          })),
          t.value ? (h(), _("p", f2, "加载中...")) : N("", !0),
          i(o) ? (h(), _("p", m2, "没有更多了")) : N("", !0)
        ])
      ], 8, v2)), [
        [i(P1), w]
      ])
    ]));
  }
});
const w2 = /* @__PURE__ */ se(_2, [["__scopeId", "data-v-22ee74f0"]]), y2 = fe(w2), k1 = (e) => (Q("data-v-32692fea"), e = e(), G(), e), x2 = { class: "nav" }, b2 = /* @__PURE__ */ k1(() => /* @__PURE__ */ s("span", { class: "nav__title" }, "全部评论", -1)), $2 = { class: "nav__sort" }, C2 = /* @__PURE__ */ k1(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99951 0.5C9.03708 0.5 11.4995 2.96243 11.4995 6C11.4995 9.03757 9.03708 11.5 5.99951 11.5C2.96195 11.5 0.499512 9.03757 0.499512 6C0.499512 2.96243 2.96195 0.5 5.99951 0.5ZM6.25 3.49988C6.38807 3.49988 6.5 3.61181 6.5 3.74988V5.49988H8.25C8.38807 5.49988 8.5 5.61181 8.5 5.74988V6.24988C8.5 6.38795 8.38807 6.49988 8.25 6.49988H5.75C5.61193 6.49988 5.5 6.38795 5.5 6.24988V3.74988C5.5 3.61181 5.61193 3.49988 5.75 3.49988H6.25Z"
  })
], -1)), k2 = /* @__PURE__ */ ae(" 最新 "), M2 = /* @__PURE__ */ k1(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), z2 = /* @__PURE__ */ ae(" 最热 "), L2 = H({
  name: "uCommentNav"
}), S2 = /* @__PURE__ */ H({
  ...L2,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: l }) {
    const n = e, t = Z({
      get() {
        return n.modelValue;
      },
      set(a) {
        l("update:modelValue", a), l("sorted", a);
      }
    });
    return (a, o) => {
      const r = te("u-icon");
      return h(), _("div", x2, [
        b2,
        s("div", $2, [
          s("div", {
            class: P(["item select-none", { active: i(t) }]),
            onClick: o[0] || (o[0] = (c) => t.value = !0)
          }, [
            M(r, null, {
              default: S(() => [
                C2
              ]),
              _: 1
            }),
            k2
          ], 2),
          s("div", {
            class: P(["item select-none", { active: !i(t) }]),
            onClick: o[1] || (o[1] = (c) => t.value = !1)
          }, [
            M(r, null, {
              default: S(() => [
                M2
              ]),
              _: 1
            }),
            z2
          ], 2)
        ])
      ]);
    };
  }
});
const F2 = /* @__PURE__ */ se(S2, [["__scopeId", "data-v-32692fea"]]), T2 = fe(F2), nt = (e) => (Q("data-v-0959f624"), e = e(), G(), e), H2 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, V2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ s("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), I2 = [
  V2
], B2 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, A2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ s("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), D2 = [
  A2
], E2 = H({
  name: "UDialog"
}), O2 = /* @__PURE__ */ H({
  ...E2,
  props: {
    title: null,
    modelValue: { type: Boolean },
    width: null,
    center: { type: Boolean },
    top: null,
    beforeClose: null,
    closeOnClickModal: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(!1);
    return de(
      () => n.modelValue,
      (o) => {
        t.value = o;
      },
      {
        immediate: !0
      }
    ), de(
      () => t.value,
      (o) => {
        l("update:modelValue", o);
      }
    ), (o, r) => (h(), K(i(W1), {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (c) => t.value = c),
      "close-on-click-modal": e.closeOnClickModal,
      title: e.title,
      width: e.width,
      top: e.top,
      fullscreen: a.value,
      center: e.center,
      "before-close": e.beforeClose,
      draggable: ""
    }, Y1({
      default: S(() => [
        s("div", {
          class: "full-screen",
          onClick: r[0] || (r[0] = (c) => a.value = !a.value)
        }, [
          a.value ? (h(), _("svg", H2, I2)) : (h(), _("svg", B2, D2))
        ]),
        ie(o.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      o.$slots.footer ? {
        name: "footer",
        fn: S(() => [
          ie(o.$slots, "footer", {}, void 0, !0)
        ])
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const j2 = /* @__PURE__ */ se(O2, [["__scopeId", "data-v-0959f624"]]), U2 = fe(j2), R2 = { class: "field" }, Y2 = H({
  name: "UDivider"
}), N2 = /* @__PURE__ */ H({
  ...Y2,
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const l = e;
    Te((t) => ({
      "0f43a3e3": l.borderStyle
    }));
    const n = L();
    return de(
      () => l.position,
      (t) => {
        switch (t) {
          case "left":
            n.value = "is-left";
            break;
          case "right":
            n.value = "is-right";
            break;
        }
      },
      { immediate: !0 }
    ), (t, a) => (h(), _("div", {
      class: P(["u-divider", { vertical: e.vertical }])
    }, [
      s("fieldset", R2, [
        t.$slots.default || e.vertical ? (h(), _("legend", {
          key: 0,
          class: P(["inner", n.value])
        }, [
          ie(t.$slots, "default", {}, void 0, !0)
        ], 2)) : N("", !0)
      ])
    ], 2));
  }
});
const q2 = /* @__PURE__ */ se(N2, [["__scopeId", "data-v-613cf62e"]]), P2 = fe(q2), W2 = [
  {
    type: "success",
    options: {
      color: "#67c23a",
      bgColor: "#f0f9eb",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2040"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" p-id="2041"></path></svg>'
    }
  },
  {
    type: "info",
    options: {
      color: "#909399",
      bgColor: "#f4f4f5",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950"><path d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64z m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68 0.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z" p-id="1951"></path></svg>'
    }
  },
  {
    type: "warn",
    options: {
      color: "#fdf6ec",
      bgColor: "#e6a23c",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256z m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" p-id="1981"></path></svg>'
    }
  },
  {
    type: "error",
    options: {
      color: "#f56c6c",
      bgColor: "#fef0f0",
      icon: '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8851"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" p-id="8852"></path></svg>'
    }
  }
], Z2 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function K2(e) {
  return W2.find((l) => l.type === e);
}
function J2() {
  return Z2;
}
const X2 = {
  key: 1,
  "aria-hidden": "true"
}, Q2 = ["xlink:href"], G2 = H({
  name: "UIcon"
}), e4 = /* @__PURE__ */ H({
  ...G2,
  props: {
    name: null,
    size: null,
    color: null
  },
  setup(e) {
    const l = e, n = Z(() => "#" + l.name), t = Z(() => ({
      fontSize: xt(l.size) ? l.size + "px" : l.size,
      color: l.color
    }));
    return (a, o) => (h(), _("i", {
      class: "u-icon",
      style: ke(i(t))
    }, [
      a.$slots.default ? ie(a.$slots, "default", { key: 0 }, void 0, !0) : (h(), _("svg", X2, [
        s("use", { "xlink:href": i(n) }, null, 8, Q2)
      ]))
    ], 4));
  }
});
const t4 = /* @__PURE__ */ se(e4, [["__scopeId", "data-v-651fee2f"]]), Ae = fe(t4), n4 = { class: "v-toast" }, o4 = { class: "inner" }, a4 = { class: "message" }, l4 = H({
  name: "UToast"
}), s4 = /* @__PURE__ */ H({
  ...l4,
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const l = e;
    Te((a) => ({
      "3d711b20": i(n).color,
      "6865c9eb": i(n).bgColor
    }));
    const n = oe(J2().options), t = L(!1);
    return de(
      () => l.type,
      (a) => {
        const o = K2(a);
        o && (n.color = o.options.color, n.bgColor = o.options.bgColor, n.icon = o.options.icon);
      },
      { immediate: !0 }
    ), he(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, l.duration);
    }), (a, o) => (h(), _("div", n4, [
      M(Ee, { name: "v-toast" }, {
        default: S(() => [
          ue(s("div", o4, [
            s("div", a4, [
              i(n).icon ? (h(), K(i(Ae), {
                key: 0,
                innerHTML: i(n).icon
              }, null, 8, ["innerHTML"])) : N("", !0),
              s("span", {
                class: P({ normal: e.type != "normal" })
              }, Y(e.message), 3)
            ])
          ], 512), [
            [Me, t.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
});
const i4 = /* @__PURE__ */ se(s4, [["__scopeId", "data-v-7d613ba5"]]);
function M1(e) {
  let l = e.duration;
  if (!e.message)
    return;
  e.duration = l || 1e3;
  const { vnode: n, div: t } = Wt(i4, e);
  return setTimeout(() => {
    Zt(t);
  }, e.duration + 300), n;
}
const r4 = (e) => (Q("data-v-f225752a"), e = e(), G(), e), c4 = ["placeholder", "onKeydown", "innerHTML"], u4 = ["src"], d4 = ["onClick"], v4 = /* @__PURE__ */ r4(() => /* @__PURE__ */ s("svg", {
  "data-v-48a7e3c5": "",
  "data-v-7c7c7498": "",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("rect", {
    width: "12",
    height: "12",
    rx: "2",
    fill: "#86909C"
  }),
  /* @__PURE__ */ s("path", {
    "data-v-48a7e3c5": "",
    "data-v-7c7c7498": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z",
    fill: "white"
  })
], -1)), p4 = [
  v4
], h4 = H({
  name: "UEditor"
}), f4 = /* @__PURE__ */ H({
  ...h4,
  props: {
    placeholder: null,
    modelValue: null,
    minHeight: { default: 30 },
    imgList: null
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit"],
  setup(e, { expose: l, emit: n }) {
    const t = e;
    Te((C) => ({
      "53776e47": i(u),
      f95f8082: i(v)
    }));
    const a = L(), o = L(), r = L(), c = L(!1), w = L(!1), p = L(), { imgList: d } = Oe(t), u = Z(() => t.minHeight + "px"), v = Z(() => t.minHeight == 30 ? "4px 10px" : "8px 12px");
    de(
      () => t.modelValue,
      (C) => {
        c.value || (r.value = C);
      }
    );
    function f(C) {
      n("focus", C), c.value = !0, w.value = !0;
    }
    function g(C) {
      var z, F;
      a.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0), n("blur", C), (F = o.value) != null && F.innerHTML || (w.value = !1), c.value = !1;
    }
    function m(C) {
      const { innerHTML: z } = C.target;
      n("update:modelValue", z), n("input", C);
    }
    function b(C) {
      var F, U;
      let z = window.getSelection();
      if (z) {
        z.removeAllRanges(), a.value || ((F = o.value) == null || F.focus(), a.value = z.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(C)), a.value.collapse(!1), z.addRange(a.value), n("update:modelValue", ((U = o.value) == null ? void 0 : U.innerHTML) || "");
        const O = o.value;
        n("input", O);
      }
    }
    function x() {
      o.value && (o.value.innerHTML = "", n("update:modelValue", o.value.innerHTML), w.value = !1);
    }
    function B() {
      ge(() => {
        var C;
        (C = o.value) == null || C.focus();
      });
    }
    const D = (C) => {
      C.ctrlKey && C.key == "Enter" && (Ze(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? M1({ message: "内容不能为空", type: "info" }) : n("submit"));
    }, T = (C) => {
      var z;
      (z = d == null ? void 0 : d.value) == null || z.splice(C, 1);
    };
    return he(() => {
      var C;
      (C = o.value) == null || C.addEventListener("keyup", (z) => {
        const F = z.target;
        F.innerHTML == "<br>" && (F.innerHTML = "");
      });
    }), l({
      addText: b,
      clear: x,
      focus: B,
      imageRef: p
    }), (C, z) => (h(), _("div", {
      class: P(["u-editor", { active: w.value }])
    }, [
      s("div", {
        ref_key: "editorRef",
        ref: o,
        class: "rich-input",
        contenteditable: "true",
        placeholder: e.placeholder,
        onFocus: f,
        onInput: m,
        onBlur: g,
        onKeydown: je(D, ["enter"]),
        innerHTML: r.value
      }, null, 40, c4),
      s("div", {
        ref_key: "imageRef",
        ref: p,
        class: "image-preview-box"
      }, [
        (h(!0), _(X, null, ne(i(d), (F, U) => (h(), _("div", {
          key: U,
          class: "image-preview"
        }, [
          s("img", {
            src: F,
            alt: ""
          }, null, 8, u4),
          s("div", {
            class: "clean-btn",
            onClick: (O) => T(U)
          }, p4, 8, d4)
        ]))), 128))
      ], 512)
    ], 2));
  }
});
const m4 = /* @__PURE__ */ se(f4, [["__scopeId", "data-v-f225752a"]]), ot = fe(m4);
const g4 = { class: "u-fold" }, _4 = { class: "action-box select-none" }, w4 = H({
  name: "UFold"
}), y4 = /* @__PURE__ */ H({
  ...w4,
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const l = e;
    Te((c) => ({
      f316b618: i(n)
    }));
    const n = Z(() => {
      let c = Math.trunc(Number(l.line));
      return c > 0 ? c : 1;
    }), t = L(!0), a = L(!1), o = L();
    let r;
    return he(() => {
      r = new ResizeObserver((c) => {
        t.value && o.value && (a.value = o.value.offsetHeight < o.value.scrollHeight);
      }), r.observe(o.value);
    }), Fe(() => {
      r.disconnect();
    }), (c, w) => (h(), _("div", g4, [
      s("div", {
        class: P(["txt-box", { "over-hidden": t.value }])
      }, [
        s("div", {
          ref_key: "divBox",
          ref: o
        }, [
          ie(c.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      s("div", _4, [
        a.value && e.unfold ? (h(), _("div", {
          key: 0,
          class: "expand-btn",
          onClick: w[0] || (w[0] = (p) => t.value = !t.value)
        }, Y(t.value ? "展开" : "收起"), 1)) : N("", !0)
      ])
    ]));
  }
});
const x4 = /* @__PURE__ */ se(y4, [["__scopeId", "data-v-3a8862bb"]]), at = fe(x4), b4 = /* @__PURE__ */ H({
  props: {
    modelValue: null
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: l, emit: n }) {
    const t = e, a = oe({
      type: "",
      email: "",
      password: ""
    }), o = (g, m, b) => {
      const x = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!m)
        return b("请输入邮箱!");
      x.test(m) || b("邮箱地址不合法"), b();
    }, r = (g, m, b) => {
      m ? m != a.password ? b("输入密码不一致") : b() : b("请确认密码");
    }, c = L(), w = L(), p = oe({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), d = oe({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      },
      checkPass: {
        required: !0,
        validator: r,
        trigger: "blur"
      }
    }), u = oe({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    de(
      () => t.modelValue,
      (g) => {
        switch (ge(() => f()), g) {
          case "login":
            w.value = p, u.type = "登录", u.one = { key: "register", value: "邮箱注册" }, u.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            w.value = p, u.type = "注册", u.one = { key: "login", value: "邮箱登录" }, u.two = { key: "", value: "" };
            break;
          case "forget":
            w.value = d, u.type = "修改密码", u.one = { key: "login", value: "邮箱登录" }, u.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function v() {
      a.type = t.modelValue, c.value.validate((g) => {
        g && n("submit", a);
      });
    }
    function f() {
      c.value.resetFields();
    }
    return l({
      reset: f
    }), (g, m) => {
      const b = te("el-button");
      return h(), K(i(Z1), {
        ref_key: "ruleFormRef",
        ref: c,
        model: i(a),
        rules: w.value,
        class: "select-none"
      }, {
        default: S(() => [
          M(i(Ce), { prop: "email" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).email,
                "onUpdate:modelValue": m[0] || (m[0] = (x) => i(a).email = x),
                placeholder: "请输入邮箱",
                onFocus: m[1] || (m[1] = (x) => g.$emit("toggle", 1)),
                onBlur: m[2] || (m[2] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          M(i(Ce), { prop: "password" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).password,
                "onUpdate:modelValue": m[3] || (m[3] = (x) => i(a).password = x),
                placeholder: "请输入密码",
                onFocus: m[4] || (m[4] = (x) => g.$emit("toggle", 2)),
                onBlur: m[5] || (m[5] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          ue(M(i(Ce), { prop: "checkPass" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).checkPass,
                "onUpdate:modelValue": m[6] || (m[6] = (x) => i(a).checkPass = x),
                placeholder: "请确认密码",
                onFocus: m[7] || (m[7] = (x) => g.$emit("toggle", 2)),
                onBlur: m[8] || (m[8] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Me, e.modelValue == "forget"]
          ]),
          M(i(Ce), null, {
            default: S(() => [
              M(b, {
                style: { width: "100%" },
                type: "primary",
                onClick: v
              }, {
                default: S(() => [
                  ae(Y(i(u).type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          M(i(Ce), null, {
            default: S(() => [
              s("div", {
                onClick: m[9] || (m[9] = (x) => g.$emit("update:modelValue", i(u).one.key))
              }, Y(i(u).one.value), 1),
              s("div", {
                onClick: m[10] || (m[10] = (x) => g.$emit("update:modelValue", i(u).two.key))
              }, Y(i(u).two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const $4 = /* @__PURE__ */ se(b4, [["__scopeId", "data-v-525985f8"]]), C4 = { class: "u-sign" }, k4 = /* @__PURE__ */ ae("登录/注册"), M4 = /* @__PURE__ */ ae("其他方式登录"), z4 = { class: "sign-oauth" }, L4 = H({
  name: "USign"
}), S4 = /* @__PURE__ */ H({
  ...L4,
  emits: ["submit"],
  setup(e, { emit: l }) {
    const n = L(!1), t = L("login"), a = L(0), o = Z(() => {
      switch (t.value) {
        case "login":
          return "登录";
        case "register":
          return "注册";
        case "forget":
          return "修改密码";
        default:
          return "";
      }
    });
    return (r, c) => {
      const w = te("u-divider"), p = te("u-icon"), d = te("u-dialog");
      return h(), _("div", C4, [
        M(i(Ue), {
          link: "",
          onClick: c[0] || (c[0] = (u) => n.value = !0)
        }, {
          default: S(() => [
            k4
          ]),
          _: 1
        }),
        M(d, {
          modelValue: n.value,
          "onUpdate:modelValue": c[4] || (c[4] = (u) => n.value = u),
          title: i(o),
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: S(() => [
            M($4, {
              modelValue: t.value,
              "onUpdate:modelValue": c[1] || (c[1] = (u) => t.value = u),
              onToggle: c[2] || (c[2] = (u) => a.value = u),
              onSubmit: c[3] || (c[3] = (u) => r.$emit("submit", u))
            }, null, 8, ["modelValue"]),
            M(w, null, {
              default: S(() => [
                M4
              ]),
              _: 1
            }),
            s("div", z4, [
              M(p, { name: "QQ" }),
              M(p, { name: "weixin" }),
              M(p, { name: "gitee" }),
              M(p, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const F4 = /* @__PURE__ */ se(S4, [["__scopeId", "data-v-0496baf2"]]), T4 = fe(F4), H4 = (e) => (Q("data-v-3a07e116"), e = e(), G(), e), V4 = { class: "custom-contextmenu__menu" }, I4 = ["onClick"], B4 = /* @__PURE__ */ H4(() => /* @__PURE__ */ s("div", { class: "arrow" }, null, -1)), A4 = /* @__PURE__ */ H({
  props: {
    dropdown: null
  },
  emits: ["submit"],
  setup(e, { expose: l, emit: n }) {
    const t = oe({
      tag: {},
      isShow: !1,
      dropdownList: [
        {
          title: "刷新",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1671"><path d="M894.481158 505.727133c0 49.589418-9.711176 97.705276-28.867468 143.007041-18.501376 43.74634-44.98454 83.031065-78.712713 116.759237-33.728172 33.728172-73.012897 60.211337-116.759237 78.712713-45.311998 19.156292-93.417623 28.877701-143.007041 28.877701s-97.695043-9.721409-142.996808-28.877701c-43.756573-18.501376-83.031065-44.98454-116.76947-78.712713-33.728172-33.728172-60.211337-73.012897-78.712713-116.759237-19.156292-45.301765-28.867468-93.417623-28.867468-143.007041 0-49.579185 9.711176-97.695043 28.867468-142.996808 18.501376-43.74634 44.98454-83.031065 78.712713-116.759237 33.738405-33.728172 73.012897-60.211337 116.76947-78.712713 45.301765-19.166525 93.40739-28.877701 142.996808-28.877701 52.925397 0 104.008842 11.010775 151.827941 32.745798 46.192042 20.977777 86.909395 50.79692 121.016191 88.608084 4.389984 4.860704 8.646937 9.854439 12.781094 14.97097l0-136.263453c0-11.307533 9.168824-20.466124 20.466124-20.466124 11.307533 0 20.466124 9.15859 20.466124 20.466124l0 183.64253c0 5.433756-2.148943 10.632151-5.986341 14.46955-3.847631 3.837398-9.046027 5.996574-14.479783 5.996574l-183.64253-0.020466c-11.307533 0-20.466124-9.168824-20.466124-20.466124 0-11.307533 9.168824-20.466124 20.466124-20.466124l132.293025 0.020466c-3.960195-4.952802-8.063653-9.782807-12.289907-14.479783-30.320563-33.605376-66.514903-60.098773-107.549481-78.753645-42.467207-19.289322-87.850837-29.072129-134.902456-29.072129-87.195921 0-169.172981 33.9533-230.816946 95.597265-61.654198 61.654198-95.597265 143.621025-95.597265 230.816946s33.943067 169.172981 95.597265 230.816946c61.643965 61.654198 143.621025 95.607498 230.816946 95.607498s169.172981-33.9533 230.816946-95.607498c61.654198-61.643965 95.597265-143.621025 95.597265-230.816946 0-11.2973 9.168824-20.466124 20.466124-20.466124C885.322567 485.261009 894.481158 494.429833 894.481158 505.727133z"></path></svg>'
        },
        {
          title: "关闭",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1701"><path d="M504.4084931 451.09198277L833.25648384 122.26912946a25.13744005 25.13744005 0 0 1 35.54434023 0l17.77217012 17.77217011a25.13744005 25.13744005 0 0 1 0 35.54434025L557.7501409 504.4084931 886.54785674 833.25648384a25.13744005 25.13744005 0 0 1 0 35.54434023l-17.77217012 17.77217012a25.13744005 25.13744005 0 0 1-35.54434023 0L504.4084931 557.7501409 175.58563982 886.54785674a25.13744005 25.13744005 0 0 1-35.54434025 0l-17.77217011-17.77217012a25.13744005 25.13744005 0 0 1 0-35.54434023l328.82285331-328.84799073-328.82285331-328.82285329a25.13744005 25.13744005 0 0 1 0-35.54434023l17.77217011-17.77217011a25.13744005 25.13744005 0 0 1 35.54434025 0l328.82285328 328.8228533z"></path></svg>'
        },
        {
          title: "关闭其他",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="829"><path d="M508.93637449 458.92857969l109.04150167-109.04150165a23.56635005 23.56635005 0 0 1 33.32281895 0l16.6614095 16.66140948a23.56635005 23.56635005 0 0 1 0 33.3463853L558.8970366 508.93637449l109.04150166 109.04150167a23.56635005 23.56635005 0 0 1 0 33.32281895l-16.66140948 16.6614095a23.56635005 23.56635005 0 0 1-33.32281898 0L508.93637449 558.8970366l-109.04150167 109.04150166a23.56635005 23.56635005 0 0 1-33.3463853 0l-16.66140948-16.66140948a23.56635005 23.56635005 0 0 1 0-33.32281898l109.04150165-109.04150165-109.04150165-109.04150169a23.56635005 23.56635005 0 0 1 0-33.34638529l16.66140948-16.66140949a23.56635005 23.56635005 0 0 1 33.3463853 0l109.04150167 109.04150166z m0 471.11490379c232.5763086 0 421.13067533-188.53080036 421.13067534-421.13067533C930.06704983 276.33649952 741.48911675 87.80569917 508.93637449 87.80569917 276.33649952 87.80569917 87.80569917 276.33649952 87.80569917 508.93637449c0 232.5763086 188.53080036 421.13067533 421.13067532 421.13067534z m0 70.69905013C237.31062386 1000.76609997 17.10664903 780.56212513 17.10664903 508.93637449 17.10664903 237.33419021 237.31062386 17.10664903 508.93637449 17.10664903c271.62575065 0 491.82972547 220.20397484 491.82972548 491.82972546 0 271.62575065-220.20397484 491.82972547-491.82972548 491.82972548z"></path></svg>'
        },
        {
          title: "全部关闭",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889"><path d="M192 640v32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V128H128v512h64z m128 128v32H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V256H256v512h64z m288 128v32h-224a32 32 0 0 1-32-32V384a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v224h-32v-224H384v512h224z m96-224h224a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32h-224a32 32 0 0 1-32-32v-224a32 32 0 0 1 32-32z m162.272 149.024l67.872-67.872-45.248-45.28-67.872 67.904-67.872-67.904-45.28 45.28 67.904 67.84-67.904 67.904 45.28 45.248 67.84-67.84 67.904 67.84 45.248-45.248-67.84-67.872z"></path></svg>'
        },
        {
          title: "当前页全屏",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="859"><path d="M160 96h192q14.016 0.992 23.008 10.016t8.992 22.496-8.992 22.496T352 160H160v192q0 14.016-8.992 23.008T128 384t-23.008-8.992T96 352V96h64z m0 832H96v-256q0-14.016 8.992-23.008T128 640t23.008 8.992T160 672v192h192q14.016 0 23.008 8.992t8.992 22.496-8.992 22.496T352 928H160zM864 96h64v256q0 14.016-8.992 23.008T896 384t-23.008-8.992T864 352V160h-192q-14.016 0-23.008-8.992T640 128.512t8.992-22.496T672 96h192z m0 832h-192q-14.016-0.992-23.008-10.016T640 895.488t8.992-22.496T672 864h192v-192q0-14.016 8.992-23.008T896 640t23.008 8.992T928 672v256h-64z"></path></svg>'
        }
      ]
    }), a = (p) => {
      t.tag = p, t.dropdownList[1].show = !p.meta.isAffix, o(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, o = () => {
      t.isShow = !1;
    };
    he(() => {
      window.addEventListener("click", o);
    }), Fe(() => {
      window.removeEventListener("click", o);
    });
    const { isShow: r, dropdownList: c, tag: w } = Oe(t);
    return l({
      openContextmenu: a
    }), (p, d) => {
      const u = te("u-icon");
      return h(), K(Ee, { name: "el-zoom-in-center" }, {
        default: S(() => [
          ue(s("div", {
            style: ke(`top: ${e.dropdown.y + 5}px; left: ${e.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            s("ul", V4, [
              (h(!0), _(X, null, ne(i(c), (v, f) => (h(), _(X, { key: f }, [
                v.show ? (h(), _("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (g) => p.$emit("submit", f, i(w))
                }, [
                  M(u, {
                    innerHTML: v.icon
                  }, null, 8, ["innerHTML"]),
                  s("span", null, Y(v.title), 1)
                ], 8, I4)) : N("", !0)
              ], 64))), 128))
            ]),
            B4
          ], 4), [
            [Me, i(r)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const D4 = /* @__PURE__ */ se(A4, [["__scopeId", "data-v-3a07e116"]]), E4 = (e) => (Q("data-v-6ca3aeac"), e = e(), G(), e), O4 = { class: "u-tabs" }, j4 = ["onClick", "onContextmenu"], U4 = { class: "select-none" }, R4 = /* @__PURE__ */ E4(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Y4 = H({
  name: "UTags"
}), N4 = /* @__PURE__ */ H({
  ...Y4,
  props: {
    classic: { type: Boolean },
    modelValue: null
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: l }) {
    const n = e, t = L(), a = L(), o = a1(n, "modelValue"), r = L(0), c = oe({
      x: 0,
      y: 0
    });
    de(
      () => [...o.value],
      (v, f) => {
        if (f) {
          if (console.log(v, f), v.length > f.length) {
            let g = v.find((m) => !(f != null && f.includes(m)));
            o.value.forEach((m, b, x) => {
              x.findIndex((B) => B.path == m.path) != b && x.splice(b, 1);
            }), r.value = o.value.findIndex((m) => m.path == (g == null ? void 0 : g.path));
          }
        } else {
          let g = 1;
          o.value.forEach((m, b, x) => {
            x.findIndex((B) => B.path == m.path) != b && (x.splice(b, 1), r.value = x.findIndex((B) => B.path == m.path), g = 0);
          }), g && (r.value = o.value.length - 1);
        }
        ge(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), de(
      () => r.value,
      (v) => {
        l(
          "select",
          o.value.find((f, g) => g == v)
        );
      }
    );
    const w = (v) => {
      o.value.map((f, g) => {
        if (!f.meta.isAffix && v == g)
          if (o.value.splice(g, 1), g == r.value) {
            let b = [g, g - 1].filter((x) => x >= 0 && x < o.value.length);
            r.value = b[0], r.value == g && l(
              "select",
              o.value.find((x, B) => B == v)
            );
          } else
            v < r.value && (r.value -= 1);
      });
    }, p = (v) => {
      let f = o.value.filter((m) => m.meta.isAffix);
      v && !v.meta.isAffix && f.push(v), o.value.length = 0, o.value.push(...f);
      let g = o.value.length - 1;
      r.value = g >= 0 ? g : 0;
    }, d = (v, f) => {
      switch (v) {
        case 0:
          l("refresh", f);
          break;
        case 1:
          let g = o.value.findIndex((m) => m.path == f.path);
          w(g), l("close", f);
          break;
        case 2:
          p(f), l("closeOther", f);
          break;
        case 3:
          p(), l("closeAll");
          break;
        case 4:
          l("fullScreen", f);
          break;
      }
    }, u = (v, f) => {
      const { clientX: g, clientY: m } = f;
      c.x = g, c.y = m, a.value.openContextmenu(v);
    };
    return (v, f) => {
      const g = te("u-icon");
      return h(), _("div", O4, [
        M(i(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: S(() => [
            s("ul", {
              class: P([{ "classic-style": e.classic }, "u-tabs-ul"])
            }, [
              (h(!0), _(X, null, ne(e.modelValue, (m, b) => (h(), _("li", {
                key: b,
                class: P([{ "is-active": r.value == b }, "u-tabs-ul-li"]),
                onClick: (x) => r.value = b,
                onContextmenu: n1((x) => u(m, x), ["prevent"])
              }, [
                s("span", U4, Y(m.meta.title), 1),
                m.meta.isAffix ? N("", !0) : (h(), K(g, {
                  key: 0,
                  onClick: n1((x) => d(1, m), ["stop"])
                }, {
                  default: S(() => [
                    R4
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, j4))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        M(D4, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: i(c),
          onSubmit: d
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const q4 = /* @__PURE__ */ se(N4, [["__scopeId", "data-v-6ca3aeac"]]), P4 = fe(q4), W4 = { key: 0 }, Z4 = H({
  name: "UNoticeBar"
}), K4 = /* @__PURE__ */ H({
  ...Z4,
  props: {
    data: null,
    size: { default: 14 },
    vertical: { type: Boolean },
    height: { default: 40 },
    delay: { default: 1e3 },
    spped: { default: 100 },
    suffixIcon: null,
    prefixIcon: null,
    color: { default: "--color-warning" },
    background: { default: "var(--color-warning-light-9)" }
  },
  setup(e) {
    const l = e, n = oe({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), o = Z(() => l.delay > 2e3 ? l.delay : 2e3), r = () => {
      ge(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), c(), setTimeout(() => {
          w();
        }, l.delay);
      });
    }, c = () => {
      n.oneTime = n.textWidth / l.spped, n.twoTime = (n.textWidth + n.boxWidth) / l.spped;
    }, w = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, p = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          w();
        },
        !1
      );
    };
    return he(() => {
      l.vertical || (r(), p());
    }), (d, u) => {
      const v = te("el-carousel-item"), f = te("u-icon");
      return h(), _("div", {
        class: "u-notice-bar",
        style: ke({ background: e.background, height: `${e.height}px` })
      }, [
        e.vertical ? (h(), _("div", W4, [
          M(i(K1), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: i(o)
          }, {
            default: S(() => [
              (h(!0), _(X, null, ne(e.data, (g) => (h(), K(v, { key: g }, {
                default: S(() => [
                  ae(Y(g), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (h(), _("div", {
          key: 1,
          style: ke({ color: e.color, fontSize: `${e.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          e.prefixIcon ? (h(), K(f, {
            key: 0,
            name: e.prefixIcon
          }, null, 8, ["name"])) : N("", !0),
          s("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            s("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, Y(e.data), 513)
          ], 512),
          e.suffixIcon ? (h(), K(f, {
            key: 1,
            name: e.suffixIcon
          }, null, 8, ["name"])) : N("", !0)
        ], 4))
      ], 4);
    };
  }
});
const J4 = /* @__PURE__ */ se(K4, [["__scopeId", "data-v-e0f6f4fa"]]), X4 = fe(J4), Q4 = (e) => (Q("data-v-109f740b"), e = e(), G(), e), G4 = { class: "u-anchor" }, e0 = { class: "toc-content" }, t0 = /* @__PURE__ */ Q4(() => /* @__PURE__ */ s("h3", { class: "toc-content-heading" }, "目录", -1)), n0 = { class: "toc-items" }, o0 = ["onClick"], a0 = H({
  name: "UAnchor"
}), l0 = /* @__PURE__ */ H({
  ...a0,
  props: {
    container: null,
    scroll: null,
    targetOffset: { default: 0 }
  },
  setup(e) {
    const l = e, n = L(0), t = L({}), a = L({}), o = (p) => {
      switch (p) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, r = () => {
      const p = [];
      t.value.forEach((v) => {
        p.push(v.offsetTop);
      });
      const u = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      p.forEach((v, f) => {
        u >= v - 10 - l.targetOffset && (n.value = f);
      });
    }, c = (p) => {
      const d = t.value.item(p);
      console.log(d), l.scroll ? a.value.scrollTo({
        top: d.offsetTop - l.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: d.offsetTop - l.targetOffset,
        behavior: "smooth"
      });
    };
    he(() => {
    }), Fe(() => {
      a.value.removeEventListener("scroll", r);
    });
    let w;
    return he(() => {
      let p = document.querySelector(l.container);
      w = new ResizeObserver((d) => {
        l.scroll ? a.value = document.querySelector(l.scroll) : a.value = window, t.value = p.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", r);
      }), w.observe(p);
    }), Fe(() => {
      a.value.removeEventListener("scroll", r), w.disconnect();
    }), (p, d) => {
      const u = te("u-divider");
      return h(), _("div", G4, [
        s("nav", e0, [
          t0,
          M(u),
          s("ul", n0, [
            (h(!0), _(X, null, ne(t.value, (v, f) => (h(), _("li", {
              key: f,
              class: P([{ active: n.value == f }, o(v.nodeName)]),
              onClick: (g) => c(f)
            }, Y(v.innerText), 11, o0))), 128))
          ])
        ])
      ]);
    };
  }
});
const s0 = /* @__PURE__ */ se(l0, [["__scopeId", "data-v-109f740b"]]), i0 = fe(s0);
function r0(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function c0(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function u0(e) {
  return !isNaN(Number(e));
}
function Le(e) {
  return r0(e) ? e.length === 0 : c0(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const De = (e, l) => Le(e) ? l : e, me = (e, l) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(l ?? {})])
      n.component(t.name, t);
  }, l)
    for (const [n, t] of Object.entries(l))
      e[n] = t;
  return e;
};
function d0(e, l) {
  const n = Be(e, l), t = document.createElement("div");
  return document.body.append(t), R1(n, t), { vnode: n, div: t };
}
function v0(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const c1 = (e) => e ? "localStorage" : "sessionStorage", p0 = (e, l, n = !0) => {
  (l === "" || l === null || l === void 0) && (l = null), window[c1(n)].setItem(e, JSON.stringify(l));
}, h0 = (e, l = !0) => {
  let n;
  const t = window[c1(l)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, f0 = (e, l = !0) => {
  window[c1(l)].removeItem(e);
}, m0 = (e = !0) => {
  window[c1(e)].clear();
}, t1 = {
  set: p0,
  get: h0,
  remove: f0,
  clear: m0
}, g0 = (e, l = 200, n = !1) => {
  let t = !1, a = null;
  const o = (...r) => new Promise((c, w) => {
    if (a && clearTimeout(a), n && !t) {
      const p = e.apply(void 0, r);
      c(p), t = !0;
    } else
      a = setTimeout(() => {
        const p = e.apply(void 0, r);
        c(p), t = !1, a = null;
      }, l);
  });
  return o.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, o;
}, Ie = (e) => e == null ? "" : String(e);
function _0(e) {
  let l = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return l.indexOf(t.toLowerCase()) != -1;
}
function w0(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
var z1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function y0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _1 = {}, x0 = {
  get exports() {
    return _1;
  },
  set exports(e) {
    _1 = e;
  }
}, E1;
function lt() {
  return E1 || (E1 = 1, function(e, l) {
    (function(n, t) {
      e.exports = t();
    })(z1, function() {
      var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", r = "second", c = "minute", w = "hour", p = "day", d = "week", u = "month", v = "quarter", f = "year", g = "date", m = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(V) {
        var k = ["th", "st", "nd", "rd"], y = V % 100;
        return "[" + V + (k[(y - 20) % 10] || k[y] || k[0]) + "]";
      } }, D = function(V, k, y) {
        var I = String(V);
        return !I || I.length >= k ? V : "" + Array(k + 1 - I.length).join(y) + V;
      }, T = { s: D, z: function(V) {
        var k = -V.utcOffset(), y = Math.abs(k), I = Math.floor(y / 60), $ = y % 60;
        return (k <= 0 ? "+" : "-") + D(I, 2, "0") + ":" + D($, 2, "0");
      }, m: function V(k, y) {
        if (k.date() < y.date())
          return -V(y, k);
        var I = 12 * (y.year() - k.year()) + (y.month() - k.month()), $ = k.clone().add(I, u), E = y - $ < 0, A = k.clone().add(I + (E ? -1 : 1), u);
        return +(-(I + (y - $) / (E ? $ - A : A - $)) || 0);
      }, a: function(V) {
        return V < 0 ? Math.ceil(V) || 0 : Math.floor(V);
      }, p: function(V) {
        return { M: u, y: f, w: d, d: p, D: g, h: w, m: c, s: r, ms: o, Q: v }[V] || String(V || "").toLowerCase().replace(/s$/, "");
      }, u: function(V) {
        return V === void 0;
      } }, C = "en", z = {};
      z[C] = B;
      var F = function(V) {
        return V instanceof _e;
      }, U = function V(k, y, I) {
        var $;
        if (!k)
          return C;
        if (typeof k == "string") {
          var E = k.toLowerCase();
          z[E] && ($ = E), y && (z[E] = y, $ = E);
          var A = k.split("-");
          if (!$ && A.length > 1)
            return V(A[0]);
        } else {
          var R = k.name;
          z[R] = k, $ = R;
        }
        return !I && $ && (C = $), $ || !I && C;
      }, O = function(V, k) {
        if (F(V))
          return V.clone();
        var y = typeof k == "object" ? k : {};
        return y.date = V, y.args = arguments, new _e(y);
      }, j = T;
      j.l = U, j.i = F, j.w = function(V, k) {
        return O(V, { locale: k.$L, utc: k.$u, x: k.$x, $offset: k.$offset });
      };
      var _e = function() {
        function V(y) {
          this.$L = U(y.locale, null, !0), this.parse(y);
        }
        var k = V.prototype;
        return k.parse = function(y) {
          this.$d = function(I) {
            var $ = I.date, E = I.utc;
            if ($ === null)
              return /* @__PURE__ */ new Date(NaN);
            if (j.u($))
              return /* @__PURE__ */ new Date();
            if ($ instanceof Date)
              return new Date($);
            if (typeof $ == "string" && !/Z$/i.test($)) {
              var A = $.match(b);
              if (A) {
                var R = A[2] - 1 || 0, W = (A[7] || "0").substring(0, 3);
                return E ? new Date(Date.UTC(A[1], R, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, W)) : new Date(A[1], R, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, W);
              }
            }
            return new Date($);
          }(y), this.$x = y.x || {}, this.init();
        }, k.init = function() {
          var y = this.$d;
          this.$y = y.getFullYear(), this.$M = y.getMonth(), this.$D = y.getDate(), this.$W = y.getDay(), this.$H = y.getHours(), this.$m = y.getMinutes(), this.$s = y.getSeconds(), this.$ms = y.getMilliseconds();
        }, k.$utils = function() {
          return j;
        }, k.isValid = function() {
          return this.$d.toString() !== m;
        }, k.isSame = function(y, I) {
          var $ = O(y);
          return this.startOf(I) <= $ && $ <= this.endOf(I);
        }, k.isAfter = function(y, I) {
          return O(y) < this.startOf(I);
        }, k.isBefore = function(y, I) {
          return this.endOf(I) < O(y);
        }, k.$g = function(y, I, $) {
          return j.u(y) ? this[I] : this.set($, y);
        }, k.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, k.valueOf = function() {
          return this.$d.getTime();
        }, k.startOf = function(y, I) {
          var $ = this, E = !!j.u(I) || I, A = j.p(y), R = function(we, ee) {
            var pe = j.w($.$u ? Date.UTC($.$y, ee, we) : new Date($.$y, ee, we), $);
            return E ? pe : pe.endOf(p);
          }, W = function(we, ee) {
            return j.w($.toDate()[we].apply($.toDate("s"), (E ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ee)), $);
          }, q = this.$W, J = this.$M, ve = this.$D, ce = "set" + (this.$u ? "UTC" : "");
          switch (A) {
            case f:
              return E ? R(1, 0) : R(31, 11);
            case u:
              return E ? R(1, J) : R(0, J + 1);
            case d:
              var xe = this.$locale().weekStart || 0, be = (q < xe ? q + 7 : q) - xe;
              return R(E ? ve - be : ve + (6 - be), J);
            case p:
            case g:
              return W(ce + "Hours", 0);
            case w:
              return W(ce + "Minutes", 1);
            case c:
              return W(ce + "Seconds", 2);
            case r:
              return W(ce + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, k.endOf = function(y) {
          return this.startOf(y, !1);
        }, k.$set = function(y, I) {
          var $, E = j.p(y), A = "set" + (this.$u ? "UTC" : ""), R = ($ = {}, $[p] = A + "Date", $[g] = A + "Date", $[u] = A + "Month", $[f] = A + "FullYear", $[w] = A + "Hours", $[c] = A + "Minutes", $[r] = A + "Seconds", $[o] = A + "Milliseconds", $)[E], W = E === p ? this.$D + (I - this.$W) : I;
          if (E === u || E === f) {
            var q = this.clone().set(g, 1);
            q.$d[R](W), q.init(), this.$d = q.set(g, Math.min(this.$D, q.daysInMonth())).$d;
          } else
            R && this.$d[R](W);
          return this.init(), this;
        }, k.set = function(y, I) {
          return this.clone().$set(y, I);
        }, k.get = function(y) {
          return this[j.p(y)]();
        }, k.add = function(y, I) {
          var $, E = this;
          y = Number(y);
          var A = j.p(I), R = function(J) {
            var ve = O(E);
            return j.w(ve.date(ve.date() + Math.round(J * y)), E);
          };
          if (A === u)
            return this.set(u, this.$M + y);
          if (A === f)
            return this.set(f, this.$y + y);
          if (A === p)
            return R(1);
          if (A === d)
            return R(7);
          var W = ($ = {}, $[c] = t, $[w] = a, $[r] = n, $)[A] || 1, q = this.$d.getTime() + y * W;
          return j.w(q, this);
        }, k.subtract = function(y, I) {
          return this.add(-1 * y, I);
        }, k.format = function(y) {
          var I = this, $ = this.$locale();
          if (!this.isValid())
            return $.invalidDate || m;
          var E = y || "YYYY-MM-DDTHH:mm:ssZ", A = j.z(this), R = this.$H, W = this.$m, q = this.$M, J = $.weekdays, ve = $.months, ce = function(ee, pe, He, ze) {
            return ee && (ee[pe] || ee(I, E)) || He[pe].slice(0, ze);
          }, xe = function(ee) {
            return j.s(R % 12 || 12, ee, "0");
          }, be = $.meridiem || function(ee, pe, He) {
            var ze = ee < 12 ? "AM" : "PM";
            return He ? ze.toLowerCase() : ze;
          }, we = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: q + 1, MM: j.s(q + 1, 2, "0"), MMM: ce($.monthsShort, q, ve, 3), MMMM: ce(ve, q), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: ce($.weekdaysMin, this.$W, J, 2), ddd: ce($.weekdaysShort, this.$W, J, 3), dddd: J[this.$W], H: String(R), HH: j.s(R, 2, "0"), h: xe(1), hh: xe(2), a: be(R, W, !0), A: be(R, W, !1), m: String(W), mm: j.s(W, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: A };
          return E.replace(x, function(ee, pe) {
            return pe || we[ee] || A.replace(":", "");
          });
        }, k.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, k.diff = function(y, I, $) {
          var E, A = j.p(I), R = O(y), W = (R.utcOffset() - this.utcOffset()) * t, q = this - R, J = j.m(this, R);
          return J = (E = {}, E[f] = J / 12, E[u] = J, E[v] = J / 3, E[d] = (q - W) / 6048e5, E[p] = (q - W) / 864e5, E[w] = q / a, E[c] = q / t, E[r] = q / n, E)[A] || q, $ ? J : j.a(J);
        }, k.daysInMonth = function() {
          return this.endOf(u).$D;
        }, k.$locale = function() {
          return z[this.$L];
        }, k.locale = function(y, I) {
          if (!y)
            return this.$L;
          var $ = this.clone(), E = U(y, I, !0);
          return E && ($.$L = E), $;
        }, k.clone = function() {
          return j.w(this.$d, this);
        }, k.toDate = function() {
          return new Date(this.valueOf());
        }, k.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, k.toISOString = function() {
          return this.$d.toISOString();
        }, k.toString = function() {
          return this.$d.toUTCString();
        }, V;
      }(), Ne = _e.prototype;
      return O.prototype = Ne, [["$ms", o], ["$s", r], ["$m", c], ["$H", w], ["$W", p], ["$M", u], ["$y", f], ["$D", g]].forEach(function(V) {
        Ne[V[1]] = function(k) {
          return this.$g(k, V[0], V[1]);
        };
      }), O.extend = function(V, k) {
        return V.$i || (V(k, _e, O), V.$i = !0), O;
      }, O.locale = U, O.isDayjs = F, O.unix = function(V) {
        return O(1e3 * V);
      }, O.en = z[C], O.Ls = z, O.p = {}, O;
    });
  }(x0)), _1;
}
var b0 = lt();
const L1 = /* @__PURE__ */ y0(b0);
var O1 = {}, $0 = {
  get exports() {
    return O1;
  },
  set exports(e) {
    O1 = e;
  }
};
(function(e, l) {
  (function(n, t) {
    e.exports = t(lt());
  })(z1, function(n) {
    function t(r) {
      return r && typeof r == "object" && "default" in r ? r : { default: r };
    }
    var a = t(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(r, c) {
      return c === "W" ? r + "周" : r + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(r, c) {
      var w = 100 * r + c;
      return w < 600 ? "凌晨" : w < 900 ? "早上" : w < 1100 ? "上午" : w < 1300 ? "中午" : w < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})($0);
var w1 = {}, C0 = {
  get exports() {
    return w1;
  },
  set exports(e) {
    w1 = e;
  }
};
(function(e, l) {
  (function(n, t) {
    e.exports = t();
  })(z1, function() {
    return function(n, t, a) {
      n = n || {};
      var o = t.prototype, r = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function c(p, d, u, v) {
        return o.fromToBase(p, d, u, v);
      }
      a.en.relativeTime = r, o.fromToBase = function(p, d, u, v, f) {
        for (var g, m, b, x = u.$locale().relativeTime || r, B = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], D = B.length, T = 0; T < D; T += 1) {
          var C = B[T];
          C.d && (g = v ? a(p).diff(u, C.d, !0) : u.diff(p, C.d, !0));
          var z = (n.rounding || Math.round)(Math.abs(g));
          if (b = g > 0, z <= C.r || !C.r) {
            z <= 1 && T > 0 && (C = B[T - 1]);
            var F = x[C.l];
            f && (z = f("" + z)), m = typeof F == "string" ? F.replace("%d", z) : F(z, d, C.l, b);
            break;
          }
        }
        if (d)
          return m;
        var U = b ? x.future : x.past;
        return typeof U == "function" ? U(m) : U.replace("%s", m);
      }, o.to = function(p, d) {
        return c(p, d, this, !0);
      }, o.from = function(p, d) {
        return c(p, d, this);
      };
      var w = function(p) {
        return p.$u ? a.utc() : a();
      };
      o.toNow = function(p) {
        return this.to(w(this), p);
      }, o.fromNow = function(p) {
        return this.from(w(this), p);
      };
    };
  });
})(C0);
const k0 = w1;
L1.locale("zh-cn");
L1.extend(k0);
const S1 = Symbol(), st = Symbol(), F1 = Symbol(), y1 = Symbol(), it = Symbol(), rt = (e) => (Q("data-v-a7a05861"), e = e(), G(), e), M0 = { class: "comment-box" }, z0 = {
  key: 0,
  class: "action-box"
}, L0 = /* @__PURE__ */ rt(() => /* @__PURE__ */ s("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ s("path", {
    "data-v-48a7e3c5": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
  })
], -1)), S0 = /* @__PURE__ */ rt(() => /* @__PURE__ */ s("span", null, "图片", -1)), F0 = /* @__PURE__ */ H({
  props: {
    placeholder: null,
    contentBtn: null,
    parentId: null,
    replay: null
  },
  emits: ["hide", "close"],
  setup(e, { expose: l, emit: n }) {
    const t = e, a = L(""), o = L(!1), r = L(!0), c = L(), w = L(), p = L(), d = L([]), u = L([]), v = oe({
      imgLength: 0
    }), f = (z) => {
      Le(a.value.replace(/&nbsp;|<br>| /g, "")) ? r.value = !0 : r.value = !1;
    }, { upload: g, submit: m } = re(st), b = re(Xe), x = () => {
      var z;
      m({
        content: t.replay ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.replay.user.username}:</span> ${a.value}` : a.value,
        parentId: De(t.parentId, null),
        replyId: De((z = t.replay) == null ? void 0 : z.id, null),
        files: u.value,
        clear: () => {
          B(), n("close");
        }
      });
    }, B = () => {
      c.value.clear(), d.value.length = 0, u.value = [], r.value = !0;
    };
    function D(z) {
      Le(a.value) && !v.imgLength && (o.value = !1, n("hide", z));
    }
    function T() {
      o.value = !0, ge(() => {
        w.value = document.querySelector("div[id^='el-popper-container']");
      });
    }
    l({
      focus: () => {
        var z;
        return (z = c.value) == null ? void 0 : z.focus();
      }
    });
    const C = (z) => {
      var F;
      d.value.length = 0, u.value.length = 0, console.log(z);
      const U = (F = p.value) == null ? void 0 : F.files;
      if (v.imgLength = De(U == null ? void 0 : U.length, 0), U)
        for (let O = 0; O < U.length; O++) {
          let j = U[O].name, _e = w0(U[O]);
          u.value.push(U[O]), _0(j) ? d.value.push(_e) : H1({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    };
    return (z, F) => ue((h(), _("div", M0, [
      M(i(In), {
        ref_key: "editorRef",
        ref: c,
        modelValue: a.value,
        "onUpdate:modelValue": F[0] || (F[0] = (U) => a.value = U),
        class: P({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": d.value,
        onFocus: T,
        onInput: f,
        onSubmit: x
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      M(Ee, { name: "fade" }, {
        default: S(() => [
          o.value ? (h(), _("div", z0, [
            M(i(Va), {
              emoji: i(b),
              onAddEmoji: F[1] || (F[1] = (U) => {
                var O;
                return (O = c.value) == null ? void 0 : O.addText(U);
              })
            }, null, 8, ["emoji"]),
            i(g) ? (h(), _("div", {
              key: 0,
              class: "picture",
              onClick: F[2] || (F[2] = //@ts-ignore
              (...U) => {
                var O, j;
                return ((O = p.value) == null ? void 0 : O.click) && ((j = p.value) == null ? void 0 : j.click(...U));
              })
            }, [
              L0,
              S0,
              s("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: p,
                type: "file",
                multiple: "",
                onChange: C
              }, null, 544)
            ])) : N("", !0),
            M(i(Ue), {
              type: "primary",
              disabled: r.value,
              onClick: x
            }, {
              default: S(() => [
                ae(Y(t.contentBtn), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ])) : N("", !0)
        ]),
        _: 1
      })
    ])), [
      [i(l1), D, w.value]
    ]);
  }
}), le = (e, l) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of l)
    n[t] = a;
  return n;
}, ct = /* @__PURE__ */ le(F0, [["__scopeId", "data-v-a7a05861"]]), T0 = { class: "u-comment-scroll" }, H0 = ["infinite-scroll-disabled"], V0 = { class: "scroll-btn" }, I0 = /* @__PURE__ */ ae("加载更多"), B0 = { key: 1 }, A0 = { key: 2 }, D0 = H({
  name: "UCommentScroll"
}), E0 = /* @__PURE__ */ H({
  ...D0,
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(!1), o = Z(() => a.value && n.disable), r = Z(() => !a.value || t.value || o.value), c = g0(() => {
      l("more"), t.value = !1;
    }, 500), w = () => {
      t.value = !0, c();
    };
    return (p, d) => (h(), _("div", T0, [
      ue((h(), _("div", {
        "infinite-scroll-disabled": i(r),
        "infinite-scroll-distance": "2"
      }, [
        ie(p.$slots, "default", {}, void 0, !0),
        s("div", V0, [
          a.value ? N("", !0) : (h(), K(i(s1), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: d[0] || (d[0] = (u) => a.value = !a.value)
          }, {
            default: S(() => [
              I0
            ]),
            _: 1
          })),
          t.value ? (h(), _("p", B0, "加载中...")) : N("", !0),
          i(o) ? (h(), _("p", A0, "没有更多了")) : N("", !0)
        ])
      ], 8, H0)), [
        [i(P1), w]
      ])
    ]));
  }
}), O0 = /* @__PURE__ */ le(E0, [["__scopeId", "data-v-79af7084"]]);
me(O0);
const T1 = (e) => (Q("data-v-040cf485"), e = e(), G(), e), j0 = { class: "nav" }, U0 = /* @__PURE__ */ T1(() => /* @__PURE__ */ s("span", { class: "nav__title" }, "全部评论", -1)), R0 = { class: "nav__sort" }, Y0 = /* @__PURE__ */ T1(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99951 0.5C9.03708 0.5 11.4995 2.96243 11.4995 6C11.4995 9.03757 9.03708 11.5 5.99951 11.5C2.96195 11.5 0.499512 9.03757 0.499512 6C0.499512 2.96243 2.96195 0.5 5.99951 0.5ZM6.25 3.49988C6.38807 3.49988 6.5 3.61181 6.5 3.74988V5.49988H8.25C8.38807 5.49988 8.5 5.61181 8.5 5.74988V6.24988C8.5 6.38795 8.38807 6.49988 8.25 6.49988H5.75C5.61193 6.49988 5.5 6.38795 5.5 6.24988V3.74988C5.5 3.61181 5.61193 3.49988 5.75 3.49988H6.25Z"
  })
], -1)), N0 = /* @__PURE__ */ ae(" 最新 "), q0 = /* @__PURE__ */ T1(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), P0 = /* @__PURE__ */ ae(" 最热 "), W0 = H({
  name: "uCommentNav"
}), Z0 = /* @__PURE__ */ H({
  ...W0,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: l }) {
    const n = e, t = Z({
      get() {
        return n.modelValue;
      },
      set(a) {
        l("update:modelValue", a), l("sorted", a);
      }
    });
    return (a, o) => {
      const r = te("u-icon");
      return h(), _("div", j0, [
        U0,
        s("div", R0, [
          s("div", {
            class: P(["item select-none", { active: i(t) }]),
            onClick: o[0] || (o[0] = (c) => t.value = !0)
          }, [
            M(r, null, {
              default: S(() => [
                Y0
              ]),
              _: 1
            }),
            N0
          ], 2),
          s("div", {
            class: P(["item select-none", { active: !i(t) }]),
            onClick: o[1] || (o[1] = (c) => t.value = !1)
          }, [
            M(r, null, {
              default: S(() => [
                q0
              ]),
              _: 1
            }),
            P0
          ], 2)
        ])
      ]);
    };
  }
}), K0 = /* @__PURE__ */ le(Z0, [["__scopeId", "data-v-040cf485"]]);
me(K0);
const ut = (e) => (Q("data-v-0959f624"), e = e(), G(), e), J0 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, X0 = /* @__PURE__ */ ut(() => /* @__PURE__ */ s("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), Q0 = [
  X0
], G0 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, en = /* @__PURE__ */ ut(() => /* @__PURE__ */ s("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), tn = [
  en
], nn = H({
  name: "UDialog"
}), on = /* @__PURE__ */ H({
  ...nn,
  props: {
    title: null,
    modelValue: { type: Boolean },
    width: null,
    center: { type: Boolean },
    top: null,
    beforeClose: null,
    closeOnClickModal: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(!1);
    return de(
      () => n.modelValue,
      (o) => {
        t.value = o;
      },
      {
        immediate: !0
      }
    ), de(
      () => t.value,
      (o) => {
        l("update:modelValue", o);
      }
    ), (o, r) => (h(), K(i(W1), {
      modelValue: t.value,
      "onUpdate:modelValue": r[1] || (r[1] = (c) => t.value = c),
      "close-on-click-modal": e.closeOnClickModal,
      title: e.title,
      width: e.width,
      top: e.top,
      fullscreen: a.value,
      center: e.center,
      "before-close": e.beforeClose,
      draggable: ""
    }, Y1({
      default: S(() => [
        s("div", {
          class: "full-screen",
          onClick: r[0] || (r[0] = (c) => a.value = !a.value)
        }, [
          a.value ? (h(), _("svg", J0, Q0)) : (h(), _("svg", G0, tn))
        ]),
        ie(o.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      o.$slots.footer ? {
        name: "footer",
        fn: S(() => [
          ie(o.$slots, "footer", {}, void 0, !0)
        ])
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
}), an = /* @__PURE__ */ le(on, [["__scopeId", "data-v-0959f624"]]);
me(an);
const ln = { class: "field" }, sn = H({
  name: "UDivider"
}), rn = /* @__PURE__ */ H({
  ...sn,
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const l = e;
    Te((t) => ({
      "0f43a3e3": l.borderStyle
    }));
    const n = L();
    return de(
      () => l.position,
      (t) => {
        switch (t) {
          case "left":
            n.value = "is-left";
            break;
          case "right":
            n.value = "is-right";
            break;
        }
      },
      { immediate: !0 }
    ), (t, a) => (h(), _("div", {
      class: P(["u-divider", { vertical: e.vertical }])
    }, [
      s("fieldset", ln, [
        t.$slots.default || e.vertical ? (h(), _("legend", {
          key: 0,
          class: P(["inner", n.value])
        }, [
          ie(t.$slots, "default", {}, void 0, !0)
        ], 2)) : N("", !0)
      ])
    ], 2));
  }
}), cn = /* @__PURE__ */ le(rn, [["__scopeId", "data-v-613cf62e"]]);
me(cn);
const un = [
  {
    type: "success",
    options: {
      color: "#67c23a",
      bgColor: "#f0f9eb",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2040"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" p-id="2041"></path></svg>'
    }
  },
  {
    type: "info",
    options: {
      color: "#909399",
      bgColor: "#f4f4f5",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950"><path d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64z m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68 0.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z" p-id="1951"></path></svg>'
    }
  },
  {
    type: "warn",
    options: {
      color: "#fdf6ec",
      bgColor: "#e6a23c",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256z m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" p-id="1981"></path></svg>'
    }
  },
  {
    type: "error",
    options: {
      color: "#f56c6c",
      bgColor: "#fef0f0",
      icon: '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8851"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" p-id="8852"></path></svg>'
    }
  }
], dn = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function vn(e) {
  return un.find((l) => l.type === e);
}
function pn() {
  return dn;
}
const hn = {
  key: 1,
  "aria-hidden": "true"
}, fn = ["xlink:href"], mn = H({
  name: "UIcon"
}), gn = /* @__PURE__ */ H({
  ...mn,
  props: {
    name: null,
    size: null,
    color: null
  },
  setup(e) {
    const l = e, n = Z(() => "#" + l.name), t = Z(() => ({
      fontSize: u0(l.size) ? l.size + "px" : l.size,
      color: l.color
    }));
    return (a, o) => (h(), _("i", {
      class: "u-icon",
      style: ke(i(t))
    }, [
      a.$slots.default ? ie(a.$slots, "default", { key: 0 }, void 0, !0) : (h(), _("svg", hn, [
        s("use", { "xlink:href": i(n) }, null, 8, fn)
      ]))
    ], 4));
  }
}), _n = /* @__PURE__ */ le(gn, [["__scopeId", "data-v-651fee2f"]]), qe = me(_n), wn = { class: "v-toast" }, yn = { class: "inner" }, xn = { class: "message" }, bn = H({
  name: "UToast"
}), $n = /* @__PURE__ */ H({
  ...bn,
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const l = e;
    Te((a) => ({
      "32942c69": i(n).color,
      cd282cb8: i(n).bgColor
    }));
    const n = oe(pn().options), t = L(!1);
    return de(
      () => l.type,
      (a) => {
        const o = vn(a);
        o && (n.color = o.options.color, n.bgColor = o.options.bgColor, n.icon = o.options.icon);
      },
      { immediate: !0 }
    ), he(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, l.duration);
    }), (a, o) => (h(), _("div", wn, [
      M(Ee, { name: "v-toast" }, {
        default: S(() => [
          ue(s("div", yn, [
            s("div", xn, [
              i(n).icon ? (h(), K(i(qe), {
                key: 0,
                innerHTML: i(n).icon
              }, null, 8, ["innerHTML"])) : N("", !0),
              s("span", {
                class: P({ normal: e.type != "normal" })
              }, Y(e.message), 3)
            ])
          ], 512), [
            [Me, t.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
}), Cn = /* @__PURE__ */ le($n, [["__scopeId", "data-v-28f70f38"]]);
function H1(e) {
  let l = e.duration;
  if (!e.message)
    return;
  e.duration = l || 1e3;
  const { vnode: n, div: t } = d0(Cn, e);
  return setTimeout(() => {
    v0(t);
  }, e.duration + 300), n;
}
const kn = (e) => (Q("data-v-f225752a"), e = e(), G(), e), Mn = ["placeholder", "onKeydown", "innerHTML"], zn = ["src"], Ln = ["onClick"], Sn = /* @__PURE__ */ kn(() => /* @__PURE__ */ s("svg", {
  "data-v-48a7e3c5": "",
  "data-v-7c7c7498": "",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("rect", {
    width: "12",
    height: "12",
    rx: "2",
    fill: "#86909C"
  }),
  /* @__PURE__ */ s("path", {
    "data-v-48a7e3c5": "",
    "data-v-7c7c7498": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z",
    fill: "white"
  })
], -1)), Fn = [
  Sn
], Tn = H({
  name: "UEditor"
}), Hn = /* @__PURE__ */ H({
  ...Tn,
  props: {
    placeholder: null,
    modelValue: null,
    minHeight: { default: 30 },
    imgList: null
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit"],
  setup(e, { expose: l, emit: n }) {
    const t = e;
    Te((C) => ({
      "53776e47": i(u),
      f95f8082: i(v)
    }));
    const a = L(), o = L(), r = L(), c = L(!1), w = L(!1), p = L(), { imgList: d } = Oe(t), u = Z(() => t.minHeight + "px"), v = Z(() => t.minHeight == 30 ? "4px 10px" : "8px 12px");
    de(
      () => t.modelValue,
      (C) => {
        c.value || (r.value = C);
      }
    );
    function f(C) {
      n("focus", C), c.value = !0, w.value = !0;
    }
    function g(C) {
      var z, F;
      a.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0), n("blur", C), (F = o.value) != null && F.innerHTML || (w.value = !1), c.value = !1;
    }
    function m(C) {
      const { innerHTML: z } = C.target;
      n("update:modelValue", z), n("input", C);
    }
    function b(C) {
      var z, F;
      let U = window.getSelection();
      if (U) {
        U.removeAllRanges(), a.value || ((z = o.value) == null || z.focus(), a.value = U.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(C)), a.value.collapse(!1), U.addRange(a.value), n("update:modelValue", ((F = o.value) == null ? void 0 : F.innerHTML) || "");
        const O = o.value;
        n("input", O);
      }
    }
    function x() {
      o.value && (o.value.innerHTML = "", n("update:modelValue", o.value.innerHTML), w.value = !1);
    }
    function B() {
      ge(() => {
        var C;
        (C = o.value) == null || C.focus();
      });
    }
    const D = (C) => {
      C.ctrlKey && C.key == "Enter" && (Le(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? H1({ message: "内容不能为空", type: "info" }) : n("submit"));
    }, T = (C) => {
      var z;
      (z = d == null ? void 0 : d.value) == null || z.splice(C, 1);
    };
    return he(() => {
      var C;
      (C = o.value) == null || C.addEventListener("keyup", (z) => {
        const F = z.target;
        F.innerHTML == "<br>" && (F.innerHTML = "");
      });
    }), l({
      addText: b,
      clear: x,
      focus: B,
      imageRef: p
    }), (C, z) => (h(), _("div", {
      class: P(["u-editor", { active: w.value }])
    }, [
      s("div", {
        ref_key: "editorRef",
        ref: o,
        class: "rich-input",
        contenteditable: "true",
        placeholder: e.placeholder,
        onFocus: f,
        onInput: m,
        onBlur: g,
        onKeydown: je(D, ["enter"]),
        innerHTML: r.value
      }, null, 40, Mn),
      s("div", {
        ref_key: "imageRef",
        ref: p,
        class: "image-preview-box"
      }, [
        (h(!0), _(X, null, ne(i(d), (F, U) => (h(), _("div", {
          key: U,
          class: "image-preview"
        }, [
          s("img", {
            src: F,
            alt: ""
          }, null, 8, zn),
          s("div", {
            class: "clean-btn",
            onClick: (O) => T(U)
          }, Fn, 8, Ln)
        ]))), 128))
      ], 512)
    ], 2));
  }
}), Vn = /* @__PURE__ */ le(Hn, [["__scopeId", "data-v-f225752a"]]), In = me(Vn), Bn = { class: "u-fold" }, An = { class: "action-box select-none" }, Dn = H({
  name: "UFold"
}), En = /* @__PURE__ */ H({
  ...Dn,
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const l = e;
    Te((c) => ({
      f316b618: i(n)
    }));
    const n = Z(() => {
      let c = Math.trunc(Number(l.line));
      return c > 0 ? c : 1;
    }), t = L(!0), a = L(!1), o = L();
    let r;
    return he(() => {
      r = new ResizeObserver((c) => {
        t.value && o.value && (a.value = o.value.offsetHeight < o.value.scrollHeight);
      }), r.observe(o.value);
    }), Fe(() => {
      r.disconnect();
    }), (c, w) => (h(), _("div", Bn, [
      s("div", {
        class: P(["txt-box", { "over-hidden": t.value }])
      }, [
        s("div", {
          ref_key: "divBox",
          ref: o
        }, [
          ie(c.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      s("div", An, [
        a.value && e.unfold ? (h(), _("div", {
          key: 0,
          class: "expand-btn",
          onClick: w[0] || (w[0] = (p) => t.value = !t.value)
        }, Y(t.value ? "展开" : "收起"), 1)) : N("", !0)
      ])
    ]));
  }
}), On = /* @__PURE__ */ le(En, [["__scopeId", "data-v-3a8862bb"]]), jn = me(On), Un = /* @__PURE__ */ H({
  props: {
    modelValue: null
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: l, emit: n }) {
    const t = e, a = oe({
      type: "",
      email: "",
      password: ""
    }), o = (g, m, b) => {
      const x = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!m)
        return b("请输入邮箱!");
      x.test(m) || b("邮箱地址不合法"), b();
    }, r = (g, m, b) => {
      m ? m != a.password ? b("输入密码不一致") : b() : b("请确认密码");
    }, c = L(), w = L(), p = oe({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), d = oe({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      },
      checkPass: {
        required: !0,
        validator: r,
        trigger: "blur"
      }
    }), u = oe({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    de(
      () => t.modelValue,
      (g) => {
        switch (ge(() => f()), g) {
          case "login":
            w.value = p, u.type = "登录", u.one = { key: "register", value: "邮箱注册" }, u.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            w.value = p, u.type = "注册", u.one = { key: "login", value: "邮箱登录" }, u.two = { key: "", value: "" };
            break;
          case "forget":
            w.value = d, u.type = "修改密码", u.one = { key: "login", value: "邮箱登录" }, u.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function v() {
      a.type = t.modelValue, c.value.validate((g) => {
        g && n("submit", a);
      });
    }
    function f() {
      c.value.resetFields();
    }
    return l({
      reset: f
    }), (g, m) => {
      const b = te("el-button");
      return h(), K(i(Z1), {
        ref_key: "ruleFormRef",
        ref: c,
        model: i(a),
        rules: w.value,
        class: "select-none"
      }, {
        default: S(() => [
          M(i(Ce), { prop: "email" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).email,
                "onUpdate:modelValue": m[0] || (m[0] = (x) => i(a).email = x),
                placeholder: "请输入邮箱",
                onFocus: m[1] || (m[1] = (x) => g.$emit("toggle", 1)),
                onBlur: m[2] || (m[2] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          M(i(Ce), { prop: "password" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).password,
                "onUpdate:modelValue": m[3] || (m[3] = (x) => i(a).password = x),
                placeholder: "请输入密码",
                onFocus: m[4] || (m[4] = (x) => g.$emit("toggle", 2)),
                onBlur: m[5] || (m[5] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          ue(M(i(Ce), { prop: "checkPass" }, {
            default: S(() => [
              M(i(Se), {
                modelValue: i(a).checkPass,
                "onUpdate:modelValue": m[6] || (m[6] = (x) => i(a).checkPass = x),
                placeholder: "请确认密码",
                onFocus: m[7] || (m[7] = (x) => g.$emit("toggle", 2)),
                onBlur: m[8] || (m[8] = (x) => g.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Me, e.modelValue == "forget"]
          ]),
          M(i(Ce), null, {
            default: S(() => [
              M(b, {
                style: { width: "100%" },
                type: "primary",
                onClick: v
              }, {
                default: S(() => [
                  ae(Y(i(u).type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          M(i(Ce), null, {
            default: S(() => [
              s("div", {
                onClick: m[9] || (m[9] = (x) => g.$emit("update:modelValue", i(u).one.key))
              }, Y(i(u).one.value), 1),
              s("div", {
                onClick: m[10] || (m[10] = (x) => g.$emit("update:modelValue", i(u).two.key))
              }, Y(i(u).two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
}), Rn = /* @__PURE__ */ le(Un, [["__scopeId", "data-v-525985f8"]]), Yn = { class: "u-sign" }, Nn = /* @__PURE__ */ ae("登录/注册"), qn = /* @__PURE__ */ ae("其他方式登录"), Pn = { class: "sign-oauth" }, Wn = H({
  name: "USign"
}), Zn = /* @__PURE__ */ H({
  ...Wn,
  emits: ["submit"],
  setup(e, { emit: l }) {
    const n = L(!1), t = L("login"), a = L(0), o = Z(() => {
      switch (t.value) {
        case "login":
          return "登录";
        case "register":
          return "注册";
        case "forget":
          return "修改密码";
        default:
          return "";
      }
    });
    return (r, c) => {
      const w = te("u-divider"), p = te("u-icon"), d = te("u-dialog");
      return h(), _("div", Yn, [
        M(i(Ue), {
          link: "",
          onClick: c[0] || (c[0] = (u) => n.value = !0)
        }, {
          default: S(() => [
            Nn
          ]),
          _: 1
        }),
        M(d, {
          modelValue: n.value,
          "onUpdate:modelValue": c[4] || (c[4] = (u) => n.value = u),
          title: i(o),
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: S(() => [
            M(Rn, {
              modelValue: t.value,
              "onUpdate:modelValue": c[1] || (c[1] = (u) => t.value = u),
              onToggle: c[2] || (c[2] = (u) => a.value = u),
              onSubmit: c[3] || (c[3] = (u) => r.$emit("submit", u))
            }, null, 8, ["modelValue"]),
            M(w, null, {
              default: S(() => [
                qn
              ]),
              _: 1
            }),
            s("div", Pn, [
              M(p, { name: "QQ" }),
              M(p, { name: "weixin" }),
              M(p, { name: "gitee" }),
              M(p, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}), Kn = /* @__PURE__ */ le(Zn, [["__scopeId", "data-v-0496baf2"]]);
me(Kn);
const Jn = (e) => (Q("data-v-3a07e116"), e = e(), G(), e), Xn = { class: "custom-contextmenu__menu" }, Qn = ["onClick"], Gn = /* @__PURE__ */ Jn(() => /* @__PURE__ */ s("div", { class: "arrow" }, null, -1)), eo = /* @__PURE__ */ H({
  props: {
    dropdown: null
  },
  emits: ["submit"],
  setup(e, { expose: l, emit: n }) {
    const t = oe({
      tag: {},
      isShow: !1,
      dropdownList: [
        {
          title: "刷新",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1671"><path d="M894.481158 505.727133c0 49.589418-9.711176 97.705276-28.867468 143.007041-18.501376 43.74634-44.98454 83.031065-78.712713 116.759237-33.728172 33.728172-73.012897 60.211337-116.759237 78.712713-45.311998 19.156292-93.417623 28.877701-143.007041 28.877701s-97.695043-9.721409-142.996808-28.877701c-43.756573-18.501376-83.031065-44.98454-116.76947-78.712713-33.728172-33.728172-60.211337-73.012897-78.712713-116.759237-19.156292-45.301765-28.867468-93.417623-28.867468-143.007041 0-49.579185 9.711176-97.695043 28.867468-142.996808 18.501376-43.74634 44.98454-83.031065 78.712713-116.759237 33.738405-33.728172 73.012897-60.211337 116.76947-78.712713 45.301765-19.166525 93.40739-28.877701 142.996808-28.877701 52.925397 0 104.008842 11.010775 151.827941 32.745798 46.192042 20.977777 86.909395 50.79692 121.016191 88.608084 4.389984 4.860704 8.646937 9.854439 12.781094 14.97097l0-136.263453c0-11.307533 9.168824-20.466124 20.466124-20.466124 11.307533 0 20.466124 9.15859 20.466124 20.466124l0 183.64253c0 5.433756-2.148943 10.632151-5.986341 14.46955-3.847631 3.837398-9.046027 5.996574-14.479783 5.996574l-183.64253-0.020466c-11.307533 0-20.466124-9.168824-20.466124-20.466124 0-11.307533 9.168824-20.466124 20.466124-20.466124l132.293025 0.020466c-3.960195-4.952802-8.063653-9.782807-12.289907-14.479783-30.320563-33.605376-66.514903-60.098773-107.549481-78.753645-42.467207-19.289322-87.850837-29.072129-134.902456-29.072129-87.195921 0-169.172981 33.9533-230.816946 95.597265-61.654198 61.654198-95.597265 143.621025-95.597265 230.816946s33.943067 169.172981 95.597265 230.816946c61.643965 61.654198 143.621025 95.607498 230.816946 95.607498s169.172981-33.9533 230.816946-95.607498c61.654198-61.643965 95.597265-143.621025 95.597265-230.816946 0-11.2973 9.168824-20.466124 20.466124-20.466124C885.322567 485.261009 894.481158 494.429833 894.481158 505.727133z"></path></svg>'
        },
        {
          title: "关闭",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1701"><path d="M504.4084931 451.09198277L833.25648384 122.26912946a25.13744005 25.13744005 0 0 1 35.54434023 0l17.77217012 17.77217011a25.13744005 25.13744005 0 0 1 0 35.54434025L557.7501409 504.4084931 886.54785674 833.25648384a25.13744005 25.13744005 0 0 1 0 35.54434023l-17.77217012 17.77217012a25.13744005 25.13744005 0 0 1-35.54434023 0L504.4084931 557.7501409 175.58563982 886.54785674a25.13744005 25.13744005 0 0 1-35.54434025 0l-17.77217011-17.77217012a25.13744005 25.13744005 0 0 1 0-35.54434023l328.82285331-328.84799073-328.82285331-328.82285329a25.13744005 25.13744005 0 0 1 0-35.54434023l17.77217011-17.77217011a25.13744005 25.13744005 0 0 1 35.54434025 0l328.82285328 328.8228533z"></path></svg>'
        },
        {
          title: "关闭其他",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="829"><path d="M508.93637449 458.92857969l109.04150167-109.04150165a23.56635005 23.56635005 0 0 1 33.32281895 0l16.6614095 16.66140948a23.56635005 23.56635005 0 0 1 0 33.3463853L558.8970366 508.93637449l109.04150166 109.04150167a23.56635005 23.56635005 0 0 1 0 33.32281895l-16.66140948 16.6614095a23.56635005 23.56635005 0 0 1-33.32281898 0L508.93637449 558.8970366l-109.04150167 109.04150166a23.56635005 23.56635005 0 0 1-33.3463853 0l-16.66140948-16.66140948a23.56635005 23.56635005 0 0 1 0-33.32281898l109.04150165-109.04150165-109.04150165-109.04150169a23.56635005 23.56635005 0 0 1 0-33.34638529l16.66140948-16.66140949a23.56635005 23.56635005 0 0 1 33.3463853 0l109.04150167 109.04150166z m0 471.11490379c232.5763086 0 421.13067533-188.53080036 421.13067534-421.13067533C930.06704983 276.33649952 741.48911675 87.80569917 508.93637449 87.80569917 276.33649952 87.80569917 87.80569917 276.33649952 87.80569917 508.93637449c0 232.5763086 188.53080036 421.13067533 421.13067532 421.13067534z m0 70.69905013C237.31062386 1000.76609997 17.10664903 780.56212513 17.10664903 508.93637449 17.10664903 237.33419021 237.31062386 17.10664903 508.93637449 17.10664903c271.62575065 0 491.82972547 220.20397484 491.82972548 491.82972546 0 271.62575065-220.20397484 491.82972547-491.82972548 491.82972548z"></path></svg>'
        },
        {
          title: "全部关闭",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889"><path d="M192 640v32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V128H128v512h64z m128 128v32H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V256H256v512h64z m288 128v32h-224a32 32 0 0 1-32-32V384a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v224h-32v-224H384v512h224z m96-224h224a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32h-224a32 32 0 0 1-32-32v-224a32 32 0 0 1 32-32z m162.272 149.024l67.872-67.872-45.248-45.28-67.872 67.904-67.872-67.904-45.28 45.28 67.904 67.84-67.904 67.904 45.28 45.248 67.84-67.84 67.904 67.84 45.248-45.248-67.84-67.872z"></path></svg>'
        },
        {
          title: "当前页全屏",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="859"><path d="M160 96h192q14.016 0.992 23.008 10.016t8.992 22.496-8.992 22.496T352 160H160v192q0 14.016-8.992 23.008T128 384t-23.008-8.992T96 352V96h64z m0 832H96v-256q0-14.016 8.992-23.008T128 640t23.008 8.992T160 672v192h192q14.016 0 23.008 8.992t8.992 22.496-8.992 22.496T352 928H160zM864 96h64v256q0 14.016-8.992 23.008T896 384t-23.008-8.992T864 352V160h-192q-14.016 0-23.008-8.992T640 128.512t8.992-22.496T672 96h192z m0 832h-192q-14.016-0.992-23.008-10.016T640 895.488t8.992-22.496T672 864h192v-192q0-14.016 8.992-23.008T896 640t23.008 8.992T928 672v256h-64z"></path></svg>'
        }
      ]
    }), a = (p) => {
      t.tag = p, t.dropdownList[1].show = !p.meta.isAffix, o(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, o = () => {
      t.isShow = !1;
    };
    he(() => {
      window.addEventListener("click", o);
    }), Fe(() => {
      window.removeEventListener("click", o);
    });
    const { isShow: r, dropdownList: c, tag: w } = Oe(t);
    return l({
      openContextmenu: a
    }), (p, d) => {
      const u = te("u-icon");
      return h(), K(Ee, { name: "el-zoom-in-center" }, {
        default: S(() => [
          ue(s("div", {
            style: ke(`top: ${e.dropdown.y + 5}px; left: ${e.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            s("ul", Xn, [
              (h(!0), _(X, null, ne(i(c), (v, f) => (h(), _(X, { key: f }, [
                v.show ? (h(), _("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (g) => p.$emit("submit", f, i(w))
                }, [
                  M(u, {
                    innerHTML: v.icon
                  }, null, 8, ["innerHTML"]),
                  s("span", null, Y(v.title), 1)
                ], 8, Qn)) : N("", !0)
              ], 64))), 128))
            ]),
            Gn
          ], 4), [
            [Me, i(r)]
          ])
        ]),
        _: 1
      });
    };
  }
}), to = /* @__PURE__ */ le(eo, [["__scopeId", "data-v-3a07e116"]]), no = (e) => (Q("data-v-6ca3aeac"), e = e(), G(), e), oo = { class: "u-tabs" }, ao = ["onClick", "onContextmenu"], lo = { class: "select-none" }, so = /* @__PURE__ */ no(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), io = H({
  name: "UTags"
}), ro = /* @__PURE__ */ H({
  ...io,
  props: {
    classic: { type: Boolean },
    modelValue: null
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: l }) {
    const n = e, t = L(), a = L(), o = a1(n, "modelValue"), r = L(0), c = oe({
      x: 0,
      y: 0
    });
    de(
      () => [...o.value],
      (v, f) => {
        if (f) {
          if (console.log(v, f), v.length > f.length) {
            let g = v.find((m) => !(f != null && f.includes(m)));
            o.value.forEach((m, b, x) => {
              x.findIndex((B) => B.path == m.path) != b && x.splice(b, 1);
            }), r.value = o.value.findIndex((m) => m.path == (g == null ? void 0 : g.path));
          }
        } else {
          let g = 1;
          o.value.forEach((m, b, x) => {
            x.findIndex((B) => B.path == m.path) != b && (x.splice(b, 1), r.value = x.findIndex((B) => B.path == m.path), g = 0);
          }), g && (r.value = o.value.length - 1);
        }
        ge(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), de(
      () => r.value,
      (v) => {
        l(
          "select",
          o.value.find((f, g) => g == v)
        );
      }
    );
    const w = (v) => {
      o.value.map((f, g) => {
        if (!f.meta.isAffix && v == g)
          if (o.value.splice(g, 1), g == r.value) {
            let m = [g, g - 1].filter((b) => b >= 0 && b < o.value.length);
            r.value = m[0], r.value == g && l(
              "select",
              o.value.find((b, x) => x == v)
            );
          } else
            v < r.value && (r.value -= 1);
      });
    }, p = (v) => {
      let f = o.value.filter((m) => m.meta.isAffix);
      v && !v.meta.isAffix && f.push(v), o.value.length = 0, o.value.push(...f);
      let g = o.value.length - 1;
      r.value = g >= 0 ? g : 0;
    }, d = (v, f) => {
      switch (v) {
        case 0:
          l("refresh", f);
          break;
        case 1:
          let g = o.value.findIndex((m) => m.path == f.path);
          w(g), l("close", f);
          break;
        case 2:
          p(f), l("closeOther", f);
          break;
        case 3:
          p(), l("closeAll");
          break;
        case 4:
          l("fullScreen", f);
          break;
      }
    }, u = (v, f) => {
      const { clientX: g, clientY: m } = f;
      c.x = g, c.y = m, a.value.openContextmenu(v);
    };
    return (v, f) => {
      const g = te("u-icon");
      return h(), _("div", oo, [
        M(i(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: S(() => [
            s("ul", {
              class: P([{ "classic-style": e.classic }, "u-tabs-ul"])
            }, [
              (h(!0), _(X, null, ne(e.modelValue, (m, b) => (h(), _("li", {
                key: b,
                class: P([{ "is-active": r.value == b }, "u-tabs-ul-li"]),
                onClick: (x) => r.value = b,
                onContextmenu: n1((x) => u(m, x), ["prevent"])
              }, [
                s("span", lo, Y(m.meta.title), 1),
                m.meta.isAffix ? N("", !0) : (h(), K(g, {
                  key: 0,
                  onClick: n1((x) => d(1, m), ["stop"])
                }, {
                  default: S(() => [
                    so
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, ao))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        M(to, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: i(c),
          onSubmit: d
        }, null, 8, ["dropdown"])
      ]);
    };
  }
}), co = /* @__PURE__ */ le(ro, [["__scopeId", "data-v-6ca3aeac"]]);
me(co);
const uo = { key: 0 }, vo = H({
  name: "UNoticeBar"
}), po = /* @__PURE__ */ H({
  ...vo,
  props: {
    data: null,
    size: { default: 14 },
    vertical: { type: Boolean },
    height: { default: 40 },
    delay: { default: 1e3 },
    spped: { default: 100 },
    suffixIcon: null,
    prefixIcon: null,
    color: { default: "--color-warning" },
    background: { default: "var(--color-warning-light-9)" }
  },
  setup(e) {
    const l = e, n = oe({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), o = Z(() => l.delay > 2e3 ? l.delay : 2e3), r = () => {
      ge(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), c(), setTimeout(() => {
          w();
        }, l.delay);
      });
    }, c = () => {
      n.oneTime = n.textWidth / l.spped, n.twoTime = (n.textWidth + n.boxWidth) / l.spped;
    }, w = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, p = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          w();
        },
        !1
      );
    };
    return he(() => {
      l.vertical || (r(), p());
    }), (d, u) => {
      const v = te("el-carousel-item"), f = te("u-icon");
      return h(), _("div", {
        class: "u-notice-bar",
        style: ke({ background: e.background, height: `${e.height}px` })
      }, [
        e.vertical ? (h(), _("div", uo, [
          M(i(K1), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: i(o)
          }, {
            default: S(() => [
              (h(!0), _(X, null, ne(e.data, (g) => (h(), K(v, { key: g }, {
                default: S(() => [
                  ae(Y(g), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (h(), _("div", {
          key: 1,
          style: ke({ color: e.color, fontSize: `${e.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          e.prefixIcon ? (h(), K(f, {
            key: 0,
            name: e.prefixIcon
          }, null, 8, ["name"])) : N("", !0),
          s("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            s("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, Y(e.data), 513)
          ], 512),
          e.suffixIcon ? (h(), K(f, {
            key: 1,
            name: e.suffixIcon
          }, null, 8, ["name"])) : N("", !0)
        ], 4))
      ], 4);
    };
  }
}), ho = /* @__PURE__ */ le(po, [["__scopeId", "data-v-e0f6f4fa"]]);
me(ho);
const fo = (e) => (Q("data-v-109f740b"), e = e(), G(), e), mo = { class: "u-anchor" }, go = { class: "toc-content" }, _o = /* @__PURE__ */ fo(() => /* @__PURE__ */ s("h3", { class: "toc-content-heading" }, "目录", -1)), wo = { class: "toc-items" }, yo = ["onClick"], xo = H({
  name: "UAnchor"
}), bo = /* @__PURE__ */ H({
  ...xo,
  props: {
    container: null,
    scroll: null,
    targetOffset: { default: 0 }
  },
  setup(e) {
    const l = e, n = L(0), t = L({}), a = L({}), o = (p) => {
      switch (p) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, r = () => {
      const p = [];
      t.value.forEach((u) => {
        p.push(u.offsetTop);
      });
      const d = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      p.forEach((u, v) => {
        d >= u - 10 - l.targetOffset && (n.value = v);
      });
    }, c = (p) => {
      const d = t.value.item(p);
      console.log(d), l.scroll ? a.value.scrollTo({
        top: d.offsetTop - l.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: d.offsetTop - l.targetOffset,
        behavior: "smooth"
      });
    };
    he(() => {
    }), Fe(() => {
      a.value.removeEventListener("scroll", r);
    });
    let w;
    return he(() => {
      let p = document.querySelector(l.container);
      w = new ResizeObserver((d) => {
        l.scroll ? a.value = document.querySelector(l.scroll) : a.value = window, t.value = p.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", r);
      }), w.observe(p);
    }), Fe(() => {
      a.value.removeEventListener("scroll", r), w.disconnect();
    }), (p, d) => {
      const u = te("u-divider");
      return h(), _("div", mo, [
        s("nav", go, [
          _o,
          M(u),
          s("ul", wo, [
            (h(!0), _(X, null, ne(t.value, (v, f) => (h(), _("li", {
              key: f,
              class: P([{ active: n.value == f }, o(v.nodeName)]),
              onClick: (g) => c(f)
            }, Y(v.innerText), 11, yo))), 128))
          ])
        ])
      ]);
    };
  }
}), $o = /* @__PURE__ */ le(bo, [["__scopeId", "data-v-109f740b"]]);
me($o);
const Je = (e) => (Q("data-v-8fe41af1"), e = e(), G(), e), Co = { class: "card-box u-scrollbar" }, ko = {
  key: 0,
  class: "history"
}, Mo = { class: "header" }, zo = /* @__PURE__ */ Je(() => /* @__PURE__ */ s("div", { class: "title" }, "历史搜索", -1)), Lo = /* @__PURE__ */ Je(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), So = /* @__PURE__ */ ae(" 清空 "), Fo = { class: "trending" }, To = { class: "title" }, Ho = /* @__PURE__ */ Je(() => /* @__PURE__ */ s("span", null, "热搜", -1)), Vo = /* @__PURE__ */ Je(() => /* @__PURE__ */ s("svg", {
  "data-v-5fe91717": "",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "data-v-5fe91717": "",
    d: "M12.8 5.2C13.9532 6.46 14.8 8.2 14.8 10C14.7039 12.8937 12.6843 15.1706 9.97973 15.8159C10.359 12.3442 7.77588 9.35406 7.77588 9.35406C7.77588 9.35406 7.99512 13.7064 6.79514 15.8104C4.03715 15.1428 2 12.7806 2 9.8C2 7.776 2.9336 5.9728 4.4 4.8C5.8608 3.7056 6.8 1.9656 6.8 0C9.684 0.4368 11.894 2.9264 11.894 5.932C11.894 6.5012 11.746 7.0652 11.6 7.6C12.1264 6.9024 12.6184 6.0876 12.8 5.2Z",
    fill: "#F53F3F"
  })
], -1)), Io = { class: "hot-list" }, Bo = ["onClick"], Ao = { class: "trending-text u-ellipsis" }, Do = /* @__PURE__ */ Je(() => /* @__PURE__ */ s("div", { class: "trending-mark" }, null, -1)), Eo = /* @__PURE__ */ H({
  props: {
    data: null
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: l }) {
    return (n, t) => {
      const a = te("u-icon");
      return ue((h(), _("div", Co, [
        e.data.historySearchList.length != 0 ? (h(), _("div", ko, [
          s("div", Mo, [
            zo,
            M(i(s1), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: t[0] || (t[0] = (o) => n.$emit("onClear"))
            }, {
              default: S(() => [
                M(a, null, {
                  default: S(() => [
                    Lo
                  ]),
                  _: 1
                }),
                So
              ]),
              _: 1
            })
          ]),
          (h(!0), _(X, null, ne(e.data.historySearchList, (o, r) => (h(), K(i(J1), {
            key: r,
            type: o.type,
            closable: "",
            onClose: (c) => n.$emit("onClose", o.name),
            onClick: (c) => n.$emit("submit", o.name)
          }, {
            default: S(() => [
              ae(Y(o.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : N("", !0),
        s("div", Fo, [
          s("div", To, [
            Ho,
            M(a, { style: { margin: "0 6px" } }, {
              default: S(() => [
                Vo
              ]),
              _: 1
            })
          ]),
          s("div", Io, [
            (h(!0), _(X, null, ne(e.data.hotSearchList, (o, r) => (h(), _("div", {
              key: r,
              class: "hot-item",
              onClick: (c) => n.$emit("submit", o)
            }, [
              s("div", {
                class: P(["trending-rank", { "trending-rank-top": r < 3 }])
              }, Y(r + 1), 3),
              s("div", Ao, Y(o), 1),
              Do
            ], 8, Bo))), 128))
          ])
        ])
      ], 512)), [
        [Me, e.data.cardVisible]
      ]);
    };
  }
}), Oo = /* @__PURE__ */ le(Eo, [["__scopeId", "data-v-8fe41af1"]]), V1 = (e) => (Q("data-v-d01371d0"), e = e(), G(), e), jo = { class: "u-search" }, Uo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, Ro = /* @__PURE__ */ V1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7187"
}, [
  /* @__PURE__ */ s("path", {
    d: "M344.16 960c-58.976-124.256-27.552-195.456 17.76-262.528 49.632-73.472 62.432-146.176 62.432-146.176s39.008 51.36 23.424 131.68c68.928-77.696 81.888-201.472 71.52-248.896 155.776 110.272 222.336 348.992 132.64 525.92C1129.024 686.528 770.56 277.376 708.16 231.264c20.8 46.08 24.736 124.128-17.28 161.984C619.744 120 443.84 64 443.84 64c20.8 140.928-75.392 295.008-168.16 410.144-3.264-56.192-6.72-94.976-35.872-148.736-6.56 102.08-83.552 185.28-104.416 287.552-28.256 138.496 21.152 239.904 208.832 347.008L344.16 960zM344.16 960",
    "p-id": "7188",
    fill: "#F53F3F"
  })
], -1)), Yo = ["data-before", "data-after"], No = ["placeholder"], qo = { class: "btn" }, Po = /* @__PURE__ */ V1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-78e17ca8": ""
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }),
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  })
], -1)), Wo = /* @__PURE__ */ V1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ s("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), Zo = H({
  name: "USearch"
}), Ko = /* @__PURE__ */ H({
  ...Zo,
  props: {
    config: null
  },
  emits: ["submit"],
  setup(e, { emit: l }) {
    const n = e, t = L({}), a = a1(n.config, "keywords"), o = L(!1), r = L(0), c = L(!0), w = L(), p = oe({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), d = oe({
      search: "",
      cardVisible: !1,
      historySearchList: t1.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: n.config.hotSearchList
    });
    de(
      () => n.config.hotSearchList,
      (D) => {
        d.hotSearchList = D;
      }
    );
    const u = Z(() => {
      let D = a.value[r.value];
      return o.value || d.search ? "" : D;
    }), v = Z(() => {
      let D = typeof a.value[r.value + 1] > "u" ? a.value[0] : a.value[r.value + 1];
      return o.value || d.search ? "" : D;
    }), f = Z(() => {
      let D = a.value[r.value];
      return o.value ? D : "";
    }), g = Z(() => !o.value && !d.search && c.value), m = (D) => {
      let T = (z, F) => Math.round(Math.random() * (F - z)) + z, C = (z) => d.historySearchList.filter((F) => F.name == z).length != 0;
      if (D && d.historySearchList)
        C(D) || d.historySearchList.push({ name: D, type: p.types[T(0, 3)] });
      else {
        let z = o.value ? f : u;
        D = z.value, C(z.value) || d.historySearchList.push({ name: z.value, type: p.types[T(0, 3)] });
      }
      t1.set("searchHistory", d.historySearchList), d.search = D, t.value.focus(), l("submit", D);
    }, b = (D) => {
      d.historySearchList.findIndex((T) => T.name == D), d.historySearchList.splice(
        d.historySearchList.findIndex((T) => T.name == D),
        1
      ), t1.set("searchHistory", d.historySearchList);
    }, x = () => {
      d.historySearchList.length = 0, t1.remove("searchHistory");
    }, B = (D) => {
      if (D.pseudoElement == "::after") {
        c.value = !1;
        let T = typeof a.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = T, setTimeout(() => {
          c.value = !0;
        }, 3e3);
      }
    };
    return (D, T) => {
      const C = te("u-icon");
      return h(), _("div", jo, [
        s("div", {
          class: P(["search", { active: o.value }])
        }, [
          s("div", Uo, [
            M(C, null, {
              default: S(() => [
                Ro
              ]),
              _: 1
            })
          ]),
          s("label", {
            ref_key: "labelRef",
            ref: w,
            "data-before": i(u),
            "data-after": i(v),
            class: P({ animate: i(g) }),
            onAnimationend: B
          }, [
            ue(s("input", {
              ref_key: "inputRef",
              ref: t,
              "onUpdate:modelValue": T[0] || (T[0] = (z) => i(d).search = z),
              type: "text",
              placeholder: i(f),
              onFocus: T[1] || (T[1] = () => {
                o.value = !0, i(d).cardVisible = !0;
              }),
              onBlur: T[2] || (T[2] = (z) => o.value = !1),
              onKeyup: T[3] || (T[3] = je((z) => m(i(d).search), ["enter"]))
            }, null, 40, No), [
              [N1, i(d).search]
            ])
          ], 42, Yo),
          s("div", qo, [
            ue(M(C, {
              class: "close",
              onClick: T[4] || (T[4] = (z) => i(d).search = "")
            }, {
              default: S(() => [
                Po
              ]),
              _: 1
            }, 512), [
              [Me, i(d).search]
            ]),
            s("div", {
              class: "search-btn",
              onClick: T[5] || (T[5] = (z) => m(i(d).search))
            }, [
              M(C, null, {
                default: S(() => [
                  Wo
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        ue(M(Oo, {
          data: i(d),
          onOnClose: b,
          onOnClear: x,
          onSubmit: m
        }, null, 8, ["data"]), [
          [i(l1), () => i(d).cardVisible = !1, w.value]
        ])
      ]);
    };
  }
}), Jo = /* @__PURE__ */ le(Ko, [["__scopeId", "data-v-d01371d0"]]);
me(Jo);
const dt = (e, l) => {
  const n = /\[.+?\]/g;
  return l = l.replace(n, (t) => {
    const a = e[t];
    return a ? [
      '<img src="',
      a,
      '" width="20" height="20" alt="',
      t,
      '" title="',
      t,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      "/>"
    ].join("") : t;
  }), l;
}, Xo = (e) => {
  switch (e) {
    case 1:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="831"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#8CDBF4" p-id="832"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="833"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m950.857143-365.714285l73.142857-73.142858v146.285715h-73.142857z m73.142857-73.142858h146.285715v146.285715h-146.285715z m0 146.285715h146.285715v438.857143h-146.285715z" fill="#FFFFFF"></path></svg>';
    case 2:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="765"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#6ECEFF" p-id="766"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="767"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v146.285714h-146.285714z m-219.428572 292.571428V512h146.285714v146.285714z" fill="#FFFFFF" p-id="768"></path><path d="M1097.142857 585.142857V438.857143h365.714286v146.285714z m0 73.142857h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 3:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="799"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#599DFF" p-id="800"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="801"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v73.142857h-146.285714z m0 219.428571h146.285714v73.142857h-146.285714z m-146.285715-146.285714h292.571429v146.285714h-292.571429z m-73.142857 219.428571h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 4:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="815"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#34D19B" p-id="816"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="817"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m975.213715-365.714285L1243.428571 219.428571v219.428572h-146.285714zM1097.142857 438.857143h146.285714v292.571428h-146.285714z m146.285714 146.285714h73.142858v146.285714h-73.142858z m0-365.714286h73.142858v146.285715h-73.142858z m73.142858 0h146.285714v585.142858h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 5:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="782"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#FFA000" p-id="783"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="784"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-73.142857h146.285714v219.428572h-146.285714z m-219.428572-365.714286h365.714286v146.285715h-365.714286z m0 438.857143h219.428572v146.285715h-219.428572z m73.142857-219.428571h219.428572v146.285714h-219.428572z" fill="#FFFFFF" p-id="785"></path><path d="M1316.571429 438.857143h146.285714v146.285714h-146.285714z m-219.428572-73.142857h146.285714v219.428571h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 6:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="748"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#F36262" p-id="749"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="750"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-146.285714h146.285714v292.571429h-146.285714z m-73.142858-292.571429h146.285715v146.285715h-146.285715z m-146.285714 146.285715h146.285714v438.857143h-146.285714z" fill="#FFFFFF" p-id="751"></path><path d="M1243.428571 438.857143h219.428572v146.285714h-219.428572z m-48.786285-170.642286L1243.428571 219.428571v146.285715h-146.285714zM1243.428571 658.285714h146.285715v146.285715h-146.285715z" fill="#FFFFFF"></path></svg>';
    default:
      return "";
  }
}, vt = (e) => (Q("data-v-f75472b5"), e = e(), G(), e), Qo = { class: "message" }, Go = { class: "chat-list" }, ea = /* @__PURE__ */ vt(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), ta = { class: "content" }, na = {
  key: 0,
  class: "username"
}, oa = ["innerHTML"], aa = /* @__PURE__ */ vt(() => /* @__PURE__ */ s("div", { class: "date" }, null, -1)), la = /* @__PURE__ */ H({
  props: {
    data: null,
    userId: null
  },
  setup(e, { expose: l }) {
    const { allEmoji: n } = re(Xe), t = L();
    return l({
      scroll: () => {
        ge(() => {
          const a = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(a.offsetTop);
        });
      }
    }), (a, o) => (h(), _("div", Qo, [
      M(i(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: S(() => [
          s("div", Go, [
            (h(!0), _(X, null, ne(e.data, (r, c) => (h(), _("div", {
              key: c,
              class: P([{ self: e.userId == r.id }, "chat-item"])
            }, [
              s("div", null, [
                M(i(Ye), null, {
                  default: S(() => [
                    ea
                  ]),
                  _: 1
                })
              ]),
              s("div", ta, [
                e.userId != r.id ? (h(), _("div", na, Y(r.username), 1)) : N("", !0),
                s("div", {
                  class: "card-box",
                  innerHTML: i(dt)(i(n), r.content)
                }, null, 8, oa)
              ]),
              aa
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
}), sa = /* @__PURE__ */ le(la, [["__scopeId", "data-v-f75472b5"]]), u1 = (e) => (Q("data-v-888830cd"), e = e(), G(), e), ia = { class: "u-chat" }, ra = { class: "header" }, ca = /* @__PURE__ */ u1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1318 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    d: "M1318.502489 432.779052c0-231.790522-209.29842-419.704826-467.458992-419.704826s-467.56979 188.357498-467.56979 419.704826 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319412-19.168145L1165.822116 742.350141C1259.336074 665.56676 1318.502489 555.433023 1318.502489 432.779052z",
    fill: "#612273",
    "p-id": "10993"
  }),
  /* @__PURE__ */ s("path", {
    d: "M1034.304263 745.784895a509.673231 509.673231 0 0 1-183.482363 33.239559c-244.532352 0-445.077689-168.524562-465.353819-383.25211-1.107985 12.07704-1.883575 24.264878-1.883575 36.563514 0 231.790522 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319411-19.168145 25.262064 25.262064 0 0 0-7.5343-17.284571zM1165.822116 669.223112l2.769964 70.689461C1260.44406 663.239991 1318.502489 553.992642 1318.502489 432.779052a366.632331 366.632331 0 0 0-1.883575-36.785111 403.971435 403.971435 0 0 1-150.796798 273.229171z",
    fill: "#612273",
    opacity: ".2",
    "p-id": "10994"
  }),
  /* @__PURE__ */ s("path", {
    d: "M383.25211 432.779052a383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978C173.510496 258.160571 0 413.943302 0 606.178749c0 101.713049 48.97295 193.011037 126.421121 256.609392l-5.761524 148.470028a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696c-177.831638-59.388011-304.91755-212.733175-304.91755-393.113179z",
    fill: "#EB3D72",
    "p-id": "10995"
  }),
  /* @__PURE__ */ s("path", {
    d: "M342.256654 391.672798c0 117.557239 53.958883 223.59143 140.714132 299.71002a391.008007 391.008007 0 0 1-99.718676-258.603766 383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978-7.091106 0-14.071413 0-21.05172 0.553993a375.939407 375.939407 0 0 0-24.375677 132.958234zM630.111231 802.181346a407.627786 407.627786 0 0 1-283.533434 110.798528 424.136767 424.136767 0 0 1-152.12638-27.699632l-71.686647 71.686648-2.105173 54.291279a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696 486.294741 486.294741 0 0 1-58.058429-23.710885zM85.425665 821.792686l-5.761523-4.985934c1.883575 2.215971 3.656351 4.431941 5.650725 6.647911z",
    fill: "#EB3D72",
    opacity: ".5",
    "p-id": "10996"
  }),
  /* @__PURE__ */ s("path", {
    d: "M833.426531 332.395585c64.263147-10.193465 64.041549-66.479117 62.601169-75.342999s-15.400995-54.291279-59.942004-47.200173S799.078987 254.836615 799.078987 254.836615a28.475222 28.475222 0 1 0 56.174854-8.97468s6.315516 3.323956 8.30989 20.27613-11.966241 29.029214-35.455529 33.239559-88.638823-19.943735-104.039819-115.452067C709.110582 96.39472 781.57282 28.253625 838.966457 13.185025a55.399264 55.399264 0 0 0-64.041549-5.318329c-56.064055 35.123134-97.170309 109.579745-85.536464 182.817571 14.957801 93.846354 79.664142 151.904783 144.038087 141.711318zM203.980091 573.825579a53.072495 53.072495 0 0 0 33.90435-67.919498c-2.659165-6.537113-21.162519-38.225492-53.51569-25.040467a30.026401 30.026401 0 0 0-19.832936 40.773858 22.159706 22.159706 0 1 0 40.773858-16.619779s5.318329 1.329582 9.861069 13.739017-3.988747 24.043281-21.05172 31.023588-70.02467 0.553993-98.832288-68.695087C68.916685 417.599654 110.798528 353.558104 151.904783 332.395585a42.879031 42.879031 0 0 0-48.97295 7.423502 146.918849 146.918849 0 0 0-32.574767 152.458775c27.810431 68.141095 86.866046 100.605064 133.623025 81.547717z",
    fill: "#FED150",
    "p-id": "10997"
  })
], -1)), ua = /* @__PURE__ */ u1(() => /* @__PURE__ */ s("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ s("div", null, "聊天室"),
  /* @__PURE__ */ s("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), da = {
  id: "chat-footer",
  class: "footer"
}, va = /* @__PURE__ */ u1(() => /* @__PURE__ */ s("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7186"
}, [
  /* @__PURE__ */ s("path", {
    d: "M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448c247.008 0 448 200.96 448 448S757.984 960 510.944 960zM510.944 128c-211.744 0-384 172.256-384 384 0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C894.944 300.256 722.688 128 510.944 128zM512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48l0-64c0-26.528 21.472-48 48-48s48 21.472 48 48l0 64C416 493.696 394.496 515.2 368 515.2zM656 515.2c-26.496 0-48-21.472-48-48l0-64c0-26.528 21.504-48 48-48s48 21.472 48 48l0 64C704 493.696 682.496 515.2 656 515.2z",
    "p-id": "7187"
  })
], -1)), pa = /* @__PURE__ */ u1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ s("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), ha = /* @__PURE__ */ ae("chat"), fa = H({
  name: "UChat"
}), ma = /* @__PURE__ */ H({
  ...fa,
  props: {
    data: null,
    userId: null,
    emoji: null
  },
  emits: ["submit"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(""), o = L(), r = (d) => {
      const { ctrlKey: u, key: v } = d;
      u && v == "Enter" && w();
    }, c = () => {
      a.value = "", o.value.scroll();
    }, w = () => {
      let d = a.value;
      d.trim() ? (d = d.replace(/\n/g, "<br/>"), l("submit", { clear: c, content: d })) : H1({ type: "error", message: "内容不能为空" });
    }, p = (d) => {
      let u = document.getElementById("emojiInput"), v = u.selectionStart, f = u.selectionEnd, g = u.value;
      if (v === null || f === null)
        return;
      let m = g.substring(0, v) + d + g.substring(f);
      u.value = m, u.focus(), u.selectionStart = v + d.length, u.selectionEnd = v + d.length, a.value = m;
    };
    return ye(Xe, n.emoji), (d, u) => {
      const v = te("u-icon"), f = te("u-emoji");
      return h(), _("div", ia, [
        s("div", {
          class: P([{ active: t.value }, "chat-container translate"])
        }, [
          s("div", ra, [
            M(v, { size: "32" }, {
              default: S(() => [
                ca
              ]),
              _: 1
            }),
            ua
          ]),
          M(sa, {
            ref_key: "messageRef",
            ref: o,
            data: e.data,
            "user-id": e.userId
          }, null, 8, ["data", "user-id"]),
          s("div", da, [
            M(i(Se), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": u[0] || (u[0] = (g) => a.value = g),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: je(r, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            M(f, {
              style: { margin: "0 8px 0" },
              emoji: e.emoji,
              placement: "top-end",
              onAddEmoji: p
            }, {
              default: S(() => [
                va
              ]),
              _: 1
            }, 8, ["emoji"]),
            M(v, {
              size: "18",
              class: P([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: w
            }, {
              default: S(() => [
                pa
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        M(i(Ue), {
          class: "chat-btn",
          onClick: u[1] || (u[1] = (g) => t.value = !t.value)
        }, {
          default: S(() => [
            ha
          ]),
          _: 1
        })
      ]);
    };
  }
}), ga = /* @__PURE__ */ le(ma, [["__scopeId", "data-v-888830cd"]]);
me(ga);
const pt = (e) => (Q("data-v-8d8d47e5"), e = e(), G(), e), _a = { class: "u-emoji" }, wa = { class: "face-tooltip-head select-none" }, ya = ["onClick"], xa = ["src"], ba = { class: "emoji-body select-none" }, $a = { style: { padding: "0 5px" } }, Ca = ["onClick"], ka = { class: "emoji-btn select-none" }, Ma = { key: 0 }, za = /* @__PURE__ */ pt(() => /* @__PURE__ */ s("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ s("path", {
    "data-v-9fe533ba": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
  })
], -1)), La = /* @__PURE__ */ pt(() => /* @__PURE__ */ s("span", null, "表情", -1)), Sa = [
  za,
  La
], Fa = H({
  name: "UEmoji"
}), Ta = /* @__PURE__ */ H({
  ...Fa,
  props: {
    emoji: null,
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: l }) {
    const n = e, t = L(0), a = L(0), o = L(new Array(2)), { emojiList: r, faceList: c } = n.emoji;
    function w(d) {
      switch (t.value = d, d) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, o.value[1] = r[1];
          break;
      }
    }
    function p() {
      o.value[0] = r[0];
    }
    return (d, u) => (h(), _("div", _a, [
      M(i(Ke), {
        placement: e.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: p
      }, {
        reference: S(() => [
          s("div", ka, [
            d.$slots.default ? ie(d.$slots, "default", { key: 1 }, void 0, !0) : (h(), _("div", Ma, Sa))
          ])
        ]),
        default: S(() => [
          s("div", wa, [
            (h(!0), _(X, null, ne(i(c), (v, f) => (h(), _("label", {
              key: f,
              class: P(t.value == f ? "active" : ""),
              onClick: (g) => w(f)
            }, [
              s("img", {
                src: v,
                alt: ""
              }, null, 8, xa)
            ], 10, ya))), 128))
          ]),
          s("div", ba, [
            s("div", {
              class: "emjio-container",
              style: ke({ transform: `translateX(${a.value}%)` })
            }, [
              (h(!0), _(X, null, ne(o.value, (v, f) => (h(), _("div", {
                key: f,
                class: "emoji-wrapper"
              }, [
                M(i(Re), null, {
                  default: S(() => [
                    s("div", $a, [
                      (h(!0), _(X, null, ne(v, (g, m) => (h(), _("span", {
                        key: m,
                        class: "emoji-item",
                        onClick: (b) => d.$emit("addEmoji", m)
                      }, [
                        M(i(i1), {
                          src: g,
                          title: String(m),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Ca))), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]))), 128))
            ], 4)
          ])
        ]),
        _: 3
      }, 8, ["placement"])
    ]));
  }
}), Ha = /* @__PURE__ */ le(Ta, [["__scopeId", "data-v-8d8d47e5"]]), Xe = Symbol(), Va = me(Ha), Ia = H({
  name: "UCounter"
}), Ba = /* @__PURE__ */ H({
  ...Ia,
  props: {
    startAmount: { default: 0 },
    endAmount: { default: 0 },
    duration: { default: 3 },
    autoinit: { type: Boolean, default: !0 },
    prefix: { default: "" },
    suffix: { default: "" },
    separator: { default: "," },
    decimalSeparator: { default: "." },
    decimals: { default: 0 }
  },
  emits: ["finished"],
  setup(e, { emit: l }) {
    const n = e, t = oe({
      // 时间戳
      timestamp: 0,
      startTimestamp: 0,
      currentAmount: 0,
      currentStartAmount: 0,
      currentDuration: 0,
      paused: !1,
      // 剩下的
      remaining: 0,
      // 动画帧
      animationFrame: 0
    }), a = () => n.endAmount > n.startAmount, o = Z(() => {
      const d = /(\d+)(\d{3})/;
      let u = t.currentAmount.toFixed(n.decimals);
      u += "";
      let v = u.split("."), f = v[0], g = v.length > 1 ? n.decimalSeparator + v[1] : "", m = !isNaN(parseFloat(n.separator));
      if (n.separator && !m)
        for (; d.test(f); )
          f = f.replace(d, "$1" + n.separator + "$2");
      return f + g;
    }), r = Z(() => `${n.prefix}${o.value}${n.suffix}`);
    he(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? c() : t.paused = !0;
    });
    const c = () => {
      w(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(p);
    }, w = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, p = (d) => {
      t.timestamp = d, t.startTimestamp || (t.startTimestamp = d);
      let u = d - t.startTimestamp;
      t.remaining = t.currentDuration - u, a ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (u / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (u / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), u < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(p) : l("finished");
    };
    return (d, u) => (h(), _("span", null, Y(i(r)), 1));
  }
});
me(Ba);
const Aa = (e) => (Q("data-v-049f6155"), e = e(), G(), e), Da = { class: "operation-list select-none" }, Ea = ["onClick"], Oa = ["onClick"], ja = { class: "operation-warp" }, Ua = /* @__PURE__ */ Aa(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    d: "M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z",
    fill: "currentColor"
  })
], -1)), Ra = /* @__PURE__ */ H({
  props: {
    comment: null
  },
  setup(e) {
    const l = e, n = L(!1), t = L(), { user: a, tools: o, operate: r } = re(it), c = (p) => {
      w(), r(p, l.comment, () => {
      });
    }, w = () => {
      var p;
      (p = t.value) == null || p.hide();
    };
    return (p, d) => {
      const u = te("u-icon");
      return i(o) ? (h(), K(i(Ke), {
        key: 0,
        ref_key: "popoverRef",
        ref: t,
        placement: "bottom-end",
        "popper-class": "operatoin-popover",
        trigger: "click"
      }, {
        reference: S(() => [
          s("div", ja, [
            M(u, null, {
              default: S(() => [
                Ua
              ]),
              _: 1
            })
          ])
        ]),
        default: S(() => [
          s("ul", Da, [
            (h(!0), _(X, null, ne(i(o), (v, f) => (h(), _(X, { key: f }, [
              v.split("#")[1] ? (h(), _(X, { key: 0 }, [
                e.comment.uid == i(a).id && v.split("#")[1] == "1" || v.split("#")[1] == "2" && e.comment.uid != i(a).id ? (h(), _("li", {
                  key: 0,
                  class: P([{ active: n.value }, "operation-option"]),
                  onClick: (g) => c(v.split("#")[0])
                }, [
                  s("span", null, Y(v.split("#")[0]), 1)
                ], 10, Ea)) : N("", !0)
              ], 64)) : (h(), _("li", {
                key: 1,
                class: P([{ active: n.value }, "operation-option"]),
                onClick: (g) => c(v.split("#")[0])
              }, [
                s("span", null, Y(v), 1)
              ], 10, Oa))
            ], 64))), 128))
          ])
        ]),
        _: 1
      }, 512)) : N("", !0);
    };
  }
}), Ya = /* @__PURE__ */ le(Ra, [["__scopeId", "data-v-049f6155"]]), j1 = /* @__PURE__ */ H({
  props: {
    uid: null
  },
  setup(e) {
    const l = L({}), { showInfo: n } = re(F1), t = re(S1), a = () => Be("div", t.card(l.value));
    return (o, r) => i(t).card ? (h(), K(i(Ke), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: r[0] || (r[0] = () => i(n)(e.uid, (c) => l.value = c))
    }, {
      reference: S(() => [
        ie(o.$slots, "default")
      ]),
      default: S(() => [
        M(a)
      ]),
      _: 3
    })) : ie(o.$slots, "default", { key: 1 });
  }
}), d1 = (e) => (Q("data-v-fc562493"), e = e(), G(), e), Na = { class: "comment-sub" }, qa = ["href"], Pa = /* @__PURE__ */ d1(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Wa = { class: "comment-primary" }, Za = { class: "comment-main" }, Ka = {
  key: 1,
  class: "user-info"
}, Ja = ["href"], Xa = { class: "username" }, Qa = {
  class: "name",
  style: { "max-width": "10em" }
}, Ga = {
  blank: "true",
  class: "rank"
}, el = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, tl = { class: "time" }, nl = { class: "content" }, ol = ["innerHTML"], al = {
  class: "imgbox",
  style: { display: "flex" }
}, ll = { class: "action-box select-none" }, sl = /* @__PURE__ */ d1(() => /* @__PURE__ */ s("svg", {
  t: "1650360973068",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1168",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ s("path", {
    d: "M547.968 138.88c6.656-4.672 14.08-6.976 20.48-5.056 6.08 1.792 22.848 10.752 40.192 56.128 8.576 22.4 27.264 81.536-5.632 197.504a45.44 45.44 0 0 0 42.88 57.984l217.6 3.008h0.448a53.12 53.12 0 0 1 20.096 3.328 16.256 16.256 0 0 1 5.568 3.648 14.464 14.464 0 0 1 3.264 6.4c2.176 7.808 4.608 33.984-0.256 77.248-4.672 41.984-15.936 97.408-38.784 162.368-19.136 54.336-43.52 100.48-81.472 161.792a56.384 56.384 0 0 0-1.664 2.496l-0.128 0.128-1.408 2.112a7.872 7.872 0 0 1-1.28 1.472 3.84 3.84 0 0 1-1.28 0.64 20.48 20.48 0 0 1-6.848 0.96H356.032V421.44c19.712-10.624 40.704-24.576 62.592-47.616 25.472-26.88 51.008-64.768 78.208-121.6 5.568-11.584 9.856-24.384 13.632-36.032l3.072-9.856c2.688-8.448 5.184-16.384 8.064-24.32 8.064-22.4 16.128-36.032 26.368-43.136z m120.96 27.968c-20.48-53.44-48-84.736-81.984-94.912-33.6-9.984-61.952 4.16-76.032 14.08-27.584 19.264-41.28 49.6-50.048 74.048-3.392 9.344-6.464 19.2-9.216 27.968l-2.688 8.448a227.84 227.84 0 0 1-10.432 27.904c-25.28 52.928-47.36 84.544-66.752 104.96-18.944 19.968-36.48 30.464-55.168 39.808a45.376 45.376 0 0 0-25.088 40.576l-0.064 480.64c0 24.96 20.224 45.248 45.184 45.248h423.04c21.76 0 38.144-6.912 50.048-16.96a71.808 71.808 0 0 0 14.528-16.896l0.128-0.256 0.128-0.128 0.832-0.96 1.152-1.92c39.424-63.872 66.816-114.688 88.256-175.68a810.24 810.24 0 0 0 42.048-176.64c5.12-45.632 3.776-81.664-1.6-101.376a77.952 77.952 0 0 0-45.568-52.288 116.544 116.544 0 0 0-45.44-8.64l-192.768-2.688c28.096-115.072 10.048-181.568-2.496-214.336z m-604.864 247.04a45.184 45.184 0 0 1 45.12-47.296h67.008c24.96 0 45.184 20.288 45.184 45.248v480.64c0 24.96-20.224 45.12-45.184 45.12H131.84a45.184 45.184 0 0 1-45.12-43.072l-22.656-480.64z",
    "p-id": "1169"
  })
], -1)), il = /* @__PURE__ */ d1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ s("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), rl = { key: 2 }, cl = /* @__PURE__ */ d1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1320",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ s("path", {
    d: "M147.264 647.296V220.928c0-49.536 40.128-89.728 89.6-89.728H793.6c49.536 0 89.728 40.192 89.728 89.728v426.368c0 49.536-40.128 89.728-89.6 89.728h-145.216a47.04 47.04 0 0 0-28.16 9.408l-194.56 145.792a3.392 3.392 0 0 1-5.12-1.984l-26.752-116.672a47.04 47.04 0 0 0-45.824-36.544H236.992a89.728 89.728 0 0 1-89.728-89.728zM236.864 64A156.928 156.928 0 0 0 80 220.928l0.064 426.368a156.928 156.928 0 0 0 156.928 156.928h94.976l23.232 101.312 0.064 0.448a70.592 70.592 0 0 0 109.696 40.832l190.208-142.592H793.6a156.928 156.928 0 0 0 156.928-156.928l-0.064-426.368A156.928 156.928 0 0 0 793.536 64H236.928z m69.44 442.496a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z m268.8-65.344a65.344 65.344 0 1 1-130.752 0 65.344 65.344 0 0 1 130.752 0z m138.368 65.344a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z",
    "p-id": "1321"
  })
], -1)), ul = { key: 2 }, dl = /* @__PURE__ */ H({
  props: {
    reply: { type: Boolean },
    data: null,
    id: null
  },
  setup(e) {
    const l = e, n = oe({
      active: !1
    }), t = L(), a = L(), o = Z(() => {
      let m = l.data.contentImg;
      return Le(m) ? [] : m == null ? void 0 : m.split("||");
    }), { allEmoji: r } = re(Xe), { like: c, user: w, relativeTime: p } = re(F1);
    function d() {
      n.active = !n.active, n.active && ge(() => {
        var m;
        (m = t.value) == null || m.focus();
      });
    }
    function u(m) {
      var b;
      const x = m.target;
      (b = a.value) != null && b.contains(x) || (n.active = !1);
    }
    const v = re(S1), f = () => Be("div", v.info(l.data)), g = Z(() => dt(r, l.data.content));
    return (m, b) => (h(), _("div", {
      class: P(["comment", { reply: l.reply }])
    }, [
      s("div", Na, [
        M(j1, {
          uid: i(Ie)(e.data.uid)
        }, {
          default: S(() => [
            s("a", {
              href: e.data.user.homeLink,
              target: "_blank",
              class: "no-underline",
              style: { display: "block" }
            }, [
              M(i(Ye), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: e.data.user.avatar
              }, {
                default: S(() => [
                  Pa
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, qa)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      s("div", Wa, [
        s("div", Za, [
          i(v).info ? (h(), K(f, { key: 0 })) : (h(), _("div", Ka, [
            M(j1, {
              uid: i(Ie)(e.data.uid)
            }, {
              default: S(() => [
                s("a", {
                  href: e.data.user.homeLink,
                  target: "_blank",
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  s("div", Xa, [
                    s("span", Qa, Y(e.data.user.username), 1),
                    s("span", Ga, [
                      M(i(qe), {
                        size: "24",
                        innerHTML: i(Xo)(e.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, Ja)
              ]),
              _: 1
            }, 8, ["uid"]),
            s("span", el, "  " + Y(e.data.address), 1),
            s("time", tl, Y(i(p) ? i(L1)(e.data.createTime).fromNow() : e.data.createTime), 1)
          ])),
          s("div", nl, [
            M(i(jn), { unfold: "" }, {
              default: S(() => [
                s("div", { innerHTML: i(g) }, null, 8, ol),
                s("div", al, [
                  (h(!0), _(X, null, ne(i(o), (x, B) => (h(), K(i(i1), {
                    key: B,
                    src: x,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": i(o),
                    "initial-index": B
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          s("div", ll, [
            s("div", {
              class: "item",
              onClick: b[0] || (b[0] = (x) => i(c)(i(Ie)(e.data.id)))
            }, [
              i(w).likeIds.map(String).indexOf(i(Ie)(e.data.id)) == -1 ? (h(), K(i(qe), { key: 0 }, {
                default: S(() => [
                  sl
                ]),
                _: 1
              })) : (h(), K(i(qe), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: S(() => [
                  il
                ]),
                _: 1
              })),
              e.data.likes != 0 ? (h(), _("span", rl, Y(e.data.likes), 1)) : N("", !0)
            ]),
            s("div", {
              ref_key: "btnRef",
              ref: a,
              class: P(["item", { active: i(n).active }]),
              onClick: d
            }, [
              M(i(qe), null, {
                default: S(() => [
                  cl
                ]),
                _: 1
              }),
              s("span", null, Y(i(n).active ? "取消回复" : "回复"), 1)
            ], 2),
            M(Ya, { comment: e.data }, null, 8, ["comment"])
          ]),
          i(n).active ? (h(), _("div", ul, [
            M(ct, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": i(Ie)(e.id),
              placeholder: `回复 @${e.data.user.username}...`,
              replay: e.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: u,
              onClose: b[1] || (b[1] = (x) => i(n).active = !1)
            }, null, 8, ["parent-id", "placeholder", "replay"])
          ])) : N("", !0)
        ]),
        ie(m.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
}), ht = /* @__PURE__ */ le(dl, [["__scopeId", "data-v-fc562493"]]), vl = (e) => (Q("data-v-d1e7932a"), e = e(), G(), e), pl = {
  key: 0,
  class: "reply-box"
}, hl = { class: "reply-list" }, fl = {
  key: 0,
  class: "fetch-more"
}, ml = { key: 0 }, gl = { key: 1 }, _l = { key: 0 }, wl = /* @__PURE__ */ ae(" 点击查看 "), yl = /* @__PURE__ */ vl(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "data-v-d6f79dbc": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
  })
], -1)), xl = [
  wl,
  yl
], bl = {
  key: 1,
  class: "fetch-more"
}, $l = /* @__PURE__ */ H({
  props: {
    data: null,
    id: null
  },
  setup(e) {
    const l = e, n = oe({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: o } = re(y1), { page: r } = re(y1), c = Z(() => {
      let v = {
        total: 0,
        length: 0,
        list: []
      };
      if (l.data) {
        let f = l.data.list.length;
        v = {
          total: l.data.total,
          length: f,
          list: l.data.list
        };
      }
      if (!n.over) {
        let f = v.list.slice(0, a);
        v.list = f;
      }
      return r && (v.list = v.list.slice(0, 5)), v;
    }), w = () => {
      n.over = !0;
    }, p = (v) => {
      o.value.forEach((f) => {
        f.id == l.id && f.reply && (f.reply = v);
      });
    }, d = (v) => {
      n.pageNum = v, t(l.id, v, n.pageSize, (f) => p(f));
    }, u = (v) => {
      n.pageSize = v, t(l.id, n.pageNum, v, (f) => p(f));
    };
    return (v, f) => i(c).length > 0 ? (h(), _("div", pl, [
      s("div", hl, [
        (h(!0), _(X, null, ne(i(c).list, (g, m) => (h(), K(ht, {
          id: e.id,
          key: m,
          data: g,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        i(c).length > i(a) ? (h(), _("div", fl, [
          i(n).loading ? (h(), _("span", ml, "加载中...")) : (h(), _("div", gl, [
            i(n).over ? N("", !0) : (h(), _("div", _l, [
              ae(" 共" + Y(i(c).total) + "条回复, ", 1),
              s("span", {
                class: "fetch-more-comment select-none",
                onClick: w
              }, xl)
            ]))
          ]))
        ])) : N("", !0),
        i(n).over && i(r) ? (h(), _("div", bl, [
          M(i(X1), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: i(c).total,
            "page-size": i(n).pageSize,
            onCurrentChange: d,
            onSizeChange: u
          }, null, 8, ["total", "page-size"])
        ])) : N("", !0)
      ])
    ])) : N("", !0);
  }
}), Cl = /* @__PURE__ */ le($l, [["__scopeId", "data-v-d1e7932a"]]), kl = {
  key: 0,
  class: "comment-list"
}, Ml = /* @__PURE__ */ H({
  props: {
    data: null,
    total: null,
    showSize: null
  },
  setup(e) {
    return (l, n) => e.data ? (h(), _("div", kl, [
      (h(!0), _(X, null, ne(e.data, (t, a) => (h(), K(ht, {
        id: i(Ie)(t.id),
        key: a,
        data: t
      }, {
        default: S(() => [
          M(Cl, {
            id: i(Ie)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : N("", !0);
  }
}), I1 = (e) => (Q("data-v-a662666b"), e = e(), G(), e), zl = { class: "u-comment" }, Ll = { class: "comment-form" }, Sl = /* @__PURE__ */ I1(() => /* @__PURE__ */ s("div", { class: "header" }, [
  /* @__PURE__ */ s("span", { class: "header-title" }, "评论")
], -1)), Fl = { class: "content" }, Tl = { class: "avatar-box" }, Hl = /* @__PURE__ */ I1(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Vl = { class: "comment-list-wrapper" }, Il = /* @__PURE__ */ I1(() => /* @__PURE__ */ s("div", { class: "title" }, "全部评论", -1)), Bl = H({
  name: "UComment"
}), Al = /* @__PURE__ */ H({
  ...Bl,
  props: {
    config: null,
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "operate"],
  setup(e, { emit: l }) {
    const n = e, { user: t, comments: a, showSize: o, replyShowSize: r, total: c, tools: w } = Oe(n.config), p = ({ content: b, parentId: x, replyId: B, files: D, clear: T }) => {
      l("submit", { content: b, parentId: x, replyId: B, files: D, finish: (C) => {
        if (T(), x) {
          let z = a.value.find((F) => F.id == x);
          if (z) {
            let F = z.reply;
            F ? (F.list.unshift(C), F.total++) : z.reply = {
              total: 1,
              list: [C]
            };
          }
        } else
          a.value.unshift(C);
      } });
    }, d = {
      upload: n.upload,
      submit: p
    };
    ye(st, d);
    const u = (b, x) => {
      let B = null;
      a.value.forEach((D) => {
        var T;
        D.id == b ? B = D : B = (T = D.reply) == null ? void 0 : T.list.find((C) => C.id == b), B && (B.likes += x);
      });
    }, v = {
      user: t,
      like: (b) => {
        const x = n.config.user.likeIds;
        l("like", b, () => {
          if (x.findIndex((B) => B == b) == -1)
            x.push(b), u(b, 1);
          else {
            let B = x.findIndex((D) => D == b);
            B != -1 && (x.splice(B, 1), u(b, -1));
          }
        });
      },
      relativeTime: De(n.relativeTime, !1),
      showInfo: (b, x) => l("showInfo", b, x)
    };
    ye(F1, v);
    const f = {
      page: n.page,
      replyPage: (b, x, B, D) => {
        l("replyPage", { parentId: b, pageNum: x, pageSize: B, finish: D });
      },
      replyShowSize: De(r, 3),
      comments: a
    };
    ye(y1, f);
    const g = (b) => {
      const { parentId: x, id: B } = b;
      if (x) {
        let D = a.value.find((C) => C.id == x), T = D == null ? void 0 : D.reply;
        if (T) {
          let C = T.list.findIndex((z) => z.id == B);
          C != -1 && (T.list.splice(C, 1), T.total--);
        }
      } else {
        let D = a.value.findIndex((T) => T.id == B);
        D != -1 && a.value.splice(D, 1);
      }
    }, m = {
      user: t,
      tools: w == null ? void 0 : w.value,
      operate: (b, x, B) => {
        if (Le(b))
          return;
        let D = b.split("#")[0];
        D == "删除" || D == "delete" || D == "remove" ? l("operate", b, x, () => {
          B(), g(x);
        }) : l("operate", b, x, B);
      }
    };
    return ye(it, m), ye(Xe, n.config.emoji), ye(S1, q1()), (b, x) => (h(), _("div", zl, [
      s("div", Ll, [
        Sl,
        s("div", Fl, [
          s("div", Tl, [
            M(i(Ye), {
              size: 40,
              src: e.config.user.avatar
            }, {
              default: S(() => [
                Hl
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          M(ct, {
            placeholder: "输入评论（Enter换行，Ctrl + Enter发送）",
            "content-btn": "发表评论"
          })
        ])
      ]),
      s("div", Vl, [
        ie(b.$slots, "default", {}, () => [
          Il
        ], !0),
        M(Ml, {
          data: i(a),
          total: i(c),
          "show-size": i(De)(i(o), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])
    ]));
  }
}), Dl = /* @__PURE__ */ le(Al, [["__scopeId", "data-v-a662666b"]]);
me(Dl);
const Qe = (e) => (Q("data-v-04516fda"), e = e(), G(), e), El = { class: "card-box u-scrollbar" }, Ol = {
  key: 0,
  class: "history"
}, jl = { class: "header" }, Ul = /* @__PURE__ */ Qe(() => /* @__PURE__ */ s("div", { class: "title" }, "历史搜索", -1)), Rl = /* @__PURE__ */ Qe(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), Yl = /* @__PURE__ */ ae(" 清空 "), Nl = {
  key: 1,
  class: "trending"
}, ql = { class: "title" }, Pl = /* @__PURE__ */ Qe(() => /* @__PURE__ */ s("span", null, "热搜", -1)), Wl = /* @__PURE__ */ Qe(() => /* @__PURE__ */ s("svg", {
  "data-v-5fe91717": "",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "data-v-5fe91717": "",
    d: "M12.8 5.2C13.9532 6.46 14.8 8.2 14.8 10C14.7039 12.8937 12.6843 15.1706 9.97973 15.8159C10.359 12.3442 7.77588 9.35406 7.77588 9.35406C7.77588 9.35406 7.99512 13.7064 6.79514 15.8104C4.03715 15.1428 2 12.7806 2 9.8C2 7.776 2.9336 5.9728 4.4 4.8C5.8608 3.7056 6.8 1.9656 6.8 0C9.684 0.4368 11.894 2.9264 11.894 5.932C11.894 6.5012 11.746 7.0652 11.6 7.6C12.1264 6.9024 12.6184 6.0876 12.8 5.2Z",
    fill: "#F53F3F"
  })
], -1)), Zl = { class: "hot-list" }, Kl = ["onClick"], Jl = { class: "trending-text u-ellipsis" }, Xl = /* @__PURE__ */ Qe(() => /* @__PURE__ */ s("div", { class: "trending-mark" }, null, -1)), Ql = /* @__PURE__ */ H({
  props: {
    data: null
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: l }) {
    const n = e, t = Z(() => !(Le(n.data.historySearchList) && Le(n.data.hotSearchList)));
    return (a, o) => {
      const r = te("u-icon");
      return ue((h(), _("div", El, [
        e.data.historySearchList.length != 0 ? (h(), _("div", Ol, [
          s("div", jl, [
            Ul,
            M(i(s1), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (c) => a.$emit("onClear"))
            }, {
              default: S(() => [
                M(r, null, {
                  default: S(() => [
                    Rl
                  ]),
                  _: 1
                }),
                Yl
              ]),
              _: 1
            })
          ]),
          (h(!0), _(X, null, ne(e.data.historySearchList, (c, w) => (h(), K(i(J1), {
            key: w,
            type: c.type,
            closable: "",
            onClose: (p) => a.$emit("onClose", c.name),
            onClick: (p) => a.$emit("submit", c.name)
          }, {
            default: S(() => [
              ae(Y(c.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : N("", !0),
        i(Le)(e.data.hotSearchList) ? N("", !0) : (h(), _("div", Nl, [
          s("div", ql, [
            Pl,
            M(r, { style: { margin: "0 6px" } }, {
              default: S(() => [
                Wl
              ]),
              _: 1
            })
          ]),
          s("div", Zl, [
            (h(!0), _(X, null, ne(e.data.hotSearchList, (c, w) => (h(), _("div", {
              key: w,
              class: "hot-item",
              onClick: (p) => a.$emit("submit", c)
            }, [
              s("div", {
                class: P(["trending-rank", { "trending-rank-top": w < 3 }])
              }, Y(w + 1), 3),
              s("div", Jl, Y(c), 1),
              Xl
            ], 8, Kl))), 128))
          ])
        ]))
      ], 512)), [
        [Me, e.data.visible && i(t)]
      ]);
    };
  }
});
const Gl = /* @__PURE__ */ se(Ql, [["__scopeId", "data-v-04516fda"]]), B1 = (e) => (Q("data-v-60fa9794"), e = e(), G(), e), es = { class: "u-search" }, ts = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, ns = /* @__PURE__ */ B1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7187"
}, [
  /* @__PURE__ */ s("path", {
    d: "M344.16 960c-58.976-124.256-27.552-195.456 17.76-262.528 49.632-73.472 62.432-146.176 62.432-146.176s39.008 51.36 23.424 131.68c68.928-77.696 81.888-201.472 71.52-248.896 155.776 110.272 222.336 348.992 132.64 525.92C1129.024 686.528 770.56 277.376 708.16 231.264c20.8 46.08 24.736 124.128-17.28 161.984C619.744 120 443.84 64 443.84 64c20.8 140.928-75.392 295.008-168.16 410.144-3.264-56.192-6.72-94.976-35.872-148.736-6.56 102.08-83.552 185.28-104.416 287.552-28.256 138.496 21.152 239.904 208.832 347.008L344.16 960zM344.16 960",
    "p-id": "7188",
    fill: "#F53F3F"
  })
], -1)), os = ["data-before", "data-after"], as = ["placeholder"], ls = { class: "btn" }, ss = /* @__PURE__ */ B1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-78e17ca8": ""
}, [
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }),
  /* @__PURE__ */ s("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  })
], -1)), is = /* @__PURE__ */ B1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ s("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), rs = H({
  name: "USearch"
}), cs = /* @__PURE__ */ H({
  ...rs,
  props: {
    config: null
  },
  emits: ["submit"],
  setup(e, { expose: l, emit: n }) {
    const t = e, a = L({}), o = a1(t.config, "keywords"), r = L(!1), c = L(0), w = L(!0), p = L(), d = oe({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), u = oe({
      search: "",
      visible: !1,
      historySearchList: e1.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    de(
      () => t.config.hotSearchList,
      (T) => {
        u.hotSearchList = T;
      }
    );
    const v = Z(() => {
      let T = o.value[c.value];
      return r.value || u.search ? "" : T;
    }), f = Z(() => {
      let T = typeof o.value[c.value + 1] > "u" ? o.value[0] : o.value[c.value + 1];
      return r.value || u.search ? "" : T;
    }), g = Z(() => {
      let T = o.value[c.value];
      return r.value ? T : "";
    }), m = Z(() => !r.value && !u.search && w.value), b = (T) => {
      let C = (F, U) => Math.round(Math.random() * (U - F)) + F, z = (F) => u.historySearchList.filter((U) => U.name == F).length != 0;
      if (T && u.historySearchList)
        z(T) || u.historySearchList.push({ name: T, type: d.types[C(0, 3)] });
      else {
        let F = r.value ? g : v;
        T = F.value, z(F.value) || u.historySearchList.push({ name: F.value, type: d.types[C(0, 3)] });
      }
      e1.set("searchHistory", u.historySearchList), u.search = T, a.value.focus(), n("submit", T);
    }, x = (T) => {
      u.historySearchList.findIndex((C) => C.name == T), u.historySearchList.splice(
        u.historySearchList.findIndex((C) => C.name == T),
        1
      ), e1.set("searchHistory", u.historySearchList);
    }, B = () => {
      u.historySearchList.length = 0, e1.remove("searchHistory");
    }, D = (T) => {
      if (T.pseudoElement == "::after") {
        w.value = !1;
        let C = typeof o.value[c.value + 1] > "u" ? 0 : c.value + 1;
        c.value = C, setTimeout(() => {
          w.value = !0;
        }, 3e3);
      }
    };
    return l({
      close: () => u.visible = !1
    }), (T, C) => {
      const z = te("u-icon");
      return h(), _("div", es, [
        s("div", {
          class: P(["search", { active: r.value }])
        }, [
          s("div", ts, [
            M(z, null, {
              default: S(() => [
                ns
              ]),
              _: 1
            })
          ]),
          s("label", {
            ref_key: "labelRef",
            ref: p,
            "data-before": i(v),
            "data-after": i(f),
            class: P({ animate: i(m) }),
            onAnimationend: D
          }, [
            ue(s("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": C[0] || (C[0] = (F) => i(u).search = F),
              type: "text",
              placeholder: i(g),
              onFocus: C[1] || (C[1] = () => {
                r.value = !0, i(u).visible = !0;
              }),
              onBlur: C[2] || (C[2] = (F) => r.value = !1),
              onKeyup: C[3] || (C[3] = je((F) => b(i(u).search), ["enter"]))
            }, null, 40, as), [
              [N1, i(u).search]
            ])
          ], 42, os),
          s("div", ls, [
            ue(M(z, {
              class: "close",
              onClick: C[4] || (C[4] = (F) => i(u).search = "")
            }, {
              default: S(() => [
                ss
              ]),
              _: 1
            }, 512), [
              [Me, i(u).search]
            ]),
            s("div", {
              class: "search-btn",
              onClick: C[5] || (C[5] = (F) => b(i(u).search))
            }, [
              M(z, null, {
                default: S(() => [
                  is
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        ue(M(Gl, {
          data: i(u),
          onOnClose: x,
          onOnClear: B,
          onSubmit: b
        }, null, 8, ["data"]), [
          [i(l1), () => i(u).visible = !1, p.value]
        ])
      ]);
    };
  }
});
const us = /* @__PURE__ */ se(cs, [["__scopeId", "data-v-60fa9794"]]), ds = fe(us), ft = (e, l) => {
  const n = /\[.+?\]/g;
  return l = l.replace(n, (t) => {
    const a = e[t];
    return a ? [
      '<img src="',
      a,
      '" width="20" height="20" alt="',
      t,
      '" title="',
      t,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      "/>"
    ].join("") : t;
  }), l;
}, vs = (e) => {
  switch (e) {
    case 1:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="831"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#8CDBF4" p-id="832"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="833"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m950.857143-365.714285l73.142857-73.142858v146.285715h-73.142857z m73.142857-73.142858h146.285715v146.285715h-146.285715z m0 146.285715h146.285715v438.857143h-146.285715z" fill="#FFFFFF"></path></svg>';
    case 2:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="765"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#6ECEFF" p-id="766"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="767"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v146.285714h-146.285714z m-219.428572 292.571428V512h146.285714v146.285714z" fill="#FFFFFF" p-id="768"></path><path d="M1097.142857 585.142857V438.857143h365.714286v146.285714z m0 73.142857h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 3:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="799"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#599DFF" p-id="800"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="801"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v73.142857h-146.285714z m0 219.428571h146.285714v73.142857h-146.285714z m-146.285715-146.285714h292.571429v146.285714h-292.571429z m-73.142857 219.428571h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 4:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="815"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#34D19B" p-id="816"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="817"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m975.213715-365.714285L1243.428571 219.428571v219.428572h-146.285714zM1097.142857 438.857143h146.285714v292.571428h-146.285714z m146.285714 146.285714h73.142858v146.285714h-73.142858z m0-365.714286h73.142858v146.285715h-73.142858z m73.142858 0h146.285714v585.142858h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 5:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="782"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#FFA000" p-id="783"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="784"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-73.142857h146.285714v219.428572h-146.285714z m-219.428572-365.714286h365.714286v146.285715h-365.714286z m0 438.857143h219.428572v146.285715h-219.428572z m73.142857-219.428571h219.428572v146.285714h-219.428572z" fill="#FFFFFF" p-id="785"></path><path d="M1316.571429 438.857143h146.285714v146.285714h-146.285714z m-219.428572-73.142857h146.285714v219.428571h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 6:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="748"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#F36262" p-id="749"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="750"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-146.285714h146.285714v292.571429h-146.285714z m-73.142858-292.571429h146.285715v146.285715h-146.285715z m-146.285714 146.285715h146.285714v438.857143h-146.285714z" fill="#FFFFFF" p-id="751"></path><path d="M1243.428571 438.857143h219.428572v146.285714h-219.428572z m-48.786285-170.642286L1243.428571 219.428571v146.285715h-146.285714zM1243.428571 658.285714h146.285715v146.285715h-146.285715z" fill="#FFFFFF"></path></svg>';
    default:
      return "";
  }
}, i6 = (e, l, n) => {
  let t = (e - 1) * l;
  return t + l >= n.length ? n.slice(t, n.length) : n.slice(t, t + l);
}, mt = (e) => (Q("data-v-f75472b5"), e = e(), G(), e), ps = { class: "message" }, hs = { class: "chat-list" }, fs = /* @__PURE__ */ mt(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), ms = { class: "content" }, gs = {
  key: 0,
  class: "username"
}, _s = ["innerHTML"], ws = /* @__PURE__ */ mt(() => /* @__PURE__ */ s("div", { class: "date" }, null, -1)), ys = /* @__PURE__ */ H({
  props: {
    data: null,
    userId: null
  },
  setup(e, { expose: l }) {
    const { allEmoji: n } = re(Ge), t = L();
    return l({
      scroll: () => {
        ge(() => {
          const o = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(o.offsetTop);
        });
      }
    }), (o, r) => (h(), _("div", ps, [
      M(i(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: S(() => [
          s("div", hs, [
            (h(!0), _(X, null, ne(e.data, (c, w) => (h(), _("div", {
              key: w,
              class: P([{ self: e.userId == c.id }, "chat-item"])
            }, [
              s("div", null, [
                M(i(Ye), null, {
                  default: S(() => [
                    fs
                  ]),
                  _: 1
                })
              ]),
              s("div", ms, [
                e.userId != c.id ? (h(), _("div", gs, Y(c.username), 1)) : N("", !0),
                s("div", {
                  class: "card-box",
                  innerHTML: i(ft)(i(n), c.content)
                }, null, 8, _s)
              ]),
              ws
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const xs = /* @__PURE__ */ se(ys, [["__scopeId", "data-v-f75472b5"]]), v1 = (e) => (Q("data-v-888830cd"), e = e(), G(), e), bs = { class: "u-chat" }, $s = { class: "header" }, Cs = /* @__PURE__ */ v1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1318 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ s("path", {
    d: "M1318.502489 432.779052c0-231.790522-209.29842-419.704826-467.458992-419.704826s-467.56979 188.357498-467.56979 419.704826 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319412-19.168145L1165.822116 742.350141C1259.336074 665.56676 1318.502489 555.433023 1318.502489 432.779052z",
    fill: "#612273",
    "p-id": "10993"
  }),
  /* @__PURE__ */ s("path", {
    d: "M1034.304263 745.784895a509.673231 509.673231 0 0 1-183.482363 33.239559c-244.532352 0-445.077689-168.524562-465.353819-383.25211-1.107985 12.07704-1.883575 24.264878-1.883575 36.563514 0 231.790522 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319411-19.168145 25.262064 25.262064 0 0 0-7.5343-17.284571zM1165.822116 669.223112l2.769964 70.689461C1260.44406 663.239991 1318.502489 553.992642 1318.502489 432.779052a366.632331 366.632331 0 0 0-1.883575-36.785111 403.971435 403.971435 0 0 1-150.796798 273.229171z",
    fill: "#612273",
    opacity: ".2",
    "p-id": "10994"
  }),
  /* @__PURE__ */ s("path", {
    d: "M383.25211 432.779052a383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978C173.510496 258.160571 0 413.943302 0 606.178749c0 101.713049 48.97295 193.011037 126.421121 256.609392l-5.761524 148.470028a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696c-177.831638-59.388011-304.91755-212.733175-304.91755-393.113179z",
    fill: "#EB3D72",
    "p-id": "10995"
  }),
  /* @__PURE__ */ s("path", {
    d: "M342.256654 391.672798c0 117.557239 53.958883 223.59143 140.714132 299.71002a391.008007 391.008007 0 0 1-99.718676-258.603766 383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978-7.091106 0-14.071413 0-21.05172 0.553993a375.939407 375.939407 0 0 0-24.375677 132.958234zM630.111231 802.181346a407.627786 407.627786 0 0 1-283.533434 110.798528 424.136767 424.136767 0 0 1-152.12638-27.699632l-71.686647 71.686648-2.105173 54.291279a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696 486.294741 486.294741 0 0 1-58.058429-23.710885zM85.425665 821.792686l-5.761523-4.985934c1.883575 2.215971 3.656351 4.431941 5.650725 6.647911z",
    fill: "#EB3D72",
    opacity: ".5",
    "p-id": "10996"
  }),
  /* @__PURE__ */ s("path", {
    d: "M833.426531 332.395585c64.263147-10.193465 64.041549-66.479117 62.601169-75.342999s-15.400995-54.291279-59.942004-47.200173S799.078987 254.836615 799.078987 254.836615a28.475222 28.475222 0 1 0 56.174854-8.97468s6.315516 3.323956 8.30989 20.27613-11.966241 29.029214-35.455529 33.239559-88.638823-19.943735-104.039819-115.452067C709.110582 96.39472 781.57282 28.253625 838.966457 13.185025a55.399264 55.399264 0 0 0-64.041549-5.318329c-56.064055 35.123134-97.170309 109.579745-85.536464 182.817571 14.957801 93.846354 79.664142 151.904783 144.038087 141.711318zM203.980091 573.825579a53.072495 53.072495 0 0 0 33.90435-67.919498c-2.659165-6.537113-21.162519-38.225492-53.51569-25.040467a30.026401 30.026401 0 0 0-19.832936 40.773858 22.159706 22.159706 0 1 0 40.773858-16.619779s5.318329 1.329582 9.861069 13.739017-3.988747 24.043281-21.05172 31.023588-70.02467 0.553993-98.832288-68.695087C68.916685 417.599654 110.798528 353.558104 151.904783 332.395585a42.879031 42.879031 0 0 0-48.97295 7.423502 146.918849 146.918849 0 0 0-32.574767 152.458775c27.810431 68.141095 86.866046 100.605064 133.623025 81.547717z",
    fill: "#FED150",
    "p-id": "10997"
  })
], -1)), ks = /* @__PURE__ */ v1(() => /* @__PURE__ */ s("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ s("div", null, "聊天室"),
  /* @__PURE__ */ s("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Ms = {
  id: "chat-footer",
  class: "footer"
}, zs = /* @__PURE__ */ v1(() => /* @__PURE__ */ s("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7186"
}, [
  /* @__PURE__ */ s("path", {
    d: "M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448c247.008 0 448 200.96 448 448S757.984 960 510.944 960zM510.944 128c-211.744 0-384 172.256-384 384 0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C894.944 300.256 722.688 128 510.944 128zM512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48l0-64c0-26.528 21.472-48 48-48s48 21.472 48 48l0 64C416 493.696 394.496 515.2 368 515.2zM656 515.2c-26.496 0-48-21.472-48-48l0-64c0-26.528 21.504-48 48-48s48 21.472 48 48l0 64C704 493.696 682.496 515.2 656 515.2z",
    "p-id": "7187"
  })
], -1)), Ls = /* @__PURE__ */ v1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ s("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), Ss = /* @__PURE__ */ ae("chat"), Fs = H({
  name: "UChat"
}), Ts = /* @__PURE__ */ H({
  ...Fs,
  props: {
    data: null,
    userId: null,
    emoji: null
  },
  emits: ["submit"],
  setup(e, { emit: l }) {
    const n = e, t = L(!1), a = L(""), o = L(), r = (d) => {
      const { ctrlKey: u, key: v } = d;
      u && v == "Enter" && w();
    }, c = () => {
      a.value = "", o.value.scroll();
    }, w = () => {
      let d = a.value;
      d.trim() ? (d = d.replace(/\n/g, "<br/>"), l("submit", { clear: c, content: d })) : M1({ type: "error", message: "内容不能为空" });
    }, p = (d) => {
      let u = document.getElementById("emojiInput"), v = u.selectionStart, f = u.selectionEnd, g = u.value;
      if (v === null || f === null)
        return;
      let m = g.substring(0, v) + d + g.substring(f);
      u.value = m, u.focus(), u.selectionStart = v + d.length, u.selectionEnd = v + d.length, a.value = m;
    };
    return ye(Ge, n.emoji), (d, u) => {
      const v = te("u-icon"), f = te("u-emoji");
      return h(), _("div", bs, [
        s("div", {
          class: P([{ active: t.value }, "chat-container translate"])
        }, [
          s("div", $s, [
            M(v, { size: "32" }, {
              default: S(() => [
                Cs
              ]),
              _: 1
            }),
            ks
          ]),
          M(xs, {
            ref_key: "messageRef",
            ref: o,
            data: e.data,
            "user-id": e.userId
          }, null, 8, ["data", "user-id"]),
          s("div", Ms, [
            M(i(Se), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": u[0] || (u[0] = (g) => a.value = g),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: je(r, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            M(f, {
              style: { margin: "0 8px 0" },
              emoji: e.emoji,
              placement: "top-end",
              onAddEmoji: p
            }, {
              default: S(() => [
                zs
              ]),
              _: 1
            }, 8, ["emoji"]),
            M(v, {
              size: "18",
              class: P([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: w
            }, {
              default: S(() => [
                Ls
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        M(i(Ue), {
          class: "chat-btn",
          onClick: u[1] || (u[1] = (g) => t.value = !t.value)
        }, {
          default: S(() => [
            Ss
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Hs = /* @__PURE__ */ se(Ts, [["__scopeId", "data-v-888830cd"]]), Vs = fe(Hs), gt = (e) => (Q("data-v-8d8d47e5"), e = e(), G(), e), Is = { class: "u-emoji" }, Bs = { class: "face-tooltip-head select-none" }, As = ["onClick"], Ds = ["src"], Es = { class: "emoji-body select-none" }, Os = { style: { padding: "0 5px" } }, js = ["onClick"], Us = { class: "emoji-btn select-none" }, Rs = { key: 0 }, Ys = /* @__PURE__ */ gt(() => /* @__PURE__ */ s("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ s("path", {
    "data-v-9fe533ba": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
  })
], -1)), Ns = /* @__PURE__ */ gt(() => /* @__PURE__ */ s("span", null, "表情", -1)), qs = [
  Ys,
  Ns
], Ps = H({
  name: "UEmoji"
}), Ws = /* @__PURE__ */ H({
  ...Ps,
  props: {
    emoji: null,
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: l }) {
    const n = e, t = L(0), a = L(0), o = L(new Array(2)), { emojiList: r, faceList: c } = n.emoji;
    function w(d) {
      switch (t.value = d, d) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, o.value[1] = r[1];
          break;
      }
    }
    function p() {
      o.value[0] = r[0];
    }
    return (d, u) => (h(), _("div", Is, [
      M(i(Ke), {
        placement: e.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: p
      }, {
        reference: S(() => [
          s("div", Us, [
            d.$slots.default ? ie(d.$slots, "default", { key: 1 }, void 0, !0) : (h(), _("div", Rs, qs))
          ])
        ]),
        default: S(() => [
          s("div", Bs, [
            (h(!0), _(X, null, ne(i(c), (v, f) => (h(), _("label", {
              key: f,
              class: P(t.value == f ? "active" : ""),
              onClick: (g) => w(f)
            }, [
              s("img", {
                src: v,
                alt: ""
              }, null, 8, Ds)
            ], 10, As))), 128))
          ]),
          s("div", Es, [
            s("div", {
              class: "emjio-container",
              style: ke({ transform: `translateX(${a.value}%)` })
            }, [
              (h(!0), _(X, null, ne(o.value, (v, f) => (h(), _("div", {
                key: f,
                class: "emoji-wrapper"
              }, [
                M(i(Re), null, {
                  default: S(() => [
                    s("div", Os, [
                      (h(!0), _(X, null, ne(v, (g, m) => (h(), _("span", {
                        key: m,
                        class: "emoji-item",
                        onClick: (b) => d.$emit("addEmoji", m)
                      }, [
                        M(i(i1), {
                          src: g,
                          title: String(m),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, js))), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]))), 128))
            ], 4)
          ])
        ]),
        _: 3
      }, 8, ["placement"])
    ]));
  }
});
const Zs = /* @__PURE__ */ se(Ws, [["__scopeId", "data-v-8d8d47e5"]]), Ge = Symbol(), _t = fe(Zs), Ks = H({
  name: "UCounter"
}), Js = /* @__PURE__ */ H({
  ...Ks,
  props: {
    startAmount: { default: 0 },
    endAmount: { default: 0 },
    duration: { default: 3 },
    autoinit: { type: Boolean, default: !0 },
    prefix: { default: "" },
    suffix: { default: "" },
    separator: { default: "," },
    decimalSeparator: { default: "." },
    decimals: { default: 0 }
  },
  emits: ["finished"],
  setup(e, { emit: l }) {
    const n = e, t = oe({
      // 时间戳
      timestamp: 0,
      startTimestamp: 0,
      currentAmount: 0,
      currentStartAmount: 0,
      currentDuration: 0,
      paused: !1,
      // 剩下的
      remaining: 0,
      // 动画帧
      animationFrame: 0
    }), a = () => n.endAmount > n.startAmount, o = Z(() => {
      const d = /(\d+)(\d{3})/;
      let u = t.currentAmount.toFixed(n.decimals);
      u += "";
      let v = u.split("."), f = v[0], g = v.length > 1 ? n.decimalSeparator + v[1] : "", m = !isNaN(parseFloat(n.separator));
      if (n.separator && !m)
        for (; d.test(f); )
          f = f.replace(d, "$1" + n.separator + "$2");
      return f + g;
    }), r = Z(() => `${n.prefix}${o.value}${n.suffix}`);
    he(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? c() : t.paused = !0;
    });
    const c = () => {
      w(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(p);
    }, w = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, p = (d) => {
      t.timestamp = d, t.startTimestamp || (t.startTimestamp = d);
      let u = d - t.startTimestamp;
      t.remaining = t.currentDuration - u, a ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (u / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (u / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), u < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(p) : l("finished");
    };
    return (d, u) => (h(), _("span", null, Y(i(r)), 1));
  }
}), Xs = fe(Js), U1 = /* @__PURE__ */ H({
  props: {
    uid: null
  },
  setup(e) {
    const l = L({}), { showInfo: n } = re(C1), t = re($1), a = () => Be("div", t.card(l.value));
    return (o, r) => i(t).card ? (h(), K(i(Ke), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: r[0] || (r[0] = () => i(n)(e.uid, (c) => l.value = c))
    }, {
      reference: S(() => [
        ie(o.$slots, "default")
      ]),
      default: S(() => [
        M(a)
      ]),
      _: 3
    })) : ie(o.$slots, "default", { key: 1 });
  }
}), p1 = (e) => (Q("data-v-275b4309"), e = e(), G(), e), Qs = { class: "comment-sub" }, Gs = ["href"], e8 = /* @__PURE__ */ p1(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), t8 = { class: "comment-primary" }, n8 = { class: "comment-main" }, o8 = {
  key: 1,
  class: "user-info"
}, a8 = ["href"], l8 = { class: "username" }, s8 = {
  class: "name",
  style: { "max-width": "10em" }
}, i8 = {
  blank: "true",
  class: "rank"
}, r8 = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, c8 = { class: "time" }, u8 = { class: "content" }, d8 = ["innerHTML"], v8 = {
  class: "imgbox",
  style: { display: "flex" }
}, p8 = { class: "action-box select-none" }, h8 = /* @__PURE__ */ p1(() => /* @__PURE__ */ s("svg", {
  t: "1650360973068",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1168",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ s("path", {
    d: "M547.968 138.88c6.656-4.672 14.08-6.976 20.48-5.056 6.08 1.792 22.848 10.752 40.192 56.128 8.576 22.4 27.264 81.536-5.632 197.504a45.44 45.44 0 0 0 42.88 57.984l217.6 3.008h0.448a53.12 53.12 0 0 1 20.096 3.328 16.256 16.256 0 0 1 5.568 3.648 14.464 14.464 0 0 1 3.264 6.4c2.176 7.808 4.608 33.984-0.256 77.248-4.672 41.984-15.936 97.408-38.784 162.368-19.136 54.336-43.52 100.48-81.472 161.792a56.384 56.384 0 0 0-1.664 2.496l-0.128 0.128-1.408 2.112a7.872 7.872 0 0 1-1.28 1.472 3.84 3.84 0 0 1-1.28 0.64 20.48 20.48 0 0 1-6.848 0.96H356.032V421.44c19.712-10.624 40.704-24.576 62.592-47.616 25.472-26.88 51.008-64.768 78.208-121.6 5.568-11.584 9.856-24.384 13.632-36.032l3.072-9.856c2.688-8.448 5.184-16.384 8.064-24.32 8.064-22.4 16.128-36.032 26.368-43.136z m120.96 27.968c-20.48-53.44-48-84.736-81.984-94.912-33.6-9.984-61.952 4.16-76.032 14.08-27.584 19.264-41.28 49.6-50.048 74.048-3.392 9.344-6.464 19.2-9.216 27.968l-2.688 8.448a227.84 227.84 0 0 1-10.432 27.904c-25.28 52.928-47.36 84.544-66.752 104.96-18.944 19.968-36.48 30.464-55.168 39.808a45.376 45.376 0 0 0-25.088 40.576l-0.064 480.64c0 24.96 20.224 45.248 45.184 45.248h423.04c21.76 0 38.144-6.912 50.048-16.96a71.808 71.808 0 0 0 14.528-16.896l0.128-0.256 0.128-0.128 0.832-0.96 1.152-1.92c39.424-63.872 66.816-114.688 88.256-175.68a810.24 810.24 0 0 0 42.048-176.64c5.12-45.632 3.776-81.664-1.6-101.376a77.952 77.952 0 0 0-45.568-52.288 116.544 116.544 0 0 0-45.44-8.64l-192.768-2.688c28.096-115.072 10.048-181.568-2.496-214.336z m-604.864 247.04a45.184 45.184 0 0 1 45.12-47.296h67.008c24.96 0 45.184 20.288 45.184 45.248v480.64c0 24.96-20.224 45.12-45.184 45.12H131.84a45.184 45.184 0 0 1-45.12-43.072l-22.656-480.64z",
    "p-id": "1169"
  })
], -1)), f8 = /* @__PURE__ */ p1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ s("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), m8 = { key: 2 }, g8 = /* @__PURE__ */ p1(() => /* @__PURE__ */ s("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1320",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ s("path", {
    d: "M147.264 647.296V220.928c0-49.536 40.128-89.728 89.6-89.728H793.6c49.536 0 89.728 40.192 89.728 89.728v426.368c0 49.536-40.128 89.728-89.6 89.728h-145.216a47.04 47.04 0 0 0-28.16 9.408l-194.56 145.792a3.392 3.392 0 0 1-5.12-1.984l-26.752-116.672a47.04 47.04 0 0 0-45.824-36.544H236.992a89.728 89.728 0 0 1-89.728-89.728zM236.864 64A156.928 156.928 0 0 0 80 220.928l0.064 426.368a156.928 156.928 0 0 0 156.928 156.928h94.976l23.232 101.312 0.064 0.448a70.592 70.592 0 0 0 109.696 40.832l190.208-142.592H793.6a156.928 156.928 0 0 0 156.928-156.928l-0.064-426.368A156.928 156.928 0 0 0 793.536 64H236.928z m69.44 442.496a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z m268.8-65.344a65.344 65.344 0 1 1-130.752 0 65.344 65.344 0 0 1 130.752 0z m138.368 65.344a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z",
    "p-id": "1321"
  })
], -1)), _8 = { key: 2 }, w8 = /* @__PURE__ */ H({
  props: {
    reply: { type: Boolean },
    data: null,
    id: null
  },
  setup(e) {
    const l = e, n = oe({
      active: !1
    }), t = L(), a = L(), o = Z(() => {
      let b = l.data.contentImg;
      return Ze(b) ? [] : b == null ? void 0 : b.split("||");
    }), { allEmoji: r } = re(Ge), { like: c, user: w, relativeTime: p } = re(C1);
    function d() {
      n.active = !n.active, n.active && ge(() => {
        var b;
        (b = t.value) == null || b.focus();
      });
    }
    function u(b) {
      var B;
      const x = b.target;
      (B = a.value) != null && B.contains(x) || (n.active = !1);
    }
    const v = re($1), f = () => Be("div", v.info(l.data)), g = () => Be("div", v.operate(l.data)), m = Z(() => ft(r, l.data.content));
    return (b, x) => (h(), _("div", {
      class: P(["comment", { reply: l.reply }])
    }, [
      s("div", Qs, [
        M(U1, {
          uid: i(Ve)(e.data.uid)
        }, {
          default: S(() => [
            s("a", {
              href: e.data.user.homeLink,
              target: "_blank",
              class: "no-underline",
              style: { display: "block" }
            }, [
              M(i(Ye), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: e.data.user.avatar
              }, {
                default: S(() => [
                  e8
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, Gs)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      s("div", t8, [
        s("div", n8, [
          i(v).info ? (h(), K(f, { key: 0 })) : (h(), _("div", o8, [
            M(U1, {
              uid: i(Ve)(e.data.uid)
            }, {
              default: S(() => [
                s("a", {
                  href: e.data.user.homeLink,
                  target: "_blank",
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  s("div", l8, [
                    s("span", s8, Y(e.data.user.username), 1),
                    s("span", i8, [
                      M(i(Ae), {
                        size: "24",
                        innerHTML: i(vs)(e.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, a8)
              ]),
              _: 1
            }, 8, ["uid"]),
            s("span", r8, "  " + Y(e.data.address), 1),
            s("time", c8, Y(i(p) ? i(b1)(e.data.createTime).fromNow() : e.data.createTime), 1)
          ])),
          s("div", u8, [
            M(i(at), { unfold: "" }, {
              default: S(() => [
                s("div", { innerHTML: i(m) }, null, 8, d8),
                s("div", v8, [
                  (h(!0), _(X, null, ne(i(o), (B, D) => (h(), K(i(i1), {
                    key: D,
                    src: B,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": i(o),
                    "initial-index": D
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          s("div", p8, [
            s("div", {
              class: "item",
              onClick: x[0] || (x[0] = (B) => i(c)(i(Ve)(e.data.id)))
            }, [
              i(w).likeIds.map(String).indexOf(i(Ve)(e.data.id)) == -1 ? (h(), K(i(Ae), { key: 0 }, {
                default: S(() => [
                  h8
                ]),
                _: 1
              })) : (h(), K(i(Ae), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: S(() => [
                  f8
                ]),
                _: 1
              })),
              e.data.likes != 0 ? (h(), _("span", m8, Y(e.data.likes), 1)) : N("", !0)
            ]),
            s("div", {
              ref_key: "btnRef",
              ref: a,
              class: P(["item", { active: i(n).active }]),
              onClick: d
            }, [
              M(i(Ae), null, {
                default: S(() => [
                  g8
                ]),
                _: 1
              }),
              s("span", null, Y(i(n).active ? "取消回复" : "回复"), 1)
            ], 2),
            i(v).operate ? (h(), K(g, { key: 0 })) : N("", !0)
          ]),
          i(n).active ? (h(), _("div", _8, [
            M(tt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": i(Ve)(e.id),
              placeholder: `回复 @${e.data.user.username}...`,
              reply: e.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: u,
              onClose: x[1] || (x[1] = (B) => i(n).active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : N("", !0)
        ]),
        ie(b.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const wt = /* @__PURE__ */ se(w8, [["__scopeId", "data-v-275b4309"]]), y8 = (e) => (Q("data-v-d1e7932a"), e = e(), G(), e), x8 = {
  key: 0,
  class: "reply-box"
}, b8 = { class: "reply-list" }, $8 = {
  key: 0,
  class: "fetch-more"
}, C8 = { key: 0 }, k8 = { key: 1 }, M8 = { key: 0 }, z8 = /* @__PURE__ */ ae(" 点击查看 "), L8 = /* @__PURE__ */ y8(() => /* @__PURE__ */ s("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ s("path", {
    "data-v-d6f79dbc": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
  })
], -1)), S8 = [
  z8,
  L8
], F8 = {
  key: 1,
  class: "fetch-more"
}, T8 = /* @__PURE__ */ H({
  props: {
    data: null,
    id: null
  },
  setup(e) {
    const l = e, n = oe({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: o } = re(g1), { page: r } = re(g1), c = Z(() => {
      let v = {
        total: 0,
        length: 0,
        list: []
      };
      if (l.data) {
        let f = l.data.list.length;
        v = {
          total: l.data.total,
          length: f,
          list: l.data.list
        };
      }
      if (!n.over) {
        let f = v.list.slice(0, a);
        v.list = f;
      }
      return r && (v.list = v.list.slice(0, 5)), v;
    }), w = () => {
      n.over = !0;
    }, p = (v) => {
      o.value.forEach((f) => {
        f.id == l.id && f.reply && (f.reply = v);
      });
    }, d = (v) => {
      n.pageNum = v, t(l.id, v, n.pageSize, (f) => p(f));
    }, u = (v) => {
      n.pageSize = v, t(l.id, n.pageNum, v, (f) => p(f));
    };
    return (v, f) => i(c).length > 0 ? (h(), _("div", x8, [
      s("div", b8, [
        (h(!0), _(X, null, ne(i(c).list, (g, m) => (h(), K(wt, {
          id: e.id,
          key: m,
          data: g,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        i(c).length > i(a) ? (h(), _("div", $8, [
          i(n).loading ? (h(), _("span", C8, "加载中...")) : (h(), _("div", k8, [
            i(n).over ? N("", !0) : (h(), _("div", M8, [
              ae(" 共" + Y(i(c).total) + "条回复, ", 1),
              s("span", {
                class: "fetch-more-comment select-none",
                onClick: w
              }, S8)
            ]))
          ]))
        ])) : N("", !0),
        i(n).over && i(r) ? (h(), _("div", F8, [
          M(i(X1), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: i(c).total,
            "page-size": i(n).pageSize,
            onCurrentChange: d,
            onSizeChange: u
          }, null, 8, ["total", "page-size"])
        ])) : N("", !0)
      ])
    ])) : N("", !0);
  }
});
const H8 = /* @__PURE__ */ se(T8, [["__scopeId", "data-v-d1e7932a"]]), V8 = {
  key: 0,
  class: "comment-list"
}, I8 = /* @__PURE__ */ H({
  props: {
    data: null,
    total: null,
    showSize: null
  },
  setup(e) {
    return (l, n) => e.data ? (h(), _("div", V8, [
      (h(!0), _(X, null, ne(e.data, (t, a) => (h(), K(wt, {
        id: i(Ve)(t.id),
        key: a,
        data: t
      }, {
        default: S(() => [
          M(H8, {
            id: i(Ve)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : N("", !0);
  }
});
const A1 = (e) => (Q("data-v-0b01b678"), e = e(), G(), e), B8 = { class: "u-comment" }, A8 = { class: "comment-form" }, D8 = /* @__PURE__ */ A1(() => /* @__PURE__ */ s("div", { class: "header" }, [
  /* @__PURE__ */ s("span", { class: "header-title" }, "评论")
], -1)), E8 = { class: "content" }, O8 = { class: "avatar-box" }, j8 = /* @__PURE__ */ A1(() => /* @__PURE__ */ s("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), U8 = { class: "comment-list-wrapper" }, R8 = /* @__PURE__ */ A1(() => /* @__PURE__ */ s("div", { class: "title" }, "全部评论", -1)), Y8 = H({
  name: "UComment"
}), N8 = /* @__PURE__ */ H({
  ...Y8,
  props: {
    config: null,
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo"],
  setup(e, { expose: l, emit: n }) {
    const t = e, { user: a, comments: o, showSize: r, replyShowSize: c, total: w } = Oe(t.config), p = ({ content: b, parentId: x, reply: B, files: D, clear: T }) => {
      n("submit", { content: b, parentId: x, reply: B, files: D, finish: (z) => {
        if (T(), x) {
          let F = o.value.find((U) => U.id == x);
          if (F) {
            let U = F.reply;
            U ? (U.list.unshift(z), U.total++) : F.reply = {
              total: 1,
              list: [z]
            };
          }
        } else
          o.value.unshift(z);
      } });
    }, d = {
      upload: t.upload,
      submit: p
    };
    ye(G1, d);
    const u = (b, x) => {
      let B = null;
      o.value.forEach((D) => {
        var T;
        D.id == b ? B = D : B = (T = D.reply) == null ? void 0 : T.list.find((C) => C.id == b), B && (B.likes += x);
      });
    }, f = {
      user: a,
      like: (b) => {
        const x = t.config.user.likeIds;
        n("like", b, () => {
          if (x.findIndex((B) => B == b) == -1)
            x.push(b), u(b, 1);
          else {
            let B = x.findIndex((D) => D == b);
            B != -1 && (x.splice(B, 1), u(b, -1));
          }
        });
      },
      relativeTime: Pe(t.relativeTime, !1),
      showInfo: (b, x) => n("showInfo", b, x)
    };
    ye(C1, f);
    const g = {
      page: t.page,
      replyPage: (b, x, B, D) => {
        n("replyPage", { parentId: b, pageNum: x, pageSize: B, finish: D });
      },
      replyShowSize: Pe(c, 3),
      comments: o
    };
    ye(g1, g);
    const m = (b) => {
      const { parentId: x, id: B } = b;
      if (x) {
        let D = o.value.find((C) => C.id == x), T = D == null ? void 0 : D.reply;
        if (T) {
          let C = T.list.findIndex((z) => z.id == B);
          C != -1 && (T.list.splice(C, 1), T.total--);
        }
      } else {
        let D = o.value.findIndex((T) => T.id == B);
        D != -1 && o.value.splice(D, 1);
      }
    };
    return ye(Ge, t.config.emoji), ye($1, q1()), l({
      remove: m
    }), (b, x) => (h(), _("div", B8, [
      s("div", A8, [
        D8,
        s("div", E8, [
          s("div", O8, [
            M(i(Ye), {
              size: 40,
              src: e.config.user.avatar
            }, {
              default: S(() => [
                j8
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          M(tt, {
            placeholder: "输入评论（Enter换行，Ctrl + Enter发送）",
            "content-btn": "发表评论"
          })
        ])
      ]),
      s("div", U8, [
        ie(b.$slots, "default", {}, () => [
          R8
        ], !0),
        M(I8, {
          data: i(o),
          total: i(w),
          "show-size": i(Pe)(i(r), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])
    ]));
  }
});
const q8 = /* @__PURE__ */ se(N8, [["__scopeId", "data-v-0b01b678"]]), P8 = fe(q8), W8 = [
  P8,
  y2,
  T2,
  U2,
  P2,
  ot,
  at,
  Ae,
  T4,
  P4,
  X4,
  i0,
  ds,
  Vs,
  _t,
  Xs
];
const Z8 = (e) => {
  W8.forEach((l) => {
    e.use(l);
  });
}, r6 = {
  install: Z8
};
export {
  d6 as ElAvatar,
  v6 as ElButton,
  p6 as ElCarousel,
  h6 as ElDialog,
  f6 as ElDropdown,
  m6 as ElDropdownItem,
  g6 as ElDropdownMenu,
  _6 as ElImage,
  w6 as ElInput,
  y6 as ElLink,
  x6 as ElPagination,
  b6 as ElPopover,
  $6 as ElScrollbar,
  C6 as ElTag,
  Ge as InjectionEmojiApi,
  i0 as UAnchor,
  Vs as UChat,
  P8 as UComment,
  T2 as UCommentNav,
  y2 as UCommentScroll,
  Xs as UCounter,
  U2 as UDialog,
  P2 as UDivider,
  ot as UEditor,
  _t as UEmoji,
  at as UFold,
  Ae as UIcon,
  X4 as UNoticeBar,
  ds as USearch,
  T4 as USign,
  P4 as UTags,
  M1 as UToast,
  Qt as clear,
  Pt as cloneDeep,
  Wt as createGlobalNode,
  t2 as createObjectURL,
  b1 as dayjs,
  Gt as debounce,
  e6 as deepTree,
  r6 as default,
  n6 as flattenDeep,
  Jt as get,
  Z8 as install,
  Q1 as isArray,
  G8 as isBoolean,
  Ze as isEmpty,
  X8 as isFunction,
  e2 as isImage,
  Pe as isNull,
  xt as isNumber,
  yt as isObject,
  Q8 as isString,
  Xt as remove,
  s6 as removeEmptyField,
  Zt as removeGlobalNode,
  t6 as revDeepTree,
  Kt as set,
  e1 as storage,
  Ve as str,
  a6 as throttle,
  l6 as toFormData,
  o6 as useBrowser,
  ft as useEmojiParse,
  vs as useLevel,
  i6 as usePage,
  k6 as vInfiniteScroll,
  fe as withInstall
};
