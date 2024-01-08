import { h as Ie, render as Lt, defineComponent as N, ref as L, reactive as ce, inject as ae, withDirectives as ve, openBlock as p, createElementBlock as C, createVNode as M, unref as y, normalizeClass as J, Transition as Ze, withCtx as T, createElementVNode as i, createCommentVNode as R, createBlock as G, createTextVNode as de, toDisplayString as q, nextTick as ke, pushScopeId as ie, popScopeId as re, computed as X, renderSlot as pe, resolveComponent as ue, watch as he, createSlots as zt, useCssVars as je, normalizeStyle as ze, onMounted as we, vShow as Se, withKeys as xe, withModifiers as Me, Fragment as ne, renderList as le, toRefs as Ke, resolveDirective as Ft, onUnmounted as Ve, toRef as lt, vModelText as It, provide as me, useSlots as Tt, mergeProps as Ht } from "vue";
import { ElButton as De, ClickOutside as it, ElLink as rt, ElInfiniteScroll as At, ElDialog as Bt, ElScrollbar as Re, ElEmpty as Et, ElForm as Vt, ElFormItem as Fe, ElInput as Ee, ElCarousel as Dt, ElTag as Ot, ElAvatar as Je, ElPopover as ct, ElImage as ut, ElPagination as jt } from "element-plus";
import { ElAvatar as _2, ElButton as g2, ElCarousel as y2, ElDialog as w2, ElDropdown as $2, ElDropdownItem as b2, ElDropdownMenu as x2, ElEmpty as C2, ElImage as k2, ElInput as M2, ElLink as S2, ElPagination as L2, ElPopover as z2, ElScrollbar as F2, ElTag as I2, ElInfiniteScroll as T2 } from "element-plus";
/*! UndrawUi v1.0.6 */
function dt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Rt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Ut(e) {
  return !isNaN(Number(e));
}
function o2(e) {
  return typeof e == "function";
}
function s2(e) {
  return typeof e == "string";
}
function a2(e) {
  return typeof e == "boolean";
}
function Ce(e) {
  return dt(e) ? e.length === 0 : Rt(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
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
function l2(e, s = { parentId: "parentId", children: "children" }) {
  let n = ye(s.parentId, "parentId"), t = ye(s.children, "children");
  e = Oe(e);
  const a = [], o = {};
  return e.forEach((c) => o[c.id] = c), e.forEach((c) => {
    const r = o[c[n]];
    r ? (r[t] || (r[t] = [])).push(c) : a.push(c);
  }), a;
}
function i2(e = [], s = { parentId: "parentId", children: "children" }) {
  let n = ye(s.parentId, "parentId"), t = ye(s.children, "children");
  const a = [], o = (c, r) => {
    c.forEach((b) => {
      b.id || (b.id = r++), b[n] = r, a.push(b), b[t] && dt(b[t]) && o(b[t], b.id);
    });
  };
  return o(e || [], null), a;
}
const r2 = (e, s = 1 / 0) => e.flat(s), oe = (e, s) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(s ?? {})])
      n.component(t.name, t);
  }, s)
    for (const [n, t] of Object.entries(s))
      e[n] = t;
  return e;
};
function c2() {
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
  const c = s.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const b = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), _ = (s.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], m = t === "pc", l = !m, v = r === "xs" || l, f = window.innerHeight + "px";
  return {
    version: _,
    type: n,
    plat: c,
    tag: t,
    prefix: o,
    isMobile: l,
    isIOS: b,
    isPC: m,
    isMini: v,
    screen: r,
    innerHeight: f
  };
}
function Yt(e, s) {
  const n = Ie(e, s), t = document.createElement("div");
  return document.body.append(t), Lt(n, t), { vnode: n, div: t };
}
function Nt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Ue = (e) => e ? "localStorage" : "sessionStorage", Pt = (e, s, n = !0) => {
  (s === "" || s === null || s === void 0) && (s = null), window[Ue(n)].setItem(e, JSON.stringify(s));
}, qt = (e, s = !0) => {
  let n;
  const t = window[Ue(s)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Wt = (e, s = !0) => {
  window[Ue(s)].removeItem(e);
}, Zt = (e = !0) => {
  window[Ue(e)].clear();
}, Be = {
  set: Pt,
  get: qt,
  remove: Wt,
  clear: Zt
}, pt = (e, s = 200, n = !1) => {
  let t = !1, a = null;
  const o = (...c) => new Promise((r, b) => {
    if (a && clearTimeout(a), n && !t) {
      const _ = e.apply(void 0, c);
      r(_), t = !0;
    } else
      a = setTimeout(() => {
        const _ = e.apply(void 0, c);
        r(_), t = !1, a = null;
      }, s);
  });
  return o.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, o;
}, u2 = (e, s = 500) => {
  let n = 0;
  const t = (...a) => new Promise((o, c) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= s) {
      const b = e.apply(void 0, a);
      o(b), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, be = (e) => e == null ? "" : String(e);
function Kt(e) {
  let s = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return s.indexOf(t.toLowerCase()) != -1;
}
function Jt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function d2(e) {
  const s = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, o) => s.append(n + `[${o}]`, a)) : s.append(n, e[n]);
  }), s;
}
function p2(e) {
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
      var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", c = "second", r = "minute", b = "hour", _ = "day", m = "week", l = "month", v = "quarter", f = "year", u = "date", w = "Invalid Date", D = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, H = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function($) {
        var h = ["th", "st", "nd", "rd"], d = $ % 100;
        return "[" + $ + (h[(d - 20) % 10] || h[d] || h[0]) + "]";
      } }, Q = function($, h, d) {
        var k = String($);
        return !k || k.length >= h ? $ : "" + Array(h + 1 - k.length).join(d) + $;
      }, A = { s: Q, z: function($) {
        var h = -$.utcOffset(), d = Math.abs(h), k = Math.floor(d / 60), g = d % 60;
        return (h <= 0 ? "+" : "-") + Q(k, 2, "0") + ":" + Q(g, 2, "0");
      }, m: function $(h, d) {
        if (h.date() < d.date())
          return -$(d, h);
        var k = 12 * (d.year() - h.year()) + (d.month() - h.month()), g = h.clone().add(k, l), F = d - g < 0, I = h.clone().add(k + (F ? -1 : 1), l);
        return +(-(k + (d - g) / (F ? g - I : I - g)) || 0);
      }, a: function($) {
        return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
      }, p: function($) {
        return { M: l, y: f, w: m, d: _, D: u, h: b, m: r, s: c, ms: o, Q: v }[$] || String($ || "").toLowerCase().replace(/s$/, "");
      }, u: function($) {
        return $ === void 0;
      } }, B = "en", z = {};
      z[B] = Y;
      var E = function($) {
        return $ instanceof fe;
      }, P = function $(h, d, k) {
        var g;
        if (!h)
          return B;
        if (typeof h == "string") {
          var F = h.toLowerCase();
          z[F] && (g = F), d && (z[F] = d, g = F);
          var I = h.split("-");
          if (!g && I.length > 1)
            return $(I[0]);
        } else {
          var x = h.name;
          z[x] = h, g = x;
        }
        return !k && g && (B = g), g || !k && B;
      }, U = function($, h) {
        if (E($))
          return $.clone();
        var d = typeof h == "object" ? h : {};
        return d.date = $, d.args = arguments, new fe(d);
      }, j = A;
      j.l = P, j.i = E, j.w = function($, h) {
        return U($, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
      };
      var fe = function() {
        function $(d) {
          this.$L = P(d.locale, null, !0), this.parse(d);
        }
        var h = $.prototype;
        return h.parse = function(d) {
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
          }(d), this.$x = d.x || {}, this.init();
        }, h.init = function() {
          var d = this.$d;
          this.$y = d.getFullYear(), this.$M = d.getMonth(), this.$D = d.getDate(), this.$W = d.getDay(), this.$H = d.getHours(), this.$m = d.getMinutes(), this.$s = d.getSeconds(), this.$ms = d.getMilliseconds();
        }, h.$utils = function() {
          return j;
        }, h.isValid = function() {
          return this.$d.toString() !== w;
        }, h.isSame = function(d, k) {
          var g = U(d);
          return this.startOf(k) <= g && g <= this.endOf(k);
        }, h.isAfter = function(d, k) {
          return U(d) < this.startOf(k);
        }, h.isBefore = function(d, k) {
          return this.endOf(k) < U(d);
        }, h.$g = function(d, k, g) {
          return j.u(d) ? this[k] : this.set(g, d);
        }, h.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, h.valueOf = function() {
          return this.$d.getTime();
        }, h.startOf = function(d, k) {
          var g = this, F = !!j.u(k) || k, I = j.p(d), x = function($e, se) {
            var ge = j.w(g.$u ? Date.UTC(g.$y, se, $e) : new Date(g.$y, se, $e), g);
            return F ? ge : ge.endOf(_);
          }, S = function($e, se) {
            return j.w(g.toDate()[$e].apply(g.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), g);
          }, V = this.$W, O = this.$M, K = this.$D, W = "set" + (this.$u ? "UTC" : "");
          switch (I) {
            case f:
              return F ? x(1, 0) : x(31, 11);
            case l:
              return F ? x(1, O) : x(0, O + 1);
            case m:
              var ee = this.$locale().weekStart || 0, te = (V < ee ? V + 7 : V) - ee;
              return x(F ? K - te : K + (6 - te), O);
            case _:
            case u:
              return S(W + "Hours", 0);
            case b:
              return S(W + "Minutes", 1);
            case r:
              return S(W + "Seconds", 2);
            case c:
              return S(W + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, h.endOf = function(d) {
          return this.startOf(d, !1);
        }, h.$set = function(d, k) {
          var g, F = j.p(d), I = "set" + (this.$u ? "UTC" : ""), x = (g = {}, g[_] = I + "Date", g[u] = I + "Date", g[l] = I + "Month", g[f] = I + "FullYear", g[b] = I + "Hours", g[r] = I + "Minutes", g[c] = I + "Seconds", g[o] = I + "Milliseconds", g)[F], S = F === _ ? this.$D + (k - this.$W) : k;
          if (F === l || F === f) {
            var V = this.clone().set(u, 1);
            V.$d[x](S), V.init(), this.$d = V.set(u, Math.min(this.$D, V.daysInMonth())).$d;
          } else
            x && this.$d[x](S);
          return this.init(), this;
        }, h.set = function(d, k) {
          return this.clone().$set(d, k);
        }, h.get = function(d) {
          return this[j.p(d)]();
        }, h.add = function(d, k) {
          var g, F = this;
          d = Number(d);
          var I = j.p(k), x = function(O) {
            var K = U(F);
            return j.w(K.date(K.date() + Math.round(O * d)), F);
          };
          if (I === l)
            return this.set(l, this.$M + d);
          if (I === f)
            return this.set(f, this.$y + d);
          if (I === _)
            return x(1);
          if (I === m)
            return x(7);
          var S = (g = {}, g[r] = t, g[b] = a, g[c] = n, g)[I] || 1, V = this.$d.getTime() + d * S;
          return j.w(V, this);
        }, h.subtract = function(d, k) {
          return this.add(-1 * d, k);
        }, h.format = function(d) {
          var k = this, g = this.$locale();
          if (!this.isValid())
            return g.invalidDate || w;
          var F = d || "YYYY-MM-DDTHH:mm:ssZ", I = j.z(this), x = this.$H, S = this.$m, V = this.$M, O = g.weekdays, K = g.months, W = function(se, ge, Pe, Ae) {
            return se && (se[ge] || se(k, F)) || Pe[ge].slice(0, Ae);
          }, ee = function(se) {
            return j.s(x % 12 || 12, se, "0");
          }, te = g.meridiem || function(se, ge, Pe) {
            var Ae = se < 12 ? "AM" : "PM";
            return Pe ? Ae.toLowerCase() : Ae;
          }, $e = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: V + 1, MM: j.s(V + 1, 2, "0"), MMM: W(g.monthsShort, V, K, 3), MMMM: W(K, V), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: W(g.weekdaysMin, this.$W, O, 2), ddd: W(g.weekdaysShort, this.$W, O, 3), dddd: O[this.$W], H: String(x), HH: j.s(x, 2, "0"), h: ee(1), hh: ee(2), a: te(x, S, !0), A: te(x, S, !1), m: String(S), mm: j.s(S, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: I };
          return F.replace(H, function(se, ge) {
            return ge || $e[se] || I.replace(":", "");
          });
        }, h.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, h.diff = function(d, k, g) {
          var F, I = j.p(k), x = U(d), S = (x.utcOffset() - this.utcOffset()) * t, V = this - x, O = j.m(this, x);
          return O = (F = {}, F[f] = O / 12, F[l] = O, F[v] = O / 3, F[m] = (V - S) / 6048e5, F[_] = (V - S) / 864e5, F[b] = V / a, F[r] = V / t, F[c] = V / n, F)[I] || V, g ? O : j.a(O);
        }, h.daysInMonth = function() {
          return this.endOf(l).$D;
        }, h.$locale = function() {
          return z[this.$L];
        }, h.locale = function(d, k) {
          if (!d)
            return this.$L;
          var g = this.clone(), F = P(d, k, !0);
          return F && (g.$L = F), g;
        }, h.clone = function() {
          return j.w(this.$d, this);
        }, h.toDate = function() {
          return new Date(this.valueOf());
        }, h.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, h.toISOString = function() {
          return this.$d.toISOString();
        }, h.toString = function() {
          return this.$d.toUTCString();
        }, $;
      }(), _e = fe.prototype;
      return U.prototype = _e, [["$ms", o], ["$s", c], ["$m", r], ["$H", b], ["$W", _], ["$M", l], ["$y", f], ["$D", u]].forEach(function($) {
        _e[$[1]] = function(h) {
          return this.$g(h, $[0], $[1]);
        };
      }), U.extend = function($, h) {
        return $.$i || ($(h, fe, U), $.$i = !0), U;
      }, U.locale = P, U.isDayjs = E, U.unix = function($) {
        return U(1e3 * $);
      }, U.en = z[B], U.Ls = z, U.p = {}, U;
    });
  }(qe)), qe.exports;
}
var Gt = ft();
const Xe = /* @__PURE__ */ vt(Gt);
var Xt = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t(ft());
  })(Ge, function(n) {
    function t(c) {
      return c && typeof c == "object" && "default" in c ? c : { default: c };
    }
    var a = t(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(c, r) {
      return r === "W" ? c + "周" : c + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(c, r) {
      var b = 100 * c + r;
      return b < 600 ? "凌晨" : b < 900 ? "早上" : b < 1100 ? "上午" : b < 1300 ? "中午" : b < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(Xt);
var ht = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t();
  })(Ge, function() {
    return function(n, t, a) {
      n = n || {};
      var o = t.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(_, m, l, v) {
        return o.fromToBase(_, m, l, v);
      }
      a.en.relativeTime = c, o.fromToBase = function(_, m, l, v, f) {
        for (var u, w, D, H = l.$locale().relativeTime || c, Y = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], Q = Y.length, A = 0; A < Q; A += 1) {
          var B = Y[A];
          B.d && (u = v ? a(_).diff(l, B.d, !0) : l.diff(_, B.d, !0));
          var z = (n.rounding || Math.round)(Math.abs(u));
          if (D = u > 0, z <= B.r || !B.r) {
            z <= 1 && A > 0 && (B = Y[A - 1]);
            var E = H[B.l];
            f && (z = f("" + z)), w = typeof E == "string" ? E.replace("%d", z) : E(z, m, B.l, D);
            break;
          }
        }
        if (m)
          return w;
        var P = D ? H.future : H.past;
        return typeof P == "function" ? P(w) : P.replace("%s", w);
      }, o.to = function(_, m) {
        return r(_, m, this, !0);
      }, o.from = function(_, m) {
        return r(_, m, this);
      };
      var b = function(_) {
        return _.$u ? a.utc() : a();
      };
      o.toNow = function(_) {
        return this.to(b(this), _);
      }, o.fromNow = function(_) {
        return this.from(b(this), _);
      };
    };
  });
})(ht);
var Qt = ht.exports;
const e1 = /* @__PURE__ */ vt(Qt);
Xe.locale("zh-cn");
Xe.extend(e1);
const Ye = Symbol(), mt = Symbol(), Qe = Symbol(), We = Symbol(), _t = (e) => (ie("data-v-8a9bd61a"), e = e(), re(), e), t1 = { class: "comment-box" }, n1 = {
  key: 0,
  class: "action-box"
}, o1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ i("svg", {
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
], -1)), s1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ i("span", null, "图片", -1)), a1 = { class: "btn-box" }, l1 = /* @__PURE__ */ N({
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
    const t = e, a = L(""), o = L(!1), c = L(!0), r = L(), b = L(), _ = L(), m = L([]), l = L([]), v = ce({
      imgLength: 0
    }), f = ($) => {
      l.value = $;
    }, u = ($) => {
      Ce(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: w, submit: D, focus: H } = ae(mt), Y = ae(He), Q = () => {
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
      r.value.clear(), m.value.length = 0, l.value = [], c.value = !0;
    };
    function E($) {
      Ce(a.value) && !v.imgLength && (o.value = !1, n("hide", $));
    }
    function P() {
      o.value = !0, ke(() => {
        b.value = document.querySelector("div[id^='el-popper-container']");
      }), H();
    }
    function U() {
      console.log(r.value);
    }
    s({
      focus: () => {
        var $;
        return ($ = r.value) == null ? void 0 : $.focus();
      },
      changeMentionShow: ($) => {
        var h;
        return (h = r.value) == null ? void 0 : h.changeMentionShow($);
      },
      AddMention: U
    });
    const j = ($, h) => {
      var k;
      h || (m.value.length = 0, l.value.length = 0);
      const d = h ? [h] : (k = _.value) == null ? void 0 : k.files;
      if (v.imgLength = ye(d == null ? void 0 : d.length, 0), d)
        for (let g = 0; g < d.length; g++) {
          let F = d[g].name, I = Jt(d[g]);
          l.value.push(d[g]), Kt(F) ? m.value.push(I) : tt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, fe = ae(Ye), _e = () => Ie("div", fe.func());
    return ($, h) => ve((p(), C("div", t1, [
      M(y(wt), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": h[0] || (h[0] = (d) => a.value = d),
        class: J({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": m.value,
        onFocus: P,
        onInput: u,
        onSubmit: Q,
        onPaste: j,
        onChangeImgListFn: f
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      M(Ze, { name: "fade" }, {
        default: T(() => [
          o.value ? (p(), C("div", n1, [
            M(y(kt), {
              emoji: y(Y),
              onAddEmoji: h[1] || (h[1] = (d) => {
                var k;
                return (k = r.value) == null ? void 0 : k.addText(d);
              })
            }, null, 8, ["emoji"]),
            y(w) ? (p(), C("div", {
              key: 0,
              class: "picture",
              onClick: h[2] || (h[2] = //@ts-ignore
              (...d) => {
                var k, g;
                return ((k = _.value) == null ? void 0 : k.click) && ((g = _.value) == null ? void 0 : g.click(...d));
              })
            }, [
              o1,
              s1,
              i("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: _,
                type: "file",
                multiple: "",
                onChange: j
              }, null, 544)
            ])) : R("", !0),
            y(fe).func ? (p(), G(_e, { key: 1 })) : R("", !0),
            i("div", a1, [
              M(y(De), {
                type: "primary",
                disabled: c.value,
                onClick: Q
              }, {
                default: T(() => [
                  de(q(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (p(), G(y(De), {
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
      [y(it), E, b.value]
    ]);
  }
});
const Z = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of s)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ Z(l1, [["__scopeId", "data-v-8a9bd61a"]]), i1 = { class: "u-comment-scroll" }, r1 = ["infinite-scroll-disabled"], c1 = { class: "scroll-btn" }, u1 = { key: 1 }, d1 = { key: 2 }, p1 = /* @__PURE__ */ N({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(!1), o = X(() => a.value && n.disable), c = X(() => !a.value || t.value || o.value), r = pt(() => {
      s("more"), t.value = !1;
    }, 500), b = () => {
      t.value = !0, r();
    };
    return (_, m) => (p(), C("div", i1, [
      ve((p(), C("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        pe(_.$slots, "default", {}, void 0, !0),
        i("div", c1, [
          a.value ? R("", !0) : (p(), G(y(rt), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: m[0] || (m[0] = (l) => a.value = !a.value)
          }, {
            default: T(() => [
              de("加载更多")
            ]),
            _: 1
          })),
          t.value ? (p(), C("p", u1, "加载中...")) : R("", !0),
          o.value ? (p(), C("p", d1, "没有更多了")) : R("", !0)
        ])
      ], 8, r1)), [
        [y(At), b]
      ])
    ]));
  }
});
const v1 = /* @__PURE__ */ Z(p1, [["__scopeId", "data-v-404b6e08"]]), f1 = oe(v1), et = (e) => (ie("data-v-3e026489"), e = e(), re(), e), h1 = { class: "nav" }, m1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("span", { class: "nav__title" }, "全部评论", -1)), _1 = { class: "nav__sort" }, g1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
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
], -1)), y1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), w1 = /* @__PURE__ */ N({
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
      const c = ue("u-icon");
      return p(), C("div", h1, [
        m1,
        i("div", _1, [
          i("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: o[0] || (o[0] = (r) => t.value = !0)
          }, [
            M(c, null, {
              default: T(() => [
                g1
              ]),
              _: 1
            }),
            de(" 最新 ")
          ], 2),
          i("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: o[1] || (o[1] = (r) => t.value = !1)
          }, [
            M(c, null, {
              default: T(() => [
                y1
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
const $1 = /* @__PURE__ */ Z(w1, [["__scopeId", "data-v-3e026489"]]), b1 = oe($1), yt = (e) => (ie("data-v-59596f14"), e = e(), re(), e), x1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, C1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("path", {
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
}, S1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), L1 = [
  S1
], z1 = /* @__PURE__ */ N({
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
    return he(
      () => n.modelValue,
      (o) => {
        t.value = o;
      },
      {
        immediate: !0
      }
    ), he(
      () => t.value,
      (o) => {
        s("update:modelValue", o);
      }
    ), (o, c) => (p(), G(y(Bt), {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (r) => t.value = r),
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
          onClick: c[0] || (c[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (p(), C("svg", x1, k1)) : (p(), C("svg", M1, L1))
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
const F1 = /* @__PURE__ */ Z(z1, [["__scopeId", "data-v-59596f14"]]), I1 = oe(F1), T1 = { class: "field" }, H1 = /* @__PURE__ */ N({
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
    return he(
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
    ), (t, a) => (p(), C("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", T1, [
        t.$slots.default || t.vertical ? (p(), C("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          pe(t.$slots, "default", {}, void 0, !0)
        ], 2)) : R("", !0)
      ])
    ], 2));
  }
});
const A1 = /* @__PURE__ */ Z(H1, [["__scopeId", "data-v-153d9bc7"]]), B1 = oe(A1), E1 = [
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
  return E1.find((s) => s.type === e);
}
function O1() {
  return V1;
}
const j1 = {
  key: 1,
  "aria-hidden": "true"
}, R1 = ["xlink:href"], U1 = /* @__PURE__ */ N({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const s = e, n = X(() => "#" + s.name), t = X(() => ({
      fontSize: Ut(s.size) ? s.size + "px" : s.size,
      color: s.color
    }));
    return (a, o) => (p(), C("i", {
      class: "u-icon",
      style: ze(t.value)
    }, [
      a.$slots.default ? pe(a.$slots, "default", { key: 0 }, void 0, !0) : (p(), C("svg", j1, [
        i("use", { "xlink:href": n.value }, null, 8, R1)
      ]))
    ], 4));
  }
});
const Y1 = /* @__PURE__ */ Z(U1, [["__scopeId", "data-v-dd34e834"]]), Le = oe(Y1), N1 = { class: "v-toast" }, P1 = { class: "inner" }, q1 = { class: "message" }, W1 = /* @__PURE__ */ N({
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
    const n = ce(O1().options), t = L(!1);
    return he(
      () => s.type,
      (a) => {
        const o = D1(a);
        o && (n.color = o.options.color, n.bgColor = o.options.bgColor, n.icon = o.options.icon);
      },
      { immediate: !0 }
    ), we(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, s.duration);
    }), (a, o) => (p(), C("div", N1, [
      M(Ze, { name: "v-toast" }, {
        default: T(() => [
          ve(i("div", P1, [
            i("div", q1, [
              n.icon ? (p(), G(y(Le), {
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
const Z1 = /* @__PURE__ */ Z(W1, [["__scopeId", "data-v-7d3c50e0"]]);
function tt(e) {
  let s = e.duration;
  if (!e.message)
    return;
  e.duration = s || 1e3;
  const { vnode: n, div: t } = Yt(Z1, e);
  return setTimeout(() => {
    Nt(t);
  }, e.duration + 300), n;
}
const K1 = ["onKeydown"], J1 = ["onClick"], G1 = { class: "userInfo" }, X1 = ["src"], Q1 = { class: "username" }, en = { class: "empty" }, tn = /* @__PURE__ */ N({
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
    const t = e, a = L(), o = L(-1), c = L(null), r = (l) => {
      var v;
      if (o.value += l, o.value < 0 ? o.value = t.list.length - 1 : o.value >= t.list.length && (o.value = 0), a.value) {
        const f = a.value.wrapRef.children[0].children[o.value];
        if (f) {
          const u = a.value.wrapRef.offsetHeight || 0;
          (v = a.value) == null || v.setScrollTop((o.value - u / f.offsetHeight + 1) * f.offsetHeight);
        }
      }
    }, b = () => {
      if (o.value >= 0 && o.value < t.list.length)
        return t.list[o.value];
    }, _ = (l) => {
      o.value = l, n("insert", t.list[o.value]), n("changeShow", !1);
    };
    he(
      () => t.isShow,
      (l) => {
        l && (o.value = 0, ke(() => {
          a.value && a.value.setScrollTop(0);
        }));
      }
    );
    const m = () => {
      o.value = 0;
    };
    return we(() => {
      var l;
      (l = c.value) == null || l.focus();
    }), s({
      moveSelection: r,
      printSelectedItem: b,
      resetSelectIndex: m
    }), (l, v) => ve((p(), C("ul", {
      ref_key: "mentionList",
      ref: c,
      class: "mention-list",
      tabindex: "0",
      style: ze(`left: ${l.position.left}px; top: ${l.position.top}px`),
      onKeydown: [
        v[0] || (v[0] = xe(Me((f) => r(-1), ["prevent"]), ["up"])),
        v[1] || (v[1] = xe(Me((f) => r(1), ["prevent"]), ["down"])),
        xe(Me(b, ["prevent"]), ["enter"])
      ]
    }, [
      M(y(Re), {
        ref_key: "scrollbarRef",
        ref: a,
        style: { padding: "10px" }
      }, {
        default: T(() => [
          (p(!0), C(ne, null, le(l.list, (f, u) => (p(), C("li", {
            key: u,
            class: J({ hover: u === o.value }),
            onClick: (w) => _(u)
          }, [
            pe(l.$slots, "user", {
              item: f,
              index: u
            }, () => [
              i("div", G1, [
                l.showAvatar ? (p(), C("img", {
                  key: 0,
                  src: f.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, X1)) : R("", !0),
                i("span", Q1, q(f.userName), 1)
              ])
            ], !0)
          ], 10, J1))), 128)),
          ve(i("div", en, [
            M(y(Et), { description: "暂无匹配数据" })
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
const nn = /* @__PURE__ */ Z(tn, [["__scopeId", "data-v-14aad4a8"]]), on = (e) => (ie("data-v-882ab8c4"), e = e(), re(), e), sn = ["placeholder", "onKeydown", "innerHTML"], an = ["src"], ln = ["onClick"], rn = /* @__PURE__ */ on(() => /* @__PURE__ */ i("svg", {
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
], un = /* @__PURE__ */ N({
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
      b3207e26: B.value,
      "0d2df836": z.value
    }));
    const a = L(null), o = L(!1), c = L({
      left: 0,
      top: 0
    });
    function r(x) {
      o.value = x, x || (E.value = "");
    }
    function b(x) {
      c.value = x;
    }
    function _(x) {
      a.value && a.value.moveSelection(x);
    }
    function m() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const l = ae("mentionConfig"), v = ae("changeMetionList"), f = ae("mentionSearch"), u = L(), w = L(), D = L(), H = L(!1), Y = L(!1), Q = L(), { imgList: A } = Ke(t), B = X(() => t.minHeight + "px"), z = X(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), E = L("");
    he(
      () => t.modelValue,
      (x, S) => {
        var O;
        if (H.value || (D.value = x), !((O = l == null ? void 0 : l.value) != null && O.show))
          return;
        x = x.replace(/<br>/g, ""), S = S.replace(/<br>/g, ""), (S.length >= x.length && S.slice(-1) === "@" || x.slice(-7) === "@&nbsp;") && r(!1), o.value && x.slice(-6) !== "&nbsp;" ? (E.value = x.split("@").pop() || "", E.value = E.value.replace("'", ""), console.log(E.value), f(E.value), a.value && a.value.resetSelectIndex()) : o.value && x.slice(-6) === "&nbsp;" && r(!1);
        let V = x.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (V) {
          let K = V.map((ee) => {
            let te = ee.match(/data-id="([^"]*)"/);
            return te ? te[1] : null;
          }), W = l.value.userArr.filter(
            (ee) => K.includes(`${ee[l.value.userIdKey]}`)
          );
          v(W);
        } else
          v([]);
      }
    );
    function P(x) {
      n("focus", x), H.value = !0, Y.value = !0;
    }
    function U(x) {
      var S, V;
      try {
        u.value = (S = window.getSelection()) == null ? void 0 : S.getRangeAt(0);
      } catch (O) {
        console.log(O);
      }
      n("blur", x), (V = w.value) != null && V.innerHTML || (Y.value = !1), H.value = !1;
    }
    function j(x) {
      _(x);
    }
    function fe(x) {
      var V, O;
      const { innerHTML: S } = x.target;
      if (x.data === "@" && (l != null && l.value.show)) {
        try {
          u.value = (V = window.getSelection()) == null ? void 0 : V.getRangeAt(0);
        } catch (W) {
          console.log(W);
        }
        let K = (O = u.value) == null ? void 0 : O.getBoundingClientRect();
        r(!0), K && b({
          left: K.left,
          top: K.top + K.height + 10
        });
      }
      n("update:modelValue", S), n("input", x);
    }
    function _e(x, S) {
      var O, K;
      let V = window.getSelection();
      if (V) {
        if (V.removeAllRanges(), u.value || ((O = w.value) == null || O.focus(), u.value = V.getRangeAt(0)), S && !E.value)
          u.value.startOffset > 0 && (u.value.setStart(u.value.startContainer, u.value.startOffset - 1), u.value.deleteContents());
        else if (S && E.value) {
          let ee = E.value.length + 1, te = u.value.startContainer.data.lastIndexOf("@" + E.value);
          te !== -1 && (u.value.setStart(u.value.startContainer, te), u.value.setEnd(u.value.startContainer, te + ee), u.value.deleteContents());
        }
        u.value.deleteContents(), u.value.insertNode(u.value.createContextualFragment(x)), u.value.collapse(!1), V.addRange(u.value), n("update:modelValue", ((K = w.value) == null ? void 0 : K.innerHTML) || "");
        const W = w.value;
        n("input", W);
      }
    }
    function $(x) {
      const S = x.clipboardData;
      if (S) {
        const V = S.getData("text/plain"), O = S.items.length > 0 ? S.items[0].getAsFile() : null;
        V ? (x.preventDefault(), document.execCommand("insertText", !1, V)) : O && (console.log(O), x.preventDefault(), n("paste", x, O));
      }
    }
    function h() {
      w.value && (w.value.innerHTML = "", n("update:modelValue", w.value.innerHTML), Y.value = !1);
    }
    function d() {
      ke(() => {
        var x;
        (x = w.value) == null || x.focus();
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
        const S = m();
        k(S), r(!1);
      }
    }, F = (x) => {
      var S;
      (S = A == null ? void 0 : A.value) == null || S.splice(x, 1), n("changeImgListFn", Oe(A == null ? void 0 : A.value));
    };
    we(() => {
    }), s({
      addText: _e,
      clear: h,
      focus: d,
      imageRef: Q,
      insertUser: k,
      changeMentionShow: r
    });
    const I = (x) => {
      const S = x[l.value.userNameKey], V = x[l.value.userIdKey], O = l.value.mentionColor || "#409eff", K = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `, W = document.createElement("div");
      W.style.visibility = "hidden", W.innerHTML = K, document.body.appendChild(W);
      const ee = W.querySelector("text");
      let te = 200;
      ee && (te = ee.getComputedTextLength()), document.body.removeChild(W);
      const $e = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${te}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${O}; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent($e).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${S}" style="width:${te}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${S}" data-id="${V}"
     draggable="false"
    >`;
    };
    return (x, S) => {
      var O, K;
      const V = Ft("loading");
      return p(), C("div", {
        class: J(["u-editor", { active: Y.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: w,
          class: "rich-input",
          contenteditable: "",
          placeholder: x.placeholder,
          onFocus: P,
          onInput: fe,
          onBlur: U,
          onKeydown: [
            xe(g, ["enter"]),
            S[0] || (S[0] = xe(Me((W) => j(-1), ["prevent"]), ["up"])),
            S[1] || (S[1] = xe(Me((W) => j(1), ["prevent"]), ["down"]))
          ],
          onPaste: $,
          innerHTML: D.value
        }, null, 40, sn),
        i("div", {
          ref_key: "imageRef",
          ref: Q,
          class: "image-preview-box"
        }, [
          (p(!0), C(ne, null, le(y(A), (W, ee) => (p(), C("div", {
            key: ee,
            class: "image-preview"
          }, [
            i("img", {
              src: W,
              alt: ""
            }, null, 8, an),
            i("div", {
              class: "clean-btn",
              onClick: (te) => F(ee)
            }, cn, 8, ln)
          ]))), 128))
        ], 512),
        ve(M(nn, {
          ref_key: "metionList",
          ref: a,
          "is-show": o.value,
          position: c.value,
          list: (O = y(l)) == null ? void 0 : O.userArr,
          "show-avatar": (K = y(l)) == null ? void 0 : K.showAvatar,
          onInsert: k,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"]), [
          [V, y(l).isLoading]
        ])
      ], 2);
    };
  }
});
const dn = /* @__PURE__ */ Z(un, [["__scopeId", "data-v-882ab8c4"]]), wt = oe(dn);
const pn = { class: "u-fold" }, vn = { class: "action-box select-none" }, fn = /* @__PURE__ */ N({
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
    let c;
    return we(() => {
      c = new ResizeObserver((r) => {
        t.value && o.value && (a.value = o.value.offsetHeight < o.value.scrollHeight);
      }), c.observe(o.value);
    }), Ve(() => {
      c.disconnect();
    }), (r, b) => (p(), C("div", pn, [
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
      i("div", vn, [
        a.value && r.unfold ? (p(), C("div", {
          key: 0,
          class: "expand-btn",
          onClick: b[0] || (b[0] = (_) => t.value = !t.value)
        }, q(t.value ? "展开" : "收起"), 1)) : R("", !0)
      ])
    ]));
  }
});
const hn = /* @__PURE__ */ Z(fn, [["__scopeId", "data-v-1694aa13"]]), $t = oe(hn), mn = /* @__PURE__ */ N({
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
    }), o = (u, w, D) => {
      const H = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!w)
        return D("请输入邮箱!");
      H.test(w) || D("邮箱地址不合法"), D();
    }, c = (u, w, D) => {
      w ? w != a.password ? D("输入密码不一致") : D() : D("请确认密码");
    }, r = L(), b = L(), _ = ce({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), m = ce({
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
        validator: c,
        trigger: "blur"
      }
    }), l = ce({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    he(
      () => t.modelValue,
      (u) => {
        switch (ke(() => f()), u) {
          case "login":
            b.value = _, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            b.value = _, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            b.value = m, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function v() {
      a.type = t.modelValue, r.value.validate((u) => {
        u && n("submit", a);
      });
    }
    function f() {
      r.value.resetFields();
    }
    return s({
      reset: f
    }), (u, w) => {
      const D = ue("el-button");
      return p(), G(y(Vt), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: b.value,
        class: "select-none"
      }, {
        default: T(() => [
          M(y(Fe), { prop: "email" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.email,
                "onUpdate:modelValue": w[0] || (w[0] = (H) => a.email = H),
                placeholder: "请输入邮箱",
                onFocus: w[1] || (w[1] = (H) => u.$emit("toggle", 1)),
                onBlur: w[2] || (w[2] = (H) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          M(y(Fe), { prop: "password" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.password,
                "onUpdate:modelValue": w[3] || (w[3] = (H) => a.password = H),
                placeholder: "请输入密码",
                onFocus: w[4] || (w[4] = (H) => u.$emit("toggle", 2)),
                onBlur: w[5] || (w[5] = (H) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          ve(M(y(Fe), { prop: "checkPass" }, {
            default: T(() => [
              M(y(Ee), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": w[6] || (w[6] = (H) => a.checkPass = H),
                placeholder: "请确认密码",
                onFocus: w[7] || (w[7] = (H) => u.$emit("toggle", 2)),
                onBlur: w[8] || (w[8] = (H) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Se, u.modelValue == "forget"]
          ]),
          M(y(Fe), null, {
            default: T(() => [
              M(D, {
                style: { width: "100%" },
                type: "primary",
                onClick: v
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
                onClick: w[9] || (w[9] = (H) => u.$emit("update:modelValue", l.one.key))
              }, q(l.one.value), 1),
              i("div", {
                onClick: w[10] || (w[10] = (H) => u.$emit("update:modelValue", l.two.key))
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
const _n = /* @__PURE__ */ Z(mn, [["__scopeId", "data-v-525985f8"]]), gn = { class: "u-sign" }, yn = { class: "sign-oauth" }, wn = /* @__PURE__ */ N({
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
    return (c, r) => {
      const b = ue("u-divider"), _ = ue("u-icon"), m = ue("u-dialog");
      return p(), C("div", gn, [
        M(y(De), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: T(() => [
            de("登录/注册")
          ]),
          _: 1
        }),
        M(m, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: o.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: T(() => [
            M(_n, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => a.value = l),
              onSubmit: r[3] || (r[3] = (l) => c.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            M(b, null, {
              default: T(() => [
                de("其他方式登录")
              ]),
              _: 1
            }),
            i("div", yn, [
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
const $n = /* @__PURE__ */ Z(wn, [["__scopeId", "data-v-8e737450"]]), bn = oe($n), xn = (e) => (ie("data-v-3a07e116"), e = e(), re(), e), Cn = { class: "custom-contextmenu__menu" }, kn = ["onClick"], Mn = /* @__PURE__ */ xn(() => /* @__PURE__ */ i("div", { class: "arrow" }, null, -1)), Sn = /* @__PURE__ */ N({
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
    const { isShow: c, dropdownList: r, tag: b } = Ke(t);
    return s({
      openContextmenu: a
    }), (_, m) => {
      const l = ue("u-icon");
      return p(), G(Ze, { name: "el-zoom-in-center" }, {
        default: T(() => [
          ve(i("div", {
            style: ze(`top: ${_.dropdown.y + 5}px; left: ${_.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            i("ul", Cn, [
              (p(!0), C(ne, null, le(y(r), (v, f) => (p(), C(ne, { key: f }, [
                v.show ? (p(), C("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (u) => _.$emit("submit", f, y(b))
                }, [
                  M(l, {
                    innerHTML: v.icon
                  }, null, 8, ["innerHTML"]),
                  i("span", null, q(v.title), 1)
                ], 8, kn)) : R("", !0)
              ], 64))), 128))
            ]),
            Mn
          ], 4), [
            [Se, y(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Ln = /* @__PURE__ */ Z(Sn, [["__scopeId", "data-v-3a07e116"]]), zn = (e) => (ie("data-v-f7d57bb4"), e = e(), re(), e), Fn = { class: "u-tabs" }, In = ["onClick", "onContextmenu"], Tn = { class: "select-none" }, Hn = /* @__PURE__ */ zn(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), An = /* @__PURE__ */ N({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: s }) {
    const n = e, t = L(), a = L(), o = lt(n, "modelValue"), c = L(0), r = ce({
      x: 0,
      y: 0
    });
    he(
      () => [...o.value],
      (v, f) => {
        if (f) {
          if (console.log(v, f), v.length > f.length) {
            let u = v.find((w) => !(f != null && f.includes(w)));
            o.value.forEach((w, D, H) => {
              H.findIndex((Y) => Y.path == w.path) != D && H.splice(D, 1);
            }), c.value = o.value.findIndex((w) => w.path == (u == null ? void 0 : u.path));
          }
        } else {
          let u = 1;
          o.value.forEach((w, D, H) => {
            H.findIndex((Y) => Y.path == w.path) != D && (H.splice(D, 1), c.value = H.findIndex((Y) => Y.path == w.path), u = 0);
          }), u && (c.value = o.value.length - 1);
        }
        ke(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), he(
      () => c.value,
      (v) => {
        s(
          "select",
          o.value.find((f, u) => u == v)
        );
      }
    );
    const b = (v) => {
      o.value.map((f, u) => {
        if (!f.meta.isAffix && v == u)
          if (o.value.splice(u, 1), u == c.value) {
            let D = [u, u - 1].filter((H) => H >= 0 && H < o.value.length);
            c.value = D[0], c.value == u && s(
              "select",
              o.value.find((H, Y) => Y == v)
            );
          } else
            v < c.value && (c.value -= 1);
      });
    }, _ = (v) => {
      let f = o.value.filter((w) => w.meta.isAffix);
      v && !v.meta.isAffix && f.push(v), o.value.length = 0, o.value.push(...f);
      let u = o.value.length - 1;
      c.value = u >= 0 ? u : 0;
    }, m = (v, f) => {
      switch (v) {
        case 0:
          s("refresh", f);
          break;
        case 1:
          let u = o.value.findIndex((w) => w.path == f.path);
          b(u), s("close", f);
          break;
        case 2:
          _(f), s("closeOther", f);
          break;
        case 3:
          _(), s("closeAll");
          break;
        case 4:
          s("fullScreen", f);
          break;
      }
    }, l = (v, f) => {
      const { clientX: u, clientY: w } = f;
      r.x = u, r.y = w, a.value.openContextmenu(v);
    };
    return (v, f) => {
      const u = ue("u-icon");
      return p(), C("div", Fn, [
        M(y(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: T(() => [
            i("ul", {
              class: J([{ "classic-style": v.classic }, "u-tabs-ul"])
            }, [
              (p(!0), C(ne, null, le(v.modelValue, (w, D) => (p(), C("li", {
                key: D,
                class: J([{ "is-active": c.value == D }, "u-tabs-ul-li"]),
                onClick: (H) => c.value = D,
                onContextmenu: Me((H) => l(w, H), ["prevent"])
              }, [
                i("span", Tn, q(w.meta.title), 1),
                w.meta.isAffix ? R("", !0) : (p(), G(u, {
                  key: 0,
                  onClick: Me((H) => m(1, w), ["stop"])
                }, {
                  default: T(() => [
                    Hn
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, In))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        M(Ln, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: m
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const Bn = /* @__PURE__ */ Z(An, [["__scopeId", "data-v-f7d57bb4"]]), En = oe(Bn), Vn = { key: 0 }, Dn = /* @__PURE__ */ N({
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
    }), t = L({}), a = L({}), o = X(() => s.delay > 2e3 ? s.delay : 2e3), c = () => {
      ke(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          b();
        }, s.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / s.spped, n.twoTime = (n.textWidth + n.boxWidth) / s.spped;
    }, b = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, _ = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          b();
        },
        !1
      );
    };
    return we(() => {
      s.vertical || (c(), _());
    }), (m, l) => {
      const v = ue("el-carousel-item"), f = ue("u-icon");
      return p(), C("div", {
        class: "u-notice-bar",
        style: ze({ background: m.background, height: `${m.height}px` })
      }, [
        m.vertical ? (p(), C("div", Vn, [
          M(y(Dt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: o.value
          }, {
            default: T(() => [
              (p(!0), C(ne, null, le(m.data, (u) => (p(), G(v, { key: u }, {
                default: T(() => [
                  de(q(u), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (p(), C("div", {
          key: 1,
          style: ze({ color: m.color, fontSize: `${m.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          m.prefixIcon ? (p(), G(f, {
            key: 0,
            name: m.prefixIcon
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
            }, q(m.data), 513)
          ], 512),
          m.suffixIcon ? (p(), G(f, {
            key: 1,
            name: m.suffixIcon
          }, null, 8, ["name"])) : R("", !0)
        ], 4))
      ], 4);
    };
  }
});
const On = /* @__PURE__ */ Z(Dn, [["__scopeId", "data-v-723bc558"]]), jn = oe(On), Rn = (e) => (ie("data-v-11b4e56c"), e = e(), re(), e), Un = { class: "u-anchor" }, Yn = { class: "toc-content" }, Nn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Pn = { class: "toc-items" }, qn = ["onClick"], Wn = /* @__PURE__ */ N({
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
    }, c = () => {
      const _ = [];
      t.value.forEach((v) => {
        _.push(v.offsetTop);
      });
      const l = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      _.forEach((v, f) => {
        l >= v - 10 - s.targetOffset && (n.value = f);
      });
    }, r = (_) => {
      const m = t.value.item(_);
      console.log(m), s.scroll ? a.value.scrollTo({
        top: m.offsetTop - s.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: m.offsetTop - s.targetOffset,
        behavior: "smooth"
      });
    };
    we(() => {
    }), Ve(() => {
      a.value.removeEventListener("scroll", c);
    });
    let b;
    return we(() => {
      let _ = document.querySelector(s.container);
      b = new ResizeObserver((m) => {
        s.scroll ? a.value = document.querySelector(s.scroll) : a.value = window, t.value = _.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), b.observe(_);
    }), Ve(() => {
      a.value.removeEventListener("scroll", c), b.disconnect();
    }), (_, m) => {
      const l = ue("u-divider");
      return p(), C("div", Un, [
        i("nav", Yn, [
          Nn,
          M(l),
          i("ul", Pn, [
            (p(!0), C(ne, null, le(t.value, (v, f) => (p(), C("li", {
              key: f,
              class: J([{ active: n.value == f }, o(v.nodeName)]),
              onClick: (u) => r(f)
            }, q(v.innerText), 11, qn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Zn = /* @__PURE__ */ Z(Wn, [["__scopeId", "data-v-11b4e56c"]]), Kn = oe(Zn), Te = (e) => (ie("data-v-c739035a"), e = e(), re(), e), Jn = { class: "card-box u-scrollbar" }, Gn = {
  key: 0,
  class: "history"
}, Xn = { class: "header" }, Qn = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "title" }, "历史搜索", -1)), eo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
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
}, no = { class: "title" }, oo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("span", null, "热搜", -1)), so = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
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
], -1)), ao = { class: "hot-list" }, lo = ["onClick"], io = { class: "trending-text u-ellipsis" }, ro = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "trending-mark" }, null, -1)), co = /* @__PURE__ */ N({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: s }) {
    const n = e, t = X(() => !(Ce(n.data.historySearchList) && Ce(n.data.hotSearchList)));
    return (a, o) => {
      const c = ue("u-icon");
      return ve((p(), C("div", Jn, [
        a.data.historySearchList.length != 0 ? (p(), C("div", Gn, [
          i("div", Xn, [
            Qn,
            M(y(rt), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (r) => a.$emit("onClear"))
            }, {
              default: T(() => [
                M(c, null, {
                  default: T(() => [
                    eo
                  ]),
                  _: 1
                }),
                de(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (p(!0), C(ne, null, le(a.data.historySearchList, (r, b) => (p(), G(y(Ot), {
            key: b,
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
        y(Ce)(a.data.hotSearchList) ? R("", !0) : (p(), C("div", to, [
          i("div", no, [
            oo,
            M(c, { style: { margin: "0 6px" } }, {
              default: T(() => [
                so
              ]),
              _: 1
            })
          ]),
          i("div", ao, [
            (p(!0), C(ne, null, le(a.data.hotSearchList, (r, b) => (p(), C("div", {
              key: b,
              class: "hot-item",
              onClick: (_) => a.$emit("submit", r)
            }, [
              i("div", {
                class: J(["trending-rank", { "trending-rank-top": b < 3 }])
              }, q(b + 1), 3),
              i("div", io, q(r), 1),
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
const uo = /* @__PURE__ */ Z(co, [["__scopeId", "data-v-c739035a"]]), nt = (e) => (ie("data-v-df2be5d9"), e = e(), re(), e), po = { class: "u-search" }, vo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, fo = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
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
], -1)), ho = ["data-before", "data-after"], mo = ["placeholder"], _o = { class: "btn" }, go = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
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
], -1)), yo = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ i("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), wo = /* @__PURE__ */ N({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = L({}), o = lt(t.config, "keywords"), c = L(!1), r = L(0), b = L(!0), _ = L(), m = ce({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), l = ce({
      search: t.config.search || "",
      visible: !1,
      historySearchList: Be.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    he(
      () => t.config.hotSearchList,
      (A) => {
        l.hotSearchList = A;
      }
    ), he(
      () => t.config.search,
      (A) => {
        l.search = A || "";
      }
    );
    const v = X(() => {
      let A = o.value[r.value];
      return c.value || l.search ? "" : A;
    }), f = X(() => {
      let A = typeof o.value[r.value + 1] > "u" ? o.value[0] : o.value[r.value + 1];
      return c.value || l.search ? "" : A;
    }), u = X(() => {
      let A = o.value[r.value];
      return c.value ? A : "";
    }), w = X(() => !c.value && !l.search && b.value), D = (A) => {
      if (A != null && A.trim() != "") {
        let B = (E, P) => Math.round(Math.random() * (P - E)) + E, z = (E) => l.historySearchList.filter((P) => P.name == E).length != 0;
        if (A && l.historySearchList)
          z(A) || l.historySearchList.unshift({ name: A, type: m.types[B(0, 3)] });
        else {
          let E = c.value ? u : v;
          A = E.value, z(E.value) || l.historySearchList.unshift({ name: E.value, type: m.types[B(0, 3)] });
        }
        Be.set("searchHistory", l.historySearchList);
      }
      l.search = A, a.value.focus(), n("submit", A);
    }, H = (A) => {
      l.historySearchList.findIndex((B) => B.name == A), l.historySearchList.splice(
        l.historySearchList.findIndex((B) => B.name == A),
        1
      ), Be.set("searchHistory", l.historySearchList);
    }, Y = () => {
      l.historySearchList.length = 0, Be.remove("searchHistory");
    }, Q = (A) => {
      if (A.pseudoElement == "::after") {
        b.value = !1;
        let B = typeof o.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = B, setTimeout(() => {
          b.value = !0;
        }, 3e3);
      }
    };
    return s({
      close: () => l.visible = !1
    }), (A, B) => {
      const z = ue("u-icon");
      return p(), C("div", po, [
        i("div", {
          class: J(["search", { active: c.value }])
        }, [
          i("div", vo, [
            M(z, null, {
              default: T(() => [
                fo
              ]),
              _: 1
            })
          ]),
          i("label", {
            ref_key: "labelRef",
            ref: _,
            "data-before": v.value,
            "data-after": f.value,
            class: J({ animate: w.value }),
            onAnimationend: Q
          }, [
            ve(i("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": B[0] || (B[0] = (E) => l.search = E),
              type: "text",
              placeholder: u.value,
              onFocus: B[1] || (B[1] = () => {
                c.value = !0, l.visible = !0;
              }),
              onBlur: B[2] || (B[2] = (E) => c.value = !1),
              onKeyup: B[3] || (B[3] = xe((E) => D(l.search), ["enter"]))
            }, null, 40, mo), [
              [It, l.search]
            ])
          ], 42, ho),
          i("div", _o, [
            ve(M(z, {
              class: "close",
              onClick: B[4] || (B[4] = (E) => l.search = "")
            }, {
              default: T(() => [
                go
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
                  yo
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        ve(M(uo, {
          data: l,
          onOnClose: H,
          onOnClear: Y,
          onSubmit: D
        }, null, 8, ["data"]), [
          [y(it), () => l.visible = !1, _.value]
        ])
      ]);
    };
  }
});
const $o = /* @__PURE__ */ Z(wo, [["__scopeId", "data-v-df2be5d9"]]), bo = oe($o), bt = (e, s) => {
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
}, v2 = (e, s, n) => {
  let t = (e - 1) * s;
  return t + s >= n.length ? n.slice(t, n.length) : n.slice(t, t + s);
}, xt = (e) => (ie("data-v-f75472b5"), e = e(), re(), e), Co = { class: "message" }, ko = { class: "chat-list" }, Mo = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), So = { class: "content" }, Lo = {
  key: 0,
  class: "username"
}, zo = ["innerHTML"], Fo = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), Io = /* @__PURE__ */ N({
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
    }), (o, c) => (p(), C("div", Co, [
      M(y(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: T(() => [
          i("div", ko, [
            (p(!0), C(ne, null, le(o.data, (r, b) => (p(), C("div", {
              key: b,
              class: J([{ self: o.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                M(y(Je), null, {
                  default: T(() => [
                    Mo
                  ]),
                  _: 1
                })
              ]),
              i("div", So, [
                o.userId != r.id ? (p(), C("div", Lo, q(r.username), 1)) : R("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: y(bt)(y(n), r.content)
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
const To = /* @__PURE__ */ Z(Io, [["__scopeId", "data-v-f75472b5"]]), Ne = (e) => (ie("data-v-18726a6b"), e = e(), re(), e), Ho = { class: "u-chat" }, Ao = { class: "header" }, Bo = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
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
], -1)), Eo = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ i("div", null, "聊天室"),
  /* @__PURE__ */ i("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Vo = {
  id: "chat-footer",
  class: "footer"
}, Do = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
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
], -1)), Oo = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), jo = /* @__PURE__ */ N({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(""), o = L(), c = (m) => {
      const { ctrlKey: l, key: v } = m;
      l && v == "Enter" && b();
    }, r = () => {
      a.value = "", o.value.scroll();
    }, b = () => {
      let m = a.value;
      m.trim() ? (m = m.replace(/\n/g, "<br/>"), s("submit", { clear: r, content: m })) : tt({ type: "error", message: "内容不能为空" });
    }, _ = (m) => {
      let l = document.getElementById("emojiInput"), v = l.selectionStart, f = l.selectionEnd, u = l.value;
      if (v === null || f === null)
        return;
      let w = u.substring(0, v) + m + u.substring(f);
      l.value = w, l.focus(), l.selectionStart = v + m.length, l.selectionEnd = v + m.length, a.value = w;
    };
    return me(He, n.emoji), (m, l) => {
      const v = ue("u-icon"), f = ue("u-emoji");
      return p(), C("div", Ho, [
        i("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", Ao, [
            M(v, { size: "32" }, {
              default: T(() => [
                Bo
              ]),
              _: 1
            }),
            Eo
          ]),
          M(To, {
            ref_key: "messageRef",
            ref: o,
            data: m.data,
            "user-id": m.userId
          }, null, 8, ["data", "user-id"]),
          i("div", Vo, [
            M(y(Ee), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: xe(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            M(f, {
              style: { margin: "0 8px 0" },
              emoji: m.emoji,
              placement: "top-end",
              onAddEmoji: _
            }, {
              default: T(() => [
                Do
              ]),
              _: 1
            }, 8, ["emoji"]),
            M(v, {
              size: "18",
              class: J([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: b
            }, {
              default: T(() => [
                Oo
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        M(y(De), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (u) => t.value = !t.value)
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
const Ro = /* @__PURE__ */ Z(jo, [["__scopeId", "data-v-18726a6b"]]), Uo = oe(Ro), Ct = (e) => (ie("data-v-85c87038"), e = e(), re(), e), Yo = { class: "u-emoji" }, No = { class: "face-tooltip-head select-none" }, Po = ["onClick"], qo = ["src"], Wo = { class: "emoji-body select-none" }, Zo = { style: { padding: "0 5px" } }, Ko = ["onClick"], Jo = { class: "emoji-btn select-none" }, Go = { key: 0 }, Xo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("svg", {
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
], -1)), Qo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("span", null, "表情", -1)), es = [
  Xo,
  Qo
], ts = /* @__PURE__ */ N({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: s }) {
    const n = e, t = L(0), a = L(0), o = L(new Array(2)), { emojiList: c, faceList: r } = n.emoji;
    function b(m) {
      switch (t.value = m, m) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, o.value[1] = c[1];
          break;
      }
    }
    function _() {
      o.value[0] = c[0];
    }
    return (m, l) => (p(), C("div", Yo, [
      M(y(ct), {
        placement: m.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: _
      }, {
        reference: T(() => [
          i("div", Jo, [
            m.$slots.default ? pe(m.$slots, "default", { key: 1 }, void 0, !0) : (p(), C("div", Go, es))
          ])
        ]),
        default: T(() => [
          i("div", No, [
            (p(!0), C(ne, null, le(y(r), (v, f) => (p(), C("label", {
              key: f,
              class: J(t.value == f ? "active" : ""),
              onClick: (u) => b(f)
            }, [
              i("img", {
                src: v,
                alt: ""
              }, null, 8, qo)
            ], 10, Po))), 128))
          ]),
          i("div", Wo, [
            i("div", {
              class: "emjio-container",
              style: ze({ transform: `translateX(${a.value}%)` })
            }, [
              (p(!0), C(ne, null, le(o.value, (v, f) => (p(), C("div", {
                key: f,
                class: "emoji-wrapper"
              }, [
                M(y(Re), null, {
                  default: T(() => [
                    i("div", Zo, [
                      (p(!0), C(ne, null, le(v, (u, w) => (p(), C("span", {
                        key: w,
                        class: "emoji-item",
                        onClick: (D) => m.$emit("addEmoji", w)
                      }, [
                        M(y(ut), {
                          src: u,
                          title: String(w),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Ko))), 128))
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
const ns = /* @__PURE__ */ Z(ts, [["__scopeId", "data-v-85c87038"]]), He = Symbol(), kt = oe(ns), os = /* @__PURE__ */ N({
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
      const m = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let v = l.split("."), f = v[0], u = v.length > 1 ? n.decimalSeparator + v[1] : "", w = !isNaN(parseFloat(n.separator));
      if (n.separator && !w)
        for (; m.test(f); )
          f = f.replace(m, "$1" + n.separator + "$2");
      return f + u;
    }), c = X(() => `${n.prefix}${o.value}${n.suffix}`);
    we(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      b(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(_);
    }, b = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, _ = (m) => {
      t.timestamp = m, t.startTimestamp || (t.startTimestamp = m);
      let l = m - t.startTimestamp;
      t.remaining = t.currentDuration - l, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(_) : s("finished");
    };
    return (m, l) => (p(), C("span", null, q(c.value), 1));
  }
}), ss = oe(os), at = /* @__PURE__ */ N({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const s = L({}), { showInfo: n } = ae(Qe), t = ae(Ye), a = () => Ie("div", t.card(s.value));
    return (o, c) => y(t).card ? (p(), G(y(ct), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => y(n)(o.uid, (r) => s.value = r))
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
}), ot = (e) => (ie("data-v-d057ae4a"), e = e(), re(), e), as = { class: "comment-sub" }, ls = ["href", "target"], is = { key: 0 }, rs = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, cs = { class: "comment-primary" }, us = { class: "comment-main" }, ds = { class: "user-info" }, ps = ["href", "target"], vs = { class: "username" }, fs = {
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
}, $s = { class: "action-box select-none" }, bs = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), xs = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ i("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), Cs = { key: 2 }, ks = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), Ms = { key: 0 }, Ss = /* @__PURE__ */ N({
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
    }), { allEmoji: c } = ae(He), { like: r, user: b, relativeTime: _, aTarget: m, showLevel: l, showLikes: v, showAddress: f, showHomeLink: u, showReply: w } = ae(
      Qe
    );
    function D() {
      n.active = !n.active, n.active && ke(() => {
        var z;
        (z = t.value) == null || z.focus();
      });
    }
    function H(z) {
      var P;
      const E = z.target;
      (P = a.value) != null && P.contains(E) || (n.active = !1);
    }
    const Y = ae(Ye), Q = () => Ie("div", Y.info(s.data)), A = () => Ie("div", Y.operate(s.data)), B = X(() => bt(c, s.data.content));
    return (z, E) => (p(), C("div", {
      class: J(["comment", { reply: s.reply }])
    }, [
      i("div", as, [
        M(at, {
          uid: y(be)(z.data.uid)
        }, {
          default: T(() => [
            i("a", {
              href: z.data.user.homeLink,
              target: y(m),
              class: J([{ "pointer-events-none": !y(u) }, "no-underline"]),
              style: { display: "block" }
            }, [
              M(y(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: z.data.user.avatar
              }, {
                default: T(() => [
                  z.data.user.avatar ? (p(), C("span", is, q(z.data.user.username), 1)) : (p(), C("img", rs))
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
            M(at, {
              uid: y(be)(z.data.uid)
            }, {
              default: T(() => [
                i("a", {
                  href: z.data.user.homeLink,
                  target: y(m),
                  class: J([{ "pointer-events-none": !y(u) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  i("div", vs, [
                    i("span", fs, q(z.data.user.username), 1),
                    y(l) ? (p(), C("span", hs, [
                      M(y(Le), {
                        size: "24",
                        innerHTML: y(xo)(z.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : R("", !0)
                  ])
                ], 10, ps)
              ]),
              _: 1
            }, 8, ["uid"]),
            y(f) ? (p(), C("span", ms, "   " + q(z.data.address), 1)) : R("", !0),
            y(Y).info ? (p(), G(Q, { key: 1 })) : R("", !0),
            i("time", _s, q(y(_) ? y(Xe)(z.data.createTime).fromNow() : z.data.createTime), 1)
          ]),
          i("div", gs, [
            M(y($t), { unfold: "" }, {
              default: T(() => [
                i("div", { innerHTML: B.value }, null, 8, ys),
                i("div", ws, [
                  (p(!0), C(ne, null, le(o.value, (P, U) => (p(), G(y(ut), {
                    key: U,
                    src: P,
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
          i("div", $s, [
            y(v) ? (p(), C("div", {
              key: 0,
              class: "item",
              onClick: E[0] || (E[0] = (P) => y(r)(y(be)(z.data.id)))
            }, [
              y(b).likeIds && y(b).likeIds.map(String).indexOf(y(be)(z.data.id)) == -1 ? (p(), G(y(Le), { key: 0 }, {
                default: T(() => [
                  bs
                ]),
                _: 1
              })) : (p(), G(y(Le), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: T(() => [
                  xs
                ]),
                _: 1
              })),
              z.data.likes != 0 ? (p(), C("span", Cs, q(z.data.likes), 1)) : R("", !0)
            ])) : R("", !0),
            y(w) ? (p(), C("div", {
              key: 1,
              ref_key: "btnRef",
              ref: a,
              class: J(["item", { active: n.active }]),
              onClick: D
            }, [
              M(y(Le), null, {
                default: T(() => [
                  ks
                ]),
                _: 1
              }),
              i("span", null, q(n.active ? "取消回复" : "回复"), 1)
            ], 2)) : R("", !0),
            y(Y).operate ? (p(), G(A, { key: 2 })) : R("", !0)
          ]),
          n.active ? (p(), C("div", Ms, [
            M(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": y(be)(z.id),
              placeholder: `回复 @${z.data.user.username}...`,
              reply: z.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: H,
              onClose: E[1] || (E[1] = (P) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : R("", !0)
        ]),
        pe(z.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const Mt = /* @__PURE__ */ Z(Ss, [["__scopeId", "data-v-d057ae4a"]]), Ls = (e) => (ie("data-v-d640faf0"), e = e(), re(), e), zs = {
  key: 0,
  class: "reply-box"
}, Fs = { class: "reply-list" }, Is = {
  key: 0,
  class: "fetch-more"
}, Ts = { key: 0 }, Hs = { key: 1 }, As = { key: 0 }, Bs = /* @__PURE__ */ Ls(() => /* @__PURE__ */ i("svg", {
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
}, Vs = /* @__PURE__ */ N({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const s = e, n = ce({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: o } = ae(We), { page: c } = ae(We), r = X(() => {
      let v = {
        total: 0,
        length: 0,
        list: []
      };
      if (s.data) {
        let f = s.data.list.length;
        v = {
          total: s.data.total,
          length: f,
          list: s.data.list
        };
      }
      if (!n.over) {
        let f = v.list.slice(0, a);
        v.list = f;
      }
      return c && (v.list = v.list.slice(0, n.pageSize)), v;
    }), b = () => {
      n.over = !0;
    }, _ = (v) => {
      o.value.forEach((f) => {
        f.id == s.id && f.reply && (f.reply = v);
      });
    }, m = (v) => {
      n.pageNum = v, t(s.id, v, n.pageSize, (f) => _(f));
    }, l = (v) => {
      n.pageSize = v, t(s.id, n.pageNum, v, (f) => _(f));
    };
    return (v, f) => r.value.length > 0 ? (p(), C("div", zs, [
      i("div", Fs, [
        (p(!0), C(ne, null, le(r.value.list, (u, w) => (p(), G(Mt, {
          id: v.id,
          key: w,
          data: u,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > y(a) ? (p(), C("div", Is, [
          n.loading ? (p(), C("span", Ts, "加载中...")) : (p(), C("div", Hs, [
            n.over ? R("", !0) : (p(), C("div", As, [
              de(" 共" + q(r.value.total) + "条回复, ", 1),
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: b
              }, [
                de(" 点击查看 "),
                Bs
              ])
            ]))
          ]))
        ])) : R("", !0),
        n.over && y(c) ? (p(), C("div", Es, [
          M(y(jt), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "page-size": n.pageSize,
            onCurrentChange: m,
            onSizeChange: l
          }, null, 8, ["total", "page-size"])
        ])) : R("", !0)
      ])
    ])) : R("", !0);
  }
});
const Ds = /* @__PURE__ */ Z(Vs, [["__scopeId", "data-v-d640faf0"]]), Os = {
  key: 0,
  class: "comment-list"
}, js = /* @__PURE__ */ N({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (s, n) => s.data ? (p(), C("div", Os, [
      (p(!0), C(ne, null, le(s.data, (t) => (p(), G(Mt, {
        id: y(be)(t.id),
        key: y(be)(t.id),
        data: t
      }, {
        default: T(() => [
          M(Ds, {
            id: y(be)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : R("", !0);
  }
});
const St = (e) => (ie("data-v-b4f327c1"), e = e(), re(), e), Rs = { class: "u-comment" }, Us = {
  key: 0,
  class: "comment-form"
}, Ys = /* @__PURE__ */ St(() => /* @__PURE__ */ i("div", { class: "header" }, [
  /* @__PURE__ */ i("span", { class: "header-title" }, "评论")
], -1)), Ns = { class: "content" }, Ps = { class: "avatar-box" }, qs = { key: 0 }, Ws = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Zs = {
  key: 1,
  class: "comment-list-wrapper"
}, Ks = /* @__PURE__ */ St(() => /* @__PURE__ */ i("div", { class: "title" }, "全部评论", -1)), Js = /* @__PURE__ */ N({
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
      replyShowSize: c,
      aTarget: r,
      placeholder: b = "输入评论（Enter换行，Ctrl + Enter发送）",
      showForm: _ = !0,
      showContent: m = !0,
      showLevel: l = !0,
      showLikes: v = !0,
      showAddress: f = !0,
      showHomeLink: u = !0,
      showReply: w = !0,
      mentionConfig: D
    } = Ke(t.config), H = ({ content: $, parentId: h, reply: d, files: k, clear: g }) => {
      const F = (I) => {
        if (g(), I)
          if (h) {
            let x = o.value.find((S) => S.id == h);
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
      n("submit", { content: $, parentId: h, reply: d, files: k, mentionList: U.value, finish: F });
    }, Y = {
      upload: t.upload,
      submit: H,
      focus: () => n("focus")
    };
    me(mt, Y), me("cancelFn", () => n("cancel"));
    const Q = ($, h) => {
      let d = null;
      o.value.forEach((k) => {
        var g;
        k.id == $ ? d = k : d = (g = k.reply) == null ? void 0 : g.list.find((F) => F.id == $), d && d.likes && (d.likes += h);
      });
    }, B = {
      user: a,
      like: ($) => {
        const h = t.config.user.likeIds;
        h && n("like", $, () => {
          if (h.findIndex((d) => d == $) == -1)
            h.push($), Q($, 1);
          else {
            let d = h.findIndex((k) => k == $);
            d != -1 && (h.splice(d, 1), Q($, -1));
          }
        });
      },
      relativeTime: ye(t.relativeTime, !1),
      showInfo: ($, h) => n("showInfo", $, h),
      aTarget: ye(r, "_blank"),
      showLevel: l,
      showLikes: v,
      showAddress: f,
      showHomeLink: u,
      showReply: w
    };
    me(Qe, B);
    const z = {
      page: t.page,
      replyPage: ($, h, d, k) => {
        n("replyPage", { parentId: $, pageNum: h, pageSize: d, finish: k });
      },
      replyShowSize: ye(c == null ? void 0 : c.value, 3),
      comments: o
    };
    me(We, z);
    const E = ($) => {
      const { parentId: h, id: d } = $;
      if (h) {
        let k = o.value.find((F) => F.id == h), g = k == null ? void 0 : k.reply;
        if (g) {
          let F = g.list.findIndex((I) => I.id == d);
          F != -1 && (g.list.splice(F, 1), g.total--);
        }
      } else {
        let k = o.value.findIndex((g) => g.id == d);
        k != -1 && o.value.splice(k, 1);
      }
    }, P = L(null), U = L([]);
    function j($) {
      U.value = $;
    }
    function fe() {
      return U.value;
    }
    const _e = pt(($) => {
      n("mentionSearch", $);
    }, 300);
    return me(He, t.config.emoji), me("mentionConfig", D), me(Ye, Tt()), me("changeMetionList", j), me("mentionSearch", _e), s({
      remove: E,
      mentionList: U,
      getMentionList: fe,
      setMentionShow: ($) => {
        P.value.setMentionShow($);
      }
    }), ($, h) => (p(), C("div", Rs, [
      y(_) ? (p(), C("div", Us, [
        pe($.$slots, "header", {}, () => [
          Ys
        ], !0),
        i("div", Ns, [
          i("div", Ps, [
            M(y(Je), {
              size: 40,
              src: $.config.user.avatar
            }, {
              default: T(() => [
                $.config.user.username ? (p(), C("span", qs, q($.config.user.username), 1)) : (p(), C("img", Ws))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          M(gt, Ht($.$attrs, {
            ref_key: "inputBox",
            ref: P,
            placeholder: y(b),
            "content-btn": "发表评论"
          }), null, 16, ["placeholder"])
        ])
      ])) : R("", !0),
      y(m) ? (p(), C("div", Zs, [
        pe($.$slots, "default", {}, () => [
          Ks
        ], !0),
        M(js, { data: y(o) }, null, 8, ["data"])
      ])) : R("", !0)
    ]));
  }
});
const Gs = /* @__PURE__ */ Z(Js, [["__scopeId", "data-v-b4f327c1"]]), Xs = oe(Gs), Qs = [
  Xs,
  f1,
  b1,
  I1,
  B1,
  wt,
  $t,
  Le,
  bn,
  En,
  jn,
  Kn,
  bo,
  Uo,
  kt,
  ss
];
const e2 = (e) => {
  Qs.forEach((s) => {
    e.use(s);
  });
}, f2 = {
  install: e2
};
export {
  _2 as ElAvatar,
  g2 as ElButton,
  y2 as ElCarousel,
  w2 as ElDialog,
  $2 as ElDropdown,
  b2 as ElDropdownItem,
  x2 as ElDropdownMenu,
  C2 as ElEmpty,
  k2 as ElImage,
  M2 as ElInput,
  S2 as ElLink,
  L2 as ElPagination,
  z2 as ElPopover,
  F2 as ElScrollbar,
  I2 as ElTag,
  He as InjectionEmojiApi,
  Kn as UAnchor,
  Uo as UChat,
  Xs as UComment,
  b1 as UCommentNav,
  f1 as UCommentScroll,
  ss as UCounter,
  I1 as UDialog,
  B1 as UDivider,
  wt as UEditor,
  kt as UEmoji,
  $t as UFold,
  Le as UIcon,
  jn as UNoticeBar,
  bo as USearch,
  bn as USign,
  En as UTags,
  tt as UToast,
  Zt as clear,
  Oe as cloneDeep,
  Yt as createGlobalNode,
  Jt as createObjectURL,
  Xe as dayjs,
  pt as debounce,
  l2 as deepTree,
  f2 as default,
  r2 as flattenDeep,
  qt as get,
  e2 as install,
  dt as isArray,
  a2 as isBoolean,
  Ce as isEmpty,
  o2 as isFunction,
  Kt as isImage,
  ye as isNull,
  Ut as isNumber,
  Rt as isObject,
  s2 as isString,
  Wt as remove,
  p2 as removeEmptyField,
  Nt as removeGlobalNode,
  i2 as revDeepTree,
  Pt as set,
  Be as storage,
  be as str,
  u2 as throttle,
  d2 as toFormData,
  c2 as useBrowser,
  bt as useEmojiParse,
  xo as useLevel,
  v2 as usePage,
  T2 as vInfiniteScroll,
  oe as withInstall
};
