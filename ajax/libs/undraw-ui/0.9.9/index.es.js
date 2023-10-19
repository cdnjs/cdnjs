import { h as ze, render as zt, defineComponent as U, ref as z, reactive as se, inject as ce, withDirectives as fe, openBlock as v, createElementBlock as b, createVNode as k, unref as y, normalizeClass as K, Transition as Pe, withCtx as S, createElementVNode as l, createCommentVNode as Y, createBlock as J, createTextVNode as re, toDisplayString as q, nextTick as we, pushScopeId as ee, popScopeId as te, computed as Z, renderSlot as ue, resolveComponent as ae, watch as pe, createSlots as St, useCssVars as Be, normalizeStyle as Se, onMounted as ge, vShow as Le, toRefs as qe, withKeys as We, Fragment as Q, renderList as le, onUnmounted as Ae, toRef as it, withModifiers as st, vModelText as Lt, provide as be, useSlots as Ft } from "vue";
import { ElButton as Ze, ClickOutside as rt, ElLink as ct, ElInfiniteScroll as Tt, ElDialog as It, ElForm as Ht, ElFormItem as Me, ElInput as Ve, ElScrollbar as Ke, ElCarousel as Vt, ElTag as At, ElAvatar as Je, ElPopover as ut, ElImage as dt, ElPagination as Bt } from "element-plus";
import { ElAvatar as o4, ElButton as s4, ElCarousel as a4, ElDialog as l4, ElDropdown as i4, ElDropdownItem as r4, ElDropdownMenu as c4, ElImage as u4, ElInput as d4, ElLink as p4, ElPagination as h4, ElPopover as f4, ElScrollbar as v4, ElTag as m4, ElInfiniteScroll as _4 } from "element-plus";
/*! UndrawUi v0.9.8 */
function pt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Et(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Dt(e) {
  return !isNaN(Number(e));
}
function Yo(e) {
  return typeof e == "function";
}
function No(e) {
  return typeof e == "string";
}
function Po(e) {
  return typeof e == "boolean";
}
function _e(e) {
  return pt(e) ? e.length === 0 : Et(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const de = (e, o) => _e(e) ? o : e;
function Ye(e) {
  if (typeof e != "object" || e === null)
    return e;
  let o;
  if (Array.isArray(e)) {
    o = [];
    for (let n = 0; n < e.length; n++)
      o[n] = Ye(e[n]);
  } else if (e instanceof Date)
    o = new Date(e.getTime());
  else if (e instanceof RegExp)
    o = new RegExp(e.source, e.flags);
  else {
    o = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (o[n] = Ye(e[n]));
  }
  return o;
}
function qo(e, o = { parentId: "parentId", children: "children" }) {
  let n = de(o.parentId, "parentId"), t = de(o.children, "children");
  e = Ye(e);
  const a = [], s = {};
  return e.forEach((c) => s[c.id] = c), e.forEach((c) => {
    const i = s[c[n]];
    i ? (i[t] || (i[t] = [])).push(c) : a.push(c);
  }), a;
}
function Wo(e = [], o = { parentId: "parentId", children: "children" }) {
  let n = de(o.parentId, "parentId"), t = de(o.children, "children");
  const a = [], s = (c, i) => {
    c.forEach((m) => {
      m.id || (m.id = i++), m[n] = i, a.push(m), m[t] && pt(m[t]) && s(m[t], m.id);
    });
  };
  return s(e || [], null), a;
}
const Zo = (e, o = 1 / 0) => e.flat(o), X = (e, o) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(o ?? {})])
      n.component(t.name, t);
  }, o)
    for (const [n, t] of Object.entries(o))
      e[n] = t;
  return e;
};
function Ko() {
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
  const m = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), f = (o.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], u = t === "pc", r = !u, d = i === "xs" || r, p = window.innerHeight + "px";
  return {
    version: f,
    type: n,
    plat: c,
    tag: t,
    prefix: s,
    isMobile: r,
    isIOS: m,
    isPC: u,
    isMini: d,
    screen: i,
    innerHeight: p
  };
}
function jt(e, o) {
  const n = ze(e, o), t = document.createElement("div");
  return document.body.append(t), zt(n, t), { vnode: n, div: t };
}
function Ot(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Ee = (e) => e ? "localStorage" : "sessionStorage", Ut = (e, o, n = !0) => {
  (o === "" || o === null || o === void 0) && (o = null), window[Ee(n)].setItem(e, JSON.stringify(o));
}, Rt = (e, o = !0) => {
  let n;
  const t = window[Ee(o)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Yt = (e, o = !0) => {
  window[Ee(o)].removeItem(e);
}, Nt = (e = !0) => {
  window[Ee(e)].clear();
}, He = {
  set: Ut,
  get: Rt,
  remove: Yt,
  clear: Nt
}, Pt = (e, o = 200, n = !1) => {
  let t = !1, a = null;
  const s = (...c) => new Promise((i, m) => {
    if (a && clearTimeout(a), n && !t) {
      const f = e.apply(void 0, c);
      i(f), t = !0;
    } else
      a = setTimeout(() => {
        const f = e.apply(void 0, c);
        i(f), t = !1, a = null;
      }, o);
  });
  return s.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, s;
}, Jo = (e, o = 500) => {
  let n = 0;
  const t = (...a) => new Promise((s, c) => {
    const i = (/* @__PURE__ */ new Date()).getTime();
    if (i - n >= o) {
      const m = e.apply(void 0, a);
      s(m), n = i;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, ye = (e) => e == null ? "" : String(e);
function qt(e) {
  let o = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return o.indexOf(t.toLowerCase()) != -1;
}
function Wt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function Go(e) {
  const o = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, s) => o.append(n + `[${s}]`, a)) : o.append(n, e[n]);
  }), o;
}
function Xo(e) {
  return Object.keys(e).filter((o) => e[o] !== null && e[o] !== void 0).reduce((o, n) => ({ ...o, [n]: e[n] }), {});
}
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ht(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Re = { exports: {} }, at;
function ft() {
  return at || (at = 1, function(e, o) {
    (function(n, t) {
      e.exports = t();
    })(Ge, function() {
      var n = 1e3, t = 6e4, a = 36e5, s = "millisecond", c = "second", i = "minute", m = "hour", f = "day", u = "week", r = "month", d = "quarter", p = "year", _ = "date", g = "Invalid Date", A = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, F = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(L) {
        var x = ["th", "st", "nd", "rd"], $ = L % 100;
        return "[" + L + (x[($ - 20) % 10] || x[$] || x[0]) + "]";
      } }, D = function(L, x, $) {
        var H = String(L);
        return !H || H.length >= x ? L : "" + Array(x + 1 - H.length).join($) + L;
      }, M = { s: D, z: function(L) {
        var x = -L.utcOffset(), $ = Math.abs(x), H = Math.floor($ / 60), C = $ % 60;
        return (x <= 0 ? "+" : "-") + D(H, 2, "0") + ":" + D(C, 2, "0");
      }, m: function L(x, $) {
        if (x.date() < $.date())
          return -L($, x);
        var H = 12 * ($.year() - x.year()) + ($.month() - x.month()), C = x.clone().add(H, r), B = $ - C < 0, V = x.clone().add(H + (B ? -1 : 1), r);
        return +(-(H + ($ - C) / (B ? C - V : V - C)) || 0);
      }, a: function(L) {
        return L < 0 ? Math.ceil(L) || 0 : Math.floor(L);
      }, p: function(L) {
        return { M: r, y: p, w: u, d: f, D: _, h: m, m: i, s: c, ms: s, Q: d }[L] || String(L || "").toLowerCase().replace(/s$/, "");
      }, u: function(L) {
        return L === void 0;
      } }, w = "en", T = {};
      T[w] = F;
      var E = function(L) {
        return L instanceof ie;
      }, R = function L(x, $, H) {
        var C;
        if (!x)
          return w;
        if (typeof x == "string") {
          var B = x.toLowerCase();
          T[B] && (C = B), $ && (T[B] = $, C = B);
          var V = x.split("-");
          if (!C && V.length > 1)
            return L(V[0]);
        } else {
          var O = x.name;
          T[O] = x, C = O;
        }
        return !H && C && (w = C), C || !H && w;
      }, j = function(L, x) {
        if (E(L))
          return L.clone();
        var $ = typeof x == "object" ? x : {};
        return $.date = L, $.args = arguments, new ie($);
      }, I = M;
      I.l = R, I.i = E, I.w = function(L, x) {
        return j(L, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
      };
      var ie = function() {
        function L($) {
          this.$L = R($.locale, null, !0), this.parse($);
        }
        var x = L.prototype;
        return x.parse = function($) {
          this.$d = function(H) {
            var C = H.date, B = H.utc;
            if (C === null)
              return /* @__PURE__ */ new Date(NaN);
            if (I.u(C))
              return /* @__PURE__ */ new Date();
            if (C instanceof Date)
              return new Date(C);
            if (typeof C == "string" && !/Z$/i.test(C)) {
              var V = C.match(A);
              if (V) {
                var O = V[2] - 1 || 0, W = (V[7] || "0").substring(0, 3);
                return B ? new Date(Date.UTC(V[1], O, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, W)) : new Date(V[1], O, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, W);
              }
            }
            return new Date(C);
          }($), this.$x = $.x || {}, this.init();
        }, x.init = function() {
          var $ = this.$d;
          this.$y = $.getFullYear(), this.$M = $.getMonth(), this.$D = $.getDate(), this.$W = $.getDay(), this.$H = $.getHours(), this.$m = $.getMinutes(), this.$s = $.getSeconds(), this.$ms = $.getMilliseconds();
        }, x.$utils = function() {
          return I;
        }, x.isValid = function() {
          return this.$d.toString() !== g;
        }, x.isSame = function($, H) {
          var C = j($);
          return this.startOf(H) <= C && C <= this.endOf(H);
        }, x.isAfter = function($, H) {
          return j($) < this.startOf(H);
        }, x.isBefore = function($, H) {
          return this.endOf(H) < j($);
        }, x.$g = function($, H, C) {
          return I.u($) ? this[H] : this.set(C, $);
        }, x.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, x.valueOf = function() {
          return this.$d.getTime();
        }, x.startOf = function($, H) {
          var C = this, B = !!I.u(H) || H, V = I.p($), O = function($e, oe) {
            var me = I.w(C.$u ? Date.UTC(C.$y, oe, $e) : new Date(C.$y, oe, $e), C);
            return B ? me : me.endOf(f);
          }, W = function($e, oe) {
            return I.w(C.toDate()[$e].apply(C.toDate("s"), (B ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(oe)), C);
          }, P = this.$W, G = this.$M, ve = this.$D, he = "set" + (this.$u ? "UTC" : "");
          switch (V) {
            case p:
              return B ? O(1, 0) : O(31, 11);
            case r:
              return B ? O(1, G) : O(0, G + 1);
            case u:
              var Ce = this.$locale().weekStart || 0, ke = (P < Ce ? P + 7 : P) - Ce;
              return O(B ? ve - ke : ve + (6 - ke), G);
            case f:
            case _:
              return W(he + "Hours", 0);
            case m:
              return W(he + "Minutes", 1);
            case i:
              return W(he + "Seconds", 2);
            case c:
              return W(he + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, x.endOf = function($) {
          return this.startOf($, !1);
        }, x.$set = function($, H) {
          var C, B = I.p($), V = "set" + (this.$u ? "UTC" : ""), O = (C = {}, C[f] = V + "Date", C[_] = V + "Date", C[r] = V + "Month", C[p] = V + "FullYear", C[m] = V + "Hours", C[i] = V + "Minutes", C[c] = V + "Seconds", C[s] = V + "Milliseconds", C)[B], W = B === f ? this.$D + (H - this.$W) : H;
          if (B === r || B === p) {
            var P = this.clone().set(_, 1);
            P.$d[O](W), P.init(), this.$d = P.set(_, Math.min(this.$D, P.daysInMonth())).$d;
          } else
            O && this.$d[O](W);
          return this.init(), this;
        }, x.set = function($, H) {
          return this.clone().$set($, H);
        }, x.get = function($) {
          return this[I.p($)]();
        }, x.add = function($, H) {
          var C, B = this;
          $ = Number($);
          var V = I.p(H), O = function(G) {
            var ve = j(B);
            return I.w(ve.date(ve.date() + Math.round(G * $)), B);
          };
          if (V === r)
            return this.set(r, this.$M + $);
          if (V === p)
            return this.set(p, this.$y + $);
          if (V === f)
            return O(1);
          if (V === u)
            return O(7);
          var W = (C = {}, C[i] = t, C[m] = a, C[c] = n, C)[V] || 1, P = this.$d.getTime() + $ * W;
          return I.w(P, this);
        }, x.subtract = function($, H) {
          return this.add(-1 * $, H);
        }, x.format = function($) {
          var H = this, C = this.$locale();
          if (!this.isValid())
            return C.invalidDate || g;
          var B = $ || "YYYY-MM-DDTHH:mm:ssZ", V = I.z(this), O = this.$H, W = this.$m, P = this.$M, G = C.weekdays, ve = C.months, he = function(oe, me, Ue, Ie) {
            return oe && (oe[me] || oe(H, B)) || Ue[me].slice(0, Ie);
          }, Ce = function(oe) {
            return I.s(O % 12 || 12, oe, "0");
          }, ke = C.meridiem || function(oe, me, Ue) {
            var Ie = oe < 12 ? "AM" : "PM";
            return Ue ? Ie.toLowerCase() : Ie;
          }, $e = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: P + 1, MM: I.s(P + 1, 2, "0"), MMM: he(C.monthsShort, P, ve, 3), MMMM: he(ve, P), D: this.$D, DD: I.s(this.$D, 2, "0"), d: String(this.$W), dd: he(C.weekdaysMin, this.$W, G, 2), ddd: he(C.weekdaysShort, this.$W, G, 3), dddd: G[this.$W], H: String(O), HH: I.s(O, 2, "0"), h: Ce(1), hh: Ce(2), a: ke(O, W, !0), A: ke(O, W, !1), m: String(W), mm: I.s(W, 2, "0"), s: String(this.$s), ss: I.s(this.$s, 2, "0"), SSS: I.s(this.$ms, 3, "0"), Z: V };
          return B.replace(h, function(oe, me) {
            return me || $e[oe] || V.replace(":", "");
          });
        }, x.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, x.diff = function($, H, C) {
          var B, V = I.p(H), O = j($), W = (O.utcOffset() - this.utcOffset()) * t, P = this - O, G = I.m(this, O);
          return G = (B = {}, B[p] = G / 12, B[r] = G, B[d] = G / 3, B[u] = (P - W) / 6048e5, B[f] = (P - W) / 864e5, B[m] = P / a, B[i] = P / t, B[c] = P / n, B)[V] || P, C ? G : I.a(G);
        }, x.daysInMonth = function() {
          return this.endOf(r).$D;
        }, x.$locale = function() {
          return T[this.$L];
        }, x.locale = function($, H) {
          if (!$)
            return this.$L;
          var C = this.clone(), B = R($, H, !0);
          return B && (C.$L = B), C;
        }, x.clone = function() {
          return I.w(this.$d, this);
        }, x.toDate = function() {
          return new Date(this.valueOf());
        }, x.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, x.toISOString = function() {
          return this.$d.toISOString();
        }, x.toString = function() {
          return this.$d.toUTCString();
        }, L;
      }(), ne = ie.prototype;
      return j.prototype = ne, [["$ms", s], ["$s", c], ["$m", i], ["$H", m], ["$W", f], ["$M", r], ["$y", p], ["$D", _]].forEach(function(L) {
        ne[L[1]] = function(x) {
          return this.$g(x, L[0], L[1]);
        };
      }), j.extend = function(L, x) {
        return L.$i || (L(x, ie, j), L.$i = !0), j;
      }, j.locale = R, j.isDayjs = E, j.unix = function(L) {
        return j(1e3 * L);
      }, j.en = T[w], j.Ls = T, j.p = {}, j;
    });
  }(Re)), Re.exports;
}
var Zt = ft();
const Xe = /* @__PURE__ */ ht(Zt);
var Kt = { exports: {} };
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
      var m = 100 * c + i;
      return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1100 ? "上午" : m < 1300 ? "中午" : m < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(s, null, !0), s;
  });
})(Kt);
var vt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t();
  })(Ge, function() {
    return function(n, t, a) {
      n = n || {};
      var s = t.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(f, u, r, d) {
        return s.fromToBase(f, u, r, d);
      }
      a.en.relativeTime = c, s.fromToBase = function(f, u, r, d, p) {
        for (var _, g, A, h = r.$locale().relativeTime || c, F = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], D = F.length, M = 0; M < D; M += 1) {
          var w = F[M];
          w.d && (_ = d ? a(f).diff(r, w.d, !0) : r.diff(f, w.d, !0));
          var T = (n.rounding || Math.round)(Math.abs(_));
          if (A = _ > 0, T <= w.r || !w.r) {
            T <= 1 && M > 0 && (w = F[M - 1]);
            var E = h[w.l];
            p && (T = p("" + T)), g = typeof E == "string" ? E.replace("%d", T) : E(T, u, w.l, A);
            break;
          }
        }
        if (u)
          return g;
        var R = A ? h.future : h.past;
        return typeof R == "function" ? R(g) : R.replace("%s", g);
      }, s.to = function(f, u) {
        return i(f, u, this, !0);
      }, s.from = function(f, u) {
        return i(f, u, this);
      };
      var m = function(f) {
        return f.$u ? a.utc() : a();
      };
      s.toNow = function(f) {
        return this.to(m(this), f);
      }, s.fromNow = function(f) {
        return this.from(m(this), f);
      };
    };
  });
})(vt);
var Jt = vt.exports;
const Gt = /* @__PURE__ */ ht(Jt);
Xe.locale("zh-cn");
Xe.extend(Gt);
const De = Symbol(), mt = Symbol(), Qe = Symbol(), Ne = Symbol(), _t = (e) => (ee("data-v-07ac817e"), e = e(), te(), e), Xt = { class: "comment-box" }, Qt = {
  key: 0,
  class: "action-box"
}, e1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("svg", {
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
], -1)), t1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("span", null, "图片", -1)), n1 = /* @__PURE__ */ U({
  __name: "input-box",
  props: {
    placeholder: {},
    contentBtn: {},
    parentId: {},
    reply: {}
  },
  emits: ["hide", "close"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = z(""), s = z(!1), c = z(!0), i = z(), m = z(), f = z(), u = z([]), r = z([]), d = se({
      imgLength: 0
    }), p = (j) => {
      _e(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: _, submit: g, focus: A } = ce(mt), h = ce(Te), F = () => {
      g({
        content: t.reply ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: de(t.parentId, null),
        reply: t.reply,
        files: r.value,
        clear: () => {
          D(), n("close");
        }
      });
    }, D = () => {
      i.value.clear(), u.value.length = 0, r.value = [], c.value = !0;
    };
    function M(j) {
      _e(a.value) && !d.imgLength && (s.value = !1, n("hide", j));
    }
    function w() {
      s.value = !0, we(() => {
        m.value = document.querySelector("div[id^='el-popper-container']");
      }), A();
    }
    o({
      focus: () => {
        var j;
        return (j = i.value) == null ? void 0 : j.focus();
      }
    });
    const T = (j) => {
      var ie;
      u.value.length = 0, r.value.length = 0;
      const I = (ie = f.value) == null ? void 0 : ie.files;
      if (d.imgLength = de(I == null ? void 0 : I.length, 0), I)
        for (let ne = 0; ne < I.length; ne++) {
          let L = I[ne].name, x = Wt(I[ne]);
          r.value.push(I[ne]), qt(L) ? u.value.push(x) : tt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, E = ce(De), R = () => ze("div", E.func());
    return (j, I) => fe((v(), b("div", Xt, [
      k(y(wt), {
        ref_key: "editorRef",
        ref: i,
        modelValue: a.value,
        "onUpdate:modelValue": I[0] || (I[0] = (ie) => a.value = ie),
        class: K({ "input-active": s.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": u.value,
        onFocus: w,
        onInput: p,
        onSubmit: F
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      k(Pe, { name: "fade" }, {
        default: S(() => [
          s.value ? (v(), b("div", Qt, [
            k(y(kt), {
              emoji: y(h),
              onAddEmoji: I[1] || (I[1] = (ie) => {
                var ne;
                return (ne = i.value) == null ? void 0 : ne.addText(ie);
              })
            }, null, 8, ["emoji"]),
            y(_) ? (v(), b("div", {
              key: 0,
              class: "picture",
              onClick: I[2] || (I[2] = //@ts-ignore
              (...ie) => {
                var ne, L;
                return ((ne = f.value) == null ? void 0 : ne.click) && ((L = f.value) == null ? void 0 : L.click(...ie));
              })
            }, [
              e1,
              t1,
              l("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: f,
                type: "file",
                multiple: "",
                onChange: T
              }, null, 544)
            ])) : Y("", !0),
            y(E).func ? (v(), J(R, { key: 1 })) : Y("", !0),
            k(y(Ze), {
              type: "primary",
              disabled: c.value,
              onClick: F
            }, {
              default: S(() => [
                re(q(t.contentBtn), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ])) : Y("", !0)
        ]),
        _: 1
      })
    ])), [
      [y(rt), M, m.value]
    ]);
  }
});
const N = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of o)
    n[t] = a;
  return n;
}, gt = /* @__PURE__ */ N(n1, [["__scopeId", "data-v-07ac817e"]]), o1 = { class: "u-comment-scroll" }, s1 = ["infinite-scroll-disabled"], a1 = { class: "scroll-btn" }, l1 = { key: 1 }, i1 = { key: 2 }, r1 = /* @__PURE__ */ U({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: o }) {
    const n = e, t = z(!1), a = z(!1), s = Z(() => a.value && n.disable), c = Z(() => !a.value || t.value || s.value), i = Pt(() => {
      o("more"), t.value = !1;
    }, 500), m = () => {
      t.value = !0, i();
    };
    return (f, u) => (v(), b("div", o1, [
      fe((v(), b("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        ue(f.$slots, "default", {}, void 0, !0),
        l("div", a1, [
          a.value ? Y("", !0) : (v(), J(y(ct), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: u[0] || (u[0] = (r) => a.value = !a.value)
          }, {
            default: S(() => [
              re("加载更多")
            ]),
            _: 1
          })),
          t.value ? (v(), b("p", l1, "加载中...")) : Y("", !0),
          s.value ? (v(), b("p", i1, "没有更多了")) : Y("", !0)
        ])
      ], 8, s1)), [
        [y(Tt), m]
      ])
    ]));
  }
});
const c1 = /* @__PURE__ */ N(r1, [["__scopeId", "data-v-404b6e08"]]), u1 = X(c1), et = (e) => (ee("data-v-3e026489"), e = e(), te(), e), d1 = { class: "nav" }, p1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("span", { class: "nav__title" }, "全部评论", -1)), h1 = { class: "nav__sort" }, f1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
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
], -1)), v1 = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), m1 = /* @__PURE__ */ U({
  name: "uCommentNav",
  __name: "comment-nav",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: o }) {
    const n = e, t = Z({
      get() {
        return n.modelValue;
      },
      set(a) {
        o("update:modelValue", a), o("sorted", a);
      }
    });
    return (a, s) => {
      const c = ae("u-icon");
      return v(), b("div", d1, [
        p1,
        l("div", h1, [
          l("div", {
            class: K(["item select-none", { active: t.value }]),
            onClick: s[0] || (s[0] = (i) => t.value = !0)
          }, [
            k(c, null, {
              default: S(() => [
                f1
              ]),
              _: 1
            }),
            re(" 最新 ")
          ], 2),
          l("div", {
            class: K(["item select-none", { active: !t.value }]),
            onClick: s[1] || (s[1] = (i) => t.value = !1)
          }, [
            k(c, null, {
              default: S(() => [
                v1
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
const _1 = /* @__PURE__ */ N(m1, [["__scopeId", "data-v-3e026489"]]), g1 = X(_1), yt = (e) => (ee("data-v-59596f14"), e = e(), te(), e), y1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, w1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), $1 = [
  w1
], b1 = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, x1 = /* @__PURE__ */ yt(() => /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), C1 = [
  x1
], k1 = /* @__PURE__ */ U({
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
    const n = e, t = z(!1), a = z(!1);
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
    ), (s, c) => (v(), J(y(It), {
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
      default: S(() => [
        l("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (i) => a.value = !a.value)
        }, [
          a.value ? (v(), b("svg", y1, $1)) : (v(), b("svg", b1, C1))
        ]),
        ue(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      s.$slots.footer ? {
        name: "footer",
        fn: S(() => [
          ue(s.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const M1 = /* @__PURE__ */ N(k1, [["__scopeId", "data-v-59596f14"]]), z1 = X(M1), S1 = { class: "field" }, L1 = /* @__PURE__ */ U({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const o = e;
    Be((t) => ({
      d59c4402: o.borderStyle
    }));
    const n = z();
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
    ), (t, a) => (v(), b("div", {
      class: K(["u-divider", { vertical: t.vertical }])
    }, [
      l("fieldset", S1, [
        t.$slots.default || t.vertical ? (v(), b("legend", {
          key: 0,
          class: K(["inner", n.value])
        }, [
          ue(t.$slots, "default", {}, void 0, !0)
        ], 2)) : Y("", !0)
      ])
    ], 2));
  }
});
const F1 = /* @__PURE__ */ N(L1, [["__scopeId", "data-v-153d9bc7"]]), T1 = X(F1), I1 = [
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
], H1 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function V1(e) {
  return I1.find((o) => o.type === e);
}
function A1() {
  return H1;
}
const B1 = {
  key: 1,
  "aria-hidden": "true"
}, E1 = ["xlink:href"], D1 = /* @__PURE__ */ U({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const o = e, n = Z(() => "#" + o.name), t = Z(() => ({
      fontSize: Dt(o.size) ? o.size + "px" : o.size,
      color: o.color
    }));
    return (a, s) => (v(), b("i", {
      class: "u-icon",
      style: Se(t.value)
    }, [
      a.$slots.default ? ue(a.$slots, "default", { key: 0 }, void 0, !0) : (v(), b("svg", B1, [
        l("use", { "xlink:href": n.value }, null, 8, E1)
      ]))
    ], 4));
  }
});
const j1 = /* @__PURE__ */ N(D1, [["__scopeId", "data-v-dd34e834"]]), xe = X(j1), O1 = { class: "v-toast" }, U1 = { class: "inner" }, R1 = { class: "message" }, Y1 = /* @__PURE__ */ U({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const o = e;
    Be((a) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = se(A1().options), t = z(!1);
    return pe(
      () => o.type,
      (a) => {
        const s = V1(a);
        s && (n.color = s.options.color, n.bgColor = s.options.bgColor, n.icon = s.options.icon);
      },
      { immediate: !0 }
    ), ge(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, o.duration);
    }), (a, s) => (v(), b("div", O1, [
      k(Pe, { name: "v-toast" }, {
        default: S(() => [
          fe(l("div", U1, [
            l("div", R1, [
              n.icon ? (v(), J(y(xe), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : Y("", !0),
              l("span", {
                class: K({ normal: a.type != "normal" })
              }, q(a.message), 3)
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
const N1 = /* @__PURE__ */ N(Y1, [["__scopeId", "data-v-7d3c50e0"]]);
function tt(e) {
  let o = e.duration;
  if (!e.message)
    return;
  e.duration = o || 1e3;
  const { vnode: n, div: t } = jt(N1, e);
  return setTimeout(() => {
    Ot(t);
  }, e.duration + 300), n;
}
const P1 = (e) => (ee("data-v-acb5bb3a"), e = e(), te(), e), q1 = ["placeholder", "onKeydown", "innerHTML"], W1 = ["src"], Z1 = ["onClick"], K1 = /* @__PURE__ */ P1(() => /* @__PURE__ */ l("svg", {
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
], -1)), J1 = [
  K1
], G1 = /* @__PURE__ */ U({
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
    Be((w) => ({
      "75534f80": r.value,
      "3da353f8": d.value
    }));
    const a = z(), s = z(), c = z(), i = z(!1), m = z(!1), f = z(), { imgList: u } = qe(t), r = Z(() => t.minHeight + "px"), d = Z(() => t.minHeight == 30 ? "4px 10px" : "8px 12px");
    pe(
      () => t.modelValue,
      (w) => {
        i.value || (c.value = w);
      }
    );
    function p(w) {
      n("focus", w), i.value = !0, m.value = !0;
    }
    function _(w) {
      var T, E;
      a.value = (T = window.getSelection()) == null ? void 0 : T.getRangeAt(0), n("blur", w), (E = s.value) != null && E.innerHTML || (m.value = !1), i.value = !1;
    }
    function g(w) {
      const { innerHTML: T } = w.target;
      n("update:modelValue", T), n("input", w);
    }
    function A(w) {
      var E, R;
      let T = window.getSelection();
      if (T) {
        T.removeAllRanges(), a.value || ((E = s.value) == null || E.focus(), a.value = T.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(w)), a.value.collapse(!1), T.addRange(a.value), n("update:modelValue", ((R = s.value) == null ? void 0 : R.innerHTML) || "");
        const j = s.value;
        n("input", j);
      }
    }
    function h() {
      s.value && (s.value.innerHTML = "", n("update:modelValue", s.value.innerHTML), m.value = !1);
    }
    function F() {
      we(() => {
        var w;
        (w = s.value) == null || w.focus();
      });
    }
    const D = (w) => {
      w.ctrlKey && w.key == "Enter" && (_e(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? tt({ message: "内容不能为空", type: "info" }) : n("submit"));
    }, M = (w) => {
      var T;
      (T = u == null ? void 0 : u.value) == null || T.splice(w, 1);
    };
    return ge(() => {
    }), o({
      addText: A,
      clear: h,
      focus: F,
      imageRef: f
    }), (w, T) => (v(), b("div", {
      class: K(["u-editor", { active: m.value }])
    }, [
      l("div", {
        ref_key: "editorRef",
        ref: s,
        class: "rich-input",
        contenteditable: "true",
        placeholder: w.placeholder,
        onFocus: p,
        onInput: g,
        onBlur: _,
        onKeydown: We(D, ["enter"]),
        innerHTML: c.value
      }, null, 40, q1),
      l("div", {
        ref_key: "imageRef",
        ref: f,
        class: "image-preview-box"
      }, [
        (v(!0), b(Q, null, le(y(u), (E, R) => (v(), b("div", {
          key: R,
          class: "image-preview"
        }, [
          l("img", {
            src: E,
            alt: ""
          }, null, 8, W1),
          l("div", {
            class: "clean-btn",
            onClick: (j) => M(R)
          }, J1, 8, Z1)
        ]))), 128))
      ], 512)
    ], 2));
  }
});
const X1 = /* @__PURE__ */ N(G1, [["__scopeId", "data-v-acb5bb3a"]]), wt = X(X1);
const Q1 = { class: "u-fold" }, en = { class: "action-box select-none" }, tn = /* @__PURE__ */ U({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const o = e;
    Be((i) => ({
      "2a7aa7a8": n.value
    }));
    const n = Z(() => {
      let i = Math.trunc(Number(o.line));
      return i > 0 ? i : 1;
    }), t = z(!0), a = z(!1), s = z();
    let c;
    return ge(() => {
      c = new ResizeObserver((i) => {
        t.value && s.value && (a.value = s.value.offsetHeight < s.value.scrollHeight);
      }), c.observe(s.value);
    }), Ae(() => {
      c.disconnect();
    }), (i, m) => (v(), b("div", Q1, [
      l("div", {
        class: K(["txt-box", { "over-hidden": t.value }])
      }, [
        l("div", {
          ref_key: "divBox",
          ref: s
        }, [
          ue(i.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      l("div", en, [
        a.value && i.unfold ? (v(), b("div", {
          key: 0,
          class: "expand-btn",
          onClick: m[0] || (m[0] = (f) => t.value = !t.value)
        }, q(t.value ? "展开" : "收起"), 1)) : Y("", !0)
      ])
    ]));
  }
});
const nn = /* @__PURE__ */ N(tn, [["__scopeId", "data-v-1694aa13"]]), $t = X(nn), on = /* @__PURE__ */ U({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = se({
      type: "",
      email: "",
      password: ""
    }), s = (_, g, A) => {
      const h = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!g)
        return A("请输入邮箱!");
      h.test(g) || A("邮箱地址不合法"), A();
    }, c = (_, g, A) => {
      g ? g != a.password ? A("输入密码不一致") : A() : A("请确认密码");
    }, i = z(), m = z(), f = se({
      email: {
        required: !0,
        validator: s,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), u = se({
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
    }), r = se({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    pe(
      () => t.modelValue,
      (_) => {
        switch (we(() => p()), _) {
          case "login":
            m.value = f, r.type = "登录", r.one = { key: "register", value: "邮箱注册" }, r.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            m.value = f, r.type = "注册", r.one = { key: "login", value: "邮箱登录" }, r.two = { key: "", value: "" };
            break;
          case "forget":
            m.value = u, r.type = "修改密码", r.one = { key: "login", value: "邮箱登录" }, r.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function d() {
      a.type = t.modelValue, i.value.validate((_) => {
        _ && n("submit", a);
      });
    }
    function p() {
      i.value.resetFields();
    }
    return o({
      reset: p
    }), (_, g) => {
      const A = ae("el-button");
      return v(), J(y(Ht), {
        ref_key: "ruleFormRef",
        ref: i,
        model: a,
        rules: m.value,
        class: "select-none"
      }, {
        default: S(() => [
          k(y(Me), { prop: "email" }, {
            default: S(() => [
              k(y(Ve), {
                modelValue: a.email,
                "onUpdate:modelValue": g[0] || (g[0] = (h) => a.email = h),
                placeholder: "请输入邮箱",
                onFocus: g[1] || (g[1] = (h) => _.$emit("toggle", 1)),
                onBlur: g[2] || (g[2] = (h) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          k(y(Me), { prop: "password" }, {
            default: S(() => [
              k(y(Ve), {
                modelValue: a.password,
                "onUpdate:modelValue": g[3] || (g[3] = (h) => a.password = h),
                placeholder: "请输入密码",
                onFocus: g[4] || (g[4] = (h) => _.$emit("toggle", 2)),
                onBlur: g[5] || (g[5] = (h) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          fe(k(y(Me), { prop: "checkPass" }, {
            default: S(() => [
              k(y(Ve), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": g[6] || (g[6] = (h) => a.checkPass = h),
                placeholder: "请确认密码",
                onFocus: g[7] || (g[7] = (h) => _.$emit("toggle", 2)),
                onBlur: g[8] || (g[8] = (h) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Le, _.modelValue == "forget"]
          ]),
          k(y(Me), null, {
            default: S(() => [
              k(A, {
                style: { width: "100%" },
                type: "primary",
                onClick: d
              }, {
                default: S(() => [
                  re(q(r.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          k(y(Me), null, {
            default: S(() => [
              l("div", {
                onClick: g[9] || (g[9] = (h) => _.$emit("update:modelValue", r.one.key))
              }, q(r.one.value), 1),
              l("div", {
                onClick: g[10] || (g[10] = (h) => _.$emit("update:modelValue", r.two.key))
              }, q(r.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const sn = /* @__PURE__ */ N(on, [["__scopeId", "data-v-525985f8"]]), an = { class: "u-sign" }, ln = { class: "sign-oauth" }, rn = /* @__PURE__ */ U({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = z(!1), t = z("login"), a = z(0), s = Z(() => {
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
      const m = ae("u-divider"), f = ae("u-icon"), u = ae("u-dialog");
      return v(), b("div", an, [
        k(y(Ze), {
          link: "",
          onClick: i[0] || (i[0] = (r) => n.value = !0)
        }, {
          default: S(() => [
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
          default: S(() => [
            k(sn, {
              modelValue: t.value,
              "onUpdate:modelValue": i[1] || (i[1] = (r) => t.value = r),
              onToggle: i[2] || (i[2] = (r) => a.value = r),
              onSubmit: i[3] || (i[3] = (r) => c.$emit("submit", r))
            }, null, 8, ["modelValue"]),
            k(m, null, {
              default: S(() => [
                re("其他方式登录")
              ]),
              _: 1
            }),
            l("div", ln, [
              k(f, { name: "QQ" }),
              k(f, { name: "weixin" }),
              k(f, { name: "gitee" }),
              k(f, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const cn = /* @__PURE__ */ N(rn, [["__scopeId", "data-v-8e737450"]]), un = X(cn), dn = (e) => (ee("data-v-3a07e116"), e = e(), te(), e), pn = { class: "custom-contextmenu__menu" }, hn = ["onClick"], fn = /* @__PURE__ */ dn(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), vn = /* @__PURE__ */ U({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = se({
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
    }), a = (f) => {
      t.tag = f, t.dropdownList[1].show = !f.meta.isAffix, s(), setTimeout(() => {
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
    const { isShow: c, dropdownList: i, tag: m } = qe(t);
    return o({
      openContextmenu: a
    }), (f, u) => {
      const r = ae("u-icon");
      return v(), J(Pe, { name: "el-zoom-in-center" }, {
        default: S(() => [
          fe(l("div", {
            style: Se(`top: ${f.dropdown.y + 5}px; left: ${f.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            l("ul", pn, [
              (v(!0), b(Q, null, le(y(i), (d, p) => (v(), b(Q, { key: p }, [
                d.show ? (v(), b("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (_) => f.$emit("submit", p, y(m))
                }, [
                  k(r, {
                    innerHTML: d.icon
                  }, null, 8, ["innerHTML"]),
                  l("span", null, q(d.title), 1)
                ], 8, hn)) : Y("", !0)
              ], 64))), 128))
            ]),
            fn
          ], 4), [
            [Le, y(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const mn = /* @__PURE__ */ N(vn, [["__scopeId", "data-v-3a07e116"]]), _n = (e) => (ee("data-v-f7d57bb4"), e = e(), te(), e), gn = { class: "u-tabs" }, yn = ["onClick", "onContextmenu"], wn = { class: "select-none" }, $n = /* @__PURE__ */ _n(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), bn = /* @__PURE__ */ U({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: o }) {
    const n = e, t = z(), a = z(), s = it(n, "modelValue"), c = z(0), i = se({
      x: 0,
      y: 0
    });
    pe(
      () => [...s.value],
      (d, p) => {
        if (p) {
          if (console.log(d, p), d.length > p.length) {
            let _ = d.find((g) => !(p != null && p.includes(g)));
            s.value.forEach((g, A, h) => {
              h.findIndex((F) => F.path == g.path) != A && h.splice(A, 1);
            }), c.value = s.value.findIndex((g) => g.path == (_ == null ? void 0 : _.path));
          }
        } else {
          let _ = 1;
          s.value.forEach((g, A, h) => {
            h.findIndex((F) => F.path == g.path) != A && (h.splice(A, 1), c.value = h.findIndex((F) => F.path == g.path), _ = 0);
          }), _ && (c.value = s.value.length - 1);
        }
        we(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), pe(
      () => c.value,
      (d) => {
        o(
          "select",
          s.value.find((p, _) => _ == d)
        );
      }
    );
    const m = (d) => {
      s.value.map((p, _) => {
        if (!p.meta.isAffix && d == _)
          if (s.value.splice(_, 1), _ == c.value) {
            let A = [_, _ - 1].filter((h) => h >= 0 && h < s.value.length);
            c.value = A[0], c.value == _ && o(
              "select",
              s.value.find((h, F) => F == d)
            );
          } else
            d < c.value && (c.value -= 1);
      });
    }, f = (d) => {
      let p = s.value.filter((g) => g.meta.isAffix);
      d && !d.meta.isAffix && p.push(d), s.value.length = 0, s.value.push(...p);
      let _ = s.value.length - 1;
      c.value = _ >= 0 ? _ : 0;
    }, u = (d, p) => {
      switch (d) {
        case 0:
          o("refresh", p);
          break;
        case 1:
          let _ = s.value.findIndex((g) => g.path == p.path);
          m(_), o("close", p);
          break;
        case 2:
          f(p), o("closeOther", p);
          break;
        case 3:
          f(), o("closeAll");
          break;
        case 4:
          o("fullScreen", p);
          break;
      }
    }, r = (d, p) => {
      const { clientX: _, clientY: g } = p;
      i.x = _, i.y = g, a.value.openContextmenu(d);
    };
    return (d, p) => {
      const _ = ae("u-icon");
      return v(), b("div", gn, [
        k(y(Ke), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: S(() => [
            l("ul", {
              class: K([{ "classic-style": d.classic }, "u-tabs-ul"])
            }, [
              (v(!0), b(Q, null, le(d.modelValue, (g, A) => (v(), b("li", {
                key: A,
                class: K([{ "is-active": c.value == A }, "u-tabs-ul-li"]),
                onClick: (h) => c.value = A,
                onContextmenu: st((h) => r(g, h), ["prevent"])
              }, [
                l("span", wn, q(g.meta.title), 1),
                g.meta.isAffix ? Y("", !0) : (v(), J(_, {
                  key: 0,
                  onClick: st((h) => u(1, g), ["stop"])
                }, {
                  default: S(() => [
                    $n
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, yn))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        k(mn, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: i,
          onSubmit: u
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const xn = /* @__PURE__ */ N(bn, [["__scopeId", "data-v-f7d57bb4"]]), Cn = X(xn), kn = { key: 0 }, Mn = /* @__PURE__ */ U({
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
    const o = e, n = se({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = z({}), a = z({}), s = Z(() => o.delay > 2e3 ? o.delay : 2e3), c = () => {
      we(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), i(), setTimeout(() => {
          m();
        }, o.delay);
      });
    }, i = () => {
      n.oneTime = n.textWidth / o.spped, n.twoTime = (n.textWidth + n.boxWidth) / o.spped;
    }, m = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, f = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          m();
        },
        !1
      );
    };
    return ge(() => {
      o.vertical || (c(), f());
    }), (u, r) => {
      const d = ae("el-carousel-item"), p = ae("u-icon");
      return v(), b("div", {
        class: "u-notice-bar",
        style: Se({ background: u.background, height: `${u.height}px` })
      }, [
        u.vertical ? (v(), b("div", kn, [
          k(y(Vt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: s.value
          }, {
            default: S(() => [
              (v(!0), b(Q, null, le(u.data, (_) => (v(), J(d, { key: _ }, {
                default: S(() => [
                  re(q(_), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (v(), b("div", {
          key: 1,
          style: Se({ color: u.color, fontSize: `${u.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          u.prefixIcon ? (v(), J(p, {
            key: 0,
            name: u.prefixIcon
          }, null, 8, ["name"])) : Y("", !0),
          l("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            l("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, q(u.data), 513)
          ], 512),
          u.suffixIcon ? (v(), J(p, {
            key: 1,
            name: u.suffixIcon
          }, null, 8, ["name"])) : Y("", !0)
        ], 4))
      ], 4);
    };
  }
});
const zn = /* @__PURE__ */ N(Mn, [["__scopeId", "data-v-723bc558"]]), Sn = X(zn), Ln = (e) => (ee("data-v-11b4e56c"), e = e(), te(), e), Fn = { class: "u-anchor" }, Tn = { class: "toc-content" }, In = /* @__PURE__ */ Ln(() => /* @__PURE__ */ l("h3", { class: "toc-content-heading" }, "目录", -1)), Hn = { class: "toc-items" }, Vn = ["onClick"], An = /* @__PURE__ */ U({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const o = e, n = z(0), t = z({}), a = z({}), s = (f) => {
      switch (f) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, c = () => {
      const f = [];
      t.value.forEach((d) => {
        f.push(d.offsetTop);
      });
      const r = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      f.forEach((d, p) => {
        r >= d - 10 - o.targetOffset && (n.value = p);
      });
    }, i = (f) => {
      const u = t.value.item(f);
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
    let m;
    return ge(() => {
      let f = document.querySelector(o.container);
      m = new ResizeObserver((u) => {
        o.scroll ? a.value = document.querySelector(o.scroll) : a.value = window, t.value = f.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), m.observe(f);
    }), Ae(() => {
      a.value.removeEventListener("scroll", c), m.disconnect();
    }), (f, u) => {
      const r = ae("u-divider");
      return v(), b("div", Fn, [
        l("nav", Tn, [
          In,
          k(r),
          l("ul", Hn, [
            (v(!0), b(Q, null, le(t.value, (d, p) => (v(), b("li", {
              key: p,
              class: K([{ active: n.value == p }, s(d.nodeName)]),
              onClick: (_) => i(p)
            }, q(d.innerText), 11, Vn))), 128))
          ])
        ])
      ]);
    };
  }
});
const Bn = /* @__PURE__ */ N(An, [["__scopeId", "data-v-11b4e56c"]]), En = X(Bn), Fe = (e) => (ee("data-v-c739035a"), e = e(), te(), e), Dn = { class: "card-box u-scrollbar" }, jn = {
  key: 0,
  class: "history"
}, On = { class: "header" }, Un = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("div", { class: "title" }, "历史搜索", -1)), Rn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), Yn = {
  key: 1,
  class: "trending"
}, Nn = { class: "title" }, Pn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("span", null, "热搜", -1)), qn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("svg", {
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
], -1)), Wn = { class: "hot-list" }, Zn = ["onClick"], Kn = { class: "trending-text u-ellipsis" }, Jn = /* @__PURE__ */ Fe(() => /* @__PURE__ */ l("div", { class: "trending-mark" }, null, -1)), Gn = /* @__PURE__ */ U({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: o }) {
    const n = e, t = Z(() => !(_e(n.data.historySearchList) && _e(n.data.hotSearchList)));
    return (a, s) => {
      const c = ae("u-icon");
      return fe((v(), b("div", Dn, [
        a.data.historySearchList.length != 0 ? (v(), b("div", jn, [
          l("div", On, [
            Un,
            k(y(ct), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: s[0] || (s[0] = (i) => a.$emit("onClear"))
            }, {
              default: S(() => [
                k(c, null, {
                  default: S(() => [
                    Rn
                  ]),
                  _: 1
                }),
                re(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (v(!0), b(Q, null, le(a.data.historySearchList, (i, m) => (v(), J(y(At), {
            key: m,
            type: i.type,
            closable: "",
            onClose: (f) => a.$emit("onClose", i.name),
            onClick: (f) => a.$emit("submit", i.name)
          }, {
            default: S(() => [
              re(q(i.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : Y("", !0),
        y(_e)(a.data.hotSearchList) ? Y("", !0) : (v(), b("div", Yn, [
          l("div", Nn, [
            Pn,
            k(c, { style: { margin: "0 6px" } }, {
              default: S(() => [
                qn
              ]),
              _: 1
            })
          ]),
          l("div", Wn, [
            (v(!0), b(Q, null, le(a.data.hotSearchList, (i, m) => (v(), b("div", {
              key: m,
              class: "hot-item",
              onClick: (f) => a.$emit("submit", i)
            }, [
              l("div", {
                class: K(["trending-rank", { "trending-rank-top": m < 3 }])
              }, q(m + 1), 3),
              l("div", Kn, q(i), 1),
              Jn
            ], 8, Zn))), 128))
          ])
        ]))
      ], 512)), [
        [Le, a.data.visible && t.value]
      ]);
    };
  }
});
const Xn = /* @__PURE__ */ N(Gn, [["__scopeId", "data-v-c739035a"]]), nt = (e) => (ee("data-v-df2be5d9"), e = e(), te(), e), Qn = { class: "u-search" }, e2 = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, t2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
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
], -1)), n2 = ["data-before", "data-after"], o2 = ["placeholder"], s2 = { class: "btn" }, a2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
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
], -1)), l2 = /* @__PURE__ */ nt(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ l("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), i2 = /* @__PURE__ */ U({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = z({}), s = it(t.config, "keywords"), c = z(!1), i = z(0), m = z(!0), f = z(), u = se({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), r = se({
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
    const d = Z(() => {
      let M = s.value[i.value];
      return c.value || r.search ? "" : M;
    }), p = Z(() => {
      let M = typeof s.value[i.value + 1] > "u" ? s.value[0] : s.value[i.value + 1];
      return c.value || r.search ? "" : M;
    }), _ = Z(() => {
      let M = s.value[i.value];
      return c.value ? M : "";
    }), g = Z(() => !c.value && !r.search && m.value), A = (M) => {
      if (M != null && M.trim() != "") {
        let w = (E, R) => Math.round(Math.random() * (R - E)) + E, T = (E) => r.historySearchList.filter((R) => R.name == E).length != 0;
        if (M && r.historySearchList)
          T(M) || r.historySearchList.unshift({ name: M, type: u.types[w(0, 3)] });
        else {
          let E = c.value ? _ : d;
          M = E.value, T(E.value) || r.historySearchList.unshift({ name: E.value, type: u.types[w(0, 3)] });
        }
        He.set("searchHistory", r.historySearchList);
      }
      r.search = M, a.value.focus(), n("submit", M);
    }, h = (M) => {
      r.historySearchList.findIndex((w) => w.name == M), r.historySearchList.splice(
        r.historySearchList.findIndex((w) => w.name == M),
        1
      ), He.set("searchHistory", r.historySearchList);
    }, F = () => {
      r.historySearchList.length = 0, He.remove("searchHistory");
    }, D = (M) => {
      if (M.pseudoElement == "::after") {
        m.value = !1;
        let w = typeof s.value[i.value + 1] > "u" ? 0 : i.value + 1;
        i.value = w, setTimeout(() => {
          m.value = !0;
        }, 3e3);
      }
    };
    return o({
      close: () => r.visible = !1
    }), (M, w) => {
      const T = ae("u-icon");
      return v(), b("div", Qn, [
        l("div", {
          class: K(["search", { active: c.value }])
        }, [
          l("div", e2, [
            k(T, null, {
              default: S(() => [
                t2
              ]),
              _: 1
            })
          ]),
          l("label", {
            ref_key: "labelRef",
            ref: f,
            "data-before": d.value,
            "data-after": p.value,
            class: K({ animate: g.value }),
            onAnimationend: D
          }, [
            fe(l("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": w[0] || (w[0] = (E) => r.search = E),
              type: "text",
              placeholder: _.value,
              onFocus: w[1] || (w[1] = () => {
                c.value = !0, r.visible = !0;
              }),
              onBlur: w[2] || (w[2] = (E) => c.value = !1),
              onKeyup: w[3] || (w[3] = We((E) => A(r.search), ["enter"]))
            }, null, 40, o2), [
              [Lt, r.search]
            ])
          ], 42, n2),
          l("div", s2, [
            fe(k(T, {
              class: "close",
              onClick: w[4] || (w[4] = (E) => r.search = "")
            }, {
              default: S(() => [
                a2
              ]),
              _: 1
            }, 512), [
              [Le, r.search]
            ]),
            l("div", {
              class: "search-btn",
              onClick: w[5] || (w[5] = (E) => A(r.search))
            }, [
              k(T, null, {
                default: S(() => [
                  l2
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        fe(k(Xn, {
          data: r,
          onOnClose: h,
          onOnClear: F,
          onSubmit: A
        }, null, 8, ["data"]), [
          [y(rt), () => r.visible = !1, f.value]
        ])
      ]);
    };
  }
});
const r2 = /* @__PURE__ */ N(i2, [["__scopeId", "data-v-df2be5d9"]]), c2 = X(r2), bt = (e, o) => {
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
}, u2 = (e) => {
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
}, Qo = (e, o, n) => {
  let t = (e - 1) * o;
  return t + o >= n.length ? n.slice(t, n.length) : n.slice(t, t + o);
}, xt = (e) => (ee("data-v-f75472b5"), e = e(), te(), e), d2 = { class: "message" }, p2 = { class: "chat-list" }, h2 = /* @__PURE__ */ xt(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), f2 = { class: "content" }, v2 = {
  key: 0,
  class: "username"
}, m2 = ["innerHTML"], _2 = /* @__PURE__ */ xt(() => /* @__PURE__ */ l("div", { class: "date" }, null, -1)), g2 = /* @__PURE__ */ U({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: o }) {
    const { allEmoji: n } = ce(Te), t = z();
    return o({
      scroll: () => {
        we(() => {
          const s = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(s.offsetTop);
        });
      }
    }), (s, c) => (v(), b("div", d2, [
      k(y(Ke), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: S(() => [
          l("div", p2, [
            (v(!0), b(Q, null, le(s.data, (i, m) => (v(), b("div", {
              key: m,
              class: K([{ self: s.userId == i.id }, "chat-item"])
            }, [
              l("div", null, [
                k(y(Je), null, {
                  default: S(() => [
                    h2
                  ]),
                  _: 1
                })
              ]),
              l("div", f2, [
                s.userId != i.id ? (v(), b("div", v2, q(i.username), 1)) : Y("", !0),
                l("div", {
                  class: "card-box",
                  innerHTML: y(bt)(y(n), i.content)
                }, null, 8, m2)
              ]),
              _2
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const y2 = /* @__PURE__ */ N(g2, [["__scopeId", "data-v-f75472b5"]]), je = (e) => (ee("data-v-18726a6b"), e = e(), te(), e), w2 = { class: "u-chat" }, $2 = { class: "header" }, b2 = /* @__PURE__ */ je(() => /* @__PURE__ */ l("svg", {
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
], -1)), x2 = /* @__PURE__ */ je(() => /* @__PURE__ */ l("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ l("div", null, "聊天室"),
  /* @__PURE__ */ l("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), C2 = {
  id: "chat-footer",
  class: "footer"
}, k2 = /* @__PURE__ */ je(() => /* @__PURE__ */ l("svg", {
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
], -1)), M2 = /* @__PURE__ */ je(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ l("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), z2 = /* @__PURE__ */ U({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = e, t = z(!1), a = z(""), s = z(), c = (u) => {
      const { ctrlKey: r, key: d } = u;
      r && d == "Enter" && m();
    }, i = () => {
      a.value = "", s.value.scroll();
    }, m = () => {
      let u = a.value;
      u.trim() ? (u = u.replace(/\n/g, "<br/>"), o("submit", { clear: i, content: u })) : tt({ type: "error", message: "内容不能为空" });
    }, f = (u) => {
      let r = document.getElementById("emojiInput"), d = r.selectionStart, p = r.selectionEnd, _ = r.value;
      if (d === null || p === null)
        return;
      let g = _.substring(0, d) + u + _.substring(p);
      r.value = g, r.focus(), r.selectionStart = d + u.length, r.selectionEnd = d + u.length, a.value = g;
    };
    return be(Te, n.emoji), (u, r) => {
      const d = ae("u-icon"), p = ae("u-emoji");
      return v(), b("div", w2, [
        l("div", {
          class: K([{ active: t.value }, "chat-container translate"])
        }, [
          l("div", $2, [
            k(d, { size: "32" }, {
              default: S(() => [
                b2
              ]),
              _: 1
            }),
            x2
          ]),
          k(y2, {
            ref_key: "messageRef",
            ref: s,
            data: u.data,
            "user-id": u.userId
          }, null, 8, ["data", "user-id"]),
          l("div", C2, [
            k(y(Ve), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": r[0] || (r[0] = (_) => a.value = _),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: We(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            k(p, {
              style: { margin: "0 8px 0" },
              emoji: u.emoji,
              placement: "top-end",
              onAddEmoji: f
            }, {
              default: S(() => [
                k2
              ]),
              _: 1
            }, 8, ["emoji"]),
            k(d, {
              size: "18",
              class: K([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: m
            }, {
              default: S(() => [
                M2
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        k(y(Ze), {
          class: "chat-btn",
          onClick: r[1] || (r[1] = (_) => t.value = !t.value)
        }, {
          default: S(() => [
            re("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const S2 = /* @__PURE__ */ N(z2, [["__scopeId", "data-v-18726a6b"]]), L2 = X(S2), Ct = (e) => (ee("data-v-85c87038"), e = e(), te(), e), F2 = { class: "u-emoji" }, T2 = { class: "face-tooltip-head select-none" }, I2 = ["onClick"], H2 = ["src"], V2 = { class: "emoji-body select-none" }, A2 = { style: { padding: "0 5px" } }, B2 = ["onClick"], E2 = { class: "emoji-btn select-none" }, D2 = { key: 0 }, j2 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ l("svg", {
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
], -1)), O2 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ l("span", null, "表情", -1)), U2 = [
  j2,
  O2
], R2 = /* @__PURE__ */ U({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: o }) {
    const n = e, t = z(0), a = z(0), s = z(new Array(2)), { emojiList: c, faceList: i } = n.emoji;
    function m(u) {
      switch (t.value = u, u) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, s.value[1] = c[1];
          break;
      }
    }
    function f() {
      s.value[0] = c[0];
    }
    return (u, r) => (v(), b("div", F2, [
      k(y(ut), {
        placement: u.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: f
      }, {
        reference: S(() => [
          l("div", E2, [
            u.$slots.default ? ue(u.$slots, "default", { key: 1 }, void 0, !0) : (v(), b("div", D2, U2))
          ])
        ]),
        default: S(() => [
          l("div", T2, [
            (v(!0), b(Q, null, le(y(i), (d, p) => (v(), b("label", {
              key: p,
              class: K(t.value == p ? "active" : ""),
              onClick: (_) => m(p)
            }, [
              l("img", {
                src: d,
                alt: ""
              }, null, 8, H2)
            ], 10, I2))), 128))
          ]),
          l("div", V2, [
            l("div", {
              class: "emjio-container",
              style: Se({ transform: `translateX(${a.value}%)` })
            }, [
              (v(!0), b(Q, null, le(s.value, (d, p) => (v(), b("div", {
                key: p,
                class: "emoji-wrapper"
              }, [
                k(y(Ke), null, {
                  default: S(() => [
                    l("div", A2, [
                      (v(!0), b(Q, null, le(d, (_, g) => (v(), b("span", {
                        key: g,
                        class: "emoji-item",
                        onClick: (A) => u.$emit("addEmoji", g)
                      }, [
                        k(y(dt), {
                          src: _,
                          title: String(g),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, B2))), 128))
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
const Y2 = /* @__PURE__ */ N(R2, [["__scopeId", "data-v-85c87038"]]), Te = Symbol(), kt = X(Y2), N2 = /* @__PURE__ */ U({
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
    const n = e, t = se({
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
    }), a = () => n.endAmount > n.startAmount, s = Z(() => {
      const u = /(\d+)(\d{3})/;
      let r = t.currentAmount.toFixed(n.decimals);
      r += "";
      let d = r.split("."), p = d[0], _ = d.length > 1 ? n.decimalSeparator + d[1] : "", g = !isNaN(parseFloat(n.separator));
      if (n.separator && !g)
        for (; u.test(p); )
          p = p.replace(u, "$1" + n.separator + "$2");
      return p + _;
    }), c = Z(() => `${n.prefix}${s.value}${n.suffix}`);
    ge(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? i() : t.paused = !0;
    });
    const i = () => {
      m(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(f);
    }, m = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, f = (u) => {
      t.timestamp = u, t.startTimestamp || (t.startTimestamp = u);
      let r = u - t.startTimestamp;
      t.remaining = t.currentDuration - r, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (r / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (r / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), r < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(f) : o("finished");
    };
    return (u, r) => (v(), b("span", null, q(c.value), 1));
  }
}), P2 = X(N2), lt = /* @__PURE__ */ U({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const o = z({}), { showInfo: n } = ce(Qe), t = ce(De), a = () => ze("div", t.card(o.value));
    return (s, c) => y(t).card ? (v(), J(y(ut), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => y(n)(s.uid, (i) => o.value = i))
    }, {
      reference: S(() => [
        ue(s.$slots, "default")
      ]),
      default: S(() => [
        k(a)
      ]),
      _: 3
    })) : ue(s.$slots, "default", { key: 1 });
  }
}), Oe = (e) => (ee("data-v-961bcd31"), e = e(), te(), e), q2 = { class: "comment-sub" }, W2 = ["href", "target"], Z2 = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), K2 = { class: "comment-primary" }, J2 = { class: "comment-main" }, G2 = {
  key: 1,
  class: "user-info"
}, X2 = ["href", "target"], Q2 = { class: "username" }, eo = {
  class: "name",
  style: { "max-width": "10em" }
}, to = {
  blank: "true",
  class: "rank"
}, no = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, oo = { class: "time" }, so = { class: "content" }, ao = ["innerHTML"], lo = {
  class: "imgbox",
  style: { display: "flex" }
}, io = { class: "action-box select-none" }, ro = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
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
], -1)), co = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ l("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), uo = { key: 2 }, po = /* @__PURE__ */ Oe(() => /* @__PURE__ */ l("svg", {
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
], -1)), ho = { key: 2 }, fo = /* @__PURE__ */ U({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = se({
      active: !1
    }), t = z(), a = z(), s = Z(() => {
      let h = o.data.contentImg;
      return _e(h) ? [] : h == null ? void 0 : h.split("||");
    }), { allEmoji: c } = ce(Te), { like: i, user: m, relativeTime: f, aTarget: u } = ce(Qe);
    function r() {
      n.active = !n.active, n.active && we(() => {
        var h;
        (h = t.value) == null || h.focus();
      });
    }
    function d(h) {
      var D;
      const F = h.target;
      (D = a.value) != null && D.contains(F) || (n.active = !1);
    }
    const p = ce(De), _ = () => ze("div", p.info(o.data)), g = () => ze("div", p.operate(o.data)), A = Z(() => bt(c, o.data.content));
    return (h, F) => (v(), b("div", {
      class: K(["comment", { reply: o.reply }])
    }, [
      l("div", q2, [
        k(lt, {
          uid: y(ye)(h.data.uid)
        }, {
          default: S(() => [
            l("a", {
              href: h.data.user.homeLink,
              target: y(u),
              class: "no-underline",
              style: { display: "block" }
            }, [
              k(y(Je), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: h.data.user.avatar
              }, {
                default: S(() => [
                  Z2
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, W2)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      l("div", K2, [
        l("div", J2, [
          y(p).info ? (v(), J(_, { key: 0 })) : (v(), b("div", G2, [
            k(lt, {
              uid: y(ye)(h.data.uid)
            }, {
              default: S(() => [
                l("a", {
                  href: h.data.user.homeLink,
                  target: y(u),
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  l("div", Q2, [
                    l("span", eo, q(h.data.user.username), 1),
                    l("span", to, [
                      k(y(xe), {
                        size: "24",
                        innerHTML: y(u2)(h.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, X2)
              ]),
              _: 1
            }, 8, ["uid"]),
            l("span", no, "  " + q(h.data.address), 1),
            l("time", oo, q(y(f) ? y(Xe)(h.data.createTime).fromNow() : h.data.createTime), 1)
          ])),
          l("div", so, [
            k(y($t), { unfold: "" }, {
              default: S(() => [
                l("div", { innerHTML: A.value }, null, 8, ao),
                l("div", lo, [
                  (v(!0), b(Q, null, le(s.value, (D, M) => (v(), J(y(dt), {
                    key: M,
                    src: D,
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
          l("div", io, [
            l("div", {
              class: "item",
              onClick: F[0] || (F[0] = (D) => y(i)(y(ye)(h.data.id)))
            }, [
              y(m).likeIds.map(String).indexOf(y(ye)(h.data.id)) == -1 ? (v(), J(y(xe), { key: 0 }, {
                default: S(() => [
                  ro
                ]),
                _: 1
              })) : (v(), J(y(xe), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: S(() => [
                  co
                ]),
                _: 1
              })),
              h.data.likes != 0 ? (v(), b("span", uo, q(h.data.likes), 1)) : Y("", !0)
            ]),
            l("div", {
              ref_key: "btnRef",
              ref: a,
              class: K(["item", { active: n.active }]),
              onClick: r
            }, [
              k(y(xe), null, {
                default: S(() => [
                  po
                ]),
                _: 1
              }),
              l("span", null, q(n.active ? "取消回复" : "回复"), 1)
            ], 2),
            y(p).operate ? (v(), J(g, { key: 0 })) : Y("", !0)
          ]),
          n.active ? (v(), b("div", ho, [
            k(gt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": y(ye)(h.id),
              placeholder: `回复 @${h.data.user.username}...`,
              reply: h.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: d,
              onClose: F[1] || (F[1] = (D) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : Y("", !0)
        ]),
        ue(h.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const Mt = /* @__PURE__ */ N(fo, [["__scopeId", "data-v-961bcd31"]]), vo = (e) => (ee("data-v-d1e7932a"), e = e(), te(), e), mo = {
  key: 0,
  class: "reply-box"
}, _o = { class: "reply-list" }, go = {
  key: 0,
  class: "fetch-more"
}, yo = { key: 0 }, wo = { key: 1 }, $o = { key: 0 }, bo = /* @__PURE__ */ vo(() => /* @__PURE__ */ l("svg", {
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
], -1)), xo = {
  key: 1,
  class: "fetch-more"
}, Co = /* @__PURE__ */ U({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = se({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: s } = ce(Ne), { page: c } = ce(Ne), i = Z(() => {
      let d = {
        total: 0,
        length: 0,
        list: []
      };
      if (o.data) {
        let p = o.data.list.length;
        d = {
          total: o.data.total,
          length: p,
          list: o.data.list
        };
      }
      if (!n.over) {
        let p = d.list.slice(0, a);
        d.list = p;
      }
      return c && (d.list = d.list.slice(0, 5)), d;
    }), m = () => {
      n.over = !0;
    }, f = (d) => {
      s.value.forEach((p) => {
        p.id == o.id && p.reply && (p.reply = d);
      });
    }, u = (d) => {
      n.pageNum = d, t(o.id, d, n.pageSize, (p) => f(p));
    }, r = (d) => {
      n.pageSize = d, t(o.id, n.pageNum, d, (p) => f(p));
    };
    return (d, p) => i.value.length > 0 ? (v(), b("div", mo, [
      l("div", _o, [
        (v(!0), b(Q, null, le(i.value.list, (_, g) => (v(), J(Mt, {
          id: d.id,
          key: g,
          data: _,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        i.value.length > y(a) ? (v(), b("div", go, [
          n.loading ? (v(), b("span", yo, "加载中...")) : (v(), b("div", wo, [
            n.over ? Y("", !0) : (v(), b("div", $o, [
              re(" 共" + q(i.value.total) + "条回复, ", 1),
              l("span", {
                class: "fetch-more-comment select-none",
                onClick: m
              }, [
                re(" 点击查看 "),
                bo
              ])
            ]))
          ]))
        ])) : Y("", !0),
        n.over && y(c) ? (v(), b("div", xo, [
          k(y(Bt), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: i.value.total,
            "page-size": n.pageSize,
            onCurrentChange: u,
            onSizeChange: r
          }, null, 8, ["total", "page-size"])
        ])) : Y("", !0)
      ])
    ])) : Y("", !0);
  }
});
const ko = /* @__PURE__ */ N(Co, [["__scopeId", "data-v-d1e7932a"]]), Mo = {
  key: 0,
  class: "comment-list"
}, zo = /* @__PURE__ */ U({
  __name: "comment-list",
  props: {
    data: {},
    total: {},
    showSize: {}
  },
  setup(e) {
    return (o, n) => o.data ? (v(), b("div", Mo, [
      (v(!0), b(Q, null, le(o.data, (t, a) => (v(), J(Mt, {
        id: y(ye)(t.id),
        key: a,
        data: t
      }, {
        default: S(() => [
          k(ko, {
            id: y(ye)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : Y("", !0);
  }
});
const ot = (e) => (ee("data-v-885b66ac"), e = e(), te(), e), So = { class: "u-comment" }, Lo = { class: "comment-form" }, Fo = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("div", { class: "header" }, [
  /* @__PURE__ */ l("span", { class: "header-title" }, "评论")
], -1)), To = { class: "content" }, Io = { class: "avatar-box" }, Ho = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Vo = { class: "comment-list-wrapper" }, Ao = /* @__PURE__ */ ot(() => /* @__PURE__ */ l("div", { class: "title" }, "全部评论", -1)), Bo = /* @__PURE__ */ U({
  name: "UComment",
  __name: "comment",
  props: {
    config: {},
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 },
    relativeTime: { type: Boolean }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "focus"],
  setup(e, { expose: o, emit: n }) {
    const t = e, { user: a, comments: s, showSize: c, replyShowSize: i, total: m, aTarget: f } = qe(t.config), u = ({ content: h, parentId: F, reply: D, files: M, clear: w }) => {
      n("submit", { content: h, parentId: F, reply: D, files: M, finish: (E) => {
        if (w(), F) {
          let R = s.value.find((j) => j.id == F);
          if (R) {
            let j = R.reply;
            j ? (j.list.unshift(E), j.total++) : R.reply = {
              total: 1,
              list: [E]
            };
          }
        } else
          s.value.unshift(E);
      } });
    }, r = {
      upload: t.upload,
      submit: u,
      focus: () => n("focus")
    };
    be(mt, r);
    const d = (h, F) => {
      let D = null;
      s.value.forEach((M) => {
        var w;
        M.id == h ? D = M : D = (w = M.reply) == null ? void 0 : w.list.find((T) => T.id == h), D && (D.likes += F);
      });
    }, _ = {
      user: a,
      like: (h) => {
        const F = t.config.user.likeIds;
        n("like", h, () => {
          if (F.findIndex((D) => D == h) == -1)
            F.push(h), d(h, 1);
          else {
            let D = F.findIndex((M) => M == h);
            D != -1 && (F.splice(D, 1), d(h, -1));
          }
        });
      },
      relativeTime: de(t.relativeTime, !1),
      showInfo: (h, F) => n("showInfo", h, F),
      aTarget: de(f, "_blank")
    };
    be(Qe, _);
    const g = {
      page: t.page,
      replyPage: (h, F, D, M) => {
        n("replyPage", { parentId: h, pageNum: F, pageSize: D, finish: M });
      },
      replyShowSize: de(i, 3),
      comments: s
    };
    be(Ne, g);
    const A = (h) => {
      const { parentId: F, id: D } = h;
      if (F) {
        let M = s.value.find((T) => T.id == F), w = M == null ? void 0 : M.reply;
        if (w) {
          let T = w.list.findIndex((E) => E.id == D);
          T != -1 && (w.list.splice(T, 1), w.total--);
        }
      } else {
        let M = s.value.findIndex((w) => w.id == D);
        M != -1 && s.value.splice(M, 1);
      }
    };
    return be(Te, t.config.emoji), be(De, Ft()), o({
      remove: A
    }), (h, F) => (v(), b("div", So, [
      l("div", Lo, [
        Fo,
        l("div", To, [
          l("div", Io, [
            k(y(Je), {
              size: 40,
              src: h.config.user.avatar
            }, {
              default: S(() => [
                Ho
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          k(gt, {
            placeholder: "输入评论（Enter换行，Ctrl + Enter发送）",
            "content-btn": "发表评论"
          })
        ])
      ]),
      l("div", Vo, [
        ue(h.$slots, "default", {}, () => [
          Ao
        ], !0),
        k(zo, {
          data: y(s),
          total: y(m),
          "show-size": y(de)(y(c), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])
    ]));
  }
});
const Eo = /* @__PURE__ */ N(Bo, [["__scopeId", "data-v-885b66ac"]]), Do = X(Eo), jo = [
  Do,
  u1,
  g1,
  z1,
  T1,
  wt,
  $t,
  xe,
  un,
  Cn,
  Sn,
  En,
  c2,
  L2,
  kt,
  P2
];
const Oo = (e) => {
  jo.forEach((o) => {
    e.use(o);
  });
}, e4 = {
  install: Oo
};
export {
  o4 as ElAvatar,
  s4 as ElButton,
  a4 as ElCarousel,
  l4 as ElDialog,
  i4 as ElDropdown,
  r4 as ElDropdownItem,
  c4 as ElDropdownMenu,
  u4 as ElImage,
  d4 as ElInput,
  p4 as ElLink,
  h4 as ElPagination,
  f4 as ElPopover,
  v4 as ElScrollbar,
  m4 as ElTag,
  Te as InjectionEmojiApi,
  En as UAnchor,
  L2 as UChat,
  Do as UComment,
  g1 as UCommentNav,
  u1 as UCommentScroll,
  P2 as UCounter,
  z1 as UDialog,
  T1 as UDivider,
  wt as UEditor,
  kt as UEmoji,
  $t as UFold,
  xe as UIcon,
  Sn as UNoticeBar,
  c2 as USearch,
  un as USign,
  Cn as UTags,
  tt as UToast,
  Nt as clear,
  Ye as cloneDeep,
  jt as createGlobalNode,
  Wt as createObjectURL,
  Xe as dayjs,
  Pt as debounce,
  qo as deepTree,
  e4 as default,
  Zo as flattenDeep,
  Rt as get,
  Oo as install,
  pt as isArray,
  Po as isBoolean,
  _e as isEmpty,
  Yo as isFunction,
  qt as isImage,
  de as isNull,
  Dt as isNumber,
  Et as isObject,
  No as isString,
  Yt as remove,
  Xo as removeEmptyField,
  Ot as removeGlobalNode,
  Wo as revDeepTree,
  Ut as set,
  He as storage,
  ye as str,
  Jo as throttle,
  Go as toFormData,
  Ko as useBrowser,
  bt as useEmojiParse,
  u2 as useLevel,
  Qo as usePage,
  _4 as vInfiniteScroll,
  X as withInstall
};
