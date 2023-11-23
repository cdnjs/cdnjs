import { h as Ie, render as Lt, defineComponent as N, ref as S, reactive as ue, inject as se, withDirectives as he, openBlock as v, createElementBlock as C, createVNode as M, unref as b, normalizeClass as G, Transition as Ke, withCtx as I, createElementVNode as i, createCommentVNode as Y, createBlock as X, createTextVNode as de, toDisplayString as W, nextTick as xe, pushScopeId as ie, popScopeId as re, computed as Q, renderSlot as pe, resolveComponent as ae, watch as me, createSlots as zt, useCssVars as je, normalizeStyle as ze, onMounted as ye, vShow as Me, withKeys as $e, withModifiers as ke, Fragment as ne, renderList as le, toRefs as Je, onUnmounted as De, toRef as it, vModelText as Ft, provide as _e, useSlots as It, mergeProps as Tt } from "vue";
import { ElButton as Ee, ClickOutside as rt, ElLink as ct, ElInfiniteScroll as Ht, ElDialog as At, ElScrollbar as Re, ElForm as Bt, ElFormItem as Fe, ElInput as Ve, ElCarousel as Vt, ElTag as Dt, ElAvatar as Ge, ElPopover as ut, ElImage as dt, ElPagination as Et } from "element-plus";
import { ElAvatar as f2, ElButton as v2, ElCarousel as h2, ElDialog as m2, ElDropdown as _2, ElDropdownItem as g2, ElDropdownMenu as y2, ElImage as w2, ElInput as $2, ElLink as b2, ElPagination as x2, ElPopover as C2, ElScrollbar as k2, ElTag as M2, ElInfiniteScroll as S2 } from "element-plus";
/*! UndrawUi v1.0.2 */
function pt(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Ot(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function jt(e) {
  return !isNaN(Number(e));
}
function Qs(e) {
  return typeof e == "function";
}
function e2(e) {
  return typeof e == "string";
}
function t2(e) {
  return typeof e == "boolean";
}
function be(e) {
  return pt(e) ? e.length === 0 : Ot(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const ge = (e, s) => be(e) ? s : e;
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
function n2(e, s = { parentId: "parentId", children: "children" }) {
  let n = ge(s.parentId, "parentId"), t = ge(s.children, "children");
  e = Oe(e);
  const a = [], o = {};
  return e.forEach((c) => o[c.id] = c), e.forEach((c) => {
    const r = o[c[n]];
    r ? (r[t] || (r[t] = [])).push(c) : a.push(c);
  }), a;
}
function o2(e = [], s = { parentId: "parentId", children: "children" }) {
  let n = ge(s.parentId, "parentId"), t = ge(s.children, "children");
  const a = [], o = (c, r) => {
    c.forEach((y) => {
      y.id || (y.id = r++), y[n] = r, a.push(y), y[t] && pt(y[t]) && o(y[t], y.id);
    });
  };
  return o(e || [], null), a;
}
const s2 = (e, s = 1 / 0) => e.flat(s), oe = (e, s) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(s ?? {})])
      n.component(t.name, t);
  }, s)
    for (const [n, t] of Object.entries(s))
      e[n] = t;
  return e;
};
function a2() {
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
  const y = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), m = (s.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], f = t === "pc", l = !f, d = r === "xs" || l, p = window.innerHeight + "px";
  return {
    version: m,
    type: n,
    plat: c,
    tag: t,
    prefix: o,
    isMobile: l,
    isIOS: y,
    isPC: f,
    isMini: d,
    screen: r,
    innerHeight: p
  };
}
function Rt(e, s) {
  const n = Ie(e, s), t = document.createElement("div");
  return document.body.append(t), Lt(n, t), { vnode: n, div: t };
}
function Ut(e) {
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
}, Pt = (e, s = !0) => {
  window[Ue(s)].removeItem(e);
}, qt = (e = !0) => {
  window[Ue(e)].clear();
}, Be = {
  set: Yt,
  get: Nt,
  remove: Pt,
  clear: qt
}, ft = (e, s = 200, n = !1) => {
  let t = !1, a = null;
  const o = (...c) => new Promise((r, y) => {
    if (a && clearTimeout(a), n && !t) {
      const m = e.apply(void 0, c);
      r(m), t = !0;
    } else
      a = setTimeout(() => {
        const m = e.apply(void 0, c);
        r(m), t = !1, a = null;
      }, s);
  });
  return o.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, o;
}, l2 = (e, s = 500) => {
  let n = 0;
  const t = (...a) => new Promise((o, c) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= s) {
      const y = e.apply(void 0, a);
      o(y), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, Ce = (e) => e == null ? "" : String(e);
function Wt(e) {
  let s = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return s.indexOf(t.toLowerCase()) != -1;
}
function Zt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function i2(e) {
  const s = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, o) => s.append(n + `[${o}]`, a)) : s.append(n, e[n]);
  }), s;
}
function r2(e) {
  return Object.keys(e).filter((s) => e[s] !== null && e[s] !== void 0).reduce((s, n) => ({ ...s, [n]: e[n] }), {});
}
var Xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var We = { exports: {} }, at;
function ht() {
  return at || (at = 1, function(e, s) {
    (function(n, t) {
      e.exports = t();
    })(Xe, function() {
      var n = 1e3, t = 6e4, a = 36e5, o = "millisecond", c = "second", r = "minute", y = "hour", m = "day", f = "week", l = "month", d = "quarter", p = "year", u = "date", _ = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, x = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, R = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(k) {
        var g = ["th", "st", "nd", "rd"], h = k % 100;
        return "[" + k + (g[(h - 20) % 10] || g[h] || g[0]) + "]";
      } }, K = function(k, g, h) {
        var L = String(k);
        return !L || L.length >= g ? k : "" + Array(g + 1 - L.length).join(h) + k;
      }, A = { s: K, z: function(k) {
        var g = -k.utcOffset(), h = Math.abs(g), L = Math.floor(h / 60), w = h % 60;
        return (g <= 0 ? "+" : "-") + K(L, 2, "0") + ":" + K(w, 2, "0");
      }, m: function k(g, h) {
        if (g.date() < h.date())
          return -k(h, g);
        var L = 12 * (h.year() - g.year()) + (h.month() - g.month()), w = g.clone().add(L, l), D = h - w < 0, V = g.clone().add(L + (D ? -1 : 1), l);
        return +(-(L + (h - w) / (D ? w - V : V - w)) || 0);
      }, a: function(k) {
        return k < 0 ? Math.ceil(k) || 0 : Math.floor(k);
      }, p: function(k) {
        return { M: l, y: p, w: f, d: m, D: u, h: y, m: r, s: c, ms: o, Q: d }[k] || String(k || "").toLowerCase().replace(/s$/, "");
      }, u: function(k) {
        return k === void 0;
      } }, B = "en", U = {};
      U[B] = R;
      var j = function(k) {
        return k instanceof P;
      }, ee = function k(g, h, L) {
        var w;
        if (!g)
          return B;
        if (typeof g == "string") {
          var D = g.toLowerCase();
          U[D] && (w = D), h && (U[D] = h, w = D);
          var V = g.split("-");
          if (!w && V.length > 1)
            return k(V[0]);
        } else {
          var $ = g.name;
          U[$] = g, w = $;
        }
        return !L && w && (B = w), w || !L && B;
      }, T = function(k, g) {
        if (j(k))
          return k.clone();
        var h = typeof g == "object" ? g : {};
        return h.date = k, h.args = arguments, new P(h);
      }, F = A;
      F.l = ee, F.i = j, F.w = function(k, g) {
        return T(k, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
      };
      var P = function() {
        function k(h) {
          this.$L = ee(h.locale, null, !0), this.parse(h);
        }
        var g = k.prototype;
        return g.parse = function(h) {
          this.$d = function(L) {
            var w = L.date, D = L.utc;
            if (w === null)
              return /* @__PURE__ */ new Date(NaN);
            if (F.u(w))
              return /* @__PURE__ */ new Date();
            if (w instanceof Date)
              return new Date(w);
            if (typeof w == "string" && !/Z$/i.test(w)) {
              var V = w.match(O);
              if (V) {
                var $ = V[2] - 1 || 0, z = (V[7] || "0").substring(0, 3);
                return D ? new Date(Date.UTC(V[1], $, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, z)) : new Date(V[1], $, V[3] || 1, V[4] || 0, V[5] || 0, V[6] || 0, z);
              }
            }
            return new Date(w);
          }(h), this.$x = h.x || {}, this.init();
        }, g.init = function() {
          var h = this.$d;
          this.$y = h.getFullYear(), this.$M = h.getMonth(), this.$D = h.getDate(), this.$W = h.getDay(), this.$H = h.getHours(), this.$m = h.getMinutes(), this.$s = h.getSeconds(), this.$ms = h.getMilliseconds();
        }, g.$utils = function() {
          return F;
        }, g.isValid = function() {
          return this.$d.toString() !== _;
        }, g.isSame = function(h, L) {
          var w = T(h);
          return this.startOf(L) <= w && w <= this.endOf(L);
        }, g.isAfter = function(h, L) {
          return T(h) < this.startOf(L);
        }, g.isBefore = function(h, L) {
          return this.endOf(L) < T(h);
        }, g.$g = function(h, L, w) {
          return F.u(h) ? this[L] : this.set(w, h);
        }, g.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, g.valueOf = function() {
          return this.$d.getTime();
        }, g.startOf = function(h, L) {
          var w = this, D = !!F.u(L) || L, V = F.p(h), $ = function(Se, ce) {
            var we = F.w(w.$u ? Date.UTC(w.$y, ce, Se) : new Date(w.$y, ce, Se), w);
            return D ? we : we.endOf(m);
          }, z = function(Se, ce) {
            return F.w(w.toDate()[Se].apply(w.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ce)), w);
          }, H = this.$W, E = this.$M, J = this.$D, te = "set" + (this.$u ? "UTC" : "");
          switch (V) {
            case p:
              return D ? $(1, 0) : $(31, 11);
            case l:
              return D ? $(1, E) : $(0, E + 1);
            case f:
              var ve = this.$locale().weekStart || 0, fe = (H < ve ? H + 7 : H) - ve;
              return $(D ? J - fe : J + (6 - fe), E);
            case m:
            case u:
              return z(te + "Hours", 0);
            case y:
              return z(te + "Minutes", 1);
            case r:
              return z(te + "Seconds", 2);
            case c:
              return z(te + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, g.endOf = function(h) {
          return this.startOf(h, !1);
        }, g.$set = function(h, L) {
          var w, D = F.p(h), V = "set" + (this.$u ? "UTC" : ""), $ = (w = {}, w[m] = V + "Date", w[u] = V + "Date", w[l] = V + "Month", w[p] = V + "FullYear", w[y] = V + "Hours", w[r] = V + "Minutes", w[c] = V + "Seconds", w[o] = V + "Milliseconds", w)[D], z = D === m ? this.$D + (L - this.$W) : L;
          if (D === l || D === p) {
            var H = this.clone().set(u, 1);
            H.$d[$](z), H.init(), this.$d = H.set(u, Math.min(this.$D, H.daysInMonth())).$d;
          } else
            $ && this.$d[$](z);
          return this.init(), this;
        }, g.set = function(h, L) {
          return this.clone().$set(h, L);
        }, g.get = function(h) {
          return this[F.p(h)]();
        }, g.add = function(h, L) {
          var w, D = this;
          h = Number(h);
          var V = F.p(L), $ = function(E) {
            var J = T(D);
            return F.w(J.date(J.date() + Math.round(E * h)), D);
          };
          if (V === l)
            return this.set(l, this.$M + h);
          if (V === p)
            return this.set(p, this.$y + h);
          if (V === m)
            return $(1);
          if (V === f)
            return $(7);
          var z = (w = {}, w[r] = t, w[y] = a, w[c] = n, w)[V] || 1, H = this.$d.getTime() + h * z;
          return F.w(H, this);
        }, g.subtract = function(h, L) {
          return this.add(-1 * h, L);
        }, g.format = function(h) {
          var L = this, w = this.$locale();
          if (!this.isValid())
            return w.invalidDate || _;
          var D = h || "YYYY-MM-DDTHH:mm:ssZ", V = F.z(this), $ = this.$H, z = this.$m, H = this.$M, E = w.weekdays, J = w.months, te = function(ce, we, qe, Ae) {
            return ce && (ce[we] || ce(L, D)) || qe[we].slice(0, Ae);
          }, ve = function(ce) {
            return F.s($ % 12 || 12, ce, "0");
          }, fe = w.meridiem || function(ce, we, qe) {
            var Ae = ce < 12 ? "AM" : "PM";
            return qe ? Ae.toLowerCase() : Ae;
          }, Se = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: H + 1, MM: F.s(H + 1, 2, "0"), MMM: te(w.monthsShort, H, J, 3), MMMM: te(J, H), D: this.$D, DD: F.s(this.$D, 2, "0"), d: String(this.$W), dd: te(w.weekdaysMin, this.$W, E, 2), ddd: te(w.weekdaysShort, this.$W, E, 3), dddd: E[this.$W], H: String($), HH: F.s($, 2, "0"), h: ve(1), hh: ve(2), a: fe($, z, !0), A: fe($, z, !1), m: String(z), mm: F.s(z, 2, "0"), s: String(this.$s), ss: F.s(this.$s, 2, "0"), SSS: F.s(this.$ms, 3, "0"), Z: V };
          return D.replace(x, function(ce, we) {
            return we || Se[ce] || V.replace(":", "");
          });
        }, g.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, g.diff = function(h, L, w) {
          var D, V = F.p(L), $ = T(h), z = ($.utcOffset() - this.utcOffset()) * t, H = this - $, E = F.m(this, $);
          return E = (D = {}, D[p] = E / 12, D[l] = E, D[d] = E / 3, D[f] = (H - z) / 6048e5, D[m] = (H - z) / 864e5, D[y] = H / a, D[r] = H / t, D[c] = H / n, D)[V] || H, w ? E : F.a(E);
        }, g.daysInMonth = function() {
          return this.endOf(l).$D;
        }, g.$locale = function() {
          return U[this.$L];
        }, g.locale = function(h, L) {
          if (!h)
            return this.$L;
          var w = this.clone(), D = ee(h, L, !0);
          return D && (w.$L = D), w;
        }, g.clone = function() {
          return F.w(this.$d, this);
        }, g.toDate = function() {
          return new Date(this.valueOf());
        }, g.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, g.toISOString = function() {
          return this.$d.toISOString();
        }, g.toString = function() {
          return this.$d.toUTCString();
        }, k;
      }(), q = P.prototype;
      return T.prototype = q, [["$ms", o], ["$s", c], ["$m", r], ["$H", y], ["$W", m], ["$M", l], ["$y", p], ["$D", u]].forEach(function(k) {
        q[k[1]] = function(g) {
          return this.$g(g, k[0], k[1]);
        };
      }), T.extend = function(k, g) {
        return k.$i || (k(g, P, T), k.$i = !0), T;
      }, T.locale = ee, T.isDayjs = j, T.unix = function(k) {
        return T(1e3 * k);
      }, T.en = U[B], T.Ls = U, T.p = {}, T;
    });
  }(We)), We.exports;
}
var Kt = ht();
const Qe = /* @__PURE__ */ vt(Kt);
var Jt = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t(ht());
  })(Xe, function(n) {
    function t(c) {
      return c && typeof c == "object" && "default" in c ? c : { default: c };
    }
    var a = t(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(c, r) {
      return r === "W" ? c + "周" : c + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(c, r) {
      var y = 100 * c + r;
      return y < 600 ? "凌晨" : y < 900 ? "早上" : y < 1100 ? "上午" : y < 1300 ? "中午" : y < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(Jt);
var mt = { exports: {} };
(function(e, s) {
  (function(n, t) {
    e.exports = t();
  })(Xe, function() {
    return function(n, t, a) {
      n = n || {};
      var o = t.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(m, f, l, d) {
        return o.fromToBase(m, f, l, d);
      }
      a.en.relativeTime = c, o.fromToBase = function(m, f, l, d, p) {
        for (var u, _, O, x = l.$locale().relativeTime || c, R = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], K = R.length, A = 0; A < K; A += 1) {
          var B = R[A];
          B.d && (u = d ? a(m).diff(l, B.d, !0) : l.diff(m, B.d, !0));
          var U = (n.rounding || Math.round)(Math.abs(u));
          if (O = u > 0, U <= B.r || !B.r) {
            U <= 1 && A > 0 && (B = R[A - 1]);
            var j = x[B.l];
            p && (U = p("" + U)), _ = typeof j == "string" ? j.replace("%d", U) : j(U, f, B.l, O);
            break;
          }
        }
        if (f)
          return _;
        var ee = O ? x.future : x.past;
        return typeof ee == "function" ? ee(_) : ee.replace("%s", _);
      }, o.to = function(m, f) {
        return r(m, f, this, !0);
      }, o.from = function(m, f) {
        return r(m, f, this);
      };
      var y = function(m) {
        return m.$u ? a.utc() : a();
      };
      o.toNow = function(m) {
        return this.to(y(this), m);
      }, o.fromNow = function(m) {
        return this.from(y(this), m);
      };
    };
  });
})(mt);
var Gt = mt.exports;
const Xt = /* @__PURE__ */ vt(Gt);
Qe.locale("zh-cn");
Qe.extend(Xt);
const Ye = Symbol(), _t = Symbol(), et = Symbol(), Ze = Symbol(), gt = (e) => (ie("data-v-59660bbe"), e = e(), re(), e), Qt = { class: "comment-box" }, e1 = {
  key: 0,
  class: "action-box"
}, t1 = /* @__PURE__ */ gt(() => /* @__PURE__ */ i("svg", {
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
], -1)), n1 = /* @__PURE__ */ gt(() => /* @__PURE__ */ i("span", null, "图片", -1)), o1 = { class: "btn-box" }, s1 = /* @__PURE__ */ N({
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
    const t = e, a = S(""), o = S(!1), c = S(!0), r = S(), y = S(), m = S(), f = S([]), l = S([]), d = ue({
      imgLength: 0
    }), p = (k) => {
      l.value = k;
    }, u = (k) => {
      be(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: _, submit: O, focus: x } = se(_t), R = se(He), K = () => {
      O({
        content: t.reply ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: ge(t.parentId, null),
        reply: t.reply,
        files: l.value,
        clear: () => {
          U(), n("close");
        }
      });
    }, A = se("cancelFn"), B = () => {
      U(), n("close"), A();
    }, U = () => {
      r.value.clear(), f.value.length = 0, l.value = [], c.value = !0;
    };
    function j(k) {
      be(a.value) && !d.imgLength && (o.value = !1, n("hide", k));
    }
    function ee() {
      o.value = !0, xe(() => {
        y.value = document.querySelector("div[id^='el-popper-container']");
      }), x();
    }
    function T() {
      console.log(r.value);
    }
    s({
      focus: () => {
        var k;
        return (k = r.value) == null ? void 0 : k.focus();
      },
      AddMention: T
    });
    const F = (k, g) => {
      var L;
      g || (f.value.length = 0, l.value.length = 0);
      const h = g ? [g] : (L = m.value) == null ? void 0 : L.files;
      if (d.imgLength = ge(h == null ? void 0 : h.length, 0), h)
        for (let w = 0; w < h.length; w++) {
          let D = h[w].name, V = Zt(h[w]);
          l.value.push(h[w]), Wt(D) ? f.value.push(V) : nt({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, P = se(Ye), q = () => Ie("div", P.func());
    return (k, g) => he((v(), C("div", Qt, [
      M(b($t), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": g[0] || (g[0] = (h) => a.value = h),
        class: G({ "input-active": o.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": f.value,
        onFocus: ee,
        onInput: u,
        onSubmit: K,
        onPaste: F,
        onChangeImgListFn: p
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      M(Ke, { name: "fade" }, {
        default: I(() => [
          o.value ? (v(), C("div", e1, [
            M(b(Mt), {
              emoji: b(R),
              onAddEmoji: g[1] || (g[1] = (h) => {
                var L;
                return (L = r.value) == null ? void 0 : L.addText(h);
              })
            }, null, 8, ["emoji"]),
            b(_) ? (v(), C("div", {
              key: 0,
              class: "picture",
              onClick: g[2] || (g[2] = //@ts-ignore
              (...h) => {
                var L, w;
                return ((L = m.value) == null ? void 0 : L.click) && ((w = m.value) == null ? void 0 : w.click(...h));
              })
            }, [
              t1,
              n1,
              i("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: m,
                type: "file",
                multiple: "",
                onChange: F
              }, null, 544)
            ])) : Y("", !0),
            b(P).func ? (v(), X(q, { key: 1 })) : Y("", !0),
            i("div", o1, [
              M(b(Ee), {
                type: "primary",
                disabled: c.value,
                onClick: K
              }, {
                default: I(() => [
                  de(W(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (v(), X(b(Ee), {
                key: 0,
                onClick: B
              }, {
                default: I(() => [
                  de(W(t.cancelBtn), 1)
                ]),
                _: 1
              })) : Y("", !0)
            ])
          ])) : Y("", !0)
        ]),
        _: 1
      })
    ])), [
      [b(rt), j, y.value]
    ]);
  }
});
const Z = (e, s) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of s)
    n[t] = a;
  return n;
}, yt = /* @__PURE__ */ Z(s1, [["__scopeId", "data-v-59660bbe"]]), a1 = { class: "u-comment-scroll" }, l1 = ["infinite-scroll-disabled"], i1 = { class: "scroll-btn" }, r1 = { key: 1 }, c1 = { key: 2 }, u1 = /* @__PURE__ */ N({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: s }) {
    const n = e, t = S(!1), a = S(!1), o = Q(() => a.value && n.disable), c = Q(() => !a.value || t.value || o.value), r = ft(() => {
      s("more"), t.value = !1;
    }, 500), y = () => {
      t.value = !0, r();
    };
    return (m, f) => (v(), C("div", a1, [
      he((v(), C("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        pe(m.$slots, "default", {}, void 0, !0),
        i("div", i1, [
          a.value ? Y("", !0) : (v(), X(b(ct), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: f[0] || (f[0] = (l) => a.value = !a.value)
          }, {
            default: I(() => [
              de("加载更多")
            ]),
            _: 1
          })),
          t.value ? (v(), C("p", r1, "加载中...")) : Y("", !0),
          o.value ? (v(), C("p", c1, "没有更多了")) : Y("", !0)
        ])
      ], 8, l1)), [
        [b(Ht), y]
      ])
    ]));
  }
});
const d1 = /* @__PURE__ */ Z(u1, [["__scopeId", "data-v-404b6e08"]]), p1 = oe(d1), tt = (e) => (ie("data-v-3e026489"), e = e(), re(), e), f1 = { class: "nav" }, v1 = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("span", { class: "nav__title" }, "全部评论", -1)), h1 = { class: "nav__sort" }, m1 = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
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
], -1)), _1 = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), g1 = /* @__PURE__ */ N({
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
      const c = ae("u-icon");
      return v(), C("div", f1, [
        v1,
        i("div", h1, [
          i("div", {
            class: G(["item select-none", { active: t.value }]),
            onClick: o[0] || (o[0] = (r) => t.value = !0)
          }, [
            M(c, null, {
              default: I(() => [
                m1
              ]),
              _: 1
            }),
            de(" 最新 ")
          ], 2),
          i("div", {
            class: G(["item select-none", { active: !t.value }]),
            onClick: o[1] || (o[1] = (r) => t.value = !1)
          }, [
            M(c, null, {
              default: I(() => [
                _1
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
const y1 = /* @__PURE__ */ Z(g1, [["__scopeId", "data-v-3e026489"]]), w1 = oe(y1), wt = (e) => (ie("data-v-59596f14"), e = e(), re(), e), $1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, b1 = /* @__PURE__ */ wt(() => /* @__PURE__ */ i("path", {
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
}, k1 = /* @__PURE__ */ wt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), M1 = [
  k1
], S1 = /* @__PURE__ */ N({
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
    const n = e, t = S(!1), a = S(!1);
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
    ), (o, c) => (v(), X(b(At), {
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
      default: I(() => [
        i("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (v(), C("svg", $1, x1)) : (v(), C("svg", C1, M1))
        ]),
        pe(o.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      o.$slots.footer ? {
        name: "footer",
        fn: I(() => [
          pe(o.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const L1 = /* @__PURE__ */ Z(S1, [["__scopeId", "data-v-59596f14"]]), z1 = oe(L1), F1 = { class: "field" }, I1 = /* @__PURE__ */ N({
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
    const n = S();
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
    ), (t, a) => (v(), C("div", {
      class: G(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", F1, [
        t.$slots.default || t.vertical ? (v(), C("legend", {
          key: 0,
          class: G(["inner", n.value])
        }, [
          pe(t.$slots, "default", {}, void 0, !0)
        ], 2)) : Y("", !0)
      ])
    ], 2));
  }
});
const T1 = /* @__PURE__ */ Z(I1, [["__scopeId", "data-v-153d9bc7"]]), H1 = oe(T1), A1 = [
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
], B1 = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function V1(e) {
  return A1.find((s) => s.type === e);
}
function D1() {
  return B1;
}
const E1 = {
  key: 1,
  "aria-hidden": "true"
}, O1 = ["xlink:href"], j1 = /* @__PURE__ */ N({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const s = e, n = Q(() => "#" + s.name), t = Q(() => ({
      fontSize: jt(s.size) ? s.size + "px" : s.size,
      color: s.color
    }));
    return (a, o) => (v(), C("i", {
      class: "u-icon",
      style: ze(t.value)
    }, [
      a.$slots.default ? pe(a.$slots, "default", { key: 0 }, void 0, !0) : (v(), C("svg", E1, [
        i("use", { "xlink:href": n.value }, null, 8, O1)
      ]))
    ], 4));
  }
});
const R1 = /* @__PURE__ */ Z(j1, [["__scopeId", "data-v-dd34e834"]]), Le = oe(R1), U1 = { class: "v-toast" }, Y1 = { class: "inner" }, N1 = { class: "message" }, P1 = /* @__PURE__ */ N({
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
    const n = ue(D1().options), t = S(!1);
    return me(
      () => s.type,
      (a) => {
        const o = V1(a);
        o && (n.color = o.options.color, n.bgColor = o.options.bgColor, n.icon = o.options.icon);
      },
      { immediate: !0 }
    ), ye(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, s.duration);
    }), (a, o) => (v(), C("div", U1, [
      M(Ke, { name: "v-toast" }, {
        default: I(() => [
          he(i("div", Y1, [
            i("div", N1, [
              n.icon ? (v(), X(b(Le), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : Y("", !0),
              i("span", {
                class: G({ normal: a.type != "normal" })
              }, W(a.message), 3)
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
const q1 = /* @__PURE__ */ Z(P1, [["__scopeId", "data-v-7d3c50e0"]]);
function nt(e) {
  let s = e.duration;
  if (!e.message)
    return;
  e.duration = s || 1e3;
  const { vnode: n, div: t } = Rt(q1, e);
  return setTimeout(() => {
    Ut(t);
  }, e.duration + 300), n;
}
const W1 = ["onKeydown"], Z1 = ["onClick"], K1 = { class: "userInfo" }, J1 = ["src"], G1 = { class: "username" }, X1 = { class: "empty" }, Q1 = /* @__PURE__ */ N({
  __name: "mentionList",
  props: {
    isShow: { type: Boolean, default: !1 },
    position: { default: () => ({
      left: 0,
      top: 0
    }) },
    list: { default: () => [] }
  },
  emits: ["insert", "changeShow"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = S(), o = S(-1), c = S(null), r = (l) => {
      var d;
      if (o.value += l, o.value < 0 ? o.value = t.list.length - 1 : o.value >= t.list.length && (o.value = 0), a.value) {
        const p = a.value.wrapRef.children[0].children[o.value];
        if (p) {
          const u = a.value.wrapRef.offsetHeight || 0;
          (d = a.value) == null || d.setScrollTop((o.value - u / p.offsetHeight + 1) * p.offsetHeight);
        }
      }
    }, y = () => {
      if (o.value >= 0 && o.value < t.list.length)
        return t.list[o.value];
    }, m = (l) => {
      o.value = l, n("insert", t.list[o.value]), n("changeShow", !1);
    };
    me(
      () => t.isShow,
      (l) => {
        l && (o.value = 0, console.log("获取焦点", a.value), xe(() => {
          a.value && a.value.setScrollTop(0);
        }));
      }
    );
    const f = () => {
      o.value = 0;
    };
    return ye(() => {
      var l;
      (l = c.value) == null || l.focus();
    }), s({
      moveSelection: r,
      printSelectedItem: y,
      resetSelectIndex: f
    }), (l, d) => {
      const p = ae("el-empty");
      return he((v(), C("ul", {
        ref_key: "mentionList",
        ref: c,
        class: "mention-list",
        tabindex: "0",
        style: ze(`left: ${l.position.left}px; top: ${l.position.top}px`),
        onKeydown: [
          d[0] || (d[0] = $e(ke((u) => r(-1), ["prevent"]), ["up"])),
          d[1] || (d[1] = $e(ke((u) => r(1), ["prevent"]), ["down"])),
          $e(ke(y, ["prevent"]), ["enter"])
        ]
      }, [
        M(b(Re), {
          ref_key: "scrollbarRef",
          ref: a,
          style: { padding: "10px" }
        }, {
          default: I(() => [
            (v(!0), C(ne, null, le(l.list, (u, _) => (v(), C("li", {
              key: _,
              class: G({ hover: _ === o.value }),
              onClick: (O) => m(_)
            }, [
              pe(l.$slots, "user", {
                item: u,
                index: _
              }, () => [
                i("div", K1, [
                  i("img", {
                    src: u.userAvatar,
                    width: "30",
                    class: "avatar"
                  }, null, 8, J1),
                  i("span", G1, W(u.userName), 1)
                ])
              ], !0)
            ], 10, Z1))), 128)),
            he(i("div", X1, [
              M(p, { description: "暂无匹配数据" })
            ], 512), [
              [Me, !l.list.length]
            ])
          ]),
          _: 3
        }, 512)
      ], 44, W1)), [
        [Me, l.isShow]
      ]);
    };
  }
});
const en = /* @__PURE__ */ Z(Q1, [["__scopeId", "data-v-2ce8c493"]]), tn = (e) => (ie("data-v-ba4becc4"), e = e(), re(), e), nn = ["placeholder", "onKeydown", "innerHTML"], on = ["src"], sn = ["onClick"], an = /* @__PURE__ */ tn(() => /* @__PURE__ */ i("svg", {
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
], -1)), ln = [
  an
], rn = /* @__PURE__ */ N({
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
    je(($) => ({
      a2c1a332: B.value,
      e0acf042: U.value
    }));
    const a = S(null), o = S(!1), c = S({
      left: 0,
      top: 0
    });
    function r($) {
      o.value = $, $ || (j.value = "");
    }
    function y($) {
      c.value = $;
    }
    function m($) {
      a.value && a.value.moveSelection($);
    }
    function f() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const l = se("mentionConfig"), d = se("changeMetionList"), p = se("mentionSearch"), u = S(), _ = S(), O = S(), x = S(!1), R = S(!1), K = S(), { imgList: A } = Je(t), B = Q(() => t.minHeight + "px"), U = Q(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), j = S("");
    me(
      () => t.modelValue,
      ($, z) => {
        var E;
        if (x.value || (O.value = $), !((E = l == null ? void 0 : l.value) != null && E.show))
          return;
        $ = $.replace(/<br>/g, ""), z = z.replace(/<br>/g, ""), (z.length >= $.length && z.slice(-1) === "@" || $.slice(-7) === "@&nbsp;") && r(!1), o.value && $.slice(-6) !== "&nbsp;" ? (j.value = $.split("@").pop() || "", j.value = j.value.replace("'", ""), console.log(j.value), p(j.value), a.value && a.value.resetSelectIndex()) : o.value && $.slice(-6) === "&nbsp;" && r(!1);
        let H = $.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (H) {
          let J = H.map((ve) => {
            let fe = ve.match(/data-id="([^"]*)"/);
            return fe ? fe[1] : null;
          }), te = l.value.userArr.filter(
            (ve) => J.includes(`${ve[l.value.userIdKey]}`)
          );
          d(te);
        } else
          d([]);
      }
    );
    function ee($) {
      n("focus", $), x.value = !0, R.value = !0;
    }
    function T($) {
      var z, H;
      try {
        u.value = (z = window.getSelection()) == null ? void 0 : z.getRangeAt(0);
      } catch (E) {
        console.log(E);
      }
      n("blur", $), (H = _.value) != null && H.innerHTML || (R.value = !1), x.value = !1;
    }
    function F($) {
      m($);
    }
    function P($) {
      var H, E;
      const { innerHTML: z } = $.target;
      if ($.data === "@" && (l != null && l.value.show)) {
        try {
          u.value = (H = window.getSelection()) == null ? void 0 : H.getRangeAt(0);
        } catch (te) {
          console.log(te);
        }
        let J = (E = u.value) == null ? void 0 : E.getBoundingClientRect();
        r(!0), J && y({
          left: J.left,
          top: J.top + J.height + 10
        });
      }
      n("update:modelValue", z), n("input", $);
    }
    function q($, z) {
      var E, J;
      let H = window.getSelection();
      if (H) {
        if (H.removeAllRanges(), u.value || ((E = _.value) == null || E.focus(), u.value = H.getRangeAt(0)), z && !j.value)
          u.value.startOffset > 0 && (u.value.setStart(u.value.startContainer, u.value.startOffset - 1), u.value.deleteContents());
        else if (z && j.value) {
          let ve = j.value.length + 1, fe = u.value.startContainer.data.lastIndexOf("@" + j.value);
          fe !== -1 && (u.value.setStart(u.value.startContainer, fe), u.value.setEnd(u.value.startContainer, fe + ve), u.value.deleteContents());
        }
        u.value.deleteContents(), u.value.insertNode(u.value.createContextualFragment($)), u.value.collapse(!1), H.addRange(u.value), n("update:modelValue", ((J = _.value) == null ? void 0 : J.innerHTML) || "");
        const te = _.value;
        n("input", te);
      }
    }
    function k($) {
      const z = $.clipboardData;
      if (z) {
        const H = z.getData("text/plain"), E = z.items.length > 0 ? z.items[0].getAsFile() : null;
        H ? ($.preventDefault(), document.execCommand("insertText", !1, H)) : E && (console.log(E), $.preventDefault(), n("paste", $, E));
      }
    }
    function g() {
      _.value && (_.value.innerHTML = "", n("update:modelValue", _.value.innerHTML), R.value = !1);
    }
    function h() {
      xe(() => {
        var $;
        ($ = _.value) == null || $.focus();
      });
    }
    function L($) {
      if ($) {
        let z = V($);
        q(`${z} `, !0);
      }
    }
    const w = ($) => {
      if ($.ctrlKey && $.key == "Enter")
        be(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? nt({ message: "内容不能为空", type: "info" }) : n("submit");
      else if ($.key == "Enter" && o.value) {
        $.preventDefault();
        const z = f();
        L(z), r(!1);
      }
    }, D = ($) => {
      var z;
      (z = A == null ? void 0 : A.value) == null || z.splice($, 1), n("changeImgListFn", Oe(A == null ? void 0 : A.value));
    };
    ye(() => {
    }), s({
      addText: q,
      clear: g,
      focus: h,
      imageRef: K,
      insertUser: L
    });
    const V = ($) => {
      const z = `@${$[l.value.userNameKey]}`;
      let H = document.createElement("canvas"), E = H.getContext("2d");
      if (E) {
        E.font = "14px PingFangSC-Regular, PingFang SC";
        let te = E.measureText(z).width;
        H.width = te, H.height = 20, E.font = "14px PingFangSC-Regular, PingFang SC", E.fillStyle = l.value.mentionColor || "#409eff", E.fillText(z, 0, 15);
      }
      return `
  <img src="${H.toDataURL("image/png")}" alt="${z}" style="width:${H.width}px;height:${H.height}px;user-select: none;"
   data-userName="${$[l.value.userNameKey]}"  data-id="${$[l.value.userIdKey]}"
   draggable="false"
    >`;
    };
    return ($, z) => {
      var H;
      return v(), C("div", {
        class: G(["u-editor", { active: R.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: _,
          class: "rich-input",
          contenteditable: "",
          placeholder: $.placeholder,
          onFocus: ee,
          onInput: P,
          onBlur: T,
          onKeydown: [
            $e(w, ["enter"]),
            z[0] || (z[0] = $e(ke((E) => F(-1), ["prevent"]), ["up"])),
            z[1] || (z[1] = $e(ke((E) => F(1), ["prevent"]), ["down"]))
          ],
          onPaste: k,
          innerHTML: O.value
        }, null, 40, nn),
        i("div", {
          ref_key: "imageRef",
          ref: K,
          class: "image-preview-box"
        }, [
          (v(!0), C(ne, null, le(b(A), (E, J) => (v(), C("div", {
            key: J,
            class: "image-preview"
          }, [
            i("img", {
              src: E,
              alt: ""
            }, null, 8, on),
            i("div", {
              class: "clean-btn",
              onClick: (te) => D(J)
            }, ln, 8, sn)
          ]))), 128))
        ], 512),
        M(en, {
          ref_key: "metionList",
          ref: a,
          "is-show": o.value,
          position: c.value,
          list: (H = b(l)) == null ? void 0 : H.userArr,
          onInsert: L,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list"])
      ], 2);
    };
  }
});
const cn = /* @__PURE__ */ Z(rn, [["__scopeId", "data-v-ba4becc4"]]), $t = oe(cn);
const un = { class: "u-fold" }, dn = { class: "action-box select-none" }, pn = /* @__PURE__ */ N({
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
    }), t = S(!0), a = S(!1), o = S();
    let c;
    return ye(() => {
      c = new ResizeObserver((r) => {
        t.value && o.value && (a.value = o.value.offsetHeight < o.value.scrollHeight);
      }), c.observe(o.value);
    }), De(() => {
      c.disconnect();
    }), (r, y) => (v(), C("div", un, [
      i("div", {
        class: G(["txt-box", { "over-hidden": t.value }])
      }, [
        i("div", {
          ref_key: "divBox",
          ref: o
        }, [
          pe(r.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      i("div", dn, [
        a.value && r.unfold ? (v(), C("div", {
          key: 0,
          class: "expand-btn",
          onClick: y[0] || (y[0] = (m) => t.value = !t.value)
        }, W(t.value ? "展开" : "收起"), 1)) : Y("", !0)
      ])
    ]));
  }
});
const fn = /* @__PURE__ */ Z(pn, [["__scopeId", "data-v-1694aa13"]]), bt = oe(fn), vn = /* @__PURE__ */ N({
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
    }), o = (u, _, O) => {
      const x = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!_)
        return O("请输入邮箱!");
      x.test(_) || O("邮箱地址不合法"), O();
    }, c = (u, _, O) => {
      _ ? _ != a.password ? O("输入密码不一致") : O() : O("请确认密码");
    }, r = S(), y = S(), m = ue({
      email: {
        required: !0,
        validator: o,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), f = ue({
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
        switch (xe(() => p()), u) {
          case "login":
            y.value = m, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            y.value = m, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            y.value = f, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function d() {
      a.type = t.modelValue, r.value.validate((u) => {
        u && n("submit", a);
      });
    }
    function p() {
      r.value.resetFields();
    }
    return s({
      reset: p
    }), (u, _) => {
      const O = ae("el-button");
      return v(), X(b(Bt), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: y.value,
        class: "select-none"
      }, {
        default: I(() => [
          M(b(Fe), { prop: "email" }, {
            default: I(() => [
              M(b(Ve), {
                modelValue: a.email,
                "onUpdate:modelValue": _[0] || (_[0] = (x) => a.email = x),
                placeholder: "请输入邮箱",
                onFocus: _[1] || (_[1] = (x) => u.$emit("toggle", 1)),
                onBlur: _[2] || (_[2] = (x) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          M(b(Fe), { prop: "password" }, {
            default: I(() => [
              M(b(Ve), {
                modelValue: a.password,
                "onUpdate:modelValue": _[3] || (_[3] = (x) => a.password = x),
                placeholder: "请输入密码",
                onFocus: _[4] || (_[4] = (x) => u.$emit("toggle", 2)),
                onBlur: _[5] || (_[5] = (x) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          he(M(b(Fe), { prop: "checkPass" }, {
            default: I(() => [
              M(b(Ve), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": _[6] || (_[6] = (x) => a.checkPass = x),
                placeholder: "请确认密码",
                onFocus: _[7] || (_[7] = (x) => u.$emit("toggle", 2)),
                onBlur: _[8] || (_[8] = (x) => u.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Me, u.modelValue == "forget"]
          ]),
          M(b(Fe), null, {
            default: I(() => [
              M(O, {
                style: { width: "100%" },
                type: "primary",
                onClick: d
              }, {
                default: I(() => [
                  de(W(l.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          M(b(Fe), null, {
            default: I(() => [
              i("div", {
                onClick: _[9] || (_[9] = (x) => u.$emit("update:modelValue", l.one.key))
              }, W(l.one.value), 1),
              i("div", {
                onClick: _[10] || (_[10] = (x) => u.$emit("update:modelValue", l.two.key))
              }, W(l.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
});
const hn = /* @__PURE__ */ Z(vn, [["__scopeId", "data-v-525985f8"]]), mn = { class: "u-sign" }, _n = { class: "sign-oauth" }, gn = /* @__PURE__ */ N({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = S(!1), t = S("login"), a = S(0), o = Q(() => {
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
      const y = ae("u-divider"), m = ae("u-icon"), f = ae("u-dialog");
      return v(), C("div", mn, [
        M(b(Ee), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: I(() => [
            de("登录/注册")
          ]),
          _: 1
        }),
        M(f, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: o.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: I(() => [
            M(hn, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => a.value = l),
              onSubmit: r[3] || (r[3] = (l) => c.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            M(y, null, {
              default: I(() => [
                de("其他方式登录")
              ]),
              _: 1
            }),
            i("div", _n, [
              M(m, { name: "QQ" }),
              M(m, { name: "weixin" }),
              M(m, { name: "gitee" }),
              M(m, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const yn = /* @__PURE__ */ Z(gn, [["__scopeId", "data-v-8e737450"]]), wn = oe(yn), $n = (e) => (ie("data-v-3a07e116"), e = e(), re(), e), bn = { class: "custom-contextmenu__menu" }, xn = ["onClick"], Cn = /* @__PURE__ */ $n(() => /* @__PURE__ */ i("div", { class: "arrow" }, null, -1)), kn = /* @__PURE__ */ N({
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
    }), a = (m) => {
      t.tag = m, t.dropdownList[1].show = !m.meta.isAffix, o(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, o = () => {
      t.isShow = !1;
    };
    ye(() => {
      window.addEventListener("click", o);
    }), De(() => {
      window.removeEventListener("click", o);
    });
    const { isShow: c, dropdownList: r, tag: y } = Je(t);
    return s({
      openContextmenu: a
    }), (m, f) => {
      const l = ae("u-icon");
      return v(), X(Ke, { name: "el-zoom-in-center" }, {
        default: I(() => [
          he(i("div", {
            style: ze(`top: ${m.dropdown.y + 5}px; left: ${m.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            i("ul", bn, [
              (v(!0), C(ne, null, le(b(r), (d, p) => (v(), C(ne, { key: p }, [
                d.show ? (v(), C("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (u) => m.$emit("submit", p, b(y))
                }, [
                  M(l, {
                    innerHTML: d.icon
                  }, null, 8, ["innerHTML"]),
                  i("span", null, W(d.title), 1)
                ], 8, xn)) : Y("", !0)
              ], 64))), 128))
            ]),
            Cn
          ], 4), [
            [Me, b(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const Mn = /* @__PURE__ */ Z(kn, [["__scopeId", "data-v-3a07e116"]]), Sn = (e) => (ie("data-v-f7d57bb4"), e = e(), re(), e), Ln = { class: "u-tabs" }, zn = ["onClick", "onContextmenu"], Fn = { class: "select-none" }, In = /* @__PURE__ */ Sn(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Tn = /* @__PURE__ */ N({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: s }) {
    const n = e, t = S(), a = S(), o = it(n, "modelValue"), c = S(0), r = ue({
      x: 0,
      y: 0
    });
    me(
      () => [...o.value],
      (d, p) => {
        if (p) {
          if (console.log(d, p), d.length > p.length) {
            let u = d.find((_) => !(p != null && p.includes(_)));
            o.value.forEach((_, O, x) => {
              x.findIndex((R) => R.path == _.path) != O && x.splice(O, 1);
            }), c.value = o.value.findIndex((_) => _.path == (u == null ? void 0 : u.path));
          }
        } else {
          let u = 1;
          o.value.forEach((_, O, x) => {
            x.findIndex((R) => R.path == _.path) != O && (x.splice(O, 1), c.value = x.findIndex((R) => R.path == _.path), u = 0);
          }), u && (c.value = o.value.length - 1);
        }
        xe(() => {
          t.value.update();
        });
      },
      {
        immediate: !0
      }
    ), me(
      () => c.value,
      (d) => {
        s(
          "select",
          o.value.find((p, u) => u == d)
        );
      }
    );
    const y = (d) => {
      o.value.map((p, u) => {
        if (!p.meta.isAffix && d == u)
          if (o.value.splice(u, 1), u == c.value) {
            let O = [u, u - 1].filter((x) => x >= 0 && x < o.value.length);
            c.value = O[0], c.value == u && s(
              "select",
              o.value.find((x, R) => R == d)
            );
          } else
            d < c.value && (c.value -= 1);
      });
    }, m = (d) => {
      let p = o.value.filter((_) => _.meta.isAffix);
      d && !d.meta.isAffix && p.push(d), o.value.length = 0, o.value.push(...p);
      let u = o.value.length - 1;
      c.value = u >= 0 ? u : 0;
    }, f = (d, p) => {
      switch (d) {
        case 0:
          s("refresh", p);
          break;
        case 1:
          let u = o.value.findIndex((_) => _.path == p.path);
          y(u), s("close", p);
          break;
        case 2:
          m(p), s("closeOther", p);
          break;
        case 3:
          m(), s("closeAll");
          break;
        case 4:
          s("fullScreen", p);
          break;
      }
    }, l = (d, p) => {
      const { clientX: u, clientY: _ } = p;
      r.x = u, r.y = _, a.value.openContextmenu(d);
    };
    return (d, p) => {
      const u = ae("u-icon");
      return v(), C("div", Ln, [
        M(b(Re), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: I(() => [
            i("ul", {
              class: G([{ "classic-style": d.classic }, "u-tabs-ul"])
            }, [
              (v(!0), C(ne, null, le(d.modelValue, (_, O) => (v(), C("li", {
                key: O,
                class: G([{ "is-active": c.value == O }, "u-tabs-ul-li"]),
                onClick: (x) => c.value = O,
                onContextmenu: ke((x) => l(_, x), ["prevent"])
              }, [
                i("span", Fn, W(_.meta.title), 1),
                _.meta.isAffix ? Y("", !0) : (v(), X(u, {
                  key: 0,
                  onClick: ke((x) => f(1, _), ["stop"])
                }, {
                  default: I(() => [
                    In
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, zn))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        M(Mn, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: f
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const Hn = /* @__PURE__ */ Z(Tn, [["__scopeId", "data-v-f7d57bb4"]]), An = oe(Hn), Bn = { key: 0 }, Vn = /* @__PURE__ */ N({
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
    }), t = S({}), a = S({}), o = Q(() => s.delay > 2e3 ? s.delay : 2e3), c = () => {
      xe(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          y();
        }, s.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / s.spped, n.twoTime = (n.textWidth + n.boxWidth) / s.spped;
    }, y = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, m = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          y();
        },
        !1
      );
    };
    return ye(() => {
      s.vertical || (c(), m());
    }), (f, l) => {
      const d = ae("el-carousel-item"), p = ae("u-icon");
      return v(), C("div", {
        class: "u-notice-bar",
        style: ze({ background: f.background, height: `${f.height}px` })
      }, [
        f.vertical ? (v(), C("div", Bn, [
          M(b(Vt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: o.value
          }, {
            default: I(() => [
              (v(!0), C(ne, null, le(f.data, (u) => (v(), X(d, { key: u }, {
                default: I(() => [
                  de(W(u), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (v(), C("div", {
          key: 1,
          style: ze({ color: f.color, fontSize: `${f.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          f.prefixIcon ? (v(), X(p, {
            key: 0,
            name: f.prefixIcon
          }, null, 8, ["name"])) : Y("", !0),
          i("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            i("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, W(f.data), 513)
          ], 512),
          f.suffixIcon ? (v(), X(p, {
            key: 1,
            name: f.suffixIcon
          }, null, 8, ["name"])) : Y("", !0)
        ], 4))
      ], 4);
    };
  }
});
const Dn = /* @__PURE__ */ Z(Vn, [["__scopeId", "data-v-723bc558"]]), En = oe(Dn), On = (e) => (ie("data-v-11b4e56c"), e = e(), re(), e), jn = { class: "u-anchor" }, Rn = { class: "toc-content" }, Un = /* @__PURE__ */ On(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Yn = { class: "toc-items" }, Nn = ["onClick"], Pn = /* @__PURE__ */ N({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const s = e, n = S(0), t = S({}), a = S({}), o = (m) => {
      switch (m) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, c = () => {
      const m = [];
      t.value.forEach((d) => {
        m.push(d.offsetTop);
      });
      const l = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      m.forEach((d, p) => {
        l >= d - 10 - s.targetOffset && (n.value = p);
      });
    }, r = (m) => {
      const f = t.value.item(m);
      console.log(f), s.scroll ? a.value.scrollTo({
        top: f.offsetTop - s.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: f.offsetTop - s.targetOffset,
        behavior: "smooth"
      });
    };
    ye(() => {
    }), De(() => {
      a.value.removeEventListener("scroll", c);
    });
    let y;
    return ye(() => {
      let m = document.querySelector(s.container);
      y = new ResizeObserver((f) => {
        s.scroll ? a.value = document.querySelector(s.scroll) : a.value = window, t.value = m.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), y.observe(m);
    }), De(() => {
      a.value.removeEventListener("scroll", c), y.disconnect();
    }), (m, f) => {
      const l = ae("u-divider");
      return v(), C("div", jn, [
        i("nav", Rn, [
          Un,
          M(l),
          i("ul", Yn, [
            (v(!0), C(ne, null, le(t.value, (d, p) => (v(), C("li", {
              key: p,
              class: G([{ active: n.value == p }, o(d.nodeName)]),
              onClick: (u) => r(p)
            }, W(d.innerText), 11, Nn))), 128))
          ])
        ])
      ]);
    };
  }
});
const qn = /* @__PURE__ */ Z(Pn, [["__scopeId", "data-v-11b4e56c"]]), Wn = oe(qn), Te = (e) => (ie("data-v-c739035a"), e = e(), re(), e), Zn = { class: "card-box u-scrollbar" }, Kn = {
  key: 0,
  class: "history"
}, Jn = { class: "header" }, Gn = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "title" }, "历史搜索", -1)), Xn = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), Qn = {
  key: 1,
  class: "trending"
}, eo = { class: "title" }, to = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("span", null, "热搜", -1)), no = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
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
], -1)), oo = { class: "hot-list" }, so = ["onClick"], ao = { class: "trending-text u-ellipsis" }, lo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "trending-mark" }, null, -1)), io = /* @__PURE__ */ N({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: s }) {
    const n = e, t = Q(() => !(be(n.data.historySearchList) && be(n.data.hotSearchList)));
    return (a, o) => {
      const c = ae("u-icon");
      return he((v(), C("div", Zn, [
        a.data.historySearchList.length != 0 ? (v(), C("div", Kn, [
          i("div", Jn, [
            Gn,
            M(b(ct), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (r) => a.$emit("onClear"))
            }, {
              default: I(() => [
                M(c, null, {
                  default: I(() => [
                    Xn
                  ]),
                  _: 1
                }),
                de(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (v(!0), C(ne, null, le(a.data.historySearchList, (r, y) => (v(), X(b(Dt), {
            key: y,
            type: r.type,
            closable: "",
            onClose: (m) => a.$emit("onClose", r.name),
            onClick: (m) => a.$emit("submit", r.name)
          }, {
            default: I(() => [
              de(W(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : Y("", !0),
        b(be)(a.data.hotSearchList) ? Y("", !0) : (v(), C("div", Qn, [
          i("div", eo, [
            to,
            M(c, { style: { margin: "0 6px" } }, {
              default: I(() => [
                no
              ]),
              _: 1
            })
          ]),
          i("div", oo, [
            (v(!0), C(ne, null, le(a.data.hotSearchList, (r, y) => (v(), C("div", {
              key: y,
              class: "hot-item",
              onClick: (m) => a.$emit("submit", r)
            }, [
              i("div", {
                class: G(["trending-rank", { "trending-rank-top": y < 3 }])
              }, W(y + 1), 3),
              i("div", ao, W(r), 1),
              lo
            ], 8, so))), 128))
          ])
        ]))
      ], 512)), [
        [Me, a.data.visible && t.value]
      ]);
    };
  }
});
const ro = /* @__PURE__ */ Z(io, [["__scopeId", "data-v-c739035a"]]), ot = (e) => (ie("data-v-df2be5d9"), e = e(), re(), e), co = { class: "u-search" }, uo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, po = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), fo = ["data-before", "data-after"], vo = ["placeholder"], ho = { class: "btn" }, mo = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
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
], -1)), _o = /* @__PURE__ */ ot(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ i("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), go = /* @__PURE__ */ N({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: s, emit: n }) {
    const t = e, a = S({}), o = it(t.config, "keywords"), c = S(!1), r = S(0), y = S(!0), m = S(), f = ue({
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
    const d = Q(() => {
      let A = o.value[r.value];
      return c.value || l.search ? "" : A;
    }), p = Q(() => {
      let A = typeof o.value[r.value + 1] > "u" ? o.value[0] : o.value[r.value + 1];
      return c.value || l.search ? "" : A;
    }), u = Q(() => {
      let A = o.value[r.value];
      return c.value ? A : "";
    }), _ = Q(() => !c.value && !l.search && y.value), O = (A) => {
      if (A != null && A.trim() != "") {
        let B = (j, ee) => Math.round(Math.random() * (ee - j)) + j, U = (j) => l.historySearchList.filter((ee) => ee.name == j).length != 0;
        if (A && l.historySearchList)
          U(A) || l.historySearchList.unshift({ name: A, type: f.types[B(0, 3)] });
        else {
          let j = c.value ? u : d;
          A = j.value, U(j.value) || l.historySearchList.unshift({ name: j.value, type: f.types[B(0, 3)] });
        }
        Be.set("searchHistory", l.historySearchList);
      }
      l.search = A, a.value.focus(), n("submit", A);
    }, x = (A) => {
      l.historySearchList.findIndex((B) => B.name == A), l.historySearchList.splice(
        l.historySearchList.findIndex((B) => B.name == A),
        1
      ), Be.set("searchHistory", l.historySearchList);
    }, R = () => {
      l.historySearchList.length = 0, Be.remove("searchHistory");
    }, K = (A) => {
      if (A.pseudoElement == "::after") {
        y.value = !1;
        let B = typeof o.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = B, setTimeout(() => {
          y.value = !0;
        }, 3e3);
      }
    };
    return s({
      close: () => l.visible = !1
    }), (A, B) => {
      const U = ae("u-icon");
      return v(), C("div", co, [
        i("div", {
          class: G(["search", { active: c.value }])
        }, [
          i("div", uo, [
            M(U, null, {
              default: I(() => [
                po
              ]),
              _: 1
            })
          ]),
          i("label", {
            ref_key: "labelRef",
            ref: m,
            "data-before": d.value,
            "data-after": p.value,
            class: G({ animate: _.value }),
            onAnimationend: K
          }, [
            he(i("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": B[0] || (B[0] = (j) => l.search = j),
              type: "text",
              placeholder: u.value,
              onFocus: B[1] || (B[1] = () => {
                c.value = !0, l.visible = !0;
              }),
              onBlur: B[2] || (B[2] = (j) => c.value = !1),
              onKeyup: B[3] || (B[3] = $e((j) => O(l.search), ["enter"]))
            }, null, 40, vo), [
              [Ft, l.search]
            ])
          ], 42, fo),
          i("div", ho, [
            he(M(U, {
              class: "close",
              onClick: B[4] || (B[4] = (j) => l.search = "")
            }, {
              default: I(() => [
                mo
              ]),
              _: 1
            }, 512), [
              [Me, l.search]
            ]),
            i("div", {
              class: "search-btn",
              onClick: B[5] || (B[5] = (j) => O(l.search))
            }, [
              M(U, null, {
                default: I(() => [
                  _o
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        he(M(ro, {
          data: l,
          onOnClose: x,
          onOnClear: R,
          onSubmit: O
        }, null, 8, ["data"]), [
          [b(rt), () => l.visible = !1, m.value]
        ])
      ]);
    };
  }
});
const yo = /* @__PURE__ */ Z(go, [["__scopeId", "data-v-df2be5d9"]]), wo = oe(yo), xt = (e, s) => {
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
}, $o = (e) => {
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
}, c2 = (e, s, n) => {
  let t = (e - 1) * s;
  return t + s >= n.length ? n.slice(t, n.length) : n.slice(t, t + s);
}, Ct = (e) => (ie("data-v-f75472b5"), e = e(), re(), e), bo = { class: "message" }, xo = { class: "chat-list" }, Co = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), ko = { class: "content" }, Mo = {
  key: 0,
  class: "username"
}, So = ["innerHTML"], Lo = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), zo = /* @__PURE__ */ N({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: s }) {
    const { allEmoji: n } = se(He), t = S();
    return s({
      scroll: () => {
        xe(() => {
          const o = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(o.offsetTop);
        });
      }
    }), (o, c) => (v(), C("div", bo, [
      M(b(Re), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: I(() => [
          i("div", xo, [
            (v(!0), C(ne, null, le(o.data, (r, y) => (v(), C("div", {
              key: y,
              class: G([{ self: o.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                M(b(Ge), null, {
                  default: I(() => [
                    Co
                  ]),
                  _: 1
                })
              ]),
              i("div", ko, [
                o.userId != r.id ? (v(), C("div", Mo, W(r.username), 1)) : Y("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: b(xt)(b(n), r.content)
                }, null, 8, So)
              ]),
              Lo
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const Fo = /* @__PURE__ */ Z(zo, [["__scopeId", "data-v-f75472b5"]]), Ne = (e) => (ie("data-v-18726a6b"), e = e(), re(), e), Io = { class: "u-chat" }, To = { class: "header" }, Ho = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
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
], -1)), Ao = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ i("div", null, "聊天室"),
  /* @__PURE__ */ i("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Bo = {
  id: "chat-footer",
  class: "footer"
}, Vo = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
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
], -1)), Do = /* @__PURE__ */ Ne(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), Eo = /* @__PURE__ */ N({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: s }) {
    const n = e, t = S(!1), a = S(""), o = S(), c = (f) => {
      const { ctrlKey: l, key: d } = f;
      l && d == "Enter" && y();
    }, r = () => {
      a.value = "", o.value.scroll();
    }, y = () => {
      let f = a.value;
      f.trim() ? (f = f.replace(/\n/g, "<br/>"), s("submit", { clear: r, content: f })) : nt({ type: "error", message: "内容不能为空" });
    }, m = (f) => {
      let l = document.getElementById("emojiInput"), d = l.selectionStart, p = l.selectionEnd, u = l.value;
      if (d === null || p === null)
        return;
      let _ = u.substring(0, d) + f + u.substring(p);
      l.value = _, l.focus(), l.selectionStart = d + f.length, l.selectionEnd = d + f.length, a.value = _;
    };
    return _e(He, n.emoji), (f, l) => {
      const d = ae("u-icon"), p = ae("u-emoji");
      return v(), C("div", Io, [
        i("div", {
          class: G([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", To, [
            M(d, { size: "32" }, {
              default: I(() => [
                Ho
              ]),
              _: 1
            }),
            Ao
          ]),
          M(Fo, {
            ref_key: "messageRef",
            ref: o,
            data: f.data,
            "user-id": f.userId
          }, null, 8, ["data", "user-id"]),
          i("div", Bo, [
            M(b(Ve), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: $e(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            M(p, {
              style: { margin: "0 8px 0" },
              emoji: f.emoji,
              placement: "top-end",
              onAddEmoji: m
            }, {
              default: I(() => [
                Vo
              ]),
              _: 1
            }, 8, ["emoji"]),
            M(d, {
              size: "18",
              class: G([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: y
            }, {
              default: I(() => [
                Do
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        M(b(Ee), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (u) => t.value = !t.value)
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
const Oo = /* @__PURE__ */ Z(Eo, [["__scopeId", "data-v-18726a6b"]]), jo = oe(Oo), kt = (e) => (ie("data-v-85c87038"), e = e(), re(), e), Ro = { class: "u-emoji" }, Uo = { class: "face-tooltip-head select-none" }, Yo = ["onClick"], No = ["src"], Po = { class: "emoji-body select-none" }, qo = { style: { padding: "0 5px" } }, Wo = ["onClick"], Zo = { class: "emoji-btn select-none" }, Ko = { key: 0 }, Jo = /* @__PURE__ */ kt(() => /* @__PURE__ */ i("svg", {
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
], -1)), Go = /* @__PURE__ */ kt(() => /* @__PURE__ */ i("span", null, "表情", -1)), Xo = [
  Jo,
  Go
], Qo = /* @__PURE__ */ N({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: s }) {
    const n = e, t = S(0), a = S(0), o = S(new Array(2)), { emojiList: c, faceList: r } = n.emoji;
    function y(f) {
      switch (t.value = f, f) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, o.value[1] = c[1];
          break;
      }
    }
    function m() {
      o.value[0] = c[0];
    }
    return (f, l) => (v(), C("div", Ro, [
      M(b(ut), {
        placement: f.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: m
      }, {
        reference: I(() => [
          i("div", Zo, [
            f.$slots.default ? pe(f.$slots, "default", { key: 1 }, void 0, !0) : (v(), C("div", Ko, Xo))
          ])
        ]),
        default: I(() => [
          i("div", Uo, [
            (v(!0), C(ne, null, le(b(r), (d, p) => (v(), C("label", {
              key: p,
              class: G(t.value == p ? "active" : ""),
              onClick: (u) => y(p)
            }, [
              i("img", {
                src: d,
                alt: ""
              }, null, 8, No)
            ], 10, Yo))), 128))
          ]),
          i("div", Po, [
            i("div", {
              class: "emjio-container",
              style: ze({ transform: `translateX(${a.value}%)` })
            }, [
              (v(!0), C(ne, null, le(o.value, (d, p) => (v(), C("div", {
                key: p,
                class: "emoji-wrapper"
              }, [
                M(b(Re), null, {
                  default: I(() => [
                    i("div", qo, [
                      (v(!0), C(ne, null, le(d, (u, _) => (v(), C("span", {
                        key: _,
                        class: "emoji-item",
                        onClick: (O) => f.$emit("addEmoji", _)
                      }, [
                        M(b(dt), {
                          src: u,
                          title: String(_),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Wo))), 128))
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
const es = /* @__PURE__ */ Z(Qo, [["__scopeId", "data-v-85c87038"]]), He = Symbol(), Mt = oe(es), ts = /* @__PURE__ */ N({
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
      const f = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let d = l.split("."), p = d[0], u = d.length > 1 ? n.decimalSeparator + d[1] : "", _ = !isNaN(parseFloat(n.separator));
      if (n.separator && !_)
        for (; f.test(p); )
          p = p.replace(f, "$1" + n.separator + "$2");
      return p + u;
    }), c = Q(() => `${n.prefix}${o.value}${n.suffix}`);
    ye(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      y(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(m);
    }, y = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, m = (f) => {
      t.timestamp = f, t.startTimestamp || (t.startTimestamp = f);
      let l = f - t.startTimestamp;
      t.remaining = t.currentDuration - l, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(m) : s("finished");
    };
    return (f, l) => (v(), C("span", null, W(c.value), 1));
  }
}), ns = oe(ts), lt = /* @__PURE__ */ N({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const s = S({}), { showInfo: n } = se(et), t = se(Ye), a = () => Ie("div", t.card(s.value));
    return (o, c) => b(t).card ? (v(), X(b(ut), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => b(n)(o.uid, (r) => s.value = r))
    }, {
      reference: I(() => [
        pe(o.$slots, "default")
      ]),
      default: I(() => [
        M(a)
      ]),
      _: 3
    })) : pe(o.$slots, "default", { key: 1 });
  }
}), Pe = (e) => (ie("data-v-961bcd31"), e = e(), re(), e), os = { class: "comment-sub" }, ss = ["href", "target"], as = /* @__PURE__ */ Pe(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), ls = { class: "comment-primary" }, is = { class: "comment-main" }, rs = {
  key: 1,
  class: "user-info"
}, cs = ["href", "target"], us = { class: "username" }, ds = {
  class: "name",
  style: { "max-width": "10em" }
}, ps = {
  blank: "true",
  class: "rank"
}, fs = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, vs = { class: "time" }, hs = { class: "content" }, ms = ["innerHTML"], _s = {
  class: "imgbox",
  style: { display: "flex" }
}, gs = { class: "action-box select-none" }, ys = /* @__PURE__ */ Pe(() => /* @__PURE__ */ i("svg", {
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
], -1)), ws = /* @__PURE__ */ Pe(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ i("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), $s = { key: 2 }, bs = /* @__PURE__ */ Pe(() => /* @__PURE__ */ i("svg", {
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
], -1)), xs = { key: 2 }, Cs = /* @__PURE__ */ N({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const s = e, n = ue({
      active: !1
    }), t = S(), a = S(), o = Q(() => {
      let x = s.data.contentImg;
      return be(x) ? [] : x == null ? void 0 : x.split("||");
    }), { allEmoji: c } = se(He), { like: r, user: y, relativeTime: m, aTarget: f } = se(et);
    function l() {
      n.active = !n.active, n.active && xe(() => {
        var x;
        (x = t.value) == null || x.focus();
      });
    }
    function d(x) {
      var K;
      const R = x.target;
      (K = a.value) != null && K.contains(R) || (n.active = !1);
    }
    const p = se(Ye), u = () => Ie("div", p.info(s.data)), _ = () => Ie("div", p.operate(s.data)), O = Q(() => xt(c, s.data.content));
    return (x, R) => (v(), C("div", {
      class: G(["comment", { reply: s.reply }])
    }, [
      i("div", os, [
        M(lt, {
          uid: b(Ce)(x.data.uid)
        }, {
          default: I(() => [
            i("a", {
              href: x.data.user.homeLink,
              target: b(f),
              class: "no-underline",
              style: { display: "block" }
            }, [
              M(b(Ge), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: x.data.user.avatar
              }, {
                default: I(() => [
                  as
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, ss)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      i("div", ls, [
        i("div", is, [
          b(p).info ? (v(), X(u, { key: 0 })) : (v(), C("div", rs, [
            M(lt, {
              uid: b(Ce)(x.data.uid)
            }, {
              default: I(() => [
                i("a", {
                  href: x.data.user.homeLink,
                  target: b(f),
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  i("div", us, [
                    i("span", ds, W(x.data.user.username), 1),
                    i("span", ps, [
                      M(b(Le), {
                        size: "24",
                        innerHTML: b($o)(x.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, cs)
              ]),
              _: 1
            }, 8, ["uid"]),
            i("span", fs, "  " + W(x.data.address), 1),
            i("time", vs, W(b(m) ? b(Qe)(x.data.createTime).fromNow() : x.data.createTime), 1)
          ])),
          i("div", hs, [
            M(b(bt), { unfold: "" }, {
              default: I(() => [
                i("div", { innerHTML: O.value }, null, 8, ms),
                i("div", _s, [
                  (v(!0), C(ne, null, le(o.value, (K, A) => (v(), X(b(dt), {
                    key: A,
                    src: K,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": o.value,
                    "initial-index": A
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          i("div", gs, [
            i("div", {
              class: "item",
              onClick: R[0] || (R[0] = (K) => b(r)(b(Ce)(x.data.id)))
            }, [
              b(y).likeIds.map(String).indexOf(b(Ce)(x.data.id)) == -1 ? (v(), X(b(Le), { key: 0 }, {
                default: I(() => [
                  ys
                ]),
                _: 1
              })) : (v(), X(b(Le), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: I(() => [
                  ws
                ]),
                _: 1
              })),
              x.data.likes != 0 ? (v(), C("span", $s, W(x.data.likes), 1)) : Y("", !0)
            ]),
            i("div", {
              ref_key: "btnRef",
              ref: a,
              class: G(["item", { active: n.active }]),
              onClick: l
            }, [
              M(b(Le), null, {
                default: I(() => [
                  bs
                ]),
                _: 1
              }),
              i("span", null, W(n.active ? "取消回复" : "回复"), 1)
            ], 2),
            b(p).operate ? (v(), X(_, { key: 0 })) : Y("", !0)
          ]),
          n.active ? (v(), C("div", xs, [
            M(yt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": b(Ce)(x.id),
              placeholder: `回复 @${x.data.user.username}...`,
              reply: x.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: d,
              onClose: R[1] || (R[1] = (K) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : Y("", !0)
        ]),
        pe(x.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const St = /* @__PURE__ */ Z(Cs, [["__scopeId", "data-v-961bcd31"]]), ks = (e) => (ie("data-v-897ae8e9"), e = e(), re(), e), Ms = {
  key: 0,
  class: "reply-box"
}, Ss = { class: "reply-list" }, Ls = {
  key: 0,
  class: "fetch-more"
}, zs = { key: 0 }, Fs = { key: 1 }, Is = { key: 0 }, Ts = /* @__PURE__ */ ks(() => /* @__PURE__ */ i("svg", {
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
], -1)), Hs = {
  key: 1,
  class: "fetch-more"
}, As = /* @__PURE__ */ N({
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
    }), { replyPage: t, replyShowSize: a, comments: o } = se(Ze), { page: c } = se(Ze), r = Q(() => {
      let d = {
        total: 0,
        length: 0,
        list: []
      };
      if (s.data) {
        let p = s.data.list.length;
        d = {
          total: s.data.total,
          length: p,
          list: s.data.list
        };
      }
      if (!n.over) {
        let p = d.list.slice(0, a);
        d.list = p;
      }
      return c && (d.list = d.list.slice(0, n.pageSize)), d;
    }), y = () => {
      n.over = !0;
    }, m = (d) => {
      o.value.forEach((p) => {
        p.id == s.id && p.reply && (p.reply = d);
      });
    }, f = (d) => {
      n.pageNum = d, t(s.id, d, n.pageSize, (p) => m(p));
    }, l = (d) => {
      n.pageSize = d, t(s.id, n.pageNum, d, (p) => m(p));
    };
    return (d, p) => r.value.length > 0 ? (v(), C("div", Ms, [
      i("div", Ss, [
        (v(!0), C(ne, null, le(r.value.list, (u, _) => (v(), X(St, {
          id: d.id,
          key: _,
          data: u,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > b(a) ? (v(), C("div", Ls, [
          n.loading ? (v(), C("span", zs, "加载中...")) : (v(), C("div", Fs, [
            n.over ? Y("", !0) : (v(), C("div", Is, [
              de(" 共" + W(r.value.total) + "条回复, ", 1),
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: y
              }, [
                de(" 点击查看 "),
                Ts
              ])
            ]))
          ]))
        ])) : Y("", !0),
        n.over && b(c) ? (v(), C("div", Hs, [
          M(b(Et), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "page-size": n.pageSize,
            onCurrentChange: f,
            onSizeChange: l
          }, null, 8, ["total", "page-size"])
        ])) : Y("", !0)
      ])
    ])) : Y("", !0);
  }
});
const Bs = /* @__PURE__ */ Z(As, [["__scopeId", "data-v-897ae8e9"]]), Vs = {
  key: 0,
  class: "comment-list"
}, Ds = /* @__PURE__ */ N({
  __name: "comment-list",
  props: {
    data: {},
    total: {},
    showSize: {}
  },
  setup(e) {
    return (s, n) => s.data ? (v(), C("div", Vs, [
      (v(!0), C(ne, null, le(s.data, (t, a) => (v(), X(St, {
        id: b(Ce)(t.id),
        key: a,
        data: t
      }, {
        default: I(() => [
          M(Bs, {
            id: b(Ce)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : Y("", !0);
  }
});
const st = (e) => (ie("data-v-23068117"), e = e(), re(), e), Es = { class: "u-comment" }, Os = {
  key: 0,
  class: "comment-form"
}, js = /* @__PURE__ */ st(() => /* @__PURE__ */ i("div", { class: "header" }, [
  /* @__PURE__ */ i("span", { class: "header-title" }, "评论")
], -1)), Rs = { class: "content" }, Us = { class: "avatar-box" }, Ys = /* @__PURE__ */ st(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), Ns = {
  key: 1,
  class: "comment-list-wrapper"
}, Ps = /* @__PURE__ */ st(() => /* @__PURE__ */ i("div", { class: "title" }, "全部评论", -1)), qs = /* @__PURE__ */ N({
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
      showSize: c,
      replyShowSize: r,
      total: y,
      aTarget: m,
      showForm: f = !0,
      showContent: l = !0,
      mentionConfig: d
    } = Je(t.config), p = ({ content: T, parentId: F, reply: P, files: q, clear: k }) => {
      const g = (h) => {
        if (k(), F) {
          let L = o.value.find((w) => w.id == F);
          if (L) {
            let w = L.reply;
            w ? (w.list.unshift(h), w.total++) : L.reply = {
              total: 1,
              list: [h]
            };
          }
        } else
          o.value.unshift(h);
      };
      n("submit", { content: T, parentId: F, reply: P, files: q, mentionList: B.value, finish: g });
    }, u = {
      upload: t.upload,
      submit: p,
      focus: () => n("focus")
    };
    _e(_t, u), _e("cancelFn", () => n("cancel"));
    const _ = (T, F) => {
      let P = null;
      o.value.forEach((q) => {
        var k;
        q.id == T ? P = q : P = (k = q.reply) == null ? void 0 : k.list.find((g) => g.id == T), P && (P.likes += F);
      });
    }, x = {
      user: a,
      like: (T) => {
        const F = t.config.user.likeIds;
        n("like", T, () => {
          if (F.findIndex((P) => P == T) == -1)
            F.push(T), _(T, 1);
          else {
            let P = F.findIndex((q) => q == T);
            P != -1 && (F.splice(P, 1), _(T, -1));
          }
        });
      },
      relativeTime: ge(t.relativeTime, !1),
      showInfo: (T, F) => n("showInfo", T, F),
      aTarget: ge(m, "_blank")
    };
    _e(et, x);
    const R = {
      page: t.page,
      replyPage: (T, F, P, q) => {
        n("replyPage", { parentId: T, pageNum: F, pageSize: P, finish: q });
      },
      replyShowSize: ge(r == null ? void 0 : r.value, 3),
      comments: o
    };
    _e(Ze, R);
    const K = (T) => {
      const { parentId: F, id: P } = T;
      if (F) {
        let q = o.value.find((g) => g.id == F), k = q == null ? void 0 : q.reply;
        if (k) {
          let g = k.list.findIndex((h) => h.id == P);
          g != -1 && (k.list.splice(g, 1), k.total--);
        }
      } else {
        let q = o.value.findIndex((k) => k.id == P);
        q != -1 && o.value.splice(q, 1);
      }
    }, A = S(null), B = S([]);
    function U(T) {
      B.value = T;
    }
    function j() {
      return B.value;
    }
    const ee = ft((T) => {
      n("mentionSearch", T);
    }, 300);
    return _e(He, t.config.emoji), _e("mentionConfig", d), _e(Ye, It()), _e("changeMetionList", U), _e("mentionSearch", ee), s({
      remove: K,
      mentionList: B,
      getMentionList: j
    }), (T, F) => (v(), C("div", Es, [
      b(f) ? (v(), C("div", Os, [
        pe(T.$slots, "header", {}, () => [
          js
        ], !0),
        i("div", Rs, [
          i("div", Us, [
            M(b(Ge), {
              size: 40,
              src: T.config.user.avatar
            }, {
              default: I(() => [
                Ys
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          M(yt, Tt(T.$attrs, {
            ref_key: "inputBox",
            ref: A,
            placeholder: "输入评论（Enter换行，Ctrl + Enter发送）",
            "content-btn": "发表评论"
          }), null, 16)
        ])
      ])) : Y("", !0),
      b(l) ? (v(), C("div", Ns, [
        pe(T.$slots, "default", {}, () => [
          Ps
        ], !0),
        M(Ds, {
          data: b(o),
          total: b(y),
          "show-size": b(ge)(b(c), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])) : Y("", !0)
    ]));
  }
});
const Ws = /* @__PURE__ */ Z(qs, [["__scopeId", "data-v-23068117"]]), Zs = oe(Ws), Ks = [
  Zs,
  p1,
  w1,
  z1,
  H1,
  $t,
  bt,
  Le,
  wn,
  An,
  En,
  Wn,
  wo,
  jo,
  Mt,
  ns
];
const Js = (e) => {
  Ks.forEach((s) => {
    e.use(s);
  });
}, u2 = {
  install: Js
};
export {
  f2 as ElAvatar,
  v2 as ElButton,
  h2 as ElCarousel,
  m2 as ElDialog,
  _2 as ElDropdown,
  g2 as ElDropdownItem,
  y2 as ElDropdownMenu,
  w2 as ElImage,
  $2 as ElInput,
  b2 as ElLink,
  x2 as ElPagination,
  C2 as ElPopover,
  k2 as ElScrollbar,
  M2 as ElTag,
  He as InjectionEmojiApi,
  Wn as UAnchor,
  jo as UChat,
  Zs as UComment,
  w1 as UCommentNav,
  p1 as UCommentScroll,
  ns as UCounter,
  z1 as UDialog,
  H1 as UDivider,
  $t as UEditor,
  Mt as UEmoji,
  bt as UFold,
  Le as UIcon,
  En as UNoticeBar,
  wo as USearch,
  wn as USign,
  An as UTags,
  nt as UToast,
  qt as clear,
  Oe as cloneDeep,
  Rt as createGlobalNode,
  Zt as createObjectURL,
  Qe as dayjs,
  ft as debounce,
  n2 as deepTree,
  u2 as default,
  s2 as flattenDeep,
  Nt as get,
  Js as install,
  pt as isArray,
  t2 as isBoolean,
  be as isEmpty,
  Qs as isFunction,
  Wt as isImage,
  ge as isNull,
  jt as isNumber,
  Ot as isObject,
  e2 as isString,
  Pt as remove,
  r2 as removeEmptyField,
  Ut as removeGlobalNode,
  o2 as revDeepTree,
  Yt as set,
  Be as storage,
  Ce as str,
  l2 as throttle,
  i2 as toFormData,
  a2 as useBrowser,
  xt as useEmojiParse,
  $o as useLevel,
  c2 as usePage,
  S2 as vInfiniteScroll,
  oe as withInstall
};
