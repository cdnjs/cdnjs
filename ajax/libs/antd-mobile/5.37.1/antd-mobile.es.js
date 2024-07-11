import * as T from "react";
import s, { useContext as Qe, useRef as D, useMemo as oe, useEffect as X, useState as Y, useCallback as He, useLayoutEffect as gs, forwardRef as ve, useImperativeHandle as Ee, memo as Ve, isValidElement as An, createContext as ys, cloneElement as w1 } from "react";
import * as C1 from "react-dom";
import { unstable_batchedUpdates as x1, createPortal as k1, findDOMNode as $1 } from "react-dom";
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
function _1(t, e) {
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
function O1(t) {
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
function bs(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, o; r < i; r++)
      (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
const Ke = "${label}不是一个有效的${type}", S1 = {
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
}, F1 = S1, yu = {
  current: {
    locale: F1
  }
};
function P7(t) {
  yu.current = t;
}
function fi() {
  return yu.current;
}
const bu = s.createContext(null), R7 = (t) => {
  const {
    children: e
  } = t, n = dr(t, ["children"]), r = se();
  return s.createElement(bu.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function se() {
  var t;
  return (t = Qe(bu)) !== null && t !== void 0 ? t : fi();
}
function fe(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ot(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Eu = { exports: {} };
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
})(Eu);
var N1 = Eu.exports;
const j = /* @__PURE__ */ Ot(N1);
function W(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = j(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
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
function un(t, ...e) {
  for (let n = e.length - 1; n >= 0; n -= 1)
    if (e[n] !== void 0)
      return e[n];
  return t;
}
var wu = function(t) {
  return function(e, n) {
    var r = D(!1);
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
}, P1 = function(t) {
  return typeof t == "number";
}, R1 = !1;
const di = R1;
function jt(t) {
  di && (mr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = D(t);
  e.current = oe(function() {
    return t;
  }, [t]);
  var n = D();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const Es = wu(X);
function kl(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function ko(t) {
  var e = D(t);
  return e.current = t, e;
}
var M1 = function(t) {
  di && (mr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = ko(t);
  X(function() {
    return function() {
      e.current();
    };
  }, []);
};
const mi = M1;
function I1(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ws = I1, A1 = typeof mt == "object" && mt && mt.Object === Object && mt, T1 = A1, L1 = T1, D1 = typeof self == "object" && self && self.Object === Object && self, V1 = L1 || D1 || Function("return this")(), Cu = V1, j1 = Cu, B1 = function() {
  return j1.Date.now();
}, W1 = B1, Z1 = /\s/;
function H1(t) {
  for (var e = t.length; e-- && Z1.test(t.charAt(e)); )
    ;
  return e;
}
var z1 = H1, U1 = z1, q1 = /^\s+/;
function K1(t) {
  return t && t.slice(0, U1(t) + 1).replace(q1, "");
}
var Y1 = K1, G1 = Cu, X1 = G1.Symbol, xu = X1, $l = xu, ku = Object.prototype, Q1 = ku.hasOwnProperty, J1 = ku.toString, kr = $l ? $l.toStringTag : void 0;
function e0(t) {
  var e = Q1.call(t, kr), n = t[kr];
  try {
    t[kr] = void 0;
    var r = !0;
  } catch {
  }
  var i = J1.call(t);
  return r && (e ? t[kr] = n : delete t[kr]), i;
}
var t0 = e0, n0 = Object.prototype, r0 = n0.toString;
function i0(t) {
  return r0.call(t);
}
var o0 = i0, _l = xu, a0 = t0, s0 = o0, l0 = "[object Null]", c0 = "[object Undefined]", Ol = _l ? _l.toStringTag : void 0;
function u0(t) {
  return t == null ? t === void 0 ? c0 : l0 : Ol && Ol in Object(t) ? a0(t) : s0(t);
}
var f0 = u0;
function d0(t) {
  return t != null && typeof t == "object";
}
var m0 = d0, h0 = f0, v0 = m0, p0 = "[object Symbol]";
function g0(t) {
  return typeof t == "symbol" || v0(t) && h0(t) == p0;
}
var y0 = g0, b0 = Y1, Sl = ws, E0 = y0, Fl = NaN, w0 = /^[-+]0x[0-9a-f]+$/i, C0 = /^0b[01]+$/i, x0 = /^0o[0-7]+$/i, k0 = parseInt;
function $0(t) {
  if (typeof t == "number")
    return t;
  if (E0(t))
    return Fl;
  if (Sl(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Sl(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = b0(t);
  var n = C0.test(t);
  return n || x0.test(t) ? k0(t.slice(2), n ? 2 : 8) : w0.test(t) ? Fl : +t;
}
var _0 = $0, O0 = ws, ra = W1, Nl = _0, S0 = "Expected a function", F0 = Math.max, N0 = Math.min;
function P0(t, e, n) {
  var r, i, o, a, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(S0);
  e = Nl(e) || 0, O0(n) && (f = !!n.leading, d = "maxWait" in n, o = d ? F0(Nl(n.maxWait) || 0, e) : o, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var k = r, $ = i;
    return r = i = void 0, u = x, a = t.apply($, k), a;
  }
  function g(x) {
    return u = x, l = setTimeout(h, e), f ? b(x) : a;
  }
  function y(x) {
    var k = x - c, $ = x - u, N = e - k;
    return d ? N0(N, o - $) : N;
  }
  function v(x) {
    var k = x - c, $ = x - u;
    return c === void 0 || k >= e || k < 0 || d && $ >= o;
  }
  function h() {
    var x = ra();
    if (v(x))
      return C(x);
    l = setTimeout(h, y(x));
  }
  function C(x) {
    return l = void 0, m && r ? b(x) : (r = i = void 0, a);
  }
  function p() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? a : C(ra());
  }
  function w() {
    var x = ra(), k = v(x);
    if (r = arguments, i = this, c = x, k) {
      if (l === void 0)
        return g(c);
      if (d)
        return clearTimeout(l), l = setTimeout(h, e), b(c);
    }
    return l === void 0 && (l = setTimeout(h, e)), a;
  }
  return w.cancel = p, w.flush = E, w;
}
var $u = P0;
const R0 = /* @__PURE__ */ Ot($u);
var M0 = !!(typeof window < "u" && window.document && window.document.createElement);
const Cs = M0;
var I0 = $u, A0 = ws, T0 = "Expected a function";
function L0(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(T0);
  return A0(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), I0(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var D0 = L0;
const V0 = /* @__PURE__ */ Ot(D0);
var j0 = function(t) {
  di && (mr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), X(function() {
    t == null || t();
  }, []);
};
const B0 = j0;
var W0 = function() {
  var t = kt(Y({}), 2), e = t[1];
  return He(function() {
    return e({});
  }, []);
};
const _u = W0;
function nn(t, e) {
  if (Cs) {
    if (!t)
      return e;
    var n;
    return mr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var Z0 = function(t) {
  return t.every(function(e) {
    var n = nn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, H0 = function(t) {
  return t ? t.getRootNode() : document;
}, z0 = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return Z0(e) ? H0(nn(e[0])) : document;
};
const U0 = z0;
var q0 = function(t) {
  var e = function(n, r, i) {
    var o = D(!1), a = D([]), l = D([]), c = D();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return nn(m);
      });
      if (!o.current) {
        o.current = !0, a.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== a.current.length || !kl(d, a.current) || !kl(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), a.current = d, l.current = r, c.current = n());
    }), mi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), o.current = !1;
    });
  };
  return e;
};
const Ou = q0;
var K0 = Ou(X);
const xs = K0;
function Su(t, e, n) {
  n === void 0 && (n = "click");
  var r = ko(t);
  xs(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = nn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, o = U0(e), a = Array.isArray(n) ? n : [n];
    return a.forEach(function(l) {
      return o.addEventListener(l, i);
    }), function() {
      a.forEach(function(l) {
        return o.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var Fu = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    var n = 1e3, r = 6e4, i = 36e5, o = "millisecond", a = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", g = "date", y = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
      var _ = ["th", "st", "nd", "rd"], I = M % 100;
      return "[" + M + (_[(I - 20) % 10] || _[I] || _[0]) + "]";
    } }, p = function(M, _, I) {
      var F = String(M);
      return !F || F.length >= _ ? M : "" + Array(_ + 1 - F.length).join(I) + M;
    }, E = { s: p, z: function(M) {
      var _ = -M.utcOffset(), I = Math.abs(_), F = Math.floor(I / 60), S = I % 60;
      return (_ <= 0 ? "+" : "-") + p(F, 2, "0") + ":" + p(S, 2, "0");
    }, m: function M(_, I) {
      if (_.date() < I.date())
        return -M(I, _);
      var F = 12 * (I.year() - _.year()) + (I.month() - _.month()), S = _.clone().add(F, d), R = I - S < 0, P = _.clone().add(F + (R ? -1 : 1), d);
      return +(-(F + (I - S) / (R ? S - P : P - S)) || 0);
    }, a: function(M) {
      return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
    }, p: function(M) {
      return { M: d, y: b, w: f, d: u, D: g, h: c, m: l, s: a, ms: o, Q: m }[M] || String(M || "").toLowerCase().replace(/s$/, "");
    }, u: function(M) {
      return M === void 0;
    } }, w = "en", x = {};
    x[w] = C;
    var k = function(M) {
      return M instanceof L;
    }, $ = function M(_, I, F) {
      var S;
      if (!_)
        return w;
      if (typeof _ == "string") {
        var R = _.toLowerCase();
        x[R] && (S = R), I && (x[R] = I, S = R);
        var P = _.split("-");
        if (!S && P.length > 1)
          return M(P[0]);
      } else {
        var A = _.name;
        x[A] = _, S = A;
      }
      return !F && S && (w = S), S || !F && w;
    }, N = function(M, _) {
      if (k(M))
        return M.clone();
      var I = typeof _ == "object" ? _ : {};
      return I.date = M, I.args = arguments, new L(I);
    }, O = E;
    O.l = $, O.i = k, O.w = function(M, _) {
      return N(M, { locale: _.$L, utc: _.$u, x: _.$x, $offset: _.$offset });
    };
    var L = function() {
      function M(I) {
        this.$L = $(I.locale, null, !0), this.parse(I);
      }
      var _ = M.prototype;
      return _.parse = function(I) {
        this.$d = function(F) {
          var S = F.date, R = F.utc;
          if (S === null)
            return /* @__PURE__ */ new Date(NaN);
          if (O.u(S))
            return /* @__PURE__ */ new Date();
          if (S instanceof Date)
            return new Date(S);
          if (typeof S == "string" && !/Z$/i.test(S)) {
            var P = S.match(v);
            if (P) {
              var A = P[2] - 1 || 0, B = (P[7] || "0").substring(0, 3);
              return R ? new Date(Date.UTC(P[1], A, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, B)) : new Date(P[1], A, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, B);
            }
          }
          return new Date(S);
        }(I), this.$x = I.x || {}, this.init();
      }, _.init = function() {
        var I = this.$d;
        this.$y = I.getFullYear(), this.$M = I.getMonth(), this.$D = I.getDate(), this.$W = I.getDay(), this.$H = I.getHours(), this.$m = I.getMinutes(), this.$s = I.getSeconds(), this.$ms = I.getMilliseconds();
      }, _.$utils = function() {
        return O;
      }, _.isValid = function() {
        return this.$d.toString() !== y;
      }, _.isSame = function(I, F) {
        var S = N(I);
        return this.startOf(F) <= S && S <= this.endOf(F);
      }, _.isAfter = function(I, F) {
        return N(I) < this.startOf(F);
      }, _.isBefore = function(I, F) {
        return this.endOf(F) < N(I);
      }, _.$g = function(I, F, S) {
        return O.u(I) ? this[F] : this.set(S, I);
      }, _.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, _.valueOf = function() {
        return this.$d.getTime();
      }, _.startOf = function(I, F) {
        var S = this, R = !!O.u(F) || F, P = O.p(I), A = function(ce, U) {
          var te = O.w(S.$u ? Date.UTC(S.$y, U, ce) : new Date(S.$y, U, ce), S);
          return R ? te : te.endOf(u);
        }, B = function(ce, U) {
          return O.w(S.toDate()[ce].apply(S.toDate("s"), (R ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), S);
        }, H = this.$W, q = this.$M, K = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case b:
            return R ? A(1, 0) : A(31, 11);
          case d:
            return R ? A(1, q) : A(0, q + 1);
          case f:
            var Q = this.$locale().weekStart || 0, ne = (H < Q ? H + 7 : H) - Q;
            return A(R ? K - ne : K + (6 - ne), q);
          case u:
          case g:
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
      }, _.endOf = function(I) {
        return this.startOf(I, !1);
      }, _.$set = function(I, F) {
        var S, R = O.p(I), P = "set" + (this.$u ? "UTC" : ""), A = (S = {}, S[u] = P + "Date", S[g] = P + "Date", S[d] = P + "Month", S[b] = P + "FullYear", S[c] = P + "Hours", S[l] = P + "Minutes", S[a] = P + "Seconds", S[o] = P + "Milliseconds", S)[R], B = R === u ? this.$D + (F - this.$W) : F;
        if (R === d || R === b) {
          var H = this.clone().set(g, 1);
          H.$d[A](B), H.init(), this.$d = H.set(g, Math.min(this.$D, H.daysInMonth())).$d;
        } else
          A && this.$d[A](B);
        return this.init(), this;
      }, _.set = function(I, F) {
        return this.clone().$set(I, F);
      }, _.get = function(I) {
        return this[O.p(I)]();
      }, _.add = function(I, F) {
        var S, R = this;
        I = Number(I);
        var P = O.p(F), A = function(q) {
          var K = N(R);
          return O.w(K.date(K.date() + Math.round(q * I)), R);
        };
        if (P === d)
          return this.set(d, this.$M + I);
        if (P === b)
          return this.set(b, this.$y + I);
        if (P === u)
          return A(1);
        if (P === f)
          return A(7);
        var B = (S = {}, S[l] = r, S[c] = i, S[a] = n, S)[P] || 1, H = this.$d.getTime() + I * B;
        return O.w(H, this);
      }, _.subtract = function(I, F) {
        return this.add(-1 * I, F);
      }, _.format = function(I) {
        var F = this, S = this.$locale();
        if (!this.isValid())
          return S.invalidDate || y;
        var R = I || "YYYY-MM-DDTHH:mm:ssZ", P = O.z(this), A = this.$H, B = this.$m, H = this.$M, q = S.weekdays, K = S.months, G = S.meridiem, Q = function(U, te, ee, xe) {
          return U && (U[te] || U(F, R)) || ee[te].slice(0, xe);
        }, ne = function(U) {
          return O.s(A % 12 || 12, U, "0");
        }, ce = G || function(U, te, ee) {
          var xe = U < 12 ? "AM" : "PM";
          return ee ? xe.toLowerCase() : xe;
        };
        return R.replace(h, function(U, te) {
          return te || function(ee) {
            switch (ee) {
              case "YY":
                return String(F.$y).slice(-2);
              case "YYYY":
                return O.s(F.$y, 4, "0");
              case "M":
                return H + 1;
              case "MM":
                return O.s(H + 1, 2, "0");
              case "MMM":
                return Q(S.monthsShort, H, K, 3);
              case "MMMM":
                return Q(K, H);
              case "D":
                return F.$D;
              case "DD":
                return O.s(F.$D, 2, "0");
              case "d":
                return String(F.$W);
              case "dd":
                return Q(S.weekdaysMin, F.$W, q, 2);
              case "ddd":
                return Q(S.weekdaysShort, F.$W, q, 3);
              case "dddd":
                return q[F.$W];
              case "H":
                return String(A);
              case "HH":
                return O.s(A, 2, "0");
              case "h":
                return ne(1);
              case "hh":
                return ne(2);
              case "a":
                return ce(A, B, !0);
              case "A":
                return ce(A, B, !1);
              case "m":
                return String(B);
              case "mm":
                return O.s(B, 2, "0");
              case "s":
                return String(F.$s);
              case "ss":
                return O.s(F.$s, 2, "0");
              case "SSS":
                return O.s(F.$ms, 3, "0");
              case "Z":
                return P;
            }
            return null;
          }(U) || P.replace(":", "");
        });
      }, _.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, _.diff = function(I, F, S) {
        var R, P = this, A = O.p(F), B = N(I), H = (B.utcOffset() - this.utcOffset()) * r, q = this - B, K = function() {
          return O.m(P, B);
        };
        switch (A) {
          case b:
            R = K() / 12;
            break;
          case d:
            R = K();
            break;
          case m:
            R = K() / 3;
            break;
          case f:
            R = (q - H) / 6048e5;
            break;
          case u:
            R = (q - H) / 864e5;
            break;
          case c:
            R = q / i;
            break;
          case l:
            R = q / r;
            break;
          case a:
            R = q / n;
            break;
          default:
            R = q;
        }
        return S ? R : O.a(R);
      }, _.daysInMonth = function() {
        return this.endOf(d).$D;
      }, _.$locale = function() {
        return x[this.$L];
      }, _.locale = function(I, F) {
        if (!I)
          return this.$L;
        var S = this.clone(), R = $(I, F, !0);
        return R && (S.$L = R), S;
      }, _.clone = function() {
        return O.w(this.$d, this);
      }, _.toDate = function() {
        return new Date(this.valueOf());
      }, _.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, _.toISOString = function() {
        return this.$d.toISOString();
      }, _.toString = function() {
        return this.$d.toUTCString();
      }, M;
    }(), V = L.prototype;
    return N.prototype = V, [["$ms", o], ["$s", a], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", g]].forEach(function(M) {
      V[M[1]] = function(_) {
        return this.$g(_, M[0], M[1]);
      };
    }), N.extend = function(M, _) {
      return M.$i || (M(_, L, N), M.$i = !0), N;
    }, N.locale = $, N.isDayjs = k, N.unix = function(M) {
      return N(1e3 * M);
    }, N.en = x[w], N.Ls = x, N.p = {}, N;
  });
})(Fu);
var Y0 = Fu.exports;
const pe = /* @__PURE__ */ Ot(Y0);
function G0(t, e) {
  var n;
  di && (mr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = ko(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = oe(function() {
    return R0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, bs([], kt(a), !1));
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
function X0(t, e, n) {
  var r = kt(Y({}), 2), i = r[0], o = r[1], a = G0(function() {
    o({});
  }, n).run;
  X(function() {
    return a();
  }, e), Es(t, [i]);
}
function Q0(t) {
  var e = kt(Y(t), 2), n = e[0], r = e[1], i = D(n);
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
  function t(p) {
    try {
      return p.defaultView && p.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var e = function(p) {
    for (var E = p, w = t(E); w; )
      E = w.ownerDocument, w = t(E);
    return E;
  }(window.document), n = [], r = null, i = null;
  function o(p) {
    this.time = p.time, this.target = p.target, this.rootBounds = g(p.rootBounds), this.boundingClientRect = g(p.boundingClientRect), this.intersectionRect = g(p.intersectionRect || b()), this.isIntersecting = !!p.intersectionRect;
    var E = this.boundingClientRect, w = E.width * E.height, x = this.intersectionRect, k = x.width * x.height;
    w ? this.intersectionRatio = Number((k / w).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function a(p, E) {
    var w = E || {};
    if (typeof p != "function")
      throw new Error("callback must be a function");
    if (w.root && w.root.nodeType != 1 && w.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = p, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(w.rootMargin), this.thresholds = this._initThresholds(w.threshold), this.root = w.root || null, this.rootMargin = this._rootMarginValues.map(function(x) {
      return x.value + x.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  a.prototype.THROTTLE_TIMEOUT = 100, a.prototype.POLL_INTERVAL = null, a.prototype.USE_MUTATION_OBSERVER = !0, a._setupCrossOriginUpdater = function() {
    return r || (r = function(p, E) {
      !p || !E ? i = b() : i = y(p, E), n.forEach(function(w) {
        w._checkForIntersections();
      });
    }), r;
  }, a._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, a.prototype.observe = function(p) {
    var E = this._observationTargets.some(function(w) {
      return w.element == p;
    });
    if (!E) {
      if (!(p && p.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: p, entry: null }), this._monitorIntersections(p.ownerDocument), this._checkForIntersections();
    }
  }, a.prototype.unobserve = function(p) {
    this._observationTargets = this._observationTargets.filter(function(E) {
      return E.element != p;
    }), this._unmonitorIntersections(p.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, a.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, a.prototype.takeRecords = function() {
    var p = this._queuedEntries.slice();
    return this._queuedEntries = [], p;
  }, a.prototype._initThresholds = function(p) {
    var E = p || [0];
    return Array.isArray(E) || (E = [E]), E.sort().filter(function(w, x, k) {
      if (typeof w != "number" || isNaN(w) || w < 0 || w > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return w !== k[x - 1];
    });
  }, a.prototype._parseRootMargin = function(p) {
    var E = p || "0px", w = E.split(/\s+/).map(function(x) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(x);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return w[1] = w[1] || w[0], w[2] = w[2] || w[0], w[3] = w[3] || w[1], w;
  }, a.prototype._monitorIntersections = function(p) {
    var E = p.defaultView;
    if (E && this._monitoringDocuments.indexOf(p) == -1) {
      var w = this._checkForIntersections, x = null, k = null;
      this.POLL_INTERVAL ? x = E.setInterval(w, this.POLL_INTERVAL) : (u(E, "resize", w, !0), u(p, "scroll", w, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in E && (k = new E.MutationObserver(w), k.observe(p, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(p), this._monitoringUnsubscribes.push(function() {
        var O = p.defaultView;
        O && (x && O.clearInterval(x), f(O, "resize", w, !0)), f(p, "scroll", w, !0), k && k.disconnect();
      });
      var $ = this.root && (this.root.ownerDocument || this.root) || e;
      if (p != $) {
        var N = t(p);
        N && this._monitorIntersections(N.ownerDocument);
      }
    }
  }, a.prototype._unmonitorIntersections = function(p) {
    var E = this._monitoringDocuments.indexOf(p);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, x = this._observationTargets.some(function(N) {
        var O = N.element.ownerDocument;
        if (O == p)
          return !0;
        for (; O && O != w; ) {
          var L = t(O);
          if (O = L && L.ownerDocument, O == p)
            return !0;
        }
        return !1;
      });
      if (!x) {
        var k = this._monitoringUnsubscribes[E];
        if (this._monitoringDocuments.splice(E, 1), this._monitoringUnsubscribes.splice(E, 1), k(), p != w) {
          var $ = t(p);
          $ && this._unmonitorIntersections($.ownerDocument);
        }
      }
    }
  }, a.prototype._unmonitorAllIntersections = function() {
    var p = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var E = 0; E < p.length; E++)
      p[E]();
  }, a.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var p = this._rootIsInDom(), E = p ? this._getRootRect() : b();
      this._observationTargets.forEach(function(w) {
        var x = w.element, k = m(x), $ = this._rootContainsTarget(x), N = w.entry, O = p && $ && this._computeTargetAndRootIntersection(x, k, E), L = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (L = E) : L = b();
        var V = w.entry = new o({
          time: l(),
          target: x,
          boundingClientRect: k,
          rootBounds: L,
          intersectionRect: O
        });
        N ? p && $ ? this._hasCrossedThreshold(N, V) && this._queuedEntries.push(V) : N && N.isIntersecting && this._queuedEntries.push(V) : this._queuedEntries.push(V);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, a.prototype._computeTargetAndRootIntersection = function(p, E, w) {
    if (window.getComputedStyle(p).display != "none") {
      for (var x = E, k = h(p), $ = !1; !$ && k; ) {
        var N = null, O = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (O.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if ($ = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, N = null, x = null) : N = i : N = w;
          else {
            var L = h(k), V = L && m(L), M = L && this._computeTargetAndRootIntersection(L, V, w);
            V && M ? (k = L, N = y(V, M)) : (k = null, x = null);
          }
        else {
          var _ = k.ownerDocument;
          k != _.body && k != _.documentElement && O.overflow != "visible" && (N = m(k));
        }
        if (N && (x = d(N, x)), !x)
          break;
        k = k && h(k);
      }
      return x;
    }
  }, a.prototype._getRootRect = function() {
    var p;
    if (this.root && !C(this.root))
      p = m(this.root);
    else {
      var E = C(this.root) ? this.root : e, w = E.documentElement, x = E.body;
      p = {
        top: 0,
        left: 0,
        right: w.clientWidth || x.clientWidth,
        width: w.clientWidth || x.clientWidth,
        bottom: w.clientHeight || x.clientHeight,
        height: w.clientHeight || x.clientHeight
      };
    }
    return this._expandRectByRootMargin(p);
  }, a.prototype._expandRectByRootMargin = function(p) {
    var E = this._rootMarginValues.map(function(x, k) {
      return x.unit == "px" ? x.value : x.value * (k % 2 ? p.width : p.height) / 100;
    }), w = {
      top: p.top - E[0],
      right: p.right + E[1],
      bottom: p.bottom + E[2],
      left: p.left - E[3]
    };
    return w.width = w.right - w.left, w.height = w.bottom - w.top, w;
  }, a.prototype._hasCrossedThreshold = function(p, E) {
    var w = p && p.isIntersecting ? p.intersectionRatio || 0 : -1, x = E.isIntersecting ? E.intersectionRatio || 0 : -1;
    if (w !== x)
      for (var k = 0; k < this.thresholds.length; k++) {
        var $ = this.thresholds[k];
        if ($ == w || $ == x || $ < w != $ < x)
          return !0;
      }
  }, a.prototype._rootIsInDom = function() {
    return !this.root || v(e, this.root);
  }, a.prototype._rootContainsTarget = function(p) {
    var E = this.root && (this.root.ownerDocument || this.root) || e;
    return v(E, p) && (!this.root || E == p.ownerDocument);
  }, a.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, a.prototype._unregisterInstance = function() {
    var p = n.indexOf(this);
    p != -1 && n.splice(p, 1);
  };
  function l() {
    return window.performance && performance.now && performance.now();
  }
  function c(p, E) {
    var w = null;
    return function() {
      w || (w = setTimeout(function() {
        p(), w = null;
      }, E));
    };
  }
  function u(p, E, w, x) {
    typeof p.addEventListener == "function" ? p.addEventListener(E, w, x || !1) : typeof p.attachEvent == "function" && p.attachEvent("on" + E, w);
  }
  function f(p, E, w, x) {
    typeof p.removeEventListener == "function" ? p.removeEventListener(E, w, x || !1) : typeof p.detachEvent == "function" && p.detachEvent("on" + E, w);
  }
  function d(p, E) {
    var w = Math.max(p.top, E.top), x = Math.min(p.bottom, E.bottom), k = Math.max(p.left, E.left), $ = Math.min(p.right, E.right), N = $ - k, O = x - w;
    return N >= 0 && O >= 0 && {
      top: w,
      bottom: x,
      left: k,
      right: $,
      width: N,
      height: O
    } || null;
  }
  function m(p) {
    var E;
    try {
      E = p.getBoundingClientRect();
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
  function g(p) {
    return !p || "x" in p ? p : {
      top: p.top,
      y: p.top,
      bottom: p.bottom,
      left: p.left,
      x: p.left,
      right: p.right,
      width: p.width,
      height: p.height
    };
  }
  function y(p, E) {
    var w = E.top - p.top, x = E.left - p.left;
    return {
      top: w,
      left: x,
      height: E.height,
      width: E.width,
      bottom: w + E.height,
      right: x + E.width
    };
  }
  function v(p, E) {
    for (var w = E; w; ) {
      if (w == p)
        return !0;
      w = h(w);
    }
    return !1;
  }
  function h(p) {
    var E = p.parentNode;
    return p.nodeType == /* DOCUMENT */
    9 && p != e ? t(p) : (E && E.assignedSlot && (E = E.assignedSlot.parentNode), E && E.nodeType == 11 && E.host ? E.host : E);
  }
  function C(p) {
    return p && p.nodeType === 9;
  }
  window.IntersectionObserver = a, window.IntersectionObserverEntry = o;
})();
function J0(t, e) {
  var n = kt(Y(), 2), r = n[0], i = n[1], o = kt(Y(), 2), a = o[0], l = o[1];
  return xs(function() {
    var c = nn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = O1(f), g = b.next(); !g.done; g = b.next()) {
            var y = g.value;
            l(y.intersectionRatio), i(y.isIntersecting);
          }
        } catch (v) {
          d = {
            error: v
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
var em = Cs ? gs : X;
const Ne = em;
function tm(t) {
  var e = this, n = D(!1);
  return He(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Se(e, void 0, void 0, function() {
      var o, a;
      return _1(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, bs([], kt(r), !1))];
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
function nm(t) {
  var e = D(0), n = kt(Y(t), 2), r = n[0], i = n[1], o = He(function(a) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(a);
    });
  }, []);
  return mi(function() {
    cancelAnimationFrame(e.current);
  }), [r, o];
}
var rm = function() {
  var t = D(!1);
  return X(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const ks = rm;
var Nu = function() {
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
}(), im = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(no) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), om = 2;
function am(t, e) {
  var n = !1, r = !1, i = 0;
  function o() {
    n && (n = !1, t()), r && l();
  }
  function a() {
    im(o);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < om)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(a, e);
    i = c;
  }
  return l;
}
var sm = 20, lm = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], cm = typeof MutationObserver < "u", um = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = am(this.refresh.bind(this), sm);
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
      !Sa || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), cm ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !Sa || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = lm.some(function(o) {
        return !!~r.indexOf(o);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), Pu = function(t, e) {
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
}, Ru = $o(0, 0, 0, 0);
function ro(t) {
  return parseFloat(t) || 0;
}
function Pl(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var o = t["border-" + i + "-width"];
    return r + ro(o);
  }, 0);
}
function fm(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var o = i[r], a = t["padding-" + o];
    n[o] = ro(a);
  }
  return n;
}
function dm(t) {
  var e = t.getBBox();
  return $o(0, 0, e.width, e.height);
}
function mm(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return Ru;
  var r = nr(t).getComputedStyle(t), i = fm(r), o = i.left + i.right, a = i.top + i.bottom, l = ro(r.width), c = ro(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + o) !== e && (l -= Pl(r, "left", "right") + o), Math.round(c + a) !== n && (c -= Pl(r, "top", "bottom") + a)), !vm(t)) {
    var u = Math.round(l + o) - e, f = Math.round(c + a) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return $o(i.left, i.top, l, c);
}
var hm = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof nr(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof nr(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function vm(t) {
  return t === nr(t).document.documentElement;
}
function pm(t) {
  return Sa ? hm(t) ? dm(t) : mm(t) : Ru;
}
function gm(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, o = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, a = Object.create(o.prototype);
  return Pu(a, {
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
var ym = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = $o(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = pm(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), bm = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = gm(n);
      Pu(this, { target: e, contentRect: r });
    }
    return t;
  }()
), Em = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Nu(), typeof e != "function")
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
        n.has(e) || (n.set(e, new ym(e)), this.controller_.addObserver(this), this.controller_.refresh());
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
          return new bm(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), Mu = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Nu(), Iu = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = um.getInstance(), r = new Em(e, n, this);
      Mu.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  Iu.prototype[t] = function() {
    var e;
    return (e = Mu.get(this))[t].apply(e, arguments);
  };
});
var wm = function() {
  return typeof no.ResizeObserver < "u" ? no.ResizeObserver : Iu;
}(), Cm = Ou(gs);
const xm = Cm;
var km = Cs ? xm : xs;
const $m = km;
function Fa(t) {
  var e = kt(nm(function() {
    var i = nn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return $m(function() {
    var i = nn(t);
    if (i) {
      var o = new wm(function(a) {
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
  var r = ko(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, o = oe(function() {
    return V0(function() {
      for (var a = [], l = 0; l < arguments.length; l++)
        a[l] = arguments[l];
      return r.current.apply(r, bs([], kt(a), !1));
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
var _m = function(t, e) {
  var n = jt(t), r = D(null), i = He(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return X(function() {
    if (!(!P1(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const Om = _m, Rl = 10;
function Sm(t, e) {
  return t > e && t > Rl ? "horizontal" : e > t && e > Rl ? "vertical" : "";
}
function Fm() {
  const t = D(0), e = D(0), n = D(0), r = D(0), i = D(0), o = D(0), a = D(""), l = () => a.current === "vertical", c = () => a.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, o.current = 0, a.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), o.current = Math.abs(r.current), a.current || (a.current = Sm(i.current, o.current));
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
const Nm = fr ? window : void 0, Pm = ["scroll", "auto", "overlay"];
function Rm(t) {
  return t.nodeType === 1;
}
function io(t, e = Nm) {
  let n = t;
  for (; n && n !== e && Rm(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Pm.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Nn = !1;
if (fr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Nn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let $r = 0;
const Ml = "adm-overflow-hidden";
function Mm(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Oo(t, e) {
  const n = Fm(), r = (a) => {
    n.move(a);
    const l = n.deltaY.current > 0 ? "10" : "01", c = io(a.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const g = Mm(a.target);
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
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(l, 2)) && a.cancelable && Nn && a.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Nn ? {
      passive: !1
    } : !1), $r || document.body.classList.add(Ml), $r++;
  }, o = () => {
    $r && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), $r--, $r || document.body.classList.remove(Ml));
  };
  X(() => {
    if (e)
      return i(), () => {
        o();
      };
  }, [e]);
}
let $s = vi();
const J = (t) => hi(t, $s);
let _s = vi();
J.write = (t) => hi(t, _s);
let So = vi();
J.onStart = (t) => hi(t, So);
let Os = vi();
J.onFrame = (t) => hi(t, Os);
let Ss = vi();
J.onFinish = (t) => hi(t, Ss);
let Qn = [];
J.setTimeout = (t, e) => {
  let n = J.now() + e, r = () => {
    let o = Qn.findIndex((a) => a.cancel == r);
    ~o && Qn.splice(o, 1), Qt -= ~o ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return Qn.splice(Au(n), 0, i), Qt += 1, Tu(), i;
};
let Au = (t) => ~(~Qn.findIndex((e) => e.time > t) || ~Qn.length);
J.cancel = (t) => {
  So.delete(t), Os.delete(t), Ss.delete(t), $s.delete(t), _s.delete(t);
};
J.sync = (t) => {
  Na = !0, J.batchedUpdates(t), Na = !1;
};
J.throttle = (t) => {
  let e;
  function n() {
    try {
      t(...e);
    } finally {
      e = null;
    }
  }
  function r(...i) {
    e = i, J.onStart(n);
  }
  return r.handler = t, r.cancel = () => {
    So.delete(n), e = null;
  }, r;
};
let Fs = typeof window < "u" ? window.requestAnimationFrame : () => {
};
J.use = (t) => Fs = t;
J.now = typeof performance < "u" ? () => performance.now() : Date.now;
J.batchedUpdates = (t) => t();
J.catch = console.error;
J.frameLoop = "always";
J.advance = () => {
  J.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Du();
};
let Xt = -1, Qt = 0, Na = !1;
function hi(t, e) {
  Na ? (e.delete(t), t(0)) : (e.add(t), Tu());
}
function Tu() {
  Xt < 0 && (Xt = 0, J.frameLoop !== "demand" && Fs(Lu));
}
function Im() {
  Xt = -1;
}
function Lu() {
  ~Xt && (Fs(Lu), J.batchedUpdates(Du));
}
function Du() {
  let t = Xt;
  Xt = J.now();
  let e = Au(Xt);
  if (e && (Vu(Qn.splice(0, e), (n) => n.handler()), Qt -= e), !Qt) {
    Im();
    return;
  }
  So.flush(), $s.flush(t ? Math.min(64, Xt - t) : 16.667), Os.flush(), _s.flush(), Ss.flush();
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
      e.size && (t = /* @__PURE__ */ new Set(), Qt -= e.size, Vu(e, (r) => r(n) && t.add(r)), Qt += t.size, e = t);
    }
  };
}
function Vu(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      J.catch(r);
    }
  });
}
function Pa() {
}
const Am = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), Z = {
  arr: Array.isArray,
  obj: (t) => !!t && t.constructor.name === "Object",
  fun: (t) => typeof t == "function",
  str: (t) => typeof t == "string",
  num: (t) => typeof t == "number",
  und: (t) => t === void 0
};
function It(t, e) {
  if (Z.arr(t)) {
    if (!Z.arr(e) || t.length !== e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  return t === e;
}
const ie = (t, e) => t.forEach(e);
function $t(t, e, n) {
  if (Z.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const Ge = (t) => Z.und(t) ? [] : Z.arr(t) ? t : [t];
function Hr(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), ie(n, e);
  }
}
const Br = (t, ...e) => Hr(t, (n) => n(...e)), Ns = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Ps, ju, tn = null, Bu = !1, Rs = Pa;
const Tm = (t) => {
  t.to && (ju = t.to), t.now && (J.now = t.now), t.colors !== void 0 && (tn = t.colors), t.skipAnimation != null && (Bu = t.skipAnimation), t.createStringInterpolator && (Ps = t.createStringInterpolator), t.requestAnimationFrame && J.use(t.requestAnimationFrame), t.batchedUpdates && (J.batchedUpdates = t.batchedUpdates), t.willAdvance && (Rs = t.willAdvance), t.frameLoop && (J.frameLoop = t.frameLoop);
};
var st = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Ps;
  },
  get to() {
    return ju;
  },
  get colors() {
    return tn;
  },
  get skipAnimation() {
    return Bu;
  },
  get willAdvance() {
    return Rs;
  },
  assign: Tm
});
const zr = /* @__PURE__ */ new Set();
let at = [], ia = [], oo = 0;
const Fo = {
  get idle() {
    return !zr.size && !at.length;
  },
  start(t) {
    oo > t.priority ? (zr.add(t), J.onStart(Lm)) : (Wu(t), J(Ra));
  },
  advance: Ra,
  sort(t) {
    if (oo)
      J.onFrame(() => Fo.sort(t));
    else {
      const e = at.indexOf(t);
      ~e && (at.splice(e, 1), Zu(t));
    }
  },
  clear() {
    at = [], zr.clear();
  }
};
function Lm() {
  zr.forEach(Wu), zr.clear(), J(Ra);
}
function Wu(t) {
  at.includes(t) || Zu(t);
}
function Zu(t) {
  at.splice(Dm(at, (e) => e.priority > t.priority), 0, t);
}
function Ra(t) {
  const e = ia;
  for (let n = 0; n < at.length; n++) {
    const r = at[n];
    oo = r.priority, r.idle || (Rs(r), r.advance(t), r.idle || e.push(r));
  }
  return oo = 0, ia = at, ia.length = 0, at = e, at.length > 0;
}
function Dm(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Vm = (t, e, n) => Math.min(Math.max(n, t), e), jm = {
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
const Bm = new RegExp("rgb" + No(ht, ht, ht)), Wm = new RegExp("rgba" + No(ht, ht, ht, ht)), Zm = new RegExp("hsl" + No(ht, ao, ao)), Hm = new RegExp("hsla" + No(ht, ao, ao, ht)), zm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Um = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, qm = /^#([0-9a-fA-F]{6})$/, Km = /^#([0-9a-fA-F]{8})$/;
function Ym(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = qm.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : tn && tn[t] !== void 0 ? tn[t] : (e = Bm.exec(t)) ? (Ln(e[1]) << 24 | Ln(e[2]) << 16 | Ln(e[3]) << 8 | 255) >>> 0 : (e = Wm.exec(t)) ? (Ln(e[1]) << 24 | Ln(e[2]) << 16 | Ln(e[3]) << 8 | Tl(e[4])) >>> 0 : (e = zm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = Km.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = Um.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Zm.exec(t)) ? (Il(Al(e[1]), Fi(e[2]), Fi(e[3])) | 255) >>> 0 : (e = Hm.exec(t)) ? (Il(Al(e[1]), Fi(e[2]), Fi(e[3])) | Tl(e[4])) >>> 0 : null;
}
function oa(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Il(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, o = oa(i, r, t + 1 / 3), a = oa(i, r, t), l = oa(i, r, t - 1 / 3);
  return Math.round(o * 255) << 24 | Math.round(a * 255) << 16 | Math.round(l * 255) << 8;
}
function Ln(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function Al(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Tl(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function Fi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Ll(t) {
  let e = Ym(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, o = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${o})`;
}
const Xr = (t, e, n) => {
  if (Z.fun(t))
    return t;
  if (Z.arr(t))
    return Xr({
      range: t,
      output: e,
      extrapolate: n
    });
  if (Z.str(t.output[0]))
    return Ps(t);
  const r = t, i = r.output, o = r.range || [0, 1], a = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Xm(u, o);
    return Gm(u, o[f], o[f + 1], i[f], i[f + 1], c, a, l, r.map);
  };
};
function Gm(t, e, n, r, i, o, a, l, c) {
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
function Xm(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Qm = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Vm(0, 1, i / t);
}, so = 1.70158, Ni = so * 1.525, Dl = so + 1, Vl = 2 * Math.PI / 3, jl = 2 * Math.PI / 4.5, Pi = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Jm = {
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
  easeInBack: (t) => Dl * t * t * t - so * t * t,
  easeOutBack: (t) => 1 + Dl * Math.pow(t - 1, 3) + so * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Ni + 1) * 2 * t - Ni) / 2 : (Math.pow(2 * t - 2, 2) * ((Ni + 1) * (t * 2 - 2) + Ni) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Vl),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Vl) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * jl)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * jl) / 2 + 1,
  easeInBounce: (t) => 1 - Pi(1 - t),
  easeOutBounce: Pi,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Pi(1 - 2 * t)) / 2 : (1 + Pi(2 * t - 1)) / 2,
  steps: Qm
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
const rr = Symbol.for("FluidValue.get"), Pn = Symbol.for("FluidValue.observers"), it = (t) => !!(t && t[rr]), We = (t) => t && t[rr] ? t[rr]() : t, Bl = (t) => t[Pn] || null;
function eh(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function Qr(t, e) {
  let n = t[Pn];
  n && n.forEach((r) => {
    eh(r, e);
  });
}
class Hu {
  constructor(e) {
    if (this[rr] = void 0, this[Pn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    th(this, e);
  }
}
const th = (t, e) => zu(t, rr, e);
function hr(t, e) {
  if (t[rr]) {
    let n = t[Pn];
    n || zu(t, Pn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function Jr(t, e) {
  let n = t[Pn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Pn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const zu = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), qi = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, nh = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, Wl = new RegExp(`(${qi.source})(%|[a-z]+)`, "i"), rh = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Po = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Uu = (t) => {
  const [e, n] = ih(t);
  if (!e || Ns())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Po.test(n))
      return Uu(n);
    if (n)
      return n;
  }
  return t;
}, ih = (t) => {
  const e = Po.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let aa;
const oh = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, qu = (t) => {
  aa || (aa = tn ? new RegExp(`(${Object.keys(tn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((o) => We(o).replace(Po, Uu).replace(nh, Ll).replace(aa, Ll)), n = e.map((o) => o.match(qi).map(Number)), i = n[0].map((o, a) => n.map((l) => {
    if (!(a in l))
      throw Error('The arity of each "output" value must be equal');
    return l[a];
  })).map((o) => Xr(Ma({}, t, {
    output: o
  })));
  return (o) => {
    var a;
    const l = !Wl.test(e[0]) && ((a = e.find((u) => Wl.test(u))) == null ? void 0 : a.replace(qi, ""));
    let c = 0;
    return e[0].replace(qi, () => `${i[c++](o)}${l || ""}`).replace(rh, oh);
  };
}, Ms = "react-spring: ", Ku = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${Ms}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, ah = Ku(console.warn);
function sh() {
  ah(`${Ms}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const lh = Ku(console.warn);
function ch() {
  lh(`${Ms}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Ro(t) {
  return Z.str(t) && (t[0] == "#" || /\d/.test(t) || !Ns() && Po.test(t) || t in (tn || {}));
}
const Is = Ns() ? X : gs, uh = () => {
  const t = D(!1);
  return Is(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function Yu() {
  const t = Y()[1], e = uh();
  return () => {
    e.current && t(Math.random());
  };
}
function fh(t, e) {
  const [n] = Y(() => ({
    inputs: e,
    result: t()
  })), r = D(), i = r.current;
  let o = i;
  return o ? e && o.inputs && dh(e, o.inputs) || (o = {
    inputs: e,
    result: t()
  }) : o = n, X(() => {
    r.current = o, i == n && (n.inputs = n.result = void 0);
  }, [o]), o.result;
}
function dh(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const Gu = (t) => X(t, mh), mh = [];
function Zl(t) {
  const e = D();
  return X(() => {
    e.current = t;
  }), e.current;
}
const ei = Symbol.for("Animated:node"), hh = (t) => !!t && t[ei] === t, Ct = (t) => t && t[ei], As = (t, e) => Am(t, ei, e), Mo = (t) => t && t[ei] && t[ei].getPayload();
class Xu {
  constructor() {
    this.payload = void 0, As(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class vr extends Xu {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, Z.num(this._value) && (this.lastPosition = this._value);
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
    return Z.num(e) && (this.lastPosition = e, n && (e = Math.round(e / n) * n, this.done && (this.lastPosition = e))), this._value === e ? !1 : (this._value = e, !0);
  }
  reset() {
    const {
      done: e
    } = this;
    this.done = !1, Z.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, e && (this.lastVelocity = null), this.v0 = null);
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
    if (Z.str(e)) {
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
class Io extends Xu {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return $t(this.source, (r, i) => {
      hh(r) ? n[i] = r.getValue(e) : it(r) ? n[i] = We(r) : e || (n[i] = r);
    }), n;
  }
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && ie(this.payload, (e) => e.reset());
  }
  _makePayload(e) {
    if (e) {
      const n = /* @__PURE__ */ new Set();
      return $t(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    lo.dependencies && it(e) && lo.dependencies.add(e);
    const n = Mo(e);
    n && ie(n, (r) => this.add(r));
  }
}
class Ts extends Io {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new Ts(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(vh)), !0);
  }
}
function vh(t) {
  return (Ro(t) ? ir : vr).create(t);
}
function Ia(t) {
  const e = Ct(t);
  return e ? e.constructor : Z.arr(t) ? Ts : Ro(t) ? ir : vr;
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
const Hl = (t, e) => {
  const n = !Z.fun(t) || t.prototype && t.prototype.isReactComponent;
  return ve((r, i) => {
    const o = D(null), a = n && He((g) => {
      o.current = yh(i, g);
    }, [i]), [l, c] = gh(r, e), u = Yu(), f = () => {
      const g = o.current;
      if (n && !g)
        return;
      (g ? e.applyAnimatedValues(g, l.getValue(!0)) : !1) === !1 && u();
    }, d = new ph(f, c), m = D();
    Is(() => (m.current = d, ie(c, (g) => hr(g, d)), () => {
      m.current && (ie(m.current.deps, (g) => Jr(g, m.current)), J.cancel(m.current.update));
    })), X(f, []), Gu(() => () => {
      const g = m.current;
      ie(g.deps, (y) => Jr(y, g));
    });
    const b = e.getComponentProps(l.getValue());
    return T.createElement(t, co({}, b, {
      ref: a
    }));
  });
};
class ph {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && J.write(this.update);
  }
}
function gh(t, e) {
  const n = /* @__PURE__ */ new Set();
  return lo.dependencies = n, t.style && (t = co({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new Io(t), lo.dependencies = null, [t, n];
}
function yh(t, e) {
  return t && (Z.fun(t) ? t(e) : t.current = e), e;
}
const zl = Symbol.for("AnimatedComponent"), bh = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new Io(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, o = (a) => {
    const l = Ul(a) || "Anonymous";
    return Z.str(a) ? a = o[a] || (o[a] = Hl(a, i)) : a = a[zl] || (a[zl] = Hl(a, i)), a.displayName = `Animated(${l})`, a;
  };
  return $t(t, (a, l) => {
    Z.arr(t) && (l = Ul(a)), o[l] = o(a);
  }), {
    animated: o
  };
}, Ul = (t) => Z.str(t) ? t : t && Z.str(t.displayName) ? t.displayName : Z.fun(t) && t.name || null;
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
function xn(t, ...e) {
  return Z.fun(t) ? t(...e) : t;
}
const Ur = (t, e) => t === !0 || !!(e && t && (Z.fun(t) ? t(e) : Ge(t).includes(e))), Qu = (t, e) => Z.obj(t) ? e && t[e] : t, Ju = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, Eh = (t) => t, Ls = (t, e = Eh) => {
  let n = wh;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const o = e(t[i], i);
    Z.und(o) || (r[i] = o);
  }
  return r;
}, wh = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], Ch = {
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
function xh(t) {
  const e = {};
  let n = 0;
  if ($t(t, (r, i) => {
    Ch[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function ef(t) {
  const e = xh(t);
  if (e) {
    const n = {
      to: e
    };
    return $t(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Re({}, t);
}
function ti(t) {
  return t = We(t), Z.arr(t) ? t.map(ti) : Ro(t) ? st.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function kh(t) {
  for (const e in t)
    return !0;
  return !1;
}
function Aa(t) {
  return Z.fun(t) || Z.arr(t) && Z.obj(t[0]);
}
function $h(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function _h(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const Oh = {
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
}, Ta = Re({}, Oh.default, {
  mass: 1,
  damping: 1,
  easing: Jm.linear,
  clamp: !1
});
class Sh {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, Ta);
  }
}
function Fh(t, e, n) {
  n && (n = Re({}, n), ql(n, e), e = Re({}, n, e)), ql(t, e), Object.assign(t, e);
  for (const a in Ta)
    t[a] == null && (t[a] = Ta[a]);
  let {
    mass: r,
    frequency: i,
    damping: o
  } = t;
  return Z.und(i) || (i < 0.01 && (i = 0.01), o < 0 && (o = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * o * r / i), t;
}
function ql(t, e) {
  if (!Z.und(e.decay))
    t.duration = void 0;
  else {
    const n = !Z.und(e.tension) || !Z.und(e.friction);
    (n || !Z.und(e.frequency) || !Z.und(e.damping) || !Z.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const Kl = [];
class Nh {
  constructor() {
    this.changed = !1, this.values = Kl, this.toValues = null, this.fromValues = Kl, this.to = void 0, this.from = void 0, this.config = new Sh(), this.immediate = !1;
  }
}
function tf(t, {
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
      Z.und(n.pause) || (i.paused = Ur(n.pause, e));
      let y = r == null ? void 0 : r.pause;
      y !== !0 && (y = i.paused || Ur(y, e)), u = xn(n.delay || 0, e), y ? (i.resumeQueue.add(b), o.pause()) : (o.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - J.now();
    }
    function b() {
      u > 0 && !st.skipAnimation ? (i.delayed = !0, f = J.setTimeout(g, u), i.pauseQueue.add(m), i.timeouts.add(f)) : g();
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
const Ds = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? Jn(t.get()) : e.every((n) => n.noop) ? nf(t.get()) : dt(t.get(), e.every((n) => n.finished)), nf = (t) => ({
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
function rf(t, e, n, r) {
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
    const u = Ls(e, (v, h) => h === "onRest" ? void 0 : v);
    let f, d;
    const m = new Promise((v, h) => (f = v, d = h)), b = (v) => {
      const h = i <= (n.cancelId || 0) && Jn(r) || i !== n.asyncId && dt(r, !1);
      if (h)
        throw v.result = h, d(v), v;
    }, g = (v, h) => {
      const C = new Yl(), p = new Gl();
      return (async () => {
        if (st.skipAnimation)
          throw ni(n), p.result = dt(r, !1), d(p), p;
        b(C);
        const E = Z.obj(v) ? Re({}, v) : Re({}, h, {
          to: v
        });
        E.parentId = i, $t(u, (x, k) => {
          Z.und(E[k]) && (E[k] = x);
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
      let v;
      Z.arr(t) ? v = (async (h) => {
        for (const C of h)
          await g(C);
      })(t) : v = Promise.resolve(t(g, r.stop.bind(r))), await Promise.all([v.then(f), m]), y = dt(r.get(), !0, !1);
    } catch (v) {
      if (v instanceof Yl)
        y = v.result;
      else if (v instanceof Gl)
        y = v.result;
      else
        throw v;
    } finally {
      i == n.asyncId && (n.asyncId = o, n.asyncTo = o ? l : void 0, n.promise = o ? c : void 0);
    }
    return Z.fun(a) && J.batchedUpdates(() => {
      a(y, r, r.item);
    }), y;
  })();
}
function ni(t, e) {
  Hr(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class Yl extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class Gl extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const La = (t) => t instanceof Vs;
let Ph = 1;
class Vs extends Hu {
  constructor(...e) {
    super(...e), this.id = Ph++, this.key = void 0, this._priority = 0;
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
    return sh(), st.to(this, e);
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
const Rn = Symbol.for("SpringPhase"), of = 1, Da = 2, Va = 4, sa = (t) => (t[Rn] & of) > 0, Wt = (t) => (t[Rn] & Da) > 0, _r = (t) => (t[Rn] & Va) > 0, Xl = (t, e) => e ? t[Rn] |= Da | of : t[Rn] &= ~Da, Ql = (t, e) => e ? t[Rn] |= Va : t[Rn] &= ~Va;
class Rh extends Vs {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new Nh(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !Z.und(e) || !Z.und(n)) {
      const r = Z.obj(e) ? Re({}, e) : Re({}, n, {
        from: e
      });
      Z.und(r.default) && (r.default = !0), this.start(r);
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
    !l && it(i.to) && (a = Ge(We(i.to))), i.values.forEach((f, d) => {
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
        const v = i.fromValues[d], h = f.v0 != null ? f.v0 : f.v0 = Z.arr(o.velocity) ? o.velocity[d] : o.velocity;
        let C;
        const p = o.precision || (v == m ? 5e-3 : Math.min(1, Math.abs(m - v) * 1e-3));
        if (Z.und(o.duration))
          if (o.decay) {
            const E = o.decay === !0 ? 0.998 : o.decay, w = Math.exp(-(1 - E) * y);
            g = v + h / (1 - E) * (1 - w), b = Math.abs(f.lastPosition - g) <= p, C = h * w;
          } else {
            C = f.lastVelocity == null ? h : f.lastVelocity;
            const E = o.restVelocity || p / 10, w = o.clamp ? 0 : o.bounce, x = !Z.und(w), k = v == m ? f.v0 > 0 : v < m;
            let $, N = !1;
            const O = 1, L = Math.ceil(e / O);
            for (let V = 0; V < L && ($ = Math.abs(C) > E, !(!$ && (b = Math.abs(m - g) <= p, b))); ++V) {
              x && (N = g == m || g > m == k, N && (C = -C * w, g = m));
              const M = -o.tension * 1e-6 * (g - m), _ = -o.friction * 1e-3 * C, I = (M + _) / o.mass;
              C = C + I * O, g = g + C * O;
            }
          }
        else {
          let E = 1;
          o.duration > 0 && (this._memoizedDuration !== o.duration && (this._memoizedDuration = o.duration, f.durationProgress > 0 && (f.elapsedTime = o.duration * f.durationProgress, y = f.elapsedTime += e)), E = (o.progress || 0) + y / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), g = v + o.easing(E) * (m - v), C = (g - f.lastPosition) / e, b = E == 1;
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
    return J.batchedUpdates(() => {
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
      J.batchedUpdates(() => {
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
    return Z.und(e) ? (r = this.queue || [], this.queue = []) : r = [Z.obj(e) ? e : Re({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Ds(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), ni(this._state, e && this._lastCallId), J.batchedUpdates(() => this._stop(n, e)), this;
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
    r = Z.obj(r) ? r[n] : r, (r == null || Aa(r)) && (r = void 0), i = Z.obj(i) ? i[n] : i, i == null && (i = void 0);
    const o = {
      to: r,
      from: i
    };
    return sa(this) || (e.reverse && ([r, i] = [i, r]), i = We(i), Z.und(i) ? Ct(this) || this._set(r) : this._set(i)), o;
  }
  _update(e, n) {
    let r = Re({}, e);
    const {
      key: i,
      defaultProps: o
    } = this;
    r.default && Object.assign(o, Ls(r, (c, u) => /^on/.test(u) ? Qu(c, i) : c)), ec(this, r, "onProps"), Sr(this, "onProps", r, this);
    const a = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return tf(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: o,
      state: l,
      actions: {
        pause: () => {
          _r(this) || (Ql(this, !0), Br(l.pauseQueue), Sr(this, "onPause", dt(this, Or(this, this.animation.to)), this));
        },
        resume: () => {
          _r(this) && (Ql(this, !1), Wt(this) && this._resume(), Br(l.resumeQueue), Sr(this, "onResume", dt(this, Or(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, a)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = af(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Jn(this));
    const i = !Z.und(e.to), o = !Z.und(e.from);
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
    o && !i && (!n.default || Z.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const b = !It(m, f);
    b && (c.from = m), m = We(m);
    const g = !It(d, u);
    g && this._focus(d);
    const y = Aa(n.to), {
      config: v
    } = c, {
      decay: h,
      velocity: C
    } = v;
    (i || o) && (v.velocity = 0), n.config && !y && Fh(v, xn(n.config, a), n.config !== l.config ? xn(l.config, a) : void 0);
    let p = Ct(this);
    if (!p || Z.und(d))
      return r(dt(this, !0));
    const E = Z.und(n.reset) ? o && !n.default : !Z.und(m) && Ur(n.reset, a), w = E ? m : this.get(), x = ti(d), k = Z.num(x) || Z.arr(x) || Ro(x), $ = !y && (!k || Ur(l.immediate || n.immediate, a));
    if (g) {
      const V = Ia(d);
      if (V !== p.constructor)
        if ($)
          p = this._set(x);
        else
          throw Error(`Cannot animate between ${p.constructor.name} and ${V.name}, as the "to" prop suggests`);
    }
    const N = p.constructor;
    let O = it(d), L = !1;
    if (!O) {
      const V = E || !sa(this) && b;
      (g || V) && (L = It(ti(w), x), O = !L), (!It(c.immediate, $) && !$ || !It(v.decay, h) || !It(v.velocity, C)) && (O = !0);
    }
    if (L && Wt(this) && (c.changed && !E ? O = !0 : O || this._stop(u)), !y && ((O || it(u)) && (c.values = p.getPayload(), c.toValues = it(d) ? null : N == ir ? [1] : Ge(x)), c.immediate != $ && (c.immediate = $, !$ && !E && this._set(u)), O)) {
      const {
        onRest: V
      } = c;
      ie(Ih, (_) => ec(this, n, _));
      const M = dt(this, Or(this, u));
      Br(this._pendingCalls, M), this._pendingCalls.add(r), c.changed && J.batchedUpdates(() => {
        c.changed = !E, V == null || V(M, this), E ? xn(l.onRest, M) : c.onStart == null || c.onStart(M, this);
      });
    }
    E && this._set(w), y ? r(rf(n.to, n, this._state, this)) : O ? this._start() : Wt(this) && !g ? this._pendingCalls.add(r) : r(nf(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (Bl(this) && this._detach(), n.to = e, Bl(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    it(n) && (hr(n, this), La(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    it(e) && Jr(e, this);
  }
  _set(e, n = !0) {
    const r = We(e);
    if (!Z.und(r)) {
      const i = Ct(this);
      if (!i || !It(r, i.getValue())) {
        const o = Ia(r);
        !i || i.constructor != o ? As(this, o.create(r)) : i.setValue(r), i && J.batchedUpdates(() => {
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
    n || (this._onStart(), xn(this.animation.onChange, e, this)), xn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    Ct(this).reset(We(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Wt(this) || (Xl(this, !0), _r(this) || this._resume());
  }
  _resume() {
    st.skipAnimation ? this.finish() : Fo.start(this);
  }
  _stop(e, n) {
    if (Wt(this)) {
      Xl(this, !1);
      const r = this.animation;
      ie(r.values, (o) => {
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
function af(t, e = t.loop, n = t.to) {
  let r = xn(e);
  if (r) {
    const i = r !== !0 && ef(r), o = (i || t).reverse, a = !i || i.reset;
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
  } = t = ef(t), r = /* @__PURE__ */ new Set();
  return Z.obj(e) && Jl(e, r), Z.obj(n) && Jl(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function Mh(t) {
  const e = ri(t);
  return Z.und(e.default) && (e.default = Ls(e)), e;
}
function Jl(t, e) {
  $t(t, (n, r) => n != null && e.add(r));
}
const Ih = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function ec(t, e, n) {
  t.animation[n] = e[n] !== Ju(e, n) ? Qu(e[n], t.key) : void 0;
}
function Sr(t, e, ...n) {
  var r, i, o, a;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (o = (a = t.defaultProps)[e]) == null || o.call(a, ...n);
}
const Ah = ["onStart", "onChange", "onRest"];
let Th = 1, Lh = class {
  constructor(e, n) {
    this.id = Th++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
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
      Z.und(r) || this.springs[n].set(r);
    }
  }
  update(e) {
    return e && this.queue.push(ri(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = Ge(e).map(ri) : this.queue = [], this._flush ? this._flush(this, n) : (ff(this, n), ja(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      ie(Ge(n), (i) => r[i].stop(!!e));
    } else
      ni(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (Z.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      ie(Ge(e), (r) => n[r].pause());
    }
    return this;
  }
  resume(e) {
    if (Z.und(e))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      ie(Ge(e), (r) => n[r].resume());
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
    J.onFrame(this._onFrame);
  }
};
function ja(t, e) {
  return Promise.all(e.map((n) => sf(t, n))).then((n) => Ds(t, n));
}
async function sf(t, e, n) {
  const {
    keys: r,
    to: i,
    from: o,
    loop: a,
    onRest: l,
    onResolve: c
  } = e, u = Z.obj(e.default) && e.default;
  a && (e.loop = !1), i === !1 && (e.to = null), o === !1 && (e.from = null);
  const f = Z.arr(i) || Z.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : ie(Ah, (y) => {
    const v = e[y];
    if (Z.fun(v)) {
      const h = t._events[y];
      e[y] = ({
        finished: C,
        cancelled: p
      }) => {
        const E = h.get(v);
        E ? (C || (E.finished = !1), p && (E.cancelled = !0)) : h.set(v, {
          value: null,
          finished: C || !1,
          cancelled: p || !1
        });
      }, u && (u[y] = e[y]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, Br(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((y) => t.springs[y].start(e)), b = e.cancel === !0 || Ju(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(tf(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: Pa,
      resume: Pa,
      start(y, v) {
        b ? (ni(d, t._lastAsyncId), v(Jn(t))) : (y.onRest = l, v(rf(f, y, d, t)));
      }
    }
  })), d.paused && await new Promise((y) => {
    d.resumeQueue.add(y);
  });
  const g = Ds(t, await Promise.all(m));
  if (a && g.finished && !(n && g.noop)) {
    const y = af(e, a, i);
    if (y)
      return ff(t, [y]), sf(t, y, !0);
  }
  return c && J.batchedUpdates(() => c(g, t, t.item)), g;
}
function tc(t, e) {
  const n = Re({}, t.springs);
  return e && ie(Ge(e), (r) => {
    Z.und(r.keys) && (r = ri(r)), Z.obj(r.to) || (r = Re({}, r, {
      to: void 0
    })), uf(n, r, (i) => cf(i));
  }), lf(t, n), n;
}
function lf(t, e) {
  $t(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, hr(n, t));
  });
}
function cf(t, e) {
  const n = new Rh();
  return n.key = t, e && hr(n, e), n;
}
function uf(t, e, n) {
  e.keys && ie(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function ff(t, e) {
  ie(e, (n) => {
    uf(t.springs, n, (r) => cf(r, t));
  });
}
function Dh(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Vh = ["children"], Ao = (t) => {
  let {
    children: e
  } = t, n = Dh(t, Vh);
  const r = Qe(uo), i = n.pause || !!r.pause, o = n.immediate || !!r.immediate;
  n = fh(() => ({
    pause: i,
    immediate: o
  }), [i, o]);
  const {
    Provider: a
  } = uo;
  return T.createElement(a, {
    value: n
  }, e);
}, uo = jh(Ao, {});
Ao.Provider = uo.Provider;
Ao.Consumer = uo.Consumer;
function jh(t, e) {
  return Object.assign(t, T.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const Bh = () => {
  const t = [], e = function(i) {
    ch();
    const o = [];
    return ie(t, (a, l) => {
      if (Z.und(i))
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
    return ie(t, (r) => r.pause(...arguments)), this;
  }, e.resume = function() {
    return ie(t, (r) => r.resume(...arguments)), this;
  }, e.set = function(r) {
    ie(t, (i) => i.set(r));
  }, e.start = function(r) {
    const i = [];
    return ie(t, (o, a) => {
      if (Z.und(r))
        i.push(o.start());
      else {
        const l = this._getProps(r, o, a);
        l && i.push(o.start(l));
      }
    }), i;
  }, e.stop = function() {
    return ie(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return ie(t, (i, o) => i.update(this._getProps(r, i, o))), this;
  };
  const n = function(i, o, a) {
    return Z.fun(i) ? i(a, o) : i;
  };
  return e._getProps = n, e;
};
function Wh(t, e, n) {
  const r = Z.fun(e) && e;
  r && !n && (n = []);
  const i = oe(() => r || arguments.length == 3 ? Bh() : void 0, []), o = D(0), a = Yu(), l = oe(() => ({
    ctrls: [],
    queue: [],
    flush(h, C) {
      const p = tc(h, C);
      return o.current > 0 && !l.queue.length && !Object.keys(p).some((w) => !h.springs[w]) ? ja(h, C) : new Promise((w) => {
        lf(h, p), l.queue.push(() => {
          w(ja(h, C));
        }), a();
      });
    }
  }), []), c = D([...l.ctrls]), u = [], f = Zl(t) || 0;
  oe(() => {
    ie(c.current.slice(t, f), (h) => {
      $h(h, i), h.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), oe(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(h, C) {
    for (let p = h; p < C; p++) {
      const E = c.current[p] || (c.current[p] = new Lh(null, l.flush)), w = r ? r(p, E) : e[p];
      w && (u[p] = Mh(w));
    }
  }
  const m = c.current.map((h, C) => tc(h, u[C])), b = Qe(Ao), g = Zl(b), y = b !== g && kh(b);
  Is(() => {
    o.current++, l.ctrls = c.current;
    const {
      queue: h
    } = l;
    h.length && (l.queue = [], ie(h, (C) => C())), ie(c.current, (C, p) => {
      i == null || i.add(C), y && C.start({
        default: b
      });
      const E = u[p];
      E && (_h(C, E.ref), C.ref ? C.queue.push(E) : C.start(E));
    });
  }), Gu(() => () => {
    ie(l.ctrls, (h) => h.stop(!0));
  });
  const v = m.map((h) => Re({}, h));
  return i ? [v, i] : v;
}
function Me(t, e) {
  const n = Z.fun(t), [[r], i] = Wh(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let nc;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(nc || (nc = {}));
class df extends Vs {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = Xr(...n);
    const r = this._get(), i = Ia(r);
    As(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    It(n, r) || (Ct(this).setValue(n), this._onChange(n, this.idle)), !this.idle && rc(this._active) && la(this);
  }
  _get() {
    const e = Z.arr(this.source) ? this.source.map(We) : Ge(We(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !rc(this._active) && (this.idle = !1, ie(Mo(this), (e) => {
      e.done = !1;
    }), st.skipAnimation ? (J.batchedUpdates(() => this.advance()), la(this)) : Fo.start(this));
  }
  _attach() {
    let e = 1;
    ie(Ge(this.source), (n) => {
      it(n) && hr(n, this), La(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    ie(Ge(this.source), (e) => {
      it(e) && Jr(e, this);
    }), this._active.clear(), la(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = Ge(this.source).reduce((n, r) => Math.max(n, (La(r) ? r.priority : 0) + 1), 0));
  }
}
function Zh(t) {
  return t.idle !== !1;
}
function rc(t) {
  return !t.size || Array.from(t).every(Zh);
}
function la(t) {
  t.idle || (t.idle = !0, ie(Mo(t), (e) => {
    e.done = !0;
  }), Qr(t, {
    type: "idle",
    parent: t
  }));
}
const Hh = (t, ...e) => new df(t, e);
st.assign({
  createStringInterpolator: qu,
  to: (t, e) => new df(t, e)
});
function js(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const zh = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], mf = /^--/;
function Uh(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !mf.test(t) && !(qr.hasOwnProperty(t) && qr[t]) ? e + "px" : ("" + e).trim();
}
const ic = {};
function qh(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: o,
    scrollTop: a,
    scrollLeft: l,
    viewBox: c
  } = r, u = js(r, zh), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : ic[m] || (ic[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  o !== void 0 && (t.textContent = o);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = Uh(m, i[m]);
      mf.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
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
const Kh = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), Yh = ["Webkit", "Ms", "Moz", "O"];
qr = Object.keys(qr).reduce((t, e) => (Yh.forEach((n) => t[Kh(n, e)] = t[e]), t), qr);
const Gh = ["x", "y", "z"], Xh = /^(matrix|translate|scale|rotate|skew)/, Qh = /^(translate)/, Jh = /^(rotate|skew)/, ca = (t, e) => Z.num(t) && t !== 0 ? t + e : t, Ki = (t, e) => Z.arr(t) ? t.every((n) => Ki(n, e)) : Z.num(t) ? t === e : parseFloat(t) === e;
class e2 extends Io {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, o = js(e, Gh);
    const a = [], l = [];
    (n || r || i) && (a.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => ca(u, "px")).join(",")})`, Ki(c, 0)])), $t(o, (c, u) => {
      if (u === "transform")
        a.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (Xh.test(u)) {
        if (delete o[u], Z.und(c))
          return;
        const f = Qh.test(u) ? "px" : Jh.test(u) ? "deg" : "";
        a.push(Ge(c)), l.push(u === "rotate3d" ? ([d, m, b, g]) => [`rotate3d(${d},${m},${b},${ca(g, f)})`, Ki(g, 0)] : (d) => [`${u}(${d.map((m) => ca(m, f)).join(",")})`, Ki(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (o.transform = new t2(a, l)), super(o);
  }
}
class t2 extends Hu {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return ie(this.inputs, (r, i) => {
      const o = We(r[0]), [a, l] = this.transforms[i](Z.arr(o) ? o : r.map(We));
      e += " " + a, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && ie(this.inputs, (n) => ie(n, (r) => it(r) && hr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && ie(this.inputs, (n) => ie(n, (r) => it(r) && Jr(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), Qr(this, e);
  }
}
const n2 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], r2 = ["scrollTop", "scrollLeft"];
st.assign({
  batchedUpdates: x1,
  createStringInterpolator: qu,
  colors: jm
});
const i2 = bh(n2, {
  applyAnimatedValues: qh,
  createAnimatedStyle: (t) => new e2(t),
  getComponentProps: (t) => js(t, r2)
}), ye = i2.animated;
function o2(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function pr(t, e) {
  if (fr && t) {
    const n = o2(t);
    return k1(e, n);
  }
  return e;
}
function a2(t) {
  const e = D(t);
  return t && (e.current = !0), !!e.current;
}
const gr = (t) => To(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function To(t, e, n) {
  const r = a2(t);
  return e || t ? !0 : r ? !n : !1;
}
const s2 = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function rn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = s2[r];
    n[i] = function(o) {
      var a, l;
      o.stopPropagation(), (l = (a = e.props)[i]) === null || l === void 0 || l.call(a, o);
    };
  }
  return s.cloneElement(e, n);
}
const ua = "adm-mask", l2 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, c2 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, u2 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, pi = (t) => {
  const e = z(u2, t), {
    locale: n
  } = se(), r = D(null);
  Oo(r, e.visible && e.disableBodyScroll);
  const i = oe(() => {
    var f;
    const d = (f = l2[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = c2[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [o, a] = Y(e.visible), l = ks(), {
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
function hf(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "AddOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function f2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "CheckCircleFill-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "CheckCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function vf(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "CheckOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "CheckOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function d2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "ClockCircleFill-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "ClockCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Bs(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "CloseCircleFill-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "CloseCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Lo(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "CloseOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "CloseOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function m2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "DownFill-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "DownFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function pf(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", null, /* @__PURE__ */ T.createElement("rect", {
    id: "DownOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
    id: "DownOutline-down",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function h2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", null, /* @__PURE__ */ T.createElement("rect", {
    id: "ExclamationCircleFill-矩形",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function v2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "InformationCircleFill-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "InformationCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function p2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "LeftOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "LeftOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function g2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "MinusOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function y2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "QuestionCircleOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "QuestionCircleOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function b2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "RightOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
    id: "RightOutline-right",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function E2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "SearchOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "SearchOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function w2(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "SoundOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "SoundOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function oc(t) {
  return /* @__PURE__ */ T.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ T.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ T.createElement("g", {
    id: "TextDeletionOutline-编组"
  }, /* @__PURE__ */ T.createElement("rect", {
    id: "TextDeletionOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ T.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Ws = {
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
function gf(t) {
  const [e, n] = Y(t);
  return Ne(() => {
    n(t);
  }, [t]), e;
}
function C2(t, e, n) {
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
function ac(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function sc(t, e, n, r = 0.15) {
  return r === 0 ? C2(t, e, n) : t < e ? -ac(e - t, n - e, r) + e : t > n ? +ac(t - n, n - e, r) + n : t;
}
function x2(t, [e, n], [r, i]) {
  const [[o, a], [l, c]] = t;
  return [sc(e, o, a, r), sc(n, l, c, i)];
}
function k2(t, e) {
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
function $2(t) {
  var e = k2(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Ae(t, e, n) {
  return e = $2(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function lc(t, e) {
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
    e % 2 ? lc(Object(n), !0).forEach(function(r) {
      Ae(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : lc(Object(n)).forEach(function(r) {
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
function cc(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const _2 = ["enter", "leave"];
function O2(t = !1, e) {
  return t && !_2.includes(e);
}
function S2(t, e = "", n = !1) {
  const r = yf[t], i = r && r[e] || e;
  return "on" + cc(t) + cc(i) + (O2(n, i) ? "Capture" : "");
}
const F2 = ["gotpointercapture", "lostpointercapture"];
function N2(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = F2.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function P2(t, e = "") {
  const n = yf[t], r = n && n[e] || e;
  return t + r;
}
function Do(t) {
  return "touches" in t;
}
function bf(t) {
  return Do(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function R2(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function M2(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function Ef(t) {
  return Do(t) ? M2(t)[0] : t;
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
function I2(t) {
  return R2(t).map((e) => e.identifier);
}
function uc(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return Ba(n, r);
}
function fa(t) {
  const e = Ef(t);
  return Do(t) ? e.identifier : e.pointerId;
}
function fc(t) {
  const e = Ef(t);
  return [e.clientX, e.clientY];
}
const dc = 40, mc = 800;
function wf(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= dc, n *= dc) : r === 2 && (e *= mc, n *= mc), [e, n];
}
function A2(t) {
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
function T2() {
}
function L2(...t) {
  return t.length === 0 ? T2 : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function hc(t, e) {
  return Object.assign({}, e, t || {});
}
const D2 = 32;
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, A2(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, o = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
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
    const [y, v] = n.offset, [[h, C], [p, E]] = n._bounds;
    n.overflow = [y < h ? -1 : y > C ? 1 : 0, v < p ? -1 : v > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = x2(n._bounds, n.offset, w), n.delta = Fe.sub(n.offset, b), this.computeMovement(), g && (!n.last || o > D2)) {
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
function V2([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class xf extends Cf {
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
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[bf(e)] : r.axisThreshold;
      n.axis = V2(n._movement, i);
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
const j2 = (t) => t, vc = 0.15, kf = {
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
        return [vc, vc];
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
    return this.hasCustomTransform = !!r, r || j2;
  },
  threshold(t) {
    return Fe.toVector(t, 0);
  }
}, B2 = 0, yr = Ce(Ce({}, kf), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = B2) {
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
}), pc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class W2 extends xf {
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = fa(e), r._pointerActive = !0, this.computeValues(fc(e)), this.computeInitial(), n.preventScrollAxis && bf(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
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
    const o = fc(e);
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
        const v = Math.abs(l / n.timeDelta), h = Math.abs(c / n.timeDelta);
        v > d && Math.abs(u) > b && (n.swipe[0] = Math.sign(l)), h > m && Math.abs(f) > g && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, Z2(e);
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
    const n = pc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Fe.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in pc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Z2(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const gi = typeof window < "u" && window.document && window.document.createElement;
function $f() {
  return gi && "ontouchstart" in window;
}
function H2() {
  return $f() || gi && window.navigator.maxTouchPoints > 1;
}
function z2() {
  return gi && "onpointerdown" in window;
}
function U2() {
  return gi && "exitPointerLock" in window.document;
}
function q2() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const ot = {
  isBrowser: gi,
  gesture: q2(),
  touch: $f(),
  touchscreen: H2(),
  pointer: z2(),
  pointerLock: U2()
}, K2 = 250, Y2 = 180, G2 = 0.5, X2 = 50, Q2 = 250, J2 = 10, gc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, e3 = Ce(Ce({}, yr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && ot.pointerLock, ot.touch && n ? "touch" : this.pointerLock ? "mouse" : ot.pointer && !i ? "pointer" : ot.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? K2 : void 0, !(!ot.touchscreen || n === !1))
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
    velocity: t = G2,
    distance: e = X2,
    duration: n = Q2
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
        return Y2;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? Ce(Ce({}, gc), t) : gc;
  },
  keyboardDisplacement(t = J2) {
    return t;
  }
});
function _f(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [o, a] = t._direction;
  (e < 0 && r > 0 && o < 0 || e > 0 && r < 0 && o > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && a < 0 || n > 0 && i < 0 && a > 0) && (t._movement[1] = t._movementBound[1]);
}
const t3 = 30, n3 = 100;
class r3 extends Cf {
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
      const i = Math.abs(n) * t3 - Math.abs(r);
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
    const i = uc(e, n._touchIds);
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
    const n = uc(e, this.state._touchIds);
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
    r._delta = [-wf(e)[1] / n3 * r.offset[0], 0], Fe.addTo(r._movement, r._delta), _f(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const i3 = Ce(Ce({}, kf), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !ot.touch && ot.gesture)
      return "gesture";
    if (ot.touch && r)
      return "touch";
    if (ot.touchscreen) {
      if (ot.pointer)
        return "pointer";
      if (ot.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (a) => {
      const l = hc(fo(n, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, o = (a) => {
      const l = hc(fo(r, a), {
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
class o3 extends xf {
  constructor(...e) {
    super(...e), Ae(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = wf(e), Fe.addTo(n._movement, n._delta), _f(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const a3 = yr;
Ce(Ce({}, yr), {}, {
  mouseOnly: (t = !0) => t
});
const Zs = /* @__PURE__ */ new Map(), Wa = /* @__PURE__ */ new Map();
function Hs(t) {
  Zs.set(t.key, t.engine), Wa.set(t.key, t.resolver);
}
const Of = {
  key: "drag",
  engine: W2,
  resolver: e3
}, s3 = {
  key: "pinch",
  engine: r3,
  resolver: i3
}, l3 = {
  key: "wheel",
  engine: o3,
  resolver: a3
};
function c3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function u3(t, e) {
  if (t == null)
    return {};
  var n = c3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const f3 = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = ot.isBrowser ? window : void 0) {
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
}, d3 = ["target", "eventOptions", "window", "enabled", "transform"];
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
function m3(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  } = r, u = u3(r, d3);
  if (n.shared = Yi({
    target: i,
    eventOptions: o,
    window: a,
    enabled: l,
    transform: c
  }, f3), e) {
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
class Sf {
  constructor(e, n) {
    Ae(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, o) {
    const a = this._listeners, l = P2(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = Ce(Ce({}, c), o);
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
class h3 {
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
class v3 {
  constructor(e) {
    Ae(this, "gestures", /* @__PURE__ */ new Set()), Ae(this, "_targetEventStore", new Sf(this)), Ae(this, "gestureEventStores", {}), Ae(this, "gestureTimeoutStores", {}), Ae(this, "handlers", {}), Ae(this, "config", {}), Ae(this, "pointerIds", /* @__PURE__ */ new Set()), Ae(this, "touchIds", /* @__PURE__ */ new Set()), Ae(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), p3(this, e);
  }
  setEventIds(e) {
    if (Do(e))
      return this.touchIds = new Set(I2(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = m3(e, n, this.config);
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
          const l = this.config[a], c = yc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = Zs.get(a);
            new u(this, e, a).bind(c);
          }
        }
        const o = yc(r, n.eventOptions, !!i);
        for (const a in this.nativeHandlers)
          o(a, "", (l) => this.nativeHandlers[a](Ce(Ce({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const o in r)
        r[o] = L2(...r[o]);
      if (!i)
        return r;
      for (const o in r) {
        const {
          device: a,
          capture: l,
          passive: c
        } = N2(o);
        this._targetEventStore.add(i, a, "", r[o], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function Dn(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Sf(t, e), t.gestureTimeoutStores[e] = new h3();
}
function p3(t, e) {
  e.drag && Dn(t, "drag"), e.wheel && Dn(t, "wheel"), e.scroll && Dn(t, "scroll"), e.move && Dn(t, "move"), e.pinch && Dn(t, "pinch"), e.hover && Dn(t, "hover");
}
const yc = (t, e, n) => (r, i, o, a = {}, l = !1) => {
  var c, u;
  const f = (c = a.capture) !== null && c !== void 0 ? c : e.capture, d = (u = a.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : S2(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(o);
}, g3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function y3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    g3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Vn(t, e, n, r, i, o) {
  if (!t.has(n) || !Zs.has(r))
    return;
  const a = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && a in e && e[a](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, o[r] = o[r] || {};
}
function b3(t, e) {
  const [n, r, i] = y3(t), o = {};
  return Vn(i, n, "onDrag", "drag", o, e), Vn(i, n, "onWheel", "wheel", o, e), Vn(i, n, "onScroll", "scroll", o, e), Vn(i, n, "onPinch", "pinch", o, e), Vn(i, n, "onMove", "move", o, e), Vn(i, n, "onHover", "hover", o, e), {
    handlers: o,
    config: e,
    nativeHandlers: r
  };
}
function zs(t, e = {}, n, r) {
  const i = s.useMemo(() => new v3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function St(t, e) {
  return Hs(Of), zs({
    drag: t
  }, e || {}, "drag");
}
function E3(t, e) {
  return Hs(l3), zs({
    wheel: t
  }, e || {}, "wheel");
}
function w3(t) {
  return t.forEach(Hs), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: o,
      config: a
    } = b3(n, r || {});
    return zs(i, a, void 0, o);
  };
}
const Ri = "adm-popup", C3 = Object.assign(Object.assign({}, Ws), {
  closeOnSwipe: !1,
  position: "bottom"
}), br = (t) => {
  const {
    locale: e,
    popup: n = {}
  } = se(), r = z(C3, n, t), i = j(`${Ri}-body`, r.bodyClassName, `${Ri}-body-position-${r.position}`), [o, a] = Y(r.visible), l = D(null);
  Oo(l, r.disableBodyScroll && o ? "strict" : !1), Ne(() => {
    r.visible && a(!0);
  }, [r.visible]);
  const c = ks(), {
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
  }), d = gf(o && r.visible), m = rn(r.stopPropagation, W(r, s.createElement("div", Object.assign({
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
    className: j(`${Ri}-close-icon`, "adm-plain-anchor"),
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
}, bc = "adm-safe-area", Er = (t) => W(t, s.createElement("div", {
  className: j(bc, `${bc}-position-${t.position}`)
})), mo = Object.assign({}, C1), {
  version: x3,
  render: k3,
  unmountComponentAtNode: $3
} = mo;
let Vo;
try {
  Number((x3 || "").split(".")[0]) >= 18 && mo.createRoot && (Vo = mo.createRoot);
} catch {
}
function Ec(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = mo;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const ho = "__antd_mobile_root__";
function _3(t, e) {
  k3(t, e);
}
function O3(t, e) {
  Ec(!0);
  const n = e[ho] || Vo(e);
  Ec(!1), n.render(t), e[ho] = n;
}
function S3(t, e) {
  if (Vo) {
    O3(t, e);
    return;
  }
  _3(t, e);
}
function F3(t) {
  return $3(t);
}
function N3(t) {
  return Se(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[ho]) === null || e === void 0 || e.unmount(), delete t[ho];
    });
  });
}
function P3(t) {
  return Vo ? N3(t) : F3(t);
}
function yi(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    P3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return S3(t, e), n;
}
function wr(t) {
  const e = s.forwardRef((i, o) => {
    const [a, l] = Y(!1), c = D(!1), [u, f] = Y(t), d = D(0);
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
        var y, v;
        d.current++, (v = (y = u.props).afterClose) === null || v === void 0 || v.call(y), f(g);
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
const Le = "adm-action-sheet", R3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Ff = (t) => {
  const e = z(R3, t), {
    styles: n
  } = e;
  return s.createElement(br, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: j(`${Le}-popup`, e.popupClassName),
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
    className: j("adm-plain-anchor", `${Le}-button-item`, {
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
    className: j("adm-plain-anchor", `${Le}-button-item`),
    onClick: e.onClose
  }, s.createElement("div", {
    className: `${Le}-button-item-name`
  }, e.cancelText)))), e.safeArea && s.createElement(Er, {
    position: "bottom"
  }))));
};
function M3(t) {
  return wr(s.createElement(Ff, Object.assign({}, t)));
}
const I7 = fe(Ff, {
  show: M3
}), wc = "adm-auto-center", ii = (t) => W(t, s.createElement("div", {
  className: wc
}, s.createElement("div", {
  className: `${wc}-content`
}, t.children))), I3 = Ve(() => s.createElement("svg", {
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
var Us = {}, A3 = mt && mt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Us, "__esModule", { value: !0 });
var qs = Us.staged = void 0;
const T3 = A3(s);
function Nf(t) {
  return typeof t == "function" ? T3.default.createElement(L3, { stage: t }) : t;
}
function L3(t) {
  const e = t.stage();
  return Nf(e);
}
function D3(t) {
  return function(n, r) {
    const i = t(n, r);
    return Nf(i);
  };
}
qs = Us.staged = D3;
function kn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const V3 = (t) => {
  const e = D(null), [n] = J0(e);
  return X(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, bi = wu(Ne), j3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), B3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), vo = "adm-image", W3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${vo}-tip`
  }, s.createElement(j3, null)),
  fallback: s.createElement("div", {
    className: `${vo}-tip`
  }, s.createElement(B3, null)),
  lazy: !1,
  draggable: !1
}, jo = qs((t) => {
  const e = z(W3, t), [n, r] = Y(!1), [i, o] = Y(!1), a = D(null), l = D(null);
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
        var v;
        r(!0), (v = e.onLoad) === null || v === void 0 || v.call(e, y);
      },
      onError: (y) => {
        var v;
        o(!0), (v = e.onError) === null || v === void 0 || v.call(e, y);
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
  return e.width && (b["--width"] = kn(e.width), b.width = kn(e.width)), e.height && (b["--height"] = kn(e.height), b.height = kn(e.height)), W(e, s.createElement("div", {
    ref: a,
    className: vo,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(V3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), Z3 = "adm-avatar", H3 = {
  fallback: s.createElement(I3, null),
  fit: "cover"
}, A7 = (t) => {
  const e = z(H3, t);
  return W(e, s.createElement(jo, {
    className: Z3,
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
}, jn = "adm-badge", Pf = s.createElement(s.Fragment, null), z3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === Pf, o = j(jn, {
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
    className: j(`${jn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, a) : a;
}, Za = fe(z3, {
  dot: Pf
}), U3 = "adm-dot-loading", q3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, K3 = {
  color: "default"
}, Rf = Ve((t) => {
  var e;
  const n = z(K3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = q3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: j("adm-loading", U3)
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
function Y3() {
  return fr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const tt = "adm-button", G3 = {
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
}, Lt = ve((t, e) => {
  const n = z(G3, t), [r, i] = Y(!1), o = D(null), a = n.loading === "auto" ? r : n.loading, l = n.disabled || a;
  Ee(e, () => ({
    get nativeElement() {
      return o.current;
    }
  }));
  const c = (u) => Se(void 0, void 0, void 0, function* () {
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
    className: j(tt, {
      [`${tt}-${n.color}`]: n.color,
      [`${tt}-block`]: n.block,
      [`${tt}-disabled`]: l,
      [`${tt}-fill-outline`]: n.fill === "outline",
      [`${tt}-fill-none`]: n.fill === "none",
      [`${tt}-mini`]: n.size === "mini",
      [`${tt}-small`]: n.size === "small",
      [`${tt}-large`]: n.size === "large",
      [`${tt}-loading`]: a
    }, `${tt}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, a ? s.createElement("div", {
    className: `${tt}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
}), Cc = () => s.createElement("svg", {
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
})))))), xc = () => s.createElement("svg", {
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
var If = { exports: {} };
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
})(If);
var X3 = If.exports;
const Bo = /* @__PURE__ */ Ot(X3);
function ae(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = _u(), o = D(e !== void 0 ? e : n);
  e !== void 0 && (o.current = e);
  const a = jt((l, c = !1) => {
    const u = typeof l == "function" ? l(o.current) : l;
    if (!(!c && u === o.current))
      return o.current = u, i(), r == null ? void 0 : r(u);
  });
  return [o.current, a];
}
function Q3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function kc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function da(t) {
  return pe().year(t.year).month(t.month - 1).date(1);
}
pe.extend(Bo);
const ge = "adm-calendar", J3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(Cc, null),
  prevYearButton: s.createElement(xc, null),
  nextMonthButton: s.createElement(Cc, null),
  nextYearButton: s.createElement(xc, null)
}, T7 = ve((t, e) => {
  const n = pe(), r = z(J3, t), {
    locale: i
  } = se(), o = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const p = o.pop();
    p && o.unshift(p);
  }
  const [a, l] = ae({
    value: r.value === void 0 ? void 0 : kc(r.selectionMode, r.value),
    defaultValue: kc(r.selectionMode, r.defaultValue),
    onChange: (p) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, p ? p[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, p));
    }
  }), [c, u] = Y(!1), [f, d] = Y(() => pe(a ? a[0] : n).date(1));
  Es(() => {
    var p;
    (p = r.onPageChange) === null || p === void 0 || p.call(r, f.year(), f.month() + 1);
  }, [f]), Ee(e, () => ({
    jumpTo: (p) => {
      let E;
      typeof p == "function" ? E = p({
        year: f.year(),
        month: f.month() + 1
      }) : E = p, d(da(E));
    },
    jumpToToday: () => {
      d(pe().date(1));
    }
  }));
  const m = (p, E, w) => {
    const x = f[p](E, w);
    if (p === "subtract" && r.minPage) {
      const k = da(r.minPage);
      if (x.isBefore(k, w))
        return;
    }
    if (p === "add" && r.maxPage) {
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
  }, Q3(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), s.createElement("a", {
    className: j(`${ge}-arrow-button`, `${ge}-arrow-button-right`, `${ge}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), s.createElement("a", {
    className: j(`${ge}-arrow-button`, `${ge}-arrow-button-right`, `${ge}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), g = oe(() => r.max && pe(r.max), [r.max]), y = oe(() => r.min && pe(r.min), [r.min]);
  function v() {
    var p;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const x = w;
      let k = !1, $ = !1, N = !1, O = !1, L = !1;
      if (a) {
        const [_, I] = a;
        $ = x.isSame(_, "day"), N = x.isSame(I, "day"), k = $ || N || x.isAfter(_, "day") && x.isBefore(I, "day"), k && (O = (E.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !$, L = (E.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !N);
      }
      const V = x.month() === f.month(), M = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : g && x.isAfter(g, "day") || y && x.isBefore(y, "day");
      E.push(s.createElement("div", {
        key: x.valueOf(),
        className: j(`${ge}-cell`, (M || !V) && `${ge}-cell-disabled`, V && {
          [`${ge}-cell-today`]: x.isSame(n, "day"),
          [`${ge}-cell-selected`]: k,
          [`${ge}-cell-selected-begin`]: $,
          [`${ge}-cell-selected-end`]: N,
          [`${ge}-cell-selected-row-begin`]: O,
          [`${ge}-cell-selected-row-end`]: L
        }),
        onClick: () => {
          if (!r.selectionMode || M)
            return;
          const _ = x.toDate();
          V || d(x.clone().date(1));
          function I() {
            if (!r.allowClear || !a)
              return !1;
            const [F, S] = a;
            return x.isSame(F, "date") && x.isSame(S, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && I()) {
              l(null);
              return;
            }
            l([_, _]);
          } else if (r.selectionMode === "range") {
            if (!a) {
              l([_, _]), u(!0);
              return;
            }
            if (I()) {
              l(null), u(!1);
              return;
            }
            if (c) {
              const F = a[0];
              l(F > _ ? [_, F] : [F, _]), u(!1);
            } else
              l([_, _]), u(!0);
          }
        }
      }, s.createElement("div", {
        className: `${ge}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), s.createElement("div", {
        className: `${ge}-cell-bottom`
      }, (p = r.renderLabel) === null || p === void 0 ? void 0 : p.call(r, x.toDate())))), w = w.add(1, "day");
    }
    return E;
  }
  const h = s.createElement("div", {
    className: `${ge}-cells`
  }, v()), C = s.createElement("div", {
    className: `${ge}-mark`
  }, o.map((p, E) => s.createElement("div", {
    key: E,
    className: `${ge}-mark-cell`
  }, p)));
  return W(r, s.createElement("div", {
    className: ge
  }, b, C, h));
});
var Af = { exports: {} };
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
})(Af);
var e4 = Af.exports;
const t4 = /* @__PURE__ */ Ot(e4);
function $c(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function n4(t) {
  return pe().year(t.year).month(t.month - 1).date(1);
}
function Ha(t) {
  var e = T.useRef();
  e.current = t;
  var n = T.useCallback(function() {
    for (var r, i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(o));
  }, []);
  return n;
}
function Tf(t) {
  if (Array.isArray(t))
    return t;
}
function r4(t, e) {
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
function za(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function Ks(t, e) {
  if (t) {
    if (typeof t == "string")
      return za(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return za(t, e);
  }
}
function Lf() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function on(t, e) {
  return Tf(t) || r4(t, e) || Ks(t, e) || Lf();
}
function i4() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var _c = i4() ? T.useLayoutEffect : T.useEffect, o4 = function(e, n) {
  var r = T.useRef(!0);
  _c(function() {
    return e(r.current);
  }, n), _c(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, Oc = function(e, n) {
  o4(function(r) {
    if (!r)
      return e();
  }, n);
};
function Sc(t) {
  var e = T.useRef(!1), n = T.useState(t), r = on(n, 2), i = r[0], o = r[1];
  T.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function a(l, c) {
    c && e.current || o(l);
  }
  return [i, a];
}
function ma(t) {
  return t !== void 0;
}
function a4(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, o = n.onChange, a = n.postState, l = Sc(function() {
    return ma(i) ? i : ma(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = on(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = a ? a(d) : d, b = Ha(o), g = Sc([d]), y = on(g, 2), v = y[0], h = y[1];
  Oc(function() {
    var p = v[0];
    u !== p && b(u, p);
  }, [v]), Oc(function() {
    ma(i) || f(i);
  }, [i]);
  var C = Ha(function(p, E) {
    f(p, E), h([d], E);
  });
  return [m, C];
}
function ze(t) {
  "@babel/helpers - typeof";
  return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ze(t);
}
var Df = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ys = Symbol.for("react.element"), Gs = Symbol.for("react.portal"), Wo = Symbol.for("react.fragment"), Zo = Symbol.for("react.strict_mode"), Ho = Symbol.for("react.profiler"), zo = Symbol.for("react.provider"), Uo = Symbol.for("react.context"), s4 = Symbol.for("react.server_context"), qo = Symbol.for("react.forward_ref"), Ko = Symbol.for("react.suspense"), Yo = Symbol.for("react.suspense_list"), Go = Symbol.for("react.memo"), Xo = Symbol.for("react.lazy"), l4 = Symbol.for("react.offscreen"), Vf;
Vf = Symbol.for("react.module.reference");
function ct(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case Ys:
        switch (t = t.type, t) {
          case Wo:
          case Ho:
          case Zo:
          case Ko:
          case Yo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case s4:
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
      case Gs:
        return e;
    }
  }
}
de.ContextConsumer = Uo;
de.ContextProvider = zo;
de.Element = Ys;
de.ForwardRef = qo;
de.Fragment = Wo;
de.Lazy = Xo;
de.Memo = Go;
de.Portal = Gs;
de.Profiler = Ho;
de.StrictMode = Zo;
de.Suspense = Ko;
de.SuspenseList = Yo;
de.isAsyncMode = function() {
  return !1;
};
de.isConcurrentMode = function() {
  return !1;
};
de.isContextConsumer = function(t) {
  return ct(t) === Uo;
};
de.isContextProvider = function(t) {
  return ct(t) === zo;
};
de.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ys;
};
de.isForwardRef = function(t) {
  return ct(t) === qo;
};
de.isFragment = function(t) {
  return ct(t) === Wo;
};
de.isLazy = function(t) {
  return ct(t) === Xo;
};
de.isMemo = function(t) {
  return ct(t) === Go;
};
de.isPortal = function(t) {
  return ct(t) === Gs;
};
de.isProfiler = function(t) {
  return ct(t) === Ho;
};
de.isStrictMode = function(t) {
  return ct(t) === Zo;
};
de.isSuspense = function(t) {
  return ct(t) === Ko;
};
de.isSuspenseList = function(t) {
  return ct(t) === Yo;
};
de.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === Wo || t === Ho || t === Zo || t === Ko || t === Yo || t === l4 || typeof t == "object" && t !== null && (t.$$typeof === Xo || t.$$typeof === Go || t.$$typeof === zo || t.$$typeof === Uo || t.$$typeof === qo || t.$$typeof === Vf || t.getModuleId !== void 0);
};
de.typeOf = ct;
Df.exports = de;
var po = Df.exports;
function jf(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function c4(t, e) {
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
function Bf(t) {
  var e = c4(t, "string");
  return ze(e) === "symbol" ? e : String(e);
}
function De(t, e, n) {
  return e = Bf(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Fc(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function le(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Fc(Object(n), !0).forEach(function(r) {
      De(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Fc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function u4(t) {
  if (Array.isArray(t))
    return za(t);
}
function Wf(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function f4() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ue(t) {
  return u4(t) || Wf(t) || Ks(t) || f4();
}
function d4(t) {
  return Tf(t) || Wf(t) || Ks(t) || Lf();
}
function Zf(t, e, n, r) {
  if (!e.length)
    return n;
  var i = d4(e), o = i[0], a = i.slice(1), l;
  return !t && typeof o == "number" ? l = [] : Array.isArray(t) ? l = ue(t) : l = le({}, t), r && n === void 0 && a.length === 1 ? delete l[o][a[0]] : l[o] = Zf(l[o], a, n, r), l;
}
function m4(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !jf(t, e.slice(0, -1)) ? t : Zf(t, e, n, r);
}
var Ua = {}, h4 = function(e) {
};
function v4(t, e) {
}
function p4(t, e) {
}
function g4() {
  Ua = {};
}
function Hf(t, e, n) {
  !e && !Ua[n] && (t(!1, n), Ua[n] = !0);
}
function vt(t, e) {
  Hf(v4, t, e);
}
function y4(t, e) {
  Hf(p4, t, e);
}
vt.preMessage = h4;
vt.resetWarned = g4;
vt.noteOnce = y4;
function b4(t, e, n) {
  const r = D(), i = () => {
    r.current && cancelAnimationFrame(r.current);
  }, o = Ha((a) => {
    i(), r.current = requestAnimationFrame(() => {
      if (n.current) {
        const l = a.format("YYYY-M"), c = n.current.querySelector(`[data-year-month="${l}"]`);
        c && c.scrollIntoView({
          block: "start",
          inline: "nearest"
        });
      }
    });
  });
  return X(() => {
    if (e && t)
      return o(t), i;
  }, [t, e]), o;
}
pe.extend(Bo);
pe.extend(t4);
const Oe = "adm-calendar-picker-view", zf = s.createContext({
  visible: !1
}), E4 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, w4 = ve((t, e) => {
  var n;
  const r = D(null), i = pe(), o = z(E4, t), {
    locale: a
  } = se(), l = [...a.Calendar.markItems];
  if (o.weekStartsOn === "Sunday") {
    const x = l.pop();
    x && l.unshift(x);
  }
  const [c, u] = ae({
    value: o.value === void 0 ? void 0 : $c(o.selectionMode, o.value),
    defaultValue: $c(o.selectionMode, o.defaultValue),
    onChange: (x) => {
      var k, $;
      o.selectionMode === "single" ? (k = o.onChange) === null || k === void 0 || k.call(o, x ? x[0] : null) : o.selectionMode === "range" && (($ = o.onChange) === null || $ === void 0 || $.call(o, x));
    }
  }), [f, d] = Y(!1), [m, b] = Y(() => pe(c ? c[0] : i).date(1)), g = Qe(zf), y = b4(m, g.visible, r), v = oe(() => o.max ? pe(o.max) : m.add(6, "month"), [o.max, m]), h = oe(() => o.min ? pe(o.min) : m, [o.min, m]);
  Ee(e, () => ({
    jumpTo: (x) => {
      let k;
      typeof x == "function" ? k = x({
        year: m.year(),
        month: m.month() + 1
      }) : k = x;
      const $ = n4(k);
      b($), y($);
    },
    jumpToToday: () => {
      const x = pe().date(1);
      b(x), y(x);
    },
    getDateRange: () => c
  }));
  const C = s.createElement("div", {
    className: `${Oe}-header`
  }, s.createElement("div", {
    className: `${Oe}-title`
  }, (n = o.title) !== null && n !== void 0 ? n : a.Calendar.title));
  function p() {
    var x;
    const k = [];
    let $ = h;
    for (; $.isSameOrBefore(v, "month"); ) {
      const N = $.year(), O = $.month() + 1, L = {
        year: N,
        month: O
      }, V = `${N}-${O}`, M = o.weekStartsOn === "Monday" ? $.date(1).isoWeekday() - 1 : $.date(1).isoWeekday(), _ = M == 7 ? null : Array(M).fill(null).map((I, F) => s.createElement("div", {
        key: F,
        className: `${Oe}-cell`
      }));
      k.push(s.createElement("div", {
        key: V,
        "data-year-month": V
      }, s.createElement("div", {
        className: `${Oe}-title`
      }, (x = a.Calendar.yearAndMonth) === null || x === void 0 ? void 0 : x.replace(/\${(.*?)}/g, (I, F) => {
        var S;
        return (S = L[F]) === null || S === void 0 ? void 0 : S.toString();
      })), s.createElement("div", {
        className: `${Oe}-cells`
      }, _, Array($.daysInMonth()).fill(null).map((I, F) => {
        var S;
        const R = $.date(F + 1);
        let P = !1, A = !1, B = !1, H = !1, q = !1;
        if (c) {
          const [Q, ne] = c;
          A = R.isSame(Q, "day"), B = R.isSame(ne, "day"), P = A || B || R.isAfter(Q, "day") && R.isBefore(ne, "day"), P && (H = (k.length % 7 === 0 || R.isSame(R.startOf("month"), "day")) && !A, q = (k.length % 7 === 6 || R.isSame(R.endOf("month"), "day")) && !B);
        }
        const K = o.shouldDisableDate ? o.shouldDisableDate(R.toDate()) : v && R.isAfter(v, "day") || h && R.isBefore(h, "day"), G = () => {
          var Q;
          const ne = (Q = o.renderTop) === null || Q === void 0 ? void 0 : Q.call(o, R.toDate());
          if (ne)
            return ne;
          if (o.selectionMode === "range") {
            if (A)
              return a.Calendar.start;
            if (B)
              return a.Calendar.end;
          }
          if (R.isSame(i, "day") && !P)
            return a.Calendar.today;
        };
        return s.createElement("div", {
          key: R.valueOf(),
          className: j(`${Oe}-cell`, {
            [`${Oe}-cell-today`]: R.isSame(i, "day"),
            [`${Oe}-cell-selected`]: P,
            [`${Oe}-cell-selected-begin`]: A,
            [`${Oe}-cell-selected-end`]: B,
            [`${Oe}-cell-selected-row-begin`]: H,
            [`${Oe}-cell-selected-row-end`]: q,
            [`${Oe}-cell-disabled`]: !!K
          }),
          onClick: () => {
            if (!o.selectionMode || K)
              return;
            const Q = R.toDate();
            function ne() {
              if (!o.allowClear || !c)
                return !1;
              const [ce, U] = c;
              return R.isSame(ce, "date") && R.isSame(U, "day");
            }
            if (o.selectionMode === "single") {
              if (o.allowClear && ne()) {
                u(null);
                return;
              }
              u([Q, Q]);
            } else if (o.selectionMode === "range") {
              if (!c) {
                u([Q, Q]), d(!0);
                return;
              }
              if (ne()) {
                u(null), d(!1);
                return;
              }
              if (f) {
                const ce = c[0];
                u(ce > Q ? [Q, ce] : [ce, Q]), d(!1);
              } else
                u([Q, Q]), d(!0);
            }
          }
        }, s.createElement("div", {
          className: `${Oe}-cell-top`
        }, G()), s.createElement("div", {
          className: `${Oe}-cell-date`
        }, o.renderDate ? o.renderDate(R.toDate()) : R.date()), s.createElement("div", {
          className: `${Oe}-cell-bottom`
        }, (S = o.renderBottom) === null || S === void 0 ? void 0 : S.call(o, R.toDate())));
      })))), $ = $.add(1, "month");
    }
    return k;
  }
  const E = s.createElement("div", {
    className: `${Oe}-body`,
    ref: r
  }, p()), w = s.createElement("div", {
    className: `${Oe}-mark`
  }, l.map((x, k) => s.createElement("div", {
    key: k,
    className: `${Oe}-mark-cell`
  }, x)));
  return W(o, s.createElement("div", {
    className: Oe
  }, C, w, E));
}), Mi = "adm-divider", C4 = {
  contentPosition: "center",
  direction: "horizontal"
}, qa = (t) => {
  const e = z(C4, t);
  return W(e, s.createElement("div", {
    className: j(Mi, `${Mi}-${e.direction}`, `${Mi}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Mi}-content`
  }, e.children)));
}, Ii = "adm-calendar-picker", x4 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, L7 = ve((t, e) => {
  const n = z(x4, t), {
    locale: r
  } = se(), i = e ?? D(null), {
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
  } = n, v = dr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), h = s.useMemo(() => ({
    visible: !!o
  }), [o]), C = s.createElement("div", {
    className: `${Ii}-footer`
  }, s.createElement(qa, null), s.createElement("div", {
    className: `${Ii}-footer-bottom`
  }, s.createElement(Lt, {
    color: "primary",
    onClick: () => {
      var p, E, w, x;
      const k = (E = (p = i.current) === null || p === void 0 ? void 0 : p.getDateRange()) !== null && E !== void 0 ? E : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, k ? k[0] : null) : n.selectionMode === "range" && ((x = n.onConfirm) === null || x === void 0 || x.call(n, k)), m == null || m();
    }
  }, a ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Ii
  }, s.createElement(br, {
    visible: o,
    className: j(`${Ii}-popup`, l),
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
  }, s.createElement(zf.Provider, {
    value: h
  }, s.createElement(w4, Object.assign({
    ref: i
  }, v))), C)));
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
function Uf(t, e, n) {
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
function Xs(t, e, n) {
  const r = jt(t);
  X(() => Uf(e.current, n, r), [e]);
}
function _e(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const qf = (t, e) => {
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
  }, [e]), Xs(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Ai = "adm-scroll-mask", Kf = (t) => {
  const e = D(null), [{
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
    className: j(Ai, `${Ai}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(ye.div, {
    className: j(Ai, `${Ai}-right`),
    style: {
      opacity: r
    }
  }));
};
function fn(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (o) => {
      po.isFragment(o) ? r(o.props.children) : (e(o, n), n += 1);
    });
  }
  r(t);
}
const Zt = "adm-capsule-tabs", k4 = () => null, $4 = (t) => {
  var e;
  const n = D(null), r = D(null), i = {};
  let o = null;
  const a = [];
  fn(t.children, (d, m) => {
    if (!An(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const g = a.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = qf(n, i[l]);
  return Ei(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Zt,
    ref: r
  }, s.createElement("div", {
    className: `${Zt}-header`
  }, s.createElement(Kf, {
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
    className: j(`${Zt}-tab`, {
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
}, D7 = fe($4, {
  Tab: k4
}), Ti = "adm-card", V7 = (t) => {
  const e = () => t.title || t.extra ? s.createElement("div", {
    className: j(`${Ti}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, s.createElement("div", {
    className: `${Ti}-header-title`
  }, t.title), t.extra) : null, n = () => t.children ? s.createElement("div", {
    className: j(`${Ti}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return W(t, s.createElement("div", {
    className: Ti,
    onClick: t.onClick
  }, e(), n()));
};
function Nc(t, e, n) {
  return t * e * n / (e + n * t);
}
function oi(t, e, n, r, i = 0.15) {
  return i === 0 ? _e(t, e, n) : t < e ? -Nc(e - t, r, i) + e : t > n ? +Nc(t - n, r, i) + n : t;
}
var _4 = typeof Element < "u", O4 = typeof Map == "function", S4 = typeof Set == "function", F4 = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
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
    if (O4 && t instanceof Map && e instanceof Map) {
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
    if (S4 && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (o = t.entries(); !(r = o.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (F4 && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if (_4 && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !Gi(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var N4 = function(e, n) {
  try {
    return Gi(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const Ka = /* @__PURE__ */ Ot(N4);
function Yf(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const pt = "adm-picker-view", Gf = Ve((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(h) {
    t.onSelect(h, t.index);
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
  })), l = D(!1), c = D(null), u = D(null), f = D(34);
  Ne(() => {
    const h = u.current;
    h && (f.current = Yf(window.getComputedStyle(h).getPropertyValue("height")));
  }), Ne(() => {
    if (l.current || e === null)
      return;
    const h = n.findIndex((p) => p.value === e);
    if (h < 0)
      return;
    const C = h * -f.current;
    a.start({
      y: C,
      immediate: o.goal !== C
    });
  }, [e, n]), Ne(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((h) => h.value === e)) {
      const h = n[0];
      i(h.value);
    }
  }, [n, e]);
  function d(h) {
    const C = h * -f.current;
    a.start({
      y: C
    });
    const p = n[h];
    p && i(p.value);
  }
  const m = (h) => {
    const {
      direction: [, C],
      distance: [, p],
      velocity: [, E],
      offset: [, w],
      last: x
    } = h;
    return {
      direction: C,
      distance: p,
      velocity: E,
      offset: w,
      last: x
    };
  }, b = (h) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), p = 0, {
      direction: E,
      last: w,
      velocity: x,
      offset: k
    } = m(h);
    if (w) {
      l.current = !1;
      const $ = k + x * E * 50, N = _e($, C, p), O = -Math.round(N / f.current);
      d(O);
    } else {
      const $ = k;
      a.start({
        y: oi($, C, p, f.current * 50, 0.2)
      });
    }
  }, g = (h) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), p = 0, {
      direction: E,
      last: w,
      velocity: x,
      distance: k
    } = m(h), $ = -E, N = o.get();
    if (w) {
      l.current = !1;
      const O = x * $ * 50, L = N + k * $ + O, V = _e(L, C, p), M = -Math.round(V / f.current);
      d(M);
    } else {
      const O = N + k * $;
      a.start({
        y: oi(O, C, p, f.current * 50, 0.2)
      });
    }
  };
  St((h) => {
    h.event.stopPropagation(), b(h);
  }, {
    axis: "y",
    from: () => [0, o.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), E3((h) => {
    h.event.stopPropagation(), g(h);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, o.get()],
    preventDefault: !0,
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  });
  let y = null;
  function v() {
    if (y === null)
      return null;
    const h = n[y], C = y - 1, p = y + 1, E = n[C], w = n[p];
    return s.createElement("div", {
      className: `${pt}-column-accessible`
    }, s.createElement("div", {
      className: `${pt}-column-accessible-current`,
      role: "button",
      "aria-label": h ? `当前选择的是：${h.label}` : "当前未选择"
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
        w && d(p);
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
  }, n.map((h, C) => {
    var p;
    const E = t.value === h.value;
    E && (y = C);
    function w() {
      l.current = !1, d(C);
    }
    return s.createElement("div", {
      key: (p = h.key) !== null && p !== void 0 ? p : h.value,
      "data-selected": E,
      className: j(`${pt}-column-item`, {
        [`${pt}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${pt}-column-item-label`
    }, r(h)));
  })), v());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !Ka(t.column, e.column)));
Gf.displayName = "Wheel";
function Pc(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Xf(t, e) {
  const n = Pc(() => (typeof t == "function" ? t(e) : t).map((a) => a.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = Pc(() => e.map((o, a) => {
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
function Qf(t, e) {
  return oe(() => Xf(t, e), [t, e]);
}
const Jf = (t) => t.label;
var ed = { exports: {} }, td = {};
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
function P4(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var R4 = typeof Object.is == "function" ? Object.is : P4, M4 = or.useState, I4 = or.useEffect, A4 = or.useLayoutEffect, T4 = or.useDebugValue;
function L4(t, e) {
  var n = e(), r = M4({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, o = r[1];
  return A4(function() {
    i.value = n, i.getSnapshot = e, ha(i) && o({ inst: i });
  }, [t, n, e]), I4(function() {
    return ha(i) && o({ inst: i }), t(function() {
      ha(i) && o({ inst: i });
    });
  }, [t]), T4(n), n;
}
function ha(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !R4(t, n);
  } catch {
    return !0;
  }
}
function D4(t, e) {
  return e();
}
var V4 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? D4 : L4;
td.useSyncExternalStore = or.useSyncExternalStore !== void 0 ? or.useSyncExternalStore : V4;
ed.exports = td;
var j4 = ed.exports;
let Qs = !1;
const Ya = /* @__PURE__ */ new Set();
function nd() {
  Ya.forEach((t) => {
    t();
  });
}
function j7() {
  Qs = !0, nd(), st.assign({
    skipAnimation: !0
  });
}
function B7() {
  Qs = !1, nd(), st.assign({
    skipAnimation: !1
  });
}
function Rc() {
  return Qs;
}
function B4(t) {
  return Ya.add(t), () => {
    Ya.delete(t);
  };
}
function W4() {
  return j4.useSyncExternalStore(B4, Rc, Rc);
}
const va = "adm-spin-loading", Z4 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, H4 = {
  color: "default"
}, z4 = 15 * 3.14159265358979 * 2, Js = Ve((t) => {
  var e;
  const n = z(H4, t), r = W4(), {
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
    className: va,
    style: {
      "--color": (e = Z4[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${va}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(ye.circle, {
    className: `${va}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: z4,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), Gn = "adm-picker-view", U4 = {
  defaultValue: [],
  renderLabel: Jf,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${Gn}-loading-content`
  }, s.createElement(Js, null))
}, Qo = Ve((t) => {
  const e = z(U4, t), [n, r] = Y(e.value === void 0 ? e.defaultValue : e.value);
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
  const i = Qf(e.columns, n), o = i.columns;
  X0(() => {
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
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, o.map((l, c) => s.createElement(Gf, {
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
const Ht = "adm-picker", q4 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: Jf,
  destroyOnClose: !1,
  forceRender: !1
}, el = Ve(ve((t, e) => {
  var n;
  const {
    locale: r
  } = se(), i = z(q4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [o, a] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (v) => {
      var h;
      v === !1 && ((h = i.onClose) === null || h === void 0 || h.call(i));
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
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (v) => {
      var h;
      const C = Xf(i.columns, v);
      (h = i.onConfirm) === null || h === void 0 || h.call(i, v, C);
    }
  })), f = Qf(i.columns, c), [d, m] = Y(c);
  X(() => {
    d !== c && m(c);
  }, [o]), X(() => {
    o || m(c);
  }, [c]);
  const b = jt((v, h) => {
    var C;
    m(v), o && ((C = i.onSelect) === null || C === void 0 || C.call(i, v, h));
  }), g = W(i, s.createElement("div", {
    className: Ht
  }, s.createElement("div", {
    className: `${Ht}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Ht}-header-button`,
    onClick: () => {
      var v;
      (v = i.onCancel) === null || v === void 0 || v.call(i), a(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Ht}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: j(`${Ht}-header-button`, i.loading && `${Ht}-header-button-disabled`),
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
    className: j(`${Ht}-popup`, i.popupClassName),
    visible: o,
    position: "bottom",
    onMaskClick: () => {
      var v;
      i.closeOnMaskClick && ((v = i.onCancel) === null || v === void 0 || v.call(i), a(!1));
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
el.displayName = "Picker";
function K4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(el, Object.assign({}, t, {
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
const rd = fe(el, {
  prompt: K4
});
function id(t) {
  const e = oe(() => {
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
const od = ve((t, e) => {
  const {
    options: n
  } = t, r = dr(t, ["options"]), i = id(n);
  return s.createElement(rd, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function Y4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(od, Object.assign({}, t, {
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
const W7 = fe(od, {
  prompt: Y4
}), Z7 = (t) => {
  const {
    options: e
  } = t, n = dr(t, ["options"]), r = id(e);
  return s.createElement(Qo, Object.assign({}, n, {
    columns: r
  }));
}, je = "adm-tabs", G4 = () => null, X4 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, Q4 = (t) => {
  var e;
  const n = z(X4, t), r = D(null), i = D(null), o = {};
  let a = null;
  const l = [], c = n.direction === "rtl";
  fn(n.children, (w, x) => {
    if (!An(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    x === 0 && (a = k);
    const $ = l.push(w);
    o[k] = $ - 1;
  });
  const [u, f] = ae({
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
    leftMaskOpacity: v,
    rightMaskOpacity: h
  }, C] = Me(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function p(w = !1, x = !1) {
    const k = r.current;
    if (!k)
      return;
    const $ = o[u];
    if ($ === void 0) {
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
    const O = k.children.item($ + 1), L = O.children.item(0), V = L.offsetLeft, M = L.offsetWidth, _ = O.offsetLeft, I = O.offsetWidth, F = k.offsetWidth, S = k.scrollWidth, R = k.scrollLeft, P = N.offsetWidth;
    let A = 0, B = 0;
    if (n.activeLineMode === "auto" ? (A = V, B = M) : n.activeLineMode === "full" ? (A = _, B = I) : A = V + (M - P) / 2, c) {
      const K = ["auto", "full"].includes(n.activeLineMode) ? B : P;
      A = -(F - A - K);
    }
    b.start({
      x: A,
      width: B,
      immediate: w
    });
    const H = S - F;
    if (H <= 0)
      return;
    let q = 0;
    c ? q = -_e(F / 2 - V + M / 2 - P, 0, H) : q = _e(V - (F - M) / 2, 0, H), (!x || n.autoScroll !== !1) && y.start({
      scrollLeft: q,
      from: {
        scrollLeft: R
      },
      immediate: w
    });
  }
  Ne(() => {
    p(!d.isAnimating);
  }, []), bi(() => {
    p();
  }, [u]), Ei(() => {
    p(!d.isAnimating);
  }, r), Xs(() => {
    p(!d.isAnimating, !0);
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
    let $ = !1, N = !1;
    c ? ($ = Math.round(-k) + x.offsetWidth < x.scrollWidth, N = k < 0) : ($ = k > 0, N = k + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: $ ? 1 : 0,
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
    className: j(`${je}-header-mask`, `${je}-header-mask-left`),
    style: {
      opacity: v
    }
  }), s.createElement(ye.div, {
    className: j(`${je}-header-mask`, `${je}-header-mask-right`),
    style: {
      opacity: h
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
    className: j(`${je}-tab-wrapper`, {
      [`${je}-tab-wrapper-stretch`]: n.stretch
    })
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: x
      } = w;
      w.props.disabled || x != null && f(x.toString());
    },
    className: j(`${je}-tab`, {
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
}, Mc = fe(Q4, {
  Tab: G4
}), Fr = "adm-list", J4 = {
  mode: "default"
}, ev = ve((t, e) => {
  const n = z(J4, t), r = D(null);
  return Ee(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: j(Fr, `${Fr}-${n.mode}`),
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
const Ft = "adm-list-item", tv = (t) => {
  var e, n;
  const {
    arrow: r,
    arrowIcon: i
  } = t, {
    list: o = {}
  } = se(), a = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, l = (n = r ?? i) !== null && n !== void 0 ? n : a, c = un(o.arrowIcon, r !== !0 ? r : null, i !== !0 ? i : null), u = s.createElement("div", {
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
  }, c || s.createElement(b2, null)));
  return W(t, s.createElement(a ? "a" : "div", {
    className: j(`${Ft}`, a ? ["adm-plain-anchor"] : [], t.disabled && `${Ft}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, u));
}, xt = fe(ev, {
  Item: tv
}), ad = ys(null), nv = "adm-check-list", rv = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(vf, null)
}, iv = (t) => {
  const {
    checkList: e = {}
  } = se(), n = z(rv, e, t), [r, i] = ae(n);
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
  return s.createElement(ad.Provider, {
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
    className: nv
  }, n.children)));
}, Li = "adm-check-list-item", ov = (t) => {
  const e = Qe(ad);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, o = e.extra ? e.extra(n) : i, a = s.createElement("div", {
    className: `${Li}-extra`
  }, o);
  return W(t, s.createElement(xt.Item, {
    title: t.title,
    className: j(Li, r && `${Li}-readonly`, n && `${Li}-active`),
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
}, Ic = fe(iv, {
  Item: ov
});
function av(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function Ac(t, e) {
  e || (e = {});
  var n = e.vargs || av(t), r = [], i = /* @__PURE__ */ new Map(), o, a, l = function(b) {
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
        for (var v = -1; ++v < b && u(arguments[v], r[y][v]); )
          ;
        if (v === b)
          return r[y].val;
      }
    return r[y] = arguments, !c || c(y), arguments.val = t.apply(this, r[y]);
  } : m = function() {
    for (var b = f || arguments.length, g = r.length, y = -1; ++y < g; )
      if (r[y].length === b) {
        for (var v = -1; ++v < b && arguments[v] === r[y][v]; )
          ;
        if (v === b)
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
function sd(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = oe(() => Ac((l) => {
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
    equals: Ka
  }), [t]), o = oe(() => Ac((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: Ka
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
const tl = [];
function sv(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ai = "adm-skeleton", nl = (t) => W(t, s.createElement("div", {
  className: j(ai, {
    [`${ai}-animated`]: t.animated
  })
})), lv = (t) => W(t, s.createElement(nl, {
  animated: t.animated,
  className: `${ai}-title`
})), cv = {
  lineCount: 3
}, uv = (t) => {
  const e = z(cv, t), n = sv(1, e.lineCount), r = s.createElement("div", {
    className: `${ai}-paragraph`
  }, n.map((i) => s.createElement(nl, {
    key: i,
    animated: e.animated,
    className: `${ai}-paragraph-line`
  })));
  return W(e, r);
}, Di = fe(nl, {
  Title: lv,
  Paragraph: uv
}), wi = (t = {}) => oe(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: o = "children"
  } = t;
  return [n, r, o, i];
}, [JSON.stringify(t)]), ft = "adm-cascader-view", fv = {
  defaultValue: []
}, dv = (t) => {
  const e = z(fv, t), {
    locale: n
  } = se(), [r, i, o, a] = wi(e.fieldNames), l = sd(e.options, {
    valueName: i,
    childrenName: o
  }), [c, u] = ae(Object.assign(Object.assign({}, e), {
    onChange: (v) => {
      var h;
      (h = e.onChange) === null || h === void 0 || h.call(e, v, l(v));
    }
  })), [f, d] = Y(0), m = oe(() => {
    const v = [];
    let h = e.options, C = !1;
    for (const p of c) {
      const E = h.find((w) => w[i] === p);
      if (v.push({
        selected: E,
        options: h
      }), !E || !E[o]) {
        C = !0;
        break;
      }
      h = E[o];
    }
    return C || v.push({
      selected: void 0,
      options: h
    }), v;
  }, [c, e.options]);
  Es(() => {
    var v;
    (v = e.onTabsChange) === null || v === void 0 || v.call(e, f);
  }, [f]), X(() => {
    d(m.length - 1);
  }, [c]), X(() => {
    const v = m.length - 1;
    f > v && d(v);
  }, [f, m]);
  const b = (v, h) => {
    const C = c.slice(0, h);
    v !== void 0 && (C[h] = v), u(C);
  }, g = (v) => e.loading || v === tl, y = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: ft
  }, s.createElement(Mc, {
    activeKey: f.toString(),
    onChange: (v) => {
      const h = parseInt(v);
      d(h);
    },
    stretch: !1,
    className: `${ft}-tabs`
  }, m.map((v, h) => {
    const C = v.selected;
    return s.createElement(Mc.Tab, {
      key: h.toString(),
      title: s.createElement("div", {
        className: `${ft}-header-title`
      }, C ? C[r] : typeof y == "function" ? y(h) : y),
      forceRender: !0
    }, s.createElement("div", {
      className: `${ft}-content`
    }, g(v.options) ? s.createElement("div", {
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
    })) : s.createElement(Ic, {
      value: [c[h]],
      onChange: (p) => b(p[0], h),
      activeIcon: e.activeIcon
    }, v.options.map((p) => {
      const E = c[h] === p[i];
      return s.createElement(Ic.Item, {
        value: p[i],
        key: p[i],
        disabled: p[a],
        className: j(`${ft}-item`, {
          [`${ft}-item-active`]: E
        })
      }, p[r]);
    }))));
  }))));
}, mv = fe(dv, {
  optionSkeleton: tl
}), Bn = "adm-cascader", hv = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, ld = ve((t, e) => {
  var n;
  const {
    locale: r
  } = se(), i = z(hv, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [o, a] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (h) => {
      var C;
      h === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
    }
  }), l = {
    toggle: () => {
      a((h) => !h);
    },
    open: () => {
      a(!0);
    },
    close: () => {
      a(!1);
    }
  };
  Ee(e, () => l);
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, h, m(h));
    }
  })), [, f, d] = wi(i.fieldNames), m = sd(i.options, {
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
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), a(!1);
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
  }, s.createElement(mv, Object.assign({}, i, {
    value: b,
    onChange: (h, C) => {
      var p;
      g(h), o && ((p = i.onSelect) === null || p === void 0 || p.call(i, h, C));
    }
  }))))), v = s.createElement(br, {
    visible: o,
    position: "bottom",
    onMaskClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), a(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, y);
  return s.createElement(s.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function vv(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(ld, Object.assign({}, t, {
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
const H7 = fe(ld, {
  prompt: vv,
  optionSkeleton: tl
}), Nr = "adm-center-popup", pv = Object.assign(Object.assign({}, Ws), {
  getContainer: null
}), cd = (t) => {
  const {
    popup: e = {}
  } = se(), n = z(pv, e, t), r = ks(), i = Me({
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
  const l = D(null);
  Oo(l, n.disableBodyScroll && o);
  const c = gf(o && n.visible), u = s.createElement("div", {
    className: j(`${Nr}-body`, n.bodyClassName),
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
    className: j(`${Nr}-mask`, n.maskClassName),
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
    className: j(`${Nr}-close`, "adm-plain-anchor"),
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
}, ud = ys(null), gv = {
  disabled: !1,
  defaultValue: []
}, yv = (t) => {
  const e = z(gv, t), [n, r] = ae(e);
  return s.createElement(
    ud.Provider,
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
}, fd = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), bv = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), dd = (t) => {
  const e = D(null), n = jt((r) => {
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
}, zt = "adm-checkbox", Ev = {
  defaultChecked: !1,
  indeterminate: !1
}, wv = ve((t, e) => {
  const n = Qe(ud), r = z(Ev, t);
  let [i, o] = ae({
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
  }, r.indeterminate ? s.createElement(bv, null) : i && s.createElement(fd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: j(zt, {
      [`${zt}-checked`]: i && !r.indeterminate,
      [`${zt}-indeterminate`]: r.indeterminate,
      [`${zt}-disabled`]: a,
      [`${zt}-block`]: r.block
    })
  }, s.createElement(dd, {
    type: "checkbox",
    checked: i,
    onChange: o,
    disabled: a,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${zt}-content`
  }, r.children)));
}), Tc = fe(wv, {
  Group: yv
}), $n = "adm-collapse", Cv = () => null, xv = (t) => {
  const {
    visible: e
  } = t, n = D(null), r = To(e, t.forceRender, t.destroyOnClose), [{
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
  return B0(() => {
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
        return c = Uf(a, {
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
    className: j(`${$n}-panel-content`, {
      [`${$n}-panel-content-active`]: e
    }),
    style: {
      height: i.to((a) => i.idle && e ? "auto" : a)
    }
  }, s.createElement("div", {
    className: `${$n}-panel-content-inner`,
    ref: n
  }, s.createElement(xt.Item, null, r && t.children)));
}, kv = (t) => {
  const {
    collapse: e = {}
  } = se(), n = z(e, t), r = [];
  fn(n.children, (c) => {
    !An(c) || typeof c.key != "string" || r.push(c);
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
  }, [o, a] = ae(i()), l = o === null ? [] : Array.isArray(o) ? o : [o];
  return W(n, s.createElement("div", {
    className: $n
  }, s.createElement(xt, null, r.map((c) => {
    const u = c.key, f = l.includes(u);
    function d(g) {
      var y, v;
      n.accordion ? a(f ? [] : [u]) : a(f ? l.filter((h) => h !== u) : [...l, u]), (v = (y = c.props).onClick) === null || v === void 0 || v.call(y, g);
    }
    const m = un(s.createElement(pf, null), n.arrow, n.arrowIcon, c.props.arrow, c.props.arrowIcon), b = typeof m == "function" ? m(f) : s.createElement("div", {
      className: j(`${$n}-arrow`, {
        [`${$n}-arrow-active`]: f
      })
    }, m);
    return s.createElement(s.Fragment, {
      key: u
    }, W(c.props, s.createElement(xt.Item, {
      className: `${$n}-panel-header`,
      onClick: d,
      disabled: c.props.disabled,
      arrowIcon: b
    }, c.props.title)), s.createElement(xv, {
      visible: f,
      forceRender: !!c.props.forceRender,
      destroyOnClose: !!c.props.destroyOnClose
    }, c.props.children));
  }))));
}, z7 = fe(kv, {
  Panel: Cv
});
var md = { exports: {} };
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
})(md);
var $v = md.exports;
const hd = /* @__PURE__ */ Ot($v);
var vd = { exports: {} };
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
})(vd);
var _v = vd.exports;
const pd = /* @__PURE__ */ Ot(_v), ar = "TILL_NOW";
pe.extend(Bo);
pe.extend(hd);
pe.extend(pd);
const Ut = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Ov(t, e, n, r, i, o, a) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), g = n.getFullYear(), y = n.getMonth() + 1, v = n.getDate(), h = n.getHours(), C = n.getMinutes(), p = n.getSeconds(), E = Ut[r], w = parseInt(t[0]), x = pe(Ga([t[0], t[1], "1"])), k = parseInt(t[1]), $ = parseInt(t[2]), N = parseInt(t[3]), O = parseInt(t[4]), L = w === c, V = w === g, M = L && k === u, _ = V && k === y, I = M && $ === f, F = _ && $ === v, S = I && N === d, R = F && N === h, P = S && O === m, A = R && O === C, B = (H, q, K) => {
    let G = [];
    for (let ce = H; ce <= q; ce++)
      G.push(ce);
    const Q = t.slice(0, Ut[K]), ne = o == null ? void 0 : o[K];
    return ne && typeof ne == "function" && (G = G.filter((ce) => ne(ce, {
      get date() {
        const U = [...Q, ce.toString()];
        return Ga(U);
      }
    }))), G;
  };
  if (E >= Ut.year) {
    const K = B(c, g, "year");
    l.push(K.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.month) {
    const K = B(L ? u : 1, V ? y : 12, "month");
    l.push(K.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.day) {
    const H = M ? f : 1, q = _ ? v : x.daysInMonth(), K = B(H, q, "day");
    l.push(K.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.hour) {
    const K = B(I ? d : 0, F ? h : 23, "hour");
    l.push(K.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.minute) {
    const K = B(S ? m : 0, R ? C : 59, "minute");
    l.push(K.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.second) {
    const K = B(P ? b : 0, A ? p : 59, "second");
    l.push(K.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (a && (l[0].push({
    label: i("now", null),
    value: ar
  }), ar === (t == null ? void 0 : t[0])))
    for (let H = 1; H < l.length; H += 1)
      l[H] = [];
  return l;
}
function Sv(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function Ga(t) {
  var e, n, r, i, o, a;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (o = t[4]) !== null && o !== void 0 ? o : "0", m = (a = t[5]) !== null && a !== void 0 ? a : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
pe.extend(Bo);
pe.extend(hd);
pe.extend(pd);
const Pr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function Fv(t, e, n, r, i, o) {
  const a = [], l = e.getFullYear(), c = n.getFullYear(), u = Pr[r], f = parseInt(t[0]), d = f === l, m = f === c, b = pe(e), g = pe(n), y = b.isoWeek(), v = g.isoWeek(), h = b.isoWeekday(), C = g.isoWeekday(), p = parseInt(t[1]), E = d && p === y, w = m && p === v, x = pe(`${f}-01-01`).isoWeeksInYear(), k = ($, N, O) => {
    let L = [];
    for (let _ = $; _ <= N; _++)
      L.push(_);
    const V = t.slice(0, Pr[O]), M = o == null ? void 0 : o[O];
    return M && typeof M == "function" && (L = L.filter((_) => M(_, {
      get date() {
        const I = [...V, _.toString()];
        return gd(I);
      }
    }))), L;
  };
  if (u >= Pr.year) {
    const O = k(l, c, "year");
    a.push(O.map((L) => ({
      label: i("year", L),
      value: L.toString()
    })));
  }
  if (u >= Pr.week) {
    const O = k(d ? y : 1, m ? v : x, "week");
    a.push(O.map((L) => ({
      label: i("week", L),
      value: L.toString()
    })));
  }
  if (u >= Pr["week-day"]) {
    const O = k(E ? h : 1, w ? C : 7, "week-day");
    a.push(O.map((L) => ({
      label: i("week-day", L),
      value: L.toString()
    })));
  }
  return a;
}
function Nv(t) {
  if (!t)
    return [];
  const e = pe(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function gd(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", o = (n = t[1]) !== null && n !== void 0 ? n : "1", a = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return pe().year(parseInt(i)).isoWeek(parseInt(o)).isoWeekday(parseInt(a)).hour(0).minute(0).second(0).toDate();
}
const Pv = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, yd = (t, e) => {
  if (e.includes("week"))
    return Nv(t);
  {
    const n = e;
    return Sv(t).slice(0, Pv[n]);
  }
}, Xa = (t, e) => {
  if ((t == null ? void 0 : t[0]) === ar) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? gd(t) : Ga(t);
}, bd = (t, e, n, r, i, o, a) => r.startsWith("week") ? Fv(t, e, n, r, i, o) : Ov(t, e, n, r, i, o, a);
function Ed(t) {
  const {
    locale: e
  } = se();
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
const Lc = (/* @__PURE__ */ new Date()).getFullYear(), Rv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Lc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Lc + 10)),
  precision: "day",
  defaultValue: null
}, wd = ve((t, e) => {
  const n = z(Rv, t), {
    renderLabel: r
  } = n, [i, o] = ae({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), a = oe(() => /* @__PURE__ */ new Date(), []), l = Ed(r), c = oe(() => {
    let m = i ?? a;
    return m.tillNow ? [ar] : (m = new Date(_e(m.getTime(), n.min.getTime(), n.max.getTime())), yd(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = He((m) => {
    const b = Xa(m, n.precision);
    o(b, !0);
  }, [o, n.precision]), f = jt((m) => {
    var b;
    const g = Xa(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, g);
  }), d = He((m) => bd(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return W(n, s.createElement(rd, {
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
function Mv(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, o] = Y(!1);
      return X(() => {
        o(!0);
      }, []), s.createElement(wd, Object.assign({}, t, {
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
const U7 = fe(wd, {
  prompt: Mv,
  DATE_NOW: ar
}), Dc = (/* @__PURE__ */ new Date()).getFullYear(), Iv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Dc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Dc + 10)),
  precision: "day"
}, q7 = (t) => {
  var e;
  const n = z(Iv, t), {
    renderLabel: r
  } = n, [i, o] = ae({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), a = Ed(r), l = oe(() => i != null && i.tillNow ? [ar, null, null] : yd(i, n.precision), [i, n.precision]), c = He((u) => {
    var f;
    const d = Xa(u, n.precision);
    d && (o(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Qo, {
    columns: (u) => bd(u, n.min, n.max, n.precision, a, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Av = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(Lt, {
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
}, Tv = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, Cd = (t) => {
  const e = z(Tv, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
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
    className: j(gt("content"), !e.content && gt("content-empty"))
  }, typeof e.content == "string" ? s.createElement(ii, null, e.content) : e.content), s.createElement("div", {
    className: gt("footer")
  }, e.actions.map((r, i) => {
    const o = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: gt("action-row"),
      key: i
    }, o.map((a, l) => s.createElement(Av, {
      key: a.key,
      action: a,
      onAction: () => Se(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = a.onClick) === null || c === void 0 ? void 0 : c.call(a), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, a, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(cd, {
    className: j(gt(), e.className),
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
    bodyClassName: j(gt("body"), e.image && gt("with-image"), e.bodyClassName),
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
const Qa = /* @__PURE__ */ new Set();
function rl(t) {
  const e = wr(s.createElement(Cd, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Qa.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Qa.add(e.close), e;
}
function Lv(t) {
  const e = {
    confirmText: fi().locale.Dialog.ok
  }, n = z(e, t);
  return new Promise((r) => {
    rl(Object.assign(Object.assign({}, n), {
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
const Dv = {
  confirmText: "确认",
  cancelText: "取消"
};
function Vv(t) {
  const {
    locale: e
  } = fi(), n = z(Dv, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    rl(Object.assign(Object.assign({}, n), {
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
function jv() {
  Qa.forEach((t) => {
    t();
  });
}
const K7 = fe(Cd, {
  show: rl,
  alert: Lv,
  confirm: Vv,
  clear: jv
}), xd = s.createContext(null), At = "adm-dropdown-item", Bv = (t) => {
  const {
    dropdown: e = {}
  } = se(), n = z(e, t), {
    active: r,
    highlight: i,
    onClick: o,
    title: a
  } = n, l = j(At, {
    [`${At}-active`]: r,
    [`${At}-highlight`]: i ?? r
  }), c = s.useContext(xd), u = un(s.createElement(m2, null), c, n.arrow, n.arrowIcon);
  return W(t, s.createElement("div", {
    className: l,
    onClick: o
  }, s.createElement("div", {
    className: `${At}-title`
  }, s.createElement("span", {
    className: `${At}-title-text`
  }, a), s.createElement("span", {
    className: j(`${At}-title-arrow`, {
      [`${At}-title-arrow-active`]: r
    })
  }, u))));
}, Wv = Bv, Zv = (t) => {
  const {
    active: e = !1
  } = t, n = To(e, t.forceRender, t.destroyOnClose), r = j(`${At}-content`, {
    [`${At}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, Wn = "adm-dropdown", Hv = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Ws.getContainer
}, zv = ve((t, e) => {
  const {
    dropdown: n = {}
  } = se(), r = z(Hv, n, t), i = un(n.arrowIcon, t.arrow, t.arrowIcon), [o, a] = ae({
    value: r.activeKey,
    defaultValue: r.defaultActiveKey,
    onChange: r.onChange
  }), l = D(null), c = D(null);
  Su(() => {
    r.closeOnClickAway && a(null);
  }, [l, c]);
  const [u, f] = Y(), d = D(null);
  X(() => {
    const v = d.current;
    if (v && o) {
      const h = v.getBoundingClientRect();
      f(h.bottom);
    }
  }, [o]);
  const m = (v) => {
    a(o === v ? null : v);
  };
  let b = !1;
  const g = [], y = s.Children.map(r.children, (v) => {
    if (An(v)) {
      const h = Object.assign(Object.assign({}, v.props), {
        onClick: (C) => {
          var p, E;
          m(v.key), (E = (p = v.props).onClick) === null || E === void 0 || E.call(p, C);
        },
        active: v.key === o
      });
      return g.push(v), v.props.forceRender && (b = !0), w1(v, h);
    } else
      return v;
  });
  return Ee(e, () => ({
    close: () => {
      a(null);
    }
  }), [a]), W(r, s.createElement("div", {
    className: j(Wn, {
      [`${Wn}-open`]: !!o
    }),
    ref: d
  }, s.createElement(xd.Provider, {
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
  }, g.map((v) => {
    const h = v.key === o;
    return s.createElement(Zv, {
      key: v.key,
      active: h,
      forceRender: v.props.forceRender,
      destroyOnClose: v.props.destroyOnClose
    }, v.props.children);
  })))));
}), Uv = zv, Y7 = fe(Uv, {
  Item: Wv
});
var Vc;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(Vc || (Vc = {}));
const qv = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var jc;
function Xi(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += Kv(n + r, t), tp(t[n + r]) && r++, Qv(t[n + r]) && r++, Jv(t[n + r]) && r++, np(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function Kv(t, e) {
  const n = e[t];
  if (!Yv(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Bc(r) && Bc(i) ? 4 : Gv(r) && ep(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : Xv(i) ? 4 : 2;
}
function Yv(t) {
  return t && Tn(t[0].charCodeAt(0), 55296, 56319);
}
function Bc(t) {
  return Tn(il(t), 127462, 127487);
}
function Gv(t) {
  return Tn(il(t), 127988, 127988);
}
function Xv(t) {
  return Tn(il(t), 127995, 127999);
}
function Qv(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 65024, 65039);
}
function Jv(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 8400, 8447);
}
function ep(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && Tn(e, 917504, 917631);
}
function tp(t) {
  return typeof t == "string" && qv.includes(t.charCodeAt(0));
}
function np(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function il(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function Tn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(jc || (jc = {}));
const rp = "adm-ellipsis", ip = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, G7 = (t) => {
  const e = z(ip, t), n = D(null), r = D(null), i = D(null), [o, a] = Y({}), [l, c] = Y(e.defaultExpanded), [u, f] = Y(!1), d = oe(() => Xi(e.content), [e.content]);
  function m(h, C) {
    return d.slice(h, C).join("");
  }
  function b() {
    var h, C;
    const p = n.current;
    if (!p)
      return;
    const E = p.style.display;
    p.style.display = "block";
    const w = window.getComputedStyle(p), x = document.createElement("div");
    Array.prototype.slice.apply(w).forEach((O) => {
      x.style.setProperty(O, w.getPropertyValue(O));
    }), p.style.display = E, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const $ = pa(w.lineHeight), N = Math.floor($ * (e.rows + 0.5) + pa(w.paddingTop) + pa(w.paddingBottom));
    if (x.innerText = e.content, document.body.appendChild(x), x.offsetHeight <= N)
      f(!1);
    else {
      let _ = function(R, P) {
        if (P - R <= 1)
          return e.direction === "end" ? {
            leading: m(0, R) + "..."
          } : {
            tailing: "..." + m(P, O)
          };
        const A = Math.round((R + P) / 2);
        return e.direction === "end" ? x.innerHTML = m(0, A) + "..." + M : x.innerHTML = M + "..." + m(A, O), x.offsetHeight <= N ? e.direction === "end" ? _(A, P) : _(R, A) : e.direction === "end" ? _(R, A) : _(A, P);
      }, I = function(R, P) {
        if (R[1] - R[0] <= 1 && P[1] - P[0] <= 1)
          return {
            leading: m(0, R[0]) + "...",
            tailing: "..." + m(P[1], O)
          };
        const A = Math.floor((R[0] + R[1]) / 2), B = Math.ceil((P[0] + P[1]) / 2);
        return x.innerHTML = m(0, A) + "..." + M + "..." + m(B, O), x.offsetHeight <= N ? I([A, R[1]], [P[0], B]) : I([R[0], A], [B, P[1]]);
      };
      f(!0);
      const O = e.content.length, L = typeof e.collapseText == "string" ? e.collapseText : (h = i.current) === null || h === void 0 ? void 0 : h.innerHTML, V = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, M = l ? L : V, F = Math.floor((0 + O) / 2), S = e.direction === "middle" ? I([0, F], [F, O]) : _(0, O);
      a(S);
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
  }, e.collapseText)), v = () => u ? l ? s.createElement(s.Fragment, null, e.content, y) : s.createElement(s.Fragment, null, o.leading, g, o.tailing) : e.content;
  return W(e, s.createElement("div", {
    ref: n,
    className: rp,
    onClick: (h) => {
      h.target === h.currentTarget && e.onContentClick(h);
    }
  }, v()));
};
function pa(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const op = (t) => W(t, s.createElement("svg", {
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
}))))), Rr = "adm-empty", X7 = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(op, {
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
    className: j(`${Rr}-description`)
  }, t.description)));
}, dn = "adm-error-block", ap = {
  status: "default"
};
function sp(t) {
  return (n) => {
    var r;
    const i = z(ap, n), {
      locale: o
    } = se(), a = o.ErrorBlock[i.status], l = "description" in i ? i.description : a.description, c = "title" in i ? i.title : a.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, s.createElement("div", {
      className: j(dn, {
        [`${dn}-full-page`]: i.fullPage
      })
    }, s.createElement("div", {
      className: `${dn}-image`
    }, f), s.createElement("div", {
      className: `${dn}-description`
    }, ![void 0, null].includes(c) && s.createElement("div", {
      className: `${dn}-description-title`
    }, c), ![void 0, null].includes(l) && s.createElement("div", {
      className: `${dn}-description-subtitle`
    }, l)), i.children && s.createElement("div", {
      className: `${dn}-content`
    }, i.children)));
  };
}
const lp = s.createElement("svg", {
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
}))), cp = s.createElement("svg", {
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
})))), up = s.createElement("svg", {
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
})))), fp = s.createElement("svg", {
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
})))), dp = {
  default: lp,
  disconnected: cp,
  empty: up,
  busy: fp
}, Q7 = sp(dp), Vi = "adm-floating-bubble", mp = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, J7 = (t) => {
  const e = z(mp, t), n = D(null), r = D(null), [i, o] = Y(e.offset === void 0 ? e.defaultOffset : e.offset);
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
      const v = n.current, h = r.current;
      if (!v || !h)
        return;
      const C = v.getBoundingClientRect(), p = h.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = a.goal - a.get(), w = p.left + E - C.left, x = C.right - (p.right + E);
        x <= w ? b += x : b -= w;
      } else if (e.magnetic === "y") {
        const E = l.goal - l.get(), w = p.top + E - C.top, x = C.bottom - (p.bottom + E);
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
      transform: Hh([a, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${Vi}-button`,
    ref: r
  }), e.children)));
};
function ol(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Mr = "adm-floating-panel", hp = {
  handleDraggingOfContent: !0
}, e8 = ve((t, e) => {
  var n, r;
  const i = z(hp, t), {
    anchors: o
  } = i, a = (n = o[o.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, l = o.map((C) => -C), c = D(null), u = D(null), f = D(null), [d, m] = Y(!1), b = D(!1), g = {
    top: l[l.length - 1],
    bottom: l[0]
  }, y = jt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: v
  }, h] = Me(() => ({
    y: g.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      y(-C.value.y, v.isAnimating);
    }
  }));
  return St((C) => {
    const [, p] = C.offset;
    if (C.first) {
      const x = C.event.target, k = u.current;
      if (k === x || k != null && k.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const $ = v.goal <= g.top, N = f.current;
        if (!N)
          return;
        $ ? N.scrollTop <= 0 && C.direction[1] > 0 && (b.current = !0) : b.current = !0;
      }
    }
    if (m(b.current), !b.current)
      return;
    const {
      event: E
    } = C;
    E.cancelable && Nn && E.preventDefault(), E.stopPropagation();
    let w = p;
    C.last && (b.current = !1, m(!1), w = ol(l, p)), h.start({
      y: w
    });
  }, {
    axis: "y",
    bounds: g,
    rubberband: !0,
    from: () => [0, v.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  }), Ee(e, () => ({
    setHeight: (C, p) => {
      h.start({
        y: -C,
        immediate: p == null ? void 0 : p.immediate
      });
    }
  }), [h]), Oo(c, !0), W(i, s.createElement(ye.div, {
    ref: c,
    className: Mr,
    style: {
      height: Math.round(a),
      translateY: v.to((C) => `calc(100% + (${Math.round(C)}px))`)
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
function vp(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function al(t, e) {
  if (t == null)
    return {};
  var n = vp(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (i = 0; i < o.length; i++)
      r = o[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function Ci(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Wc(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, Bf(r.key), r);
  }
}
function xi(t, e, n) {
  return e && Wc(t.prototype, e), n && Wc(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function kd(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Ja(t, e) {
  return Ja = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ja(t, e);
}
function pp(t, e) {
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
  }), e && Ja(t, e);
}
function yo(t) {
  return yo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, yo(t);
}
function gp() {
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
function yp(t, e) {
  if (e && (ze(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return kd(t);
}
function bp(t) {
  var e = gp();
  return function() {
    var r = yo(t), i;
    if (e) {
      var o = yo(this).constructor;
      i = Reflect.construct(r, arguments, o);
    } else
      i = r.apply(this, arguments);
    return yp(this, i);
  };
}
function es(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(es(r)) : po.isFragment(r) && r.props ? n = n.concat(es(r.props.children, e)) : n.push(r));
  }), n;
}
var _n = "RC_FORM_INTERNAL_HOOKS", me = function() {
  vt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Mn = /* @__PURE__ */ T.createContext({
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
});
function ts(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Dt() {
  Dt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(F, S, R) {
    F[S] = R.value;
  }, o = typeof Symbol == "function" ? Symbol : {}, a = o.iterator || "@@iterator", l = o.asyncIterator || "@@asyncIterator", c = o.toStringTag || "@@toStringTag";
  function u(F, S, R) {
    return Object.defineProperty(F, S, {
      value: R,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), F[S];
  }
  try {
    u({}, "");
  } catch {
    u = function(R, P, A) {
      return R[P] = A;
    };
  }
  function f(F, S, R, P) {
    var A = S && S.prototype instanceof h ? S : h, B = Object.create(A.prototype), H = new _(P || []);
    return i(B, "_invoke", {
      value: O(F, R, H)
    }), B;
  }
  function d(F, S, R) {
    try {
      return {
        type: "normal",
        arg: F.call(S, R)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  e.wrap = f;
  var m = "suspendedStart", b = "suspendedYield", g = "executing", y = "completed", v = {};
  function h() {
  }
  function C() {
  }
  function p() {
  }
  var E = {};
  u(E, a, function() {
    return this;
  });
  var w = Object.getPrototypeOf, x = w && w(w(I([])));
  x && x !== n && r.call(x, a) && (E = x);
  var k = p.prototype = h.prototype = Object.create(E);
  function $(F) {
    ["next", "throw", "return"].forEach(function(S) {
      u(F, S, function(R) {
        return this._invoke(S, R);
      });
    });
  }
  function N(F, S) {
    function R(A, B, H, q) {
      var K = d(F[A], F, B);
      if (K.type !== "throw") {
        var G = K.arg, Q = G.value;
        return Q && ze(Q) == "object" && r.call(Q, "__await") ? S.resolve(Q.__await).then(function(ne) {
          R("next", ne, H, q);
        }, function(ne) {
          R("throw", ne, H, q);
        }) : S.resolve(Q).then(function(ne) {
          G.value = ne, H(G);
        }, function(ne) {
          return R("throw", ne, H, q);
        });
      }
      q(K.arg);
    }
    var P;
    i(this, "_invoke", {
      value: function(B, H) {
        function q() {
          return new S(function(K, G) {
            R(B, H, K, G);
          });
        }
        return P = P ? P.then(q, q) : q();
      }
    });
  }
  function O(F, S, R) {
    var P = m;
    return function(A, B) {
      if (P === g)
        throw new Error("Generator is already running");
      if (P === y) {
        if (A === "throw")
          throw B;
        return {
          value: t,
          done: !0
        };
      }
      for (R.method = A, R.arg = B; ; ) {
        var H = R.delegate;
        if (H) {
          var q = L(H, R);
          if (q) {
            if (q === v)
              continue;
            return q;
          }
        }
        if (R.method === "next")
          R.sent = R._sent = R.arg;
        else if (R.method === "throw") {
          if (P === m)
            throw P = y, R.arg;
          R.dispatchException(R.arg);
        } else
          R.method === "return" && R.abrupt("return", R.arg);
        P = g;
        var K = d(F, S, R);
        if (K.type === "normal") {
          if (P = R.done ? y : b, K.arg === v)
            continue;
          return {
            value: K.arg,
            done: R.done
          };
        }
        K.type === "throw" && (P = y, R.method = "throw", R.arg = K.arg);
      }
    };
  }
  function L(F, S) {
    var R = S.method, P = F.iterator[R];
    if (P === t)
      return S.delegate = null, R === "throw" && F.iterator.return && (S.method = "return", S.arg = t, L(F, S), S.method === "throw") || R !== "return" && (S.method = "throw", S.arg = new TypeError("The iterator does not provide a '" + R + "' method")), v;
    var A = d(P, F.iterator, S.arg);
    if (A.type === "throw")
      return S.method = "throw", S.arg = A.arg, S.delegate = null, v;
    var B = A.arg;
    return B ? B.done ? (S[F.resultName] = B.value, S.next = F.nextLoc, S.method !== "return" && (S.method = "next", S.arg = t), S.delegate = null, v) : B : (S.method = "throw", S.arg = new TypeError("iterator result is not an object"), S.delegate = null, v);
  }
  function V(F) {
    var S = {
      tryLoc: F[0]
    };
    1 in F && (S.catchLoc = F[1]), 2 in F && (S.finallyLoc = F[2], S.afterLoc = F[3]), this.tryEntries.push(S);
  }
  function M(F) {
    var S = F.completion || {};
    S.type = "normal", delete S.arg, F.completion = S;
  }
  function _(F) {
    this.tryEntries = [{
      tryLoc: "root"
    }], F.forEach(V, this), this.reset(!0);
  }
  function I(F) {
    if (F || F === "") {
      var S = F[a];
      if (S)
        return S.call(F);
      if (typeof F.next == "function")
        return F;
      if (!isNaN(F.length)) {
        var R = -1, P = function A() {
          for (; ++R < F.length; )
            if (r.call(F, R))
              return A.value = F[R], A.done = !1, A;
          return A.value = t, A.done = !0, A;
        };
        return P.next = P;
      }
    }
    throw new TypeError(ze(F) + " is not iterable");
  }
  return C.prototype = p, i(k, "constructor", {
    value: p,
    configurable: !0
  }), i(p, "constructor", {
    value: C,
    configurable: !0
  }), C.displayName = u(p, c, "GeneratorFunction"), e.isGeneratorFunction = function(F) {
    var S = typeof F == "function" && F.constructor;
    return !!S && (S === C || (S.displayName || S.name) === "GeneratorFunction");
  }, e.mark = function(F) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(F, p) : (F.__proto__ = p, u(F, c, "GeneratorFunction")), F.prototype = Object.create(k), F;
  }, e.awrap = function(F) {
    return {
      __await: F
    };
  }, $(N.prototype), u(N.prototype, l, function() {
    return this;
  }), e.AsyncIterator = N, e.async = function(F, S, R, P, A) {
    A === void 0 && (A = Promise);
    var B = new N(f(F, S, R, P), A);
    return e.isGeneratorFunction(S) ? B : B.next().then(function(H) {
      return H.done ? H.value : B.next();
    });
  }, $(k), u(k, c, "Generator"), u(k, a, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(F) {
    var S = Object(F), R = [];
    for (var P in S)
      R.push(P);
    return R.reverse(), function A() {
      for (; R.length; ) {
        var B = R.pop();
        if (B in S)
          return A.value = B, A.done = !1, A;
      }
      return A.done = !0, A;
    };
  }, e.values = I, _.prototype = {
    constructor: _,
    reset: function(S) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(M), !S)
        for (var R in this)
          R.charAt(0) === "t" && r.call(this, R) && !isNaN(+R.slice(1)) && (this[R] = t);
    },
    stop: function() {
      this.done = !0;
      var S = this.tryEntries[0].completion;
      if (S.type === "throw")
        throw S.arg;
      return this.rval;
    },
    dispatchException: function(S) {
      if (this.done)
        throw S;
      var R = this;
      function P(G, Q) {
        return H.type = "throw", H.arg = S, R.next = G, Q && (R.method = "next", R.arg = t), !!Q;
      }
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var B = this.tryEntries[A], H = B.completion;
        if (B.tryLoc === "root")
          return P("end");
        if (B.tryLoc <= this.prev) {
          var q = r.call(B, "catchLoc"), K = r.call(B, "finallyLoc");
          if (q && K) {
            if (this.prev < B.catchLoc)
              return P(B.catchLoc, !0);
            if (this.prev < B.finallyLoc)
              return P(B.finallyLoc);
          } else if (q) {
            if (this.prev < B.catchLoc)
              return P(B.catchLoc, !0);
          } else {
            if (!K)
              throw new Error("try statement without catch or finally");
            if (this.prev < B.finallyLoc)
              return P(B.finallyLoc);
          }
        }
      }
    },
    abrupt: function(S, R) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var A = this.tryEntries[P];
        if (A.tryLoc <= this.prev && r.call(A, "finallyLoc") && this.prev < A.finallyLoc) {
          var B = A;
          break;
        }
      }
      B && (S === "break" || S === "continue") && B.tryLoc <= R && R <= B.finallyLoc && (B = null);
      var H = B ? B.completion : {};
      return H.type = S, H.arg = R, B ? (this.method = "next", this.next = B.finallyLoc, v) : this.complete(H);
    },
    complete: function(S, R) {
      if (S.type === "throw")
        throw S.arg;
      return S.type === "break" || S.type === "continue" ? this.next = S.arg : S.type === "return" ? (this.rval = this.arg = S.arg, this.method = "return", this.next = "end") : S.type === "normal" && R && (this.next = R), v;
    },
    finish: function(S) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var P = this.tryEntries[R];
        if (P.finallyLoc === S)
          return this.complete(P.completion, P.afterLoc), M(P), v;
      }
    },
    catch: function(S) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var P = this.tryEntries[R];
        if (P.tryLoc === S) {
          var A = P.completion;
          if (A.type === "throw") {
            var B = A.arg;
            M(P);
          }
          return B;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(S, R, P) {
      return this.delegate = {
        iterator: I(S),
        resultName: R,
        nextLoc: P
      }, this.method === "next" && (this.arg = t), v;
    }
  }, e;
}
function Zc(t, e, n, r, i, o, a) {
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
        Zc(o, r, i, a, l, "next", c);
      }
      function l(c) {
        Zc(o, r, i, a, l, "throw", c);
      }
      a(void 0);
    });
  };
}
function On() {
  return On = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, On.apply(this, arguments);
}
function Ep(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, si(t, e);
}
function ns(t) {
  return ns = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ns(t);
}
function si(t, e) {
  return si = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, si(t, e);
}
function wp() {
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
  return wp() ? Qi = Reflect.construct.bind() : Qi = function(i, o, a) {
    var l = [null];
    l.push.apply(l, o);
    var c = Function.bind.apply(i, l), u = new c();
    return a && si(u, a.prototype), u;
  }, Qi.apply(null, arguments);
}
function Cp(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function rs(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return rs = function(r) {
    if (r === null || !Cp(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Qi(r, arguments, ns(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), si(i, r);
  }, rs(t);
}
var xp = /%[sdj%]/g, kp = function() {
};
typeof process < "u" && process.env;
function is(t) {
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
    var a = t.replace(xp, function(l) {
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
function $p(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Pe(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || $p(e) && typeof t == "string" && !t);
}
function _p(t, e, n) {
  var r = [], i = 0, o = t.length;
  function a(l) {
    r.push.apply(r, l || []), i++, i === o && n(r);
  }
  t.forEach(function(l) {
    e(l, a);
  });
}
function Hc(t, e, n) {
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
function Op(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var zc = /* @__PURE__ */ function(t) {
  Ep(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ rs(Error));
function Sp(t, e, n, r, i) {
  if (e.first) {
    var o = new Promise(function(m, b) {
      var g = function(h) {
        return r(h), h.length ? b(new zc(h, is(h))) : m(i);
      }, y = Op(t);
      Hc(y, n, g);
    });
    return o.catch(function(m) {
      return m;
    }), o;
  }
  var a = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, b) {
    var g = function(v) {
      if (f.push.apply(f, v), u++, u === c)
        return r(f), f.length ? b(new zc(f, is(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(y) {
      var v = t[y];
      a.indexOf(y) !== -1 ? Hc(v, n, g) : _p(v, n, g);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Fp(t) {
  return !!(t && t.message !== void 0);
}
function Np(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Uc(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = Np(e, t.fullFields) : r = e[n.field || t.fullField], Fp(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function qc(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = On({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var $d = function(e, n, r, i, o, a) {
  e.required && (!r.hasOwnProperty(e.field) || Pe(n, a || e.type)) && i.push(Xe(o.messages.required, e.fullField));
}, Pp = function(e, n, r, i, o) {
  (/^\s+$/.test(n) || n === "") && i.push(Xe(o.messages.whitespace, e.fullField));
}, ji, Rp = function() {
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
  c.v4 = function(p) {
    return p && p.exact ? a : new RegExp("" + e(p) + n + e(p), "g");
  }, c.v6 = function(p) {
    return p && p.exact ? l : new RegExp("" + e(p) + i + e(p), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", g = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", v = "(?::\\d{2,5})?", h = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + g + y + ")" + v + h;
  return ji = new RegExp("(?:^" + C + "$)", "i"), ji;
}, Kc = {
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
    return typeof e == "string" && e.length <= 320 && !!e.match(Kc.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Rp());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Kc.hex);
  }
}, Mp = function(e, n, r, i, o) {
  if (e.required && n === void 0) {
    $d(e, n, r, i, o);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  a.indexOf(l) > -1 ? Wr[l](n) || i.push(Xe(o.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(Xe(o.messages.types[l], e.fullField, e.type));
}, Ip = function(e, n, r, i, o) {
  var a = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", g = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (f = n.length), b && (f = n.replace(u, "_").length), a ? f !== e.len && i.push(Xe(o.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(Xe(o.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(Xe(o.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(Xe(o.messages[d].range, e.fullField, e.min, e.max));
}, Zn = "enum", Ap = function(e, n, r, i, o) {
  e[Zn] = Array.isArray(e[Zn]) ? e[Zn] : [], e[Zn].indexOf(n) === -1 && i.push(Xe(o.messages[Zn], e.fullField, e[Zn].join(", ")));
}, Tp = function(e, n, r, i, o) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(Xe(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var a = new RegExp(e.pattern);
      a.test(n) || i.push(Xe(o.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, re = {
  required: $d,
  whitespace: Pp,
  type: Mp,
  range: Ip,
  enum: Ap,
  pattern: Tp
}, Lp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "string") && !e.required)
      return r();
    re.required(e, n, i, a, o, "string"), Pe(n, "string") || (re.type(e, n, i, a, o), re.range(e, n, i, a, o), re.pattern(e, n, i, a, o), e.whitespace === !0 && re.whitespace(e, n, i, a, o));
  }
  r(a);
}, Dp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && re.type(e, n, i, a, o);
  }
  r(a);
}, Vp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && (re.type(e, n, i, a, o), re.range(e, n, i, a, o));
  }
  r(a);
}, jp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && re.type(e, n, i, a, o);
  }
  r(a);
}, Bp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), Pe(n) || re.type(e, n, i, a, o);
  }
  r(a);
}, Wp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && (re.type(e, n, i, a, o), re.range(e, n, i, a, o));
  }
  r(a);
}, Zp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && (re.type(e, n, i, a, o), re.range(e, n, i, a, o));
  }
  r(a);
}, Hp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    re.required(e, n, i, a, o, "array"), n != null && (re.type(e, n, i, a, o), re.range(e, n, i, a, o));
  }
  r(a);
}, zp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && re.type(e, n, i, a, o);
  }
  r(a);
}, Up = "enum", qp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o), n !== void 0 && re[Up](e, n, i, a, o);
  }
  r(a);
}, Kp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "string") && !e.required)
      return r();
    re.required(e, n, i, a, o), Pe(n, "string") || re.pattern(e, n, i, a, o);
  }
  r(a);
}, Yp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n, "date") && !e.required)
      return r();
    if (re.required(e, n, i, a, o), !Pe(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), re.type(e, c, i, a, o), c && re.range(e, c.getTime(), i, a, o);
    }
  }
  r(a);
}, Gp = function(e, n, r, i, o) {
  var a = [], l = Array.isArray(n) ? "array" : typeof n;
  re.required(e, n, i, a, o, l), r(a);
}, ga = function(e, n, r, i, o) {
  var a = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Pe(n, a) && !e.required)
      return r();
    re.required(e, n, i, l, o, a), Pe(n, a) || re.type(e, n, i, l, o);
  }
  r(l);
}, Xp = function(e, n, r, i, o) {
  var a = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Pe(n) && !e.required)
      return r();
    re.required(e, n, i, a, o);
  }
  r(a);
}, Kr = {
  string: Lp,
  method: Dp,
  number: Vp,
  boolean: jp,
  regexp: Bp,
  integer: Wp,
  float: Zp,
  array: Hp,
  object: zp,
  enum: qp,
  pattern: Kp,
  date: Yp,
  url: ga,
  hex: ga,
  email: ga,
  required: Gp,
  any: Xp
};
function os() {
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
var as = os(), ki = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = as, this.define(n);
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
    return r && (this._messages = qc(os(), r)), this._messages;
  }, e.validate = function(r, i, o) {
    var a = this;
    i === void 0 && (i = {}), o === void 0 && (o = function() {
    });
    var l = r, c = i, u = o;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, l), Promise.resolve(l);
    function f(y) {
      var v = [], h = {};
      function C(E) {
        if (Array.isArray(E)) {
          var w;
          v = (w = v).concat.apply(w, E);
        } else
          v.push(E);
      }
      for (var p = 0; p < y.length; p++)
        C(y[p]);
      v.length ? (h = is(v), u(v, h)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === as && (d = os()), qc(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(y) {
      var v = a.rules[y], h = l[y];
      v.forEach(function(C) {
        var p = C;
        typeof p.transform == "function" && (l === r && (l = On({}, l)), h = l[y] = p.transform(h)), typeof p == "function" ? p = {
          validator: p
        } : p = On({}, p), p.validator = a.getValidationMethod(p), p.validator && (p.field = y, p.fullField = p.fullField || y, p.type = a.getType(p), m[y] = m[y] || [], m[y].push({
          rule: p,
          value: h,
          source: l,
          field: y
        }));
      });
    });
    var g = {};
    return Sp(m, c, function(y, v) {
      var h = y.rule, C = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      C = C && (h.required || !h.required && y.value), h.field = y.field;
      function p(x, k) {
        return On({}, k, {
          fullField: h.fullField + "." + x,
          fullFields: h.fullFields ? [].concat(h.fullFields, [x]) : [x]
        });
      }
      function E(x) {
        x === void 0 && (x = []);
        var k = Array.isArray(x) ? x : [x];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && h.message !== void 0 && (k = [].concat(h.message));
        var $ = k.map(Uc(h, l));
        if (c.first && $.length)
          return g[h.field] = 1, v($);
        if (!C)
          v($);
        else {
          if (h.required && !y.value)
            return h.message !== void 0 ? $ = [].concat(h.message).map(Uc(h, l)) : c.error && ($ = [c.error(h, Xe(c.messages.required, h.field))]), v($);
          var N = {};
          h.defaultField && Object.keys(y.value).map(function(V) {
            N[V] = h.defaultField;
          }), N = On({}, N, y.rule.fields);
          var O = {};
          Object.keys(N).forEach(function(V) {
            var M = N[V], _ = Array.isArray(M) ? M : [M];
            O[V] = _.map(p.bind(null, V));
          });
          var L = new t(O);
          L.messages(c.messages), y.rule.options && (y.rule.options.messages = c.messages, y.rule.options.error = c.error), L.validate(y.value, y.rule.options || c, function(V) {
            var M = [];
            $ && $.length && M.push.apply(M, $), V && V.length && M.push.apply(M, V), v(M.length ? M : null);
          });
        }
      }
      var w;
      if (h.asyncValidator)
        w = h.asyncValidator(h, y.value, E, y.source, c);
      else if (h.validator) {
        try {
          w = h.validator(h, y.value, E, y.source, c);
        } catch (x) {
          console.error == null || console.error(x), c.suppressValidatorError || setTimeout(function() {
            throw x;
          }, 0), E(x.message);
        }
        w === !0 ? E() : w === !1 ? E(typeof h.message == "function" ? h.message(h.fullField || h.field) : h.message || (h.fullField || h.field) + " fails") : w instanceof Array ? E(w) : w instanceof Error && E(w.message);
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
ki.warning = kp;
ki.messages = as;
ki.validators = Kr;
var Ye = "'${name}' is not a valid ${type}", _d = {
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
function ea(t) {
  return Array.isArray(t) ? Jp(t) : ze(t) === "object" && t !== null ? Qp(t) : t;
}
function Qp(t) {
  if (Object.getPrototypeOf(t) === Object.prototype) {
    var e = {};
    for (var n in t)
      e[n] = ea(t[n]);
    return e;
  }
  return t;
}
function Jp(t) {
  return t.map(function(e) {
    return ea(e);
  });
}
function $e(t) {
  return ts(t);
}
function en(t, e) {
  var n = jf(t, e);
  return n;
}
function Gt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = m4(t, e, n, r);
  return i;
}
function Yc(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = en(t, r);
    n = Gt(n, r, i);
  }), n;
}
function Yr(t, e) {
  return t && t.some(function(n) {
    return Sd(n, e);
  });
}
function Gc(t) {
  return ze(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function Od(t, e) {
  var n = Array.isArray(t) ? ue(t) : le({}, t);
  return e && Object.keys(e).forEach(function(r) {
    var i = n[r], o = e[r], a = Gc(i) && Gc(o);
    n[r] = a ? Od(i, o || {}) : ea(o);
  }), n;
}
function Ji(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, o) {
    return Od(i, o);
  }, t);
}
function Sd(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function eg(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || ze(t) !== "object" || ze(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return ue(i).every(function(o) {
    var a = t[o], l = e[o];
    return typeof a == "function" && typeof l == "function" ? !0 : a === l;
  });
}
function tg(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && ze(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function Xc(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], o = e - n;
  return o > 0 ? [].concat(ue(t.slice(0, n)), [i], ue(t.slice(n, e)), ue(t.slice(e + 1, r))) : o < 0 ? [].concat(ue(t.slice(0, e)), ue(t.slice(e + 1, n + 1)), [i], ue(t.slice(n + 1, r))) : t;
}
var ng = ki;
function rg(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var Qc = "CODE_LOGIC_ERROR";
function ss(t, e, n, r, i) {
  return ls.apply(this, arguments);
}
function ls() {
  return ls = Jo(/* @__PURE__ */ Dt().mark(function t(e, n, r, i, o) {
    var a, l, c, u, f, d, m, b, g;
    return Dt().wrap(function(v) {
      for (; ; )
        switch (v.prev = v.next) {
          case 0:
            return a = le({}, r), delete a.ruleIndex, a.validator && (l = a.validator, a.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (h) {
                return console.error(h), Promise.reject(Qc);
              }
            }), c = null, a && a.type === "array" && a.defaultField && (c = a.defaultField, delete a.defaultField), u = new ng(De({}, e, [a])), f = Ji({}, _d, i.validateMessages), u.messages(f), d = [], v.prev = 9, v.next = 12, Promise.resolve(u.validate(De({}, e, n), le({}, i)));
          case 12:
            v.next = 17;
            break;
          case 14:
            v.prev = 14, v.t0 = v.catch(9), v.t0.errors && (d = v.t0.errors.map(function(h, C) {
              var p = h.message, E = p === Qc ? f.default : p;
              return /* @__PURE__ */ T.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                T.cloneElement(E, {
                  key: "error_".concat(C)
                })
              ) : E;
            }));
          case 17:
            if (!(!d.length && c)) {
              v.next = 22;
              break;
            }
            return v.next = 20, Promise.all(n.map(function(h, C) {
              return ss("".concat(e, ".").concat(C), h, c, i, o);
            }));
          case 20:
            return m = v.sent, v.abrupt("return", m.reduce(function(h, C) {
              return [].concat(ue(h), ue(C));
            }, []));
          case 22:
            return b = le(le({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, o), g = d.map(function(h) {
              return typeof h == "string" ? rg(h, b) : h;
            }), v.abrupt("return", g);
          case 25:
          case "end":
            return v.stop();
        }
    }, t, null, [[9, 14]]);
  })), ls.apply(this, arguments);
}
function ig(t, e, n, r, i, o) {
  var a = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, b = le(le({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(g, y, v) {
      var h = !1, C = function() {
        for (var w = arguments.length, x = new Array(w), k = 0; k < w; k++)
          x[k] = arguments[k];
        Promise.resolve().then(function() {
          vt(!h, "Your validator function has already return a promise. `callback` will be ignored."), h || v.apply(void 0, x);
        });
      }, p = m(g, y, C);
      h = p && typeof p.then == "function" && typeof p.catch == "function", vt(h, "`callback` is deprecated. Please return a promise instead."), h && p.then(function() {
        v();
      }).catch(function(E) {
        v(E || " ");
      });
    }), b;
  }).sort(function(f, d) {
    var m = f.warningOnly, b = f.ruleIndex, g = d.warningOnly, y = d.ruleIndex;
    return !!m == !!g ? b - y : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = Jo(/* @__PURE__ */ Dt().mark(function d(m, b) {
        var g, y, v;
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
                return y = l[g], C.next = 5, ss(a, e, y, r, o);
              case 5:
                if (v = C.sent, !v.length) {
                  C.next = 9;
                  break;
                }
                return b([{
                  errors: v,
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
      return ss(a, e, f, r, o).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? ag(u) : og(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function og(t) {
  return cs.apply(this, arguments);
}
function cs() {
  return cs = Jo(/* @__PURE__ */ Dt().mark(function t(e) {
    return Dt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var o, a = (o = []).concat.apply(o, ue(i));
              return a;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), cs.apply(this, arguments);
}
function ag(t) {
  return us.apply(this, arguments);
}
function us() {
  return us = Jo(/* @__PURE__ */ Dt().mark(function t(e) {
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
  })), us.apply(this, arguments);
}
var sg = ["name"], nt = [];
function Jc(t, e, n, r, i, o) {
  return typeof t == "function" ? t(e, n, "source" in o ? {
    source: o.source
  } : {}) : r !== i;
}
var sl = /* @__PURE__ */ function(t) {
  pp(n, t);
  var e = bp(n);
  function n(r) {
    var i;
    if (Ci(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = nt, i.warnings = nt, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, $e(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(ue(m), ue(u)) : [];
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
      u == null || u(le(le({}, i.getMeta()), {}, {
        destroy: c
      }));
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, g = b === void 0 ? [] : b, y = d.onReset, v = f.store, h = i.getNamePath(), C = i.getValue(c), p = i.getValue(v), E = u && Yr(u, h);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== p && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = nt, i.warnings = nt, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = nt, i.warnings = nt, i.triggerMetaEvent(), y == null || y(), i.refresh();
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
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || nt), "warnings" in w && (i.warnings = w.warnings || nt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !h.length && Jc(m, c, v, C, p, f)) {
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
          if (E || (!g.length || h.length || m) && Jc(m, c, v, C, p, f)) {
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
        var m = i.props, b = m.validateFirst, g = b === void 0 ? !1 : b, y = m.messageVariables, v = c || {}, h = v.triggerName, C = i.getRules();
        h && (C = C.filter(function(E) {
          return E;
        }).filter(function(E) {
          var w = E.validateTrigger;
          if (!w)
            return !0;
          var x = ts(w);
          return x.includes(h);
        }));
        var p = ig(u, f, C, c, g, y);
        return p.catch(function(E) {
          return E;
        }).then(function() {
          var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : nt;
          if (i.validatePromise === d) {
            var w;
            i.validatePromise = null;
            var x = [], k = [];
            (w = E.forEach) === null || w === void 0 || w.call(E, function($) {
              var N = $.rule.warningOnly, O = $.errors, L = O === void 0 ? nt : O;
              N ? k.push.apply(k, ue(L)) : x.push.apply(x, ue(L));
            }), i.errors = x, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), p;
      });
      return i.validatePromise = d, i.dirty = !0, i.errors = nt, i.warnings = nt, i.triggerMetaEvent(), i.reRender(), d;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(_n), f = u.getInitialValue;
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
        return le(le({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = es(c);
      return f.length !== 1 || !/* @__PURE__ */ T.isValidElement(f[0]) ? {
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
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, g = u.valuePropName, y = u.getValueProps, v = u.fieldContext, h = d !== void 0 ? d : v.validateTrigger, C = i.getNamePath(), p = v.getInternalHooks, E = v.getFieldsValue, w = p(_n), x = w.dispatch, k = i.getValue(), $ = y || function(V) {
        return De({}, g, V);
      }, N = c[f], O = le(le({}, c), $(k));
      O[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var V, M = arguments.length, _ = new Array(M), I = 0; I < M; I++)
          _[I] = arguments[I];
        m ? V = m.apply(void 0, _) : V = tg.apply(void 0, [g].concat(_)), b && (V = b(V, k, E(!0))), x({
          type: "updateValue",
          namePath: C,
          value: V
        }), N && N.apply(void 0, _);
      };
      var L = ts(h || []);
      return L.forEach(function(V) {
        var M = O[V];
        O[V] = function() {
          M && M.apply(void 0, arguments);
          var _ = i.props.rules;
          _ && _.length && x({
            type: "validateField",
            namePath: C,
            triggerName: V
          });
        };
      }), O;
    }, r.fieldContext) {
      var o = r.fieldContext.getInternalHooks, a = o(_n), l = a.initEntityValue;
      l(kd(i));
    }
    return i;
  }
  return xi(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, o = i.shouldUpdate, a = i.fieldContext;
      if (this.mounted = !0, a) {
        var l = a.getInternalHooks, c = l(_n), u = c.registerField;
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
      return c ? u = l : /* @__PURE__ */ T.isValidElement(l) ? u = /* @__PURE__ */ T.cloneElement(l, this.getControlled(l.props)) : (vt(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ T.createElement(T.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(T.Component);
sl.contextType = Mn;
sl.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function ll(t) {
  var e = t.name, n = al(t, sg), r = T.useContext(Mn), i = e !== void 0 ? $e(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((i || []).join("_"))), /* @__PURE__ */ T.createElement(sl, go({
    key: o,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var lg = /* @__PURE__ */ T.createContext(null), Fd = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, o = e.rules, a = e.validateTrigger, l = T.useContext(Mn), c = T.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = T.useMemo(function() {
    var g = $e(l.prefixName) || [];
    return [].concat(ue(g), ue($e(n)));
  }, [l.prefixName, n]), d = T.useMemo(function() {
    return le(le({}, l), {}, {
      prefixName: f
    });
  }, [l, f]), m = T.useMemo(function() {
    return {
      getKey: function(y) {
        var v = f.length, h = y[v];
        return [u.keys[h], y.slice(v + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return vt(!1, "Form.List only accepts function as children."), null;
  var b = function(y, v, h) {
    var C = h.source;
    return C === "internal" ? !1 : y !== v;
  };
  return /* @__PURE__ */ T.createElement(lg.Provider, {
    value: m
  }, /* @__PURE__ */ T.createElement(Mn.Provider, {
    value: d
  }, /* @__PURE__ */ T.createElement(ll, {
    name: [],
    shouldUpdate: b,
    rules: o,
    validateTrigger: a,
    initialValue: r,
    isList: !0
  }, function(g, y) {
    var v = g.value, h = v === void 0 ? [] : v, C = g.onChange, p = l.getFieldValue, E = function() {
      var $ = p(f || []);
      return $ || [];
    }, w = {
      add: function($, N) {
        var O = E();
        N >= 0 && N <= O.length ? (u.keys = [].concat(ue(u.keys.slice(0, N)), [u.id], ue(u.keys.slice(N))), C([].concat(ue(O.slice(0, N)), [$], ue(O.slice(N))))) : (u.keys = [].concat(ue(u.keys), [u.id]), C([].concat(ue(O), [$]))), u.id += 1;
      },
      remove: function($) {
        var N = E(), O = new Set(Array.isArray($) ? $ : [$]);
        O.size <= 0 || (u.keys = u.keys.filter(function(L, V) {
          return !O.has(V);
        }), C(N.filter(function(L, V) {
          return !O.has(V);
        })));
      },
      move: function($, N) {
        if ($ !== N) {
          var O = E();
          $ < 0 || $ >= O.length || N < 0 || N >= O.length || (u.keys = Xc(u.keys, $, N), C(Xc(O, $, N)));
        }
      }
    }, x = h || [];
    return Array.isArray(x) || (x = []), i(x.map(function(k, $) {
      var N = u.keys[$];
      return N === void 0 && (u.keys[$] = u.id, N = u.keys[$], u.id += 1), {
        name: $,
        key: N,
        isListField: !0
      };
    }), w, y);
  })));
};
function cg(t) {
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
var Nd = "__@field_split__";
function ya(t) {
  return t.map(function(e) {
    return "".concat(ze(e), ":").concat(e);
  }).join(Nd);
}
var Hn = /* @__PURE__ */ function() {
  function t() {
    Ci(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return xi(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(ya(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(ya(n));
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
      this.kvs.delete(ya(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return ue(this.kvs.entries()).map(function(r) {
        var i = on(r, 2), o = i[0], a = i[1], l = o.split(Nd);
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
}(), ug = ["name", "errors"], fg = /* @__PURE__ */ xi(function t(e) {
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
    return r === _n ? (n.formHooked = !0, {
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
    }), Yc(n.store, a.map($e));
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
    var f = n.getFieldEntities(!0), d = function(v) {
      return v.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Hn();
    c.forEach(function(y) {
      m.set(y, []);
    }), f.forEach(function(y) {
      var v = y.getNamePath();
      c.forEach(function(h) {
        h.every(function(C, p) {
          return v[p] === C;
        }) && m.update(h, function(C) {
          return [].concat(ue(C), [y]);
        });
      });
    });
    var b = function(v) {
      return v.some(d);
    }, g = m.map(function(y) {
      var v = y.value;
      return v;
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
              (!r.skipExist || y === void 0) && n.updateStore(Gt(n.store, m, ue(g)[0].value));
            }
          }
        }
      });
    }, l;
    r.entities ? l = r.entities : r.namePathList ? (l = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = l).push.apply(f, ue(ue(u).map(function(d) {
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
      var c = al(a, ug), u = $e(l);
      o.push(u), "value" in c && n.updateStore(Gt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: a
      });
    }), n.notifyWatch(o);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(o) {
      var a = o.getNamePath(), l = o.getMeta(), c = le(le({}, l), {}, {
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
            !Sd(d.getNamePath(), i)
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
      var a = le(le({}, o), {}, {
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
      relatedFields: [i].concat(ue(o))
    }), o;
  }, this.updateValue = function(r, i) {
    var o = $e(r), a = n.store;
    n.updateStore(Gt(n.store, o, i)), n.notifyObservers(a, [o], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([o]);
    var l = n.triggerDependenciesUpdate(a, o), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Yc(n.store, [o]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([o].concat(ue(l)));
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
          var b = f.validateRules(le({
            validateMessages: le(le({}, _d), n.validateMessages)
          }, i));
          l.push(b.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(g) {
            var y, v = [], h = [];
            return (y = g.forEach) === null || y === void 0 || y.call(g, function(C) {
              var p = C.rule.warningOnly, E = C.errors;
              p ? h.push.apply(h, ue(E)) : v.push.apply(v, ue(E));
            }), v.length ? Promise.reject({
              name: m,
              errors: v,
              warnings: h
            }) : {
              name: m,
              errors: v,
              warnings: h
            };
          }));
        }
      }
    });
    var c = cg(l);
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
function cl(t) {
  var e = T.useRef(), n = T.useState({}), r = on(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var o = function() {
        i({});
      }, a = new fg(o);
      e.current = a.getForm();
    }
  return [e.current];
}
var fs = /* @__PURE__ */ T.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), dg = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, o = e.children, a = T.useContext(fs), l = T.useRef({});
  return /* @__PURE__ */ T.createElement(fs.Provider, {
    value: le(le({}, a), {}, {
      validateMessages: le(le({}, a.validateMessages), n),
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
        u && (l.current = le(le({}, l.current), {}, De({}, u, f))), a.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = le({}, l.current);
        delete f[u], l.current = f, a.unregisterForm(u);
      }
    })
  }, o);
}, mg = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], hg = function(e, n) {
  var r = e.name, i = e.initialValues, o = e.fields, a = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, g = e.onValuesChange, y = e.onFieldsChange, v = e.onFinish, h = e.onFinishFailed, C = al(e, mg), p = T.useContext(fs), E = cl(a), w = on(E, 1), x = w[0], k = x.getInternalHooks(_n), $ = k.useSubscribe, N = k.setInitialValues, O = k.setCallbacks, L = k.setValidateMessages, V = k.setPreserve, M = k.destroyForm;
  T.useImperativeHandle(n, function() {
    return x;
  }), T.useEffect(function() {
    return p.registerForm(r, x), function() {
      p.unregisterForm(r);
    };
  }, [p, x, r]), L(le(le({}, p.validateMessages), d)), O({
    onValuesChange: g,
    onFieldsChange: function(H) {
      if (p.triggerFormChange(r, H), y) {
        for (var q = arguments.length, K = new Array(q > 1 ? q - 1 : 0), G = 1; G < q; G++)
          K[G - 1] = arguments[G];
        y.apply(void 0, [H].concat(K));
      }
    },
    onFinish: function(H) {
      p.triggerFormFinish(r, H), v && v(H);
    },
    onFinishFailed: h
  }), V(l);
  var _ = T.useRef(null);
  N(i, !_.current), _.current || (_.current = !0), T.useEffect(
    function() {
      return M;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var I, F = typeof c == "function";
  if (F) {
    var S = x.getFieldsValue(!0);
    I = c(S, x);
  } else
    I = c;
  $(!F);
  var R = T.useRef();
  T.useEffect(function() {
    eg(R.current || [], o || []) || x.setFields(o || []), R.current = o;
  }, [o, x]);
  var P = T.useMemo(function() {
    return le(le({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), A = /* @__PURE__ */ T.createElement(Mn.Provider, {
    value: P
  }, I);
  return f === !1 ? A : /* @__PURE__ */ T.createElement(f, go({}, C, {
    onSubmit: function(H) {
      H.preventDefault(), H.stopPropagation(), x.submit();
    },
    onReset: function(H) {
      var q;
      H.preventDefault(), x.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, H);
    }
  }), A);
};
function eu(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function ul() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, o = e[1], a = Y(), l = on(a, 2), c = l[0], u = l[1], f = oe(function() {
    return eu(c);
  }, [c]), d = D(f);
  d.current = f;
  var m = Qe(Mn), b = o || m, g = b && b._init, y = $e(i), v = D(y);
  return v.current = y, X(
    function() {
      if (g) {
        var h = b.getFieldsValue, C = b.getInternalHooks, p = C(_n), E = p.registerWatch, w = E(function(k) {
          var $ = en(k, v.current), N = eu($);
          d.current !== N && (d.current = N, u($));
        }), x = en(h(), v.current);
        return u(x), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g]
  ), c;
}
var vg = /* @__PURE__ */ T.forwardRef(hg), Cr = vg;
Cr.FormProvider = dg;
Cr.Field = ll;
Cr.List = Fd;
Cr.useForm = cl;
Cr.useWatch = ul;
const Pd = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, fl = s.createContext(Pd), tu = s.createContext(null), Rd = () => null;
var pg = function(e) {
  return gg(e) && !yg(e);
};
function gg(t) {
  return !!t && typeof t == "object";
}
function yg(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || wg(t);
}
var bg = typeof Symbol == "function" && Symbol.for, Eg = bg ? Symbol.for("react.element") : 60103;
function wg(t) {
  return t.$$typeof === Eg;
}
function Cg(t) {
  return Array.isArray(t) ? [] : {};
}
function li(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? sr(Cg(t), t, e) : t;
}
function xg(t, e, n) {
  return t.concat(e).map(function(r) {
    return li(r, n);
  });
}
function kg(t, e) {
  if (!e.customMerge)
    return sr;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : sr;
}
function $g(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function nu(t) {
  return Object.keys(t).concat($g(t));
}
function Md(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function _g(t, e) {
  return Md(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function Og(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && nu(t).forEach(function(i) {
    r[i] = li(t[i], n);
  }), nu(e).forEach(function(i) {
    _g(t, i) || (Md(t, i) && n.isMergeableObject(e[i]) ? r[i] = kg(i, n)(t[i], e[i], n) : r[i] = li(e[i], n));
  }), r;
}
function sr(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || xg, n.isMergeableObject = n.isMergeableObject || pg, n.cloneUnlessOtherwiseSpecified = li;
  var r = Array.isArray(e), i = Array.isArray(t), o = r === i;
  return o ? r ? n.arrayMerge(t, e, n) : Og(t, e, n) : li(e, n);
}
sr.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return sr(r, i, n);
  }, {});
};
var Sg = sr, Fg = Sg;
const Ng = /* @__PURE__ */ Ot(Fg), Id = (t) => s.createElement(Fd, {
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
}), ru = "adm-form", Pg = Pd, Rg = ve((t, e) => {
  const n = z(Pg, t), {
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
  } = se(), g = oe(() => Ng(b.Form.defaultValidateMessages, m.validateMessages || {}), [b.Form.defaultValidateMessages, m.validateMessages]), y = [];
  let v = null, h = [], C = 0;
  function p() {
    h.length !== 0 && (C += 1, y.push(s.createElement(xt, {
      header: v,
      key: C,
      mode: u
    }, h)), h = []);
  }
  return fn(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === Rd) {
        p(), v = E.props.children;
        return;
      }
      if (E.type === Id) {
        p(), y.push(E);
        return;
      }
    }
    h.push(E);
  }), p(), s.createElement(Cr, Object.assign({
    className: j(ru, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: g
  }), s.createElement(fl.Provider, {
    value: {
      name: m.name,
      hasFeedback: o,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, y), c && s.createElement("div", {
    className: `${ru}-footer`
  }, c));
});
var ci = {}, Ad = { exports: {} }, Td = { exports: {} };
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
})(Td);
var Mg = Td.exports;
(function(t) {
  var e = Mg.default;
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
})(Ad);
var Ig = Ad.exports, Ld = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Ld);
var Ag = Ld.exports, ut = {};
Object.defineProperty(ut, "__esModule", {
  value: !0
});
ut.call = dl;
ut.default = void 0;
ut.note = Vd;
ut.noteOnce = Bd;
ut.preMessage = void 0;
ut.resetWarned = jd;
ut.warning = Dd;
ut.warningOnce = $i;
var ds = {}, Tg = ut.preMessage = function(e) {
};
function Dd(t, e) {
}
function Vd(t, e) {
}
function jd() {
  ds = {};
}
function dl(t, e, n) {
  !e && !ds[n] && (t(!1, n), ds[n] = !0);
}
function $i(t, e) {
  dl(Dd, t, e);
}
function Bd(t, e) {
  dl(Vd, t, e);
}
$i.preMessage = Tg;
$i.resetWarned = jd;
$i.noteOnce = Bd;
ut.default = $i;
var Lg = Ig.default, Dg = Ag.default;
Object.defineProperty(ci, "__esModule", {
  value: !0
});
var Wd = ci.default = ci.HOOK_MARK = void 0, Vg = Dg(ut), jg = Lg(s), Bg = "RC_FORM_INTERNAL_HOOKS";
ci.HOOK_MARK = Bg;
var he = function() {
  (0, Vg.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Wg = /* @__PURE__ */ jg.createContext({
  getFieldValue: he,
  getFieldsValue: he,
  getFieldError: he,
  getFieldWarning: he,
  getFieldsError: he,
  isFieldsTouched: he,
  isFieldTouched: he,
  isFieldValidating: he,
  isFieldsValidating: he,
  resetFields: he,
  setFields: he,
  setFieldValue: he,
  setFieldsValue: he,
  validateFields: he,
  submit: he,
  getInternalHooks: function() {
    return he(), {
      dispatch: he,
      initEntityValue: he,
      registerField: he,
      useSubscribe: he,
      setInitialValues: he,
      destroyForm: he,
      setCallbacks: he,
      registerWatch: he,
      getFields: he,
      setValidateMessages: he,
      setPreserve: he,
      getInitialValue: he
    };
  }
}), Zg = Wg;
Wd = ci.default = Zg;
function Hg(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const zg = Ve((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), Ug = ["top", "right", "bottom", "left"], lr = Math.min, Sn = Math.max, bo = Math.round, Bi = Math.floor, an = (t) => ({
  x: t,
  y: t
}), qg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Kg = {
  start: "end",
  end: "start"
};
function ms(t, e, n) {
  return Sn(t, lr(e, n));
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
function ml(t) {
  return t === "x" ? "y" : "x";
}
function hl(t) {
  return t === "y" ? "height" : "width";
}
function Oi(t) {
  return ["top", "bottom"].includes(ln(t)) ? "y" : "x";
}
function vl(t) {
  return ml(Oi(t));
}
function Yg(t, e, n) {
  n === void 0 && (n = !1);
  const r = _i(t), i = vl(t), o = hl(i);
  let a = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[o] > e.floating[o] && (a = Eo(a)), [a, Eo(a)];
}
function Gg(t) {
  const e = Eo(t);
  return [hs(t), e, hs(e)];
}
function hs(t) {
  return t.replace(/start|end/g, (e) => Kg[e]);
}
function Xg(t, e, n) {
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
function Qg(t, e, n, r) {
  const i = _i(t);
  let o = Xg(ln(t), n === "start", r);
  return i && (o = o.map((a) => a + "-" + i), e && (o = o.concat(o.map(hs)))), o;
}
function Eo(t) {
  return t.replace(/left|right|bottom|top/g, (e) => qg[e]);
}
function Jg(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Zd(t) {
  return typeof t != "number" ? Jg(t) : {
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
function iu(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const o = Oi(e), a = vl(e), l = hl(a), c = ln(e), u = o === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
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
const e5 = async (t, e, n) => {
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
  } = iu(u, r, c), m = r, b = {}, g = 0;
  for (let y = 0; y < l.length; y++) {
    const {
      name: v,
      fn: h
    } = l[y], {
      x: C,
      y: p,
      data: E,
      reset: w
    } = await h({
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
    if (f = C ?? f, d = p ?? d, b = {
      ...b,
      [v]: {
        ...b[v],
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
      } = iu(u, m, c)), y = -1;
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
  } = sn(e, t), g = Zd(b), v = l[m ? d === "floating" ? "reference" : "floating" : d], h = wo(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(v))) == null || n ? v : v.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), C = d === "floating" ? {
    ...a.floating,
    x: r,
    y: i
  } : a.reference, p = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l.floating)), E = await (o.isElement == null ? void 0 : o.isElement(p)) ? await (o.getScale == null ? void 0 : o.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = wo(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: p,
    strategy: c
  }) : C);
  return {
    top: (h.top - w.top + g.top) / E.y,
    bottom: (w.bottom - h.bottom + g.bottom) / E.y,
    left: (h.left - w.left + g.left) / E.x,
    right: (w.right - h.right + g.right) / E.x
  };
}
const t5 = (t) => ({
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
    const d = Zd(f), m = {
      x: n,
      y: r
    }, b = vl(i), g = hl(b), y = await a.getDimensions(u), v = b === "y", h = v ? "top" : "left", C = v ? "bottom" : "right", p = v ? "clientHeight" : "clientWidth", E = o.reference[g] + o.reference[b] - m[b] - o.floating[g], w = m[b] - o.reference[b], x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let k = x ? x[p] : 0;
    (!k || !await (a.isElement == null ? void 0 : a.isElement(x))) && (k = l.floating[p] || o.floating[g]);
    const $ = E / 2 - w / 2, N = k / 2 - y[g] / 2 - 1, O = lr(d[h], N), L = lr(d[C], N), V = O, M = k - y[g] - L, _ = k / 2 - y[g] / 2 + $, I = ms(V, _, M), F = !c.arrow && _i(i) != null && _ != I && o.reference[g] / 2 - (_ < V ? O : L) - y[g] / 2 < 0, S = F ? _ < V ? _ - V : _ - M : 0;
    return {
      [b]: m[b] + S,
      data: {
        [b]: I,
        centerOffset: _ - I - S,
        ...F && {
          alignmentOffset: S
        }
      },
      reset: F
    };
  }
}), n5 = function(t) {
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
        ...v
      } = sn(t, e);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const h = ln(i), C = ln(l) === l, p = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (C || !y ? [Eo(l)] : Gg(l));
      !m && g !== "none" && E.push(...Qg(l, y, g, p));
      const w = [l, ...E], x = await Co(e, v), k = [];
      let $ = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(x[h]), d) {
        const V = Yg(i, a, p);
        k.push(x[V[0]], x[V[1]]);
      }
      if ($ = [...$, {
        placement: i,
        overflows: k
      }], !k.every((V) => V <= 0)) {
        var N, O;
        const V = (((N = o.flip) == null ? void 0 : N.index) || 0) + 1, M = w[V];
        if (M)
          return {
            data: {
              index: V,
              overflows: $
            },
            reset: {
              placement: M
            }
          };
        let _ = (O = $.filter((I) => I.overflows[0] <= 0).sort((I, F) => I.overflows[1] - F.overflows[1])[0]) == null ? void 0 : O.placement;
        if (!_)
          switch (b) {
            case "bestFit": {
              var L;
              const I = (L = $.map((F) => [F.placement, F.overflows.filter((S) => S > 0).reduce((S, R) => S + R, 0)]).sort((F, S) => F[1] - S[1])[0]) == null ? void 0 : L[0];
              I && (_ = I);
              break;
            }
            case "initialPlacement":
              _ = l;
              break;
          }
        if (i !== _)
          return {
            reset: {
              placement: _
            }
          };
      }
      return {};
    }
  };
};
function ou(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function au(t) {
  return Ug.some((e) => t[e] >= 0);
}
const r5 = function(t) {
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
          }), a = ou(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: au(a)
            }
          };
        }
        case "escaped": {
          const o = await Co(e, {
            ...i,
            altBoundary: !0
          }), a = ou(o, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: au(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function i5(t, e) {
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
const o5 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await i5(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, a5 = function(t) {
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
          fn: (v) => {
            let {
              x: h,
              y: C
            } = v;
            return {
              x: h,
              y: C
            };
          }
        },
        ...c
      } = sn(t, e), u = {
        x: n,
        y: r
      }, f = await Co(e, c), d = Oi(ln(i)), m = ml(d);
      let b = u[m], g = u[d];
      if (o) {
        const v = m === "y" ? "top" : "left", h = m === "y" ? "bottom" : "right", C = b + f[v], p = b - f[h];
        b = ms(C, b, p);
      }
      if (a) {
        const v = d === "y" ? "top" : "left", h = d === "y" ? "bottom" : "right", C = g + f[v], p = g - f[h];
        g = ms(C, g, p);
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
}, s5 = function(t) {
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
      }, d = Oi(i), m = ml(d);
      let b = f[m], g = f[d];
      const y = sn(l, e), v = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (c) {
        const p = m === "y" ? "height" : "width", E = o.reference[m] - o.floating[p] + v.mainAxis, w = o.reference[m] + o.reference[p] - v.mainAxis;
        b < E ? b = E : b > w && (b = w);
      }
      if (u) {
        var h, C;
        const p = m === "y" ? "width" : "height", E = ["top", "left"].includes(ln(i)), w = o.reference[d] - o.floating[p] + (E && ((h = a.offset) == null ? void 0 : h[d]) || 0) + (E ? 0 : v.crossAxis), x = o.reference[d] + o.reference[p] + (E ? 0 : ((C = a.offset) == null ? void 0 : C[d]) || 0) - (E ? v.crossAxis : 0);
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
  return Hd(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Je(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Bt(t) {
  var e;
  return (e = (Hd(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Hd(t) {
  return t instanceof Node || t instanceof Je(t).Node;
}
function Vt(t) {
  return t instanceof Element || t instanceof Je(t).Element;
}
function _t(t) {
  return t instanceof HTMLElement || t instanceof Je(t).HTMLElement;
}
function su(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Je(t).ShadowRoot;
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
function l5(t) {
  return ["table", "td", "th"].includes(cn(t));
}
function pl(t) {
  const e = gl(), n = lt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function c5(t) {
  let e = cr(t);
  for (; _t(e) && !ta(e); ) {
    if (pl(e))
      return e;
    e = cr(e);
  }
  return null;
}
function gl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ta(t) {
  return ["html", "body", "#document"].includes(cn(t));
}
function lt(t) {
  return Je(t).getComputedStyle(t);
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
    su(t) && t.host || // Fallback.
    Bt(t)
  );
  return su(e) ? e.host : e;
}
function zd(t) {
  const e = cr(t);
  return ta(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : _t(e) && Si(e) ? e : zd(e);
}
function ui(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = zd(t), o = i === ((r = t.ownerDocument) == null ? void 0 : r.body), a = Je(i);
  return o ? e.concat(a, a.visualViewport || [], Si(i) ? i : [], a.frameElement && n ? ui(a.frameElement) : []) : e.concat(i, ui(i, [], n));
}
function Ud(t) {
  const e = lt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = _t(t), o = i ? t.offsetWidth : n, a = i ? t.offsetHeight : r, l = bo(n) !== o || bo(r) !== a;
  return l && (n = o, r = a), {
    width: n,
    height: r,
    $: l
  };
}
function yl(t) {
  return Vt(t) ? t : t.contextElement;
}
function er(t) {
  const e = yl(t);
  if (!_t(e))
    return an(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = Ud(e);
  let a = (o ? bo(n.width) : n.width) / r, l = (o ? bo(n.height) : n.height) / i;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const u5 = /* @__PURE__ */ an(0);
function qd(t) {
  const e = Je(t);
  return !gl() || !e.visualViewport ? u5 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function f5(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Je(t) ? !1 : e;
}
function In(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), o = yl(t);
  let a = an(1);
  e && (r ? Vt(r) && (a = er(r)) : a = er(t));
  const l = f5(o, n, r) ? qd(o) : an(0);
  let c = (i.left + l.x) / a.x, u = (i.top + l.y) / a.y, f = i.width / a.x, d = i.height / a.y;
  if (o) {
    const m = Je(o), b = r && Vt(r) ? Je(r) : r;
    let g = m.frameElement;
    for (; g && r && b !== m; ) {
      const y = er(g), v = g.getBoundingClientRect(), h = lt(g), C = v.left + (g.clientLeft + parseFloat(h.paddingLeft)) * y.x, p = v.top + (g.clientTop + parseFloat(h.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += C, u += p, g = Je(g).frameElement;
    }
  }
  return wo({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function d5(t) {
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
    const u = In(n);
    l = er(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - a.scrollLeft * l.x + c.x,
    y: e.y * l.y - a.scrollTop * l.y + c.y
  };
}
function m5(t) {
  return Array.from(t.getClientRects());
}
function Kd(t) {
  return In(Bt(t)).left + na(t).scrollLeft;
}
function h5(t) {
  const e = Bt(t), n = na(t), r = t.ownerDocument.body, i = Sn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), o = Sn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Kd(t);
  const l = -n.scrollTop;
  return lt(r).direction === "rtl" && (a += Sn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: a,
    y: l
  };
}
function v5(t, e) {
  const n = Je(t), r = Bt(t), i = n.visualViewport;
  let o = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (i) {
    o = i.width, a = i.height;
    const u = gl();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: l,
    y: c
  };
}
function p5(t, e) {
  const n = In(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, o = _t(t) ? er(t) : an(1), a = t.clientWidth * o.x, l = t.clientHeight * o.y, c = i * o.x, u = r * o.y;
  return {
    width: a,
    height: l,
    x: c,
    y: u
  };
}
function lu(t, e, n) {
  let r;
  if (e === "viewport")
    r = v5(t, n);
  else if (e === "document")
    r = h5(Bt(t));
  else if (Vt(e))
    r = p5(e, n);
  else {
    const i = qd(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return wo(r);
}
function Yd(t, e) {
  const n = cr(t);
  return n === e || !Vt(n) || ta(n) ? !1 : lt(n).position === "fixed" || Yd(n, e);
}
function g5(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = ui(t, [], !1).filter((l) => Vt(l) && cn(l) !== "body"), i = null;
  const o = lt(t).position === "fixed";
  let a = o ? cr(t) : t;
  for (; Vt(a) && !ta(a); ) {
    const l = lt(a), c = pl(a);
    !c && l.position === "fixed" && (i = null), (o ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Si(a) && !c && Yd(t, a)) ? r = r.filter((f) => f !== a) : i = l, a = cr(a);
  }
  return e.set(t, r), r;
}
function y5(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const a = [...n === "clippingAncestors" ? g5(e, this._c) : [].concat(n), r], l = a[0], c = a.reduce((u, f) => {
    const d = lu(e, f, i);
    return u.top = Sn(d.top, u.top), u.right = lr(d.right, u.right), u.bottom = lr(d.bottom, u.bottom), u.left = Sn(d.left, u.left), u;
  }, lu(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function b5(t) {
  return Ud(t);
}
function E5(t, e, n) {
  const r = _t(e), i = Bt(e), o = n === "fixed", a = In(t, !0, o, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = an(0);
  if (r || !r && !o)
    if ((cn(e) !== "body" || Si(i)) && (l = na(e)), r) {
      const u = In(e, !0, o, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = Kd(i));
  return {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function cu(t, e) {
  return !_t(t) || lt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function Gd(t, e) {
  const n = Je(t);
  if (!_t(t))
    return n;
  let r = cu(t, e);
  for (; r && l5(r) && lt(r).position === "static"; )
    r = cu(r, e);
  return r && (cn(r) === "html" || cn(r) === "body" && lt(r).position === "static" && !pl(r)) ? n : r || c5(t) || n;
}
const w5 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || Gd, o = this.getDimensions;
  return {
    reference: E5(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await o(n)
    }
  };
};
function C5(t) {
  return lt(t).direction === "rtl";
}
const x5 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: d5,
  getDocumentElement: Bt,
  getClippingRect: y5,
  getOffsetParent: Gd,
  getElementRects: w5,
  getClientRects: m5,
  getDimensions: b5,
  getScale: er,
  isElement: Vt,
  isRTL: C5
};
function k5(t, e) {
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
    const b = Bi(f), g = Bi(i.clientWidth - (u + d)), y = Bi(i.clientHeight - (f + m)), v = Bi(u), C = {
      rootMargin: -b + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: Sn(0, lr(1, c)) || 1
    };
    let p = !0;
    function E(w) {
      const x = w[0].intersectionRatio;
      if (x !== c) {
        if (!p)
          return a();
        x ? a(!1, x) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 100);
      }
      p = !1;
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
function $5(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = yl(t), f = i || o ? [...u ? ui(u) : [], ...ui(e)] : [];
  f.forEach((h) => {
    i && h.addEventListener("scroll", n, {
      passive: !0
    }), o && h.addEventListener("resize", n);
  });
  const d = u && l ? k5(u, n) : null;
  let m = -1, b = null;
  a && (b = new ResizeObserver((h) => {
    let [C] = h;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let g, y = c ? In(t) : null;
  c && v();
  function v() {
    const h = In(t);
    y && (h.x !== y.x || h.y !== y.y || h.width !== y.width || h.height !== y.height) && n(), y = h, g = requestAnimationFrame(v);
  }
  return n(), () => {
    f.forEach((h) => {
      i && h.removeEventListener("scroll", n), o && h.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(g);
  };
}
const _5 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: x5,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return e5(t, e, {
    ...i,
    platform: o
  });
};
class O5 extends s.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = $1(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return s.Children.only(this.props.children);
  }
}
const S5 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function F5(t) {
  var e;
  return (e = S5[t]) !== null && e !== void 0 ? e : t;
}
let Xn = null, tr = null;
fr && (Xn = document.createElement("div"), Xn.className = "adm-px-tester", Xn.style.setProperty("--size", "10"), document.body.appendChild(Xn), tr = document.createElement("div"), tr.className = "adm-px-tester", document.body.appendChild(tr));
function Fn(t) {
  return Xn === null || tr === null || Xn.getBoundingClientRect().height === 10 ? t : (tr.style.setProperty("--size", t.toString()), tr.getBoundingClientRect().height);
}
const mn = "adm-popover", N5 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, Xd = ve((t, e) => {
  const n = z(N5, t), r = F5(n.placement), [i, o] = ae({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  Ee(e, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: i
  }), [i]);
  const a = D(null), l = D(null), c = D(null), u = rn(n.stopPropagation, W(n, s.createElement("div", {
    className: j(mn, `${mn}-${n.mode}`, {
      [`${mn}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${mn}-arrow`,
    ref: c
  }, s.createElement(zg, {
    className: `${mn}-arrow-icon`
  })), s.createElement("div", {
    className: `${mn}-inner`
  }, s.createElement("div", {
    className: `${mn}-inner-content`
  }, n.content))))), [f, d] = Y(null);
  function m() {
    var g, y, v;
    return Se(this, void 0, void 0, function* () {
      const h = (y = (g = a.current) === null || g === void 0 ? void 0 : g.element) !== null && y !== void 0 ? y : null, C = l.current, p = c.current;
      if (d(h), !h || !C || !p)
        return;
      const {
        x: E,
        y: w,
        placement: x,
        middlewareData: k
      } = yield _5(h, C, {
        placement: r,
        middleware: [o5(Fn(12)), a5({
          padding: Fn(4),
          crossAxis: !1,
          limiter: s5()
        }), n5(), r5(), t5({
          element: p,
          padding: Fn(12)
        })]
      });
      Object.assign(C.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const $ = x.split("-")[0], N = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[$], {
        x: O,
        y: L
      } = (v = k.arrow) !== null && v !== void 0 ? v : {};
      Object.assign(p.style, {
        left: O != null ? `${O}px` : "",
        top: L != null ? `${L}px` : "",
        right: "",
        bottom: "",
        [N]: "calc(var(--arrow-size) * -1)"
      });
      const V = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[$];
      p.style.setProperty("--arrow-icon-rotate", V);
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
      return $5(f, g, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), Su(() => {
    n.trigger && o(!1);
  }, [() => {
    var g;
    return (g = a.current) === null || g === void 0 ? void 0 : g.element;
  }, l], ["click", "touchmove"]);
  const b = To(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(O5, {
    ref: a
  }, n.children), b && pr(n.getContainer, u));
}), qt = "adm-popover-menu", P5 = ve((t, e) => {
  const n = D(null);
  Ee(e, () => n.current, []);
  const r = He((o) => {
    var a;
    const {
      onAction: l
    } = t;
    l && l(o), (a = n.current) === null || a === void 0 || a.hide();
  }, [t.onAction]), i = oe(() => {
    const o = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), a = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${qt}-list`
    }, s.createElement("div", {
      className: j(`${qt}-list-inner`, {
        [`${qt}-list-scroll`]: o
      }),
      style: {
        height: a
      }
    }, t.actions.map((l, c) => {
      var u;
      return s.createElement("a", {
        key: (u = l.key) !== null && u !== void 0 ? u : c,
        className: j(`${qt}-item`, "adm-plain-anchor", {
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
  return s.createElement(Xd, Object.assign({
    ref: n
  }, t, {
    className: j(qt, t.className),
    content: i
  }), t.children);
}), Qd = fe(Xd, {
  Menu: P5
});
function ba(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function R5(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function M5(t) {
  return typeof t == "function" && !R5(t) && t.defaultProps === void 0;
}
function Jd(t) {
  return po.isFragment(t) ? !1 : po.isMemo(t) ? Jd(t.type) : !M5(t.type);
}
const I5 = "__SPLIT__", Be = "adm-form-item", A5 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), T5 = (t) => {
  var e;
  const {
    locale: n,
    form: r = {}
  } = se(), {
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
  } = z(r, t), v = Qe(fl), h = t.hasFeedback !== void 0 ? t.hasFeedback : v.hasFeedback, C = t.layout || v.layout, p = (e = t.disabled) !== null && e !== void 0 ? e : v.disabled, E = (() => {
    const {
      requiredMarkStyle: k
    } = v;
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
  }, a, E, l && s.createElement(Qd, {
    content: l,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${Be}-label-help`,
    onClick: (k) => {
      k.stopPropagation(), k.preventDefault();
    }
  }, c || s.createElement(y2, null)))), x = (!!t.description || h) && s.createElement(s.Fragment, null, t.description, h && s.createElement(s.Fragment, null, t.errors.map((k, $) => s.createElement("div", {
    key: `error-${$}`,
    className: `${Be}-feedback-error`
  }, k)), t.warnings.map((k, $) => s.createElement("div", {
    key: `warning-${$}`,
    className: `${Be}-feedback-warning`
  }, k))));
  return W(t, s.createElement(xt.Item, {
    style: i,
    title: C === "vertical" && w,
    prefix: C === "horizontal" && w,
    extra: o,
    description: x,
    className: j(Be, `${Be}-${C}`, {
      [`${Be}-hidden`]: m,
      [`${Be}-has-error`]: t.errors.length
    }),
    disabled: p,
    onClick: t.onClick,
    clickable: t.clickable,
    arrowIcon: g || b
  }, s.createElement("div", {
    className: j(`${Be}-child`, `${Be}-child-position-${y}`)
  }, s.createElement("div", {
    className: j(`${Be}-child-inner`)
  }, f))));
}, L5 = (t) => {
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
    children: v,
    messageVariables: h,
    trigger: C = "onChange",
    validateTrigger: p = C,
    onClick: E,
    shouldUpdate: w,
    dependencies: x,
    clickable: k,
    arrow: $,
    arrowIcon: N
  } = t, O = dr(t, ["style", "label", "help", "helpIcon", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow", "arrowIcon"]), {
    name: L
  } = Qe(fl), {
    validateTrigger: V
  } = Qe(Wd), M = Hg(p, V, C), _ = D(null), I = D(0);
  I.current += 1;
  const [F, S] = Y({}), R = He((K, G) => {
    S((Q) => {
      const ne = Object.assign({}, Q), ce = G.join(I5);
      return K.destroy ? delete ne[ce] : ne[ce] = K, ne;
    });
  }, [S]);
  function P(K, G, Q, ne) {
    var ce, U;
    if (u && !f)
      return K;
    const te = (ce = Q == null ? void 0 : Q.errors) !== null && ce !== void 0 ? ce : [], ee = Object.keys(F).reduce((we, Ue) => {
      var et, qe;
      const xr = (qe = (et = F[Ue]) === null || et === void 0 ? void 0 : et.errors) !== null && qe !== void 0 ? qe : [];
      return xr.length && (we = [...we, ...xr]), we;
    }, te), xe = (U = Q == null ? void 0 : Q.warnings) !== null && U !== void 0 ? U : [], be = Object.keys(F).reduce((we, Ue) => {
      var et, qe;
      const xr = (qe = (et = F[Ue]) === null || et === void 0 ? void 0 : et.warnings) !== null && qe !== void 0 ? qe : [];
      return xr.length && (we = [...we, ...xr]), we;
    }, xe);
    return W(t, s.createElement(T5, {
      style: e,
      label: n,
      extra: o,
      help: r,
      helpIcon: i,
      description: b,
      required: ne,
      disabled: g,
      hasFeedback: a,
      htmlFor: G,
      errors: ee,
      warnings: be,
      onClick: E && ((we) => E(we, _)),
      hidden: f,
      layout: d,
      childElementPosition: m,
      clickable: k,
      arrow: $,
      arrowIcon: N
    }, s.createElement(tu.Provider, {
      value: R
    }, K)));
  }
  const A = typeof v == "function";
  if (!l && !A && !t.dependencies)
    return P(v);
  let B = {};
  B.label = typeof n == "string" ? n : "", h && (B = Object.assign(Object.assign({}, B), h));
  const H = Qe(tu), q = (K) => {
    if (u && H) {
      const G = K.name;
      H(K, G);
    }
  };
  return s.createElement(ll, Object.assign({}, O, {
    name: l,
    shouldUpdate: w,
    dependencies: x,
    rules: y,
    trigger: C,
    validateTrigger: M,
    onMetaChange: q,
    messageVariables: B
  }), (K, G, Q) => {
    let ne = null;
    const ce = c !== void 0 ? c : y && y.some((ee) => !!(ee && typeof ee == "object" && ee.required)), U = ba(l).length && G ? G.name : [], te = (U.length > 0 && L ? [L, ...U] : U).join("_");
    if (A)
      (w || x) && !l && (ne = v(Q));
    else if (!(x && !l))
      if (s.isValidElement(v)) {
        v.props.defaultValue;
        const ee = Object.assign(Object.assign({}, v.props), K);
        Jd(v) && (ee.ref = (be) => {
          const we = v.ref;
          we && (typeof we == "function" && we(be), "current" in we && (we.current = be)), _.current = be;
        }), ee.id || (ee.id = te), (/* @__PURE__ */ new Set([...ba(C), ...ba(M)])).forEach((be) => {
          ee[be] = (...we) => {
            var Ue, et, qe;
            (Ue = K[be]) === null || Ue === void 0 || Ue.call(K, ...we), (qe = (et = v.props)[be]) === null || qe === void 0 || qe.call(et, ...we);
          };
        }), ne = s.createElement(A5, {
          value: K[t.valuePropName || "value"],
          update: I.current
        }, s.cloneElement(v, ee));
      } else
        ne = v;
    return P(ne, te, G, ce);
  });
}, D5 = (t) => {
  const e = _u(), n = Qe(Mn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((o) => s.createElement(V5, {
    key: o.toString(),
    form: n,
    namePath: o,
    onChange: e
  })));
}, V5 = Ve((t) => {
  const e = ul(t.namePath, t.form);
  return bi(() => {
    t.onChange();
  }, [e]), null;
}), t8 = fe(Rg, {
  Item: L5,
  Subscribe: D5,
  Header: Rd,
  Array: Id,
  useForm: cl,
  useWatch: ul
}), e1 = "adm-grid", j5 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = kn(n[0]), e["--gap-vertical"] = kn(n[1])) : e["--gap"] = kn(n)), W(t, s.createElement("div", {
    className: e1,
    style: e
  }, t.children));
}, B5 = (t) => {
  const e = z({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${e1}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, t1 = fe(j5, {
  Item: B5
}), W5 = w3([Of, s3]), Wi = () => [1, 0, 0, 1, 0, 0], uu = (t) => t[4], fu = (t) => t[5], Ir = (t) => t[0], Ar = (t, e, n) => n1([1, 0, 0, 1, e, n], t), Z5 = (t, e, n = e) => n1([e, 0, 0, n, 0, 0], t), H5 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], n1 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], Ea = "adm-image-viewer", r1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = D([]), i = D(null), o = D(null), [{
    matrix: a
  }, l] = Me(() => ({
    matrix: Wi(),
    config: {
      tension: 200
    }
  })), c = Fa(i), u = Fa(o), f = D(!1), d = (g) => {
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
    const y = -c.width / 2, v = -c.height / 2, h = -u.width / 2, C = -u.height / 2, p = Ir(g), E = p * u.width, w = p * u.height, x = y - (E - c.width), k = y, $ = v - (w - c.height), N = v, [O, L] = H5(g, [h, C]);
    return {
      x: {
        position: O,
        minX: x,
        maxX: k
      },
      y: {
        position: L,
        minY: $,
        maxY: N
      }
    };
  }, m = (g, y, v, h = 0) => [g <= y - h, g >= v + h], b = (g, y, v = !1) => {
    if (!c || !u)
      return g;
    const h = Ir(g), C = h * u.width, p = h * u.height, {
      x: {
        position: E,
        minX: w,
        maxX: x
      },
      y: {
        position: k,
        minY: $,
        maxY: N
      }
    } = d(g);
    if (y === "translate") {
      let O = E, L = k;
      return C > c.width ? O = v ? _e(E, w, x) : oi(E, w, x, h * 50) : O = -C / 2, p > c.height ? L = v ? _e(k, $, N) : oi(k, $, N, h * 50) : L = -p / 2, Ar(g, O - E, L - k);
    }
    if (y === "scale" && v) {
      const [O, L] = [C > c.width ? _e(E, w, x) : -C / 2, p > c.height ? _e(k, $, N) : -p / 2];
      return Ar(g, O - E, L - k);
    }
    return g;
  };
  return W5({
    onDrag: (g) => {
      var y;
      if (g.first) {
        const {
          x: {
            position: h,
            minX: C,
            maxX: p
          }
        } = d(a.get());
        r.current = m(h, C, p);
        return;
      }
      if (g.pinching)
        return g.cancel();
      if (g.tap && g.elapsedTime > 0 && g.elapsedTime < 1e3) {
        (y = t.onTap) === null || y === void 0 || y.call(t);
        return;
      }
      const v = Ir(a.get());
      if (e && (e.current = v !== 1), !f.current && v <= 1)
        l.start({
          matrix: Wi()
        });
      else {
        const h = a.get(), C = [g.offset[0] - uu(h), g.offset[1] - fu(h)], p = Ar(h, ...g.last ? [C[0] + g.velocity[0] * g.direction[0] * 200, C[1] + g.velocity[1] * g.direction[1] * 200] : C);
        l.start({
          matrix: b(p, "translate", g.last),
          immediate: !g.last
        });
        const {
          x: {
            position: E,
            minX: w,
            maxX: x
          }
        } = d(p);
        g.last && r.current.some((k) => k) && m(E, w, x).some((k) => k) && (e && (e.current = !1), l.start({
          matrix: Wi()
        }));
      }
    },
    onPinch: (g) => {
      var y;
      f.current = !g.last;
      const [v] = g.offset;
      if (v < 0)
        return;
      let h;
      n === "auto" ? h = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : h = n;
      const C = g.last ? _e(v, 1, h) : v;
      if ((y = t.onZoomChange) === null || y === void 0 || y.call(t, C), g.last && C <= 1)
        l.start({
          matrix: Wi()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const p = a.get(), E = Ir(p), w = g.origin[0] - c.width / 2, x = g.origin[1] - c.height / 2;
        let k = Ar(p, -w, -x);
        k = Z5(k, C / E), k = Ar(k, w, x), l.start({
          matrix: b(k, "scale", g.last),
          immediate: !g.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [uu(a.get()), fu(a.get())],
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
    className: `${Ea}-slide`
  }, s.createElement("div", {
    className: `${Ea}-control`,
    ref: i
  }, s.createElement(ye.div, {
    className: `${Ea}-image-wrapper`,
    style: {
      matrix: a
    }
  }, s.createElement("img", {
    ref: o,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, wa = "adm-image-viewer", z5 = ve((t, e) => {
  const n = window.innerWidth + Fn(16), [{
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
  const l = D(!1), c = St((u) => {
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
    className: `${wa}-slides`
  }, c()), s.createElement(ye.div, {
    className: `${wa}-indicator`
  }, r.to((u) => `${_e(Math.round(u / n), 0, o - 1) + 1} / ${o}`)), s.createElement(ye.div, {
    className: `${wa}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(r1, {
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
}), xo = "adm-image-viewer", i1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, o1 = (t) => {
  var e, n, r;
  const i = z(i1, t), o = s.createElement(pi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: j(`${xo}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && s.createElement(r1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && s.createElement("div", {
    className: `${xo}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(Er, {
    position: "bottom"
  })));
  return pr(i.getContainer, o);
}, U5 = Object.assign(Object.assign({}, i1), {
  defaultIndex: 0
}), a1 = ve((t, e) => {
  var n, r, i;
  const o = z(U5, t), [a, l] = Y(o.defaultIndex), c = D(null);
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
    className: j(`${xo}-content`, (r = o == null ? void 0 : o.classNames) === null || r === void 0 ? void 0 : r.body)
  }, o.images && s.createElement(z5, {
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
function q5(t) {
  bl();
  const e = wr(s.createElement(o1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ur.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ur.add(e), e;
}
function K5(t) {
  bl();
  const e = wr(s.createElement(a1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ur.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ur.add(e), e;
}
function bl() {
  ur.forEach((t) => {
    t.close();
  }), ur.clear();
}
const Y5 = fe(a1, {
  show: K5
}), G5 = fe(o1, {
  Multi: Y5,
  show: q5,
  clear: bl
}), hn = "adm-image-uploader", X5 = (t) => {
  const {
    locale: e
  } = se(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: o,
    onDelete: a,
    imageFit: l
  } = t, c = oe(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  X(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${hn}-cell-mask`
    }, s.createElement("span", {
      className: `${hn}-cell-loading`
    }, s.createElement(Js, {
      color: "white"
    }), s.createElement("span", {
      className: `${hn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${hn}-cell-delete`,
      onClick: a
    }, o);
  }
  return s.createElement("div", {
    className: j(`${hn}-cell`, t.status === "fail" && `${hn}-cell-fail`)
  }, s.createElement(jo, {
    className: `${hn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, du = X5, vn = "adm-space", Q5 = {
  direction: "horizontal"
}, El = (t) => {
  const e = z(Q5, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(vn, {
      [`${vn}-wrap`]: e.wrap,
      [`${vn}-block`]: e.block,
      [`${vn}-${n}`]: !0,
      [`${vn}-align-${e.align}`]: !!e.align,
      [`${vn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${vn}-item`
  }, i))));
}, wt = "adm-image-uploader", J5 = {
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
}, n8 = ve((t, e) => {
  const {
    locale: n
  } = se(), r = z(J5, t), {
    columns: i
  } = r, [o, a] = ae(r), [l, c] = Y([]), u = D(null), f = Fa(u), d = D(null), [m, b] = Y(80), g = D(null);
  Ne(() => {
    const M = d.current;
    if (i && f && M) {
      const _ = f.width, I = Yf(window.getComputedStyle(M).getPropertyValue("height"));
      b((_ - I * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const y = {
    "--cell-size": m + "px"
  };
  Ne(() => {
    c((M) => M.filter((_) => _.url === void 0 ? !0 : !o.some((I) => I.url === _.url)));
  }, [o]), Ne(() => {
    var M;
    (M = r.onUploadQueueChange) === null || M === void 0 || M.call(r, l.map((_) => ({
      id: _.id,
      status: _.status
    })));
  }, [l]);
  const v = D(0), {
    maxCount: h,
    onPreview: C,
    renderItem: p
  } = r;
  function E(M, _) {
    return Se(this, void 0, void 0, function* () {
      const {
        beforeUpload: I
      } = r;
      let F = M;
      return F = yield I == null ? void 0 : I(M, _), F;
    });
  }
  function w(M) {
    return r.showFailed ? M : M.filter((_) => _.status !== "fail");
  }
  function x(M) {
    var _;
    return Se(this, void 0, void 0, function* () {
      M.persist();
      const {
        files: I
      } = M.target;
      if (!I)
        return;
      let F = [].slice.call(I);
      if (M.target.value = "", r.beforeUpload) {
        const P = F.map((A) => E(A, F));
        yield Promise.all(P).then((A) => {
          F = A.filter(Boolean);
        });
      }
      if (F.length === 0)
        return;
      if (h > 0) {
        const P = o.length + F.length - h;
        P > 0 && (F = F.slice(0, F.length - P), (_ = r.onCountExceed) === null || _ === void 0 || _.call(r, P));
      }
      const S = F.map((P) => ({
        id: v.current++,
        status: "pending",
        file: P
      }));
      c((P) => [...w(P), ...S]);
      const R = [];
      yield Promise.all(S.map((P, A) => Se(this, void 0, void 0, function* () {
        try {
          const B = yield r.upload(P.file);
          R[A] = B, c((H) => H.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "success",
            url: B.url
          }) : q));
        } catch (B) {
          throw c((H) => H.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "fail"
          }) : q)), B;
        }
      }))).catch((P) => console.error(P)), a((P) => P.concat(R));
    });
  }
  const k = D(null);
  function $(M) {
    k.current = G5.Multi.show({
      images: o.map((_) => _.url),
      defaultIndex: M,
      onClose: () => {
        k.current = null;
      }
    });
  }
  mi(() => {
    var M;
    (M = k.current) === null || M === void 0 || M.close();
  });
  const N = w(l), O = r.showUpload && (h === 0 || o.length + N.length < h), L = () => o.map((M, _) => {
    var I, F;
    const S = s.createElement(du, {
      key: (I = M.key) !== null && I !== void 0 ? I : _,
      url: (F = M.thumbnailUrl) !== null && F !== void 0 ? F : M.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && $(_), C && C(_, M);
      },
      onDelete: () => Se(void 0, void 0, void 0, function* () {
        var R;
        (yield (R = r.onDelete) === null || R === void 0 ? void 0 : R.call(r, M)) !== !1 && a(o.filter((A, B) => B !== _));
      })
    });
    return p ? p(S, M, o) : S;
  }), V = s.createElement(s.Fragment, null, L(), l.map((M) => !r.showFailed && M.status === "fail" ? null : s.createElement(du, {
    key: M.id,
    file: M.file,
    deletable: M.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: M.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(l.filter((_) => _.id !== M.id));
    }
  })), s.createElement("div", {
    className: `${wt}-upload-button-wrap`,
    style: O ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${wt}-cell ${wt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${wt}-upload-button-icon`
  }, s.createElement(hf, null))), !r.disableUpload && s.createElement("input", {
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
  }, i ? s.createElement(t1, {
    className: `${wt}-grid`,
    columns: i,
    style: y
  }, s.createElement("div", {
    className: `${wt}-gap-measure`,
    ref: d
  }), V.props.children) : s.createElement(El, {
    className: `${wt}-space`,
    wrap: !0,
    block: !0
  }, V.props.children)));
}), s1 = () => null, zn = "adm-index-bar", e6 = (t) => {
  const [e, n] = Y(!1);
  return s.createElement("div", {
    className: j(`${zn}-sidebar`, {
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
      className: j(`${zn}-sidebar-item`, {
        [`${zn}-sidebar-item-active`]: o
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, Un = "adm-index-bar", t6 = {
  sticky: !0
}, n6 = ve((t, e) => {
  const n = z(t6, t), r = Fn(35), i = D(null), o = [], a = [];
  fn(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === s1 && (o.push({
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
      const v = g.item(y);
      if (!v)
        continue;
      if (v.dataset.index === d) {
        b.scrollTop = v.offsetTop, c(d), l !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
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
      const v = g.item(y);
      if (!v)
        continue;
      const h = v.dataset.index;
      if (h && v.offsetTop + v.clientHeight - r > b) {
        c(h), l !== h && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, h));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return W(n, s.createElement("div", {
    className: j(`${Un}`, {
      [`${Un}-sticky`]: n.sticky
    })
  }, s.createElement(e6, {
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
}), r8 = fe(n6, {
  Panel: s1
});
function r6(t) {
  return t === window;
}
const l1 = "adm-infinite-scroll", i6 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(o6, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, i8 = (t) => {
  const e = z(i6, t), [n, r] = Y(!1), i = tm((b) => Se(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (g) {
      throw r(!0), g;
    }
  })), o = D(null), [a, l] = Y({}), c = D(a), [u, f] = Y(), {
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
    const v = b.getBoundingClientRect().top;
    if ((r6(g) ? window.innerHeight : g.getBoundingClientRect().bottom) >= v - e.threshold) {
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
    className: l1,
    ref: o
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, o6 = (t) => {
  const {
    locale: e
  } = se();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${l1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(Rf, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function c1({
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
const Zi = "adm-input", a6 = {
  defaultValue: "",
  clearIcon: s.createElement(Bs, null),
  onlyShowClearWhenFocus: !0
}, u1 = ve((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = se(), i = z(a6, r, t), [o, a] = ae(i), [l, c] = Y(!1), u = D(!1), f = D(null), d = c1({
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
    className: j(`${Zi}`, i.disabled && `${Zi}-disabled`)
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
      a(""), (g = i.onClear) === null || g === void 0 || g.call(i), Y3() && u.current && (u.current = !1, (y = f.current) === null || y === void 0 || y.blur());
    },
    "aria-label": n.Input.clear
  }, i.clearIcon)));
}), yt = "adm-jumbo-tabs", s6 = () => null, l6 = (t) => {
  var e;
  const n = D(null), r = D(null), i = {};
  let o = null;
  const a = [];
  fn(t.children, (d, m) => {
    if (!An(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (o = b);
    const g = a.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = qf(n, i[l]);
  return Ei(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: yt,
    ref: r
  }, s.createElement("div", {
    className: `${yt}-header`
  }, s.createElement(Kf, {
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
    className: j(`${yt}-tab`, {
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
}, o8 = fe(l6, {
  Tab: s6
}), c6 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(Lt, {
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
}, u6 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, f1 = (t) => {
  const e = z(u6, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
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
  }, typeof e.content == "string" ? s.createElement(ii, null, e.content) : e.content), s.createElement(El, {
    direction: "vertical",
    block: !0,
    className: j(Nt("footer"), e.actions.length === 0 && Nt("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(c6, {
    key: r.key,
    action: r,
    onAction: () => Se(void 0, void 0, void 0, function* () {
      var o, a, l;
      yield Promise.all([(o = r.onClick) === null || o === void 0 ? void 0 : o.call(r), (a = e.onAction) === null || a === void 0 ? void 0 : a.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(cd, {
    className: j(Nt(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: j(Nt("body"), e.image && Nt("with-image"), e.bodyClassName),
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
const vs = /* @__PURE__ */ new Set();
function wl(t) {
  const e = wr(s.createElement(f1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      vs.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return vs.add(e.close), e;
}
function f6(t) {
  const e = {
    confirmText: fi().locale.Modal.ok
  }, n = z(e, t);
  return new Promise((r) => {
    wl(Object.assign(Object.assign({}, n), {
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
const d6 = {
  confirmText: "确认",
  cancelText: "取消"
};
function m6(t) {
  const {
    locale: e
  } = fi(), n = z(d6, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    wl(Object.assign(Object.assign({}, n), {
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
function h6() {
  vs.forEach((t) => {
    t();
  });
}
const a8 = fe(f1, {
  show: wl,
  alert: f6,
  confirm: m6,
  clear: h6
}), qn = "adm-nav-bar", mu = s.createElement(p2, null), s8 = (t) => {
  const {
    navBar: e = {}
  } = se(), n = z(e, t), {
    back: r,
    backIcon: i,
    backArrow: o
  } = n, a = e.backIcon || mu, l = un(mu, e.backIcon, o === !0 ? a : o, i === !0 ? a : i);
  return W(n, s.createElement("div", {
    className: j(qn)
  }, s.createElement("div", {
    className: `${qn}-left`,
    role: "button"
  }, r !== null && s.createElement("div", {
    className: `${qn}-back`,
    onClick: n.onBack
  }, l && s.createElement("span", {
    className: `${qn}-back-arrow`
  }, l), s.createElement("span", {
    "aria-hidden": "true"
  }, r)), n.left), s.createElement("div", {
    className: `${qn}-title`
  }, n.children), s.createElement("div", {
    className: `${qn}-right`
  }, n.right)));
}, Pt = "adm-notice-bar", v6 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: s.createElement(w2, null),
  wrap: !1
}, l8 = Ve((t) => {
  const {
    noticeBar: e = {}
  } = se(), n = z(v6, e, t), r = un(s.createElement(Lo, {
    className: `${Pt}-close-icon`
  }), e.closeIcon, t.closeIcon), i = D(null), o = D(null), [a, l] = Y(!0), c = n.speed, u = D(!0), f = D(!1);
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
  return Om(() => {
    u.current = !1, d();
  }, n.delay), Ei(() => {
    d();
  }, i), Xs(() => {
    d();
  }, o, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), a ? W(n, s.createElement("div", {
    className: j(Pt, `${Pt}-${n.color}`, {
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
function p6(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const ke = "adm-number-keyboard", g6 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, c8 = (t) => {
  const e = z(g6, t), {
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
  } = se(), d = D(null), m = oe(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = l ? p6(w) : w, k = Array.isArray(a) ? a : [a];
    return x.push("0"), o ? (k.length === 2 && x.splice(9, 0, k.pop()), x.push(k[0] || "")) : (x.splice(9, 0, k[0] || ""), x.push(k[1] || "BACKSPACE")), x;
  }, [a, o, l, l && n]), b = D(-1), g = D(-1), y = jt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), v = () => {
    b.current = window.setTimeout(() => {
      y(), g.current = window.setInterval(y, 150);
    }, 700);
  }, h = () => {
    clearTimeout(b.current), clearInterval(g.current);
  }, C = (w, x) => {
    var k, $;
    switch (w.preventDefault(), x) {
      case "BACKSPACE":
        y == null || y();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && (($ = e.onClose) === null || $ === void 0 || $.call(e));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, p = () => !c && !r ? null : s.createElement("div", {
    className: j(`${ke}-header`, {
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
  }, s.createElement(pf, null))), E = (w, x) => {
    const k = /^\d$/.test(w), $ = j(`${ke}-key`, {
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
      className: $,
      onTouchStart: () => {
        h(), w === "BACKSPACE" && v();
      },
      onTouchEnd: (O) => {
        C(O, w), w === "BACKSPACE" && h();
      }
    }, N), w === "BACKSPACE" ? s.createElement(oc, null) : w);
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
  }, p(), s.createElement("div", {
    className: `${ke}-wrapper`
  }, s.createElement("div", {
    className: j(`${ke}-main`, {
      [`${ke}-main-confirmed-style`]: !!o
    })
  }, m.map(E)), !!o && s.createElement("div", {
    className: `${ke}-confirm`
  }, s.createElement("div", {
    className: `${ke}-key ${ke}-key-extra ${ke}-key-bs`,
    onTouchStart: () => {
      v();
    },
    onTouchEnd: (w) => {
      C(w, "BACKSPACE"), h();
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(oc, null)), s.createElement("div", {
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
}, Tr = "adm-page-indicator", y6 = {
  color: "primary",
  direction: "horizontal"
}, b6 = Ve((t) => {
  const e = z(y6, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: j(`${Tr}-dot`, {
        [`${Tr}-dot-active`]: e.current === r
      })
    }));
  return W(e, s.createElement("div", {
    className: j(Tr, `${Tr}-${e.direction}`, `${Tr}-color-${e.color}`)
  }, n));
}), bt = "adm-passcode-input", hu = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, u8 = ve((t, e) => {
  const n = z(hu, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : hu.length, {
    locale: i
  } = se(), [o, a] = Y(!1), [l, c] = ae(n), u = D(null), f = D(null);
  X(() => {
    var y;
    l.length >= r && ((y = n.onFill) === null || y === void 0 || y.call(n, l));
  }, [l, r]);
  const d = () => {
    var y, v;
    n.keyboard || (y = f.current) === null || y === void 0 || y.focus(), a(!0), (v = n.onFocus) === null || v === void 0 || v.call(n);
  };
  X(() => {
    if (!o)
      return;
    const y = window.setTimeout(() => {
      var v;
      (v = u.current) === null || v === void 0 || v.scrollIntoView({
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
      var y, v;
      (y = u.current) === null || y === void 0 || y.blur(), (v = f.current) === null || v === void 0 || v.blur();
    }
  }));
  const b = () => {
    const y = [], v = l.split(""), h = v.length, C = _e(v.length, 0, r - 1);
    for (let p = 0; p < r; p++)
      y.push(s.createElement("div", {
        className: j(`${bt}-cell`, {
          [`${bt}-cell-caret`]: n.caret && h === p && o,
          [`${bt}-cell-focused`]: C === p && o,
          [`${bt}-cell-dot`]: !n.plain && v[p]
        }),
        key: p
      }, v[p] && n.plain ? v[p] : ""));
    return y;
  }, g = j(bt, {
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
}), Lr = "adm-progress-bar", E6 = {
  percent: 0,
  rounded: !0,
  text: !1
}, f8 = (t) => {
  const e = z(E6, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, s.createElement("div", {
    className: j(Lr, e.rounded && `${Lr}-rounded`)
  }, s.createElement("div", {
    className: `${Lr}-trail`
  }, s.createElement("div", {
    className: `${Lr}-fill`,
    style: n
  })), Jt(r) && s.createElement("div", {
    className: `${Lr}-text`
  }, r)));
}, Kn = "adm-progress-circle", d8 = (t) => {
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
}, w6 = (t) => new Promise((e) => setTimeout(e, t)), Hi = "adm-pull-to-refresh", C6 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, m8 = (t) => {
  var e, n;
  const {
    locale: r
  } = se(), i = z(C6, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), o = (e = i.headHeight) !== null && e !== void 0 ? e : Fn(40), a = (n = i.threshold) !== null && n !== void 0 ? n : Fn(60), [l, c] = Y("pulling"), [u, f] = Me(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      round: !0,
      clamp: !0
    }
  })), d = D(null), m = D(!1);
  X(() => {
    var v;
    (v = d.current) === null || v === void 0 || v.addEventListener("touchmove", () => {
    });
  }, []);
  const b = () => new Promise((v) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), v();
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
      } catch (v) {
        throw b(), v;
      }
      i.completeDelay > 0 && (yield w6(i.completeDelay)), b();
    });
  }
  St((v) => {
    if (l === "refreshing" || l === "complete")
      return;
    const {
      event: h
    } = v;
    if (v.last) {
      m.current = !1, l === "canRelease" ? g() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = v.movement, p = Math.ceil(C);
    if (v.first && p > 0) {
      let k = function($) {
        return "scrollTop" in $ ? $.scrollTop : $.scrollY;
      };
      const w = v.event.target;
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
    h.cancelable && h.preventDefault(), h.stopPropagation();
    const E = Math.max(oi(p, 0, 0, o * 5, 0.5), 0);
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
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  });
  const y = () => {
    var v;
    if (i.renderText)
      return (v = i.renderText) === null || v === void 0 ? void 0 : v.call(i, l);
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
}, d1 = ys(null), x6 = {
  disabled: !1,
  defaultValue: null
}, k6 = (t) => {
  const e = z(x6, t), [n, r] = ae({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var o;
      i !== null && ((o = e.onChange) === null || o === void 0 || o.call(e, i));
    }
  });
  return s.createElement(
    d1.Provider,
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
}, pn = "adm-radio", $6 = {
  defaultChecked: !1
}, _6 = (t) => {
  const e = z($6, t), n = Qe(d1);
  let [r, i] = ae({
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
    className: `${pn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${pn}-icon`
  }, r && s.createElement(fd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: j(pn, {
      [`${pn}-checked`]: r,
      [`${pn}-disabled`]: o,
      [`${pn}-block`]: e.block
    })
  }, s.createElement(dd, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: o,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${pn}-content`
  }, e.children)));
}, h8 = fe(_6, {
  Group: k6
}), O6 = () => s.createElement("svg", {
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
})), gn = "adm-rate", S6 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(O6, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, v8 = (t) => {
  const e = z(S6, t), [n, r] = ae(e), i = D(null), o = Array(e.count).fill(null);
  function a(c, u) {
    return s.createElement("div", {
      className: j(`${gn}-star`, {
        [`${gn}-star-active`]: n >= c,
        [`${gn}-star-half`]: u,
        [`${gn}-star-readonly`]: e.readOnly
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
    className: j(gn, {
      [`${gn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), o.map((c, u) => s.createElement("div", {
    key: u,
    className: j(`${gn}-box`)
  }, e.allowHalf && a(u + 0.5, !0), a(u + 1, !1)))));
}, m1 = (t) => {
  const {
    result: e = {}
  } = se(), {
    successIcon: n = s.createElement(f2, null),
    errorIcon: r = s.createElement(Bs, null),
    infoIcon: i = s.createElement(v2, null),
    waitingIcon: o = s.createElement(d2, null),
    warningIcon: a = s.createElement(h2, null)
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
}, Dr = "adm-result", F6 = {
  status: "info"
}, p8 = (t) => {
  const e = z(F6, t), {
    status: n,
    title: r,
    description: i,
    icon: o
  } = e, a = m1(n);
  return n ? W(e, s.createElement("div", {
    className: j(Dr, `${Dr}-${n}`)
  }, s.createElement("div", {
    className: `${Dr}-icon`
  }, o || a), s.createElement("div", {
    className: `${Dr}-title`
  }, r), !!i && s.createElement("div", {
    className: `${Dr}-description`
  }, i))) : null;
}, Ie = "adm-result-page", N6 = {
  status: "info",
  details: []
}, P6 = (t) => {
  const e = z(N6, t), {
    status: n,
    title: r,
    description: i,
    details: o,
    icon: a,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = m1(n), [m, b] = Y(!0), g = Jt(c), y = Jt(l);
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
  }, (m ? o.slice(0, 3) : o).map((v, h) => s.createElement("div", {
    className: j(`${Ie}-detail`, v.bold && `${Ie}-detail-bold`),
    key: h
  }, s.createElement("span", null, v.label), s.createElement("span", null, v.value))), o.length > 3 && s.createElement("div", {
    onClick: () => b((v) => !v)
  }, s.createElement("div", {
    className: j(`${Ie}-collapse`, !m && `${Ie}-collapse-active`)
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
}, R6 = "adm-result-page-card", M6 = (t) => W(t, s.createElement("div", {
  className: j(`${R6}`)
}, t.children)), g8 = fe(P6, {
  Card: M6
}), Kt = "adm-search-bar", I6 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0
}, y8 = ve((t, e) => {
  const {
    locale: n,
    searchBar: r = {}
  } = se(), i = z(I6, r, {
    cancelText: n.common.cancel
  }, t), o = un(s.createElement(E2, null), r.searchIcon, t.icon, t.searchIcon), [a, l] = ae(i), [c, u] = Y(!1), f = D(null), d = D(!1);
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
        var g, y, v;
        i.clearOnCancel && ((g = f.current) === null || g === void 0 || g.clear()), (y = f.current) === null || y === void 0 || y.blur(), (v = i.onCancel) === null || v === void 0 || v.call(i);
      },
      onMouseDown: (g) => {
        g.preventDefault();
      }
    }, i.cancelText));
  };
  return W(i, s.createElement("div", {
    className: j(Kt, {
      [`${Kt}-active`]: c
    })
  }, s.createElement("div", {
    className: `${Kt}-input-box`
  }, o && s.createElement("div", {
    className: `${Kt}-input-box-icon`
  }, o), s.createElement(u1, {
    ref: f,
    className: j(`${Kt}-input`, {
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
}), A6 = Ve(() => s.createElement("svg", {
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
})))))))), yn = "adm-selector", T6 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, b8 = (t) => {
  const e = z(T6, t), [n, r, , i] = wi(e.fieldNames), [o, a] = ae({
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
  } = se(), c = e.options.map((u) => {
    const f = (o || []).includes(u[r]), d = u[i] || e.disabled, m = j(`${yn}-item`, {
      [`${yn}-item-active`]: f && !e.multiple,
      [`${yn}-item-multiple-active`]: f && e.multiple,
      [`${yn}-item-disabled`]: d
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
      className: `${yn}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${yn}-check-mark-wrapper`
    }, s.createElement(A6, null)));
  });
  return W(e, s.createElement("div", {
    className: yn,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(t1, {
    columns: e.columns
  }, c) : s.createElement(El, {
    wrap: !0
  }, c)));
}, Ca = Ve((t) => W(t, s.createElement("svg", {
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
}))))), Te = "adm-side-bar", L6 = () => null, D6 = (t) => {
  var e;
  let n = null;
  const r = [];
  fn(t.children, (c, u) => {
    if (!An(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, o] = ae({
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
      className: j(`${Te}-item`, {
        [`${Te}-item-active`]: f,
        [`${Te}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(Ca, {
      className: `${Te}-item-corner ${Te}-item-corner-top`
    }), m && s.createElement(Ca, {
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
    className: j(`${Te}-extra-space`, l && `${Te}-item-active-next-sibling`)
  }, l && s.createElement(Ca, {
    className: `${Te}-item-corner ${Te}-item-corner-top`
  }))));
}, E8 = fe(D6, {
  Item: L6
}), xa = "adm-slider", V6 = ({
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
      [`${xa}-tick`]: !0,
      [`${xa}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${xa}-ticks`
  }, a);
}, j6 = V6, ka = "adm-slider-mark", B6 = ({
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
      [`${ka}-text`]: !0,
      [`${ka}-text-active`]: f
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
    className: ka
  }, l);
}, W6 = B6;
function ps() {
  return typeof BigInt == "function";
}
function h1(t) {
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
function Cl(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function Zr(t) {
  var e = String(t);
  if (Cl(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && p1(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function v1(t) {
  var e = String(t);
  if (Cl(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(ps() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(ps() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(Zr(e));
  }
  return Gr(e).fullStr;
}
function p1(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var Z6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ci(this, t), De(this, "origin", ""), De(this, "negative", void 0), De(this, "integer", void 0), De(this, "decimal", void 0), De(this, "decimalLen", void 0), De(this, "empty", void 0), De(this, "nan", void 0), h1(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (Cl(n) && (n = Number(n)), n = typeof n == "string" ? n : v1(n), p1(n)) {
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
}(), H6 = /* @__PURE__ */ function() {
  function t(e) {
    if (Ci(this, t), De(this, "origin", ""), De(this, "number", void 0), De(this, "empty", void 0), h1(e)) {
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
      return n ? this.isInvalidate() ? "" : v1(this.number) : this.origin;
    }
  }]), t;
}();
function Ze(t) {
  return ps() ? new Z6(t) : new H6(t);
}
function xl(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = Gr(t), o = i.negativeStr, a = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(o).concat(a);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = Ze(t).add("".concat(o, "0.").concat("0".repeat(n)).concat(10 - f));
      return xl(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const z6 = (t) => W(t, s.createElement("svg", {
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
})))), $a = "adm-slider", U6 = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: o,
    residentPopover: a,
    onDrag: l
  } = t, c = D(e), {
    locale: u
  } = se(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = Y(!1), b = St((v) => {
    var h;
    if (i)
      return;
    v.first && (c.current = e);
    const C = v.xy[0] - v.initial[0], p = (h = t.trackRef.current) === null || h === void 0 ? void 0 : h.offsetWidth;
    if (!p)
      return;
    const E = C / Math.ceil(p) * (r - n);
    l(c.current + E, v.first, v.last), m(!v.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), g = typeof t.popover == "function" ? t.popover : t.popover ? (v) => v.toString() : null, y = s.createElement("div", {
    className: `${$a}-thumb`
  }, o || s.createElement(z6, {
    className: `${$a}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${$a}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), g ? s.createElement(Qd, {
    content: g(e),
    placement: "top",
    visible: a || d,
    getContainer: null,
    mode: "dark"
  }, y) : y);
}, q6 = U6, Vr = "adm-slider", K6 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, w8 = (t) => {
  var e;
  const n = z(K6, t), {
    min: r,
    max: i,
    disabled: o,
    marks: a,
    ticks: l,
    step: c,
    icon: u
  } = n;
  function f(_) {
    return _.sort((I, F) => I - F);
  }
  function d(_) {
    return n.range ? _ : [n.min, _];
  }
  function m(_, I) {
    const F = Ze(_), S = xl(F.toString(), ".", I);
    return Ze(S).toNumber();
  }
  function b(_) {
    const I = Math.max(g(c), g(_[0]), g(_[1]));
    return n.range ? _.map((F) => m(F, I)) : m(_[1], I);
  }
  function g(_) {
    return (`${_}`.split(".")[1] || "").length;
  }
  function y(_) {
    var I;
    (I = n.onAfterChange) === null || I === void 0 || I.call(n, b(_));
  }
  let v = n.value;
  n.range && typeof n.value == "number" && (v = [0, n.value]);
  const [h, C] = ae({
    value: v,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), p = f(d(h));
  function E(_) {
    const I = f(_), F = p;
    I[0] === F[0] && I[1] === F[1] || C(b(I));
  }
  const w = D(null), x = `${100 * (p[1] - p[0]) / (i - r)}%`, k = `${100 * (p[0] - r) / (i - r)}%`, $ = oe(() => {
    if (a)
      return Object.keys(a).map(parseFloat).sort((_, I) => _ - I);
    if (l) {
      const _ = [];
      for (let I = Ze(r); I.lessEquals(Ze(i)); I = I.add(c))
        _.push(I.toNumber());
      return _;
    }
    return [];
  }, [a, l, c, r, i]);
  function N(_) {
    const I = _ < r ? r : _ > i ? i : _;
    let F = r;
    if ($.length)
      F = ol($, I);
    else {
      const S = Math.round((I - r) / c), R = Ze(S).multi(c);
      F = Ze(r).add(R.toString()).toNumber();
    }
    return F;
  }
  const O = D(0), L = (_) => {
    if (O.current > 0 || (_.stopPropagation(), o))
      return;
    const I = w.current;
    if (!I)
      return;
    const F = I.getBoundingClientRect().left, S = (_.clientX - F) / Math.ceil(I.offsetWidth) * (i - r) + r, R = N(S);
    let P;
    n.range ? Math.abs(R - p[0]) > Math.abs(R - p[1]) ? P = [p[0], R] : P = [R, p[1]] : P = [n.min, R], E(P), y(P);
  }, V = D(), M = (_) => s.createElement(q6, {
    key: _,
    value: p[_],
    min: r,
    max: i,
    disabled: o,
    trackRef: w,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (I, F, S) => {
      F && (O.current += 1, V.current = p);
      const R = N(I), P = V.current;
      if (!P)
        return;
      const A = [...P];
      A[_] = R, E(A), S && (y(A), window.setTimeout(() => {
        O.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return W(n, s.createElement("div", {
    className: j(Vr, {
      [`${Vr}-disabled`]: o
    })
  }, s.createElement("div", {
    className: `${Vr}-track-container`,
    onClick: L
  }, s.createElement("div", {
    className: `${Vr}-track`,
    onClick: L,
    ref: w
  }, s.createElement("div", {
    className: `${Vr}-fill`,
    style: {
      width: x,
      left: k
    }
  }), n.ticks && s.createElement(j6, {
    points: $,
    min: r,
    max: i,
    lowerBound: p[0],
    upperBound: p[1]
  }), n.range && M(0), M(1))), a && s.createElement(W6, {
    min: r,
    max: i,
    marks: a,
    lowerBound: p[0],
    upperBound: p[1]
  })));
}, Yn = "adm-stepper", Y6 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function G6(t, e) {
  const n = z(Y6, t), {
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
  } = se();
  Ee(e, () => ({
    focus: () => {
      var P;
      (P = V.current) === null || P === void 0 || P.focus();
    },
    blur: () => {
      var P;
      (P = V.current) === null || P === void 0 || P.blur();
    },
    get nativeElement() {
      var P, A;
      return (A = (P = V.current) === null || P === void 0 ? void 0 : P.nativeElement) !== null && A !== void 0 ? A : null;
    }
  }));
  const v = (P) => (d !== void 0 ? xl(P.toString(), ".", d) : P).toString(), h = (P) => m ? P.toString() : P.toNumber(), C = (P) => {
    if (P === "")
      return null;
    if (g)
      return String(g(P));
    const A = Ze(P);
    return A.isInvalidate() ? null : A.toString();
  }, p = (P) => P === null ? "" : b ? b(P) : v(P), [E, w] = a4(r, {
    value: i,
    onChange: (P) => {
      o == null || o(P);
    }
  }), [x, k] = Y(() => p(E));
  function $(P) {
    if (P.isNaN())
      return;
    let A = P;
    if (u !== void 0) {
      const B = Ze(u);
      A.lessEquals(B) && (A = B);
    }
    if (c !== void 0) {
      const B = Ze(c);
      B.lessEquals(A) && (A = B);
    }
    d !== void 0 && (A = Ze(v(h(A)))), w(h(A));
  }
  const N = (P) => {
    k(P);
    const A = C(P);
    A === null ? n.allowEmpty ? w(null) : w(r) : $(Ze(A));
  }, [O, L] = Y(!1), V = s.useRef(null);
  function M(P) {
    L(P), P && k(E != null ? String(E) : "");
  }
  X(() => {
    var P, A, B;
    O && ((B = (A = (P = V.current) === null || P === void 0 ? void 0 : P.nativeElement) === null || A === void 0 ? void 0 : A.select) === null || B === void 0 || B.call(A));
  }, [O]), X(() => {
    O || k(p(E));
  }, [O, E, d]);
  const _ = (P) => {
    let A = Ze(l);
    P || (A = A.negate()), $(Ze(E ?? 0).add(A.toString()));
  }, I = () => {
    _(!1);
  }, F = () => {
    _(!0);
  }, S = () => a ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, R = () => a ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: j(Yn, {
      [`${Yn}-active`]: O
    })
  }, s.createElement(Lt, {
    className: `${Yn}-minus`,
    onClick: I,
    disabled: S(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.decrease
  }, s.createElement(g2, null)), s.createElement("div", {
    className: `${Yn}-middle`
  }, s.createElement(u1, {
    ref: V,
    className: `${Yn}-input`,
    onFocus: (P) => {
      var A;
      M(!0), (A = n.onFocus) === null || A === void 0 || A.call(n, P);
    },
    value: x,
    onChange: (P) => {
      a || N(P);
    },
    disabled: a,
    onBlur: (P) => {
      var A;
      M(!1), (A = n.onBlur) === null || A === void 0 || A.call(n, P);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(Lt, {
    className: `${Yn}-plus`,
    onClick: F,
    disabled: R(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.increase
  }, s.createElement(hf, null))));
}
const C8 = ve(G6), bn = "adm-step", X6 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, s.createElement("div", {
    className: j(`${bn}`, `${bn}-status-${i}`)
  }, s.createElement("div", {
    className: `${bn}-indicator`
  }, s.createElement("div", {
    className: `${bn}-icon-container`
  }, r)), s.createElement("div", {
    className: `${bn}-content`
  }, s.createElement("div", {
    className: `${bn}-title`
  }, e), !!n && s.createElement("div", {
    className: `${bn}-description`
  }, n))));
}, vu = "adm-steps", Q6 = "adm-step", J6 = s.createElement("span", {
  className: `${Q6}-icon-dot`
}), e7 = {
  current: 0,
  direction: "horizontal"
}, t7 = (t) => {
  const e = z(e7, t), {
    direction: n,
    current: r
  } = e, i = j(vu, `${vu}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (o, a) => {
    var l;
    if (!s.isValidElement(o))
      return o;
    const c = o.props;
    let u = c.status || "wait";
    a < r ? u = c.status || "finish" : a === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : J6;
    return s.cloneElement(o, {
      status: u,
      icon: f
    });
  })));
}, x8 = fe(t7, {
  Step: X6
}), Yt = "adm-swipe-action", n7 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, k8 = ve((t, e) => {
  const n = z(n7, t), r = D(null), i = D(null), o = D(null);
  function a(h) {
    const C = h.current;
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
  }), []), d = D(!1), m = D(null);
  function b() {
    var h;
    (h = m.current) === null || h === void 0 || h.call(m), d.current = !1;
  }
  const g = St((h) => {
    var C;
    if (m.current = h.cancel, !h.intentional || (h.down && (d.current = !0), !d.current))
      return;
    const [p] = h.offset;
    if (h.last) {
      const E = l(), w = c();
      let x = p + h.velocity[0] * h.direction[0] * 50;
      p > 0 ? x = Math.max(0, x) : p < 0 ? x = Math.min(0, x) : x = 0;
      const k = ol([-w, 0, E], x);
      f.start({
        x: k
      }), k !== 0 && ((C = t.onActionsReveal) === null || C === void 0 || C.call(t, k > 0 ? "left" : "right")), window.setTimeout(() => {
        d.current = !1;
      });
    } else
      f.start({
        x: p,
        immediate: !0
      });
  }, {
    from: () => [u.get(), 0],
    bounds: () => {
      const h = l();
      return {
        left: -c(),
        right: h
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
    show: (h = "right") => {
      var C;
      h === "right" ? f.start({
        x: -c()
      }) : h === "left" && f.start({
        x: l()
      }), (C = t.onActionsReveal) === null || C === void 0 || C.call(t, h);
    },
    close: y
  })), X(() => {
    if (!n.closeOnTouchOutside)
      return;
    function h(C) {
      if (u.get() === 0)
        return;
      const p = r.current;
      p && !p.contains(C.target) && y();
    }
    return document.addEventListener("touchstart", h), () => {
      document.removeEventListener("touchstart", h);
    };
  }, [n.closeOnTouchOutside]);
  function v(h) {
    var C, p;
    const E = (C = h.color) !== null && C !== void 0 ? C : "light";
    return s.createElement(Lt, {
      key: h.key,
      className: `${Yt}-action-button`,
      style: {
        "--background-color": (p = r7[E]) !== null && p !== void 0 ? p : E
      },
      onClick: (w) => {
        var x, k;
        n.closeOnAction && y(), (x = h.onClick) === null || x === void 0 || x.call(h, w), (k = n.onAction) === null || k === void 0 || k.call(n, h, w);
      }
    }, h.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: Yt
  }, g(), {
    ref: r,
    onClickCapture: (h) => {
      d.current && (h.stopPropagation(), h.preventDefault());
    }
  }), s.createElement(ye.div, {
    className: `${Yt}-track`,
    style: {
      x: u
    }
  }, rn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-left`,
    ref: i
  }, n.leftActions.map(v))), s.createElement("div", {
    className: `${Yt}-content`,
    onClickCapture: (h) => {
      u.goal !== 0 && (h.preventDefault(), h.stopPropagation(), y());
    }
  }, s.createElement(ye.div, {
    style: {
      pointerEvents: u.to((h) => h !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), rn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-right`,
    ref: o
  }, n.rightActions.map(v))))));
}), r7 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, g1 = (t) => W(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function i7(t) {
  const [e, n] = Y(t), r = D(e);
  return X(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function o7(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), o = {};
  return i.forEach((a) => {
    const l = t[a], c = e[a];
    typeof l == "function" && typeof c == "function" ? o[a] = function(...u) {
      l(...u), c(...u);
    } : o[a] = l || c;
  }), o;
}
const Et = "adm-swiper", a7 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, s7 = {
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
const l7 = ve(qs((t, e) => {
  const n = z(s7, t), {
    direction: r,
    total: i,
    children: o,
    indicator: a
  } = n, [l] = Y({}), c = D(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: g
  } = oe(() => {
    let v = 0, h, C;
    return typeof o == "function" ? h = o : C = s.Children.map(o, (p) => !s.isValidElement(p) || p.type !== g1 ? null : (v++, p)), {
      renderChildren: h,
      validChildren: C,
      count: v
    };
  }, [o]), y = i ?? b;
  return y === 0 || !m && !g ? null : () => {
    let v = n.loop;
    f * (y - 1) < 1 && (v = !1);
    const h = D(null);
    function C() {
      const U = h.current;
      return U ? (u ? U.offsetHeight : U.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [p, E, w] = Q0(n.defaultIndex), [x, k, $] = i7(!1);
    function N(U) {
      let te = 0, ee = y - 1;
      return n.stuckAtBoundary && (te += d / f, ee -= (1 - f - d) / f), _e(U, te, ee);
    }
    const [{
      position: O
    }, L] = Me(() => ({
      position: N(p) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if ($.current || !v)
          return;
        const U = O.get(), te = 100 * y, ee = _a(U, te);
        ee !== U && L.start({
          position: ee,
          immediate: !0
        });
      }
    }), [y]), V = D(null);
    function M() {
      var U;
      (U = V.current) === null || U === void 0 || U.call(V), $.current = !1;
    }
    const _ = St((U) => {
      if (V.current = U.cancel, !U.intentional || (U.first && !zi && (zi = l), zi !== l))
        return;
      zi = U.last ? void 0 : l;
      const te = C();
      if (!te)
        return;
      const ee = u ? 1 : 0, xe = U.offset[ee], be = U.direction[ee], we = U.velocity[ee];
      if (k(!0), !U.last)
        L.start({
          position: xe * 100 / te,
          immediate: !0
        });
      else {
        const Ue = Math.floor(xe / te), et = Ue + 1, qe = Math.round((xe + we * 2e3 * be) / te);
        I(_e(qe, Ue, et)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([U, te]) => [-U, -te],
      from: () => {
        const U = C();
        return [O.get() / 100 * U, O.get() / 100 * U];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (v)
          return {};
        const U = C(), te = N(0) * U, ee = N(y - 1) * U;
        return u ? {
          top: te,
          bottom: ee
        } : {
          left: te,
          right: ee
        };
      },
      rubberband: n.rubberband,
      axis: u ? "y" : "x",
      preventScroll: !u,
      pointer: {
        touch: !0
      }
    });
    function I(U, te = !1) {
      var ee;
      const xe = Math.round(U), be = v ? _a(xe, y) : _e(xe, 0, y - 1);
      be !== w() && ((ee = n.onIndexChange) === null || ee === void 0 || ee.call(n, be)), E(be), L.start({
        position: (v ? xe : N(xe)) * 100,
        immediate: te
      });
    }
    function F() {
      I(Math.round(O.get() / 100) + 1);
    }
    function S() {
      I(Math.round(O.get() / 100) - 1);
    }
    Ee(e, () => ({
      swipeTo: I,
      swipeNext: F,
      swipePrev: S
    })), Ne(() => {
      const U = y - 1;
      p > U && I(U, !0);
    });
    const {
      autoplay: R,
      autoplayInterval: P
    } = n, A = () => {
      c.current = window.setTimeout(() => {
        R === "reverse" ? S() : F(), A();
      }, P);
    };
    X(() => {
      if (!(!R || x))
        return A(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [R, P, x, y]);
    function B(U, te) {
      let ee = {};
      return v && (ee = {
        [u ? "y" : "x"]: O.to((xe) => {
          let be = -xe + U * 100;
          const we = y * 100, Ue = we / 2;
          return be = _a(be + Ue, we) - Ue, `${be}%`;
        }),
        [u ? "top" : "left"]: `-${U * 100}%`
      }), s.createElement(ye.div, {
        className: j(`${Et}-slide`, {
          [`${Et}-slide-active`]: p === U
        }),
        style: ee,
        key: U
      }, te);
    }
    function H() {
      if (g && i) {
        const te = Math.max(p - 2, 0), ee = Math.min(p + 2, i - 1), xe = [];
        for (let be = te; be <= ee; be += 1)
          xe.push(B(be, g(be)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${Et}-slide-placeholder`,
          style: {
            width: `${te * 100}%`
          }
        }), xe);
      }
      return s.Children.map(m, (U, te) => B(te, U));
    }
    function q() {
      return v ? s.createElement("div", {
        className: `${Et}-track-inner`
      }, H()) : s.createElement(ye.div, {
        className: `${Et}-track-inner`,
        style: {
          [u ? "y" : "x"]: O.to((U) => `${-U}%`)
        }
      }, H());
    }
    const K = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, G = Object.assign({}, n.allowTouchMove ? _() : {}), Q = {};
    for (const U of n.stopPropagation) {
      const te = a7[U];
      Q[te] = function(ee) {
        ee.stopPropagation();
      };
    }
    const ne = o7(G, Q);
    let ce = null;
    return typeof a == "function" ? ce = a(y, p) : a !== !1 && (ce = s.createElement("div", {
      className: `${Et}-indicator`
    }, s.createElement(b6, Object.assign({}, n.indicatorProps, {
      total: y,
      current: p,
      direction: r
    })))), W(n, s.createElement("div", {
      className: j(Et, `${Et}-${r}`),
      style: K
    }, s.createElement("div", Object.assign({
      ref: h,
      className: j(`${Et}-track`, {
        [`${Et}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (U) => {
        $.current && U.stopPropagation(), M();
      }
    }, ne), q()), ce));
  };
}));
function _a(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const $8 = fe(l7, {
  Item: g1
}), c7 = Ve((t) => W(t, s.createElement("svg", {
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
})))))))), En = "adm-switch", u7 = {
  defaultChecked: !1
}, _8 = (t) => {
  const e = z(u7, t), n = e.disabled || e.loading || !1, [r, i] = Y(!1), {
    locale: o
  } = se(), [a, l] = ae({
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
    className: j(En, {
      [`${En}-checked`]: a,
      [`${En}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": o.Switch.name,
    "aria-checked": a,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${En}-checkbox`
  }, s.createElement("div", {
    className: `${En}-handle`
  }, (e.loading || r) && s.createElement(c7, {
    className: `${En}-spin-icon`
  })), s.createElement("div", {
    className: `${En}-inner`
  }, a ? e.checkedText : e.uncheckedText))));
}, f7 = () => null, Rt = "adm-tab-bar", d7 = {
  safeArea: !1
}, m7 = (t) => {
  var e;
  const n = z(d7, t);
  let r = null;
  const i = [];
  fn(n.children, (l, c) => {
    if (!An(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [o, a] = ae({
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
        className: j(`${Rt}-item-title`, !!f && `${Rt}-item-title-with-icon`)
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
      className: j(`${Rt}-item`, {
        [`${Rt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(Er, {
    position: "bottom"
  })));
}, O8 = fe(m7, {
  Item: f7
}), pu = "adm-tag", h7 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, v7 = {
  color: "default",
  fill: "solid",
  round: !1
}, S8 = (t) => {
  var e;
  const n = z(v7, t), r = (e = h7[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(pu, {
      [`${pu}-round`]: n.round
    })
  }, n.children));
}, jr = "adm-text-area", y1 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, p7 = ve((t, e) => {
  const n = z(y1, t), {
    autoSize: r,
    showCount: i,
    maxLength: o
  } = n, [a, l] = ae(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = D(null), u = D("auto"), f = D(null), d = c1({
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
      var v;
      (v = c.current) === null || v === void 0 || v.focus();
    },
    blur: () => {
      var v;
      (v = c.current) === null || v === void 0 || v.blur();
    },
    get nativeElement() {
      return c.current;
    }
  })), Ne(() => {
    if (!r)
      return;
    const v = c.current, h = f.current;
    if (!v || (v.style.height = u.current, !h))
      return;
    let C = h.scrollHeight;
    if (typeof r == "object") {
      const p = window.getComputedStyle(v), E = parseFloat(p.lineHeight);
      r.minRows && (C = Math.max(C, r.minRows * E)), r.maxRows && (C = Math.min(C, r.maxRows * E));
    }
    u.current = `${C}px`, v.style.height = `${C}px`;
  }, [a, r]);
  const m = D(!1);
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
    onChange: (v) => {
      let h = v.target.value;
      o && !m.current && (h = Xi(h).slice(0, o).join("")), l(h);
    },
    id: n.id,
    onCompositionStart: (v) => {
      var h;
      m.current = !0, (h = n.onCompositionStart) === null || h === void 0 || h.call(n, v);
    },
    onCompositionEnd: (v) => {
      var h;
      if (m.current = !1, o) {
        const C = v.target.value;
        l(Xi(C).slice(0, o).join(""));
      }
      (h = n.onCompositionEnd) === null || h === void 0 || h.call(n, v);
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
p7.defaultProps = y1;
const Mt = "adm-toast", g7 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, y7 = (t) => {
  const e = z(g7, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: o
  } = e, a = oe(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(vf, {
          className: `${Mt}-icon-success`
        });
      case "fail":
        return s.createElement(Lo, {
          className: `${Mt}-icon-fail`
        });
      case "loading":
        return s.createElement(Js, {
          color: "white",
          className: `${Mt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = oe(() => {
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
    className: j(`${Mt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: j(`${Mt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: j(`${Mt}-main`, i ? `${Mt}-main-icon` : `${Mt}-main-text`)
  }, a && s.createElement("div", {
    className: `${Mt}-icon`
  }, a), s.createElement(ii, null, r))));
};
let Tt = null, Oa = null;
const eo = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, b7 = (t) => s.createElement(y7, Object.assign({}, t));
function E7(t) {
  const e = z(eo, typeof t == "string" ? {
    content: t
  } : t), n = s.createElement(b7, Object.assign({}, e, {
    onClose: () => {
      Tt = null;
    }
  }));
  return Tt ? Tt.replace(n) : Tt = wr(n), Oa && window.clearTimeout(Oa), e.duration !== 0 && (Oa = window.setTimeout(() => {
    b1();
  }, e.duration)), Tt;
}
function b1() {
  Tt == null || Tt.close(), Tt = null;
}
function w7(t) {
  t.duration !== void 0 && (eo.duration = t.duration), t.position !== void 0 && (eo.position = t.position), t.maskClickable !== void 0 && (eo.maskClickable = t.maskClickable);
}
const C7 = {
  show: E7,
  clear: b1,
  config: w7
}, F8 = C7;
function E1(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((o) => {
      o[e] ? i = Math.max(i, n(o[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const Ui = "adm-tree-select", x7 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, k7 = (t) => {
  const e = z(x7, t), [n, r, i] = wi(e.fieldNames), [o, a] = ae({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = oe(() => {
    const b = E1(e.options, i), g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
    function v(h, C) {
      C.forEach((p) => {
        y.set(p[r], h), g.set(p[r], p), p[i] && v(p, p[i]);
      });
    }
    return v(void 0, e.options), [b, g, y];
  }, [e.options]), f = (b) => {
    var g;
    const y = [];
    let v = b;
    for (; v; )
      y.push(v), v = u.get(v[r]);
    const h = y.reverse().map((C) => C[r]);
    a(h), (g = e.onChange) === null || g === void 0 || g.call(e, h, {
      options: y
    });
  }, d = (b = [], g) => b.map((y) => {
    const v = y[r] === o[g];
    return s.createElement("div", {
      key: y[r],
      className: j(`${Ui}-item`, {
        [`${Ui}-item-active`]: v
      }),
      onClick: () => {
        v || f(y);
      }
    }, y[n]);
  }), m = () => {
    var b;
    const g = [];
    for (let y = 0; y < l; y++) {
      let v = `${100 / l}%`;
      l === 2 && y === 0 && (v = "33.33%"), l === 2 && y === 1 && (v = "66.67%");
      const h = s.createElement("div", {
        key: y,
        className: j(`${Ui}-column`),
        style: {
          width: v
        }
      }, d(y === 0 ? e.options : (b = c.get(o[y - 1])) === null || b === void 0 ? void 0 : b[i], y));
      g.push(h);
    }
    return g;
  };
  return W(e, s.createElement("div", {
    className: Ui
  }, m()));
}, rt = "adm-tree-select-multiple", $7 = (t) => {
  const e = z({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  X(() => {
  }, []);
  const [n, r, i] = wi(e.fieldNames), [o, a] = ae({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ae({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const $ = [], N = (O) => {
      var L;
      O && (!((L = O[i]) === null || L === void 0) && L.length ? O[i].forEach((V) => N(V)) : $.push(O[r]));
    };
    return N(k), $;
  }, [f, d, m] = oe(() => {
    const k = E1(e.options, i), $ = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map();
    function O(L, V) {
      V.forEach((M) => {
        N.set(M[r], L), $.set(M[r], M), M[i] && O(M, M[i]);
      });
    }
    return O(void 0, e.options), [k, $, N];
  }, [e.options]), b = oe(() => {
    let k = [];
    return l.forEach(($) => {
      const N = d.get($);
      k = k.concat(u(N));
    }), k;
  }, [l, d]), g = oe(() => {
    const k = /* @__PURE__ */ new Map(), $ = (N) => {
      const O = m.get(N);
      O && (k.set(O[r], !0), $(O[r]));
    };
    return b.forEach((N) => {
      k.set(N, !0), $(N);
    }), k;
  }, [m, l]), y = (k) => {
    var $;
    let N = [...k], O = [];
    const L = (M) => {
      M.forEach((_) => {
        var I;
        if (O.includes(_))
          return;
        const F = m.get(_);
        if (!F)
          return;
        const S = ((I = F[i]) === null || I === void 0 ? void 0 : I.map((R) => R[r])) || [];
        S.every((R) => N.includes(R)) && (N.push(F[r]), O = O.concat(S));
      });
    };
    for (let M = 0; M < f; M++)
      L(N);
    N = N.filter((M) => !O.includes(M));
    const V = N.map((M) => d.get(M));
    c(N), ($ = e.onChange) === null || $ === void 0 || $.call(e, N, V);
  }, v = (k) => {
    var $;
    const N = [];
    let O = k;
    for (; O; )
      N.unshift(O), O = m.get(O[r]);
    const L = N.map((V) => V[r]);
    a(L), ($ = e.onExpand) === null || $ === void 0 || $.call(e, L, N);
  }, h = (k, $) => {
    var N;
    const O = (N = e.selectAllText) === null || N === void 0 ? void 0 : N[$];
    if (!O)
      return;
    let L = [];
    k.forEach((M) => {
      L = L.concat(u(M));
    });
    const V = L.every((M) => b.includes(M));
    return s.createElement("div", {
      onClick: () => {
        y(V ? b.filter((M) => !L.includes(M)) : b.concat(L));
      },
      className: `${rt}-item`
    }, O);
  }, C = (k, $) => {
    var N;
    const O = (N = e.selectAllText) === null || N === void 0 ? void 0 : N[$];
    if (!O)
      return;
    const L = k.map((_) => _[r]), V = L.every((_) => b.includes(_)), M = V ? !1 : L.some((_) => b.includes(_));
    return s.createElement("div", {
      onClick: () => {
        y(V ? b.filter((_) => !L.includes(_)) : b.concat(L));
      },
      className: j(`${rt}-item`, `${rt}-item-leaf`)
    }, s.createElement(Tc, {
      className: `${rt}-item-checkbox`,
      checked: V,
      indeterminate: M
    }), O);
  }, p = (k) => {
    const $ = o.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        $ || v(k);
      },
      className: j(`${rt}-item`, {
        [`${rt}-item-expand`]: $
      })
    }, k[n], !!g.get(k[r]) && s.createElement("div", {
      className: `${rt}-dot`
    }));
  }, E = (k) => {
    const $ = b.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        y($ ? b.filter((N) => N !== k[r]) : [...b, k[r]]);
      },
      className: j(`${rt}-item`, `${rt}-item-leaf`)
    }, s.createElement(Tc, {
      className: `${rt}-item-checkbox`,
      checked: $
    }), k[n]);
  }, w = (k = [], $) => k.length === 0 ? void 0 : f === $ + 1 ? s.createElement(s.Fragment, null, C(k, $), k.map((O) => E(O))) : s.createElement(s.Fragment, null, h(k, $), k.map((O) => p(O))), x = () => {
    var k;
    const $ = [];
    for (let N = 0; N < f; N++) {
      let O = `${100 / f}%`;
      f === 2 && N === 0 && (O = "33.33%"), f === 2 && N === 1 && (O = "66.67%");
      const L = s.createElement("div", {
        key: N,
        className: j(`${rt}-column`),
        style: {
          width: O
        }
      }, w(N === 0 ? e.options : (k = d.get(o[N - 1])) === null || k === void 0 ? void 0 : k[i], N));
      $.push(L);
    }
    return $;
  };
  return W(e, s.createElement("div", {
    className: rt
  }, x()));
}, N8 = fe(k7, {
  Multiple: $7
}), wn = "adm-virtual-input", _7 = {
  defaultValue: ""
}, P8 = ve((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = se(), i = z(_7, r, t), [o, a] = ae(i), l = D(null), c = D(null), [u, f] = Y(!1), d = un(s.createElement(Bs, null), r.clearIcon, t.clearIcon);
  function m() {
    const h = l.current;
    if (!h || document.activeElement !== h)
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
      var h;
      (h = l.current) === null || h === void 0 || h.focus();
    },
    blur: () => {
      var h;
      (h = l.current) === null || h === void 0 || h.blur();
    }
  }));
  function b() {
    var h;
    f(!0), (h = i.onFocus) === null || h === void 0 || h.call(i);
  }
  function g() {
    var h;
    f(!1), (h = i.onBlur) === null || h === void 0 || h.call(i);
  }
  const y = i.keyboard, v = y && s.cloneElement(y, {
    onInput: (h) => {
      var C, p;
      a(o + h), (p = (C = y.props).onInput) === null || p === void 0 || p.call(C, h);
    },
    onDelete: () => {
      var h, C;
      a(o.slice(0, -1)), (C = (h = y.props).onDelete) === null || C === void 0 || C.call(h);
    },
    visible: u,
    onClose: () => {
      var h, C, p, E;
      const w = document.activeElement;
      w && (!((h = l.current) === null || h === void 0) && h.contains(w)) ? w.blur() : (C = l.current) === null || C === void 0 || C.blur(), (E = (p = y.props).onClose) === null || E === void 0 || E.call(p);
    },
    getContainer: null
  });
  return W(i, s.createElement("div", {
    ref: l,
    className: j(wn, {
      [`${wn}-disabled`]: i.disabled
    }),
    tabIndex: i.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: b,
    onBlur: g,
    onClick: i.onClick
  }, s.createElement("div", {
    className: `${wn}-content`,
    ref: c,
    "aria-disabled": i.disabled,
    "aria-label": i.placeholder
  }, o, s.createElement("div", {
    className: `${wn}-caret-container`
  }, u && s.createElement("div", {
    className: `${wn}-caret`
  }))), i.clearable && !!o && u && s.createElement("div", {
    className: `${wn}-clear`,
    onClick: (h) => {
      var C;
      h.stopPropagation(), a(""), (C = i.onClear) === null || C === void 0 || C.call(i);
    },
    role: "button",
    "aria-label": n.Input.clear
  }, d), [void 0, null, ""].includes(o) && s.createElement("div", {
    className: `${wn}-placeholder`
  }, i.placeholder), v));
}), gu = "adm-water-mark", O7 = {
  fullPage: !0
}, R8 = (t) => {
  const e = z(O7, t), {
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
    fontFamily: v = "sans-serif"
  } = e, [h, C] = Y("");
  return X(() => {
    const p = document.createElement("canvas"), E = window.devicePixelRatio, w = p.getContext("2d"), x = `${(r + o) * E}px`, k = `${(i + a) * E}px`, $ = o * E, N = a * E;
    if (p.setAttribute("width", x), p.setAttribute("height", k), w) {
      if (c) {
        w.translate($ / 2, N / 2), w.rotate(Math.PI / 180 * Number(l));
        const O = new Image();
        O.crossOrigin = "anonymous", O.referrerPolicy = "no-referrer", O.onload = () => {
          w.drawImage(O, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), C(p.toDataURL());
        }, O.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate($ / 2, N / 2), w.rotate(Math.PI / 180 * Number(l));
        const O = Number(y) * E;
        w.font = `${m} normal ${b} ${O}px/${N}px ${v}`, w.fillStyle = g, Array.isArray(d) ? d.forEach((L, V) => w.fillText(L, 0, V * O)) : w.fillText(d, 0, 0), w.restore(), C(p.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, b, o, a, v, g, c, d, y]), W(e, s.createElement("div", {
    className: j(gu, {
      [`${gu}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + o}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: h === "" ? void 0 : `url('${h}')`
    }
  }));
}, Cn = "adm-footer", S7 = {
  label: "",
  links: [],
  content: "",
  chips: []
}, M8 = (t) => {
  const e = z(S7, t), {
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
    className: j(Cn)
  }, n && s.createElement("div", {
    className: `${Cn}-label`
  }, s.createElement(qa, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${Cn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(qa, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${Cn}-content`
  }, i), o && o.length > 0 && s.createElement("div", {
    className: `${Cn}-chips`
  }, o.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: j(`${Cn}-chip`, {
      [`${Cn}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  I7 as ActionSheet,
  ii as AutoCenter,
  A7 as Avatar,
  Za as Badge,
  Lt as Button,
  T7 as Calendar,
  L7 as CalendarPicker,
  w4 as CalendarPickerView,
  D7 as CapsuleTabs,
  V7 as Card,
  W7 as CascadePicker,
  Z7 as CascadePickerView,
  H7 as Cascader,
  mv as CascaderView,
  cd as CenterPopup,
  Ic as CheckList,
  Tc as Checkbox,
  z7 as Collapse,
  R7 as ConfigProvider,
  U7 as DatePicker,
  q7 as DatePickerView,
  K7 as Dialog,
  qa as Divider,
  Rf as DotLoading,
  Y7 as Dropdown,
  G7 as Ellipsis,
  X7 as Empty,
  Q7 as ErrorBlock,
  J7 as FloatingBubble,
  e8 as FloatingPanel,
  M8 as Footer,
  t8 as Form,
  t1 as Grid,
  jo as Image,
  n8 as ImageUploader,
  G5 as ImageViewer,
  r8 as IndexBar,
  i8 as InfiniteScroll,
  u1 as Input,
  o8 as JumboTabs,
  xt as List,
  Rf as Loading,
  pi as Mask,
  a8 as Modal,
  s8 as NavBar,
  l8 as NoticeBar,
  c8 as NumberKeyboard,
  b6 as PageIndicator,
  u8 as PasscodeInput,
  rd as Picker,
  Qo as PickerView,
  Qd as Popover,
  br as Popup,
  f8 as ProgressBar,
  d8 as ProgressCircle,
  m8 as PullToRefresh,
  h8 as Radio,
  v8 as Rate,
  p8 as Result,
  g8 as ResultPage,
  Er as SafeArea,
  Kf as ScrollMask,
  y8 as SearchBar,
  b8 as Selector,
  E8 as SideBar,
  Di as Skeleton,
  w8 as Slider,
  El as Space,
  Js as SpinLoading,
  C8 as Stepper,
  x8 as Steps,
  k8 as SwipeAction,
  $8 as Swiper,
  _8 as Switch,
  O8 as TabBar,
  Mc as Tabs,
  S8 as Tag,
  p7 as TextArea,
  F8 as Toast,
  N8 as TreeSelect,
  P8 as VirtualInput,
  R8 as WaterMark,
  sp as createErrorBlock,
  j7 as reduceMotion,
  B7 as restoreMotion,
  P7 as setDefaultConfig,
  se as useConfig
};
