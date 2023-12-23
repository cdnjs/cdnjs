import { h as Ie, render as Lt, defineComponent as N, ref as L, reactive as ue, inject as le, withDirectives as fe, openBlock as p, createElementBlock as x, createVNode as S, unref as g, normalizeClass as G, Transition as Ze, withCtx as F, createElementVNode as i, createCommentVNode as U, createBlock as X, createTextVNode as pe, toDisplayString as P, nextTick as ke, pushScopeId as re, popScopeId as ce, computed as Q, renderSlot as ve, resolveComponent as de, watch as me, createSlots as zt, useCssVars as je, normalizeStyle as ze, onMounted as we, vShow as Se, withKeys as xe, withModifiers as Me, Fragment as oe, renderList as ie, toRefs as Ke, resolveDirective as Ft, onUnmounted as Ve, toRef as lt, vModelText as It, provide as _e, useSlots as Tt, mergeProps as Ht } from "vue";
import { ElButton as De, ClickOutside as it, ElLink as rt, ElInfiniteScroll as At, ElDialog as Bt, ElScrollbar as Re, ElEmpty as Et, ElForm as Vt, ElFormItem as Fe, ElInput as Ee, ElCarousel as Dt, ElTag as Ot, ElAvatar as Je, ElPopover as ct, ElImage as ut, ElPagination as jt } from "element-plus";
import { ElAvatar as _2, ElButton as g2, ElCarousel as y2, ElDialog as w2, ElDropdown as $2, ElDropdownItem as b2, ElDropdownMenu as x2, ElEmpty as C2, ElImage as k2, ElInput as M2, ElLink as S2, ElPagination as L2, ElPopover as z2, ElScrollbar as F2, ElTag as I2, ElInfiniteScroll as T2 } from "element-plus";
/*! UndrawUi v1.0.5 */
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
    c.forEach(($) => {
      $.id || ($.id = r++), $[n] = r, a.push($), $[t] && dt($[t]) && o($[t], $.id);
    });
  };
  return o(e || [], null), a;
}
const r2 = (e, s = 1 / 0) => e.flat(s), se = (e, s) => {
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
  const $ = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), _ = (s.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], m = t === "pc", l = !m, v = r === "xs" || l, f = window.innerHeight + "px";
  return {
    version: _,
    type: n,
    plat: c,
    tag: t,
    prefix: o,
    isMobile: l,
    isIOS: $,
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
  const o = (...c) => new Promise((r, $) => {
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
      const $ = e.apply(void 0, a);
      o($), n = r;
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
      var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", c = "second", r = "minute", $ = "hour", _ = "day", m = "week", l = "month", v = "quarter", f = "year", u = "date", y = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, I = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, Y = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(C) {
        var h = ["th", "st", "nd", "rd"], d = C % 100;
        return "[" + C + (h[(d - 20) % 10] || h[d] || h[0]) + "]";
      } }, ne = function(C, h, d) {
        var M = String(C);
        return !M || M.length >= h ? C : "" + Array(h + 1 - M.length).join(d) + C;
      }, A = { s: ne, z: function(C) {
        var h = -C.utcOffset(), d = Math.abs(h), M = Math.floor(d / 60), b = d % 60;
        return (h <= 0 ? "+" : "-") + ne(M, 2, "0") + ":" + ne(b, 2, "0");
      }, m: function C(h, d) {
        if (h.date() < d.date())
          return -C(d, h);
        var M = 12 * (d.year() - h.year()) + (d.month() - h.month()), b = h.clone().add(M, l), T = d - b < 0, H = h.clone().add(M + (T ? -1 : 1), l);
        return +(-(M + (d - b) / (T ? b - H : H - b)) || 0);
      }, a: function(C) {
        return C < 0 ? Math.ceil(C) || 0 : Math.floor(C);
      }, p: function(C) {
        return { M: l, y: f, w: m, d: _, D: u, h: $, m: r, s: c, ms: o, Q: v }[C] || String(C || "").toLowerCase().replace(/s$/, "");
      }, u: function(C) {
        return C === void 0;
      } }, k = "en", j = {};
      j[k] = Y;
      var B = function(C) {
        return C instanceof he;
      }, W = function C(h, d, M) {
        var b;
        if (!h)
          return k;
        if (typeof h == "string") {
          var T = h.toLowerCase();
          j[T] && (b = T), d && (j[T] = d, b = T);
          var H = h.split("-");
          if (!b && H.length > 1)
            return C(H[0]);
        } else {
          var w = h.name;
          j[w] = h, b = w;
        }
        return !M && b && (k = b), b || !M && k;
      }, Z = function(C, h) {
        if (B(C))
          return C.clone();
        var d = typeof h == "object" ? h : {};
        return d.date = C, d.args = arguments, new he(d);
      }, R = A;
      R.l = W, R.i = B, R.w = function(C, h) {
        return Z(C, { locale: h.$L, utc: h.$u, x: h.$x, $offset: h.$offset });
      };
      var he = function() {
        function C(d) {
          this.$L = W(d.locale, null, !0), this.parse(d);
        }
        var h = C.prototype;
        return h.parse = function(d) {
          this.$d = function(M) {
            var b = M.date, T = M.utc;
            if (b === null)
              return /* @__PURE__ */ new Date(NaN);
            if (R.u(b))
              return /* @__PURE__ */ new Date();
            if (b instanceof Date)
              return new Date(b);
            if (typeof b == "string" && !/Z$/i.test(b)) {
              var H = b.match(V);
              if (H) {
                var w = H[2] - 1 || 0, z = (H[7] || "0").substring(0, 3);
                return T ? new Date(Date.UTC(H[1], w, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, z)) : new Date(H[1], w, H[3] || 1, H[4] || 0, H[5] || 0, H[6] || 0, z);
              }
            }
            return new Date(b);
          }(d), this.$x = d.x || {}, this.init();
        }, h.init = function() {
          var d = this.$d;
          this.$y = d.getFullYear(), this.$M = d.getMonth(), this.$D = d.getDate(), this.$W = d.getDay(), this.$H = d.getHours(), this.$m = d.getMinutes(), this.$s = d.getSeconds(), this.$ms = d.getMilliseconds();
        }, h.$utils = function() {
          return R;
        }, h.isValid = function() {
          return this.$d.toString() !== y;
        }, h.isSame = function(d, M) {
          var b = Z(d);
          return this.startOf(M) <= b && b <= this.endOf(M);
        }, h.isAfter = function(d, M) {
          return Z(d) < this.startOf(M);
        }, h.isBefore = function(d, M) {
          return this.endOf(M) < Z(d);
        }, h.$g = function(d, M, b) {
          return R.u(d) ? this[M] : this.set(b, d);
        }, h.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, h.valueOf = function() {
          return this.$d.getTime();
        }, h.startOf = function(d, M) {
          var b = this, T = !!R.u(M) || M, H = R.p(d), w = function($e, ae) {
            var ge = R.w(b.$u ? Date.UTC(b.$y, ae, $e) : new Date(b.$y, ae, $e), b);
            return T ? ge : ge.endOf(_);
          }, z = function($e, ae) {
            return R.w(b.toDate()[$e].apply(b.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ae)), b);
          }, E = this.$W, O = this.$M, J = this.$D, q = "set" + (this.$u ? "UTC" : "");
          switch (H) {
            case f:
              return T ? w(1, 0) : w(31, 11);
            case l:
              return T ? w(1, O) : w(0, O + 1);
            case m:
              var ee = this.$locale().weekStart || 0, te = (E < ee ? E + 7 : E) - ee;
              return w(T ? J - te : J + (6 - te), O);
            case _:
            case u:
              return z(q + "Hours", 0);
            case $:
              return z(q + "Minutes", 1);
            case r:
              return z(q + "Seconds", 2);
            case c:
              return z(q + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, h.endOf = function(d) {
          return this.startOf(d, !1);
        }, h.$set = function(d, M) {
          var b, T = R.p(d), H = "set" + (this.$u ? "UTC" : ""), w = (b = {}, b[_] = H + "Date", b[u] = H + "Date", b[l] = H + "Month", b[f] = H + "FullYear", b[$] = H + "Hours", b[r] = H + "Minutes", b[c] = H + "Seconds", b[o] = H + "Milliseconds", b)[T], z = T === _ ? this.$D + (M - this.$W) : M;
          if (T === l || T === f) {
            var E = this.clone().set(u, 1);
            E.$d[w](z), E.init(), this.$d = E.set(u, Math.min(this.$D, E.daysInMonth())).$d;
          } else
            w && this.$d[w](z);
          return this.init(), this;
        }, h.set = function(d, M) {
          return this.clone().$set(d, M);
        }, h.get = function(d) {
          return this[R.p(d)]();
        }, h.add = function(d, M) {
          var b, T = this;
          d = Number(d);
          var H = R.p(M), w = function(O) {
            var J = Z(T);
            return R.w(J.date(J.date() + Math.round(O * d)), T);
          };
          if (H === l)
            return this.set(l, this.$M + d);
          if (H === f)
            return this.set(f, this.$y + d);
          if (H === _)
            return w(1);
          if (H === m)
            return w(7);
          var z = (b = {}, b[r] = t, b[$] = a, b[c] = n, b)[H] || 1, E = this.$d.getTime() + d * z;
          return R.w(E, this);
        }, h.subtract = function(d, M) {
          return this.add(-1 * d, M);
        }, h.format = function(d) {
          var M = this, b = this.$locale();
          if (!this.isValid())
            return b.invalidDate || y;
          var T = d || "YYYY-MM-DDTHH:mm:ssZ", H = R.z(this), w = this.$H, z = this.$m, E = this.$M, O = b.weekdays, J = b.months, q = function(ae, ge, Pe, Ae) {
            return ae && (ae[ge] || ae(M, T)) || Pe[ge].slice(0, Ae);
          }, ee = function(ae) {
            return R.s(w % 12 || 12, ae, "0");
          }, te = b.meridiem || function(ae, ge, Pe) {
            var Ae = ae < 12 ? "AM" : "PM";
            return Pe ? Ae.toLowerCase() : Ae;
          }, $e = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: E + 1, MM: R.s(E + 1, 2, "0"), MMM: q(b.monthsShort, E, J, 3), MMMM: q(J, E), D: this.$D, DD: R.s(this.$D, 2, "0"), d: String(this.$W), dd: q(b.weekdaysMin, this.$W, O, 2), ddd: q(b.weekdaysShort, this.$W, O, 3), dddd: O[this.$W], H: String(w), HH: R.s(w, 2, "0"), h: ee(1), hh: ee(2), a: te(w, z, !0), A: te(w, z, !1), m: String(z), mm: R.s(z, 2, "0"), s: String(this.$s), ss: R.s(this.$s, 2, "0"), SSS: R.s(this.$ms, 3, "0"), Z: H };
          return T.replace(I, function(ae, ge) {
            return ge || $e[ae] || H.replace(":", "");
          });
        }, h.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, h.diff = function(d, M, b) {
          var T, H = R.p(M), w = Z(d), z = (w.utcOffset() - this.utcOffset()) * t, E = this - w, O = R.m(this, w);
          return O = (T = {}, T[f] = O / 12, T[l] = O, T[v] = O / 3, T[m] = (E - z) / 6048e5, T[_] = (E - z) / 864e5, T[$] = E / a, T[r] = E / t, T[c] = E / n, T)[H] || E, b ? O : R.a(O);
        }, h.daysInMonth = function() {
          return this.endOf(l).$D;
        }, h.$locale = function() {
          return j[this.$L];
        }, h.locale = function(d, M) {
          if (!d)
            return this.$L;
          var b = this.clone(), T = W(d, M, !0);
          return T && (b.$L = T), b;
        }, h.clone = function() {
          return R.w(this.$d, this);
        }, h.toDate = function() {
          return new Date(this.valueOf());
        }, h.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, h.toISOString = function() {
          return this.$d.toISOString();
        }, h.toString = function() {
          return this.$d.toUTCString();
        }, C;
      }(), D = he.prototype;
      return Z.prototype = D, [["$ms", o], ["$s", c], ["$m", r], ["$H", $], ["$W", _], ["$M", l], ["$y", f], ["$D", u]].forEach(function(C) {
        D[C[1]] = function(h) {
          return this.$g(h, C[0], C[1]);
        };
      }), Z.extend = function(C, h) {
        return C.$i || (C(h, he, Z), C.$i = !0), Z;
      }, Z.locale = W, Z.isDayjs = B, Z.unix = function(C) {
        return Z(1e3 * C);
      }, Z.en = j[k], Z.Ls = j, Z.p = {}, Z;
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
      var $ = 100 * c + r;
      return $ < 600 ? "凌晨" : $ < 900 ? "早上" : $ < 1100 ? "上午" : $ < 1300 ? "中午" : $ < 1800 ? "下午" : "晚上";
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
        for (var u, y, V, I = l.$locale().relativeTime || c, Y = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], ne = Y.length, A = 0; A < ne; A += 1) {
          var k = Y[A];
          k.d && (u = v ? a(_).diff(l, k.d, !0) : l.diff(_, k.d, !0));
          var j = (n.rounding || Math.round)(Math.abs(u));
          if (V = u > 0, j <= k.r || !k.r) {
            j <= 1 && A > 0 && (k = Y[A - 1]);
            var B = I[k.l];
            f && (j = f("" + j)), y = typeof B == "string" ? B.replace("%d", j) : B(j, m, k.l, V);
            break;
          }
        }
        if (m)
          return y;
        var W = V ? I.future : I.past;
        return typeof W == "function" ? W(y) : W.replace("%s", y);
      }, o.to = function(_, m) {
        return r(_, m, this, !0);
      }, o.from = function(_, m) {
        return r(_, m, this);
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
var Qt = ht.exports;
const e1 = /* @__PURE__ */ vt(Qt);
Xe.locale("zh-cn");
Xe.extend(e1);
const Ye = Symbol(), mt = Symbol(), Qe = Symbol(), We = Symbol(), _t = (e) => (re("data-v-a6a05306"), e = e(), ce(), e), t1 = { class: "comment-box" }, n1 = {
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
    const t = e, a = L(""), o = L(!1), c = L(!0), r = L(), $ = L(), _ = L(), m = L([]), l = L([]), v = ue({
      imgLength: 0
    }), f = (C) => {
      l.value = C;
    }, u = (C) => {
      Ce(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: y, submit: V, focus: I } = le(mt), Y = le(He), ne = () => {
      V({
        content: t.reply && t.parentId != t.reply.id ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: ye(t.parentId, null),
        reply: t.reply,
        files: l.value,
        clear: () => {
          j(), n("close");
        }
      });
    }, A = le("cancelFn"), k = () => {
      j(), n("close"), A();
    }, j = () => {
      r.value.clear(), m.value.length = 0, l.value = [], c.value = !0;
    };
    function B(C) {
      Ce(a.value) && !v.imgLength && (o.value = !1, n("hide", C));
    }
    function W() {
      o.value = !0, ke(() => {
        $.value = document.querySelector("div[id^='el-popper-container']");
      }), I();
    }
    function Z() {
      console.log(r.value);
    }
    s({
      focus: () => {
        var C;
        return (C = r.value) == null ? void 0 : C.focus();
      },
      changeMentionShow: (C) => {
        var h;
        return (h = r.value) == null ? void 0 : h.changeMentionShow(C);
      },
      AddMention: Z
    });
    const R = (C, h) => {
      var M;
      h || (m.value.length = 0, l.value.length = 0);
      const d = h ? [h] : (M = _.value) == null ? void 0 : M.files;
      if (v.imgLength = ye(d == null ? void 0 : d.length, 0), d)
        for (let b = 0; b < d.length; b++) {
          let T = d[b].name, H = Jt(d[b]);
          l.value.push(d[b]), Kt(T) ? m.value.push(H) : tt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, he = le(Ye), D = () => Ie("div", he.func());
    return (C, h) => fe((p(), x("div", t1, [
      S(g(wt), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": h[0] || (h[0] = (d) => a.value = d),
        class: G({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": m.value,
        onFocus: W,
        onInput: u,
        onSubmit: ne,
        onPaste: R,
        onChangeImgListFn: f
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      S(Ze, { name: "fade" }, {
        default: F(() => [
          o.value ? (p(), x("div", n1, [
            S(g(kt), {
              emoji: g(Y),
              onAddEmoji: h[1] || (h[1] = (d) => {
                var M;
                return (M = r.value) == null ? void 0 : M.addText(d);
              })
            }, null, 8, ["emoji"]),
            g(y) ? (p(), x("div", {
              key: 0,
              class: "picture",
              onClick: h[2] || (h[2] = //@ts-ignore
              (...d) => {
                var M, b;
                return ((M = _.value) == null ? void 0 : M.click) && ((b = _.value) == null ? void 0 : b.click(...d));
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
                onChange: R
              }, null, 544)
            ])) : U("", !0),
            g(he).func ? (p(), X(D, { key: 1 })) : U("", !0),
            i("div", a1, [
              S(g(De), {
                type: "primary",
                disabled: c.value,
                onClick: ne
              }, {
                default: F(() => [
                  pe(P(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (p(), X(g(De), {
                key: 0,
                onClick: k
              }, {
                default: F(() => [
                  pe(P(t.cancelBtn), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])) : U("", !0)
        ]),
        _: 1
      })
    ])), [
      [g(it), B, $.value]
    ]);
  }
});
const K = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of s)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ K(l1, [["__scopeId", "data-v-a6a05306"]]), i1 = { class: "u-comment-scroll" }, r1 = ["infinite-scroll-disabled"], c1 = { class: "scroll-btn" }, u1 = { key: 1 }, d1 = { key: 2 }, p1 = /* @__PURE__ */ N({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: s }) {
    const n = e, t = L(!1), a = L(!1), o = Q(() => a.value && n.disable), c = Q(() => !a.value || t.value || o.value), r = pt(() => {
      s("more"), t.value = !1;
    }, 500), $ = () => {
      t.value = !0, r();
    };
    return (_, m) => (p(), x("div", i1, [
      fe((p(), x("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        ve(_.$slots, "default", {}, void 0, !0),
        i("div", c1, [
          a.value ? U("", !0) : (p(), X(g(rt), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: m[0] || (m[0] = (l) => a.value = !a.value)
          }, {
            default: F(() => [
              pe("加载更多")
            ]),
            _: 1
          })),
          t.value ? (p(), x("p", u1, "加载中...")) : U("", !0),
          o.value ? (p(), x("p", d1, "没有更多了")) : U("", !0)
        ])
      ], 8, r1)), [
        [g(At), $]
      ])
    ]));
  }
});
const v1 = /* @__PURE__ */ K(p1, [["__scopeId", "data-v-404b6e08"]]), f1 = se(v1), et = (e) => (re("data-v-3e026489"), e = e(), ce(), e), h1 = { class: "nav" }, m1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("span", { class: "nav__title" }, "全部评论", -1)), _1 = { class: "nav__sort" }, g1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
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
    const n = e, t = Q({
      get() {
        return n.modelValue;
      },
      set(a) {
        s("update:modelValue", a), s("sorted", a);
      }
    });
    return (a, o) => {
      const c = de("u-icon");
      return p(), x("div", h1, [
        m1,
        i("div", _1, [
          i("div", {
            class: G(["item select-none", { active: t.value }]),
            onClick: o[0] || (o[0] = (r) => t.value = !0)
          }, [
            S(c, null, {
              default: F(() => [
                g1
              ]),
              _: 1
            }),
            pe(" 最新 ")
          ], 2),
          i("div", {
            class: G(["item select-none", { active: !t.value }]),
            onClick: o[1] || (o[1] = (r) => t.value = !1)
          }, [
            S(c, null, {
              default: F(() => [
                y1
              ]),
              _: 1
            }),
            pe(" 最热 ")
          ], 2)
        ])
      ]);
    };
  }
});
const $1 = /* @__PURE__ */ K(w1, [["__scopeId", "data-v-3e026489"]]), b1 = se($1), yt = (e) => (re("data-v-59596f14"), e = e(), ce(), e), x1 = {
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
    return me(
      () => n.modelValue,
      (o) => {
        t.value = o;
      },
      {
        immediate: !0
      }
    ), me(
      () => t.value,
      (o) => {
        s("update:modelValue", o);
      }
    ), (o, c) => (p(), X(g(Bt), {
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
      default: F(() => [
        i("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (p(), x("svg", x1, k1)) : (p(), x("svg", M1, L1))
        ]),
        ve(o.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      o.$slots.footer ? {
        name: "footer",
        fn: F(() => [
          ve(o.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const F1 = /* @__PURE__ */ K(z1, [["__scopeId", "data-v-59596f14"]]), I1 = se(F1), T1 = { class: "field" }, H1 = /* @__PURE__ */ N({
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
    return me(
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
    ), (t, a) => (p(), x("div", {
      class: G(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", T1, [
        t.$slots.default || t.vertical ? (p(), x("legend", {
          key: 0,
          class: G(["inner", n.value])
        }, [
          ve(t.$slots, "default", {}, void 0, !0)
        ], 2)) : U("", !0)
      ])
    ], 2));
  }
});
const A1 = /* @__PURE__ */ K(H1, [["__scopeId", "data-v-153d9bc7"]]), B1 = se(A1), E1 = [
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
    const s = e, n = Q(() => "#" + s.name), t = Q(() => ({
      fontSize: Ut(s.size) ? s.size + "px" : s.size,
      color: s.color
    }));
    return (a, o) => (p(), x("i", {
      class: "u-icon",
      style: ze(t.value)
    }, [
      a.$slots.default ? ve(a.$slots, "default", { key: 0 }, void 0, !0) : (p(), x("svg", j1, [
        i("use", { "xlink:href": n.value }, null, 8, R1)
      ]))
    ], 4));
  }
});
const Y1 = /* @__PURE__ */ K(U1, [["__scopeId", "data-v-dd34e834"]]), Le = se(Y1), N1 = { class: "v-toast" }, P1 = { class: "inner" }, q1 = { class: "message" }, W1 = /* @__PURE__ */ N({
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
    const n = ue(O1().options), t = L(!1);
    return me(
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
    }), (a, o) => (p(), x("div", N1, [
      S(Ze, { name: "v-toast" }, {
        default: F(() => [
          fe(i("div", P1, [
            i("div", q1, [
              n.icon ? (p(), X(g(Le), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : U("", !0),
              i("span", {
                class: G({ normal: a.type != "normal" })
              }, P(a.message), 3)
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
const Z1 = /* @__PURE__ */ K(W1, [["__scopeId", "data-v-7d3c50e0"]]);
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
    }, $ = () => {
      if (o.value >= 0 && o.value < t.list.length)
        return t.list[o.value];
    }, _ = (l) => {
      o.value = l, n("insert", t.list[o.value]), n("changeShow", !1);
    };
    me(
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
      printSelectedItem: $,
      resetSelectIndex: m
    }), (l, v) => fe((p(), x("ul", {
      ref_key: "mentionList",
      ref: c,
      class: "mention-list",
      tabindex: "0",
      style: ze(`left: ${l.position.left}px; top: ${l.position.top}px`),
      onKeydown: [
        v[0] || (v[0] = xe(Me((f) => r(-1), ["prevent"]), ["up"])),
        v[1] || (v[1] = xe(Me((f) => r(1), ["prevent"]), ["down"])),
        xe(Me($, ["prevent"]), ["enter"])
      ]
    }, [
      S(g(Re), {
        ref_key: "scrollbarRef",
        ref: a,
        style: { padding: "10px" }
      }, {
        default: F(() => [
          (p(!0), x(oe, null, ie(l.list, (f, u) => (p(), x("li", {
            key: u,
            class: G({ hover: u === o.value }),
            onClick: (y) => _(u)
          }, [
            ve(l.$slots, "user", {
              item: f,
              index: u
            }, () => [
              i("div", G1, [
                l.showAvatar ? (p(), x("img", {
                  key: 0,
                  src: f.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, X1)) : U("", !0),
                i("span", Q1, P(f.userName), 1)
              ])
            ], !0)
          ], 10, J1))), 128)),
          fe(i("div", en, [
            S(g(Et), { description: "暂无匹配数据" })
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
const nn = /* @__PURE__ */ K(tn, [["__scopeId", "data-v-14aad4a8"]]), on = (e) => (re("data-v-882ab8c4"), e = e(), ce(), e), sn = ["placeholder", "onKeydown", "innerHTML"], an = ["src"], ln = ["onClick"], rn = /* @__PURE__ */ on(() => /* @__PURE__ */ i("svg", {
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
    je((w) => ({
      b3207e26: k.value,
      "0d2df836": j.value
    }));
    const a = L(null), o = L(!1), c = L({
      left: 0,
      top: 0
    });
    function r(w) {
      o.value = w, w || (B.value = "");
    }
    function $(w) {
      c.value = w;
    }
    function _(w) {
      a.value && a.value.moveSelection(w);
    }
    function m() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const l = le("mentionConfig"), v = le("changeMetionList"), f = le("mentionSearch"), u = L(), y = L(), V = L(), I = L(!1), Y = L(!1), ne = L(), { imgList: A } = Ke(t), k = Q(() => t.minHeight + "px"), j = Q(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), B = L("");
    me(
      () => t.modelValue,
      (w, z) => {
        var O;
        if (I.value || (V.value = w), !((O = l == null ? void 0 : l.value) != null && O.show))
          return;
        w = w.replace(/<br>/g, ""), z = z.replace(/<br>/g, ""), (z.length >= w.length && z.slice(-1) === "@" || w.slice(-7) === "@&nbsp;") && r(!1), o.value && w.slice(-6) !== "&nbsp;" ? (B.value = w.split("@").pop() || "", B.value = B.value.replace("'", ""), console.log(B.value), f(B.value), a.value && a.value.resetSelectIndex()) : o.value && w.slice(-6) === "&nbsp;" && r(!1);
        let E = w.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (E) {
          let J = E.map((ee) => {
            let te = ee.match(/data-id="([^"]*)"/);
            return te ? te[1] : null;
          }), q = l.value.userArr.filter(
            (ee) => J.includes(`${ee[l.value.userIdKey]}`)
          );
          v(q);
        } else
          v([]);
      }
    );
    function W(w) {
      n("focus", w), I.value = !0, Y.value = !0;
    }
    function Z(w) {
      var z, E;
      try {
        u.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0);
      } catch (O) {
        console.log(O);
      }
      n("blur", w), (E = y.value) != null && E.innerHTML || (Y.value = !1), I.value = !1;
    }
    function R(w) {
      _(w);
    }
    function he(w) {
      var E, O;
      const { innerHTML: z } = w.target;
      if (w.data === "@" && (l != null && l.value.show)) {
        try {
          u.value = (E = window.getSelection()) == null ? void 0 : E.getRangeAt(0);
        } catch (q) {
          console.log(q);
        }
        let J = (O = u.value) == null ? void 0 : O.getBoundingClientRect();
        r(!0), J && $({
          left: J.left,
          top: J.top + J.height + 10
        });
      }
      n("update:modelValue", z), n("input", w);
    }
    function D(w, z) {
      var O, J;
      let E = window.getSelection();
      if (E) {
        if (E.removeAllRanges(), u.value || ((O = y.value) == null || O.focus(), u.value = E.getRangeAt(0)), z && !B.value)
          u.value.startOffset > 0 && (u.value.setStart(u.value.startContainer, u.value.startOffset - 1), u.value.deleteContents());
        else if (z && B.value) {
          let ee = B.value.length + 1, te = u.value.startContainer.data.lastIndexOf("@" + B.value);
          te !== -1 && (u.value.setStart(u.value.startContainer, te), u.value.setEnd(u.value.startContainer, te + ee), u.value.deleteContents());
        }
        u.value.deleteContents(), u.value.insertNode(u.value.createContextualFragment(w)), u.value.collapse(!1), E.addRange(u.value), n("update:modelValue", ((J = y.value) == null ? void 0 : J.innerHTML) || "");
        const q = y.value;
        n("input", q);
      }
    }
    function C(w) {
      const z = w.clipboardData;
      if (z) {
        const E = z.getData("text/plain"), O = z.items.length > 0 ? z.items[0].getAsFile() : null;
        E ? (w.preventDefault(), document.execCommand("insertText", !1, E)) : O && (console.log(O), w.preventDefault(), n("paste", w, O));
      }
    }
    function h() {
      y.value && (y.value.innerHTML = "", n("update:modelValue", y.value.innerHTML), Y.value = !1);
    }
    function d() {
      ke(() => {
        var w;
        (w = y.value) == null || w.focus();
      });
    }
    function M(w) {
      if (w) {
        let z = H(w);
        D(`${z} `, !0);
      }
    }
    const b = (w) => {
      if (w.ctrlKey && w.key == "Enter")
        Ce(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? tt({ message: "内容不能为空", type: "info" }) : n("submit");
      else if (w.key == "Enter" && o.value) {
        w.preventDefault();
        const z = m();
        M(z), r(!1);
      }
    }, T = (w) => {
      var z;
      (z = A == null ? void 0 : A.value) == null || z.splice(w, 1), n("changeImgListFn", Oe(A == null ? void 0 : A.value));
    };
    we(() => {
    }), s({
      addText: D,
      clear: h,
      focus: d,
      imageRef: ne,
      insertUser: M,
      changeMentionShow: r
    });
    const H = (w) => {
      const z = w[l.value.userNameKey], E = w[l.value.userIdKey], O = l.value.mentionColor || "#409eff", J = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${z}</text>
    </svg>
  `, q = document.createElement("div");
      q.style.visibility = "hidden", q.innerHTML = J, document.body.appendChild(q);
      const ee = q.querySelector("text");
      let te = 200;
      ee && (te = ee.getComputedTextLength()), document.body.removeChild(q);
      const $e = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${te}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${O}; }
      </style>
      <text x="0" y="15" class="mention-text">@${z}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent($e).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${z}" style="width:${te}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${z}" data-id="${E}"
     draggable="false"
    >`;
    };
    return (w, z) => {
      var O, J;
      const E = Ft("loading");
      return p(), x("div", {
        class: G(["u-editor", { active: Y.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: y,
          class: "rich-input",
          contenteditable: "",
          placeholder: w.placeholder,
          onFocus: W,
          onInput: he,
          onBlur: Z,
          onKeydown: [
            xe(b, ["enter"]),
            z[0] || (z[0] = xe(Me((q) => R(-1), ["prevent"]), ["up"])),
            z[1] || (z[1] = xe(Me((q) => R(1), ["prevent"]), ["down"]))
          ],
          onPaste: C,
          innerHTML: V.value
        }, null, 40, sn),
        i("div", {
          ref_key: "imageRef",
          ref: ne,
          class: "image-preview-box"
        }, [
          (p(!0), x(oe, null, ie(g(A), (q, ee) => (p(), x("div", {
            key: ee,
            class: "image-preview"
          }, [
            i("img", {
              src: q,
              alt: ""
            }, null, 8, an),
            i("div", {
              class: "clean-btn",
              onClick: (te) => T(ee)
            }, cn, 8, ln)
          ]))), 128))
        ], 512),
        fe(S(nn, {
          ref_key: "metionList",
          ref: a,
          "is-show": o.value,
          position: c.value,
          list: (O = g(l)) == null ? void 0 : O.userArr,
          "show-avatar": (J = g(l)) == null ? void 0 : J.showAvatar,
          onInsert: M,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"]), [
          [E, g(l).isLoading]
        ])
      ], 2);
    };
  }
});
const dn = /* @__PURE__ */ K(un, [["__scopeId", "data-v-882ab8c4"]]), wt = se(dn);
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
    const n = Q(() => {
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
    }), (r, $) => (p(), x("div", pn, [
      i("div", {
        class: G(["txt-box", { "over-hidden": t.value }])
      }, [
        i("div", {
          ref_key: "divBox",
          ref: o
        }, [
          ve(r.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      i("div", vn, [
        a.value && r.unfold ? (p(), x("div", {
          key: 0,
          class: "expand-btn",
          onClick: $[0] || ($[0] = (_) => t.value = !t.value)
        }, P(t.value ? "展开" : "收起"), 1)) : U("", !0)
      ])
    ]));
  }
});
const hn = /* @__PURE__ */ K(fn, [["__scopeId", "data-v-1694aa13"]]), $t = se(hn), mn = /* @__PURE__ */ N({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = ue({
      type: "",
      email: "",
      password: ""
    }), o = (u, y, V) => {
      const I = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!y)
        return V("请输入邮箱!");
      I.test(y) || V("邮箱地址不合法"), V();
    }, c = (u, y, V) => {
      y ? y != a.password ? V("输入密码不一致") : V() : V("请确认密码");
    }, r = L(), $ = L(), _ = ue({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), m = ue({
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
    }), l = ue({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    me(
      () => t.modelValue,
      (u) => {
        switch (ke(() => f()), u) {
          case "login":
            $.value = _, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            $.value = _, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            $.value = m, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
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
    }), (u, y) => {
      const V = de("el-button");
      return p(), X(g(Vt), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: $.value,
        class: "select-none"
      }, {
        default: F(() => [
          S(g(Fe), { prop: "email" }, {
            default: F(() => [
              S(g(Ee), {
                modelValue: a.email,
                "onUpdate:modelValue": y[0] || (y[0] = (I) => a.email = I),
                placeholder: "请输入邮箱",
                onFocus: y[1] || (y[1] = (I) => u.$emit("toggle", 1)),
                onBlur: y[2] || (y[2] = (I) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          S(g(Fe), { prop: "password" }, {
            default: F(() => [
              S(g(Ee), {
                modelValue: a.password,
                "onUpdate:modelValue": y[3] || (y[3] = (I) => a.password = I),
                placeholder: "请输入密码",
                onFocus: y[4] || (y[4] = (I) => u.$emit("toggle", 2)),
                onBlur: y[5] || (y[5] = (I) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          fe(S(g(Fe), { prop: "checkPass" }, {
            default: F(() => [
              S(g(Ee), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": y[6] || (y[6] = (I) => a.checkPass = I),
                placeholder: "请确认密码",
                onFocus: y[7] || (y[7] = (I) => u.$emit("toggle", 2)),
                onBlur: y[8] || (y[8] = (I) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Se, u.modelValue == "forget"]
          ]),
          S(g(Fe), null, {
            default: F(() => [
              S(V, {
                style: { width: "100%" },
                type: "primary",
                onClick: v
              }, {
                default: F(() => [
                  pe(P(l.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          S(g(Fe), null, {
            default: F(() => [
              i("div", {
                onClick: y[9] || (y[9] = (I) => u.$emit("update:modelValue", l.one.key))
              }, P(l.one.value), 1),
              i("div", {
                onClick: y[10] || (y[10] = (I) => u.$emit("update:modelValue", l.two.key))
              }, P(l.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const _n = /* @__PURE__ */ K(mn, [["__scopeId", "data-v-525985f8"]]), gn = { class: "u-sign" }, yn = { class: "sign-oauth" }, wn = /* @__PURE__ */ N({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = L(!1), t = L("login"), a = L(0), o = Q(() => {
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
      const $ = de("u-divider"), _ = de("u-icon"), m = de("u-dialog");
      return p(), x("div", gn, [
        S(g(De), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: F(() => [
            pe("登录/注册")
          ]),
          _: 1
        }),
        S(m, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: o.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: F(() => [
            S(_n, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => a.value = l),
              onSubmit: r[3] || (r[3] = (l) => c.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            S($, null, {
              default: F(() => [
                pe("其他方式登录")
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
const $n = /* @__PURE__ */ K(wn, [["__scopeId", "data-v-8e737450"]]), bn = se($n), xn = (e) => (re("data-v-3a07e116"), e = e(), ce(), e), Cn = { class: "custom-contextmenu__menu" }, kn = ["onClick"], Mn = /* @__PURE__ */ xn(() => /* @__PURE__ */ i("div", { class: "arrow" }, null, -1)), Sn = /* @__PURE__ */ N({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: s, emit: n }) {
    const t = ue({
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
    const { isShow: c, dropdownList: r, tag: $ } = Ke(t);
    return s({
      openContextmenu: a
    }), (_, m) => {
      const l = de("u-icon");
      return p(), X(Ze, { name: "el-zoom-in-center" }, {
        default: F(() => [
          fe(i("div", {
            style: ze(`top: ${_.dropdown.y + 5}px; left: ${_.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            i("ul", Cn, [
              (p(!0), x(oe, null, ie(g(r), (v, f) => (p(), x(oe, { key: f }, [
                v.show ? (p(), x("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (u) => _.$emit("submit", f, g($))
                }, [
                  S(l, {
                    innerHTML: v.icon
                  }, null, 8, ["innerHTML"]),
                  i("span", null, P(v.title), 1)
                ], 8, kn)) : U("", !0)
              ], 64))), 128))
            ]),
            Mn
          ], 4), [
            [Se, g(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Ln = /* @__PURE__ */ K(Sn, [["__scopeId", "data-v-3a07e116"]]), zn = (e) => (re("data-v-f7d57bb4"), e = e(), ce(), e), Fn = { class: "u-tabs" }, In = ["onClick", "onContextmenu"], Tn = { class: "select-none" }, Hn = /* @__PURE__ */ zn(() => /* @__PURE__ */ i("svg", {
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
    const n = e, t = L(), a = L(), o = lt(n, "modelValue"), c = L(0), r = ue({
      x: 0,
      y: 0
    });
    me(
      () => [...o.value],
      (v, f) => {
        if (f) {
          if (console.log(v, f), v.length > f.length) {
            let u = v.find((y) => !(f != null && f.includes(y)));
            o.value.forEach((y, V, I) => {
              I.findIndex((Y) => Y.path == y.path) != V && I.splice(V, 1);
            }), c.value = o.value.findIndex((y) => y.path == (u == null ? void 0 : u.path));
          }
        } else {
          let u = 1;
          o.value.forEach((y, V, I) => {
            I.findIndex((Y) => Y.path == y.path) != V && (I.splice(V, 1), c.value = I.findIndex((Y) => Y.path == y.path), u = 0);
          }), u && (c.value = o.value.length - 1);
        }
        ke(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), me(
      () => c.value,
      (v) => {
        s(
          "select",
          o.value.find((f, u) => u == v)
        );
      }
    );
    const $ = (v) => {
      o.value.map((f, u) => {
        if (!f.meta.isAffix && v == u)
          if (o.value.splice(u, 1), u == c.value) {
            let V = [u, u - 1].filter((I) => I >= 0 && I < o.value.length);
            c.value = V[0], c.value == u && s(
              "select",
              o.value.find((I, Y) => Y == v)
            );
          } else
            v < c.value && (c.value -= 1);
      });
    }, _ = (v) => {
      let f = o.value.filter((y) => y.meta.isAffix);
      v && !v.meta.isAffix && f.push(v), o.value.length = 0, o.value.push(...f);
      let u = o.value.length - 1;
      c.value = u >= 0 ? u : 0;
    }, m = (v, f) => {
      switch (v) {
        case 0:
          s("refresh", f);
          break;
        case 1:
          let u = o.value.findIndex((y) => y.path == f.path);
          $(u), s("close", f);
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
      const { clientX: u, clientY: y } = f;
      r.x = u, r.y = y, a.value.openContextmenu(v);
    };
    return (v, f) => {
      const u = de("u-icon");
      return p(), x("div", Fn, [
        S(g(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: F(() => [
            i("ul", {
              class: G([{ "classic-style": v.classic }, "u-tabs-ul"])
            }, [
              (p(!0), x(oe, null, ie(v.modelValue, (y, V) => (p(), x("li", {
                key: V,
                class: G([{ "is-active": c.value == V }, "u-tabs-ul-li"]),
                onClick: (I) => c.value = V,
                onContextmenu: Me((I) => l(y, I), ["prevent"])
              }, [
                i("span", Tn, P(y.meta.title), 1),
                y.meta.isAffix ? U("", !0) : (p(), X(u, {
                  key: 0,
                  onClick: Me((I) => m(1, y), ["stop"])
                }, {
                  default: F(() => [
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
          onSubmit: m
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const Bn = /* @__PURE__ */ K(An, [["__scopeId", "data-v-f7d57bb4"]]), En = se(Bn), Vn = { key: 0 }, Dn = /* @__PURE__ */ N({
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
    const s = e, n = ue({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), o = Q(() => s.delay > 2e3 ? s.delay : 2e3), c = () => {
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
      s.vertical || (c(), _());
    }), (m, l) => {
      const v = de("el-carousel-item"), f = de("u-icon");
      return p(), x("div", {
        class: "u-notice-bar",
        style: ze({ background: m.background, height: `${m.height}px` })
      }, [
        m.vertical ? (p(), x("div", Vn, [
          S(g(Dt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: o.value
          }, {
            default: F(() => [
              (p(!0), x(oe, null, ie(m.data, (u) => (p(), X(v, { key: u }, {
                default: F(() => [
                  pe(P(u), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (p(), x("div", {
          key: 1,
          style: ze({ color: m.color, fontSize: `${m.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          m.prefixIcon ? (p(), X(f, {
            key: 0,
            name: m.prefixIcon
          }, null, 8, ["name"])) : U("", !0),
          i("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            i("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, P(m.data), 513)
          ], 512),
          m.suffixIcon ? (p(), X(f, {
            key: 1,
            name: m.suffixIcon
          }, null, 8, ["name"])) : U("", !0)
        ], 4))
      ], 4);
    };
  }
});
const On = /* @__PURE__ */ K(Dn, [["__scopeId", "data-v-723bc558"]]), jn = se(On), Rn = (e) => (re("data-v-11b4e56c"), e = e(), ce(), e), Un = { class: "u-anchor" }, Yn = { class: "toc-content" }, Nn = /* @__PURE__ */ Rn(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Pn = { class: "toc-items" }, qn = ["onClick"], Wn = /* @__PURE__ */ N({
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
    let $;
    return we(() => {
      let _ = document.querySelector(s.container);
      $ = new ResizeObserver((m) => {
        s.scroll ? a.value = document.querySelector(s.scroll) : a.value = window, t.value = _.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), $.observe(_);
    }), Ve(() => {
      a.value.removeEventListener("scroll", c), $.disconnect();
    }), (_, m) => {
      const l = de("u-divider");
      return p(), x("div", Un, [
        i("nav", Yn, [
          Nn,
          S(l),
          i("ul", Pn, [
            (p(!0), x(oe, null, ie(t.value, (v, f) => (p(), x("li", {
              key: f,
              class: G([{ active: n.value == f }, o(v.nodeName)]),
              onClick: (u) => r(f)
            }, P(v.innerText), 11, qn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Zn = /* @__PURE__ */ K(Wn, [["__scopeId", "data-v-11b4e56c"]]), Kn = se(Zn), Te = (e) => (re("data-v-c739035a"), e = e(), ce(), e), Jn = { class: "card-box u-scrollbar" }, Gn = {
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
    const n = e, t = Q(() => !(Ce(n.data.historySearchList) && Ce(n.data.hotSearchList)));
    return (a, o) => {
      const c = de("u-icon");
      return fe((p(), x("div", Jn, [
        a.data.historySearchList.length != 0 ? (p(), x("div", Gn, [
          i("div", Xn, [
            Qn,
            S(g(rt), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (r) => a.$emit("onClear"))
            }, {
              default: F(() => [
                S(c, null, {
                  default: F(() => [
                    eo
                  ]),
                  _: 1
                }),
                pe(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (p(!0), x(oe, null, ie(a.data.historySearchList, (r, $) => (p(), X(g(Ot), {
            key: $,
            type: r.type,
            closable: "",
            onClose: (_) => a.$emit("onClose", r.name),
            onClick: (_) => a.$emit("submit", r.name)
          }, {
            default: F(() => [
              pe(P(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : U("", !0),
        g(Ce)(a.data.hotSearchList) ? U("", !0) : (p(), x("div", to, [
          i("div", no, [
            oo,
            S(c, { style: { margin: "0 6px" } }, {
              default: F(() => [
                so
              ]),
              _: 1
            })
          ]),
          i("div", ao, [
            (p(!0), x(oe, null, ie(a.data.hotSearchList, (r, $) => (p(), x("div", {
              key: $,
              class: "hot-item",
              onClick: (_) => a.$emit("submit", r)
            }, [
              i("div", {
                class: G(["trending-rank", { "trending-rank-top": $ < 3 }])
              }, P($ + 1), 3),
              i("div", io, P(r), 1),
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
const uo = /* @__PURE__ */ K(co, [["__scopeId", "data-v-c739035a"]]), nt = (e) => (re("data-v-df2be5d9"), e = e(), ce(), e), po = { class: "u-search" }, vo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, fo = /* @__PURE__ */ nt(() => /* @__PURE__ */ i("svg", {
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
    const t = e, a = L({}), o = lt(t.config, "keywords"), c = L(!1), r = L(0), $ = L(!0), _ = L(), m = ue({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), l = ue({
      search: t.config.search || "",
      visible: !1,
      historySearchList: Be.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    me(
      () => t.config.hotSearchList,
      (A) => {
        l.hotSearchList = A;
      }
    ), me(
      () => t.config.search,
      (A) => {
        l.search = A || "";
      }
    );
    const v = Q(() => {
      let A = o.value[r.value];
      return c.value || l.search ? "" : A;
    }), f = Q(() => {
      let A = typeof o.value[r.value + 1] > "u" ? o.value[0] : o.value[r.value + 1];
      return c.value || l.search ? "" : A;
    }), u = Q(() => {
      let A = o.value[r.value];
      return c.value ? A : "";
    }), y = Q(() => !c.value && !l.search && $.value), V = (A) => {
      if (A != null && A.trim() != "") {
        let k = (B, W) => Math.round(Math.random() * (W - B)) + B, j = (B) => l.historySearchList.filter((W) => W.name == B).length != 0;
        if (A && l.historySearchList)
          j(A) || l.historySearchList.unshift({ name: A, type: m.types[k(0, 3)] });
        else {
          let B = c.value ? u : v;
          A = B.value, j(B.value) || l.historySearchList.unshift({ name: B.value, type: m.types[k(0, 3)] });
        }
        Be.set("searchHistory", l.historySearchList);
      }
      l.search = A, a.value.focus(), n("submit", A);
    }, I = (A) => {
      l.historySearchList.findIndex((k) => k.name == A), l.historySearchList.splice(
        l.historySearchList.findIndex((k) => k.name == A),
        1
      ), Be.set("searchHistory", l.historySearchList);
    }, Y = () => {
      l.historySearchList.length = 0, Be.remove("searchHistory");
    }, ne = (A) => {
      if (A.pseudoElement == "::after") {
        $.value = !1;
        let k = typeof o.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = k, setTimeout(() => {
          $.value = !0;
        }, 3e3);
      }
    };
    return s({
      close: () => l.visible = !1
    }), (A, k) => {
      const j = de("u-icon");
      return p(), x("div", po, [
        i("div", {
          class: G(["search", { active: c.value }])
        }, [
          i("div", vo, [
            S(j, null, {
              default: F(() => [
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
            class: G({ animate: y.value }),
            onAnimationend: ne
          }, [
            fe(i("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": k[0] || (k[0] = (B) => l.search = B),
              type: "text",
              placeholder: u.value,
              onFocus: k[1] || (k[1] = () => {
                c.value = !0, l.visible = !0;
              }),
              onBlur: k[2] || (k[2] = (B) => c.value = !1),
              onKeyup: k[3] || (k[3] = xe((B) => V(l.search), ["enter"]))
            }, null, 40, mo), [
              [It, l.search]
            ])
          ], 42, ho),
          i("div", _o, [
            fe(S(j, {
              class: "close",
              onClick: k[4] || (k[4] = (B) => l.search = "")
            }, {
              default: F(() => [
                go
              ]),
              _: 1
            }, 512), [
              [Se, l.search]
            ]),
            i("div", {
              class: "search-btn",
              onClick: k[5] || (k[5] = (B) => V(l.search))
            }, [
              S(j, null, {
                default: F(() => [
                  yo
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        fe(S(uo, {
          data: l,
          onOnClose: I,
          onOnClear: Y,
          onSubmit: V
        }, null, 8, ["data"]), [
          [g(it), () => l.visible = !1, _.value]
        ])
      ]);
    };
  }
});
const $o = /* @__PURE__ */ K(wo, [["__scopeId", "data-v-df2be5d9"]]), bo = se($o), bt = (e, s) => {
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
}, xt = (e) => (re("data-v-f75472b5"), e = e(), ce(), e), Co = { class: "message" }, ko = { class: "chat-list" }, Mo = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), So = { class: "content" }, Lo = {
  key: 0,
  class: "username"
}, zo = ["innerHTML"], Fo = /* @__PURE__ */ xt(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), Io = /* @__PURE__ */ N({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: s }) {
    const { allEmoji: n } = le(He), t = L();
    return s({
      scroll: () => {
        ke(() => {
          const o = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(o.offsetTop);
        });
      }
    }), (o, c) => (p(), x("div", Co, [
      S(g(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: F(() => [
          i("div", ko, [
            (p(!0), x(oe, null, ie(o.data, (r, $) => (p(), x("div", {
              key: $,
              class: G([{ self: o.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                S(g(Je), null, {
                  default: F(() => [
                    Mo
                  ]),
                  _: 1
                })
              ]),
              i("div", So, [
                o.userId != r.id ? (p(), x("div", Lo, P(r.username), 1)) : U("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: g(bt)(g(n), r.content)
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
const To = /* @__PURE__ */ K(Io, [["__scopeId", "data-v-f75472b5"]]), Ne = (e) => (re("data-v-18726a6b"), e = e(), ce(), e), Ho = { class: "u-chat" }, Ao = { class: "header" }, Bo = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
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
      l && v == "Enter" && $();
    }, r = () => {
      a.value = "", o.value.scroll();
    }, $ = () => {
      let m = a.value;
      m.trim() ? (m = m.replace(/\n/g, "<br/>"), s("submit", { clear: r, content: m })) : tt({ type: "error", message: "内容不能为空" });
    }, _ = (m) => {
      let l = document.getElementById("emojiInput"), v = l.selectionStart, f = l.selectionEnd, u = l.value;
      if (v === null || f === null)
        return;
      let y = u.substring(0, v) + m + u.substring(f);
      l.value = y, l.focus(), l.selectionStart = v + m.length, l.selectionEnd = v + m.length, a.value = y;
    };
    return _e(He, n.emoji), (m, l) => {
      const v = de("u-icon"), f = de("u-emoji");
      return p(), x("div", Ho, [
        i("div", {
          class: G([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", Ao, [
            S(v, { size: "32" }, {
              default: F(() => [
                Bo
              ]),
              _: 1
            }),
            Eo
          ]),
          S(To, {
            ref_key: "messageRef",
            ref: o,
            data: m.data,
            "user-id": m.userId
          }, null, 8, ["data", "user-id"]),
          i("div", Vo, [
            S(g(Ee), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: xe(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            S(f, {
              style: { margin: "0 8px 0" },
              emoji: m.emoji,
              placement: "top-end",
              onAddEmoji: _
            }, {
              default: F(() => [
                Do
              ]),
              _: 1
            }, 8, ["emoji"]),
            S(v, {
              size: "18",
              class: G([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: $
            }, {
              default: F(() => [
                Oo
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        S(g(De), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (u) => t.value = !t.value)
        }, {
          default: F(() => [
            pe("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Ro = /* @__PURE__ */ K(jo, [["__scopeId", "data-v-18726a6b"]]), Uo = se(Ro), Ct = (e) => (re("data-v-85c87038"), e = e(), ce(), e), Yo = { class: "u-emoji" }, No = { class: "face-tooltip-head select-none" }, Po = ["onClick"], qo = ["src"], Wo = { class: "emoji-body select-none" }, Zo = { style: { padding: "0 5px" } }, Ko = ["onClick"], Jo = { class: "emoji-btn select-none" }, Go = { key: 0 }, Xo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("svg", {
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
    function $(m) {
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
    return (m, l) => (p(), x("div", Yo, [
      S(g(ct), {
        placement: m.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: _
      }, {
        reference: F(() => [
          i("div", Jo, [
            m.$slots.default ? ve(m.$slots, "default", { key: 1 }, void 0, !0) : (p(), x("div", Go, es))
          ])
        ]),
        default: F(() => [
          i("div", No, [
            (p(!0), x(oe, null, ie(g(r), (v, f) => (p(), x("label", {
              key: f,
              class: G(t.value == f ? "active" : ""),
              onClick: (u) => $(f)
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
              (p(!0), x(oe, null, ie(o.value, (v, f) => (p(), x("div", {
                key: f,
                class: "emoji-wrapper"
              }, [
                S(g(Re), null, {
                  default: F(() => [
                    i("div", Zo, [
                      (p(!0), x(oe, null, ie(v, (u, y) => (p(), x("span", {
                        key: y,
                        class: "emoji-item",
                        onClick: (V) => m.$emit("addEmoji", y)
                      }, [
                        S(g(ut), {
                          src: u,
                          title: String(y),
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
const ns = /* @__PURE__ */ K(ts, [["__scopeId", "data-v-85c87038"]]), He = Symbol(), kt = se(ns), os = /* @__PURE__ */ N({
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
    const n = e, t = ue({
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
    }), a = () => n.endAmount > n.startAmount, o = Q(() => {
      const m = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let v = l.split("."), f = v[0], u = v.length > 1 ? n.decimalSeparator + v[1] : "", y = !isNaN(parseFloat(n.separator));
      if (n.separator && !y)
        for (; m.test(f); )
          f = f.replace(m, "$1" + n.separator + "$2");
      return f + u;
    }), c = Q(() => `${n.prefix}${o.value}${n.suffix}`);
    we(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      $(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(_);
    }, $ = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, _ = (m) => {
      t.timestamp = m, t.startTimestamp || (t.startTimestamp = m);
      let l = m - t.startTimestamp;
      t.remaining = t.currentDuration - l, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(_) : s("finished");
    };
    return (m, l) => (p(), x("span", null, P(c.value), 1));
  }
}), ss = se(os), at = /* @__PURE__ */ N({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const s = L({}), { showInfo: n } = le(Qe), t = le(Ye), a = () => Ie("div", t.card(s.value));
    return (o, c) => g(t).card ? (p(), X(g(ct), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => g(n)(o.uid, (r) => s.value = r))
    }, {
      reference: F(() => [
        ve(o.$slots, "default")
      ]),
      default: F(() => [
        S(a)
      ]),
      _: 3
    })) : ve(o.$slots, "default", { key: 1 });
  }
}), ot = (e) => (re("data-v-145d47b0"), e = e(), ce(), e), as = { class: "comment-sub" }, ls = ["href", "target"], is = { key: 0 }, rs = {
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
    const s = e, n = ue({
      active: !1
    }), t = L(), a = L(), o = Q(() => {
      let k = s.data.contentImg;
      return Ce(k) ? [] : k == null ? void 0 : k.split("||");
    }), { allEmoji: c } = le(He), { like: r, user: $, relativeTime: _, aTarget: m, showLevel: l, showLikes: v, showAddress: f, showHomeLink: u } = le(
      Qe
    );
    function y() {
      n.active = !n.active, n.active && ke(() => {
        var k;
        (k = t.value) == null || k.focus();
      });
    }
    function V(k) {
      var B;
      const j = k.target;
      (B = a.value) != null && B.contains(j) || (n.active = !1);
    }
    const I = le(Ye), Y = () => Ie("div", I.info(s.data)), ne = () => Ie("div", I.operate(s.data)), A = Q(() => bt(c, s.data.content));
    return (k, j) => (p(), x("div", {
      class: G(["comment", { reply: s.reply }])
    }, [
      i("div", as, [
        S(at, {
          uid: g(be)(k.data.uid)
        }, {
          default: F(() => [
            i("a", {
              href: k.data.user.homeLink,
              target: g(m),
              class: G([{ "pointer-events-none": !g(u) }, "no-underline"]),
              style: { display: "block" }
            }, [
              S(g(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: k.data.user.avatar
              }, {
                default: F(() => [
                  k.data.user.username ? (p(), x("span", is, P(k.data.user.username), 1)) : (p(), x("img", rs))
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
              uid: g(be)(k.data.uid)
            }, {
              default: F(() => [
                i("a", {
                  href: k.data.user.homeLink,
                  target: g(m),
                  class: G([{ "pointer-events-none": !g(u) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  i("div", vs, [
                    i("span", fs, P(k.data.user.username), 1),
                    g(l) ? (p(), x("span", hs, [
                      S(g(Le), {
                        size: "24",
                        innerHTML: g(xo)(k.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : U("", !0)
                  ])
                ], 10, ps)
              ]),
              _: 1
            }, 8, ["uid"]),
            g(f) ? (p(), x("span", ms, "   " + P(k.data.address), 1)) : U("", !0),
            g(I).info ? (p(), X(Y, { key: 1 })) : U("", !0),
            i("time", _s, P(g(_) ? g(Xe)(k.data.createTime).fromNow() : k.data.createTime), 1)
          ]),
          i("div", gs, [
            S(g($t), { unfold: "" }, {
              default: F(() => [
                i("div", { innerHTML: A.value }, null, 8, ys),
                i("div", ws, [
                  (p(!0), x(oe, null, ie(o.value, (B, W) => (p(), X(g(ut), {
                    key: W,
                    src: B,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": o.value,
                    "initial-index": W
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          i("div", $s, [
            g(v) ? (p(), x("div", {
              key: 0,
              class: "item",
              onClick: j[0] || (j[0] = (B) => g(r)(g(be)(k.data.id)))
            }, [
              g($).likeIds && g($).likeIds.map(String).indexOf(g(be)(k.data.id)) == -1 ? (p(), X(g(Le), { key: 0 }, {
                default: F(() => [
                  bs
                ]),
                _: 1
              })) : (p(), X(g(Le), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: F(() => [
                  xs
                ]),
                _: 1
              })),
              k.data.likes != 0 ? (p(), x("span", Cs, P(k.data.likes), 1)) : U("", !0)
            ])) : U("", !0),
            i("div", {
              ref_key: "btnRef",
              ref: a,
              class: G(["item", { active: n.active }]),
              onClick: y
            }, [
              S(g(Le), null, {
                default: F(() => [
                  ks
                ]),
                _: 1
              }),
              i("span", null, P(n.active ? "取消回复" : "回复"), 1)
            ], 2),
            g(I).operate ? (p(), X(ne, { key: 1 })) : U("", !0)
          ]),
          n.active ? (p(), x("div", Ms, [
            S(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": g(be)(k.id),
              placeholder: `回复 @${k.data.user.username}...`,
              reply: k.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: V,
              onClose: j[1] || (j[1] = (B) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : U("", !0)
        ]),
        ve(k.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const Mt = /* @__PURE__ */ K(Ss, [["__scopeId", "data-v-145d47b0"]]), Ls = (e) => (re("data-v-d640faf0"), e = e(), ce(), e), zs = {
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
    const s = e, n = ue({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: o } = le(We), { page: c } = le(We), r = Q(() => {
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
    }), $ = () => {
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
    return (v, f) => r.value.length > 0 ? (p(), x("div", zs, [
      i("div", Fs, [
        (p(!0), x(oe, null, ie(r.value.list, (u, y) => (p(), X(Mt, {
          id: v.id,
          key: y,
          data: u,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > g(a) ? (p(), x("div", Is, [
          n.loading ? (p(), x("span", Ts, "加载中...")) : (p(), x("div", Hs, [
            n.over ? U("", !0) : (p(), x("div", As, [
              pe(" 共" + P(r.value.total) + "条回复, ", 1),
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: $
              }, [
                pe(" 点击查看 "),
                Bs
              ])
            ]))
          ]))
        ])) : U("", !0),
        n.over && g(c) ? (p(), x("div", Es, [
          S(g(jt), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "page-size": n.pageSize,
            onCurrentChange: m,
            onSizeChange: l
          }, null, 8, ["total", "page-size"])
        ])) : U("", !0)
      ])
    ])) : U("", !0);
  }
});
const Ds = /* @__PURE__ */ K(Vs, [["__scopeId", "data-v-d640faf0"]]), Os = {
  key: 0,
  class: "comment-list"
}, js = /* @__PURE__ */ N({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (s, n) => s.data ? (p(), x("div", Os, [
      (p(!0), x(oe, null, ie(s.data, (t) => (p(), X(Mt, {
        id: g(be)(t.id),
        key: g(be)(t.id),
        data: t
      }, {
        default: F(() => [
          S(Ds, {
            id: g(be)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : U("", !0);
  }
});
const St = (e) => (re("data-v-d413d6a6"), e = e(), ce(), e), Rs = { class: "u-comment" }, Us = {
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
      placeholder: $ = "输入评论（Enter换行，Ctrl + Enter发送）",
      showForm: _ = !0,
      showContent: m = !0,
      showLevel: l = !0,
      showLikes: v = !0,
      showAddress: f = !0,
      showHomeLink: u = !0,
      mentionConfig: y
    } = Ke(t.config), V = ({ content: D, parentId: C, reply: h, files: d, clear: M }) => {
      const b = (T) => {
        if (M(), T)
          if (C) {
            let H = o.value.find((w) => w.id == C);
            if (H) {
              let w = H.reply;
              w ? (w.list.unshift(T), w.total++) : H.reply = {
                total: 1,
                list: [T]
              };
            }
          } else
            o.value.unshift(T);
      };
      n("submit", { content: D, parentId: C, reply: h, files: d, mentionList: W.value, finish: b });
    }, I = {
      upload: t.upload,
      submit: V,
      focus: () => n("focus")
    };
    _e(mt, I), _e("cancelFn", () => n("cancel"));
    const Y = (D, C) => {
      let h = null;
      o.value.forEach((d) => {
        var M;
        d.id == D ? h = d : h = (M = d.reply) == null ? void 0 : M.list.find((b) => b.id == D), h && h.likes && (h.likes += C);
      });
    }, A = {
      user: a,
      like: (D) => {
        const C = t.config.user.likeIds;
        C && n("like", D, () => {
          if (C.findIndex((h) => h == D) == -1)
            C.push(D), Y(D, 1);
          else {
            let h = C.findIndex((d) => d == D);
            h != -1 && (C.splice(h, 1), Y(D, -1));
          }
        });
      },
      relativeTime: ye(t.relativeTime, !1),
      showInfo: (D, C) => n("showInfo", D, C),
      aTarget: ye(r, "_blank"),
      showLevel: l,
      showLikes: v,
      showAddress: f,
      showHomeLink: u
    };
    _e(Qe, A);
    const k = {
      page: t.page,
      replyPage: (D, C, h, d) => {
        n("replyPage", { parentId: D, pageNum: C, pageSize: h, finish: d });
      },
      replyShowSize: ye(c == null ? void 0 : c.value, 3),
      comments: o
    };
    _e(We, k);
    const j = (D) => {
      const { parentId: C, id: h } = D;
      if (C) {
        let d = o.value.find((b) => b.id == C), M = d == null ? void 0 : d.reply;
        if (M) {
          let b = M.list.findIndex((T) => T.id == h);
          b != -1 && (M.list.splice(b, 1), M.total--);
        }
      } else {
        let d = o.value.findIndex((M) => M.id == h);
        d != -1 && o.value.splice(d, 1);
      }
    }, B = L(null), W = L([]);
    function Z(D) {
      W.value = D;
    }
    function R() {
      return W.value;
    }
    const he = pt((D) => {
      n("mentionSearch", D);
    }, 300);
    return _e(He, t.config.emoji), _e("mentionConfig", y), _e(Ye, Tt()), _e("changeMetionList", Z), _e("mentionSearch", he), s({
      remove: j,
      mentionList: W,
      getMentionList: R,
      setMentionShow: (D) => {
        B.value.setMentionShow(D);
      }
    }), (D, C) => (p(), x("div", Rs, [
      g(_) ? (p(), x("div", Us, [
        ve(D.$slots, "header", {}, () => [
          Ys
        ], !0),
        i("div", Ns, [
          i("div", Ps, [
            S(g(Je), {
              size: 40,
              src: D.config.user.avatar
            }, {
              default: F(() => [
                D.config.user.username ? (p(), x("span", qs, P(D.config.user.username), 1)) : (p(), x("img", Ws))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          S(gt, Ht(D.$attrs, {
            ref_key: "inputBox",
            ref: B,
            placeholder: g($),
            "content-btn": "发表评论"
          }), null, 16, ["placeholder"])
        ])
      ])) : U("", !0),
      g(m) ? (p(), x("div", Zs, [
        ve(D.$slots, "default", {}, () => [
          Ks
        ], !0),
        S(js, { data: g(o) }, null, 8, ["data"])
      ])) : U("", !0)
    ]));
  }
});
const Gs = /* @__PURE__ */ K(Js, [["__scopeId", "data-v-d413d6a6"]]), Xs = se(Gs), Qs = [
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
  se as withInstall
};
