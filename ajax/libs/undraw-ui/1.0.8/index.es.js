import { h as Ie, render as Lt, defineComponent as Y, ref as L, reactive as ce, inject as ae, withDirectives as he, openBlock as v, createElementBlock as C, createVNode as M, unref as y, normalizeClass as J, Transition as Ze, withCtx as T, createElementVNode as i, createCommentVNode as R, createBlock as G, createTextVNode as de, toDisplayString as q, nextTick as ke, pushScopeId as ie, popScopeId as re, computed as X, renderSlot as pe, resolveComponent as ue, watch as ve, createSlots as zt, useCssVars as je, normalizeStyle as ze, onMounted as we, vShow as Se, withKeys as xe, withModifiers as Me, Fragment as te, renderList as le, toRefs as Ke, onUnmounted as Ve, toRef as lt, vModelText as Ft, provide as me, useSlots as It, mergeProps as Tt } from "vue";
import { ElButton as De, ClickOutside as it, ElLink as rt, ElInfiniteScroll as Ht, ElDialog as At, ElScrollbar as Re, ElEmpty as Bt, ElForm as Et, ElFormItem as Fe, ElInput as Ee, ElCarousel as Vt, ElTag as Dt, ElAvatar as Je, ElPopover as ct, ElImage as ut, ElPagination as Ot } from "element-plus";
import { ElAvatar as m2, ElButton as _2, ElCarousel as g2, ElDialog as y2, ElDropdown as w2, ElDropdownItem as $2, ElDropdownMenu as b2, ElEmpty as x2, ElImage as C2, ElInput as k2, ElLink as M2, ElPagination as S2, ElPopover as L2, ElScrollbar as z2, ElTag as F2, ElInfiniteScroll as I2 } from "element-plus";
/*! UndrawUi v1.0.8 */
function dt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function jt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Rt(e) {
  return !isNaN(Number(e));
}
function n2(e) {
  return typeof e == "function";
}
function o2(e) {
  return typeof e == "string";
}
function s2(e) {
  return typeof e == "boolean";
}
function Ce(e) {
  return dt(e) ? e.length === 0 : jt(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const ye = (e, s) => Ce(e) ? s : e;
function Oe(e) {
  if (typeof e != "object" || e === null)
    return e;
  let s;
  if (Array.isArray(e)) {
    s = [];
    for (let n = 0; n < e.length; n++)
      s[n] = Oe(e[n]);
  } else if (e instanceof Date)
    s = new Date(e.getTime());
  else if (e instanceof RegExp)
    s = new RegExp(e.source, e.flags);
  else {
    s = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (s[n] = Oe(e[n]));
  }
  return s;
}
function a2(e, s = { parentId: "parentId", children: "children" }) {
  let n = ye(s.parentId, "parentId"), t = ye(s.children, "children");
  e = Oe(e);
  const a = [], o = {};
  return e.forEach((u) => o[u.id] = u), e.forEach((u) => {
    const r = o[u[n]];
    r ? (r[t] || (r[t] = [])).push(u) : a.push(u);
  }), a;
}
function l2(e = [], s = { parentId: "parentId", children: "children" }) {
  let n = ye(s.parentId, "parentId"), t = ye(s.children, "children");
  const a = [], o = (u, r) => {
    u.forEach(($) => {
      $.id || ($.id = r++), $[n] = r, a.push($), $[t] && dt($[t]) && o($[t], $.id);
    });
  };
  return o(e || [], null), a;
}
const i2 = (e, s = 1 / 0) => e.flat(s), ne = (e, s) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(s ?? {})])
      n.component(t.name, t);
  }, s)
    for (const [n, t] of Object.entries(s))
      e[n] = t;
  return e;
};
function r2() {
  const { clientWidth: e } = document.documentElement, s = navigator.userAgent.toLowerCase();
  let n = (s.match(/firefox|chrome|safari|opera/g) || "other")[0];
  (s.match(/msie|trident/g) || [])[0] && (n = "msie");
  let t = "";
  "ontouchstart" in window || s.indexOf("touch") !== -1 || s.indexOf("mobile") !== -1 ? s.indexOf("ipad") !== -1 ? t = "pad" : s.indexOf("mobile") !== -1 ? t = "mobile" : s.indexOf("android") !== -1 ? t = "androidPad" : t = "pc" : t = "pc";
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
  const u = s.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const $ = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), _ = (s.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], h = t === "pc", l = !h, b = r === "xs" || l, d = window.innerHeight + "px";
  return {
    version: _,
    type: n,
    plat: u,
    tag: t,
    prefix: o,
    isMobile: l,
    isIOS: $,
    isPC: h,
    isMini: b,
    screen: r,
    innerHeight: d
  };
}
function Ut(e, s) {
  const n = Ie(e, s), t = document.createElement("div");
  return document.body.append(t), Lt(n, t), { vnode: n, div: t };
}
function Pt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Ue = (e) => e ? "localStorage" : "sessionStorage", Yt = (e, s, n = !0) => {
  (s === "" || s === null || s === void 0) && (s = null), window[Ue(n)].setItem(e, JSON.stringify(s));
}, Nt = (e, s = !0) => {
  let n;
  const t = window[Ue(s)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, qt = (e, s = !0) => {
  window[Ue(s)].removeItem(e);
}, Wt = (e = !0) => {
  window[Ue(e)].clear();
}, Be = {
  set: Yt,
  get: Nt,
  remove: qt,
  clear: Wt
}, pt = (e, s = 200, n = !1) => {
  let t = !1, a = null;
  const o = (...u) => new Promise((r, $) => {
    if (a && clearTimeout(a), n && !t) {
      const _ = e.apply(void 0, u);
      r(_), t = !0;
    } else
      a = setTimeout(() => {
        const _ = e.apply(void 0, u);
        r(_), t = !1, a = null;
      }, s);
  });
  return o.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, o;
}, c2 = (e, s = 500) => {
  let n = 0;
  const t = (...a) => new Promise((o, u) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= s) {
      const $ = e.apply(void 0, a);
      o($), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, be = (e) => e == null ? "" : String(e);
function Zt(e) {
  let s = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return s.indexOf(t.toLowerCase()) != -1;
}
function Kt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function u2(e) {
  const s = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, o) => s.append(n + `[${o}]`, a)) : s.append(n, e[n]);
  }), s;
}
function d2(e) {
  return Object.keys(e).filter((s) => e[s] !== null && e[s] !== void 0).reduce((s, n) => ({ ...s, [n]: e[n] }), {});
}
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qe = { exports: {} }, st;
function ft() {
  return st || (st = 1, function(e, s) {
    (function(n, t) {
      e.exports = t();
    })(Ge, function() {
      var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", u = "second", r = "minute", $ = "hour", _ = "day", h = "week", l = "month", b = "quarter", d = "year", c = "date", m = "Invalid Date", D = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, H = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, P = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(w) {
        var f = ["th", "st", "nd", "rd"], p = w % 100;
        return "[" + w + (f[(p - 20) % 10] || f[p] || f[0]) + "]";
      } }, Q = function(w, f, p) {
        var k = String(w);
        return !k || k.length >= f ? w : "" + Array(f + 1 - k.length).join(p) + w;
      }, A = { s: Q, z: function(w) {
        var f = -w.utcOffset(), p = Math.abs(f), k = Math.floor(p / 60), g = p % 60;
        return (f <= 0 ? "+" : "-") + Q(k, 2, "0") + ":" + Q(g, 2, "0");
      }, m: function w(f, p) {
        if (f.date() < p.date())
          return -w(p, f);
        var k = 12 * (p.year() - f.year()) + (p.month() - f.month()), g = f.clone().add(k, l), F = p - g < 0, I = f.clone().add(k + (F ? -1 : 1), l);
        return +(-(k + (p - g) / (F ? g - I : I - g)) || 0);
      }, a: function(w) {
        return w < 0 ? Math.ceil(w) || 0 : Math.floor(w);
      }, p: function(w) {
        return { M: l, y: d, w: h, d: _, D: c, h: $, m: r, s: u, ms: o, Q: b }[w] || String(w || "").toLowerCase().replace(/s$/, "");
      }, u: function(w) {
        return w === void 0;
      } }, B = "en", z = {};
      z[B] = P;
      var E = function(w) {
        return w instanceof fe;
      }, N = function w(f, p, k) {
        var g;
        if (!f)
          return B;
        if (typeof f == "string") {
          var F = f.toLowerCase();
          z[F] && (g = F), p && (z[F] = p, g = F);
          var I = f.split("-");
          if (!g && I.length > 1)
            return w(I[0]);
        } else {
          var x = f.name;
          z[x] = f, g = x;
        }
        return !k && g && (B = g), g || !k && B;
      }, U = function(w, f) {
        if (E(w))
          return w.clone();
        var p = typeof f == "object" ? f : {};
        return p.date = w, p.args = arguments, new fe(p);
      }, j = A;
      j.l = N, j.i = E, j.w = function(w, f) {
        return U(w, { locale: f.$L, utc: f.$u, x: f.$x, $offset: f.$offset });
      };
      var fe = function() {
        function w(p) {
          this.$L = N(p.locale, null, !0), this.parse(p);
        }
        var f = w.prototype;
        return f.parse = function(p) {
          this.$d = function(k) {
            var g = k.date, F = k.utc;
            if (g === null)
              return /* @__PURE__ */ new Date(NaN);
            if (j.u(g))
              return /* @__PURE__ */ new Date();
            if (g instanceof Date)
              return new Date(g);
            if (typeof g == "string" && !/Z$/i.test(g)) {
              var I = g.match(D);
              if (I) {
                var x = I[2] - 1 || 0, S = (I[7] || "0").substring(0, 3);
                return F ? new Date(Date.UTC(I[1], x, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, S)) : new Date(I[1], x, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, S);
              }
            }
            return new Date(g);
          }(p), this.$x = p.x || {}, this.init();
        }, f.init = function() {
          var p = this.$d;
          this.$y = p.getFullYear(), this.$M = p.getMonth(), this.$D = p.getDate(), this.$W = p.getDay(), this.$H = p.getHours(), this.$m = p.getMinutes(), this.$s = p.getSeconds(), this.$ms = p.getMilliseconds();
        }, f.$utils = function() {
          return j;
        }, f.isValid = function() {
          return this.$d.toString() !== m;
        }, f.isSame = function(p, k) {
          var g = U(p);
          return this.startOf(k) <= g && g <= this.endOf(k);
        }, f.isAfter = function(p, k) {
          return U(p) < this.startOf(k);
        }, f.isBefore = function(p, k) {
          return this.endOf(k) < U(p);
        }, f.$g = function(p, k, g) {
          return j.u(p) ? this[k] : this.set(g, p);
        }, f.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, f.valueOf = function() {
          return this.$d.getTime();
        }, f.startOf = function(p, k) {
          var g = this, F = !!j.u(k) || k, I = j.p(p), x = function($e, se) {
            var ge = j.w(g.$u ? Date.UTC(g.$y, se, $e) : new Date(g.$y, se, $e), g);
            return F ? ge : ge.endOf(_);
          }, S = function($e, se) {
            return j.w(g.toDate()[$e].apply(g.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), g);
          }, V = this.$W, O = this.$M, W = this.$D, Z = "set" + (this.$u ? "UTC" : "");
          switch (I) {
            case d:
              return F ? x(1, 0) : x(31, 11);
            case l:
              return F ? x(1, O) : x(0, O + 1);
            case h:
              var oe = this.$locale().weekStart || 0, ee = (V < oe ? V + 7 : V) - oe;
              return x(F ? W - ee : W + (6 - ee), O);
            case _:
            case c:
              return S(Z + "Hours", 0);
            case $:
              return S(Z + "Minutes", 1);
            case r:
              return S(Z + "Seconds", 2);
            case u:
              return S(Z + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, f.endOf = function(p) {
          return this.startOf(p, !1);
        }, f.$set = function(p, k) {
          var g, F = j.p(p), I = "set" + (this.$u ? "UTC" : ""), x = (g = {}, g[_] = I + "Date", g[c] = I + "Date", g[l] = I + "Month", g[d] = I + "FullYear", g[$] = I + "Hours", g[r] = I + "Minutes", g[u] = I + "Seconds", g[o] = I + "Milliseconds", g)[F], S = F === _ ? this.$D + (k - this.$W) : k;
          if (F === l || F === d) {
            var V = this.clone().set(c, 1);
            V.$d[x](S), V.init(), this.$d = V.set(c, Math.min(this.$D, V.daysInMonth())).$d;
          } else
            x && this.$d[x](S);
          return this.init(), this;
        }, f.set = function(p, k) {
          return this.clone().$set(p, k);
        }, f.get = function(p) {
          return this[j.p(p)]();
        }, f.add = function(p, k) {
          var g, F = this;
          p = Number(p);
          var I = j.p(k), x = function(O) {
            var W = U(F);
            return j.w(W.date(W.date() + Math.round(O * p)), F);
          };
          if (I === l)
            return this.set(l, this.$M + p);
          if (I === d)
            return this.set(d, this.$y + p);
          if (I === _)
            return x(1);
          if (I === h)
            return x(7);
          var S = (g = {}, g[r] = t, g[$] = a, g[u] = n, g)[I] || 1, V = this.$d.getTime() + p * S;
          return j.w(V, this);
        }, f.subtract = function(p, k) {
          return this.add(-1 * p, k);
        }, f.format = function(p) {
          var k = this, g = this.$locale();
          if (!this.isValid())
            return g.invalidDate || m;
          var F = p || "YYYY-MM-DDTHH:mm:ssZ", I = j.z(this), x = this.$H, S = this.$m, V = this.$M, O = g.weekdays, W = g.months, Z = function(se, ge, Ne, Ae) {
            return se && (se[ge] || se(k, F)) || Ne[ge].slice(0, Ae);
          }, oe = function(se) {
            return j.s(x % 12 || 12, se, "0");
          }, ee = g.meridiem || function(se, ge, Ne) {
            var Ae = se < 12 ? "AM" : "PM";
            return Ne ? Ae.toLowerCase() : Ae;
          }, $e = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: V + 1, MM: j.s(V + 1, 2, "0"), MMM: Z(g.monthsShort, V, W, 3), MMMM: Z(W, V), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: Z(g.weekdaysMin, this.$W, O, 2), ddd: Z(g.weekdaysShort, this.$W, O, 3), dddd: O[this.$W], H: String(x), HH: j.s(x, 2, "0"), h: oe(1), hh: oe(2), a: ee(x, S, !0), A: ee(x, S, !1), m: String(S), mm: j.s(S, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: I };
          return F.replace(H, function(se, ge) {
            return ge || $e[se] || I.replace(":", "");
          });
        }, f.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, f.diff = function(p, k, g) {
          var F, I = j.p(k), x = U(p), S = (x.utcOffset() - this.utcOffset()) * t, V = this - x, O = j.m(this, x);
          return O = (F = {}, F[d] = O / 12, F[l] = O, F[b] = O / 3, F[h] = (V - S) / 6048e5, F[_] = (V - S) / 864e5, F[$] = V / a, F[r] = V / t, F[u] = V / n, F)[I] || V, g ? O : j.a(O);
        }, f.daysInMonth = function() {
          return this.endOf(l).$D;
        }, f.$locale = function() {
          return z[this.$L];
        }, f.locale = function(p, k) {
          if (!p)
            return this.$L;
          var g = this.clone(), F = N(p, k, !0);
          return F && (g.$L = F), g;
        }, f.clone = function() {
          return j.w(this.$d, this);
        }, f.toDate = function() {
          return new Date(this.valueOf());
        }, f.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, f.toISOString = function() {
          return this.$d.toISOString();
        }, f.toString = function() {
          return this.$d.toUTCString();
        }, w;
      }(), _e = fe.prototype;
      return U.prototype = _e, [["$ms", o], ["$s", u], ["$m", r], ["$H", $], ["$W", _], ["$M", l], ["$y", d], ["$D", c]].forEach(function(w) {
        _e[w[1]] = function(f) {
          return this.$g(f, w[0], w[1]);
        };
      }), U.extend = function(w, f) {
        return w.$i || (w(f, fe, U), w.$i = !0), U;
      }, U.locale = N, U.isDayjs = E, U.unix = function(w) {
        return U(1e3 * w);
      }, U.en = z[B], U.Ls = z, U.p = {}, U;
    });
  }(qe)), qe.exports;
}
var Jt = ft();
const Xe = /* @__PURE__ */ vt(Jt);
var Gt = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t(ft());
  })(Ge, function(n) {
    function t(u) {
      return u && typeof u == "object" && "default" in u ? u : { default: u };
    }
    var a = t(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(u, r) {
      return r === "W" ? u + "周" : u + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(u, r) {
      var $ = 100 * u + r;
      return $ < 600 ? "凌晨" : $ < 900 ? "早上" : $ < 1100 ? "上午" : $ < 1300 ? "中午" : $ < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(Gt);
var ht = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t();
  })(Ge, function() {
    return function(n, t, a) {
      n = n || {};
      var o = t.prototype, u = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(_, h, l, b) {
        return o.fromToBase(_, h, l, b);
      }
      a.en.relativeTime = u, o.fromToBase = function(_, h, l, b, d) {
        for (var c, m, D, H = l.$locale().relativeTime || u, P = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], Q = P.length, A = 0; A < Q; A += 1) {
          var B = P[A];
          B.d && (c = b ? a(_).diff(l, B.d, !0) : l.diff(_, B.d, !0));
          var z = (n.rounding || Math.round)(Math.abs(c));
          if (D = c > 0, z <= B.r || !B.r) {
            z <= 1 && A > 0 && (B = P[A - 1]);
            var E = H[B.l];
            d && (z = d("" + z)), m = typeof E == "string" ? E.replace("%d", z) : E(z, h, B.l, D);
            break;
          }
        }
        if (h)
          return m;
        var N = D ? H.future : H.past;
        return typeof N == "function" ? N(m) : N.replace("%s", m);
      }, o.to = function(_, h) {
        return r(_, h, this, !0);
      }, o.from = function(_, h) {
        return r(_, h, this);
      };
      var $ = function(_) {
        return _.$u ? a.utc() : a();
      };
      o.toNow = function(_) {
        return this.to($(this), _);
      }, o.fromNow = function(_) {
        return this.from($(this), _);
      };
    };
  });
})(ht);
var Xt = ht.exports;
const Qt = /* @__PURE__ */ vt(Xt);
Xe.locale("zh-cn");
Xe.extend(Qt);
const Pe = Symbol(), mt = Symbol(), Qe = Symbol(), We = Symbol(), _t = (e) => (ie("data-v-a515035d"), e = e(), re(), e), e1 = { class: "comment-box" }, t1 = {
  key: 0,
  class: "action-box"
}, n1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ i("svg", {
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
], -1)), o1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ i("span", null, "图片", -1)), s1 = { class: "btn-box" }, a1 = /* @__PURE__ */ Y({
  __name: "input-box",
  props: {
    placeholder: {},
    contentBtn: {},
    parentId: {},
    reply: {},
    cancelBtn: {}
  },
  emits: ["hide", "close"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = L(""), o = L(!1), u = L(!0), r = L(), $ = L(), _ = L(), h = L([]), l = L([]), b = ce({
      imgLength: 0
    }), d = (w) => {
      l.value = w;
    }, c = (w) => {
      Ce(a.value.replace(/&nbsp;|<br>| /g, "")) ? u.value = !0 : u.value = !1;
    }, { upload: m, submit: D, focus: H } = ae(mt), P = ae(He), Q = () => {
      D({
        content: t.reply && t.parentId != t.reply.id ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: ye(t.parentId, null),
        reply: t.reply,
        files: l.value,
        clear: () => {
          z(), n("close");
        }
      });
    }, A = ae("cancelFn"), B = () => {
      z(), n("close"), A();
    }, z = () => {
      r.value.clear(), h.value.length = 0, l.value = [], u.value = !0;
    };
    function E(w) {
      Ce(a.value) && !b.imgLength && (o.value = !1, n("hide", w));
    }
    function N() {
      o.value = !0, ke(() => {
        $.value = document.querySelector("div[id^='el-popper-container']");
      }), H();
    }
    function U() {
      console.log(r.value);
    }
    s({
      focus: () => {
        var w;
        return (w = r.value) == null ? void 0 : w.focus();
      },
      changeMentionShow: (w) => {
        var f;
        return (f = r.value) == null ? void 0 : f.changeMentionShow(w);
      },
      AddMention: U
    });
    const j = (w, f) => {
      var k;
      f || (h.value.length = 0, l.value.length = 0);
      const p = f ? [f] : (k = _.value) == null ? void 0 : k.files;
      if (b.imgLength = ye(p == null ? void 0 : p.length, 0), p)
        for (let g = 0; g < p.length; g++) {
          let F = p[g].name, I = Kt(p[g]);
          l.value.push(p[g]), Zt(F) ? h.value.push(I) : tt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, fe = ae(Pe), _e = () => Ie("div", fe.func());
    return (w, f) => he((v(), C("div", e1, [
      M(y(wt), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": f[0] || (f[0] = (p) => a.value = p),
        class: J({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": h.value,
        onClick: f[1] || (f[1] = () => o.value = !0),
        onFocus: N,
        onInput: c,
        onSubmit: Q,
        onPaste: j,
        onChangeImgListFn: d
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      M(Ze, { name: "fade" }, {
        default: T(() => [
          o.value ? (v(), C("div", t1, [
            M(y(kt), {
              emoji: y(P),
              onAddEmoji: f[2] || (f[2] = (p) => {
                var k;
                return (k = r.value) == null ? void 0 : k.addText(p);
              })
            }, null, 8, ["emoji"]),
            y(m) ? (v(), C("div", {
              key: 0,
              class: "picture",
              onClick: f[3] || (f[3] = //@ts-ignore
              (...p) => {
                var k, g;
                return ((k = _.value) == null ? void 0 : k.click) && ((g = _.value) == null ? void 0 : g.click(...p));
              })
            }, [
              n1,
              o1,
              i("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: _,
                type: "file",
                multiple: "",
                onChange: j
              }, null, 544)
            ])) : R("", !0),
            y(fe).func ? (v(), G(_e, { key: 1 })) : R("", !0),
            i("div", s1, [
              M(y(De), {
                type: "primary",
                disabled: u.value,
                onClick: Q
              }, {
                default: T(() => [
                  de(q(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (v(), G(y(De), {
                key: 0,
                onClick: B
              }, {
                default: T(() => [
                  de(q(t.cancelBtn), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])) : R("", !0)
        ]),
        _: 1
      })
    ])), [
      [y(it), E, $.value]
    ]);
  }
});
const K = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of s)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ K(a1, [["__scopeId", "data-v-a515035d"]]), l1 = { class: "u-comment-scroll" }, i1 = ["infinite-scroll-disabled"], r1 = { class: "scroll-btn" }, c1 = { key: 1 }, u1 = { key: 2 }, d1 = /* @__PURE__ */ Y({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(!1), o = X(() => a.value && n.disable), u = X(() => !a.value || t.value || o.value), r = pt(() => {
      s("more"), t.value = !1;
    }, 500), $ = () => {
      t.value = !0, r();
    };
    return (_, h) => (v(), C("div", l1, [
      he((v(), C("div", {
        "infinite-scroll-disabled": u.value,
        "infinite-scroll-distance": "2"
      }, [
        pe(_.$slots, "default", {}, void 0, !0),
        i("div", r1, [
          a.value ? R("", !0) : (v(), G(y(rt), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: h[0] || (h[0] = (l) => a.value = !a.value)
          }, {
            default: T(() => [
              de("加载更多")
            ]),
            _: 1
          })),
          t.value ? (v(), C("p", c1, "加载中...")) : R("", !0),
          o.value ? (v(), C("p", u1, "没有更多了")) : R("", !0)
        ])
      ], 8, i1)), [
        [y(Ht), $]
      ])
    ]));
  }
});
const p1 = /* @__PURE__ */ K(d1, [["__scopeId", "data-v-404b6e08"]]), v1 = ne(p1), et = (e) => (ie("data-v-3e026489"), e = e(), re(), e), f1 = { class: "nav" }, h1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("span", { class: "nav__title" }, "全部评论", -1)), m1 = { class: "nav__sort" }, _1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
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
], -1)), g1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), y1 = /* @__PURE__ */ Y({
  name: "uCommentNav",
  __name: "comment-nav",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: s }) {
    const n = e, t = X({
      get() {
        return n.modelValue;
      },
      set(a) {
        s("update:modelValue", a), s("sorted", a);
      }
    });
    return (a, o) => {
      const u = ue("u-icon");
      return v(), C("div", f1, [
        h1,
        i("div", m1, [
          i("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: o[0] || (o[0] = (r) => t.value = !0)
          }, [
            M(u, null, {
              default: T(() => [
                _1
              ]),
              _: 1
            }),
            de(" 最新 ")
          ], 2),
          i("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: o[1] || (o[1] = (r) => t.value = !1)
          }, [
            M(u, null, {
              default: T(() => [
                g1
              ]),
              _: 1
            }),
            de(" 最热 ")
          ], 2)
        ])
      ]);
    };
  }
});
const w1 = /* @__PURE__ */ K(y1, [["__scopeId", "data-v-3e026489"]]), $1 = ne(w1), yt = (e) => (ie("data-v-59596f14"), e = e(), re(), e), b1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, x1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), C1 = [
  x1
], k1 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, M1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), S1 = [
  M1
], L1 = /* @__PURE__ */ Y({
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
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(!1);
    return ve(
      () => n.modelValue,
      (o) => {
        t.value = o;
      },
      {
        immediate: !0
      }
    ), ve(
      () => t.value,
      (o) => {
        s("update:modelValue", o);
      }
    ), (o, u) => (v(), G(y(At), {
      modelValue: t.value,
      "onUpdate:modelValue": u[1] || (u[1] = (r) => t.value = r),
      "close-on-click-modal": o.closeOnClickModal,
      title: o.title,
      width: o.width,
      top: o.top,
      fullscreen: a.value,
      center: o.center,
      "before-close": o.beforeClose,
      draggable: ""
    }, zt({
      default: T(() => [
        i("div", {
          class: "full-screen",
          onClick: u[0] || (u[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (v(), C("svg", b1, C1)) : (v(), C("svg", k1, S1))
        ]),
        pe(o.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      o.$slots.footer ? {
        name: "footer",
        fn: T(() => [
          pe(o.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const z1 = /* @__PURE__ */ K(L1, [["__scopeId", "data-v-59596f14"]]), F1 = ne(z1), I1 = { class: "field" }, T1 = /* @__PURE__ */ Y({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const s = e;
    je((t) => ({
      d59c4402: s.borderStyle
    }));
    const n = L();
    return ve(
      () => s.position,
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
    ), (t, a) => (v(), C("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", I1, [
        t.$slots.default || t.vertical ? (v(), C("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          pe(t.$slots, "default", {}, void 0, !0)
        ], 2)) : R("", !0)
      ])
    ], 2));
  }
});
const H1 = /* @__PURE__ */ K(T1, [["__scopeId", "data-v-153d9bc7"]]), A1 = ne(H1), B1 = [
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
], E1 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function V1(e) {
  return B1.find((s) => s.type === e);
}
function D1() {
  return E1;
}
const O1 = {
  key: 1,
  "aria-hidden": "true"
}, j1 = ["xlink:href"], R1 = /* @__PURE__ */ Y({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const s = e, n = X(() => "#" + s.name), t = X(() => ({
      fontSize: Rt(s.size) ? s.size + "px" : s.size,
      color: s.color
    }));
    return (a, o) => (v(), C("i", {
      class: "u-icon",
      style: ze(t.value)
    }, [
      a.$slots.default ? pe(a.$slots, "default", { key: 0 }, void 0, !0) : (v(), C("svg", O1, [
        i("use", { "xlink:href": n.value }, null, 8, j1)
      ]))
    ], 4));
  }
});
const U1 = /* @__PURE__ */ K(R1, [["__scopeId", "data-v-dd34e834"]]), Le = ne(U1), P1 = { class: "v-toast" }, Y1 = { class: "inner" }, N1 = { class: "message" }, q1 = /* @__PURE__ */ Y({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const s = e;
    je((a) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = ce(D1().options), t = L(!1);
    return ve(
      () => s.type,
      (a) => {
        const o = V1(a);
        o && (n.color = o.options.color, n.bgColor = o.options.bgColor, n.icon = o.options.icon);
      },
      { immediate: !0 }
    ), we(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, s.duration);
    }), (a, o) => (v(), C("div", P1, [
      M(Ze, { name: "v-toast" }, {
        default: T(() => [
          he(i("div", Y1, [
            i("div", N1, [
              n.icon ? (v(), G(y(Le), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : R("", !0),
              i("span", {
                class: J({ normal: a.type != "normal" })
              }, q(a.message), 3)
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
const W1 = /* @__PURE__ */ K(q1, [["__scopeId", "data-v-7d3c50e0"]]);
function tt(e) {
  let s = e.duration;
  if (!e.message)
    return;
  e.duration = s || 1e3;
  const { vnode: n, div: t } = Ut(W1, e);
  return setTimeout(() => {
    Pt(t);
  }, e.duration + 300), n;
}
const Z1 = ["onKeydown"], K1 = ["onClick"], J1 = { class: "userInfo" }, G1 = ["src"], X1 = { class: "username" }, Q1 = { class: "empty" }, en = /* @__PURE__ */ Y({
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
  setup(e, { expose: s, emit: n }) {
    const t = e, a = L(), o = L(-1), u = L(null), r = (l) => {
      var b;
      if (o.value += l, o.value < 0 ? o.value = t.list.length - 1 : o.value >= t.list.length && (o.value = 0), a.value) {
        const d = a.value.wrapRef.children[0].children[o.value];
        if (d) {
          const c = a.value.wrapRef.offsetHeight || 0;
          (b = a.value) == null || b.setScrollTop((o.value - c / d.offsetHeight + 1) * d.offsetHeight);
        }
      }
    }, $ = () => {
      if (o.value >= 0 && o.value < t.list.length)
        return t.list[o.value];
    }, _ = (l) => {
      o.value = l, n("insert", t.list[o.value]), n("changeShow", !1);
    };
    ve(
      () => t.isShow,
      (l) => {
        l && (o.value = 0, ke(() => {
          a.value && a.value.setScrollTop(0);
        }));
      }
    );
    const h = () => {
      o.value = 0;
    };
    return we(() => {
      var l;
      (l = u.value) == null || l.focus();
    }), s({
      moveSelection: r,
      printSelectedItem: $,
      resetSelectIndex: h
    }), (l, b) => he((v(), C("ul", {
      ref_key: "mentionList",
      ref: u,
      class: "mention-list",
      tabindex: "0",
      style: ze(`left: ${l.position.left}px; top: ${l.position.top}px`),
      onKeydown: [
        b[0] || (b[0] = xe(Me((d) => r(-1), ["prevent"]), ["up"])),
        b[1] || (b[1] = xe(Me((d) => r(1), ["prevent"]), ["down"])),
        xe(Me($, ["prevent"]), ["enter"])
      ]
    }, [
      M(y(Re), {
        ref_key: "scrollbarRef",
        ref: a,
        style: { padding: "10px" }
      }, {
        default: T(() => [
          (v(!0), C(te, null, le(l.list, (d, c) => (v(), C("li", {
            key: c,
            class: J({ hover: c === o.value }),
            onClick: (m) => _(c)
          }, [
            pe(l.$slots, "user", {
              item: d,
              index: c
            }, () => [
              i("div", J1, [
                l.showAvatar ? (v(), C("img", {
                  key: 0,
                  src: d.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, G1)) : R("", !0),
                i("span", X1, q(d.userName), 1)
              ])
            ], !0)
          ], 10, K1))), 128)),
          he(i("div", Q1, [
            M(y(Bt), { description: "暂无匹配数据" })
          ], 512), [
            [Se, !l.list.length]
          ])
        ]),
        _: 3
      }, 512)
    ], 44, Z1)), [
      [Se, l.isShow]
    ]);
  }
});
const tn = /* @__PURE__ */ K(en, [["__scopeId", "data-v-14aad4a8"]]), nn = (e) => (ie("data-v-86bd30aa"), e = e(), re(), e), on = ["placeholder", "onKeydown", "innerHTML"], sn = ["src"], an = ["onClick"], ln = /* @__PURE__ */ nn(() => /* @__PURE__ */ i("svg", {
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
], -1)), rn = [
  ln
], cn = /* @__PURE__ */ Y({
  name: "UEditor",
  __name: "editor",
  props: {
    placeholder: {},
    modelValue: {},
    minHeight: { default: 30 },
    imgList: {}
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit", "paste", "changeImgListFn"],
  setup(e, { expose: s, emit: n }) {
    const t = e;
    je((x) => ({
      "218d6e86": B.value,
      "271743be": z.value
    }));
    const a = L(null), o = L(!1), u = L({
      left: 0,
      top: 0
    });
    function r(x) {
      o.value = x, x || (E.value = "");
    }
    function $(x) {
      u.value = x;
    }
    function _(x) {
      a.value && a.value.moveSelection(x);
    }
    function h() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const l = ae("mentionConfig"), b = ae("changeMetionList"), d = ae("mentionSearch"), c = L(), m = L(), D = L(), H = L(!1), P = L(!1), Q = L(), { imgList: A } = Ke(t), B = X(() => t.minHeight + "px"), z = X(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), E = L("");
    ve(
      () => t.modelValue,
      (x, S) => {
        var O;
        if (H.value || (D.value = x), !((O = l == null ? void 0 : l.value) != null && O.show))
          return;
        x = x.replace(/<br>/g, ""), S = S.replace(/<br>/g, ""), (S.length >= x.length && S.slice(-1) === "@" || x.slice(-7) === "@&nbsp;") && r(!1), o.value && x.slice(-6) !== "&nbsp;" ? (E.value = x.split("@").pop() || "", E.value = E.value.replace("'", ""), console.log(E.value), d(E.value), a.value && a.value.resetSelectIndex()) : o.value && x.slice(-6) === "&nbsp;" && r(!1);
        let V = x.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (V) {
          let W = V.map((oe) => {
            let ee = oe.match(/data-id="([^"]*)"/);
            return ee ? ee[1] : null;
          }), Z = l.value.userArr.filter(
            (oe) => W.includes(`${oe[l.value.userIdKey]}`)
          );
          b(Z);
        } else
          b([]);
      }
    );
    function N(x) {
      n("focus", x), H.value = !0, P.value = !0;
    }
    function U(x) {
      var S, V;
      try {
        c.value = (S = window.getSelection()) == null ? void 0 : S.getRangeAt(0);
      } catch (O) {
        console.log(O);
      }
      n("blur", x), (V = m.value) != null && V.innerHTML || (P.value = !1), H.value = !1;
    }
    function j(x) {
      _(x);
    }
    function fe(x) {
      var V, O;
      const { innerHTML: S } = x.target;
      if (x.data === "@" && (l != null && l.value.show)) {
        try {
          c.value = (V = window.getSelection()) == null ? void 0 : V.getRangeAt(0);
        } catch (Z) {
          console.log(Z);
        }
        let W = (O = c.value) == null ? void 0 : O.getBoundingClientRect();
        r(!0), W && $({
          left: W.left,
          top: W.top + W.height + 10
        });
      }
      n("update:modelValue", S), n("input", x);
    }
    function _e(x, S) {
      var O, W;
      let V = window.getSelection();
      if (V) {
        if (V.removeAllRanges(), c.value || ((O = m.value) == null || O.focus(), c.value = V.getRangeAt(0)), S && !E.value)
          c.value.startOffset > 0 && (c.value.setStart(c.value.startContainer, c.value.startOffset - 1), c.value.deleteContents());
        else if (S && E.value) {
          let oe = E.value.length + 1, ee = c.value.startContainer.data.lastIndexOf("@" + E.value);
          ee !== -1 && (c.value.setStart(c.value.startContainer, ee), c.value.setEnd(c.value.startContainer, ee + oe), c.value.deleteContents());
        }
        c.value.deleteContents(), c.value.insertNode(c.value.createContextualFragment(x)), c.value.collapse(!1), V.addRange(c.value), n("update:modelValue", ((W = m.value) == null ? void 0 : W.innerHTML) || "");
        const Z = m.value;
        n("input", Z);
      }
    }
    function w(x) {
      const S = x.clipboardData;
      if (S) {
        const V = S.getData("text/plain"), O = S.items.length > 0 ? S.items[0].getAsFile() : null;
        V ? (x.preventDefault(), document.execCommand("insertText", !1, V)) : O && (console.log(O), x.preventDefault(), n("paste", x, O));
      }
    }
    function f() {
      m.value && (m.value.innerHTML = "", n("update:modelValue", m.value.innerHTML), P.value = !1);
    }
    function p() {
      ke(() => {
        var x;
        (x = m.value) == null || x.focus();
      });
    }
    function k(x) {
      if (x) {
        let S = I(x);
        _e(`${S} `, !0);
      }
    }
    const g = (x) => {
      if (x.ctrlKey && x.key == "Enter")
        Ce(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? tt({ message: "内容不能为空", type: "info" }) : n("submit");
      else if (x.key == "Enter" && o.value) {
        x.preventDefault();
        const S = h();
        k(S), r(!1);
      }
    }, F = (x) => {
      var S;
      (S = A == null ? void 0 : A.value) == null || S.splice(x, 1), n("changeImgListFn", Oe(A == null ? void 0 : A.value));
    };
    we(() => {
    }), s({
      addText: _e,
      clear: f,
      focus: p,
      imageRef: Q,
      insertUser: k,
      changeMentionShow: r
    });
    const I = (x) => {
      const S = x[l.value.userNameKey], V = x[l.value.userIdKey], O = l.value.mentionColor || "#409eff", W = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `, Z = document.createElement("div");
      Z.style.visibility = "hidden", Z.innerHTML = W, document.body.appendChild(Z);
      const oe = Z.querySelector("text");
      let ee = 200;
      oe && (ee = oe.getComputedTextLength()), document.body.removeChild(Z);
      const $e = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${ee}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${O}; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent($e).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${S}" style="width:${ee}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${S}" data-id="${V}"
     draggable="false"
    >`;
    };
    return (x, S) => {
      var V, O;
      return v(), C("div", {
        class: J(["u-editor", { active: P.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: m,
          class: "rich-input",
          contenteditable: "",
          placeholder: x.placeholder,
          onFocus: N,
          onInput: fe,
          onBlur: U,
          onKeydown: [
            xe(g, ["enter"]),
            S[0] || (S[0] = xe(Me((W) => j(-1), ["prevent"]), ["up"])),
            S[1] || (S[1] = xe(Me((W) => j(1), ["prevent"]), ["down"]))
          ],
          onPaste: w,
          innerHTML: D.value
        }, null, 40, on),
        i("div", {
          ref_key: "imageRef",
          ref: Q,
          class: "image-preview-box"
        }, [
          (v(!0), C(te, null, le(y(A), (W, Z) => (v(), C("div", {
            key: Z,
            class: "image-preview"
          }, [
            i("img", {
              src: W,
              alt: ""
            }, null, 8, sn),
            i("div", {
              class: "clean-btn",
              onClick: (oe) => F(Z)
            }, rn, 8, an)
          ]))), 128))
        ], 512),
        M(tn, {
          ref_key: "metionList",
          ref: a,
          "is-show": o.value,
          position: u.value,
          list: (V = y(l)) == null ? void 0 : V.userArr,
          "show-avatar": (O = y(l)) == null ? void 0 : O.showAvatar,
          onInsert: k,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"])
      ], 2);
    };
  }
});
const un = /* @__PURE__ */ K(cn, [["__scopeId", "data-v-86bd30aa"]]), wt = ne(un);
const dn = { class: "u-fold" }, pn = { class: "action-box select-none" }, vn = /* @__PURE__ */ Y({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const s = e;
    je((r) => ({
      "2a7aa7a8": n.value
    }));
    const n = X(() => {
      let r = Math.trunc(Number(s.line));
      return r > 0 ? r : 1;
    }), t = L(!0), a = L(!1), o = L();
    let u;
    return we(() => {
      u = new ResizeObserver((r) => {
        t.value && o.value && (a.value = o.value.offsetHeight < o.value.scrollHeight);
      }), u.observe(o.value);
    }), Ve(() => {
      u.disconnect();
    }), (r, $) => (v(), C("div", dn, [
      i("div", {
        class: J(["txt-box", { "over-hidden": t.value }])
      }, [
        i("div", {
          ref_key: "divBox",
          ref: o
        }, [
          pe(r.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      i("div", pn, [
        a.value && r.unfold ? (v(), C("div", {
          key: 0,
          class: "expand-btn",
          onClick: $[0] || ($[0] = (_) => t.value = !t.value)
        }, q(t.value ? "展开" : "收起"), 1)) : R("", !0)
      ])
    ]));
  }
});
const fn = /* @__PURE__ */ K(vn, [["__scopeId", "data-v-1694aa13"]]), $t = ne(fn), hn = /* @__PURE__ */ Y({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = ce({
      type: "",
      email: "",
      password: ""
    }), o = (c, m, D) => {
      const H = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!m)
        return D("请输入邮箱!");
      H.test(m) || D("邮箱地址不合法"), D();
    }, u = (c, m, D) => {
      m ? m != a.password ? D("输入密码不一致") : D() : D("请确认密码");
    }, r = L(), $ = L(), _ = ce({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), h = ce({
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
        validator: u,
        trigger: "blur"
      }
    }), l = ce({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    ve(
      () => t.modelValue,
      (c) => {
        switch (ke(() => d()), c) {
          case "login":
            $.value = _, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            $.value = _, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            $.value = h, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function b() {
      a.type = t.modelValue, r.value.validate((c) => {
        c && n("submit", a);
      });
    }
    function d() {
      r.value.resetFields();
    }
    return s({
      reset: d
    }), (c, m) => {
      const D = ue("el-button");
      return v(), G(y(Et), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: $.value,
        class: "select-none"
      }, {
        default: T(() => [
          M(y(Fe), { prop: "email" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.email,
                "onUpdate:modelValue": m[0] || (m[0] = (H) => a.email = H),
                placeholder: "请输入邮箱",
                onFocus: m[1] || (m[1] = (H) => c.$emit("toggle", 1)),
                onBlur: m[2] || (m[2] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          M(y(Fe), { prop: "password" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.password,
                "onUpdate:modelValue": m[3] || (m[3] = (H) => a.password = H),
                placeholder: "请输入密码",
                onFocus: m[4] || (m[4] = (H) => c.$emit("toggle", 2)),
                onBlur: m[5] || (m[5] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          he(M(y(Fe), { prop: "checkPass" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": m[6] || (m[6] = (H) => a.checkPass = H),
                placeholder: "请确认密码",
                onFocus: m[7] || (m[7] = (H) => c.$emit("toggle", 2)),
                onBlur: m[8] || (m[8] = (H) => c.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Se, c.modelValue == "forget"]
          ]),
          M(y(Fe), null, {
            default: T(() => [
              M(D, {
                style: { width: "100%" },
                type: "primary",
                onClick: b
              }, {
                default: T(() => [
                  de(q(l.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          M(y(Fe), null, {
            default: T(() => [
              i("div", {
                onClick: m[9] || (m[9] = (H) => c.$emit("update:modelValue", l.one.key))
              }, q(l.one.value), 1),
              i("div", {
                onClick: m[10] || (m[10] = (H) => c.$emit("update:modelValue", l.two.key))
              }, q(l.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const mn = /* @__PURE__ */ K(hn, [["__scopeId", "data-v-525985f8"]]), _n = { class: "u-sign" }, gn = { class: "sign-oauth" }, yn = /* @__PURE__ */ Y({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = L(!1), t = L("login"), a = L(0), o = X(() => {
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
      const $ = ue("u-divider"), _ = ue("u-icon"), h = ue("u-dialog");
      return v(), C("div", _n, [
        M(y(De), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: T(() => [
            de("登录/注册")
          ]),
          _: 1
        }),
        M(h, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: o.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: T(() => [
            M(mn, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => a.value = l),
              onSubmit: r[3] || (r[3] = (l) => u.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            M($, null, {
              default: T(() => [
                de("其他方式登录")
              ]),
              _: 1
            }),
            i("div", gn, [
              M(_, { name: "QQ" }),
              M(_, { name: "weixin" }),
              M(_, { name: "gitee" }),
              M(_, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const wn = /* @__PURE__ */ K(yn, [["__scopeId", "data-v-8e737450"]]), $n = ne(wn), bn = (e) => (ie("data-v-3a07e116"), e = e(), re(), e), xn = { class: "custom-contextmenu__menu" }, Cn = ["onClick"], kn = /* @__PURE__ */ bn(() => /* @__PURE__ */ i("div", { class: "arrow" }, null, -1)), Mn = /* @__PURE__ */ Y({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: s, emit: n }) {
    const t = ce({
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
      t.tag = _, t.dropdownList[1].show = !_.meta.isAffix, o(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, o = () => {
      t.isShow = !1;
    };
    we(() => {
      window.addEventListener("click", o);
    }), Ve(() => {
      window.removeEventListener("click", o);
    });
    const { isShow: u, dropdownList: r, tag: $ } = Ke(t);
    return s({
      openContextmenu: a
    }), (_, h) => {
      const l = ue("u-icon");
      return v(), G(Ze, { name: "el-zoom-in-center" }, {
        default: T(() => [
          he(i("div", {
            style: ze(`top: ${_.dropdown.y + 5}px; left: ${_.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            i("ul", xn, [
              (v(!0), C(te, null, le(y(r), (b, d) => (v(), C(te, { key: d }, [
                b.show ? (v(), C("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (c) => _.$emit("submit", d, y($))
                }, [
                  M(l, {
                    innerHTML: b.icon
                  }, null, 8, ["innerHTML"]),
                  i("span", null, q(b.title), 1)
                ], 8, Cn)) : R("", !0)
              ], 64))), 128))
            ]),
            kn
          ], 4), [
            [Se, y(u)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Sn = /* @__PURE__ */ K(Mn, [["__scopeId", "data-v-3a07e116"]]), Ln = (e) => (ie("data-v-f7d57bb4"), e = e(), re(), e), zn = { class: "u-tabs" }, Fn = ["onClick", "onContextmenu"], In = { class: "select-none" }, Tn = /* @__PURE__ */ Ln(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Hn = /* @__PURE__ */ Y({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: s }) {
    const n = e, t = L(), a = L(), o = lt(n, "modelValue"), u = L(0), r = ce({
      x: 0,
      y: 0
    });
    ve(
      () => [...o.value],
      (b, d) => {
        if (d) {
          if (console.log(b, d), b.length > d.length) {
            let c = b.find((m) => !(d != null && d.includes(m)));
            o.value.forEach((m, D, H) => {
              H.findIndex((P) => P.path == m.path) != D && H.splice(D, 1);
            }), u.value = o.value.findIndex((m) => m.path == (c == null ? void 0 : c.path));
          }
        } else {
          let c = 1;
          o.value.forEach((m, D, H) => {
            H.findIndex((P) => P.path == m.path) != D && (H.splice(D, 1), u.value = H.findIndex((P) => P.path == m.path), c = 0);
          }), c && (u.value = o.value.length - 1);
        }
        ke(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), ve(
      () => u.value,
      (b) => {
        s(
          "select",
          o.value.find((d, c) => c == b)
        );
      }
    );
    const $ = (b) => {
      o.value.map((d, c) => {
        if (!d.meta.isAffix && b == c)
          if (o.value.splice(c, 1), c == u.value) {
            let D = [c, c - 1].filter((H) => H >= 0 && H < o.value.length);
            u.value = D[0], u.value == c && s(
              "select",
              o.value.find((H, P) => P == b)
            );
          } else
            b < u.value && (u.value -= 1);
      });
    }, _ = (b) => {
      let d = o.value.filter((m) => m.meta.isAffix);
      b && !b.meta.isAffix && d.push(b), o.value.length = 0, o.value.push(...d);
      let c = o.value.length - 1;
      u.value = c >= 0 ? c : 0;
    }, h = (b, d) => {
      switch (b) {
        case 0:
          s("refresh", d);
          break;
        case 1:
          let c = o.value.findIndex((m) => m.path == d.path);
          $(c), s("close", d);
          break;
        case 2:
          _(d), s("closeOther", d);
          break;
        case 3:
          _(), s("closeAll");
          break;
        case 4:
          s("fullScreen", d);
          break;
      }
    }, l = (b, d) => {
      const { clientX: c, clientY: m } = d;
      r.x = c, r.y = m, a.value.openContextmenu(b);
    };
    return (b, d) => {
      const c = ue("u-icon");
      return v(), C("div", zn, [
        M(y(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: T(() => [
            i("ul", {
              class: J([{ "classic-style": b.classic }, "u-tabs-ul"])
            }, [
              (v(!0), C(te, null, le(b.modelValue, (m, D) => (v(), C("li", {
                key: D,
                class: J([{ "is-active": u.value == D }, "u-tabs-ul-li"]),
                onClick: (H) => u.value = D,
                onContextmenu: Me((H) => l(m, H), ["prevent"])
              }, [
                i("span", In, q(m.meta.title), 1),
                m.meta.isAffix ? R("", !0) : (v(), G(c, {
                  key: 0,
                  onClick: Me((H) => h(1, m), ["stop"])
                }, {
                  default: T(() => [
                    Tn
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, Fn))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        M(Sn, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: h
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const An = /* @__PURE__ */ K(Hn, [["__scopeId", "data-v-f7d57bb4"]]), Bn = ne(An), En = { key: 0 }, Vn = /* @__PURE__ */ Y({
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
    const s = e, n = ce({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), o = X(() => s.delay > 2e3 ? s.delay : 2e3), u = () => {
      ke(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          $();
        }, s.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / s.spped, n.twoTime = (n.textWidth + n.boxWidth) / s.spped;
    }, $ = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, _ = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          $();
        },
        !1
      );
    };
    return we(() => {
      s.vertical || (u(), _());
    }), (h, l) => {
      const b = ue("el-carousel-item"), d = ue("u-icon");
      return v(), C("div", {
        class: "u-notice-bar",
        style: ze({ background: h.background, height: `${h.height}px` })
      }, [
        h.vertical ? (v(), C("div", En, [
          M(y(Vt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: o.value
          }, {
            default: T(() => [
              (v(!0), C(te, null, le(h.data, (c) => (v(), G(b, { key: c }, {
                default: T(() => [
                  de(q(c), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (v(), C("div", {
          key: 1,
          style: ze({ color: h.color, fontSize: `${h.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          h.prefixIcon ? (v(), G(d, {
            key: 0,
            name: h.prefixIcon
          }, null, 8, ["name"])) : R("", !0),
          i("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            i("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, q(h.data), 513)
          ], 512),
          h.suffixIcon ? (v(), G(d, {
            key: 1,
            name: h.suffixIcon
          }, null, 8, ["name"])) : R("", !0)
        ], 4))
      ], 4);
    };
  }
});
const Dn = /* @__PURE__ */ K(Vn, [["__scopeId", "data-v-723bc558"]]), On = ne(Dn), jn = (e) => (ie("data-v-11b4e56c"), e = e(), re(), e), Rn = { class: "u-anchor" }, Un = { class: "toc-content" }, Pn = /* @__PURE__ */ jn(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Yn = { class: "toc-items" }, Nn = ["onClick"], qn = /* @__PURE__ */ Y({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const s = e, n = L(0), t = L({}), a = L({}), o = (_) => {
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
      t.value.forEach((b) => {
        _.push(b.offsetTop);
      });
      const l = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      _.forEach((b, d) => {
        l >= b - 10 - s.targetOffset && (n.value = d);
      });
    }, r = (_) => {
      const h = t.value.item(_);
      console.log(h), s.scroll ? a.value.scrollTo({
        top: h.offsetTop - s.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: h.offsetTop - s.targetOffset,
        behavior: "smooth"
      });
    };
    we(() => {
    }), Ve(() => {
      a.value.removeEventListener("scroll", u);
    });
    let $;
    return we(() => {
      let _ = document.querySelector(s.container);
      $ = new ResizeObserver((h) => {
        s.scroll ? a.value = document.querySelector(s.scroll) : a.value = window, t.value = _.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", u);
      }), $.observe(_);
    }), Ve(() => {
      a.value.removeEventListener("scroll", u), $.disconnect();
    }), (_, h) => {
      const l = ue("u-divider");
      return v(), C("div", Rn, [
        i("nav", Un, [
          Pn,
          M(l),
          i("ul", Yn, [
            (v(!0), C(te, null, le(t.value, (b, d) => (v(), C("li", {
              key: d,
              class: J([{ active: n.value == d }, o(b.nodeName)]),
              onClick: (c) => r(d)
            }, q(b.innerText), 11, Nn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Wn = /* @__PURE__ */ K(qn, [["__scopeId", "data-v-11b4e56c"]]), Zn = ne(Wn), Te = (e) => (ie("data-v-c739035a"), e = e(), re(), e), Kn = { class: "card-box u-scrollbar" }, Jn = {
  key: 0,
  class: "history"
}, Gn = { class: "header" }, Xn = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "title" }, "历史搜索", -1)), Qn = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), eo = {
  key: 1,
  class: "trending"
}, to = { class: "title" }, no = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("span", null, "热搜", -1)), oo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
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
], -1)), so = { class: "hot-list" }, ao = ["onClick"], lo = { class: "trending-text u-ellipsis" }, io = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "trending-mark" }, null, -1)), ro = /* @__PURE__ */ Y({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: s }) {
    const n = e, t = X(() => !(Ce(n.data.historySearchList) && Ce(n.data.hotSearchList)));
    return (a, o) => {
      const u = ue("u-icon");
      return he((v(), C("div", Kn, [
        a.data.historySearchList.length != 0 ? (v(), C("div", Jn, [
          i("div", Gn, [
            Xn,
            M(y(rt), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (r) => a.$emit("onClear"))
            }, {
              default: T(() => [
                M(u, null, {
                  default: T(() => [
                    Qn
                  ]),
                  _: 1
                }),
                de(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (v(!0), C(te, null, le(a.data.historySearchList, (r, $) => (v(), G(y(Dt), {
            key: $,
            type: r.type,
            closable: "",
            onClose: (_) => a.$emit("onClose", r.name),
            onClick: (_) => a.$emit("submit", r.name)
          }, {
            default: T(() => [
              de(q(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : R("", !0),
        y(Ce)(a.data.hotSearchList) ? R("", !0) : (v(), C("div", eo, [
          i("div", to, [
            no,
            M(u, { style: { margin: "0 6px" } }, {
              default: T(() => [
                oo
              ]),
              _: 1
            })
          ]),
          i("div", so, [
            (v(!0), C(te, null, le(a.data.hotSearchList, (r, $) => (v(), C("div", {
              key: $,
              class: "hot-item",
              onClick: (_) => a.$emit("submit", r)
            }, [
              i("div", {
                class: J(["trending-rank", { "trending-rank-top": $ < 3 }])
              }, q($ + 1), 3),
              i("div", lo, q(r), 1),
              io
            ], 8, ao))), 128))
          ])
        ]))
      ], 512)), [
        [Se, a.data.visible && t.value]
      ]);
    };
  }
});
const co = /* @__PURE__ */ K(ro, [["__scopeId", "data-v-c739035a"]]), nt = (e) => (ie("data-v-df2be5d9"), e = e(), re(), e), uo = { class: "u-search" }, po = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, vo = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
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
], -1)), fo = ["data-before", "data-after"], ho = ["placeholder"], mo = { class: "btn" }, _o = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
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
], -1)), go = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ i("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), yo = /* @__PURE__ */ Y({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = L({}), o = lt(t.config, "keywords"), u = L(!1), r = L(0), $ = L(!0), _ = L(), h = ce({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), l = ce({
      search: t.config.search || "",
      visible: !1,
      historySearchList: Be.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    ve(
      () => t.config.hotSearchList,
      (A) => {
        l.hotSearchList = A;
      }
    ), ve(
      () => t.config.search,
      (A) => {
        l.search = A || "";
      }
    );
    const b = X(() => {
      let A = o.value[r.value];
      return u.value || l.search ? "" : A;
    }), d = X(() => {
      let A = typeof o.value[r.value + 1] > "u" ? o.value[0] : o.value[r.value + 1];
      return u.value || l.search ? "" : A;
    }), c = X(() => {
      let A = o.value[r.value];
      return u.value ? A : "";
    }), m = X(() => !u.value && !l.search && $.value), D = (A) => {
      if (A != null && A.trim() != "") {
        let B = (E, N) => Math.round(Math.random() * (N - E)) + E, z = (E) => l.historySearchList.filter((N) => N.name == E).length != 0;
        if (A && l.historySearchList)
          z(A) || l.historySearchList.unshift({ name: A, type: h.types[B(0, 3)] });
        else {
          let E = u.value ? c : b;
          A = E.value, z(E.value) || l.historySearchList.unshift({ name: E.value, type: h.types[B(0, 3)] });
        }
        Be.set("searchHistory", l.historySearchList);
      }
      l.search = A, a.value.focus(), n("submit", A);
    }, H = (A) => {
      l.historySearchList.findIndex((B) => B.name == A), l.historySearchList.splice(
        l.historySearchList.findIndex((B) => B.name == A),
        1
      ), Be.set("searchHistory", l.historySearchList);
    }, P = () => {
      l.historySearchList.length = 0, Be.remove("searchHistory");
    }, Q = (A) => {
      if (A.pseudoElement == "::after") {
        $.value = !1;
        let B = typeof o.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = B, setTimeout(() => {
          $.value = !0;
        }, 3e3);
      }
    };
    return s({
      close: () => l.visible = !1
    }), (A, B) => {
      const z = ue("u-icon");
      return v(), C("div", uo, [
        i("div", {
          class: J(["search", { active: u.value }])
        }, [
          i("div", po, [
            M(z, null, {
              default: T(() => [
                vo
              ]),
              _: 1
            })
          ]),
          i("label", {
            ref_key: "labelRef",
            ref: _,
            "data-before": b.value,
            "data-after": d.value,
            class: J({ animate: m.value }),
            onAnimationend: Q
          }, [
            he(i("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": B[0] || (B[0] = (E) => l.search = E),
              type: "text",
              placeholder: c.value,
              onFocus: B[1] || (B[1] = () => {
                u.value = !0, l.visible = !0;
              }),
              onBlur: B[2] || (B[2] = (E) => u.value = !1),
              onKeyup: B[3] || (B[3] = xe((E) => D(l.search), ["enter"]))
            }, null, 40, ho), [
              [Ft, l.search]
            ])
          ], 42, fo),
          i("div", mo, [
            he(M(z, {
              class: "close",
              onClick: B[4] || (B[4] = (E) => l.search = "")
            }, {
              default: T(() => [
                _o
              ]),
              _: 1
            }, 512), [
              [Se, l.search]
            ]),
            i("div", {
              class: "search-btn",
              onClick: B[5] || (B[5] = (E) => D(l.search))
            }, [
              M(z, null, {
                default: T(() => [
                  go
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        he(M(co, {
          data: l,
          onOnClose: H,
          onOnClear: P,
          onSubmit: D
        }, null, 8, ["data"]), [
          [y(it), () => l.visible = !1, _.value]
        ])
      ]);
    };
  }
});
const wo = /* @__PURE__ */ K(yo, [["__scopeId", "data-v-df2be5d9"]]), $o = ne(wo), bt = (e, s) => {
  const n = /\[.+?\]/g;
  return s = s.replace(n, (t) => {
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
  }), s;
}, bo = (e) => {
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
}, p2 = (e, s, n) => {
  let t = (e - 1) * s;
  return t + s >= n.length ? n.slice(t, n.length) : n.slice(t, t + s);
}, xt = (e) => (ie("data-v-f75472b5"), e = e(), re(), e), xo = { class: "message" }, Co = { class: "chat-list" }, ko = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Mo = { class: "content" }, So = {
  key: 0,
  class: "username"
}, Lo = ["innerHTML"], zo = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), Fo = /* @__PURE__ */ Y({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: s }) {
    const { allEmoji: n } = ae(He), t = L();
    return s({
      scroll: () => {
        ke(() => {
          const o = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(o.offsetTop);
        });
      }
    }), (o, u) => (v(), C("div", xo, [
      M(y(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: T(() => [
          i("div", Co, [
            (v(!0), C(te, null, le(o.data, (r, $) => (v(), C("div", {
              key: $,
              class: J([{ self: o.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                M(y(Je), null, {
                  default: T(() => [
                    ko
                  ]),
                  _: 1
                })
              ]),
              i("div", Mo, [
                o.userId != r.id ? (v(), C("div", So, q(r.username), 1)) : R("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: y(bt)(y(n), r.content)
                }, null, 8, Lo)
              ]),
              zo
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const Io = /* @__PURE__ */ K(Fo, [["__scopeId", "data-v-f75472b5"]]), Ye = (e) => (ie("data-v-18726a6b"), e = e(), re(), e), To = { class: "u-chat" }, Ho = { class: "header" }, Ao = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("svg", {
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
], -1)), Bo = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ i("div", null, "聊天室"),
  /* @__PURE__ */ i("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Eo = {
  id: "chat-footer",
  class: "footer"
}, Vo = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("svg", {
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
], -1)), Do = /* @__PURE__ */ Ye(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), Oo = /* @__PURE__ */ Y({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(""), o = L(), u = (h) => {
      const { ctrlKey: l, key: b } = h;
      l && b == "Enter" && $();
    }, r = () => {
      a.value = "", o.value.scroll();
    }, $ = () => {
      let h = a.value;
      h.trim() ? (h = h.replace(/\n/g, "<br/>"), s("submit", { clear: r, content: h })) : tt({ type: "error", message: "内容不能为空" });
    }, _ = (h) => {
      let l = document.getElementById("emojiInput"), b = l.selectionStart, d = l.selectionEnd, c = l.value;
      if (b === null || d === null)
        return;
      let m = c.substring(0, b) + h + c.substring(d);
      l.value = m, l.focus(), l.selectionStart = b + h.length, l.selectionEnd = b + h.length, a.value = m;
    };
    return me(He, n.emoji), (h, l) => {
      const b = ue("u-icon"), d = ue("u-emoji");
      return v(), C("div", To, [
        i("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", Ho, [
            M(b, { size: "32" }, {
              default: T(() => [
                Ao
              ]),
              _: 1
            }),
            Bo
          ]),
          M(Io, {
            ref_key: "messageRef",
            ref: o,
            data: h.data,
            "user-id": h.userId
          }, null, 8, ["data", "user-id"]),
          i("div", Eo, [
            M(y(Ee), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": l[0] || (l[0] = (c) => a.value = c),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: xe(u, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            M(d, {
              style: { margin: "0 8px 0" },
              emoji: h.emoji,
              placement: "top-end",
              onAddEmoji: _
            }, {
              default: T(() => [
                Vo
              ]),
              _: 1
            }, 8, ["emoji"]),
            M(b, {
              size: "18",
              class: J([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: $
            }, {
              default: T(() => [
                Do
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        M(y(De), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (c) => t.value = !t.value)
        }, {
          default: T(() => [
            de("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const jo = /* @__PURE__ */ K(Oo, [["__scopeId", "data-v-18726a6b"]]), Ro = ne(jo), Ct = (e) => (ie("data-v-85c87038"), e = e(), re(), e), Uo = { class: "u-emoji" }, Po = { class: "face-tooltip-head select-none" }, Yo = ["onClick"], No = ["src"], qo = { class: "emoji-body select-none" }, Wo = { style: { padding: "0 5px" } }, Zo = ["onClick"], Ko = { class: "emoji-btn select-none" }, Jo = { key: 0 }, Go = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("svg", {
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
], -1)), Xo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("span", null, "表情", -1)), Qo = [
  Go,
  Xo
], es = /* @__PURE__ */ Y({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: s }) {
    const n = e, t = L(0), a = L(0), o = L(new Array(2)), { emojiList: u, faceList: r } = n.emoji;
    function $(h) {
      switch (t.value = h, h) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, o.value[1] = u[1];
          break;
      }
    }
    function _() {
      o.value[0] = u[0];
    }
    return (h, l) => (v(), C("div", Uo, [
      M(y(ct), {
        placement: h.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: _
      }, {
        reference: T(() => [
          i("div", Ko, [
            h.$slots.default ? pe(h.$slots, "default", { key: 1 }, void 0, !0) : (v(), C("div", Jo, Qo))
          ])
        ]),
        default: T(() => [
          i("div", Po, [
            (v(!0), C(te, null, le(y(r), (b, d) => (v(), C("label", {
              key: d,
              class: J(t.value == d ? "active" : ""),
              onClick: (c) => $(d)
            }, [
              i("img", {
                src: b,
                alt: ""
              }, null, 8, No)
            ], 10, Yo))), 128))
          ]),
          i("div", qo, [
            i("div", {
              class: "emjio-container",
              style: ze({ transform: `translateX(${a.value}%)` })
            }, [
              (v(!0), C(te, null, le(o.value, (b, d) => (v(), C("div", {
                key: d,
                class: "emoji-wrapper"
              }, [
                M(y(Re), null, {
                  default: T(() => [
                    i("div", Wo, [
                      (v(!0), C(te, null, le(b, (c, m) => (v(), C("span", {
                        key: m,
                        class: "emoji-item",
                        onClick: (D) => h.$emit("addEmoji", m)
                      }, [
                        M(y(ut), {
                          src: c,
                          title: String(m),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Zo))), 128))
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
const ts = /* @__PURE__ */ K(es, [["__scopeId", "data-v-85c87038"]]), He = Symbol(), kt = ne(ts), ns = /* @__PURE__ */ Y({
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
  setup(e, { emit: s }) {
    const n = e, t = ce({
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
    }), a = () => n.endAmount > n.startAmount, o = X(() => {
      const h = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let b = l.split("."), d = b[0], c = b.length > 1 ? n.decimalSeparator + b[1] : "", m = !isNaN(parseFloat(n.separator));
      if (n.separator && !m)
        for (; h.test(d); )
          d = d.replace(h, "$1" + n.separator + "$2");
      return d + c;
    }), u = X(() => `${n.prefix}${o.value}${n.suffix}`);
    we(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      $(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(_);
    }, $ = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, _ = (h) => {
      t.timestamp = h, t.startTimestamp || (t.startTimestamp = h);
      let l = h - t.startTimestamp;
      t.remaining = t.currentDuration - l, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(_) : s("finished");
    };
    return (h, l) => (v(), C("span", null, q(u.value), 1));
  }
}), os = ne(ns), at = /* @__PURE__ */ Y({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const s = L({}), { showInfo: n } = ae(Qe), t = ae(Pe), a = () => Ie("div", t.card(s.value));
    return (o, u) => y(t).card ? (v(), G(y(ct), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: u[0] || (u[0] = () => y(n)(o.uid, (r) => s.value = r))
    }, {
      reference: T(() => [
        pe(o.$slots, "default")
      ]),
      default: T(() => [
        M(a)
      ]),
      _: 3
    })) : pe(o.$slots, "default", { key: 1 });
  }
}), ot = (e) => (ie("data-v-d057ae4a"), e = e(), re(), e), ss = { class: "comment-sub" }, as = ["href", "target"], ls = { key: 0 }, is = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, rs = { class: "comment-primary" }, cs = { class: "comment-main" }, us = { class: "user-info" }, ds = ["href", "target"], ps = { class: "username" }, vs = {
  class: "name",
  style: { "max-width": "10em" }
}, fs = {
  key: 0,
  blank: "true",
  class: "rank"
}, hs = {
  key: 0,
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, ms = { class: "time" }, _s = { class: "content" }, gs = ["innerHTML"], ys = {
  class: "imgbox",
  style: { display: "flex" }
}, ws = { class: "action-box select-none" }, $s = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), bs = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ i("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), xs = { key: 2 }, Cs = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), ks = { key: 0 }, Ms = /* @__PURE__ */ Y({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const s = e, n = ce({
      active: !1
    }), t = L(), a = L(), o = X(() => {
      let z = s.data.contentImg;
      return Ce(z) ? [] : z == null ? void 0 : z.split("||");
    }), { allEmoji: u } = ae(He), { like: r, user: $, relativeTime: _, aTarget: h, showLevel: l, showLikes: b, showAddress: d, showHomeLink: c, showReply: m } = ae(
      Qe
    );
    function D() {
      n.active = !n.active, n.active && ke(() => {
        var z;
        (z = t.value) == null || z.focus();
      });
    }
    function H(z) {
      var N;
      const E = z.target;
      (N = a.value) != null && N.contains(E) || (n.active = !1);
    }
    const P = ae(Pe), Q = () => Ie("div", P.info(s.data)), A = () => Ie("div", P.operate(s.data)), B = X(() => bt(u, s.data.content));
    return (z, E) => (v(), C("div", {
      class: J(["comment", { reply: s.reply }])
    }, [
      i("div", ss, [
        M(at, {
          uid: y(be)(z.data.uid)
        }, {
          default: T(() => [
            i("a", {
              href: z.data.user.homeLink,
              target: y(h),
              class: J([{ "pointer-events-none": !y(c) }, "no-underline"]),
              style: { display: "block" }
            }, [
              M(y(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: z.data.user.avatar
              }, {
                default: T(() => [
                  z.data.user.avatar ? (v(), C("span", ls, q(z.data.user.username), 1)) : (v(), C("img", is))
                ]),
                _: 1
              }, 8, ["src"])
            ], 10, as)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      i("div", rs, [
        i("div", cs, [
          i("div", us, [
            M(at, {
              uid: y(be)(z.data.uid)
            }, {
              default: T(() => [
                i("a", {
                  href: z.data.user.homeLink,
                  target: y(h),
                  class: J([{ "pointer-events-none": !y(c) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  i("div", ps, [
                    i("span", vs, q(z.data.user.username), 1),
                    y(l) ? (v(), C("span", fs, [
                      M(y(Le), {
                        size: "24",
                        innerHTML: y(bo)(z.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : R("", !0)
                  ])
                ], 10, ds)
              ]),
              _: 1
            }, 8, ["uid"]),
            y(d) ? (v(), C("span", hs, "   " + q(z.data.address), 1)) : R("", !0),
            y(P).info ? (v(), G(Q, { key: 1 })) : R("", !0),
            i("time", ms, q(y(_) ? y(Xe)(z.data.createTime).fromNow() : z.data.createTime), 1)
          ]),
          i("div", _s, [
            M(y($t), { unfold: "" }, {
              default: T(() => [
                i("div", { innerHTML: B.value }, null, 8, gs),
                i("div", ys, [
                  (v(!0), C(te, null, le(o.value, (N, U) => (v(), G(y(ut), {
                    key: U,
                    src: N,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": o.value,
                    "initial-index": U
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          i("div", ws, [
            y(b) ? (v(), C("div", {
              key: 0,
              class: "item",
              onClick: E[0] || (E[0] = (N) => y(r)(y(be)(z.data.id)))
            }, [
              y($).likeIds && y($).likeIds.map(String).indexOf(y(be)(z.data.id)) == -1 ? (v(), G(y(Le), { key: 0 }, {
                default: T(() => [
                  $s
                ]),
                _: 1
              })) : (v(), G(y(Le), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: T(() => [
                  bs
                ]),
                _: 1
              })),
              z.data.likes != 0 ? (v(), C("span", xs, q(z.data.likes), 1)) : R("", !0)
            ])) : R("", !0),
            y(m) ? (v(), C("div", {
              key: 1,
              ref_key: "btnRef",
              ref: a,
              class: J(["item", { active: n.active }]),
              onClick: D
            }, [
              M(y(Le), null, {
                default: T(() => [
                  Cs
                ]),
                _: 1
              }),
              i("span", null, q(n.active ? "取消回复" : "回复"), 1)
            ], 2)) : R("", !0),
            y(P).operate ? (v(), G(A, { key: 2 })) : R("", !0)
          ]),
          n.active ? (v(), C("div", ks, [
            M(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": y(be)(z.id),
              placeholder: `回复 @${z.data.user.username}...`,
              reply: z.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: H,
              onClose: E[1] || (E[1] = (N) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : R("", !0)
        ]),
        pe(z.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const Mt = /* @__PURE__ */ K(Ms, [["__scopeId", "data-v-d057ae4a"]]), Ss = (e) => (ie("data-v-db8275d8"), e = e(), re(), e), Ls = {
  key: 0,
  class: "reply-box"
}, zs = { class: "reply-list" }, Fs = {
  key: 0,
  class: "fetch-more"
}, Is = { key: 0 }, Ts = { key: 1 }, Hs = { key: 0 }, As = /* @__PURE__ */ Ss(() => /* @__PURE__ */ i("svg", {
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
], -1)), Bs = {
  key: 1,
  class: "fetch-more"
}, Es = /* @__PURE__ */ Y({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const s = e, n = ce({
      loading: !1,
      over: !1,
      currentPage: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: o } = ae(We), { page: u } = ae(We), r = X(() => {
      let d = {
        total: 0,
        length: 0,
        list: []
      };
      if (s.data) {
        let c = s.data.list.length;
        d = {
          total: s.data.total,
          length: c,
          list: s.data.list
        };
      }
      if (!n.over) {
        let c = d.list.slice(0, a);
        d.list = c;
      }
      return u && (d.list = d.list.slice(0, n.pageSize)), d;
    });
    ve(
      () => {
        var d;
        return (d = s.data) == null ? void 0 : d.total;
      },
      (d) => {
        if (d) {
          let c = Math.ceil(d / n.pageSize), m = n.currentPage > c ? c : n.currentPage;
          m = m < 1 ? 1 : m, n.currentPage != m && h(m);
        }
      }
    );
    const $ = () => {
      n.over = !0;
    }, _ = (d) => {
      o.value.forEach((c) => {
        c.id == s.id && c.reply && (c.reply = d);
      });
    }, h = (d) => {
      console.log(d), n.currentPage = d, t(s.id, d, n.pageSize, (c) => _(c));
    }, l = (d) => {
      h(d);
    }, b = (d) => {
      n.pageSize = d, t(s.id, n.currentPage, d, (c) => _(c));
    };
    return (d, c) => r.value.length > 0 ? (v(), C("div", Ls, [
      i("div", zs, [
        (v(!0), C(te, null, le(r.value.list, (m, D) => (v(), G(Mt, {
          id: d.id,
          key: D,
          data: m,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > y(a) ? (v(), C("div", Fs, [
          n.loading ? (v(), C("span", Is, "加载中...")) : (v(), C("div", Ts, [
            n.over ? R("", !0) : (v(), C("div", Hs, [
              de(" 共" + q(r.value.total) + "条回复, ", 1),
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: $
              }, [
                de(" 点击查看 "),
                As
              ])
            ]))
          ]))
        ])) : R("", !0),
        n.over && y(u) ? (v(), C("div", Bs, [
          M(y(Ot), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "current-page": n.currentPage,
            "page-size": n.pageSize,
            onCurrentChange: l,
            onSizeChange: b
          }, null, 8, ["total", "current-page", "page-size"])
        ])) : R("", !0)
      ])
    ])) : R("", !0);
  }
});
const Vs = /* @__PURE__ */ K(Es, [["__scopeId", "data-v-db8275d8"]]), Ds = {
  key: 0,
  class: "comment-list"
}, Os = /* @__PURE__ */ Y({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (s, n) => s.data ? (v(), C("div", Ds, [
      (v(!0), C(te, null, le(s.data, (t) => (v(), G(Mt, {
        id: y(be)(t.id),
        key: y(be)(t.id),
        data: t
      }, {
        default: T(() => [
          M(Vs, {
            id: y(be)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : R("", !0);
  }
});
const St = (e) => (ie("data-v-b4f327c1"), e = e(), re(), e), js = { class: "u-comment" }, Rs = {
  key: 0,
  class: "comment-form"
}, Us = /* @__PURE__ */ St(() => /* @__PURE__ */ i("div", { class: "header" }, [
  /* @__PURE__ */ i("span", { class: "header-title" }, "评论")
], -1)), Ps = { class: "content" }, Ys = { class: "avatar-box" }, Ns = { key: 0 }, qs = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Ws = {
  key: 1,
  class: "comment-list-wrapper"
}, Zs = /* @__PURE__ */ St(() => /* @__PURE__ */ i("div", { class: "title" }, "全部评论", -1)), Ks = /* @__PURE__ */ Y({
  name: "UComment",
  __name: "comment",
  props: {
    config: {},
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "focus", "cancel", "getMentionList", "mentionSearch"],
  setup(e, { expose: s, emit: n }) {
    const t = e, {
      user: a,
      comments: o,
      replyShowSize: u,
      aTarget: r,
      placeholder: $ = "输入评论（Enter换行，Ctrl + Enter发送）",
      showForm: _ = !0,
      showContent: h = !0,
      showLevel: l = !0,
      showLikes: b = !0,
      showAddress: d = !0,
      showHomeLink: c = !0,
      showReply: m = !0,
      mentionConfig: D
    } = Ke(t.config), H = ({ content: w, parentId: f, reply: p, files: k, clear: g }) => {
      const F = (I) => {
        if (g(), I)
          if (f) {
            let x = o.value.find((S) => S.id == f);
            if (x) {
              let S = x.reply;
              S ? (S.list.unshift(I), S.total++) : x.reply = {
                total: 1,
                list: [I]
              };
            }
          } else
            o.value.unshift(I);
      };
      n("submit", { content: w, parentId: f, reply: p, files: k, mentionList: U.value, finish: F });
    }, P = {
      upload: t.upload,
      submit: H,
      focus: () => n("focus")
    };
    me(mt, P), me("cancelFn", () => n("cancel"));
    const Q = (w, f) => {
      let p = null;
      o.value.forEach((k) => {
        var g;
        k.id == w ? p = k : p = (g = k.reply) == null ? void 0 : g.list.find((F) => F.id == w), p && p.likes && (p.likes += f);
      });
    }, B = {
      user: a,
      like: (w) => {
        const f = t.config.user.likeIds;
        f && n("like", w, () => {
          if (f.findIndex((p) => p == w) == -1)
            f.push(w), Q(w, 1);
          else {
            let p = f.findIndex((k) => k == w);
            p != -1 && (f.splice(p, 1), Q(w, -1));
          }
        });
      },
      relativeTime: ye(t.relativeTime, !1),
      showInfo: (w, f) => n("showInfo", w, f),
      aTarget: ye(r, "_blank"),
      showLevel: l,
      showLikes: b,
      showAddress: d,
      showHomeLink: c,
      showReply: m
    };
    me(Qe, B);
    const z = {
      page: t.page,
      replyPage: (w, f, p, k) => {
        n("replyPage", { parentId: w, pageNum: f, pageSize: p, finish: k });
      },
      replyShowSize: ye(u == null ? void 0 : u.value, 3),
      comments: o
    };
    me(We, z);
    const E = (w) => {
      const { parentId: f, id: p } = w;
      if (f) {
        let k = o.value.find((F) => F.id == f), g = k == null ? void 0 : k.reply;
        if (g) {
          let F = g.list.findIndex((I) => I.id == p);
          F != -1 && (g.list.splice(F, 1), g.total--);
        }
      } else {
        let k = o.value.findIndex((g) => g.id == p);
        k != -1 && o.value.splice(k, 1);
      }
    }, N = L(null), U = L([]);
    function j(w) {
      U.value = w;
    }
    function fe() {
      return U.value;
    }
    const _e = pt((w) => {
      n("mentionSearch", w);
    }, 300);
    return me(He, t.config.emoji), me("mentionConfig", D), me(Pe, It()), me("changeMetionList", j), me("mentionSearch", _e), s({
      remove: E,
      mentionList: U,
      getMentionList: fe,
      setMentionShow: (w) => {
        N.value.setMentionShow(w);
      }
    }), (w, f) => (v(), C("div", js, [
      y(_) ? (v(), C("div", Rs, [
        pe(w.$slots, "header", {}, () => [
          Us
        ], !0),
        i("div", Ps, [
          i("div", Ys, [
            M(y(Je), {
              size: 40,
              src: w.config.user.avatar
            }, {
              default: T(() => [
                w.config.user.username ? (v(), C("span", Ns, q(w.config.user.username), 1)) : (v(), C("img", qs))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          M(gt, Tt(w.$attrs, {
            ref_key: "inputBox",
            ref: N,
            placeholder: y($),
            "content-btn": "发表评论"
          }), null, 16, ["placeholder"])
        ])
      ])) : R("", !0),
      y(h) ? (v(), C("div", Ws, [
        pe(w.$slots, "default", {}, () => [
          Zs
        ], !0),
        M(Os, { data: y(o) }, null, 8, ["data"])
      ])) : R("", !0)
    ]));
  }
});
const Js = /* @__PURE__ */ K(Ks, [["__scopeId", "data-v-b4f327c1"]]), Gs = ne(Js), Xs = [
  Gs,
  v1,
  $1,
  F1,
  A1,
  wt,
  $t,
  Le,
  $n,
  Bn,
  On,
  Zn,
  $o,
  Ro,
  kt,
  os
];
const Qs = (e) => {
  Xs.forEach((s) => {
    e.use(s);
  });
}, v2 = {
  install: Qs
};
export {
  m2 as ElAvatar,
  _2 as ElButton,
  g2 as ElCarousel,
  y2 as ElDialog,
  w2 as ElDropdown,
  $2 as ElDropdownItem,
  b2 as ElDropdownMenu,
  x2 as ElEmpty,
  C2 as ElImage,
  k2 as ElInput,
  M2 as ElLink,
  S2 as ElPagination,
  L2 as ElPopover,
  z2 as ElScrollbar,
  F2 as ElTag,
  He as InjectionEmojiApi,
  Zn as UAnchor,
  Ro as UChat,
  Gs as UComment,
  $1 as UCommentNav,
  v1 as UCommentScroll,
  os as UCounter,
  F1 as UDialog,
  A1 as UDivider,
  wt as UEditor,
  kt as UEmoji,
  $t as UFold,
  Le as UIcon,
  On as UNoticeBar,
  $o as USearch,
  $n as USign,
  Bn as UTags,
  tt as UToast,
  Wt as clear,
  Oe as cloneDeep,
  Ut as createGlobalNode,
  Kt as createObjectURL,
  Xe as dayjs,
  pt as debounce,
  a2 as deepTree,
  v2 as default,
  i2 as flattenDeep,
  Nt as get,
  Qs as install,
  dt as isArray,
  s2 as isBoolean,
  Ce as isEmpty,
  n2 as isFunction,
  Zt as isImage,
  ye as isNull,
  Rt as isNumber,
  jt as isObject,
  o2 as isString,
  qt as remove,
  d2 as removeEmptyField,
  Pt as removeGlobalNode,
  l2 as revDeepTree,
  Yt as set,
  Be as storage,
  be as str,
  c2 as throttle,
  u2 as toFormData,
  r2 as useBrowser,
  bt as useEmojiParse,
  bo as useLevel,
  p2 as usePage,
  I2 as vInfiniteScroll,
  ne as withInstall
};
