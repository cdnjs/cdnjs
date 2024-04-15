import { h as Te, render as St, reactive as ie, defineComponent as Z, ref as L, inject as re, withDirectives as _e, openBlock as v, createElementBlock as b, createVNode as S, unref as y, normalizeClass as J, createElementVNode as i, toDisplayString as j, createCommentVNode as P, createBlock as X, withCtx as I, createTextVNode as de, nextTick as ke, pushScopeId as fe, popScopeId as ve, computed as ee, renderSlot as pe, resolveComponent as ce, watch as he, createSlots as Lt, useCssVars as Ue, normalizeStyle as ze, onMounted as be, Transition as lt, vShow as Se, withKeys as Ce, withModifiers as Me, Fragment as se, renderList as ue, toRefs as Ke, onBeforeUnmount as zt, onUnmounted as je, toRef as it, vModelText as Ft, provide as ge, useSlots as It, mergeProps as Tt } from "vue";
import { ElButton as Oe, ClickOutside as rt, ElLink as ct, ElInfiniteScroll as Ht, ElDialog as Bt, ElScrollbar as Pe, ElEmpty as At, ElForm as Et, ElFormItem as Fe, ElInput as De, ElCarousel as Vt, ElTag as Dt, ElAvatar as Je, ElPopover as ut, ElImage as dt, ElPagination as jt } from "element-plus";
import { ElAvatar as g2, ElButton as y2, ElCarousel as w2, ElDialog as $2, ElDropdown as b2, ElDropdownItem as x2, ElDropdownMenu as C2, ElEmpty as k2, ElImage as M2, ElInput as S2, ElLink as L2, ElPagination as z2, ElPopover as F2, ElScrollbar as I2, ElTag as T2, ElInfiniteScroll as H2 } from "element-plus";
/*! UndrawUi v1.0.83 */
function pt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Ot(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Rt(e) {
  return !isNaN(Number(e));
}
function s2(e) {
  return typeof e == "function";
}
function a2(e) {
  return typeof e == "string";
}
function l2(e) {
  return typeof e == "boolean";
}
function we(e) {
  return pt(e) ? e.length === 0 : Ot(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const $e = (e, o) => we(e) ? o : e;
function Re(e) {
  if (typeof e != "object" || e === null)
    return e;
  let o;
  if (Array.isArray(e)) {
    o = [];
    for (let n = 0; n < e.length; n++)
      o[n] = Re(e[n]);
  } else if (e instanceof Date)
    o = new Date(e.getTime());
  else if (e instanceof RegExp)
    o = new RegExp(e.source, e.flags);
  else {
    o = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (o[n] = Re(e[n]));
  }
  return o;
}
function i2(e, o = { parentId: "parentId", children: "children" }) {
  let n = $e(o.parentId, "parentId"), t = $e(o.children, "children");
  e = Re(e);
  const a = [], s = {};
  return e.forEach((u) => s[u.id] = u), e.forEach((u) => {
    const r = s[u[n]];
    r ? (r[t] || (r[t] = [])).push(u) : a.push(u);
  }), a;
}
function r2(e = [], o = { parentId: "parentId", children: "children" }) {
  let n = $e(o.parentId, "parentId"), t = $e(o.children, "children");
  const a = [], s = (u, r) => {
    u.forEach((g) => {
      g.id || (g.id = r++), g[n] = r, a.push(g), g[t] && pt(g[t]) && s(g[t], g.id);
    });
  };
  return s(e || [], null), a;
}
const c2 = (e, o = 1 / 0) => e.flat(o), ae = (e, o) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(o ?? {})])
      n.component(t.name, t);
  }, o)
    for (const [n, t] of Object.entries(o))
      e[n] = t;
  return e;
};
function u2() {
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
  const u = o.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const g = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), _ = (o.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], h = t === "pc", l = !h, $ = r === "xs" || l, d = window.innerHeight + "px";
  return {
    version: _,
    type: n,
    plat: u,
    tag: t,
    prefix: s,
    isMobile: l,
    isIOS: g,
    isPC: h,
    isMini: $,
    screen: r,
    innerHeight: d
  };
}
function Ut(e, o) {
  const n = Te(e, o), t = document.createElement("div");
  return document.body.append(t), St(n, t), { vnode: n, div: t };
}
function Pt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Ye = (e) => e ? "localStorage" : "sessionStorage", Yt = (e, o, n = !0) => {
  (o === "" || o === null || o === void 0) && (o = null), window[Ye(n)].setItem(e, JSON.stringify(o));
}, Nt = (e, o = !0) => {
  let n;
  const t = window[Ye(o)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, qt = (e, o = !0) => {
  window[Ye(o)].removeItem(e);
}, Wt = (e = !0) => {
  window[Ye(e)].clear();
}, Ve = {
  set: Yt,
  get: Nt,
  remove: qt,
  clear: Wt
}, ft = (e, o = 200, n = !1) => {
  let t = !1, a = null;
  const s = (...u) => new Promise((r, g) => {
    if (a && clearTimeout(a), n && !t) {
      const _ = e.apply(void 0, u);
      r(_), t = !0;
    } else
      a = setTimeout(() => {
        const _ = e.apply(void 0, u);
        r(_), t = !1, a = null;
      }, o);
  });
  return s.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, s;
}, d2 = (e, o = 500) => {
  let n = 0;
  const t = (...a) => new Promise((s, u) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= o) {
      const g = e.apply(void 0, a);
      s(g), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, xe = (e) => e == null ? "" : String(e);
function Zt(e) {
  let o = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return o.indexOf(t.toLowerCase()) != -1;
}
function Kt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function p2(e) {
  const o = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, s) => o.append(n + `[${s}]`, a)) : o.append(n, e[n]);
  }), o;
}
function f2(e) {
  return Object.keys(e).filter((o) => e[o] !== null && e[o] !== void 0).reduce((o, n) => ({ ...o, [n]: e[n] }), {});
}
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var We = { exports: {} }, ot;
function ht() {
  return ot || (ot = 1, function(e, o) {
    (function(n, t) {
      e.exports = t();
    })(Ge, function() {
      var n = 1e3, t = 6e4, a = 36e5, s = "millisecond", u = "second", r = "minute", g = "hour", _ = "day", h = "week", l = "month", $ = "quarter", d = "year", c = "date", p = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, H = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(x) {
        var m = ["th", "st", "nd", "rd"], f = x % 100;
        return "[" + x + (m[(f - 20) % 10] || m[f] || m[0]) + "]";
      } }, ne = function(x, m, f) {
        var k = String(x);
        return !k || k.length >= m ? x : "" + Array(m + 1 - k.length).join(f) + x;
      }, B = { s: ne, z: function(x) {
        var m = -x.utcOffset(), f = Math.abs(m), k = Math.floor(f / 60), w = f % 60;
        return (m <= 0 ? "+" : "-") + ne(k, 2, "0") + ":" + ne(w, 2, "0");
      }, m: function x(m, f) {
        if (m.date() < f.date())
          return -x(f, m);
        var k = 12 * (f.year() - m.year()) + (f.month() - m.month()), w = m.clone().add(k, l), F = f - w < 0, T = m.clone().add(k + (F ? -1 : 1), l);
        return +(-(k + (f - w) / (F ? w - T : T - w)) || 0);
      }, a: function(x) {
        return x < 0 ? Math.ceil(x) || 0 : Math.floor(x);
      }, p: function(x) {
        return { M: l, y: d, w: h, d: _, D: c, h: g, m: r, s: u, ms: s, Q: $ }[x] || String(x || "").toLowerCase().replace(/s$/, "");
      }, u: function(x) {
        return x === void 0;
      } }, E = "en", M = {};
      M[E] = Y;
      var A = function(x) {
        return x instanceof me;
      }, N = function x(m, f, k) {
        var w;
        if (!m)
          return E;
        if (typeof m == "string") {
          var F = m.toLowerCase();
          M[F] && (w = F), f && (M[F] = f, w = F);
          var T = m.split("-");
          if (!w && T.length > 1)
            return x(T[0]);
        } else {
          var R = m.name;
          M[R] = m, w = R;
        }
        return !k && w && (E = w), w || !k && E;
      }, W = function(x, m) {
        if (A(x))
          return x.clone();
        var f = typeof m == "object" ? m : {};
        return f.date = x, f.args = arguments, new me(f);
      }, U = B;
      U.l = N, U.i = A, U.w = function(x, m) {
        return W(x, { locale: m.$L, utc: m.$u, x: m.$x, $offset: m.$offset });
      };
      var me = function() {
        function x(f) {
          this.$L = N(f.locale, null, !0), this.parse(f);
        }
        var m = x.prototype;
        return m.parse = function(f) {
          this.$d = function(k) {
            var w = k.date, F = k.utc;
            if (w === null)
              return /* @__PURE__ */ new Date(NaN);
            if (U.u(w))
              return /* @__PURE__ */ new Date();
            if (w instanceof Date)
              return new Date(w);
            if (typeof w == "string" && !/Z$/i.test(w)) {
              var T = w.match(V);
              if (T) {
                var R = T[2] - 1 || 0, C = (T[7] || "0").substring(0, 3);
                return F ? new Date(Date.UTC(T[1], R, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, C)) : new Date(T[1], R, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, C);
              }
            }
            return new Date(w);
          }(f), this.$x = f.x || {}, this.init();
        }, m.init = function() {
          var f = this.$d;
          this.$y = f.getFullYear(), this.$M = f.getMonth(), this.$D = f.getDate(), this.$W = f.getDay(), this.$H = f.getHours(), this.$m = f.getMinutes(), this.$s = f.getSeconds(), this.$ms = f.getMilliseconds();
        }, m.$utils = function() {
          return U;
        }, m.isValid = function() {
          return this.$d.toString() !== p;
        }, m.isSame = function(f, k) {
          var w = W(f);
          return this.startOf(k) <= w && w <= this.endOf(k);
        }, m.isAfter = function(f, k) {
          return W(f) < this.startOf(k);
        }, m.isBefore = function(f, k) {
          return this.endOf(k) < W(f);
        }, m.$g = function(f, k, w) {
          return U.u(f) ? this[k] : this.set(w, f);
        }, m.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m.valueOf = function() {
          return this.$d.getTime();
        }, m.startOf = function(f, k) {
          var w = this, F = !!U.u(k) || k, T = U.p(f), R = function(te, oe) {
            var ye = U.w(w.$u ? Date.UTC(w.$y, oe, te) : new Date(w.$y, oe, te), w);
            return F ? ye : ye.endOf(_);
          }, C = function(te, oe) {
            return U.w(w.toDate()[te].apply(w.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(oe)), w);
          }, z = this.$W, O = this.$M, q = this.$D, K = "set" + (this.$u ? "UTC" : "");
          switch (T) {
            case d:
              return F ? R(1, 0) : R(31, 11);
            case l:
              return F ? R(1, O) : R(0, O + 1);
            case h:
              var Q = this.$locale().weekStart || 0, le = (z < Q ? z + 7 : z) - Q;
              return R(F ? q - le : q + (6 - le), O);
            case _:
            case c:
              return C(K + "Hours", 0);
            case g:
              return C(K + "Minutes", 1);
            case r:
              return C(K + "Seconds", 2);
            case u:
              return C(K + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m.endOf = function(f) {
          return this.startOf(f, !1);
        }, m.$set = function(f, k) {
          var w, F = U.p(f), T = "set" + (this.$u ? "UTC" : ""), R = (w = {}, w[_] = T + "Date", w[c] = T + "Date", w[l] = T + "Month", w[d] = T + "FullYear", w[g] = T + "Hours", w[r] = T + "Minutes", w[u] = T + "Seconds", w[s] = T + "Milliseconds", w)[F], C = F === _ ? this.$D + (k - this.$W) : k;
          if (F === l || F === d) {
            var z = this.clone().set(c, 1);
            z.$d[R](C), z.init(), this.$d = z.set(c, Math.min(this.$D, z.daysInMonth())).$d;
          } else
            R && this.$d[R](C);
          return this.init(), this;
        }, m.set = function(f, k) {
          return this.clone().$set(f, k);
        }, m.get = function(f) {
          return this[U.p(f)]();
        }, m.add = function(f, k) {
          var w, F = this;
          f = Number(f);
          var T = U.p(k), R = function(O) {
            var q = W(F);
            return U.w(q.date(q.date() + Math.round(O * f)), F);
          };
          if (T === l)
            return this.set(l, this.$M + f);
          if (T === d)
            return this.set(d, this.$y + f);
          if (T === _)
            return R(1);
          if (T === h)
            return R(7);
          var C = (w = {}, w[r] = t, w[g] = a, w[u] = n, w)[T] || 1, z = this.$d.getTime() + f * C;
          return U.w(z, this);
        }, m.subtract = function(f, k) {
          return this.add(-1 * f, k);
        }, m.format = function(f) {
          var k = this, w = this.$locale();
          if (!this.isValid())
            return w.invalidDate || p;
          var F = f || "YYYY-MM-DDTHH:mm:ssZ", T = U.z(this), R = this.$H, C = this.$m, z = this.$M, O = w.weekdays, q = w.months, K = function(oe, ye, Ae, Ee) {
            return oe && (oe[ye] || oe(k, F)) || Ae[ye].slice(0, Ee);
          }, Q = function(oe) {
            return U.s(R % 12 || 12, oe, "0");
          }, le = w.meridiem || function(oe, ye, Ae) {
            var Ee = oe < 12 ? "AM" : "PM";
            return Ae ? Ee.toLowerCase() : Ee;
          }, te = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: z + 1, MM: U.s(z + 1, 2, "0"), MMM: K(w.monthsShort, z, q, 3), MMMM: K(q, z), D: this.$D, DD: U.s(this.$D, 2, "0"), d: String(this.$W), dd: K(w.weekdaysMin, this.$W, O, 2), ddd: K(w.weekdaysShort, this.$W, O, 3), dddd: O[this.$W], H: String(R), HH: U.s(R, 2, "0"), h: Q(1), hh: Q(2), a: le(R, C, !0), A: le(R, C, !1), m: String(C), mm: U.s(C, 2, "0"), s: String(this.$s), ss: U.s(this.$s, 2, "0"), SSS: U.s(this.$ms, 3, "0"), Z: T };
          return F.replace(H, function(oe, ye) {
            return ye || te[oe] || T.replace(":", "");
          });
        }, m.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m.diff = function(f, k, w) {
          var F, T = U.p(k), R = W(f), C = (R.utcOffset() - this.utcOffset()) * t, z = this - R, O = U.m(this, R);
          return O = (F = {}, F[d] = O / 12, F[l] = O, F[$] = O / 3, F[h] = (z - C) / 6048e5, F[_] = (z - C) / 864e5, F[g] = z / a, F[r] = z / t, F[u] = z / n, F)[T] || z, w ? O : U.a(O);
        }, m.daysInMonth = function() {
          return this.endOf(l).$D;
        }, m.$locale = function() {
          return M[this.$L];
        }, m.locale = function(f, k) {
          if (!f)
            return this.$L;
          var w = this.clone(), F = N(f, k, !0);
          return F && (w.$L = F), w;
        }, m.clone = function() {
          return U.w(this.$d, this);
        }, m.toDate = function() {
          return new Date(this.valueOf());
        }, m.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m.toISOString = function() {
          return this.$d.toISOString();
        }, m.toString = function() {
          return this.$d.toUTCString();
        }, x;
      }(), D = me.prototype;
      return W.prototype = D, [["$ms", s], ["$s", u], ["$m", r], ["$H", g], ["$W", _], ["$M", l], ["$y", d], ["$D", c]].forEach(function(x) {
        D[x[1]] = function(m) {
          return this.$g(m, x[0], x[1]);
        };
      }), W.extend = function(x, m) {
        return x.$i || (x(m, me, W), x.$i = !0), W;
      }, W.locale = N, W.isDayjs = A, W.unix = function(x) {
        return W(1e3 * x);
      }, W.en = M[E], W.Ls = M, W.p = {}, W;
    });
  }(We)), We.exports;
}
var Jt = ht();
const Xe = /* @__PURE__ */ vt(Jt);
var Gt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t(ht());
  })(Ge, function(n) {
    function t(u) {
      return u && typeof u == "object" && "default" in u ? u : { default: u };
    }
    var a = t(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(u, r) {
      return r === "W" ? u + "周" : u + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(u, r) {
      var g = 100 * u + r;
      return g < 600 ? "凌晨" : g < 900 ? "早上" : g < 1100 ? "上午" : g < 1300 ? "中午" : g < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(s, null, !0), s;
  });
})(Gt);
var mt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t();
  })(Ge, function() {
    return function(n, t, a) {
      n = n || {};
      var s = t.prototype, u = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(_, h, l, $) {
        return s.fromToBase(_, h, l, $);
      }
      a.en.relativeTime = u, s.fromToBase = function(_, h, l, $, d) {
        for (var c, p, V, H = l.$locale().relativeTime || u, Y = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], ne = Y.length, B = 0; B < ne; B += 1) {
          var E = Y[B];
          E.d && (c = $ ? a(_).diff(l, E.d, !0) : l.diff(_, E.d, !0));
          var M = (n.rounding || Math.round)(Math.abs(c));
          if (V = c > 0, M <= E.r || !E.r) {
            M <= 1 && B > 0 && (E = Y[B - 1]);
            var A = H[E.l];
            d && (M = d("" + M)), p = typeof A == "string" ? A.replace("%d", M) : A(M, h, E.l, V);
            break;
          }
        }
        if (h)
          return p;
        var N = V ? H.future : H.past;
        return typeof N == "function" ? N(p) : N.replace("%s", p);
      }, s.to = function(_, h) {
        return r(_, h, this, !0);
      }, s.from = function(_, h) {
        return r(_, h, this);
      };
      var g = function(_) {
        return _.$u ? a.utc() : a();
      };
      s.toNow = function(_) {
        return this.to(g(this), _);
      }, s.fromNow = function(_) {
        return this.from(g(this), _);
      };
    };
  });
})(mt);
var Xt = mt.exports;
const Qt = /* @__PURE__ */ vt(Xt);
Xe.locale("zh-cn");
Xe.extend(Qt);
const e1 = {
  zh: {
    emoji: {
      content: "表情"
    },
    comment: {
      headerTitle: "评论",
      upload: "图片",
      contentBtn: "发表评论",
      contentBtn2: "发布",
      title: "全部评论",
      placeholder: "输入评论（Enter换行，Ctrl + Enter发送）",
      placeholder2: "回复",
      reply: "回复",
      cancelReply: "取消回复",
      more: {
        loading: "加载中",
        prefixTotal: "展开",
        suffixTotal: "条回复"
      }
    },
    scroll: {
      content: "加载更多",
      loading: "加载中...",
      noMore: "没有更多了"
    },
    nav: {
      title: "全部评论",
      newest: "最新",
      hottest: "最热"
    },
    fold: {
      unfold: "展开",
      fold: "收起"
    }
  },
  en: {
    emoji: {
      content: "emoji"
    },
    comment: {
      headerTitle: "comment",
      upload: "picture",
      contentBtn: "comment",
      contentBtn2: "publish",
      title: "comments",
      placeholder: "Enter a comment (Enter line feed, Ctrl + Enter send)",
      placeholder2: "reply",
      reply: "reply",
      cancelReply: "cancel reply",
      more: {
        loading: "loading",
        prefixTotal: "unfold",
        suffixTotal: "return receipt"
      }
    },
    scroll: {
      content: "load more",
      loading: "loading...",
      noMore: "no more."
    },
    nav: {
      title: "comments",
      newest: "newest",
      hottest: "hottest"
    },
    fold: {
      unfold: "unfold",
      fold: "fold"
    }
  }
}, st = ie({
  locale: "zh",
  messages: e1
}), Ie = (e) => (e = st.locale + "." + e, e.split(".").reduce((o, n) => o[n] || "", st.messages));
const Ne = Symbol(), _t = Symbol(), Qe = Symbol(), Ze = Symbol(), t1 = (e) => (fe("data-v-4063c007"), e = e(), ve(), e), n1 = { class: "comment-box" }, o1 = {
  key: 0,
  class: "action-box"
}, s1 = /* @__PURE__ */ t1(() => /* @__PURE__ */ i("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ i("path", {
    "data-v-48a7e3c5": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
  })
], -1)), a1 = { class: "btn-box" }, l1 = /* @__PURE__ */ Z({
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
    const t = e, a = L(""), s = L(!1), u = L(!0), r = L(), g = L(), _ = L(), h = L([]), l = L([]), $ = ie({
      imgLength: 0
    }), d = (x) => {
      l.value = x;
    }, c = (x) => {
      we(a.value.replace(/&nbsp;|<br>| /g, "")) ? u.value = !0 : u.value = !1;
    }, { upload: p, submit: V, focus: H } = re(_t), Y = re(Be), ne = () => {
      V({
        content: t.reply && t.parentId != t.reply.id ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: $e(t.parentId, null),
        reply: t.reply,
        files: l.value,
        clear: () => {
          M(), n("close");
        }
      });
    }, B = re("cancelFn"), E = () => {
      M(), n("close"), B();
    }, M = () => {
      r.value.clear(), h.value.length = 0, l.value = [], u.value = !0;
    };
    function A(x) {
      we(a.value) && !$.imgLength && (s.value = !1, n("hide", x));
    }
    function N() {
      s.value = !0, ke(() => {
        g.value = document.querySelector("div[id^='el-popper-container']");
      }), H();
    }
    function W() {
      console.log(r.value);
    }
    o({
      focus: () => {
        var x;
        return (x = r.value) == null ? void 0 : x.focus();
      },
      changeMentionShow: (x) => {
        var m;
        return (m = r.value) == null ? void 0 : m.changeMentionShow(x);
      },
      AddMention: W
    });
    const U = (x, m) => {
      var k;
      m || (h.value.length = 0, l.value.length = 0);
      const f = m ? [m] : (k = _.value) == null ? void 0 : k.files;
      if ($.imgLength = $e(f == null ? void 0 : f.length, 0), f)
        for (let w = 0; w < f.length; w++) {
          let F = f[w].name, T = Kt(f[w]);
          l.value.push(f[w]), Zt(F) ? h.value.push(T) : et({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, me = re(Ne), D = () => Te("div", me.func());
    return (x, m) => _e((v(), b("div", n1, [
      S(y($t), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": m[0] || (m[0] = (f) => a.value = f),
        class: J({ "input-active": s.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": h.value,
        onClick: m[1] || (m[1] = () => s.value = !0),
        onFocus: N,
        onInput: c,
        onSubmit: ne,
        onPaste: U,
        onChangeImgListFn: d
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      s.value ? (v(), b("div", o1, [
        S(y(kt), {
          emoji: y(Y),
          onAddEmoji: m[2] || (m[2] = (f) => {
            var k;
            return (k = r.value) == null ? void 0 : k.addText(f);
          })
        }, null, 8, ["emoji"]),
        y(p) ? (v(), b("div", {
          key: 0,
          class: "picture",
          onClick: m[3] || (m[3] = //@ts-ignore
          (...f) => {
            var k, w;
            return ((k = _.value) == null ? void 0 : k.click) && ((w = _.value) == null ? void 0 : w.click(...f));
          })
        }, [
          s1,
          i("span", null, j(x.$u("comment.upload")), 1),
          i("input", {
            id: "comment-upload",
            ref_key: "inputRef",
            ref: _,
            type: "file",
            multiple: "",
            onChange: U
          }, null, 544)
        ])) : P("", !0),
        y(me).func ? (v(), X(D, { key: 1 })) : P("", !0),
        i("div", a1, [
          S(y(Oe), {
            type: "primary",
            disabled: u.value,
            onClick: ne
          }, {
            default: I(() => [
              de(j(t.contentBtn), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          t.cancelBtn ? (v(), X(y(Oe), {
            key: 0,
            onClick: E
          }, {
            default: I(() => [
              de(j(t.cancelBtn), 1)
            ]),
            _: 1
          })) : P("", !0)
        ])
      ])) : P("", !0)
    ])), [
      [y(rt), A, g.value]
    ]);
  }
});
const G = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of o)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ G(l1, [["__scopeId", "data-v-4063c007"]]), i1 = { class: "u-comment-scroll" }, r1 = ["infinite-scroll-disabled"], c1 = { class: "scroll-btn" }, u1 = { key: 1 }, d1 = { key: 2 }, p1 = /* @__PURE__ */ Z({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(!1), s = ee(() => a.value && n.disable), u = ee(() => !a.value || t.value || s.value), r = ft(() => {
      o("more"), t.value = !1;
    }, 500), g = () => {
      t.value = !0, r();
    };
    return (_, h) => (v(), b("div", i1, [
      _e((v(), b("div", {
        "infinite-scroll-disabled": u.value,
        "infinite-scroll-distance": "2"
      }, [
        pe(_.$slots, "default", {}, void 0, !0),
        i("div", c1, [
          a.value ? P("", !0) : (v(), X(y(ct), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: h[0] || (h[0] = (l) => a.value = !a.value)
          }, {
            default: I(() => [
              de(j(_.$u("scroll.content")), 1)
            ]),
            _: 1
          })),
          t.value ? (v(), b("p", u1, j(_.$u("scroll.loading")), 1)) : P("", !0),
          s.value ? (v(), b("p", d1, j(_.$u("scroll.noMore")), 1)) : P("", !0)
        ])
      ], 8, r1)), [
        [y(Ht), g]
      ])
    ]));
  }
});
const f1 = /* @__PURE__ */ G(p1, [["__scopeId", "data-v-8a24b42e"]]), v1 = ae(f1), yt = (e) => (fe("data-v-f99158ef"), e = e(), ve(), e), h1 = { class: "nav" }, m1 = { class: "nav__title" }, _1 = { class: "nav__sort" }, g1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99951 0.5C9.03708 0.5 11.4995 2.96243 11.4995 6C11.4995 9.03757 9.03708 11.5 5.99951 11.5C2.96195 11.5 0.499512 9.03757 0.499512 6C0.499512 2.96243 2.96195 0.5 5.99951 0.5ZM6.25 3.49988C6.38807 3.49988 6.5 3.61181 6.5 3.74988V5.49988H8.25C8.38807 5.49988 8.5 5.61181 8.5 5.74988V6.24988C8.5 6.38795 8.38807 6.49988 8.25 6.49988H5.75C5.61193 6.49988 5.5 6.38795 5.5 6.24988V3.74988C5.5 3.61181 5.61193 3.49988 5.75 3.49988H6.25Z"
  })
], -1)), y1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), w1 = /* @__PURE__ */ Z({
  name: "uCommentNav",
  __name: "comment-nav",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: o }) {
    const n = e, t = ee({
      get() {
        return n.modelValue;
      },
      set(a) {
        o("update:modelValue", a), o("sorted", a);
      }
    });
    return (a, s) => {
      const u = ce("u-icon");
      return v(), b("div", h1, [
        i("span", m1, j(a.$u("nav.title")), 1),
        i("div", _1, [
          i("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: s[0] || (s[0] = (r) => t.value = !0)
          }, [
            S(u, null, {
              default: I(() => [
                g1
              ]),
              _: 1
            }),
            de(" " + j(a.$u("nav.newest")), 1)
          ], 2),
          i("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: s[1] || (s[1] = (r) => t.value = !1)
          }, [
            S(u, null, {
              default: I(() => [
                y1
              ]),
              _: 1
            }),
            de(" " + j(a.$u("nav.hottest")), 1)
          ], 2)
        ])
      ]);
    };
  }
});
const $1 = /* @__PURE__ */ G(w1, [["__scopeId", "data-v-f99158ef"]]), b1 = ae($1), wt = (e) => (fe("data-v-59596f14"), e = e(), ve(), e), x1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, C1 = /* @__PURE__ */ wt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), k1 = [
  C1
], M1 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, S1 = /* @__PURE__ */ wt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), L1 = [
  S1
], z1 = /* @__PURE__ */ Z({
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
    return he(
      () => n.modelValue,
      (s) => {
        t.value = s;
      },
      {
        immediate: !0
      }
    ), he(
      () => t.value,
      (s) => {
        o("update:modelValue", s);
      }
    ), (s, u) => (v(), X(y(Bt), {
      modelValue: t.value,
      "onUpdate:modelValue": u[1] || (u[1] = (r) => t.value = r),
      "close-on-click-modal": s.closeOnClickModal,
      title: s.title,
      width: s.width,
      top: s.top,
      fullscreen: a.value,
      center: s.center,
      "before-close": s.beforeClose,
      draggable: ""
    }, Lt({
      default: I(() => [
        i("div", {
          class: "full-screen",
          onClick: u[0] || (u[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (v(), b("svg", x1, k1)) : (v(), b("svg", M1, L1))
        ]),
        pe(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      s.$slots.footer ? {
        name: "footer",
        fn: I(() => [
          pe(s.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const F1 = /* @__PURE__ */ G(z1, [["__scopeId", "data-v-59596f14"]]), I1 = ae(F1), T1 = { class: "field" }, H1 = /* @__PURE__ */ Z({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const o = e;
    Ue((t) => ({
      d59c4402: o.borderStyle
    }));
    const n = L();
    return he(
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
    ), (t, a) => (v(), b("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", T1, [
        t.$slots.default || t.vertical ? (v(), b("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          pe(t.$slots, "default", {}, void 0, !0)
        ], 2)) : P("", !0)
      ])
    ], 2));
  }
});
const B1 = /* @__PURE__ */ G(H1, [["__scopeId", "data-v-153d9bc7"]]), A1 = ae(B1), E1 = [
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
], V1 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function D1(e) {
  return E1.find((o) => o.type === e);
}
function j1() {
  return V1;
}
const O1 = {
  key: 1,
  "aria-hidden": "true"
}, R1 = ["xlink:href"], U1 = /* @__PURE__ */ Z({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const o = e, n = ee(() => "#" + o.name), t = ee(() => ({
      fontSize: Rt(o.size) ? o.size + "px" : o.size,
      color: o.color
    }));
    return (a, s) => (v(), b("i", {
      class: "u-icon",
      style: ze(t.value)
    }, [
      a.$slots.default ? pe(a.$slots, "default", { key: 0 }, void 0, !0) : (v(), b("svg", O1, [
        i("use", { "xlink:href": n.value }, null, 8, R1)
      ]))
    ], 4));
  }
});
const P1 = /* @__PURE__ */ G(U1, [["__scopeId", "data-v-dd34e834"]]), Le = ae(P1), Y1 = { class: "v-toast" }, N1 = { class: "inner" }, q1 = { class: "message" }, W1 = /* @__PURE__ */ Z({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const o = e;
    Ue((a) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = ie(j1().options), t = L(!1);
    return he(
      () => o.type,
      (a) => {
        const s = D1(a);
        s && (n.color = s.options.color, n.bgColor = s.options.bgColor, n.icon = s.options.icon);
      },
      { immediate: !0 }
    ), be(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, o.duration);
    }), (a, s) => (v(), b("div", Y1, [
      S(lt, { name: "v-toast" }, {
        default: I(() => [
          _e(i("div", N1, [
            i("div", q1, [
              n.icon ? (v(), X(y(Le), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : P("", !0),
              i("span", {
                class: J({ normal: a.type != "normal" })
              }, j(a.message), 3)
            ])
          ], 512), [
            [Se, t.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
});
const Z1 = /* @__PURE__ */ G(W1, [["__scopeId", "data-v-7d3c50e0"]]);
function et(e) {
  let o = e.duration;
  if (!e.message)
    return;
  e.duration = o || 1e3;
  const { vnode: n, div: t } = Ut(Z1, e);
  return setTimeout(() => {
    Pt(t);
  }, e.duration + 300), n;
}
const K1 = ["onKeydown"], J1 = ["onClick"], G1 = { class: "userInfo" }, X1 = ["src"], Q1 = { class: "username" }, en = { class: "empty" }, tn = /* @__PURE__ */ Z({
  __name: "mentionList",
  props: {
    isShow: { type: Boolean, default: !1 },
    position: { default: () => ({
      left: 0,
      top: 0
    }) },
    list: { default: () => [] },
    showAvatar: { type: Boolean, default: !0 }
  },
  emits: ["insert", "changeShow"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = L(), s = L(-1), u = L(null), r = (l) => {
      var $;
      if (s.value += l, s.value < 0 ? s.value = t.list.length - 1 : s.value >= t.list.length && (s.value = 0), a.value) {
        const d = a.value.wrapRef.children[0].children[s.value];
        if (d) {
          const c = a.value.wrapRef.offsetHeight || 0;
          ($ = a.value) == null || $.setScrollTop((s.value - c / d.offsetHeight + 1) * d.offsetHeight);
        }
      }
    }, g = () => {
      if (s.value >= 0 && s.value < t.list.length)
        return t.list[s.value];
    }, _ = (l) => {
      s.value = l, n("insert", t.list[s.value]), n("changeShow", !1);
    };
    he(
      () => t.isShow,
      (l) => {
        l && (s.value = 0, ke(() => {
          a.value && a.value.setScrollTop(0);
        }));
      }
    );
    const h = () => {
      s.value = 0;
    };
    return be(() => {
      var l;
      (l = u.value) == null || l.focus();
    }), o({
      moveSelection: r,
      printSelectedItem: g,
      resetSelectIndex: h
    }), (l, $) => _e((v(), b("ul", {
      ref_key: "mentionList",
      ref: u,
      class: "mention-list",
      tabindex: "0",
      style: ze(`left: ${l.position.left}px; top: ${l.position.top}px`),
      onKeydown: [
        $[0] || ($[0] = Ce(Me((d) => r(-1), ["prevent"]), ["up"])),
        $[1] || ($[1] = Ce(Me((d) => r(1), ["prevent"]), ["down"])),
        Ce(Me(g, ["prevent"]), ["enter"])
      ]
    }, [
      S(y(Pe), {
        ref_key: "scrollbarRef",
        ref: a,
        style: { padding: "10px" }
      }, {
        default: I(() => [
          (v(!0), b(se, null, ue(l.list, (d, c) => (v(), b("li", {
            key: c,
            class: J({ hover: c === s.value }),
            onClick: (p) => _(c)
          }, [
            pe(l.$slots, "user", {
              item: d,
              index: c
            }, () => [
              i("div", G1, [
                l.showAvatar ? (v(), b("img", {
                  key: 0,
                  src: d.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, X1)) : P("", !0),
                i("span", Q1, j(d.userName), 1)
              ])
            ], !0)
          ], 10, J1))), 128)),
          _e(i("div", en, [
            S(y(At), { description: "暂无匹配数据" })
          ], 512), [
            [Se, !l.list.length]
          ])
        ]),
        _: 3
      }, 512)
    ], 44, K1)), [
      [Se, l.isShow]
    ]);
  }
});
const nn = /* @__PURE__ */ G(tn, [["__scopeId", "data-v-14aad4a8"]]), on = (e) => (fe("data-v-06f46233"), e = e(), ve(), e), sn = ["placeholder", "onKeydown", "innerHTML"], an = ["src"], ln = ["onClick"], rn = /* @__PURE__ */ on(() => /* @__PURE__ */ i("svg", {
  "data-v-48a7e3c5": "",
  "data-v-7c7c7498": "",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("rect", {
    width: "12",
    height: "12",
    rx: "2",
    fill: "#86909C"
  }),
  /* @__PURE__ */ i("path", {
    "data-v-48a7e3c5": "",
    "data-v-7c7c7498": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z",
    fill: "white"
  })
], -1)), cn = [
  rn
], un = /* @__PURE__ */ Z({
  name: "UEditor",
  __name: "editor",
  props: {
    placeholder: {},
    modelValue: {},
    minHeight: { default: 30 },
    imgList: {}
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit", "paste", "changeImgListFn"],
  setup(e, { expose: o, emit: n }) {
    const t = e;
    Ue((C) => ({
      "428f749a": E.value,
      "0d0ffbaa": M.value
    }));
    const a = L(null), s = L(!1), u = L({
      left: 0,
      top: 0
    });
    function r(C) {
      s.value = C, C || (A.value = "");
    }
    function g(C) {
      u.value = C;
    }
    function _(C) {
      a.value && a.value.moveSelection(C);
    }
    function h() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const l = re("mentionConfig"), $ = re("changeMetionList"), d = re("mentionSearch"), c = L(), p = L(), V = L(), H = L(!1), Y = L(!1), ne = L(), { imgList: B } = Ke(t), E = ee(() => t.minHeight + "px"), M = ee(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), A = L("");
    he(
      () => t.modelValue,
      (C, z) => {
        var q;
        if (H.value || (V.value = C), !((q = l == null ? void 0 : l.value) != null && q.show))
          return;
        C = C.replace(/<br>/g, ""), z = z.replace(/<br>/g, ""), (z.length >= C.length && z.slice(-1) === "@" || C.slice(-7) === "@&nbsp;") && r(!1), s.value && C.slice(-6) !== "&nbsp;" ? (A.value = C.split("@").pop() || "", A.value = A.value.replace("'", ""), console.log(A.value), d(A.value), a.value && a.value.resetSelectIndex()) : s.value && C.slice(-6) === "&nbsp;" && r(!1);
        let O = C.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (O) {
          let K = O.map((le) => {
            let te = le.match(/data-id="([^"]*)"/);
            return te ? te[1] : null;
          }), Q = l.value.userArr.filter(
            (le) => K.includes(`${le[l.value.userIdKey]}`)
          );
          $(Q);
        } else
          $([]);
      }
    );
    function N(C) {
      n("focus", C), H.value = !0, Y.value = !0;
    }
    function W(C) {
      var z, O;
      try {
        c.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0);
      } catch (q) {
        console.log(q);
      }
      n("blur", C), (O = p.value) != null && O.innerHTML || (Y.value = !1), H.value = !1;
    }
    function U(C) {
      _(C);
    }
    function me(C) {
      var O, q;
      const { innerHTML: z } = C.target;
      if (C.data === "@" && (l != null && l.value.show)) {
        try {
          c.value = (O = window.getSelection()) == null ? void 0 : O.getRangeAt(0);
        } catch (Q) {
          console.log(Q);
        }
        let K = (q = c.value) == null ? void 0 : q.getBoundingClientRect();
        r(!0), K && g({
          left: K.left,
          top: K.top + K.height + 10
        });
      }
      n("update:modelValue", z), n("input", C), T();
    }
    function D(C, z) {
      var q, K;
      let O = window.getSelection();
      if (O) {
        if (O.removeAllRanges(), c.value || ((q = p.value) == null || q.focus(), c.value = O.getRangeAt(0)), z && !A.value)
          c.value.startOffset > 0 && (c.value.setStart(c.value.startContainer, c.value.startOffset - 1), c.value.deleteContents());
        else if (z && A.value) {
          let le = A.value.length + 1, te = c.value.startContainer.data.lastIndexOf("@" + A.value);
          te !== -1 && (c.value.setStart(c.value.startContainer, te), c.value.setEnd(c.value.startContainer, te + le), c.value.deleteContents());
        }
        c.value.deleteContents(), c.value.insertNode(c.value.createContextualFragment(C)), c.value.collapse(!1), O.addRange(c.value), n("update:modelValue", ((K = p.value) == null ? void 0 : K.innerHTML) || "");
        const Q = p.value;
        n("input", Q);
      }
    }
    function x(C) {
      const z = C.clipboardData;
      if (z) {
        const O = z.getData("text/plain"), q = z.items.length > 0 ? z.items[0].getAsFile() : null;
        O ? (C.preventDefault(), document.execCommand("insertText", !1, O)) : q && (console.log(q), C.preventDefault(), n("paste", C, q));
      }
    }
    function m() {
      p.value && (p.value.innerHTML = "", n("update:modelValue", p.value.innerHTML), Y.value = !1);
    }
    function f() {
      ke(() => {
        var C;
        (C = p.value) == null || C.focus();
      });
    }
    function k(C) {
      if (C) {
        let z = R(C);
        D(`${z} `, !0);
      }
    }
    const w = (C) => {
      if (C.ctrlKey && C.key == "Enter")
        we(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? et({ message: "内容不能为空", type: "info" }) : n("submit");
      else if (C.key == "Enter" && s.value) {
        C.preventDefault();
        const z = h();
        k(z), r(!1);
      }
    }, F = (C) => {
      var z;
      (z = B == null ? void 0 : B.value) == null || z.splice(C, 1), n("changeImgListFn", Re(B == null ? void 0 : B.value));
    }, T = (C) => {
      var z;
      p.value && (c.value = (z = p == null ? void 0 : p.value.ownerDocument.getSelection()) == null ? void 0 : z.getRangeAt(0));
    };
    be(() => {
      p != null && p.value && p.value.addEventListener("mousemove", T);
    }), zt(() => {
      p != null && p.value && p.value.removeEventListener("mousemove", T);
    }), o({
      addText: D,
      clear: m,
      focus: f,
      imageRef: ne,
      insertUser: k,
      changeMentionShow: r
    });
    const R = (C) => {
      const z = C[l.value.userNameKey], O = C[l.value.userIdKey], q = l.value.mentionColor || "#409eff", K = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${z}</text>
    </svg>
  `, Q = document.createElement("div");
      Q.style.visibility = "hidden", Q.innerHTML = K, document.body.appendChild(Q);
      const le = Q.querySelector("text");
      let te = 200;
      le && (te = le.getComputedTextLength()), document.body.removeChild(Q);
      const oe = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${te}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${q}; }
      </style>
      <text x="0" y="15" class="mention-text">@${z}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent(oe).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${z}" style="width:${te}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${z}" data-id="${O}"
     draggable="false"
    >`;
    };
    return (C, z) => {
      var O, q;
      return v(), b("div", {
        class: J(["u-editor", { active: Y.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: p,
          class: "rich-input",
          contenteditable: "",
          placeholder: C.placeholder,
          onFocus: N,
          onInput: me,
          onBlur: W,
          onKeydown: [
            Ce(w, ["enter"]),
            z[0] || (z[0] = Ce(Me((K) => U(-1), ["prevent"]), ["up"])),
            z[1] || (z[1] = Ce(Me((K) => U(1), ["prevent"]), ["down"]))
          ],
          onPaste: x,
          innerHTML: V.value
        }, null, 40, sn),
        i("div", {
          ref_key: "imageRef",
          ref: ne,
          class: "image-preview-box"
        }, [
          (v(!0), b(se, null, ue(y(B), (K, Q) => (v(), b("div", {
            key: Q,
            class: "image-preview"
          }, [
            i("img", {
              src: K,
              alt: ""
            }, null, 8, an),
            i("div", {
              class: "clean-btn",
              onClick: (le) => F(Q)
            }, cn, 8, ln)
          ]))), 128))
        ], 512),
        S(nn, {
          ref_key: "metionList",
          ref: a,
          "is-show": s.value,
          position: u.value,
          list: (O = y(l)) == null ? void 0 : O.userArr,
          "show-avatar": (q = y(l)) == null ? void 0 : q.showAvatar,
          onInsert: k,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"])
      ], 2);
    };
  }
});
const dn = /* @__PURE__ */ G(un, [["__scopeId", "data-v-06f46233"]]), $t = ae(dn);
const pn = { class: "u-fold" }, fn = { class: "action-box select-none" }, vn = /* @__PURE__ */ Z({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean },
    position: { default: "line" }
  },
  setup(e) {
    const o = e;
    Ue((g) => ({
      "4c9fb716": n.value
    }));
    const n = ee(() => {
      let g = Math.trunc(Number(o.line));
      return g > 0 ? g : 1;
    }), t = L(!0), a = L(!1), s = L(), u = L();
    let r;
    return be(() => {
      r = new ResizeObserver((g) => {
        t.value && s.value && u.value && (a.value = u.value.clientHeight < s.value.scrollHeight);
      }), r.observe(s.value);
    }), je(() => {
      r == null || r.disconnect();
    }), (g, _) => {
      const h = ce("el-button");
      return v(), b("div", pn, [
        i("div", {
          ref_key: "textBox",
          ref: u,
          class: J(["txt-box", { "over-hidden": t.value }])
        }, [
          i("div", {
            ref_key: "divBox",
            ref: s
          }, [
            a.value && g.unfold && g.position == "end" ? (v(), X(h, {
              key: 0,
              onClick: _[0] || (_[0] = (l) => t.value = !t.value),
              class: J({ "over-hidden": t.value, "end-btn": 1 }),
              type: "primary",
              plain: "",
              link: ""
            }, {
              default: I(() => [
                de(j(t.value ? y(Ie)("fold.unfold") : y(Ie)("fold.fold")), 1)
              ]),
              _: 1
            }, 8, ["class"])) : P("", !0),
            pe(g.$slots, "default", {}, void 0, !0)
          ], 512)
        ], 2),
        i("div", fn, [
          a.value && g.unfold && g.position == "line" ? (v(), b("div", {
            key: 0,
            class: "expand-btn",
            onClick: _[1] || (_[1] = (l) => t.value = !t.value)
          }, [
            pe(g.$slots, "expand", { fold: t.value }, () => [
              S(h, {
                type: "primary",
                plain: "",
                link: ""
              }, {
                default: I(() => [
                  de(j(t.value ? y(Ie)("fold.unfold") : y(Ie)("fold.fold")), 1)
                ]),
                _: 1
              })
            ], !0)
          ])) : P("", !0)
        ])
      ]);
    };
  }
});
const hn = /* @__PURE__ */ G(vn, [["__scopeId", "data-v-da18f185"]]), bt = ae(hn), mn = /* @__PURE__ */ Z({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = ie({
      type: "",
      email: "",
      password: ""
    }), s = (c, p, V) => {
      const H = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!p)
        return V("请输入邮箱!");
      H.test(p) || V("邮箱地址不合法"), V();
    }, u = (c, p, V) => {
      p ? p != a.password ? V("输入密码不一致") : V() : V("请确认密码");
    }, r = L(), g = L(), _ = ie({
      email: {
        required: !0,
        validator: s,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), h = ie({
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
        validator: u,
        trigger: "blur"
      }
    }), l = ie({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    he(
      () => t.modelValue,
      (c) => {
        switch (ke(() => d()), c) {
          case "login":
            g.value = _, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            g.value = _, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            g.value = h, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function $() {
      a.type = t.modelValue, r.value.validate((c) => {
        c && n("submit", a);
      });
    }
    function d() {
      r.value.resetFields();
    }
    return o({
      reset: d
    }), (c, p) => {
      const V = ce("el-button");
      return v(), X(y(Et), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: g.value,
        class: "select-none"
      }, {
        default: I(() => [
          S(y(Fe), { prop: "email" }, {
            default: I(() => [
              S(y(De), {
                modelValue: a.email,
                "onUpdate:modelValue": p[0] || (p[0] = (H) => a.email = H),
                placeholder: "请输入邮箱",
                onFocus: p[1] || (p[1] = (H) => c.$emit("toggle", 1)),
                onBlur: p[2] || (p[2] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          S(y(Fe), { prop: "password" }, {
            default: I(() => [
              S(y(De), {
                modelValue: a.password,
                "onUpdate:modelValue": p[3] || (p[3] = (H) => a.password = H),
                placeholder: "请输入密码",
                onFocus: p[4] || (p[4] = (H) => c.$emit("toggle", 2)),
                onBlur: p[5] || (p[5] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          _e(S(y(Fe), { prop: "checkPass" }, {
            default: I(() => [
              S(y(De), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": p[6] || (p[6] = (H) => a.checkPass = H),
                placeholder: "请确认密码",
                onFocus: p[7] || (p[7] = (H) => c.$emit("toggle", 2)),
                onBlur: p[8] || (p[8] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Se, c.modelValue == "forget"]
          ]),
          S(y(Fe), null, {
            default: I(() => [
              S(V, {
                style: { width: "100%" },
                type: "primary",
                onClick: $
              }, {
                default: I(() => [
                  de(j(l.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          S(y(Fe), null, {
            default: I(() => [
              i("div", {
                onClick: p[9] || (p[9] = (H) => c.$emit("update:modelValue", l.one.key))
              }, j(l.one.value), 1),
              i("div", {
                onClick: p[10] || (p[10] = (H) => c.$emit("update:modelValue", l.two.key))
              }, j(l.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const _n = /* @__PURE__ */ G(mn, [["__scopeId", "data-v-525985f8"]]), gn = { class: "u-sign" }, yn = { class: "sign-oauth" }, wn = /* @__PURE__ */ Z({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = L(!1), t = L("login"), a = L(0), s = ee(() => {
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
    return (u, r) => {
      const g = ce("u-divider"), _ = ce("u-icon"), h = ce("u-dialog");
      return v(), b("div", gn, [
        S(y(Oe), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: I(() => [
            de("登录/注册")
          ]),
          _: 1
        }),
        S(h, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: s.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: I(() => [
            S(_n, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => a.value = l),
              onSubmit: r[3] || (r[3] = (l) => u.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            S(g, null, {
              default: I(() => [
                de("其他方式登录")
              ]),
              _: 1
            }),
            i("div", yn, [
              S(_, { name: "QQ" }),
              S(_, { name: "weixin" }),
              S(_, { name: "gitee" }),
              S(_, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const $n = /* @__PURE__ */ G(wn, [["__scopeId", "data-v-8e737450"]]), bn = ae($n), xn = (e) => (fe("data-v-3a07e116"), e = e(), ve(), e), Cn = { class: "custom-contextmenu__menu" }, kn = ["onClick"], Mn = /* @__PURE__ */ xn(() => /* @__PURE__ */ i("div", { class: "arrow" }, null, -1)), Sn = /* @__PURE__ */ Z({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = ie({
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
    }), a = (_) => {
      t.tag = _, t.dropdownList[1].show = !_.meta.isAffix, s(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, s = () => {
      t.isShow = !1;
    };
    be(() => {
      window.addEventListener("click", s);
    }), je(() => {
      window.removeEventListener("click", s);
    });
    const { isShow: u, dropdownList: r, tag: g } = Ke(t);
    return o({
      openContextmenu: a
    }), (_, h) => {
      const l = ce("u-icon");
      return v(), X(lt, { name: "el-zoom-in-center" }, {
        default: I(() => [
          _e(i("div", {
            style: ze(`top: ${_.dropdown.y + 5}px; left: ${_.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            i("ul", Cn, [
              (v(!0), b(se, null, ue(y(r), ($, d) => (v(), b(se, { key: d }, [
                $.show ? (v(), b("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (c) => _.$emit("submit", d, y(g))
                }, [
                  S(l, {
                    innerHTML: $.icon
                  }, null, 8, ["innerHTML"]),
                  i("span", null, j($.title), 1)
                ], 8, kn)) : P("", !0)
              ], 64))), 128))
            ]),
            Mn
          ], 4), [
            [Se, y(u)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Ln = /* @__PURE__ */ G(Sn, [["__scopeId", "data-v-3a07e116"]]), zn = (e) => (fe("data-v-f7d57bb4"), e = e(), ve(), e), Fn = { class: "u-tabs" }, In = ["onClick", "onContextmenu"], Tn = { class: "select-none" }, Hn = /* @__PURE__ */ zn(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Bn = /* @__PURE__ */ Z({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: o }) {
    const n = e, t = L(), a = L(), s = it(n, "modelValue"), u = L(0), r = ie({
      x: 0,
      y: 0
    });
    he(
      () => [...s.value],
      ($, d) => {
        if (d) {
          if (console.log($, d), $.length > d.length) {
            let c = $.find((p) => !(d != null && d.includes(p)));
            s.value.forEach((p, V, H) => {
              H.findIndex((Y) => Y.path == p.path) != V && H.splice(V, 1);
            }), u.value = s.value.findIndex((p) => p.path == (c == null ? void 0 : c.path));
          }
        } else {
          let c = 1;
          s.value.forEach((p, V, H) => {
            H.findIndex((Y) => Y.path == p.path) != V && (H.splice(V, 1), u.value = H.findIndex((Y) => Y.path == p.path), c = 0);
          }), c && (u.value = s.value.length - 1);
        }
        ke(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), he(
      () => u.value,
      ($) => {
        o(
          "select",
          s.value.find((d, c) => c == $)
        );
      }
    );
    const g = ($) => {
      s.value.map((d, c) => {
        if (!d.meta.isAffix && $ == c)
          if (s.value.splice(c, 1), c == u.value) {
            let V = [c, c - 1].filter((H) => H >= 0 && H < s.value.length);
            u.value = V[0], u.value == c && o(
              "select",
              s.value.find((H, Y) => Y == $)
            );
          } else
            $ < u.value && (u.value -= 1);
      });
    }, _ = ($) => {
      let d = s.value.filter((p) => p.meta.isAffix);
      $ && !$.meta.isAffix && d.push($), s.value.length = 0, s.value.push(...d);
      let c = s.value.length - 1;
      u.value = c >= 0 ? c : 0;
    }, h = ($, d) => {
      switch ($) {
        case 0:
          o("refresh", d);
          break;
        case 1:
          let c = s.value.findIndex((p) => p.path == d.path);
          g(c), o("close", d);
          break;
        case 2:
          _(d), o("closeOther", d);
          break;
        case 3:
          _(), o("closeAll");
          break;
        case 4:
          o("fullScreen", d);
          break;
      }
    }, l = ($, d) => {
      const { clientX: c, clientY: p } = d;
      r.x = c, r.y = p, a.value.openContextmenu($);
    };
    return ($, d) => {
      const c = ce("u-icon");
      return v(), b("div", Fn, [
        S(y(Pe), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: I(() => [
            i("ul", {
              class: J([{ "classic-style": $.classic }, "u-tabs-ul"])
            }, [
              (v(!0), b(se, null, ue($.modelValue, (p, V) => (v(), b("li", {
                key: V,
                class: J([{ "is-active": u.value == V }, "u-tabs-ul-li"]),
                onClick: (H) => u.value = V,
                onContextmenu: Me((H) => l(p, H), ["prevent"])
              }, [
                i("span", Tn, j(p.meta.title), 1),
                p.meta.isAffix ? P("", !0) : (v(), X(c, {
                  key: 0,
                  onClick: Me((H) => h(1, p), ["stop"])
                }, {
                  default: I(() => [
                    Hn
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, In))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        S(Ln, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: h
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const An = /* @__PURE__ */ G(Bn, [["__scopeId", "data-v-f7d57bb4"]]), En = ae(An), Vn = { key: 0 }, Dn = /* @__PURE__ */ Z({
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
    const o = e, n = ie({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), s = ee(() => o.delay > 2e3 ? o.delay : 2e3), u = () => {
      ke(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          g();
        }, o.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / o.spped, n.twoTime = (n.textWidth + n.boxWidth) / o.spped;
    }, g = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, _ = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          g();
        },
        !1
      );
    };
    return be(() => {
      o.vertical || (u(), _());
    }), (h, l) => {
      const $ = ce("el-carousel-item"), d = ce("u-icon");
      return v(), b("div", {
        class: "u-notice-bar",
        style: ze({ background: h.background, height: `${h.height}px` })
      }, [
        h.vertical ? (v(), b("div", Vn, [
          S(y(Vt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: s.value
          }, {
            default: I(() => [
              (v(!0), b(se, null, ue(h.data, (c) => (v(), X($, { key: c }, {
                default: I(() => [
                  de(j(c), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (v(), b("div", {
          key: 1,
          style: ze({ color: h.color, fontSize: `${h.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          h.prefixIcon ? (v(), X(d, {
            key: 0,
            name: h.prefixIcon
          }, null, 8, ["name"])) : P("", !0),
          i("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            i("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, j(h.data), 513)
          ], 512),
          h.suffixIcon ? (v(), X(d, {
            key: 1,
            name: h.suffixIcon
          }, null, 8, ["name"])) : P("", !0)
        ], 4))
      ], 4);
    };
  }
});
const jn = /* @__PURE__ */ G(Dn, [["__scopeId", "data-v-723bc558"]]), On = ae(jn), Rn = (e) => (fe("data-v-11b4e56c"), e = e(), ve(), e), Un = { class: "u-anchor" }, Pn = { class: "toc-content" }, Yn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Nn = { class: "toc-items" }, qn = ["onClick"], Wn = /* @__PURE__ */ Z({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const o = e, n = L(0), t = L({}), a = L({}), s = (_) => {
      switch (_) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, u = () => {
      const _ = [];
      t.value.forEach(($) => {
        _.push($.offsetTop);
      });
      const l = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      _.forEach(($, d) => {
        l >= $ - 10 - o.targetOffset && (n.value = d);
      });
    }, r = (_) => {
      const h = t.value.item(_);
      console.log(h), o.scroll ? a.value.scrollTo({
        top: h.offsetTop - o.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: h.offsetTop - o.targetOffset,
        behavior: "smooth"
      });
    };
    be(() => {
    }), je(() => {
      a.value.removeEventListener("scroll", u);
    });
    let g;
    return be(() => {
      let _ = document.querySelector(o.container);
      g = new ResizeObserver((h) => {
        o.scroll ? a.value = document.querySelector(o.scroll) : a.value = window, t.value = _.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", u);
      }), g.observe(_);
    }), je(() => {
      a.value.removeEventListener("scroll", u), g.disconnect();
    }), (_, h) => {
      const l = ce("u-divider");
      return v(), b("div", Un, [
        i("nav", Pn, [
          Yn,
          S(l),
          i("ul", Nn, [
            (v(!0), b(se, null, ue(t.value, ($, d) => (v(), b("li", {
              key: d,
              class: J([{ active: n.value == d }, s($.nodeName)]),
              onClick: (c) => r(d)
            }, j($.innerText), 11, qn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Zn = /* @__PURE__ */ G(Wn, [["__scopeId", "data-v-11b4e56c"]]), Kn = ae(Zn), He = (e) => (fe("data-v-c739035a"), e = e(), ve(), e), Jn = { class: "card-box u-scrollbar" }, Gn = {
  key: 0,
  class: "history"
}, Xn = { class: "header" }, Qn = /* @__PURE__ */ He(() => /* @__PURE__ */ i("div", { class: "title" }, "历史搜索", -1)), eo = /* @__PURE__ */ He(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), to = {
  key: 1,
  class: "trending"
}, no = { class: "title" }, oo = /* @__PURE__ */ He(() => /* @__PURE__ */ i("span", null, "热搜", -1)), so = /* @__PURE__ */ He(() => /* @__PURE__ */ i("svg", {
  "data-v-5fe91717": "",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", {
    "data-v-5fe91717": "",
    d: "M12.8 5.2C13.9532 6.46 14.8 8.2 14.8 10C14.7039 12.8937 12.6843 15.1706 9.97973 15.8159C10.359 12.3442 7.77588 9.35406 7.77588 9.35406C7.77588 9.35406 7.99512 13.7064 6.79514 15.8104C4.03715 15.1428 2 12.7806 2 9.8C2 7.776 2.9336 5.9728 4.4 4.8C5.8608 3.7056 6.8 1.9656 6.8 0C9.684 0.4368 11.894 2.9264 11.894 5.932C11.894 6.5012 11.746 7.0652 11.6 7.6C12.1264 6.9024 12.6184 6.0876 12.8 5.2Z",
    fill: "#F53F3F"
  })
], -1)), ao = { class: "hot-list" }, lo = ["onClick"], io = { class: "trending-text u-ellipsis" }, ro = /* @__PURE__ */ He(() => /* @__PURE__ */ i("div", { class: "trending-mark" }, null, -1)), co = /* @__PURE__ */ Z({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: o }) {
    const n = e, t = ee(() => !(we(n.data.historySearchList) && we(n.data.hotSearchList)));
    return (a, s) => {
      const u = ce("u-icon");
      return _e((v(), b("div", Jn, [
        a.data.historySearchList.length != 0 ? (v(), b("div", Gn, [
          i("div", Xn, [
            Qn,
            S(y(ct), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: s[0] || (s[0] = (r) => a.$emit("onClear"))
            }, {
              default: I(() => [
                S(u, null, {
                  default: I(() => [
                    eo
                  ]),
                  _: 1
                }),
                de(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (v(!0), b(se, null, ue(a.data.historySearchList, (r, g) => (v(), X(y(Dt), {
            key: g,
            type: r.type,
            closable: "",
            onClose: (_) => a.$emit("onClose", r.name),
            onClick: (_) => a.$emit("submit", r.name)
          }, {
            default: I(() => [
              de(j(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : P("", !0),
        y(we)(a.data.hotSearchList) ? P("", !0) : (v(), b("div", to, [
          i("div", no, [
            oo,
            S(u, { style: { margin: "0 6px" } }, {
              default: I(() => [
                so
              ]),
              _: 1
            })
          ]),
          i("div", ao, [
            (v(!0), b(se, null, ue(a.data.hotSearchList, (r, g) => (v(), b("div", {
              key: g,
              class: "hot-item",
              onClick: (_) => a.$emit("submit", r)
            }, [
              i("div", {
                class: J(["trending-rank", { "trending-rank-top": g < 3 }])
              }, j(g + 1), 3),
              i("div", io, j(r), 1),
              ro
            ], 8, lo))), 128))
          ])
        ]))
      ], 512)), [
        [Se, a.data.visible && t.value]
      ]);
    };
  }
});
const uo = /* @__PURE__ */ G(co, [["__scopeId", "data-v-c739035a"]]), tt = (e) => (fe("data-v-df2be5d9"), e = e(), ve(), e), po = { class: "u-search" }, fo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, vo = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7187"
}, [
  /* @__PURE__ */ i("path", {
    d: "M344.16 960c-58.976-124.256-27.552-195.456 17.76-262.528 49.632-73.472 62.432-146.176 62.432-146.176s39.008 51.36 23.424 131.68c68.928-77.696 81.888-201.472 71.52-248.896 155.776 110.272 222.336 348.992 132.64 525.92C1129.024 686.528 770.56 277.376 708.16 231.264c20.8 46.08 24.736 124.128-17.28 161.984C619.744 120 443.84 64 443.84 64c20.8 140.928-75.392 295.008-168.16 410.144-3.264-56.192-6.72-94.976-35.872-148.736-6.56 102.08-83.552 185.28-104.416 287.552-28.256 138.496 21.152 239.904 208.832 347.008L344.16 960zM344.16 960",
    "p-id": "7188",
    fill: "#F53F3F"
  })
], -1)), ho = ["data-before", "data-after"], mo = ["placeholder"], _o = { class: "btn" }, go = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-78e17ca8": ""
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }),
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  })
], -1)), yo = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ i("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), wo = /* @__PURE__ */ Z({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = L({}), s = it(t.config, "keywords"), u = L(!1), r = L(0), g = L(!0), _ = L(), h = ie({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), l = ie({
      search: t.config.search || "",
      visible: !1,
      historySearchList: Ve.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    he(
      () => t.config.hotSearchList,
      (B) => {
        l.hotSearchList = B;
      }
    ), he(
      () => t.config.search,
      (B) => {
        l.search = B || "";
      }
    );
    const $ = ee(() => {
      let B = s.value[r.value];
      return u.value || l.search ? "" : B;
    }), d = ee(() => {
      let B = typeof s.value[r.value + 1] > "u" ? s.value[0] : s.value[r.value + 1];
      return u.value || l.search ? "" : B;
    }), c = ee(() => {
      let B = s.value[r.value];
      return u.value ? B : "";
    }), p = ee(() => !u.value && !l.search && g.value), V = (B) => {
      if (B != null && B.trim() != "") {
        let E = (A, N) => Math.round(Math.random() * (N - A)) + A, M = (A) => l.historySearchList.filter((N) => N.name == A).length != 0;
        if (B && l.historySearchList)
          M(B) || l.historySearchList.unshift({ name: B, type: h.types[E(0, 3)] });
        else {
          let A = u.value ? c : $;
          B = A.value, M(A.value) || l.historySearchList.unshift({ name: A.value, type: h.types[E(0, 3)] });
        }
        Ve.set("searchHistory", l.historySearchList);
      }
      l.search = B, a.value.focus(), n("submit", B);
    }, H = (B) => {
      l.historySearchList.findIndex((E) => E.name == B), l.historySearchList.splice(
        l.historySearchList.findIndex((E) => E.name == B),
        1
      ), Ve.set("searchHistory", l.historySearchList);
    }, Y = () => {
      l.historySearchList.length = 0, Ve.remove("searchHistory");
    }, ne = (B) => {
      if (B.pseudoElement == "::after") {
        g.value = !1;
        let E = typeof s.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = E, setTimeout(() => {
          g.value = !0;
        }, 3e3);
      }
    };
    return o({
      close: () => l.visible = !1
    }), (B, E) => {
      const M = ce("u-icon");
      return v(), b("div", po, [
        i("div", {
          class: J(["search", { active: u.value }])
        }, [
          i("div", fo, [
            S(M, null, {
              default: I(() => [
                vo
              ]),
              _: 1
            })
          ]),
          i("label", {
            ref_key: "labelRef",
            ref: _,
            "data-before": $.value,
            "data-after": d.value,
            class: J({ animate: p.value }),
            onAnimationend: ne
          }, [
            _e(i("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": E[0] || (E[0] = (A) => l.search = A),
              type: "text",
              placeholder: c.value,
              onFocus: E[1] || (E[1] = () => {
                u.value = !0, l.visible = !0;
              }),
              onBlur: E[2] || (E[2] = (A) => u.value = !1),
              onKeyup: E[3] || (E[3] = Ce((A) => V(l.search), ["enter"]))
            }, null, 40, mo), [
              [Ft, l.search]
            ])
          ], 42, ho),
          i("div", _o, [
            _e(S(M, {
              class: "close",
              onClick: E[4] || (E[4] = (A) => l.search = "")
            }, {
              default: I(() => [
                go
              ]),
              _: 1
            }, 512), [
              [Se, l.search]
            ]),
            i("div", {
              class: "search-btn",
              onClick: E[5] || (E[5] = (A) => V(l.search))
            }, [
              S(M, null, {
                default: I(() => [
                  yo
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        _e(S(uo, {
          data: l,
          onOnClose: H,
          onOnClear: Y,
          onSubmit: V
        }, null, 8, ["data"]), [
          [y(rt), () => l.visible = !1, _.value]
        ])
      ]);
    };
  }
});
const $o = /* @__PURE__ */ G(wo, [["__scopeId", "data-v-df2be5d9"]]), bo = ae($o), xt = (e, o) => {
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
}, xo = (e) => {
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
}, v2 = (e, o, n) => {
  let t = (e - 1) * o;
  return t + o >= n.length ? n.slice(t, n.length) : n.slice(t, t + o);
}, Ct = (e) => (fe("data-v-f75472b5"), e = e(), ve(), e), Co = { class: "message" }, ko = { class: "chat-list" }, Mo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), So = { class: "content" }, Lo = {
  key: 0,
  class: "username"
}, zo = ["innerHTML"], Fo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), Io = /* @__PURE__ */ Z({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: o }) {
    const { allEmoji: n } = re(Be), t = L();
    return o({
      scroll: () => {
        ke(() => {
          const s = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(s.offsetTop);
        });
      }
    }), (s, u) => (v(), b("div", Co, [
      S(y(Pe), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: I(() => [
          i("div", ko, [
            (v(!0), b(se, null, ue(s.data, (r, g) => (v(), b("div", {
              key: g,
              class: J([{ self: s.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                S(y(Je), null, {
                  default: I(() => [
                    Mo
                  ]),
                  _: 1
                })
              ]),
              i("div", So, [
                s.userId != r.id ? (v(), b("div", Lo, j(r.username), 1)) : P("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: y(xt)(y(n), r.content)
                }, null, 8, zo)
              ]),
              Fo
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const To = /* @__PURE__ */ G(Io, [["__scopeId", "data-v-f75472b5"]]), qe = (e) => (fe("data-v-18726a6b"), e = e(), ve(), e), Ho = { class: "u-chat" }, Bo = { class: "header" }, Ao = /* @__PURE__ */ qe(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1318 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1318.502489 432.779052c0-231.790522-209.29842-419.704826-467.458992-419.704826s-467.56979 188.357498-467.56979 419.704826 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319412-19.168145L1165.822116 742.350141C1259.336074 665.56676 1318.502489 555.433023 1318.502489 432.779052z",
    fill: "#612273",
    "p-id": "10993"
  }),
  /* @__PURE__ */ i("path", {
    d: "M1034.304263 745.784895a509.673231 509.673231 0 0 1-183.482363 33.239559c-244.532352 0-445.077689-168.524562-465.353819-383.25211-1.107985 12.07704-1.883575 24.264878-1.883575 36.563514 0 231.790522 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319411-19.168145 25.262064 25.262064 0 0 0-7.5343-17.284571zM1165.822116 669.223112l2.769964 70.689461C1260.44406 663.239991 1318.502489 553.992642 1318.502489 432.779052a366.632331 366.632331 0 0 0-1.883575-36.785111 403.971435 403.971435 0 0 1-150.796798 273.229171z",
    fill: "#612273",
    opacity: ".2",
    "p-id": "10994"
  }),
  /* @__PURE__ */ i("path", {
    d: "M383.25211 432.779052a383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978C173.510496 258.160571 0 413.943302 0 606.178749c0 101.713049 48.97295 193.011037 126.421121 256.609392l-5.761524 148.470028a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696c-177.831638-59.388011-304.91755-212.733175-304.91755-393.113179z",
    fill: "#EB3D72",
    "p-id": "10995"
  }),
  /* @__PURE__ */ i("path", {
    d: "M342.256654 391.672798c0 117.557239 53.958883 223.59143 140.714132 299.71002a391.008007 391.008007 0 0 1-99.718676-258.603766 383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978-7.091106 0-14.071413 0-21.05172 0.553993a375.939407 375.939407 0 0 0-24.375677 132.958234zM630.111231 802.181346a407.627786 407.627786 0 0 1-283.533434 110.798528 424.136767 424.136767 0 0 1-152.12638-27.699632l-71.686647 71.686648-2.105173 54.291279a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696 486.294741 486.294741 0 0 1-58.058429-23.710885zM85.425665 821.792686l-5.761523-4.985934c1.883575 2.215971 3.656351 4.431941 5.650725 6.647911z",
    fill: "#EB3D72",
    opacity: ".5",
    "p-id": "10996"
  }),
  /* @__PURE__ */ i("path", {
    d: "M833.426531 332.395585c64.263147-10.193465 64.041549-66.479117 62.601169-75.342999s-15.400995-54.291279-59.942004-47.200173S799.078987 254.836615 799.078987 254.836615a28.475222 28.475222 0 1 0 56.174854-8.97468s6.315516 3.323956 8.30989 20.27613-11.966241 29.029214-35.455529 33.239559-88.638823-19.943735-104.039819-115.452067C709.110582 96.39472 781.57282 28.253625 838.966457 13.185025a55.399264 55.399264 0 0 0-64.041549-5.318329c-56.064055 35.123134-97.170309 109.579745-85.536464 182.817571 14.957801 93.846354 79.664142 151.904783 144.038087 141.711318zM203.980091 573.825579a53.072495 53.072495 0 0 0 33.90435-67.919498c-2.659165-6.537113-21.162519-38.225492-53.51569-25.040467a30.026401 30.026401 0 0 0-19.832936 40.773858 22.159706 22.159706 0 1 0 40.773858-16.619779s5.318329 1.329582 9.861069 13.739017-3.988747 24.043281-21.05172 31.023588-70.02467 0.553993-98.832288-68.695087C68.916685 417.599654 110.798528 353.558104 151.904783 332.395585a42.879031 42.879031 0 0 0-48.97295 7.423502 146.918849 146.918849 0 0 0-32.574767 152.458775c27.810431 68.141095 86.866046 100.605064 133.623025 81.547717z",
    fill: "#FED150",
    "p-id": "10997"
  })
], -1)), Eo = /* @__PURE__ */ qe(() => /* @__PURE__ */ i("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ i("div", null, "聊天室"),
  /* @__PURE__ */ i("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Vo = {
  id: "chat-footer",
  class: "footer"
}, Do = /* @__PURE__ */ qe(() => /* @__PURE__ */ i("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7186"
}, [
  /* @__PURE__ */ i("path", {
    d: "M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448c247.008 0 448 200.96 448 448S757.984 960 510.944 960zM510.944 128c-211.744 0-384 172.256-384 384 0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C894.944 300.256 722.688 128 510.944 128zM512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48l0-64c0-26.528 21.472-48 48-48s48 21.472 48 48l0 64C416 493.696 394.496 515.2 368 515.2zM656 515.2c-26.496 0-48-21.472-48-48l0-64c0-26.528 21.504-48 48-48s48 21.472 48 48l0 64C704 493.696 682.496 515.2 656 515.2z",
    "p-id": "7187"
  })
], -1)), jo = /* @__PURE__ */ qe(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), Oo = /* @__PURE__ */ Z({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(""), s = L(), u = (h) => {
      const { ctrlKey: l, key: $ } = h;
      l && $ == "Enter" && g();
    }, r = () => {
      a.value = "", s.value.scroll();
    }, g = () => {
      let h = a.value;
      h.trim() ? (h = h.replace(/\n/g, "<br/>"), o("submit", { clear: r, content: h })) : et({ type: "error", message: "内容不能为空" });
    }, _ = (h) => {
      let l = document.getElementById("emojiInput"), $ = l.selectionStart, d = l.selectionEnd, c = l.value;
      if ($ === null || d === null)
        return;
      let p = c.substring(0, $) + h + c.substring(d);
      l.value = p, l.focus(), l.selectionStart = $ + h.length, l.selectionEnd = $ + h.length, a.value = p;
    };
    return ge(Be, n.emoji), (h, l) => {
      const $ = ce("u-icon"), d = ce("u-emoji");
      return v(), b("div", Ho, [
        i("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", Bo, [
            S($, { size: "32" }, {
              default: I(() => [
                Ao
              ]),
              _: 1
            }),
            Eo
          ]),
          S(To, {
            ref_key: "messageRef",
            ref: s,
            data: h.data,
            "user-id": h.userId
          }, null, 8, ["data", "user-id"]),
          i("div", Vo, [
            S(y(De), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": l[0] || (l[0] = (c) => a.value = c),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: Ce(u, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            S(d, {
              style: { margin: "0 8px 0" },
              emoji: h.emoji,
              placement: "top-end",
              onAddEmoji: _
            }, {
              default: I(() => [
                Do
              ]),
              _: 1
            }, 8, ["emoji"]),
            S($, {
              size: "18",
              class: J([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: g
            }, {
              default: I(() => [
                jo
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        S(y(Oe), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (c) => t.value = !t.value)
        }, {
          default: I(() => [
            de("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Ro = /* @__PURE__ */ G(Oo, [["__scopeId", "data-v-18726a6b"]]), Uo = ae(Ro), Po = (e) => (fe("data-v-146b85ab"), e = e(), ve(), e), Yo = { class: "u-emoji" }, No = { class: "face-tooltip-head select-none" }, qo = ["onClick"], Wo = ["src"], Zo = { class: "emoji-body select-none" }, Ko = { style: { padding: "0 5px" } }, Jo = ["onClick"], Go = { class: "emoji-btn select-none" }, Xo = { key: 0 }, Qo = /* @__PURE__ */ Po(() => /* @__PURE__ */ i("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ i("path", {
    "data-v-9fe533ba": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
  })
], -1)), es = /* @__PURE__ */ Z({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: o }) {
    const n = e, t = L(0), a = L(0), s = L(new Array(2)), { emojiList: u, faceList: r } = n.emoji;
    function g(h) {
      switch (t.value = h, h) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, s.value[1] = u[1];
          break;
      }
    }
    function _() {
      s.value[0] = u[0];
    }
    return (h, l) => (v(), b("div", Yo, [
      S(y(ut), {
        placement: h.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: _
      }, {
        reference: I(() => [
          i("div", Go, [
            h.$slots.default ? pe(h.$slots, "default", { key: 1 }, void 0, !0) : (v(), b("div", Xo, [
              Qo,
              i("span", null, j(h.$u("emoji.content")), 1)
            ]))
          ])
        ]),
        default: I(() => [
          i("div", No, [
            (v(!0), b(se, null, ue(y(r), ($, d) => (v(), b("label", {
              key: d,
              class: J(t.value == d ? "active" : ""),
              onClick: (c) => g(d)
            }, [
              i("img", {
                src: $,
                alt: ""
              }, null, 8, Wo)
            ], 10, qo))), 128))
          ]),
          i("div", Zo, [
            i("div", {
              class: "emjio-container",
              style: ze({ transform: `translateX(${a.value}%)` })
            }, [
              (v(!0), b(se, null, ue(s.value, ($, d) => (v(), b("div", {
                key: d,
                class: "emoji-wrapper"
              }, [
                S(y(Pe), null, {
                  default: I(() => [
                    i("div", Ko, [
                      (v(!0), b(se, null, ue($, (c, p) => (v(), b("span", {
                        key: p,
                        class: "emoji-item",
                        onClick: (V) => h.$emit("addEmoji", p)
                      }, [
                        S(y(dt), {
                          src: c,
                          title: String(p),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Jo))), 128))
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
const ts = /* @__PURE__ */ G(es, [["__scopeId", "data-v-146b85ab"]]), Be = Symbol(), kt = ae(ts), ns = /* @__PURE__ */ Z({
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
    const n = e, t = ie({
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
    }), a = () => n.endAmount > n.startAmount, s = ee(() => {
      const h = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let $ = l.split("."), d = $[0], c = $.length > 1 ? n.decimalSeparator + $[1] : "", p = !isNaN(parseFloat(n.separator));
      if (n.separator && !p)
        for (; h.test(d); )
          d = d.replace(h, "$1" + n.separator + "$2");
      return d + c;
    }), u = ee(() => `${n.prefix}${s.value}${n.suffix}`);
    be(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      g(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(_);
    }, g = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, _ = (h) => {
      t.timestamp = h, t.startTimestamp || (t.startTimestamp = h);
      let l = h - t.startTimestamp;
      t.remaining = t.currentDuration - l, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(_) : o("finished");
    };
    return (h, l) => (v(), b("span", null, j(u.value), 1));
  }
}), os = ae(ns), at = /* @__PURE__ */ Z({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const o = L({}), { showInfo: n } = re(Qe), t = re(Ne), a = () => Te("div", t.card(o.value));
    return (s, u) => y(t).card ? (v(), X(y(ut), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: u[0] || (u[0] = () => y(n)(s.uid, (r) => o.value = r))
    }, {
      reference: I(() => [
        pe(s.$slots, "default")
      ]),
      default: I(() => [
        S(a)
      ]),
      _: 3
    })) : pe(s.$slots, "default", { key: 1 });
  }
}), nt = (e) => (fe("data-v-5382742e"), e = e(), ve(), e), ss = ["id"], as = { class: "comment-sub" }, ls = ["href", "target"], is = { key: 0 }, rs = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, cs = { class: "comment-primary" }, us = { class: "comment-main" }, ds = { class: "user-info" }, ps = ["href", "target"], fs = { class: "username" }, vs = {
  class: "name",
  style: { "max-width": "10em" }
}, hs = {
  key: 0,
  blank: "true",
  class: "rank"
}, ms = {
  key: 0,
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, _s = { class: "time" }, gs = { class: "content" }, ys = ["innerHTML"], ws = {
  class: "imgbox",
  style: { display: "flex" }
}, $s = { class: "action-box select-none" }, bs = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
  t: "1650360973068",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1168",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ i("path", {
    d: "M547.968 138.88c6.656-4.672 14.08-6.976 20.48-5.056 6.08 1.792 22.848 10.752 40.192 56.128 8.576 22.4 27.264 81.536-5.632 197.504a45.44 45.44 0 0 0 42.88 57.984l217.6 3.008h0.448a53.12 53.12 0 0 1 20.096 3.328 16.256 16.256 0 0 1 5.568 3.648 14.464 14.464 0 0 1 3.264 6.4c2.176 7.808 4.608 33.984-0.256 77.248-4.672 41.984-15.936 97.408-38.784 162.368-19.136 54.336-43.52 100.48-81.472 161.792a56.384 56.384 0 0 0-1.664 2.496l-0.128 0.128-1.408 2.112a7.872 7.872 0 0 1-1.28 1.472 3.84 3.84 0 0 1-1.28 0.64 20.48 20.48 0 0 1-6.848 0.96H356.032V421.44c19.712-10.624 40.704-24.576 62.592-47.616 25.472-26.88 51.008-64.768 78.208-121.6 5.568-11.584 9.856-24.384 13.632-36.032l3.072-9.856c2.688-8.448 5.184-16.384 8.064-24.32 8.064-22.4 16.128-36.032 26.368-43.136z m120.96 27.968c-20.48-53.44-48-84.736-81.984-94.912-33.6-9.984-61.952 4.16-76.032 14.08-27.584 19.264-41.28 49.6-50.048 74.048-3.392 9.344-6.464 19.2-9.216 27.968l-2.688 8.448a227.84 227.84 0 0 1-10.432 27.904c-25.28 52.928-47.36 84.544-66.752 104.96-18.944 19.968-36.48 30.464-55.168 39.808a45.376 45.376 0 0 0-25.088 40.576l-0.064 480.64c0 24.96 20.224 45.248 45.184 45.248h423.04c21.76 0 38.144-6.912 50.048-16.96a71.808 71.808 0 0 0 14.528-16.896l0.128-0.256 0.128-0.128 0.832-0.96 1.152-1.92c39.424-63.872 66.816-114.688 88.256-175.68a810.24 810.24 0 0 0 42.048-176.64c5.12-45.632 3.776-81.664-1.6-101.376a77.952 77.952 0 0 0-45.568-52.288 116.544 116.544 0 0 0-45.44-8.64l-192.768-2.688c28.096-115.072 10.048-181.568-2.496-214.336z m-604.864 247.04a45.184 45.184 0 0 1 45.12-47.296h67.008c24.96 0 45.184 20.288 45.184 45.248v480.64c0 24.96-20.224 45.12-45.184 45.12H131.84a45.184 45.184 0 0 1-45.12-43.072l-22.656-480.64z",
    "p-id": "1169"
  })
], -1)), xs = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ i("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), Cs = { key: 2 }, ks = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1320",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ i("path", {
    d: "M147.264 647.296V220.928c0-49.536 40.128-89.728 89.6-89.728H793.6c49.536 0 89.728 40.192 89.728 89.728v426.368c0 49.536-40.128 89.728-89.6 89.728h-145.216a47.04 47.04 0 0 0-28.16 9.408l-194.56 145.792a3.392 3.392 0 0 1-5.12-1.984l-26.752-116.672a47.04 47.04 0 0 0-45.824-36.544H236.992a89.728 89.728 0 0 1-89.728-89.728zM236.864 64A156.928 156.928 0 0 0 80 220.928l0.064 426.368a156.928 156.928 0 0 0 156.928 156.928h94.976l23.232 101.312 0.064 0.448a70.592 70.592 0 0 0 109.696 40.832l190.208-142.592H793.6a156.928 156.928 0 0 0 156.928-156.928l-0.064-426.368A156.928 156.928 0 0 0 793.536 64H236.928z m69.44 442.496a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z m268.8-65.344a65.344 65.344 0 1 1-130.752 0 65.344 65.344 0 0 1 130.752 0z m138.368 65.344a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z",
    "p-id": "1321"
  })
], -1)), Ms = { key: 0 }, Ss = /* @__PURE__ */ Z({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = ie({
      active: !1
    }), t = L(), a = L(), s = ee(() => {
      let M = o.data.contentImg;
      return we(M) ? [] : M == null ? void 0 : M.split("||");
    }), { allEmoji: u } = re(Be), { like: r, user: g, relativeTime: _, aTarget: h, showLevel: l, showLikes: $, showAddress: d, showHomeLink: c, showReply: p } = re(
      Qe
    );
    function V() {
      n.active = !n.active, n.active && ke(() => {
        var M;
        (M = t.value) == null || M.focus();
      });
    }
    function H(M) {
      var N;
      const A = M.target;
      (N = a.value) != null && N.contains(A) || (n.active = !1);
    }
    const Y = re(Ne), ne = () => Te("div", Y.info(o.data)), B = () => Te("div", Y.operate(o.data)), E = ee(() => xt(u, o.data.content));
    return (M, A) => (v(), b("div", {
      id: M.data.id,
      class: J(["comment", { reply: o.reply }])
    }, [
      i("div", as, [
        S(at, {
          uid: y(xe)(M.data.uid)
        }, {
          default: I(() => [
            i("a", {
              href: M.data.user.homeLink,
              target: y(h),
              class: J([{ "pointer-events-none": !y(c) }, "no-underline"]),
              style: { display: "block" }
            }, [
              S(y(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: M.data.user.avatar
              }, {
                default: I(() => [
                  M.data.user.avatar ? (v(), b("span", is, j(M.data.user.username), 1)) : (v(), b("img", rs))
                ]),
                _: 1
              }, 8, ["src"])
            ], 10, ls)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      i("div", cs, [
        i("div", us, [
          i("div", ds, [
            S(at, {
              uid: y(xe)(M.data.uid)
            }, {
              default: I(() => [
                i("a", {
                  href: M.data.user.homeLink,
                  target: y(h),
                  class: J([{ "pointer-events-none": !y(c) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  i("div", fs, [
                    i("span", vs, j(M.data.user.username), 1),
                    y(l) ? (v(), b("span", hs, [
                      S(y(Le), {
                        size: "24",
                        innerHTML: y(xo)(M.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : P("", !0)
                  ])
                ], 10, ps)
              ]),
              _: 1
            }, 8, ["uid"]),
            y(d) ? (v(), b("span", ms, "   " + j(M.data.address), 1)) : P("", !0),
            y(Y).info ? (v(), X(ne, { key: 1 })) : P("", !0),
            i("time", _s, j(y(_) ? y(Xe)(M.data.createTime).fromNow() : M.data.createTime), 1)
          ]),
          i("div", gs, [
            S(y(bt), { unfold: "" }, {
              default: I(() => [
                i("div", { innerHTML: E.value }, null, 8, ys),
                i("div", ws, [
                  (v(!0), b(se, null, ue(s.value, (N, W) => (v(), X(y(dt), {
                    key: W,
                    src: N,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": s.value,
                    "initial-index": W
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          i("div", $s, [
            y($) ? (v(), b("div", {
              key: 0,
              class: "item",
              onClick: A[0] || (A[0] = (N) => y(r)(y(xe)(M.data.id)))
            }, [
              y(g).likeIds && y(g).likeIds.map(String).indexOf(y(xe)(M.data.id)) == -1 ? (v(), X(y(Le), { key: 0 }, {
                default: I(() => [
                  bs
                ]),
                _: 1
              })) : (v(), X(y(Le), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: I(() => [
                  xs
                ]),
                _: 1
              })),
              M.data.likes != 0 ? (v(), b("span", Cs, j(M.data.likes), 1)) : P("", !0)
            ])) : P("", !0),
            y(p) ? (v(), b("div", {
              key: 1,
              ref_key: "btnRef",
              ref: a,
              class: J(["item", { active: n.active }]),
              onClick: V
            }, [
              S(y(Le), null, {
                default: I(() => [
                  ks
                ]),
                _: 1
              }),
              i("span", null, j(n.active ? M.$u("comment.cancelReply") : M.$u("comment.reply")), 1)
            ], 2)) : P("", !0),
            y(Y).operate ? (v(), X(B, { key: 2 })) : P("", !0)
          ]),
          n.active ? (v(), b("div", Ms, [
            S(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": y(xe)(M.id),
              placeholder: `${M.$u("comment.placeholder2")}@${M.data.user.username}...`,
              reply: M.data,
              "content-btn": M.$u("comment.contentBtn2"),
              style: { "margin-top": "12px" },
              onHide: H,
              onClose: A[1] || (A[1] = (N) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply", "content-btn"])
          ])) : P("", !0)
        ]),
        pe(M.$slots, "default", {}, void 0, !0)
      ])
    ], 10, ss));
  }
});
const Mt = /* @__PURE__ */ G(Ss, [["__scopeId", "data-v-5382742e"]]), Ls = (e) => (fe("data-v-41f8c911"), e = e(), ve(), e), zs = {
  key: 0,
  class: "reply-box"
}, Fs = { class: "reply-list" }, Is = {
  key: 0,
  class: "fetch-more"
}, Ts = { key: 0 }, Hs = { key: 1 }, Bs = { key: 0 }, As = /* @__PURE__ */ Ls(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", {
    "data-v-d6f79dbc": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
  })
], -1)), Es = {
  key: 1,
  class: "fetch-more"
}, Vs = /* @__PURE__ */ Z({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = ie({
      loading: !1,
      over: !1,
      currentPage: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: s } = re(Ze), { page: u } = re(Ze), r = ee(() => {
      let d = {
        total: 0,
        length: 0,
        list: []
      };
      if (o.data) {
        let c = o.data.list.length;
        d = {
          total: o.data.total,
          length: c,
          list: o.data.list
        };
      }
      if (!n.over) {
        let c = d.list.slice(0, a);
        d.list = c;
      }
      return u && (d.list = d.list.slice(0, n.pageSize)), d;
    });
    he(
      () => {
        var d;
        return (d = o.data) == null ? void 0 : d.total;
      },
      (d) => {
        if (d) {
          let c = Math.ceil(d / n.pageSize), p = n.currentPage > c ? c : n.currentPage;
          p = p < 1 ? 1 : p, n.currentPage != p && h(p);
        }
      }
    );
    const g = () => {
      n.over = !0;
    }, _ = (d) => {
      s.value.forEach((c) => {
        c.id == o.id && c.reply && (c.reply = d);
      });
    }, h = (d) => {
      console.log(d), n.currentPage = d, t(o.id, d, n.pageSize, (c) => _(c));
    }, l = (d) => {
      h(d);
    }, $ = (d) => {
      n.pageSize = d, t(o.id, n.currentPage, d, (c) => _(c));
    };
    return (d, c) => r.value.length > 0 ? (v(), b("div", zs, [
      i("div", Fs, [
        (v(!0), b(se, null, ue(r.value.list, (p, V) => (v(), X(Mt, {
          id: d.id,
          key: V,
          data: p,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > y(a) ? (v(), b("div", Is, [
          n.loading ? (v(), b("span", Ts, j(d.$u("comment.more.loading")), 1)) : (v(), b("div", Hs, [
            n.over ? P("", !0) : (v(), b("div", Bs, [
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: g
              }, [
                de(j(d.$u("comment.more.prefixTotal")) + j(r.value.total) + j(d.$u("comment.more.suffixTotal")) + " ", 1),
                As
              ])
            ]))
          ]))
        ])) : P("", !0),
        n.over && y(u) ? (v(), b("div", Es, [
          S(y(jt), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "current-page": n.currentPage,
            "page-size": n.pageSize,
            onCurrentChange: l,
            onSizeChange: $
          }, null, 8, ["total", "current-page", "page-size"])
        ])) : P("", !0)
      ])
    ])) : P("", !0);
  }
});
const Ds = /* @__PURE__ */ G(Vs, [["__scopeId", "data-v-41f8c911"]]), js = {
  key: 0,
  class: "comment-list"
}, Os = /* @__PURE__ */ Z({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (o, n) => o.data ? (v(), b("div", js, [
      (v(!0), b(se, null, ue(o.data, (t) => (v(), X(Mt, {
        id: y(xe)(t.id),
        key: y(xe)(t.id),
        data: t
      }, {
        default: I(() => [
          S(Ds, {
            id: y(xe)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : P("", !0);
  }
});
const Rs = { class: "u-comment" }, Us = {
  key: 0,
  class: "comment-form"
}, Ps = { class: "header" }, Ys = { class: "header-title" }, Ns = { class: "content" }, qs = { class: "avatar-box" }, Ws = { key: 0 }, Zs = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Ks = {
  key: 1,
  class: "comment-list-wrapper"
}, Js = { class: "title" }, Gs = /* @__PURE__ */ Z({
  name: "UComment",
  __name: "comment",
  props: {
    config: {},
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "focus", "cancel", "getMentionList", "mentionSearch"],
  setup(e, { expose: o, emit: n }) {
    const t = e, {
      user: a,
      comments: s,
      replyShowSize: u,
      aTarget: r,
      showForm: g = !0,
      showContent: _ = !0,
      showLevel: h = !0,
      showLikes: l = !0,
      showAddress: $ = !0,
      showHomeLink: d = !0,
      showReply: c = !0,
      mentionConfig: p
    } = Ke(t.config), V = ({ content: D, parentId: x, reply: m, files: f, clear: k }) => {
      const w = (F) => {
        if (k(), F)
          if (x) {
            let T = s.value.find((R) => R.id == x);
            if (T) {
              let R = T.reply;
              R ? (R.list.unshift(F), R.total++) : T.reply = {
                total: 1,
                list: [F]
              };
            }
          } else
            s.value.unshift(F);
      };
      n("submit", { content: D, parentId: x, reply: m, files: f, mentionList: N.value, finish: w });
    }, H = {
      upload: t.upload,
      submit: V,
      focus: () => n("focus")
    };
    ge(_t, H), ge("cancelFn", () => n("cancel"));
    const Y = (D, x) => {
      let m = null;
      s.value.forEach((f) => {
        var k;
        if (f.id == D)
          m = f;
        else {
          let w = (k = f.reply) == null ? void 0 : k.list.find((F) => F.id == D);
          w && (m = w);
        }
      }), m && !we(m.likes) && (m.likes += x);
    }, B = {
      user: a,
      like: (D) => {
        const x = t.config.user.likeIds;
        x && n("like", D, () => {
          if (x.findIndex((m) => m == D) == -1)
            x.push(D), Y(D, 1);
          else {
            let m = x.findIndex((f) => f == D);
            m != -1 && (x.splice(m, 1), Y(D, -1));
          }
        });
      },
      relativeTime: $e(t.relativeTime, !1),
      showInfo: (D, x) => n("showInfo", D, x),
      aTarget: $e(r, "_blank"),
      showLevel: h,
      showLikes: l,
      showAddress: $,
      showHomeLink: d,
      showReply: c
    };
    ge(Qe, B);
    const E = {
      page: t.page,
      replyPage: (D, x, m, f) => {
        n("replyPage", { parentId: D, pageNum: x, pageSize: m, finish: f });
      },
      replyShowSize: $e(u == null ? void 0 : u.value, 3),
      comments: s
    };
    ge(Ze, E);
    const M = (D) => {
      const { parentId: x, id: m } = D;
      if (x) {
        let f = s.value.find((w) => w.id == x), k = f == null ? void 0 : f.reply;
        if (k) {
          let w = k.list.findIndex((F) => F.id == m);
          w != -1 && (k.list.splice(w, 1), k.total--);
        }
      } else {
        let f = s.value.findIndex((k) => k.id == m);
        f != -1 && s.value.splice(f, 1);
      }
    }, A = L(null), N = L([]);
    function W(D) {
      N.value = D;
    }
    function U() {
      return N.value;
    }
    const me = ft((D) => {
      n("mentionSearch", D);
    }, 300);
    return ge(Be, t.config.emoji), ge("mentionConfig", p), ge(Ne, It()), ge("changeMetionList", W), ge("mentionSearch", me), o({
      remove: M,
      mentionList: N,
      getMentionList: U,
      setMentionShow: (D) => {
        A.value.setMentionShow(D);
      }
    }), (D, x) => (v(), b("div", Rs, [
      y(g) ? (v(), b("div", Us, [
        pe(D.$slots, "header", {}, () => [
          i("div", Ps, [
            i("span", Ys, j(D.$u("comment.headerTitle")), 1)
          ])
        ], !0),
        i("div", Ns, [
          i("div", qs, [
            S(y(Je), {
              size: 40,
              src: D.config.user.avatar
            }, {
              default: I(() => [
                D.config.user.username ? (v(), b("span", Ws, j(D.config.user.username), 1)) : (v(), b("img", Zs))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          S(gt, Tt(D.$attrs, {
            ref_key: "inputBox",
            ref: A,
            placeholder: D.$u("comment.placeholder"),
            "content-btn": D.$u("comment.contentBtn")
          }), null, 16, ["placeholder", "content-btn"])
        ])
      ])) : P("", !0),
      y(_) ? (v(), b("div", Ks, [
        pe(D.$slots, "default", {}, () => [
          i("div", Js, j(D.$u("comment.title")), 1)
        ], !0),
        S(Os, { data: y(s) }, null, 8, ["data"])
      ])) : P("", !0)
    ]));
  }
});
const Xs = /* @__PURE__ */ G(Gs, [["__scopeId", "data-v-2e53a9cd"]]), Qs = ae(Xs), e2 = [
  Qs,
  v1,
  b1,
  I1,
  A1,
  $t,
  bt,
  Le,
  bn,
  En,
  On,
  Kn,
  bo,
  Uo,
  kt,
  os
];
const t2 = (e) => {
  e2.forEach((o) => {
    e.use(o);
  }), e.config.globalProperties.$u = Ie;
}, h2 = {
  install: t2
};
export {
  g2 as ElAvatar,
  y2 as ElButton,
  w2 as ElCarousel,
  $2 as ElDialog,
  b2 as ElDropdown,
  x2 as ElDropdownItem,
  C2 as ElDropdownMenu,
  k2 as ElEmpty,
  M2 as ElImage,
  S2 as ElInput,
  L2 as ElLink,
  z2 as ElPagination,
  F2 as ElPopover,
  I2 as ElScrollbar,
  T2 as ElTag,
  Be as InjectionEmojiApi,
  Kn as UAnchor,
  Uo as UChat,
  Qs as UComment,
  b1 as UCommentNav,
  v1 as UCommentScroll,
  os as UCounter,
  I1 as UDialog,
  A1 as UDivider,
  $t as UEditor,
  kt as UEmoji,
  bt as UFold,
  Le as UIcon,
  On as UNoticeBar,
  bo as USearch,
  bn as USign,
  En as UTags,
  et as UToast,
  Wt as clear,
  Re as cloneDeep,
  Ut as createGlobalNode,
  Kt as createObjectURL,
  Xe as dayjs,
  ft as debounce,
  i2 as deepTree,
  h2 as default,
  c2 as flattenDeep,
  Nt as get,
  t2 as install,
  pt as isArray,
  l2 as isBoolean,
  we as isEmpty,
  s2 as isFunction,
  Zt as isImage,
  $e as isNull,
  Rt as isNumber,
  Ot as isObject,
  a2 as isString,
  st as lang,
  qt as remove,
  f2 as removeEmptyField,
  Pt as removeGlobalNode,
  r2 as revDeepTree,
  Yt as set,
  Ve as storage,
  xe as str,
  d2 as throttle,
  p2 as toFormData,
  Ie as translate,
  u2 as useBrowser,
  xt as useEmojiParse,
  xo as useLevel,
  v2 as usePage,
  H2 as vInfiniteScroll,
  ae as withInstall
};
