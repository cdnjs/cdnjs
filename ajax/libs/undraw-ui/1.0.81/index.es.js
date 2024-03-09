import { h as ze, render as St, defineComponent as Y, ref as F, reactive as de, inject as oe, withDirectives as he, openBlock as f, createElementBlock as b, createVNode as S, unref as $, normalizeClass as J, Transition as st, withCtx as T, createElementVNode as i, createCommentVNode as R, createBlock as X, createTextVNode as ae, toDisplayString as q, nextTick as ke, pushScopeId as ce, popScopeId as ue, computed as G, renderSlot as re, resolveComponent as pe, watch as me, createSlots as Lt, useCssVars as je, normalizeStyle as Ie, onMounted as xe, vShow as Se, withKeys as be, withModifiers as Fe, Fragment as le, renderList as ie, toRefs as at, onUnmounted as Ne, toRef as Ft, vModelText as zt, provide as ve, useSlots as It, mergeProps as Tt } from "vue";
import { ElButton as Ve, ClickOutside as lt, ElLink as it, ElInfiniteScroll as Ht, ElDialog as At, ElScrollbar as qe, ElEmpty as Bt, ElForm as Et, ElFormItem as Le, ElInput as Ee, ElCarousel as Vt, ElTag as Dt, ElAvatar as Ze, ElPopover as rt, ElImage as ct, ElPagination as jt } from "element-plus";
import { ElAvatar as na, ElButton as oa, ElCarousel as sa, ElDialog as aa, ElDropdown as la, ElDropdownItem as ia, ElDropdownMenu as ra, ElEmpty as ca, ElImage as ua, ElInput as da, ElLink as pa, ElPagination as fa, ElPopover as va, ElScrollbar as ha, ElTag as ma, ElTour as _a, ElInfiniteScroll as ga } from "element-plus";
/*! UndrawUi v1.0.81 */
function ut(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function Ot(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Rt(e) {
  return !isNaN(Number(e));
}
function Us(e) {
  return typeof e == "function";
}
function Ps(e) {
  return typeof e == "string";
}
function Ys(e) {
  return typeof e == "boolean";
}
function Ce(e) {
  return ut(e) ? e.length === 0 : Ot(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const ye = (e, o) => Ce(e) ? o : e;
function De(e) {
  if (typeof e != "object" || e === null)
    return e;
  let o;
  if (Array.isArray(e)) {
    o = [];
    for (let n = 0; n < e.length; n++)
      o[n] = De(e[n]);
  } else if (e instanceof Date)
    o = new Date(e.getTime());
  else if (e instanceof RegExp)
    o = new RegExp(e.source, e.flags);
  else {
    o = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (o[n] = De(e[n]));
  }
  return o;
}
function Ns(e, o = { parentId: "parentId", children: "children" }) {
  let n = ye(o.parentId, "parentId"), t = ye(o.children, "children");
  e = De(e);
  const s = [], a = {};
  return e.forEach((u) => a[u.id] = u), e.forEach((u) => {
    const r = a[u[n]];
    r ? (r[t] || (r[t] = [])).push(u) : s.push(u);
  }), s;
}
function Ws(e = [], o = { parentId: "parentId", children: "children" }) {
  let n = ye(o.parentId, "parentId"), t = ye(o.children, "children");
  const s = [], a = (u, r) => {
    u.forEach((m) => {
      m.id || (m.id = r++), m[n] = r, s.push(m), m[t] && ut(m[t]) && a(m[t], m.id);
    });
  };
  return a(e || [], null), s;
}
const qs = (e, o = 1 / 0) => e.flat(o), se = (e, o) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(o ?? {})])
      n.component(t.name, t);
  }, o)
    for (const [n, t] of Object.entries(o))
      e[n] = t;
  return e;
};
function Zs() {
  const { clientWidth: e } = document.documentElement, o = navigator.userAgent.toLowerCase();
  let n = (o.match(/firefox|chrome|safari|opera/g) || "other")[0];
  (o.match(/msie|trident/g) || [])[0] && (n = "msie");
  let t = "";
  "ontouchstart" in window || o.indexOf("touch") !== -1 || o.indexOf("mobile") !== -1 ? o.indexOf("ipad") !== -1 ? t = "pad" : o.indexOf("mobile") !== -1 ? t = "mobile" : o.indexOf("android") !== -1 ? t = "androidPad" : t = "pc" : t = "pc";
  let a = "";
  switch (n) {
    case "chrome":
    case "safari":
    case "mobile":
      a = "webkit";
      break;
    case "msie":
      a = "ms";
      break;
    case "firefox":
      a = "Moz";
      break;
    case "opera":
      a = "O";
      break;
    default:
      a = "webkit";
      break;
  }
  const u = o.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const m = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), w = (o.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], v = t === "pc", l = !v, M = r === "xs" || l, _ = window.innerHeight + "px";
  return {
    version: w,
    type: n,
    plat: u,
    tag: t,
    prefix: a,
    isMobile: l,
    isIOS: m,
    isPC: v,
    isMini: M,
    screen: r,
    innerHeight: _
  };
}
function Ut(e, o) {
  const n = ze(e, o), t = document.createElement("div");
  return document.body.append(t), St(n, t), { vnode: n, div: t };
}
function Pt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Oe = (e) => e ? "localStorage" : "sessionStorage", Yt = (e, o, n = !0) => {
  (o === "" || o === null || o === void 0) && (o = null), window[Oe(n)].setItem(e, JSON.stringify(o));
}, Nt = (e, o = !0) => {
  let n;
  const t = window[Oe(o)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Wt = (e, o = !0) => {
  window[Oe(o)].removeItem(e);
}, qt = (e = !0) => {
  window[Oe(e)].clear();
}, Be = {
  set: Yt,
  get: Nt,
  remove: Wt,
  clear: qt
}, dt = (e, o = 200, n = !1) => {
  let t = !1, s = null;
  const a = (...u) => new Promise((r, m) => {
    if (s && clearTimeout(s), n && !t) {
      const w = e.apply(void 0, u);
      r(w), t = !0;
    } else
      s = setTimeout(() => {
        const w = e.apply(void 0, u);
        r(w), t = !1, s = null;
      }, o);
  });
  return a.cancel = () => {
    s && clearTimeout(s), t = !1;
  }, a;
}, Ks = (e, o = 500) => {
  let n = 0;
  const t = (...s) => new Promise((a, u) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= o) {
      const m = e.apply(void 0, s);
      a(m), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, $e = (e) => e == null ? "" : String(e);
function Zt(e) {
  let o = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return o.indexOf(t.toLowerCase()) != -1;
}
function Kt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function Js(e) {
  const o = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((s, a) => o.append(n + `[${a}]`, s)) : o.append(n, e[n]);
  }), o;
}
function Gs(e) {
  return Object.keys(e).filter((o) => e[o] !== null && e[o] !== void 0).reduce((o, n) => ({ ...o, [n]: e[n] }), {});
}
var Ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ye = { exports: {} }, nt;
function ft() {
  return nt || (nt = 1, function(e, o) {
    (function(n, t) {
      e.exports = t();
    })(Ke, function() {
      var n = 1e3, t = 6e4, s = 36e5, a = "millisecond", u = "second", r = "minute", m = "hour", w = "day", v = "week", l = "month", M = "quarter", _ = "year", p = "date", C = "Invalid Date", O = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, j = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, K = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(g) {
        var d = ["th", "st", "nd", "rd"], c = g % 100;
        return "[" + g + (d[(c - 20) % 10] || d[c] || d[0]) + "]";
      } }, Q = function(g, d, c) {
        var x = String(g);
        return !x || x.length >= d ? g : "" + Array(d + 1 - x.length).join(c) + g;
      }, H = { s: Q, z: function(g) {
        var d = -g.utcOffset(), c = Math.abs(d), x = Math.floor(c / 60), h = c % 60;
        return (d <= 0 ? "+" : "-") + Q(x, 2, "0") + ":" + Q(h, 2, "0");
      }, m: function g(d, c) {
        if (d.date() < c.date())
          return -g(c, d);
        var x = 12 * (c.year() - d.year()) + (c.month() - d.month()), h = d.clone().add(x, l), z = c - h < 0, I = d.clone().add(x + (z ? -1 : 1), l);
        return +(-(x + (c - h) / (z ? h - I : I - h)) || 0);
      }, a: function(g) {
        return g < 0 ? Math.ceil(g) || 0 : Math.floor(g);
      }, p: function(g) {
        return { M: l, y: _, w: v, d: w, D: p, h: m, m: r, s: u, ms: a, Q: M }[g] || String(g || "").toLowerCase().replace(/s$/, "");
      }, u: function(g) {
        return g === void 0;
      } }, A = "en", L = {};
      L[A] = K;
      var B = function(g) {
        return g instanceof fe;
      }, P = function g(d, c, x) {
        var h;
        if (!d)
          return A;
        if (typeof d == "string") {
          var z = d.toLowerCase();
          L[z] && (h = z), c && (L[z] = c, h = z);
          var I = d.split("-");
          if (!h && I.length > 1)
            return g(I[0]);
        } else {
          var y = d.name;
          L[y] = d, h = y;
        }
        return !x && h && (A = h), h || !x && A;
      }, U = function(g, d) {
        if (B(g))
          return g.clone();
        var c = typeof d == "object" ? d : {};
        return c.date = g, c.args = arguments, new fe(c);
      }, D = H;
      D.l = P, D.i = B, D.w = function(g, d) {
        return U(g, { locale: d.$L, utc: d.$u, x: d.$x, $offset: d.$offset });
      };
      var fe = function() {
        function g(c) {
          this.$L = P(c.locale, null, !0), this.parse(c);
        }
        var d = g.prototype;
        return d.parse = function(c) {
          this.$d = function(x) {
            var h = x.date, z = x.utc;
            if (h === null)
              return /* @__PURE__ */ new Date(NaN);
            if (D.u(h))
              return /* @__PURE__ */ new Date();
            if (h instanceof Date)
              return new Date(h);
            if (typeof h == "string" && !/Z$/i.test(h)) {
              var I = h.match(O);
              if (I) {
                var y = I[2] - 1 || 0, k = (I[7] || "0").substring(0, 3);
                return z ? new Date(Date.UTC(I[1], y, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, k)) : new Date(I[1], y, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, k);
              }
            }
            return new Date(h);
          }(c), this.$x = c.x || {}, this.init();
        }, d.init = function() {
          var c = this.$d;
          this.$y = c.getFullYear(), this.$M = c.getMonth(), this.$D = c.getDate(), this.$W = c.getDay(), this.$H = c.getHours(), this.$m = c.getMinutes(), this.$s = c.getSeconds(), this.$ms = c.getMilliseconds();
        }, d.$utils = function() {
          return D;
        }, d.isValid = function() {
          return this.$d.toString() !== C;
        }, d.isSame = function(c, x) {
          var h = U(c);
          return this.startOf(x) <= h && h <= this.endOf(x);
        }, d.isAfter = function(c, x) {
          return U(c) < this.startOf(x);
        }, d.isBefore = function(c, x) {
          return this.endOf(x) < U(c);
        }, d.$g = function(c, x, h) {
          return D.u(c) ? this[x] : this.set(h, c);
        }, d.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, d.valueOf = function() {
          return this.$d.getTime();
        }, d.startOf = function(c, x) {
          var h = this, z = !!D.u(x) || x, I = D.p(c), y = function(we, ne) {
            var ge = D.w(h.$u ? Date.UTC(h.$y, ne, we) : new Date(h.$y, ne, we), h);
            return z ? ge : ge.endOf(w);
          }, k = function(we, ne) {
            return D.w(h.toDate()[we].apply(h.toDate("s"), (z ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ne)), h);
          }, E = this.$W, V = this.$M, N = this.$D, W = "set" + (this.$u ? "UTC" : "");
          switch (I) {
            case _:
              return z ? y(1, 0) : y(31, 11);
            case l:
              return z ? y(1, V) : y(0, V + 1);
            case v:
              var te = this.$locale().weekStart || 0, ee = (E < te ? E + 7 : E) - te;
              return y(z ? N - ee : N + (6 - ee), V);
            case w:
            case p:
              return k(W + "Hours", 0);
            case m:
              return k(W + "Minutes", 1);
            case r:
              return k(W + "Seconds", 2);
            case u:
              return k(W + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, d.endOf = function(c) {
          return this.startOf(c, !1);
        }, d.$set = function(c, x) {
          var h, z = D.p(c), I = "set" + (this.$u ? "UTC" : ""), y = (h = {}, h[w] = I + "Date", h[p] = I + "Date", h[l] = I + "Month", h[_] = I + "FullYear", h[m] = I + "Hours", h[r] = I + "Minutes", h[u] = I + "Seconds", h[a] = I + "Milliseconds", h)[z], k = z === w ? this.$D + (x - this.$W) : x;
          if (z === l || z === _) {
            var E = this.clone().set(p, 1);
            E.$d[y](k), E.init(), this.$d = E.set(p, Math.min(this.$D, E.daysInMonth())).$d;
          } else
            y && this.$d[y](k);
          return this.init(), this;
        }, d.set = function(c, x) {
          return this.clone().$set(c, x);
        }, d.get = function(c) {
          return this[D.p(c)]();
        }, d.add = function(c, x) {
          var h, z = this;
          c = Number(c);
          var I = D.p(x), y = function(V) {
            var N = U(z);
            return D.w(N.date(N.date() + Math.round(V * c)), z);
          };
          if (I === l)
            return this.set(l, this.$M + c);
          if (I === _)
            return this.set(_, this.$y + c);
          if (I === w)
            return y(1);
          if (I === v)
            return y(7);
          var k = (h = {}, h[r] = t, h[m] = s, h[u] = n, h)[I] || 1, E = this.$d.getTime() + c * k;
          return D.w(E, this);
        }, d.subtract = function(c, x) {
          return this.add(-1 * c, x);
        }, d.format = function(c) {
          var x = this, h = this.$locale();
          if (!this.isValid())
            return h.invalidDate || C;
          var z = c || "YYYY-MM-DDTHH:mm:ssZ", I = D.z(this), y = this.$H, k = this.$m, E = this.$M, V = h.weekdays, N = h.months, W = function(ne, ge, Pe, Ae) {
            return ne && (ne[ge] || ne(x, z)) || Pe[ge].slice(0, Ae);
          }, te = function(ne) {
            return D.s(y % 12 || 12, ne, "0");
          }, ee = h.meridiem || function(ne, ge, Pe) {
            var Ae = ne < 12 ? "AM" : "PM";
            return Pe ? Ae.toLowerCase() : Ae;
          }, we = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: E + 1, MM: D.s(E + 1, 2, "0"), MMM: W(h.monthsShort, E, N, 3), MMMM: W(N, E), D: this.$D, DD: D.s(this.$D, 2, "0"), d: String(this.$W), dd: W(h.weekdaysMin, this.$W, V, 2), ddd: W(h.weekdaysShort, this.$W, V, 3), dddd: V[this.$W], H: String(y), HH: D.s(y, 2, "0"), h: te(1), hh: te(2), a: ee(y, k, !0), A: ee(y, k, !1), m: String(k), mm: D.s(k, 2, "0"), s: String(this.$s), ss: D.s(this.$s, 2, "0"), SSS: D.s(this.$ms, 3, "0"), Z: I };
          return z.replace(j, function(ne, ge) {
            return ge || we[ne] || I.replace(":", "");
          });
        }, d.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, d.diff = function(c, x, h) {
          var z, I = D.p(x), y = U(c), k = (y.utcOffset() - this.utcOffset()) * t, E = this - y, V = D.m(this, y);
          return V = (z = {}, z[_] = V / 12, z[l] = V, z[M] = V / 3, z[v] = (E - k) / 6048e5, z[w] = (E - k) / 864e5, z[m] = E / s, z[r] = E / t, z[u] = E / n, z)[I] || E, h ? V : D.a(V);
        }, d.daysInMonth = function() {
          return this.endOf(l).$D;
        }, d.$locale = function() {
          return L[this.$L];
        }, d.locale = function(c, x) {
          if (!c)
            return this.$L;
          var h = this.clone(), z = P(c, x, !0);
          return z && (h.$L = z), h;
        }, d.clone = function() {
          return D.w(this.$d, this);
        }, d.toDate = function() {
          return new Date(this.valueOf());
        }, d.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, d.toISOString = function() {
          return this.$d.toISOString();
        }, d.toString = function() {
          return this.$d.toUTCString();
        }, g;
      }(), _e = fe.prototype;
      return U.prototype = _e, [["$ms", a], ["$s", u], ["$m", r], ["$H", m], ["$W", w], ["$M", l], ["$y", _], ["$D", p]].forEach(function(g) {
        _e[g[1]] = function(d) {
          return this.$g(d, g[0], g[1]);
        };
      }), U.extend = function(g, d) {
        return g.$i || (g(d, fe, U), g.$i = !0), U;
      }, U.locale = P, U.isDayjs = B, U.unix = function(g) {
        return U(1e3 * g);
      }, U.en = L[A], U.Ls = L, U.p = {}, U;
    });
  }(Ye)), Ye.exports;
}
var Jt = ft();
const Je = /* @__PURE__ */ pt(Jt);
var Gt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t(ft());
  })(Ke, function(n) {
    function t(u) {
      return u && typeof u == "object" && "default" in u ? u : { default: u };
    }
    var s = t(n), a = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(u, r) {
      return r === "W" ? u + "周" : u + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(u, r) {
      var m = 100 * u + r;
      return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1100 ? "上午" : m < 1300 ? "中午" : m < 1800 ? "下午" : "晚上";
    } };
    return s.default.locale(a, null, !0), a;
  });
})(Gt);
var vt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t();
  })(Ke, function() {
    return function(n, t, s) {
      n = n || {};
      var a = t.prototype, u = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(w, v, l, M) {
        return a.fromToBase(w, v, l, M);
      }
      s.en.relativeTime = u, a.fromToBase = function(w, v, l, M, _) {
        for (var p, C, O, j = l.$locale().relativeTime || u, K = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], Q = K.length, H = 0; H < Q; H += 1) {
          var A = K[H];
          A.d && (p = M ? s(w).diff(l, A.d, !0) : l.diff(w, A.d, !0));
          var L = (n.rounding || Math.round)(Math.abs(p));
          if (O = p > 0, L <= A.r || !A.r) {
            L <= 1 && H > 0 && (A = K[H - 1]);
            var B = j[A.l];
            _ && (L = _("" + L)), C = typeof B == "string" ? B.replace("%d", L) : B(L, v, A.l, O);
            break;
          }
        }
        if (v)
          return C;
        var P = O ? j.future : j.past;
        return typeof P == "function" ? P(C) : P.replace("%s", C);
      }, a.to = function(w, v) {
        return r(w, v, this, !0);
      }, a.from = function(w, v) {
        return r(w, v, this);
      };
      var m = function(w) {
        return w.$u ? s.utc() : s();
      };
      a.toNow = function(w) {
        return this.to(m(this), w);
      }, a.fromNow = function(w) {
        return this.from(m(this), w);
      };
    };
  });
})(vt);
var Qt = vt.exports;
const Xt = /* @__PURE__ */ pt(Qt);
Je.locale("zh-cn");
Je.extend(Xt);
const Re = Symbol(), ht = Symbol(), Ge = Symbol(), We = Symbol(), mt = (e) => (ce("data-v-a515035d"), e = e(), ue(), e), en = { class: "comment-box" }, tn = {
  key: 0,
  class: "action-box"
}, nn = /* @__PURE__ */ mt(() => /* @__PURE__ */ i("svg", {
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
], -1)), on = /* @__PURE__ */ mt(() => /* @__PURE__ */ i("span", null, "图片", -1)), sn = { class: "btn-box" }, an = /* @__PURE__ */ Y({
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
    const t = e, s = F(""), a = F(!1), u = F(!0), r = F(), m = F(), w = F(), v = F([]), l = F([]), M = de({
      imgLength: 0
    }), _ = (g) => {
      l.value = g;
    }, p = (g) => {
      Ce(s.value.replace(/&nbsp;|<br>| /g, "")) ? u.value = !0 : u.value = !1;
    }, { upload: C, submit: O, focus: j } = oe(ht), K = oe(He), Q = () => {
      O({
        content: t.reply && t.parentId != t.reply.id ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${s.value}` : s.value,
        parentId: ye(t.parentId, null),
        reply: t.reply,
        files: l.value,
        clear: () => {
          L(), n("close");
        }
      });
    }, H = oe("cancelFn"), A = () => {
      L(), n("close"), H();
    }, L = () => {
      r.value.clear(), v.value.length = 0, l.value = [], u.value = !0;
    };
    function B(g) {
      Ce(s.value) && !M.imgLength && (a.value = !1, n("hide", g));
    }
    function P() {
      a.value = !0, ke(() => {
        m.value = document.querySelector("div[id^='el-popper-container']");
      }), j();
    }
    function U() {
      console.log(r.value);
    }
    o({
      focus: () => {
        var g;
        return (g = r.value) == null ? void 0 : g.focus();
      },
      changeMentionShow: (g) => {
        var d;
        return (d = r.value) == null ? void 0 : d.changeMentionShow(g);
      },
      AddMention: U
    });
    const D = (g, d) => {
      var x;
      d || (v.value.length = 0, l.value.length = 0);
      const c = d ? [d] : (x = w.value) == null ? void 0 : x.files;
      if (M.imgLength = ye(c == null ? void 0 : c.length, 0), c)
        for (let h = 0; h < c.length; h++) {
          let z = c[h].name, I = Kt(c[h]);
          l.value.push(c[h]), Zt(z) ? v.value.push(I) : Xe({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, fe = oe(Re), _e = () => ze("div", fe.func());
    return (g, d) => he((f(), b("div", en, [
      S($(yt), {
        ref_key: "editorRef",
        ref: r,
        modelValue: s.value,
        "onUpdate:modelValue": d[0] || (d[0] = (c) => s.value = c),
        class: J({ "input-active": a.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": v.value,
        onClick: d[1] || (d[1] = () => a.value = !0),
        onFocus: P,
        onInput: p,
        onSubmit: Q,
        onPaste: D,
        onChangeImgListFn: _
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      S(st, { name: "fade" }, {
        default: T(() => [
          a.value ? (f(), b("div", tn, [
            S($(xt), {
              emoji: $(K),
              onAddEmoji: d[2] || (d[2] = (c) => {
                var x;
                return (x = r.value) == null ? void 0 : x.addText(c);
              })
            }, null, 8, ["emoji"]),
            $(C) ? (f(), b("div", {
              key: 0,
              class: "picture",
              onClick: d[3] || (d[3] = //@ts-ignore
              (...c) => {
                var x, h;
                return ((x = w.value) == null ? void 0 : x.click) && ((h = w.value) == null ? void 0 : h.click(...c));
              })
            }, [
              nn,
              on,
              i("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: w,
                type: "file",
                multiple: "",
                onChange: D
              }, null, 544)
            ])) : R("", !0),
            $(fe).func ? (f(), X(_e, { key: 1 })) : R("", !0),
            i("div", sn, [
              S($(Ve), {
                type: "primary",
                disabled: u.value,
                onClick: Q
              }, {
                default: T(() => [
                  ae(q(t.contentBtn), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              t.cancelBtn ? (f(), X($(Ve), {
                key: 0,
                onClick: A
              }, {
                default: T(() => [
                  ae(q(t.cancelBtn), 1)
                ]),
                _: 1
              })) : R("", !0)
            ])
          ])) : R("", !0)
        ]),
        _: 1
      })
    ])), [
      [$(lt), B, m.value]
    ]);
  }
});
const Z = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [t, s] of o)
    n[t] = s;
  return n;
}, _t = /* @__PURE__ */ Z(an, [["__scopeId", "data-v-a515035d"]]), ln = { class: "u-comment-scroll" }, rn = ["infinite-scroll-disabled"], cn = { class: "scroll-btn" }, un = { key: 1 }, dn = { key: 2 }, pn = /* @__PURE__ */ Y({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: o }) {
    const n = e, t = F(!1), s = F(!1), a = G(() => s.value && n.disable), u = G(() => !s.value || t.value || a.value), r = dt(() => {
      o("more"), t.value = !1;
    }, 500), m = () => {
      t.value = !0, r();
    };
    return (w, v) => (f(), b("div", ln, [
      he((f(), b("div", {
        "infinite-scroll-disabled": u.value,
        "infinite-scroll-distance": "2"
      }, [
        re(w.$slots, "default", {}, void 0, !0),
        i("div", cn, [
          s.value ? R("", !0) : (f(), X($(it), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: v[0] || (v[0] = (l) => s.value = !s.value)
          }, {
            default: T(() => [
              ae("加载更多")
            ]),
            _: 1
          })),
          t.value ? (f(), b("p", un, "加载中...")) : R("", !0),
          a.value ? (f(), b("p", dn, "没有更多了")) : R("", !0)
        ])
      ], 8, rn)), [
        [$(Ht), m]
      ])
    ]));
  }
});
const fn = /* @__PURE__ */ Z(pn, [["__scopeId", "data-v-404b6e08"]]), vn = se(fn), Qe = (e) => (ce("data-v-3e026489"), e = e(), ue(), e), hn = { class: "nav" }, mn = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("span", { class: "nav__title" }, "全部评论", -1)), _n = { class: "nav__sort" }, gn = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("svg", {
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
], -1)), yn = /* @__PURE__ */ Qe(() => /* @__PURE__ */ i("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ i("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), wn = /* @__PURE__ */ Y({
  name: "uCommentNav",
  __name: "comment-nav",
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: o }) {
    const n = e, t = G({
      get() {
        return n.modelValue;
      },
      set(s) {
        o("update:modelValue", s), o("sorted", s);
      }
    });
    return (s, a) => {
      const u = pe("u-icon");
      return f(), b("div", hn, [
        mn,
        i("div", _n, [
          i("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: a[0] || (a[0] = (r) => t.value = !0)
          }, [
            S(u, null, {
              default: T(() => [
                gn
              ]),
              _: 1
            }),
            ae(" 最新 ")
          ], 2),
          i("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: a[1] || (a[1] = (r) => t.value = !1)
          }, [
            S(u, null, {
              default: T(() => [
                yn
              ]),
              _: 1
            }),
            ae(" 最热 ")
          ], 2)
        ])
      ]);
    };
  }
});
const $n = /* @__PURE__ */ Z(wn, [["__scopeId", "data-v-3e026489"]]), bn = se($n), gt = (e) => (ce("data-v-97244130"), e = e(), ue(), e), Cn = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, xn = /* @__PURE__ */ gt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), kn = [
  xn
], Mn = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Sn = /* @__PURE__ */ gt(() => /* @__PURE__ */ i("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), Ln = [
  Sn
], Fn = /* @__PURE__ */ Y({
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
    const n = e, t = F(!1), s = F(!1);
    return me(
      () => n.modelValue,
      (a) => {
        t.value = a;
      },
      {
        immediate: !0
      }
    ), me(
      () => t.value,
      (a) => {
        o("update:modelValue", a);
      }
    ), (a, u) => (f(), X($(At), {
      id: "u-dialog",
      modelValue: t.value,
      "onUpdate:modelValue": u[1] || (u[1] = (r) => t.value = r),
      "close-on-click-modal": a.closeOnClickModal,
      title: a.title,
      width: a.width,
      top: a.top,
      fullscreen: s.value,
      center: a.center,
      "before-close": a.beforeClose,
      draggable: ""
    }, Lt({
      default: T(() => [
        i("div", {
          class: "full-screen",
          onClick: u[0] || (u[0] = (r) => s.value = !s.value)
        }, [
          s.value ? (f(), b("svg", Cn, kn)) : (f(), b("svg", Mn, Ln))
        ]),
        re(a.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      a.$slots.footer ? {
        name: "footer",
        fn: T(() => [
          re(a.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const zn = /* @__PURE__ */ Z(Fn, [["__scopeId", "data-v-97244130"]]), In = se(zn), Tn = { class: "field" }, Hn = /* @__PURE__ */ Y({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const o = e;
    je((t) => ({
      d59c4402: o.borderStyle
    }));
    const n = F();
    return me(
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
    ), (t, s) => (f(), b("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      i("fieldset", Tn, [
        t.$slots.default || t.vertical ? (f(), b("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          re(t.$slots, "default", {}, void 0, !0)
        ], 2)) : R("", !0)
      ])
    ], 2));
  }
});
const An = /* @__PURE__ */ Z(Hn, [["__scopeId", "data-v-153d9bc7"]]), Bn = se(An), En = [
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
], Vn = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function Dn(e) {
  return En.find((o) => o.type === e);
}
function jn() {
  return Vn;
}
const On = {
  key: 1,
  "aria-hidden": "true"
}, Rn = ["xlink:href"], Un = /* @__PURE__ */ Y({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const o = e, n = G(() => "#" + o.name), t = G(() => ({
      fontSize: Rt(o.size) ? o.size + "px" : o.size,
      color: o.color
    }));
    return (s, a) => (f(), b("i", {
      class: "u-icon",
      style: Ie(t.value)
    }, [
      s.$slots.default ? re(s.$slots, "default", { key: 0 }, void 0, !0) : (f(), b("svg", On, [
        i("use", { "xlink:href": n.value }, null, 8, Rn)
      ]))
    ], 4));
  }
});
const Pn = /* @__PURE__ */ Z(Un, [["__scopeId", "data-v-dd34e834"]]), Me = se(Pn), Yn = { class: "v-toast" }, Nn = { class: "inner" }, Wn = { class: "message" }, qn = /* @__PURE__ */ Y({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const o = e;
    je((s) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = de(jn().options), t = F(!1);
    return me(
      () => o.type,
      (s) => {
        const a = Dn(s);
        a && (n.color = a.options.color, n.bgColor = a.options.bgColor, n.icon = a.options.icon);
      },
      { immediate: !0 }
    ), xe(() => {
      t.value = !0, setTimeout(() => {
        t.value = !1;
      }, o.duration);
    }), (s, a) => (f(), b("div", Yn, [
      S(st, { name: "v-toast" }, {
        default: T(() => [
          he(i("div", Nn, [
            i("div", Wn, [
              n.icon ? (f(), X($(Me), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : R("", !0),
              i("span", {
                class: J({ normal: s.type != "normal" })
              }, q(s.message), 3)
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
const Zn = /* @__PURE__ */ Z(qn, [["__scopeId", "data-v-7d3c50e0"]]);
function Xe(e) {
  let o = e.duration;
  if (!e.message)
    return;
  e.duration = o || 1e3;
  const { vnode: n, div: t } = Ut(Zn, e);
  return setTimeout(() => {
    Pt(t);
  }, e.duration + 300), n;
}
const Kn = ["onKeydown"], Jn = ["onClick"], Gn = { class: "userInfo" }, Qn = ["src"], Xn = { class: "username" }, eo = { class: "empty" }, to = /* @__PURE__ */ Y({
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
    const t = e, s = F(), a = F(-1), u = F(null), r = (l) => {
      var M;
      if (a.value += l, a.value < 0 ? a.value = t.list.length - 1 : a.value >= t.list.length && (a.value = 0), s.value) {
        const _ = s.value.wrapRef.children[0].children[a.value];
        if (_) {
          const p = s.value.wrapRef.offsetHeight || 0;
          (M = s.value) == null || M.setScrollTop((a.value - p / _.offsetHeight + 1) * _.offsetHeight);
        }
      }
    }, m = () => {
      if (a.value >= 0 && a.value < t.list.length)
        return t.list[a.value];
    }, w = (l) => {
      a.value = l, n("insert", t.list[a.value]), n("changeShow", !1);
    };
    me(
      () => t.isShow,
      (l) => {
        l && (a.value = 0, ke(() => {
          s.value && s.value.setScrollTop(0);
        }));
      }
    );
    const v = () => {
      a.value = 0;
    };
    return xe(() => {
      var l;
      (l = u.value) == null || l.focus();
    }), o({
      moveSelection: r,
      printSelectedItem: m,
      resetSelectIndex: v
    }), (l, M) => he((f(), b("ul", {
      ref_key: "mentionList",
      ref: u,
      class: "mention-list",
      tabindex: "0",
      style: Ie(`left: ${l.position.left}px; top: ${l.position.top}px`),
      onKeydown: [
        M[0] || (M[0] = be(Fe((_) => r(-1), ["prevent"]), ["up"])),
        M[1] || (M[1] = be(Fe((_) => r(1), ["prevent"]), ["down"])),
        be(Fe(m, ["prevent"]), ["enter"])
      ]
    }, [
      S($(qe), {
        ref_key: "scrollbarRef",
        ref: s,
        style: { padding: "10px" }
      }, {
        default: T(() => [
          (f(!0), b(le, null, ie(l.list, (_, p) => (f(), b("li", {
            key: p,
            class: J({ hover: p === a.value }),
            onClick: (C) => w(p)
          }, [
            re(l.$slots, "user", {
              item: _,
              index: p
            }, () => [
              i("div", Gn, [
                l.showAvatar ? (f(), b("img", {
                  key: 0,
                  src: _.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, Qn)) : R("", !0),
                i("span", Xn, q(_.userName), 1)
              ])
            ], !0)
          ], 10, Jn))), 128)),
          he(i("div", eo, [
            S($(Bt), { description: "暂无匹配数据" })
          ], 512), [
            [Se, !l.list.length]
          ])
        ]),
        _: 3
      }, 512)
    ], 44, Kn)), [
      [Se, l.isShow]
    ]);
  }
});
const no = /* @__PURE__ */ Z(to, [["__scopeId", "data-v-14aad4a8"]]), oo = (e) => (ce("data-v-86bd30aa"), e = e(), ue(), e), so = ["placeholder", "onKeydown", "innerHTML"], ao = ["src"], lo = ["onClick"], io = /* @__PURE__ */ oo(() => /* @__PURE__ */ i("svg", {
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
], -1)), ro = [
  io
], co = /* @__PURE__ */ Y({
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
    je((y) => ({
      "218d6e86": A.value,
      "271743be": L.value
    }));
    const s = F(null), a = F(!1), u = F({
      left: 0,
      top: 0
    });
    function r(y) {
      a.value = y, y || (B.value = "");
    }
    function m(y) {
      u.value = y;
    }
    function w(y) {
      s.value && s.value.moveSelection(y);
    }
    function v() {
      if (s.value)
        return s.value.printSelectedItem();
    }
    const l = oe("mentionConfig"), M = oe("changeMetionList"), _ = oe("mentionSearch"), p = F(), C = F(), O = F(), j = F(!1), K = F(!1), Q = F(), { imgList: H } = at(t), A = G(() => t.minHeight + "px"), L = G(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), B = F("");
    me(
      () => t.modelValue,
      (y, k) => {
        var V;
        if (j.value || (O.value = y), !((V = l == null ? void 0 : l.value) != null && V.show))
          return;
        y = y.replace(/<br>/g, ""), k = k.replace(/<br>/g, ""), (k.length >= y.length && k.slice(-1) === "@" || y.slice(-7) === "@&nbsp;") && r(!1), a.value && y.slice(-6) !== "&nbsp;" ? (B.value = y.split("@").pop() || "", B.value = B.value.replace("'", ""), console.log(B.value), _(B.value), s.value && s.value.resetSelectIndex()) : a.value && y.slice(-6) === "&nbsp;" && r(!1);
        let E = y.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (E) {
          let N = E.map((te) => {
            let ee = te.match(/data-id="([^"]*)"/);
            return ee ? ee[1] : null;
          }), W = l.value.userArr.filter(
            (te) => N.includes(`${te[l.value.userIdKey]}`)
          );
          M(W);
        } else
          M([]);
      }
    );
    function P(y) {
      n("focus", y), j.value = !0, K.value = !0;
    }
    function U(y) {
      var k, E;
      try {
        p.value = (k = window.getSelection()) == null ? void 0 : k.getRangeAt(0);
      } catch (V) {
        console.log(V);
      }
      n("blur", y), (E = C.value) != null && E.innerHTML || (K.value = !1), j.value = !1;
    }
    function D(y) {
      w(y);
    }
    function fe(y) {
      var E, V;
      const { innerHTML: k } = y.target;
      if (y.data === "@" && (l != null && l.value.show)) {
        try {
          p.value = (E = window.getSelection()) == null ? void 0 : E.getRangeAt(0);
        } catch (W) {
          console.log(W);
        }
        let N = (V = p.value) == null ? void 0 : V.getBoundingClientRect();
        r(!0), N && m({
          left: N.left,
          top: N.top + N.height + 10
        });
      }
      n("update:modelValue", k), n("input", y);
    }
    function _e(y, k) {
      var V, N;
      let E = window.getSelection();
      if (E) {
        if (E.removeAllRanges(), p.value || ((V = C.value) == null || V.focus(), p.value = E.getRangeAt(0)), k && !B.value)
          p.value.startOffset > 0 && (p.value.setStart(p.value.startContainer, p.value.startOffset - 1), p.value.deleteContents());
        else if (k && B.value) {
          let te = B.value.length + 1, ee = p.value.startContainer.data.lastIndexOf("@" + B.value);
          ee !== -1 && (p.value.setStart(p.value.startContainer, ee), p.value.setEnd(p.value.startContainer, ee + te), p.value.deleteContents());
        }
        p.value.deleteContents(), p.value.insertNode(p.value.createContextualFragment(y)), p.value.collapse(!1), E.addRange(p.value), n("update:modelValue", ((N = C.value) == null ? void 0 : N.innerHTML) || "");
        const W = C.value;
        n("input", W);
      }
    }
    function g(y) {
      const k = y.clipboardData;
      if (k) {
        const E = k.getData("text/plain"), V = k.items.length > 0 ? k.items[0].getAsFile() : null;
        E ? (y.preventDefault(), document.execCommand("insertText", !1, E)) : V && (console.log(V), y.preventDefault(), n("paste", y, V));
      }
    }
    function d() {
      C.value && (C.value.innerHTML = "", n("update:modelValue", C.value.innerHTML), K.value = !1);
    }
    function c() {
      ke(() => {
        var y;
        (y = C.value) == null || y.focus();
      });
    }
    function x(y) {
      if (y) {
        let k = I(y);
        _e(`${k} `, !0);
      }
    }
    const h = (y) => {
      if (y.ctrlKey && y.key == "Enter")
        Ce(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? Xe({ message: "内容不能为空", type: "info" }) : n("submit");
      else if (y.key == "Enter" && a.value) {
        y.preventDefault();
        const k = v();
        x(k), r(!1);
      }
    }, z = (y) => {
      var k;
      (k = H == null ? void 0 : H.value) == null || k.splice(y, 1), n("changeImgListFn", De(H == null ? void 0 : H.value));
    };
    xe(() => {
    }), o({
      addText: _e,
      clear: d,
      focus: c,
      imageRef: Q,
      insertUser: x,
      changeMentionShow: r
    });
    const I = (y) => {
      const k = y[l.value.userNameKey], E = y[l.value.userIdKey], V = l.value.mentionColor || "#409eff", N = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${k}</text>
    </svg>
  `, W = document.createElement("div");
      W.style.visibility = "hidden", W.innerHTML = N, document.body.appendChild(W);
      const te = W.querySelector("text");
      let ee = 200;
      te && (ee = te.getComputedTextLength()), document.body.removeChild(W);
      const we = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${ee}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${V}; }
      </style>
      <text x="0" y="15" class="mention-text">@${k}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent(we).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${k}" style="width:${ee}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${k}" data-id="${E}"
     draggable="false"
    >`;
    };
    return (y, k) => {
      var E, V;
      return f(), b("div", {
        class: J(["u-editor", { active: K.value }])
      }, [
        i("div", {
          ref_key: "editorRef",
          ref: C,
          class: "rich-input",
          contenteditable: "",
          placeholder: y.placeholder,
          onFocus: P,
          onInput: fe,
          onBlur: U,
          onKeydown: [
            be(h, ["enter"]),
            k[0] || (k[0] = be(Fe((N) => D(-1), ["prevent"]), ["up"])),
            k[1] || (k[1] = be(Fe((N) => D(1), ["prevent"]), ["down"]))
          ],
          onPaste: g,
          innerHTML: O.value
        }, null, 40, so),
        i("div", {
          ref_key: "imageRef",
          ref: Q,
          class: "image-preview-box"
        }, [
          (f(!0), b(le, null, ie($(H), (N, W) => (f(), b("div", {
            key: W,
            class: "image-preview"
          }, [
            i("img", {
              src: N,
              alt: ""
            }, null, 8, ao),
            i("div", {
              class: "clean-btn",
              onClick: (te) => z(W)
            }, ro, 8, lo)
          ]))), 128))
        ], 512),
        S(no, {
          ref_key: "metionList",
          ref: s,
          "is-show": a.value,
          position: u.value,
          list: (E = $(l)) == null ? void 0 : E.userArr,
          "show-avatar": (V = $(l)) == null ? void 0 : V.showAvatar,
          onInsert: x,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"])
      ], 2);
    };
  }
});
const uo = /* @__PURE__ */ Z(co, [["__scopeId", "data-v-86bd30aa"]]), yt = se(uo);
const po = { class: "u-fold" }, fo = { class: "action-box select-none" }, vo = /* @__PURE__ */ Y({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const o = e;
    je((m) => ({
      "3ff38980": n.value
    }));
    const n = G(() => {
      let m = Math.trunc(Number(o.line));
      return m > 0 ? m : 1;
    }), t = F(!0), s = F(!1), a = F(), u = F();
    let r;
    return xe(() => {
      r = new ResizeObserver((m) => {
        t.value && a.value && u.value && (s.value = u.value.clientHeight < a.value.scrollHeight);
      }), r.observe(a.value);
    }), Ne(() => {
      r == null || r.disconnect();
    }), (m, w) => (f(), b("div", po, [
      i("div", {
        ref_key: "textBox",
        ref: u,
        class: J(["txt-box", { "over-hidden": t.value }])
      }, [
        i("div", {
          ref_key: "divBox",
          ref: a
        }, [
          re(m.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      i("div", fo, [
        s.value && m.unfold ? (f(), b("div", {
          key: 0,
          class: "expand-btn",
          onClick: w[0] || (w[0] = (v) => t.value = !t.value)
        }, q(t.value ? "展开" : "收起"), 1)) : R("", !0)
      ])
    ]));
  }
});
const ho = /* @__PURE__ */ Z(vo, [["__scopeId", "data-v-73f3787c"]]), wt = se(ho), mo = /* @__PURE__ */ Y({
  __name: "form",
  props: {
    modelValue: {}
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: o, emit: n }) {
    const t = e, s = de({
      type: "",
      email: "",
      password: ""
    }), a = (p, C, O) => {
      const j = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!C)
        return O("请输入邮箱!");
      j.test(C) || O("邮箱地址不合法"), O();
    }, u = (p, C, O) => {
      C ? C != s.password ? O("输入密码不一致") : O() : O("请确认密码");
    }, r = F(), m = F(), w = de({
      email: {
        required: !0,
        validator: a,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "请输入密码"
      }
    }), v = de({
      email: {
        required: !0,
        validator: a,
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
    }), l = de({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    me(
      () => t.modelValue,
      (p) => {
        switch (ke(() => _()), p) {
          case "login":
            m.value = w, l.type = "登录", l.one = { key: "register", value: "邮箱注册" }, l.two = { key: "forget", value: "忘记密码" };
            break;
          case "register":
            m.value = w, l.type = "注册", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
          case "forget":
            m.value = v, l.type = "修改密码", l.one = { key: "login", value: "邮箱登录" }, l.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function M() {
      s.type = t.modelValue, r.value.validate((p) => {
        p && n("submit", s);
      });
    }
    function _() {
      r.value.resetFields();
    }
    return o({
      reset: _
    }), (p, C) => {
      const O = pe("el-button");
      return f(), X($(Et), {
        ref_key: "ruleFormRef",
        ref: r,
        model: s,
        rules: m.value,
        class: "select-none"
      }, {
        default: T(() => [
          S($(Le), { prop: "email" }, {
            default: T(() => [
              S($(Ee), {
                modelValue: s.email,
                "onUpdate:modelValue": C[0] || (C[0] = (j) => s.email = j),
                placeholder: "请输入邮箱",
                onFocus: C[1] || (C[1] = (j) => p.$emit("toggle", 1)),
                onBlur: C[2] || (C[2] = (j) => p.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          S($(Le), { prop: "password" }, {
            default: T(() => [
              S($(Ee), {
                modelValue: s.password,
                "onUpdate:modelValue": C[3] || (C[3] = (j) => s.password = j),
                placeholder: "请输入密码",
                onFocus: C[4] || (C[4] = (j) => p.$emit("toggle", 2)),
                onBlur: C[5] || (C[5] = (j) => p.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          he(S($(Le), { prop: "checkPass" }, {
            default: T(() => [
              S($(Ee), {
                modelValue: s.checkPass,
                "onUpdate:modelValue": C[6] || (C[6] = (j) => s.checkPass = j),
                placeholder: "请确认密码",
                onFocus: C[7] || (C[7] = (j) => p.$emit("toggle", 2)),
                onBlur: C[8] || (C[8] = (j) => p.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [Se, p.modelValue == "forget"]
          ]),
          S($(Le), null, {
            default: T(() => [
              S(O, {
                style: { width: "100%" },
                type: "primary",
                onClick: M
              }, {
                default: T(() => [
                  ae(q(l.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          S($(Le), null, {
            default: T(() => [
              i("div", {
                onClick: C[9] || (C[9] = (j) => p.$emit("update:modelValue", l.one.key))
              }, q(l.one.value), 1),
              i("div", {
                onClick: C[10] || (C[10] = (j) => p.$emit("update:modelValue", l.two.key))
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
const _o = /* @__PURE__ */ Z(mo, [["__scopeId", "data-v-525985f8"]]), go = { class: "u-sign" }, yo = { class: "sign-oauth" }, wo = /* @__PURE__ */ Y({
  name: "USign",
  __name: "sign",
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = F(!1), t = F("login"), s = F(0), a = G(() => {
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
      const m = pe("u-divider"), w = pe("u-icon"), v = pe("u-dialog");
      return f(), b("div", go, [
        S($(Ve), {
          link: "",
          onClick: r[0] || (r[0] = (l) => n.value = !0)
        }, {
          default: T(() => [
            ae("登录/注册")
          ]),
          _: 1
        }),
        S(v, {
          modelValue: n.value,
          "onUpdate:modelValue": r[4] || (r[4] = (l) => n.value = l),
          title: a.value,
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: T(() => [
            S(_o, {
              modelValue: t.value,
              "onUpdate:modelValue": r[1] || (r[1] = (l) => t.value = l),
              onToggle: r[2] || (r[2] = (l) => s.value = l),
              onSubmit: r[3] || (r[3] = (l) => u.$emit("submit", l))
            }, null, 8, ["modelValue"]),
            S(m, null, {
              default: T(() => [
                ae("其他方式登录")
              ]),
              _: 1
            }),
            i("div", yo, [
              S(w, { name: "QQ" }),
              S(w, { name: "weixin" }),
              S(w, { name: "gitee" }),
              S(w, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
});
const $o = /* @__PURE__ */ Z(wo, [["__scopeId", "data-v-8e737450"]]), bo = se($o), Co = { key: 0 }, xo = /* @__PURE__ */ Y({
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
    const o = e, n = de({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = F({}), s = F({}), a = G(() => o.delay > 2e3 ? o.delay : 2e3), u = () => {
      ke(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = s.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          m();
        }, o.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / o.spped, n.twoTime = (n.textWidth + n.boxWidth) / o.spped;
    }, m = () => {
      n.order === 1 ? (s.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : s.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, w = () => {
      s.value.addEventListener(
        "animationend",
        () => {
          m();
        },
        !1
      );
    };
    return xe(() => {
      o.vertical || (u(), w());
    }), (v, l) => {
      const M = pe("el-carousel-item"), _ = pe("u-icon");
      return f(), b("div", {
        class: "u-notice-bar",
        style: Ie({ background: v.background, height: `${v.height}px` })
      }, [
        v.vertical ? (f(), b("div", Co, [
          S($(Vt), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: a.value
          }, {
            default: T(() => [
              (f(!0), b(le, null, ie(v.data, (p) => (f(), X(M, { key: p }, {
                default: T(() => [
                  ae(q(p), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (f(), b("div", {
          key: 1,
          style: Ie({ color: v.color, fontSize: `${v.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          v.prefixIcon ? (f(), X(_, {
            key: 0,
            name: v.prefixIcon
          }, null, 8, ["name"])) : R("", !0),
          i("div", {
            ref_key: "boxRef",
            ref: t,
            class: "text-box"
          }, [
            i("div", {
              ref_key: "textRef",
              ref: s,
              class: "text"
            }, q(v.data), 513)
          ], 512),
          v.suffixIcon ? (f(), X(_, {
            key: 1,
            name: v.suffixIcon
          }, null, 8, ["name"])) : R("", !0)
        ], 4))
      ], 4);
    };
  }
});
const ko = /* @__PURE__ */ Z(xo, [["__scopeId", "data-v-723bc558"]]), Mo = se(ko), So = (e) => (ce("data-v-11b4e56c"), e = e(), ue(), e), Lo = { class: "u-anchor" }, Fo = { class: "toc-content" }, zo = /* @__PURE__ */ So(() => /* @__PURE__ */ i("h3", { class: "toc-content-heading" }, "目录", -1)), Io = { class: "toc-items" }, To = ["onClick"], Ho = /* @__PURE__ */ Y({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const o = e, n = F(0), t = F({}), s = F({}), a = (w) => {
      switch (w) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, u = () => {
      const w = [];
      t.value.forEach((M) => {
        w.push(M.offsetTop);
      });
      const l = (s.value instanceof Element ? s.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      w.forEach((M, _) => {
        l >= M - 10 - o.targetOffset && (n.value = _);
      });
    }, r = (w) => {
      const v = t.value.item(w);
      console.log(v), o.scroll ? s.value.scrollTo({
        top: v.offsetTop - o.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: v.offsetTop - o.targetOffset,
        behavior: "smooth"
      });
    };
    xe(() => {
    }), Ne(() => {
      s.value.removeEventListener("scroll", u);
    });
    let m;
    return xe(() => {
      let w = document.querySelector(o.container);
      m = new ResizeObserver((v) => {
        o.scroll ? s.value = document.querySelector(o.scroll) : s.value = window, t.value = w.querySelectorAll("h1, h2, h3, h4, h5, h6"), s.value.addEventListener("scroll", u);
      }), m.observe(w);
    }), Ne(() => {
      s.value.removeEventListener("scroll", u), m.disconnect();
    }), (w, v) => {
      const l = pe("u-divider");
      return f(), b("div", Lo, [
        i("nav", Fo, [
          zo,
          S(l),
          i("ul", Io, [
            (f(!0), b(le, null, ie(t.value, (M, _) => (f(), b("li", {
              key: _,
              class: J([{ active: n.value == _ }, a(M.nodeName)]),
              onClick: (p) => r(_)
            }, q(M.innerText), 11, To))), 128))
          ])
        ])
      ]);
    };
  }
});
const Ao = /* @__PURE__ */ Z(Ho, [["__scopeId", "data-v-11b4e56c"]]), Bo = se(Ao), Te = (e) => (ce("data-v-c739035a"), e = e(), ue(), e), Eo = { class: "card-box u-scrollbar" }, Vo = {
  key: 0,
  class: "history"
}, Do = { class: "header" }, jo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "title" }, "历史搜索", -1)), Oo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ i("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), Ro = {
  key: 1,
  class: "trending"
}, Uo = { class: "title" }, Po = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("span", null, "热搜", -1)), Yo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("svg", {
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
], -1)), No = { class: "hot-list" }, Wo = ["onClick"], qo = { class: "trending-text u-ellipsis" }, Zo = /* @__PURE__ */ Te(() => /* @__PURE__ */ i("div", { class: "trending-mark" }, null, -1)), Ko = /* @__PURE__ */ Y({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: o }) {
    const n = e, t = G(() => !(Ce(n.data.historySearchList) && Ce(n.data.hotSearchList)));
    return (s, a) => {
      const u = pe("u-icon");
      return he((f(), b("div", Eo, [
        s.data.historySearchList.length != 0 ? (f(), b("div", Vo, [
          i("div", Do, [
            jo,
            S($(it), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: a[0] || (a[0] = (r) => s.$emit("onClear"))
            }, {
              default: T(() => [
                S(u, null, {
                  default: T(() => [
                    Oo
                  ]),
                  _: 1
                }),
                ae(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (f(!0), b(le, null, ie(s.data.historySearchList, (r, m) => (f(), X($(Dt), {
            key: m,
            type: r.type,
            closable: "",
            onClose: (w) => s.$emit("onClose", r.name),
            onClick: (w) => s.$emit("submit", r.name)
          }, {
            default: T(() => [
              ae(q(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : R("", !0),
        $(Ce)(s.data.hotSearchList) ? R("", !0) : (f(), b("div", Ro, [
          i("div", Uo, [
            Po,
            S(u, { style: { margin: "0 6px" } }, {
              default: T(() => [
                Yo
              ]),
              _: 1
            })
          ]),
          i("div", No, [
            (f(!0), b(le, null, ie(s.data.hotSearchList, (r, m) => (f(), b("div", {
              key: m,
              class: "hot-item",
              onClick: (w) => s.$emit("submit", r)
            }, [
              i("div", {
                class: J(["trending-rank", { "trending-rank-top": m < 3 }])
              }, q(m + 1), 3),
              i("div", qo, q(r), 1),
              Zo
            ], 8, Wo))), 128))
          ])
        ]))
      ], 512)), [
        [Se, s.data.visible && t.value]
      ]);
    };
  }
});
const Jo = /* @__PURE__ */ Z(Ko, [["__scopeId", "data-v-c739035a"]]), et = (e) => (ce("data-v-df2be5d9"), e = e(), ue(), e), Go = { class: "u-search" }, Qo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, Xo = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
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
], -1)), e1 = ["data-before", "data-after"], t1 = ["placeholder"], n1 = { class: "btn" }, o1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
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
], -1)), s1 = /* @__PURE__ */ et(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ i("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), a1 = /* @__PURE__ */ Y({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e, s = F({}), a = Ft(t.config, "keywords"), u = F(!1), r = F(0), m = F(!0), w = F(), v = de({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), l = de({
      search: t.config.search || "",
      visible: !1,
      historySearchList: Be.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    me(
      () => t.config.hotSearchList,
      (H) => {
        l.hotSearchList = H;
      }
    ), me(
      () => t.config.search,
      (H) => {
        l.search = H || "";
      }
    );
    const M = G(() => {
      let H = a.value[r.value];
      return u.value || l.search ? "" : H;
    }), _ = G(() => {
      let H = typeof a.value[r.value + 1] > "u" ? a.value[0] : a.value[r.value + 1];
      return u.value || l.search ? "" : H;
    }), p = G(() => {
      let H = a.value[r.value];
      return u.value ? H : "";
    }), C = G(() => !u.value && !l.search && m.value), O = (H) => {
      if (H != null && H.trim() != "") {
        let A = (B, P) => Math.round(Math.random() * (P - B)) + B, L = (B) => l.historySearchList.filter((P) => P.name == B).length != 0;
        if (H && l.historySearchList)
          L(H) || l.historySearchList.unshift({ name: H, type: v.types[A(0, 3)] });
        else {
          let B = u.value ? p : M;
          H = B.value, L(B.value) || l.historySearchList.unshift({ name: B.value, type: v.types[A(0, 3)] });
        }
        Be.set("searchHistory", l.historySearchList);
      }
      l.search = H, s.value.focus(), n("submit", H);
    }, j = (H) => {
      l.historySearchList.findIndex((A) => A.name == H), l.historySearchList.splice(
        l.historySearchList.findIndex((A) => A.name == H),
        1
      ), Be.set("searchHistory", l.historySearchList);
    }, K = () => {
      l.historySearchList.length = 0, Be.remove("searchHistory");
    }, Q = (H) => {
      if (H.pseudoElement == "::after") {
        m.value = !1;
        let A = typeof a.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = A, setTimeout(() => {
          m.value = !0;
        }, 3e3);
      }
    };
    return o({
      close: () => l.visible = !1
    }), (H, A) => {
      const L = pe("u-icon");
      return f(), b("div", Go, [
        i("div", {
          class: J(["search", { active: u.value }])
        }, [
          i("div", Qo, [
            S(L, null, {
              default: T(() => [
                Xo
              ]),
              _: 1
            })
          ]),
          i("label", {
            ref_key: "labelRef",
            ref: w,
            "data-before": M.value,
            "data-after": _.value,
            class: J({ animate: C.value }),
            onAnimationend: Q
          }, [
            he(i("input", {
              ref_key: "inputRef",
              ref: s,
              "onUpdate:modelValue": A[0] || (A[0] = (B) => l.search = B),
              type: "text",
              placeholder: p.value,
              onFocus: A[1] || (A[1] = () => {
                u.value = !0, l.visible = !0;
              }),
              onBlur: A[2] || (A[2] = (B) => u.value = !1),
              onKeyup: A[3] || (A[3] = be((B) => O(l.search), ["enter"]))
            }, null, 40, t1), [
              [zt, l.search]
            ])
          ], 42, e1),
          i("div", n1, [
            he(S(L, {
              class: "close",
              onClick: A[4] || (A[4] = (B) => l.search = "")
            }, {
              default: T(() => [
                o1
              ]),
              _: 1
            }, 512), [
              [Se, l.search]
            ]),
            i("div", {
              class: "search-btn",
              onClick: A[5] || (A[5] = (B) => O(l.search))
            }, [
              S(L, null, {
                default: T(() => [
                  s1
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        he(S(Jo, {
          data: l,
          onOnClose: j,
          onOnClear: K,
          onSubmit: O
        }, null, 8, ["data"]), [
          [$(lt), () => l.visible = !1, w.value]
        ])
      ]);
    };
  }
});
const l1 = /* @__PURE__ */ Z(a1, [["__scopeId", "data-v-df2be5d9"]]), i1 = se(l1), $t = (e, o) => {
  const n = /\[.+?\]/g;
  return o = o.replace(n, (t) => {
    const s = e[t];
    return s ? [
      '<img src="',
      s,
      '" width="20" height="20" alt="',
      t,
      '" title="',
      t,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      "/>"
    ].join("") : t;
  }), o;
}, r1 = (e) => {
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
}, Qs = (e, o, n) => {
  let t = (e - 1) * o;
  return t + o >= n.length ? n.slice(t, n.length) : n.slice(t, t + o);
}, bt = (e) => (ce("data-v-f75472b5"), e = e(), ue(), e), c1 = { class: "message" }, u1 = { class: "chat-list" }, d1 = /* @__PURE__ */ bt(() => /* @__PURE__ */ i("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), p1 = { class: "content" }, f1 = {
  key: 0,
  class: "username"
}, v1 = ["innerHTML"], h1 = /* @__PURE__ */ bt(() => /* @__PURE__ */ i("div", { class: "date" }, null, -1)), m1 = /* @__PURE__ */ Y({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: o }) {
    const { allEmoji: n } = oe(He), t = F();
    return o({
      scroll: () => {
        ke(() => {
          const a = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(a.offsetTop);
        });
      }
    }), (a, u) => (f(), b("div", c1, [
      S($(qe), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: T(() => [
          i("div", u1, [
            (f(!0), b(le, null, ie(a.data, (r, m) => (f(), b("div", {
              key: m,
              class: J([{ self: a.userId == r.id }, "chat-item"])
            }, [
              i("div", null, [
                S($(Ze), null, {
                  default: T(() => [
                    d1
                  ]),
                  _: 1
                })
              ]),
              i("div", p1, [
                a.userId != r.id ? (f(), b("div", f1, q(r.username), 1)) : R("", !0),
                i("div", {
                  class: "card-box",
                  innerHTML: $($t)($(n), r.content)
                }, null, 8, v1)
              ]),
              h1
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const _1 = /* @__PURE__ */ Z(m1, [["__scopeId", "data-v-f75472b5"]]), Ue = (e) => (ce("data-v-18726a6b"), e = e(), ue(), e), g1 = { class: "u-chat" }, y1 = { class: "header" }, w1 = /* @__PURE__ */ Ue(() => /* @__PURE__ */ i("svg", {
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
], -1)), $1 = /* @__PURE__ */ Ue(() => /* @__PURE__ */ i("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ i("div", null, "聊天室"),
  /* @__PURE__ */ i("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), b1 = {
  id: "chat-footer",
  class: "footer"
}, C1 = /* @__PURE__ */ Ue(() => /* @__PURE__ */ i("svg", {
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
], -1)), x1 = /* @__PURE__ */ Ue(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ i("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), k1 = /* @__PURE__ */ Y({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = e, t = F(!1), s = F(""), a = F(), u = (v) => {
      const { ctrlKey: l, key: M } = v;
      l && M == "Enter" && m();
    }, r = () => {
      s.value = "", a.value.scroll();
    }, m = () => {
      let v = s.value;
      v.trim() ? (v = v.replace(/\n/g, "<br/>"), o("submit", { clear: r, content: v })) : Xe({ type: "error", message: "内容不能为空" });
    }, w = (v) => {
      let l = document.getElementById("emojiInput"), M = l.selectionStart, _ = l.selectionEnd, p = l.value;
      if (M === null || _ === null)
        return;
      let C = p.substring(0, M) + v + p.substring(_);
      l.value = C, l.focus(), l.selectionStart = M + v.length, l.selectionEnd = M + v.length, s.value = C;
    };
    return ve(He, n.emoji), (v, l) => {
      const M = pe("u-icon"), _ = pe("u-emoji");
      return f(), b("div", g1, [
        i("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          i("div", y1, [
            S(M, { size: "32" }, {
              default: T(() => [
                w1
              ]),
              _: 1
            }),
            $1
          ]),
          S(_1, {
            ref_key: "messageRef",
            ref: a,
            data: v.data,
            "user-id": v.userId
          }, null, 8, ["data", "user-id"]),
          i("div", b1, [
            S($(Ee), {
              id: "emojiInput",
              modelValue: s.value,
              "onUpdate:modelValue": l[0] || (l[0] = (p) => s.value = p),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: be(u, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            S(_, {
              style: { margin: "0 8px 0" },
              emoji: v.emoji,
              placement: "top-end",
              onAddEmoji: w
            }, {
              default: T(() => [
                C1
              ]),
              _: 1
            }, 8, ["emoji"]),
            S(M, {
              size: "18",
              class: J([{ "submit-btn": s.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: m
            }, {
              default: T(() => [
                x1
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        S($(Ve), {
          class: "chat-btn",
          onClick: l[1] || (l[1] = (p) => t.value = !t.value)
        }, {
          default: T(() => [
            ae("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const M1 = /* @__PURE__ */ Z(k1, [["__scopeId", "data-v-18726a6b"]]), S1 = se(M1), Ct = (e) => (ce("data-v-85c87038"), e = e(), ue(), e), L1 = { class: "u-emoji" }, F1 = { class: "face-tooltip-head select-none" }, z1 = ["onClick"], I1 = ["src"], T1 = { class: "emoji-body select-none" }, H1 = { style: { padding: "0 5px" } }, A1 = ["onClick"], B1 = { class: "emoji-btn select-none" }, E1 = { key: 0 }, V1 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("svg", {
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
], -1)), D1 = /* @__PURE__ */ Ct(() => /* @__PURE__ */ i("span", null, "表情", -1)), j1 = [
  V1,
  D1
], O1 = /* @__PURE__ */ Y({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: o }) {
    const n = e, t = F(0), s = F(0), a = F(new Array(2)), { emojiList: u, faceList: r } = n.emoji;
    function m(v) {
      switch (t.value = v, v) {
        case 0:
          s.value = 0;
          break;
        case 1:
          s.value = -50, a.value[1] = u[1];
          break;
      }
    }
    function w() {
      a.value[0] = u[0];
    }
    return (v, l) => (f(), b("div", L1, [
      S($(rt), {
        placement: v.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: w
      }, {
        reference: T(() => [
          i("div", B1, [
            v.$slots.default ? re(v.$slots, "default", { key: 1 }, void 0, !0) : (f(), b("div", E1, j1))
          ])
        ]),
        default: T(() => [
          i("div", F1, [
            (f(!0), b(le, null, ie($(r), (M, _) => (f(), b("label", {
              key: _,
              class: J(t.value == _ ? "active" : ""),
              onClick: (p) => m(_)
            }, [
              i("img", {
                src: M,
                alt: ""
              }, null, 8, I1)
            ], 10, z1))), 128))
          ]),
          i("div", T1, [
            i("div", {
              class: "emjio-container",
              style: Ie({ transform: `translateX(${s.value}%)` })
            }, [
              (f(!0), b(le, null, ie(a.value, (M, _) => (f(), b("div", {
                key: _,
                class: "emoji-wrapper"
              }, [
                S($(qe), null, {
                  default: T(() => [
                    i("div", H1, [
                      (f(!0), b(le, null, ie(M, (p, C) => (f(), b("span", {
                        key: C,
                        class: "emoji-item",
                        onClick: (O) => v.$emit("addEmoji", C)
                      }, [
                        S($(ct), {
                          src: p,
                          title: String(C),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, A1))), 128))
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
const R1 = /* @__PURE__ */ Z(O1, [["__scopeId", "data-v-85c87038"]]), He = Symbol(), xt = se(R1), U1 = /* @__PURE__ */ Y({
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
    const n = e, t = de({
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
    }), s = () => n.endAmount > n.startAmount, a = G(() => {
      const v = /(\d+)(\d{3})/;
      let l = t.currentAmount.toFixed(n.decimals);
      l += "";
      let M = l.split("."), _ = M[0], p = M.length > 1 ? n.decimalSeparator + M[1] : "", C = !isNaN(parseFloat(n.separator));
      if (n.separator && !C)
        for (; v.test(_); )
          _ = _.replace(v, "$1" + n.separator + "$2");
      return _ + p;
    }), u = G(() => `${n.prefix}${a.value}${n.suffix}`);
    xe(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      m(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(w);
    }, m = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, w = (v) => {
      t.timestamp = v, t.startTimestamp || (t.startTimestamp = v);
      let l = v - t.startTimestamp;
      t.remaining = t.currentDuration - l, s() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (l / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), l < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(w) : o("finished");
    };
    return (v, l) => (f(), b("span", null, q(u.value), 1));
  }
}), P1 = se(U1), ot = /* @__PURE__ */ Y({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const o = F({}), { showInfo: n } = oe(Ge), t = oe(Re), s = () => ze("div", t.card(o.value));
    return (a, u) => $(t).card ? (f(), X($(rt), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: u[0] || (u[0] = () => $(n)(a.uid, (r) => o.value = r))
    }, {
      reference: T(() => [
        re(a.$slots, "default")
      ]),
      default: T(() => [
        S(s)
      ]),
      _: 3
    })) : re(a.$slots, "default", { key: 1 });
  }
}), tt = (e) => (ce("data-v-d057ae4a"), e = e(), ue(), e), Y1 = { class: "comment-sub" }, N1 = ["href", "target"], W1 = { key: 0 }, q1 = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Z1 = { class: "comment-primary" }, K1 = { class: "comment-main" }, J1 = { class: "user-info" }, G1 = ["href", "target"], Q1 = { class: "username" }, X1 = {
  class: "name",
  style: { "max-width": "10em" }
}, es = {
  key: 0,
  blank: "true",
  class: "rank"
}, ts = {
  key: 0,
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, ns = { class: "time" }, os = { class: "content" }, ss = ["innerHTML"], as = {
  class: "imgbox",
  style: { display: "flex" }
}, ls = { class: "action-box select-none" }, is = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
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
], -1)), rs = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ i("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), cs = { key: 2 }, us = /* @__PURE__ */ tt(() => /* @__PURE__ */ i("svg", {
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
], -1)), ds = { key: 0 }, ps = /* @__PURE__ */ Y({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = de({
      active: !1
    }), t = F(), s = F(), a = G(() => {
      let L = o.data.contentImg;
      return Ce(L) ? [] : L == null ? void 0 : L.split("||");
    }), { allEmoji: u } = oe(He), { like: r, user: m, relativeTime: w, aTarget: v, showLevel: l, showLikes: M, showAddress: _, showHomeLink: p, showReply: C } = oe(
      Ge
    );
    function O() {
      n.active = !n.active, n.active && ke(() => {
        var L;
        (L = t.value) == null || L.focus();
      });
    }
    function j(L) {
      var P;
      const B = L.target;
      (P = s.value) != null && P.contains(B) || (n.active = !1);
    }
    const K = oe(Re), Q = () => ze("div", K.info(o.data)), H = () => ze("div", K.operate(o.data)), A = G(() => $t(u, o.data.content));
    return (L, B) => (f(), b("div", {
      class: J(["comment", { reply: o.reply }])
    }, [
      i("div", Y1, [
        S(ot, {
          uid: $($e)(L.data.uid)
        }, {
          default: T(() => [
            i("a", {
              href: L.data.user.homeLink,
              target: $(v),
              class: J([{ "pointer-events-none": !$(p) }, "no-underline"]),
              style: { display: "block" }
            }, [
              S($(Ze), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: L.data.user.avatar
              }, {
                default: T(() => [
                  L.data.user.avatar ? (f(), b("span", W1, q(L.data.user.username), 1)) : (f(), b("img", q1))
                ]),
                _: 1
              }, 8, ["src"])
            ], 10, N1)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      i("div", Z1, [
        i("div", K1, [
          i("div", J1, [
            S(ot, {
              uid: $($e)(L.data.uid)
            }, {
              default: T(() => [
                i("a", {
                  href: L.data.user.homeLink,
                  target: $(v),
                  class: J([{ "pointer-events-none": !$(p) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  i("div", Q1, [
                    i("span", X1, q(L.data.user.username), 1),
                    $(l) ? (f(), b("span", es, [
                      S($(Me), {
                        size: "24",
                        innerHTML: $(r1)(L.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : R("", !0)
                  ])
                ], 10, G1)
              ]),
              _: 1
            }, 8, ["uid"]),
            $(_) ? (f(), b("span", ts, "   " + q(L.data.address), 1)) : R("", !0),
            $(K).info ? (f(), X(Q, { key: 1 })) : R("", !0),
            i("time", ns, q($(w) ? $(Je)(L.data.createTime).fromNow() : L.data.createTime), 1)
          ]),
          i("div", os, [
            S($(wt), { unfold: "" }, {
              default: T(() => [
                i("div", { innerHTML: A.value }, null, 8, ss),
                i("div", as, [
                  (f(!0), b(le, null, ie(a.value, (P, U) => (f(), X($(ct), {
                    key: U,
                    src: P,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": a.value,
                    "initial-index": U
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          i("div", ls, [
            $(M) ? (f(), b("div", {
              key: 0,
              class: "item",
              onClick: B[0] || (B[0] = (P) => $(r)($($e)(L.data.id)))
            }, [
              $(m).likeIds && $(m).likeIds.map(String).indexOf($($e)(L.data.id)) == -1 ? (f(), X($(Me), { key: 0 }, {
                default: T(() => [
                  is
                ]),
                _: 1
              })) : (f(), X($(Me), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: T(() => [
                  rs
                ]),
                _: 1
              })),
              L.data.likes != 0 ? (f(), b("span", cs, q(L.data.likes), 1)) : R("", !0)
            ])) : R("", !0),
            $(C) ? (f(), b("div", {
              key: 1,
              ref_key: "btnRef",
              ref: s,
              class: J(["item", { active: n.active }]),
              onClick: O
            }, [
              S($(Me), null, {
                default: T(() => [
                  us
                ]),
                _: 1
              }),
              i("span", null, q(n.active ? "取消回复" : "回复"), 1)
            ], 2)) : R("", !0),
            $(K).operate ? (f(), X(H, { key: 2 })) : R("", !0)
          ]),
          n.active ? (f(), b("div", ds, [
            S(_t, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": $($e)(L.id),
              placeholder: `回复 @${L.data.user.username}...`,
              reply: L.data,
              "content-btn": "发布",
              style: { "margin-top": "12px" },
              onHide: j,
              onClose: B[1] || (B[1] = (P) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply"])
          ])) : R("", !0)
        ]),
        re(L.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
});
const kt = /* @__PURE__ */ Z(ps, [["__scopeId", "data-v-d057ae4a"]]), fs = (e) => (ce("data-v-db8275d8"), e = e(), ue(), e), vs = {
  key: 0,
  class: "reply-box"
}, hs = { class: "reply-list" }, ms = {
  key: 0,
  class: "fetch-more"
}, _s = { key: 0 }, gs = { key: 1 }, ys = { key: 0 }, ws = /* @__PURE__ */ fs(() => /* @__PURE__ */ i("svg", {
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
], -1)), $s = {
  key: 1,
  class: "fetch-more"
}, bs = /* @__PURE__ */ Y({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = de({
      loading: !1,
      over: !1,
      currentPage: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: s, comments: a } = oe(We), { page: u } = oe(We), r = G(() => {
      let _ = {
        total: 0,
        length: 0,
        list: []
      };
      if (o.data) {
        let p = o.data.list.length;
        _ = {
          total: o.data.total,
          length: p,
          list: o.data.list
        };
      }
      if (!n.over) {
        let p = _.list.slice(0, s);
        _.list = p;
      }
      return u && (_.list = _.list.slice(0, n.pageSize)), _;
    });
    me(
      () => {
        var _;
        return (_ = o.data) == null ? void 0 : _.total;
      },
      (_) => {
        if (_) {
          let p = Math.ceil(_ / n.pageSize), C = n.currentPage > p ? p : n.currentPage;
          C = C < 1 ? 1 : C, n.currentPage != C && v(C);
        }
      }
    );
    const m = () => {
      n.over = !0;
    }, w = (_) => {
      a.value.forEach((p) => {
        p.id == o.id && p.reply && (p.reply = _);
      });
    }, v = (_) => {
      console.log(_), n.currentPage = _, t(o.id, _, n.pageSize, (p) => w(p));
    }, l = (_) => {
      v(_);
    }, M = (_) => {
      n.pageSize = _, t(o.id, n.currentPage, _, (p) => w(p));
    };
    return (_, p) => r.value.length > 0 ? (f(), b("div", vs, [
      i("div", hs, [
        (f(!0), b(le, null, ie(r.value.list, (C, O) => (f(), X(kt, {
          id: _.id,
          key: O,
          data: C,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > $(s) ? (f(), b("div", ms, [
          n.loading ? (f(), b("span", _s, "加载中...")) : (f(), b("div", gs, [
            n.over ? R("", !0) : (f(), b("div", ys, [
              ae(" 共" + q(r.value.total) + "条回复, ", 1),
              i("span", {
                class: "fetch-more-comment select-none",
                onClick: m
              }, [
                ae(" 点击查看 "),
                ws
              ])
            ]))
          ]))
        ])) : R("", !0),
        n.over && $(u) ? (f(), b("div", $s, [
          S($(jt), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "current-page": n.currentPage,
            "page-size": n.pageSize,
            onCurrentChange: l,
            onSizeChange: M
          }, null, 8, ["total", "current-page", "page-size"])
        ])) : R("", !0)
      ])
    ])) : R("", !0);
  }
});
const Cs = /* @__PURE__ */ Z(bs, [["__scopeId", "data-v-db8275d8"]]), xs = {
  key: 0,
  class: "comment-list"
}, ks = /* @__PURE__ */ Y({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (o, n) => o.data ? (f(), b("div", xs, [
      (f(!0), b(le, null, ie(o.data, (t) => (f(), X(kt, {
        id: $($e)(t.id),
        key: $($e)(t.id),
        data: t
      }, {
        default: T(() => [
          S(Cs, {
            id: $($e)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : R("", !0);
  }
});
const Mt = (e) => (ce("data-v-b4f327c1"), e = e(), ue(), e), Ms = { class: "u-comment" }, Ss = {
  key: 0,
  class: "comment-form"
}, Ls = /* @__PURE__ */ Mt(() => /* @__PURE__ */ i("div", { class: "header" }, [
  /* @__PURE__ */ i("span", { class: "header-title" }, "评论")
], -1)), Fs = { class: "content" }, zs = { class: "avatar-box" }, Is = { key: 0 }, Ts = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Hs = {
  key: 1,
  class: "comment-list-wrapper"
}, As = /* @__PURE__ */ Mt(() => /* @__PURE__ */ i("div", { class: "title" }, "全部评论", -1)), Bs = /* @__PURE__ */ Y({
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
      user: s,
      comments: a,
      replyShowSize: u,
      aTarget: r,
      placeholder: m = "输入评论（Enter换行，Ctrl + Enter发送）",
      showForm: w = !0,
      showContent: v = !0,
      showLevel: l = !0,
      showLikes: M = !0,
      showAddress: _ = !0,
      showHomeLink: p = !0,
      showReply: C = !0,
      mentionConfig: O
    } = at(t.config), j = ({ content: g, parentId: d, reply: c, files: x, clear: h }) => {
      const z = (I) => {
        if (h(), I)
          if (d) {
            let y = a.value.find((k) => k.id == d);
            if (y) {
              let k = y.reply;
              k ? (k.list.unshift(I), k.total++) : y.reply = {
                total: 1,
                list: [I]
              };
            }
          } else
            a.value.unshift(I);
      };
      n("submit", { content: g, parentId: d, reply: c, files: x, mentionList: U.value, finish: z });
    }, K = {
      upload: t.upload,
      submit: j,
      focus: () => n("focus")
    };
    ve(ht, K), ve("cancelFn", () => n("cancel"));
    const Q = (g, d) => {
      let c = null;
      a.value.forEach((x) => {
        var h;
        x.id == g ? c = x : c = (h = x.reply) == null ? void 0 : h.list.find((z) => z.id == g), c && c.likes && (c.likes += d);
      });
    }, A = {
      user: s,
      like: (g) => {
        const d = t.config.user.likeIds;
        d && n("like", g, () => {
          if (d.findIndex((c) => c == g) == -1)
            d.push(g), Q(g, 1);
          else {
            let c = d.findIndex((x) => x == g);
            c != -1 && (d.splice(c, 1), Q(g, -1));
          }
        });
      },
      relativeTime: ye(t.relativeTime, !1),
      showInfo: (g, d) => n("showInfo", g, d),
      aTarget: ye(r, "_blank"),
      showLevel: l,
      showLikes: M,
      showAddress: _,
      showHomeLink: p,
      showReply: C
    };
    ve(Ge, A);
    const L = {
      page: t.page,
      replyPage: (g, d, c, x) => {
        n("replyPage", { parentId: g, pageNum: d, pageSize: c, finish: x });
      },
      replyShowSize: ye(u == null ? void 0 : u.value, 3),
      comments: a
    };
    ve(We, L);
    const B = (g) => {
      const { parentId: d, id: c } = g;
      if (d) {
        let x = a.value.find((z) => z.id == d), h = x == null ? void 0 : x.reply;
        if (h) {
          let z = h.list.findIndex((I) => I.id == c);
          z != -1 && (h.list.splice(z, 1), h.total--);
        }
      } else {
        let x = a.value.findIndex((h) => h.id == c);
        x != -1 && a.value.splice(x, 1);
      }
    }, P = F(null), U = F([]);
    function D(g) {
      U.value = g;
    }
    function fe() {
      return U.value;
    }
    const _e = dt((g) => {
      n("mentionSearch", g);
    }, 300);
    return ve(He, t.config.emoji), ve("mentionConfig", O), ve(Re, It()), ve("changeMetionList", D), ve("mentionSearch", _e), o({
      remove: B,
      mentionList: U,
      getMentionList: fe,
      setMentionShow: (g) => {
        P.value.setMentionShow(g);
      }
    }), (g, d) => (f(), b("div", Ms, [
      $(w) ? (f(), b("div", Ss, [
        re(g.$slots, "header", {}, () => [
          Ls
        ], !0),
        i("div", Fs, [
          i("div", zs, [
            S($(Ze), {
              size: 40,
              src: g.config.user.avatar
            }, {
              default: T(() => [
                g.config.user.username ? (f(), b("span", Is, q(g.config.user.username), 1)) : (f(), b("img", Ts))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          S(_t, Tt(g.$attrs, {
            ref_key: "inputBox",
            ref: P,
            placeholder: $(m),
            "content-btn": "发表评论"
          }), null, 16, ["placeholder"])
        ])
      ])) : R("", !0),
      $(v) ? (f(), b("div", Hs, [
        re(g.$slots, "default", {}, () => [
          As
        ], !0),
        S(ks, { data: $(a) }, null, 8, ["data"])
      ])) : R("", !0)
    ]));
  }
});
const Es = /* @__PURE__ */ Z(Bs, [["__scopeId", "data-v-b4f327c1"]]), Vs = se(Es), Ds = [
  Vs,
  vn,
  bn,
  In,
  Bn,
  yt,
  wt,
  Me,
  bo,
  Mo,
  Bo,
  i1,
  S1,
  xt,
  P1
];
const js = (e) => {
  Ds.forEach((o) => {
    e.use(o);
  });
}, Xs = {
  install: js
};
export {
  na as ElAvatar,
  oa as ElButton,
  sa as ElCarousel,
  aa as ElDialog,
  la as ElDropdown,
  ia as ElDropdownItem,
  ra as ElDropdownMenu,
  ca as ElEmpty,
  ua as ElImage,
  da as ElInput,
  pa as ElLink,
  fa as ElPagination,
  va as ElPopover,
  ha as ElScrollbar,
  ma as ElTag,
  _a as ElTour,
  He as InjectionEmojiApi,
  Bo as UAnchor,
  S1 as UChat,
  Vs as UComment,
  bn as UCommentNav,
  vn as UCommentScroll,
  P1 as UCounter,
  In as UDialog,
  Bn as UDivider,
  yt as UEditor,
  xt as UEmoji,
  wt as UFold,
  Me as UIcon,
  Mo as UNoticeBar,
  i1 as USearch,
  bo as USign,
  Xe as UToast,
  qt as clear,
  De as cloneDeep,
  Ut as createGlobalNode,
  Kt as createObjectURL,
  Je as dayjs,
  dt as debounce,
  Ns as deepTree,
  Xs as default,
  qs as flattenDeep,
  Nt as get,
  js as install,
  ut as isArray,
  Ys as isBoolean,
  Ce as isEmpty,
  Us as isFunction,
  Zt as isImage,
  ye as isNull,
  Rt as isNumber,
  Ot as isObject,
  Ps as isString,
  Wt as remove,
  Gs as removeEmptyField,
  Pt as removeGlobalNode,
  Ws as revDeepTree,
  Yt as set,
  Be as storage,
  $e as str,
  Ks as throttle,
  Js as toFormData,
  Zs as useBrowser,
  $t as useEmojiParse,
  r1 as useLevel,
  Qs as usePage,
  ga as vInfiniteScroll,
  se as withInstall
};
