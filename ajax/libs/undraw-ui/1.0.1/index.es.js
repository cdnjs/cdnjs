import { h as ze, render as zt, defineComponent as Y, ref as L, reactive as ae, inject as ce, withDirectives as fe, openBlock as p, createElementBlock as x, createVNode as k, unref as g, normalizeClass as J, Transition as qe, withCtx as F, createElementVNode as l, createCommentVNode as R, createBlock as Z, createTextVNode as re, toDisplayString as N, nextTick as $e, pushScopeId as ne, popScopeId as oe, computed as K, renderSlot as ue, resolveComponent as le, watch as pe, createSlots as St, useCssVars as Ee, normalizeStyle as Se, onMounted as ge, vShow as Le, toRefs as We, withKeys as Ze, Fragment as te, renderList as ie, onUnmounted as Ae, toRef as it, withModifiers as st, vModelText as Lt, provide as ye, useSlots as Ft, mergeProps as Tt } from "vue";
import { ElButton as Be, ClickOutside as rt, ElLink as ct, ElInfiniteScroll as It, ElDialog as Ht, ElForm as Vt, ElFormItem as Me, ElInput as Ve, ElScrollbar as Ke, ElCarousel as At, ElTag as Bt, ElAvatar as Je, ElPopover as ut, ElImage as dt, ElPagination as Et } from "element-plus";
import { ElAvatar as as, ElButton as ls, ElCarousel as is, ElDialog as rs, ElDropdown as cs, ElDropdownItem as us, ElDropdownMenu as ds, ElImage as ps, ElInput as hs, ElLink as fs, ElPagination as vs, ElPopover as ms, ElScrollbar as _s, ElTag as gs, ElInfiniteScroll as ys } from "element-plus";
/*! UndrawUi v1.0.1 */
function pt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Dt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function jt(e) {
  return !isNaN(Number(e));
}
function Po(e) {
  return typeof e == "function";
}
function qo(e) {
  return typeof e == "string";
}
function Wo(e) {
  return typeof e == "boolean";
}
function _e(e) {
  return pt(e) ? e.length === 0 : Dt(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const de = (e, o) => _e(e) ? o : e;
function Ne(e) {
  if (typeof e != "object" || e === null)
    return e;
  let o;
  if (Array.isArray(e)) {
    o = [];
    for (let n = 0; n < e.length; n++)
      o[n] = Ne(e[n]);
  } else if (e instanceof Date)
    o = new Date(e.getTime());
  else if (e instanceof RegExp)
    o = new RegExp(e.source, e.flags);
  else {
    o = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (o[n] = Ne(e[n]));
  }
  return o;
}
function Zo(e, o = { parentId: "parentId", children: "children" }) {
  let n = de(o.parentId, "parentId"), t = de(o.children, "children");
  e = Ne(e);
  const a = [], s = {};
  return e.forEach((c) => s[c.id] = c), e.forEach((c) => {
    const i = s[c[n]];
    i ? (i[t] || (i[t] = [])).push(c) : a.push(c);
  }), a;
}
function Ko(e = [], o = { parentId: "parentId", children: "children" }) {
  let n = de(o.parentId, "parentId"), t = de(o.children, "children");
  const a = [], s = (c, i) => {
    c.forEach((v) => {
      v.id || (v.id = i++), v[n] = i, a.push(v), v[t] && pt(v[t]) && s(v[t], v.id);
    });
  };
  return s(e || [], null), a;
}
const Jo = (e, o = 1 / 0) => e.flat(o), ee = (e, o) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(o ?? {})])
      n.component(t.name, t);
  }, o)
    for (const [n, t] of Object.entries(o))
      e[n] = t;
  return e;
};
function Go() {
  const { clientWidth: e } = document.documentElement, o = navigator.userAgent.toLowerCase();
  let n = (o.match(/firefox|chrome|safari|opera/g) || "other")[0];
  (o.match(/msie|trident/g) || [])[0] && (n = "msie");
  let t = "";
  "ontouchstart" in window || o.indexOf("touch") !== -1 || o.indexOf("mobile") !== -1 ? o.indexOf("ipad") !== -1 ? t = "pad" : o.indexOf("mobile") !== -1 ? t = "mobile" : o.indexOf("android") !== -1 ? t = "androidPad" : t = "pc" : t = "pc";
  let s = "";
  switch (n) {
    case "chrome":
    case "safari":
    case "mobile":
      s = "webkit";
      break;
    case "msie":
      s = "ms";
      break;
    case "firefox":
      s = "Moz";
      break;
    case "opera":
      s = "O";
      break;
    default:
      s = "webkit";
      break;
  }
  const c = o.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let i = "full";
  e < 768 ? i = "xs" : e < 992 ? i = "sm" : e < 1200 ? i = "md" : e < 1920 ? i = "xl" : i = "full";
  const v = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), h = (o.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], u = t === "pc", r = !u, f = i === "xs" || r, d = window.innerHeight + "px";
  return {
    version: h,
    type: n,
    plat: c,
    tag: t,
    prefix: s,
    isMobile: r,
    isIOS: v,
    isPC: u,
    isMini: f,
    screen: i,
    innerHeight: d
  };
}
function Ot(e, o) {
  const n = ze(e, o), t = document.createElement("div");
  return document.body.append(t), zt(n, t), { vnode: n, div: t };
}
function Ut(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const De = (e) => e ? "localStorage" : "sessionStorage", Rt = (e, o, n = !0) => {
  (o === "" || o === null || o === void 0) && (o = null), window[De(n)].setItem(e, JSON.stringify(o));
}, Yt = (e, o = !0) => {
  let n;
  const t = window[De(o)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Nt = (e, o = !0) => {
  window[De(o)].removeItem(e);
}, Pt = (e = !0) => {
  window[De(e)].clear();
}, He = {
  set: Rt,
  get: Yt,
  remove: Nt,
  clear: Pt
}, qt = (e, o = 200, n = !1) => {
  let t = !1, a = null;
  const s = (...c) => new Promise((i, v) => {
    if (a && clearTimeout(a), n && !t) {
      const h = e.apply(void 0, c);
      i(h), t = !0;
    } else
      a = setTimeout(() => {
        const h = e.apply(void 0, c);
        i(h), t = !1, a = null;
      }, o);
  });
  return s.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, s;
}, Xo = (e, o = 500) => {
  let n = 0;
  const t = (...a) => new Promise((s, c) => {
    const i = (/* @__PURE__ */ new Date()).getTime();
    if (i - n >= o) {
      const v = e.apply(void 0, a);
      s(v), n = i;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, we = (e) => e == null ? "" : String(e);
function Wt(e) {
  let o = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return o.indexOf(t.toLowerCase()) != -1;
}
function Zt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function Qo(e) {
  const o = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, s) => o.append(n + `[${s}]`, a)) : o.append(n, e[n]);
  }), o;
}
function es(e) {
  return Object.keys(e).filter((o) => e[o] !== null && e[o] !== void 0).reduce((o, n) => ({ ...o, [n]: e[n] }), {});
}
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ht(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = { exports: {} }, at;
function ft() {
  return at || (at = 1, function(e, o) {
    (function(n, t) {
      e.exports = t();
    })(Ge, function() {
      var n = 1e3, t = 6e4, a = 36e5, s = "millisecond", c = "second", i = "minute", v = "hour", h = "day", u = "week", r = "month", f = "quarter", d = "year", m = "date", y = "Invalid Date", A = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, j = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(S) {
        var w = ["th", "st", "nd", "rd"], $ = S % 100;
        return "[" + S + (w[($ - 20) % 10] || w[$] || w[0]) + "]";
      } }, H = function(S, w, $) {
        var I = String(S);
        return !I || I.length >= w ? S : "" + Array(w + 1 - I.length).join($) + S;
      }, M = { s: H, z: function(S) {
        var w = -S.utcOffset(), $ = Math.abs(w), I = Math.floor($ / 60), C = $ % 60;
        return (w <= 0 ? "+" : "-") + H(I, 2, "0") + ":" + H(C, 2, "0");
      }, m: function S(w, $) {
        if (w.date() < $.date())
          return -S($, w);
        var I = 12 * ($.year() - w.year()) + ($.month() - w.month()), C = w.clone().add(I, r), B = $ - C < 0, V = w.clone().add(I + (B ? -1 : 1), r);
        return +(-(I + ($ - C) / (B ? C - V : V - C)) || 0);
      }, a: function(S) {
        return S < 0 ? Math.ceil(S) || 0 : Math.floor(S);
      }, p: function(S) {
        return { M: r, y: d, w: u, d: h, D: m, h: v, m: i, s: c, ms: s, Q: f }[S] || String(S || "").toLowerCase().replace(/s$/, "");
      }, u: function(S) {
        return S === void 0;
      } }, _ = "en", z = {};
      z[_] = j;
      var T = function(S) {
        return S instanceof G;
      }, O = function S(w, $, I) {
        var C;
        if (!w)
          return _;
        if (typeof w == "string") {
          var B = w.toLowerCase();
          z[B] && (C = B), $ && (z[B] = $, C = B);
          var V = w.split("-");
          if (!C && V.length > 1)
            return S(V[0]);
        } else {
          var U = w.name;
          z[U] = w, C = U;
        }
        return !I && C && (_ = C), C || !I && _;
      }, D = function(S, w) {
        if (T(S))
          return S.clone();
        var $ = typeof w == "object" ? w : {};
        return $.date = S, $.args = arguments, new G($);
      }, E = M;
      E.l = O, E.i = T, E.w = function(S, w) {
        return D(S, { locale: w.$L, utc: w.$u, x: w.$x, $offset: w.$offset });
      };
      var G = function() {
        function S($) {
          this.$L = O($.locale, null, !0), this.parse($);
        }
        var w = S.prototype;
        return w.parse = function($) {
          this.$d = function(I) {
            var C = I.date, B = I.utc;
            if (C === null)
              return /* @__PURE__ */ new Date(NaN);
            if (E.u(C))
              return /* @__PURE__ */ new Date();
            if (C instanceof Date)
              return new Date(C);
            if (typeof C == "string" && !/Z$/i.test(C)) {
              var V = C.match(A);
              if (V) {
                var U = V[2] - 1 || 0, W = (V[7] || "0").substring(0, 3);
                return B ? new Date(Date.UTC(V[1], U, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, W)) : new Date(V[1], U, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, W);
              }
            }
            return new Date(C);
          }($), this.$x = $.x || {}, this.init();
        }, w.init = function() {
          var $ = this.$d;
          this.$y = $.getFullYear(), this.$M = $.getMonth(), this.$D = $.getDate(), this.$W = $.getDay(), this.$H = $.getHours(), this.$m = $.getMinutes(), this.$s = $.getSeconds(), this.$ms = $.getMilliseconds();
        }, w.$utils = function() {
          return E;
        }, w.isValid = function() {
          return this.$d.toString() !== y;
        }, w.isSame = function($, I) {
          var C = D($);
          return this.startOf(I) <= C && C <= this.endOf(I);
        }, w.isAfter = function($, I) {
          return D($) < this.startOf(I);
        }, w.isBefore = function($, I) {
          return this.endOf(I) < D($);
        }, w.$g = function($, I, C) {
          return E.u($) ? this[I] : this.set(C, $);
        }, w.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, w.valueOf = function() {
          return this.$d.getTime();
        }, w.startOf = function($, I) {
          var C = this, B = !!E.u(I) || I, V = E.p($), U = function(be, se) {
            var me = E.w(C.$u ? Date.UTC(C.$y, se, be) : new Date(C.$y, se, be), C);
            return B ? me : me.endOf(h);
          }, W = function(be, se) {
            return E.w(C.toDate()[be].apply(C.toDate("s"), (B ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), C);
          }, q = this.$W, Q = this.$M, ve = this.$D, he = "set" + (this.$u ? "UTC" : "");
          switch (V) {
            case d:
              return B ? U(1, 0) : U(31, 11);
            case r:
              return B ? U(1, Q) : U(0, Q + 1);
            case u:
              var Ce = this.$locale().weekStart || 0, ke = (q < Ce ? q + 7 : q) - Ce;
              return U(B ? ve - ke : ve + (6 - ke), Q);
            case h:
            case m:
              return W(he + "Hours", 0);
            case v:
              return W(he + "Minutes", 1);
            case i:
              return W(he + "Seconds", 2);
            case c:
              return W(he + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, w.endOf = function($) {
          return this.startOf($, !1);
        }, w.$set = function($, I) {
          var C, B = E.p($), V = "set" + (this.$u ? "UTC" : ""), U = (C = {}, C[h] = V + "Date", C[m] = V + "Date", C[r] = V + "Month", C[d] = V + "FullYear", C[v] = V + "Hours", C[i] = V + "Minutes", C[c] = V + "Seconds", C[s] = V + "Milliseconds", C)[B], W = B === h ? this.$D + (I - this.$W) : I;
          if (B === r || B === d) {
            var q = this.clone().set(m, 1);
            q.$d[U](W), q.init(), this.$d = q.set(m, Math.min(this.$D, q.daysInMonth())).$d;
          } else
            U && this.$d[U](W);
          return this.init(), this;
        }, w.set = function($, I) {
          return this.clone().$set($, I);
        }, w.get = function($) {
          return this[E.p($)]();
        }, w.add = function($, I) {
          var C, B = this;
          $ = Number($);
          var V = E.p(I), U = function(Q) {
            var ve = D(B);
            return E.w(ve.date(ve.date() + Math.round(Q * $)), B);
          };
          if (V === r)
            return this.set(r, this.$M + $);
          if (V === d)
            return this.set(d, this.$y + $);
          if (V === h)
            return U(1);
          if (V === u)
            return U(7);
          var W = (C = {}, C[i] = t, C[v] = a, C[c] = n, C)[V] || 1, q = this.$d.getTime() + $ * W;
          return E.w(q, this);
        }, w.subtract = function($, I) {
          return this.add(-1 * $, I);
        }, w.format = function($) {
          var I = this, C = this.$locale();
          if (!this.isValid())
            return C.invalidDate || y;
          var B = $ || "YYYY-MM-DDTHH:mm:ssZ", V = E.z(this), U = this.$H, W = this.$m, q = this.$M, Q = C.weekdays, ve = C.months, he = function(se, me, Re, Ie) {
            return se && (se[me] || se(I, B)) || Re[me].slice(0, Ie);
          }, Ce = function(se) {
            return E.s(U % 12 || 12, se, "0");
          }, ke = C.meridiem || function(se, me, Re) {
            var Ie = se < 12 ? "AM" : "PM";
            return Re ? Ie.toLowerCase() : Ie;
          }, be = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: q + 1, MM: E.s(q + 1, 2, "0"), MMM: he(C.monthsShort, q, ve, 3), MMMM: he(ve, q), D: this.$D, DD: E.s(this.$D, 2, "0"), d: String(this.$W), dd: he(C.weekdaysMin, this.$W, Q, 2), ddd: he(C.weekdaysShort, this.$W, Q, 3), dddd: Q[this.$W], H: String(U), HH: E.s(U, 2, "0"), h: Ce(1), hh: Ce(2), a: ke(U, W, !0), A: ke(U, W, !1), m: String(W), mm: E.s(W, 2, "0"), s: String(this.$s), ss: E.s(this.$s, 2, "0"), SSS: E.s(this.$ms, 3, "0"), Z: V };
          return B.replace(b, function(se, me) {
            return me || be[se] || V.replace(":", "");
          });
        }, w.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, w.diff = function($, I, C) {
          var B, V = E.p(I), U = D($), W = (U.utcOffset() - this.utcOffset()) * t, q = this - U, Q = E.m(this, U);
          return Q = (B = {}, B[d] = Q / 12, B[r] = Q, B[f] = Q / 3, B[u] = (q - W) / 6048e5, B[h] = (q - W) / 864e5, B[v] = q / a, B[i] = q / t, B[c] = q / n, B)[V] || q, C ? Q : E.a(Q);
        }, w.daysInMonth = function() {
          return this.endOf(r).$D;
        }, w.$locale = function() {
          return z[this.$L];
        }, w.locale = function($, I) {
          if (!$)
            return this.$L;
          var C = this.clone(), B = O($, I, !0);
          return B && (C.$L = B), C;
        }, w.clone = function() {
          return E.w(this.$d, this);
        }, w.toDate = function() {
          return new Date(this.valueOf());
        }, w.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, w.toISOString = function() {
          return this.$d.toISOString();
        }, w.toString = function() {
          return this.$d.toUTCString();
        }, S;
      }(), X = G.prototype;
      return D.prototype = X, [["$ms", s], ["$s", c], ["$m", i], ["$H", v], ["$W", h], ["$M", r], ["$y", d], ["$D", m]].forEach(function(S) {
        X[S[1]] = function(w) {
          return this.$g(w, S[0], S[1]);
        };
      }), D.extend = function(S, w) {
        return S.$i || (S(w, G, D), S.$i = !0), D;
      }, D.locale = O, D.isDayjs = T, D.unix = function(S) {
        return D(1e3 * S);
      }, D.en = z[_], D.Ls = z, D.p = {}, D;
    });
  }(Ye)), Ye.exports;
}
var Kt = ft();
const Xe = /* @__PURE__ */ ht(Kt);
var Jt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t(ft());
  })(Ge, function(n) {
    function t(c) {
      return c && typeof c == "object" && "default" in c ? c : { default: c };
    }
    var a = t(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(c, i) {
      return i === "W" ? c + "周" : c + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(c, i) {
      var v = 100 * c + i;
      return v < 600 ? "凌晨" : v < 900 ? "早上" : v < 1100 ? "上午" : v < 1300 ? "中午" : v < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(s, null, !0), s;
  });
})(Jt);
var vt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t();
  })(Ge, function() {
    return function(n, t, a) {
      n = n || {};
      var s = t.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(h, u, r, f) {
        return s.fromToBase(h, u, r, f);
      }
      a.en.relativeTime = c, s.fromToBase = function(h, u, r, f, d) {
        for (var m, y, A, b = r.$locale().relativeTime || c, j = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], H = j.length, M = 0; M < H; M += 1) {
          var _ = j[M];
          _.d && (m = f ? a(h).diff(r, _.d, !0) : r.diff(h, _.d, !0));
          var z = (n.rounding || Math.round)(Math.abs(m));
          if (A = m > 0, z <= _.r || !_.r) {
            z <= 1 && M > 0 && (_ = j[M - 1]);
            var T = b[_.l];
            d && (z = d("" + z)), y = typeof T == "string" ? T.replace("%d", z) : T(z, u, _.l, A);
            break;
          }
        }
        if (u)
          return y;
        var O = A ? b.future : b.past;
        return typeof O == "function" ? O(y) : O.replace("%s", y);
      }, s.to = function(h, u) {
        return i(h, u, this, !0);
      }, s.from = function(h, u) {
        return i(h, u, this);
      };
      var v = function(h) {
        return h.$u ? a.utc() : a();
      };
      s.toNow = function(h) {
        return this.to(v(this), h);
      }, s.fromNow = function(h) {
        return this.from(v(this), h);
      };
    };
  });
})(vt);
var Gt = vt.exports;
const Xt = /* @__PURE__ */ ht(Gt);
Xe.locale("zh-cn");
Xe.extend(Xt);
const je = Symbol(), mt = Symbol(), Qe = Symbol(), Pe = Symbol(), _t = (e) => (ne("data-v-264ee38d"), e = e(), oe(), e), Qt = { class: "comment-box" }, e1 = {
  key: 0,
  class: "action-box"
}, t1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ l("path", {
    "data-v-48a7e3c5": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
  })
], -1)), n1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("span", null, "图片", -1)), o1 = { class: "btn-box" }, s1 = /* @__PURE__ */ Y({
  __name: "input-box",
  props: {
    placeholder: {},
    contentBtn: {},
    parentId: {},
    reply: {},
    cancelBtn: {}
  },
  emits: ["hide", "close"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = L(""), s = L(!1), c = L(!0), i = L(), v = L(), h = L(), u = L([]), r = L([]), f = ae({
      imgLength: 0
    }), d = (G) => {
      _e(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: m, submit: y, focus: A } = ce(mt), b = ce(Te), j = () => {
      y({
        content: t.reply ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: de(t.parentId, null),
        reply: t.reply,
        files: r.value,
        clear: () => {
          _(), n("close");
        }
      });
    }, H = ce("cancelFn"), M = () => {
      _(), n("close"), H();
    }, _ = () => {
      i.value.clear(), u.value.length = 0, r.value = [], c.value = !0;
    };
    function z(G) {
      _e(a.value) && !f.imgLength && (s.value = !1, n("hide", G));
    }
    function T() {
      s.value = !0, $e(() => {
        v.value = document.querySelector("div[id^='el-popper-container']");
      }), A();
    }
    o({
      focus: () => {
        var G;
        return (G = i.value) == null ? void 0 : G.focus();
      }
    });
    const O = (G) => {
      var S;
      u.value.length = 0, r.value.length = 0;
      const X = (S = h.value) == null ? void 0 : S.files;
      if (f.imgLength = de(X == null ? void 0 : X.length, 0), X)
        for (let w = 0; w < X.length; w++) {
          let $ = X[w].name, I = Zt(X[w]);
          r.value.push(X[w]), Wt($) ? u.value.push(I) : tt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, D = ce(je), E = () => ze("div", D.func());
    return (G, X) => fe((p(), x("div", Qt, [
      k(g(wt), {
        ref_key: "editorRef",
        ref: i,
        modelValue: a.value,
        "onUpdate:modelValue": X[0] || (X[0] = (S) => a.value = S),
        class: J({ "input-active": s.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": u.value,
        onFocus: T,
        onInput: d,
        onSubmit: j
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      k(qe, { name: "fade" }, {
        default: F(() => [
          s.value ? (p(), x("div", e1, [
            k(g(kt), {
              emoji: g(b),
              onAddEmoji: X[1] || (X[1] = (S) => {
                var w;
                return (w = i.value) == null ? void 0 : w.addText(S);
              })
            }, null, 8, ["emoji"]),
            g(m) ? (p(), x("div", {
              key: 0,
              class: "picture",
              onClick: X[2] || (X[2] = //@ts-ignore
              (...S) => {
                var w, $;
                return ((w = h.value) == null ? void 0 : w.click) && (($ = h.value) == null ? void 0 : $.click(...S));
              })
            }, [
              t1,
              n1,
              l("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: h,
                type: "file",
                multiple: "",
                onChange: O
              }, null, 544)
            ])) : R("", !0),
            g(D).func ? (p(), Z(E, { key: 1 })) : R("", !0),
            l("div", o1, [
              k(g(Be), {
                type: "primary",
                disabled: c.value,
                onClick: j
              }, {
                default: F(() => [
                  re(N(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (p(), Z(g(Be), {
                key: 0,
                onClick: M
              }, {
                default: F(() => [
                  re(N(t.cancelBtn), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])) : R("", !0)
        ]),
        _: 1
      })
    ])), [
      [g(rt), z, v.value]
    ]);
  }
});
const P = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of o)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ P(s1, [["__scopeId", "data-v-264ee38d"]]), a1 = { class: "u-comment-scroll" }, l1 = ["infinite-scroll-disabled"], i1 = { class: "scroll-btn" }, r1 = { key: 1 }, c1 = { key: 2 }, u1 = /* @__PURE__ */ Y({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(!1), s = K(() => a.value && n.disable), c = K(() => !a.value || t.value || s.value), i = qt(() => {
      o("more"), t.value = !1;
    }, 500), v = () => {
      t.value = !0, i();
    };
    return (h, u) => (p(), x("div", a1, [
      fe((p(), x("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        ue(h.$slots, "default", {}, void 0, !0),
        l("div", i1, [
          a.value ? R("", !0) : (p(), Z(g(ct), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: u[0] || (u[0] = (r) => a.value = !a.value)
          }, {
            default: F(() => [
              re("加载更多")
            ]),
            _: 1
          })),
          t.value ? (p(), x("p", r1, "加载中...")) : R("", !0),
          s.value ? (p(), x("p", c1, "没有更多了")) : R("", !0)
        ])
      ], 8, l1)), [
        [g(It), v]
      ])
    ]));
  }
});
const d1 = /* @__PURE__ */ P(u1, [["__scopeId", "data-v-404b6e08"]]), p1 = ee(d1), et = (e) => (ne("data-v-3e026489"), e = e(), oe(), e), h1 = { class: "nav" }, f1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("span", { class: "nav__title" }, "全部评论", -1)), v1 = { class: "nav__sort" }, m1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99951 0.5C9.03708 0.5 11.4995 2.96243 11.4995 6C11.4995 9.03757 9.03708 11.5 5.99951 11.5C2.96195 11.5 0.499512 9.03757 0.499512 6C0.499512 2.96243 2.96195 0.5 5.99951 0.5ZM6.25 3.49988C6.38807 3.49988 6.5 3.61181 6.5 3.74988V5.49988H8.25C8.38807 5.49988 8.5 5.61181 8.5 5.74988V6.24988C8.5 6.38795 8.38807 6.49988 8.25 6.49988H5.75C5.61193 6.49988 5.5 6.38795 5.5 6.24988V3.74988C5.5 3.61181 5.61193 3.49988 5.75 3.49988H6.25Z"
  })
], -1)), _1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), g1 = /* @__PURE__ */ Y({
  name: "uCommentNav",
  __name: "comment-nav",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: o }) {
    const n = e, t = K({
      get() {
        return n.modelValue;
      },
      set(a) {
        o("update:modelValue", a), o("sorted", a);
      }
    });
    return (a, s) => {
      const c = le("u-icon");
      return p(), x("div", h1, [
        f1,
        l("div", v1, [
          l("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: s[0] || (s[0] = (i) => t.value = !0)
          }, [
            k(c, null, {
              default: F(() => [
                m1
              ]),
              _: 1
            }),
            re(" 最新 ")
          ], 2),
          l("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: s[1] || (s[1] = (i) => t.value = !1)
          }, [
            k(c, null, {
              default: F(() => [
                _1
              ]),
              _: 1
            }),
            re(" 最热 ")
          ], 2)
        ])
      ]);
    };
  }
});
const y1 = /* @__PURE__ */ P(g1, [["__scopeId", "data-v-3e026489"]]), w1 = ee(y1), yt = (e) => (ne("data-v-59596f14"), e = e(), oe(), e), $1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, b1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), x1 = [
  b1
], C1 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, k1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), M1 = [
  k1
], z1 = /* @__PURE__ */ Y({
  name: "UDialog",
  __name: "dialog",
  props: {
    title: {},
    modelValue: { type: Boolean },
    width: {},
    center: { type: Boolean },
    top: {},
    beforeClose: {},
    closeOnClickModal: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(!1);
    return pe(
      () => n.modelValue,
      (s) => {
        t.value = s;
      },
      {
        immediate: !0
      }
    ), pe(
      () => t.value,
      (s) => {
        o("update:modelValue", s);
      }
    ), (s, c) => (p(), Z(g(Ht), {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (i) => t.value = i),
      "close-on-click-modal": s.closeOnClickModal,
      title: s.title,
      width: s.width,
      top: s.top,
      fullscreen: a.value,
      center: s.center,
      "before-close": s.beforeClose,
      draggable: ""
    }, St({
      default: F(() => [
        l("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (i) => a.value = !a.value)
        }, [
          a.value ? (p(), x("svg", $1, x1)) : (p(), x("svg", C1, M1))
        ]),
        ue(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      s.$slots.footer ? {
        name: "footer",
        fn: F(() => [
          ue(s.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const S1 = /* @__PURE__ */ P(z1, [["__scopeId", "data-v-59596f14"]]), L1 = ee(S1), F1 = { class: "field" }, T1 = /* @__PURE__ */ Y({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const o = e;
    Ee((t) => ({
      d59c4402: o.borderStyle
    }));
    const n = L();
    return pe(
      () => o.position,
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
    ), (t, a) => (p(), x("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      l("fieldset", F1, [
        t.$slots.default || t.vertical ? (p(), x("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          ue(t.$slots, "default", {}, void 0, !0)
        ], 2)) : R("", !0)
      ])
    ], 2));
  }
});
const I1 = /* @__PURE__ */ P(T1, [["__scopeId", "data-v-153d9bc7"]]), H1 = ee(I1), V1 = [
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
], A1 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function B1(e) {
  return V1.find((o) => o.type === e);
}
function E1() {
  return A1;
}
const D1 = {
  key: 1,
  "aria-hidden": "true"
}, j1 = ["xlink:href"], O1 = /* @__PURE__ */ Y({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const o = e, n = K(() => "#" + o.name), t = K(() => ({
      fontSize: jt(o.size) ? o.size + "px" : o.size,
      color: o.color
    }));
    return (a, s) => (p(), x("i", {
      class: "u-icon",
      style: Se(t.value)
    }, [
      a.$slots.default ? ue(a.$slots, "default", { key: 0 }, void 0, !0) : (p(), x("svg", D1, [
        l("use", { "xlink:href": n.value }, null, 8, j1)
      ]))
    ], 4));
  }
});
const U1 = /* @__PURE__ */ P(O1, [["__scopeId", "data-v-dd34e834"]]), xe = ee(U1), R1 = { class: "v-toast" }, Y1 = { class: "inner" }, N1 = { class: "message" }, P1 = /* @__PURE__ */ Y({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const o = e;
    Ee((a) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = ae(E1().options), t = L(!1);
    return pe(
      () => o.type,
      (a) => {
        const s = B1(a);
        s && (n.color = s.options.color, n.bgColor = s.options.bgColor, n.icon = s.options.icon);
      },
      { immediate: !0 }
    ), ge(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, o.duration);
    }), (a, s) => (p(), x("div", R1, [
      k(qe, { name: "v-toast" }, {
        default: F(() => [
          fe(l("div", Y1, [
            l("div", N1, [
              n.icon ? (p(), Z(g(xe), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : R("", !0),
              l("span", {
                class: J({ normal: a.type != "normal" })
              }, N(a.message), 3)
            ])
          ], 512), [
            [Le, t.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
});
const q1 = /* @__PURE__ */ P(P1, [["__scopeId", "data-v-7d3c50e0"]]);
function tt(e) {
  let o = e.duration;
  if (!e.message)
    return;
  e.duration = o || 1e3;
  const { vnode: n, div: t } = Ot(q1, e);
  return setTimeout(() => {
    Ut(t);
  }, e.duration + 300), n;
}
const W1 = (e) => (ne("data-v-acb5bb3a"), e = e(), oe(), e), Z1 = ["placeholder", "onKeydown", "innerHTML"], K1 = ["src"], J1 = ["onClick"], G1 = /* @__PURE__ */ W1(() => /* @__PURE__ */ l("svg", {
  "data-v-48a7e3c5": "",
  "data-v-7c7c7498": "",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("rect", {
    width: "12",
    height: "12",
    rx: "2",
    fill: "#86909C"
  }),
  /* @__PURE__ */ l("path", {
    "data-v-48a7e3c5": "",
    "data-v-7c7c7498": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z",
    fill: "white"
  })
], -1)), X1 = [
  G1
], Q1 = /* @__PURE__ */ Y({
  name: "UEditor",
  __name: "editor",
  props: {
    placeholder: {},
    modelValue: {},
    minHeight: { default: 30 },
    imgList: {}
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e;
    Ee((_) => ({
      "75534f80": r.value,
      "3da353f8": f.value
    }));
    const a = L(), s = L(), c = L(), i = L(!1), v = L(!1), h = L(), { imgList: u } = We(t), r = K(() => t.minHeight + "px"), f = K(() => t.minHeight == 30 ? "4px 10px" : "8px 12px");
    pe(
      () => t.modelValue,
      (_) => {
        i.value || (c.value = _);
      }
    );
    function d(_) {
      n("focus", _), i.value = !0, v.value = !0;
    }
    function m(_) {
      var z, T;
      a.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0), n("blur", _), (T = s.value) != null && T.innerHTML || (v.value = !1), i.value = !1;
    }
    function y(_) {
      const { innerHTML: z } = _.target;
      n("update:modelValue", z), n("input", _);
    }
    function A(_) {
      var T, O;
      let z = window.getSelection();
      if (z) {
        z.removeAllRanges(), a.value || ((T = s.value) == null || T.focus(), a.value = z.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(_)), a.value.collapse(!1), z.addRange(a.value), n("update:modelValue", ((O = s.value) == null ? void 0 : O.innerHTML) || "");
        const D = s.value;
        n("input", D);
      }
    }
    function b() {
      s.value && (s.value.innerHTML = "", n("update:modelValue", s.value.innerHTML), v.value = !1);
    }
    function j() {
      $e(() => {
        var _;
        (_ = s.value) == null || _.focus();
      });
    }
    const H = (_) => {
      _.ctrlKey && _.key == "Enter" && (_e(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? tt({ message: "内容不能为空", type: "info" }) : n("submit"));
    }, M = (_) => {
      var z;
      (z = u == null ? void 0 : u.value) == null || z.splice(_, 1);
    };
    return ge(() => {
    }), o({
      addText: A,
      clear: b,
      focus: j,
      imageRef: h
    }), (_, z) => (p(), x("div", {
      class: J(["u-editor", { active: v.value }])
    }, [
      l("div", {
        ref_key: "editorRef",
        ref: s,
        class: "rich-input",
        contenteditable: "true",
        placeholder: _.placeholder,
        onFocus: d,
        onInput: y,
        onBlur: m,
        onKeydown: Ze(H, ["enter"]),
        innerHTML: c.value
      }, null, 40, Z1),
      l("div", {
        ref_key: "imageRef",
        ref: h,
        class: "image-preview-box"
      }, [
        (p(!0), x(te, null, ie(g(u), (T, O) => (p(), x("div", {
          key: O,
          class: "image-preview"
        }, [
          l("img", {
            src: T,
            alt: ""
          }, null, 8, K1),
          l("div", {
            class: "clean-btn",
            onClick: (D) => M(O)
          }, X1, 8, J1)
        ]))), 128))
      ], 512)
    ], 2));
  }
});
const en = /* @__PURE__ */ P(Q1, [["__scopeId", "data-v-acb5bb3a"]]), wt = ee(en);
const tn = { class: "u-fold" }, nn = { class: "action-box select-none" }, on = /* @__PURE__ */ Y({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const o = e;
    Ee((i) => ({
      "2a7aa7a8": n.value
    }));
    const n = K(() => {
      let i = Math.trunc(Number(o.line));
      return i > 0 ? i : 1;
    }), t = L(!0), a = L(!1), s = L();
    let c;
    return ge(() => {
      c = new ResizeObserver((i) => {
        t.value && s.value && (a.value = s.value.offsetHeight < s.value.scrollHeight);
      }), c.observe(s.value);
    }), Ae(() => {
      c.disconnect();
    }), (i, v) => (p(), x("div", tn, [
      l("div", {
        class: J(["txt-box", { "over-hidden": t.value }])
      }, [
        l("div", {
          ref_key: "divBox",
          ref: s
        }, [
          ue(i.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      l("div", nn, [
        a.value && i.unfold ? (p(), x("div", {
          key: 0,
          class: "expand-btn",
          onClick: v[0] || (v[0] = (h) => t.value = !t.value)
        }, N(t.value ? "展开" : "收起"), 1)) : R("", !0)
      ])
    ]));
  }
});
const sn = /* @__PURE__ */ P(on, [["__scopeId", "data-v-1694aa13"]]), $t = ee(sn), an = /* @__PURE__ */ Y({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = ae({
      type: "",
      email: "",
      password: ""
    }), s = (m, y, A) => {
      const b = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!y)
        return A("请输入邮箱!");
      b.test(y) || A("邮箱地址不合法"), A();
    }, c = (m, y, A) => {
      y ? y != a.password ? A("输入密码不一致") : A() : A("请确认密码");
    }, i = L(), v = L(), h = ae({
      email: {
        required: !0,
        validator: s,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), u = ae({
      email: {
        required: !0,
        validator: s,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      },
      checkPass: {
        required: !0,
        validator: c,
        trigger: "blur"
      }
    }), r = ae({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    pe(
      () => t.modelValue,
      (m) => {
        switch ($e(() => d()), m) {
          case "login":
            v.value = h, r.type = "登录", r.one = { key: "register", value: "邮箱注册" }, r.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            v.value = h, r.type = "注册", r.one = { key: "login", value: "邮箱登录" }, r.two = { key: "", value: "" };
            break;
          case "forget":
            v.value = u, r.type = "修改密码", r.one = { key: "login", value: "邮箱登录" }, r.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function f() {
      a.type = t.modelValue, i.value.validate((m) => {
        m && n("submit", a);
      });
    }
    function d() {
      i.value.resetFields();
    }
    return o({
      reset: d
    }), (m, y) => {
      const A = le("el-button");
      return p(), Z(g(Vt), {
        ref_key: "ruleFormRef",
        ref: i,
        model: a,
        rules: v.value,
        class: "select-none"
      }, {
        default: F(() => [
          k(g(Me), { prop: "email" }, {
            default: F(() => [
              k(g(Ve), {
                modelValue: a.email,
                "onUpdate:modelValue": y[0] || (y[0] = (b) => a.email = b),
                placeholder: "请输入邮箱",
                onFocus: y[1] || (y[1] = (b) => m.$emit("toggle", 1)),
                onBlur: y[2] || (y[2] = (b) => m.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          k(g(Me), { prop: "password" }, {
            default: F(() => [
              k(g(Ve), {
                modelValue: a.password,
                "onUpdate:modelValue": y[3] || (y[3] = (b) => a.password = b),
                placeholder: "请输入密码",
                onFocus: y[4] || (y[4] = (b) => m.$emit("toggle", 2)),
                onBlur: y[5] || (y[5] = (b) => m.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          fe(k(g(Me), { prop: "checkPass" }, {
            default: F(() => [
              k(g(Ve), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": y[6] || (y[6] = (b) => a.checkPass = b),
                placeholder: "请确认密码",
                onFocus: y[7] || (y[7] = (b) => m.$emit("toggle", 2)),
                onBlur: y[8] || (y[8] = (b) => m.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Le, m.modelValue == "forget"]
          ]),
          k(g(Me), null, {
            default: F(() => [
              k(A, {
                style: { width: "100%" },
                type: "primary",
                onClick: f
              }, {
                default: F(() => [
                  re(N(r.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          k(g(Me), null, {
            default: F(() => [
              l("div", {
                onClick: y[9] || (y[9] = (b) => m.$emit("update:modelValue", r.one.key))
              }, N(r.one.value), 1),
              l("div", {
                onClick: y[10] || (y[10] = (b) => m.$emit("update:modelValue", r.two.key))
              }, N(r.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const ln = /* @__PURE__ */ P(an, [["__scopeId", "data-v-525985f8"]]), rn = { class: "u-sign" }, cn = { class: "sign-oauth" }, un = /* @__PURE__ */ Y({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = L(!1), t = L("login"), a = L(0), s = K(() => {
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
    return (c, i) => {
      const v = le("u-divider"), h = le("u-icon"), u = le("u-dialog");
      return p(), x("div", rn, [
        k(g(Be), {
          link: "",
          onClick: i[0] || (i[0] = (r) => n.value = !0)
        }, {
          default: F(() => [
            re("登录/注册")
          ]),
          _: 1
        }),
        k(u, {
          modelValue: n.value,
          "onUpdate:modelValue": i[4] || (i[4] = (r) => n.value = r),
          title: s.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: F(() => [
            k(ln, {
              modelValue: t.value,
              "onUpdate:modelValue": i[1] || (i[1] = (r) => t.value = r),
              onToggle: i[2] || (i[2] = (r) => a.value = r),
              onSubmit: i[3] || (i[3] = (r) => c.$emit("submit", r))
            }, null, 8, ["modelValue"]),
            k(v, null, {
              default: F(() => [
                re("其他方式登录")
              ]),
              _: 1
            }),
            l("div", cn, [
              k(h, { name: "QQ" }),
              k(h, { name: "weixin" }),
              k(h, { name: "gitee" }),
              k(h, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const dn = /* @__PURE__ */ P(un, [["__scopeId", "data-v-8e737450"]]), pn = ee(dn), hn = (e) => (ne("data-v-3a07e116"), e = e(), oe(), e), fn = { class: "custom-contextmenu__menu" }, vn = ["onClick"], mn = /* @__PURE__ */ hn(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), _n = /* @__PURE__ */ Y({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = ae({
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
    }), a = (h) => {
      t.tag = h, t.dropdownList[1].show = !h.meta.isAffix, s(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, s = () => {
      t.isShow = !1;
    };
    ge(() => {
      window.addEventListener("click", s);
    }), Ae(() => {
      window.removeEventListener("click", s);
    });
    const { isShow: c, dropdownList: i, tag: v } = We(t);
    return o({
      openContextmenu: a
    }), (h, u) => {
      const r = le("u-icon");
      return p(), Z(qe, { name: "el-zoom-in-center" }, {
        default: F(() => [
          fe(l("div", {
            style: Se(`top: ${h.dropdown.y + 5}px; left: ${h.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            l("ul", fn, [
              (p(!0), x(te, null, ie(g(i), (f, d) => (p(), x(te, { key: d }, [
                f.show ? (p(), x("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (m) => h.$emit("submit", d, g(v))
                }, [
                  k(r, {
                    innerHTML: f.icon
                  }, null, 8, ["innerHTML"]),
                  l("span", null, N(f.title), 1)
                ], 8, vn)) : R("", !0)
              ], 64))), 128))
            ]),
            mn
          ], 4), [
            [Le, g(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const gn = /* @__PURE__ */ P(_n, [["__scopeId", "data-v-3a07e116"]]), yn = (e) => (ne("data-v-f7d57bb4"), e = e(), oe(), e), wn = { class: "u-tabs" }, $n = ["onClick", "onContextmenu"], bn = { class: "select-none" }, xn = /* @__PURE__ */ yn(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Cn = /* @__PURE__ */ Y({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: o }) {
    const n = e, t = L(), a = L(), s = it(n, "modelValue"), c = L(0), i = ae({
      x: 0,
      y: 0
    });
    pe(
      () => [...s.value],
      (f, d) => {
        if (d) {
          if (console.log(f, d), f.length > d.length) {
            let m = f.find((y) => !(d != null && d.includes(y)));
            s.value.forEach((y, A, b) => {
              b.findIndex((j) => j.path == y.path) != A && b.splice(A, 1);
            }), c.value = s.value.findIndex((y) => y.path == (m == null ? void 0 : m.path));
          }
        } else {
          let m = 1;
          s.value.forEach((y, A, b) => {
            b.findIndex((j) => j.path == y.path) != A && (b.splice(A, 1), c.value = b.findIndex((j) => j.path == y.path), m = 0);
          }), m && (c.value = s.value.length - 1);
        }
        $e(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), pe(
      () => c.value,
      (f) => {
        o(
          "select",
          s.value.find((d, m) => m == f)
        );
      }
    );
    const v = (f) => {
      s.value.map((d, m) => {
        if (!d.meta.isAffix && f == m)
          if (s.value.splice(m, 1), m == c.value) {
            let A = [m, m - 1].filter((b) => b >= 0 && b < s.value.length);
            c.value = A[0], c.value == m && o(
              "select",
              s.value.find((b, j) => j == f)
            );
          } else
            f < c.value && (c.value -= 1);
      });
    }, h = (f) => {
      let d = s.value.filter((y) => y.meta.isAffix);
      f && !f.meta.isAffix && d.push(f), s.value.length = 0, s.value.push(...d);
      let m = s.value.length - 1;
      c.value = m >= 0 ? m : 0;
    }, u = (f, d) => {
      switch (f) {
        case 0:
          o("refresh", d);
          break;
        case 1:
          let m = s.value.findIndex((y) => y.path == d.path);
          v(m), o("close", d);
          break;
        case 2:
          h(d), o("closeOther", d);
          break;
        case 3:
          h(), o("closeAll");
          break;
        case 4:
          o("fullScreen", d);
          break;
      }
    }, r = (f, d) => {
      const { clientX: m, clientY: y } = d;
      i.x = m, i.y = y, a.value.openContextmenu(f);
    };
    return (f, d) => {
      const m = le("u-icon");
      return p(), x("div", wn, [
        k(g(Ke), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: F(() => [
            l("ul", {
              class: J([{ "classic-style": f.classic }, "u-tabs-ul"])
            }, [
              (p(!0), x(te, null, ie(f.modelValue, (y, A) => (p(), x("li", {
                key: A,
                class: J([{ "is-active": c.value == A }, "u-tabs-ul-li"]),
                onClick: (b) => c.value = A,
                onContextmenu: st((b) => r(y, b), ["prevent"])
              }, [
                l("span", bn, N(y.meta.title), 1),
                y.meta.isAffix ? R("", !0) : (p(), Z(m, {
                  key: 0,
                  onClick: st((b) => u(1, y), ["stop"])
                }, {
                  default: F(() => [
                    xn
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, $n))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        k(gn, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: i,
          onSubmit: u
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const kn = /* @__PURE__ */ P(Cn, [["__scopeId", "data-v-f7d57bb4"]]), Mn = ee(kn), zn = { key: 0 }, Sn = /* @__PURE__ */ Y({
  name: "UNoticeBar",
  __name: "notice-bar",
  props: {
    data: {},
    size: { default: 14 },
    vertical: { type: Boolean },
    height: { default: 40 },
    delay: { default: 1e3 },
    spped: { default: 100 },
    suffixIcon: {},
    prefixIcon: {},
    color: { default: "--color-warning" },
    background: { default: "var(--color-warning-light-9)" }
  },
  setup(e) {
    const o = e, n = ae({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), s = K(() => o.delay > 2e3 ? o.delay : 2e3), c = () => {
      $e(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), i(), setTimeout(() => {
          v();
        }, o.delay);
      });
    }, i = () => {
      n.oneTime = n.textWidth / o.spped, n.twoTime = (n.textWidth + n.boxWidth) / o.spped;
    }, v = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, h = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          v();
        },
        !1
      );
    };
    return ge(() => {
      o.vertical || (c(), h());
    }), (u, r) => {
      const f = le("el-carousel-item"), d = le("u-icon");
      return p(), x("div", {
        class: "u-notice-bar",
        style: Se({ background: u.background, height: `${u.height}px` })
      }, [
        u.vertical ? (p(), x("div", zn, [
          k(g(At), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: s.value
          }, {
            default: F(() => [
              (p(!0), x(te, null, ie(u.data, (m) => (p(), Z(f, { key: m }, {
                default: F(() => [
                  re(N(m), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (p(), x("div", {
          key: 1,
          style: Se({ color: u.color, fontSize: `${u.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          u.prefixIcon ? (p(), Z(d, {
            key: 0,
            name: u.prefixIcon
          }, null, 8, ["name"])) : R("", !0),
          l("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            l("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, N(u.data), 513)
          ], 512),
          u.suffixIcon ? (p(), Z(d, {
            key: 1,
            name: u.suffixIcon
          }, null, 8, ["name"])) : R("", !0)
        ], 4))
      ], 4);
    };
  }
});
const Ln = /* @__PURE__ */ P(Sn, [["__scopeId", "data-v-723bc558"]]), Fn = ee(Ln), Tn = (e) => (ne("data-v-11b4e56c"), e = e(), oe(), e), In = { class: "u-anchor" }, Hn = { class: "toc-content" }, Vn = /* @__PURE__ */ Tn(() => /* @__PURE__ */ l("h3", { class: "toc-content-heading" }, "目录", -1)), An = { class: "toc-items" }, Bn = ["onClick"], En = /* @__PURE__ */ Y({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const o = e, n = L(0), t = L({}), a = L({}), s = (h) => {
      switch (h) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, c = () => {
      const h = [];
      t.value.forEach((f) => {
        h.push(f.offsetTop);
      });
      const r = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      h.forEach((f, d) => {
        r >= f - 10 - o.targetOffset && (n.value = d);
      });
    }, i = (h) => {
      const u = t.value.item(h);
      console.log(u), o.scroll ? a.value.scrollTo({
        top: u.offsetTop - o.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: u.offsetTop - o.targetOffset,
        behavior: "smooth"
      });
    };
    ge(() => {
    }), Ae(() => {
      a.value.removeEventListener("scroll", c);
    });
    let v;
    return ge(() => {
      let h = document.querySelector(o.container);
      v = new ResizeObserver((u) => {
        o.scroll ? a.value = document.querySelector(o.scroll) : a.value = window, t.value = h.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), v.observe(h);
    }), Ae(() => {
      a.value.removeEventListener("scroll", c), v.disconnect();
    }), (h, u) => {
      const r = le("u-divider");
      return p(), x("div", In, [
        l("nav", Hn, [
          Vn,
          k(r),
          l("ul", An, [
            (p(!0), x(te, null, ie(t.value, (f, d) => (p(), x("li", {
              key: d,
              class: J([{ active: n.value == d }, s(f.nodeName)]),
              onClick: (m) => i(d)
            }, N(f.innerText), 11, Bn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Dn = /* @__PURE__ */ P(En, [["__scopeId", "data-v-11b4e56c"]]), jn = ee(Dn), Fe = (e) => (ne("data-v-c739035a"), e = e(), oe(), e), On = { class: "card-box u-scrollbar" }, Un = {
  key: 0,
  class: "history"
}, Rn = { class: "header" }, Yn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("div", { class: "title" }, "历史搜索", -1)), Nn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), Pn = {
  key: 1,
  class: "trending"
}, qn = { class: "title" }, Wn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("span", null, "热搜", -1)), Zn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("svg", {
  "data-v-5fe91717": "",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", {
    "data-v-5fe91717": "",
    d: "M12.8 5.2C13.9532 6.46 14.8 8.2 14.8 10C14.7039 12.8937 12.6843 15.1706 9.97973 15.8159C10.359 12.3442 7.77588 9.35406 7.77588 9.35406C7.77588 9.35406 7.99512 13.7064 6.79514 15.8104C4.03715 15.1428 2 12.7806 2 9.8C2 7.776 2.9336 5.9728 4.4 4.8C5.8608 3.7056 6.8 1.9656 6.8 0C9.684 0.4368 11.894 2.9264 11.894 5.932C11.894 6.5012 11.746 7.0652 11.6 7.6C12.1264 6.9024 12.6184 6.0876 12.8 5.2Z",
    fill: "#F53F3F"
  })
], -1)), Kn = { class: "hot-list" }, Jn = ["onClick"], Gn = { class: "trending-text u-ellipsis" }, Xn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("div", { class: "trending-mark" }, null, -1)), Qn = /* @__PURE__ */ Y({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: o }) {
    const n = e, t = K(() => !(_e(n.data.historySearchList) && _e(n.data.hotSearchList)));
    return (a, s) => {
      const c = le("u-icon");
      return fe((p(), x("div", On, [
        a.data.historySearchList.length != 0 ? (p(), x("div", Un, [
          l("div", Rn, [
            Yn,
            k(g(ct), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: s[0] || (s[0] = (i) => a.$emit("onClear"))
            }, {
              default: F(() => [
                k(c, null, {
                  default: F(() => [
                    Nn
                  ]),
                  _: 1
                }),
                re(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (p(!0), x(te, null, ie(a.data.historySearchList, (i, v) => (p(), Z(g(Bt), {
            key: v,
            type: i.type,
            closable: "",
            onClose: (h) => a.$emit("onClose", i.name),
            onClick: (h) => a.$emit("submit", i.name)
          }, {
            default: F(() => [
              re(N(i.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : R("", !0),
        g(_e)(a.data.hotSearchList) ? R("", !0) : (p(), x("div", Pn, [
          l("div", qn, [
            Wn,
            k(c, { style: { margin: "0 6px" } }, {
              default: F(() => [
                Zn
              ]),
              _: 1
            })
          ]),
          l("div", Kn, [
            (p(!0), x(te, null, ie(a.data.hotSearchList, (i, v) => (p(), x("div", {
              key: v,
              class: "hot-item",
              onClick: (h) => a.$emit("submit", i)
            }, [
              l("div", {
                class: J(["trending-rank", { "trending-rank-top": v < 3 }])
              }, N(v + 1), 3),
              l("div", Gn, N(i), 1),
              Xn
            ], 8, Jn))), 128))
          ])
        ]))
      ], 512)), [
        [Le, a.data.visible && t.value]
      ]);
    };
  }
});
const e2 = /* @__PURE__ */ P(Qn, [["__scopeId", "data-v-c739035a"]]), nt = (e) => (ne("data-v-df2be5d9"), e = e(), oe(), e), t2 = { class: "u-search" }, n2 = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, o2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7187"
}, [
  /* @__PURE__ */ l("path", {
    d: "M344.16 960c-58.976-124.256-27.552-195.456 17.76-262.528 49.632-73.472 62.432-146.176 62.432-146.176s39.008 51.36 23.424 131.68c68.928-77.696 81.888-201.472 71.52-248.896 155.776 110.272 222.336 348.992 132.64 525.92C1129.024 686.528 770.56 277.376 708.16 231.264c20.8 46.08 24.736 124.128-17.28 161.984C619.744 120 443.84 64 443.84 64c20.8 140.928-75.392 295.008-168.16 410.144-3.264-56.192-6.72-94.976-35.872-148.736-6.56 102.08-83.552 185.28-104.416 287.552-28.256 138.496 21.152 239.904 208.832 347.008L344.16 960zM344.16 960",
    "p-id": "7188",
    fill: "#F53F3F"
  })
], -1)), s2 = ["data-before", "data-after"], a2 = ["placeholder"], l2 = { class: "btn" }, i2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-78e17ca8": ""
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }),
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  })
], -1)), r2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ l("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), c2 = /* @__PURE__ */ Y({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = L({}), s = it(t.config, "keywords"), c = L(!1), i = L(0), v = L(!0), h = L(), u = ae({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), r = ae({
      search: t.config.search || "",
      visible: !1,
      historySearchList: He.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    pe(
      () => t.config.hotSearchList,
      (M) => {
        r.hotSearchList = M;
      }
    ), pe(
      () => t.config.search,
      (M) => {
        r.search = M || "";
      }
    );
    const f = K(() => {
      let M = s.value[i.value];
      return c.value || r.search ? "" : M;
    }), d = K(() => {
      let M = typeof s.value[i.value + 1] > "u" ? s.value[0] : s.value[i.value + 1];
      return c.value || r.search ? "" : M;
    }), m = K(() => {
      let M = s.value[i.value];
      return c.value ? M : "";
    }), y = K(() => !c.value && !r.search && v.value), A = (M) => {
      if (M != null && M.trim() != "") {
        let _ = (T, O) => Math.round(Math.random() * (O - T)) + T, z = (T) => r.historySearchList.filter((O) => O.name == T).length != 0;
        if (M && r.historySearchList)
          z(M) || r.historySearchList.unshift({ name: M, type: u.types[_(0, 3)] });
        else {
          let T = c.value ? m : f;
          M = T.value, z(T.value) || r.historySearchList.unshift({ name: T.value, type: u.types[_(0, 3)] });
        }
        He.set("searchHistory", r.historySearchList);
      }
      r.search = M, a.value.focus(), n("submit", M);
    }, b = (M) => {
      r.historySearchList.findIndex((_) => _.name == M), r.historySearchList.splice(
        r.historySearchList.findIndex((_) => _.name == M),
        1
      ), He.set("searchHistory", r.historySearchList);
    }, j = () => {
      r.historySearchList.length = 0, He.remove("searchHistory");
    }, H = (M) => {
      if (M.pseudoElement == "::after") {
        v.value = !1;
        let _ = typeof s.value[i.value + 1] > "u" ? 0 : i.value + 1;
        i.value = _, setTimeout(() => {
          v.value = !0;
        }, 3e3);
      }
    };
    return o({
      close: () => r.visible = !1
    }), (M, _) => {
      const z = le("u-icon");
      return p(), x("div", t2, [
        l("div", {
          class: J(["search", { active: c.value }])
        }, [
          l("div", n2, [
            k(z, null, {
              default: F(() => [
                o2
              ]),
              _: 1
            })
          ]),
          l("label", {
            ref_key: "labelRef",
            ref: h,
            "data-before": f.value,
            "data-after": d.value,
            class: J({ animate: y.value }),
            onAnimationend: H
          }, [
            fe(l("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": _[0] || (_[0] = (T) => r.search = T),
              type: "text",
              placeholder: m.value,
              onFocus: _[1] || (_[1] = () => {
                c.value = !0, r.visible = !0;
              }),
              onBlur: _[2] || (_[2] = (T) => c.value = !1),
              onKeyup: _[3] || (_[3] = Ze((T) => A(r.search), ["enter"]))
            }, null, 40, a2), [
              [Lt, r.search]
            ])
          ], 42, s2),
          l("div", l2, [
            fe(k(z, {
              class: "close",
              onClick: _[4] || (_[4] = (T) => r.search = "")
            }, {
              default: F(() => [
                i2
              ]),
              _: 1
            }, 512), [
              [Le, r.search]
            ]),
            l("div", {
              class: "search-btn",
              onClick: _[5] || (_[5] = (T) => A(r.search))
            }, [
              k(z, null, {
                default: F(() => [
                  r2
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        fe(k(e2, {
          data: r,
          onOnClose: b,
          onOnClear: j,
          onSubmit: A
        }, null, 8, ["data"]), [
          [g(rt), () => r.visible = !1, h.value]
        ])
      ]);
    };
  }
});
const u2 = /* @__PURE__ */ P(c2, [["__scopeId", "data-v-df2be5d9"]]), d2 = ee(u2), bt = (e, o) => {
  const n = /\[.+?\]/g;
  return o = o.replace(n, (t) => {
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
  }), o;
}, p2 = (e) => {
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
}, ts = (e, o, n) => {
  let t = (e - 1) * o;
  return t + o >= n.length ? n.slice(t, n.length) : n.slice(t, t + o);
}, xt = (e) => (ne("data-v-f75472b5"), e = e(), oe(), e), h2 = { class: "message" }, f2 = { class: "chat-list" }, v2 = /* @__PURE__ */ xt(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), m2 = { class: "content" }, _2 = {
  key: 0,
  class: "username"
}, g2 = ["innerHTML"], y2 = /* @__PURE__ */ xt(() => /* @__PURE__ */ l("div", { class: "date" }, null, -1)), w2 = /* @__PURE__ */ Y({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: o }) {
    const { allEmoji: n } = ce(Te), t = L();
    return o({
      scroll: () => {
        $e(() => {
          const s = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(s.offsetTop);
        });
      }
    }), (s, c) => (p(), x("div", h2, [
      k(g(Ke), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: F(() => [
          l("div", f2, [
            (p(!0), x(te, null, ie(s.data, (i, v) => (p(), x("div", {
              key: v,
              class: J([{ self: s.userId == i.id }, "chat-item"])
            }, [
              l("div", null, [
                k(g(Je), null, {
                  default: F(() => [
                    v2
                  ]),
                  _: 1
                })
              ]),
              l("div", m2, [
                s.userId != i.id ? (p(), x("div", _2, N(i.username), 1)) : R("", !0),
                l("div", {
                  class: "card-box",
                  innerHTML: g(bt)(g(n), i.content)
                }, null, 8, g2)
              ]),
              y2
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const $2 = /* @__PURE__ */ P(w2, [["__scopeId", "data-v-f75472b5"]]), Oe = (e) => (ne("data-v-18726a6b"), e = e(), oe(), e), b2 = { class: "u-chat" }, x2 = { class: "header" }, C2 = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1318 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    d: "M1318.502489 432.779052c0-231.790522-209.29842-419.704826-467.458992-419.704826s-467.56979 188.357498-467.56979 419.704826 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319412-19.168145L1165.822116 742.350141C1259.336074 665.56676 1318.502489 555.433023 1318.502489 432.779052z",
    fill: "#612273",
    "p-id": "10993"
  }),
  /* @__PURE__ */ l("path", {
    d: "M1034.304263 745.784895a509.673231 509.673231 0 0 1-183.482363 33.239559c-244.532352 0-445.077689-168.524562-465.353819-383.25211-1.107985 12.07704-1.883575 24.264878-1.883575 36.563514 0 231.790522 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319411-19.168145 25.262064 25.262064 0 0 0-7.5343-17.284571zM1165.822116 669.223112l2.769964 70.689461C1260.44406 663.239991 1318.502489 553.992642 1318.502489 432.779052a366.632331 366.632331 0 0 0-1.883575-36.785111 403.971435 403.971435 0 0 1-150.796798 273.229171z",
    fill: "#612273",
    opacity: ".2",
    "p-id": "10994"
  }),
  /* @__PURE__ */ l("path", {
    d: "M383.25211 432.779052a383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978C173.510496 258.160571 0 413.943302 0 606.178749c0 101.713049 48.97295 193.011037 126.421121 256.609392l-5.761524 148.470028a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696c-177.831638-59.388011-304.91755-212.733175-304.91755-393.113179z",
    fill: "#EB3D72",
    "p-id": "10995"
  }),
  /* @__PURE__ */ l("path", {
    d: "M342.256654 391.672798c0 117.557239 53.958883 223.59143 140.714132 299.71002a391.008007 391.008007 0 0 1-99.718676-258.603766 383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978-7.091106 0-14.071413 0-21.05172 0.553993a375.939407 375.939407 0 0 0-24.375677 132.958234zM630.111231 802.181346a407.627786 407.627786 0 0 1-283.533434 110.798528 424.136767 424.136767 0 0 1-152.12638-27.699632l-71.686647 71.686648-2.105173 54.291279a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696 486.294741 486.294741 0 0 1-58.058429-23.710885zM85.425665 821.792686l-5.761523-4.985934c1.883575 2.215971 3.656351 4.431941 5.650725 6.647911z",
    fill: "#EB3D72",
    opacity: ".5",
    "p-id": "10996"
  }),
  /* @__PURE__ */ l("path", {
    d: "M833.426531 332.395585c64.263147-10.193465 64.041549-66.479117 62.601169-75.342999s-15.400995-54.291279-59.942004-47.200173S799.078987 254.836615 799.078987 254.836615a28.475222 28.475222 0 1 0 56.174854-8.97468s6.315516 3.323956 8.30989 20.27613-11.966241 29.029214-35.455529 33.239559-88.638823-19.943735-104.039819-115.452067C709.110582 96.39472 781.57282 28.253625 838.966457 13.185025a55.399264 55.399264 0 0 0-64.041549-5.318329c-56.064055 35.123134-97.170309 109.579745-85.536464 182.817571 14.957801 93.846354 79.664142 151.904783 144.038087 141.711318zM203.980091 573.825579a53.072495 53.072495 0 0 0 33.90435-67.919498c-2.659165-6.537113-21.162519-38.225492-53.51569-25.040467a30.026401 30.026401 0 0 0-19.832936 40.773858 22.159706 22.159706 0 1 0 40.773858-16.619779s5.318329 1.329582 9.861069 13.739017-3.988747 24.043281-21.05172 31.023588-70.02467 0.553993-98.832288-68.695087C68.916685 417.599654 110.798528 353.558104 151.904783 332.395585a42.879031 42.879031 0 0 0-48.97295 7.423502 146.918849 146.918849 0 0 0-32.574767 152.458775c27.810431 68.141095 86.866046 100.605064 133.623025 81.547717z",
    fill: "#FED150",
    "p-id": "10997"
  })
], -1)), k2 = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ l("div", null, "聊天室"),
  /* @__PURE__ */ l("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), M2 = {
  id: "chat-footer",
  class: "footer"
}, z2 = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7186"
}, [
  /* @__PURE__ */ l("path", {
    d: "M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448c247.008 0 448 200.96 448 448S757.984 960 510.944 960zM510.944 128c-211.744 0-384 172.256-384 384 0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C894.944 300.256 722.688 128 510.944 128zM512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48l0-64c0-26.528 21.472-48 48-48s48 21.472 48 48l0 64C416 493.696 394.496 515.2 368 515.2zM656 515.2c-26.496 0-48-21.472-48-48l0-64c0-26.528 21.504-48 48-48s48 21.472 48 48l0 64C704 493.696 682.496 515.2 656 515.2z",
    "p-id": "7187"
  })
], -1)), S2 = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ l("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), L2 = /* @__PURE__ */ Y({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(""), s = L(), c = (u) => {
      const { ctrlKey: r, key: f } = u;
      r && f == "Enter" && v();
    }, i = () => {
      a.value = "", s.value.scroll();
    }, v = () => {
      let u = a.value;
      u.trim() ? (u = u.replace(/\n/g, "<br/>"), o("submit", { clear: i, content: u })) : tt({ type: "error", message: "内容不能为空" });
    }, h = (u) => {
      let r = document.getElementById("emojiInput"), f = r.selectionStart, d = r.selectionEnd, m = r.value;
      if (f === null || d === null)
        return;
      let y = m.substring(0, f) + u + m.substring(d);
      r.value = y, r.focus(), r.selectionStart = f + u.length, r.selectionEnd = f + u.length, a.value = y;
    };
    return ye(Te, n.emoji), (u, r) => {
      const f = le("u-icon"), d = le("u-emoji");
      return p(), x("div", b2, [
        l("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          l("div", x2, [
            k(f, { size: "32" }, {
              default: F(() => [
                C2
              ]),
              _: 1
            }),
            k2
          ]),
          k($2, {
            ref_key: "messageRef",
            ref: s,
            data: u.data,
            "user-id": u.userId
          }, null, 8, ["data", "user-id"]),
          l("div", M2, [
            k(g(Ve), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": r[0] || (r[0] = (m) => a.value = m),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: Ze(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            k(d, {
              style: { margin: "0 8px 0" },
              emoji: u.emoji,
              placement: "top-end",
              onAddEmoji: h
            }, {
              default: F(() => [
                z2
              ]),
              _: 1
            }, 8, ["emoji"]),
            k(f, {
              size: "18",
              class: J([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: v
            }, {
              default: F(() => [
                S2
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        k(g(Be), {
          class: "chat-btn",
          onClick: r[1] || (r[1] = (m) => t.value = !t.value)
        }, {
          default: F(() => [
            re("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const F2 = /* @__PURE__ */ P(L2, [["__scopeId", "data-v-18726a6b"]]), T2 = ee(F2), Ct = (e) => (ne("data-v-85c87038"), e = e(), oe(), e), I2 = { class: "u-emoji" }, H2 = { class: "face-tooltip-head select-none" }, V2 = ["onClick"], A2 = ["src"], B2 = { class: "emoji-body select-none" }, E2 = { style: { padding: "0 5px" } }, D2 = ["onClick"], j2 = { class: "emoji-btn select-none" }, O2 = { key: 0 }, U2 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ l("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ l("path", {
    "data-v-9fe533ba": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
  })
], -1)), R2 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ l("span", null, "表情", -1)), Y2 = [
  U2,
  R2
], N2 = /* @__PURE__ */ Y({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: o }) {
    const n = e, t = L(0), a = L(0), s = L(new Array(2)), { emojiList: c, faceList: i } = n.emoji;
    function v(u) {
      switch (t.value = u, u) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, s.value[1] = c[1];
          break;
      }
    }
    function h() {
      s.value[0] = c[0];
    }
    return (u, r) => (p(), x("div", I2, [
      k(g(ut), {
        placement: u.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: h
      }, {
        reference: F(() => [
          l("div", j2, [
            u.$slots.default ? ue(u.$slots, "default", { key: 1 }, void 0, !0) : (p(), x("div", O2, Y2))
          ])
        ]),
        default: F(() => [
          l("div", H2, [
            (p(!0), x(te, null, ie(g(i), (f, d) => (p(), x("label", {
              key: d,
              class: J(t.value == d ? "active" : ""),
              onClick: (m) => v(d)
            }, [
              l("img", {
                src: f,
                alt: ""
              }, null, 8, A2)
            ], 10, V2))), 128))
          ]),
          l("div", B2, [
            l("div", {
              class: "emjio-container",
              style: Se({ transform: `translateX(${a.value}%)` })
            }, [
              (p(!0), x(te, null, ie(s.value, (f, d) => (p(), x("div", {
                key: d,
                class: "emoji-wrapper"
              }, [
                k(g(Ke), null, {
                  default: F(() => [
                    l("div", E2, [
                      (p(!0), x(te, null, ie(f, (m, y) => (p(), x("span", {
                        key: y,
                        class: "emoji-item",
                        onClick: (A) => u.$emit("addEmoji", y)
                      }, [
                        k(g(dt), {
                          src: m,
                          title: String(y),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, D2))), 128))
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
const P2 = /* @__PURE__ */ P(N2, [["__scopeId", "data-v-85c87038"]]), Te = Symbol(), kt = ee(P2), q2 = /* @__PURE__ */ Y({
  name: "UCounter",
  __name: "counter",
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
  setup(e, { emit: o }) {
    const n = e, t = ae({
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
    }), a = () => n.endAmount > n.startAmount, s = K(() => {
      const u = /(\d+)(\d{3})/;
      let r = t.currentAmount.toFixed(n.decimals);
      r += "";
      let f = r.split("."), d = f[0], m = f.length > 1 ? n.decimalSeparator + f[1] : "", y = !isNaN(parseFloat(n.separator));
      if (n.separator && !y)
        for (; u.test(d); )
          d = d.replace(u, "$1" + n.separator + "$2");
      return d + m;
    }), c = K(() => `${n.prefix}${s.value}${n.suffix}`);
    ge(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? i() : t.paused = !0;
    });
    const i = () => {
      v(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(h);
    }, v = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, h = (u) => {
      t.timestamp = u, t.startTimestamp || (t.startTimestamp = u);
      let r = u - t.startTimestamp;
      t.remaining = t.currentDuration - r, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (r / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (r / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), r < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(h) : o("finished");
    };
    return (u, r) => (p(), x("span", null, N(c.value), 1));
  }
}), W2 = ee(q2), lt = /* @__PURE__ */ Y({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const o = L({}), { showInfo: n } = ce(Qe), t = ce(je), a = () => ze("div", t.card(o.value));
    return (s, c) => g(t).card ? (p(), Z(g(ut), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => g(n)(s.uid, (i) => o.value = i))
    }, {
      reference: F(() => [
        ue(s.$slots, "default")
      ]),
      default: F(() => [
        k(a)
      ]),
      _: 3
    })) : ue(s.$slots, "default", { key: 1 });
  }
}), Ue = (e) => (ne("data-v-961bcd31"), e = e(), oe(), e), Z2 = { class: "comment-sub" }, K2 = ["href", "target"], J2 = /* @__PURE__ */ Ue(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), G2 = { class: "comment-primary" }, X2 = { class: "comment-main" }, Q2 = {
  key: 1,
  class: "user-info"
}, eo = ["href", "target"], to = { class: "username" }, no = {
  class: "name",
  style: { "max-width": "10em" }
}, oo = {
  blank: "true",
  class: "rank"
}, so = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, ao = { class: "time" }, lo = { class: "content" }, io = ["innerHTML"], ro = {
  class: "imgbox",
  style: { display: "flex" }
}, co = { class: "action-box select-none" }, uo = /* @__PURE__ */ Ue(() => /* @__PURE__ */ l("svg", {
  t: "1650360973068",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1168",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ l("path", {
    d: "M547.968 138.88c6.656-4.672 14.08-6.976 20.48-5.056 6.08 1.792 22.848 10.752 40.192 56.128 8.576 22.4 27.264 81.536-5.632 197.504a45.44 45.44 0 0 0 42.88 57.984l217.6 3.008h0.448a53.12 53.12 0 0 1 20.096 3.328 16.256 16.256 0 0 1 5.568 3.648 14.464 14.464 0 0 1 3.264 6.4c2.176 7.808 4.608 33.984-0.256 77.248-4.672 41.984-15.936 97.408-38.784 162.368-19.136 54.336-43.52 100.48-81.472 161.792a56.384 56.384 0 0 0-1.664 2.496l-0.128 0.128-1.408 2.112a7.872 7.872 0 0 1-1.28 1.472 3.84 3.84 0 0 1-1.28 0.64 20.48 20.48 0 0 1-6.848 0.96H356.032V421.44c19.712-10.624 40.704-24.576 62.592-47.616 25.472-26.88 51.008-64.768 78.208-121.6 5.568-11.584 9.856-24.384 13.632-36.032l3.072-9.856c2.688-8.448 5.184-16.384 8.064-24.32 8.064-22.4 16.128-36.032 26.368-43.136z m120.96 27.968c-20.48-53.44-48-84.736-81.984-94.912-33.6-9.984-61.952 4.16-76.032 14.08-27.584 19.264-41.28 49.6-50.048 74.048-3.392 9.344-6.464 19.2-9.216 27.968l-2.688 8.448a227.84 227.84 0 0 1-10.432 27.904c-25.28 52.928-47.36 84.544-66.752 104.96-18.944 19.968-36.48 30.464-55.168 39.808a45.376 45.376 0 0 0-25.088 40.576l-0.064 480.64c0 24.96 20.224 45.248 45.184 45.248h423.04c21.76 0 38.144-6.912 50.048-16.96a71.808 71.808 0 0 0 14.528-16.896l0.128-0.256 0.128-0.128 0.832-0.96 1.152-1.92c39.424-63.872 66.816-114.688 88.256-175.68a810.24 810.24 0 0 0 42.048-176.64c5.12-45.632 3.776-81.664-1.6-101.376a77.952 77.952 0 0 0-45.568-52.288 116.544 116.544 0 0 0-45.44-8.64l-192.768-2.688c28.096-115.072 10.048-181.568-2.496-214.336z m-604.864 247.04a45.184 45.184 0 0 1 45.12-47.296h67.008c24.96 0 45.184 20.288 45.184 45.248v480.64c0 24.96-20.224 45.12-45.184 45.12H131.84a45.184 45.184 0 0 1-45.12-43.072l-22.656-480.64z",
    "p-id": "1169"
  })
], -1)), po = /* @__PURE__ */ Ue(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ l("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), ho = { key: 2 }, fo = /* @__PURE__ */ Ue(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1320",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ l("path", {
    d: "M147.264 647.296V220.928c0-49.536 40.128-89.728 89.6-89.728H793.6c49.536 0 89.728 40.192 89.728 89.728v426.368c0 49.536-40.128 89.728-89.6 89.728h-145.216a47.04 47.04 0 0 0-28.16 9.408l-194.56 145.792a3.392 3.392 0 0 1-5.12-1.984l-26.752-116.672a47.04 47.04 0 0 0-45.824-36.544H236.992a89.728 89.728 0 0 1-89.728-89.728zM236.864 64A156.928 156.928 0 0 0 80 220.928l0.064 426.368a156.928 156.928 0 0 0 156.928 156.928h94.976l23.232 101.312 0.064 0.448a70.592 70.592 0 0 0 109.696 40.832l190.208-142.592H793.6a156.928 156.928 0 0 0 156.928-156.928l-0.064-426.368A156.928 156.928 0 0 0 793.536 64H236.928z m69.44 442.496a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z m268.8-65.344a65.344 65.344 0 1 1-130.752 0 65.344 65.344 0 0 1 130.752 0z m138.368 65.344a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z",
    "p-id": "1321"
  })
], -1)), vo = { key: 2 }, mo = /* @__PURE__ */ Y({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = ae({
      active: !1
    }), t = L(), a = L(), s = K(() => {
      let b = o.data.contentImg;
      return _e(b) ? [] : b == null ? void 0 : b.split("||");
    }), { allEmoji: c } = ce(Te), { like: i, user: v, relativeTime: h, aTarget: u } = ce(Qe);
    function r() {
      n.active = !n.active, n.active && $e(() => {
        var b;
        (b = t.value) == null || b.focus();
      });
    }
    function f(b) {
      var H;
      const j = b.target;
      (H = a.value) != null && H.contains(j) || (n.active = !1);
    }
    const d = ce(je), m = () => ze("div", d.info(o.data)), y = () => ze("div", d.operate(o.data)), A = K(() => bt(c, o.data.content));
    return (b, j) => (p(), x("div", {
      class: J(["comment", { reply: o.reply }])
    }, [
      l("div", Z2, [
        k(lt, {
          uid: g(we)(b.data.uid)
        }, {
          default: F(() => [
            l("a", {
              href: b.data.user.homeLink,
              target: g(u),
              class: "no-underline",
              style: { display: "block" }
            }, [
              k(g(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: b.data.user.avatar
              }, {
                default: F(() => [
                  J2
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, K2)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      l("div", G2, [
        l("div", X2, [
          g(d).info ? (p(), Z(m, { key: 0 })) : (p(), x("div", Q2, [
            k(lt, {
              uid: g(we)(b.data.uid)
            }, {
              default: F(() => [
                l("a", {
                  href: b.data.user.homeLink,
                  target: g(u),
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  l("div", to, [
                    l("span", no, N(b.data.user.username), 1),
                    l("span", oo, [
                      k(g(xe), {
                        size: "24",
                        innerHTML: g(p2)(b.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, eo)
              ]),
              _: 1
            }, 8, ["uid"]),
            l("span", so, "  " + N(b.data.address), 1),
            l("time", ao, N(g(h) ? g(Xe)(b.data.createTime).fromNow() : b.data.createTime), 1)
          ])),
          l("div", lo, [
            k(g($t), { unfold: "" }, {
              default: F(() => [
                l("div", { innerHTML: A.value }, null, 8, io),
                l("div", ro, [
                  (p(!0), x(te, null, ie(s.value, (H, M) => (p(), Z(g(dt), {
                    key: M,
                    src: H,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": s.value,
                    "initial-index": M
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          l("div", co, [
            l("div", {
              class: "item",
              onClick: j[0] || (j[0] = (H) => g(i)(g(we)(b.data.id)))
            }, [
              g(v).likeIds.map(String).indexOf(g(we)(b.data.id)) == -1 ? (p(), Z(g(xe), { key: 0 }, {
                default: F(() => [
                  uo
                ]),
                _: 1
              })) : (p(), Z(g(xe), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: F(() => [
                  po
                ]),
                _: 1
              })),
              b.data.likes != 0 ? (p(), x("span", ho, N(b.data.likes), 1)) : R("", !0)
            ]),
            l("div", {
              ref_key: "btnRef",
              ref: a,
              class: J(["item", { active: n.active }]),
              onClick: r
            }, [
              k(g(xe), null, {
                default: F(() => [
                  fo
                ]),
                _: 1
              }),
              l("span", null, N(n.active ? "取消回复" : "回复"), 1)
            ], 2),
            g(d).operate ? (p(), Z(y, { key: 0 })) : R("", !0)
          ]),
          n.active ? (p(), x("div", vo, [
            k(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": g(we)(b.id),
              placeholder: `回复 @${b.data.user.username}...`,
              reply: b.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: f,
              onClose: j[1] || (j[1] = (H) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : R("", !0)
        ]),
        ue(b.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const Mt = /* @__PURE__ */ P(mo, [["__scopeId", "data-v-961bcd31"]]), _o = (e) => (ne("data-v-897ae8e9"), e = e(), oe(), e), go = {
  key: 0,
  class: "reply-box"
}, yo = { class: "reply-list" }, wo = {
  key: 0,
  class: "fetch-more"
}, $o = { key: 0 }, bo = { key: 1 }, xo = { key: 0 }, Co = /* @__PURE__ */ _o(() => /* @__PURE__ */ l("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", {
    "data-v-d6f79dbc": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
  })
], -1)), ko = {
  key: 1,
  class: "fetch-more"
}, Mo = /* @__PURE__ */ Y({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = ae({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: s } = ce(Pe), { page: c } = ce(Pe), i = K(() => {
      let f = {
        total: 0,
        length: 0,
        list: []
      };
      if (o.data) {
        let d = o.data.list.length;
        f = {
          total: o.data.total,
          length: d,
          list: o.data.list
        };
      }
      if (!n.over) {
        let d = f.list.slice(0, a);
        f.list = d;
      }
      return c && (f.list = f.list.slice(0, n.pageSize)), f;
    }), v = () => {
      n.over = !0;
    }, h = (f) => {
      s.value.forEach((d) => {
        d.id == o.id && d.reply && (d.reply = f);
      });
    }, u = (f) => {
      n.pageNum = f, t(o.id, f, n.pageSize, (d) => h(d));
    }, r = (f) => {
      n.pageSize = f, t(o.id, n.pageNum, f, (d) => h(d));
    };
    return (f, d) => i.value.length > 0 ? (p(), x("div", go, [
      l("div", yo, [
        (p(!0), x(te, null, ie(i.value.list, (m, y) => (p(), Z(Mt, {
          id: f.id,
          key: y,
          data: m,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        i.value.length > g(a) ? (p(), x("div", wo, [
          n.loading ? (p(), x("span", $o, "加载中...")) : (p(), x("div", bo, [
            n.over ? R("", !0) : (p(), x("div", xo, [
              re(" 共" + N(i.value.total) + "条回复, ", 1),
              l("span", {
                class: "fetch-more-comment select-none",
                onClick: v
              }, [
                re(" 点击查看 "),
                Co
              ])
            ]))
          ]))
        ])) : R("", !0),
        n.over && g(c) ? (p(), x("div", ko, [
          k(g(Et), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: i.value.total,
            "page-size": n.pageSize,
            onCurrentChange: u,
            onSizeChange: r
          }, null, 8, ["total", "page-size"])
        ])) : R("", !0)
      ])
    ])) : R("", !0);
  }
});
const zo = /* @__PURE__ */ P(Mo, [["__scopeId", "data-v-897ae8e9"]]), So = {
  key: 0,
  class: "comment-list"
}, Lo = /* @__PURE__ */ Y({
  __name: "comment-list",
  props: {
    data: {},
    total: {},
    showSize: {}
  },
  setup(e) {
    return (o, n) => o.data ? (p(), x("div", So, [
      (p(!0), x(te, null, ie(o.data, (t, a) => (p(), Z(Mt, {
        id: g(we)(t.id),
        key: a,
        data: t
      }, {
        default: F(() => [
          k(zo, {
            id: g(we)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : R("", !0);
  }
});
const ot = (e) => (ne("data-v-4c996c8f"), e = e(), oe(), e), Fo = { class: "u-comment" }, To = {
  key: 0,
  class: "comment-form"
}, Io = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("div", { class: "header" }, [
  /* @__PURE__ */ l("span", { class: "header-title" }, "评论")
], -1)), Ho = { class: "content" }, Vo = { class: "avatar-box" }, Ao = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Bo = {
  key: 1,
  class: "comment-list-wrapper"
}, Eo = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("div", { class: "title" }, "全部评论", -1)), Do = /* @__PURE__ */ Y({
  name: "UComment",
  __name: "comment",
  props: {
    config: {},
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "focus", "cancel"],
  setup(e, { expose: o, emit: n }) {
    const t = e, {
      user: a,
      comments: s,
      showSize: c,
      replyShowSize: i,
      total: v,
      aTarget: h,
      showForm: u = !0,
      showContent: r = !0
    } = We(t.config), f = ({ content: H, parentId: M, reply: _, files: z, clear: T }) => {
      n("submit", { content: H, parentId: M, reply: _, files: z, finish: (D) => {
        if (T(), M) {
          let E = s.value.find((G) => G.id == M);
          if (E) {
            let G = E.reply;
            G ? (G.list.unshift(D), G.total++) : E.reply = {
              total: 1,
              list: [D]
            };
          }
        } else
          s.value.unshift(D);
      } });
    }, d = {
      upload: t.upload,
      submit: f,
      focus: () => n("focus")
    };
    ye(mt, d), ye("cancelFn", () => n("cancel"));
    const m = (H, M) => {
      let _ = null;
      s.value.forEach((z) => {
        var T;
        z.id == H ? _ = z : _ = (T = z.reply) == null ? void 0 : T.list.find((O) => O.id == H), _ && (_.likes += M);
      });
    }, A = {
      user: a,
      like: (H) => {
        const M = t.config.user.likeIds;
        n("like", H, () => {
          if (M.findIndex((_) => _ == H) == -1)
            M.push(H), m(H, 1);
          else {
            let _ = M.findIndex((z) => z == H);
            _ != -1 && (M.splice(_, 1), m(H, -1));
          }
        });
      },
      relativeTime: de(t.relativeTime, !1),
      showInfo: (H, M) => n("showInfo", H, M),
      aTarget: de(h, "_blank")
    };
    ye(Qe, A);
    const b = {
      page: t.page,
      replyPage: (H, M, _, z) => {
        n("replyPage", { parentId: H, pageNum: M, pageSize: _, finish: z });
      },
      replyShowSize: de(i == null ? void 0 : i.value, 3),
      comments: s
    };
    ye(Pe, b);
    const j = (H) => {
      const { parentId: M, id: _ } = H;
      if (M) {
        let z = s.value.find((O) => O.id == M), T = z == null ? void 0 : z.reply;
        if (T) {
          let O = T.list.findIndex((D) => D.id == _);
          O != -1 && (T.list.splice(O, 1), T.total--);
        }
      } else {
        let z = s.value.findIndex((T) => T.id == _);
        z != -1 && s.value.splice(z, 1);
      }
    };
    return ye(Te, t.config.emoji), ye(je, Ft()), o({
      remove: j
    }), (H, M) => (p(), x("div", Fo, [
      g(u) ? (p(), x("div", To, [
        ue(H.$slots, "header", {}, () => [
          Io
        ], !0),
        l("div", Ho, [
          l("div", Vo, [
            k(g(Je), {
              size: 40,
              src: H.config.user.avatar
            }, {
              default: F(() => [
                Ao
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          k(gt, Tt({ placeholder: "输入评论（Enter换行，Ctrl + Enter发送）" }, H.$attrs, { "content-btn": "发表评论" }), null, 16)
        ])
      ])) : R("", !0),
      g(r) ? (p(), x("div", Bo, [
        ue(H.$slots, "default", {}, () => [
          Eo
        ], !0),
        k(Lo, {
          data: g(s),
          total: g(v),
          "show-size": g(de)(g(c), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])) : R("", !0)
    ]));
  }
});
const jo = /* @__PURE__ */ P(Do, [["__scopeId", "data-v-4c996c8f"]]), Oo = ee(jo), Uo = [
  Oo,
  p1,
  w1,
  L1,
  H1,
  wt,
  $t,
  xe,
  pn,
  Mn,
  Fn,
  jn,
  d2,
  T2,
  kt,
  W2
];
const Ro = (e) => {
  Uo.forEach((o) => {
    e.use(o);
  });
}, ns = {
  install: Ro
};
export {
  as as ElAvatar,
  ls as ElButton,
  is as ElCarousel,
  rs as ElDialog,
  cs as ElDropdown,
  us as ElDropdownItem,
  ds as ElDropdownMenu,
  ps as ElImage,
  hs as ElInput,
  fs as ElLink,
  vs as ElPagination,
  ms as ElPopover,
  _s as ElScrollbar,
  gs as ElTag,
  Te as InjectionEmojiApi,
  jn as UAnchor,
  T2 as UChat,
  Oo as UComment,
  w1 as UCommentNav,
  p1 as UCommentScroll,
  W2 as UCounter,
  L1 as UDialog,
  H1 as UDivider,
  wt as UEditor,
  kt as UEmoji,
  $t as UFold,
  xe as UIcon,
  Fn as UNoticeBar,
  d2 as USearch,
  pn as USign,
  Mn as UTags,
  tt as UToast,
  Pt as clear,
  Ne as cloneDeep,
  Ot as createGlobalNode,
  Zt as createObjectURL,
  Xe as dayjs,
  qt as debounce,
  Zo as deepTree,
  ns as default,
  Jo as flattenDeep,
  Yt as get,
  Ro as install,
  pt as isArray,
  Wo as isBoolean,
  _e as isEmpty,
  Po as isFunction,
  Wt as isImage,
  de as isNull,
  jt as isNumber,
  Dt as isObject,
  qo as isString,
  Nt as remove,
  es as removeEmptyField,
  Ut as removeGlobalNode,
  Ko as revDeepTree,
  Rt as set,
  He as storage,
  we as str,
  Xo as throttle,
  Qo as toFormData,
  Go as useBrowser,
  bt as useEmojiParse,
  p2 as useLevel,
  ts as usePage,
  ys as vInfiniteScroll,
  ee as withInstall
};
