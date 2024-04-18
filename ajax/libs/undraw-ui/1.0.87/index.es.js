import { h as Te, render as Mt, reactive as fe, defineComponent as K, ref as L, inject as le, withDirectives as ge, openBlock as h, createElementBlock as w, createVNode as I, unref as $, normalizeClass as J, createElementVNode as l, toDisplayString as j, createCommentVNode as R, createBlock as Q, withCtx as B, createTextVNode as pe, nextTick as ke, pushScopeId as ue, popScopeId as de, computed as ee, renderSlot as ce, resolveComponent as ve, watch as me, createSlots as kt, useCssVars as Oe, normalizeStyle as Le, onMounted as be, Transition as st, vShow as ze, withKeys as Ce, withModifiers as Me, Fragment as se, renderList as ie, toRefs as We, onBeforeUnmount as St, onUnmounted as Ee, toRef as at, vModelText as Lt, provide as _e, useSlots as zt, mergeProps as Ft } from "vue";
import { ClickOutside as lt } from "element-plus";
import { ElButton as Ne, ElLink as it, vInfiniteScroll as Tt, ElDialog as It, ElScrollbar as Ve, ElEmpty as Ht, ElCarousel as At, ElTag as Bt, ElAvatar as Ze, ElInput as Dt, ElPopover as rt, ElImage as ct, ElPagination as Et } from "undraw-ui";
export * from "undraw-ui";
/*! UndrawUi v1.0.85 */
function ut(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function jt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Ot(e) {
  return !isNaN(Number(e));
}
function Js(e) {
  return typeof e == "function";
}
function Xs(e) {
  return typeof e == "string";
}
function Gs(e) {
  return typeof e == "boolean";
}
function we(e) {
  return ut(e) ? e.length === 0 : jt(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const $e = (e, o) => we(e) ? o : e;
function je(e) {
  if (typeof e != "object" || e === null)
    return e;
  let o;
  if (Array.isArray(e)) {
    o = [];
    for (let n = 0; n < e.length; n++)
      o[n] = je(e[n]);
  } else if (e instanceof Date)
    o = new Date(e.getTime());
  else if (e instanceof RegExp)
    o = new RegExp(e.source, e.flags);
  else {
    o = {};
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (o[n] = je(e[n]));
  }
  return o;
}
function Qs(e, o = { parentId: "parentId", children: "children" }) {
  let n = $e(o.parentId, "parentId"), t = $e(o.children, "children");
  e = je(e);
  const a = [], s = {};
  return e.forEach((c) => s[c.id] = c), e.forEach((c) => {
    const r = s[c[n]];
    r ? (r[t] || (r[t] = [])).push(c) : a.push(c);
  }), a;
}
function e2(e = [], o = { parentId: "parentId", children: "children" }) {
  let n = $e(o.parentId, "parentId"), t = $e(o.children, "children");
  const a = [], s = (c, r) => {
    c.forEach((_) => {
      _.id || (_.id = r++), _[n] = r, a.push(_), _[t] && ut(_[t]) && s(_[t], _.id);
    });
  };
  return s(e || [], null), a;
}
const t2 = (e, o = 1 / 0) => e.flat(o), re = (e, o) => {
  if (e.install = (n) => {
    for (const t of [e, ...Object.values(o ?? {})])
      n.component(t.name, t);
  }, o)
    for (const [n, t] of Object.entries(o))
      e[n] = t;
  return e;
};
function n2() {
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
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const _ = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), m = (o.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], v = t === "pc", i = !v, y = r === "xs" || i, u = window.innerHeight + "px";
  return {
    version: m,
    type: n,
    plat: c,
    tag: t,
    prefix: s,
    isMobile: i,
    isIOS: _,
    isPC: v,
    isMini: y,
    screen: r,
    innerHeight: u
  };
}
function Vt(e, o) {
  const n = Te(e, o), t = document.createElement("div");
  return document.body.append(t), Mt(n, t), { vnode: n, div: t };
}
function Rt(e) {
  try {
    e && e.remove();
  } catch {
  }
}
const Re = (e) => e ? "localStorage" : "sessionStorage", Ut = (e, o, n = !0) => {
  (o === "" || o === null || o === void 0) && (o = null), window[Re(n)].setItem(e, JSON.stringify(o));
}, Yt = (e, o = !0) => {
  let n;
  const t = window[Re(o)].getItem(e);
  return t && (n = JSON.parse(t)), n;
}, Pt = (e, o = !0) => {
  window[Re(o)].removeItem(e);
}, Nt = (e = !0) => {
  window[Re(e)].clear();
}, De = {
  set: Ut,
  get: Yt,
  remove: Pt,
  clear: Nt
}, dt = (e, o = 200, n = !1) => {
  let t = !1, a = null;
  const s = (...c) => new Promise((r, _) => {
    if (a && clearTimeout(a), n && !t) {
      const m = e.apply(void 0, c);
      r(m), t = !0;
    } else
      a = setTimeout(() => {
        const m = e.apply(void 0, c);
        r(m), t = !1, a = null;
      }, o);
  });
  return s.cancel = () => {
    a && clearTimeout(a), t = !1;
  }, s;
}, o2 = (e, o = 500) => {
  let n = 0;
  const t = (...a) => new Promise((s, c) => {
    const r = (/* @__PURE__ */ new Date()).getTime();
    if (r - n >= o) {
      const _ = e.apply(void 0, a);
      s(_), n = r;
    }
  });
  return t.cancel = () => {
    n = (/* @__PURE__ */ new Date()).getTime();
  }, t;
}, xe = (e) => e == null ? "" : String(e);
function qt(e) {
  let o = ["png", "jpg", "jpeg", "gif", "webp", "svg"], n = e.lastIndexOf("."), t = e.substring(n + 1);
  return o.indexOf(t.toLowerCase()) != -1;
}
function Wt(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function s2(e) {
  const o = new FormData();
  return Object.keys(e).forEach((n) => {
    const t = e[n];
    Array.isArray(t) ? t.forEach((a, s) => o.append(n + `[${s}]`, a)) : o.append(n, e[n]);
  }), o;
}
function a2(e) {
  return Object.keys(e).filter((o) => e[o] !== null && e[o] !== void 0).reduce((o, n) => ({ ...o, [n]: e[n] }), {});
}
var Ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Pe = { exports: {} }, tt;
function ht() {
  return tt || (tt = 1, function(e, o) {
    (function(n, t) {
      e.exports = t();
    })(Ke, function() {
      var n = 1e3, t = 6e4, a = 36e5, s = "millisecond", c = "second", r = "minute", _ = "hour", m = "day", v = "week", i = "month", y = "quarter", u = "year", d = "date", x = "Invalid Date", U = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, P = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(b) {
        var f = ["th", "st", "nd", "rd"], p = b % 100;
        return "[" + b + (f[(p - 20) % 10] || f[p] || f[0]) + "]";
      } }, ne = function(b, f, p) {
        var M = String(b);
        return !M || M.length >= f ? b : "" + Array(f + 1 - M.length).join(p) + b;
      }, T = { s: ne, z: function(b) {
        var f = -b.utcOffset(), p = Math.abs(f), M = Math.floor(p / 60), g = p % 60;
        return (f <= 0 ? "+" : "-") + ne(M, 2, "0") + ":" + ne(g, 2, "0");
      }, m: function b(f, p) {
        if (f.date() < p.date())
          return -b(p, f);
        var M = 12 * (p.year() - f.year()) + (p.month() - f.month()), g = f.clone().add(M, i), z = p - g < 0, F = f.clone().add(M + (z ? -1 : 1), i);
        return +(-(M + (p - g) / (z ? g - F : F - g)) || 0);
      }, a: function(b) {
        return b < 0 ? Math.ceil(b) || 0 : Math.floor(b);
      }, p: function(b) {
        return { M: i, y: u, w: v, d: m, D: d, h: _, m: r, s: c, ms: s, Q: y }[b] || String(b || "").toLowerCase().replace(/s$/, "");
      }, u: function(b) {
        return b === void 0;
      } }, A = "en", k = {};
      k[A] = P;
      var H = function(b) {
        return b instanceof he;
      }, N = function b(f, p, M) {
        var g;
        if (!f)
          return A;
        if (typeof f == "string") {
          var z = f.toLowerCase();
          k[z] && (g = z), p && (k[z] = p, g = z);
          var F = f.split("-");
          if (!g && F.length > 1)
            return b(F[0]);
        } else {
          var O = f.name;
          k[O] = f, g = O;
        }
        return !M && g && (A = g), g || !M && A;
      }, W = function(b, f) {
        if (H(b))
          return b.clone();
        var p = typeof f == "object" ? f : {};
        return p.date = b, p.args = arguments, new he(p);
      }, V = T;
      V.l = N, V.i = H, V.w = function(b, f) {
        return W(b, { locale: f.$L, utc: f.$u, x: f.$x, $offset: f.$offset });
      };
      var he = function() {
        function b(p) {
          this.$L = N(p.locale, null, !0), this.parse(p);
        }
        var f = b.prototype;
        return f.parse = function(p) {
          this.$d = function(M) {
            var g = M.date, z = M.utc;
            if (g === null)
              return /* @__PURE__ */ new Date(NaN);
            if (V.u(g))
              return /* @__PURE__ */ new Date();
            if (g instanceof Date)
              return new Date(g);
            if (typeof g == "string" && !/Z$/i.test(g)) {
              var F = g.match(U);
              if (F) {
                var O = F[2] - 1 || 0, C = (F[7] || "0").substring(0, 3);
                return z ? new Date(Date.UTC(F[1], O, F[3] || 1, F[4] || 0, F[5] || 0, F[6] || 0, C)) : new Date(F[1], O, F[3] || 1, F[4] || 0, F[5] || 0, F[6] || 0, C);
              }
            }
            return new Date(g);
          }(p), this.$x = p.x || {}, this.init();
        }, f.init = function() {
          var p = this.$d;
          this.$y = p.getFullYear(), this.$M = p.getMonth(), this.$D = p.getDate(), this.$W = p.getDay(), this.$H = p.getHours(), this.$m = p.getMinutes(), this.$s = p.getSeconds(), this.$ms = p.getMilliseconds();
        }, f.$utils = function() {
          return V;
        }, f.isValid = function() {
          return this.$d.toString() !== x;
        }, f.isSame = function(p, M) {
          var g = W(p);
          return this.startOf(M) <= g && g <= this.endOf(M);
        }, f.isAfter = function(p, M) {
          return W(p) < this.startOf(M);
        }, f.isBefore = function(p, M) {
          return this.endOf(M) < W(p);
        }, f.$g = function(p, M, g) {
          return V.u(p) ? this[M] : this.set(g, p);
        }, f.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, f.valueOf = function() {
          return this.$d.getTime();
        }, f.startOf = function(p, M) {
          var g = this, z = !!V.u(M) || M, F = V.p(p), O = function(te, oe) {
            var ye = V.w(g.$u ? Date.UTC(g.$y, oe, te) : new Date(g.$y, oe, te), g);
            return z ? ye : ye.endOf(m);
          }, C = function(te, oe) {
            return V.w(g.toDate()[te].apply(g.toDate("s"), (z ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(oe)), g);
          }, S = this.$W, E = this.$M, q = this.$D, Z = "set" + (this.$u ? "UTC" : "");
          switch (F) {
            case u:
              return z ? O(1, 0) : O(31, 11);
            case i:
              return z ? O(1, E) : O(0, E + 1);
            case v:
              var G = this.$locale().weekStart || 0, ae = (S < G ? S + 7 : S) - G;
              return O(z ? q - ae : q + (6 - ae), E);
            case m:
            case d:
              return C(Z + "Hours", 0);
            case _:
              return C(Z + "Minutes", 1);
            case r:
              return C(Z + "Seconds", 2);
            case c:
              return C(Z + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, f.endOf = function(p) {
          return this.startOf(p, !1);
        }, f.$set = function(p, M) {
          var g, z = V.p(p), F = "set" + (this.$u ? "UTC" : ""), O = (g = {}, g[m] = F + "Date", g[d] = F + "Date", g[i] = F + "Month", g[u] = F + "FullYear", g[_] = F + "Hours", g[r] = F + "Minutes", g[c] = F + "Seconds", g[s] = F + "Milliseconds", g)[z], C = z === m ? this.$D + (M - this.$W) : M;
          if (z === i || z === u) {
            var S = this.clone().set(d, 1);
            S.$d[O](C), S.init(), this.$d = S.set(d, Math.min(this.$D, S.daysInMonth())).$d;
          } else
            O && this.$d[O](C);
          return this.init(), this;
        }, f.set = function(p, M) {
          return this.clone().$set(p, M);
        }, f.get = function(p) {
          return this[V.p(p)]();
        }, f.add = function(p, M) {
          var g, z = this;
          p = Number(p);
          var F = V.p(M), O = function(E) {
            var q = W(z);
            return V.w(q.date(q.date() + Math.round(E * p)), z);
          };
          if (F === i)
            return this.set(i, this.$M + p);
          if (F === u)
            return this.set(u, this.$y + p);
          if (F === m)
            return O(1);
          if (F === v)
            return O(7);
          var C = (g = {}, g[r] = t, g[_] = a, g[c] = n, g)[F] || 1, S = this.$d.getTime() + p * C;
          return V.w(S, this);
        }, f.subtract = function(p, M) {
          return this.add(-1 * p, M);
        }, f.format = function(p) {
          var M = this, g = this.$locale();
          if (!this.isValid())
            return g.invalidDate || x;
          var z = p || "YYYY-MM-DDTHH:mm:ssZ", F = V.z(this), O = this.$H, C = this.$m, S = this.$M, E = g.weekdays, q = g.months, Z = function(oe, ye, Ae, Be) {
            return oe && (oe[ye] || oe(M, z)) || Ae[ye].slice(0, Be);
          }, G = function(oe) {
            return V.s(O % 12 || 12, oe, "0");
          }, ae = g.meridiem || function(oe, ye, Ae) {
            var Be = oe < 12 ? "AM" : "PM";
            return Ae ? Be.toLowerCase() : Be;
          }, te = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: S + 1, MM: V.s(S + 1, 2, "0"), MMM: Z(g.monthsShort, S, q, 3), MMMM: Z(q, S), D: this.$D, DD: V.s(this.$D, 2, "0"), d: String(this.$W), dd: Z(g.weekdaysMin, this.$W, E, 2), ddd: Z(g.weekdaysShort, this.$W, E, 3), dddd: E[this.$W], H: String(O), HH: V.s(O, 2, "0"), h: G(1), hh: G(2), a: ae(O, C, !0), A: ae(O, C, !1), m: String(C), mm: V.s(C, 2, "0"), s: String(this.$s), ss: V.s(this.$s, 2, "0"), SSS: V.s(this.$ms, 3, "0"), Z: F };
          return z.replace(Y, function(oe, ye) {
            return ye || te[oe] || F.replace(":", "");
          });
        }, f.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, f.diff = function(p, M, g) {
          var z, F = V.p(M), O = W(p), C = (O.utcOffset() - this.utcOffset()) * t, S = this - O, E = V.m(this, O);
          return E = (z = {}, z[u] = E / 12, z[i] = E, z[y] = E / 3, z[v] = (S - C) / 6048e5, z[m] = (S - C) / 864e5, z[_] = S / a, z[r] = S / t, z[c] = S / n, z)[F] || S, g ? E : V.a(E);
        }, f.daysInMonth = function() {
          return this.endOf(i).$D;
        }, f.$locale = function() {
          return k[this.$L];
        }, f.locale = function(p, M) {
          if (!p)
            return this.$L;
          var g = this.clone(), z = N(p, M, !0);
          return z && (g.$L = z), g;
        }, f.clone = function() {
          return V.w(this.$d, this);
        }, f.toDate = function() {
          return new Date(this.valueOf());
        }, f.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, f.toISOString = function() {
          return this.$d.toISOString();
        }, f.toString = function() {
          return this.$d.toUTCString();
        }, b;
      }(), D = he.prototype;
      return W.prototype = D, [["$ms", s], ["$s", c], ["$m", r], ["$H", _], ["$W", m], ["$M", i], ["$y", u], ["$D", d]].forEach(function(b) {
        D[b[1]] = function(f) {
          return this.$g(f, b[0], b[1]);
        };
      }), W.extend = function(b, f) {
        return b.$i || (b(f, he, W), b.$i = !0), W;
      }, W.locale = N, W.isDayjs = H, W.unix = function(b) {
        return W(1e3 * b);
      }, W.en = k[A], W.Ls = k, W.p = {}, W;
    });
  }(Pe)), Pe.exports;
}
var Zt = ht();
const Je = /* @__PURE__ */ pt(Zt);
var Kt = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t(ht());
  })(Ke, function(n) {
    function t(c) {
      return c && typeof c == "object" && "default" in c ? c : { default: c };
    }
    var a = t(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(c, r) {
      return r === "W" ? c + "周" : c + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(c, r) {
      var _ = 100 * c + r;
      return _ < 600 ? "凌晨" : _ < 900 ? "早上" : _ < 1100 ? "上午" : _ < 1300 ? "中午" : _ < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(s, null, !0), s;
  });
})(Kt);
var ft = { exports: {} };
(function(e, o) {
  (function(n, t) {
    e.exports = t();
  })(Ke, function() {
    return function(n, t, a) {
      n = n || {};
      var s = t.prototype, c = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function r(m, v, i, y) {
        return s.fromToBase(m, v, i, y);
      }
      a.en.relativeTime = c, s.fromToBase = function(m, v, i, y, u) {
        for (var d, x, U, Y = i.$locale().relativeTime || c, P = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], ne = P.length, T = 0; T < ne; T += 1) {
          var A = P[T];
          A.d && (d = y ? a(m).diff(i, A.d, !0) : i.diff(m, A.d, !0));
          var k = (n.rounding || Math.round)(Math.abs(d));
          if (U = d > 0, k <= A.r || !A.r) {
            k <= 1 && T > 0 && (A = P[T - 1]);
            var H = Y[A.l];
            u && (k = u("" + k)), x = typeof H == "string" ? H.replace("%d", k) : H(k, v, A.l, U);
            break;
          }
        }
        if (v)
          return x;
        var N = U ? Y.future : Y.past;
        return typeof N == "function" ? N(x) : N.replace("%s", x);
      }, s.to = function(m, v) {
        return r(m, v, this, !0);
      }, s.from = function(m, v) {
        return r(m, v, this);
      };
      var _ = function(m) {
        return m.$u ? a.utc() : a();
      };
      s.toNow = function(m) {
        return this.to(_(this), m);
      }, s.fromNow = function(m) {
        return this.from(_(this), m);
      };
    };
  });
})(ft);
var Jt = ft.exports;
const Xt = /* @__PURE__ */ pt(Jt);
Je.locale("zh-cn");
Je.extend(Xt);
const Gt = {
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
}, nt = fe({
  locale: "zh",
  messages: Gt
}), Fe = (e) => (e = nt.locale + "." + e, e.split(".").reduce((o, n) => o[n] || "", nt.messages)), Ue = Symbol(), vt = Symbol(), Xe = Symbol(), qe = Symbol(), Qt = (e) => (ue("data-v-4bc0311d"), e = e(), de(), e), e1 = { class: "comment-box" }, t1 = {
  key: 0,
  class: "action-box"
}, n1 = /* @__PURE__ */ Qt(() => /* @__PURE__ */ l("svg", {
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
], -1)), o1 = { class: "btn-box" }, s1 = /* @__PURE__ */ K({
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
    const t = e, a = L(""), s = L(!1), c = L(!0), r = L(), _ = L(), m = L(), v = L([]), i = L([]), y = fe({
      imgLength: 0
    }), u = (b) => {
      i.value = b;
    }, d = (b) => {
      we(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: x, submit: U, focus: Y } = le(vt), P = le(He), ne = () => {
      U({
        content: t.reply && t.parentId != t.reply.id ? `回复 <span style="color: var(--u-color-success-dark-2);">@${t.reply.user.username}:</span> ${a.value}` : a.value,
        parentId: $e(t.parentId, null),
        reply: t.reply,
        files: i.value,
        clear: () => {
          k(), n("close");
        }
      });
    }, T = le("cancelFn"), A = () => {
      k(), n("close"), T();
    }, k = () => {
      r.value.clear(), v.value.length = 0, i.value = [], c.value = !0;
    };
    function H(b) {
      we(a.value) && !y.imgLength && (s.value = !1, n("hide", b));
    }
    function N() {
      s.value = !0, ke(() => {
        _.value = document.querySelector("div[id^='el-popper-container']");
      }), Y();
    }
    function W() {
      console.log(r.value);
    }
    o({
      focus: () => {
        var b;
        return (b = r.value) == null ? void 0 : b.focus();
      },
      changeMentionShow: (b) => {
        var f;
        return (f = r.value) == null ? void 0 : f.changeMentionShow(b);
      },
      AddMention: W
    });
    const V = (b, f) => {
      var M;
      f || (v.value.length = 0, i.value.length = 0);
      const p = f ? [f] : (M = m.value) == null ? void 0 : M.files;
      if (y.imgLength = $e(p == null ? void 0 : p.length, 0), p)
        for (let g = 0; g < p.length; g++) {
          let z = p[g].name, F = Wt(p[g]);
          i.value.push(p[g]), qt(z) ? v.value.push(F) : Ge({ type: "warn", message: "请选择图片类型文件!", duration: 2500 });
        }
    }, he = le(Ue), D = () => Te("div", he.func());
    return (b, f) => ge((h(), w("div", e1, [
      I($(yt), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": f[0] || (f[0] = (p) => a.value = p),
        class: J({ "input-active": s.value }),
        placeholder: t.placeholder,
        "min-height": 64,
        "img-list": v.value,
        onClick: f[1] || (f[1] = () => s.value = !0),
        onFocus: N,
        onInput: d,
        onSubmit: ne,
        onPaste: V,
        onChangeImgListFn: u
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      s.value ? (h(), w("div", t1, [
        I($(xt), {
          emoji: $(P),
          onAddEmoji: f[2] || (f[2] = (p) => {
            var M;
            return (M = r.value) == null ? void 0 : M.addText(p);
          })
        }, null, 8, ["emoji"]),
        $(x) ? (h(), w("div", {
          key: 0,
          class: "picture",
          onClick: f[3] || (f[3] = //@ts-ignore
          (...p) => {
            var M, g;
            return ((M = m.value) == null ? void 0 : M.click) && ((g = m.value) == null ? void 0 : g.click(...p));
          })
        }, [
          n1,
          l("span", null, j(b.$u("comment.upload")), 1),
          l("input", {
            id: "comment-upload",
            ref_key: "inputRef",
            ref: m,
            type: "file",
            multiple: "",
            onChange: V
          }, null, 544)
        ])) : R("", !0),
        $(he).func ? (h(), Q(D, { key: 1 })) : R("", !0),
        l("div", o1, [
          I($(Ne), {
            type: "primary",
            disabled: c.value,
            onClick: ne
          }, {
            default: B(() => [
              pe(j(t.contentBtn), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          t.cancelBtn ? (h(), Q($(Ne), {
            key: 0,
            onClick: A
          }, {
            default: B(() => [
              pe(j(t.cancelBtn), 1)
            ]),
            _: 1
          })) : R("", !0)
        ])
      ])) : R("", !0)
    ])), [
      [$(lt), H, _.value]
    ]);
  }
});
const X = (e, o) => {
  const n = e.__vccOpts || e;
  for (const [t, a] of o)
    n[t] = a;
  return n;
}, mt = /* @__PURE__ */ X(s1, [["__scopeId", "data-v-4bc0311d"]]), a1 = { class: "u-comment-scroll" }, l1 = ["infinite-scroll-disabled"], i1 = { class: "scroll-btn" }, r1 = { key: 1 }, c1 = { key: 2 }, u1 = /* @__PURE__ */ K({
  name: "UCommentScroll",
  __name: "comment-scroll",
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(!1), s = ee(() => a.value && n.disable), c = ee(() => !a.value || t.value || s.value), r = dt(() => {
      o("more"), t.value = !1;
    }, 500), _ = () => {
      t.value = !0, r();
    };
    return (m, v) => (h(), w("div", a1, [
      ge((h(), w("div", {
        "infinite-scroll-disabled": c.value,
        "infinite-scroll-distance": "2"
      }, [
        ce(m.$slots, "default", {}, void 0, !0),
        l("div", i1, [
          a.value ? R("", !0) : (h(), Q($(it), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: v[0] || (v[0] = (i) => a.value = !a.value)
          }, {
            default: B(() => [
              pe(j(m.$u("scroll.content")), 1)
            ]),
            _: 1
          })),
          t.value ? (h(), w("p", r1, j(m.$u("scroll.loading")), 1)) : R("", !0),
          s.value ? (h(), w("p", c1, j(m.$u("scroll.noMore")), 1)) : R("", !0)
        ])
      ], 8, l1)), [
        [$(Tt), _]
      ])
    ]));
  }
});
const d1 = /* @__PURE__ */ X(u1, [["__scopeId", "data-v-8296bb4f"]]), p1 = re(d1), _t = (e) => (ue("data-v-f99158ef"), e = e(), de(), e), h1 = { class: "nav" }, f1 = { class: "nav__title" }, v1 = { class: "nav__sort" }, m1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("svg", {
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
], -1)), _1 = /* @__PURE__ */ _t(() => /* @__PURE__ */ l("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ l("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), g1 = /* @__PURE__ */ K({
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
      const c = ve("u-icon");
      return h(), w("div", h1, [
        l("span", f1, j(a.$u("nav.title")), 1),
        l("div", v1, [
          l("div", {
            class: J(["item select-none", { active: t.value }]),
            onClick: s[0] || (s[0] = (r) => t.value = !0)
          }, [
            I(c, null, {
              default: B(() => [
                m1
              ]),
              _: 1
            }),
            pe(" " + j(a.$u("nav.newest")), 1)
          ], 2),
          l("div", {
            class: J(["item select-none", { active: !t.value }]),
            onClick: s[1] || (s[1] = (r) => t.value = !1)
          }, [
            I(c, null, {
              default: B(() => [
                _1
              ]),
              _: 1
            }),
            pe(" " + j(a.$u("nav.hottest")), 1)
          ], 2)
        ])
      ]);
    };
  }
});
const y1 = /* @__PURE__ */ X(g1, [["__scopeId", "data-v-f99158ef"]]), w1 = re(y1), gt = (e) => (ue("data-v-45151508"), e = e(), de(), e), $1 = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, b1 = /* @__PURE__ */ gt(() => /* @__PURE__ */ l("path", {
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
}, M1 = /* @__PURE__ */ gt(() => /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), k1 = [
  M1
], S1 = /* @__PURE__ */ K({
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
    return me(
      () => n.modelValue,
      (s) => {
        t.value = s;
      },
      {
        immediate: !0
      }
    ), me(
      () => t.value,
      (s) => {
        o("update:modelValue", s);
      }
    ), (s, c) => (h(), Q($(It), {
      modelValue: t.value,
      "onUpdate:modelValue": c[1] || (c[1] = (r) => t.value = r),
      "close-on-click-modal": s.closeOnClickModal,
      title: s.title,
      width: s.width,
      top: s.top,
      fullscreen: a.value,
      center: s.center,
      "before-close": s.beforeClose,
      draggable: ""
    }, kt({
      default: B(() => [
        l("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (h(), w("svg", $1, x1)) : (h(), w("svg", C1, k1))
        ]),
        ce(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      s.$slots.footer ? {
        name: "footer",
        fn: B(() => [
          ce(s.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
});
const L1 = /* @__PURE__ */ X(S1, [["__scopeId", "data-v-45151508"]]), z1 = re(L1), F1 = { class: "field" }, T1 = /* @__PURE__ */ K({
  name: "UDivider",
  __name: "divider",
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const o = e;
    Oe((t) => ({
      d59c4402: o.borderStyle
    }));
    const n = L();
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
    ), (t, a) => (h(), w("div", {
      class: J(["u-divider", { vertical: t.vertical }])
    }, [
      l("fieldset", F1, [
        t.$slots.default || t.vertical ? (h(), w("legend", {
          key: 0,
          class: J(["inner", n.value])
        }, [
          ce(t.$slots, "default", {}, void 0, !0)
        ], 2)) : R("", !0)
      ])
    ], 2));
  }
});
const I1 = /* @__PURE__ */ X(T1, [["__scopeId", "data-v-153d9bc7"]]), H1 = re(I1), A1 = [
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
function D1(e) {
  return A1.find((o) => o.type === e);
}
function E1() {
  return B1;
}
const j1 = {
  key: 1,
  "aria-hidden": "true"
}, O1 = ["xlink:href"], V1 = /* @__PURE__ */ K({
  name: "UIcon",
  __name: "icon",
  props: {
    name: {},
    size: {},
    color: {}
  },
  setup(e) {
    const o = e, n = ee(() => "#" + o.name), t = ee(() => ({
      fontSize: Ot(o.size) ? o.size + "px" : o.size,
      color: o.color
    }));
    return (a, s) => (h(), w("i", {
      class: "u-icon",
      style: Le(t.value)
    }, [
      a.$slots.default ? ce(a.$slots, "default", { key: 0 }, void 0, !0) : (h(), w("svg", j1, [
        l("use", { "xlink:href": n.value }, null, 8, O1)
      ]))
    ], 4));
  }
});
const R1 = /* @__PURE__ */ X(V1, [["__scopeId", "data-v-dd34e834"]]), Se = re(R1), U1 = { class: "v-toast" }, Y1 = { class: "inner" }, P1 = { class: "message" }, N1 = /* @__PURE__ */ K({
  name: "UToast",
  __name: "index",
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const o = e;
    Oe((a) => ({
      "27c08098": n.color,
      "165823da": n.bgColor
    }));
    const n = fe(E1().options), t = L(!1);
    return me(
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
    }), (a, s) => (h(), w("div", U1, [
      I(st, { name: "v-toast" }, {
        default: B(() => [
          ge(l("div", Y1, [
            l("div", P1, [
              n.icon ? (h(), Q($(Se), {
                key: 0,
                innerHTML: n.icon
              }, null, 8, ["innerHTML"])) : R("", !0),
              l("span", {
                class: J({ normal: a.type != "normal" })
              }, j(a.message), 3)
            ])
          ], 512), [
            [ze, t.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
});
const q1 = /* @__PURE__ */ X(N1, [["__scopeId", "data-v-7d3c50e0"]]);
function Ge(e) {
  let o = e.duration;
  if (!e.message)
    return;
  e.duration = o || 1e3;
  const { vnode: n, div: t } = Vt(q1, e);
  return setTimeout(() => {
    Rt(t);
  }, e.duration + 300), n;
}
const W1 = ["onKeydown"], Z1 = ["onClick"], K1 = { class: "userInfo" }, J1 = ["src"], X1 = { class: "username" }, G1 = { class: "empty" }, Q1 = /* @__PURE__ */ K({
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
    const t = e, a = L(), s = L(-1), c = L(null), r = (i) => {
      var y;
      if (s.value += i, s.value < 0 ? s.value = t.list.length - 1 : s.value >= t.list.length && (s.value = 0), a.value) {
        const u = a.value.wrapRef.children[0].children[s.value];
        if (u) {
          const d = a.value.wrapRef.offsetHeight || 0;
          (y = a.value) == null || y.setScrollTop((s.value - d / u.offsetHeight + 1) * u.offsetHeight);
        }
      }
    }, _ = () => {
      if (s.value >= 0 && s.value < t.list.length)
        return t.list[s.value];
    }, m = (i) => {
      s.value = i, n("insert", t.list[s.value]), n("changeShow", !1);
    };
    me(
      () => t.isShow,
      (i) => {
        i && (s.value = 0, ke(() => {
          a.value && a.value.setScrollTop(0);
        }));
      }
    );
    const v = () => {
      s.value = 0;
    };
    return be(() => {
      var i;
      (i = c.value) == null || i.focus();
    }), o({
      moveSelection: r,
      printSelectedItem: _,
      resetSelectIndex: v
    }), (i, y) => ge((h(), w("ul", {
      ref_key: "mentionList",
      ref: c,
      class: "mention-list",
      tabindex: "0",
      style: Le(`left: ${i.position.left}px; top: ${i.position.top}px`),
      onKeydown: [
        y[0] || (y[0] = Ce(Me((u) => r(-1), ["prevent"]), ["up"])),
        y[1] || (y[1] = Ce(Me((u) => r(1), ["prevent"]), ["down"])),
        Ce(Me(_, ["prevent"]), ["enter"])
      ]
    }, [
      I($(Ve), {
        ref_key: "scrollbarRef",
        ref: a,
        style: { padding: "10px" }
      }, {
        default: B(() => [
          (h(!0), w(se, null, ie(i.list, (u, d) => (h(), w("li", {
            key: d,
            class: J({ hover: d === s.value }),
            onClick: (x) => m(d)
          }, [
            ce(i.$slots, "user", {
              item: u,
              index: d
            }, () => [
              l("div", K1, [
                i.showAvatar ? (h(), w("img", {
                  key: 0,
                  src: u.userAvatar,
                  width: "30",
                  class: "avatar"
                }, null, 8, J1)) : R("", !0),
                l("span", X1, j(u.userName), 1)
              ])
            ], !0)
          ], 10, Z1))), 128)),
          ge(l("div", G1, [
            I($(Ht), { description: "暂无匹配数据" })
          ], 512), [
            [ze, !i.list.length]
          ])
        ]),
        _: 3
      }, 512)
    ], 44, W1)), [
      [ze, i.isShow]
    ]);
  }
});
const en = /* @__PURE__ */ X(Q1, [["__scopeId", "data-v-6cdbc37b"]]), tn = (e) => (ue("data-v-06f46233"), e = e(), de(), e), nn = ["placeholder", "onKeydown", "innerHTML"], on = ["src"], sn = ["onClick"], an = /* @__PURE__ */ tn(() => /* @__PURE__ */ l("svg", {
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
], -1)), ln = [
  an
], rn = /* @__PURE__ */ K({
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
    Oe((C) => ({
      "428f749a": A.value,
      "0d0ffbaa": k.value
    }));
    const a = L(null), s = L(!1), c = L({
      left: 0,
      top: 0
    });
    function r(C) {
      s.value = C, C || (H.value = "");
    }
    function _(C) {
      c.value = C;
    }
    function m(C) {
      a.value && a.value.moveSelection(C);
    }
    function v() {
      if (a.value)
        return a.value.printSelectedItem();
    }
    const i = le("mentionConfig"), y = le("changeMetionList"), u = le("mentionSearch"), d = L(), x = L(), U = L(), Y = L(!1), P = L(!1), ne = L(), { imgList: T } = We(t), A = ee(() => t.minHeight + "px"), k = ee(() => t.minHeight == 30 ? "4px 10px" : "8px 12px"), H = L("");
    me(
      () => t.modelValue,
      (C, S) => {
        var q;
        if (Y.value || (U.value = C), !((q = i == null ? void 0 : i.value) != null && q.show))
          return;
        C = C.replace(/<br>/g, ""), S = S.replace(/<br>/g, ""), (S.length >= C.length && S.slice(-1) === "@" || C.slice(-7) === "@&nbsp;") && r(!1), s.value && C.slice(-6) !== "&nbsp;" ? (H.value = C.split("@").pop() || "", H.value = H.value.replace("'", ""), console.log(H.value), u(H.value), a.value && a.value.resetSelectIndex()) : s.value && C.slice(-6) === "&nbsp;" && r(!1);
        let E = C.match(/<img [^>]*data-id="([^"]*)"[^>]*>/g);
        if (E) {
          let Z = E.map((ae) => {
            let te = ae.match(/data-id="([^"]*)"/);
            return te ? te[1] : null;
          }), G = i.value.userArr.filter(
            (ae) => Z.includes(`${ae[i.value.userIdKey]}`)
          );
          y(G);
        } else
          y([]);
      }
    );
    function N(C) {
      n("focus", C), Y.value = !0, P.value = !0;
    }
    function W(C) {
      var S, E;
      try {
        d.value = (S = window.getSelection()) == null ? void 0 : S.getRangeAt(0);
      } catch (q) {
        console.log(q);
      }
      n("blur", C), (E = x.value) != null && E.innerHTML || (P.value = !1), Y.value = !1;
    }
    function V(C) {
      m(C);
    }
    function he(C) {
      var E, q;
      const { innerHTML: S } = C.target;
      if (C.data === "@" && (i != null && i.value.show)) {
        try {
          d.value = (E = window.getSelection()) == null ? void 0 : E.getRangeAt(0);
        } catch (G) {
          console.log(G);
        }
        let Z = (q = d.value) == null ? void 0 : q.getBoundingClientRect();
        r(!0), Z && _({
          left: Z.left,
          top: Z.top + Z.height + 10
        });
      }
      n("update:modelValue", S), n("input", C), F();
    }
    function D(C, S) {
      var q, Z;
      let E = window.getSelection();
      if (E) {
        if (E.removeAllRanges(), d.value || ((q = x.value) == null || q.focus(), d.value = E.getRangeAt(0)), S && !H.value)
          d.value.startOffset > 0 && (d.value.setStart(d.value.startContainer, d.value.startOffset - 1), d.value.deleteContents());
        else if (S && H.value) {
          let ae = H.value.length + 1, te = d.value.startContainer.data.lastIndexOf("@" + H.value);
          te !== -1 && (d.value.setStart(d.value.startContainer, te), d.value.setEnd(d.value.startContainer, te + ae), d.value.deleteContents());
        }
        d.value.deleteContents(), d.value.insertNode(d.value.createContextualFragment(C)), d.value.collapse(!1), E.addRange(d.value), n("update:modelValue", ((Z = x.value) == null ? void 0 : Z.innerHTML) || "");
        const G = x.value;
        n("input", G);
      }
    }
    function b(C) {
      const S = C.clipboardData;
      if (S) {
        const E = S.getData("text/plain"), q = S.items.length > 0 ? S.items[0].getAsFile() : null;
        E ? (C.preventDefault(), document.execCommand("insertText", !1, E)) : q && (console.log(q), C.preventDefault(), n("paste", C, q));
      }
    }
    function f() {
      x.value && (x.value.innerHTML = "", n("update:modelValue", x.value.innerHTML), P.value = !1);
    }
    function p() {
      ke(() => {
        var C;
        (C = x.value) == null || C.focus();
      });
    }
    function M(C) {
      if (C) {
        let S = O(C);
        D(`${S} `, !0);
      }
    }
    const g = (C) => {
      if (C.ctrlKey && C.key == "Enter")
        we(t.modelValue.replace(/&nbsp;|<br>| /g, "")) ? Ge({ message: "内容不能为空", type: "info" }) : n("submit");
      else if (C.key == "Enter" && s.value) {
        C.preventDefault();
        const S = v();
        M(S), r(!1);
      }
    }, z = (C) => {
      var S;
      (S = T == null ? void 0 : T.value) == null || S.splice(C, 1), n("changeImgListFn", je(T == null ? void 0 : T.value));
    }, F = (C) => {
      var S;
      x.value && (d.value = (S = x == null ? void 0 : x.value.ownerDocument.getSelection()) == null ? void 0 : S.getRangeAt(0));
    };
    be(() => {
      x != null && x.value && x.value.addEventListener("mousemove", F);
    }), St(() => {
      x != null && x.value && x.value.removeEventListener("mousemove", F);
    }), o({
      addText: D,
      clear: f,
      focus: p,
      imageRef: ne,
      insertUser: M,
      changeMentionShow: r
    });
    const O = (C) => {
      const S = C[i.value.userNameKey], E = C[i.value.userIdKey], q = i.value.mentionColor || "#409eff", Z = `
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `, G = document.createElement("div");
      G.style.visibility = "hidden", G.innerHTML = Z, document.body.appendChild(G);
      const ae = G.querySelector("text");
      let te = 200;
      ae && (te = ae.getComputedTextLength()), document.body.removeChild(G);
      const oe = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${te}" height="20">
      <style>
        .mention-text { font: 14px 'PingFangSC-Regular', 'PingFang SC'; fill: ${q}; }
      </style>
      <text x="0" y="15" class="mention-text">@${S}</text>
    </svg>
  `;
      return `
    <img src="${`data:image/svg+xml,${encodeURIComponent(oe).replace(/'/g, "%27").replace(/"/g, "%22")}`}" alt="@${S}" style="width:${te}px;height:20px;user-select: none;  vertical-align: sub;"
     data-userName="${S}" data-id="${E}"
     draggable="false"
    >`;
    };
    return (C, S) => {
      var E, q;
      return h(), w("div", {
        class: J(["u-editor", { active: P.value }])
      }, [
        l("div", {
          ref_key: "editorRef",
          ref: x,
          class: "rich-input",
          contenteditable: "",
          placeholder: C.placeholder,
          onFocus: N,
          onInput: he,
          onBlur: W,
          onKeydown: [
            Ce(g, ["enter"]),
            S[0] || (S[0] = Ce(Me((Z) => V(-1), ["prevent"]), ["up"])),
            S[1] || (S[1] = Ce(Me((Z) => V(1), ["prevent"]), ["down"]))
          ],
          onPaste: b,
          innerHTML: U.value
        }, null, 40, nn),
        l("div", {
          ref_key: "imageRef",
          ref: ne,
          class: "image-preview-box"
        }, [
          (h(!0), w(se, null, ie($(T), (Z, G) => (h(), w("div", {
            key: G,
            class: "image-preview"
          }, [
            l("img", {
              src: Z,
              alt: ""
            }, null, 8, on),
            l("div", {
              class: "clean-btn",
              onClick: (ae) => z(G)
            }, ln, 8, sn)
          ]))), 128))
        ], 512),
        I(en, {
          ref_key: "metionList",
          ref: a,
          "is-show": s.value,
          position: c.value,
          list: (E = $(i)) == null ? void 0 : E.userArr,
          "show-avatar": (q = $(i)) == null ? void 0 : q.showAvatar,
          onInsert: M,
          onChangeShow: r
        }, null, 8, ["is-show", "position", "list", "show-avatar"])
      ], 2);
    };
  }
});
const cn = /* @__PURE__ */ X(rn, [["__scopeId", "data-v-06f46233"]]), yt = re(cn);
const un = { class: "u-fold" }, dn = { class: "action-box select-none" }, pn = /* @__PURE__ */ K({
  name: "UFold",
  __name: "fold",
  props: {
    line: { default: 5 },
    unfold: { type: Boolean },
    position: { default: "line" }
  },
  setup(e) {
    const o = e;
    Oe((_) => ({
      "4c9fb716": n.value
    }));
    const n = ee(() => {
      let _ = Math.trunc(Number(o.line));
      return _ > 0 ? _ : 1;
    }), t = L(!0), a = L(!1), s = L(), c = L();
    let r;
    return be(() => {
      r = new ResizeObserver((_) => {
        t.value && s.value && c.value && (a.value = c.value.clientHeight < s.value.scrollHeight);
      }), r.observe(s.value);
    }), Ee(() => {
      r == null || r.disconnect();
    }), (_, m) => {
      const v = ve("el-button");
      return h(), w("div", un, [
        l("div", {
          ref_key: "textBox",
          ref: c,
          class: J(["txt-box", { "over-hidden": t.value }])
        }, [
          l("div", {
            ref_key: "divBox",
            ref: s
          }, [
            a.value && _.unfold && _.position == "end" ? (h(), Q(v, {
              key: 0,
              onClick: m[0] || (m[0] = (i) => t.value = !t.value),
              class: J({ "over-hidden": t.value, "end-btn": 1 }),
              type: "primary",
              plain: "",
              link: ""
            }, {
              default: B(() => [
                pe(j(t.value ? $(Fe)("fold.unfold") : $(Fe)("fold.fold")), 1)
              ]),
              _: 1
            }, 8, ["class"])) : R("", !0),
            ce(_.$slots, "default", {}, void 0, !0)
          ], 512)
        ], 2),
        l("div", dn, [
          a.value && _.unfold && _.position == "line" ? (h(), w("div", {
            key: 0,
            class: "expand-btn",
            onClick: m[1] || (m[1] = (i) => t.value = !t.value)
          }, [
            ce(_.$slots, "expand", { fold: t.value }, () => [
              I(v, {
                type: "primary",
                plain: "",
                link: ""
              }, {
                default: B(() => [
                  pe(j(t.value ? $(Fe)("fold.unfold") : $(Fe)("fold.fold")), 1)
                ]),
                _: 1
              })
            ], !0)
          ])) : R("", !0)
        ])
      ]);
    };
  }
});
const hn = /* @__PURE__ */ X(pn, [["__scopeId", "data-v-da18f185"]]), wt = re(hn), fn = (e) => (ue("data-v-3a07e116"), e = e(), de(), e), vn = { class: "custom-contextmenu__menu" }, mn = ["onClick"], _n = /* @__PURE__ */ fn(() => /* @__PURE__ */ l("div", { class: "arrow" }, null, -1)), gn = /* @__PURE__ */ K({
  __name: "context-menu",
  props: {
    dropdown: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = fe({
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
      t.tag = m, t.dropdownList[1].show = !m.meta.isAffix, s(), setTimeout(() => {
        t.isShow = !0;
      }, 100);
    }, s = () => {
      t.isShow = !1;
    };
    be(() => {
      window.addEventListener("click", s);
    }), Ee(() => {
      window.removeEventListener("click", s);
    });
    const { isShow: c, dropdownList: r, tag: _ } = We(t);
    return o({
      openContextmenu: a
    }), (m, v) => {
      const i = ve("u-icon");
      return h(), Q(st, { name: "el-zoom-in-center" }, {
        default: B(() => [
          ge(l("div", {
            style: Le(`top: ${m.dropdown.y + 5}px; left: ${m.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            l("ul", vn, [
              (h(!0), w(se, null, ie($(r), (y, u) => (h(), w(se, { key: u }, [
                y.show ? (h(), w("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (d) => m.$emit("submit", u, $(_))
                }, [
                  I(i, {
                    innerHTML: y.icon
                  }, null, 8, ["innerHTML"]),
                  l("span", null, j(y.title), 1)
                ], 8, mn)) : R("", !0)
              ], 64))), 128))
            ]),
            _n
          ], 4), [
            [ze, $(c)]
          ])
        ]),
        _: 1
      });
    };
  }
});
const yn = /* @__PURE__ */ X(gn, [["__scopeId", "data-v-3a07e116"]]), wn = (e) => (ue("data-v-10a26074"), e = e(), de(), e), $n = { class: "u-tabs" }, bn = ["onClick", "onContextmenu"], xn = { class: "select-none" }, Cn = /* @__PURE__ */ wn(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), Mn = /* @__PURE__ */ K({
  name: "UTags",
  __name: "tags",
  props: {
    classic: { type: Boolean },
    modelValue: {}
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: o }) {
    const n = e, t = L(), a = L(), s = at(n, "modelValue"), c = L(0), r = fe({
      x: 0,
      y: 0
    });
    me(
      () => [...s.value],
      (y, u) => {
        if (u) {
          if (console.log(y, u), y.length > u.length) {
            let d = y.find((x) => !(u != null && u.includes(x)));
            s.value.forEach((x, U, Y) => {
              Y.findIndex((P) => P.path == x.path) != U && Y.splice(U, 1);
            }), c.value = s.value.findIndex((x) => x.path == (d == null ? void 0 : d.path));
          }
        } else {
          let d = 1;
          s.value.forEach((x, U, Y) => {
            Y.findIndex((P) => P.path == x.path) != U && (Y.splice(U, 1), c.value = Y.findIndex((P) => P.path == x.path), d = 0);
          }), d && (c.value = s.value.length - 1);
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
      (y) => {
        o(
          "select",
          s.value.find((u, d) => d == y)
        );
      }
    );
    const _ = (y) => {
      s.value.map((u, d) => {
        if (!u.meta.isAffix && y == d)
          if (s.value.splice(d, 1), d == c.value) {
            let U = [d, d - 1].filter((Y) => Y >= 0 && Y < s.value.length);
            c.value = U[0], c.value == d && o(
              "select",
              s.value.find((Y, P) => P == y)
            );
          } else
            y < c.value && (c.value -= 1);
      });
    }, m = (y) => {
      let u = s.value.filter((x) => x.meta.isAffix);
      y && !y.meta.isAffix && u.push(y), s.value.length = 0, s.value.push(...u);
      let d = s.value.length - 1;
      c.value = d >= 0 ? d : 0;
    }, v = (y, u) => {
      switch (y) {
        case 0:
          o("refresh", u);
          break;
        case 1:
          let d = s.value.findIndex((x) => x.path == u.path);
          _(d), o("close", u);
          break;
        case 2:
          m(u), o("closeOther", u);
          break;
        case 3:
          m(), o("closeAll");
          break;
        case 4:
          o("fullScreen", u);
          break;
      }
    }, i = (y, u) => {
      const { clientX: d, clientY: x } = u;
      r.x = d, r.y = x, a.value.openContextmenu(y);
    };
    return (y, u) => {
      const d = ve("u-icon");
      return h(), w("div", $n, [
        I($(Ve), {
          ref_key: "scrollbarRef",
          ref: t
        }, {
          default: B(() => [
            l("ul", {
              class: J([{ "classic-style": y.classic }, "u-tabs-ul"])
            }, [
              (h(!0), w(se, null, ie(y.modelValue, (x, U) => (h(), w("li", {
                key: U,
                class: J([{ "is-active": c.value == U }, "u-tabs-ul-li"]),
                onClick: (Y) => c.value = U,
                onContextmenu: Me((Y) => i(x, Y), ["prevent"])
              }, [
                l("span", xn, j(x.meta.title), 1),
                x.meta.isAffix ? R("", !0) : (h(), Q(d, {
                  key: 0,
                  onClick: Me((Y) => v(1, x), ["stop"])
                }, {
                  default: B(() => [
                    Cn
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, bn))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        I(yn, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: v
        }, null, 8, ["dropdown"])
      ]);
    };
  }
});
const kn = /* @__PURE__ */ X(Mn, [["__scopeId", "data-v-10a26074"]]), Sn = re(kn), Ln = { key: 0 }, zn = /* @__PURE__ */ K({
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
    const o = e, n = fe({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), t = L({}), a = L({}), s = ee(() => o.delay > 2e3 ? o.delay : 2e3), c = () => {
      ke(() => {
        n.boxWidth = t.value.offsetWidth, n.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${n.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${n.boxWidth}px;} 100% {left: -${n.textWidth}px;}}`
        ), r(), setTimeout(() => {
          _();
        }, o.delay);
      });
    }, r = () => {
      n.oneTime = n.textWidth / o.spped, n.twoTime = (n.textWidth + n.boxWidth) / o.spped;
    }, _ = () => {
      n.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${n.oneTime}s linear; opactity: 1;}`, n.order = 2) : a.value.style.cssText = `animation: twoAnimation ${n.twoTime}s linear infinite; opacity: 1;`;
    }, m = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          _();
        },
        !1
      );
    };
    return be(() => {
      o.vertical || (c(), m());
    }), (v, i) => {
      const y = ve("el-carousel-item"), u = ve("u-icon");
      return h(), w("div", {
        class: "u-notice-bar",
        style: Le({ background: v.background, height: `${v.height}px` })
      }, [
        v.vertical ? (h(), w("div", Ln, [
          I($(At), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: s.value
          }, {
            default: B(() => [
              (h(!0), w(se, null, ie(v.data, (d) => (h(), Q(y, { key: d }, {
                default: B(() => [
                  pe(j(d), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (h(), w("div", {
          key: 1,
          style: Le({ color: v.color, fontSize: `${v.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          v.prefixIcon ? (h(), Q(u, {
            key: 0,
            name: v.prefixIcon
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
            }, j(v.data), 513)
          ], 512),
          v.suffixIcon ? (h(), Q(u, {
            key: 1,
            name: v.suffixIcon
          }, null, 8, ["name"])) : R("", !0)
        ], 4))
      ], 4);
    };
  }
});
const Fn = /* @__PURE__ */ X(zn, [["__scopeId", "data-v-d3f0e1ae"]]), Tn = re(Fn), In = (e) => (ue("data-v-11b4e56c"), e = e(), de(), e), Hn = { class: "u-anchor" }, An = { class: "toc-content" }, Bn = /* @__PURE__ */ In(() => /* @__PURE__ */ l("h3", { class: "toc-content-heading" }, "目录", -1)), Dn = { class: "toc-items" }, En = ["onClick"], jn = /* @__PURE__ */ K({
  name: "UAnchor",
  __name: "anchor",
  props: {
    container: {},
    scroll: {},
    targetOffset: { default: 0 }
  },
  setup(e) {
    const o = e, n = L(0), t = L({}), a = L({}), s = (m) => {
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
      t.value.forEach((y) => {
        m.push(y.offsetTop);
      });
      const i = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      m.forEach((y, u) => {
        i >= y - 10 - o.targetOffset && (n.value = u);
      });
    }, r = (m) => {
      const v = t.value.item(m);
      console.log(v), o.scroll ? a.value.scrollTo({
        top: v.offsetTop - o.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: v.offsetTop - o.targetOffset,
        behavior: "smooth"
      });
    };
    be(() => {
    }), Ee(() => {
      a.value.removeEventListener("scroll", c);
    });
    let _;
    return be(() => {
      let m = document.querySelector(o.container);
      _ = new ResizeObserver((v) => {
        o.scroll ? a.value = document.querySelector(o.scroll) : a.value = window, t.value = m.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), _.observe(m);
    }), Ee(() => {
      a.value.removeEventListener("scroll", c), _.disconnect();
    }), (m, v) => {
      const i = ve("u-divider");
      return h(), w("div", Hn, [
        l("nav", An, [
          Bn,
          I(i),
          l("ul", Dn, [
            (h(!0), w(se, null, ie(t.value, (y, u) => (h(), w("li", {
              key: u,
              class: J([{ active: n.value == u }, s(y.nodeName)]),
              onClick: (d) => r(u)
            }, j(y.innerText), 11, En))), 128))
          ])
        ])
      ]);
    };
  }
});
const On = /* @__PURE__ */ X(jn, [["__scopeId", "data-v-11b4e56c"]]), Vn = re(On), Ie = (e) => (ue("data-v-51f39be8"), e = e(), de(), e), Rn = { class: "card-box u-scrollbar" }, Un = {
  key: 0,
  class: "history"
}, Yn = { class: "header" }, Pn = /* @__PURE__ */ Ie(() => /* @__PURE__ */ l("div", { class: "title" }, "历史搜索", -1)), Nn = /* @__PURE__ */ Ie(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), qn = {
  key: 1,
  class: "trending"
}, Wn = { class: "title" }, Zn = /* @__PURE__ */ Ie(() => /* @__PURE__ */ l("span", null, "热搜", -1)), Kn = /* @__PURE__ */ Ie(() => /* @__PURE__ */ l("svg", {
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
], -1)), Jn = { class: "hot-list" }, Xn = ["onClick"], Gn = { class: "trending-text u-ellipsis" }, Qn = /* @__PURE__ */ Ie(() => /* @__PURE__ */ l("div", { class: "trending-mark" }, null, -1)), eo = /* @__PURE__ */ K({
  __name: "card-box",
  props: {
    data: {}
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: o }) {
    const n = e, t = ee(() => !(we(n.data.historySearchList) && we(n.data.hotSearchList)));
    return (a, s) => {
      const c = ve("u-icon");
      return ge((h(), w("div", Rn, [
        a.data.historySearchList.length != 0 ? (h(), w("div", Un, [
          l("div", Yn, [
            Pn,
            I($(it), {
              underline: !1,
              class: "clear",
              link: "",
              type: "primary",
              onClick: s[0] || (s[0] = (r) => a.$emit("onClear"))
            }, {
              default: B(() => [
                I(c, null, {
                  default: B(() => [
                    Nn
                  ]),
                  _: 1
                }),
                pe(" 清空 ")
              ]),
              _: 1
            })
          ]),
          (h(!0), w(se, null, ie(a.data.historySearchList, (r, _) => (h(), Q($(Bt), {
            key: _,
            type: r.type,
            closable: "",
            onClose: (m) => a.$emit("onClose", r.name),
            onClick: (m) => a.$emit("submit", r.name)
          }, {
            default: B(() => [
              pe(j(r.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : R("", !0),
        $(we)(a.data.hotSearchList) ? R("", !0) : (h(), w("div", qn, [
          l("div", Wn, [
            Zn,
            I(c, { style: { margin: "0 6px" } }, {
              default: B(() => [
                Kn
              ]),
              _: 1
            })
          ]),
          l("div", Jn, [
            (h(!0), w(se, null, ie(a.data.hotSearchList, (r, _) => (h(), w("div", {
              key: _,
              class: "hot-item",
              onClick: (m) => a.$emit("submit", r)
            }, [
              l("div", {
                class: J(["trending-rank", { "trending-rank-top": _ < 3 }])
              }, j(_ + 1), 3),
              l("div", Gn, j(r), 1),
              Qn
            ], 8, Xn))), 128))
          ])
        ]))
      ], 512)), [
        [ze, a.data.visible && t.value]
      ]);
    };
  }
});
const to = /* @__PURE__ */ X(eo, [["__scopeId", "data-v-51f39be8"]]), Qe = (e) => (ue("data-v-df2be5d9"), e = e(), de(), e), no = { class: "u-search" }, oo = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, so = /* @__PURE__ */ Qe(() => /* @__PURE__ */ l("svg", {
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
], -1)), ao = ["data-before", "data-after"], lo = ["placeholder"], io = { class: "btn" }, ro = /* @__PURE__ */ Qe(() => /* @__PURE__ */ l("svg", {
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
], -1)), co = /* @__PURE__ */ Qe(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ l("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), uo = /* @__PURE__ */ K({
  name: "USearch",
  __name: "search",
  props: {
    config: {}
  },
  emits: ["submit"],
  setup(e, { expose: o, emit: n }) {
    const t = e, a = L({}), s = at(t.config, "keywords"), c = L(!1), r = L(0), _ = L(!0), m = L(), v = fe({
      types: ["success", "info", "warning", "danger"]
      //搜索历史tag样式
    }), i = fe({
      search: t.config.search || "",
      visible: !1,
      historySearchList: De.get("searchHistory") || [],
      // 历史搜索数据
      hotSearchList: t.config.hotSearchList
    });
    me(
      () => t.config.hotSearchList,
      (T) => {
        i.hotSearchList = T;
      }
    ), me(
      () => t.config.search,
      (T) => {
        i.search = T || "";
      }
    );
    const y = ee(() => {
      let T = s.value[r.value];
      return c.value || i.search ? "" : T;
    }), u = ee(() => {
      let T = typeof s.value[r.value + 1] > "u" ? s.value[0] : s.value[r.value + 1];
      return c.value || i.search ? "" : T;
    }), d = ee(() => {
      let T = s.value[r.value];
      return c.value ? T : "";
    }), x = ee(() => !c.value && !i.search && _.value), U = (T) => {
      if (T != null && T.trim() != "") {
        let A = (H, N) => Math.round(Math.random() * (N - H)) + H, k = (H) => i.historySearchList.filter((N) => N.name == H).length != 0;
        if (T && i.historySearchList)
          k(T) || i.historySearchList.unshift({ name: T, type: v.types[A(0, 3)] });
        else {
          let H = c.value ? d : y;
          T = H.value, k(H.value) || i.historySearchList.unshift({ name: H.value, type: v.types[A(0, 3)] });
        }
        De.set("searchHistory", i.historySearchList);
      }
      i.search = T, a.value.focus(), n("submit", T);
    }, Y = (T) => {
      i.historySearchList.findIndex((A) => A.name == T), i.historySearchList.splice(
        i.historySearchList.findIndex((A) => A.name == T),
        1
      ), De.set("searchHistory", i.historySearchList);
    }, P = () => {
      i.historySearchList.length = 0, De.remove("searchHistory");
    }, ne = (T) => {
      if (T.pseudoElement == "::after") {
        _.value = !1;
        let A = typeof s.value[r.value + 1] > "u" ? 0 : r.value + 1;
        r.value = A, setTimeout(() => {
          _.value = !0;
        }, 3e3);
      }
    };
    return o({
      close: () => i.visible = !1
    }), (T, A) => {
      const k = ve("u-icon");
      return h(), w("div", no, [
        l("div", {
          class: J(["search", { active: c.value }])
        }, [
          l("div", oo, [
            I(k, null, {
              default: B(() => [
                so
              ]),
              _: 1
            })
          ]),
          l("label", {
            ref_key: "labelRef",
            ref: m,
            "data-before": y.value,
            "data-after": u.value,
            class: J({ animate: x.value }),
            onAnimationend: ne
          }, [
            ge(l("input", {
              ref_key: "inputRef",
              ref: a,
              "onUpdate:modelValue": A[0] || (A[0] = (H) => i.search = H),
              type: "text",
              placeholder: d.value,
              onFocus: A[1] || (A[1] = () => {
                c.value = !0, i.visible = !0;
              }),
              onBlur: A[2] || (A[2] = (H) => c.value = !1),
              onKeyup: A[3] || (A[3] = Ce((H) => U(i.search), ["enter"]))
            }, null, 40, lo), [
              [Lt, i.search]
            ])
          ], 42, ao),
          l("div", io, [
            ge(I(k, {
              class: "close",
              onClick: A[4] || (A[4] = (H) => i.search = "")
            }, {
              default: B(() => [
                ro
              ]),
              _: 1
            }, 512), [
              [ze, i.search]
            ]),
            l("div", {
              class: "search-btn",
              onClick: A[5] || (A[5] = (H) => U(i.search))
            }, [
              I(k, null, {
                default: B(() => [
                  co
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        ge(I(to, {
          data: i,
          onOnClose: Y,
          onOnClear: P,
          onSubmit: U
        }, null, 8, ["data"]), [
          [$(lt), () => i.visible = !1, m.value]
        ])
      ]);
    };
  }
});
const po = /* @__PURE__ */ X(uo, [["__scopeId", "data-v-df2be5d9"]]), ho = re(po), $t = (e, o) => {
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
}, fo = (e) => {
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
}, l2 = (e, o, n) => {
  let t = (e - 1) * o;
  return t + o >= n.length ? n.slice(t, n.length) : n.slice(t, t + o);
}, bt = (e) => (ue("data-v-ae977bd2"), e = e(), de(), e), vo = { class: "message" }, mo = { class: "chat-list" }, _o = /* @__PURE__ */ bt(() => /* @__PURE__ */ l("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), go = { class: "content" }, yo = {
  key: 0,
  class: "username"
}, wo = ["innerHTML"], $o = /* @__PURE__ */ bt(() => /* @__PURE__ */ l("div", { class: "date" }, null, -1)), bo = /* @__PURE__ */ K({
  __name: "message",
  props: {
    data: {},
    userId: {}
  },
  setup(e, { expose: o }) {
    const { allEmoji: n } = le(He), t = L();
    return o({
      scroll: () => {
        ke(() => {
          const s = document.querySelector(".chat-item:last-child");
          t.value.setScrollTop(s.offsetTop);
        });
      }
    }), (s, c) => (h(), w("div", vo, [
      I($(Ve), {
        ref_key: "scrollbarRef",
        ref: t
      }, {
        default: B(() => [
          l("div", mo, [
            (h(!0), w(se, null, ie(s.data, (r, _) => (h(), w("div", {
              key: _,
              class: J([{ self: s.userId == r.id }, "chat-item"])
            }, [
              l("div", null, [
                I($(Ze), null, {
                  default: B(() => [
                    _o
                  ]),
                  _: 1
                })
              ]),
              l("div", go, [
                s.userId != r.id ? (h(), w("div", yo, j(r.username), 1)) : R("", !0),
                l("div", {
                  class: "card-box",
                  innerHTML: $($t)($(n), r.content)
                }, null, 8, wo)
              ]),
              $o
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
});
const xo = /* @__PURE__ */ X(bo, [["__scopeId", "data-v-ae977bd2"]]), Ye = (e) => (ue("data-v-91a28589"), e = e(), de(), e), Co = { class: "u-chat" }, Mo = { class: "header" }, ko = /* @__PURE__ */ Ye(() => /* @__PURE__ */ l("svg", {
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
], -1)), So = /* @__PURE__ */ Ye(() => /* @__PURE__ */ l("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ l("div", null, "聊天室"),
  /* @__PURE__ */ l("div", { style: { "font-size": "12px" } }, "当前2人在线")
], -1)), Lo = {
  id: "chat-footer",
  class: "footer"
}, zo = /* @__PURE__ */ Ye(() => /* @__PURE__ */ l("svg", {
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
], -1)), Fo = /* @__PURE__ */ Ye(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ l("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), To = /* @__PURE__ */ K({
  name: "UChat",
  __name: "chat",
  props: {
    data: {},
    userId: {},
    emoji: {}
  },
  emits: ["submit"],
  setup(e, { emit: o }) {
    const n = e, t = L(!1), a = L(""), s = L(), c = (v) => {
      const { ctrlKey: i, key: y } = v;
      i && y == "Enter" && _();
    }, r = () => {
      a.value = "", s.value.scroll();
    }, _ = () => {
      let v = a.value;
      v.trim() ? (v = v.replace(/\n/g, "<br/>"), o("submit", { clear: r, content: v })) : Ge({ type: "error", message: "内容不能为空" });
    }, m = (v) => {
      let i = document.getElementById("emojiInput"), y = i.selectionStart, u = i.selectionEnd, d = i.value;
      if (y === null || u === null)
        return;
      let x = d.substring(0, y) + v + d.substring(u);
      i.value = x, i.focus(), i.selectionStart = y + v.length, i.selectionEnd = y + v.length, a.value = x;
    };
    return _e(He, n.emoji), (v, i) => {
      const y = ve("u-icon"), u = ve("u-emoji");
      return h(), w("div", Co, [
        l("div", {
          class: J([{ active: t.value }, "chat-container translate"])
        }, [
          l("div", Mo, [
            I(y, { size: "32" }, {
              default: B(() => [
                ko
              ]),
              _: 1
            }),
            So
          ]),
          I(xo, {
            ref_key: "messageRef",
            ref: s,
            data: v.data,
            "user-id": v.userId
          }, null, 8, ["data", "user-id"]),
          l("div", Lo, [
            I($(Dt), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": i[0] || (i[0] = (d) => a.value = d),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "请输入内容",
              onKeydown: Ce(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            I(u, {
              style: { margin: "0 8px 0" },
              emoji: v.emoji,
              placement: "top-end",
              onAddEmoji: m
            }, {
              default: B(() => [
                zo
              ]),
              _: 1
            }, 8, ["emoji"]),
            I(y, {
              size: "18",
              class: J([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: _
            }, {
              default: B(() => [
                Fo
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        I($(Ne), {
          class: "chat-btn",
          onClick: i[1] || (i[1] = (d) => t.value = !t.value)
        }, {
          default: B(() => [
            pe("chat")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Io = /* @__PURE__ */ X(To, [["__scopeId", "data-v-91a28589"]]), Ho = re(Io), Ao = (e) => (ue("data-v-3035def5"), e = e(), de(), e), Bo = { class: "u-emoji" }, Do = { class: "face-tooltip-head select-none" }, Eo = ["onClick"], jo = ["src"], Oo = { class: "emoji-body select-none" }, Vo = { style: { padding: "0 5px" } }, Ro = ["onClick"], Uo = { class: "emoji-btn select-none" }, Yo = { key: 0 }, Po = /* @__PURE__ */ Ao(() => /* @__PURE__ */ l("svg", {
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
], -1)), No = /* @__PURE__ */ K({
  name: "UEmoji",
  __name: "emoji",
  props: {
    emoji: {},
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: o }) {
    const n = e, t = L(0), a = L(0), s = L(new Array(2)), { emojiList: c, faceList: r } = n.emoji;
    function _(v) {
      switch (t.value = v, v) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, s.value[1] = c[1];
          break;
      }
    }
    function m() {
      s.value[0] = c[0];
    }
    return (v, i) => (h(), w("div", Bo, [
      I($(rt), {
        placement: v.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: m
      }, {
        reference: B(() => [
          l("div", Uo, [
            v.$slots.default ? ce(v.$slots, "default", { key: 1 }, void 0, !0) : (h(), w("div", Yo, [
              Po,
              l("span", null, j(v.$u("emoji.content")), 1)
            ]))
          ])
        ]),
        default: B(() => [
          l("div", Do, [
            (h(!0), w(se, null, ie($(r), (y, u) => (h(), w("label", {
              key: u,
              class: J(t.value == u ? "active" : ""),
              onClick: (d) => _(u)
            }, [
              l("img", {
                src: y,
                alt: ""
              }, null, 8, jo)
            ], 10, Eo))), 128))
          ]),
          l("div", Oo, [
            l("div", {
              class: "emjio-container",
              style: Le({ transform: `translateX(${a.value}%)` })
            }, [
              (h(!0), w(se, null, ie(s.value, (y, u) => (h(), w("div", {
                key: u,
                class: "emoji-wrapper"
              }, [
                I($(Ve), null, {
                  default: B(() => [
                    l("div", Vo, [
                      (h(!0), w(se, null, ie(y, (d, x) => (h(), w("span", {
                        key: x,
                        class: "emoji-item",
                        onClick: (U) => v.$emit("addEmoji", x)
                      }, [
                        I($(ct), {
                          src: d,
                          title: String(x),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, Ro))), 128))
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
const qo = /* @__PURE__ */ X(No, [["__scopeId", "data-v-3035def5"]]), He = Symbol(), xt = re(qo), Wo = /* @__PURE__ */ K({
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
    const n = e, t = fe({
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
      const v = /(\d+)(\d{3})/;
      let i = t.currentAmount.toFixed(n.decimals);
      i += "";
      let y = i.split("."), u = y[0], d = y.length > 1 ? n.decimalSeparator + y[1] : "", x = !isNaN(parseFloat(n.separator));
      if (n.separator && !x)
        for (; v.test(u); )
          u = u.replace(v, "$1" + n.separator + "$2");
      return u + d;
    }), c = ee(() => `${n.prefix}${s.value}${n.suffix}`);
    be(() => {
      t.currentAmount = n.startAmount, t.currentStartAmount = n.startAmount, t.currentDuration = n.duration * 1e3, t.remaining = n.duration * 1e3, n.autoinit ? r() : t.paused = !0;
    });
    const r = () => {
      _(), t.currentStartAmount = n.startAmount, t.startTimestamp = 0, t.currentDuration = n.duration * 1e3, t.paused = !1, t.animationFrame = window.requestAnimationFrame(m);
    }, _ = () => {
      t.animationFrame && window.cancelAnimationFrame(t.animationFrame);
    }, m = (v) => {
      t.timestamp = v, t.startTimestamp || (t.startTimestamp = v);
      let i = v - t.startTimestamp;
      t.remaining = t.currentDuration - i, a() ? (t.currentAmount = t.currentStartAmount + (n.endAmount - t.currentStartAmount) * (i / t.currentDuration), t.currentAmount = t.currentAmount > n.endAmount ? n.endAmount : t.currentAmount) : (t.currentAmount = t.currentStartAmount - (t.currentStartAmount - n.endAmount) * (i / t.currentDuration), t.currentAmount = t.currentAmount < n.endAmount ? n.endAmount : t.currentAmount), i < t.currentDuration ? t.animationFrame = window.requestAnimationFrame(m) : o("finished");
    };
    return (v, i) => (h(), w("span", null, j(c.value), 1));
  }
}), Zo = re(Wo), ot = /* @__PURE__ */ K({
  __name: "user-card",
  props: {
    uid: {}
  },
  setup(e) {
    const o = L({}), { showInfo: n } = le(Xe), t = le(Ue), a = () => Te("div", t.card(o.value));
    return (s, c) => $(t).card ? (h(), Q($(rt), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => $(n)(s.uid, (r) => o.value = r))
    }, {
      reference: B(() => [
        ce(s.$slots, "default")
      ]),
      default: B(() => [
        I(a)
      ]),
      _: 3
    })) : ce(s.$slots, "default", { key: 1 });
  }
}), et = (e) => (ue("data-v-a61e728b"), e = e(), de(), e), Ko = ["id"], Jo = { class: "comment-sub" }, Xo = ["href", "target"], Go = { key: 0 }, Qo = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, es = { class: "comment-primary" }, ts = { class: "comment-main" }, ns = { class: "user-info" }, os = ["href", "target"], ss = { class: "username" }, as = {
  class: "name",
  style: { "max-width": "10em" }
}, ls = {
  key: 0,
  blank: "true",
  class: "rank"
}, is = {
  key: 0,
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, rs = { class: "time" }, cs = { class: "content" }, us = ["innerHTML"], ds = {
  class: "imgbox",
  style: { display: "flex" }
}, ps = { class: "action-box select-none" }, hs = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
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
], -1)), fs = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ l("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), vs = { key: 2 }, ms = /* @__PURE__ */ et(() => /* @__PURE__ */ l("svg", {
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
], -1)), _s = { key: 0 }, gs = /* @__PURE__ */ K({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = fe({
      active: !1
    }), t = L(), a = L(), s = ee(() => {
      let k = o.data.contentImg;
      return we(k) ? [] : k == null ? void 0 : k.split("||");
    }), { allEmoji: c } = le(He), { like: r, user: _, relativeTime: m, aTarget: v, showLevel: i, showLikes: y, showAddress: u, showHomeLink: d, showReply: x } = le(
      Xe
    );
    function U() {
      n.active = !n.active, n.active && ke(() => {
        var k;
        (k = t.value) == null || k.focus();
      });
    }
    function Y(k) {
      var N;
      const H = k.target;
      (N = a.value) != null && N.contains(H) || (n.active = !1);
    }
    const P = le(Ue), ne = () => Te("div", P.info(o.data)), T = () => Te("div", P.operate(o.data)), A = ee(() => $t(c, o.data.content));
    return (k, H) => (h(), w("div", {
      id: k.data.id,
      class: J(["comment", { reply: o.reply }])
    }, [
      l("div", Jo, [
        I(ot, {
          uid: $(xe)(k.data.uid)
        }, {
          default: B(() => [
            l("a", {
              href: k.data.user.homeLink,
              target: $(v),
              class: J([{ "pointer-events-none": !$(d) }, "no-underline"]),
              style: { display: "block" }
            }, [
              I($(Ze), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: k.data.user.avatar
              }, {
                default: B(() => [
                  k.data.user.avatar ? (h(), w("span", Go, j(k.data.user.username), 1)) : (h(), w("img", Qo))
                ]),
                _: 1
              }, 8, ["src"])
            ], 10, Xo)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      l("div", es, [
        l("div", ts, [
          l("div", ns, [
            I(ot, {
              uid: $(xe)(k.data.uid)
            }, {
              default: B(() => [
                l("a", {
                  href: k.data.user.homeLink,
                  target: $(v),
                  class: J([{ "pointer-events-none": !$(d) }, "no-underline"]),
                  style: { display: "block" }
                }, [
                  l("div", ss, [
                    l("span", as, j(k.data.user.username), 1),
                    $(i) ? (h(), w("span", ls, [
                      I($(Se), {
                        size: "24",
                        innerHTML: $(fo)(k.data.user.level || 1)
                      }, null, 8, ["innerHTML"])
                    ])) : R("", !0)
                  ])
                ], 10, os)
              ]),
              _: 1
            }, 8, ["uid"]),
            $(u) ? (h(), w("span", is, "   " + j(k.data.address), 1)) : R("", !0),
            $(P).info ? (h(), Q(ne, { key: 1 })) : R("", !0),
            l("time", rs, j($(m) ? $(Je)(k.data.createTime).fromNow() : k.data.createTime), 1)
          ]),
          l("div", cs, [
            I($(wt), { unfold: "" }, {
              default: B(() => [
                l("div", { innerHTML: A.value }, null, 8, us),
                l("div", ds, [
                  (h(!0), w(se, null, ie(s.value, (N, W) => (h(), Q($(ct), {
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
          l("div", ps, [
            $(y) ? (h(), w("div", {
              key: 0,
              class: "item",
              onClick: H[0] || (H[0] = (N) => $(r)($(xe)(k.data.id)))
            }, [
              $(_).likeIds && $(_).likeIds.map(String).indexOf($(xe)(k.data.id)) == -1 ? (h(), Q($(Se), { key: 0 }, {
                default: B(() => [
                  hs
                ]),
                _: 1
              })) : (h(), Q($(Se), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: B(() => [
                  fs
                ]),
                _: 1
              })),
              k.data.likes != 0 ? (h(), w("span", vs, j(k.data.likes), 1)) : R("", !0)
            ])) : R("", !0),
            $(x) ? (h(), w("div", {
              key: 1,
              ref_key: "btnRef",
              ref: a,
              class: J(["item", { active: n.active }]),
              onClick: U
            }, [
              I($(Se), null, {
                default: B(() => [
                  ms
                ]),
                _: 1
              }),
              l("span", null, j(n.active ? k.$u("comment.cancelReply") : k.$u("comment.reply")), 1)
            ], 2)) : R("", !0),
            $(P).operate ? (h(), Q(T, { key: 2 })) : R("", !0)
          ]),
          n.active ? (h(), w("div", _s, [
            I(mt, {
              ref_key: "commentRef",
              ref: t,
              "parent-id": $(xe)(k.id),
              placeholder: `${k.$u("comment.placeholder2")}@${k.data.user.username}...`,
              reply: k.data,
              "content-btn": k.$u("comment.contentBtn2"),
              style: { "margin-top": "12px" },
              onHide: Y,
              onClose: H[1] || (H[1] = (N) => n.active = !1)
            }, null, 8, ["parent-id", "placeholder", "reply", "content-btn"])
          ])) : R("", !0)
        ]),
        ce(k.$slots, "default", {}, void 0, !0)
      ])
    ], 10, Ko));
  }
});
const Ct = /* @__PURE__ */ X(gs, [["__scopeId", "data-v-a61e728b"]]), ys = (e) => (ue("data-v-33f5f78d"), e = e(), de(), e), ws = {
  key: 0,
  class: "reply-box"
}, $s = { class: "reply-list" }, bs = {
  key: 0,
  class: "fetch-more"
}, xs = { key: 0 }, Cs = { key: 1 }, Ms = { key: 0 }, ks = /* @__PURE__ */ ys(() => /* @__PURE__ */ l("svg", {
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
], -1)), Ss = {
  key: 1,
  class: "fetch-more"
}, Ls = /* @__PURE__ */ K({
  __name: "reply-box",
  props: {
    data: {},
    id: {}
  },
  setup(e) {
    const o = e, n = fe({
      loading: !1,
      over: !1,
      currentPage: 1,
      pageSize: 5
    }), { replyPage: t, replyShowSize: a, comments: s } = le(qe), { page: c } = le(qe), r = ee(() => {
      let u = {
        total: 0,
        length: 0,
        list: []
      };
      if (o.data) {
        let d = o.data.list.length;
        u = {
          total: o.data.total,
          length: d,
          list: o.data.list
        };
      }
      if (!n.over) {
        let d = u.list.slice(0, a);
        u.list = d;
      }
      return c && (u.list = u.list.slice(0, n.pageSize)), u;
    });
    me(
      () => {
        var u;
        return (u = o.data) == null ? void 0 : u.total;
      },
      (u) => {
        if (u) {
          let d = Math.ceil(u / n.pageSize), x = n.currentPage > d ? d : n.currentPage;
          x = x < 1 ? 1 : x, n.currentPage != x && v(x);
        }
      }
    );
    const _ = () => {
      n.over = !0;
    }, m = (u) => {
      s.value.forEach((d) => {
        d.id == o.id && d.reply && (d.reply = u);
      });
    }, v = (u) => {
      console.log(u), n.currentPage = u, t(o.id, u, n.pageSize, (d) => m(d));
    }, i = (u) => {
      v(u);
    }, y = (u) => {
      n.pageSize = u, t(o.id, n.currentPage, u, (d) => m(d));
    };
    return (u, d) => r.value.length > 0 ? (h(), w("div", ws, [
      l("div", $s, [
        (h(!0), w(se, null, ie(r.value.list, (x, U) => (h(), Q(Ct, {
          id: u.id,
          key: U,
          data: x,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        r.value.length > $(a) ? (h(), w("div", bs, [
          n.loading ? (h(), w("span", xs, j(u.$u("comment.more.loading")), 1)) : (h(), w("div", Cs, [
            n.over ? R("", !0) : (h(), w("div", Ms, [
              l("span", {
                class: "fetch-more-comment select-none",
                onClick: _
              }, [
                pe(j(u.$u("comment.more.prefixTotal")) + j(r.value.total) + j(u.$u("comment.more.suffixTotal")) + " ", 1),
                ks
              ])
            ]))
          ]))
        ])) : R("", !0),
        n.over && $(c) ? (h(), w("div", Ss, [
          I($(Et), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: r.value.total,
            "current-page": n.currentPage,
            "page-size": n.pageSize,
            onCurrentChange: i,
            onSizeChange: y
          }, null, 8, ["total", "current-page", "page-size"])
        ])) : R("", !0)
      ])
    ])) : R("", !0);
  }
});
const zs = /* @__PURE__ */ X(Ls, [["__scopeId", "data-v-33f5f78d"]]), Fs = {
  key: 0,
  class: "comment-list"
}, Ts = /* @__PURE__ */ K({
  __name: "comment-list",
  props: {
    data: {}
  },
  setup(e) {
    return (o, n) => o.data ? (h(), w("div", Fs, [
      (h(!0), w(se, null, ie(o.data, (t) => (h(), Q(Ct, {
        id: $(xe)(t.id),
        key: $(xe)(t.id),
        data: t
      }, {
        default: B(() => [
          I(zs, {
            id: $(xe)(t.id),
            data: t.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : R("", !0);
  }
});
const Is = { class: "u-comment" }, Hs = {
  key: 0,
  class: "comment-form"
}, As = { class: "header" }, Bs = { class: "header-title" }, Ds = { class: "content" }, Es = { class: "avatar-box" }, js = { key: 0 }, Os = {
  key: 1,
  src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
}, Vs = {
  key: 1,
  class: "comment-list-wrapper"
}, Rs = { class: "title" }, Us = /* @__PURE__ */ K({
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
      replyShowSize: c,
      aTarget: r,
      showForm: _ = !0,
      showContent: m = !0,
      showLevel: v = !0,
      showLikes: i = !0,
      showAddress: y = !0,
      showHomeLink: u = !0,
      showReply: d = !0,
      mentionConfig: x
    } = We(t.config), U = ({ content: D, parentId: b, reply: f, files: p, clear: M }) => {
      const g = (z) => {
        if (M(), z)
          if (b) {
            let F = s.value.find((O) => O.id == b);
            if (F) {
              let O = F.reply;
              O ? (O.list.unshift(z), O.total++) : F.reply = {
                total: 1,
                list: [z]
              };
            }
          } else
            s.value.unshift(z);
      };
      n("submit", { content: D, parentId: b, reply: f, files: p, mentionList: N.value, finish: g });
    }, Y = {
      upload: t.upload,
      submit: U,
      focus: () => n("focus")
    };
    _e(vt, Y), _e("cancelFn", () => n("cancel"));
    const P = (D, b) => {
      let f = null;
      s.value.forEach((p) => {
        var M;
        if (p.id == D)
          f = p;
        else {
          let g = (M = p.reply) == null ? void 0 : M.list.find((z) => z.id == D);
          g && (f = g);
        }
      }), f && !we(f.likes) && (f.likes += b);
    }, T = {
      user: a,
      like: (D) => {
        const b = t.config.user.likeIds;
        b && n("like", D, () => {
          if (b.findIndex((f) => f == D) == -1)
            b.push(D), P(D, 1);
          else {
            let f = b.findIndex((p) => p == D);
            f != -1 && (b.splice(f, 1), P(D, -1));
          }
        });
      },
      relativeTime: $e(t.relativeTime, !1),
      showInfo: (D, b) => n("showInfo", D, b),
      aTarget: $e(r, "_blank"),
      showLevel: v,
      showLikes: i,
      showAddress: y,
      showHomeLink: u,
      showReply: d
    };
    _e(Xe, T);
    const A = {
      page: t.page,
      replyPage: (D, b, f, p) => {
        n("replyPage", { parentId: D, pageNum: b, pageSize: f, finish: p });
      },
      replyShowSize: $e(c == null ? void 0 : c.value, 3),
      comments: s
    };
    _e(qe, A);
    const k = (D) => {
      const { parentId: b, id: f } = D;
      if (b) {
        let p = s.value.find((g) => g.id == b), M = p == null ? void 0 : p.reply;
        if (M) {
          let g = M.list.findIndex((z) => z.id == f);
          g != -1 && (M.list.splice(g, 1), M.total--);
        }
      } else {
        let p = s.value.findIndex((M) => M.id == f);
        p != -1 && s.value.splice(p, 1);
      }
    }, H = L(null), N = L([]);
    function W(D) {
      N.value = D;
    }
    function V() {
      return N.value;
    }
    const he = dt((D) => {
      n("mentionSearch", D);
    }, 300);
    return _e(He, t.config.emoji), _e("mentionConfig", x), _e(Ue, zt()), _e("changeMetionList", W), _e("mentionSearch", he), o({
      remove: k,
      mentionList: N,
      getMentionList: V,
      setMentionShow: (D) => {
        H.value.setMentionShow(D);
      }
    }), (D, b) => (h(), w("div", Is, [
      $(_) ? (h(), w("div", Hs, [
        ce(D.$slots, "header", {}, () => [
          l("div", As, [
            l("span", Bs, j(D.$u("comment.headerTitle")), 1)
          ])
        ], !0),
        l("div", Ds, [
          l("div", Es, [
            I($(Ze), {
              size: 40,
              src: D.config.user.avatar
            }, {
              default: B(() => [
                D.config.user.username ? (h(), w("span", js, j(D.config.user.username), 1)) : (h(), w("img", Os))
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          I(mt, Ft(D.$attrs, {
            ref_key: "inputBox",
            ref: H,
            placeholder: D.$u("comment.placeholder"),
            "content-btn": D.$u("comment.contentBtn")
          }), null, 16, ["placeholder", "content-btn"])
        ])
      ])) : R("", !0),
      $(m) ? (h(), w("div", Vs, [
        ce(D.$slots, "default", {}, () => [
          l("div", Rs, j(D.$u("comment.title")), 1)
        ], !0),
        I(Ts, { data: $(s) }, null, 8, ["data"])
      ])) : R("", !0)
    ]));
  }
});
const Ys = /* @__PURE__ */ X(Us, [["__scopeId", "data-v-c18de6fb"]]), Ps = re(Ys), Ns = [
  Ps,
  p1,
  w1,
  z1,
  H1,
  yt,
  wt,
  Se,
  Sn,
  Tn,
  Vn,
  ho,
  Ho,
  xt,
  Zo
];
const qs = (e) => {
  Ns.forEach((o) => {
    e.use(o);
  }), e.config.globalProperties.$u = Fe;
}, i2 = {
  install: qs
};
export {
  He as InjectionEmojiApi,
  Vn as UAnchor,
  Ho as UChat,
  Ps as UComment,
  w1 as UCommentNav,
  p1 as UCommentScroll,
  Zo as UCounter,
  z1 as UDialog,
  H1 as UDivider,
  yt as UEditor,
  xt as UEmoji,
  wt as UFold,
  Se as UIcon,
  Tn as UNoticeBar,
  ho as USearch,
  Sn as UTags,
  Ge as UToast,
  Nt as clear,
  je as cloneDeep,
  Vt as createGlobalNode,
  Wt as createObjectURL,
  Je as dayjs,
  dt as debounce,
  Qs as deepTree,
  i2 as default,
  t2 as flattenDeep,
  Yt as get,
  qs as install,
  ut as isArray,
  Gs as isBoolean,
  we as isEmpty,
  Js as isFunction,
  qt as isImage,
  $e as isNull,
  Ot as isNumber,
  jt as isObject,
  Xs as isString,
  nt as lang,
  Pt as remove,
  a2 as removeEmptyField,
  Rt as removeGlobalNode,
  e2 as revDeepTree,
  Ut as set,
  De as storage,
  xe as str,
  o2 as throttle,
  s2 as toFormData,
  Fe as translate,
  n2 as useBrowser,
  $t as useEmojiParse,
  fo as useLevel,
  l2 as usePage,
  re as withInstall
};
