import * as L from "react";
import s, { useContext as at, useRef as V, useMemo as ie, useEffect as X, useState as K, useCallback as ze, useLayoutEffect as vs, forwardRef as me, useImperativeHandle as be, memo as je, isValidElement as An, createContext as ps, cloneElement as y1 } from "react";
import * as b1 from "react-dom";
import { unstable_batchedUpdates as E1, createPortal as w1, findDOMNode as C1 } from "react-dom";
const ur = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
ur && document.addEventListener("touchstart", () => {
}, !0);
var ea = function() {
  return ea = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, ea.apply(this, arguments);
};
function fr(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Oe(t, e, n, r) {
  function i(a) {
    return a instanceof n ? a : new n(function(o) {
      o(a);
    });
  }
  return new (n || (n = Promise))(function(a, o) {
    function l(f) {
      try {
        u(r.next(f));
      } catch (d) {
        o(d);
      }
    }
    function c(f) {
      try {
        u(r.throw(f));
      } catch (d) {
        o(d);
      }
    }
    function u(f) {
      f.done ? a(f.value) : i(f.value).then(l, c);
    }
    u((r = r.apply(t, e || [])).next());
  });
}
function x1(t, e) {
  var n = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, r, i, a, o;
  return o = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function l(u) {
    return function(f) {
      return c([u, f]);
    };
  }
  function c(u) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, u[0] && (n = 0)), n; )
      try {
        if (r = 1, i && (a = u[0] & 2 ? i.return : u[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, u[1])).done)
          return a;
        switch (i = 0, a && (u = [u[0] & 2, a.value]), u[0]) {
          case 0:
          case 1:
            a = u;
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
            if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (u[0] === 6 || u[0] === 2)) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!a || u[1] > a[0] && u[1] < a[3])) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < a[1]) {
              n.label = a[1], a = u;
              break;
            }
            if (a && n.label < a[2]) {
              n.label = a[2], n.ops.push(u);
              break;
            }
            a[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = e.call(t, n);
      } catch (f) {
        u = [6, f], i = 0;
      } finally {
        r = a = 0;
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
function xt(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var r = n.call(t), i, a = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; )
      a.push(i.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return a;
}
function gs(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, a; r < i; r++)
      (a || !(r in e)) && (a || (a = Array.prototype.slice.call(e, 0, r)), a[r] = e[r]);
  return t.concat(a || Array.prototype.slice.call(e));
}
function $1(t, e) {
  function n(r, i) {
    if (typeof r != "object" || typeof i != "object" || Array.isArray(r) || Array.isArray(i))
      return i !== void 0 ? i : r;
    const a = {};
    for (const o in r)
      r.hasOwnProperty(o) && (a[o] = n(r[o], i[o]));
    return a;
  }
  return n(t, e);
}
const qe = "${label} is not a valid ${type}", _1 = {
  locale: "en",
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    loading: "Loading",
    close: "Close"
  },
  Calendar: {
    title: "Date selection",
    confirm: "Confirm",
    start: "start",
    end: "end",
    today: "today",
    markItems: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yearAndMonth: "${year}/${month}"
  },
  Cascader: {
    placeholder: "Selecting"
  },
  Dialog: {
    ok: "OK"
  },
  DatePicker: {
    tillNow: "Till Now"
  },
  ErrorBlock: {
    default: {
      title: "Oops, something went wrong",
      description: "Please wait a minute and try again"
    },
    busy: {
      title: "Oops, not loading",
      description: "Try to refresh the page"
    },
    disconnected: {
      title: "Network is busy",
      description: "Try to refresh the page"
    },
    empty: {
      title: "Hmm, couldn't find that...",
      description: "Want to try a new search?"
    }
  },
  Form: {
    required: "Required",
    optional: "Optional",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
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
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  ImageUploader: {
    uploading: "Uploading...",
    upload: "Upload"
  },
  InfiniteScroll: {
    noMore: "No more",
    failedToLoad: "Failed to load",
    retry: "Retry"
  },
  Input: {
    clear: "clear"
  },
  Mask: {
    name: "Mask"
  },
  Modal: {
    ok: "OK"
  },
  PasscodeInput: {
    name: "Passcode Input"
  },
  PullToRefresh: {
    pulling: "Scroll down to refresh",
    canRelease: "Release to refresh immediately",
    complete: "Refresh successful"
  },
  SearchBar: {
    name: "Search Bar"
  },
  Slider: {
    name: "Slider"
  },
  Stepper: {
    decrease: "decrease",
    increase: "increase"
  },
  Switch: {
    name: "Switch"
  },
  Selector: {
    name: "Selector"
  }
}, Ke = "${label}不是一个有效的${type}", O1 = $1(_1, {
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
}), S1 = O1, vu = {
  current: {
    locale: S1
  }
};
function S7(t) {
  vu.current = t;
}
function ci() {
  return vu.current;
}
const pu = s.createContext(null), F7 = (t) => {
  const {
    children: e
  } = t, n = fr(t, ["children"]), r = ye();
  return s.createElement(pu.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function ye() {
  var t;
  return (t = at(pu)) !== null && t !== void 0 ? t : ci();
}
function le(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var dt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _t(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var gu = { exports: {} };
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
        var a = arguments[i];
        if (a) {
          var o = typeof a;
          if (o === "string" || o === "number")
            r.push(a);
          else if (Array.isArray(a)) {
            if (a.length) {
              var l = n.apply(null, a);
              l && r.push(l);
            }
          } else if (o === "object") {
            if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]")) {
              r.push(a.toString());
              continue;
            }
            for (var c in a)
              e.call(a, c) && a[c] && r.push(c);
          }
        }
      }
      return r.join(" ");
    }
    t.exports ? (n.default = n, t.exports = n) : window.classNames = n;
  })();
})(gu);
var F1 = gu.exports;
const j = /* @__PURE__ */ _t(F1);
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
var yu = function(t) {
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
}, dr = function(t) {
  return typeof t == "function";
}, N1 = function(t) {
  return typeof t == "number";
}, P1 = !1;
const ui = P1;
function jt(t) {
  ui && (dr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
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
const ys = yu(X);
function wl(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function Ca(t) {
  var e = V(t);
  return e.current = t, e;
}
var R1 = function(t) {
  ui && (dr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = Ca(t);
  X(function() {
    return function() {
      e.current();
    };
  }, []);
};
const fi = R1;
function M1(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var bs = M1, A1 = typeof dt == "object" && dt && dt.Object === Object && dt, T1 = A1, I1 = T1, L1 = typeof self == "object" && self && self.Object === Object && self, D1 = I1 || L1 || Function("return this")(), bu = D1, V1 = bu, j1 = function() {
  return V1.Date.now();
}, B1 = j1, W1 = /\s/;
function Z1(t) {
  for (var e = t.length; e-- && W1.test(t.charAt(e)); )
    ;
  return e;
}
var H1 = Z1, z1 = H1, U1 = /^\s+/;
function q1(t) {
  return t && t.slice(0, z1(t) + 1).replace(U1, "");
}
var K1 = q1, Y1 = bu, G1 = Y1.Symbol, Eu = G1, Cl = Eu, wu = Object.prototype, X1 = wu.hasOwnProperty, Q1 = wu.toString, Cr = Cl ? Cl.toStringTag : void 0;
function J1(t) {
  var e = X1.call(t, Cr), n = t[Cr];
  try {
    t[Cr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Q1.call(t);
  return r && (e ? t[Cr] = n : delete t[Cr]), i;
}
var e0 = J1, t0 = Object.prototype, n0 = t0.toString;
function r0(t) {
  return n0.call(t);
}
var i0 = r0, xl = Eu, a0 = e0, o0 = i0, s0 = "[object Null]", l0 = "[object Undefined]", kl = xl ? xl.toStringTag : void 0;
function c0(t) {
  return t == null ? t === void 0 ? l0 : s0 : kl && kl in Object(t) ? a0(t) : o0(t);
}
var u0 = c0;
function f0(t) {
  return t != null && typeof t == "object";
}
var d0 = f0, m0 = u0, h0 = d0, v0 = "[object Symbol]";
function p0(t) {
  return typeof t == "symbol" || h0(t) && m0(t) == v0;
}
var g0 = p0, y0 = K1, $l = bs, b0 = g0, _l = NaN, E0 = /^[-+]0x[0-9a-f]+$/i, w0 = /^0b[01]+$/i, C0 = /^0o[0-7]+$/i, x0 = parseInt;
function k0(t) {
  if (typeof t == "number")
    return t;
  if (b0(t))
    return _l;
  if ($l(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = $l(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = y0(t);
  var n = w0.test(t);
  return n || C0.test(t) ? x0(t.slice(2), n ? 2 : 8) : E0.test(t) ? _l : +t;
}
var $0 = k0, _0 = bs, to = B1, Ol = $0, O0 = "Expected a function", S0 = Math.max, F0 = Math.min;
function N0(t, e, n) {
  var r, i, a, o, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(O0);
  e = Ol(e) || 0, _0(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? S0(Ol(n.maxWait) || 0, e) : a, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var k = r, N = i;
    return r = i = void 0, u = x, o = t.apply(N, k), o;
  }
  function p(x) {
    return u = x, l = setTimeout(y, e), f ? b(x) : o;
  }
  function v(x) {
    var k = x - c, N = x - u, F = e - k;
    return d ? F0(F, a - N) : F;
  }
  function g(x) {
    var k = x - c, N = x - u;
    return c === void 0 || k >= e || k < 0 || d && N >= a;
  }
  function y() {
    var x = to();
    if (g(x))
      return C(x);
    l = setTimeout(y, v(x));
  }
  function C(x) {
    return l = void 0, m && r ? b(x) : (r = i = void 0, o);
  }
  function h() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? o : C(to());
  }
  function w() {
    var x = to(), k = g(x);
    if (r = arguments, i = this, c = x, k) {
      if (l === void 0)
        return p(c);
      if (d)
        return clearTimeout(l), l = setTimeout(y, e), b(c);
    }
    return l === void 0 && (l = setTimeout(y, e)), o;
  }
  return w.cancel = h, w.flush = E, w;
}
var Cu = N0;
const P0 = /* @__PURE__ */ _t(Cu);
var R0 = !!(typeof window < "u" && window.document && window.document.createElement);
const Es = R0;
var M0 = Cu, A0 = bs, T0 = "Expected a function";
function I0(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(T0);
  return A0(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), M0(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var L0 = I0;
const D0 = /* @__PURE__ */ _t(L0);
var V0 = function(t) {
  ui && (dr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), X(function() {
    t == null || t();
  }, []);
};
const j0 = V0;
var B0 = function() {
  var t = xt(K({}), 2), e = t[1];
  return ze(function() {
    return e({});
  }, []);
};
const xu = B0;
function tn(t, e) {
  if (Es) {
    if (!t)
      return e;
    var n;
    return dr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var W0 = function(t) {
  return t.every(function(e) {
    var n = tn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, Z0 = function(t) {
  return t ? t.getRootNode() : document;
}, H0 = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return W0(e) ? Z0(tn(e[0])) : document;
};
const z0 = H0;
var U0 = function(t) {
  var e = function(n, r, i) {
    var a = V(!1), o = V([]), l = V([]), c = V();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return tn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== o.current.length || !wl(d, o.current) || !wl(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, l.current = r, c.current = n());
    }), fi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return e;
};
const ku = U0;
var q0 = ku(X);
const ws = q0;
function $u(t, e, n) {
  n === void 0 && (n = "click");
  var r = Ca(t);
  ws(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = tn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, a = z0(e), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(l) {
      return a.addEventListener(l, i);
    }), function() {
      o.forEach(function(l) {
        return a.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var _u = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(dt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", p = "date", v = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
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
      return { M: d, y: b, w: f, d: u, D: p, h: c, m: l, s: o, ms: a, Q: m }[R] || String(R || "").toLowerCase().replace(/s$/, "");
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
            var P = O.match(g);
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
          case p:
            return B(G + "Hours", 0);
          case c:
            return B(G + "Minutes", 1);
          case l:
            return B(G + "Seconds", 2);
          case o:
            return B(G + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, $.endOf = function(M) {
        return this.startOf(M, !1);
      }, $.$set = function(M, S) {
        var O, A = _.p(M), P = "set" + (this.$u ? "UTC" : ""), T = (O = {}, O[u] = P + "Date", O[p] = P + "Date", O[d] = P + "Month", O[b] = P + "FullYear", O[c] = P + "Hours", O[l] = P + "Minutes", O[o] = P + "Seconds", O[a] = P + "Milliseconds", O)[A], B = A === u ? this.$D + (S - this.$W) : S;
        if (A === d || A === b) {
          var Z = this.clone().set(p, 1);
          Z.$d[T](B), Z.init(), this.$d = Z.set(p, Math.min(this.$D, Z.daysInMonth())).$d;
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
        var B = (O = {}, O[l] = r, O[c] = i, O[o] = n, O)[P] || 1, Z = this.$d.getTime() + M * B;
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
        return A.replace(y, function(z, ee) {
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
          case o:
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
    return F.prototype = I, [["$ms", a], ["$s", o], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", p]].forEach(function(R) {
      I[R[1]] = function($) {
        return this.$g($, R[0], R[1]);
      };
    }), F.extend = function(R, $) {
      return R.$i || (R($, D, F), R.$i = !0), F;
    }, F.locale = N, F.isDayjs = k, F.unix = function(R) {
      return F(1e3 * R);
    }, F.en = x[w], F.Ls = x, F.p = {}, F;
  });
})(_u);
var K0 = _u.exports;
const ve = /* @__PURE__ */ _t(K0);
function Y0(t, e) {
  var n;
  ui && (dr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = Ca(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ie(function() {
    return P0(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, gs([], xt(o), !1));
    }, i, e);
  }, []);
  return fi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function G0(t, e, n) {
  var r = xt(K({}), 2), i = r[0], a = r[1], o = Y0(function() {
    a({});
  }, n).run;
  X(function() {
    return o();
  }, e), ys(t, [i]);
}
function X0(t) {
  var e = xt(K(t), 2), n = e[0], r = e[1], i = V(n);
  i.current = n;
  var a = ze(function() {
    return i.current;
  }, []);
  return [n, r, a];
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
  function a(h) {
    this.time = h.time, this.target = h.target, this.rootBounds = p(h.rootBounds), this.boundingClientRect = p(h.boundingClientRect), this.intersectionRect = p(h.intersectionRect || b()), this.isIntersecting = !!h.intersectionRect;
    var E = this.boundingClientRect, w = E.width * E.height, x = this.intersectionRect, k = x.width * x.height;
    w ? this.intersectionRatio = Number((k / w).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(h, E) {
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
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(h, E) {
      !h || !E ? i = b() : i = v(h, E), n.forEach(function(w) {
        w._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(h) {
    var E = this._observationTargets.some(function(w) {
      return w.element == h;
    });
    if (!E) {
      if (!(h && h.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: h, entry: null }), this._monitorIntersections(h.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(h) {
    this._observationTargets = this._observationTargets.filter(function(E) {
      return E.element != h;
    }), this._unmonitorIntersections(h.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var h = this._queuedEntries.slice();
    return this._queuedEntries = [], h;
  }, o.prototype._initThresholds = function(h) {
    var E = h || [0];
    return Array.isArray(E) || (E = [E]), E.sort().filter(function(w, x, k) {
      if (typeof w != "number" || isNaN(w) || w < 0 || w > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return w !== k[x - 1];
    });
  }, o.prototype._parseRootMargin = function(h) {
    var E = h || "0px", w = E.split(/\s+/).map(function(x) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(x);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return w[1] = w[1] || w[0], w[2] = w[2] || w[0], w[3] = w[3] || w[1], w;
  }, o.prototype._monitorIntersections = function(h) {
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
  }, o.prototype._unmonitorIntersections = function(h) {
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
  }, o.prototype._unmonitorAllIntersections = function() {
    var h = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var E = 0; E < h.length; E++)
      h[E]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var h = this._rootIsInDom(), E = h ? this._getRootRect() : b();
      this._observationTargets.forEach(function(w) {
        var x = w.element, k = m(x), N = this._rootContainsTarget(x), F = w.entry, _ = h && N && this._computeTargetAndRootIntersection(x, k, E), D = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (D = E) : D = b();
        var I = w.entry = new a({
          time: l(),
          target: x,
          boundingClientRect: k,
          rootBounds: D,
          intersectionRect: _
        });
        F ? h && N ? this._hasCrossedThreshold(F, I) && this._queuedEntries.push(I) : F && F.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(h, E, w) {
    if (window.getComputedStyle(h).display != "none") {
      for (var x = E, k = y(h), N = !1; !N && k; ) {
        var F = null, _ = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (_.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (N = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, F = null, x = null) : F = i : F = w;
          else {
            var D = y(k), I = D && m(D), R = D && this._computeTargetAndRootIntersection(D, I, w);
            I && R ? (k = D, F = v(I, R)) : (k = null, x = null);
          }
        else {
          var $ = k.ownerDocument;
          k != $.body && k != $.documentElement && _.overflow != "visible" && (F = m(k));
        }
        if (F && (x = d(F, x)), !x)
          break;
        k = k && y(k);
      }
      return x;
    }
  }, o.prototype._getRootRect = function() {
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
  }, o.prototype._expandRectByRootMargin = function(h) {
    var E = this._rootMarginValues.map(function(x, k) {
      return x.unit == "px" ? x.value : x.value * (k % 2 ? h.width : h.height) / 100;
    }), w = {
      top: h.top - E[0],
      right: h.right + E[1],
      bottom: h.bottom + E[2],
      left: h.left - E[3]
    };
    return w.width = w.right - w.left, w.height = w.bottom - w.top, w;
  }, o.prototype._hasCrossedThreshold = function(h, E) {
    var w = h && h.isIntersecting ? h.intersectionRatio || 0 : -1, x = E.isIntersecting ? E.intersectionRatio || 0 : -1;
    if (w !== x)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == w || N == x || N < w != N < x)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || g(e, this.root);
  }, o.prototype._rootContainsTarget = function(h) {
    var E = this.root && (this.root.ownerDocument || this.root) || e;
    return g(E, h) && (!this.root || E == h.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
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
  function p(h) {
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
  function g(h, E) {
    for (var w = E; w; ) {
      if (w == h)
        return !0;
      w = y(w);
    }
    return !1;
  }
  function y(h) {
    var E = h.parentNode;
    return h.nodeType == /* DOCUMENT */
    9 && h != e ? t(h) : (E && E.assignedSlot && (E = E.assignedSlot.parentNode), E && E.nodeType == 11 && E.host ? E.host : E);
  }
  function C(h) {
    return h && h.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function Q0(t, e) {
  var n = xt(K(), 2), r = n[0], i = n[1], a = xt(K(), 2), o = a[0], l = a[1];
  return ws(function() {
    var c = tn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = k1(f), p = b.next(); !p.done; p = b.next()) {
            var v = p.value;
            l(v.intersectionRatio), i(v.isIntersecting);
          }
        } catch (g) {
          d = {
            error: g
          };
        } finally {
          try {
            p && !p.done && (m = b.return) && m.call(b);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, ea(ea({}, e), {
        root: tn(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, o];
}
var J0 = Es ? vs : X;
const Fe = J0;
function em(t) {
  var e = this, n = V(!1);
  return ze(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Oe(e, void 0, void 0, function() {
      var a, o;
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
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, gs([], xt(r), !1))];
          case 2:
            return a = l.sent(), n.current = !1, [2, a];
          case 3:
            throw o = l.sent(), n.current = !1, o;
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
function tm(t) {
  var e = V(0), n = xt(K(t), 2), r = n[0], i = n[1], a = ze(function(o) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return fi(function() {
    cancelAnimationFrame(e.current);
  }), [r, a];
}
var nm = function() {
  var t = V(!1);
  return X(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const Cs = nm;
var Ou = function() {
  if (typeof Map < "u")
    return Map;
  function t(e, n) {
    var r = -1;
    return e.some(function(i, a) {
      return i[0] === n ? (r = a, !0) : !1;
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
        for (var i = 0, a = this.__entries__; i < a.length; i++) {
          var o = a[i];
          n.call(r, o[1], o[0]);
        }
      }, e;
    }()
  );
}(), Oo = typeof window < "u" && typeof document < "u" && window.document === document, ta = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), rm = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ta) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), im = 2;
function am(t, e) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, t()), r && l();
  }
  function o() {
    rm(a);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < im)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, e);
    i = c;
  }
  return l;
}
var om = 20, sm = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], lm = typeof MutationObserver < "u", cm = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = am(this.refresh.bind(this), om);
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
      !Oo || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), lm ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !Oo || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = sm.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), Su = function(t, e) {
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
}, tr = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || ta;
}, Fu = xa(0, 0, 0, 0);
function na(t) {
  return parseFloat(t) || 0;
}
function Sl(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var a = t["border-" + i + "-width"];
    return r + na(a);
  }, 0);
}
function um(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var a = i[r], o = t["padding-" + a];
    n[a] = na(o);
  }
  return n;
}
function fm(t) {
  var e = t.getBBox();
  return xa(0, 0, e.width, e.height);
}
function dm(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return Fu;
  var r = tr(t).getComputedStyle(t), i = um(r), a = i.left + i.right, o = i.top + i.bottom, l = na(r.width), c = na(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + a) !== e && (l -= Sl(r, "left", "right") + a), Math.round(c + o) !== n && (c -= Sl(r, "top", "bottom") + o)), !hm(t)) {
    var u = Math.round(l + a) - e, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return xa(i.left, i.top, l, c);
}
var mm = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof tr(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof tr(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function hm(t) {
  return t === tr(t).document.documentElement;
}
function vm(t) {
  return Oo ? mm(t) ? fm(t) : dm(t) : Fu;
}
function pm(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return Su(o, {
    x: e,
    y: n,
    width: r,
    height: i,
    top: n,
    right: e + r,
    bottom: i + n,
    left: e
  }), o;
}
function xa(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var gm = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = xa(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = vm(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), ym = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = pm(n);
      Su(this, { target: e, contentRect: r });
    }
    return t;
  }()
), bm = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Ou(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof tr(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new gm(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof tr(e).Element))
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
          return new ym(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), Nu = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Ou(), Pu = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = cm.getInstance(), r = new bm(e, n, this);
      Nu.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  Pu.prototype[t] = function() {
    var e;
    return (e = Nu.get(this))[t].apply(e, arguments);
  };
});
var Em = function() {
  return typeof ta.ResizeObserver < "u" ? ta.ResizeObserver : Pu;
}(), wm = ku(vs);
const Cm = wm;
var xm = Es ? Cm : ws;
const km = xm;
function So(t) {
  var e = xt(tm(function() {
    var i = tn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return km(function() {
    var i = tn(t);
    if (i) {
      var a = new Em(function(o) {
        o.forEach(function(l) {
          var c = l.target, u = c.clientWidth, f = c.clientHeight;
          r({
            width: u,
            height: f
          });
        });
      });
      return a.observe(i), function() {
        a.disconnect();
      };
    }
  }, [], t), n;
}
function ka(t, e) {
  var n;
  ui && (dr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = Ca(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ie(function() {
    return D0(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, gs([], xt(o), !1));
    }, i, e);
  }, []);
  return fi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var $m = function(t, e) {
  var n = jt(t), r = V(null), i = ze(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return X(function() {
    if (!(!N1(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const _m = $m, Fl = 10;
function Om(t, e) {
  return t > e && t > Fl ? "horizontal" : e > t && e > Fl ? "vertical" : "";
}
function Sm() {
  const t = V(0), e = V(0), n = V(0), r = V(0), i = V(0), a = V(0), o = V(""), l = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = Om(i.current, a.current));
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
    offsetY: a,
    direction: o,
    isVertical: l,
    isHorizontal: c
  };
}
const Fm = ur ? window : void 0, Nm = ["scroll", "auto", "overlay"];
function Pm(t) {
  return t.nodeType === 1;
}
function ra(t, e = Fm) {
  let n = t;
  for (; n && n !== e && Pm(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Nm.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Fn = !1;
if (ur)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Fn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let xr = 0;
const Nl = "adm-overflow-hidden";
function Rm(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function $a(t, e) {
  const n = Sm(), r = (o) => {
    n.move(o);
    const l = n.deltaY.current > 0 ? "10" : "01", c = ra(o.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const p = Rm(o.target);
      if (p === document.body || p === document.documentElement) {
        o.preventDefault();
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
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(l, 2)) && o.cancelable && Fn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Fn ? {
      passive: !1
    } : !1), xr || document.body.classList.add(Nl), xr++;
  }, a = () => {
    xr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), xr--, xr || document.body.classList.remove(Nl));
  };
  X(() => {
    if (e)
      return i(), () => {
        a();
      };
  }, [e]);
}
let xs = mi();
const Q = (t) => di(t, xs);
let ks = mi();
Q.write = (t) => di(t, ks);
let _a = mi();
Q.onStart = (t) => di(t, _a);
let $s = mi();
Q.onFrame = (t) => di(t, $s);
let _s = mi();
Q.onFinish = (t) => di(t, _s);
let Xn = [];
Q.setTimeout = (t, e) => {
  let n = Q.now() + e, r = () => {
    let a = Xn.findIndex((o) => o.cancel == r);
    ~a && Xn.splice(a, 1), Qt -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return Xn.splice(Ru(n), 0, i), Qt += 1, Mu(), i;
};
let Ru = (t) => ~(~Xn.findIndex((e) => e.time > t) || ~Xn.length);
Q.cancel = (t) => {
  _a.delete(t), $s.delete(t), _s.delete(t), xs.delete(t), ks.delete(t);
};
Q.sync = (t) => {
  Fo = !0, Q.batchedUpdates(t), Fo = !1;
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
    _a.delete(n), e = null;
  }, r;
};
let Os = typeof window < "u" ? window.requestAnimationFrame : () => {
};
Q.use = (t) => Os = t;
Q.now = typeof performance < "u" ? () => performance.now() : Date.now;
Q.batchedUpdates = (t) => t();
Q.catch = console.error;
Q.frameLoop = "always";
Q.advance = () => {
  Q.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Tu();
};
let Xt = -1, Qt = 0, Fo = !1;
function di(t, e) {
  Fo ? (e.delete(t), t(0)) : (e.add(t), Mu());
}
function Mu() {
  Xt < 0 && (Xt = 0, Q.frameLoop !== "demand" && Os(Au));
}
function Mm() {
  Xt = -1;
}
function Au() {
  ~Xt && (Os(Au), Q.batchedUpdates(Tu));
}
function Tu() {
  let t = Xt;
  Xt = Q.now();
  let e = Ru(Xt);
  if (e && (Iu(Xn.splice(0, e), (n) => n.handler()), Qt -= e), !Qt) {
    Mm();
    return;
  }
  _a.flush(), xs.flush(t ? Math.min(64, Xt - t) : 16.667), $s.flush(), ks.flush(), _s.flush();
}
function mi() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      Qt += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return Qt -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), Qt -= e.size, Iu(e, (r) => r(n) && t.add(r)), Qt += t.size, e = t);
    }
  };
}
function Iu(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      Q.catch(r);
    }
  });
}
function No() {
}
const Am = (t, e, n) => Object.defineProperty(t, e, {
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
function Mt(t, e) {
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
function kt(t, e, n) {
  if (H.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const Ge = (t) => H.und(t) ? [] : H.arr(t) ? t : [t];
function Wr(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), re(n, e);
  }
}
const Vr = (t, ...e) => Wr(t, (n) => n(...e)), Ss = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Fs, Lu, en = null, Du = !1, Ns = No;
const Tm = (t) => {
  t.to && (Lu = t.to), t.now && (Q.now = t.now), t.colors !== void 0 && (en = t.colors), t.skipAnimation != null && (Du = t.skipAnimation), t.createStringInterpolator && (Fs = t.createStringInterpolator), t.requestAnimationFrame && Q.use(t.requestAnimationFrame), t.batchedUpdates && (Q.batchedUpdates = t.batchedUpdates), t.willAdvance && (Ns = t.willAdvance), t.frameLoop && (Q.frameLoop = t.frameLoop);
};
var ot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Fs;
  },
  get to() {
    return Lu;
  },
  get colors() {
    return en;
  },
  get skipAnimation() {
    return Du;
  },
  get willAdvance() {
    return Ns;
  },
  assign: Tm
});
const Zr = /* @__PURE__ */ new Set();
let it = [], no = [], ia = 0;
const Oa = {
  get idle() {
    return !Zr.size && !it.length;
  },
  start(t) {
    ia > t.priority ? (Zr.add(t), Q.onStart(Im)) : (Vu(t), Q(Po));
  },
  advance: Po,
  sort(t) {
    if (ia)
      Q.onFrame(() => Oa.sort(t));
    else {
      const e = it.indexOf(t);
      ~e && (it.splice(e, 1), ju(t));
    }
  },
  clear() {
    it = [], Zr.clear();
  }
};
function Im() {
  Zr.forEach(Vu), Zr.clear(), Q(Po);
}
function Vu(t) {
  it.includes(t) || ju(t);
}
function ju(t) {
  it.splice(Lm(it, (e) => e.priority > t.priority), 0, t);
}
function Po(t) {
  const e = no;
  for (let n = 0; n < it.length; n++) {
    const r = it[n];
    ia = r.priority, r.idle || (Ns(r), r.advance(t), r.idle || e.push(r));
  }
  return ia = 0, no = it, no.length = 0, it = e, it.length > 0;
}
function Lm(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Dm = (t, e, n) => Math.min(Math.max(n, t), e), Vm = {
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
}, mt = "[-+]?\\d*\\.?\\d+", aa = mt + "%";
function Sa(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const jm = new RegExp("rgb" + Sa(mt, mt, mt)), Bm = new RegExp("rgba" + Sa(mt, mt, mt, mt)), Wm = new RegExp("hsl" + Sa(mt, aa, aa)), Zm = new RegExp("hsla" + Sa(mt, aa, aa, mt)), Hm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, zm = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Um = /^#([0-9a-fA-F]{6})$/, qm = /^#([0-9a-fA-F]{8})$/;
function Km(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = Um.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : en && en[t] !== void 0 ? en[t] : (e = jm.exec(t)) ? (In(e[1]) << 24 | In(e[2]) << 16 | In(e[3]) << 8 | 255) >>> 0 : (e = Bm.exec(t)) ? (In(e[1]) << 24 | In(e[2]) << 16 | In(e[3]) << 8 | Ml(e[4])) >>> 0 : (e = Hm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = qm.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = zm.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Wm.exec(t)) ? (Pl(Rl(e[1]), Si(e[2]), Si(e[3])) | 255) >>> 0 : (e = Zm.exec(t)) ? (Pl(Rl(e[1]), Si(e[2]), Si(e[3])) | Ml(e[4])) >>> 0 : null;
}
function ro(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Pl(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, a = ro(i, r, t + 1 / 3), o = ro(i, r, t), l = ro(i, r, t - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(l * 255) << 8;
}
function In(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function Rl(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Ml(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function Si(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Al(t) {
  let e = Km(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, a = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const Yr = (t, e, n) => {
  if (H.fun(t))
    return t;
  if (H.arr(t))
    return Yr({
      range: t,
      output: e,
      extrapolate: n
    });
  if (H.str(t.output[0]))
    return Fs(t);
  const r = t, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Gm(u, a);
    return Ym(u, a[f], a[f + 1], i[f], i[f + 1], c, o, l, r.map);
  };
};
function Ym(t, e, n, r, i, a, o, l, c) {
  let u = c ? c(t) : t;
  if (u < e) {
    if (o === "identity")
      return u;
    o === "clamp" && (u = e);
  }
  if (u > n) {
    if (l === "identity")
      return u;
    l === "clamp" && (u = n);
  }
  return r === i ? r : e === n ? t <= e ? r : i : (e === -1 / 0 ? u = -u : n === 1 / 0 ? u = u - e : u = (u - e) / (n - e), u = a(u), r === -1 / 0 ? u = -u : i === 1 / 0 ? u = u + r : u = u * (i - r) + r, u);
}
function Gm(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Xm = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Dm(0, 1, i / t);
}, oa = 1.70158, Fi = oa * 1.525, Tl = oa + 1, Il = 2 * Math.PI / 3, Ll = 2 * Math.PI / 4.5, Ni = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Qm = {
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
  easeInBack: (t) => Tl * t * t * t - oa * t * t,
  easeOutBack: (t) => 1 + Tl * Math.pow(t - 1, 3) + oa * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Fi + 1) * 2 * t - Fi) / 2 : (Math.pow(2 * t - 2, 2) * ((Fi + 1) * (t * 2 - 2) + Fi) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Il),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Il) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Ll)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Ll) / 2 + 1,
  easeInBounce: (t) => 1 - Ni(1 - t),
  easeOutBounce: Ni,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Ni(1 - 2 * t)) / 2 : (1 + Ni(2 * t - 1)) / 2,
  steps: Xm
};
function Ro() {
  return Ro = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ro.apply(this, arguments);
}
const nr = Symbol.for("FluidValue.get"), Nn = Symbol.for("FluidValue.observers"), nt = (t) => !!(t && t[nr]), Ze = (t) => t && t[nr] ? t[nr]() : t, Dl = (t) => t[Nn] || null;
function Jm(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function Gr(t, e) {
  let n = t[Nn];
  n && n.forEach((r) => {
    Jm(r, e);
  });
}
class Bu {
  constructor(e) {
    if (this[nr] = void 0, this[Nn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    eh(this, e);
  }
}
const eh = (t, e) => Wu(t, nr, e);
function mr(t, e) {
  if (t[nr]) {
    let n = t[Nn];
    n || Wu(t, Nn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function Xr(t, e) {
  let n = t[Nn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Nn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const Wu = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), Ui = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, th = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, Vl = new RegExp(`(${Ui.source})(%|[a-z]+)`, "i"), nh = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Fa = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Zu = (t) => {
  const [e, n] = rh(t);
  if (!e || Ss())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Fa.test(n))
      return Zu(n);
    if (n)
      return n;
  }
  return t;
}, rh = (t) => {
  const e = Fa.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let io;
const ih = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Hu = (t) => {
  io || (io = en ? new RegExp(`(${Object.keys(en).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((a) => Ze(a).replace(Fa, Zu).replace(th, Al).replace(io, Al)), n = e.map((a) => a.match(Ui).map(Number)), i = n[0].map((a, o) => n.map((l) => {
    if (!(o in l))
      throw Error('The arity of each "output" value must be equal');
    return l[o];
  })).map((a) => Yr(Ro({}, t, {
    output: a
  })));
  return (a) => {
    var o;
    const l = !Vl.test(e[0]) && ((o = e.find((u) => Vl.test(u))) == null ? void 0 : o.replace(Ui, ""));
    let c = 0;
    return e[0].replace(Ui, () => `${i[c++](a)}${l || ""}`).replace(nh, ih);
  };
}, Ps = "react-spring: ", zu = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${Ps}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, ah = zu(console.warn);
function oh() {
  ah(`${Ps}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const sh = zu(console.warn);
function lh() {
  sh(`${Ps}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Na(t) {
  return H.str(t) && (t[0] == "#" || /\d/.test(t) || !Ss() && Fa.test(t) || t in (en || {}));
}
const Rs = Ss() ? X : vs, ch = () => {
  const t = V(!1);
  return Rs(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function Uu() {
  const t = K()[1], e = ch();
  return () => {
    e.current && t(Math.random());
  };
}
function uh(t, e) {
  const [n] = K(() => ({
    inputs: e,
    result: t()
  })), r = V(), i = r.current;
  let a = i;
  return a ? e && a.inputs && fh(e, a.inputs) || (a = {
    inputs: e,
    result: t()
  }) : a = n, X(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function fh(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const qu = (t) => X(t, dh), dh = [];
function jl(t) {
  const e = V();
  return X(() => {
    e.current = t;
  }), e.current;
}
const Qr = Symbol.for("Animated:node"), mh = (t) => !!t && t[Qr] === t, wt = (t) => t && t[Qr], Ms = (t, e) => Am(t, Qr, e), Pa = (t) => t && t[Qr] && t[Qr].getPayload();
class Ku {
  constructor() {
    this.payload = void 0, Ms(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class hr extends Ku {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new hr(e);
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
class rr extends hr {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = Yr({
      output: [e, e]
    });
  }
  static create(e) {
    return new rr(e);
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
    e && (this._toString = Yr({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const sa = {
  dependencies: null
};
class Ra extends Ku {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return kt(this.source, (r, i) => {
      mh(r) ? n[i] = r.getValue(e) : nt(r) ? n[i] = Ze(r) : e || (n[i] = r);
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
      return kt(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    sa.dependencies && nt(e) && sa.dependencies.add(e);
    const n = Pa(e);
    n && re(n, (r) => this.add(r));
  }
}
class As extends Ra {
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
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(hh)), !0);
  }
}
function hh(t) {
  return (Na(t) ? rr : hr).create(t);
}
function Mo(t) {
  const e = wt(t);
  return e ? e.constructor : H.arr(t) ? As : Na(t) ? rr : hr;
}
function la() {
  return la = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, la.apply(this, arguments);
}
const Bl = (t, e) => {
  const n = !H.fun(t) || t.prototype && t.prototype.isReactComponent;
  return me((r, i) => {
    const a = V(null), o = n && ze((p) => {
      a.current = gh(i, p);
    }, [i]), [l, c] = ph(r, e), u = Uu(), f = () => {
      const p = a.current;
      if (n && !p)
        return;
      (p ? e.applyAnimatedValues(p, l.getValue(!0)) : !1) === !1 && u();
    }, d = new vh(f, c), m = V();
    Rs(() => (m.current = d, re(c, (p) => mr(p, d)), () => {
      m.current && (re(m.current.deps, (p) => Xr(p, m.current)), Q.cancel(m.current.update));
    })), X(f, []), qu(() => () => {
      const p = m.current;
      re(p.deps, (v) => Xr(v, p));
    });
    const b = e.getComponentProps(l.getValue());
    return L.createElement(t, la({}, b, {
      ref: o
    }));
  });
};
class vh {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && Q.write(this.update);
  }
}
function ph(t, e) {
  const n = /* @__PURE__ */ new Set();
  return sa.dependencies = n, t.style && (t = la({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new Ra(t), sa.dependencies = null, [t, n];
}
function gh(t, e) {
  return t && (H.fun(t) ? t(e) : t.current = e), e;
}
const Wl = Symbol.for("AnimatedComponent"), yh = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new Ra(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const l = Zl(o) || "Anonymous";
    return H.str(o) ? o = a[o] || (a[o] = Bl(o, i)) : o = o[Wl] || (o[Wl] = Bl(o, i)), o.displayName = `Animated(${l})`, o;
  };
  return kt(t, (o, l) => {
    H.arr(t) && (l = Zl(o)), a[l] = a(o);
  }), {
    animated: a
  };
}, Zl = (t) => H.str(t) ? t : t && H.str(t.displayName) ? t.displayName : H.fun(t) && t.name || null;
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
function Cn(t, ...e) {
  return H.fun(t) ? t(...e) : t;
}
const Hr = (t, e) => t === !0 || !!(e && t && (H.fun(t) ? t(e) : Ge(t).includes(e))), Yu = (t, e) => H.obj(t) ? e && t[e] : t, Gu = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, bh = (t) => t, Ts = (t, e = bh) => {
  let n = Eh;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const a = e(t[i], i);
    H.und(a) || (r[i] = a);
  }
  return r;
}, Eh = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], wh = {
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
function Ch(t) {
  const e = {};
  let n = 0;
  if (kt(t, (r, i) => {
    wh[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Xu(t) {
  const e = Ch(t);
  if (e) {
    const n = {
      to: e
    };
    return kt(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Pe({}, t);
}
function Jr(t) {
  return t = Ze(t), H.arr(t) ? t.map(Jr) : Na(t) ? ot.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function xh(t) {
  for (const e in t)
    return !0;
  return !1;
}
function Ao(t) {
  return H.fun(t) || H.arr(t) && H.obj(t[0]);
}
function kh(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function $h(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const _h = {
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
}, To = Pe({}, _h.default, {
  mass: 1,
  damping: 1,
  easing: Qm.linear,
  clamp: !1
});
class Oh {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, To);
  }
}
function Sh(t, e, n) {
  n && (n = Pe({}, n), Hl(n, e), e = Pe({}, n, e)), Hl(t, e), Object.assign(t, e);
  for (const o in To)
    t[o] == null && (t[o] = To[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = t;
  return H.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * a * r / i), t;
}
function Hl(t, e) {
  if (!H.und(e.decay))
    t.duration = void 0;
  else {
    const n = !H.und(e.tension) || !H.und(e.friction);
    (n || !H.und(e.frequency) || !H.und(e.damping) || !H.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const zl = [];
class Fh {
  constructor() {
    this.changed = !1, this.values = zl, this.toValues = null, this.fromValues = zl, this.to = void 0, this.from = void 0, this.config = new Oh(), this.immediate = !1;
  }
}
function Qu(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, l) => {
    var c;
    let u, f, d = Hr((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      p();
    else {
      H.und(n.pause) || (i.paused = Hr(n.pause, e));
      let v = r == null ? void 0 : r.pause;
      v !== !0 && (v = i.paused || Hr(v, e)), u = Cn(n.delay || 0, e), v ? (i.resumeQueue.add(b), a.pause()) : (a.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - Q.now();
    }
    function b() {
      u > 0 && !ot.skipAnimation ? (i.delayed = !0, f = Q.setTimeout(p, u), i.pauseQueue.add(m), i.timeouts.add(f)) : p();
    }
    function p() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Pe({}, n, {
          callId: t,
          cancel: d
        }), o);
      } catch (v) {
        l(v);
      }
    }
  });
}
const Is = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? Qn(t.get()) : e.every((n) => n.noop) ? Ju(t.get()) : ft(t.get(), e.every((n) => n.finished)), Ju = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), ft = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), Qn = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function ef(t, e, n, r) {
  const {
    callId: i,
    parentId: a,
    onRest: o
  } = e, {
    asyncTo: l,
    promise: c
  } = n;
  return !a && t === l && !e.reset ? c : n.promise = (async () => {
    n.asyncId = i, n.asyncTo = t;
    const u = Ts(e, (g, y) => y === "onRest" ? void 0 : g);
    let f, d;
    const m = new Promise((g, y) => (f = g, d = y)), b = (g) => {
      const y = i <= (n.cancelId || 0) && Qn(r) || i !== n.asyncId && ft(r, !1);
      if (y)
        throw g.result = y, d(g), g;
    }, p = (g, y) => {
      const C = new Ul(), h = new ql();
      return (async () => {
        if (ot.skipAnimation)
          throw ei(n), h.result = ft(r, !1), d(h), h;
        b(C);
        const E = H.obj(g) ? Pe({}, g) : Pe({}, y, {
          to: g
        });
        E.parentId = i, kt(u, (x, k) => {
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
      return ei(n), ft(r, !1);
    try {
      let g;
      H.arr(t) ? g = (async (y) => {
        for (const C of y)
          await p(C);
      })(t) : g = Promise.resolve(t(p, r.stop.bind(r))), await Promise.all([g.then(f), m]), v = ft(r.get(), !0, !1);
    } catch (g) {
      if (g instanceof Ul)
        v = g.result;
      else if (g instanceof ql)
        v = g.result;
      else
        throw g;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? l : void 0, n.promise = a ? c : void 0);
    }
    return H.fun(o) && Q.batchedUpdates(() => {
      o(v, r, r.item);
    }), v;
  })();
}
function ei(t, e) {
  Wr(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class Ul extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class ql extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const Io = (t) => t instanceof Ls;
let Nh = 1;
class Ls extends Bu {
  constructor(...e) {
    super(...e), this.id = Nh++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = wt(this);
    return e && e.getValue();
  }
  to(...e) {
    return ot.to(this, e);
  }
  interpolate(...e) {
    return oh(), ot.to(this, e);
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
    Gr(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || Oa.sort(this), Gr(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const Pn = Symbol.for("SpringPhase"), tf = 1, Lo = 2, Do = 4, ao = (t) => (t[Pn] & tf) > 0, Wt = (t) => (t[Pn] & Lo) > 0, kr = (t) => (t[Pn] & Do) > 0, Kl = (t, e) => e ? t[Pn] |= Lo | tf : t[Pn] &= ~Lo, Yl = (t, e) => e ? t[Pn] |= Do : t[Pn] &= ~Do;
class Ph extends Ls {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new Fh(), this.queue = void 0, this.defaultProps = {}, this._state = {
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
    return !(Wt(this) || this._state.asyncTo) || kr(this);
  }
  get goal() {
    return Ze(this.animation.to);
  }
  get velocity() {
    const e = wt(this);
    return e instanceof hr ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return ao(this);
  }
  get isAnimating() {
    return Wt(this);
  }
  get isPaused() {
    return kr(this);
  }
  get isDelayed() {
    return this._state.delayed;
  }
  advance(e) {
    let n = !0, r = !1;
    const i = this.animation;
    let {
      config: a,
      toValues: o
    } = i;
    const l = Pa(i.to);
    !l && nt(i.to) && (o = Ge(Ze(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == rr ? 1 : l ? l[d].lastPosition : o[d];
      let b = i.immediate, p = m;
      if (!b) {
        if (p = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let v = f.elapsedTime += e;
        const g = i.fromValues[d], y = f.v0 != null ? f.v0 : f.v0 = H.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let C;
        const h = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (H.und(a.duration))
          if (a.decay) {
            const E = a.decay === !0 ? 0.998 : a.decay, w = Math.exp(-(1 - E) * v);
            p = g + y / (1 - E) * (1 - w), b = Math.abs(f.lastPosition - p) <= h, C = y * w;
          } else {
            C = f.lastVelocity == null ? y : f.lastVelocity;
            const E = a.restVelocity || h / 10, w = a.clamp ? 0 : a.bounce, x = !H.und(w), k = g == m ? f.v0 > 0 : g < m;
            let N, F = !1;
            const _ = 1, D = Math.ceil(e / _);
            for (let I = 0; I < D && (N = Math.abs(C) > E, !(!N && (b = Math.abs(m - p) <= h, b))); ++I) {
              x && (F = p == m || p > m == k, F && (C = -C * w, p = m));
              const R = -a.tension * 1e-6 * (p - m), $ = -a.friction * 1e-3 * C, M = (R + $) / a.mass;
              C = C + M * _, p = p + C * _;
            }
          }
        else {
          let E = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, v = f.elapsedTime += e)), E = (a.progress || 0) + v / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), p = g + a.easing(E) * (m - g), C = (p - f.lastPosition) / e, b = E == 1;
        }
        f.lastVelocity = C, Number.isNaN(p) && (console.warn("Got NaN while animating:", this), b = !0);
      }
      l && !l[d].done && (b = !1), b ? f.done = !0 : n = !1, f.setValue(p, a.round) && (r = !0);
    });
    const c = wt(this), u = c.getValue();
    if (n) {
      const f = Ze(i.to);
      (u !== f || r) && !a.decay ? (c.setValue(f), this._onChange(f)) : r && a.decay && this._onChange(u), this._stop();
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
    return H.und(e) ? (r = this.queue || [], this.queue = []) : r = [H.obj(e) ? e : Pe({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Is(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), ei(this._state, e && this._lastCallId), Q.batchedUpdates(() => this._stop(n, e)), this;
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
    r = H.obj(r) ? r[n] : r, (r == null || Ao(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return ao(this) || (e.reverse && ([r, i] = [i, r]), i = Ze(i), H.und(i) ? wt(this) || this._set(r) : this._set(i)), a;
  }
  _update(e, n) {
    let r = Pe({}, e);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, Ts(r, (c, u) => /^on/.test(u) ? Yu(c, i) : c)), Xl(this, r, "onProps"), _r(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return Qu(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: l,
      actions: {
        pause: () => {
          kr(this) || (Yl(this, !0), Vr(l.pauseQueue), _r(this, "onPause", ft(this, $r(this, this.animation.to)), this));
        },
        resume: () => {
          kr(this) && (Yl(this, !1), Wt(this) && this._resume(), Vr(l.resumeQueue), _r(this, "onResume", ft(this, $r(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = nf(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Qn(this));
    const i = !H.und(e.to), a = !H.und(e.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(Qn(this));
    const {
      key: o,
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
    a && !i && (!n.default || H.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const b = !Mt(m, f);
    b && (c.from = m), m = Ze(m);
    const p = !Mt(d, u);
    p && this._focus(d);
    const v = Ao(n.to), {
      config: g
    } = c, {
      decay: y,
      velocity: C
    } = g;
    (i || a) && (g.velocity = 0), n.config && !v && Sh(g, Cn(n.config, o), n.config !== l.config ? Cn(l.config, o) : void 0);
    let h = wt(this);
    if (!h || H.und(d))
      return r(ft(this, !0));
    const E = H.und(n.reset) ? a && !n.default : !H.und(m) && Hr(n.reset, o), w = E ? m : this.get(), x = Jr(d), k = H.num(x) || H.arr(x) || Na(x), N = !v && (!k || Hr(l.immediate || n.immediate, o));
    if (p) {
      const I = Mo(d);
      if (I !== h.constructor)
        if (N)
          h = this._set(x);
        else
          throw Error(`Cannot animate between ${h.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const F = h.constructor;
    let _ = nt(d), D = !1;
    if (!_) {
      const I = E || !ao(this) && b;
      (p || I) && (D = Mt(Jr(w), x), _ = !D), (!Mt(c.immediate, N) && !N || !Mt(g.decay, y) || !Mt(g.velocity, C)) && (_ = !0);
    }
    if (D && Wt(this) && (c.changed && !E ? _ = !0 : _ || this._stop(u)), !v && ((_ || nt(u)) && (c.values = h.getPayload(), c.toValues = nt(d) ? null : F == rr ? [1] : Ge(x)), c.immediate != N && (c.immediate = N, !N && !E && this._set(u)), _)) {
      const {
        onRest: I
      } = c;
      re(Mh, ($) => Xl(this, n, $));
      const R = ft(this, $r(this, u));
      Vr(this._pendingCalls, R), this._pendingCalls.add(r), c.changed && Q.batchedUpdates(() => {
        c.changed = !E, I == null || I(R, this), E ? Cn(l.onRest, R) : c.onStart == null || c.onStart(R, this);
      });
    }
    E && this._set(w), v ? r(ef(n.to, n, this._state, this)) : _ ? this._start() : Wt(this) && !p ? this._pendingCalls.add(r) : r(Ju(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (Dl(this) && this._detach(), n.to = e, Dl(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    nt(n) && (mr(n, this), Io(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    nt(e) && Xr(e, this);
  }
  _set(e, n = !0) {
    const r = Ze(e);
    if (!H.und(r)) {
      const i = wt(this);
      if (!i || !Mt(r, i.getValue())) {
        const a = Mo(r);
        !i || i.constructor != a ? Ms(this, a.create(r)) : i.setValue(r), i && Q.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return wt(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, _r(this, "onStart", ft(this, $r(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), Cn(this.animation.onChange, e, this)), Cn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    wt(this).reset(Ze(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Wt(this) || (Kl(this, !0), kr(this) || this._resume());
  }
  _resume() {
    ot.skipAnimation ? this.finish() : Oa.start(this);
  }
  _stop(e, n) {
    if (Wt(this)) {
      Kl(this, !1);
      const r = this.animation;
      re(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), Gr(this, {
        type: "idle",
        parent: this
      });
      const i = n ? Qn(this.get()) : ft(this.get(), $r(this, e ?? r.to));
      Vr(this._pendingCalls, i), r.changed && (r.changed = !1, _r(this, "onRest", i, this));
    }
  }
}
function $r(t, e) {
  const n = Jr(e), r = Jr(t.get());
  return Mt(r, n);
}
function nf(t, e = t.loop, n = t.to) {
  let r = Cn(e);
  if (r) {
    const i = r !== !0 && Xu(r), a = (i || t).reverse, o = !i || i.reset;
    return ti(Pe({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !a || Ao(n) ? n : void 0,
      from: o ? t.from : void 0,
      reset: o
    }, i));
  }
}
function ti(t) {
  const {
    to: e,
    from: n
  } = t = Xu(t), r = /* @__PURE__ */ new Set();
  return H.obj(e) && Gl(e, r), H.obj(n) && Gl(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function Rh(t) {
  const e = ti(t);
  return H.und(e.default) && (e.default = Ts(e)), e;
}
function Gl(t, e) {
  kt(t, (n, r) => n != null && e.add(r));
}
const Mh = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Xl(t, e, n) {
  t.animation[n] = e[n] !== Gu(e, n) ? Yu(e[n], t.key) : void 0;
}
function _r(t, e, ...n) {
  var r, i, a, o;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (a = (o = t.defaultProps)[e]) == null || a.call(o, ...n);
}
const Ah = ["onStart", "onChange", "onRest"];
let Th = 1, Ih = class {
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
    return e && this.queue.push(ti(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = Ge(e).map(ti) : this.queue = [], this._flush ? this._flush(this, n) : (lf(this, n), Vo(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      re(Ge(n), (i) => r[i].stop(!!e));
    } else
      ei(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (H.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      re(Ge(e), (r) => n[r].pause());
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
      re(Ge(e), (r) => n[r].resume());
    }
    return this;
  }
  each(e) {
    kt(this.springs, e);
  }
  _onFrame() {
    const {
      onStart: e,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, a = this._changed.size > 0;
    (i && !this._started || a && !this._started) && (this._started = !0, Wr(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, l = a || o && r.size ? this.get() : null;
    a && n.size && Wr(n, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }), o && (this._started = !1, Wr(r, ([c, u]) => {
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
function Vo(t, e) {
  return Promise.all(e.map((n) => rf(t, n))).then((n) => Is(t, n));
}
async function rf(t, e, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: l,
    onResolve: c
  } = e, u = H.obj(e.default) && e.default;
  o && (e.loop = !1), i === !1 && (e.to = null), a === !1 && (e.from = null);
  const f = H.arr(i) || H.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : re(Ah, (v) => {
    const g = e[v];
    if (H.fun(g)) {
      const y = t._events[v];
      e[v] = ({
        finished: C,
        cancelled: h
      }) => {
        const E = y.get(g);
        E ? (C || (E.finished = !1), h && (E.cancelled = !0)) : y.set(g, {
          value: null,
          finished: C || !1,
          cancelled: h || !1
        });
      }, u && (u[v] = e[v]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, Vr(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((v) => t.springs[v].start(e)), b = e.cancel === !0 || Gu(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(Qu(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: No,
      resume: No,
      start(v, g) {
        b ? (ei(d, t._lastAsyncId), g(Qn(t))) : (v.onRest = l, g(ef(f, v, d, t)));
      }
    }
  })), d.paused && await new Promise((v) => {
    d.resumeQueue.add(v);
  });
  const p = Is(t, await Promise.all(m));
  if (o && p.finished && !(n && p.noop)) {
    const v = nf(e, o, i);
    if (v)
      return lf(t, [v]), rf(t, v, !0);
  }
  return c && Q.batchedUpdates(() => c(p, t, t.item)), p;
}
function Ql(t, e) {
  const n = Pe({}, t.springs);
  return e && re(Ge(e), (r) => {
    H.und(r.keys) && (r = ti(r)), H.obj(r.to) || (r = Pe({}, r, {
      to: void 0
    })), sf(n, r, (i) => of(i));
  }), af(t, n), n;
}
function af(t, e) {
  kt(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, mr(n, t));
  });
}
function of(t, e) {
  const n = new Ph();
  return n.key = t, e && mr(n, e), n;
}
function sf(t, e, n) {
  e.keys && re(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function lf(t, e) {
  re(e, (n) => {
    sf(t.springs, n, (r) => of(r, t));
  });
}
function Lh(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Dh = ["children"], Ma = (t) => {
  let {
    children: e
  } = t, n = Lh(t, Dh);
  const r = at(ca), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = uh(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = ca;
  return L.createElement(o, {
    value: n
  }, e);
}, ca = Vh(Ma, {});
Ma.Provider = ca.Provider;
Ma.Consumer = ca.Consumer;
function Vh(t, e) {
  return Object.assign(t, L.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const jh = () => {
  const t = [], e = function(i) {
    lh();
    const a = [];
    return re(t, (o, l) => {
      if (H.und(i))
        a.push(o.start());
      else {
        const c = n(i, o, l);
        c && a.push(o.start(c));
      }
    }), a;
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
    return re(t, (a, o) => {
      if (H.und(r))
        i.push(a.start());
      else {
        const l = this._getProps(r, a, o);
        l && i.push(a.start(l));
      }
    }), i;
  }, e.stop = function() {
    return re(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return re(t, (i, a) => i.update(this._getProps(r, i, a))), this;
  };
  const n = function(i, a, o) {
    return H.fun(i) ? i(o, a) : i;
  };
  return e._getProps = n, e;
};
function Bh(t, e, n) {
  const r = H.fun(e) && e;
  r && !n && (n = []);
  const i = ie(() => r || arguments.length == 3 ? jh() : void 0, []), a = V(0), o = Uu(), l = ie(() => ({
    ctrls: [],
    queue: [],
    flush(y, C) {
      const h = Ql(y, C);
      return a.current > 0 && !l.queue.length && !Object.keys(h).some((w) => !y.springs[w]) ? Vo(y, C) : new Promise((w) => {
        af(y, h), l.queue.push(() => {
          w(Vo(y, C));
        }), o();
      });
    }
  }), []), c = V([...l.ctrls]), u = [], f = jl(t) || 0;
  ie(() => {
    re(c.current.slice(t, f), (y) => {
      kh(y, i), y.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), ie(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(y, C) {
    for (let h = y; h < C; h++) {
      const E = c.current[h] || (c.current[h] = new Ih(null, l.flush)), w = r ? r(h, E) : e[h];
      w && (u[h] = Rh(w));
    }
  }
  const m = c.current.map((y, C) => Ql(y, u[C])), b = at(Ma), p = jl(b), v = b !== p && xh(b);
  Rs(() => {
    a.current++, l.ctrls = c.current;
    const {
      queue: y
    } = l;
    y.length && (l.queue = [], re(y, (C) => C())), re(c.current, (C, h) => {
      i == null || i.add(C), v && C.start({
        default: b
      });
      const E = u[h];
      E && ($h(C, E.ref), C.ref ? C.queue.push(E) : C.start(E));
    });
  }), qu(() => () => {
    re(l.ctrls, (y) => y.stop(!0));
  });
  const g = m.map((y) => Pe({}, y));
  return i ? [g, i] : g;
}
function Re(t, e) {
  const n = H.fun(t), [[r], i] = Bh(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Jl;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(Jl || (Jl = {}));
class cf extends Ls {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = Yr(...n);
    const r = this._get(), i = Mo(r);
    Ms(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    Mt(n, r) || (wt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && ec(this._active) && oo(this);
  }
  _get() {
    const e = H.arr(this.source) ? this.source.map(Ze) : Ge(Ze(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !ec(this._active) && (this.idle = !1, re(Pa(this), (e) => {
      e.done = !1;
    }), ot.skipAnimation ? (Q.batchedUpdates(() => this.advance()), oo(this)) : Oa.start(this));
  }
  _attach() {
    let e = 1;
    re(Ge(this.source), (n) => {
      nt(n) && mr(n, this), Io(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    re(Ge(this.source), (e) => {
      nt(e) && Xr(e, this);
    }), this._active.clear(), oo(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = Ge(this.source).reduce((n, r) => Math.max(n, (Io(r) ? r.priority : 0) + 1), 0));
  }
}
function Wh(t) {
  return t.idle !== !1;
}
function ec(t) {
  return !t.size || Array.from(t).every(Wh);
}
function oo(t) {
  t.idle || (t.idle = !0, re(Pa(t), (e) => {
    e.done = !0;
  }), Gr(t, {
    type: "idle",
    parent: t
  }));
}
const Zh = (t, ...e) => new cf(t, e);
ot.assign({
  createStringInterpolator: Hu,
  to: (t, e) => new cf(t, e)
});
function Ds(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const Hh = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], uf = /^--/;
function zh(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !uf.test(t) && !(zr.hasOwnProperty(t) && zr[t]) ? e + "px" : ("" + e).trim();
}
const tc = {};
function Uh(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: l,
    viewBox: c
  } = r, u = Ds(r, Hh), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : tc[m] || (tc[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  a !== void 0 && (t.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = zh(m, i[m]);
      uf.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
    }
  d.forEach((m, b) => {
    t.setAttribute(m, f[b]);
  }), o !== void 0 && (t.scrollTop = o), l !== void 0 && (t.scrollLeft = l), c !== void 0 && t.setAttribute("viewBox", c);
}
let zr = {
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
const qh = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), Kh = ["Webkit", "Ms", "Moz", "O"];
zr = Object.keys(zr).reduce((t, e) => (Kh.forEach((n) => t[qh(n, e)] = t[e]), t), zr);
const Yh = ["x", "y", "z"], Gh = /^(matrix|translate|scale|rotate|skew)/, Xh = /^(translate)/, Qh = /^(rotate|skew)/, so = (t, e) => H.num(t) && t !== 0 ? t + e : t, qi = (t, e) => H.arr(t) ? t.every((n) => qi(n, e)) : H.num(t) ? t === e : parseFloat(t) === e;
class Jh extends Ra {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, a = Ds(e, Yh);
    const o = [], l = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => so(u, "px")).join(",")})`, qi(c, 0)])), kt(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (Gh.test(u)) {
        if (delete a[u], H.und(c))
          return;
        const f = Xh.test(u) ? "px" : Qh.test(u) ? "deg" : "";
        o.push(Ge(c)), l.push(u === "rotate3d" ? ([d, m, b, p]) => [`rotate3d(${d},${m},${b},${so(p, f)})`, qi(p, 0)] : (d) => [`${u}(${d.map((m) => so(m, f)).join(",")})`, qi(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new e2(o, l)), super(a);
  }
}
class e2 extends Bu {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return re(this.inputs, (r, i) => {
      const a = Ze(r[0]), [o, l] = this.transforms[i](H.arr(a) ? a : r.map(Ze));
      e += " " + o, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && re(this.inputs, (n) => re(n, (r) => nt(r) && mr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && re(this.inputs, (n) => re(n, (r) => nt(r) && Xr(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), Gr(this, e);
  }
}
const t2 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], n2 = ["scrollTop", "scrollLeft"];
ot.assign({
  batchedUpdates: E1,
  createStringInterpolator: Hu,
  colors: Vm
});
const r2 = yh(t2, {
  applyAnimatedValues: Uh,
  createAnimatedStyle: (t) => new Jh(t),
  getComponentProps: (t) => Ds(t, n2)
}), ge = r2.animated;
function i2(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function vr(t, e) {
  if (ur && t) {
    const n = i2(t);
    return w1(e, n);
  }
  return e;
}
function a2(t) {
  const e = V(t);
  return t && (e.current = !0), !!e.current;
}
const pr = (t) => Aa(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function Aa(t, e, n) {
  const r = a2(t);
  return e || t ? !0 : r ? !n : !1;
}
const o2 = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function nn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = o2[r];
    n[i] = function(a) {
      var o, l;
      a.stopPropagation(), (l = (o = e.props)[i]) === null || l === void 0 || l.call(o, a);
    };
  }
  return s.cloneElement(e, n);
}
const lo = "adm-mask", s2 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, l2 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, c2 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, hi = (t) => {
  const e = U(c2, t), {
    locale: n
  } = ye(), r = V(null);
  $a(r, e.visible && e.disableBodyScroll);
  const i = ie(() => {
    var f;
    const d = (f = s2[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = l2[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [a, o] = K(e.visible), l = Cs(), {
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
      o(!0);
    },
    onRest: () => {
      var f, d;
      l.current || (o(e.visible), e.visible ? (f = e.afterShow) === null || f === void 0 || f.call(e) : (d = e.afterClose) === null || d === void 0 || d.call(e));
    }
  }), u = nn(e.stopPropagation, W(e, s.createElement(ge.div, {
    className: lo,
    ref: r,
    "aria-hidden": !0,
    style: Object.assign(Object.assign({}, e.style), {
      background: i,
      opacity: c,
      display: a ? void 0 : "none"
    }),
    onClick: (f) => {
      var d;
      f.target === f.currentTarget && ((d = e.onMaskClick) === null || d === void 0 || d.call(e, f));
    }
  }, e.onMaskClick && s.createElement("div", {
    className: `${lo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${lo}-content`
  }, e.children))));
  return s.createElement(pr, {
    active: a,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, vr(e.getContainer, u));
};
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
function Ta(t) {
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
function vi(t) {
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
function gf(t) {
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
function nc(t) {
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
const Vs = {
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
function yf(t) {
  const [e, n] = K(t);
  return Fe(() => {
    n(t);
  }, [t]), e;
}
function g2(t, e, n) {
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
function rc(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function ic(t, e, n, r = 0.15) {
  return r === 0 ? g2(t, e, n) : t < e ? -rc(e - t, n - e, r) + e : t > n ? +rc(t - n, n - e, r) + n : t;
}
function y2(t, [e, n], [r, i]) {
  const [[a, o], [l, c]] = t;
  return [ic(e, a, o, r), ic(n, l, c, i)];
}
function b2(t, e) {
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
function E2(t) {
  var e = b2(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Te(t, e, n) {
  return e = E2(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function ac(t, e) {
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
    e % 2 ? ac(Object(n), !0).forEach(function(r) {
      Te(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ac(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const bf = {
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
const w2 = ["enter", "leave"];
function C2(t = !1, e) {
  return t && !w2.includes(e);
}
function x2(t, e = "", n = !1) {
  const r = bf[t], i = r && r[e] || e;
  return "on" + oc(t) + oc(i) + (C2(n, i) ? "Capture" : "");
}
const k2 = ["gotpointercapture", "lostpointercapture"];
function $2(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = k2.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function _2(t, e = "") {
  const n = bf[t], r = n && n[e] || e;
  return t + r;
}
function Ia(t) {
  return "touches" in t;
}
function Ef(t) {
  return Ia(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function O2(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function S2(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function wf(t) {
  return Ia(t) ? S2(t)[0] : t;
}
function jo(t, e) {
  try {
    const n = e.clientX - t.clientX, r = e.clientY - t.clientY, i = (e.clientX + t.clientX) / 2, a = (e.clientY + t.clientY) / 2, o = Math.hypot(n, r);
    return {
      angle: -(Math.atan2(n, r) * 180) / Math.PI,
      distance: o,
      origin: [i, a]
    };
  } catch {
  }
  return null;
}
function F2(t) {
  return O2(t).map((e) => e.identifier);
}
function sc(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return jo(n, r);
}
function co(t) {
  const e = wf(t);
  return Ia(t) ? e.identifier : e.pointerId;
}
function lc(t) {
  const e = wf(t);
  return [e.clientX, e.clientY];
}
const cc = 40, uc = 800;
function Cf(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= cc, n *= cc) : r === 2 && (e *= uc, n *= uc), [e, n];
}
function N2(t) {
  const e = {};
  if ("buttons" in t && (e.buttons = t.buttons), "shiftKey" in t) {
    const {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: a
    } = t;
    Object.assign(e, {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: a
    });
  }
  return e;
}
function ua(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function P2() {
}
function R2(...t) {
  return t.length === 0 ? P2 : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function fc(t, e) {
  return Object.assign({}, e, t || {});
}
const M2 = 32;
class xf {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? ua(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
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
    let a = 0;
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, N2(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Se.addTo(n._distance, x);
    }
    this.axisIntent && this.axisIntent(e);
    const [o, l] = n._movement, [c, u] = r.threshold, {
      _step: f,
      values: d
    } = n;
    if (r.hasCustomTransform ? (f[0] === !1 && (f[0] = Math.abs(o) >= c && d[0]), f[1] === !1 && (f[1] = Math.abs(l) >= u && d[1])) : (f[0] === !1 && (f[0] = Math.abs(o) >= c && Math.sign(o) * c), f[1] === !1 && (f[1] = Math.abs(l) >= u && Math.sign(l) * u)), n.intentional = f[0] !== !1 || f[1] !== !1, !n.intentional)
      return;
    const m = [0, 0];
    if (r.hasCustomTransform) {
      const [x, k] = d;
      m[0] = f[0] !== !1 ? x - f[0] : 0, m[1] = f[1] !== !1 ? k - f[1] : 0;
    } else
      m[0] = f[0] !== !1 ? o - f[0] : 0, m[1] = f[1] !== !1 ? l - f[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const b = n.offset, p = n._active && !n._blocked || n.active;
    p && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = ua(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [v, g] = n.offset, [[y, C], [h, E]] = n._bounds;
    n.overflow = [v < y ? -1 : v > C ? 1 : 0, g < h ? -1 : g > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = y2(n._bounds, n.offset, w), n.delta = Se.sub(n.offset, b), this.computeMovement(), p && (!n.last || a > M2)) {
      n.delta = Se.sub(n.offset, b);
      const x = n.delta.map(Math.abs);
      Se.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [x[0] / a, x[1] / a], n.timeDelta = a);
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
function A2([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class kf extends xf {
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
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[Ef(e)] : r.axisThreshold;
      n.axis = A2(n._movement, i);
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
const T2 = (t) => t, dc = 0.15, $f = {
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
        return [dc, dc];
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
    return this.hasCustomTransform = !!r, r || T2;
  },
  threshold(t) {
    return Se.toVector(t, 0);
  }
}, I2 = 0, gr = we(we({}, $f), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = I2) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (a) => gr.bounds(t(a));
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
}), mc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class L2 extends kf {
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
      e._bounds = gr.bounds(i);
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = co(e), r._pointerActive = !0, this.computeValues(lc(e)), this.computeInitial(), n.preventScrollAxis && Ef(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = co(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = lc(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Se.sub(a, n._values), this.computeValues(a)), Se.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
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
    const i = co(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [l, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [b, p] = r.swipe.distance, v = r.swipe.duration;
      if (n.elapsedTime < v) {
        const g = Math.abs(l / n.timeDelta), y = Math.abs(c / n.timeDelta);
        g > d && Math.abs(u) > b && (n.swipe[0] = Math.sign(l)), y > m && Math.abs(f) > p && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, D2(e);
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
    const n = mc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Se.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in mc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function D2(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const pi = typeof window < "u" && window.document && window.document.createElement;
function _f() {
  return pi && "ontouchstart" in window;
}
function V2() {
  return _f() || pi && window.navigator.maxTouchPoints > 1;
}
function j2() {
  return pi && "onpointerdown" in window;
}
function B2() {
  return pi && "exitPointerLock" in window.document;
}
function W2() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const rt = {
  isBrowser: pi,
  gesture: W2(),
  touch: _f(),
  touchscreen: V2(),
  pointer: j2(),
  pointerLock: B2()
}, Z2 = 250, H2 = 180, z2 = 0.5, U2 = 50, q2 = 250, K2 = 10, hc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Y2 = we(we({}, gr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && rt.pointerLock, rt.touch && n ? "touch" : this.pointerLock ? "mouse" : rt.pointer && !i ? "pointer" : rt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Z2 : void 0, !(!rt.touchscreen || n === !1))
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
    const a = Se.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: t = z2,
    distance: e = U2,
    duration: n = q2
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
        return H2;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? we(we({}, hc), t) : hc;
  },
  keyboardDisplacement(t = K2) {
    return t;
  }
});
function Of(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [a, o] = t._direction;
  (e < 0 && r > 0 && a < 0 || e > 0 && r < 0 && a > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (t._movement[1] = t._movementBound[1]);
}
const G2 = 30, X2 = 100;
class Q2 extends xf {
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
      const i = Math.abs(n) * G2 - Math.abs(r);
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
    if (n._active && n._touchIds.every((a) => r.has(a)) || r.size < 2)
      return;
    this.start(e), n._touchIds = Array.from(r).slice(0, 2);
    const i = sc(e, n._touchIds);
    i && this.pinchStart(e, i);
  }
  pointerStart(e) {
    if (e.buttons != null && e.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(e), e.target.setPointerCapture(e.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((o) => i.has(o)) || (r.size < 2 && r.set(e.pointerId, e), n._pointerEvents.size < 2))
      return;
    this.start(e);
    const a = jo(...Array.from(r.values()));
    a && this.pinchStart(e, a);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = sc(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = jo(...Array.from(n.values()));
    r && this.pinchMove(e, r);
  }
  pinchMove(e, n) {
    const r = this.state, i = r._values[1], a = n.angle - i;
    let o = 0;
    Math.abs(a) > 270 && (o += Math.sign(a)), this.computeValues([n.distance, n.angle - 360 * o]), r.origin = n.origin, r.turns = o, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(e), this.emit();
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
    r._delta = [-Cf(e)[1] / X2 * r.offset[0], 0], Se.addTo(r._movement, r._delta), Of(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const J2 = we(we({}, $f), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !rt.touch && rt.gesture)
      return "gesture";
    if (rt.touch && r)
      return "touch";
    if (rt.touchscreen) {
      if (rt.pointer)
        return "pointer";
      if (rt.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const l = fc(ua(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, a = (o) => {
      const l = fc(ua(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
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
we(we({}, gr), {}, {
  mouseOnly: (t = !0) => t
});
class e3 extends kf {
  constructor(...e) {
    super(...e), Te(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = Cf(e), Se.addTo(n._movement, n._delta), Of(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const t3 = gr;
we(we({}, gr), {}, {
  mouseOnly: (t = !0) => t
});
const js = /* @__PURE__ */ new Map(), Bo = /* @__PURE__ */ new Map();
function Bs(t) {
  js.set(t.key, t.engine), Bo.set(t.key, t.resolver);
}
const Sf = {
  key: "drag",
  engine: L2,
  resolver: Y2
}, n3 = {
  key: "pinch",
  engine: Q2,
  resolver: J2
}, r3 = {
  key: "wheel",
  engine: e3,
  resolver: t3
};
function i3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function a3(t, e) {
  if (t == null)
    return {};
  var n = i3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const o3 = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = rt.isBrowser ? window : void 0) {
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
}, s3 = ["target", "eventOptions", "window", "enabled", "transform"];
function Ki(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = Ki(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function l3(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  } = r, u = a3(r, s3);
  if (n.shared = Ki({
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  }, o3), e) {
    const f = Bo.get(e);
    n[e] = Ki(we({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = Bo.get(f);
      d && (n[f] = Ki(we({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class Ff {
  constructor(e, n) {
    Te(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, a) {
    const o = this._listeners, l = _2(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = we(we({}, c), a);
    e.addEventListener(l, i, u);
    const f = () => {
      e.removeEventListener(l, i, u), o.delete(f);
    };
    return o.add(f), f;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class c3 {
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
class u3 {
  constructor(e) {
    Te(this, "gestures", /* @__PURE__ */ new Set()), Te(this, "_targetEventStore", new Ff(this)), Te(this, "gestureEventStores", {}), Te(this, "gestureTimeoutStores", {}), Te(this, "handlers", {}), Te(this, "config", {}), Te(this, "pointerIds", /* @__PURE__ */ new Set()), Te(this, "touchIds", /* @__PURE__ */ new Set()), Te(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), f3(this, e);
  }
  setEventIds(e) {
    if (Ia(e))
      return this.touchIds = new Set(F2(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = l3(e, n, this.config);
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
        for (const o of this.gestures) {
          const l = this.config[o], c = vc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = js.get(o);
            new u(this, e, o).bind(c);
          }
        }
        const a = vc(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (l) => this.nativeHandlers[o](we(we({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = R2(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: l,
          passive: c
        } = $2(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function Ln(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Ff(t, e), t.gestureTimeoutStores[e] = new c3();
}
function f3(t, e) {
  e.drag && Ln(t, "drag"), e.wheel && Ln(t, "wheel"), e.scroll && Ln(t, "scroll"), e.move && Ln(t, "move"), e.pinch && Ln(t, "pinch"), e.hover && Ln(t, "hover");
}
const vc = (t, e, n) => (r, i, a, o = {}, l = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : e.capture, d = (u = o.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : x2(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(a);
}, d3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function m3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    d3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Dn(t, e, n, r, i, a) {
  if (!t.has(n) || !js.has(r))
    return;
  const o = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && o in e && e[o](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function h3(t, e) {
  const [n, r, i] = m3(t), a = {};
  return Dn(i, n, "onDrag", "drag", a, e), Dn(i, n, "onWheel", "wheel", a, e), Dn(i, n, "onScroll", "scroll", a, e), Dn(i, n, "onPinch", "pinch", a, e), Dn(i, n, "onMove", "move", a, e), Dn(i, n, "onHover", "hover", a, e), {
    handlers: a,
    config: e,
    nativeHandlers: r
  };
}
function Ws(t, e = {}, n, r) {
  const i = s.useMemo(() => new u3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function Ot(t, e) {
  return Bs(Sf), Ws({
    drag: t
  }, e || {}, "drag");
}
function v3(t, e) {
  return Bs(r3), Ws({
    wheel: t
  }, e || {}, "wheel");
}
function p3(t) {
  return t.forEach(Bs), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = h3(n, r || {});
    return Ws(i, o, void 0, a);
  };
}
const Pi = "adm-popup", g3 = Object.assign(Object.assign({}, Vs), {
  closeOnSwipe: !1,
  position: "bottom"
}), yr = (t) => {
  const e = U(g3, t), n = j(`${Pi}-body`, e.bodyClassName, `${Pi}-body-position-${e.position}`), {
    locale: r
  } = ye(), [i, a] = K(e.visible), o = V(null);
  $a(o, e.disableBodyScroll && i ? "strict" : !1), Fe(() => {
    e.visible && a(!0);
  }, [e.visible]);
  const l = Cs(), {
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
      l.current || (a(e.visible), e.visible ? (m = e.afterShow) === null || m === void 0 || m.call(e) : (b = e.afterClose) === null || b === void 0 || b.call(e));
    }
  }), u = Ot(({
    swipe: [, m]
  }) => {
    var b;
    e.closeOnSwipe && (m === 1 && e.position === "bottom" || m === -1 && e.position === "top") && ((b = e.onClose) === null || b === void 0 || b.call(e));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(e.position)
  }), f = yf(i && e.visible), d = nn(e.stopPropagation, W(e, s.createElement("div", Object.assign({
    className: Pi,
    onClick: e.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(e.position) ? "none" : "auto"
    }
  }, u()), e.mask && s.createElement(hi, {
    visible: f,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose,
    onMaskClick: (m) => {
      var b, p;
      (b = e.onMaskClick) === null || b === void 0 || b.call(e, m), e.closeOnMaskClick && ((p = e.onClose) === null || p === void 0 || p.call(e));
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
    ref: o
  }, e.showCloseButton && s.createElement("a", {
    className: j(`${Pi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = e.onClose) === null || m === void 0 || m.call(e);
    },
    role: "button",
    "aria-label": r.common.close
  }, s.createElement(vi, null)), e.children))));
  return s.createElement(pr, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, vr(e.getContainer, d));
}, pc = "adm-safe-area", br = (t) => W(t, s.createElement("div", {
  className: j(pc, `${pc}-position-${t.position}`)
})), fa = Object.assign({}, b1), {
  version: y3,
  render: b3,
  unmountComponentAtNode: E3
} = fa;
let La;
try {
  Number((y3 || "").split(".")[0]) >= 18 && fa.createRoot && (La = fa.createRoot);
} catch {
}
function gc(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = fa;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const da = "__antd_mobile_root__";
function w3(t, e) {
  b3(t, e);
}
function C3(t, e) {
  gc(!0);
  const n = e[da] || La(e);
  gc(!1), n.render(t), e[da] = n;
}
function x3(t, e) {
  if (La) {
    C3(t, e);
    return;
  }
  w3(t, e);
}
function k3(t) {
  return E3(t);
}
function $3(t) {
  return Oe(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[da]) === null || e === void 0 || e.unmount(), delete t[da];
    });
  });
}
function _3(t) {
  return La ? $3(t) : k3(t);
}
function gi(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    _3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return x3(t, e), n;
}
function Er(t) {
  const e = s.forwardRef((i, a) => {
    const [o, l] = K(!1), c = V(!1), [u, f] = K(t), d = V(0);
    X(() => {
      c.current ? b() : l(!0);
    }, []);
    function m() {
      var p, v;
      c.current = !0, l(!1), (v = (p = u.props).onClose) === null || v === void 0 || v.call(p);
    }
    function b() {
      var p, v;
      r(), (v = (p = u.props).afterClose) === null || v === void 0 || v.call(p);
    }
    return be(a, () => ({
      close: m,
      replace: (p) => {
        var v, g;
        d.current++, (g = (v = u.props).afterClose) === null || g === void 0 || g.call(v), f(p);
      }
    })), s.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: b
    }));
  }), n = s.createRef(), r = gi(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Oe(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const De = "adm-action-sheet", O3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Nf = (t) => {
  const e = U(O3, t), {
    styles: n
  } = e;
  return s.createElement(yr, {
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
      var a, o, l;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = e.onAction) === null || o === void 0 || o.call(e, r, i), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
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
  }, e.cancelText)))), e.safeArea && s.createElement(br, {
    position: "bottom"
  }))));
};
function S3(t) {
  return Er(s.createElement(Nf, Object.assign({}, t)));
}
const P7 = le(Nf, {
  show: S3
}), yc = "adm-auto-center", ni = (t) => W(t, s.createElement("div", {
  className: yc
}, s.createElement("div", {
  className: `${yc}-content`
}, t.children))), F3 = je(() => s.createElement("svg", {
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
var Zs = {}, N3 = dt && dt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Zs, "__esModule", { value: !0 });
var Hs = Zs.staged = void 0;
const P3 = N3(s);
function Pf(t) {
  return typeof t == "function" ? P3.default.createElement(R3, { stage: t }) : t;
}
function R3(t) {
  const e = t.stage();
  return Pf(e);
}
function M3(t) {
  return function(n, r) {
    const i = t(n, r);
    return Pf(i);
  };
}
Hs = Zs.staged = M3;
function xn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const A3 = (t) => {
  const e = V(null), [n] = Q0(e);
  return X(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, yi = yu(Fe), T3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), I3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), ma = "adm-image", L3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${ma}-tip`
  }, s.createElement(T3, null)),
  fallback: s.createElement("div", {
    className: `${ma}-tip`
  }, s.createElement(I3, null)),
  lazy: !1,
  draggable: !1
}, Da = Hs((t) => {
  const e = U(L3, t), [n, r] = K(!1), [i, a] = K(!1), o = V(null), l = V(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = K(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, yi(() => {
    r(!1), a(!1);
  }, [c]), X(() => {
    var p;
    !((p = l.current) === null || p === void 0) && p.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const p = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${ma}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (v) => {
        var g;
        r(!0), (g = e.onLoad) === null || g === void 0 || g.call(e, v);
      },
      onError: (v) => {
        var g;
        a(!0), (g = e.onError) === null || g === void 0 || g.call(e, v);
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
    return s.createElement(s.Fragment, null, !n && e.placeholder, p);
  }
  const b = {};
  return e.width && (b["--width"] = xn(e.width), b.width = xn(e.width)), e.height && (b["--height"] = xn(e.height), b.height = xn(e.height)), W(e, s.createElement("div", {
    ref: o,
    className: ma,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(A3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), D3 = "adm-avatar", V3 = {
  fallback: s.createElement(F3, null),
  fit: "cover"
}, R7 = (t) => {
  const e = U(V3, t);
  return W(e, s.createElement(Da, {
    className: D3,
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
}, Vn = "adm-badge", Rf = s.createElement(s.Fragment, null), j3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === Rf, a = j(Vn, {
    [`${Vn}-fixed`]: !!r,
    [`${Vn}-dot`]: i,
    [`${Vn}-bordered`]: t.bordered
  }), o = e || e === 0 ? W(t, s.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && s.createElement("div", {
    className: `${Vn}-content`
  }, e))) : null;
  return r ? s.createElement("div", {
    className: j(`${Vn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, o) : o;
}, Wo = le(j3, {
  dot: Rf
}), B3 = "adm-dot-loading", W3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, Z3 = {
  color: "default"
}, Mf = je((t) => {
  var e;
  const n = U(Z3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = W3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: j("adm-loading", B3)
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
function Af(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function H3() {
  return ur ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const Je = "adm-button", z3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(Mf, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, Lt = me((t, e) => {
  const n = U(z3, t), [r, i] = K(!1), a = V(null), o = n.loading === "auto" ? r : n.loading, l = n.disabled || o;
  be(e, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Oe(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (Af(f))
      try {
        i(!0), yield f, i(!1);
      } catch (d) {
        throw i(!1), d;
      }
  });
  return W(n, s.createElement("button", {
    ref: a,
    type: n.type,
    onClick: c,
    className: j(Je, {
      [`${Je}-${n.color}`]: n.color,
      [`${Je}-block`]: n.block,
      [`${Je}-disabled`]: l,
      [`${Je}-fill-outline`]: n.fill === "outline",
      [`${Je}-fill-none`]: n.fill === "none",
      [`${Je}-mini`]: n.size === "mini",
      [`${Je}-small`]: n.size === "small",
      [`${Je}-large`]: n.size === "large",
      [`${Je}-loading`]: o
    }, `${Je}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? s.createElement("div", {
    className: `${Je}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
}), bc = () => s.createElement("svg", {
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
})))))), Ec = () => s.createElement("svg", {
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
var Tf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(dt, function() {
    var n = "day";
    return function(r, i, a) {
      var o = function(u) {
        return u.add(4 - u.isoWeekday(), n);
      }, l = i.prototype;
      l.isoWeekYear = function() {
        return o(this).year();
      }, l.isoWeek = function(u) {
        if (!this.$utils().u(u))
          return this.add(7 * (u - this.isoWeek()), n);
        var f, d, m, b, p = o(this), v = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), b = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (b += 7), m.add(b, n));
        return p.diff(v, "week") + 1;
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
})(Tf);
var U3 = Tf.exports;
const Va = /* @__PURE__ */ _t(U3);
function ae(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = xu(), a = V(e !== void 0 ? e : n);
  e !== void 0 && (a.current = e);
  const o = jt((l, c = !1) => {
    const u = typeof l == "function" ? l(a.current) : l;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function q3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function wc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function uo(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(Va);
const pe = "adm-calendar", K3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(bc, null),
  prevYearButton: s.createElement(Ec, null),
  nextMonthButton: s.createElement(bc, null),
  nextYearButton: s.createElement(Ec, null)
}, M7 = me((t, e) => {
  const n = ve(), r = U(K3, t), {
    locale: i
  } = ye(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const h = a.pop();
    h && a.unshift(h);
  }
  const [o, l] = ae({
    value: r.value === void 0 ? void 0 : wc(r.selectionMode, r.value),
    defaultValue: wc(r.selectionMode, r.defaultValue),
    onChange: (h) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, h ? h[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, h));
    }
  }), [c, u] = K(!1), [f, d] = K(() => ve(o ? o[0] : n).date(1));
  ys(() => {
    var h;
    (h = r.onPageChange) === null || h === void 0 || h.call(r, f.year(), f.month() + 1);
  }, [f]), be(e, () => ({
    jumpTo: (h) => {
      let E;
      typeof h == "function" ? E = h({
        year: f.year(),
        month: f.month() + 1
      }) : E = h, d(uo(E));
    },
    jumpToToday: () => {
      d(ve().date(1));
    }
  }));
  const m = (h, E, w) => {
    const x = f[h](E, w);
    if (h === "subtract" && r.minPage) {
      const k = uo(r.minPage);
      if (x.isBefore(k, w))
        return;
    }
    if (h === "add" && r.maxPage) {
      const k = uo(r.maxPage);
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
  }, q3(i.Calendar.yearAndMonth, {
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
  }, r.nextYearButton)), p = ie(() => r.max && ve(r.max), [r.max]), v = ie(() => r.min && ve(r.min), [r.min]);
  function g() {
    var h;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const x = w;
      let k = !1, N = !1, F = !1, _ = !1, D = !1;
      if (o) {
        const [$, M] = o;
        N = x.isSame($, "day"), F = x.isSame(M, "day"), k = N || F || x.isAfter($, "day") && x.isBefore(M, "day"), k && (_ = (E.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !N, D = (E.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !F);
      }
      const I = x.month() === f.month(), R = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : p && x.isAfter(p, "day") || v && x.isBefore(v, "day");
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
            if (!r.allowClear || !o)
              return !1;
            const [S, O] = o;
            return x.isSame(S, "date") && x.isSame(O, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && M()) {
              l(null);
              return;
            }
            l([$, $]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              l([$, $]), u(!0);
              return;
            }
            if (M()) {
              l(null), u(!1);
              return;
            }
            if (c) {
              const S = o[0];
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
  const y = s.createElement("div", {
    className: `${pe}-cells`
  }, g()), C = s.createElement("div", {
    className: `${pe}-mark`
  }, a.map((h, E) => s.createElement("div", {
    key: E,
    className: `${pe}-mark-cell`
  }, h)));
  return W(r, s.createElement("div", {
    className: pe
  }, b, C, y));
}), Ri = "adm-divider", Y3 = {
  contentPosition: "center",
  direction: "horizontal"
}, Zo = (t) => {
  const e = U(Y3, t);
  return W(e, s.createElement("div", {
    className: j(Ri, `${Ri}-${e.direction}`, `${Ri}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Ri}-content`
  }, e.children)));
};
var If = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(dt, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, a) {
        return this.isSame(i, a) || this.isBefore(i, a);
      };
    };
  });
})(If);
var G3 = If.exports;
const X3 = /* @__PURE__ */ _t(G3);
function Cc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function Q3(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(Va);
ve.extend(X3);
const _e = "adm-calendar-picker-view", J3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, e4 = me((t, e) => {
  var n;
  const r = ve(), i = U(J3, t), {
    locale: a
  } = ye(), o = [...a.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const h = o.pop();
    h && o.unshift(h);
  }
  const [l, c] = ae({
    value: i.value === void 0 ? void 0 : Cc(i.selectionMode, i.value),
    defaultValue: Cc(i.selectionMode, i.defaultValue),
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
      }) : E = h, m(Q3(E));
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
  }, (n = i.title) !== null && n !== void 0 ? n : a.Calendar.title)), p = ie(() => i.max ? ve(i.max) : d.add(6, "month"), [i.max, d]), v = ie(() => i.min ? ve(i.min) : d, [i.min, d]);
  function g() {
    var h;
    const E = [];
    let w = v;
    for (; w.isSameOrBefore(p, "month"); ) {
      const x = w.year(), k = w.month(), N = {
        year: x,
        month: k + 1
      };
      E.push(s.createElement("div", {
        key: `${x}-${k}`
      }, s.createElement("div", {
        className: `${_e}-title`
      }, (h = a.Calendar.yearAndMonth) === null || h === void 0 ? void 0 : h.replace(/\${(.*?)}/g, (F, _) => {
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
        const A = i.shouldDisableDate ? i.shouldDisableDate(I.toDate()) : p && I.isAfter(p, "day") || v && I.isBefore(v, "day"), P = () => {
          var T;
          const B = (T = i.renderTop) === null || T === void 0 ? void 0 : T.call(i, I.toDate());
          if (B)
            return B;
          if (i.selectionMode === "range") {
            if ($)
              return a.Calendar.start;
            if (M)
              return a.Calendar.end;
          }
          if (I.isSame(r, "day") && !R)
            return a.Calendar.today;
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
  const y = s.createElement("div", {
    className: `${_e}-body`
  }, g()), C = s.createElement("div", {
    className: `${_e}-mark`
  }, o.map((h, E) => s.createElement("div", {
    key: E,
    className: `${_e}-mark-cell`
  }, h)));
  return W(i, s.createElement("div", {
    className: _e
  }, b, C, y));
}), Mi = "adm-calendar-picker", t4 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, A7 = me((t, e) => {
  const n = U(t4, t), {
    locale: r
  } = ye(), i = e ?? V(null), {
    visible: a,
    confirmText: o,
    popupClassName: l,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: b,
    onMaskClick: p,
    getContainer: v
  } = n, g = fr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), y = s.createElement("div", {
    className: `${Mi}-footer`
  }, s.createElement(Zo, null), s.createElement("div", {
    className: `${Mi}-footer-bottom`
  }, s.createElement(Lt, {
    color: "primary",
    onClick: () => {
      var C, h, E, w;
      const x = (h = (C = i.current) === null || C === void 0 ? void 0 : C.getDateRange()) !== null && h !== void 0 ? h : null;
      n.selectionMode === "single" ? (E = n.onConfirm) === null || E === void 0 || E.call(n, x ? x[0] : null) : n.selectionMode === "range" && ((w = n.onConfirm) === null || w === void 0 || w.call(n, x)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Mi
  }, s.createElement(yr, {
    visible: a,
    className: j(`${Mi}-popup`, l),
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
      p == null || p(), d && (m == null || m());
    },
    getContainer: v
  }, s.createElement(e4, Object.assign({
    ref: i
  }, g)), y)));
});
function bi(t, e) {
  const n = jt(t);
  Fe(() => {
    const r = e.current;
    if (r)
      if (window.ResizeObserver) {
        let i;
        const a = new ResizeObserver(() => {
          i = window.requestAnimationFrame(() => n(r));
        });
        return a.observe(r), () => {
          window.cancelAnimationFrame(i), a.disconnect();
        };
      } else
        n(r);
  }, [e]);
}
function zs(t, e, n) {
  const r = jt(t);
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
const Lf = (t, e) => {
  const [{
    scrollLeft: n
  }, r] = Re(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  }));
  function i(a = !1) {
    const o = t.current;
    if (!o || e === void 0)
      return;
    const c = o.children.item(e).children.item(0), u = c.offsetLeft, f = c.offsetWidth, d = o.offsetWidth, m = o.scrollWidth, b = o.scrollLeft;
    if (m - d <= 0)
      return;
    const v = $e(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: v,
      from: {
        scrollLeft: b
      },
      immediate: a && !n.isAnimating
    });
  }
  return Fe(() => {
    i(!0);
  }, []), yi(() => {
    i();
  }, [e]), zs(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Ai = "adm-scroll-mask", Df = (t) => {
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
    run: a
  } = ka((o = !1) => {
    if (!e.current)
      return;
    const c = t.scrollTrackRef.current;
    if (!c)
      return;
    const u = c.scrollLeft, f = u > 0, d = u + c.offsetWidth < c.scrollWidth;
    i.start({
      leftMaskOpacity: f ? 1 : 0,
      rightMaskOpacity: d ? 1 : 0,
      immediate: o
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return X(() => {
    a(!0);
  }, []), X(() => {
    const o = t.scrollTrackRef.current;
    if (o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), s.createElement(s.Fragment, null, s.createElement(ge.div, {
    ref: e,
    className: j(Ai, `${Ai}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(ge.div, {
    className: j(Ai, `${Ai}-right`),
    style: {
      opacity: r
    }
  }));
};
var Vf = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Us = Symbol.for("react.element"), qs = Symbol.for("react.portal"), ja = Symbol.for("react.fragment"), Ba = Symbol.for("react.strict_mode"), Wa = Symbol.for("react.profiler"), Za = Symbol.for("react.provider"), Ha = Symbol.for("react.context"), n4 = Symbol.for("react.server_context"), za = Symbol.for("react.forward_ref"), Ua = Symbol.for("react.suspense"), qa = Symbol.for("react.suspense_list"), Ka = Symbol.for("react.memo"), Ya = Symbol.for("react.lazy"), r4 = Symbol.for("react.offscreen"), jf;
jf = Symbol.for("react.module.reference");
function lt(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case Us:
        switch (t = t.type, t) {
          case ja:
          case Wa:
          case Ba:
          case Ua:
          case qa:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case n4:
              case Ha:
              case za:
              case Ya:
              case Ka:
              case Za:
                return t;
              default:
                return e;
            }
        }
      case qs:
        return e;
    }
  }
}
ue.ContextConsumer = Ha;
ue.ContextProvider = Za;
ue.Element = Us;
ue.ForwardRef = za;
ue.Fragment = ja;
ue.Lazy = Ya;
ue.Memo = Ka;
ue.Portal = qs;
ue.Profiler = Wa;
ue.StrictMode = Ba;
ue.Suspense = Ua;
ue.SuspenseList = qa;
ue.isAsyncMode = function() {
  return !1;
};
ue.isConcurrentMode = function() {
  return !1;
};
ue.isContextConsumer = function(t) {
  return lt(t) === Ha;
};
ue.isContextProvider = function(t) {
  return lt(t) === Za;
};
ue.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Us;
};
ue.isForwardRef = function(t) {
  return lt(t) === za;
};
ue.isFragment = function(t) {
  return lt(t) === ja;
};
ue.isLazy = function(t) {
  return lt(t) === Ya;
};
ue.isMemo = function(t) {
  return lt(t) === Ka;
};
ue.isPortal = function(t) {
  return lt(t) === qs;
};
ue.isProfiler = function(t) {
  return lt(t) === Wa;
};
ue.isStrictMode = function(t) {
  return lt(t) === Ba;
};
ue.isSuspense = function(t) {
  return lt(t) === Ua;
};
ue.isSuspenseList = function(t) {
  return lt(t) === qa;
};
ue.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === ja || t === Wa || t === Ba || t === Ua || t === qa || t === r4 || typeof t == "object" && t !== null && (t.$$typeof === Ya || t.$$typeof === Ka || t.$$typeof === Za || t.$$typeof === Ha || t.$$typeof === za || t.$$typeof === jf || t.getModuleId !== void 0);
};
ue.typeOf = lt;
Vf.exports = ue;
var ha = Vf.exports;
function cn(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (a) => {
      ha.isFragment(a) ? r(a.props.children) : (e(a, n), n += 1);
    });
  }
  r(t);
}
const Zt = "adm-capsule-tabs", i4 = () => null, a4 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  cn(t.children, (d, m) => {
    if (!An(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const p = o.push(d);
    i[b] = p - 1;
  });
  const [l, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Lf(n, i[l]);
  return bi(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Zt,
    ref: r
  }, s.createElement("div", {
    className: `${Zt}-header`
  }, s.createElement(Df, {
    scrollTrackRef: n
  }), s.createElement(ge.div, {
    className: `${Zt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, s.createElement("div", {
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
  }, d.props.title)))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(pr, {
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
}, T7 = le(a4, {
  Tab: i4
}), Ti = "adm-card", I7 = (t) => {
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
function xc(t, e, n) {
  return t * e * n / (e + n * t);
}
function ri(t, e, n, r, i = 0.15) {
  return i === 0 ? $e(t, e, n) : t < e ? -xc(e - t, r, i) + e : t > n ? +xc(t - n, r, i) + n : t;
}
var o4 = typeof Element < "u", s4 = typeof Map == "function", l4 = typeof Set == "function", c4 = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Yi(t, e) {
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
        if (!Yi(t[r], e[r]))
          return !1;
      return !0;
    }
    var a;
    if (s4 && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!Yi(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (l4 && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (c4 && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if (o4 && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !Yi(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var u4 = function(e, n) {
  try {
    return Yi(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const Ho = /* @__PURE__ */ _t(u4);
function Bf(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const vt = "adm-picker-view", Wf = je((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(y) {
    t.onSelect(y, t.index);
  }
  const [{
    y: a
  }, o] = Re(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), l = V(!1), c = V(null), u = V(null), f = V(34);
  Fe(() => {
    const y = u.current;
    y && (f.current = Bf(window.getComputedStyle(y).getPropertyValue("height")));
  }), Fe(() => {
    if (l.current || e === null)
      return;
    const y = n.findIndex((h) => h.value === e);
    if (y < 0)
      return;
    const C = y * -f.current;
    o.start({
      y: C,
      immediate: a.goal !== C
    });
  }, [e, n]), Fe(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((y) => y.value === e)) {
      const y = n[0];
      i(y.value);
    }
  }, [n, e]);
  function d(y) {
    const C = y * -f.current;
    o.start({
      y: C
    });
    const h = n[y];
    h && i(h.value);
  }
  const m = (y) => {
    const {
      direction: [, C],
      distance: [, h],
      velocity: [, E],
      offset: [, w],
      last: x
    } = y;
    return {
      direction: C,
      distance: h,
      velocity: E,
      offset: w,
      last: x
    };
  }, b = (y) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      offset: k
    } = m(y);
    if (w) {
      l.current = !1;
      const N = k + x * E * 50, F = $e(N, C, h), _ = -Math.round(F / f.current);
      d(_);
    } else {
      const N = k;
      o.start({
        y: ri(N, C, h, f.current * 50, 0.2)
      });
    }
  }, p = (y) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: E,
      last: w,
      velocity: x,
      distance: k
    } = m(y), N = -E, F = a.get();
    if (w) {
      l.current = !1;
      const _ = x * N * 50, D = F + k * N + _, I = $e(D, C, h), R = -Math.round(I / f.current);
      d(R);
    } else {
      const _ = F + k * N;
      o.start({
        y: ri(_, C, h, f.current * 50, 0.2)
      });
    }
  };
  Ot((y) => {
    y.event.stopPropagation(), b(y);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), v3((y) => {
    y.event.stopPropagation(), p(y);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Fn ? {
      passive: !1
    } : void 0
  });
  let v = null;
  function g() {
    if (v === null)
      return null;
    const y = n[v], C = v - 1, h = v + 1, E = n[C], w = n[h];
    return s.createElement("div", {
      className: `${vt}-column-accessible`
    }, s.createElement("div", {
      className: `${vt}-column-accessible-current`,
      role: "button",
      "aria-label": y ? `当前选择的是：${y.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${vt}-column-accessible-button`,
      onClick: () => {
        E && d(C);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${vt}-column-accessible-button`,
      onClick: () => {
        w && d(h);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择下一项：${w.label}` : "没有下一项"
    }, "-"));
  }
  return s.createElement("div", {
    className: `${vt}-column`
  }, s.createElement("div", {
    className: `${vt}-item-height-measure`,
    ref: u
  }), s.createElement(ge.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${vt}-column-wheel`,
    "aria-hidden": !0
  }, n.map((y, C) => {
    var h;
    const E = t.value === y.value;
    E && (v = C);
    function w() {
      l.current = !1, d(C);
    }
    return s.createElement("div", {
      key: (h = y.key) !== null && h !== void 0 ? h : y.value,
      "data-selected": E,
      className: j(`${vt}-column-item`, {
        [`${vt}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${vt}-column-item-label`
    }, r(y)));
  })), g());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !Ho(t.column, e.column)));
Wf.displayName = "Wheel";
function kc(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Zf(t, e) {
  const n = kc(() => (typeof t == "function" ? t(e) : t).map((o) => o.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = kc(() => e.map((a, o) => {
    var l;
    const c = n()[o];
    return c && (l = c.find((u) => u.value === a)) !== null && l !== void 0 ? l : null;
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
function Hf(t, e) {
  return ie(() => Zf(t, e), [t, e]);
}
const zf = (t) => t.label;
var Uf = { exports: {} }, qf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir = s;
function f4(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var d4 = typeof Object.is == "function" ? Object.is : f4, m4 = ir.useState, h4 = ir.useEffect, v4 = ir.useLayoutEffect, p4 = ir.useDebugValue;
function g4(t, e) {
  var n = e(), r = m4({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return v4(function() {
    i.value = n, i.getSnapshot = e, fo(i) && a({ inst: i });
  }, [t, n, e]), h4(function() {
    return fo(i) && a({ inst: i }), t(function() {
      fo(i) && a({ inst: i });
    });
  }, [t]), p4(n), n;
}
function fo(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !d4(t, n);
  } catch {
    return !0;
  }
}
function y4(t, e) {
  return e();
}
var b4 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y4 : g4;
qf.useSyncExternalStore = ir.useSyncExternalStore !== void 0 ? ir.useSyncExternalStore : b4;
Uf.exports = qf;
var E4 = Uf.exports;
let Ks = !1;
const zo = /* @__PURE__ */ new Set();
function Kf() {
  zo.forEach((t) => {
    t();
  });
}
function L7() {
  Ks = !0, Kf(), ot.assign({
    skipAnimation: !0
  });
}
function D7() {
  Ks = !1, Kf(), ot.assign({
    skipAnimation: !1
  });
}
function $c() {
  return Ks;
}
function w4(t) {
  return zo.add(t), () => {
    zo.delete(t);
  };
}
function C4() {
  return E4.useSyncExternalStore(w4, $c, $c);
}
const mo = "adm-spin-loading", x4 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, k4 = {
  color: "default"
}, $4 = 15 * 3.14159265358979 * 2, Ys = je((t) => {
  var e;
  const n = U(k4, t), r = C4(), {
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
    className: mo,
    style: {
      "--color": (e = x4[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${mo}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(ge.circle, {
    className: `${mo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: $4,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), Yn = "adm-picker-view", _4 = {
  defaultValue: [],
  renderLabel: zf,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${Yn}-loading-content`
  }, s.createElement(Ys, null))
}, Ga = je((t) => {
  const e = U(_4, t), [n, r] = K(e.value === void 0 ? e.defaultValue : e.value);
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
  const i = Hf(e.columns, n), a = i.columns;
  G0(() => {
    var l;
    e.value !== n && ((l = e.onChange) === null || l === void 0 || l.call(e, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = ze((l, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = l, f;
    });
  }, []);
  return W(e, s.createElement("div", {
    className: `${Yn}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, a.map((l, c) => s.createElement(Wf, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: o,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${Yn}-mask`
  }, s.createElement("div", {
    className: `${Yn}-mask-top`
  }), s.createElement("div", {
    className: `${Yn}-mask-middle`
  }), s.createElement("div", {
    className: `${Yn}-mask-bottom`
  })))));
});
Ga.displayName = "PickerView";
const Ht = "adm-picker", O4 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: zf,
  destroyOnClose: !1,
  forceRender: !1
}, Gs = je(me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U(O4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [a, o] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var y;
      g === !1 && ((y = i.onClose) === null || y === void 0 || y.call(i));
    }
  }), l = {
    toggle: () => {
      o((g) => !g);
    },
    open: () => {
      o(!0);
    },
    close: () => {
      o(!1);
    }
  };
  be(e, () => l);
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var y;
      const C = Zf(i.columns, g);
      (y = i.onConfirm) === null || y === void 0 || y.call(i, g, C);
    }
  })), f = Hf(i.columns, c), [d, m] = K(c);
  X(() => {
    d !== c && m(c);
  }, [a]), X(() => {
    a || m(c);
  }, [c]);
  const b = jt((g, y) => {
    var C;
    m(g), a && ((C = i.onSelect) === null || C === void 0 || C.call(i, g, y));
  }), p = W(i, s.createElement("div", {
    className: Ht
  }, s.createElement("div", {
    className: `${Ht}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Ht}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Ht}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: j(`${Ht}-header-button`, i.loading && `${Ht}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), s.createElement("div", {
    className: `${Ht}-body`
  }, s.createElement(Ga, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: b
  })))), v = s.createElement(yr, {
    style: i.popupStyle,
    className: j(`${Ht}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var g;
      i.closeOnMaskClick && ((g = i.onCancel) === null || g === void 0 || g.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, p, s.createElement(br, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
Gs.displayName = "Picker";
function S4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), s.createElement(Gs, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, l), e(o);
        },
        onClose: () => {
          var o;
          (o = t.onClose) === null || o === void 0 || o.call(t), a(!1), e(null);
        },
        afterClose: () => {
          var o;
          (o = t.afterClose) === null || o === void 0 || o.call(t), r();
        }
      }));
    }, r = gi(s.createElement(n, null));
  });
}
const Yf = le(Gs, {
  prompt: S4
});
function Gf(t) {
  const e = ie(() => {
    let n = 0;
    function r(i, a) {
      a > n && (n = a);
      const o = a + 1;
      i.forEach((l) => {
        l.children && r(l.children, o);
      });
    }
    return r(t, 1), n;
  }, [t]);
  return (n) => {
    const r = [];
    let i = t, a = 0;
    for (; ; ) {
      r.push(i.map((c) => ({
        label: c.label,
        value: c.value
      })));
      const o = n[a], l = i.find((c) => c.value === o);
      if (!l || !l.children)
        break;
      i = l.children, a++;
    }
    for (; a < e - 1; )
      r.push([]), a++;
    return r;
  };
}
const Xf = me((t, e) => {
  const {
    options: n
  } = t, r = fr(t, ["options"]), i = Gf(n);
  return s.createElement(Yf, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function F4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), s.createElement(Xf, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, l), e(o);
        },
        onClose: () => {
          var o;
          (o = t.onClose) === null || o === void 0 || o.call(t), a(!1), e(null);
        },
        afterClose: () => {
          var o;
          (o = t.afterClose) === null || o === void 0 || o.call(t), r();
        }
      }));
    }, r = gi(s.createElement(n, null));
  });
}
const V7 = le(Xf, {
  prompt: F4
}), j7 = (t) => {
  const {
    options: e
  } = t, n = fr(t, ["options"]), r = Gf(e);
  return s.createElement(Ga, Object.assign({}, n, {
    columns: r
  }));
}, Be = "adm-tabs", N4 = () => null, P4 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, R4 = (t) => {
  var e;
  const n = U(P4, t), r = V(null), i = V(null), a = {};
  let o = null;
  const l = [], c = n.direction === "rtl";
  cn(n.children, (w, x) => {
    if (!An(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    x === 0 && (o = k);
    const N = l.push(w);
    a[k] = N - 1;
  });
  const [u, f] = ae({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : o,
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
    scrollLeft: p
  }, v] = Re(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: g,
    rightMaskOpacity: y
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
    const N = a[u];
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
  }, []), yi(() => {
    h();
  }, [u]), bi(() => {
    h(!d.isAnimating);
  }, r), zs(() => {
    h(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: E
  } = ka((w = !1) => {
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
      opacity: g
    }
  }), s.createElement(ge.div, {
    className: j(`${Be}-header-mask`, `${Be}-header-mask-right`),
    style: {
      opacity: y
    }
  }), s.createElement(ge.div, {
    className: `${Be}-tab-list`,
    ref: r,
    scrollLeft: p,
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
    return s.createElement(pr, {
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
}, _c = le(R4, {
  Tab: N4
}), Or = "adm-list", M4 = {
  mode: "default"
}, A4 = me((t, e) => {
  const n = U(M4, t), r = V(null);
  return be(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: j(Or, `${Or}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${Or}-header`
  }, n.header), s.createElement("div", {
    className: `${Or}-body`
  }, s.createElement("div", {
    className: `${Or}-body-inner`
  }, n.children))));
});
function Tt(t) {
  return t != null && t !== !1;
}
const St = "adm-list-item", T4 = (t) => {
  var e;
  const n = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, r = t.arrow === void 0 ? n : t.arrow, i = s.createElement("div", {
    className: `${St}-content`
  }, Tt(t.prefix) && s.createElement("div", {
    className: `${St}-content-prefix`
  }, t.prefix), s.createElement("div", {
    className: `${St}-content-main`
  }, Tt(t.title) && s.createElement("div", {
    className: `${St}-title`
  }, t.title), t.children, Tt(t.description) && s.createElement("div", {
    className: `${St}-description`
  }, t.description)), Tt(t.extra) && s.createElement("div", {
    className: `${St}-content-extra`
  }, t.extra), Tt(r) && s.createElement("div", {
    className: `${St}-content-arrow`
  }, r === !0 ? s.createElement(h2, null) : r));
  return W(t, s.createElement(n ? "a" : "div", {
    className: j(`${St}`, n ? ["adm-plain-anchor"] : [], t.disabled && `${St}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, i));
}, Ct = le(A4, {
  Item: T4
}), Qf = ps(null), I4 = "adm-check-list", L4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(mf, null)
}, D4 = (t) => {
  const e = U(L4, t), [n, r] = ae(e);
  function i(f) {
    e.multiple ? r([...n, f]) : r([f]);
  }
  function a(f) {
    r(n.filter((d) => d !== f));
  }
  const {
    activeIcon: o,
    extra: l,
    disabled: c,
    readOnly: u
  } = e;
  return s.createElement(Qf.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: a,
      activeIcon: o,
      extra: l,
      disabled: c,
      readOnly: u
    }
  }, W(e, s.createElement(Ct, {
    mode: e.mode,
    className: I4
  }, e.children)));
}, Ii = "adm-check-list-item", V4 = (t) => {
  const e = at(Qf);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, a = e.extra ? e.extra(n) : i, o = s.createElement("div", {
    className: `${Ii}-extra`
  }, a);
  return W(t, s.createElement(Ct.Item, {
    title: t.title,
    className: j(Ii, r && `${Ii}-readonly`, n && `${Ii}-active`),
    description: t.description,
    prefix: t.prefix,
    onClick: (l) => {
      var c;
      r || (n ? e.uncheck(t.value) : e.check(t.value), (c = t.onClick) === null || c === void 0 || c.call(t, l));
    },
    arrow: !1,
    clickable: !r,
    extra: o,
    disabled: t.disabled || e.disabled
  }, t.children));
}, Oc = le(D4, {
  Item: V4
});
function j4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function Sc(t, e) {
  e || (e = {});
  var n = e.vargs || j4(t), r = [], i = /* @__PURE__ */ new Map(), a, o, l = function(b) {
    return o = setTimeout(function() {
      if (a) {
        i.delete(b);
        return;
      }
      r.splice(b, 1);
    }, e.maxAge);
  }, c = e.maxAge > 0 && e.maxAge < 1 / 0 ? l : 0, u = e.equals ? e.equals : 0, f = e.maxArgs, d = e.serializer, m;
  return t.length === 1 && !e.equals && !n ? (m = function(b) {
    d && (b = d(b));
    var p;
    return i.get(b) || (!c || c(b), i.set(b, p = t.call(this, b)), p);
  }, a = 1) : u ? m = function() {
    for (var b = f || arguments.length, p = r.length, v = -1; ++v < p; )
      if (r[v].length === b) {
        for (var g = -1; ++g < b && u(arguments[g], r[v][g]); )
          ;
        if (g === b)
          return r[v].val;
      }
    return r[v] = arguments, !c || c(v), arguments.val = t.apply(this, r[v]);
  } : m = function() {
    for (var b = f || arguments.length, p = r.length, v = -1; ++v < p; )
      if (r[v].length === b) {
        for (var g = -1; ++g < b && arguments[g] === r[v][g]; )
          ;
        if (g === b)
          return r[v].val;
      }
    return r[v] = arguments, !c || c(v), arguments.val = t.apply(this, r[v]);
  }, m.clear = function() {
    o && clearTimeout(o), i.clear(), r = [];
  }, m.keys = function() {
    return a ? [
      ...i.keys()
    ] : r.slice();
  }, m.values = function() {
    return a ? [
      ...i.values()
    ] : r.map((b) => b.val);
  }, m;
}
function Jf(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = ie(() => Sc((l) => {
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
    equals: Ho
  }), [t]), a = ie(() => Sc((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: Ho
  }), [t]);
  function o(l) {
    return {
      get items() {
        return i(l);
      },
      get isLeaf() {
        return a(l);
      }
    };
  }
  return o;
}
const Xs = [];
function B4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ii = "adm-skeleton", Qs = (t) => W(t, s.createElement("div", {
  className: j(ii, {
    [`${ii}-animated`]: t.animated
  })
})), W4 = (t) => W(t, s.createElement(Qs, {
  animated: t.animated,
  className: `${ii}-title`
})), Z4 = {
  lineCount: 3
}, H4 = (t) => {
  const e = U(Z4, t), n = B4(1, e.lineCount), r = s.createElement("div", {
    className: `${ii}-paragraph`
  }, n.map((i) => s.createElement(Qs, {
    key: i,
    animated: e.animated,
    className: `${ii}-paragraph-line`
  })));
  return W(e, r);
}, Li = le(Qs, {
  Title: W4,
  Paragraph: H4
}), Ei = (t = {}) => ie(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = t;
  return [n, r, a, i];
}, [JSON.stringify(t)]), ut = "adm-cascader-view", z4 = {
  defaultValue: []
}, U4 = (t) => {
  const e = U(z4, t), {
    locale: n
  } = ye(), [r, i, a, o] = Ei(e.fieldNames), l = Jf(e.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = ae(Object.assign(Object.assign({}, e), {
    onChange: (g) => {
      var y;
      (y = e.onChange) === null || y === void 0 || y.call(e, g, l(g));
    }
  })), [f, d] = K(0), m = ie(() => {
    const g = [];
    let y = e.options, C = !1;
    for (const h of c) {
      const E = y.find((w) => w[i] === h);
      if (g.push({
        selected: E,
        options: y
      }), !E || !E[a]) {
        C = !0;
        break;
      }
      y = E[a];
    }
    return C || g.push({
      selected: void 0,
      options: y
    }), g;
  }, [c, e.options]);
  ys(() => {
    var g;
    (g = e.onTabsChange) === null || g === void 0 || g.call(e, f);
  }, [f]), X(() => {
    d(m.length - 1);
  }, [c]), X(() => {
    const g = m.length - 1;
    f > g && d(g);
  }, [f, m]);
  const b = (g, y) => {
    const C = c.slice(0, y);
    g !== void 0 && (C[y] = g), u(C);
  }, p = (g) => e.loading || g === Xs, v = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: ut
  }, s.createElement(_c, {
    activeKey: f.toString(),
    onChange: (g) => {
      const y = parseInt(g);
      d(y);
    },
    stretch: !1,
    className: `${ut}-tabs`
  }, m.map((g, y) => {
    const C = g.selected;
    return s.createElement(_c.Tab, {
      key: y.toString(),
      title: s.createElement("div", {
        className: `${ut}-header-title`
      }, C ? C[r] : typeof v == "function" ? v(y) : v),
      forceRender: !0
    }, s.createElement("div", {
      className: `${ut}-content`
    }, p(g.options) ? s.createElement("div", {
      className: `${ut}-skeleton`
    }, s.createElement(Li, {
      className: `${ut}-skeleton-line-1`,
      animated: !0
    }), s.createElement(Li, {
      className: `${ut}-skeleton-line-2`,
      animated: !0
    }), s.createElement(Li, {
      className: `${ut}-skeleton-line-3`,
      animated: !0
    }), s.createElement(Li, {
      className: `${ut}-skeleton-line-4`,
      animated: !0
    })) : s.createElement(Oc, {
      value: [c[y]],
      onChange: (h) => b(h[0], y),
      activeIcon: e.activeIcon
    }, g.options.map((h) => {
      const E = c[y] === h[i];
      return s.createElement(Oc.Item, {
        value: h[i],
        key: h[i],
        disabled: h[o],
        className: j(`${ut}-item`, {
          [`${ut}-item-active`]: E
        })
      }, h[r]);
    }))));
  }))));
}, q4 = le(U4, {
  optionSkeleton: Xs
}), jn = "adm-cascader", K4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, ed = me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U(K4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [a, o] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (y) => {
      var C;
      y === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
    }
  }), l = {
    toggle: () => {
      o((y) => !y);
    },
    open: () => {
      o(!0);
    },
    close: () => {
      o(!1);
    }
  };
  be(e, () => l);
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (y) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, y, m(y));
    }
  })), [, f, d] = Ei(i.fieldNames), m = Jf(i.options, {
    valueName: f,
    childrenName: d
  }), [b, p] = K(c);
  X(() => {
    a || p(c);
  }, [a, c]);
  const v = W(i, s.createElement("div", {
    className: jn
  }, s.createElement("div", {
    className: `${jn}-header`
  }, s.createElement("a", {
    className: `${jn}-header-button`,
    onClick: () => {
      var y;
      (y = i.onCancel) === null || y === void 0 || y.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${jn}-header-title`
  }, i.title), s.createElement("a", {
    className: `${jn}-header-button`,
    onClick: () => {
      u(b, !0), o(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${jn}-body`
  }, s.createElement(q4, Object.assign({}, i, {
    value: b,
    onChange: (y, C) => {
      var h;
      p(y), a && ((h = i.onSelect) === null || h === void 0 || h.call(i, y, C));
    }
  }))))), g = s.createElement(yr, {
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var y;
      (y = i.onCancel) === null || y === void 0 || y.call(i), o(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, v);
  return s.createElement(s.Fragment, null, g, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function Y4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), s.createElement(ed, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, l) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, l), e(o);
        },
        onClose: () => {
          var o;
          (o = t.onClose) === null || o === void 0 || o.call(t), a(!1), e(null);
        },
        afterClose: () => {
          var o;
          (o = t.afterClose) === null || o === void 0 || o.call(t), r();
        }
      }));
    }, r = gi(s.createElement(n, null));
  });
}
const B7 = le(ed, {
  prompt: Y4,
  optionSkeleton: Xs
}), Sr = "adm-center-popup", G4 = Object.assign(Object.assign({}, Vs), {
  getContainer: null
}), td = (t) => {
  const e = U(G4, t), n = Cs(), r = Re({
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
      n.current || (a(e.visible), e.visible ? (f = e.afterShow) === null || f === void 0 || f.call(e) : (d = e.afterClose) === null || d === void 0 || d.call(e));
    }
  }), [i, a] = K(e.visible);
  Fe(() => {
    e.visible && a(!0);
  }, [e.visible]);
  const o = V(null);
  $a(o, e.disableBodyScroll && i);
  const l = yf(i && e.visible), c = s.createElement("div", {
    className: j(`${Sr}-body`, e.bodyClassName),
    style: e.bodyStyle
  }, e.children), u = nn(e.stopPropagation, W(e, s.createElement("div", {
    className: Sr,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, e.mask && s.createElement(hi, {
    visible: l,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose,
    onMaskClick: (f) => {
      var d, m;
      (d = e.onMaskClick) === null || d === void 0 || d.call(e, f), e.closeOnMaskClick && ((m = e.onClose) === null || m === void 0 || m.call(e));
    },
    style: e.maskStyle,
    className: j(`${Sr}-mask`, e.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: e.stopPropagation
  }), s.createElement("div", {
    className: `${Sr}-wrap`,
    role: e.role,
    "aria-label": e["aria-label"]
  }, s.createElement(ge.div, {
    style: Object.assign(Object.assign({}, r), {
      pointerEvents: r.opacity.to((f) => f === 1 ? "unset" : "none")
    }),
    ref: o
  }, e.showCloseButton && s.createElement("a", {
    className: j(`${Sr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var f;
      (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, s.createElement(vi, null)), c)))));
  return s.createElement(pr, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, vr(e.getContainer, u));
}, nd = ps(null), X4 = {
  disabled: !1,
  defaultValue: []
}, Q4 = (t) => {
  const e = U(X4, t), [n, r] = ae(e);
  return s.createElement(
    nd.Provider,
    {
      // TODO: 性能优化
      value: {
        value: n,
        disabled: e.disabled,
        check: (i) => {
          r([...n, i]);
        },
        uncheck: (i) => {
          r(n.filter((a) => a !== i));
        }
      }
    },
    e.children
  );
}, rd = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), J4 = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), id = (t) => {
  const e = V(null), n = jt((r) => {
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
}, zt = "adm-checkbox", ev = {
  defaultChecked: !1,
  indeterminate: !1
}, tv = me((t, e) => {
  const n = at(nd), r = U(ev, t);
  let [i, a] = ae({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), o = r.disabled;
  const {
    value: l
  } = r;
  n && l !== void 0 && (i = n.value.includes(l), a = (u) => {
    var f;
    u ? n.check(l) : n.uncheck(l), (f = r.onChange) === null || f === void 0 || f.call(r, u);
  }, o = o || n.disabled), be(e, () => ({
    check: () => {
      a(!0);
    },
    uncheck: () => {
      a(!1);
    },
    toggle: () => {
      a(!i);
    }
  }));
  const c = () => r.icon ? s.createElement("div", {
    className: `${zt}-custom-icon`
  }, r.icon(i, r.indeterminate)) : s.createElement("div", {
    className: `${zt}-icon`
  }, r.indeterminate ? s.createElement(J4, null) : i && s.createElement(rd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: j(zt, {
      [`${zt}-checked`]: i && !r.indeterminate,
      [`${zt}-indeterminate`]: r.indeterminate,
      [`${zt}-disabled`]: o,
      [`${zt}-block`]: r.block
    })
  }, s.createElement(id, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${zt}-content`
  }, r.children)));
}), Fc = le(tv, {
  Group: Q4
}), kn = "adm-collapse", nv = () => null, rv = (t) => {
  const {
    visible: e
  } = t, n = V(null), r = Aa(e, t.forceRender, t.destroyOnClose), [{
    height: i
  }, a] = Re(() => ({
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
  return j0(() => {
    if (!e)
      return;
    const o = n.current;
    o && a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), yi(() => {
    const o = n.current;
    o && (e ? a.start({
      height: o.offsetHeight
    }) : (a.start({
      height: o.offsetHeight,
      immediate: !0
    }), a.start({
      height: 0
    })));
  }, [e]), s.createElement(ge.div, {
    className: j(`${kn}-panel-content`, {
      [`${kn}-panel-content-active`]: e
    }),
    style: {
      height: i.to((o) => i.idle && e ? "auto" : o)
    }
  }, s.createElement("div", {
    className: `${kn}-panel-content-inner`,
    ref: n
  }, s.createElement(Ct.Item, null, r && t.children)));
}, iv = (t) => {
  const e = [];
  cn(t.children, (o) => {
    !An(o) || typeof o.key != "string" || e.push(o);
  });
  const n = () => {
    var o;
    if (!t.accordion)
      return {
        value: t.activeKey,
        defaultValue: (o = t.defaultActiveKey) !== null && o !== void 0 ? o : [],
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
  }, [r, i] = ae(n()), a = r === null ? [] : Array.isArray(r) ? r : [r];
  return W(t, s.createElement("div", {
    className: kn
  }, s.createElement(Ct, null, e.map((o) => {
    const l = o.key, c = a.includes(l);
    function u(d) {
      var m, b;
      t.accordion ? i(c ? [] : [l]) : i(c ? a.filter((p) => p !== l) : [...a, l]), (b = (m = o.props).onClick) === null || b === void 0 || b.call(m, d);
    }
    const f = () => {
      let d = s.createElement(vf, null);
      return t.arrow !== void 0 && (d = t.arrow), o.props.arrow !== void 0 && (d = o.props.arrow), typeof d == "function" ? d(c) : s.createElement("div", {
        className: j(`${kn}-arrow`, {
          [`${kn}-arrow-active`]: c
        })
      }, d);
    };
    return s.createElement(s.Fragment, {
      key: l
    }, W(o.props, s.createElement(Ct.Item, {
      className: `${kn}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: f()
    }, o.props.title)), s.createElement(rv, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, W7 = le(iv, {
  Panel: nv
});
var ad = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(dt, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(ad);
var av = ad.exports;
const od = /* @__PURE__ */ _t(av);
var sd = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(dt, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(sd);
var ov = sd.exports;
const ld = /* @__PURE__ */ _t(ov), ar = "TILL_NOW";
ve.extend(Va);
ve.extend(od);
ve.extend(ld);
const Ut = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function sv(t, e, n, r, i, a, o) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), p = n.getFullYear(), v = n.getMonth() + 1, g = n.getDate(), y = n.getHours(), C = n.getMinutes(), h = n.getSeconds(), E = Ut[r], w = parseInt(t[0]), x = ve(Uo([t[0], t[1], "1"])), k = parseInt(t[1]), N = parseInt(t[2]), F = parseInt(t[3]), _ = parseInt(t[4]), D = w === c, I = w === p, R = D && k === u, $ = I && k === v, M = R && N === f, S = $ && N === g, O = M && F === d, A = S && F === y, P = O && _ === m, T = A && _ === C, B = (Z, q, Y) => {
    let G = [];
    for (let Ee = Z; Ee <= q; Ee++)
      G.push(Ee);
    const ce = t.slice(0, Ut[Y]), he = a == null ? void 0 : a[Y];
    return he && typeof he == "function" && (G = G.filter((Ee) => he(Ee, {
      get date() {
        const z = [...ce, Ee.toString()];
        return Uo(z);
      }
    }))), G;
  };
  if (E >= Ut.year) {
    const Y = B(c, p, "year");
    l.push(Y.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.month) {
    const Y = B(D ? u : 1, I ? v : 12, "month");
    l.push(Y.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.day) {
    const Z = R ? f : 1, q = $ ? g : x.daysInMonth(), Y = B(Z, q, "day");
    l.push(Y.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.hour) {
    const Y = B(M ? d : 0, S ? y : 23, "hour");
    l.push(Y.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.minute) {
    const Y = B(O ? m : 0, A ? C : 59, "minute");
    l.push(Y.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (E >= Ut.second) {
    const Y = B(P ? b : 0, T ? h : 59, "second");
    l.push(Y.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (o && (l[0].push({
    label: i("now", null),
    value: ar
  }), ar === (t == null ? void 0 : t[0])))
    for (let Z = 1; Z < l.length; Z += 1)
      l[Z] = [];
  return l;
}
function lv(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function Uo(t) {
  var e, n, r, i, a, o;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (a = t[4]) !== null && a !== void 0 ? a : "0", m = (o = t[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
ve.extend(Va);
ve.extend(od);
ve.extend(ld);
const Fr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function cv(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = Fr[r], f = parseInt(t[0]), d = f === l, m = f === c, b = ve(e), p = ve(n), v = b.isoWeek(), g = p.isoWeek(), y = b.isoWeekday(), C = p.isoWeekday(), h = parseInt(t[1]), E = d && h === v, w = m && h === g, x = ve(`${f}-01-01`).isoWeeksInYear(), k = (N, F, _) => {
    let D = [];
    for (let $ = N; $ <= F; $++)
      D.push($);
    const I = t.slice(0, Fr[_]), R = a == null ? void 0 : a[_];
    return R && typeof R == "function" && (D = D.filter(($) => R($, {
      get date() {
        const M = [...I, $.toString()];
        return cd(M);
      }
    }))), D;
  };
  if (u >= Fr.year) {
    const _ = k(l, c, "year");
    o.push(_.map((D) => ({
      label: i("year", D),
      value: D.toString()
    })));
  }
  if (u >= Fr.week) {
    const _ = k(d ? v : 1, m ? g : x, "week");
    o.push(_.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= Fr["week-day"]) {
    const _ = k(E ? y : 1, w ? C : 7, "week-day");
    o.push(_.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return o;
}
function uv(t) {
  if (!t)
    return [];
  const e = ve(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function cd(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", a = (n = t[1]) !== null && n !== void 0 ? n : "1", o = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return ve().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const fv = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, ud = (t, e) => {
  if (e.includes("week"))
    return uv(t);
  {
    const n = e;
    return lv(t).slice(0, fv[n]);
  }
}, qo = (t, e) => {
  if ((t == null ? void 0 : t[0]) === ar) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? cd(t) : Uo(t);
}, fd = (t, e, n, r, i, a, o) => r.startsWith("week") ? cv(t, e, n, r, i, a) : sv(t, e, n, r, i, a, o);
function dd(t) {
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
const Nc = (/* @__PURE__ */ new Date()).getFullYear(), dv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Nc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Nc + 10)),
  precision: "day",
  defaultValue: null
}, md = me((t, e) => {
  const n = U(dv, t), {
    renderLabel: r
  } = n, [i, a] = ae({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), o = ie(() => /* @__PURE__ */ new Date(), []), l = dd(r), c = ie(() => {
    let m = i ?? o;
    return m.tillNow ? [ar] : (m = new Date($e(m.getTime(), n.min.getTime(), n.max.getTime())), ud(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = ze((m) => {
    const b = qo(m, n.precision);
    a(b, !0);
  }, [a, n.precision]), f = jt((m) => {
    var b;
    const p = qo(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, p);
  }), d = ze((m) => fd(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return W(n, s.createElement(Yf, {
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
    var p;
    return (p = n.children) === null || p === void 0 ? void 0 : p.call(n, i, b);
  }));
});
function mv(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), s.createElement(md, Object.assign({}, t, {
        visible: i,
        onConfirm: (o) => {
          var l;
          (l = t.onConfirm) === null || l === void 0 || l.call(t, o), e(o);
        },
        onClose: () => {
          var o;
          (o = t.onClose) === null || o === void 0 || o.call(t), a(!1), e(null);
        },
        afterClose: () => {
          var o;
          (o = t.afterClose) === null || o === void 0 || o.call(t), r();
        }
      }));
    }, r = gi(s.createElement(n, null));
  });
}
const Z7 = le(md, {
  prompt: mv,
  DATE_NOW: ar
}), Pc = (/* @__PURE__ */ new Date()).getFullYear(), hv = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Pc - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Pc + 10)),
  precision: "day"
}, H7 = (t) => {
  var e;
  const n = U(hv, t), {
    renderLabel: r
  } = n, [i, a] = ae({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), o = dd(r), l = ie(() => i != null && i.tillNow ? [ar, null, null] : ud(i, n.precision), [i, n.precision]), c = ze((u) => {
    var f;
    const d = qo(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Ga, {
    columns: (u) => fd(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, vv = (t) => {
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
}, pv = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, hd = (t) => {
  const e = U(pv, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: pt("image-container")
  }, s.createElement(Da, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: pt("header")
  }, s.createElement(ni, null, e.header)), !!e.title && s.createElement("div", {
    className: pt("title")
  }, e.title), s.createElement("div", {
    className: j(pt("content"), !e.content && pt("content-empty"))
  }, typeof e.content == "string" ? s.createElement(ni, null, e.content) : e.content), s.createElement("div", {
    className: pt("footer")
  }, e.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: pt("action-row"),
      key: i
    }, a.map((o, l) => s.createElement(vv, {
      key: o.key,
      action: o,
      onAction: () => Oe(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, o, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(td, {
    className: j(pt(), e.className),
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
    bodyClassName: j(pt("body"), e.image && pt("with-image"), e.bodyClassName),
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
function pt(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const Ko = /* @__PURE__ */ new Set();
function Js(t) {
  const e = Er(s.createElement(hd, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Ko.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Ko.add(e.close), e;
}
function gv(t) {
  const e = {
    confirmText: ci().locale.Dialog.ok
  }, n = U(e, t);
  return new Promise((r) => {
    Js(Object.assign(Object.assign({}, n), {
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
const yv = {
  confirmText: "确认",
  cancelText: "取消"
};
function bv(t) {
  const {
    locale: e
  } = ci(), n = U(yv, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Js(Object.assign(Object.assign({}, n), {
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
function Ev() {
  Ko.forEach((t) => {
    t();
  });
}
const z7 = le(hd, {
  show: Js,
  alert: gv,
  confirm: bv,
  clear: Ev
}), At = "adm-dropdown-item", wv = (t) => {
  var e;
  const n = j(At, {
    [`${At}-active`]: t.active,
    [`${At}-highlight`]: (e = t.highlight) !== null && e !== void 0 ? e : t.active
  });
  return W(t, s.createElement("div", {
    className: n,
    onClick: t.onClick
  }, s.createElement("div", {
    className: `${At}-title`
  }, s.createElement("span", {
    className: `${At}-title-text`
  }, t.title), s.createElement("span", {
    className: j(`${At}-title-arrow`, {
      [`${At}-title-arrow-active`]: t.active
    })
  }, t.arrow === void 0 ? s.createElement(u2, null) : t.arrow))));
}, Cv = wv, xv = (t) => {
  const {
    active: e = !1
  } = t, n = Aa(e, t.forceRender, t.destroyOnClose), r = j(`${At}-content`, {
    [`${At}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, Bn = "adm-dropdown", kv = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Vs.getContainer
}, $v = me((t, e) => {
  const n = U(kv, t), [r, i] = ae({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = V(null), o = V(null);
  $u(() => {
    n.closeOnClickAway && i(null);
  }, [a, o]);
  const [l, c] = K(), u = V(null);
  X(() => {
    const p = u.current;
    if (p && r) {
      const v = p.getBoundingClientRect();
      c(v.bottom);
    }
  }, [r]);
  const f = (p) => {
    i(r === p ? null : p);
  };
  let d = !1;
  const m = [], b = s.Children.map(n.children, (p) => {
    if (An(p)) {
      const v = Object.assign(Object.assign({}, p.props), {
        onClick: (g) => {
          var y, C;
          f(p.key), (C = (y = p.props).onClick) === null || C === void 0 || C.call(y, g);
        },
        active: p.key === r,
        arrow: p.props.arrow === void 0 ? n.arrow : p.props.arrow
      });
      return m.push(p), p.props.forceRender && (d = !0), y1(p, v);
    } else
      return p;
  });
  return be(e, () => ({
    close: () => {
      i(null);
    }
  }), [i]), W(n, s.createElement("div", {
    className: j(Bn, {
      [`${Bn}-open`]: !!r
    }),
    ref: u
  }, s.createElement("div", {
    className: `${Bn}-nav`,
    ref: a
  }, b), s.createElement(yr, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${Bn}-popup`,
    maskClassName: `${Bn}-popup-mask`,
    bodyClassName: `${Bn}-popup-body`,
    style: {
      top: l
    },
    forceRender: d,
    onMaskClick: n.closeOnMaskClick ? () => {
      f(null);
    } : void 0
  }, s.createElement("div", {
    ref: o
  }, m.map((p) => {
    const v = p.key === r;
    return s.createElement(xv, {
      key: p.key,
      active: v,
      forceRender: p.props.forceRender,
      destroyOnClose: p.props.destroyOnClose
    }, p.props.children);
  })))));
}), _v = $v, U7 = le(_v, {
  Item: Cv
});
var Rc;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(Rc || (Rc = {}));
const Ov = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var Mc;
function Gi(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += Sv(n + r, t), Tv(t[n + r]) && r++, Rv(t[n + r]) && r++, Mv(t[n + r]) && r++, Iv(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function Sv(t, e) {
  const n = e[t];
  if (!Fv(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Ac(r) && Ac(i) ? 4 : Nv(r) && Av(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : Pv(i) ? 4 : 2;
}
function Fv(t) {
  return t && Tn(t[0].charCodeAt(0), 55296, 56319);
}
function Ac(t) {
  return Tn(el(t), 127462, 127487);
}
function Nv(t) {
  return Tn(el(t), 127988, 127988);
}
function Pv(t) {
  return Tn(el(t), 127995, 127999);
}
function Rv(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 65024, 65039);
}
function Mv(t) {
  return typeof t == "string" && Tn(t.charCodeAt(0), 8400, 8447);
}
function Av(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && Tn(e, 917504, 917631);
}
function Tv(t) {
  return typeof t == "string" && Ov.includes(t.charCodeAt(0));
}
function Iv(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function el(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function Tn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(Mc || (Mc = {}));
const Lv = "adm-ellipsis", Dv = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, q7 = (t) => {
  const e = U(Dv, t), n = V(null), r = V(null), i = V(null), [a, o] = K({}), [l, c] = K(e.defaultExpanded), [u, f] = K(!1), d = ie(() => Gi(e.content), [e.content]);
  function m(y, C) {
    return d.slice(y, C).join("");
  }
  function b() {
    var y, C;
    const h = n.current;
    if (!h)
      return;
    const E = h.style.display;
    h.style.display = "block";
    const w = window.getComputedStyle(h), x = document.createElement("div");
    Array.prototype.slice.apply(w).forEach((_) => {
      x.style.setProperty(_, w.getPropertyValue(_));
    }), h.style.display = E, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const N = ho(w.lineHeight), F = Math.floor(N * (e.rows + 0.5) + ho(w.paddingTop) + ho(w.paddingBottom));
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
      const _ = e.content.length, D = typeof e.collapseText == "string" ? e.collapseText : (y = i.current) === null || y === void 0 ? void 0 : y.innerHTML, I = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, R = l ? D : I, S = Math.floor((0 + _) / 2), O = e.direction === "middle" ? M([0, S], [S, _]) : $(0, _);
      o(O);
    }
    document.body.removeChild(x);
  }
  bi(b, n), Fe(() => {
    b();
  }, [e.content, e.direction, e.rows, e.expandText, e.collapseText]);
  const p = !!e.expandText && nn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, e.expandText)), v = !!e.collapseText && nn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, e.collapseText)), g = () => u ? l ? s.createElement(s.Fragment, null, e.content, v) : s.createElement(s.Fragment, null, a.leading, p, a.tailing) : e.content;
  return W(e, s.createElement("div", {
    ref: n,
    className: Lv,
    onClick: (y) => {
      y.target === y.currentTarget && e.onContentClick(y);
    }
  }, g()));
};
function ho(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const Vv = (t) => W(t, s.createElement("svg", {
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
}))))), Nr = "adm-empty", K7 = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(Vv, {
      className: `${Nr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Nr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, s.createElement("div", {
    className: Nr
  }, s.createElement("div", {
    className: `${Nr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: j(`${Nr}-description`)
  }, t.description)));
}, fn = "adm-error-block", jv = {
  status: "default"
};
function Bv(t) {
  return (n) => {
    var r;
    const i = U(jv, n), {
      locale: a
    } = ye(), o = a.ErrorBlock[i.status], l = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, s.createElement("div", {
      className: j(fn, {
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
const Wv = s.createElement("svg", {
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
}))), Zv = s.createElement("svg", {
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
})))), Hv = s.createElement("svg", {
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
})))), zv = s.createElement("svg", {
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
})))), Uv = {
  default: Wv,
  disconnected: Zv,
  empty: Hv,
  busy: zv
}, Y7 = Bv(Uv), Di = "adm-floating-bubble", qv = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, G7 = (t) => {
  const e = U(qv, t), n = V(null), r = V(null), [i, a] = K(e.offset === void 0 ? e.defaultOffset : e.offset);
  X(() => {
    e.offset !== void 0 && u.start({
      x: e.offset.x,
      y: e.offset.y
    });
  }, [e.offset]);
  const [{
    x: o,
    y: l,
    opacity: c
  }, u] = Re(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = Ot((d) => {
    var m;
    let b = d.offset[0], p = d.offset[1];
    if (d.last && e.magnetic) {
      const g = n.current, y = r.current;
      if (!g || !y)
        return;
      const C = g.getBoundingClientRect(), h = y.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = o.goal - o.get(), w = h.left + E - C.left, x = C.right - (h.right + E);
        x <= w ? b += x : b -= w;
      } else if (e.magnetic === "y") {
        const E = l.goal - l.get(), w = h.top + E - C.top, x = C.bottom - (h.bottom + E);
        x <= w ? p += x : p -= w;
      }
    }
    const v = {
      x: b,
      y: p
    };
    e.offset === void 0 ? u.start(v) : a(v), (m = e.onOffsetChange) === null || m === void 0 || m.call(e, v), u.start({
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
    from: () => [o.get(), l.get()]
  });
  return W(e, s.createElement("div", {
    className: Di
  }, s.createElement("div", {
    className: `${Di}-boundary-outer`
  }, s.createElement("div", {
    className: `${Di}-boundary`,
    ref: n
  })), s.createElement(ge.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: Zh([o, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${Di}-button`,
    ref: r
  }), e.children)));
};
function tl(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Pr = "adm-floating-panel", Kv = {
  handleDraggingOfContent: !0
}, X7 = me((t, e) => {
  var n, r;
  const i = U(Kv, t), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, l = a.map((C) => -C), c = V(null), u = V(null), f = V(null), [d, m] = K(!1), b = V(!1), p = {
    top: l[l.length - 1],
    bottom: l[0]
  }, v = jt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: g
  }, y] = Re(() => ({
    y: p.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      v(-C.value.y, g.isAnimating);
    }
  }));
  return Ot((C) => {
    const [, h] = C.offset;
    if (C.first) {
      const x = C.event.target, k = u.current;
      if (k === x || k != null && k.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = g.goal <= p.top, F = f.current;
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
    E.cancelable && Fn && E.preventDefault(), E.stopPropagation();
    let w = h;
    C.last && (b.current = !1, m(!1), w = tl(l, h)), y.start({
      y: w
    });
  }, {
    axis: "y",
    bounds: p,
    rubberband: !0,
    from: () => [0, g.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Fn ? {
      passive: !1
    } : void 0
  }), be(e, () => ({
    setHeight: (C, h) => {
      y.start({
        y: -C,
        immediate: h == null ? void 0 : h.immediate
      });
    }
  }), [y]), $a(c, !0), W(i, s.createElement(ge.div, {
    ref: c,
    className: Pr,
    style: {
      height: Math.round(o),
      translateY: g.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, s.createElement("div", {
    className: `${Pr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), s.createElement("div", {
    className: `${Pr}-header`,
    ref: u
  }, s.createElement("div", {
    className: `${Pr}-bar`
  })), s.createElement("div", {
    className: `${Pr}-content`,
    ref: f
  }, i.children)));
});
function va() {
  return va = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, va.apply(this, arguments);
}
function Yv(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function nl(t, e) {
  if (t == null)
    return {};
  var n = Yv(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
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
function Gv(t, e) {
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
function vd(t) {
  var e = Gv(t, "string");
  return Ue(e) === "symbol" ? e : String(e);
}
function Ve(t, e, n) {
  return e = vd(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Tc(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function oe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Tc(Object(n), !0).forEach(function(r) {
      Ve(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Tc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function Yo(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function Xv(t) {
  if (Array.isArray(t))
    return Yo(t);
}
function pd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function rl(t, e) {
  if (t) {
    if (typeof t == "string")
      return Yo(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Yo(t, e);
  }
}
function Qv() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function se(t) {
  return Xv(t) || pd(t) || rl(t) || Qv();
}
function wi(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ic(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, vd(r.key), r);
  }
}
function Ci(t, e, n) {
  return e && Ic(t.prototype, e), n && Ic(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function gd(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Go(t, e) {
  return Go = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Go(t, e);
}
function Jv(t, e) {
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
  }), e && Go(t, e);
}
function pa(t) {
  return pa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, pa(t);
}
function ep() {
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
function tp(t, e) {
  if (e && (Ue(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return gd(t);
}
function np(t) {
  var e = ep();
  return function() {
    var r = pa(t), i;
    if (e) {
      var a = pa(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return tp(this, i);
  };
}
function Xo(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(Xo(r)) : ha.isFragment(r) && r.props ? n = n.concat(Xo(r.props.children, e)) : n.push(r));
  }), n;
}
var Qo = {}, rp = function(e) {
};
function ip(t, e) {
}
function ap(t, e) {
}
function op() {
  Qo = {};
}
function yd(t, e, n) {
  !e && !Qo[n] && (t(!1, n), Qo[n] = !0);
}
function ht(t, e) {
  yd(ip, t, e);
}
function sp(t, e) {
  yd(ap, t, e);
}
ht.preMessage = rp;
ht.resetWarned = op;
ht.noteOnce = sp;
var $n = "RC_FORM_INTERNAL_HOOKS", fe = function() {
  ht(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Rn = /* @__PURE__ */ L.createContext({
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
function Jo(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Dt() {
  Dt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(S, O, A) {
    S[O] = A.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
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
    var T = O && O.prototype instanceof y ? O : y, B = Object.create(T.prototype), Z = new $(P || []);
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
  var m = "suspendedStart", b = "suspendedYield", p = "executing", v = "completed", g = {};
  function y() {
  }
  function C() {
  }
  function h() {
  }
  var E = {};
  u(E, o, function() {
    return this;
  });
  var w = Object.getPrototypeOf, x = w && w(w(M([])));
  x && x !== n && r.call(x, o) && (E = x);
  var k = h.prototype = y.prototype = Object.create(E);
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
      if (P === p)
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
            if (q === g)
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
        P = p;
        var Y = d(S, O, A);
        if (Y.type === "normal") {
          if (P = A.done ? v : b, Y.arg === g)
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
      return O.delegate = null, A === "throw" && S.iterator.return && (O.method = "return", O.arg = t, D(S, O), O.method === "throw") || A !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + A + "' method")), g;
    var T = d(P, S.iterator, O.arg);
    if (T.type === "throw")
      return O.method = "throw", O.arg = T.arg, O.delegate = null, g;
    var B = T.arg;
    return B ? B.done ? (O[S.resultName] = B.value, O.next = S.nextLoc, O.method !== "return" && (O.method = "next", O.arg = t), O.delegate = null, g) : B : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, g);
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
      var O = S[o];
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
  }, N(k), u(k, c, "Generator"), u(k, o, function() {
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
      return Z.type = O, Z.arg = A, B ? (this.method = "next", this.next = B.finallyLoc, g) : this.complete(Z);
    },
    complete: function(O, A) {
      if (O.type === "throw")
        throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && A && (this.next = A), g;
    },
    finish: function(O) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var P = this.tryEntries[A];
        if (P.finallyLoc === O)
          return this.complete(P.completion, P.afterLoc), R(P), g;
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
      }, this.method === "next" && (this.arg = t), g;
    }
  }, e;
}
function Lc(t, e, n, r, i, a, o) {
  try {
    var l = t[a](o), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function Xa(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var a = t.apply(e, n);
      function o(c) {
        Lc(a, r, i, o, l, "next", c);
      }
      function l(c) {
        Lc(a, r, i, o, l, "throw", c);
      }
      o(void 0);
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
function lp(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, ai(t, e);
}
function es(t) {
  return es = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, es(t);
}
function ai(t, e) {
  return ai = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, ai(t, e);
}
function cp() {
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
function Xi(t, e, n) {
  return cp() ? Xi = Reflect.construct.bind() : Xi = function(i, a, o) {
    var l = [null];
    l.push.apply(l, a);
    var c = Function.bind.apply(i, l), u = new c();
    return o && ai(u, o.prototype), u;
  }, Xi.apply(null, arguments);
}
function up(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function ts(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return ts = function(r) {
    if (r === null || !up(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Xi(r, arguments, es(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ai(i, r);
  }, ts(t);
}
var fp = /%[sdj%]/g, dp = function() {
};
typeof process < "u" && process.env;
function ns(t) {
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
  var i = 0, a = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var o = t.replace(fp, function(l) {
      if (l === "%%")
        return "%";
      if (i >= a)
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
    return o;
  }
  return t;
}
function mp(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Ne(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || mp(e) && typeof t == "string" && !t);
}
function hp(t, e, n) {
  var r = [], i = 0, a = t.length;
  function o(l) {
    r.push.apply(r, l || []), i++, i === a && n(r);
  }
  t.forEach(function(l) {
    e(l, o);
  });
}
function Dc(t, e, n) {
  var r = 0, i = t.length;
  function a(o) {
    if (o && o.length) {
      n(o);
      return;
    }
    var l = r;
    r = r + 1, l < i ? e(t[l], a) : n([]);
  }
  a([]);
}
function vp(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Vc = /* @__PURE__ */ function(t) {
  lp(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ ts(Error));
function pp(t, e, n, r, i) {
  if (e.first) {
    var a = new Promise(function(m, b) {
      var p = function(y) {
        return r(y), y.length ? b(new Vc(y, ns(y))) : m(i);
      }, v = vp(t);
      Dc(v, n, p);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, b) {
    var p = function(g) {
      if (f.push.apply(f, g), u++, u === c)
        return r(f), f.length ? b(new Vc(f, ns(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(v) {
      var g = t[v];
      o.indexOf(v) !== -1 ? Dc(g, n, p) : hp(g, n, p);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function gp(t) {
  return !!(t && t.message !== void 0);
}
function yp(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function jc(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = yp(e, t.fullFields) : r = e[n.field || t.fullField], gp(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Bc(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = _n({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var bd = function(e, n, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || Ne(n, o || e.type)) && i.push(Xe(a.messages.required, e.fullField));
}, bp = function(e, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Xe(a.messages.whitespace, e.fullField));
}, Vi, Ep = function() {
  if (Vi)
    return Vi;
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), o = new RegExp("^" + n + "$"), l = new RegExp("^" + i + "$"), c = function(E) {
    return E && E.exact ? a : new RegExp("(?:" + e(E) + n + e(E) + ")|(?:" + e(E) + i + e(E) + ")", "g");
  };
  c.v4 = function(h) {
    return h && h.exact ? o : new RegExp("" + e(h) + n + e(h), "g");
  }, c.v6 = function(h) {
    return h && h.exact ? l : new RegExp("" + e(h) + i + e(h), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", v = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", y = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + p + v + ")" + g + y;
  return Vi = new RegExp("(?:^" + C + "$)", "i"), Vi;
}, Wc = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, jr = {
  integer: function(e) {
    return jr.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return jr.number(e) && !jr.integer(e);
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
    return typeof e == "object" && !jr.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Wc.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Ep());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Wc.hex);
  }
}, wp = function(e, n, r, i, a) {
  if (e.required && n === void 0) {
    bd(e, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  o.indexOf(l) > -1 ? jr[l](n) || i.push(Xe(a.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(Xe(a.messages.types[l], e.fullField, e.type));
}, Cp = function(e, n, r, i, a) {
  var o = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", p = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : p && (d = "array"), !d)
    return !1;
  p && (f = n.length), b && (f = n.replace(u, "_").length), o ? f !== e.len && i.push(Xe(a.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(Xe(a.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(Xe(a.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(Xe(a.messages[d].range, e.fullField, e.min, e.max));
}, Wn = "enum", xp = function(e, n, r, i, a) {
  e[Wn] = Array.isArray(e[Wn]) ? e[Wn] : [], e[Wn].indexOf(n) === -1 && i.push(Xe(a.messages[Wn], e.fullField, e[Wn].join(", ")));
}, kp = function(e, n, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(Xe(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(n) || i.push(Xe(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, ne = {
  required: bd,
  whitespace: bp,
  type: wp,
  range: Cp,
  enum: xp,
  pattern: kp
}, $p = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, o, a, "string"), Ne(n, "string") || (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a), ne.pattern(e, n, i, o, a), e.whitespace === !0 && ne.whitespace(e, n, i, o, a));
  }
  r(o);
}, _p = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, Op = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, Sp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, Fp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), Ne(n) || ne.type(e, n, i, o, a);
  }
  r(o);
}, Np = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, Pp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, Rp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    ne.required(e, n, i, o, a, "array"), n != null && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, Mp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, Ap = "enum", Tp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne[Ap](e, n, i, o, a);
  }
  r(o);
}, Ip = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, o, a), Ne(n, "string") || ne.pattern(e, n, i, o, a);
  }
  r(o);
}, Lp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n, "date") && !e.required)
      return r();
    if (ne.required(e, n, i, o, a), !Ne(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), ne.type(e, c, i, o, a), c && ne.range(e, c.getTime(), i, o, a);
    }
  }
  r(o);
}, Dp = function(e, n, r, i, a) {
  var o = [], l = Array.isArray(n) ? "array" : typeof n;
  ne.required(e, n, i, o, a, l), r(o);
}, vo = function(e, n, r, i, a) {
  var o = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Ne(n, o) && !e.required)
      return r();
    ne.required(e, n, i, l, a, o), Ne(n, o) || ne.type(e, n, i, l, a);
  }
  r(l);
}, Vp = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ne(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a);
  }
  r(o);
}, Ur = {
  string: $p,
  method: _p,
  number: Op,
  boolean: Sp,
  regexp: Fp,
  integer: Np,
  float: Pp,
  array: Rp,
  object: Mp,
  enum: Tp,
  pattern: Ip,
  date: Lp,
  url: vo,
  hex: vo,
  email: vo,
  required: Dp,
  any: Vp
};
function rs() {
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
var is = rs(), xi = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = is, this.define(n);
  }
  var e = t.prototype;
  return e.define = function(r) {
    var i = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(a) {
      var o = r[a];
      i.rules[a] = Array.isArray(o) ? o : [o];
    });
  }, e.messages = function(r) {
    return r && (this._messages = Bc(rs(), r)), this._messages;
  }, e.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var l = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, l), Promise.resolve(l);
    function f(v) {
      var g = [], y = {};
      function C(E) {
        if (Array.isArray(E)) {
          var w;
          g = (w = g).concat.apply(w, E);
        } else
          g.push(E);
      }
      for (var h = 0; h < v.length; h++)
        C(v[h]);
      g.length ? (y = ns(g), u(g, y)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === is && (d = rs()), Bc(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(v) {
      var g = o.rules[v], y = l[v];
      g.forEach(function(C) {
        var h = C;
        typeof h.transform == "function" && (l === r && (l = _n({}, l)), y = l[v] = h.transform(y)), typeof h == "function" ? h = {
          validator: h
        } : h = _n({}, h), h.validator = o.getValidationMethod(h), h.validator && (h.field = v, h.fullField = h.fullField || v, h.type = o.getType(h), m[v] = m[v] || [], m[v].push({
          rule: h,
          value: y,
          source: l,
          field: v
        }));
      });
    });
    var p = {};
    return pp(m, c, function(v, g) {
      var y = v.rule, C = (y.type === "object" || y.type === "array") && (typeof y.fields == "object" || typeof y.defaultField == "object");
      C = C && (y.required || !y.required && v.value), y.field = v.field;
      function h(x, k) {
        return _n({}, k, {
          fullField: y.fullField + "." + x,
          fullFields: y.fullFields ? [].concat(y.fullFields, [x]) : [x]
        });
      }
      function E(x) {
        x === void 0 && (x = []);
        var k = Array.isArray(x) ? x : [x];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && y.message !== void 0 && (k = [].concat(y.message));
        var N = k.map(jc(y, l));
        if (c.first && N.length)
          return p[y.field] = 1, g(N);
        if (!C)
          g(N);
        else {
          if (y.required && !v.value)
            return y.message !== void 0 ? N = [].concat(y.message).map(jc(y, l)) : c.error && (N = [c.error(y, Xe(c.messages.required, y.field))]), g(N);
          var F = {};
          y.defaultField && Object.keys(v.value).map(function(I) {
            F[I] = y.defaultField;
          }), F = _n({}, F, v.rule.fields);
          var _ = {};
          Object.keys(F).forEach(function(I) {
            var R = F[I], $ = Array.isArray(R) ? R : [R];
            _[I] = $.map(h.bind(null, I));
          });
          var D = new t(_);
          D.messages(c.messages), v.rule.options && (v.rule.options.messages = c.messages, v.rule.options.error = c.error), D.validate(v.value, v.rule.options || c, function(I) {
            var R = [];
            N && N.length && R.push.apply(R, N), I && I.length && R.push.apply(R, I), g(R.length ? R : null);
          });
        }
      }
      var w;
      if (y.asyncValidator)
        w = y.asyncValidator(y, v.value, E, v.source, c);
      else if (y.validator) {
        try {
          w = y.validator(y, v.value, E, v.source, c);
        } catch (x) {
          console.error == null || console.error(x), c.suppressValidatorError || setTimeout(function() {
            throw x;
          }, 0), E(x.message);
        }
        w === !0 ? E() : w === !1 ? E(typeof y.message == "function" ? y.message(y.fullField || y.field) : y.message || (y.fullField || y.field) + " fails") : w instanceof Array ? E(w) : w instanceof Error && E(w.message);
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
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Ur.hasOwnProperty(r.type))
      throw new Error(Xe("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? Ur.required : Ur[this.getType(r)] || void 0;
  }, t;
}();
xi.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Ur[e] = n;
};
xi.warning = dp;
xi.messages = is;
xi.validators = Ur;
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
function jp(t) {
  return Cd(t) || pd(t) || rl(t) || xd();
}
function kd(t, e, n, r) {
  if (!e.length)
    return n;
  var i = jp(e), a = i[0], o = i.slice(1), l;
  return !t && typeof a == "number" ? l = [] : Array.isArray(t) ? l = se(t) : l = oe({}, t), r && n === void 0 && o.length === 1 ? delete l[a][o[0]] : l[a] = kd(l[a], o, n, r), l;
}
function Bp(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !wd(t, e.slice(0, -1)) ? t : kd(t, e, n, r);
}
function Qa(t) {
  return Array.isArray(t) ? Zp(t) : Ue(t) === "object" && t !== null ? Wp(t) : t;
}
function Wp(t) {
  if (Object.getPrototypeOf(t) === Object.prototype) {
    var e = {};
    for (var n in t)
      e[n] = Qa(t[n]);
    return e;
  }
  return t;
}
function Zp(t) {
  return t.map(function(e) {
    return Qa(e);
  });
}
function ke(t) {
  return Jo(t);
}
function Jt(t, e) {
  var n = wd(t, e);
  return n;
}
function Gt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = Bp(t, e, n, r);
  return i;
}
function Zc(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = Jt(t, r);
    n = Gt(n, r, i);
  }), n;
}
function qr(t, e) {
  return t && t.some(function(n) {
    return _d(n, e);
  });
}
function Hc(t) {
  return Ue(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function $d(t, e) {
  var n = Array.isArray(t) ? se(t) : oe({}, t);
  return e && Object.keys(e).forEach(function(r) {
    var i = n[r], a = e[r], o = Hc(i) && Hc(a);
    n[r] = o ? $d(i, a || {}) : Qa(a);
  }), n;
}
function Qi(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return $d(i, a);
  }, t);
}
function _d(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function Hp(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || Ue(t) !== "object" || Ue(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return se(i).every(function(a) {
    var o = t[a], l = e[a];
    return typeof o == "function" && typeof l == "function" ? !0 : o === l;
  });
}
function zp(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && Ue(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function zc(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], a = e - n;
  return a > 0 ? [].concat(se(t.slice(0, n)), [i], se(t.slice(n, e)), se(t.slice(e + 1, r))) : a < 0 ? [].concat(se(t.slice(0, e)), se(t.slice(e + 1, n + 1)), [i], se(t.slice(n + 1, r))) : t;
}
var Up = xi;
function qp(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var Uc = "CODE_LOGIC_ERROR";
function as(t, e, n, r, i) {
  return os.apply(this, arguments);
}
function os() {
  return os = Xa(/* @__PURE__ */ Dt().mark(function t(e, n, r, i, a) {
    var o, l, c, u, f, d, m, b, p;
    return Dt().wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return o = oe({}, r), delete o.ruleIndex, o.validator && (l = o.validator, o.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (y) {
                return console.error(y), Promise.reject(Uc);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new Up(Ve({}, e, [o])), f = Qi({}, Ed, i.validateMessages), u.messages(f), d = [], g.prev = 9, g.next = 12, Promise.resolve(u.validate(Ve({}, e, n), oe({}, i)));
          case 12:
            g.next = 17;
            break;
          case 14:
            g.prev = 14, g.t0 = g.catch(9), g.t0.errors && (d = g.t0.errors.map(function(y, C) {
              var h = y.message, E = h === Uc ? f.default : h;
              return /* @__PURE__ */ L.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                L.cloneElement(E, {
                  key: "error_".concat(C)
                })
              ) : E;
            }));
          case 17:
            if (!(!d.length && c)) {
              g.next = 22;
              break;
            }
            return g.next = 20, Promise.all(n.map(function(y, C) {
              return as("".concat(e, ".").concat(C), y, c, i, a);
            }));
          case 20:
            return m = g.sent, g.abrupt("return", m.reduce(function(y, C) {
              return [].concat(se(y), se(C));
            }, []));
          case 22:
            return b = oe(oe({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, a), p = d.map(function(y) {
              return typeof y == "string" ? qp(y, b) : y;
            }), g.abrupt("return", p);
          case 25:
          case "end":
            return g.stop();
        }
    }, t, null, [[9, 14]]);
  })), os.apply(this, arguments);
}
function Kp(t, e, n, r, i, a) {
  var o = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, b = oe(oe({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(p, v, g) {
      var y = !1, C = function() {
        for (var w = arguments.length, x = new Array(w), k = 0; k < w; k++)
          x[k] = arguments[k];
        Promise.resolve().then(function() {
          ht(!y, "Your validator function has already return a promise. `callback` will be ignored."), y || g.apply(void 0, x);
        });
      }, h = m(p, v, C);
      y = h && typeof h.then == "function" && typeof h.catch == "function", ht(y, "`callback` is deprecated. Please return a promise instead."), y && h.then(function() {
        g();
      }).catch(function(E) {
        g(E || " ");
      });
    }), b;
  }).sort(function(f, d) {
    var m = f.warningOnly, b = f.ruleIndex, p = d.warningOnly, v = d.ruleIndex;
    return !!m == !!p ? b - v : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = Xa(/* @__PURE__ */ Dt().mark(function d(m, b) {
        var p, v, g;
        return Dt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                p = 0;
              case 1:
                if (!(p < l.length)) {
                  C.next = 12;
                  break;
                }
                return v = l[p], C.next = 5, as(o, e, v, r, a);
              case 5:
                if (g = C.sent, !g.length) {
                  C.next = 9;
                  break;
                }
                return b([{
                  errors: g,
                  rule: v
                }]), C.abrupt("return");
              case 9:
                p += 1, C.next = 1;
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
      return as(o, e, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? Gp(u) : Yp(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function Yp(t) {
  return ss.apply(this, arguments);
}
function ss() {
  return ss = Xa(/* @__PURE__ */ Dt().mark(function t(e) {
    return Dt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var a, o = (a = []).concat.apply(a, se(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), ss.apply(this, arguments);
}
function Gp(t) {
  return ls.apply(this, arguments);
}
function ls() {
  return ls = Xa(/* @__PURE__ */ Dt().mark(function t(e) {
    var n;
    return Dt().wrap(function(i) {
      for (; ; )
        switch (i.prev = i.next) {
          case 0:
            return n = 0, i.abrupt("return", new Promise(function(a) {
              e.forEach(function(o) {
                o.then(function(l) {
                  l.errors.length && a([l]), n += 1, n === e.length && a([]);
                });
              });
            }));
          case 2:
          case "end":
            return i.stop();
        }
    }, t);
  })), ls.apply(this, arguments);
}
var Xp = ["name"], et = [];
function qc(t, e, n, r, i, a) {
  return typeof t == "function" ? t(e, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var il = /* @__PURE__ */ function(t) {
  Jv(n, t);
  var e = np(n);
  function n(r) {
    var i;
    if (wi(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = et, i.warnings = et, i.cancelRegister = function() {
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
      u == null || u(oe(oe({}, i.getMeta()), {}, {
        destroy: c
      }));
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, p = b === void 0 ? [] : b, v = d.onReset, g = f.store, y = i.getNamePath(), C = i.getValue(c), h = i.getValue(g), E = u && qr(u, y);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== h && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = et, i.warnings = et, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = et, i.warnings = et, i.triggerMetaEvent(), v == null || v(), i.refresh();
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
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || et), "warnings" in w && (i.warnings = w.warnings || et), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !y.length && qc(m, c, g, C, h, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = p.map(ke);
          if (x.some(function(k) {
            return qr(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!p.length || y.length || m) && qc(m, c, g, C, h, f)) {
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
        var m = i.props, b = m.validateFirst, p = b === void 0 ? !1 : b, v = m.messageVariables, g = c || {}, y = g.triggerName, C = i.getRules();
        y && (C = C.filter(function(E) {
          return E;
        }).filter(function(E) {
          var w = E.validateTrigger;
          if (!w)
            return !0;
          var x = Jo(w);
          return x.includes(y);
        }));
        var h = Kp(u, f, C, c, p, v);
        return h.catch(function(E) {
          return E;
        }).then(function() {
          var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : et;
          if (i.validatePromise === d) {
            var w;
            i.validatePromise = null;
            var x = [], k = [];
            (w = E.forEach) === null || w === void 0 || w.call(E, function(N) {
              var F = N.rule.warningOnly, _ = N.errors, D = _ === void 0 ? et : _;
              F ? k.push.apply(k, se(D)) : x.push.apply(x, se(D));
            }), i.errors = x, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), h;
      });
      return i.validatePromise = d, i.dirty = !0, i.errors = et, i.warnings = et, i.triggerMetaEvent(), i.reRender(), d;
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
        return oe(oe({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = Xo(c);
      return f.length !== 1 || !/* @__PURE__ */ L.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return Jt(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, p = u.valuePropName, v = u.getValueProps, g = u.fieldContext, y = d !== void 0 ? d : g.validateTrigger, C = i.getNamePath(), h = g.getInternalHooks, E = g.getFieldsValue, w = h($n), x = w.dispatch, k = i.getValue(), N = v || function(I) {
        return Ve({}, p, I);
      }, F = c[f], _ = oe(oe({}, c), N(k));
      _[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, R = arguments.length, $ = new Array(R), M = 0; M < R; M++)
          $[M] = arguments[M];
        m ? I = m.apply(void 0, $) : I = zp.apply(void 0, [p].concat($)), b && (I = b(I, k, E(!0))), x({
          type: "updateValue",
          namePath: C,
          value: I
        }), F && F.apply(void 0, $);
      };
      var D = Jo(y || []);
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
      var a = r.fieldContext.getInternalHooks, o = a($n), l = o.initEntityValue;
      l(gd(i));
    }
    return i;
  }
  return Ci(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var l = o.getInternalHooks, c = l($n), u = c.registerField;
        this.cancelRegisterFunc = u(this);
      }
      a === !0 && this.reRender();
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
      var i = this.state.resetCount, a = this.props.children, o = this.getOnlyChild(a), l = o.child, c = o.isFunction, u;
      return c ? u = l : /* @__PURE__ */ L.isValidElement(l) ? u = /* @__PURE__ */ L.cloneElement(l, this.getControlled(l.props)) : (ht(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
il.contextType = Rn;
il.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function al(t) {
  var e = t.name, n = nl(t, Xp), r = L.useContext(Rn), i = e !== void 0 ? ke(e) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(il, va({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var Qp = /* @__PURE__ */ L.createContext(null), Od = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, a = e.rules, o = e.validateTrigger, l = L.useContext(Rn), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = L.useMemo(function() {
    var p = ke(l.prefixName) || [];
    return [].concat(se(p), se(ke(n)));
  }, [l.prefixName, n]), d = L.useMemo(function() {
    return oe(oe({}, l), {}, {
      prefixName: f
    });
  }, [l, f]), m = L.useMemo(function() {
    return {
      getKey: function(v) {
        var g = f.length, y = v[g];
        return [u.keys[y], v.slice(g + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return ht(!1, "Form.List only accepts function as children."), null;
  var b = function(v, g, y) {
    var C = y.source;
    return C === "internal" ? !1 : v !== g;
  };
  return /* @__PURE__ */ L.createElement(Qp.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: d
  }, /* @__PURE__ */ L.createElement(al, {
    name: [],
    shouldUpdate: b,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(p, v) {
    var g = p.value, y = g === void 0 ? [] : g, C = p.onChange, h = l.getFieldValue, E = function() {
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
          N < 0 || N >= _.length || F < 0 || F >= _.length || (u.keys = zc(u.keys, N, F), C(zc(_, N, F)));
        }
      }
    }, x = y || [];
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
function Jp(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var r, i, a, o, l = [], c = !0, u = !1;
    try {
      if (a = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n)
          return;
        c = !1;
      } else
        for (; !(c = (r = a.call(n)).done) && (l.push(r.value), l.length !== e); c = !0)
          ;
    } catch (f) {
      u = !0, i = f;
    } finally {
      try {
        if (!c && n.return != null && (o = n.return(), Object(o) !== o))
          return;
      } finally {
        if (u)
          throw i;
      }
    }
    return l;
  }
}
function rn(t, e) {
  return Cd(t) || Jp(t, e) || rl(t, e) || xd();
}
function eg(t) {
  var e = !1, n = t.length, r = [];
  return t.length ? new Promise(function(i, a) {
    t.forEach(function(o, l) {
      o.catch(function(c) {
        return e = !0, c;
      }).then(function(c) {
        n -= 1, r[l] = c, !(n > 0) && (e && a(r), i(r));
      });
    });
  }) : Promise.resolve([]);
}
var Sd = "__@field_split__";
function po(t) {
  return t.map(function(e) {
    return "".concat(Ue(e), ":").concat(e);
  }).join(Sd);
}
var Zn = /* @__PURE__ */ function() {
  function t() {
    wi(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return Ci(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(po(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(po(n));
    }
  }, {
    key: "update",
    value: function(n, r) {
      var i = this.get(n), a = r(i);
      a ? this.set(n, a) : this.delete(n);
    }
  }, {
    key: "delete",
    value: function(n) {
      this.kvs.delete(po(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return se(this.kvs.entries()).map(function(r) {
        var i = rn(r, 2), a = i[0], o = i[1], l = a.split(Sd);
        return n({
          key: l.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = rn(u, 3), d = f[1], m = f[2];
            return d === "number" ? Number(m) : m;
          }),
          value: o
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var n = {};
      return this.map(function(r) {
        var i = r.key, a = r.value;
        return n[i.join(".")] = a, null;
      }), n;
    }
  }]), t;
}(), tg = ["name", "errors"], ng = /* @__PURE__ */ Ci(function t(e) {
  var n = this;
  wi(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    }) : (ht(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(r) {
    n.subscribable = r;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(r, i) {
    if (n.initialValues = r || {}, i) {
      var a, o = Qi({}, r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(l) {
        var c = l.key;
        o = Gt(o, c, Jt(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new Zn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = Jt(n.initialValues, r);
    return r.length ? Qa(i) : i;
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
      n.watchList.forEach(function(a) {
        a(i, r);
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Zn();
    return n.getFieldEntities(r).forEach(function(a) {
      var o = a.getNamePath();
      i.set(o, a);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(a) {
      var o = ke(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: ke(a)
      };
    });
  }, this.getFieldsValue = function(r, i) {
    if (n.warningUnhooked(), r === !0 && !i)
      return n.store;
    var a = n.getFieldEntitiesForNamePathList(Array.isArray(r) ? r : null), o = [];
    return a.forEach(function(l) {
      var c, u = "INVALIDATE_NAME_PATH" in l ? l.INVALIDATE_NAME_PATH : l.getNamePath();
      if (!(!r && (!((c = l.isListField) === null || c === void 0) && c.call(l))))
        if (!i)
          o.push(u);
        else {
          var f = "getMeta" in l ? l.getMeta() : null;
          i(f) && o.push(u);
        }
    }), Zc(n.store, o.map(ke));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = ke(r);
    return Jt(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: ke(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = ke(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = ke(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], l = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(ke), u = !1) : (c = null, u = o) : (c = o.map(ke), u = l);
    var f = n.getFieldEntities(!0), d = function(g) {
      return g.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Zn();
    c.forEach(function(v) {
      m.set(v, []);
    }), f.forEach(function(v) {
      var g = v.getNamePath();
      c.forEach(function(y) {
        y.every(function(C, h) {
          return g[h] === C;
        }) && m.update(y, function(C) {
          return [].concat(se(C), [v]);
        });
      });
    });
    var b = function(g) {
      return g.some(d);
    }, p = m.map(function(v) {
      var g = v.value;
      return g;
    });
    return u ? p.every(b) : p.some(b);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(o) {
        return o.isFieldValidating();
      });
    var a = r.map(ke);
    return i.some(function(o) {
      var l = o.getNamePath();
      return qr(a, l) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Zn(), a = n.getFieldEntities(!0);
    a.forEach(function(c) {
      var u = c.props.initialValue, f = c.getNamePath();
      if (u !== void 0) {
        var d = i.get(f) || /* @__PURE__ */ new Set();
        d.add({
          entity: c,
          value: u
        }), i.set(f, d);
      }
    });
    var o = function(u) {
      u.forEach(function(f) {
        var d = f.props.initialValue;
        if (d !== void 0) {
          var m = f.getNamePath(), b = n.getInitialValue(m);
          if (b !== void 0)
            ht(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var p = i.get(m);
            if (p && p.size > 1)
              ht(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (p) {
              var v = n.getFieldValue(m);
              (!r.skipExist || v === void 0) && n.updateStore(Gt(n.store, m, se(p)[0].value));
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
    })) : l = a, o(l);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(Qi({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(ke);
    a.forEach(function(o) {
      var l = n.getInitialValue(o);
      n.updateStore(Gt(n.store, o, l));
    }), n.resetWithFieldInitialValue({
      namePathList: a
    }), n.notifyObservers(i, a, {
      type: "reset"
    }), n.notifyWatch(a);
  }, this.setFields = function(r) {
    n.warningUnhooked();
    var i = n.store, a = [];
    r.forEach(function(o) {
      var l = o.name;
      o.errors;
      var c = nl(o, tg), u = ke(l);
      a.push(u), "value" in c && n.updateStore(Gt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), l = a.getMeta(), c = oe(oe({}, l), {}, {
        name: o,
        value: n.getFieldValue(o)
      });
      return Object.defineProperty(c, "originRCField", {
        value: !0
      }), c;
    });
    return i;
  }, this.initEntityValue = function(r) {
    var i = r.props.initialValue;
    if (i !== void 0) {
      var a = r.getNamePath(), o = Jt(n.store, a);
      o === void 0 && n.updateStore(Gt(n.store, a, i));
    }
  }, this.isMergedPreserve = function(r) {
    var i = r !== void 0 ? r : n.preserve;
    return i ?? !0;
  }, this.registerField = function(r) {
    n.fieldEntities.push(r);
    var i = r.getNamePath();
    if (n.notifyWatch([i]), r.props.initialValue !== void 0) {
      var a = n.store;
      n.resetWithFieldInitialValue({
        entities: [r],
        skipExist: !0
      }), n.notifyObservers(a, [r.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, l) {
      var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (n.fieldEntities = n.fieldEntities.filter(function(d) {
        return d !== r;
      }), !n.isMergedPreserve(l) && (!o || c.length > 1)) {
        var u = o ? void 0 : n.getInitialValue(i);
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
        var i = r.namePath, a = r.value;
        n.updateValue(i, a);
        break;
      }
      case "validateField": {
        var o = r.namePath, l = r.triggerName;
        n.validateFields([o], {
          triggerName: l
        });
        break;
      }
    }
  }, this.notifyObservers = function(r, i, a) {
    if (n.subscribable) {
      var o = oe(oe({}, a), {}, {
        store: n.getFieldsValue(!0)
      });
      n.getFieldEntities().forEach(function(l) {
        var c = l.onStoreChange;
        c(r, i, o);
      });
    } else
      n.forceRootUpdate();
  }, this.triggerDependenciesUpdate = function(r, i) {
    var a = n.getDependencyChildrenFields(i);
    return a.length && n.validateFields(a), n.notifyObservers(r, a, {
      type: "dependenciesUpdate",
      relatedFields: [i].concat(se(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = ke(r), o = n.store;
    n.updateStore(Gt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var l = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Zc(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(se(l)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = Qi(n.store, r);
      n.updateStore(a);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new Zn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = ke(f);
        o.update(d, function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return m.add(c), m;
        });
      });
    });
    var l = function c(u) {
      var f = o.get(u) || /* @__PURE__ */ new Set();
      f.forEach(function(d) {
        if (!i.has(d)) {
          i.add(d);
          var m = d.getNamePath();
          d.isFieldDirty() && m.length && (a.push(m), c(m));
        }
      });
    };
    return l(r), a;
  }, this.triggerOnFieldsChange = function(r, i) {
    var a = n.callbacks.onFieldsChange;
    if (a) {
      var o = n.getFields();
      if (i) {
        var l = new Zn();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          l.set(f, d);
        }), o.forEach(function(u) {
          u.errors = l.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var f = u.name;
        return qr(r, f);
      });
      a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a = !!r, o = a ? r.map(ke) : [], l = [];
    n.getFieldEntities(!0).forEach(function(f) {
      if (a || o.push(f.getNamePath()), i != null && i.recursive && a) {
        var d = f.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        d.every(function(p, v) {
          return r[v] === p || r[v] === void 0;
        }) && o.push(d);
      }
      if (!(!f.props.rules || !f.props.rules.length)) {
        var m = f.getNamePath();
        if (!a || qr(o, m)) {
          var b = f.validateRules(oe({
            validateMessages: oe(oe({}, Ed), n.validateMessages)
          }, i));
          l.push(b.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(p) {
            var v, g = [], y = [];
            return (v = p.forEach) === null || v === void 0 || v.call(p, function(C) {
              var h = C.rule.warningOnly, E = C.errors;
              h ? y.push.apply(y, se(E)) : g.push.apply(g, se(E));
            }), g.length ? Promise.reject({
              name: m,
              errors: g,
              warnings: y
            }) : {
              name: m,
              errors: g,
              warnings: y
            };
          }));
        }
      }
    });
    var c = eg(l);
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
      return n.lastValidatePromise === c ? Promise.resolve(n.getFieldsValue(o)) : Promise.reject([]);
    }).catch(function(f) {
      var d = f.filter(function(m) {
        return m && m.errors.length;
      });
      return Promise.reject({
        values: n.getFieldsValue(o),
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
        } catch (a) {
          console.error(a);
        }
    }).catch(function(r) {
      var i = n.callbacks.onFinishFailed;
      i && i(r);
    });
  }, this.forceRootUpdate = e;
});
function ol(t) {
  var e = L.useRef(), n = L.useState({}), r = rn(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var a = function() {
        i({});
      }, o = new ng(a);
      e.current = o.getForm();
    }
  return [e.current];
}
var cs = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), rg = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, a = e.children, o = L.useContext(cs), l = L.useRef({});
  return /* @__PURE__ */ L.createElement(cs.Provider, {
    value: oe(oe({}, o), {}, {
      validateMessages: oe(oe({}, o.validateMessages), n),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(u, f) {
        r && r(u, {
          changedFields: f,
          forms: l.current
        }), o.triggerFormChange(u, f);
      },
      triggerFormFinish: function(u, f) {
        i && i(u, {
          values: f,
          forms: l.current
        }), o.triggerFormFinish(u, f);
      },
      registerForm: function(u, f) {
        u && (l.current = oe(oe({}, l.current), {}, Ve({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = oe({}, l.current);
        delete f[u], l.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, ig = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], ag = function(e, n) {
  var r = e.name, i = e.initialValues, a = e.fields, o = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, p = e.onValuesChange, v = e.onFieldsChange, g = e.onFinish, y = e.onFinishFailed, C = nl(e, ig), h = L.useContext(cs), E = ol(o), w = rn(E, 1), x = w[0], k = x.getInternalHooks($n), N = k.useSubscribe, F = k.setInitialValues, _ = k.setCallbacks, D = k.setValidateMessages, I = k.setPreserve, R = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return x;
  }), L.useEffect(function() {
    return h.registerForm(r, x), function() {
      h.unregisterForm(r);
    };
  }, [h, x, r]), D(oe(oe({}, h.validateMessages), d)), _({
    onValuesChange: p,
    onFieldsChange: function(Z) {
      if (h.triggerFormChange(r, Z), v) {
        for (var q = arguments.length, Y = new Array(q > 1 ? q - 1 : 0), G = 1; G < q; G++)
          Y[G - 1] = arguments[G];
        v.apply(void 0, [Z].concat(Y));
      }
    },
    onFinish: function(Z) {
      h.triggerFormFinish(r, Z), g && g(Z);
    },
    onFinishFailed: y
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
    Hp(A.current || [], a || []) || x.setFields(a || []), A.current = a;
  }, [a, x]);
  var P = L.useMemo(function() {
    return oe(oe({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), T = /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: P
  }, M);
  return f === !1 ? T : /* @__PURE__ */ L.createElement(f, va({}, C, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), x.submit();
    },
    onReset: function(Z) {
      var q;
      Z.preventDefault(), x.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, Z);
    }
  }), T);
};
function Kc(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function sl() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, a = e[1], o = K(), l = rn(o, 2), c = l[0], u = l[1], f = ie(function() {
    return Kc(c);
  }, [c]), d = V(f);
  d.current = f;
  var m = at(Rn), b = a || m, p = b && b._init, v = ke(i), g = V(v);
  return g.current = v, X(
    function() {
      if (p) {
        var y = b.getFieldsValue, C = b.getInternalHooks, h = C($n), E = h.registerWatch, w = E(function(k) {
          var N = Jt(k, g.current), F = Kc(N);
          d.current !== F && (d.current = F, u(N));
        }), x = Jt(y(), g.current);
        return u(x), w;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p]
  ), c;
}
var og = /* @__PURE__ */ L.forwardRef(ag), wr = og;
wr.FormProvider = rg;
wr.Field = al;
wr.List = Od;
wr.useForm = ol;
wr.useWatch = sl;
const Fd = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, ll = s.createContext(Fd), Yc = s.createContext(null), Nd = () => null;
var sg = function(e) {
  return lg(e) && !cg(e);
};
function lg(t) {
  return !!t && typeof t == "object";
}
function cg(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || dg(t);
}
var ug = typeof Symbol == "function" && Symbol.for, fg = ug ? Symbol.for("react.element") : 60103;
function dg(t) {
  return t.$$typeof === fg;
}
function mg(t) {
  return Array.isArray(t) ? [] : {};
}
function oi(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? or(mg(t), t, e) : t;
}
function hg(t, e, n) {
  return t.concat(e).map(function(r) {
    return oi(r, n);
  });
}
function vg(t, e) {
  if (!e.customMerge)
    return or;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : or;
}
function pg(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Gc(t) {
  return Object.keys(t).concat(pg(t));
}
function Pd(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function gg(t, e) {
  return Pd(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function yg(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && Gc(t).forEach(function(i) {
    r[i] = oi(t[i], n);
  }), Gc(e).forEach(function(i) {
    gg(t, i) || (Pd(t, i) && n.isMergeableObject(e[i]) ? r[i] = vg(i, n)(t[i], e[i], n) : r[i] = oi(e[i], n));
  }), r;
}
function or(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || hg, n.isMergeableObject = n.isMergeableObject || sg, n.cloneUnlessOtherwiseSpecified = oi;
  var r = Array.isArray(e), i = Array.isArray(t), a = r === i;
  return a ? r ? n.arrayMerge(t, e, n) : yg(t, e, n) : oi(e, n);
}
or.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return or(r, i, n);
  }, {});
};
var bg = or, Eg = bg;
const wg = /* @__PURE__ */ _t(Eg), Rd = (t) => s.createElement(Od, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((a) => ({
    index: a.name,
    key: a.key
  })), i = t.children(r, n).map((a, o) => {
    var l;
    return s.createElement(Ct, {
      key: r[o].key,
      mode: "card",
      header: (l = t.renderHeader) === null || l === void 0 ? void 0 : l.call(t, r[o], n)
    }, a);
  });
  return t.renderAdd && i.push(s.createElement(Ct, {
    key: "add",
    mode: "card"
  }, s.createElement(Ct.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), s.createElement(s.Fragment, null, i);
}), Xc = "adm-form", Cg = Fd, xg = me((t, e) => {
  const n = U(Cg, t), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: l,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = fr(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: b
  } = ye(), p = ie(() => wg(b.Form.defaultValidateMessages, m.validateMessages || {}), [b.Form.defaultValidateMessages, m.validateMessages]), v = [];
  let g = null, y = [], C = 0;
  function h() {
    y.length !== 0 && (C += 1, v.push(s.createElement(Ct, {
      header: g,
      key: C,
      mode: u
    }, y)), y = []);
  }
  return cn(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === Nd) {
        h(), g = E.props.children;
        return;
      }
      if (E.type === Rd) {
        h(), v.push(E);
        return;
      }
    }
    y.push(E);
  }), h(), s.createElement(wr, Object.assign({
    className: j(Xc, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: p
  }), s.createElement(ll.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, v), c && s.createElement("div", {
    className: `${Xc}-footer`
  }, c));
});
var si = {}, Md = { exports: {} }, Ad = { exports: {} };
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
})(Ad);
var kg = Ad.exports;
(function(t) {
  var e = kg.default;
  function n(i) {
    if (typeof WeakMap != "function")
      return null;
    var a = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
    return (n = function(c) {
      return c ? o : a;
    })(i);
  }
  function r(i, a) {
    if (!a && i && i.__esModule)
      return i;
    if (i === null || e(i) !== "object" && typeof i != "function")
      return {
        default: i
      };
    var o = n(a);
    if (o && o.has(i))
      return o.get(i);
    var l = {}, c = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in i)
      if (u !== "default" && Object.prototype.hasOwnProperty.call(i, u)) {
        var f = c ? Object.getOwnPropertyDescriptor(i, u) : null;
        f && (f.get || f.set) ? Object.defineProperty(l, u, f) : l[u] = i[u];
      }
    return l.default = i, o && o.set(i, l), l;
  }
  t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Md);
var $g = Md.exports, Td = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Td);
var _g = Td.exports, ct = {};
Object.defineProperty(ct, "__esModule", {
  value: !0
});
ct.call = cl;
ct.default = void 0;
ct.note = Ld;
ct.noteOnce = Vd;
ct.preMessage = void 0;
ct.resetWarned = Dd;
ct.warning = Id;
ct.warningOnce = ki;
var us = {}, Og = ct.preMessage = function(e) {
};
function Id(t, e) {
}
function Ld(t, e) {
}
function Dd() {
  us = {};
}
function cl(t, e, n) {
  !e && !us[n] && (t(!1, n), us[n] = !0);
}
function ki(t, e) {
  cl(Id, t, e);
}
function Vd(t, e) {
  cl(Ld, t, e);
}
ki.preMessage = Og;
ki.resetWarned = Dd;
ki.noteOnce = Vd;
ct.default = ki;
var Sg = $g.default, Fg = _g.default;
Object.defineProperty(si, "__esModule", {
  value: !0
});
var jd = si.default = si.HOOK_MARK = void 0, Ng = Fg(ct), Pg = Sg(s), Rg = "RC_FORM_INTERNAL_HOOKS";
si.HOOK_MARK = Rg;
var de = function() {
  (0, Ng.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Mg = /* @__PURE__ */ Pg.createContext({
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
}), Ag = Mg;
jd = si.default = Ag;
function go(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function Tg(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function Ig(t) {
  return typeof t == "function" && !Tg(t) && t.defaultProps === void 0;
}
function Bd(t) {
  return ha.isFragment(t) ? !1 : ha.isMemo(t) ? Bd(t.type) : !Ig(t.type);
}
const Lg = je((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), Dg = ["top", "right", "bottom", "left"], sr = Math.min, On = Math.max, ga = Math.round, ji = Math.floor, an = (t) => ({
  x: t,
  y: t
}), Vg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, jg = {
  start: "end",
  end: "start"
};
function fs(t, e, n) {
  return On(t, sr(e, n));
}
function on(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function sn(t) {
  return t.split("-")[0];
}
function $i(t) {
  return t.split("-")[1];
}
function ul(t) {
  return t === "x" ? "y" : "x";
}
function fl(t) {
  return t === "y" ? "height" : "width";
}
function _i(t) {
  return ["top", "bottom"].includes(sn(t)) ? "y" : "x";
}
function dl(t) {
  return ul(_i(t));
}
function Bg(t, e, n) {
  n === void 0 && (n = !1);
  const r = $i(t), i = dl(t), a = fl(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (o = ya(o)), [o, ya(o)];
}
function Wg(t) {
  const e = ya(t);
  return [ds(t), e, ds(e)];
}
function ds(t) {
  return t.replace(/start|end/g, (e) => jg[e]);
}
function Zg(t, e, n) {
  const r = ["left", "right"], i = ["right", "left"], a = ["top", "bottom"], o = ["bottom", "top"];
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? i : r : e ? r : i;
    case "left":
    case "right":
      return e ? a : o;
    default:
      return [];
  }
}
function Hg(t, e, n, r) {
  const i = $i(t);
  let a = Zg(sn(t), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), e && (a = a.concat(a.map(ds)))), a;
}
function ya(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Vg[e]);
}
function zg(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Wd(t) {
  return typeof t != "number" ? zg(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ba(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function Qc(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const a = _i(e), o = dl(e), l = fl(o), c = sn(e), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
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
  switch ($i(e)) {
    case "start":
      b[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      b[o] += m * (n && u ? -1 : 1);
      break;
  }
  return b;
}
const Ug = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: o
  } = n, l = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let u = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: f,
    y: d
  } = Qc(u, r, c), m = r, b = {}, p = 0;
  for (let v = 0; v < l.length; v++) {
    const {
      name: g,
      fn: y
    } = l[v], {
      x: C,
      y: h,
      data: E,
      reset: w
    } = await y({
      x: f,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: i,
      middlewareData: b,
      rects: u,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (f = C ?? f, d = h ?? d, b = {
      ...b,
      [g]: {
        ...b[g],
        ...E
      }
    }, w && p <= 50) {
      p++, typeof w == "object" && (w.placement && (m = w.placement), w.rects && (u = w.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : w.rects), {
        x: f,
        y: d
      } = Qc(u, m, c)), v = -1;
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
async function Ea(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: a,
    rects: o,
    elements: l,
    strategy: c
  } = t, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: b = 0
  } = on(e, t), p = Wd(b), g = l[m ? d === "floating" ? "reference" : "floating" : d], y = ba(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), C = d === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, h = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l.floating)), E = await (a.isElement == null ? void 0 : a.isElement(h)) ? await (a.getScale == null ? void 0 : a.getScale(h)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = ba(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: h,
    strategy: c
  }) : C);
  return {
    top: (y.top - w.top + p.top) / E.y,
    bottom: (w.bottom - y.bottom + p.bottom) / E.y,
    left: (y.left - w.left + p.left) / E.x,
    right: (w.right - y.right + p.right) / E.x
  };
}
const qg = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: a,
      platform: o,
      elements: l,
      middlewareData: c
    } = e, {
      element: u,
      padding: f = 0
    } = on(t, e) || {};
    if (u == null)
      return {};
    const d = Wd(f), m = {
      x: n,
      y: r
    }, b = dl(i), p = fl(b), v = await o.getDimensions(u), g = b === "y", y = g ? "top" : "left", C = g ? "bottom" : "right", h = g ? "clientHeight" : "clientWidth", E = a.reference[p] + a.reference[b] - m[b] - a.floating[p], w = m[b] - a.reference[b], x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let k = x ? x[h] : 0;
    (!k || !await (o.isElement == null ? void 0 : o.isElement(x))) && (k = l.floating[h] || a.floating[p]);
    const N = E / 2 - w / 2, F = k / 2 - v[p] / 2 - 1, _ = sr(d[y], F), D = sr(d[C], F), I = _, R = k - v[p] - D, $ = k / 2 - v[p] / 2 + N, M = fs(I, $, R), S = !c.arrow && $i(i) != null && $ != M && a.reference[p] / 2 - ($ < I ? _ : D) - v[p] / 2 < 0, O = S ? $ < I ? $ - I : $ - R : 0;
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
}), Kg = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        middlewareData: a,
        rects: o,
        initialPlacement: l,
        platform: c,
        elements: u
      } = e, {
        mainAxis: f = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: b = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: v = !0,
        ...g
      } = on(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = sn(i), C = sn(l) === l, h = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (C || !v ? [ya(l)] : Wg(l));
      !m && p !== "none" && E.push(...Hg(l, v, p, h));
      const w = [l, ...E], x = await Ea(e, g), k = [];
      let N = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(x[y]), d) {
        const I = Bg(i, o, h);
        k.push(x[I[0]], x[I[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: k
      }], !k.every((I) => I <= 0)) {
        var F, _;
        const I = (((F = a.flip) == null ? void 0 : F.index) || 0) + 1, R = w[I];
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
function Jc(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function eu(t) {
  return Dg.some((e) => t[e] >= 0);
}
const Yg = function(t) {
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
          const a = await Ea(e, {
            ...i,
            elementContext: "reference"
          }), o = Jc(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: eu(o)
            }
          };
        }
        case "escaped": {
          const a = await Ea(e, {
            ...i,
            altBoundary: !0
          }), o = Jc(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: eu(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Gg(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = sn(n), l = $i(n), c = _i(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = on(e, t);
  let {
    mainAxis: m,
    crossAxis: b,
    alignmentAxis: p
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
  return l && typeof p == "number" && (b = l === "end" ? p * -1 : p), c ? {
    x: b * f,
    y: m * u
  } : {
    x: m * u,
    y: b * f
  };
}
const Xg = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await Gg(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, Qg = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r,
        placement: i
      } = e, {
        mainAxis: a = !0,
        crossAxis: o = !1,
        limiter: l = {
          fn: (g) => {
            let {
              x: y,
              y: C
            } = g;
            return {
              x: y,
              y: C
            };
          }
        },
        ...c
      } = on(t, e), u = {
        x: n,
        y: r
      }, f = await Ea(e, c), d = _i(sn(i)), m = ul(d);
      let b = u[m], p = u[d];
      if (a) {
        const g = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", C = b + f[g], h = b - f[y];
        b = fs(C, b, h);
      }
      if (o) {
        const g = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", C = p + f[g], h = p - f[y];
        p = fs(C, p, h);
      }
      const v = l.fn({
        ...e,
        [m]: b,
        [d]: p
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
}, Jg = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: n,
        y: r,
        placement: i,
        rects: a,
        middlewareData: o
      } = e, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = on(t, e), f = {
        x: n,
        y: r
      }, d = _i(i), m = ul(d);
      let b = f[m], p = f[d];
      const v = on(l, e), g = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (c) {
        const h = m === "y" ? "height" : "width", E = a.reference[m] - a.floating[h] + g.mainAxis, w = a.reference[m] + a.reference[h] - g.mainAxis;
        b < E ? b = E : b > w && (b = w);
      }
      if (u) {
        var y, C;
        const h = m === "y" ? "width" : "height", E = ["top", "left"].includes(sn(i)), w = a.reference[d] - a.floating[h] + (E && ((y = o.offset) == null ? void 0 : y[d]) || 0) + (E ? 0 : g.crossAxis), x = a.reference[d] + a.reference[h] + (E ? 0 : ((C = o.offset) == null ? void 0 : C[d]) || 0) - (E ? g.crossAxis : 0);
        p < w ? p = w : p > x && (p = x);
      }
      return {
        [m]: b,
        [d]: p
      };
    }
  };
};
function ln(t) {
  return Zd(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Qe(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Bt(t) {
  var e;
  return (e = (Zd(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Zd(t) {
  return t instanceof Node || t instanceof Qe(t).Node;
}
function Vt(t) {
  return t instanceof Element || t instanceof Qe(t).Element;
}
function $t(t) {
  return t instanceof HTMLElement || t instanceof Qe(t).HTMLElement;
}
function tu(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Qe(t).ShadowRoot;
}
function Oi(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = st(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function e5(t) {
  return ["table", "td", "th"].includes(ln(t));
}
function ml(t) {
  const e = hl(), n = st(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function t5(t) {
  let e = lr(t);
  for (; $t(e) && !Ja(e); ) {
    if (ml(e))
      return e;
    e = lr(e);
  }
  return null;
}
function hl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ja(t) {
  return ["html", "body", "#document"].includes(ln(t));
}
function st(t) {
  return Qe(t).getComputedStyle(t);
}
function eo(t) {
  return Vt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function lr(t) {
  if (ln(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    tu(t) && t.host || // Fallback.
    Bt(t)
  );
  return tu(e) ? e.host : e;
}
function Hd(t) {
  const e = lr(t);
  return Ja(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : $t(e) && Oi(e) ? e : Hd(e);
}
function li(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Hd(t), a = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = Qe(i);
  return a ? e.concat(o, o.visualViewport || [], Oi(i) ? i : [], o.frameElement && n ? li(o.frameElement) : []) : e.concat(i, li(i, [], n));
}
function zd(t) {
  const e = st(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = $t(t), a = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, l = ga(n) !== a || ga(r) !== o;
  return l && (n = a, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function vl(t) {
  return Vt(t) ? t : t.contextElement;
}
function Jn(t) {
  const e = vl(t);
  if (!$t(e))
    return an(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = zd(e);
  let o = (a ? ga(n.width) : n.width) / r, l = (a ? ga(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const n5 = /* @__PURE__ */ an(0);
function Ud(t) {
  const e = Qe(t);
  return !hl() || !e.visualViewport ? n5 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function r5(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Qe(t) ? !1 : e;
}
function Mn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = vl(t);
  let o = an(1);
  e && (r ? Vt(r) && (o = Jn(r)) : o = Jn(t));
  const l = r5(a, n, r) ? Ud(a) : an(0);
  let c = (i.left + l.x) / o.x, u = (i.top + l.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = Qe(a), b = r && Vt(r) ? Qe(r) : r;
    let p = m.frameElement;
    for (; p && r && b !== m; ) {
      const v = Jn(p), g = p.getBoundingClientRect(), y = st(p), C = g.left + (p.clientLeft + parseFloat(y.paddingLeft)) * v.x, h = g.top + (p.clientTop + parseFloat(y.paddingTop)) * v.y;
      c *= v.x, u *= v.y, f *= v.x, d *= v.y, c += C, u += h, p = Qe(p).frameElement;
    }
  }
  return ba({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function i5(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = $t(n), a = Bt(n);
  if (n === a)
    return e;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = an(1);
  const c = an(0);
  if ((i || !i && r !== "fixed") && ((ln(n) !== "body" || Oi(a)) && (o = eo(n)), $t(n))) {
    const u = Mn(n);
    l = Jn(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - o.scrollLeft * l.x + c.x,
    y: e.y * l.y - o.scrollTop * l.y + c.y
  };
}
function a5(t) {
  return Array.from(t.getClientRects());
}
function qd(t) {
  return Mn(Bt(t)).left + eo(t).scrollLeft;
}
function o5(t) {
  const e = Bt(t), n = eo(t), r = t.ownerDocument.body, i = On(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), a = On(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + qd(t);
  const l = -n.scrollTop;
  return st(r).direction === "rtl" && (o += On(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: l
  };
}
function s5(t, e) {
  const n = Qe(t), r = Bt(t), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, l = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = hl();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function l5(t, e) {
  const n = Mn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, a = $t(t) ? Jn(t) : an(1), o = t.clientWidth * a.x, l = t.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: l,
    x: c,
    y: u
  };
}
function nu(t, e, n) {
  let r;
  if (e === "viewport")
    r = s5(t, n);
  else if (e === "document")
    r = o5(Bt(t));
  else if (Vt(e))
    r = l5(e, n);
  else {
    const i = Ud(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return ba(r);
}
function Kd(t, e) {
  const n = lr(t);
  return n === e || !Vt(n) || Ja(n) ? !1 : st(n).position === "fixed" || Kd(n, e);
}
function c5(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = li(t, [], !1).filter((l) => Vt(l) && ln(l) !== "body"), i = null;
  const a = st(t).position === "fixed";
  let o = a ? lr(t) : t;
  for (; Vt(o) && !Ja(o); ) {
    const l = st(o), c = ml(o);
    !c && l.position === "fixed" && (i = null), (a ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Oi(o) && !c && Kd(t, o)) ? r = r.filter((f) => f !== o) : i = l, o = lr(o);
  }
  return e.set(t, r), r;
}
function u5(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? c5(e, this._c) : [].concat(n), r], l = o[0], c = o.reduce((u, f) => {
    const d = nu(e, f, i);
    return u.top = On(d.top, u.top), u.right = sr(d.right, u.right), u.bottom = sr(d.bottom, u.bottom), u.left = On(d.left, u.left), u;
  }, nu(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function f5(t) {
  return zd(t);
}
function d5(t, e, n) {
  const r = $t(e), i = Bt(e), a = n === "fixed", o = Mn(t, !0, a, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = an(0);
  if (r || !r && !a)
    if ((ln(e) !== "body" || Oi(i)) && (l = eo(e)), r) {
      const u = Mn(e, !0, a, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = qd(i));
  return {
    x: o.left + l.scrollLeft - c.x,
    y: o.top + l.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function ru(t, e) {
  return !$t(t) || st(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function Yd(t, e) {
  const n = Qe(t);
  if (!$t(t))
    return n;
  let r = ru(t, e);
  for (; r && e5(r) && st(r).position === "static"; )
    r = ru(r, e);
  return r && (ln(r) === "html" || ln(r) === "body" && st(r).position === "static" && !ml(r)) ? n : r || t5(t) || n;
}
const m5 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || Yd, a = this.getDimensions;
  return {
    reference: d5(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function h5(t) {
  return st(t).direction === "rtl";
}
const v5 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: i5,
  getDocumentElement: Bt,
  getClippingRect: u5,
  getOffsetParent: Yd,
  getElementRects: m5,
  getClientRects: a5,
  getDimensions: f5,
  getScale: Jn,
  isElement: Vt,
  isRTL: h5
};
function p5(t, e) {
  let n = null, r;
  const i = Bt(t);
  function a() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function o(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), a();
    const {
      left: u,
      top: f,
      width: d,
      height: m
    } = t.getBoundingClientRect();
    if (l || e(), !d || !m)
      return;
    const b = ji(f), p = ji(i.clientWidth - (u + d)), v = ji(i.clientHeight - (f + m)), g = ji(u), C = {
      rootMargin: -b + "px " + -p + "px " + -v + "px " + -g + "px",
      threshold: On(0, sr(1, c)) || 1
    };
    let h = !0;
    function E(w) {
      const x = w[0].intersectionRatio;
      if (x !== c) {
        if (!h)
          return o();
        x ? o(!1, x) : r = setTimeout(() => {
          o(!1, 1e-7);
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
  return o(!0), a;
}
function g5(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = vl(t), f = i || a ? [...u ? li(u) : [], ...li(e)] : [];
  f.forEach((y) => {
    i && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const d = u && l ? p5(u, n) : null;
  let m = -1, b = null;
  o && (b = new ResizeObserver((y) => {
    let [C] = y;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let p, v = c ? Mn(t) : null;
  c && g();
  function g() {
    const y = Mn(t);
    v && (y.x !== v.x || y.y !== v.y || y.width !== v.width || y.height !== v.height) && n(), v = y, p = requestAnimationFrame(g);
  }
  return n(), () => {
    f.forEach((y) => {
      i && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(p);
  };
}
const y5 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: v5,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return Ug(t, e, {
    ...i,
    platform: a
  });
};
class b5 extends s.Component {
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
const E5 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function w5(t) {
  var e;
  return (e = E5[t]) !== null && e !== void 0 ? e : t;
}
let Gn = null, er = null;
ur && (Gn = document.createElement("div"), Gn.className = "adm-px-tester", Gn.style.setProperty("--size", "10"), document.body.appendChild(Gn), er = document.createElement("div"), er.className = "adm-px-tester", document.body.appendChild(er));
function Sn(t) {
  return Gn === null || er === null || Gn.getBoundingClientRect().height === 10 ? t : (er.style.setProperty("--size", t.toString()), er.getBoundingClientRect().height);
}
const dn = "adm-popover", C5 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, Gd = me((t, e) => {
  const n = U(C5, t), r = w5(n.placement), [i, a] = ae({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  be(e, () => ({
    show: () => a(!0),
    hide: () => a(!1),
    visible: i
  }), [i]);
  const o = V(null), l = V(null), c = V(null), u = nn(n.stopPropagation, W(n, s.createElement("div", {
    className: j(dn, `${dn}-${n.mode}`, {
      [`${dn}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${dn}-arrow`,
    ref: c
  }, s.createElement(Lg, {
    className: `${dn}-arrow-icon`
  })), s.createElement("div", {
    className: `${dn}-inner`
  }, s.createElement("div", {
    className: `${dn}-inner-content`
  }, n.content))))), [f, d] = K(null);
  function m() {
    var p, v, g;
    return Oe(this, void 0, void 0, function* () {
      const y = (v = (p = o.current) === null || p === void 0 ? void 0 : p.element) !== null && v !== void 0 ? v : null, C = l.current, h = c.current;
      if (d(y), !y || !C || !h)
        return;
      const {
        x: E,
        y: w,
        placement: x,
        middlewareData: k
      } = yield y5(y, C, {
        placement: r,
        middleware: [Xg(Sn(12)), Qg({
          padding: Sn(4),
          crossAxis: !1,
          limiter: Jg()
        }), Kg(), Yg(), qg({
          element: h,
          padding: Sn(12)
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
      } = (g = k.arrow) !== null && g !== void 0 ? g : {};
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
    function p() {
      a((v) => !v);
    }
    return f.addEventListener("click", p), () => {
      f.removeEventListener("click", p);
    };
  }, [f, n.trigger]), X(() => {
    const p = l.current;
    if (!(!f || !p))
      return g5(f, p, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), $u(() => {
    n.trigger && a(!1);
  }, [() => {
    var p;
    return (p = o.current) === null || p === void 0 ? void 0 : p.element;
  }, l], ["click", "touchmove"]);
  const b = Aa(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(b5, {
    ref: o
  }, n.children), b && vr(n.getContainer, u));
}), qt = "adm-popover-menu", x5 = me((t, e) => {
  const n = V(null);
  be(e, () => n.current, []);
  const r = ze((a) => {
    var o;
    const {
      onAction: l
    } = t;
    l && l(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [t.onAction]), i = ie(() => {
    const a = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), o = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${qt}-list`
    }, s.createElement("div", {
      className: j(`${qt}-list-inner`, {
        [`${qt}-list-scroll`]: a
      }),
      style: {
        height: o
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
  return s.createElement(Gd, Object.assign({
    ref: n
  }, t, {
    className: j(qt, t.className),
    content: i
  }), t.children);
}), Xd = le(Gd, {
  Menu: x5
});
function k5(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const $5 = "__SPLIT__", We = "adm-form-item", _5 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), O5 = (t) => {
  var e;
  const {
    style: n,
    extra: r,
    label: i,
    help: a,
    required: o,
    children: l,
    htmlFor: c,
    hidden: u,
    arrow: f,
    childElementPosition: d = "normal"
  } = t, m = at(ll), {
    locale: b
  } = ye(), p = t.hasFeedback !== void 0 ? t.hasFeedback : m.hasFeedback, v = t.layout || m.layout, g = (e = t.disabled) !== null && e !== void 0 ? e : m.disabled, y = (() => {
    const {
      requiredMarkStyle: E
    } = m;
    switch (E) {
      case "asterisk":
        return o && s.createElement("span", {
          className: `${We}-required-asterisk`
        }, "*");
      case "text-required":
        return o && s.createElement("span", {
          className: `${We}-required-text`
        }, "(", b.Form.required, ")");
      case "text-optional":
        return !o && s.createElement("span", {
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
  }, i, y, a && s.createElement(Xd, {
    content: a,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${We}-label-help`,
    onClick: (E) => {
      E.stopPropagation(), E.preventDefault();
    }
  }, s.createElement(m2, null)))), h = (!!t.description || p) && s.createElement(s.Fragment, null, t.description, p && s.createElement(s.Fragment, null, t.errors.map((E, w) => s.createElement("div", {
    key: `error-${w}`,
    className: `${We}-feedback-error`
  }, E)), t.warnings.map((E, w) => s.createElement("div", {
    key: `warning-${w}`,
    className: `${We}-feedback-warning`
  }, E))));
  return W(t, s.createElement(Ct.Item, {
    style: n,
    title: v === "vertical" && C,
    prefix: v === "horizontal" && C,
    extra: r,
    description: h,
    className: j(We, `${We}-${v}`, {
      [`${We}-hidden`]: u,
      [`${We}-has-error`]: t.errors.length
    }),
    disabled: g,
    onClick: t.onClick,
    clickable: t.clickable,
    arrow: f
  }, s.createElement("div", {
    className: j(`${We}-child`, `${We}-child-position-${d}`)
  }, s.createElement("div", {
    className: j(`${We}-child-inner`)
  }, l))));
}, S5 = (t) => {
  const {
    // 样式相关
    style: e,
    // FormItem 相关
    label: n,
    help: r,
    extra: i,
    hasFeedback: a,
    name: o,
    required: l,
    noStyle: c,
    hidden: u,
    layout: f,
    childElementPosition: d,
    description: m,
    // Field 相关
    disabled: b,
    rules: p,
    children: v,
    messageVariables: g,
    trigger: y = "onChange",
    validateTrigger: C = y,
    onClick: h,
    shouldUpdate: E,
    dependencies: w,
    clickable: x,
    arrow: k
  } = t, N = fr(t, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: F
  } = at(ll), {
    validateTrigger: _
  } = at(jd), D = k5(C, _, y), I = V(null), R = V(0);
  R.current += 1;
  const [$, M] = K({}), S = ze((Z, q) => {
    M((Y) => {
      const G = Object.assign({}, Y), ce = q.join($5);
      return Z.destroy ? delete G[ce] : G[ce] = Z, G;
    });
  }, [M]);
  function O(Z, q, Y, G) {
    var ce, he;
    if (c && !u)
      return Z;
    const Ee = (ce = Y == null ? void 0 : Y.errors) !== null && ce !== void 0 ? ce : [], z = Object.keys($).reduce((te, Ce) => {
      var Le, Me;
      const un = (Me = (Le = $[Ce]) === null || Le === void 0 ? void 0 : Le.errors) !== null && Me !== void 0 ? Me : [];
      return un.length && (te = [...te, ...un]), te;
    }, Ee), ee = (he = Y == null ? void 0 : Y.warnings) !== null && he !== void 0 ? he : [], J = Object.keys($).reduce((te, Ce) => {
      var Le, Me;
      const un = (Me = (Le = $[Ce]) === null || Le === void 0 ? void 0 : Le.warnings) !== null && Me !== void 0 ? Me : [];
      return un.length && (te = [...te, ...un]), te;
    }, ee);
    return W(t, s.createElement(O5, {
      style: e,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: G,
      disabled: b,
      hasFeedback: a,
      htmlFor: q,
      errors: z,
      warnings: J,
      onClick: h && ((te) => h(te, I)),
      hidden: u,
      layout: f,
      childElementPosition: d,
      clickable: x,
      arrow: k
    }, s.createElement(Yc.Provider, {
      value: S
    }, Z)));
  }
  const A = typeof v == "function";
  if (!o && !A && !t.dependencies)
    return O(v);
  let P = {};
  P.label = typeof n == "string" ? n : "", g && (P = Object.assign(Object.assign({}, P), g));
  const T = at(Yc), B = (Z) => {
    if (c && T) {
      const q = Z.name;
      T(Z, q);
    }
  };
  return s.createElement(al, Object.assign({}, N, {
    name: o,
    shouldUpdate: E,
    dependencies: w,
    rules: p,
    trigger: y,
    validateTrigger: D,
    onMetaChange: B,
    messageVariables: P
  }), (Z, q, Y) => {
    let G = null;
    const ce = l !== void 0 ? l : p && p.some((z) => !!(z && typeof z == "object" && z.required)), he = go(o).length && q ? q.name : [], Ee = (he.length > 0 && F ? [F, ...he] : he).join("_");
    if (A)
      (E || w) && !o && (G = v(Y));
    else if (!(w && !o))
      if (s.isValidElement(v)) {
        v.props.defaultValue;
        const z = Object.assign(Object.assign({}, v.props), Z);
        Bd(v) && (z.ref = (J) => {
          const te = v.ref;
          te && (typeof te == "function" && te(J), "current" in te && (te.current = J)), I.current = J;
        }), z.id || (z.id = Ee), (/* @__PURE__ */ new Set([...go(y), ...go(D)])).forEach((J) => {
          z[J] = (...te) => {
            var Ce, Le, Me;
            (Ce = Z[J]) === null || Ce === void 0 || Ce.call(Z, ...te), (Me = (Le = v.props)[J]) === null || Me === void 0 || Me.call(Le, ...te);
          };
        }), G = s.createElement(_5, {
          value: Z[t.valuePropName || "value"],
          update: R.current
        }, s.cloneElement(v, z));
      } else
        G = v;
    return O(G, Ee, q, ce);
  });
}, F5 = (t) => {
  const e = xu(), n = at(Rn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((a) => s.createElement(N5, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: e
  })));
}, N5 = je((t) => {
  const e = sl(t.namePath, t.form);
  return yi(() => {
    t.onChange();
  }, [e]), null;
}), Q7 = le(xg, {
  Item: S5,
  Subscribe: F5,
  Header: Nd,
  Array: Rd,
  useForm: ol,
  useWatch: sl
}), Qd = "adm-grid", P5 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = xn(n[0]), e["--gap-vertical"] = xn(n[1])) : e["--gap"] = xn(n)), W(t, s.createElement("div", {
    className: Qd,
    style: e
  }, t.children));
}, R5 = (t) => {
  const e = U({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${Qd}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, Jd = le(P5, {
  Item: R5
}), M5 = p3([Sf, n3]), Bi = () => [1, 0, 0, 1, 0, 0], iu = (t) => t[4], au = (t) => t[5], Rr = (t) => t[0], Mr = (t, e, n) => e1([1, 0, 0, 1, e, n], t), A5 = (t, e, n = e) => e1([e, 0, 0, n, 0, 0], t), T5 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], e1 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], yo = "adm-image-viewer", t1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = V([]), i = V(null), a = V(null), [{
    matrix: o
  }, l] = Re(() => ({
    matrix: Bi(),
    config: {
      tension: 200
    }
  })), c = So(i), u = So(a), f = V(!1), d = (p) => {
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
    const v = -c.width / 2, g = -c.height / 2, y = -u.width / 2, C = -u.height / 2, h = Rr(p), E = h * u.width, w = h * u.height, x = v - (E - c.width), k = v, N = g - (w - c.height), F = g, [_, D] = T5(p, [y, C]);
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
  }, m = (p, v, g, y = 0) => [p <= v - y, p >= g + y], b = (p, v, g = !1) => {
    if (!c || !u)
      return p;
    const y = Rr(p), C = y * u.width, h = y * u.height, {
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
    } = d(p);
    if (v === "translate") {
      let _ = E, D = k;
      return C > c.width ? _ = g ? $e(E, w, x) : ri(E, w, x, y * 50) : _ = -C / 2, h > c.height ? D = g ? $e(k, N, F) : ri(k, N, F, y * 50) : D = -h / 2, Mr(p, _ - E, D - k);
    }
    if (v === "scale" && g) {
      const [_, D] = [C > c.width ? $e(E, w, x) : -C / 2, h > c.height ? $e(k, N, F) : -h / 2];
      return Mr(p, _ - E, D - k);
    }
    return p;
  };
  return M5({
    onDrag: (p) => {
      var v;
      if (p.first) {
        const {
          x: {
            position: y,
            minX: C,
            maxX: h
          }
        } = d(o.get());
        r.current = m(y, C, h);
        return;
      }
      if (p.pinching)
        return p.cancel();
      if (p.tap && p.elapsedTime > 0 && p.elapsedTime < 1e3) {
        (v = t.onTap) === null || v === void 0 || v.call(t);
        return;
      }
      const g = Rr(o.get());
      if (e && (e.current = g !== 1), !f.current && g <= 1)
        l.start({
          matrix: Bi()
        });
      else {
        const y = o.get(), C = [p.offset[0] - iu(y), p.offset[1] - au(y)], h = Mr(y, ...p.last ? [C[0] + p.velocity[0] * p.direction[0] * 200, C[1] + p.velocity[1] * p.direction[1] * 200] : C);
        l.start({
          matrix: b(h, "translate", p.last),
          immediate: !p.last
        });
        const {
          x: {
            position: E,
            minX: w,
            maxX: x
          }
        } = d(h);
        p.last && r.current.some((k) => k) && m(E, w, x).some((k) => k) && (e && (e.current = !1), l.start({
          matrix: Bi()
        }));
      }
    },
    onPinch: (p) => {
      var v;
      f.current = !p.last;
      const [g] = p.offset;
      if (g < 0)
        return;
      let y;
      n === "auto" ? y = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : y = n;
      const C = p.last ? $e(g, 1, y) : g;
      if ((v = t.onZoomChange) === null || v === void 0 || v.call(t, C), p.last && C <= 1)
        l.start({
          matrix: Bi()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const h = o.get(), E = Rr(h), w = p.origin[0] - c.width / 2, x = p.origin[1] - c.height / 2;
        let k = Mr(h, -w, -x);
        k = A5(k, C / E), k = Mr(k, w, x), l.start({
          matrix: b(k, "scale", p.last),
          immediate: !p.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [iu(o.get()), au(o.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Rr(o.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), s.createElement("div", {
    className: `${yo}-slide`
  }, s.createElement("div", {
    className: `${yo}-control`,
    ref: i
  }, s.createElement(ge.div, {
    className: `${yo}-image-wrapper`,
    style: {
      matrix: o
    }
  }, s.createElement("img", {
    ref: a,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, bo = "adm-image-viewer", I5 = me((t, e) => {
  const n = window.innerWidth + Sn(16), [{
    x: r
  }, i] = Re(() => ({
    x: t.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = t.images.length;
  function o(u, f = !1) {
    var d;
    const m = $e(u, 0, a - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  be(e, () => ({
    swipeTo: o
  }));
  const l = V(!1), c = Ot((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, b = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o($e(Math.round((f + b) / n), d, m));
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
      right: (a - 1) * n
    }),
    rubberband: !0,
    axis: "x",
    pointer: {
      touch: !0
    }
  });
  return s.createElement("div", Object.assign({
    className: `${bo}-slides`
  }, c()), s.createElement(ge.div, {
    className: `${bo}-indicator`
  }, r.to((u) => `${$e(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), s.createElement(ge.div, {
    className: `${bo}-slides-inner`,
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
}), wa = "adm-image-viewer", n1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, r1 = (t) => {
  var e, n, r;
  const i = U(n1, t), a = s.createElement(hi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: j(`${wa}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && s.createElement(t1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && s.createElement("div", {
    className: `${wa}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(br, {
    position: "bottom"
  })));
  return vr(i.getContainer, a);
}, L5 = Object.assign(Object.assign({}, n1), {
  defaultIndex: 0
}), i1 = me((t, e) => {
  var n, r, i;
  const a = U(L5, t), [o, l] = K(a.defaultIndex), c = V(null);
  be(e, () => ({
    swipeTo: (d, m) => {
      var b;
      l(d), (b = c.current) === null || b === void 0 || b.swipeTo(d, m);
    }
  }));
  const u = ze((d) => {
    var m;
    d !== o && (l(d), (m = a.onIndexChange) === null || m === void 0 || m.call(a, d));
  }, [a.onIndexChange, o]), f = s.createElement(hi, {
    visible: a.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: a.afterClose,
    destroyOnClose: !0,
    className: (n = a == null ? void 0 : a.classNames) === null || n === void 0 ? void 0 : n.mask
  }, s.createElement("div", {
    className: j(`${wa}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && s.createElement(I5, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom
  })), a.images && s.createElement("div", {
    className: `${wa}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), s.createElement(br, {
    position: "bottom"
  })));
  return vr(a.getContainer, f);
}), cr = /* @__PURE__ */ new Set();
function D5(t) {
  pl();
  const e = Er(s.createElement(r1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      cr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return cr.add(e), e;
}
function V5(t) {
  pl();
  const e = Er(s.createElement(i1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      cr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return cr.add(e), e;
}
function pl() {
  cr.forEach((t) => {
    t.close();
  }), cr.clear();
}
const j5 = le(i1, {
  show: V5
}), B5 = le(r1, {
  Multi: j5,
  show: D5,
  clear: pl
}), mn = "adm-image-uploader", W5 = (t) => {
  const {
    locale: e
  } = ye(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: l
  } = t, c = ie(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  X(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${mn}-cell-mask`
    }, s.createElement("span", {
      className: `${mn}-cell-loading`
    }, s.createElement(Ys, {
      color: "white"
    }), s.createElement("span", {
      className: `${mn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${mn}-cell-delete`,
      onClick: o
    }, a);
  }
  return s.createElement("div", {
    className: j(`${mn}-cell`, t.status === "fail" && `${mn}-cell-fail`)
  }, s.createElement(Da, {
    className: `${mn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, ou = W5, hn = "adm-space", Z5 = {
  direction: "horizontal"
}, gl = (t) => {
  const e = U(Z5, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(hn, {
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
}, Et = "adm-image-uploader", H5 = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(vi, {
    className: `${Et}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, J7 = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(H5, t), {
    columns: i
  } = r, [a, o] = ae(r), [l, c] = K([]), u = V(null), f = So(u), d = V(null), [m, b] = K(80), p = V(null);
  Fe(() => {
    const R = d.current;
    if (i && f && R) {
      const $ = f.width, M = Bf(window.getComputedStyle(R).getPropertyValue("height"));
      b(($ - M * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const v = {
    "--cell-size": m + "px"
  };
  Fe(() => {
    c((R) => R.filter(($) => $.url === void 0 ? !0 : !a.some((M) => M.url === $.url)));
  }, [a]), Fe(() => {
    var R;
    (R = r.onUploadQueueChange) === null || R === void 0 || R.call(r, l.map(($) => ({
      id: $.id,
      status: $.status
    })));
  }, [l]);
  const g = V(0), {
    maxCount: y,
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
      if (y > 0) {
        const P = a.length + S.length - y;
        P > 0 && (S = S.slice(0, S.length - P), ($ = r.onCountExceed) === null || $ === void 0 || $.call(r, P));
      }
      const O = S.map((P) => ({
        id: g.current++,
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
      }))).catch((P) => console.error(P)), o((P) => P.concat(A));
    });
  }
  const k = V(null);
  function N(R) {
    k.current = B5.Multi.show({
      images: a.map(($) => $.url),
      defaultIndex: R,
      onClose: () => {
        k.current = null;
      }
    });
  }
  fi(() => {
    var R;
    (R = k.current) === null || R === void 0 || R.close();
  });
  const F = w(l), _ = r.showUpload && (y === 0 || a.length + F.length < y), D = () => a.map((R, $) => {
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
        (yield (A = r.onDelete) === null || A === void 0 ? void 0 : A.call(r, R)) !== !1 && o(a.filter((T, B) => B !== $));
      })
    });
    return h ? h(O, R, a) : O;
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
    className: `${Et}-upload-button-wrap`,
    style: _ ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${Et}-cell ${Et}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${Et}-upload-button-icon`
  }, s.createElement(ff, null))), !r.disableUpload && s.createElement("input", {
    ref: p,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${Et}-input`,
    onChange: x,
    "aria-hidden": !0
  })));
  return be(e, () => ({
    get nativeElement() {
      return p.current;
    }
  })), W(r, s.createElement("div", {
    className: Et,
    ref: u
  }, i ? s.createElement(Jd, {
    className: `${Et}-grid`,
    columns: i,
    style: v
  }, s.createElement("div", {
    className: `${Et}-gap-measure`,
    ref: d
  }), I.props.children) : s.createElement(gl, {
    className: `${Et}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
}), a1 = () => null, Hn = "adm-index-bar", z5 = (t) => {
  const [e, n] = K(!1);
  return s.createElement("div", {
    className: j(`${Hn}-sidebar`, {
      [`${Hn}-sidebar-interacting`]: e
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
        clientY: a
      } = r.touches[0], o = document.elementFromPoint(i, a);
      if (!o)
        return;
      const l = o.dataset.index;
      l && t.onActive(l);
    }
  }, t.indexItems.map(({
    index: r,
    brief: i
  }) => {
    const a = r === t.activeIndex;
    return s.createElement("div", {
      className: `${Hn}-sidebar-row`,
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
    }, e && a && s.createElement("div", {
      className: `${Hn}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: j(`${Hn}-sidebar-item`, {
        [`${Hn}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, zn = "adm-index-bar", U5 = {
  sticky: !0
}, q5 = me((t, e) => {
  const n = U(U5, t), r = Sn(35), i = V(null), a = [], o = [];
  cn(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === a1 && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(W(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${zn}-anchor`
    }, s.createElement("div", {
      className: `${zn}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = K(() => {
    const d = a[0];
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
    const p = b.children;
    for (let v = 0; v < p.length; v++) {
      const g = p.item(v);
      if (!g)
        continue;
      if (g.dataset.index === d) {
        b.scrollTop = g.offsetTop, c(d), l !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
        return;
      }
    }
  }
  const {
    run: f
  } = ka(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const b = m.scrollTop, p = m.getElementsByClassName(`${zn}-anchor`);
    for (let v = 0; v < p.length; v++) {
      const g = p.item(v);
      if (!g)
        continue;
      const y = g.dataset.index;
      if (y && g.offsetTop + g.clientHeight - r > b) {
        c(y), l !== y && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, y));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return W(n, s.createElement("div", {
    className: j(`${zn}`, {
      [`${zn}-sticky`]: n.sticky
    })
  }, s.createElement(z5, {
    indexItems: a,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${zn}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), e8 = le(q5, {
  Panel: a1
});
function K5(t) {
  return t === window;
}
const o1 = "adm-infinite-scroll", Y5 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(G5, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, t8 = (t) => {
  const e = U(Y5, t), [n, r] = K(!1), i = em((b) => Oe(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (p) {
      throw r(!0), p;
    }
  })), a = V(null), [o, l] = K({}), c = V(o), [u, f] = K(), {
    run: d
  } = ka(() => Oe(void 0, void 0, void 0, function* () {
    if (c.current !== o || !e.hasMore)
      return;
    const b = a.current;
    if (!b || !b.offsetParent)
      return;
    const p = ra(b);
    if (f(p), !p)
      return;
    const g = b.getBoundingClientRect().top;
    if ((K5(p) ? window.innerHeight : p.getBoundingClientRect().bottom) >= g - e.threshold) {
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
    if (!a.current || !u)
      return;
    function p() {
      d();
    }
    return u.addEventListener("scroll", p), () => {
      u.removeEventListener("scroll", p);
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
    ref: a
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, G5 = (t) => {
  const {
    locale: e
  } = ye();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${o1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(Mf, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
}, Wi = "adm-input", X5 = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, s1 = me((t, e) => {
  const n = U(X5, t), [r, i] = ae(n), [a, o] = K(!1), l = V(!1), c = V(null), {
    locale: u
  } = ye();
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
  const f = (b) => {
    var p;
    n.onEnterPress && (b.code === "Enter" || b.keyCode === 13) && n.onEnterPress(b), (p = n.onKeyDown) === null || p === void 0 || p.call(n, b);
  };
  Fe(() => {
    var b;
    if (n.enterKeyHint)
      return (b = c.current) === null || b === void 0 || b.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var p;
        (p = c.current) === null || p === void 0 || p.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function d() {
    let b = r;
    if (n.type === "number") {
      const p = b && $e(parseFloat(b), n.min, n.max).toString();
      Number(b) !== Number(p) && (b = p);
    }
    b !== r && i(b);
  }
  const m = !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0;
  return W(n, s.createElement("div", {
    className: j(`${Wi}`, n.disabled && `${Wi}-disabled`)
  }, s.createElement("input", {
    ref: c,
    className: `${Wi}-element`,
    value: r,
    onChange: (b) => {
      i(b.target.value);
    },
    onFocus: (b) => {
      var p;
      o(!0), (p = n.onFocus) === null || p === void 0 || p.call(n, b);
    },
    onBlur: (b) => {
      var p;
      o(!1), d(), (p = n.onBlur) === null || p === void 0 || p.call(n, b);
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
      var p;
      l.current = !0, (p = n.onCompositionStart) === null || p === void 0 || p.call(n, b);
    },
    onCompositionEnd: (b) => {
      var p;
      l.current = !1, (p = n.onCompositionEnd) === null || p === void 0 || p.call(n, b);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && s.createElement("div", {
    className: `${Wi}-clear`,
    onMouseDown: (b) => {
      b.preventDefault();
    },
    onClick: () => {
      var b, p;
      i(""), (b = n.onClear) === null || b === void 0 || b.call(n), H3() && l.current && (l.current = !1, (p = c.current) === null || p === void 0 || p.blur());
    },
    "aria-label": u.Input.clear
  }, s.createElement(Ta, null))));
}), gt = "adm-jumbo-tabs", Q5 = () => null, J5 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  cn(t.children, (d, m) => {
    if (!An(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const p = o.push(d);
    i[b] = p - 1;
  });
  const [l, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Lf(n, i[l]);
  return bi(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: gt,
    ref: r
  }, s.createElement("div", {
    className: `${gt}-header`
  }, s.createElement(Df, {
    scrollTrackRef: n
  }), s.createElement(ge.div, {
    className: `${gt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${gt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: j(`${gt}-tab`, {
      [`${gt}-tab-active`]: d.key === l,
      [`${gt}-tab-disabled`]: d.props.disabled
    })
  }, s.createElement("div", {
    className: `${gt}-tab-title`
  }, d.props.title), s.createElement("div", {
    className: `${gt}-tab-description`
  }, d.props.description))))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(pr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${gt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, n8 = le(J5, {
  Tab: Q5
}), e6 = (t) => {
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
}, t6 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, l1 = (t) => {
  const e = U(t6, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Ft("image-container")
  }, s.createElement(Da, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Ft("header")
  }, s.createElement(ni, null, e.header)), !!e.title && s.createElement("div", {
    className: Ft("title")
  }, e.title), s.createElement("div", {
    className: Ft("content")
  }, typeof e.content == "string" ? s.createElement(ni, null, e.content) : e.content), s.createElement(gl, {
    direction: "vertical",
    block: !0,
    className: j(Ft("footer"), e.actions.length === 0 && Ft("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(e6, {
    key: r.key,
    action: r,
    onAction: () => Oe(void 0, void 0, void 0, function* () {
      var a, o, l;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = e.onAction) === null || o === void 0 ? void 0 : o.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(td, {
    className: j(Ft(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: j(Ft("body"), e.image && Ft("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function Ft(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const ms = /* @__PURE__ */ new Set();
function yl(t) {
  const e = Er(s.createElement(l1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ms.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ms.add(e.close), e;
}
function n6(t) {
  const e = {
    confirmText: ci().locale.Modal.ok
  }, n = U(e, t);
  return new Promise((r) => {
    yl(Object.assign(Object.assign({}, n), {
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
const r6 = {
  confirmText: "确认",
  cancelText: "取消"
};
function i6(t) {
  const {
    locale: e
  } = ci(), n = U(r6, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    yl(Object.assign(Object.assign({}, n), {
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
function a6() {
  ms.forEach((t) => {
    t();
  });
}
const r8 = le(l1, {
  show: yl,
  alert: n6,
  confirm: i6,
  clear: a6
}), Un = "adm-nav-bar", o6 = {
  backArrow: !0
}, i8 = (t) => {
  const e = U(o6, t), {
    back: n,
    backArrow: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(Un)
  }, s.createElement("div", {
    className: `${Un}-left`,
    role: "button"
  }, n !== null && s.createElement("div", {
    className: `${Un}-back`,
    onClick: e.onBack
  }, r && s.createElement("span", {
    className: `${Un}-back-arrow`
  }, r === !0 ? s.createElement(f2, null) : r), s.createElement("span", {
    "aria-hidden": "true"
  }, n)), e.left), s.createElement("div", {
    className: `${Un}-title`
  }, e.children), s.createElement("div", {
    className: `${Un}-right`
  }, e.right)));
}, Nt = "adm-notice-bar", s6 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: s.createElement(p2, null)
}, a8 = je((t) => {
  const e = U(s6, t), n = V(null), r = V(null), [i, a] = K(!0), o = e.speed, l = V(!0), c = V(!1);
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
    c.current = !0, d.style.transitionDuration = `${Math.round(b / o)}s`, d.style.transform = `translateX(-${d.offsetWidth}px)`;
  }
  return _m(() => {
    l.current = !1, u();
  }, e.delay), bi(() => {
    u();
  }, n), zs(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? W(e, s.createElement("div", {
    className: j(Nt, `${Nt}-${e.color}`, {
      [`${Nt}-wrap`]: e.wrap
    }),
    onClick: e.onClick
  }, e.icon && s.createElement("span", {
    className: `${Nt}-left`
  }, e.icon), s.createElement("span", {
    ref: n,
    className: `${Nt}-content`
  }, s.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Nt}-content-inner`
  }, e.content)), (e.closeable || e.extra) && s.createElement("span", {
    className: `${Nt}-right`
  }, e.extra, e.closeable && s.createElement("div", {
    className: `${Nt}-close`,
    onClick: () => {
      var f;
      a(!1), (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, s.createElement(vi, {
    className: `${Nt}-close-icon`
  }))))) : null;
});
function l6(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const xe = "adm-number-keyboard", c6 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, o8 = (t) => {
  const e = U(c6, t), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: l,
    showCloseButton: c,
    onInput: u
  } = e, {
    locale: f
  } = ye(), d = V(null), m = ie(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = l ? l6(w) : w, k = Array.isArray(o) ? o : [o];
    return x.push("0"), a ? (k.length === 2 && x.splice(9, 0, k.pop()), x.push(k[0] || "")) : (x.splice(9, 0, k[0] || ""), x.push(k[1] || "BACKSPACE")), x;
  }, [o, a, l, l && n]), b = V(-1), p = V(-1), v = jt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), g = () => {
    b.current = window.setTimeout(() => {
      v(), p.current = window.setInterval(v, 150);
    }, 700);
  }, y = () => {
    clearTimeout(b.current), clearInterval(p.current);
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
  }, s.createElement(vf, null))), E = (w, x) => {
    const k = /^\d$/.test(w), N = j(`${xe}-key`, {
      [`${xe}-key-number`]: k,
      [`${xe}-key-sign`]: !k && w,
      [`${xe}-key-mid`]: x === 9 && !!a && m.length < 12
    }), F = w ? {
      role: "button",
      title: w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: N,
      onTouchStart: () => {
        w === "BACKSPACE" && g();
      },
      onTouchEnd: (_) => {
        C(_, w), w === "BACKSPACE" && y();
      }
    }, F), w === "BACKSPACE" ? s.createElement(nc, null) : w);
  };
  return s.createElement(yr, {
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
      [`${xe}-main-confirmed-style`]: !!a
    })
  }, m.map(E)), !!a && s.createElement("div", {
    className: `${xe}-confirm`
  }, s.createElement("div", {
    className: `${xe}-key ${xe}-key-extra ${xe}-key-bs`,
    onTouchStart: () => {
      g();
    },
    onTouchEnd: (w) => {
      C(w, "BACKSPACE"), y();
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(nc, null)), s.createElement("div", {
    className: `${xe}-key ${xe}-key-extra ${xe}-key-ok`,
    onTouchEnd: (w) => C(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), e.safeArea && s.createElement("div", {
    className: `${xe}-footer`
  }, s.createElement(br, {
    position: "bottom"
  })))));
}, Ar = "adm-page-indicator", u6 = {
  color: "primary",
  direction: "horizontal"
}, f6 = je((t) => {
  const e = U(u6, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: j(`${Ar}-dot`, {
        [`${Ar}-dot-active`]: e.current === r
      })
    }));
  return W(e, s.createElement("div", {
    className: j(Ar, `${Ar}-${e.direction}`, `${Ar}-color-${e.color}`)
  }, n));
}), yt = "adm-passcode-input", su = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, s8 = me((t, e) => {
  const n = U(su, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : su.length, {
    locale: i
  } = ye(), [a, o] = K(!1), [l, c] = ae(n), u = V(null), f = V(null);
  X(() => {
    var v;
    l.length >= r && ((v = n.onFill) === null || v === void 0 || v.call(n, l));
  }, [l, r]);
  const d = () => {
    var v, g;
    n.keyboard || (v = f.current) === null || v === void 0 || v.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  X(() => {
    if (!a)
      return;
    const v = window.setTimeout(() => {
      var g;
      (g = u.current) === null || g === void 0 || g.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(v);
    };
  }, [a]);
  const m = () => {
    var v;
    o(!1), (v = n.onBlur) === null || v === void 0 || v.call(n);
  };
  be(e, () => ({
    focus: () => {
      var v;
      return (v = u.current) === null || v === void 0 ? void 0 : v.focus();
    },
    blur: () => {
      var v, g;
      (v = u.current) === null || v === void 0 || v.blur(), (g = f.current) === null || g === void 0 || g.blur();
    }
  }));
  const b = () => {
    const v = [], g = l.split(""), y = g.length, C = $e(g.length, 0, r - 1);
    for (let h = 0; h < r; h++)
      v.push(s.createElement("div", {
        className: j(`${yt}-cell`, {
          [`${yt}-cell-caret`]: n.caret && y === h && a,
          [`${yt}-cell-focused`]: C === h && a,
          [`${yt}-cell-dot`]: !n.plain && g[h]
        }),
        key: h
      }, g[h] && n.plain ? g[h] : ""));
    return v;
  }, p = j(yt, {
    [`${yt}-focused`]: a,
    [`${yt}-error`]: n.error,
    [`${yt}-seperated`]: n.seperated
  });
  return s.createElement(s.Fragment, null, W(n, s.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: p,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, s.createElement("div", {
    className: `${yt}-cell-container`
  }, b()), s.createElement("input", {
    ref: f,
    className: `${yt}-native-input`,
    value: l,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (v) => {
      c(v.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && s.cloneElement(n.keyboard, {
    visible: a,
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
}), Tr = "adm-progress-bar", d6 = {
  percent: 0,
  rounded: !0,
  text: !1
}, l8 = (t) => {
  const e = U(d6, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, s.createElement("div", {
    className: j(Tr, e.rounded && `${Tr}-rounded`)
  }, s.createElement("div", {
    className: `${Tr}-trail`
  }, s.createElement("div", {
    className: `${Tr}-fill`,
    style: n
  })), Tt(r) && s.createElement("div", {
    className: `${Tr}-text`
  }, r)));
}, qn = "adm-progress-circle", c8 = (t) => {
  const e = U({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, s.createElement("div", {
    className: `${qn}`,
    style: n
  }, s.createElement("div", {
    className: `${qn}-content`
  }, s.createElement("svg", {
    className: `${qn}-svg`
  }, s.createElement("circle", {
    className: `${qn}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${qn}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${qn}-info`
  }, e.children))));
}, m6 = (t) => new Promise((e) => setTimeout(e, t)), Zi = "adm-pull-to-refresh", h6 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, u8 = (t) => {
  var e, n;
  const {
    locale: r
  } = ye(), i = U(h6, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), a = (e = i.headHeight) !== null && e !== void 0 ? e : Sn(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Sn(60), [l, c] = K("pulling"), [u, f] = Re(() => ({
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
    var g;
    (g = d.current) === null || g === void 0 || g.addEventListener("touchmove", () => {
    });
  }, []);
  const b = () => new Promise((g) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), g();
      }
    });
  });
  function p() {
    return Oe(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw b(), g;
      }
      i.completeDelay > 0 && (yield m6(i.completeDelay)), b();
    });
  }
  Ot((g) => {
    if (l === "refreshing" || l === "complete")
      return;
    const {
      event: y
    } = g;
    if (g.last) {
      m.current = !1, l === "canRelease" ? p() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = g.movement, h = Math.ceil(C);
    if (g.first && h > 0) {
      let k = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const w = g.event.target;
      if (!w || !(w instanceof Element))
        return;
      let x = ra(w);
      for (; ; ) {
        if (!x || k(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = ra(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    y.cancelable && y.preventDefault(), y.stopPropagation();
    const E = Math.max(ri(h, 0, 0, a * 5, 0.5), 0);
    f.start({
      height: E
    }), c(E > o ? "canRelease" : "pulling");
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
  const v = () => {
    var g;
    if (i.renderText)
      return (g = i.renderText) === null || g === void 0 ? void 0 : g.call(i, l);
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
    className: Zi
  }, s.createElement(ge.div, {
    style: u,
    className: `${Zi}-head`
  }, s.createElement("div", {
    className: `${Zi}-head-content`,
    style: {
      height: a
    }
  }, v())), s.createElement("div", {
    className: `${Zi}-content`
  }, i.children));
}, c1 = ps(null), v6 = {
  disabled: !1,
  defaultValue: null
}, p6 = (t) => {
  const e = U(v6, t), [n, r] = ae({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = e.onChange) === null || a === void 0 || a.call(e, i));
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
}, vn = "adm-radio", g6 = {
  defaultChecked: !1
}, y6 = (t) => {
  const e = U(g6, t), n = at(c1);
  let [r, i] = ae({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  }), a = e.disabled;
  const {
    value: o
  } = e;
  n && o !== void 0 && (r = n.value.includes(o), i = (c) => {
    var u;
    c ? n.check(o) : n.uncheck(o), (u = e.onChange) === null || u === void 0 || u.call(e, c);
  }, a = a || n.disabled);
  const l = () => e.icon ? s.createElement("div", {
    className: `${vn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${vn}-icon`
  }, r && s.createElement(rd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: j(vn, {
      [`${vn}-checked`]: r,
      [`${vn}-disabled`]: a,
      [`${vn}-block`]: e.block
    })
  }, s.createElement(id, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${vn}-content`
  }, e.children)));
}, f8 = le(y6, {
  Group: p6
}), b6 = () => s.createElement("svg", {
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
})), pn = "adm-rate", E6 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(b6, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, d8 = (t) => {
  const e = U(E6, t), [n, r] = ae(e), i = V(null), a = Array(e.count).fill(null);
  function o(c, u) {
    return s.createElement("div", {
      className: j(`${pn}-star`, {
        [`${pn}-star-active`]: n >= c,
        [`${pn}-star-half`]: u,
        [`${pn}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const l = Ot((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), b = (u - m.left) / m.width * e.count, p = e.allowHalf ? Math.ceil(b * 2) / 2 : Math.ceil(b), v = $e(p, 0, e.count);
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
    className: j(pn, {
      [`${pn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), a.map((c, u) => s.createElement("div", {
    key: u,
    className: j(`${pn}-box`)
  }, e.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, Ir = "adm-result", w6 = {
  success: df,
  error: Ta,
  info: gf,
  waiting: hf,
  warning: pf
}, C6 = {
  status: "info"
}, m8 = (t) => {
  const e = U(C6, t), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = e;
  if (!n)
    return null;
  const o = a || s.createElement(w6[n]);
  return W(e, s.createElement("div", {
    className: j(Ir, `${Ir}-${n}`)
  }, s.createElement("div", {
    className: `${Ir}-icon`
  }, o), s.createElement("div", {
    className: `${Ir}-title`
  }, r), !!i && s.createElement("div", {
    className: `${Ir}-description`
  }, i)));
}, Ae = "adm-result-page", x6 = {
  success: df,
  error: Ta,
  info: gf,
  waiting: hf,
  warning: pf
}, k6 = {
  status: "info",
  details: []
}, $6 = (t) => {
  const e = U(k6, t), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = o || s.createElement(x6[n]), [m, b] = K(!0), p = Tt(c), v = Tt(l);
  return W(e, s.createElement("div", {
    className: Ae
  }, s.createElement("div", {
    className: `${Ae}-header`
  }, s.createElement("div", {
    className: `${Ae}-icon`
  }, d), s.createElement("div", {
    className: `${Ae}-title`
  }, r), Tt(i) ? s.createElement("div", {
    className: `${Ae}-description`
  }, i) : null, a != null && a.length ? s.createElement("div", {
    className: `${Ae}-details`
  }, (m ? a.slice(0, 3) : a).map((g, y) => s.createElement("div", {
    className: j(`${Ae}-detail`, g.bold && `${Ae}-detail-bold`),
    key: y
  }, s.createElement("span", null, g.label), s.createElement("span", null, g.value))), a.length > 3 && s.createElement("div", {
    onClick: () => b((g) => !g)
  }, s.createElement("div", {
    className: j(`${Ae}-collapse`, !m && `${Ae}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ae}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ae}-bg`
  }))), s.createElement("div", {
    className: `${Ae}-content`
  }, e.children), (v || p) && s.createElement("div", {
    className: `${Ae}-footer`
  }, p && s.createElement(Lt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ae}-footer-btn`
  }, c), v && p && s.createElement("div", {
    className: `${Ae}-footer-space`
  }), v && s.createElement(Lt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ae}-footer-btn`
  }, l))));
}, _6 = "adm-result-page-card", O6 = (t) => W(t, s.createElement("div", {
  className: j(`${_6}`)
}, t.children)), h8 = le($6, {
  Card: O6
}), Kt = "adm-search-bar", S6 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: s.createElement(v2, null)
}, v8 = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(S6, {
    cancelText: n.common.cancel
  }, t), [i, a] = ae(r), [o, l] = K(!1), c = V(null), u = V(!1);
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
    return typeof r.showCancelButton == "function" ? d = r.showCancelButton(o, i) : d = r.showCancelButton && o, d && s.createElement("div", {
      className: `${Kt}-suffix`
    }, s.createElement(Lt, {
      fill: "none",
      className: `${Kt}-cancel-button`,
      onClick: () => {
        var m, b, p;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (b = c.current) === null || b === void 0 || b.blur(), (p = r.onCancel) === null || p === void 0 || p.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return W(r, s.createElement("div", {
    className: j(Kt, {
      [`${Kt}-active`]: o
    })
  }, s.createElement("div", {
    className: `${Kt}-input-box`
  }, r.icon && s.createElement("div", {
    className: `${Kt}-input-box-icon`
  }, r.icon), s.createElement(s1, {
    ref: c,
    className: j(`${Kt}-input`, {
      [`${Kt}-input-without-icon`]: !r.icon
    }),
    value: i,
    onChange: a,
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
}), F6 = je(() => s.createElement("svg", {
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
})))))))), gn = "adm-selector", N6 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, p8 = (t) => {
  const e = U(N6, t), [n, r, , i] = Ei(e.fieldNames), [a, o] = ae({
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
    const f = (a || []).includes(u[r]), d = u[i] || e.disabled, m = j(`${gn}-item`, {
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
            const b = f ? a.filter((p) => p !== u[r]) : [...a, u[r]];
            o(b);
          } else {
            const b = f ? [] : [u[r]];
            o(b);
          }
      },
      role: "option",
      "aria-selected": f && !e.multiple || f && e.multiple
    }, u[n], u.description && s.createElement("div", {
      className: `${gn}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${gn}-check-mark-wrapper`
    }, s.createElement(F6, null)));
  });
  return W(e, s.createElement("div", {
    className: gn,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(Jd, {
    columns: e.columns
  }, c) : s.createElement(gl, {
    wrap: !0
  }, c)));
}, Eo = je((t) => W(t, s.createElement("svg", {
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
}))))), Ie = "adm-side-bar", P6 = () => null, R6 = (t) => {
  var e;
  let n = null;
  const r = [];
  cn(t.children, (c, u) => {
    if (!An(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, a] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = t.onChange) === null || u === void 0 || u.call(t, c));
    }
  }), o = r[r.length - 1], l = o && o.key === i;
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
        b == null || c.props.disabled || a(b.toString());
      },
      className: j(`${Ie}-item`, {
        [`${Ie}-item-active`]: f,
        [`${Ie}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(Eo, {
      className: `${Ie}-item-corner ${Ie}-item-corner-top`
    }), m && s.createElement(Eo, {
      className: `${Ie}-item-corner ${Ie}-item-corner-bottom`
    })), s.createElement(Wo, {
      content: c.props.badge,
      className: `${Ie}-badge`
    }, s.createElement("div", {
      className: `${Ie}-item-title`
    }, f && s.createElement("div", {
      className: `${Ie}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: j(`${Ie}-extra-space`, l && `${Ie}-item-active-next-sibling`)
  }, l && s.createElement(Eo, {
    className: `${Ie}-item-corner ${Ie}-item-corner-top`
  }))));
}, g8 = le(R6, {
  Item: P6
}), wo = "adm-slider", M6 = ({
  points: t,
  max: e,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = e - n, o = t.map((l) => {
    const c = `${Math.abs(l - n) / a * 100}%`, u = l <= r && l >= i, f = {
      left: c
    }, d = j({
      [`${wo}-tick`]: !0,
      [`${wo}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${wo}-ticks`
  }, o);
}, A6 = M6, Co = "adm-slider-mark", T6 = ({
  marks: t,
  upperBound: e,
  lowerBound: n,
  max: r,
  min: i
}) => {
  const a = Object.keys(t), o = r - i, l = a.map(parseFloat).sort((c, u) => c - u).filter((c) => c >= i && c <= r).map((c) => {
    const u = t[c];
    if (!u && u !== 0)
      return null;
    const f = c <= e && c >= n, d = j({
      [`${Co}-text`]: !0,
      [`${Co}-text-active`]: f
    }), m = {
      left: `${(c - i) / o * 100}%`
    };
    return s.createElement("span", {
      className: d,
      style: m,
      key: c
    }, u);
  });
  return s.createElement("div", {
    className: Co
  }, l);
}, I6 = T6;
function hs() {
  return typeof BigInt == "function";
}
function u1(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function Kr(t) {
  var e = t.trim(), n = e.startsWith("-");
  n && (e = e.slice(1)), e = e.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, ""), e.startsWith(".") && (e = "0".concat(e));
  var r = e || "0", i = r.split("."), a = i[0] || "0", o = i[1] || "0";
  a === "0" && o === "0" && (n = !1);
  var l = n ? "-" : "";
  return {
    negative: n,
    negativeStr: l,
    trimStr: r,
    integerStr: a,
    decimalStr: o,
    fullStr: "".concat(l).concat(r)
  };
}
function bl(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function Br(t) {
  var e = String(t);
  if (bl(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && d1(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function f1(t) {
  var e = String(t);
  if (bl(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(hs() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(hs() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(Br(e));
  }
  return Kr(e).fullStr;
}
function d1(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var L6 = /* @__PURE__ */ function() {
  function t(e) {
    if (wi(this, t), Ve(this, "origin", ""), Ve(this, "negative", void 0), Ve(this, "integer", void 0), Ve(this, "decimal", void 0), Ve(this, "decimalLen", void 0), Ve(this, "empty", void 0), Ve(this, "nan", void 0), u1(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (bl(n) && (n = Number(n)), n = typeof n == "string" ? n : f1(n), d1(n)) {
      var r = Kr(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Ci(t, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), l = n.alignDecimal(a), c = r(o, l).toString(), u = i(a), f = Kr(c), d = f.negativeStr, m = f.trimStr, b = "".concat(d).concat(m.padStart(u + 1, "0"));
      return new t("".concat(b.slice(0, -u), ".").concat(b.slice(-u)));
    }
  }, {
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new t(n);
      var r = new t(n);
      return r.isInvalidate() ? this : this.cal(r, function(i, a) {
        return i + a;
      }, function(i) {
        return i;
      });
    }
  }, {
    key: "multi",
    value: function(n) {
      var r = new t(n);
      return this.isInvalidate() || r.isInvalidate() ? new t(NaN) : this.cal(r, function(i, a) {
        return i * a;
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
      return n ? this.isInvalidate() ? "" : Kr("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), D6 = /* @__PURE__ */ function() {
  function t(e) {
    if (wi(this, t), Ve(this, "origin", ""), Ve(this, "number", void 0), Ve(this, "empty", void 0), u1(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return Ci(t, [{
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
      var a = Math.max(Br(this.number), Br(r));
      return new t(i.toFixed(a));
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
      var a = Math.max(Br(this.number), Br(r));
      return new t(i.toFixed(a));
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
  return hs() ? new L6(t) : new D6(t);
}
function El(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = Kr(t), a = i.negativeStr, o = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = He(t).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return El(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const V6 = (t) => W(t, s.createElement("svg", {
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
})))), xo = "adm-slider", j6 = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: a,
    residentPopover: o,
    onDrag: l
  } = t, c = V(e), {
    locale: u
  } = ye(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = K(!1), b = Ot((g) => {
    var y;
    if (i)
      return;
    g.first && (c.current = e);
    const C = g.xy[0] - g.initial[0], h = (y = t.trackRef.current) === null || y === void 0 ? void 0 : y.offsetWidth;
    if (!h)
      return;
    const E = C / Math.ceil(h) * (r - n);
    l(c.current + E, g.first, g.last), m(!g.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), p = typeof t.popover == "function" ? t.popover : t.popover ? (g) => g.toString() : null, v = s.createElement("div", {
    className: `${xo}-thumb`
  }, a || s.createElement(V6, {
    className: `${xo}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${xo}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), p ? s.createElement(Xd, {
    content: p(e),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, v) : v);
}, B6 = j6, Lr = "adm-slider", W6 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, y8 = (t) => {
  var e;
  const n = U(W6, t), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
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
    const S = He($), O = El(S.toString(), ".", M);
    return He(O).toNumber();
  }
  function b($) {
    const M = Math.max(p(c), p($[0]), p($[1]));
    return n.range ? $.map((S) => m(S, M)) : m($[1], M);
  }
  function p($) {
    return (`${$}`.split(".")[1] || "").length;
  }
  function v($) {
    var M;
    (M = n.onAfterChange) === null || M === void 0 || M.call(n, b($));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (g = [0, n.value]);
  const [y, C] = ae({
    value: g,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), h = f(d(y));
  function E($) {
    const M = f($), S = h;
    M[0] === S[0] && M[1] === S[1] || C(b(M));
  }
  const w = V(null), x = `${100 * (h[1] - h[0]) / (i - r)}%`, k = `${100 * (h[0] - r) / (i - r)}%`, N = ie(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort(($, M) => $ - M);
    if (l) {
      const $ = [];
      for (let M = He(r); M.lessEquals(He(i)); M = M.add(c))
        $.push(M.toNumber());
      return $;
    }
    return [];
  }, [o, l, c, r, i]);
  function F($) {
    const M = $ < r ? r : $ > i ? i : $;
    let S = r;
    if (N.length)
      S = tl(N, M);
    else {
      const O = Math.round((M - r) / c), A = He(O).multi(c);
      S = He(r).add(A.toString()).toNumber();
    }
    return S;
  }
  const _ = V(0), D = ($) => {
    if (_.current > 0 || ($.stopPropagation(), a))
      return;
    const M = w.current;
    if (!M)
      return;
    const S = M.getBoundingClientRect().left, O = ($.clientX - S) / Math.ceil(M.offsetWidth) * (i - r) + r, A = F(O);
    let P;
    n.range ? Math.abs(A - h[0]) > Math.abs(A - h[1]) ? P = [h[0], A] : P = [A, h[1]] : P = [n.min, A], E(P), v(P);
  }, I = V(), R = ($) => s.createElement(B6, {
    key: $,
    value: h[$],
    min: r,
    max: i,
    disabled: a,
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
    className: j(Lr, {
      [`${Lr}-disabled`]: a
    })
  }, s.createElement("div", {
    className: `${Lr}-track-container`,
    onClick: D
  }, s.createElement("div", {
    className: `${Lr}-track`,
    onClick: D,
    ref: w
  }, s.createElement("div", {
    className: `${Lr}-fill`,
    style: {
      width: x,
      left: k
    }
  }), n.ticks && s.createElement(A6, {
    points: N,
    min: r,
    max: i,
    lowerBound: h[0],
    upperBound: h[1]
  }), n.range && R(0), R(1))), o && s.createElement(I6, {
    min: r,
    max: i,
    marks: o,
    lowerBound: h[0],
    upperBound: h[1]
  })));
};
function lu(t) {
  var e = L.useRef();
  e.current = t;
  var n = L.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(a));
  }, []);
  return n;
}
function Z6() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var cu = Z6() ? L.useLayoutEffect : L.useEffect, H6 = function(e, n) {
  var r = L.useRef(!0);
  cu(function() {
    return e(r.current);
  }, n), cu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, uu = function(e, n) {
  H6(function(r) {
    if (!r)
      return e();
  }, n);
};
function fu(t) {
  var e = L.useRef(!1), n = L.useState(t), r = rn(n, 2), i = r[0], a = r[1];
  L.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function o(l, c) {
    c && e.current || a(l);
  }
  return [i, o];
}
function ko(t) {
  return t !== void 0;
}
function z6(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, l = fu(function() {
    return ko(i) ? i : ko(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = rn(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, b = lu(a), p = fu([d]), v = rn(p, 2), g = v[0], y = v[1];
  uu(function() {
    var h = g[0];
    u !== h && b(u, h);
  }, [g]), uu(function() {
    ko(i) || f(i);
  }, [i]);
  var C = lu(function(h, E) {
    f(h, E), y([d], E);
  });
  return [m, C];
}
const Kn = "adm-stepper", U6 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function q6(t, e) {
  const n = U(U6, t), {
    defaultValue: r = 0,
    value: i,
    onChange: a,
    disabled: o,
    step: l,
    max: c,
    min: u,
    inputReadOnly: f,
    digits: d,
    stringMode: m,
    formatter: b,
    parser: p
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
  const g = (P) => (d !== void 0 ? El(P.toString(), ".", d) : P).toString(), y = (P) => m ? P.toString() : P.toNumber(), C = (P) => {
    if (P === "")
      return null;
    if (p)
      return String(p(P));
    const T = He(P);
    return T.isInvalidate() ? null : T.toString();
  }, h = (P) => P === null ? "" : b ? b(P) : g(P), [E, w] = z6(r, {
    value: i,
    onChange: (P) => {
      a == null || a(P);
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
    d !== void 0 && (T = He(g(y(T)))), w(y(T));
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
  }, O = () => o ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, A = () => o ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: j(Kn, {
      [`${Kn}-active`]: _
    })
  }, s.createElement(Lt, {
    className: `${Kn}-minus`,
    onClick: M,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.decrease
  }, s.createElement(d2, null)), s.createElement("div", {
    className: `${Kn}-middle`
  }, s.createElement(s1, {
    ref: I,
    className: `${Kn}-input`,
    onFocus: (P) => {
      var T;
      R(!0), (T = n.onFocus) === null || T === void 0 || T.call(n, P);
    },
    value: x,
    onChange: (P) => {
      o || F(P);
    },
    disabled: o,
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
  })), s.createElement(Lt, {
    className: `${Kn}-plus`,
    onClick: S,
    disabled: A(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.increase
  }, s.createElement(ff, null))));
}
const b8 = me(q6), yn = "adm-step", K6 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, s.createElement("div", {
    className: j(`${yn}`, `${yn}-status-${i}`)
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
}, du = "adm-steps", Y6 = "adm-step", G6 = s.createElement("span", {
  className: `${Y6}-icon-dot`
}), X6 = {
  current: 0,
  direction: "horizontal"
}, Q6 = (t) => {
  const e = U(X6, t), {
    direction: n,
    current: r
  } = e, i = j(du, `${du}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (a, o) => {
    var l;
    if (!s.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : G6;
    return s.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, E8 = le(Q6, {
  Step: K6
}), Yt = "adm-swipe-action", J6 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, w8 = me((t, e) => {
  const n = U(J6, t), r = V(null), i = V(null), a = V(null);
  function o(y) {
    const C = y.current;
    return C ? C.offsetWidth : 0;
  }
  function l() {
    return o(i);
  }
  function c() {
    return o(a);
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
    var y;
    (y = m.current) === null || y === void 0 || y.call(m), d.current = !1;
  }
  const p = Ot((y) => {
    var C;
    if (m.current = y.cancel, !y.intentional || (y.down && (d.current = !0), !d.current))
      return;
    const [h] = y.offset;
    if (y.last) {
      const E = l(), w = c();
      let x = h + y.velocity[0] * y.direction[0] * 50;
      h > 0 ? x = Math.max(0, x) : h < 0 ? x = Math.min(0, x) : x = 0;
      const k = tl([-w, 0, E], x);
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
      const y = l();
      return {
        left: -c(),
        right: y
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
    show: (y = "right") => {
      var C;
      y === "right" ? f.start({
        x: -c()
      }) : y === "left" && f.start({
        x: l()
      }), (C = t.onActionsReveal) === null || C === void 0 || C.call(t, y);
    },
    close: v
  })), X(() => {
    if (!n.closeOnTouchOutside)
      return;
    function y(C) {
      if (u.get() === 0)
        return;
      const h = r.current;
      h && !h.contains(C.target) && v();
    }
    return document.addEventListener("touchstart", y), () => {
      document.removeEventListener("touchstart", y);
    };
  }, [n.closeOnTouchOutside]);
  function g(y) {
    var C, h;
    const E = (C = y.color) !== null && C !== void 0 ? C : "light";
    return s.createElement(Lt, {
      key: y.key,
      className: `${Yt}-action-button`,
      style: {
        "--background-color": (h = e7[E]) !== null && h !== void 0 ? h : E
      },
      onClick: (w) => {
        var x, k;
        n.closeOnAction && v(), (x = y.onClick) === null || x === void 0 || x.call(y, w), (k = n.onAction) === null || k === void 0 || k.call(n, y, w);
      }
    }, y.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: Yt
  }, p(), {
    ref: r,
    onClickCapture: (y) => {
      d.current && (y.stopPropagation(), y.preventDefault());
    }
  }), s.createElement(ge.div, {
    className: `${Yt}-track`,
    style: {
      x: u
    }
  }, nn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-left`,
    ref: i
  }, n.leftActions.map(g))), s.createElement("div", {
    className: `${Yt}-content`,
    onClickCapture: (y) => {
      u.goal !== 0 && (y.preventDefault(), y.stopPropagation(), v());
    }
  }, s.createElement(ge.div, {
    style: {
      pointerEvents: u.to((y) => y !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), nn(n.stopPropagation, s.createElement("div", {
    className: `${Yt}-actions ${Yt}-actions-right`,
    ref: a
  }, n.rightActions.map(g))))));
}), e7 = {
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
function t7(t) {
  const [e, n] = K(t), r = V(e);
  return X(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function n7(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const l = t[o], c = e[o];
    typeof l == "function" && typeof c == "function" ? a[o] = function(...u) {
      l(...u), c(...u);
    } : a[o] = l || c;
  }), a;
}
const bt = "adm-swiper", r7 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, i7 = {
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
let Hi;
const a7 = me(Hs((t, e) => {
  const n = U(i7, t), {
    direction: r,
    total: i,
    children: a,
    indicator: o
  } = n, [l] = K({}), c = V(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: p
  } = ie(() => {
    let g = 0, y, C;
    return typeof a == "function" ? y = a : C = s.Children.map(a, (h) => !s.isValidElement(h) || h.type !== m1 ? null : (g++, h)), {
      renderChildren: y,
      validChildren: C,
      count: g
    };
  }, [a]), v = i ?? b;
  return v === 0 || !m && !p ? null : () => {
    let g = n.loop;
    f * (v - 1) < 1 && (g = !1);
    const y = V(null);
    function C() {
      const z = y.current;
      return z ? (u ? z.offsetHeight : z.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [h, E, w] = X0(n.defaultIndex), [x, k, N] = t7(!1);
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
        if (N.current || !g)
          return;
        const z = _.get(), ee = 100 * v, J = $o(z, ee);
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
    const $ = Ot((z) => {
      if (I.current = z.cancel, !z.intentional || (z.first && !Hi && (Hi = l), Hi !== l))
        return;
      Hi = z.last ? void 0 : l;
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
        const Me = Math.floor(te / ee), un = Me + 1, g1 = Math.round((te + Le * 2e3 * Ce) / ee);
        M($e(g1, Me, un)), window.setTimeout(() => {
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
        if (g)
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
      const te = Math.round(z), Ce = g ? $o(te, v) : $e(te, 0, v - 1);
      Ce !== w() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, Ce)), E(Ce), D.start({
        position: (g ? te : F(te)) * 100,
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
        S(), T();
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
      return g && (J = {
        [u ? "y" : "x"]: _.to((te) => {
          let Ce = -te + z * 100;
          const Le = v * 100, Me = Le / 2;
          return Ce = $o(Ce + Me, Le) - Me, `${Ce}%`;
        }),
        [u ? "top" : "left"]: `-${z * 100}%`
      }), s.createElement(ge.div, {
        className: j(`${bt}-slide`, {
          [`${bt}-slide-active`]: h === z
        }),
        style: J,
        key: z
      }, ee);
    }
    function Z() {
      if (p && i) {
        const ee = Math.max(h - 2, 0), J = Math.min(h + 2, i - 1), te = [];
        for (let Ce = ee; Ce <= J; Ce += 1)
          te.push(B(Ce, p(Ce)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${bt}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), te);
      }
      return s.Children.map(m, (z, ee) => B(ee, z));
    }
    function q() {
      return g ? s.createElement("div", {
        className: `${bt}-track-inner`
      }, Z()) : s.createElement(ge.div, {
        className: `${bt}-track-inner`,
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
      const ee = r7[z];
      ce[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const he = n7(G, ce);
    let Ee = null;
    return typeof o == "function" ? Ee = o(v, h) : o !== !1 && (Ee = s.createElement("div", {
      className: `${bt}-indicator`
    }, s.createElement(f6, Object.assign({}, n.indicatorProps, {
      total: v,
      current: h,
      direction: r
    })))), W(n, s.createElement("div", {
      className: j(bt, `${bt}-${r}`),
      style: Y
    }, s.createElement("div", Object.assign({
      ref: y,
      className: j(`${bt}-track`, {
        [`${bt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (z) => {
        N.current && z.stopPropagation(), R();
      }
    }, he), q()), Ee));
  };
}));
function $o(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const C8 = le(a7, {
  Item: m1
}), o7 = je((t) => W(t, s.createElement("svg", {
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
})))))))), bn = "adm-switch", s7 = {
  defaultChecked: !1
}, x8 = (t) => {
  const e = U(s7, t), n = e.disabled || e.loading || !1, [r, i] = K(!1), {
    locale: a
  } = ye(), [o, l] = ae({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Oe(this, void 0, void 0, function* () {
      if (n || e.loading || r)
        return;
      const u = !o;
      if (e.beforeChange) {
        i(!0);
        try {
          yield e.beforeChange(u), i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
      const f = l(u);
      if (Af(f)) {
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
    className: j(bn, {
      [`${bn}-checked`]: o,
      [`${bn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${bn}-checkbox`
  }, s.createElement("div", {
    className: `${bn}-handle`
  }, (e.loading || r) && s.createElement(o7, {
    className: `${bn}-spin-icon`
  })), s.createElement("div", {
    className: `${bn}-inner`
  }, o ? e.checkedText : e.uncheckedText))));
}, l7 = () => null, Pt = "adm-tab-bar", c7 = {
  safeArea: !1
}, u7 = (t) => {
  var e;
  const n = U(c7, t);
  let r = null;
  const i = [];
  cn(n.children, (l, c) => {
    if (!An(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [a, o] = ae({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : r,
    onChange: (l) => {
      var c;
      l !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, l));
    }
  });
  return W(n, s.createElement("div", {
    className: Pt
  }, s.createElement("div", {
    className: `${Pt}-wrap`
  }, i.map((l) => {
    const c = l.key === a;
    function u() {
      const f = l.props.icon && s.createElement("div", {
        className: `${Pt}-item-icon`
      }, typeof l.props.icon == "function" ? l.props.icon(c) : l.props.icon), d = l.props.title && s.createElement("div", {
        className: j(`${Pt}-item-title`, !!f && `${Pt}-item-title-with-icon`)
      }, typeof l.props.title == "function" ? l.props.title(c) : l.props.title);
      return f ? s.createElement(s.Fragment, null, s.createElement(Wo, {
        content: l.props.badge,
        className: `${Pt}-icon-badge`
      }, f), d) : d ? s.createElement(Wo, {
        content: l.props.badge,
        className: `${Pt}-title-badge`
      }, d) : null;
    }
    return W(l.props, s.createElement("div", {
      key: l.key,
      onClick: () => {
        const {
          key: f
        } = l;
        f != null && o(f.toString());
      },
      className: j(`${Pt}-item`, {
        [`${Pt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(br, {
    position: "bottom"
  })));
}, k8 = le(u7, {
  Item: l7
}), mu = "adm-tag", f7 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, d7 = {
  color: "default",
  fill: "solid",
  round: !1
}, $8 = (t) => {
  var e;
  const n = U(d7, t), r = (e = f7[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(mu, {
      [`${mu}-round`]: n.round
    })
  }, n.children));
}, Dr = "adm-text-area", h1 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, m7 = me((t, e) => {
  const n = U(h1, t), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, l] = ae(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = V(null), u = V("auto"), f = V(null);
  be(e, () => ({
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
  })), Fe(() => {
    if (!r)
      return;
    const v = c.current, g = f.current;
    if (!v || (v.style.height = u.current, !g))
      return;
    let y = g.scrollHeight;
    if (typeof r == "object") {
      const C = window.getComputedStyle(v), h = parseFloat(C.lineHeight);
      r.minRows && (y = Math.max(y, r.minRows * h)), r.maxRows && (y = Math.min(y, r.maxRows * h));
    }
    u.current = `${y}px`, v.style.height = `${y}px`;
  }, [o, r]);
  const d = V(!1);
  let m;
  const b = Gi(o).length;
  typeof i == "function" ? m = i(b, a) : i && (m = s.createElement("div", {
    className: `${Dr}-count`
  }, a === void 0 ? b : b + "/" + a));
  let p = n.rows;
  return typeof r == "object" && (r.maxRows && p > r.maxRows && (p = r.maxRows), r.minRows && p < r.minRows && (p = r.minRows)), W(n, s.createElement("div", {
    className: Dr
  }, s.createElement("textarea", {
    ref: c,
    className: `${Dr}-element`,
    rows: p,
    value: o,
    placeholder: n.placeholder,
    onChange: (v) => {
      let g = v.target.value;
      a && !d.current && (g = Gi(g).slice(0, a).join("")), l(g);
    },
    id: n.id,
    onCompositionStart: (v) => {
      var g;
      d.current = !0, (g = n.onCompositionStart) === null || g === void 0 || g.call(n, v);
    },
    onCompositionEnd: (v) => {
      var g;
      if (d.current = !1, a) {
        const y = v.target.value;
        l(Gi(y).slice(0, a).join(""));
      }
      (g = n.onCompositionEnd) === null || g === void 0 || g.call(n, v);
    },
    autoComplete: n.autoComplete,
    autoFocus: n.autoFocus,
    disabled: n.disabled,
    readOnly: n.readOnly,
    name: n.name,
    onFocus: n.onFocus,
    onBlur: n.onBlur,
    onClick: n.onClick
  }), m, r && s.createElement("textarea", {
    ref: f,
    className: `${Dr}-element ${Dr}-element-hidden`,
    value: o,
    rows: p,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
m7.defaultProps = h1;
const Rt = "adm-toast", h7 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, v7 = (t) => {
  const e = U(h7, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = e, o = ie(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(mf, {
          className: `${Rt}-icon-success`
        });
      case "fail":
        return s.createElement(vi, {
          className: `${Rt}-icon-fail`
        });
      case "loading":
        return s.createElement(Ys, {
          color: "white",
          className: `${Rt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = ie(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return s.createElement(hi, {
    visible: e.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: e.getContainer,
    afterClose: e.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, e.maskStyle),
    className: j(`${Rt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: j(`${Rt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: j(`${Rt}-main`, i ? `${Rt}-main-icon` : `${Rt}-main-text`)
  }, o && s.createElement("div", {
    className: `${Rt}-icon`
  }, o), s.createElement(ni, null, r))));
};
let It = null, _o = null;
const Ji = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, p7 = (t) => s.createElement(v7, Object.assign({}, t));
function g7(t) {
  const e = U(Ji, typeof t == "string" ? {
    content: t
  } : t), n = s.createElement(p7, Object.assign({}, e, {
    onClose: () => {
      It = null;
    }
  }));
  return It ? It.replace(n) : It = Er(n), _o && window.clearTimeout(_o), e.duration !== 0 && (_o = window.setTimeout(() => {
    v1();
  }, e.duration)), It;
}
function v1() {
  It == null || It.close(), It = null;
}
function y7(t) {
  t.duration !== void 0 && (Ji.duration = t.duration), t.position !== void 0 && (Ji.position = t.position), t.maskClickable !== void 0 && (Ji.maskClickable = t.maskClickable);
}
const b7 = {
  show: g7,
  clear: v1,
  config: y7
}, _8 = b7;
function p1(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[e] ? i = Math.max(i, n(a[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const zi = "adm-tree-select", E7 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, w7 = (t) => {
  const e = U(E7, t), [n, r, i] = Ei(e.fieldNames), [a, o] = ae({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = ie(() => {
    const b = p1(e.options, i), p = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
    function g(y, C) {
      C.forEach((h) => {
        v.set(h[r], y), p.set(h[r], h), h[i] && g(h, h[i]);
      });
    }
    return g(void 0, e.options), [b, p, v];
  }, [e.options]), f = (b) => {
    var p;
    const v = [];
    let g = b;
    for (; g; )
      v.push(g), g = u.get(g[r]);
    const y = v.reverse().map((C) => C[r]);
    o(y), (p = e.onChange) === null || p === void 0 || p.call(e, y, {
      options: v
    });
  }, d = (b = [], p) => b.map((v) => {
    const g = v[r] === a[p];
    return s.createElement("div", {
      key: v[r],
      className: j(`${zi}-item`, {
        [`${zi}-item-active`]: g
      }),
      onClick: () => {
        g || f(v);
      }
    }, v[n]);
  }), m = () => {
    var b;
    const p = [];
    for (let v = 0; v < l; v++) {
      let g = `${100 / l}%`;
      l === 2 && v === 0 && (g = "33.33%"), l === 2 && v === 1 && (g = "66.67%");
      const y = s.createElement("div", {
        key: v,
        className: j(`${zi}-column`),
        style: {
          width: g
        }
      }, d(v === 0 ? e.options : (b = c.get(a[v - 1])) === null || b === void 0 ? void 0 : b[i], v));
      p.push(y);
    }
    return p;
  };
  return W(e, s.createElement("div", {
    className: zi
  }, m()));
}, tt = "adm-tree-select-multiple", C7 = (t) => {
  const e = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  X(() => {
  }, []);
  const [n, r, i] = Ei(e.fieldNames), [a, o] = ae({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ae({
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
  }, [l, d]), p = ie(() => {
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
  }, g = (k) => {
    var N;
    const F = [];
    let _ = k;
    for (; _; )
      F.unshift(_), _ = m.get(_[r]);
    const D = F.map((I) => I[r]);
    o(D), (N = e.onExpand) === null || N === void 0 || N.call(e, D, F);
  }, y = (k, N) => {
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
      className: `${tt}-item`
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
      className: j(`${tt}-item`, `${tt}-item-leaf`)
    }, s.createElement(Fc, {
      className: `${tt}-item-checkbox`,
      checked: I,
      indeterminate: R
    }), _);
  }, h = (k) => {
    const N = a.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        N || g(k);
      },
      className: j(`${tt}-item`, {
        [`${tt}-item-expand`]: N
      })
    }, k[n], !!p.get(k[r]) && s.createElement("div", {
      className: `${tt}-dot`
    }));
  }, E = (k) => {
    const N = b.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        v(N ? b.filter((F) => F !== k[r]) : [...b, k[r]]);
      },
      className: j(`${tt}-item`, `${tt}-item-leaf`)
    }, s.createElement(Fc, {
      className: `${tt}-item-checkbox`,
      checked: N
    }), k[n]);
  }, w = (k = [], N) => k.length === 0 ? void 0 : f === N + 1 ? s.createElement(s.Fragment, null, C(k, N), k.map((_) => E(_))) : s.createElement(s.Fragment, null, y(k, N), k.map((_) => h(_))), x = () => {
    var k;
    const N = [];
    for (let F = 0; F < f; F++) {
      let _ = `${100 / f}%`;
      f === 2 && F === 0 && (_ = "33.33%"), f === 2 && F === 1 && (_ = "66.67%");
      const D = s.createElement("div", {
        key: F,
        className: j(`${tt}-column`),
        style: {
          width: _
        }
      }, w(F === 0 ? e.options : (k = d.get(a[F - 1])) === null || k === void 0 ? void 0 : k[i], F));
      N.push(D);
    }
    return N;
  };
  return W(e, s.createElement("div", {
    className: tt
  }, x()));
}, O8 = le(w7, {
  Multiple: C7
}), En = "adm-virtual-input", x7 = {
  defaultValue: ""
}, S8 = me((t, e) => {
  const n = U(x7, t), [r, i] = ae(n), a = V(null), o = V(null), [l, c] = K(!1), {
    locale: u
  } = ye();
  function f() {
    const v = a.current;
    if (!v || document.activeElement !== v)
      return;
    const g = o.current;
    g && (g.scrollLeft = g.clientWidth);
  }
  Fe(() => {
    f();
  }, [r]), X(() => {
    l && f();
  }, [l]), be(e, () => ({
    focus: () => {
      var v;
      (v = a.current) === null || v === void 0 || v.focus();
    },
    blur: () => {
      var v;
      (v = a.current) === null || v === void 0 || v.blur();
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
  const b = n.keyboard, p = b && s.cloneElement(b, {
    onInput: (v) => {
      var g, y;
      i(r + v), (y = (g = b.props).onInput) === null || y === void 0 || y.call(g, v);
    },
    onDelete: () => {
      var v, g;
      i(r.slice(0, -1)), (g = (v = b.props).onDelete) === null || g === void 0 || g.call(v);
    },
    visible: l,
    onClose: () => {
      var v, g, y, C;
      const h = document.activeElement;
      h && (!((v = a.current) === null || v === void 0) && v.contains(h)) ? h.blur() : (g = a.current) === null || g === void 0 || g.blur(), (C = (y = b.props).onClose) === null || C === void 0 || C.call(y);
    },
    getContainer: null
  });
  return W(n, s.createElement("div", {
    ref: a,
    className: j(En, {
      [`${En}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: d,
    onBlur: m,
    onClick: n.onClick
  }, s.createElement("div", {
    className: `${En}-content`,
    ref: o,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, s.createElement("div", {
    className: `${En}-caret-container`
  }, l && s.createElement("div", {
    className: `${En}-caret`
  }))), n.clearable && !!r && l && s.createElement("div", {
    className: `${En}-clear`,
    onClick: (v) => {
      var g;
      v.stopPropagation(), i(""), (g = n.onClear) === null || g === void 0 || g.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, s.createElement(Ta, null)), [void 0, null, ""].includes(r) && s.createElement("div", {
    className: `${En}-placeholder`
  }, n.placeholder), p));
}), hu = "adm-water-mark", k7 = {
  fullPage: !0
}, F8 = (t) => {
  const e = U(k7, t), {
    zIndex: n,
    gapX: r = 24,
    gapY: i = 48,
    width: a = 120,
    height: o = 64,
    rotate: l = -22,
    image: c,
    imageWidth: u = 120,
    imageHeight: f = 64,
    content: d,
    fontStyle: m = "normal",
    fontWeight: b = "normal",
    fontColor: p = "rgba(0,0,0,.15)",
    fontSize: v = 14,
    fontFamily: g = "sans-serif"
  } = e, [y, C] = K("");
  return X(() => {
    const h = document.createElement("canvas"), E = window.devicePixelRatio, w = h.getContext("2d"), x = `${(r + a) * E}px`, k = `${(i + o) * E}px`, N = a * E, F = o * E;
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
        w.font = `${m} normal ${b} ${_}px/${F}px ${g}`, w.fillStyle = p, Array.isArray(d) ? d.forEach((D, I) => w.fillText(D, 0, I * _)) : w.fillText(d, 0, 0), w.restore(), C(h.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, b, a, o, g, p, c, d, v]), W(e, s.createElement("div", {
    className: j(hu, {
      [`${hu}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: y === "" ? void 0 : `url('${y}')`
    }
  }));
}, wn = "adm-footer", $7 = {
  label: "",
  links: [],
  content: "",
  chips: []
}, N8 = (t) => {
  const e = U($7, t), {
    label: n,
    links: r,
    content: i,
    chips: a,
    onChipClick: o,
    onLinkClick: l
  } = e, c = (f, d) => {
    a != null && a.length && f.type === "link" && (o == null || o(f, d));
  }, u = (f, d, m) => {
    l && (m.preventDefault(), l(f, d));
  };
  return W(e, s.createElement("div", {
    className: j(wn)
  }, n && s.createElement("div", {
    className: `${wn}-label`
  }, s.createElement(Zo, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${wn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(Zo, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${wn}-content`
  }, i), a && a.length > 0 && s.createElement("div", {
    className: `${wn}-chips`
  }, a.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: j(`${wn}-chip`, {
      [`${wn}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  P7 as ActionSheet,
  ni as AutoCenter,
  R7 as Avatar,
  Wo as Badge,
  Lt as Button,
  M7 as Calendar,
  A7 as CalendarPicker,
  e4 as CalendarPickerView,
  T7 as CapsuleTabs,
  I7 as Card,
  V7 as CascadePicker,
  j7 as CascadePickerView,
  B7 as Cascader,
  q4 as CascaderView,
  td as CenterPopup,
  Oc as CheckList,
  Fc as Checkbox,
  W7 as Collapse,
  F7 as ConfigProvider,
  Z7 as DatePicker,
  H7 as DatePickerView,
  z7 as Dialog,
  Zo as Divider,
  Mf as DotLoading,
  U7 as Dropdown,
  q7 as Ellipsis,
  K7 as Empty,
  Y7 as ErrorBlock,
  G7 as FloatingBubble,
  X7 as FloatingPanel,
  N8 as Footer,
  Q7 as Form,
  Jd as Grid,
  Da as Image,
  J7 as ImageUploader,
  B5 as ImageViewer,
  e8 as IndexBar,
  t8 as InfiniteScroll,
  s1 as Input,
  n8 as JumboTabs,
  Ct as List,
  Mf as Loading,
  hi as Mask,
  r8 as Modal,
  i8 as NavBar,
  a8 as NoticeBar,
  o8 as NumberKeyboard,
  f6 as PageIndicator,
  s8 as PasscodeInput,
  Yf as Picker,
  Ga as PickerView,
  Xd as Popover,
  yr as Popup,
  l8 as ProgressBar,
  c8 as ProgressCircle,
  u8 as PullToRefresh,
  f8 as Radio,
  d8 as Rate,
  m8 as Result,
  h8 as ResultPage,
  br as SafeArea,
  Df as ScrollMask,
  v8 as SearchBar,
  p8 as Selector,
  g8 as SideBar,
  Li as Skeleton,
  y8 as Slider,
  gl as Space,
  Ys as SpinLoading,
  b8 as Stepper,
  E8 as Steps,
  w8 as SwipeAction,
  C8 as Swiper,
  x8 as Switch,
  k8 as TabBar,
  _c as Tabs,
  $8 as Tag,
  m7 as TextArea,
  _8 as Toast,
  O8 as TreeSelect,
  S8 as VirtualInput,
  F8 as WaterMark,
  Bv as createErrorBlock,
  L7 as reduceMotion,
  D7 as restoreMotion,
  S7 as setDefaultConfig,
  ye as useConfig
};
