import * as L from "react";
import s, { useContext as at, useRef as j, useMemo as re, useEffect as X, useState as Y, useCallback as He, useLayoutEffect as ps, forwardRef as he, useImperativeHandle as Ee, memo as Ve, isValidElement as In, createContext as gs, cloneElement as b1 } from "react";
import * as E1 from "react-dom";
import { unstable_batchedUpdates as w1, createPortal as C1, findDOMNode as x1 } from "react-dom";
const fr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
fr && document.addEventListener("touchstart", () => {
}, !0);
var to = function() {
  return to = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, to.apply(this, arguments);
};
function dr(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Se(t, e, n, r) {
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
function k1(t, e) {
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
function $1(t) {
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
function kt(t, e) {
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
function ys(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, o; r < i; r++)
      (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
const Ke = "${label}不是一个有效的${type}", _1 = {
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
}, O1 = _1, gu = {
  current: {
    locale: O1
  }
};
function F7(t) {
  gu.current = t;
}
function fi() {
  return gu.current;
}
const yu = s.createContext(null), N7 = (t) => {
  const {
    children: e
  } = t, n = dr(t, ["children"]), r = oe();
  return s.createElement(yu.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function oe() {
  var t;
  return (t = at(yu)) !== null && t !== void 0 ? t : fi();
}
function ce(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ot(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var bu = { exports: {} };
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
})(bu);
var S1 = bu.exports;
const B = /* @__PURE__ */ Ot(S1);
function W(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = B(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
  for (const r in t)
    t.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = t[r]);
  return s.cloneElement(e, n);
}
function z(...t) {
  const e = {};
  return t.forEach((n) => {
    n && Object.keys(n).forEach((r) => {
      n[r] !== void 0 && (e[r] = n[r]);
    });
  }), e;
}
function An(t, ...e) {
  for (let n = e.length - 1; n >= 0; n -= 1)
    if (e[n] !== void 0)
      return e[n];
  return t;
}
var Eu = function(t) {
  return function(e, n) {
    var r = j(!1);
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
}, mr = function(t) {
  return typeof t == "function";
}, F1 = function(t) {
  return typeof t == "number";
}, N1 = !1;
const di = N1;
function jt(t) {
  di && (mr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = j(t);
  e.current = re(function() {
    return t;
  }, [t]);
  var n = j();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const bs = Eu(X);
function xl(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function ko(t) {
  var e = j(t);
  return e.current = t, e;
}
var P1 = function(t) {
  di && (mr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = ko(t);
  X(function() {
    return function() {
      e.current();
    };
  }, []);
};
const mi = P1;
function R1(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Es = R1, M1 = typeof mt == "object" && mt && mt.Object === Object && mt, I1 = M1, A1 = I1, T1 = typeof self == "object" && self && self.Object === Object && self, L1 = A1 || T1 || Function("return this")(), wu = L1, D1 = wu, V1 = function() {
  return D1.Date.now();
}, j1 = V1, B1 = /\s/;
function W1(t) {
  for (var e = t.length; e-- && B1.test(t.charAt(e)); )
    ;
  return e;
}
var Z1 = W1, H1 = Z1, z1 = /^\s+/;
function U1(t) {
  return t && t.slice(0, H1(t) + 1).replace(z1, "");
}
var q1 = U1, K1 = wu, Y1 = K1.Symbol, Cu = Y1, kl = Cu, xu = Object.prototype, G1 = xu.hasOwnProperty, X1 = xu.toString, kr = kl ? kl.toStringTag : void 0;
function Q1(t) {
  var e = G1.call(t, kr), n = t[kr];
  try {
    t[kr] = void 0;
    var r = !0;
  } catch {
  }
  var i = X1.call(t);
  return r && (e ? t[kr] = n : delete t[kr]), i;
}
var J1 = Q1, e0 = Object.prototype, t0 = e0.toString;
function n0(t) {
  return t0.call(t);
}
var r0 = n0, $l = Cu, i0 = J1, o0 = r0, a0 = "[object Null]", s0 = "[object Undefined]", _l = $l ? $l.toStringTag : void 0;
function l0(t) {
  return t == null ? t === void 0 ? s0 : a0 : _l && _l in Object(t) ? i0(t) : o0(t);
}
var c0 = l0;
function u0(t) {
  return t != null && typeof t == "object";
}
var f0 = u0, d0 = c0, m0 = f0, h0 = "[object Symbol]";
function v0(t) {
  return typeof t == "symbol" || m0(t) && d0(t) == h0;
}
var p0 = v0, g0 = q1, Ol = Es, y0 = p0, Sl = NaN, b0 = /^[-+]0x[0-9a-f]+$/i, E0 = /^0b[01]+$/i, w0 = /^0o[0-7]+$/i, C0 = parseInt;
function x0(t) {
  if (typeof t == "number")
    return t;
  if (y0(t))
    return Sl;
  if (Ol(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Ol(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = g0(t);
  var n = E0.test(t);
  return n || w0.test(t) ? C0(t.slice(2), n ? 2 : 8) : b0.test(t) ? Sl : +t;
}
var k0 = x0, $0 = Es, ra = j1, Fl = k0, _0 = "Expected a function", O0 = Math.max, S0 = Math.min;
function F0(t, e, n) {
  var r, i, o, a, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(_0);
  e = Fl(e) || 0, $0(n) && (f = !!n.leading, d = "maxWait" in n, o = d ? O0(Fl(n.maxWait) || 0, e) : o, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var k = r, F = i;
    return r = i = void 0, u = x, a = t.apply(F, k), a;
  }
  function g(x) {
    return u = x, l = setTimeout(v, e), f ? b(x) : a;
  }
  function y(x) {
    var k = x - c, F = x - u, N = e - k;
    return d ? S0(N, o - F) : N;
  }
  function p(x) {
    var k = x - c, F = x - u;
    return c === void 0 || k >= e || k < 0 || d && F >= o;
  }
  function v() {
    var x = ra();
    if (p(x))
      return C(x);
    l = setTimeout(v, y(x));
  }
  function C(x) {
    return l = void 0, m && r ? b(x) : (r = i = void 0, a);
  }
  function h() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? a : C(ra());
  }
  function w() {
    var x = ra(), k = p(x);
    if (r = arguments, i = this, c = x, k) {
      if (l === void 0)
        return g(c);
      if (d)
        return clearTimeout(l), l = setTimeout(v, e), b(c);
    }
    return l === void 0 && (l = setTimeout(v, e)), a;
  }
  return w.cancel = h, w.flush = E, w;
}
var ku = F0;
const N0 = /* @__PURE__ */ Ot(ku);
var P0 = !!(typeof window < "u" && window.document && window.document.createElement);
const ws = P0;
var R0 = ku, M0 = Es, I0 = "Expected a function";
function A0(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(I0);
  return M0(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), R0(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var T0 = A0;
const L0 = /* @__PURE__ */ Ot(T0);
var D0 = function(t) {
  di && (mr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), X(function() {
    t == null || t();
  }, []);
};
const V0 = D0;
var j0 = function() {
  var t = kt(Y({}), 2), e = t[1];
  return He(function() {
    return e({});
  }, []);
};
const $u = j0;
function nn(t, e) {
  if (ws) {
    if (!t)
      return e;
    var n;
    return mr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var B0 = function(t) {
  return t.every(function(e) {
    var n = nn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, W0 = function(t) {
  return t ? t.getRootNode() : document;
}, Z0 = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return B0(e) ? W0(nn(e[0])) : document;
};
const H0 = Z0;
var z0 = function(t) {
  var e = function(n, r, i) {
    var o = j(!1), a = j([]), l = j([]), c = j();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return nn(m);
      });
      if (!o.current) {
        o.current = !0, a.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== a.current.length || !xl(d, a.current) || !xl(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), a.current = d, l.current = r, c.current = n());
    }), mi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), o.current = !1;
    });
  };
  return e;
};
const _u = z0;
var U0 = _u(X);
const Cs = U0;
function Ou(t, e, n) {
  n === void 0 && (n = "click");
  var r = ko(t);
  Cs(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = nn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, o = H0(e), a = Array.isArray(n) ? n : [n];
    return a.forEach(function(l) {
      return o.addEventListener(l, i);
    }), function() {
      a.forEach(function(l) {
        return o.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var Su = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    var n = 1e3, r = 6e4, i = 36e5, o = "millisecond", a = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", g = "date", y = "Invalid Date", p = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, v = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
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
      var S = 12 * (M.year() - $.year()) + (M.month() - $.month()), O = $.clone().add(S, d), I = M - O < 0, P = $.clone().add(S + (I ? -1 : 1), d);
      return +(-(S + (M - O) / (I ? O - P : P - O)) || 0);
    }, a: function(R) {
      return R < 0 ? Math.ceil(R) || 0 : Math.floor(R);
    }, p: function(R) {
      return { M: d, y: b, w: f, d: u, D: g, h: c, m: l, s: a, ms: o, Q: m }[R] || String(R || "").toLowerCase().replace(/s$/, "");
    }, u: function(R) {
      return R === void 0;
    } }, w = "en", x = {};
    x[w] = C;
    var k = function(R) {
      return R instanceof D;
    }, F = function R($, M, S) {
      var O;
      if (!$)
        return w;
      if (typeof $ == "string") {
        var I = $.toLowerCase();
        x[I] && (O = I), M && (x[I] = M, O = I);
        var P = $.split("-");
        if (!O && P.length > 1)
          return R(P[0]);
      } else {
        var A = $.name;
        x[A] = $, O = A;
      }
      return !S && O && (w = O), O || !S && w;
    }, N = function(R, $) {
      if (k(R))
        return R.clone();
      var M = typeof $ == "object" ? $ : {};
      return M.date = R, M.args = arguments, new D(M);
    }, _ = E;
    _.l = F, _.i = k, _.w = function(R, $) {
      return N(R, { locale: $.$L, utc: $.$u, x: $.$x, $offset: $.$offset });
    };
    var D = function() {
      function R(M) {
        this.$L = F(M.locale, null, !0), this.parse(M);
      }
      var $ = R.prototype;
      return $.parse = function(M) {
        this.$d = function(S) {
          var O = S.date, I = S.utc;
          if (O === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(O))
            return /* @__PURE__ */ new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var P = O.match(p);
            if (P) {
              var A = P[2] - 1 || 0, V = (P[7] || "0").substring(0, 3);
              return I ? new Date(Date.UTC(P[1], A, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, V)) : new Date(P[1], A, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, V);
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
        return this.$d.toString() !== y;
      }, $.isSame = function(M, S) {
        var O = N(M);
        return this.startOf(S) <= O && O <= this.endOf(S);
      }, $.isAfter = function(M, S) {
        return N(M) < this.startOf(S);
      }, $.isBefore = function(M, S) {
        return this.endOf(S) < N(M);
      }, $.$g = function(M, S, O) {
        return _.u(M) ? this[S] : this.set(O, M);
      }, $.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, $.valueOf = function() {
        return this.$d.getTime();
      }, $.startOf = function(M, S) {
        var O = this, I = !!_.u(S) || S, P = _.p(M), A = function(ve, U) {
          var ee = _.w(O.$u ? Date.UTC(O.$y, U, ve) : new Date(O.$y, U, ve), O);
          return I ? ee : ee.endOf(u);
        }, V = function(ve, U) {
          return _.w(O.toDate()[ve].apply(O.toDate("s"), (I ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), O);
        }, Z = this.$W, q = this.$M, K = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case b:
            return I ? A(1, 0) : A(31, 11);
          case d:
            return I ? A(1, q) : A(0, q + 1);
          case f:
            var le = this.$locale().weekStart || 0, ue = (Z < le ? Z + 7 : Z) - le;
            return A(I ? K - ue : K + (6 - ue), q);
          case u:
          case g:
            return V(G + "Hours", 0);
          case c:
            return V(G + "Minutes", 1);
          case l:
            return V(G + "Seconds", 2);
          case a:
            return V(G + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, $.endOf = function(M) {
        return this.startOf(M, !1);
      }, $.$set = function(M, S) {
        var O, I = _.p(M), P = "set" + (this.$u ? "UTC" : ""), A = (O = {}, O[u] = P + "Date", O[g] = P + "Date", O[d] = P + "Month", O[b] = P + "FullYear", O[c] = P + "Hours", O[l] = P + "Minutes", O[a] = P + "Seconds", O[o] = P + "Milliseconds", O)[I], V = I === u ? this.$D + (S - this.$W) : S;
        if (I === d || I === b) {
          var Z = this.clone().set(g, 1);
          Z.$d[A](V), Z.init(), this.$d = Z.set(g, Math.min(this.$D, Z.daysInMonth())).$d;
        } else
          A && this.$d[A](V);
        return this.init(), this;
      }, $.set = function(M, S) {
        return this.clone().$set(M, S);
      }, $.get = function(M) {
        return this[_.p(M)]();
      }, $.add = function(M, S) {
        var O, I = this;
        M = Number(M);
        var P = _.p(S), A = function(q) {
          var K = N(I);
          return _.w(K.date(K.date() + Math.round(q * M)), I);
        };
        if (P === d)
          return this.set(d, this.$M + M);
        if (P === b)
          return this.set(b, this.$y + M);
        if (P === u)
          return A(1);
        if (P === f)
          return A(7);
        var V = (O = {}, O[l] = r, O[c] = i, O[a] = n, O)[P] || 1, Z = this.$d.getTime() + M * V;
        return _.w(Z, this);
      }, $.subtract = function(M, S) {
        return this.add(-1 * M, S);
      }, $.format = function(M) {
        var S = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || y;
        var I = M || "YYYY-MM-DDTHH:mm:ssZ", P = _.z(this), A = this.$H, V = this.$m, Z = this.$M, q = O.weekdays, K = O.months, G = O.meridiem, le = function(U, ee, J, xe) {
          return U && (U[ee] || U(S, I)) || J[ee].slice(0, xe);
        }, ue = function(U) {
          return _.s(A % 12 || 12, U, "0");
        }, ve = G || function(U, ee, J) {
          var xe = U < 12 ? "AM" : "PM";
          return J ? xe.toLowerCase() : xe;
        };
        return I.replace(v, function(U, ee) {
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
                return le(O.monthsShort, Z, K, 3);
              case "MMMM":
                return le(K, Z);
              case "D":
                return S.$D;
              case "DD":
                return _.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return le(O.weekdaysMin, S.$W, q, 2);
              case "ddd":
                return le(O.weekdaysShort, S.$W, q, 3);
              case "dddd":
                return q[S.$W];
              case "H":
                return String(A);
              case "HH":
                return _.s(A, 2, "0");
              case "h":
                return ue(1);
              case "hh":
                return ue(2);
              case "a":
                return ve(A, V, !0);
              case "A":
                return ve(A, V, !1);
              case "m":
                return String(V);
              case "mm":
                return _.s(V, 2, "0");
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
          }(U) || P.replace(":", "");
        });
      }, $.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, $.diff = function(M, S, O) {
        var I, P = this, A = _.p(S), V = N(M), Z = (V.utcOffset() - this.utcOffset()) * r, q = this - V, K = function() {
          return _.m(P, V);
        };
        switch (A) {
          case b:
            I = K() / 12;
            break;
          case d:
            I = K();
            break;
          case m:
            I = K() / 3;
            break;
          case f:
            I = (q - Z) / 6048e5;
            break;
          case u:
            I = (q - Z) / 864e5;
            break;
          case c:
            I = q / i;
            break;
          case l:
            I = q / r;
            break;
          case a:
            I = q / n;
            break;
          default:
            I = q;
        }
        return O ? I : _.a(I);
      }, $.daysInMonth = function() {
        return this.endOf(d).$D;
      }, $.$locale = function() {
        return x[this.$L];
      }, $.locale = function(M, S) {
        if (!M)
          return this.$L;
        var O = this.clone(), I = F(M, S, !0);
        return I && (O.$L = I), O;
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
    }(), T = D.prototype;
    return N.prototype = T, [["$ms", o], ["$s", a], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", g]].forEach(function(R) {
      T[R[1]] = function($) {
        return this.$g($, R[0], R[1]);
      };
    }), N.extend = function(R, $) {
      return R.$i || (R($, D, N), R.$i = !0), N;
    }, N.locale = F, N.isDayjs = k, N.unix = function(R) {
      return N(1e3 * R);
    }, N.en = x[w], N.Ls = x, N.p = {}, N;
  });
})(Su);
var q0 = Su.exports;
const pe = /* @__PURE__ */ Ot(q0);
function K0(t, e) {
  var n;
  di && (mr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = ko(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = re(function() {
    return N0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, ys([], kt(a), !1));
    }, i, e);
  }, []);
  return mi(function() {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function Y0(t, e, n) {
  var r = kt(Y({}), 2), i = r[0], o = r[1], a = K0(function() {
    o({});
  }, n).run;
  X(function() {
    return a();
  }, e), bs(t, [i]);
}
function G0(t) {
  var e = kt(Y(t), 2), n = e[0], r = e[1], i = j(n);
  i.current = n;
  var o = He(function() {
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
    this.time = h.time, this.target = h.target, this.rootBounds = g(h.rootBounds), this.boundingClientRect = g(h.boundingClientRect), this.intersectionRect = g(h.intersectionRect || b()), this.isIntersecting = !!h.intersectionRect;
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
      !h || !E ? i = b() : i = y(h, E), n.forEach(function(w) {
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
      var F = this.root && (this.root.ownerDocument || this.root) || e;
      if (h != F) {
        var N = t(h);
        N && this._monitorIntersections(N.ownerDocument);
      }
    }
  }, a.prototype._unmonitorIntersections = function(h) {
    var E = this._monitoringDocuments.indexOf(h);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, x = this._observationTargets.some(function(N) {
        var _ = N.element.ownerDocument;
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
          var F = t(h);
          F && this._unmonitorIntersections(F.ownerDocument);
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
        var x = w.element, k = m(x), F = this._rootContainsTarget(x), N = w.entry, _ = h && F && this._computeTargetAndRootIntersection(x, k, E), D = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (D = E) : D = b();
        var T = w.entry = new o({
          time: l(),
          target: x,
          boundingClientRect: k,
          rootBounds: D,
          intersectionRect: _
        });
        N ? h && F ? this._hasCrossedThreshold(N, T) && this._queuedEntries.push(T) : N && N.isIntersecting && this._queuedEntries.push(T) : this._queuedEntries.push(T);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, a.prototype._computeTargetAndRootIntersection = function(h, E, w) {
    if (window.getComputedStyle(h).display != "none") {
      for (var x = E, k = v(h), F = !1; !F && k; ) {
        var N = null, _ = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (_.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (F = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, N = null, x = null) : N = i : N = w;
          else {
            var D = v(k), T = D && m(D), R = D && this._computeTargetAndRootIntersection(D, T, w);
            T && R ? (k = D, N = y(T, R)) : (k = null, x = null);
          }
        else {
          var $ = k.ownerDocument;
          k != $.body && k != $.documentElement && _.overflow != "visible" && (N = m(k));
        }
        if (N && (x = d(N, x)), !x)
          break;
        k = k && v(k);
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
        var F = this.thresholds[k];
        if (F == w || F == x || F < w != F < x)
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
    var w = Math.max(h.top, E.top), x = Math.min(h.bottom, E.bottom), k = Math.max(h.left, E.left), F = Math.min(h.right, E.right), N = F - k, _ = x - w;
    return N >= 0 && _ >= 0 && {
      top: w,
      bottom: x,
      left: k,
      right: F,
      width: N,
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
  function g(h) {
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
  function y(h, E) {
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
      w = v(w);
    }
    return !1;
  }
  function v(h) {
    var E = h.parentNode;
    return h.nodeType == /* DOCUMENT */
    9 && h != e ? t(h) : (E && E.assignedSlot && (E = E.assignedSlot.parentNode), E && E.nodeType == 11 && E.host ? E.host : E);
  }
  function C(h) {
    return h && h.nodeType === 9;
  }
  window.IntersectionObserver = a, window.IntersectionObserverEntry = o;
})();
function X0(t, e) {
  var n = kt(Y(), 2), r = n[0], i = n[1], o = kt(Y(), 2), a = o[0], l = o[1];
  return Cs(function() {
    var c = nn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = $1(f), g = b.next(); !g.done; g = b.next()) {
            var y = g.value;
            l(y.intersectionRatio), i(y.isIntersecting);
          }
        } catch (p) {
          d = {
            error: p
          };
        } finally {
          try {
            g && !g.done && (m = b.return) && m.call(b);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, to(to({}, e), {
        root: nn(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, a];
}
var Q0 = ws ? ps : X;
const Ne = Q0;
function J0(t) {
  var e = this, n = j(!1);
  return He(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Se(e, void 0, void 0, function() {
      var o, a;
      return k1(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, ys([], kt(r), !1))];
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
function em(t) {
  var e = j(0), n = kt(Y(t), 2), r = n[0], i = n[1], o = He(function(a) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(a);
    });
  }, []);
  return mi(function() {
    cancelAnimationFrame(e.current);
  }), [r, o];
}
var tm = function() {
  var t = j(!1);
  return X(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const xs = tm;
var Fu = function() {
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
}(), Sa = typeof window < "u" && typeof document < "u" && window.document === document, no = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), nm = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(no) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), rm = 2;
function im(t, e) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, t()), r && l();
  }
  function a() {
    nm(o);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < rm)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(a, e);
    i = c;
  }
  return l;
}
var om = 20, am = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], sm = typeof MutationObserver < "u", lm = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = im(this.refresh.bind(this), om);
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
      !Sa || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), sm ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !Sa || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = am.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), Nu = function(t, e) {
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
}, nr = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || no;
}, Pu = $o(0, 0, 0, 0);
function ro(t) {
  return parseFloat(t) || 0;
}
function Nl(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var o = t["border-" + i + "-width"];
    return r + ro(o);
  }, 0);
}
function cm(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var o = i[r], a = t["padding-" + o];
    n[o] = ro(a);
  }
  return n;
}
function um(t) {
  var e = t.getBBox();
  return $o(0, 0, e.width, e.height);
}
function fm(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return Pu;
  var r = nr(t).getComputedStyle(t), i = cm(r), o = i.left + i.right, a = i.top + i.bottom, l = ro(r.width), c = ro(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + o) !== e && (l -= Nl(r, "left", "right") + o), Math.round(c + a) !== n && (c -= Nl(r, "top", "bottom") + a)), !mm(t)) {
    var u = Math.round(l + o) - e, f = Math.round(c + a) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return $o(i.left, i.top, l, c);
}
var dm = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof nr(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof nr(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function mm(t) {
  return t === nr(t).document.documentElement;
}
function hm(t) {
  return Sa ? dm(t) ? um(t) : fm(t) : Pu;
}
function vm(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, a = Object.create(o.prototype);
  return Nu(a, {
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
function $o(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var pm = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = $o(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = hm(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), gm = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = vm(n);
      Nu(this, { target: e, contentRect: r });
    }
    return t;
  }()
), ym = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Fu(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof nr(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new pm(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof nr(e).Element))
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
          return new gm(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), Ru = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Fu(), Mu = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = lm.getInstance(), r = new ym(e, n, this);
      Ru.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  Mu.prototype[t] = function() {
    var e;
    return (e = Ru.get(this))[t].apply(e, arguments);
  };
});
var bm = function() {
  return typeof no.ResizeObserver < "u" ? no.ResizeObserver : Mu;
}(), Em = _u(ps);
const wm = Em;
var Cm = ws ? wm : Cs;
const xm = Cm;
function Fa(t) {
  var e = kt(em(function() {
    var i = nn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return xm(function() {
    var i = nn(t);
    if (i) {
      var o = new bm(function(a) {
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
function _o(t, e) {
  var n;
  di && (mr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = ko(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = re(function() {
    return L0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, ys([], kt(a), !1));
    }, i, e);
  }, []);
  return mi(function() {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
var km = function(t, e) {
  var n = jt(t), r = j(null), i = He(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return X(function() {
    if (!(!F1(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const $m = km, Pl = 10;
function _m(t, e) {
  return t > e && t > Pl ? "horizontal" : e > t && e > Pl ? "vertical" : "";
}
function Om() {
  const t = j(0), e = j(0), n = j(0), r = j(0), i = j(0), o = j(0), a = j(""), l = () => a.current === "vertical", c = () => a.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, o.current = 0, a.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), o.current = Math.abs(r.current), a.current || (a.current = _m(i.current, o.current));
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
const Sm = fr ? window : void 0, Fm = ["scroll", "auto", "overlay"];
function Nm(t) {
  return t.nodeType === 1;
}
function io(t, e = Sm) {
  let n = t;
  for (; n && n !== e && Nm(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Fm.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Fn = !1;
if (fr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Fn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let $r = 0;
const Rl = "adm-overflow-hidden";
function Pm(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Oo(t, e) {
  const n = Om(), r = (a) => {
    n.move(a);
    const l = n.deltaY.current > 0 ? "10" : "01", c = io(a.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const g = Pm(a.target);
      if (g === document.body || g === document.documentElement) {
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
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(l, 2)) && a.cancelable && Fn && a.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Fn ? {
      passive: !1
    } : !1), $r || document.body.classList.add(Rl), $r++;
  }, o = () => {
    $r && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), $r--, $r || document.body.classList.remove(Rl));
  };
  X(() => {
    if (e)
      return i(), () => {
        o();
      };
  }, [e]);
}
let ks = vi();
const Q = (t) => hi(t, ks);
let $s = vi();
Q.write = (t) => hi(t, $s);
let So = vi();
Q.onStart = (t) => hi(t, So);
let _s = vi();
Q.onFrame = (t) => hi(t, _s);
let Os = vi();
Q.onFinish = (t) => hi(t, Os);
let Qn = [];
Q.setTimeout = (t, e) => {
  let n = Q.now() + e, r = () => {
    let o = Qn.findIndex((a) => a.cancel == r);
    ~o && Qn.splice(o, 1), Qt -= ~o ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return Qn.splice(Iu(n), 0, i), Qt += 1, Au(), i;
};
let Iu = (t) => ~(~Qn.findIndex((e) => e.time > t) || ~Qn.length);
Q.cancel = (t) => {
  So.delete(t), _s.delete(t), Os.delete(t), ks.delete(t), $s.delete(t);
};
Q.sync = (t) => {
  Na = !0, Q.batchedUpdates(t), Na = !1;
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
    So.delete(n), e = null;
  }, r;
};
let Ss = typeof window < "u" ? window.requestAnimationFrame : () => {
};
Q.use = (t) => Ss = t;
Q.now = typeof performance < "u" ? () => performance.now() : Date.now;
Q.batchedUpdates = (t) => t();
Q.catch = console.error;
Q.frameLoop = "always";
Q.advance = () => {
  Q.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Lu();
};
let Xt = -1, Qt = 0, Na = !1;
function hi(t, e) {
  Na ? (e.delete(t), t(0)) : (e.add(t), Au());
}
function Au() {
  Xt < 0 && (Xt = 0, Q.frameLoop !== "demand" && Ss(Tu));
}
function Rm() {
  Xt = -1;
}
function Tu() {
  ~Xt && (Ss(Tu), Q.batchedUpdates(Lu));
}
function Lu() {
  let t = Xt;
  Xt = Q.now();
  let e = Iu(Xt);
  if (e && (Du(Qn.splice(0, e), (n) => n.handler()), Qt -= e), !Qt) {
    Rm();
    return;
  }
  So.flush(), ks.flush(t ? Math.min(64, Xt - t) : 16.667), _s.flush(), $s.flush(), Os.flush();
}
function vi() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      Qt += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return Qt -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), Qt -= e.size, Du(e, (r) => r(n) && t.add(r)), Qt += t.size, e = t);
    }
  };
}
function Du(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      Q.catch(r);
    }
  });
}
function Pa() {
}
const Mm = (t, e, n) => Object.defineProperty(t, e, {
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
function It(t, e) {
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
const ne = (t, e) => t.forEach(e);
function $t(t, e, n) {
  if (H.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const Ge = (t) => H.und(t) ? [] : H.arr(t) ? t : [t];
function Hr(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), ne(n, e);
  }
}
const Br = (t, ...e) => Hr(t, (n) => n(...e)), Fs = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Ns, Vu, tn = null, ju = !1, Ps = Pa;
const Im = (t) => {
  t.to && (Vu = t.to), t.now && (Q.now = t.now), t.colors !== void 0 && (tn = t.colors), t.skipAnimation != null && (ju = t.skipAnimation), t.createStringInterpolator && (Ns = t.createStringInterpolator), t.requestAnimationFrame && Q.use(t.requestAnimationFrame), t.batchedUpdates && (Q.batchedUpdates = t.batchedUpdates), t.willAdvance && (Ps = t.willAdvance), t.frameLoop && (Q.frameLoop = t.frameLoop);
};
var st = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Ns;
  },
  get to() {
    return Vu;
  },
  get colors() {
    return tn;
  },
  get skipAnimation() {
    return ju;
  },
  get willAdvance() {
    return Ps;
  },
  assign: Im
});
const zr = /* @__PURE__ */ new Set();
let ot = [], ia = [], oo = 0;
const Fo = {
  get idle() {
    return !zr.size && !ot.length;
  },
  start(t) {
    oo > t.priority ? (zr.add(t), Q.onStart(Am)) : (Bu(t), Q(Ra));
  },
  advance: Ra,
  sort(t) {
    if (oo)
      Q.onFrame(() => Fo.sort(t));
    else {
      const e = ot.indexOf(t);
      ~e && (ot.splice(e, 1), Wu(t));
    }
  },
  clear() {
    ot = [], zr.clear();
  }
};
function Am() {
  zr.forEach(Bu), zr.clear(), Q(Ra);
}
function Bu(t) {
  ot.includes(t) || Wu(t);
}
function Wu(t) {
  ot.splice(Tm(ot, (e) => e.priority > t.priority), 0, t);
}
function Ra(t) {
  const e = ia;
  for (let n = 0; n < ot.length; n++) {
    const r = ot[n];
    oo = r.priority, r.idle || (Ps(r), r.advance(t), r.idle || e.push(r));
  }
  return oo = 0, ia = ot, ia.length = 0, ot = e, ot.length > 0;
}
function Tm(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Lm = (t, e, n) => Math.min(Math.max(n, t), e), Dm = {
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
}, ht = "[-+]?\\d*\\.?\\d+", ao = ht + "%";
function No(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const Vm = new RegExp("rgb" + No(ht, ht, ht)), jm = new RegExp("rgba" + No(ht, ht, ht, ht)), Bm = new RegExp("hsl" + No(ht, ao, ao)), Wm = new RegExp("hsla" + No(ht, ao, ao, ht)), Zm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Hm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, zm = /^#([0-9a-fA-F]{6})$/, Um = /^#([0-9a-fA-F]{8})$/;
function qm(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = zm.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : tn && tn[t] !== void 0 ? tn[t] : (e = Vm.exec(t)) ? (Ln(e[1]) << 24 | Ln(e[2]) << 16 | Ln(e[3]) << 8 | 255) >>> 0 : (e = jm.exec(t)) ? (Ln(e[1]) << 24 | Ln(e[2]) << 16 | Ln(e[3]) << 8 | Al(e[4])) >>> 0 : (e = Zm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = Um.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = Hm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Bm.exec(t)) ? (Ml(Il(e[1]), Fi(e[2]), Fi(e[3])) | 255) >>> 0 : (e = Wm.exec(t)) ? (Ml(Il(e[1]), Fi(e[2]), Fi(e[3])) | Al(e[4])) >>> 0 : null;
}
function oa(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Ml(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, o = oa(i, r, t + 1 / 3), a = oa(i, r, t), l = oa(i, r, t - 1 / 3);
  return Math.round(o * 255) << 24 | Math.round(a * 255) << 16 | Math.round(l * 255) << 8;
}
function Ln(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function Il(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Al(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function Fi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Tl(t) {
  let e = qm(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, o = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${o})`;
}
const Xr = (t, e, n) => {
  if (H.fun(t))
    return t;
  if (H.arr(t))
    return Xr({
      range: t,
      output: e,
      extrapolate: n
    });
  if (H.str(t.output[0]))
    return Ns(t);
  const r = t, i = r.output, o = r.range || [0, 1], a = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Ym(u, o);
    return Km(u, o[f], o[f + 1], i[f], i[f + 1], c, a, l, r.map);
  };
};
function Km(t, e, n, r, i, o, a, l, c) {
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
function Ym(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Gm = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Lm(0, 1, i / t);
}, so = 1.70158, Ni = so * 1.525, Ll = so + 1, Dl = 2 * Math.PI / 3, Vl = 2 * Math.PI / 4.5, Pi = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Xm = {
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
  easeInBack: (t) => Ll * t * t * t - so * t * t,
  easeOutBack: (t) => 1 + Ll * Math.pow(t - 1, 3) + so * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Ni + 1) * 2 * t - Ni) / 2 : (Math.pow(2 * t - 2, 2) * ((Ni + 1) * (t * 2 - 2) + Ni) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Dl),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Dl) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Vl)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Vl) / 2 + 1,
  easeInBounce: (t) => 1 - Pi(1 - t),
  easeOutBounce: Pi,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Pi(1 - 2 * t)) / 2 : (1 + Pi(2 * t - 1)) / 2,
  steps: Gm
};
function Ma() {
  return Ma = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ma.apply(this, arguments);
}
const rr = Symbol.for("FluidValue.get"), Nn = Symbol.for("FluidValue.observers"), rt = (t) => !!(t && t[rr]), We = (t) => t && t[rr] ? t[rr]() : t, jl = (t) => t[Nn] || null;
function Qm(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function Qr(t, e) {
  let n = t[Nn];
  n && n.forEach((r) => {
    Qm(r, e);
  });
}
class Zu {
  constructor(e) {
    if (this[rr] = void 0, this[Nn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    Jm(this, e);
  }
}
const Jm = (t, e) => Hu(t, rr, e);
function hr(t, e) {
  if (t[rr]) {
    let n = t[Nn];
    n || Hu(t, Nn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function Jr(t, e) {
  let n = t[Nn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Nn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const Hu = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), qi = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, eh = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, Bl = new RegExp(`(${qi.source})(%|[a-z]+)`, "i"), th = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Po = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, zu = (t) => {
  const [e, n] = nh(t);
  if (!e || Fs())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Po.test(n))
      return zu(n);
    if (n)
      return n;
  }
  return t;
}, nh = (t) => {
  const e = Po.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let aa;
const rh = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Uu = (t) => {
  aa || (aa = tn ? new RegExp(`(${Object.keys(tn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((o) => We(o).replace(Po, zu).replace(eh, Tl).replace(aa, Tl)), n = e.map((o) => o.match(qi).map(Number)), i = n[0].map((o, a) => n.map((l) => {
    if (!(a in l))
      throw Error('The arity of each "output" value must be equal');
    return l[a];
  })).map((o) => Xr(Ma({}, t, {
    output: o
  })));
  return (o) => {
    var a;
    const l = !Bl.test(e[0]) && ((a = e.find((u) => Bl.test(u))) == null ? void 0 : a.replace(qi, ""));
    let c = 0;
    return e[0].replace(qi, () => `${i[c++](o)}${l || ""}`).replace(th, rh);
  };
}, Rs = "react-spring: ", qu = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${Rs}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, ih = qu(console.warn);
function oh() {
  ih(`${Rs}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const ah = qu(console.warn);
function sh() {
  ah(`${Rs}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Ro(t) {
  return H.str(t) && (t[0] == "#" || /\d/.test(t) || !Fs() && Po.test(t) || t in (tn || {}));
}
const Ms = Fs() ? X : ps, lh = () => {
  const t = j(!1);
  return Ms(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function Ku() {
  const t = Y()[1], e = lh();
  return () => {
    e.current && t(Math.random());
  };
}
function ch(t, e) {
  const [n] = Y(() => ({
    inputs: e,
    result: t()
  })), r = j(), i = r.current;
  let o = i;
  return o ? e && o.inputs && uh(e, o.inputs) || (o = {
    inputs: e,
    result: t()
  }) : o = n, X(() => {
    r.current = o, i == n && (n.inputs = n.result = void 0);
  }, [o]), o.result;
}
function uh(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const Yu = (t) => X(t, fh), fh = [];
function Wl(t) {
  const e = j();
  return X(() => {
    e.current = t;
  }), e.current;
}
const ei = Symbol.for("Animated:node"), dh = (t) => !!t && t[ei] === t, Ct = (t) => t && t[ei], Is = (t, e) => Mm(t, ei, e), Mo = (t) => t && t[ei] && t[ei].getPayload();
class Gu {
  constructor() {
    this.payload = void 0, Is(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class vr extends Gu {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new vr(e);
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
class ir extends vr {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = Xr({
      output: [e, e]
    });
  }
  static create(e) {
    return new ir(e);
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
    e && (this._toString = Xr({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const lo = {
  dependencies: null
};
class Io extends Gu {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return $t(this.source, (r, i) => {
      dh(r) ? n[i] = r.getValue(e) : rt(r) ? n[i] = We(r) : e || (n[i] = r);
    }), n;
  }
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && ne(this.payload, (e) => e.reset());
  }
  _makePayload(e) {
    if (e) {
      const n = /* @__PURE__ */ new Set();
      return $t(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    lo.dependencies && rt(e) && lo.dependencies.add(e);
    const n = Mo(e);
    n && ne(n, (r) => this.add(r));
  }
}
class As extends Io {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new As(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(mh)), !0);
  }
}
function mh(t) {
  return (Ro(t) ? ir : vr).create(t);
}
function Ia(t) {
  const e = Ct(t);
  return e ? e.constructor : H.arr(t) ? As : Ro(t) ? ir : vr;
}
function co() {
  return co = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, co.apply(this, arguments);
}
const Zl = (t, e) => {
  const n = !H.fun(t) || t.prototype && t.prototype.isReactComponent;
  return he((r, i) => {
    const o = j(null), a = n && He((g) => {
      o.current = ph(i, g);
    }, [i]), [l, c] = vh(r, e), u = Ku(), f = () => {
      const g = o.current;
      if (n && !g)
        return;
      (g ? e.applyAnimatedValues(g, l.getValue(!0)) : !1) === !1 && u();
    }, d = new hh(f, c), m = j();
    Ms(() => (m.current = d, ne(c, (g) => hr(g, d)), () => {
      m.current && (ne(m.current.deps, (g) => Jr(g, m.current)), Q.cancel(m.current.update));
    })), X(f, []), Yu(() => () => {
      const g = m.current;
      ne(g.deps, (y) => Jr(y, g));
    });
    const b = e.getComponentProps(l.getValue());
    return L.createElement(t, co({}, b, {
      ref: a
    }));
  });
};
class hh {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && Q.write(this.update);
  }
}
function vh(t, e) {
  const n = /* @__PURE__ */ new Set();
  return lo.dependencies = n, t.style && (t = co({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new Io(t), lo.dependencies = null, [t, n];
}
function ph(t, e) {
  return t && (H.fun(t) ? t(e) : t.current = e), e;
}
const Hl = Symbol.for("AnimatedComponent"), gh = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new Io(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, o = (a) => {
    const l = zl(a) || "Anonymous";
    return H.str(a) ? a = o[a] || (o[a] = Zl(a, i)) : a = a[Hl] || (a[Hl] = Zl(a, i)), a.displayName = `Animated(${l})`, a;
  };
  return $t(t, (a, l) => {
    H.arr(t) && (l = zl(a)), o[l] = o(a);
  }), {
    animated: o
  };
}, zl = (t) => H.str(t) ? t : t && H.str(t.displayName) ? t.displayName : H.fun(t) && t.name || null;
function Re() {
  return Re = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Re.apply(this, arguments);
}
function Cn(t, ...e) {
  return H.fun(t) ? t(...e) : t;
}
const Ur = (t, e) => t === !0 || !!(e && t && (H.fun(t) ? t(e) : Ge(t).includes(e))), Xu = (t, e) => H.obj(t) ? e && t[e] : t, Qu = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, yh = (t) => t, Ts = (t, e = yh) => {
  let n = bh;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const o = e(t[i], i);
    H.und(o) || (r[i] = o);
  }
  return r;
}, bh = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], Eh = {
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
function wh(t) {
  const e = {};
  let n = 0;
  if ($t(t, (r, i) => {
    Eh[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Ju(t) {
  const e = wh(t);
  if (e) {
    const n = {
      to: e
    };
    return $t(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Re({}, t);
}
function ti(t) {
  return t = We(t), H.arr(t) ? t.map(ti) : Ro(t) ? st.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function Ch(t) {
  for (const e in t)
    return !0;
  return !1;
}
function Aa(t) {
  return H.fun(t) || H.arr(t) && H.obj(t[0]);
}
function xh(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function kh(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const $h = {
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
}, Ta = Re({}, $h.default, {
  mass: 1,
  damping: 1,
  easing: Xm.linear,
  clamp: !1
});
class _h {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, Ta);
  }
}
function Oh(t, e, n) {
  n && (n = Re({}, n), Ul(n, e), e = Re({}, n, e)), Ul(t, e), Object.assign(t, e);
  for (const a in Ta)
    t[a] == null && (t[a] = Ta[a]);
  let {
    mass: r,
    frequency: i,
    damping: o
  } = t;
  return H.und(i) || (i < 0.01 && (i = 0.01), o < 0 && (o = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * o * r / i), t;
}
function Ul(t, e) {
  if (!H.und(e.decay))
    t.duration = void 0;
  else {
    const n = !H.und(e.tension) || !H.und(e.friction);
    (n || !H.und(e.frequency) || !H.und(e.damping) || !H.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const ql = [];
class Sh {
  constructor() {
    this.changed = !1, this.values = ql, this.toValues = null, this.fromValues = ql, this.to = void 0, this.from = void 0, this.config = new _h(), this.immediate = !1;
  }
}
function ef(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: o
}) {
  return new Promise((a, l) => {
    var c;
    let u, f, d = Ur((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      g();
    else {
      H.und(n.pause) || (i.paused = Ur(n.pause, e));
      let y = r == null ? void 0 : r.pause;
      y !== !0 && (y = i.paused || Ur(y, e)), u = Cn(n.delay || 0, e), y ? (i.resumeQueue.add(b), o.pause()) : (o.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - Q.now();
    }
    function b() {
      u > 0 && !st.skipAnimation ? (i.delayed = !0, f = Q.setTimeout(g, u), i.pauseQueue.add(m), i.timeouts.add(f)) : g();
    }
    function g() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        o.start(Re({}, n, {
          callId: t,
          cancel: d
        }), a);
      } catch (y) {
        l(y);
      }
    }
  });
}
const Ls = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? Jn(t.get()) : e.every((n) => n.noop) ? tf(t.get()) : dt(t.get(), e.every((n) => n.finished)), tf = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), dt = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), Jn = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function nf(t, e, n, r) {
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
    const u = Ts(e, (p, v) => v === "onRest" ? void 0 : p);
    let f, d;
    const m = new Promise((p, v) => (f = p, d = v)), b = (p) => {
      const v = i <= (n.cancelId || 0) && Jn(r) || i !== n.asyncId && dt(r, !1);
      if (v)
        throw p.result = v, d(p), p;
    }, g = (p, v) => {
      const C = new Kl(), h = new Yl();
      return (async () => {
        if (st.skipAnimation)
          throw ni(n), h.result = dt(r, !1), d(h), h;
        b(C);
        const E = H.obj(p) ? Re({}, p) : Re({}, v, {
          to: p
        });
        E.parentId = i, $t(u, (x, k) => {
          H.und(E[k]) && (E[k] = x);
        });
        const w = await r.start(E);
        return b(C), n.paused && await new Promise((x) => {
          n.resumeQueue.add(x);
        }), w;
      })();
    };
    let y;
    if (st.skipAnimation)
      return ni(n), dt(r, !1);
    try {
      let p;
      H.arr(t) ? p = (async (v) => {
        for (const C of v)
          await g(C);
      })(t) : p = Promise.resolve(t(g, r.stop.bind(r))), await Promise.all([p.then(f), m]), y = dt(r.get(), !0, !1);
    } catch (p) {
      if (p instanceof Kl)
        y = p.result;
      else if (p instanceof Yl)
        y = p.result;
      else
        throw p;
    } finally {
      i == n.asyncId && (n.asyncId = o, n.asyncTo = o ? l : void 0, n.promise = o ? c : void 0);
    }
    return H.fun(a) && Q.batchedUpdates(() => {
      a(y, r, r.item);
    }), y;
  })();
}
function ni(t, e) {
  Hr(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class Kl extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class Yl extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const La = (t) => t instanceof Ds;
let Fh = 1;
class Ds extends Zu {
  constructor(...e) {
    super(...e), this.id = Fh++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = Ct(this);
    return e && e.getValue();
  }
  to(...e) {
    return st.to(this, e);
  }
  interpolate(...e) {
    return oh(), st.to(this, e);
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
    Qr(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || Fo.sort(this), Qr(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const Pn = Symbol.for("SpringPhase"), rf = 1, Da = 2, Va = 4, sa = (t) => (t[Pn] & rf) > 0, Wt = (t) => (t[Pn] & Da) > 0, _r = (t) => (t[Pn] & Va) > 0, Gl = (t, e) => e ? t[Pn] |= Da | rf : t[Pn] &= ~Da, Xl = (t, e) => e ? t[Pn] |= Va : t[Pn] &= ~Va;
class Nh extends Ds {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new Sh(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !H.und(e) || !H.und(n)) {
      const r = H.obj(e) ? Re({}, e) : Re({}, n, {
        from: e
      });
      H.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Wt(this) || this._state.asyncTo) || _r(this);
  }
  get goal() {
    return We(this.animation.to);
  }
  get velocity() {
    const e = Ct(this);
    return e instanceof vr ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return sa(this);
  }
  get isAnimating() {
    return Wt(this);
  }
  get isPaused() {
    return _r(this);
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
    const l = Mo(i.to);
    !l && rt(i.to) && (a = Ge(We(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == ir ? 1 : l ? l[d].lastPosition : a[d];
      let b = i.immediate, g = m;
      if (!b) {
        if (g = f.lastPosition, o.tension <= 0) {
          f.done = !0;
          return;
        }
        let y = f.elapsedTime += e;
        const p = i.fromValues[d], v = f.v0 != null ? f.v0 : f.v0 = H.arr(o.velocity) ? o.velocity[d] : o.velocity;
        let C;
        const h = o.precision || (p == m ? 5e-3 : Math.min(1, Math.abs(m - p) * 1e-3));
        if (H.und(o.duration))
          if (o.decay) {
            const E = o.decay === !0 ? 0.998 : o.decay, w = Math.exp(-(1 - E) * y);
            g = p + v / (1 - E) * (1 - w), b = Math.abs(f.lastPosition - g) <= h, C = v * w;
          } else {
            C = f.lastVelocity == null ? v : f.lastVelocity;
            const E = o.restVelocity || h / 10, w = o.clamp ? 0 : o.bounce, x = !H.und(w), k = p == m ? f.v0 > 0 : p < m;
            let F, N = !1;
            const _ = 1, D = Math.ceil(e / _);
            for (let T = 0; T < D && (F = Math.abs(C) > E, !(!F && (b = Math.abs(m - g) <= h, b))); ++T) {
              x && (N = g == m || g > m == k, N && (C = -C * w, g = m));
              const R = -o.tension * 1e-6 * (g - m), $ = -o.friction * 1e-3 * C, M = (R + $) / o.mass;
              C = C + M * _, g = g + C * _;
            }
          }
        else {
          let E = 1;
          o.duration > 0 && (this._memoizedDuration !== o.duration && (this._memoizedDuration = o.duration, f.durationProgress > 0 && (f.elapsedTime = o.duration * f.durationProgress, y = f.elapsedTime += e)), E = (o.progress || 0) + y / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), g = p + o.easing(E) * (m - p), C = (g - f.lastPosition) / e, b = E == 1;
        }
        f.lastVelocity = C, Number.isNaN(g) && (console.warn("Got NaN while animating:", this), b = !0);
      }
      l && !l[d].done && (b = !1), b ? f.done = !0 : n = !1, f.setValue(g, o.round) && (r = !0);
    });
    const c = Ct(this), u = c.getValue();
    if (n) {
      const f = We(i.to);
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
    if (Wt(this)) {
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
    return H.und(e) ? (r = this.queue || [], this.queue = []) : r = [H.obj(e) ? e : Re({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Ls(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), ni(this._state, e && this._lastCallId), Q.batchedUpdates(() => this._stop(n, e)), this;
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
    r = H.obj(r) ? r[n] : r, (r == null || Aa(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const o = {
      to: r,
      from: i
    };
    return sa(this) || (e.reverse && ([r, i] = [i, r]), i = We(i), H.und(i) ? Ct(this) || this._set(r) : this._set(i)), o;
  }
  _update(e, n) {
    let r = Re({}, e);
    const {
      key: i,
      defaultProps: o
    } = this;
    r.default && Object.assign(o, Ts(r, (c, u) => /^on/.test(u) ? Xu(c, i) : c)), Jl(this, r, "onProps"), Sr(this, "onProps", r, this);
    const a = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return ef(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: o,
      state: l,
      actions: {
        pause: () => {
          _r(this) || (Xl(this, !0), Br(l.pauseQueue), Sr(this, "onPause", dt(this, Or(this, this.animation.to)), this));
        },
        resume: () => {
          _r(this) && (Xl(this, !1), Wt(this) && this._resume(), Br(l.resumeQueue), Sr(this, "onResume", dt(this, Or(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, a)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = of(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Jn(this));
    const i = !H.und(e.to), o = !H.und(e.from);
    if (i || o)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(Jn(this));
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
    const b = !It(m, f);
    b && (c.from = m), m = We(m);
    const g = !It(d, u);
    g && this._focus(d);
    const y = Aa(n.to), {
      config: p
    } = c, {
      decay: v,
      velocity: C
    } = p;
    (i || o) && (p.velocity = 0), n.config && !y && Oh(p, Cn(n.config, a), n.config !== l.config ? Cn(l.config, a) : void 0);
    let h = Ct(this);
    if (!h || H.und(d))
      return r(dt(this, !0));
    const E = H.und(n.reset) ? o && !n.default : !H.und(m) && Ur(n.reset, a), w = E ? m : this.get(), x = ti(d), k = H.num(x) || H.arr(x) || Ro(x), F = !y && (!k || Ur(l.immediate || n.immediate, a));
    if (g) {
      const T = Ia(d);
      if (T !== h.constructor)
        if (F)
          h = this._set(x);
        else
          throw Error(`Cannot animate between ${h.constructor.name} and ${T.name}, as the "to" prop suggests`);
    }
    const N = h.constructor;
    let _ = rt(d), D = !1;
    if (!_) {
      const T = E || !sa(this) && b;
      (g || T) && (D = It(ti(w), x), _ = !D), (!It(c.immediate, F) && !F || !It(p.decay, v) || !It(p.velocity, C)) && (_ = !0);
    }
    if (D && Wt(this) && (c.changed && !E ? _ = !0 : _ || this._stop(u)), !y && ((_ || rt(u)) && (c.values = h.getPayload(), c.toValues = rt(d) ? null : N == ir ? [1] : Ge(x)), c.immediate != F && (c.immediate = F, !F && !E && this._set(u)), _)) {
      const {
        onRest: T
      } = c;
      ne(Rh, ($) => Jl(this, n, $));
      const R = dt(this, Or(this, u));
      Br(this._pendingCalls, R), this._pendingCalls.add(r), c.changed && Q.batchedUpdates(() => {
        c.changed = !E, T == null || T(R, this), E ? Cn(l.onRest, R) : c.onStart == null || c.onStart(R, this);
      });
    }
    E && this._set(w), y ? r(nf(n.to, n, this._state, this)) : _ ? this._start() : Wt(this) && !g ? this._pendingCalls.add(r) : r(tf(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (jl(this) && this._detach(), n.to = e, jl(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    rt(n) && (hr(n, this), La(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    rt(e) && Jr(e, this);
  }
  _set(e, n = !0) {
    const r = We(e);
    if (!H.und(r)) {
      const i = Ct(this);
      if (!i || !It(r, i.getValue())) {
        const o = Ia(r);
        !i || i.constructor != o ? Is(this, o.create(r)) : i.setValue(r), i && Q.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return Ct(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, Sr(this, "onStart", dt(this, Or(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), Cn(this.animation.onChange, e, this)), Cn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    Ct(this).reset(We(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Wt(this) || (Gl(this, !0), _r(this) || this._resume());
  }
  _resume() {
    st.skipAnimation ? this.finish() : Fo.start(this);
  }
  _stop(e, n) {
    if (Wt(this)) {
      Gl(this, !1);
      const r = this.animation;
      ne(r.values, (o) => {
        o.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), Qr(this, {
        type: "idle",
        parent: this
      });
      const i = n ? Jn(this.get()) : dt(this.get(), Or(this, e ?? r.to));
      Br(this._pendingCalls, i), r.changed && (r.changed = !1, Sr(this, "onRest", i, this));
    }
  }
}
function Or(t, e) {
  const n = ti(e), r = ti(t.get());
  return It(r, n);
}
function of(t, e = t.loop, n = t.to) {
  let r = Cn(e);
  if (r) {
    const i = r !== !0 && Ju(r), o = (i || t).reverse, a = !i || i.reset;
    return ri(Re({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !o || Aa(n) ? n : void 0,
      from: a ? t.from : void 0,
      reset: a
    }, i));
  }
}
function ri(t) {
  const {
    to: e,
    from: n
  } = t = Ju(t), r = /* @__PURE__ */ new Set();
  return H.obj(e) && Ql(e, r), H.obj(n) && Ql(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function Ph(t) {
  const e = ri(t);
  return H.und(e.default) && (e.default = Ts(e)), e;
}
function Ql(t, e) {
  $t(t, (n, r) => n != null && e.add(r));
}
const Rh = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Jl(t, e, n) {
  t.animation[n] = e[n] !== Qu(e, n) ? Xu(e[n], t.key) : void 0;
}
function Sr(t, e, ...n) {
  var r, i, o, a;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (o = (a = t.defaultProps)[e]) == null || o.call(a, ...n);
}
const Mh = ["onStart", "onChange", "onRest"];
let Ih = 1, Ah = class {
  constructor(e, n) {
    this.id = Ih++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), e && this.start(Re({
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
    return e && this.queue.push(ri(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = Ge(e).map(ri) : this.queue = [], this._flush ? this._flush(this, n) : (uf(this, n), ja(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      ne(Ge(n), (i) => r[i].stop(!!e));
    } else
      ni(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (H.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      ne(Ge(e), (r) => n[r].pause());
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
      ne(Ge(e), (r) => n[r].resume());
    }
    return this;
  }
  each(e) {
    $t(this.springs, e);
  }
  _onFrame() {
    const {
      onStart: e,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, o = this._changed.size > 0;
    (i && !this._started || o && !this._started) && (this._started = !0, Hr(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const a = !i && this._started, l = o || a && r.size ? this.get() : null;
    o && n.size && Hr(n, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }), a && (this._started = !1, Hr(r, ([c, u]) => {
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
function ja(t, e) {
  return Promise.all(e.map((n) => af(t, n))).then((n) => Ls(t, n));
}
async function af(t, e, n) {
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
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : ne(Mh, (y) => {
    const p = e[y];
    if (H.fun(p)) {
      const v = t._events[y];
      e[y] = ({
        finished: C,
        cancelled: h
      }) => {
        const E = v.get(p);
        E ? (C || (E.finished = !1), h && (E.cancelled = !0)) : v.set(p, {
          value: null,
          finished: C || !1,
          cancelled: h || !1
        });
      }, u && (u[y] = e[y]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, Br(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((y) => t.springs[y].start(e)), b = e.cancel === !0 || Qu(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(ef(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: Pa,
      resume: Pa,
      start(y, p) {
        b ? (ni(d, t._lastAsyncId), p(Jn(t))) : (y.onRest = l, p(nf(f, y, d, t)));
      }
    }
  })), d.paused && await new Promise((y) => {
    d.resumeQueue.add(y);
  });
  const g = Ls(t, await Promise.all(m));
  if (a && g.finished && !(n && g.noop)) {
    const y = of(e, a, i);
    if (y)
      return uf(t, [y]), af(t, y, !0);
  }
  return c && Q.batchedUpdates(() => c(g, t, t.item)), g;
}
function ec(t, e) {
  const n = Re({}, t.springs);
  return e && ne(Ge(e), (r) => {
    H.und(r.keys) && (r = ri(r)), H.obj(r.to) || (r = Re({}, r, {
      to: void 0
    })), cf(n, r, (i) => lf(i));
  }), sf(t, n), n;
}
function sf(t, e) {
  $t(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, hr(n, t));
  });
}
function lf(t, e) {
  const n = new Nh();
  return n.key = t, e && hr(n, e), n;
}
function cf(t, e, n) {
  e.keys && ne(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function uf(t, e) {
  ne(e, (n) => {
    cf(t.springs, n, (r) => lf(r, t));
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
const Lh = ["children"], Ao = (t) => {
  let {
    children: e
  } = t, n = Th(t, Lh);
  const r = at(uo), i = n.pause || !!r.pause, o = n.immediate || !!r.immediate;
  n = ch(() => ({
    pause: i,
    immediate: o
  }), [i, o]);
  const {
    Provider: a
  } = uo;
  return L.createElement(a, {
    value: n
  }, e);
}, uo = Dh(Ao, {});
Ao.Provider = uo.Provider;
Ao.Consumer = uo.Consumer;
function Dh(t, e) {
  return Object.assign(t, L.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const Vh = () => {
  const t = [], e = function(i) {
    sh();
    const o = [];
    return ne(t, (a, l) => {
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
    return ne(t, (r) => r.pause(...arguments)), this;
  }, e.resume = function() {
    return ne(t, (r) => r.resume(...arguments)), this;
  }, e.set = function(r) {
    ne(t, (i) => i.set(r));
  }, e.start = function(r) {
    const i = [];
    return ne(t, (o, a) => {
      if (H.und(r))
        i.push(o.start());
      else {
        const l = this._getProps(r, o, a);
        l && i.push(o.start(l));
      }
    }), i;
  }, e.stop = function() {
    return ne(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return ne(t, (i, o) => i.update(this._getProps(r, i, o))), this;
  };
  const n = function(i, o, a) {
    return H.fun(i) ? i(a, o) : i;
  };
  return e._getProps = n, e;
};
function jh(t, e, n) {
  const r = H.fun(e) && e;
  r && !n && (n = []);
  const i = re(() => r || arguments.length == 3 ? Vh() : void 0, []), o = j(0), a = Ku(), l = re(() => ({
    ctrls: [],
    queue: [],
    flush(v, C) {
      const h = ec(v, C);
      return o.current > 0 && !l.queue.length && !Object.keys(h).some((w) => !v.springs[w]) ? ja(v, C) : new Promise((w) => {
        sf(v, h), l.queue.push(() => {
          w(ja(v, C));
        }), a();
      });
    }
  }), []), c = j([...l.ctrls]), u = [], f = Wl(t) || 0;
  re(() => {
    ne(c.current.slice(t, f), (v) => {
      xh(v, i), v.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), re(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(v, C) {
    for (let h = v; h < C; h++) {
      const E = c.current[h] || (c.current[h] = new Ah(null, l.flush)), w = r ? r(h, E) : e[h];
      w && (u[h] = Ph(w));
    }
  }
  const m = c.current.map((v, C) => ec(v, u[C])), b = at(Ao), g = Wl(b), y = b !== g && Ch(b);
  Ms(() => {
    o.current++, l.ctrls = c.current;
    const {
      queue: v
    } = l;
    v.length && (l.queue = [], ne(v, (C) => C())), ne(c.current, (C, h) => {
      i == null || i.add(C), y && C.start({
        default: b
      });
      const E = u[h];
      E && (kh(C, E.ref), C.ref ? C.queue.push(E) : C.start(E));
    });
  }), Yu(() => () => {
    ne(l.ctrls, (v) => v.stop(!0));
  });
  const p = m.map((v) => Re({}, v));
  return i ? [p, i] : p;
}
function Me(t, e) {
  const n = H.fun(t), [[r], i] = jh(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let tc;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(tc || (tc = {}));
class ff extends Ds {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = Xr(...n);
    const r = this._get(), i = Ia(r);
    Is(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    It(n, r) || (Ct(this).setValue(n), this._onChange(n, this.idle)), !this.idle && nc(this._active) && la(this);
  }
  _get() {
    const e = H.arr(this.source) ? this.source.map(We) : Ge(We(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !nc(this._active) && (this.idle = !1, ne(Mo(this), (e) => {
      e.done = !1;
    }), st.skipAnimation ? (Q.batchedUpdates(() => this.advance()), la(this)) : Fo.start(this));
  }
  _attach() {
    let e = 1;
    ne(Ge(this.source), (n) => {
      rt(n) && hr(n, this), La(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    ne(Ge(this.source), (e) => {
      rt(e) && Jr(e, this);
    }), this._active.clear(), la(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = Ge(this.source).reduce((n, r) => Math.max(n, (La(r) ? r.priority : 0) + 1), 0));
  }
}
function Bh(t) {
  return t.idle !== !1;
}
function nc(t) {
  return !t.size || Array.from(t).every(Bh);
}
function la(t) {
  t.idle || (t.idle = !0, ne(Mo(t), (e) => {
    e.done = !0;
  }), Qr(t, {
    type: "idle",
    parent: t
  }));
}
const Wh = (t, ...e) => new ff(t, e);
st.assign({
  createStringInterpolator: Uu,
  to: (t, e) => new ff(t, e)
});
function Vs(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Zh = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], df = /^--/;
function Hh(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !df.test(t) && !(qr.hasOwnProperty(t) && qr[t]) ? e + "px" : ("" + e).trim();
}
const rc = {};
function zh(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: o,
    scrollTop: a,
    scrollLeft: l,
    viewBox: c
  } = r, u = Vs(r, Zh), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : rc[m] || (rc[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  o !== void 0 && (t.textContent = o);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = Hh(m, i[m]);
      df.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
    }
  d.forEach((m, b) => {
    t.setAttribute(m, f[b]);
  }), a !== void 0 && (t.scrollTop = a), l !== void 0 && (t.scrollLeft = l), c !== void 0 && t.setAttribute("viewBox", c);
}
let qr = {
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
const Uh = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), qh = ["Webkit", "Ms", "Moz", "O"];
qr = Object.keys(qr).reduce((t, e) => (qh.forEach((n) => t[Uh(n, e)] = t[e]), t), qr);
const Kh = ["x", "y", "z"], Yh = /^(matrix|translate|scale|rotate|skew)/, Gh = /^(translate)/, Xh = /^(rotate|skew)/, ca = (t, e) => H.num(t) && t !== 0 ? t + e : t, Ki = (t, e) => H.arr(t) ? t.every((n) => Ki(n, e)) : H.num(t) ? t === e : parseFloat(t) === e;
class Qh extends Io {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, o = Vs(e, Kh);
    const a = [], l = [];
    (n || r || i) && (a.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => ca(u, "px")).join(",")})`, Ki(c, 0)])), $t(o, (c, u) => {
      if (u === "transform")
        a.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (Yh.test(u)) {
        if (delete o[u], H.und(c))
          return;
        const f = Gh.test(u) ? "px" : Xh.test(u) ? "deg" : "";
        a.push(Ge(c)), l.push(u === "rotate3d" ? ([d, m, b, g]) => [`rotate3d(${d},${m},${b},${ca(g, f)})`, Ki(g, 0)] : (d) => [`${u}(${d.map((m) => ca(m, f)).join(",")})`, Ki(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (o.transform = new Jh(a, l)), super(o);
  }
}
class Jh extends Zu {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return ne(this.inputs, (r, i) => {
      const o = We(r[0]), [a, l] = this.transforms[i](H.arr(o) ? o : r.map(We));
      e += " " + a, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && ne(this.inputs, (n) => ne(n, (r) => rt(r) && hr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && ne(this.inputs, (n) => ne(n, (r) => rt(r) && Jr(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), Qr(this, e);
  }
}
const e2 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], t2 = ["scrollTop", "scrollLeft"];
st.assign({
  batchedUpdates: w1,
  createStringInterpolator: Uu,
  colors: Dm
});
const n2 = gh(e2, {
  applyAnimatedValues: zh,
  createAnimatedStyle: (t) => new Qh(t),
  getComponentProps: (t) => Vs(t, t2)
}), ye = n2.animated;
function r2(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function pr(t, e) {
  if (fr && t) {
    const n = r2(t);
    return C1(e, n);
  }
  return e;
}
function i2(t) {
  const e = j(t);
  return t && (e.current = !0), !!e.current;
}
const gr = (t) => To(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function To(t, e, n) {
  const r = i2(t);
  return e || t ? !0 : r ? !n : !1;
}
const o2 = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function rn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = o2[r];
    n[i] = function(o) {
      var a, l;
      o.stopPropagation(), (l = (a = e.props)[i]) === null || l === void 0 || l.call(a, o);
    };
  }
  return s.cloneElement(e, n);
}
const ua = "adm-mask", a2 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, s2 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, l2 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, pi = (t) => {
  const e = z(l2, t), {
    locale: n
  } = oe(), r = j(null);
  Oo(r, e.visible && e.disableBodyScroll);
  const i = re(() => {
    var f;
    const d = (f = a2[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = s2[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [o, a] = Y(e.visible), l = xs(), {
    opacity: c
  } = Me({
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
  }), u = rn(e.stopPropagation, W(e, s.createElement(ye.div, {
    className: ua,
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
    className: `${ua}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${ua}-content`
  }, e.children))));
  return s.createElement(gr, {
    active: o,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, pr(e.getContainer, u));
};
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
function js(t) {
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
function Lo(t) {
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
function v2(t) {
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
function p2(t) {
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
function g2(t) {
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
function y2(t) {
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
function b2(t) {
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
function ic(t) {
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
const Bs = {
  closeOnMaskClick: !1,
  closeIcon: s.createElement(Lo, null),
  destroyOnClose: !1,
  disableBodyScroll: !0,
  forceRender: !1,
  getContainer: () => document.body,
  mask: !0,
  showCloseButton: !1,
  stopPropagation: ["click"],
  visible: !1
};
function pf(t) {
  const [e, n] = Y(t);
  return Ne(() => {
    n(t);
  }, [t]), e;
}
function E2(t, e, n) {
  return Math.max(e, Math.min(t, n));
}
const Fe = {
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
function oc(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function ac(t, e, n, r = 0.15) {
  return r === 0 ? E2(t, e, n) : t < e ? -oc(e - t, n - e, r) + e : t > n ? +oc(t - n, n - e, r) + n : t;
}
function w2(t, [e, n], [r, i]) {
  const [[o, a], [l, c]] = t;
  return [ac(e, o, a, r), ac(n, l, c, i)];
}
function C2(t, e) {
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
function x2(t) {
  var e = C2(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Ae(t, e, n) {
  return e = x2(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function sc(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ce(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sc(Object(n), !0).forEach(function(r) {
      Ae(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : sc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const gf = {
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
function lc(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const k2 = ["enter", "leave"];
function $2(t = !1, e) {
  return t && !k2.includes(e);
}
function _2(t, e = "", n = !1) {
  const r = gf[t], i = r && r[e] || e;
  return "on" + lc(t) + lc(i) + ($2(n, i) ? "Capture" : "");
}
const O2 = ["gotpointercapture", "lostpointercapture"];
function S2(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = O2.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function F2(t, e = "") {
  const n = gf[t], r = n && n[e] || e;
  return t + r;
}
function Do(t) {
  return "touches" in t;
}
function yf(t) {
  return Do(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function N2(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function P2(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function bf(t) {
  return Do(t) ? P2(t)[0] : t;
}
function Ba(t, e) {
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
function R2(t) {
  return N2(t).map((e) => e.identifier);
}
function cc(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return Ba(n, r);
}
function fa(t) {
  const e = bf(t);
  return Do(t) ? e.identifier : e.pointerId;
}
function uc(t) {
  const e = bf(t);
  return [e.clientX, e.clientY];
}
const fc = 40, dc = 800;
function Ef(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= fc, n *= fc) : r === 2 && (e *= dc, n *= dc), [e, n];
}
function M2(t) {
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
function fo(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function I2() {
}
function A2(...t) {
  return t.length === 0 ? I2 : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function mc(t, e) {
  return Object.assign({}, e, t || {});
}
const T2 = 32;
class wf {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? fo(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, M2(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, o = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Fe.addTo(n._distance, x);
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
    const b = n.offset, g = n._active && !n._blocked || n.active;
    g && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = fo(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [y, p] = n.offset, [[v, C], [h, E]] = n._bounds;
    n.overflow = [y < v ? -1 : y > C ? 1 : 0, p < h ? -1 : p > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = w2(n._bounds, n.offset, w), n.delta = Fe.sub(n.offset, b), this.computeMovement(), g && (!n.last || o > T2)) {
      n.delta = Fe.sub(n.offset, b);
      const x = n.delta.map(Math.abs);
      Fe.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && o > 0 && (n.velocity = [x[0] / o, x[1] / o], n.timeDelta = o);
    }
  }
  emit() {
    const e = this.state, n = this.shared, r = this.config;
    if (e._active || this.clean(), (e._blocked || !e.intentional) && !e._force && !r.triggerAllEvents)
      return;
    const i = this.handler(Ce(Ce(Ce({}, n), e), {}, {
      [this.aliasKey]: e.values
    }));
    i !== void 0 && (e.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function L2([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class Cf extends wf {
  constructor(...e) {
    super(...e), Ae(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Fe.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Fe.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const n = this.state, r = this.config;
    if (!n.axis && e) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[yf(e)] : r.axisThreshold;
      n.axis = L2(n._movement, i);
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
const D2 = (t) => t, hc = 0.15, xf = {
  enabled(t = !0) {
    return t;
  },
  eventOptions(t, e, n) {
    return Ce(Ce({}, n.shared.eventOptions), t);
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
        return [hc, hc];
      case !1:
        return [0, 0];
      default:
        return Fe.toVector(t);
    }
  },
  from(t) {
    if (typeof t == "function")
      return t;
    if (t != null)
      return Fe.toVector(t);
  },
  transform(t, e, n) {
    const r = t || n.shared.transform;
    return this.hasCustomTransform = !!r, r || D2;
  },
  threshold(t) {
    return Fe.toVector(t, 0);
  }
}, V2 = 0, yr = Ce(Ce({}, xf), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = V2) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (o) => yr.bounds(t(o));
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
}), vc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class j2 extends Cf {
  constructor(...e) {
    super(...e), Ae(this, "ingKey", "dragging");
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
      e._bounds = yr.bounds(i);
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = fa(e), r._pointerActive = !0, this.computeValues(uc(e)), this.computeInitial(), n.preventScrollAxis && yf(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = fa(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const o = uc(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Fe.sub(o, n._values), this.computeValues(o)), Fe.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
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
    const i = fa(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [o, a] = n._distance;
    if (n.tap = o <= r.tapsThreshold && a <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [l, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [b, g] = r.swipe.distance, y = r.swipe.duration;
      if (n.elapsedTime < y) {
        const p = Math.abs(l / n.timeDelta), v = Math.abs(c / n.timeDelta);
        p > d && Math.abs(u) > b && (n.swipe[0] = Math.sign(l)), v > m && Math.abs(f) > g && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, B2(e);
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
    const n = vc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Fe.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in vc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function B2(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const gi = typeof window < "u" && window.document && window.document.createElement;
function kf() {
  return gi && "ontouchstart" in window;
}
function W2() {
  return kf() || gi && window.navigator.maxTouchPoints > 1;
}
function Z2() {
  return gi && "onpointerdown" in window;
}
function H2() {
  return gi && "exitPointerLock" in window.document;
}
function z2() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const it = {
  isBrowser: gi,
  gesture: z2(),
  touch: kf(),
  touchscreen: W2(),
  pointer: Z2(),
  pointerLock: H2()
}, U2 = 250, q2 = 180, K2 = 0.5, Y2 = 50, G2 = 250, X2 = 10, pc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Q2 = Ce(Ce({}, yr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && it.pointerLock, it.touch && n ? "touch" : this.pointerLock ? "mouse" : it.pointer && !i ? "pointer" : it.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? U2 : void 0, !(!it.touchscreen || n === !1))
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
    const o = Fe.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, o;
  },
  swipe({
    velocity: t = K2,
    distance: e = Y2,
    duration: n = G2
  } = {}) {
    return {
      velocity: this.transform(Fe.toVector(t)),
      distance: this.transform(Fe.toVector(e)),
      duration: n
    };
  },
  delay(t = 0) {
    switch (t) {
      case !0:
        return q2;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? Ce(Ce({}, pc), t) : pc;
  },
  keyboardDisplacement(t = X2) {
    return t;
  }
});
function $f(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [o, a] = t._direction;
  (e < 0 && r > 0 && o < 0 || e > 0 && r < 0 && o > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && a < 0 || n > 0 && i < 0 && a > 0) && (t._movement[1] = t._movementBound[1]);
}
const J2 = 30, e3 = 100;
class t3 extends wf {
  constructor(...e) {
    super(...e), Ae(this, "ingKey", "pinching"), Ae(this, "aliasKey", "da");
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
    e === "wheel" ? this.state.offset = Fe.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * J2 - Math.abs(r);
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
    const i = cc(e, n._touchIds);
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
    const o = Ba(...Array.from(r.values()));
    o && this.pinchStart(e, o);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = cc(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = Ba(...Array.from(n.values()));
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
    n._movement = [e.scale - 1, e.rotation], n._delta = Fe.sub(n._movement, r), this.compute(e), this.emit();
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
    r._delta = [-Ef(e)[1] / e3 * r.offset[0], 0], Fe.addTo(r._movement, r._delta), $f(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const n3 = Ce(Ce({}, xf), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !it.touch && it.gesture)
      return "gesture";
    if (it.touch && r)
      return "touch";
    if (it.touchscreen) {
      if (it.pointer)
        return "pointer";
      if (it.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (a) => {
      const l = mc(fo(n, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, o = (a) => {
      const l = mc(fo(r, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), o()] : (a) => [i(a), o(a)];
  },
  threshold(t, e, n) {
    return this.lockDirection = n.axis === "lock", Fe.toVector(t, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(t) {
    return t === void 0 ? "ctrlKey" : t;
  },
  pinchOnWheel(t = !0) {
    return t;
  }
});
Ce(Ce({}, yr), {}, {
  mouseOnly: (t = !0) => t
});
class r3 extends Cf {
  constructor(...e) {
    super(...e), Ae(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = Ef(e), Fe.addTo(n._movement, n._delta), $f(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const i3 = yr;
Ce(Ce({}, yr), {}, {
  mouseOnly: (t = !0) => t
});
const Ws = /* @__PURE__ */ new Map(), Wa = /* @__PURE__ */ new Map();
function Zs(t) {
  Ws.set(t.key, t.engine), Wa.set(t.key, t.resolver);
}
const _f = {
  key: "drag",
  engine: j2,
  resolver: Q2
}, o3 = {
  key: "pinch",
  engine: t3,
  resolver: n3
}, a3 = {
  key: "wheel",
  engine: r3,
  resolver: i3
};
function s3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function l3(t, e) {
  if (t == null)
    return {};
  var n = s3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const c3 = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = it.isBrowser ? window : void 0) {
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
}, u3 = ["target", "eventOptions", "window", "enabled", "transform"];
function Yi(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = Yi(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function f3(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  } = r, u = l3(r, u3);
  if (n.shared = Yi({
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  }, c3), e) {
    const f = Wa.get(e);
    n[e] = Yi(Ce({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = Wa.get(f);
      d && (n[f] = Yi(Ce({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class Of {
  constructor(e, n) {
    Ae(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, o) {
    const a = this._listeners, l = F2(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = Ce(Ce({}, c), o);
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
class d3 {
  constructor() {
    Ae(this, "_timeouts", /* @__PURE__ */ new Map());
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
class m3 {
  constructor(e) {
    Ae(this, "gestures", /* @__PURE__ */ new Set()), Ae(this, "_targetEventStore", new Of(this)), Ae(this, "gestureEventStores", {}), Ae(this, "gestureTimeoutStores", {}), Ae(this, "handlers", {}), Ae(this, "config", {}), Ae(this, "pointerIds", /* @__PURE__ */ new Set()), Ae(this, "touchIds", /* @__PURE__ */ new Set()), Ae(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), h3(this, e);
  }
  setEventIds(e) {
    if (Do(e))
      return this.touchIds = new Set(R2(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = f3(e, n, this.config);
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
          const l = this.config[a], c = gc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = Ws.get(a);
            new u(this, e, a).bind(c);
          }
        }
        const o = gc(r, n.eventOptions, !!i);
        for (const a in this.nativeHandlers)
          o(a, "", (l) => this.nativeHandlers[a](Ce(Ce({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const o in r)
        r[o] = A2(...r[o]);
      if (!i)
        return r;
      for (const o in r) {
        const {
          device: a,
          capture: l,
          passive: c
        } = S2(o);
        this._targetEventStore.add(i, a, "", r[o], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function Dn(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Of(t, e), t.gestureTimeoutStores[e] = new d3();
}
function h3(t, e) {
  e.drag && Dn(t, "drag"), e.wheel && Dn(t, "wheel"), e.scroll && Dn(t, "scroll"), e.move && Dn(t, "move"), e.pinch && Dn(t, "pinch"), e.hover && Dn(t, "hover");
}
const gc = (t, e, n) => (r, i, o, a = {}, l = !1) => {
  var c, u;
  const f = (c = a.capture) !== null && c !== void 0 ? c : e.capture, d = (u = a.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : _2(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(o);
}, v3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function p3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    v3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Vn(t, e, n, r, i, o) {
  if (!t.has(n) || !Ws.has(r))
    return;
  const a = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && a in e && e[a](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, o[r] = o[r] || {};
}
function g3(t, e) {
  const [n, r, i] = p3(t), o = {};
  return Vn(i, n, "onDrag", "drag", o, e), Vn(i, n, "onWheel", "wheel", o, e), Vn(i, n, "onScroll", "scroll", o, e), Vn(i, n, "onPinch", "pinch", o, e), Vn(i, n, "onMove", "move", o, e), Vn(i, n, "onHover", "hover", o, e), {
    handlers: o,
    config: e,
    nativeHandlers: r
  };
}
function Hs(t, e = {}, n, r) {
  const i = s.useMemo(() => new m3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function St(t, e) {
  return Zs(_f), Hs({
    drag: t
  }, e || {}, "drag");
}
function y3(t, e) {
  return Zs(a3), Hs({
    wheel: t
  }, e || {}, "wheel");
}
function b3(t) {
  return t.forEach(Zs), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: o,
      config: a
    } = g3(n, r || {});
    return Hs(i, a, void 0, o);
  };
}
const Ri = "adm-popup", E3 = Object.assign(Object.assign({}, Bs), {
  closeOnSwipe: !1,
  position: "bottom"
}), br = (t) => {
  const {
    locale: e,
    popup: n = {}
  } = oe(), r = z(E3, n, t), i = B(`${Ri}-body`, r.bodyClassName, `${Ri}-body-position-${r.position}`), [o, a] = Y(r.visible), l = j(null);
  Oo(l, r.disableBodyScroll && o ? "strict" : !1), Ne(() => {
    r.visible && a(!0);
  }, [r.visible]);
  const c = xs(), {
    percent: u
  } = Me({
    percent: r.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var b, g;
      c.current || (a(r.visible), r.visible ? (b = r.afterShow) === null || b === void 0 || b.call(r) : (g = r.afterClose) === null || g === void 0 || g.call(r));
    }
  }), f = St(({
    swipe: [, b]
  }) => {
    var g;
    r.closeOnSwipe && (b === 1 && r.position === "bottom" || b === -1 && r.position === "top") && ((g = r.onClose) === null || g === void 0 || g.call(r));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(r.position)
  }), d = pf(o && r.visible), m = rn(r.stopPropagation, W(r, s.createElement("div", Object.assign({
    className: Ri,
    onClick: r.onClick,
    style: {
      display: o ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(r.position) ? "none" : "auto"
    }
  }, f()), r.mask && s.createElement(pi, {
    visible: d,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose,
    onMaskClick: (b) => {
      var g, y;
      (g = r.onMaskClick) === null || g === void 0 || g.call(r, b), r.closeOnMaskClick && ((y = r.onClose) === null || y === void 0 || y.call(r));
    },
    className: r.maskClassName,
    style: r.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: r.stopPropagation
  }), s.createElement(ye.div, {
    className: i,
    style: Object.assign(Object.assign({}, r.bodyStyle), {
      pointerEvents: u.to((b) => b === 0 ? "unset" : "none"),
      transform: u.to((b) => r.position === "bottom" ? `translate(0, ${b}%)` : r.position === "top" ? `translate(0, -${b}%)` : r.position === "left" ? `translate(-${b}%, 0)` : r.position === "right" ? `translate(${b}%, 0)` : "none")
    }),
    ref: l
  }, r.showCloseButton && s.createElement("a", {
    className: B(`${Ri}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var b;
      (b = r.onClose) === null || b === void 0 || b.call(r);
    },
    role: "button",
    "aria-label": e.common.close
  }, r.closeIcon), r.children))));
  return s.createElement(gr, {
    active: o,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose
  }, pr(r.getContainer, m));
}, yc = "adm-safe-area", Er = (t) => W(t, s.createElement("div", {
  className: B(yc, `${yc}-position-${t.position}`)
})), mo = Object.assign({}, E1), {
  version: w3,
  render: C3,
  unmountComponentAtNode: x3
} = mo;
let Vo;
try {
  Number((w3 || "").split(".")[0]) >= 18 && mo.createRoot && (Vo = mo.createRoot);
} catch {
}
function bc(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = mo;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const ho = "__antd_mobile_root__";
function k3(t, e) {
  C3(t, e);
}
function $3(t, e) {
  bc(!0);
  const n = e[ho] || Vo(e);
  bc(!1), n.render(t), e[ho] = n;
}
function _3(t, e) {
  if (Vo) {
    $3(t, e);
    return;
  }
  k3(t, e);
}
function O3(t) {
  return x3(t);
}
function S3(t) {
  return Se(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[ho]) === null || e === void 0 || e.unmount(), delete t[ho];
    });
  });
}
function F3(t) {
  return Vo ? S3(t) : O3(t);
}
function yi(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    F3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return _3(t, e), n;
}
function wr(t) {
  const e = s.forwardRef((i, o) => {
    const [a, l] = Y(!1), c = j(!1), [u, f] = Y(t), d = j(0);
    X(() => {
      c.current ? b() : l(!0);
    }, []);
    function m() {
      var g, y;
      c.current = !0, l(!1), (y = (g = u.props).onClose) === null || y === void 0 || y.call(g);
    }
    function b() {
      var g, y;
      r(), (y = (g = u.props).afterClose) === null || y === void 0 || y.call(g);
    }
    return Ee(o, () => ({
      close: m,
      replace: (g) => {
        var y, p;
        d.current++, (p = (y = u.props).afterClose) === null || p === void 0 || p.call(y), f(g);
      }
    })), s.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: a,
      onClose: m,
      afterClose: b
    }));
  }), n = s.createRef(), r = yi(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Se(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var o;
      (o = n.current) === null || o === void 0 || o.replace(i);
    }
  };
}
const Le = "adm-action-sheet", N3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Sf = (t) => {
  const e = z(N3, t), {
    styles: n
  } = e;
  return s.createElement(br, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: B(`${Le}-popup`, e.popupClassName),
    style: e.popupStyle,
    getContainer: e.getContainer,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, W(e, s.createElement("div", {
    className: Le
  }, e.extra && s.createElement("div", {
    className: `${Le}-extra`
  }, e.extra), s.createElement("div", {
    className: `${Le}-button-list`
  }, e.actions.map((r, i) => s.createElement("div", {
    key: r.key,
    className: `${Le}-button-item-wrapper`
  }, s.createElement("a", {
    className: B("adm-plain-anchor", `${Le}-button-item`, {
      [`${Le}-button-item-danger`]: r.danger,
      [`${Le}-button-item-disabled`]: r.disabled,
      [`${Le}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var o, a, l;
      (o = r.onClick) === null || o === void 0 || o.call(r), (a = e.onAction) === null || a === void 0 || a.call(e, r, i), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, s.createElement("div", {
    className: `${Le}-button-item-name`
  }, r.text), r.description && s.createElement("div", {
    className: `${Le}-button-item-description`
  }, r.description))))), e.cancelText && s.createElement("div", {
    className: `${Le}-cancel`,
    role: "option",
    "aria-label": e.cancelText
  }, s.createElement("div", {
    className: `${Le}-button-item-wrapper`
  }, s.createElement("a", {
    className: B("adm-plain-anchor", `${Le}-button-item`),
    onClick: e.onClose
  }, s.createElement("div", {
    className: `${Le}-button-item-name`
  }, e.cancelText)))), e.safeArea && s.createElement(Er, {
    position: "bottom"
  }))));
};
function P3(t) {
  return wr(s.createElement(Sf, Object.assign({}, t)));
}
const R7 = ce(Sf, {
  show: P3
}), Ec = "adm-auto-center", ii = (t) => W(t, s.createElement("div", {
  className: Ec
}, s.createElement("div", {
  className: `${Ec}-content`
}, t.children))), R3 = Ve(() => s.createElement("svg", {
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
var zs = {}, M3 = mt && mt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(zs, "__esModule", { value: !0 });
var Us = zs.staged = void 0;
const I3 = M3(s);
function Ff(t) {
  return typeof t == "function" ? I3.default.createElement(A3, { stage: t }) : t;
}
function A3(t) {
  const e = t.stage();
  return Ff(e);
}
function T3(t) {
  return function(n, r) {
    const i = t(n, r);
    return Ff(i);
  };
}
Us = zs.staged = T3;
function xn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const L3 = (t) => {
  const e = j(null), [n] = X0(e);
  return X(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, bi = Eu(Ne), D3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), V3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), vo = "adm-image", j3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${vo}-tip`
  }, s.createElement(D3, null)),
  fallback: s.createElement("div", {
    className: `${vo}-tip`
  }, s.createElement(V3, null)),
  lazy: !1,
  draggable: !1
}, jo = Us((t) => {
  const e = z(j3, t), [n, r] = Y(!1), [i, o] = Y(!1), a = j(null), l = j(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = Y(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, bi(() => {
    r(!1), o(!1);
  }, [c]), X(() => {
    var g;
    !((g = l.current) === null || g === void 0) && g.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const g = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${vo}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (y) => {
        var p;
        r(!0), (p = e.onLoad) === null || p === void 0 || p.call(e, y);
      },
      onError: (y) => {
        var p;
        o(!0), (p = e.onError) === null || p === void 0 || p.call(e, y);
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
    return s.createElement(s.Fragment, null, !n && e.placeholder, g);
  }
  const b = {};
  return e.width && (b["--width"] = xn(e.width), b.width = xn(e.width)), e.height && (b["--height"] = xn(e.height), b.height = xn(e.height)), W(e, s.createElement("div", {
    ref: a,
    className: vo,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(L3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), B3 = "adm-avatar", W3 = {
  fallback: s.createElement(R3, null),
  fit: "cover"
}, M7 = (t) => {
  const e = z(W3, t);
  return W(e, s.createElement(jo, {
    className: B3,
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
}, jn = "adm-badge", Nf = s.createElement(s.Fragment, null), Z3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === Nf, o = B(jn, {
    [`${jn}-fixed`]: !!r,
    [`${jn}-dot`]: i,
    [`${jn}-bordered`]: t.bordered
  }), a = e || e === 0 ? W(t, s.createElement("div", {
    className: o,
    style: {
      "--color": n
    }
  }, !i && s.createElement("div", {
    className: `${jn}-content`
  }, e))) : null;
  return r ? s.createElement("div", {
    className: B(`${jn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, a) : a;
}, Za = ce(Z3, {
  dot: Nf
}), H3 = "adm-dot-loading", z3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, U3 = {
  color: "default"
}, Pf = Ve((t) => {
  var e;
  const n = z(U3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = z3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: B("adm-loading", H3)
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
function Rf(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function q3() {
  return fr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const et = "adm-button", K3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(Pf, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, Lt = he((t, e) => {
  const n = z(K3, t), [r, i] = Y(!1), o = j(null), a = n.loading === "auto" ? r : n.loading, l = n.disabled || a;
  Ee(e, () => ({
    get nativeElement() {
      return o.current;
    }
  }));
  const c = (u) => Se(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (Rf(f))
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
    className: B(et, {
      [`${et}-${n.color}`]: n.color,
      [`${et}-block`]: n.block,
      [`${et}-disabled`]: l,
      [`${et}-fill-outline`]: n.fill === "outline",
      [`${et}-fill-none`]: n.fill === "none",
      [`${et}-mini`]: n.size === "mini",
      [`${et}-small`]: n.size === "small",
      [`${et}-large`]: n.size === "large",
      [`${et}-loading`]: a
    }, `${et}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, a ? s.createElement("div", {
    className: `${et}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
}), wc = () => s.createElement("svg", {
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
})))))), Cc = () => s.createElement("svg", {
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
var Mf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
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
        var f, d, m, b, g = a(this), y = (f = this.isoWeekYear(), d = this.$u, m = (d ? o.utc : o)().year(f).startOf("year"), b = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (b += 7), m.add(b, n));
        return g.diff(y, "week") + 1;
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
})(Mf);
var Y3 = Mf.exports;
const Bo = /* @__PURE__ */ Ot(Y3);
function ie(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = $u(), o = j(e !== void 0 ? e : n);
  e !== void 0 && (o.current = e);
  const a = jt((l, c = !1) => {
    const u = typeof l == "function" ? l(o.current) : l;
    if (!(!c && u === o.current))
      return o.current = u, i(), r == null ? void 0 : r(u);
  });
  return [o.current, a];
}
function G3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function xc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function da(t) {
  return pe().year(t.year).month(t.month - 1).date(1);
}
pe.extend(Bo);
const ge = "adm-calendar", X3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(wc, null),
  prevYearButton: s.createElement(Cc, null),
  nextMonthButton: s.createElement(wc, null),
  nextYearButton: s.createElement(Cc, null)
}, I7 = he((t, e) => {
  const n = pe(), r = z(X3, t), {
    locale: i
  } = oe(), o = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const h = o.pop();
    h && o.unshift(h);
  }
  const [a, l] = ie({
    value: r.value === void 0 ? void 0 : xc(r.selectionMode, r.value),
    defaultValue: xc(r.selectionMode, r.defaultValue),
    onChange: (h) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, h ? h[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, h));
    }
  }), [c, u] = Y(!1), [f, d] = Y(() => pe(a ? a[0] : n).date(1));
  bs(() => {
    var h;
    (h = r.onPageChange) === null || h === void 0 || h.call(r, f.year(), f.month() + 1);
  }, [f]), Ee(e, () => ({
    jumpTo: (h) => {
      let E;
      typeof h == "function" ? E = h({
        year: f.year(),
        month: f.month() + 1
      }) : E = h, d(da(E));
    },
    jumpToToday: () => {
      d(pe().date(1));
    }
  }));
  const m = (h, E, w) => {
    const x = f[h](E, w);
    if (h === "subtract" && r.minPage) {
      const k = da(r.minPage);
      if (x.isBefore(k, w))
        return;
    }
    if (h === "add" && r.maxPage) {
      const k = da(r.maxPage);
      if (x.isAfter(k, w))
        return;
    }
    d(x);
  }, b = s.createElement("div", {
    className: `${ge}-header`
  }, s.createElement("a", {
    className: `${ge}-arrow-button ${ge}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), s.createElement("a", {
    className: `${ge}-arrow-button ${ge}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), s.createElement("div", {
    className: `${ge}-title`
  }, G3(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), s.createElement("a", {
    className: B(`${ge}-arrow-button`, `${ge}-arrow-button-right`, `${ge}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), s.createElement("a", {
    className: B(`${ge}-arrow-button`, `${ge}-arrow-button-right`, `${ge}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), g = re(() => r.max && pe(r.max), [r.max]), y = re(() => r.min && pe(r.min), [r.min]);
  function p() {
    var h;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const x = w;
      let k = !1, F = !1, N = !1, _ = !1, D = !1;
      if (a) {
        const [$, M] = a;
        F = x.isSame($, "day"), N = x.isSame(M, "day"), k = F || N || x.isAfter($, "day") && x.isBefore(M, "day"), k && (_ = (E.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !F, D = (E.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !N);
      }
      const T = x.month() === f.month(), R = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : g && x.isAfter(g, "day") || y && x.isBefore(y, "day");
      E.push(s.createElement("div", {
        key: x.valueOf(),
        className: B(`${ge}-cell`, (R || !T) && `${ge}-cell-disabled`, T && {
          [`${ge}-cell-today`]: x.isSame(n, "day"),
          [`${ge}-cell-selected`]: k,
          [`${ge}-cell-selected-begin`]: F,
          [`${ge}-cell-selected-end`]: N,
          [`${ge}-cell-selected-row-begin`]: _,
          [`${ge}-cell-selected-row-end`]: D
        }),
        onClick: () => {
          if (!r.selectionMode || R)
            return;
          const $ = x.toDate();
          T || d(x.clone().date(1));
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
        className: `${ge}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), s.createElement("div", {
        className: `${ge}-cell-bottom`
      }, (h = r.renderLabel) === null || h === void 0 ? void 0 : h.call(r, x.toDate())))), w = w.add(1, "day");
    }
    return E;
  }
  const v = s.createElement("div", {
    className: `${ge}-cells`
  }, p()), C = s.createElement("div", {
    className: `${ge}-mark`
  }, o.map((h, E) => s.createElement("div", {
    key: E,
    className: `${ge}-mark-cell`
  }, h)));
  return W(r, s.createElement("div", {
    className: ge
  }, b, C, v));
}), Mi = "adm-divider", Q3 = {
  contentPosition: "center",
  direction: "horizontal"
}, Ha = (t) => {
  const e = z(Q3, t);
  return W(e, s.createElement("div", {
    className: B(Mi, `${Mi}-${e.direction}`, `${Mi}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Mi}-content`
  }, e.children)));
};
var If = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, o) {
        return this.isSame(i, o) || this.isBefore(i, o);
      };
    };
  });
})(If);
var J3 = If.exports;
const e4 = /* @__PURE__ */ Ot(J3);
function kc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function t4(t) {
  return pe().year(t.year).month(t.month - 1).date(1);
}
pe.extend(Bo);
pe.extend(e4);
const Oe = "adm-calendar-picker-view", n4 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, r4 = he((t, e) => {
  var n;
  const r = pe(), i = z(n4, t), {
    locale: o
  } = oe(), a = [...o.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const h = a.pop();
    h && a.unshift(h);
  }
  const [l, c] = ie({
    value: i.value === void 0 ? void 0 : kc(i.selectionMode, i.value),
    defaultValue: kc(i.selectionMode, i.defaultValue),
    onChange: (h) => {
      var E, w;
      i.selectionMode === "single" ? (E = i.onChange) === null || E === void 0 || E.call(i, h ? h[0] : null) : i.selectionMode === "range" && ((w = i.onChange) === null || w === void 0 || w.call(i, h));
    }
  }), [u, f] = Y(!1), [d, m] = Y(() => pe(l ? l[0] : r).date(1));
  Ee(e, () => ({
    jumpTo: (h) => {
      let E;
      typeof h == "function" ? E = h({
        year: d.year(),
        month: d.month() + 1
      }) : E = h, m(t4(E));
    },
    jumpToToday: () => {
      m(pe().date(1));
    },
    getDateRange: () => l
  }));
  const b = s.createElement("div", {
    className: `${Oe}-header`
  }, s.createElement("div", {
    className: `${Oe}-title`
  }, (n = i.title) !== null && n !== void 0 ? n : o.Calendar.title)), g = re(() => i.max ? pe(i.max) : d.add(6, "month"), [i.max, d]), y = re(() => i.min ? pe(i.min) : d, [i.min, d]);
  function p() {
    var h;
    const E = [];
    let w = y;
    for (; w.isSameOrBefore(g, "month"); ) {
      const x = w.year(), k = w.month(), F = {
        year: x,
        month: k + 1
      };
      E.push(s.createElement("div", {
        key: `${x}-${k}`
      }, s.createElement("div", {
        className: `${Oe}-title`
      }, (h = o.Calendar.yearAndMonth) === null || h === void 0 ? void 0 : h.replace(/\${(.*?)}/g, (N, _) => {
        var D;
        return (D = F[_]) === null || D === void 0 ? void 0 : D.toString();
      })), s.createElement("div", {
        className: `${Oe}-cells`
      }, Array(i.weekStartsOn === "Monday" ? w.date(1).isoWeekday() - 1 : w.date(1).isoWeekday()).fill(null).map((N, _) => s.createElement("div", {
        key: _,
        className: `${Oe}-cell`
      })), Array(w.daysInMonth()).fill(null).map((N, _) => {
        var D;
        const T = w.date(_ + 1);
        let R = !1, $ = !1, M = !1, S = !1, O = !1;
        if (l) {
          const [A, V] = l;
          $ = T.isSame(A, "day"), M = T.isSame(V, "day"), R = $ || M || T.isAfter(A, "day") && T.isBefore(V, "day"), R && (S = (E.length % 7 === 0 || T.isSame(T.startOf("month"), "day")) && !$, O = (E.length % 7 === 6 || T.isSame(T.endOf("month"), "day")) && !M);
        }
        const I = i.shouldDisableDate ? i.shouldDisableDate(T.toDate()) : g && T.isAfter(g, "day") || y && T.isBefore(y, "day"), P = () => {
          var A;
          const V = (A = i.renderTop) === null || A === void 0 ? void 0 : A.call(i, T.toDate());
          if (V)
            return V;
          if (i.selectionMode === "range") {
            if ($)
              return o.Calendar.start;
            if (M)
              return o.Calendar.end;
          }
          if (T.isSame(r, "day") && !R)
            return o.Calendar.today;
        };
        return s.createElement("div", {
          key: T.valueOf(),
          className: B(`${Oe}-cell`, {
            [`${Oe}-cell-today`]: T.isSame(r, "day"),
            [`${Oe}-cell-selected`]: R,
            [`${Oe}-cell-selected-begin`]: $,
            [`${Oe}-cell-selected-end`]: M,
            [`${Oe}-cell-selected-row-begin`]: S,
            [`${Oe}-cell-selected-row-end`]: O,
            [`${Oe}-cell-disabled`]: !!I
          }),
          onClick: () => {
            if (!i.selectionMode || I)
              return;
            const A = T.toDate();
            function V() {
              if (!i.allowClear || !l)
                return !1;
              const [Z, q] = l;
              return T.isSame(Z, "date") && T.isSame(q, "day");
            }
            if (i.selectionMode === "single") {
              if (i.allowClear && V()) {
                c(null);
                return;
              }
              c([A, A]);
            } else if (i.selectionMode === "range") {
              if (!l) {
                c([A, A]), f(!0);
                return;
              }
              if (V()) {
                c(null), f(!1);
                return;
              }
              if (u) {
                const Z = l[0];
                c(Z > A ? [A, Z] : [Z, A]), f(!1);
              } else
                c([A, A]), f(!0);
            }
          }
        }, s.createElement("div", {
          className: `${Oe}-cell-top`
        }, P()), s.createElement("div", {
          className: `${Oe}-cell-date`
        }, i.renderDate ? i.renderDate(T.toDate()) : T.date()), s.createElement("div", {
          className: `${Oe}-cell-bottom`
        }, (D = i.renderBottom) === null || D === void 0 ? void 0 : D.call(i, T.toDate())));
      })))), w = w.add(1, "month");
    }
    return E;
  }
  const v = s.createElement("div", {
    className: `${Oe}-body`
  }, p()), C = s.createElement("div", {
    className: `${Oe}-mark`
  }, a.map((h, E) => s.createElement("div", {
    key: E,
    className: `${Oe}-mark-cell`
  }, h)));
  return W(i, s.createElement("div", {
    className: Oe
  }, b, C, v));
}), Ii = "adm-calendar-picker", i4 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, A7 = he((t, e) => {
  const n = z(i4, t), {
    locale: r
  } = oe(), i = e ?? j(null), {
    visible: o,
    confirmText: a,
    popupClassName: l,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: b,
    onMaskClick: g,
    getContainer: y
  } = n, p = dr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), v = s.createElement("div", {
    className: `${Ii}-footer`
  }, s.createElement(Ha, null), s.createElement("div", {
    className: `${Ii}-footer-bottom`
  }, s.createElement(Lt, {
    color: "primary",
    onClick: () => {
      var C, h, E, w;
      const x = (h = (C = i.current) === null || C === void 0 ? void 0 : C.getDateRange()) !== null && h !== void 0 ? h : null;
      n.selectionMode === "single" ? (E = n.onConfirm) === null || E === void 0 || E.call(n, x ? x[0] : null) : n.selectionMode === "range" && ((w = n.onConfirm) === null || w === void 0 || w.call(n, x)), m == null || m();
    }
  }, a ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Ii
  }, s.createElement(br, {
    visible: o,
    className: B(`${Ii}-popup`, l),
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
      g == null || g(), d && (m == null || m());
    },
    getContainer: y
  }, s.createElement(r4, Object.assign({
    ref: i
  }, p)), v)));
});
function Ei(t, e) {
  const n = jt(t);
  Ne(() => {
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
function Af(t, e, n) {
  if (t && typeof MutationObserver < "u") {
    let r = new MutationObserver(() => {
      n();
    });
    return r.observe(t, e), () => {
      r && (r.disconnect(), r = null);
    };
  }
  return () => {
  };
}
function qs(t, e, n) {
  const r = jt(t);
  X(() => Af(e.current, n, r), [e]);
}
function _e(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const Tf = (t, e) => {
  const [{
    scrollLeft: n
  }, r] = Me(() => ({
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
    const y = _e(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: y,
      from: {
        scrollLeft: b
      },
      immediate: o && !n.isAnimating
    });
  }
  return Ne(() => {
    i(!0);
  }, []), bi(() => {
    i();
  }, [e]), qs(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Ai = "adm-scroll-mask", Lf = (t) => {
  const e = j(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Me(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: o
  } = _o((a = !1) => {
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
  }, []), s.createElement(s.Fragment, null, s.createElement(ye.div, {
    ref: e,
    className: B(Ai, `${Ai}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(ye.div, {
    className: B(Ai, `${Ai}-right`),
    style: {
      opacity: r
    }
  }));
};
var Df = { exports: {} }, fe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ks = Symbol.for("react.element"), Ys = Symbol.for("react.portal"), Wo = Symbol.for("react.fragment"), Zo = Symbol.for("react.strict_mode"), Ho = Symbol.for("react.profiler"), zo = Symbol.for("react.provider"), Uo = Symbol.for("react.context"), o4 = Symbol.for("react.server_context"), qo = Symbol.for("react.forward_ref"), Ko = Symbol.for("react.suspense"), Yo = Symbol.for("react.suspense_list"), Go = Symbol.for("react.memo"), Xo = Symbol.for("react.lazy"), a4 = Symbol.for("react.offscreen"), Vf;
Vf = Symbol.for("react.module.reference");
function ct(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case Ks:
        switch (t = t.type, t) {
          case Wo:
          case Ho:
          case Zo:
          case Ko:
          case Yo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case o4:
              case Uo:
              case qo:
              case Xo:
              case Go:
              case zo:
                return t;
              default:
                return e;
            }
        }
      case Ys:
        return e;
    }
  }
}
fe.ContextConsumer = Uo;
fe.ContextProvider = zo;
fe.Element = Ks;
fe.ForwardRef = qo;
fe.Fragment = Wo;
fe.Lazy = Xo;
fe.Memo = Go;
fe.Portal = Ys;
fe.Profiler = Ho;
fe.StrictMode = Zo;
fe.Suspense = Ko;
fe.SuspenseList = Yo;
fe.isAsyncMode = function() {
  return !1;
};
fe.isConcurrentMode = function() {
  return !1;
};
fe.isContextConsumer = function(t) {
  return ct(t) === Uo;
};
fe.isContextProvider = function(t) {
  return ct(t) === zo;
};
fe.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ks;
};
fe.isForwardRef = function(t) {
  return ct(t) === qo;
};
fe.isFragment = function(t) {
  return ct(t) === Wo;
};
fe.isLazy = function(t) {
  return ct(t) === Xo;
};
fe.isMemo = function(t) {
  return ct(t) === Go;
};
fe.isPortal = function(t) {
  return ct(t) === Ys;
};
fe.isProfiler = function(t) {
  return ct(t) === Ho;
};
fe.isStrictMode = function(t) {
  return ct(t) === Zo;
};
fe.isSuspense = function(t) {
  return ct(t) === Ko;
};
fe.isSuspenseList = function(t) {
  return ct(t) === Yo;
};
fe.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === Wo || t === Ho || t === Zo || t === Ko || t === Yo || t === a4 || typeof t == "object" && t !== null && (t.$$typeof === Xo || t.$$typeof === Go || t.$$typeof === zo || t.$$typeof === Uo || t.$$typeof === qo || t.$$typeof === Vf || t.getModuleId !== void 0);
};
fe.typeOf = ct;
Df.exports = fe;
var po = Df.exports;
function un(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (o) => {
      po.isFragment(o) ? r(o.props.children) : (e(o, n), n += 1);
    });
  }
  r(t);
}
const Zt = "adm-capsule-tabs", s4 = () => null, l4 = (t) => {
  var e;
  const n = j(null), r = j(null), i = {};
  let o = null;
  const a = [];
  un(t.children, (d, m) => {
    if (!In(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const g = a.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ie({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Tf(n, i[l]);
  return Ei(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Zt,
    ref: r
  }, s.createElement("div", {
    className: `${Zt}-header`
  }, s.createElement(Lf, {
    scrollTrackRef: n
  }), s.createElement(ye.div, {
    className: `${Zt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, a.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${Zt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${Zt}-tab`, {
      [`${Zt}-tab-active`]: d.key === l,
      [`${Zt}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), a.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(gr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Zt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, T7 = ce(l4, {
  Tab: s4
}), Ti = "adm-card", L7 = (t) => {
  const e = () => t.title || t.extra ? s.createElement("div", {
    className: B(`${Ti}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, s.createElement("div", {
    className: `${Ti}-header-title`
  }, t.title), t.extra) : null, n = () => t.children ? s.createElement("div", {
    className: B(`${Ti}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return W(t, s.createElement("div", {
    className: Ti,
    onClick: t.onClick
  }, e(), n()));
};
function $c(t, e, n) {
  return t * e * n / (e + n * t);
}
function oi(t, e, n, r, i = 0.15) {
  return i === 0 ? _e(t, e, n) : t < e ? -$c(e - t, r, i) + e : t > n ? +$c(t - n, r, i) + n : t;
}
var c4 = typeof Element < "u", u4 = typeof Map == "function", f4 = typeof Set == "function", d4 = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Gi(t, e) {
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
        if (!Gi(t[r], e[r]))
          return !1;
      return !0;
    }
    var o;
    if (u4 && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!Gi(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (f4 && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (d4 && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if (c4 && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !Gi(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var m4 = function(e, n) {
  try {
    return Gi(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const za = /* @__PURE__ */ Ot(m4);
function jf(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const pt = "adm-picker-view", Bf = Ve((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(v) {
    t.onSelect(v, t.index);
  }
  const [{
    y: o
  }, a] = Me(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), l = j(!1), c = j(null), u = j(null), f = j(34);
  Ne(() => {
    const v = u.current;
    v && (f.current = jf(window.getComputedStyle(v).getPropertyValue("height")));
  }), Ne(() => {
    if (l.current || e === null)
      return;
    const v = n.findIndex((h) => h.value === e);
    if (v < 0)
      return;
    const C = v * -f.current;
    a.start({
      y: C,
      immediate: o.goal !== C
    });
  }, [e, n]), Ne(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((v) => v.value === e)) {
      const v = n[0];
      i(v.value);
    }
  }, [n, e]);
  function d(v) {
    const C = v * -f.current;
    a.start({
      y: C
    });
    const h = n[v];
    h && i(h.value);
  }
  const m = (v) => {
    const {
      direction: [, C],
      distance: [, h],
      velocity: [, E],
      offset: [, w],
      last: x
    } = v;
    return {
      direction: C,
      distance: h,
      velocity: E,
      offset: w,
      last: x
    };
  }, b = (v) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      offset: k
    } = m(v);
    if (w) {
      l.current = !1;
      const F = k + x * E * 50, N = _e(F, C, h), _ = -Math.round(N / f.current);
      d(_);
    } else {
      const F = k;
      a.start({
        y: oi(F, C, h, f.current * 50, 0.2)
      });
    }
  }, g = (v) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      distance: k
    } = m(v), F = -E, N = o.get();
    if (w) {
      l.current = !1;
      const _ = x * F * 50, D = N + k * F + _, T = _e(D, C, h), R = -Math.round(T / f.current);
      d(R);
    } else {
      const _ = N + k * F;
      a.start({
        y: oi(_, C, h, f.current * 50, 0.2)
      });
    }
  };
  St((v) => {
    v.event.stopPropagation(), b(v);
  }, {
    axis: "y",
    from: () => [0, o.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), y3((v) => {
    v.event.stopPropagation(), g(v);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, o.get()],
    preventDefault: !0,
    eventOptions: Fn ? {
      passive: !1
    } : void 0
  });
  let y = null;
  function p() {
    if (y === null)
      return null;
    const v = n[y], C = y - 1, h = y + 1, E = n[C], w = n[h];
    return s.createElement("div", {
      className: `${pt}-column-accessible`
    }, s.createElement("div", {
      className: `${pt}-column-accessible-current`,
      role: "button",
      "aria-label": v ? `当前选择的是：${v.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${pt}-column-accessible-button`,
      onClick: () => {
        E && d(C);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${pt}-column-accessible-button`,
      onClick: () => {
        w && d(h);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择下一项：${w.label}` : "没有下一项"
    }, "-"));
  }
  return s.createElement("div", {
    className: `${pt}-column`
  }, s.createElement("div", {
    className: `${pt}-item-height-measure`,
    ref: u
  }), s.createElement(ye.div, {
    ref: c,
    style: {
      translateY: o
    },
    className: `${pt}-column-wheel`,
    "aria-hidden": !0
  }, n.map((v, C) => {
    var h;
    const E = t.value === v.value;
    E && (y = C);
    function w() {
      l.current = !1, d(C);
    }
    return s.createElement("div", {
      key: (h = v.key) !== null && h !== void 0 ? h : v.value,
      "data-selected": E,
      className: B(`${pt}-column-item`, {
        [`${pt}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${pt}-column-item-label`
    }, r(v)));
  })), p());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !za(t.column, e.column)));
Bf.displayName = "Wheel";
function _c(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Wf(t, e) {
  const n = _c(() => (typeof t == "function" ? t(e) : t).map((a) => a.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = _c(() => e.map((o, a) => {
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
  return re(() => Wf(t, e), [t, e]);
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
var or = s;
function h4(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var v4 = typeof Object.is == "function" ? Object.is : h4, p4 = or.useState, g4 = or.useEffect, y4 = or.useLayoutEffect, b4 = or.useDebugValue;
function E4(t, e) {
  var n = e(), r = p4({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, o = r[1];
  return y4(function() {
    i.value = n, i.getSnapshot = e, ma(i) && o({ inst: i });
  }, [t, n, e]), g4(function() {
    return ma(i) && o({ inst: i }), t(function() {
      ma(i) && o({ inst: i });
    });
  }, [t]), b4(n), n;
}
function ma(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !v4(t, n);
  } catch {
    return !0;
  }
}
function w4(t, e) {
  return e();
}
var C4 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? w4 : E4;
Uf.useSyncExternalStore = or.useSyncExternalStore !== void 0 ? or.useSyncExternalStore : C4;
zf.exports = Uf;
var x4 = zf.exports;
let Gs = !1;
const Ua = /* @__PURE__ */ new Set();
function qf() {
  Ua.forEach((t) => {
    t();
  });
}
function D7() {
  Gs = !0, qf(), st.assign({
    skipAnimation: !0
  });
}
function V7() {
  Gs = !1, qf(), st.assign({
    skipAnimation: !1
  });
}
function Oc() {
  return Gs;
}
function k4(t) {
  return Ua.add(t), () => {
    Ua.delete(t);
  };
}
function $4() {
  return x4.useSyncExternalStore(k4, Oc, Oc);
}
const ha = "adm-spin-loading", _4 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, O4 = {
  color: "default"
}, S4 = 15 * 3.14159265358979 * 2, Xs = Ve((t) => {
  var e;
  const n = z(O4, t), r = $4(), {
    percent: i
  } = Me({
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
  return W(n, s.createElement(ye.div, {
    className: ha,
    style: {
      "--color": (e = _4[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${ha}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(ye.circle, {
    className: `${ha}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: S4,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), Gn = "adm-picker-view", F4 = {
  defaultValue: [],
  renderLabel: Hf,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${Gn}-loading-content`
  }, s.createElement(Xs, null))
}, Qo = Ve((t) => {
  const e = z(F4, t), [n, r] = Y(e.value === void 0 ? e.defaultValue : e.value);
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
  Y0(() => {
    var l;
    e.value !== n && ((l = e.onChange) === null || l === void 0 || l.call(e, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const a = He((l, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = l, f;
    });
  }, []);
  return W(e, s.createElement("div", {
    className: `${Gn}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, o.map((l, c) => s.createElement(Bf, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: a,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${Gn}-mask`
  }, s.createElement("div", {
    className: `${Gn}-mask-top`
  }), s.createElement("div", {
    className: `${Gn}-mask-middle`
  }), s.createElement("div", {
    className: `${Gn}-mask-bottom`
  })))));
});
Qo.displayName = "PickerView";
const Ht = "adm-picker", N4 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: Hf,
  destroyOnClose: !1,
  forceRender: !1
}, Qs = Ve(he((t, e) => {
  var n;
  const {
    locale: r
  } = oe(), i = z(N4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [o, a] = ie({
    value: i.visible,
    defaultValue: !1,
    onChange: (p) => {
      var v;
      p === !1 && ((v = i.onClose) === null || v === void 0 || v.call(i));
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
  Ee(e, () => l);
  const [c, u] = ie(Object.assign(Object.assign({}, i), {
    onChange: (p) => {
      var v;
      const C = Wf(i.columns, p);
      (v = i.onConfirm) === null || v === void 0 || v.call(i, p, C);
    }
  })), f = Zf(i.columns, c), [d, m] = Y(c);
  X(() => {
    d !== c && m(c);
  }, [o]), X(() => {
    o || m(c);
  }, [c]);
  const b = jt((p, v) => {
    var C;
    m(p), o && ((C = i.onSelect) === null || C === void 0 || C.call(i, p, v));
  }), g = W(i, s.createElement("div", {
    className: Ht
  }, s.createElement("div", {
    className: `${Ht}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Ht}-header-button`,
    onClick: () => {
      var p;
      (p = i.onCancel) === null || p === void 0 || p.call(i), a(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Ht}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: B(`${Ht}-header-button`, i.loading && `${Ht}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), a(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), s.createElement("div", {
    className: `${Ht}-body`
  }, s.createElement(Qo, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: b
  })))), y = s.createElement(br, {
    style: i.popupStyle,
    className: B(`${Ht}-popup`, i.popupClassName),
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
  }, g, s.createElement(Er, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, y, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
Qs.displayName = "Picker";
function P4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(Qs, Object.assign({}, t, {
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
    }, r = yi(s.createElement(n, null));
  });
}
const Kf = ce(Qs, {
  prompt: P4
});
function Yf(t) {
  const e = re(() => {
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
const Gf = he((t, e) => {
  const {
    options: n
  } = t, r = dr(t, ["options"]), i = Yf(n);
  return s.createElement(Kf, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function R4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
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
    }, r = yi(s.createElement(n, null));
  });
}
const j7 = ce(Gf, {
  prompt: R4
}), B7 = (t) => {
  const {
    options: e
  } = t, n = dr(t, ["options"]), r = Yf(e);
  return s.createElement(Qo, Object.assign({}, n, {
    columns: r
  }));
}, je = "adm-tabs", M4 = () => null, I4 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, A4 = (t) => {
  var e;
  const n = z(I4, t), r = j(null), i = j(null), o = {};
  let a = null;
  const l = [], c = n.direction === "rtl";
  un(n.children, (w, x) => {
    if (!In(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    x === 0 && (a = k);
    const F = l.push(w);
    o[k] = F - 1;
  });
  const [u, f] = ie({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (w) => {
      var x;
      w !== null && ((x = n.onChange) === null || x === void 0 || x.call(n, w));
    }
  }), [{
    x: d,
    width: m
  }, b] = Me(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: g
  }, y] = Me(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: p,
    rightMaskOpacity: v
  }, C] = Me(() => ({
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
    const F = o[u];
    if (F === void 0) {
      b.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const N = i.current;
    if (!N)
      return;
    const _ = k.children.item(F + 1), D = _.children.item(0), T = D.offsetLeft, R = D.offsetWidth, $ = _.offsetLeft, M = _.offsetWidth, S = k.offsetWidth, O = k.scrollWidth, I = k.scrollLeft, P = N.offsetWidth;
    let A = 0, V = 0;
    if (n.activeLineMode === "auto" ? (A = T, V = R) : n.activeLineMode === "full" ? (A = $, V = M) : A = T + (R - P) / 2, c) {
      const K = ["auto", "full"].includes(n.activeLineMode) ? V : P;
      A = -(S - A - K);
    }
    b.start({
      x: A,
      width: V,
      immediate: w
    });
    const Z = O - S;
    if (Z <= 0)
      return;
    let q = 0;
    c ? q = -_e(S / 2 - T + R / 2 - P, 0, Z) : q = _e(T - (S - R) / 2, 0, Z), (!x || n.autoScroll !== !1) && y.start({
      scrollLeft: q,
      from: {
        scrollLeft: I
      },
      immediate: w
    });
  }
  Ne(() => {
    h(!d.isAnimating);
  }, []), bi(() => {
    h();
  }, [u]), Ei(() => {
    h(!d.isAnimating);
  }, r), qs(() => {
    h(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: E
  } = _o((w = !1) => {
    const x = r.current;
    if (!x)
      return;
    const k = x.scrollLeft;
    let F = !1, N = !1;
    c ? (F = Math.round(-k) + x.offsetWidth < x.scrollWidth, N = k < 0) : (F = k > 0, N = k + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: F ? 1 : 0,
      rightMaskOpacity: N ? 1 : 0,
      immediate: w
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Ne(() => {
    E(!0);
  }, []), W(n, s.createElement("div", {
    className: je,
    style: {
      direction: n.direction
    }
  }, s.createElement("div", {
    className: `${je}-header`
  }, s.createElement(ye.div, {
    className: B(`${je}-header-mask`, `${je}-header-mask-left`),
    style: {
      opacity: p
    }
  }), s.createElement(ye.div, {
    className: B(`${je}-header-mask`, `${je}-header-mask-right`),
    style: {
      opacity: v
    }
  }), s.createElement(ye.div, {
    className: `${je}-tab-list`,
    ref: r,
    scrollLeft: g,
    onScroll: E,
    role: "tablist"
  }, s.createElement(ye.div, {
    ref: i,
    className: `${je}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), l.map((w) => W(w.props, s.createElement("div", {
    key: w.key,
    className: B(`${je}-tab-wrapper`, {
      [`${je}-tab-wrapper-stretch`]: n.stretch
    })
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: x
      } = w;
      w.props.disabled || x != null && f(x.toString());
    },
    className: B(`${je}-tab`, {
      [`${je}-tab-active`]: w.key === u,
      [`${je}-tab-disabled`]: w.props.disabled
    }),
    role: "tab",
    "aria-selected": w.key === u
  }, w.props.title)))))), l.map((w) => {
    if (w.props.children === void 0)
      return null;
    const x = w.key === u;
    return s.createElement(gr, {
      key: w.key,
      active: x,
      forceRender: w.props.forceRender,
      destroyOnClose: w.props.destroyOnClose
    }, s.createElement("div", {
      className: `${je}-content`,
      style: {
        display: x ? "block" : "none"
      }
    }, w.props.children));
  })));
}, Sc = ce(A4, {
  Tab: M4
}), Fr = "adm-list", T4 = {
  mode: "default"
}, L4 = he((t, e) => {
  const n = z(T4, t), r = j(null);
  return Ee(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: B(Fr, `${Fr}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${Fr}-header`
  }, n.header), s.createElement("div", {
    className: `${Fr}-body`
  }, s.createElement("div", {
    className: `${Fr}-body-inner`
  }, n.children))));
});
function Jt(t) {
  return t != null && t !== !1;
}
const Ft = "adm-list-item", D4 = (t) => {
  var e, n;
  const {
    arrow: r,
    arrowIcon: i
  } = t, {
    list: o = {}
  } = oe(), a = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, l = (n = r ?? i) !== null && n !== void 0 ? n : a, c = An(o.arrowIcon, r !== !0 ? r : null, i !== !0 ? i : null), u = s.createElement("div", {
    className: `${Ft}-content`
  }, Jt(t.prefix) && s.createElement("div", {
    className: `${Ft}-content-prefix`
  }, t.prefix), s.createElement("div", {
    className: `${Ft}-content-main`
  }, Jt(t.title) && s.createElement("div", {
    className: `${Ft}-title`
  }, t.title), t.children, Jt(t.description) && s.createElement("div", {
    className: `${Ft}-description`
  }, t.description)), Jt(t.extra) && s.createElement("div", {
    className: `${Ft}-content-extra`
  }, t.extra), l && s.createElement("div", {
    className: `${Ft}-content-arrow`
  }, c || s.createElement(g2, null)));
  return W(t, s.createElement(a ? "a" : "div", {
    className: B(`${Ft}`, a ? ["adm-plain-anchor"] : [], t.disabled && `${Ft}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, u));
}, xt = ce(L4, {
  Item: D4
}), Xf = gs(null), V4 = "adm-check-list", j4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(hf, null)
}, B4 = (t) => {
  const {
    checkList: e = {}
  } = oe(), n = z(j4, e, t), [r, i] = ie(n);
  function o(d) {
    n.multiple ? i([...r, d]) : i([d]);
  }
  function a(d) {
    i(r.filter((m) => m !== d));
  }
  const {
    activeIcon: l,
    extra: c,
    disabled: u,
    readOnly: f
  } = n;
  return s.createElement(Xf.Provider, {
    value: {
      value: r,
      check: o,
      uncheck: a,
      activeIcon: l,
      extra: c,
      disabled: u,
      readOnly: f
    }
  }, W(n, s.createElement(xt, {
    mode: n.mode,
    className: V4
  }, n.children)));
}, Li = "adm-check-list-item", W4 = (t) => {
  const e = at(Xf);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, o = e.extra ? e.extra(n) : i, a = s.createElement("div", {
    className: `${Li}-extra`
  }, o);
  return W(t, s.createElement(xt.Item, {
    title: t.title,
    className: B(Li, r && `${Li}-readonly`, n && `${Li}-active`),
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
}, Fc = ce(B4, {
  Item: W4
});
function Z4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function Nc(t, e) {
  e || (e = {});
  var n = e.vargs || Z4(t), r = [], i = /* @__PURE__ */ new Map(), o, a, l = function(b) {
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
    var g;
    return i.get(b) || (!c || c(b), i.set(b, g = t.call(this, b)), g);
  }, o = 1) : u ? m = function() {
    for (var b = f || arguments.length, g = r.length, y = -1; ++y < g; )
      if (r[y].length === b) {
        for (var p = -1; ++p < b && u(arguments[p], r[y][p]); )
          ;
        if (p === b)
          return r[y].val;
      }
    return r[y] = arguments, !c || c(y), arguments.val = t.apply(this, r[y]);
  } : m = function() {
    for (var b = f || arguments.length, g = r.length, y = -1; ++y < g; )
      if (r[y].length === b) {
        for (var p = -1; ++p < b && arguments[p] === r[y][p]; )
          ;
        if (p === b)
          return r[y].val;
      }
    return r[y] = arguments, !c || c(y), arguments.val = t.apply(this, r[y]);
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
  } = e, i = re(() => Nc((l) => {
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
    equals: za
  }), [t]), o = re(() => Nc((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: za
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
const Js = [];
function H4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ai = "adm-skeleton", el = (t) => W(t, s.createElement("div", {
  className: B(ai, {
    [`${ai}-animated`]: t.animated
  })
})), z4 = (t) => W(t, s.createElement(el, {
  animated: t.animated,
  className: `${ai}-title`
})), U4 = {
  lineCount: 3
}, q4 = (t) => {
  const e = z(U4, t), n = H4(1, e.lineCount), r = s.createElement("div", {
    className: `${ai}-paragraph`
  }, n.map((i) => s.createElement(el, {
    key: i,
    animated: e.animated,
    className: `${ai}-paragraph-line`
  })));
  return W(e, r);
}, Di = ce(el, {
  Title: z4,
  Paragraph: q4
}), wi = (t = {}) => re(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: o = "children"
  } = t;
  return [n, r, o, i];
}, [JSON.stringify(t)]), ft = "adm-cascader-view", K4 = {
  defaultValue: []
}, Y4 = (t) => {
  const e = z(K4, t), {
    locale: n
  } = oe(), [r, i, o, a] = wi(e.fieldNames), l = Qf(e.options, {
    valueName: i,
    childrenName: o
  }), [c, u] = ie(Object.assign(Object.assign({}, e), {
    onChange: (p) => {
      var v;
      (v = e.onChange) === null || v === void 0 || v.call(e, p, l(p));
    }
  })), [f, d] = Y(0), m = re(() => {
    const p = [];
    let v = e.options, C = !1;
    for (const h of c) {
      const E = v.find((w) => w[i] === h);
      if (p.push({
        selected: E,
        options: v
      }), !E || !E[o]) {
        C = !0;
        break;
      }
      v = E[o];
    }
    return C || p.push({
      selected: void 0,
      options: v
    }), p;
  }, [c, e.options]);
  bs(() => {
    var p;
    (p = e.onTabsChange) === null || p === void 0 || p.call(e, f);
  }, [f]), X(() => {
    d(m.length - 1);
  }, [c]), X(() => {
    const p = m.length - 1;
    f > p && d(p);
  }, [f, m]);
  const b = (p, v) => {
    const C = c.slice(0, v);
    p !== void 0 && (C[v] = p), u(C);
  }, g = (p) => e.loading || p === Js, y = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: ft
  }, s.createElement(Sc, {
    activeKey: f.toString(),
    onChange: (p) => {
      const v = parseInt(p);
      d(v);
    },
    stretch: !1,
    className: `${ft}-tabs`
  }, m.map((p, v) => {
    const C = p.selected;
    return s.createElement(Sc.Tab, {
      key: v.toString(),
      title: s.createElement("div", {
        className: `${ft}-header-title`
      }, C ? C[r] : typeof y == "function" ? y(v) : y),
      forceRender: !0
    }, s.createElement("div", {
      className: `${ft}-content`
    }, g(p.options) ? s.createElement("div", {
      className: `${ft}-skeleton`
    }, s.createElement(Di, {
      className: `${ft}-skeleton-line-1`,
      animated: !0
    }), s.createElement(Di, {
      className: `${ft}-skeleton-line-2`,
      animated: !0
    }), s.createElement(Di, {
      className: `${ft}-skeleton-line-3`,
      animated: !0
    }), s.createElement(Di, {
      className: `${ft}-skeleton-line-4`,
      animated: !0
    })) : s.createElement(Fc, {
      value: [c[v]],
      onChange: (h) => b(h[0], v),
      activeIcon: e.activeIcon
    }, p.options.map((h) => {
      const E = c[v] === h[i];
      return s.createElement(Fc.Item, {
        value: h[i],
        key: h[i],
        disabled: h[a],
        className: B(`${ft}-item`, {
          [`${ft}-item-active`]: E
        })
      }, h[r]);
    }))));
  }))));
}, G4 = ce(Y4, {
  optionSkeleton: Js
}), Bn = "adm-cascader", X4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, Jf = he((t, e) => {
  var n;
  const {
    locale: r
  } = oe(), i = z(X4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [o, a] = ie({
    value: i.visible,
    defaultValue: !1,
    onChange: (v) => {
      var C;
      v === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
    }
  }), l = {
    toggle: () => {
      a((v) => !v);
    },
    open: () => {
      a(!0);
    },
    close: () => {
      a(!1);
    }
  };
  Ee(e, () => l);
  const [c, u] = ie(Object.assign(Object.assign({}, i), {
    onChange: (v) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, v, m(v));
    }
  })), [, f, d] = wi(i.fieldNames), m = Qf(i.options, {
    valueName: f,
    childrenName: d
  }), [b, g] = Y(c);
  X(() => {
    o || g(c);
  }, [o, c]);
  const y = W(i, s.createElement("div", {
    className: Bn
  }, s.createElement("div", {
    className: `${Bn}-header`
  }, s.createElement("a", {
    className: `${Bn}-header-button`,
    onClick: () => {
      var v;
      (v = i.onCancel) === null || v === void 0 || v.call(i), a(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Bn}-header-title`
  }, i.title), s.createElement("a", {
    className: `${Bn}-header-button`,
    onClick: () => {
      u(b, !0), a(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${Bn}-body`
  }, s.createElement(G4, Object.assign({}, i, {
    value: b,
    onChange: (v, C) => {
      var h;
      g(v), o && ((h = i.onSelect) === null || h === void 0 || h.call(i, v, C));
    }
  }))))), p = s.createElement(br, {
    visible: o,
    position: "bottom",
    onMaskClick: () => {
      var v;
      (v = i.onCancel) === null || v === void 0 || v.call(i), a(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, y);
  return s.createElement(s.Fragment, null, p, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function Q4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
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
    }, r = yi(s.createElement(n, null));
  });
}
const W7 = ce(Jf, {
  prompt: Q4,
  optionSkeleton: Js
}), Nr = "adm-center-popup", J4 = Object.assign(Object.assign({}, Bs), {
  getContainer: null
}), ed = (t) => {
  const {
    popup: e = {}
  } = oe(), n = z(J4, e, t), r = xs(), i = Me({
    scale: n.visible ? 1 : 0.8,
    opacity: n.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: !0
    },
    onRest: () => {
      var d, m;
      r.current || (a(n.visible), n.visible ? (d = n.afterShow) === null || d === void 0 || d.call(n) : (m = n.afterClose) === null || m === void 0 || m.call(n));
    }
  }), [o, a] = Y(n.visible);
  Ne(() => {
    n.visible && a(!0);
  }, [n.visible]);
  const l = j(null);
  Oo(l, n.disableBodyScroll && o);
  const c = pf(o && n.visible), u = s.createElement("div", {
    className: B(`${Nr}-body`, n.bodyClassName),
    style: n.bodyStyle
  }, n.children), f = rn(n.stopPropagation, W(n, s.createElement("div", {
    className: Nr,
    style: {
      display: o ? void 0 : "none",
      pointerEvents: o ? void 0 : "none"
    }
  }, n.mask && s.createElement(pi, {
    visible: c,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose,
    onMaskClick: (d) => {
      var m, b;
      (m = n.onMaskClick) === null || m === void 0 || m.call(n, d), n.closeOnMaskClick && ((b = n.onClose) === null || b === void 0 || b.call(n));
    },
    style: n.maskStyle,
    className: B(`${Nr}-mask`, n.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: n.stopPropagation
  }), s.createElement("div", {
    className: `${Nr}-wrap`,
    role: n.role,
    "aria-label": n["aria-label"]
  }, s.createElement(ye.div, {
    style: Object.assign(Object.assign({}, i), {
      pointerEvents: i.opacity.to((d) => d === 1 ? "unset" : "none")
    }),
    ref: l
  }, n.showCloseButton && s.createElement("a", {
    className: B(`${Nr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = n.onClose) === null || d === void 0 || d.call(n);
    }
  }, n.closeIcon), u)))));
  return s.createElement(gr, {
    active: o,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose
  }, pr(n.getContainer, f));
}, td = gs(null), ev = {
  disabled: !1,
  defaultValue: []
}, tv = (t) => {
  const e = z(ev, t), [n, r] = ie(e);
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
}, nd = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), nv = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), rd = (t) => {
  const e = j(null), n = jt((r) => {
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
}, zt = "adm-checkbox", rv = {
  defaultChecked: !1,
  indeterminate: !1
}, iv = he((t, e) => {
  const n = at(td), r = z(rv, t);
  let [i, o] = ie({
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
  }, a = a || n.disabled), Ee(e, () => ({
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
    className: `${zt}-custom-icon`
  }, r.icon(i, r.indeterminate)) : s.createElement("div", {
    className: `${zt}-icon`
  }, r.indeterminate ? s.createElement(nv, null) : i && s.createElement(nd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: B(zt, {
      [`${zt}-checked`]: i && !r.indeterminate,
      [`${zt}-indeterminate`]: r.indeterminate,
      [`${zt}-disabled`]: a,
      [`${zt}-block`]: r.block
    })
  }, s.createElement(rd, {
    type: "checkbox",
    checked: i,
    onChange: o,
    disabled: a,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${zt}-content`
  }, r.children)));
}), Pc = ce(iv, {
  Group: tv
}), kn = "adm-collapse", ov = () => null, av = (t) => {
  const {
    visible: e
  } = t, n = j(null), r = To(e, t.forceRender, t.destroyOnClose), [{
    height: i
  }, o] = Me(() => ({
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
  return V0(() => {
    if (!e)
      return;
    const a = n.current;
    a && o.start({
      height: a.offsetHeight,
      immediate: !0
    });
  }), bi(() => {
    const a = n.current;
    if (a)
      if (e) {
        let l = 0, c = () => {
        };
        const u = () => {
          l += 1;
          const f = l;
          o.start({
            height: a.offsetHeight
          })[0].then(() => {
            f === l && c();
          });
        };
        return c = Af(a, {
          childList: !0,
          subtree: !0
        }, u), u(), c;
      } else
        o.start({
          height: a.offsetHeight,
          immediate: !0
        }), o.start({
          height: 0
        });
  }, [e]), s.createElement(ye.div, {
    className: B(`${kn}-panel-content`, {
      [`${kn}-panel-content-active`]: e
    }),
    style: {
      height: i.to((a) => i.idle && e ? "auto" : a)
    }
  }, s.createElement("div", {
    className: `${kn}-panel-content-inner`,
    ref: n
  }, s.createElement(xt.Item, null, r && t.children)));
}, sv = (t) => {
  const {
    collapse: e = {}
  } = oe(), n = z(e, t), r = [];
  un(n.children, (c) => {
    !In(c) || typeof c.key != "string" || r.push(c);
  });
  const i = () => {
    var c;
    if (!n.accordion)
      return {
        value: n.activeKey,
        defaultValue: (c = n.defaultActiveKey) !== null && c !== void 0 ? c : [],
        onChange: n.onChange
      };
    const u = {
      value: [],
      defaultValue: [],
      onChange: (f) => {
        var d, m;
        (d = n.onChange) === null || d === void 0 || d.call(n, (m = f[0]) !== null && m !== void 0 ? m : null);
      }
    };
    return n.activeKey === void 0 ? u.value = void 0 : n.activeKey !== null && (u.value = [n.activeKey]), [null, void 0].includes(n.defaultActiveKey) || (u.defaultValue = [n.defaultActiveKey]), u;
  }, [o, a] = ie(i()), l = o === null ? [] : Array.isArray(o) ? o : [o];
  return W(n, s.createElement("div", {
    className: kn
  }, s.createElement(xt, null, r.map((c) => {
    const u = c.key, f = l.includes(u);
    function d(g) {
      var y, p;
      n.accordion ? a(f ? [] : [u]) : a(f ? l.filter((v) => v !== u) : [...l, u]), (p = (y = c.props).onClick) === null || p === void 0 || p.call(y, g);
    }
    const m = An(s.createElement(vf, null), n.arrow, n.arrowIcon, c.props.arrow, c.props.arrowIcon), b = typeof m == "function" ? m(f) : s.createElement("div", {
      className: B(`${kn}-arrow`, {
        [`${kn}-arrow-active`]: f
      })
    }, m);
    return s.createElement(s.Fragment, {
      key: u
    }, W(c.props, s.createElement(xt.Item, {
      className: `${kn}-panel-header`,
      onClick: d,
      disabled: c.props.disabled,
      arrowIcon: b
    }, c.props.title)), s.createElement(av, {
      visible: f,
      forceRender: !!c.props.forceRender,
      destroyOnClose: !!c.props.destroyOnClose
    }, c.props.children));
  }))));
}, Z7 = ce(sv, {
  Panel: ov
});
var id = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), o = this.endOf("y").day();
        return o === 4 || i && o === 5 ? 53 : 52;
      };
    };
  });
})(id);
var lv = id.exports;
const od = /* @__PURE__ */ Ot(lv);
var ad = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(ad);
var cv = ad.exports;
const sd = /* @__PURE__ */ Ot(cv), ar = "TILL_NOW";
pe.extend(Bo);
pe.extend(od);
pe.extend(sd);
const Ut = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function uv(t, e, n, r, i, o, a) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), g = n.getFullYear(), y = n.getMonth() + 1, p = n.getDate(), v = n.getHours(), C = n.getMinutes(), h = n.getSeconds(), E = Ut[r], w = parseInt(t[0]), x = pe(qa([t[0], t[1], "1"])), k = parseInt(t[1]), F = parseInt(t[2]), N = parseInt(t[3]), _ = parseInt(t[4]), D = w === c, T = w === g, R = D && k === u, $ = T && k === y, M = R && F === f, S = $ && F === p, O = M && N === d, I = S && N === v, P = O && _ === m, A = I && _ === C, V = (Z, q, K) => {
    let G = [];
    for (let ve = Z; ve <= q; ve++)
      G.push(ve);
    const le = t.slice(0, Ut[K]), ue = o == null ? void 0 : o[K];
    return ue && typeof ue == "function" && (G = G.filter((ve) => ue(ve, {
      get date() {
        const U = [...le, ve.toString()];
        return qa(U);
      }
    }))), G;
  };
  if (E >= Ut.year) {
    const K = V(c, g, "year");
    l.push(K.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.month) {
    const K = V(D ? u : 1, T ? y : 12, "month");
    l.push(K.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.day) {
    const Z = R ? f : 1, q = $ ? p : x.daysInMonth(), K = V(Z, q, "day");
    l.push(K.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.hour) {
    const K = V(M ? d : 0, S ? v : 23, "hour");
    l.push(K.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.minute) {
    const K = V(O ? m : 0, I ? C : 59, "minute");
    l.push(K.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.second) {
    const K = V(P ? b : 0, A ? h : 59, "second");
    l.push(K.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (a && (l[0].push({
    label: i("now", null),
    value: ar
  }), ar === (t == null ? void 0 : t[0])))
    for (let Z = 1; Z < l.length; Z += 1)
      l[Z] = [];
  return l;
}
function fv(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function qa(t) {
  var e, n, r, i, o, a;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (o = t[4]) !== null && o !== void 0 ? o : "0", m = (a = t[5]) !== null && a !== void 0 ? a : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
pe.extend(Bo);
pe.extend(od);
pe.extend(sd);
const Pr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function dv(t, e, n, r, i, o) {
  const a = [], l = e.getFullYear(), c = n.getFullYear(), u = Pr[r], f = parseInt(t[0]), d = f === l, m = f === c, b = pe(e), g = pe(n), y = b.isoWeek(), p = g.isoWeek(), v = b.isoWeekday(), C = g.isoWeekday(), h = parseInt(t[1]), E = d && h === y, w = m && h === p, x = pe(`${f}-01-01`).isoWeeksInYear(), k = (F, N, _) => {
    let D = [];
    for (let $ = F; $ <= N; $++)
      D.push($);
    const T = t.slice(0, Pr[_]), R = o == null ? void 0 : o[_];
    return R && typeof R == "function" && (D = D.filter(($) => R($, {
      get date() {
        const M = [...T, $.toString()];
        return ld(M);
      }
    }))), D;
  };
  if (u >= Pr.year) {
    const _ = k(l, c, "year");
    a.push(_.map((D) => ({
      label: i("year", D),
      value: D.toString()
    })));
  }
  if (u >= Pr.week) {
    const _ = k(d ? y : 1, m ? p : x, "week");
    a.push(_.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= Pr["week-day"]) {
    const _ = k(E ? v : 1, w ? C : 7, "week-day");
    a.push(_.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return a;
}
function mv(t) {
  if (!t)
    return [];
  const e = pe(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function ld(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", o = (n = t[1]) !== null && n !== void 0 ? n : "1", a = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return pe().year(parseInt(i)).isoWeek(parseInt(o)).isoWeekday(parseInt(a)).hour(0).minute(0).second(0).toDate();
}
const hv = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, cd = (t, e) => {
  if (e.includes("week"))
    return mv(t);
  {
    const n = e;
    return fv(t).slice(0, hv[n]);
  }
}, Ka = (t, e) => {
  if ((t == null ? void 0 : t[0]) === ar) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? ld(t) : qa(t);
}, ud = (t, e, n, r, i, o, a) => r.startsWith("week") ? dv(t, e, n, r, i, o) : uv(t, e, n, r, i, o, a);
function fd(t) {
  const {
    locale: e
  } = oe();
  return He((n, r) => {
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
const Rc = (/* @__PURE__ */ new Date()).getFullYear(), vv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Rc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Rc + 10)),
  precision: "day",
  defaultValue: null
}, dd = he((t, e) => {
  const n = z(vv, t), {
    renderLabel: r
  } = n, [i, o] = ie({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), a = re(() => /* @__PURE__ */ new Date(), []), l = fd(r), c = re(() => {
    let m = i ?? a;
    return m.tillNow ? [ar] : (m = new Date(_e(m.getTime(), n.min.getTime(), n.max.getTime())), cd(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = He((m) => {
    const b = Ka(m, n.precision);
    o(b, !0);
  }, [o, n.precision]), f = jt((m) => {
    var b;
    const g = Ka(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, g);
  }), d = He((m) => ud(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
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
    var g;
    return (g = n.children) === null || g === void 0 ? void 0 : g.call(n, i, b);
  }));
});
function pv(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
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
    }, r = yi(s.createElement(n, null));
  });
}
const H7 = ce(dd, {
  prompt: pv,
  DATE_NOW: ar
}), Mc = (/* @__PURE__ */ new Date()).getFullYear(), gv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Mc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Mc + 10)),
  precision: "day"
}, z7 = (t) => {
  var e;
  const n = z(gv, t), {
    renderLabel: r
  } = n, [i, o] = ie({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), a = fd(r), l = re(() => i != null && i.tillNow ? [ar, null, null] : cd(i, n.precision), [i, n.precision]), c = He((u) => {
    var f;
    const d = Ka(u, n.precision);
    d && (o(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Qo, {
    columns: (u) => ud(u, n.min, n.max, n.precision, a, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, yv = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(Lt, {
    key: e.key,
    onClick: t.onAction,
    className: B("adm-dialog-button", {
      "adm-dialog-button-bold": e.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, bv = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, md = (t) => {
  const e = z(bv, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: gt("image-container")
  }, s.createElement(jo, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: gt("header")
  }, s.createElement(ii, null, e.header)), !!e.title && s.createElement("div", {
    className: gt("title")
  }, e.title), s.createElement("div", {
    className: B(gt("content"), !e.content && gt("content-empty"))
  }, typeof e.content == "string" ? s.createElement(ii, null, e.content) : e.content), s.createElement("div", {
    className: gt("footer")
  }, e.actions.map((r, i) => {
    const o = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: gt("action-row"),
      key: i
    }, o.map((a, l) => s.createElement(yv, {
      key: a.key,
      action: a,
      onAction: () => Se(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = a.onClick) === null || c === void 0 ? void 0 : c.call(a), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, a, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(ed, {
    className: B(gt(), e.className),
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
    bodyClassName: B(gt("body"), e.image && gt("with-image"), e.bodyClassName),
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
function gt(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const Ya = /* @__PURE__ */ new Set();
function tl(t) {
  const e = wr(s.createElement(md, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Ya.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Ya.add(e.close), e;
}
function Ev(t) {
  const e = {
    confirmText: fi().locale.Dialog.ok
  }, n = z(e, t);
  return new Promise((r) => {
    tl(Object.assign(Object.assign({}, n), {
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
const wv = {
  confirmText: "确认",
  cancelText: "取消"
};
function Cv(t) {
  const {
    locale: e
  } = fi(), n = z(wv, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    tl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Se(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Se(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function xv() {
  Ya.forEach((t) => {
    t();
  });
}
const U7 = ce(md, {
  show: tl,
  alert: Ev,
  confirm: Cv,
  clear: xv
}), hd = s.createContext(null), At = "adm-dropdown-item", kv = (t) => {
  const {
    dropdown: e = {}
  } = oe(), n = z(e, t), {
    active: r,
    highlight: i,
    onClick: o,
    title: a
  } = n, l = B(At, {
    [`${At}-active`]: r,
    [`${At}-highlight`]: i ?? r
  }), c = s.useContext(hd), u = An(s.createElement(f2, null), c, n.arrow, n.arrowIcon);
  return W(t, s.createElement("div", {
    className: l,
    onClick: o
  }, s.createElement("div", {
    className: `${At}-title`
  }, s.createElement("span", {
    className: `${At}-title-text`
  }, a), s.createElement("span", {
    className: B(`${At}-title-arrow`, {
      [`${At}-title-arrow-active`]: r
    })
  }, u))));
}, $v = kv, _v = (t) => {
  const {
    active: e = !1
  } = t, n = To(e, t.forceRender, t.destroyOnClose), r = B(`${At}-content`, {
    [`${At}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, Wn = "adm-dropdown", Ov = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Bs.getContainer
}, Sv = he((t, e) => {
  const {
    dropdown: n = {}
  } = oe(), r = z(Ov, n, t), i = An(n.arrowIcon, t.arrow, t.arrowIcon), [o, a] = ie({
    value: r.activeKey,
    defaultValue: r.defaultActiveKey,
    onChange: r.onChange
  }), l = j(null), c = j(null);
  Ou(() => {
    r.closeOnClickAway && a(null);
  }, [l, c]);
  const [u, f] = Y(), d = j(null);
  X(() => {
    const p = d.current;
    if (p && o) {
      const v = p.getBoundingClientRect();
      f(v.bottom);
    }
  }, [o]);
  const m = (p) => {
    a(o === p ? null : p);
  };
  let b = !1;
  const g = [], y = s.Children.map(r.children, (p) => {
    if (In(p)) {
      const v = Object.assign(Object.assign({}, p.props), {
        onClick: (C) => {
          var h, E;
          m(p.key), (E = (h = p.props).onClick) === null || E === void 0 || E.call(h, C);
        },
        active: p.key === o
      });
      return g.push(p), p.props.forceRender && (b = !0), b1(p, v);
    } else
      return p;
  });
  return Ee(e, () => ({
    close: () => {
      a(null);
    }
  }), [a]), W(r, s.createElement("div", {
    className: B(Wn, {
      [`${Wn}-open`]: !!o
    }),
    ref: d
  }, s.createElement(hd.Provider, {
    value: i
  }, s.createElement("div", {
    className: `${Wn}-nav`,
    ref: l
  }, y)), s.createElement(br, {
    visible: !!o,
    position: "top",
    getContainer: r.getContainer,
    className: `${Wn}-popup`,
    maskClassName: `${Wn}-popup-mask`,
    bodyClassName: `${Wn}-popup-body`,
    style: {
      top: u
    },
    forceRender: b,
    onMaskClick: r.closeOnMaskClick ? () => {
      m(null);
    } : void 0
  }, s.createElement("div", {
    ref: c
  }, g.map((p) => {
    const v = p.key === o;
    return s.createElement(_v, {
      key: p.key,
      active: v,
      forceRender: p.props.forceRender,
      destroyOnClose: p.props.destroyOnClose
    }, p.props.children);
  })))));
}), Fv = Sv, q7 = ce(Fv, {
  Item: $v
});
var Ic;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(Ic || (Ic = {}));
const Nv = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var Ac;
function Xi(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += Pv(n + r, t), Dv(t[n + r]) && r++, Av(t[n + r]) && r++, Tv(t[n + r]) && r++, Vv(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function Pv(t, e) {
  const n = e[t];
  if (!Rv(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Tc(r) && Tc(i) ? 4 : Mv(r) && Lv(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : Iv(i) ? 4 : 2;
}
function Rv(t) {
  return t && Tn(t[0].charCodeAt(0), 55296, 56319);
}
function Tc(t) {
  return Tn(nl(t), 127462, 127487);
}
function Mv(t) {
  return Tn(nl(t), 127988, 127988);
}
function Iv(t) {
  return Tn(nl(t), 127995, 127999);
}
function Av(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 65024, 65039);
}
function Tv(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 8400, 8447);
}
function Lv(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && Tn(e, 917504, 917631);
}
function Dv(t) {
  return typeof t == "string" && Nv.includes(t.charCodeAt(0));
}
function Vv(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function nl(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function Tn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(Ac || (Ac = {}));
const jv = "adm-ellipsis", Bv = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, K7 = (t) => {
  const e = z(Bv, t), n = j(null), r = j(null), i = j(null), [o, a] = Y({}), [l, c] = Y(e.defaultExpanded), [u, f] = Y(!1), d = re(() => Xi(e.content), [e.content]);
  function m(v, C) {
    return d.slice(v, C).join("");
  }
  function b() {
    var v, C;
    const h = n.current;
    if (!h)
      return;
    const E = h.style.display;
    h.style.display = "block";
    const w = window.getComputedStyle(h), x = document.createElement("div");
    Array.prototype.slice.apply(w).forEach((_) => {
      x.style.setProperty(_, w.getPropertyValue(_));
    }), h.style.display = E, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const F = va(w.lineHeight), N = Math.floor(F * (e.rows + 0.5) + va(w.paddingTop) + va(w.paddingBottom));
    if (x.innerText = e.content, document.body.appendChild(x), x.offsetHeight <= N)
      f(!1);
    else {
      let $ = function(I, P) {
        if (P - I <= 1)
          return e.direction === "end" ? {
            leading: m(0, I) + "..."
          } : {
            tailing: "..." + m(P, _)
          };
        const A = Math.round((I + P) / 2);
        return e.direction === "end" ? x.innerHTML = m(0, A) + "..." + R : x.innerHTML = R + "..." + m(A, _), x.offsetHeight <= N ? e.direction === "end" ? $(A, P) : $(I, A) : e.direction === "end" ? $(I, A) : $(A, P);
      }, M = function(I, P) {
        if (I[1] - I[0] <= 1 && P[1] - P[0] <= 1)
          return {
            leading: m(0, I[0]) + "...",
            tailing: "..." + m(P[1], _)
          };
        const A = Math.floor((I[0] + I[1]) / 2), V = Math.ceil((P[0] + P[1]) / 2);
        return x.innerHTML = m(0, A) + "..." + R + "..." + m(V, _), x.offsetHeight <= N ? M([A, I[1]], [P[0], V]) : M([I[0], A], [V, P[1]]);
      };
      f(!0);
      const _ = e.content.length, D = typeof e.collapseText == "string" ? e.collapseText : (v = i.current) === null || v === void 0 ? void 0 : v.innerHTML, T = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, R = l ? D : T, S = Math.floor((0 + _) / 2), O = e.direction === "middle" ? M([0, S], [S, _]) : $(0, _);
      a(O);
    }
    document.body.removeChild(x);
  }
  Ei(b, n), Ne(() => {
    b();
  }, [e.content, e.direction, e.rows, e.expandText, e.collapseText]);
  const g = !!e.expandText && rn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, e.expandText)), y = !!e.collapseText && rn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, e.collapseText)), p = () => u ? l ? s.createElement(s.Fragment, null, e.content, y) : s.createElement(s.Fragment, null, o.leading, g, o.tailing) : e.content;
  return W(e, s.createElement("div", {
    ref: n,
    className: jv,
    onClick: (v) => {
      v.target === v.currentTarget && e.onContentClick(v);
    }
  }, p()));
};
function va(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const Wv = (t) => W(t, s.createElement("svg", {
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
}))))), Rr = "adm-empty", Y7 = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(Wv, {
      className: `${Rr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Rr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, s.createElement("div", {
    className: Rr
  }, s.createElement("div", {
    className: `${Rr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: B(`${Rr}-description`)
  }, t.description)));
}, fn = "adm-error-block", Zv = {
  status: "default"
};
function Hv(t) {
  return (n) => {
    var r;
    const i = z(Zv, n), {
      locale: o
    } = oe(), a = o.ErrorBlock[i.status], l = "description" in i ? i.description : a.description, c = "title" in i ? i.title : a.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, s.createElement("div", {
      className: B(fn, {
        [`${fn}-full-page`]: i.fullPage
      })
    }, s.createElement("div", {
      className: `${fn}-image`
    }, f), s.createElement("div", {
      className: `${fn}-description`
    }, ![void 0, null].includes(c) && s.createElement("div", {
      className: `${fn}-description-title`
    }, c), ![void 0, null].includes(l) && s.createElement("div", {
      className: `${fn}-description-subtitle`
    }, l)), i.children && s.createElement("div", {
      className: `${fn}-content`
    }, i.children)));
  };
}
const zv = s.createElement("svg", {
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
}))), Uv = s.createElement("svg", {
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
})))), qv = s.createElement("svg", {
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
})))), Kv = s.createElement("svg", {
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
})))), Yv = {
  default: zv,
  disconnected: Uv,
  empty: qv,
  busy: Kv
}, G7 = Hv(Yv), Vi = "adm-floating-bubble", Gv = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, X7 = (t) => {
  const e = z(Gv, t), n = j(null), r = j(null), [i, o] = Y(e.offset === void 0 ? e.defaultOffset : e.offset);
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
  }, u] = Me(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = St((d) => {
    var m;
    let b = d.offset[0], g = d.offset[1];
    if (d.last && e.magnetic) {
      const p = n.current, v = r.current;
      if (!p || !v)
        return;
      const C = p.getBoundingClientRect(), h = v.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = a.goal - a.get(), w = h.left + E - C.left, x = C.right - (h.right + E);
        x <= w ? b += x : b -= w;
      } else if (e.magnetic === "y") {
        const E = l.goal - l.get(), w = h.top + E - C.top, x = C.bottom - (h.bottom + E);
        x <= w ? g += x : g -= w;
      }
    }
    const y = {
      x: b,
      y: g
    };
    e.offset === void 0 ? u.start(y) : o(y), (m = e.onOffsetChange) === null || m === void 0 || m.call(e, y), u.start({
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
    className: Vi
  }, s.createElement("div", {
    className: `${Vi}-boundary-outer`
  }, s.createElement("div", {
    className: `${Vi}-boundary`,
    ref: n
  })), s.createElement(ye.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: Wh([a, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${Vi}-button`,
    ref: r
  }), e.children)));
};
function rl(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Mr = "adm-floating-panel", Xv = {
  handleDraggingOfContent: !0
}, Q7 = he((t, e) => {
  var n, r;
  const i = z(Xv, t), {
    anchors: o
  } = i, a = (n = o[o.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, l = o.map((C) => -C), c = j(null), u = j(null), f = j(null), [d, m] = Y(!1), b = j(!1), g = {
    top: l[l.length - 1],
    bottom: l[0]
  }, y = jt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: p
  }, v] = Me(() => ({
    y: g.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      y(-C.value.y, p.isAnimating);
    }
  }));
  return St((C) => {
    const [, h] = C.offset;
    if (C.first) {
      const x = C.event.target, k = u.current;
      if (k === x || k != null && k.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const F = p.goal <= g.top, N = f.current;
        if (!N)
          return;
        F ? N.scrollTop <= 0 && C.direction[1] > 0 && (b.current = !0) : b.current = !0;
      }
    }
    if (m(b.current), !b.current)
      return;
    const {
      event: E
    } = C;
    E.cancelable && Fn && E.preventDefault(), E.stopPropagation();
    let w = h;
    C.last && (b.current = !1, m(!1), w = rl(l, h)), v.start({
      y: w
    });
  }, {
    axis: "y",
    bounds: g,
    rubberband: !0,
    from: () => [0, p.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Fn ? {
      passive: !1
    } : void 0
  }), Ee(e, () => ({
    setHeight: (C, h) => {
      v.start({
        y: -C,
        immediate: h == null ? void 0 : h.immediate
      });
    }
  }), [v]), Oo(c, !0), W(i, s.createElement(ye.div, {
    ref: c,
    className: Mr,
    style: {
      height: Math.round(a),
      translateY: p.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, s.createElement("div", {
    className: `${Mr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), s.createElement("div", {
    className: `${Mr}-header`,
    ref: u
  }, s.createElement("div", {
    className: `${Mr}-bar`
  })), s.createElement("div", {
    className: `${Mr}-content`,
    ref: f
  }, i.children)));
});
function go() {
  return go = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, go.apply(this, arguments);
}
function Qv(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function il(t, e) {
  if (t == null)
    return {};
  var n = Qv(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function ze(t) {
  "@babel/helpers - typeof";
  return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ze(t);
}
function Jv(t, e) {
  if (ze(t) !== "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (ze(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function vd(t) {
  var e = Jv(t, "string");
  return ze(e) === "symbol" ? e : String(e);
}
function De(t, e, n) {
  return e = vd(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Lc(t, e) {
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
    e % 2 ? Lc(Object(n), !0).forEach(function(r) {
      De(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Lc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Ga(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function ep(t) {
  if (Array.isArray(t))
    return Ga(t);
}
function pd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function ol(t, e) {
  if (t) {
    if (typeof t == "string")
      return Ga(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ga(t, e);
  }
}
function tp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function se(t) {
  return ep(t) || pd(t) || ol(t) || tp();
}
function Ci(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Dc(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, vd(r.key), r);
  }
}
function xi(t, e, n) {
  return e && Dc(t.prototype, e), n && Dc(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function gd(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Xa(t, e) {
  return Xa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Xa(t, e);
}
function np(t, e) {
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
  }), e && Xa(t, e);
}
function yo(t) {
  return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, yo(t);
}
function rp() {
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
function ip(t, e) {
  if (e && (ze(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return gd(t);
}
function op(t) {
  var e = rp();
  return function() {
    var r = yo(t), i;
    if (e) {
      var o = yo(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else
      i = r.apply(this, arguments);
    return ip(this, i);
  };
}
function Qa(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(Qa(r)) : po.isFragment(r) && r.props ? n = n.concat(Qa(r.props.children, e)) : n.push(r));
  }), n;
}
var Ja = {}, ap = function(e) {
};
function sp(t, e) {
}
function lp(t, e) {
}
function cp() {
  Ja = {};
}
function yd(t, e, n) {
  !e && !Ja[n] && (t(!1, n), Ja[n] = !0);
}
function vt(t, e) {
  yd(sp, t, e);
}
function up(t, e) {
  yd(lp, t, e);
}
vt.preMessage = ap;
vt.resetWarned = cp;
vt.noteOnce = up;
var $n = "RC_FORM_INTERNAL_HOOKS", de = function() {
  vt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Rn = /* @__PURE__ */ L.createContext({
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
});
function es(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Dt() {
  Dt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(S, O, I) {
    S[O] = I.value;
  }, o = typeof Symbol == "function" ? Symbol : {}, a = o.iterator || "@@iterator", l = o.asyncIterator || "@@asyncIterator", c = o.toStringTag || "@@toStringTag";
  function u(S, O, I) {
    return Object.defineProperty(S, O, {
      value: I,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), S[O];
  }
  try {
    u({}, "");
  } catch {
    u = function(I, P, A) {
      return I[P] = A;
    };
  }
  function f(S, O, I, P) {
    var A = O && O.prototype instanceof v ? O : v, V = Object.create(A.prototype), Z = new $(P || []);
    return i(V, "_invoke", {
      value: _(S, I, Z)
    }), V;
  }
  function d(S, O, I) {
    try {
      return {
        type: "normal",
        arg: S.call(O, I)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  e.wrap = f;
  var m = "suspendedStart", b = "suspendedYield", g = "executing", y = "completed", p = {};
  function v() {
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
  var k = h.prototype = v.prototype = Object.create(E);
  function F(S) {
    ["next", "throw", "return"].forEach(function(O) {
      u(S, O, function(I) {
        return this._invoke(O, I);
      });
    });
  }
  function N(S, O) {
    function I(A, V, Z, q) {
      var K = d(S[A], S, V);
      if (K.type !== "throw") {
        var G = K.arg, le = G.value;
        return le && ze(le) == "object" && r.call(le, "__await") ? O.resolve(le.__await).then(function(ue) {
          I("next", ue, Z, q);
        }, function(ue) {
          I("throw", ue, Z, q);
        }) : O.resolve(le).then(function(ue) {
          G.value = ue, Z(G);
        }, function(ue) {
          return I("throw", ue, Z, q);
        });
      }
      q(K.arg);
    }
    var P;
    i(this, "_invoke", {
      value: function(V, Z) {
        function q() {
          return new O(function(K, G) {
            I(V, Z, K, G);
          });
        }
        return P = P ? P.then(q, q) : q();
      }
    });
  }
  function _(S, O, I) {
    var P = m;
    return function(A, V) {
      if (P === g)
        throw new Error("Generator is already running");
      if (P === y) {
        if (A === "throw")
          throw V;
        return {
          value: t,
          done: !0
        };
      }
      for (I.method = A, I.arg = V; ; ) {
        var Z = I.delegate;
        if (Z) {
          var q = D(Z, I);
          if (q) {
            if (q === p)
              continue;
            return q;
          }
        }
        if (I.method === "next")
          I.sent = I._sent = I.arg;
        else if (I.method === "throw") {
          if (P === m)
            throw P = y, I.arg;
          I.dispatchException(I.arg);
        } else
          I.method === "return" && I.abrupt("return", I.arg);
        P = g;
        var K = d(S, O, I);
        if (K.type === "normal") {
          if (P = I.done ? y : b, K.arg === p)
            continue;
          return {
            value: K.arg,
            done: I.done
          };
        }
        K.type === "throw" && (P = y, I.method = "throw", I.arg = K.arg);
      }
    };
  }
  function D(S, O) {
    var I = O.method, P = S.iterator[I];
    if (P === t)
      return O.delegate = null, I === "throw" && S.iterator.return && (O.method = "return", O.arg = t, D(S, O), O.method === "throw") || I !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + I + "' method")), p;
    var A = d(P, S.iterator, O.arg);
    if (A.type === "throw")
      return O.method = "throw", O.arg = A.arg, O.delegate = null, p;
    var V = A.arg;
    return V ? V.done ? (O[S.resultName] = V.value, O.next = S.nextLoc, O.method !== "return" && (O.method = "next", O.arg = t), O.delegate = null, p) : V : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, p);
  }
  function T(S) {
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
    }], S.forEach(T, this), this.reset(!0);
  }
  function M(S) {
    if (S || S === "") {
      var O = S[a];
      if (O)
        return O.call(S);
      if (typeof S.next == "function")
        return S;
      if (!isNaN(S.length)) {
        var I = -1, P = function A() {
          for (; ++I < S.length; )
            if (r.call(S, I))
              return A.value = S[I], A.done = !1, A;
          return A.value = t, A.done = !0, A;
        };
        return P.next = P;
      }
    }
    throw new TypeError(ze(S) + " is not iterable");
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
  }, F(N.prototype), u(N.prototype, l, function() {
    return this;
  }), e.AsyncIterator = N, e.async = function(S, O, I, P, A) {
    A === void 0 && (A = Promise);
    var V = new N(f(S, O, I, P), A);
    return e.isGeneratorFunction(O) ? V : V.next().then(function(Z) {
      return Z.done ? Z.value : V.next();
    });
  }, F(k), u(k, c, "Generator"), u(k, a, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(S) {
    var O = Object(S), I = [];
    for (var P in O)
      I.push(P);
    return I.reverse(), function A() {
      for (; I.length; ) {
        var V = I.pop();
        if (V in O)
          return A.value = V, A.done = !1, A;
      }
      return A.done = !0, A;
    };
  }, e.values = M, $.prototype = {
    constructor: $,
    reset: function(O) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(R), !O)
        for (var I in this)
          I.charAt(0) === "t" && r.call(this, I) && !isNaN(+I.slice(1)) && (this[I] = t);
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
      var I = this;
      function P(G, le) {
        return Z.type = "throw", Z.arg = O, I.next = G, le && (I.method = "next", I.arg = t), !!le;
      }
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var V = this.tryEntries[A], Z = V.completion;
        if (V.tryLoc === "root")
          return P("end");
        if (V.tryLoc <= this.prev) {
          var q = r.call(V, "catchLoc"), K = r.call(V, "finallyLoc");
          if (q && K) {
            if (this.prev < V.catchLoc)
              return P(V.catchLoc, !0);
            if (this.prev < V.finallyLoc)
              return P(V.finallyLoc);
          } else if (q) {
            if (this.prev < V.catchLoc)
              return P(V.catchLoc, !0);
          } else {
            if (!K)
              throw new Error("try statement without catch or finally");
            if (this.prev < V.finallyLoc)
              return P(V.finallyLoc);
          }
        }
      }
    },
    abrupt: function(O, I) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var A = this.tryEntries[P];
        if (A.tryLoc <= this.prev && r.call(A, "finallyLoc") && this.prev < A.finallyLoc) {
          var V = A;
          break;
        }
      }
      V && (O === "break" || O === "continue") && V.tryLoc <= I && I <= V.finallyLoc && (V = null);
      var Z = V ? V.completion : {};
      return Z.type = O, Z.arg = I, V ? (this.method = "next", this.next = V.finallyLoc, p) : this.complete(Z);
    },
    complete: function(O, I) {
      if (O.type === "throw")
        throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && I && (this.next = I), p;
    },
    finish: function(O) {
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var P = this.tryEntries[I];
        if (P.finallyLoc === O)
          return this.complete(P.completion, P.afterLoc), R(P), p;
      }
    },
    catch: function(O) {
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var P = this.tryEntries[I];
        if (P.tryLoc === O) {
          var A = P.completion;
          if (A.type === "throw") {
            var V = A.arg;
            R(P);
          }
          return V;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(O, I, P) {
      return this.delegate = {
        iterator: M(O),
        resultName: I,
        nextLoc: P
      }, this.method === "next" && (this.arg = t), p;
    }
  }, e;
}
function Vc(t, e, n, r, i, o, a) {
  try {
    var l = t[o](a), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function Jo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var o = t.apply(e, n);
      function a(c) {
        Vc(o, r, i, a, l, "next", c);
      }
      function l(c) {
        Vc(o, r, i, a, l, "throw", c);
      }
      a(void 0);
    });
  };
}
function _n() {
  return _n = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, _n.apply(this, arguments);
}
function fp(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, si(t, e);
}
function ts(t) {
  return ts = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ts(t);
}
function si(t, e) {
  return si = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, si(t, e);
}
function dp() {
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
function Qi(t, e, n) {
  return dp() ? Qi = Reflect.construct.bind() : Qi = function(i, o, a) {
    var l = [null];
    l.push.apply(l, o);
    var c = Function.bind.apply(i, l), u = new c();
    return a && si(u, a.prototype), u;
  }, Qi.apply(null, arguments);
}
function mp(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function ns(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return ns = function(r) {
    if (r === null || !mp(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Qi(r, arguments, ts(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), si(i, r);
  }, ns(t);
}
var hp = /%[sdj%]/g, vp = function() {
};
typeof process < "u" && process.env;
function rs(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function Xe(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var i = 0, o = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var a = t.replace(hp, function(l) {
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
function pp(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Pe(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || pp(e) && typeof t == "string" && !t);
}
function gp(t, e, n) {
  var r = [], i = 0, o = t.length;
  function a(l) {
    r.push.apply(r, l || []), i++, i === o && n(r);
  }
  t.forEach(function(l) {
    e(l, a);
  });
}
function jc(t, e, n) {
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
function yp(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Bc = /* @__PURE__ */ function(t) {
  fp(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ ns(Error));
function bp(t, e, n, r, i) {
  if (e.first) {
    var o = new Promise(function(m, b) {
      var g = function(v) {
        return r(v), v.length ? b(new Bc(v, rs(v))) : m(i);
      }, y = yp(t);
      jc(y, n, g);
    });
    return o.catch(function(m) {
      return m;
    }), o;
  }
  var a = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, b) {
    var g = function(p) {
      if (f.push.apply(f, p), u++, u === c)
        return r(f), f.length ? b(new Bc(f, rs(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(y) {
      var p = t[y];
      a.indexOf(y) !== -1 ? jc(p, n, g) : gp(p, n, g);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Ep(t) {
  return !!(t && t.message !== void 0);
}
function wp(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Wc(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = wp(e, t.fullFields) : r = e[n.field || t.fullField], Ep(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Zc(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = _n({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var bd = function(e, n, r, i, o, a) {
  e.required && (!r.hasOwnProperty(e.field) || Pe(n, a || e.type)) && i.push(Xe(o.messages.required, e.fullField));
}, Cp = function(e, n, r, i, o) {
  (/^\s+$/.test(n) || n === "") && i.push(Xe(o.messages.whitespace, e.fullField));
}, ji, xp = function() {
  if (ji)
    return ji;
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
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", g = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", p = "(?::\\d{2,5})?", v = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + g + y + ")" + p + v;
  return ji = new RegExp("(?:^" + C + "$)", "i"), ji;
}, Hc = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Wr = {
  integer: function(e) {
    return Wr.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return Wr.number(e) && !Wr.integer(e);
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
    return typeof e == "object" && !Wr.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Hc.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(xp());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Hc.hex);
  }
}, kp = function(e, n, r, i, o) {
  if (e.required && n === void 0) {
    bd(e, n, r, i, o);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  a.indexOf(l) > -1 ? Wr[l](n) || i.push(Xe(o.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(Xe(o.messages.types[l], e.fullField, e.type));
}, $p = function(e, n, r, i, o) {
  var a = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", g = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (f = n.length), b && (f = n.replace(u, "_").length), a ? f !== e.len && i.push(Xe(o.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(Xe(o.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(Xe(o.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(Xe(o.messages[d].range, e.fullField, e.min, e.max));
}, Zn = "enum", _p = function(e, n, r, i, o) {
  e[Zn] = Array.isArray(e[Zn]) ? e[Zn] : [], e[Zn].indexOf(n) === -1 && i.push(Xe(o.messages[Zn], e.fullField, e[Zn].join(", ")));
}, Op = function(e, n, r, i, o) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(Xe(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var a = new RegExp(e.pattern);
      a.test(n) || i.push(Xe(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, te = {
  required: bd,
  whitespace: Cp,
  type: kp,
  range: $p,
  enum: _p,
  pattern: Op
}, Sp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "string") && !e.required)
      return r();
    te.required(e, n, i, a, o, "string"), Pe(n, "string") || (te.type(e, n, i, a, o), te.range(e, n, i, a, o), te.pattern(e, n, i, a, o), e.whitespace === !0 && te.whitespace(e, n, i, a, o));
  }
  r(a);
}, Fp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && te.type(e, n, i, a, o);
  }
  r(a);
}, Np = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && (te.type(e, n, i, a, o), te.range(e, n, i, a, o));
  }
  r(a);
}, Pp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && te.type(e, n, i, a, o);
  }
  r(a);
}, Rp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), Pe(n) || te.type(e, n, i, a, o);
  }
  r(a);
}, Mp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && (te.type(e, n, i, a, o), te.range(e, n, i, a, o));
  }
  r(a);
}, Ip = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && (te.type(e, n, i, a, o), te.range(e, n, i, a, o));
  }
  r(a);
}, Ap = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    te.required(e, n, i, a, o, "array"), n != null && (te.type(e, n, i, a, o), te.range(e, n, i, a, o));
  }
  r(a);
}, Tp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && te.type(e, n, i, a, o);
  }
  r(a);
}, Lp = "enum", Dp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o), n !== void 0 && te[Lp](e, n, i, a, o);
  }
  r(a);
}, Vp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "string") && !e.required)
      return r();
    te.required(e, n, i, a, o), Pe(n, "string") || te.pattern(e, n, i, a, o);
  }
  r(a);
}, jp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "date") && !e.required)
      return r();
    if (te.required(e, n, i, a, o), !Pe(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), te.type(e, c, i, a, o), c && te.range(e, c.getTime(), i, a, o);
    }
  }
  r(a);
}, Bp = function(e, n, r, i, o) {
  var a = [], l = Array.isArray(n) ? "array" : typeof n;
  te.required(e, n, i, a, o, l), r(a);
}, pa = function(e, n, r, i, o) {
  var a = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Pe(n, a) && !e.required)
      return r();
    te.required(e, n, i, l, o, a), Pe(n, a) || te.type(e, n, i, l, o);
  }
  r(l);
}, Wp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    te.required(e, n, i, a, o);
  }
  r(a);
}, Kr = {
  string: Sp,
  method: Fp,
  number: Np,
  boolean: Pp,
  regexp: Rp,
  integer: Mp,
  float: Ip,
  array: Ap,
  object: Tp,
  enum: Dp,
  pattern: Vp,
  date: jp,
  url: pa,
  hex: pa,
  email: pa,
  required: Bp,
  any: Wp
};
function is() {
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
var os = is(), ki = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = os, this.define(n);
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
    return r && (this._messages = Zc(is(), r)), this._messages;
  }, e.validate = function(r, i, o) {
    var a = this;
    i === void 0 && (i = {}), o === void 0 && (o = function() {
    });
    var l = r, c = i, u = o;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, l), Promise.resolve(l);
    function f(y) {
      var p = [], v = {};
      function C(E) {
        if (Array.isArray(E)) {
          var w;
          p = (w = p).concat.apply(w, E);
        } else
          p.push(E);
      }
      for (var h = 0; h < y.length; h++)
        C(y[h]);
      p.length ? (v = rs(p), u(p, v)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === os && (d = is()), Zc(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(y) {
      var p = a.rules[y], v = l[y];
      p.forEach(function(C) {
        var h = C;
        typeof h.transform == "function" && (l === r && (l = _n({}, l)), v = l[y] = h.transform(v)), typeof h == "function" ? h = {
          validator: h
        } : h = _n({}, h), h.validator = a.getValidationMethod(h), h.validator && (h.field = y, h.fullField = h.fullField || y, h.type = a.getType(h), m[y] = m[y] || [], m[y].push({
          rule: h,
          value: v,
          source: l,
          field: y
        }));
      });
    });
    var g = {};
    return bp(m, c, function(y, p) {
      var v = y.rule, C = (v.type === "object" || v.type === "array") && (typeof v.fields == "object" || typeof v.defaultField == "object");
      C = C && (v.required || !v.required && y.value), v.field = y.field;
      function h(x, k) {
        return _n({}, k, {
          fullField: v.fullField + "." + x,
          fullFields: v.fullFields ? [].concat(v.fullFields, [x]) : [x]
        });
      }
      function E(x) {
        x === void 0 && (x = []);
        var k = Array.isArray(x) ? x : [x];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && v.message !== void 0 && (k = [].concat(v.message));
        var F = k.map(Wc(v, l));
        if (c.first && F.length)
          return g[v.field] = 1, p(F);
        if (!C)
          p(F);
        else {
          if (v.required && !y.value)
            return v.message !== void 0 ? F = [].concat(v.message).map(Wc(v, l)) : c.error && (F = [c.error(v, Xe(c.messages.required, v.field))]), p(F);
          var N = {};
          v.defaultField && Object.keys(y.value).map(function(T) {
            N[T] = v.defaultField;
          }), N = _n({}, N, y.rule.fields);
          var _ = {};
          Object.keys(N).forEach(function(T) {
            var R = N[T], $ = Array.isArray(R) ? R : [R];
            _[T] = $.map(h.bind(null, T));
          });
          var D = new t(_);
          D.messages(c.messages), y.rule.options && (y.rule.options.messages = c.messages, y.rule.options.error = c.error), D.validate(y.value, y.rule.options || c, function(T) {
            var R = [];
            F && F.length && R.push.apply(R, F), T && T.length && R.push.apply(R, T), p(R.length ? R : null);
          });
        }
      }
      var w;
      if (v.asyncValidator)
        w = v.asyncValidator(v, y.value, E, y.source, c);
      else if (v.validator) {
        try {
          w = v.validator(v, y.value, E, y.source, c);
        } catch (x) {
          console.error == null || console.error(x), c.suppressValidatorError || setTimeout(function() {
            throw x;
          }, 0), E(x.message);
        }
        w === !0 ? E() : w === !1 ? E(typeof v.message == "function" ? v.message(v.fullField || v.field) : v.message || (v.fullField || v.field) + " fails") : w instanceof Array ? E(w) : w instanceof Error && E(w.message);
      }
      w && w.then && w.then(function() {
        return E();
      }, function(x) {
        return E(x);
      });
    }, function(y) {
      f(y);
    }, l);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Kr.hasOwnProperty(r.type))
      throw new Error(Xe("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), o = i.indexOf("message");
    return o !== -1 && i.splice(o, 1), i.length === 1 && i[0] === "required" ? Kr.required : Kr[this.getType(r)] || void 0;
  }, t;
}();
ki.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Kr[e] = n;
};
ki.warning = vp;
ki.messages = os;
ki.validators = Kr;
var Ye = "'${name}' is not a valid ${type}", Ed = {
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
    string: Ye,
    method: Ye,
    array: Ye,
    object: Ye,
    number: Ye,
    date: Ye,
    boolean: Ye,
    integer: Ye,
    float: Ye,
    regexp: Ye,
    email: Ye,
    url: Ye,
    hex: Ye
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
function wd(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function Cd(t) {
  if (Array.isArray(t))
    return t;
}
function xd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Zp(t) {
  return Cd(t) || pd(t) || ol(t) || xd();
}
function kd(t, e, n, r) {
  if (!e.length)
    return n;
  var i = Zp(e), o = i[0], a = i.slice(1), l;
  return !t && typeof o == "number" ? l = [] : Array.isArray(t) ? l = se(t) : l = ae({}, t), r && n === void 0 && a.length === 1 ? delete l[o][a[0]] : l[o] = kd(l[o], a, n, r), l;
}
function Hp(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !wd(t, e.slice(0, -1)) ? t : kd(t, e, n, r);
}
function ea(t) {
  return Array.isArray(t) ? Up(t) : ze(t) === "object" && t !== null ? zp(t) : t;
}
function zp(t) {
  if (Object.getPrototypeOf(t) === Object.prototype) {
    var e = {};
    for (var n in t)
      e[n] = ea(t[n]);
    return e;
  }
  return t;
}
function Up(t) {
  return t.map(function(e) {
    return ea(e);
  });
}
function $e(t) {
  return es(t);
}
function en(t, e) {
  var n = wd(t, e);
  return n;
}
function Gt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = Hp(t, e, n, r);
  return i;
}
function zc(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = en(t, r);
    n = Gt(n, r, i);
  }), n;
}
function Yr(t, e) {
  return t && t.some(function(n) {
    return _d(n, e);
  });
}
function Uc(t) {
  return ze(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function $d(t, e) {
  var n = Array.isArray(t) ? se(t) : ae({}, t);
  return e && Object.keys(e).forEach(function(r) {
    var i = n[r], o = e[r], a = Uc(i) && Uc(o);
    n[r] = a ? $d(i, o || {}) : ea(o);
  }), n;
}
function Ji(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, o) {
    return $d(i, o);
  }, t);
}
function _d(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function qp(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || ze(t) !== "object" || ze(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return se(i).every(function(o) {
    var a = t[o], l = e[o];
    return typeof a == "function" && typeof l == "function" ? !0 : a === l;
  });
}
function Kp(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && ze(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function qc(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], o = e - n;
  return o > 0 ? [].concat(se(t.slice(0, n)), [i], se(t.slice(n, e)), se(t.slice(e + 1, r))) : o < 0 ? [].concat(se(t.slice(0, e)), se(t.slice(e + 1, n + 1)), [i], se(t.slice(n + 1, r))) : t;
}
var Yp = ki;
function Gp(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var Kc = "CODE_LOGIC_ERROR";
function as(t, e, n, r, i) {
  return ss.apply(this, arguments);
}
function ss() {
  return ss = Jo(/* @__PURE__ */ Dt().mark(function t(e, n, r, i, o) {
    var a, l, c, u, f, d, m, b, g;
    return Dt().wrap(function(p) {
      for (; ; )
        switch (p.prev = p.next) {
          case 0:
            return a = ae({}, r), delete a.ruleIndex, a.validator && (l = a.validator, a.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (v) {
                return console.error(v), Promise.reject(Kc);
              }
            }), c = null, a && a.type === "array" && a.defaultField && (c = a.defaultField, delete a.defaultField), u = new Yp(De({}, e, [a])), f = Ji({}, Ed, i.validateMessages), u.messages(f), d = [], p.prev = 9, p.next = 12, Promise.resolve(u.validate(De({}, e, n), ae({}, i)));
          case 12:
            p.next = 17;
            break;
          case 14:
            p.prev = 14, p.t0 = p.catch(9), p.t0.errors && (d = p.t0.errors.map(function(v, C) {
              var h = v.message, E = h === Kc ? f.default : h;
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
            return p.next = 20, Promise.all(n.map(function(v, C) {
              return as("".concat(e, ".").concat(C), v, c, i, o);
            }));
          case 20:
            return m = p.sent, p.abrupt("return", m.reduce(function(v, C) {
              return [].concat(se(v), se(C));
            }, []));
          case 22:
            return b = ae(ae({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, o), g = d.map(function(v) {
              return typeof v == "string" ? Gp(v, b) : v;
            }), p.abrupt("return", g);
          case 25:
          case "end":
            return p.stop();
        }
    }, t, null, [[9, 14]]);
  })), ss.apply(this, arguments);
}
function Xp(t, e, n, r, i, o) {
  var a = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, b = ae(ae({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(g, y, p) {
      var v = !1, C = function() {
        for (var w = arguments.length, x = new Array(w), k = 0; k < w; k++)
          x[k] = arguments[k];
        Promise.resolve().then(function() {
          vt(!v, "Your validator function has already return a promise. `callback` will be ignored."), v || p.apply(void 0, x);
        });
      }, h = m(g, y, C);
      v = h && typeof h.then == "function" && typeof h.catch == "function", vt(v, "`callback` is deprecated. Please return a promise instead."), v && h.then(function() {
        p();
      }).catch(function(E) {
        p(E || " ");
      });
    }), b;
  }).sort(function(f, d) {
    var m = f.warningOnly, b = f.ruleIndex, g = d.warningOnly, y = d.ruleIndex;
    return !!m == !!g ? b - y : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = Jo(/* @__PURE__ */ Dt().mark(function d(m, b) {
        var g, y, p;
        return Dt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                g = 0;
              case 1:
                if (!(g < l.length)) {
                  C.next = 12;
                  break;
                }
                return y = l[g], C.next = 5, as(a, e, y, r, o);
              case 5:
                if (p = C.sent, !p.length) {
                  C.next = 9;
                  break;
                }
                return b([{
                  errors: p,
                  rule: y
                }]), C.abrupt("return");
              case 9:
                g += 1, C.next = 1;
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
      return as(a, e, f, r, o).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? Jp(u) : Qp(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function Qp(t) {
  return ls.apply(this, arguments);
}
function ls() {
  return ls = Jo(/* @__PURE__ */ Dt().mark(function t(e) {
    return Dt().wrap(function(r) {
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
  })), ls.apply(this, arguments);
}
function Jp(t) {
  return cs.apply(this, arguments);
}
function cs() {
  return cs = Jo(/* @__PURE__ */ Dt().mark(function t(e) {
    var n;
    return Dt().wrap(function(i) {
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
  })), cs.apply(this, arguments);
}
var eg = ["name"], tt = [];
function Yc(t, e, n, r, i, o) {
  return typeof t == "function" ? t(e, n, "source" in o ? {
    source: o.source
  } : {}) : r !== i;
}
var al = /* @__PURE__ */ function(t) {
  np(n, t);
  var e = op(n);
  function n(r) {
    var i;
    if (Ci(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = tt, i.warnings = tt, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, $e(d)), i.cancelRegisterFunc = null;
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
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, g = b === void 0 ? [] : b, y = d.onReset, p = f.store, v = i.getNamePath(), C = i.getValue(c), h = i.getValue(p), E = u && Yr(u, v);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== h && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), y == null || y(), i.refresh();
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
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || tt), "warnings" in w && (i.warnings = w.warnings || tt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !v.length && Yc(m, c, p, C, h, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = g.map($e);
          if (x.some(function(k) {
            return Yr(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!g.length || v.length || m) && Yc(m, c, p, C, h, f)) {
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
        var m = i.props, b = m.validateFirst, g = b === void 0 ? !1 : b, y = m.messageVariables, p = c || {}, v = p.triggerName, C = i.getRules();
        v && (C = C.filter(function(E) {
          return E;
        }).filter(function(E) {
          var w = E.validateTrigger;
          if (!w)
            return !0;
          var x = es(w);
          return x.includes(v);
        }));
        var h = Xp(u, f, C, c, g, y);
        return h.catch(function(E) {
          return E;
        }).then(function() {
          var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tt;
          if (i.validatePromise === d) {
            var w;
            i.validatePromise = null;
            var x = [], k = [];
            (w = E.forEach) === null || w === void 0 || w.call(E, function(F) {
              var N = F.rule.warningOnly, _ = F.errors, D = _ === void 0 ? tt : _;
              N ? k.push.apply(k, se(D)) : x.push.apply(x, se(D));
            }), i.errors = x, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), h;
      });
      return i.validatePromise = d, i.dirty = !0, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), i.reRender(), d;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks($n), f = u.getInitialValue;
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
      var f = Qa(c);
      return f.length !== 1 || !/* @__PURE__ */ L.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return en(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, g = u.valuePropName, y = u.getValueProps, p = u.fieldContext, v = d !== void 0 ? d : p.validateTrigger, C = i.getNamePath(), h = p.getInternalHooks, E = p.getFieldsValue, w = h($n), x = w.dispatch, k = i.getValue(), F = y || function(T) {
        return De({}, g, T);
      }, N = c[f], _ = ae(ae({}, c), F(k));
      _[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var T, R = arguments.length, $ = new Array(R), M = 0; M < R; M++)
          $[M] = arguments[M];
        m ? T = m.apply(void 0, $) : T = Kp.apply(void 0, [g].concat($)), b && (T = b(T, k, E(!0))), x({
          type: "updateValue",
          namePath: C,
          value: T
        }), N && N.apply(void 0, $);
      };
      var D = es(v || []);
      return D.forEach(function(T) {
        var R = _[T];
        _[T] = function() {
          R && R.apply(void 0, arguments);
          var $ = i.props.rules;
          $ && $.length && x({
            type: "validateField",
            namePath: C,
            triggerName: T
          });
        };
      }), _;
    }, r.fieldContext) {
      var o = r.fieldContext.getInternalHooks, a = o($n), l = a.initEntityValue;
      l(gd(i));
    }
    return i;
  }
  return xi(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, o = i.shouldUpdate, a = i.fieldContext;
      if (this.mounted = !0, a) {
        var l = a.getInternalHooks, c = l($n), u = c.registerField;
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
      return c ? u = l : /* @__PURE__ */ L.isValidElement(l) ? u = /* @__PURE__ */ L.cloneElement(l, this.getControlled(l.props)) : (vt(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
al.contextType = Rn;
al.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function sl(t) {
  var e = t.name, n = il(t, eg), r = L.useContext(Rn), i = e !== void 0 ? $e(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(al, go({
    key: o,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var tg = /* @__PURE__ */ L.createContext(null), Od = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, o = e.rules, a = e.validateTrigger, l = L.useContext(Rn), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = L.useMemo(function() {
    var g = $e(l.prefixName) || [];
    return [].concat(se(g), se($e(n)));
  }, [l.prefixName, n]), d = L.useMemo(function() {
    return ae(ae({}, l), {}, {
      prefixName: f
    });
  }, [l, f]), m = L.useMemo(function() {
    return {
      getKey: function(y) {
        var p = f.length, v = y[p];
        return [u.keys[v], y.slice(p + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return vt(!1, "Form.List only accepts function as children."), null;
  var b = function(y, p, v) {
    var C = v.source;
    return C === "internal" ? !1 : y !== p;
  };
  return /* @__PURE__ */ L.createElement(tg.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: d
  }, /* @__PURE__ */ L.createElement(sl, {
    name: [],
    shouldUpdate: b,
    rules: o,
    validateTrigger: a,
    initialValue: r,
    isList: !0
  }, function(g, y) {
    var p = g.value, v = p === void 0 ? [] : p, C = g.onChange, h = l.getFieldValue, E = function() {
      var F = h(f || []);
      return F || [];
    }, w = {
      add: function(F, N) {
        var _ = E();
        N >= 0 && N <= _.length ? (u.keys = [].concat(se(u.keys.slice(0, N)), [u.id], se(u.keys.slice(N))), C([].concat(se(_.slice(0, N)), [F], se(_.slice(N))))) : (u.keys = [].concat(se(u.keys), [u.id]), C([].concat(se(_), [F]))), u.id += 1;
      },
      remove: function(F) {
        var N = E(), _ = new Set(Array.isArray(F) ? F : [F]);
        _.size <= 0 || (u.keys = u.keys.filter(function(D, T) {
          return !_.has(T);
        }), C(N.filter(function(D, T) {
          return !_.has(T);
        })));
      },
      move: function(F, N) {
        if (F !== N) {
          var _ = E();
          F < 0 || F >= _.length || N < 0 || N >= _.length || (u.keys = qc(u.keys, F, N), C(qc(_, F, N)));
        }
      }
    }, x = v || [];
    return Array.isArray(x) || (x = []), i(x.map(function(k, F) {
      var N = u.keys[F];
      return N === void 0 && (u.keys[F] = u.id, N = u.keys[F], u.id += 1), {
        name: F,
        key: N,
        isListField: !0
      };
    }), w, y);
  })));
};
function ng(t, e) {
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
function on(t, e) {
  return Cd(t) || ng(t, e) || ol(t, e) || xd();
}
function rg(t) {
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
var Sd = "__@field_split__";
function ga(t) {
  return t.map(function(e) {
    return "".concat(ze(e), ":").concat(e);
  }).join(Sd);
}
var Hn = /* @__PURE__ */ function() {
  function t() {
    Ci(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return xi(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(ga(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(ga(n));
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
      this.kvs.delete(ga(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return se(this.kvs.entries()).map(function(r) {
        var i = on(r, 2), o = i[0], a = i[1], l = o.split(Sd);
        return n({
          key: l.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = on(u, 3), d = f[1], m = f[2];
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
}(), ig = ["name", "errors"], og = /* @__PURE__ */ xi(function t(e) {
  var n = this;
  Ci(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === $n ? (n.formHooked = !0, {
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
    }) : (vt(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(r) {
    n.subscribable = r;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(r, i) {
    if (n.initialValues = r || {}, i) {
      var o, a = Ji({}, r, n.store);
      (o = n.prevWithoutPreserves) === null || o === void 0 || o.map(function(l) {
        var c = l.key;
        a = Gt(a, c, en(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(a);
    }
  }, this.destroyForm = function() {
    var r = new Hn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = en(n.initialValues, r);
    return r.length ? ea(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Hn();
    return n.getFieldEntities(r).forEach(function(o) {
      var a = o.getNamePath();
      i.set(a, o);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(o) {
      var a = $e(o);
      return i.get(a) || {
        INVALIDATE_NAME_PATH: $e(o)
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
    }), zc(n.store, a.map($e));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = $e(r);
    return en(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(o, a) {
      return o && !("INVALIDATE_NAME_PATH" in o) ? {
        name: o.getNamePath(),
        errors: o.getErrors(),
        warnings: o.getWarnings()
      } : {
        name: $e(r[a]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = $e(r), o = n.getFieldsError([i])[0];
    return o.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = $e(r), o = n.getFieldsError([i])[0];
    return o.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++)
      i[o] = arguments[o];
    var a = i[0], l = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(a) ? (c = a.map($e), u = !1) : (c = null, u = a) : (c = a.map($e), u = l);
    var f = n.getFieldEntities(!0), d = function(p) {
      return p.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Hn();
    c.forEach(function(y) {
      m.set(y, []);
    }), f.forEach(function(y) {
      var p = y.getNamePath();
      c.forEach(function(v) {
        v.every(function(C, h) {
          return p[h] === C;
        }) && m.update(v, function(C) {
          return [].concat(se(C), [y]);
        });
      });
    });
    var b = function(p) {
      return p.some(d);
    }, g = m.map(function(y) {
      var p = y.value;
      return p;
    });
    return u ? g.every(b) : g.some(b);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(a) {
        return a.isFieldValidating();
      });
    var o = r.map($e);
    return i.some(function(a) {
      var l = a.getNamePath();
      return Yr(o, l) && a.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Hn(), o = n.getFieldEntities(!0);
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
            vt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var g = i.get(m);
            if (g && g.size > 1)
              vt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var y = n.getFieldValue(m);
              (!r.skipExist || y === void 0) && n.updateStore(Gt(n.store, m, se(g)[0].value));
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
      n.updateStore(Ji({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var o = r.map($e);
    o.forEach(function(a) {
      var l = n.getInitialValue(a);
      n.updateStore(Gt(n.store, a, l));
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
      var c = il(a, ig), u = $e(l);
      o.push(u), "value" in c && n.updateStore(Gt(n.store, u, c.value)), n.notifyObservers(i, [u], {
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
      var o = r.getNamePath(), a = en(n.store, o);
      a === void 0 && n.updateStore(Gt(n.store, o, i));
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
            !_d(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(Gt(f, i, u, !0)), n.notifyObservers(f, [i], {
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
    var o = $e(r), a = n.store;
    n.updateStore(Gt(n.store, o, i)), n.notifyObservers(a, [o], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([o]);
    var l = n.triggerDependenciesUpdate(a, o), c = n.callbacks.onValuesChange;
    if (c) {
      var u = zc(n.store, [o]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([o].concat(se(l)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var o = Ji(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), o = [], a = new Hn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = $e(f);
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
        var l = new Hn();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          l.set(f, d);
        }), a.forEach(function(u) {
          u.errors = l.get(u.name) || u.errors;
        });
      }
      var c = a.filter(function(u) {
        var f = u.name;
        return Yr(r, f);
      });
      o(c, a);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var o = !!r, a = o ? r.map($e) : [], l = [];
    n.getFieldEntities(!0).forEach(function(f) {
      if (o || a.push(f.getNamePath()), i != null && i.recursive && o) {
        var d = f.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        d.every(function(g, y) {
          return r[y] === g || r[y] === void 0;
        }) && a.push(d);
      }
      if (!(!f.props.rules || !f.props.rules.length)) {
        var m = f.getNamePath();
        if (!o || Yr(a, m)) {
          var b = f.validateRules(ae({
            validateMessages: ae(ae({}, Ed), n.validateMessages)
          }, i));
          l.push(b.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(g) {
            var y, p = [], v = [];
            return (y = g.forEach) === null || y === void 0 || y.call(g, function(C) {
              var h = C.rule.warningOnly, E = C.errors;
              h ? v.push.apply(v, se(E)) : p.push.apply(p, se(E));
            }), p.length ? Promise.reject({
              name: m,
              errors: p,
              warnings: v
            }) : {
              name: m,
              errors: p,
              warnings: v
            };
          }));
        }
      }
    });
    var c = rg(l);
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
function ll(t) {
  var e = L.useRef(), n = L.useState({}), r = on(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var o = function() {
        i({});
      }, a = new og(o);
      e.current = a.getForm();
    }
  return [e.current];
}
var us = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), ag = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, o = e.children, a = L.useContext(us), l = L.useRef({});
  return /* @__PURE__ */ L.createElement(us.Provider, {
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
        u && (l.current = ae(ae({}, l.current), {}, De({}, u, f))), a.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = ae({}, l.current);
        delete f[u], l.current = f, a.unregisterForm(u);
      }
    })
  }, o);
}, sg = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], lg = function(e, n) {
  var r = e.name, i = e.initialValues, o = e.fields, a = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, g = e.onValuesChange, y = e.onFieldsChange, p = e.onFinish, v = e.onFinishFailed, C = il(e, sg), h = L.useContext(us), E = ll(a), w = on(E, 1), x = w[0], k = x.getInternalHooks($n), F = k.useSubscribe, N = k.setInitialValues, _ = k.setCallbacks, D = k.setValidateMessages, T = k.setPreserve, R = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return x;
  }), L.useEffect(function() {
    return h.registerForm(r, x), function() {
      h.unregisterForm(r);
    };
  }, [h, x, r]), D(ae(ae({}, h.validateMessages), d)), _({
    onValuesChange: g,
    onFieldsChange: function(Z) {
      if (h.triggerFormChange(r, Z), y) {
        for (var q = arguments.length, K = new Array(q > 1 ? q - 1 : 0), G = 1; G < q; G++)
          K[G - 1] = arguments[G];
        y.apply(void 0, [Z].concat(K));
      }
    },
    onFinish: function(Z) {
      h.triggerFormFinish(r, Z), p && p(Z);
    },
    onFinishFailed: v
  }), T(l);
  var $ = L.useRef(null);
  N(i, !$.current), $.current || ($.current = !0), L.useEffect(
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
  F(!S);
  var I = L.useRef();
  L.useEffect(function() {
    qp(I.current || [], o || []) || x.setFields(o || []), I.current = o;
  }, [o, x]);
  var P = L.useMemo(function() {
    return ae(ae({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), A = /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: P
  }, M);
  return f === !1 ? A : /* @__PURE__ */ L.createElement(f, go({}, C, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), x.submit();
    },
    onReset: function(Z) {
      var q;
      Z.preventDefault(), x.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, Z);
    }
  }), A);
};
function Gc(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function cl() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, o = e[1], a = Y(), l = on(a, 2), c = l[0], u = l[1], f = re(function() {
    return Gc(c);
  }, [c]), d = j(f);
  d.current = f;
  var m = at(Rn), b = o || m, g = b && b._init, y = $e(i), p = j(y);
  return p.current = y, X(
    function() {
      if (g) {
        var v = b.getFieldsValue, C = b.getInternalHooks, h = C($n), E = h.registerWatch, w = E(function(k) {
          var F = en(k, p.current), N = Gc(F);
          d.current !== N && (d.current = N, u(F));
        }), x = en(v(), p.current);
        return u(x), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g]
  ), c;
}
var cg = /* @__PURE__ */ L.forwardRef(lg), Cr = cg;
Cr.FormProvider = ag;
Cr.Field = sl;
Cr.List = Od;
Cr.useForm = ll;
Cr.useWatch = cl;
const Fd = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, ul = s.createContext(Fd), Xc = s.createContext(null), Nd = () => null;
var ug = function(e) {
  return fg(e) && !dg(e);
};
function fg(t) {
  return !!t && typeof t == "object";
}
function dg(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || vg(t);
}
var mg = typeof Symbol == "function" && Symbol.for, hg = mg ? Symbol.for("react.element") : 60103;
function vg(t) {
  return t.$$typeof === hg;
}
function pg(t) {
  return Array.isArray(t) ? [] : {};
}
function li(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? sr(pg(t), t, e) : t;
}
function gg(t, e, n) {
  return t.concat(e).map(function(r) {
    return li(r, n);
  });
}
function yg(t, e) {
  if (!e.customMerge)
    return sr;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : sr;
}
function bg(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Qc(t) {
  return Object.keys(t).concat(bg(t));
}
function Pd(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function Eg(t, e) {
  return Pd(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function wg(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && Qc(t).forEach(function(i) {
    r[i] = li(t[i], n);
  }), Qc(e).forEach(function(i) {
    Eg(t, i) || (Pd(t, i) && n.isMergeableObject(e[i]) ? r[i] = yg(i, n)(t[i], e[i], n) : r[i] = li(e[i], n));
  }), r;
}
function sr(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || gg, n.isMergeableObject = n.isMergeableObject || ug, n.cloneUnlessOtherwiseSpecified = li;
  var r = Array.isArray(e), i = Array.isArray(t), o = r === i;
  return o ? r ? n.arrayMerge(t, e, n) : wg(t, e, n) : li(e, n);
}
sr.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return sr(r, i, n);
  }, {});
};
var Cg = sr, xg = Cg;
const kg = /* @__PURE__ */ Ot(xg), Rd = (t) => s.createElement(Od, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((o) => ({
    index: o.name,
    key: o.key
  })), i = t.children(r, n).map((o, a) => {
    var l;
    return s.createElement(xt, {
      key: r[a].key,
      mode: "card",
      header: (l = t.renderHeader) === null || l === void 0 ? void 0 : l.call(t, r[a], n)
    }, o);
  });
  return t.renderAdd && i.push(s.createElement(xt, {
    key: "add",
    mode: "card"
  }, s.createElement(xt.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), s.createElement(s.Fragment, null, i);
}), Jc = "adm-form", $g = Fd, _g = he((t, e) => {
  const n = z($g, t), {
    className: r,
    style: i,
    hasFeedback: o,
    children: a,
    layout: l,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = dr(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: b
  } = oe(), g = re(() => kg(b.Form.defaultValidateMessages, m.validateMessages || {}), [b.Form.defaultValidateMessages, m.validateMessages]), y = [];
  let p = null, v = [], C = 0;
  function h() {
    v.length !== 0 && (C += 1, y.push(s.createElement(xt, {
      header: p,
      key: C,
      mode: u
    }, v)), v = []);
  }
  return un(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === Nd) {
        h(), p = E.props.children;
        return;
      }
      if (E.type === Rd) {
        h(), y.push(E);
        return;
      }
    }
    v.push(E);
  }), h(), s.createElement(Cr, Object.assign({
    className: B(Jc, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: g
  }), s.createElement(ul.Provider, {
    value: {
      name: m.name,
      hasFeedback: o,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, y), c && s.createElement("div", {
    className: `${Jc}-footer`
  }, c));
});
var ci = {}, Md = { exports: {} }, Id = { exports: {} };
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
})(Id);
var Og = Id.exports;
(function(t) {
  var e = Og.default;
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
})(Md);
var Sg = Md.exports, Ad = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Ad);
var Fg = Ad.exports, ut = {};
Object.defineProperty(ut, "__esModule", {
  value: !0
});
ut.call = fl;
ut.default = void 0;
ut.note = Ld;
ut.noteOnce = Vd;
ut.preMessage = void 0;
ut.resetWarned = Dd;
ut.warning = Td;
ut.warningOnce = $i;
var fs = {}, Ng = ut.preMessage = function(e) {
};
function Td(t, e) {
}
function Ld(t, e) {
}
function Dd() {
  fs = {};
}
function fl(t, e, n) {
  !e && !fs[n] && (t(!1, n), fs[n] = !0);
}
function $i(t, e) {
  fl(Td, t, e);
}
function Vd(t, e) {
  fl(Ld, t, e);
}
$i.preMessage = Ng;
$i.resetWarned = Dd;
$i.noteOnce = Vd;
ut.default = $i;
var Pg = Sg.default, Rg = Fg.default;
Object.defineProperty(ci, "__esModule", {
  value: !0
});
var jd = ci.default = ci.HOOK_MARK = void 0, Mg = Rg(ut), Ig = Pg(s), Ag = "RC_FORM_INTERNAL_HOOKS";
ci.HOOK_MARK = Ag;
var me = function() {
  (0, Mg.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Tg = /* @__PURE__ */ Ig.createContext({
  getFieldValue: me,
  getFieldsValue: me,
  getFieldError: me,
  getFieldWarning: me,
  getFieldsError: me,
  isFieldsTouched: me,
  isFieldTouched: me,
  isFieldValidating: me,
  isFieldsValidating: me,
  resetFields: me,
  setFields: me,
  setFieldValue: me,
  setFieldsValue: me,
  validateFields: me,
  submit: me,
  getInternalHooks: function() {
    return me(), {
      dispatch: me,
      initEntityValue: me,
      registerField: me,
      useSubscribe: me,
      setInitialValues: me,
      destroyForm: me,
      setCallbacks: me,
      registerWatch: me,
      getFields: me,
      setValidateMessages: me,
      setPreserve: me,
      getInitialValue: me
    };
  }
}), Lg = Tg;
jd = ci.default = Lg;
function Dg(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const Vg = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), jg = ["top", "right", "bottom", "left"], lr = Math.min, On = Math.max, bo = Math.round, Bi = Math.floor, an = (t) => ({
  x: t,
  y: t
}), Bg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Wg = {
  start: "end",
  end: "start"
};
function ds(t, e, n) {
  return On(t, lr(e, n));
}
function sn(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function ln(t) {
  return t.split("-")[0];
}
function _i(t) {
  return t.split("-")[1];
}
function dl(t) {
  return t === "x" ? "y" : "x";
}
function ml(t) {
  return t === "y" ? "height" : "width";
}
function Oi(t) {
  return ["top", "bottom"].includes(ln(t)) ? "y" : "x";
}
function hl(t) {
  return dl(Oi(t));
}
function Zg(t, e, n) {
  n === void 0 && (n = !1);
  const r = _i(t), i = hl(t), o = ml(i);
  let a = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (a = Eo(a)), [a, Eo(a)];
}
function Hg(t) {
  const e = Eo(t);
  return [ms(t), e, ms(e)];
}
function ms(t) {
  return t.replace(/start|end/g, (e) => Wg[e]);
}
function zg(t, e, n) {
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
function Ug(t, e, n, r) {
  const i = _i(t);
  let o = zg(ln(t), n === "start", r);
  return i && (o = o.map((a) => a + "-" + i), e && (o = o.concat(o.map(ms)))), o;
}
function Eo(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Bg[e]);
}
function qg(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Bd(t) {
  return typeof t != "number" ? qg(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function wo(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function eu(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const o = Oi(e), a = hl(e), l = ml(a), c = ln(e), u = o === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
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
  switch (_i(e)) {
    case "start":
      b[a] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      b[a] += m * (n && u ? -1 : 1);
      break;
  }
  return b;
}
const Kg = async (t, e, n) => {
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
  } = eu(u, r, c), m = r, b = {}, g = 0;
  for (let y = 0; y < l.length; y++) {
    const {
      name: p,
      fn: v
    } = l[y], {
      x: C,
      y: h,
      data: E,
      reset: w
    } = await v({
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
    }, w && g <= 50) {
      g++, typeof w == "object" && (w.placement && (m = w.placement), w.rects && (u = w.rects === !0 ? await a.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : w.rects), {
        x: f,
        y: d
      } = eu(u, m, c)), y = -1;
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
async function Co(t, e) {
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
  } = sn(e, t), g = Bd(b), p = l[m ? d === "floating" ? "reference" : "floating" : d], v = wo(await o.getClippingRect({
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
  }, w = wo(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: h,
    strategy: c
  }) : C);
  return {
    top: (v.top - w.top + g.top) / E.y,
    bottom: (w.bottom - v.bottom + g.bottom) / E.y,
    left: (v.left - w.left + g.left) / E.x,
    right: (w.right - v.right + g.right) / E.x
  };
}
const Yg = (t) => ({
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
    } = sn(t, e) || {};
    if (u == null)
      return {};
    const d = Bd(f), m = {
      x: n,
      y: r
    }, b = hl(i), g = ml(b), y = await a.getDimensions(u), p = b === "y", v = p ? "top" : "left", C = p ? "bottom" : "right", h = p ? "clientHeight" : "clientWidth", E = o.reference[g] + o.reference[b] - m[b] - o.floating[g], w = m[b] - o.reference[b], x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let k = x ? x[h] : 0;
    (!k || !await (a.isElement == null ? void 0 : a.isElement(x))) && (k = l.floating[h] || o.floating[g]);
    const F = E / 2 - w / 2, N = k / 2 - y[g] / 2 - 1, _ = lr(d[v], N), D = lr(d[C], N), T = _, R = k - y[g] - D, $ = k / 2 - y[g] / 2 + F, M = ds(T, $, R), S = !c.arrow && _i(i) != null && $ != M && o.reference[g] / 2 - ($ < T ? _ : D) - y[g] / 2 < 0, O = S ? $ < T ? $ - T : $ - R : 0;
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
}), Gg = function(t) {
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
        fallbackAxisSideDirection: g = "none",
        flipAlignment: y = !0,
        ...p
      } = sn(t, e);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const v = ln(i), C = ln(l) === l, h = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (C || !y ? [Eo(l)] : Hg(l));
      !m && g !== "none" && E.push(...Ug(l, y, g, h));
      const w = [l, ...E], x = await Co(e, p), k = [];
      let F = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(x[v]), d) {
        const T = Zg(i, a, h);
        k.push(x[T[0]], x[T[1]]);
      }
      if (F = [...F, {
        placement: i,
        overflows: k
      }], !k.every((T) => T <= 0)) {
        var N, _;
        const T = (((N = o.flip) == null ? void 0 : N.index) || 0) + 1, R = w[T];
        if (R)
          return {
            data: {
              index: T,
              overflows: F
            },
            reset: {
              placement: R
            }
          };
        let $ = (_ = F.filter((M) => M.overflows[0] <= 0).sort((M, S) => M.overflows[1] - S.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!$)
          switch (b) {
            case "bestFit": {
              var D;
              const M = (D = F.map((S) => [S.placement, S.overflows.filter((O) => O > 0).reduce((O, I) => O + I, 0)]).sort((S, O) => S[1] - O[1])[0]) == null ? void 0 : D[0];
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
function tu(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function nu(t) {
  return jg.some((e) => t[e] >= 0);
}
const Xg = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = sn(t, e);
      switch (r) {
        case "referenceHidden": {
          const o = await Co(e, {
            ...i,
            elementContext: "reference"
          }), a = tu(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: nu(a)
            }
          };
        }
        case "escaped": {
          const o = await Co(e, {
            ...i,
            altBoundary: !0
          }), a = tu(o, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: nu(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Qg(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), a = ln(n), l = _i(n), c = Oi(n) === "y", u = ["left", "top"].includes(a) ? -1 : 1, f = o && c ? -1 : 1, d = sn(e, t);
  let {
    mainAxis: m,
    crossAxis: b,
    alignmentAxis: g
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
  return l && typeof g == "number" && (b = l === "end" ? g * -1 : g), c ? {
    x: b * f,
    y: m * u
  } : {
    x: m * u,
    y: b * f
  };
}
const Jg = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await Qg(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, e5 = function(t) {
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
              x: v,
              y: C
            } = p;
            return {
              x: v,
              y: C
            };
          }
        },
        ...c
      } = sn(t, e), u = {
        x: n,
        y: r
      }, f = await Co(e, c), d = Oi(ln(i)), m = dl(d);
      let b = u[m], g = u[d];
      if (o) {
        const p = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", C = b + f[p], h = b - f[v];
        b = ds(C, b, h);
      }
      if (a) {
        const p = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", C = g + f[p], h = g - f[v];
        g = ds(C, g, h);
      }
      const y = l.fn({
        ...e,
        [m]: b,
        [d]: g
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r
        }
      };
    }
  };
}, t5 = function(t) {
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
      } = sn(t, e), f = {
        x: n,
        y: r
      }, d = Oi(i), m = dl(d);
      let b = f[m], g = f[d];
      const y = sn(l, e), p = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (c) {
        const h = m === "y" ? "height" : "width", E = o.reference[m] - o.floating[h] + p.mainAxis, w = o.reference[m] + o.reference[h] - p.mainAxis;
        b < E ? b = E : b > w && (b = w);
      }
      if (u) {
        var v, C;
        const h = m === "y" ? "width" : "height", E = ["top", "left"].includes(ln(i)), w = o.reference[d] - o.floating[h] + (E && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (E ? 0 : p.crossAxis), x = o.reference[d] + o.reference[h] + (E ? 0 : ((C = a.offset) == null ? void 0 : C[d]) || 0) - (E ? p.crossAxis : 0);
        g < w ? g = w : g > x && (g = x);
      }
      return {
        [m]: b,
        [d]: g
      };
    }
  };
};
function cn(t) {
  return Wd(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Qe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Bt(t) {
  var e;
  return (e = (Wd(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Wd(t) {
  return t instanceof Node || t instanceof Qe(t).Node;
}
function Vt(t) {
  return t instanceof Element || t instanceof Qe(t).Element;
}
function _t(t) {
  return t instanceof HTMLElement || t instanceof Qe(t).HTMLElement;
}
function ru(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Qe(t).ShadowRoot;
}
function Si(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = lt(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function n5(t) {
  return ["table", "td", "th"].includes(cn(t));
}
function vl(t) {
  const e = pl(), n = lt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function r5(t) {
  let e = cr(t);
  for (; _t(e) && !ta(e); ) {
    if (vl(e))
      return e;
    e = cr(e);
  }
  return null;
}
function pl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ta(t) {
  return ["html", "body", "#document"].includes(cn(t));
}
function lt(t) {
  return Qe(t).getComputedStyle(t);
}
function na(t) {
  return Vt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function cr(t) {
  if (cn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    ru(t) && t.host || // Fallback.
    Bt(t)
  );
  return ru(e) ? e.host : e;
}
function Zd(t) {
  const e = cr(t);
  return ta(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : _t(e) && Si(e) ? e : Zd(e);
}
function ui(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Zd(t), o = i === ((r = t.ownerDocument) == null ? void 0 : r.body), a = Qe(i);
  return o ? e.concat(a, a.visualViewport || [], Si(i) ? i : [], a.frameElement && n ? ui(a.frameElement) : []) : e.concat(i, ui(i, [], n));
}
function Hd(t) {
  const e = lt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = _t(t), o = i ? t.offsetWidth : n, a = i ? t.offsetHeight : r, l = bo(n) !== o || bo(r) !== a;
  return l && (n = o, r = a), {
    width: n,
    height: r,
    $: l
  };
}
function gl(t) {
  return Vt(t) ? t : t.contextElement;
}
function er(t) {
  const e = gl(t);
  if (!_t(e))
    return an(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = Hd(e);
  let a = (o ? bo(n.width) : n.width) / r, l = (o ? bo(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const i5 = /* @__PURE__ */ an(0);
function zd(t) {
  const e = Qe(t);
  return !pl() || !e.visualViewport ? i5 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function o5(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Qe(t) ? !1 : e;
}
function Mn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), o = gl(t);
  let a = an(1);
  e && (r ? Vt(r) && (a = er(r)) : a = er(t));
  const l = o5(o, n, r) ? zd(o) : an(0);
  let c = (i.left + l.x) / a.x, u = (i.top + l.y) / a.y, f = i.width / a.x, d = i.height / a.y;
  if (o) {
    const m = Qe(o), b = r && Vt(r) ? Qe(r) : r;
    let g = m.frameElement;
    for (; g && r && b !== m; ) {
      const y = er(g), p = g.getBoundingClientRect(), v = lt(g), C = p.left + (g.clientLeft + parseFloat(v.paddingLeft)) * y.x, h = p.top + (g.clientTop + parseFloat(v.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += C, u += h, g = Qe(g).frameElement;
    }
  }
  return wo({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function a5(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = _t(n), o = Bt(n);
  if (n === o)
    return e;
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = an(1);
  const c = an(0);
  if ((i || !i && r !== "fixed") && ((cn(n) !== "body" || Si(o)) && (a = na(n)), _t(n))) {
    const u = Mn(n);
    l = er(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - a.scrollLeft * l.x + c.x,
    y: e.y * l.y - a.scrollTop * l.y + c.y
  };
}
function s5(t) {
  return Array.from(t.getClientRects());
}
function Ud(t) {
  return Mn(Bt(t)).left + na(t).scrollLeft;
}
function l5(t) {
  const e = Bt(t), n = na(t), r = t.ownerDocument.body, i = On(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = On(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Ud(t);
  const l = -n.scrollTop;
  return lt(r).direction === "rtl" && (a += On(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: a,
    y: l
  };
}
function c5(t, e) {
  const n = Qe(t), r = Bt(t), i = n.visualViewport;
  let o = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (i) {
    o = i.width, a = i.height;
    const u = pl();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: l,
    y: c
  };
}
function u5(t, e) {
  const n = Mn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, o = _t(t) ? er(t) : an(1), a = t.clientWidth * o.x, l = t.clientHeight * o.y, c = i * o.x, u = r * o.y;
  return {
    width: a,
    height: l,
    x: c,
    y: u
  };
}
function iu(t, e, n) {
  let r;
  if (e === "viewport")
    r = c5(t, n);
  else if (e === "document")
    r = l5(Bt(t));
  else if (Vt(e))
    r = u5(e, n);
  else {
    const i = zd(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return wo(r);
}
function qd(t, e) {
  const n = cr(t);
  return n === e || !Vt(n) || ta(n) ? !1 : lt(n).position === "fixed" || qd(n, e);
}
function f5(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = ui(t, [], !1).filter((l) => Vt(l) && cn(l) !== "body"), i = null;
  const o = lt(t).position === "fixed";
  let a = o ? cr(t) : t;
  for (; Vt(a) && !ta(a); ) {
    const l = lt(a), c = vl(a);
    !c && l.position === "fixed" && (i = null), (o ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Si(a) && !c && qd(t, a)) ? r = r.filter((f) => f !== a) : i = l, a = cr(a);
  }
  return e.set(t, r), r;
}
function d5(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? f5(e, this._c) : [].concat(n), r], l = a[0], c = a.reduce((u, f) => {
    const d = iu(e, f, i);
    return u.top = On(d.top, u.top), u.right = lr(d.right, u.right), u.bottom = lr(d.bottom, u.bottom), u.left = On(d.left, u.left), u;
  }, iu(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function m5(t) {
  return Hd(t);
}
function h5(t, e, n) {
  const r = _t(e), i = Bt(e), o = n === "fixed", a = Mn(t, !0, o, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = an(0);
  if (r || !r && !o)
    if ((cn(e) !== "body" || Si(i)) && (l = na(e)), r) {
      const u = Mn(e, !0, o, e);
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
function ou(t, e) {
  return !_t(t) || lt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function Kd(t, e) {
  const n = Qe(t);
  if (!_t(t))
    return n;
  let r = ou(t, e);
  for (; r && n5(r) && lt(r).position === "static"; )
    r = ou(r, e);
  return r && (cn(r) === "html" || cn(r) === "body" && lt(r).position === "static" && !vl(r)) ? n : r || r5(t) || n;
}
const v5 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || Kd, o = this.getDimensions;
  return {
    reference: h5(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await o(n)
    }
  };
};
function p5(t) {
  return lt(t).direction === "rtl";
}
const g5 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: a5,
  getDocumentElement: Bt,
  getClippingRect: d5,
  getOffsetParent: Kd,
  getElementRects: v5,
  getClientRects: s5,
  getDimensions: m5,
  getScale: er,
  isElement: Vt,
  isRTL: p5
};
function y5(t, e) {
  let n = null, r;
  const i = Bt(t);
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
    const b = Bi(f), g = Bi(i.clientWidth - (u + d)), y = Bi(i.clientHeight - (f + m)), p = Bi(u), C = {
      rootMargin: -b + "px " + -g + "px " + -y + "px " + -p + "px",
      threshold: On(0, lr(1, c)) || 1
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
function b5(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = gl(t), f = i || o ? [...u ? ui(u) : [], ...ui(e)] : [];
  f.forEach((v) => {
    i && v.addEventListener("scroll", n, {
      passive: !0
    }), o && v.addEventListener("resize", n);
  });
  const d = u && l ? y5(u, n) : null;
  let m = -1, b = null;
  a && (b = new ResizeObserver((v) => {
    let [C] = v;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let g, y = c ? Mn(t) : null;
  c && p();
  function p() {
    const v = Mn(t);
    y && (v.x !== y.x || v.y !== y.y || v.width !== y.width || v.height !== y.height) && n(), y = v, g = requestAnimationFrame(p);
  }
  return n(), () => {
    f.forEach((v) => {
      i && v.removeEventListener("scroll", n), o && v.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(g);
  };
}
const E5 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: g5,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return Kg(t, e, {
    ...i,
    platform: o
  });
};
class w5 extends s.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = x1(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return s.Children.only(this.props.children);
  }
}
const C5 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function x5(t) {
  var e;
  return (e = C5[t]) !== null && e !== void 0 ? e : t;
}
let Xn = null, tr = null;
fr && (Xn = document.createElement("div"), Xn.className = "adm-px-tester", Xn.style.setProperty("--size", "10"), document.body.appendChild(Xn), tr = document.createElement("div"), tr.className = "adm-px-tester", document.body.appendChild(tr));
function Sn(t) {
  return Xn === null || tr === null || Xn.getBoundingClientRect().height === 10 ? t : (tr.style.setProperty("--size", t.toString()), tr.getBoundingClientRect().height);
}
const dn = "adm-popover", k5 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, Yd = he((t, e) => {
  const n = z(k5, t), r = x5(n.placement), [i, o] = ie({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  Ee(e, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: i
  }), [i]);
  const a = j(null), l = j(null), c = j(null), u = rn(n.stopPropagation, W(n, s.createElement("div", {
    className: B(dn, `${dn}-${n.mode}`, {
      [`${dn}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${dn}-arrow`,
    ref: c
  }, s.createElement(Vg, {
    className: `${dn}-arrow-icon`
  })), s.createElement("div", {
    className: `${dn}-inner`
  }, s.createElement("div", {
    className: `${dn}-inner-content`
  }, n.content))))), [f, d] = Y(null);
  function m() {
    var g, y, p;
    return Se(this, void 0, void 0, function* () {
      const v = (y = (g = a.current) === null || g === void 0 ? void 0 : g.element) !== null && y !== void 0 ? y : null, C = l.current, h = c.current;
      if (d(v), !v || !C || !h)
        return;
      const {
        x: E,
        y: w,
        placement: x,
        middlewareData: k
      } = yield E5(v, C, {
        placement: r,
        middleware: [Jg(Sn(12)), e5({
          padding: Sn(4),
          crossAxis: !1,
          limiter: t5()
        }), Gg(), Xg(), Yg({
          element: h,
          padding: Sn(12)
        })]
      });
      Object.assign(C.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const F = x.split("-")[0], N = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[F], {
        x: _,
        y: D
      } = (p = k.arrow) !== null && p !== void 0 ? p : {};
      Object.assign(h.style, {
        left: _ != null ? `${_}px` : "",
        top: D != null ? `${D}px` : "",
        right: "",
        bottom: "",
        [N]: "calc(var(--arrow-size) * -1)"
      });
      const T = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[F];
      h.style.setProperty("--arrow-icon-rotate", T);
    });
  }
  Ne(() => {
    m();
  }), X(() => {
    if (!f || !n.trigger)
      return;
    function g() {
      o((y) => !y);
    }
    return f.addEventListener("click", g), () => {
      f.removeEventListener("click", g);
    };
  }, [f, n.trigger]), X(() => {
    const g = l.current;
    if (!(!f || !g))
      return b5(f, g, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), Ou(() => {
    n.trigger && o(!1);
  }, [() => {
    var g;
    return (g = a.current) === null || g === void 0 ? void 0 : g.element;
  }, l], ["click", "touchmove"]);
  const b = To(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(w5, {
    ref: a
  }, n.children), b && pr(n.getContainer, u));
}), qt = "adm-popover-menu", $5 = he((t, e) => {
  const n = j(null);
  Ee(e, () => n.current, []);
  const r = He((o) => {
    var a;
    const {
      onAction: l
    } = t;
    l && l(o), (a = n.current) === null || a === void 0 || a.hide();
  }, [t.onAction]), i = re(() => {
    const o = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), a = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${qt}-list`
    }, s.createElement("div", {
      className: B(`${qt}-list-inner`, {
        [`${qt}-list-scroll`]: o
      }),
      style: {
        height: a
      }
    }, t.actions.map((l, c) => {
      var u;
      return s.createElement("a", {
        key: (u = l.key) !== null && u !== void 0 ? u : c,
        className: B(`${qt}-item`, "adm-plain-anchor", {
          [`${qt}-item-disabled`]: l.disabled
        }),
        onClick: () => {
          var f;
          l.disabled || (r(l), (f = l.onClick) === null || f === void 0 || f.call(l));
        }
      }, l.icon && s.createElement("div", {
        className: `${qt}-item-icon`
      }, l.icon), s.createElement("div", {
        className: `${qt}-item-text`
      }, l.text));
    })));
  }, [t.actions, r]);
  return s.createElement(Yd, Object.assign({
    ref: n
  }, t, {
    className: B(qt, t.className),
    content: i
  }), t.children);
}), Gd = ce(Yd, {
  Menu: $5
});
function ya(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function _5(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function O5(t) {
  return typeof t == "function" && !_5(t) && t.defaultProps === void 0;
}
function Xd(t) {
  return po.isFragment(t) ? !1 : po.isMemo(t) ? Xd(t.type) : !O5(t.type);
}
const S5 = "__SPLIT__", Be = "adm-form-item", F5 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), N5 = (t) => {
  var e;
  const {
    locale: n,
    form: r = {}
  } = oe(), {
    style: i,
    extra: o,
    label: a,
    help: l,
    helpIcon: c,
    required: u,
    children: f,
    htmlFor: d,
    hidden: m,
    arrow: b,
    arrowIcon: g,
    childElementPosition: y = "normal"
  } = z(r, t), p = at(ul), v = t.hasFeedback !== void 0 ? t.hasFeedback : p.hasFeedback, C = t.layout || p.layout, h = (e = t.disabled) !== null && e !== void 0 ? e : p.disabled, E = (() => {
    const {
      requiredMarkStyle: k
    } = p;
    switch (k) {
      case "asterisk":
        return u && s.createElement("span", {
          className: `${Be}-required-asterisk`
        }, "*");
      case "text-required":
        return u && s.createElement("span", {
          className: `${Be}-required-text`
        }, "(", n.Form.required, ")");
      case "text-optional":
        return !u && s.createElement("span", {
          className: `${Be}-required-text`
        }, "(", n.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), w = !!a && s.createElement("label", {
    className: `${Be}-label`,
    htmlFor: d
  }, a, E, l && s.createElement(Gd, {
    content: l,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${Be}-label-help`,
    onClick: (k) => {
      k.stopPropagation(), k.preventDefault();
    }
  }, c || s.createElement(p2, null)))), x = (!!t.description || v) && s.createElement(s.Fragment, null, t.description, v && s.createElement(s.Fragment, null, t.errors.map((k, F) => s.createElement("div", {
    key: `error-${F}`,
    className: `${Be}-feedback-error`
  }, k)), t.warnings.map((k, F) => s.createElement("div", {
    key: `warning-${F}`,
    className: `${Be}-feedback-warning`
  }, k))));
  return W(t, s.createElement(xt.Item, {
    style: i,
    title: C === "vertical" && w,
    prefix: C === "horizontal" && w,
    extra: o,
    description: x,
    className: B(Be, `${Be}-${C}`, {
      [`${Be}-hidden`]: m,
      [`${Be}-has-error`]: t.errors.length
    }),
    disabled: h,
    onClick: t.onClick,
    clickable: t.clickable,
    arrowIcon: g || b
  }, s.createElement("div", {
    className: B(`${Be}-child`, `${Be}-child-position-${y}`)
  }, s.createElement("div", {
    className: B(`${Be}-child-inner`)
  }, f))));
}, P5 = (t) => {
  const {
    // 样式相关
    style: e,
    // FormItem 相关
    label: n,
    help: r,
    helpIcon: i,
    extra: o,
    hasFeedback: a,
    name: l,
    required: c,
    noStyle: u,
    hidden: f,
    layout: d,
    childElementPosition: m,
    description: b,
    // Field 相关
    disabled: g,
    rules: y,
    children: p,
    messageVariables: v,
    trigger: C = "onChange",
    validateTrigger: h = C,
    onClick: E,
    shouldUpdate: w,
    dependencies: x,
    clickable: k,
    arrow: F,
    arrowIcon: N
  } = t, _ = dr(t, ["style", "label", "help", "helpIcon", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow", "arrowIcon"]), {
    name: D
  } = at(ul), {
    validateTrigger: T
  } = at(jd), R = Dg(h, T, C), $ = j(null), M = j(0);
  M.current += 1;
  const [S, O] = Y({}), I = He((K, G) => {
    O((le) => {
      const ue = Object.assign({}, le), ve = G.join(S5);
      return K.destroy ? delete ue[ve] : ue[ve] = K, ue;
    });
  }, [O]);
  function P(K, G, le, ue) {
    var ve, U;
    if (u && !f)
      return K;
    const ee = (ve = le == null ? void 0 : le.errors) !== null && ve !== void 0 ? ve : [], J = Object.keys(S).reduce((we, Ue) => {
      var Je, qe;
      const xr = (qe = (Je = S[Ue]) === null || Je === void 0 ? void 0 : Je.errors) !== null && qe !== void 0 ? qe : [];
      return xr.length && (we = [...we, ...xr]), we;
    }, ee), xe = (U = le == null ? void 0 : le.warnings) !== null && U !== void 0 ? U : [], be = Object.keys(S).reduce((we, Ue) => {
      var Je, qe;
      const xr = (qe = (Je = S[Ue]) === null || Je === void 0 ? void 0 : Je.warnings) !== null && qe !== void 0 ? qe : [];
      return xr.length && (we = [...we, ...xr]), we;
    }, xe);
    return W(t, s.createElement(N5, {
      style: e,
      label: n,
      extra: o,
      help: r,
      helpIcon: i,
      description: b,
      required: ue,
      disabled: g,
      hasFeedback: a,
      htmlFor: G,
      errors: J,
      warnings: be,
      onClick: E && ((we) => E(we, $)),
      hidden: f,
      layout: d,
      childElementPosition: m,
      clickable: k,
      arrow: F,
      arrowIcon: N
    }, s.createElement(Xc.Provider, {
      value: I
    }, K)));
  }
  const A = typeof p == "function";
  if (!l && !A && !t.dependencies)
    return P(p);
  let V = {};
  V.label = typeof n == "string" ? n : "", v && (V = Object.assign(Object.assign({}, V), v));
  const Z = at(Xc), q = (K) => {
    if (u && Z) {
      const G = K.name;
      Z(K, G);
    }
  };
  return s.createElement(sl, Object.assign({}, _, {
    name: l,
    shouldUpdate: w,
    dependencies: x,
    rules: y,
    trigger: C,
    validateTrigger: R,
    onMetaChange: q,
    messageVariables: V
  }), (K, G, le) => {
    let ue = null;
    const ve = c !== void 0 ? c : y && y.some((J) => !!(J && typeof J == "object" && J.required)), U = ya(l).length && G ? G.name : [], ee = (U.length > 0 && D ? [D, ...U] : U).join("_");
    if (A)
      (w || x) && !l && (ue = p(le));
    else if (!(x && !l))
      if (s.isValidElement(p)) {
        p.props.defaultValue;
        const J = Object.assign(Object.assign({}, p.props), K);
        Xd(p) && (J.ref = (be) => {
          const we = p.ref;
          we && (typeof we == "function" && we(be), "current" in we && (we.current = be)), $.current = be;
        }), J.id || (J.id = ee), (/* @__PURE__ */ new Set([...ya(C), ...ya(R)])).forEach((be) => {
          J[be] = (...we) => {
            var Ue, Je, qe;
            (Ue = K[be]) === null || Ue === void 0 || Ue.call(K, ...we), (qe = (Je = p.props)[be]) === null || qe === void 0 || qe.call(Je, ...we);
          };
        }), ue = s.createElement(F5, {
          value: K[t.valuePropName || "value"],
          update: M.current
        }, s.cloneElement(p, J));
      } else
        ue = p;
    return P(ue, ee, G, ve);
  });
}, R5 = (t) => {
  const e = $u(), n = at(Rn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((o) => s.createElement(M5, {
    key: o.toString(),
    form: n,
    namePath: o,
    onChange: e
  })));
}, M5 = Ve((t) => {
  const e = cl(t.namePath, t.form);
  return bi(() => {
    t.onChange();
  }, [e]), null;
}), J7 = ce(_g, {
  Item: P5,
  Subscribe: R5,
  Header: Nd,
  Array: Rd,
  useForm: ll,
  useWatch: cl
}), Qd = "adm-grid", I5 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = xn(n[0]), e["--gap-vertical"] = xn(n[1])) : e["--gap"] = xn(n)), W(t, s.createElement("div", {
    className: Qd,
    style: e
  }, t.children));
}, A5 = (t) => {
  const e = z({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${Qd}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, Jd = ce(I5, {
  Item: A5
}), T5 = b3([_f, o3]), Wi = () => [1, 0, 0, 1, 0, 0], au = (t) => t[4], su = (t) => t[5], Ir = (t) => t[0], Ar = (t, e, n) => e1([1, 0, 0, 1, e, n], t), L5 = (t, e, n = e) => e1([e, 0, 0, n, 0, 0], t), D5 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], e1 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], ba = "adm-image-viewer", t1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = j([]), i = j(null), o = j(null), [{
    matrix: a
  }, l] = Me(() => ({
    matrix: Wi(),
    config: {
      tension: 200
    }
  })), c = Fa(i), u = Fa(o), f = j(!1), d = (g) => {
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
    const y = -c.width / 2, p = -c.height / 2, v = -u.width / 2, C = -u.height / 2, h = Ir(g), E = h * u.width, w = h * u.height, x = y - (E - c.width), k = y, F = p - (w - c.height), N = p, [_, D] = D5(g, [v, C]);
    return {
      x: {
        position: _,
        minX: x,
        maxX: k
      },
      y: {
        position: D,
        minY: F,
        maxY: N
      }
    };
  }, m = (g, y, p, v = 0) => [g <= y - v, g >= p + v], b = (g, y, p = !1) => {
    if (!c || !u)
      return g;
    const v = Ir(g), C = v * u.width, h = v * u.height, {
      x: {
        position: E,
        minX: w,
        maxX: x
      },
      y: {
        position: k,
        minY: F,
        maxY: N
      }
    } = d(g);
    if (y === "translate") {
      let _ = E, D = k;
      return C > c.width ? _ = p ? _e(E, w, x) : oi(E, w, x, v * 50) : _ = -C / 2, h > c.height ? D = p ? _e(k, F, N) : oi(k, F, N, v * 50) : D = -h / 2, Ar(g, _ - E, D - k);
    }
    if (y === "scale" && p) {
      const [_, D] = [C > c.width ? _e(E, w, x) : -C / 2, h > c.height ? _e(k, F, N) : -h / 2];
      return Ar(g, _ - E, D - k);
    }
    return g;
  };
  return T5({
    onDrag: (g) => {
      var y;
      if (g.first) {
        const {
          x: {
            position: v,
            minX: C,
            maxX: h
          }
        } = d(a.get());
        r.current = m(v, C, h);
        return;
      }
      if (g.pinching)
        return g.cancel();
      if (g.tap && g.elapsedTime > 0 && g.elapsedTime < 1e3) {
        (y = t.onTap) === null || y === void 0 || y.call(t);
        return;
      }
      const p = Ir(a.get());
      if (e && (e.current = p !== 1), !f.current && p <= 1)
        l.start({
          matrix: Wi()
        });
      else {
        const v = a.get(), C = [g.offset[0] - au(v), g.offset[1] - su(v)], h = Ar(v, ...g.last ? [C[0] + g.velocity[0] * g.direction[0] * 200, C[1] + g.velocity[1] * g.direction[1] * 200] : C);
        l.start({
          matrix: b(h, "translate", g.last),
          immediate: !g.last
        });
        const {
          x: {
            position: E,
            minX: w,
            maxX: x
          }
        } = d(h);
        g.last && r.current.some((k) => k) && m(E, w, x).some((k) => k) && (e && (e.current = !1), l.start({
          matrix: Wi()
        }));
      }
    },
    onPinch: (g) => {
      var y;
      f.current = !g.last;
      const [p] = g.offset;
      if (p < 0)
        return;
      let v;
      n === "auto" ? v = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : v = n;
      const C = g.last ? _e(p, 1, v) : p;
      if ((y = t.onZoomChange) === null || y === void 0 || y.call(t, C), g.last && C <= 1)
        l.start({
          matrix: Wi()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const h = a.get(), E = Ir(h), w = g.origin[0] - c.width / 2, x = g.origin[1] - c.height / 2;
        let k = Ar(h, -w, -x);
        k = L5(k, C / E), k = Ar(k, w, x), l.start({
          matrix: b(k, "scale", g.last),
          immediate: !g.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [au(a.get()), su(a.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Ir(a.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), s.createElement("div", {
    className: `${ba}-slide`
  }, s.createElement("div", {
    className: `${ba}-control`,
    ref: i
  }, s.createElement(ye.div, {
    className: `${ba}-image-wrapper`,
    style: {
      matrix: a
    }
  }, s.createElement("img", {
    ref: o,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, Ea = "adm-image-viewer", V5 = he((t, e) => {
  const n = window.innerWidth + Sn(16), [{
    x: r
  }, i] = Me(() => ({
    x: t.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), o = t.images.length;
  function a(u, f = !1) {
    var d;
    const m = _e(u, 0, o - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  Ee(e, () => ({
    swipeTo: a
  }));
  const l = j(!1), c = St((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, b = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      a(_e(Math.round((f + b) / n), d, m));
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
    className: `${Ea}-slides`
  }, c()), s.createElement(ye.div, {
    className: `${Ea}-indicator`
  }, r.to((u) => `${_e(Math.round(u / n), 0, o - 1) + 1} / ${o}`)), s.createElement(ye.div, {
    className: `${Ea}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(t1, {
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
}), xo = "adm-image-viewer", n1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, r1 = (t) => {
  var e, n, r;
  const i = z(n1, t), o = s.createElement(pi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: B(`${xo}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && s.createElement(t1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && s.createElement("div", {
    className: `${xo}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(Er, {
    position: "bottom"
  })));
  return pr(i.getContainer, o);
}, j5 = Object.assign(Object.assign({}, n1), {
  defaultIndex: 0
}), i1 = he((t, e) => {
  var n, r, i;
  const o = z(j5, t), [a, l] = Y(o.defaultIndex), c = j(null);
  Ee(e, () => ({
    swipeTo: (d, m) => {
      var b;
      l(d), (b = c.current) === null || b === void 0 || b.swipeTo(d, m);
    }
  }));
  const u = He((d) => {
    var m;
    d !== a && (l(d), (m = o.onIndexChange) === null || m === void 0 || m.call(o, d));
  }, [o.onIndexChange, a]), f = s.createElement(pi, {
    visible: o.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: o.afterClose,
    destroyOnClose: !0,
    className: (n = o == null ? void 0 : o.classNames) === null || n === void 0 ? void 0 : n.mask
  }, s.createElement("div", {
    className: B(`${xo}-content`, (r = o == null ? void 0 : o.classNames) === null || r === void 0 ? void 0 : r.body)
  }, o.images && s.createElement(V5, {
    ref: c,
    defaultIndex: a,
    onIndexChange: u,
    images: o.images,
    onTap: o.onClose,
    maxZoom: o.maxZoom
  })), o.images && s.createElement("div", {
    className: `${xo}-footer`
  }, (i = o.renderFooter) === null || i === void 0 ? void 0 : i.call(o, o.images[a], a), s.createElement(Er, {
    position: "bottom"
  })));
  return pr(o.getContainer, f);
}), ur = /* @__PURE__ */ new Set();
function B5(t) {
  yl();
  const e = wr(s.createElement(r1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ur.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ur.add(e), e;
}
function W5(t) {
  yl();
  const e = wr(s.createElement(i1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ur.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ur.add(e), e;
}
function yl() {
  ur.forEach((t) => {
    t.close();
  }), ur.clear();
}
const Z5 = ce(i1, {
  show: W5
}), H5 = ce(r1, {
  Multi: Z5,
  show: B5,
  clear: yl
}), mn = "adm-image-uploader", z5 = (t) => {
  const {
    locale: e
  } = oe(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: o,
    onDelete: a,
    imageFit: l
  } = t, c = re(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  X(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${mn}-cell-mask`
    }, s.createElement("span", {
      className: `${mn}-cell-loading`
    }, s.createElement(Xs, {
      color: "white"
    }), s.createElement("span", {
      className: `${mn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${mn}-cell-delete`,
      onClick: a
    }, o);
  }
  return s.createElement("div", {
    className: B(`${mn}-cell`, t.status === "fail" && `${mn}-cell-fail`)
  }, s.createElement(jo, {
    className: `${mn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, lu = z5, hn = "adm-space", U5 = {
  direction: "horizontal"
}, bl = (t) => {
  const e = z(U5, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: B(hn, {
      [`${hn}-wrap`]: e.wrap,
      [`${hn}-block`]: e.block,
      [`${hn}-${n}`]: !0,
      [`${hn}-align-${e.align}`]: !!e.align,
      [`${hn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${hn}-item`
  }, i))));
}, wt = "adm-image-uploader", q5 = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(Lo, {
    className: `${wt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, e8 = he((t, e) => {
  const {
    locale: n
  } = oe(), r = z(q5, t), {
    columns: i
  } = r, [o, a] = ie(r), [l, c] = Y([]), u = j(null), f = Fa(u), d = j(null), [m, b] = Y(80), g = j(null);
  Ne(() => {
    const R = d.current;
    if (i && f && R) {
      const $ = f.width, M = jf(window.getComputedStyle(R).getPropertyValue("height"));
      b(($ - M * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const y = {
    "--cell-size": m + "px"
  };
  Ne(() => {
    c((R) => R.filter(($) => $.url === void 0 ? !0 : !o.some((M) => M.url === $.url)));
  }, [o]), Ne(() => {
    var R;
    (R = r.onUploadQueueChange) === null || R === void 0 || R.call(r, l.map(($) => ({
      id: $.id,
      status: $.status
    })));
  }, [l]);
  const p = j(0), {
    maxCount: v,
    onPreview: C,
    renderItem: h
  } = r;
  function E(R, $) {
    return Se(this, void 0, void 0, function* () {
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
    return Se(this, void 0, void 0, function* () {
      R.persist();
      const {
        files: M
      } = R.target;
      if (!M)
        return;
      let S = [].slice.call(M);
      if (R.target.value = "", r.beforeUpload) {
        const P = S.map((A) => E(A, S));
        yield Promise.all(P).then((A) => {
          S = A.filter(Boolean);
        });
      }
      if (S.length === 0)
        return;
      if (v > 0) {
        const P = o.length + S.length - v;
        P > 0 && (S = S.slice(0, S.length - P), ($ = r.onCountExceed) === null || $ === void 0 || $.call(r, P));
      }
      const O = S.map((P) => ({
        id: p.current++,
        status: "pending",
        file: P
      }));
      c((P) => [...w(P), ...O]);
      const I = [];
      yield Promise.all(O.map((P, A) => Se(this, void 0, void 0, function* () {
        try {
          const V = yield r.upload(P.file);
          I[A] = V, c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "success",
            url: V.url
          }) : q));
        } catch (V) {
          throw c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "fail"
          }) : q)), V;
        }
      }))).catch((P) => console.error(P)), a((P) => P.concat(I));
    });
  }
  const k = j(null);
  function F(R) {
    k.current = H5.Multi.show({
      images: o.map(($) => $.url),
      defaultIndex: R,
      onClose: () => {
        k.current = null;
      }
    });
  }
  mi(() => {
    var R;
    (R = k.current) === null || R === void 0 || R.close();
  });
  const N = w(l), _ = r.showUpload && (v === 0 || o.length + N.length < v), D = () => o.map((R, $) => {
    var M, S;
    const O = s.createElement(lu, {
      key: (M = R.key) !== null && M !== void 0 ? M : $,
      url: (S = R.thumbnailUrl) !== null && S !== void 0 ? S : R.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && F($), C && C($, R);
      },
      onDelete: () => Se(void 0, void 0, void 0, function* () {
        var I;
        (yield (I = r.onDelete) === null || I === void 0 ? void 0 : I.call(r, R)) !== !1 && a(o.filter((A, V) => V !== $));
      })
    });
    return h ? h(O, R, o) : O;
  }), T = s.createElement(s.Fragment, null, D(), l.map((R) => !r.showFailed && R.status === "fail" ? null : s.createElement(lu, {
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
    className: `${wt}-upload-button-wrap`,
    style: _ ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${wt}-cell ${wt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${wt}-upload-button-icon`
  }, s.createElement(mf, null))), !r.disableUpload && s.createElement("input", {
    ref: g,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${wt}-input`,
    onChange: x,
    "aria-hidden": !0
  })));
  return Ee(e, () => ({
    get nativeElement() {
      return g.current;
    }
  })), W(r, s.createElement("div", {
    className: wt,
    ref: u
  }, i ? s.createElement(Jd, {
    className: `${wt}-grid`,
    columns: i,
    style: y
  }, s.createElement("div", {
    className: `${wt}-gap-measure`,
    ref: d
  }), T.props.children) : s.createElement(bl, {
    className: `${wt}-space`,
    wrap: !0,
    block: !0
  }, T.props.children)));
}), o1 = () => null, zn = "adm-index-bar", K5 = (t) => {
  const [e, n] = Y(!1);
  return s.createElement("div", {
    className: B(`${zn}-sidebar`, {
      [`${zn}-sidebar-interacting`]: e
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
      className: `${zn}-sidebar-row`,
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
      className: `${zn}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: B(`${zn}-sidebar-item`, {
        [`${zn}-sidebar-item-active`]: o
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, Un = "adm-index-bar", Y5 = {
  sticky: !0
}, G5 = he((t, e) => {
  const n = z(Y5, t), r = Sn(35), i = j(null), o = [], a = [];
  un(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === o1 && (o.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), a.push(W(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${Un}-anchor`
    }, s.createElement("div", {
      className: `${Un}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = Y(() => {
    const d = o[0];
    return d ? d.index : null;
  });
  Ee(e, () => ({
    scrollTo: u
  }));
  function u(d) {
    var m;
    const b = i.current;
    if (!b)
      return;
    const g = b.children;
    for (let y = 0; y < g.length; y++) {
      const p = g.item(y);
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
  } = _o(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const b = m.scrollTop, g = m.getElementsByClassName(`${Un}-anchor`);
    for (let y = 0; y < g.length; y++) {
      const p = g.item(y);
      if (!p)
        continue;
      const v = p.dataset.index;
      if (v && p.offsetTop + p.clientHeight - r > b) {
        c(v), l !== v && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, v));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return W(n, s.createElement("div", {
    className: B(`${Un}`, {
      [`${Un}-sticky`]: n.sticky
    })
  }, s.createElement(K5, {
    indexItems: o,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${Un}-body`,
    ref: i,
    onScroll: f
  }, a)));
}), t8 = ce(G5, {
  Panel: o1
});
function X5(t) {
  return t === window;
}
const a1 = "adm-infinite-scroll", Q5 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(J5, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, n8 = (t) => {
  const e = z(Q5, t), [n, r] = Y(!1), i = J0((b) => Se(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (g) {
      throw r(!0), g;
    }
  })), o = j(null), [a, l] = Y({}), c = j(a), [u, f] = Y(), {
    run: d
  } = _o(() => Se(void 0, void 0, void 0, function* () {
    if (c.current !== a || !e.hasMore)
      return;
    const b = o.current;
    if (!b || !b.offsetParent)
      return;
    const g = io(b);
    if (f(g), !g)
      return;
    const p = b.getBoundingClientRect().top;
    if ((X5(g) ? window.innerHeight : g.getBoundingClientRect().bottom) >= p - e.threshold) {
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
    function g() {
      d();
    }
    return u.addEventListener("scroll", g), () => {
      u.removeEventListener("scroll", g);
    };
  }, [u]);
  function m() {
    return Se(this, void 0, void 0, function* () {
      r(!1);
      try {
        yield i(!0), l(c.current);
      } catch {
      }
    });
  }
  return W(e, s.createElement("div", {
    className: a1,
    ref: o
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, J5 = (t) => {
  const {
    locale: e
  } = oe();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${a1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(Pf, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function s1({
  onEnterPress: t,
  onKeyDown: e,
  nativeInputRef: n,
  enterKeyHint: r
}) {
  const i = (o) => {
    t && (o.code === "Enter" || o.keyCode === 13) && t(o), e == null || e(o);
  };
  return Ne(() => {
    const o = n.current;
    if (!(!r || !o))
      return o.setAttribute("enterkeyhint", r), () => {
        o.removeAttribute("enterkeyhint");
      };
  }, [r]), i;
}
const Zi = "adm-input", e6 = {
  defaultValue: "",
  clearIcon: s.createElement(js, null),
  onlyShowClearWhenFocus: !0
}, l1 = he((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = oe(), i = z(e6, r, t), [o, a] = ie(i), [l, c] = Y(!1), u = j(!1), f = j(null), d = s1({
    onEnterPress: i.onEnterPress,
    onKeyDown: i.onKeyDown,
    nativeInputRef: f,
    enterKeyHint: i.enterKeyHint
  });
  Ee(e, () => ({
    clear: () => {
      a("");
    },
    focus: () => {
      var g;
      (g = f.current) === null || g === void 0 || g.focus();
    },
    blur: () => {
      var g;
      (g = f.current) === null || g === void 0 || g.blur();
    },
    get nativeElement() {
      return f.current;
    }
  }));
  function m() {
    let g = o;
    if (i.type === "number") {
      const y = g && _e(parseFloat(g), i.min, i.max).toString();
      Number(g) !== Number(y) && (g = y);
    }
    g !== o && a(g);
  }
  const b = !i.clearable || !o || i.readOnly ? !1 : i.onlyShowClearWhenFocus ? l : !0;
  return W(i, s.createElement("div", {
    className: B(`${Zi}`, i.disabled && `${Zi}-disabled`)
  }, s.createElement("input", {
    ref: f,
    className: `${Zi}-element`,
    value: o,
    onChange: (g) => {
      a(g.target.value);
    },
    onFocus: (g) => {
      var y;
      c(!0), (y = i.onFocus) === null || y === void 0 || y.call(i, g);
    },
    onBlur: (g) => {
      var y;
      c(!1), m(), (y = i.onBlur) === null || y === void 0 || y.call(i, g);
    },
    id: i.id,
    placeholder: i.placeholder,
    disabled: i.disabled,
    readOnly: i.readOnly,
    maxLength: i.maxLength,
    minLength: i.minLength,
    max: i.max,
    min: i.min,
    autoComplete: i.autoComplete,
    enterKeyHint: i.enterKeyHint,
    autoFocus: i.autoFocus,
    pattern: i.pattern,
    inputMode: i.inputMode,
    type: i.type,
    name: i.name,
    autoCapitalize: i.autoCapitalize,
    autoCorrect: i.autoCorrect,
    onKeyDown: d,
    onKeyUp: i.onKeyUp,
    onCompositionStart: (g) => {
      var y;
      u.current = !0, (y = i.onCompositionStart) === null || y === void 0 || y.call(i, g);
    },
    onCompositionEnd: (g) => {
      var y;
      u.current = !1, (y = i.onCompositionEnd) === null || y === void 0 || y.call(i, g);
    },
    onClick: i.onClick,
    step: i.step,
    role: i.role,
    "aria-valuenow": i["aria-valuenow"],
    "aria-valuemax": i["aria-valuemax"],
    "aria-valuemin": i["aria-valuemin"],
    "aria-label": i["aria-label"]
  }), b && s.createElement("div", {
    className: `${Zi}-clear`,
    onMouseDown: (g) => {
      g.preventDefault();
    },
    onClick: () => {
      var g, y;
      a(""), (g = i.onClear) === null || g === void 0 || g.call(i), q3() && u.current && (u.current = !1, (y = f.current) === null || y === void 0 || y.blur());
    },
    "aria-label": n.Input.clear
  }, i.clearIcon)));
}), yt = "adm-jumbo-tabs", t6 = () => null, n6 = (t) => {
  var e;
  const n = j(null), r = j(null), i = {};
  let o = null;
  const a = [];
  un(t.children, (d, m) => {
    if (!In(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const g = a.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ie({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Tf(n, i[l]);
  return Ei(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: yt,
    ref: r
  }, s.createElement("div", {
    className: `${yt}-header`
  }, s.createElement(Lf, {
    scrollTrackRef: n
  }), s.createElement(ye.div, {
    className: `${yt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, a.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${yt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${yt}-tab`, {
      [`${yt}-tab-active`]: d.key === l,
      [`${yt}-tab-disabled`]: d.props.disabled
    })
  }, s.createElement("div", {
    className: `${yt}-tab-title`
  }, d.props.title), s.createElement("div", {
    className: `${yt}-tab-description`
  }, d.props.description))))))), a.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(gr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${yt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, r8 = ce(n6, {
  Tab: t6
}), r6 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(Lt, {
    key: e.key,
    onClick: t.onAction,
    className: B("adm-modal-button", {
      "adm-modal-button-primary": t.action.primary
    }),
    fill: t.action.primary ? "solid" : "none",
    size: t.action.primary ? "large" : "middle",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, i6 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, c1 = (t) => {
  const e = z(i6, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Nt("image-container")
  }, s.createElement(jo, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Nt("header")
  }, s.createElement(ii, null, e.header)), !!e.title && s.createElement("div", {
    className: Nt("title")
  }, e.title), s.createElement("div", {
    className: Nt("content")
  }, typeof e.content == "string" ? s.createElement(ii, null, e.content) : e.content), s.createElement(bl, {
    direction: "vertical",
    block: !0,
    className: B(Nt("footer"), e.actions.length === 0 && Nt("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(r6, {
    key: r.key,
    action: r,
    onAction: () => Se(void 0, void 0, void 0, function* () {
      var o, a, l;
      yield Promise.all([(o = r.onClick) === null || o === void 0 ? void 0 : o.call(r), (a = e.onAction) === null || a === void 0 ? void 0 : a.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(ed, {
    className: B(Nt(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: B(Nt("body"), e.image && Nt("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function Nt(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const hs = /* @__PURE__ */ new Set();
function El(t) {
  const e = wr(s.createElement(c1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      hs.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return hs.add(e.close), e;
}
function o6(t) {
  const e = {
    confirmText: fi().locale.Modal.ok
  }, n = z(e, t);
  return new Promise((r) => {
    El(Object.assign(Object.assign({}, n), {
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
const a6 = {
  confirmText: "确认",
  cancelText: "取消"
};
function s6(t) {
  const {
    locale: e
  } = fi(), n = z(a6, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    El(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Se(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Se(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function l6() {
  hs.forEach((t) => {
    t();
  });
}
const i8 = ce(c1, {
  show: El,
  alert: o6,
  confirm: s6,
  clear: l6
}), qn = "adm-nav-bar", c6 = {
  backIcon: !0
}, o8 = (t) => {
  const {
    navBar: e = {}
  } = oe(), n = z(c6, e, t), {
    back: r,
    backIcon: i,
    backArrow: o
  } = n;
  return W(n, s.createElement("div", {
    className: B(qn)
  }, s.createElement("div", {
    className: `${qn}-left`,
    role: "button"
  }, r !== null && s.createElement("div", {
    className: `${qn}-back`,
    onClick: n.onBack
  }, (i || o) && s.createElement("span", {
    className: `${qn}-back-arrow`
  }, i === !0 || o === !0 ? e.backIcon || s.createElement(h2, null) : i || o), s.createElement("span", {
    "aria-hidden": "true"
  }, r)), n.left), s.createElement("div", {
    className: `${qn}-title`
  }, n.children), s.createElement("div", {
    className: `${qn}-right`
  }, n.right)));
}, Pt = "adm-notice-bar", u6 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: s.createElement(b2, null),
  wrap: !1
}, a8 = Ve((t) => {
  const {
    noticeBar: e = {}
  } = oe(), n = z(u6, e, t), r = An(s.createElement(Lo, {
    className: `${Pt}-close-icon`
  }), e.closeIcon, t.closeIcon), i = j(null), o = j(null), [a, l] = Y(!0), c = n.speed, u = j(!0), f = j(!1);
  function d() {
    if (u.current || n.wrap)
      return;
    const m = i.current, b = o.current;
    if (!m || !b)
      return;
    if (m.offsetWidth >= b.offsetWidth) {
      f.current = !1, b.style.removeProperty("transition-duration"), b.style.removeProperty("transform");
      return;
    }
    if (f.current)
      return;
    const g = !b.style.transform;
    b.style.transitionDuration = "0s", g ? b.style.transform = "translateX(0)" : b.style.transform = `translateX(${m.offsetWidth}px)`;
    const y = g ? b.offsetWidth : m.offsetWidth + b.offsetWidth;
    f.current = !0, b.style.transitionDuration = `${Math.round(y / c)}s`, b.style.transform = `translateX(-${b.offsetWidth}px)`;
  }
  return $m(() => {
    u.current = !1, d();
  }, n.delay), Ei(() => {
    d();
  }, i), qs(() => {
    d();
  }, o, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), a ? W(n, s.createElement("div", {
    className: B(Pt, `${Pt}-${n.color}`, {
      [`${Pt}-wrap`]: n.wrap
    }),
    onClick: n.onClick
  }, n.icon && s.createElement("span", {
    className: `${Pt}-left`
  }, n.icon), s.createElement("span", {
    ref: i,
    className: `${Pt}-content`
  }, s.createElement("span", {
    onTransitionEnd: () => {
      f.current = !1, d();
    },
    ref: o,
    className: `${Pt}-content-inner`
  }, n.content)), (n.closeable || n.extra) && s.createElement("span", {
    className: `${Pt}-right`
  }, n.extra, n.closeable && s.createElement("div", {
    className: `${Pt}-close`,
    onClick: () => {
      var m;
      l(!1), (m = n.onClose) === null || m === void 0 || m.call(n);
    }
  }, r)))) : null;
});
function f6(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const ke = "adm-number-keyboard", d6 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, s8 = (t) => {
  const e = z(d6, t), {
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
  } = oe(), d = j(null), m = re(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = l ? f6(w) : w, k = Array.isArray(a) ? a : [a];
    return x.push("0"), o ? (k.length === 2 && x.splice(9, 0, k.pop()), x.push(k[0] || "")) : (x.splice(9, 0, k[0] || ""), x.push(k[1] || "BACKSPACE")), x;
  }, [a, o, l, l && n]), b = j(-1), g = j(-1), y = jt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), p = () => {
    b.current = window.setTimeout(() => {
      y(), g.current = window.setInterval(y, 150);
    }, 700);
  }, v = () => {
    clearTimeout(b.current), clearInterval(g.current);
  }, C = (w, x) => {
    var k, F;
    switch (w.preventDefault(), x) {
      case "BACKSPACE":
        y == null || y();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && ((F = e.onClose) === null || F === void 0 || F.call(e));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, h = () => !c && !r ? null : s.createElement("div", {
    className: B(`${ke}-header`, {
      [`${ke}-header-with-title`]: !!r
    })
  }, !!r && s.createElement("div", {
    className: `${ke}-title`,
    "aria-label": r
  }, r), c && s.createElement("span", {
    className: `${ke}-header-close-button`,
    onClick: () => {
      var w;
      (w = e.onClose) === null || w === void 0 || w.call(e);
    },
    role: "button",
    title: f.common.close,
    tabIndex: -1
  }, s.createElement(vf, null))), E = (w, x) => {
    const k = /^\d$/.test(w), F = B(`${ke}-key`, {
      [`${ke}-key-number`]: k,
      [`${ke}-key-sign`]: !k && w,
      [`${ke}-key-mid`]: x === 9 && !!o && m.length < 12
    }), N = w ? {
      role: "button",
      title: w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: F,
      onTouchStart: () => {
        v(), w === "BACKSPACE" && p();
      },
      onTouchEnd: (_) => {
        C(_, w), w === "BACKSPACE" && v();
      }
    }, N), w === "BACKSPACE" ? s.createElement(ic, null) : w);
  };
  return s.createElement(br, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    className: `${ke}-popup`,
    stopPropagation: e.stopPropagation,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, W(e, s.createElement("div", {
    ref: d,
    className: ke,
    onMouseDown: (w) => {
      w.preventDefault();
    }
  }, h(), s.createElement("div", {
    className: `${ke}-wrapper`
  }, s.createElement("div", {
    className: B(`${ke}-main`, {
      [`${ke}-main-confirmed-style`]: !!o
    })
  }, m.map(E)), !!o && s.createElement("div", {
    className: `${ke}-confirm`
  }, s.createElement("div", {
    className: `${ke}-key ${ke}-key-extra ${ke}-key-bs`,
    onTouchStart: () => {
      p();
    },
    onTouchEnd: (w) => {
      C(w, "BACKSPACE"), v();
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(ic, null)), s.createElement("div", {
    className: `${ke}-key ${ke}-key-extra ${ke}-key-ok`,
    onTouchEnd: (w) => C(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": o
  }, o))), e.safeArea && s.createElement("div", {
    className: `${ke}-footer`
  }, s.createElement(Er, {
    position: "bottom"
  })))));
}, Tr = "adm-page-indicator", m6 = {
  color: "primary",
  direction: "horizontal"
}, h6 = Ve((t) => {
  const e = z(m6, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: B(`${Tr}-dot`, {
        [`${Tr}-dot-active`]: e.current === r
      })
    }));
  return W(e, s.createElement("div", {
    className: B(Tr, `${Tr}-${e.direction}`, `${Tr}-color-${e.color}`)
  }, n));
}), bt = "adm-passcode-input", cu = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, l8 = he((t, e) => {
  const n = z(cu, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : cu.length, {
    locale: i
  } = oe(), [o, a] = Y(!1), [l, c] = ie(n), u = j(null), f = j(null);
  X(() => {
    var y;
    l.length >= r && ((y = n.onFill) === null || y === void 0 || y.call(n, l));
  }, [l, r]);
  const d = () => {
    var y, p;
    n.keyboard || (y = f.current) === null || y === void 0 || y.focus(), a(!0), (p = n.onFocus) === null || p === void 0 || p.call(n);
  };
  X(() => {
    if (!o)
      return;
    const y = window.setTimeout(() => {
      var p;
      (p = u.current) === null || p === void 0 || p.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(y);
    };
  }, [o]);
  const m = () => {
    var y;
    a(!1), (y = n.onBlur) === null || y === void 0 || y.call(n);
  };
  Ee(e, () => ({
    focus: () => {
      var y;
      return (y = u.current) === null || y === void 0 ? void 0 : y.focus();
    },
    blur: () => {
      var y, p;
      (y = u.current) === null || y === void 0 || y.blur(), (p = f.current) === null || p === void 0 || p.blur();
    }
  }));
  const b = () => {
    const y = [], p = l.split(""), v = p.length, C = _e(p.length, 0, r - 1);
    for (let h = 0; h < r; h++)
      y.push(s.createElement("div", {
        className: B(`${bt}-cell`, {
          [`${bt}-cell-caret`]: n.caret && v === h && o,
          [`${bt}-cell-focused`]: C === h && o,
          [`${bt}-cell-dot`]: !n.plain && p[h]
        }),
        key: h
      }, p[h] && n.plain ? p[h] : ""));
    return y;
  }, g = B(bt, {
    [`${bt}-focused`]: o,
    [`${bt}-error`]: n.error,
    [`${bt}-seperated`]: n.seperated
  });
  return s.createElement(s.Fragment, null, W(n, s.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: g,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, s.createElement("div", {
    className: `${bt}-cell-container`
  }, b()), s.createElement("input", {
    ref: f,
    className: `${bt}-native-input`,
    value: l,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (y) => {
      c(y.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && s.cloneElement(n.keyboard, {
    visible: o,
    onInput: (y) => {
      l.length < r && c((l + y).slice(0, n.length));
    },
    onDelete: () => {
      c(l.slice(0, -1));
    },
    onClose: () => {
      var y;
      (y = u.current) === null || y === void 0 || y.blur();
    }
  }));
}), Lr = "adm-progress-bar", v6 = {
  percent: 0,
  rounded: !0,
  text: !1
}, c8 = (t) => {
  const e = z(v6, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, s.createElement("div", {
    className: B(Lr, e.rounded && `${Lr}-rounded`)
  }, s.createElement("div", {
    className: `${Lr}-trail`
  }, s.createElement("div", {
    className: `${Lr}-fill`,
    style: n
  })), Jt(r) && s.createElement("div", {
    className: `${Lr}-text`
  }, r)));
}, Kn = "adm-progress-circle", u8 = (t) => {
  const e = z({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, s.createElement("div", {
    className: `${Kn}`,
    style: n
  }, s.createElement("div", {
    className: `${Kn}-content`
  }, s.createElement("svg", {
    className: `${Kn}-svg`
  }, s.createElement("circle", {
    className: `${Kn}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${Kn}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${Kn}-info`
  }, e.children))));
}, p6 = (t) => new Promise((e) => setTimeout(e, t)), Hi = "adm-pull-to-refresh", g6 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, f8 = (t) => {
  var e, n;
  const {
    locale: r
  } = oe(), i = z(g6, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), o = (e = i.headHeight) !== null && e !== void 0 ? e : Sn(40), a = (n = i.threshold) !== null && n !== void 0 ? n : Sn(60), [l, c] = Y("pulling"), [u, f] = Me(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      round: !0,
      clamp: !0
    }
  })), d = j(null), m = j(!1);
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
  function g() {
    return Se(this, void 0, void 0, function* () {
      f.start({
        height: o
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (p) {
        throw b(), p;
      }
      i.completeDelay > 0 && (yield p6(i.completeDelay)), b();
    });
  }
  St((p) => {
    if (l === "refreshing" || l === "complete")
      return;
    const {
      event: v
    } = p;
    if (p.last) {
      m.current = !1, l === "canRelease" ? g() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = p.movement, h = Math.ceil(C);
    if (p.first && h > 0) {
      let k = function(F) {
        return "scrollTop" in F ? F.scrollTop : F.scrollY;
      };
      const w = p.event.target;
      if (!w || !(w instanceof Element))
        return;
      let x = io(w);
      for (; ; ) {
        if (!x || k(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = io(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    v.cancelable && v.preventDefault(), v.stopPropagation();
    const E = Math.max(oi(h, 0, 0, o * 5, 0.5), 0);
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
    eventOptions: Fn ? {
      passive: !1
    } : void 0
  });
  const y = () => {
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
  return s.createElement(ye.div, {
    ref: d,
    className: Hi
  }, s.createElement(ye.div, {
    style: u,
    className: `${Hi}-head`
  }, s.createElement("div", {
    className: `${Hi}-head-content`,
    style: {
      height: o
    }
  }, y())), s.createElement("div", {
    className: `${Hi}-content`
  }, i.children));
}, u1 = gs(null), y6 = {
  disabled: !1,
  defaultValue: null
}, b6 = (t) => {
  const e = z(y6, t), [n, r] = ie({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var o;
      i !== null && ((o = e.onChange) === null || o === void 0 || o.call(e, i));
    }
  });
  return s.createElement(
    u1.Provider,
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
}, vn = "adm-radio", E6 = {
  defaultChecked: !1
}, w6 = (t) => {
  const e = z(E6, t), n = at(u1);
  let [r, i] = ie({
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
    className: `${vn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${vn}-icon`
  }, r && s.createElement(nd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: B(vn, {
      [`${vn}-checked`]: r,
      [`${vn}-disabled`]: o,
      [`${vn}-block`]: e.block
    })
  }, s.createElement(rd, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: o,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${vn}-content`
  }, e.children)));
}, d8 = ce(w6, {
  Group: b6
}), C6 = () => s.createElement("svg", {
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
})), pn = "adm-rate", x6 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(C6, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, m8 = (t) => {
  const e = z(x6, t), [n, r] = ie(e), i = j(null), o = Array(e.count).fill(null);
  function a(c, u) {
    return s.createElement("div", {
      className: B(`${pn}-star`, {
        [`${pn}-star-active`]: n >= c,
        [`${pn}-star-half`]: u,
        [`${pn}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const l = St((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), b = (u - m.left) / m.width * e.count, g = e.allowHalf ? Math.ceil(b * 2) / 2 : Math.ceil(b), y = _e(g, 0, e.count);
    if (f && e.allowClear && y === n) {
      r(0);
      return;
    }
    r(y);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    },
    filterTaps: !0
  });
  return W(e, s.createElement("div", Object.assign({
    className: B(pn, {
      [`${pn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), o.map((c, u) => s.createElement("div", {
    key: u,
    className: B(`${pn}-box`)
  }, e.allowHalf && a(u + 0.5, !0), a(u + 1, !1)))));
}, f1 = (t) => {
  const {
    result: e = {}
  } = oe(), {
    successIcon: n = s.createElement(c2, null),
    errorIcon: r = s.createElement(js, null),
    infoIcon: i = s.createElement(m2, null),
    waitingIcon: o = s.createElement(u2, null),
    warningIcon: a = s.createElement(d2, null)
  } = e || {};
  switch (t) {
    case "success":
      return n;
    case "error":
      return r;
    case "info":
      return i;
    case "waiting":
      return o;
    case "warning":
      return a;
    default:
      return null;
  }
}, Dr = "adm-result", k6 = {
  status: "info"
}, h8 = (t) => {
  const e = z(k6, t), {
    status: n,
    title: r,
    description: i,
    icon: o
  } = e, a = f1(n);
  return n ? W(e, s.createElement("div", {
    className: B(Dr, `${Dr}-${n}`)
  }, s.createElement("div", {
    className: `${Dr}-icon`
  }, o || a), s.createElement("div", {
    className: `${Dr}-title`
  }, r), !!i && s.createElement("div", {
    className: `${Dr}-description`
  }, i))) : null;
}, Ie = "adm-result-page", $6 = {
  status: "info",
  details: []
}, _6 = (t) => {
  const e = z($6, t), {
    status: n,
    title: r,
    description: i,
    details: o,
    icon: a,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = f1(n), [m, b] = Y(!0), g = Jt(c), y = Jt(l);
  return W(e, s.createElement("div", {
    className: Ie
  }, s.createElement("div", {
    className: `${Ie}-header`
  }, s.createElement("div", {
    className: `${Ie}-icon`
  }, a || d), s.createElement("div", {
    className: `${Ie}-title`
  }, r), Jt(i) ? s.createElement("div", {
    className: `${Ie}-description`
  }, i) : null, o != null && o.length ? s.createElement("div", {
    className: `${Ie}-details`
  }, (m ? o.slice(0, 3) : o).map((p, v) => s.createElement("div", {
    className: B(`${Ie}-detail`, p.bold && `${Ie}-detail-bold`),
    key: v
  }, s.createElement("span", null, p.label), s.createElement("span", null, p.value))), o.length > 3 && s.createElement("div", {
    onClick: () => b((p) => !p)
  }, s.createElement("div", {
    className: B(`${Ie}-collapse`, !m && `${Ie}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ie}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ie}-bg`
  }))), s.createElement("div", {
    className: `${Ie}-content`
  }, e.children), (y || g) && s.createElement("div", {
    className: `${Ie}-footer`
  }, g && s.createElement(Lt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ie}-footer-btn`
  }, c), y && g && s.createElement("div", {
    className: `${Ie}-footer-space`
  }), y && s.createElement(Lt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ie}-footer-btn`
  }, l))));
}, O6 = "adm-result-page-card", S6 = (t) => W(t, s.createElement("div", {
  className: B(`${O6}`)
}, t.children)), v8 = ce(_6, {
  Card: S6
}), Kt = "adm-search-bar", F6 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0
}, p8 = he((t, e) => {
  const {
    locale: n,
    searchBar: r = {}
  } = oe(), i = z(F6, r, {
    cancelText: n.common.cancel
  }, t), o = An(s.createElement(y2, null), r.searchIcon, t.icon, t.searchIcon), [a, l] = ie(i), [c, u] = Y(!1), f = j(null), d = j(!1);
  Ee(e, () => ({
    clear: () => {
      var b;
      return (b = f.current) === null || b === void 0 ? void 0 : b.clear();
    },
    focus: () => {
      var b;
      return (b = f.current) === null || b === void 0 ? void 0 : b.focus();
    },
    blur: () => {
      var b;
      return (b = f.current) === null || b === void 0 ? void 0 : b.blur();
    },
    get nativeElement() {
      var b, g;
      return (g = (b = f.current) === null || b === void 0 ? void 0 : b.nativeElement) !== null && g !== void 0 ? g : null;
    }
  }));
  const m = () => {
    let b;
    return typeof i.showCancelButton == "function" ? b = i.showCancelButton(c, a) : b = i.showCancelButton && c, b && s.createElement("div", {
      className: `${Kt}-suffix`
    }, s.createElement(Lt, {
      fill: "none",
      className: `${Kt}-cancel-button`,
      onClick: () => {
        var g, y, p;
        i.clearOnCancel && ((g = f.current) === null || g === void 0 || g.clear()), (y = f.current) === null || y === void 0 || y.blur(), (p = i.onCancel) === null || p === void 0 || p.call(i);
      },
      onMouseDown: (g) => {
        g.preventDefault();
      }
    }, i.cancelText));
  };
  return W(i, s.createElement("div", {
    className: B(Kt, {
      [`${Kt}-active`]: c
    })
  }, s.createElement("div", {
    className: `${Kt}-input-box`
  }, o && s.createElement("div", {
    className: `${Kt}-input-box-icon`
  }, o), s.createElement(l1, {
    ref: f,
    className: B(`${Kt}-input`, {
      [`${Kt}-input-without-icon`]: !o
    }),
    value: a,
    onChange: l,
    maxLength: i.maxLength,
    placeholder: i.placeholder,
    clearable: i.clearable,
    onlyShowClearWhenFocus: i.onlyShowClearWhenFocus,
    onFocus: (b) => {
      var g;
      u(!0), (g = i.onFocus) === null || g === void 0 || g.call(i, b);
    },
    onBlur: (b) => {
      var g;
      u(!1), (g = i.onBlur) === null || g === void 0 || g.call(i, b);
    },
    onClear: i.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      var b, g;
      d.current || ((b = f.current) === null || b === void 0 || b.blur(), (g = i.onSearch) === null || g === void 0 || g.call(i, a));
    },
    "aria-label": n.SearchBar.name,
    onCompositionStart: (b) => {
      var g;
      d.current = !0, (g = i.onCompositionStart) === null || g === void 0 || g.call(i, b);
    },
    onCompositionEnd: (b) => {
      var g;
      d.current = !1, (g = i.onCompositionEnd) === null || g === void 0 || g.call(i, b);
    }
  })), m()));
}), N6 = Ve(() => s.createElement("svg", {
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
})))))))), gn = "adm-selector", P6 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, g8 = (t) => {
  const e = z(P6, t), [n, r, , i] = wi(e.fieldNames), [o, a] = ie({
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
  } = oe(), c = e.options.map((u) => {
    const f = (o || []).includes(u[r]), d = u[i] || e.disabled, m = B(`${gn}-item`, {
      [`${gn}-item-active`]: f && !e.multiple,
      [`${gn}-item-multiple-active`]: f && e.multiple,
      [`${gn}-item-disabled`]: d
    });
    return s.createElement("div", {
      key: u[r],
      className: m,
      onClick: () => {
        if (!d)
          if (e.multiple) {
            const b = f ? o.filter((g) => g !== u[r]) : [...o, u[r]];
            a(b);
          } else {
            const b = f ? [] : [u[r]];
            a(b);
          }
      },
      role: "option",
      "aria-selected": f && !e.multiple || f && e.multiple
    }, u[n], u.description && s.createElement("div", {
      className: `${gn}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${gn}-check-mark-wrapper`
    }, s.createElement(N6, null)));
  });
  return W(e, s.createElement("div", {
    className: gn,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(Jd, {
    columns: e.columns
  }, c) : s.createElement(bl, {
    wrap: !0
  }, c)));
}, wa = Ve((t) => W(t, s.createElement("svg", {
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
}))))), Te = "adm-side-bar", R6 = () => null, M6 = (t) => {
  var e;
  let n = null;
  const r = [];
  un(t.children, (c, u) => {
    if (!In(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, o] = ie({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = t.onChange) === null || u === void 0 || u.call(t, c));
    }
  }), a = r[r.length - 1], l = a && a.key === i;
  return W(t, s.createElement("div", {
    className: Te
  }, s.createElement("div", {
    className: `${Te}-items`
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
      className: B(`${Te}-item`, {
        [`${Te}-item-active`]: f,
        [`${Te}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(wa, {
      className: `${Te}-item-corner ${Te}-item-corner-top`
    }), m && s.createElement(wa, {
      className: `${Te}-item-corner ${Te}-item-corner-bottom`
    })), s.createElement(Za, {
      content: c.props.badge,
      className: `${Te}-badge`
    }, s.createElement("div", {
      className: `${Te}-item-title`
    }, f && s.createElement("div", {
      className: `${Te}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: B(`${Te}-extra-space`, l && `${Te}-item-active-next-sibling`)
  }, l && s.createElement(wa, {
    className: `${Te}-item-corner ${Te}-item-corner-top`
  }))));
}, y8 = ce(M6, {
  Item: R6
}), Ca = "adm-slider", I6 = ({
  points: t,
  max: e,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const o = e - n, a = t.map((l) => {
    const c = `${Math.abs(l - n) / o * 100}%`, u = l <= r && l >= i, f = {
      left: c
    }, d = B({
      [`${Ca}-tick`]: !0,
      [`${Ca}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${Ca}-ticks`
  }, a);
}, A6 = I6, xa = "adm-slider-mark", T6 = ({
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
    const f = c <= e && c >= n, d = B({
      [`${xa}-text`]: !0,
      [`${xa}-text-active`]: f
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
    className: xa
  }, l);
}, L6 = T6;
function vs() {
  return typeof BigInt == "function";
}
function d1(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function Gr(t) {
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
function wl(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function Zr(t) {
  var e = String(t);
  if (wl(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && h1(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function m1(t) {
  var e = String(t);
  if (wl(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(vs() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(vs() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(Zr(e));
  }
  return Gr(e).fullStr;
}
function h1(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var D6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ci(this, t), De(this, "origin", ""), De(this, "negative", void 0), De(this, "integer", void 0), De(this, "decimal", void 0), De(this, "decimalLen", void 0), De(this, "empty", void 0), De(this, "nan", void 0), d1(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (wl(n) && (n = Number(n)), n = typeof n == "string" ? n : m1(n), h1(n)) {
      var r = Gr(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var o = i[1] || "0";
      this.decimal = BigInt(o), this.decimalLen = o.length;
    } else
      this.nan = !0;
  }
  return xi(t, [{
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
      var o = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), a = this.alignDecimal(o), l = n.alignDecimal(o), c = r(a, l).toString(), u = i(o), f = Gr(c), d = f.negativeStr, m = f.trimStr, b = "".concat(d).concat(m.padStart(u + 1, "0"));
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
      return n ? this.isInvalidate() ? "" : Gr("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), V6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ci(this, t), De(this, "origin", ""), De(this, "number", void 0), De(this, "empty", void 0), d1(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return xi(t, [{
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
      var o = Math.max(Zr(this.number), Zr(r));
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
      var o = Math.max(Zr(this.number), Zr(r));
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
      return n ? this.isInvalidate() ? "" : m1(this.number) : this.origin;
    }
  }]), t;
}();
function Ze(t) {
  return vs() ? new D6(t) : new V6(t);
}
function Cl(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = Gr(t), o = i.negativeStr, a = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(o).concat(a);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = Ze(t).add("".concat(o, "0.").concat("0".repeat(n)).concat(10 - f));
      return Cl(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const j6 = (t) => W(t, s.createElement("svg", {
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
})))), ka = "adm-slider", B6 = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: o,
    residentPopover: a,
    onDrag: l
  } = t, c = j(e), {
    locale: u
  } = oe(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = Y(!1), b = St((p) => {
    var v;
    if (i)
      return;
    p.first && (c.current = e);
    const C = p.xy[0] - p.initial[0], h = (v = t.trackRef.current) === null || v === void 0 ? void 0 : v.offsetWidth;
    if (!h)
      return;
    const E = C / Math.ceil(h) * (r - n);
    l(c.current + E, p.first, p.last), m(!p.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), g = typeof t.popover == "function" ? t.popover : t.popover ? (p) => p.toString() : null, y = s.createElement("div", {
    className: `${ka}-thumb`
  }, o || s.createElement(j6, {
    className: `${ka}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${ka}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), g ? s.createElement(Gd, {
    content: g(e),
    placement: "top",
    visible: a || d,
    getContainer: null,
    mode: "dark"
  }, y) : y);
}, W6 = B6, Vr = "adm-slider", Z6 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, b8 = (t) => {
  var e;
  const n = z(Z6, t), {
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
    const S = Ze($), O = Cl(S.toString(), ".", M);
    return Ze(O).toNumber();
  }
  function b($) {
    const M = Math.max(g(c), g($[0]), g($[1]));
    return n.range ? $.map((S) => m(S, M)) : m($[1], M);
  }
  function g($) {
    return (`${$}`.split(".")[1] || "").length;
  }
  function y($) {
    var M;
    (M = n.onAfterChange) === null || M === void 0 || M.call(n, b($));
  }
  let p = n.value;
  n.range && typeof n.value == "number" && (p = [0, n.value]);
  const [v, C] = ie({
    value: p,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), h = f(d(v));
  function E($) {
    const M = f($), S = h;
    M[0] === S[0] && M[1] === S[1] || C(b(M));
  }
  const w = j(null), x = `${100 * (h[1] - h[0]) / (i - r)}%`, k = `${100 * (h[0] - r) / (i - r)}%`, F = re(() => {
    if (a)
      return Object.keys(a).map(parseFloat).sort(($, M) => $ - M);
    if (l) {
      const $ = [];
      for (let M = Ze(r); M.lessEquals(Ze(i)); M = M.add(c))
        $.push(M.toNumber());
      return $;
    }
    return [];
  }, [a, l, c, r, i]);
  function N($) {
    const M = $ < r ? r : $ > i ? i : $;
    let S = r;
    if (F.length)
      S = rl(F, M);
    else {
      const O = Math.round((M - r) / c), I = Ze(O).multi(c);
      S = Ze(r).add(I.toString()).toNumber();
    }
    return S;
  }
  const _ = j(0), D = ($) => {
    if (_.current > 0 || ($.stopPropagation(), o))
      return;
    const M = w.current;
    if (!M)
      return;
    const S = M.getBoundingClientRect().left, O = ($.clientX - S) / Math.ceil(M.offsetWidth) * (i - r) + r, I = N(O);
    let P;
    n.range ? Math.abs(I - h[0]) > Math.abs(I - h[1]) ? P = [h[0], I] : P = [I, h[1]] : P = [n.min, I], E(P), y(P);
  }, T = j(), R = ($) => s.createElement(W6, {
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
      S && (_.current += 1, T.current = h);
      const I = N(M), P = T.current;
      if (!P)
        return;
      const A = [...P];
      A[$] = I, E(A), O && (y(A), window.setTimeout(() => {
        _.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return W(n, s.createElement("div", {
    className: B(Vr, {
      [`${Vr}-disabled`]: o
    })
  }, s.createElement("div", {
    className: `${Vr}-track-container`,
    onClick: D
  }, s.createElement("div", {
    className: `${Vr}-track`,
    onClick: D,
    ref: w
  }, s.createElement("div", {
    className: `${Vr}-fill`,
    style: {
      width: x,
      left: k
    }
  }), n.ticks && s.createElement(A6, {
    points: F,
    min: r,
    max: i,
    lowerBound: h[0],
    upperBound: h[1]
  }), n.range && R(0), R(1))), a && s.createElement(L6, {
    min: r,
    max: i,
    marks: a,
    lowerBound: h[0],
    upperBound: h[1]
  })));
};
function uu(t) {
  var e = L.useRef();
  e.current = t;
  var n = L.useCallback(function() {
    for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(o));
  }, []);
  return n;
}
function H6() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var fu = H6() ? L.useLayoutEffect : L.useEffect, z6 = function(e, n) {
  var r = L.useRef(!0);
  fu(function() {
    return e(r.current);
  }, n), fu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, du = function(e, n) {
  z6(function(r) {
    if (!r)
      return e();
  }, n);
};
function mu(t) {
  var e = L.useRef(!1), n = L.useState(t), r = on(n, 2), i = r[0], o = r[1];
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
function $a(t) {
  return t !== void 0;
}
function U6(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, o = n.onChange, a = n.postState, l = mu(function() {
    return $a(i) ? i : $a(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = on(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = a ? a(d) : d, b = uu(o), g = mu([d]), y = on(g, 2), p = y[0], v = y[1];
  du(function() {
    var h = p[0];
    u !== h && b(u, h);
  }, [p]), du(function() {
    $a(i) || f(i);
  }, [i]);
  var C = uu(function(h, E) {
    f(h, E), v([d], E);
  });
  return [m, C];
}
const Yn = "adm-stepper", q6 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function K6(t, e) {
  const n = z(q6, t), {
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
    parser: g
  } = n, {
    locale: y
  } = oe();
  Ee(e, () => ({
    focus: () => {
      var P;
      (P = T.current) === null || P === void 0 || P.focus();
    },
    blur: () => {
      var P;
      (P = T.current) === null || P === void 0 || P.blur();
    },
    get nativeElement() {
      var P, A;
      return (A = (P = T.current) === null || P === void 0 ? void 0 : P.nativeElement) !== null && A !== void 0 ? A : null;
    }
  }));
  const p = (P) => (d !== void 0 ? Cl(P.toString(), ".", d) : P).toString(), v = (P) => m ? P.toString() : P.toNumber(), C = (P) => {
    if (P === "")
      return null;
    if (g)
      return String(g(P));
    const A = Ze(P);
    return A.isInvalidate() ? null : A.toString();
  }, h = (P) => P === null ? "" : b ? b(P) : p(P), [E, w] = U6(r, {
    value: i,
    onChange: (P) => {
      o == null || o(P);
    }
  }), [x, k] = Y(() => h(E));
  function F(P) {
    if (P.isNaN())
      return;
    let A = P;
    if (u !== void 0) {
      const V = Ze(u);
      A.lessEquals(V) && (A = V);
    }
    if (c !== void 0) {
      const V = Ze(c);
      V.lessEquals(A) && (A = V);
    }
    d !== void 0 && (A = Ze(p(v(A)))), w(v(A));
  }
  const N = (P) => {
    k(P);
    const A = C(P);
    A === null ? n.allowEmpty ? w(null) : w(r) : F(Ze(A));
  }, [_, D] = Y(!1), T = s.useRef(null);
  function R(P) {
    D(P), P && k(E != null ? String(E) : "");
  }
  X(() => {
    var P, A, V;
    _ && ((V = (A = (P = T.current) === null || P === void 0 ? void 0 : P.nativeElement) === null || A === void 0 ? void 0 : A.select) === null || V === void 0 || V.call(A));
  }, [_]), X(() => {
    _ || k(h(E));
  }, [_, E, d]);
  const $ = (P) => {
    let A = Ze(l);
    P || (A = A.negate()), F(Ze(E ?? 0).add(A.toString()));
  }, M = () => {
    $(!1);
  }, S = () => {
    $(!0);
  }, O = () => a ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, I = () => a ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: B(Yn, {
      [`${Yn}-active`]: _
    })
  }, s.createElement(Lt, {
    className: `${Yn}-minus`,
    onClick: M,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.decrease
  }, s.createElement(v2, null)), s.createElement("div", {
    className: `${Yn}-middle`
  }, s.createElement(l1, {
    ref: T,
    className: `${Yn}-input`,
    onFocus: (P) => {
      var A;
      R(!0), (A = n.onFocus) === null || A === void 0 || A.call(n, P);
    },
    value: x,
    onChange: (P) => {
      a || N(P);
    },
    disabled: a,
    onBlur: (P) => {
      var A;
      R(!1), (A = n.onBlur) === null || A === void 0 || A.call(n, P);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(Lt, {
    className: `${Yn}-plus`,
    onClick: S,
    disabled: I(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.increase
  }, s.createElement(mf, null))));
}
const E8 = he(K6), yn = "adm-step", Y6 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, s.createElement("div", {
    className: B(`${yn}`, `${yn}-status-${i}`)
  }, s.createElement("div", {
    className: `${yn}-indicator`
  }, s.createElement("div", {
    className: `${yn}-icon-container`
  }, r)), s.createElement("div", {
    className: `${yn}-content`
  }, s.createElement("div", {
    className: `${yn}-title`
  }, e), !!n && s.createElement("div", {
    className: `${yn}-description`
  }, n))));
}, hu = "adm-steps", G6 = "adm-step", X6 = s.createElement("span", {
  className: `${G6}-icon-dot`
}), Q6 = {
  current: 0,
  direction: "horizontal"
}, J6 = (t) => {
  const e = z(Q6, t), {
    direction: n,
    current: r
  } = e, i = B(hu, `${hu}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (o, a) => {
    var l;
    if (!s.isValidElement(o))
      return o;
    const c = o.props;
    let u = c.status || "wait";
    a < r ? u = c.status || "finish" : a === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : X6;
    return s.cloneElement(o, {
      status: u,
      icon: f
    });
  })));
}, w8 = ce(J6, {
  Step: Y6
}), Yt = "adm-swipe-action", e7 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, C8 = he((t, e) => {
  const n = z(e7, t), r = j(null), i = j(null), o = j(null);
  function a(v) {
    const C = v.current;
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
  }, f] = Me(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = j(!1), m = j(null);
  function b() {
    var v;
    (v = m.current) === null || v === void 0 || v.call(m), d.current = !1;
  }
  const g = St((v) => {
    var C;
    if (m.current = v.cancel, !v.intentional || (v.down && (d.current = !0), !d.current))
      return;
    const [h] = v.offset;
    if (v.last) {
      const E = l(), w = c();
      let x = h + v.velocity[0] * v.direction[0] * 50;
      h > 0 ? x = Math.max(0, x) : h < 0 ? x = Math.min(0, x) : x = 0;
      const k = rl([-w, 0, E], x);
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
      const v = l();
      return {
        left: -c(),
        right: v
      };
    },
    axis: "x",
    preventScroll: !0,
    pointer: {
      touch: !0
    },
    triggerAllEvents: !0
  });
  function y() {
    f.start({
      x: 0
    }), b();
  }
  Ee(e, () => ({
    show: (v = "right") => {
      var C;
      v === "right" ? f.start({
        x: -c()
      }) : v === "left" && f.start({
        x: l()
      }), (C = t.onActionsReveal) === null || C === void 0 || C.call(t, v);
    },
    close: y
  })), X(() => {
    if (!n.closeOnTouchOutside)
      return;
    function v(C) {
      if (u.get() === 0)
        return;
      const h = r.current;
      h && !h.contains(C.target) && y();
    }
    return document.addEventListener("touchstart", v), () => {
      document.removeEventListener("touchstart", v);
    };
  }, [n.closeOnTouchOutside]);
  function p(v) {
    var C, h;
    const E = (C = v.color) !== null && C !== void 0 ? C : "light";
    return s.createElement(Lt, {
      key: v.key,
      className: `${Yt}-action-button`,
      style: {
        "--background-color": (h = t7[E]) !== null && h !== void 0 ? h : E
      },
      onClick: (w) => {
        var x, k;
        n.closeOnAction && y(), (x = v.onClick) === null || x === void 0 || x.call(v, w), (k = n.onAction) === null || k === void 0 || k.call(n, v, w);
      }
    }, v.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: Yt
  }, g(), {
    ref: r,
    onClickCapture: (v) => {
      d.current && (v.stopPropagation(), v.preventDefault());
    }
  }), s.createElement(ye.div, {
    className: `${Yt}-track`,
    style: {
      x: u
    }
  }, rn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-left`,
    ref: i
  }, n.leftActions.map(p))), s.createElement("div", {
    className: `${Yt}-content`,
    onClickCapture: (v) => {
      u.goal !== 0 && (v.preventDefault(), v.stopPropagation(), y());
    }
  }, s.createElement(ye.div, {
    style: {
      pointerEvents: u.to((v) => v !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), rn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-right`,
    ref: o
  }, n.rightActions.map(p))))));
}), t7 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, v1 = (t) => W(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function n7(t) {
  const [e, n] = Y(t), r = j(e);
  return X(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function r7(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), o = {};
  return i.forEach((a) => {
    const l = t[a], c = e[a];
    typeof l == "function" && typeof c == "function" ? o[a] = function(...u) {
      l(...u), c(...u);
    } : o[a] = l || c;
  }), o;
}
const Et = "adm-swiper", i7 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, o7 = {
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
let zi;
const a7 = he(Us((t, e) => {
  const n = z(o7, t), {
    direction: r,
    total: i,
    children: o,
    indicator: a
  } = n, [l] = Y({}), c = j(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: g
  } = re(() => {
    let p = 0, v, C;
    return typeof o == "function" ? v = o : C = s.Children.map(o, (h) => !s.isValidElement(h) || h.type !== v1 ? null : (p++, h)), {
      renderChildren: v,
      validChildren: C,
      count: p
    };
  }, [o]), y = i ?? b;
  return y === 0 || !m && !g ? null : () => {
    let p = n.loop;
    f * (y - 1) < 1 && (p = !1);
    const v = j(null);
    function C() {
      const U = v.current;
      return U ? (u ? U.offsetHeight : U.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [h, E, w] = G0(n.defaultIndex), [x, k, F] = n7(!1);
    function N(U) {
      let ee = 0, J = y - 1;
      return n.stuckAtBoundary && (ee += d / f, J -= (1 - f - d) / f), _e(U, ee, J);
    }
    const [{
      position: _
    }, D] = Me(() => ({
      position: N(h) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (F.current || !p)
          return;
        const U = _.get(), ee = 100 * y, J = _a(U, ee);
        J !== U && D.start({
          position: J,
          immediate: !0
        });
      }
    }), [y]), T = j(null);
    function R() {
      var U;
      (U = T.current) === null || U === void 0 || U.call(T), F.current = !1;
    }
    const $ = St((U) => {
      if (T.current = U.cancel, !U.intentional || (U.first && !zi && (zi = l), zi !== l))
        return;
      zi = U.last ? void 0 : l;
      const ee = C();
      if (!ee)
        return;
      const J = u ? 1 : 0, xe = U.offset[J], be = U.direction[J], we = U.velocity[J];
      if (k(!0), !U.last)
        D.start({
          position: xe * 100 / ee,
          immediate: !0
        });
      else {
        const Ue = Math.floor(xe / ee), Je = Ue + 1, qe = Math.round((xe + we * 2e3 * be) / ee);
        M(_e(qe, Ue, Je)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([U, ee]) => [-U, -ee],
      from: () => {
        const U = C();
        return [_.get() / 100 * U, _.get() / 100 * U];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (p)
          return {};
        const U = C(), ee = N(0) * U, J = N(y - 1) * U;
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
    function M(U, ee = !1) {
      var J;
      const xe = Math.round(U), be = p ? _a(xe, y) : _e(xe, 0, y - 1);
      be !== w() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, be)), E(be), D.start({
        position: (p ? xe : N(xe)) * 100,
        immediate: ee
      });
    }
    function S() {
      M(Math.round(_.get() / 100) + 1);
    }
    function O() {
      M(Math.round(_.get() / 100) - 1);
    }
    Ee(e, () => ({
      swipeTo: M,
      swipeNext: S,
      swipePrev: O
    })), Ne(() => {
      const U = y - 1;
      h > U && M(U, !0);
    });
    const {
      autoplay: I,
      autoplayInterval: P
    } = n, A = () => {
      c.current = window.setTimeout(() => {
        I === "reverse" ? O() : S(), A();
      }, P);
    };
    X(() => {
      if (!(!I || x))
        return A(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [I, P, x, y]);
    function V(U, ee) {
      let J = {};
      return p && (J = {
        [u ? "y" : "x"]: _.to((xe) => {
          let be = -xe + U * 100;
          const we = y * 100, Ue = we / 2;
          return be = _a(be + Ue, we) - Ue, `${be}%`;
        }),
        [u ? "top" : "left"]: `-${U * 100}%`
      }), s.createElement(ye.div, {
        className: B(`${Et}-slide`, {
          [`${Et}-slide-active`]: h === U
        }),
        style: J,
        key: U
      }, ee);
    }
    function Z() {
      if (g && i) {
        const ee = Math.max(h - 2, 0), J = Math.min(h + 2, i - 1), xe = [];
        for (let be = ee; be <= J; be += 1)
          xe.push(V(be, g(be)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${Et}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), xe);
      }
      return s.Children.map(m, (U, ee) => V(ee, U));
    }
    function q() {
      return p ? s.createElement("div", {
        className: `${Et}-track-inner`
      }, Z()) : s.createElement(ye.div, {
        className: `${Et}-track-inner`,
        style: {
          [u ? "y" : "x"]: _.to((U) => `${-U}%`)
        }
      }, Z());
    }
    const K = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, G = Object.assign({}, n.allowTouchMove ? $() : {}), le = {};
    for (const U of n.stopPropagation) {
      const ee = i7[U];
      le[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const ue = r7(G, le);
    let ve = null;
    return typeof a == "function" ? ve = a(y, h) : a !== !1 && (ve = s.createElement("div", {
      className: `${Et}-indicator`
    }, s.createElement(h6, Object.assign({}, n.indicatorProps, {
      total: y,
      current: h,
      direction: r
    })))), W(n, s.createElement("div", {
      className: B(Et, `${Et}-${r}`),
      style: K
    }, s.createElement("div", Object.assign({
      ref: v,
      className: B(`${Et}-track`, {
        [`${Et}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (U) => {
        F.current && U.stopPropagation(), R();
      }
    }, ue), q()), ve));
  };
}));
function _a(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const x8 = ce(a7, {
  Item: v1
}), s7 = Ve((t) => W(t, s.createElement("svg", {
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
})))))))), bn = "adm-switch", l7 = {
  defaultChecked: !1
}, k8 = (t) => {
  const e = z(l7, t), n = e.disabled || e.loading || !1, [r, i] = Y(!1), {
    locale: o
  } = oe(), [a, l] = ie({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Se(this, void 0, void 0, function* () {
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
      if (Rf(f)) {
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
    className: B(bn, {
      [`${bn}-checked`]: a,
      [`${bn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": o.Switch.name,
    "aria-checked": a,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${bn}-checkbox`
  }, s.createElement("div", {
    className: `${bn}-handle`
  }, (e.loading || r) && s.createElement(s7, {
    className: `${bn}-spin-icon`
  })), s.createElement("div", {
    className: `${bn}-inner`
  }, a ? e.checkedText : e.uncheckedText))));
}, c7 = () => null, Rt = "adm-tab-bar", u7 = {
  safeArea: !1
}, f7 = (t) => {
  var e;
  const n = z(u7, t);
  let r = null;
  const i = [];
  un(n.children, (l, c) => {
    if (!In(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [o, a] = ie({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : r,
    onChange: (l) => {
      var c;
      l !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, l));
    }
  });
  return W(n, s.createElement("div", {
    className: Rt
  }, s.createElement("div", {
    className: `${Rt}-wrap`
  }, i.map((l) => {
    const c = l.key === o;
    function u() {
      const f = l.props.icon && s.createElement("div", {
        className: `${Rt}-item-icon`
      }, typeof l.props.icon == "function" ? l.props.icon(c) : l.props.icon), d = l.props.title && s.createElement("div", {
        className: B(`${Rt}-item-title`, !!f && `${Rt}-item-title-with-icon`)
      }, typeof l.props.title == "function" ? l.props.title(c) : l.props.title);
      return f ? s.createElement(s.Fragment, null, s.createElement(Za, {
        content: l.props.badge,
        className: `${Rt}-icon-badge`
      }, f), d) : d ? s.createElement(Za, {
        content: l.props.badge,
        className: `${Rt}-title-badge`
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
      className: B(`${Rt}-item`, {
        [`${Rt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(Er, {
    position: "bottom"
  })));
}, $8 = ce(f7, {
  Item: c7
}), vu = "adm-tag", d7 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, m7 = {
  color: "default",
  fill: "solid",
  round: !1
}, _8 = (t) => {
  var e;
  const n = z(m7, t), r = (e = d7[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: B(vu, {
      [`${vu}-round`]: n.round
    })
  }, n.children));
}, jr = "adm-text-area", p1 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, h7 = he((t, e) => {
  const n = z(p1, t), {
    autoSize: r,
    showCount: i,
    maxLength: o
  } = n, [a, l] = ie(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = j(null), u = j("auto"), f = j(null), d = s1({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown,
    nativeInputRef: c,
    enterKeyHint: n.enterKeyHint
  });
  Ee(e, () => ({
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
  })), Ne(() => {
    if (!r)
      return;
    const p = c.current, v = f.current;
    if (!p || (p.style.height = u.current, !v))
      return;
    let C = v.scrollHeight;
    if (typeof r == "object") {
      const h = window.getComputedStyle(p), E = parseFloat(h.lineHeight);
      r.minRows && (C = Math.max(C, r.minRows * E)), r.maxRows && (C = Math.min(C, r.maxRows * E));
    }
    u.current = `${C}px`, p.style.height = `${C}px`;
  }, [a, r]);
  const m = j(!1);
  let b;
  const g = Xi(a).length;
  typeof i == "function" ? b = i(g, o) : i && (b = s.createElement("div", {
    className: `${jr}-count`
  }, o === void 0 ? g : g + "/" + o));
  let y = n.rows;
  return typeof r == "object" && (r.maxRows && y > r.maxRows && (y = r.maxRows), r.minRows && y < r.minRows && (y = r.minRows)), W(n, s.createElement("div", {
    className: jr
  }, s.createElement("textarea", {
    ref: c,
    className: `${jr}-element`,
    rows: y,
    value: a,
    placeholder: n.placeholder,
    onChange: (p) => {
      let v = p.target.value;
      o && !m.current && (v = Xi(v).slice(0, o).join("")), l(v);
    },
    id: n.id,
    onCompositionStart: (p) => {
      var v;
      m.current = !0, (v = n.onCompositionStart) === null || v === void 0 || v.call(n, p);
    },
    onCompositionEnd: (p) => {
      var v;
      if (m.current = !1, o) {
        const C = p.target.value;
        l(Xi(C).slice(0, o).join(""));
      }
      (v = n.onCompositionEnd) === null || v === void 0 || v.call(n, p);
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
    className: `${jr}-element ${jr}-element-hidden`,
    value: a,
    rows: y,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
h7.defaultProps = p1;
const Mt = "adm-toast", v7 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, p7 = (t) => {
  const e = z(v7, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: o
  } = e, a = re(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(hf, {
          className: `${Mt}-icon-success`
        });
      case "fail":
        return s.createElement(Lo, {
          className: `${Mt}-icon-fail`
        });
      case "loading":
        return s.createElement(Xs, {
          color: "white",
          className: `${Mt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = re(() => {
    switch (o) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [o]);
  return s.createElement(pi, {
    visible: e.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: e.getContainer,
    afterClose: e.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, e.maskStyle),
    className: B(`${Mt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: B(`${Mt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: B(`${Mt}-main`, i ? `${Mt}-main-icon` : `${Mt}-main-text`)
  }, a && s.createElement("div", {
    className: `${Mt}-icon`
  }, a), s.createElement(ii, null, r))));
};
let Tt = null, Oa = null;
const eo = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, g7 = (t) => s.createElement(p7, Object.assign({}, t));
function y7(t) {
  const e = z(eo, typeof t == "string" ? {
    content: t
  } : t), n = s.createElement(g7, Object.assign({}, e, {
    onClose: () => {
      Tt = null;
    }
  }));
  return Tt ? Tt.replace(n) : Tt = wr(n), Oa && window.clearTimeout(Oa), e.duration !== 0 && (Oa = window.setTimeout(() => {
    g1();
  }, e.duration)), Tt;
}
function g1() {
  Tt == null || Tt.close(), Tt = null;
}
function b7(t) {
  t.duration !== void 0 && (eo.duration = t.duration), t.position !== void 0 && (eo.position = t.position), t.maskClickable !== void 0 && (eo.maskClickable = t.maskClickable);
}
const E7 = {
  show: y7,
  clear: g1,
  config: b7
}, O8 = E7;
function y1(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((o) => {
      o[e] ? i = Math.max(i, n(o[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const Ui = "adm-tree-select", w7 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, C7 = (t) => {
  const e = z(w7, t), [n, r, i] = wi(e.fieldNames), [o, a] = ie({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = re(() => {
    const b = y1(e.options, i), g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
    function p(v, C) {
      C.forEach((h) => {
        y.set(h[r], v), g.set(h[r], h), h[i] && p(h, h[i]);
      });
    }
    return p(void 0, e.options), [b, g, y];
  }, [e.options]), f = (b) => {
    var g;
    const y = [];
    let p = b;
    for (; p; )
      y.push(p), p = u.get(p[r]);
    const v = y.reverse().map((C) => C[r]);
    a(v), (g = e.onChange) === null || g === void 0 || g.call(e, v, {
      options: y
    });
  }, d = (b = [], g) => b.map((y) => {
    const p = y[r] === o[g];
    return s.createElement("div", {
      key: y[r],
      className: B(`${Ui}-item`, {
        [`${Ui}-item-active`]: p
      }),
      onClick: () => {
        p || f(y);
      }
    }, y[n]);
  }), m = () => {
    var b;
    const g = [];
    for (let y = 0; y < l; y++) {
      let p = `${100 / l}%`;
      l === 2 && y === 0 && (p = "33.33%"), l === 2 && y === 1 && (p = "66.67%");
      const v = s.createElement("div", {
        key: y,
        className: B(`${Ui}-column`),
        style: {
          width: p
        }
      }, d(y === 0 ? e.options : (b = c.get(o[y - 1])) === null || b === void 0 ? void 0 : b[i], y));
      g.push(v);
    }
    return g;
  };
  return W(e, s.createElement("div", {
    className: Ui
  }, m()));
}, nt = "adm-tree-select-multiple", x7 = (t) => {
  const e = z({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  X(() => {
  }, []);
  const [n, r, i] = wi(e.fieldNames), [o, a] = ie({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ie({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const F = [], N = (_) => {
      var D;
      _ && (!((D = _[i]) === null || D === void 0) && D.length ? _[i].forEach((T) => N(T)) : F.push(_[r]));
    };
    return N(k), F;
  }, [f, d, m] = re(() => {
    const k = y1(e.options, i), F = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map();
    function _(D, T) {
      T.forEach((R) => {
        N.set(R[r], D), F.set(R[r], R), R[i] && _(R, R[i]);
      });
    }
    return _(void 0, e.options), [k, F, N];
  }, [e.options]), b = re(() => {
    let k = [];
    return l.forEach((F) => {
      const N = d.get(F);
      k = k.concat(u(N));
    }), k;
  }, [l, d]), g = re(() => {
    const k = /* @__PURE__ */ new Map(), F = (N) => {
      const _ = m.get(N);
      _ && (k.set(_[r], !0), F(_[r]));
    };
    return b.forEach((N) => {
      k.set(N, !0), F(N);
    }), k;
  }, [m, l]), y = (k) => {
    var F;
    let N = [...k], _ = [];
    const D = (R) => {
      R.forEach(($) => {
        var M;
        if (_.includes($))
          return;
        const S = m.get($);
        if (!S)
          return;
        const O = ((M = S[i]) === null || M === void 0 ? void 0 : M.map((I) => I[r])) || [];
        O.every((I) => N.includes(I)) && (N.push(S[r]), _ = _.concat(O));
      });
    };
    for (let R = 0; R < f; R++)
      D(N);
    N = N.filter((R) => !_.includes(R));
    const T = N.map((R) => d.get(R));
    c(N), (F = e.onChange) === null || F === void 0 || F.call(e, N, T);
  }, p = (k) => {
    var F;
    const N = [];
    let _ = k;
    for (; _; )
      N.unshift(_), _ = m.get(_[r]);
    const D = N.map((T) => T[r]);
    a(D), (F = e.onExpand) === null || F === void 0 || F.call(e, D, N);
  }, v = (k, F) => {
    var N;
    const _ = (N = e.selectAllText) === null || N === void 0 ? void 0 : N[F];
    if (!_)
      return;
    let D = [];
    k.forEach((R) => {
      D = D.concat(u(R));
    });
    const T = D.every((R) => b.includes(R));
    return s.createElement("div", {
      onClick: () => {
        y(T ? b.filter((R) => !D.includes(R)) : b.concat(D));
      },
      className: `${nt}-item`
    }, _);
  }, C = (k, F) => {
    var N;
    const _ = (N = e.selectAllText) === null || N === void 0 ? void 0 : N[F];
    if (!_)
      return;
    const D = k.map(($) => $[r]), T = D.every(($) => b.includes($)), R = T ? !1 : D.some(($) => b.includes($));
    return s.createElement("div", {
      onClick: () => {
        y(T ? b.filter(($) => !D.includes($)) : b.concat(D));
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, s.createElement(Pc, {
      className: `${nt}-item-checkbox`,
      checked: T,
      indeterminate: R
    }), _);
  }, h = (k) => {
    const F = o.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        F || p(k);
      },
      className: B(`${nt}-item`, {
        [`${nt}-item-expand`]: F
      })
    }, k[n], !!g.get(k[r]) && s.createElement("div", {
      className: `${nt}-dot`
    }));
  }, E = (k) => {
    const F = b.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        y(F ? b.filter((N) => N !== k[r]) : [...b, k[r]]);
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, s.createElement(Pc, {
      className: `${nt}-item-checkbox`,
      checked: F
    }), k[n]);
  }, w = (k = [], F) => k.length === 0 ? void 0 : f === F + 1 ? s.createElement(s.Fragment, null, C(k, F), k.map((_) => E(_))) : s.createElement(s.Fragment, null, v(k, F), k.map((_) => h(_))), x = () => {
    var k;
    const F = [];
    for (let N = 0; N < f; N++) {
      let _ = `${100 / f}%`;
      f === 2 && N === 0 && (_ = "33.33%"), f === 2 && N === 1 && (_ = "66.67%");
      const D = s.createElement("div", {
        key: N,
        className: B(`${nt}-column`),
        style: {
          width: _
        }
      }, w(N === 0 ? e.options : (k = d.get(o[N - 1])) === null || k === void 0 ? void 0 : k[i], N));
      F.push(D);
    }
    return F;
  };
  return W(e, s.createElement("div", {
    className: nt
  }, x()));
}, S8 = ce(C7, {
  Multiple: x7
}), En = "adm-virtual-input", k7 = {
  defaultValue: ""
}, F8 = he((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = oe(), i = z(k7, r, t), [o, a] = ie(i), l = j(null), c = j(null), [u, f] = Y(!1), d = An(s.createElement(js, null), r.clearIcon, t.clearIcon);
  function m() {
    const v = l.current;
    if (!v || document.activeElement !== v)
      return;
    const C = c.current;
    C && (C.scrollLeft = C.clientWidth);
  }
  Ne(() => {
    m();
  }, [o]), X(() => {
    u && m();
  }, [u]), Ee(e, () => ({
    focus: () => {
      var v;
      (v = l.current) === null || v === void 0 || v.focus();
    },
    blur: () => {
      var v;
      (v = l.current) === null || v === void 0 || v.blur();
    }
  }));
  function b() {
    var v;
    f(!0), (v = i.onFocus) === null || v === void 0 || v.call(i);
  }
  function g() {
    var v;
    f(!1), (v = i.onBlur) === null || v === void 0 || v.call(i);
  }
  const y = i.keyboard, p = y && s.cloneElement(y, {
    onInput: (v) => {
      var C, h;
      a(o + v), (h = (C = y.props).onInput) === null || h === void 0 || h.call(C, v);
    },
    onDelete: () => {
      var v, C;
      a(o.slice(0, -1)), (C = (v = y.props).onDelete) === null || C === void 0 || C.call(v);
    },
    visible: u,
    onClose: () => {
      var v, C, h, E;
      const w = document.activeElement;
      w && (!((v = l.current) === null || v === void 0) && v.contains(w)) ? w.blur() : (C = l.current) === null || C === void 0 || C.blur(), (E = (h = y.props).onClose) === null || E === void 0 || E.call(h);
    },
    getContainer: null
  });
  return W(i, s.createElement("div", {
    ref: l,
    className: B(En, {
      [`${En}-disabled`]: i.disabled
    }),
    tabIndex: i.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: b,
    onBlur: g,
    onClick: i.onClick
  }, s.createElement("div", {
    className: `${En}-content`,
    ref: c,
    "aria-disabled": i.disabled,
    "aria-label": i.placeholder
  }, o, s.createElement("div", {
    className: `${En}-caret-container`
  }, u && s.createElement("div", {
    className: `${En}-caret`
  }))), i.clearable && !!o && u && s.createElement("div", {
    className: `${En}-clear`,
    onClick: (v) => {
      var C;
      v.stopPropagation(), a(""), (C = i.onClear) === null || C === void 0 || C.call(i);
    },
    role: "button",
    "aria-label": n.Input.clear
  }, d), [void 0, null, ""].includes(o) && s.createElement("div", {
    className: `${En}-placeholder`
  }, i.placeholder), p));
}), pu = "adm-water-mark", $7 = {
  fullPage: !0
}, N8 = (t) => {
  const e = z($7, t), {
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
    fontColor: g = "rgba(0,0,0,.15)",
    fontSize: y = 14,
    fontFamily: p = "sans-serif"
  } = e, [v, C] = Y("");
  return X(() => {
    const h = document.createElement("canvas"), E = window.devicePixelRatio, w = h.getContext("2d"), x = `${(r + o) * E}px`, k = `${(i + a) * E}px`, F = o * E, N = a * E;
    if (h.setAttribute("width", x), h.setAttribute("height", k), w) {
      if (c) {
        w.translate(F / 2, N / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = new Image();
        _.crossOrigin = "anonymous", _.referrerPolicy = "no-referrer", _.onload = () => {
          w.drawImage(_, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), C(h.toDataURL());
        }, _.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate(F / 2, N / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = Number(y) * E;
        w.font = `${m} normal ${b} ${_}px/${N}px ${p}`, w.fillStyle = g, Array.isArray(d) ? d.forEach((D, T) => w.fillText(D, 0, T * _)) : w.fillText(d, 0, 0), w.restore(), C(h.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, b, o, a, p, g, c, d, y]), W(e, s.createElement("div", {
    className: B(pu, {
      [`${pu}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + o}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: v === "" ? void 0 : `url('${v}')`
    }
  }));
}, wn = "adm-footer", _7 = {
  label: "",
  links: [],
  content: "",
  chips: []
}, P8 = (t) => {
  const e = z(_7, t), {
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
    className: B(wn)
  }, n && s.createElement("div", {
    className: `${wn}-label`
  }, s.createElement(Ha, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${wn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(Ha, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${wn}-content`
  }, i), o && o.length > 0 && s.createElement("div", {
    className: `${wn}-chips`
  }, o.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: B(`${wn}-chip`, {
      [`${wn}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  R7 as ActionSheet,
  ii as AutoCenter,
  M7 as Avatar,
  Za as Badge,
  Lt as Button,
  I7 as Calendar,
  A7 as CalendarPicker,
  r4 as CalendarPickerView,
  T7 as CapsuleTabs,
  L7 as Card,
  j7 as CascadePicker,
  B7 as CascadePickerView,
  W7 as Cascader,
  G4 as CascaderView,
  ed as CenterPopup,
  Fc as CheckList,
  Pc as Checkbox,
  Z7 as Collapse,
  N7 as ConfigProvider,
  H7 as DatePicker,
  z7 as DatePickerView,
  U7 as Dialog,
  Ha as Divider,
  Pf as DotLoading,
  q7 as Dropdown,
  K7 as Ellipsis,
  Y7 as Empty,
  G7 as ErrorBlock,
  X7 as FloatingBubble,
  Q7 as FloatingPanel,
  P8 as Footer,
  J7 as Form,
  Jd as Grid,
  jo as Image,
  e8 as ImageUploader,
  H5 as ImageViewer,
  t8 as IndexBar,
  n8 as InfiniteScroll,
  l1 as Input,
  r8 as JumboTabs,
  xt as List,
  Pf as Loading,
  pi as Mask,
  i8 as Modal,
  o8 as NavBar,
  a8 as NoticeBar,
  s8 as NumberKeyboard,
  h6 as PageIndicator,
  l8 as PasscodeInput,
  Kf as Picker,
  Qo as PickerView,
  Gd as Popover,
  br as Popup,
  c8 as ProgressBar,
  u8 as ProgressCircle,
  f8 as PullToRefresh,
  d8 as Radio,
  m8 as Rate,
  h8 as Result,
  v8 as ResultPage,
  Er as SafeArea,
  Lf as ScrollMask,
  p8 as SearchBar,
  g8 as Selector,
  y8 as SideBar,
  Di as Skeleton,
  b8 as Slider,
  bl as Space,
  Xs as SpinLoading,
  E8 as Stepper,
  w8 as Steps,
  C8 as SwipeAction,
  x8 as Swiper,
  k8 as Switch,
  $8 as TabBar,
  Sc as Tabs,
  _8 as Tag,
  h7 as TextArea,
  O8 as Toast,
  S8 as TreeSelect,
  F8 as VirtualInput,
  N8 as WaterMark,
  Hv as createErrorBlock,
  D7 as reduceMotion,
  V7 as restoreMotion,
  F7 as setDefaultConfig,
  oe as useConfig
};
