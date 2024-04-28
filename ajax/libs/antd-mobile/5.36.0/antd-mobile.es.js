import * as L from "react";
import s, { useContext as it, useRef as V, useMemo as ie, useEffect as X, useState as K, useCallback as ze, useLayoutEffect as hs, forwardRef as me, useImperativeHandle as be, memo as je, isValidElement as Mn, createContext as vs, cloneElement as y1 } from "react";
import * as b1 from "react-dom";
import { unstable_batchedUpdates as E1, createPortal as w1, findDOMNode as C1 } from "react-dom";
const cr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
cr && document.addEventListener("touchstart", () => {
}, !0);
var Ji = function() {
  return Ji = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, Ji.apply(this, arguments);
};
function ur(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Oe(t, e, n, r) {
  function i(o) {
    return o instanceof n ? o : new n(function(a) {
      a(o);
    });
  }
  return new (n || (n = Promise))(function(o, a) {
    function l(f) {
      try {
        u(r.next(f));
      } catch (d) {
        a(d);
      }
    }
    function c(f) {
      try {
        u(r.throw(f));
      } catch (d) {
        a(d);
      }
    }
    function u(f) {
      f.done ? o(f.value) : i(f.value).then(l, c);
    }
    u((r = r.apply(t, e || [])).next());
  });
}
function x1(t, e) {
  var n = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, i, o, a;
  return a = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function l(u) {
    return function(f) {
      return c([u, f]);
    };
  }
  function c(u) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; a && (a = 0, u[0] && (n = 0)), n; )
      try {
        if (r = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done)
          return o;
        switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
          case 0:
          case 1:
            o = u;
            break;
          case 4:
            return n.label++, { value: u[1], done: !1 };
          case 5:
            n.label++, i = u[1], u = [0];
            continue;
          case 7:
            u = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < o[1]) {
              n.label = o[1], o = u;
              break;
            }
            if (o && n.label < o[2]) {
              n.label = o[2], n.ops.push(u);
              break;
            }
            o[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = e.call(t, n);
      } catch (f) {
        u = [6, f], i = 0;
      } finally {
        r = o = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function k1(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, n = e && t[e], r = 0;
  if (n)
    return n.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ct(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var r = n.call(t), i, o = [], a;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; )
      o.push(i.value);
  } catch (l) {
    a = { error: l };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return o;
}
function ps(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, o; r < i; r++)
      (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
const qe = "${label}不是一个有效的${type}", $1 = {
  locale: "zh-CH",
  common: {
    confirm: "确定",
    cancel: "取消",
    loading: "加载中",
    close: "关闭"
  },
  Calendar: {
    title: "日期选择",
    confirm: "确认",
    start: "开始",
    end: "结束",
    today: "今日",
    markItems: ["一", "二", "三", "四", "五", "六", "日"],
    yearAndMonth: "${year}年${month}月"
  },
  Cascader: {
    placeholder: "请选择"
  },
  Dialog: {
    ok: "我知道了"
  },
  DatePicker: {
    tillNow: "至今"
  },
  ErrorBlock: {
    default: {
      title: "页面遇到一些小问题",
      description: "待会来试试"
    },
    busy: {
      title: "前方拥堵",
      description: "刷新试试"
    },
    disconnected: {
      title: "网络有点忙",
      description: "动动手指帮忙修复"
    },
    empty: {
      title: "没有找到你需要的东西",
      description: "找找其他的吧"
    }
  },
  Form: {
    required: "必填",
    optional: "选填",
    defaultValidateMessages: {
      default: "字段验证错误${label}",
      required: "请输入${label}",
      enum: "${label}必须是其中一个[${enum}]",
      whitespace: "${label}不能为空字符",
      date: {
        format: "${label}日期格式无效",
        parse: "${label}不能转换为日期",
        invalid: "${label}是一个无效日期"
      },
      types: {
        string: qe,
        method: qe,
        array: qe,
        object: qe,
        number: qe,
        date: qe,
        boolean: qe,
        integer: qe,
        float: qe,
        regexp: qe,
        email: qe,
        url: qe,
        hex: qe
      },
      string: {
        len: "${label}须为${len}个字符",
        min: "${label}最少${min}个字符",
        max: "${label}最多${max}个字符",
        range: "${label}须在${min}-${max}字符之间"
      },
      number: {
        len: "${label}必须等于${len}",
        min: "${label}最小值为${min}",
        max: "${label}最大值为${max}",
        range: "${label}须在${min}-${max}之间"
      },
      array: {
        len: "须为${len}个${label}",
        min: "最少${min}个${label}",
        max: "最多${max}个${label}",
        range: "${label}数量须在${min}-${max}之间"
      },
      pattern: {
        mismatch: "${label}与模式不匹配${pattern}"
      }
    }
  },
  ImageUploader: {
    uploading: "上传中...",
    upload: "上传"
  },
  InfiniteScroll: {
    noMore: "没有更多了",
    failedToLoad: "加载失败",
    retry: "重新加载"
  },
  Input: {
    clear: "清除"
  },
  Mask: {
    name: "背景蒙层"
  },
  Modal: {
    ok: "我知道了"
  },
  PasscodeInput: {
    name: "密码输入框"
  },
  PullToRefresh: {
    pulling: "下拉刷新",
    canRelease: "释放立即刷新",
    complete: "刷新成功"
  },
  SearchBar: {
    name: "搜索框"
  },
  Slider: {
    name: "滑动输入条"
  },
  Stepper: {
    decrease: "减少",
    increase: "增加"
  },
  Switch: {
    name: "开关"
  },
  Selector: {
    name: "选择组"
  }
}, _1 = $1, hu = {
  current: {
    locale: _1
  }
};
function _7(t) {
  hu.current = t;
}
function li() {
  return hu.current;
}
const vu = s.createContext(null), O7 = (t) => {
  const {
    children: e
  } = t, n = ur(t, ["children"]), r = ye();
  return s.createElement(vu.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function ye() {
  var t;
  return (t = it(vu)) !== null && t !== void 0 ? t : li();
}
function le(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $t(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var pu = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(t) {
  (function() {
    var e = {}.hasOwnProperty;
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++) {
        var o = arguments[i];
        if (o) {
          var a = typeof o;
          if (a === "string" || a === "number")
            r.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var l = n.apply(null, o);
              l && r.push(l);
            }
          } else if (a === "object") {
            if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]")) {
              r.push(o.toString());
              continue;
            }
            for (var c in o)
              e.call(o, c) && o[c] && r.push(c);
          }
        }
      }
      return r.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(pu);
var O1 = pu.exports;
const j = /* @__PURE__ */ $t(O1);
function W(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = j(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
  for (const r in t)
    t.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = t[r]);
  return s.cloneElement(e, n);
}
function U(...t) {
  const e = {};
  return t.forEach((n) => {
    Object.keys(n).forEach((r) => {
      n[r] !== void 0 && (e[r] = n[r]);
    });
  }), e;
}
var gu = function(t) {
  return function(e, n) {
    var r = V(!1);
    t(function() {
      return function() {
        r.current = !1;
      };
    }, []), t(function() {
      if (!r.current)
        r.current = !0;
      else
        return e();
    }, n);
  };
}, fr = function(t) {
  return typeof t == "function";
}, S1 = function(t) {
  return typeof t == "number";
}, F1 = !1;
const ci = F1;
function Vt(t) {
  ci && (fr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = V(t);
  e.current = ie(function() {
    return t;
  }, [t]);
  var n = V();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const gs = gu(X);
function El(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function Co(t) {
  var e = V(t);
  return e.current = t, e;
}
var N1 = function(t) {
  ci && (fr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = Co(t);
  X(function() {
    return function() {
      e.current();
    };
  }, []);
};
const ui = N1;
function P1(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ys = P1, R1 = typeof ft == "object" && ft && ft.Object === Object && ft, M1 = R1, A1 = M1, T1 = typeof self == "object" && self && self.Object === Object && self, I1 = A1 || T1 || Function("return this")(), yu = I1, L1 = yu, D1 = function() {
  return L1.Date.now();
}, V1 = D1, j1 = /\s/;
function B1(t) {
  for (var e = t.length; e-- && j1.test(t.charAt(e)); )
    ;
  return e;
}
var W1 = B1, Z1 = W1, H1 = /^\s+/;
function z1(t) {
  return t && t.slice(0, Z1(t) + 1).replace(H1, "");
}
var U1 = z1, q1 = yu, K1 = q1.Symbol, bu = K1, wl = bu, Eu = Object.prototype, Y1 = Eu.hasOwnProperty, G1 = Eu.toString, wr = wl ? wl.toStringTag : void 0;
function X1(t) {
  var e = Y1.call(t, wr), n = t[wr];
  try {
    t[wr] = void 0;
    var r = !0;
  } catch {
  }
  var i = G1.call(t);
  return r && (e ? t[wr] = n : delete t[wr]), i;
}
var Q1 = X1, J1 = Object.prototype, e0 = J1.toString;
function t0(t) {
  return e0.call(t);
}
var n0 = t0, Cl = bu, r0 = Q1, i0 = n0, o0 = "[object Null]", a0 = "[object Undefined]", xl = Cl ? Cl.toStringTag : void 0;
function s0(t) {
  return t == null ? t === void 0 ? a0 : o0 : xl && xl in Object(t) ? r0(t) : i0(t);
}
var l0 = s0;
function c0(t) {
  return t != null && typeof t == "object";
}
var u0 = c0, f0 = l0, d0 = u0, m0 = "[object Symbol]";
function h0(t) {
  return typeof t == "symbol" || d0(t) && f0(t) == m0;
}
var v0 = h0, p0 = U1, kl = ys, g0 = v0, $l = NaN, y0 = /^[-+]0x[0-9a-f]+$/i, b0 = /^0b[01]+$/i, E0 = /^0o[0-7]+$/i, w0 = parseInt;
function C0(t) {
  if (typeof t == "number")
    return t;
  if (g0(t))
    return $l;
  if (kl(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = kl(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = p0(t);
  var n = b0.test(t);
  return n || E0.test(t) ? w0(t.slice(2), n ? 2 : 8) : y0.test(t) ? $l : +t;
}
var x0 = C0, k0 = ys, ta = V1, _l = x0, $0 = "Expected a function", _0 = Math.max, O0 = Math.min;
function S0(t, e, n) {
  var r, i, o, a, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError($0);
  e = _l(e) || 0, k0(n) && (f = !!n.leading, d = "maxWait" in n, o = d ? _0(_l(n.maxWait) || 0, e) : o, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var k = r, N = i;
    return r = i = void 0, u = x, a = t.apply(N, k), a;
  }
  function y(x) {
    return u = x, l = setTimeout(g, e), f ? b(x) : a;
  }
  function v(x) {
    var k = x - c, N = x - u, F = e - k;
    return d ? O0(F, o - N) : F;
  }
  function p(x) {
    var k = x - c, N = x - u;
    return c === void 0 || k >= e || k < 0 || d && N >= o;
  }
  function g() {
    var x = ta();
    if (p(x))
      return C(x);
    l = setTimeout(g, v(x));
  }
  function C(x) {
    return l = void 0, m && r ? b(x) : (r = i = void 0, a);
  }
  function h() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? a : C(ta());
  }
  function w() {
    var x = ta(), k = p(x);
    if (r = arguments, i = this, c = x, k) {
      if (l === void 0)
        return y(c);
      if (d)
        return clearTimeout(l), l = setTimeout(g, e), b(c);
    }
    return l === void 0 && (l = setTimeout(g, e)), a;
  }
  return w.cancel = h, w.flush = E, w;
}
var wu = S0;
const F0 = /* @__PURE__ */ $t(wu);
var N0 = !!(typeof window < "u" && window.document && window.document.createElement);
const bs = N0;
var P0 = wu, R0 = ys, M0 = "Expected a function";
function A0(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(M0);
  return R0(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), P0(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var T0 = A0;
const I0 = /* @__PURE__ */ $t(T0);
var L0 = function(t) {
  ci && (fr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), X(function() {
    t == null || t();
  }, []);
};
const D0 = L0;
var V0 = function() {
  var t = Ct(K({}), 2), e = t[1];
  return ze(function() {
    return e({});
  }, []);
};
const Cu = V0;
function en(t, e) {
  if (bs) {
    if (!t)
      return e;
    var n;
    return fr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var j0 = function(t) {
  return t.every(function(e) {
    var n = en(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, B0 = function(t) {
  return t ? t.getRootNode() : document;
}, W0 = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return j0(e) ? B0(en(e[0])) : document;
};
const Z0 = W0;
var H0 = function(t) {
  var e = function(n, r, i) {
    var o = V(!1), a = V([]), l = V([]), c = V();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return en(m);
      });
      if (!o.current) {
        o.current = !0, a.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== a.current.length || !El(d, a.current) || !El(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), a.current = d, l.current = r, c.current = n());
    }), ui(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), o.current = !1;
    });
  };
  return e;
};
const xu = H0;
var z0 = xu(X);
const Es = z0;
function ku(t, e, n) {
  n === void 0 && (n = "click");
  var r = Co(t);
  Es(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = en(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, o = Z0(e), a = Array.isArray(n) ? n : [n];
    return a.forEach(function(l) {
      return o.addEventListener(l, i);
    }), function() {
      a.forEach(function(l) {
        return o.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var $u = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    var n = 1e3, r = 6e4, i = 36e5, o = "millisecond", a = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", y = "date", v = "Invalid Date", p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
      var $ = ["th", "st", "nd", "rd"], M = R % 100;
      return "[" + R + ($[(M - 20) % 10] || $[M] || $[0]) + "]";
    } }, h = function(R, $, M) {
      var S = String(R);
      return !S || S.length >= $ ? R : "" + Array($ + 1 - S.length).join(M) + R;
    }, E = { s: h, z: function(R) {
      var $ = -R.utcOffset(), M = Math.abs($), S = Math.floor(M / 60), O = M % 60;
      return ($ <= 0 ? "+" : "-") + h(S, 2, "0") + ":" + h(O, 2, "0");
    }, m: function R($, M) {
      if ($.date() < M.date())
        return -R(M, $);
      var S = 12 * (M.year() - $.year()) + (M.month() - $.month()), O = $.clone().add(S, d), A = M - O < 0, P = $.clone().add(S + (A ? -1 : 1), d);
      return +(-(S + (M - O) / (A ? O - P : P - O)) || 0);
    }, a: function(R) {
      return R < 0 ? Math.ceil(R) || 0 : Math.floor(R);
    }, p: function(R) {
      return { M: d, y: b, w: f, d: u, D: y, h: c, m: l, s: a, ms: o, Q: m }[R] || String(R || "").toLowerCase().replace(/s$/, "");
    }, u: function(R) {
      return R === void 0;
    } }, w = "en", x = {};
    x[w] = C;
    var k = function(R) {
      return R instanceof D;
    }, N = function R($, M, S) {
      var O;
      if (!$)
        return w;
      if (typeof $ == "string") {
        var A = $.toLowerCase();
        x[A] && (O = A), M && (x[A] = M, O = A);
        var P = $.split("-");
        if (!O && P.length > 1)
          return R(P[0]);
      } else {
        var T = $.name;
        x[T] = $, O = T;
      }
      return !S && O && (w = O), O || !S && w;
    }, F = function(R, $) {
      if (k(R))
        return R.clone();
      var M = typeof $ == "object" ? $ : {};
      return M.date = R, M.args = arguments, new D(M);
    }, _ = E;
    _.l = N, _.i = k, _.w = function(R, $) {
      return F(R, { locale: $.$L, utc: $.$u, x: $.$x, $offset: $.$offset });
    };
    var D = function() {
      function R(M) {
        this.$L = N(M.locale, null, !0), this.parse(M);
      }
      var $ = R.prototype;
      return $.parse = function(M) {
        this.$d = function(S) {
          var O = S.date, A = S.utc;
          if (O === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(O))
            return /* @__PURE__ */ new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var P = O.match(p);
            if (P) {
              var T = P[2] - 1 || 0, B = (P[7] || "0").substring(0, 3);
              return A ? new Date(Date.UTC(P[1], T, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, B)) : new Date(P[1], T, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, B);
            }
          }
          return new Date(O);
        }(M), this.$x = M.x || {}, this.init();
      }, $.init = function() {
        var M = this.$d;
        this.$y = M.getFullYear(), this.$M = M.getMonth(), this.$D = M.getDate(), this.$W = M.getDay(), this.$H = M.getHours(), this.$m = M.getMinutes(), this.$s = M.getSeconds(), this.$ms = M.getMilliseconds();
      }, $.$utils = function() {
        return _;
      }, $.isValid = function() {
        return this.$d.toString() !== v;
      }, $.isSame = function(M, S) {
        var O = F(M);
        return this.startOf(S) <= O && O <= this.endOf(S);
      }, $.isAfter = function(M, S) {
        return F(M) < this.startOf(S);
      }, $.isBefore = function(M, S) {
        return this.endOf(S) < F(M);
      }, $.$g = function(M, S, O) {
        return _.u(M) ? this[S] : this.set(O, M);
      }, $.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, $.valueOf = function() {
        return this.$d.getTime();
      }, $.startOf = function(M, S) {
        var O = this, A = !!_.u(S) || S, P = _.p(M), T = function(Ee, z) {
          var ee = _.w(O.$u ? Date.UTC(O.$y, z, Ee) : new Date(O.$y, z, Ee), O);
          return A ? ee : ee.endOf(u);
        }, B = function(Ee, z) {
          return _.w(O.toDate()[Ee].apply(O.toDate("s"), (A ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(z)), O);
        }, Z = this.$W, q = this.$M, Y = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case b:
            return A ? T(1, 0) : T(31, 11);
          case d:
            return A ? T(1, q) : T(0, q + 1);
          case f:
            var ce = this.$locale().weekStart || 0, he = (Z < ce ? Z + 7 : Z) - ce;
            return T(A ? Y - he : Y + (6 - he), q);
          case u:
          case y:
            return B(G + "Hours", 0);
          case c:
            return B(G + "Minutes", 1);
          case l:
            return B(G + "Seconds", 2);
          case a:
            return B(G + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, $.endOf = function(M) {
        return this.startOf(M, !1);
      }, $.$set = function(M, S) {
        var O, A = _.p(M), P = "set" + (this.$u ? "UTC" : ""), T = (O = {}, O[u] = P + "Date", O[y] = P + "Date", O[d] = P + "Month", O[b] = P + "FullYear", O[c] = P + "Hours", O[l] = P + "Minutes", O[a] = P + "Seconds", O[o] = P + "Milliseconds", O)[A], B = A === u ? this.$D + (S - this.$W) : S;
        if (A === d || A === b) {
          var Z = this.clone().set(y, 1);
          Z.$d[T](B), Z.init(), this.$d = Z.set(y, Math.min(this.$D, Z.daysInMonth())).$d;
        } else
          T && this.$d[T](B);
        return this.init(), this;
      }, $.set = function(M, S) {
        return this.clone().$set(M, S);
      }, $.get = function(M) {
        return this[_.p(M)]();
      }, $.add = function(M, S) {
        var O, A = this;
        M = Number(M);
        var P = _.p(S), T = function(q) {
          var Y = F(A);
          return _.w(Y.date(Y.date() + Math.round(q * M)), A);
        };
        if (P === d)
          return this.set(d, this.$M + M);
        if (P === b)
          return this.set(b, this.$y + M);
        if (P === u)
          return T(1);
        if (P === f)
          return T(7);
        var B = (O = {}, O[l] = r, O[c] = i, O[a] = n, O)[P] || 1, Z = this.$d.getTime() + M * B;
        return _.w(Z, this);
      }, $.subtract = function(M, S) {
        return this.add(-1 * M, S);
      }, $.format = function(M) {
        var S = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || v;
        var A = M || "YYYY-MM-DDTHH:mm:ssZ", P = _.z(this), T = this.$H, B = this.$m, Z = this.$M, q = O.weekdays, Y = O.months, G = O.meridiem, ce = function(z, ee, J, te) {
          return z && (z[ee] || z(S, A)) || J[ee].slice(0, te);
        }, he = function(z) {
          return _.s(T % 12 || 12, z, "0");
        }, Ee = G || function(z, ee, J) {
          var te = z < 12 ? "AM" : "PM";
          return J ? te.toLowerCase() : te;
        };
        return A.replace(g, function(z, ee) {
          return ee || function(J) {
            switch (J) {
              case "YY":
                return String(S.$y).slice(-2);
              case "YYYY":
                return _.s(S.$y, 4, "0");
              case "M":
                return Z + 1;
              case "MM":
                return _.s(Z + 1, 2, "0");
              case "MMM":
                return ce(O.monthsShort, Z, Y, 3);
              case "MMMM":
                return ce(Y, Z);
              case "D":
                return S.$D;
              case "DD":
                return _.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return ce(O.weekdaysMin, S.$W, q, 2);
              case "ddd":
                return ce(O.weekdaysShort, S.$W, q, 3);
              case "dddd":
                return q[S.$W];
              case "H":
                return String(T);
              case "HH":
                return _.s(T, 2, "0");
              case "h":
                return he(1);
              case "hh":
                return he(2);
              case "a":
                return Ee(T, B, !0);
              case "A":
                return Ee(T, B, !1);
              case "m":
                return String(B);
              case "mm":
                return _.s(B, 2, "0");
              case "s":
                return String(S.$s);
              case "ss":
                return _.s(S.$s, 2, "0");
              case "SSS":
                return _.s(S.$ms, 3, "0");
              case "Z":
                return P;
            }
            return null;
          }(z) || P.replace(":", "");
        });
      }, $.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, $.diff = function(M, S, O) {
        var A, P = this, T = _.p(S), B = F(M), Z = (B.utcOffset() - this.utcOffset()) * r, q = this - B, Y = function() {
          return _.m(P, B);
        };
        switch (T) {
          case b:
            A = Y() / 12;
            break;
          case d:
            A = Y();
            break;
          case m:
            A = Y() / 3;
            break;
          case f:
            A = (q - Z) / 6048e5;
            break;
          case u:
            A = (q - Z) / 864e5;
            break;
          case c:
            A = q / i;
            break;
          case l:
            A = q / r;
            break;
          case a:
            A = q / n;
            break;
          default:
            A = q;
        }
        return O ? A : _.a(A);
      }, $.daysInMonth = function() {
        return this.endOf(d).$D;
      }, $.$locale = function() {
        return x[this.$L];
      }, $.locale = function(M, S) {
        if (!M)
          return this.$L;
        var O = this.clone(), A = N(M, S, !0);
        return A && (O.$L = A), O;
      }, $.clone = function() {
        return _.w(this.$d, this);
      }, $.toDate = function() {
        return new Date(this.valueOf());
      }, $.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, $.toISOString = function() {
        return this.$d.toISOString();
      }, $.toString = function() {
        return this.$d.toUTCString();
      }, R;
    }(), I = D.prototype;
    return F.prototype = I, [["$ms", o], ["$s", a], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", y]].forEach(function(R) {
      I[R[1]] = function($) {
        return this.$g($, R[0], R[1]);
      };
    }), F.extend = function(R, $) {
      return R.$i || (R($, D, F), R.$i = !0), F;
    }, F.locale = N, F.isDayjs = k, F.unix = function(R) {
      return F(1e3 * R);
    }, F.en = x[w], F.Ls = x, F.p = {}, F;
  });
})($u);
var U0 = $u.exports;
const ve = /* @__PURE__ */ $t(U0);
function q0(t, e) {
  var n;
  ci && (fr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = Co(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = ie(function() {
    return F0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, ps([], Ct(a), !1));
    }, i, e);
  }, []);
  return ui(function() {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function K0(t, e, n) {
  var r = Ct(K({}), 2), i = r[0], o = r[1], a = q0(function() {
    o({});
  }, n).run;
  X(function() {
    return a();
  }, e), gs(t, [i]);
}
function Y0(t) {
  var e = Ct(K(t), 2), n = e[0], r = e[1], i = V(n);
  i.current = n;
  var o = ze(function() {
    return i.current;
  }, []);
  return [n, r, o];
}
(function() {
  if (typeof window != "object")
    return;
  if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(
      window.IntersectionObserverEntry.prototype,
      "isIntersecting",
      {
        get: function() {
          return this.intersectionRatio > 0;
        }
      }
    );
    return;
  }
  function t(h) {
    try {
      return h.defaultView && h.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var e = function(h) {
    for (var E = h, w = t(E); w; )
      E = w.ownerDocument, w = t(E);
    return E;
  }(window.document), n = [], r = null, i = null;
  function o(h) {
    this.time = h.time, this.target = h.target, this.rootBounds = y(h.rootBounds), this.boundingClientRect = y(h.boundingClientRect), this.intersectionRect = y(h.intersectionRect || b()), this.isIntersecting = !!h.intersectionRect;
    var E = this.boundingClientRect, w = E.width * E.height, x = this.intersectionRect, k = x.width * x.height;
    w ? this.intersectionRatio = Number((k / w).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function a(h, E) {
    var w = E || {};
    if (typeof h != "function")
      throw new Error("callback must be a function");
    if (w.root && w.root.nodeType != 1 && w.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = h, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(w.rootMargin), this.thresholds = this._initThresholds(w.threshold), this.root = w.root || null, this.rootMargin = this._rootMarginValues.map(function(x) {
      return x.value + x.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  a.prototype.THROTTLE_TIMEOUT = 100, a.prototype.POLL_INTERVAL = null, a.prototype.USE_MUTATION_OBSERVER = !0, a._setupCrossOriginUpdater = function() {
    return r || (r = function(h, E) {
      !h || !E ? i = b() : i = v(h, E), n.forEach(function(w) {
        w._checkForIntersections();
      });
    }), r;
  }, a._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, a.prototype.observe = function(h) {
    var E = this._observationTargets.some(function(w) {
      return w.element == h;
    });
    if (!E) {
      if (!(h && h.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: h, entry: null }), this._monitorIntersections(h.ownerDocument), this._checkForIntersections();
    }
  }, a.prototype.unobserve = function(h) {
    this._observationTargets = this._observationTargets.filter(function(E) {
      return E.element != h;
    }), this._unmonitorIntersections(h.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, a.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, a.prototype.takeRecords = function() {
    var h = this._queuedEntries.slice();
    return this._queuedEntries = [], h;
  }, a.prototype._initThresholds = function(h) {
    var E = h || [0];
    return Array.isArray(E) || (E = [E]), E.sort().filter(function(w, x, k) {
      if (typeof w != "number" || isNaN(w) || w < 0 || w > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return w !== k[x - 1];
    });
  }, a.prototype._parseRootMargin = function(h) {
    var E = h || "0px", w = E.split(/\s+/).map(function(x) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(x);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return w[1] = w[1] || w[0], w[2] = w[2] || w[0], w[3] = w[3] || w[1], w;
  }, a.prototype._monitorIntersections = function(h) {
    var E = h.defaultView;
    if (E && this._monitoringDocuments.indexOf(h) == -1) {
      var w = this._checkForIntersections, x = null, k = null;
      this.POLL_INTERVAL ? x = E.setInterval(w, this.POLL_INTERVAL) : (u(E, "resize", w, !0), u(h, "scroll", w, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in E && (k = new E.MutationObserver(w), k.observe(h, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(h), this._monitoringUnsubscribes.push(function() {
        var _ = h.defaultView;
        _ && (x && _.clearInterval(x), f(_, "resize", w, !0)), f(h, "scroll", w, !0), k && k.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || e;
      if (h != N) {
        var F = t(h);
        F && this._monitorIntersections(F.ownerDocument);
      }
    }
  }, a.prototype._unmonitorIntersections = function(h) {
    var E = this._monitoringDocuments.indexOf(h);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, x = this._observationTargets.some(function(F) {
        var _ = F.element.ownerDocument;
        if (_ == h)
          return !0;
        for (; _ && _ != w; ) {
          var D = t(_);
          if (_ = D && D.ownerDocument, _ == h)
            return !0;
        }
        return !1;
      });
      if (!x) {
        var k = this._monitoringUnsubscribes[E];
        if (this._monitoringDocuments.splice(E, 1), this._monitoringUnsubscribes.splice(E, 1), k(), h != w) {
          var N = t(h);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, a.prototype._unmonitorAllIntersections = function() {
    var h = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var E = 0; E < h.length; E++)
      h[E]();
  }, a.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var h = this._rootIsInDom(), E = h ? this._getRootRect() : b();
      this._observationTargets.forEach(function(w) {
        var x = w.element, k = m(x), N = this._rootContainsTarget(x), F = w.entry, _ = h && N && this._computeTargetAndRootIntersection(x, k, E), D = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (D = E) : D = b();
        var I = w.entry = new o({
          time: l(),
          target: x,
          boundingClientRect: k,
          rootBounds: D,
          intersectionRect: _
        });
        F ? h && N ? this._hasCrossedThreshold(F, I) && this._queuedEntries.push(I) : F && F.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, a.prototype._computeTargetAndRootIntersection = function(h, E, w) {
    if (window.getComputedStyle(h).display != "none") {
      for (var x = E, k = g(h), N = !1; !N && k; ) {
        var F = null, _ = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (_.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (N = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, F = null, x = null) : F = i : F = w;
          else {
            var D = g(k), I = D && m(D), R = D && this._computeTargetAndRootIntersection(D, I, w);
            I && R ? (k = D, F = v(I, R)) : (k = null, x = null);
          }
        else {
          var $ = k.ownerDocument;
          k != $.body && k != $.documentElement && _.overflow != "visible" && (F = m(k));
        }
        if (F && (x = d(F, x)), !x)
          break;
        k = k && g(k);
      }
      return x;
    }
  }, a.prototype._getRootRect = function() {
    var h;
    if (this.root && !C(this.root))
      h = m(this.root);
    else {
      var E = C(this.root) ? this.root : e, w = E.documentElement, x = E.body;
      h = {
        top: 0,
        left: 0,
        right: w.clientWidth || x.clientWidth,
        width: w.clientWidth || x.clientWidth,
        bottom: w.clientHeight || x.clientHeight,
        height: w.clientHeight || x.clientHeight
      };
    }
    return this._expandRectByRootMargin(h);
  }, a.prototype._expandRectByRootMargin = function(h) {
    var E = this._rootMarginValues.map(function(x, k) {
      return x.unit == "px" ? x.value : x.value * (k % 2 ? h.width : h.height) / 100;
    }), w = {
      top: h.top - E[0],
      right: h.right + E[1],
      bottom: h.bottom + E[2],
      left: h.left - E[3]
    };
    return w.width = w.right - w.left, w.height = w.bottom - w.top, w;
  }, a.prototype._hasCrossedThreshold = function(h, E) {
    var w = h && h.isIntersecting ? h.intersectionRatio || 0 : -1, x = E.isIntersecting ? E.intersectionRatio || 0 : -1;
    if (w !== x)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == w || N == x || N < w != N < x)
          return !0;
      }
  }, a.prototype._rootIsInDom = function() {
    return !this.root || p(e, this.root);
  }, a.prototype._rootContainsTarget = function(h) {
    var E = this.root && (this.root.ownerDocument || this.root) || e;
    return p(E, h) && (!this.root || E == h.ownerDocument);
  }, a.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, a.prototype._unregisterInstance = function() {
    var h = n.indexOf(this);
    h != -1 && n.splice(h, 1);
  };
  function l() {
    return window.performance && performance.now && performance.now();
  }
  function c(h, E) {
    var w = null;
    return function() {
      w || (w = setTimeout(function() {
        h(), w = null;
      }, E));
    };
  }
  function u(h, E, w, x) {
    typeof h.addEventListener == "function" ? h.addEventListener(E, w, x || !1) : typeof h.attachEvent == "function" && h.attachEvent("on" + E, w);
  }
  function f(h, E, w, x) {
    typeof h.removeEventListener == "function" ? h.removeEventListener(E, w, x || !1) : typeof h.detachEvent == "function" && h.detachEvent("on" + E, w);
  }
  function d(h, E) {
    var w = Math.max(h.top, E.top), x = Math.min(h.bottom, E.bottom), k = Math.max(h.left, E.left), N = Math.min(h.right, E.right), F = N - k, _ = x - w;
    return F >= 0 && _ >= 0 && {
      top: w,
      bottom: x,
      left: k,
      right: N,
      width: F,
      height: _
    } || null;
  }
  function m(h) {
    var E;
    try {
      E = h.getBoundingClientRect();
    } catch {
    }
    return E ? (E.width && E.height || (E = {
      top: E.top,
      right: E.right,
      bottom: E.bottom,
      left: E.left,
      width: E.right - E.left,
      height: E.bottom - E.top
    }), E) : b();
  }
  function b() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  function y(h) {
    return !h || "x" in h ? h : {
      top: h.top,
      y: h.top,
      bottom: h.bottom,
      left: h.left,
      x: h.left,
      right: h.right,
      width: h.width,
      height: h.height
    };
  }
  function v(h, E) {
    var w = E.top - h.top, x = E.left - h.left;
    return {
      top: w,
      left: x,
      height: E.height,
      width: E.width,
      bottom: w + E.height,
      right: x + E.width
    };
  }
  function p(h, E) {
    for (var w = E; w; ) {
      if (w == h)
        return !0;
      w = g(w);
    }
    return !1;
  }
  function g(h) {
    var E = h.parentNode;
    return h.nodeType == /* DOCUMENT */
    9 && h != e ? t(h) : (E && E.assignedSlot && (E = E.assignedSlot.parentNode), E && E.nodeType == 11 && E.host ? E.host : E);
  }
  function C(h) {
    return h && h.nodeType === 9;
  }
  window.IntersectionObserver = a, window.IntersectionObserverEntry = o;
})();
function G0(t, e) {
  var n = Ct(K(), 2), r = n[0], i = n[1], o = Ct(K(), 2), a = o[0], l = o[1];
  return Es(function() {
    var c = en(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = k1(f), y = b.next(); !y.done; y = b.next()) {
            var v = y.value;
            l(v.intersectionRatio), i(v.isIntersecting);
          }
        } catch (p) {
          d = {
            error: p
          };
        } finally {
          try {
            y && !y.done && (m = b.return) && m.call(b);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, Ji(Ji({}, e), {
        root: en(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, a];
}
var X0 = bs ? hs : X;
const Fe = X0;
function Q0(t) {
  var e = this, n = V(!1);
  return ze(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Oe(e, void 0, void 0, function() {
      var o, a;
      return x1(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, ps([], Ct(r), !1))];
          case 2:
            return o = l.sent(), n.current = !1, [2, o];
          case 3:
            throw a = l.sent(), n.current = !1, a;
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, [t]);
}
function J0(t) {
  var e = V(0), n = Ct(K(t), 2), r = n[0], i = n[1], o = ze(function(a) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(a);
    });
  }, []);
  return ui(function() {
    cancelAnimationFrame(e.current);
  }), [r, o];
}
var em = function() {
  var t = V(!1);
  return X(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const ws = em;
var _u = function() {
  if (typeof Map < "u")
    return Map;
  function t(e, n) {
    var r = -1;
    return e.some(function(i, o) {
      return i[0] === n ? (r = o, !0) : !1;
    }), r;
  }
  return (
    /** @class */
    function() {
      function e() {
        this.__entries__ = [];
      }
      return Object.defineProperty(e.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), e.prototype.get = function(n) {
        var r = t(this.__entries__, n), i = this.__entries__[r];
        return i && i[1];
      }, e.prototype.set = function(n, r) {
        var i = t(this.__entries__, n);
        ~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);
      }, e.prototype.delete = function(n) {
        var r = this.__entries__, i = t(r, n);
        ~i && r.splice(i, 1);
      }, e.prototype.has = function(n) {
        return !!~t(this.__entries__, n);
      }, e.prototype.clear = function() {
        this.__entries__.splice(0);
      }, e.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var i = 0, o = this.__entries__; i < o.length; i++) {
          var a = o[i];
          n.call(r, a[1], a[0]);
        }
      }, e;
    }()
  );
}(), _a = typeof window < "u" && typeof document < "u" && window.document === document, eo = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), tm = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(eo) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), nm = 2;
function rm(t, e) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, t()), r && l();
  }
  function a() {
    tm(o);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < nm)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(a, e);
    i = c;
  }
  return l;
}
var im = 20, om = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], am = typeof MutationObserver < "u", sm = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = rm(this.refresh.bind(this), im);
    }
    return t.prototype.addObserver = function(e) {
      ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_();
    }, t.prototype.removeObserver = function(e) {
      var n = this.observers_, r = n.indexOf(e);
      ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
    }, t.prototype.refresh = function() {
      var e = this.updateObservers_();
      e && this.refresh();
    }, t.prototype.updateObservers_ = function() {
      var e = this.observers_.filter(function(n) {
        return n.gatherActive(), n.hasActive();
      });
      return e.forEach(function(n) {
        return n.broadcastActive();
      }), e.length > 0;
    }, t.prototype.connect_ = function() {
      !_a || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), am ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !_a || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = om.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), Ou = function(t, e) {
  for (var n = 0, r = Object.keys(e); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(t, i, {
      value: e[i],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return t;
}, er = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || eo;
}, Su = xo(0, 0, 0, 0);
function to(t) {
  return parseFloat(t) || 0;
}
function Ol(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var o = t["border-" + i + "-width"];
    return r + to(o);
  }, 0);
}
function lm(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var o = i[r], a = t["padding-" + o];
    n[o] = to(a);
  }
  return n;
}
function cm(t) {
  var e = t.getBBox();
  return xo(0, 0, e.width, e.height);
}
function um(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return Su;
  var r = er(t).getComputedStyle(t), i = lm(r), o = i.left + i.right, a = i.top + i.bottom, l = to(r.width), c = to(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + o) !== e && (l -= Ol(r, "left", "right") + o), Math.round(c + a) !== n && (c -= Ol(r, "top", "bottom") + a)), !dm(t)) {
    var u = Math.round(l + o) - e, f = Math.round(c + a) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return xo(i.left, i.top, l, c);
}
var fm = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof er(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof er(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function dm(t) {
  return t === er(t).document.documentElement;
}
function mm(t) {
  return _a ? fm(t) ? cm(t) : um(t) : Su;
}
function hm(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, a = Object.create(o.prototype);
  return Ou(a, {
    x: e,
    y: n,
    width: r,
    height: i,
    top: n,
    right: e + r,
    bottom: i + n,
    left: e
  }), a;
}
function xo(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var vm = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = xo(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = mm(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), pm = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = hm(n);
      Ou(this, { target: e, contentRect: r });
    }
    return t;
  }()
), gm = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new _u(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof er(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new vm(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof er(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) && (n.delete(e), n.size || this.controller_.removeObserver(this));
      }
    }, t.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, t.prototype.gatherActive = function() {
      var e = this;
      this.clearActive(), this.observations_.forEach(function(n) {
        n.isActive() && e.activeObservations_.push(n);
      });
    }, t.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var e = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
          return new pm(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), Fu = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new _u(), Nu = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = sm.getInstance(), r = new gm(e, n, this);
      Fu.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  Nu.prototype[t] = function() {
    var e;
    return (e = Fu.get(this))[t].apply(e, arguments);
  };
});
var ym = function() {
  return typeof eo.ResizeObserver < "u" ? eo.ResizeObserver : Nu;
}(), bm = xu(hs);
const Em = bm;
var wm = bs ? Em : Es;
const Cm = wm;
function Oa(t) {
  var e = Ct(J0(function() {
    var i = en(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return Cm(function() {
    var i = en(t);
    if (i) {
      var o = new ym(function(a) {
        a.forEach(function(l) {
          var c = l.target, u = c.clientWidth, f = c.clientHeight;
          r({
            width: u,
            height: f
          });
        });
      });
      return o.observe(i), function() {
        o.disconnect();
      };
    }
  }, [], t), n;
}
function ko(t, e) {
  var n;
  ci && (fr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = Co(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = ie(function() {
    return I0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, ps([], Ct(a), !1));
    }, i, e);
  }, []);
  return ui(function() {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
var xm = function(t, e) {
  var n = Vt(t), r = V(null), i = ze(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return X(function() {
    if (!(!S1(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const km = xm, Sl = 10;
function $m(t, e) {
  return t > e && t > Sl ? "horizontal" : e > t && e > Sl ? "vertical" : "";
}
function _m() {
  const t = V(0), e = V(0), n = V(0), r = V(0), i = V(0), o = V(0), a = V(""), l = () => a.current === "vertical", c = () => a.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, o.current = 0, a.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), o.current = Math.abs(r.current), a.current || (a.current = $m(i.current, o.current));
    },
    start: (m) => {
      u(), t.current = m.touches[0].clientX, e.current = m.touches[0].clientY;
    },
    reset: u,
    startX: t,
    startY: e,
    deltaX: n,
    deltaY: r,
    offsetX: i,
    offsetY: o,
    direction: a,
    isVertical: l,
    isHorizontal: c
  };
}
const Om = cr ? window : void 0, Sm = ["scroll", "auto", "overlay"];
function Fm(t) {
  return t.nodeType === 1;
}
function no(t, e = Om) {
  let n = t;
  for (; n && n !== e && Fm(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Sm.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Sn = !1;
if (cr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Sn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let Cr = 0;
const Fl = "adm-overflow-hidden";
function Nm(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function $o(t, e) {
  const n = _m(), r = (a) => {
    n.move(a);
    const l = n.deltaY.current > 0 ? "10" : "01", c = no(a.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const y = Nm(a.target);
      if (y === document.body || y === document.documentElement) {
        a.preventDefault();
        return;
      }
    }
    const {
      scrollHeight: u,
      offsetHeight: f,
      scrollTop: d
    } = c, {
      height: m
    } = c.getBoundingClientRect();
    let b = "11";
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(l, 2)) && a.cancelable && Sn && a.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Sn ? {
      passive: !1
    } : !1), Cr || document.body.classList.add(Fl), Cr++;
  }, o = () => {
    Cr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Cr--, Cr || document.body.classList.remove(Fl));
  };
  X(() => {
    if (e)
      return i(), () => {
        o();
      };
  }, [e]);
}
let Cs = di();
const Q = (t) => fi(t, Cs);
let xs = di();
Q.write = (t) => fi(t, xs);
let _o = di();
Q.onStart = (t) => fi(t, _o);
let ks = di();
Q.onFrame = (t) => fi(t, ks);
let $s = di();
Q.onFinish = (t) => fi(t, $s);
let Gn = [];
Q.setTimeout = (t, e) => {
  let n = Q.now() + e, r = () => {
    let o = Gn.findIndex((a) => a.cancel == r);
    ~o && Gn.splice(o, 1), Xt -= ~o ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return Gn.splice(Pu(n), 0, i), Xt += 1, Ru(), i;
};
let Pu = (t) => ~(~Gn.findIndex((e) => e.time > t) || ~Gn.length);
Q.cancel = (t) => {
  _o.delete(t), ks.delete(t), $s.delete(t), Cs.delete(t), xs.delete(t);
};
Q.sync = (t) => {
  Sa = !0, Q.batchedUpdates(t), Sa = !1;
};
Q.throttle = (t) => {
  let e;
  function n() {
    try {
      t(...e);
    } finally {
      e = null;
    }
  }
  function r(...i) {
    e = i, Q.onStart(n);
  }
  return r.handler = t, r.cancel = () => {
    _o.delete(n), e = null;
  }, r;
};
let _s = typeof window < "u" ? window.requestAnimationFrame : () => {
};
Q.use = (t) => _s = t;
Q.now = typeof performance < "u" ? () => performance.now() : Date.now;
Q.batchedUpdates = (t) => t();
Q.catch = console.error;
Q.frameLoop = "always";
Q.advance = () => {
  Q.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Au();
};
let Gt = -1, Xt = 0, Sa = !1;
function fi(t, e) {
  Sa ? (e.delete(t), t(0)) : (e.add(t), Ru());
}
function Ru() {
  Gt < 0 && (Gt = 0, Q.frameLoop !== "demand" && _s(Mu));
}
function Pm() {
  Gt = -1;
}
function Mu() {
  ~Gt && (_s(Mu), Q.batchedUpdates(Au));
}
function Au() {
  let t = Gt;
  Gt = Q.now();
  let e = Pu(Gt);
  if (e && (Tu(Gn.splice(0, e), (n) => n.handler()), Xt -= e), !Xt) {
    Pm();
    return;
  }
  _o.flush(), Cs.flush(t ? Math.min(64, Gt - t) : 16.667), ks.flush(), xs.flush(), $s.flush();
}
function di() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      Xt += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return Xt -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), Xt -= e.size, Tu(e, (r) => r(n) && t.add(r)), Xt += t.size, e = t);
    }
  };
}
function Tu(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      Q.catch(r);
    }
  });
}
function Fa() {
}
const Rm = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), H = {
  arr: Array.isArray,
  obj: (t) => !!t && t.constructor.name === "Object",
  fun: (t) => typeof t == "function",
  str: (t) => typeof t == "string",
  num: (t) => typeof t == "number",
  und: (t) => t === void 0
};
function Rt(t, e) {
  if (H.arr(t)) {
    if (!H.arr(e) || t.length !== e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  return t === e;
}
const re = (t, e) => t.forEach(e);
function xt(t, e, n) {
  if (H.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const Ye = (t) => H.und(t) ? [] : H.arr(t) ? t : [t];
function Br(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), re(n, e);
  }
}
const Dr = (t, ...e) => Br(t, (n) => n(...e)), Os = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Ss, Iu, Jt = null, Lu = !1, Fs = Fa;
const Mm = (t) => {
  t.to && (Iu = t.to), t.now && (Q.now = t.now), t.colors !== void 0 && (Jt = t.colors), t.skipAnimation != null && (Lu = t.skipAnimation), t.createStringInterpolator && (Ss = t.createStringInterpolator), t.requestAnimationFrame && Q.use(t.requestAnimationFrame), t.batchedUpdates && (Q.batchedUpdates = t.batchedUpdates), t.willAdvance && (Fs = t.willAdvance), t.frameLoop && (Q.frameLoop = t.frameLoop);
};
var ot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Ss;
  },
  get to() {
    return Iu;
  },
  get colors() {
    return Jt;
  },
  get skipAnimation() {
    return Lu;
  },
  get willAdvance() {
    return Fs;
  },
  assign: Mm
});
const Wr = /* @__PURE__ */ new Set();
let rt = [], na = [], ro = 0;
const Oo = {
  get idle() {
    return !Wr.size && !rt.length;
  },
  start(t) {
    ro > t.priority ? (Wr.add(t), Q.onStart(Am)) : (Du(t), Q(Na));
  },
  advance: Na,
  sort(t) {
    if (ro)
      Q.onFrame(() => Oo.sort(t));
    else {
      const e = rt.indexOf(t);
      ~e && (rt.splice(e, 1), Vu(t));
    }
  },
  clear() {
    rt = [], Wr.clear();
  }
};
function Am() {
  Wr.forEach(Du), Wr.clear(), Q(Na);
}
function Du(t) {
  rt.includes(t) || Vu(t);
}
function Vu(t) {
  rt.splice(Tm(rt, (e) => e.priority > t.priority), 0, t);
}
function Na(t) {
  const e = na;
  for (let n = 0; n < rt.length; n++) {
    const r = rt[n];
    ro = r.priority, r.idle || (Fs(r), r.advance(t), r.idle || e.push(r));
  }
  return ro = 0, na = rt, na.length = 0, rt = e, rt.length > 0;
}
function Tm(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Im = (t, e, n) => Math.min(Math.max(n, t), e), Lm = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
}, dt = "[-+]?\\d*\\.?\\d+", io = dt + "%";
function So(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const Dm = new RegExp("rgb" + So(dt, dt, dt)), Vm = new RegExp("rgba" + So(dt, dt, dt, dt)), jm = new RegExp("hsl" + So(dt, io, io)), Bm = new RegExp("hsla" + So(dt, io, io, dt)), Wm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Zm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Hm = /^#([0-9a-fA-F]{6})$/, zm = /^#([0-9a-fA-F]{8})$/;
function Um(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = Hm.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : Jt && Jt[t] !== void 0 ? Jt[t] : (e = Dm.exec(t)) ? (Tn(e[1]) << 24 | Tn(e[2]) << 16 | Tn(e[3]) << 8 | 255) >>> 0 : (e = Vm.exec(t)) ? (Tn(e[1]) << 24 | Tn(e[2]) << 16 | Tn(e[3]) << 8 | Rl(e[4])) >>> 0 : (e = Wm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = zm.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = Zm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = jm.exec(t)) ? (Nl(Pl(e[1]), Oi(e[2]), Oi(e[3])) | 255) >>> 0 : (e = Bm.exec(t)) ? (Nl(Pl(e[1]), Oi(e[2]), Oi(e[3])) | Rl(e[4])) >>> 0 : null;
}
function ra(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Nl(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, o = ra(i, r, t + 1 / 3), a = ra(i, r, t), l = ra(i, r, t - 1 / 3);
  return Math.round(o * 255) << 24 | Math.round(a * 255) << 16 | Math.round(l * 255) << 8;
}
function Tn(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function Pl(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Rl(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function Oi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Ml(t) {
  let e = Um(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, o = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${o})`;
}
const Kr = (t, e, n) => {
  if (H.fun(t))
    return t;
  if (H.arr(t))
    return Kr({
      range: t,
      output: e,
      extrapolate: n
    });
  if (H.str(t.output[0]))
    return Ss(t);
  const r = t, i = r.output, o = r.range || [0, 1], a = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Km(u, o);
    return qm(u, o[f], o[f + 1], i[f], i[f + 1], c, a, l, r.map);
  };
};
function qm(t, e, n, r, i, o, a, l, c) {
  let u = c ? c(t) : t;
  if (u < e) {
    if (a === "identity")
      return u;
    a === "clamp" && (u = e);
  }
  if (u > n) {
    if (l === "identity")
      return u;
    l === "clamp" && (u = n);
  }
  return r === i ? r : e === n ? t <= e ? r : i : (e === -1 / 0 ? u = -u : n === 1 / 0 ? u = u - e : u = (u - e) / (n - e), u = o(u), r === -1 / 0 ? u = -u : i === 1 / 0 ? u = u + r : u = u * (i - r) + r, u);
}
function Km(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Ym = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Im(0, 1, i / t);
}, oo = 1.70158, Si = oo * 1.525, Al = oo + 1, Tl = 2 * Math.PI / 3, Il = 2 * Math.PI / 4.5, Fi = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Gm = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  easeInSine: (t) => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: (t) => Math.sin(t * Math.PI / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
  easeOutCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
  easeInOutCirc: (t) => t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
  easeInBack: (t) => Al * t * t * t - oo * t * t,
  easeOutBack: (t) => 1 + Al * Math.pow(t - 1, 3) + oo * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Si + 1) * 2 * t - Si) / 2 : (Math.pow(2 * t - 2, 2) * ((Si + 1) * (t * 2 - 2) + Si) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Tl),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Tl) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Il)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Il) / 2 + 1,
  easeInBounce: (t) => 1 - Fi(1 - t),
  easeOutBounce: Fi,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Fi(1 - 2 * t)) / 2 : (1 + Fi(2 * t - 1)) / 2,
  steps: Ym
};
function Pa() {
  return Pa = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Pa.apply(this, arguments);
}
const tr = Symbol.for("FluidValue.get"), Fn = Symbol.for("FluidValue.observers"), tt = (t) => !!(t && t[tr]), Ze = (t) => t && t[tr] ? t[tr]() : t, Ll = (t) => t[Fn] || null;
function Xm(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function Yr(t, e) {
  let n = t[Fn];
  n && n.forEach((r) => {
    Xm(r, e);
  });
}
class ju {
  constructor(e) {
    if (this[tr] = void 0, this[Fn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    Qm(this, e);
  }
}
const Qm = (t, e) => Bu(t, tr, e);
function dr(t, e) {
  if (t[tr]) {
    let n = t[Fn];
    n || Bu(t, Fn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function Gr(t, e) {
  let n = t[Fn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Fn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const Bu = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), zi = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Jm = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, Dl = new RegExp(`(${zi.source})(%|[a-z]+)`, "i"), eh = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Fo = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Wu = (t) => {
  const [e, n] = th(t);
  if (!e || Os())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Fo.test(n))
      return Wu(n);
    if (n)
      return n;
  }
  return t;
}, th = (t) => {
  const e = Fo.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let ia;
const nh = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Zu = (t) => {
  ia || (ia = Jt ? new RegExp(`(${Object.keys(Jt).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((o) => Ze(o).replace(Fo, Wu).replace(Jm, Ml).replace(ia, Ml)), n = e.map((o) => o.match(zi).map(Number)), i = n[0].map((o, a) => n.map((l) => {
    if (!(a in l))
      throw Error('The arity of each "output" value must be equal');
    return l[a];
  })).map((o) => Kr(Pa({}, t, {
    output: o
  })));
  return (o) => {
    var a;
    const l = !Dl.test(e[0]) && ((a = e.find((u) => Dl.test(u))) == null ? void 0 : a.replace(zi, ""));
    let c = 0;
    return e[0].replace(zi, () => `${i[c++](o)}${l || ""}`).replace(eh, nh);
  };
}, Ns = "react-spring: ", Hu = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${Ns}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, rh = Hu(console.warn);
function ih() {
  rh(`${Ns}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const oh = Hu(console.warn);
function ah() {
  oh(`${Ns}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function No(t) {
  return H.str(t) && (t[0] == "#" || /\d/.test(t) || !Os() && Fo.test(t) || t in (Jt || {}));
}
const Ps = Os() ? X : hs, sh = () => {
  const t = V(!1);
  return Ps(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function zu() {
  const t = K()[1], e = sh();
  return () => {
    e.current && t(Math.random());
  };
}
function lh(t, e) {
  const [n] = K(() => ({
    inputs: e,
    result: t()
  })), r = V(), i = r.current;
  let o = i;
  return o ? e && o.inputs && ch(e, o.inputs) || (o = {
    inputs: e,
    result: t()
  }) : o = n, X(() => {
    r.current = o, i == n && (n.inputs = n.result = void 0);
  }, [o]), o.result;
}
function ch(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const Uu = (t) => X(t, uh), uh = [];
function Vl(t) {
  const e = V();
  return X(() => {
    e.current = t;
  }), e.current;
}
const Xr = Symbol.for("Animated:node"), fh = (t) => !!t && t[Xr] === t, Et = (t) => t && t[Xr], Rs = (t, e) => Rm(t, Xr, e), Po = (t) => t && t[Xr] && t[Xr].getPayload();
class qu {
  constructor() {
    this.payload = void 0, Rs(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class mr extends qu {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new mr(e);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(e, n) {
    return H.num(e) && (this.lastPosition = e, n && (e = Math.round(e / n) * n, this.done && (this.lastPosition = e))), this._value === e ? !1 : (this._value = e, !0);
  }
  reset() {
    const {
      done: e
    } = this;
    this.done = !1, H.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, e && (this.lastVelocity = null), this.v0 = null);
  }
}
class nr extends mr {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = Kr({
      output: [e, e]
    });
  }
  static create(e) {
    return new nr(e);
  }
  getValue() {
    let e = this._string;
    return e ?? (this._string = this._toString(this._value));
  }
  setValue(e) {
    if (H.str(e)) {
      if (e == this._string)
        return !1;
      this._string = e, this._value = 1;
    } else if (super.setValue(e))
      this._string = null;
    else
      return !1;
    return !0;
  }
  reset(e) {
    e && (this._toString = Kr({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const ao = {
  dependencies: null
};
class Ro extends qu {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return xt(this.source, (r, i) => {
      fh(r) ? n[i] = r.getValue(e) : tt(r) ? n[i] = Ze(r) : e || (n[i] = r);
    }), n;
  }
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && re(this.payload, (e) => e.reset());
  }
  _makePayload(e) {
    if (e) {
      const n = /* @__PURE__ */ new Set();
      return xt(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    ao.dependencies && tt(e) && ao.dependencies.add(e);
    const n = Po(e);
    n && re(n, (r) => this.add(r));
  }
}
class Ms extends Ro {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new Ms(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(dh)), !0);
  }
}
function dh(t) {
  return (No(t) ? nr : mr).create(t);
}
function Ra(t) {
  const e = Et(t);
  return e ? e.constructor : H.arr(t) ? Ms : No(t) ? nr : mr;
}
function so() {
  return so = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, so.apply(this, arguments);
}
const jl = (t, e) => {
  const n = !H.fun(t) || t.prototype && t.prototype.isReactComponent;
  return me((r, i) => {
    const o = V(null), a = n && ze((y) => {
      o.current = vh(i, y);
    }, [i]), [l, c] = hh(r, e), u = zu(), f = () => {
      const y = o.current;
      if (n && !y)
        return;
      (y ? e.applyAnimatedValues(y, l.getValue(!0)) : !1) === !1 && u();
    }, d = new mh(f, c), m = V();
    Ps(() => (m.current = d, re(c, (y) => dr(y, d)), () => {
      m.current && (re(m.current.deps, (y) => Gr(y, m.current)), Q.cancel(m.current.update));
    })), X(f, []), Uu(() => () => {
      const y = m.current;
      re(y.deps, (v) => Gr(v, y));
    });
    const b = e.getComponentProps(l.getValue());
    return L.createElement(t, so({}, b, {
      ref: a
    }));
  });
};
class mh {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && Q.write(this.update);
  }
}
function hh(t, e) {
  const n = /* @__PURE__ */ new Set();
  return ao.dependencies = n, t.style && (t = so({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new Ro(t), ao.dependencies = null, [t, n];
}
function vh(t, e) {
  return t && (H.fun(t) ? t(e) : t.current = e), e;
}
const Bl = Symbol.for("AnimatedComponent"), ph = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new Ro(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, o = (a) => {
    const l = Wl(a) || "Anonymous";
    return H.str(a) ? a = o[a] || (o[a] = jl(a, i)) : a = a[Bl] || (a[Bl] = jl(a, i)), a.displayName = `Animated(${l})`, a;
  };
  return xt(t, (a, l) => {
    H.arr(t) && (l = Wl(a)), o[l] = o(a);
  }), {
    animated: o
  };
}, Wl = (t) => H.str(t) ? t : t && H.str(t.displayName) ? t.displayName : H.fun(t) && t.name || null;
function Pe() {
  return Pe = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Pe.apply(this, arguments);
}
function wn(t, ...e) {
  return H.fun(t) ? t(...e) : t;
}
const Zr = (t, e) => t === !0 || !!(e && t && (H.fun(t) ? t(e) : Ye(t).includes(e))), Ku = (t, e) => H.obj(t) ? e && t[e] : t, Yu = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, gh = (t) => t, As = (t, e = gh) => {
  let n = yh;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const o = e(t[i], i);
    H.und(o) || (r[i] = o);
  }
  return r;
}, yh = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], bh = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  keys: 1,
  callId: 1,
  parentId: 1
};
function Eh(t) {
  const e = {};
  let n = 0;
  if (xt(t, (r, i) => {
    bh[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Gu(t) {
  const e = Eh(t);
  if (e) {
    const n = {
      to: e
    };
    return xt(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Pe({}, t);
}
function Qr(t) {
  return t = Ze(t), H.arr(t) ? t.map(Qr) : No(t) ? ot.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function wh(t) {
  for (const e in t)
    return !0;
  return !1;
}
function Ma(t) {
  return H.fun(t) || H.arr(t) && H.obj(t[0]);
}
function Ch(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function xh(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const kh = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
}, Aa = Pe({}, kh.default, {
  mass: 1,
  damping: 1,
  easing: Gm.linear,
  clamp: !1
});
class $h {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, Aa);
  }
}
function _h(t, e, n) {
  n && (n = Pe({}, n), Zl(n, e), e = Pe({}, n, e)), Zl(t, e), Object.assign(t, e);
  for (const a in Aa)
    t[a] == null && (t[a] = Aa[a]);
  let {
    mass: r,
    frequency: i,
    damping: o
  } = t;
  return H.und(i) || (i < 0.01 && (i = 0.01), o < 0 && (o = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * o * r / i), t;
}
function Zl(t, e) {
  if (!H.und(e.decay))
    t.duration = void 0;
  else {
    const n = !H.und(e.tension) || !H.und(e.friction);
    (n || !H.und(e.frequency) || !H.und(e.damping) || !H.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const Hl = [];
class Oh {
  constructor() {
    this.changed = !1, this.values = Hl, this.toValues = null, this.fromValues = Hl, this.to = void 0, this.from = void 0, this.config = new $h(), this.immediate = !1;
  }
}
function Xu(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: o
}) {
  return new Promise((a, l) => {
    var c;
    let u, f, d = Zr((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      y();
    else {
      H.und(n.pause) || (i.paused = Zr(n.pause, e));
      let v = r == null ? void 0 : r.pause;
      v !== !0 && (v = i.paused || Zr(v, e)), u = wn(n.delay || 0, e), v ? (i.resumeQueue.add(b), o.pause()) : (o.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - Q.now();
    }
    function b() {
      u > 0 && !ot.skipAnimation ? (i.delayed = !0, f = Q.setTimeout(y, u), i.pauseQueue.add(m), i.timeouts.add(f)) : y();
    }
    function y() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        o.start(Pe({}, n, {
          callId: t,
          cancel: d
        }), a);
      } catch (v) {
        l(v);
      }
    }
  });
}
const Ts = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? Xn(t.get()) : e.every((n) => n.noop) ? Qu(t.get()) : ut(t.get(), e.every((n) => n.finished)), Qu = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), ut = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), Xn = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function Ju(t, e, n, r) {
  const {
    callId: i,
    parentId: o,
    onRest: a
  } = e, {
    asyncTo: l,
    promise: c
  } = n;
  return !o && t === l && !e.reset ? c : n.promise = (async () => {
    n.asyncId = i, n.asyncTo = t;
    const u = As(e, (p, g) => g === "onRest" ? void 0 : p);
    let f, d;
    const m = new Promise((p, g) => (f = p, d = g)), b = (p) => {
      const g = i <= (n.cancelId || 0) && Xn(r) || i !== n.asyncId && ut(r, !1);
      if (g)
        throw p.result = g, d(p), p;
    }, y = (p, g) => {
      const C = new zl(), h = new Ul();
      return (async () => {
        if (ot.skipAnimation)
          throw Jr(n), h.result = ut(r, !1), d(h), h;
        b(C);
        const E = H.obj(p) ? Pe({}, p) : Pe({}, g, {
          to: p
        });
        E.parentId = i, xt(u, (x, k) => {
          H.und(E[k]) && (E[k] = x);
        });
        const w = await r.start(E);
        return b(C), n.paused && await new Promise((x) => {
          n.resumeQueue.add(x);
        }), w;
      })();
    };
    let v;
    if (ot.skipAnimation)
      return Jr(n), ut(r, !1);
    try {
      let p;
      H.arr(t) ? p = (async (g) => {
        for (const C of g)
          await y(C);
      })(t) : p = Promise.resolve(t(y, r.stop.bind(r))), await Promise.all([p.then(f), m]), v = ut(r.get(), !0, !1);
    } catch (p) {
      if (p instanceof zl)
        v = p.result;
      else if (p instanceof Ul)
        v = p.result;
      else
        throw p;
    } finally {
      i == n.asyncId && (n.asyncId = o, n.asyncTo = o ? l : void 0, n.promise = o ? c : void 0);
    }
    return H.fun(a) && Q.batchedUpdates(() => {
      a(v, r, r.item);
    }), v;
  })();
}
function Jr(t, e) {
  Br(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class zl extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class Ul extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const Ta = (t) => t instanceof Is;
let Sh = 1;
class Is extends ju {
  constructor(...e) {
    super(...e), this.id = Sh++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = Et(this);
    return e && e.getValue();
  }
  to(...e) {
    return ot.to(this, e);
  }
  interpolate(...e) {
    return ih(), ot.to(this, e);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(e) {
    e == 1 && this._attach();
  }
  observerRemoved(e) {
    e == 0 && this._detach();
  }
  _attach() {
  }
  _detach() {
  }
  _onChange(e, n = !1) {
    Yr(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || Oo.sort(this), Yr(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const Nn = Symbol.for("SpringPhase"), ef = 1, Ia = 2, La = 4, oa = (t) => (t[Nn] & ef) > 0, Bt = (t) => (t[Nn] & Ia) > 0, xr = (t) => (t[Nn] & La) > 0, ql = (t, e) => e ? t[Nn] |= Ia | ef : t[Nn] &= ~Ia, Kl = (t, e) => e ? t[Nn] |= La : t[Nn] &= ~La;
class Fh extends Is {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new Oh(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !H.und(e) || !H.und(n)) {
      const r = H.obj(e) ? Pe({}, e) : Pe({}, n, {
        from: e
      });
      H.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Bt(this) || this._state.asyncTo) || xr(this);
  }
  get goal() {
    return Ze(this.animation.to);
  }
  get velocity() {
    const e = Et(this);
    return e instanceof mr ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return oa(this);
  }
  get isAnimating() {
    return Bt(this);
  }
  get isPaused() {
    return xr(this);
  }
  get isDelayed() {
    return this._state.delayed;
  }
  advance(e) {
    let n = !0, r = !1;
    const i = this.animation;
    let {
      config: o,
      toValues: a
    } = i;
    const l = Po(i.to);
    !l && tt(i.to) && (a = Ye(Ze(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == nr ? 1 : l ? l[d].lastPosition : a[d];
      let b = i.immediate, y = m;
      if (!b) {
        if (y = f.lastPosition, o.tension <= 0) {
          f.done = !0;
          return;
        }
        let v = f.elapsedTime += e;
        const p = i.fromValues[d], g = f.v0 != null ? f.v0 : f.v0 = H.arr(o.velocity) ? o.velocity[d] : o.velocity;
        let C;
        const h = o.precision || (p == m ? 5e-3 : Math.min(1, Math.abs(m - p) * 1e-3));
        if (H.und(o.duration))
          if (o.decay) {
            const E = o.decay === !0 ? 0.998 : o.decay, w = Math.exp(-(1 - E) * v);
            y = p + g / (1 - E) * (1 - w), b = Math.abs(f.lastPosition - y) <= h, C = g * w;
          } else {
            C = f.lastVelocity == null ? g : f.lastVelocity;
            const E = o.restVelocity || h / 10, w = o.clamp ? 0 : o.bounce, x = !H.und(w), k = p == m ? f.v0 > 0 : p < m;
            let N, F = !1;
            const _ = 1, D = Math.ceil(e / _);
            for (let I = 0; I < D && (N = Math.abs(C) > E, !(!N && (b = Math.abs(m - y) <= h, b))); ++I) {
              x && (F = y == m || y > m == k, F && (C = -C * w, y = m));
              const R = -o.tension * 1e-6 * (y - m), $ = -o.friction * 1e-3 * C, M = (R + $) / o.mass;
              C = C + M * _, y = y + C * _;
            }
          }
        else {
          let E = 1;
          o.duration > 0 && (this._memoizedDuration !== o.duration && (this._memoizedDuration = o.duration, f.durationProgress > 0 && (f.elapsedTime = o.duration * f.durationProgress, v = f.elapsedTime += e)), E = (o.progress || 0) + v / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), y = p + o.easing(E) * (m - p), C = (y - f.lastPosition) / e, b = E == 1;
        }
        f.lastVelocity = C, Number.isNaN(y) && (console.warn("Got NaN while animating:", this), b = !0);
      }
      l && !l[d].done && (b = !1), b ? f.done = !0 : n = !1, f.setValue(y, o.round) && (r = !0);
    });
    const c = Et(this), u = c.getValue();
    if (n) {
      const f = Ze(i.to);
      (u !== f || r) && !o.decay ? (c.setValue(f), this._onChange(f)) : r && o.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(e) {
    return Q.batchedUpdates(() => {
      this._stop(), this._focus(e), this._set(e);
    }), this;
  }
  pause() {
    this._update({
      pause: !0
    });
  }
  resume() {
    this._update({
      pause: !1
    });
  }
  finish() {
    if (Bt(this)) {
      const {
        to: e,
        config: n
      } = this.animation;
      Q.batchedUpdates(() => {
        this._onStart(), n.decay || this._set(e, !1), this._stop();
      });
    }
    return this;
  }
  update(e) {
    return (this.queue || (this.queue = [])).push(e), this;
  }
  start(e, n) {
    let r;
    return H.und(e) ? (r = this.queue || [], this.queue = []) : r = [H.obj(e) ? e : Pe({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Ts(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), Jr(this._state, e && this._lastCallId), Q.batchedUpdates(() => this._stop(n, e)), this;
  }
  reset() {
    this._update({
      reset: !0
    });
  }
  eventObserved(e) {
    e.type == "change" ? this._start() : e.type == "priority" && (this.priority = e.priority + 1);
  }
  _prepareNode(e) {
    const n = this.key || "";
    let {
      to: r,
      from: i
    } = e;
    r = H.obj(r) ? r[n] : r, (r == null || Ma(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const o = {
      to: r,
      from: i
    };
    return oa(this) || (e.reverse && ([r, i] = [i, r]), i = Ze(i), H.und(i) ? Et(this) || this._set(r) : this._set(i)), o;
  }
  _update(e, n) {
    let r = Pe({}, e);
    const {
      key: i,
      defaultProps: o
    } = this;
    r.default && Object.assign(o, As(r, (c, u) => /^on/.test(u) ? Ku(c, i) : c)), Gl(this, r, "onProps"), $r(this, "onProps", r, this);
    const a = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return Xu(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: o,
      state: l,
      actions: {
        pause: () => {
          xr(this) || (Kl(this, !0), Dr(l.pauseQueue), $r(this, "onPause", ut(this, kr(this, this.animation.to)), this));
        },
        resume: () => {
          xr(this) && (Kl(this, !1), Bt(this) && this._resume(), Dr(l.resumeQueue), $r(this, "onResume", ut(this, kr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, a)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = tf(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Xn(this));
    const i = !H.und(e.to), o = !H.und(e.from);
    if (i || o)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(Xn(this));
    const {
      key: a,
      defaultProps: l,
      animation: c
    } = this, {
      to: u,
      from: f
    } = c;
    let {
      to: d = u,
      from: m = f
    } = e;
    o && !i && (!n.default || H.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const b = !Rt(m, f);
    b && (c.from = m), m = Ze(m);
    const y = !Rt(d, u);
    y && this._focus(d);
    const v = Ma(n.to), {
      config: p
    } = c, {
      decay: g,
      velocity: C
    } = p;
    (i || o) && (p.velocity = 0), n.config && !v && _h(p, wn(n.config, a), n.config !== l.config ? wn(l.config, a) : void 0);
    let h = Et(this);
    if (!h || H.und(d))
      return r(ut(this, !0));
    const E = H.und(n.reset) ? o && !n.default : !H.und(m) && Zr(n.reset, a), w = E ? m : this.get(), x = Qr(d), k = H.num(x) || H.arr(x) || No(x), N = !v && (!k || Zr(l.immediate || n.immediate, a));
    if (y) {
      const I = Ra(d);
      if (I !== h.constructor)
        if (N)
          h = this._set(x);
        else
          throw Error(`Cannot animate between ${h.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const F = h.constructor;
    let _ = tt(d), D = !1;
    if (!_) {
      const I = E || !oa(this) && b;
      (y || I) && (D = Rt(Qr(w), x), _ = !D), (!Rt(c.immediate, N) && !N || !Rt(p.decay, g) || !Rt(p.velocity, C)) && (_ = !0);
    }
    if (D && Bt(this) && (c.changed && !E ? _ = !0 : _ || this._stop(u)), !v && ((_ || tt(u)) && (c.values = h.getPayload(), c.toValues = tt(d) ? null : F == nr ? [1] : Ye(x)), c.immediate != N && (c.immediate = N, !N && !E && this._set(u)), _)) {
      const {
        onRest: I
      } = c;
      re(Ph, ($) => Gl(this, n, $));
      const R = ut(this, kr(this, u));
      Dr(this._pendingCalls, R), this._pendingCalls.add(r), c.changed && Q.batchedUpdates(() => {
        c.changed = !E, I == null || I(R, this), E ? wn(l.onRest, R) : c.onStart == null || c.onStart(R, this);
      });
    }
    E && this._set(w), v ? r(Ju(n.to, n, this._state, this)) : _ ? this._start() : Bt(this) && !y ? this._pendingCalls.add(r) : r(Qu(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (Ll(this) && this._detach(), n.to = e, Ll(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    tt(n) && (dr(n, this), Ta(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    tt(e) && Gr(e, this);
  }
  _set(e, n = !0) {
    const r = Ze(e);
    if (!H.und(r)) {
      const i = Et(this);
      if (!i || !Rt(r, i.getValue())) {
        const o = Ra(r);
        !i || i.constructor != o ? Rs(this, o.create(r)) : i.setValue(r), i && Q.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return Et(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, $r(this, "onStart", ut(this, kr(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), wn(this.animation.onChange, e, this)), wn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    Et(this).reset(Ze(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Bt(this) || (ql(this, !0), xr(this) || this._resume());
  }
  _resume() {
    ot.skipAnimation ? this.finish() : Oo.start(this);
  }
  _stop(e, n) {
    if (Bt(this)) {
      ql(this, !1);
      const r = this.animation;
      re(r.values, (o) => {
        o.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), Yr(this, {
        type: "idle",
        parent: this
      });
      const i = n ? Xn(this.get()) : ut(this.get(), kr(this, e ?? r.to));
      Dr(this._pendingCalls, i), r.changed && (r.changed = !1, $r(this, "onRest", i, this));
    }
  }
}
function kr(t, e) {
  const n = Qr(e), r = Qr(t.get());
  return Rt(r, n);
}
function tf(t, e = t.loop, n = t.to) {
  let r = wn(e);
  if (r) {
    const i = r !== !0 && Gu(r), o = (i || t).reverse, a = !i || i.reset;
    return ei(Pe({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !o || Ma(n) ? n : void 0,
      from: a ? t.from : void 0,
      reset: a
    }, i));
  }
}
function ei(t) {
  const {
    to: e,
    from: n
  } = t = Gu(t), r = /* @__PURE__ */ new Set();
  return H.obj(e) && Yl(e, r), H.obj(n) && Yl(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function Nh(t) {
  const e = ei(t);
  return H.und(e.default) && (e.default = As(e)), e;
}
function Yl(t, e) {
  xt(t, (n, r) => n != null && e.add(r));
}
const Ph = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Gl(t, e, n) {
  t.animation[n] = e[n] !== Yu(e, n) ? Ku(e[n], t.key) : void 0;
}
function $r(t, e, ...n) {
  var r, i, o, a;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (o = (a = t.defaultProps)[e]) == null || o.call(a, ...n);
}
const Rh = ["onStart", "onChange", "onRest"];
let Mh = 1, Ah = class {
  constructor(e, n) {
    this.id = Mh++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), e && this.start(Pe({
      default: !0
    }, e));
  }
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((e) => e.idle && !e.isDelayed && !e.isPaused);
  }
  get item() {
    return this._item;
  }
  set item(e) {
    this._item = e;
  }
  get() {
    const e = {};
    return this.each((n, r) => e[r] = n.get()), e;
  }
  set(e) {
    for (const n in e) {
      const r = e[n];
      H.und(r) || this.springs[n].set(r);
    }
  }
  update(e) {
    return e && this.queue.push(ei(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = Ye(e).map(ei) : this.queue = [], this._flush ? this._flush(this, n) : (sf(this, n), Da(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      re(Ye(n), (i) => r[i].stop(!!e));
    } else
      Jr(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (H.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      re(Ye(e), (r) => n[r].pause());
    }
    return this;
  }
  resume(e) {
    if (H.und(e))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      re(Ye(e), (r) => n[r].resume());
    }
    return this;
  }
  each(e) {
    xt(this.springs, e);
  }
  _onFrame() {
    const {
      onStart: e,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, o = this._changed.size > 0;
    (i && !this._started || o && !this._started) && (this._started = !0, Br(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const a = !i && this._started, l = o || a && r.size ? this.get() : null;
    o && n.size && Br(n, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }), a && (this._started = !1, Br(r, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }));
  }
  eventObserved(e) {
    if (e.type == "change")
      this._changed.add(e.parent), e.idle || this._active.add(e.parent);
    else if (e.type == "idle")
      this._active.delete(e.parent);
    else
      return;
    Q.onFrame(this._onFrame);
  }
};
function Da(t, e) {
  return Promise.all(e.map((n) => nf(t, n))).then((n) => Ts(t, n));
}
async function nf(t, e, n) {
  const {
    keys: r,
    to: i,
    from: o,
    loop: a,
    onRest: l,
    onResolve: c
  } = e, u = H.obj(e.default) && e.default;
  a && (e.loop = !1), i === !1 && (e.to = null), o === !1 && (e.from = null);
  const f = H.arr(i) || H.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : re(Rh, (v) => {
    const p = e[v];
    if (H.fun(p)) {
      const g = t._events[v];
      e[v] = ({
        finished: C,
        cancelled: h
      }) => {
        const E = g.get(p);
        E ? (C || (E.finished = !1), h && (E.cancelled = !0)) : g.set(p, {
          value: null,
          finished: C || !1,
          cancelled: h || !1
        });
      }, u && (u[v] = e[v]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, Dr(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((v) => t.springs[v].start(e)), b = e.cancel === !0 || Yu(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(Xu(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: Fa,
      resume: Fa,
      start(v, p) {
        b ? (Jr(d, t._lastAsyncId), p(Xn(t))) : (v.onRest = l, p(Ju(f, v, d, t)));
      }
    }
  })), d.paused && await new Promise((v) => {
    d.resumeQueue.add(v);
  });
  const y = Ts(t, await Promise.all(m));
  if (a && y.finished && !(n && y.noop)) {
    const v = tf(e, a, i);
    if (v)
      return sf(t, [v]), nf(t, v, !0);
  }
  return c && Q.batchedUpdates(() => c(y, t, t.item)), y;
}
function Xl(t, e) {
  const n = Pe({}, t.springs);
  return e && re(Ye(e), (r) => {
    H.und(r.keys) && (r = ei(r)), H.obj(r.to) || (r = Pe({}, r, {
      to: void 0
    })), af(n, r, (i) => of(i));
  }), rf(t, n), n;
}
function rf(t, e) {
  xt(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, dr(n, t));
  });
}
function of(t, e) {
  const n = new Fh();
  return n.key = t, e && dr(n, e), n;
}
function af(t, e, n) {
  e.keys && re(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function sf(t, e) {
  re(e, (n) => {
    af(t.springs, n, (r) => of(r, t));
  });
}
function Th(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Ih = ["children"], Mo = (t) => {
  let {
    children: e
  } = t, n = Th(t, Ih);
  const r = it(lo), i = n.pause || !!r.pause, o = n.immediate || !!r.immediate;
  n = lh(() => ({
    pause: i,
    immediate: o
  }), [i, o]);
  const {
    Provider: a
  } = lo;
  return L.createElement(a, {
    value: n
  }, e);
}, lo = Lh(Mo, {});
Mo.Provider = lo.Provider;
Mo.Consumer = lo.Consumer;
function Lh(t, e) {
  return Object.assign(t, L.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const Dh = () => {
  const t = [], e = function(i) {
    ah();
    const o = [];
    return re(t, (a, l) => {
      if (H.und(i))
        o.push(a.start());
      else {
        const c = n(i, a, l);
        c && o.push(a.start(c));
      }
    }), o;
  };
  e.current = t, e.add = function(r) {
    t.includes(r) || t.push(r);
  }, e.delete = function(r) {
    const i = t.indexOf(r);
    ~i && t.splice(i, 1);
  }, e.pause = function() {
    return re(t, (r) => r.pause(...arguments)), this;
  }, e.resume = function() {
    return re(t, (r) => r.resume(...arguments)), this;
  }, e.set = function(r) {
    re(t, (i) => i.set(r));
  }, e.start = function(r) {
    const i = [];
    return re(t, (o, a) => {
      if (H.und(r))
        i.push(o.start());
      else {
        const l = this._getProps(r, o, a);
        l && i.push(o.start(l));
      }
    }), i;
  }, e.stop = function() {
    return re(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return re(t, (i, o) => i.update(this._getProps(r, i, o))), this;
  };
  const n = function(i, o, a) {
    return H.fun(i) ? i(a, o) : i;
  };
  return e._getProps = n, e;
};
function Vh(t, e, n) {
  const r = H.fun(e) && e;
  r && !n && (n = []);
  const i = ie(() => r || arguments.length == 3 ? Dh() : void 0, []), o = V(0), a = zu(), l = ie(() => ({
    ctrls: [],
    queue: [],
    flush(g, C) {
      const h = Xl(g, C);
      return o.current > 0 && !l.queue.length && !Object.keys(h).some((w) => !g.springs[w]) ? Da(g, C) : new Promise((w) => {
        rf(g, h), l.queue.push(() => {
          w(Da(g, C));
        }), a();
      });
    }
  }), []), c = V([...l.ctrls]), u = [], f = Vl(t) || 0;
  ie(() => {
    re(c.current.slice(t, f), (g) => {
      Ch(g, i), g.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), ie(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(g, C) {
    for (let h = g; h < C; h++) {
      const E = c.current[h] || (c.current[h] = new Ah(null, l.flush)), w = r ? r(h, E) : e[h];
      w && (u[h] = Nh(w));
    }
  }
  const m = c.current.map((g, C) => Xl(g, u[C])), b = it(Mo), y = Vl(b), v = b !== y && wh(b);
  Ps(() => {
    o.current++, l.ctrls = c.current;
    const {
      queue: g
    } = l;
    g.length && (l.queue = [], re(g, (C) => C())), re(c.current, (C, h) => {
      i == null || i.add(C), v && C.start({
        default: b
      });
      const E = u[h];
      E && (xh(C, E.ref), C.ref ? C.queue.push(E) : C.start(E));
    });
  }), Uu(() => () => {
    re(l.ctrls, (g) => g.stop(!0));
  });
  const p = m.map((g) => Pe({}, g));
  return i ? [p, i] : p;
}
function Re(t, e) {
  const n = H.fun(t), [[r], i] = Vh(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Ql;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(Ql || (Ql = {}));
class lf extends Is {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = Kr(...n);
    const r = this._get(), i = Ra(r);
    Rs(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    Rt(n, r) || (Et(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Jl(this._active) && aa(this);
  }
  _get() {
    const e = H.arr(this.source) ? this.source.map(Ze) : Ye(Ze(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !Jl(this._active) && (this.idle = !1, re(Po(this), (e) => {
      e.done = !1;
    }), ot.skipAnimation ? (Q.batchedUpdates(() => this.advance()), aa(this)) : Oo.start(this));
  }
  _attach() {
    let e = 1;
    re(Ye(this.source), (n) => {
      tt(n) && dr(n, this), Ta(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    re(Ye(this.source), (e) => {
      tt(e) && Gr(e, this);
    }), this._active.clear(), aa(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = Ye(this.source).reduce((n, r) => Math.max(n, (Ta(r) ? r.priority : 0) + 1), 0));
  }
}
function jh(t) {
  return t.idle !== !1;
}
function Jl(t) {
  return !t.size || Array.from(t).every(jh);
}
function aa(t) {
  t.idle || (t.idle = !0, re(Po(t), (e) => {
    e.done = !0;
  }), Yr(t, {
    type: "idle",
    parent: t
  }));
}
const Bh = (t, ...e) => new lf(t, e);
ot.assign({
  createStringInterpolator: Zu,
  to: (t, e) => new lf(t, e)
});
function Ls(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Wh = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], cf = /^--/;
function Zh(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !cf.test(t) && !(Hr.hasOwnProperty(t) && Hr[t]) ? e + "px" : ("" + e).trim();
}
const ec = {};
function Hh(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: o,
    scrollTop: a,
    scrollLeft: l,
    viewBox: c
  } = r, u = Ls(r, Wh), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : ec[m] || (ec[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  o !== void 0 && (t.textContent = o);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = Zh(m, i[m]);
      cf.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
    }
  d.forEach((m, b) => {
    t.setAttribute(m, f[b]);
  }), a !== void 0 && (t.scrollTop = a), l !== void 0 && (t.scrollLeft = l), c !== void 0 && t.setAttribute("viewBox", c);
}
let Hr = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
};
const zh = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), Uh = ["Webkit", "Ms", "Moz", "O"];
Hr = Object.keys(Hr).reduce((t, e) => (Uh.forEach((n) => t[zh(n, e)] = t[e]), t), Hr);
const qh = ["x", "y", "z"], Kh = /^(matrix|translate|scale|rotate|skew)/, Yh = /^(translate)/, Gh = /^(rotate|skew)/, sa = (t, e) => H.num(t) && t !== 0 ? t + e : t, Ui = (t, e) => H.arr(t) ? t.every((n) => Ui(n, e)) : H.num(t) ? t === e : parseFloat(t) === e;
class Xh extends Ro {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, o = Ls(e, qh);
    const a = [], l = [];
    (n || r || i) && (a.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => sa(u, "px")).join(",")})`, Ui(c, 0)])), xt(o, (c, u) => {
      if (u === "transform")
        a.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (Kh.test(u)) {
        if (delete o[u], H.und(c))
          return;
        const f = Yh.test(u) ? "px" : Gh.test(u) ? "deg" : "";
        a.push(Ye(c)), l.push(u === "rotate3d" ? ([d, m, b, y]) => [`rotate3d(${d},${m},${b},${sa(y, f)})`, Ui(y, 0)] : (d) => [`${u}(${d.map((m) => sa(m, f)).join(",")})`, Ui(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (o.transform = new Qh(a, l)), super(o);
  }
}
class Qh extends ju {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return re(this.inputs, (r, i) => {
      const o = Ze(r[0]), [a, l] = this.transforms[i](H.arr(o) ? o : r.map(Ze));
      e += " " + a, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && re(this.inputs, (n) => re(n, (r) => tt(r) && dr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && re(this.inputs, (n) => re(n, (r) => tt(r) && Gr(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), Yr(this, e);
  }
}
const Jh = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], e2 = ["scrollTop", "scrollLeft"];
ot.assign({
  batchedUpdates: E1,
  createStringInterpolator: Zu,
  colors: Lm
});
const t2 = ph(Jh, {
  applyAnimatedValues: Hh,
  createAnimatedStyle: (t) => new Xh(t),
  getComponentProps: (t) => Ls(t, e2)
}), ge = t2.animated;
function n2(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function hr(t, e) {
  if (cr && t) {
    const n = n2(t);
    return w1(e, n);
  }
  return e;
}
function r2(t) {
  const e = V(t);
  return t && (e.current = !0), !!e.current;
}
const vr = (t) => Ao(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function Ao(t, e, n) {
  const r = r2(t);
  return e || t ? !0 : r ? !n : !1;
}
const i2 = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function tn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = i2[r];
    n[i] = function(o) {
      var a, l;
      o.stopPropagation(), (l = (a = e.props)[i]) === null || l === void 0 || l.call(a, o);
    };
  }
  return s.cloneElement(e, n);
}
const la = "adm-mask", o2 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, a2 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, s2 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, mi = (t) => {
  const e = U(s2, t), {
    locale: n
  } = ye(), r = V(null);
  $o(r, e.visible && e.disableBodyScroll);
  const i = ie(() => {
    var f;
    const d = (f = o2[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = a2[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [o, a] = K(e.visible), l = ws(), {
    opacity: c
  } = Re({
    opacity: e.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 250,
      friction: 30,
      clamp: !0
    },
    onStart: () => {
      a(!0);
    },
    onRest: () => {
      var f, d;
      l.current || (a(e.visible), e.visible ? (f = e.afterShow) === null || f === void 0 || f.call(e) : (d = e.afterClose) === null || d === void 0 || d.call(e));
    }
  }), u = tn(e.stopPropagation, W(e, s.createElement(ge.div, {
    className: la,
    ref: r,
    "aria-hidden": !0,
    style: Object.assign(Object.assign({}, e.style), {
      background: i,
      opacity: c,
      display: o ? void 0 : "none"
    }),
    onClick: (f) => {
      var d;
      f.target === f.currentTarget && ((d = e.onMaskClick) === null || d === void 0 || d.call(e, f));
    }
  }, e.onMaskClick && s.createElement("div", {
    className: `${la}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${la}-content`
  }, e.children))));
  return s.createElement(vr, {
    active: o,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, hr(e.getContainer, u));
};
function uf(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "AddOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ff(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CheckCircleFill-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CheckCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function df(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CheckOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CheckOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function mf(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "ClockCircleFill-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "ClockCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function To(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CloseCircleFill-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CloseCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function hi(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CloseOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CloseOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function l2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "DownFill-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "DownFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function hf(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", null, /* @__PURE__ */ L.createElement("rect", {
    id: "DownOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
    id: "DownOutline-down",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function vf(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", null, /* @__PURE__ */ L.createElement("rect", {
    id: "ExclamationCircleFill-矩形",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function pf(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "InformationCircleFill-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "InformationCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function c2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "LeftOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "LeftOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function u2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "MinusOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function f2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "QuestionCircleOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "QuestionCircleOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function d2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "RightOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
    id: "RightOutline-right",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function m2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "SearchOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "SearchOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function h2(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "SoundOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "SoundOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function tc(t) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, t, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, t.style),
    className: ["antd-mobile-icon", t.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ L.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "TextDeletionOutline-编组"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "TextDeletionOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Ds = {
  closeOnMaskClick: !1,
  destroyOnClose: !1,
  disableBodyScroll: !0,
  forceRender: !1,
  getContainer: () => document.body,
  mask: !0,
  showCloseButton: !1,
  stopPropagation: ["click"],
  visible: !1
};
function gf(t) {
  const [e, n] = K(t);
  return Fe(() => {
    n(t);
  }, [t]), e;
}
function v2(t, e, n) {
  return Math.max(e, Math.min(t, n));
}
const Se = {
  toVector(t, e) {
    return t === void 0 && (t = e), Array.isArray(t) ? t : [t, t];
  },
  add(t, e) {
    return [t[0] + e[0], t[1] + e[1]];
  },
  sub(t, e) {
    return [t[0] - e[0], t[1] - e[1]];
  },
  addTo(t, e) {
    t[0] += e[0], t[1] += e[1];
  },
  subTo(t, e) {
    t[0] -= e[0], t[1] -= e[1];
  }
};
function nc(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function rc(t, e, n, r = 0.15) {
  return r === 0 ? v2(t, e, n) : t < e ? -nc(e - t, n - e, r) + e : t > n ? +nc(t - n, n - e, r) + n : t;
}
function p2(t, [e, n], [r, i]) {
  const [[o, a], [l, c]] = t;
  return [rc(e, o, a, r), rc(n, l, c, i)];
}
function g2(t, e) {
  if (typeof t != "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function y2(t) {
  var e = g2(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Te(t, e, n) {
  return e = y2(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function ic(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function we(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ic(Object(n), !0).forEach(function(r) {
      Te(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ic(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const yf = {
  pointer: {
    start: "down",
    change: "move",
    end: "up"
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up"
  },
  touch: {
    start: "start",
    change: "move",
    end: "end"
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end"
  }
};
function oc(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const b2 = ["enter", "leave"];
function E2(t = !1, e) {
  return t && !b2.includes(e);
}
function w2(t, e = "", n = !1) {
  const r = yf[t], i = r && r[e] || e;
  return "on" + oc(t) + oc(i) + (E2(n, i) ? "Capture" : "");
}
const C2 = ["gotpointercapture", "lostpointercapture"];
function x2(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = C2.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function k2(t, e = "") {
  const n = yf[t], r = n && n[e] || e;
  return t + r;
}
function Io(t) {
  return "touches" in t;
}
function bf(t) {
  return Io(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function $2(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function _2(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function Ef(t) {
  return Io(t) ? _2(t)[0] : t;
}
function Va(t, e) {
  try {
    const n = e.clientX - t.clientX, r = e.clientY - t.clientY, i = (e.clientX + t.clientX) / 2, o = (e.clientY + t.clientY) / 2, a = Math.hypot(n, r);
    return {
      angle: -(Math.atan2(n, r) * 180) / Math.PI,
      distance: a,
      origin: [i, o]
    };
  } catch {
  }
  return null;
}
function O2(t) {
  return $2(t).map((e) => e.identifier);
}
function ac(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return Va(n, r);
}
function ca(t) {
  const e = Ef(t);
  return Io(t) ? e.identifier : e.pointerId;
}
function sc(t) {
  const e = Ef(t);
  return [e.clientX, e.clientY];
}
const lc = 40, cc = 800;
function wf(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= lc, n *= lc) : r === 2 && (e *= cc, n *= cc), [e, n];
}
function S2(t) {
  const e = {};
  if ("buttons" in t && (e.buttons = t.buttons), "shiftKey" in t) {
    const {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: o
    } = t;
    Object.assign(e, {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: o
    });
  }
  return e;
}
function co(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function F2() {
}
function N2(...t) {
  return t.length === 0 ? F2 : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function uc(t, e) {
  return Object.assign({}, e, t || {});
}
const P2 = 32;
class Cf {
  constructor(e, n, r) {
    this.ctrl = e, this.args = n, this.key = r, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(e) {
    this.ctrl.state[this.key] = e;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const {
      state: e,
      shared: n,
      ingKey: r,
      args: i
    } = this;
    n[r] = e._active = e.active = e._blocked = e._force = !1, e._step = [!1, !1], e.intentional = !1, e._movement = [0, 0], e._distance = [0, 0], e._direction = [0, 0], e._delta = [0, 0], e._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], e.args = i, e.axis = void 0, e.memo = void 0, e.elapsedTime = e.timeDelta = 0, e.direction = [0, 0], e.distance = [0, 0], e.overflow = [0, 0], e._movementBound = [!1, !1], e.velocity = [0, 0], e.movement = [0, 0], e.delta = [0, 0], e.timeStamp = 0;
  }
  start(e) {
    const n = this.state, r = this.config;
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? co(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
  }
  computeValues(e) {
    const n = this.state;
    n._values = e, n.values = this.config.transform(e);
  }
  computeInitial() {
    const e = this.state;
    e._initial = e._values, e.initial = e.values;
  }
  compute(e) {
    const {
      state: n,
      config: r,
      shared: i
    } = this;
    n.args = this.args;
    let o = 0;
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, S2(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, o = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Se.addTo(n._distance, x);
    }
    this.axisIntent && this.axisIntent(e);
    const [a, l] = n._movement, [c, u] = r.threshold, {
      _step: f,
      values: d
    } = n;
    if (r.hasCustomTransform ? (f[0] === !1 && (f[0] = Math.abs(a) >= c && d[0]), f[1] === !1 && (f[1] = Math.abs(l) >= u && d[1])) : (f[0] === !1 && (f[0] = Math.abs(a) >= c && Math.sign(a) * c), f[1] === !1 && (f[1] = Math.abs(l) >= u && Math.sign(l) * u)), n.intentional = f[0] !== !1 || f[1] !== !1, !n.intentional)
      return;
    const m = [0, 0];
    if (r.hasCustomTransform) {
      const [x, k] = d;
      m[0] = f[0] !== !1 ? x - f[0] : 0, m[1] = f[1] !== !1 ? k - f[1] : 0;
    } else
      m[0] = f[0] !== !1 ? a - f[0] : 0, m[1] = f[1] !== !1 ? l - f[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const b = n.offset, y = n._active && !n._blocked || n.active;
    y && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = co(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [v, p] = n.offset, [[g, C], [h, E]] = n._bounds;
    n.overflow = [v < g ? -1 : v > C ? 1 : 0, p < h ? -1 : p > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = p2(n._bounds, n.offset, w), n.delta = Se.sub(n.offset, b), this.computeMovement(), y && (!n.last || o > P2)) {
      n.delta = Se.sub(n.offset, b);
      const x = n.delta.map(Math.abs);
      Se.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && o > 0 && (n.velocity = [x[0] / o, x[1] / o], n.timeDelta = o);
    }
  }
  emit() {
    const e = this.state, n = this.shared, r = this.config;
    if (e._active || this.clean(), (e._blocked || !e.intentional) && !e._force && !r.triggerAllEvents)
      return;
    const i = this.handler(we(we(we({}, n), e), {}, {
      [this.aliasKey]: e.values
    }));
    i !== void 0 && (e.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function R2([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class xf extends Cf {
  constructor(...e) {
    super(...e), Te(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Se.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Se.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const n = this.state, r = this.config;
    if (!n.axis && e) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[bf(e)] : r.axisThreshold;
      n.axis = R2(n._movement, i);
    }
    n._blocked = (r.lockDirection || !!r.axis) && !n.axis || !!r.axis && r.axis !== n.axis;
  }
  restrictToAxis(e) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          e[1] = 0;
          break;
        case "y":
          e[0] = 0;
          break;
      }
  }
}
const M2 = (t) => t, fc = 0.15, kf = {
  enabled(t = !0) {
    return t;
  },
  eventOptions(t, e, n) {
    return we(we({}, n.shared.eventOptions), t);
  },
  preventDefault(t = !1) {
    return t;
  },
  triggerAllEvents(t = !1) {
    return t;
  },
  rubberband(t = 0) {
    switch (t) {
      case !0:
        return [fc, fc];
      case !1:
        return [0, 0];
      default:
        return Se.toVector(t);
    }
  },
  from(t) {
    if (typeof t == "function")
      return t;
    if (t != null)
      return Se.toVector(t);
  },
  transform(t, e, n) {
    const r = t || n.shared.transform;
    return this.hasCustomTransform = !!r, r || M2;
  },
  threshold(t) {
    return Se.toVector(t, 0);
  }
}, A2 = 0, pr = we(we({}, kf), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = A2) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (o) => pr.bounds(t(o));
    if ("current" in t)
      return () => t.current;
    if (typeof HTMLElement == "function" && t instanceof HTMLElement)
      return t;
    const {
      left: e = -1 / 0,
      right: n = 1 / 0,
      top: r = -1 / 0,
      bottom: i = 1 / 0
    } = t;
    return [[e, n], [r, i]];
  }
}), dc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class T2 extends xf {
  constructor(...e) {
    super(...e), Te(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const e = this.state;
    e._pointerId = void 0, e._pointerActive = !1, e._keyboardActive = !1, e._preventScroll = !1, e._delayed = !1, e.swipe = [0, 0], e.tap = !1, e.canceled = !1, e.cancel = this.cancel.bind(this);
  }
  setup() {
    const e = this.state;
    if (e._bounds instanceof HTMLElement) {
      const n = e._bounds.getBoundingClientRect(), r = e.currentTarget.getBoundingClientRect(), i = {
        left: n.left - r.left + e.offset[0],
        right: n.right - r.right + e.offset[0],
        top: n.top - r.top + e.offset[1],
        bottom: n.bottom - r.bottom + e.offset[1]
      };
      e._bounds = pr.bounds(i);
    }
  }
  cancel() {
    const e = this.state;
    e.canceled || (e.canceled = !0, e._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(e) {
    const n = this.config, r = this.state;
    if (e.buttons != null && (Array.isArray(n.pointerButtons) ? !n.pointerButtons.includes(e.buttons) : n.pointerButtons !== -1 && n.pointerButtons !== e.buttons))
      return;
    const i = this.ctrl.setEventIds(e);
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = ca(e), r._pointerActive = !0, this.computeValues(sc(e)), this.computeInitial(), n.preventScrollAxis && bf(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = ca(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const o = sc(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Se.sub(o, n._values), this.computeValues(o)), Se.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
      this.timeoutStore.remove("dragDelay"), n.active = !1, this.startPointerDrag(e);
      return;
    }
    if (r.preventScrollAxis && !n._preventScroll)
      if (n.axis)
        if (n.axis === r.preventScrollAxis || r.preventScrollAxis === "xy") {
          n._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(e);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(e) {
    this.ctrl.setEventIds(e);
    try {
      this.config.pointerCapture && e.target.hasPointerCapture(e.pointerId) && e.target.releasePointerCapture(e.pointerId);
    } catch {
    }
    const n = this.state, r = this.config;
    if (!n._active || !n._pointerActive)
      return;
    const i = ca(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [o, a] = n._distance;
    if (n.tap = o <= r.tapsThreshold && a <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [l, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [b, y] = r.swipe.distance, v = r.swipe.duration;
      if (n.elapsedTime < v) {
        const p = Math.abs(l / n.timeDelta), g = Math.abs(c / n.timeDelta);
        p > d && Math.abs(u) > b && (n.swipe[0] = Math.sign(l)), g > m && Math.abs(f) > y && (n.swipe[1] = Math.sign(c));
      }
    }
    this.emit();
  }
  pointerClick(e) {
    !this.state.tap && e.detail > 0 && (e.preventDefault(), e.stopPropagation());
  }
  setupPointer(e) {
    const n = this.config, r = n.device;
    n.pointerLock && e.currentTarget.requestPointerLock(), n.pointerCapture || (this.eventStore.add(this.sharedConfig.window, r, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(e) {
    this.state._preventScroll && e.cancelable && e.preventDefault();
  }
  setupScrollPrevention(e) {
    this.state._preventScroll = !1, I2(e);
    const n = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", n), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", n), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, e);
  }
  setupDelayTrigger(e) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(e);
    }, this.config.delay);
  }
  keyDown(e) {
    const n = dc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Se.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in dc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function I2(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const vi = typeof window < "u" && window.document && window.document.createElement;
function $f() {
  return vi && "ontouchstart" in window;
}
function L2() {
  return $f() || vi && window.navigator.maxTouchPoints > 1;
}
function D2() {
  return vi && "onpointerdown" in window;
}
function V2() {
  return vi && "exitPointerLock" in window.document;
}
function j2() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const nt = {
  isBrowser: vi,
  gesture: j2(),
  touch: $f(),
  touchscreen: L2(),
  pointer: D2(),
  pointerLock: V2()
}, B2 = 250, W2 = 180, Z2 = 0.5, H2 = 50, z2 = 250, U2 = 10, mc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, q2 = we(we({}, pr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && nt.pointerLock, nt.touch && n ? "touch" : this.pointerLock ? "mouse" : nt.pointer && !i ? "pointer" : nt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? B2 : void 0, !(!nt.touchscreen || n === !1))
      return t || (n !== void 0 ? "y" : void 0);
  },
  pointerCapture(t, e, {
    pointer: {
      capture: n = !0,
      buttons: r = 1,
      keys: i = !0
    } = {}
  }) {
    return this.pointerButtons = r, this.keys = i, !this.pointerLock && this.device === "pointer" && n;
  },
  threshold(t, e, {
    filterTaps: n = !1,
    tapsThreshold: r = 3,
    axis: i = void 0
  }) {
    const o = Se.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, o;
  },
  swipe({
    velocity: t = Z2,
    distance: e = H2,
    duration: n = z2
  } = {}) {
    return {
      velocity: this.transform(Se.toVector(t)),
      distance: this.transform(Se.toVector(e)),
      duration: n
    };
  },
  delay(t = 0) {
    switch (t) {
      case !0:
        return W2;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? we(we({}, mc), t) : mc;
  },
  keyboardDisplacement(t = U2) {
    return t;
  }
});
function _f(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [o, a] = t._direction;
  (e < 0 && r > 0 && o < 0 || e > 0 && r < 0 && o > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && a < 0 || n > 0 && i < 0 && a > 0) && (t._movement[1] = t._movementBound[1]);
}
const K2 = 30, Y2 = 100;
class G2 extends Cf {
  constructor(...e) {
    super(...e), Te(this, "ingKey", "pinching"), Te(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const e = this.state;
    e._touchIds = [], e.canceled = !1, e.cancel = this.cancel.bind(this), e.turns = 0;
  }
  computeOffset() {
    const {
      type: e,
      movement: n,
      lastOffset: r
    } = this.state;
    e === "wheel" ? this.state.offset = Se.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
  }
  computeMovement() {
    const {
      offset: e,
      lastOffset: n
    } = this.state;
    this.state.movement = [e[0] / n[0], e[1] - n[1]];
  }
  axisIntent() {
    const e = this.state, [n, r] = e._movement;
    if (!e.axis) {
      const i = Math.abs(n) * K2 - Math.abs(r);
      i < 0 ? e.axis = "angle" : i > 0 && (e.axis = "scale");
    }
  }
  restrictToAxis(e) {
    this.config.lockDirection && (this.state.axis === "scale" ? e[1] = 0 : this.state.axis === "angle" && (e[0] = 0));
  }
  cancel() {
    const e = this.state;
    e.canceled || setTimeout(() => {
      e.canceled = !0, e._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(e) {
    this.ctrl.setEventIds(e);
    const n = this.state, r = this.ctrl.touchIds;
    if (n._active && n._touchIds.every((o) => r.has(o)) || r.size < 2)
      return;
    this.start(e), n._touchIds = Array.from(r).slice(0, 2);
    const i = ac(e, n._touchIds);
    i && this.pinchStart(e, i);
  }
  pointerStart(e) {
    if (e.buttons != null && e.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(e), e.target.setPointerCapture(e.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((a) => i.has(a)) || (r.size < 2 && r.set(e.pointerId, e), n._pointerEvents.size < 2))
      return;
    this.start(e);
    const o = Va(...Array.from(r.values()));
    o && this.pinchStart(e, o);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = ac(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = Va(...Array.from(n.values()));
    r && this.pinchMove(e, r);
  }
  pinchMove(e, n) {
    const r = this.state, i = r._values[1], o = n.angle - i;
    let a = 0;
    Math.abs(o) > 270 && (a += Math.sign(o)), this.computeValues([n.distance, n.angle - 360 * a]), r.origin = n.origin, r.turns = a, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(e), this.emit();
  }
  touchEnd(e) {
    this.ctrl.setEventIds(e), this.state._active && this.state._touchIds.some((n) => !this.ctrl.touchIds.has(n)) && (this.state._active = !1, this.compute(e), this.emit());
  }
  pointerEnd(e) {
    const n = this.state;
    this.ctrl.setEventIds(e);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
    }
    n._pointerEvents.has(e.pointerId) && n._pointerEvents.delete(e.pointerId), n._active && n._pointerEvents.size < 2 && (n._active = !1, this.compute(e), this.emit());
  }
  gestureStart(e) {
    e.cancelable && e.preventDefault();
    const n = this.state;
    n._active || (this.start(e), this.computeValues([e.scale, e.rotation]), n.origin = [e.clientX, e.clientY], this.compute(e), this.emit());
  }
  gestureMove(e) {
    if (e.cancelable && e.preventDefault(), !this.state._active)
      return;
    const n = this.state;
    this.computeValues([e.scale, e.rotation]), n.origin = [e.clientX, e.clientY];
    const r = n._movement;
    n._movement = [e.scale - 1, e.rotation], n._delta = Se.sub(n._movement, r), this.compute(e), this.emit();
  }
  gestureEnd(e) {
    this.state._active && (this.state._active = !1, this.compute(e), this.emit());
  }
  wheel(e) {
    const n = this.config.modifierKey;
    n && (Array.isArray(n) ? !n.find((r) => e[r]) : !e[n]) || (this.state._active ? this.wheelChange(e) : this.wheelStart(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(e) {
    this.start(e), this.wheelChange(e);
  }
  wheelChange(e) {
    "uv" in e || e.cancelable && e.preventDefault();
    const r = this.state;
    r._delta = [-wf(e)[1] / Y2 * r.offset[0], 0], Se.addTo(r._movement, r._delta), _f(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    n && (e(n, "start", this[n + "Start"].bind(this)), e(n, "change", this[n + "Move"].bind(this)), e(n, "end", this[n + "End"].bind(this)), e(n, "cancel", this[n + "End"].bind(this)), e("lostPointerCapture", "", this[n + "End"].bind(this))), this.config.pinchOnWheel && e("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const X2 = we(we({}, kf), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !nt.touch && nt.gesture)
      return "gesture";
    if (nt.touch && r)
      return "touch";
    if (nt.touchscreen) {
      if (nt.pointer)
        return "pointer";
      if (nt.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (a) => {
      const l = uc(co(n, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, o = (a) => {
      const l = uc(co(r, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), o()] : (a) => [i(a), o(a)];
  },
  threshold(t, e, n) {
    return this.lockDirection = n.axis === "lock", Se.toVector(t, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(t) {
    return t === void 0 ? "ctrlKey" : t;
  },
  pinchOnWheel(t = !0) {
    return t;
  }
});
we(we({}, pr), {}, {
  mouseOnly: (t = !0) => t
});
class Q2 extends xf {
  constructor(...e) {
    super(...e), Te(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = wf(e), Se.addTo(n._movement, n._delta), _f(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const J2 = pr;
we(we({}, pr), {}, {
  mouseOnly: (t = !0) => t
});
const Vs = /* @__PURE__ */ new Map(), ja = /* @__PURE__ */ new Map();
function js(t) {
  Vs.set(t.key, t.engine), ja.set(t.key, t.resolver);
}
const Of = {
  key: "drag",
  engine: T2,
  resolver: q2
}, e3 = {
  key: "pinch",
  engine: G2,
  resolver: X2
}, t3 = {
  key: "wheel",
  engine: Q2,
  resolver: J2
};
function n3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function r3(t, e) {
  if (t == null)
    return {};
  var n = n3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const i3 = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = nt.isBrowser ? window : void 0) {
    return t;
  },
  eventOptions({
    passive: t = !0,
    capture: e = !1
  } = {}) {
    return {
      passive: t,
      capture: e
    };
  },
  transform(t) {
    return t;
  }
}, o3 = ["target", "eventOptions", "window", "enabled", "transform"];
function qi(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = qi(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function a3(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  } = r, u = r3(r, o3);
  if (n.shared = qi({
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  }, i3), e) {
    const f = ja.get(e);
    n[e] = qi(we({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = ja.get(f);
      d && (n[f] = qi(we({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class Sf {
  constructor(e, n) {
    Te(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, o) {
    const a = this._listeners, l = k2(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = we(we({}, c), o);
    e.addEventListener(l, i, u);
    const f = () => {
      e.removeEventListener(l, i, u), a.delete(f);
    };
    return a.add(f), f;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class s3 {
  constructor() {
    Te(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(e, n, r = 140, ...i) {
    this.remove(e), this._timeouts.set(e, window.setTimeout(n, r, ...i));
  }
  remove(e) {
    const n = this._timeouts.get(e);
    n && window.clearTimeout(n);
  }
  clean() {
    this._timeouts.forEach((e) => void window.clearTimeout(e)), this._timeouts.clear();
  }
}
class l3 {
  constructor(e) {
    Te(this, "gestures", /* @__PURE__ */ new Set()), Te(this, "_targetEventStore", new Sf(this)), Te(this, "gestureEventStores", {}), Te(this, "gestureTimeoutStores", {}), Te(this, "handlers", {}), Te(this, "config", {}), Te(this, "pointerIds", /* @__PURE__ */ new Set()), Te(this, "touchIds", /* @__PURE__ */ new Set()), Te(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), c3(this, e);
  }
  setEventIds(e) {
    if (Io(e))
      return this.touchIds = new Set(O2(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = a3(e, n, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const e of this.gestures)
      this.gestureEventStores[e].clean(), this.gestureTimeoutStores[e].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...e) {
    const n = this.config.shared, r = {};
    let i;
    if (!(n.target && (i = n.target(), !i))) {
      if (n.enabled) {
        for (const a of this.gestures) {
          const l = this.config[a], c = hc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = Vs.get(a);
            new u(this, e, a).bind(c);
          }
        }
        const o = hc(r, n.eventOptions, !!i);
        for (const a in this.nativeHandlers)
          o(a, "", (l) => this.nativeHandlers[a](we(we({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const o in r)
        r[o] = N2(...r[o]);
      if (!i)
        return r;
      for (const o in r) {
        const {
          device: a,
          capture: l,
          passive: c
        } = x2(o);
        this._targetEventStore.add(i, a, "", r[o], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function In(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Sf(t, e), t.gestureTimeoutStores[e] = new s3();
}
function c3(t, e) {
  e.drag && In(t, "drag"), e.wheel && In(t, "wheel"), e.scroll && In(t, "scroll"), e.move && In(t, "move"), e.pinch && In(t, "pinch"), e.hover && In(t, "hover");
}
const hc = (t, e, n) => (r, i, o, a = {}, l = !1) => {
  var c, u;
  const f = (c = a.capture) !== null && c !== void 0 ? c : e.capture, d = (u = a.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : w2(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(o);
}, u3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function f3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    u3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Ln(t, e, n, r, i, o) {
  if (!t.has(n) || !Vs.has(r))
    return;
  const a = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && a in e && e[a](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, o[r] = o[r] || {};
}
function d3(t, e) {
  const [n, r, i] = f3(t), o = {};
  return Ln(i, n, "onDrag", "drag", o, e), Ln(i, n, "onWheel", "wheel", o, e), Ln(i, n, "onScroll", "scroll", o, e), Ln(i, n, "onPinch", "pinch", o, e), Ln(i, n, "onMove", "move", o, e), Ln(i, n, "onHover", "hover", o, e), {
    handlers: o,
    config: e,
    nativeHandlers: r
  };
}
function Bs(t, e = {}, n, r) {
  const i = s.useMemo(() => new l3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function _t(t, e) {
  return js(Of), Bs({
    drag: t
  }, e || {}, "drag");
}
function m3(t, e) {
  return js(t3), Bs({
    wheel: t
  }, e || {}, "wheel");
}
function h3(t) {
  return t.forEach(js), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: o,
      config: a
    } = d3(n, r || {});
    return Bs(i, a, void 0, o);
  };
}
const Ni = "adm-popup", v3 = Object.assign(Object.assign({}, Ds), {
  closeOnSwipe: !1,
  position: "bottom"
}), gr = (t) => {
  const e = U(v3, t), n = j(`${Ni}-body`, e.bodyClassName, `${Ni}-body-position-${e.position}`), {
    locale: r
  } = ye(), [i, o] = K(e.visible), a = V(null);
  $o(a, e.disableBodyScroll && i ? "strict" : !1), Fe(() => {
    e.visible && o(!0);
  }, [e.visible]);
  const l = ws(), {
    percent: c
  } = Re({
    percent: e.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var m, b;
      l.current || (o(e.visible), e.visible ? (m = e.afterShow) === null || m === void 0 || m.call(e) : (b = e.afterClose) === null || b === void 0 || b.call(e));
    }
  }), u = _t(({
    swipe: [, m]
  }) => {
    var b;
    e.closeOnSwipe && (m === 1 && e.position === "bottom" || m === -1 && e.position === "top") && ((b = e.onClose) === null || b === void 0 || b.call(e));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(e.position)
  }), f = gf(i && e.visible), d = tn(e.stopPropagation, W(e, s.createElement("div", Object.assign({
    className: Ni,
    onClick: e.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(e.position) ? "none" : "auto"
    }
  }, u()), e.mask && s.createElement(mi, {
    visible: f,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose,
    onMaskClick: (m) => {
      var b, y;
      (b = e.onMaskClick) === null || b === void 0 || b.call(e, m), e.closeOnMaskClick && ((y = e.onClose) === null || y === void 0 || y.call(e));
    },
    className: e.maskClassName,
    style: e.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: e.stopPropagation
  }), s.createElement(ge.div, {
    className: n,
    style: Object.assign(Object.assign({}, e.bodyStyle), {
      pointerEvents: c.to((m) => m === 0 ? "unset" : "none"),
      transform: c.to((m) => e.position === "bottom" ? `translate(0, ${m}%)` : e.position === "top" ? `translate(0, -${m}%)` : e.position === "left" ? `translate(-${m}%, 0)` : e.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: a
  }, e.showCloseButton && s.createElement("a", {
    className: j(`${Ni}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = e.onClose) === null || m === void 0 || m.call(e);
    },
    role: "button",
    "aria-label": r.common.close
  }, s.createElement(hi, null)), e.children))));
  return s.createElement(vr, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, hr(e.getContainer, d));
}, vc = "adm-safe-area", yr = (t) => W(t, s.createElement("div", {
  className: j(vc, `${vc}-position-${t.position}`)
})), uo = Object.assign({}, b1), {
  version: p3,
  render: g3,
  unmountComponentAtNode: y3
} = uo;
let Lo;
try {
  Number((p3 || "").split(".")[0]) >= 18 && uo.createRoot && (Lo = uo.createRoot);
} catch {
}
function pc(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = uo;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const fo = "__antd_mobile_root__";
function b3(t, e) {
  g3(t, e);
}
function E3(t, e) {
  pc(!0);
  const n = e[fo] || Lo(e);
  pc(!1), n.render(t), e[fo] = n;
}
function w3(t, e) {
  if (Lo) {
    E3(t, e);
    return;
  }
  b3(t, e);
}
function C3(t) {
  return y3(t);
}
function x3(t) {
  return Oe(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[fo]) === null || e === void 0 || e.unmount(), delete t[fo];
    });
  });
}
function k3(t) {
  return Lo ? x3(t) : C3(t);
}
function pi(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    k3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return w3(t, e), n;
}
function br(t) {
  const e = s.forwardRef((i, o) => {
    const [a, l] = K(!1), c = V(!1), [u, f] = K(t), d = V(0);
    X(() => {
      c.current ? b() : l(!0);
    }, []);
    function m() {
      var y, v;
      c.current = !0, l(!1), (v = (y = u.props).onClose) === null || v === void 0 || v.call(y);
    }
    function b() {
      var y, v;
      r(), (v = (y = u.props).afterClose) === null || v === void 0 || v.call(y);
    }
    return be(o, () => ({
      close: m,
      replace: (y) => {
        var v, p;
        d.current++, (p = (v = u.props).afterClose) === null || p === void 0 || p.call(v), f(y);
      }
    })), s.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: a,
      onClose: m,
      afterClose: b
    }));
  }), n = s.createRef(), r = pi(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Oe(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var o;
      (o = n.current) === null || o === void 0 || o.replace(i);
    }
  };
}
const De = "adm-action-sheet", $3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Ff = (t) => {
  const e = U($3, t), {
    styles: n
  } = e;
  return s.createElement(gr, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: j(`${De}-popup`, e.popupClassName),
    style: e.popupStyle,
    getContainer: e.getContainer,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, W(e, s.createElement("div", {
    className: De
  }, e.extra && s.createElement("div", {
    className: `${De}-extra`
  }, e.extra), s.createElement("div", {
    className: `${De}-button-list`
  }, e.actions.map((r, i) => s.createElement("div", {
    key: r.key,
    className: `${De}-button-item-wrapper`
  }, s.createElement("a", {
    className: j("adm-plain-anchor", `${De}-button-item`, {
      [`${De}-button-item-danger`]: r.danger,
      [`${De}-button-item-disabled`]: r.disabled,
      [`${De}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var o, a, l;
      (o = r.onClick) === null || o === void 0 || o.call(r), (a = e.onAction) === null || a === void 0 || a.call(e, r, i), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, s.createElement("div", {
    className: `${De}-button-item-name`
  }, r.text), r.description && s.createElement("div", {
    className: `${De}-button-item-description`
  }, r.description))))), e.cancelText && s.createElement("div", {
    className: `${De}-cancel`,
    role: "option",
    "aria-label": e.cancelText
  }, s.createElement("div", {
    className: `${De}-button-item-wrapper`
  }, s.createElement("a", {
    className: j("adm-plain-anchor", `${De}-button-item`),
    onClick: e.onClose
  }, s.createElement("div", {
    className: `${De}-button-item-name`
  }, e.cancelText)))), e.safeArea && s.createElement(yr, {
    position: "bottom"
  }))));
};
function _3(t) {
  return br(s.createElement(Ff, Object.assign({}, t)));
}
const F7 = le(Ff, {
  show: _3
}), gc = "adm-auto-center", ti = (t) => W(t, s.createElement("div", {
  className: gc
}, s.createElement("div", {
  className: `${gc}-content`
}, t.children))), O3 = je(() => s.createElement("svg", {
  className: "adm-avatar-fallback",
  width: "88px",
  height: "88px",
  viewBox: "0 0 88 88",
  version: "1.1"
}, s.createElement("title", null, "编组 3"), s.createElement("defs", null, s.createElement("polygon", {
  id: "path-1",
  points: "0 0 88 0 88 88 0 88"
})), s.createElement("g", {
  id: "页面-1",
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("g", {
  id: "语雀",
  transform: "translate(-495.000000, -71.000000)"
}, s.createElement("g", {
  id: "编组-3",
  transform: "translate(495.000000, 71.000000)"
}, s.createElement("mask", {
  id: "mask-2",
  fill: "white"
}, s.createElement("use", {
  xlinkHref: "#path-1"
})), s.createElement("use", {
  id: "Mask",
  fill: "#EEEEEE",
  fillRule: "nonzero",
  xlinkHref: "#path-1"
}), s.createElement("path", {
  d: "M44.5707528,16 L43.4292117,16 L42.9575197,16.0086403 L42.9575195,16.0086403 C36.5215787,16.2615464 31.4341803,21.5678078 31.4344832,28.0273864 L31.4344832,34.7776551 L31.4495601,35.3716788 L31.4495593,35.3716628 C31.599687,38.5368723 32.9422041,41.5269327 35.2058513,43.7376716 L38.2147759,46.6775505 L38.4086219,46.8913989 C38.7747759,47.3385365 38.9750835,47.9001589 38.9750835,48.4833848 L38.9750835,48.8938006 L38.9556989,49.1897326 L38.9556989,49.1897325 C38.8577746,49.9812662 38.3754713,50.67284 37.667703,51.036605 L18.7375269,60.7440265 L18.4101421,60.9276334 L18.4101423,60.9276333 C16.9141658,61.8418636 16.0009389,63.4714674 16,65.2283758 L16,66.070809 L16.0129231,66.3948217 C16.1766149,68.4123376 17.860922,70 19.91569,70 L68.0843101,70 L68.08431,70 C70.2460467,70 71.9988087,68.243122 72,66.0751224 L72,65.2326893 C72,63.3382982 70.9446194,61.6037466 69.2624598,60.7440295 L50.3322837,51.036608 L50.3322835,51.0366079 C49.5291218,50.6249082 49.0240448,49.7962466 49.024903,48.8916436 L49.024903,48.4812278 C49.024903,47.8029608 49.3005955,47.1527756 49.7852106,46.6775603 L52.7941352,43.7376813 L52.7941354,43.7376811 C55.204308,41.3832325 56.5636029,38.151975 56.5633606,34.7776456 L56.5633606,28.0273769 L56.5633606,28.0273774 C56.5633606,21.3848531 51.1940878,16 44.5707524,16 L44.5707528,16 Z",
  id: "形状",
  fill: "#CCCCCC",
  fillRule: "nonzero",
  mask: "url(#mask-2)"
}))))));
var Ws = {}, S3 = ft && ft.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Ws, "__esModule", { value: !0 });
var Zs = Ws.staged = void 0;
const F3 = S3(s);
function Nf(t) {
  return typeof t == "function" ? F3.default.createElement(N3, { stage: t }) : t;
}
function N3(t) {
  const e = t.stage();
  return Nf(e);
}
function P3(t) {
  return function(n, r) {
    const i = t(n, r);
    return Nf(i);
  };
}
Zs = Ws.staged = P3;
function Cn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const R3 = (t) => {
  const e = V(null), [n] = G0(e);
  return X(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, gi = gu(Fe), M3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), A3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), mo = "adm-image", T3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${mo}-tip`
  }, s.createElement(M3, null)),
  fallback: s.createElement("div", {
    className: `${mo}-tip`
  }, s.createElement(A3, null)),
  lazy: !1,
  draggable: !1
}, Do = Zs((t) => {
  const e = U(T3, t), [n, r] = K(!1), [i, o] = K(!1), a = V(null), l = V(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = K(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, gi(() => {
    r(!1), o(!1);
  }, [c]), X(() => {
    var y;
    !((y = l.current) === null || y === void 0) && y.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const y = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${mo}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (v) => {
        var p;
        r(!0), (p = e.onLoad) === null || p === void 0 || p.call(e, v);
      },
      onError: (v) => {
        var p;
        o(!0), (p = e.onError) === null || p === void 0 || p.call(e, v);
      },
      style: {
        objectFit: e.fit,
        display: n ? "block" : "none"
      },
      crossOrigin: e.crossOrigin,
      decoding: e.decoding,
      loading: e.loading,
      referrerPolicy: e.referrerPolicy,
      sizes: e.sizes,
      srcSet: u,
      useMap: e.useMap,
      draggable: e.draggable
    });
    return s.createElement(s.Fragment, null, !n && e.placeholder, y);
  }
  const b = {};
  return e.width && (b["--width"] = Cn(e.width), b.width = Cn(e.width)), e.height && (b["--height"] = Cn(e.height), b.height = Cn(e.height)), W(e, s.createElement("div", {
    ref: a,
    className: mo,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(R3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), I3 = "adm-avatar", L3 = {
  fallback: s.createElement(O3, null),
  fit: "cover"
}, N7 = (t) => {
  const e = U(L3, t);
  return W(e, s.createElement(Do, {
    className: I3,
    src: e.src,
    fallback: e.fallback,
    placeholder: e.fallback,
    alt: e.alt,
    lazy: e.lazy,
    fit: e.fit,
    onClick: e.onClick,
    onError: e.onError,
    onLoad: e.onLoad
  }));
}, Dn = "adm-badge", Pf = s.createElement(s.Fragment, null), D3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === Pf, o = j(Dn, {
    [`${Dn}-fixed`]: !!r,
    [`${Dn}-dot`]: i,
    [`${Dn}-bordered`]: t.bordered
  }), a = e || e === 0 ? W(t, s.createElement("div", {
    className: o,
    style: {
      "--color": n
    }
  }, !i && s.createElement("div", {
    className: `${Dn}-content`
  }, e))) : null;
  return r ? s.createElement("div", {
    className: j(`${Dn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, a) : a;
}, Ba = le(D3, {
  dot: Pf
}), V3 = "adm-dot-loading", j3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, B3 = {
  color: "default"
}, Rf = je((t) => {
  var e;
  const n = U(B3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = j3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: j("adm-loading", V3)
  }, s.createElement("svg", {
    height: "1em",
    viewBox: "0 0 100 40",
    style: {
      verticalAlign: "-0.125em"
    }
  }, s.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, s.createElement("g", {
    transform: "translate(-100.000000, -71.000000)"
  }, s.createElement("g", {
    transform: "translate(95.000000, 71.000000)"
  }, s.createElement("g", {
    transform: "translate(5.000000, 0.000000)"
  }, [0, 1, 2].map((r) => s.createElement("rect", {
    key: r,
    fill: "currentColor",
    x: 20 + r * 26,
    y: "16",
    width: "8",
    height: "8",
    rx: "2"
  }, s.createElement("animate", {
    attributeName: "y",
    from: "16",
    to: "16",
    dur: "2s",
    begin: `${r * 0.2}s`,
    repeatCount: "indefinite",
    values: "16; 6; 26; 16; 16",
    keyTimes: "0; 0.1; 0.3; 0.4; 1"
  }))))))))));
});
function Mf(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function W3() {
  return cr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const Qe = "adm-button", Z3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(Rf, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, It = me((t, e) => {
  const n = U(Z3, t), [r, i] = K(!1), o = V(null), a = n.loading === "auto" ? r : n.loading, l = n.disabled || a;
  be(e, () => ({
    get nativeElement() {
      return o.current;
    }
  }));
  const c = (u) => Oe(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (Mf(f))
      try {
        i(!0), yield f, i(!1);
      } catch (d) {
        throw i(!1), d;
      }
  });
  return W(n, s.createElement("button", {
    ref: o,
    type: n.type,
    onClick: c,
    className: j(Qe, {
      [`${Qe}-${n.color}`]: n.color,
      [`${Qe}-block`]: n.block,
      [`${Qe}-disabled`]: l,
      [`${Qe}-fill-outline`]: n.fill === "outline",
      [`${Qe}-fill-none`]: n.fill === "none",
      [`${Qe}-mini`]: n.size === "mini",
      [`${Qe}-small`]: n.size === "small",
      [`${Qe}-large`]: n.size === "large",
      [`${Qe}-loading`]: a
    }, `${Qe}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, a ? s.createElement("div", {
    className: `${Qe}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
}), yc = () => s.createElement("svg", {
  height: "1em",
  viewBox: "0 0 44 44"
}, s.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("g", {
  transform: "translate(-100.000000, -22.000000)"
}, s.createElement("g", {
  transform: "translate(100.000000, 22.000000)"
}, s.createElement("rect", {
  x: "0",
  y: "0",
  width: "44",
  height: "44"
}), s.createElement("g", {
  transform: "translate(12.000000, 4.000000)",
  fill: "currentColor",
  fillRule: "nonzero"
}, s.createElement("path", {
  d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
})))))), bc = () => s.createElement("svg", {
  height: "1em",
  viewBox: "0 0 44 44"
}, s.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("g", {
  transform: "translate(-24.000000, -22.000000)"
}, s.createElement("g", {
  transform: "translate(24.000000, 22.000000)"
}, s.createElement("rect", {
  x: "0",
  y: "0",
  width: "44",
  height: "44"
}), s.createElement("g", {
  transform: "translate(7.000000, 4.000000)",
  fill: "currentColor",
  fillRule: "nonzero"
}, s.createElement("path", {
  d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
}), s.createElement("path", {
  d: "M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z"
}))))));
var Af = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    var n = "day";
    return function(r, i, o) {
      var a = function(u) {
        return u.add(4 - u.isoWeekday(), n);
      }, l = i.prototype;
      l.isoWeekYear = function() {
        return a(this).year();
      }, l.isoWeek = function(u) {
        if (!this.$utils().u(u))
          return this.add(7 * (u - this.isoWeek()), n);
        var f, d, m, b, y = a(this), v = (f = this.isoWeekYear(), d = this.$u, m = (d ? o.utc : o)().year(f).startOf("year"), b = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (b += 7), m.add(b, n));
        return y.diff(v, "week") + 1;
      }, l.isoWeekday = function(u) {
        return this.$utils().u(u) ? this.day() || 7 : this.day(this.day() % 7 ? u : u - 7);
      };
      var c = l.startOf;
      l.startOf = function(u, f) {
        var d = this.$utils(), m = !!d.u(f) || f;
        return d.p(u) === "isoweek" ? m ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : c.bind(this)(u, f);
      };
    };
  });
})(Af);
var H3 = Af.exports;
const Vo = /* @__PURE__ */ $t(H3);
function oe(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = Cu(), o = V(e !== void 0 ? e : n);
  e !== void 0 && (o.current = e);
  const a = Vt((l, c = !1) => {
    const u = typeof l == "function" ? l(o.current) : l;
    if (!(!c && u === o.current))
      return o.current = u, i(), r == null ? void 0 : r(u);
  });
  return [o.current, a];
}
function z3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function Ec(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function ua(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(Vo);
const pe = "adm-calendar", U3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(yc, null),
  prevYearButton: s.createElement(bc, null),
  nextMonthButton: s.createElement(yc, null),
  nextYearButton: s.createElement(bc, null)
}, P7 = me((t, e) => {
  const n = ve(), r = U(U3, t), {
    locale: i
  } = ye(), o = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const h = o.pop();
    h && o.unshift(h);
  }
  const [a, l] = oe({
    value: r.value === void 0 ? void 0 : Ec(r.selectionMode, r.value),
    defaultValue: Ec(r.selectionMode, r.defaultValue),
    onChange: (h) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, h ? h[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, h));
    }
  }), [c, u] = K(!1), [f, d] = K(() => ve(a ? a[0] : n).date(1));
  gs(() => {
    var h;
    (h = r.onPageChange) === null || h === void 0 || h.call(r, f.year(), f.month() + 1);
  }, [f]), be(e, () => ({
    jumpTo: (h) => {
      let E;
      typeof h == "function" ? E = h({
        year: f.year(),
        month: f.month() + 1
      }) : E = h, d(ua(E));
    },
    jumpToToday: () => {
      d(ve().date(1));
    }
  }));
  const m = (h, E, w) => {
    const x = f[h](E, w);
    if (h === "subtract" && r.minPage) {
      const k = ua(r.minPage);
      if (x.isBefore(k, w))
        return;
    }
    if (h === "add" && r.maxPage) {
      const k = ua(r.maxPage);
      if (x.isAfter(k, w))
        return;
    }
    d(x);
  }, b = s.createElement("div", {
    className: `${pe}-header`
  }, s.createElement("a", {
    className: `${pe}-arrow-button ${pe}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), s.createElement("a", {
    className: `${pe}-arrow-button ${pe}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), s.createElement("div", {
    className: `${pe}-title`
  }, z3(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), s.createElement("a", {
    className: j(`${pe}-arrow-button`, `${pe}-arrow-button-right`, `${pe}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), s.createElement("a", {
    className: j(`${pe}-arrow-button`, `${pe}-arrow-button-right`, `${pe}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), y = ie(() => r.max && ve(r.max), [r.max]), v = ie(() => r.min && ve(r.min), [r.min]);
  function p() {
    var h;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const x = w;
      let k = !1, N = !1, F = !1, _ = !1, D = !1;
      if (a) {
        const [$, M] = a;
        N = x.isSame($, "day"), F = x.isSame(M, "day"), k = N || F || x.isAfter($, "day") && x.isBefore(M, "day"), k && (_ = (E.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !N, D = (E.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !F);
      }
      const I = x.month() === f.month(), R = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : y && x.isAfter(y, "day") || v && x.isBefore(v, "day");
      E.push(s.createElement("div", {
        key: x.valueOf(),
        className: j(`${pe}-cell`, (R || !I) && `${pe}-cell-disabled`, I && {
          [`${pe}-cell-today`]: x.isSame(n, "day"),
          [`${pe}-cell-selected`]: k,
          [`${pe}-cell-selected-begin`]: N,
          [`${pe}-cell-selected-end`]: F,
          [`${pe}-cell-selected-row-begin`]: _,
          [`${pe}-cell-selected-row-end`]: D
        }),
        onClick: () => {
          if (!r.selectionMode || R)
            return;
          const $ = x.toDate();
          I || d(x.clone().date(1));
          function M() {
            if (!r.allowClear || !a)
              return !1;
            const [S, O] = a;
            return x.isSame(S, "date") && x.isSame(O, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && M()) {
              l(null);
              return;
            }
            l([$, $]);
          } else if (r.selectionMode === "range") {
            if (!a) {
              l([$, $]), u(!0);
              return;
            }
            if (M()) {
              l(null), u(!1);
              return;
            }
            if (c) {
              const S = a[0];
              l(S > $ ? [$, S] : [S, $]), u(!1);
            } else
              l([$, $]), u(!0);
          }
        }
      }, s.createElement("div", {
        className: `${pe}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), s.createElement("div", {
        className: `${pe}-cell-bottom`
      }, (h = r.renderLabel) === null || h === void 0 ? void 0 : h.call(r, x.toDate())))), w = w.add(1, "day");
    }
    return E;
  }
  const g = s.createElement("div", {
    className: `${pe}-cells`
  }, p()), C = s.createElement("div", {
    className: `${pe}-mark`
  }, o.map((h, E) => s.createElement("div", {
    key: E,
    className: `${pe}-mark-cell`
  }, h)));
  return W(r, s.createElement("div", {
    className: pe
  }, b, C, g));
}), Pi = "adm-divider", q3 = {
  contentPosition: "center",
  direction: "horizontal"
}, Wa = (t) => {
  const e = U(q3, t);
  return W(e, s.createElement("div", {
    className: j(Pi, `${Pi}-${e.direction}`, `${Pi}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Pi}-content`
  }, e.children)));
};
var Tf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, o) {
        return this.isSame(i, o) || this.isBefore(i, o);
      };
    };
  });
})(Tf);
var K3 = Tf.exports;
const Y3 = /* @__PURE__ */ $t(K3);
function wc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function G3(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(Vo);
ve.extend(Y3);
const _e = "adm-calendar-picker-view", X3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, Q3 = me((t, e) => {
  var n;
  const r = ve(), i = U(X3, t), {
    locale: o
  } = ye(), a = [...o.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const h = a.pop();
    h && a.unshift(h);
  }
  const [l, c] = oe({
    value: i.value === void 0 ? void 0 : wc(i.selectionMode, i.value),
    defaultValue: wc(i.selectionMode, i.defaultValue),
    onChange: (h) => {
      var E, w;
      i.selectionMode === "single" ? (E = i.onChange) === null || E === void 0 || E.call(i, h ? h[0] : null) : i.selectionMode === "range" && ((w = i.onChange) === null || w === void 0 || w.call(i, h));
    }
  }), [u, f] = K(!1), [d, m] = K(() => ve(l ? l[0] : r).date(1));
  be(e, () => ({
    jumpTo: (h) => {
      let E;
      typeof h == "function" ? E = h({
        year: d.year(),
        month: d.month() + 1
      }) : E = h, m(G3(E));
    },
    jumpToToday: () => {
      m(ve().date(1));
    },
    getDateRange: () => l
  }));
  const b = s.createElement("div", {
    className: `${_e}-header`
  }, s.createElement("div", {
    className: `${_e}-title`
  }, (n = i.title) !== null && n !== void 0 ? n : o.Calendar.title)), y = ie(() => i.max ? ve(i.max) : d.add(6, "month"), [i.max, d]), v = ie(() => i.min ? ve(i.min) : d, [i.min, d]);
  function p() {
    var h;
    const E = [];
    let w = v;
    for (; w.isSameOrBefore(y, "month"); ) {
      const x = w.year(), k = w.month(), N = {
        year: x,
        month: k + 1
      };
      E.push(s.createElement("div", {
        key: `${x}-${k}`
      }, s.createElement("div", {
        className: `${_e}-title`
      }, (h = o.Calendar.yearAndMonth) === null || h === void 0 ? void 0 : h.replace(/\${(.*?)}/g, (F, _) => {
        var D;
        return (D = N[_]) === null || D === void 0 ? void 0 : D.toString();
      })), s.createElement("div", {
        className: `${_e}-cells`
      }, Array(i.weekStartsOn === "Monday" ? w.date(1).isoWeekday() - 1 : w.date(1).isoWeekday()).fill(null).map((F, _) => s.createElement("div", {
        key: _,
        className: `${_e}-cell`
      })), Array(w.daysInMonth()).fill(null).map((F, _) => {
        var D;
        const I = w.date(_ + 1);
        let R = !1, $ = !1, M = !1, S = !1, O = !1;
        if (l) {
          const [T, B] = l;
          $ = I.isSame(T, "day"), M = I.isSame(B, "day"), R = $ || M || I.isAfter(T, "day") && I.isBefore(B, "day"), R && (S = (E.length % 7 === 0 || I.isSame(I.startOf("month"), "day")) && !$, O = (E.length % 7 === 6 || I.isSame(I.endOf("month"), "day")) && !M);
        }
        const A = i.shouldDisableDate ? i.shouldDisableDate(I.toDate()) : y && I.isAfter(y, "day") || v && I.isBefore(v, "day"), P = () => {
          var T;
          const B = (T = i.renderTop) === null || T === void 0 ? void 0 : T.call(i, I.toDate());
          if (B)
            return B;
          if (i.selectionMode === "range") {
            if ($)
              return o.Calendar.start;
            if (M)
              return o.Calendar.end;
          }
          if (I.isSame(r, "day") && !R)
            return o.Calendar.today;
        };
        return s.createElement("div", {
          key: I.valueOf(),
          className: j(`${_e}-cell`, {
            [`${_e}-cell-today`]: I.isSame(r, "day"),
            [`${_e}-cell-selected`]: R,
            [`${_e}-cell-selected-begin`]: $,
            [`${_e}-cell-selected-end`]: M,
            [`${_e}-cell-selected-row-begin`]: S,
            [`${_e}-cell-selected-row-end`]: O,
            [`${_e}-cell-disabled`]: !!A
          }),
          onClick: () => {
            if (!i.selectionMode || A)
              return;
            const T = I.toDate();
            function B() {
              if (!i.allowClear || !l)
                return !1;
              const [Z, q] = l;
              return I.isSame(Z, "date") && I.isSame(q, "day");
            }
            if (i.selectionMode === "single") {
              if (i.allowClear && B()) {
                c(null);
                return;
              }
              c([T, T]);
            } else if (i.selectionMode === "range") {
              if (!l) {
                c([T, T]), f(!0);
                return;
              }
              if (B()) {
                c(null), f(!1);
                return;
              }
              if (u) {
                const Z = l[0];
                c(Z > T ? [T, Z] : [Z, T]), f(!1);
              } else
                c([T, T]), f(!0);
            }
          }
        }, s.createElement("div", {
          className: `${_e}-cell-top`
        }, P()), s.createElement("div", {
          className: `${_e}-cell-date`
        }, i.renderDate ? i.renderDate(I.toDate()) : I.date()), s.createElement("div", {
          className: `${_e}-cell-bottom`
        }, (D = i.renderBottom) === null || D === void 0 ? void 0 : D.call(i, I.toDate())));
      })))), w = w.add(1, "month");
    }
    return E;
  }
  const g = s.createElement("div", {
    className: `${_e}-body`
  }, p()), C = s.createElement("div", {
    className: `${_e}-mark`
  }, a.map((h, E) => s.createElement("div", {
    key: E,
    className: `${_e}-mark-cell`
  }, h)));
  return W(i, s.createElement("div", {
    className: _e
  }, b, C, g));
}), Ri = "adm-calendar-picker", J3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, R7 = me((t, e) => {
  const n = U(J3, t), {
    locale: r
  } = ye(), i = e ?? V(null), {
    visible: o,
    confirmText: a,
    popupClassName: l,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: b,
    onMaskClick: y,
    getContainer: v
  } = n, p = ur(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), g = s.createElement("div", {
    className: `${Ri}-footer`
  }, s.createElement(Wa, null), s.createElement("div", {
    className: `${Ri}-footer-bottom`
  }, s.createElement(It, {
    color: "primary",
    onClick: () => {
      var C, h, E, w;
      const x = (h = (C = i.current) === null || C === void 0 ? void 0 : C.getDateRange()) !== null && h !== void 0 ? h : null;
      n.selectionMode === "single" ? (E = n.onConfirm) === null || E === void 0 || E.call(n, x ? x[0] : null) : n.selectionMode === "range" && ((w = n.onConfirm) === null || w === void 0 || w.call(n, x)), m == null || m();
    }
  }, a ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Ri
  }, s.createElement(gr, {
    visible: o,
    className: j(`${Ri}-popup`, l),
    showCloseButton: !0,
    forceRender: e ? !0 : f,
    style: c,
    bodyStyle: Object.assign({
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      minHeight: "80vh",
      overflow: "auto"
    }, u),
    onClose: m,
    onMaskClick: () => {
      y == null || y(), d && (m == null || m());
    },
    getContainer: v
  }, s.createElement(Q3, Object.assign({
    ref: i
  }, p)), g)));
});
function yi(t, e) {
  const n = Vt(t);
  Fe(() => {
    const r = e.current;
    if (r)
      if (window.ResizeObserver) {
        let i;
        const o = new ResizeObserver(() => {
          i = window.requestAnimationFrame(() => n(r));
        });
        return o.observe(r), () => {
          window.cancelAnimationFrame(i), o.disconnect();
        };
      } else
        n(r);
  }, [e]);
}
function Hs(t, e, n) {
  const r = Vt(t);
  X(() => {
    const i = new MutationObserver(() => {
      r();
    });
    if (e.current)
      return i.observe(e.current, n), () => {
        i.disconnect();
      };
  }, [e]);
}
function $e(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const If = (t, e) => {
  const [{
    scrollLeft: n
  }, r] = Re(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  }));
  function i(o = !1) {
    const a = t.current;
    if (!a || e === void 0)
      return;
    const c = a.children.item(e).children.item(0), u = c.offsetLeft, f = c.offsetWidth, d = a.offsetWidth, m = a.scrollWidth, b = a.scrollLeft;
    if (m - d <= 0)
      return;
    const v = $e(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: v,
      from: {
        scrollLeft: b
      },
      immediate: o && !n.isAnimating
    });
  }
  return Fe(() => {
    i(!0);
  }, []), gi(() => {
    i();
  }, [e]), Hs(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Mi = "adm-scroll-mask", Lf = (t) => {
  const e = V(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Re(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: o
  } = ko((a = !1) => {
    if (!e.current)
      return;
    const c = t.scrollTrackRef.current;
    if (!c)
      return;
    const u = c.scrollLeft, f = u > 0, d = u + c.offsetWidth < c.scrollWidth;
    i.start({
      leftMaskOpacity: f ? 1 : 0,
      rightMaskOpacity: d ? 1 : 0,
      immediate: a
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return X(() => {
    o(!0);
  }, []), X(() => {
    const a = t.scrollTrackRef.current;
    if (a)
      return a.addEventListener("scroll", o), () => a.removeEventListener("scroll", o);
  }, []), s.createElement(s.Fragment, null, s.createElement(ge.div, {
    ref: e,
    className: j(Mi, `${Mi}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(ge.div, {
    className: j(Mi, `${Mi}-right`),
    style: {
      opacity: r
    }
  }));
};
var Df = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zs = Symbol.for("react.element"), Us = Symbol.for("react.portal"), jo = Symbol.for("react.fragment"), Bo = Symbol.for("react.strict_mode"), Wo = Symbol.for("react.profiler"), Zo = Symbol.for("react.provider"), Ho = Symbol.for("react.context"), e4 = Symbol.for("react.server_context"), zo = Symbol.for("react.forward_ref"), Uo = Symbol.for("react.suspense"), qo = Symbol.for("react.suspense_list"), Ko = Symbol.for("react.memo"), Yo = Symbol.for("react.lazy"), t4 = Symbol.for("react.offscreen"), Vf;
Vf = Symbol.for("react.module.reference");
function st(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case zs:
        switch (t = t.type, t) {
          case jo:
          case Wo:
          case Bo:
          case Uo:
          case qo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case e4:
              case Ho:
              case zo:
              case Yo:
              case Ko:
              case Zo:
                return t;
              default:
                return e;
            }
        }
      case Us:
        return e;
    }
  }
}
ue.ContextConsumer = Ho;
ue.ContextProvider = Zo;
ue.Element = zs;
ue.ForwardRef = zo;
ue.Fragment = jo;
ue.Lazy = Yo;
ue.Memo = Ko;
ue.Portal = Us;
ue.Profiler = Wo;
ue.StrictMode = Bo;
ue.Suspense = Uo;
ue.SuspenseList = qo;
ue.isAsyncMode = function() {
  return !1;
};
ue.isConcurrentMode = function() {
  return !1;
};
ue.isContextConsumer = function(t) {
  return st(t) === Ho;
};
ue.isContextProvider = function(t) {
  return st(t) === Zo;
};
ue.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === zs;
};
ue.isForwardRef = function(t) {
  return st(t) === zo;
};
ue.isFragment = function(t) {
  return st(t) === jo;
};
ue.isLazy = function(t) {
  return st(t) === Yo;
};
ue.isMemo = function(t) {
  return st(t) === Ko;
};
ue.isPortal = function(t) {
  return st(t) === Us;
};
ue.isProfiler = function(t) {
  return st(t) === Wo;
};
ue.isStrictMode = function(t) {
  return st(t) === Bo;
};
ue.isSuspense = function(t) {
  return st(t) === Uo;
};
ue.isSuspenseList = function(t) {
  return st(t) === qo;
};
ue.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === jo || t === Wo || t === Bo || t === Uo || t === qo || t === t4 || typeof t == "object" && t !== null && (t.$$typeof === Yo || t.$$typeof === Ko || t.$$typeof === Zo || t.$$typeof === Ho || t.$$typeof === zo || t.$$typeof === Vf || t.getModuleId !== void 0);
};
ue.typeOf = st;
Df.exports = ue;
var ho = Df.exports;
function ln(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (o) => {
      ho.isFragment(o) ? r(o.props.children) : (e(o, n), n += 1);
    });
  }
  r(t);
}
const Wt = "adm-capsule-tabs", n4 = () => null, r4 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let o = null;
  const a = [];
  ln(t.children, (d, m) => {
    if (!Mn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const y = a.push(d);
    i[b] = y - 1;
  });
  const [l, c] = oe({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = If(n, i[l]);
  return yi(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Wt,
    ref: r
  }, s.createElement("div", {
    className: `${Wt}-header`
  }, s.createElement(Lf, {
    scrollTrackRef: n
  }), s.createElement(ge.div, {
    className: `${Wt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, a.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${Wt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: j(`${Wt}-tab`, {
      [`${Wt}-tab-active`]: d.key === l,
      [`${Wt}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), a.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(vr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Wt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, M7 = le(r4, {
  Tab: n4
}), Ai = "adm-card", A7 = (t) => {
  const e = () => t.title || t.extra ? s.createElement("div", {
    className: j(`${Ai}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, s.createElement("div", {
    className: `${Ai}-header-title`
  }, t.title), t.extra) : null, n = () => t.children ? s.createElement("div", {
    className: j(`${Ai}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return W(t, s.createElement("div", {
    className: Ai,
    onClick: t.onClick
  }, e(), n()));
};
function Cc(t, e, n) {
  return t * e * n / (e + n * t);
}
function ni(t, e, n, r, i = 0.15) {
  return i === 0 ? $e(t, e, n) : t < e ? -Cc(e - t, r, i) + e : t > n ? +Cc(t - n, r, i) + n : t;
}
var i4 = typeof Element < "u", o4 = typeof Map == "function", a4 = typeof Set == "function", s4 = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Ki(t, e) {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    var n, r, i;
    if (Array.isArray(t)) {
      if (n = t.length, n != e.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Ki(t[r], e[r]))
          return !1;
      return !0;
    }
    var o;
    if (o4 && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!Ki(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (a4 && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (s4 && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
      if (n = t.length, n != e.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (t[r] !== e[r])
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf && typeof t.valueOf == "function" && typeof e.valueOf == "function")
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString && typeof t.toString == "function" && typeof e.toString == "function")
      return t.toString() === e.toString();
    if (i = Object.keys(t), n = i.length, n !== Object.keys(e).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, i[r]))
        return !1;
    if (i4 && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !Ki(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var l4 = function(e, n) {
  try {
    return Ki(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const Za = /* @__PURE__ */ $t(l4);
function jf(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const ht = "adm-picker-view", Bf = je((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(g) {
    t.onSelect(g, t.index);
  }
  const [{
    y: o
  }, a] = Re(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), l = V(!1), c = V(null), u = V(null), f = V(34);
  Fe(() => {
    const g = u.current;
    g && (f.current = jf(window.getComputedStyle(g).getPropertyValue("height")));
  }), Fe(() => {
    if (l.current || e === null)
      return;
    const g = n.findIndex((h) => h.value === e);
    if (g < 0)
      return;
    const C = g * -f.current;
    a.start({
      y: C,
      immediate: o.goal !== C
    });
  }, [e, n]), Fe(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((g) => g.value === e)) {
      const g = n[0];
      i(g.value);
    }
  }, [n, e]);
  function d(g) {
    const C = g * -f.current;
    a.start({
      y: C
    });
    const h = n[g];
    h && i(h.value);
  }
  const m = (g) => {
    const {
      direction: [, C],
      distance: [, h],
      velocity: [, E],
      offset: [, w],
      last: x
    } = g;
    return {
      direction: C,
      distance: h,
      velocity: E,
      offset: w,
      last: x
    };
  }, b = (g) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      offset: k
    } = m(g);
    if (w) {
      l.current = !1;
      const N = k + x * E * 50, F = $e(N, C, h), _ = -Math.round(F / f.current);
      d(_);
    } else {
      const N = k;
      a.start({
        y: ni(N, C, h, f.current * 50, 0.2)
      });
    }
  }, y = (g) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      distance: k
    } = m(g), N = -E, F = o.get();
    if (w) {
      l.current = !1;
      const _ = x * N * 50, D = F + k * N + _, I = $e(D, C, h), R = -Math.round(I / f.current);
      d(R);
    } else {
      const _ = F + k * N;
      a.start({
        y: ni(_, C, h, f.current * 50, 0.2)
      });
    }
  };
  _t((g) => {
    g.event.stopPropagation(), b(g);
  }, {
    axis: "y",
    from: () => [0, o.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), m3((g) => {
    g.event.stopPropagation(), y(g);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, o.get()],
    preventDefault: !0,
    eventOptions: Sn ? {
      passive: !1
    } : void 0
  });
  let v = null;
  function p() {
    if (v === null)
      return null;
    const g = n[v], C = v - 1, h = v + 1, E = n[C], w = n[h];
    return s.createElement("div", {
      className: `${ht}-column-accessible`
    }, s.createElement("div", {
      className: `${ht}-column-accessible-current`,
      role: "button",
      "aria-label": g ? `当前选择的是：${g.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${ht}-column-accessible-button`,
      onClick: () => {
        E && d(C);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${ht}-column-accessible-button`,
      onClick: () => {
        w && d(h);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择下一项：${w.label}` : "没有下一项"
    }, "-"));
  }
  return s.createElement("div", {
    className: `${ht}-column`
  }, s.createElement("div", {
    className: `${ht}-item-height-measure`,
    ref: u
  }), s.createElement(ge.div, {
    ref: c,
    style: {
      translateY: o
    },
    className: `${ht}-column-wheel`,
    "aria-hidden": !0
  }, n.map((g, C) => {
    var h;
    const E = t.value === g.value;
    E && (v = C);
    function w() {
      l.current = !1, d(C);
    }
    return s.createElement("div", {
      key: (h = g.key) !== null && h !== void 0 ? h : g.value,
      "data-selected": E,
      className: j(`${ht}-column-item`, {
        [`${ht}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${ht}-column-item-label`
    }, r(g)));
  })), p());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !Za(t.column, e.column)));
Bf.displayName = "Wheel";
function xc(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Wf(t, e) {
  const n = xc(() => (typeof t == "function" ? t(e) : t).map((a) => a.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = xc(() => e.map((o, a) => {
    var l;
    const c = n()[a];
    return c && (l = c.find((u) => u.value === o)) !== null && l !== void 0 ? l : null;
  }));
  return {
    get columns() {
      return n();
    },
    get items() {
      return r();
    }
  };
}
function Zf(t, e) {
  return ie(() => Wf(t, e), [t, e]);
}
const Hf = (t) => t.label;
var zf = { exports: {} }, Uf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rr = s;
function c4(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var u4 = typeof Object.is == "function" ? Object.is : c4, f4 = rr.useState, d4 = rr.useEffect, m4 = rr.useLayoutEffect, h4 = rr.useDebugValue;
function v4(t, e) {
  var n = e(), r = f4({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, o = r[1];
  return m4(function() {
    i.value = n, i.getSnapshot = e, fa(i) && o({ inst: i });
  }, [t, n, e]), d4(function() {
    return fa(i) && o({ inst: i }), t(function() {
      fa(i) && o({ inst: i });
    });
  }, [t]), h4(n), n;
}
function fa(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !u4(t, n);
  } catch {
    return !0;
  }
}
function p4(t, e) {
  return e();
}
var g4 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p4 : v4;
Uf.useSyncExternalStore = rr.useSyncExternalStore !== void 0 ? rr.useSyncExternalStore : g4;
zf.exports = Uf;
var y4 = zf.exports;
let qs = !1;
const Ha = /* @__PURE__ */ new Set();
function qf() {
  Ha.forEach((t) => {
    t();
  });
}
function T7() {
  qs = !0, qf(), ot.assign({
    skipAnimation: !0
  });
}
function I7() {
  qs = !1, qf(), ot.assign({
    skipAnimation: !1
  });
}
function kc() {
  return qs;
}
function b4(t) {
  return Ha.add(t), () => {
    Ha.delete(t);
  };
}
function E4() {
  return y4.useSyncExternalStore(b4, kc, kc);
}
const da = "adm-spin-loading", w4 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, C4 = {
  color: "default"
}, x4 = 15 * 3.14159265358979 * 2, Ks = je((t) => {
  var e;
  const n = U(C4, t), r = E4(), {
    percent: i
  } = Re({
    cancel: r,
    loop: {
      reverse: !0
    },
    from: {
      percent: 80
    },
    to: {
      percent: 30
    },
    config: {
      duration: 1200
    }
  });
  return W(n, s.createElement(ge.div, {
    className: da,
    style: {
      "--color": (e = w4[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${da}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(ge.circle, {
    className: `${da}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: x4,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), Kn = "adm-picker-view", k4 = {
  defaultValue: [],
  renderLabel: Hf,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${Kn}-loading-content`
  }, s.createElement(Ks, null))
}, Go = je((t) => {
  const e = U(k4, t), [n, r] = K(e.value === void 0 ? e.defaultValue : e.value);
  X(() => {
    e.value !== void 0 && e.value !== n && r(e.value);
  }, [e.value]), X(() => {
    if (e.value === n)
      return;
    const l = window.setTimeout(() => {
      e.value !== void 0 && e.value !== n && r(e.value);
    }, 1e3);
    return () => {
      window.clearTimeout(l);
    };
  }, [e.value, n]);
  const i = Zf(e.columns, n), o = i.columns;
  K0(() => {
    var l;
    e.value !== n && ((l = e.onChange) === null || l === void 0 || l.call(e, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const a = ze((l, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = l, f;
    });
  }, []);
  return W(e, s.createElement("div", {
    className: `${Kn}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, o.map((l, c) => s.createElement(Bf, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: a,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${Kn}-mask`
  }, s.createElement("div", {
    className: `${Kn}-mask-top`
  }), s.createElement("div", {
    className: `${Kn}-mask-middle`
  }), s.createElement("div", {
    className: `${Kn}-mask-bottom`
  })))));
});
Go.displayName = "PickerView";
const Zt = "adm-picker", $4 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: Hf,
  destroyOnClose: !1,
  forceRender: !1
}, Ys = je(me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U($4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [o, a] = oe({
    value: i.visible,
    defaultValue: !1,
    onChange: (p) => {
      var g;
      p === !1 && ((g = i.onClose) === null || g === void 0 || g.call(i));
    }
  }), l = {
    toggle: () => {
      a((p) => !p);
    },
    open: () => {
      a(!0);
    },
    close: () => {
      a(!1);
    }
  };
  be(e, () => l);
  const [c, u] = oe(Object.assign(Object.assign({}, i), {
    onChange: (p) => {
      var g;
      const C = Wf(i.columns, p);
      (g = i.onConfirm) === null || g === void 0 || g.call(i, p, C);
    }
  })), f = Zf(i.columns, c), [d, m] = K(c);
  X(() => {
    d !== c && m(c);
  }, [o]), X(() => {
    o || m(c);
  }, [c]);
  const b = Vt((p, g) => {
    var C;
    m(p), o && ((C = i.onSelect) === null || C === void 0 || C.call(i, p, g));
  }), y = W(i, s.createElement("div", {
    className: Zt
  }, s.createElement("div", {
    className: `${Zt}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Zt}-header-button`,
    onClick: () => {
      var p;
      (p = i.onCancel) === null || p === void 0 || p.call(i), a(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Zt}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: j(`${Zt}-header-button`, i.loading && `${Zt}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), a(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), s.createElement("div", {
    className: `${Zt}-body`
  }, s.createElement(Go, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: b
  })))), v = s.createElement(gr, {
    style: i.popupStyle,
    className: j(`${Zt}-popup`, i.popupClassName),
    visible: o,
    position: "bottom",
    onMaskClick: () => {
      var p;
      i.closeOnMaskClick && ((p = i.onCancel) === null || p === void 0 || p.call(i), a(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, y, s.createElement(yr, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
Ys.displayName = "Picker";
function _4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = K(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(Ys, Object.assign({}, t, {
        visible: i,
        onConfirm: (a, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, a, l), e(a);
        },
        onClose: () => {
          var a;
          (a = t.onClose) === null || a === void 0 || a.call(t), o(!1), e(null);
        },
        afterClose: () => {
          var a;
          (a = t.afterClose) === null || a === void 0 || a.call(t), r();
        }
      }));
    }, r = pi(s.createElement(n, null));
  });
}
const Kf = le(Ys, {
  prompt: _4
});
function Yf(t) {
  const e = ie(() => {
    let n = 0;
    function r(i, o) {
      o > n && (n = o);
      const a = o + 1;
      i.forEach((l) => {
        l.children && r(l.children, a);
      });
    }
    return r(t, 1), n;
  }, [t]);
  return (n) => {
    const r = [];
    let i = t, o = 0;
    for (; ; ) {
      r.push(i.map((c) => ({
        label: c.label,
        value: c.value
      })));
      const a = n[o], l = i.find((c) => c.value === a);
      if (!l || !l.children)
        break;
      i = l.children, o++;
    }
    for (; o < e - 1; )
      r.push([]), o++;
    return r;
  };
}
const Gf = me((t, e) => {
  const {
    options: n
  } = t, r = ur(t, ["options"]), i = Yf(n);
  return s.createElement(Kf, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function O4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = K(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(Gf, Object.assign({}, t, {
        visible: i,
        onConfirm: (a, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, a, l), e(a);
        },
        onClose: () => {
          var a;
          (a = t.onClose) === null || a === void 0 || a.call(t), o(!1), e(null);
        },
        afterClose: () => {
          var a;
          (a = t.afterClose) === null || a === void 0 || a.call(t), r();
        }
      }));
    }, r = pi(s.createElement(n, null));
  });
}
const L7 = le(Gf, {
  prompt: O4
}), D7 = (t) => {
  const {
    options: e
  } = t, n = ur(t, ["options"]), r = Yf(e);
  return s.createElement(Go, Object.assign({}, n, {
    columns: r
  }));
}, Be = "adm-tabs", S4 = () => null, F4 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, N4 = (t) => {
  var e;
  const n = U(F4, t), r = V(null), i = V(null), o = {};
  let a = null;
  const l = [], c = n.direction === "rtl";
  ln(n.children, (w, x) => {
    if (!Mn(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    x === 0 && (a = k);
    const N = l.push(w);
    o[k] = N - 1;
  });
  const [u, f] = oe({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (w) => {
      var x;
      w !== null && ((x = n.onChange) === null || x === void 0 || x.call(n, w));
    }
  }), [{
    x: d,
    width: m
  }, b] = Re(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: y
  }, v] = Re(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: p,
    rightMaskOpacity: g
  }, C] = Re(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function h(w = !1, x = !1) {
    const k = r.current;
    if (!k)
      return;
    const N = o[u];
    if (N === void 0) {
      b.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const F = i.current;
    if (!F)
      return;
    const _ = k.children.item(N + 1), D = _.children.item(0), I = D.offsetLeft, R = D.offsetWidth, $ = _.offsetLeft, M = _.offsetWidth, S = k.offsetWidth, O = k.scrollWidth, A = k.scrollLeft, P = F.offsetWidth;
    let T = 0, B = 0;
    if (n.activeLineMode === "auto" ? (T = I, B = R) : n.activeLineMode === "full" ? (T = $, B = M) : T = I + (R - P) / 2, c) {
      const Y = ["auto", "full"].includes(n.activeLineMode) ? B : P;
      T = -(S - T - Y);
    }
    b.start({
      x: T,
      width: B,
      immediate: w
    });
    const Z = O - S;
    if (Z <= 0)
      return;
    let q = 0;
    c ? q = -$e(S / 2 - I + R / 2 - P, 0, Z) : q = $e(I - (S - R) / 2, 0, Z), (!x || n.autoScroll !== !1) && v.start({
      scrollLeft: q,
      from: {
        scrollLeft: A
      },
      immediate: w
    });
  }
  Fe(() => {
    h(!d.isAnimating);
  }, []), gi(() => {
    h();
  }, [u]), yi(() => {
    h(!d.isAnimating);
  }, r), Hs(() => {
    h(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: E
  } = ko((w = !1) => {
    const x = r.current;
    if (!x)
      return;
    const k = x.scrollLeft;
    let N = !1, F = !1;
    c ? (N = Math.round(-k) + x.offsetWidth < x.scrollWidth, F = k < 0) : (N = k > 0, F = k + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: N ? 1 : 0,
      rightMaskOpacity: F ? 1 : 0,
      immediate: w
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Fe(() => {
    E(!0);
  }, []), W(n, s.createElement("div", {
    className: Be,
    style: {
      direction: n.direction
    }
  }, s.createElement("div", {
    className: `${Be}-header`
  }, s.createElement(ge.div, {
    className: j(`${Be}-header-mask`, `${Be}-header-mask-left`),
    style: {
      opacity: p
    }
  }), s.createElement(ge.div, {
    className: j(`${Be}-header-mask`, `${Be}-header-mask-right`),
    style: {
      opacity: g
    }
  }), s.createElement(ge.div, {
    className: `${Be}-tab-list`,
    ref: r,
    scrollLeft: y,
    onScroll: E,
    role: "tablist"
  }, s.createElement(ge.div, {
    ref: i,
    className: `${Be}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), l.map((w) => W(w.props, s.createElement("div", {
    key: w.key,
    className: j(`${Be}-tab-wrapper`, {
      [`${Be}-tab-wrapper-stretch`]: n.stretch
    })
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: x
      } = w;
      w.props.disabled || x != null && f(x.toString());
    },
    className: j(`${Be}-tab`, {
      [`${Be}-tab-active`]: w.key === u,
      [`${Be}-tab-disabled`]: w.props.disabled
    }),
    role: "tab",
    "aria-selected": w.key === u
  }, w.props.title)))))), l.map((w) => {
    if (w.props.children === void 0)
      return null;
    const x = w.key === u;
    return s.createElement(vr, {
      key: w.key,
      active: x,
      forceRender: w.props.forceRender,
      destroyOnClose: w.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Be}-content`,
      style: {
        display: x ? "block" : "none"
      }
    }, w.props.children));
  })));
}, $c = le(N4, {
  Tab: S4
}), _r = "adm-list", P4 = {
  mode: "default"
}, R4 = me((t, e) => {
  const n = U(P4, t), r = V(null);
  return be(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: j(_r, `${_r}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${_r}-header`
  }, n.header), s.createElement("div", {
    className: `${_r}-body`
  }, s.createElement("div", {
    className: `${_r}-body-inner`
  }, n.children))));
});
function At(t) {
  return t != null && t !== !1;
}
const Ot = "adm-list-item", M4 = (t) => {
  var e;
  const n = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, r = t.arrow === void 0 ? n : t.arrow, i = s.createElement("div", {
    className: `${Ot}-content`
  }, At(t.prefix) && s.createElement("div", {
    className: `${Ot}-content-prefix`
  }, t.prefix), s.createElement("div", {
    className: `${Ot}-content-main`
  }, At(t.title) && s.createElement("div", {
    className: `${Ot}-title`
  }, t.title), t.children, At(t.description) && s.createElement("div", {
    className: `${Ot}-description`
  }, t.description)), At(t.extra) && s.createElement("div", {
    className: `${Ot}-content-extra`
  }, t.extra), At(r) && s.createElement("div", {
    className: `${Ot}-content-arrow`
  }, r === !0 ? s.createElement(d2, null) : r));
  return W(t, s.createElement(n ? "a" : "div", {
    className: j(`${Ot}`, n ? ["adm-plain-anchor"] : [], t.disabled && `${Ot}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, i));
}, wt = le(R4, {
  Item: M4
}), Xf = vs(null), A4 = "adm-check-list", T4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(df, null)
}, I4 = (t) => {
  const e = U(T4, t), [n, r] = oe(e);
  function i(f) {
    e.multiple ? r([...n, f]) : r([f]);
  }
  function o(f) {
    r(n.filter((d) => d !== f));
  }
  const {
    activeIcon: a,
    extra: l,
    disabled: c,
    readOnly: u
  } = e;
  return s.createElement(Xf.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: o,
      activeIcon: a,
      extra: l,
      disabled: c,
      readOnly: u
    }
  }, W(e, s.createElement(wt, {
    mode: e.mode,
    className: A4
  }, e.children)));
}, Ti = "adm-check-list-item", L4 = (t) => {
  const e = it(Xf);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, o = e.extra ? e.extra(n) : i, a = s.createElement("div", {
    className: `${Ti}-extra`
  }, o);
  return W(t, s.createElement(wt.Item, {
    title: t.title,
    className: j(Ti, r && `${Ti}-readonly`, n && `${Ti}-active`),
    description: t.description,
    prefix: t.prefix,
    onClick: (l) => {
      var c;
      r || (n ? e.uncheck(t.value) : e.check(t.value), (c = t.onClick) === null || c === void 0 || c.call(t, l));
    },
    arrow: !1,
    clickable: !r,
    extra: a,
    disabled: t.disabled || e.disabled
  }, t.children));
}, _c = le(I4, {
  Item: L4
});
function D4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function Oc(t, e) {
  e || (e = {});
  var n = e.vargs || D4(t), r = [], i = /* @__PURE__ */ new Map(), o, a, l = function(b) {
    return a = setTimeout(function() {
      if (o) {
        i.delete(b);
        return;
      }
      r.splice(b, 1);
    }, e.maxAge);
  }, c = e.maxAge > 0 && e.maxAge < 1 / 0 ? l : 0, u = e.equals ? e.equals : 0, f = e.maxArgs, d = e.serializer, m;
  return t.length === 1 && !e.equals && !n ? (m = function(b) {
    d && (b = d(b));
    var y;
    return i.get(b) || (!c || c(b), i.set(b, y = t.call(this, b)), y);
  }, o = 1) : u ? m = function() {
    for (var b = f || arguments.length, y = r.length, v = -1; ++v < y; )
      if (r[v].length === b) {
        for (var p = -1; ++p < b && u(arguments[p], r[v][p]); )
          ;
        if (p === b)
          return r[v].val;
      }
    return r[v] = arguments, !c || c(v), arguments.val = t.apply(this, r[v]);
  } : m = function() {
    for (var b = f || arguments.length, y = r.length, v = -1; ++v < y; )
      if (r[v].length === b) {
        for (var p = -1; ++p < b && arguments[p] === r[v][p]; )
          ;
        if (p === b)
          return r[v].val;
      }
    return r[v] = arguments, !c || c(v), arguments.val = t.apply(this, r[v]);
  }, m.clear = function() {
    a && clearTimeout(a), i.clear(), r = [];
  }, m.keys = function() {
    return o ? [
      ...i.keys()
    ] : r.slice();
  }, m.values = function() {
    return o ? [
      ...i.values()
    ] : r.map((b) => b.val);
  }, m;
}
function Qf(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = ie(() => Oc((l) => {
    const c = [];
    let u = t;
    for (const f of l) {
      const d = u.find((m) => m[n] === f);
      if (!d || (c.push(d), !d[r]))
        break;
      u = d[r];
    }
    return c;
  }, {
    equals: Za
  }), [t]), o = ie(() => Oc((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: Za
  }), [t]);
  function a(l) {
    return {
      get items() {
        return i(l);
      },
      get isLeaf() {
        return o(l);
      }
    };
  }
  return a;
}
const Gs = [];
function V4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ri = "adm-skeleton", Xs = (t) => W(t, s.createElement("div", {
  className: j(ri, {
    [`${ri}-animated`]: t.animated
  })
})), j4 = (t) => W(t, s.createElement(Xs, {
  animated: t.animated,
  className: `${ri}-title`
})), B4 = {
  lineCount: 3
}, W4 = (t) => {
  const e = U(B4, t), n = V4(1, e.lineCount), r = s.createElement("div", {
    className: `${ri}-paragraph`
  }, n.map((i) => s.createElement(Xs, {
    key: i,
    animated: e.animated,
    className: `${ri}-paragraph-line`
  })));
  return W(e, r);
}, Ii = le(Xs, {
  Title: j4,
  Paragraph: W4
}), bi = (t = {}) => ie(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: o = "children"
  } = t;
  return [n, r, o, i];
}, [JSON.stringify(t)]), ct = "adm-cascader-view", Z4 = {
  defaultValue: []
}, H4 = (t) => {
  const e = U(Z4, t), {
    locale: n
  } = ye(), [r, i, o, a] = bi(e.fieldNames), l = Qf(e.options, {
    valueName: i,
    childrenName: o
  }), [c, u] = oe(Object.assign(Object.assign({}, e), {
    onChange: (p) => {
      var g;
      (g = e.onChange) === null || g === void 0 || g.call(e, p, l(p));
    }
  })), [f, d] = K(0), m = ie(() => {
    const p = [];
    let g = e.options, C = !1;
    for (const h of c) {
      const E = g.find((w) => w[i] === h);
      if (p.push({
        selected: E,
        options: g
      }), !E || !E[o]) {
        C = !0;
        break;
      }
      g = E[o];
    }
    return C || p.push({
      selected: void 0,
      options: g
    }), p;
  }, [c, e.options]);
  gs(() => {
    var p;
    (p = e.onTabsChange) === null || p === void 0 || p.call(e, f);
  }, [f]), X(() => {
    d(m.length - 1);
  }, [c]), X(() => {
    const p = m.length - 1;
    f > p && d(p);
  }, [f, m]);
  const b = (p, g) => {
    const C = c.slice(0, g);
    p !== void 0 && (C[g] = p), u(C);
  }, y = (p) => e.loading || p === Gs, v = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: ct
  }, s.createElement($c, {
    activeKey: f.toString(),
    onChange: (p) => {
      const g = parseInt(p);
      d(g);
    },
    stretch: !1,
    className: `${ct}-tabs`
  }, m.map((p, g) => {
    const C = p.selected;
    return s.createElement($c.Tab, {
      key: g.toString(),
      title: s.createElement("div", {
        className: `${ct}-header-title`
      }, C ? C[r] : typeof v == "function" ? v(g) : v),
      forceRender: !0
    }, s.createElement("div", {
      className: `${ct}-content`
    }, y(p.options) ? s.createElement("div", {
      className: `${ct}-skeleton`
    }, s.createElement(Ii, {
      className: `${ct}-skeleton-line-1`,
      animated: !0
    }), s.createElement(Ii, {
      className: `${ct}-skeleton-line-2`,
      animated: !0
    }), s.createElement(Ii, {
      className: `${ct}-skeleton-line-3`,
      animated: !0
    }), s.createElement(Ii, {
      className: `${ct}-skeleton-line-4`,
      animated: !0
    })) : s.createElement(_c, {
      value: [c[g]],
      onChange: (h) => b(h[0], g),
      activeIcon: e.activeIcon
    }, p.options.map((h) => {
      const E = c[g] === h[i];
      return s.createElement(_c.Item, {
        value: h[i],
        key: h[i],
        disabled: h[a],
        className: j(`${ct}-item`, {
          [`${ct}-item-active`]: E
        })
      }, h[r]);
    }))));
  }))));
}, z4 = le(H4, {
  optionSkeleton: Gs
}), Vn = "adm-cascader", U4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, Jf = me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U(U4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [o, a] = oe({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var C;
      g === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
    }
  }), l = {
    toggle: () => {
      a((g) => !g);
    },
    open: () => {
      a(!0);
    },
    close: () => {
      a(!1);
    }
  };
  be(e, () => l);
  const [c, u] = oe(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, g, m(g));
    }
  })), [, f, d] = bi(i.fieldNames), m = Qf(i.options, {
    valueName: f,
    childrenName: d
  }), [b, y] = K(c);
  X(() => {
    o || y(c);
  }, [o, c]);
  const v = W(i, s.createElement("div", {
    className: Vn
  }, s.createElement("div", {
    className: `${Vn}-header`
  }, s.createElement("a", {
    className: `${Vn}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), a(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Vn}-header-title`
  }, i.title), s.createElement("a", {
    className: `${Vn}-header-button`,
    onClick: () => {
      u(b, !0), a(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${Vn}-body`
  }, s.createElement(z4, Object.assign({}, i, {
    value: b,
    onChange: (g, C) => {
      var h;
      y(g), o && ((h = i.onSelect) === null || h === void 0 || h.call(i, g, C));
    }
  }))))), p = s.createElement(gr, {
    visible: o,
    position: "bottom",
    onMaskClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), a(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, v);
  return s.createElement(s.Fragment, null, p, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function q4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = K(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(Jf, Object.assign({}, t, {
        visible: i,
        onConfirm: (a, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, a, l), e(a);
        },
        onClose: () => {
          var a;
          (a = t.onClose) === null || a === void 0 || a.call(t), o(!1), e(null);
        },
        afterClose: () => {
          var a;
          (a = t.afterClose) === null || a === void 0 || a.call(t), r();
        }
      }));
    }, r = pi(s.createElement(n, null));
  });
}
const V7 = le(Jf, {
  prompt: q4,
  optionSkeleton: Gs
}), Or = "adm-center-popup", K4 = Object.assign(Object.assign({}, Ds), {
  getContainer: null
}), ed = (t) => {
  const e = U(K4, t), n = ws(), r = Re({
    scale: e.visible ? 1 : 0.8,
    opacity: e.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: !0
    },
    onRest: () => {
      var f, d;
      n.current || (o(e.visible), e.visible ? (f = e.afterShow) === null || f === void 0 || f.call(e) : (d = e.afterClose) === null || d === void 0 || d.call(e));
    }
  }), [i, o] = K(e.visible);
  Fe(() => {
    e.visible && o(!0);
  }, [e.visible]);
  const a = V(null);
  $o(a, e.disableBodyScroll && i);
  const l = gf(i && e.visible), c = s.createElement("div", {
    className: j(`${Or}-body`, e.bodyClassName),
    style: e.bodyStyle
  }, e.children), u = tn(e.stopPropagation, W(e, s.createElement("div", {
    className: Or,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, e.mask && s.createElement(mi, {
    visible: l,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose,
    onMaskClick: (f) => {
      var d, m;
      (d = e.onMaskClick) === null || d === void 0 || d.call(e, f), e.closeOnMaskClick && ((m = e.onClose) === null || m === void 0 || m.call(e));
    },
    style: e.maskStyle,
    className: j(`${Or}-mask`, e.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: e.stopPropagation
  }), s.createElement("div", {
    className: `${Or}-wrap`,
    role: e.role,
    "aria-label": e["aria-label"]
  }, s.createElement(ge.div, {
    style: Object.assign(Object.assign({}, r), {
      pointerEvents: r.opacity.to((f) => f === 1 ? "unset" : "none")
    }),
    ref: a
  }, e.showCloseButton && s.createElement("a", {
    className: j(`${Or}-close`, "adm-plain-anchor"),
    onClick: () => {
      var f;
      (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, s.createElement(hi, null)), c)))));
  return s.createElement(vr, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, hr(e.getContainer, u));
}, td = vs(null), Y4 = {
  disabled: !1,
  defaultValue: []
}, G4 = (t) => {
  const e = U(Y4, t), [n, r] = oe(e);
  return s.createElement(
    td.Provider,
    {
      // TODO: 性能优化
      value: {
        value: n,
        disabled: e.disabled,
        check: (i) => {
          r([...n, i]);
        },
        uncheck: (i) => {
          r(n.filter((o) => o !== i));
        }
      }
    },
    e.children
  );
}, nd = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), X4 = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), rd = (t) => {
  const e = V(null), n = Vt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== t.checked && t.onChange(i);
  });
  return X(() => {
    if (t.disabled || !e.current)
      return;
    const r = e.current;
    return r.addEventListener("click", n), () => {
      r.removeEventListener("click", n);
    };
  }, [t.disabled, t.onChange]), s.createElement("input", {
    ref: e,
    type: t.type,
    checked: t.checked,
    onChange: () => {
    },
    disabled: t.disabled,
    id: t.id
  });
}, Ht = "adm-checkbox", Q4 = {
  defaultChecked: !1,
  indeterminate: !1
}, J4 = me((t, e) => {
  const n = it(td), r = U(Q4, t);
  let [i, o] = oe({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), a = r.disabled;
  const {
    value: l
  } = r;
  n && l !== void 0 && (i = n.value.includes(l), o = (u) => {
    var f;
    u ? n.check(l) : n.uncheck(l), (f = r.onChange) === null || f === void 0 || f.call(r, u);
  }, a = a || n.disabled), be(e, () => ({
    check: () => {
      o(!0);
    },
    uncheck: () => {
      o(!1);
    },
    toggle: () => {
      o(!i);
    }
  }));
  const c = () => r.icon ? s.createElement("div", {
    className: `${Ht}-custom-icon`
  }, r.icon(i, r.indeterminate)) : s.createElement("div", {
    className: `${Ht}-icon`
  }, r.indeterminate ? s.createElement(X4, null) : i && s.createElement(nd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: j(Ht, {
      [`${Ht}-checked`]: i && !r.indeterminate,
      [`${Ht}-indeterminate`]: r.indeterminate,
      [`${Ht}-disabled`]: a,
      [`${Ht}-block`]: r.block
    })
  }, s.createElement(rd, {
    type: "checkbox",
    checked: i,
    onChange: o,
    disabled: a,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${Ht}-content`
  }, r.children)));
}), Sc = le(J4, {
  Group: G4
}), xn = "adm-collapse", ev = () => null, tv = (t) => {
  const {
    visible: e
  } = t, n = V(null), r = Ao(e, t.forceRender, t.destroyOnClose), [{
    height: i
  }, o] = Re(() => ({
    from: {
      height: 0
    },
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 25,
      clamp: !0
    }
  }));
  return D0(() => {
    if (!e)
      return;
    const a = n.current;
    a && o.start({
      height: a.offsetHeight,
      immediate: !0
    });
  }), gi(() => {
    const a = n.current;
    a && (e ? o.start({
      height: a.offsetHeight
    }) : (o.start({
      height: a.offsetHeight,
      immediate: !0
    }), o.start({
      height: 0
    })));
  }, [e]), s.createElement(ge.div, {
    className: j(`${xn}-panel-content`, {
      [`${xn}-panel-content-active`]: e
    }),
    style: {
      height: i.to((a) => i.idle && e ? "auto" : a)
    }
  }, s.createElement("div", {
    className: `${xn}-panel-content-inner`,
    ref: n
  }, s.createElement(wt.Item, null, r && t.children)));
}, nv = (t) => {
  const e = [];
  ln(t.children, (a) => {
    !Mn(a) || typeof a.key != "string" || e.push(a);
  });
  const n = () => {
    var a;
    if (!t.accordion)
      return {
        value: t.activeKey,
        defaultValue: (a = t.defaultActiveKey) !== null && a !== void 0 ? a : [],
        onChange: t.onChange
      };
    const l = {
      value: [],
      defaultValue: [],
      onChange: (c) => {
        var u, f;
        (u = t.onChange) === null || u === void 0 || u.call(t, (f = c[0]) !== null && f !== void 0 ? f : null);
      }
    };
    return t.activeKey === void 0 ? l.value = void 0 : t.activeKey !== null && (l.value = [t.activeKey]), [null, void 0].includes(t.defaultActiveKey) || (l.defaultValue = [t.defaultActiveKey]), l;
  }, [r, i] = oe(n()), o = r === null ? [] : Array.isArray(r) ? r : [r];
  return W(t, s.createElement("div", {
    className: xn
  }, s.createElement(wt, null, e.map((a) => {
    const l = a.key, c = o.includes(l);
    function u(d) {
      var m, b;
      t.accordion ? i(c ? [] : [l]) : i(c ? o.filter((y) => y !== l) : [...o, l]), (b = (m = a.props).onClick) === null || b === void 0 || b.call(m, d);
    }
    const f = () => {
      let d = s.createElement(hf, null);
      return t.arrow !== void 0 && (d = t.arrow), a.props.arrow !== void 0 && (d = a.props.arrow), typeof d == "function" ? d(c) : s.createElement("div", {
        className: j(`${xn}-arrow`, {
          [`${xn}-arrow-active`]: c
        })
      }, d);
    };
    return s.createElement(s.Fragment, {
      key: l
    }, W(a.props, s.createElement(wt.Item, {
      className: `${xn}-panel-header`,
      onClick: u,
      disabled: a.props.disabled,
      arrow: f()
    }, a.props.title)), s.createElement(tv, {
      visible: c,
      forceRender: !!a.props.forceRender,
      destroyOnClose: !!a.props.destroyOnClose
    }, a.props.children));
  }))));
}, j7 = le(nv, {
  Panel: ev
});
var id = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), o = this.endOf("y").day();
        return o === 4 || i && o === 5 ? 53 : 52;
      };
    };
  });
})(id);
var rv = id.exports;
const od = /* @__PURE__ */ $t(rv);
var ad = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(ad);
var iv = ad.exports;
const sd = /* @__PURE__ */ $t(iv), ir = "TILL_NOW";
ve.extend(Vo);
ve.extend(od);
ve.extend(sd);
const zt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function ov(t, e, n, r, i, o, a) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), y = n.getFullYear(), v = n.getMonth() + 1, p = n.getDate(), g = n.getHours(), C = n.getMinutes(), h = n.getSeconds(), E = zt[r], w = parseInt(t[0]), x = ve(za([t[0], t[1], "1"])), k = parseInt(t[1]), N = parseInt(t[2]), F = parseInt(t[3]), _ = parseInt(t[4]), D = w === c, I = w === y, R = D && k === u, $ = I && k === v, M = R && N === f, S = $ && N === p, O = M && F === d, A = S && F === g, P = O && _ === m, T = A && _ === C, B = (Z, q, Y) => {
    let G = [];
    for (let Ee = Z; Ee <= q; Ee++)
      G.push(Ee);
    const ce = t.slice(0, zt[Y]), he = o == null ? void 0 : o[Y];
    return he && typeof he == "function" && (G = G.filter((Ee) => he(Ee, {
      get date() {
        const z = [...ce, Ee.toString()];
        return za(z);
      }
    }))), G;
  };
  if (E >= zt.year) {
    const Y = B(c, y, "year");
    l.push(Y.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (E >= zt.month) {
    const Y = B(D ? u : 1, I ? v : 12, "month");
    l.push(Y.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (E >= zt.day) {
    const Z = R ? f : 1, q = $ ? p : x.daysInMonth(), Y = B(Z, q, "day");
    l.push(Y.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (E >= zt.hour) {
    const Y = B(M ? d : 0, S ? g : 23, "hour");
    l.push(Y.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (E >= zt.minute) {
    const Y = B(O ? m : 0, A ? C : 59, "minute");
    l.push(Y.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (E >= zt.second) {
    const Y = B(P ? b : 0, T ? h : 59, "second");
    l.push(Y.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (a && (l[0].push({
    label: i("now", null),
    value: ir
  }), ir === (t == null ? void 0 : t[0])))
    for (let Z = 1; Z < l.length; Z += 1)
      l[Z] = [];
  return l;
}
function av(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function za(t) {
  var e, n, r, i, o, a;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (o = t[4]) !== null && o !== void 0 ? o : "0", m = (a = t[5]) !== null && a !== void 0 ? a : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
ve.extend(Vo);
ve.extend(od);
ve.extend(sd);
const Sr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function sv(t, e, n, r, i, o) {
  const a = [], l = e.getFullYear(), c = n.getFullYear(), u = Sr[r], f = parseInt(t[0]), d = f === l, m = f === c, b = ve(e), y = ve(n), v = b.isoWeek(), p = y.isoWeek(), g = b.isoWeekday(), C = y.isoWeekday(), h = parseInt(t[1]), E = d && h === v, w = m && h === p, x = ve(`${f}-01-01`).isoWeeksInYear(), k = (N, F, _) => {
    let D = [];
    for (let $ = N; $ <= F; $++)
      D.push($);
    const I = t.slice(0, Sr[_]), R = o == null ? void 0 : o[_];
    return R && typeof R == "function" && (D = D.filter(($) => R($, {
      get date() {
        const M = [...I, $.toString()];
        return ld(M);
      }
    }))), D;
  };
  if (u >= Sr.year) {
    const _ = k(l, c, "year");
    a.push(_.map((D) => ({
      label: i("year", D),
      value: D.toString()
    })));
  }
  if (u >= Sr.week) {
    const _ = k(d ? v : 1, m ? p : x, "week");
    a.push(_.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= Sr["week-day"]) {
    const _ = k(E ? g : 1, w ? C : 7, "week-day");
    a.push(_.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return a;
}
function lv(t) {
  if (!t)
    return [];
  const e = ve(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function ld(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", o = (n = t[1]) !== null && n !== void 0 ? n : "1", a = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return ve().year(parseInt(i)).isoWeek(parseInt(o)).isoWeekday(parseInt(a)).hour(0).minute(0).second(0).toDate();
}
const cv = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, cd = (t, e) => {
  if (e.includes("week"))
    return lv(t);
  {
    const n = e;
    return av(t).slice(0, cv[n]);
  }
}, Ua = (t, e) => {
  if ((t == null ? void 0 : t[0]) === ir) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? ld(t) : za(t);
}, ud = (t, e, n, r, i, o, a) => r.startsWith("week") ? sv(t, e, n, r, i, o) : ov(t, e, n, r, i, o, a);
function fd(t) {
  const {
    locale: e
  } = ye();
  return ze((n, r) => {
    if (t)
      return t(n, r);
    switch (n) {
      case "minute":
      case "second":
      case "hour":
        return ("0" + r.toString()).slice(-2);
      case "now":
        return e.DatePicker.tillNow;
      default:
        return r.toString();
    }
  }, [t]);
}
const Fc = (/* @__PURE__ */ new Date()).getFullYear(), uv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Fc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Fc + 10)),
  precision: "day",
  defaultValue: null
}, dd = me((t, e) => {
  const n = U(uv, t), {
    renderLabel: r
  } = n, [i, o] = oe({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), a = ie(() => /* @__PURE__ */ new Date(), []), l = fd(r), c = ie(() => {
    let m = i ?? a;
    return m.tillNow ? [ir] : (m = new Date($e(m.getTime(), n.min.getTime(), n.max.getTime())), cd(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = ze((m) => {
    const b = Ua(m, n.precision);
    o(b, !0);
  }, [o, n.precision]), f = Vt((m) => {
    var b;
    const y = Ua(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, y);
  }), d = ze((m) => ud(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return W(n, s.createElement(Kf, {
    ref: e,
    columns: d,
    value: c,
    onCancel: n.onCancel,
    onClose: n.onClose,
    closeOnMaskClick: n.closeOnMaskClick,
    visible: n.visible,
    confirmText: n.confirmText,
    cancelText: n.cancelText,
    onConfirm: u,
    onSelect: f,
    getContainer: n.getContainer,
    loading: n.loading,
    loadingContent: n.loadingContent,
    afterShow: n.afterShow,
    afterClose: n.afterClose,
    onClick: n.onClick,
    title: n.title,
    stopPropagation: n.stopPropagation,
    mouseWheel: n.mouseWheel,
    destroyOnClose: n.destroyOnClose,
    forceRender: n.forceRender
  }, (m, b) => {
    var y;
    return (y = n.children) === null || y === void 0 ? void 0 : y.call(n, i, b);
  }));
});
function fv(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = K(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(dd, Object.assign({}, t, {
        visible: i,
        onConfirm: (a) => {
          var l;
          (l = t.onConfirm) === null || l === void 0 || l.call(t, a), e(a);
        },
        onClose: () => {
          var a;
          (a = t.onClose) === null || a === void 0 || a.call(t), o(!1), e(null);
        },
        afterClose: () => {
          var a;
          (a = t.afterClose) === null || a === void 0 || a.call(t), r();
        }
      }));
    }, r = pi(s.createElement(n, null));
  });
}
const B7 = le(dd, {
  prompt: fv,
  DATE_NOW: ir
}), Nc = (/* @__PURE__ */ new Date()).getFullYear(), dv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Nc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Nc + 10)),
  precision: "day"
}, W7 = (t) => {
  var e;
  const n = U(dv, t), {
    renderLabel: r
  } = n, [i, o] = oe({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), a = fd(r), l = ie(() => i != null && i.tillNow ? [ir, null, null] : cd(i, n.precision), [i, n.precision]), c = ze((u) => {
    var f;
    const d = Ua(u, n.precision);
    d && (o(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Go, {
    columns: (u) => ud(u, n.min, n.max, n.precision, a, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, mv = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(It, {
    key: e.key,
    onClick: t.onAction,
    className: j("adm-dialog-button", {
      "adm-dialog-button-bold": e.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, hv = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, md = (t) => {
  const e = U(hv, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: vt("image-container")
  }, s.createElement(Do, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: vt("header")
  }, s.createElement(ti, null, e.header)), !!e.title && s.createElement("div", {
    className: vt("title")
  }, e.title), s.createElement("div", {
    className: j(vt("content"), !e.content && vt("content-empty"))
  }, typeof e.content == "string" ? s.createElement(ti, null, e.content) : e.content), s.createElement("div", {
    className: vt("footer")
  }, e.actions.map((r, i) => {
    const o = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: vt("action-row"),
      key: i
    }, o.map((a, l) => s.createElement(mv, {
      key: a.key,
      action: a,
      onAction: () => Oe(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = a.onClick) === null || c === void 0 ? void 0 : c.call(a), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, a, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(ed, {
    className: j(vt(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    onMaskClick: e.closeOnMaskClick ? () => {
      var r;
      (r = e.onClose) === null || r === void 0 || r.call(e);
    } : void 0,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: j(vt("body"), e.image && vt("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    role: "dialog",
    "aria-label": e["aria-label"]
  }, n);
};
function vt(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const qa = /* @__PURE__ */ new Set();
function Qs(t) {
  const e = br(s.createElement(md, Object.assign({}, t, {
    afterClose: () => {
      var n;
      qa.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return qa.add(e.close), e;
}
function vv(t) {
  const e = {
    confirmText: li().locale.Dialog.ok
  }, n = U(e, t);
  return new Promise((r) => {
    Qs(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      actions: [{
        key: "confirm",
        text: n.confirmText
      }],
      onAction: n.onConfirm,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r();
      }
    }));
  });
}
const pv = {
  confirmText: "确认",
  cancelText: "取消"
};
function gv(t) {
  const {
    locale: e
  } = li(), n = U(pv, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Qs(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Oe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Oe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function yv() {
  qa.forEach((t) => {
    t();
  });
}
const Z7 = le(md, {
  show: Qs,
  alert: vv,
  confirm: gv,
  clear: yv
}), Mt = "adm-dropdown-item", bv = (t) => {
  var e;
  const n = j(Mt, {
    [`${Mt}-active`]: t.active,
    [`${Mt}-highlight`]: (e = t.highlight) !== null && e !== void 0 ? e : t.active
  });
  return W(t, s.createElement("div", {
    className: n,
    onClick: t.onClick
  }, s.createElement("div", {
    className: `${Mt}-title`
  }, s.createElement("span", {
    className: `${Mt}-title-text`
  }, t.title), s.createElement("span", {
    className: j(`${Mt}-title-arrow`, {
      [`${Mt}-title-arrow-active`]: t.active
    })
  }, t.arrow === void 0 ? s.createElement(l2, null) : t.arrow))));
}, Ev = bv, wv = (t) => {
  const {
    active: e = !1
  } = t, n = Ao(e, t.forceRender, t.destroyOnClose), r = j(`${Mt}-content`, {
    [`${Mt}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, jn = "adm-dropdown", Cv = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Ds.getContainer
}, xv = me((t, e) => {
  const n = U(Cv, t), [r, i] = oe({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), o = V(null), a = V(null);
  ku(() => {
    n.closeOnClickAway && i(null);
  }, [o, a]);
  const [l, c] = K(), u = V(null);
  X(() => {
    const y = u.current;
    if (y && r) {
      const v = y.getBoundingClientRect();
      c(v.bottom);
    }
  }, [r]);
  const f = (y) => {
    i(r === y ? null : y);
  };
  let d = !1;
  const m = [], b = s.Children.map(n.children, (y) => {
    if (Mn(y)) {
      const v = Object.assign(Object.assign({}, y.props), {
        onClick: (p) => {
          var g, C;
          f(y.key), (C = (g = y.props).onClick) === null || C === void 0 || C.call(g, p);
        },
        active: y.key === r,
        arrow: y.props.arrow === void 0 ? n.arrow : y.props.arrow
      });
      return m.push(y), y.props.forceRender && (d = !0), y1(y, v);
    } else
      return y;
  });
  return be(e, () => ({
    close: () => {
      i(null);
    }
  }), [i]), W(n, s.createElement("div", {
    className: j(jn, {
      [`${jn}-open`]: !!r
    }),
    ref: u
  }, s.createElement("div", {
    className: `${jn}-nav`,
    ref: o
  }, b), s.createElement(gr, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${jn}-popup`,
    maskClassName: `${jn}-popup-mask`,
    bodyClassName: `${jn}-popup-body`,
    style: {
      top: l
    },
    forceRender: d,
    onMaskClick: n.closeOnMaskClick ? () => {
      f(null);
    } : void 0
  }, s.createElement("div", {
    ref: a
  }, m.map((y) => {
    const v = y.key === r;
    return s.createElement(wv, {
      key: y.key,
      active: v,
      forceRender: y.props.forceRender,
      destroyOnClose: y.props.destroyOnClose
    }, y.props.children);
  })))));
}), kv = xv, H7 = le(kv, {
  Item: Ev
});
var Pc;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(Pc || (Pc = {}));
const $v = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var Rc;
function Yi(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += _v(n + r, t), Mv(t[n + r]) && r++, Nv(t[n + r]) && r++, Pv(t[n + r]) && r++, Av(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function _v(t, e) {
  const n = e[t];
  if (!Ov(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Mc(r) && Mc(i) ? 4 : Sv(r) && Rv(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : Fv(i) ? 4 : 2;
}
function Ov(t) {
  return t && An(t[0].charCodeAt(0), 55296, 56319);
}
function Mc(t) {
  return An(Js(t), 127462, 127487);
}
function Sv(t) {
  return An(Js(t), 127988, 127988);
}
function Fv(t) {
  return An(Js(t), 127995, 127999);
}
function Nv(t) {
  return typeof t == "string" && An(t.charCodeAt(0), 65024, 65039);
}
function Pv(t) {
  return typeof t == "string" && An(t.charCodeAt(0), 8400, 8447);
}
function Rv(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && An(e, 917504, 917631);
}
function Mv(t) {
  return typeof t == "string" && $v.includes(t.charCodeAt(0));
}
function Av(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function Js(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function An(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(Rc || (Rc = {}));
const Tv = "adm-ellipsis", Iv = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, z7 = (t) => {
  const e = U(Iv, t), n = V(null), r = V(null), i = V(null), [o, a] = K({}), [l, c] = K(e.defaultExpanded), [u, f] = K(!1), d = ie(() => Yi(e.content), [e.content]);
  function m(g, C) {
    return d.slice(g, C).join("");
  }
  function b() {
    var g, C;
    const h = n.current;
    if (!h)
      return;
    const E = h.style.display;
    h.style.display = "block";
    const w = window.getComputedStyle(h), x = document.createElement("div");
    Array.prototype.slice.apply(w).forEach((_) => {
      x.style.setProperty(_, w.getPropertyValue(_));
    }), h.style.display = E, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const N = ma(w.lineHeight), F = Math.floor(N * (e.rows + 0.5) + ma(w.paddingTop) + ma(w.paddingBottom));
    if (x.innerText = e.content, document.body.appendChild(x), x.offsetHeight <= F)
      f(!1);
    else {
      let $ = function(A, P) {
        if (P - A <= 1)
          return e.direction === "end" ? {
            leading: m(0, A) + "..."
          } : {
            tailing: "..." + m(P, _)
          };
        const T = Math.round((A + P) / 2);
        return e.direction === "end" ? x.innerHTML = m(0, T) + "..." + R : x.innerHTML = R + "..." + m(T, _), x.offsetHeight <= F ? e.direction === "end" ? $(T, P) : $(A, T) : e.direction === "end" ? $(A, T) : $(T, P);
      }, M = function(A, P) {
        if (A[1] - A[0] <= 1 && P[1] - P[0] <= 1)
          return {
            leading: m(0, A[0]) + "...",
            tailing: "..." + m(P[1], _)
          };
        const T = Math.floor((A[0] + A[1]) / 2), B = Math.ceil((P[0] + P[1]) / 2);
        return x.innerHTML = m(0, T) + "..." + R + "..." + m(B, _), x.offsetHeight <= F ? M([T, A[1]], [P[0], B]) : M([A[0], T], [B, P[1]]);
      };
      f(!0);
      const _ = e.content.length, D = typeof e.collapseText == "string" ? e.collapseText : (g = i.current) === null || g === void 0 ? void 0 : g.innerHTML, I = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, R = l ? D : I, S = Math.floor((0 + _) / 2), O = e.direction === "middle" ? M([0, S], [S, _]) : $(0, _);
      a(O);
    }
    document.body.removeChild(x);
  }
  yi(b, n), Fe(() => {
    b();
  }, [e.content, e.direction, e.rows, e.expandText, e.collapseText]);
  const y = !!e.expandText && tn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, e.expandText)), v = !!e.collapseText && tn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, e.collapseText)), p = () => u ? l ? s.createElement(s.Fragment, null, e.content, v) : s.createElement(s.Fragment, null, o.leading, y, o.tailing) : e.content;
  return W(e, s.createElement("div", {
    ref: n,
    className: Tv,
    onClick: (g) => {
      g.target === g.currentTarget && e.onContentClick(g);
    }
  }, p()));
};
function ma(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const Lv = (t) => W(t, s.createElement("svg", {
  viewBox: "0 0 64 41"
}, s.createElement("g", {
  transform: "translate(0 1)",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("ellipse", {
  fill: "#f5f5f5",
  cx: "32",
  cy: "33",
  rx: "32",
  ry: "7"
}), s.createElement("g", {
  stroke: "#d9d9d9"
}, s.createElement("path", {
  d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
}), s.createElement("path", {
  d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
  fill: "#fafafa"
}))))), Fr = "adm-empty", U7 = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(Lv, {
      className: `${Fr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Fr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, s.createElement("div", {
    className: Fr
  }, s.createElement("div", {
    className: `${Fr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: j(`${Fr}-description`)
  }, t.description)));
}, un = "adm-error-block", Dv = {
  status: "default"
};
function Vv(t) {
  return (n) => {
    var r;
    const i = U(Dv, n), {
      locale: o
    } = ye(), a = o.ErrorBlock[i.status], l = "description" in i ? i.description : a.description, c = "title" in i ? i.title : a.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, s.createElement("div", {
      className: j(un, {
        [`${un}-full-page`]: i.fullPage
      })
    }, s.createElement("div", {
      className: `${un}-image`
    }, f), s.createElement("div", {
      className: `${un}-description`
    }, ![void 0, null].includes(c) && s.createElement("div", {
      className: `${un}-description-title`
    }, c), ![void 0, null].includes(l) && s.createElement("div", {
      className: `${un}-description-subtitle`
    }, l)), i.children && s.createElement("div", {
      className: `${un}-content`
    }, i.children)));
  };
}
const jv = s.createElement("svg", {
  viewBox: "0 0 200 200",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, s.createElement("defs", null, s.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-default-a"
}, s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), s.createElement("circle", {
  id: "error-block-image-default-d",
  cx: 18.823,
  cy: 18.823,
  r: 18.823
}), s.createElement("rect", {
  id: "error-block-image-default-b",
  x: 3.5,
  y: 9,
  width: 51.429,
  height: 88,
  rx: 4.571
})), s.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("path", {
  d: "M73.557.004c19.435-.311 38.696 17.016 51.523 35.287 8.708-10.822 17.127-16.233 25.255-16.233 13.333 0 28.35 14.274 45.053 42.822 1.769 3.024-3.582 7.435-16.054 13.231l-41.322 1.37c-7.343 5.872-31.225.626-69.152 1.234-27.79.445-45.759-1.234-53.908-5.037C3.2 71.143-1.625 68.686.48 65.308 27.371 22.12 51.73.353 73.557.003Zm93.098 49.53a1.125 1.125 0 0 0-.401.072l-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.283 1.719 4.153 3.898 4.314l.026.001v3.805c0 .39.25.705.56.705.31 0 .56-.316.56-.705l.001-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734Zm-100-5a1.125 1.125 0 0 0-.331.05l-.035.01-.035.012-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.212 1.613 4.036 3.695 4.294l.203.02.026.001v3.805c0 .39.25.705.56.705.282 0 .515-.26.555-.6l.006-.105v-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734ZM52.64 38.348l-.15.008-.149.023-.032.007-.032.008-.078.022-.045.015-.045.016-.06.023-.038.017-.038.017-.058.028-.022.011a2.201 2.201 0 0 0-.323.204l-.05.038-.05.04-.025.02-.025.021a3.742 3.742 0 0 0-.31.294l-.036.04c-.035.037-.07.076-.105.116-.01.012-.02.025-.031.036a3.275 3.275 0 0 0-.081.098l-.063.078c-2.031 2.583-3.48 8.692-3.48 11.027 0 2.636 1.846 4.832 4.292 5.323l.224.04-.064-.012.105.018.103.014v4.618c0 .47.299.85.667.85.337 0 .615-.32.659-.735l.006-.115v-4.618c.18-.023.355-.054.527-.094l.256-.067.196-.06c2.136-.706 3.68-2.75 3.68-5.162 0-2.996-2.383-12.207-5.325-12.207Z",
  transform: "translate(2.286 22.286)",
  fill: "url(#error-block-image-default-a)"
}), s.createElement("g", {
  transform: "rotate(-90 102.429 55.357)"
}, s.createElement("path", {
  d: "M6.857 0H52a6.857 6.857 0 0 1 6.857 6.857v92A6.857 6.857 0 0 1 52 105.714H6.857A6.857 6.857 0 0 1 0 98.857v-92A6.857 6.857 0 0 1 6.857 0Z",
  fill: "#7EACFF"
}), s.createElement("mask", {
  id: "error-block-image-default-c",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-default-b"
})), s.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-default-b"
}), s.createElement("path", {
  d: "M11.838 91.8a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-2.858 0a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.16-2.305a.64.64 0 0 1 .628.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-2.982-.04a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm5.268-.531a.64.64 0 0 1 .628.651.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.858-1.143a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-6.37-.917c.209 0 .377.175.377.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm3.512-.798.093.007a.644.644 0 0 1 .535.645.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.652.627-.652Zm5.715 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-11.429 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.261.241c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm11.833-.812a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.628-.651c0-.36.281-.652.628-.652Zm-4.851.399c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm10.313-2.056a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-2.354-.128a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.652.628-.652Zm-13.798.311c.207 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.377-.39c0-.217.169-.392.377-.392Zm11.832-.812a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-6.285 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm3.428 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-6.118.24c.208 0 .376.176.376.392a.384.384 0 0 1-.376.39.384.384 0 0 1-.377-.39c0-.216.169-.391.377-.391Zm11.261-2.525a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm-3.557.484c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.478-.555a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.512-.26c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.857 0c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-4.571 0c.207 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm14.898-1.835a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-8.027-.245c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.169-.391.376-.391Zm6.271-1.349c.208 0 .377.175.377.391a.384.384 0 0 1-.377.391.384.384 0 0 1-.376-.39c0-.217.169-.392.376-.392Zm-11.484-.481c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm15.103-.972c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.39c0-.217.168-.392.376-.392Zm-9.333-1.404c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-6.819-.405c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-c)",
  transform: "rotate(116 12.367 83.503)"
}), s.createElement("path", {
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M36.774 5.474H21.523"
}), s.createElement("path", {
  d: "m67.818 94.025-4.996 3.913m4.996 11.91-4.996-3.912m-1.142 9.145-1.143-6.288m10.71-6.768h-7.262",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), s.createElement("circle", {
  cx: 8.571,
  cy: 8.571,
  r: 8.571,
  transform: "translate(22.857 142)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), s.createElement("g", {
  transform: "translate(132.857 124)"
}, s.createElement("mask", {
  id: "error-block-image-default-e",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-default-d"
})), s.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-default-d"
}), s.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 13.886,
  cy: 15.12,
  r: 18.823
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 23.4,
  cy: 29.057,
  r: 1
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.343,
  cy: 29.829,
  r: 1
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 18.771,
  cy: 32.657,
  r: 1.286
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 29.571,
  cy: 25.971,
  r: 1.286
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 19.286,
  cy: 7.971,
  r: 1.286
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 26.486,
  cy: 5.914,
  r: 1.286
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 11.057,
  cy: 6.943,
  r: 1
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.086,
  cy: 15.686,
  r: 1.286
}), s.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 22.886,
  cy: 14.657,
  r: 1
})), s.createElement("path", {
  d: "m87.429 135.123 6.591-9.378v-.08h-5.99v-2.559h10.038v1.787l-6.44 9.254v.082h6.56v2.557h-10.76v-1.663Zm12.185-5.889 4.948-7.047v-.056h-4.498v-1.917h7.536v1.34l-4.849 6.942v.059h4.923v1.92h-8.06v-1.24Zm10.345.702 3.708-5.274v-.045h-3.372v-1.437h5.648v1.003l-3.628 5.206v.045H116v1.438h-6.041v-.936Z",
  fill: "#FFF",
  fillRule: "nonzero"
}))), Bv = s.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, s.createElement("title", null, "@反馈/异常/网络服务异常"), s.createElement("defs", null, s.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-disconnected-c"
}, s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), s.createElement("circle", {
  id: "error-block-image-disconnected-d",
  cx: 22.309,
  cy: 22.309,
  r: 22.309
}), s.createElement("path", {
  id: "error-block-image-disconnected-a",
  d: "M0 0h400v400H0z"
})), s.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("mask", {
  id: "error-block-image-disconnected-b",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-a"
})), s.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "url(#error-block-image-disconnected-c)"
}, s.createElement("path", {
  d: "M151.686 45.58c38.869-.623 77.391 34.03 103.046 70.573 17.416-21.644 34.253-32.465 50.51-32.465 26.666 0 56.701 28.548 90.105 85.643 3.539 6.05-7.164 14.87-32.107 26.462l-82.643 2.741c-14.686 11.745-62.45 1.252-138.305 2.467-55.58.89-91.518-2.468-107.816-10.074-23.505-3.07-33.154-7.983-28.946-14.74C59.313 89.813 108.03 46.278 151.686 45.58Zm186.195 99.06-.127.003-.126.01a2.32 2.32 0 0 0-.465.103l-.032.01-.031.01a2.364 2.364 0 0 0-.181.071 2.52 2.52 0 0 0-.116.054l-.133.067-.042.024-.036.02a2.946 2.946 0 0 0-.133.08l-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024a4.906 4.906 0 0 0-.31.27l-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.108.008v7.608c0 .779.502 1.41 1.121 1.41.62 0 1.121-.632 1.121-1.41v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-200-10-.127.003-.126.01a2.32 2.32 0 0 0-.368.073l-.049.014-.048.016-.032.01-.031.01a2.364 2.364 0 0 0-.181.071l-.058.026-.058.028-.133.067-.042.024-.036.02-.066.039-.067.041-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024l-.156.13-.154.14-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.054.004.054.004v7.608c0 .779.502 1.41 1.121 1.41.58 0 1.058-.556 1.115-1.266l.006-.144v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-28.029-12.373-.107.002-.106.006a2.978 2.978 0 0 0-.551.095 3.444 3.444 0 0 0-.323.104 3.962 3.962 0 0 0-.61.297c-.076.045-.15.092-.226.141-4.964 3.312-8.728 18.445-8.728 23.77 0 5.434 3.922 9.935 9.04 10.726l.28.04v9.236c0 .886.532 1.614 1.21 1.692l.121.007.122-.007c.638-.074 1.147-.723 1.204-1.538l.006-.155v-9.235c5.254-.668 9.32-5.234 9.32-10.767 0-5.993-4.77-24.414-10.652-24.414Z"
})), s.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, s.createElement("g", {
  transform: "translate(85.858 150.644)"
}, s.createElement("path", {
  d: "M116.26 28.467c1.352 0 2.703.018 4.054.054 3.923.385 10.188 4.248 9.267 11.061-.878 6.496-5.836 9.089-8.962 9.529a130.762 130.762 0 0 0-4.36-.072c-28.567 0-60.654 10.149-96.22 30.676l-2.227 1.297c-.744.437-1.49.878-2.236 1.323-4.878 2.911-11.193 1.316-14.103-3.562C-1.438 73.894.157 67.58 5.035 64.67 45.34 40.62 82.4 28.467 116.26 28.467Zm22 11.63c1.03-5.942 6.376-8.618 11.084-8.08C172.14 36.91 194.83 46.86 217.37 61.794c4.735 3.138 6.03 9.52 2.893 14.255-3.138 4.736-9.52 6.031-14.256 2.893-20.111-13.325-40.075-22.165-59.935-26.584a9.974 9.974 0 0 0-.325-.088c-3.987-1.015-8.602-5.738-7.487-12.175ZM116.26 77.418c22.777 0 45.4 7.057 67.73 20.988 4.82 3.007 6.289 9.351 3.282 14.17-3.007 4.82-9.351 6.29-14.17 3.283-19.194-11.974-38.095-17.87-56.842-17.87s-37.648 5.896-56.842 17.87c-4.82 3.007-11.164 1.537-14.17-3.282-3.007-4.82-1.538-11.164 3.282-14.171 22.33-13.931 44.953-20.988 67.73-20.988ZM117.974 124.67c9.85 0 17.303 1.69 25.687 5.082l.82.337 2.9 1.231 3.008 1.252.77.305.107.04c5.326 1.976 8.042 7.895 6.066 13.221-1.976 5.326-7.895 8.042-13.221 6.067l-.713-.27-.726-.285-.763-.31-1.263-.527-2.944-1.26-1.125-.473c-6.393-2.648-11.433-3.838-18.603-3.838-8.223 0-16.532 2.126-25.028 6.475-5.056 2.588-11.254.587-13.842-4.47-2.589-5.056-.588-11.253 4.47-13.842 11.313-5.791 22.814-8.735 34.4-8.735ZM118.235 197.047c7.15 0 13.77-.897 19.841-2.721 5.44-1.635 8.526-7.37 6.892-12.81-1.635-5.44-7.37-8.526-12.81-6.892-4.072 1.224-8.707 1.851-13.923 1.851-4.36 0-8.79-1.045-13.373-3.21l-.626-.301c-5.095-2.512-11.262-.418-13.773 4.678-2.512 5.095-.418 11.261 4.678 13.773 7.559 3.727 15.288 5.632 23.094 5.632Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), s.createElement("path", {
  d: "M198.35 62.413c2.755-4.967 9.016-6.76 13.984-4.004 13.068 7.25 19.124 18.535 17.615 30.952-1.157 9.515-6.83 18.757-14.096 24.352-13.364 10.29-34.915 9.401-49.363-1.91-4.472-3.502-5.26-9.967-1.758-14.44 3.436-4.388 9.724-5.229 14.185-1.952l.255.194c7.283 5.702 18.475 6.164 24.13 1.809 3.072-2.366 5.766-6.754 6.226-10.536.467-3.844-1.21-7.07-6.796-10.267l-.378-.213c-4.967-2.756-6.76-9.017-4.004-13.985ZM61.35 103.092c-2.84-4.92-9.13-6.607-14.05-3.768-20.662 11.922-21.772 35.751-6.018 51.69 13.752 13.914 33.192 13.447 50.507 1.158 4.633-3.288 5.723-9.708 2.436-14.34-3.288-4.633-9.709-5.724-14.341-2.436-9.763 6.928-18.07 7.128-23.97 1.158-6.761-6.84-6.498-14.501 1.35-19.225l.317-.187c4.92-2.84 6.608-9.13 3.769-14.05ZM129.103 135.702c1.688-5.424 7.454-8.453 12.878-6.764 14.776 4.599 23.437 13.727 25.259 25.58 1.316 8.561-1.228 17.533-5.58 24.052-3.132 4.688-7.388 8.287-12.504 11.112-3.03 1.673-5.75 2.811-9.37 4.066l-1.4.477c-5.387 1.806-11.217-1.097-13.022-6.484-1.805-5.386 1.098-11.216 6.484-13.02l1.09-.374c6.032-2.112 9.602-4.19 11.613-7.201 1.693-2.535 2.818-6.502 2.356-9.503-.564-3.673-3.432-6.696-11.04-9.063-5.424-1.689-8.452-7.454-6.764-12.878Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), s.createElement("path", {
  d: "M148.072 181.58c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.236-9.096-10.275-9.707",
  stroke: "#FFF",
  strokeWidth: 0.571,
  strokeLinecap: "round"
}), s.createElement("ellipse", {
  fill: "#7EACFF",
  transform: "rotate(10 147 41.933)",
  cx: 147,
  cy: 41.933,
  rx: 9.143,
  ry: 10.286
}), s.createElement("path", {
  d: "M210.422 107.472c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.668-9.883-11.572-12.067M51.604 131.769c-3.15-6.8-3.537-12.694-1.161-17.685 2.376-4.99 5.57-8.136 9.583-9.438",
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), s.createElement("path", {
  d: "M21.53 64.408c4.946-3.389 9.817-6.026 14.612-7.912",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), s.createElement("path", {
  d: "m113.243 15.444 9.588 8.314M144.31 9.405l-5.775 11.3m18.389-1.246-11.907 4.643M127.64 5.66l2.77 14.255",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), s.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, s.createElement("g", {
  transform: "translate(275.143 302.571)"
}, s.createElement("mask", {
  id: "error-block-image-disconnected-e",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-d"
})), s.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-disconnected-d"
}), s.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 16.457,
  cy: 17.92,
  r: 22.309
}), s.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 14.263,
  cy: 12.069,
  r: 2.194
}))), s.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "#FBBE47",
  fillRule: "nonzero"
}, s.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 12,
  transform: "translate(84 297.714)"
})))), Wv = s.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, s.createElement("defs", null, s.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-empty-a"
}, s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), s.createElement("path", {
  d: "M146.183 18.461c31.705 23.336 33.349 71.85 4.93 96.614-.252.22 6.172 5.602 13.577 11.414l.686.537.69.54.695.54.348.27.698.54a341.27 341.27 0 0 0 8.806 6.596c1.114.802 4.643-.853 10.587-4.965l-.532 12.218a1.2 1.2 0 0 1-.481.91l-10.868 8.111c-1.405 1.048-3.32 1.185-4.854.072l-35.578-25.834c-33.414 17.333-79.913 15-109.804-7-33.444-24.616-33.444-75.95 0-100.563 33.443-24.615 87.657-24.615 121.1 0Zm-60.469 7.653C51.63 26.114 24 44.534 24 67.257S51.63 108.4 85.714 108.4s61.715-18.42 61.715-41.143c0-22.722-27.63-41.143-61.715-41.143Z",
  id: "error-block-image-empty-b"
})), s.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("path", {
  d: "M157.964 244.661H0L3.806 100.13a4.572 4.572 0 0 1 4.353-4.446l.217-.006h45.588V68.2a4.572 4.572 0 0 1 4.356-4.567l.216-.005h65.498l2.554-58.689a4.571 4.571 0 0 1 4.779-4.367l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.212 3.146 69.652L301.634 64.9a4.571 4.571 0 0 1 5.628 4.231l.005.215v43.955l56.162.001v130.264h-56.163v.001h-82.383v-.004h-66.919v1.098ZM89.503 160.03h-9.968v8.436h9.968v-8.436Zm0-14.507h-9.968v8.435h9.968v-8.435Zm197.985-5.15h-9.967v8.432h9.967v-8.431Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.436h9.967v-8.436Zm-84.643-3.29h-30.8v8.436h30.8v-8.436Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 50.286)",
  fill: "url(#error-block-image-empty-a)"
}), s.createElement("g", {
  transform: "translate(108.571 189.886)"
}, s.createElement("mask", {
  id: "error-block-image-empty-c",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-empty-b"
})), s.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-empty-b"
}), s.createElement("path", {
  d: "M131.429 134.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM128 133.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM120 128.971a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.142.125.006a1.143 1.143 0 1 1-.125-.006Zm11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-22.857 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm17.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM136 125.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-13.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm18.857-2.286a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-37.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm13.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm18.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-28 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm17.715-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-4.571a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.428 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.143 1.142a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-9.143 0a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm30.286-3.429a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM124 109.543a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.858-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-11.428-3.429a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM124 99.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM49.143 55.829a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-9.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM52 52.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-19.429-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-1.142a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-13.143 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM64 44.4a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.125.007a1.143 1.143 0 1 1-.125-.007Zm11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.858 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM30.286 44.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM44 43.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM72 38.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-28 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm5.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM56 37.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM60.57 32.97a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM44 34.114a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm30.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-15.429 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.857-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-11.429-3.428a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM41.714 20.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-empty-c)"
})), s.createElement("path", {
  d: "M295.213 319.24c.744.546.745 1.433.002 1.98l-11.806 8.81c-1.069.799-3.326.474-4.853-.609l-35.622-25.241c-33.375 17.037-79.545 14.615-109.28-7.271-33.443-24.615-33.443-64.521 0-89.133 33.443-24.616 87.657-24.616 121.1 0 31.706 23.336 33.35 60.42 4.931 85.185-.543.473 35.528 26.278 35.528 26.278ZM148.06 220.015c-25.44 17.853-25.44 46.8 0 64.652 25.44 17.85 66.689 17.85 92.129 0 25.436-17.853 25.436-46.799 0-64.652-25.44-17.853-66.688-17.853-92.129 0Z",
  fill: "#5D96FE"
}), s.createElement("path", {
  d: "M123.514 233.021c2.185-5.241 5.67-9.735 10.453-13.482M264.967 271.54c-2.185 5.24-5.67 9.734-10.453 13.481",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), s.createElement("path", {
  d: "M81.143 252.571c7.574 0 13.714 23.88 13.714 31.649 0 6.97-4.942 12.755-11.429 13.871v11.672c0 1.235-.767 2.237-1.713 2.237-.904 0-1.644-.912-1.71-2.07l-.005-.167v-11.526c-7.04-.595-12.571-6.644-12.571-14.017 0-7.024 5.02-27.222 11.581-31.027l.096-.053c.027-.016.055-.03.082-.045l.067-.035.066-.033.1-.05.094-.041a3.34 3.34 0 0 1 .224-.093l.11-.042.097-.032c.038-.013.077-.025.115-.036l.053-.016.053-.014a3.351 3.351 0 0 1 .23-.055l.085-.016a3.95 3.95 0 0 1 .441-.054l.11-.005.11-.002Z",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), s.createElement("g", {
  transform: "translate(283.429 177.143)",
  fillRule: "nonzero"
}, s.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.49 0-2.707-1.46-2.79-3.301l-.004-.2-.001-19.018C8.659 71.92.13 62.518.13 51.123.13 40.071 8.154 8.49 18.694 2.015l.054-.031a5.94 5.94 0 0 1 .214-.128l.088-.048c.213-.12.427-.228.642-.326l.135-.06.18-.075.135-.053a5.796 5.796 0 0 1 .464-.16 4.44 4.44 0 0 1 .33-.092l.124-.03a7.122 7.122 0 0 1 .31-.065l.018-.003a6.305 6.305 0 0 1 .756-.088l.165-.007.166-.002Z",
  fill: "#FFCD6B"
}), s.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.543 0-2.794-1.566-2.794-3.5V73.295C8.659 71.921.13 62.518.13 51.123.13 38.783 10.134.847 22.475.847Z",
  fill: "#FFCD6B"
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 26.4,
  cy: 56.869,
  r: 1.45
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 39.453,
  cy: 58.319,
  r: 1
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 17.698,
  cy: 63.637,
  r: 2.417
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 38.002,
  cy: 51.068,
  r: 2.417
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 18.665,
  cy: 17.228,
  r: 2.417
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 32.201,
  cy: 13.36,
  r: 2.417
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 26.83,
  cy: 20.666,
  r: 1.45
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 38.969,
  cy: 31.731,
  r: 2.417
}), s.createElement("circle", {
  fill: "#FFB400",
  cx: 25.433,
  cy: 29.797,
  r: 1.45
}), s.createElement("path", {
  d: "M34.197 53.033c0 9.825-6.934 18.017-16.172 19.987a22.44 22.44 0 0 0 4.45.448c12.34 0 22.344-10.004 22.344-22.345C44.82 38.783 34.815.847 22.475.847c8.947 14.03 11.722 40.891 11.722 52.186Z",
  fill: "#FBBE47"
})))), Zv = s.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, s.createElement("defs", null, s.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-busy-a"
}, s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), s.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), s.createElement("circle", {
  id: "error-block-image-busy-b",
  cx: 34.857,
  cy: 34.857,
  r: 34.857
})), s.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("path", {
  d: "M157.964 243.667H0L3.806 99.134a4.572 4.572 0 0 1 4.353-4.446l.217-.005h45.588V67.205a4.572 4.572 0 0 1 4.356-4.566l.216-.005 65.498-.001 2.554-58.688a4.571 4.571 0 0 1 4.779-4.368l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.213 3.146 69.652 74.976-17.906a4.571 4.571 0 0 1 5.628 4.23l.005.216v43.955h56.162v130.265l-56.163-.001v.002h-82.383v-.004h-66.919v1.098Zm-68.461-84.631h-9.968v8.435h9.968v-8.435Zm0-14.508h-9.968v8.436h9.968v-8.436Zm197.985-5.149h-9.967v8.432h9.967v-8.432Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.435h9.967v-8.435Zm-84.643-3.29h-30.8v8.435h30.8v-8.435Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 51.286)",
  fill: "url(#error-block-image-busy-a)"
}), s.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l.958-.01c-.376 7.363 3.679 59.93 34.894 62.659 4.203.367 7.432.39 7.475 4.609.042 4.218-3.176 4.307-7.37 4.76-34.593 3.737-34.136 56.004-33.61 63.357l-.957.01c-5.276.053-9.51 4.373-9.455 9.649.053 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.054 9.508-4.374 9.455-9.648-.055-5.276-4.374-9.51-9.65-9.455l-.958.01c.377-7.363-.729-59.672-34.894-62.66-4.202-.367-7.432-.39-7.474-4.608-.043-4.219 3.175-4.308 7.369-4.76 31.276-3.377 34.136-56.004 33.61-63.357l.958-.01c5.276-.053 9.508-4.373 9.455-9.649-.055-5.276-4.374-9.509-9.65-9.454Z",
  fill: "#377EFF"
}), s.createElement("path", {
  d: "M233.524 314.422c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.894-5.644c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.149 17.865c.108.684.773 1.147 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm-2.144-8.182c.109.684.773 1.148 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-1.586-4.694c.108.684.772 1.148 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.013-5.88c.109.685.773 1.148 1.484 1.036.71-.113 1.2-.759 1.09-1.443-.107-.684-.772-1.148-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm.236 15.575c.108.685.772 1.148 1.483 1.035.71-.112 1.2-.758 1.09-1.442-.107-.685-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.442Zm-.4 4.494c.108.684.772 1.147 1.483 1.035.71-.113 1.2-.759 1.091-1.443-.108-.684-.773-1.148-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-3.88-8.601c.108.684.772 1.147 1.483 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-.524-7.186c.065.41.463.688.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-2.265-4.102c.109.684.773 1.148 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.147-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm-.545-6.518c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm2.098 23.629c.109.684.773 1.147 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.443Zm-.756-9.65c.043.274.309.46.593.414a.512.512 0 0 0 .437-.577.512.512 0 0 0-.594-.414.512.512 0 0 0-.436.577Zm-.808 20.96c.109.684.773 1.147 1.484 1.034.71-.112 1.2-.758 1.09-1.442-.108-.685-.772-1.148-1.483-1.036-.71.113-1.199.759-1.09 1.443Zm-4.691-31.966c.065.41.463.689.89.621.426-.068.72-.455.654-.866-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm2.098 23.628c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.967-12.416c.109.684.773 1.147 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm1.073 6.772c.108.685.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.036-.711.113-1.2.759-1.091 1.443Zm-.009-3.131c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.43-9.03c.065.41.463.688.89.62.426-.067.72-.454.655-.865-.065-.41-.464-.689-.89-.62-.427.067-.72.454-.655.865ZM214.5 333.38c.108.685.772 1.148 1.483 1.036.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.711.112-1.2.758-1.091 1.442Zm-.156-7.178c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm-1.871-4.72c.108.684.773 1.147 1.483 1.034.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.035-.71.112-1.2.758-1.091 1.442Zm-1.614-6.857c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-.894-5.644c.065.41.464.689.89.621.427-.067.72-.455.655-.866-.065-.41-.463-.688-.89-.62-.427.067-.72.455-.655.865Zm-1.43-9.03c.065.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.958 14.225c.065.41.463.689.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-.703 12.81c.065.41.464.688.89.62.427-.067.72-.455.655-.865-.065-.41-.463-.689-.89-.621-.427.067-.72.455-.655.866Zm-4.543-22.536c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm2.806 30.138c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm-5.694-17.996c.065.41.463.688.89.62.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.866Zm-2.935-13.343c.066.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.463-.689-.89-.621-.426.068-.72.455-.655.866Z",
  fill: "#003CFF",
  fillRule: "nonzero"
}), s.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l101.963-1.04c5.276-.052 9.508-4.372 9.455-9.648-.055-5.276-4.374-9.509-9.65-9.454ZM252.64 331.241l-101.964 1.038c-5.275.054-9.508 4.374-9.454 9.65.054 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.053 9.507-4.373 9.454-9.649-.054-5.275-4.374-9.508-9.649-9.454Z",
  fill: "#7EACFF"
}), s.createElement("path", {
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "m196.824 197.298 52.216-.506M193.329 330.5h52.215"
}), s.createElement("path", {
  d: "M167.367 228.041c-4.091-10.787-6.086-20.934-5.985-30.44",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), s.createElement("circle", {
  cx: 14.857,
  cy: 14.857,
  r: 14.857,
  transform: "translate(106.857 248.571)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), s.createElement("g", {
  transform: "translate(236.571 284.571)"
}, s.createElement("mask", {
  id: "error-block-image-busy-c",
  fill: "#fff"
}, s.createElement("use", {
  xlinkHref: "#error-block-image-busy-b"
})), s.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-busy-b"
}), s.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 25.714,
  cy: 28,
  r: 34.857
}), s.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 22.286,
  cy: 18.857,
  r: 3.429
})))), Hv = {
  default: jv,
  disconnected: Bv,
  empty: Wv,
  busy: Zv
}, q7 = Vv(Hv), Li = "adm-floating-bubble", zv = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, K7 = (t) => {
  const e = U(zv, t), n = V(null), r = V(null), [i, o] = K(e.offset === void 0 ? e.defaultOffset : e.offset);
  X(() => {
    e.offset !== void 0 && u.start({
      x: e.offset.x,
      y: e.offset.y
    });
  }, [e.offset]);
  const [{
    x: a,
    y: l,
    opacity: c
  }, u] = Re(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = _t((d) => {
    var m;
    let b = d.offset[0], y = d.offset[1];
    if (d.last && e.magnetic) {
      const p = n.current, g = r.current;
      if (!p || !g)
        return;
      const C = p.getBoundingClientRect(), h = g.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = a.goal - a.get(), w = h.left + E - C.left, x = C.right - (h.right + E);
        x <= w ? b += x : b -= w;
      } else if (e.magnetic === "y") {
        const E = l.goal - l.get(), w = h.top + E - C.top, x = C.bottom - (h.bottom + E);
        x <= w ? y += x : y -= w;
      }
    }
    const v = {
      x: b,
      y
    };
    e.offset === void 0 ? u.start(v) : o(v), (m = e.onOffsetChange) === null || m === void 0 || m.call(e, v), u.start({
      opacity: d.active ? 0.8 : 1
    });
  }, {
    axis: e.axis === "xy" ? void 0 : e.axis,
    pointer: {
      touch: !0
    },
    // the component won't trigger drag logic if the user just clicked on the component.
    filterTaps: !0,
    // set constraints to the user gesture
    bounds: n,
    from: () => [a.get(), l.get()]
  });
  return W(e, s.createElement("div", {
    className: Li
  }, s.createElement("div", {
    className: `${Li}-boundary-outer`
  }, s.createElement("div", {
    className: `${Li}-boundary`,
    ref: n
  })), s.createElement(ge.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: Bh([a, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${Li}-button`,
    ref: r
  }), e.children)));
};
function el(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Nr = "adm-floating-panel", Uv = {
  handleDraggingOfContent: !0
}, Y7 = me((t, e) => {
  var n, r;
  const i = U(Uv, t), {
    anchors: o
  } = i, a = (n = o[o.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, l = o.map((C) => -C), c = V(null), u = V(null), f = V(null), [d, m] = K(!1), b = V(!1), y = {
    top: l[l.length - 1],
    bottom: l[0]
  }, v = Vt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: p
  }, g] = Re(() => ({
    y: y.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      v(-C.value.y, p.isAnimating);
    }
  }));
  return _t((C) => {
    const [, h] = C.offset;
    if (C.first) {
      const x = C.event.target, k = u.current;
      if (k === x || k != null && k.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = p.goal <= y.top, F = f.current;
        if (!F)
          return;
        N ? F.scrollTop <= 0 && C.direction[1] > 0 && (b.current = !0) : b.current = !0;
      }
    }
    if (m(b.current), !b.current)
      return;
    const {
      event: E
    } = C;
    E.cancelable && Sn && E.preventDefault(), E.stopPropagation();
    let w = h;
    C.last && (b.current = !1, m(!1), w = el(l, h)), g.start({
      y: w
    });
  }, {
    axis: "y",
    bounds: y,
    rubberband: !0,
    from: () => [0, p.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Sn ? {
      passive: !1
    } : void 0
  }), be(e, () => ({
    setHeight: (C, h) => {
      g.start({
        y: -C,
        immediate: h == null ? void 0 : h.immediate
      });
    }
  }), [g]), $o(c, !0), W(i, s.createElement(ge.div, {
    ref: c,
    className: Nr,
    style: {
      height: Math.round(a),
      translateY: p.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, s.createElement("div", {
    className: `${Nr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), s.createElement("div", {
    className: `${Nr}-header`,
    ref: u
  }, s.createElement("div", {
    className: `${Nr}-bar`
  })), s.createElement("div", {
    className: `${Nr}-content`,
    ref: f
  }, i.children)));
});
function vo() {
  return vo = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, vo.apply(this, arguments);
}
function qv(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function tl(t, e) {
  if (t == null)
    return {};
  var n = qv(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function Ue(t) {
  "@babel/helpers - typeof";
  return Ue = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ue(t);
}
function Kv(t, e) {
  if (Ue(t) !== "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (Ue(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function hd(t) {
  var e = Kv(t, "string");
  return Ue(e) === "symbol" ? e : String(e);
}
function Ve(t, e, n) {
  return e = hd(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Ac(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ae(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ac(Object(n), !0).forEach(function(r) {
      Ve(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ac(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Ka(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function Yv(t) {
  if (Array.isArray(t))
    return Ka(t);
}
function vd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function nl(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ka(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ka(t, e);
  }
}
function Gv() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function se(t) {
  return Yv(t) || vd(t) || nl(t) || Gv();
}
function Ei(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Tc(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, hd(r.key), r);
  }
}
function wi(t, e, n) {
  return e && Tc(t.prototype, e), n && Tc(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function pd(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Ya(t, e) {
  return Ya = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ya(t, e);
}
function Xv(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && Ya(t, e);
}
function po(t) {
  return po = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, po(t);
}
function Qv() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Jv(t, e) {
  if (e && (Ue(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pd(t);
}
function ep(t) {
  var e = Qv();
  return function() {
    var r = po(t), i;
    if (e) {
      var o = po(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else
      i = r.apply(this, arguments);
    return Jv(this, i);
  };
}
function Ga(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(Ga(r)) : ho.isFragment(r) && r.props ? n = n.concat(Ga(r.props.children, e)) : n.push(r));
  }), n;
}
var Xa = {}, tp = function(e) {
};
function np(t, e) {
}
function rp(t, e) {
}
function ip() {
  Xa = {};
}
function gd(t, e, n) {
  !e && !Xa[n] && (t(!1, n), Xa[n] = !0);
}
function mt(t, e) {
  gd(np, t, e);
}
function op(t, e) {
  gd(rp, t, e);
}
mt.preMessage = tp;
mt.resetWarned = ip;
mt.noteOnce = op;
var kn = "RC_FORM_INTERNAL_HOOKS", fe = function() {
  mt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Pn = /* @__PURE__ */ L.createContext({
  getFieldValue: fe,
  getFieldsValue: fe,
  getFieldError: fe,
  getFieldWarning: fe,
  getFieldsError: fe,
  isFieldsTouched: fe,
  isFieldTouched: fe,
  isFieldValidating: fe,
  isFieldsValidating: fe,
  resetFields: fe,
  setFields: fe,
  setFieldValue: fe,
  setFieldsValue: fe,
  validateFields: fe,
  submit: fe,
  getInternalHooks: function() {
    return fe(), {
      dispatch: fe,
      initEntityValue: fe,
      registerField: fe,
      useSubscribe: fe,
      setInitialValues: fe,
      destroyForm: fe,
      setCallbacks: fe,
      registerWatch: fe,
      getFields: fe,
      setValidateMessages: fe,
      setPreserve: fe,
      getInitialValue: fe
    };
  }
});
function Qa(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Lt() {
  Lt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(S, O, A) {
    S[O] = A.value;
  }, o = typeof Symbol == "function" ? Symbol : {}, a = o.iterator || "@@iterator", l = o.asyncIterator || "@@asyncIterator", c = o.toStringTag || "@@toStringTag";
  function u(S, O, A) {
    return Object.defineProperty(S, O, {
      value: A,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), S[O];
  }
  try {
    u({}, "");
  } catch {
    u = function(A, P, T) {
      return A[P] = T;
    };
  }
  function f(S, O, A, P) {
    var T = O && O.prototype instanceof g ? O : g, B = Object.create(T.prototype), Z = new $(P || []);
    return i(B, "_invoke", {
      value: _(S, A, Z)
    }), B;
  }
  function d(S, O, A) {
    try {
      return {
        type: "normal",
        arg: S.call(O, A)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  e.wrap = f;
  var m = "suspendedStart", b = "suspendedYield", y = "executing", v = "completed", p = {};
  function g() {
  }
  function C() {
  }
  function h() {
  }
  var E = {};
  u(E, a, function() {
    return this;
  });
  var w = Object.getPrototypeOf, x = w && w(w(M([])));
  x && x !== n && r.call(x, a) && (E = x);
  var k = h.prototype = g.prototype = Object.create(E);
  function N(S) {
    ["next", "throw", "return"].forEach(function(O) {
      u(S, O, function(A) {
        return this._invoke(O, A);
      });
    });
  }
  function F(S, O) {
    function A(T, B, Z, q) {
      var Y = d(S[T], S, B);
      if (Y.type !== "throw") {
        var G = Y.arg, ce = G.value;
        return ce && Ue(ce) == "object" && r.call(ce, "__await") ? O.resolve(ce.__await).then(function(he) {
          A("next", he, Z, q);
        }, function(he) {
          A("throw", he, Z, q);
        }) : O.resolve(ce).then(function(he) {
          G.value = he, Z(G);
        }, function(he) {
          return A("throw", he, Z, q);
        });
      }
      q(Y.arg);
    }
    var P;
    i(this, "_invoke", {
      value: function(B, Z) {
        function q() {
          return new O(function(Y, G) {
            A(B, Z, Y, G);
          });
        }
        return P = P ? P.then(q, q) : q();
      }
    });
  }
  function _(S, O, A) {
    var P = m;
    return function(T, B) {
      if (P === y)
        throw new Error("Generator is already running");
      if (P === v) {
        if (T === "throw")
          throw B;
        return {
          value: t,
          done: !0
        };
      }
      for (A.method = T, A.arg = B; ; ) {
        var Z = A.delegate;
        if (Z) {
          var q = D(Z, A);
          if (q) {
            if (q === p)
              continue;
            return q;
          }
        }
        if (A.method === "next")
          A.sent = A._sent = A.arg;
        else if (A.method === "throw") {
          if (P === m)
            throw P = v, A.arg;
          A.dispatchException(A.arg);
        } else
          A.method === "return" && A.abrupt("return", A.arg);
        P = y;
        var Y = d(S, O, A);
        if (Y.type === "normal") {
          if (P = A.done ? v : b, Y.arg === p)
            continue;
          return {
            value: Y.arg,
            done: A.done
          };
        }
        Y.type === "throw" && (P = v, A.method = "throw", A.arg = Y.arg);
      }
    };
  }
  function D(S, O) {
    var A = O.method, P = S.iterator[A];
    if (P === t)
      return O.delegate = null, A === "throw" && S.iterator.return && (O.method = "return", O.arg = t, D(S, O), O.method === "throw") || A !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + A + "' method")), p;
    var T = d(P, S.iterator, O.arg);
    if (T.type === "throw")
      return O.method = "throw", O.arg = T.arg, O.delegate = null, p;
    var B = T.arg;
    return B ? B.done ? (O[S.resultName] = B.value, O.next = S.nextLoc, O.method !== "return" && (O.method = "next", O.arg = t), O.delegate = null, p) : B : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, p);
  }
  function I(S) {
    var O = {
      tryLoc: S[0]
    };
    1 in S && (O.catchLoc = S[1]), 2 in S && (O.finallyLoc = S[2], O.afterLoc = S[3]), this.tryEntries.push(O);
  }
  function R(S) {
    var O = S.completion || {};
    O.type = "normal", delete O.arg, S.completion = O;
  }
  function $(S) {
    this.tryEntries = [{
      tryLoc: "root"
    }], S.forEach(I, this), this.reset(!0);
  }
  function M(S) {
    if (S || S === "") {
      var O = S[a];
      if (O)
        return O.call(S);
      if (typeof S.next == "function")
        return S;
      if (!isNaN(S.length)) {
        var A = -1, P = function T() {
          for (; ++A < S.length; )
            if (r.call(S, A))
              return T.value = S[A], T.done = !1, T;
          return T.value = t, T.done = !0, T;
        };
        return P.next = P;
      }
    }
    throw new TypeError(Ue(S) + " is not iterable");
  }
  return C.prototype = h, i(k, "constructor", {
    value: h,
    configurable: !0
  }), i(h, "constructor", {
    value: C,
    configurable: !0
  }), C.displayName = u(h, c, "GeneratorFunction"), e.isGeneratorFunction = function(S) {
    var O = typeof S == "function" && S.constructor;
    return !!O && (O === C || (O.displayName || O.name) === "GeneratorFunction");
  }, e.mark = function(S) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(S, h) : (S.__proto__ = h, u(S, c, "GeneratorFunction")), S.prototype = Object.create(k), S;
  }, e.awrap = function(S) {
    return {
      __await: S
    };
  }, N(F.prototype), u(F.prototype, l, function() {
    return this;
  }), e.AsyncIterator = F, e.async = function(S, O, A, P, T) {
    T === void 0 && (T = Promise);
    var B = new F(f(S, O, A, P), T);
    return e.isGeneratorFunction(O) ? B : B.next().then(function(Z) {
      return Z.done ? Z.value : B.next();
    });
  }, N(k), u(k, c, "Generator"), u(k, a, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(S) {
    var O = Object(S), A = [];
    for (var P in O)
      A.push(P);
    return A.reverse(), function T() {
      for (; A.length; ) {
        var B = A.pop();
        if (B in O)
          return T.value = B, T.done = !1, T;
      }
      return T.done = !0, T;
    };
  }, e.values = M, $.prototype = {
    constructor: $,
    reset: function(O) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(R), !O)
        for (var A in this)
          A.charAt(0) === "t" && r.call(this, A) && !isNaN(+A.slice(1)) && (this[A] = t);
    },
    stop: function() {
      this.done = !0;
      var O = this.tryEntries[0].completion;
      if (O.type === "throw")
        throw O.arg;
      return this.rval;
    },
    dispatchException: function(O) {
      if (this.done)
        throw O;
      var A = this;
      function P(G, ce) {
        return Z.type = "throw", Z.arg = O, A.next = G, ce && (A.method = "next", A.arg = t), !!ce;
      }
      for (var T = this.tryEntries.length - 1; T >= 0; --T) {
        var B = this.tryEntries[T], Z = B.completion;
        if (B.tryLoc === "root")
          return P("end");
        if (B.tryLoc <= this.prev) {
          var q = r.call(B, "catchLoc"), Y = r.call(B, "finallyLoc");
          if (q && Y) {
            if (this.prev < B.catchLoc)
              return P(B.catchLoc, !0);
            if (this.prev < B.finallyLoc)
              return P(B.finallyLoc);
          } else if (q) {
            if (this.prev < B.catchLoc)
              return P(B.catchLoc, !0);
          } else {
            if (!Y)
              throw new Error("try statement without catch or finally");
            if (this.prev < B.finallyLoc)
              return P(B.finallyLoc);
          }
        }
      }
    },
    abrupt: function(O, A) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var T = this.tryEntries[P];
        if (T.tryLoc <= this.prev && r.call(T, "finallyLoc") && this.prev < T.finallyLoc) {
          var B = T;
          break;
        }
      }
      B && (O === "break" || O === "continue") && B.tryLoc <= A && A <= B.finallyLoc && (B = null);
      var Z = B ? B.completion : {};
      return Z.type = O, Z.arg = A, B ? (this.method = "next", this.next = B.finallyLoc, p) : this.complete(Z);
    },
    complete: function(O, A) {
      if (O.type === "throw")
        throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && A && (this.next = A), p;
    },
    finish: function(O) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var P = this.tryEntries[A];
        if (P.finallyLoc === O)
          return this.complete(P.completion, P.afterLoc), R(P), p;
      }
    },
    catch: function(O) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var P = this.tryEntries[A];
        if (P.tryLoc === O) {
          var T = P.completion;
          if (T.type === "throw") {
            var B = T.arg;
            R(P);
          }
          return B;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(O, A, P) {
      return this.delegate = {
        iterator: M(O),
        resultName: A,
        nextLoc: P
      }, this.method === "next" && (this.arg = t), p;
    }
  }, e;
}
function Ic(t, e, n, r, i, o, a) {
  try {
    var l = t[o](a), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function Xo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var o = t.apply(e, n);
      function a(c) {
        Ic(o, r, i, a, l, "next", c);
      }
      function l(c) {
        Ic(o, r, i, a, l, "throw", c);
      }
      a(void 0);
    });
  };
}
function $n() {
  return $n = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, $n.apply(this, arguments);
}
function ap(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, ii(t, e);
}
function Ja(t) {
  return Ja = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ja(t);
}
function ii(t, e) {
  return ii = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, ii(t, e);
}
function sp() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Gi(t, e, n) {
  return sp() ? Gi = Reflect.construct.bind() : Gi = function(i, o, a) {
    var l = [null];
    l.push.apply(l, o);
    var c = Function.bind.apply(i, l), u = new c();
    return a && ii(u, a.prototype), u;
  }, Gi.apply(null, arguments);
}
function lp(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function es(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return es = function(r) {
    if (r === null || !lp(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Gi(r, arguments, Ja(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ii(i, r);
  }, es(t);
}
var cp = /%[sdj%]/g, up = function() {
};
typeof process < "u" && process.env;
function ts(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function Ge(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var i = 0, o = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var a = t.replace(cp, function(l) {
      if (l === "%%")
        return "%";
      if (i >= o)
        return l;
      switch (l) {
        case "%s":
          return String(n[i++]);
        case "%d":
          return Number(n[i++]);
        case "%j":
          try {
            return JSON.stringify(n[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return l;
      }
    });
    return a;
  }
  return t;
}
function fp(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Ne(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || fp(e) && typeof t == "string" && !t);
}
function dp(t, e, n) {
  var r = [], i = 0, o = t.length;
  function a(l) {
    r.push.apply(r, l || []), i++, i === o && n(r);
  }
  t.forEach(function(l) {
    e(l, a);
  });
}
function Lc(t, e, n) {
  var r = 0, i = t.length;
  function o(a) {
    if (a && a.length) {
      n(a);
      return;
    }
    var l = r;
    r = r + 1, l < i ? e(t[l], o) : n([]);
  }
  o([]);
}
function mp(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Dc = /* @__PURE__ */ function(t) {
  ap(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ es(Error));
function hp(t, e, n, r, i) {
  if (e.first) {
    var o = new Promise(function(m, b) {
      var y = function(g) {
        return r(g), g.length ? b(new Dc(g, ts(g))) : m(i);
      }, v = mp(t);
      Lc(v, n, y);
    });
    return o.catch(function(m) {
      return m;
    }), o;
  }
  var a = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, b) {
    var y = function(p) {
      if (f.push.apply(f, p), u++, u === c)
        return r(f), f.length ? b(new Dc(f, ts(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(v) {
      var p = t[v];
      a.indexOf(v) !== -1 ? Lc(p, n, y) : dp(p, n, y);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function vp(t) {
  return !!(t && t.message !== void 0);
}
function pp(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Vc(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = pp(e, t.fullFields) : r = e[n.field || t.fullField], vp(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function jc(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = $n({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var yd = function(e, n, r, i, o, a) {
  e.required && (!r.hasOwnProperty(e.field) || Ne(n, a || e.type)) && i.push(Ge(o.messages.required, e.fullField));
}, gp = function(e, n, r, i, o) {
  (/^\s+$/.test(n) || n === "") && i.push(Ge(o.messages.whitespace, e.fullField));
}, Di, yp = function() {
  if (Di)
    return Di;
  var t = "[a-fA-F\\d:]", e = function(E) {
    return E && E.includeBoundaries ? "(?:(?<=\\s|^)(?=" + t + ")|(?<=" + t + ")(?=\\s|$))" : "";
  }, n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + n + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + n + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + n + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + n + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + n + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + n + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + n + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), o = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), a = new RegExp("^" + n + "$"), l = new RegExp("^" + i + "$"), c = function(E) {
    return E && E.exact ? o : new RegExp("(?:" + e(E) + n + e(E) + ")|(?:" + e(E) + i + e(E) + ")", "g");
  };
  c.v4 = function(h) {
    return h && h.exact ? a : new RegExp("" + e(h) + n + e(h), "g");
  }, c.v6 = function(h) {
    return h && h.exact ? l : new RegExp("" + e(h) + i + e(h), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", y = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", v = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", p = "(?::\\d{2,5})?", g = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + y + v + ")" + p + g;
  return Di = new RegExp("(?:^" + C + "$)", "i"), Di;
}, Bc = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Vr = {
  integer: function(e) {
    return Vr.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return Vr.number(e) && !Vr.integer(e);
  },
  array: function(e) {
    return Array.isArray(e);
  },
  regexp: function(e) {
    if (e instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(e);
    } catch {
      return !1;
    }
  },
  date: function(e) {
    return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
  },
  number: function(e) {
    return isNaN(e) ? !1 : typeof e == "number";
  },
  object: function(e) {
    return typeof e == "object" && !Vr.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Bc.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(yp());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Bc.hex);
  }
}, bp = function(e, n, r, i, o) {
  if (e.required && n === void 0) {
    yd(e, n, r, i, o);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  a.indexOf(l) > -1 ? Vr[l](n) || i.push(Ge(o.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(Ge(o.messages.types[l], e.fullField, e.type));
}, Ep = function(e, n, r, i, o) {
  var a = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", y = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : y && (d = "array"), !d)
    return !1;
  y && (f = n.length), b && (f = n.replace(u, "_").length), a ? f !== e.len && i.push(Ge(o.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(Ge(o.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(Ge(o.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(Ge(o.messages[d].range, e.fullField, e.min, e.max));
}, Bn = "enum", wp = function(e, n, r, i, o) {
  e[Bn] = Array.isArray(e[Bn]) ? e[Bn] : [], e[Bn].indexOf(n) === -1 && i.push(Ge(o.messages[Bn], e.fullField, e[Bn].join(", ")));
}, Cp = function(e, n, r, i, o) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(Ge(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var a = new RegExp(e.pattern);
      a.test(n) || i.push(Ge(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, ne = {
  required: yd,
  whitespace: gp,
  type: bp,
  range: Ep,
  enum: wp,
  pattern: Cp
}, xp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, a, o, "string"), Ne(n, "string") || (ne.type(e, n, i, a, o), ne.range(e, n, i, a, o), ne.pattern(e, n, i, a, o), e.whitespace === !0 && ne.whitespace(e, n, i, a, o));
  }
  r(a);
}, kp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && ne.type(e, n, i, a, o);
  }
  r(a);
}, $p = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && (ne.type(e, n, i, a, o), ne.range(e, n, i, a, o));
  }
  r(a);
}, _p = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && ne.type(e, n, i, a, o);
  }
  r(a);
}, Op = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), Ne(n) || ne.type(e, n, i, a, o);
  }
  r(a);
}, Sp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && (ne.type(e, n, i, a, o), ne.range(e, n, i, a, o));
  }
  r(a);
}, Fp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && (ne.type(e, n, i, a, o), ne.range(e, n, i, a, o));
  }
  r(a);
}, Np = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    ne.required(e, n, i, a, o, "array"), n != null && (ne.type(e, n, i, a, o), ne.range(e, n, i, a, o));
  }
  r(a);
}, Pp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && ne.type(e, n, i, a, o);
  }
  r(a);
}, Rp = "enum", Mp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o), n !== void 0 && ne[Rp](e, n, i, a, o);
  }
  r(a);
}, Ap = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, a, o), Ne(n, "string") || ne.pattern(e, n, i, a, o);
  }
  r(a);
}, Tp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "date") && !e.required)
      return r();
    if (ne.required(e, n, i, a, o), !Ne(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), ne.type(e, c, i, a, o), c && ne.range(e, c.getTime(), i, a, o);
    }
  }
  r(a);
}, Ip = function(e, n, r, i, o) {
  var a = [], l = Array.isArray(n) ? "array" : typeof n;
  ne.required(e, n, i, a, o, l), r(a);
}, ha = function(e, n, r, i, o) {
  var a = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Ne(n, a) && !e.required)
      return r();
    ne.required(e, n, i, l, o, a), Ne(n, a) || ne.type(e, n, i, l, o);
  }
  r(l);
}, Lp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, a, o);
  }
  r(a);
}, zr = {
  string: xp,
  method: kp,
  number: $p,
  boolean: _p,
  regexp: Op,
  integer: Sp,
  float: Fp,
  array: Np,
  object: Pp,
  enum: Mp,
  pattern: Ap,
  date: Tp,
  url: ha,
  hex: ha,
  email: ha,
  required: Ip,
  any: Lp
};
function ns() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var e = JSON.parse(JSON.stringify(this));
      return e.clone = this.clone, e;
    }
  };
}
var rs = ns(), Ci = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = rs, this.define(n);
  }
  var e = t.prototype;
  return e.define = function(r) {
    var i = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(o) {
      var a = r[o];
      i.rules[o] = Array.isArray(a) ? a : [a];
    });
  }, e.messages = function(r) {
    return r && (this._messages = jc(ns(), r)), this._messages;
  }, e.validate = function(r, i, o) {
    var a = this;
    i === void 0 && (i = {}), o === void 0 && (o = function() {
    });
    var l = r, c = i, u = o;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, l), Promise.resolve(l);
    function f(v) {
      var p = [], g = {};
      function C(E) {
        if (Array.isArray(E)) {
          var w;
          p = (w = p).concat.apply(w, E);
        } else
          p.push(E);
      }
      for (var h = 0; h < v.length; h++)
        C(v[h]);
      p.length ? (g = ts(p), u(p, g)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === rs && (d = ns()), jc(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(v) {
      var p = a.rules[v], g = l[v];
      p.forEach(function(C) {
        var h = C;
        typeof h.transform == "function" && (l === r && (l = $n({}, l)), g = l[v] = h.transform(g)), typeof h == "function" ? h = {
          validator: h
        } : h = $n({}, h), h.validator = a.getValidationMethod(h), h.validator && (h.field = v, h.fullField = h.fullField || v, h.type = a.getType(h), m[v] = m[v] || [], m[v].push({
          rule: h,
          value: g,
          source: l,
          field: v
        }));
      });
    });
    var y = {};
    return hp(m, c, function(v, p) {
      var g = v.rule, C = (g.type === "object" || g.type === "array") && (typeof g.fields == "object" || typeof g.defaultField == "object");
      C = C && (g.required || !g.required && v.value), g.field = v.field;
      function h(x, k) {
        return $n({}, k, {
          fullField: g.fullField + "." + x,
          fullFields: g.fullFields ? [].concat(g.fullFields, [x]) : [x]
        });
      }
      function E(x) {
        x === void 0 && (x = []);
        var k = Array.isArray(x) ? x : [x];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && g.message !== void 0 && (k = [].concat(g.message));
        var N = k.map(Vc(g, l));
        if (c.first && N.length)
          return y[g.field] = 1, p(N);
        if (!C)
          p(N);
        else {
          if (g.required && !v.value)
            return g.message !== void 0 ? N = [].concat(g.message).map(Vc(g, l)) : c.error && (N = [c.error(g, Ge(c.messages.required, g.field))]), p(N);
          var F = {};
          g.defaultField && Object.keys(v.value).map(function(I) {
            F[I] = g.defaultField;
          }), F = $n({}, F, v.rule.fields);
          var _ = {};
          Object.keys(F).forEach(function(I) {
            var R = F[I], $ = Array.isArray(R) ? R : [R];
            _[I] = $.map(h.bind(null, I));
          });
          var D = new t(_);
          D.messages(c.messages), v.rule.options && (v.rule.options.messages = c.messages, v.rule.options.error = c.error), D.validate(v.value, v.rule.options || c, function(I) {
            var R = [];
            N && N.length && R.push.apply(R, N), I && I.length && R.push.apply(R, I), p(R.length ? R : null);
          });
        }
      }
      var w;
      if (g.asyncValidator)
        w = g.asyncValidator(g, v.value, E, v.source, c);
      else if (g.validator) {
        try {
          w = g.validator(g, v.value, E, v.source, c);
        } catch (x) {
          console.error == null || console.error(x), c.suppressValidatorError || setTimeout(function() {
            throw x;
          }, 0), E(x.message);
        }
        w === !0 ? E() : w === !1 ? E(typeof g.message == "function" ? g.message(g.fullField || g.field) : g.message || (g.fullField || g.field) + " fails") : w instanceof Array ? E(w) : w instanceof Error && E(w.message);
      }
      w && w.then && w.then(function() {
        return E();
      }, function(x) {
        return E(x);
      });
    }, function(v) {
      f(v);
    }, l);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !zr.hasOwnProperty(r.type))
      throw new Error(Ge("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), o = i.indexOf("message");
    return o !== -1 && i.splice(o, 1), i.length === 1 && i[0] === "required" ? zr.required : zr[this.getType(r)] || void 0;
  }, t;
}();
Ci.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  zr[e] = n;
};
Ci.warning = up;
Ci.messages = rs;
Ci.validators = zr;
var Ke = "'${name}' is not a valid ${type}", bd = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: Ke,
    method: Ke,
    array: Ke,
    object: Ke,
    number: Ke,
    date: Ke,
    boolean: Ke,
    integer: Ke,
    float: Ke,
    regexp: Ke,
    email: Ke,
    url: Ke,
    hex: Ke
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};
function Ed(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function wd(t) {
  if (Array.isArray(t))
    return t;
}
function Cd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Dp(t) {
  return wd(t) || vd(t) || nl(t) || Cd();
}
function xd(t, e, n, r) {
  if (!e.length)
    return n;
  var i = Dp(e), o = i[0], a = i.slice(1), l;
  return !t && typeof o == "number" ? l = [] : Array.isArray(t) ? l = se(t) : l = ae({}, t), r && n === void 0 && a.length === 1 ? delete l[o][a[0]] : l[o] = xd(l[o], a, n, r), l;
}
function Vp(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !Ed(t, e.slice(0, -1)) ? t : xd(t, e, n, r);
}
function Qo(t) {
  return Array.isArray(t) ? Bp(t) : Ue(t) === "object" && t !== null ? jp(t) : t;
}
function jp(t) {
  if (Object.getPrototypeOf(t) === Object.prototype) {
    var e = {};
    for (var n in t)
      e[n] = Qo(t[n]);
    return e;
  }
  return t;
}
function Bp(t) {
  return t.map(function(e) {
    return Qo(e);
  });
}
function ke(t) {
  return Qa(t);
}
function Qt(t, e) {
  var n = Ed(t, e);
  return n;
}
function Yt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = Vp(t, e, n, r);
  return i;
}
function Wc(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = Qt(t, r);
    n = Yt(n, r, i);
  }), n;
}
function Ur(t, e) {
  return t && t.some(function(n) {
    return $d(n, e);
  });
}
function Zc(t) {
  return Ue(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function kd(t, e) {
  var n = Array.isArray(t) ? se(t) : ae({}, t);
  return e && Object.keys(e).forEach(function(r) {
    var i = n[r], o = e[r], a = Zc(i) && Zc(o);
    n[r] = a ? kd(i, o || {}) : Qo(o);
  }), n;
}
function Xi(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, o) {
    return kd(i, o);
  }, t);
}
function $d(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function Wp(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || Ue(t) !== "object" || Ue(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return se(i).every(function(o) {
    var a = t[o], l = e[o];
    return typeof a == "function" && typeof l == "function" ? !0 : a === l;
  });
}
function Zp(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && Ue(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function Hc(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], o = e - n;
  return o > 0 ? [].concat(se(t.slice(0, n)), [i], se(t.slice(n, e)), se(t.slice(e + 1, r))) : o < 0 ? [].concat(se(t.slice(0, e)), se(t.slice(e + 1, n + 1)), [i], se(t.slice(n + 1, r))) : t;
}
var Hp = Ci;
function zp(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var zc = "CODE_LOGIC_ERROR";
function is(t, e, n, r, i) {
  return os.apply(this, arguments);
}
function os() {
  return os = Xo(/* @__PURE__ */ Lt().mark(function t(e, n, r, i, o) {
    var a, l, c, u, f, d, m, b, y;
    return Lt().wrap(function(p) {
      for (; ; )
        switch (p.prev = p.next) {
          case 0:
            return a = ae({}, r), delete a.ruleIndex, a.validator && (l = a.validator, a.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (g) {
                return console.error(g), Promise.reject(zc);
              }
            }), c = null, a && a.type === "array" && a.defaultField && (c = a.defaultField, delete a.defaultField), u = new Hp(Ve({}, e, [a])), f = Xi({}, bd, i.validateMessages), u.messages(f), d = [], p.prev = 9, p.next = 12, Promise.resolve(u.validate(Ve({}, e, n), ae({}, i)));
          case 12:
            p.next = 17;
            break;
          case 14:
            p.prev = 14, p.t0 = p.catch(9), p.t0.errors && (d = p.t0.errors.map(function(g, C) {
              var h = g.message, E = h === zc ? f.default : h;
              return /* @__PURE__ */ L.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                L.cloneElement(E, {
                  key: "error_".concat(C)
                })
              ) : E;
            }));
          case 17:
            if (!(!d.length && c)) {
              p.next = 22;
              break;
            }
            return p.next = 20, Promise.all(n.map(function(g, C) {
              return is("".concat(e, ".").concat(C), g, c, i, o);
            }));
          case 20:
            return m = p.sent, p.abrupt("return", m.reduce(function(g, C) {
              return [].concat(se(g), se(C));
            }, []));
          case 22:
            return b = ae(ae({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, o), y = d.map(function(g) {
              return typeof g == "string" ? zp(g, b) : g;
            }), p.abrupt("return", y);
          case 25:
          case "end":
            return p.stop();
        }
    }, t, null, [[9, 14]]);
  })), os.apply(this, arguments);
}
function Up(t, e, n, r, i, o) {
  var a = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, b = ae(ae({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(y, v, p) {
      var g = !1, C = function() {
        for (var w = arguments.length, x = new Array(w), k = 0; k < w; k++)
          x[k] = arguments[k];
        Promise.resolve().then(function() {
          mt(!g, "Your validator function has already return a promise. `callback` will be ignored."), g || p.apply(void 0, x);
        });
      }, h = m(y, v, C);
      g = h && typeof h.then == "function" && typeof h.catch == "function", mt(g, "`callback` is deprecated. Please return a promise instead."), g && h.then(function() {
        p();
      }).catch(function(E) {
        p(E || " ");
      });
    }), b;
  }).sort(function(f, d) {
    var m = f.warningOnly, b = f.ruleIndex, y = d.warningOnly, v = d.ruleIndex;
    return !!m == !!y ? b - v : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = Xo(/* @__PURE__ */ Lt().mark(function d(m, b) {
        var y, v, p;
        return Lt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                y = 0;
              case 1:
                if (!(y < l.length)) {
                  C.next = 12;
                  break;
                }
                return v = l[y], C.next = 5, is(a, e, v, r, o);
              case 5:
                if (p = C.sent, !p.length) {
                  C.next = 9;
                  break;
                }
                return b([{
                  errors: p,
                  rule: v
                }]), C.abrupt("return");
              case 9:
                y += 1, C.next = 1;
                break;
              case 12:
                m([]);
              case 13:
              case "end":
                return C.stop();
            }
        }, d);
      }));
      return function(d, m) {
        return f.apply(this, arguments);
      };
    }());
  else {
    var u = l.map(function(f) {
      return is(a, e, f, r, o).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? Kp(u) : qp(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function qp(t) {
  return as.apply(this, arguments);
}
function as() {
  return as = Xo(/* @__PURE__ */ Lt().mark(function t(e) {
    return Lt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var o, a = (o = []).concat.apply(o, se(i));
              return a;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), as.apply(this, arguments);
}
function Kp(t) {
  return ss.apply(this, arguments);
}
function ss() {
  return ss = Xo(/* @__PURE__ */ Lt().mark(function t(e) {
    var n;
    return Lt().wrap(function(i) {
      for (; ; )
        switch (i.prev = i.next) {
          case 0:
            return n = 0, i.abrupt("return", new Promise(function(o) {
              e.forEach(function(a) {
                a.then(function(l) {
                  l.errors.length && o([l]), n += 1, n === e.length && o([]);
                });
              });
            }));
          case 2:
          case "end":
            return i.stop();
        }
    }, t);
  })), ss.apply(this, arguments);
}
var Yp = ["name"], Je = [];
function Uc(t, e, n, r, i, o) {
  return typeof t == "function" ? t(e, n, "source" in o ? {
    source: o.source
  } : {}) : r !== i;
}
var rl = /* @__PURE__ */ function(t) {
  Xv(n, t);
  var e = ep(n);
  function n(r) {
    var i;
    if (Ei(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = Je, i.warnings = Je, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, ke(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(se(m), se(u)) : [];
    }, i.getRules = function() {
      var c = i.props, u = c.rules, f = u === void 0 ? [] : u, d = c.fieldContext;
      return f.map(function(m) {
        return typeof m == "function" ? m(d) : m;
      });
    }, i.refresh = function() {
      i.mounted && i.setState(function(c) {
        var u = c.resetCount;
        return {
          resetCount: u + 1
        };
      });
    }, i.triggerMetaEvent = function(c) {
      var u = i.props.onMetaChange;
      u == null || u(ae(ae({}, i.getMeta()), {}, {
        destroy: c
      }));
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, y = b === void 0 ? [] : b, v = d.onReset, p = f.store, g = i.getNamePath(), C = i.getValue(c), h = i.getValue(p), E = u && Ur(u, g);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== h && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = Je, i.warnings = Je, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = Je, i.warnings = Je, i.triggerMetaEvent(), v == null || v(), i.refresh();
            return;
          }
          break;
        case "remove": {
          if (m) {
            i.reRender();
            return;
          }
          break;
        }
        case "setField": {
          if (E) {
            var w = f.data;
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || Je), "warnings" in w && (i.warnings = w.warnings || Je), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !g.length && Uc(m, c, p, C, h, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = y.map(ke);
          if (x.some(function(k) {
            return Ur(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!y.length || g.length || m) && Uc(m, c, p, C, h, f)) {
            i.reRender();
            return;
          }
          break;
      }
      m === !0 && i.reRender();
    }, i.validateRules = function(c) {
      var u = i.getNamePath(), f = i.getValue(), d = Promise.resolve().then(function() {
        if (!i.mounted)
          return [];
        var m = i.props, b = m.validateFirst, y = b === void 0 ? !1 : b, v = m.messageVariables, p = c || {}, g = p.triggerName, C = i.getRules();
        g && (C = C.filter(function(E) {
          return E;
        }).filter(function(E) {
          var w = E.validateTrigger;
          if (!w)
            return !0;
          var x = Qa(w);
          return x.includes(g);
        }));
        var h = Up(u, f, C, c, y, v);
        return h.catch(function(E) {
          return E;
        }).then(function() {
          var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Je;
          if (i.validatePromise === d) {
            var w;
            i.validatePromise = null;
            var x = [], k = [];
            (w = E.forEach) === null || w === void 0 || w.call(E, function(N) {
              var F = N.rule.warningOnly, _ = N.errors, D = _ === void 0 ? Je : _;
              F ? k.push.apply(k, se(D)) : x.push.apply(x, se(D));
            }), i.errors = x, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), h;
      });
      return i.validatePromise = d, i.dirty = !0, i.errors = Je, i.warnings = Je, i.triggerMetaEvent(), i.reRender(), d;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(kn), f = u.getInitialValue;
      return f(i.getNamePath()) !== void 0;
    }, i.getErrors = function() {
      return i.errors;
    }, i.getWarnings = function() {
      return i.warnings;
    }, i.isListField = function() {
      return i.props.isListField;
    }, i.isList = function() {
      return i.props.isList;
    }, i.isPreserve = function() {
      return i.props.preserve;
    }, i.getMeta = function() {
      i.prevValidating = i.isFieldValidating();
      var c = {
        touched: i.isFieldTouched(),
        validating: i.prevValidating,
        errors: i.errors,
        warnings: i.warnings,
        name: i.getNamePath()
      };
      return c;
    }, i.getOnlyChild = function(c) {
      if (typeof c == "function") {
        var u = i.getMeta();
        return ae(ae({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = Ga(c);
      return f.length !== 1 || !/* @__PURE__ */ L.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return Qt(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, y = u.valuePropName, v = u.getValueProps, p = u.fieldContext, g = d !== void 0 ? d : p.validateTrigger, C = i.getNamePath(), h = p.getInternalHooks, E = p.getFieldsValue, w = h(kn), x = w.dispatch, k = i.getValue(), N = v || function(I) {
        return Ve({}, y, I);
      }, F = c[f], _ = ae(ae({}, c), N(k));
      _[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, R = arguments.length, $ = new Array(R), M = 0; M < R; M++)
          $[M] = arguments[M];
        m ? I = m.apply(void 0, $) : I = Zp.apply(void 0, [y].concat($)), b && (I = b(I, k, E(!0))), x({
          type: "updateValue",
          namePath: C,
          value: I
        }), F && F.apply(void 0, $);
      };
      var D = Qa(g || []);
      return D.forEach(function(I) {
        var R = _[I];
        _[I] = function() {
          R && R.apply(void 0, arguments);
          var $ = i.props.rules;
          $ && $.length && x({
            type: "validateField",
            namePath: C,
            triggerName: I
          });
        };
      }), _;
    }, r.fieldContext) {
      var o = r.fieldContext.getInternalHooks, a = o(kn), l = a.initEntityValue;
      l(pd(i));
    }
    return i;
  }
  return wi(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, o = i.shouldUpdate, a = i.fieldContext;
      if (this.mounted = !0, a) {
        var l = a.getInternalHooks, c = l(kn), u = c.registerField;
        this.cancelRegisterFunc = u(this);
      }
      o === !0 && this.reRender();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
    }
  }, {
    key: "reRender",
    value: function() {
      this.mounted && this.forceUpdate();
    }
  }, {
    key: "render",
    value: function() {
      var i = this.state.resetCount, o = this.props.children, a = this.getOnlyChild(o), l = a.child, c = a.isFunction, u;
      return c ? u = l : /* @__PURE__ */ L.isValidElement(l) ? u = /* @__PURE__ */ L.cloneElement(l, this.getControlled(l.props)) : (mt(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
rl.contextType = Pn;
rl.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function il(t) {
  var e = t.name, n = tl(t, Yp), r = L.useContext(Pn), i = e !== void 0 ? ke(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(rl, vo({
    key: o,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var Gp = /* @__PURE__ */ L.createContext(null), _d = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, o = e.rules, a = e.validateTrigger, l = L.useContext(Pn), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = L.useMemo(function() {
    var y = ke(l.prefixName) || [];
    return [].concat(se(y), se(ke(n)));
  }, [l.prefixName, n]), d = L.useMemo(function() {
    return ae(ae({}, l), {}, {
      prefixName: f
    });
  }, [l, f]), m = L.useMemo(function() {
    return {
      getKey: function(v) {
        var p = f.length, g = v[p];
        return [u.keys[g], v.slice(p + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return mt(!1, "Form.List only accepts function as children."), null;
  var b = function(v, p, g) {
    var C = g.source;
    return C === "internal" ? !1 : v !== p;
  };
  return /* @__PURE__ */ L.createElement(Gp.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(Pn.Provider, {
    value: d
  }, /* @__PURE__ */ L.createElement(il, {
    name: [],
    shouldUpdate: b,
    rules: o,
    validateTrigger: a,
    initialValue: r,
    isList: !0
  }, function(y, v) {
    var p = y.value, g = p === void 0 ? [] : p, C = y.onChange, h = l.getFieldValue, E = function() {
      var N = h(f || []);
      return N || [];
    }, w = {
      add: function(N, F) {
        var _ = E();
        F >= 0 && F <= _.length ? (u.keys = [].concat(se(u.keys.slice(0, F)), [u.id], se(u.keys.slice(F))), C([].concat(se(_.slice(0, F)), [N], se(_.slice(F))))) : (u.keys = [].concat(se(u.keys), [u.id]), C([].concat(se(_), [N]))), u.id += 1;
      },
      remove: function(N) {
        var F = E(), _ = new Set(Array.isArray(N) ? N : [N]);
        _.size <= 0 || (u.keys = u.keys.filter(function(D, I) {
          return !_.has(I);
        }), C(F.filter(function(D, I) {
          return !_.has(I);
        })));
      },
      move: function(N, F) {
        if (N !== F) {
          var _ = E();
          N < 0 || N >= _.length || F < 0 || F >= _.length || (u.keys = Hc(u.keys, N, F), C(Hc(_, N, F)));
        }
      }
    }, x = g || [];
    return Array.isArray(x) || (x = []), i(x.map(function(k, N) {
      var F = u.keys[N];
      return F === void 0 && (u.keys[N] = u.id, F = u.keys[N], u.id += 1), {
        name: N,
        key: F,
        isListField: !0
      };
    }), w, v);
  })));
};
function Xp(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var r, i, o, a, l = [], c = !0, u = !1;
    try {
      if (o = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n)
          return;
        c = !1;
      } else
        for (; !(c = (r = o.call(n)).done) && (l.push(r.value), l.length !== e); c = !0)
          ;
    } catch (f) {
      u = !0, i = f;
    } finally {
      try {
        if (!c && n.return != null && (a = n.return(), Object(a) !== a))
          return;
      } finally {
        if (u)
          throw i;
      }
    }
    return l;
  }
}
function nn(t, e) {
  return wd(t) || Xp(t, e) || nl(t, e) || Cd();
}
function Qp(t) {
  var e = !1, n = t.length, r = [];
  return t.length ? new Promise(function(i, o) {
    t.forEach(function(a, l) {
      a.catch(function(c) {
        return e = !0, c;
      }).then(function(c) {
        n -= 1, r[l] = c, !(n > 0) && (e && o(r), i(r));
      });
    });
  }) : Promise.resolve([]);
}
var Od = "__@field_split__";
function va(t) {
  return t.map(function(e) {
    return "".concat(Ue(e), ":").concat(e);
  }).join(Od);
}
var Wn = /* @__PURE__ */ function() {
  function t() {
    Ei(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return wi(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(va(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(va(n));
    }
  }, {
    key: "update",
    value: function(n, r) {
      var i = this.get(n), o = r(i);
      o ? this.set(n, o) : this.delete(n);
    }
  }, {
    key: "delete",
    value: function(n) {
      this.kvs.delete(va(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return se(this.kvs.entries()).map(function(r) {
        var i = nn(r, 2), o = i[0], a = i[1], l = o.split(Od);
        return n({
          key: l.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = nn(u, 3), d = f[1], m = f[2];
            return d === "number" ? Number(m) : m;
          }),
          value: a
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var n = {};
      return this.map(function(r) {
        var i = r.key, o = r.value;
        return n[i.join(".")] = o, null;
      }), n;
    }
  }]), t;
}(), Jp = ["name", "errors"], eg = /* @__PURE__ */ wi(function t(e) {
  var n = this;
  Ei(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
    return {
      getFieldValue: n.getFieldValue,
      getFieldsValue: n.getFieldsValue,
      getFieldError: n.getFieldError,
      getFieldWarning: n.getFieldWarning,
      getFieldsError: n.getFieldsError,
      isFieldsTouched: n.isFieldsTouched,
      isFieldTouched: n.isFieldTouched,
      isFieldValidating: n.isFieldValidating,
      isFieldsValidating: n.isFieldsValidating,
      resetFields: n.resetFields,
      setFields: n.setFields,
      setFieldValue: n.setFieldValue,
      setFieldsValue: n.setFieldsValue,
      validateFields: n.validateFields,
      submit: n.submit,
      _init: !0,
      getInternalHooks: n.getInternalHooks
    };
  }, this.getInternalHooks = function(r) {
    return r === kn ? (n.formHooked = !0, {
      dispatch: n.dispatch,
      initEntityValue: n.initEntityValue,
      registerField: n.registerField,
      useSubscribe: n.useSubscribe,
      setInitialValues: n.setInitialValues,
      destroyForm: n.destroyForm,
      setCallbacks: n.setCallbacks,
      setValidateMessages: n.setValidateMessages,
      getFields: n.getFields,
      setPreserve: n.setPreserve,
      getInitialValue: n.getInitialValue,
      registerWatch: n.registerWatch
    }) : (mt(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(r) {
    n.subscribable = r;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(r, i) {
    if (n.initialValues = r || {}, i) {
      var o, a = Xi({}, r, n.store);
      (o = n.prevWithoutPreserves) === null || o === void 0 || o.map(function(l) {
        var c = l.key;
        a = Yt(a, c, Qt(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(a);
    }
  }, this.destroyForm = function() {
    var r = new Wn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = Qt(n.initialValues, r);
    return r.length ? Qo(i) : i;
  }, this.setCallbacks = function(r) {
    n.callbacks = r;
  }, this.setValidateMessages = function(r) {
    n.validateMessages = r;
  }, this.setPreserve = function(r) {
    n.preserve = r;
  }, this.watchList = [], this.registerWatch = function(r) {
    return n.watchList.push(r), function() {
      n.watchList = n.watchList.filter(function(i) {
        return i !== r;
      });
    };
  }, this.notifyWatch = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (n.watchList.length) {
      var i = n.getFieldsValue();
      n.watchList.forEach(function(o) {
        o(i, r);
      });
    }
  }, this.timeoutId = null, this.warningUnhooked = function() {
  }, this.updateStore = function(r) {
    n.store = r;
  }, this.getFieldEntities = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return r ? n.fieldEntities.filter(function(i) {
      return i.getNamePath().length;
    }) : n.fieldEntities;
  }, this.getFieldsMap = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Wn();
    return n.getFieldEntities(r).forEach(function(o) {
      var a = o.getNamePath();
      i.set(a, o);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(o) {
      var a = ke(o);
      return i.get(a) || {
        INVALIDATE_NAME_PATH: ke(o)
      };
    });
  }, this.getFieldsValue = function(r, i) {
    if (n.warningUnhooked(), r === !0 && !i)
      return n.store;
    var o = n.getFieldEntitiesForNamePathList(Array.isArray(r) ? r : null), a = [];
    return o.forEach(function(l) {
      var c, u = "INVALIDATE_NAME_PATH" in l ? l.INVALIDATE_NAME_PATH : l.getNamePath();
      if (!(!r && (!((c = l.isListField) === null || c === void 0) && c.call(l))))
        if (!i)
          a.push(u);
        else {
          var f = "getMeta" in l ? l.getMeta() : null;
          i(f) && a.push(u);
        }
    }), Wc(n.store, a.map(ke));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = ke(r);
    return Qt(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(o, a) {
      return o && !("INVALIDATE_NAME_PATH" in o) ? {
        name: o.getNamePath(),
        errors: o.getErrors(),
        warnings: o.getWarnings()
      } : {
        name: ke(r[a]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = ke(r), o = n.getFieldsError([i])[0];
    return o.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = ke(r), o = n.getFieldsError([i])[0];
    return o.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++)
      i[o] = arguments[o];
    var a = i[0], l = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(a) ? (c = a.map(ke), u = !1) : (c = null, u = a) : (c = a.map(ke), u = l);
    var f = n.getFieldEntities(!0), d = function(p) {
      return p.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Wn();
    c.forEach(function(v) {
      m.set(v, []);
    }), f.forEach(function(v) {
      var p = v.getNamePath();
      c.forEach(function(g) {
        g.every(function(C, h) {
          return p[h] === C;
        }) && m.update(g, function(C) {
          return [].concat(se(C), [v]);
        });
      });
    });
    var b = function(p) {
      return p.some(d);
    }, y = m.map(function(v) {
      var p = v.value;
      return p;
    });
    return u ? y.every(b) : y.some(b);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(a) {
        return a.isFieldValidating();
      });
    var o = r.map(ke);
    return i.some(function(a) {
      var l = a.getNamePath();
      return Ur(o, l) && a.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Wn(), o = n.getFieldEntities(!0);
    o.forEach(function(c) {
      var u = c.props.initialValue, f = c.getNamePath();
      if (u !== void 0) {
        var d = i.get(f) || /* @__PURE__ */ new Set();
        d.add({
          entity: c,
          value: u
        }), i.set(f, d);
      }
    });
    var a = function(u) {
      u.forEach(function(f) {
        var d = f.props.initialValue;
        if (d !== void 0) {
          var m = f.getNamePath(), b = n.getInitialValue(m);
          if (b !== void 0)
            mt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var y = i.get(m);
            if (y && y.size > 1)
              mt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (y) {
              var v = n.getFieldValue(m);
              (!r.skipExist || v === void 0) && n.updateStore(Yt(n.store, m, se(y)[0].value));
            }
          }
        }
      });
    }, l;
    r.entities ? l = r.entities : r.namePathList ? (l = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = l).push.apply(f, se(se(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : l = o, a(l);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(Xi({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var o = r.map(ke);
    o.forEach(function(a) {
      var l = n.getInitialValue(a);
      n.updateStore(Yt(n.store, a, l));
    }), n.resetWithFieldInitialValue({
      namePathList: o
    }), n.notifyObservers(i, o, {
      type: "reset"
    }), n.notifyWatch(o);
  }, this.setFields = function(r) {
    n.warningUnhooked();
    var i = n.store, o = [];
    r.forEach(function(a) {
      var l = a.name;
      a.errors;
      var c = tl(a, Jp), u = ke(l);
      o.push(u), "value" in c && n.updateStore(Yt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: a
      });
    }), n.notifyWatch(o);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(o) {
      var a = o.getNamePath(), l = o.getMeta(), c = ae(ae({}, l), {}, {
        name: a,
        value: n.getFieldValue(a)
      });
      return Object.defineProperty(c, "originRCField", {
        value: !0
      }), c;
    });
    return i;
  }, this.initEntityValue = function(r) {
    var i = r.props.initialValue;
    if (i !== void 0) {
      var o = r.getNamePath(), a = Qt(n.store, o);
      a === void 0 && n.updateStore(Yt(n.store, o, i));
    }
  }, this.isMergedPreserve = function(r) {
    var i = r !== void 0 ? r : n.preserve;
    return i ?? !0;
  }, this.registerField = function(r) {
    n.fieldEntities.push(r);
    var i = r.getNamePath();
    if (n.notifyWatch([i]), r.props.initialValue !== void 0) {
      var o = n.store;
      n.resetWithFieldInitialValue({
        entities: [r],
        skipExist: !0
      }), n.notifyObservers(o, [r.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(a, l) {
      var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (n.fieldEntities = n.fieldEntities.filter(function(d) {
        return d !== r;
      }), !n.isMergedPreserve(l) && (!a || c.length > 1)) {
        var u = a ? void 0 : n.getInitialValue(i);
        if (i.length && n.getFieldValue(i) !== u && n.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !$d(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(Yt(f, i, u, !0)), n.notifyObservers(f, [i], {
            type: "remove"
          }), n.triggerDependenciesUpdate(f, i);
        }
      }
      n.notifyWatch([i]);
    };
  }, this.dispatch = function(r) {
    switch (r.type) {
      case "updateValue": {
        var i = r.namePath, o = r.value;
        n.updateValue(i, o);
        break;
      }
      case "validateField": {
        var a = r.namePath, l = r.triggerName;
        n.validateFields([a], {
          triggerName: l
        });
        break;
      }
    }
  }, this.notifyObservers = function(r, i, o) {
    if (n.subscribable) {
      var a = ae(ae({}, o), {}, {
        store: n.getFieldsValue(!0)
      });
      n.getFieldEntities().forEach(function(l) {
        var c = l.onStoreChange;
        c(r, i, a);
      });
    } else
      n.forceRootUpdate();
  }, this.triggerDependenciesUpdate = function(r, i) {
    var o = n.getDependencyChildrenFields(i);
    return o.length && n.validateFields(o), n.notifyObservers(r, o, {
      type: "dependenciesUpdate",
      relatedFields: [i].concat(se(o))
    }), o;
  }, this.updateValue = function(r, i) {
    var o = ke(r), a = n.store;
    n.updateStore(Yt(n.store, o, i)), n.notifyObservers(a, [o], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([o]);
    var l = n.triggerDependenciesUpdate(a, o), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Wc(n.store, [o]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([o].concat(se(l)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var o = Xi(n.store, r);
      n.updateStore(o);
    }
    n.notifyObservers(i, null, {
      type: "valueUpdate",
      source: "external"
    }), n.notifyWatch();
  }, this.setFieldValue = function(r, i) {
    n.setFields([{
      name: r,
      value: i
    }]);
  }, this.getDependencyChildrenFields = function(r) {
    var i = /* @__PURE__ */ new Set(), o = [], a = new Wn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = ke(f);
        a.update(d, function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return m.add(c), m;
        });
      });
    });
    var l = function c(u) {
      var f = a.get(u) || /* @__PURE__ */ new Set();
      f.forEach(function(d) {
        if (!i.has(d)) {
          i.add(d);
          var m = d.getNamePath();
          d.isFieldDirty() && m.length && (o.push(m), c(m));
        }
      });
    };
    return l(r), o;
  }, this.triggerOnFieldsChange = function(r, i) {
    var o = n.callbacks.onFieldsChange;
    if (o) {
      var a = n.getFields();
      if (i) {
        var l = new Wn();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          l.set(f, d);
        }), a.forEach(function(u) {
          u.errors = l.get(u.name) || u.errors;
        });
      }
      var c = a.filter(function(u) {
        var f = u.name;
        return Ur(r, f);
      });
      o(c, a);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var o = !!r, a = o ? r.map(ke) : [], l = [];
    n.getFieldEntities(!0).forEach(function(f) {
      if (o || a.push(f.getNamePath()), i != null && i.recursive && o) {
        var d = f.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        d.every(function(y, v) {
          return r[v] === y || r[v] === void 0;
        }) && a.push(d);
      }
      if (!(!f.props.rules || !f.props.rules.length)) {
        var m = f.getNamePath();
        if (!o || Ur(a, m)) {
          var b = f.validateRules(ae({
            validateMessages: ae(ae({}, bd), n.validateMessages)
          }, i));
          l.push(b.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(y) {
            var v, p = [], g = [];
            return (v = y.forEach) === null || v === void 0 || v.call(y, function(C) {
              var h = C.rule.warningOnly, E = C.errors;
              h ? g.push.apply(g, se(E)) : p.push.apply(p, se(E));
            }), p.length ? Promise.reject({
              name: m,
              errors: p,
              warnings: g
            }) : {
              name: m,
              errors: p,
              warnings: g
            };
          }));
        }
      }
    });
    var c = Qp(l);
    n.lastValidatePromise = c, c.catch(function(f) {
      return f;
    }).then(function(f) {
      var d = f.map(function(m) {
        var b = m.name;
        return b;
      });
      n.notifyObservers(n.store, d, {
        type: "validateFinish"
      }), n.triggerOnFieldsChange(d, f);
    });
    var u = c.then(function() {
      return n.lastValidatePromise === c ? Promise.resolve(n.getFieldsValue(a)) : Promise.reject([]);
    }).catch(function(f) {
      var d = f.filter(function(m) {
        return m && m.errors.length;
      });
      return Promise.reject({
        values: n.getFieldsValue(a),
        errorFields: d,
        outOfDate: n.lastValidatePromise !== c
      });
    });
    return u.catch(function(f) {
      return f;
    }), u;
  }, this.submit = function() {
    n.warningUnhooked(), n.validateFields().then(function(r) {
      var i = n.callbacks.onFinish;
      if (i)
        try {
          i(r);
        } catch (o) {
          console.error(o);
        }
    }).catch(function(r) {
      var i = n.callbacks.onFinishFailed;
      i && i(r);
    });
  }, this.forceRootUpdate = e;
});
function ol(t) {
  var e = L.useRef(), n = L.useState({}), r = nn(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var o = function() {
        i({});
      }, a = new eg(o);
      e.current = a.getForm();
    }
  return [e.current];
}
var ls = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), tg = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, o = e.children, a = L.useContext(ls), l = L.useRef({});
  return /* @__PURE__ */ L.createElement(ls.Provider, {
    value: ae(ae({}, a), {}, {
      validateMessages: ae(ae({}, a.validateMessages), n),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(u, f) {
        r && r(u, {
          changedFields: f,
          forms: l.current
        }), a.triggerFormChange(u, f);
      },
      triggerFormFinish: function(u, f) {
        i && i(u, {
          values: f,
          forms: l.current
        }), a.triggerFormFinish(u, f);
      },
      registerForm: function(u, f) {
        u && (l.current = ae(ae({}, l.current), {}, Ve({}, u, f))), a.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = ae({}, l.current);
        delete f[u], l.current = f, a.unregisterForm(u);
      }
    })
  }, o);
}, ng = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], rg = function(e, n) {
  var r = e.name, i = e.initialValues, o = e.fields, a = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, y = e.onValuesChange, v = e.onFieldsChange, p = e.onFinish, g = e.onFinishFailed, C = tl(e, ng), h = L.useContext(ls), E = ol(a), w = nn(E, 1), x = w[0], k = x.getInternalHooks(kn), N = k.useSubscribe, F = k.setInitialValues, _ = k.setCallbacks, D = k.setValidateMessages, I = k.setPreserve, R = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return x;
  }), L.useEffect(function() {
    return h.registerForm(r, x), function() {
      h.unregisterForm(r);
    };
  }, [h, x, r]), D(ae(ae({}, h.validateMessages), d)), _({
    onValuesChange: y,
    onFieldsChange: function(Z) {
      if (h.triggerFormChange(r, Z), v) {
        for (var q = arguments.length, Y = new Array(q > 1 ? q - 1 : 0), G = 1; G < q; G++)
          Y[G - 1] = arguments[G];
        v.apply(void 0, [Z].concat(Y));
      }
    },
    onFinish: function(Z) {
      h.triggerFormFinish(r, Z), p && p(Z);
    },
    onFinishFailed: g
  }), I(l);
  var $ = L.useRef(null);
  F(i, !$.current), $.current || ($.current = !0), L.useEffect(
    function() {
      return R;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var M, S = typeof c == "function";
  if (S) {
    var O = x.getFieldsValue(!0);
    M = c(O, x);
  } else
    M = c;
  N(!S);
  var A = L.useRef();
  L.useEffect(function() {
    Wp(A.current || [], o || []) || x.setFields(o || []), A.current = o;
  }, [o, x]);
  var P = L.useMemo(function() {
    return ae(ae({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), T = /* @__PURE__ */ L.createElement(Pn.Provider, {
    value: P
  }, M);
  return f === !1 ? T : /* @__PURE__ */ L.createElement(f, vo({}, C, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), x.submit();
    },
    onReset: function(Z) {
      var q;
      Z.preventDefault(), x.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, Z);
    }
  }), T);
};
function qc(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function al() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, o = e[1], a = K(), l = nn(a, 2), c = l[0], u = l[1], f = ie(function() {
    return qc(c);
  }, [c]), d = V(f);
  d.current = f;
  var m = it(Pn), b = o || m, y = b && b._init, v = ke(i), p = V(v);
  return p.current = v, X(
    function() {
      if (y) {
        var g = b.getFieldsValue, C = b.getInternalHooks, h = C(kn), E = h.registerWatch, w = E(function(k) {
          var N = Qt(k, p.current), F = qc(N);
          d.current !== F && (d.current = F, u(N));
        }), x = Qt(g(), p.current);
        return u(x), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [y]
  ), c;
}
var ig = /* @__PURE__ */ L.forwardRef(rg), Er = ig;
Er.FormProvider = tg;
Er.Field = il;
Er.List = _d;
Er.useForm = ol;
Er.useWatch = al;
const Sd = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, sl = s.createContext(Sd), Kc = s.createContext(null), Fd = () => null;
var og = function(e) {
  return ag(e) && !sg(e);
};
function ag(t) {
  return !!t && typeof t == "object";
}
function sg(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || ug(t);
}
var lg = typeof Symbol == "function" && Symbol.for, cg = lg ? Symbol.for("react.element") : 60103;
function ug(t) {
  return t.$$typeof === cg;
}
function fg(t) {
  return Array.isArray(t) ? [] : {};
}
function oi(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? or(fg(t), t, e) : t;
}
function dg(t, e, n) {
  return t.concat(e).map(function(r) {
    return oi(r, n);
  });
}
function mg(t, e) {
  if (!e.customMerge)
    return or;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : or;
}
function hg(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Yc(t) {
  return Object.keys(t).concat(hg(t));
}
function Nd(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function vg(t, e) {
  return Nd(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function pg(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && Yc(t).forEach(function(i) {
    r[i] = oi(t[i], n);
  }), Yc(e).forEach(function(i) {
    vg(t, i) || (Nd(t, i) && n.isMergeableObject(e[i]) ? r[i] = mg(i, n)(t[i], e[i], n) : r[i] = oi(e[i], n));
  }), r;
}
function or(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || dg, n.isMergeableObject = n.isMergeableObject || og, n.cloneUnlessOtherwiseSpecified = oi;
  var r = Array.isArray(e), i = Array.isArray(t), o = r === i;
  return o ? r ? n.arrayMerge(t, e, n) : pg(t, e, n) : oi(e, n);
}
or.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return or(r, i, n);
  }, {});
};
var gg = or, yg = gg;
const bg = /* @__PURE__ */ $t(yg), Pd = (t) => s.createElement(_d, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((o) => ({
    index: o.name,
    key: o.key
  })), i = t.children(r, n).map((o, a) => {
    var l;
    return s.createElement(wt, {
      key: r[a].key,
      mode: "card",
      header: (l = t.renderHeader) === null || l === void 0 ? void 0 : l.call(t, r[a], n)
    }, o);
  });
  return t.renderAdd && i.push(s.createElement(wt, {
    key: "add",
    mode: "card"
  }, s.createElement(wt.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), s.createElement(s.Fragment, null, i);
}), Gc = "adm-form", Eg = Sd, wg = me((t, e) => {
  const n = U(Eg, t), {
    className: r,
    style: i,
    hasFeedback: o,
    children: a,
    layout: l,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = ur(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: b
  } = ye(), y = ie(() => bg(b.Form.defaultValidateMessages, m.validateMessages || {}), [b.Form.defaultValidateMessages, m.validateMessages]), v = [];
  let p = null, g = [], C = 0;
  function h() {
    g.length !== 0 && (C += 1, v.push(s.createElement(wt, {
      header: p,
      key: C,
      mode: u
    }, g)), g = []);
  }
  return ln(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === Fd) {
        h(), p = E.props.children;
        return;
      }
      if (E.type === Pd) {
        h(), v.push(E);
        return;
      }
    }
    g.push(E);
  }), h(), s.createElement(Er, Object.assign({
    className: j(Gc, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: y
  }), s.createElement(sl.Provider, {
    value: {
      name: m.name,
      hasFeedback: o,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, v), c && s.createElement("div", {
    className: `${Gc}-footer`
  }, c));
});
var ai = {}, Rd = { exports: {} }, Md = { exports: {} };
(function(t) {
  function e(n) {
    "@babel/helpers - typeof";
    return t.exports = e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, t.exports.__esModule = !0, t.exports.default = t.exports, e(n);
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Md);
var Cg = Md.exports;
(function(t) {
  var e = Cg.default;
  function n(i) {
    if (typeof WeakMap != "function")
      return null;
    var o = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
    return (n = function(c) {
      return c ? a : o;
    })(i);
  }
  function r(i, o) {
    if (!o && i && i.__esModule)
      return i;
    if (i === null || e(i) !== "object" && typeof i != "function")
      return {
        default: i
      };
    var a = n(o);
    if (a && a.has(i))
      return a.get(i);
    var l = {}, c = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in i)
      if (u !== "default" && Object.prototype.hasOwnProperty.call(i, u)) {
        var f = c ? Object.getOwnPropertyDescriptor(i, u) : null;
        f && (f.get || f.set) ? Object.defineProperty(l, u, f) : l[u] = i[u];
      }
    return l.default = i, a && a.set(i, l), l;
  }
  t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Rd);
var xg = Rd.exports, Ad = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Ad);
var kg = Ad.exports, lt = {};
Object.defineProperty(lt, "__esModule", {
  value: !0
});
lt.call = ll;
lt.default = void 0;
lt.note = Id;
lt.noteOnce = Dd;
lt.preMessage = void 0;
lt.resetWarned = Ld;
lt.warning = Td;
lt.warningOnce = xi;
var cs = {}, $g = lt.preMessage = function(e) {
};
function Td(t, e) {
}
function Id(t, e) {
}
function Ld() {
  cs = {};
}
function ll(t, e, n) {
  !e && !cs[n] && (t(!1, n), cs[n] = !0);
}
function xi(t, e) {
  ll(Td, t, e);
}
function Dd(t, e) {
  ll(Id, t, e);
}
xi.preMessage = $g;
xi.resetWarned = Ld;
xi.noteOnce = Dd;
lt.default = xi;
var _g = xg.default, Og = kg.default;
Object.defineProperty(ai, "__esModule", {
  value: !0
});
var Vd = ai.default = ai.HOOK_MARK = void 0, Sg = Og(lt), Fg = _g(s), Ng = "RC_FORM_INTERNAL_HOOKS";
ai.HOOK_MARK = Ng;
var de = function() {
  (0, Sg.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Pg = /* @__PURE__ */ Fg.createContext({
  getFieldValue: de,
  getFieldsValue: de,
  getFieldError: de,
  getFieldWarning: de,
  getFieldsError: de,
  isFieldsTouched: de,
  isFieldTouched: de,
  isFieldValidating: de,
  isFieldsValidating: de,
  resetFields: de,
  setFields: de,
  setFieldValue: de,
  setFieldsValue: de,
  validateFields: de,
  submit: de,
  getInternalHooks: function() {
    return de(), {
      dispatch: de,
      initEntityValue: de,
      registerField: de,
      useSubscribe: de,
      setInitialValues: de,
      destroyForm: de,
      setCallbacks: de,
      registerWatch: de,
      getFields: de,
      setValidateMessages: de,
      setPreserve: de,
      getInitialValue: de
    };
  }
}), Rg = Pg;
Vd = ai.default = Rg;
function pa(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function Mg(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function Ag(t) {
  return typeof t == "function" && !Mg(t) && t.defaultProps === void 0;
}
function jd(t) {
  return ho.isFragment(t) ? !1 : ho.isMemo(t) ? jd(t.type) : !Ag(t.type);
}
const Tg = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), Ig = ["top", "right", "bottom", "left"], ar = Math.min, _n = Math.max, go = Math.round, Vi = Math.floor, rn = (t) => ({
  x: t,
  y: t
}), Lg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Dg = {
  start: "end",
  end: "start"
};
function us(t, e, n) {
  return _n(t, ar(e, n));
}
function on(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function an(t) {
  return t.split("-")[0];
}
function ki(t) {
  return t.split("-")[1];
}
function cl(t) {
  return t === "x" ? "y" : "x";
}
function ul(t) {
  return t === "y" ? "height" : "width";
}
function $i(t) {
  return ["top", "bottom"].includes(an(t)) ? "y" : "x";
}
function fl(t) {
  return cl($i(t));
}
function Vg(t, e, n) {
  n === void 0 && (n = !1);
  const r = ki(t), i = fl(t), o = ul(i);
  let a = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (a = yo(a)), [a, yo(a)];
}
function jg(t) {
  const e = yo(t);
  return [fs(t), e, fs(e)];
}
function fs(t) {
  return t.replace(/start|end/g, (e) => Dg[e]);
}
function Bg(t, e, n) {
  const r = ["left", "right"], i = ["right", "left"], o = ["top", "bottom"], a = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? i : r : e ? r : i;
    case "left":
    case "right":
      return e ? o : a;
    default:
      return [];
  }
}
function Wg(t, e, n, r) {
  const i = ki(t);
  let o = Bg(an(t), n === "start", r);
  return i && (o = o.map((a) => a + "-" + i), e && (o = o.concat(o.map(fs)))), o;
}
function yo(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Lg[e]);
}
function Zg(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Bd(t) {
  return typeof t != "number" ? Zg(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function bo(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function Xc(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const o = $i(e), a = fl(e), l = ul(a), c = an(e), u = o === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
  let b;
  switch (c) {
    case "top":
      b = {
        x: f,
        y: r.y - i.height
      };
      break;
    case "bottom":
      b = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      b = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      b = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      b = {
        x: r.x,
        y: r.y
      };
  }
  switch (ki(e)) {
    case "start":
      b[a] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      b[a] += m * (n && u ? -1 : 1);
      break;
  }
  return b;
}
const Hg = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: a
  } = n, l = o.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(e));
  let u = await a.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: f,
    y: d
  } = Xc(u, r, c), m = r, b = {}, y = 0;
  for (let v = 0; v < l.length; v++) {
    const {
      name: p,
      fn: g
    } = l[v], {
      x: C,
      y: h,
      data: E,
      reset: w
    } = await g({
      x: f,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: i,
      middlewareData: b,
      rects: u,
      platform: a,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (f = C ?? f, d = h ?? d, b = {
      ...b,
      [p]: {
        ...b[p],
        ...E
      }
    }, w && y <= 50) {
      y++, typeof w == "object" && (w.placement && (m = w.placement), w.rects && (u = w.rects === !0 ? await a.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : w.rects), {
        x: f,
        y: d
      } = Xc(u, m, c)), v = -1;
      continue;
    }
  }
  return {
    x: f,
    y: d,
    placement: m,
    strategy: i,
    middlewareData: b
  };
};
async function Eo(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: a,
    elements: l,
    strategy: c
  } = t, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: b = 0
  } = on(e, t), y = Bd(b), p = l[m ? d === "floating" ? "reference" : "floating" : d], g = bo(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(p))) == null || n ? p : p.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), C = d === "floating" ? {
    ...a.floating,
    x: r,
    y: i
  } : a.reference, h = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating)), E = await (o.isElement == null ? void 0 : o.isElement(h)) ? await (o.getScale == null ? void 0 : o.getScale(h)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = bo(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: h,
    strategy: c
  }) : C);
  return {
    top: (g.top - w.top + y.top) / E.y,
    bottom: (w.bottom - g.bottom + y.bottom) / E.y,
    left: (g.left - w.left + y.left) / E.x,
    right: (w.right - g.right + y.right) / E.x
  };
}
const zg = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: o,
      platform: a,
      elements: l,
      middlewareData: c
    } = e, {
      element: u,
      padding: f = 0
    } = on(t, e) || {};
    if (u == null)
      return {};
    const d = Bd(f), m = {
      x: n,
      y: r
    }, b = fl(i), y = ul(b), v = await a.getDimensions(u), p = b === "y", g = p ? "top" : "left", C = p ? "bottom" : "right", h = p ? "clientHeight" : "clientWidth", E = o.reference[y] + o.reference[b] - m[b] - o.floating[y], w = m[b] - o.reference[b], x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let k = x ? x[h] : 0;
    (!k || !await (a.isElement == null ? void 0 : a.isElement(x))) && (k = l.floating[h] || o.floating[y]);
    const N = E / 2 - w / 2, F = k / 2 - v[y] / 2 - 1, _ = ar(d[g], F), D = ar(d[C], F), I = _, R = k - v[y] - D, $ = k / 2 - v[y] / 2 + N, M = us(I, $, R), S = !c.arrow && ki(i) != null && $ != M && o.reference[y] / 2 - ($ < I ? _ : D) - v[y] / 2 < 0, O = S ? $ < I ? $ - I : $ - R : 0;
    return {
      [b]: m[b] + O,
      data: {
        [b]: M,
        centerOffset: $ - M - O,
        ...S && {
          alignmentOffset: O
        }
      },
      reset: S
    };
  }
}), Ug = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        middlewareData: o,
        rects: a,
        initialPlacement: l,
        platform: c,
        elements: u
      } = e, {
        mainAxis: f = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: b = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: v = !0,
        ...p
      } = on(t, e);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const g = an(i), C = an(l) === l, h = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (C || !v ? [yo(l)] : jg(l));
      !m && y !== "none" && E.push(...Wg(l, v, y, h));
      const w = [l, ...E], x = await Eo(e, p), k = [];
      let N = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(x[g]), d) {
        const I = Vg(i, a, h);
        k.push(x[I[0]], x[I[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: k
      }], !k.every((I) => I <= 0)) {
        var F, _;
        const I = (((F = o.flip) == null ? void 0 : F.index) || 0) + 1, R = w[I];
        if (R)
          return {
            data: {
              index: I,
              overflows: N
            },
            reset: {
              placement: R
            }
          };
        let $ = (_ = N.filter((M) => M.overflows[0] <= 0).sort((M, S) => M.overflows[1] - S.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!$)
          switch (b) {
            case "bestFit": {
              var D;
              const M = (D = N.map((S) => [S.placement, S.overflows.filter((O) => O > 0).reduce((O, A) => O + A, 0)]).sort((S, O) => S[1] - O[1])[0]) == null ? void 0 : D[0];
              M && ($ = M);
              break;
            }
            case "initialPlacement":
              $ = l;
              break;
          }
        if (i !== $)
          return {
            reset: {
              placement: $
            }
          };
      }
      return {};
    }
  };
};
function Qc(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Jc(t) {
  return Ig.some((e) => t[e] >= 0);
}
const qg = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = on(t, e);
      switch (r) {
        case "referenceHidden": {
          const o = await Eo(e, {
            ...i,
            elementContext: "reference"
          }), a = Qc(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Jc(a)
            }
          };
        }
        case "escaped": {
          const o = await Eo(e, {
            ...i,
            altBoundary: !0
          }), a = Qc(o, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Jc(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Kg(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), a = an(n), l = ki(n), c = $i(n) === "y", u = ["left", "top"].includes(a) ? -1 : 1, f = o && c ? -1 : 1, d = on(e, t);
  let {
    mainAxis: m,
    crossAxis: b,
    alignmentAxis: y
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return l && typeof y == "number" && (b = l === "end" ? y * -1 : y), c ? {
    x: b * f,
    y: m * u
  } : {
    x: m * u,
    y: b * f
  };
}
const Yg = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await Kg(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, Gg = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: o = !0,
        crossAxis: a = !1,
        limiter: l = {
          fn: (p) => {
            let {
              x: g,
              y: C
            } = p;
            return {
              x: g,
              y: C
            };
          }
        },
        ...c
      } = on(t, e), u = {
        x: n,
        y: r
      }, f = await Eo(e, c), d = $i(an(i)), m = cl(d);
      let b = u[m], y = u[d];
      if (o) {
        const p = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", C = b + f[p], h = b - f[g];
        b = us(C, b, h);
      }
      if (a) {
        const p = d === "y" ? "top" : "left", g = d === "y" ? "bottom" : "right", C = y + f[p], h = y - f[g];
        y = us(C, y, h);
      }
      const v = l.fn({
        ...e,
        [m]: b,
        [d]: y
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r
        }
      };
    }
  };
}, Xg = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: r,
        placement: i,
        rects: o,
        middlewareData: a
      } = e, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = on(t, e), f = {
        x: n,
        y: r
      }, d = $i(i), m = cl(d);
      let b = f[m], y = f[d];
      const v = on(l, e), p = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (c) {
        const h = m === "y" ? "height" : "width", E = o.reference[m] - o.floating[h] + p.mainAxis, w = o.reference[m] + o.reference[h] - p.mainAxis;
        b < E ? b = E : b > w && (b = w);
      }
      if (u) {
        var g, C;
        const h = m === "y" ? "width" : "height", E = ["top", "left"].includes(an(i)), w = o.reference[d] - o.floating[h] + (E && ((g = a.offset) == null ? void 0 : g[d]) || 0) + (E ? 0 : p.crossAxis), x = o.reference[d] + o.reference[h] + (E ? 0 : ((C = a.offset) == null ? void 0 : C[d]) || 0) - (E ? p.crossAxis : 0);
        y < w ? y = w : y > x && (y = x);
      }
      return {
        [m]: b,
        [d]: y
      };
    }
  };
};
function sn(t) {
  return Wd(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Xe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function jt(t) {
  var e;
  return (e = (Wd(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Wd(t) {
  return t instanceof Node || t instanceof Xe(t).Node;
}
function Dt(t) {
  return t instanceof Element || t instanceof Xe(t).Element;
}
function kt(t) {
  return t instanceof HTMLElement || t instanceof Xe(t).HTMLElement;
}
function eu(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Xe(t).ShadowRoot;
}
function _i(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = at(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function Qg(t) {
  return ["table", "td", "th"].includes(sn(t));
}
function dl(t) {
  const e = ml(), n = at(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Jg(t) {
  let e = sr(t);
  for (; kt(e) && !Jo(e); ) {
    if (dl(e))
      return e;
    e = sr(e);
  }
  return null;
}
function ml() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Jo(t) {
  return ["html", "body", "#document"].includes(sn(t));
}
function at(t) {
  return Xe(t).getComputedStyle(t);
}
function ea(t) {
  return Dt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function sr(t) {
  if (sn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    eu(t) && t.host || // Fallback.
    jt(t)
  );
  return eu(e) ? e.host : e;
}
function Zd(t) {
  const e = sr(t);
  return Jo(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : kt(e) && _i(e) ? e : Zd(e);
}
function si(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Zd(t), o = i === ((r = t.ownerDocument) == null ? void 0 : r.body), a = Xe(i);
  return o ? e.concat(a, a.visualViewport || [], _i(i) ? i : [], a.frameElement && n ? si(a.frameElement) : []) : e.concat(i, si(i, [], n));
}
function Hd(t) {
  const e = at(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = kt(t), o = i ? t.offsetWidth : n, a = i ? t.offsetHeight : r, l = go(n) !== o || go(r) !== a;
  return l && (n = o, r = a), {
    width: n,
    height: r,
    $: l
  };
}
function hl(t) {
  return Dt(t) ? t : t.contextElement;
}
function Qn(t) {
  const e = hl(t);
  if (!kt(e))
    return rn(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = Hd(e);
  let a = (o ? go(n.width) : n.width) / r, l = (o ? go(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const e5 = /* @__PURE__ */ rn(0);
function zd(t) {
  const e = Xe(t);
  return !ml() || !e.visualViewport ? e5 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function t5(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Xe(t) ? !1 : e;
}
function Rn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), o = hl(t);
  let a = rn(1);
  e && (r ? Dt(r) && (a = Qn(r)) : a = Qn(t));
  const l = t5(o, n, r) ? zd(o) : rn(0);
  let c = (i.left + l.x) / a.x, u = (i.top + l.y) / a.y, f = i.width / a.x, d = i.height / a.y;
  if (o) {
    const m = Xe(o), b = r && Dt(r) ? Xe(r) : r;
    let y = m.frameElement;
    for (; y && r && b !== m; ) {
      const v = Qn(y), p = y.getBoundingClientRect(), g = at(y), C = p.left + (y.clientLeft + parseFloat(g.paddingLeft)) * v.x, h = p.top + (y.clientTop + parseFloat(g.paddingTop)) * v.y;
      c *= v.x, u *= v.y, f *= v.x, d *= v.y, c += C, u += h, y = Xe(y).frameElement;
    }
  }
  return bo({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function n5(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = kt(n), o = jt(n);
  if (n === o)
    return e;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = rn(1);
  const c = rn(0);
  if ((i || !i && r !== "fixed") && ((sn(n) !== "body" || _i(o)) && (a = ea(n)), kt(n))) {
    const u = Rn(n);
    l = Qn(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - a.scrollLeft * l.x + c.x,
    y: e.y * l.y - a.scrollTop * l.y + c.y
  };
}
function r5(t) {
  return Array.from(t.getClientRects());
}
function Ud(t) {
  return Rn(jt(t)).left + ea(t).scrollLeft;
}
function i5(t) {
  const e = jt(t), n = ea(t), r = t.ownerDocument.body, i = _n(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = _n(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Ud(t);
  const l = -n.scrollTop;
  return at(r).direction === "rtl" && (a += _n(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: a,
    y: l
  };
}
function o5(t, e) {
  const n = Xe(t), r = jt(t), i = n.visualViewport;
  let o = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (i) {
    o = i.width, a = i.height;
    const u = ml();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: l,
    y: c
  };
}
function a5(t, e) {
  const n = Rn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, o = kt(t) ? Qn(t) : rn(1), a = t.clientWidth * o.x, l = t.clientHeight * o.y, c = i * o.x, u = r * o.y;
  return {
    width: a,
    height: l,
    x: c,
    y: u
  };
}
function tu(t, e, n) {
  let r;
  if (e === "viewport")
    r = o5(t, n);
  else if (e === "document")
    r = i5(jt(t));
  else if (Dt(e))
    r = a5(e, n);
  else {
    const i = zd(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return bo(r);
}
function qd(t, e) {
  const n = sr(t);
  return n === e || !Dt(n) || Jo(n) ? !1 : at(n).position === "fixed" || qd(n, e);
}
function s5(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = si(t, [], !1).filter((l) => Dt(l) && sn(l) !== "body"), i = null;
  const o = at(t).position === "fixed";
  let a = o ? sr(t) : t;
  for (; Dt(a) && !Jo(a); ) {
    const l = at(a), c = dl(a);
    !c && l.position === "fixed" && (i = null), (o ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || _i(a) && !c && qd(t, a)) ? r = r.filter((f) => f !== a) : i = l, a = sr(a);
  }
  return e.set(t, r), r;
}
function l5(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? s5(e, this._c) : [].concat(n), r], l = a[0], c = a.reduce((u, f) => {
    const d = tu(e, f, i);
    return u.top = _n(d.top, u.top), u.right = ar(d.right, u.right), u.bottom = ar(d.bottom, u.bottom), u.left = _n(d.left, u.left), u;
  }, tu(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function c5(t) {
  return Hd(t);
}
function u5(t, e, n) {
  const r = kt(e), i = jt(e), o = n === "fixed", a = Rn(t, !0, o, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = rn(0);
  if (r || !r && !o)
    if ((sn(e) !== "body" || _i(i)) && (l = ea(e)), r) {
      const u = Rn(e, !0, o, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = Ud(i));
  return {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function nu(t, e) {
  return !kt(t) || at(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function Kd(t, e) {
  const n = Xe(t);
  if (!kt(t))
    return n;
  let r = nu(t, e);
  for (; r && Qg(r) && at(r).position === "static"; )
    r = nu(r, e);
  return r && (sn(r) === "html" || sn(r) === "body" && at(r).position === "static" && !dl(r)) ? n : r || Jg(t) || n;
}
const f5 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || Kd, o = this.getDimensions;
  return {
    reference: u5(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await o(n)
    }
  };
};
function d5(t) {
  return at(t).direction === "rtl";
}
const m5 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: n5,
  getDocumentElement: jt,
  getClippingRect: l5,
  getOffsetParent: Kd,
  getElementRects: f5,
  getClientRects: r5,
  getDimensions: c5,
  getScale: Qn,
  isElement: Dt,
  isRTL: d5
};
function h5(t, e) {
  let n = null, r;
  const i = jt(t);
  function o() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function a(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), o();
    const {
      left: u,
      top: f,
      width: d,
      height: m
    } = t.getBoundingClientRect();
    if (l || e(), !d || !m)
      return;
    const b = Vi(f), y = Vi(i.clientWidth - (u + d)), v = Vi(i.clientHeight - (f + m)), p = Vi(u), C = {
      rootMargin: -b + "px " + -y + "px " + -v + "px " + -p + "px",
      threshold: _n(0, ar(1, c)) || 1
    };
    let h = !0;
    function E(w) {
      const x = w[0].intersectionRatio;
      if (x !== c) {
        if (!h)
          return a();
        x ? a(!1, x) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 100);
      }
      h = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...C,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, C);
    }
    n.observe(t);
  }
  return a(!0), o;
}
function v5(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = hl(t), f = i || o ? [...u ? si(u) : [], ...si(e)] : [];
  f.forEach((g) => {
    i && g.addEventListener("scroll", n, {
      passive: !0
    }), o && g.addEventListener("resize", n);
  });
  const d = u && l ? h5(u, n) : null;
  let m = -1, b = null;
  a && (b = new ResizeObserver((g) => {
    let [C] = g;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let y, v = c ? Rn(t) : null;
  c && p();
  function p() {
    const g = Rn(t);
    v && (g.x !== v.x || g.y !== v.y || g.width !== v.width || g.height !== v.height) && n(), v = g, y = requestAnimationFrame(p);
  }
  return n(), () => {
    f.forEach((g) => {
      i && g.removeEventListener("scroll", n), o && g.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(y);
  };
}
const p5 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: m5,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return Hg(t, e, {
    ...i,
    platform: o
  });
};
class g5 extends s.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = C1(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return s.Children.only(this.props.children);
  }
}
const y5 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function b5(t) {
  var e;
  return (e = y5[t]) !== null && e !== void 0 ? e : t;
}
let Yn = null, Jn = null;
cr && (Yn = document.createElement("div"), Yn.className = "adm-px-tester", Yn.style.setProperty("--size", "10"), document.body.appendChild(Yn), Jn = document.createElement("div"), Jn.className = "adm-px-tester", document.body.appendChild(Jn));
function On(t) {
  return Yn === null || Jn === null || Yn.getBoundingClientRect().height === 10 ? t : (Jn.style.setProperty("--size", t.toString()), Jn.getBoundingClientRect().height);
}
const fn = "adm-popover", E5 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, Yd = me((t, e) => {
  const n = U(E5, t), r = b5(n.placement), [i, o] = oe({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  be(e, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: i
  }), [i]);
  const a = V(null), l = V(null), c = V(null), u = tn(n.stopPropagation, W(n, s.createElement("div", {
    className: j(fn, `${fn}-${n.mode}`, {
      [`${fn}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${fn}-arrow`,
    ref: c
  }, s.createElement(Tg, {
    className: `${fn}-arrow-icon`
  })), s.createElement("div", {
    className: `${fn}-inner`
  }, s.createElement("div", {
    className: `${fn}-inner-content`
  }, n.content))))), [f, d] = K(null);
  function m() {
    var y, v, p;
    return Oe(this, void 0, void 0, function* () {
      const g = (v = (y = a.current) === null || y === void 0 ? void 0 : y.element) !== null && v !== void 0 ? v : null, C = l.current, h = c.current;
      if (d(g), !g || !C || !h)
        return;
      const {
        x: E,
        y: w,
        placement: x,
        middlewareData: k
      } = yield p5(g, C, {
        placement: r,
        middleware: [Yg(On(12)), Gg({
          padding: On(4),
          crossAxis: !1,
          limiter: Xg()
        }), Ug(), qg(), zg({
          element: h,
          padding: On(12)
        })]
      });
      Object.assign(C.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const N = x.split("-")[0], F = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[N], {
        x: _,
        y: D
      } = (p = k.arrow) !== null && p !== void 0 ? p : {};
      Object.assign(h.style, {
        left: _ != null ? `${_}px` : "",
        top: D != null ? `${D}px` : "",
        right: "",
        bottom: "",
        [F]: "calc(var(--arrow-size) * -1)"
      });
      const I = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[N];
      h.style.setProperty("--arrow-icon-rotate", I);
    });
  }
  Fe(() => {
    m();
  }), X(() => {
    if (!f || !n.trigger)
      return;
    function y() {
      o((v) => !v);
    }
    return f.addEventListener("click", y), () => {
      f.removeEventListener("click", y);
    };
  }, [f, n.trigger]), X(() => {
    const y = l.current;
    if (!(!f || !y))
      return v5(f, y, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), ku(() => {
    n.trigger && o(!1);
  }, [() => {
    var y;
    return (y = a.current) === null || y === void 0 ? void 0 : y.element;
  }, l], ["click", "touchmove"]);
  const b = Ao(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(g5, {
    ref: a
  }, n.children), b && hr(n.getContainer, u));
}), Ut = "adm-popover-menu", w5 = me((t, e) => {
  const n = V(null);
  be(e, () => n.current, []);
  const r = ze((o) => {
    var a;
    const {
      onAction: l
    } = t;
    l && l(o), (a = n.current) === null || a === void 0 || a.hide();
  }, [t.onAction]), i = ie(() => {
    const o = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), a = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${Ut}-list`
    }, s.createElement("div", {
      className: j(`${Ut}-list-inner`, {
        [`${Ut}-list-scroll`]: o
      }),
      style: {
        height: a
      }
    }, t.actions.map((l, c) => {
      var u;
      return s.createElement("a", {
        key: (u = l.key) !== null && u !== void 0 ? u : c,
        className: j(`${Ut}-item`, "adm-plain-anchor", {
          [`${Ut}-item-disabled`]: l.disabled
        }),
        onClick: () => {
          var f;
          l.disabled || (r(l), (f = l.onClick) === null || f === void 0 || f.call(l));
        }
      }, l.icon && s.createElement("div", {
        className: `${Ut}-item-icon`
      }, l.icon), s.createElement("div", {
        className: `${Ut}-item-text`
      }, l.text));
    })));
  }, [t.actions, r]);
  return s.createElement(Yd, Object.assign({
    ref: n
  }, t, {
    className: j(Ut, t.className),
    content: i
  }), t.children);
}), Gd = le(Yd, {
  Menu: w5
});
function C5(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const x5 = "__SPLIT__", We = "adm-form-item", k5 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), $5 = (t) => {
  var e;
  const {
    style: n,
    extra: r,
    label: i,
    help: o,
    required: a,
    children: l,
    htmlFor: c,
    hidden: u,
    arrow: f,
    childElementPosition: d = "normal"
  } = t, m = it(sl), {
    locale: b
  } = ye(), y = t.hasFeedback !== void 0 ? t.hasFeedback : m.hasFeedback, v = t.layout || m.layout, p = (e = t.disabled) !== null && e !== void 0 ? e : m.disabled, g = (() => {
    const {
      requiredMarkStyle: E
    } = m;
    switch (E) {
      case "asterisk":
        return a && s.createElement("span", {
          className: `${We}-required-asterisk`
        }, "*");
      case "text-required":
        return a && s.createElement("span", {
          className: `${We}-required-text`
        }, "(", b.Form.required, ")");
      case "text-optional":
        return !a && s.createElement("span", {
          className: `${We}-required-text`
        }, "(", b.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), C = !!i && s.createElement("label", {
    className: `${We}-label`,
    htmlFor: c
  }, i, g, o && s.createElement(Gd, {
    content: o,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${We}-label-help`,
    onClick: (E) => {
      E.stopPropagation(), E.preventDefault();
    }
  }, s.createElement(f2, null)))), h = (!!t.description || y) && s.createElement(s.Fragment, null, t.description, y && s.createElement(s.Fragment, null, t.errors.map((E, w) => s.createElement("div", {
    key: `error-${w}`,
    className: `${We}-feedback-error`
  }, E)), t.warnings.map((E, w) => s.createElement("div", {
    key: `warning-${w}`,
    className: `${We}-feedback-warning`
  }, E))));
  return W(t, s.createElement(wt.Item, {
    style: n,
    title: v === "vertical" && C,
    prefix: v === "horizontal" && C,
    extra: r,
    description: h,
    className: j(We, `${We}-${v}`, {
      [`${We}-hidden`]: u,
      [`${We}-has-error`]: t.errors.length
    }),
    disabled: p,
    onClick: t.onClick,
    clickable: t.clickable,
    arrow: f
  }, s.createElement("div", {
    className: j(`${We}-child`, `${We}-child-position-${d}`)
  }, s.createElement("div", {
    className: j(`${We}-child-inner`)
  }, l))));
}, _5 = (t) => {
  const {
    // 样式相关
    style: e,
    // FormItem 相关
    label: n,
    help: r,
    extra: i,
    hasFeedback: o,
    name: a,
    required: l,
    noStyle: c,
    hidden: u,
    layout: f,
    childElementPosition: d,
    description: m,
    // Field 相关
    disabled: b,
    rules: y,
    children: v,
    messageVariables: p,
    trigger: g = "onChange",
    validateTrigger: C = g,
    onClick: h,
    shouldUpdate: E,
    dependencies: w,
    clickable: x,
    arrow: k
  } = t, N = ur(t, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: F
  } = it(sl), {
    validateTrigger: _
  } = it(Vd), D = C5(C, _, g), I = V(null), R = V(0);
  R.current += 1;
  const [$, M] = K({}), S = ze((Z, q) => {
    M((Y) => {
      const G = Object.assign({}, Y), ce = q.join(x5);
      return Z.destroy ? delete G[ce] : G[ce] = Z, G;
    });
  }, [M]);
  function O(Z, q, Y, G) {
    var ce, he;
    if (c && !u)
      return Z;
    const Ee = (ce = Y == null ? void 0 : Y.errors) !== null && ce !== void 0 ? ce : [], z = Object.keys($).reduce((te, Ce) => {
      var Le, Me;
      const cn = (Me = (Le = $[Ce]) === null || Le === void 0 ? void 0 : Le.errors) !== null && Me !== void 0 ? Me : [];
      return cn.length && (te = [...te, ...cn]), te;
    }, Ee), ee = (he = Y == null ? void 0 : Y.warnings) !== null && he !== void 0 ? he : [], J = Object.keys($).reduce((te, Ce) => {
      var Le, Me;
      const cn = (Me = (Le = $[Ce]) === null || Le === void 0 ? void 0 : Le.warnings) !== null && Me !== void 0 ? Me : [];
      return cn.length && (te = [...te, ...cn]), te;
    }, ee);
    return W(t, s.createElement($5, {
      style: e,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: G,
      disabled: b,
      hasFeedback: o,
      htmlFor: q,
      errors: z,
      warnings: J,
      onClick: h && ((te) => h(te, I)),
      hidden: u,
      layout: f,
      childElementPosition: d,
      clickable: x,
      arrow: k
    }, s.createElement(Kc.Provider, {
      value: S
    }, Z)));
  }
  const A = typeof v == "function";
  if (!a && !A && !t.dependencies)
    return O(v);
  let P = {};
  P.label = typeof n == "string" ? n : "", p && (P = Object.assign(Object.assign({}, P), p));
  const T = it(Kc), B = (Z) => {
    if (c && T) {
      const q = Z.name;
      T(Z, q);
    }
  };
  return s.createElement(il, Object.assign({}, N, {
    name: a,
    shouldUpdate: E,
    dependencies: w,
    rules: y,
    trigger: g,
    validateTrigger: D,
    onMetaChange: B,
    messageVariables: P
  }), (Z, q, Y) => {
    let G = null;
    const ce = l !== void 0 ? l : y && y.some((z) => !!(z && typeof z == "object" && z.required)), he = pa(a).length && q ? q.name : [], Ee = (he.length > 0 && F ? [F, ...he] : he).join("_");
    if (A)
      (E || w) && !a && (G = v(Y));
    else if (!(w && !a))
      if (s.isValidElement(v)) {
        v.props.defaultValue;
        const z = Object.assign(Object.assign({}, v.props), Z);
        jd(v) && (z.ref = (J) => {
          const te = v.ref;
          te && (typeof te == "function" && te(J), "current" in te && (te.current = J)), I.current = J;
        }), z.id || (z.id = Ee), (/* @__PURE__ */ new Set([...pa(g), ...pa(D)])).forEach((J) => {
          z[J] = (...te) => {
            var Ce, Le, Me;
            (Ce = Z[J]) === null || Ce === void 0 || Ce.call(Z, ...te), (Me = (Le = v.props)[J]) === null || Me === void 0 || Me.call(Le, ...te);
          };
        }), G = s.createElement(k5, {
          value: Z[t.valuePropName || "value"],
          update: R.current
        }, s.cloneElement(v, z));
      } else
        G = v;
    return O(G, Ee, q, ce);
  });
}, O5 = (t) => {
  const e = Cu(), n = it(Pn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((o) => s.createElement(S5, {
    key: o.toString(),
    form: n,
    namePath: o,
    onChange: e
  })));
}, S5 = je((t) => {
  const e = al(t.namePath, t.form);
  return gi(() => {
    t.onChange();
  }, [e]), null;
}), G7 = le(wg, {
  Item: _5,
  Subscribe: O5,
  Header: Fd,
  Array: Pd,
  useForm: ol,
  useWatch: al
}), Xd = "adm-grid", F5 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = Cn(n[0]), e["--gap-vertical"] = Cn(n[1])) : e["--gap"] = Cn(n)), W(t, s.createElement("div", {
    className: Xd,
    style: e
  }, t.children));
}, N5 = (t) => {
  const e = U({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${Xd}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, Qd = le(F5, {
  Item: N5
}), P5 = h3([Of, e3]), ji = () => [1, 0, 0, 1, 0, 0], ru = (t) => t[4], iu = (t) => t[5], Pr = (t) => t[0], Rr = (t, e, n) => Jd([1, 0, 0, 1, e, n], t), R5 = (t, e, n = e) => Jd([e, 0, 0, n, 0, 0], t), M5 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], Jd = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], ga = "adm-image-viewer", e1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = V([]), i = V(null), o = V(null), [{
    matrix: a
  }, l] = Re(() => ({
    matrix: ji(),
    config: {
      tension: 200
    }
  })), c = Oa(i), u = Oa(o), f = V(!1), d = (y) => {
    if (!c || !u)
      return {
        x: {
          position: 0,
          minX: 0,
          maxX: 0
        },
        y: {
          position: 0,
          minY: 0,
          maxY: 0
        }
      };
    const v = -c.width / 2, p = -c.height / 2, g = -u.width / 2, C = -u.height / 2, h = Pr(y), E = h * u.width, w = h * u.height, x = v - (E - c.width), k = v, N = p - (w - c.height), F = p, [_, D] = M5(y, [g, C]);
    return {
      x: {
        position: _,
        minX: x,
        maxX: k
      },
      y: {
        position: D,
        minY: N,
        maxY: F
      }
    };
  }, m = (y, v, p, g = 0) => [y <= v - g, y >= p + g], b = (y, v, p = !1) => {
    if (!c || !u)
      return y;
    const g = Pr(y), C = g * u.width, h = g * u.height, {
      x: {
        position: E,
        minX: w,
        maxX: x
      },
      y: {
        position: k,
        minY: N,
        maxY: F
      }
    } = d(y);
    if (v === "translate") {
      let _ = E, D = k;
      return C > c.width ? _ = p ? $e(E, w, x) : ni(E, w, x, g * 50) : _ = -C / 2, h > c.height ? D = p ? $e(k, N, F) : ni(k, N, F, g * 50) : D = -h / 2, Rr(y, _ - E, D - k);
    }
    if (v === "scale" && p) {
      const [_, D] = [C > c.width ? $e(E, w, x) : -C / 2, h > c.height ? $e(k, N, F) : -h / 2];
      return Rr(y, _ - E, D - k);
    }
    return y;
  };
  return P5({
    onDrag: (y) => {
      var v;
      if (y.first) {
        const {
          x: {
            position: g,
            minX: C,
            maxX: h
          }
        } = d(a.get());
        r.current = m(g, C, h);
        return;
      }
      if (y.pinching)
        return y.cancel();
      if (y.tap && y.elapsedTime > 0 && y.elapsedTime < 1e3) {
        (v = t.onTap) === null || v === void 0 || v.call(t);
        return;
      }
      const p = Pr(a.get());
      if (e && (e.current = p !== 1), !f.current && p <= 1)
        l.start({
          matrix: ji()
        });
      else {
        const g = a.get(), C = [y.offset[0] - ru(g), y.offset[1] - iu(g)], h = Rr(g, ...y.last ? [C[0] + y.velocity[0] * y.direction[0] * 200, C[1] + y.velocity[1] * y.direction[1] * 200] : C);
        l.start({
          matrix: b(h, "translate", y.last),
          immediate: !y.last
        });
        const {
          x: {
            position: E,
            minX: w,
            maxX: x
          }
        } = d(h);
        y.last && r.current.some((k) => k) && m(E, w, x).some((k) => k) && (e && (e.current = !1), l.start({
          matrix: ji()
        }));
      }
    },
    onPinch: (y) => {
      var v;
      f.current = !y.last;
      const [p] = y.offset;
      if (p < 0)
        return;
      let g;
      n === "auto" ? g = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : g = n;
      const C = y.last ? $e(p, 1, g) : p;
      if ((v = t.onZoomChange) === null || v === void 0 || v.call(t, C), y.last && C <= 1)
        l.start({
          matrix: ji()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const h = a.get(), E = Pr(h), w = y.origin[0] - c.width / 2, x = y.origin[1] - c.height / 2;
        let k = Rr(h, -w, -x);
        k = R5(k, C / E), k = Rr(k, w, x), l.start({
          matrix: b(k, "scale", y.last),
          immediate: !y.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [ru(a.get()), iu(a.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Pr(a.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), s.createElement("div", {
    className: `${ga}-slide`
  }, s.createElement("div", {
    className: `${ga}-control`,
    ref: i
  }, s.createElement(ge.div, {
    className: `${ga}-image-wrapper`,
    style: {
      matrix: a
    }
  }, s.createElement("img", {
    ref: o,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, ya = "adm-image-viewer", A5 = me((t, e) => {
  const n = window.innerWidth + On(16), [{
    x: r
  }, i] = Re(() => ({
    x: t.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), o = t.images.length;
  function a(u, f = !1) {
    var d;
    const m = $e(u, 0, o - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  be(e, () => ({
    swipeTo: a
  }));
  const l = V(!1), c = _t((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, b = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      a($e(Math.round((f + b) / n), d, m));
    } else
      i.start({
        x: f,
        immediate: !0
      });
  }, {
    transform: ([u, f]) => [-u, f],
    from: () => [r.get(), 0],
    bounds: () => ({
      left: 0,
      right: (o - 1) * n
    }),
    rubberband: !0,
    axis: "x",
    pointer: {
      touch: !0
    }
  });
  return s.createElement("div", Object.assign({
    className: `${ya}-slides`
  }, c()), s.createElement(ge.div, {
    className: `${ya}-indicator`
  }, r.to((u) => `${$e(Math.round(u / n), 0, o - 1) + 1} / ${o}`)), s.createElement(ge.div, {
    className: `${ya}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(e1, {
    key: f,
    image: u,
    onTap: t.onTap,
    maxZoom: t.maxZoom,
    onZoomChange: (d) => {
      if (d !== 1) {
        const m = Math.round(r.get() / n);
        i.start({
          x: m * n
        });
      }
    },
    dragLockRef: l
  }))));
}), wo = "adm-image-viewer", t1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, n1 = (t) => {
  var e, n, r;
  const i = U(t1, t), o = s.createElement(mi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: j(`${wo}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && s.createElement(e1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && s.createElement("div", {
    className: `${wo}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(yr, {
    position: "bottom"
  })));
  return hr(i.getContainer, o);
}, T5 = Object.assign(Object.assign({}, t1), {
  defaultIndex: 0
}), r1 = me((t, e) => {
  var n, r, i;
  const o = U(T5, t), [a, l] = K(o.defaultIndex), c = V(null);
  be(e, () => ({
    swipeTo: (d, m) => {
      var b;
      l(d), (b = c.current) === null || b === void 0 || b.swipeTo(d, m);
    }
  }));
  const u = ze((d) => {
    var m;
    d !== a && (l(d), (m = o.onIndexChange) === null || m === void 0 || m.call(o, d));
  }, [o.onIndexChange, a]), f = s.createElement(mi, {
    visible: o.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: o.afterClose,
    destroyOnClose: !0,
    className: (n = o == null ? void 0 : o.classNames) === null || n === void 0 ? void 0 : n.mask
  }, s.createElement("div", {
    className: j(`${wo}-content`, (r = o == null ? void 0 : o.classNames) === null || r === void 0 ? void 0 : r.body)
  }, o.images && s.createElement(A5, {
    ref: c,
    defaultIndex: a,
    onIndexChange: u,
    images: o.images,
    onTap: o.onClose,
    maxZoom: o.maxZoom
  })), o.images && s.createElement("div", {
    className: `${wo}-footer`
  }, (i = o.renderFooter) === null || i === void 0 ? void 0 : i.call(o, o.images[a], a), s.createElement(yr, {
    position: "bottom"
  })));
  return hr(o.getContainer, f);
}), lr = /* @__PURE__ */ new Set();
function I5(t) {
  vl();
  const e = br(s.createElement(n1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      lr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return lr.add(e), e;
}
function L5(t) {
  vl();
  const e = br(s.createElement(r1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      lr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return lr.add(e), e;
}
function vl() {
  lr.forEach((t) => {
    t.close();
  }), lr.clear();
}
const D5 = le(r1, {
  show: L5
}), V5 = le(n1, {
  Multi: D5,
  show: I5,
  clear: vl
}), dn = "adm-image-uploader", j5 = (t) => {
  const {
    locale: e
  } = ye(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: o,
    onDelete: a,
    imageFit: l
  } = t, c = ie(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  X(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${dn}-cell-mask`
    }, s.createElement("span", {
      className: `${dn}-cell-loading`
    }, s.createElement(Ks, {
      color: "white"
    }), s.createElement("span", {
      className: `${dn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${dn}-cell-delete`,
      onClick: a
    }, o);
  }
  return s.createElement("div", {
    className: j(`${dn}-cell`, t.status === "fail" && `${dn}-cell-fail`)
  }, s.createElement(Do, {
    className: `${dn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, ou = j5, mn = "adm-space", B5 = {
  direction: "horizontal"
}, pl = (t) => {
  const e = U(B5, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(mn, {
      [`${mn}-wrap`]: e.wrap,
      [`${mn}-block`]: e.block,
      [`${mn}-${n}`]: !0,
      [`${mn}-align-${e.align}`]: !!e.align,
      [`${mn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${mn}-item`
  }, i))));
}, bt = "adm-image-uploader", W5 = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(hi, {
    className: `${bt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, X7 = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(W5, t), {
    columns: i
  } = r, [o, a] = oe(r), [l, c] = K([]), u = V(null), f = Oa(u), d = V(null), [m, b] = K(80), y = V(null);
  Fe(() => {
    const R = d.current;
    if (i && f && R) {
      const $ = f.width, M = jf(window.getComputedStyle(R).getPropertyValue("height"));
      b(($ - M * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const v = {
    "--cell-size": m + "px"
  };
  Fe(() => {
    c((R) => R.filter(($) => $.url === void 0 ? !0 : !o.some((M) => M.url === $.url)));
  }, [o]), Fe(() => {
    var R;
    (R = r.onUploadQueueChange) === null || R === void 0 || R.call(r, l.map(($) => ({
      id: $.id,
      status: $.status
    })));
  }, [l]);
  const p = V(0), {
    maxCount: g,
    onPreview: C,
    renderItem: h
  } = r;
  function E(R, $) {
    return Oe(this, void 0, void 0, function* () {
      const {
        beforeUpload: M
      } = r;
      let S = R;
      return S = yield M == null ? void 0 : M(R, $), S;
    });
  }
  function w(R) {
    return r.showFailed ? R : R.filter(($) => $.status !== "fail");
  }
  function x(R) {
    var $;
    return Oe(this, void 0, void 0, function* () {
      R.persist();
      const {
        files: M
      } = R.target;
      if (!M)
        return;
      let S = [].slice.call(M);
      if (R.target.value = "", r.beforeUpload) {
        const P = S.map((T) => E(T, S));
        yield Promise.all(P).then((T) => {
          S = T.filter(Boolean);
        });
      }
      if (S.length === 0)
        return;
      if (g > 0) {
        const P = o.length + S.length - g;
        P > 0 && (S = S.slice(0, S.length - P), ($ = r.onCountExceed) === null || $ === void 0 || $.call(r, P));
      }
      const O = S.map((P) => ({
        id: p.current++,
        status: "pending",
        file: P
      }));
      c((P) => [...w(P), ...O]);
      const A = [];
      yield Promise.all(O.map((P, T) => Oe(this, void 0, void 0, function* () {
        try {
          const B = yield r.upload(P.file);
          A[T] = B, c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "success",
            url: B.url
          }) : q));
        } catch (B) {
          throw c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "fail"
          }) : q)), B;
        }
      }))).catch((P) => console.error(P)), a((P) => P.concat(A));
    });
  }
  const k = V(null);
  function N(R) {
    k.current = V5.Multi.show({
      images: o.map(($) => $.url),
      defaultIndex: R,
      onClose: () => {
        k.current = null;
      }
    });
  }
  ui(() => {
    var R;
    (R = k.current) === null || R === void 0 || R.close();
  });
  const F = w(l), _ = r.showUpload && (g === 0 || o.length + F.length < g), D = () => o.map((R, $) => {
    var M, S;
    const O = s.createElement(ou, {
      key: (M = R.key) !== null && M !== void 0 ? M : $,
      url: (S = R.thumbnailUrl) !== null && S !== void 0 ? S : R.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && N($), C && C($, R);
      },
      onDelete: () => Oe(void 0, void 0, void 0, function* () {
        var A;
        (yield (A = r.onDelete) === null || A === void 0 ? void 0 : A.call(r, R)) !== !1 && a(o.filter((T, B) => B !== $));
      })
    });
    return h ? h(O, R, o) : O;
  }), I = s.createElement(s.Fragment, null, D(), l.map((R) => !r.showFailed && R.status === "fail" ? null : s.createElement(ou, {
    key: R.id,
    file: R.file,
    deletable: R.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: R.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(l.filter(($) => $.id !== R.id));
    }
  })), s.createElement("div", {
    className: `${bt}-upload-button-wrap`,
    style: _ ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${bt}-cell ${bt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${bt}-upload-button-icon`
  }, s.createElement(uf, null))), !r.disableUpload && s.createElement("input", {
    ref: y,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${bt}-input`,
    onChange: x,
    "aria-hidden": !0
  })));
  return be(e, () => ({
    get nativeElement() {
      return y.current;
    }
  })), W(r, s.createElement("div", {
    className: bt,
    ref: u
  }, i ? s.createElement(Qd, {
    className: `${bt}-grid`,
    columns: i,
    style: v
  }, s.createElement("div", {
    className: `${bt}-gap-measure`,
    ref: d
  }), I.props.children) : s.createElement(pl, {
    className: `${bt}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
}), i1 = () => null, Zn = "adm-index-bar", Z5 = (t) => {
  const [e, n] = K(!1);
  return s.createElement("div", {
    className: j(`${Zn}-sidebar`, {
      [`${Zn}-sidebar-interacting`]: e
    }),
    onMouseDown: () => {
      n(!0);
    },
    onMouseUp: () => {
      n(!1);
    },
    onTouchStart: () => {
      n(!0);
    },
    onTouchEnd: () => {
      n(!1);
    },
    onTouchMove: (r) => {
      if (!e)
        return;
      const {
        clientX: i,
        clientY: o
      } = r.touches[0], a = document.elementFromPoint(i, o);
      if (!a)
        return;
      const l = a.dataset.index;
      l && t.onActive(l);
    }
  }, t.indexItems.map(({
    index: r,
    brief: i
  }) => {
    const o = r === t.activeIndex;
    return s.createElement("div", {
      className: `${Zn}-sidebar-row`,
      onMouseDown: () => {
        t.onActive(r);
      },
      onTouchStart: () => {
        t.onActive(r);
      },
      onMouseEnter: () => {
        e && t.onActive(r);
      },
      "data-index": r,
      key: r
    }, e && o && s.createElement("div", {
      className: `${Zn}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: j(`${Zn}-sidebar-item`, {
        [`${Zn}-sidebar-item-active`]: o
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, Hn = "adm-index-bar", H5 = {
  sticky: !0
}, z5 = me((t, e) => {
  const n = U(H5, t), r = On(35), i = V(null), o = [], a = [];
  ln(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === i1 && (o.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), a.push(W(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${Hn}-anchor`
    }, s.createElement("div", {
      className: `${Hn}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = K(() => {
    const d = o[0];
    return d ? d.index : null;
  });
  be(e, () => ({
    scrollTo: u
  }));
  function u(d) {
    var m;
    const b = i.current;
    if (!b)
      return;
    const y = b.children;
    for (let v = 0; v < y.length; v++) {
      const p = y.item(v);
      if (!p)
        continue;
      if (p.dataset.index === d) {
        b.scrollTop = p.offsetTop, c(d), l !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
        return;
      }
    }
  }
  const {
    run: f
  } = ko(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const b = m.scrollTop, y = m.getElementsByClassName(`${Hn}-anchor`);
    for (let v = 0; v < y.length; v++) {
      const p = y.item(v);
      if (!p)
        continue;
      const g = p.dataset.index;
      if (g && p.offsetTop + p.clientHeight - r > b) {
        c(g), l !== g && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, g));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return W(n, s.createElement("div", {
    className: j(`${Hn}`, {
      [`${Hn}-sticky`]: n.sticky
    })
  }, s.createElement(Z5, {
    indexItems: o,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${Hn}-body`,
    ref: i,
    onScroll: f
  }, a)));
}), Q7 = le(z5, {
  Panel: i1
});
function U5(t) {
  return t === window;
}
const o1 = "adm-infinite-scroll", q5 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(K5, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, J7 = (t) => {
  const e = U(q5, t), [n, r] = K(!1), i = Q0((b) => Oe(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (y) {
      throw r(!0), y;
    }
  })), o = V(null), [a, l] = K({}), c = V(a), [u, f] = K(), {
    run: d
  } = ko(() => Oe(void 0, void 0, void 0, function* () {
    if (c.current !== a || !e.hasMore)
      return;
    const b = o.current;
    if (!b || !b.offsetParent)
      return;
    const y = no(b);
    if (f(y), !y)
      return;
    const p = b.getBoundingClientRect().top;
    if ((U5(y) ? window.innerHeight : y.getBoundingClientRect().bottom) >= p - e.threshold) {
      const C = {};
      c.current = C;
      try {
        yield i(!1), l(C);
      } catch {
      }
    }
  }), {
    wait: 100,
    leading: !0,
    trailing: !0
  });
  X(() => {
    d();
  }), X(() => {
    if (!o.current || !u)
      return;
    function y() {
      d();
    }
    return u.addEventListener("scroll", y), () => {
      u.removeEventListener("scroll", y);
    };
  }, [u]);
  function m() {
    return Oe(this, void 0, void 0, function* () {
      r(!1);
      try {
        yield i(!0), l(c.current);
      } catch {
      }
    });
  }
  return W(e, s.createElement("div", {
    className: o1,
    ref: o
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, K5 = (t) => {
  const {
    locale: e
  } = ye();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${o1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(Rf, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function a1({
  onEnterPress: t,
  onKeyDown: e,
  nativeInputRef: n,
  enterKeyHint: r
}) {
  const i = (o) => {
    t && (o.code === "Enter" || o.keyCode === 13) && t(o), e == null || e(o);
  };
  return Fe(() => {
    const o = n.current;
    if (!(!r || !o))
      return o.setAttribute("enterkeyhint", r), () => {
        o.removeAttribute("enterkeyhint");
      };
  }, [r]), i;
}
const Bi = "adm-input", Y5 = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, s1 = me((t, e) => {
  const n = U(Y5, t), [r, i] = oe(n), [o, a] = K(!1), l = V(!1), c = V(null), {
    locale: u
  } = ye(), f = a1({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown,
    nativeInputRef: c,
    enterKeyHint: n.enterKeyHint
  });
  be(e, () => ({
    clear: () => {
      i("");
    },
    focus: () => {
      var b;
      (b = c.current) === null || b === void 0 || b.focus();
    },
    blur: () => {
      var b;
      (b = c.current) === null || b === void 0 || b.blur();
    },
    get nativeElement() {
      return c.current;
    }
  }));
  function d() {
    let b = r;
    if (n.type === "number") {
      const y = b && $e(parseFloat(b), n.min, n.max).toString();
      Number(b) !== Number(y) && (b = y);
    }
    b !== r && i(b);
  }
  const m = !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? o : !0;
  return W(n, s.createElement("div", {
    className: j(`${Bi}`, n.disabled && `${Bi}-disabled`)
  }, s.createElement("input", {
    ref: c,
    className: `${Bi}-element`,
    value: r,
    onChange: (b) => {
      i(b.target.value);
    },
    onFocus: (b) => {
      var y;
      a(!0), (y = n.onFocus) === null || y === void 0 || y.call(n, b);
    },
    onBlur: (b) => {
      var y;
      a(!1), d(), (y = n.onBlur) === null || y === void 0 || y.call(n, b);
    },
    id: n.id,
    placeholder: n.placeholder,
    disabled: n.disabled,
    readOnly: n.readOnly,
    maxLength: n.maxLength,
    minLength: n.minLength,
    max: n.max,
    min: n.min,
    autoComplete: n.autoComplete,
    enterKeyHint: n.enterKeyHint,
    autoFocus: n.autoFocus,
    pattern: n.pattern,
    inputMode: n.inputMode,
    type: n.type,
    name: n.name,
    autoCapitalize: n.autoCapitalize,
    autoCorrect: n.autoCorrect,
    onKeyDown: f,
    onKeyUp: n.onKeyUp,
    onCompositionStart: (b) => {
      var y;
      l.current = !0, (y = n.onCompositionStart) === null || y === void 0 || y.call(n, b);
    },
    onCompositionEnd: (b) => {
      var y;
      l.current = !1, (y = n.onCompositionEnd) === null || y === void 0 || y.call(n, b);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && s.createElement("div", {
    className: `${Bi}-clear`,
    onMouseDown: (b) => {
      b.preventDefault();
    },
    onClick: () => {
      var b, y;
      i(""), (b = n.onClear) === null || b === void 0 || b.call(n), W3() && l.current && (l.current = !1, (y = c.current) === null || y === void 0 || y.blur());
    },
    "aria-label": u.Input.clear
  }, s.createElement(To, null))));
}), pt = "adm-jumbo-tabs", G5 = () => null, X5 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let o = null;
  const a = [];
  ln(t.children, (d, m) => {
    if (!Mn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const y = a.push(d);
    i[b] = y - 1;
  });
  const [l, c] = oe({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = If(n, i[l]);
  return yi(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: pt,
    ref: r
  }, s.createElement("div", {
    className: `${pt}-header`
  }, s.createElement(Lf, {
    scrollTrackRef: n
  }), s.createElement(ge.div, {
    className: `${pt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, a.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${pt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: j(`${pt}-tab`, {
      [`${pt}-tab-active`]: d.key === l,
      [`${pt}-tab-disabled`]: d.props.disabled
    })
  }, s.createElement("div", {
    className: `${pt}-tab-title`
  }, d.props.title), s.createElement("div", {
    className: `${pt}-tab-description`
  }, d.props.description))))))), a.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(vr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${pt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, e8 = le(X5, {
  Tab: G5
}), Q5 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(It, {
    key: e.key,
    onClick: t.onAction,
    className: j("adm-modal-button", {
      "adm-modal-button-primary": t.action.primary
    }),
    fill: t.action.primary ? "solid" : "none",
    size: t.action.primary ? "large" : "middle",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, J5 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, l1 = (t) => {
  const e = U(J5, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: St("image-container")
  }, s.createElement(Do, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: St("header")
  }, s.createElement(ti, null, e.header)), !!e.title && s.createElement("div", {
    className: St("title")
  }, e.title), s.createElement("div", {
    className: St("content")
  }, typeof e.content == "string" ? s.createElement(ti, null, e.content) : e.content), s.createElement(pl, {
    direction: "vertical",
    block: !0,
    className: j(St("footer"), e.actions.length === 0 && St("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(Q5, {
    key: r.key,
    action: r,
    onAction: () => Oe(void 0, void 0, void 0, function* () {
      var o, a, l;
      yield Promise.all([(o = r.onClick) === null || o === void 0 ? void 0 : o.call(r), (a = e.onAction) === null || a === void 0 ? void 0 : a.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(ed, {
    className: j(St(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: j(St("body"), e.image && St("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function St(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const ds = /* @__PURE__ */ new Set();
function gl(t) {
  const e = br(s.createElement(l1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ds.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ds.add(e.close), e;
}
function e6(t) {
  const e = {
    confirmText: li().locale.Modal.ok
  }, n = U(e, t);
  return new Promise((r) => {
    gl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0
      }],
      onAction: n.onConfirm,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r();
      }
    }));
  });
}
const t6 = {
  confirmText: "确认",
  cancelText: "取消"
};
function n6(t) {
  const {
    locale: e
  } = li(), n = U(t6, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    gl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Oe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Oe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function r6() {
  ds.forEach((t) => {
    t();
  });
}
const t8 = le(l1, {
  show: gl,
  alert: e6,
  confirm: n6,
  clear: r6
}), zn = "adm-nav-bar", i6 = {
  backArrow: !0
}, n8 = (t) => {
  const e = U(i6, t), {
    back: n,
    backArrow: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(zn)
  }, s.createElement("div", {
    className: `${zn}-left`,
    role: "button"
  }, n !== null && s.createElement("div", {
    className: `${zn}-back`,
    onClick: e.onBack
  }, r && s.createElement("span", {
    className: `${zn}-back-arrow`
  }, r === !0 ? s.createElement(c2, null) : r), s.createElement("span", {
    "aria-hidden": "true"
  }, n)), e.left), s.createElement("div", {
    className: `${zn}-title`
  }, e.children), s.createElement("div", {
    className: `${zn}-right`
  }, e.right)));
}, Ft = "adm-notice-bar", o6 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: s.createElement(h2, null)
}, r8 = je((t) => {
  const e = U(o6, t), n = V(null), r = V(null), [i, o] = K(!0), a = e.speed, l = V(!0), c = V(!1);
  function u() {
    if (l.current || e.wrap)
      return;
    const f = n.current, d = r.current;
    if (!f || !d)
      return;
    if (f.offsetWidth >= d.offsetWidth) {
      c.current = !1, d.style.removeProperty("transition-duration"), d.style.removeProperty("transform");
      return;
    }
    if (c.current)
      return;
    const m = !d.style.transform;
    d.style.transitionDuration = "0s", m ? d.style.transform = "translateX(0)" : d.style.transform = `translateX(${f.offsetWidth}px)`;
    const b = m ? d.offsetWidth : f.offsetWidth + d.offsetWidth;
    c.current = !0, d.style.transitionDuration = `${Math.round(b / a)}s`, d.style.transform = `translateX(-${d.offsetWidth}px)`;
  }
  return km(() => {
    l.current = !1, u();
  }, e.delay), yi(() => {
    u();
  }, n), Hs(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? W(e, s.createElement("div", {
    className: j(Ft, `${Ft}-${e.color}`, {
      [`${Ft}-wrap`]: e.wrap
    }),
    onClick: e.onClick
  }, e.icon && s.createElement("span", {
    className: `${Ft}-left`
  }, e.icon), s.createElement("span", {
    ref: n,
    className: `${Ft}-content`
  }, s.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Ft}-content-inner`
  }, e.content)), (e.closeable || e.extra) && s.createElement("span", {
    className: `${Ft}-right`
  }, e.extra, e.closeable && s.createElement("div", {
    className: `${Ft}-close`,
    onClick: () => {
      var f;
      o(!1), (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, s.createElement(hi, {
    className: `${Ft}-close-icon`
  }))))) : null;
});
function a6(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const xe = "adm-number-keyboard", s6 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, i8 = (t) => {
  const e = U(s6, t), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: o,
    customKey: a,
    randomOrder: l,
    showCloseButton: c,
    onInput: u
  } = e, {
    locale: f
  } = ye(), d = V(null), m = ie(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = l ? a6(w) : w, k = Array.isArray(a) ? a : [a];
    return x.push("0"), o ? (k.length === 2 && x.splice(9, 0, k.pop()), x.push(k[0] || "")) : (x.splice(9, 0, k[0] || ""), x.push(k[1] || "BACKSPACE")), x;
  }, [a, o, l, l && n]), b = V(-1), y = V(-1), v = Vt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), p = () => {
    b.current = window.setTimeout(() => {
      v(), y.current = window.setInterval(v, 150);
    }, 700);
  }, g = () => {
    clearTimeout(b.current), clearInterval(y.current);
  }, C = (w, x) => {
    var k, N;
    switch (w.preventDefault(), x) {
      case "BACKSPACE":
        v == null || v();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && ((N = e.onClose) === null || N === void 0 || N.call(e));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, h = () => !c && !r ? null : s.createElement("div", {
    className: j(`${xe}-header`, {
      [`${xe}-header-with-title`]: !!r
    })
  }, !!r && s.createElement("div", {
    className: `${xe}-title`,
    "aria-label": r
  }, r), c && s.createElement("span", {
    className: `${xe}-header-close-button`,
    onClick: () => {
      var w;
      (w = e.onClose) === null || w === void 0 || w.call(e);
    },
    role: "button",
    title: f.common.close,
    tabIndex: -1
  }, s.createElement(hf, null))), E = (w, x) => {
    const k = /^\d$/.test(w), N = j(`${xe}-key`, {
      [`${xe}-key-number`]: k,
      [`${xe}-key-sign`]: !k && w,
      [`${xe}-key-mid`]: x === 9 && !!o && m.length < 12
    }), F = w ? {
      role: "button",
      title: w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: N,
      onTouchStart: () => {
        w === "BACKSPACE" && p();
      },
      onTouchEnd: (_) => {
        C(_, w), w === "BACKSPACE" && g();
      }
    }, F), w === "BACKSPACE" ? s.createElement(tc, null) : w);
  };
  return s.createElement(gr, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    className: `${xe}-popup`,
    stopPropagation: e.stopPropagation,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, W(e, s.createElement("div", {
    ref: d,
    className: xe,
    onMouseDown: (w) => {
      w.preventDefault();
    }
  }, h(), s.createElement("div", {
    className: `${xe}-wrapper`
  }, s.createElement("div", {
    className: j(`${xe}-main`, {
      [`${xe}-main-confirmed-style`]: !!o
    })
  }, m.map(E)), !!o && s.createElement("div", {
    className: `${xe}-confirm`
  }, s.createElement("div", {
    className: `${xe}-key ${xe}-key-extra ${xe}-key-bs`,
    onTouchStart: () => {
      p();
    },
    onTouchEnd: (w) => {
      C(w, "BACKSPACE"), g();
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(tc, null)), s.createElement("div", {
    className: `${xe}-key ${xe}-key-extra ${xe}-key-ok`,
    onTouchEnd: (w) => C(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": o
  }, o))), e.safeArea && s.createElement("div", {
    className: `${xe}-footer`
  }, s.createElement(yr, {
    position: "bottom"
  })))));
}, Mr = "adm-page-indicator", l6 = {
  color: "primary",
  direction: "horizontal"
}, c6 = je((t) => {
  const e = U(l6, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: j(`${Mr}-dot`, {
        [`${Mr}-dot-active`]: e.current === r
      })
    }));
  return W(e, s.createElement("div", {
    className: j(Mr, `${Mr}-${e.direction}`, `${Mr}-color-${e.color}`)
  }, n));
}), gt = "adm-passcode-input", au = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, o8 = me((t, e) => {
  const n = U(au, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : au.length, {
    locale: i
  } = ye(), [o, a] = K(!1), [l, c] = oe(n), u = V(null), f = V(null);
  X(() => {
    var v;
    l.length >= r && ((v = n.onFill) === null || v === void 0 || v.call(n, l));
  }, [l, r]);
  const d = () => {
    var v, p;
    n.keyboard || (v = f.current) === null || v === void 0 || v.focus(), a(!0), (p = n.onFocus) === null || p === void 0 || p.call(n);
  };
  X(() => {
    if (!o)
      return;
    const v = window.setTimeout(() => {
      var p;
      (p = u.current) === null || p === void 0 || p.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(v);
    };
  }, [o]);
  const m = () => {
    var v;
    a(!1), (v = n.onBlur) === null || v === void 0 || v.call(n);
  };
  be(e, () => ({
    focus: () => {
      var v;
      return (v = u.current) === null || v === void 0 ? void 0 : v.focus();
    },
    blur: () => {
      var v, p;
      (v = u.current) === null || v === void 0 || v.blur(), (p = f.current) === null || p === void 0 || p.blur();
    }
  }));
  const b = () => {
    const v = [], p = l.split(""), g = p.length, C = $e(p.length, 0, r - 1);
    for (let h = 0; h < r; h++)
      v.push(s.createElement("div", {
        className: j(`${gt}-cell`, {
          [`${gt}-cell-caret`]: n.caret && g === h && o,
          [`${gt}-cell-focused`]: C === h && o,
          [`${gt}-cell-dot`]: !n.plain && p[h]
        }),
        key: h
      }, p[h] && n.plain ? p[h] : ""));
    return v;
  }, y = j(gt, {
    [`${gt}-focused`]: o,
    [`${gt}-error`]: n.error,
    [`${gt}-seperated`]: n.seperated
  });
  return s.createElement(s.Fragment, null, W(n, s.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: y,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, s.createElement("div", {
    className: `${gt}-cell-container`
  }, b()), s.createElement("input", {
    ref: f,
    className: `${gt}-native-input`,
    value: l,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (v) => {
      c(v.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && s.cloneElement(n.keyboard, {
    visible: o,
    onInput: (v) => {
      l.length < r && c((l + v).slice(0, n.length));
    },
    onDelete: () => {
      c(l.slice(0, -1));
    },
    onClose: () => {
      var v;
      (v = u.current) === null || v === void 0 || v.blur();
    }
  }));
}), Ar = "adm-progress-bar", u6 = {
  percent: 0,
  rounded: !0,
  text: !1
}, a8 = (t) => {
  const e = U(u6, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, s.createElement("div", {
    className: j(Ar, e.rounded && `${Ar}-rounded`)
  }, s.createElement("div", {
    className: `${Ar}-trail`
  }, s.createElement("div", {
    className: `${Ar}-fill`,
    style: n
  })), At(r) && s.createElement("div", {
    className: `${Ar}-text`
  }, r)));
}, Un = "adm-progress-circle", s8 = (t) => {
  const e = U({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, s.createElement("div", {
    className: `${Un}`,
    style: n
  }, s.createElement("div", {
    className: `${Un}-content`
  }, s.createElement("svg", {
    className: `${Un}-svg`
  }, s.createElement("circle", {
    className: `${Un}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${Un}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${Un}-info`
  }, e.children))));
}, f6 = (t) => new Promise((e) => setTimeout(e, t)), Wi = "adm-pull-to-refresh", d6 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, l8 = (t) => {
  var e, n;
  const {
    locale: r
  } = ye(), i = U(d6, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), o = (e = i.headHeight) !== null && e !== void 0 ? e : On(40), a = (n = i.threshold) !== null && n !== void 0 ? n : On(60), [l, c] = K("pulling"), [u, f] = Re(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      round: !0,
      clamp: !0
    }
  })), d = V(null), m = V(!1);
  X(() => {
    var p;
    (p = d.current) === null || p === void 0 || p.addEventListener("touchmove", () => {
    });
  }, []);
  const b = () => new Promise((p) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), p();
      }
    });
  });
  function y() {
    return Oe(this, void 0, void 0, function* () {
      f.start({
        height: o
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (p) {
        throw b(), p;
      }
      i.completeDelay > 0 && (yield f6(i.completeDelay)), b();
    });
  }
  _t((p) => {
    if (l === "refreshing" || l === "complete")
      return;
    const {
      event: g
    } = p;
    if (p.last) {
      m.current = !1, l === "canRelease" ? y() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = p.movement, h = Math.ceil(C);
    if (p.first && h > 0) {
      let k = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const w = p.event.target;
      if (!w || !(w instanceof Element))
        return;
      let x = no(w);
      for (; ; ) {
        if (!x || k(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = no(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    g.cancelable && g.preventDefault(), g.stopPropagation();
    const E = Math.max(ni(h, 0, 0, o * 5, 0.5), 0);
    f.start({
      height: E
    }), c(E > a ? "canRelease" : "pulling");
  }, {
    pointer: {
      touch: !0
    },
    axis: "y",
    target: d,
    enabled: !i.disabled,
    eventOptions: Sn ? {
      passive: !1
    } : void 0
  });
  const v = () => {
    var p;
    if (i.renderText)
      return (p = i.renderText) === null || p === void 0 ? void 0 : p.call(i, l);
    if (l === "pulling")
      return i.pullingText;
    if (l === "canRelease")
      return i.canReleaseText;
    if (l === "refreshing")
      return i.refreshingText;
    if (l === "complete")
      return i.completeText;
  };
  return s.createElement(ge.div, {
    ref: d,
    className: Wi
  }, s.createElement(ge.div, {
    style: u,
    className: `${Wi}-head`
  }, s.createElement("div", {
    className: `${Wi}-head-content`,
    style: {
      height: o
    }
  }, v())), s.createElement("div", {
    className: `${Wi}-content`
  }, i.children));
}, c1 = vs(null), m6 = {
  disabled: !1,
  defaultValue: null
}, h6 = (t) => {
  const e = U(m6, t), [n, r] = oe({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var o;
      i !== null && ((o = e.onChange) === null || o === void 0 || o.call(e, i));
    }
  });
  return s.createElement(
    c1.Provider,
    {
      // TODO: 性能优化
      value: {
        value: n === null ? [] : [n],
        check: (i) => {
          r(i);
        },
        uncheck: () => {
        },
        disabled: e.disabled
      }
    },
    e.children
  );
}, hn = "adm-radio", v6 = {
  defaultChecked: !1
}, p6 = (t) => {
  const e = U(v6, t), n = it(c1);
  let [r, i] = oe({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  }), o = e.disabled;
  const {
    value: a
  } = e;
  n && a !== void 0 && (r = n.value.includes(a), i = (c) => {
    var u;
    c ? n.check(a) : n.uncheck(a), (u = e.onChange) === null || u === void 0 || u.call(e, c);
  }, o = o || n.disabled);
  const l = () => e.icon ? s.createElement("div", {
    className: `${hn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${hn}-icon`
  }, r && s.createElement(nd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: j(hn, {
      [`${hn}-checked`]: r,
      [`${hn}-disabled`]: o,
      [`${hn}-block`]: e.block
    })
  }, s.createElement(rd, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: o,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${hn}-content`
  }, e.children)));
}, c8 = le(p6, {
  Group: h6
}), g6 = () => s.createElement("svg", {
  viewBox: "0 0 42 40",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    verticalAlign: "-0.125em"
  }
}, s.createElement("path", {
  d: "m21 34-10.52 5.53a2 2 0 0 1-2.902-2.108l2.01-11.714-8.511-8.296a2 2 0 0 1 1.108-3.411l11.762-1.71 5.26-10.657a2 2 0 0 1 3.586 0l5.26 10.658L39.815 14a2 2 0 0 1 1.108 3.411l-8.51 8.296 2.009 11.714a2 2 0 0 1-2.902 2.109L21 34Z",
  fill: "currentColor",
  fillRule: "evenodd"
})), vn = "adm-rate", y6 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(g6, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, u8 = (t) => {
  const e = U(y6, t), [n, r] = oe(e), i = V(null), o = Array(e.count).fill(null);
  function a(c, u) {
    return s.createElement("div", {
      className: j(`${vn}-star`, {
        [`${vn}-star-active`]: n >= c,
        [`${vn}-star-half`]: u,
        [`${vn}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const l = _t((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), b = (u - m.left) / m.width * e.count, y = e.allowHalf ? Math.ceil(b * 2) / 2 : Math.ceil(b), v = $e(y, 0, e.count);
    if (f && e.allowClear && v === n) {
      r(0);
      return;
    }
    r(v);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    },
    filterTaps: !0
  });
  return W(e, s.createElement("div", Object.assign({
    className: j(vn, {
      [`${vn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), o.map((c, u) => s.createElement("div", {
    key: u,
    className: j(`${vn}-box`)
  }, e.allowHalf && a(u + 0.5, !0), a(u + 1, !1)))));
}, Tr = "adm-result", b6 = {
  success: ff,
  error: To,
  info: pf,
  waiting: mf,
  warning: vf
}, E6 = {
  status: "info"
}, f8 = (t) => {
  const e = U(E6, t), {
    status: n,
    title: r,
    description: i,
    icon: o
  } = e;
  if (!n)
    return null;
  const a = o || s.createElement(b6[n]);
  return W(e, s.createElement("div", {
    className: j(Tr, `${Tr}-${n}`)
  }, s.createElement("div", {
    className: `${Tr}-icon`
  }, a), s.createElement("div", {
    className: `${Tr}-title`
  }, r), !!i && s.createElement("div", {
    className: `${Tr}-description`
  }, i)));
}, Ae = "adm-result-page", w6 = {
  success: ff,
  error: To,
  info: pf,
  waiting: mf,
  warning: vf
}, C6 = {
  status: "info",
  details: []
}, x6 = (t) => {
  const e = U(C6, t), {
    status: n,
    title: r,
    description: i,
    details: o,
    icon: a,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = a || s.createElement(w6[n]), [m, b] = K(!0), y = At(c), v = At(l);
  return W(e, s.createElement("div", {
    className: Ae
  }, s.createElement("div", {
    className: `${Ae}-header`
  }, s.createElement("div", {
    className: `${Ae}-icon`
  }, d), s.createElement("div", {
    className: `${Ae}-title`
  }, r), At(i) ? s.createElement("div", {
    className: `${Ae}-description`
  }, i) : null, o != null && o.length ? s.createElement("div", {
    className: `${Ae}-details`
  }, (m ? o.slice(0, 3) : o).map((p, g) => s.createElement("div", {
    className: j(`${Ae}-detail`, p.bold && `${Ae}-detail-bold`),
    key: g
  }, s.createElement("span", null, p.label), s.createElement("span", null, p.value))), o.length > 3 && s.createElement("div", {
    onClick: () => b((p) => !p)
  }, s.createElement("div", {
    className: j(`${Ae}-collapse`, !m && `${Ae}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ae}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ae}-bg`
  }))), s.createElement("div", {
    className: `${Ae}-content`
  }, e.children), (v || y) && s.createElement("div", {
    className: `${Ae}-footer`
  }, y && s.createElement(It, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ae}-footer-btn`
  }, c), v && y && s.createElement("div", {
    className: `${Ae}-footer-space`
  }), v && s.createElement(It, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ae}-footer-btn`
  }, l))));
}, k6 = "adm-result-page-card", $6 = (t) => W(t, s.createElement("div", {
  className: j(`${k6}`)
}, t.children)), d8 = le(x6, {
  Card: $6
}), qt = "adm-search-bar", _6 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: s.createElement(m2, null)
}, m8 = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(_6, {
    cancelText: n.common.cancel
  }, t), [i, o] = oe(r), [a, l] = K(!1), c = V(null), u = V(!1);
  be(e, () => ({
    clear: () => {
      var d;
      return (d = c.current) === null || d === void 0 ? void 0 : d.clear();
    },
    focus: () => {
      var d;
      return (d = c.current) === null || d === void 0 ? void 0 : d.focus();
    },
    blur: () => {
      var d;
      return (d = c.current) === null || d === void 0 ? void 0 : d.blur();
    },
    get nativeElement() {
      var d, m;
      return (m = (d = c.current) === null || d === void 0 ? void 0 : d.nativeElement) !== null && m !== void 0 ? m : null;
    }
  }));
  const f = () => {
    let d;
    return typeof r.showCancelButton == "function" ? d = r.showCancelButton(a, i) : d = r.showCancelButton && a, d && s.createElement("div", {
      className: `${qt}-suffix`
    }, s.createElement(It, {
      fill: "none",
      className: `${qt}-cancel-button`,
      onClick: () => {
        var m, b, y;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (b = c.current) === null || b === void 0 || b.blur(), (y = r.onCancel) === null || y === void 0 || y.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return W(r, s.createElement("div", {
    className: j(qt, {
      [`${qt}-active`]: a
    })
  }, s.createElement("div", {
    className: `${qt}-input-box`
  }, r.icon && s.createElement("div", {
    className: `${qt}-input-box-icon`
  }, r.icon), s.createElement(s1, {
    ref: c,
    className: j(`${qt}-input`, {
      [`${qt}-input-without-icon`]: !r.icon
    }),
    value: i,
    onChange: o,
    maxLength: r.maxLength,
    placeholder: r.placeholder,
    clearable: r.clearable,
    onlyShowClearWhenFocus: r.onlyShowClearWhenFocus,
    onFocus: (d) => {
      var m;
      l(!0), (m = r.onFocus) === null || m === void 0 || m.call(r, d);
    },
    onBlur: (d) => {
      var m;
      l(!1), (m = r.onBlur) === null || m === void 0 || m.call(r, d);
    },
    onClear: r.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      var d, m;
      u.current || ((d = c.current) === null || d === void 0 || d.blur(), (m = r.onSearch) === null || m === void 0 || m.call(r, i));
    },
    "aria-label": n.SearchBar.name,
    onCompositionStart: (d) => {
      var m;
      u.current = !0, (m = r.onCompositionStart) === null || m === void 0 || m.call(r, d);
    },
    onCompositionEnd: (d) => {
      var m;
      u.current = !1, (m = r.onCompositionEnd) === null || m === void 0 || m.call(r, d);
    }
  })), f()));
}), O6 = je(() => s.createElement("svg", {
  width: "17px",
  height: "13px",
  viewBox: "0 0 17 13",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, s.createElement("g", {
  transform: "translate(-2832.000000, -1103.000000)",
  stroke: "#FFFFFF",
  strokeWidth: "3"
}, s.createElement("g", {
  transform: "translate(2610.000000, 955.000000)"
}, s.createElement("g", {
  transform: "translate(24.000000, 91.000000)"
}, s.createElement("g", {
  transform: "translate(179.177408, 36.687816)"
}, s.createElement("polyline", {
  points: "34.2767388 22 24.797043 31.4796958 21 27.6826527"
})))))))), pn = "adm-selector", S6 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, h8 = (t) => {
  const e = U(S6, t), [n, r, , i] = bi(e.fieldNames), [o, a] = oe({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (u) => {
      var f;
      const d = {
        get items() {
          return e.options.filter((m) => u.includes(m[r]));
        }
      };
      (f = e.onChange) === null || f === void 0 || f.call(e, u, d);
    }
  }), {
    locale: l
  } = ye(), c = e.options.map((u) => {
    const f = (o || []).includes(u[r]), d = u[i] || e.disabled, m = j(`${pn}-item`, {
      [`${pn}-item-active`]: f && !e.multiple,
      [`${pn}-item-multiple-active`]: f && e.multiple,
      [`${pn}-item-disabled`]: d
    });
    return s.createElement("div", {
      key: u[r],
      className: m,
      onClick: () => {
        if (!d)
          if (e.multiple) {
            const b = f ? o.filter((y) => y !== u[r]) : [...o, u[r]];
            a(b);
          } else {
            const b = f ? [] : [u[r]];
            a(b);
          }
      },
      role: "option",
      "aria-selected": f && !e.multiple || f && e.multiple
    }, u[n], u.description && s.createElement("div", {
      className: `${pn}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${pn}-check-mark-wrapper`
    }, s.createElement(O6, null)));
  });
  return W(e, s.createElement("div", {
    className: pn,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(Qd, {
    columns: e.columns
  }, c) : s.createElement(pl, {
    wrap: !0
  }, c)));
}, ba = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 30"
}, s.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("path", {
  d: "M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z",
  fill: "var(--adm-color-background)",
  transform: "translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) "
}))))), Ie = "adm-side-bar", F6 = () => null, N6 = (t) => {
  var e;
  let n = null;
  const r = [];
  ln(t.children, (c, u) => {
    if (!Mn(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, o] = oe({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = t.onChange) === null || u === void 0 || u.call(t, c));
    }
  }), a = r[r.length - 1], l = a && a.key === i;
  return W(t, s.createElement("div", {
    className: Ie
  }, s.createElement("div", {
    className: `${Ie}-items`
  }, r.map((c, u) => {
    const f = c.key === i, d = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return W(c.props, s.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: b
        } = c;
        b == null || c.props.disabled || o(b.toString());
      },
      className: j(`${Ie}-item`, {
        [`${Ie}-item-active`]: f,
        [`${Ie}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(ba, {
      className: `${Ie}-item-corner ${Ie}-item-corner-top`
    }), m && s.createElement(ba, {
      className: `${Ie}-item-corner ${Ie}-item-corner-bottom`
    })), s.createElement(Ba, {
      content: c.props.badge,
      className: `${Ie}-badge`
    }, s.createElement("div", {
      className: `${Ie}-item-title`
    }, f && s.createElement("div", {
      className: `${Ie}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: j(`${Ie}-extra-space`, l && `${Ie}-item-active-next-sibling`)
  }, l && s.createElement(ba, {
    className: `${Ie}-item-corner ${Ie}-item-corner-top`
  }))));
}, v8 = le(N6, {
  Item: F6
}), Ea = "adm-slider", P6 = ({
  points: t,
  max: e,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const o = e - n, a = t.map((l) => {
    const c = `${Math.abs(l - n) / o * 100}%`, u = l <= r && l >= i, f = {
      left: c
    }, d = j({
      [`${Ea}-tick`]: !0,
      [`${Ea}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${Ea}-ticks`
  }, a);
}, R6 = P6, wa = "adm-slider-mark", M6 = ({
  marks: t,
  upperBound: e,
  lowerBound: n,
  max: r,
  min: i
}) => {
  const o = Object.keys(t), a = r - i, l = o.map(parseFloat).sort((c, u) => c - u).filter((c) => c >= i && c <= r).map((c) => {
    const u = t[c];
    if (!u && u !== 0)
      return null;
    const f = c <= e && c >= n, d = j({
      [`${wa}-text`]: !0,
      [`${wa}-text-active`]: f
    }), m = {
      left: `${(c - i) / a * 100}%`
    };
    return s.createElement("span", {
      className: d,
      style: m,
      key: c
    }, u);
  });
  return s.createElement("div", {
    className: wa
  }, l);
}, A6 = M6;
function ms() {
  return typeof BigInt == "function";
}
function u1(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function qr(t) {
  var e = t.trim(), n = e.startsWith("-");
  n && (e = e.slice(1)), e = e.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, ""), e.startsWith(".") && (e = "0".concat(e));
  var r = e || "0", i = r.split("."), o = i[0] || "0", a = i[1] || "0";
  o === "0" && a === "0" && (n = !1);
  var l = n ? "-" : "";
  return {
    negative: n,
    negativeStr: l,
    trimStr: r,
    integerStr: o,
    decimalStr: a,
    fullStr: "".concat(l).concat(r)
  };
}
function yl(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function jr(t) {
  var e = String(t);
  if (yl(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && d1(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function f1(t) {
  var e = String(t);
  if (yl(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(ms() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(ms() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(jr(e));
  }
  return qr(e).fullStr;
}
function d1(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var T6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ei(this, t), Ve(this, "origin", ""), Ve(this, "negative", void 0), Ve(this, "integer", void 0), Ve(this, "decimal", void 0), Ve(this, "decimalLen", void 0), Ve(this, "empty", void 0), Ve(this, "nan", void 0), u1(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (yl(n) && (n = Number(n)), n = typeof n == "string" ? n : f1(n), d1(n)) {
      var r = qr(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var o = i[1] || "0";
      this.decimal = BigInt(o), this.decimalLen = o.length;
    } else
      this.nan = !0;
  }
  return wi(t, [{
    key: "getMark",
    value: function() {
      return this.negative ? "-" : "";
    }
  }, {
    key: "getIntegerStr",
    value: function() {
      return this.integer.toString();
    }
    /**
     * @private get decimal string
     */
  }, {
    key: "getDecimalStr",
    value: function() {
      return this.decimal.toString().padStart(this.decimalLen, "0");
    }
    /**
     * @private Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
     * This is used for add function only.
     */
  }, {
    key: "alignDecimal",
    value: function(n) {
      var r = "".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(n, "0"));
      return BigInt(r);
    }
  }, {
    key: "negate",
    value: function() {
      var n = new t(this.toString());
      return n.negative = !n.negative, n;
    }
  }, {
    key: "cal",
    value: function(n, r, i) {
      var o = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), a = this.alignDecimal(o), l = n.alignDecimal(o), c = r(a, l).toString(), u = i(o), f = qr(c), d = f.negativeStr, m = f.trimStr, b = "".concat(d).concat(m.padStart(u + 1, "0"));
      return new t("".concat(b.slice(0, -u), ".").concat(b.slice(-u)));
    }
  }, {
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new t(n);
      var r = new t(n);
      return r.isInvalidate() ? this : this.cal(r, function(i, o) {
        return i + o;
      }, function(i) {
        return i;
      });
    }
  }, {
    key: "multi",
    value: function(n) {
      var r = new t(n);
      return this.isInvalidate() || r.isInvalidate() ? new t(NaN) : this.cal(r, function(i, o) {
        return i * o;
      }, function(i) {
        return i * 2;
      });
    }
  }, {
    key: "isEmpty",
    value: function() {
      return this.empty;
    }
  }, {
    key: "isNaN",
    value: function() {
      return this.nan;
    }
  }, {
    key: "isInvalidate",
    value: function() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "equals",
    value: function(n) {
      return this.toString() === (n == null ? void 0 : n.toString());
    }
  }, {
    key: "lessEquals",
    value: function(n) {
      return this.add(n.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "toNumber",
    value: function() {
      return this.isNaN() ? NaN : Number(this.toString());
    }
  }, {
    key: "toString",
    value: function() {
      var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      return n ? this.isInvalidate() ? "" : qr("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), I6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ei(this, t), Ve(this, "origin", ""), Ve(this, "number", void 0), Ve(this, "empty", void 0), u1(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return wi(t, [{
    key: "negate",
    value: function() {
      return new t(-this.toNumber());
    }
  }, {
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new t(n);
      var r = Number(n);
      if (Number.isNaN(r))
        return this;
      var i = this.number + r;
      if (i > Number.MAX_SAFE_INTEGER)
        return new t(Number.MAX_SAFE_INTEGER);
      if (i < Number.MIN_SAFE_INTEGER)
        return new t(Number.MIN_SAFE_INTEGER);
      var o = Math.max(jr(this.number), jr(r));
      return new t(i.toFixed(o));
    }
  }, {
    key: "multi",
    value: function(n) {
      var r = Number(n);
      if (this.isInvalidate() || Number.isNaN(r))
        return new t(NaN);
      var i = this.number * r;
      if (i > Number.MAX_SAFE_INTEGER)
        return new t(Number.MAX_SAFE_INTEGER);
      if (i < Number.MIN_SAFE_INTEGER)
        return new t(Number.MIN_SAFE_INTEGER);
      var o = Math.max(jr(this.number), jr(r));
      return new t(i.toFixed(o));
    }
  }, {
    key: "isEmpty",
    value: function() {
      return this.empty;
    }
  }, {
    key: "isNaN",
    value: function() {
      return Number.isNaN(this.number);
    }
  }, {
    key: "isInvalidate",
    value: function() {
      return this.isEmpty() || this.isNaN();
    }
  }, {
    key: "equals",
    value: function(n) {
      return this.toNumber() === (n == null ? void 0 : n.toNumber());
    }
  }, {
    key: "lessEquals",
    value: function(n) {
      return this.add(n.negate().toString()).toNumber() <= 0;
    }
  }, {
    key: "toNumber",
    value: function() {
      return this.number;
    }
  }, {
    key: "toString",
    value: function() {
      var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      return n ? this.isInvalidate() ? "" : f1(this.number) : this.origin;
    }
  }]), t;
}();
function He(t) {
  return ms() ? new T6(t) : new I6(t);
}
function bl(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = qr(t), o = i.negativeStr, a = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(o).concat(a);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = He(t).add("".concat(o, "0.").concat("0".repeat(n)).concat(10 - f));
      return bl(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const L6 = (t) => W(t, s.createElement("svg", {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("g", {
  fill: "currentColor",
  fillRule: "evenodd"
}, s.createElement("rect", {
  x: 10,
  width: 4,
  height: 24,
  rx: 2
}), s.createElement("rect", {
  y: 4,
  width: 4,
  height: 16,
  rx: 2
}), s.createElement("rect", {
  x: 20,
  y: 4,
  width: 4,
  height: 16,
  rx: 2
})))), Ca = "adm-slider", D6 = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: o,
    residentPopover: a,
    onDrag: l
  } = t, c = V(e), {
    locale: u
  } = ye(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = K(!1), b = _t((p) => {
    var g;
    if (i)
      return;
    p.first && (c.current = e);
    const C = p.xy[0] - p.initial[0], h = (g = t.trackRef.current) === null || g === void 0 ? void 0 : g.offsetWidth;
    if (!h)
      return;
    const E = C / Math.ceil(h) * (r - n);
    l(c.current + E, p.first, p.last), m(!p.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), y = typeof t.popover == "function" ? t.popover : t.popover ? (p) => p.toString() : null, v = s.createElement("div", {
    className: `${Ca}-thumb`
  }, o || s.createElement(L6, {
    className: `${Ca}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${Ca}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), y ? s.createElement(Gd, {
    content: y(e),
    placement: "top",
    visible: a || d,
    getContainer: null,
    mode: "dark"
  }, v) : v);
}, V6 = D6, Ir = "adm-slider", j6 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, p8 = (t) => {
  var e;
  const n = U(j6, t), {
    min: r,
    max: i,
    disabled: o,
    marks: a,
    ticks: l,
    step: c,
    icon: u
  } = n;
  function f($) {
    return $.sort((M, S) => M - S);
  }
  function d($) {
    return n.range ? $ : [n.min, $];
  }
  function m($, M) {
    const S = He($), O = bl(S.toString(), ".", M);
    return He(O).toNumber();
  }
  function b($) {
    const M = Math.max(y(c), y($[0]), y($[1]));
    return n.range ? $.map((S) => m(S, M)) : m($[1], M);
  }
  function y($) {
    return (`${$}`.split(".")[1] || "").length;
  }
  function v($) {
    var M;
    (M = n.onAfterChange) === null || M === void 0 || M.call(n, b($));
  }
  let p = n.value;
  n.range && typeof n.value == "number" && (p = [0, n.value]);
  const [g, C] = oe({
    value: p,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), h = f(d(g));
  function E($) {
    const M = f($), S = h;
    M[0] === S[0] && M[1] === S[1] || C(b(M));
  }
  const w = V(null), x = `${100 * (h[1] - h[0]) / (i - r)}%`, k = `${100 * (h[0] - r) / (i - r)}%`, N = ie(() => {
    if (a)
      return Object.keys(a).map(parseFloat).sort(($, M) => $ - M);
    if (l) {
      const $ = [];
      for (let M = He(r); M.lessEquals(He(i)); M = M.add(c))
        $.push(M.toNumber());
      return $;
    }
    return [];
  }, [a, l, c, r, i]);
  function F($) {
    const M = $ < r ? r : $ > i ? i : $;
    let S = r;
    if (N.length)
      S = el(N, M);
    else {
      const O = Math.round((M - r) / c), A = He(O).multi(c);
      S = He(r).add(A.toString()).toNumber();
    }
    return S;
  }
  const _ = V(0), D = ($) => {
    if (_.current > 0 || ($.stopPropagation(), o))
      return;
    const M = w.current;
    if (!M)
      return;
    const S = M.getBoundingClientRect().left, O = ($.clientX - S) / Math.ceil(M.offsetWidth) * (i - r) + r, A = F(O);
    let P;
    n.range ? Math.abs(A - h[0]) > Math.abs(A - h[1]) ? P = [h[0], A] : P = [A, h[1]] : P = [n.min, A], E(P), v(P);
  }, I = V(), R = ($) => s.createElement(V6, {
    key: $,
    value: h[$],
    min: r,
    max: i,
    disabled: o,
    trackRef: w,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (M, S, O) => {
      S && (_.current += 1, I.current = h);
      const A = F(M), P = I.current;
      if (!P)
        return;
      const T = [...P];
      T[$] = A, E(T), O && (v(T), window.setTimeout(() => {
        _.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return W(n, s.createElement("div", {
    className: j(Ir, {
      [`${Ir}-disabled`]: o
    })
  }, s.createElement("div", {
    className: `${Ir}-track-container`,
    onClick: D
  }, s.createElement("div", {
    className: `${Ir}-track`,
    onClick: D,
    ref: w
  }, s.createElement("div", {
    className: `${Ir}-fill`,
    style: {
      width: x,
      left: k
    }
  }), n.ticks && s.createElement(R6, {
    points: N,
    min: r,
    max: i,
    lowerBound: h[0],
    upperBound: h[1]
  }), n.range && R(0), R(1))), a && s.createElement(A6, {
    min: r,
    max: i,
    marks: a,
    lowerBound: h[0],
    upperBound: h[1]
  })));
};
function su(t) {
  var e = L.useRef();
  e.current = t;
  var n = L.useCallback(function() {
    for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(o));
  }, []);
  return n;
}
function B6() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var lu = B6() ? L.useLayoutEffect : L.useEffect, W6 = function(e, n) {
  var r = L.useRef(!0);
  lu(function() {
    return e(r.current);
  }, n), lu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, cu = function(e, n) {
  W6(function(r) {
    if (!r)
      return e();
  }, n);
};
function uu(t) {
  var e = L.useRef(!1), n = L.useState(t), r = nn(n, 2), i = r[0], o = r[1];
  L.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function a(l, c) {
    c && e.current || o(l);
  }
  return [i, a];
}
function xa(t) {
  return t !== void 0;
}
function Z6(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, o = n.onChange, a = n.postState, l = uu(function() {
    return xa(i) ? i : xa(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = nn(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = a ? a(d) : d, b = su(o), y = uu([d]), v = nn(y, 2), p = v[0], g = v[1];
  cu(function() {
    var h = p[0];
    u !== h && b(u, h);
  }, [p]), cu(function() {
    xa(i) || f(i);
  }, [i]);
  var C = su(function(h, E) {
    f(h, E), g([d], E);
  });
  return [m, C];
}
const qn = "adm-stepper", H6 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function z6(t, e) {
  const n = U(H6, t), {
    defaultValue: r = 0,
    value: i,
    onChange: o,
    disabled: a,
    step: l,
    max: c,
    min: u,
    inputReadOnly: f,
    digits: d,
    stringMode: m,
    formatter: b,
    parser: y
  } = n, {
    locale: v
  } = ye();
  be(e, () => ({
    focus: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.focus();
    },
    blur: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.blur();
    },
    get nativeElement() {
      var P, T;
      return (T = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) !== null && T !== void 0 ? T : null;
    }
  }));
  const p = (P) => (d !== void 0 ? bl(P.toString(), ".", d) : P).toString(), g = (P) => m ? P.toString() : P.toNumber(), C = (P) => {
    if (P === "")
      return null;
    if (y)
      return String(y(P));
    const T = He(P);
    return T.isInvalidate() ? null : T.toString();
  }, h = (P) => P === null ? "" : b ? b(P) : p(P), [E, w] = Z6(r, {
    value: i,
    onChange: (P) => {
      o == null || o(P);
    }
  }), [x, k] = K(() => h(E));
  function N(P) {
    if (P.isNaN())
      return;
    let T = P;
    if (u !== void 0) {
      const B = He(u);
      T.lessEquals(B) && (T = B);
    }
    if (c !== void 0) {
      const B = He(c);
      B.lessEquals(T) && (T = B);
    }
    d !== void 0 && (T = He(p(g(T)))), w(g(T));
  }
  const F = (P) => {
    k(P);
    const T = C(P);
    T === null ? n.allowEmpty ? w(null) : w(r) : N(He(T));
  }, [_, D] = K(!1), I = s.useRef(null);
  function R(P) {
    D(P), P && k(E != null ? String(E) : "");
  }
  X(() => {
    var P, T, B;
    _ && ((B = (T = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) === null || T === void 0 ? void 0 : T.select) === null || B === void 0 || B.call(T));
  }, [_]), X(() => {
    _ || k(h(E));
  }, [_, E, d]);
  const $ = (P) => {
    let T = He(l);
    P || (T = T.negate()), N(He(E ?? 0).add(T.toString()));
  }, M = () => {
    $(!1);
  }, S = () => {
    $(!0);
  }, O = () => a ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, A = () => a ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: j(qn, {
      [`${qn}-active`]: _
    })
  }, s.createElement(It, {
    className: `${qn}-minus`,
    onClick: M,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.decrease
  }, s.createElement(u2, null)), s.createElement("div", {
    className: `${qn}-middle`
  }, s.createElement(s1, {
    ref: I,
    className: `${qn}-input`,
    onFocus: (P) => {
      var T;
      R(!0), (T = n.onFocus) === null || T === void 0 || T.call(n, P);
    },
    value: x,
    onChange: (P) => {
      a || F(P);
    },
    disabled: a,
    onBlur: (P) => {
      var T;
      R(!1), (T = n.onBlur) === null || T === void 0 || T.call(n, P);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(It, {
    className: `${qn}-plus`,
    onClick: S,
    disabled: A(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.increase
  }, s.createElement(uf, null))));
}
const g8 = me(z6), gn = "adm-step", U6 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, s.createElement("div", {
    className: j(`${gn}`, `${gn}-status-${i}`)
  }, s.createElement("div", {
    className: `${gn}-indicator`
  }, s.createElement("div", {
    className: `${gn}-icon-container`
  }, r)), s.createElement("div", {
    className: `${gn}-content`
  }, s.createElement("div", {
    className: `${gn}-title`
  }, e), !!n && s.createElement("div", {
    className: `${gn}-description`
  }, n))));
}, fu = "adm-steps", q6 = "adm-step", K6 = s.createElement("span", {
  className: `${q6}-icon-dot`
}), Y6 = {
  current: 0,
  direction: "horizontal"
}, G6 = (t) => {
  const e = U(Y6, t), {
    direction: n,
    current: r
  } = e, i = j(fu, `${fu}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (o, a) => {
    var l;
    if (!s.isValidElement(o))
      return o;
    const c = o.props;
    let u = c.status || "wait";
    a < r ? u = c.status || "finish" : a === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : K6;
    return s.cloneElement(o, {
      status: u,
      icon: f
    });
  })));
}, y8 = le(G6, {
  Step: U6
}), Kt = "adm-swipe-action", X6 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, b8 = me((t, e) => {
  const n = U(X6, t), r = V(null), i = V(null), o = V(null);
  function a(g) {
    const C = g.current;
    return C ? C.offsetWidth : 0;
  }
  function l() {
    return a(i);
  }
  function c() {
    return a(o);
  }
  const [{
    x: u
  }, f] = Re(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = V(!1), m = V(null);
  function b() {
    var g;
    (g = m.current) === null || g === void 0 || g.call(m), d.current = !1;
  }
  const y = _t((g) => {
    var C;
    if (m.current = g.cancel, !g.intentional || (g.down && (d.current = !0), !d.current))
      return;
    const [h] = g.offset;
    if (g.last) {
      const E = l(), w = c();
      let x = h + g.velocity[0] * g.direction[0] * 50;
      h > 0 ? x = Math.max(0, x) : h < 0 ? x = Math.min(0, x) : x = 0;
      const k = el([-w, 0, E], x);
      f.start({
        x: k
      }), k !== 0 && ((C = t.onActionsReveal) === null || C === void 0 || C.call(t, k > 0 ? "left" : "right")), window.setTimeout(() => {
        d.current = !1;
      });
    } else
      f.start({
        x: h,
        immediate: !0
      });
  }, {
    from: () => [u.get(), 0],
    bounds: () => {
      const g = l();
      return {
        left: -c(),
        right: g
      };
    },
    axis: "x",
    preventScroll: !0,
    pointer: {
      touch: !0
    },
    triggerAllEvents: !0
  });
  function v() {
    f.start({
      x: 0
    }), b();
  }
  be(e, () => ({
    show: (g = "right") => {
      var C;
      g === "right" ? f.start({
        x: -c()
      }) : g === "left" && f.start({
        x: l()
      }), (C = t.onActionsReveal) === null || C === void 0 || C.call(t, g);
    },
    close: v
  })), X(() => {
    if (!n.closeOnTouchOutside)
      return;
    function g(C) {
      if (u.get() === 0)
        return;
      const h = r.current;
      h && !h.contains(C.target) && v();
    }
    return document.addEventListener("touchstart", g), () => {
      document.removeEventListener("touchstart", g);
    };
  }, [n.closeOnTouchOutside]);
  function p(g) {
    var C, h;
    const E = (C = g.color) !== null && C !== void 0 ? C : "light";
    return s.createElement(It, {
      key: g.key,
      className: `${Kt}-action-button`,
      style: {
        "--background-color": (h = Q6[E]) !== null && h !== void 0 ? h : E
      },
      onClick: (w) => {
        var x, k;
        n.closeOnAction && v(), (x = g.onClick) === null || x === void 0 || x.call(g, w), (k = n.onAction) === null || k === void 0 || k.call(n, g, w);
      }
    }, g.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: Kt
  }, y(), {
    ref: r,
    onClickCapture: (g) => {
      d.current && (g.stopPropagation(), g.preventDefault());
    }
  }), s.createElement(ge.div, {
    className: `${Kt}-track`,
    style: {
      x: u
    }
  }, tn(n.stopPropagation, s.createElement("div", {
    className: `${Kt}-actions ${Kt}-actions-left`,
    ref: i
  }, n.leftActions.map(p))), s.createElement("div", {
    className: `${Kt}-content`,
    onClickCapture: (g) => {
      u.goal !== 0 && (g.preventDefault(), g.stopPropagation(), v());
    }
  }, s.createElement(ge.div, {
    style: {
      pointerEvents: u.to((g) => g !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), tn(n.stopPropagation, s.createElement("div", {
    className: `${Kt}-actions ${Kt}-actions-right`,
    ref: o
  }, n.rightActions.map(p))))));
}), Q6 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, m1 = (t) => W(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function J6(t) {
  const [e, n] = K(t), r = V(e);
  return X(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function e7(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), o = {};
  return i.forEach((a) => {
    const l = t[a], c = e[a];
    typeof l == "function" && typeof c == "function" ? o[a] = function(...u) {
      l(...u), c(...u);
    } : o[a] = l || c;
  }), o;
}
const yt = "adm-swiper", t7 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, n7 = {
  defaultIndex: 0,
  allowTouchMove: !0,
  autoplay: !1,
  autoplayInterval: 3e3,
  loop: !1,
  direction: "horizontal",
  slideSize: 100,
  trackOffset: 0,
  stuckAtBoundary: !0,
  rubberband: !0,
  stopPropagation: []
};
let Zi;
const r7 = me(Zs((t, e) => {
  const n = U(n7, t), {
    direction: r,
    total: i,
    children: o,
    indicator: a
  } = n, [l] = K({}), c = V(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: y
  } = ie(() => {
    let p = 0, g, C;
    return typeof o == "function" ? g = o : C = s.Children.map(o, (h) => !s.isValidElement(h) || h.type !== m1 ? null : (p++, h)), {
      renderChildren: g,
      validChildren: C,
      count: p
    };
  }, [o]), v = i ?? b;
  return v === 0 || !m && !y ? null : () => {
    let p = n.loop;
    f * (v - 1) < 1 && (p = !1);
    const g = V(null);
    function C() {
      const z = g.current;
      return z ? (u ? z.offsetHeight : z.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [h, E, w] = Y0(n.defaultIndex), [x, k, N] = J6(!1);
    function F(z) {
      let ee = 0, J = v - 1;
      return n.stuckAtBoundary && (ee += d / f, J -= (1 - f - d) / f), $e(z, ee, J);
    }
    const [{
      position: _
    }, D] = Re(() => ({
      position: F(h) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (N.current || !p)
          return;
        const z = _.get(), ee = 100 * v, J = ka(z, ee);
        J !== z && D.start({
          position: J,
          immediate: !0
        });
      }
    }), [v]), I = V(null);
    function R() {
      var z;
      (z = I.current) === null || z === void 0 || z.call(I), N.current = !1;
    }
    const $ = _t((z) => {
      if (I.current = z.cancel, !z.intentional || (z.first && !Zi && (Zi = l), Zi !== l))
        return;
      Zi = z.last ? void 0 : l;
      const ee = C();
      if (!ee)
        return;
      const J = u ? 1 : 0, te = z.offset[J], Ce = z.direction[J], Le = z.velocity[J];
      if (k(!0), !z.last)
        D.start({
          position: te * 100 / ee,
          immediate: !0
        });
      else {
        const Me = Math.floor(te / ee), cn = Me + 1, g1 = Math.round((te + Le * 2e3 * Ce) / ee);
        M($e(g1, Me, cn)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([z, ee]) => [-z, -ee],
      from: () => {
        const z = C();
        return [_.get() / 100 * z, _.get() / 100 * z];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (p)
          return {};
        const z = C(), ee = F(0) * z, J = F(v - 1) * z;
        return u ? {
          top: ee,
          bottom: J
        } : {
          left: ee,
          right: J
        };
      },
      rubberband: n.rubberband,
      axis: u ? "y" : "x",
      preventScroll: !u,
      pointer: {
        touch: !0
      }
    });
    function M(z, ee = !1) {
      var J;
      const te = Math.round(z), Ce = p ? ka(te, v) : $e(te, 0, v - 1);
      Ce !== w() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, Ce)), E(Ce), D.start({
        position: (p ? te : F(te)) * 100,
        immediate: ee
      });
    }
    function S() {
      M(Math.round(_.get() / 100) + 1);
    }
    function O() {
      M(Math.round(_.get() / 100) - 1);
    }
    be(e, () => ({
      swipeTo: M,
      swipeNext: S,
      swipePrev: O
    })), Fe(() => {
      const z = v - 1;
      h > z && M(z, !0);
    });
    const {
      autoplay: A,
      autoplayInterval: P
    } = n, T = () => {
      c.current = window.setTimeout(() => {
        A === "reverse" ? O() : S(), T();
      }, P);
    };
    X(() => {
      if (!(!A || x))
        return T(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [A, P, x, v]);
    function B(z, ee) {
      let J = {};
      return p && (J = {
        [u ? "y" : "x"]: _.to((te) => {
          let Ce = -te + z * 100;
          const Le = v * 100, Me = Le / 2;
          return Ce = ka(Ce + Me, Le) - Me, `${Ce}%`;
        }),
        [u ? "top" : "left"]: `-${z * 100}%`
      }), s.createElement(ge.div, {
        className: j(`${yt}-slide`, {
          [`${yt}-slide-active`]: h === z
        }),
        style: J,
        key: z
      }, ee);
    }
    function Z() {
      if (y && i) {
        const ee = Math.max(h - 2, 0), J = Math.min(h + 2, i - 1), te = [];
        for (let Ce = ee; Ce <= J; Ce += 1)
          te.push(B(Ce, y(Ce)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${yt}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), te);
      }
      return s.Children.map(m, (z, ee) => B(ee, z));
    }
    function q() {
      return p ? s.createElement("div", {
        className: `${yt}-track-inner`
      }, Z()) : s.createElement(ge.div, {
        className: `${yt}-track-inner`,
        style: {
          [u ? "y" : "x"]: _.to((z) => `${-z}%`)
        }
      }, Z());
    }
    const Y = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, G = Object.assign({}, n.allowTouchMove ? $() : {}), ce = {};
    for (const z of n.stopPropagation) {
      const ee = t7[z];
      ce[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const he = e7(G, ce);
    let Ee = null;
    return typeof a == "function" ? Ee = a(v, h) : a !== !1 && (Ee = s.createElement("div", {
      className: `${yt}-indicator`
    }, s.createElement(c6, Object.assign({}, n.indicatorProps, {
      total: v,
      current: h,
      direction: r
    })))), W(n, s.createElement("div", {
      className: j(yt, `${yt}-${r}`),
      style: Y
    }, s.createElement("div", Object.assign({
      ref: g,
      className: j(`${yt}-track`, {
        [`${yt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (z) => {
        N.current && z.stopPropagation(), R();
      }
    }, he), q()), Ee));
  };
}));
function ka(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const E8 = le(r7, {
  Item: m1
}), i7 = je((t) => W(t, s.createElement("svg", {
  width: "28px",
  height: "28px",
  viewBox: "0 0 28 28"
}, s.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, s.createElement("g", {
  transform: "translate(-137.000000, -840.000000)",
  fill: "#1576FE"
}, s.createElement("g", {
  transform: "translate(80.000000, 823.000000)"
}, s.createElement("g", {
  transform: "translate(53.000000, 13.000000)"
}, s.createElement("path", {
  d: "M17.9996753,31.5 C10.5556724,31.5 4.5,25.4443275 4.5,18.0003247 C4.5,10.5563219 10.5556724,4.5 17.9996753,4.5 C18.5355492,4.5 18.9702974,4.93474816 18.9702974,5.47062208 C18.9702974,6.006496 18.5355492,6.44124416 17.9996753,6.44124416 C11.6261524,6.44124416 6.44124416,11.6267709 6.44124416,18.0002938 C6.44124416,24.3738167 11.6261524,29.5587249 17.9996753,29.5587249 C24.3731982,29.5587249 29.5587249,24.3738167 29.5587249,18.0002938 C29.5587249,14.7964616 28.2778291,11.8169616 25.9523687,9.61220279 C25.5637302,9.24317094 25.5473089,8.62893223 25.9157222,8.23967523 C26.2841356,7.84976878 26.8989928,7.83461537 27.2882498,8.20302872 C30.0042351,10.7787368 31.5,14.2580826 31.5,18.0002938 C31.5,25.4443275 25.4436781,31.5 17.9996753,31.5 Z"
})))))))), yn = "adm-switch", o7 = {
  defaultChecked: !1
}, w8 = (t) => {
  const e = U(o7, t), n = e.disabled || e.loading || !1, [r, i] = K(!1), {
    locale: o
  } = ye(), [a, l] = oe({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Oe(this, void 0, void 0, function* () {
      if (n || e.loading || r)
        return;
      const u = !a;
      if (e.beforeChange) {
        i(!0);
        try {
          yield e.beforeChange(u), i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
      const f = l(u);
      if (Mf(f)) {
        i(!0);
        try {
          yield f, i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
    });
  }
  return W(e, s.createElement("div", {
    onClick: c,
    className: j(yn, {
      [`${yn}-checked`]: a,
      [`${yn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": o.Switch.name,
    "aria-checked": a,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${yn}-checkbox`
  }, s.createElement("div", {
    className: `${yn}-handle`
  }, (e.loading || r) && s.createElement(i7, {
    className: `${yn}-spin-icon`
  })), s.createElement("div", {
    className: `${yn}-inner`
  }, a ? e.checkedText : e.uncheckedText))));
}, a7 = () => null, Nt = "adm-tab-bar", s7 = {
  safeArea: !1
}, l7 = (t) => {
  var e;
  const n = U(s7, t);
  let r = null;
  const i = [];
  ln(n.children, (l, c) => {
    if (!Mn(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [o, a] = oe({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : r,
    onChange: (l) => {
      var c;
      l !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, l));
    }
  });
  return W(n, s.createElement("div", {
    className: Nt
  }, s.createElement("div", {
    className: `${Nt}-wrap`
  }, i.map((l) => {
    const c = l.key === o;
    function u() {
      const f = l.props.icon && s.createElement("div", {
        className: `${Nt}-item-icon`
      }, typeof l.props.icon == "function" ? l.props.icon(c) : l.props.icon), d = l.props.title && s.createElement("div", {
        className: j(`${Nt}-item-title`, !!f && `${Nt}-item-title-with-icon`)
      }, typeof l.props.title == "function" ? l.props.title(c) : l.props.title);
      return f ? s.createElement(s.Fragment, null, s.createElement(Ba, {
        content: l.props.badge,
        className: `${Nt}-icon-badge`
      }, f), d) : d ? s.createElement(Ba, {
        content: l.props.badge,
        className: `${Nt}-title-badge`
      }, d) : null;
    }
    return W(l.props, s.createElement("div", {
      key: l.key,
      onClick: () => {
        const {
          key: f
        } = l;
        f != null && a(f.toString());
      },
      className: j(`${Nt}-item`, {
        [`${Nt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(yr, {
    position: "bottom"
  })));
}, C8 = le(l7, {
  Item: a7
}), du = "adm-tag", c7 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, u7 = {
  color: "default",
  fill: "solid",
  round: !1
}, x8 = (t) => {
  var e;
  const n = U(u7, t), r = (e = c7[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(du, {
      [`${du}-round`]: n.round
    })
  }, n.children));
}, Lr = "adm-text-area", h1 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, f7 = me((t, e) => {
  const n = U(h1, t), {
    autoSize: r,
    showCount: i,
    maxLength: o
  } = n, [a, l] = oe(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = V(null), u = V("auto"), f = V(null), d = a1({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown,
    nativeInputRef: c,
    enterKeyHint: n.enterKeyHint
  });
  be(e, () => ({
    clear: () => {
      l("");
    },
    focus: () => {
      var p;
      (p = c.current) === null || p === void 0 || p.focus();
    },
    blur: () => {
      var p;
      (p = c.current) === null || p === void 0 || p.blur();
    },
    get nativeElement() {
      return c.current;
    }
  })), Fe(() => {
    if (!r)
      return;
    const p = c.current, g = f.current;
    if (!p || (p.style.height = u.current, !g))
      return;
    let C = g.scrollHeight;
    if (typeof r == "object") {
      const h = window.getComputedStyle(p), E = parseFloat(h.lineHeight);
      r.minRows && (C = Math.max(C, r.minRows * E)), r.maxRows && (C = Math.min(C, r.maxRows * E));
    }
    u.current = `${C}px`, p.style.height = `${C}px`;
  }, [a, r]);
  const m = V(!1);
  let b;
  const y = Yi(a).length;
  typeof i == "function" ? b = i(y, o) : i && (b = s.createElement("div", {
    className: `${Lr}-count`
  }, o === void 0 ? y : y + "/" + o));
  let v = n.rows;
  return typeof r == "object" && (r.maxRows && v > r.maxRows && (v = r.maxRows), r.minRows && v < r.minRows && (v = r.minRows)), W(n, s.createElement("div", {
    className: Lr
  }, s.createElement("textarea", {
    ref: c,
    className: `${Lr}-element`,
    rows: v,
    value: a,
    placeholder: n.placeholder,
    onChange: (p) => {
      let g = p.target.value;
      o && !m.current && (g = Yi(g).slice(0, o).join("")), l(g);
    },
    id: n.id,
    onCompositionStart: (p) => {
      var g;
      m.current = !0, (g = n.onCompositionStart) === null || g === void 0 || g.call(n, p);
    },
    onCompositionEnd: (p) => {
      var g;
      if (m.current = !1, o) {
        const C = p.target.value;
        l(Yi(C).slice(0, o).join(""));
      }
      (g = n.onCompositionEnd) === null || g === void 0 || g.call(n, p);
    },
    autoComplete: n.autoComplete,
    autoFocus: n.autoFocus,
    disabled: n.disabled,
    readOnly: n.readOnly,
    name: n.name,
    onFocus: n.onFocus,
    onBlur: n.onBlur,
    onClick: n.onClick,
    onKeyDown: d
  }), b, r && s.createElement("textarea", {
    ref: f,
    className: `${Lr}-element ${Lr}-element-hidden`,
    value: a,
    rows: v,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
f7.defaultProps = h1;
const Pt = "adm-toast", d7 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, m7 = (t) => {
  const e = U(d7, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: o
  } = e, a = ie(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(df, {
          className: `${Pt}-icon-success`
        });
      case "fail":
        return s.createElement(hi, {
          className: `${Pt}-icon-fail`
        });
      case "loading":
        return s.createElement(Ks, {
          color: "white",
          className: `${Pt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = ie(() => {
    switch (o) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [o]);
  return s.createElement(mi, {
    visible: e.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: e.getContainer,
    afterClose: e.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, e.maskStyle),
    className: j(`${Pt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: j(`${Pt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: j(`${Pt}-main`, i ? `${Pt}-main-icon` : `${Pt}-main-text`)
  }, a && s.createElement("div", {
    className: `${Pt}-icon`
  }, a), s.createElement(ti, null, r))));
};
let Tt = null, $a = null;
const Qi = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, h7 = (t) => s.createElement(m7, Object.assign({}, t));
function v7(t) {
  const e = U(Qi, typeof t == "string" ? {
    content: t
  } : t), n = s.createElement(h7, Object.assign({}, e, {
    onClose: () => {
      Tt = null;
    }
  }));
  return Tt ? Tt.replace(n) : Tt = br(n), $a && window.clearTimeout($a), e.duration !== 0 && ($a = window.setTimeout(() => {
    v1();
  }, e.duration)), Tt;
}
function v1() {
  Tt == null || Tt.close(), Tt = null;
}
function p7(t) {
  t.duration !== void 0 && (Qi.duration = t.duration), t.position !== void 0 && (Qi.position = t.position), t.maskClickable !== void 0 && (Qi.maskClickable = t.maskClickable);
}
const g7 = {
  show: v7,
  clear: v1,
  config: p7
}, k8 = g7;
function p1(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((o) => {
      o[e] ? i = Math.max(i, n(o[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const Hi = "adm-tree-select", y7 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, b7 = (t) => {
  const e = U(y7, t), [n, r, i] = bi(e.fieldNames), [o, a] = oe({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = ie(() => {
    const b = p1(e.options, i), y = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
    function p(g, C) {
      C.forEach((h) => {
        v.set(h[r], g), y.set(h[r], h), h[i] && p(h, h[i]);
      });
    }
    return p(void 0, e.options), [b, y, v];
  }, [e.options]), f = (b) => {
    var y;
    const v = [];
    let p = b;
    for (; p; )
      v.push(p), p = u.get(p[r]);
    const g = v.reverse().map((C) => C[r]);
    a(g), (y = e.onChange) === null || y === void 0 || y.call(e, g, {
      options: v
    });
  }, d = (b = [], y) => b.map((v) => {
    const p = v[r] === o[y];
    return s.createElement("div", {
      key: v[r],
      className: j(`${Hi}-item`, {
        [`${Hi}-item-active`]: p
      }),
      onClick: () => {
        p || f(v);
      }
    }, v[n]);
  }), m = () => {
    var b;
    const y = [];
    for (let v = 0; v < l; v++) {
      let p = `${100 / l}%`;
      l === 2 && v === 0 && (p = "33.33%"), l === 2 && v === 1 && (p = "66.67%");
      const g = s.createElement("div", {
        key: v,
        className: j(`${Hi}-column`),
        style: {
          width: p
        }
      }, d(v === 0 ? e.options : (b = c.get(o[v - 1])) === null || b === void 0 ? void 0 : b[i], v));
      y.push(g);
    }
    return y;
  };
  return W(e, s.createElement("div", {
    className: Hi
  }, m()));
}, et = "adm-tree-select-multiple", E7 = (t) => {
  const e = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  X(() => {
  }, []);
  const [n, r, i] = bi(e.fieldNames), [o, a] = oe({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = oe({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const N = [], F = (_) => {
      var D;
      _ && (!((D = _[i]) === null || D === void 0) && D.length ? _[i].forEach((I) => F(I)) : N.push(_[r]));
    };
    return F(k), N;
  }, [f, d, m] = ie(() => {
    const k = p1(e.options, i), N = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
    function _(D, I) {
      I.forEach((R) => {
        F.set(R[r], D), N.set(R[r], R), R[i] && _(R, R[i]);
      });
    }
    return _(void 0, e.options), [k, N, F];
  }, [e.options]), b = ie(() => {
    let k = [];
    return l.forEach((N) => {
      const F = d.get(N);
      k = k.concat(u(F));
    }), k;
  }, [l, d]), y = ie(() => {
    const k = /* @__PURE__ */ new Map(), N = (F) => {
      const _ = m.get(F);
      _ && (k.set(_[r], !0), N(_[r]));
    };
    return b.forEach((F) => {
      k.set(F, !0), N(F);
    }), k;
  }, [m, l]), v = (k) => {
    var N;
    let F = [...k], _ = [];
    const D = (R) => {
      R.forEach(($) => {
        var M;
        if (_.includes($))
          return;
        const S = m.get($);
        if (!S)
          return;
        const O = ((M = S[i]) === null || M === void 0 ? void 0 : M.map((A) => A[r])) || [];
        O.every((A) => F.includes(A)) && (F.push(S[r]), _ = _.concat(O));
      });
    };
    for (let R = 0; R < f; R++)
      D(F);
    F = F.filter((R) => !_.includes(R));
    const I = F.map((R) => d.get(R));
    c(F), (N = e.onChange) === null || N === void 0 || N.call(e, F, I);
  }, p = (k) => {
    var N;
    const F = [];
    let _ = k;
    for (; _; )
      F.unshift(_), _ = m.get(_[r]);
    const D = F.map((I) => I[r]);
    a(D), (N = e.onExpand) === null || N === void 0 || N.call(e, D, F);
  }, g = (k, N) => {
    var F;
    const _ = (F = e.selectAllText) === null || F === void 0 ? void 0 : F[N];
    if (!_)
      return;
    let D = [];
    k.forEach((R) => {
      D = D.concat(u(R));
    });
    const I = D.every((R) => b.includes(R));
    return s.createElement("div", {
      onClick: () => {
        v(I ? b.filter((R) => !D.includes(R)) : b.concat(D));
      },
      className: `${et}-item`
    }, _);
  }, C = (k, N) => {
    var F;
    const _ = (F = e.selectAllText) === null || F === void 0 ? void 0 : F[N];
    if (!_)
      return;
    const D = k.map(($) => $[r]), I = D.every(($) => b.includes($)), R = I ? !1 : D.some(($) => b.includes($));
    return s.createElement("div", {
      onClick: () => {
        v(I ? b.filter(($) => !D.includes($)) : b.concat(D));
      },
      className: j(`${et}-item`, `${et}-item-leaf`)
    }, s.createElement(Sc, {
      className: `${et}-item-checkbox`,
      checked: I,
      indeterminate: R
    }), _);
  }, h = (k) => {
    const N = o.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        N || p(k);
      },
      className: j(`${et}-item`, {
        [`${et}-item-expand`]: N
      })
    }, k[n], !!y.get(k[r]) && s.createElement("div", {
      className: `${et}-dot`
    }));
  }, E = (k) => {
    const N = b.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        v(N ? b.filter((F) => F !== k[r]) : [...b, k[r]]);
      },
      className: j(`${et}-item`, `${et}-item-leaf`)
    }, s.createElement(Sc, {
      className: `${et}-item-checkbox`,
      checked: N
    }), k[n]);
  }, w = (k = [], N) => k.length === 0 ? void 0 : f === N + 1 ? s.createElement(s.Fragment, null, C(k, N), k.map((_) => E(_))) : s.createElement(s.Fragment, null, g(k, N), k.map((_) => h(_))), x = () => {
    var k;
    const N = [];
    for (let F = 0; F < f; F++) {
      let _ = `${100 / f}%`;
      f === 2 && F === 0 && (_ = "33.33%"), f === 2 && F === 1 && (_ = "66.67%");
      const D = s.createElement("div", {
        key: F,
        className: j(`${et}-column`),
        style: {
          width: _
        }
      }, w(F === 0 ? e.options : (k = d.get(o[F - 1])) === null || k === void 0 ? void 0 : k[i], F));
      N.push(D);
    }
    return N;
  };
  return W(e, s.createElement("div", {
    className: et
  }, x()));
}, $8 = le(b7, {
  Multiple: E7
}), bn = "adm-virtual-input", w7 = {
  defaultValue: ""
}, _8 = me((t, e) => {
  const n = U(w7, t), [r, i] = oe(n), o = V(null), a = V(null), [l, c] = K(!1), {
    locale: u
  } = ye();
  function f() {
    const v = o.current;
    if (!v || document.activeElement !== v)
      return;
    const p = a.current;
    p && (p.scrollLeft = p.clientWidth);
  }
  Fe(() => {
    f();
  }, [r]), X(() => {
    l && f();
  }, [l]), be(e, () => ({
    focus: () => {
      var v;
      (v = o.current) === null || v === void 0 || v.focus();
    },
    blur: () => {
      var v;
      (v = o.current) === null || v === void 0 || v.blur();
    }
  }));
  function d() {
    var v;
    c(!0), (v = n.onFocus) === null || v === void 0 || v.call(n);
  }
  function m() {
    var v;
    c(!1), (v = n.onBlur) === null || v === void 0 || v.call(n);
  }
  const b = n.keyboard, y = b && s.cloneElement(b, {
    onInput: (v) => {
      var p, g;
      i(r + v), (g = (p = b.props).onInput) === null || g === void 0 || g.call(p, v);
    },
    onDelete: () => {
      var v, p;
      i(r.slice(0, -1)), (p = (v = b.props).onDelete) === null || p === void 0 || p.call(v);
    },
    visible: l,
    onClose: () => {
      var v, p, g, C;
      const h = document.activeElement;
      h && (!((v = o.current) === null || v === void 0) && v.contains(h)) ? h.blur() : (p = o.current) === null || p === void 0 || p.blur(), (C = (g = b.props).onClose) === null || C === void 0 || C.call(g);
    },
    getContainer: null
  });
  return W(n, s.createElement("div", {
    ref: o,
    className: j(bn, {
      [`${bn}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: d,
    onBlur: m,
    onClick: n.onClick
  }, s.createElement("div", {
    className: `${bn}-content`,
    ref: a,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, s.createElement("div", {
    className: `${bn}-caret-container`
  }, l && s.createElement("div", {
    className: `${bn}-caret`
  }))), n.clearable && !!r && l && s.createElement("div", {
    className: `${bn}-clear`,
    onClick: (v) => {
      var p;
      v.stopPropagation(), i(""), (p = n.onClear) === null || p === void 0 || p.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, s.createElement(To, null)), [void 0, null, ""].includes(r) && s.createElement("div", {
    className: `${bn}-placeholder`
  }, n.placeholder), y));
}), mu = "adm-water-mark", C7 = {
  fullPage: !0
}, O8 = (t) => {
  const e = U(C7, t), {
    zIndex: n,
    gapX: r = 24,
    gapY: i = 48,
    width: o = 120,
    height: a = 64,
    rotate: l = -22,
    image: c,
    imageWidth: u = 120,
    imageHeight: f = 64,
    content: d,
    fontStyle: m = "normal",
    fontWeight: b = "normal",
    fontColor: y = "rgba(0,0,0,.15)",
    fontSize: v = 14,
    fontFamily: p = "sans-serif"
  } = e, [g, C] = K("");
  return X(() => {
    const h = document.createElement("canvas"), E = window.devicePixelRatio, w = h.getContext("2d"), x = `${(r + o) * E}px`, k = `${(i + a) * E}px`, N = o * E, F = a * E;
    if (h.setAttribute("width", x), h.setAttribute("height", k), w) {
      if (c) {
        w.translate(N / 2, F / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = new Image();
        _.crossOrigin = "anonymous", _.referrerPolicy = "no-referrer", _.onload = () => {
          w.drawImage(_, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), C(h.toDataURL());
        }, _.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate(N / 2, F / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = Number(v) * E;
        w.font = `${m} normal ${b} ${_}px/${F}px ${p}`, w.fillStyle = y, Array.isArray(d) ? d.forEach((D, I) => w.fillText(D, 0, I * _)) : w.fillText(d, 0, 0), w.restore(), C(h.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, b, o, a, p, y, c, d, v]), W(e, s.createElement("div", {
    className: j(mu, {
      [`${mu}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + o}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: g === "" ? void 0 : `url('${g}')`
    }
  }));
}, En = "adm-footer", x7 = {
  label: "",
  links: [],
  content: "",
  chips: []
}, S8 = (t) => {
  const e = U(x7, t), {
    label: n,
    links: r,
    content: i,
    chips: o,
    onChipClick: a,
    onLinkClick: l
  } = e, c = (f, d) => {
    o != null && o.length && f.type === "link" && (a == null || a(f, d));
  }, u = (f, d, m) => {
    l && (m.preventDefault(), l(f, d));
  };
  return W(e, s.createElement("div", {
    className: j(En)
  }, n && s.createElement("div", {
    className: `${En}-label`
  }, s.createElement(Wa, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${En}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(Wa, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${En}-content`
  }, i), o && o.length > 0 && s.createElement("div", {
    className: `${En}-chips`
  }, o.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: j(`${En}-chip`, {
      [`${En}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  F7 as ActionSheet,
  ti as AutoCenter,
  N7 as Avatar,
  Ba as Badge,
  It as Button,
  P7 as Calendar,
  R7 as CalendarPicker,
  Q3 as CalendarPickerView,
  M7 as CapsuleTabs,
  A7 as Card,
  L7 as CascadePicker,
  D7 as CascadePickerView,
  V7 as Cascader,
  z4 as CascaderView,
  ed as CenterPopup,
  _c as CheckList,
  Sc as Checkbox,
  j7 as Collapse,
  O7 as ConfigProvider,
  B7 as DatePicker,
  W7 as DatePickerView,
  Z7 as Dialog,
  Wa as Divider,
  Rf as DotLoading,
  H7 as Dropdown,
  z7 as Ellipsis,
  U7 as Empty,
  q7 as ErrorBlock,
  K7 as FloatingBubble,
  Y7 as FloatingPanel,
  S8 as Footer,
  G7 as Form,
  Qd as Grid,
  Do as Image,
  X7 as ImageUploader,
  V5 as ImageViewer,
  Q7 as IndexBar,
  J7 as InfiniteScroll,
  s1 as Input,
  e8 as JumboTabs,
  wt as List,
  Rf as Loading,
  mi as Mask,
  t8 as Modal,
  n8 as NavBar,
  r8 as NoticeBar,
  i8 as NumberKeyboard,
  c6 as PageIndicator,
  o8 as PasscodeInput,
  Kf as Picker,
  Go as PickerView,
  Gd as Popover,
  gr as Popup,
  a8 as ProgressBar,
  s8 as ProgressCircle,
  l8 as PullToRefresh,
  c8 as Radio,
  u8 as Rate,
  f8 as Result,
  d8 as ResultPage,
  yr as SafeArea,
  Lf as ScrollMask,
  m8 as SearchBar,
  h8 as Selector,
  v8 as SideBar,
  Ii as Skeleton,
  p8 as Slider,
  pl as Space,
  Ks as SpinLoading,
  g8 as Stepper,
  y8 as Steps,
  b8 as SwipeAction,
  E8 as Swiper,
  w8 as Switch,
  C8 as TabBar,
  $c as Tabs,
  x8 as Tag,
  f7 as TextArea,
  k8 as Toast,
  $8 as TreeSelect,
  _8 as VirtualInput,
  O8 as WaterMark,
  Vv as createErrorBlock,
  T7 as reduceMotion,
  I7 as restoreMotion,
  _7 as setDefaultConfig,
  ye as useConfig
};
